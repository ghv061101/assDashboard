import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import "./chartBox.scss";

interface ChartBoxProps {
  icon: string;
  title: string;
  value: string;
  percentage: string;
  duration: string;
  link: string;
  chartData?: number[];
}

const ChartBox: React.FC<ChartBoxProps> = ({
  icon,
  title,
  value,
  percentage,
  duration,
  link,
  chartData = [10, 20, 15, 30, 25, 40, 35],
}) => {
  const options = {
    chart: {
      id: "sparkline",
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth" as "smooth",
      width: 3,
    },
    colors: ["#007bff"],
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
      marker: {
        show: false,
      },
    },
  };

  const series = [
    {
      name: title,
      data: chartData,
    },
  ];

  return (
    <div className="chartBoxCard">
      <div className="header">
        <img src={icon} alt={title} />
        <div className="titleValue">
          <h3>{title}</h3>
          <h1>{value}</h1>
        </div>
      </div>

      <div className="chartContainer">
        <Chart options={options} series={series} type="line" height={100} />
      </div>

      <div className="footer">
        <span className="percentage">{percentage}</span>
        <span className="duration">{duration}</span>
        <Link to={link} className="viewAllLink">
          View all
        </Link>
      </div>
    </div>
  );
};

export default ChartBox;
