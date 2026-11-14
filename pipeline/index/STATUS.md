# Static index: status at hard stop (2026-11-14 19:31 EET)

## Fetch: 0 rows of about 1,628,230
IRSA TAP answered HTTP 502 the whole session: every query from 19:03 to 19:17 (one sync query ran 400 s and
still got 502), and `/TAP/availability` itself at 19:17, 19:21 and 19:25. The fetcher stopped on its
10-minute outage rule. No chunk, no `counts.json`, no per-collection numbers. No fetch is running now.

Rows folder: a temporary scratch folder on the machine that ran the fetch (it held only a 4 KB log, copied to `pipeline/index/rows-cache/`)
(4 KB, only `fetch.log`). It is TEMPORARY (a reboot can clear it); the log is copied to
`pipeline/index/rows-cache/` (git-ignored by `pipeline/index/.gitignore`). Nothing else is lost.

Resume (fetches only missing chunks, now as async TAP jobs):
```sh
uv run --with numpy --with astropy python -I pipeline/index/fetch_rows.py --out pipeline/index/rows-cache --probe   # 1 day first
uv run --with numpy --with astropy python -I pipeline/index/fetch_rows.py --out pipeline/index/rows-cache
```

## Built and tested
- `fetch_rows.py` (weekly chunks, .part then rename, 2 in flight, backoff, 10-min outage stop, `--since`);
  async-job path NOT yet run against a live archive.
- `build_index.py` (28-byte rows, exact corners, adaptive cells, cost-measured parameter choice, completeness
  check) and `check_archive.py`: run only on 30,000 synthetic footprints.
- `packages/spherex-index`: `tsc --noEmit` strict passes; vitest 7 passed (geometry, RA 0, poles, cell
  distance, summary), 7 skipped (truth and archive tests need a real `assets/index/`). On the synthetic index the
  reader equalled brute force at 308 positions (0 differences).
- `assets/index/` is empty: no real index exists.

## Not done
Real fetch, real build, sizes, six-position truth, 30-position archive agreement, cost numbers, README "MEASURED"
section.

## Next three steps
1. When `/TAP/availability` answers 200: run the probe; check `s_region` parses to 4 corners and the URI template.
2. Full fetch, then `build_index.py --rows pipeline/index/rows-cache`; fill README measured sizes.
3. `SPHEREX_TAP_CACHE=<w8,w9,w11 tap dirs> npx vitest run` (truth), then `check_archive.py` and
   `SPHEREX_ARCHIVE_TRUTH=<dir> npm run test:archive`.
