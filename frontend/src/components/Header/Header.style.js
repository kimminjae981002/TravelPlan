import styled from 'styled-components';

export const StyleHeader = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 25%;
  padding: 0 20px;

  @media (max-width: 600px) {
    padding: 30px 30px;
  }
`;

export const Logo = styled.img`
  width: 25%;
  height: 70%;
  margin-right: 20px;
  border-radius: 10px;

  @media (max-width: 600px) {
    width: 50%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 0.5rem;
  }
`;

export const Title = styled.div`
  text-align: center;

  /* 기본 스타일 */
  div {
    display: inline-block;
  }

  /* 첫 번째 div 스타일 */
  div:first-child {
    margin-bottom: 3px;
    padding: 5px 5px;
    color: rgba(90, 133, 223, 1.84);
    font-weight: bold;
    font-size: 20px;
  }

  /* 두 번째 div 스타일 */
  div:last-child {
    margin-top: 10px;
    margin-bottom: 15px;
    color: white;
    font-size: 25px;
    font-weight: bold;
  }

  /* 미디어 쿼리 */
  @media (max-width: 600px) {
    div:first-child {
      font-size: 20px; /* 작은 화면에서 폰트 크기 줄이기 */
    }

    div:last-child {
      font-size: 15px; /* 작은 화면에서 폰트 크기 줄이기 */
    }
  }
`;

export const Box = styled.div`
  color: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 6px 0px;
  margin: 0 120px;
  background-color: rgba(100, 163, 223, 0.84);
  margin-bottom: 50px;

  @media (max-width: 600px) {
    font-size: 0.7rem;
    margin: 30px 60px;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 10px;
`;

export const Button = styled.button`
  padding: 3px 10px;
  font-size: 15px;
  background: none;
  color: grey;
  border: 1px solid grey;
  border-radius: 30px;
  cursor: pointer;

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }

  &:hover {
    color: black;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const ModalTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 25px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background: none;
  color: grey;
  border: none;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;
export const CancelButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background: none;
  color: grey;
  border: none;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    color: black;
  }
`;
