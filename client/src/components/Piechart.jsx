import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartContainer = styled.div`
  width: 40%; /* Adjust the width as needed */
  margin: 0 auto; /* Center the PieChart */
  padding: 20px;
`;

const PieChart = ({ data }) => {
  const chartData = {
    labels: ["Workshop", "Seminar", "Bootcamp"],
    datasets: [
      {
        data: [data.workshopCount, data.seminarCount, data.bootcampCount],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
        ],
      },
    ],
  };

  return (
    <PieChartContainer>
      <Pie data={chartData} />
    </PieChartContainer>
  );
};

export default PieChart;
