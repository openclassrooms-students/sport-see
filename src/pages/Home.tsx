import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import { NavBar } from "../components/layout/NavBar";
import { SideBar } from "../components/layout/SideBar";
import { UserType, getUser } from "../service/api/user";
import { Nutrition } from "../components/home/Nutrition";
import { Icon } from "../components/ui/Icon";
import { Score } from "../components/home/Score";

const Home = () => {
  const [user, setUser] = useState<UserType | null>(null);

  const getDataUser = async () => {
    try {
      const res = await getUser(12);

      if (res.success) {
        setUser(res.data);
      } else {
        console.error(res.error);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);

  const dataNutritions = [
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

  const score = user?.score || user?.todayScore || 0;


  return (
    <main>
      <NavBar />
      <SideBar />
      <div className="mt-24 ml-28 py-16 pl-28 pr-20">
        {!user ? (
          <p>Chargement...</p>
        ) : (
          <>
            <Header firstName={user.userInfos.firstName} />
            <Nutrition data={dataNutritions} />
            <Score score={score} />
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
