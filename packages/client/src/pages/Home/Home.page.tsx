import React from 'react';

import { Canvas } from '../../components/Canvas/Canvas';
import { Footer } from '../../components/Footer/Footer';
import { Page } from '../../components/Page/Page';
import styled from 'styled-components';

const StyledPage = styled(Page)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  align-items: center;
  user-select: none;
`;

export default () => <StyledPage>
  <Canvas />
  <Footer />
</StyledPage>;
