import React from 'react';
import { Header } from '../components/Styles/Header/Header.style';
import BoardContainer from '../components/Container/Container';

const HomePage = ({ isLoggedIn }) => {
  // 로그인 상태를 prop으로 받음
  return (
    <>
      <Header />
      <BoardContainer isLoggedIn={isLoggedIn} /> {/* 로그인 상태 전달 */}
    </>
  );
};

export default HomePage;
