# Submission checklist

What the NASA Space Apps form and rules require, what is ready on the branch today (Saturday 14 November 2026, about 19:15 EET), what is missing, and who decides. Sources: research note 01 (rules read at spaceappschallenge.org on 14 November 2026, VERIFIED) and the plan `docs/plans/RUN-spherex-24h.md`, section 11. If the official pages changed after that, the official pages win.

Status words: **READY** (exists and checked), **DRAFT** (text or file exists, needs review), **MISSING**, **IN PROGRESS** (a worker is building it).

## 1. Deadline

- Project submission opens Saturday 14 November 09:00 and **closes Sunday 15 November 23:59, in the time zone of the team's Local Event**. Anything saved or submitted after that is not judged.
- You must click **"Submit for Judging"**. Saving a draft is not submitting.
- You can resubmit as often as you like until the deadline; **only the last saved submission is reviewed**.
- Internal target: submit by **Sunday 17:00**, so that 17:00 to 23:59 is spare time.

## 2. Form fields

All required fields must be filled, otherwise Submit is blocked. All content in English.

| Field | Status | What goes in, and where it comes from | Who decides |
|---|---|---|---|
| Project Name | MISSING | Not chosen. Candidates: the pitch line "Find the next Tombaugh." or a short product name. In code the project is called "spherex-time-viewer". | team |
| High-Level Project Summary | MISSING | Two or three sentences. Base: plan section 1: a public web tool where anyone types RA/Dec and sees the SPHEREx sky change over time like a short film, built as a lesson: see a star move, measure it, reach its distance and speed, on real NASA data. | team lead |
| Link to Project Demo | IN PROGRESS | A public link (YouTube, Drive or GitHub) to a video of at most 30 seconds, or a presentation of at most 7 slides. See section 3. | team lead |
| Link to Final Project | MISSING | The public deployed app (the plan says Vercel) and the public repository `https://github.com/mirunazh/Planet-X-SPHEREx-NASA`. No login, password or registration. | team lead (account), lane L2 |
| Detailed Project Description | MISSING | What it does, how it uses NASA data, how it was built, limits. Source material: `docs/ARCHITECTURE.md`, `docs/PROCESS.md`, `docs/plans/RUN-spherex-24h.md`. Be honest about limits (section 5). | team |
| Use of Super Intelligence (SI) | DRAFT | A truthful draft is in `docs/PROCESS.md`, section 3. The form says this answer is for data collection and is not seen by the judges, but answer exactly. The rule: SI "should not be used to come up with your idea of how to solve the challenge"; the educational-funnel idea is the team's and the lead decided what to build. Audio and code that SI produced must be acknowledged in the descriptive text and metadata; generated images or video need a visible watermark. | team lead |
| NASA Data | READY (list), MISSING (acknowledgement text) | SPHEREx Level 2 spectral images via NASA/IPAC IRSA (DOIs 10.26131/IRSA678 for DR1, 10.26131/IRSA662 for QR3), the earlier globe's HiPS tiles (SPHEREx, 2MASS, AllWISE). At least one NASA dataset is required for a Global Award. Full list: `docs/DATA.md`. Official acknowledgement wording is not yet in the repository. | lane L1 / L5 |
| Space Agency Partner Data and Other References | READY (list) | Every library, image, code and text, even open source: `docs/DEPENDENCIES.md`. Data from other bodies: SIMBAD (CDS), Gaia DR3 (ESA), Kirkpatrick et al. 2021. Fonts: Inter and JetBrains Mono (OFL). Credit any inspiration from other tools in prose, without copying their code. | lane L5 |
| Checkbox: Terms and Conditions | MISSING | Read and tick. | team lead |
| Checkbox: "Confirm All Work is Original" | MISSING | Tick only after reading the reference list: no code copied from other teams; everything borrowed is listed with its licence. Evidence on the Original claim: repository history starts on Saturday 14 November 12:53 (`git log`). The FAQ says teams may not start before the hackathon; confirm nothing predates it. | team lead |
| Images in the form | MISSING | JPG, PNG or GIF, up to 10 MB each; no video or document upload. Screenshots exist in `web/docs/screens/` (the design is being redone, so retake them). | lane L5 |

## 3. The demo

Rules (note 01, VERIFIED): at most 30 seconds of video, **or** at most 7 slides including the title slide; projects that exceed this are not eligible for Global Judging. Hosted outside the form, public, no login. Slides in English; a non-English video needs English subtitles.

| Requirement | Status | Note |
|---|---|---|
| At most 30 s | IN PROGRESS | `video/shots.mjs` has a 9-shot storyboard that adds up to 30.0 s; `video/test.mjs` checks the length. Harness done (last run by the harness worker, 14 November 2026: passed, proof 10.000 s, timeline 30.000 s, capture 5.867 s); the film is not done, shots 3 to 8 are placeholders. |
| English; captions burned in | IN PROGRESS | Many judges watch muted; captions are in the scenes (at most 8 words each). Harness done; film not done (app shots are placeholders); the visible SI watermark question is open for the team lead. |
| **Nobody under 18 seen or heard** (image, voice or likeness) | OPEN DECISION | Voice-over only by an adult teammate, or captions and music only. The team lead decides. |
| No NASA logo or insignia | READY by design | The scenes use the text "NASA SPHEREx data" only. |
| "It moved" names the comparison year (2010) | IN PROGRESS | Rule from note 14: say against which year. Harness done; film not done. |
| Real app footage | IN PROGRESS | Scenes s3 to s8 are placeholders until the design is final; `video/capture.mjs` records the live page. Harness done; film not done; music and voice slots are wired but empty. |
| Music licence | READY (none yet) | The soundtrack is synthesised by `video/audio.mjs`. If a track is added, credit it. |
| Public URL on the end card | MISSING | `video/shots.mjs` has a placeholder (`tombaugh.example.org`) until the real URL exists. |
| 7-slide backup | MISSING | Only for a local pitch. Note 14, section C4 has a one-line-per-slide outline. |

## 4. Repository and legal

| Requirement | Status | Note |
|---|---|---|
| OSI-approved licence in the repository | DRAFT | `LICENSE` is Apache-2.0, committed on the branch as a proposal. The team confirms it and merges it where the judges will look. If no licence is stated, NASA distributes the work under Apache 2.0 (legal page, note 01). |
| List of all libraries and data | READY | `docs/DEPENDENCIES.md`, `docs/DATA.md`. |
| "NASA does not endorse this project" | READY | In the web footer (`web/src/lib/strings.ts`) and the root `README.md`. |
| No NASA logo in the app or video | READY | None used. |
| Official acknowledgement texts (IRSA/SPHEREx, SIMBAD, Gaia) | MISSING | `credits.acknowledgement` in every manifest is `null` on purpose. Copy the wording from the source pages and cite the URL (DATA.md, section 5). |
| Public "Credits and licences" page in the app | MISSING | Recommended in note 11 (section 6, item 8). |
| No secrets in the repository | READY (to repeat) | No API keys exist in the project. Run `gitleaks` before every push. |
| Public repository, no login | READY | `https://github.com/mirunazh/Planet-X-SPHEREx-NASA`. |
| FortiGuard Web Filter Classification for the new site | MISSING | Tip from the submission guide: request it so the judges' network does not block the site. Lane L5. |

## 5. Team and eligibility

| Requirement | Status | Note |
|---|---|---|
| At most six team members | READY | The team has five. |
| All members registered for the same Local Event (not waitlisted) | UNVERIFIED | Team lead checks. Team changes are allowed until 15 November. |
| Anyone under 18: registered by a guardian; not shown or heard in the demo | UNVERIFIED | Team lead checks and decides on the voice-over. |
| One team per person, one challenge per team | UNVERIFIED | Team lead confirms. |

## 6. Product acceptance tests from the plan (section 1)

These decide whether the Validity and Relevance criteria are earned. Status today:

| # | Test | Status |
|---|---|---|
| 1 | Typing the WISE 0855 challenge coordinates (`08h55m10.831s -07d14m42.53s`) gives real SPHEREx frames, says the object moved about 2 arcmin west, and shows it at 4 to 5 microns | PARTLY: viewer v1 shows the "It moved" banner and the `d5d6` group on those coordinates (screenshot `web/docs/screens/03-wise0855-from-challenge-coords.png`); not rerun in the new design |
| 2 | Each of the five targets starts as a movie from one click in under 2 seconds | PARTLY: static assets and cards exist; the 2-second figure has not been measured |
| 3 | Any coordinate gives a first pass in under 15 seconds, or a clear "no coverage" message | MISSING: live path is built in the library, not in the app (wiring in progress on local branch `wip/live-path`, not yet in the repository) |
| 4 | A copied link reproduces the same view in an incognito window, no login | NOT TESTED (state is in the URL; needs a public deployment) |
| 5 | Three outsiders finish mission 1 in under 3 minutes without help | MISSING (needs the measuring missions in the app; in progress on local branch `wip/missions`, not yet in the repository) |
| 6 | Every frame shows its date, wavelength range, number of exposures and source files | PARTLY: the manifest carries all four; check the new design shows them |
| 7 | The form is complete: video of at most 30 s, public links, OSI licence in the repository, NASA data listed, SI field filled | see sections 2 to 4 |

## 7. Claims to keep honest

Words that must not appear in the submission because the data does not support them:

- Do not claim a parallax or distance measurement for WISE 0855 or Barnard's Star (0.7 to 1.1 and 0.4 sigma).
- Do not claim better than about 10 percent for Epsilon Indi B (306 +- 28 mas, 3.3 +- 0.3 pc against Gaia's 3.64 pc), and say it uses Gaia's proper motion and a field-star correction.
- Do not promise that students will find Planet X or Planet Nine; SPHEREx cannot detect Planet Nine. Promise the method.
- Say that the WISE 0855 and Barnard motion rates read about 22 and 13 percent low and why.
- Mark the R Draconis period as consistent but not demonstrated.
- Say "astronomy", not "astrology".

## 8. Last-hour sequence (Sunday)

1. Freeze at 13:00 (functions) and 15:30 (code), as in the plan.
2. Open the public URL in an incognito window and on a phone; paste the five target links.
3. Run `gitleaks`; confirm `LICENSE`, credits page and references are present.
4. Fill every field, tick both boxes, save.
5. Click "Submit for Judging" well before 17:00; reopen the submission and confirm it shows as submitted.
