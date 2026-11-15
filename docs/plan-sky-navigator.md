# SPHEREx Sky Navigator — maintained scope

This document describes the SPHEREx-only scope of the navigator and its image workspace.

## User flow

1. Open the SPHEREx introduction or follow a shared view link.
2. Choose a named galaxy, star, SPHEREx deep field or coordinate position.
3. Explore the SPHEREx map, change infrared wavelength, inspect the coordinate grid and zoom.
4. Choose a small square and open the SPHEREx slideshow.
5. Revisit the M101 weekly challenge with prepared images.

The simple layout presents one next step at a time. Settings exposes the expert layout. The Telescope panel describes SPHEREx; Color changes its infrared channel. Game quests require a galaxy visit, a SPHEREx color change and a visit to a SPHEREx deep field. The challenge remains reachable through its direct URL.

## Coordinate and image model

The camera sits inside an ICRS-aligned sphere. A direction vector converts to RA/Dec; a fixed standard rotation provides galactic coordinates. HiPS cells use HEALPix addressing. Coordinate precision follows the larger of screen-pixel and map-pixel uncertainty.

The sole image registry entry is SPHEREx DR1 at IRSA. The map has 102 spectral channels over 0.75–5.0 µm; two blank channels are skipped. A deep link preserves position, zoom and SPHEREx wavelength. Unsupported survey identifiers are ignored.

## Renderer behavior

- Keep the complete displayed wavelength until its requested replacement is ready.
- Reject stale results after rapid channel changes or unmounting.
- Protect visible images within bounded bitmap/texture cache estimates.
- Limit downloads, decoding and uploads; prefetch at most one adjacent SPHEREx preview.
- Offer retry after network errors and keep existing imagery visible where possible.

## Data and provenance

Map tiles stream from IRSA; the introduction uses a bundled SPHEREx projection with a processing manifest. Named-place positions retain their recorded reference sources. The global exoplanet discovery catalogue is not shipped or loaded.

The comparison service searches SPHEREx DR1/QR3, renders FITS cutouts and maintains separate metadata, ordinary PNG and challenge PNG caches. Image credits remain accessible in Sources.

## Verification

Run `npm test`, `npm run typecheck`, `npm run build`, and then `npm run test:production`. Service tests run from `services/comparison` with `python -m unittest discover -s tests -p 'test_*.py'` using its installed dependencies.

Check the navigator, help, intro, expert layout, wavelength changes, all three quests, slideshow and challenge in the browser. Automated geometry/resource tests do not establish real-device GPU performance or the availability of the public archive.

## Future processing

Aligned overlays, calibrated subtraction, exact per-target wavelength evaluation and automatic moving-source detection require additional implementation and validation. The current slideshow supports visual inspection only.
