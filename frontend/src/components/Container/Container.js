import React, { useState, useEffect } from 'react';
import {
  Container,
  BoardCard,
  BoardImage,
  BoardTitle,
  BoardAuthor,
} from './Container.style';

const BoardContainer = ({ isLoggedIn }) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const token = localStorage.getItem('token'); // 저장된 JWT 토큰을 가져옴
        const response = await fetch('http://52.78.138.193:3000/board', {
          method: 'GET',
          headers: {
            Authorization: isLoggedIn ? `Bearer ${token}` : '', // 인증 헤더 추가
          },
        });

        if (!response.ok) {
          throw new Error('Unauthorized'); // 401 에러 처리
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        setBoards(data.boards); // 데이터 구조에 따라 수정 필요
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchBoards();
  }, [isLoggedIn]);

  return (
    <Container>
      {boards.length > 0 ? (
        boards.map((board) => (
          <BoardCard key={board.id}>
            {board.image && <BoardImage src={board.image} alt={board.title} />}
            <BoardTitle>{board.title}</BoardTitle>
            <BoardAuthor>{board.userName}</BoardAuthor>
          </BoardCard>
        ))
      ) : (
        <p>게시글이 없습니다.</p>
      )}
      {!isLoggedIn && <p>로그인이 필요합니다.</p>} {/* 로그인 상태 표시 */}
    </Container>
  );
};

export default BoardContainer;
