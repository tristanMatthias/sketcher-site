import { useDebugValue, useState } from 'react';

export const useUserMedia = (constraints: MediaStreamConstraints) => {
  const [stream, setStream] = useState();
  const [error, setError] = useState();
  const [state, setState] = useState();

  useDebugValue({ error, state, stream });


  const canceled = false;
  const load = async () => {

    setState('pending');
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (!canceled) {
        setState('resolved');
        setStream(stream);
      }
    } catch (e) {
      if (!canceled) {
        setState('rejected');
        setError(e);
      }
    }
  };

  // useEffect(() => {
  //   load();

  //   return () => {
  //     canceled = true;
  //   };
  // }, [constraints]);

  const stop = () => {
    stopMediaStream(stream);
  };

  // useEffect(() => () => , [stream]);

  return { state, load, stream, stop };
};


const stopAndRemoveTrack = (mediaStream: MediaStream) =>
  (track: MediaStreamTrack) => {
    track.stop();
    mediaStream.removeTrack(track);
  };

const stopMediaStream = (mediaStream: MediaStream) => {
  if (!mediaStream) return;
  mediaStream.getTracks().forEach(stopAndRemoveTrack(mediaStream));
};
