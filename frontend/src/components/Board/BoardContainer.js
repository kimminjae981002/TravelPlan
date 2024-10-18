import React, { useState, useEffect } from 'react';
import {
  Container,
  BoardCard,
  BoardImage,
  BoardTitle,
  BoardAuthor,
  BoardDescription,
} from './BoardContainer.style';
import { useNavigate } from 'react-router-dom';
import { performRequest } from '../RefreshToken/RefreshToken';

const BoardContainer = () => {
  // useState 훅을 이용해 기존 boards를 setBoards로 업데이트
  const [boards, setBoards] = useState([]);

  // 특정 경로로 이동할 수 있는 훅
  const navigate = useNavigate();

  const handleCardClick = async (id) => {
    const token = localStorage.getItem('accessToken');

    // 토큰이 없으면 로그인 필요 알림
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    // 현재 액세스 토큰을 사용하여 게시글 조회를 시도
    const response = await performRequest(
      `https://travelplan.store/board/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response && response.ok) {
      // 액세스 토큰이 유효한 경우 바로 게시글로 이동
      navigate(`/board/${id}`);
    } else if (response.status === 401 || response.status === 403) {
      // 토큰이 만료되었거나 유효하지 않은 경우
      alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      localStorage.removeItem('accessToken'); // 토큰 삭제
      // 로그인이 필요한 페이지로 이동
      navigate('/');
    } else {
      alert('게시글 조회에 실패했습니다.');
    }
  };

  // 게시글 READ API를 가져와 실행
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch('https://travelplan.store/board', {
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
                src={board.image} // 이미지 URL 설정
              />
            )}
            <BoardTitle>{board.title}</BoardTitle>
            <BoardDescription>{board.content}</BoardDescription>
            <BoardAuthor>
              <span style={{ fontWeight: 'bold' }}>by. {board.userName}</span>
            </BoardAuthor>
          </BoardCard>
        ))
      ) : (
        <p style={{ marginTop: '40px', color: 'white' }}>게시글이 없습니다.</p>
      )}
    </Container>
  );
};

export default BoardContainer;
