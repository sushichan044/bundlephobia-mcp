import ts from "@virtual-live-lab/eslint-config/presets/ts";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig(
  globalIgnores(["**/worker-configuration.d.ts"]),
  // @ts-expect-error types not match
  ts,
);
