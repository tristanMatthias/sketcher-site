import classnames from 'classnames';
import React, { PropsWithRef } from 'react';

import { icons } from './icons';
import styled from 'styled-components';
import theme from '../../styles/theme';

export type IconType = keyof typeof icons;

export interface IconProps extends PropsWithRef<any> {
  icon: IconType;
  color?: string;
  size?: 'large' | 'small' | 'medium';
}


const BaseIcon: React.FunctionComponent<IconProps> = ({
  icon: icon,
  color,
  size = 'medium',
  ...props
}) => {
  const sizeClass = size ? size : null;
  const colorClass = color ? color : null;
  const klass = classnames('icon', props.className, sizeClass, colorClass);
  const Ikon = icons[icon];
  if (!Ikon) {
    console.warn(`No icon '${icon}'`);

    return null;
  }
  return <Ikon {...props} className={klass} />;
};


export const Icon = styled(BaseIcon)`
  width: ${p => theme.size(p.size)}};
  height: ${p => theme.size(p.size)}};
  vertical-align: middle;
  display: inline-block;

  & + span {
    vertical-align: middle;
  }

  path, polygon {
    stroke: currentColor;
    stroke-width: 0.15rem;
    fill: none;
  }

  path.no-stroke, polygon.no-stroke {
    stroke: none;
    fill: currentColor;
  }
`
