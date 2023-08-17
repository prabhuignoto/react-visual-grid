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
    coverage: {
      clean: true,
      enabled: true,
      exclude: ["**/*.test.tsx", "**/*.test.ts"],
      // include: [
      //   "./src/components/**/*.{tsx,ts}",
      //   "./src/common/**/*.{tsx,ts}",
      //   "./src/effects/**/*.{ts,tsx}",
      // ],
      provider: "v8",
      reporter: ["lcov", "clover", "cobertura"],
      reportsDirectory: "./coverage",
      threshold: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
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
