# bundlephobia-mcp

[![npm version](https://badge.fury.io/js/bundlephobia-mcp.svg)](https://badge.fury.io/js/bundlephobia-mcp)

Allow your AI to take into account the bundle size and tree-shakeability of npm packages.

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
