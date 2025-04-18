/**
 * `/api/size`
 */
export interface PackageStatsResponse
  extends PackageAssets,
    PackageBundle,
    PackageInfo {}

/**
 * `/api/package-history`
 */
export interface PackageStatsHistoryResponse {
  /**
   * If the package is not found, the response will be an empty object.
   */
  [version: string]: PackageStatsResponse | Record<string, never>;
}

export interface PackageBundle {
  /**
   * `module` field
   */
  hasJSModule: string | false;
  /**
   * `jsnext:main` field
   */
  hasJSNext: boolean;
  /**
   * `sideEffects` field.
   *
   * If missing, it is assumed to be `true`.
   */
  hasSideEffects: boolean | string[];
  /**
   * `module` field
   */
  isModuleType: boolean;
}

interface PackageInfo {
  description: string;
  name: string;
  repository: string;
  scoped: boolean;
  version: string;
}

export interface PackageAssets {
  assets: AssetInfo[];
  dependencyCount: number;
  dependencySizes: DependencySize[];
  gzip: number;
  ignoredMissingDependencies?: string[];
  peerDependencies?: string[];
  size: number;
}

type AssetInfo = {
  gzip: number;
  name: string;
  parse?: Partial<{
    baseParseTime: number;
    scriptParseTime: number;
  }>;
  size: number;
  type: string;
};

type DependencySize = {
  approximateSize: number;
  name: string;
};
