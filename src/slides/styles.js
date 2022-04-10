import styled from "styled-components";

export const Note = styled.p``;

export const Padding = styled.div`
  margin-bottom: 100vh;

  &:last-child {
    margin-bottom: 50vh;
  }
`;

export const SlideWrapper = styled.section`
  box-sizing: border-box;

  padding: 5px 10px;

  &:first-child {
    margin-top: 10vh;
  }

  max-width: 600px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #ddd;
  border-radius: 10px;

  h1 {
    font-size: 1.5em;
  }

  p {
    font-size: 1.2em;
  }

  ${Note} {
    font-size: 0.9em;
  }

  @media screen and (max-width: 700px) {
    h1 {
      font-size: 1em;
    }

    p {
      font-size: 0.9em;
    }

    ${Note} {
      font-size: 0.8em;
    }
  }
`;
