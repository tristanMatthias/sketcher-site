import React, { useState } from 'react';

import logo from '../../images/logo.svg';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { HelpModal } from '../../modals/Help/Help.modal';
import { Link } from 'react-router-dom';
import { routes } from '../../Router/routes';
import styled from 'styled-components';
import theme from '../../styles/theme';

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  border-bottom: ${theme.borders.main};
  user-select: none;
  padding: 0 ${theme.size('medium')};

  img {
    height: ${theme.size('xbig')};
    user-select: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Header = () => {
  const [helpModal, setHelpModal] = useState(false);

  return <StyledHeader className="page-header">
    <Link to={routes.home()}>
      <img src={logo} alt="SketchSite" />
    </Link>

    <Button onClick={() => setHelpModal(!helpModal)}>
      <Icon icon="help" />
    </Button>

    <HelpModal onClose={() => setHelpModal(false)} show={helpModal} sheet/>

  </StyledHeader>;
};
