import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card } from "../ui/Card";

export function ScoreChart({ score }: { score: number }) {
  return (
    <Card className="relative bg-primary">
      <p className="absolute top-6 left-8 text-[#20253A] text-base font-bold">
        Score
      </p>

      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={[{ name: "Score", value: score * 100 }]}
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={90 + score * 100 * (360 / 100)}
            innerRadius={"60%"}
            outerRadius={"70%"}
            dataKey="value"
            cornerRadius={10}
            className="outline-none"
          >
            <Cell className="fill-primary" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="bg-white w-[150px] h-[150px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col justify-center items-center">
        <p className="text-base font-semibold text-[#74798C] flex flex-col justify-center">
          <span className="text-2xl font-bold text-[#282D30]">
            {score * 100}%
          </span>
          <span> de votre</span>
          <span> objectif</span>
        </p>
      </div>
    </Card>
  );
}