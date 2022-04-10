export const labelsOptionsDesktop = undefined;
export const labelsOptionsMobile = {
  font: { size: "11" },
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
        index: idx
      };
    });
  }
};

export const barChartOptions = {
  animation: { duration: 2000 },
  indexAxis: "y",
  plugins: {
    title: {
      display: false,
      text: "Election results"
    },
    subtitle: {
      display: true,
      text: "⚠️ Résultats incomplets à 21h"
    },
    legend: {
      display: true,
      labels:
        window.innerWidth < 700 ? labelsOptionsMobile : labelsOptionsDesktop
    }
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
      max: 55000000,
      title: { display: true, text: "Voix" }
    },
    y: {
      stacked: true
    }
  }
};
