import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import Navigation from './components/navbar/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
