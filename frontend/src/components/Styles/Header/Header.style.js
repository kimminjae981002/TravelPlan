import styled from 'styled-components';

export const StyleHeader = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 25%;
  background-color: rgba(200, 200, 200, 200);
  padding: 0 20px;
`;

export const Logo = styled.img`
  width: 23%;
  height: 70%;
  margin-right: 20px;
  border-radius: 10px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 18px;
  margin: 0;
  color: white;
`;

export const ButtonContainer = styled.div`
  margin-top: 10px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 15px;
  background: none;
  color: grey;
  border: none;
  cursor: pointer;

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
