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

const getSSEConfig = (sseEndpoint: string) => ({
  bundlephobia: {
    type: "sse",
    url: sseEndpoint,
  },
});

function App() {
  const baseUrl = useBaseUrl();

  const sseEndpoint = useMemo(() => new URL("/mcp", baseUrl).href, [baseUrl]);
  // for future use
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const httpStreamEndpoint = useMemo(
    () => new URL("/mcp", baseUrl).href,
    [baseUrl],
  );

  const sseConfig = useMemo(() => getSSEConfig(sseEndpoint), [sseEndpoint]);
  const sseConfigSnippet = useMCPConfigSnippet(sseConfig);

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
                  Support for StreamableHTTPServerTransport will be available in
                  the future.
                </span>
              </p>
            </div>
          </article>

          <article className="prose prose-slate">
            <h2>Configuration</h2>
            <div>
              <h3>Edit mcp.json</h3>
              <CodeBlock
                className="not-prose"
                snippet={sseConfigSnippet.json}
              />
            </div>
            <div>
              <h3>Add to VSCode</h3>
              <CodeBlock
                className="not-prose"
                snippet={sseConfigSnippet.vscodeCommand}
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
        </div>
      </div>
    </>
  );
}

export default App;
