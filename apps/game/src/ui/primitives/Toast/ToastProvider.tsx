import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ReactNode } from "react";
import { Button } from "../Button/Button.tsx";
// biome-ignore lint/correctness/noUnresolvedImports: Vite loads CSS Modules at build time.
import styles from "./toast.module.css";

const dismissLabel = "Dismiss";

function ToastProvider({
  children,
  limit = 3,
  timeout = 5000,
}: ToastProviderProps) {
  return (
    <BaseToast.Provider limit={limit} timeout={timeout}>
      {children}
      <ToastViewport />
    </BaseToast.Provider>
  );
}

function ToastViewport() {
  const { toasts } = BaseToast.useToastManager();

  return (
    <BaseToast.Portal>
      <BaseToast.Viewport className={styles["viewport"]}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
}

interface ToastItemProps {
  toast: BaseToast.Root.ToastObject;
}

function ToastItem({ toast }: ToastItemProps) {
  const actionLabel = toast.actionProps?.children;

  return (
    <BaseToast.Root className={styles["root"]} toast={toast}>
      <BaseToast.Content className={styles["content"]}>
        <BaseToast.Title className={styles["title"]} />
        <BaseToast.Description className={styles["description"]} />
      </BaseToast.Content>
      <div className={styles["actions"]}>
        <ToastAction actionLabel={actionLabel} />
        <BaseToast.Close
          render={
            <Button size="small" variant="secondary">
              {dismissLabel}
            </Button>
          }
        />
      </div>
    </BaseToast.Root>
  );
}

interface ToastActionProps {
  actionLabel: ReactNode;
}

function ToastAction({ actionLabel }: ToastActionProps) {
  if (!actionLabel) {
    return null;
  }

  return (
    <BaseToast.Action render={<Button size="small">{actionLabel}</Button>} />
  );
}

export interface ToastProviderProps {
  children: ReactNode;
  limit?: number;
  timeout?: number;
}

export { ToastProvider };
