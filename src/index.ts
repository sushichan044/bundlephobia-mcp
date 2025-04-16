import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { name as pkgName, version as pkgVersion } from "../package.json";
import { getPackageInfo } from "./tools";

export const server = new McpServer({
  name: pkgName,
  version: pkgVersion,
});

server.tool(
  getPackageInfo.name,
  getPackageInfo.description,
  getPackageInfo.schema,
  async (parameters, extra) => {
    try {
      return getPackageInfo.handler(parameters, extra);
    } catch (error) {
      console.error(error);
      return {
        content: [
          {
            text: [
              "# **Error Occurred**",
              "It looks like there was an error while communicating with the eslint-todo API.",
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
