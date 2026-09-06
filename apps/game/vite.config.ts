import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// biome-ignore lint/style/noDefaultExport: Vite discovers configuration through the default export.
export default defineConfig({
  plugins: [react()],
});
