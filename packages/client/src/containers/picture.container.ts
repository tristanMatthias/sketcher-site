import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useePicture = () => {
  const [picture, setPicture] = useState<Blob>();

  return {
    picture, setPicture
  };
};

export const Picture = createContainer(useePicture);
