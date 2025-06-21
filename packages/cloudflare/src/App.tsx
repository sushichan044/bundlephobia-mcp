import {
  TOOL_DESCRIPTION,
  TOOL_TITLE,
} from "bundlephobia-mcp/internal/constants";
import { useMemo } from "react";

import { CodeBlock } from "./components/CodeBlock";
import { InstallToCursor } from "./components/InstallToCursor";
import { Meta } from "./components/Meta";
import { useBaseUrl } from "./hooks/useBaseUrl";
import { createMCPConfigSnippet } from "./utils/configSnippet";

const MCP_CONFIG_SERVER_NAME = "bundlephobia";

function App() {
  const baseUrl = useBaseUrl();

  const httpStreamEndpoint = useMemo(
    () => new URL("/mcp", baseUrl).href,
    [baseUrl],
  );

  const httpStreamConfigSnippet = createMCPConfigSnippet(
    MCP_CONFIG_SERVER_NAME,
    {
      type: "http",
      url: httpStreamEndpoint,
    },
  );

  const npxStdioSnippet = createMCPConfigSnippet(MCP_CONFIG_SERVER_NAME, {
    args: ["bundlephobia-mcp"],
    command: "npx",
    type: "stdio",
  });

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
              <h3>Add to Cursor</h3>
              <InstallToCursor
                installationLink={httpStreamConfigSnippet.cursorInstallLink}
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

          <hr className="prose prose-slate" />

          <article className="prose prose-slate">
            <h2>Configuration for Stdio Transport</h2>
            <div>
              <h3>Edit json configuration</h3>
              <CodeBlock
                className="not-prose"
                snippet={npxStdioSnippet.json}
                title="mcp.json"
              />
            </div>
            <div>
              <h3>Add to Cursor</h3>
              <InstallToCursor
                installationLink={npxStdioSnippet.cursorInstallLink}
              />
            </div>
            <div>
              <h3>Add to VSCode</h3>
              <CodeBlock
                className="not-prose"
                snippet={npxStdioSnippet.vscodeCommand}
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
