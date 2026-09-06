import { Toast as BaseToast } from "@base-ui/react/toast";
import type { MouseEventHandler } from "react";

type ToastTone = "danger" | "neutral" | "success" | "warning";

interface ShowToastOptions {
  action?: {
    label: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };
  description?: string;
  /** Reusing an event ID updates its toast instead of adding duplicate noise. */
  id: string;
  timeout?: number;
  title: string;
  tone?: ToastTone;
}

function getActionProps(action: ShowToastOptions["action"]) {
  if (!action) {
    return;
  }

  return { children: action.label, onClick: action.onClick };
}

function getPriority(tone: ToastTone) {
  if (tone === "danger") {
    return "high" as const;
  }

  return "low" as const;
}

function useToast() {
  const manager = BaseToast.useToastManager();

  return {
    close: manager.close,
    show({
      action,
      description,
      id,
      timeout,
      title,
      tone = "neutral",
    }: ShowToastOptions) {
      return manager.add({
        actionProps: getActionProps(action),
        description,
        id,
        priority: getPriority(tone),
        timeout,
        title,
        type: tone,
      });
    },
  };
}

export { useToast };
export type { ShowToastOptions, ToastTone };
