import './page.scss';

import React from 'react';
import classnames from 'classnames';

import { Header } from '../Header/Header';

export interface PageProps {
  type?: string;
  header?: boolean;
}

export const Page: React.FunctionComponent<PageProps> = ({
  type,
  children,
  header = true
}) =>
  <main className={classnames('page', type)}>
    {header && <Header />}
    {children}
  </main>;
