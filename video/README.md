# Demo video: render harness

The video is rendered frame by frame from our own HTML scenes in headless Chromium (the
`playwright` npm package, pinned at 1.63.0 to match the Chromium 1243 already cached in
`~/Library/Caches/ms-playwright`) and joined with the ffmpeg on this Mac. Nothing else is
installed, and no third-party video product, music or sound effect is used.

## Render

```sh
cd video
npm install --ignore-scripts     # playwright 1.63.0 only; its browser is already cached
node render.mjs                  # out/proof.mp4 + out/timeline-30s.mp4 (+ audio, + text audit)
node render.mjs proof            # one output
node render.mjs --only s1,s9     # frames only, for looking at one shot
node render.mjs --reuse          # re-encode without re-rendering shots whose frames exist
node capture.mjs standin/actions.mjs   # out/capture-standin.mp4 (live-page capture)
node test.mjs                    # ffprobe, determinism, loudness, out/contact.png
```

Outputs land in `out/`: `proof.mp4` (shots 1, 2, bridge, 9; 10.0 s), `timeline-30s.mp4`
(all shots, 30.000 s), `capture-standin.mp4`, `contact.png`, `audit.json` (every text
element at every 0.25 s: title-safe, overflow, contrast). Frames go to `frames/<shot>/`.
A full render takes about 2.5 minutes (4.7 s of wall time per second of video with 4 pages
in parallel; the grain-heavy 1930 shots are the slow ones).

Encoding: H.264, yuv420p, 60/1 CFR, CRF 16, BT.709 tagged, `+faststart`; audio AAC 192k
48 kHz, -16 LUFS integrated, true peak at most -1.5 dBTP.

## Add or retime a shot

Everything lives in `shots.mjs`, one line per shot:

```js
{ id: 's4', scene: 'placeholder', dur: 4.5, caption: 'It moved. Here it is now.', note: '...' },
```

- Retime: change `dur` (whole frames at 60 fps, so multiples of 1/60 s). `start` is derived,
  so later shots move with it. `render.mjs` refuses a timeline over 30.000 s.
- Caption: at most 8 words (checked); the scene draws it, one line, inside the 5 percent
  title-safe area. The end card uses its caption as the title.
- New scene: copy `scenes/placeholder.html`. A scene imports `scenes/lib.js`, draws only
  from `t` inside `register((t, frame) => ...)`, and uses no timers, `Date`,
  `performance.now` or `Math.random` (use `rng(seed)`). Mark every visible text element with
  `data-text` so the audit checks it. If it makes sound, add cues for its scene name in
  `audio.mjs` (`CUES`).
- Real footage: when an app take exists, either capture it with `capture.mjs` and add a
  scene that plays the frames, or swap the placeholder's frames dir for the captured one
  (`frames/<shot>/00000.png ...`, 1920x1080, exactly `dur x 60` frames) and run `node render.mjs --reuse`.
- `vars.url` and `vars.musicCredit` in `shots.mjs` feed the end card; change them there.

## Capture the real app (frame-exact)

`capture.mjs` opens a URL with Playwright's fake clock installed and paused before the page
loads. For every frame it advances virtual time by exactly 1/60 s (integer ms, no drift),
runs `requestAnimationFrame` callbacks once with that timestamp, seeks all CSS/Web
animations to it, draws a cursor (with a click ring) and takes one screenshot. Timers,
`Date` and `performance.now` all follow the virtual clock, so two runs give identical
frames. Actions: `wait`, `move` (eased), `click`, `type` (characters per second), `press`,
`zoom` (onto a selector or rect, animated, captured at 2x so it stays sharp; `'reset'`
zooms back out).

To point it at the real app:

1. Start the app (it runs on port 3100, owned by the app worker; do not start anything
   else there). This harness only serves on 3200.
2. `cp standin/actions.mjs takes/wise0855.mjs` and edit:
   `url: 'http://127.0.0.1:3100/?ra=133.7600&dec=-7.2422'`, `ready: '<selector that exists
   once data is drawn>'`, and the selectors in `actions` (`#coords`, `#go` are the stand-in's).
3. `node capture.mjs takes/wise0855.mjs --out out/take-wise0855.mp4` (frames go to
   `frames/wise0855/`).

Limits: `<video>` elements and Web Workers are not on the virtual clock; real network
fetches still take real time, so wait for data with `ready` before frame 0. If the app
animates with `setTimeout`/`setInterval`, that already follows the virtual clock.

## Credits the video must carry

- End card, always: `Data: NASA SPHEREx, NASA/IPAC IRSA` (the manifests' credit:
  SPHEREx Level 2 images, NASA/JPL-Caltech, archive NASA/IPAC IRSA).
- Music line (`vars.musicCredit`): today the whole soundtrack is synthesised in
  `audio.mjs`, so it reads "Music: original sound by the team". If a licensed track is
  dropped into `MUSIC` in `audio.mjs`, replace the line with that track's exact required
  credit (title, author, licence).
- Fonts are not credited on screen; their OFL 1.1 licences are in `assets/fonts/`.

## Rules the video must keep

- 30.00 s or less (over that, the project is not eligible). English only.
- No NASA insignia, logotype, seal or any other logo; "NASA SPHEREx" as plain text only.
- No person, face, voice or likeness of anyone, real or generated. No voice of anyone under 18.
- Anything recreated is labelled "Illustration" (shots 1, 2, the start of the bridge);
  anything real is labelled as real data ("SPHEREx, real data").
- Historical facts on screen only as in the plan: 1930, age 24, Pluto. No other claims.
- No em dash character anywhere.
- Submission rules also ask that SI-made images and video carry a visible watermark (note
  01, Q2). This video is code we wrote with SI help; the team lead decides whether that
  applies and, if so, what small on-screen mark to add (a `tag()` line in the scenes).
