import React from 'react';
import { Icon } from '../Icon/Icon';
import styled from 'styled-components';
import theme from '../../styles/theme';

const StyledImagePlaceholder = styled.div`
  position: relative;
  background: ${theme.color('softest')};
  border-radius: ${theme.borderRadius};

  svg.icon {
    position: absolute;
    width: 100%;
    height: 100%;
    color: ${theme.color('soft')};
    padding: 10%;
    border: ${theme.borders.soft};
    border-radius: ${theme.borderRadius};
  }
`;

export const ImagePlaceholder: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) =>
  <StyledImagePlaceholder {...props}>
    <Icon icon="image" />
  </StyledImagePlaceholder>;
