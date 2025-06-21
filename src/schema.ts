import { z } from "zod";

const packageBundleSchema = z.object({
  hasJSModule: z.union([z.string(), z.literal(false)]),
  hasJSNext: z.boolean(),
  hasSideEffects: z.union([z.boolean(), z.array(z.string())]),
  isModuleType: z.boolean(),
});

const packageInfoSchema = z.object({
  description: z.string(),
  name: z.string(),
  repository: z.string(),
  scoped: z.boolean(),
  version: z.string(),
});

const parseTimeInfoSchema = z
  .object({
    baseParseTime: z.number().optional(),
    scriptParseTime: z.number().optional(),
  })
  .nullable();

const assetInfoSchema = z.object({
  gzip: z.number(),
  name: z.string(),
  parse: parseTimeInfoSchema.optional(),
  size: z.number(),
  type: z.string(),
});

const dependencySizeSchema = z.object({
  approximateSize: z.number(),
  name: z.string(),
});

export const packageAssetsSchema = z.object({
  assets: z.array(assetInfoSchema),
  dependencyCount: z.number(),
  dependencySizes: z.array(dependencySizeSchema),
  gzip: z.number(),
  ignoredMissingDependencies: z.array(z.string()).optional(),
  parse: parseTimeInfoSchema.optional(),
  peerDependencies: z.array(z.string()).optional(),
  size: z.number(),
});

export const packageStatsSchema = packageAssetsSchema
  .merge(packageBundleSchema)
  .merge(packageInfoSchema);

export const packageStatsHistorySchema = z.record(
  z.string(),
  z.union([packageStatsSchema, z.record(z.string(), z.never())]),
);
