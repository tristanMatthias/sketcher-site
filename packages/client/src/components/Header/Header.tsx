import './Header.scss';

import React from 'react';

import logo from '../../images/logo.svg';

export const Header = () => {
  return <header>
    <img src={logo} alt="SketchSite" />
  </header>;
};
