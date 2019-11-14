import React from 'react';

import { Canvas } from './canvas.container';
import { Extract } from './extract.container';
import { Picture } from './picture.container';


export const ContainerWrapper: React.FunctionComponent = ({ children }) =>
  <Picture.Provider>
    <Canvas.Provider>
      <Extract.Provider>
        {children}
      </Extract.Provider>
    </Canvas.Provider>
  </Picture.Provider>;
