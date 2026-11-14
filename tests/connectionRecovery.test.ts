import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { startConnectionRecovery } from '@/lib/connectionRecovery';
import { tileStore } from '@/components/sky/TileStore';
import { loadPins } from '@/lib/pins';
import { useNav } from '@/lib/store';

vi.mock('@/lib/pins', () => ({ loadPins: vi.fn(async () => { useNav.setState({ dataStatus: 'loading' }); }) }));
beforeEach(() => { useNav.setState(useNav.getInitialState()); });
afterEach(() => { vi.restoreAllMocks(); vi.clearAllMocks(); });

describe('connection recovery', () => {
  it('retries failed data and the latest requested image once, without moving the view', () => {
    const events = new EventTarget();
    const retry = vi.spyOn(tileStore, 'retryFailed');
    const stop = startConnectionRecovery(events);
    useNav.getState().setFrame(90);
    useNav.setState({ allskyStatus: 'error', dataStatus: 'error', displayedLayer: { surveyId: 'spherex', frame: 46 } });
    const before = useNav.getState();
    events.dispatchEvent(new Event('online'));
    expect(retry).toHaveBeenCalledOnce();
    expect(loadPins).toHaveBeenCalledOnce();
    expect(useNav.getState()).toMatchObject({ frame: 90, allskyStatus: 'loading', dataStatus: 'loading', center: before.center, displayedLayer: before.displayedLayer });
    expect(useNav.getState().layerRevision).toBe(before.layerRevision + 1);
    events.dispatchEvent(new Event('online'));
    expect(loadPins).toHaveBeenCalledOnce();
    expect(useNav.getState().layerRevision).toBe(before.layerRevision + 1);
    stop();
    events.dispatchEvent(new Event('online'));
    expect(retry).toHaveBeenCalledTimes(2);
  });

  it('leaves healthy and in-flight preview/pin loads alone', () => {
    const events = new EventTarget();
    const stop = startConnectionRecovery(events);
    for (const status of ['loading', 'ready'] as const) {
      useNav.setState({ allskyStatus: status, dataStatus: status });
      const revision = useNav.getState().layerRevision;
      events.dispatchEvent(new Event('online'));
      expect(useNav.getState().layerRevision).toBe(revision);
    }
    expect(loadPins).not.toHaveBeenCalled();
    stop();
  });
});
