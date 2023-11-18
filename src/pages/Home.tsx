import { Suspense, useEffect, useState } from "react";
import Header from "../components/layout/Header";
import { NavBar } from "../components/layout/NavBar";
import { SideBar } from "../components/layout/SideBar";
import { getUser, getUserPerformance } from "../service/api/user";
import { Nutrition } from "../components/home/Nutrition";
import { Icon } from "../components/ui/Icon";
import { ScoreChart } from "../components/home/ScoreChart";
import { PerformanceChart } from "../components/home/PerformanceChart";
import { Performance, User } from "../schema/User";
import ActivityBarChart from "../components/home/ActivityBarChart";
import { AverageSessionChart } from "../components/home/AverageSessionChart";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [performance, setPerformance] = useState<Performance | null>(null);

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

  const getPerformance = async () => {
    try {
      const res = await getUserPerformance(12);

      if (res.success) {
        setPerformance(res.data);
      } else {
        console.error(res.error);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getDataUser();
    getPerformance();
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
      <div className="p-4 mt-24 ml-28 lg:py-16 lg:pl-28 lg:pr-20">
        {!user ? (
          <p>Chargement...</p>
        ) : (
          <>
            <Header firstName={user.userInfos.firstName} />
            <div className="flex flex-col-reverse lg:flex-row flex-wrap gap-8">
              <div className="w-full flex flex-wrap lg:w-3/5 flex-grow gap-12 lg:gap-7">
                <Suspense fallback={<p>Loading...</p>}>
                  <ActivityBarChart />
                </Suspense>

                <div className="flex flex-wrap flex-grow justify-between gap-7">
                  <Suspense fallback={<p>Loading...</p>}>
                    <AverageSessionChart />
                  </Suspense>
                  <PerformanceChart performance={performance} />
                  <ScoreChart score={score} />
                </div>
              </div>

              <Nutrition data={dataNutritions} />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
