// Truth at six positions: the reader on the built index (assets/index) against the exposure lists the static
// missions were built from (assets/missions/*/manifest.json) and against the live e2e run at RA 30, Dec -40.
// Optional exact check against the TAP CSVs the Python build used: SPHEREX_TAP_CACHE=<dir>[:<dir>...].
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { type Exposure, queryIndex } from "../src/index.js";

const INDEX = new URL("../../../assets/index/", import.meta.url);
const MISSIONS = new URL("../../../assets/missions/", import.meta.url);
const HAVE = existsSync(new URL("meta.json", INDEX));
const fetchImpl = async (u: string) => new Response(readFileSync(new URL(u)));
const at = (ra: number, dec: number) => queryIndex(ra, dec, { baseUrl: INDEX.href, fetchImpl });
const idOf = (uri: string) => uri.split("/").pop()!.split("_spx_")[0]!.replace("level2_", "");

// the TAP positions pipeline/build_missions.py queried (TARGETS[...]["tap"]); the grid centres differ slightly
const TAP_POS: Record<string, [number, number]> = {
  wise0855: [133.7683, -7.2429], epsindb: [331.096356, -56.8006], barnard: [269.4463, 4.768],
  rwaur: [76.956089, 30.401133], rdra: [248.167242, 66.755023],
};

function tapCsv(name: string): string[] | null {
  for (const d of (process.env.SPHEREX_TAP_CACHE ?? "").split(":").filter(Boolean)) {
    const p = `${d.replace(/\/$/, "")}/${name}`;
    if (existsSync(p)) return readFileSync(p, "utf8").trim().split("\n").slice(1).map((l) => l.split(",")[0]!.split("ibe/data/spherex/")[1]!);
  }
  return null;
}

describe.skipIf(!HAVE)("truth at six positions", () => {
  for (const [id, [ra, dec]] of Object.entries(TAP_POS)) {
    it(id, async () => {
      const m = JSON.parse(readFileSync(new URL(`${id}/manifest.json`, MISSIONS), "utf8"));
      const { exposures } = await at(ra, dec);
      for (const g of m.groups) {
        for (const l of g.exposureLists as Array<{ det: string; tapList: string; nListed: number }>) {
          const mine = exposures.filter((e) => e.detector === l.det);
          const ids = new Set(mine.map((e) => idOf(e.uri)));
          const inManifest = (g.exposures as Array<{ id: string; detector: string }>).filter((e) => e.detector === l.det).map((e) => e.id);
          const missing = inManifest.filter((x) => !ids.has(x));
          const csv = tapCsv(l.tapList);
          let exact = "no TAP CSV given";
          if (csv) {
            const a = new Set(mine.map((e) => e.uri)), b = new Set(csv);
            const extra = [...a].filter((x) => !b.has(x)).map(idOf), lost = [...b].filter((x) => !a.has(x)).map(idOf);
            exact = extra.length || lost.length ? `index-only ${JSON.stringify(extra)}, TAP-only ${JSON.stringify(lost)}` : `equal to ${l.tapList} (${b.size})`;
            expect({ extra, lost }).toEqual({ extra: [], lost: [] });
          }
          console.log(`${id} ${g.id} ${l.det}: index ${mine.length}, manifest listed ${l.nListed}, manifest frames ${inManifest.length} ` +
            `(missing from index ${missing.length}); TAP CSV: ${exact}`);
          expect(missing).toEqual([]);
          expect(mine.length).toBe(l.nListed);
        }
      }
    });
  }

  it("RA 30, Dec -40 (e2e run 2: SIA 463 unique, D1 98 in passes 39/3/19/37)", async () => {
    const { exposures } = await at(30, -40);
    const by = (k: (e: Exposure) => string) => exposures.reduce<Record<string, number>>((o, e) => ((o[k(e)] = (o[k(e)] ?? 0) + 1), o), {});
    // spherex-core availableGroups: exposures in passes (20-day gaps) of at least 3
    const passes = (dets: string[]) => {
      const t = exposures.filter((e) => dets.includes(e.detector)).map((e) => e.mjd);
      const runs: number[] = [];
      t.forEach((x, i) => (i > 0 && x - t[i - 1]! <= 20 ? runs[runs.length - 1]!++ : runs.push(1)));
      return runs.filter((n) => n >= 3);
    };
    const groups = { d1: passes(["D1"]), d2: passes(["D2"]), d3: passes(["D3"]), d4: passes(["D4"]), d5d6: passes(["D5", "D6"]) };
    console.log(`RA 30 Dec -40: ${exposures.length} unique, by collection ${JSON.stringify(by((e) => e.collection))}, ` +
      `groups ${JSON.stringify(Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, `${v.reduce((a, b) => a + b, 0)} in ${v.join("/")}`])))}`);
    expect(by((e) => e.collection)).toEqual({ spherex_dr1: 312, spherex_qr3: 151 });
    expect(groups.d1).toEqual([39, 3, 19, 37]);
    expect([groups.d4, groups.d5d6, groups.d3, groups.d2].map((v) => v.reduce((a, b) => a + b, 0))).toEqual([97, 132, 79, 56]);
  });
});
