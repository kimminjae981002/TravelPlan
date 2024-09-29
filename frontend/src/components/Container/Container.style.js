import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 70vh;
  margin-top: 300px;
  background-color: white;
  color: black;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 300px;
`;

export const BoardCard = styled.div`
  width: calc(25% - 40px);
  height: calc(60.33% - 100px);
  margin: 30px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  aspect-ratio: 1;

  @media (max-width: 1700px) {
    width: calc(33.33% - 40px);
    font-size: 0.9em;
  }

  @media (max-width: 1200px) {
    width: calc(50% - 40px);
    font-size: 0.85em;
  }

  @media (max-width: 800px) {
    width: 500px;
    font-size: 0.8em;
  }

  @media (max-width: 580px) {
    width: 400px;
    display: flex;
    justify-content: center;
    font-size: 0.8em;
  }

  @media (max-width: 480px) {
    width: 25rem;
    font-size: 0.8em;
    margin-right: 13rem;
  }
`;

export const BoardImage = styled.img`
  width: 100%;
  height: 50%;
  border-radius: 8px;
`;

export const BoardTitle = styled.h3`
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  margin: 15px 0;
  text-align: left;
`;

export const BoardDescription = styled.p`
  font-size: 1em;
  color: #777;
  overflow: hidden;
  display: -webkit-box;
  text-align: left;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const BoardAuthor = styled.p`
  color: #777;
  margin-top: auto;
  text-align: left;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(128, 128, 128, 0.5);
  padding-top: 10px;
`;
