import './home.page.scss';

import React, { useState } from 'react';

import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';

export const HomePage = () => {
  const [state] = useState<null | 'camera' | 'draw'>(null);
  return <main className="home">
    <Header />

    {(state === null)
      ? <span className="empty">
        Draw something <small>or</small> Take a photo
      </span>
      : null
    }
    <Footer />
  </main>;
};


