import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Loading } from '../components/Loading/Loading';
import { ContainerWrapper } from '../containers/Wrapper';
import { routes } from './routes';

const HomePage = lazy(() => import('../pages/Home/Home.page'));
const SitePage = lazy(() => import('../pages/Site/Site.page'));
const ExamplePage = lazy(() => import('../pages/Example/Example.page'));
const ExamplesPage = lazy(() => import('../pages/Examples/Examples.page'));


export const Router = () => {
  return <BrowserRouter>
    <ContainerWrapper>
      <Switch>
        <Suspense fallback={<Loading />}>
          <Route path={routes.site(false)} render={({ match: { params } }) => <SitePage site={params.site} />} />
          <Route path={routes.example(false)} component={ExamplePage} />
          <Route path={routes.examples(false)} component={ExamplesPage} />
          <Route exact path={routes.home(false)} component={HomePage} />
        </Suspense>
      </Switch>
    </ContainerWrapper>
  </BrowserRouter>
}
