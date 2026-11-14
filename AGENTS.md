# Repository Guidelines

## Project Structure & Module Organization

SPHEREx Sky Navigator is a Next.js App Router application using React, TypeScript, React Three Fiber, and Zustand.

- `src/app/`: pages, global styles, and the NED name-resolution API at `api/resolve/route.ts`.
- `src/components/sky/`: WebGL survey tiles, grids, pins, and camera controls; `src/components/hud/`: navigation and information panels.
- `src/lib/sky/`: pure coordinate, camera, parsing, formatting, and HiPS utilities. Other `src/lib/` modules manage state, navigation, pins, and URL synchronization.
- `tests/`: unit tests. `public/data/`: NASA-derived JSON snapshots.
- `scripts/`: data fetching and orientation verification. `docs/`: architecture plans and image-source rationale.

## Build, Test, and Development Commands

Use Node.js 20.9 or newer and install dependencies with `npm ci`.

- `npm run dev`: start development at `http://localhost:3000`.
- `npm run build` followed by `npm start`: build and serve production.
- `npm run typecheck`: run TypeScript checks without emitting files.
- `npm test`: run the Vitest suite once.
- `npm run data`: regenerate `public/data/*.json` from NASA services with provenance.
- `npm run verify:hips`: validate tile orientation against NASA data; requires network access.

## Coding Style & Naming Conventions

Follow existing TypeScript conventions: two-space indentation, single-quoted strings, semicolons, and strict typing. Use PascalCase for React components and their filenames, camelCase for functions and variables, and `use` prefixes for hooks. Use the `@/` alias for imports from `src/`. Keep scientific calculations in pure `src/lib/sky/` functions. No dedicated linter or formatter is configured.

## Testing Guidelines

Vitest runs in Node and discovers `tests/**/*.test.ts`. Name tests after the module, such as `coords.test.ts`, and use descriptive `describe`/`it` cases. Cover coordinate round trips, poles, RA wraparound, numerical tolerances, and HiPS addressing when changing related logic. No coverage threshold is configured. Before submitting, run tests, type checking, and a production build; manually verify viewer changes in the browser.

## Commit & Pull Request Guidelines

History is limited; the feature commit uses `feat: <description>`. Follow that concise, imperative pattern with an appropriate prefix. PRs should explain the change, link relevant issues, and report validation. Include screenshots for visual changes and source/provenance details for data changes.

## Data & Configuration

Preserve the NASA-only data policy, credits, and snapshot provenance. Stream HiPS tiles directly from IRSA. Review `next.config.ts` security headers when changing external resources, and keep secrets out of version control.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
