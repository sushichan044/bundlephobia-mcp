import { StreamableHTTPTransport } from "@hono/mcp";
import { McpAgent } from "agents/mcp";
import { createServer } from "bundlephobia-mcp";
import { Hono } from "hono";

export class BundlephobiaAgent extends McpAgent {
  server = createServer();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  override async init(): Promise<void> {}
}

type HonoConfig = {
  Variables: {
    mcpServer: ReturnType<typeof createServer>;
  };
};

const app = new Hono<HonoConfig>();

app.use(async (c, next) => {
  const mcpServer = createServer();
  c.set("mcpServer", mcpServer);
  await next();
});

app.all("/mcp", async (c) => {
  const transport = new StreamableHTTPTransport();

  await c.get("mcpServer").connect(transport);

  return transport.handleRequest(c);
});

export default app;
