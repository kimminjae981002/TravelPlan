import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Title,
  Content,
  UpdateAndDelete,
  Image,
  Button,
  Author,
  CreateTime,
} from './BoardDetail.style';
import { jwtDecode } from 'jwt-decode';
import BoardUpdate from './BoardUpdate'; // BoardUpdate 컴포넌트 import
import { handleBoardDelete } from './BoardDelete';

// setBoard 업데이트를 가져온다.
const BoardDetail = ({ setBoards }) => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleUpdate = () => fetchBoard();

  // 토큰을 decode하여 유저 정보 가져옴
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUserId(decodedToken.id);
    } else {
      alert('로그인이 필요합니다.');
      window.location.href = '/';
    }
  }, [setCurrentUserId]);

  const fetchBoard = useCallback(async () => {
    try {
      const response = await fetch(
        `https://main--kimminjae98.netlify.app/${id}`,
      );
      if (!response.ok) {
        throw new Error('게시글을 찾을 수 없습니다.');
      }
      const data = await response.json();
      setBoard(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]); // id를 의존성으로 추가

  // id값이 변경될 때마다 fetchBoard 함수 호출
  useEffect(() => {
    fetchBoard();
  }, [id, fetchBoard]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!board) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <Container>
      <Title>{board.title}</Title>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '10px 0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Author>{board.userName}</Author>
          <CreateTime style={{ marginLeft: '5px' }}>
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
          </CreateTime>
        </div>
        {board.userId === currentUserId && (
          <UpdateAndDelete style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              onClick={handleShowEditModal}
              style={{ marginRight: '10px' }}
            >
              수정
            </Button>
            <Button onClick={() => handleBoardDelete(board.id, setBoards)}>
              삭제
            </Button>
          </UpdateAndDelete>
        )}
      </div>

      {board.image && <Image src={board.image} />}
      <div>
        <Content
          dangerouslySetInnerHTML={{
            __html: board.content.replace(/\n/g, '<br />'), // 줄바꿈을 <br />로 변환
          }}
        />
      </div>

      {/* 게시글 수정 */}
      <BoardUpdate
        show={showEditModal}
        handleClose={handleCloseEditModal}
        boardId={id}
        onUpdate={handleUpdate}
      />
    </Container>
  );
};

export default BoardDetail;
