// Copies the mission assets and the mover catalogue into public/data so they ship as static files.
// Copy, not symlink: static hosts do not follow links outside the app.
import { cpSync, existsSync, rmSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const web = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const assets = resolve(web, '..', 'assets');
const out = join(web, 'public', 'data');

for (const p of [join(assets, 'missions', 'index.json'), join(assets, 'movers-pm500.json')]) {
  if (!existsSync(p)) {
    console.error(`sync-assets: missing ${p}; run the asset pipeline first`);
    process.exit(1);
  }
}
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(join(assets, 'missions'), join(out, 'missions'), { recursive: true, dereference: true });
cpSync(join(assets, 'movers-pm500.json'), join(out, 'movers-pm500.json'));
console.log(`sync-assets: copied missions and movers-pm500.json to ${out}`);
