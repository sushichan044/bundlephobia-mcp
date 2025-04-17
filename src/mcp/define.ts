import type { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { z, ZodRawShape, ZodTypeAny } from "zod";

type MaybePromise<T> = Promise<T> | T;

export function defineTool<T extends ZodRawShape>(tool: MCPTool<T>) {
  return tool;
}

interface MCPTool<P extends ZodRawShape | undefined = undefined> {
  description: string;
  handler: ToolCallback<P>;
  name: string;
  schema: P;
}

type ToolCallback<P extends ZodRawShape | undefined = undefined> =
  P extends ZodRawShape
    ? (
        parameters: z.objectOutputType<P, ZodTypeAny>,
        extras: RequestHandlerExtra,
      ) => MaybePromise<CallToolResult>
    : (extra: RequestHandlerExtra) => MaybePromise<CallToolResult>;
