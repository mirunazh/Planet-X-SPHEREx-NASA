# SPHEREx-only cleanup

The current application supports SPHEREx as its only image mission and telescope selection. The cleanup covers the navigator registry, UI, help, quests, bundled imagery/data, scripts, tests and maintained documentation.

## Result

- The survey registry and accepted survey identifiers contain only `spherex`. Unsupported deep links retain their coordinates and SPHEREx wavelength without selecting an unsupported survey.
- The Telescope panel presents SPHEREx and its infrared range. Color controls keep the usable channels and skip the two blank channels.
- The introduction uses the existing SPHEREx DR1 projection. Its processing manifest and credits remain intact, including disclosure of the filled missing-data area. Planetary photographs and their obsolete rendering/build support are removed.
- The global discovery catalogue and its discovery-facility metadata are no longer shipped or requested. Named targets retain their original coordinate-reference provenance; an archive or coordinate standard is not presented as another image mission.
- The three quests are a galaxy visit, a SPHEREx wavelength change and a SPHEREx deep-field visit. Existing tests verify that all three can unlock the challenge. Progress uses a separate SPHEREx storage key so obsolete survey stamps and quest requirements are not restored.
- The SPHEREx slideshow and weekly challenge remain available. Their service and data-access scope were already SPHEREx-only.
- Data regeneration preserves the checked-in named-star positions with their original provenance while refreshing galaxy and SPHEREx deep-field reference entries.

## Verification

- 281 TypeScript tests pass, including SPHEREx registry validation, target-only loading, unsupported-link handling, quest reachability and intro provenance.
- 37 Python tests pass. Rejection fixtures use fictional unsupported mission names.
- TypeScript checking and production build pass.
- Compiled production HTTP smoke checks pass: 28 local requests, with external responses simulated.
- Audit of 209 project text files found no remaining named references to other image missions or telescopes. The shipped intro files exactly match the SPHEREx-only manifest, and local Markdown links resolve.
- Impeccable detector returned no findings for the changed interface targets.
- Independent code review requested one keyboard-focus correction. The glossary summary was added to the intro focus trap; non-tabbable, hidden and inert controls are excluded. The reviewer marked that finding resolved and returned **ship at code-review scope**.

## Browser evidence and limits

A local production preview on port 3200 was inspected in the browser. The SPHEREx introduction rendered with its sourced image and credit line. The help panel contained SPHEREx explanations and source links. Keyboard Tab reached “Words explained,” and Space opened the glossary. Entering the navigator exposed only SPHEREx in the Telescope panel. Selecting the 1.25 µm preset updated the URL to frame 22 and unlocked the adapted Field guide quest.

A valid desktop screenshot confirmed the introduction layout. Subsequent capture was blank, so it is not evidence of the telescope panel's visual layout. No valid mobile screenshot was obtained. Browser accessibility output verifies its controls and content. WebGL was unavailable in this browser session; live GPU map rendering was therefore not verified. Automated renderer and geometry tests still pass.

Dependencies, Git history, generated build/cache files and the pre-existing untracked `web/` artifacts from a different branch were not rewritten. They are not part of the current application's source or served asset tree. No commit or push was made.
