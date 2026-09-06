import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { DialogPopupProps } from "@base-ui/react/dialog";
import type { ReactElement, ReactNode } from "react";
import { useScrollableRegion } from "../../hooks/useScrollableRegion.ts";
import { Button } from "../Button/Button.tsx";
// biome-ignore lint/correctness/noUnresolvedImports: Vite loads CSS Modules at build time.
import styles from "./dialog.module.css";

export interface DialogProps {
  children: ReactNode;
  closeLabel?: string;
  contentLabel: string;
  defaultOpen?: boolean;
  description: ReactNode;
  initialFocus?: DialogPopupProps["initialFocus"];
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  title: ReactNode;
  trigger: ReactElement;
}

export function Dialog({
  children,
  closeLabel = "Close",
  contentLabel,
  defaultOpen,
  description,
  initialFocus,
  onOpenChange,
  open,
  title,
  trigger,
}: DialogProps) {
  const scrollableRegion = useScrollableRegion(contentLabel);

  return (
    <BaseDialog.Root
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      open={open}
    >
      <BaseDialog.Trigger render={trigger} />
      <BaseDialog.Portal>
        <BaseDialog.Backdrop
          className={styles["backdrop"]}
          data-testid="dialog-backdrop"
        />
        <BaseDialog.Viewport className={styles["viewport"]}>
          <BaseDialog.Popup
            className={styles["popup"]}
            initialFocus={initialFocus}
          >
            <header className={styles["header"]}>
              <BaseDialog.Title className={styles["title"]}>
                {title}
              </BaseDialog.Title>
              <BaseDialog.Description className={styles["description"]}>
                {description}
              </BaseDialog.Description>
            </header>
            <div className={styles["content"]} {...scrollableRegion}>
              {children}
            </div>
            <footer className={styles["actions"]}>
              <BaseDialog.Close
                render={<Button variant="secondary">{closeLabel}</Button>}
              />
            </footer>
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
