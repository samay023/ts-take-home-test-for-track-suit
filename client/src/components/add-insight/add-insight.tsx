import React, { useEffect } from "react";
import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";
import { insightSchema } from "./add-insight.schema.ts";

interface AddInsightProps extends ModalProps {
  reloadInsights: () => void;
}

export const AddInsight = (props: AddInsightProps) => {
  const [errors, setErrors] = React.useState<string[]>([]);

  const addInsight = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Reset any errors on submit
    setErrors([]);

    const formData = new FormData(e.currentTarget);

    const result = insightSchema.safeParse({
      brand: formData.get("brand"),
      text: formData.get("text"),
    });

    if (result.success) {
      await fetch("/api/insights", {
        body: JSON.stringify(result.data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      props.onClose();
      props.reloadInsights();
    } else {
      setErrors(result.error.issues.map((issue) => issue.message));
    }
  };

  useEffect(() => {
    return () => {
      // Reset errors when the component unmounts
      setErrors([]);
    };
  }, []);

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={addInsight}>
        <label className={styles.field}>
          <select className={styles["field-input"]} name="brand">
            {BRANDS.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            className={styles["field-input"]}
            rows={5}
            placeholder="Something insightful..."
            name="text"
          />
          <p className={styles.error}>{errors.join(", ")}</p>
        </label>
        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};
