import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { SURVEYS, SURVEY_ORDER, isSurveyId } from '@/lib/sky/surveys';
import { loadPins } from '@/lib/pins';
import { useNav } from '@/lib/store';
import { applyUrlState } from '@/lib/urlState';

const targets = JSON.parse(readFileSync(new URL('../public/data/targets.json', import.meta.url), 'utf8'));
beforeEach(() => useNav.setState({ ...useNav.getInitialState(), anim: [] }));
afterEach(() => vi.unstubAllGlobals());

describe('SPHEREx-only data boundary', () => {
  it('registers and accepts only SPHEREx', () => {
    expect(SURVEY_ORDER).toEqual(['spherex']);
    expect(Object.keys(SURVEYS)).toEqual(['spherex']);
    expect(SURVEYS.spherex.baseUrl).toBe('https://irsa.ipac.caltech.edu/data/hips/SPHEREx/spherex_allsky_cube');
    for (const value of ['unsupported', '', null, undefined]) expect(isSurveyId(value)).toBe(false);
    useNav.getState().setSurvey('unsupported' as never);
    expect(useNav.getState().surveyId).toBe('spherex');
  });

  it('loads the sourced target snapshot without a global discovery catalogue', async () => {
    const fetcher = vi.fn().mockResolvedValue(Response.json(targets));
    vi.stubGlobal('fetch', fetcher);
    await loadPins();
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher).toHaveBeenCalledWith('/data/targets.json');
    const state = useNav.getState();
    expect(state.dataStatus).toBe('ready');
    expect(state.hosts).toEqual([]);
    expect(state.targets).toHaveLength(targets.targets.length);
    expect(state.targets.find((p) => p.id === 'm101')?.source?.service).toContain('NED');
  });

  it('keeps old unsupported survey links on SPHEREx while preserving coordinates and wavelength', () => {
    vi.stubGlobal('window', {});
    applyUrlState('ra=210.80227&dec=54.34895&survey=unsupported&f=90');
    expect(useNav.getState()).toMatchObject({ surveyId: 'spherex', frame: 90, origin: 'deeplink' });
  });
});
