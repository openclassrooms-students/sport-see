import { PieChart, Pie, Label, Cell } from "recharts";
import { Card } from "../ui/Card";

const CustomLabel = ({
  viewBox,
  noOfBubbleTeaSold = 0,
}: {
  viewBox: { cx: number; cy: number };
  noOfBubbleTeaSold: number;
}) => {
  const { cx, cy } = viewBox;
  return (
    <>
      <text x={cx - 15} y={cy - 5}>
        <tspan className="fill-zinc-800 text-2xl font-bold leading-relaxed">
          {noOfBubbleTeaSold} %
        </tspan>
      </text>
      <text x={cx - 50} y={cy + 15}>
        <tspan className="fill-gray-500 text-base font-medium">
          de votre objectif
        </tspan>
      </text>
    </>
  );
};

export const Score = ({ score }: { score: number }) => {
  const data = [
    { name: "score", value: score * 100 },
    { name: "score outline", value: 100 - score * 100 },
  ];
  return (
    <Card>
      <PieChart width={250} height={250} className="bg-white">
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          dataKey="value"
          innerRadius={80}
          outerRadius={100}
          className="outline-none"
          cornerRadius={10}
        >
          {data.map((_, index) => {
            if (index === 1) {
              return <Cell key={`cell-${index}`} fill="#FBFBFB" />;
            }
            return (
              <Cell
                key={`cell-${index}`}
                className="fill-primary rounded-full"
              />
            );
          })}
          <Label
            content={
              <CustomLabel
                noOfBubbleTeaSold={data[0].value}
                viewBox={{
                  cx: 125,
                  cy: 125,
                }}
              />
            }
            position="center"
          />
        </Pie>
      </PieChart>
    </Card>
  );
};
