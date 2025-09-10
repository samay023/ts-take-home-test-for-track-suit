import type { Database } from "@db/sqlite";
import { createTable } from "$tables/insights.ts";

export default function seed(db: Database) {
  const schema = [createTable];
  return db.exec(schema.join("\n"));
}
