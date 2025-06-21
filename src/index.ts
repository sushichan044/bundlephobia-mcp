import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { structuredErrorOfPackageHistoryAPI } from "./api/package-history";
import { fetchPackageHistory } from "./api/package-history";
import { isPackageHistoryAPIErrorResponse } from "./api/package-history";
import {
  fetchPackageStats,
  isSizeAPIErrorResponse,
  structuredErrorOfSizeAPI,
} from "./api/size";
import { PKG_NAME, PKG_VERSION } from "./constants";
import {
  packageStatsHistoryMCPOutputSchema,
  structuredPackageStatsOutput,
} from "./structured-output";
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

  server.registerTool(
    "get_npm_package_info",
    {
      annotations: {
        destructiveHint: false,
        openWorldHint: true,
        readOnlyHint: true,
        title: "Get information about an npm package",
      },
      description: [
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
      inputSchema: {
        name: z
          .string()
          .describe("The name of the npm package to get information about."),
      },
      outputSchema: structuredPackageStatsOutput.schema,
    },
    async ({ name }) => {
      try {
        if (!isNonEmptyString(name)) {
          return structuredPackageStatsOutput.error({
            code: "InvalidInputError",
            messages: ["Package name must be a non-empty string"],
          });
        }

        const packageInfo = await fetchPackageStats(name);

        if (isSizeAPIErrorResponse(packageInfo)) {
          return structuredPackageStatsOutput.error(
            structuredErrorOfSizeAPI(packageInfo),
          );
        }

        return structuredPackageStatsOutput.success(packageInfo);
      } catch (error) {
        console.error(error);
        return structuredPackageStatsOutput.error({
          code: "FetchError",
          messages: [
            "An error occurred while fetching the package information from bundlephobia.",
            error instanceof Error ? error.message : String(error),
          ],
        });
      }
    },
  );

  server.registerTool(
    "get_npm_package_info_history",
    {
      annotations: {
        destructiveHint: false,
        openWorldHint: true,
        readOnlyHint: true,
        title: "Get a version history of npm packages",
      },
      description: [
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
      inputSchema: {
        name: z
          .string()
          .describe("The name of the npm package to get information about."),
      },
      outputSchema: packageStatsHistoryMCPOutputSchema.schema,
    },
    async ({ name }) => {
      try {
        if (!isNonEmptyString(name)) {
          return packageStatsHistoryMCPOutputSchema.error({
            code: "InvalidInputError",
            messages: ["Package name must be a non-empty string"],
          });
        }
        const packageInfo = await fetchPackageHistory(name);

        if (isPackageHistoryAPIErrorResponse(packageInfo)) {
          return packageStatsHistoryMCPOutputSchema.error(
            structuredErrorOfPackageHistoryAPI(packageInfo),
          );
        }

        return packageStatsHistoryMCPOutputSchema.success(packageInfo);
      } catch (error) {
        console.error(error);
        return packageStatsHistoryMCPOutputSchema.error({
          code: "FetchError",
          messages: [
            "An error occurred while fetching the package history from bundlephobia.",
            error instanceof Error ? error.message : String(error),
          ],
        });
      }
    },
  );

  return server;
};
