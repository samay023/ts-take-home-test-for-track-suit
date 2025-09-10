import type { HasDBClient } from "../shared.ts";

type Input = HasDBClient & {
  id: number;
};

export default function deleteInsight(
  { db, id }: Input,
) {
  const statement = db.prepare("DELETE FROM insights WHERE id = ?");
  statement.run(id);
  statement.finalize();
}
