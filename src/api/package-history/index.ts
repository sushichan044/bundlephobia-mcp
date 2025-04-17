import { ofetch } from "ofetch";

import type { PackageStatsHistoryResponse } from "../../types";

export const fetchPackageHistory = async (
  pkgName: string,
): Promise<ApiPackageHistoryResponse> =>
  ofetch<ApiPackageHistoryResponse>("/api/package-history", {
    baseURL: "https://bundlephobia.com",
    query: { package: pkgName },
    retry: 3,
    retryDelay: 500,
    retryStatusCodes: [422, 500],
  });

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

export const isPackageHistoryAPIErrorResponse = (
  response: ApiPackageHistoryResponse,
): response is PackageHistoryAPIErrorResponse => "message" in response;
