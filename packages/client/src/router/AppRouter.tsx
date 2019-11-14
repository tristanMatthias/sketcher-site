import React from 'react';
import { Route, Switch } from 'react-router';
import { Router } from 'react-router-dom';

import { HomePage } from '../pages/Home/Home.page';
import { SitePage } from '../pages/Site/Site.page';
import { history } from './history';


export const AppRouter = () =>
  <Router history={history}>
    <Switch>
      <Route path="/s/:site" render={({ match: { params } }) => <SitePage site={params.site} />} />
      <Route exact path="/" component={HomePage} />
    </Switch>
  </Router>;
