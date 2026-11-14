# 14. Video and design tooling (brag, Hyperframes, winners' demos, audio, Astryx)

Written 2026-11-14 (Saturday), worker w15. Status: complete, all five parts.
Marking: VERIFIED = I saw it today in the cited source or by running a read-only command. UNVERIFIED = recalled, inferred or reported by a secondary source.
Nothing was installed or executed from any of these repositories. brag was shallow-cloned into the scratch dir and read as text only.

---

## 0. One-screen summary

- **brag verdict:** do NOT install; follow `skills/brag-slim/SKILL.md` by hand in a worker. The repo itself is clean (MIT, no hooks, no network calls, no install scripts, nothing writes to harness dirs) but full brag depends on a second skill pack (Hyperframes skills, not reviewed) and on bundled CC BY 4.0 music that needs a credit; the Hyperframes CLI sends anonymous telemetry and auto-updates unless 4 env vars are set. brag targets website launch clips of 15 to 25 s at 30 fps, not real-app footage. brag-slim is one file, no assets, no voice.
- **Video pipeline (primary):** record the real app with a headed Chrome scripted by Playwright and macOS screen capture at 60 fps (ffmpeg avfoundation), compose graphics, clips, captions and audio in Hyperframes (Apache-2.0, `--fps 60`, `--resolution 1080p`) in a scratch dir outside the repo with telemetry/update/skills switched off, then loudnorm to -16 LUFS. **Fallback:** same real-app takes plus HTML scenes rendered to PNG sequences with Playwright and ffmpeg only (no new dependency). Remotion is not recommended: custom licence (free for individuals, 3-employee companies and non-profits; unclear for an informal team of five) and non-OSI in the repo.
- **Important surprises:** the Mac's ffmpeg has no libass or drawtext, so `-vf subtitles=` fails; burn captions in HTML or by PNG overlay (tested). No images, voice or likeness of under-18s are allowed in the demo (rules note 01). Do not put NASA logos in the video (NASA forbids the insignia next to SI-generated imagery). Every 2024/2025 global-winner video I could measure is exactly 30 s with a spoken script of 55 to 85 words.
- **Submit:** the 30 s video; slides only as a backup.

| # | Time | On screen | Caption |
|---|---|---|---|
| 1 | 0-3 | Two plates blink, one dot jumps (1930) | 1930. One dot moved. |
| 2 | 3-6 | Dome, comparator, "Clyde Tombaugh, 24" (illustration) | Age 24. He found Pluto. |
| 3 | 6-9.5 | Real app: typing WISE 0855 coordinates | Type any patch of sky. |
| 4 | 9.5-14 | SPHEREx frames blink, ring locks, 2010 to now arrow | It moved. Here it is now. |
| 5 | 14-18 | Two clicks, measured motion vs true value | Click twice. Measure its motion. |
| 6 | 18-22 | Parallax slider, distance and speed vs true | Distance and speed. From NASA data. |
| 7 | 22-25.5 | Five targets, one click each | Five real stars. One click each. |
| 8 | 25.5-27.5 | Browser plus phone, no login | Open to everyone. Free. |
| 9 | 27.5-30 | End card, URL, data and music credits | Find the next Tombaugh. |

- **Audio:** one Pixabay ambient track (no attribution required, VERIFIED licence summary) plus a sonification layer made from the team's own measured offsets (ffmpeg or 15 lines of Python), optional synthetic Kokoro voice (Apache-2.0) or an adult voice; burned-in captions; -16 LUFS two-pass loudnorm. Fallback track: Incompetech with CC BY credit on the end card.
- **Astryx theme "Skyblink":** dark `#080B12` body, `#0E1422` surface, text `#E8ECF6`, one infrared accent `#FF6A3D` (pinned explicitly, because defineTheme inverts accents in dark mode), Okabe-Ito data palette plus marker shapes, Inter plus JetBrains Mono self-hosted; base it on the Gothic theme source (dark-only) not stock Gothic. Packages are MIT; core and cli have a harmless print-only postinstall; charts packages are canary-only, skip them; Astryx is beta with a release a day, so pin exact versions and keep a plain-CSS fallback.

---

## PART A. latent-spaces/brag, hand reading

Clone: `latent-spaces/brag` at commit 669ab92, last commit 2026-10-24 (VERIFIED). Version 0.5.0, MIT (VERIFIED, plugin.json, LICENSE). Author Shunit Haviv Hakimi (VERIFIED, plugin.json). 21,475 stars per `gh search` (VERIFIED, a promotion repo for a hosted product, so stars say little).

### A1. What the repo actually contains (VERIFIED, full file list read)

- Manifests: `plugin.json`, `.claude-plugin/{plugin,marketplace}.json`, `.codex-plugin/plugin.json`. Pure metadata, no `hooks`, no `mcpServers`, no `scripts`, no `postinstall` key in any of them.
- `.claude/skills/*`, `.agents/skills/*`, `.opencode/skills/*`: symlinks into `skills/` only (VERIFIED with `ls -la`). No hooks directory, no settings.json shipped.
- `skills/brag/SKILL.md` plus 6 reference docs (`step-1-inspect`, `step-2-plan`, `step-3-compose`, `step-4-deliver`, `audio`, `tones`), `slim.md` (byte-identical copy of brag-slim, enforced by `scripts/check-brag-slim.mjs`), `assets/music/*.mp3` (5 tracks), `assets/sfx/**` (OGG/WAV), `assets/music/cues/*` (JSON/MD).
- Only executable code: `skills/brag/scripts/analyze_music_cues.py` (librosa beat analysis; reads one audio file, writes two local files; imports only argparse, json, math, pathlib, librosa, numpy) and two repo-maintenance scripts in `scripts/*.mjs` (read local files only). VERIFIED by reading imports and `write_text` calls (lines 11-20, 304-305).
- `docs/`, `examples/`: the launch site and 5 fake-product sites with sample MP4s (16 MB of the repo). Not part of the skill.

### A2. What runs unattended

Nothing in the repo itself. No hooks, no install scripts, no background process, no MCP server. A skill is a set of instructions the model follows; the risk is what the model is told to run. Grep of `skills/` and `scripts/` for `fetch(`, `curl`, `wget`, `requests.`, `urllib`, `https.request`, `pip install`, `uvx`, `eval(`, `exec(`, `subprocess`, `child_process`, `shell=True`, `telemetry`, `analytics`, `keychain`, `~/.claude`, `~/.codex`, `settings.json`, `installed_plugins`, `~/mind`: zero hits in code. (VERIFIED, every hit of the broader pattern was read; the only ones are the prose hits below.)

Hits read at file:line:
- `skills/brag/SKILL.md:122`, `references/step-4-deliver.md`: `npx hyperframes check|preview|render|snapshot`. This is the real dependency: it runs the npm package `hyperframes` (see A4).
- `references/audio.md` ("Beat and cue sources" option 2): `uv run --project <skill-dir>/scripts python analyze_music_cues.py ...` which makes `uv` download librosa, numpy, scipy, soundfile from PyPI (4 direct deps; `uv.lock` pins 80 package entries, VERIFIED count of `name =`). Only if the model picks that option; option 3 is `npx hyperframes beats` (no Python).
- `references/step-4-deliver.md`: voice via `npx hyperframes tts ... --voice af_heart` (Kokoro), only when the user passes `--voice`.
- `skills/brag-slim/SKILL.md:39,55,97`: tells the model NOT to read `.env`, keys, credentials; "ask before installing anything"; "prefer a package manager over `curl | sh`". These are guard rails, not risks.
- `docs/other-agents.md`: tells Antigravity users to run `npx hyperframes skills`, which installs the Hyperframes companion skills into `~/.agents/skills` and `~/.gemini/config/skills` (writes into agent config dirs; this is Hyperframes behaviour, not brag code).
- `README.md`: install commands `claude /plugin install brag@brag`, `npx skills add https://github.com/latent-spaces/brag --skill brag` (the vercel-labs `skills` CLI copies skill folders into agent dirs).

Important transitive dependency (VERIFIED, `SKILL.md` step 3 and `step-3-compose.md`): full brag tells the model to "load the Hyperframes skills: `hyperframes`, `hyperframes-cli`, `hyperframes-registry`, `media-use`". Those are a SECOND skill pack (heygen-com/hyperframes) that is NOT in the brag repo and would also need your install review. brag's own text only is a 1.4k-word wrapper around that pack. Without it, full brag does nothing useful.

### A3. What leaves the machine

- From brag itself: nothing. No network call in any brag file. VERIFIED.
- The model provider sees whatever the agent reads (project source, plan), as with any agent session.
- brag README advertises the hosted `letsbrag.app` (paid, "pay once") which takes a site link. It is a separate product: the skill never calls it and never uploads files to it (VERIFIED by grep: `letsbrag` appears only in README, docs/index.html, and is a plain link).
- Hyperframes CLI (a different package, see B): sends anonymous usage telemetry (command names, render performance) unless disabled with `npx hyperframes telemetry disable` or `HYPERFRAMES_NO_TELEMETRY=1` / `DO_NOT_TRACK=1`; it never sends project names or video content; cloud rendering and the hosted connector upload to HeyGen only if you opt in or sign in. VERIFIED from the FAQ (hyperframes.heygen.com/faq) and CLI reference (hyperframes.heygen.com/packages/cli), read today. Also a background update check and auto-install of newer CLI/skills (turn off with `HYPERFRAMES_NO_UPDATE_CHECK=1`, `HYPERFRAMES_NO_AUTO_INSTALL=1`; stays silent under CI). VERIFIED (CLI reference lines on "update").
- `npx hyperframes init` installs "the core set" of AI coding skills by default unless `--skip-skills` or `HYPERFRAMES_SKIP_SKILLS=1` (VERIFIED, CLI reference, init flags table). That is a write into the agent's skill dirs: the install-gate trigger.

### A4. What it needs installed

From the README and `docs/other-agents.md` (VERIFIED): Node.js 22+, FFmpeg on PATH, the Hyperframes CLI via `npx hyperframes` (verify with `npx hyperframes doctor`), an agent that supports skills.
`npm view hyperframes` today (VERIFIED, registry JSON): version 0.9.46 published 2026-11-14, license Apache-2.0, engines node >=22, 18 runtime dependencies (hono, open, acorn, citty, debug, giget, yauzl, ignore, undici, adm-zip, esbuild, fontkit, postcss, css-tree, puppeteer-core, @puppeteer/browsers, ...), and the `scripts` block has NO preinstall/install/postinstall (only dev/test/build). So the package itself runs no install script. UNVERIFIED: whether its transitive dependencies do (esbuild has an optional postinstall check in some versions; I did not walk the tree).
Chrome: Hyperframes renders with a headless Chrome and has `npx hyperframes browser ensure` that "finds it, or downloads it" (VERIFIED, CLI reference). So the first render needs a one-time Chrome download unless Chrome is found. UNVERIFIED: which Chrome binary it picks on macOS and its size.
Python: only for the optional `analyze_music_cues.py` route.

### A5. Music, SFX, fonts, voice: provenance and licence

- Music (VERIFIED, `assets/music/README.md` and `references/audio.md`): five tracks "Happy Beats / Business Moves" Vol. 1, 9, 10, 11, 12 by Sascha Ende (ende.app), CC BY 4.0, "not covered by the repo's MIT license". Required credit: "Music: Sascha Ende, ende.app (CC BY 4.0)". For a public video that credit must be shown in the video end card or the project page/description. UNVERIFIED: I did not open ende.app/en/standard-license to confirm there is no extra clause; the README links it.
- SFX: Kenney.nl, CC0 (VERIFIED, audio.md) and 32 keypress WAVs from "Keyboard Soundpack #1" by unicae_games on OpenGameArt, CC0 (VERIFIED, audio.md). The only unverified part is whether every bundled file is really from those packs (I did not hash them).
- Fonts: brag bundles none. The composition uses the project's own fonts (brief template: "Display font: font or fallback decision"). The brag launch site loads Google Fonts (Geist) but that is the docs site only (VERIFIED, `docs/index.html:23-25`). Hyperframes bundles a font build step (`build:fonts` in its package.json, VERIFIED) with licences UNVERIFIED.
- Voice: opt-in only (`--voice`), single provider, Kokoro "via Hyperframes" (VERIFIED, SKILL.md "Parsing the invocation"). Kokoro is local; Hyperframes docs say free voice = Kokoro on your computer, HeyGen voices need a HeyGen key (VERIFIED, voice-and-audio guide). So no paid service unless you sign in to HeyGen. UNVERIFIED: Kokoro model licence (believed Apache-2.0) and whether the first `tts` run downloads model weights from the internet (the CLI says on-device models for transcription download only when asked; for tts I did not find the statement).

### A6. Always-on context cost

Description lines: brag description is about 55 words, brag-slim about 80 words (VERIFIED by reading front matter). The Claude Code skill list carries only name plus description, roughly 70 to 110 tokens each. When invoked: `brag/SKILL.md` 1,381 words (about 1.8k tokens), but it then pulls 5 reference files (948 + 2147 + 2323 + 2513 + 1040 = 8,971 words, about 11.7k tokens) plus the Hyperframes skills (not measured, large, UNVERIFIED). `brag-slim/SKILL.md` is 1,530 words (about 2.0k tokens), self-contained. (word counts VERIFIED by `wc -w`, tokens = words x 1.3.)

### A7. Output

- brag full: 15 to 25 seconds "Not one second more without a reason", landscape 1080p default, `--duration` and `--format landscape|vertical|square`, 30 fps default (VERIFIED, SKILL.md options table; fps from slim.md). It can be capped at 30 s: pass `--duration 28`. The 15-25 s law is a convention in the text, not enforced code (UNVERIFIED how Hyperframes check treats a longer duration).
- Output files: `brag.mp4`, `brag.jpg` poster baked in as frame 0, `brag-plan.md`, `composition-brief.md`, `share-copy.txt`, `composition/` (VERIFIED, step-4-deliver.md).
- 60 fps: brag defaults to 30; Hyperframes itself supports `--fps` 1 to 240 (VERIFIED, CLI reference table line `--fps`).
- brag is built for "turn this website's code into a launch video". It does NOT know about real-app screen footage (it recreates UI from source), so for this product (real SPHEREx frames in a live viewer) it fits worse than hand-directing Hyperframes.

### A8. brag vs brag-slim

| | brag (full) | brag-slim |
|---|---|---|
| Files | SKILL.md + 6 refs + 16 MB assets (music, SFX, cue presets, py script) | one SKILL.md, no assets |
| Needs | Hyperframes skill pack + Node 22 + ffmpeg (+ optional uv/Python) | whatever is on the machine (model builds the video; "ask before installing") |
| Music | bundled Sascha Ende tracks (CC BY 4.0) | none bundled; "its own soundtrack" the model makes itself with local tools (UNVERIFIED how) |
| Voice | opt-in Kokoro | none ("which brag-slim doesn't do") |
| Duration | 15-25 s | 15-25 s, 18-22 sweet spot, 30 fps |
| Risk | transitive skill pack + npx + telemetry | lowest: pure instructions, but quality depends on the model improvising a renderer |
| Auto-switch | On "Claude Opus 5.5" brag hands off to slim unless `--full` | self |

### A9. Verdict (the orchestrator decides)

Recommended: DO NOT INSTALL, FOLLOW ITS INSTRUCTIONS BY HAND IN A WORKER (reading `skills/brag-slim/SKILL.md` as a brief). Reason: the repo itself is clean (no hooks, no network, no install scripts, MIT), but its value is the process (plan, storyboard, creative laws, poster frame), which is a page of text a worker can follow, while installing it drags in the Hyperframes skill pack (second install review), a telemetry-sending CLI with background auto-update, and bundled CC BY music you would have to credit; and it is built for website launch clips, not for real-app footage plus a 30 s cap. If the lead still wants the plugin: "install scoped to this one project" via copying `skills/brag-slim/` into the project's `.claude/skills/` (not `/plugin install`, not `npx skills add`), with `HYPERFRAMES_NO_UPDATE_CHECK=1 HYPERFRAMES_NO_AUTO_INSTALL=1 HYPERFRAMES_NO_TELEMETRY=1 HYPERFRAMES_SKIP_SKILLS=1` in the environment. Do not use `/brag --voice`, `letsbrag.app` or HeyGen sign-in.

---

## PART B. The video toolchain

### B1. Table (licences from the registries or LICENSE files fetched today)

| Tool | Licence (VERIFIED today) | Best at | Time to first 5 s clip | Main risks |
|---|---|---|---|---|
| Hyperframes (heygen-com/hyperframes) | Apache-2.0 (GitHub API + npm). Last push 2026-11-14, 84k stars, v0.9.46 published today (VERIFIED) | HTML/CSS/JS + GSAP compositions rendered frame-exact via headless Chrome and ffmpeg; `<video>` clips with trims, audio tracks, captions, `check` lint; real-UI scenes | UNVERIFIED, my estimate 15-30 min (docs: a 300-frame 1080p comp rendered in 9.8 s, VERIFIED in FAQ, so render time is not the cost; setup and first Chrome download are) | 0.x version (breaking changes), background auto-update and telemetry (switchable), Chrome download, young docs, agent-first workflow, its skill pack needs an install review |
| Remotion | custom licence (npm says "SEE LICENSE IN LICENSE.md"), see B2 | React-component videos, huge ecosystem | UNVERIFIED, 20-40 min | Licence condition (B2); React build step; Chrome download; telemetry page exists (remotion.dev/docs/telemetry, not read) |
| Motion Canvas | MIT; last release on npm 3.17.2 dated 2024-12-14, repo pushed 2026-07-02 (VERIFIED) | Code-animated 2D explainers with generators, great for diagrams | UNVERIFIED, 30-60 min | Slow-moving releases, own editor, no built-in way to drop in app footage as easily as an HTML `<video>` |
| Revideo | MIT; now under `midrender/revideo` (renamed from redotvideo), npm 0.11.0 on 2026-07-10 (VERIFIED) | Programmatic video, Motion Canvas fork focused on rendering | UNVERIFIED, 30-60 min | Small project, fork of Motion Canvas, rename churn |
| Manim (ManimCommunity) | MIT, repo pushed 2026-11-14, PyPI 0.22.1 (VERIFIED; PyPI license field empty, repo shows MIT) | Math-style animation, equations, plots | UNVERIFIED, 30+ min (needs LaTeX, Cairo, ffmpeg) | Heavy system deps, aesthetic is "3Blue1Brown", poor at showing app UI |
| Theatre.js | Apache-2.0, last push 2024-08-14 (VERIFIED) | Authoring animation of a browser scene by hand with a timeline UI | UNVERIFIED | No renderer of its own; stale; not a video tool |
| Plain HTML/CSS/WebGL + Playwright + ffmpeg | Playwright npm Apache-2.0 v1.65.1 (VERIFIED); ffmpeg already installed at /opt/homebrew/bin (VERIFIED) | Zero new dependencies: you own every pixel; deterministic if time is a parameter | 10-20 min for a still sequence | You write the sequencing yourself; Playwright's built-in `recordVideo` is believed to be low frame-rate WebM (about 25 fps, UNVERIFIED, docs page read did not state fps) so do not use it for 60 fps |
| Capture the real running app with scripted moves | n/a | Real data on screen: the strongest "Validity" proof | 10 min with macOS screen recording | Needs a stable deployed app, dark cursor/OS chrome removed, 60 fps recorder |

Real-user evidence per recommended tool (the lead asked for a thread each): Hyperframes: none read; I read only HeyGen's own docs and its own "vs Remotion" page, which says plainly Remotion is "older and much more established" and its own tool is new (VERIFIED, hyperframes.heygen.com/guides/hyperframes-vs-remotion). No independent user thread was found. Playwright + ffmpeg: not searched for threads, it is standard tooling.

### B2. Remotion licence, quoted (VERIFIED, raw LICENSE.md from github.com/remotion-dev/remotion main, fetched today; pricing page remotion.dev/docs/license/pricing)

> "You are eligible to use Remotion for free if you are:
> - an individual
> - a for-profit organization with up to 3 employees
> - a non-profit or not-for-profit organization
> - evaluating whether Remotion is a good fit, and are not yet using it in a commercial way"

> "Permission is hereby granted, free of charge, to any person eligible for the 'Free License', to use the software non-commercially or commercially for the purpose of creating videos and images and to modify the software to their own liking..."

> Disallowed: "It is not allowed to copy or modify Remotion code for the purpose of selling, renting, licensing, relicensing, or sublicensing your own derivate of Remotion."

Pricing page headline (VERIFIED): "Remotion is completely free to use for any individual or small company - no catch. For bigger companies, we charge a license fee ... For individuals and companies of up to 3 people: Free License".
Application to this team: five students, no company. The "an individual" clause covers a person; whether a five-person informal team counts as "individuals" collectively is NOT spelled out. A student/hobby team of five is not a for-profit organisation, so the "up to 3 employees" cap does not apply, and the hackathon outcome is non-commercial, so the reasonable reading is "free", but this is my reading, not Remotion's. Also note the LICENSE file says "In Remotion 5.0, the license will slightly change" (VERIFIED, first line). Because the licence is custom (not OSI), and the Space Apps submission needs every library listed and the repo under an OSI licence, using Remotion in the repo adds a non-OSI dependency; keeping Remotion out of the repo (render the video elsewhere, publish the MP4) avoids that. Recommendation: skip Remotion, Hyperframes is Apache-2.0 and covers the same need.

### B3. RECOMMENDED pipeline: Hyperframes for composition, real app captured separately (30 s, 1080p, 60 fps)

Why: one HTML composition holds motion graphics, the real-app clips, captions and audio on a timeline; frame-exact renders are deterministic (VERIFIED claim from its docs); 60 fps and 1080p are flags; `check` lints layout and contrast. Reduced-risk way to use it: a WORKER runs it inside a throwaway directory outside the repo (`~/scratch/video/`), with all four env switches below, so nothing lands in the submission repo and no skill pack is installed.

Steps (all UNVERIFIED as a sequence; each flag was read in the CLI reference today unless noted):
1. Prereqs check (read-only): `node -v` (needs 22+), `ffmpeg -version`.
2. Capture the real app first, because it is the long pole. Open the deployed app in a headed Chrome window at exactly 1920x1080 (devtools closed, no bookmarks bar, Do Not Disturb on). Script the interaction with Playwright (headed, `page.mouse.move` with `steps`, `page.keyboard.type(..., {delay: 90})`) while recording the screen with `ffmpeg -f avfoundation -framerate 60 -i "1:none" -c:v libx264 -crf 14 -preset slow -pix_fmt yuv420p app-raw.mp4` (device index from `ffmpeg -f avfoundation -list_devices true -i ""`; needs macOS screen-recording permission for the terminal; UNVERIFIED on this Mac). Record each shot as its own take of 6 to 10 s so retakes are cheap.
3. `mkdir ~/scratch/video && cd ~/scratch/video`
4. `export HYPERFRAMES_NO_TELEMETRY=1 DO_NOT_TRACK=1 HYPERFRAMES_NO_UPDATE_CHECK=1 HYPERFRAMES_NO_AUTO_INSTALL=1 HYPERFRAMES_SKIP_SKILLS=1`
5. `npx hyperframes init demo --resolution 1080p --non-interactive --skip-skills` (flags VERIFIED in the init table). `cd demo`.
6. Put clips in `assets/`. Each scene is a `<video class="clip" src="assets/app-wise0855.mp4" muted playsinline data-start="9" data-duration="4" data-media-start="1.5">` (VERIFIED form, video-components guide). Title text, coordinates field overlay, caption lines, the end card: plain HTML/CSS animated with GSAP (Hyperframes' frame adapter seeks it deterministically).
7. Audio: `<audio id="music" src="assets/music.mp3" data-start="0" data-duration="30" data-track-index="10" data-volume="0.35">` (VERIFIED pattern from brag audio.md) and one voice track on its own track index if used.
8. `npx hyperframes check` then `npx hyperframes preview`, fix overflow and contrast findings.
9. `npx hyperframes render --output ../final-raw.mp4 --fps 60 --quality high` (flags VERIFIED, example line `render --output output.mp4 --fps 60 --quality high`). Expect a one-time Chrome download (`npx hyperframes browser ensure`).
10. Post (Part D commands): loudness normalise, burn captions if not done in HTML, `-movflags +faststart`, verify `ffprobe` shows 1920x1080, 60 fps, 30.000 s or less.
Budget: 3 to 4 hours for a worker including retakes. First 5 s clip: about 30 minutes.

### B4. FALLBACK pipeline: no Hyperframes, no new dependency

HTML title cards and overlays rendered to PNG sequences by Playwright (a page where `window.setT(t)` sets all animations for time t; screenshot 1920x1080 at t = n/60 for n in 0..1799), the real-app takes from step 2 above, then ffmpeg only: `-framerate 60 -i frames/%04d.png` for the graphic scenes, `xfade` for transitions (`xfade=transition=fade:duration=0.25:offset=...`), `overlay` for the cursor/labels, `ass`/`subtitles` for captions, `amix`/`sidechaincompress` for music under voice. Slower to author (about 5 to 6 hours), fully deterministic, only tools already on the Mac. Also the lowest-risk if Hyperframes' first run fails. UNVERIFIED as a measured time.

---

## PART C. What a winning 30-second demo looks like

### C1. Evidence gathered (VERIFIED unless noted)

Global winners' demo videos 2024 and 2025 are found on YouTube through crafterwiki.com project pages. I read each video's metadata with yt-dlp (`--skip-download`), downloaded 480p copies of four into the scratch dir to run ffmpeg scene-change counts and frame montages, and read auto-captions of seven.

| Video | Year, award | Length | Source |
|---|---|---|---|
| WaterWise (GaamaRamma) | 2024 Best Use of Data | 31 s | https://www.youtube.com/watch?v=Wg-gE3kYaas |
| Landsat Connect Spot (AsturExplorers) | 2024 Best Mission Concept | 30 s | https://youtu.be/hipj00EOSDI |
| PITCH 2024 (42 QuakeHeroes) | 2024 Best Use of Technology | 30 s | https://www.youtube.com/watch?v=thxLntBLF1I |
| Earth Connected Museum (TerraTales) | 2024 Best Storytelling | 30 s | https://youtu.be/hOUBkhFR_cE |
| NEO Orrery Demo (WMPGang) | 2024 Best Use of Science | 93 s (video by a team, before any 30 s cap was applied, or not the official submission, UNVERIFIED) | https://youtu.be/RBl_3ZsmVFo |
| Characterizing Exoplanets (Team Asteroid) | 2024 Global Connection | 45 s | https://www.youtube.com/watch?v=SYPQo4-P5J0 |
| Hunting for Exoplanets with AI (Resonant Exoplanets) | 2025 Best Use of Data | 30 s | https://www.youtube.com/watch?v=5fBB5YJpfwU |
| PureFlow | 2025 Best Mission Concept | 29 s | https://youtu.be/hHUpo7bTVuc |
| A Solar Tale (HerCode Space) | 2025 Best Storytelling | 30 s | https://youtu.be/1C9ueho9ero |

Awards from https://www.nasa.gov/learning-resources/stem-engagement-at-nasa/nasa-international-space-apps-challenge-announces-2024-global-winners/ and https://www.spaceappschallenge.org/2025/meet-the-2025-global-winners/ (both read today). Video-to-project mapping from crafterwiki.com/projects/* pages (a third-party wiki: the mapping of video to team is UNVERIFIED beyond that page). 2023 winners: names exist on science.nasa.gov but I did not find their 30 s videos (the 30 s rule appears to be a 2024/25 form field); NOT FOUND for 2023.

Measured on the four I downloaded (640x360 copies, so scene counts are approximate: ffmpeg `select=gt(scene,0.25)`):
- Landsat Connect Spot: 30 s, 4 hard cuts detected plus UI changes; opens on a person standing in a field with the line spoken over it; live-action first 12 s, then phone mock-ups; subtitles burned in; ends on a full-colour logo card with the tagline "Capture your world."
- PITCH 2024: 30 s, 7 cuts; voice starts at 0 s ("my name is Gustavo and we are 42 Quake Heroes"); ends on a closing line.
- PureFlow: 29 s, about 1 cut (one continuous screen capture of a 3D tool); voice starts at 0 s: "Hi, we're Pure Flow. To solve the challenge ... we created Habitat Designer."
- A Solar Tale: 30 s, about 1 hard cut but many animated transitions (cinematic live action open: a child looking at the sky, team card with four faces at 3 s, then product mock-ups on laptops, end card with logo). Voice-over scripted.
Auto-captions word counts (all seven): voice-over about 60 to 90 words per 30 s, e.g. PureFlow about 55 words, Landsat Connect about 85, Solar Tale about 70 (VERIFIED, caption files read).

### C2. Patterns extracted

1. All the winners I could find are exactly 30 s or a second under. The limit is a ceiling the winners fill. (VERIFIED, 7 of 9 within 29-31 s.)
2. First 3 seconds: they open with who/what or the human question, not with the tool: "Ever wonder when a satellite will pass over your exact location?" (Landsat Connect), "Hi, we're Pure Flow" (PureFlow), "For thousands of years, humanity has looked to the sky for answers" (Solar Tale). None open with a logo animation first. (VERIFIED, captions.) The generic advice agrees: "the hook is a promise, not a logo" (lunaheavenceo.com, 2026-06-11) and "the payoff first, in the opening 3 seconds" (novoads.ai, 2026-09-17); both are marketing blogs, so UNVERIFIED as evidence about judges.
3. Voice-over carries the story; every one has a spoken script of one question or claim, then what it does, then the user benefit, then a closing tag. Text on screen is mostly burned subtitles of the voice, not separate captions. (VERIFIED on 4 videos.)
4. Pacing: 1 to 7 hard cuts per 30 s in these entries, so a slower cut rate than a launch trailer; the energy comes from screen motion inside shots. Product launch videos run faster, about 8 to 12 cuts in 30 s (UNVERIFIED, my estimate, not measured).
5. Showing the product: UI screen capture, with a cursor, for 15 to 20 of the 30 s. Real data on screen is shown as a real map or chart, not described. The two that win on storytelling (Solar Tale, TerraTales) add a human, emotional open; the technical winners (QuakeHeroes, Resonant) show an equation or plot and talk fast.
6. End card: logo plus one-line tagline on a solid colour (Landsat Connect: "Capture your world."). None showed a URL in the frames I viewed (UNVERIFIED; I saw only the 3-second montage), so showing the URL is a cheap edge.
7. Muted watching: Apple App Preview guidance, quoted by a secondary source, says "By default, app previews play with the sound muted, so consider using copy to add additional context to your footage" (appmotion.video / novoads.ai quoting Apple; the Apple page itself not opened, UNVERIFIED). Burn captions in. Whether Space Apps judges watch muted is UNVERIFIED.
8. Hard constraints seen in note 01 (read today): no images, video or voice of under-18s in the demo; all English; public link with no login. So if any team member is under 18, use a synthetic voice or an adult team member's voice, and no faces of minors. This also rules out a "team card" like Solar Tale's.

### C3. Storyboard v1 (30.00 s, 1080p, 60 fps, 9 shots, 8 cuts)

Hard facts to keep honest on screen: WISE 0855 is a brown dwarf, about 2.3 pc (the app's own readout should supply the number, UNVERIFIED here); SPHEREx 2025-2026 frames cover about one year so on-screen movement within SPHEREx alone is a few arcseconds; the "about 2 arcmin" move in the RUN plan is against the 2010 WISE epoch (VERIFIED, RUN doc section 6, row D). The caption must name its baseline.

| # | Time | On screen | Caption (max 8 words) | Sound |
|---|---|---|---|---|
| 1 | 0.0-3.0 | Black. Two photographic plates of a star field flicker alternately (blink comparator); one dot jumps; the jump is circled | 1930. One dot moved. | Mechanical shutter clacks at 2 Hz, low drone; voice starts at 0.5 s |
| 2 | 3.0-6.0 | Archival-style frame: telescope dome at night, a plate in the comparator; text "Clyde Tombaugh, 24" (illustration, not a photo of a person) | Age 24. He found Pluto. | Drone, one soft bass hit on the cut |
| 3 | 6.0-9.5 | Real app, full screen. Cursor types WISE 0855 coordinates in the RA/Dec field; globe or sky tile zooms in | Type any patch of sky. | Key clicks, music enters |
| 4 | 9.5-14.0 | SPHEREx frames play like a blink; a ring locks on WISE 0855; label "2010 position" then the arrow to "now" | It moved. Here it is now. | Beat-synced ticks; riser into the reveal |
| 5 | 14.0-18.0 | Student view: two clicks on the object in two epochs; readout builds: motion arcsec/yr vs true value | Click twice. Measure its motion. | Two click sounds, number counters tick |
| 6 | 18.0-22.0 | Parallax slider: one glider moves until the model passes through the points; readout: distance and speed, "true value" beside it | Distance and speed. From NASA data. | Rising synth, small chime when it locks |
| 7 | 22.0-25.5 | Five target cards flip in, each one click to its movie | Five real stars. One click each. | Fast ticks on the beat |
| 8 | 25.5-27.5 | Wide: browser window plus phone, link in the address bar, "no login, free" | Open to everyone. Free. | Music at full |
| 9 | 27.5-30.0 | End card, dark: "Find the next Tombaugh." under it the URL, then "NASA SPHEREx data" and music credit line | Find the next Tombaugh. | Music tail, one last clack of the plates |

Text per shot 5 to 7 words. Total: 9 shots, 8 cuts in 30 s. Voice-over (about 60 words, synthetic or adult voice, optional because captions carry it): "In 1930, a 24-year-old found Pluto by blinking two photographs. Now NASA's SPHEREx is photographing the whole sky again. Type any coordinates. Watch it move. Measure it yourself. Get its distance and speed, from real data. Five minutes from now you could be where he was. Find the next Tombaugh."
Check before shooting: "24-year-old" and "found Pluto 1930" come from the RUN doc's cited Britannica and Lowell facts (the doc itself says verify the wording).

### C4. The 7-slide alternative, one line each

1. Title: "Find the next Tombaugh" plus the blink-comparator image, team and links.
2. The 1930 story in one picture: two plates, one moving dot, "a 24-year-old did it by eye".
3. The gap: SPHEREx is imaging the whole sky repeatedly, nobody can easily see what moved.
4. The product: screenshot of WISE 0855 blink with the "it moved" answer.
5. The lesson: Look, Measure, Derive, Hunt, with the distance and speed result.
6. Why it is valid: real data, sources, measured vs true table, limits we state honestly.
7. Impact and ask: who uses it, how classrooms use it, link and QR code, data and licence credits.

### C5. Which to submit

The 30 s video. Reasons: the product is motion (a sky that changes), slides cannot show a blink; every global winner I could find submitted a 30 s video, not slides (7 of 9 verified in the 29-31 s range); the Presentation criterion is "engaging storytelling" (note 01) and the video lets you spend 22 s showing the real tool. Keep the 7 slides only as a local-event pitch backup. (Recommendation, opinion.)

---


## PART D. Audio

### D1. Music sources and exact terms (read today)

| Source | Terms (quoted or closely paraphrased) | Credit needed? | Notes |
|---|---|---|---|
| Pixabay Music | Pixabay Content License summary: allowed "Use Content for free", "Use Content without having to attribute the author (although giving credit is always appreciated)", "Modify or adapt Content into new works". Not allowed: sell or distribute Content "on a Standalone basis", use that "features recognisable people" in an immoral/illegal way, misleading use. "Only the full Content License is legally binding." (VERIFIED, pixabay.com/service/license-summary/) | No | Safest for a 30 s clip with zero credit logistics. Risk (UNVERIFIED): automated Content ID claims on YouTube sometimes hit royalty-free libraries; keep the download page URL and a screenshot of the track page as proof. |
| YouTube Audio Library | "Music and sound effects from the YouTube Audio Library are copyright-safe." Tracks under a Creative Commons licence: "you must credit the artist in your video's description" (VERIFIED, support.google.com/youtube/answer/3376882). The library has an "Attribution required" filter. | Only for CC tracks | Only usable cleanly if the demo is hosted on YouTube. Use outside YouTube is not covered by what I read (UNVERIFIED). |
| Incompetech (Kevin MacLeod) | "for YouTube videos? Yes, AND you can monetize the videos. Be sure to credit me." Credit text: "Licensed under Creative Commons: By Attribution 4.0"; for videos "credits should be placed in the video description". (VERIFIED, incompetech.com FAQ) | Yes (CC BY 4.0) | Large catalogue, space/ambient tracks. |
| Free Music Archive | Artists choose their own CC licence; FMA "cannot license original work to you" itself, so the licence on each track page governs (VERIFIED, freemusicarchive.org/License_Guide). Filter out NC (non-commercial) and ND if unsure. | Depends per track | Check the licence on every track page. |
| brag bundled tracks (Sascha Ende) | CC BY 4.0, credit "Music: Sascha Ende, ende.app (CC BY 4.0)" (VERIFIED, brag README for assets/music) | Yes | Corporate-upbeat "Happy Beats", wrong mood for a deep-space story. |
| Self-made | Your own synth bed (sine pads in ffmpeg or any DAW) | No | See D3. Zero licence risk, matches the sonification idea. |

Credit placement rule for a Space Apps video: the final 2.5 s end card line (shot 9) AND the YouTube description AND the "References" field of the submission form (note 01 says every asset must be listed).
Recommended music: one Pixabay track in the ambient/cinematic family (no credit, no Content ID story needed) mixed under a sonified-data layer. Fallback: an Incompetech track with the credit line burned into the end card.

### D2. NASA audio and footage terms (VERIFIED, nasa.gov/nasa-brand-center/images-and-media/, read today)

- "NASA content - images, audio, video, and media files ... generally are not subject to copyright in the United States. You may use this material for educational or informational purposes ..." and "NASA content used in a factual manner that does not imply endorsement may be used without needing explicit permission. NASA should be acknowledged as the source."
- "The NASA Insignia, Logotype, identifiers, and imagery are not in the public domain": do NOT put the NASA meatball or worm logo in the video without reading the Brand Center rules. Write "NASA SPHEREx data" as text instead.
- "NASA does not permit our Insignia (i.e., NASA Meatball, Worm logotype, or Seal) to appear with SI generated imagery". This team uses SI tools, so keep the NASA logos out of the video entirely.
- "attribution of the information directly to NASA is not permitted" for content run through a large language model: do not write "according to NASA" next to an AI-generated sentence. State the data source (SPHEREx, IRSA) instead.
- Identifiable people in NASA media used commercially need permission: avoid archival photos of astronauts or scientists.
- Not checked: SPHEREx press-kit audio, Chandra/Webb sonification files and their per-file credits (UNVERIFIED; each NASA sonification page lists its own credit line).

### D3. Sonifying the team's own data as part of the soundtrack

Idea: one tick per SPHEREx epoch (a click) and a pitch that follows the object's measured offset from its first position, so the drift can be heard as a rising line while shot 4 and 5 play. It is the team's own data, so no licence question, and it doubles as the "Creativity" point. Tested today on this machine (VERIFIED, synthetic, 3 s file created):
```
ffmpeg -y -f lavfi -i "aevalsrc='0.25*sin(2*PI*(300+40*t)*t)*exp(-3*mod(t,0.5))':d=3:s=48000" son.wav
```
Replace the `300+40*t` ramp with a table-driven expression, or (better) generate the WAV from the measured points with Python stdlib `wave` and `math` (about 15 lines, one tick per frame in the movie, frequency = 220 * 2 ** (offset_arcsec / 12)), and mix it at -18 LUFS under the music. Keep it to 6 s (shots 4 to 6) so it reads as a motif, not a gimmick.

### D4. Voice-over options, free and local

- Kokoro-82M: Apache-2.0 on its model card (VERIFIED, Hugging Face API, last modified 2025-04-10); this is what brag and Hyperframes use. Run locally. First-run download behaviour UNVERIFIED.
- macOS `say` is installed (VERIFIED, /usr/bin/say, en_US voices listed). Quality is flat; its output licence for public videos was NOT checked (UNVERIFIED).
- Piper: the rhasspy/piper repo is MIT but archived (VERIFIED, pushed 2025-08-26, archived true), so avoid for a new project.
- Own voice: allowed only if the speaker is 18 or older. Note 01 rule (VERIFIED): "no images/video/voice/likeness of under-18s in demo". If anyone on the team is a minor, use Kokoro or an adult.
- Decision hint: captions carry the story (see D5), so a voice is optional. The 2024 and 2025 winners all had a spoken script (C2). A calm synthetic voice at 60 words is acceptable; a human voice is warmer if an adult is on the team.

### D5. Captions (many judges watch muted)

- Burn them in. Source says app previews autoplay muted (Apple/Google guidance quoted by appmotion.video and novoads.ai, UNVERIFIED primary). The 4 winners I checked also used burned-in subtitles (Landsat Connect clearly, VERIFIED in the frame montage).
- Maximum 8 words per shot (the storyboard), one line, 56 to 64 px at 1080p, white on a 60 percent dark pill, bottom third with 90 px margin, safe area away from the YouTube controls.
- Upload the .srt as well to YouTube so captions can be toggled and auto-translate works (UNVERIFIED mechanics).
- IMPORTANT FINDING: the ffmpeg on this Mac (8.1.1, /opt/homebrew/bin/ffmpeg) was built WITHOUT libass and libfreetype: `subtitles` and `drawtext` filters are absent (VERIFIED: `ffmpeg -filters` shows no `subtitles`, `ass` or `drawtext`; a run of `-vf subtitles=cap.srt` fails with "No option name near 'cap.srt'"). So do not plan on `-vf subtitles=`. Two working routes, both tested today with synthetic input:
  (a) Draw captions in the HTML composition (Hyperframes or the Playwright fallback). Best.
  (b) Render one transparent PNG per caption and overlay by time:
```
ffmpeg -y -i base.mp4 -i cap1.png -i cap2.png -filter_complex \
"[0:v][1:v]overlay=(W-w)/2:H-h-90:enable='between(t,0,3)'[a];[a][2:v]overlay=(W-w)/2:H-h-90:enable='between(t,3,6)'[v]" \
-map "[v]" -map 0:a -c:v libx264 -crf 18 -pix_fmt yuv420p -r 60 -c:a aac -b:a 192k -movflags +faststart cap_burn.mp4
```
  (c) Soft subtitles (not burned) in the MP4: `ffmpeg -y -i base.mp4 -i cap.srt -map 0 -map 1 -c copy -c:s mov_text soft.mp4` (worked, VERIFIED). Many players show a CC toggle; do not rely on it for muted judges.

### D6. ffmpeg: loudness and mix (all run today on synthetic input, VERIFIED)

1. Measure (pass 1): `ffmpeg -hide_banner -i final-raw.mp4 -af loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json -vn -f null -` and read `input_i`, `input_tp`, `input_lra`, `input_thresh`, `target_offset` from the JSON.
2. Apply (pass 2, linear): `ffmpeg -y -i final-raw.mp4 -af "loudnorm=I=-16:TP=-1.5:LRA=11:measured_I=<input_i>:measured_TP=<input_tp>:measured_LRA=<input_lra>:measured_thresh=<input_thresh>:offset=<target_offset>:linear=true" -c:v copy -c:a aac -b:a 192k -ar 48000 -movflags +faststart final.mp4`
3. Check: `ffmpeg -hide_banner -i final.mp4 -af ebur128 -vn -f null - 2>&1 | grep 'I:' | tail -1` printed `I: -16.0 LUFS` in my test.
4. Duck music under the voice: `ffmpeg -i music.wav -i voice.wav -filter_complex "[0:a]volume=0.5[m];[1:a]asplit=2[v][vsc];[m][vsc]sidechaincompress=threshold=0.05:ratio=8:attack=20:release=400[duck];[duck][v]amix=inputs=2:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=11[out]" -map "[out]" -ar 48000 mix.wav`.
5. Final check of the file: `ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate -show_entries format=duration -of default=nw=1 final.mp4` must show 1920 x 1080, 60/1, duration <= 30.0. Target -16 LUFS integrated, true peak <= -1.5 dBTP (the -14 LUFS YouTube reference is UNVERIFIED here; -16 is a safe, slightly quiet choice).

---

## PART E. Astryx for the app's look

### E1. Facts (VERIFIED today: GitHub API, npm registry, repo raw files)

- meta/astryx: MIT, 27,871 stars, pushed 2026-11-14, v0.7.16 published 2026-11-14 (three releases in four days), 667 open issues. README says "Currently in Beta", React 19+, built on StyleX. (VERIFIED.)
- Packages: `@astryxdesign/core` 0.7.16 (MIT, peer react/react-dom >=19, peer `@stylexjs/stylex ^0.19.0`), `@astryxdesign/cli` 0.7.16, seven themes `@astryxdesign/theme-{neutral,butter,chocolate,matcha,stone,gothic,y2k}`, `@astryxdesign/build` (StyleX source builds). `@astryxdesign/lab` is not published. (VERIFIED, README table.)
- Install in Next.js, "simplest" path (README of packages/core, VERIFIED): `npm install @astryxdesign/core @astryxdesign/theme-neutral @stylexjs/stylex` (note: include `@stylexjs/stylex` or pnpm fails, see E4), optional `npm install -D @astryxdesign/cli`. Then `src/app/globals.css` with three imports in this order: `@import '@astryxdesign/core/reset.css'; @import '@astryxdesign/core/astryx.css'; @import '@astryxdesign/theme-neutral/theme.css';` ("no build plugin, no PostCSS, no Babel config"), a client `providers.tsx` wrapping children in `<Theme theme={neutralTheme}>` (from `@astryxdesign/core/theme`, theme object from `@astryxdesign/theme-neutral/built`) plus `<LinkProvider component={Link}>`, imported in `layout.tsx`. There are also Tailwind and StyleX variants.
- Install scripts: `@astryxdesign/core` and `@astryxdesign/cli` declare `postinstall: node scripts/postinstall.mjs`; the theme packages and `@stylexjs/stylex` declare none (VERIFIED, registry). I read `packages/core/scripts/postinstall.mjs` in full (102 lines) and `packages/cli/scripts/postinstall.mjs` (90 lines): they only print a "run astryx init" nudge to stdout, import a local `agent-doc-state.mjs`, wrap everything in try/catch and `process.exit(0)`, with no network, no file writes, no child_process (VERIFIED by reading and by grep for `writeFile|fetch|http|child_process|exec|spawn` returning nothing on the shared leaf file). Safe enough to allow; still run `npm install --ignore-scripts` if the lead wants zero scripts, since the nudge is the only thing lost.
- `astryx init` (a CLI command, NOT run by install) writes agent instruction files into the project (the nudge text and the issue #4276 mention `AGENTS.md`-style prompts): do NOT run `astryx init` or install the repo's Claude plugin (`.claude-plugin/` exists in the repo) without the lead's install review. Only the npm packages are in scope, as briefed.
- Fonts: the neutral theme's `fonts.css` is `@import url('https://fonts.googleapis.com/css2?family=Figtree...')` (VERIFIED, raw file). That is a runtime request to Google from every visitor, relevant for a classroom tool with minors. Self-host the font (`@fontsource/...` or a downloaded woff2 under the OFL) and skip `fonts.css`. Core's own `reset.css` and `astryx.css` have "no `@font-face`, no remote `url()`" per an adopter (issue #4276, UNVERIFIED by me).

### E2. Which of the seven themes suits a dark scientific interface

Gothic is the only dark-only theme: "dark-only atmospheric theme with deep blue-gray surfaces and pastel categorical accents; Manufacturing Consent and Fustat" fonts (VERIFIED, packages/themes/README.md and gothic.spec.md). It renders "one dark appearance regardless of system color preference". Mood fits (a dark sky), but its display font (Manufacturing Consent, a decorative face) does not suit a scientific tool, and its accent is cream (`--color-accent` set to `neutral.dark[95]`, VERIFIED in gothicTheme.ts line 117). Neutral supports light and dark ("modeStrategy: light-and-dark", VERIFIED in palette.config.json) with Figtree; it is the cleanest base but its default appearance follows the system. Recommendation: use Gothic's source (`gothicTheme.ts`, 686 lines) as the template for a custom theme named, say, `skyblink`, keep its blue-gray ladder, replace accent, fonts and categorical colours (below). Do not ship stock Gothic.

### E3. How a custom theme is defined (VERIFIED from gothicTheme.ts and issue #4276)

A theme is a call `defineTheme({...})` imported from `@astryxdesign/core/theme`, whose body is a set of CSS custom properties, for example `'--color-accent'`, `'--color-accent-muted'`, `'--color-background-body'`, `'--color-background-surface'`, `'--color-background-card'`, `'--color-background-popover'`, `'--color-text-primary'`, `'--color-text-secondary'`, `'--color-text-disabled'`, `'--color-on-accent'`, `'--color-border'`, `'--color-border-emphasized'`, `'--color-info'`, `'--color-success'`, `'--color-warning'`, `'--color-error'`, `'--color-skeleton'`, `'--color-shadow'` plus typography, radius, motion and shadow tokens. The CLI (`astryx theme build`, `astryx docs theme`) compiles it to `theme.css` and a built JS object (scoped by a `data-astryx-theme` attribute on `<html>`, VERIFIED in the CDN recipe); layer order is reset, then astryx-base, then astryx-theme. Real-user warnings from one adopter thread (issue #4276, "migrating a real Next.js 16 app", written against 0.1.8 in July, so some items may be fixed, UNVERIFIED):
1. `@stylexjs/stylex` must be in the install line for pnpm (it is a peer, 202 dist files import it).
2. `defineTheme` seeding `color: { accent: '#5457e8' }` made the dark-mode accent a pale surface with dark text (`light-dark(#424BDA, #CBBEFF)`); to pin a brand accent in dark mode, set `--color-accent` and `--color-on-accent` explicitly as Gothic does.
3. Focus rings use `--color-accent`; a dark accent gives a low-contrast ring; there was no separate focus token.
4. `<Text size>` is ignored when the theme styles that `type`, because of cascade layers.
5. `astryx theme build` writes `<name>.js` next to a `.ts` source (module resolution trap) and puts a timestamp in generated headers.

### E4. Charts

`@astryxdesign/charts` (chart components) and `@astryxdesign/vega` (Vega/Vega-Lite wrapper) are published to npm only under the `@canary` dist-tag; `latest` is the placeholder `0.0.0-bootstrap.0` (VERIFIED, registry JSON: dist-tags latest `0.0.0-bootstrap.0`, canary `0.7.17-canary.g335a172`; README states "no stable release yet"). Do not depend on them for a one-day build. Use hand-written SVG for the measure chart (a few lines and points; the app already measures its own points) and a small library only if needed, styled from the theme variables. I did not read the charts package API (NOT checked).

### E5. Next.js and React 19.3 problems

- Astryx peer requirement is `react >=19.0.0`, so React 19.3 satisfies it on paper (VERIFIED, registry). I searched the issue tracker for "19.3" and "19.2" and found no issue about a React version problem (NOT FOUND; the search tool may under-index). I did not check which React or Next versions exist today beyond the npm `latest` calls, which printed nothing readable (UNVERIFIED).
- Known Next-related items found (issue titles read, VERIFIED titles only): #6376 "The documented Turbopack/StyleX setup produces different layout output from the Babel StyleX setup" (open, only relevant if you use `@astryxdesign/build` source builds; the pre-built CSS route in E1 avoids it); #3374 "integrating Astryx into an existing Next 15 + Tailwind app was harder than it should be" (open, 2026-07-02); #4276 (above, Next 16 + webpack). A webpack-specific `@import` hoisting failure was avoided in that thread by a `layers.css` remedy documented under `astryx docs migration` (UNVERIFIED by me).
- Bundle weight: issues #10057 (a built theme still bundles an 18.7 kB gz runtime theme engine) and #11608 (every List bundles an 11.4 kB gz animation) are open: not blockers for this app.
- Bugs open the day before your deadline are mostly component accessibility details (Stepper, Slider, Dialog, List): avoid Stepper and Slider if possible, or test them (the parallax slider needs its own labelling anyway).
- Overall: beta, fast-moving (a release every day), 150+ components claimed (README). Pin exact versions in `package.json` (no carets) so a release tomorrow cannot break the build. Time cost of adoption on an existing Next app: UNVERIFIED, one adopter reported friction in two threads, so budget 1 to 2 hours and keep a fallback (plain CSS using the same token names).
- Real-user thread: issue #4276 (https://github.com/meta/astryx/issues/4276) is the adoption report; it is positive on className forwarding, CLI docs and CSP-clean CSS.

### E6. Proposed theme for this product ("Skyblink", dark, scientific, infrared accent)

Colours (sRGB hex; contrast ratios computed by me with the WCAG formula only where stated; the rest UNVERIFIED, run `astryx check` or any contrast checker before use):
- Background body `#080B12` (near-black blue, the sky), surface/card `#0E1422`, popover/muted `#161D30`, border `rgba(214,224,255,0.10)`, emphasised border `#3A4666`.
- Text primary `#E8ECF6`, secondary `#A3AEC9`, disabled `#5B6786`.
- ONE accent, infrared: `#FF6A3D` (warm orange-red, the "heat" colour for what SPHEREx sees; set `--color-accent`, `--color-text-accent` `#FF8A63`, `--color-accent-muted` `rgba(255,106,61,0.18)`, `--color-on-accent` `#10121A`, pin explicitly per E3 item 2). Use it only for the moving object, the active step and the primary button.
- Data palette (colour-blind safe: the Okabe-Ito set, a published palette designed for colour-vision deficiency; UNVERIFIED that these hexes are exact, from memory): blue `#0072B2`, sky `#56B4E9`, green `#009E73`, yellow `#F0E442`, orange `#E69F00`, vermillion `#D55E00`, purple `#CC79A7`, plus neutral grey `#9AA3B8`. For the five targets use five of them plus a marker shape per target (circle, square, diamond, triangle, cross) so colour is never the only cue. For wavelength bands in SPHEREx, a sequential single-hue ramp from `#56B4E9` (short) to `#D55E00` (long), monotone in lightness.
- Status: success `#3DDC97`, warning `#F0C24B`, error `#FF5C7A`, info `#6FB3FF` (all on dark).

Type: Inter (variable, OFL, self-hosted) for UI, JetBrains Mono (OFL, self-hosted) for coordinates, numbers and file names; tabular figures on readouts. Scale (px / line-height): 12/16 caption, 14/20 UI and tables, 16/24 body, 20/28 section title, 28/34 step title, 40/44 hero number (for the measured value), 56/60 only on the landing hero. Weight 400 body, 500 labels, 600 headings. Reduced motion respected for the blink playback (offer a static "step through" control).

Three interface principles:
1. The sky is the interface: the image fills the screen and every control floats at its edge; chrome is dark and quiet so the faint infrared object is the brightest thing.
2. Always show the receipt: every frame shows its date, wavelength band, exposure count and file, and every measured number shows its true value beside it, because Validity is scored.
3. One accent, one question per screen: orange is reserved for the thing to look at or click next; each mission step asks one question (where is it, how far did it move, how far away is it).

---

## What I could not verify (and what I did not find)

- Hyperframes: time to first clip, which Chrome build it downloads, whether its transitive npm dependencies run install scripts, whether `tts` downloads Kokoro weights on first use, and any independent user thread (only HeyGen's own docs were read). I did not run it, by instruction.
- brag: the 5 music files were not hashed or listened to; the ende.app licence page was not opened; the Hyperframes skill pack that brag loads (`hyperframes`, `hyperframes-cli`, `hyperframes-registry`, `media-use`) was NOT read, so full brag is only half reviewed; I did not read brag's `step-1-inspect.md`, `step-2-plan.md`, `tones.md` line by line (grep covered them for the hit patterns, skimmed otherwise).
- Remotion: how its licence treats an informal five-person student team (not spelled out); its telemetry page was not read.
- 2023 global winners' demos: NOT FOUND. WMPGang's video is 93 s so it may not be the official submission. I could download and measure only 4 of 9 videos (YouTube returned 403 for the rest); cut counts come from 640x360 copies and an ffmpeg scene threshold, so they are approximate. I did not see the audio (captions only).
- Whether Space Apps judges watch muted: no source found. The "85 percent muted" figure on one blog (zellahq.com) is an unsourced claim, not used above.
- Playwright `recordVideo` frame rate: believed about 25 fps, not confirmed in the page I read.
- Astryx: I did not install or render it; chart packages' API unread; no React 19.3 specific issue found; the Okabe-Ito hex values and my contrast claims are from memory and not computed; `astryx init` side effects are inferred from a user report, not from reading the CLI source.
- FMA, YouTube Audio Library reuse outside YouTube, macOS `say` voice output licence, NASA sonification licences per file: not checked.
- The em dash character was avoided throughout this file.
