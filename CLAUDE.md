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

### Cloudflare Workers Remote MCP

The `packages/cloudflare/` directory contains a Cloudflare Workers deployment that provides remote MCP access via HTTP transport. This allows the bundlephobia MCP server to be accessed over the web rather than requiring local installation.

#### Key Components

- **`src/server/index.ts`** - Hono-based HTTP server that exposes MCP via `/mcp` endpoint
- **`wrangler.jsonc`** - Cloudflare Workers configuration with rate limiting bindings
- **`worker-configuration.d.ts`** - TypeScript definitions for Cloudflare bindings (auto-generated)

#### Rate Limiting

The Cloudflare Workers implementation includes IP-based rate limiting to prevent abuse and reduce load on the bundlephobia API:

- 10 requests per minute per IP address
- Uses Cloudflare's built-in Rate Limiting API
- Rate limit exceeded returns 429 status with error message

#### Development Workflow

```bash
# Generate TypeScript bindings (run after wrangler.jsonc changes)
pnpm --filter @repo/cloudflare exec wrangler types

# Development server
pnpm --filter @repo/cloudflare dev

# Type checking
pnpm --filter @repo/cloudflare typecheck

# Linting
pnpm --filter @repo/cloudflare lint

# Formatting
pnpm --filter @repo/cloudflare format
```

**Important**: Always run `pnpm --filter @repo/cloudflare exec wrangler types` after modifying `wrangler.jsonc` to regenerate TypeScript bindings for Cloudflare Workers runtime APIs and custom bindings.

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
