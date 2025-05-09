import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { errorContentFromPackageHistoryAPIErrorResponse } from "./api/package-history";
import { fetchPackageHistory } from "./api/package-history";
import { isPackageHistoryAPIErrorResponse } from "./api/package-history";
import {
  errorContentFromSizeAPIErrorResponse,
  fetchPackageStats,
  isSizeAPIErrorResponse,
} from "./api/size";
import { PKG_NAME, PKG_VERSION } from "./constants";
import { formatPackageHistory, formatPackageHistoryStats } from "./format";
import { isNonEmptyString } from "./utils/string";

/**
 * Create a new instance of Bundlephobia MCP server.
 */
export const createServer = (): McpServer => {
  const server = new McpServer({
    description:
      "Fetch information about the bundle size and dependencies of npm packages. Or retrieve those information over the past versions.",
    name: PKG_NAME,
    version: PKG_VERSION,
  });

  server.tool(
    "get_npm_package_info",
    [
      "Get information about an npm package with bundlephobia.",
      "",
      "For example, you can retrieve information about:",
      "- Bundle size",
      "- Tree-shakeability",
      "- Dependencies",
      "- Peer dependencies",
      "- Assets",
      "## Usage",
      "```",
      "get_npm_package_info(name: '$PACKAGE_NAME')",
      "```",
    ].join("\n"),
    {
      name: z
        .string()
        .describe("The name of the npm package to get information about."),
    },

    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      title: "Get information about an npm package",
    },

    async ({ name }) => {
      try {
        if (!isNonEmptyString(name)) {
          return {
            content: [
              {
                text: [
                  "# ❌ Invalid Input Error",
                  "",
                  "You must provide a non-empty string.",
                ].join("\n"),
                type: "text",
              },
            ],
            isError: true,
          };
        }

        const packageInfo = await fetchPackageStats(name);

        if (isSizeAPIErrorResponse(packageInfo)) {
          return errorContentFromSizeAPIErrorResponse(packageInfo);
        }

        return {
          content: [
            {
              text: formatPackageHistoryStats(packageInfo),
              type: "text",
            },
          ],
        };
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
    "get_npm_package_info_history",
    [
      "Get all the past information about an npm package stored in bundlephobia.",
      "",
      "For example, you can retrieve information about:",
      "- Bundle size",
      "- Tree-shakeability",
      "- Dependencies",
      "- Peer dependencies",
      "- Assets",
      "## Usage",
      "```",
      "get_npm_package_info_history(name: '$PACKAGE_NAME')",
      "```",
    ].join("\n"),
    {
      name: z
        .string()
        .describe("The name of the npm package to get information about."),
    },
    {
      destructiveHint: false,
      openWorldHint: true,
      readOnlyHint: true,
      title: "Get a version history of npm packages",
    },

    async ({ name }) => {
      try {
        if (!isNonEmptyString(name)) {
          return {
            content: [
              {
                text: [
                  "# ❌ Invalid Input Error",
                  "",
                  "You must provide a non-empty string.",
                ].join("\n"),
                type: "text",
              },
            ],
            isError: true,
          };
        }
        const packageInfo = await fetchPackageHistory(name);

        if (isPackageHistoryAPIErrorResponse(packageInfo)) {
          return errorContentFromPackageHistoryAPIErrorResponse(packageInfo);
        }

        return {
          content: Object.entries(packageInfo).map(([version, pastPkg]) => ({
            text: formatPackageHistory(version, pastPkg),
            type: "text",
          })),
        };
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

  return server;
};
