import { Space, Table, Tag, Button } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const RepoBarChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Popular Repos",
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value, index, ticks) {
            return value / 1000 + "k";
          },
        },
        title: {
          display: true,
          text: "Stars",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const labels = data.map((element) => element.companyName);

  const dataRefined = {
    labels,
    datasets: [
      {
        label: "Company",
        data: data.map((element) => element.stars),
        backgroundColor: "rgb(24, 144, 255,0.7)",
      },
    ],
  };
  return (
    <div className="w-full">
      <Bar options={options} data={dataRefined} />
    </div>
  );
};

export default RepoBarChart;
