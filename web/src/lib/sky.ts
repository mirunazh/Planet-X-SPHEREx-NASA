// Sky maths: display stretch, coordinate parsing and formatting, the mission grid projection,
// angular separation. Pure functions, unit tested in sky.test.ts.

import type { DisplayHint } from './data';
import type { StringKey } from './strings';

const D2R = Math.PI / 180;

/** The manifest's stretch: t = clip((v - vmin) / (vmax - vmin), 0, 1); out = asinh(t / soft) / asinh(1 / soft). NaN stays NaN. */
export function stretch(v: number, d: Pick<DisplayHint, 'vmin' | 'vmax' | 'soft'>): number {
  if (Number.isNaN(v)) return NaN;
  const t = Math.min(1, Math.max(0, (v - d.vmin) / (d.vmax - d.vmin)));
  return Math.asinh(t / d.soft) / Math.asinh(1 / d.soft);
}

export type ParseResult = { ok: true; ra: number; dec: number } | { ok: false; error: StringKey };

const NUM = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;

/**
 * Accepts decimal degrees ("133.795129 -7.245147", comma allowed between them) and sexagesimal with
 * RA in hours ("08h55m10.831s -07d14m42.53s", "08 55 10.831 -07 14 42.53", "08:55:10.831 -07:14:42.53").
 */
export function parseCoords(input: string): ParseResult {
  const cleaned = input
    .trim()
    .replace(/[−–]/g, '-') // typographic minus signs pasted from papers
    .replace(/[hdms°'"′″:,]/gi, ' ')
    .trim();
  if (!cleaned) return { ok: false, error: 'coordEmpty' };
  const tokens = cleaned.split(/\s+/);
  if (!tokens.every((t) => NUM.test(t))) return { ok: false, error: 'coordUnreadable' };
  const n = tokens.map(Number);

  if (tokens.length === 2) {
    const [ra, dec] = n;
    if (ra < 0 || ra >= 360) return { ok: false, error: 'coordRaRange' };
    if (dec < -90 || dec > 90) return { ok: false, error: 'coordDecRange' };
    return { ok: true, ra, dec };
  }
  if (tokens.length === 6) {
    const [h, rm, rs, , dm, ds] = n;
    const signed = [0, 1, 2, 4, 5].some((i) => /^[+-]/.test(tokens[i]));
    if (signed) return { ok: false, error: 'coordUnreadable' };
    if (h >= 24 || rm >= 60 || rs >= 60) return { ok: false, error: 'coordRaRange' };
    const sign = tokens[3].startsWith('-') ? -1 : 1;
    const dabs = Math.abs(n[3]) + dm / 60 + ds / 3600;
    if (dm >= 60 || ds >= 60 || dabs > 90) return { ok: false, error: 'coordDecRange' };
    return { ok: true, ra: (h + rm / 60 + rs / 3600) * 15, dec: sign * dabs };
  }
  return { ok: false, error: 'coordUnreadable' };
}

function sexa(value: number, decimals: number): [number, number, string] {
  const totalSec = Math.abs(value) * 3600;
  const round = 10 ** decimals;
  let s = Math.round((totalSec % 60) * round) / round;
  let m = Math.floor(totalSec / 60) % 60;
  let d = Math.floor(totalSec / 3600);
  if (s >= 60) { s -= 60; m += 1; }
  if (m >= 60) { m -= 60; d += 1; }
  return [d, m, s.toFixed(decimals).padStart(decimals + 3, '0')];
}

export function formatRa(raDeg: number): string {
  const [h, m, s] = sexa(raDeg / 15, 2);
  return `${String(h % 24).padStart(2, '0')}h${String(m).padStart(2, '0')}m${s}s`;
}

export function formatDec(decDeg: number): string {
  const [d, m, s] = sexa(decDeg, 1);
  return `${decDeg < 0 ? '-' : '+'}${String(d).padStart(2, '0')}d${String(m).padStart(2, '0')}m${s}s`;
}

/** Haversine separation in arcsec. */
export function separationArcsec(ra1: number, dec1: number, ra2: number, dec2: number): number {
  const s = Math.sin(((dec2 - dec1) * D2R) / 2) ** 2 + Math.cos(dec1 * D2R) * Math.cos(dec2 * D2R) * Math.sin(((ra2 - ra1) * D2R) / 2) ** 2;
  return (2 * Math.asin(Math.min(1, Math.sqrt(s)))) / D2R * 3600;
}

/** Offset of (ra, dec) from (ra0, dec0) in arcsec, east and north, on the tangent plane (gnomonic). */
export function tangentOffsetArcsec(ra0: number, dec0: number, ra: number, dec: number): { east: number; north: number } {
  const da = (ra - ra0) * D2R;
  const d0 = dec0 * D2R;
  const d = dec * D2R;
  const cosc = Math.sin(d0) * Math.sin(d) + Math.cos(d0) * Math.cos(d) * Math.cos(da);
  const xi = (Math.cos(d) * Math.sin(da)) / cosc;
  const eta = (Math.cos(d0) * Math.sin(d) - Math.sin(d0) * Math.cos(d) * Math.cos(da)) / cosc;
  return { east: (xi / D2R) * 3600, north: (eta / D2R) * 3600 };
}

/**
 * Sky position to 0-based pixel centre on a mission grid: TAN about (ra0, dec0), CRPIX = 61 (1-based),
 * east left, north up, row index increasing southward.
 */
export function skyToPixel(grid: { ra0: number; dec0: number; scaleArcsec: number; width: number }, ra: number, dec: number): { x: number; y: number } {
  const { east, north } = tangentOffsetArcsec(grid.ra0, grid.dec0, ra, dec);
  const c = (grid.width - 1) / 2;
  return { x: c - east / grid.scaleArcsec, y: c - north / grid.scaleArcsec };
}

export function insideGrid(grid: { width: number; height: number }, p: { x: number; y: number }, marginPx = 0): boolean {
  return p.x >= -0.5 + marginPx && p.y >= -0.5 + marginPx && p.x <= grid.width - 0.5 - marginPx && p.y <= grid.height - 0.5 - marginPx;
}

export type Compass = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

/** 8-point direction of an (east, north) offset; position angle runs from north through east. */
export function compass(east: number, north: number): Compass {
  const pa = (Math.atan2(east, north) / D2R + 360) % 360;
  return (['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const)[Math.round(pa / 45) % 8];
}
