import {
  TOOL_DESCRIPTION,
  TOOL_TITLE,
} from "bundlephobia-mcp/internal/constants";

import { useBaseUrl } from "../hooks/useBaseUrl";

export const Meta = () => {
  // use `preview` mode for preview to avoid indexing
  const isProd = import.meta.env.MODE === "production";

  const baseUrl = useBaseUrl();

  return (
    <>
      {!isProd && <meta content="noindex, nofollow" name="robots" />}

      <meta content={TOOL_TITLE} property="og:title" />
      <meta content={TOOL_DESCRIPTION} property="og:description" />
      <meta content="website" property="og:type" />
      <meta content={baseUrl.toString()} property="og:url" />
      <meta content={TOOL_TITLE} property="og:site_name" />
      <meta content="summary" name="twitter:card" />
      <meta content={TOOL_TITLE} name="twitter:title" />
      <meta content={TOOL_DESCRIPTION} name="twitter:description" />
    </>
  );
};
