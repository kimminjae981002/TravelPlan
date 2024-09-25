import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import Navigation from './components/navbar/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardDetail from './components/Board/BoardDetail';
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
