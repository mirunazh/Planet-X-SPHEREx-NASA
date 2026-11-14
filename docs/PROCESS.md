# How this was built

An account of the process: the timeline, the method, the tools, the truthful role of the AI assistant, what was verified and how, what failed, and how to reproduce any result. Written on Saturday 14 November 2026 at about 19:10 (Bucharest time, EET), while the work was still in progress. Anything not finished is marked **in progress**.

**Snapshot.** This document is a snapshot from 14 November 2026, about 19:40 EET. It will be refreshed when the workers still running finish: the static exposure index (`packages/spherex-index/`, `pipeline/index/`, `assets/index/`), the three design mockups (`design/`), and the local branches `wip/live-path` and `wip/missions`. None of these is in the repository yet.

## 1. Timeline

Hackathon: Saturday 14 and Sunday 15 November 2026. Times are EET. The plan file records the real times of each worker's output ("the hours are those of the files"); times for the early research notes come from file times where the plan does not state them. The first three commits in the repository (12:53, 13:59, 14:10) are the earlier 3D globe app; every later commit is part of the new work and was made at about 19:08, when the work was packaged for the push.

| Time (Sat 14 Nov) | What happened | Evidence |
|---|---|---|
| Saturday, from the start (times not recorded) | The team lead set the goal and direction: an educational tool, a talent funnel for school and university students, on the challenge "Planet X and SPHEREx". | Section 3 below |
| 12:53 to 14:10 | The earlier 3D globe "SPHEREx Sky Navigator" (root of the repository), built on NASA HiPS tiles. How it was made is not documented here. | `git log`: `Initial commit`, `feat: SPHEREx sky navigator...`, `feat: explain every interface element on hover` |
| about 14:30 | Note 01 written: challenge text, hackathon rules, judging criteria, past winners, existing public attempts. | `docs/research/01-challenge-and-hackathon.md` |
| 14:30 to 17:00 (exact times of notes 02, 03, 05, 06 not recorded) | Research notes: WiseView and prior art (02); SPHEREx mission and data products (03); IRSA coverage probe (04, 16:19); cutout and CORS probe (05); targets and Planet X science (06); web stack options (07, 16:21). | notes 02 to 07 |
| 16:32 | Note 08: the detectability experiment on real data (can a person see Barnard's Star and WISE 0855 move?). | `docs/research/08-...`, `experiments/det08_*` |
| 17:06 | Note 09: the S3 byte-range reader, validated bit for bit against IRSA cutouts; Epsilon Indi B, R Draconis, RW Aurigae in real data. | `docs/research/09-...`, `experiments/exp09_*` |
| after 17:06 | The 24-hour plan (`docs/plans/RUN-spherex-24h.md`, in Romanian) written directly from the research notes. The multi-candidate planning tool (`/ultraplan-local`) was not run: it would have cost 30 to 40 minutes of the clock. | the plan, header |
| 18:11 | Fast-mover catalogue done (23,073 objects). | plan section 7; `assets/movers.json` |
| 18:15 to 18:17 | Notes 11 (graphics and experience libraries) and 12 (science and physics libraries) done. Note 13 (parallax feasibility) done at 18:17. | notes 11 to 13 |
| 18:24 | Mission assets for the five targets done and re-verified by the orchestrator: 269 checks. | `assets/missions/`, `pipeline/check_missions.py` |
| 18:27 | Second batch of workers started: the TypeScript S3 library, the viewer v1, video and design research, the measuring-mission logic. | plan section 7 |
| 18:38 to 18:39 | Note 14 (video and design tooling) done: the `brag` video plugin read by hand and not installed, Remotion not used, the 30-second storyboard. | `docs/research/14-...` |
| 18:41 | Video harness worker started. | plan |
| 18:45 | `spherex-core` done: 52 of 52 tests, then 55 of 55 after the end-to-end run at 18:55. | `packages/spherex-core/` |
| 18:46 | Viewer v1 done: 57 tests, type check and production build pass, screenshots reviewed. | `web/`, `web/docs/screens/` |
| 18:50 | Design foundation worker started (custom Astryx theme, `/watch` page, student-facing text). | plan |
| 18:52 | `missions-core` done: 32 of 32 tests. | `packages/missions-core/` |
| 18:57 | Static exposure index worker started. **In progress, not yet in the repository.** | plan; `packages/spherex-index/` |
| about 19:08 | Work packaged into commits on `wip/spherex-time-viewer` for the push. | `git log` |

Planned for Sunday (from the plan, not yet done; the first two are in progress on local branches `wip/live-path` and `wip/missions`, not yet in the repository): live loading for any coordinate wired into the app; measuring missions wired in; the 3D layer; the demo video; the form. Milestones are in `docs/ECHIPA-START-AICI.md`, section 5.

## 2. Method

The same loop was used for every piece of work.

1. **Research first.** Fourteen notes (01 to 14), each with an explicit label on every claim: VERIFIED (read at the source or produced by a command that day) or UNVERIFIED (memory, second-hand, or not tested). Notes 08, 09 and 13 are experiments on real data with their scripts, logs and figures kept in `docs/research/experiments/`.
2. **A milestone plan** (`docs/plans/RUN-spherex-24h.md`): frame (goal, non-goals, acceptance tests), decisions to take, milestones M0 to M6 with checkpoints, an order in which to cut features, five lanes for five people, and a list of what was borrowed from whom.
3. **Work packages with a written brief.** Each worker got: the goal, the non-goals, acceptance criteria, a test plan, hard constraints, and what not to touch. A worker that edits `web/` was the only one allowed to do so at a time.
4. **The maker never graded its own work.** After each worker reported, the orchestrating session reran every test suite, type check and build itself, and looked at the screenshots, before the work was accepted. The numbers in section 5 are those reruns.
5. **Science code is checked against astropy** with golden fixtures: the TypeScript library reproduces astropy's pixel boxes bit for bit and its sky-to-pixel conversion to 1.7e-11 pixel.
6. **Write the method down before fitting.** The parallax method was written into note 13 (section 0, "Pre-registration") before any fit was run, with the rule for calling a result a measurement. Deviations are listed in note 13 section 6.
7. **Record choices made after looking.** Every manifest carries `provenance.choicesAfterLooking`; the notes list the checks added after looking at the data (for example the R Draconis core rule in note 09).
8. **Keep negative results.** WISE 0855 and Barnard's Star parallax are not measurable from the available data (0.7 to 1.1 and 0.4 sigma). The R Draconis period is consistent with a 246-day cycle but not demonstrated. WISE 0855 reads about 22 percent low in motion because it blends with a static star. Barnard's Star reads about 13 percent low because its core saturates, so Epsilon Indi B is the graded target.
9. **Free tools only.** Research used web search and page readers that cost nothing. Nothing paid was used.

## 3. How AI was used (truthful account, for the "Use of Super Intelligence" field)

This section is the record the team needs to fill the mandatory form field. It says what the team did and what the AI assistant did, without softening. The team lead should read it and confirm every sentence before it is copied into the form.

**What the team did.** The team lead set the goal and the direction: an educational tool that works as a talent funnel for school and university students. The team lead chose the direction at every fork and made the decisions, for example that the main film uses SPHEREx data only and that other telescopes are optional context, and approved pushing the work to the public repository. The earlier 3D globe (repository root) predates the new work; this document does not describe how it was made, so the team should describe that part separately in the form.

**What the AI assistant did.** The assistant was Claude Code (Anthropic). The orchestrating session ran on Claude Fable 5.2; it planned, divided the work, wrote the briefs, reran every check and judged the results. Claude Opus workers did the hard implementation and the review (mission assets and pipeline, the parallax feasibility test, the TypeScript S3 library, the viewer, the measuring-mission logic, the video harness, the design foundation, the static index). Claude Sonnet workers did research and mechanical work (the fast-mover catalogue, the surveys of graphics and science libraries, the video and design tooling research). The versions of the Opus and Sonnet workers are not recorded in the repository. The assistant:

- wrote the research notes (01 to 14) and the experiments in them;
- drafted and refined the 24-hour plan, including the menu of ideas in plan section 6, the four-step structure (Watch, Measure, Hunt, Report) and the pitch wording ("Find the next Tombaugh."); the team lead chose among them, and the educational-funnel idea itself is the team's;
- wrote the code and the tests in `pipeline/`, `packages/`, `web/` and `video/`, and the student-facing texts in the app;
- wrote these documents.

**A point for the team lead to decide.** The challenge FAQ says SI "should not be used to come up with your idea of how to solve the challenge" (note 01). The idea of the educational funnel is the team's. The assistant proposed the concrete menu of features (for example the parallax distance mission and the space-time cube) and the tagline; the lead decided which to build. State that division exactly as it happened.

**What is not AI-generated, as far as the repository shows.** No image-generation or video-generation model was used for the scenes: the video scenes are drawn by code (`video/scenes/`), the soundtrack is synthesised by code (`video/audio.mjs`), and the data images are computed from NASA data. The team lead should confirm this against anything made outside the repository before submitting.

**Draft text for the field** (English; adapt after reading the above):

> The idea (an educational tool that works as a talent funnel for students) and all direction and decisions are the team's. We used an AI coding assistant (Claude Code by Anthropic) as a tool: it researched the challenge and the data services, drafted the plan, wrote the code, tests and documentation, and checked the work. Every number in the project was reproduced by running the code, and science code was tested against astropy. The documentation of the process is in `docs/PROCESS.md` in the repository. No AI-generated imagery or voice is used in the demo video.

(The last sentence is true only if the final video keeps to that; recheck when the video is done.)

## 4. Tools

Everything below is free software or a free public service. No API keys exist in the project.

| Tool | Version | Used for |
|---|---|---|
| Python through `uv run --with ...` | uv 0.11.21; packages astropy, numpy, scipy, reproject, matplotlib, pillow | The pipeline and the research experiments. No virtual environment in the repository. |
| Node.js and npm | Node 20.9 or later (22.23.1 used); npm 10.9.8 | All TypeScript and web work. npm 10.9 crashes on vitest's optional peers, hence `--legacy-peer-deps`. |
| TypeScript | 5.9.3 | Libraries and web app. |
| vitest | 4.1.12 | Tests. |
| Next.js, React, zustand | 16.4.6, 19.3.1, 5.1.0 | The web app. |
| Astryx design system (`@astryxdesign/core`, `@astryxdesign/theme-neutral`, MIT) with `@stylexjs/stylex` | 0.7.16, 0.19.2 | Interface components and theme. |
| Playwright | 1.63.0 | Rendering video scenes frame by frame; browser checks and screenshots. |
| ffmpeg | 8.1.1 | Joining frames, mixing audio, loudness. The Mac build has no `subtitles` or `drawtext` filter, so text is rendered in HTML. |
| curl, gh | | Probing services; GitHub. |
| harper-cli | | Grammar check of user-visible English text. |
| gitleaks | | Secret scan before every push. |
| Claude Code (Anthropic) | orchestrator Claude Fable 5.2; Claude Opus and Claude Sonnet workers | See section 3. |
| Free web search and page readers | | All research. Nothing paid. |

Public data services, all without keys: IRSA TAP and SIA, IRSA IBE cutouts (validation only), the public AWS S3 bucket `nasa-irsa-spherex`, SIMBAD (Harvard mirror). Details: `docs/DATA.md`.

Considered and not used: Remotion (its licence does not clearly cover an informal team of five and is not OSI), the `brag` video plugin (read by hand; the full variant needs an unreviewed second skill pack and its CLI sends telemetry, so not installed), Firecrawl and other paid services, Perplexity (never called), `api.nasa.gov`.

## 5. Verification table

"Orchestrator reran" means the session that planned the work ran the command itself after the worker reported. "Ran today (docs pass)" means the documentation pass also ran it at about 19:08 on 14 November.

| What was checked | How | Result | Where the evidence lives |
|---|---|---|---|
| Mission assets (five targets) | `pipeline/check_missions.py`: schema, every file and size, coverage, science numbers | 269 checks, 0 failed. Orchestrator reran at 18:24; ran today (docs pass). Contact sheets for WISE 0855, Epsilon Indi B and Barnard looked at and consistent. | `pipeline/check_missions.py`, `assets/missions/*/contact.png` |
| Total asset size | same check | 25.7 MB (limit 40 MB) | same |
| S3 range reader (Python) vs IRSA cutouts | pixel comparison, `np.array_equal(..., equal_nan=True)` | 6 of 6 exposures bit-identical; wavelength and bandwidth identical to 1e-15 µm | note 09 section 2, `experiments/exp09_validate.json` |
| TypeScript library vs astropy | golden fixtures from the Python pipeline | pixel boxes bit-identical; sky to pixel within 1.7e-11 px; 1.2e-10 arcsec; wavelength identical | `packages/spherex-core/test/golden.test.ts` |
| `spherex-core` tests and type check | `npx vitest run`, `npx tsc --noEmit` | 55 tests pass, type check clean. Orchestrator reran (18:45, 18:55); ran today (docs pass). | `packages/spherex-core/` |
| Live build equal to the Python build | end-to-end test on the real bucket, Epsilon Indi B (group d2) and WISE 0855 (group d5d6) | same passes, stack correlation 1.000000, max difference under 1e-6 MJy/sr, centroids equal to 1e-4 px; 93 frames in 12 to 16 s after the exposure list, about 68 MB, 0 S3 failures | `packages/spherex-core/README.md`, `test/e2e.test.ts` |
| `missions-core` tests and type check | `npx vitest run`, `npx tsc --noEmit` | 32 tests pass, type check clean. Orchestrator reran; ran today (docs pass). | `packages/missions-core/` |
| Parallax reproduced in TypeScript | fit with proper motion fixed to Gaia on the 93 exposures | 306.18 +- 28.08 mas, 3.266 pc, 72.5 km/s, matches note 13 | `packages/missions-core/test/parallax.test.ts` |
| Click rounding and motion | tests on real stacks | centroid 0.001 px on Epsilon Indi B and 0.015 px on WISE 0855; Barnard flagged as saturated core; motion within 0.0003 arcsec/yr of the manifest | `packages/missions-core/test/` |
| Web app | `npm test`, `npm run typecheck`, `npm run build`, screenshots | 57 tests pass, type check and production build pass (orchestrator reran at 18:46). **Not rerun by the docs pass** (a worker was editing `web/`). | `web/docs/screens/` |
| Fast-mover catalogue | `pipeline/movers/check_movers.py` | all PASS; WISE 0855 propagated to 2010.5 is 0.43 arcsec from the challenge coordinates; ran today (docs pass) on both files | `pipeline/movers/NOTES.md` |
| Static exposure index | `npx vitest run` in `packages/spherex-index` | 7 geometry tests pass (ran today). Planned: equal to the archive at 30 positions and for the five targets. **In progress, not yet in the repository.** | `packages/spherex-index/` |
| Detectability on real data | experiment note 08 | WISE 0855 detected in every pass with 6 or more exposures (D5+D6 per-pass S/N 8.7 to 13.9), motion matches the prediction; Barnard's Star visible only without the flag mask | note 08, `experiments/det08_*` |
| Parallax feasibility | pre-registered method, then fit | Epsilon Indi B: 306 +- 28 mas with Gaia proper motion (10.9 sigma), 330 +- 70 mas fitted entirely from SPHEREx (4.7 sigma, marginal); not measurable for WISE 0855 and Barnard | note 13; a second run gave a byte-identical log |
| Video harness | `video/test.mjs` | The audit file `video/out/audit.json` records 130 samples, 549 text checks, minimum contrast 8.28 and no failures. Harness done; the film itself is not (shots 3 to 8 are placeholders). Result from the harness worker's last run on 14 November 2026; not rerun by the docs pass. | `video/out/audit.json` |

## 6. Dead ends and lessons

- **Main SIMBAD endpoint returned 404 that day.** The Harvard mirror worked; the builder tries both.
- **Python `urllib` hung** on some archive calls while `curl` worked on the same URL.
- **The network dropped several times**; one download lost 157 of 190 files. Lesson: write notes and caches to disk early, make every download resumable.
- **TAP `INTERSECTS` returned wrong counts** (6 rows against 363). Use `CONTAINS(POINT, poly)`.
- **The IRSA search service answered 502** for minutes at a time. Lesson: keep it out of the request path (static index, in progress, not yet in the repository).
- **The archive's FLAGS mask erases saturated stars.** Not applied.
- **The challenge coordinates for WISE 0855 are a 2010 position.** An assumed epoch of 2014 would have put the prediction 29 arcsec off, nearly five SPHEREx pixels.
- **Static stars do not cancel in difference images**, because each pass samples a different wavelength mix; difference mode is secondary and last to survive cuts.
- **Raw SPHEREx astrometry has a seasonal shift** of about 0.2 arcsec that imitates parallax (60 percent too high, confidently) until corrected with reference stars.
- **IRSA cutouts are 4 MB each regardless of size**; this forced the move to range reads.
- **Remotion** was not used (licence unclear for an informal team). **`brag`** was read by hand and not installed.
- **Estimates were wrong**: the plan notes its own hour estimates ran about 20 minutes ahead of the real file times.
- **Hidden trap in a check**: ERFA gave a fake space velocity to a comparison star in the parallax check; the check now uses zero proper motion (note 13, section 5).

## 7. Reproducing any result

| Result | Command (from the repository root) | Status |
|---|---|---|
| The five missions' files | `uv run --with astropy --with numpy --with scipy --with reproject --with matplotlib --with pillow python -I -B pipeline/build_missions.py --data <cache dir outside the repo>` | not rerun |
| That they are correct | `uv run --with numpy --with pillow python -I pipeline/check_missions.py` | ran today |
| The mover catalogue | `cd assets && uv run python -I ../pipeline/movers/build_movers.py`; check with `uv run python -I pipeline/movers/check_movers.py assets/movers.json` | check ran today; build not rerun |
| The TypeScript libraries pass | `cd packages/spherex-core && npm install --ignore-scripts --legacy-peer-deps && npx vitest run && npx tsc --noEmit` (same for `missions-core`) | tests ran today |
| The live path on the real bucket | `cd packages/spherex-core && npm run test:e2e` (needs the network; IRSA may answer 502) | not rerun |
| The parallax numbers | note 13 gives the command; it needs the cached row bands from note 09 | not rerun |
| Detectability figures | scripts and arguments in `docs/research/experiments/` (`det08_*`) | not rerun |
| The web app | `cd web && npm install && npm run dev` (port 3100); `npm test`, `npm run build` | not rerun |
| The video | `cd video && npm install --ignore-scripts --legacy-peer-deps && npx playwright install chromium && npm run render && node test.mjs` | not rerun; harness done, film not done (app shots are placeholders) |

Notes for anyone repeating this: keep download caches outside the repository, never run code from inside a cache directory, and use `python -I` so a stray file cannot be imported.
