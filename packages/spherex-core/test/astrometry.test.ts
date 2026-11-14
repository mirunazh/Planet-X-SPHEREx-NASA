import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { moversFromCatalogue, predictPosition, propagate, separationArcsec, whatWasHere } from "../src/astrometry.js";

// The catalogue the web app ships (read-only copy kept with the fixtures).
const cat = JSON.parse(readFileSync(new URL("./fixtures/movers-pm500.json", import.meta.url), "utf8"));
const movers = moversFromCatalogue(cat);
const wise = movers.find((m) => m.name === "WISEA J085510.74-071442.5")!;

describe("astrometry", () => {
  it("WISE 0855 propagated to 2010.5 lands within 5 arcsec of the challenge coordinates", () => {
    const [ra, dec] = propagate(wise, 2010.5);
    const s = separationArcsec(ra, dec, 133.795129, -7.245147);
    console.log(`WISE 0855 @2010.5: ${s.toFixed(3)} arcsec from the challenge position`);
    expect(s).toBeLessThan(5);
  });

  it("whatWasHere at the challenge coordinates (10 arcsec) finds WISE 0855 and where it is now", () => {
    const t0 = performance.now();
    const hits = whatWasHere(133.795129, -7.245147, 10, movers, { from: 1990, to: 2027, now: 2026.4 });
    const ms = performance.now() - t0;
    expect(hits.map((h) => h.name)).toEqual(["WISEA J085510.74-071442.5"]);
    const h = hits[0]!;
    const s = separationArcsec(h.current.ra, h.current.dec, 133.7588, -7.2421);
    console.log(`whatWasHere: ${hits.length} hit in ${ms.toFixed(1)} ms over ${movers.length} rows; closest ${h.closestArcsec.toFixed(2)}" at ${h.closestEpoch.toFixed(2)}; ` +
      `now (${h.current.ra.toFixed(5)}, ${h.current.dec.toFixed(5)}), ${s.toFixed(2)}" from (133.7588, -7.2421)`);
    expect(s).toBeLessThan(3);
    expect(Math.abs(h.closestEpoch - 2010.5)).toBeLessThan(1);
    // default now = today: still the same object, current position a little further west
    expect(whatWasHere(133.795129, -7.245147, 10, movers).length).toBe(1);
  });

  it("separation is symmetric and handles RA wrap", () => {
    expect(separationArcsec(359.9999, 0, 0.0001, 0)).toBeCloseTo(0.72, 6);
    expect(whatWasHere(0.0001, 0, 1, [{ ...wise, ra: 359.9999, dec: 0, pmRaCosDec: 0, pmDec: 0 }]).length).toBe(1);
  });

  it("predictPosition (space motion + parallax) matches the Python build's predicted pass positions to 0.05 arcsec", () => {
    const cases = [
      { a: { ra: 331.0441466, dec: -56.7828442, epoch: 2000, pmRaCosDecMasYr: 3981.977, pmDecMasYr: -2466.832, parallaxMas: 270.658, radialVelocityKmS: -40 },
        mjd: 60792.7417688, ra: 331.0954309, dec: -56.8001516 },
      { a: { ra: 133.8189082, dec: -7.247048, epoch: 2000, pmRaCosDecMasYr: -8123.7, pmDecMasYr: 673.2, parallaxMas: 439, radialVelocityKmS: 0 },
        mjd: 61161.5276576, ra: 133.758895, dec: -7.2420898 },
      { a: { ra: 269.452077, dec: 4.693365, epoch: 2000, pmRaCosDecMasYr: -801.551, pmDecMasYr: 10362.394, parallaxMas: 546.9759, radialVelocityKmS: -110.11 },
        mjd: 61273.4923589, ra: 269.4459842, dec: 4.7702014 },
    ];
    for (const c of cases) {
      const [ra, dec] = predictPosition(c.a, c.mjd);
      const s = separationArcsec(ra, dec, c.ra, c.dec);
      console.log(`predictPosition vs astropy: ${s.toFixed(4)} arcsec`);
      expect(s).toBeLessThan(0.05);
    }
  });
});
