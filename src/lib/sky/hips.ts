/**
 * HiPS (IVOA Hierarchical Progressive Surveys) tile addressing and texture mapping.
 */
import type { Survey } from './surveys';

export const ALLSKY_ORDER = 3;
export const ALLSKY_COLUMNS = 27;
export const TILE_SIZE = 512;
/** Size of a HEALPix order-0 pixel, sqrt(4π/12) rad, in degrees. */
export const BASE_PIXEL_DEG = 58.63230142835039;
/** Pixel size of the 64-px Allsky preview tiles, in degrees. */
export const ALLSKY_PIXEL_DEG = BASE_PIXEL_DEG / 8 / 64;

export const dirOf = (ipix: number) => Math.floor(ipix / 10000) * 10000;

/** Cube frame suffix. Frame 0 has no suffix (verified against IRSA). */
export const frameSuffix = (survey: Survey, frame: number) => (survey.isCube && frame > 0 ? `_${frame}` : '');

export const tileUrl = (survey: Survey, order: number, ipix: number, frame: number) =>
  `${survey.baseUrl}/Norder${order}/Dir${dirOf(ipix)}/Npix${ipix}${frameSuffix(survey, frame)}.${survey.ext}`;

export const allskyUrl = (survey: Survey, frame: number) =>
  `${survey.baseUrl}/Norder${ALLSKY_ORDER}/Allsky${frameSuffix(survey, frame)}.${survey.ext}`;

/**
 * Tile pixel orientation. Inside a HEALPix cell, (ne, nw) ∈ [0, 1]² are measured
 * from the south corner. In the tile image, x (left → right) follows nw and
 * y (top → bottom) follows ne. Verified with 2MASS stars on SPHEREx and 2MASS
 * tiles by scripts/verify-hips-orientation.mjs (16/16 stars in both surveys).
 */
export function cellToImage(ne: number, nw: number): { x: number; y: number } {
  return { x: nw, y: ne };
}

/** Texture coordinates for a full tile (texture uploaded with flipY = false, so v = 0 is the top row). */
export function tileUv(ne: number, nw: number): [number, number] {
  const { x, y } = cellToImage(ne, nw);
  return [x, y];
}

/** Texture coordinates inside the Allsky mosaic, inset by half a texel to avoid bleeding between tiles. */
export function allskyUv(tile: number, ne: number, nw: number, width: number, height: number): [number, number] {
  const t = width / ALLSKY_COLUMNS;
  const col = tile % ALLSKY_COLUMNS;
  const row = Math.floor(tile / ALLSKY_COLUMNS);
  const { x, y } = cellToImage(ne, nw);
  return [(col * t + 0.5 + x * (t - 1)) / width, (row * t + 0.5 + y * (t - 1)) / height];
}

/** Pixel inside the Allsky mosaic for a cell position given in integer sub-cell units. */
export function allskyPixel(tile: number, neIndex: number, nwIndex: number, tilePx: number): { x: number; y: number } {
  const col = tile % ALLSKY_COLUMNS;
  const row = Math.floor(tile / ALLSKY_COLUMNS);
  const { x, y } = cellToImage(neIndex, nwIndex);
  return { x: col * tilePx + x, y: row * tilePx + y };
}
