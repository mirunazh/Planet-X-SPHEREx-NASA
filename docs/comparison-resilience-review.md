# Resilient, progressive SPHEREx inventory

This metadata-stage record predates the [slideshow extension](comparison-slideshow-review.md), which now uses circular SIA queries for DR1/QR3 and renders requested FITS cutouts inside the app. The job/cache/recovery mechanisms described here remain in use.

Implements the approved resilient-inventory plan, retaining the existing SPHEREx-only comparison scope. Reprojection, aligned previews, FITS fetching and comparison playback remain later work.

## Runtime and API

`POST /api/comparison/searches` validates exact ICRS crop coordinates and filters, returning HTTP 202 with a job identifier immediately. Identical active searches share a job, including explicit refresh requests. The cache key contains the exact region, every filter, and adapter version; nearby regions are never substituted.

`GET /api/comparison/searches/{id}` supplies job state, per-collection state, attempts, errors, last update, verification date, queue time, result count, truncation and current version. Progress responses contain no product payloads. `GET /api/comparison/searches/{id}/results?version=…&cursor=…` reads an immutable snapshot in pages of 100. Cursors are offsets bound to an explicit version and search; invalid offsets, unknown jobs and expired versions fail explicitly. The retired synchronous `/inventory` endpoint returns 410.

One uvicorn process owns one background job runner. Up to four jobs can be admitted, with at most one executing and the others waiting at most 30 seconds. Execution is limited to 120 seconds including collection-slot waits, retries and TAP fallback. The shared async HTTPX client permits at most two archive requests globally, and wraps the entire connect/read/redirect operation in a maximum 25-second deadline. Cancellation closes requests instead of leaving blocking threads behind.

Network failures and HTTP 429/502/503/504 permit two retries, with exponential delay plus jitter. A numeric or HTTP-date `Retry-After` takes precedence if it fits the remaining execution budget. Five consecutive endpoint failures open a circuit for 60 seconds; after cooldown only one probe may run. SIA and TAP have separate circuits. Suspension is visible on the affected collections. Native TAP can supply products when SIA fails but never certifies SIA collection/release completeness.

Each collection publishes normalized, URL-deduplicated metadata immediately. A timeout, invalid response, failed refresh or restart retains previously published metadata. Retries skip successful collections while they are still fresh; stale successful collections are revalidated. A successful empty response may replace an old collection, whereas an error cannot become a negative coverage result.

## Storage and cache

SQLite jobs, collection metadata, immutable versions and bounded request diagnostics live in `/data/inventory.sqlite3`, backed by Compose's `comparison-metadata` volume. Interrupted queued/running jobs become `interrupted` on process startup, with their versions still accessible. Last known archive connectivity is restored from persistent diagnostics. `/health` remains healthy during an IRSA outage.

Successful positive metadata is fresh for 24 hours and usable for seven days. Complete empty coverage is fresh for 15 minutes. Stale metadata returns immediately while a refresh is queued. Errors are never reused as complete empty coverage. Failed collections keep their own earlier verification date.

`METADATA_CACHE_BYTES` defaults to 268435456 (256 MiB); values below 1 MiB are rejected. UTF-8 metadata payload accounting covers jobs, versions and diagnostic records. Expired jobs are removed first, followed by least recently used obsolete versions and terminal jobs. Active jobs/current versions are protected. Four-job admission, reserved capacity, and normalized collection payload limits prevent active work from exhausting the budget: each collection retains at most 1 MiB (or cache budget / 128 for smaller configurations), with explicit truncation if reached. Existing 8 MiB HTTP, 2,001-row archive and 2,000-product merged limits also apply. SQLite uses full auto-vacuum and WAL checkpointing; database/index overhead is additional to the payload budget. The image/FITS cache is separate future work.

## Browser behavior

The page polls every two seconds while visible and stops tracking an old region/filter generation, including rejecting late responses even if fetch ignores cancellation. Refresh keeps the displayed metadata and A/B selections. Failed creation/refresh requests stay visible and cannot be accidentally cleared by polling an older job.

The first available populated version is displayed immediately. Later versions are offered through **Show updated inventory**; existing rows and pages remain fixed until the user adopts an update. Pagination uses the displayed version's original job identifier even after refresh creates a new job. Verification labels belong to that displayed immutable version. Adopting a newer inventory preserves A/B selections.

The UI distinguishes searching/queued, partial results, complete results, complete empty coverage, archive unavailability, service errors, budget exhaustion and interruption. Technical collection information is collapsed by default. The incumbent dark panels, cyan controls and responsive inventory remain intact.

## Independent review

A separate agent reviewed persistence, caching, deadlines, circuits, API validation, browser races and pagination. Its findings were corrected: stale successful collections are refreshed; displayed versions carry their own verification dates; cache accounting uses UTF-8 bytes and bounded admission; invalid HTTP-200 metadata has an accurate error; page one stays fixed; and failed refresh creation cannot be cleared by polling the previous job. Regression tests cover these cases. Browser verification also caught and fixed native `fetch` receiver binding, which Node mocks had not exposed.

## Verification

- 191 TypeScript tests across 21 files pass, including polling visibility, late response rejection, refresh preservation, stable versions and proxy contracts.
- 20 Python tests pass, covering HTTP contracts, progressive publication before slow collections finish, active-job deduplication, the global two-request limit, immutable 100/100/5 pagination, restart recovery, cache expiry/eviction/admission, stale successful collection revalidation, failed-collection retries, execution/queue deadlines, Retry-After, network retries, circuit cooldown/single probe, invalid XML and unsafe redirects.
- Type checking, optimized production build and compiled production-handler smoke checks pass. The UI detector reports no findings.
- Docker web and comparison images build and the Compose stack starts successfully with the metadata volume. The final reviewed web and comparison images were rebuilt and started. A search created before container replacement remained readable through the rebuilt web proxy, with the same job ID, immutable version and `timed_out` state. Persisted IRSA failure diagnostics were restored while process health remained healthy.
- A real browser loaded the production comparison component against the isolated deterministic service fixture. It showed the first inventory version, later-version availability, independently selectable A/B controls, and a failed refresh retaining 100 displayed products and both selected records. Collapsing/reopening the inventory retained selections. A desktop screenshot was inspected. Browser control limitations prevent reliable pointer interactions in this session; keyboard actions were used. Mobile and manual pagination acceptance can be repeated with the fixture below; automated pagination tests pass.
- Live SPHEREx metadata search at RA 210.86253°, Dec 54.35504°, width 10′: POST returned its identifier in 81 ms. SIA requests timed out, opened the endpoint circuit, and TAP fallback also timed out. The job reached its 120-second execution limit (observed at the next poll at 121.2 s), preserved a readable empty *error* snapshot, and process health remained `ok: true` with separate IRSA `ok: false`. This does not establish absence of coverage or successful live inventory availability.

## Repeatable acceptance

From the repository root:

```sh
npm test
npm run typecheck
npm run build
npm run test:production
PYTHONPATH=services/comparison services/comparison/.venv/bin/python -m unittest discover -s services/comparison/tests -v
docker compose up --build -d
docker compose ps
python3 scripts/verify-comparison-live.py
```

For an isolated deterministic browser run, stop any prior fixture instances, then use two terminals (no live IRSA/FITS traffic):

```sh
cd services/comparison
.venv/bin/python tests/browser_fixture.py
```

```sh
# From repository root, after npm run build. Uses the production component.
COMPARISON_SERVICE_URL=http://127.0.0.1:8001 npm start -- --port 3100
```

1. Open `http://127.0.0.1:3100/compare?ra=0&dec=0&size=10`. A fast collection supplies 125 products; two slow collections take 12 seconds, with others following. The first 100 appear before completion. Inspect the collapsed collection details.
2. Choose A and B. Load the next 100; the displayed old version contains exactly 125 distinct products. Later results offer an explicit update without rearranging displayed rows.
3. Adopt the updated inventory. It contains 126 products, with a newly inserted lower-wavelength product. A/B remain selected.
4. Refresh. All subsequent fixture jobs return invalid archive metadata. Verify partial/error diagnostics, a suspended SIA endpoint after repeated failures, retained rows, retained A/B, and the original verification date.
5. Collapse/reopen filters and inventory. At a 390-pixel viewport check that actions, status and navigation remain reachable.
6. Change filters while a request is pending. The old job cannot alter the current view. Background the page; polling stops until it becomes visible.
7. Restart the comparison service and read an existing job ID/version again. Interrupted work is labelled; already persisted metadata remains readable. Do not use `docker compose down -v`, which deliberately removes the metadata volume.
