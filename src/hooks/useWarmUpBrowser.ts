import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

/**
 * Warms up the browser for OAuth flows to improve performance.
 * This preloads the browser so OAuth flows start faster.
 */
export function useWarmUpBrowser() {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
}

