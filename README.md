# bundlephobia-mcp

[![npm version](https://badge.fury.io/js/bundlephobia-mcp.svg)](https://badge.fury.io/js/bundlephobia-mcp)

Allow your AI to consider the bundle size and tree-shakeability of npm packages.

Powered by [bundlephobia.com](https://bundlephobia.com/)

## Use stdio server

### Deno

```json
  "bundlephobia": {
    "command": "deno",
    "args": ["run", "--allow-net=bundlephobia.com", "npm:bundlephobia-mcp"]
  }
```

### npx

```json
  "bundlephobia": {
    "command": "npx",
    "args": ["bundlephobia-mcp"]
  }
```
