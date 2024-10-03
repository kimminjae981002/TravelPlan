import React, { useState } from 'react';
import {
  StyleHeader,
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
  Box,
} from './Header.style';
import { locations } from '../Common/Common';
import { fetchPlaces } from '../Travel/Travel';
import { fetchTravelPlan } from '../Open-ai/Open-ai';

const Header = () => {
  const [isPlacesModalOpen, setIsPlacesModalOpen] = useState(false);
  const [isTravelPlanModalOpen, setIsTravelPlanModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [duration, setDuration] = useState('');
  const [who, setWho] = useState('');
  const [season, setSeason] = useState('');

  const handleOpenPlacesModal = () => setIsPlacesModalOpen(true);
  const handleClosePlacesModal = () => setIsPlacesModalOpen(false);
  const handleOpenTravelPlanModal = () => setIsTravelPlanModalOpen(true);
  const handleCloseTravelPlanModal = () => setIsTravelPlanModalOpen(false);

  const handlePlacesClick = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    handleOpenPlacesModal();
  };

  const handleTravelPlanClick = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    handleOpenTravelPlanModal();
  };

  // 장소 추천
  const handlePlacesSubmit = async () => {
    try {
      const places = await fetchPlaces(selectedLocation, selectedCategory); // renamed
      alert(places); // 추천 장소 출력
    } catch (error) {
      alert('오류 발생: ' + error.message);
    }
  };

  // 여행 계획
  const handleTravelPlanSubmit = async () => {
    try {
      const travelPlan = await fetchTravelPlan(
        selectedLocation,
        duration,
        who,
        season,
      );
      alert(travelPlan);
    } catch (error) {
      alert('오류 발생: ' + error.message);
    }
  };

  return (
    <>
      <StyleHeader>
        <div>
          <Title>
            <div>TravelPlan</div>
            <div>AI를 이용하여 여행을 계획해 드릴게요.</div>
          </Title>
          <ButtonContainer style={{ marginBottom: '60px' }}>
            <Button
              onClick={handlePlacesClick}
              style={{ marginRight: '10px', color: 'white' }}
            >
              지역 관광지/맛집 목록보기{' '}
              <span style={{ color: 'rgba(0, 133, 223, 0.84)' }}>⇒</span>
            </Button>
            <Button
              onClick={handleTravelPlanClick}
              style={{ marginLeft: '10px', color: 'white' }}
            >
              AI 여행 일정{' '}
              <span style={{ color: 'rgba(0, 133, 223, 0.84)' }}>⇒</span>
            </Button>
          </ButtonContainer>

          <Box>후기 모음</Box>
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
                value={selectedLocation} // renamed
                onChange={(e) => setSelectedLocation(e.target.value)} // renamed
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
                value={selectedCategory} // renamed
                onChange={(e) => setSelectedCategory(e.target.value)} // renamed
              >
                <option value="">카테고리를 선택하세요</option>
                <option value="관광지">관광지</option>
                <option value="맛집">맛집</option>
              </Select>
            </div>
            <SubmitButton onClick={handlePlacesSubmit}>추천받기</SubmitButton>
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
                value={selectedLocation} // renamed
                onChange={(e) => setSelectedLocation(e.target.value)} // renamed
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
                <option value="">구성원을 선택하세요</option>
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
                <option value="봄">봄</option>
                <option value="여름">여름</option>
                <option value="가을">가을</option>
                <option value="겨울">겨울</option>
              </Select>
            </div>
            <SubmitButton onClick={handleTravelPlanSubmit}>
              일정 만들기
            </SubmitButton>
            <CancelButton onClick={handleCloseTravelPlanModal}>
              AI 못 믿겠어요..
            </CancelButton>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default Header;
