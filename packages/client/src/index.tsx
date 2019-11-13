import './fonts/SpaceGrotesk/SpaceGrotesk-Bold.ttf';
import './fonts/SpaceGrotesk/SpaceGrotesk-Light.ttf';
import './fonts/SpaceGrotesk/SpaceGrotesk-Regular.ttf';
import './styles/app.scss';

import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';

import { ContainerWrapper } from './containers/Wrapper';
import { client } from './lib/apollo';
import { AppRouter } from './router/AppRouter';

ReactDOM.render(
  <ApolloProvider client={client}>
    <ContainerWrapper>
      <AppRouter />
    </ContainerWrapper>
  </ApolloProvider>,
  document.getElementById('app')
);
