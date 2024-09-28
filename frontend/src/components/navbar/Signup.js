// src/components/Signup.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CenteredModal } from '../Styles/Common/Common.style';

// Navigation.js에서 파라미터를 받아온다.
const Signup = ({ show, handleClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');

  const handleSignup = async () => {
    // 정보
    const userData = {
      username: username.trim(),
      password: password.trim(),
      passwordCheck: passwordCheck.trim(),
      name: name.trim(),
    };

    try {
      const response = await fetch('http://52.78.138.193:3000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('회원가입 성공!');
        handleClose();
      } else {
        const errorText = await response.json();

        // message가 배열이라면 하나씩 아니라면 1개만
        const messages = Array.isArray(errorText.message)
          ? errorText.message
          : [errorText.message];

        const combinedMessages = messages.join('\n');
        alert(combinedMessages);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  //회원가입 모달 창
  return (
    <CenteredModal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>회원가입</Modal.Title>
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

          <Form.Group controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호 재입력"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Label>닉네임</Form.Label>
            <Form.Control
              type="text"
              placeholder="닉네임 입력"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleSignup}>
          회원가입
        </Button>
      </Modal.Footer>
    </CenteredModal>
  );
};

export default Signup;
