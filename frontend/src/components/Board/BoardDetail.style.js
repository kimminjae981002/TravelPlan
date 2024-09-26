import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px; 
  margin: 20px auto; 
  padding: 20px;
  background-color: #f9f9f9; 
  border-radius: 8px;  
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
  overflow: hidden;치면 숨김
`;

export const Title = styled.h1`
  font-size: 2em;
  margin: 20px 0;
  color: #333;
`;

export const Image = styled.img`
  width: 100%;
  height: 500px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const Content = styled.p`
  font-size: 1.2em;
  line-height: 1.5;
  margin: 20px 0;
  color: #555;
`;

export const Footer = styled.div`
  font-size: 0.9em;
  color: #777;
  margin-top: 10px;
  text-align: right;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Author = styled.span`
  padding-top: 20px;
`;
