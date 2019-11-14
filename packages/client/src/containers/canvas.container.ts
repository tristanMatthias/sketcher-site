import { useState } from 'react';
import { createContainer } from 'unstated-next';

interface DrawPoint {
  x: number;
  y: number;
}


const useCanvas = () => {
  const [userActions, setUserActions] = useState<DrawPoint[][]>([]);

  const undo = () => setUserActions(a => a.slice(0, -1));

  const clear = () => setUserActions([]);

  return {
    userActions, setUserActions, undo, clear
  };
};

export const Canvas = createContainer(useCanvas);
