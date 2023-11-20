import { FC, useContext, useEffect, useState } from "react";
import { Performance as PerformanceType } from "../../schema/User";
import { useResource } from "../../hooks/useResource";

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

type PerformanceChartProps = {};

export const PerformanceChart: FC<PerformanceChartProps> = ({}) => {
  const userId = useContext(UserIdContext) || 12;
  const performanceResource = useResource(getUserPerformance, userId);

  const [performance, setPerformance] = useState<PerformanceType | null>(null);

  useEffect(() => {
    performanceResource?.read().then(setPerformance);
  }, [performanceResource]);

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
