import { ofetch } from "ofetch";

import type { PackageStatsResponse } from "../../types";

export const fetchPackageStats = async (
  pkgName: string,
): Promise<ApiSizeResponse> =>
  ofetch<ApiSizeResponse>("/api/size", {
    baseURL: "https://bundlephobia.com",
    query: {
      package: pkgName,
      record: true,
    },
    retry: 3,
    retryDelay: 500,
    retryStatusCodes: [500],
  });

type ApiSizeResponse = PackageStatsResponse | SizeAPIErrorResponse;

/**
 * Error from bundlephobia API on `/api/size`
 */
export type SizeAPIErrorResponse =
  | BlocklistedPackageError
  | BuildError
  | EntryPointError
  | InstallError
  | MinifyError
  | MissingDependencyError
  | PackageNotFoundError
  | PackageVersionMismatchError
  | UnsupportedPackageError;

/**
 * 403
 */
interface BlocklistedPackageError {
  code: "BlocklistedPackageError";
}

/**
 * 403
 */
interface UnsupportedPackageError {
  code: "UnsupportedPackageError";
}

/**
 * 404
 */
interface PackageNotFoundError {
  code: "PackageNotFoundError";
}

/**
 * 404
 */
interface PackageVersionMismatchError {
  code: "PackageVersionMismatchError";
}

/**
 * 500
 */
interface InstallError {
  code: "InstallError";
  message: string;
}

/**
 * We could not guess a valid entry point for this package.
 *
 * 500
 */
interface EntryPointError {
  code: "EntryPointError";
  message: string;
}

/**
 * 500
 */
interface MissingDependencyError {
  code: "MissingDependencyError";
  details: {
    extra: {
      missingModules: string[];
    };
    name: "MissingDependencyError";
  };
}

/**
 * 500
 */
interface MinifyError {
  code: "MinifyError";
  error: {
    code: "MinifyError";
    details: {
      originalError: string;
    };
  };
}

/**
 * 500
 */
interface BuildError {
  code: "BuildError";
  details: string;
}
