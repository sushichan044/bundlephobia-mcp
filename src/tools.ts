import { z } from "zod";

import { fetchPackageStats } from "./api/size";
import { errorContentFromResponse } from "./content";
import {
  formatDependencies,
  formatPeerDependencies,
  isTreeShakeable,
} from "./format";
import { defineTool } from "./mcp/define";
import { isNonEmptyString } from "./utils/string";

export const getNpmPackageInfo = defineTool({
  description: "Get information about an npm package",
  name: "get_npm_package_info",

  schema: {
    name: z.string(),
  },

  handler: async ({ name }) => {
    if (!isNonEmptyString(name)) {
      return {
        content: [
          {
            text: [
              "# **Error Occurred**",
              "You must provide a package name",
            ].join("\n"),
            type: "text",
          },
        ],
        isError: true,
      };
    }

    const packageInfo = await fetchPackageStats(name);

    if ("code" in packageInfo) {
      return errorContentFromResponse(packageInfo);
    }

    return {
      content: [
        {
          text: [
            `# 📦 Package Information for ${name}`,
            "",
            "## 📔 Package Info",
            "",
            `**Name:** ${packageInfo.name}`,
            `**Version:** ${packageInfo.version}`,
            `**NPM Link:** https://www.npmjs.com/package/${packageInfo.name}`,
            `**Description:** ${packageInfo.description}`,
            ...(isNonEmptyString(packageInfo.repository)
              ? [`**Repository:** ${packageInfo.repository}`]
              : []),
            "",
            "## ⚖️ Bundle Size",
            "",
            `**Tree-shakable:** ${isTreeShakeable(packageInfo) ? "Yes" : "No"}`,
            `**Size:** ${packageInfo.size} bytes`,
            `**Gzipped size:** ${packageInfo.gzip} bytes`,
            "",
            "### Dependencies",
            formatDependencies(packageInfo) ?? "No dependencies",
            "",
            "### Peer Dependencies",
            formatPeerDependencies(packageInfo) ?? "No peer dependencies",
            "",
            "## Asset Information",
            "This is additional information about the assets that are included in the package.",
            "### Assets Files",
            packageInfo.assets
              .map((asset) => {
                return `- **${asset.name}:** ${asset.size} bytes`;
              })
              .join("\n"),
          ].join("\n"),
          type: "text",
        },
      ],
    };
  },
});
