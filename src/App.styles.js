import styled from "styled-components";

export const StyledApp = styled.div`
  font-family: "Poppins", cursive;
  text-align: center;
`;

export const GraphZone = styled.div`
  position: absolute;

  width: 100%;
  height: 50vh;
  background-color: white;

  border-bottom: 2px solid lightgray;

  @media screen and (min-width: 700px) {
    left: 40vw;
    width: 50vw;
    height: 100vh;

    border-bottom: 2px solid transparent;
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SlideZone = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  width: 100%;

  background-color: transparent;
  height: 60vh;
  bottom: 0;
  overflow: auto;

  @media screen and (min-width: 700px) {
    display: block;

    margin: 15px;
    width: 30vw;
    height: 100vh;
  }
`;
