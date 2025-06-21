import { StreamableHTTPTransport } from "@hono/mcp";
import { createServer } from "bundlephobia-mcp";
import { Hono } from "hono";
import { getConnInfo } from "hono/cloudflare-workers";
import { HTTPException } from "hono/http-exception";

type HonoConfig = {
  Bindings: Env;
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

app.use("/mcp", async (c, next) => {
  const info = getConnInfo(c);

  const clientIP = info.remote.address;
  if (clientIP == null) {
    return await next();
  }

  const rateLimiter = c.env.BUNDLEPHOBIA_RATE_LIMITER;
  const { success } = await rateLimiter.limit({ key: clientIP });

  if (!success) {
    throw new HTTPException(429, {
      message: "Rate limit exceeded. Please try again later.",
    });
  }

  await next();
});

app.all("/mcp", async (c) => {
  const transport = new StreamableHTTPTransport();

  await c.get("mcpServer").connect(transport);

  return transport.handleRequest(c);
});

export default app;
