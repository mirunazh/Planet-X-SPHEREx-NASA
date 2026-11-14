import { readFileSync } from "node:fs";

export const FIX = new URL("./fixtures/", import.meta.url);
export const IDS = ["2025W17_4B_0017_1D2", "2025W19_1B_0116_1D6", "2025W19_1B_0181_1D5", "2025W23_2B_0206_1D4"] as const;

export interface Fixture {
  id: string;
  uri: string;
  url: string;
  dataOffset: number;
  mjd: number;
  detector: string;
  waveShape: [number, number];
  pixToSky: Array<{ x: number; y: number; ra: number; dec: number }>;
  skyToPix: Array<{ ra: number; dec: number; x: number; y: number }>;
  wave: Array<{ x: number; y: number; wavelength: number; bandwidth: number }>;
  rows: { y0: number; n: number };
  box: { x0: number; y0: number; w: number; h: number; values: Array<number | null> };
  mission?: {
    id: string; ra0: number; dec0: number; nativeBox: { x0: number; x1: number; y0: number; y1: number };
    background: number; sigma: number; manifestBackground: number; manifestSigma: number; manifestWavelength: number;
  };
}

const bytes = (name: string) => readFileSync(new URL(name, FIX));

export function fixture(id: string) {
  const json = JSON.parse(readFileSync(new URL(`${id}.json`, FIX), "utf8")) as Fixture;
  return { json, head: bytes(`${id}.head.bin`), tail: bytes(`${id}.tail.bin`), rows: bytes(`${id}.rows.bin`) };
}

export function gridF32(id: string): Float32Array {
  const b = bytes(`${id}.grid.f32`);
  return new Float32Array(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); // little-endian host assumed
}

/** fetch() stand-in that serves Range requests from the fixture bytes of the given exposures. */
export function mockFetch(ids: readonly string[], log: string[] = []) {
  const files = new Map(ids.map((id) => { const f = fixture(id); return [f.json.url, f] as const; }));
  return async (url: string, init?: RequestInit): Promise<Response> => {
    const f = files.get(url);
    const range = new Headers(init?.headers).get("Range") ?? "";
    log.push(`${url.split("/").pop()} ${range}`);
    if (!f) return new Response("no such key", { status: 404 });
    const m = /^bytes=(\d*)-(\d*)$/.exec(range);
    if (!m) return new Response("bad range", { status: 400 });
    let body: Uint8Array | null = null;
    if (m[1] === "") body = Number(m[2]) === f.tail.length ? f.tail : null;
    else {
      const a = Number(m[1]), b = Number(m[2]);
      if (b < f.head.length) body = f.head.slice(a, b + 1);
      else {
        const rowStart = f.json.dataOffset + f.json.rows.y0 * 8160;
        if (a >= rowStart && b < rowStart + f.rows.length) body = f.rows.slice(a - rowStart, b - rowStart + 1);
      }
    }
    if (!body) return new Response(`range ${range} not in fixture`, { status: 416 });
    return new Response(body.slice(), { status: 206 });
  };
}
