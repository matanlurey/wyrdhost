import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { DialogPopupProps } from "@base-ui/react/dialog";
import type { ReactElement, ReactNode } from "react";
import { Button } from "../Button/Button.tsx";
// biome-ignore lint/correctness/noUnresolvedImports: Vite loads CSS Modules at build time.
import styles from "./dialog.module.css";

export interface DialogProps {
  children: ReactNode;
  closeLabel?: string;
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
  defaultOpen,
  description,
  initialFocus,
  onOpenChange,
  open,
  title,
  trigger,
}: DialogProps) {
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
            {/* biome-ignore lint/a11y/noNoninteractiveTabindex: Scrollable dialog content must be keyboard accessible. */}
            <div className={styles["content"]} tabIndex={0}>
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
