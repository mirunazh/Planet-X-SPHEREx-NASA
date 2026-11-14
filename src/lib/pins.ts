/**
 * Pins: NASA Exoplanet Archive host stars and featured targets, loaded from the
 * build-time snapshot in public/data (see scripts/fetch-nasa-data.mjs).
 */
import { type Pin, type PinSource, useNav } from './store';
import { radecToVec } from './sky/coords';
import { type View, cameraBasis, projectWithBasis } from './sky/view';

interface HostRecord {
  name: string;
  ra: number;
  dec: number;
  distPc: number | null;
  planetCount: number | null;
  kmag: number | null;
  planets: string[];
  firstDiscovery: number | null;
  facilities: string[];
}

interface TargetRecord {
  id: string;
  name: string;
  kind: string;
  ra: number;
  dec: number;
  fov: number;
  description: string;
  source: PinSource;
}

export async function loadPins(): Promise<void> {
  useNav.setState({ dataStatus: 'loading' });
  try {
    const [hostsRes, targetsRes] = await Promise.all([fetch('/data/exoplanet-hosts.json'), fetch('/data/targets.json')]);
    if (!hostsRes.ok || !targetsRes.ok) throw new Error(`data files: HTTP ${hostsRes.status}/${targetsRes.status}`);
    const hostsJson = (await hostsRes.json()) as { provenance: { service: string; retrievedAt: string }; hosts: HostRecord[] };
    const targetsJson = (await targetsRes.json()) as { targets: TargetRecord[] };
    const hostSource: PinSource = {
      service: hostsJson.provenance.service,
      url: 'https://exoplanetarchive.ipac.caltech.edu/',
      retrievedAt: hostsJson.provenance.retrievedAt,
    };
    const hosts: Pin[] = hostsJson.hosts.map((h, i) => ({
      id: `host-${i}`,
      kind: 'host',
      name: h.name,
      ra: h.ra,
      dec: h.dec,
      vec: radecToVec(h.ra, h.dec),
      fov: 0.25,
      distPc: h.distPc,
      planetCount: h.planetCount,
      kmag: h.kmag,
      planets: h.planets,
      firstDiscovery: h.firstDiscovery,
      facilities: h.facilities,
      source: hostSource,
    }));
    const targets: Pin[] = targetsJson.targets.map((t) => ({
      id: t.id,
      kind: 'target',
      name: t.name,
      ra: t.ra,
      dec: t.dec,
      vec: radecToVec(t.ra, t.dec),
      fov: t.fov,
      targetKind: t.kind,
      description: t.description,
      source: t.source,
    }));
    useNav.getState().setPins(hosts, targets, hostsJson.provenance.retrievedAt);
  } catch (err) {
    console.error('[pins] could not load NASA data snapshot', err);
    useNav.setState({ dataStatus: 'error' });
  }
}

/** Nearest visible pin to a screen point (CSS px), featured targets first. */
export function pickPin(view: View, width: number, height: number, px: number, py: number): Pin | null {
  const s = useNav.getState();
  const aspect = width / Math.max(1, height);
  const basis = cameraBasis(view);
  const scan = (pins: Pin[], radius: number) => {
    let best: Pin | null = null;
    let bestD = radius;
    for (const pin of pins) {
      const ndc = projectWithBasis(view, basis, aspect, pin.vec);
      if (!ndc || Math.abs(ndc.x) > 1.05 || Math.abs(ndc.y) > 1.05) continue;
      const d = Math.hypot(((ndc.x + 1) / 2) * width - px, ((1 - ndc.y) / 2) * height - py);
      if (d < bestD) {
        bestD = d;
        best = pin;
      }
    }
    return best;
  };
  return (s.showTargets ? scan(s.targets, 16) : null) ?? (s.showHosts ? scan(s.hosts, 9) : null);
}

/** Local name search over featured targets and exoplanet hosts. */
export function searchPins(query: string, targets: Pin[], hosts: Pin[], limit = 8): Pin[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const score = (p: Pin) => {
    const n = p.name.toLowerCase();
    if (n === q || p.id === q) return 0;
    if (n.startsWith(q)) return 1;
    if (n.split(/[\s()]+/).some((w) => w.startsWith(q))) return 2;
    if (n.includes(q)) return 3;
    return Infinity;
  };
  return [...targets.map((p) => ({ p, s: score(p) - 0.5 })), ...hosts.map((p) => ({ p, s: score(p) }))]
    .filter((x) => Number.isFinite(x.s))
    .sort((a, b) => a.s - b.s || a.p.name.localeCompare(b.p.name))
    .slice(0, limit)
    .map((x) => x.p);
}
