# Weekly sky challenge verification

The user requested a recurring sky-inspection challenge with images prepared before a visit, and chose to keep the same region across weeks. The first region is the existing M101 demonstration (ICRS 210.80227°, +54.34895°, 6 arcminutes square).

The interface extends the existing navigator and comparison workspace. Entry points are the featured places panel and comparison page; `/compare?challenge=weekly` shows the current UTC week, observing prompt, cache progress, archive-check time, newly discovered product count, observation dates, prepared slideshow, and full inventory link. The first successful inventory establishes the discovery baseline, including a successful empty inventory. Weekly discovery counts are distinct from observation times and reset Monday at 00:00 UTC. This app schedule does not imply a fixed IRSA publication day.

The single comparison service checks the regional DR1/QR3 inventory every six hours and at week rollover. A restart preserves the next check deadline. Up to twelve cutouts from one detector range are prepared over observation dates; up to twenty-four candidates allow failed or poorly covered exposures to be skipped. Prepared images and the discovery baseline survive restarts. The current frames are protected in a dedicated 16 MiB PNG cache, independent of metadata job expiration. Archive connections and rendering concurrency remain shared with ordinary searches. Existing disabled archive timeouts remain disabled. Automatic checks require the service to keep running; archive failures can delay new preparation while cached frames remain available.

## Automated checks

- 199 TypeScript tests, including cached challenge preview loading without creating a search and validation of the new API boundary.
- 37 Python tests, including persistent prepared frames, PNG HTTP responses, weekly rollover, single-count discovery, empty-to-populated baselines, preserved refresh deadlines, detector sampling, and retained images during partial archive results.
- TypeScript checking, production build, and compiled production HTTP smoke checks passed.
- Impeccable detector returned no findings for the changed UI and CSS.
- Independent code review found two scheduling/baseline issues; both were fixed with regression tests. Its verdict was ship at code-review scope once tests passed; all 37 Python tests subsequently passed.

## Live evidence

The running local service found 393 M101 products and prepared twelve real SPHEREx-D3 images. The prepared set includes both DR1 and QR3, spanning May 2025 through June 2026. Status reached `ready`; cached PNG responses returned HTTP 200 through both the backend and the web proxy. A page visit reads the manifest and existing PNGs instead of starting a FITS download.

Native-browser accessibility output confirmed the weekly title, M101, cache progress, coordinates, observation caption, navigation controls, archive-check time, and full inventory link. Screenshot capture returned an unrelated foreground video rather than the bound browser content. No valid desktop/mobile capture was obtained, so pixel-level responsive appearance is not claimed as verified; the review verdict covers code and functional evidence only.

## Sources

- [SPHEREx data releases](https://irsa.ipac.caltech.edu/spherex-archive-documentation/spherex-data-releases/): QR3 weekly releases.
- [SPHEREx data access](https://irsa.ipac.caltech.edu/spherex-archive-documentation/spherex-data-access/): weekly ingestion and archive access.
