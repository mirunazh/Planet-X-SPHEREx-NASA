/**
 * Parses typed sky coordinates (the escape hatch next to visual navigation).
 *
 * Accepted (ICRS):
 *   decimal degrees   "10.684 41.269", "10.684, +41.269"
 *   sexagesimal       "00 42 44.3 +41 16 09", "00:42:44.3 +41:16:09"
 *   with units        "00h42m44.3s +41d16m09s", "0h42m44s 41°16′09″"
 *   hours + degrees   "0.7123h 41.27"
 */
export interface ParsedCoordinates {
  ra: number;
  dec: number;
}

const ALLOWED = /^[\d\s.,:+\-hmsd°'′″"]+$/i;

export function parseCoordinates(input: string): ParsedCoordinates | null {
  const s = input.trim().replace(/[−–]/g, '-');
  if (!s || !ALLOWED.test(s)) return null;
  const raInHours = /\d\s*h/i.test(s);
  const tokens = s
    .replace(/[hmsd°'′″":,]/gi, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (tokens.some((t) => !/^[+-]?\d+(\.\d+)?$/.test(t))) return null;
  const n = tokens.map(Number);

  let ra: number;
  let dec: number;
  if (tokens.length === 2) {
    ra = raInHours ? n[0] * 15 : n[0];
    dec = n[1];
  } else if (tokens.length === 4 || tokens.length === 6) {
    const half = tokens.length / 2;
    const raParts = n.slice(0, half);
    const decParts = n.slice(half);
    if (raParts.slice(1).some((v) => v < 0 || v >= 60) || decParts.slice(1).some((v) => v < 0 || v >= 60)) return null;
    if (raParts[0] < 0 || raParts[0] >= 24) return null;
    const negative = tokens[half].startsWith('-');
    const sexa = (parts: number[]) => Math.abs(parts[0]) + (parts[1] ?? 0) / 60 + (parts[2] ?? 0) / 3600;
    ra = sexa(raParts) * 15;
    dec = (negative ? -1 : 1) * sexa(decParts);
  } else {
    return null;
  }

  if (!Number.isFinite(ra) || !Number.isFinite(dec)) return null;
  if (ra < 0 || ra > 360 || dec < -90 || dec > 90) return null;
  return { ra: ra === 360 ? 0 : ra, dec };
}
