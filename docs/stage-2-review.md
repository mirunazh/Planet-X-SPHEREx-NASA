# Stage 2: consistent band switching

Implemented only stage 2 of the approved incremental plan. Stage 3 requires explicit user acceptance of this stage.

## Delivered behavior

- The existing `surveyId` and `frame` represent the requested selection. `displayedLayer` records the survey and frame actually used by the sky renderer.
- The previous preview and its tiles stay visible until the requested preview has downloaded and decoded. The renderer replaces the preview and removes all previous-band tiles in one synchronous operation. Subsequent tile plans use only the displayed layer.
- A request generation and selection revision prevent stale successes or failures from changing the image or status, including A → B → A selections batched into one React render, retries, and unmounts.
- The layer panel shows the requested layer while loading and explicitly names the layer still on screen. Errors retain the old image and offer **Retry layer**. This status remains visible when the panel is collapsed.
- Coordinate readout and minimap follow the displayed layer. The minimap redraw signature includes image identity, so a band change redraws even when the view is stationary. An obsolete minimap background is hidden until its matching background is ready.
- Target locking waits for the selected layer to be displayed, and changing selection clears an existing lock. Exported target metadata therefore cannot describe a different band from the selected and displayed image.
- Tile loading/error counts are scoped to the displayed survey and frame.
- Preview pinning explicitly protects the displayed image and its requested replacement, preserving the old image through rapid selections. Memory budgets, download cancellation and cache redesign remain deferred to stage 3.

The shared URL continues to represent the requested selection, so reloading requests that same layer.

## Verification

- Independent agent reviewed the implementation, found a batched-selection race, and reviewed the fix: no remaining blocking findings.
- `npm test`: 91 tests passed across 11 files.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `git diff --check`: passed.
- UI mechanical detector: no findings for changed targets.
- Tests exercise the actual mesh renderer with mocked downloads and a frame/effect harness, plus request ordering, failure/retry, displayed-preview retention, metadata/locking and all previous navigation regressions. They do not establish GPU or visual correctness.
- Browser/WebGL verification could not be performed: the environment again rejects local server listening with `EPERM` on `127.0.0.1:3000`. The earlier request to run outside the sandbox was rejected by approval policy; no bypass was attempted.

## User acceptance test

Run `npm run dev` in this repository and open <http://localhost:3000>.

1. Wait for the initial SPHEREx image. The layer panel should say **Showing SPHEREx · 2.189 µm**.
2. Keep the camera stationary. Click several wavelength presets quickly, ending on **4.60 µm**. Until that preview is ready, **Loading** should name the requested band and **Showing** should name the retained band. The final image, coordinate readout and minimap should all settle on SPHEREx at **4.600 µm**.
3. Search for M31 and zoom to around 0.5° so detailed tiles appear. Repeat rapid band changes. Watch for fragments of one band over another: all tiles and the preview must belong to the same displayed band.
4. Switch rapidly between SPHEREx, 2MASS and AllWISE, finishing on 2MASS. The final viewport, readout and minimap must all use 2MASS, even if an earlier SPHEREx request finishes later.
5. If browser developer tools are available, enable a slow network profile and repeat steps 2–4. Then block the requested Allsky image or go offline and select an uncached band. An error should appear while the previous image remains visible. Restore connectivity, remove any request block and click **Retry layer**. The requested image should replace the retained one.
6. At FOV ≤ 1°, confirm **Lock target** is unavailable while a new band loads or fails, then available when the selected image is ready. Lock and copy its JSON; the layer wavelength must match the displayed band.
7. Reload the URL after a successful change. Confirm the requested selection and the final displayed image match.

Stop here for user review. Do not begin cache budgets, preloading or later stages before explicit acceptance.
