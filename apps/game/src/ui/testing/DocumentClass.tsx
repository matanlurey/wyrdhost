import { useEffect, type ReactNode } from "react";

interface DocumentClassProps {
  children: ReactNode;
  className: string | undefined;
}

export function DocumentClass({ children, className }: DocumentClassProps) {
  useEffect(() => {
    if (!className) {
      return;
    }

    globalThis.document.documentElement.classList.add(className);
    return () =>
      globalThis.document.documentElement.classList.remove(className);
  }, [className]);

  return children;
}
