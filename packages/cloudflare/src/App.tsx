import {
  TOOL_DESCRIPTION,
  TOOL_TITLE,
} from "bundlephobia-mcp/internal/constants";
import { useMemo } from "react";
import Fa6SolidCircleInfo from "~icons/fa6-solid/circle-info";

import { CodeBlock } from "./components/CodeBlock";
import { Meta } from "./components/Meta";
import { useBaseUrl } from "./hooks/useBaseUrl";
import { useMCPConfigSnippet } from "./hooks/useConfigString";

// https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_configuration-format

const getSSEConfig = (sseEndpoint: string) => ({
  bundlephobia: {
    type: "sse",
    url: sseEndpoint,
  },
});

const getHTTPStreamConfig = (httpStreamEndpoint: string) => ({
  bundlephobia: {
    type: "http",
    url: httpStreamEndpoint,
  },
});

function App() {
  const baseUrl = useBaseUrl();

  const sseEndpoint = useMemo(() => new URL("/sse", baseUrl).href, [baseUrl]);
  const httpStreamEndpoint = useMemo(
    () => new URL("/mcp", baseUrl).href,
    [baseUrl],
  );

  const sseConfig = useMemo(() => getSSEConfig(sseEndpoint), [sseEndpoint]);
  const sseConfigSnippet = useMCPConfigSnippet(sseConfig);

  const httpStreamConfig = useMemo(
    () => getHTTPStreamConfig(httpStreamEndpoint),
    [httpStreamEndpoint],
  );
  const httpStreamConfigSnippet = useMCPConfigSnippet(httpStreamConfig);

  return (
    <>
      <Meta />
      <link
        href={
          // Using `not_found_handling`: single-page-application, so always show this html.
          origin
        }
        rel="canonical"
      />

      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <div className="space-y-4 md:space-y-6">
          <article className="prose prose-slate">
            <h1>{TOOL_TITLE}</h1>
            <p>
              {TOOL_DESCRIPTION} Powered by
              <a
                className="underline hover:brightness-50 transition-all ml-1"
                href="https://bundlephobia.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                bundlephobia.com
              </a>
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-md not-prose">
              <p className="text-blue-700 flex items-center">
                <Fa6SolidCircleInfo className="h-5 w-5 mr-2 text-current" />
                <span>
                  Support for StreamableHTTPServerTransport is implemented. But
                  not available for most MCP Clients, So it is not documented.
                </span>
              </p>
            </div>
          </article>

          <article className="prose prose-slate">
            <h2>Configuration for Streamable HTTP Transport</h2>
            <div>
              <h3>Edit json configuration</h3>
              <CodeBlock
                className="not-prose"
                snippet={httpStreamConfigSnippet.json}
                title="mcp.json"
              />
            </div>
            <div>
              <h3>Add to VSCode</h3>
              <CodeBlock
                className="not-prose"
                snippet={httpStreamConfigSnippet.vscodeCommand}
                title="VSCode CLI"
              />
            </div>
          </article>

          <article className="prose prose-slate">
            <h2>Configuration for SSE Transport</h2>
            <div>
              <h3>Edit json configuration</h3>
              <CodeBlock
                className="not-prose"
                snippet={sseConfigSnippet.json}
                title="mcp.json"
              />
            </div>
            <div>
              <h3>Add to VSCode</h3>
              <CodeBlock
                className="not-prose"
                snippet={sseConfigSnippet.vscodeCommand}
                title="VSCode CLI"
              />
            </div>
          </article>

          <article className="prose prose-slate">
            <h2>Tools</h2>

            <ul className="space-y-4 md:space-y-6">
              <li>
                <h3>get_npm_package_info</h3>
                <p className="text-slate-600">
                  <span>
                    Get information about an npm package with bundlephobia.
                  </span>
                  <br />
                  <span className="font-medium">
                    `name` - The name of the npm package to get information
                    about. (required)
                  </span>
                </p>
              </li>

              <li>
                <h3>get_npm_package_info_history</h3>
                <p className="text-slate-600">
                  <span>
                    Get information about an npm package with bundlephobia over
                    the past versions.
                  </span>
                  <br />
                  <span className="font-medium">
                    `name` - The name of the npm package to get information
                    about. (required)
                  </span>
                </p>
              </li>
            </ul>
          </article>

          <article className="prose prose-slate">
            <h2>Extra Information</h2>
            <a
              className="underline hover:brightness-50 transition-all"
              href="https://github.com/sushichan044/bundlephobia-mcp"
              rel="noopener noreferrer"
              target="_blank"
            >
              Watch the source code on GitHub
            </a>
          </article>
        </div>
      </div>
    </>
  );
}

export default App;
