import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  userInfos: z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
  }),
  todayScore: z.number().optional(),
  score: z.number().optional(),
  keyData: z.object({
    calorieCount: z.number(),
    proteinCount: z.number(),
    carbohydrateCount: z.number(),
    lipidCount: z.number(),
  }),
});

// type User = z.infer<typeof UserSchema>;
