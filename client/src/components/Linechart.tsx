import { useUserContext } from "../context/UserContext";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface lesson {
  date: string;
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
}

interface Props {
  data: lesson[];
}

const Linechart = ({ data }: Props) => {
  if (!data) {
    return <div></div>;
  }

  const user = useUserContext();

  const chartData = {
    labels: data.map((lesson) => lesson.date),
    datasets: [
      {
        label: "Listening",
        data: data.map((lesson) => lesson.listening),
        backgroundColor: "transparent",
        borderColor: "green",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
      },
      {
        label: "Reading",
        data: data.map((lesson) => lesson.reading),
        backgroundColor: "transparent",
        borderColor: "teal",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
      },
      {
        label: "Writing",
        data: data.map((lesson) => lesson.writing),
        backgroundColor: "transparent",
        borderColor: "blue",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
      },
      {
        label: "Speaking",
        data: data.map((lesson) => lesson.speaking),
        backgroundColor: "transparent",
        borderColor: "brown",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
      },
    ],
  };

  return (
    <div style={{ width: "500px", height: "300px" }}>
      <Line data={chartData}></Line>
    </div>
  );
};

export default Linechart;
