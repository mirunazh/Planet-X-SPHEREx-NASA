import { describe, expect, it } from "vitest";
import { FitsIncompleteError, findHdu, num, parseHeader } from "../src/fits.js";
import { wcsFromHeader } from "../src/wcs.js";
import { parseWaveTable, waveAt } from "../src/wave.js";
import { Limiter, readExposureBox, s3Url } from "../src/s3.js";
import { IDS, fixture, mockFetch } from "./helpers.js";

const worst = { sky2pix: 0, pix2sky: 0, wave: 0, bw: 0 };

describe.each(IDS)("golden %s", (id) => {
  const f = fixture(id);
  const { header, dataOffset } = findHdu(f.head, "IMAGE");
  const wcs = wcsFromHeader(header);

  it("IMAGE data offset, MJD and detector exact", () => {
    expect(dataOffset).toBe(f.json.dataOffset);
    expect(num(header, "MJD-AVG")).toBe(f.json.mjd);
    expect(`D${num(header, "DETECTOR")}`).toBe(f.json.detector);
  });

  it("sky to pixel within 0.01 px of astropy all_world2pix", () => {
    for (const p of f.json.skyToPix) {
      const [x, y] = wcs.skyToPixel(p.ra, p.dec);
      const d = Math.hypot(x - p.x, y - p.y);
      worst.sky2pix = Math.max(worst.sky2pix, d);
      expect(d).toBeLessThan(0.01);
    }
  });

  it("pixel to sky within 0.01 arcsec of astropy all_pix2world", () => {
    for (const p of f.json.pixToSky) {
      const [ra, dec] = wcs.pixelToSky(p.x, p.y);
      const d = Math.hypot((ra - p.ra) * Math.cos((p.dec * Math.PI) / 180), dec - p.dec) * 3600;
      worst.pix2sky = Math.max(worst.pix2sky, d);
      expect(d).toBeLessThan(0.01);
    }
  });

  it("wavelength and bandwidth within 1e-6 micron, grid shape from the table", () => {
    const t = parseWaveTable(f.tail);
    expect([t.nx, t.ny]).toEqual(f.json.waveShape);
    for (const p of f.json.wave) {
      const w = waveAt(header, t, p.x, p.y);
      worst.wave = Math.max(worst.wave, Math.abs(w.wavelength - p.wavelength));
      worst.bw = Math.max(worst.bw, Math.abs(w.bandwidth - p.bandwidth));
      expect(Math.abs(w.wavelength - p.wavelength)).toBeLessThan(1e-6);
      expect(Math.abs(w.bandwidth - p.bandwidth)).toBeLessThan(1e-6);
    }
  });

  it("readExposureBox through a mocked S3: box pixels bit-identical, 3 requests", async () => {
    const log: string[] = [];
    const b0 = f.json.box;
    const [ra, dec] = wcs.pixelToSky(b0.x0 + 3, b0.y0 + 3);
    const box = await readExposureBox(f.json.uri, ra, dec, 6, { fetchImpl: mockFetch([id], log), waveCache: new Map(), retries: 0 });
    expect(log.length).toBe(3);
    expect(box.url).toBe(f.json.url);
    expect(box.dataOffset).toBe(f.json.dataOffset);
    expect(box.mjd).toBe(f.json.mjd);
    expect(box.detector).toBe(f.json.detector);
    let n = 0;
    for (let j = 0; j < b0.h; j++) {
      for (let i = 0; i < b0.w; i++) {
        const xi = b0.x0 + i - box.x0, yj = b0.y0 + j - box.y0;
        expect(xi >= 0 && yj >= 0 && xi < box.width && yj < box.height).toBe(true);
        const got = box.pixels[yj * box.width + xi]!;
        const want = b0.values[j * b0.w + i];
        if (want === null) expect(Number.isNaN(got)).toBe(true);
        else expect(Object.is(got, want)).toBe(true);
        n++;
      }
    }
    expect(n).toBe(49);
  });

  if (f.json.mission) {
    it("mission box equals the Python native_box", async () => {
      const m = f.json.mission!;
      const box = await readExposureBox(f.json.uri, m.ra0, m.dec0, 181.5, { fetchImpl: mockFetch([id]), waveCache: new Map(), retries: 0 });
      expect({ x0: box.x0, x1: box.x0 + box.width - 1, y0: box.y0, y1: box.y0 + box.height - 1 }).toEqual(m.nativeBox);
    });
  }
});

describe("fits edge cases", () => {
  it("throws FitsIncompleteError when END is beyond the buffer", () => {
    const f = fixture(IDS[0]);
    expect(() => findHdu(f.head.slice(0, 5 * 2880), "IMAGE")).toThrow(FitsIncompleteError);
  });
  it("parses strings with quotes, logicals, D exponents, HIERARCH", () => {
    const cards = ["SIMPLE  =                    T", "S       = 'it''s  '", "D       =               1.5D+02", "HIERARCH LONG KEY = 7 / c", "END"];
    const buf = new Uint8Array(2880).fill(32);
    cards.forEach((c, i) => { for (let k = 0; k < c.length; k++) buf[i * 80 + k] = c.charCodeAt(k); });
    const h = parseHeader(buf);
    expect(h.cards).toEqual({ SIMPLE: true, S: "it's", D: 150, "LONG KEY": 7 });
    expect(h.end).toBe(2880);
  });
});

describe("s3 helpers", () => {
  it("s3Url strips the archive prefix", () => {
    expect(s3Url("ibe/data/spherex/dr1/level2/x.fits")).toBe("https://nasa-irsa-spherex.s3.us-east-1.amazonaws.com/dr1/level2/x.fits");
    expect(s3Url("https://irsa.ipac.caltech.edu/ibe/data/spherex/qr3/a.fits")).toBe("https://nasa-irsa-spherex.s3.us-east-1.amazonaws.com/qr3/a.fits");
  });
  it("Limiter never exceeds its limit and drops aborted waiters", async () => {
    const lim = new Limiter(2);
    let active = 0, peak = 0;
    const job = () => lim.run(async () => { active++; peak = Math.max(peak, active); await new Promise((r) => setTimeout(r, 5)); active--; });
    const jobs = [job(), job(), job(), job()];
    const ac = new AbortController();
    let ran = false;
    const queued = lim.run(async () => { ran = true; }, ac.signal);
    ac.abort();
    await expect(queued).rejects.toBeDefined();
    await Promise.all(jobs);
    expect(peak).toBe(2);
    expect(ran).toBe(false);
  });
  it("retries a failed range request, then succeeds", async () => {
    const f = fixture(IDS[0]);
    let calls = 0;
    const flaky = async (url: string, init?: RequestInit) => (++calls === 1 ? new Response("busy", { status: 503 }) : mockFetch([IDS[0]])(url, init));
    const { rangeFetch } = await import("../src/s3.js");
    const b = await rangeFetch(f.json.url, "0-99", { fetchImpl: flaky });
    expect(b.length).toBe(100);
    expect(calls).toBe(2);
  });
});

it("report worst golden errors", () => {
  console.log(`worst: sky->pix ${worst.sky2pix.toExponential(2)} px, pix->sky ${worst.pix2sky.toExponential(2)} arcsec, ` +
    `wavelength ${worst.wave.toExponential(2)} um, bandwidth ${worst.bw.toExponential(2)} um`);
});
