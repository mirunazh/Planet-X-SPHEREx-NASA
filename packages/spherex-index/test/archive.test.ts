// Agreement with the archive and cost per query at the 30 positions of pipeline/index/check_archive.py.
// Offline once that script has run: SPHEREX_ARCHIVE_TRUTH=<its --out dir> npx vitest run test/archive.test.ts
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { expect, it } from "vitest";
import { queryIndex } from "../src/index.js";

const DIR = process.env.SPHEREX_ARCHIVE_TRUTH;
const INDEX = new URL("../../../assets/index/", import.meta.url);
const idOf = (uri: string) => uri.split("/").pop()!.split("_spx_")[0]!.replace("level2_", "");

it.skipIf(!DIR || !existsSync(new URL("meta.json", INDEX)))("30 positions: reader vs live TAP CONTAINS(POINT, poly), and cost", async () => {
  const pts = JSON.parse(readFileSync(`${DIR}/positions.json`, "utf8")) as Array<{ ra: number; dec: number; kind: string }>;
  const files = new Map<string, Uint8Array<ArrayBuffer>>();
  const load = (u: string) => files.get(u) ?? (files.set(u, readFileSync(new URL(u))), files.get(u)!);
  const report = [];
  let compared = 0, agree = 0;
  for (const [k, p] of pts.entries()) {
    // cold query: meta.json + cells, served from disk
    const seen: string[] = [];
    // a fresh baseUrl per position defeats the meta.json cache; the fake "k<n>/" segment is dropped on read
    const fetchImpl = async (u: string) => (seen.push(u.replace(/\/k\d+\//, "/")), new Response(load(seen.at(-1)!)));
    const { exposures, stats } = await queryIndex(p.ra, p.dec, { baseUrl: `${INDEX.href}k${k}/`, fetchImpl });
    const bytes = seen.reduce((a, u) => a + load(u).byteLength, 0), gz = seen.reduce((a, u) => a + gzipSync(load(u)).byteLength, 0);
    // parse + test time with every file already in memory (median of 5)
    const mem = async (u: string) => new Response(load(u));
    const ts: number[] = [];
    for (let i = 0; i < 5; i++) {
      const t0 = performance.now();
      await queryIndex(p.ra, p.dec, { baseUrl: INDEX.href, fetchImpl: mem });
      ts.push(performance.now() - t0);
    }
    ts.sort((a, b) => a - b);
    const row: Record<string, unknown> = { k, ra: p.ra, dec: p.dec, kind: p.kind, n: exposures.length, requests: seen.length,
      cells: stats.cells.length, bytes, gzipBytes: gz, rowsScanned: stats.rowsScanned, parseMs: Number(ts[2]!.toFixed(1)) };
    const tf = `${DIR}/truth_${k}.csv`;
    if (existsSync(tf)) {
      const truth = new Set(readFileSync(tf, "utf8").trim().split("\n").slice(1).filter((l) => l.endsWith(".fits")).map(idOf));
      const mine = new Set(exposures.map((e) => idOf(e.uri)));
      const indexOnly = [...mine].filter((x) => !truth.has(x)), tapOnly = [...truth].filter((x) => !mine.has(x));
      Object.assign(row, { tap: truth.size, indexOnly, tapOnly });
      compared++;
      if (!indexOnly.length && !tapOnly.length) agree++;
    } else row.tap = "not compared (no archive answer)";
    report.push(row);
    console.log(JSON.stringify(row));
  }
  writeFileSync(`${DIR}/compare.json`, JSON.stringify(report, null, 1));
  console.log(`compared ${compared} of ${pts.length}, identical ${agree}`);
  expect(agree).toBe(compared);
  for (const r of report) expect(r.requests as number).toBeLessThanOrEqual(10);
});
