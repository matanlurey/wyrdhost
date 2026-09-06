import { useLayoutEffect, useState } from "react";

function useScrollableRegion(label: string) {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useLayoutEffect(() => {
    if (!element) {
      return;
    }

    const update = () => {
      setIsScrollable(
        element.scrollHeight > element.clientHeight ||
          element.scrollWidth > element.clientWidth,
      );
    };
    const resizeObserver = new ResizeObserver(update);
    const observeSizes = () => {
      resizeObserver.disconnect();
      resizeObserver.observe(element);
      for (const child of element.children) {
        resizeObserver.observe(child);
      }
    };
    const mutationObserver = new MutationObserver(() => {
      observeSizes();
      update();
    });

    observeSizes();
    update();
    mutationObserver.observe(element, {
      characterData: true,
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [element]);

  if (!isScrollable) {
    return { ref: setElement };
  }

  return {
    "aria-label": label,
    ref: setElement,
    role: "region" as const,
    tabIndex: 0,
  };
}

export { useScrollableRegion };
