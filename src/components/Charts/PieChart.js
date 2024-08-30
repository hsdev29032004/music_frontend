// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Đăng ký các thành phần cần thiết của ChartJS
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ data }) => {
  const defaultData = {
    premium: 0,
    basic: 0,
    total: 0
  };

  const safeData = data || defaultData

  const chartData = {
    labels: Object.keys(safeData).filter(key => key !== 'total'),
    datasets: [
      {
        label: 'Số lượng',
        data: Object.values(safeData).filter((_, index) => index !== 2),
        backgroundColor: [
          'yellow',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
        ],
        borderColor: [
          'yellow',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  }

  return (
    <div style={{ height: '200px', display: "flex", justifyContent: "center" }}>
      <Pie data={chartData} options={options} />
    </div>
  )
}

export default PieChart
