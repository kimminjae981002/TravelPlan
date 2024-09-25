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
  padding: 20px; /* 컨테이너 내 여백 추가 */
`;

export const BoardCard = styled.div`
  width: calc(33.33% - 40px); /* 3개씩 나열하기 위해 여백 고려 */
  margin: 20px; /* 카드 간격을 늘리기 위한 여백 */
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const BoardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

export const BoardTitle = styled.h3`
  font-size: 1.5em; /* 제목 크기 증가 */
  font-weight: bold; /* 제목 굵게 */
  color: #333;
  margin: 10px 0; /* 상하 여백 추가 */
`;

export const BoardDescription = styled.p`
  font-size: 1em; /* 내용 크기 */
  color: #555;
  overflow: hidden; /* 내용이 넘칠 경우 숨김 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 2줄로 제한 */
`;

export const BoardAuthor = styled.p`
  color: #777;
  margin-top: auto; /* 하단 정렬을 위한 마진 */
`;
