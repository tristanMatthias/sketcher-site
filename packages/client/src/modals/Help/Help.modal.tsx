import React from 'react';
import styled from 'styled-components';
import { Button } from '../../components/Button/Button';
import { Modal, ModalProps } from '../../components/Modal/Modal';
import exampleButton from '../../images/help/examples/button.svg';
import exampleCircleImage from '../../images/help/examples/circle-image.svg';
import exampleImage from '../../images/help/examples/image.svg';
import exampleInput from '../../images/help/examples/input.svg';
import exampleSelect from '../../images/help/examples/select.svg';
import exampleText from '../../images/help/examples/text.svg';
import { routes } from '../../Router/routes';
import t from '../../styles/theme';


const StyleddModal: React.FC<ModalProps> = styled(Modal)`
  padding-bottom: 4rem;

  main {
    max-width: 60rem;
    margin: auto;
  }
  h2 {
    margin-bottom: 0;
  }

  .examples {
    --cols: 3;
    @media (min-width: 800px) { --cols: 4; }
    display: grid;
    grid-template-columns: repeat(var(--cols), 1fr);
    grid-gap: 0 2rem;
    align-items: center;
    text-align: center;

    div {
      overflow: hidden;
    }
    div div {
      margin-top: -3rem;
      font-size: 1.8rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: ${t.color('mid')};
    }

    img {
      width: 100%;
    }

  }

  a {
    display: block;
    width: 100%;
    margin-top: ${t.size('large')};
  }
`;


export const HelpModal: React.FunctionComponent<ModalProps> = props => {
  const examples = [
    [exampleButton, 'Button'],
    [exampleImage, 'Image'],
    [exampleCircleImage, 'Round Image'],
    [exampleText, 'Text'],
    [exampleInput, 'Input'],
    [exampleSelect, 'Select']
  ];
  return <StyleddModal heading="What can I draw?" {...props} className="help">
    <div className="examples">
      {examples.map(([src, label]) => <div>
        <img src={src} alt={label} />
        <div>{label}</div>
      </div>)}
    </div>
    <Button
      size="large"
      alt
      onClick={props.onClose}
      to={routes.examples()}
    >See examples</Button>
  </StyleddModal>;
};


