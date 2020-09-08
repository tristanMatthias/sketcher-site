import React from 'react';

import { Canvas } from './Canvas.container';
import Extract from './Extract.container';
import { Picture } from './Picture.container';


export const ContainerWrapper: React.FunctionComponent = ({ children }) =>
  <Picture.Provider>
    <Canvas.Provider>
      <Extract.Provider>
        {children}
      </Extract.Provider>
    </Canvas.Provider>
  </Picture.Provider>;
