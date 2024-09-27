import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Board = ({ show, handleClose, isLoggedIn }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    // event 기본 방지
    e.preventDefault();

    // form 제출
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
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      // 리프레쉬 토큰 검증 및 엑세스 토큰 갱신
      if (response.status === 401) {
        const refreshResponse = await fetch(
          'http://52.78.138.193:3000/user/refresh-token',
          {
            method: 'POST',
            credentials: 'include', // 쿠키 포함 설정
          },
        );

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          const accessToken = data.accessToken;

          localStorage.setItem('accessToken', accessToken);

          response = await fetch('http://52.78.138.193:3000/board', {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          });
        } else {
          // 리프레쉬토큰이 없다면 재로그인
          alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('accessToken');
          window.location.href = '/';
          return;
        }
      }

      if (response.ok) {
        alert('게시글이 작성되었습니다!');
        handleClose();
        window.location.href = '/';
      } else {
        const errorText = await response.text();
        const errorResponse = JSON.parse(errorText);
        const messages = errorResponse.message;
        console.error('Error response:', messages);
        alert(messages);
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
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
          <div style={{ marginTop: '10px' }}>
            <Button variant="primary" type="submit">
              작성하기
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Board;
