import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    exclude: process.env.SPHEREX_LIVE ? [] : ["test/live.test.ts", "test/e2e.test.ts"],
    testTimeout: process.env.SPHEREX_LIVE ? 900_000 : 120_000,
  },
});
