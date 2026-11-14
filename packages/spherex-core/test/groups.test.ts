import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { DETECTOR_GROUPS, availableGroups } from "../src/live.js";
import { parseSiaCsv } from "../src/sia.js";

describe("detector groups", () => {
  it("cover all six detectors once, with ordered wavelength ranges", () => {
    expect(DETECTOR_GROUPS.flatMap((g) => g.detectors).sort()).toEqual(["D1", "D2", "D3", "D4", "D5", "D6"]);
    for (const g of DETECTOR_GROUPS) expect(g.wavelengthUm[0]).toBeLessThan(g.wavelengthUm[1]);
  });

  it("keeps groups with at least 3 exposures in at least 2 passes, best first", () => {
    const e = (detector: string, mjds: number[]) => mjds.map((mjd) => ({ mjd, detector }));
    const list = [
      ...e("D2", [100, 101, 102, 300, 301, 302, 303]), // 2 passes, 7
      ...e("D5", [100, 101, 300, 301]), ...e("D6", [102, 302, 600, 601, 602]), // d5d6: 3 passes, 9
      ...e("D1", [100, 101, 102, 300, 301]), // second pass has 2: not enough
      ...e("D3", [100, 101, 102, 300, 301, 302]), // 2 passes, 6
    ];
    expect(availableGroups(list).map((g) => [g.id, g.nPasses, g.nExposures])).toEqual([["d5d6", 3, 9], ["d2", 2, 7], ["d3", 2, 6]]);
    expect(availableGroups([])).toEqual([]);
  });

  it("on a real SIA list (Barnard, DR1 only)", () => {
    const ex = parseSiaCsv(readFileSync(new URL("./fixtures/sia-barnard-dr1.csv", import.meta.url), "utf8"));
    const g = availableGroups(ex);
    expect(g.length).toBeGreaterThan(0);
    expect(g.every((x) => x.nPasses >= 2)).toBe(true);
    expect(g[0]!.label).toMatch(/micron/);
  });
});
