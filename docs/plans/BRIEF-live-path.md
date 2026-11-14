# Brief: live path, any typed coordinate becomes a film

Status on 14 November 2026, 19:30 EET: not started. This is the full task, ready to hand to a person or an assistant. Start from branch `wip/spherex-time-viewer`.

## Goal

The app in `web/` plays five precomputed targets from static files. The challenge asks for ANY typed RA/Dec. The library `packages/spherex-core` (dependency `spherex-core` in `web`) already does the hard part in the browser: it lists the exposures that cover a position, reads small pixel boxes from NASA's public S3 bucket with Range requests, reprojects, stacks per visit and returns an object shaped like the static mission manifests. It matches the Python reference exactly on real data. The task is to wire it into `/watch` with an honest state for every way it can fail.

## Read first

- `packages/spherex-core/README.md` and `src/`: `sia.ts` (`handleObservationsRequest`, the `complete` flag, per-collection status), `live.ts` (`buildLiveMission`, `LiveOptions`, progress events), `stack.ts` (`DETECTOR_GROUPS`, `availableGroups`), `astrometry.ts` (`whatWasHere`).
- All of `web/src`: how a static mission reaches the player, the URL state, the strings module, the store, the "it moved" check, the placeholder shown today for a coordinate without a static mission.
- `docs/research/09-s3-range-reader-and-remaining-targets.md`, section "Implications for the viewer".
- `docs/research/05-irsa-cutout-cors-probe.md`: the archive sends no CORS headers, the S3 bucket does.
- `docs/research/15-design-language-and-accessibility.md`, sections C and D5: wording of loading, empty and error states.

## Measured facts

With a healthy archive: exposure list in 2 to 3 s, first frame at about 4.6 s, last of about 95 frames at 23 to 32 s, 65 to 73 MB, 6 requests in parallel, no S3 failures. The archive's list service (IRSA SIA, four collections) sometimes answers HTTP 502 for minutes. The library then returns status 200 with `complete: false` and per-collection `ok: false`, possibly with zero exposures. So "no coverage" may be said only when `complete` is true.

Found while reading the code (changes the plan):

- `buildLiveMission` has a fixed 121 by 121 grid. The smaller 3 arcmin field needs its own builder in `web/src/live/` or a new option in the package.
- `MissionView` loads frames and manifests by id only. Feeding it live data needs an optional `manifest` prop on `MissionView`, a `provideFrame()` export in `web/src/lib/data.ts`, and handling of `kind: 'field'` (today a plain field would be badged "Changes brightness").

## What to build

1. Server route `web/src/app/api/observations/route.ts` (Node runtime): GET with `ra` and `dec`, delegating to `handleObservationsRequest`. It validates input and only ever calls the archive's host; add nothing that could turn it into an open proxy. Timeout. Cache headers: `s-maxage=3600, stale-while-revalidate=86400` when `complete` is true, no caching of incomplete answers.
2. One client module, `listExposures(ra, dec, signal)`, backed by that route, written so the static index (`packages/spherex-index`) can replace or precede it by changing this one file.
3. Live loading on `/watch` for a coordinate with no static mission: list, choose the detector group (default: the best of `availableGroups`; the user can switch, each group with a plain label and its wavelength range), build with `buildLiveMission`, feed the SAME player and markers by adapting the live result to the viewer's mission model (frames stay in memory as Float32Array). Show frames as they arrive (single photos first, per-visit stacks when the build ends), progress in words and numbers ("34 of 95 photos, 21 MB"), a Cancel button, cancellation on navigation (AbortSignal). If the "it moved" check finds a known fast mover for the typed position, pass its astrometry so the predicted marker follows it, and keep the typed position marked.
4. Every state in plain language, keeping the user's input: listing; loading; ready; partial list ("NASA's archive did not answer for part of the sky survey. Showing what we have." with Retry); no photos of this patch yet (only when the list is complete), with the five targets offered; fewer than two visits (nothing to compare yet: say so, still show the photos); network failure; cancelled. Errors say what happened and what to do next. Announce state changes in a polite live region.
5. A smaller field for slow connections and phones (3 arcmin instead of 6: about half the data), chosen automatically when the browser reports a constrained connection or `saveData`, switchable, written into the URL.
6. URL state: coordinates, group, field size, mode and frame restore the same view on reload (the build runs again; say so while it loads).
7. Remove the placeholder that says live loading is "the next milestone".

## Non-goals

No visual redesign (it follows separately; keep markup semantic and reuse existing tokens). No new dependency. No change to the internals of the canvas, player or time-axis components beyond optional props. No accounts, nothing stored.

## Test plan

- Unit tests (vitest, offline, mocked fetch; reuse `packages/spherex-core/test` fixtures): the route (bad input rejected, partial answer passed through with the flag, cache headers by case), the adapter, the state machine for every state in item 4, the URL round trip with the new fields.
- `npx tsc --noEmit`, `npm test`, `npm run build` pass. Run `node scripts/sync-assets.mjs` once before the tests (`web/.npmrc` disables the `pretest` hook).
- Real browser, real network: (a) `331.0850 -56.7950` (near Epsilon Indi B; force the live path with a query flag if the app routes it to the static mission): expect 5 visits, the star near the centre; note seconds to first frame and to completion; (b) `30 -40`: an ordinary field plays; (c) `08h55m10.831s -07d14m42.53s`: the "it moved" answer still appears and leads to WISE 0855; (d) simulate the archive failing and check the partial state and Retry; (e) Cancel mid-load, reload the URL, the view restores; (f) a phone viewport (390 x 844). Zero console errors. Screenshots to `web/docs/screens/live-*.png`.

## Hard constraints

At most 6 parallel requests to S3 and 2 to the archive; no retry storms. No secret, no key (none is needed). No NASA logo. No em dash character (U+2014) anywhere, interface text included. Commit with explicit paths on a `wip/` branch; never push `main`.
