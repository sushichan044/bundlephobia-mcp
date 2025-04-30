import { McpAgent } from "agents/mcp";
import { server, setupServer } from "bundlephobia-mcp";
import { Hono } from "hono";

export class BundlephobiaAgent extends McpAgent {
  server = server;

  // eslint-disable-next-line @typescript-eslint/require-await
  override async init(): Promise<void> {
    setupServer(this.server);
  }
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
