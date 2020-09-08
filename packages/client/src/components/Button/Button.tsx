import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import t from '../../styles/theme';

const StyledButton = styled.button<ButtonProps>`
  display: inline-block;
  position: relative;
  border-radius: ${t.borderRadius};
  border: ${t.borders.width} solid ${t.color()};
  background: ${t.color('soft')};
  padding: 0;
  transform: translateY(${t.size('xtiny')});
  min-height: ${t.size('large')};
  min-width: ${t.size('large')};

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% + 2 * ${t.borders.width});
    height: calc(${t.size('large')} + 2 * ${t.borders.width});
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    margin-top: -${t.borders.width};
    margin-left: -${t.borders.width};
    margin-right: -${t.borders.width};

    transform: translateY(-${t.size('tiny')});
    background: ${t.color('white')};
    border-radius: ${t.borderRadius};
    border: ${t.borders.width} solid ${t.color()};
    padding: 0 ${t.size('small')};
    text-transform: uppercase;
    font-weight: bold;
    font-size: ${t.size('medium')};
    font-family: ${t.font.body};
    text-decoration: none;
    color: ${t.color()};
    text-align: center;
  }


  &:active {
    background: ${t.color('soft')};
    & > div { transform: none; }
  }


  ${p => (p.size == 'large') && css`
    height: ${t.size('huge')};
    line-height: ${t.size('huge')};

    div {
      height: calc(${t.size('huge')} + 2 * ${t.borders.width});
      transform: translateY(calc(-${t.size('small')} - 2 * ${t.borders.width}));
      font-size: ${t.size('xbig')};
    }
    &:active div {
      transform: translateY(calc(-3 * ${t.borders.width}));
    }
  `}

  span, svg {
    vertical-align: middle;
  }
  span {
    margin: 0 ${t.size('small')};
  }

  svg:not(:only-child) {
    margin-left: -0.3rem;
  }
  svg:only-child {
    margin: 0 -${t.size('small')};
  }

  & + button {
    margin-left: 1rem;
  }

  ${p => p.alt && css`
    & > div {
      background-color: ${t.color('alt')};
    }
    &, &:active > div {
      background-color: ${t.color('altDark')};
    }
  `}

  &:disabled {
    pointer-events: none;
    color: currentColor;
    &, & > div {
      background-color: ${t.color('soft')};
    }
  }


  ${p => p.circle && css`&, & > div { border-radius: 50%; }`}
`;


export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  circle?: boolean;
  size?: 'large' | 'main',
  to?: string;
  alt?: boolean;
};

export const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  ...props
}) => {
  const Comp = props.to ? Link : 'button';

  return <StyledButton {...props} as={Comp}>
    <div>{children}</div>
  </StyledButton>;
};
