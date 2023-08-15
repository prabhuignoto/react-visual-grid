import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
// import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //   resolve: {
  //     alias: {
  //       "@design": path.resolve(__dirname, "./design"),
  //       "@icons": path.resolve(__dirname, "./icons"),
  //     },
  //   },
  test: {
    environment: "jsdom",
    globals: true,
    include: [
      "./src/components/**/*.test.tsx",
      "./src/components/**/*.test.ts",
    ],
    maxThreads: 12,
    minThreads: 5,
    setupFiles: "./test-setup.ts",
    silent: true,
    threads: true,
    update: true,
  },
});
