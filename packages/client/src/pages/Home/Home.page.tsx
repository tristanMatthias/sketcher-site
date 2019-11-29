import './home.page.scss';

import React from 'react';

import { Canvas } from '../../components/Canvas/Canvas';
import { Footer } from '../../components/Footer/Footer';
import { Page } from '../../components/Page/Page';

export const HomePage = () => {
  return <Page type="home">
    <Canvas />
    <Footer />
  </Page>;
};
