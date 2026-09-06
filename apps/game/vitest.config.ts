import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

// biome-ignore lint/style/noDefaultExport: Vitest discovers configuration through the default export.
export default defineConfig({
  optimizeDeps: {
    include: ["@base-ui/react/alert-dialog", "@base-ui/react/dialog"],
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            storybookScript: "npm run storybook -- --no-open",
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: "chromium" }],
            provider: playwright({
              contextOptions: {
                hasTouch: true,
                reducedMotion: "reduce",
              },
            }),
          },
        },
      },
    ],
  },
});
