import type { z } from "zod";

import { describe, expectTypeOf, test } from "vitest";

import type { packageStatsHistorySchema, packageStatsSchema } from "./schema";
import type { PackageStats, PackageStatsHistory } from "./types";

describe("Equality between types and zod schemas", () => {
  test("Zod schema packageStatsSchema should be equal to type PackageStats", () => {
    expectTypeOf<
      z.infer<typeof packageStatsSchema>
    >().toEqualTypeOf<PackageStats>();
  });

  test("Zod schema packageStatsHistorySchema should be equal to type PackageStatsHistory", () => {
    expectTypeOf<
      z.infer<typeof packageStatsHistorySchema>
    >().toEqualTypeOf<PackageStatsHistory>();
  });
});
