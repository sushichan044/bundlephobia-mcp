import { ofetch } from "ofetch";

import type { StructuredError } from "../../structured-output";
import type { PackageStats } from "../../types";

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

export async function fetchPackageStats(
  pkgName: string,
): Promise<ApiSizeResponse> {
  return ofetch<ApiSizeResponse>("/api/size", {
    baseURL: "https://bundlephobia.com",
    query: {
      package: pkgName,
      record: true,
    },
    retry: 3,
    retryDelay: 500,
    retryStatusCodes: [500],
  });
}

export function isSizeAPIErrorResponse(
  response: ApiSizeResponse,
): response is SizeAPIErrorResponse {
  return "code" in response;
}

export function structuredErrorOfSizeAPI(
  error: SizeAPIErrorResponse,
): StructuredError {
  switch (error.code) {
    case "BlocklistedPackageError":
      return {
        code: "BlocklistedPackageError",
        messages: [
          "The package you were looking for is blocklisted because it failed to build multiple times in the past and further tries aren't likely to succeed.",
          "This can happen if this package wasn't meant to be bundled in a client side application.",
        ],
      };
    case "BuildError":
      return {
        code: "BuildError",
        messages: [error.details],
      };
    case "EntryPointError":
      return {
        code: "EntryPointError",
        messages: [error.message],
      };
    case "InstallError":
      return {
        code: "InstallError",
        messages: [error.message],
      };
    case "MinifyError":
      return {
        code: "MinifyError",
        messages: [error.error.details.originalError],
      };
    case "MissingDependencyError":
      return {
        code: "MissingDependencyError",
        messages: [
          `This package (or this version) uses following modules, but does not specify ${
            error.details.extra.missingModules.length > 1 ? "them" : "it"
          } either as a dependency or a peer dependency`,
          `Missing modules: ${error.details.extra.missingModules.join(", ")}`,
        ],
      };
    case "PackageNotFoundError":
      return {
        code: "PackageNotFoundError",
        messages: [
          "The specified package could not be found. Please check the package name.",
        ],
      };
    case "PackageVersionMismatchError":
      return {
        code: "PackageVersionMismatchError",
        messages: [
          "The package version does not match. Please check dependency compatibility.",
        ],
      };
    case "UnsupportedPackageError":
      return {
        code: "UnsupportedPackageError",
        messages: [
          "This package is currently not supported. Please consider alternative packages.",
        ],
      };
    default:
      return {
        code: "UnknownError",
        messages: [
          "An unexpected error occurred. No detailed information is available.",

          // magic satisfies operator to trigger type error if we forgot to handle a case
          String(error satisfies never),
        ],
      };
  }
}

type ApiSizeResponse = PackageStats | SizeAPIErrorResponse;

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
