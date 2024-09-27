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
  // useState 훅을 이용해 기존 boards를 setBoards로 업데이트
  const [boards, setBoards] = useState([]);

  // 특정 경로로 이동할 수 있는 훅
  const navigate = useNavigate();

  // 게시글 클릭 시 로그인 확인
  const handleCardClick = (id) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    // board/id로 이동한다.
    navigate(`/board/${id}`);
  };

  // 게시글 READ API를 가져와 실행
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
        // 현재 api를 가져와 업데이트
        setBoards(data.boards);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setBoards([]);
      }
    };

    fetchBoards();

    // 빈 배열일 경우 처음 렌더링 시에만 실행
  }, []);

  // useEffect에서 API 호출 boards를 가져온다.
  return (
    <Container>
      {boards.length > 0 ? (
        boards.map((board) => (
          <BoardCard key={board.id} onClick={() => handleCardClick(board.id)}>
            {board.image && (
              <BoardImage
                src={`http://52.78.138.193:3000/uploads/${board.image.split('/').pop()}`} // 이미지 URL 설정
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
