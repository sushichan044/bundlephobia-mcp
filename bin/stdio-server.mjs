#!/usr/bin/env node
// @ts-check
import { createServer } from "../dist/index.mjs";
import { startStdioTransport } from "../dist/mcp/transport/stdio.mjs";

const server = createServer();

const cleanup = await startStdioTransport(server);

// eslint-disable-next-line no-undef
process.on("SIGINT", async () => {
  await cleanup();
});

// eslint-disable-next-line no-undef
console.error("Bundlephobia MCP server running on stdio");
