import { useResource } from "../hooks/useResource";
import {
  getUser,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance,
} from "../service/api/user";

import { UserInfo } from "../components/dashboard/UserInfo";
import { NavBar } from "../components/layout/NavBar";
import { SideBar } from "../components/layout/SideBar";
import ActivityBarChart from "../components/dashboard/ActivityBarChart";
import { AverageSessionChart } from "../components/dashboard/AverageSessionChart";
import { PerformanceChart } from "../components/dashboard/PerformanceChart";
import { ScoreChart } from "../components/dashboard/ScoreChart";
import { Nutrition } from "../components/dashboard/Nutrition";
import { SuspenseWrapper } from "../components/dashboard/SuspenseWrapper";
import { createContext } from "react";

export const UserIdContext = createContext<number | null>(null);

const Dashboard = () => {
  const userId = 12;

  const userResource = useResource(getUser, userId);
  const activityResource = useResource(getUserActivity, userId);
  const averageSessionsResource = useResource(getUserAverageSessions, userId);

  return (
    <UserIdContext.Provider value={userId}>
      <main>
        <NavBar />
        <SideBar />
        <div className="p-4 mt-24 ml-28 lg:py-16 lg:pl-28 lg:pr-20">
          {userResource && (
            <SuspenseWrapper
              resource={userResource}
              fallback={<div>Loading user...</div>}
            >
              <UserInfo userResource={userResource} />
            </SuspenseWrapper>
          )}
          <div className="flex flex-col-reverse lg:flex-row flex-wrap gap-8">
            <div className="w-full flex flex-wrap lg:w-3/5 flex-grow gap-12 lg:gap-7">
              {activityResource && (
                <SuspenseWrapper
                  resource={activityResource}
                  fallback={<div>Loading activity...</div>}
                >
                  <ActivityBarChart activityResource={activityResource} />
                </SuspenseWrapper>
              )}

              <div className="flex flex-wrap flex-grow justify-between gap-7">
                {averageSessionsResource && (
                  <SuspenseWrapper
                    resource={averageSessionsResource}
                    fallback={<div>Loading average sessions...</div>}
                  >
                    <AverageSessionChart
                      averageSessionsResource={averageSessionsResource}
                    />
                  </SuspenseWrapper>
                )}

                <SuspenseWrapper fallback={<div>Loading performance...</div>}>
                  <PerformanceChart />
                </SuspenseWrapper>

                {userResource && (
                  <SuspenseWrapper
                    resource={userResource}
                    fallback={<div>Loading score...</div>}
                  >
                    <ScoreChart userResource={userResource} />
                  </SuspenseWrapper>
                )}
              </div>
            </div>
            {userResource && (
              <SuspenseWrapper
                resource={userResource}
                fallback={<div>Loading nutrition...</div>}
              >
                <Nutrition userResource={userResource} />
              </SuspenseWrapper>
            )}
          </div>
        </div>
      </main>
    </UserIdContext.Provider>
  );
};

export default Dashboard;
