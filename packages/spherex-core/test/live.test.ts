// Live network tests: npm run test:live (SPHEREX_LIVE=1). Reads one real exposure box from S3 with Node's fetch and
// queries IRSA SIA for Epsilon Indi B.
import { expect, it } from "vitest";
import { readExposureBox } from "../src/s3.js";
import { handleObservationsRequest, type ObservationsBody } from "../src/sia.js";
import { fixture } from "./helpers.js";

it("reads a real exposure box from S3, identical to the fixture", async () => {
  const f = fixture("2025W17_4B_0017_1D2");
  const m = f.json.mission!;
  const t0 = performance.now();
  const box = await readExposureBox(f.json.uri, m.ra0, m.dec0, 181.5, { waveCache: new Map() });
  const ms = performance.now() - t0;
  expect(box.dataOffset).toBe(f.json.dataOffset);
  expect(box.mjd).toBe(f.json.mjd);
  const rows = new DataView(f.rows.buffer, f.rows.byteOffset, f.rows.byteLength);
  let same = 0;
  for (let j = 0; j < box.height; j++) {
    for (let i = 0; i < box.width; i++) {
      const want = rows.getFloat32(((box.y0 - f.json.rows.y0 + j) * 2040 + box.x0 + i) * 4);
      if (Object.is(want, box.pixels[j * box.width + i])) same++;
    }
  }
  console.log(`S3 live: ${box.width} x ${box.height} box, ${(box.bytes / 1e3).toFixed(0)} kB in 3 requests, ${ms.toFixed(0)} ms; ` +
    `${same}/${box.width * box.height} pixels bit-identical to the fixture; wavelength ${box.wavelengthUm.toFixed(5)} um`);
  expect(same).toBe(box.width * box.height);
});

it("SIA returns Epsilon Indi B exposures from at least one collection", async () => {
  const t0 = performance.now();
  const r = await handleObservationsRequest(new URLSearchParams("ra=331.0970&dec=-56.8008"), fetch, { timeoutMs: 60_000 });
  const ms = performance.now() - t0;
  const b = r.body as ObservationsBody;
  console.log(`SIA live: status ${r.status} in ${ms.toFixed(0)} ms; ` +
    (b.collections ?? []).map((c) => `${c.collection} ${c.ok ? c.n : `failed (${c.error})`} ${c.ms} ms`).join("; ") + `; ${b.count} unique`);
  expect(r.status).toBe(200);
  expect(b.collections.some((c) => c.ok && c.n > 0)).toBe(true);
  expect(b.exposures.some((e) => e.detector === "D2")).toBe(true);
});
