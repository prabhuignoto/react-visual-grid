import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      enabled: true,
      clean: true,
      exclude: ["**/*.test.*", "**/node_modules/**"],
      provider: "v8",
      reporter: ["text", "lcov", "clover", "cobertura"],
      reportsDirectory: "./coverage",
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    environment: "jsdom",
    globals: true,
    include: ["./src/**/*.test.{ts,tsx}"],
    pool: "threads",
    poolOptions: {
      threads: {
        minThreads: 5,
        maxThreads: 12,
      },
    },
    setupFiles: "./test-setup.ts",
    silent: true,
  },
});
