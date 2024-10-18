import { performRequest } from '../RefreshToken/RefreshToken';

export const fetchPlaces = async (selectedLocation, setSelectedCategory) => {
  if (!selectedLocation) {
    throw new Error('지역을 선택해주세요.');
  }

  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  const url = 'https://travelplan.store/travel';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      keyword: `${selectedLocation} ${setSelectedCategory}`,
    }),
  };

  const response = await performRequest(url, options);

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.data.join('\n');
};
