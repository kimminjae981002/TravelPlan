import React, { useState, useEffect } from 'react';
import {
  Container,
  BoardCard,
  BoardImage,
  BoardTitle,
  BoardAuthor,
  BoardDescription,
} from './Container.style';
import { useNavigate } from 'react-router-dom';

const BoardContainer = () => {
  const [boards, setBoards] = useState([]);

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    navigate(`/board/${id}`);
  };

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch('http://52.78.138.193:3000/board', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Error fetching posts');
        }

        const data = await response.json();

        setBoards(data.boards);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setBoards([]);
      }
    };

    fetchBoards();
  }, []);

  return (
    <Container>
      {boards.length > 0 ? (
        boards.map((board) => (
          <BoardCard key={board.id} onClick={() => handleCardClick(board.id)}>
            {board.image && (
              <BoardImage
                src={`http://52.78.138.193:3000/uploads/${board.image.split('/').pop()}`} // 이미지 URL 설정
                alt={board.title}
              />
            )}
            <BoardTitle>{board.title}</BoardTitle>
            <BoardDescription>{board.content}</BoardDescription>
            <BoardAuthor>
              <span>{board.userName}</span>
              <span>
                {new Date(
                  new Date(board.createdAt).getTime() - 9 * 60 * 60 * 1000,
                ).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </span>
            </BoardAuthor>
          </BoardCard>
        ))
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </Container>
  );
};

export default BoardContainer;
