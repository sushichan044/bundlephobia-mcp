import type { PackageBundle, PackageStatsResponse } from "./types";

import { isNonEmptyString } from "./utils/string";

export const isTreeShakeable = (info: PackageBundle) => {
  return (
    isNonEmptyString(info.hasJSModule) || info.hasJSNext || info.isModuleType
  );
};

export const formatDependencies = (
  pkg: PackageStatsResponse,
): string | null => {
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
};

export const formatPeerDependencies = (pkg: PackageStatsResponse) => {
  if (!pkg.peerDependencies || pkg.peerDependencies.length === 0) {
    return null;
  }

  return pkg.peerDependencies
    .map((dep) => {
      return `- **${dep}**`;
    })
    .join("\n");
};
