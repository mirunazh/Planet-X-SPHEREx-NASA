# Stage 5: demonstration interface

Implemented stage 5 after explicit user authorization. Earlier stage-4 local changes were preserved. Stage 6 is not started and requires user acceptance.

## Delivered behavior

- Desktop HUD panels use a grid with left/right rails and a coordinate footer instead of independently positioned overlapping panels. Rails scroll or shrink within the available height, and empty sky areas remain available for direct navigation.
- At widths up to 1000 CSS pixels, **Layers**, **Places** and **Details** select one panel at a time. **Back to sky** dismisses the panel and returns focus to its toggle. Selecting or locking a target opens Details. The coordinate/layer summary and navigation controls remain available; the summary can scroll on very short screens.
- Layer loading/errors and **Retry layer** remain available on mobile even when Layers is closed or another panel is open. The desktop layer panel retains the same status. Only the applicable copy is displayed.
- Survey selection uses native radio inputs with visible focus. The spectral slider names SPHEREx wavelengths, band/channel, direction of increasing wavelength, skipped blank channels and pressed preset states.
- Image-source links, observing epoch and native pixel information follow the **displayed image**, including while a different layer loads. Position-source information stays with each selected catalogue target. Display brightness/overlays are in an expandable section.
- Four demonstration destinations come from the existing bundled snapshot: Andromeda Galaxy (M31), Pinwheel Galaxy (M101), SPHEREx Deep Field (north), and Teegarden's Star. Their positions, FOVs and provenance are reused without changing scientific data. Loading/error recovery is provided for places.
- Search has a persistent label, visible Go action, coordinate examples, a keyboard suggestion list, and useful lookup/recovery messages. Unknown names can reach NED: the previous local matcher accidentally included unrelated featured targets because the nonmatch score still passed its filter.
- Editing/submitting another query or unmounting cancels the old lookup. Navigation intents, including choosing a place/pin, Reset, zoom/pan and Escape, invalidate it immediately, even before an animation frame or when zoom is already at its limit. Late successes/failures cannot relocate the view. Starting a remote lookup stops the previous flight first.
- **Share view** serializes current coordinates, FOV and the requested survey/frame synchronously, without relying on the address-bar debounce. The RA rounding boundary at 360° is normalized to 0°. URLs retain the deployment pathname and remove obsolete query/hash content.
- **Copy target link** uses the locked target's coordinates/FOV/layer even if the current viewport subsequently moves. Links reopen views, not lock state; display gain/overlays and panel state are not serialized.
- Clipboard success is announced. Clipboard denial provides selectable text for manual copying, rather than silently failing. Pending completions/timers are guarded after unmount or a newer copy attempt.
- Help includes mouse/touch/keyboard gestures, an exploration sequence, coordinate formats and sharing expectations. Technical coordinate detail is expandable. Sources distinguish streamed imagery, bundled position snapshots, live NED lookups and computed reference directions while preserving all credits.
- Native modal dialogs provide browser focus containment and background inertness; closing restores prior focus. Keyboard shortcuts do not navigate behind dialogs or intercept native link/disclosure activation. Escape still stops motion.

The existing language and dark visual identity are preserved. No publication, deployment, scientific-source replacement or final stabilization work was performed.

## Verification

- Independent review found two issues: late lookup navigation after an external destination change, and hidden mobile layer errors. Both were fixed and re-reviewed. The final review approved stage 5 with **no blocking findings**.
- `npm test`: **144 tests across 14 files passed**. New tests cover local matching/remote fallback, malformed coordinates, NED errors and recovery, out-of-order responses, cancellation through real navigation actions, native keyboard controls, dialog shortcut isolation, all survey URL round trips, immediate serialization, locked-target sharing and the RA wrap boundary.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- `git diff --check`: passed.
- Impeccable mechanical detector on the HUD and CSS: no findings.
- Visual/layout, real focus, touch and full WebGL verification remain unavailable. The development server fails with `listen EPERM 127.0.0.1:3000`. A separate local headless-browser launch, without starting a server, also fails with macOS `MachPortRendezvousServer ... Permission denied`. No sandbox bypass or deployment was attempted. Static checks and automated logic tests do not establish visual correctness.

## User acceptance test

Run `npm run dev` in this repository and open <http://localhost:3000>.

1. **Desktop layout.** At around 1440×900, expect Layers and demonstration places on the left, target details/navigation on the right and coordinates below the sky. Drag through the open central area. Shrink the height and check that panel content can scroll instead of overlapping controls.
2. **Complete demonstration.** Choose **Pinwheel Galaxy (M101)** from Explore a place. The view should fly there and open sourced target details. Compare several SPHEREx presets. Requested/displayed status must remain truthful; source/epoch information must follow the image still displayed during loading. Wait for the selected layer and the flight to finish, then use **Lock target** (M101's preset FOV is 0.6°). Inspect the locked coordinates, layer and JSON.
3. **Search and keyboard.** Enter `M31`, use Down/Up and Enter, then try `10.68, +41.27`. Both should navigate correctly. Enter `10.68, +100`: it should explain the invalid coordinate without a name lookup. Try a name absent from local suggestions, such as `NGC 253`; expect a NED lookup with success or an actionable error. NED still requires connectivity.
4. **Cancel an old search.** With Network slowed, start a non-local NED lookup, then choose a demonstration place or press Reset before it finishes. The old response must not pull the sky back to its result. Repeat by editing the query or pressing Escape.
5. **Share immediately.** Change the wavelength or zoom and promptly click **Share view**. Paste the link into a new tab. After loading, expect the same coordinates, FOV and selected layer. It need not restore brightness, overlays, panels or target lock. Also lock a target, pan elsewhere, then use **Copy target link**: that link must reopen the locked position/layer, rather than the later viewport.
6. **Clipboard recovery.** If your browser blocks clipboard access, Share view/Copy JSON/Copy target link should reveal selectable text and manual-copy guidance. Closing that fallback should return to the normal controls.
7. **Mobile panels.** At 390×844 and in landscape, tap Layers, Places and Details. Expect one panel at a time, reachable controls, and Back to sky. Choose a place and confirm Details opens. Scroll a suggestion list by touch without accidentally choosing the first touched result. On a short screen, the bottom summary can scroll.
8. **Mobile error recovery.** With Layers closed, go offline and request an uncached image (or block its Allsky request). The mobile summary must still show the failure and Retry layer. Restore connectivity and retry. If an old image exists, it must stay visible until the replacement is ready.
9. **Help, sources and focus.** Open Help/Sources, move through their controls with Tab/Shift+Tab, and close with Escape. Focus should remain within the dialog while open and return to its opener afterward. On Layers, Tab to Display & overlays and press Enter; it should expand normally. Source links should open with Enter. Home resets the panorama when focus is on the viewer or a button; native input/link/disclosure behavior is preserved.
10. **Responsive reading.** Check a smaller desktop window and 200% browser zoom. Watch for clipped labels, covered buttons, unusable scrolling, or overlapping panels; report the exact viewport/device where it occurs.

Useful reports include the browser/device, viewport dimensions, selected place/layer, exact action sequence and whether the issue concerns layout, navigation, source metadata or sharing.

Stop for user review. Do not begin stage 6 without explicit acceptance.
