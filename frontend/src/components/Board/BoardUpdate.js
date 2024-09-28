import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { performRequest } from '../RefreshToken/RefreshToken';

const BoardUpdate = ({ show, handleClose, boardId, onUpdate }) => {
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // 게시글 정보 가져오기
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch(
          `http://52.78.138.193:3000/board/${boardId}`,
        );
        if (!response.ok) throw new Error('게시글을 찾을 수 없습니다.');
        const data = await response.json();
        setEditTitle(data.title);
        setEditContent(data.content);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchBoard();
  }, [boardId]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', editTitle);
    formData.append('content', editContent);

    const url = `http://52.78.138.193:3000/board/${boardId}`;
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: formData,
    };

    try {
      const response = await performRequest(url, options);

      if (response && response.ok) {
        alert('게시글 수정이 완료되었습니다.');
        onUpdate();
        handleClose();
      } else {
        const errorText = await response.json();
        console.error('수정 실패:', errorText.message);
        alert(errorText.message);
      }
    } catch (error) {
      console.error('수정 중 오류 발생:', error);
      alert('게시글 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>게시글 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditSubmit}>
          <Form.Group controlId="formEditTitle">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              placeholder="게시글 제목을 입력하세요"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEditContent">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="게시글 내용을 입력하세요"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              required
            />
          </Form.Group>

          <div style={{ marginTop: '10px' }}>
            <Button variant="primary" type="submit">
              수정하기
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BoardUpdate;
