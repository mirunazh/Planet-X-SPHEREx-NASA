import { afterEach, describe, expect, it, vi } from 'vitest';
import { markIntroPending, markIntroSeen, shouldShowIntro } from '@/lib/ui';

function memoryStorage(): Storage {
  const data = new Map<string, string>();
  return {
    get length() { return data.size; },
    clear: () => data.clear(),
    getItem: (key) => data.get(key) ?? null,
    key: (index) => [...data.keys()][index] ?? null,
    removeItem: (key) => { data.delete(key); },
    setItem: (key, value) => { data.set(key, String(value)); },
  };
}

function browser(search: string, storage = { local: memoryStorage(), session: memoryStorage() }) {
  vi.stubGlobal('window', { location: { search }, localStorage: storage.local, sessionStorage: storage.session });
  return storage;
}

afterEach(() => vi.unstubAllGlobals());

describe('when the Solar System intro shows', () => {
  it('shows on a first visit and not after it has been seen', () => {
    browser('');
    expect(shouldShowIntro()).toBe(true);
    markIntroSeen();
    expect(shouldShowIntro()).toBe(false);
  });

  it('skips deep links into a view, unless ?intro=1 asks for it', () => {
    browser('?ra=10.68&dec=41.27');
    expect(shouldShowIntro()).toBe(false);
    browser('?ra=10.68&dec=41.27&intro=1');
    expect(shouldShowIntro()).toBe(true);
  });

  it('shows again after a reload in the middle of the intro, then not once it has ended', () => {
    const storage = browser('');
    markIntroPending();
    // The sky page has already written its start view into the address bar.
    browser('?ra=266.40499&dec=-28.93617&mode=sky&fov=60', storage);
    expect(shouldShowIntro()).toBe(true);
    markIntroSeen();
    expect(shouldShowIntro()).toBe(false);
  });

  it('never throws when storage is blocked', () => {
    const blocked = { getItem: () => { throw new Error('blocked'); }, setItem: () => { throw new Error('blocked'); }, removeItem: () => { throw new Error('blocked'); } };
    vi.stubGlobal('window', { location: { search: '' }, localStorage: blocked, sessionStorage: blocked });
    expect(() => markIntroPending()).not.toThrow();
    expect(() => markIntroSeen()).not.toThrow();
    expect(shouldShowIntro()).toBe(false);
  });
});
