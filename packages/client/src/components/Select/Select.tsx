import React from 'react';
import { Icon } from '../Icon/Icon';
import './select.scss';

export type SelectProps = JSX.IntrinsicElements['select'] & {
};

export const Select: React.FunctionComponent<SelectProps> = (props) => {
  return <div className="select">
    <select {...props}></select>
    <Icon type="arrowDown" />
  </div>;
};
