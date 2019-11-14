import './home.page.scss';

import React from 'react';

import { Canvas } from '../../components/Canvas/Canvas';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';

export const HomePage = () => {

  return <main className="home">
    <Header />
    <Canvas />
    <Footer />
  </main>;
};
