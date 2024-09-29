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
  const [days, setDays] = useState('3');
  const [isLoading, setIsLoading] = useState(false);

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
            <Button onClick={handleOpenModal}>여행 대신 짜줄까요?</Button>
          </ButtonContainer>
        </div>
      </StyleHeader>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <CloseButton onClick={handleCloseModal}>X</CloseButton>
            <ModalTitle>여행 계획하기</ModalTitle>
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
              <h4>여행 기간 (일 수)</h4>
              <Select value={days} onChange={(e) => setDays(e.target.value)}>
                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}일
                  </option>
                ))}
              </Select>
            </div>
            <SubmitButton
              style={{ marginRight: '10px' }}
              onClick={() => {
                alert('여행생성');
              }}
            >
              계획하기
            </SubmitButton>
            <CancelButton onClick={handleCloseModal}>취소</CancelButton>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default Header;
