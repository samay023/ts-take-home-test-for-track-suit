import type { HasDBClient } from "../shared.ts";
import { Insight } from "$models/insight.ts";
import type { z } from "zod";

const InsertInsight = Insight.pick({
  brand: true,
  createdAt: true,
  text: true,
});

export type InsightInput = HasDBClient & {
  item: z.infer<typeof InsertInsight>;
};

export default function insertInsight(
  input: InsightInput,
) {
  const result = InsertInsight.safeParse(input.item);
  if (!result.success) {
    throw new Error(result.error.message || "Invalid insert body");
  }

  const statement = input.db.prepare(`
    INSERT INTO insights (brand, createdAt, text)
    VALUES (:brand, :createdAt, :text)
    `);

  statement.run({
    brand: result.data.brand,
    createdAt: result.data.createdAt,
    text: result.data.text,
  });

  console.log("Inserted insight:", {
    brand: result.data.brand,
    createdAt: result.data.createdAt,
    text: result.data.text,
  });
  statement.finalize();
}
