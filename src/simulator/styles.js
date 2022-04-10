import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 20px;
  height: 90vh;
  width: 100vw;

  canvas {
    max-height: 90vh;
    max-width: 50vw;
  }
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 2px;
  margin: 0;
  background-color: #eee;
  border-radius: 20px;

  min-width: 300px;

  max-height: 90vh;
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
