import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import type { ReactElement, ReactNode } from "react";
import { useRef } from "react";
import { Button } from "../Button/Button.tsx";
// biome-ignore lint/correctness/noUnresolvedImports: Vite loads CSS Modules at build time.
import styles from "../Dialog/dialog.module.css";

export interface AlertDialogProps {
  cancelLabel: string;
  children?: ReactNode;
  confirmLabel: string;
  defaultOpen?: boolean;
  description: ReactNode;
  onConfirm: () => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  title: ReactNode;
  trigger: ReactElement;
}

export function AlertDialog({
  cancelLabel,
  children,
  confirmLabel,
  defaultOpen,
  description,
  onConfirm,
  onOpenChange,
  open,
  title,
  trigger,
}: AlertDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <BaseAlertDialog.Root
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      open={open}
    >
      <BaseAlertDialog.Trigger render={trigger} />
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop
          className={styles["backdrop"]}
          data-testid="dialog-backdrop"
        />
        <BaseAlertDialog.Viewport className={styles["viewport"]}>
          <BaseAlertDialog.Popup
            className={styles["popup"]}
            initialFocus={cancelRef}
          >
            <header className={styles["header"]}>
              <BaseAlertDialog.Title className={styles["title"]}>
                {title}
              </BaseAlertDialog.Title>
              <BaseAlertDialog.Description className={styles["description"]}>
                {description}
              </BaseAlertDialog.Description>
            </header>
            <div className={styles["content"]}>{children}</div>
            <footer className={styles["actions"]}>
              <BaseAlertDialog.Close
                render={
                  <Button ref={cancelRef} variant="secondary">
                    {cancelLabel}
                  </Button>
                }
              />
              <BaseAlertDialog.Close
                render={
                  <Button variant="danger" onClick={onConfirm}>
                    {confirmLabel}
                  </Button>
                }
              />
            </footer>
          </BaseAlertDialog.Popup>
        </BaseAlertDialog.Viewport>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}
