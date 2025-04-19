// @ts-check

import react from "@virtual-live-lab/eslint-config/presets/react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig(
  globalIgnores(["worker-configuration.d.ts"]),
  // @ts-expect-error types not match
  react,
);
