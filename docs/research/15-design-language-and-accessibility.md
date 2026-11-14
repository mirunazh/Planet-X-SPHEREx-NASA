# 15. Design language and accessibility (research for the redesign)

Written 2026-11-14. Research only: no code was changed. Every claim is marked VERIFIED (I read the primary source today, fetched with curl, `gh api` or the Jina reader) or UNVERIFIED (from memory or a search snippet only). Contrast ratios are computed by me with the WCAG 2.x relative-luminance formula (script in the scratchpad, `w20/cr.py`). No em dash is used anywhere. No browser tool was used and nothing was installed.

Scope note: the team lead widened the brief to "not only NASA, I want something that fits the task but is also very pleasing aesthetically". NASA is therefore one ingredient. Part A is kept short, Part A2 adds the task's own heritage and the contemporary quality bar, and at most one of the three directions in Part D is NASA-derived.

---

## 0. One-screen summary

### Why the current look reads as "vibe-coded" (read from 6 of the 10 screenshots in `web/docs/screens/`)

1. A neutral dark grey ground (`#1c1c1c` look) with one saturated accent (yellow warning, blue-teal chips): the default "AI dashboard" palette. Nothing about it says sky, plates or infrared.
2. Pill badges everywhere ("Moves", "4 visits", "Changes brightness") that all weigh the same. Eleven small pills on one screen means no hierarchy.
3. A uniform 3-column grid of identical cards, each with a 96 px thumbnail, a title, two pills and a paragraph, and an orphan card in the last row. The five targets are not equal (one is the challenge case) but are drawn equal.
4. One sans-serif (Inter-like), nearly one weight, small grey body text (about 12 to 14 px, about 4.9:1 on the ground at best) and long lines of 70 to 90 characters inside cards.
5. Engineer vocabulary on the main surface: "D5 + D6", "S/N 12.5", "DR1, DOI", "Detector group d5d6", "Stacked per pass / Every exposure". Fails the "no jargon without in-place explanation" rule for first-time visitors.
6. Toggle switches, segmented pills and keyboard-hint chips (`SPACE`, `ARROWLEFT`) form the control surface: a settings-panel look, not an instrument.
7. The image, the hero of the product, is 640 px of enlarged grey pixels with no frame, no plate number, no scale of what is being compared, and a control stack to its side as long as the image. The "It moved" banner is a yellow warning bar (warning colour for good news).
8. The Next.js dev badge, a full-width footer sentence run together ("NASA does not endorse this project. Images: ..."), and a placeholder state ("is the next milestone of this project") that talks about the team's roadmap to a visitor.

### The ten design principles

1. The sky is the page: one large, framed image, everything else is margin, caption and control.
2. One question per screen, one primary action per screen; the rest is progressively disclosed.
3. Say it in a student's words first, the instrument's word second (in-place glossary, never a modal).
4. Every frame carries its receipt (date, band, exposures, source) in a fixed caption slot, like a plate label.
5. Real values everywhere; show the true answer next to the student's answer after they commit.
6. Restraint: one accent, one corner radius, one rule weight, two type families, a strict spacing scale.
7. Colour is never the only signal; every marker has a shape, a label and a text equivalent.
8. Motion explains (blink = same place, different time); it is user-paced, pausable, and has a static step-through twin.
9. Forgiving input: search by name, famous targets, "surprise me", tolerant coordinate parsing, undo, shareable link.
10. Accessibility is the structure, not a skin: semantic HTML first, 44 px targets, visible focus, 320 px reflow, EN and RO.

### The three directions

| | A. Plate (task heritage) | B. Dial (contemporary instrument) | C. Control Room (NASA-derived) |
|---|---|---|---|
| Feel | Observatory logbook meets star atlas: warm paper, ink, engraved labels, registration marks | A well-made physical instrument, Braun and Teenage Engineering: calm light device body, dark viewfinder, one tactile dial | Mission-ops quiet: sharp corners, hairline rules, huge light mono numbers, dashed focus rings |
| Mode | Light (paper), image shown as a negative plate by default | Light body, dark display panel | Dark (carbon) |
| Type | Newsreader + Atkinson Hyperlegible Next + Atkinson Hyperlegible Mono | IBM Plex Sans + IBM Plex Mono | Inter + Public Sans + DM Mono (the HDS stack) |
| Ground / ink / accent | `#F3EEE2` / `#1B1A17` / `#B3261E` | `#E9E7E2` / `#1E1F21` / `#A8340A` (display `#0F1113`, readout `#FFB347`) | `#17171B` / `#E3E3E3` / `#EA6F24` |
| Image framing | Plate with registration crosses, plate number, ruled margin, caption as in a catalogue | Viewfinder window with bezel and corner brackets, readout strip under it | Hairline-framed panel with N/E compass and scale bar, data strip beside it |
| Signature | Two-plate "blink" with a registration-mark overlay and ruled logbook table | A rotary time dial with detents (also a native slider) | A single huge light mono number for the measured value (like HDS `number-lg`) |
| Contrast of key pair | ink on paper 15.03:1 | text on body 13.35:1 | text on ground 13.93:1 |

My pick for students and hackathon judges: **A, Plate**. Reasons in Part D.

### The first-run flow

Land on one sentence and one image: "In 1930 a 24-year-old found Pluto by blinking two photographs. Try it with NASA's newest sky." Under the image, one button: **Start with a real mystery**. It opens the WISE 0855 plate pair (already framed, already blinking slowly, with a one-line caption: "Something here moved. Can you see what?"). Coordinates are hidden behind "Look somewhere else", where the first field is a name search ("Barnard's Star", "Orion"), with five famous-target tiles and "Surprise me". RA and Dec appear only as a read-only, copyable line under the image, with a "what is this?" in-place explanation.

### Top ten accessibility requirements (details and tests in Part C)

1. Body text at least 18 px, line length 45 to 75 characters, line height at least 1.5, contrast at least 7:1 for body, 4.5:1 minimum for everything.
2. Targets at least 44 by 44 CSS px (AA minimum is 24; adopt the AAA value) with 8 px gaps.
3. Visible focus ring of at least 2 px, 3:1 against both states, never hidden behind the sticky header.
4. Every drag (pan, scrub, measure) has a keyboard and a click alternative; the measuring crosshair is keyboard-movable with a numeric readout.
5. Reflow at 320 px and 400 percent zoom without two-dimensional scrolling (except the image itself, which gets zoom buttons).
6. Blink and any flicker: 3 flashes per second ceiling, user-started, pause button always present, `prefers-reduced-motion` starts paused and steps.
7. Every frame and every result has a text description of what changed (a live-region sentence, a data table behind each chart).
8. Colour-blind-safe markers (shape plus label plus colour), greyscale-safe image colour maps, no red/green pairs.
9. Plain language at reading grade 6 to 8 on every instruction, jargon explained in place, English and Romanian with a visible language switch and `lang` attributes.
10. No timeouts, no accounts, no lost state: the link carries the view; every error says what happened and what to do next.

---

## PART A. What "NASA style, in a good way" is made of (kept short)

### A1. The 1975 NASA Graphics Standards Manual (Danne and Blackburn) (VERIFIED, full scan text from archive.org, `NASAgraphics` item, read via pdftotext)

Reissue: Standards Manual LLC, 2015 (https://standardsmanual.com/products/nasa-graphics-standards-manual). Rules quoted from the scan:

- Typeface: "Helvetica is the most important family of type in the NASA Unified Visual Communications System. Helvetica Light is used in combination with the logotype to form the fundamental elements of identification." Headings in Helvetica Medium, "upper and lower case". "Recommended general elements of typographic style include flush left, ragged right column setting, bold face headlines and subheadlines and minimum one-point line spacing in text setting." Rule to take: one family, two weights, flush left, ragged right, sentence case.
- Colour: "NASA red ... is a very active color which brings a kinetic dimension to the letterforms." "NASA red should be used only when a second color is available ... intended to be used only on white or a light value neutral color background. NASA red should not be used with other bright saturated colors." "The use of pale, pastel colors is discouraged in all NASA publications." Rule to take: a single warm accent on a neutral ground; no pastels; red never on a mid-value ground.
- Grid: "A grid is a predetermined understructure which the designer can employ to give a publication cohesive style and character ... it will determine all margins, gutters, folio placement." Interior grid formats exist per publication type (sections 5.14 to 5.20). Rule to take: decide the grid first (2 to 3 columns, fixed margins, a folio line), then place.
- Identity grid: "3 units of the grid are equal to the vertical stroke width" of the logotype (this is why the worm is trusted: it is drawn, not typed). Do not redraw it.
- Not in the scan I could find: exact Pantone and CMYK values (UNVERIFIED; the current brand page gives the Insignia colours, see B).

### A1b. The current system: NASA Horizon Design System (HDS) (VERIFIED, https://github.com/nasa/hds-core, pushed 2026-11-13, pre-1.0, files fetched with curl)

HDS Core is "a theme layer on top of the U.S. Web Design System (USWDS) ... as required by NASA's web modernization policy NID 2800.147". Tokens, from `src/scss/_hds-tokens.scss` (auto-generated from `tokens.json`):

- Brand (lines 4 to 11): NASA red `#f64137` (line 4: "Red means 'go somewhere.' For primary actions navigating to a new page ... Never for on-page actions, decorative use, or dataviz"), red shade `#b60109`, NASA blue `#1c67e3` (line 7: "Blue means 'do something here.' For on-page interactions"), blue tint `#288bff`, blue shade `#0b3d91`, International Orange `#ea6f24` (line 10, secondary accent, "Never for primary actions"), Active Green `#47da84` (line 11, "active mission status and confirmation").
- Carbon neutrals (lines 12 to 23): `#e3e3e3`, `#d1d1d1`, `#b9b9bb`, `#959599`, `#77777a`, `#58585b`, `#444447`, `#2e2e32`, `#17171b` (line 20, "Default background for dark mode"), black, `#f6f6f6` (lightest, light alternate), white.
- Shape (lines 24 to 30): corners `0px` for most components ("Default sharp (square) corners"), `2px` only for small controls; border 1px thin, 2px thick; focus ring "dashed", 1px wide, offset 1px.
- Layout (lines 31 to 37): max width 1200px; margins 16px mobile, 32px desktop; gutters 4/16/24/32px; spacing scale 0, 4, 8, 12, 16, 20, 24, 32, 48, 64, 72, 120, 240 (lines 38 to 50: whole-number keys are layout, fractional keys component-internal).
- Breakpoints (51 to 58): 320, 480, 640, 880, 1024, 1200, 1400, 1920.
- Type (59 to 91): line heights 1 (h1, h2, numbers), 1.15, 1.35 (captions), 1.5 (intro), 1.62 (body), 1.75 (labels). Letter-spacing -0.03em (h1), -0.02em (h2 to h5), +0.025em (caption, metadata). Weights 300 (numbers), 400, 500, 600, 700. Sizes (clamp max): 120, 80, 48, 36, 28, 22, 18, 16, 14, 12 px. Families (lines 89 to 91): headings `'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif`; body `'Public Sans Web', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`; code `'DM Mono', 'Consolas', 'Courier', monospace`.
- Numbers (`_hds-typography.scss` lines 192 to 233): `number-lg` mono, weight 300, 120px max (clamp 80 to 180), line-height 1, letter-spacing -0.05em; `number-md` 48px; `number-sm` 36px; `number-xs` 28px, all mono Light. Rule to take: big numbers are light-weight mono, with a small caps label above.
- Dataviz (`_hds-dataviz-palettes.scss`, dark scheme, lines 27 to 38): `#256ee4 #ef483f #f29d49 #487682 #c2b47c #609af6 #fa8c87 #79a3ad #794be4 #f5af0c #4b9609 #0cc9ac` (12 categorical colours). Note NASA says red and blue are "Never for ... dataviz".
- Licence (`LICENSE.md`): software CC0; fonts Inter 3.019 and DM Mono 1.000 under SIL OFL 1.1; "The NASA Insignia, Logotype, identifiers, and imagery are not in the public domain." Public Sans is also OFL (it is on Google Fonts under `ofl/publicsans`, VERIFIED listing).
- Also bundles Public Sans, as in USWDS. Can the product use HDS itself? HDS Core's README says it is "intended for ... NASA websites ... approved to operate outside of the agency's flagship"; "non-NASA-branded sites should use USWDS instead". So: borrow the token values (CC0), do not present the product as a NASA site.

Older NASA Web Design System (`nasa/nasawds-site`, `nasa/nasawds-old`): both archived ("No longer maintained", last push 2020-02-18 and 2019-12-12, VERIFIED via `gh api`), based on USWDS. Superseded by HDS; ignore.

The NASA brand page names the web typefaces (VERIFIED, https://www.nasa.gov/nasa-brand-center/brand-guidelines/): "Our website is supported by the Horizon Design System which utilizes a combination of three font families": Inter (display and headings, "tall x-height to aid in readability"), plus Public Sans and DM Mono. Print: "The recommended typefaces for all uses are Helvetica and Garamond."

### A3. JPL Explorer 1 (VERIFIED, https://github.com/nasa-jpl/explorer-1, MIT, pushed 2026-11-11)

- Colours from `packages/common/tailwind.colors.ts` lines 6 to 102, with named families: Gray (`#f9f9f9` to `#141414`, 500 = `#767676`), JPL Red hue 349 (500 `#e4002b`, 600 `#ce0026`), Mars Orange (500 `#cc4c11`, 400 `#e85714`), Mylar Gold (300 `#f6d12b`, 500 `#8e7400`), Vegetation Green (500 `#0d8758`), Earth Blue (500 `#0f7eb1`, 600 `#0d6e9c`), Universe Purple (500 `#8755f3`), Cosmic Magenta (500 `#db129c`). Each has a 100 to 900 ladder where 100 to 300 are tints and 700 to 900 are near-black shades of the same hue. Naming colours after what they are (Mylar Gold, Mars Orange) is a taste signal worth copying.
- Type: Helvetica Now in three optical sizes: Display (large headings, over 20 px), Text, Micro ("subtitles and buttons and in UPPERCASE ... small text (captions)"), per `typography.docs.mdx`. Body scale `_typography.scss`: 45/1 (h1) down to 18/1.667 body-lg, 16 body-md, 14 body-sm; stats at 34 to 44 px weight extrabold. The font files are deliberately not in the repo (`fonts/README.md`: "Font files are intentionally not tracked") because Helvetica Now is a licensed Monotype family: do not use it; Inter or Public Sans is the free equivalent.
- Takeaway: JPL's look is white-dominant, one red, photography as the colour, mission "stats" as big numerals. Light backgrounds are normal at JPL; dark is not a NASA requirement.

### A4. Mission operations: Astro UX Design System and Open MCT (partially VERIFIED)

- Open MCT: github.com/nasa/openmct exists in the `nasa` org (VERIFIED listing); plus-plugins (heatmap, map, tutorial). I did not read its CSS: UNVERIFIED on token values.
- Astro UX DS (Rocket Communications): `RocketCommunicationsInc/astro` exists, but `LICENSE.md` did not resolve and the repo's licence API returned NOASSERTION (VERIFIED: licence unclear, check before copying; the web components live under `packages/web-components`, including `rux-global-status-bar`). Its published design idea, from what I know (UNVERIFIED today): dense dark UI, seven standardised status symbols whose meaning is carried by shape plus colour (so the status is readable colour-blind), tabular numerics and monospaced telemetry. The shape-plus-colour status symbol is the one rule worth taking; it is also WCAG 1.4.1.
- What I take from both: data density is made calm by alignment, tabular figures and a status vocabulary, never by decoration.

### A5. Eyes on the Solar System and the Scientific Visualization Studio (UNVERIFIED in detail; I did not read their CSS)

Observed pattern (general knowledge, UNVERIFIED today): near-zero chrome over the image, labels in one light sans, controls collapsed to a bottom time bar with a date readout, credits as a single line at the foot of every visualization page ("Credit: NASA's Scientific Visualization Studio" with the data provenance). Rule to take: the date and the scrubber are the only permanent control; credit is one line, always present.

### A6. Sky tools the public already uses (UNVERIFIED in depth; prior art read in notes 02 and 10 of this repo)

- WiseView (Backyard Worlds): URL-state, speed and difference controls, power-user oriented; works for people who have been shown it; weak first-visit explanation. Zooniverse itself separates a Tutorial (first visit, per workflow) and a Field Guide (always on hand) (VERIFIED, https://help.zooniverse.org/transcription-project-guide/designing-for-volunteers/, sections 4.5.1 and 4.5.2: tutorials "appear the first time a volunteer opens a Workflow"; "Volunteers should come away with an understanding of your basic project goals ... and what they will be asked to do"; the Field Guide holds "frequently-used abbreviations, lists of common places and names"). Rule to take: tutorial once, glossary always.
- ESASky, WorldWide Telescope, Aladin Lite, IRSA Firefly: I did not run them. Known failure for first-time visitors (UNVERIFIED, general): they open on a map with a dozen panels and a coordinate box. Rule to take: do not open on the tool; open on a question.
- Sky Guide (Apple Design Award 2014, VERIFIED via GeekWire, 2014): "intuitive, smooth and easy to pick up, but capable of providing some deeper features to users who want to seek them out", a tap pulls out a "drawer with plenty of facts", and a night-vision mode "replaces all of the app's bright white areas with red light".

### A7. U.S. Web Design System (UNVERIFIED today beyond HDS's dependency on it)

USWDS (designsystem.digital.gov) uses Public Sans (OFL), a "strong, neutral" face from the U.S. government, designed for legibility, and publishes accessibility notes per component (VERIFIED only that HDS builds on it and bundles Public Sans). I did not read component rules.

### A8. What separates NASA style in a good way from kitsch

| Good (evidence) | Kitsch (what to avoid) |
|---|---|
| Restraint: one family and two weights (1975 manual), one red used sparingly | A "sci-fi" display font (Orbitron, Exo, Audiowide), neon cyan and magenta together |
| Grid decided first (1975 section 5; HDS spacing scale with named roles) | Floating cards at random offsets, parallax everything |
| Real imagery with a credit line, framed, captioned | Starfield wallpaper behind text, fake nebula gradients, stock "astronaut" renders |
| Precise labels, units, dates, uncertainty | Fake HUD ring overlays, scanlines, "SYSTEM ONLINE" tags, invented telemetry |
| Status colour has a defined meaning (HDS: red = go somewhere, blue = do something here, green = active) | Glow, bloom, glassmorphism, gradient text on headings |
| Sharp corners, hairline rules, big light numbers (HDS `number-lg`) | Pills and 24 px radii on everything |

---

## PART A2. What fits the task and is beautiful

### A2.1 The heritage of the task

Primary material read:
- Blink comparator and the Pluto plates: Smithsonian National Air and Space Museum, "Finding Pluto With the Blink Comparator" (VERIFIED, https://airandspace.si.edu/stories/editorial/finding-pluto-blink-comparator): plates 36 by 43 cm taken 23 and 29 January 1930 with a 13-inch lens; Tombaugh "rotating a small dial that flipped a mirror back and forth between the beams from two microscopes"; the device works "in an office" not a dome; the museum's own page offers the blink as an animation "Can you find it?" and then "the next animation with arrows marking the elusive object". That pair (blink, then arrow) is exactly the product's Look, then Mark.
- Harvard Plate Stacks (VERIFIED, https://platestacks.cfa.harvard.edu/our-collection and /project-phaedra): "nearly 600,000 glass plate negatives of the night sky", the StarGlass database, and "over 2,500 scientific notebooks made by ... Women Astronomical Computers", the PHaEDRA logbook project. The notebooks and plate jackets are the visual source for logbook tables.

Authentic visual vocabulary (what real artefacts have, rather than decoration). The vocabulary list is from my knowledge of these artefacts (UNVERIFIED as a design survey; the two sources above confirm negatives, jackets and notebooks exist):
1. Negative rendering: plates are negatives (stars black on pale). Offering "plate view (negative)" is authentic and also prints and projects well. It is a function, not a style: faint objects are easier to see as dark on light for many viewers, and the toggle explains photography history.
2. Plate jacket label: a ruled field with plate number, date, exposure time, telescope, plate scale ("the receipt"). Maps one-to-one to the product's caption slot (date, band, exposures, source files).
3. Registration marks and crop marks: small crosses at the corners and mid-edges; in blinking, aligning two plates uses them. Use them as the real alignment cue between two epochs, never as ornament.
4. Engraved labels and ruled tables: logbooks are columns with hairline rules, right-aligned figures, a date column. Use them for the measurement log.
5. Grids and ticks: coordinate graticules with tick labels in the margin, as in atlases. Use a RA/Dec tick border on the image instead of a floating HUD.
6. Marginalia: handwritten-style annotations are tempting but decorative; the authentic equivalent is a printed marginal note tied to a mark with a leader line.
7. Arrows and circles: the museum's own Pluto animation ends with arrows. Use thin arrows, not glows.

What would be wrong to copy: sepia filters over the real image (it falsifies data), faux paper texture that lowers text contrast, skeuomorphic brass, "handwriting" fonts for instructions (hard to read and fail dyslexic readers), and anything that makes the page look old when the data is from 2025 and 2026.

### A2.2 Award-level public astronomy and science products

Sources read: Sky Guide (GeekWire 2014, VERIFIED, quoted in A6), Nadieh Bremer interview (Communication Arts, 2019, VERIFIED page exists; I read only the introduction). I did not open Stellarium, ESA Webb, ESO, the Pudding, Quanta, NYT or Reuters pages today, so everything below about those is UNVERIFIED general craft knowledge, stated as rules for the designer to check by eye against the live sites.

| Reference | Rule to take | Do not copy |
|---|---|---|
| Sky Guide (ADA 2014) | Depth by drawer (facts on tap, never on the main view); night-vision red mode as a first-class theme; sound as a gentle extra | The 2014 skeuomorphic glow; sound as the only cue |
| Stellarium web and mobile | Clean overlay labels in a single light sans; time control that is always one tap away | Dense menu forests; constellation art overlaid by default |
| ESA Webb and Euclid sites; ESO | Image first, caption and credit directly under, large readable captions, scale and compass bars, a "what you are seeing" paragraph | Press-release marketing tone, hero parallax |
| Webb image releases | Every release image ships with a text description and a credit line (also the model for alt text) | Over-processed false colour presented as photograph; always say which filter maps to which colour |
| Nadieh Bremer | Custom, deliberate charts with annotation inside the graphic and a distinct visual idea per piece; beauty from precise geometry, not effects | Decorative radials where a simple line would be clearer |
| The Pudding, Quanta | Scrollytelling where each scroll step changes one thing and the text says so; generous measure and leading; one accent | Scroll-jacking, auto-playing motion the reader cannot pause |
| NYT, Reuters graphics | Annotated charts with direct labels, no legends where avoidable, a source line under each graphic, consistent small multiples | Newsroom density at mobile widths without simplification |

### A2.3 Learning products known for clarity and craft (UNVERIFIED, general)

- Brilliant and Khan Academy: one problem per screen, immediate feedback, hints that unlock progressively, a visible progress marker, generous whitespace around the interactive. Do not copy the gamification (streaks, XP) for a classroom tool with minors.
- Duolingo onboarding: first value before sign-up; the user does something within seconds. Do not copy the mascot-led, guilt-based copy.
- Exploratorium and Cooper Hewitt digital: labels that ask a question and invite handling; object-first pages with unusual but legible typography and a credit line. Cooper Hewitt's collections site is a precedent for a restrained, type-led, image-first public UI (UNVERIFIED).

### A2.4 Instrument and product design with restraint

- Dieter Rams (VERIFIED, https://rams-foundation.org/foundation/design-comprehension/theses/): "I expressed in ten principles the basic considerations that determine my work". The principles that apply: "Good design makes a product useful"; "Good design is unobtrusive"; "Good design is thorough down to the last detail"; "Good design is as little design as possible" (I read the page header and first two principles today; the rest are from memory, UNVERIFIED). For this product: the instrument's design recedes so the data speaks.
- Braun, Teenage Engineering, Leica, Hasselblad (UNVERIFIED, general craft knowledge): a body in a warm neutral, a single accent used for one thing only (Braun's orange for the active control, TE's orange for the primary action), controls that look operable (a dial looks turnable), numbers in a mono or tabular face on a dark display. Not to copy: a retro skeuomorphic recreation of a device; the point is the discipline.
- Linear, Stripe, Vercel, Apple HIG (UNVERIFIED, general): a tight type scale, near-black on near-white with a restrained accent, 4/8 spacing rhythm, motion of 150 to 250 ms with ease-out that explains a state change, depth via a one-pixel border and one soft shadow, not blur. Apple HIG: dynamic type that respects user text size, system fonts for reading, clear hierarchy through size and weight not colour, touch targets 44 pt. Not to copy: the "Linear look" (dark grey with violet glow) which is exactly the generated tell below.

### A2.5 Tells of a generated or templated interface in 2026 (to avoid each)

Primary practitioner source read: Sitepeel, "How to Tell If a Website Looks AI-Generated" (VERIFIED, https://sitepeel.dev/guides/check-if-website-looks-ai-generated/, 2026-10-24). Its table lists: Inter or browser default on every heading; an accent word in another colour or gradient; stock indigo-to-violet; gradient text; glows and blobs; frosted glass; default hero (pill badge, centred headline, one line, two buttons); icon card grid (icon, title, one sentence, even grid); emoji icons; generic copy ("Build. Ship. Scale.", "Not just X, it's Y"); unsourced numbers ("10K+, 99.9%, 24/7" with no unit, date or source); no real pictures. It also says "One tell means little; several strong ones together make a page look generated" and "Some tells, like Inter or icon card grids, appear on great sites too".
Further tells I name from reading the team's own screenshots and general practice (UNVERIFIED as a community list; I did not find a usable Hacker News or Reddit thread, the `opencli hackernews` call returned an empty list and the CLI warned of an update): default dark grey ground plus one saturated accent; pill badges on everything; uniform card grids with an orphan last row; centre-aligned hero with a gradient; one font weight in body and heading; equal padding everywhere (no rhythm: tight inside groups, generous between); toggle-switch settings panels; keyboard-hint chips; a "status" badge that carries no status; tooltips as the only explanation; emoji as icons; every section ending in a call-to-action button; copy that talks about the project instead of to the visitor; rounded 12 to 16 px corners on every element; drop shadows on cards in dark mode; "Powered by" badges; framework dev badges left on screenshots.
How a designer avoids each: pick one corner radius (0 or 2 px) and one rule weight; use size and position, not pills, for hierarchy; unequal grid (one hero target, four smaller); left-aligned text; two type families with a clear role each; spacing scale with named roles (HDS: 8 within a group, 24 or 48 between); real numbers with units, date and source; real photographs only; copy written for the visitor in the second person.

---

## PART B. What a participant may and may not do with NASA's identity

All quotes VERIFIED today from https://www.nasa.gov/nasa-brand-center/images-and-media/ and /brand-guidelines/ (fetched with the Jina reader), plus HDS `LICENSE.md`.

Insignia, logotype, seal (brand-guidelines page): "The NASA Insignia (the blue 'meatball' logo), the NASA Logotype (the 'worm' logo) and the NASA Seal may not be used for any purpose without explicit permission. These images may not be used by persons who are not NASA employees or on products, publications or web pages that are not NASA-sponsored. These images may not be used to imply endorsement or support of any external organization, program, effort, or persons." So: no meatball, no worm, no seal, anywhere in the app, the video, the slides or the repo logo. Do not redraw or imitate them either (the 1975 manual notes the worm is a drawn construction on a 3-unit grid; a lookalike wordmark in NASA red with that letterform would read as a violation). Also avoid a "NASA" wordmark set in a way that looks like an identifier.

Imagery and data (images-and-media page): "NASA content ... generally are not subject to copyright in the United States. You may use this material for educational or informational purposes, including ... Internet Web pages." "NASA content used in a factual manner that does not imply endorsement may be used without needing explicit permission. NASA should be acknowledged as the source of the material." Copyright-protected third-party material on NASA sites is marked with the holder's name and needs their permission. Also: "NASA will not promote or endorse or appear to promote or endorse a commercial product, service or activity."

AI (SI) next to NASA identifiers, same page: "NASA does not permit our Insignia (i.e., NASA Meatball, Worm logotype, or Seal) to appear with SI generated imagery or in the training of SI tools. To promote transparency, NASA strongly encourages SI-generated products maintain a marking indicating the product is SI generated." And: "attribution of the information directly to NASA is not permitted" for SI-model outputs; "References like 'according to NASA' or similar are prohibited in SI products." So: no NASA logos at all (the team uses SI tools); do not write "according to NASA" next to any model-written text; real SPHEREx images may be credited factually because they are data, not SI output. Mark any SI-generated image with a visible mark (also required by the Space Apps rules, see note 01 line 23 and note 14 D2).

Space Apps participant rules (from note 01, read earlier today): SI tools permitted but must be marked; "No NASA logos/branding in generated content"; all code, text, images listed in references.

HDS licence line worth echoing (VERIFIED): "When using or citing the work, you should not imply endorsement by the author."

Exact credit lines to use:
- SPHEREx data, IRSA (VERIFIED acknowledgement text from https://irsa.ipac.caltech.edu/data/SPHEREx/docs/overview_qr.html): "This publication makes use of data products from the Spectro-Photometer for the History of the Universe, Epoch of Reionization and Ices Explorer (SPHEREx), which is a joint project of the Jet Propulsion Laboratory and the California Institute of Technology, and is funded by the National Aeronautics and Space Administration." Cite the DOI for the release used: QR1 10.26131/IRSA629, QR2 10.26131/IRSA652, QR3 10.26131/IRSA662, DR1 images 10.26131/IRSA678 (from note 03, VERIFIED there).
- Short per-image caption (my wording, not NASA's official text): "Image: NASA/JPL-Caltech, SPHEREx, via the NASA/IPAC Infrared Science Archive (IRSA). Processed by us (stacked and aligned)." The existing footer uses "NASA/JPL-Caltech" and IRSA; the "NASA/JPL-Caltech" credit style is the NASA convention (UNVERIFIED that it is mandated for SPHEREx; the DOI acknowledgement above is the one IRSA actually asks for).
- IRSA service acknowledgement (generic IRSA wording "This research has made use of the NASA/IPAC Infrared Science Archive, which is funded by the National Aeronautics and Space Administration and operated by the California Institute of Technology"): UNVERIFIED, I could not fetch the IRSA page that states it; confirm at https://irsa.ipac.caltech.edu before the video.
- Disclaimer (what the footer already does, keep): "This is an independent student project made for the 2026 NASA Space Apps Challenge. It is not made, reviewed or endorsed by NASA." Keep it as plain text, not inside a banner.
- Other catalogues: SIMBAD, CDS Strasbourg (acknowledgement texts not fetched, UNVERIFIED), Gaia, CatWISE2020.

---

## PART C. Accessibility for everyone, done beautifully

Each pattern lists its source and a quick test. Primary sources read today: W3C "What's New in WCAG 2.2" (VERIFIED, https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/), W3C COGA "Making Content Usable for People with Cognitive and Learning Disabilities" (VERIFIED, https://www.w3.org/TR/coga-usable/, page exists; I read the opening only), PNAS Zorzi 2012, PMC Wery and Diliberto, PMC Kuster et al., BDA Style Guide 2023, Okabe-Ito hex via colorblindr, Astronify evaluation (arXiv 2209.04465). The WCAG 2.1 criteria list below is from my knowledge of the standard (UNVERIFIED line by line today), the WCAG 2.2 additions are VERIFIED from the W3C page.

### C1. WCAG 2.2 AA checklist for this product

| SC | What it means here | Test |
|---|---|---|
| 1.1.1 Non-text content | Each sky frame has alt text that says what is shown and what changed; decorative marks `aria-hidden` | Screen reader (VoiceOver, NVDA), axe DevTools |
| 1.2.x Time-based media | Any explainer video: captions (1.2.2) and transcript; audio description or a described transcript (1.2.5) | Play muted; read the transcript |
| 1.3.1 Info and relationships | Real `<table>` behind each chart; labelled inputs; headings in order | axe, Accessibility tree in dev tools |
| 1.3.4 Orientation | Works portrait and landscape | Rotate phone |
| 1.3.5 Identify input purpose | Not applicable (no personal data), keep forms free of personal fields | n/a |
| 1.4.1 Use of colour | Markers differ by shape and text label, not colour only | Greyscale screenshot; Stark or Chrome "emulate vision deficiency" |
| 1.4.3 Contrast (minimum) | 4.5:1 text, 3:1 large; adopt 7:1 for body (1.4.6 AAA) | Computed table in Part D; axe |
| 1.4.4 Resize text | 200 percent without loss; test to 400 | Browser zoom |
| 1.4.5 Images of text | None | grep for text in images |
| 1.4.10 Reflow | No 2D scroll at 320 CSS px (400 percent of 1280); the zoomable image is exempt as a "two-dimensional layout" but must have zoom buttons | Resize to 320 px |
| 1.4.11 Non-text contrast | Borders of inputs, focus ring, marker outlines at least 3:1 | Contrast checker on each control |
| 1.4.12 Text spacing | Layout survives line-height 1.5, paragraph 2x, letter 0.12em, word 0.16em | "Text Spacing" bookmarklet |
| 1.4.13 Content on hover or focus | Glossary popovers dismissible (Esc), hoverable, persistent | Manual |
| 2.1.1 / 2.1.2 Keyboard, no trap | Everything operable by keyboard; the image canvas is escapable | Tab through, then unplug the mouse |
| 2.2.1 Timing adjustable | No time limits; no auto-advancing lessons | Manual |
| 2.2.2 Pause, stop, hide | Blink and any motion over 5 s has a pause control | Manual |
| 2.3.1 Three flashes | Blink at 2 fps default, maximum 3 per second; consider a luminance-difference check on frames | PEAT-style check, or count flips per second |
| 2.4.1 Bypass blocks | Skip link to the image | Tab once |
| 2.4.3 / 2.4.7 Focus order and visible | Logical order; visible focus | Tab through |
| 2.4.11 Focus not obscured (minimum) (AA, new in 2.2) | A focused control is not fully hidden by a sticky header or bottom player bar | Tab with a sticky bar present |
| 2.4.13 Focus appearance (AAA, 2.2) | At least a 2 CSS px perimeter, 3:1 change; W3C text: "is at least as large as the area of a 2 CSS pixel thick perimeter of the unfocused component ... has a contrast ratio of at least 3:1 between the same pixels in the focused and unfocused states" | Visual |
| 2.5.1 Pointer gestures | Pinch-zoom and pan have button alternatives | Test with one finger |
| 2.5.3 Label in name | Visible label text is in the accessible name | axe |
| 2.5.7 Dragging movements (AA, new) | Every drag (pan, scrub, crosshair) has a single-pointer click alternative | Try with arrow keys and click |
| 2.5.8 Target size (minimum) (AA, new) | 24 by 24 CSS px minimum; adopt 44 (2.5.5 AAA) | DevTools element size; spot check |
| 3.1.1 / 3.1.2 Language | `lang="en"` or `lang="ro"` on the page, and on any phrase in the other language | axe |
| 3.2.2 / 3.2.3 / 3.2.4 Predictable | No context change on input; consistent navigation | Manual |
| 3.2.6 Consistent help (A, new) | Help or glossary link in the same place on every screen | Manual |
| 3.3.1 / 3.3.3 Errors | Error text names the field, the problem and an example fix | Type bad coordinates |
| 3.3.4 Error prevention | Reversible actions, undo, nothing destructive | Manual |
| 3.3.7 Redundant entry (A, new) | Do not make the student retype coordinates or answers between steps; carry them in the URL | Manual |
| 3.3.8 Accessible authentication (AA, new) | Not applicable: no login | n/a |
| 4.1.2 Name, role, value | Custom controls (dial, crosshair, tabs) expose role and value | axe, accessibility tree |
| 4.1.3 Status messages | Frame changes and results announced with `role="status"` (polite) | Screen reader |

W3C removed 4.1.1 Parsing in 2.2 (UNVERIFIED in the page text I saw; known from the standard).

AAA items worth adopting: 1.4.6 contrast 7:1; 1.4.8 visual presentation (line width at most 80 characters, no justified text, spacing at least 1.5, paragraph spacing 1.5 times line spacing); 1.4.9 no images of text; 2.2.6 timeouts; 2.3.3 animation from interactions can be disabled; 2.4.8 location; 2.4.13 focus appearance; 2.5.5 target size 44; 3.1.3 unusual words (glossary), 3.1.4 abbreviations, 3.1.5 reading level (lower secondary), 3.3.5 context-sensitive help; 3.2.5 change on request.

### C2. Cognitive accessibility and plain language

- COGA (W3C): objectives include helping users understand what things are and how to use them, find what they need, avoid mistakes and recover from them, focus, and use clear language (VERIFIED headings; I read the page opening, "People with cognitive and learning disabilities often need common behavior and design patterns."). Design patterns I apply: one clear primary action, same layout across screens, short steps, undo, no timing pressure, plain wording, icons paired with text.
- Plain language (UNVERIFIED today, general): plainlanguage.gov (US Plain Writing Act) and GOV.UK content design (aims at reading age about 9) ask for short sentences (15 to 20 words), common words, active voice, the reader as "you". Adopt: instructions at reading grade 6 to 8 (check with a Flesch-Kincaid grade tool), sentences at most 20 words, one idea per sentence, a unit written out the first time ("arcseconds, tiny angles; 3,600 arcseconds make one degree").
- In-place jargon explanation pattern: a dotted-underline term that is a real `<button>` opening an inline (not modal) definition of at most 25 words with an example, with a persistent Glossary page. Test: Tab to the term, Enter, Esc, and screen reader announces the definition.
- Progressive disclosure: default view shows image, blink, one question. "Details" (band, detector, exposures, files) sit under a `<details>` labelled "How was this made?".
- Forgiving input: accept `08h55m10.831s -07d14m42.53s`, `08 55 10.831 -07 14 42.53`, decimal degrees and a name; show a parsed echo ("I read this as RA 133.795 degrees, Dec minus 7.245 degrees"); never reject silently. Test: paste ten formats.
- Undo and reset: "Start again" never loses the link; every measurement can be removed individually.
- Zorzi 2012 (VERIFIED, https://www.pnas.org/doi/10.1073/pnas.1205566109): extra-large letter spacing improved dyslexic children's reading: "they read significantly faster in the spaced than the normal version [1.87 versus 1.64 syllables/s]" and made fewer errors (6 versus 11.8). Evidence for a modest letter-spacing option (0.05 to 0.12em) over any special font.
- BDA Style Guide 2023 (VERIFIED the first page: "Use sans serif fonts ... as letters can appear less crowded"; I did not read the rest, so the 12 to 14 point, 1.5 line spacing, no italics or justified figures are UNVERIFIED from memory).
- Dyslexia fonts do not help (VERIFIED): Wery and Diliberto (https://pmc.ncbi.nlm.nih.gov/articles/PMC5629233/): OpenDyslexic produced no benefit and in their small study lowered fluency and accuracy; "there is 'no evidence' of OD having a positive effect on reading speed or accuracy". Kuster et al. 2017 (https://pmc.ncbi.nlm.nih.gov/articles/PMC5934461/): children with dyslexia (n = 170) did not read Dyslexie-font text faster; but "Dyslexie does not affect reading negatively. If children prefer to read texts in Dyslexie, there is no reason to discourage this." Take-away: do not ship a "dyslexia font" as a feature; offer a clean hyperlegible face, spacing and a "bigger text, more space" toggle.

### C3. First-time visitors with no domain knowledge

- Citizen science onboarding (VERIFIED Zooniverse guidance): tutorial on first open, field guide always available, test the workflow with "people less familiar with your data" (section 4.1.1.4, "Always experiment and iterate ... walk through your Workflows and Tasks at every step"). The team's acceptance test 5 (three outsiders finish the first mission in under 3 minutes) matches.
- Museum label practice (UNVERIFIED today; Smithsonian Guidelines for Accessible Exhibition Design and the common 50 to 150 word label convention): primary label of 1 to 3 short sentences, large type (around 24 to 36 pt on walls, here 18 to 24 px on screen), high contrast, a tactile or audio alternative, a question that invites looking. Apply: the caption under the image is the exhibit label: bold one-sentence claim, then a one-sentence "look at".
- Teen audience (UNVERIFIED): start from a concrete mystery and a task, give small wins, show the real answer after they commit, avoid condescension. No emoji, no mascots.

### C4. Low vision, colour blindness, dyslexia

- Typefaces (all VERIFIED present in `google/fonts` under `ofl/` with an `OFL.txt` file; Atkinson Hyperlegible Next, designer "Braille Institute, Applied Design Works, Elliott Scott, Megan Eiswerth, Letters From Sweden", `date_added` 2025-01-07, SIL OFL 1.1; also Atkinson Hyperlegible Mono): Atkinson Hyperlegible Next, Atkinson Hyperlegible Mono, Newsreader (Production Type), Instrument Serif, Source Serif 4, Literata, Public Sans, IBM Plex Sans and Mono, JetBrains Mono, DM Mono, Hanken Grotesk, Schibsted Grotesk, Figtree. All listed with a `latin-ext` subset in their `METADATA.pb` except where I did not read it (Atkinson Next showed `latin` and `latin-ext` in my read, but verify Romanian ă â î ș ț, with comma-below, renders by typing "Șoimul țâșnește în înălțime" in the self-hosted file). Inter and Fraunces repos are OFL (`gh api` licence field).
- Sizes: body 18 px minimum (Explorer 1 body-lg is 18 px with line height 1.667; HDS body is 16 px at 1.62), captions never below 14 px (HDS goes to 12 px, do not copy for body-relevant text), line length 45 to 75 characters (`max-width: 65ch`), left-aligned and not justified.
- Colour-blind-safe palette (VERIFIED, Okabe-Ito in `colorblindr` `palette_OkabeIto`): `#E69F00 #56B4E9 #009E73 #F0E442 #0072B2 #D55E00 #CC79A7 #999999` (the draft in note 14 used these hexes from memory; they are correct). Contrast computed by me: on white, `#0072B2` 5.19:1, `#D55E00` 3.87:1 (fails for small text; use for marks, not body text); on `#0F1113`: `#56B4E9` 8.20, `#E69F00` 8.40, `#F0E442` 14.31, `#009E73` 5.53, `#CC79A7` 6.18, `#0072B2` 3.65 (marks only). Use at most four categories at once and always add the shape and label.
- Scientific colour maps for imagery: Crameri (https://www.fabiocrameri.ch/colourmaps/, VERIFIED page: "perceptually uniform ... colour-blind friendly"; licence UNVERIFIED, I believe MIT), viridis and cividis (matplotlib/CC0 as I recall, UNVERIFIED; cividis is explicitly designed for colour-vision deficiency, UNVERIFIED today). Default image rendering is greyscale (or negative); a wavelength layer uses one monotone-in-lightness ramp (cividis or Crameri batlow), never rainbow.
- Dark mode is optional, not default: dark backgrounds can cause halation for people with astigmatism, a point widely made by low-vision practitioners (UNVERIFIED here). Offer both, honour `prefers-color-scheme`, and ship a red "night-sky mode" like Sky Guide's (VERIFIED, A6).
- Tests: Chrome DevTools Rendering tab "Emulate vision deficiencies"; axe DevTools; WebAIM contrast checker; browser zoom to 400 percent; Windows High Contrast / forced-colors (`forced-colors: active`; HDS ships forced-colours tests under `scripts/forced-colors`, VERIFIED listing).

### C5. Blind and screen-reader users of an image-based astronomy tool

- Text equivalent for every frame: a one-sentence live description generated from the data, for example "Frame 3 of 4, 3 to 5 microns, 14 April. The brown dwarf is 8 arcseconds west of where it was in frame 1." Update a `role="status"` region when the frame changes (not on every autoplay tick; during playback announce only on pause).
- Data table behind every chart and the measurement log as a real `<table>` with `<caption>` and `<th scope>`.
- Keyboard crosshair: the measuring tool is a focusable `role="application"`-free widget (avoid `role="application"`; use a group with arrow-key handling): arrows move 1 px, Shift+arrows 10 px, `+` and `-` zoom, `Enter` places the mark, readout "X 61, Y 58, RA ..., Dec ...", `Delete` removes. The same via two number inputs.
- Sonification evidence: Astronify (STScI) has been evaluated for 1D light curves (VERIFIED, arXiv 2209.04465, Brown, Harrison, Zanella, Trayford): "the simple default sonification method within astronify has potential utility for identifying high SNR signals in univariate light curves for users with little-to-no experience", but "only received between 1 and 3 responses from participants who identified as having a vision impairment ... too low to make any significant conclusions". So: sonification is promising for light curves, not proven for images or blind users. Use it only as a bonus (a pitch that follows brightness over the epochs of the R Draconis curve), always with the table and text as the primary equivalent. NASA and Chandra sonification projects exist (note 14 D3 covers audio licences); I did not read their evaluation.
- Tests: VoiceOver (macOS, Cmd+F5) and NVDA; Tab only; check that the live region does not interrupt itself during playback.

### C6. Motor and device constraints

- Keyboard-only and switch: logical tab order; a "next frame / previous frame / play" trio all as real buttons; Space and Arrow keys documented in a visible help line; no keyboard shortcuts that conflict with screen-reader keys; large targets (44 px) help switch scanning.
- Alternatives to drag and hover: pan by arrow buttons, zoom by buttons, scrub by `<input type="range">` plus step buttons, measurement by click-click or keyboard; tooltips are never the only carrier of information (WCAG 1.4.13, 2.5.7).
- Old and small phones, slow connections: the 121 by 121 px frames are small, good; serve text first; `font-display: swap` with self-hosted subset woff2 (one family, two weights, about 60 to 120 KB); no web fonts from Google (a privacy problem with minors); no WebGL requirement for the core path; a `prefers-reduced-data` fallback to the first frame only. Test with Chrome DevTools throttling "Slow 3G" and CPU 4x slowdown; Lighthouse accessibility score is a smoke test only.

### C7. Deaf and hard-of-hearing users, and non-native English readers

- Any video: burned-in or caption track and a transcript; no information carried by sound alone (any sonification has a visual twin). Space Apps allows non-English video with English subtitles (note 01).
- Language: English and Romanian with a visible switch (EN | RO) in a fixed place, `lang` on the html element and on inline foreign phrases, URL carries `lang`, scientific terms given in both ("paralaxa / parallax"). Romanian strings run longer (about 15 to 25 percent, UNVERIFIED) so buttons must grow, not truncate. Test: pseudo-localise by adding 30 percent text; set `lang=ro` and check hyphenation and diacritics.
- Icons always with text labels (COGA pattern); no idiom ("blink" is explained: "flip between two photos").
- Test: mute the page and complete the first mission; run the whole flow with the browser set to Romanian.

---

## PART D. Synthesis

### D1. Ten design principles

(see the summary at the top; they are the brief)

### D2. Three visual directions

All three use sentence case, left-aligned text, 18 px body, 65ch measure, 44 px targets, a visible 2 px focus ring, and a measured-values-first layout. They differ in character.

#### Direction A: "Plate" (grows from the task's heritage)

How it feels: a well-kept observatory logbook. Warm paper, black ink, a single printer's red. The sky image sits on the page like a plate pasted into a catalogue, with registration crosses at the corners, a plate number and a ruled caption underneath. Quiet, confident, human, entirely unlike the other dark dashboards in the competition.

References: Harvard Plate Stacks and the PHaEDRA logbooks (VERIFIED sources above), the Smithsonian's blink-comparator page (VERIFIED), 1975 manual discipline (flush left, one family, one warm accent, no pastels), classic star atlases (UNVERIFIED as individual references), editorial science sites (Quanta, NYT graphics: measure, leading and direct labels).

Typefaces (all SIL OFL 1.1, self-host woff2): Newsreader (display, headings and the one-sentence captions; optical size axis, `latin-ext`), Atkinson Hyperlegible Next (all UI, labels, buttons, body at small sizes), Atkinson Hyperlegible Mono (coordinates, dates, measured values). Fallback `Georgia`, `system-ui`, `ui-monospace`.

Palette (light, with computed contrast):
- Paper `#F3EEE2`, plate sheet (cards, plate matte) `#E7E1D2`, ink `#1B1A17`: ink on paper 15.03:1, ink on sheet 13.34:1.
- Muted text `#5A5448`: 6.49:1 on paper, 5.76:1 on sheet.
- Rule and control border `#6F6858` (non-text): 4.78:1 on paper, 4.24:1 on sheet (the lighter `#8A8370` is 3.26 on paper but only 2.89 on sheet, so do not use it on the sheet).
- Printer's red accent `#B3261E`: 5.65:1 on paper, with paper-coloured text on a red button also 5.65:1. Red marks only the object to find, the primary button and the focus of the lesson, never red for errors alone (errors add an icon and the word "Problem").
- Link blue `#1F4E8C`: 7.18:1 on paper.
- Focus ring: 3 px ink `#1B1A17` plus a 1 px paper gap (15.03:1).
- Image data marks: Okabe-Ito vermilion `#D55E00` and blue `#0072B2` with shapes; they sit on the image, which is dark in positive view and pale in negative view, so give marks a paper halo (`#F3EEE2`) of 2 px.

Why light: a classroom projector and bright phone screens, no halation; paper is the heritage; competition screenshots are dark. Dark "darkroom" mode is the toggle (ground `#14130F`, text `#EDE7D8`).

Image framing: positive/negative toggle ("Plate view" = negative). A 1 px ink frame, an outer margin with RA and Dec tick labels in mono, registration crosses at the four corners and mid-sides, a caption block like a plate jacket: "PLATE 2 of 4. 21 April to 14 May 2026. 3.8 to 5.0 microns. 36 exposures." with a "Files" `<details>` below. The scale bar is a ruled segment "10 arcseconds".

Numbers and dates: Atkinson Mono, tabular, right-aligned in ruled tables; dates written "21 April 2026" (never ambiguous numeric dates); large values at 40 px mono beside a small-caps label; the true value follows in muted text: "You measured 10.1 arcsec/yr. NASA's catalogue says 10.4."

First screen: a Newsreader headline "In 1930 a 24-year-old found Pluto by blinking two photographs." Under it the live blinking plate pair of the WISE 0855 patch with caption "Something here moved." One red button "Find what moved". A text link "Look somewhere else" (name search, famous targets, Surprise me). Nothing else above the fold.

Not generated because: warm paper rather than grey, a serif voice, unequal layout (one big plate, a ruled logbook, no card grid), no pills (status is a word plus a rule weight), a real artefact vocabulary with a function (registration marks align the two epochs), copy in the visitor's voice.

Signature a visitor remembers: the registration-mark blink: two plates flip under a fixed crosshair, and the moved object slides between two printed rings; the Mark button draws the thin leader arrow, as in the Smithsonian's Pluto animation (VERIFIED).

Accessibility without looking like compliance: 15:1 ink is just "black on paper"; large serif headlines carry hierarchy so small text can stay at 18 px; target size is a ruled "button strip" of 48 px cells like a logbook row; the focus ring is the ink outline, looks like a draftsman's box; Newsreader never goes below 20 px.

Risks and what to cut if time is short: paper texture is a no (flat colour only); skip the tick-label margin on phones; positive view is the default only if testing shows the object is easier to see that way (test with three people).

#### Direction B: "Dial" (grows from contemporary instrument and product design)

How it feels: a camera or a Braun-era measuring device translated to the screen: a calm warm-grey body, a dark rounded-rectangle viewfinder, one tactile dial, one orange. Precise, tactile, a little playful, never retro.

References: Braun and Dieter Rams (principles 2 "makes a product useful", "unobtrusive", "as little design as possible", partly VERIFIED), Teenage Engineering and Leica and Hasselblad interfaces (UNVERIFIED, general), Apple HIG on depth, touch targets and Dynamic Type (UNVERIFIED), Linear and Stripe's type discipline (UNVERIFIED), Sky Guide's drawer pattern (VERIFIED).

Typefaces (SIL OFL 1.1, self-host): IBM Plex Sans (UI and body; Mike Abbink and Bold Monday; has `latin-ext`) and IBM Plex Mono (readouts, scale, coordinates). Optional display: none; headings are Plex Sans SemiBold at big sizes with tight tracking (-0.02em, as HDS does).

Palette (light body, dark display) with computed contrast:
- Body `#E9E7E2`, text `#1E1F21`: 13.35:1. Muted `#55575B`: 5.86:1.
- Orange accent. Text and borders use `#A8340A` (5.38:1 on body; white on it 6.64:1). Warning: the brighter instrument orange `#C2410C` only reaches 4.19:1 on the body as text (fails AA for small text; white on it is 5.18:1, fine for large button text).
- Control edge `#7D7F84`: 3.24:1 on body (non-text 3:1 OK).
- Display `#0F1113`: text `#E8EAEC` 15.69:1, amber readout `#FFB347` 10.62:1, muted `#A4A9AF` 7.99:1.
- Focus: `#0B57D0` on body 5.17:1; `#8AB4F8` on display 8.98:1.
- Image marks: Okabe-Ito sky `#56B4E9` (8.20:1 on display) and orange `#E69F00` (8.40:1) with shape and label.

Why light with a dark display: the body of the product stays readable in daylight, the image gets a dark viewfinder, which is the proper surround for faint objects (and one dark area, not a dark page). Respect `prefers-color-scheme` by also providing an all-dark body.

Image framing: the viewfinder has a 12 px bezel, 4 corner brackets, a thin crosshair-free interior (a fixed centre dot optional), a readout strip underneath in mono (frame, date, band) like a camera's data strip. N/E compass and scale in the bottom left of the viewfinder.

Numbers and dates: Plex Mono, tabular, amber on the dark strip, big values in 56 px mono Light inside a "display window", unit in small caps next to it. Dates "21 Apr 2026" with month names.

First screen: left, a calm headline and the one sentence of pitch; right, the instrument with the dial at rest and the viewfinder already showing WISE 0855. One orange button "Turn the dial" under it. Primary interaction: rotate the dial (a real `<input type="range">` styled as a dial, arrow keys step through the passes, with a click and drag fallback and visible step buttons).

Not generated because: warm grey and physical metaphors rather than a dark dashboard, real constraints (one control family), accent carries meaning (the dial and the object, nothing else), no card grid.

Signature: the time dial with detents: each step clicks (a CSS snap, optional subtle haptic `navigator.vibrate(5)`, and an audible tick only if the user turns on sound), the scale of days is printed around its rim, with "21 Apr", "14 May" marked.

Accessibility without looking like a compliance exercise: the dial is a native range input (role, value, keyboard for free) with a visible numeric readout; a bezel makes the 44 px targets look like instrument buttons; focus is a blue ring that echoes a camera's selection frame; the dark display gives 15:1 where the image sits.

Risks: dial drag on touch must not trap vertical scroll; skeuomorphic shading must stay flat (no gradients). Cut the haptic and rim ticks first.

#### Direction C: "Control Room" (the one NASA-derived direction)

How it feels: JPL-quiet mission operations: carbon ground, sharp corners, hairline rules, light-weight monospaced numerals, tiny uppercase labels. Serious and trusted; the stripped-back opposite of sci-fi.

References: HDS tokens (VERIFIED, quoted in A2), JPL Explorer 1 (VERIFIED), Astro UX status symbols and Open MCT density (partly UNVERIFIED), the 1975 manual's flush-left discipline.

Typefaces (OFL 1.1, self-hosted; the same trio NASA's own site uses, VERIFIED): Inter (headings and display), Public Sans (body, 18 px), DM Mono (numbers, coordinates). Do not use Helvetica Now (licensed).

Palette (dark, HDS tokens, computed on `#17171B`):
- Ground `#17171B` (HDS carbon-90, "Default background for dark mode"). Text `#E3E3E3` 13.93:1; white 17.88:1; muted `#B9B9BB` 9.12:1 (do not go below carbon-40 `#959599` at 5.99:1).
- Accent International Orange `#EA6F24`: 5.79:1 on the ground, black on orange 6.80:1. NASA's own rule: orange "Never for primary actions"; here we reverse that on purpose, which means we are not following the HDS role rules; so keep NASA red and NASA blue out entirely, or use NASA blue tint `#288BFF` (5.30:1) for links and on-page actions, and orange only for the moving object. Blue `#1C67E3` itself fails as text (3.49:1).
- Active Green `#47DA84` (9.90:1) only for "detected" status, always with a check icon and word.
- Rules: carbon-50 `#77777A` 4.00:1 (use for control borders), carbon-60 `#58585B` is 2.52:1 (decorative hairlines only).
- Focus: HDS dashed 1 px ring is too thin for AA 2.4.13; use a 2 px dashed `#FFFFFF` ring with a 2 px offset (17.88:1).

Why dark: it is the mission-ops convention, it makes faint objects pop in a dim room, and it is HDS's dark default; but offer light (HDS carbon-05 `#f6f6f6`) via the toggle.

Image framing: a panel with a 1 px carbon-50 border, no radius, N/E compass top right, scale bar bottom left, a column of data labels beside it as a status strip (DATE, BAND, EXPOSURES, DETECTED with the check). The frame sits in a 12-column grid (HDS gutters 16 px, margins 32 px, max width 1200 px).

Numbers and dates: DM Mono Light, tabular, the measured value at `number-md` 48 px with a small uppercase label (HDS Overline: 12 px, 700, +0.025em; raise to 14 px in the app). Dates ISO-like "2026-04-21" with the month spelled out beneath.

First screen: a dark page with one big mono number: "1930" with the line "Pluto was found by blinking two photos"; beside it the image; a single blue "Start" button (link-coloured). Everything else is one-line labels.

Not generated because: no radius, no pills, no gradient, numbers as the hero, named tokens, status as shape plus colour.

Signature: the single huge light mono measurement ("10.1 arcsec/yr") that counts into place, with the true value printed next to it.

Accessibility without a compliance look: the grid, uppercase labels and dashed ring already read as "instrument". Risks: this is the closest to the existing dark look, so it needs the hard rule of no cards, no pills; and the "NASA-grade" feel could be misread as a NASA site, so the disclaimer line stays visible.

### D3. Which one I would pick

**Direction A, Plate**, for students and hackathon judges:
1. It carries the pitch visually: Tombaugh blinked photographic plates; judges see the story in the interface (Presentation score), and the real artefacts (Harvard stacks, Smithsonian blink) are citable (VERIFIED sources).
2. It is the most distinct in a field of about 144 repos that mostly share dark dashboards (note 01, VERIFIED there): Creativity is scored against existing ideas.
3. It is the most accessible by default: 15:1 ink, serif-led hierarchy, light ground, a calm voice for first-time visitors, and "negative plate" is a useful view.
4. No NASA identifiers are imitated (Part B risk is lowest).
5. Cost: no WebGL, no images of paper; it is typography, rules and a few SVG marks, so it is feasible in the time left.
If the team prefers a more "product" feel, B is the second choice; C is the safest but the closest to what was rejected.

### D4. First-run experience for someone who has never heard of right ascension

What they see: the headline, the blinking plate pair, one red button. What they can do: press "Find what moved". Step 1 (Look): the two plates blink slowly under the registration crosses; a one-sentence caption "Two photos of the same sky, taken weeks apart. One dot is in a different place." A "Show me" button draws the arrow. Step 2 (Mark): they click the dot (or press Enter on the keyboard crosshair); the app shows "It moved 12 arcseconds. That is the width of a hair seen from 10 metres" (UNVERIFIED analogy, replace with a checked one). Step 3 (Measure): speed and distance with the true value shown after they commit.
How coordinates are made unscary: they appear last and read-only ("Where in the sky is this? RA 133.795 degrees, Dec -7.245 degrees. [What do these mean?]"), the explainer being in place: "Right ascension and declination are the sky's longitude and latitude." A "Look somewhere else" panel: a single search field "Search a star or object name" (SIMBAD name resolution is possible; UNVERIFIED that it is already wired), five famous targets as large text buttons each with one line, a "Surprise me" button, and "Type coordinates" as the last option with the parsed echo and example formats.

### D5. Component list with accessibility notes

| Component | Notes |
|---|---|
| Coordinate input | One text field plus format hint ("Try: 08 55 10.8 -07 14 42"), `inputmode="text"`, `aria-describedby` for the hint and the parsed echo; errors name the problem and show the nearest valid example; accept name search; keep the value in the URL (3.3.7) |
| Name search / targets | Combobox with `role="combobox"` only if truly needed, otherwise a plain field and a list of links; targets are buttons with names, not images only |
| Player with a time axis | Buttons: previous, play/pause, next (each with text label and 44 px); the axis is an `<input type="range">` with `aria-valuetext` = "Frame 3 of 4, 14 April 2026"; ticks at real dates, not equal spacing (the dates are uneven, show that); announce frame change on pause; `prefers-reduced-motion`: start paused, show a side-by-side two-plate view instead of a blink; speed control as a select, not a segmented pill |
| Image with markers | `<figure>` with `<figcaption>` (plate label) and a `longdesc`-style adjacent text; markers are an SVG overlay with shape + text label + a table of positions; zoom and pan buttons; the canvas is focusable only if it has keyboard operation, otherwise skip it |
| Readout | A definition list (`<dl>`) of date, band, exposures, source; values in mono, labels first; copy-to-clipboard button with status message |
| Glossary term | `<button class="term">` with `aria-expanded`, inline definition, Esc to close, 25 words max; no tooltip-only |
| Measuring tool | Two-click or keyboard crosshair, numeric X/Y fields as an alternative, undo and clear buttons, announces the result in a status region, always shows the unit and the true value after commit |
| Slider (parallax, speed) | Native range input with visible numeric output; avoid library sliders (note 14 lists open Astryx Slider accessibility bugs); minimum 44 px thumb |
| Result card | A heading, one sentence, a value in big mono, the true value beside it, a "how we got this" `<details>`; no pill badge; no colour-only pass/fail: "Close: within 3 percent" |
| Error state | Plain sentence, cause, next action, no blame; focus moves to the message; keeps the user's input |
| Empty state | "We have no SPHEREx pictures of this patch yet. Try one of these five" with buttons (replaces "is the next milestone of this project") |
| Loading state | A skeleton of the plate frame with text "Fetching the first photo from NASA's archive (about 2 s)"; announce completion; time out gracefully to "No coverage" |
| Language switch | `<a lang="ro" hreflang="ro">Română</a>` and English, fixed position, current language marked with text not colour only |
| Footer credit | One plain paragraph with the IRSA acknowledgement, DOI links, and the "not endorsed by NASA" line |

### D6. Accessibility acceptance checklist (30 lines or fewer, for a reviewer)

1. Run axe DevTools on every screen: 0 serious or critical issues.
2. Tab through the whole first mission with the mouse unplugged; nothing unreachable, no trap, order logical.
3. Focus ring visible on every control, 2 px or more, 3:1 against both neighbours; not hidden by a sticky bar.
4. All text at least 4.5:1 (body 7:1 target); non-text parts 3:1 (checker on borders, markers, the dial).
5. Body 18 px, captions at least 14 px, lines at most 75 characters, left-aligned.
6. Zoom to 400 percent and resize to 320 px: no horizontal page scroll, nothing clipped.
7. Apply the text-spacing bookmarklet: nothing overlaps or is lost.
8. Every target at least 44 by 44 px (spot check 10 controls); 24 px absolute minimum.
9. Every drag has a click or key alternative: pan, scrub, measure (arrows, buttons, number fields).
10. Blink: starts paused if `prefers-reduced-motion`; never above 3 flashes per second; pause visible.
11. Turn on VoiceOver or NVDA: each frame change is described in words; the table behind each result reads correctly.
12. Image alt text says what changed, not "image".
13. Greyscale screenshot and "emulate protanopia, deuteranopia, tritanopia, achromatopsia": every marker is still distinguishable by shape and label.
14. No red/green pairs; image colour maps are cividis/viridis/Crameri, not rainbow.
15. Forced-colours mode (Windows High Contrast): controls and focus remain visible.
16. Paste ten coordinate formats and bad input: parsed or a helpful message with an example; value stays in the field.
17. Copy the link into a private window: same view, no login.
18. No time limits anywhere; nothing resets after inactivity.
19. Every error says what, why and what to do; focus lands on the message.
20. Reading grade of all instructions at most 8 (Flesch-Kincaid tool); sentences at most 20 words.
21. Every jargon term in the lesson text has an in-place glossary button; no tooltip-only help.
22. English and Romanian: `lang` attributes correct, diacritics (ă â î ș ț) render, longer strings do not truncate.
23. Mute the audio: nothing lost; any video has captions and a transcript.
24. Slow 3G and 4x CPU throttle: first meaningful frame within 5 s, text readable before the image loads.
25. Works without hover; works on a small old phone (about 360 px wide, 2 GB RAM class).
26. Help/glossary link in the same place on every screen.
27. No NASA meatball, worm or seal; credit line and IRSA acknowledgement present; "not endorsed" statement present.
28. Page `<title>` and a single `<h1>` per screen; skip link present; landmarks (`header`, `main`, `footer`).
29. User test: three outsiders (one on a phone, one using only the keyboard, one with the text size set large) finish mission 1 in under 3 minutes.
30. Print the page: the plate and caption survive in black and white.

---

## What I could not verify, and what I did not find

- NASA Open MCT CSS tokens and Astro UX Design System token values: not read (Astro's licence resolved as NOASSERTION; `LICENSE.md` URL 404). Status-symbol claims are from memory.
- NASA Eyes on the Solar System and the Scientific Visualization Studio: I did not open them; the rules in A5 are from memory.
- ESASky, WorldWide Telescope, Aladin Lite, IRSA Firefly, WiseView, Backyard Worlds: not run or read today beyond Zooniverse's help pages; first-visit failure claims are general knowledge.
- USWDS component accessibility rules and Public Sans specimen: not read; only Public Sans's OFL listing in `google/fonts` and HDS's use of it.
- Pantone or CMYK values of the 1975 NASA red: not found in the scan text; the current Insignia colour formulas were on the brand page but I did not extract them.
- Smithsonian "Guidelines for Accessible Exhibition Design" and label-writing practice: not fetched; museum label figures are from memory.
- Stellarium, ESA Webb and Euclid, ESO, The Pudding, Quanta, NYT and Reuters graphics, Brilliant, Khan Academy, Duolingo, Exploratorium, Cooper Hewitt, Teenage Engineering, Leica, Hasselblad, Linear, Stripe, Vercel and Apple HIG: none fetched; every rule about them is UNVERIFIED craft knowledge for the designer to confirm by eye. Rams: only the intro and first principles read.
- Practitioner threads on "AI-looking" UIs: one dated guide read (Sitepeel, 2026-10-24); `opencli hackernews search` returned an empty list and no Reddit thread was read, so the additional tells are my own list.
- plainlanguage.gov, GOV.UK style guide and reading-age targets: not fetched. BDA Style Guide: only the first lines read. W3C COGA: opening read only. WCAG 2.1 criteria wording: from memory; 2.2 additions verified.
- Crameri, viridis and cividis licences: not verified (I believe MIT, CC0 and CC0).
- IRSA's generic archive acknowledgement line and SIMBAD/CDS acknowledgement texts: not fetched.
- Romanian diacritic support (ș ț comma-below) of each recommended font: only `latin-ext` metadata seen, glyphs not rendered.
- Whether Space Apps judges favour a particular look: no source found.
- Contrast numbers for the rejected screenshots are estimates from pixels read by eye, not sampled; the computed values for the proposed palettes are exact from the hex values.
