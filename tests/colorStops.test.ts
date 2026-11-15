import { describe, expect, it } from 'vitest';
import { COLOR_STOPS, nearestStop } from '@/lib/sky/colorStops';
import { SPHEREX_FRAMES, SPHEREX_PRESETS, nearestUsableFrame } from '@/lib/sky/surveys';

describe('color stops', () => {
  it('use exactly the frames of the SPHEREx presets, in the same order', () => {
    expect(COLOR_STOPS.map((stop) => stop.frame)).toEqual(SPHEREX_PRESETS.map((preset) => preset.frame));
  });

  it('have unique names and a plain description each', () => {
    const names = COLOR_STOPS.map((stop) => stop.name);
    expect(new Set(names).size).toBe(names.length);
    for (const stop of COLOR_STOPS) {
      expect(stop.name.trim()).not.toBe('');
      expect(stop.detail.trim()).not.toBe('');
    }
  });

  it('sit on usable SPHEREx channels, never on a blank one', () => {
    for (const stop of COLOR_STOPS) {
      expect(SPHEREX_FRAMES[stop.frame].blank).toBe(false);
      expect(nearestUsableFrame(stop.frame)).toBe(stop.frame);
    }
  });
});

describe('nearestStop', () => {
  it('returns the stop itself on a stop frame', () => {
    for (const stop of COLOR_STOPS) expect(nearestStop(stop.frame)).toBe(stop);
  });

  it('picks the closest stop between two stops', () => {
    expect(nearestStop(10).name).toBe('Near red');
    expect(nearestStop(12).name).toBe('Starlight');
    expect(nearestStop(30).name).toBe('Starlight');
    expect(nearestStop(40).name).toBe('Through dust');
    expect(nearestStop(55).name).toBe('Glowing dust');
    expect(nearestStop(72).name).toBe('CO₂ ice');
    expect(nearestStop(86).name).toBe('Hot dust');
    expect(nearestStop(101).name).toBe('Hot dust');
  });

  it('is never farther than any other stop, for every SPHEREx frame', () => {
    for (const { index } of SPHEREX_FRAMES) {
      const distance = Math.abs(nearestStop(index).frame - index);
      const closest = Math.min(...COLOR_STOPS.map((stop) => Math.abs(stop.frame - index)));
      expect(distance).toBe(closest);
    }
  });

  it('breaks a tie in frames by the closer wavelength', () => {
    // Frame 71 (3.935 µm) is 9 frames from both 62 (3.293 µm) and 80 (4.257 µm).
    expect(nearestStop(71).frame).toBe(80);
    // Frame 11 (0.978 µm) is 11 frames from both 0 (0.753 µm) and 22 (1.254 µm).
    expect(nearestStop(11).frame).toBe(0);
    // Frame 85 (4.435 µm) is 5 frames from both 80 (4.257 µm) and 90 (4.600 µm).
    expect(nearestStop(85).frame).toBe(90);
  });

  it('handles frames outside the cube and invalid input', () => {
    expect(nearestStop(-5).frame).toBe(0);
    expect(nearestStop(500).frame).toBe(90);
    expect(nearestStop(Number.NaN).frame).toBe(0);
  });
});
