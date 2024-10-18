import { performRequest } from '../RefreshToken/RefreshToken';

export const fetchTravelPlan = async (location, duration, who, season) => {
  if (!location || !duration || !who || !season) {
    throw new Error('모든 정보를 선택하세요..');
  }

  const token = localStorage.getItem('accessToken');
  const url = 'https://travelplan.store/openAi';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ destination: location, duration, who, season }),
  };

  const response = await performRequest(url, options);

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.data;
};
