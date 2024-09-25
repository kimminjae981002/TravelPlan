// src/components/Login.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

const CenteredModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Login = ({ show, handleClose, onLoginSuccess, accessToken }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 제출
  const handleLogin = async () => {
    const userData = {
      userId: userId.trim(),
      password: password.trim(),
    };

    try {
      const response = await fetch('http://52.78.138.193:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('로그인 성공');
        onLoginSuccess({ accessToken: data.accessToken });
        handleClose(); // 모달 닫기
      } else {
        const errorText = await response.text();
        const errorResponse = JSON.parse(errorText);
        const messages = errorResponse.message;
        console.error('Error response:', messages);
        if (!userId) {
          alert(messages[0]);
        } else if (!password) {
          alert(messages[0]);
        } else {
          alert(messages);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  // 로그인 모달 창
  return (
    <CenteredModal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type="text"
              placeholder="아이디 입력"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleLogin}>
          로그인
        </Button>
      </Modal.Footer>
    </CenteredModal>
  );
};

export default Login;
