import type {
  PackageBundle,
  PackageStatsHistoryResponse,
  PackageStatsResponse,
} from "./types";

import { isEmptyObject } from "./utils/object";
import { isNonEmptyString } from "./utils/string";

export function formatPackageHistoryStats(
  packageInfo: PackageStatsResponse,
): string {
  return [
    `# 📦 Package Information for ${packageInfo.name}`,
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
    ...((packageInfo?.ignoredMissingDependencies?.length ?? 0) > 0
      ? [
          "### Ignored Missing Dependencies",
          "",
          packageInfo.ignoredMissingDependencies
            ?.map((dep) => `- **${dep}**`)
            .join("\n"),
        ]
      : []),
    "",
    "## Asset Information",
    "This is additional information about the assets that are included in the package.",
    "### Assets Files",
    packageInfo.assets
      .map((asset) => {
        return `- **${asset.name}:** ${asset.size} bytes`;
      })
      .join("\n"),
  ].join("\n");
}

export function formatPackageHistory(
  version: string,
  pastPkg: PackageStatsHistoryResponse[string],
): string {
  if (isEmptyObject(pastPkg)) {
    return [`## ${version}`, "", "Not recorded in bundlephobia."].join("\n");
  }

  return [
    `# 📦 Package Information for ${pastPkg.name} ${pastPkg.version}`,
    "",
    "## 📔 Package Info",
    "",
    `**Name:** ${pastPkg.name}`,
    `**Version:** ${pastPkg.version}`,
    "",
    "## ⚖️ Bundle Size",
    "",
    `**Size:** ${pastPkg.size} bytes`,
    `**Gzipped size:** ${pastPkg.gzip} bytes`,
    "",
    "### Dependencies",
    formatDependencies(pastPkg) ?? "No dependencies",
    "",
    "### Peer Dependencies",
    formatPeerDependencies(pastPkg) ?? "No peer dependencies",
    ...((pastPkg?.ignoredMissingDependencies?.length ?? 0) > 0
      ? [
          "## Ignored Missing Dependencies",
          "",
          pastPkg.ignoredMissingDependencies
            ?.map((dep) => `- **${dep}**`)
            .join("\n"),
        ]
      : []),
    // Asset information is omitted for context window size
  ].join("\n");
}

function isTreeShakeable(info: PackageBundle) {
  return (
    isNonEmptyString(info.hasJSModule) || info.hasJSNext || info.isModuleType
  );
}

function formatDependencies(pkg: PackageStatsResponse): string | null {
  if (
    pkg.dependencySizes.length === 1 &&
    pkg.dependencySizes[0]?.name === pkg.name
  ) {
    // dependencySizes always includes itself.
    return null;
  }

  return pkg.dependencySizes
    .map((dep) => {
      return `- **${dep.name}:** ${dep.approximateSize} bytes`;
    })
    .join("\n");
}

function formatPeerDependencies(pkg: PackageStatsResponse) {
  if (!pkg.peerDependencies || pkg.peerDependencies.length === 0) {
    return null;
  }

  return pkg.peerDependencies
    .map((dep) => {
      return `- **${dep}**`;
    })
    .join("\n");
}
