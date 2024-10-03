import styled from 'styled-components';

export const Line = styled.span`
  color: white;
  margin-top: 6px;

  @media (max-width: 600px) {
    display: none; /* max-width 600px 이하일 때 숨김 */
  }
`;
