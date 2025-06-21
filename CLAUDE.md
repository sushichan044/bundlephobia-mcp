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

# Run tests
pnpm test

# Run tests once
pnpm test:run

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
- **`src/structured-output.ts`** - Structured output formatter for MCP responses
- **`src/types.ts`** - TypeScript type definitions with Zod validation

### Build Configuration

The project uses unbuild with three entry points defined in `build.config.ts`:

- Main MCP server (`src/index.ts`)
- Stdio transport (`src/mcp/transport/stdio.ts`)
- Constants (`src/constants.ts`)

### Monorepo Structure

- Main package provides the MCP server
- `packages/cloudflare/` contains Cloudflare Workers frontend deployment
- Uses pnpm workspace with catalog dependencies

### Cloudflare Workers Frontend

The `packages/cloudflare/` directory contains a React-based frontend application that provides a web interface for the bundlephobia MCP server. This is a client-side application that demonstrates MCP usage.

#### Key Components

- **`src/main.tsx`** - React application entry point
- **`src/App.tsx`** - Main application component
- **`src/server/index.ts`** - MCP server integration
- **`src/components/`** - React components for the UI
- **`wrangler.jsonc`** - Cloudflare Workers configuration for deployment
- **`worker-configuration.d.ts`** - TypeScript definitions for Cloudflare bindings (auto-generated)

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

All tool responses are formatted as structured output using the `structured-output.ts` utilities. This provides consistent, readable output for AI consumption.

## Technology Stack

- **Runtime**: Node.js 22
- **Language**: TypeScript (ESNext target)
- **Package Manager**: pnpm
- **HTTP Client**: ofetch
- **Validation**: Zod v3
- **Build Tool**: unbuild
- **MCP SDK**: @modelcontextprotocol/sdk

## Testing

The project uses Vitest as the test framework. Test files should be placed alongside source files or in dedicated test directories.

Available test commands:

- `pnpm test` - Run tests in watch mode
- `pnpm test:run` - Run tests once

Consider the API integration patterns and error handling scenarios when writing tests.
