// src/components/Login.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CenteredModal } from '../Common/Common.style';

const Login = ({ show, handleClose, onLoginSuccess, accessToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const userData = {
      username: username.trim(),
      password: password.trim(),
    };

    try {
      const response = await fetch('https://xn--9r2b17b.shop/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        alert('로그인 성공');
        // 토큰 전달
        onLoginSuccess({ accessToken: data.accessToken });
        handleClose();
      } else {
        const errorText = await response.text();
        const errorResponse = JSON.parse(errorText);
        const messages = errorResponse.message;
        console.error('Error response:', messages);
        if (!username) {
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
    // 모달이 show면 show onHide면 close
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
