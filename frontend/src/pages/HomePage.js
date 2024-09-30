import React from 'react';
import Header from '../components/Header/Header';
import BoardContainer from '../components/Container/Container';

const HomePage = ({ isLoggedIn }) => {
  return (
    <>
      <Header />
      <BoardContainer isLoggedIn={isLoggedIn} /> {}
    </>
  );
};

export default HomePage;
