import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon, ModalBackground, ModalContent, ModalFooter, ModalHeader, ModalWrapper, StyledTransition } from './Modal.styles';



export interface ModalProps extends React.HTMLProps<HTMLElement> {
  show?: boolean
  heading?: string | React.ComponentType;
  onClose?: () => void;
  buttons?: React.ReactNode[]
  sheet?: boolean;
}


export const Modal: React.FC<ModalProps> = ({
  children,
  show: showInitial,
  heading,
  className,
  onClose,
  buttons,
  sheet
}) => {
  const [show, setShow] = useState(showInitial);
  useEffect(() => setShow(showInitial), [showInitial]);

  // Handle closing of modal
  useEffect(() => {
    if (onClose && !show) onClose();

    // Close the modal if the Escape key is pressed
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) setShow(false);
    };

    // If mounting, configure the document to listen for Escape key
    if (show) document.addEventListener('keyup', handle);
    // Remove event listener when modal is closed
    return () => document.removeEventListener('keyup', handle);
  }, [show]);


  const Title = (typeof heading === 'string') ? <h2>{heading}</h2> : heading;


  const content = <ModalWrapper sheet={sheet}>
    <ModalBackground onClick={() => onClose && setShow(false)} />
    <ModalContent className={className}>
      <ModalHeader>
        {Title}
        {onClose && <CloseIcon
          icon="close"
          color="grey"
          size="xbig"
          onClick={() => setShow(false)}
        />}
      </ModalHeader>
      <main>{children}</main>
      {buttons?.length ? <ModalFooter>{buttons}</ModalFooter> : null}
    </ModalContent>
  </ModalWrapper>;

  return createPortal(
    <StyledTransition
      in={show}
      timeout={300}
      classNames={{
        enter: 'transition-enter',
        enterActive: 'transition-enter-active',
        exit: 'transition-exit',
        exitActive: 'transition-exit-active'
      }}
      unmountOnExit
      mountOnEnter
      sheet={sheet}
    >
      {content}
    </StyledTransition>,
    document.body
  );
};
