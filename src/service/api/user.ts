import { z } from "zod";
import { UserSchema } from "../../schema/User";

const BASE_URL = "http://localhost:3000";

export type UserType = z.infer<typeof UserSchema>;

export const getUser = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/user/${userId}`);
  const { data } = await response.json();
  const decodedData = UserSchema.safeParse(data);
  return decodedData;
};

// export type getUser

export type User = z.infer<typeof UserSchema>;




export const getUserActivity = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/user/${userId}/activity`);
  const data = await response.json();
  return data;
};

export const getUserAverageSessions = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/user/${userId}/average-sessions`);
  const data = await response.json();
  return data;
};
export const getUserPerformance = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/user/${userId}/performance`);
  const data = await response.json();
  return data;
};

// const main = async () => {
//   console.log("getUser(12)", await getUser(12));
// };

// main();
