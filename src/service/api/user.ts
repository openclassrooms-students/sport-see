import {
  ActivitySchema,
  AverageSessionSchema,
  PerformanceSchema,
  UserSchema,
} from "../../schema/User";

const BASE_URL = "http://localhost:3000";

export const getUser = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/user/${userId}`);
  const { data } = await response.json();
  const decodedData = UserSchema.safeParse(data);
  return decodedData;
};

export const getUserActivity = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/user/${userId}/activity`);
  const { data } = await response.json();
  const decodedData = ActivitySchema.safeParse(data);
  return decodedData;
};

export const getUserAverageSessions = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/user/${userId}/average-sessions`);
  const { data } = await response.json();
  const decodedData = AverageSessionSchema.safeParse(data);
  return decodedData;
};

export const getUserPerformance = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/user/${userId}/performance`);
  const { data } = await response.json();
  const decodedData = PerformanceSchema.safeParse(data);
  return decodedData;
};

const main = async () => {
  console.dir(await getUserAverageSessions(12), {
    depth: null,
  });
};

main();
