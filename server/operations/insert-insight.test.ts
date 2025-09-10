import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";
import { withDB } from "../testing.ts";
import insertInsight from "./insert-insight.ts";
import listInsights from "./list-insights.ts";

describe("inserting a single insights into the database", () => {
  withDB((f) => {
    it("throws error when inserting with bad input", () => {
      expect(() =>
        insertInsight({
          db: f.db,
          // @ts-expect-error Testing with bad input
          item: {},
        })
      ).toThrow("Brand is required, Text is required");
    });

    it("inserts correctly with valid input", () => {
      expect(
        insertInsight({
          db: f.db,
          item: {
            brand: 1,
            createdAt: new Date().toISOString(),
            text: "Great product!",
          },
        }),
      ).not.toThrow();

      const allInsights = listInsights({ db: f.db });
      const insertedInsight = allInsights.find((i) =>
        i.brand === 1 && i.text === "Great product!"
      );

      expect(insertedInsight).toBeDefined();
    });
  });
});
