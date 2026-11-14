import { describe, expect, it } from 'vitest';
import { refineCentroid } from '../src/centroid.js';
import { group } from '../src/manifest.js';
import type { MissionId } from '../src/manifest.js';
import { frame, manifest } from './data.js';

const DIRS = [[3, 0], [-3, 0], [0, 3], [0, -3]] as const;

function run(id: MissionId, gid: string) {
  const m = manifest(id);
  const out: { pass: number; dx: number; dy: number; d: number; flags: string[]; snr: number; snrManifest: number }[] = [];
  for (const p of group(m, gid).passes) {
    if (!p.measured) continue;
    const img = frame(id, p.stack);
    for (const [dx, dy] of DIRS) {
      const r = refineCentroid(img, m.grid.width, m.grid.height, p.measured.x + dx, p.measured.y + dy, 5);
      out.push({ pass: p.index, dx, dy, d: Math.hypot(r.x - p.measured.x, r.y - p.measured.y), flags: r.flags, snr: r.snr, snrManifest: p.measured.snr });
    }
  }
  return out;
}

const summary = (id: string, rs: ReturnType<typeof run>) =>
  `[centroid] ${id}: ${rs.length} starts, worst ${Math.max(...rs.map((r) => r.d)).toFixed(3)} px, median ${[...rs.map((r) => r.d)].sort((a, b) => a - b)[rs.length >> 1]!.toFixed(3)} px; flags ${JSON.stringify([...new Set(rs.flatMap((r) => r.flags))])}; S/N ours/manifest ${Math.min(...rs.map((r) => r.snr / r.snrManifest)).toFixed(2)}..${Math.max(...rs.map((r) => r.snr / r.snrManifest)).toFixed(2)}`;

describe('refineCentroid on the real stacks', () => {
  it('Epsilon Indi B: from 3 px away in four directions, lands within 0.2 px of the pipeline centroid', () => {
    const rs = run('epsindb', 'd2');
    console.log(summary('epsindb d2', rs));
    expect(rs).toHaveLength(20);
    for (const r of rs) {
      expect(r.d, `pass ${r.pass} start (${r.dx},${r.dy})`).toBeLessThan(0.2);
      expect(r.flags).toEqual([]);
    }
  });

  it('WISE 0855 d5d6 (faint, blended): reports where it lands, target 0.7 px', () => {
    const rs = run('wise0855', 'd5d6');
    console.log(summary('wise0855 d5d6', rs));
    for (const r of rs) console.log(`  pass ${r.pass} start (${r.dx},${r.dy}): ${r.d.toFixed(3)} px ${r.flags.join(',')}`);
    const within = rs.filter((r) => r.d < 0.7).length;
    console.log(`  within 0.7 px: ${within}/${rs.length}`);
    expect(within).toBe(rs.length);
  });

  it("Barnard's Star: the NaN core is flagged, and the wing centroid still lands near the pipeline's", () => {
    const rs = run('barnard', 'd2');
    console.log(summary('barnard d2', rs));
    for (const r of rs) {
      expect(r.flags).toContain('saturated-core');
      expect(r.d).toBeLessThan(0.5);
    }
  });

  it('flags edge, mostly-NaN and empty frames instead of returning garbage', () => {
    const w = 61, h = 61;
    const blank = new Float32Array(w * h).fill(NaN);
    const r0 = refineCentroid(blank, w, h, 30, 30, 5);
    expect(r0.flags).toEqual(['no-signal']);
    expect(Number.isNaN(r0.x)).toBe(true);

    const star = (cx: number, cy: number, amp = 100) => {
      const f = new Float32Array(w * h);
      let s = 1;
      for (let j = 0; j < h; j++)
        for (let i = 0; i < w; i++) {
          s = (s * 16807) % 2147483647;
          f[j * w + i] = amp * Math.exp(-((i - cx) ** 2 + (j - cy) ** 2) / 2) + 0.1 * (s / 2147483647 - 0.5);
        }
      return f;
    };
    const ok = refineCentroid(star(30.3, 29.6), w, h, 32, 28, 5);
    expect(ok.flags).toEqual([]);
    expect(Math.hypot(ok.x - 30.3, ok.y - 29.6)).toBeLessThan(0.05);
    expect(refineCentroid(star(1.2, 30), w, h, 3, 30, 5).flags).toContain('edge');
    const patchy = star(30, 30).map((v, k) => (Math.abs((k % w) - 30) <= 1 && Math.abs(Math.floor(k / w) - 30) <= 1 ? v : NaN));
    expect(refineCentroid(patchy, w, h, 30, 30, 5).flags).toContain('mostly-nan');
    const faint = star(30, 30, 0.01);
    expect(refineCentroid(faint, w, h, 30, 30, 5).flags).toContain('faint');
  });
});
