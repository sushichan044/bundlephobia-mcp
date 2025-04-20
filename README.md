# bundlephobia-mcp

[![npm version](https://badge.fury.io/js/bundlephobia-mcp.svg)](https://badge.fury.io/js/bundlephobia-mcp)

Allow your AI to consider the bundle size and tree-shakeability of npm packages.

Powered by [bundlephobia.com](https://bundlephobia.com/)

> [!NOTE]
> Support for StreamableHTTPServerTransport will be available in the future.

## Configure SSE server

### JSON config

```json
"bundlephobia": {
  "type": "sse",
  "url": "https://bundlephobia-mcp.sushichan044.workers.dev/mcp"
}
```

### VSCode

```bash
code --add-mcp '{"bundlephobia":{"type":"sse","url":"https://bundlephobia-mcp.sushichan044.workers.dev/mcp"}}'
```

<details>
  <summary>Use stdio server (not recommended)</summary>
   Deno

```json
"bundlephobia": {
  "command": "deno",
  "args": ["run", "--allow-net=bundlephobia.com", "npm:bundlephobia-mcp"]
}
```

npx

```json
"bundlephobia": {
  "command": "npx",
  "args": ["bundlephobia-mcp"]
}
```

</details>
