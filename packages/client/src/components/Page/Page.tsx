import React from 'react';
import styled from 'styled-components';
import { Header } from '../Header/Header';


export interface PageProps {
  type?: string;
  header?: boolean;
}

const StyledPage = styled.main`
  display: grid;
  grid-template-rows: 8rem 1fr 8rem;
  min-height: 100vh;
`;

export const Page: React.FunctionComponent<PageProps> = ({
  type,
  children,
  header = true
}) =>
  <StyledPage className={type}>
    {header && <Header />}
    {children}
  </StyledPage>;
