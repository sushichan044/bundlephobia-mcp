import { useSyncExternalStore } from "react";

export const useBaseUrl = () => {
  const url = useSyncExternalStore(
    (callback) => {
      window.addEventListener("popstate", callback);
      return () => window.removeEventListener("popstate", callback);
    },
    () => new URL("/", window.location.origin).toString(),
    () => import.meta.env.BASE_URL,
  );

  return url;
};
