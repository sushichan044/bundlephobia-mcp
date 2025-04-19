import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { name as pkgName, version as pkgVersion } from "../package.json";
import { getNpmPackageInfo, getNpmPackageInfoHistory } from "./tools";

export const server = new McpServer({
  description:
    "Fetch information about the bundle size and dependencies of npm packages. Or retrieve those information over the past versions.",
  name: pkgName,
  version: pkgVersion,
});

/**
 * Attach all tools to the server.
 * @param server - The server to attach the tools to.
 */
export const setupServer = (server: McpServer): void => {
  server.tool(
    getNpmPackageInfo.name,
    getNpmPackageInfo.description,
    getNpmPackageInfo.schema,
    async (parameters, extra) => {
      try {
        return getNpmPackageInfo.handler(parameters, extra);
      } catch (error) {
        console.error(error);
        return {
          content: [
            {
              text: [
                "# **Error Occurred**",
                "It looks like there was an error while communicating with the bundlephobia API.",
                "",
                "## Error Details",
                error instanceof Error ? error.message : String(error),
              ].join("\n"),
              type: "text",
            },
          ],
          isError: true,
        };
      }
    },
  );

  server.tool(
    getNpmPackageInfoHistory.name,
    getNpmPackageInfoHistory.description,
    getNpmPackageInfoHistory.schema,
    async (parameters, extra) => {
      try {
        return getNpmPackageInfoHistory.handler(parameters, extra);
      } catch (error) {
        console.error(error);
        return {
          content: [
            {
              text: [
                "# **Error Occurred**",
                "It looks like there was an error while communicating with the bundlephobia API.",
                "",
                "## Error Details",
                error instanceof Error ? error.message : String(error),
              ].join("\n"),
              type: "text",
            },
          ],
          isError: true,
        };
      }
    },
  );
};
