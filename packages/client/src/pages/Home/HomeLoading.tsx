import './home-loading.scss';

import React from 'react';
import { Card } from '../../components/Card/Card';

export const HomeLoading = () => {
  return <div className="home-loading">
    <Card>
      <p>Hang tight while we turn your beautiful wire-frame into a website…</p>
    </Card>
  </div>;
};
