import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import { ofetch } from "ofetch";

import type { PackageStatsHistoryResponse } from "../../types";

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

export function errorContentFromPackageHistoryAPIErrorResponse(
  error: PackageHistoryAPIErrorResponse,
): CallToolResult {
  return {
    content: [
      {
        text: [
          "# ❌ Error Occurred",
          "",
          "Failed to fetch package history.",
          "",
          "## Error Details",
          error.message,
        ].join("\n"),
        type: "text",
      },
    ],
    isError: true,
  };
}

type ApiPackageHistoryResponse =
  | PackageHistoryAPIErrorResponse
  | PackageStatsHistoryResponse;

/**
 * 422
 */
type PackageHistoryAPIErrorResponse = {
  message: string;
  type: string;
};
