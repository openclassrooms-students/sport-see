import { useContext } from "react";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

import { Card } from "../ui/Card";
import { getUserPerformance } from "../../service/api/user";
import { UserIdContext } from "../../pages/Dashboard";
import useFetchData from "../../hooks/useFetchData";

export const PerformanceChart = () => {
  const userId = useContext(UserIdContext);
  const {
    data: performance,
    isLoading,
    error,
  } = useFetchData(getUserPerformance, userId);

  if (isLoading) return <div>Loading...</div>;
  if (error || !performance) return <div>Failed to fetch data!</div>;

  const kind: { [key: number]: string } = {
    1: "Cardio",
    2: "Énergie",
    3: "Endurance",
    4: "Force",
    5: "Vitesse",
    6: "Intensité",
  };

  const data = performance.data
    .map((item: any) => {
      return {
        kind: kind[item.kind],
        value: item.value,
      };
    })
    .reverse();

  return (
    <Card className="bg-tertiary p-2">
      <ResponsiveContainer>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="65%">
          <PolarGrid radialLines={false} />

          <PolarAngleAxis
            dataKey="kind"
            stroke="white"
            dy={4}
            tick={{
              fontSize: 12,
            }}
            tickLine={false}
            axisLine={false}
          />
          <Radar
            dataKey="value"
            className="fill-primary stroke-transparent opacity-70"
          />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  );
};
