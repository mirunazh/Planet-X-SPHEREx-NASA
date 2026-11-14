# 11. Repos and libraries for graphics and experience (survey)

Date of research: 2026-11-14. Scope: GRAPHICS AND EXPERIENCE only (physics/astronomy/data libraries are in the other researcher's file).
Stack assumed: Next.js 16, React 19, TypeScript, three.js via React Three Fiber, zustand, HiPS-tile sky globe, 121x121 float32 frame stacks.

Legend. **[V]** = VERIFIED today (GitHub API, npm registry, npm downloads API, or raw file read on 2026-11-14). **[U]** = UNVERIFIED (from memory, inference, or a search snippet only). Hours are my own estimate for a competent developer and are therefore always **[U]**. Downloads are npm last-week counts from api.npmjs.org. Stars and last commit come from `gh api repos/...` (`pushed_at`). "Dependents" counts were NOT collected (see section 7).

Standing routing respected (frontend-motion-and-ui-libraries playbook, read first): Motion is the one UI animation engine; nothing here adds Anime.js, GSAP or react-spring. Every animated piece must honour `prefers-reduced-motion`. KokonutUI and Bklit code must be restyled to project tokens.

---

## 1. Top 10 to adopt now

| # | Pick | Why it earns a place | Hours | Licence |
|---|------|----------------------|-------|---------|
| 1 | `@react-three/postprocessing` 3.2.2 (+ `postprocessing`) | Bloom, vignette, scanline, noise, chromatic aberration on the globe; also the host for a custom "sensor look" Effect. 1.42M/wk, React `^19` peer [V] | 3 to 4 | MIT / Zlib [V] |
| 2 | `@react-three/drei` 10.7.9 | Html, Billboard, Line, Trail, Stars, CameraControls (wraps camera-controls), Text. 6.17M/wk, React `^19` peer [V] | 2 | MIT [V] |
| 3 | `motion` 14.14 (`motion/react`) | UI choreography, mission cards, layout transitions, `useReducedMotion`. 34.4M/wk, peer `^18 \|\| ^19` [V] | 2 | MIT [V] |
| 4 | `uPlot` 1.6.32 (+ `uplot-react` 1.2.4) | Light curves, spectra, residuals with thousands of points at 60 fps, tiny; HN Show HN thread (260 points) [V]. 1.02M/wk [V] | 5 | MIT [V] |
| 5 | `driver.js` 1.14 | Spotlight tours and mission step highlights, vanilla (React 19 safe). 3.69M/wk, 27k stars, last commit today [V] | 2 | MIT [V] |
| 6 | `d3-scale-chromatic` 3.1.1 | viridis, cividis, magma, inferno LUTs (colour-blind safe) baked into a 256x1 texture for the image shader. 37M/wk [V] | 1 | ISC [V] |
| 7 | `nuqs` 2.10 | Type-safe URL state: coordinates, epoch, mission step, stretch, as shareable deep links. 7.86M/wk, peer includes React 19 [V] | 2 | MIT [V] |
| 8 | `next-intl` 4.15 | Romanian plus English, App Router native. 9.66M/wk, React 19 peer [V] | 4 | MIT [V] |
| 9 | `html-to-image` 1.11.13 + `qrcode.react` 4.2 | Client-side certificate/report PNG with a QR code, no server. 12.5M/wk and 14.4M/wk [V] | 3 | MIT / ISC [V] |
| 10 | shadcn/ui + Radix primitives + `lucide-react` | Accessible dark panels, dialogs, tabs, sliders, keyboard support for free. shadcn 128k stars, Radix last commit 2026-10-14 [V] | 3 | MIT / MIT / ISC [V] |

Next in line (not in the ten): `canvas-confetti` (ISC, 9.8M/wk, 1 h), native Web Audio sonification (0 deps, 3 h), `react-compare-slider` (MIT, 210k/wk, 1 h), a custom asinh/log stretch shader plus blink (0 deps, 4 h), `satori`/`@vercel/og` (MPL-2.0) only if a serverless OG-image route is wanted.

Hard notes found while checking peers [V]: `@react-three/fiber` 9.8.2 declares peer `react >=19 <19.4`, so pin React to 19.3.x or lower until R3F bumps. Shepherd.js 16 and Intro.js 8 are both AGPL-3.0 (OSI, but strong copyleft): avoid, driver.js covers the need. Remotion is NOT an OSI licence: do not use for the submission.

---

## 2. Per-category tables

All values [V] unless marked. Hours are estimates [U].

### Category 1. Sky and astronomy rendering in the browser

| Candidate | Repo | Licence | Last commit | Stars | npm/wk | Gives / risks | Hrs | Verdict |
|---|---|---|---|---|---|---|---|---|
| Aladin Lite v3 | cds-astro/aladin-lite | LGPL-3.0 (npm: LGPL-3.0-or-later) | 2026-11-13 | 168 | 3.3k (`aladin-lite` 3.9.2-beta) | Mature CDS HiPS viewer with catalogue overlays, MOCs, any HiPS survey; own WebGL canvas, 2.7 MB unpacked. Cannot be composed into R3F; would be a second sky. Good as a 2D "finder chart" tab or fallback if the globe is late. LGPL is fine for an unmodified dependency, keep the notice | 4 to 6 | MAYBE (fallback or finder-chart panel) |
| WorldWide Telescope engine | WorldWideTelescope/wwt-webgl-engine | MIT | 2026-11-13 | 26 | 207 (`@wwtelescope/engine`) | Full sky engine with tours; own renderer, heavy API, tiny community. Duplicates the existing globe | 10+ | SKIP |
| Stellarium Web Engine | Stellarium/stellarium-web-engine | AGPL-3.0 (LICENSE-AGPL-3.0.txt in root; GitHub shows none) | 2026-11-05 | 663 | n/a (C compiled to WASM) | Best-looking real sky (planets, DSOs, milky way), but C/emscripten build, AGPL, CLA for contributions [V]. Too much toolchain for a day | 10+ | SKIP |
| d3-celestial | ofrohn/d3-celestial | BSD-3-Clause | 2024-08-12 (stale) | 760 | npm `d3-celestial` 0.7.35, 51 MB unpacked | Do not use the runtime; lift its GeoJSON data (constellation lines, boundaries, names) for an overlay in our own scene | 2 | MAYBE (data only) |
| drei `<Stars>` | pmndrs/drei | MIT | 2026-10-21 | 10.2k | 6.17M | Random decorative stars, not real. Fine as a cosmetic background behind the HiPS sphere. Real stars need a catalogue (13b.4) | 0.5 | USE (cosmetic only) |
| Own nebula/star shaders | (write ourselves) | n/a | n/a | n/a | n/a | A skybox-less additive Points layer plus a soft noise sphere is about 40 lines of GLSL. No mature MIT "nebula pack" found | 3 | MAYBE |

Verdict for the category: keep the existing three.js HiPS globe. Add constellation lines (d3-celestial data) and a bloom pass. Aladin Lite only as insurance.

### Category 2. Scientific image display on the GPU

| Candidate | Repo | Licence | Last commit | Stars | npm/wk | Gives / risks | Hrs | Verdict |
|---|---|---|---|---|---|---|---|---|
| three.js `DataTexture` (FloatType, R32F) + custom ShaderMaterial | mrdoob/three.js | MIT | 2026-11-14 | 118k | n/a | Native route: upload each 121x121 float32 frame; shader does asinh/log/sqrt stretch with black/white points, LUT lookup, blink, difference (A-B), sliding wipe. 0 extra deps. Smooth float filtering needs `OES_texture_float_linear`; `NearestFilter` keeps pixels crisp (right for 121 px data) [U on device support] | 4 | USE |
| `d3-scale-chromatic` (LUT source) | d3/d3-scale-chromatic | ISC | 2026-11-03 | 817 | 37.2M | viridis, magma, inferno, cividis, turbo as sampled arrays. `glsl-colormap` (BSD, 678/wk) is not worth it | 1 | USE |
| react-compare-slider | (npm checked) | MIT | not checked | n/a | 210k (v4.0.0) | Before/after wipe of two DOM images or canvases. Only useful if frames are exported as images | 1 | MAYBE |
| regl | regl-project/regl | MIT | 2026-10-17 | 5.6k | 1.30M | Nice functional WebGL, redundant next to three.js | 4 | SKIP |
| deck.gl BitmapLayer / luma.gl | visgl/deck.gl, visgl/luma.gl | MIT (deck.gl); luma.gl npm MIT, GitHub shows "Other" | 2026-11-14 | 14.8k / 2.5k | 1.43M / 1.56M | Map-centric, large, second renderer. Wrong tool for 121 px frames | 8 | SKIP |
| Viv | hms-dbmi/viv | MIT | 2026-10-21 | 374 | 9.9k (`@vivjs/viewers`) | Multichannel OME-TIFF microscopy viewer with contrast limits; right idea, wrong data format, heavy | 8 | SKIP |
| OpenSeadragon | openseadragon/openseadragon | BSD-3-Clause | 2026-11-10 | 3.5k | 225k | Deep-zoom of giant images. Our frames are tiny. Only if a full-field mosaic is shown | 3 | SKIP |

Verdict: write the stretch shader ourselves (it is the heart of "see a star move"), feed it LUTs from d3-scale-chromatic. No library does this better for 121 px stacks.

### Category 3. Charts (spectra, light curves, fitted tracks)

| Candidate | Repo | Licence | Last commit | Stars | npm/wk | Bundle / React 19 | Hrs | Verdict |
|---|---|---|---|---|---|---|---|---|
| uPlot | leeoniya/uPlot | MIT | 2026-11-14 | 10.6k | 1.02M | about 50 KB min [U], 545 KB unpacked [V]; wrapper `uplot-react` 1.2.4 peer `>=16.8.6` [V]. Canvas, hooks for drawing the fit line and error bars. HN Show HN 260 points [V] | 5 | USE (light curves, spectra) |
| Observable Plot | observablehq/plot | ISC | 2026-11-05 | 5.4k | 1.47M | v0.6.19, 1.7 MB unpacked [V]; DOM/SVG output, render in `useEffect`. Great for the sky track with a fitted line and annotations | 4 | MAYBE (sky track) |
| visx | airbnb/visx | MIT | 2026-06-22 | 21.1k | 585k (`@visx/xychart` 4.0.0, peer `^18 \|\| ^19`) | Composable SVG; more code per chart than Plot | 8 | MAYBE |
| Recharts | recharts/recharts | MIT | 2026-11-13 | 27.7k | 65.7M (v3.10.1, peer includes 19) | Easiest, but SVG slows with thousands of points; fine for a 10-point quiz chart | 2 | MAYBE (tiny charts only) |
| Bklit UI | bklit/bklit-ui | MIT | 2026-11-11 | 1.97k | n/a | shadcn-registry charts named in the team playbook; restyle before shipping; maturity unverified | 3 | MAYBE |
| ECharts | apache/echarts | Apache-2.0 | 2026-10-13 | 67.7k | 10.6M | 60 MB unpacked [V], tree-shakeable but heavy | 4 | SKIP |
| Plotly.js | plotly/plotly.js | MIT | 2026-11-13 | 18.4k | 746k (`plotly.js-dist-min` 4.3.0) | 6 MB package, big bundle | 3 | SKIP |

Astronomy-specific React chart component: none found (searched GitHub and exa; only generic charts and Python tools).

### Category 4. Motion and 3D polish (R3F)

| Candidate | Repo | Licence | Last commit | Stars | npm/wk | Notes | Hrs | Verdict |
|---|---|---|---|---|---|---|---|---|
| drei | pmndrs/drei | MIT | 2026-10-21 | 10.2k | 6.17M | See top 10 | 2 | USE |
| @react-three/postprocessing | pmndrs/react-postprocessing | MIT | 2026-10-21 | 1.6k | 1.42M | Bloom, Scanline, Noise, Vignette, ChromaticAberration, custom `Effect` subclass. Peer `^19.0.0` | 3 | USE |
| postprocessing | pmndrs/postprocessing | Zlib (OSI-approved) | 2026-11-01 | 3.0k | 1.84M | Underlying engine, needed by the above | n/a | USE |
| maath | pmndrs/maath | MIT | 2026-11-07 | 1.3k | 6.86M | `damp`, easing, random point-in-sphere; drei already depends on it | 0.5 | MAYBE |
| camera-controls | yomotsu/camera-controls | MIT | 2026-10-21 | 2.5k | 6.48M | Smooth `setLookAt` fly-to; use through drei `<CameraControls>` | 1 | USE (via drei) |
| Motion | motiondivision/motion | MIT | 2026-11-13 | 35.1k | 34.4M | DOM UI motion. Do not point it at three objects (one engine per tree) | 2 | USE (DOM only) |
| Theatre.js | theatre-js/theatre | Apache-2.0 | 2024-08-14 (stale) | 13.0k | 39.8k core, 7.8k r3f | Timeline editor for cinematic camera; `@theatre/r3f` is 21 MB unpacked; R3F 9 / React 19 support unverified; no commit for 2+ years | 8 | SKIP |
| Lenis | darkroomengineering/lenis | MIT | 2026-11-13 | 17.3k | 2.74M | Smooth scroll for a landing page only | 1 | SKIP (not needed) |
| react-spring | pmndrs/react-spring | MIT | 2026-11-01 | 29.3k | not collected | Second animation engine, banned by routing | n/a | SKIP |
| three-nebula | (npm) | MIT | n/a | n/a | 3.8k | Particle editor, tiny usage; own Points shader is simpler | 4 | SKIP |

### Category 5. Guided tours, onboarding, mission flow

| Candidate | Repo | Licence | Last commit | Stars | npm/wk | Notes | Hrs | Verdict |
|---|---|---|---|---|---|---|---|---|
| driver.js | nilbuild/driver.js (was kamranahmedse) | MIT | 2026-11-14 | 27.1k | 3.69M | Spotlight overlay, steps, async hooks. HN launch thread 348 points [V]. Set `animate: false` under reduced motion | 2 | USE |
| React Joyride | gilbarbara/react-joyride | MIT | 2026-07-09 | 7.9k | 1.95M (v3.2.0, peer 16.8 to 19) | React-native API, more styling work | 4 | MAYBE |
| Shepherd.js | shepherd-pro/shepherd | AGPL-3.0 (npm 16.0.0) | not resolved (repo moved) | n/a | 400k | Copyleft; OSI-approved but forces source release of derived work | n/a | SKIP |
| Intro.js | usablica/intro.js | AGPL-3.0 (GitHub shows NOASSERTION) or paid commercial | 2026-11-12 | 23.5k | 240k | Dual licence trap | n/a | SKIP |
| XState v5 + `@xstate/react` | statelyai/xstate | MIT | 2026-11-14 | 30.5k | 8.26M / 4.49M | Proper mission state machine (step, hint, quiz pass/fail). 2.3 MB unpacked. A zustand store with a `step` index covers a 4-mission linear flow | 5 | MAYBE (zustand first) |

### Category 6. Game feel and rewards

| Candidate | Repo | Licence | Last commit | Stars | npm/wk | Notes | Hrs | Verdict |
|---|---|---|---|---|---|---|---|---|
| canvas-confetti | catdad/canvas-confetti | ISC | 2025-10-25 | 12.9k | 9.81M | `disableForReducedMotion` option exists [U]; one call on mission complete | 1 | USE |
| @number-flow/react | (npm) | MIT | n/a | n/a | 3.11M | Animated numeric readouts (distance, speed counting up). Peer `^18 \|\| ^19` | 1 | MAYBE |
| sonner | (npm) | MIT | n/a | n/a | 58.5M | Toast for "badge unlocked", peer includes 19 | 1 | USE |
| Howler | goldfire/howler.js | MIT | 2025-11-23 | 25.4k | 1.37M | UI sound effects; native Web Audio is enough for 4 sounds | 1 | MAYBE |
| use-sound | joshwcomeau/use-sound | MIT | 2025-06-10 | 3.2k | 323k | Thin Howler hook | 1 | MAYBE |
| haptics | native `navigator.vibrate` | n/a | n/a | n/a | n/a | Android only; iOS Safari ignores it [U]. Guard with feature test | 0.5 | USE (guarded) |
| Badges and progress | custom SVG + zustand + `localStorage` | n/a | n/a | n/a | n/a | Not worth a library | 3 | USE |

### Category 7. Sonification (accessibility)

| Candidate | Repo | Licence | Last commit | Stars | npm/wk | Notes | Hrs | Verdict |
|---|---|---|---|---|---|---|---|---|
| Native Web Audio (`OscillatorNode`, `GainNode`, `StereoPannerNode`) | browser | n/a | n/a | n/a | n/a | Map flux to pitch over time for a light curve; wavelength to pitch for a spectrum; about 60 lines; "play" button plus a visible cursor in sync. Start on click (autoplay rule) | 3 | USE |
| Tone.js | Tonejs/Tone.js | MIT | 2026-11-14 | 14.9k | 310k (v15.1.22) | Scheduling, envelopes, 5.4 MB unpacked. Overkill for one oscillator; useful for musical scales | 3 | MAYBE |
| astronify (STScI) | spacetelescope/astronify | licence not exposed by GitHub API (404 on licence endpoint) | 2026-02-01 | 85 | PyPI, not npm | Python; could pre-render WAVs inside the existing pipeline. Read its LICENSE file before use | 3 | MAYBE (precomputed audio only) |

### Category 8. Shareable results

| Candidate | Repo | Licence | Last commit | Stars | npm/wk | Notes | Hrs | Verdict |
|---|---|---|---|---|---|---|---|---|
| html-to-image | bubkoo/html-to-image | MIT | 2026-11-14 | 7.3k | 12.5M | DOM to PNG in the browser; WebGL canvas content needs a snapshot via `toDataURL` or `preserveDrawingBuffer` [U] | 3 | USE |
| html2canvas | niklasvh/html2canvas | MIT | 2024-07-18 (stale) | 31.9k | 26.6M | Older, slower, many CSS gaps | 3 | SKIP |
| satori + `@vercel/og` | vercel/satori | MPL-2.0 (file-level copyleft, OSI) | 2026-11-12 | 14.2k | 8.5M / 4.2M | JSX to SVG/PNG on a serverless route (OG preview card for shared links). 26 MB unpacked | 4 | MAYBE |
| qrcode.react | (npm) | ISC | not checked | n/a | 14.4M (4.2.0, peer incl. 19) | SVG QR in React | 0.5 | USE |
| node-qrcode | soldair/node-qrcode | MIT | 2024-08-23 | 8.2k | 41.2M | Server-side alternative | 0.5 | SKIP |
| nuqs | 47ng/nuqs | MIT | 2026-11-10 | 10.9k | 7.86M | Typed search-param state in Next App Router | 2 | USE |
| lz-string | (npm) | MIT | n/a | n/a | 107.9M | Compress longer mission-state JSON into a short URL fragment | 0.5 | MAYBE |

### Category 9. Programmatic video for the 30-second demo

| Candidate | Repo | Licence | Last commit | Stars | npm/wk | Notes | Hrs | Verdict |
|---|---|---|---|---|---|---|---|---|
| Playwright (already configured) + ffmpeg | n/a | Apache-2.0 (Playwright) [U]; ffmpeg LGPL/GPL by build [U] | n/a | n/a | n/a | Script a real run of the app (fixed viewport, `recordVideo`), cut and caption with ffmpeg. Shows the real product, which is what judges want | 4 | USE |
| Remotion | remotion-dev/remotion | NOT OSI: custom "Remotion License" (free for individuals, for-profit up to 3 employees, non-profits; company licence above that) [V, read LICENSE.md] | 2026-11-14 | 73.1k | 3.64M | Powerful, but source-available only, and a five-person for-profit would exceed 3. Submission rules need OSI licences | 6 | SKIP |
| Motion Canvas | motion-canvas/motion-canvas | MIT | 2026-07-02 | 19.8k | 11.8k | Code-driven 2D animation with an editor; good for an explainer segment. Slower recent cadence | 8 | MAYBE |
| Manim Community | ManimCommunity/manim | MIT | 2026-11-14 | 42.5k | PyPI | Python, matches the existing pipeline; excellent for a clean "distance from parallax" diagram clip. Needs LaTeX for maths text unless avoided [U] | 6 | MAYBE |
| mediabunny | (npm) | MPL-2.0 | n/a | n/a | 7.3M | WebCodecs mux/encode in browser, for "download my replay" later | 6 | SKIP for now |
| gifenc | (npm) | MIT | n/a | n/a | 1.17M | Make the blink GIF for sharing | 2 | MAYBE |

### Category 10. i18n (RO + EN) and accessibility

| Candidate | Repo | Licence | Last commit | Stars | npm/wk | Notes | Hrs | Verdict |
|---|---|---|---|---|---|---|---|---|
| next-intl | amannn/next-intl | MIT | 2026-11-13 | 4.4k | 9.66M (4.15.1) | App Router, ICU plurals (Romanian has three plural forms; ICU handles it). Static export needs `generateStaticParams` for `[locale]` [U] | 4 | USE |
| react-i18next | i18next/react-i18next | MIT | 2026-11-13 | 10.1k | 25.8M | Works with static export without routing opinions; more manual | 4 | MAYBE |
| Colour-blind-safe palettes | d3-scale-chromatic (viridis, cividis) + Okabe-Ito 8 colours | ISC / public palette | n/a | n/a | 37M | cividis/viridis for images, Okabe-Ito for chart series; never rely on red vs green | 1 | USE |
| Keyboard support | Radix primitives | MIT | 2026-10-14 | 19.5k | 94.4M (`react-dialog`) | Focus trap, arrow keys, ARIA built in. The canvas needs its own key handlers (arrows to step epochs) | 2 | USE |

### Category 11. UI component sets

| Candidate | Repo | Licence | Last commit | Stars | npm/wk | Notes | Hrs | Verdict |
|---|---|---|---|---|---|---|---|---|
| shadcn/ui | shadcn-ui/ui | MIT | 2026-11-13 | 128k | n/a (copy-in) | Tailwind-based dark panels, copies code into repo | 2 | USE |
| Radix primitives | radix-ui/primitives | MIT | 2026-10-14 | 19.5k | 94.4M | Behind shadcn | 0 | USE |
| lucide-react | lucide-icons/lucide | ISC (GitHub shows Other; npm v1.73.0 says ISC) | 2026-11-14 | 25.8k | 134M | Icons, tree-shaken | 0.5 | USE |
| Tabler icons | tabler/tabler-icons | MIT | 2026-11-14 | 22.7k | 5.3M | Backup icon set | 0.5 | MAYBE |
| Phosphor icons | phosphor-icons/react | MIT | 2026-01-06 | 1.8k | 7.7M | Alternative | 0.5 | SKIP (duplicate) |
| KokonutUI | kokonutui.com | licence not verified (GitHub path KokonutUI/UI returned 404) | not checked | n/a | n/a | In team playbook as free; restyle; verify the licence of each copied component | 2 | MAYBE |
| Bklit UI | bklit/bklit-ui | MIT | 2026-11-11 | 1.97k | n/a | See category 3 | 3 | MAYBE |
| `@react-three/uikit` | pmndrs/uikit | MIT text in LICENSE (npm field "SEE LICENSE IN LICENSE", GitHub NOASSERTION) | 2026-10-27 | 3.3k | 25.9k | Flexbox UI inside the canvas; drei `Html` plus CSS is quicker | 6 | SKIP |
| sonner, vaul, cmdk | various | MIT | n/a | n/a | 58.5M / 31.8M / 47.8M | Toasts, mobile drawer, command palette ("go to Betelgeuse") | 1 each | MAYBE |

### Category 12. Reference products (learn from, do not copy)

| Product | Link | Licence / status | What to learn |
|---|---|---|---|
| God's Eye View | github.com/bilawalsidhu/gods-eye-view | MIT code, third-party data excluded (section 4) [V] | Sensor looks, detection overlay, click-to-track, scene director, share links, HUD. 64.8k stars, pushed today [V] |
| Aladin Lite | github.com/cds-astro/aladin-lite | LGPL-3.0 [V] | HiPS UX conventions astronomers expect (survey picker, catalogue overlay, coordinate box) |
| WorldWide Telescope | github.com/WorldWideTelescope | MIT (engine) [V] | Guided tours as authored "slides" over the sky (our missions are the same idea) |
| Stellarium Web | github.com/Stellarium/stellarium-web-engine | AGPL-3.0 [V] | Visual benchmark for sky realism, labelling and fading |
| CARTA volumetric cube rendering | search hits: arXiv 2608.27223, IOP PASP paper, Zenodo record [V that the pages exist; content NOT read] | CARTA is open source [U] | How professionals show wavelength/velocity cubes as 3D volumes (13b.2) |
| Firefly (Northwestern) | firefly.rcs.northwestern.edu | licence not checked | WebGL particle explorer, point-cloud interaction model |
| DeepSkies 3D Star Map | deepskies.observer | licence not checked | 1.8 billion stars in WebGPU; fly-through feel |
| Past NASA Space Apps winners with public repos | NOT SEARCHED in this pass (notes 02 and 10 cover competitors) | n/a | See `docs/research/10-competitor-teardown.md` |

---

## 3. Three suggested combinations

### A. Safe (about 22 hours, low risk)
`@react-three/postprocessing` bloom only + drei CameraControls + Motion + uPlot + driver.js + d3-scale-chromatic LUT in a hand-written stretch shader + nuqs + next-intl + html-to-image + shadcn/Radix/lucide.
What the user sees: the existing globe with a soft glow and smooth fly-to when they enter coordinates; a blink viewer with a stretch slider and a colour-blind-safe palette; a light curve and fitted sky track in clean dark charts; a highlighted step-by-step mission with quiz; a "Download my report" PNG with a QR that reopens the same view. Nothing depends on a risky renderer.

### B. Balanced (about 40 hours)
Safe set, plus: a custom "sensor look" postprocessing Effect pack (night vision, thermal, CRT; own GLSL, inspired by the reference product) selectable per frame; a target-lock HUD (reticle, tracking box, readouts via drei `Html`/`Billboard`, number-flow counters); a height-field "signal mountain" of one frame (native three displacement); native Web Audio sonification of the light curve with a moving cursor; `canvas-confetti` plus badges plus sonner on mission completion; Playwright+ffmpeg demo capture; a satori OG card route so shared links preview well.
What the user sees: they lock onto a star with a bracket, watch its brightness rise as a mountain out of the noise as exposures stack, hear the light curve, flip to thermal view for the hot pixels, finish the mission with confetti and a certificate they can post.

### C. Ambitious (about 75 hours, two people on graphics)
Balanced set, plus the category 13 items: a space-time cube (stacked additive planes or points, world lines as drei Line, fixed stars as vertical columns), a spectral cube of the 102 bands with click-a-column spectrum in uPlot (and sonified), a 3D solar-neighbourhood map with proper-motion arrows and `setLookAt` fly-to, a spacecraft-eye view (satellite.js propagation, SPHEREx orbit ribbon, footprint sweeping the celestial sphere), a scene-director JSON (scripted camera tours for the 30 s clip, replayable and shareable through nuqs), a Manim insert for the parallax diagram.
What the user sees: a seamless move from "enter a coordinate" to "ride with the telescope", to "turn the pictures into a time cube and watch the moving dot draw a slanted line", then fly out to see where that star sits among its neighbours.

---

## 4. Category 13. Turning 2D sky images into something 3D and cinematic

### 13a. Reference product: God's Eye View (analysed read-only via raw GitHub files and the file tree)

Repo: github.com/bilawalsidhu/gods-eye-view. 64.8k stars, last commit 2026-11-14, JavaScript, Vite, Vue 3, Pinia, CesiumJS, Google Photorealistic 3D Tiles, OpenAI Realtime voice [V, README and package.json]. Earth-focused, not a sky viewer.

**Licence, exactly [V, read LICENSE and THIRD_PARTY_NOTICES.md].**
- `LICENSE` is the standard MIT text, Copyright (c) 2026 Bilawal Sidhu, followed by an appended note. GitHub's detector reports NOASSERTION only because of that note; `package.json` also says `"license": "MIT"`.
- The note says the MIT grant covers **source code only**. Reusable under MIT (keep the copyright and permission notice in copies): all code in `src/` including the GLSL shaders in `src/styles/*.js`, and the procedural 3D models in `public/models/` ("generated from code by the project maintainers, covered by the MIT license").
- NOT reusable under MIT: every bundled dataset under `src/data/local_data/` and all runtime data feeds. Named examples: TeleGeography cable map (CC BY-NC-SA 3.0, non-commercial, share-alike), OSM-derived datacentre and dam extracts (ODbL 1.0), NASA FIRMS (CC0), Bhote Koshi flood imagery and derived coordinates (CC BY-NC 4.0). Live sources (Google Maps, OpenSky, adsb.lol, AISStream, CelesTrak, USGS, OSM Overpass, GBFS) follow each provider's terms; some need your own credentials.
- `THIRD_PARTY_NOTICES.md` only records npm packages added for SDR, Street Level and GeoParquet (webrtlsdr, signals, rxjs Apache-2.0; mapillary-js, hyparquet, fzstd, three 0.134 MIT). It adds no restriction on code we would borrow.
- Conclusion: **code and shaders are legally reusable (OSI MIT, notice kept, project credited); data and images are not.** Practical advice: do not paste whole files. The shaders target Cesium's `PostProcessStage` (`colorTexture`, `v_textureCoordinates`, `in vec2`), so they need porting anyway. Treat it as a design reference, rewrite the effects in our own code, and credit it in the library list. Plain reading of the files, not legal advice.

**How its features are built [V where I read the file; otherwise stated]:**

| Feature | How it is built | Files | Transfer to a three.js/R3F sky viewer |
|---|---|---|---|
| GLSL sensor looks (CRT, night vision, FLIR/thermal, noir, anime) | One Cesium `PostProcessStage` per style, registered in `src/ui/visualEffects.js`; each style is a plain object `{name, uniforms{default,min,max,label}, fragmentShader}` in `src/styles/{retro,surveillance,thermal,noir,anime}.js` (file names [V]; mapping retro = CRT and surveillance = night vision is [U]). `thermal.js` (read) implements White-Hot/Black-Hot, a 7-stop "ironbow" colour ramp, drifting value-noise and fbm sensor noise, hot-spot bloom, a pixelation grid and even a 7-segment HUD digit renderer, all in the fragment shader; exposed uniforms (sensitivity, bloom, mode, pixelation, palette) become sliders | `src/styles/thermal.js`, `src/ui/visualEffects.js`, `src/bloom.js` | HIGH. Port each to a `postprocessing` `Effect` subclass (`mainImage(inputColor, uv, outputColor)`). For us thermal is actually meaningful: a false-colour LUT of infrared brightness, which is what SPHEREx measures. 2 to 3 h per look |
| Screen-space detection overlay (boxes, IDs) | A Canvas2D overlay drawn each frame from projected entity positions; pure helpers (label composition, flight-level and knots formatting, glyph-width estimate, fade ramp, corner-bracket geometry) are split into a renderer-agnostic module so they can be unit-tested and reused by a future GPU/MSDF renderer; separate policy modules handle density, cohort, occlusion and allocation | `src/data/detection.js`, `detectionDraw.js`, `detectionPolicy.js`, `detectionOcclusion.js` | HIGH. `Vector3.project(camera)` for each catalogued source in view, then corner brackets plus a label (name, magnitude, distance) on a 2D canvas or drei `Html`. 4 to 6 h including a density cap so labels do not pile up |
| Click-to-track with fading trail | Click selects an entity, camera locks on (`trackedCamera.js`, with range limits and zoom inertia) and a history polyline is drawn. README says "fading trail", but the code header (round 6) says the tail fade was REMOVED on owner request ("show actual tracks, don't style them too much"): one alpha for the whole history, dimmer where occluded. Trails are cut into chunks; finished chunks freeze into static geometry so only the newest chunk updates per frame | `src/data/trailRenderer.js`, `trackedCamera.js`, `trackingClickGesture.js` | HIGH and very relevant: our "track" is the star's path across epochs. drei `Line` (or `Trail`) with vertex colours for time, and a camera that holds the target while the epoch scrubs. 4 h. Lesson from their history: show the true full track |
| Military-style HUD telemetry | DOM HUD with selectable layouts, an AI five-word scene summary, readouts for centre coordinates, plus HUD drawn inside the thermal shader | `src/hud.js`, `hudLayouts.js`, `hudReadouts.js` | MEDIUM-HIGH. Show RA/Dec, epoch, pixel scale, live fit parameters (proper motion in mas/yr), a "LOCK" state. DOM overlay is simplest. 3 h. Skip the AI summary (paid API) |
| Scene director (scripted camera tours) | A validated, bounded JSON "scene document" (version 6) holding visual state (style, bloom, sharpen, hud, detection, scope, mapStack, styleParams), camera moves, a clock, interactions and data packs; importable/exportable as files or bundles; seek bar, countdown, callbacks | `src/director/document.js`, `camera.js`, `clock.js`, `interactions/` | HIGH, ideal for the 30 s demo and for missions themselves: a mission is a scene document (camera keyframes, epoch range, caption, quiz anchor). Small TS schema (zod) plus a camera timeline using camera-controls `setLookAt`. 8 to 10 h. Theatre.js would do the timeline but is stale |
| Share links | URL hash holds camera and state in a long form (`lat, lon, alt, heading, pitch, style, bloom, hud, detection...`) and a short form `/share/<code>` from a codec in `src/share/viewCodec.js` (documented in `docs/SHARE-LINK-FORMAT.md`), including one tracked target; retired style names fall back to Normal | `src/sharelink.js` (873 lines), `src/share/viewCodec.js` | HIGH, trivial with nuqs: ra, dec, fov, epoch, look, step. 2 h. Add a version prefix so old links never break |

What does NOT transfer: Cesium and Google 3D tiles, live feeds, OpenAI voice, Vue/Pinia. Our stack has a three.js equivalent of every piece. Maturity: huge community and daily commits, but it is a maintainer-driven app, not a library (no npm package), so only ideas and ported snippets.

### 13b. Open-source building blocks, by idea

| # | Idea | Best building blocks (licence, maturity) | Approach | Hrs in R3F | Verdict |
|---|------|------------------------------------------|----------|------------|---------|
| 1 | Space-time cube: frames stacked along time, moving star = slanted world line, fixed stars = vertical columns | three.js official examples `webgl_texture3d`, `webgl_volume_cloud`, `webgl_volume_instancing`, `webgl_volume_perlin` (names present in `examples/` [V]); three is MIT. Donitzo/three.js-volume-renderer (MIT, 21 stars, last commit 2026-04-21 [V], small). danielesteban/volumemarcher (MIT, last 2022, stale). CARTA's volumetric cube work as a conceptual reference | (i) **Stacked additive planes**: one textured quad per epoch at z = epoch, `AdditiveBlending`, `depthWrite: false`. Most legible, trivial, 4 h. (ii) **Point cloud of bright pixels**: threshold pixels above N sigma, instanced Points with z = epoch, drei `Line` through the detected centroid path, 3 h. (iii) **Raymarched `Data3DTexture`** (121x121xN float): custom ShaderMaterial on a BackSide box with front-to-back accumulation, 8 to 12 h, best wow, risk of blown-out fixed stars. Do (ii)+(i) first, (iii) as stretch | 3 to 12 | USE (planes/points), MAYBE (raymarch) |
| 2 | Spectral cube: stack along wavelength, 102 SPHEREx bands, columns = spectra | Same techniques. A `Data3DTexture` of 121x121x102 R32F is about 1.5M texels (about 6 MB) and should fit GPU limits [U] | Click a column to read its spectrum into uPlot; hover shows band and flux; slice-sweep animation through bands with colour = wavelength. Same code path as #1 with the third axis relabelled. Needs per-band frames from the pipeline (a data question for the other researcher) | 3 to 6 on top of #1 | USE if bands are pre-rendered, else MAYBE |
| 3 | Height-field "signal mountain": brightness as terrain; star rises out of the noise as exposures stack; saturated star becomes a flat-topped mesa | Native three: `PlaneGeometry` 121x121 with vertex displacement from a `DataTexture` (no library); drei CameraControls to tilt | One shader plus a slider "exposures stacked (1..N)" driving a running mean, so noise sinks and the star rises; clamp at the saturation level so the mesa shows a flat top and a label. Strong teaching value (signal-to-noise as visible shape) | 3 | USE |
| 4 | 3D solar-neighbourhood map with real distances, velocity vectors, fly-to | Catalogue data: HYG via `jswhitten/hygmap` (MIT, 5 stars, last 2026-08-01 [V]; HYG data licence NOT verified, I believe CC BY-SA [U]); `typpo/gaia` (MIT, 2018, stale), `ejtaal/gaia-web` (BSD-3, 2023). Search hits `koehr stellar-neighbours` (ThreeJS, licence not checked), `humzakhan/stellar` (no licence shown: skip). Gaia data itself is the other researcher's job. Engine: our own (drei Points + `Line` arrows, `CameraControls.setLookAt`) | A few thousand stars within about 100 pc as one Points draw; arrows scaled by an "exaggeration" slider; Sun at origin; click a star to fly and open its mission. No mature R3F component to import | 6 to 8 | USE (own code, catalogue from the other notes) |
| 5 | Spacecraft-eye view: Earth, SPHEREx orbit, FOV sweeping the sky | `satellite.js` 7.2.0 (MIT, 198k/wk [V]) for SGP4 from a TLE (TLE source and SPHEREx NORAD id NOT verified). `vasturiano/r3f-globe` (MIT, 57 stars, last 2025-10-31 [V], has a satellites example) and `three-globe` (MIT, 478k/wk [V]) for Earth; `kvsankar/sattosat` (MIT, 2 stars). Orbit ribbon: drei `Line`. Footprint: a frustum helper or projected quad on a unit celestial sphere | Earth sphere + orbit ring + spacecraft marker; a translucent strip painting the celestial sphere as it sweeps (survey geometry is the physics researcher's topic). Label "illustrative" if the orbit is a placeholder | 8 | MAYBE (high wow, high data risk) |
| 6 | Target-lock HUD and sensor looks for R3F | `@react-three/postprocessing` (MIT) Scanline, Noise, Vignette, ChromaticAberration, Bloom (docs page for Scanline found [V]); `OutThisLife/crt-shader` (MIT, 12 stars, last 2026-09-27 [V], reference only); custom ironbow/inferno LUT Effect; drei `Html`/`Billboard` for reticles; number-flow for readouts | See 13a. Looks double as honest false colour: choose the LUT by data (IR = inferno/ironbow) and label it | 6 | USE |
| 7 | Honest depth and parallax | three.js `AnaglyphEffect` / `StereoEffect` (in `three/examples/jsm/effects` or `three-stdlib`, MIT) [U on exact names] for exaggerated-parallax stereo of real nearby stars | Only where depth is real: Gaia parallax distances for the neighbourhood map (#4); a two-epoch trigonometric parallax diagram (Earth at two points of its orbit, the star, the baseline) | 3 | MAYBE |

**Warning: misleading depth.** Do NOT run monocular AI depth estimation (MiDaS, Depth Anything and similar) on star fields or SPHEREx frames. Stars are point sources with no occlusion, perspective, shading or texture cues, so the network would return invented depth; brightness is not distance (a bright star may be far, a faint one near), and a 2D image has no recoverable radial coordinate. The only honest third dimensions we have are time (epoch), wavelength (band), flux (the mountain) and catalogue distance (Gaia parallax). Label each 3D view with what its axes are, and add an on-screen note such as "Height = brightness, not distance". Also avoid turning dust or nebulosity into fake volumes, and do not smooth height-field mountains in a way that hides the 121 px resolution.

---

## 5. Ambitious ideas these repos make possible (rough cost)

| Idea | Built from | Cost |
|---|---|---|
| "Thermal vision" toggle: same frames in ironbow false colour, labelled honestly | postprocessing Effect + LUT | 3 h |
| Target lock: click a source, camera locks, bracket and telemetry card, full track drawn through epochs | detection-overlay idea + drei Line + CameraControls | 6 h |
| Signal mountain with an "exposures" slider that makes the star emerge from noise | native three displacement | 3 h |
| Space-time cube with world lines (slant = proper motion) and a "tilt the cube" lesson | stacked planes/points | 6 h |
| Spectral column picker linked to a sonified spectrum | cube + uPlot + Web Audio | 8 h |
| Mission as a scene document: replayable camera tour, shareable, also used to record the 30 s demo | zod schema + camera-controls + nuqs | 10 h |
| Certificate with a QR and a thumbnail of the user's own measured track | html-to-image + qrcode.react | 3 h |
| Fly out from the target to the solar-neighbourhood map | Points + CameraControls | 8 h |
| Ride along the SPHEREx orbit | satellite.js + drei Line | 8 h |
| Accessible mode: sonification, keyboard stepping of epochs, Okabe-Ito colours, reduced motion | native | 6 h |

---

## 6. Licence and attribution checklist for the submission

The rules require listing every library and using OSI-approved licences.

1. Generate the dependency list from the lockfile (for example `npm ls --all --json` or `license-checker --json`, both free) and commit it as `THIRD_PARTY_NOTICES.md`: name, version, SPDX licence, URL.
2. Keep every MIT/ISC/BSD/Zlib/Apache notice text; Apache-2.0 packages need their NOTICE files preserved if present.
3. **Flag list:**
   - Remotion: custom source-available licence, NOT OSI. Do not use.
   - Shepherd.js and Intro.js: AGPL-3.0. OSI-approved but copyleft; avoid, driver.js (MIT) instead.
   - Stellarium Web Engine: AGPL-3.0 plus CLA. Avoid.
   - Aladin Lite: LGPL-3.0. OSI; fine as an unmodified dependency, keep the notice, do not patch it.
   - satori, @vercel/og, mediabunny: MPL-2.0 (OSI, file-level copyleft). Fine unmodified; list them.
   - KokonutUI and Bklit components copied into the repo: verify each licence, restyle, cite in code comments per the playbook.
   - astronify: GitHub exposed no licence; read its LICENSE before using even its mapping logic.
4. **Data and assets carry separate licences**: HiPS surveys (credit the survey owner), SPHEREx/IRSA data (NASA/IPAC acknowledgement), d3-celestial data (BSD-3), HYG catalogue (check before bundling), star textures, fonts. God's Eye View data is NOT reusable; only its MIT code and ideas.
5. If any God's Eye View snippet is ported, keep its MIT notice at the top of that file and list the repo in the credits. Preferred: write from scratch and credit as "inspiration".
6. Fonts and icons: confirm font licences (OFL) and icon sets (lucide ISC, Tabler MIT); self-host fonts.
7. No runtime CDN calls that break a static host or leak data.
8. Ship a visible "Credits and licences" page in the app (covers the NASA/IPAC data acknowledgement) and link it from the submission text.
9. Do not claim NASA endorsement; no NASA logos beyond what the hackathon allows.

---

## 7. What I did NOT find, and what I could not verify

Not found:
- No astronomy-specific React chart component for light curves or spectra (only generic charts and Python tools).
- No mature, maintained, R3F-ready nearby-star or Gaia viewer under an OSI licence (best hits are small personal projects).
- No maintained R3F component for volume rendering of float 3D textures; only three.js examples and small single-author repos.
- No open-source "sensor look" pack for R3F beyond the built-in postprocessing effects and a small CRT demo.
- Public repos of past Space Apps winners were not examined in this pass.

Could not verify (all [U]):
- npm dependents counts (not collected; `opencli npm` was not run in bulk).
- Next 16 compatibility for most packages; I relied on React 19 peer ranges only. R3F 9.8.2 pins `react >=19 <19.4`.
- Gzipped bundle sizes (only unpacked npm sizes were read).
- Last-commit dates for: qrcode.react, react-compare-slider, sonner, vaul, cmdk, number-flow, lz-string; KokonutUI repo location; Shepherd repo location. Downloads were also not collected for react-spring.
- Real-user threads: found for driver.js (HN launch, 348 points) and uPlot (HN Show HN, 260 points). None found for Aladin Lite (only listings with score 1), postprocessing, nuqs, next-intl or html-to-image; no Reddit search was run. A "remotion license" HN search returned nothing relevant.
- Hour estimates are mine; exa was rate-limited once (HTTP 429) and some queries were retried, so recall of niche repos is limited.
- SPHEREx NORAD id, TLE availability, and availability of per-band frames (102 bands) from the pipeline: data questions for the other notes.
- HYG database licence, CARTA article contents, Firefly and DeepSkies licences.
- Whether `OES_texture_float_linear` is available on school Chromebooks and phones; default to NearestFilter or half-float.
- God's Eye View: I read `thermal.js`, `detectionDraw.js`, `trailRenderer.js`, `sharelink.js`, `director/document.js`, `trackedCamera.js` headers (first 45 to 90 lines each), LICENSE, THIRD_PARTY_NOTICES.md, README and package.json. I did NOT read `surveillance.js`, `retro.js` or `noir.js`. Nothing was installed or run.
