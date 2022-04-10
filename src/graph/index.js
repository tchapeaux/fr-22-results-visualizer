import { useEffect, useLayoutEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

import * as S from "./styles";
import { deepCopy } from "../utils";
import {
  dataAllVoters,
  dataGocheDroate,
  dataNonVoting,
  dataGovernmentSupport,
  dataTour1Winners,
  dataHappyVoters,
  dataGuessTour2,
  dataEmpty
} from "./data";
import {
  barChartOptions,
  labelsOptionsDesktop,
  labelsOptionsMobile
} from "./options";

Chart.register(...registerables);

// Chart JS uses internal reference
// to know how to visually animate transitions
// This mean that we must be careful when updating
// the data to avoid refreshing constant data
// This helper functions take new referenceData
// and molds canonicalData into the new shape
function inPlaceReplace(canonicalData, referenceData) {
  canonicalData.labels = referenceData.labels;

  if (canonicalData.datasets.length === 0) {
    canonicalData.datasets = deepCopy(referenceData.datasets);
  } else if (referenceData.datasets.length === 0) {
    canonicalData.datasets = [];
  } else {
    canonicalData.datasets.forEach((ds) => {
      const refDs = referenceData.datasets?.find(
        (rDs) => rDs.label === ds.label
      );
      ds.backgroundColor = refDs?.backgroundColor || "blue";
      ds.data = refDs?.data || [];
    });
  }
}

export default function Graph({ slide }) {
  const myChart = useRef(null);

  // Initialize graph (called once)
  useEffect(() => {
    const ctx = document.getElementById("graph");

    const config = {
      type: "bar",
      data: deepCopy(dataEmpty),
      options: barChartOptions
    };

    myChart.current = new Chart(ctx, config);
  }, []);

  // Update graph when slide changes
  useEffect(() => {
    const c = myChart.current;

    if (slide === 0) {
      inPlaceReplace(c.data, dataEmpty);
    } else if (slide === 1 || slide === 8) {
      inPlaceReplace(c.data, dataAllVoters);
    } else if (slide === 2) {
      inPlaceReplace(c.data, dataNonVoting);
    } else if (slide === 3) {
      inPlaceReplace(c.data, dataGovernmentSupport);
    } else if (slide === 4) {
      inPlaceReplace(c.data, dataGocheDroate);
    } else if (slide === 5) {
      inPlaceReplace(c.data, dataTour1Winners);
    } else if (slide === 6) {
      inPlaceReplace(c.data, dataHappyVoters);
    } else if (slide === 7) {
      inPlaceReplace(c.data, dataGuessTour2);
    }

    console.log(myChart.current.data);

    myChart.current.update();
  }, [slide]);

  useLayoutEffect(() => {
    if (myChart.current) {
      myChart.current.config.options.plugins.legend.labels =
        window.innerWidth < 1000 ? labelsOptionsMobile : labelsOptionsDesktop;
      myChart.current.update();
    }
  });

  return <S.GraphCanvas key="graph" id="graph"></S.GraphCanvas>;
}
