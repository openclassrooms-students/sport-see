import {createContext } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { getUser } from "../service/api/user";

import ErrorBoundary from "../components/sharing/ErrorBoundary";
import { UserInfo } from "../components/dashboard/UserInfo";
import { NavBar } from "../components/layout/NavBar";
import { SideBar } from "../components/layout/SideBar";
import { ActivityBarChart } from "../components/dashboard/ActivityBarChart";
import { AverageSessionChart } from "../components/dashboard/AverageSessionChart";
import { PerformanceChart } from "../components/dashboard/PerformanceChart";
import { ScoreChart } from "../components/dashboard/ScoreChart";
import { Nutrition } from "../components/dashboard/Nutrition";

export const UserIdContext = createContext<number | null>(null);

const Dashboard = () => {
  const { userid } = useParams();
  const userId = userid ? parseInt(userid) : 12;

  const { data: user, isLoading, error } = useFetchData(getUser, userId);

  const score = user?.score || user?.todayScore || undefined;
  const userInfos = user?.userInfos || null;
  const nutritionData = user?.keyData || null;

  return (
    <UserIdContext.Provider value={userId}>
      <main>
        <NavBar />
        <SideBar />
        <ErrorBoundary fallback={<div>Failed to fetch data!</div>}>
          <div className="p-4 mt-24 ml-28 lg:py-16 lg:pl-28 lg:pr-20">
            {isLoading && <div className="">Loading... User Info </div>}
            {error || !userInfos ? (
              <div>Failed to fetch data!</div>
            ) : (
              <UserInfo userInfos={userInfos} />
            )}

            <div className="flex flex-col-reverse lg:flex-row flex-wrap gap-8">
              <div className="w-full flex flex-wrap lg:w-3/5 flex-grow gap-12 lg:gap-7">
                <ActivityBarChart />

                <div className="flex flex-wrap flex-grow justify-between gap-7">
                  <AverageSessionChart />

                  <PerformanceChart />

                  {error || !score ? (
                    <div>Failed to fetch data!</div>
                  ) : (
                    <ScoreChart score={score} />
                  )}
                </div>
              </div>
              {error || !nutritionData ? (
                <div>Failed to fetch data!</div>
              ) : (
                <Nutrition nutritionData={nutritionData} />
              )}
            </div>
          </div>
        </ErrorBoundary>
      </main>
    </UserIdContext.Provider>
  );
};

export default Dashboard;
