import './button.scss';
import classnames from 'classnames';

import React from 'react';

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  circle?: boolean;
  size?: 'large' | 'main'
};

export const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  circle,
  size,
  ...props
}) => {
  const className = classnames(props.className, { circle, [size || '']: Boolean(size) });
  return <button {...props} className={className}>{children}</button>;
};

