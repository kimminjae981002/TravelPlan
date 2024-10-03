import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  overflow: hidden;
`;

export const Title = styled.h1`
  font-size: 2.5em;
  margin: 10px 0 20px;
  color: white;
  font-weight: bold;
  text-align: left;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  margin-bottom: 20px;
`;

export const Content = styled.p`
  color: white;
  font-size: 1.1em;
  line-height: 1.6;
  margin: 15px 0;
`;

export const UpdateAndDelete = styled.div`
  color: white;
  font-size: 0.9em;
  margin-top: 20px;
  text-align: right;
`;

export const Button = styled.button`
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

export const Author = styled.span`
  color: white;
  padding-top: 10px;
  font-style: italic;
  font-weight: bold;
  margin-right: 5px;
`;

export const CreateTime = styled.span`
  color: white;
  padding-top: 10px;
  font-style: italic;
  margin-left: 5px;
  font-size: 10px;
  margin-top: 5px;
`;
