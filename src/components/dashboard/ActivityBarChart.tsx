import { useContext } from "react";
import useFetchData from "../../hooks/useFetchData";
import { getUserActivity } from "../../service/api/user";
import { UserIdContext } from "../../pages/Dashboard";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "../ui/Card";

const calculateMinMax = (
  activities: any,
  key: string,
  step: number
): [number, number] => {
  if (!activities) return [0, 0];

  const sortedActivities = activities.sort(
    (a: { [x: string]: number }, b: { [x: string]: number }) =>
      a[key] > b[key] ? 1 : -1
  );

  const min = sortedActivities?.[0][key];
  const max = sortedActivities?.[activities.length - 1][key];

  const valueMin =
    min % step === 0 ? min - step : Math.floor(min / step) * step;

  const valueMax =
    max % step === 0 ? max + step : Math.floor(max / step) * step + step;

  return [valueMin, valueMax];
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="w-10 h-16 bg-primary text-[7px] text-white flex flex-col items-center justify-center">
        <p className="flex-grow p-2">{`${payload[0].value}Kg`}</p>
        <p className="flex-grow p-2">{`${payload[1].value}Kcal`}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: { payload?: { value: string }[] }) => {
  return (
    <div className="flex justify-between mx-4 mb-12">
      <p className="text-base font-medium">Activité quotidienne</p>
      <ul className="flex gap-8 list-none">
        {payload?.map((entry, index) => {
          const isPoids = entry.value === "kg";

          return (
            <li
              key={index}
              className="text-gray-500 text-sm font-medium flex items-center"
            >
              <span
                className={`w-2 h-2 rounded-full mr-1.5 ${
                  isPoids ? "bg-primary" : "bg-tertiary"
                }`}
              ></span>
              {isPoids ? "Poids (kg)" : "Calories brûlées (kcal)"}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const ActivityBarChart = () => {
  const userId = useContext(UserIdContext);
  const {
    data: activity,
    isLoading,
    error,
  } = useFetchData(getUserActivity, userId);

  if (isLoading) return <div>Loading...</div>;
  if (error || !activity) return <div>Failed to fetch data!</div>;

  const activities = activity.sessions.map(({ day, kilogram, calories }) => ({
    day,
    kg: kilogram,
    kcal: calories,
  }));

  const sortedActivities = activities?.sort((a, b) => (a.kg > b.kg ? 1 : -1));

  let caloriesDomain = calculateMinMax(sortedActivities, "kcal", 100);
  let weightDomain = calculateMinMax(activities, "kg", 10);

  const data = activities?.reverse()?.map((session, index) => ({
    ...session,
    index: index + 1,
  }));

  return (
    <Card className="mb-4 h-80 !w-full p-4 xl:h-80">
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          barSize={8}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3" vertical={false} />
          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{ outline: "none" }}
          />

          <XAxis
            dataKey="index"
            stroke="#9B9EAC"
            axisLine={{ stroke: "#c8c8c8" }}
            tickLine={false}
            tickMargin={10}
            scale="auto"
            padding={{ left: 16, right: 12 }}
          />
          <YAxis
            yAxisId="kg"
            orientation="right"
            tickMargin={16}
            stroke="#9B9EAC"
            tickLine={false}
            axisLine={false}
            domain={weightDomain}
            tickCount={3}
          />
          <YAxis
            yAxisId="kcal"
            orientation="left"
            domain={caloriesDomain}
            tickCount={3}
            hide
          />

          <Legend verticalAlign="top" content={<CustomLegend />} />
          <Bar
            yAxisId="kg"
            dataKey="kg"
            className="fill-tertiary"
            radius={[12, 12, 0, 0]}
          />
          <Bar
            yAxisId="kcal"
            dataKey="kcal"
            className="fill-primary"
            radius={[12, 12, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
