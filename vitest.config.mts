import { defineConfig } from "vitest/config";

// biome-ignore lint/style/noDefaultExport: Vitest loads its config through the default export.
export default defineConfig({
  test: { include: ["scripts/**/*.test.ts"], environment: "node" },
});
