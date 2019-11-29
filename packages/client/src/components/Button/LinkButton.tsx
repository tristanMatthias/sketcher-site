import './button.scss';

import classnames from 'classnames';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { ButtonProps } from './Button';

export type LinkButtonProps = LinkProps & ButtonProps;

export const LinkButton: React.FunctionComponent<LinkButtonProps> = ({
  children,
  circle,
  size,
  ...props
}) => {
  const className = classnames('button', props.className, { circle, [size || '']: Boolean(size) });
  return <Link {...props as LinkProps} className={className}>{children}</Link>;
};

