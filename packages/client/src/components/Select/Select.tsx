import React from 'react';
import styled from 'styled-components';
import t from '../../styles/theme';
import { Icon } from '../Icon/Icon';

export type SelectProps = JSX.IntrinsicElements['select'] & {
};

const StyledSelect = styled.div`
  position: relative;
  border: ${t.borders.main};
  height: ${t.size('xlarge')};
  border-radius: ${t.borderRadius};

  svg {
    position: absolute;
    top: ${t.size('small')};
    right: ${t.size('small')};
  }

  select {
    height: 100%;
    width: 100%;
    border: none;
    -webkit-appearance: none;
    font-size: ${t.size()};
    font-family: ${t.font.body};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 ${t.size('small')};
    padding-right: ${t.size('large')};
  }
`;

export const Select: React.FunctionComponent<SelectProps> = ({
  style,
  ...props
}) =>
  <StyledSelect style={style}>
    <select {...props}></select>
    <Icon icon="arrowDown" />
  </StyledSelect>;
