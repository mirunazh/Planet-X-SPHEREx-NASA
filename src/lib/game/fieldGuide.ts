/**
 * Pure helpers for the field guide: plain-language labels, distances in
 * light-years and lookups that join a saved place back to the live NASA pins.
 */
import type { Pin } from '@/lib/store';
import type { VisitedPlace } from './store';

/** Light-years per parsec (IAU: 1 pc = 648000/π au; 1 ly = 63241.077 au). */
export const LY_PER_PC = 3.26156;

const trimZero = (text: string) => text.replace(/\.0$/, '');

function scaled(value: number, unit: string): string {
  return `${value < 9.95 ? trimZero(value.toFixed(1)) : Math.round(value).toLocaleString('en-US')} ${unit} light-years`;
}

/** Rounds to a sensible precision: '4.2 light-years', '304 light-years', '27,700 light-years', '2.5 million light-years'. */
export function formatLightYears(ly: number): string | null {
  if (!Number.isFinite(ly) || ly <= 0) return null;
  if (ly < 9.95) {
    const text = trimZero(ly.toFixed(1));
    return `${text} ${text === '1' ? 'light-year' : 'light-years'}`;
  }
  if (ly < 999.5) return `${Math.round(ly)} light-years`;
  if (ly < 999_500) return `${Number(ly.toPrecision(3)).toLocaleString('en-US')} light-years`;
  if (ly < 999.5e6) return scaled(ly / 1e6, 'million');
  return scaled(ly / 1e9, 'billion');
}

/** Distance label from a distance in parsecs, or null when the archive has none. */
export function distanceLabel(distPc: number | null | undefined): string | null {
  return typeof distPc === 'number' ? formatLightYears(distPc * LY_PER_PC) : null;
}

export function planetLabel(count: number | null | undefined): string | null {
  if (typeof count !== 'number' || !Number.isFinite(count) || count < 1) return null;
  return count === 1 ? '1 known planet' : `${Math.round(count)} known planets`;
}

/** Plain type of a place: 'Galaxy', 'Deep field', 'Star with planets', 'Star', 'Sky landmark', … */
export function placeTypeLabel(place: Pick<VisitedPlace, 'kind' | 'targetKind'>, hasPlanets = false): string {
  if (place.kind === 'host' || hasPlanets) return 'Star with planets';
  const kind = (place.targetKind ?? '').trim().toLowerCase();
  if (kind.includes('galaxy')) return 'Galaxy';
  if (kind === 'deep-field') return 'Deep field';
  if (kind === 'star') return 'Star';
  if (kind === 'reference') return 'Sky landmark';
  if (!kind) return 'Place in the sky';
  const words = kind.replace(/[-_]+/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** Name key for matching a featured target to its NASA Exoplanet Archive host ("Teegarden's Star"). */
export function nameKey(name: string): string {
  return name.normalize('NFKC').replace(/[‘’]/g, "'").replace(/\s+/g, ' ').trim().toLowerCase();
}

export function findHostByName(name: string, hosts: readonly Pin[]): Pin | null {
  const key = nameKey(name);
  return hosts.find((host) => nameKey(host.name) === key) ?? null;
}

/**
 * A featured star that is also an exoplanet host (Teegarden's Star, Barnard's
 * star) gets the archive's planet count and distance, so it counts as a star with
 * planets. Other pins are returned unchanged.
 */
export function withPlanetData(pin: Pin, hosts: readonly Pin[]): Pin {
  if (pin.kind !== 'target' || (pin.planetCount ?? 0) > 0) return pin;
  const host = findHostByName(pin.name, hosts);
  if (!host || !((host.planetCount ?? 0) > 0)) return pin;
  return { ...pin, planetCount: host.planetCount, distPc: pin.distPc ?? host.distPc };
}

export interface PinIndex {
  byId: Map<string, Pin>;
  hostsByName: Map<string, Pin>;
}

export function buildPinIndex(targets: readonly Pin[], hosts: readonly Pin[]): PinIndex {
  const byId = new Map<string, Pin>();
  for (const pin of [...targets, ...hosts]) byId.set(pin.id, pin);
  const hostsByName = new Map<string, Pin>();
  for (const host of hosts) if (!hostsByName.has(nameKey(host.name))) hostsByName.set(nameKey(host.name), host);
  return { byId, hostsByName };
}

/**
 * The live pin for a saved place. Host ids are list positions, so a pin found by
 * id must also carry the saved name; hosts fall back to a lookup by name.
 */
export function resolvePin(id: string, place: VisitedPlace, index: PinIndex): Pin | null {
  const pin = index.byId.get(id);
  if (pin && nameKey(pin.name) === nameKey(place.name)) return pin;
  return place.kind === 'host' ? index.hostsByName.get(nameKey(place.name)) ?? null : null;
}

/** The exoplanet host record behind a place, if any (the pin itself for host pins). */
export function planetHostFor(pin: Pin | null, place: VisitedPlace, index: PinIndex): Pin | null {
  if (pin?.kind === 'host') return pin;
  const host = index.hostsByName.get(nameKey(place.name));
  return host && (host.planetCount ?? 0) > 0 ? host : null;
}

/**
 * Link for a pin's source. Only http(s); a bare TAP query endpoint (which shows an
 * error page without a query) links to the archive's home page instead.
 */
export function sourceHref(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return null;
    if (/\/TAP\/sync\/?$/i.test(parsed.pathname) && !parsed.search) return `${parsed.origin}/`;
    return parsed.toString();
  } catch {
    return null;
  }
}

/** Field guide order: most recently added first. */
export function newestFirst(visited: Record<string, VisitedPlace>): { id: string; place: VisitedPlace }[] {
  return Object.entries(visited)
    .map(([id, place], order) => ({ id, place, order, time: Date.parse(place.firstVisit) || 0 }))
    .sort((a, b) => b.time - a.time || b.order - a.order)
    .map(({ id, place }) => ({ id, place }));
}

/**
 * Cards for the field guide, newest first, one per object: a featured star and
 * its exoplanet-host dot share a name, so their visits and stamps merge.
 */
export function fieldGuideEntries(visited: Record<string, VisitedPlace>): { id: string; place: VisitedPlace }[] {
  const cards = new Map<string, { id: string; place: VisitedPlace }>();
  for (const entry of newestFirst(visited)) {
    const key = nameKey(entry.place.name);
    const card = cards.get(key);
    if (!card) {
      cards.set(key, entry);
    } else {
      const extra = entry.place.surveys.filter((id) => !card.place.surveys.includes(id));
      if (extra.length) card.place = { ...card.place, surveys: [...card.place.surveys, ...extra] };
    }
  }
  return [...cards.values()];
}
