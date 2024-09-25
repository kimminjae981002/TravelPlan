import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Title,
  Content,
  Author,
  Image,
  Button,
} from './BoardDetail.style';
import { jwtDecode } from 'jwt-decode';

const BoardDetail = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserInfo(decodedToken);
    }
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

  //   const isAuthor = board.userName === currentUserName;

  const handleEdit = () => {
    // 수정 로직
    console.log('Edit post');
  };

  const handleDelete = () => {
    // 삭제 로직
    console.log('Delete post');
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
      <Author>
        작성자: {board.userName}
        {/* {
          <div>
            <Button onClick={handleEdit}>수정</Button>
            <Button onClick={handleDelete}>삭제</Button>
          </div>
        } */}
      </Author>
    </Container>
  );
};

export default BoardDetail;
