import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { useUserMedia } from '../lib/hooks/userMedia';
import { Picture } from './Picture.container';

interface DrawPoint {
  x: number;
  y: number;
}

export enum CanvasMode { camera, drawing }


const useCanvas = () => {
  const { requestCapture } = Picture.useContainer();
  const [userActions, setUserActions] = useState<DrawPoint[][]>([]);
  const [mode, setMode] = useState<CanvasMode>(CanvasMode.drawing);
  const { state, load, stream } = useUserMedia({ video: {} });

  const undo = () => setUserActions(a => a.slice(0, -1));

  const clear = () => setUserActions([]);

  useEffect(() => {
    if (mode === CanvasMode.camera && !state) load();
  }, [mode]);

  const cameraClick = () => {
    if (mode !== CanvasMode.camera) setMode(CanvasMode.camera);
    else requestCapture();
  };

  return {
    userActions, setUserActions, undo, clear, mode, cameraClick, stream, streamState: state
  };
};

export const Canvas = createContainer(useCanvas);
