import { describe, it, expect } from 'vitest';
import { comparisonUrl, cropPixels, initialCropSize, navigatorUrl, parseRegion } from '@/lib/comparison/region';
import { useNav } from '@/lib/store';
import { radecToVec } from '@/lib/sky/coords';
import { viewQuery } from '@/lib/urlState';
import { cancelAnimations, runAnimations } from '@/lib/navigation';

describe('comparison region', () => {
  it('starts inside the narrower visible field, bounded by 0.5 and 10 arcmin', () => {
    expect(initialCropSize(60, 2)).toBe(10);
    expect(initialCropSize(0.05, 2)).toBeCloseTo(3);
    expect(initialCropSize(0.05, 0.5)).toBeCloseTo(1.5);
    expect(initialCropSize(0.001, 1)).toBe(0.5);
    expect(cropPixels(3, 0.05, 800)).toBeCloseTo(800);
  });
  it('accepts poles and RA zero while rejecting invalid/missing coordinates', () => {
    expect(parseRegion(new URLSearchParams('ra=0&dec=90&size=30'))).toEqual({ ra: 0, dec: 90, size: 30 });
    for (const query of ['ra=360&dec=0&size=10', 'ra=NaN&dec=0&size=10', 'ra=&dec=0&size=10', 'ra=0&dec=91&size=10', 'ra=0&dec=0&size=0.4']) expect(parseRegion(new URLSearchParams(query))).toBeNull();
  });
  it('saves the current view rather than selected or locked target coordinates', () => {
    const state = { ...useNav.getState(), center: radecToVec(359.99, -82), fov: 0.05 };
    const url = new URL(comparisonUrl(state, 2.5), 'https://example.test');
    expect(Number(url.searchParams.get('ra'))).toBeCloseTo(359.99);
    expect(navigatorUrl(url.searchParams)).toBe(`/?${viewQuery(state)}`);
  });
  it('never trusts a return URL as a destination', () => {
    expect(navigatorUrl(new URLSearchParams('return=https://evil.example'))).toBe('/');
  });
  it('preserves the captured position when leaving during a flight', () => {
    const previous = useNav.getState();
    useNav.setState({ center: radecToVec(10, 20), busy: true, anim: [{ duration: 1000, update: () => useNav.setState({ center: radecToVec(100, 40) }) }] });
    cancelAnimations();
    const url = comparisonUrl(useNav.getState(), 10);
    runAnimations(5000);
    expect(comparisonUrl(useNav.getState(), 10)).toBe(url);
    useNav.setState(previous);
  });
});
