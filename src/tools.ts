import { z } from "zod";

import {
  errorContentFromPackageHistoryAPIErrorResponse,
  fetchPackageHistory,
  isPackageHistoryAPIErrorResponse,
} from "./api/package-history";
import {
  errorContentFromSizeAPIErrorResponse,
  fetchPackageStats,
  isSizeAPIErrorResponse,
} from "./api/size";
import { formatPackageHistory, formatPackageHistoryStats } from "./format";
import { defineTool } from "./mcp/define";
import { isNonEmptyString } from "./utils/string";

export const getNpmPackageInfo = defineTool({
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

  name: "get_npm_package_info",

  schema: {
    name: z
      .string()
      .describe("The name of the npm package to get information about."),
  },

  handler: async ({ name }) => {
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
  },
});

export const getNpmPackageInfoHistory = defineTool({
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

  name: "get_npm_package_info_history",

  schema: {
    name: z
      .string()
      .describe("The name of the npm package to get information about."),
  },

  handler: async ({ name }) => {
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
  },
});
