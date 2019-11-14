import './home.page.scss';

import React from 'react';

import { Canvas } from '../../components/Canvas/Canvas';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Extract } from '../../containers/extract.container';
import { HomeLoading } from './HomeLoading';

export const HomePage = () => {
  const { loading } = Extract.useContainer();

  return <main className="home">
    <Header />
    <Canvas />
    <Footer />
    {loading && <HomeLoading />}
  </main>;
};
