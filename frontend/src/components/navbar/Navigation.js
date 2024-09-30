import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';
import Signup from './Signup';
import Login from './Login';
import Board from '../Board/BoardCreate';
import { Logout } from './Logout'; // logout.js 경로에 맞게 수정

const Navigation = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBoardCreate, setShowBoardCreate] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  // token이 있으면 useState 업데이트
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
      setIsLoggedIn(true);
    }
  }, []);

  // handleShow/Close를 실행하면 useState 업데이트
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleShowBoardCreate = () => setShowBoardCreate(true);

  // 로그인이 완료되면 토큰 세팅
  const handleLoginSuccess = (tokens) => {
    setAccessToken(tokens.accessToken);
    localStorage.setItem('accessToken', tokens.accessToken);
    setIsLoggedIn(true);
    handleCloseLogin();
  };

  const handleLogout = () => {
    Logout(setAccessToken, setIsLoggedIn); // 로그아웃 함수 호출
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{
          borderBottom: '1px solid grey',
        }}
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://files.logomakr.com/4Om7eB-LogoMakr.png" // 로고 이미지 URL
              alt="Logo"
              style={{
                width: '130px', // 이미지 크기 조정
                height: '40px', // 이미지 크기 조정
                marginRight: '10px', // 텍스트와의 간격 조정
              }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {/* 삼항연산자  */}
              {isLoggedIn ? (
                <>
                  <Nav.Link onClick={handleShowBoardCreate}>
                    게시글 작성
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={handleShow}>회원가입</Nav.Link>
                  <Nav.Link onClick={handleShowLogin}>로그인</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* 각 컴포넌트에 파라미터 전달 */}
      <Signup show={showModal} handleClose={handleClose} />
      <Login
        show={showLogin}
        handleClose={handleCloseLogin}
        onLoginSuccess={handleLoginSuccess}
        accessToken={accessToken}
      />
      <Board
        show={showBoardCreate}
        handleClose={() => setShowBoardCreate(false)}
        accessToken={accessToken}
      />{' '}
      {}
    </>
  );
};

export default Navigation;
