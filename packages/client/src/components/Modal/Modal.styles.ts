import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import styled, { css } from 'styled-components';
import t from '../../styles/theme';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';


export const ModalBackground = styled.span`
  background-color: ${t.color('main')}aa;
`;


export const ModalContent = styled(Card)`
  position: relative;
  padding: ${t.size('xbig')};
  padding-top: ${t.size()};
  border-radius: ${t.borderRadius};
  background: ${t.color('white')};
`;


export const CloseIcon = styled(Icon)`
  position: absolute;
  top: ${t.size('xbig')};
  right: ${t.size('xbig')};
  cursor: pointer;

  &:hover { color: ${t.color('grey')}; }
`;

export const ModalHeader = styled.header`
  margin-bottom: ${t.size('large')};
  text-align: center;

  h2 {
    font-weight: bold;
    font-size: ${t.size('xbig')};
  }
`;

export const ModalFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: -${t.size('small')};
  margin-right: -${t.size('small')};
  margin-top: ${t.size('xbig')};
`;


export const ModalWrapper = styled.aside<{ sheet: boolean }>`
  --transition-time: 0.3s;

  &, ${ModalBackground} {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    display: flex;
    align-items: ${p => p.sheet ? 'end' : 'center'};
    justify-content: center;
  }

  ${ModalBackground}, ${ModalContent} {
    transition: all var(--transition-time);
  }

  ${ModalContent} {
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
`;


export const StyledTransition: React.FC<CSSTransitionProps> = styled(CSSTransition)<{ sheet: boolean }>`
  &.transition-enter,
  &.transition-exit-active {
    ${ModalBackground} { opacity: 0; }
    ${p => p.sheet
      ? css`${ModalContent} { opacity: 0; transform: translateY(80%) }`
      : css`${ModalContent} { opacity: 0; transform: scale(0.5) }`
    }
  }

  &.transition-enter-active, &.transition-exit {
    ${ModalBackground} { opacity: 1; }
    ${p => p.sheet
      ? css`${ModalContent} { opacity: 1; transform: none; }`
      : css`${ModalContent} { opacity: 1; transform: scale(1); }`
    }
  }

  &.transition-exit-active {
    ${ModalBackground} { opacity: 0; }
    ${ModalContent} {
      opacity: 0; transform: translateY(80%);
      ${p => p.sheet
        ? css`transform: translateY(80%)`
        : css`opacity: 0; transform: scale(0.5);`
      }
    }
  }

  ${ModalContent} {
    transition-timing-function: ${p => p.sheet ? 'cubic-bezier(0.61, 1, 0.88, 1)' : 'cubic-bezier(0.175, 0.885, 0.32, 1.275);' }
  }
`;
