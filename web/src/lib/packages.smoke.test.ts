// Proves the two linked libraries resolve in vitest (bare specifier, .js imports mapped to .ts).
import { describe, expect, it } from 'vitest';
import { separationArcsec } from 'spherex-core';
import { distancePc } from 'missions-core';

describe('linked packages', () => {
  it('spherex-core: one degree of declination is 3600 arcsec', () => {
    expect(separationArcsec(0, 0, 0, 1)).toBeCloseTo(3600, 9);
  });

  it('missions-core: a parallax of 0.5 arcsec is 2 pc', () => {
    expect(distancePc(0.5)).toBe(2);
  });
});
