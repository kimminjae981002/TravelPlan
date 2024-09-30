import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const Title = styled.h1`
  font-size: 2.5em;
  margin: 10px 0 20px;
  color: #222;
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
  font-size: 1.1em;
  line-height: 1.6;
  margin: 15px 0;
  color: #444;
`;

export const UpdateAndDelete = styled.div`
  font-size: 0.9em;
  color: #777;
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
  padding-top: 10px;
  font-style: italic;
  font-weight: bold;
  margin-right: 5px;
`;

export const CreateTime = styled.span`
  padding-top: 10px;
  font-style: italic;
  margin-left: 5px;
  font-size: 10px;
  margin-top: 5px;
`;
