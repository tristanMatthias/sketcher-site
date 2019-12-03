import './image-placeholder.scss';


import React from 'react';
import { Icon } from '../Icon/Icon';

export const ImagePlaceholder: React.FunctionComponent<JSX.IntrinsicElements['div']> = ({
  ...props
}) =>
  <div className="image-placeholder" {...props}>
    <Icon type="image" />
  </div>;
