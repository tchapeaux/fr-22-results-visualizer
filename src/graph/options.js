import { totalElectoralBody } from "./data";

function percentRound2(value) {
  return Math.round(value * 10000) / 10000;
}

function makeMobile(options) {
  options.plugins.legend.labels = {
    font: { size: "10" },
    boxWidth: 5,
    generateLabels: (chart) => {
      return chart.data.datasets.map((ds, idx) => {
        const meta = chart.getDatasetMeta(idx);
        const style = meta.controller.getStyle(idx);

        return {
          text: ds.label.replace(/([^A-ZÉÈ]+)/g, ""),
          fillStyle: style.backgroundColor,
          strokeStyle: style.borderColor,
          lineWidth: style.borderWidth,
          hidden: !chart.getDataVisibility(idx),
          index: idx,
        };
      });
    },
  };

  options.scales.y.ticks = { font: { size: "10" } };
}

export function getOptions() {
  const options = {
    animation: { duration: 1500 },
    indexAxis: "y",
    plugins: {
      title: {
        display: false,
        text: "Résultats du 1er tour",
      },
      legend: {
        display: true,
        labels: {
          boxWidth: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = Array.isArray(context.dataset.data)
              ? context.dataset.data.find((d) => d > 0)
              : context.dataset.data || "";

            const roundedValue =
              100 * percentRound2(value / totalElectoralBody);

            return `${context.dataset.label}: ${(
              value * 1000000
            ).toLocaleString()} (${String(roundedValue).substring(0, 5)}%)`;
          },
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        max: 55,
        title: { display: true, text: "Voix (millions)" },
      },
      y: {
        stacked: true,
      },
    },
  };

  if (window.innerWidth < 700) {
    makeMobile(options);
  }

  return options;
}
