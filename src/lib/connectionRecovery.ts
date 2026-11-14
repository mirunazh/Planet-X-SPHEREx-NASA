import { tileStore } from '@/components/sky/TileStore';
import { loadPins } from './pins';
import { useNav } from './store';

/** Browser online events are a retry hint, not proof that IRSA is reachable.
 * Only failed work restarts; selections and resident images stay in place.
 */
export function startConnectionRecovery(target: Pick<Window, 'addEventListener' | 'removeEventListener'> = window): () => void {
  const recover = () => {
    tileStore.retryFailed();
    const state = useNav.getState();
    if (state.allskyStatus === 'error') state.retryLayer();
    if (state.dataStatus === 'error') void loadPins();
  };
  target.addEventListener('online', recover);
  return () => target.removeEventListener('online', recover);
}
