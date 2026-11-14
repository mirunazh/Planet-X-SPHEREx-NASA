import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { Limiter, s3Url } from "../src/s3.js";
import { handleObservationsRequest, parseSiaCsv, siaUrls, type ObservationsBody } from "../src/sia.js";

const csv = readFileSync(new URL("./fixtures/sia-barnard-dr1.csv", import.meta.url), "utf8");

describe("SIA", () => {
  it("builds the four collection URLs", () => {
    const u = siaUrls(331.097, -56.8008);
    expect(u).toHaveLength(4);
    expect(u[0]).toBe("https://irsa.ipac.caltech.edu/SIA?COLLECTION=spherex_dr1&POS=circle+331.097+-56.8008+0.001&RESPONSEFORMAT=csv");
    expect(u.map((x) => new URL(x).searchParams.get("COLLECTION"))).toEqual(["spherex_dr1", "spherex_dr1_deep", "spherex_qr3", "spherex_qr3_deep"]);
  });

  it("parses a real SIA CSV (240 rows, unquoted JSON in cloud_access)", () => {
    const e = parseSiaCsv(csv);
    expect(e).toHaveLength(240);
    expect(e[0]).toEqual({
      uri: "dr1/level2/2025W33_2C/l2b-v27-2026-228/6/level2_2025W33_2C_0321_1D6_spx_l2b-v27-2026-228.fits",
      mjd: (60902.864715 + 60902.866047) / 2, detector: "D6", collection: "spherex_dr1",
    });
    expect(s3Url(e[0]!.uri)).toBe("https://nasa-irsa-spherex.s3.us-east-1.amazonaws.com/dr1/level2/2025W33_2C/l2b-v27-2026-228/6/level2_2025W33_2C_0321_1D6_spx_l2b-v27-2026-228.fits");
    expect(e.filter((x) => x.detector === "D2")).toHaveLength(37);
  });

  it("rejects an HTML error page", () => {
    expect(() => parseSiaCsv("<html><title>502 Proxy Error</title></html>")).toThrow(/not an SIA CSV/);
  });

  it("validates input", async () => {
    const f = async () => new Response(csv);
    for (const q of ["ra=abc&dec=0", "ra=360&dec=0", "ra=10&dec=91", "dec=1", "ra=10&dec=1&radius=-1", "ra=Infinity&dec=0"]) {
      expect((await handleObservationsRequest(new URLSearchParams(q), f)).status).toBe(400);
    }
  });

  it("queries 4 collections at most 2 at a time, retries once, de-duplicates, caps the radius, reports partial failure", async () => {
    let active = 0, peak = 0;
    const seen: string[] = [];
    const tries = new Map<string, number>();
    const fake = async (url: string) => {
      active++; peak = Math.max(peak, active);
      await new Promise((r) => setTimeout(r, 10));
      active--;
      const c = new URL(url).searchParams.get("COLLECTION")!;
      seen.push(new URL(url).searchParams.get("POS")!);
      tries.set(c, (tries.get(c) ?? 0) + 1);
      if (c === "spherex_qr3_deep") return new Response("<html>502 Proxy Error</html>", { status: 502 });
      if (c === "spherex_dr1_deep" && tries.get(c) === 1) return new Response("busy", { status: 503 });
      return new Response(c === "spherex_qr3" ? "" : csv); // dr1 and dr1_deep return the same rows: dedupe
    };
    const r = await handleObservationsRequest(new URLSearchParams("ra=269.4485&dec=4.7398&radius=5"), fake, { limiter: new Limiter(2) });
    expect(r.status).toBe(200);
    const b = r.body as ObservationsBody;
    expect(peak).toBeLessThanOrEqual(2);
    expect(seen.every((p) => p === "circle 269.4485 4.7398 0.05")).toBe(true);
    expect(b.radiusDeg).toBe(0.05);
    expect(b.count).toBe(240);
    expect(b.exposures.every((e, i, a) => i === 0 || a[i - 1]!.mjd <= e.mjd)).toBe(true);
    expect(b.collections.map((c) => [c.collection, c.ok, c.n])).toEqual([
      ["spherex_dr1", true, 240], ["spherex_dr1_deep", true, 240], ["spherex_qr3", true, 0], ["spherex_qr3_deep", false, 0]]);
    expect(b.collections[3]!.error).toBe("HTTP 502");
    expect(b.complete).toBe(false);
    expect(tries.get("spherex_qr3_deep")).toBe(5);
    expect(JSON.stringify(b).length).toBeLessThan(240 * 200);
  });

  it("returns 502 when every collection fails, with a timeout", async () => {
    const hang = (_u: string, init?: RequestInit) => new Promise<Response>((_, rej) => init?.signal?.addEventListener("abort", () => rej(new Error("aborted"))));
    const r = await handleObservationsRequest(new URLSearchParams("ra=1&dec=1"), hang, { timeoutMs: 50, limiter: new Limiter(2) });
    expect(r.status).toBe(502);
    expect((r.body as ObservationsBody).collections.every((c) => c.error === "timeout after 50 ms")).toBe(true);
  });
});
