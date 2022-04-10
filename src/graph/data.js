export const rawData = [
  {
    candidatE: "Non-Votant·es (autres, est.)",
    shortName: "NI",
    bgcolor: "#999999",
    group: "Non-Votant·es",
    tour1: 12411817,
    tour2: 15
  },
  {
    candidatE: "Non-Votant·es (Inscrit·es)",
    shortName: "NV",
    bgcolor: "#cccccc",
    group: "Non-Votant·es",
    tour1: 11100433,
    tour2: 30
  },
  {
    candidatE: "Nathalie Arthaud",
    shortName: "NA",
    bgcolor: "orangered",
    group: "Gauche",
    tour1: 179946,
    tour2: 0
  },
  {
    candidatE: "Philippe Poutou",
    shortName: "PP",
    bgcolor: "tomato",
    group: "Gauche",
    tour1: 238993,
    tour2: 0
  },
  {
    candidatE: "Fabien Roussel",
    shortName: "FR",
    bgcolor: "mediumorchid",
    group: "Gauche",
    tour1: 717547,
    tour2: 0
  },
  {
    candidatE: "Jean-Luc Mélenchon",
    shortName: "JLM",
    bgcolor: "#cc2443",
    group: "Gauche",
    tour1: 6181132,
    tour2: 0
  },
  {
    candidatE: "Anne Hidalgo",
    shortName: "AH",
    bgcolor: "#FF8080",
    group: "Gauche",
    tour1: 530596,
    tour2: 0
  },
  {
    candidatE: "Yannick Jadot",
    shortName: "YJ",
    bgcolor: "#00c000",
    group: "Gauche",
    tour1: 1333975,
    tour2: 0
  },
  {
    candidatE: "Emmanuel Macron",
    shortName: "EM",
    bgcolor: "#ffeb00",
    group: "Gouvernement",
    tour1: 8315488,
    tour2: 55
  },
  {
    candidatE: "Valérie Pécresse",
    shortName: "VP",
    bgcolor: "#0066CC",
    group: "Droite",
    tour1: 1442387,
    tour2: 0
  },
  {
    candidatE: "Jean Lassalle",
    shortName: "JL",
    bgcolor: "#26c4ec",
    group: "Droite",
    tour1: 1028329,
    tour2: 0
  },
  {
    candidatE: "Nicolas Dupont-Aignan",
    shortName: "NDA",
    bgcolor: "#0082C4",
    group: "Droite",
    tour1: 662961,
    tour2: 0
  },
  {
    candidatE: "Marine Le Pen",
    shortName: "MLP",
    bgcolor: "#0D378A",
    group: "Droite",
    tour1: 7601937,
    tour2: 45
  },
  {
    candidatE: "Éric Zemmour",
    shortName: "EZ",
    bgcolor: "midnightblue",
    group: "Droite",
    tour1: 2109757,
    tour2: 0
  }
];

function randomOpacity() {
  const allowedHex = "3456789abcdef";
  const d1 = allowedHex[Math.floor(Math.random() * allowedHex.length)];
  const d2 = allowedHex[Math.floor(Math.random() * allowedHex.length)];

  return d1 + d2;
}

function distributeDataInto(buckets) {
  // buckets is an object containing
  // { labelName: function checking if row is in the bucket }

  const labels = Object.keys(buckets);

  return {
    labels,
    datasets: rawData.map((row) => {
      const groupIndex = Object.values(buckets).findIndex((buck) => buck(row));

      console.assert(groupIndex >= 0);

      return {
        label: row.candidatE,
        data: labels.map((_, idx) => (idx === groupIndex ? row.tour1 : 0)),
        backgroundColor: row.bgcolor
      };
    })
  };
}

export const dataEmpty = {
  labels: [],
  datasets: []
};

export const dataAllVoters = distributeDataInto({
  "Corps Électoral": (row) => true
});

export const dataNonVoting = distributeDataInto({
  "Non-Votant·es": (row) => row.group === "Non-Votant·es",
  "Votant·es": (row) => row.group !== "Non-Votant·es"
});

export const dataGovernmentSupport = distributeDataInto({
  "Non-Votant·es": (row) => row.group === "Non-Votant·es",
  Opposition: (row) => row.group === "Gauche" || row.group === "Droite",
  EM: (row) => row.group === "Gouvernement"
});

export const dataGocheDroate = distributeDataInto({
  "Non-Votant·es": (row) => row.group === "Non-Votant·es",
  Gauche: (row) => row.group === "Gauche",
  EM: (row) => row.group === "Gouvernement",
  Droite: (row) => row.group === "Droite"
});

// some hardcoded logic here
export const candidatE1 = "Emmanuel Macron";
export const candidatE2 = "Marine Le Pen";

const winnersTour1 = [candidatE1, candidatE2];

export const dataTour1Winners = {
  labels: dataGocheDroate.labels,
  datasets: dataGocheDroate.datasets.map((ds) => ({
    label: ds.label,
    data: ds.data,
    backgroundColor: winnersTour1.includes(ds.label)
      ? ds.backgroundColor
      : "#cccccc" + randomOpacity()
  }))
};

export const dataHappyVoters = distributeDataInto({
  "Non-Inscrit·es": (row) => row.candidatE === "Non-Votant·es (autres, est.)",
  "Au 2è tour": (row) => winnersTour1.includes(row.candidatE),
  "Pas au 2è tour": (row) =>
    !winnersTour1.includes(row.candidatE) &&
    row.candidatE !== "Non-Votant·es (autres, est.)"
});

export const soutienCandidatE1 = [
  "Emmanuel Macron",
  "Yannick Jadot",
  "Valérie Pécresse",
  "Anne Hidalgo",
  "Fabien Roussel"
];

export const soutienCandidatE2 = [
  "Marine Le Pen",
  "Éric Zemmour",
  "Nicolas Dupont-Aignan"
];

export const dataGuessTour2 = distributeDataInto({
  "Non-Inscrit·es": (row) => row.candidatE === "Non-Votant·es (autres, est.)",
  "Camp EM": (row) => soutienCandidatE1.includes(row.candidatE),
  "Camp MLP": (row) => soutienCandidatE2.includes(row.candidatE),
  "Sans consignes": (row) =>
    row.candidatE !== "Non-Votant·es (autres, est.)" &&
    !soutienCandidatE1.includes(row.candidatE) &&
    !soutienCandidatE2.includes(row.candidatE)
});
