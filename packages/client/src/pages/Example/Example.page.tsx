import React, { useMemo } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { Page } from '../../components/Page/Page';
import { routes } from '../../Router/routes';
import { examples } from '../Examples/Examples.page';
import { Canvas } from '../../components/Canvas/Canvas';
import { Footer } from '../../components/Footer/Footer';

export default () => {
  const { example: type } = useParams<{ example: string }>();

  const example = useMemo(() => examples.find(e => e.type === type), [type]);
  if (!example) return <Redirect to={routes.home()} />;

  return <Page type="example">
    <Canvas image={example.image} />
    <Footer centerButton={false} />
  </Page>;
};
