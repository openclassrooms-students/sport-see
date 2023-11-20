import { FC, useEffect, useState } from "react";
import { User as UserType } from "../../schema/User";
import { Resource } from "../../hooks/useResource";

import { Icon } from "../ui/Icon";

type NutritionProps = {
  userResource: Resource<UserType>;
};

export const Nutrition: FC<NutritionProps> = ({ userResource }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    userResource.read().then(setUser);
  }, [userResource]);

  if (!user) {
    return null;
  }

  const data = [
    {
      id: 1,
      title: "Calories",
      value: user?.keyData.calorieCount + "kCal",
      icon: <Icon.Calorie />,
    },
    {
      id: 2,
      title: "Proteines",
      value: user?.keyData.proteinCount + "g",
      icon: <Icon.Protein />,
    },
    {
      id: 3,
      title: "Glucides",
      value: user?.keyData.carbohydrateCount + "g",
      icon: <Icon.Carbohydrate />,
    },
    {
      id: 4,
      title: "Lipides",
      value: user?.keyData.lipidCount + "g",
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
