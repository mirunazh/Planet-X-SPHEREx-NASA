// End-to-end against the real archive (npm run test:e2e, SPHEREX_LIVE=1): SIA list, then buildLiveMission, with
// Node's fetch, exactly the browser chain. Compares Epsilon Indi B and WISE 0855 with the static missions in the repo
// (read-only) and times an ordinary field. Numbers go to stdout; assertions only guard that the chain works.
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";
import { availableGroups, buildLiveMission, exposureId, type LiveGroup } from "../src/live.js";
import { handleObservationsRequest, type Exposure, type ObservationsBody } from "../src/sia.js";
import { S3_HOST } from "../src/s3.js";
import type { Astrometry } from "../src/astrometry.js";

const REPO = fileURLToPath(new URL("../../../assets/missions/", import.meta.url));
const haveRepo = existsSync(REPO + "epsindb/manifest.json");

function meter() {
  const st = { requests: 0, bytes: 0, retries: 0, failures: 0, s3: 0, irsa: 0, s3Active: 0, s3Peak: 0, irsaActive: 0, irsaPeak: 0 };
  const seen = new Set<string>();
  const f = async (url: string, init?: RequestInit): Promise<Response> => {
    const s3 = url.startsWith(S3_HOST);
    const key = url + " " + (new Headers(init?.headers).get("Range") ?? "");
    if (seen.has(key)) st.retries++;
    seen.add(key);
    st.requests++;
    if (s3) { st.s3++; st.s3Peak = Math.max(st.s3Peak, ++st.s3Active); } else { st.irsa++; st.irsaPeak = Math.max(st.irsaPeak, ++st.irsaActive); }
    try {
      const r = await fetch(url, init);
      const buf = await r.arrayBuffer();
      st.bytes += buf.byteLength;
      if (!r.ok) st.failures++;
      return new Response(buf, { status: r.status, statusText: r.statusText, headers: r.headers });
    } catch (e) {
      st.failures++;
      throw e;
    } finally {
      if (s3) st.s3Active--; else st.irsaActive--;
    }
  };
  return { st, f };
}

function peakRss() {
  let peak = process.memoryUsage().rss;
  const t = setInterval(() => { peak = Math.max(peak, process.memoryUsage().rss); }, 100);
  return () => { clearInterval(t); return Math.max(peak, process.memoryUsage().rss); };
}

async function observations(ra: number, dec: number, f: (u: string, i?: RequestInit) => Promise<Response>) {
  const t0 = performance.now();
  const r = await handleObservationsRequest(new URLSearchParams({ ra: String(ra), dec: String(dec) }), f, { timeoutMs: 60_000 });
  const b = r.body as ObservationsBody;
  console.log(`  SIA: HTTP-like status ${r.status} in ${((performance.now() - t0) / 1000).toFixed(1)} s; ` +
    b.collections.map((c) => `${c.collection} ${c.ok ? c.n : "FAILED " + c.error} (${(c.ms / 1000).toFixed(1)} s)`).join(", ") + `; ${b.count} unique, complete=${b.complete}`);
  return b;
}

function f32(path: string) {
  const b = readFileSync(path);
  return new Float32Array(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
}

function compare(a: Float32Array, b: Float32Array) {
  let n = 0, sa = 0, sb = 0, maxd = 0;
  for (let i = 0; i < a.length; i++) if (Number.isFinite(a[i]) && Number.isFinite(b[i])) { n++; sa += a[i]!; sb += b[i]!; }
  const ma = sa / n, mb = sb / n;
  let ab = 0, aa = 0, bb = 0;
  for (let i = 0; i < a.length; i++) {
    if (!(Number.isFinite(a[i]) && Number.isFinite(b[i]))) continue;
    ab += (a[i]! - ma) * (b[i]! - mb); aa += (a[i]! - ma) ** 2; bb += (b[i]! - mb) ** 2;
    maxd = Math.max(maxd, Math.abs(a[i]! - b[i]!));
  }
  return { r: ab / Math.sqrt(aa * bb), maxd };
}

async function run(label: string, ra: number, dec: number, group: LiveGroup | undefined, astrometry?: Astrometry, fallback?: Exposure[]) {
  console.log(`== ${label}`);
  const m = meter();
  const stopMem = peakRss();
  const t0 = performance.now();
  const obs = await observations(ra, dec, m.f);
  const tList = performance.now();
  // IRSA SIA answered 502 for the DR1 collections for minutes at a time on 2026-11-14: when the list is incomplete,
  // build from the static mission's own exposure list so the S3 chain is still exercised and comparable.
  const useFallback = !obs.complete && fallback !== undefined;
  const list = useFallback ? fallback : obs.exposures;
  if (useFallback) console.log(`  SIA incomplete: building from the static mission's ${fallback.length} exposures instead`);
  const groups = availableGroups(list);
  console.log(`  groups available: ${groups.map((g) => `${g.id} (${g.nPasses} passes, ${g.nExposures} exp)`).join(", ")}`);
  const g = group ?? groups[0];
  let first = NaN, last = NaN, n = 0;
  const man = await buildLiveMission({ ra, dec, exposures: list, group: g, astrometry, fetchImpl: m.f, waveCache: new Map(),
    onProgress: (p) => {
      const t = performance.now();
      if (p.exposure && Number.isNaN(first)) first = t;
      last = t;
      n = p.done;
      if (p.done % 20 === 0 || p.done === p.total || p.error) {
        console.log(`  progress ${p.done}/${p.total} at ${((t - t0) / 1000).toFixed(1)} s${p.error ? " FAILED " + p.error.uri.split("/").pop() + ": " + p.error.error : ""}`);
      }
    } });
  const tEnd = performance.now();
  const rss = stopMem();
  const grp = man.groups[0]!;
  console.log(`  timing: SIA ${((tList - t0) / 1000).toFixed(1)} s, first frame ${((first - t0) / 1000).toFixed(1)} s, last frame ${((last - t0) / 1000).toFixed(1)} s ` +
    `(${n} reads), stacking + measuring ${((tEnd - last) / 1000).toFixed(1)} s, total ${((tEnd - t0) / 1000).toFixed(1)} s`);
  console.log(`  network: ${m.st.requests} requests (S3 ${m.st.s3}, IRSA ${m.st.irsa}), ${(m.st.bytes / 1e6).toFixed(1)} MB, retries ${m.st.retries}, ` +
    `failed responses ${m.st.failures}, peak concurrency S3 ${m.st.s3Peak} IRSA ${m.st.irsaPeak}; peak RSS ${(rss / 1e6).toFixed(0)} MB`);
  console.log(`  group ${grp.id}: ${grp.exposures.length} exposures, ${grp.passes.length} passes ` +
    `(${grp.passes.map((p) => p.nExposures).join("/")}), dropped ${grp.droppedPasses.map((d) => d.nExposures).join("/") || "none"}, failed ${grp.failedExposures.length}`);
  expect(m.st.s3Peak).toBeLessThanOrEqual(6);
  expect(m.st.irsaPeak).toBeLessThanOrEqual(2);
  expect(grp.exposures.length).toBeGreaterThan(0);
  return { man, grp, obs };
}

function versusStatic(id: string, grp: Awaited<ReturnType<typeof run>>["grp"], obs: ObservationsBody) {
  const ref = JSON.parse(readFileSync(REPO + id + "/manifest.json", "utf8"));
  const rg = ref.groups[0];
  const staticIds = new Set<string>(rg.exposures.map((e: { id: string }) => e.id));
  const siaIds = new Set(obs.exposures.filter((e) => rg.detectors.includes(e.detector)).map((e) => exposureId(e.uri)));
  const liveIds = new Set(grp.exposures.map((e) => e.id));
  const onlySia = [...siaIds].filter((x) => !staticIds.has(x)), onlyStatic = [...staticIds].filter((x) => !siaIds.has(x));
  console.log(`  exposure lists: static ${staticIds.size}, SIA ${siaIds.size}, read live ${liveIds.size}; only in SIA ${onlySia.length} ${onlySia.slice(0, 4).join(" ")}; ` +
    `only in static ${onlyStatic.length} ${onlyStatic.slice(0, 4).join(" ")}`);
  for (const p of grp.passes) {
    const ids = new Set(grp.exposures.filter((e) => e.pass === p.index).map((e) => e.id));
    const sp = rg.passes.find((q: { index: number }) => {
      const qs = rg.exposures.filter((e: { pass: number }) => e.pass === q.index).map((e: { id: string }) => e.id);
      return qs.length === ids.size && qs.every((x: string) => ids.has(x));
    });
    const line = `  pass ${p.index} (${p.label}, n=${p.nExposures}): live S/N ${p.snr?.toFixed(1)}, ` +
      (p.measured ? `centroid (${p.measured.x.toFixed(3)}, ${p.measured.y.toFixed(3)})` : "no centroid");
    if (!sp) { console.log(line + "; no static pass with the same exposures"); continue; }
    const c = compare(p.stack, f32(`${REPO}${id}/${sp.stack}`));
    const dc = p.measured && sp.measured ? Math.hypot(p.measured.x - sp.measured.x, p.measured.y - sp.measured.y) : NaN;
    console.log(line + `; static pass ${sp.index} S/N ${sp.snr?.toFixed(1)}, ` +
      (sp.measured ? `centroid (${sp.measured.x.toFixed(3)}, ${sp.measured.y.toFixed(3)})` : "no centroid") +
      (sp.blendedWith ? ` [static: blended with ${sp.blendedWith.name}, target not detected]` : "") +
      `; stack r=${c.r.toFixed(6)} max|diff| ${c.maxd.toExponential(2)}; centroid diff ${Number.isFinite(dc) ? dc.toFixed(4) + " px" : "n/a"}`);
  }
  const d = grp.display!, sd = rg.display;
  console.log(`  display live vmin ${d.vmin.toFixed(5)} vmax ${d.vmax.toFixed(5)} soft ${d.soft.toFixed(5)} sigma ${d.sigma.toFixed(5)} | ` +
    `static vmin ${sd.vmin} vmax ${sd.vmax} soft ${sd.soft} sigma ${sd.sigma}`);
}

function staticList(id: string): Exposure[] {
  const ex = JSON.parse(readFileSync(REPO + id + "/manifest.json", "utf8")).groups[0].exposures as Array<{ uri: string; mjd: number; detector: string; release: string }>;
  return ex.map((e) => ({ uri: e.uri, mjd: e.mjd, detector: e.detector, collection: e.release }));
}

function ast(id: string): Astrometry {
  const a = JSON.parse(readFileSync(REPO + id + "/manifest.json", "utf8")).astrometry;
  return { ra: a.ra, dec: a.dec, epoch: a.epoch, pmRaCosDecMasYr: a.pmRaCosDecMasYr, pmDecMasYr: a.pmDecMasYr, parallaxMas: a.parallaxMas, radialVelocityKmS: a.radialVelocityKmS };
}

it.runIf(haveRepo)("a. Epsilon Indi B, D2, vs the static mission", async () => {
  const { grp, obs } = await run("Epsilon Indi B (D2)", 331.09699, -56.80076, { id: "d2", label: "1.1 to 1.65 micron (detector D2)", detectors: ["D2"] }, ast("epsindb"), staticList("epsindb"));
  versusStatic("epsindb", grp, obs);
});

it.runIf(haveRepo)("b. WISE 0855, D5 + D6, vs the static mission", async () => {
  const g = JSON.parse(readFileSync(REPO + "wise0855/manifest.json", "utf8")).grid;
  const { grp, obs } = await run("WISE 0855 (D5 + D6)", g.ra0, g.dec0, { id: "d5d6", label: "3.8 to 5.0 micron (detectors D5 and D6 stacked)", detectors: ["D5", "D6"] }, ast("wise0855"), staticList("wise0855"));
  versusStatic("wise0855", grp, obs);
});

it("c. an ordinary high-latitude field, default group", async () => {
  await run("Field RA 30.0, Dec -40.0 (b about -71 deg)", 30.0, -40.0, undefined);
});
