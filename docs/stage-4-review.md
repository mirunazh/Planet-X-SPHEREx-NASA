# Stage 4: smoother streaming and bounded preloading

Implemented only stage 4 after explicit user authorization. The independent review is complete; stage 5 awaits user acceptance.

## Delivered behavior

- Visible detail requests and texture/mesh admission follow the screen centre first. Cached coarser fallback tiles update their distance to the current centre and are promoted out of speculative status when displayed.
- The Allsky preview gets its own texture-transfer frame. Subsequent detail transfers and mesh creation are limited to **two per frame on desktop**, **one on compact screens**. A soft three-millisecond check stops additional work after a transfer; it does not interrupt a single expensive GPU operation.
- Raw-pixel filter changes on existing detail textures use the same frame allowance, avoiding an unbounded batch of texture reuploads.
- Speculation waits until the view has been stationary for **650 ms**, the displayed layer matches the request, no navigation animation is running, and foreground tiles have loaded or are known missing. It is disabled for Data Saver and reported 2G/slow-2G connections and while the document is hidden when the frame callback runs. Browsers without connection hints still use the bounded policy.
- At most **six nearby halo tiles on desktop**, **two on compact screens**, are planned outside the current visible footprint. They never appear in the scene until actually requested by the view. They use one background tile download/decode slot within the existing six-slot limit. New foreground work preempts them; ignored aborts keep their slot occupied until settled.
- Speculative tile images use at most **16 MiB or one eighth of the configured tile budget**, whichever is smaller. They never evict visited images to make space and are preferred eviction candidates when foreground work needs room. The stage-3 overall budgets remain unchanged: 128 MiB detail, 64 MiB previews.
- A **single adjacent usable SPHEREx channel** is preloaded as an Allsky preview, normally the next higher channel, falling back to the previous at the upper end. Blank channels are skipped. The preload is skipped when the displayed image's dimensions suggest it would not fit alongside resident previews. Unexpectedly large decodes are closed without affecting the visible image or layer status. No cross-survey preload is performed.
- Moving or changing selection cancels obsolete speculative work. Selecting an already downloading/cached neighbor promotes and reuses it without duplicate download. Background failures do not generate foreground errors or loading messages.
- Compact screens are determined by the shorter viewport dimension being below 720 CSS pixels, covering landscape phones and small windows. Their detail planning ceiling is 40 tiles, versus 64 on larger screens.
- Render density is capped at **1.25 compact / 1.75 desktop**, device density, and a **one-million / three-million pixel** rendering budget. R3F's actual viewport DPR feeds tile-order selection and coordinate readout.
- Two-second frame-time observation windows reduce render density when average frames exceed 24 ms. Recovery requires three windows below 18 ms and proceeds gradually. The quality multiplier stays between 0.65 and 1. Long pauses/tab suspension reset observation instead of causing a quality drop.

No demonstration-interface redesign or final stabilization work was started.

## Measurements and verification

- Before changing the renderer, the deterministic HipsLayer test fixture at FOV 1°, 1600×900, DPR 1 attached **six detail meshes in its first frame**, alongside the preview. After the change, that frame admits only the preview, and subsequent frames admit **at most two** detail textures/meshes, centre first. Compact-screen tests verify a one-transfer limit. This is an operation-count comparison, not a real-device GPU or FPS benchmark.
- Independent reviewer approved the implementation and the final fallback-priority adjustment, with no blocking findings.
- `npm test`: **125 tests across 13 files passed**.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `git diff --check`: passed.
- Impeccable detector on changed UI component targets: no findings.
- Tests cover desktop/compact frame limits, raw-filter batching, centre priority, idle-only speculation, halo bounds, Data Saver and selection-transition suppression, background cancellation including ignored aborts, foreground promotion without duplicate download, byte budgets, neighboring preview reuse, background failure cleanup, skipped blank channels, DPR/pixel ceilings and quality hysteresis. Previous navigation, layer consistency and cache-lifecycle tests still pass.
- Browser/WebGL verification remains blocked by `listen EPERM 127.0.0.1:3000` when starting the local development server. Real FPS, interaction latency, visual sharpness and device-specific performance must still be checked in a browser; no claim of a measured FPS improvement is made.

## User acceptance test

Start `npm run dev` from the repository and open <http://localhost:3000>.

1. **Watch progressive detail.** Search for M31 and zoom to approximately 0.5°–1°. Pan and zoom repeatedly. Expect the preview to remain visible while central detail appears progressively. The camera should remain usable while images arrive; look for long freezes, black flashes or a burst of all detail arriving in one frame.
2. **Check nearby-region preloading.** Keep one region stationary until its detail finishes, then wait at least a second. Pan a small distance and back. Recent/nearby content can appear promptly. With Network open, background tile requests should begin only after the foreground settles; large movements should cancel obsolete requests. Prefetch is intentionally limited, so a large jump can still require loading.
3. **Check an adjacent spectral channel.** In a fresh tab, keep the initial SPHEREx 2.189 µm selection stationary until loading finishes and wait a second. With enough cache space, Network may show `Allsky_47.png` loading in the background. Focus the wavelength slider and press Right Arrow once, then wait for its 250 ms debounce. The selected channel should become **2.240 µm** and reuse the preloaded image if it is ready. The displayed layer must never change just because a background preload finished. Preloading can legitimately be skipped when the cache is full.
4. **Try a slow network.** Use a slow network profile in developer tools. Pan, zoom and switch bands quickly, then stop. Visible images must take priority, obsolete requests should drain/cancel, and the final selection must stay correct. Existing imagery should remain while new imagery loads. On browsers reporting Data Saver or 2G, speculative requests should be absent.
5. **Check desktop and phone sizes.** Try a normal desktop window, then a narrow viewport such as 390×844 and its landscape orientation. The sky should continue filling the viewport. Small screens use fewer pixels and progressively loaded detail; rendering sharpness may be lower in exchange for less work. A real phone is needed to assess touch/GPU smoothness.
6. **Check sustained load and recovery.** If possible, enable CPU throttling and navigate for several seconds. Rendering resolution may step down; coordinates, direction and selected band must stay unchanged. Remove throttling and leave the view active for several seconds: resolution should recover gradually rather than oscillate every frame. Device limits and bottlenecks outside rendering can still limit FPS.
7. **Toggle Show raw pixels at close zoom.** Expect the nearest-neighbor appearance to settle over a few frames without a sudden bulk transfer of every detail texture. The image must remain visible.

For a useful report, include browser/device, viewport size, target/FOV, network or CPU throttling settings, and the sequence that caused a freeze, incorrect band or visual defect.

Stop here for user review; do not begin stage 5 without explicit acceptance.
