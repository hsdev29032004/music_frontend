import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, LineElement, PointElement, CategoryScale, LinearScale);

export default function LineChart() {
  const data = [
    { "Năm": 1991, "Doanh thu ($)": 300 },
    { "Năm": 1992, "Doanh thu ($)": 450 },
    { "Năm": 1993, "Doanh thu ($)": 60 },
    { "Năm": 1994, "Doanh thu ($)": 90 },
    { "Năm": 1995, "Doanh thu ($)": 390 },
    { "Năm": 1996, "Doanh thu ($)": 210 },
    { "Năm": 1997, "Doanh thu ($)": 690 },
    { "Năm": 1998, "Doanh thu ($)": 960 },
    { "Năm": 1999, "Doanh thu ($)": 990 },
    { "Năm": 2000, "Doanh thu ($)": 1500 },
    { "Năm": 2001, "Doanh thu ($)": 1500 },
    { "Năm": 2002, "Doanh thu ($)": 1200 },
  ];

  const chartData = {
    labels: data.map(item => item["Năm"]),
    datasets: [
      {
        label: 'Doanh thu ($)',
        data: data.map(item => ({
          x: item["Năm"], // Xử lý trục x
          y: item["Doanh thu ($)"] // Xử lý trục y
        })), // Chọn doanh thu làm dữ liệu
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false, // Không tô màu dưới đường biểu đồ
        tension: 0.1, // Độ cong của đường biểu đồ
        pointRadius: 5, // Kích thước điểm
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Màu nền của điểm
        pointBorderColor: 'rgba(255, 255, 255, 1)', // Màu viền của điểm
      },
    ],
  };

  // Cấu hình biểu đồ
  const options = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            // Lấy dữ liệu từ chartData
            const item = chartData.datasets[0].data[tooltipItem.dataIndex];
            return [
              `Năm: ${item.x}`,
              `Doanh thu: ${item.y}$`
            ];
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false, 
    scales: {
      x: {
        title: {
          display: true,
          text: 'Năm', // Tên trục x
          color: 'rgba(255, 255, 255, 0.3)', // Màu của tên trục
          font: {
            size: 16 // Kích thước chữ của tên trục
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.3)', // Màu số liệu trục x
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Màu lưới trục x (có thể tùy chỉnh)
        },
      },
      y: {
        title: {
          display: true,
          text: 'Doanh thu ($)', // Tên trục y
          color: 'rgba(255, 255, 255, 0.3)', // Màu của tên trục
          font: {
            size: 16 // Kích thước chữ của tên trục
          }
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.3)', // Màu số liệu trục y
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Màu lưới trục y (có thể tùy chỉnh)
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
