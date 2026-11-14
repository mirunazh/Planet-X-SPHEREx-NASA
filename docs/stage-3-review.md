# Stage 3: stable caches and controlled memory

Implemented only stage 3 of the approved incremental plan, following explicit user authorization. Stage 4 awaits user acceptance.

## Delivered behavior

- Replaced entry-count limits with separate resident texture budgets: **128 MiB for HiPS detail tiles**, **64 MiB for Allsky previews**. Accounting uses actual decoded dimensions: RGBA bitmap storage plus RGBA GPU texture storage, with every mip level counted for detail tiles.
- These are estimates for image resources, not a limit on total browser/process memory. Fetch bodies, temporary decoding buffers, canvases, geometry and browser/driver overhead are outside these numbers. Resource counters are available through the caches' `memoryStats()` methods for automated verification; no new diagnostic UI was added.
- Least recently used, unprotected resident images are disposed only when space is needed. Returning to a recent region or band can reuse its textures without another download. Older images can be evicted and downloaded again.
- Actual mesh textures and requested/planned detail tiles are protected. The renderer detaches old meshes and disposes their materials/geometry **before** releasing their texture protection. A completed incoming tile remains protected until the next planning pass can attach it.
- Admission control never evicts visible textures to fit more detail. If the protected working set fills the tile budget, remaining detail waits and the Allsky preview remains visible. Deferred tiles do not repeatedly download while they cannot fit.
- The displayed preview stays protected alongside its requested replacement, preserving the stage-2 atomic swap. A preview that cannot fit reports an ordinary layer error while keeping the previous image; no budget overflow is admitted.
- At most **six tile requests/decodes and one preview request/decode** run concurrently. Obsolete queued work is removed; active obsolete requests receive an AbortSignal. Slots remain occupied until the operation settles, including when an underlying fetch ignores abort.
- Completion checks after fetch, blob reading and image decoding reject obsolete results. Bitmaps returned after cancellation are closed and cannot recreate entries or overwrite a newer request for the same URL.
- Eviction and viewer cleanup dispose textures and close ImageBitmaps. Unmount cancels work, clears both caches and disposes cached Allsky geometry. Effect replay with the same refs/controller is covered for React StrictMode.
- No neighbor prefetching, frame-distributed uploads, adaptive resolution or later-stage UI work was introduced.

## Verification

- Independent agent reviewed the cache budgets, concurrency, cancellation, texture protection and cleanup: approved with no blocking findings. The requested additional StrictMode coverage was added and independently re-reviewed; all 106 tests, TypeScript and whitespace checks passed in that final review.
- `npm test`: **106 tests across 12 files passed**.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `git diff --check`: passed.
- Tests cover variable image dimensions, byte-based LRU eviction, visible-texture protection, admission deferral, cache reuse, failures/retry, ignored abort signals, late decode cleanup, replacement entries with the same URL, and repeated cleanup. Long synthetic runs load 100 tile regions and 150 previews, verify the resident byte cap after each completion, and verify every decoded bitmap is eventually closed exactly once.
- Renderer integration tests verify detach-before-unpin, cache/geometry cleanup and StrictMode cleanup/setup with the same refs, as well as all previous band-switching and navigation regressions.
- Browser/WebGL verification remains unavailable: `npm run dev -- --hostname 127.0.0.1` is rejected with `listen EPERM 127.0.0.1:3000`. Automated tests establish resource bookkeeping and scene lifecycle behavior, not real GPU performance or visual correctness.

## User acceptance test

Run `npm run dev` from this repository, then open <http://localhost:3000>.

1. **Explore for 3–5 minutes.** Search for M31, zoom to about 0.5°, pan through several regions, zoom out, and repeat with other targets. Alternate SPHEREx, AllWISE and 2MASS, and change several SPHEREx bands. Expect the sky to remain visible throughout. Detail may load gradually, but there should be no growing black areas, missing texture squares, crashes or continuing slowdown after you stop navigating.
2. **Return immediately to a recent region/band.** Let one detailed region finish loading, visit another nearby region or band, then return. Expect cached image content to appear promptly and fewer repeated image requests. This is a recent-working-set cache: after substantial exploration, older content may legitimately download again.
3. **Use a slow network.** In browser developer tools, open Network, keep browser cache enabled, select a slow network profile, then change bands/regions rapidly. Obsolete image requests may appear as cancelled. After you stop, obsolete work should drain and requests should focus on the final displayed region/band. There must be no late switch back to an earlier band. Existing tiles from the retained band can still load until the replacement preview is ready.
4. **Watch stability over repeated cycles.** If using Chrome's task manager or memory tools, repeat the same navigation/band cycle several times. Some initial growth and temporary peaks are normal; unused resources should be reclaimed and the application should remain responsive. Do not compare total browser memory with 192 MiB: the configured budgets count only estimated resident bitmap/texture resources, and JavaScript heap graphs do not include all GPU memory.
5. **Check recovery.** Go offline while requesting an uncached band. The previous image should remain, with a layer error. Restore the connection and choose **Retry layer**. The new image should load; normal exploration should continue.

Useful bug reports include the target/region, approximate FOV, sequence of bands, browser/device, and whether the issue appears immediately or after several minutes.

Stop for user review here. Do not start stage 4 until explicitly accepted.
