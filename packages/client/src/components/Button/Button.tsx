import './button.scss';

import React from 'react';

export const Button: React.FunctionComponent<JSX.IntrinsicElements['button']> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

