import { useSyncExternalStore } from "react";

export const useLocation = () => {
  const location = useSyncExternalStore(
    (callback) => {
      window.addEventListener("popstate", callback);
      return () => window.removeEventListener("popstate", callback);
    },
    () => window.location,
  );

  return location;
};
