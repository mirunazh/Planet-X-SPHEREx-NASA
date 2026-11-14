import { describe, expect, it } from 'vitest';
import { compare, scoreMotion, scoreDistance, scoreSpeed, scoreParallaxMas, scoreRatio, pipelineRate } from '../src/score.js';
import { encodeReport, decodeReport, MAX_ENCODED_LENGTH, REPORT_VERSION } from '../src/report.js';
import type { MissionReport } from '../src/report.js';
import { manifest, parallaxProduct } from './data.js';

describe('score tiers', () => {
  const ref = { source: 'pipeline' as const, value: 10, err: 0.5, paDeg: 90 };
  it('inside, close, try again, with reasons', () => {
    expect(compare({ value: 10.3, paDeg: 91 }, ref)).toMatchObject({ tier: 'inside', insideErrorBar: true, reasons: ['inside-error-bar', 'direction-inside'] });
    expect(compare({ value: 10.8, paDeg: 90 }, ref)).toMatchObject({ tier: 'close', reasons: ['within-percent', 'direction-inside'] });
    expect(compare({ value: 10.2, paDeg: 100 }, ref)).toMatchObject({ tier: 'close', reasons: ['inside-error-bar', 'direction-close'] });
    expect(compare({ value: 12, paDeg: 90 }, ref)).toMatchObject({ tier: 'try-again', reasons: ['value-off', 'direction-inside'] });
    expect(compare({ value: 10, paDeg: 270 }, ref)).toMatchObject({ tier: 'try-again', angleErrorDeg: 180, reasons: ['inside-error-bar', 'direction-off'] });
    expect(compare({ value: NaN }, ref)).toMatchObject({ tier: 'try-again', reasons: ['no-answer'] });
    expect(compare({ value: 11, err: 1 }, ref).tier).toBe('inside'); // the student's own error bar counts
    expect(compare({ value: 9 }, ref).percentError).toBeCloseTo(-10, 9);
  });

  it('WISE 0855: the pipeline answer is inside its error bar, and the literature comparison shows the blend', () => {
    const m = manifest('wise0855');
    const p = pipelineRate(m);
    const s = scoreMotion(m, { value: p.value, paDeg: p.paDeg! });
    expect(s.headline).toBe('inside');
    expect(s.pipeline.source).toBe('pipeline');
    expect(s.literature!.source).toBe('literature');
    console.log(`[score] wise0855: pipeline ${p.value.toFixed(3)} +- ${p.err.toFixed(3)} "/yr PA ${p.paDeg!.toFixed(1)}; vs literature ${s.literature!.percentError.toFixed(1)}% (${s.literature!.tier}), angle ${s.literature!.angleErrorDeg!.toFixed(1)} deg`);
    expect(s.literature!.percentError).toBeLessThan(-20); // reads about 22% low
  });

  it('Epsilon Indi B chain: the exp13 answer scores inside vs pipeline, close vs Gaia', () => {
    const m = manifest('epsindb');
    const P = parallaxProduct();
    // the student's answer carries the fit's error bar (306 +- 28 mas)
    const plx = scoreParallaxMas(m, P, { value: 306.18, err: 28.08 });
    const d = scoreDistance(m, P, { value: 3.266, err: 0.2995 });
    const v = scoreSpeed(m, P, { value: 72.5, err: 6.65 });
    for (const s of [plx, d, v]) expect(s.headline).toBe('inside');
    console.log(`[score] epsindb vs literature: plx ${plx.literature!.percentError.toFixed(1)}% ${plx.literature!.tier}, distance ${d.literature!.percentError.toFixed(1)}% ${d.literature!.tier}, speed ${v.literature!.percentError.toFixed(1)}% ${v.literature!.tier}`);
    for (const s of [plx, d, v]) expect(s.literature!.tier).toBe('close'); // about 12% (1.4 sigma) from Gaia
    const r = pipelineRate(m);
    console.log(`[score] epsindb pipeline rate ${r.value.toFixed(4)} +- ${r.err.toFixed(4)} "/yr, PA ${r.paDeg!.toFixed(1)} deg`);
  });

  it('RW Aur ratio has no catalogue value, so no literature comparison', () => {
    const s = scoreRatio(manifest('rwaur'), 1, { value: 1.4 });
    expect(s.headline).toBe('inside');
    expect(s.literature).toBeNull();
  });
});

describe('report encode / decode', () => {
  const report: MissionReport = {
    v: REPORT_VERSION,
    mission: 'epsindb',
    group: 'd2',
    frames: [0, 4],
    clicks: [{ pass: 0, x: 60.93, y: 59.418 }, { pass: 4, x: 59.2, y: 60.8 }],
    derived: { rateArcsecPerYear: 4.58, paDeg: 128.7, parallaxMas: 306, distancePc: 3.27, speedKmS: 72.5 },
    truth: { pipeline: { rateArcsecPerYear: 4.5824547, distancePc: 3.2660526 }, literature: { rateArcsecPerYear: 4.6841649, distancePc: 3.6946997 } },
    app: '0.1.0',
  };
  const b64 = (s: string) => btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const withField = (patch: Record<string, unknown>) => b64(JSON.stringify({ ...report, ...patch }));
  const code = (t: unknown) => {
    const r = decodeReport(t);
    return r.ok ? 'ok' : r.error.code;
  };

  it('round trips exactly and stays short', () => {
    const s = encodeReport(report);
    console.log(`[report] encoded length ${s.length} chars`);
    expect(s).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(decodeReport(s)).toEqual({ ok: true, report });
    expect(s.length).toBeLessThan(600);
  });

  it('rejects bad input with a typed error and never throws', () => {
    const s = encodeReport(report);
    expect(code(s.slice(0, s.length - 7))).toMatch(/bad-encoding|bad-json/);
    expect(code(s.slice(0, 10))).toMatch(/bad-encoding|bad-json/);
    expect(code('')).toBe('bad-encoding');
    expect(code('not base64!')).toBe('bad-encoding');
    expect(code(42)).toBe('not-text');
    expect(code(null)).toBe('not-text');
    expect(code('A'.repeat(MAX_ENCODED_LENGTH + 1))).toBe('too-long');
    expect(code(withField({ v: 'mission-report/2' }))).toBe('bad-version');
    expect(code(withField({ mission: 'planetx' }))).toBe('unknown-mission');
    expect(code(withField({ mission: '__proto__' }))).toBe('unknown-mission');
    expect(code(withField({ group: 'd5d6' }))).toBe('unknown-group');
    expect(code(withField({ name: 'Ana' }))).toBe('bad-field'); // no free text, no names
    expect(code(withField({ app: 'v1 <script>' }))).toBe('bad-field');
    expect(code(withField({ frames: Array(17).fill(0) }))).toBe('bad-field');
    expect(code(withField({ frames: [1.5] }))).toBe('bad-field');
    expect(code(withField({ clicks: [{ pass: 0, x: 1e308, y: 3 }] }))).toBe('bad-field');
    expect(code(withField({ clicks: [{ pass: 0, x: 3, y: 3, note: 'hi' }] }))).toBe('bad-field');
    expect(code(withField({ derived: { rateArcsecPerYear: 1e9 } }))).toBe('bad-field');
    expect(code(withField({ derived: { rateArcsecPerYear: '4.5' } }))).toBe('bad-field');
    expect(code(withField({ derived: { comment: 1 } }))).toBe('bad-field');
    expect(code(withField({ truth: { pipeline: {} } }))).toBe('bad-field');
    expect(code(b64('{"v":"mission-report/1","derived":{"distancePc":1e999}}'))).toBe('bad-field');
    expect(code(b64('{"v":NaN}'))).toBe('bad-json');
    expect(code(b64('[]'))).toBe('bad-field');
    expect(code(b64('\xff\xfe'))).toBe('bad-encoding'); // not UTF-8
    // fuzz: random strings and random truncations never throw
    let seed = 1;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    for (let i = 0; i < 2000; i++) {
      const t = i % 2 ? s.slice(0, Math.floor(rnd() * s.length)) : Array.from({ length: Math.floor(rnd() * 200) }, () => alphabet[Math.floor(rnd() * 64)]).join('');
      expect(() => decodeReport(t)).not.toThrow();
    }
  });
});
