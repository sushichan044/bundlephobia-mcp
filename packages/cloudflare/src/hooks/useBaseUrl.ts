import { useMemo } from "react";

import { useLocation } from "./useLocation";

export const useBaseUrl = () => {
  const loc = useLocation();

  return useMemo(() => new URL("/", loc.origin), [loc.origin]);
};
