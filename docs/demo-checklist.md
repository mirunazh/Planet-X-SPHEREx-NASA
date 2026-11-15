# Production acceptance and demonstration

Run from `Planet-X-SPHEREx-NASA` with Node ≥20.9. This app streams images from NASA/IPAC IRSA and resolves remote names through NED; it needs connectivity for uncached imagery and lookups.

## Before judging (simple layout, 15 Nov 2026)

The default interface is now the **simple navigator**, and a first visit opens the **Solar System intro**. The five-minute table further down was written for the original interface: switch to it with **Settings → Expert layout** before running that table, or use this mapping.

| Checklist step (Expert layout) | Same action in the simple layout |
| --- | --- |
| Explore a place | 🧭 **Places**, or **Choose a place** on the next-step card |
| Layers / wavelength | 🔭 **Telescope** |
| Lock target, Copy target link | **Settings → Map and target** |
| Share view | **Settings → Copy link to this view** |
| Help / Sources | **Settings → Keyboard and help / Data sources and credits** |
| Compare images → Find images | **Compare its photos →** on the next-step card (step 2) |

Recommended order before presenting:

1. Demo from a production build (`npm run build && npm start`). In dev mode, the first visit to Compare compiles the page and can take 15–35 s.
2. Restart the comparison service so it runs the current code: bounded IRSA timeouts and the new challenge wording.
3. Open `/compare?challenge=weekly` and wait until it shows 12/12 images. This path does not depend on IRSA at demo time.
4. Run **Compare its photos** once for each target you will show (for example M31 and M101). Finished searches stay cached for 24 hours, so the live demo does not wait on IRSA.
5. Open the app with `/?intro=1`: a browser that has seen the intro skips it otherwise.
6. Run `npm run verify:hips` in the morning. Today IRSA's TAP service timed out, so the orientation check is pending, not failed.

Reliable story for the video: intro → **Look out from Earth with SPHEREx** → search **M101** → **Compare its photos →**, or **Places → Weekly sky challenge**. When explaining Compare, say that SPHEREx sees each spot at a slightly different infrared color in every photo, so the flipbook shows color and contrast differences as well as time.

## Prepare the production build

```bash
npm test
npm run typecheck
npm run build
npm run test:production
npm run verify:hips
npm run benchmark
npm start -- --hostname 127.0.0.1
```

Open <http://127.0.0.1:3000>. `test:production` requires a fresh build and uses simulated NED responses; `verify:hips` is the separate live NASA registration check and should finish with **All orientation checks passed**. Next may print its standalone-output recommendation during `npm start`; the existing start command serves the built app locally. The repository's Docker instructions provide the standalone packaging path. Do not regenerate the data snapshot just to prepare the demonstration.

If any automated check fails, record its output before demonstrating. A network/DNS failure in `verify:hips` leaves the empirical orientation check pending; it does not establish a registration defect or a pass.

## Five-minute demonstration

| Action | Expected result |
| --- | --- |
| Open the app with no query string | Panorama, 60° FOV, grid off. A preview appears first; finer details follow where the zoom requires them. |
| Drag, scroll both directions, press Home | Panorama remains active. FOV stays within 0.05°–100°. Home restores the initial view; Escape stops a flight. |
| Choose **Pinwheel Galaxy (M101)** under Explore a place | The sky flies to the target, FOV becomes 0.6°, Details opens with its position source. |
| Change SPHEREx wavelength quickly, then choose 2MASS and AllWISE | The previous complete layer stays visible until the selected preview is ready. Final image, displayed-layer text and image source agree. |
| Return to SPHEREx and wait; use **Lock target** | Lock becomes available after motion ends and the requested layer is ready. Coordinates, wavelength and JSON describe that displayed layer. |
| Use **Share view**, immediately open the copied URL in another tab | Same sky direction, FOV and requested layer. Lock, brightness and open panels are not part of the URL. |
| Lock, pan elsewhere, use **Copy target link** | The target link opens the locked position/layer, independent of the later pan. |
| Search `10.68, +41.27`, then invalid `10.68, +100` | The first navigates; the second explains the invalid coordinates without a name lookup. |
| Search a remote name such as `NGC 253`, then choose a place before lookup completes | A late lookup must not pull the view away from the chosen place. If NED is unavailable, an actionable error appears. |
| Open Help/Sources and close with Escape | Keyboard focus stays in the modal and returns to the opener; the sky does not move behind it. |

For visual registration, inspect the M31 nucleus in SPHEREx and 2MASS after the same coordinate search, and check Galactic Centre/deep-field targets. This human inspection complements the live-star script; do not claim a new orientation check until it has actually run successfully.

## Interruptions and recovery

Use DevTools Network to simulate failures, then return it to **No throttling / Online** afterward.

1. **Detail recovery:** load a wide preview online, go Offline, then zoom into an uncached area. The coarse image remains visible. After the normal three attempts/backoff (around ten seconds for immediate offline failures), the unavailable-details message and **Retry details** appear. Restore Online: failed current-view details should resume automatically. If no online event is delivered, click Retry details. Loaded images should not be discarded and the view must not jump. A real stalled transfer times out after 30 seconds per attempt, so terminal detail failure can take longer than an immediate offline error.
2. **Layer recovery:** with an old layer visible, go Offline and select an uncached wavelength. Expect the old layer plus a requested-layer error and **Retry layer**. Restore Online or use Retry layer. Only the final selected band should replace it. Repeat at mobile width with Layers closed: the summary must still show the error/retry.
3. **Places recovery:** temporarily block `/data/exoplanet-hosts.json` or `/data/targets.json`, reload, and expect a places error with **Retry places**. Unblock and retry. Featured destinations and search suggestions should return.
4. **Slow/cancelled responses:** use Slow 3G, change several bands and move to another target. The final destination/selection wins; stale downloads must not appear over it. Cancel a remote name lookup by Reset, zoom or Escape and wait for its old response.
5. **Clipboard denial:** if clipboard access is blocked, Share view/Copy JSON/Copy target link should expose selectable text and manual-copy guidance.
6. **Return from background:** switch away for a minute, return, pan and zoom. Check that navigation resumes and resolution recovers rather than steadily degrading. If the browser reports a WebGL/context error, record the console and reload outcome; context recovery has not been validated in the restricted environment.

## Real desktop/mobile performance acceptance

Use the production build. Record the browser version, physical device, viewport, device pixel ratio, network profile and whether the cache is cold or warm. Device emulation is useful for layout but is not a measurement of mobile hardware.

- **Desktop:** around 1440×900. In DevTools Performance, record 30 seconds while dragging, zooming, visiting M101/M31 and switching wavelengths. Inspect frame times, main-thread long tasks and visible stalls. A 60 Hz frame has about 16.7 ms available; report sustained slow sequences rather than assigning a pass from the CPU benchmark.
- **Phone:** test a real phone in portrait and landscape. Expect one detail upload/admission per frame, bounded rendering resolution, reachable Layers/Places/Details controls and usable touch scrolling. Record actual frame behavior with the browser's profiler where available.
- **Warm revisit:** visit the same areas/layers again. While retained in cache, they should reuse images instead of downloading them again. The cache can evict old regions under its memory budget.
- **Long navigation:** explore for five minutes, switching layers and destinations. Inspect JS heap/GPU information where supported. Total browser memory can fluctuate and exceeds the cache's pixel estimates, but repeated cycles should not cause continuing unbounded growth, increasing pending requests or progressive loss of responsiveness.
- **Layout/focus:** also check 390×844, phone landscape, shorter desktop height, 200% browser zoom, keyboard-only operation and native source links/disclosures. No clipped actions, overlapping panels or accidental selection during touch scrolling.

The repeatable `npm run benchmark` measures local CPU geometry and cell query/sort work. It excludes decoding, upload, full renderer work and GPU FPS. Its compact-profile result uses the same computer and must not be presented as a phone speed result.

Report failures with the exact action sequence, selected layer/target, device/browser, cold/warm cache, screenshot or console error if available, and whether recovery worked. These are the remaining acceptance checks; no deployment is part of this plan.
