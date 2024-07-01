import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales 2019 (M)",
        data: [150, 200, 100, 200, 250, 1000, 500, 600, 600, 800, 1200, 500],
        borderColor: ["rgba(54, 162, 235, 0.2)"],
        backgroundColor: ["#A7D9FD"],
        pointBackgroundColor: "rgba(54, 162, 235, 0.2)",
        pointBorderColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const options = {
    backgroundColor: "rgba(0, 255, 0, 0.8)",
    title: {
      display: true,
      text: "Earning From Appointments",
      fontSize: 27,
      color: "#ccc",
      position: "top",
      fontColor: "#000",
    },
    legend: {
      display: false,
    },

    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 1200,
            stepSize: 300,
          },
          gridLines: {
            display: false, // Hide horizontal grid lines
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false, // Hide horizontal grid lines
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} height={300} width={400} />;
};

export default LineChart;
