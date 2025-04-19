export const Meta = () => {
  // use `preview` mode for preview to avoid indexing
  const isProd = import.meta.env.MODE === "production";

  return <>{!isProd && <meta content="noindex, nofollow" name="robots" />}</>;
};
