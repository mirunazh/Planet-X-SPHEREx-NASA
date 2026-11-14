/** Estimated resident bytes: decoded RGBA bitmap plus GPU RGBA texture/mip levels.
 * Browser/network/driver overhead and temporary decoding buffers are not included.
 */
export const MiB = 1024 * 1024;
export const TILE_MEMORY_BUDGET = 128 * MiB;
export const ALLSKY_MEMORY_BUDGET = 64 * MiB;

export function textureBytes(width: number, height: number, mipmaps: boolean): number {
  const bitmapBytes = width * height * 4;
  let gpuBytes = bitmapBytes;
  if (mipmaps) {
    while (width > 1 || height > 1) {
      width = Math.max(1, Math.floor(width / 2));
      height = Math.max(1, Math.floor(height / 2));
      gpuBytes += width * height * 4;
    }
  }
  return bitmapBytes + gpuBytes;
}

export function abortError(): Error {
  return new DOMException('Image request no longer needed', 'AbortError');
}
