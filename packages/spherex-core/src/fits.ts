/** FITS header parsing over 2880-byte blocks (headers only; no data decoding beyond what callers do). */

export const BLOCK = 2880;
const CARD = 80;

export type FitsValue = string | number | boolean | null;

export interface FitsHeader {
  /** Keyword to value. HIERARCH keys are stored without the "HIERARCH " prefix. First occurrence wins. */
  cards: Record<string, FitsValue>;
  /** HISTORY card texts, in order. */
  history: string[];
  /** Byte offset of the first header block in the buffer. */
  start: number;
  /** Byte offset just past the block holding END (where this HDU's data starts). */
  end: number;
}

/** Thrown when END is not inside the buffer: the caller fetches more bytes and retries. */
export class FitsIncompleteError extends Error {
  constructor(public readonly needAtLeast: number) {
    super(`FITS header END not found within the buffer; fetch at least ${needAtLeast} bytes and retry`);
    this.name = "FitsIncompleteError";
  }
}

function bytesOf(buf: ArrayBuffer | Uint8Array): Uint8Array {
  return buf instanceof Uint8Array ? buf : new Uint8Array(buf);
}

function ascii(b: Uint8Array, from: number, to: number): string {
  let s = "";
  for (let i = from; i < to; i++) s += String.fromCharCode(b[i]!);
  return s;
}

function parseValue(raw: string): FitsValue {
  const t = raw.trimStart();
  if (t.startsWith("'")) {
    // FITS string: '' is an escaped quote; trailing spaces are not significant.
    let out = "";
    for (let i = 1; i < t.length; i++) {
      if (t[i] === "'") {
        if (t[i + 1] === "'") { out += "'"; i++; continue; }
        break;
      }
      out += t[i];
    }
    return out.trimEnd();
  }
  const v = t.split("/")[0]!.trim();
  if (v === "") return null;
  if (v === "T") return true;
  if (v === "F") return false;
  const n = Number(v.replace(/[dD]/, "E"));
  return Number.isFinite(n) ? n : v;
}

/** Parse one header starting at byte `start` (a block boundary). Throws FitsIncompleteError if END is not in `buf`. */
export function parseHeader(buf: ArrayBuffer | Uint8Array, start = 0): FitsHeader {
  const b = bytesOf(buf);
  const cards: Record<string, FitsValue> = {};
  const history: string[] = [];
  for (let off = start; off + BLOCK <= b.length; off += BLOCK) {
    for (let c = off; c < off + BLOCK; c += CARD) {
      const card = ascii(b, c, c + CARD);
      const key = card.slice(0, 8).trimEnd();
      if (key === "END") return { cards, history, start, end: off + BLOCK };
      if (key === "HISTORY") { history.push(card.slice(8).trim()); continue; }
      if (key === "HIERARCH") {
        const eq = card.indexOf("=");
        if (eq > 0) {
          const k = card.slice(9, eq).trim();
          if (!(k in cards)) cards[k] = parseValue(card.slice(eq + 1));
        }
        continue;
      }
      if (key === "" || key === "COMMENT" || card.slice(8, 10) !== "= ") continue;
      if (!(key in cards)) cards[key] = parseValue(card.slice(10));
    }
  }
  throw new FitsIncompleteError(Math.ceil((b.length + 1) / BLOCK) * BLOCK + 4 * BLOCK);
}

/** Size in bytes of an HDU's data, padded to whole blocks. */
export function dataSize(h: FitsHeader): number {
  const c = h.cards;
  const naxis = Number(c.NAXIS ?? 0);
  if (naxis === 0) return 0;
  let n = 1;
  for (let i = 1; i <= naxis; i++) n *= Number(c[`NAXIS${i}`] ?? 0);
  const bytes = (Math.abs(Number(c.BITPIX)) / 8) * Number(c.GCOUNT ?? 1) * (Number(c.PCOUNT ?? 0) + n);
  return Math.ceil(bytes / BLOCK) * BLOCK;
}

/** Walk HDUs from byte 0 until EXTNAME matches; returns its header and data offset (= header end). */
export function findHdu(buf: ArrayBuffer | Uint8Array, extname = "IMAGE"): { header: FitsHeader; dataOffset: number } {
  let off = 0;
  for (;;) {
    const h = parseHeader(buf, off);
    if (h.cards.EXTNAME === extname) return { header: h, dataOffset: h.end };
    off = h.end + dataSize(h);
    // ponytail: assumes the wanted HDU sits within the fetched prefix; true for SPHEREx (PRIMARY has no data).
  }
}

/** Find the WCS-WAVE style BINTABLE header inside a file suffix (headers start on 2880-byte boundaries of the file;
 *  the suffix is a whole number of blocks long, so they also start on boundaries of the suffix). */
export function findTableInSuffix(buf: ArrayBuffer | Uint8Array, extname: string): FitsHeader {
  const b = bytesOf(buf);
  for (let s = 0; s + BLOCK <= b.length; s += BLOCK) {
    if (ascii(b, s, s + 9) !== "XTENSION=") continue;
    const h = parseHeader(b, s);
    if (h.cards.EXTNAME === extname) return h;
  }
  throw new Error(`${extname} header not found in the ${b.length}-byte suffix`);
}

export function num(h: FitsHeader, key: string, fallback?: number): number {
  const v = h.cards[key];
  if (typeof v === "number") return v;
  if (fallback !== undefined) return fallback;
  throw new Error(`FITS keyword ${key} missing or not numeric`);
}
