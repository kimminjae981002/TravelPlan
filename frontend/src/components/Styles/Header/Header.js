import React, { useState } from 'react';
import {
  StyleHeader,
  Logo,
  Title,
  ButtonContainer,
  Button,
  ModalOverlay,
  ModalContainer,
  CloseButton,
  ModalTitle,
  Select,
  SubmitButton,
  CancelButton,
} from './Header.style';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('관광지'); // 기본 카테고리 설정

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const locations = [
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '수원',
    '고양',
    '용인',
    '성남',
    '안양',
    '부천',
    '춘천',
    '강릉',
    '원주',
    '동해',
    '청주',
    '음성',
    '진천',
    '제천',
    '단양',
    '천안',
    '공주',
    '논산',
    '서산',
    '보령',
    '전주',
    '군산',
    '익산',
    '정읍',
    '남원',
    '김제',
    '광양',
    '여수',
    '순천',
    '목포',
    '나주',
    '포항',
    '구미',
    '경주',
    '영주',
    '안동',
    '창원',
    '김해',
    '양산',
    '진주',
    '거제',
    '제주',
    '서귀포',
  ];

  const handleSubmit = async () => {
    if (!location) {
      alert('지역을 선택해주세요.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/travel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ keyword: `${location} ${category}` }),
      });

      const data = await response.json();
      console.log(data, 'data');
      console.log(location, category);
      if (data.success) {
        const places = data.data.join('\n');
        alert('추천 장소\n' + places); // 추천 장소 출력
      } else {
        alert('오류 발생: ' + data.message);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      alert('API 호출 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <StyleHeader>
        <Logo
          src="https://plus.unsplash.com/premium_photo-1661944456241-c920f93bd87b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8JUVDJTk3JUFDJUVEJTk2JTg5fGVufDB8fDB8fHww"
          alt="로고"
        />
        <div>
          <Title>
            AI를 이용하여 자동으로 여행을 계획 해 드릴게요.
            <br />
            ↓↓ 글을 클릭하여 사용해보세요.
          </Title>
          <ButtonContainer>
            <Button onClick={handleOpenModal}>지역 관광지/맛집 목록보기</Button>
          </ButtonContainer>
        </div>
      </StyleHeader>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <CloseButton onClick={handleCloseModal}>X</CloseButton>
            <ModalTitle>관광지, 맛집 추천받기</ModalTitle>
            <div>
              <h4>지역 선택</h4>
              <Select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">지역을 선택하세요</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <h4>카테고리 선택</h4>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="관광지">관광지</option>
                <option value="맛집">맛집</option>
              </Select>
            </div>

            <SubmitButton
              style={{ marginRight: '10px' }}
              onClick={handleSubmit}
            >
              추천받기
            </SubmitButton>
            <CancelButton onClick={handleCloseModal}>
              안 받을래요..
            </CancelButton>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default Header;
