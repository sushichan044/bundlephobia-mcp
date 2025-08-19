# Claude Code Integration

This guide explains how to add the Bundlephobia MCP server to your Claude Code configuration.

## Prerequisites

- Claude Code installed and configured
- Node.js runtime for MCP server execution

## Installation and Setup

### 1. Build the MCP Server

First, build the bundlephobia-mcp server:

```bash
pnpm build
```

This creates the necessary build artifacts in the `dist/` directory.

### 2. Configure Claude Code

Add the following configuration to your Claude Code MCP settings:

#### Option A: Local Development Setup

For local development with the built server:

```json
{
  "mcpServers": {
    "bundlephobia": {
      "command": "node",
      "args": ["/path/to/bundlephobia-mcp/dist/index.js"],
      "env": {}
    }
  }
}
```

#### Option B: Global Installation (Recommended)

If you've published the package or want to use it globally:

```json
{
  "mcpServers": {
    "bundlephobia": {
      "command": "bunx",
      "args": ["bundlephobia-mcp"],
      "env": {}
    }
  }
}
```

### 3. Configuration File Location

The MCP configuration should be added to your Claude Code settings file, typically located at:

- macOS: `~/.config/claude/mcp_settings.json`
- Linux: `~/.config/claude/mcp_settings.json`
- Windows: `%APPDATA%\claude\mcp_settings.json`

## Available Tools

Once configured, the following tools will be available in Claude Code:

### `get_npm_package_info`

Get current bundle size information for an npm package.

**Parameters:**
- `name` (required): The name of the npm package

**Example usage:**
```
Get bundle size information for the "react" package
```

### `get_npm_package_info_history`

Get historical bundle size information for all versions of an npm package.

**Parameters:**
- `name` (required): The name of the npm package

**Example usage:**
```
Show me the bundle size history for "lodash"
```

## Example Usage in Claude Code

After configuration, you can use natural language to interact with the bundlephobia tools:

```
What's the bundle size of the latest version of @tanstack/react-query?
```

```
Show me the bundle size history for moment vs dayjs
```

```
Compare the tree-shakeability of lodash and lodash-es
```

## Troubleshooting

### Server Not Starting

1. Verify the path to the built server is correct
2. Ensure Node.js is installed and accessible
3. Check that the build artifacts exist in `dist/`

### Permission Issues

Ensure the MCP server binary has execute permissions:

```bash
chmod +x dist/index.js
```

### API Rate Limiting

The bundlephobia API may rate limit requests. If you encounter rate limiting, wait a few moments before making additional requests.

## Advanced Configuration

### Custom API Endpoints

The server uses the official bundlephobia.com API by default. If you need to use a custom endpoint, you can set environment variables:

```json
{
  "mcpServers": {
    "bundlephobia": {
      "command": "node",
      "args": ["/path/to/bundlephobia-mcp/dist/index.js"],
      "env": {
        "BUNDLEPHOBIA_API_BASE": "https://your-custom-api.com"
      }
    }
  }
}
```

### Logging

To enable debug logging, add the following environment variable:

```json
{
  "mcpServers": {
    "bundlephobia": {
      "command": "node",
      "args": ["/path/to/bundlephobia-mcp/dist/index.js"],
      "env": {
        "DEBUG": "bundlephobia-mcp"
      }
    }
  }
}
```

## Contributing

If you encounter issues with the Claude Code integration, please report them in the [GitHub repository](https://github.com/sushichan044/bundlephobia-mcp/issues).