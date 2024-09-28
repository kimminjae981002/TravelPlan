import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CenteredModal } from '../Styles/Common/Common.style';
import { performRequest } from '../RefreshToken/RefreshToken';

const Board = ({ show, handleClose, isLoggedIn }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    if (image) {
      formData.append('image', image);
    }

    const url = 'https://xn--9r2b17b.shop/board';
    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    };

    try {
      const response = await performRequest(url, options);

      if (response && response.ok) {
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
    <CenteredModal show={show} onHide={handleClose} centered>
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
    </CenteredModal>
  );
};

export default Board;
