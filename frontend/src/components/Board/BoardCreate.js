import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Board = ({ show, handleClose, isLoggedIn }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://52.78.138.193:3000/board', {
        method: 'POST',
        body: formData,
        headers: {
          // 필요시 헤더 설정
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // access token 추가
        },
      });

      if (response.status === 401) {
        const refreshResponse = await fetch(
          'http://52.78.138.193:3000/user/refresh-token',
          {
            method: 'POST',
            credentials: 'include', // 쿠키를 포함하기 위해 필요
          },
        );

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          const accessToken = data.accessToken;

          // 새 액세스 토큰을 로컬 스토리지에 저장
          localStorage.setItem('accessToken', accessToken);

          // 새 토큰으로 다시 게시글 작성 요청
          response = await fetch('http://52.78.138.193:3000/board', {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          });
        } else {
          alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('accessToken');
          window.location.href = '/';
          return;
        }
      }

      if (response.ok) {
        alert('게시글이 작성되었습니다!');
        handleClose(); // 모달 닫기
        window.location.href = '/';
      } else {
        const errorText = await response.text();
        const errorResponse = JSON.parse(errorText);
        const messages = errorResponse.message;
        console.error('Error response:', messages);
        alert('게시글 작성 실패: ' + messages);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('게시글 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>게시글 작성</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              placeholder="게시글 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formContent">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="게시글 내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>이미지 업로드</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            작성하기
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Board;
