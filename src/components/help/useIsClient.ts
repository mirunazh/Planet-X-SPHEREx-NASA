import { useSyncExternalStore } from 'react';

const subscribeNothing = () => () => {};

/** False while rendering on the server and during hydration, true afterwards (portals need document.body). */
export function useIsClient(): boolean {
  return useSyncExternalStore(subscribeNothing, () => true, () => false);
}
