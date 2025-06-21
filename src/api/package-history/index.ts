import { ofetch } from "ofetch";

import type { StructuredError } from "../../structured-output";
import type { PackageStatsHistory } from "../../types";

export async function fetchPackageHistory(
  pkgName: string,
): Promise<ApiPackageHistoryResponse> {
  return ofetch<ApiPackageHistoryResponse>("/api/package-history", {
    baseURL: "https://bundlephobia.com",
    query: { package: pkgName },
    retry: 3,
    retryDelay: 500,
    retryStatusCodes: [422, 500],
  });
}

export function isPackageHistoryAPIErrorResponse(
  response: ApiPackageHistoryResponse,
): response is PackageHistoryAPIErrorResponse {
  return "message" in response;
}

export function structuredErrorOfPackageHistoryAPI(
  error: PackageHistoryAPIErrorResponse,
): StructuredError {
  return {
    code: error.type || "PackageHistoryError",
    messages: [error.message],
  };
}

type ApiPackageHistoryResponse =
  | PackageHistoryAPIErrorResponse
  | PackageStatsHistory;

/**
 * 422
 */
type PackageHistoryAPIErrorResponse = {
  message: string;
  type: string;
};
