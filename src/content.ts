import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import type { SizeAPIErrorResponse } from "./api/size";

export const errorContentFromResponse = (
  error: SizeAPIErrorResponse,
): CallToolResult => {
  switch (error.code) {
    case "BlocklistedPackageError":
      return {
        content: [
          {
            text: [
              "# ⛔ Blacklisted Package Error",
              "",
              "The package you were looking for is blocklisted because it failed to build multiple times in the past and further tries aren't likely to succeed. This can happen if this package wasn't meant to be bundled in a client side application.",
            ].join("\n"),
            type: "text",
          },
        ],
        isError: true,
      };
    case "BuildError":
      return {
        content: [
          {
            text: ["# 🛑 Build Error", "", error.details].join("\n"),
            type: "text",
          },
        ],
        isError: true,
      };
    case "EntryPointError":
      return {
        content: [
          {
            text: ["# 🚫 Entry Point Error", "", error.message].join("\n"),
            type: "text",
          },
        ],
        isError: true,
      };
    case "InstallError":
      return {
        content: [
          {
            text: ["# 📦 Installation Error", "", error.message].join("\n"),
            type: "text",
          },
        ],
        isError: true,
      };
    case "MinifyError":
      return {
        content: [
          {
            text: [
              "# 🔍 Minification Error",
              "",
              "```",
              error.error.details.originalError,
              "```",
            ].join("\n"),
            type: "text",
          },
        ],
        isError: true,
      };
    case "MissingDependencyError":
      return {
        content: [
          {
            text: [
              "# ⚠️ Missing Dependency Error",
              "",
              `This package (or this version) uses following modules, ` +
                `but does not specify ${
                  error.details.extra.missingModules.length > 1 ? "them" : "it"
                } either as a dependency or a peer dependency`,
              "",
              "## Missing Modules",
              ...error.details.extra.missingModules.map(
                (module) => `- ${module}`,
              ),
            ].join("\n"),
            type: "text",
          },
        ],
        isError: true,
      };

    case "PackageNotFoundError":
      return {
        content: [
          {
            text: [
              "# 🔍 Package Not Found Error",
              "",
              "The specified package could not be found. Please check the package name.",
            ].join("\n"),
            type: "text",
          },
        ],
        isError: true,
      };
    case "PackageVersionMismatchError":
      return {
        content: [
          {
            text: [
              "# ⚠️ Version Mismatch Error",
              "",
              "The package version does not match. Please check dependency compatibility.",
            ].join("\n"),
            type: "text",
          },
        ],
        isError: true,
      };
    case "UnsupportedPackageError":
      return {
        content: [
          {
            text: [
              "# ❌ Unsupported Package Error",
              "",
              "This package is currently not supported. Please consider alternative packages.",
            ].join("\n"),
            type: "text",
          },
        ],
        isError: true,
      };
    default:
      return {
        content: [
          {
            text: [
              "# ❓ Unknown Error",
              "",
              "An unexpected error occurred. No detailed information is available.",
            ].join("\n"),
            type: "text",
          },
        ],
        isError: true,
      };
  }
};
