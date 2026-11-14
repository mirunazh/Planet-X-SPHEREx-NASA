# SPHEREx time viewer (web)

The Next.js app for the five challenge targets: a time player over the SPHEREx exposures, target
markers, the "it moved" check and shareable URL state. It lives in `web/`, next to the team's
earlier app at the repository root, and does not depend on it.

## Commands

Run from `web/`:

```sh
npm install      # .npmrc sets ignore-scripts and legacy-peer-deps
npm run dev      # http://localhost:3100
npm test         # vitest
npm run build    # production build (Turbopack)
npm run typecheck
```

## Data

`npm run sync-assets` copies the mission assets and the fast-mover catalogue from `../assets`
(`missions/` and `movers-pm500.json`) into `public/data`, which git ignores. It runs on its own
before `dev`, `build` and `test`; it stops with an error if `../assets` has not been built yet.

## The two libraries

`spherex-core` (the browser data path: FITS, WCS, S3 range reads, stacking) and `missions-core`
(the measuring logic: motion, parallax, score, report) live in `../packages/` as plain TypeScript
source with no build step. They are linked, not published:

- `package.json` has `"spherex-core": "file:../packages/spherex-core"` and the same for
  `missions-core`; `npm install` makes `node_modules/<name>` a symlink to the package folder.
  Each package's `exports` points at `./src/index.ts`.
- `next.config.ts` sets `turbopack.root` and `outputFileTracingRoot` to the repository root, so
  files outside `web/` may be compiled, and lists both in `transpilePackages`.
- The packages import siblings as `./x.js` (TypeScript ESM style). TypeScript (`moduleResolution:
  "bundler"`) and vitest map that to `x.ts` on their own; Turbopack does not, so a rule in
  `next.config.ts` runs `scripts/strip-js-ext-loader.cjs` over the `.ts` files under the two
  packages' `src/` to drop the `.js` from relative imports.
- `src/lib/packages.smoke.test.ts` imports one function from each library and fails if the
  link breaks.

Import them as `import { separationArcsec } from 'spherex-core'` in server code, client
components and tests alike. Each package keeps its own tests: `npx vitest run` inside the
package folder.
