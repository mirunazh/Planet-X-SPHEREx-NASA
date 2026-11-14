/**
 * Coordinate formatting whose precision follows the real uncertainty:
 * the last displayed digit is never finer than what the view can resolve.
 */
const pad = (n: number, width = 2) => String(n).padStart(width, '0');
const MINUS = '−';

/** Size of the last displayed RA digit, in seconds of time (1 s of time = 15″ on the equator). */
export function raStepSeconds(uncertaintyArcsec: number): number {
  if (uncertaintyArcsec >= 900) return 60;
  if (uncertaintyArcsec >= 15) return 1;
  if (uncertaintyArcsec >= 1.5) return 0.1;
  return 0.01;
}

/** Size of the last displayed Dec digit, in arcseconds. */
export function decStepArcsec(uncertaintyArcsec: number): number {
  if (uncertaintyArcsec >= 60) return 60;
  if (uncertaintyArcsec >= 1) return 1;
  return 0.1;
}

const decimalsFor = (step: number) => (step >= 1 ? 0 : step >= 0.1 ? 1 : 2);

export function formatRA(raDeg: number, uncertaintyArcsec: number): string {
  const step = raStepSeconds(uncertaintyArcsec);
  const perDay = Math.round(86400 / step);
  const totalSeconds = ((((raDeg % 360) + 360) % 360) / 15) * 3600;
  const units = ((Math.round(totalSeconds / step) % perDay) + perDay) % perDay;
  const seconds = units * step;
  const h = Math.floor(seconds / 3600 + 1e-9);
  const m = Math.floor((seconds - h * 3600) / 60 + 1e-9);
  const s = Math.max(0, seconds - h * 3600 - m * 60);
  if (step >= 60) return `${pad(h)}h ${pad(m)}m`;
  const d = decimalsFor(step);
  return `${pad(h)}h ${pad(m)}m ${s.toFixed(d).padStart(d ? 3 + d : 2, '0')}s`;
}

export function formatDec(decDeg: number, uncertaintyArcsec: number): string {
  const step = decStepArcsec(uncertaintyArcsec);
  const units = Math.round((Math.abs(decDeg) * 3600) / step);
  const sign = decDeg < 0 && units > 0 ? MINUS : '+';
  const arcsec = units * step;
  const d = Math.floor(arcsec / 3600 + 1e-9);
  const m = Math.floor((arcsec - d * 3600) / 60 + 1e-9);
  const s = Math.max(0, arcsec - d * 3600 - m * 60);
  if (step >= 60) return `${sign}${pad(d)}° ${pad(m)}′`;
  const dec = decimalsFor(step);
  return `${sign}${pad(d)}° ${pad(m)}′ ${s.toFixed(dec).padStart(dec ? 3 + dec : 2, '0')}″`;
}

/** Decimal degrees with as many decimals as the uncertainty supports. */
export function formatDegrees(value: number, uncertaintyArcsec: number): string {
  const decimals = uncertaintyArcsec >= 360 ? 1 : uncertaintyArcsec >= 36 ? 2 : uncertaintyArcsec >= 3.6 ? 3 : 4;
  const text = value.toFixed(decimals);
  return value < 0 ? text.replace('-', MINUS) : text;
}

export function formatAngle(deg: number): string {
  if (deg >= 10) return `${deg.toFixed(0)}°`;
  if (deg >= 1) return `${deg.toFixed(1)}°`;
  if (deg >= 1 / 60) return `${(deg * 60).toFixed(1)}′`;
  return `${(deg * 3600).toFixed(1)}″`;
}

export function formatUncertainty(arcsec: number): string {
  if (arcsec >= 3600) return `±${(arcsec / 3600).toFixed(1)}°`;
  if (arcsec >= 60) return `±${(arcsec / 60).toFixed(1)}′`;
  return `±${arcsec.toFixed(arcsec < 1 ? 2 : 1)}″`;
}
