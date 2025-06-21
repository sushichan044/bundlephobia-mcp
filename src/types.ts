/**
 * `/api/size`
 */
export interface PackageStats
  extends PackageAssets,
    PackageBundle,
    PackageInfo {}

/**
 * `/api/package-history`
 */
export interface PackageStatsHistory {
  /**
   * If the package is not found, the response will be an empty object.
   */
  [version: string]: PackageStats | Record<string, never>;
}

interface PackageBundle {
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

interface PackageAssets {
  assets: AssetInfo[];
  dependencyCount: number;
  dependencySizes: DependencySize[];
  gzip: number;
  ignoredMissingDependencies?: string[];
  parse?: ParseTimeInfo | null;
  peerDependencies?: string[];
  size: number;
}

type ParseTimeInfo = Partial<{
  baseParseTime: number;
  scriptParseTime: number;
}>;

type AssetInfo = {
  gzip: number;
  name: string;
  parse?: ParseTimeInfo | null;
  size: number;
  type: string;
};

type DependencySize = {
  approximateSize: number;
  name: string;
};
