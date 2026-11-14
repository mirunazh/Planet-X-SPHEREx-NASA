# Stage 1: panoramic navigation

Implemented only stage 1 of the approved incremental plan. Stage 2 requires explicit user acceptance of this stage.

## Delivered behavior

- Starts inside the sky at a 60° vertical field of view, with the coordinate grid hidden.
- Wheel, pinch, buttons and keyboard zoom clamp at 0.05°–100°.
- Removed globe transitions, the globe toggle button, the S shortcut, the crossing flash and globe rim.
- Search, double-click flights and reset remain panoramic throughout their animations.
- Home resets the opening direction and 60° field of view; R remains an alias. Home also works after a navigation button receives focus. Text inputs retain their native Home behavior.
- Esc stops flights and inertia, including while a search input or modal has focus. Existing dismissal behavior remains available.
- Legacy globe URLs retain RA/Dec, survey and wavelength. Distance is ignored; missing FOV defaults to 60°. Links are rewritten with `mode=sky` and a bounded FOV.
- Updated help, accessible viewer instructions, coordinate readout and README.

Legacy globe coordinate utilities remain available for mathematical compatibility; active navigation has no globe entry point.

## Verification

- Independent agent reviewed the implementation and regression tests: no blocking findings.
- `npm test`: 71 tests passed across 8 files.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- UI mechanical detector: no findings for changed targets.
- Browser/WebGL verification could not be performed: the environment rejects local server listening with `EPERM` on `127.0.0.1:3000`, and the approval policy rejected the request to run outside the sandbox. A production build passing does not establish visual correctness.

## User acceptance test

Run `npm run dev` in this repository, then open <http://localhost:3000>.

1. Open `/` without query parameters. Confirm a sky panorama, a 60° FOV readout and no coordinate grid.
2. Drag to pan. Scroll or pinch inward and outward repeatedly, and repeat with the +/− buttons and keyboard. FOV must stop at 0.05° and 100°, and the camera must stay inside the sky.
3. Search for `M31`, choose the local target and let the flight finish. Confirm the panorama remains visible. Repeat with a double-click on the sky.
4. Press Home, then try Reset. Both should return to the opening direction at 60° without showing a globe. Repeat Home immediately after clicking a zoom button.
5. Interrupt a flight or a flick with Esc. Motion should stop at its current position. Repeat while the search field has focus or help is open.
6. Press S; it must not change camera mode. Press G to show and hide the grid.
7. Open `/?mode=globe&d=3.2&ra=10.68479&dec=41.26907&survey=spherex&f=46`. Confirm a panorama centred on RA 10.68479°, Dec +41.26907° at 60°. The URL should use `mode=sky`, include `fov=60` and omit `d`.
8. Reload the resulting URL and confirm the same view.

Test at desktop and narrow/mobile widths. Sky images require access to NASA/IPAC IRSA; an archive/network error should be distinguished from camera behavior.

Stop here for user review; do not begin band switching, cache or performance stages before explicit acceptance.
