import { expect } from "jsr:@std/expect";
import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { withDB } from "../testing.ts";
import { Insight } from "$models/insight.ts";
import deleteInsight from "./delete-insight.ts";
import listInsights from "./list-insights.ts";

describe("deleting insights from the database", () => {
  withDB((fixture) => {
    const insights: Insight[] = [
      { id: 1, brand: 0, createdAt: new Date().toISOString(), text: "1" },
      { id: 2, brand: 0, createdAt: new Date().toISOString(), text: "2" },
      { id: 3, brand: 1, createdAt: new Date().toISOString(), text: "3" },
      { id: 4, brand: 4, createdAt: new Date().toISOString(), text: "4" },
    ];
    beforeAll(() => {
      fixture.insights.insert(insights);
    });
    it("removes the insight from the database", () => {
      deleteInsight({ db: fixture.db, id: insights[0].id });
      deleteInsight({ db: fixture.db, id: insights[1].id });

      const allInsights = listInsights({ db: fixture.db });

      expect(allInsights.length).toBe(insights.length - 2);
      expect(allInsights).not.toContain(insights[0]);
      expect(allInsights).not.toContain(insights[1]);
    });
  });
});
