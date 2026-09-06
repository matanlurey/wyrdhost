import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// biome-ignore lint/style/noDefaultExport: Vite discovers configuration through the default export.
export default defineConfig({
  server: { host: "0.0.0.0", allowedHosts: ["terminal.local"] },
  plugins: [react()],
});
