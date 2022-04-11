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
      subtitle: {
        display: true,
        text: "⚠️ Résultats incomplets (97% voix)",
      },
      legend: {
        display: true,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        max: 55000000,
        title: { display: true, text: "Voix" },
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
