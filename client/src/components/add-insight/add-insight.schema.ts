import { z } from "zod";

export const insightSchema = z.object({
  brand: z.string().transform((val) => parseInt(val, 10)),
  text: z
    .string()
    .min(1, "Please enter some enter insight")
    .max(1000, "Characters more than 1000 are not allowed"),
  createdAt: z
    .date()
    .default(new Date())
    .transform((d) => d.toISOString()),
});
