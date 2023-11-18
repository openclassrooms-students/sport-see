import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { Performance } from "../../schema/User";
import { Card } from "../ui/Card";

type Props = {
  performance: Performance | null;
};

export const PerformanceChart = ({ performance }: Props) => {
  const kind: { [key: number]: string } = {
    1: "Cardio",
    2: "Énergie",
    3: "Endurance",
    4: "Force",
    5: "Vitesse",
    6: "Intensité",
  };

  const data = performance?.data
    .map((item: any) => {
      return {
        kind: kind[item.kind],
        value: item.value,
      };
    })
    .reverse();

  return (
    <Card className="bg-tertiary">
      <ResponsiveContainer>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="65%">
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="kind"
            stroke="white"
            dy={4}
            tickLine={false}
            tick={{
              fontSize: 12,
            }}
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
