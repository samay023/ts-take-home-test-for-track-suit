import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./delete-insight.module.css";

interface DeleteInsightProps extends ModalProps {
  reloadInsights: () => void;
  insightId: number;
  text: string;
}

export const DeleteInsight = ({
  reloadInsights,
  insightId,
  text,
  ...rest
}: DeleteInsightProps) => {
  const deleteInsight = async () => {
    await fetch(`/api/insights/${insightId}`, {
      method: "DELETE",
    });
    reloadInsights();
    rest.onClose();
  };

  return (
    <Modal {...rest}>
      <h1 className={styles.heading}>Are you sure ?</h1>
      <div>
        <p>This will delete:</p>
        <p style={{ fontWeight: "bold", fontStyle: "italic" }}>"{text}"</p>
      </div>

      <div className={styles["button-container"]}>
        <Button
          name="confirm"
          label="Confirm"
          theme="primary"
          onClick={deleteInsight}
        />
        <Button
          name="cancel"
          label="Cancel"
          theme="secondary"
          onClick={() => {
            rest.onClose();
          }}
        />
      </div>
    </Modal>
  );
};
