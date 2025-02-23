import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: "src/main.tsx",
      name: "MyWidget",
      fileName: (format) => `my-widget.${format}.js`,
    },
    rollupOptions: {
      external: ["preact"], // Prevent Preact from being bundled twice
      output: {
        globals: {
          preact: "Preact",
        },
      },
    },
  },
});