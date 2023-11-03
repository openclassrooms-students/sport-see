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

export type User = z.infer<typeof UserSchema>;

export const PerformanceSchema = z.object({
  userId: z.number(),
  kind: z.object({
    1: z.string(),
    2: z.string(),
    3: z.string(),
    4: z.string(),
    5: z.string(),
    6: z.string(),
  }),
  data: z.array(
    z.object({
      value: z.number(),
      kind: z.number(),
    })
  ),
});

export type Performance = z.infer<typeof PerformanceSchema>;
