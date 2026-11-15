// Builds the static data the navigator ships with, from NASA services only.
// Every file records its provenance: service, query, URL and retrieval time.
//
//   public/data/exoplanet-hosts.json  NASA Exoplanet Archive (pscomppars)
//   public/data/targets.json          NED positions, IRSA SPHEREx deep fields,
//                                     IAU-defined reference points
//
// Run: npm run data

import { mkdir, writeFile } from 'node:fs/promises';

const OUT = new URL('../public/data/', import.meta.url);
const HEADERS = { 'User-Agent': 'spherex-sky-navigator/0.1 (build-time data snapshot)' };
const retrievedAt = new Date().toISOString();

async function get(url, { timeoutMs = 120000, as = 'json' } = {}) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { headers: HEADERS, signal: ctl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return as === 'json' ? await res.json() : await res.text();
  } finally {
    clearTimeout(timer);
  }
}

const round = (v, d) => (v == null || Number.isNaN(Number(v)) ? null : Number(Number(v).toFixed(d)));

// --- 1. Exoplanet host stars --------------------------------------------------
const EA_TAP = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync';
const EA_QUERY = 'select pl_name,hostname,ra,dec,sy_dist,sy_pnum,sy_kmag,disc_year,disc_facility from pscomppars';

async function exoplanetHosts() {
  const url = `${EA_TAP}?query=${encodeURIComponent(EA_QUERY)}&format=json`;
  const rows = await get(url, { timeoutMs: 240000 });
  const byHost = new Map();
  for (const r of rows) {
    if (r.ra == null || r.dec == null) continue;
    let h = byHost.get(r.hostname);
    if (!h) {
      h = {
        name: r.hostname,
        ra: round(r.ra, 6),
        dec: round(r.dec, 6),
        distPc: round(r.sy_dist, 2),
        planetCount: r.sy_pnum ?? null,
        kmag: round(r.sy_kmag, 2),
        planets: [],
        firstDiscovery: r.disc_year ?? null,
        facilities: new Set(),
      };
      byHost.set(r.hostname, h);
    }
    h.planets.push(r.pl_name);
    if (r.disc_year && (!h.firstDiscovery || r.disc_year < h.firstDiscovery)) h.firstDiscovery = r.disc_year;
    if (r.disc_facility) h.facilities.add(r.disc_facility);
  }
  const hosts = [...byHost.values()]
    .map((h) => ({ ...h, planets: h.planets.sort(), facilities: [...h.facilities].sort() }))
    .sort((a, b) => a.name.localeCompare(b.name));
  return {
    rows,
    file: {
      provenance: {
        service: 'NASA Exoplanet Archive (NExScI / IPAC)',
        endpoint: EA_TAP,
        table: 'pscomppars',
        query: EA_QUERY,
        retrievedAt,
        planetRows: rows.length,
        hostCount: hosts.length,
        note: 'One entry per host star; positions are the archive composite system positions (ICRS, degrees).',
      },
      hosts,
    },
  };
}

// --- 2. Featured targets ------------------------------------------------------
const NED = 'https://ned.ipac.caltech.edu/srs/ObjectLookup';
const NED_TARGETS = [
  { id: 'm31', query: 'M31', name: 'Andromeda Galaxy (M31)', fov: 4, kind: 'galaxy', description: 'The nearest large spiral galaxy.' },
  { id: 'm33', query: 'M33', name: 'Triangulum Galaxy (M33)', fov: 1.5, kind: 'galaxy', description: 'A nearby face-on spiral in the Local Group.' },
  { id: 'm101', query: 'M101', name: 'Pinwheel Galaxy (M101)', fov: 0.6, kind: 'galaxy', description: 'A big spiral galaxy seen face-on, about 21 million light-years away.' },
  { id: 'm81', query: 'M81', name: "Bode's Galaxy (M81)", fov: 0.8, kind: 'galaxy', description: 'Bright spiral galaxy in Ursa Major.' },
  { id: 'm51', query: 'M51', name: 'Whirlpool Galaxy (M51)', fov: 0.4, kind: 'galaxy', description: 'Interacting spiral galaxy pair.' },
  { id: 'lmc', query: 'LMC', name: 'Large Magellanic Cloud', fov: 12, kind: 'galaxy', description: 'Satellite galaxy of the Milky Way, next to the SPHEREx southern deep field.' },
  { id: 'smc', query: 'SMC', name: 'Small Magellanic Cloud', fov: 5, kind: 'galaxy', description: 'Satellite galaxy of the Milky Way.' },
];

async function nedTargets() {
  const out = [];
  for (const t of NED_TARGETS) {
    const url = `${NED}?name=${encodeURIComponent(t.query)}`;
    const json = await get(url, { timeoutMs: 30000 });
    if (json.ResultCode !== 3 || !json.Preferred?.Position) {
      console.warn(`  NED did not resolve ${t.query} (ResultCode ${json.ResultCode}); skipped`);
      continue;
    }
    out.push({
      id: t.id,
      name: t.name,
      kind: t.kind,
      ra: round(json.Preferred.Position.RA, 7),
      dec: round(json.Preferred.Position.Dec, 7),
      fov: t.fov,
      description: t.description,
      source: { service: 'NED (NASA/IPAC Extragalactic Database)', url, resolvedName: json.Preferred.Name, retrievedAt },
    });
  }
  return out;
}

const IRSA_TAP = 'https://irsa.ipac.caltech.edu/TAP/sync';
const DEEP_QUERY =
  "SELECT CASE WHEN s_dec > 0 THEN 'north' ELSE 'south' END AS field, COUNT(*) AS n, AVG(s_ra) AS ra, AVG(s_dec) AS dec " +
  "FROM spherex.obscore WHERE obs_collection = 'spherex_dr1_deep' GROUP BY CASE WHEN s_dec > 0 THEN 'north' ELSE 'south' END";

async function spherexDeepFields() {
  const url = `${IRSA_TAP}?LANG=ADQL&FORMAT=csv&QUERY=${encodeURIComponent(DEEP_QUERY)}`;
  const csv = await get(url, { timeoutMs: 180000, as: 'text' });
  const lines = csv.trim().split(/\r?\n/).slice(1);
  return lines.map((line) => {
    const [field, n, ra, dec] = line.split(',');
    return {
      id: `spherex-deep-${field}`,
      name: `SPHEREx Deep Field (${field})`,
      kind: 'deep-field',
      ra: round(ra, 4),
      dec: round(dec, 4),
      fov: 20,
      description: `SPHEREx looks here on every orbit, so this patch has its deepest coverage: ${Number(n).toLocaleString('en-US')} photos in the first data release.`,
      source: { service: 'IRSA TAP, spherex.obscore (spherex_dr1_deep)', url: IRSA_TAP, query: DEEP_QUERY, retrievedAt },
    };
  });
}

function referencePoints() {
  const eps = (84381.406 / 3600) * (Math.PI / 180);
  const necDec = 90 - (eps * 180) / Math.PI;
  const iau = { service: 'IAU definition (computed)', retrievedAt };
  return [
    {
      id: 'galactic-centre',
      name: 'Galactic Centre',
      kind: 'reference',
      ra: 266.40499,
      dec: -28.93617,
      fov: 10,
      description: 'Origin of galactic coordinates (l = 0°, b = 0°), Hipparcos definition.',
      source: { ...iau, note: 'Galactic frame, ESA Hipparcos catalogue Vol. 1 §1.5.3' },
    },
    {
      id: 'north-ecliptic-pole',
      name: 'North Ecliptic Pole',
      kind: 'reference',
      ra: 270,
      dec: round(necDec, 6),
      fov: 30,
      description: 'SPHEREx scans the sky around the ecliptic poles; its northern deep field sits here.',
      source: { ...iau, note: 'Mean obliquity at J2000.0, IAU 2006 (84381.406″)' },
    },
    {
      id: 'south-ecliptic-pole',
      name: 'South Ecliptic Pole',
      kind: 'reference',
      ra: 90,
      dec: round(-necDec, 6),
      fov: 30,
      description: 'The southern counterpart; the SPHEREx deep field is offset from it.',
      source: { ...iau, note: 'Mean obliquity at J2000.0, IAU 2006 (84381.406″)' },
    },
  ];
}

function starTargets(planetRows) {
  const pick = (pattern) => planetRows.find((r) => pattern.test(r.hostname));
  const specs = [
    { pattern: /^Teegarden/i, id: 'teegardens-star', fov: 0.3, description: 'A small red star 12.5 light-years away, with Earth-sized planets. It moves fast across the sky, so its marker (where it was around 2015) sits a little beside it in older and newer photos.' },
    { pattern: /^Barnard/i, id: 'barnards-star', fov: 0.3, description: 'The star that moves fastest across our sky. Its marker shows where it was around 2015, so the star sits clearly beside it in older and newer photos.' },
  ];
  const out = [];
  for (const s of specs) {
    const r = pick(s.pattern);
    if (!r) continue;
    out.push({
      id: s.id,
      name: r.hostname,
      kind: 'star',
      ra: round(r.ra, 6),
      dec: round(r.dec, 6),
      fov: s.fov,
      description: s.description,
      source: { service: 'NASA Exoplanet Archive (pscomppars)', url: EA_TAP, retrievedAt },
    });
  }
  return out;
}

async function main() {
  await mkdir(OUT, { recursive: true });

  console.log('NASA Exoplanet Archive: host stars...');
  const { rows, file: hostsFile } = await exoplanetHosts();
  await writeFile(new URL('exoplanet-hosts.json', OUT), JSON.stringify(hostsFile));
  console.log(`  ${hostsFile.provenance.planetRows} planets, ${hostsFile.provenance.hostCount} host stars`);

  console.log('NED: featured galaxies...');
  const galaxies = await nedTargets();
  console.log(`  ${galaxies.length} resolved`);

  console.log('IRSA: SPHEREx deep fields...');
  const deep = await spherexDeepFields();
  console.log(`  ${deep.length} fields`);

  const targets = [...referencePoints(), ...deep, ...galaxies, ...starTargets(rows)];
  await writeFile(
    new URL('targets.json', OUT),
    JSON.stringify(
      {
        provenance: {
          note: 'Featured targets. Each entry records the NASA service (or IAU definition) its position comes from.',
          retrievedAt,
        },
        targets,
      },
      null,
      2,
    ),
  );
  console.log(`Wrote ${targets.length} targets and ${hostsFile.hosts.length} host stars to public/data/`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
