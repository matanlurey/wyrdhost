import type { ReactNode } from "react";
import { Button, type ButtonProps } from "../Button/Button.tsx";
// biome-ignore lint/correctness/noUnresolvedImports: Vite loads the typed CSS Module at build time.
import styles from "./icon-button.module.css";

export interface IconButtonProps
  extends Omit<ButtonProps, "aria-label" | "aria-labelledby" | "children"> {
  children: ReactNode;
  label: string;
}

export function IconButton({
  children,
  className,
  label,
  ...buttonProps
}: IconButtonProps) {
  let classes = styles["iconButton"];
  if (className) {
    classes += ` ${className}`;
  }

  return (
    <Button {...buttonProps} aria-label={label} className={classes}>
      <span aria-hidden="true" className={styles["icon"]}>
        {children}
      </span>
    </Button>
  );
}
