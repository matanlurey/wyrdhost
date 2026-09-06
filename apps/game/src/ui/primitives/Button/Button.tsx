import type { ComponentPropsWithRef } from "react";
// biome-ignore lint/correctness/noUnresolvedImports: Vite loads the typed CSS Module at build time.
import styles from "./button.module.css";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "danger";
}

export function Button({
  className,
  size = "medium",
  type = "button",
  variant = "primary",
  ...buttonProps
}: ButtonProps) {
  let classes = styles["button"];
  if (className) {
    classes += ` ${className}`;
  }

  return (
    <button
      {...buttonProps}
      className={classes}
      data-size={size}
      data-variant={variant}
      type={type}
    />
  );
}
