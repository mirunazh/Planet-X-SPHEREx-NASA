import { describe, expect, it } from 'vitest';
import { parseCoordinates } from '@/lib/sky/parse';

const M31_RA = (0 + 42 / 60 + 44.3 / 3600) * 15;
const M31_DEC = 41 + 16 / 60 + 9 / 3600;

describe('parseCoordinates', () => {
  it('reads decimal degrees', () => {
    expect(parseCoordinates('10.684 41.269')).toEqual({ ra: 10.684, dec: 41.269 });
    expect(parseCoordinates('10.684, +41.269')).toEqual({ ra: 10.684, dec: 41.269 });
    expect(parseCoordinates('83.82 -5.39')).toEqual({ ra: 83.82, dec: -5.39 });
  });

  it('reads sexagesimal in several notations', () => {
    for (const input of ['00 42 44.3 +41 16 09', '00:42:44.3 +41:16:09', '00h42m44.3s +41d16m09s', '0h42m44.3s 41°16′09″']) {
      const p = parseCoordinates(input);
      expect(p).not.toBeNull();
      expect(p!.ra).toBeCloseTo(M31_RA, 9);
      expect(p!.dec).toBeCloseTo(M31_DEC, 9);
    }
  });

  it('keeps the sign of declinations between 0 and -1 degree', () => {
    expect(parseCoordinates('12 00 00 -00 30 00')!.dec).toBeCloseTo(-0.5, 12);
    expect(parseCoordinates('12 00 00 −00 30 00')!.dec).toBeCloseTo(-0.5, 12);
  });

  it('reads RA given in hours', () => {
    expect(parseCoordinates('0.7123h 41.27')!.ra).toBeCloseTo(10.6845, 9);
  });

  it('rejects names, out-of-range values and malformed input', () => {
    for (const input of ['M31', '400 10', '10 95', '1 2 3', '00 61 00 +41 00 00', '25 00 00 +10 00 00', '', 'drop table']) {
      expect(parseCoordinates(input)).toBeNull();
    }
  });
});
