import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  clean: true,
  declaration: true,
  entries: ["src/index.ts", "src/mcp/transport/stdio.ts", "src/constants.ts"],
  rollup: {
    inlineDependencies: true,
  },
});
