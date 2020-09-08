import styled from "styled-components";
import { aniFadeUp } from "../../styles/animations";
import theme from "../../styles/theme";

import Cursor from '../../images/cursor-edit.png';

export const StyledCanvas = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  overflow: hidden;
  height: 100%;
  width: 100%;
  cursor: url(${Cursor}) 10 50, auto;

  canvas, video {
    position: absolute;
    top: 0;
    left: 0;
  }

  video {
    object-fit: cover;
  }
`;

export const Empty = styled.span`
  pointer-events: none;
  text-align: center;
  font-family: ${theme.font.hand};
  color: ${theme.color('soft')};
  font-size: 3.6rem;
  animation: ${aniFadeUp} 0.35s forwards;

  small {
    display: block;
  }
`;
