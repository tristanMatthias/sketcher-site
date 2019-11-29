import React from 'react';
import { Route, Switch } from 'react-router';
import { Router } from 'react-router-dom';

import { ExamplePage } from '../pages/Example/Example.page';
import { ExamplesPage } from '../pages/Examples/Examples.page';
import { HomePage } from '../pages/Home/Home.page';
import { SitePage } from '../pages/Site/Site.page';
import { history } from './history';
import { routes } from './routes';


export const AppRouter = () =>
  <Router history={history}>
    <Switch>
      <Route path={routes.site(false)} render={({ match: { params } }) => <SitePage site={params.site} />} />
      <Route path={routes.example(false)} component={ExamplePage} />
      <Route path={routes.examples(false)} component={ExamplesPage} />
      <Route exact path={routes.home(false)} component={HomePage} />
    </Switch>
  </Router>;
