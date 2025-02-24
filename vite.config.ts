// import { defineConfig } from "vite";
// import preact from "@preact/preset-vite";
//
// export default defineConfig({
//   plugins: [preact()],
//   build: {
//     lib: {
//       entry: "src/main.tsx",
//       name: "MyWidget",
//       fileName: (format) => `my-widget.${format}.js`,
//     },
//     rollupOptions: {
//       external: ["preact"], // Prevent Preact from being bundled twice
//       output: {
//         globals: {
//           preact: "Preact",
//         },
//       },
//     },
//   },
// });

import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  root: ".", // Ensure Vite serves index.html
  build: {
    outDir: "dist",
    emptyOutDir: true, // Clears dist before building
  },
  server: {
    port: 5173,
    open: true, // Auto open browser
  },
});
