import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 300px;
  background-color: white;
  color: black; /* text color 변경 */
  display: flex;
  flex-wrap: wrap; /* wrap을 사용하여 줄 바꿈 */
  justify-content: center; /* 중앙 정렬 */
`;

export const BoardCard = styled.div`
  width: calc(33.33% - 20px); /* 3개씩 나열하기 위해 */
  margin: 10px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const BoardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

export const BoardTitle = styled.h3`
  font-size: 1.2em;
  color: #333;
`;

export const BoardAuthor = styled.p`
  color: #777;
`;
