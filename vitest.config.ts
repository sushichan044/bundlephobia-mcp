import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: false,
    typecheck: {
      enabled: true,
    },
  },
});
