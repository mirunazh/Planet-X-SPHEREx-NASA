import { describe, expect, it } from 'vitest';
import { formatAngle, formatDec, formatDegrees, formatRA, formatUncertainty } from '@/lib/sky/format';

const M31 = { ra: 10.68479292, dec: 41.269065 }; // NED preferred position

describe('precision follows the uncertainty', () => {
  it('formats M31 at SPHEREx native resolution (12.9″)', () => {
    expect(formatRA(M31.ra, 12.9)).toBe('00h 42m 44.4s');
    expect(formatDec(M31.dec, 12.9)).toBe('+41° 16′ 09″');
  });

  it('adds digits when the uncertainty is sub-arcsecond', () => {
    expect(formatRA(M31.ra, 0.8)).toBe('00h 42m 44.35s');
    expect(formatDec(M31.dec, 0.8)).toBe('+41° 16′ 08.6″');
  });

  it('drops digits when zoomed far out', () => {
    expect(formatRA(M31.ra, 2000)).toBe('00h 43m');
    expect(formatDec(M31.dec, 120)).toBe('+41° 16′');
  });

  it('uses a true minus sign and carries rounding correctly', () => {
    expect(formatDec(-28.93617, 5)).toBe('−28° 56′ 10″');
    expect(formatRA(359.99999, 20)).toBe('00h 00m 00s');
    expect(formatDec(-0.00001, 5)).toBe('+00° 00′ 00″');
  });

  it('formats decimal degrees with matching precision', () => {
    expect(formatDegrees(121.17431, 12.9)).toBe('121.174');
    expect(formatDegrees(-21.57331, 0.5)).toBe('−21.5733');
  });
});

describe('angles', () => {
  it('formats fields of view', () => {
    expect(formatAngle(46.3)).toBe('46°');
    expect(formatAngle(2.5)).toBe('2.5°');
    expect(formatAngle(0.5)).toBe('30.0′');
    expect(formatAngle(0.005)).toBe('18.0″');
  });

  it('formats uncertainties', () => {
    expect(formatUncertainty(12.883)).toBe('±12.9″');
    expect(formatUncertainty(90)).toBe('±1.5′');
    expect(formatUncertainty(0.42)).toBe('±0.42″');
  });
});
