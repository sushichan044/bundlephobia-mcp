import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

/**
 * Start the MCP server with the stdio transport.
 *
 * @param server - The MCP server to start.
 * @returns A cleanup function to stop the MCP server.
 */
export const startStdioTransport = async (server: McpServer) => {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  return async () => {
    await server.close();
    await transport.close();
  };
};
