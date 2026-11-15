# Stage 6: final stabilization

Implemented after explicit user authorization, preserving the earlier stage-4/5 local changes. No deployment or commit was made.

## Fixes and preparation

- Image transfers now have a 30-second deadline that covers both fetching headers and reading the response body. The attempt's timeout leaves the cache entry eligible for ordinary error handling/retry. Parent cancellation is forwarded and late responses cannot restore obsolete entries. Timers/listeners are removed on settlement. Browser image decoding itself is not cancellable and is still guarded by entry identity and bitmap cleanup.
- Exhausted detail-download errors can restart through **Retry details** or a browser `online` event. Only protected/current-view failures restart; a manual retry can restrict the displayed layer prefix. Resident images, known tile 404s and in-flight downloads remain intact, and the six-request concurrency limit is preserved. Tile retries after ordinary transient errors retain their existing three-attempt backoff.
- Reconnection also retries a failed requested preview and failed place data. A healthy or already-loading preview/data set is left alone. The old displayed layer remains visible and the selected layer/view do not change. **Retry layer** and **Retry places** remain available if a browser does not emit `online` or the service is still unreachable.
- The viewer's snapshot error now explains the problem and offers Retry places; it no longer asks visitors to run a development command.
- The NED route rejects non-finite or out-of-range coordinates with an uncached 502, permitting a later correct response to recover. Malformed preferred names fall back to the requested name, and object types must be strings. The client also guards name/error labels and the success flag, so an upstream object cannot become an invalid React child.
- The independent reviewer found the malformed-name rendering case; it was corrected and re-reviewed. **Stage 6 was approved without blocking findings.**
- Added repeatable production-handler and CPU checks plus [the demo checklist](demo-checklist.md). The NASA orientation script now has per-request deadlines instead of potentially waiting indefinitely.

## Verification completed

- `npm test`: **175 tests / 18 files pass**. Added transfer timeouts (including stalled bodies), late abort responses, terminal-error recovery, prefix/concurrency preservation, reconnect/cleanup, malformed NED data, API cache/errors/rate refill, and actual geometry ray intersections.
- `npm run typecheck`: passes.
- `npm run build`: passes.
- `npm run test:production`: passes against the latest build, with **21 local HTTP requests**, including the production page, eight referenced JS/CSS assets, production security headers, the bundled target-position snapshot, compiled name lookup/cache/error recovery, malformed label handling and the 404 page. It invokes Next's real production router with in-memory HTTP request/response streams, without listening on a port. **NED responses are simulated.** This does not hydrate/render the browser application.
- Offline geometric regression: 72 asymmetric ray directions across all 12 HEALPix faces place detail and preview pixels consistently; additional order-4/5/7/9 meshes retain their orientation and back-face visibility. Existing north-up/east-left, pole, coordinate and RA-wrap tests also pass. This verifies the code's mapping, not newly downloaded image registration.
- `git diff --check`: passes. Impeccable HUD/CSS detector: no findings.
- Reviewer independently reran all 175 tests, TypeScript and diff checks; also ran the production smoke before the final malformed-label case was added. Final build/smoke were rerun by the implementation agent after that fix.

## CPU measurements

`npm run benchmark`, Node v26.13.0, local ARM64 environment. Times are milliseconds per operation; the query/sort workloads use 16 combinations of destinations and FOVs per operation. The mobile entry changes the resolution/tile profile on the same host; it is **not a phone measurement**.

| Workload | Mean | p99 |
| --- | ---: | ---: |
| Cold whole-sky geometry, 768 cells | 5.3504 | 8.5072 |
| One order-3 detail geometry | 0.0222 | 0.0340 |
| One order-9 detail geometry | 0.0014 | 0.0022 |
| Desktop visible-cell queries/sorting, 16 views | 0.4631 | 0.5594 |
| Compact visible-cell queries/sorting, 16 views | 0.1894 | 0.2833 |

These measurements exclude image decoding, rendering, texture uploads, full renderer frame work and browser overhead. Automated renderer tests separately enforce one preview transfer per frame and at most two detail admissions per desktop frame / one per compact frame. They do not establish real GPU cost, FPS or smoothness.

## Verification limits and acceptance

- The connected-browser inventory is empty. Earlier viewer-server attempts failed with `listen EPERM 127.0.0.1:3000`, and a headless launch failed with macOS Mach permission denial. No sandbox bypass was attempted.
- Consequently real production hydration, layout, focus, touch, live NASA/NED availability, GPU/context recovery and desktop/mobile FPS remain unverified here. The in-process production smoke and CPU benchmark do not replace them.

The final implementation is ready for user acceptance via [demo-checklist.md](demo-checklist.md). There are no further implementation stages in the approved plan; the remaining work is the listed real-browser/live-data acceptance checks and any fixes those checks reveal.
