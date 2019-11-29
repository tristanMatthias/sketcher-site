import './canvas.scss';

import React, { MouseEvent, TouchEvent, useEffect, useRef, useState, useMemo } from 'react';

import { Canvas as CC, CanvasMode } from '../../containers/canvas.container';
import { Picture } from '../../containers/picture.container';
import { useResize } from '../../hooks/resize';
import { CanvasLoading } from './CanvasLoading';
import { Extract } from '../../containers/extract.container';

export interface CanvasProps {
  image?: string;
}

export const Canvas: React.FunctionComponent<CanvasProps> = ({
  image
}) => {
  const { loading } = Extract.useContainer();
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [containerBox, setContainerBox] = useState<DOMRect>();
  const { setUserActions, userActions, mode, stream } = CC.useContainer();
  const { setPicture, captureState, setCaptured } = Picture.useContainer();
  const canvas = useRef<HTMLCanvasElement>(null);
  const windowSize = useResize();
  const [drawing, setDrawing] = useState(false);
  const [img, setImg] = useState();
  const [imgDim, setImgDim] = useState();

  useEffect(() => {
    if (container.current && canvas.current && windowSize) {
      setContainerBox(container.current.getBoundingClientRect()!);
    }
  }, [windowSize, canvas.current, container.current]);


  useEffect(() => {
    if (containerBox) {
      canvas.current!.width = containerBox.width;
      canvas.current!.height = containerBox.height;
      render();
    }
  }, [containerBox]);


  useMemo(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setImgDim({ width: img.width, height: img.height });
        setImg(img);
      };
    }
  }, [image]);


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

    // Draw image
    if (img) {

      let { width, height } = imgDim!;

      // Scale the image if it's too big
      if (width > c.width) {
        const scale = width / c.width;
        width *= 1 / scale;
        height *= 1 / scale;
      } else if (height > c.height) {
        const scale = height / c.height;
        width *= 1 / scale;
        height *= 1 / scale;
      }

      ctx.drawImage(img, c.width / 2 - width / 2, c.height / 2 - height / 2);
    }

    // Draw user content
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

  useEffect(render, [userActions, img]);


  const updatePicture = () => {
    if (!canvas.current) return;
    if (userActions.length === 0 && mode === CanvasMode.drawing && !img) {
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
  useEffect(updatePicture, [userActions.length, img]);


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
    {loading && <CanvasLoading />}

  </div>;
};

