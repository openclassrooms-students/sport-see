import { FC } from "react";
import { User as UserType } from "../../schema/User";

import { Icon } from "../ui/Icon";

type NutritionProps = {
  nutritionData: UserType["keyData"] | null;
};

export const Nutrition: FC<NutritionProps> = ({ nutritionData }) => {
  if (!nutritionData) {
    return null;
  }

  const data = [
    {
      id: 1,
      title: "Calories",
      value: nutritionData.calorieCount + "kCal",
      icon: <Icon.Calorie />,
    },
    {
      id: 2,
      title: "Proteines",
      value: nutritionData.proteinCount + "g",
      icon: <Icon.Protein />,
    },
    {
      id: 3,
      title: "Glucides",
      value: nutritionData.carbohydrateCount + "g",
      icon: <Icon.Carbohydrate />,
    },
    {
      id: 4,
      title: "Lipides",
      value: nutritionData.lipidCount + "g",
      icon: <Icon.Lipid />,
    },
  ];

  return (
    <div className="w-full lg:w-1/4 flex flex-wrap gap-10 flex-row justify-between lg:flex-col">
      {data.map(({ id, title, value, icon }) => (
        <div
          key={id}
          className="bg-secondary w-64 h-32 rounded flex items-center flex-grow lg:flex-grow-0"
        >
          <div className="w-16 h-16 m-8 mr-6">{icon}</div>
          <div className="flex flex-col">
            <div className="text-zinc-800 text-xl font-bold">{value}</div>
            <div className="text-gray-500 text-sm font-medium">{title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
