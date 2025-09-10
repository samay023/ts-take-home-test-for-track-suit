import { z } from "zod";

export const Insight = z.object({
  id: z.number().int().min(0),
  brand: z.number({ message: "Brand is required" }).int().min(
    0,
    "brand should be a number",
  ),
  createdAt: z.string().default(new Date().toISOString()).refine(
    (date) => !isNaN(Date.parse(date)),
    {
      message: "Invalid date",
    },
  ),
  text: z.string({
    message: "Text is required",
  }),
});

export type Insight = z.infer<typeof Insight>;
