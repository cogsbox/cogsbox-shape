import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "cogsbox-shape": fileURLToPath(new URL("../src/index.ts", import.meta.url)),
      zod: fileURLToPath(new URL("../node_modules/zod", import.meta.url)),
    },
  },
  test: {
    globals: true,
  },
});
