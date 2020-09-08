import React from 'react';

import { Canvas as CC } from '../../containers/Canvas.container';
import Extract from '../../containers/Extract.container';
import { Picture } from '../../containers/Picture.container';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { aniFadeUp } from '../../styles/animations';

export interface FooterProps {
  centerButton?: boolean;
}

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-top: ${theme.borders.main};
  padding: 0 ${theme.size('small')};

  & > div {
    flex: 1;
    opacity: 0;
    animation: ${aniFadeUp} 0.35s forwards;
    &:last-child {
      text-align: right;
    }
  }

  button.camera {
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${theme.borders.main};
    margin-top: -${theme.size('large')};
    margin-bottom: ${theme.size('medium')};
    div {
      width: ${theme.size('super')};
      height: ${theme.size('super')};
    }
  }
`;

export const Footer: React.FunctionComponent<FooterProps> = ({
  centerButton = true
}) => {
  const { undo, clear, userActions, cameraClick } = CC.useContainer();
  const { picture } = Picture.useContainer();

  const { extract } = Extract.useContainer();


  return <StyledFooter>
    <div>
      {userActions.length !== 0 &&
        <>
          <Button onClick={undo}>
            <Icon icon="undo" size="large" />
          </Button>
          <Button onClick={clear}>
            <Icon icon="remove" size="large" />
          </Button>
        </>}
    </div>

    {centerButton && <Button
      className="camera"
      onClick={cameraClick}
      circle
      // size="large"
    >
      <Icon icon="camera" size="large" />
    </Button>}


    <div>
      <Button
        className="check"
        alt
        disabled={!Boolean(picture)}
        onClick={() => extract()}
      >
        <Icon icon="check" size="large" />
        <span>Go!</span>
      </Button>
    </div>
  </StyledFooter>;
};
