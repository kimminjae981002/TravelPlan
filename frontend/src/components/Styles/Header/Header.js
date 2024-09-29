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
  const [isPlacesModalOpen, setIsPlacesModalOpen] = useState(false);
  const [isTravelPlanModalOpen, setIsTravelPlanModalOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('관광지'); // 기본 카테고리 설정
  const [duration, setDuration] = useState(''); // 기간
  const [who, setWho] = useState('가족'); // 구성원
  const [season, setSeason] = useState(''); // 계절

  const handleOpenPlacesModal = () => setIsPlacesModalOpen(true);
  const handleClosePlacesModal = () => setIsPlacesModalOpen(false);
  const handleOpenTravelPlanModal = () => setIsTravelPlanModalOpen(true);
  const handleCloseTravelPlanModal = () => setIsTravelPlanModalOpen(false);

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

  const seasons = ['봄', '여름', '가을', '겨울'];

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

      if (data.success) {
        const places = data.data.join('\n');
        alert(places); // 추천 장소 출력
      } else {
        alert('오류 발생: ' + data.message);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      alert('API 호출 중 오류가 발생했습니다.');
    }
  };

  const handleTravelPlanSubmit = async () => {
    if (!location || !duration || !who || !season) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/openAi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ destination: location, duration, who, season }),
      });

      const data = await response.json();
      if (data.success) {
        alert(data.data); // 여행 일정 출력
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
            <Button onClick={handleOpenPlacesModal}>
              지역 관광지/맛집 목록보기
            </Button>
            <Button
              onClick={handleOpenTravelPlanModal}
              style={{ marginLeft: '10px' }}
            >
              AI 여행 일정 짜줘
            </Button>
          </ButtonContainer>
        </div>
      </StyleHeader>

      {/* 관광지/맛집 추천 모달 */}
      {isPlacesModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <CloseButton onClick={handleClosePlacesModal}>X</CloseButton>
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

            <SubmitButton onClick={handleSubmit}>추천받기</SubmitButton>
            <CancelButton onClick={handleClosePlacesModal}>
              안 받을래요..
            </CancelButton>
          </ModalContainer>
        </ModalOverlay>
      )}

      {/* 여행 일정 생성 모달 */}
      {isTravelPlanModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <CloseButton onClick={handleCloseTravelPlanModal}>X</CloseButton>
            <ModalTitle>여행 일정 생성하기</ModalTitle>
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
              <h4>여행 기간</h4>
              <Select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="">기간을 선택하세요</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1}일`}>
                    {i + 1}일
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <h4>구성원</h4>
              <Select value={who} onChange={(e) => setWho(e.target.value)}>
                <option value="가족">가족</option>
                <option value="친구">친구</option>
                <option value="혼자">혼자</option>
                <option value="커플">커플</option>
              </Select>
            </div>
            <div>
              <h4>계절</h4>
              <Select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
              >
                <option value="">계절을 선택하세요</option>
                {seasons.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </div>

            <SubmitButton onClick={handleTravelPlanSubmit}>
              일정 만들기
            </SubmitButton>
            <CancelButton onClick={handleCloseTravelPlanModal}>
              안 받을래요..
            </CancelButton>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default Header;
