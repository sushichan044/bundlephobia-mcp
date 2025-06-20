type Props = {
  installationLink: string;
};

export const InstallToCursor = ({ installationLink }: Props) => {
  return (
    <a href={installationLink} rel="noopener noreferrer" target="_blank">
      <img
        alt="Add bundlephobia MCP server to Cursor"
        height="32"
        src="https://cursor.com/deeplink/mcp-install-dark.svg"
        width="144"
      />
    </a>
  );
};
