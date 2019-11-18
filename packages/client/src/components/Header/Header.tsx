import './header.scss';

import React, { useState } from 'react';

import logo from '../../images/logo.svg';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { HelpModal } from '../../modals/Help/Help.modal';

export const Header = () => {
  const [helpModal, setHelpModal] = useState(false);

  return <header className="page-header">
    <img src={logo} alt="SketchSite" />
    <Button onClick={() => setHelpModal(!helpModal)}>
      <Icon type="help" />
    </Button>
    {helpModal && <HelpModal onClose={() => setHelpModal(false)} />}
  </header>;
};
