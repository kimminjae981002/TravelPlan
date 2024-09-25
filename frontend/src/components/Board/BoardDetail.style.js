import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px; /* 최대 너비 설정 */
  margin: 20px auto; /* 중앙 정렬 */
  padding: 20px;
  background-color: #f9f9f9; /* 배경색 */
  border-radius: 8px; /* 둥근 모서리 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 */
  overflow: hidden; /* 내용이 넘치면 숨김 */
`;

export const Title = styled.h1`
  font-size: 2em; /* 제목 크기 */
  margin: 20px 0; /* 상하 여백 */
  color: #333; /* 제목 색상 */
`;

export const Image = styled.img`
  width: 100%; /* 가로 100% */
  max-height: 300px; /* 최대 높이 */
  object-fit: cover; /* 이미지를 부모 요소에 맞춤 */
  border-radius: 8px; /* 둥근 모서리 */
  margin-bottom: 20px; /* 이미지와 제목 사이 여백 */
`;

export const Content = styled.p`
  font-size: 1.2em; /* 내용 크기 */
  line-height: 1.5; /* 줄 간격 */
  margin: 20px 0; /* 상하 여백 */
  color: #555; /* 내용 색상 */
`;

export const Author = styled.p`
  font-size: 0.9em; /* 작성자 폰트 크기 */
  color: #777; /* 흐린 색상 */
  margin-top: 10px; /* 위쪽 마진 */
  text-align: right; /* 오른쪽 정렬 */
`;

export const Button = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
