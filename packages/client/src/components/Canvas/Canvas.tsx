import './canvas.scss';

import React, { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react';

import { Canvas as CC, CanvasMode } from '../../containers/canvas.container';
import { Picture } from '../../containers/picture.container';
import { useResize } from '../../hooks/resize';


export const Canvas = () => {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [containerBox, setContainerBox] = useState<DOMRect>();
  const { setUserActions, userActions, mode, stream } = CC.useContainer();
  const { setPicture, captureState, setCaptured } = Picture.useContainer();
  const canvas = useRef<HTMLCanvasElement>(null);
  const windowSize = useResize();
  const [drawing, setDrawing] = useState(false);


  useEffect(() => {
    if (container.current && canvas.current && windowSize) {
      setContainerBox(container.current.getBoundingClientRect()!);
    }
  }, [windowSize, canvas.current, container.current]);

  useEffect(() => {
    if (containerBox) {
      canvas.current!.width = containerBox.width;
      canvas.current!.height = containerBox.height;
    }
  }, [containerBox]);


  useEffect(() => {
    if (video.current && mode === CanvasMode.camera && stream) {
      if ('srcObject' in video.current) {
        video.current.srcObject = stream;
      } else {
        // Avoid using this in new browsers, as it is going away.
        // @ts-ignore
        video.current.src = URL.createObjectURL(stream);
      }
      video.current.width = containerBox!.width;
      video.current.height = containerBox!.height;
      video.current.play();

    }
  }, [video.current, mode, stream]);


  useEffect(() => {
    if (mode == CanvasMode.camera && video.current) {
      setCaptured();
      updatePicture();
    }
  }, [captureState]);


  const pushAction = () => setUserActions(a => [...a, []]);

  const drawPoint = (x: number, y: number) => {
    const xi = Math.round(x) - containerBox!.x;
    const yi = Math.round(y) - containerBox!.y;

    setUserActions(a => {
      const last = a.pop() || [];
      return [...a, [...last, { x: xi, y: yi }]];
    });
  };

  const drawTouch = (e: TouchEvent<HTMLCanvasElement>) => {
    drawPoint(e.touches[0].clientX, e.touches[0].clientY);
  };
  const drawMouse = (e: MouseEvent<HTMLCanvasElement>) => {
    if (drawing) drawPoint(e.clientX, e.clientY);
  };

  const render = () => {
    const c = canvas.current;
    if (!c) return;

    const ctx = c.getContext('2d')!;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, c.width, c.height);


    userActions.forEach(points => {
      ctx.beginPath();
      points.forEach(({ x, y }, i) => {
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.closePath();
    });
  };

  useEffect(render, [userActions]);


  const updatePicture = () => {
    if (!canvas.current) return;
    if (userActions.length === 0 && mode === CanvasMode.drawing) {
      setPicture(undefined);
      return;
    }
    if (mode == CanvasMode.camera && video.current && canvas.current) {
      const ctx = canvas.current.getContext('2d')!;
      ctx.drawImage(video.current, 0, 0);
    }

    const dataURI = canvas.current.toDataURL('image/jpeg');
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }

    setPicture(new Blob([ab], { type: mimeString }));
  };
  useEffect(updatePicture, [userActions.length]);


  return <div ref={container} className="canvas">
    {mode === CanvasMode.drawing
      ? <>
        {userActions.length === 0 && <span className="empty">
          Draw something <small>or</small> Take a photo
        </span>}

        <canvas
          ref={canvas}
          onTouchStart={pushAction}
          onMouseDown={() => {
            setDrawing(true);
            pushAction();
          }}
          onTouchMove={drawTouch}
          onDrag={drawMouse}
          onTouchEnd={updatePicture}
          onMouseUp={() => {
            setDrawing(false);
            updatePicture();
          }}
          onMouseMove={drawMouse}
        ></canvas>
      </>
      : <>
        <canvas ref={canvas} />
        <span className="empty">
          Loading camera...
        </span>
        <video ref={video} />
      </>
    }

  </div>;
};

