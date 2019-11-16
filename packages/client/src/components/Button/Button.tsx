import './button.scss';
import classnames from 'classnames';

import React from 'react';

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  circle?: boolean;
};

export const Button: React.FunctionComponent<ButtonProps> = ({ children, circle, ...props }) => {
  const className = classnames(props.className, { circle });
  return <button {...props} className={className}>{children}</button>;
};

