# IRSA comparison — stage 1

Historical stage-1 record. The synchronous API, in-memory snapshot limits and recovery behavior below are superseded by the [resilient inventory implementation and acceptance record](comparison-resilience-review.md).

Implemented the first stage of the approved comparison plan. The user subsequently narrowed comparison discovery to SPHEREx only, superseding the original multi-mission scope. The mission selector and discovery adapters for other missions were removed; API requests for other missions are rejected before archive access. Stop for user acceptance before implementing reprojection and image previews (stage 2).

## Behavior

- **Compare images** is always available in the navigator. The square follows the actual screen centre, independently of selected/locked targets. It starts at the smaller visible field or 10 arcmin (minimum 0.5), and adjusts from 0.5 to 30 arcmin.
- **Find images** stops camera motion, captures the current ICRS centre, and opens `/compare?ra=…&dec=…&size=…&return=…`. The return link retains navigator position, field of view, survey, and SPHEREx frame.
- The comparison page exposes SPHEREx detector band text, wavelength interval (microns), observation dates, and individual/combined product filters. Only SPHEREx collections are queried. The inventory and filters collapse, including on mobile. A/B selections show metadata; aligned pixel previews belong to stage 2.
- A FastAPI service runs alongside Next.js in Compose. The browser talks only to `/api/comparison/inventory` and `/api/comparison/health`; no browser-supplied archive URL is fetched.
- SIAv2 queries use spherical TAN crop polygons across RA zero and at the poles. SPHEREx has a native TAP plane/artifact fallback. Only IRSA FITS image/cube artifacts are exposed; masks and ancillary products are excluded where identified in metadata or filenames.
- The page shows product identifiers, collection, spectral metadata, observation intervals, footprint-intersection status, metadata source, original FITS link, and SPHEREx archive errors. Missing dates and spectral values remain unknown. SPHEREx detector wavelength intervals are never presented as exact wavelengths at the target position.

## Pagination and limits

IRSA documents `MAXREC` for SIAv2, without offset pagination. The service retrieves bounded metadata snapshots, then delivers stable pages of 100. It never downloads image pixels while discovering inventory. Each collection query has a 2,001-row limit and 8 MiB response limit; the merged mission inventory retains at most 2,000 products. Archive `OVERFLOW`, safety limits, and failed collections produce explicit incomplete-result warnings. Band and product filters apply to normalized metadata; date and wavelength constraints are also sent to IRSA so they can narrow a truncated query.

Sixteen snapshots are retained for at most 15 minutes. Cursors are opaque, query-bound, and expire with their snapshot. An expired page can be recovered with Refresh search. These are metadata snapshots; the 2 GB image cache and processing queue are stage 5 work.

## Independent review

A separate review agent identified stale camera animations on return, acceptance of non-FITS native TAP artifacts, and local virtualenv files in the service image. All three were corrected, with regressions for navigation and artifact validation. The inventory also gained a collapsible section following the mobile review.

The SPHEREx-only revision also received independent review. Its unit tests confirm that other missions are rejected before archive access. The running browser page was checked through its accessibility tree: it shows the SPHEREx inventory and detector filter, with no mission selector or other mission panels. Both Docker images were rebuilt for this scope revision.

## Validation in this session

- TypeScript unit tests, Python metadata unit tests, type checking, and optimized Next.js build pass.
- The production HTTP handler is exercised without opening a port, covering the comparison route, compiled API proxies, and existing application checks. Upstream services are simulated for this check.
- `docker compose config --quiet` passes. Running/building the Compose stack is unverified: the sandbox denies access to Docker's socket.
- A standalone local browser fixture rendered the real comparison component with simulated loaded/empty/failed mission responses. The native accessibility tree confirms the controls and product metadata. Clicking Use as A updated A independently; collapsing the inventory hid its rows while preserving A/B selections. The screenshot tool returned a blank image, so visual desktop/mobile acceptance remains pending.
- Live IRSA queries and installing the FastAPI runtime are unverified: shell DNS resolution for IRSA/PyPI is denied; the web reader could read IRSA documentation but could not retrieve query responses. The FastAPI HTTP process therefore has not been run here. Python core tests run without third-party dependencies.

## Acceptance steps

### Follow-up: live runtime diagnosis

The subsequent Docker-enabled check supersedes the runtime limitations above: both images now build and both containers run successfully. There were two web servers on port 3000: Docker on IPv4 and an existing Next.js dev server on IPv6. The browser's `localhost` reached the dev server, whose default inventory URL could not reach the unpublished Python container. Compose now publishes the Python service on `127.0.0.1:8000`; health checks through `localhost:3000`, `[::1]:3000`, and `127.0.0.1:3000` all return 200.

Live SPHEREx discovery at the screenshot's position (210.86253°, 54.35504°, 10 arcmin) received archive HTTP 502 errors or timeouts. The UI distinguishes local connectivity, service timeout/invalid response and archive failures. Malformed JSON and invalid successful inventory contracts are rejected at the proxy boundary.

From the project directory:

```sh
docker compose up --build -d
docker compose ps
curl http://localhost:3000/api/comparison/health
```

1. Open `http://localhost:3000/?ra=10.68479&dec=41.26907&fov=0.15&survey=spherex&f=46`. With no target selected or locked, click **Compare images**. Adjust the crop between 0.5 and 30 arcmin and pan the sky. Confirm the square follows the centre and its angular size changes correctly.
2. Click **Find images**. Confirm `/compare` contains the chosen coordinates and size. Wait for the SPHEREx inventory; inspect any partial/truncated warnings rather than treating them as empty coverage.
3. Confirm only SPHEREx products are shown, from the DR1/QR3 image or DR1 cube collections where available. Open an **IRSA metadata** link and compare its observation dates, band, and collection with the row. No FITS download should occur until explicitly opening its link.
4. Confirm there is no mission selector. Apply `SPHEREx-D2` detector band, wavelength, date, and product filters. Clear them. Where more than 100 products exist, load the next page and confirm that existing products remain and duplicates do not appear. Use date/wavelength constraints to narrow a truncated result.
5. Select rows as A and B independently. Confirm metadata updates. No aligned preview is expected in this stage.
6. Return to the navigator and verify centre, zoom, survey, and spectral frame. Repeat while a camera flight is in progress; the flight must not resume on return.
7. At a 390-pixel viewport, collapse filters and the inventory. Verify that selections, return navigation, filters, product actions, and error recovery remain reachable without horizontal scrolling.
8. Stop the service with `docker compose stop comparison`. Refresh the inventory; the page should show recoverable service errors. Restart it with `docker compose start comparison`, then retry. To exercise a SPHEREx collection failure, use the local Python fixtures rather than changing public archive endpoints.

Automated checks:

```sh
npm test
npm run typecheck
npm run build
npm run test:production
cd services/comparison
python3 -m unittest discover -s tests -v
```

## Source references

- [IRSA image APIs](https://irsa.ipac.caltech.edu/docs/program_interface/api_images.html)
- [SIAv2 parameters, spatial predicates, MAXREC, and result metadata](https://irsa.ipac.caltech.edu/ibe/sia.html)
- [IRSA TAP documentation](https://irsa.ipac.caltech.edu/docs/program_interface/TAP.html)
- [Official SPHEREx SIAv2 collections and result columns](https://caltech-ipac.github.io/irsa-tutorials/spherex-intro/)
- [Official SPHEREx native TAP plane/artifact example](https://caltech-ipac.github.io/irsa-tutorials/spherex-cutouts/)
