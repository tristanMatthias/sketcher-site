import styled from 'styled-components';
import t from '../../styles/theme';

export const TextInput = styled.input`
  display: block;
  height: ${t.size('xlarge')};
  border-radius: ${t.borderRadius};
  font-size: ${t.size()};
  border: ${t.borders.main};
  padding: 0 ${t.size('small')};
  font-family: ${t.font.body};
  transition: all 0.2s;
  width: 100%;

  &:hover { border-color: ${t.color('soft')}; }

  &:focus { border-color: ${t.color('alt')}; }

  &::placeholder {
    color: ${t.color('soft')};
    opacity: 1;
  }

  &:disabled {
    background: ${t.color('softest')};
    pointer-events: none;
    cursor: not-allowed;
  }
`;
