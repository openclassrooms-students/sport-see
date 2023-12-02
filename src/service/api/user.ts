import { z } from "zod";
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../../mocks/userData";

import {
  Activity,
  ActivitySchema,
  AverageSession,
  AverageSessionSchema,
  Performance,
  PerformanceSchema,
  User,
  UserSchema,
} from "../../schema/User";

const BASE_URL = "http://localhost:3000";

const getData = async <T>(url: string, mockData: T): Promise<T> => {
  try {
    const response = await fetch(url);
    const { data } = await response.json();
    return data;
  } catch (error) {
    if (
      import.meta.env.MODE === "development" &&
      error instanceof Error &&
      error.message === "Failed to fetch"
    ) {
      return mockData;
    }
    throw error;
  }
};

const getDataWithValidation = async <T>(
  url: string,
  mockData: T,
  schema: z.ZodSchema<T>
): Promise<T> => {
  const data = await getData<T>(url, mockData);
  const decodedData = schema.safeParse(data);
  if (!decodedData.success) {
    throw new Error(decodedData.error.message);
  }
  return decodedData.data;
};

export const getUser = async (userId: number): Promise<User> => {
  return await getDataWithValidation<User>(
    `${BASE_URL}/user/${userId}`,
    USER_MAIN_DATA.find((user) => user.id === userId)!,
    UserSchema
  );
};

export const getUserActivity = async (userId: number): Promise<Activity> => {
  return await getDataWithValidation<Activity>(
    `${BASE_URL}/user/${userId}/activity`,
    USER_ACTIVITY.find((user) => user.userId === userId)!,
    ActivitySchema
  );
};

export const getUserAverageSessions = async (
  userId: number
): Promise<AverageSession> => {
  return await getDataWithValidation<AverageSession>(
    `${BASE_URL}/user/${userId}/average-sessions`,
    USER_AVERAGE_SESSIONS.find((user) => user.userId === userId)!,
    AverageSessionSchema
  );
};

export const getUserPerformance = async (
  userId: number
): Promise<Performance> => {
  return await getDataWithValidation<Performance>(
    `${BASE_URL}/user/${userId}/performance`,
    USER_PERFORMANCE.find((user) => user.userId === userId)!,
    PerformanceSchema
  );
};
