import { useMemo } from "react";

/**
 * Returns the MCP config as a json snippet or a vscode command to add the config to the current workspace.
 * @param configJson The MCP config as a json object.
 */
export const useMCPConfigSnippet = (configJson: Record<string, unknown>) => {
  const json = useMemo(() => {
    return JSON.stringify(configJson, null, 2);
  }, [configJson]);

  const vscodeCommand = useMemo(() => {
    return `code --add-mcp '${JSON.stringify(configJson)}'`;
  }, [configJson]);

  return {
    json,
    vscodeCommand,
  };
};
