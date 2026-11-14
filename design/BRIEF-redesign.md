# Redesign brief (round 2): shared part

Written 14 November 2026, about 19:50 EET. Two directions are built from this brief in parallel: `design/d-observatory/` and `design/e-workbook/`. Each builder also receives its own art direction. This file is the shared part: the client, the product, the interaction, the image treatment, the process and the bar.

## 1. The client and why round 1 failed

The team lead rejected three looks so far. His words, in order:

- on the first app: "nu imi place cum arata, este foarte vibe codat, trebuie sa fie ceva foarte profi si nasa style dar intr-un mod bun, also trb sa fie foarte accesibil pentru oricine"
- then: "not only nasa, i want something that fits the task but is also very pleasing aesthetic"
- on round 1 mockups B and C: "arata napa designul [...] fa ceva impecabil si student friendly, educative format si sa fie super misto"

His standing taste, recorded from earlier projects (read `~/mind/memory/feedback-design-taste.md` in full): dense real information in an airy layout, product-grade polish at the level of Linear, Raycast and Vercel, never templated, no boxes and lines, elevation by shadow and not by line, one accent, a custom palette, tabular numerals. A busy screen that carries little real information reads as generated slop to him.

Why round 1 failed, in the coordinator's judgment (look at `design/b-dial/shots/s1-desktop.png` and `design/c-control-room/shots/s1-desktop.png` before you design anything):

1. The hero of both is a huge grey pixel blob inside a box. The real data was shown raw and looked crude. Nothing on the screen is beautiful.
2. Nothing moves, nothing invites a touch, nothing rewards. It is a page about a tool, not a tool.
3. It is not a lesson. A student gets a paragraph and a button, not a guided experience with a goal, feedback and a reward.
4. The looks are restrained to the point of anonymous: one neutral ground, one orange accent, system-like type.

Round 2 must be the opposite on all four counts.

## 2. Product, audience, job

"Skyblink" (working title): a web tool for the 2026 NASA Space Apps Challenge, challenge "Planet X and SPHEREx". It shows real infrared photos from NASA's SPHEREx space telescope of one small patch of sky, taken months apart, so that anything that moved is easy to spot. The team's angle: it is a lesson. A student finds the star that moved, measures how fast it moves, then how far away it is, then how fast it travels, each next to the true value, and leaves with something to show. The pitch line is "Find the next Tombaugh" (Clyde Tombaugh found Pluto in 1930, aged 24, by flipping between two photographs of the same sky in a blink comparator).

Audience: school pupils from about 14, university students, and curious adults with no astronomy training. Many are on a phone. Some use a screen reader or only a keyboard.

Primary job: within one minute, a student who has never looked at a scientific image sees a star move with their own eyes and wants to measure it.

## 3. The experience, click by click (same for both directions)

Design the task, not screenshots. This is the flow both directions must build.

**S1, first screen (`#/`).** The hero is the blink itself, live, with real data, not a picture of the app. The student can flip between "then" and "now" by pressing and holding one large control (hold Space on a keyboard; press and hold on a phone; a toggle for people who cannot hold). The flip is instant, like a blink comparator, not a cross-fade. One star jumps. One sentence says what this is. One primary action: start mission 1 (it says how long it takes: about 3 minutes). One quiet secondary action: look at any spot in the sky. Autoplay blinking is allowed here only, slowly, and never under `prefers-reduced-motion`.

**S2, mission step "Spot it" (`#/mission/spot`).** Lesson format: where I am in the mission (step 1 of 4), one question ("Which dot moved?"), the blink control, and the student answers by tapping the dot in the image (keyboard: arrow keys move a crosshair, Enter marks). Show the screen in its answered state: correct pick, a short plain confirmation with a real number ("Yes. It slid 6.5 arcseconds in 17 months."), and the next action. A wrong pick gets a helpful hint, never a scolding. A "Show me" escape is always there.

**S3, mission step "Measure it" (`#/mission/measure`).** The two marks (then and now) joined by a drawn trail, a scale bar, and the measurement assembled in front of the student: distance moved, time between, rate. Then the catalogue value beside theirs: 4.58 arcseconds per year measured, 4.68 in the catalogue. One expandable "Why is mine a little different?" with the honest answer (the star also wobbles because Earth moves; that wobble is the next step). An astronomers' trick shown as a toggle: subtract one photo from the other, the fixed stars vanish and the mover is left as a bright and dark pair.

**S4, mission step "How far is it?" (`#/mission/distance`).** A small clear diagram of why a nearby star seems to wobble as Earth goes around the Sun (parallax), then one slider (a native range input with a visible value and unit) that the student moves until the curve fits the measured points on a chart; the misfit number falls as the fit improves. Result: 306 +/- 28 milliarcseconds, which is 10.7 light years; the catalogue says 270.7 milliarcseconds, 12.05 light years; a 12 percent difference, said honestly and kindly ("close, for five photos"). Then speed: 72.5 km/s against 82.0, with one sentence that makes the number concrete. The chart follows the `dataviz` skill.

**S5, the reward (`#/mission/done`).** The student's result as an object worth keeping and sharing: a discovery card in the form of a mission patch or badge generated from their numbers (object name, their motion, distance and speed beside the true values, the dates of the photos, "measured with real NASA SPHEREx data"). A "Copy link" action (the result lives in the link; no account, no name, nothing stored). Then the path onward: the five targets as missions (Epsilon Indi B done; Barnard's Star, the fastest-moving star in the sky; WISE 0855, the challenge's own target, which has moved 134 arcseconds west since 2010; RW Aurigae and R Draconis, two stars that change brightness), and "Explore any spot in the sky".

**S6, the explorer (`#/explore`).** The challenge's core requirement: type a name or coordinates (RA and Dec, in degrees or hours) and watch that patch of sky over time, like a little film. Show it loaded on WISE 0855 with the answer "This object has moved. In 2010 it was here; now it is 134 arcseconds to the west." The film has a time axis that respects the real, uneven dates of the visits, Earlier / Play / Later, the facts of the current visit in plain words (visit n of N, dates, "near infrared, just past red light" with the wavelength range, how many photos were added together), marker toggles (shape plus label, never colour alone), and one glossary term opened in place. It must also show, small, how the loading state reads ("34 of 95 photos, 21 MB") and that a typed position can be shared as a link.

Every screen: an English and Romanian switch (Romanian text required on S1 only, with correct ă â î ș ț), a light and dark theme only if the direction calls for it, the independence line in the footer ("an independent student project for the 2026 NASA Space Apps Challenge; not made, reviewed or endorsed by NASA") and the image credit ("NASA/JPL-Caltech, SPHEREx, via NASA/IPAC IRSA").

## 4. The image: make the real data beautiful, honestly

This is the single biggest lever. The frames are real: 121 x 121 pixels, 3 arcseconds per pixel, float32, one per visit, under `/assets/missions/<id>/` (read the `manifest.json` there and `design/b-dial/app.js` for how to load them; the parallax points are in `/docs/research/experiments/exp13_parallax_epsindb.json`).

- Stretch with asinh (as astronomers do), then colour through an infrared ramp of your direction's palette (a 256-entry lookup table), with a small legend that says the colour shows brightness, not real colour.
- Upscale smoothly for display (bilinear or bicubic from an offscreen canvas), so stars are soft glowing points and not blocks, and offer a "Real pixels" toggle that shows the honest squares. Say in one short line that the photo is real and only enlarged and coloured.
- Never put the photo in a plain box as a grey thumbnail. Each direction says how the sky is framed.
- Choose the crop so the moving star and at least two fixed stars are visible, and the jump between the first and last visit is at least about 25 screen pixels on desktop. Epsilon Indi B moved about 6.5 arcseconds (a little over 2 data pixels) between the first and last visit, so the crop must be tight enough and the display large enough. State crop, stretch and ramp in `NOTES.md`.
- The difference view (S3) is one frame minus the other after alignment, on a diverging ramp.
- No invented imagery, no stock space photos, no generated pictures, no NASA logo or insignia.

## 5. Read before designing (the team's saved skills; reading only, change nothing there)

1. Invoke the skill `frontend-design:frontend-design` with the Skill tool and follow its process: a compact token plan (4 to 6 named colours, type roles, layout concept with ASCII wireframes, principles), then review the plan against its list of generated-design defaults and revise, then build, then critique from screenshots.
2. `~/mind/memory/feedback-design-taste.md`: the lead's taste.
3. `~/.claude/playbooks/design-mockup-pipeline.md` (UX before pixels; tokens, then components, then screens as instances; the quality rubric; the failure catalog), `~/.claude/playbooks/design-system-discipline.md`, `~/.claude/playbooks/frontend-motion-and-ui-libraries.md`.
4. `~/mind/skills-disabled/design-taste-frontend/SKILL.md`: anti-slop calibration.
5. In `~/mind/skills-disabled/emil-kowalski/`: `emil-design-eng`, `animate`, `review-animations`, `break-ui` (read the main file of each).
6. Invoke the skill `dataviz` before writing the chart on S4.
7. `docs/research/15-design-language-and-accessibility.md`, sections D5 and D6 (component notes and the accessibility checklist).

Where these disagree, the lead's own words in section 1 win, then this brief, then your direction's art direction, then the skills.

## 6. Build rules

- Static HTML, CSS and vanilla JS, one page with hash routes, served from the repository root by the server already running at `http://127.0.0.1:3302/` (your page is `/design/<your folder>/`). No framework, no build step.
- Tokens first (colour, type, space, radius, shadow, motion as CSS custom properties), then components built once, then screens assembled from them. No raw hex or pixel value on a component outside the token block.
- Fonts self-hosted in `fonts/` with their licence files (take them from `@fontsource` or `@fontsource-variable` packages with `npm i --ignore-scripts`; latin and latin-ext subsets). No network requests at run time, none at all.
- Motion: Anime.js v4 is allowed for choreography (copy its single ESM build file and its MIT licence into `vendor/`; do not load it from `node_modules` at run time). One orchestrated moment per screen at most; every other motion answers the student's action. Everything works with `prefers-reduced-motion`.
- Screenshots with `playwright-core` installed in your folder (`npm i playwright-core@1.56.1 --ignore-scripts`; it drives the Chromium build 1194 already in the cache, so download nothing; see `design/b-dial/tools/shoot.mjs` for the pattern). Wait on `document.fonts.ready`. Build cache paths from `os.homedir()`, never a literal home path.
- Accessibility floor: text contrast at least 4.5 to 1, non-text marks at least 3 to 1 (compute them), every control keyboard-operable with a visible focus ring, targets at least 44 px on the phone, no horizontal scroll at 390 px, nothing by colour alone, plain words first and the technical term second, a polite live region for state changes.
- Real content everywhere: the numbers in this brief and in the manifests. No lorem ipsum, no invented numbers.
- Copy: plain verbs, sentence case, an action keeps its name through the flow, errors say what happened and what to do. Speak to a 15-year-old without talking down.

## 7. Order, delivery, self-critique

1. Read (section 5), then write your design plan at the top of `NOTES.md`: tokens, type, layout wireframes, the one memorable thing, and what you changed after checking the plan against the generated-design defaults.
2. S1 first. Screenshot it at 1440 x 900 and 390 x 844, READ the PNG, and judge it the way the lead will: would a 16-year-old say "wow" and touch it within five seconds? Is anything boxed, grey, cramped, touching or generic? Fix and reshoot until S1 is something you would put in a portfolio. Do not move on before that.
3. Then S2 and S6 (the two screens that carry the product), then S3, S4, S5. Screenshot each at both sizes: `shots/s1-desktop.png` ... `shots/s6-phone.png`. The phone layouts are designed for the phone, not collapsed desktop.
4. Two critique rounds over all screenshots (read every PNG). Use the quality rubric in the mockup playbook and the `break-ui` checklist. Fix the worst problems each round.
5. axe-core on every screen: zero serious or critical findings, or list what remains.
6. Finish `NOTES.md`: how to run, routes, tokens, crop and stretch, what was reviewed, axe results, open issues, fonts and licences.

## 8. Hard limits

Work only inside your own folder under `design/`. Touch nothing else in the repository. Run no git command that changes state. Never write a person's name, email, account name or absolute home path into any file. No em dash character (U+2014) anywhere. Free tools only; never call any `mcp__perplexity__*` tool or any paid service; put nothing about the team or the project in any outside request. Change nothing under `~/mind` or `~/.claude`. Do not use the Playwright MCP browser tools (use the npm package). Do not spawn subagents. Report faithfully: what you looked at, what you did not.
