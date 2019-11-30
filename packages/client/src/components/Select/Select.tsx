import React from 'react';
import { Icon } from '../Icon/Icon';
import './select.scss';

export type SelectProps = JSX.IntrinsicElements['select'] & {
};

export const Select: React.FunctionComponent<SelectProps> = ({
  style,
  ...props
}) =>
  <div className="select" style={style}>
    <select {...props}></select>
    <Icon type="arrowDown" />
  </div>;
