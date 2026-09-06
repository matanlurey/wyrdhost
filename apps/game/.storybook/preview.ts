import type { Preview } from "@storybook/react-vite";
import "../src/ui/styles/layers.css";

const preview: Preview = {
  initialGlobals: {
    backgrounds: { value: "canvas" },
  },
  parameters: {
    options: {
      storySort: { order: ["Foundation", ["Overview", "*"], "Primitives"] },
    },
    a11y: {
      test: "error",
    },
    backgrounds: {
      options: {
        canvas: { name: "Canvas", value: "var(--color-canvas)" },
        panel: { name: "Panel", value: "var(--color-panel)" },
      },
    },
    controls: {
      expanded: true,
    },
    layout: "centered",
    viewport: {
      options: {
        narrowPhone: {
          name: "Narrow phone",
          styles: { width: "320px", height: "568px" },
          type: "mobile",
        },
        phone: {
          name: "Phone",
          styles: { width: "390px", height: "844px" },
          type: "mobile",
        },
        largePhone: {
          name: "Large phone",
          styles: { width: "430px", height: "932px" },
          type: "mobile",
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
          type: "tablet",
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1280px", height: "800px" },
          type: "desktop",
        },
      },
    },
  },
};

// Storybook discovers project annotations through the default export.
export default preview;
