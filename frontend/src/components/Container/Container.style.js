import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 300px;
  background-color: white;
  color: black;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

export const BoardCard = styled.div`
  width: calc(30.33% - 100px); /* 3개씩 나열하기 위해 여백 고려 */
  height: calc(60.33% - 100px); /* 너비와 같은 높이 설정 */
  margin: 20px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  aspect-ratio: 1; /* 정사각형 비율 설정 */

  /* 반응형 디자인 */
  @media (max-width: 768px) {
    width: calc(50% - 40px);
  }

  @media (max-width: 480px) {
    width: calc(100% - 40px);
  }
`;

export const BoardImage = styled.img`
  width: 100%;
  height: 70%;
  border-radius: 8px;
`;

export const BoardTitle = styled.h3`
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  margin: 15px 0;
  text-align: left;
`;

export const BoardDescription = styled.p`
  font-size: 1em;
  color: #777;
  overflow: hidden;
  display: -webkit-box;
  text-align: left;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const BoardAuthor = styled.p`
  color: #777;
  margin-top: auto;
  text-align: left;
  display: flex;
  justify-content: space-between;
`;
