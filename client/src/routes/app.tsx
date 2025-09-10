import { useEffect, useState } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import type { Insight } from "../schemas/insight.ts";

export const App = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const abortController = new AbortController();

  const fetchInsights = async () => {
    const res = await fetch(`/api/insights`, {
      signal: abortController.signal,
    });
    setInsights(await res.json());
  };

  useEffect(() => {
    fetchInsights();

    return () => {
      // Cancel any ongoing fetch request when the component unmounts
      abortController.abort();
    };
  }, []);

  return (
    <main className={styles.main}>
      <Header reloadInsights={fetchInsights} />
      <Insights
        className={styles.insights}
        insights={insights}
        reloadInsights={fetchInsights}
      />
    </main>
  );
};
