import { Trash2Icon } from "lucide-react";
import { cx } from "../../lib/cx.ts";
import styles from "./insights.module.css";
import type { Insight } from "../../schemas/insight.ts";
import { DeleteInsight } from "../delete-insight/delete-insight.tsx";
import { useState } from "react";

type InsightsProps = {
  insights: Insight[];
  className?: string;
  reloadInsights: () => void;
};

export const Insights = ({
  insights,
  className,
  reloadInsights,
}: InsightsProps) => {
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  return (
    <div className={cx(className)}>
      <h1 className={styles.heading}>Insights</h1>
      <div className={styles.list}>
        {insights?.length ? (
          insights.map(({ id, text, createdAt, brandId }) => (
            <div className={styles.insight} key={id}>
              <div className={styles["insight-meta"]}>
                <span>{brandId}</span>
                <div className={styles["insight-meta-details"]}>
                  <span>{new Date(createdAt).toLocaleString()}</span>
                  <Trash2Icon
                    className={styles["insight-delete"]}
                    onClick={() =>
                      setSelectedInsight({ id, text, brandId, createdAt })
                    }
                  />
                </div>
              </div>
              <p className={styles["insight-content"]}>{text}</p>
            </div>
          ))
        ) : (
          <p>We have no insight!</p>
        )}
      </div>
      {selectedInsight && (
        <DeleteInsight
          text={selectedInsight.text || ""}
          insightId={+selectedInsight.id}
          open={!!selectedInsight}
          onClose={() => setSelectedInsight(null)}
          reloadInsights={reloadInsights}
        />
      )}
    </div>
  );
};
