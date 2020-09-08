import { keyframes } from "styled-components";

export const aniFadeUp = keyframes`
  from { transform: translateY(1rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const aniFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
