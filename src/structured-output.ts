import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { ZodObject, ZodTypeAny } from "zod";

import { z } from "zod";

import { packageStatsHistorySchema, packageStatsSchema } from "./schema";

export const structuredErrorSchema = z.object({
  code: z.string(),
  messages: z.array(z.string()),
});

export type StructuredError = z.infer<typeof structuredErrorSchema>;

export const generateStructuredOutput = <TData extends ZodTypeAny>(
  expectedStructure: TData,
) => {
  // we cannot pass z.discriminatedUnion to outputSchema...
  const outputSchema = {
    result: z.union([expectedStructure, structuredErrorSchema]),
    status: z.union([z.literal("success"), z.literal("error")]),
  };

  return {
    schema: outputSchema,

    success: (result: z.infer<TData>): CallToolResult => {
      const structuredContent = {
        result,
        status: "success",
      } satisfies z.infer<ZodObject<typeof outputSchema>>;

      return {
        content: [
          {
            text: JSON.stringify(structuredContent, null, 2),
            type: "text" as const,
          },
        ],
        isError: false,
        structuredContent: structuredContent,
      };
    },

    error: (structuredError: StructuredError) => {
      const structuredContent = {
        result: structuredError,
        status: "error",
      } satisfies z.infer<ZodObject<typeof outputSchema>>;

      return {
        content: [
          {
            text: JSON.stringify(structuredContent, null, 2),
            type: "text" as const,
          },
        ],
        isError: true,
        structuredContent: structuredContent,
      };
    },
  };
};

export const structuredPackageStatsOutput =
  generateStructuredOutput(packageStatsSchema);

export const packageStatsHistoryMCPOutputSchema = generateStructuredOutput(
  packageStatsHistorySchema,
);
