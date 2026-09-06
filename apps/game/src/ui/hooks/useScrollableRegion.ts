import { useLayoutEffect, useRef, useState } from "react";

function useScrollableRegion(label: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
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
  }, []);

  return {
    "aria-label": isScrollable ? label : undefined,
    ref,
    role: isScrollable ? ("region" as const) : undefined,
    tabIndex: isScrollable ? 0 : undefined,
  };
}

export { useScrollableRegion };
