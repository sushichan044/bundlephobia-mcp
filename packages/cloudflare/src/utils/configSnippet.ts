/**
 * Returns the MCP config as a json snippet or a vscode command to add the config to the current workspace.
 *
 * @param name The name of the MCP config.
 * @param rawConfig The MCP config as a json object without the name.
 */
export const createMCPConfigSnippet = (
  name: string,
  rawConfig: Record<string, unknown>,
) => {
  const jsonWithName = {
    [name]: rawConfig,
  };

  const prettyJSON = JSON.stringify(jsonWithName, null, 2);
  const vscodeCommand = `code --add-mcp '${JSON.stringify(jsonWithName)}'`;
  const cursorInstallLink = buildCursorInstallLink(name, rawConfig);

  return {
    cursorInstallLink,
    json: prettyJSON,
    vscodeCommand,
  };
};

/**
 * Builds a cursor install link for the MCP config.
 *
 * @param name The name of the MCP config.
 * @param rawConfigJSON The MCP config as a json object without the name.
 * @returns A link to install the MCP config in Cursor.
 *
 * @see {@link https://docs.cursor.com/deeplinks#mcp}
 */
const buildCursorInstallLink = (
  name: string,
  rawConfigJSON: Record<string, unknown>,
) => {
  const base64Config = btoa(JSON.stringify(rawConfigJSON));
  return `cursor://anysphere.cursor-deeplink/mcp/install?name=${name}&config=${base64Config}`;
};
