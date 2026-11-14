import { describe, expect, it } from "vitest";
import { cellDistanceDeg, coverageSummary, dedupeExposures, gnomonic, pointInPolygon, separationDeg, sphericalPolygonContains } from "../src/index.js";

// a 3.5 x 3.5 deg square footprint (great-circle edges) about a centre, rotated by rot degrees
function square(ra0: number, dec0: number, half = 1.75, rot = 0): Array<[number, number]> {
  const D = Math.PI / 180, t = Math.tan(half * D);
  return [[-t, -t], [t, -t], [t, t], [-t, t]].map(([x0, y0]) => {
    const c = Math.cos(rot * D), s = Math.sin(rot * D), x = x0! * c - y0! * s, y = x0! * s + y0! * c;
    // inverse gnomonic
    const d0 = dec0 * D, rho = Math.hypot(x, y), cc = Math.atan(rho);
    const dec = rho === 0 ? d0 : Math.asin(Math.cos(cc) * Math.sin(d0) + (y * Math.sin(cc) * Math.cos(d0)) / rho);
    const ra = ra0 * D + Math.atan2(x * Math.sin(cc), rho * Math.cos(d0) * Math.cos(cc) - y * Math.sin(d0) * Math.sin(cc));
    return [((ra / D) % 360 + 360) % 360, dec / D] as [number, number];
  });
}

describe("point in a spherical footprint", () => {
  it("inside, outside, near an edge", () => {
    const sq = square(150, 20);
    expect(sphericalPolygonContains(150, 20, sq)).toBe(true);
    expect(sphericalPolygonContains(151.7, 20, sq)).toBe(true);
    expect(sphericalPolygonContains(152.0, 20, sq)).toBe(false);
    expect(sphericalPolygonContains(150, 21.74, sq)).toBe(true);
    expect(sphericalPolygonContains(150, 21.76, sq)).toBe(false);
    expect(sphericalPolygonContains(330, -20, sq)).toBe(false); // antipode: projection rejects it
  });

  it("great-circle edges, not RA/Dec lines: the top edge bulges poleward between corners", () => {
    const sq = square(0, 60, 1.75);
    const top = Math.max(sq[2]![1], sq[3]![1]); // corner latitude
    // midway between the top corners the great circle runs north of the corners' latitude
    expect(sphericalPolygonContains(0, top + 0.01, sq)).toBe(true);
    expect(sphericalPolygonContains(0, top + 0.2, sq)).toBe(false);
  });

  it("footprint crossing RA 0", () => {
    const sq = square(0.5, -10, 1.75, 30);
    expect(sq.some(([r]) => r > 350) && sq.some(([r]) => r < 10)).toBe(true);
    expect(sphericalPolygonContains(359.2, -10, sq)).toBe(true);
    expect(sphericalPolygonContains(0.0, -10, sq)).toBe(true);
    expect(sphericalPolygonContains(1.8, -10.2, sq)).toBe(true);
    expect(sphericalPolygonContains(357.5, -10, sq)).toBe(false);
    expect(sphericalPolygonContains(3.5, -10, sq)).toBe(false);
  });

  it("footprint containing a pole, and one beside it", () => {
    const cap = square(45, 89.5);
    expect(sphericalPolygonContains(200, 89.9, cap)).toBe(true);
    expect(sphericalPolygonContains(0, 90, cap)).toBe(true);
    expect(sphericalPolygonContains(225, 89.0, cap)).toBe(true); // across the pole from the centre
    expect(sphericalPolygonContains(225, 87.0, cap)).toBe(false);
    const south = square(10, -87.5);
    expect(sphericalPolygonContains(10, -86.0, south)).toBe(true);
    expect(sphericalPolygonContains(10, -89.2, south)).toBe(true); // 1.7 deg poleward of the centre
    expect(sphericalPolygonContains(190, -89.5, south)).toBe(false); // 3.0 deg away, over the pole
    expect(sphericalPolygonContains(40, -89.0, south)).toBe(true); // RA far from the centre's, still inside
  });

  it("planar ray casting and the projection", () => {
    expect(pointInPolygon(0.5, 0.5, [0, 1, 1, 0], [0, 0, 1, 1])).toBe(true);
    expect(pointInPolygon(1.5, 0.5, [0, 1, 1, 0], [0, 0, 1, 1])).toBe(false);
    expect(gnomonic(10, 0, 10, 0)).toEqual([0, 0]);
    expect(gnomonic(10, 0, 190, 0)).toBeNull();
    expect(separationDeg(359.9, 0, 0.1, 0)).toBeCloseTo(0.2, 10);
  });
});

describe("cell selection", () => {
  it("distance to an RA/Dec cell: inside, RA wrap, edges, poles", () => {
    expect(cellDistanceDeg([10, 20, -5, 5], 15, 0)).toBe(0);
    expect(cellDistanceDeg([10, 20, -5, 5], 15, 8)).toBeCloseTo(3, 12); // along the meridian
    expect(cellDistanceDeg([355, 360, -5, 5], 1, 0)).toBeCloseTo(1, 12); // across RA 0
    expect(cellDistanceDeg([0, 5, -5, 5], 359, 0)).toBeCloseTo(1, 12);
    expect(cellDistanceDeg([0, 5, -5, 5], 359, 5)).toBeCloseTo(separationDeg(359, 5, 0, 5), 12); // nearest point near a corner, on the edge
    // a point beside a high-latitude cell: the nearest edge point lies poleward of the point's own Dec
    const d = cellDistanceDeg([100, 120, 60, 80], 95, 70);
    expect(d).toBeLessThan(separationDeg(95, 70, 100, 70));
    expect(d).toBeCloseTo(Math.min(...Array.from({ length: 2001 }, (_, i) => separationDeg(95, 70, 100, 60 + i / 100))), 6);
    // pole cell: the pole is in it, so the distance is 90 - dec from any RA
    expect(cellDistanceDeg([0, 120, 80, 90], 250, 86)).toBeCloseTo(4, 12);
    expect(cellDistanceDeg([0, 120, -90, -80], 250, -88)).toBeCloseTo(2, 12); // Dec inside the range, RA outside: via the pole
  });
});

describe("summary and de-duplication", () => {
  it("visits split on gaps over 20 days, per detector", () => {
    const e = (mjd: number, detector: string, uri = `${detector}_${mjd}`) => ({ uri, mjd, detector, collection: "spherex_dr1" });
    const list = dedupeExposures([e(100, "D1"), e(110, "D1"), e(131, "D1"), e(105, "D2"), e(100, "D1"), e(300, "D2")]);
    expect(list.map((x) => x.mjd)).toEqual([100, 105, 110, 131, 300]);
    const s = coverageSummary(list);
    expect(s.images).toBe(5);
    expect(s.detectors).toEqual([
      { detector: "D1", images: 3, visits: 2, firstMjd: 100, lastMjd: 131 },
      { detector: "D2", images: 2, visits: 2, firstMjd: 105, lastMjd: 300 },
    ]);
    expect(s.visits).toBe(3); // 100..131 has gaps of 5, 5, 21 -> split at 131; then 300
    expect(coverageSummary([]).visits).toBe(0);
  });
});
