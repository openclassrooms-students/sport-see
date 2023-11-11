import { useEffect, useState } from "react";

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
import { AverageSession } from "../../schema/User";
import { getUserAverageSessions } from "../../service/api/user";
import { Card } from "../ui/Card";

const CustomLegend = () => {
  return (
    <p className="ml-9 w-[147px] opacity-50 font-medium text-white text-base tracking-[0] leading-[24px]">
      Durée moyenne des sessions
    </p>
  );
};

const AverageSessionChart = () => {
  const [averageSession, setAverageSession] = useState<AverageSession | null>(
    null
  );

  const getAverageSession = async () => {
    try {
      const res = await getUserAverageSessions(12);

      if (res.success) {
        setAverageSession(res.data);
      } else {
        console.error(res.error);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAverageSession();
  }, []);

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: { value: string }[];
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="line-chart-customTooltip">
          <p>{`${payload[0].value} min`}</p>
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
      <Rectangle
        fill="hsla(0, 0%, 0%, 9.75%)"
        x={x}
        width={width}
        height={300}
      />
    );
  };
  const days = ["L", "M", "M", "J", "V", "S", "D"];

  const data = averageSession?.sessions.map((session, index) => ({
    name: days[index],
    length: session.sessionLength,
  }));

  return (
    <Card className="!bg-primary">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            left: 0,
            top: 20,
            right: 0,
            bottom: 40,
          }}
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tickMargin={20}
            tick={{ fill: "white", opacity: ".5" }}
            interval={"preserveStartEnd"}
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
            dataKey="length"
            type="natural"
            stroke="#FFFFFF"
            strokeWidth={2}
            dot={false}
            activeDot={{
              fill: "#FFFFFF",
              r: 4,
              strokeWidth: 8,
              strokeOpacity: 0.4,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default AverageSessionChart;
