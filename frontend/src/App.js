import './App.css';
import HomePage from './pages/HomePage';
import Navigation from './components/navbar/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardDetail from './components/Board/BoardDetail';
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        // Routes: Route를 그룹화
        <Routes>
          // Route: 특정 경로로 이동
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
