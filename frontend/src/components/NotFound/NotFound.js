import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 존재하지 않는 url로 이동 시 홈화면으로
const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);
};

export default NotFound;
