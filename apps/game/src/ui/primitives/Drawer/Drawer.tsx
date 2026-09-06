import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type { ReactElement, ReactNode } from "react";
import { Button } from "../Button/Button.tsx";
// biome-ignore lint/correctness/noUnresolvedImports: Vite loads CSS Modules at build time.
import styles from "./drawer.module.css";

export interface DrawerProps {
  children: ReactNode;
  closeLabel?: string;
  defaultOpen?: boolean;
  description: ReactNode;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  title: ReactNode;
  trigger: ReactElement;
}

export function Drawer({
  children,
  closeLabel = "Close",
  defaultOpen,
  description,
  onOpenChange,
  open,
  title,
  trigger,
}: DrawerProps) {
  return (
    <BaseDrawer.Root
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      open={open}
      swipeDirection="down"
    >
      <BaseDrawer.Trigger render={trigger} />
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop
          className={styles["backdrop"]}
          data-testid="drawer-backdrop"
        />
        <BaseDrawer.Viewport className={styles["viewport"]}>
          <BaseDrawer.Popup className={styles["popup"]}>
            <header className={styles["header"]}>
              <div aria-hidden="true" className={styles["handle"]} />
              <BaseDrawer.Title className={styles["title"]}>
                {title}
              </BaseDrawer.Title>
              <BaseDrawer.Description className={styles["description"]}>
                {description}
              </BaseDrawer.Description>
            </header>
            <BaseDrawer.Content className={styles["content"]} tabIndex={0}>
              {children}
            </BaseDrawer.Content>
            <footer className={styles["actions"]}>
              <BaseDrawer.Close
                render={<Button variant="secondary">{closeLabel}</Button>}
              />
            </footer>
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}
