import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Title,
  Content,
  Footer,
  Image,
  Button,
  Author,
} from './BoardDetail.style';
import { jwtDecode } from 'jwt-decode';
import BoardUpdate from './BoardUpdate'; // BoardUpdate 컴포넌트 import

// setBoard 업데이트를 가져온다.
const BoardDetail = ({ setBoards }) => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  // 토큰을 decode하여 유저 정보 가져옴
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    const decodedToken = jwtDecode(token);
    setCurrentUserId(decodedToken.id);
  }, []);

  const fetchBoard = async () => {
    try {
      const response = await fetch(`http://52.78.138.193:3000/board/${id}`);

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
  };

  // id값이 변경될 때마다 fetchBoard 함수 호출
  useEffect(() => {
    fetchBoard();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!board) return <p>게시글을 찾을 수 없습니다.</p>;

  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleUpdate = () => fetchBoard();

  // 게시글 삭제
  const handleDelete = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`http://52.78.138.193:3000/board/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (response.ok) {
          alert('게시글 삭제가 되었습니다.');

          window.location.href = '/';

          setBoards((prevBoards) =>
            prevBoards.filter((board) => board.id !== id),
          );
        } else {
          const errorText = await response.text();
          console.error('삭제 실패:', errorText);
          alert(`게시글 삭제에 실패했습니다: ${errorText}`);
        }
      } catch (error) {
        console.error('삭제 중 오류 발생:', error);
      }
    }
  };

  return (
    <Container>
      {board.image && (
        <Image
          src={`http://52.78.138.193:3000/uploads/${board.image.split('/').pop()}`}
          alt={board.title}
        />
      )}
      <Title>{board.title}</Title>
      <Content>{board.content}</Content>
      <Footer>
        {board.userId === currentUserId && (
          <div>
            <Button onClick={handleShowEditModal}>수정</Button>
            <Button onClick={handleDelete}>삭제</Button>
          </div>
        )}
        <Author> 작성자: {board.userName}</Author>
      </Footer>

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
