import { McpAgent } from "agents/mcp";
import { createServer } from "bundlephobia-mcp";
import { Hono } from "hono";

export class BundlephobiaAgent extends McpAgent {
  server = createServer();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  override async init(): Promise<void> {}
}

const app = new Hono();

app.mount(
  "/sse",
  BundlephobiaAgent.serveSSE("/sse", {
    binding: "BUNDLEPHOBIA_AGENT",
  }).fetch,
  {
    replaceRequest: false,
  },
);

app.mount(
  "/mcp",
  BundlephobiaAgent.serve("/mcp", {
    binding: "BUNDLEPHOBIA_AGENT",
  }).fetch,
  {
    replaceRequest: false,
  },
);

export default app;
