import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { ZodTypeAny } from "zod";

import { z } from "zod";

import { packageStatsHistorySchema, packageStatsSchema } from "./schema";

const structuredErrorSchema = z.object({
  code: z.string(),
  messages: z.array(z.string()),
});

export type StructuredError = z.infer<typeof structuredErrorSchema>;

const createStructuredOutput = <TData extends ZodTypeAny>(
  dataSchema: TData,
) => {
  const outputSchema = {
    error: structuredErrorSchema.optional(),
    isError: z.boolean(),
    result: dataSchema.optional(),
  };

  return {
    schema: outputSchema,

    success: (result: z.infer<TData>): CallToolResult => {
      const isError = false;
      const structuredContent = {
        error: undefined,
        isError,
        result,
      } satisfies z.infer<z.ZodObject<typeof outputSchema>>;

      return {
        content: [
          {
            text: JSON.stringify(structuredContent),
            type: "text",
          },
        ],
        isError,
        structuredContent,
      };
    },

    error: (structuredError: StructuredError): CallToolResult => {
      const isError = true;
      const structuredContent = {
        error: structuredError,
        isError,
        result: undefined,
      } satisfies z.infer<z.ZodObject<typeof outputSchema>>;

      return {
        content: [
          {
            text: JSON.stringify(structuredContent),
            type: "text",
          },
        ],
        isError,
        structuredContent,
      };
    },
  };
};

export const structuredPackageStatsOutput =
  createStructuredOutput(packageStatsSchema);

export const structuredPackageStatsHistoryOutput = createStructuredOutput(
  packageStatsHistorySchema,
);
