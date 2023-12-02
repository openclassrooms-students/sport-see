import {
  Legend,
  Line,
  LineChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "../ui/Card";
import { useContext } from "react";
import { UserIdContext } from "../../pages/Dashboard";
import useFetchData from "../../hooks/useFetchData";
import { getUserAverageSessions } from "../../service/api/user";

const CustomLegend = () => {
  return (
    <p className="ml-9 w-[147px] opacity-50 font-medium text-white text-base tracking-[0] leading-[24px]">
      Durée moyenne des sessions
    </p>
  );
};

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: string }[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="w-10 h-6 bg-white flex items-center justify-center">
        <p className="text-[8px] text-black font-medium text-center whitespace-nowrap">{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

const CustomCursor = ({
  points,
  width,
}: {
  points?: { x: number }[];
  width?: number;
}) => {
  const { x } = points?.[0] || {};
  return (
    <Rectangle fill="hsla(0, 0%, 0%, 9.75%)" x={x} width={width} height={300} />
  );
};

const daySemaine = (day: number) => {
  switch (day) {
    case 1:
      return "L";
    case 2:
      return "M";
    case 3:
      return "M";
    case 4:
      return "J";
    case 5:
      return "V";
    case 6:
      return "S";
    case 7:
      return "D";

    default:
      throw new Error("Erreur numéro de jour invalide");
  }
};

export const AverageSessionChart = () => {
  const userId = useContext(UserIdContext);
  const {
    data: averageSession,
    isLoading,
    error,
  } = useFetchData(getUserAverageSessions, userId);

  if (isLoading) return <div>Loading... Average Session </div>;
  if (error || !averageSession) return <div>Failed to fetch data!</div>;

  return (
    <Card className="!bg-primary !relative">
      <ResponsiveContainer>
        <LineChart
          data={averageSession.sessions}
          margin={{
            left: 0,
            top: 20,
            right: 0,
            bottom: 40,
          }}
        >
          <XAxis
            dataKey="day"
            tickFormatter={daySemaine}
            tickLine={false}
            fillOpacity={0.5}
            style={{ transform: "scale(0.9)", transformOrigin: "bottom" }}
            tick={{ fill: "#FFFFFF", fontWeight: 500, fontSize: 12 }}
            tickMargin={25}
            axisLine={false}
            interval="preserveStartEnd"
          />

          <YAxis
            type="number"
            domain={["dataMin", "dataMax + 30"]}
            hide={true}
          />
          <Legend verticalAlign="top" content={<CustomLegend />} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={<CustomCursor />}
            wrapperStyle={{ outline: "none" }}
          />
          <Line
            dataKey="sessionLength"
            type="natural"
            stroke="url(#white-gradient)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              fill: "#FFFFFF",
              r: 4,
              strokeWidth: 8,
              strokeOpacity: 0.4,
            }}
          />

          <defs>
            <linearGradient id="white-gradient" x1="0%" y1="0" x2="100%" y2="0">
              <stop offset="30%" stopColor="rgba(255, 255, 255, 0.4)" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
