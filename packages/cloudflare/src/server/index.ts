import { McpAgent } from "agents/mcp";
import { server, setupServer } from "bundlephobia-mcp";

export class BundlephobiaAgent extends McpAgent {
  server = server;

  // eslint-disable-next-line @typescript-eslint/require-await
  override async init(): Promise<void> {
    setupServer(this.server);
  }
}

export default BundlephobiaAgent.mount("/sse", {
  binding: "BUNDLEPHOBIA_AGENT",
});
