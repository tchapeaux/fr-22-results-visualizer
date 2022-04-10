import React, { useRef, useState } from "react";

import slides from "./slides";
import Graph from "./graph";
import Simulator from "./simulator";

import * as S from "./App.styles";
import * as _R from "./reset.styles";

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const SlideZoneRef = useRef(null);

  function onSlideVisibilityChange(slideIdx, isVisible) {
    if (isVisible) {
      setCurrentSlide(slideIdx);
    }
  }

  const SHOW_SIMULATOR = window.location.href.includes("simulator");

  return (
    <S.StyledApp>
      {SHOW_SIMULATOR ? (
        <Simulator />
      ) : (
        <>
          <S.SlideZone ref={SlideZoneRef}>
            {slides.map((s, idx) =>
              React.cloneElement(s, {
                containerRef: SlideZoneRef,
                key: idx,
                onVisibilityChange: onSlideVisibilityChange.bind(null, idx)
              })
            )}
          </S.SlideZone>
          <S.GraphZone>
            <Graph slide={currentSlide} />
          </S.GraphZone>
        </>
      )}
    </S.StyledApp>
  );
}
