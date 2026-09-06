import { useCallback } from "react";
import { Button } from "../Button/Button.tsx";
import { ToastProvider } from "./ToastProvider.tsx";
import { type ShowToastOptions, type ToastTone, useToast } from "./useToast.ts";

type Scenario =
  | "action"
  | "deduplicate"
  | "long"
  | "multiple"
  | "pause"
  | "tones";

interface ToastStoryProps {
  onAction: () => void;
  scenario: Scenario;
}

const timedToastTimeoutMs = 200;
const showNeutralLabel = "Show neutral";
const showSuccessLabel = "Show success";
const showWarningLabel = "Show warning";
const showDangerLabel = "Show danger";
const showMultipleLabel = "Show four toasts";
const repeatLabel = "Repeat event";
const showToastLabel = "Show toast";
const feedbackTones = ["neutral", "success", "warning", "danger"] as const;

const longDescription =
  "The company roster was saved locally. This deliberately long notification checks that narrow screens wrap text without creating horizontal overflow or hiding its controls.";

function getProviderTimeout(scenario: Scenario) {
  if (scenario === "pause") {
    return timedToastTimeoutMs;
  }

  return 0;
}

function ToastStory({ onAction, scenario }: ToastStoryProps) {
  return (
    <ToastProvider
      limit={scenario === "multiple" ? feedbackTones.length : undefined}
      timeout={getProviderTimeout(scenario)}
    >
      <ToastControls onAction={onAction} scenario={scenario} />
    </ToastProvider>
  );
}

function ToastControls({ onAction, scenario }: ToastStoryProps) {
  const toast = useToast();
  const showNeutral = useCallback(
    () =>
      toast.show({
        id: "neutral-feedback",
        title: "neutral feedback",
        tone: "neutral",
      }),
    [toast],
  );
  const showSuccess = useCallback(
    () =>
      toast.show({
        id: "success-feedback",
        title: "success feedback",
        tone: "success",
      }),
    [toast],
  );
  const showWarning = useCallback(
    () =>
      toast.show({
        id: "warning-feedback",
        title: "warning feedback",
        tone: "warning",
      }),
    [toast],
  );
  const showDanger = useCallback(
    () =>
      toast.show({
        id: "danger-feedback",
        title: "danger feedback",
        tone: "danger",
      }),
    [toast],
  );
  const showMultiple = useCallback(() => {
    for (const tone of feedbackTones) {
      toast.show({
        id: `${tone}-event`,
        title: `${tone} event`,
        tone,
      });
    }
  }, [toast]);
  const showConfigured = useCallback(
    () => toast.show(getToastOptions(scenario, onAction)),
    [onAction, scenario, toast],
  );

  if (scenario === "tones") {
    return (
      <>
        <Button onClick={showNeutral}>{showNeutralLabel}</Button>
        <Button onClick={showSuccess}>{showSuccessLabel}</Button>
        <Button onClick={showWarning}>{showWarningLabel}</Button>
        <Button onClick={showDanger}>{showDangerLabel}</Button>
      </>
    );
  }

  if (scenario === "multiple") {
    return <Button onClick={showMultiple}>{showMultipleLabel}</Button>;
  }

  const label = getTriggerLabel(scenario);
  return <Button onClick={showConfigured}>{label}</Button>;
}

function getTriggerLabel(scenario: Scenario) {
  if (scenario === "deduplicate") {
    return repeatLabel;
  }

  return showToastLabel;
}

function getToastOptions(
  scenario: Scenario,
  onAction: () => void,
): ShowToastOptions {
  if (scenario === "action") {
    return {
      action: { label: "Undo", onClick: onAction },
      description: "The previous order can still be restored.",
      id: "order-dismissed",
      title: "Order dismissed",
    };
  }

  if (scenario === "long") {
    return {
      description: longDescription,
      id: "roster-saved",
      title: "Roster saved",
      tone: "success" as ToastTone,
    };
  }

  if (scenario === "pause") {
    return { id: "timed-event", title: "Timed event" };
  }

  return { id: "repeated-event", title: "Repeated event" };
}

export { ToastControls, ToastStory };
