import { defineConfig, LibraryFormats } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const demoConfig = {
  root: resolve(dirname(fileURLToPath(import.meta.url)), "./"),
  plugins: [react()],
  build: {
    outDir: resolve(dirname(fileURLToPath(import.meta.url)), "docs"),
    emptyOutDir: true,
  },
};

const libConfig = {
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: ["src/main.tsx", "src/App.tsx"],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(dirname(fileURLToPath(import.meta.url)), "src/index.ts"),
      },
      name: "DecimalExpansion",
      formats: ["es", "cjs", "umd"] as LibraryFormats[],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "demo") {
    return demoConfig;
  } else {
    return libConfig;
  }
});
