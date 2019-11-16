import { useState } from 'react';
import { createContainer } from 'unstated-next';

export enum CaptureState {
  capture,
  captured
}

const useePicture = () => {
  const [picture, setPicture] = useState<Blob>();
  const [captureState, setCaptureState] = useState<CaptureState | null>(null);

  const requestCapture = () => setCaptureState(CaptureState.capture);
  const setCaptured = () => setCaptureState(CaptureState.captured);
  // const setCapture = (img: Blob) => {
  //   setCaptureState(CaptureState.captured);
  //   setPicture(img);
  // };

  return {
    picture, setPicture,
    captureState, requestCapture, setCaptured
  };
};

export const Picture = createContainer(useePicture);
