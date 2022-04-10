import React from "react";
import { Range, getTrackBackground } from "react-range";

import { rawData, candidatE1, candidatE2 } from "../graph/data";
import * as S from "./styles";

const COLOR_1 = rawData.find((row) => row.candidatE === candidatE1).bgcolor;
const COLOR_2 = rawData.find((row) => row.candidatE === candidatE2).bgcolor;

export default function VoteSplitRange({ candidatE, onChange, value }) {
  const MIN = 0;
  const MAX = 100;
  const STEP = 1;

  return (
    <S.VoteSplitter>
      {candidatE}
      <Range
        values={[value["1"], MAX - value["2"]]}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) =>
          onChange({ "1": Number(values[0]), "2": MAX - Number(values[1]) })
        }
        renderTrack={({ props, children }) => (
          <S.RangeTrack
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style
            }}
          >
            {value["1"]}%
            <S.InnerRangeTrack
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: [value["1"], MAX - value["2"]],
                  colors: [COLOR_1, "#ccc", COLOR_2],
                  min: MIN,
                  max: MAX
                }),
                alignSelf: "center"
              }}
            >
              {children}
            </S.InnerRangeTrack>
            {value["2"]}%
          </S.RangeTrack>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "5px",
              width: "5px",
              borderRadius: "4px",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA"
            }}
          >
            <div
              style={{
                height: "16px",
                width: "5px",
                backgroundColor: isDragged ? "#548BF4" : "#333"
              }}
            />
          </div>
        )}
      />
    </S.VoteSplitter>
  );
}
