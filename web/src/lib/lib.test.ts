import { readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { FRAME_BYTES, framesFor, parseFrame, referencedFrameFiles, type Manifest, type MissionIndex } from './data';
import { hasMoved, moversFromCatalogue, searchMovers, type MoverCatalogue } from './movers';
import { missionContaining } from './resolve';
import { compass, formatDec, formatRa, parseCoords, skyToPixel, stretch } from './sky';
import { DEFAULT_VIEW, parseView, serializeView, type ViewState } from './viewState';
import { plainNote } from './strings';

// public/data is filled by `npm run sync-assets`, which `pretest` runs.
const DATA = resolve(__dirname, '..', '..', 'public', 'data');
const readJson = <T>(p: string): T => JSON.parse(readFileSync(join(DATA, p), 'utf8')) as T;
const index = readJson<MissionIndex>('missions/index.json');
const manifests = index.missions.map((m) => readJson<Manifest>(`missions/${m.manifest}`));
const wise = manifests.find((m) => m.id === 'wise0855')!;

describe('parseCoords', () => {
  const CH = { ra: 133.795129, dec: -7.245147 };
  it.each([
    '08h55m10.831s -07d14m42.53s',
    '08 55 10.831 -07 14 42.53',
    '08:55:10.831 -07:14:42.53',
    '133.795129 -7.245147',
    '133.795129, -7.245147',
    '  08h55m10.831s   −07d14m42.53s ',
  ])('reads %s as the challenge position', (s) => {
    const r = parseCoords(s);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(Math.abs(r.ra - CH.ra) * 3600).toBeLessThan(0.01);
    expect(Math.abs(r.dec - CH.dec) * 3600).toBeLessThan(0.01);
  });

  it('keeps the sign of a declination between 0 and -1 degree', () => {
    const r = parseCoords('12 00 00 -00 30 00');
    expect(r).toEqual({ ok: true, ra: 180, dec: -0.5 });
  });

  it.each([
    ['', 'coordEmpty'],
    ['hello world', 'coordUnreadable'],
    ['133.79', 'coordUnreadable'],
    ['1 2 3 4', 'coordUnreadable'],
    ['133.795129-7.245147', 'coordUnreadable'],
    ['1e2 3', 'coordUnreadable'],
    ['400 10', 'coordRaRange'],
    ['-1 10', 'coordRaRange'],
    ['10 95', 'coordDecRange'],
    ['24 00 00 +10 00 00', 'coordRaRange'],
    ['08 60 00 +10 00 00', 'coordRaRange'],
    ['08 00 00 +10 61 00', 'coordDecRange'],
    ['08 00 00 +90 00 01', 'coordDecRange'],
    ['08 -5 00 +10 00 00', 'coordUnreadable'],
  ])('rejects %j with %s', (s, err) => {
    expect(parseCoords(s)).toEqual({ ok: false, error: err });
  });

  it('formats back to sexagesimal', () => {
    expect(formatRa(133.795129)).toBe('08h55m10.83s');
    expect(formatDec(-7.245147)).toBe('-07d14m42.5s');
    expect(formatRa(359.99999999)).toBe('00h00m00.00s'); // rounding past 24h wraps
    expect(formatDec(-0.5)).toBe('-00d30m00.0s');
  });
});

describe('stretch', () => {
  for (const m of manifests) {
    for (const g of m.groups) {
      for (const [name, d] of [['display', g.display], ['displayExposure', g.displayExposure]] as const) {
        it(`${m.id}/${g.id}/${name} matches the manifest formula`, () => {
          expect(d.formula).toBe('t = clip((v - vmin) / (vmax - vmin), 0, 1); out = asinh(t / soft) / asinh(1 / soft)');
          expect(stretch(d.vmin, d)).toBe(0);
          expect(stretch(d.vmax, d)).toBeCloseTo(1, 12);
          expect(stretch((d.vmin + d.vmax) / 2, d)).toBeCloseTo(Math.asinh(0.5 / d.soft) / Math.asinh(1 / d.soft), 12);
          expect(stretch(d.vmin - 1, d)).toBe(0);
          expect(stretch(d.vmax * 2 + 1, d)).toBeCloseTo(1, 12);
          expect(stretch(NaN, d)).toBeNaN();
        });
      }
    }
  }
});

describe('grid projection', () => {
  it('puts the challenge coordinates where the manifest says', () => {
    const ci = wise.challengeInput!;
    const p = skyToPixel(wise.grid, ci.ra, ci.dec);
    expect(p.x).toBeCloseTo(ci.x, 2);
    expect(p.y).toBeCloseTo(ci.y, 2);
  });
  it('puts every predicted position where the manifest says', () => {
    for (const m of manifests)
      for (const g of m.groups)
        for (const pass of g.passes) {
          const p = skyToPixel(m.grid, pass.predicted.ra, pass.predicted.dec);
          expect(Math.abs(p.x - pass.predicted.x)).toBeLessThan(0.01);
          expect(Math.abs(p.y - pass.predicted.y)).toBeLessThan(0.01);
        }
  });
  it('names compass directions', () => {
    expect(compass(-10, 0)).toBe('W');
    expect(compass(0, 10)).toBe('N');
    expect(compass(5, -5)).toBe('SE');
  });
});

describe('mover search', () => {
  const movers = moversFromCatalogue(readJson<MoverCatalogue>('movers-pm500.json'));
  const NOW = 2026.87;

  it('loads the whole catalogue', () => {
    expect(movers.length).toBe(5282);
  });

  it('finds WISE 0855 at the challenge coordinates, around 2010, now 120 to 135 arcsec west', () => {
    const hits = searchMovers(movers, 133.795129, -7.245147, NOW);
    expect(hits.length).toBeGreaterThan(0);
    const h = hits[0];
    expect(h.mover.name).toBe('WISEA J085510.74-071442.5');
    expect(h.year).toBeGreaterThan(2009.5);
    expect(h.year).toBeLessThan(2011.5);
    expect(h.minSepArcsec).toBeLessThan(5);
    expect(h.nowSepArcsec).toBeGreaterThan(120);
    expect(h.nowSepArcsec).toBeLessThan(135);
    expect(h.nowDirection).toBe('W');
    expect(hasMoved(h)).toBe(true);
  });

  it("finds Barnard's Star at its epoch-2000 position", () => {
    const hits = searchMovers(movers, 269.45208, 4.69336, NOW);
    expect(hits[0].mover.name).toBe("Barnard's star");
    expect(hits[0].year).toBeCloseTo(2000, 1);
    expect(hits[0].minSepArcsec).toBeLessThan(0.5);
    expect(hits[0].nowDirection).toBe('N');
  });

  it('finds nothing in an empty patch of sky', () => {
    expect(searchMovers(movers, 10, 10, NOW)).toEqual([]);
  });

  it('matches hits to the static mission that shows them today', () => {
    const wiseHit = searchMovers(movers, 133.795129, -7.245147, NOW)[0];
    expect(missionContaining(manifests, wiseHit.nowRa, wiseHit.nowDec)?.id).toBe('wise0855');
    expect(missionContaining(manifests, 133.795129, -7.245147)?.id).toBe('wise0855');
    const barnard = searchMovers(movers, 269.45208, 4.69336, NOW)[0];
    expect(missionContaining(manifests, 269.45208, 4.69336)).toBeNull(); // the year-2000 spot is 4.5 arcmin south of the field
    expect(missionContaining(manifests, barnard.nowRa, barnard.nowDec)?.id).toBe('barnard');
    expect(missionContaining(manifests, 10, 10)).toBeNull();
  });
});

describe('manifest loader', () => {
  it('index lists the five missions', () => {
    expect(index.schema).toBe('mission-index/1');
    expect(index.missions.map((m) => m.id).sort()).toEqual(['barnard', 'epsindb', 'rdra', 'rwaur', 'wise0855']);
  });

  for (const m of manifests) {
    it(`${m.id}: every referenced frame exists with 121*121*4 bytes`, () => {
      expect(m.schema).toBe('mission-manifest/1');
      const files = referencedFrameFiles(m);
      expect(files.length).toBeGreaterThan(0);
      for (const f of files) expect(statSync(join(DATA, 'missions', m.id, f)).size, f).toBe(FRAME_BYTES);
    });

    it(`${m.id}: both modes build frames for every group`, () => {
      for (const g of m.groups) {
        expect(framesFor(m, g, 'stack').length).toBe(g.passes.length);
        expect(framesFor(m, g, 'exp').length).toBeGreaterThanOrEqual(g.passes.reduce((a, p) => a + p.nExposures, 0));
      }
    });
  }

  it('parses a frame and rejects a wrong size', () => {
    const buf = readFileSync(join(DATA, 'missions', 'wise0855', wise.groups[0].passes[0].stack));
    const arr = parseFrame(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
    expect(arr.length).toBe(121 * 121);
    expect(() => parseFrame(new ArrayBuffer(100))).toThrow(/expected/);
  });
});

describe('URL state', () => {
  it('round-trips a full state exactly', () => {
    const s: ViewState = {
      mission: 'wise0855',
      ra: 133.795129,
      dec: -7.245147,
      group: 'd2',
      mode: 'exp',
      frame: 17,
      overlays: { pred: true, meas: false, input: true },
      zoom: 4.5,
      cx: 78.25,
      cy: 58.5,
      fps: 4,
      loop: false,
    };
    const { view, hasFrame } = parseView(serializeView(s));
    expect(view).toEqual(s);
    expect(hasFrame).toBe(true);
  });

  it('round-trips the defaults and all overlays off', () => {
    const s = { ...DEFAULT_VIEW, mission: 'barnard', overlays: { pred: false, meas: false, input: false } };
    expect(parseView(serializeView(s)).view).toEqual(s);
  });

  it('ignores garbage', () => {
    const { view, hasFrame } = parseView('m=../../etc&ra=abc&dec=5&z=999&fps=3&mode=zzz&f=-2');
    expect(view).toEqual(DEFAULT_VIEW);
    expect(hasFrame).toBe(false);
  });
});

describe('plainNote', () => {
  it('drops internal note references and field names from every caveat', () => {
    const notes = manifests.flatMap((m) => [...m.caveats, ...(m.challengeInput ? [m.challengeInput.note] : [])]).map(plainNote);
    for (const n of notes) expect(n).not.toMatch(/\bnotes? \d|blendedWith|pass field/);
    expect(plainNote('a centroid (plus x), as in note 08.')).toBe('a centroid (plus x).');
    expect(plainNote('position (epoch about 2010.45, notes 06 and 08). Both')).toBe('position (epoch about 2010.45). Both');
  });
});
