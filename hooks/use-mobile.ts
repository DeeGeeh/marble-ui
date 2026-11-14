import { useMediaQuery } from "usehooks-ts"

/** Below the md breakpoint. False on the server, then the real value after mount. */
export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)", { initializeWithValue: false })
}
