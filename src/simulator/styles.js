import styled from "styled-components";

export const Title = styled.h2`
  margin: 15px 0;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 20px;
  width: 90vw;

  @media screen and (min-width: 700px) {
    flex-direction: row;
    height: 90vh;

    canvas {
      max-height: 90vh;
      max-width: 50vw;
    }
  }
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 2px;
  margin: 15px 0 0;
  background-color: #eee;
  border-radius: 20px;

  min-width: 300px;

  max-height: 90vh;

  font-size: 0.7em;

  @media screen and (min-width: 700px) {
    font-size: initial;
    margin: 0 15px;
  }
`;

export const ControlsScrollable = styled.div`
  overflow-y: auto;
`;

export const ControlsButton = styled.button`
  align-self: center;
  margin: 4px 0;
`;

export const VoteSplitter = styled.div`
  font-size: 0.8em;
  padding: 8px;
`;

export const RangeTrack = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.7em;

  height: 12px;
  margin-top: 2px;
  margin-bottom: 2px;
  width: 150px;
`;

export const InnerRangeTrack = styled.div`
  margin: 0 4px;
`;
