import './help.modal.scss';

import React from 'react';

import { LinkButton } from '../../components/Button/LinkButton';
import { Modal } from '../../components/Modal/Modal';
import { ModalProps } from '../../components/Modal/modal.types';
import exampleButton from '../../images/help/examples/button.svg';
import exampleCircleImage from '../../images/help/examples/circle-image.svg';
import exampleImage from '../../images/help/examples/image.svg';
import exampleInput from '../../images/help/examples/input.svg';
import exampleSelect from '../../images/help/examples/select.svg';
import exampleText from '../../images/help/examples/text.svg';
import { routes } from '../../router/routes';


export const HelpModal: React.FunctionComponent<Partial<ModalProps>> = props => {
  const examples = [
    [exampleButton, 'Button'],
    [exampleImage, 'Image'],
    [exampleCircleImage, 'Round Image'],
    [exampleText, 'Text'],
    [exampleInput, 'Input'],
    [exampleSelect, 'Select']
  ];
  return <Modal title="Help" {...props} className="help">
    <h2>What can I draw?</h2>
    <div className="examples">
      {examples.map(([src, label]) => <div>
        <img src={src} alt={label} />
        <div>{label}</div>
      </div>)}
    </div>
    <LinkButton
      type="submit"
      size="large"
      onClick={props.onClose}
      to={routes.examples()}
    >See examples</LinkButton>
  </Modal>;
};


