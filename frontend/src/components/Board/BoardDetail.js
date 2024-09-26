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

const BoardDetail = ({ setBoards }) => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    const decodedToken = jwtDecode(token);
    setCurrentUserId(decodedToken.id);
  }, []);

  useEffect(() => {
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

    fetchBoard();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  if (!board) return <p>게시글을 찾을 수 없습니다.</p>;

  const handleEdit = () => {};

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
            <Button onClick={handleEdit}>수정</Button>
            <Button onClick={handleDelete}>삭제</Button>
          </div>
        )}
        <Author> 작성자: {board.userName}</Author>
      </Footer>
    </Container>
  );
};

export default BoardDetail;
