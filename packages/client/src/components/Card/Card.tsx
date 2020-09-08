import styled from 'styled-components';
import theme from '../../styles/theme';

export const Card = styled.div`
  background: $${theme.color('white')};
  border-radius: ${theme.borderRadius};
  padding: ${theme.size('medium')};
`;
