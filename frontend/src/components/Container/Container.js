import React, { useState, useEffect } from 'react';
import {
  Container,
  BoardCard,
  BoardImage,
  BoardTitle,
  BoardAuthor,
} from './Container.style';

const BoardContainer = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch('http://52.78.138.193:3000/board', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Error fetching posts'); // 401 에러 처리
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        setBoards(data.boards); // 데이터 구조에 따라 수정 필요
      } catch (error) {
        console.error('Error fetching posts:', error);
        setBoards([]);
      }
    };

    fetchBoards();
  }, []);
  console.log(boards);
  return (
    <Container>
      {boards.length > 0 ? (
        boards.map((board) => (
          <BoardCard key={board.id}>
            {board.image && (
              <BoardImage
                src={`http://52.78.138.193:3000/uploads/${board.image}`}
              />
            )}
            <BoardTitle>{board.title}</BoardTitle>
            <BoardAuthor>{board.userName}</BoardAuthor>
          </BoardCard>
        ))
      ) : (
        <p>게시글이 없습니다.</p> // 게시글이 없을 때 메시지
      )}
    </Container>
  );
};

export default BoardContainer;
