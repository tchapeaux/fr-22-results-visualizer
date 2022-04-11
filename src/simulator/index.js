import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import LZString from "lz-string";

import VoteSplitRange from "./VoteSplitRange";

import {
  dataAllVoters,
  candidatE1,
  candidatE2,
  soutienCandidatE1,
  soutienCandidatE2,
} from "../graph/data";
import { barChartOptions } from "../graph/options";
import { deepCopy } from "../utils";

import * as S from "./styles";

Chart.register(...registerables);

const referenceData = deepCopy(dataAllVoters);
referenceData.datasets.find(
  (ds) => ds.label === "Non-Votant·es (Inscrit·es)" || ds.label === "NV"
).label = "Non-votant·es 1er tour";
referenceData.datasets.find(
  (ds) => ds.label === "Non-Votant·es (autres, est.)" || ds.label === "NI"
).label = "Non-Inscrit·es";

const labelsForTour2 = [
  "Non-Inscrit·es",
  "Non-Votant·es 2è tour",
  candidatE1,
  candidatE2,
];

function getDataFromPercentage(originalData, percent1, percent2) {
  const originalScore = originalData.find((d) => d > 0);

  const cand1Score = (originalScore * percent1) / 100;
  const cand2Score = (originalScore * percent2) / 100;
  const absScore = originalScore - cand1Score - cand2Score;
  return [0, absScore, cand1Score, cand2Score];
}

function getCandDataset(cand) {
  return referenceData.datasets.find((ds) => ds.label === cand);
}

function getCandScore(cand) {
  return getCandDataset(cand).data.find((d) => d > 0);
}

function sortCandByScore(cand1, cand2) {
  const score1 = getCandScore(cand1);
  const score2 = getCandScore(cand2);
  return score2 - score1;
}

const candidatEs = referenceData.datasets
  .map(({ label }) => label)
  .filter((c) => !c.includes("Inscrit"))
  .sort(sortCandByScore);

function getInitialValue(cand) {
  if (cand === candidatE1) {
    return { 1: 95, 2: 2 };
  }
  if (cand === candidatE2) {
    return { 1: 2, 2: 95 };
  }
  if (soutienCandidatE1.includes(cand)) {
    return { 1: 70, 2: 20 };
  }
  if (soutienCandidatE2.includes(cand)) {
    return { 1: 20, 2: 70 };
  }
  if (cand === "Non-votant·es 1er tour") {
    return { 1: 10, 2: 10 };
  }
  return { 1: 30, 2: 30 };
}

// Check if an intitial value was provided
const params = new URLSearchParams(window.location.search);
const forceData = params.get("data");

// make a static initialValues object to make sure
// that useState always receive the same values
const initialValues = forceData
  ? JSON.parse(LZString.decompressFromEncodedURIComponent(forceData))
  : candidatEs.map((c) => getInitialValue(c));

function getCurrentWinner(data) {
  let currentScoreCand1 = 0;
  let currentScoreCand2 = 0;
  data.datasets.forEach((ds) => {
    currentScoreCand1 += ds.data[2] ?? 0;
    currentScoreCand2 += ds.data[3] ?? 0;
  });

  return currentScoreCand1 > currentScoreCand2 ? candidatE1 : candidatE2;
}

export default function Simulator() {
  const myChart = useRef(null);

  const voteSplitValues = {};
  const setVoteSplitValues = {};
  candidatEs.forEach((candidatE, cIdx) => {
    const [val, setVal] = useState(initialValues[cIdx]);

    voteSplitValues[candidatE] = val;
    setVoteSplitValues[candidatE] = setVal;
  });

  const [showAllRanges, setShowAllRanges] = useState(false);
  const [hasCopiedShare, setHasCopiedShare] = useState(false);

  // Initialize graph (called once)
  useEffect(() => {
    const ctx = document.getElementById("simulator-graph");

    const initData = deepCopy(referenceData);

    const config = {
      type: "bar",
      data: {
        labels: labelsForTour2,
        datasets: [
          initData.datasets[0], // non-inscrits
          ...initData.datasets
            .filter((ds) => candidatEs.includes(ds.label))
            .map((ds) => ({
              ...ds,
              data: getDataFromPercentage(
                ds.data,
                voteSplitValues[ds.label]["1"],
                voteSplitValues[ds.label]["2"]
              ),
            })),
        ],
      },
      options: {
        ...barChartOptions,
        plugins: {
          title: {
            display: true,
            text: "Simulation du 2è tour -- ⚠️ Résultats provisoires (97% voix)",
          },
          subtitle: {
            display: true,
            color: "#9b870c",
            text: "Victoire de Emmanuel Macron",
          },
        },
      },
    };

    myChart.current = new Chart(ctx, config);
  }, []);

  function onChange(candidatE, newPercentages) {
    const chart = myChart.current;
    setVoteSplitValues[candidatE](newPercentages);

    const ds = chart.data.datasets.find((_ds) => _ds.label === candidatE);

    const originalDs = referenceData.datasets.find(
      (_ds) => _ds.label === candidatE
    );

    ds.data = getDataFromPercentage(
      originalDs.data,
      newPercentages["1"],
      newPercentages["2"]
    );

    const currentWinner = getCurrentWinner(chart.data);
    chart.options.plugins.subtitle.text = "Victoire de " + currentWinner;
    chart.options.plugins.subtitle.color =
      currentWinner === candidatE1 ? "#9b870c" : "darkblue";

    chart.update();
  }

  function resetValues() {
    candidatEs.forEach((c) => onChange(c, getInitialValue(c)));
  }

  function share() {
    if (!hasCopiedShare) {
      const shareUrl =
        window.origin +
        "/simulator?data=" +
        LZString.compressToEncodedURIComponent(
          JSON.stringify(candidatEs.map((c) => voteSplitValues[c]))
        );

      navigator.clipboard.writeText(shareUrl);

      setHasCopiedShare(true);
      setTimeout(() => setHasCopiedShare(false), 3000);
    }
  }

  return (
    <S.Wrapper>
      <S.Controls>
        <p>
          Configurez les report de voix
          <br />
          entre le premier et second tour.
        </p>
        <S.ControlsScrollable>
          {candidatEs
            .filter((_, idx) => (showAllRanges ? true : idx <= 5))
            .map((c) => (
              <VoteSplitRange
                candidatE={c}
                key={c}
                onChange={onChange.bind(null, c)}
                value={voteSplitValues[c]}
              />
            ))}
        </S.ControlsScrollable>
        <S.ControlsButton onClick={() => setShowAllRanges(!showAllRanges)}>
          {showAllRanges ? "Cacher les <5%" : "Afficher tout"}
        </S.ControlsButton>
        <S.ControlsButton onClick={resetValues}>Réinitialiser</S.ControlsButton>
        <S.ControlsButton onClick={share}>
          {hasCopiedShare
            ? "Copié dans le presse-papier"
            : "Partager votre simulation"}
        </S.ControlsButton>
      </S.Controls>
      <canvas key="simulator-graph" id="simulator-graph" />
    </S.Wrapper>
  );
}
