import styled from 'styled-components';

export const Container = styled.div`
  width: 50%;
  margin: 1rem auto; // 중앙 정렬
  display: flex;
  flex-wrap: wrap;
  justify-content: center; // 중앙 정렬
  padding: 2rem;

  @media (max-width: 480px) {
    width: 100%; // 모바일에서는 1개씩
  }
`;

export const BoardCard = styled.div`
  width: 300px; // 카드 너비를 300px로 설정
  height: 400px; // 카드 높이를 400px로 설정
  margin: 20px; // 카드 간격 조정
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 100%; // 모바일에서는 1개씩
    height: 60%;
  }
`;

export const BoardImage = styled.img`
  width: 100%;
  height: 50%;
`;

export const BoardTitle = styled.h3`
  font-size: 2em;
  font-weight: bold;
  color: #333;
  margin: 15px;
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(35, 49, 84, 0.13);
`;

export const BoardDescription = styled.p`
  font-size: 1.3em;
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
  border-top: 1px solid rgba(128, 128, 128, 0.5);
  padding-top: 10px;
`;
