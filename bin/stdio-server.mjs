#!/usr/bin/env node
// @ts-check
import { server } from "../dist/index.mjs";
import { startStdioTransport } from "../dist/mcp/transport/stdio.mjs";

const cleanup = await startStdioTransport(server);

// eslint-disable-next-line no-undef
process.on("SIGINT", async () => {
  await cleanup();
});

// eslint-disable-next-line no-undef
console.error("Bundlephobia MCP server running on stdio");
