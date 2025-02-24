import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  root: ".",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: true,
  },
});
