# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Model Context Protocol (MCP) server that integrates with bundlephobia.com API to provide npm package bundle size information. The server exposes two main tools:

- `get_npm_package_info` - Get current npm package information (bundle size, tree-shakeability, dependencies)
- `get_npm_package_info_history` - Get historical information for npm package versions

## Development Commands

```bash
# Build the project
pnpm build

# Development with hot reload (Cloudflare Workers)
pnpm dev

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Formatting
pnpm format

# Full CI check (build, lint, format, typecheck)
pnpm check
```

## Architecture

### Core Components

- **`src/index.ts`** - Main MCP server entry point, defines tools and handlers
- **`src/api/`** - Bundlephobia API integration layer
  - `size/index.ts` - Handles `/api/size` endpoint with comprehensive error handling
  - `package-history/index.ts` - Handles `/api/package-history` endpoint
- **`src/mcp/transport/stdio.ts`** - Stdio transport implementation for MCP
- **`src/format.ts`** - Markdown response formatter
- **`src/types.ts`** - TypeScript type definitions with Zod validation

### Build Configuration

The project uses unbuild with three entry points defined in `build.config.ts`:
- Main MCP server
- Stdio transport
- CLI executable

### Monorepo Structure

- Main package provides the MCP server
- `packages/cloudflare/` contains Cloudflare Workers frontend deployment
- Uses pnpm workspace with catalog dependencies

### Error Handling Patterns

The API layer implements comprehensive error handling for bundlephobia API responses:
- Package not found (404)
- Invalid package names
- Rate limiting
- Service unavailable
- Malformed responses

When modifying API integration, ensure error cases are properly handled and formatted for user consumption.

### Response Formatting

All tool responses are formatted as structured Markdown using the `format.ts` utilities. This provides consistent, readable output for AI consumption.

## Technology Stack

- **Runtime**: Node.js 16+
- **Language**: TypeScript (ESNext target)
- **Package Manager**: pnpm
- **HTTP Client**: ofetch
- **Validation**: Zod
- **Build Tool**: unbuild
- **MCP SDK**: @modelcontextprotocol/sdk

## Testing

No test framework is currently configured. When adding tests, consider the API integration patterns and error handling scenarios.