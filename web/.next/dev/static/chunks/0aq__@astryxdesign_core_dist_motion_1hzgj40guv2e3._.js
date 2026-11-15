(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/node_modules/@astryxdesign/core/dist/motion/android/keyboard.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file keyboard.ts
 * @input None
 * @output `keyboard`: how the software keyboard moves on Android, in Chrome
 *   with Gboard, as the page sees it. It holds the slides' durations and
 *   curves, and when they start against Chrome's report and a blur.
 * @position The keyboard domain of the Android constants table, read by
 *   keyboard/keyboardModel.ts. The UIKit table holds iOS's keyboard.
 *
 * SYNC: When modified, update /packages/core/src/keyboard/README.md
 */ // Chrome reports the keyboard once per slide, through the visual viewport,
// just after the slide starts, never per frame. Content that rides the
// keyboard plays these curves from the slide's start, so it moves in step
// with Gboard. They are Gboard's own motion, with no motion role. The system
// moves the keyboard on them whatever the page does, so any other curve
// would leave the content out of step.
//
// The values come from the Android 15 emulator with Chromium 158 and Gboard.
// A screen recording at 540 × 1200 gives Gboard's top in every frame, beside
// a marker the page paints on each report. Every leaf carries one or more
// `@source`, and android.test.ts enforces it.
__turbopack_context__.s([
    "keyboard",
    ()=>keyboard
]);
const keyboard = {
    /**
   * How long Gboard takes to slide up, in ms: from its first moved frame to
   * its resting top.
   *
   * @source measured: Chromium 158 with Gboard on Android 15 (API 35
   *   emulator); 20 shows recorded frame by frame: 250 to 282 ms, 18 of
   *   them 264 to 268 ms, Oct 25 2026
   */ showMs: 267,
    /**
   * The curve of Gboard's slide up, cubic-bézier control points: fast out,
   * a long settle.
   *
   * @source measured: Chromium 158 with Gboard on Android 15 (API 35
   *   emulator); the same 20 shows fit this curve over `showMs` within
   *   2.4 px rms, Oct 25 2026
   */ showCurve: [
        0.1,
        0,
        0,
        1
    ],
    /**
   * How long after Gboard starts to slide up Chrome's report of it fires, in
   * ms. A show rides from the report dated back by this, joining the slide
   * where it is.
   *
   * @source measured: Chromium 158 with Gboard on Android 15 (API 35
   *   emulator); twelve shows: the first frame the page painted after the
   *   visual viewport's resize came 14 to 35 ms (median 33) after Gboard's
   *   first moved frame, less the 8 ms an event takes on average to reach
   *   the screen, Oct 25 2026
   */ showReportLagMs: 25,
    /**
   * How long Gboard takes to slide down out of the page, in ms.
   *
   * @source measured: Chromium 158 with Gboard on Android 15 (API 35
   *   emulator); 21 hides recorded frame by frame, from Gboard's first
   *   moved frame until it leaves the screen: 148 to 153 ms in 20 of them;
   *   this length with `hideCurve` fits them within 7.7 px rms,
   *   Oct 25 2026
   */ hideMs: 167,
    /**
   * The curve of Gboard's slide down, cubic-bézier control points: a slow
   * first frame, then fast.
   *
   * @source measured: Chromium 158 with Gboard on Android 15 (API 35
   *   emulator); the same 21 hides, a free fit over `hideMs`, Oct 25 2026
   */ hideCurve: [
        0.3,
        0.1,
        0.2,
        0.9
    ],
    /**
   * How long after the focused field blurs (to nothing that brings up a
   * keyboard) Gboard starts to slide down, in ms.
   *
   * @source measured: Chromium 158 with Gboard on Android 15 (API 35
   *   emulator); five scripted blurs with a marker the page paints on the
   *   blur: Gboard's first moved frame came from a frame before the marker
   *   to 33 ms after it (median 16), Oct 25 2026
   */ hideAfterBlurMs: 16,
    /**
   * How long after Gboard starts to slide down Chrome's report of the hide
   * fires, in ms, measured on blurs. A hide nothing predicts, such as Back,
   * reuses it, though Chrome can report Back later in the slide.
   *
   * @source measured: Chromium 158 with Gboard on Android 15 (API 35
   *   emulator); twelve scripted blurs: the visual viewport's resize came
   *   42 to 52 ms after the blur (median 49), less `hideAfterBlurMs`,
   *   Oct 25 2026
   */ hideReportLagMs: 33
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/animator.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "END_HOLD_MS",
    ()=>END_HOLD_MS,
    "PROMOTION_LINGER_MS",
    ()=>PROMOTION_LINGER_MS,
    "SETTLE_THRESHOLD",
    ()=>SETTLE_THRESHOLD,
    "animatorFor",
    ()=>animatorFor,
    "createMotionEngine",
    ()=>createMotionEngine,
    "defaultIsCoarsePointer",
    ()=>defaultIsCoarsePointer,
    "defaultPrefersReducedMotion",
    ()=>defaultPrefersReducedMotion,
    "isIdentityText",
    ()=>isIdentityText,
    "motionNow",
    ()=>motionNow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file animator.ts
 * @input An element, target values, and a spring, momentum curves (coast.ts)
 *   or any closed-form curve
 * @output Exports `createMotionEngine`, a compositor animator for
 *   translate, rotate, scale and opacity, and its option, handle and
 *   transition types. It reads presentation values and velocities from the
 *   analytic curves. It retargets with the velocity kept, freezes in place on
 *   `stop`, and gives completion promises, a shared clock, and UIKit's
 *   Reduced Motion substitution.
 * @position Motion foundation (DOM). Internal to core: components use it for
 *   every touch-presentation animation; not exported from the package entry
 *
 * HOW IT RUNS
 *
 * Each animated value (x, y, rotate, scaleX, scaleY, opacity) follows a
 * closed-form curve: a spring (spring.ts), momentum curves its caller built (a
 * UIScrollView coast with an edge bounce, coast.ts), a curve handed to `play` (a spring chasing a moving
 * target, a fitted UIKit curve), or a Reduced Motion cross-fade. The curves are baked into
 * Web Animations keyframes on the individual transform properties (`translate`,
 * `rotate`, `scale`) and `opacity`, sampled adaptively until linear
 * interpolation between keyframes is within a fraction of a pixel, and played
 * with `easing: linear`. The browser then runs them on its compositor: they
 * keep advancing every frame while JavaScript is busy (`spec:AST-094` FR5).
 *
 * Why keyframes and not one `linear()` easing: measured in Chromium, both
 * forms are composited and equally precise for the same samples, but WebKit's
 * Core Animation path refuses to accelerate an effect whose easing is
 * `linear()` with points (KeyframeEffect::canBeAccelerated) unless its newer
 * threaded animations are on, so on older iOS Safari a `linear()` spring would
 * run on the main thread. Linear segments between keyframes map directly onto
 * a Core Animation keyframe animation. Why the individual properties and not
 * `transform`: each can be animated, retargeted or driven by a finger on its
 * own (a drag writes `translate` while `scale` keeps springing), with no
 * additive composition, which neither engine composites.
 *
 * The page never reads the DOM to know where something is: `get` and
 * `getVelocity` evaluate the curves at a time on the document timeline's
 * clock (`performance.now()` by default), so a finger can grab anything
 * mid-flight from the value on screen, and a new target starts from the
 * current value with the current velocity (`spec:AST-094` FR6). A gesture's release velocity
 * can be handed in explicitly instead.
 *
 * No frame shows a value the element is not at. While a curve runs, the
 * element's inline style holds the value the curve starts from (the value on
 * screen when it was built), so a frame painted before the compositor has the
 * curve (WebKit can receive a new curve a few updates late) shows the element
 * where it is, never where it is going. The keyframes hold the end state for a
 * while after the curve ends (END_HOLD_MS); the main thread retires a finished
 * animation as soon as it runs after the curve's end, writing the end values
 * inline in the same task that cancels it, so nothing moves. The hold matters
 * when the curve ends during a main-thread block: WebKit's compositor ends an
 * animation by falling back to the value its main thread last committed.
 *
 * Start time: a call that starts from rest (nothing on its channels moving,
 * no `options.at`) gets no start time, so the browser starts it when it
 * commits it, as Core Animation starts an animation at its transaction's
 * commit: a main-thread block before that frame delays the motion instead of
 * skipping into it. Everything the call starts, and every
 * call from rest in the same task, starts at that one time, which
 * `handle.started` reports. Where the compositor starts it and the page
 * learns that start only a frame or more later (Chromium), the call starts
 * at the frame that commits it, the start the compositor takes, so a
 * retarget or a rebase before then continues from the frame on screen. A
 * call that continues motion on screen (a retarget, a catch) keeps an
 * explicit start: the first motion call of its callback, or `options.at`.
 * So calls on several animators in one callback line up. The new curve
 * then continues from the frame on screen. A late commit restarts each
 * spring at its frame (lookAtShown). Keyframes are sampled from the call's
 * start, so a value that keeps moving through a rebuild stays on its curve
 * to the frame.
 * `options.start` changes that per call. `'commit'` dates a retarget by the
 * browser's commit as well. `'presented'` creates the animations of a call
 * from rest two frames later, once its element at rest has been presented.
 * That serves a UI process that applies commits late. It does not change
 * when a retarget starts. `'next-frame'`, for a call in an input event's own
 * task, starts a call from rest at the first frame after that task.
 * `handle.curve(property)` hands out the curve a call plays, so a
 * companion can follow it on the same clock.
 * `options.additive` retargets as UIKit does: the old curve keeps going and a
 * curve of the change between the targets is added on top, baked into one
 * animation (two animations on one property leave the compositor in both
 * engines), so the retarget keeps the velocity on screen.
 *
 * WebKit dates an animation created just before a block at its last frame
 * time before the block, where the first frame after it would show the
 * motion skipped into its curve; when the call's own task ran on more than
 * two frames, the call's first read of that start moves it to that read, so
 * WebKit delays the motion as Chromium's commit does (startAfterBlock). Every
 * call of that task moves together, and a shorter task or a read that other
 * tasks delay keeps the browser's start, so a sequence chained on a call's
 * end (a Reduce Motion cross-fade's second half) keeps its clock.
 *
 * Promotion: Mobile Safari runs an animation whose start time is set from
 * script on its compositor at its first commit only if the element (or the
 * pseudo-element) already has a compositing layer; without one, a block
 * right after that commit freezes it (iOS 26.2 simulator: 2 of 7 runs kept
 * moving, 0 of 5 on a ::before). Every animation the animator creates, and
 * every `set` (unless it passes `{promote: false}`), therefore promotes its
 * channels in the same task: inline
 * `will-change` on the element, merged with the element's own, or the custom
 * property `--astryx-motion-will-change-<pseudo>` on the host for a
 * pseudo-element, whose style opts in with
 * `will-change: var(--astryx-motion-will-change-before, auto)`. That is
 * enough (5 of 5, and 4 of 4 through the animator); promotion ends
 * PROMOTION_LINGER_MS after the last motion.
 *
 * Known limits, iOS Safari (measured on the iOS 26.2 simulator):
 * - a block in the task that starts a motion delays it: it starts when the
 *   browser commits it, after the block;
 * - an animation created in the task that first displays a dialog stays on
 *   the main thread: start it in the next animation frame;
 * - after a long block, an animation frame's timestamp is when the frame was
 *   due, so passing it as `at` starts the curve in the past: keep the default
 *   clock;
 * - WebKit does not promote the siblings a moving layer will cross, so a
 *   moving layer below content can paint over it: give it `z-index: -1`
 *   inside a parent with `isolation: isolate`;
 * - a tap-driven start can show its first moving frame two to four frames
 *   into the curve (simulator, not yet confirmed on a device).
 *
 * Reduced Motion (design:reduced-motion): with `prefers-reduced-motion:
 * reduce`, every `animate` and `play` (travel or opacity, on a spring or any
 * curve) is replaced, and nothing moves, scales or springs. The planner
 * (reducedMotionPlan.ts) decides what each call becomes; the animator
 * applies the plan and runs its landings:
 * - on a coarse primary pointer, or for a call started by a touch drag's
 *   release on any pointer (`touchRelease`), it becomes (DR2) an
 *   opacity-only cross-fade of `timing.reducedMotionCrossFadeMs` (200 ms)
 *   on `timing.curves.move`:
 *   - entering (opacity rises from 0 in the same call, or `crossfadeAs:
 *     'entrance'`): lands in its new place at once and fades in;
 *   - leaving (opacity falls to 0, or `crossfadeAs: 'exit'`): fades out in
 *     place, then lands;
 *   - an opacity change alone: fades to its value;
 *   - otherwise: dips (fades out, lands, fades back in);
 *   travel lands with a plain style write while the element is transparent,
 *   never as an animated transform; a busy main thread only keeps it
 *   transparent longer, and a dip fades back in from the landing; a later
 *   call that lands too carries a landing still waiting (two calls in one
 *   frame land together), and a later opacity change lands it at once;
 * - on any other primary pointer (DR3) it completes at once.
 * No call option and no role value lengthens the fade or keeps travel (DR4):
 * the fade's length is not a role.
 *
 * Momentum under Reduce Motion (`design:reduced-motion` DR2, DEC-2): a
 * decay's momentum continues the velocity a finger handed it on release
 * (UIScrollView's coast after a flick, with its bounce at an edge), so it
 * keeps its motion, as native momentum does: it is direct movement, not a
 * transition. A curve marked `isTransition` (coast()'s spring back from past
 * an edge), like a spring a component starts on release toward a target it
 * picks (a detent, a page), is a transition: it plays through the Reduce
 * Motion policy above, a cross-fade on a coarse pointer or after a touch
 * release (`touchRelease`) and at once elsewhere (DR2, DR3).
 *
 * Roles: every spring and curve the animator plays passes through
 * resolveMotion.ts, which names the motion role it plays. `springs.settle`
 * registers as its module loads, and the animator registers the Reduce Motion
 * fade's curve alone. The per-role tables stay internal
 * (`spec:AST-094` DEC-15), so a role plays its table value: nothing reads a
 * role's own CSS variable. Its time scales by the tempo of the element's
 * theme. A spring written inline at the call
 * site, and a table never registered, play as given; the fade's length is not
 * a role.
 *
 * A pseudo-element (`options.pseudoElement`, a dialog's `::backdrop`) has no
 * inline style. A static filling animation holds its end value, after a
 * curve ends and after `set`, until the next animation replaces it. The hold
 * lasts as long as the pseudo-element exists. A value equal to its `base`,
 * the values its own stylesheet shows at rest, is not held. The stylesheet
 * shows it, so the pseudo-element keeps no compositing layer at rest. In
 * development, the first hold dropped this way checks that the stylesheet
 * shows it. The browser makes a `::backdrop` again, without the hold, each
 * time its dialog opens. So a presentation calls `set` with its starting
 * value right after `showModal()`, in the same task. A `set` before it lands
 * on the backdrop the open replaces.
 *
 * SSR-safe: nothing touches `window` or `document` at module scope, and an
 * animator created without an element only keeps state until one is attached.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/motion/animator.test.ts
 * - /packages/core/src/motion/reducedMotionPlan.ts (the Reduce Motion plan)
 * - /packages/core/src/motion/__tests__/animator.interaction.browser.spec.ts
 * - /packages/core/src/motion/resolveMotion.ts (the roles it resolves)
 * - /packages/core/src/motion/README.md
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$bezier$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/bezier.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$frameBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/frameBlock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/spring.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$presentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/presentation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$resolveMotion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/resolveMotion.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$timing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/timing.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$reducedMotionPlan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/reducedMotionPlan.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/reducedMotion.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/devWarning.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
/**
 * A value the animator can drive.
 */ /**
 * Values by property; `scale` sets `scaleX` and `scaleY` together.
 */ /**
 * A spring and the velocity it starts with.
 */ /** What `Animator.rebase` takes besides the amounts. */ /**
 * Options of `animate` and `play`: the spring, a release velocity, the Reduced
 * Motion handling.
 */ /**
 * Any closed-form curve to play on the compositor (`Animator.play`, and a
 * release's coast through `Animator.decay`): a spring chasing a moving
 * target, a piecewise curve, a fitted UIKit curve. Times are seconds from
 * the curve's start; the value at `duration` is the end state. Start it at
 * the property's presentation value (`get`) to continue without a jump.
 */ /** How `set` puts values in place. */ /**
 * Options of `createMotionEngine`.
 */ /**
 * One `animate` / `decay` call's animations.
 */ /**
 * A compositor animator bound to one element (see the file header).
 */ // ---------------------------------------------------------------------------
// Curves
// ---------------------------------------------------------------------------
/**
 * A call started from rest. Its animations are created without a start time,
 * so the browser starts them when it commits them, as Core Animation starts
 * an animation at its transaction's commit: a main-thread block before that
 * frame delays the motion instead of skipping into it. Until then the curves
 * read from the call time; once the browser's start is known they move to it.
 */ /** An atRest() call waiting for its curves to end. */ /**
 * Reduced Motion travel that lands with a plain style write while the
 * element is fully transparent (never an animated transform), then, in a
 * dip, the fade back in.
 */ /** What Reduced Motion makes of a call: its segments, and any landing. */ const PROPERTIES = [
    'x',
    'y',
    'rotate',
    'scaleX',
    'scaleY',
    'opacity'
];
/** The axes momentum moves: `decay` takes only these (DR2, DEC-2). */ const DECAY_PROPERTIES = [
    'x',
    'y'
];
const IDENTITY = {
    x: 0,
    y: 0,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    opacity: 1
};
const SETTLE_THRESHOLD = {
    x: 0.05,
    y: 0.05,
    rotate: 0.01,
    scaleX: 0.0001,
    scaleY: 0.0001,
    opacity: 0.001
};
/**
 * Keyframes are added until linear interpolation is within this: a quarter of
 * a device pixel (this quarter of a CSS pixel, divided by the device pixel
 * ratio where it is above 1), a twentieth of a degree, a 2000th of the size,
 * about one step of an 8-bit alpha. Every one is below what a moving element
 * can show.
 */ const SAMPLE_TOLERANCE = {
    x: 0.25,
    y: 0.25,
    rotate: 0.05,
    scaleX: 0.0005,
    scaleY: 0.0005,
    opacity: 0.004
};
/** Keyframes start on this grid (ms) and are split where the curve needs it. */ const SAMPLE_GRID_MS = 1000 / 30;
/**
 * A curve within this many sample tolerances of its target can show as at
 * rest. A call on it then starts as one from rest does, at the browser's start.
 */ const REST_DISTANCE_TOLERANCES = 2;
/**
 * A curve shows as at rest only while it moves at most one `SAMPLE_TOLERANCE`
 * a frame at this rate.
 */ const REST_FRAMES_PER_SECOND = 60;
/** A curve that has not settled by then (an undamped spring) snaps. */ const MAX_DURATION_MS = 30_000;
/**
 * How close a spring's target and a value must be to count as the same, in
 * the property's own units. Only float rounding separates two ways of
 * computing one value, far below anything the screen shows.
 */ const SAME_VALUE = 1e-6;
/**
 * The task calls from rest are made in, shared by every call made in it
 * (every animator's), so one motion's parts that are separate calls start
 * together (startAfterBlock).
 */ /** The task the current calls from rest are made in, until it ends. */ let openTask = null;
/** How many of the animators' animation-frame callbacks are running now. */ let frameDepth = 0;
/** The mark of the running task, opened by its first call from rest. */ function markTask(time, clock) {
    if (openTask == null) {
        const task = {
            first: time
        };
        openTask = task;
        queueMicrotask(()=>{
            task.ended = clock();
            openTask = null;
        });
    }
    return openTask;
}
/** The first read of the time an animation frame runs, by its timestamp. */ let frameRead = null;
/** The first motion call on a clock since the last microtask checkpoint. */ let openCall = null;
/**
 * The time of a motion call with no explicit clock. It is the time of the
 * first such call on the same clock since the last microtask checkpoint. One
 * event listener or frame callback thus shares one clock. So calls on
 * several animators in one callback, such as a pager's children, line up, as
 * calls from rest share one start. A call more than LATE_START_MS after the
 * first opens a new clock: the curves that a block passed restart at their
 * frame instead.
 */ function callTime(clock) {
    const time = clock();
    if (openCall != null && openCall.clock === clock && time - openCall.time <= __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$frameBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LATE_START_MS"]) {
        return openCall.time;
    }
    const call = {
        time,
        clock
    };
    openCall = call;
    queueMicrotask(()=>{
        if (openCall === call) {
            openCall = null;
        }
    });
    return time;
}
/**
 * Promotions that wait for their stylesheet's will-change, from every
 * animator, until the running callback's microtasks run.
 */ const sheetReads = [];
/** One element's wait in sheetReads. */ /**
 * Queues an element's stylesheet read for a microtask after the callback.
 * That microtask lifts every queued promotion, reads every stylesheet, and
 * then writes every promotion back. So motions that one callback starts force
 * one style pass, not one per element.
 */ function queueSheetRead(read) {
    if (sheetReads.length === 0) {
        queueMicrotask(flushSheetReads);
    }
    sheetReads.push(read);
}
function flushSheetReads() {
    const reads = sheetReads.splice(0);
    for (const read of reads){
        read.lift();
    }
    for (const read of reads){
        read.read();
    }
    for (const read of reads){
        read.write();
    }
}
/**
 * Per animator, the first of its calls that still wait for the frame that
 * commits them. An animator removes its entry once nothing of its waits: a
 * rebuild or a hidden page committed its calls, or it was disposed or moved.
 * The frame's first read takes every entry.
 */ const waitingCalls = new Map();
/** The first waiting call, read once by the frame with this timestamp. */ let waitingRead = null;
/**
 * The first call that the animation frame with timestamp `frame` commits.
 * The frame reads it once, so every animator in it judges a late commit from
 * the same call. `own` is the first of the reading animator's calls.
 */ function firstCommitted(frame, own) {
    if (frame != null && waitingRead?.frame === frame) {
        return Math.min(waitingRead.first, own);
    }
    const first = Math.min(own, ...waitingCalls.values());
    // The frame commits every call that waits now. An animator whose look
    // never runs, such as one on another frame source, counts once at most.
    waitingCalls.clear();
    if (frame != null) {
        const read = {
            frame,
            first
        };
        waitingRead = read;
        // A browser runs every callback of a frame before its next task.
        setTimeout(()=>{
            if (waitingRead === read) {
                waitingRead = null;
            }
        }, 0);
    }
    return first;
}
/**
 * The time the animation frame with timestamp `frame` runs, read once in
 * that frame. Every animator's callback in the frame takes that read, so the
 * calls from rest that one frame commits start together. A long callback
 * before them does not move their start. A call on a moving element keeps
 * its own clock. The read ends with the frame's task, so a frame
 * source that repeats a timestamp still reads each frame anew. A frame
 * source with no timestamp reads the clock.
 */ function frameTime(frame, clock) {
    if (frame == null) {
        return clock();
    }
    if (frameRead?.frame === frame) {
        return frameRead.time;
    }
    const read = {
        frame,
        time: clock()
    };
    frameRead = read;
    // A browser runs every callback of a frame before its next task.
    setTimeout(()=>{
        if (frameRead === read) {
            frameRead = null;
        }
    }, 0);
    return read.time;
}
/**
 * What the calls of the running task have baked. A call that plays the same
 * curve objects reuses them: a row of items that one curve moves samples it
 * once. Cleared at the next microtask checkpoint.
 */ let taskBakes = null;
function bakesOfTask() {
    if (taskBakes == null) {
        const bakes = {
            times: [],
            keyframes: []
        };
        taskBakes = bakes;
        queueMicrotask(()=>{
            if (taskBakes === bakes) {
                taskBakes = null;
            }
        });
    }
    return taskBakes;
}
function isSameKey(a, b) {
    return a.length === b.length && a.every((value, i)=>Object.is(value, b[i]));
}
/** Whether the engine can copy an effect with its parsed keyframes. */ function isCopyable(effect) {
    return typeof KeyframeEffect === 'function' && typeof Animation === 'function' && effect instanceof KeyframeEffect;
}
/**
 * Plays a copy of `effect` on `element`, as `element.animate` would play the
 * same keyframes and timing, without parsing them again.
 */ function copyAnimation(effect, element) {
    const copy = new KeyframeEffect(effect);
    copy.target = element;
    const animation = new Animation(copy, element.ownerDocument.timeline);
    animation.play();
    return animation;
}
/** Above this many keyframes the tolerance is relaxed. */ const MAX_KEYFRAMES = 1200;
const END_HOLD_MS = 60_000;
/** How often a paused animation is looked at again for retiring, ms. */ const RETIRE_RECHECK_MS = 100;
/**
 * The soonest a running animation's end is looked for again, ms: a frame at
 * 60 Hz. WebKit moves an animation's currentTime once per frame, so a look
 * within a frame reads the frame's time, a fraction of a ms short of the end,
 * and a timer for that fraction would fire again before anything moved.
 */ const END_RECHECK_MS = 1000 / 60;
const PROMOTION_LINGER_MS = 500;
const CHANNELS = {
    translate: [
        'x',
        'y'
    ],
    rotate: [
        'rotate'
    ],
    scale: [
        'scaleX',
        'scaleY'
    ],
    opacity: [
        'opacity'
    ]
};
const CHANNEL_OF = {
    x: 'translate',
    y: 'translate',
    rotate: 'rotate',
    scaleX: 'scale',
    scaleY: 'scale',
    opacity: 'opacity'
};
function round(value, digits) {
    return Number(value.toFixed(digits));
}
function format(channel, value) {
    switch(channel){
        case 'translate':
            return `${round(value('x'), 3)}px ${round(value('y'), 3)}px`;
        case 'rotate':
            return `${round(value('rotate'), 4)}deg`;
        case 'scale':
            return `${round(value('scaleX'), 5)} ${round(value('scaleY'), 5)}`;
        case 'opacity':
            return `${round(Math.min(1, Math.max(0, value('opacity'))), 4)}`;
    }
}
/**
 * Whether a computed value shows `expected` (`format`'s text). An unset or
 * `none` value is the channel's identity. One value of a two-value channel
 * stands for both (scale), or for x with y at 0 (translate).
 */ function sameShown(channel, shown, expected) {
    const numbers = (text)=>{
        const values = (text === '' || text === 'none' ? IDENTITY_TEXT[channel] : text).match(/-?\d*\.?\d+(?:e-?\d+)?/g);
        const list = (values ?? []).map(Number);
        if (channel === 'translate') {
            return [
                list[0] ?? 0,
                list[1] ?? 0
            ];
        }
        if (channel === 'scale') {
            return [
                list[0] ?? 1,
                list[1] ?? list[0] ?? 1
            ];
        }
        return list.length > 0 ? list : [
            channel === 'opacity' ? 1 : 0
        ];
    };
    const a = numbers(shown);
    const b = numbers(expected);
    return a.length === b.length && a.every((value, i)=>Math.abs(value - b[i]) < 1e-3);
}
const shared = new WeakMap();
function animatorFor(element, options = {}) {
    let byPseudo = shared.get(element);
    if (byPseudo == null) {
        byPseudo = new Map();
        shared.set(element, byPseudo);
    }
    const key = options.pseudoElement ?? '';
    let animator = byPseudo.get(key);
    if (animator == null) {
        animator = createMotionEngine(element, options);
        byPseudo.set(key, animator);
    }
    return animator;
}
/**
 * The inline text for a channel: `format`, except that an identity transform
 * is written `none`. Any other value, `translate: 0px 0px` included, makes
 * the element the containing block of its `position: fixed` descendants and
 * a stacking context, so a motion back to identity would leave a fixed child
 * moved with its parent; Mobile Safari also lets no finger scroll a list
 * inside an element left at `scale: 1`. At rest the identity leaves the
 * element entirely when its stylesheet agrees (`releaseIdentity`).
 */ function inlineText(channel, value) {
    const at = (property, identity, digits)=>round(value(property), digits) === identity;
    switch(channel){
        case 'translate':
            return at('x', 0, 3) && at('y', 0, 3) ? 'none' : format(channel, value);
        case 'rotate':
            return at('rotate', 0, 4) ? 'none' : format(channel, value);
        case 'scale':
            return at('scaleX', 1, 5) && at('scaleY', 1, 5) ? 'none' : format(channel, value);
        case 'opacity':
            return format(channel, value);
    }
}
/** What `inlineText` writes for each channel at identity. */ const IDENTITY_TEXT = {
    translate: 'none',
    rotate: 'none',
    scale: 'none',
    opacity: '1'
};
function isIdentityText(channel, text) {
    const value = text.trim();
    if (value === '' || value === 'none') {
        return true;
    }
    const numbers = value.split(/\s+/).map((part)=>Number.parseFloat(part));
    if (numbers.some((number)=>!Number.isFinite(number))) {
        return false;
    }
    const identity = channel === 'scale' || channel === 'opacity' ? 1 : 0;
    return numbers.every((number)=>Math.abs(number - identity) < 1e-6);
}
function expand(values) {
    const out = {};
    for (const [key, value] of Object.entries(values)){
        if (value == null || !Number.isFinite(value)) {
            continue;
        }
        if (key === 'scale') {
            out.scaleX ??= value;
            out.scaleY ??= value;
        } else if (PROPERTIES.includes(key)) {
            out[key] = value;
        }
    }
    return out;
}
function motionNow() {
    return typeof performance === 'undefined' ? Date.now() : performance.now();
}
function defaultPrefersReducedMotion() {
    return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
function defaultIsCoarsePointer() {
    return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;
}
/**
 * The transition `decay` hands a Reduce Motion transition curve to: under
 * Reduce Motion `animate` plays no spring (a cross-fade, or at once), so the
 * spring itself is never solved.
 */ const REDUCED_TRANSITION = {
    spring: {
        duration: 0.5,
        bounce: 0
    }
};
/**
 * Registers `name` as an inherited `<length>` (initially 0px) or `<number>`
 * (initially 0) so keyframes interpolate it; an unregistered custom property
 * animates in steps. A property the page already registered is left as it
 * is.
 */ function registerCustomProperty(name, syntax) {
    if (typeof CSS === 'undefined' || typeof CSS.registerProperty !== 'function') {
        return;
    }
    try {
        CSS.registerProperty({
            name,
            syntax,
            inherits: true,
            initialValue: syntax === '<length>' ? '0px' : '0'
        });
    } catch (error) {
        // A name registered before, by the page or an earlier call, throws this.
        if (!(error instanceof DOMException) || error.name !== 'InvalidModificationError') {
            throw error;
        }
    }
}
function createMotionEngine(element, options = {}) {
    const now = options.now ?? motionNow;
    const frameSource = options.requestFrame ?? (typeof requestAnimationFrame === 'function' ? (callback)=>{
        requestAnimationFrame((frame)=>callback(frame));
    } : null);
    // Every frame callback of an animator's counts itself, so a call made in
    // one knows its animations commit in that frame.
    const requestFrame = frameSource == null ? null : (callback)=>{
        frameSource((frame)=>{
            frameDepth += 1;
            try {
                callback(frame);
            } finally{
                frameDepth -= 1;
            }
        });
    };
    const pseudoElement = options.pseudoElement;
    const customProperty = options.customProperty;
    const companion = customProperty?.companion;
    if (customProperty != null) {
        registerCustomProperty(customProperty.name, customProperty.syntax);
    }
    if (companion != null) {
        registerCustomProperty(companion.name, companion.syntax);
    }
    const companionText = (x)=>companion == null ? '' : companion.syntax === '<number>' ? `${round(companion.map(x), 5)}` : `${round(companion.map(x), 3)}px`;
    const isCustom = (channel)=>customProperty != null && channel === 'translate';
    const cssName = (channel)=>customProperty != null && channel === 'translate' ? customProperty.name : channel;
    const customUnit = customProperty?.syntax === '<number>' ? '' : 'px';
    const textOf = (channel, value)=>isCustom(channel) ? `${round(value('x'), customUnit === '' ? 5 : 3)}${customUnit}` : format(channel, value);
    /** A keyframe's properties for a channel: the companion rides x's. */ const frameOf = (channel, value)=>isCustom(channel) && companion != null ? {
            [cssName(channel)]: textOf(channel, value),
            [companion.name]: companionText(value('x'))
        } : {
            [cssName(channel)]: textOf(channel, value)
        };
    const identityOf = (channel)=>isCustom(channel) ? `0${customUnit}` : IDENTITY_TEXT[channel];
    // Reduced Motion reads the person's settings and nothing else: no option
    // overrides them (design:reduced-motion DR4). A theme that reduces motion
    // for everyone counts as the setting.
    const prefersReducedMotion = ()=>defaultPrefersReducedMotion() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeReducesMotion"])(target);
    const isCoarsePointer = defaultIsCoarsePointer;
    const resting = {
        ...IDENTITY,
        ...expand(options.initial ?? {})
    };
    const base = expand(options.base ?? {});
    const segments = new Map();
    const running = new Map();
    /** Drops a finished, still-filling animation once the main thread runs. */ const retireTimers = new Map();
    /**
   * Animations whose retire looks again at the next frame (scheduleRetire):
   * each its own, so one still waiting for a replaced animation does not
   * stand in for the next.
   */ const retireFrames = new Set();
    /** The timer that starts those looks a frame before a curve's end. */ const retireLooks = new Map();
    const touched = new Set();
    /**
   * The stylesheet's opacity a Reduce Motion dip borrowed because no call
   * owned opacity; the dip runs from and back to it, then hands it back.
   */ let borrowedOpacity = null;
    let target = null;
    /** Calls from rest whose start still waits for the browser's commit. */ const pendingGroups = new Set();
    /** atRest() calls still waiting; dispose settles them. */ const restWaits = new Set();
    /** A detach that settles as an unmount at the end of the task, unless an attach follows. */ let unmountQueued = false;
    /**
   * The node the latest attach(null) detached, while its unmount is pending:
   * a waiting Reduce Motion move lands there, so that node is left visible
   * where it was going.
   */ let lastDetached = null;
    /** Runs `write` with the pending unmount's node as the target. */ const onLastDetached = (write)=>{
        const current = target;
        target = target ?? lastDetached;
        try {
            write();
        } finally{
            target = current;
        }
    };
    /** The call being committed, when it starts from rest. */ let callGroup = null;
    /** The element reported to presentation.ts while translate moves. */ let presented = null;
    /**
   * The translate the engine hit-tests the element at while the compositor
   * moves it: where the animation started, or where a `resolve` left it.
   */ let hitTested = {
        x: 0,
        y: 0
    };
    let unpresent = null;
    /** Channels promoted to the element's compositing layer (will-change). */ const promoted = new Set();
    /** The element's own inline will-change, restored when promotion ends. */ let ownWillChange = null;
    /** The stylesheet's will-change when there is no inline value. */ let sheetWillChange = '';
    /**
   * Whether sheetWillChange holds a read of the element's current style: it
   * is read in the task after the element is attached, and again after each
   * demotion, so a promotion (a drag's first move) reads no style in its
   * own task.
   */ let sheetWillChangeRead = false;
    /** The pending read of sheetWillChange, cancelled with its element. */ let sheetReadTimer = null;
    /** The node whose promotion waits in sheetReads for its stylesheet. */ let sheetReadQueuedFor = null;
    let demoteTimer = null;
    /** A pseudo-element is promoted through a custom property on its host. */ const promotionProperty = pseudoElement == null ? null : `--astryx-motion-will-change-${pseudoElement.replace(/^:+/, '')}`;
    /** Channels whose identity the last node held inline (see `attach`). */ let heldIdentity = new Set();
    // -- reading the curves ---------------------------------------------------
    const segmentAt = (property, time)=>{
        const segment = segments.get(property);
        if (segment == null) {
            return null;
        }
        if (time >= endOf(property, segment)) {
            return null;
        }
        return segment;
    };
    /**
   * A curve whose call the browser has not started yet: still at its start
   * on screen (valueAt), already moving in the model (velocityAt).
   */ const isHeld = (segment)=>segment.group != null && !segment.group.resolved;
    /** The curve itself at `time`: what the keyframes play. */ const curveAt = (property, time)=>{
        const segment = segments.get(property);
        if (segment == null) {
            return resting[property];
        }
        if (time >= segment.start + segment.duration) {
            return segment.target;
        }
        return segment.at(Math.max(0, time - segment.start));
    };
    /**
   * A held curve's start once a frame dated its call, as the browser's start
   * moves it: by that frame's lead over the call's own time.
   */ const datedFromLatest = (segment, latest)=>latest == null || segment.group == null ? null : {
            latest,
            start: segment.start + latest - segment.group.provisional
        };
    /**
   * When a waiting curve's call had its first frame, which put the curve on
   * screen. Undefined for a curve that does not wait, or whose call has had
   * no first frame.
   */ const shownSince = (property, segment)=>segment.group?.resolved === false ? segment.group.latest?.get(CHANNEL_OF[property]) : undefined;
    /** A curve's end, dated from its call's first frame while it waits. */ const endOf = (property, segment)=>(datedFromLatest(segment, shownSince(property, segment))?.start ?? segment.start) + segment.duration;
    /**
   * Takes a curve on screen out of the call that still waits for the
   * browser's start. The curve keeps its course, dated from the call's first
   * frame. A call that has no channel left starts at that frame.
   */ const leaveWaitingCall = (segment, channel, latest)=>{
        const group = segment.group;
        if (group == null) {
            return;
        }
        const index = group.segments.indexOf(segment);
        if (index >= 0) {
            group.segments.splice(index, 1);
        }
        segment.start += latest - group.provisional;
        segment.group = undefined;
        if (!CHANNELS[channel].some((p)=>segments.get(p)?.group === group)) {
            group.latest?.delete(channel);
            group.channels.delete(channel);
        }
        if (group.channels.size === 0 && group.segments.length === 0) {
            resolveGroup(group, latest);
        }
    };
    /**
   * The value on screen at `time`. Until the browser reports its start, a
   * held curve shows its first value. A frame that ran without that start
   * dates the curve. Without that frame, a later time reads from the
   * provisional start, so a companion that samples ahead follows the curve's
   * shape.
   */ const valueAt = (property, time)=>{
        const segment = segments.get(property);
        if (segment != null && isHeld(segment)) {
            // The compositor starts the call near its first frame. The curve is
            // dated as the browser's start would date it. A curve that joined by an
            // older clock keeps its lead over the call's own time.
            const latest = segment.group?.latest?.get(CHANNEL_OF[property]);
            const dated = datedFromLatest(segment, latest);
            if (dated != null) {
                const elapsed = Math.max(time, dated.latest) - dated.start;
                return elapsed >= segment.duration ? segment.target : segment.at(elapsed);
            }
            // Nothing has moved on screen until the browser starts the call.
            if (time <= now()) {
                return segment.at(0);
            }
        }
        return curveAt(property, time);
    };
    /**
   * Whether a curve's tail already shows as at rest at `time`. Under a
   * starved main thread the browser commits a call late. A call that starts
   * at its own time then skips that far into its curve. One that starts at
   * the commit holds an element that hardly moves.
   */ const showsAtRest = (property, segment, time)=>Math.abs(valueAt(property, time) - segment.target) <= REST_DISTANCE_TOLERANCES * SAMPLE_TOLERANCE[property] && Math.abs(velocityAt(property, time)) <= SAMPLE_TOLERANCE[property] * REST_FRAMES_PER_SECOND;
    const velocityAt = (property, time)=>{
        const held = segments.get(property);
        if (held != null && isHeld(held)) {
            // Still at its start on screen, but moving in the model. A retarget
            // carries the velocity the curve has reached by now. So a flick whose
            // moves all land before the browser starts any keeps its speed. Past
            // its first frame, it reads from that frame, as its value does.
            const dated = datedFromLatest(held, held.group?.latest?.get(CHANNEL_OF[property]));
            return held.speed(Math.max(0, dated != null && time > dated.latest ? time - dated.start : time - held.start));
        }
        const segment = segmentAt(property, time);
        if (segment == null || time < segment.start) {
            return 0;
        }
        return segment.speed(time - segment.start);
    };
    // The curve just before a jump at absolute time `time`.
    const valueBefore = (property, time)=>curveAt(property, time - 1e-6);
    // -- writing --------------------------------------------------------------
    const finalValue = (property)=>segments.get(property)?.target ?? resting[property];
    /**
   * Where translate is drawn relative to where the translate animation
   * started, read live when a touch lands. iOS WebKit keeps the transform it
   * resolved when the animation went to the compositor (iOS 26.2: the
   * element's rect and its hit tests stay at the start for the whole curve,
   * while the computed style is live), until the animation is retired. A
   * segment whose start still waits for the browser's commit has painted
   * nothing of its curve yet.
   */ const drawnTranslate = (property, time)=>{
        const segment = segments.get(property);
        return segment?.group != null && !segment.group.resolved ? segment.at(0) : valueAt(property, time);
    };
    const presentedSource = {
        offset: (time = now())=>{
            syncPending();
            return {
                x: drawnTranslate('x', time) - hitTested.x,
                y: drawnTranslate('y', time) - hitTested.y
            };
        },
        resolve: ()=>{
            if (target == null) {
                return;
            }
            syncPending();
            const time = now();
            // Any style write makes WebKit resolve the element's transform again,
            // to the value drawn now, where it then stays (iOS 26.2: in the same
            // task); a custom property changes nothing else.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$presentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writePresentedResolve"])(target);
            hitTested = {
                x: drawnTranslate('x', time),
                y: drawnTranslate('y', time)
            };
        }
    };
    /** Reports the element while its translate moves (not a pseudo-element's). */ const present = (isMoving)=>{
        const element = isMoving && pseudoElement == null ? target : null;
        if (element === presented) {
            return;
        }
        unpresent?.();
        unpresent = null;
        if (presented instanceof HTMLElement) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$presentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearPresentedResolve"])(presented);
        }
        presented = element;
        if (element != null) {
            unpresent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$presentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerPresentedOffset"])(element, presentedSource);
        }
    };
    const writeInline = (channel, value, release = true)=>{
        if (target == null || pseudoElement != null) {
            return;
        }
        touched.add(channel);
        const text = isCustom(channel) ? textOf(channel, value) : inlineText(channel, value);
        // An unchanged value is not written: a style write invalidates the
        // element, and WebKit can repaint sticky content stale when that lands in
        // the frame a scroll commits.
        if (target.style.getPropertyValue(cssName(channel)) !== text) {
            target.style.setProperty(cssName(channel), text);
        }
        if (isCustom(channel) && companion != null) {
            const companionValue = companionText(value('x'));
            if (target.style.getPropertyValue(companion.name) !== companionValue) {
                target.style.setProperty(companion.name, companionValue);
            }
        }
        if (release && text === identityOf(channel)) {
            // Identity leaves the element when nothing else would move it.
            releaseIdentity(channel);
        }
    };
    /**
   * What identifies a channel's keyframes across calls of one task: each
   * moving property's curve object, offset and length, and each other
   * property's rest value. Null when a moving property has no shared curve
   * (a spring, a rebase, a jump).
   */ const taskBakeKey = (channel, moving, from, end, devicePixel)=>{
        const key = [
            channel,
            end - from,
            devicePixel
        ];
        for (const property of CHANNELS[channel]){
            const segment = segments.get(property);
            if (!moving.includes(property)) {
                key.push(property, resting[property]);
            } else if (segment?.source != null && segment.jumps.length === 0) {
                key.push(property, segment.source, segment.start - from);
                key.push(segment.duration);
            } else {
                return null;
            }
        }
        return key;
    };
    /** `sampleTimes`, shared by the calls of a task that play one curve. */ const sharedSampleTimes = (property, from, end, tolerance)=>{
        const segment = segments.get(property);
        if (segment?.source == null || segment.jumps.length > 0) {
            return sampleTimes(property, from, end, tolerance);
        }
        const key = [
            segment.source,
            segment.start - from,
            segment.duration,
            end - from,
            tolerance
        ];
        const { times } = bakesOfTask();
        const known = times.find((entry)=>isSameKey(entry.key, key));
        if (known != null) {
            return known.times.map((t)=>t + from);
        }
        const sampled = sampleTimes(property, from, end, tolerance);
        times.push({
            key,
            times: sampled.map((t)=>t - from)
        });
        return sampled;
    };
    const sampleTimes = (property, from, to, tolerance)=>{
        const segment = segments.get(property);
        if (segment == null) {
            return [];
        }
        const begin = Math.max(from, segment.start);
        const end = Math.min(to, segment.start + segment.duration);
        if (end <= begin) {
            return [];
        }
        const times = [
            begin
        ];
        const value = (t)=>curveAt(property, t);
        const breaks = segment.jumps.map((j)=>segment.start + j).filter((t)=>t > begin && t < end);
        const edges = [
            begin,
            ...breaks,
            end
        ];
        for(let e = 0; e + 1 < edges.length; e++){
            const a = edges[e];
            const b = edges[e + 1];
            // A 30 Hz grid, each interval split until the chord is within the
            // tolerance at its quarter points.
            const steps = Math.max(1, Math.ceil((b - a) / SAMPLE_GRID_MS));
            const split = (t0, t1, depth)=>{
                const v0 = value(t0);
                const v1 = t1 === b && breaks.includes(b) ? valueBefore(property, b) : value(t1);
                let worst = 0;
                for (const f of [
                    0.25,
                    0.5,
                    0.75
                ]){
                    const t = t0 + (t1 - t0) * f;
                    worst = Math.max(worst, Math.abs(value(t) - (v0 + (v1 - v0) * f)));
                }
                if (worst > tolerance && depth < 10 && t1 - t0 > 0.25) {
                    const mid = (t0 + t1) / 2;
                    split(t0, mid, depth + 1);
                    split(mid, t1, depth + 1);
                } else {
                    times.push(t1);
                }
            };
            for(let i = 0; i < steps; i++){
                split(a + (b - a) * i / steps, a + (b - a) * (i + 1) / steps, 0);
            }
        }
        return times;
    };
    /**
   * Whether the pseudo-element's stylesheet shows the channel's resting
   * value: its base, to within the sampling tolerance, which no frame shows.
   * A curve that settles to a threshold ends that close to its target.
   */ const atBase = (channel)=>CHANNELS[channel].every((property)=>{
            const value = base[property];
            return value != null && Math.abs(finalValue(property) - value) <= SAMPLE_TOLERANCE[property];
        });
    let baseChecked = false;
    /**
   * The first hold dropped at `base` checks, in development, that the
   * stylesheet shows it. It reads after the cancel and off the motion's task,
   * so it adds no style read to a frame that starts a motion.
   */ const checkBase = (channel)=>{
        if (("TURBOPACK compile-time value", "development") === 'production' || baseChecked) {
            return;
        }
        baseChecked = true;
        setTimeout(()=>{
            if (target == null) {
                return;
            }
            const shown = getComputedStyle(target, pseudoElement).getPropertyValue(channel);
            const expected = format(channel, (p)=>base[p] ?? IDENTITY[p]);
            if (!sameShown(channel, shown, expected)) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["devWarn"])('Astryx motion', `the ${pseudoElement} stylesheet shows ${channel} ` + `${shown || '(unset)'}, not its declared base ${expected}, so ` + 'it shows the wrong value at rest. Make `base` match the ' + 'stylesheet.');
            }
        }, 0);
    };
    /**
   * A pseudo-element's resting value, held by a static filling animation,
   * unless its stylesheet shows it (`base`).
   */ const hold = (channel, time)=>{
        if (target == null) {
            return;
        }
        if (atBase(channel)) {
            checkBase(channel);
            return;
        }
        const value = format(channel, finalValue);
        const animation = target.animate([
            {
                [channel]: value
            },
            {
                [channel]: value
            }
        ], {
            duration: 1,
            fill: 'both',
            pseudoElement
        });
        animation.startTime = time;
        running.set(channel, animation);
    };
    const replaceIn = (group, segment, next)=>{
        const index = group.segments.indexOf(segment);
        if (index >= 0) {
            group.segments[index] = next;
        } else {
            group.segments.push(next);
        }
    };
    /**
   * Channels whose model a rebase moved while their animation still shows
   * the old curve. Any rebuild clears its channel; the end of the task
   * rebuilds the rest, so a frame never shows the old curve at the new rest.
   */ const stale = new Set();
    let healQueued = false;
    const markStale = (channel)=>{
        stale.add(channel);
        if (!healQueued) {
            healQueued = true;
            queueMicrotask(healStale);
        }
    };
    const healStale = ()=>{
        healQueued = false;
        if (stale.size === 0) {
            return;
        }
        // A waiting channel rebuilds at the frame that commits its call.
        const properties = [
            ...stale
        ].filter((channel)=>!heldForFrame.has(channel)).flatMap((channel)=>CHANNELS[channel]);
        stale.clear();
        commit(properties, now());
    };
    const rebuild = (channel, time)=>{
        commitWaitingNow(channel);
        stale.delete(channel);
        const previous = running.get(channel);
        running.delete(channel);
        clearTimeout(retireTimers.get(channel));
        retireTimers.delete(channel);
        clearTimeout(retireLooks.get(channel));
        retireLooks.delete(channel);
        // An element's inline style takes the value on screen below, so its old
        // animation can go first. A pseudo-element has none: its old animation
        // keeps holding the value until the new one exists (same task, no frame in
        // between).
        if (pseudoElement == null) {
            previous?.cancel();
        }
        const properties = CHANNELS[channel];
        // Settled curves become resting values.
        for (const property of properties){
            const segment = segments.get(property);
            if (segment != null && time >= endOf(property, segment)) {
                resting[property] = segment.target;
                segments.delete(property);
            }
        }
        const moving = properties.filter((p)=>segments.has(p));
        if (callGroup == null) {
            // A call that starts now rebuilds a channel the compositor has moving
            // since a first frame without a known start. The channel carries on
            // from that frame, with a start of its own, instead of starting its
            // curve again.
            for (const property of moving){
                const segment = segments.get(property);
                const latest = shownSince(property, segment);
                if (latest != null) {
                    leaveWaitingCall(segment, channel, latest);
                }
            }
        }
        // An explicit call can rebuild a channel while one of its curves still
        // waits for the browser's start. The animation then joins the current
        // call, or else that waiting call, with no start of its own.
        const waiting = callGroup ?? moving.map((p)=>segments.get(p).group).find((group)=>group != null && !group.resolved) ?? null;
        const rebuiltAfterFirstFrame = waiting?.framed === true;
        // The new animation starts at the frame that commits it, from its first
        // keyframe. That holds for a waiting call it joins after that call's
        // first frame, and for every waiting call it takes a curve from. So this
        // channel's reads below, and until that frame, take that first value.
        const restarted = new Set();
        if (rebuiltAfterFirstFrame) {
            restarted.add(waiting);
        }
        if (callGroup != null) {
            for (const property of moving){
                const group = segments.get(property).group;
                if (group != null && group !== callGroup && !group.resolved) {
                    restarted.add(group);
                }
            }
        }
        for (const group of restarted){
            group.latest?.delete(channel);
        }
        if (channel === 'translate' && !isCustom(channel)) {
            // The animation built below starts from the value at `time` (its first
            // keyframe); a rebase or a retarget builds a new one, so a new start.
            hitTested = {
                x: valueAt('x', time),
                y: valueAt('y', time)
            };
            present(moving.length > 0 && target != null && typeof target.animate === 'function');
        }
        if (moving.length === 0 || target == null || typeof target.animate !== 'function') {
            writeInline(channel, finalValue);
        } else {
            // The value on screen as the curve starts: what a frame painted before
            // the compositor has the curve shows. The end is written at retire.
            writeInline(channel, (p)=>valueAt(p, time));
        }
        if (target == null || typeof target.animate !== 'function') {
            previous?.cancel();
            return;
        }
        if (moving.length === 0) {
            if (pseudoElement != null) {
                hold(channel, time);
            }
            previous?.cancel();
            return;
        }
        // The keyframes start where the animation will: at the waiting call's
        // own time, which its start moves to the browser's (resolveGroup), so a
        // write later in the task keeps the screen on the model's clock.
        const from = waiting?.provisional ?? time;
        const end = Math.min(from + MAX_DURATION_MS, Math.max(...moving.map((p)=>segments.get(p).start + segments.get(p).duration)));
        if (end <= from) {
            if (pseudoElement != null) {
                hold(channel, time);
            }
            previous?.cancel();
            return;
        }
        if (callGroup != null) {
            // A curve of an earlier call still waiting for its first frame is
            // rebaked here: it starts with this call's commit.
            for (const property of moving){
                const segment = segments.get(property);
                const group = segment.group;
                if (group != null && group !== callGroup && !group.resolved) {
                    const index = group.segments.indexOf(segment);
                    if (index >= 0) {
                        group.segments.splice(index, 1);
                    }
                    group.adoptedBy = callGroup;
                    segment.group = callGroup;
                    // Re-dated to this call's time: it starts at the commit too, not
                    // the work between the two calls into its curve.
                    segment.start += callGroup.provisional - group.provisional;
                    callGroup.segments.push(segment);
                }
            }
        }
        // Read where the keyframes are baked: a page moved to another screen
        // bakes its next motion for that screen.
        const devicePixel = 1 / Math.max(1, globalThis.devicePixelRatio || 1);
        // An earlier call of this task that played the same curves from the same
        // offset, over the same rest values, baked these keyframes already.
        // A custom property's keyframes write its own properties, so they are
        // never shared with another call's.
        const bakeKey = pseudoElement == null && !isCustom(channel) ? taskBakeKey(channel, moving, from, end, devicePixel) : null;
        const baked = bakeKey == null ? undefined : bakesOfTask().keyframes.find((bake)=>isSameKey(bake.key, bakeKey));
        const collect = (scale)=>{
            const times = new Set([
                from,
                end
            ]);
            for (const property of moving){
                const tolerance = SAMPLE_TOLERANCE[property] * scale * (property === 'x' || property === 'y' ? devicePixel : 1);
                for (const t of sharedSampleTimes(property, from, end, tolerance)){
                    times.add(t);
                }
            }
            return times;
        };
        const span = end - from + END_HOLD_MS;
        const bakeKeyframes = ()=>{
            let scale = 1;
            let all = collect(scale);
            while(all.size > MAX_KEYFRAMES && scale < 64){
                scale *= 2;
                all = collect(scale);
            }
            // Jumps become two keyframes at one offset: the value just before,
            // then the value after. A jump on the last frame (fade out, then move)
            // too.
            const jumpTimes = new Set();
            for (const property of moving){
                const segment = segments.get(property);
                for (const j of segment.jumps){
                    const t = segment.start + j;
                    if (t > from && t <= end) {
                        jumpTimes.add(t);
                        all.add(t);
                    }
                }
            }
            const times = [
                ...all
            ].sort((a, b)=>a - b);
            const frames = [];
            for (const t of times){
                const offset = (t - from) / span;
                if (jumpTimes.has(t)) {
                    frames.push({
                        offset,
                        ...frameOf(channel, (p)=>valueBefore(p, t))
                    });
                }
                frames.push({
                    offset,
                    ...frameOf(channel, (p)=>t >= end ? finalValue(p) : curveAt(p, t))
                });
            }
            frames.push({
                offset: 1,
                ...frameOf(channel, finalValue)
            });
            return frames;
        };
        const keyframes = baked?.keyframes ?? bakeKeyframes();
        // A custom property animates on the main thread: nothing to promote.
        if (!isCustom(channel)) {
            promote(channel);
        }
        const animation = baked != null && isCopyable(baked.effect) ? copyAnimation(baked.effect, target) : target.animate(keyframes, {
            duration: span,
            // The last keyframes hold the end state (END_HOLD_MS); filling both
            // ways also keeps it where an engine honors the fill on its compositor.
            // The main thread retires the animation once it runs after the end,
            // writing the end inline in that task, so that changes no pixel.
            fill: 'both',
            easing: 'linear',
            ...pseudoElement != null ? {
                pseudoElement
            } : {}
        });
        if (bakeKey != null && baked == null) {
            bakesOfTask().keyframes.push({
                key: bakeKey,
                keyframes,
                effect: animation.effect
            });
        }
        if (waiting != null) {
            // From rest: no start time, so the browser starts the animation when
            // it commits it (StartGroup); the keyframes are sampled from `from`,
            // the call's own start.
            waiting.animations.push(animation);
            waiting.channels.add(channel);
            // A cancel before the first frame rejects its ready promise.
            animation.ready?.catch(()=>{});
            if (rebuiltAfterFirstFrame) {
                // The frame that commits it dates this channel's start again. The
                // call's other channels keep their own.
                requestFrame?.((frame)=>{
                    if (!waiting.resolved && running.get(channel) === animation && animation.startTime == null && animation.playState === 'running') {
                        (waiting.latest ??= new Map()).set(channel, frameTime(frame, now));
                    }
                });
            }
        } else {
            // One clock: the keyframes were sampled from `time`.
            animation.startTime = time;
        }
        running.set(channel, animation);
        previous?.cancel();
        scheduleRetire(channel, animation, end);
    };
    /**
   * Once the main thread runs after the curve's end, the animation leaves the
   * running state: an element's end values are written inline in the task
   * that cancels it; a pseudo-element's end value moves to a static holding
   * animation, created before the long one goes.
   *
   * Why a timer at the curve's end: no browser event reports that an
   * animation's time has reached a point inside its effect, and its
   * `finished` comes only after the END_HOLD_MS tail, which would keep the
   * element promoted and the animation alive for a minute. The timer is set
   * on the curve's own clock and re-armed while a sampler pauses or seeks the
   * animation, so it never retires a held one.
   */ const scheduleRetire = (channel, animation, end)=>{
        clearTimeout(retireTimers.get(channel));
        retireTimers.delete(channel);
        clearTimeout(retireLooks.get(channel));
        retireLooks.delete(channel);
        // Looks for the end in the next frame, before it paints: the frame whose
        // time reaches the curve's end retires it there, where a timer could land
        // between two frames under load and leave it on the element a frame or two
        // past its curve. The timers stay, for a page that draws no frames (a
        // hidden tab).
        const lookAtFrame = ()=>{
            if (requestFrame == null || retireFrames.has(animation)) {
                return;
            }
            retireFrames.add(animation);
            requestFrame(()=>{
                retireFrames.delete(animation);
                retire(true);
            });
        };
        // `atFrame`: a look from a frame callback, which leaves a pending timer
        // where it is.
        const retire = (atFrame = false)=>{
            if (!atFrame) {
                retireTimers.delete(channel);
            }
            if (running.get(channel) !== animation) {
                return;
            }
            // The old curve plays on until the frame that commits the call
            // (lookAtShown).
            if (heldForFrame.has(channel)) {
                if (!retireTimers.has(channel)) {
                    retireTimers.set(channel, setTimeout(retire, END_RECHECK_MS));
                }
                return;
            }
            // Paused or sought (a sampler holding it): retire when its own time
            // reaches the curve's end, never from the wall clock.
            const remaining = remainingCurve(animation);
            if (atFrame && remaining == null) {
                // Its time cannot be read: the timer decides.
                return;
            }
            if (remaining != null && remaining > 0) {
                const paused = animation.playState === 'paused';
                // A frame look keeps looking while up to two frames remain: the frame
                // it ran in can be dated before the timer that started the looks was
                // due, and the frame after it is the one that reaches the end.
                if (!paused && remaining <= (atFrame ? 2 : 1) * END_RECHECK_MS) {
                    lookAtFrame();
                }
                if (!retireTimers.has(channel)) {
                    retireTimers.set(channel, setTimeout(retire, paused ? RETIRE_RECHECK_MS : Math.max(remaining, END_RECHECK_MS)));
                }
                return;
            }
            clearTimeout(retireTimers.get(channel));
            retireTimers.delete(channel);
            running.delete(channel);
            if (channel === 'translate') {
                present(false);
            }
            // A pseudo-element holds its resting value, unless the stylesheet
            // takes it back now (a borrowed dip that has ended).
            const handsBack = channel === 'opacity' && borrowedOpacity != null && ![
                ...landings
            ].some((landing)=>landing.fadeIn?.isBorrowed === true);
            if (pseudoElement != null && !handsBack) {
                hold(channel, now());
            } else {
                // The end goes inline in the task that cancels the animation. Whether
                // an identity end may leave the element is judged after the cancel:
                // until then the end-state tail still holds the end, so the computed
                // style would hide a stylesheet value (an opacity 0) under it.
                writeInline(channel, finalValue, false);
            }
            // A call from rest the browser never started (finished from outside
            // before its first frame, a sampler's finish()): read its start from the
            // animation before the cancel takes it, and with nothing left to wait
            // on the call keeps its own clock, so its landing is still armed.
            const waiting = [
                ...pendingGroups
            ].filter((group)=>group.animations.includes(animation));
            for (const group of waiting){
                syncGroup(group);
            }
            animation.cancel();
            for (const group of waiting){
                resolveGroup(group, group.provisional);
            }
            releaseIdentity(channel);
            flushReleases();
        };
        retireTimers.set(channel, setTimeout(retire, Math.max(0, end - now())));
        if (requestFrame != null) {
            // Frames start looking a frame before the end, so the frame that
            // reaches it retires it even when the timer above runs late.
            retireLooks.set(channel, setTimeout(()=>{
                retireLooks.delete(channel);
                lookAtFrame();
            }, Math.max(0, end - now() - END_RECHECK_MS)));
        }
    };
    /** The element's own (stylesheet) opacity, read once when a dip starts. */ const ownOpacity = ()=>{
        const view = target?.ownerDocument.defaultView;
        const value = target == null ? NaN : Number.parseFloat(view?.getComputedStyle(target, pseudoElement ?? null).getPropertyValue('opacity') ?? '');
        return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 1;
    };
    /**
   * Whether the animator holds an opacity of its own on the element: an inline
   * value it wrote, or a pseudo-element's holding animation (a `set` over a
   * stylesheet that hides or dims it). A dip returns to that value.
   */ const writesOwnOpacity = ()=>pseudoElement == null ? (target?.style.getPropertyValue('opacity') ?? '') !== '' : running.has('opacity');
    /**
   * Gives the element's opacity back to its stylesheet: an element's inline
   * value goes; a pseudo-element, which has no inline style, loses the
   * animation holding its value.
   */ const releaseOwnOpacity = ()=>{
        if (pseudoElement == null) {
            target?.style.removeProperty('opacity');
            return;
        }
        const held = running.get('opacity');
        running.delete('opacity');
        held?.cancel();
    };
    /**
   * Lands every Reduce Motion move still waiting, at once, on the current
   * element: its travel, and the opacity its fade was heading to (the
   * stylesheet's again for a borrowed one). Its calls settle `finished`.
   */ const landPending = (finished)=>{
        if (landings.size === 0) {
            return;
        }
        const changed = new Set();
        let handedBack = false;
        for (const landing of [
            ...landings
        ]){
            endLanding(landing);
            for (const [property, value] of landing.values){
                segments.delete(property);
                resting[property] = value;
                changed.add(property);
            }
            if (landing.fadeIn != null || landing.restore != null) {
                const borrowed = landing.fadeIn?.isBorrowed === true || landing.restoreIsBorrowed === true;
                segments.delete('opacity');
                resting.opacity = borrowed ? IDENTITY.opacity : landing.fadeIn?.to ?? landing.restore ?? IDENTITY.opacity;
                changed.add('opacity');
                if (borrowed) {
                    borrowedOpacity = null;
                    handedBack = true;
                }
            }
            for (const owner of [
                landing.owner,
                ...landing.carried
            ]){
                carriedOwners.delete(owner);
                if (!owner.settled) {
                    settle(owner, finished);
                }
            }
        }
        commit(changed, now());
        if (handedBack) {
            // The stylesheet owns its opacity again: no value stays inline.
            releaseOwnOpacity();
        }
    };
    /**
   * Ends a borrowed dip on the element it ran on: the stylesheet owns its
   * opacity again (an unmount or a new element never keeps the borrow).
   */ const handBackBorrow = ()=>{
        if (borrowedOpacity == null) {
            return;
        }
        borrowedOpacity = null;
        segments.delete('opacity');
        resting.opacity = IDENTITY.opacity;
        releaseOwnOpacity();
    };
    /**
   * A channel at identity with no animation of its own leaves the element:
   * its inline value is removed, unless the stylesheet would then move the
   * element, in which case the identity stays inline. Runs when such a value
   * is written and again when a motion ends.
   */ const releaseIdentity = (channel)=>{
        if (target == null || running.has(channel)) {
            return;
        }
        if (channel === 'opacity' && borrowedOpacity != null) {
            if ([
                ...landings
            ].some((landing)=>landing.fadeIn?.isBorrowed === true)) {
                // At the bottom of the dip, before it lands and fades back in.
                return;
            }
            // A dip on the stylesheet's opacity ended: the stylesheet owns it again.
            borrowedOpacity = null;
            segments.delete('opacity');
            resting.opacity = IDENTITY.opacity;
            releaseOwnOpacity();
            return;
        }
        if (pseudoElement != null) {
            return;
        }
        if (target.style.getPropertyValue(cssName(channel)) !== identityOf(channel)) {
            return;
        }
        // Read with every other channel the same commit leaves at identity: one
        // style read for the element, not one per channel (flushReleases).
        releasing.add(channel);
        if (!releaseQueued) {
            releaseQueued = true;
            queueMicrotask(flushReleases);
        }
    };
    /** Channels left at identity whose stylesheet value is still to be read. */ const releasing = new Set();
    let releaseQueued = false;
    /**
   * Removes the identity values written since the last flush, reads the
   * stylesheet once for all of them, and puts back the ones it would move:
   * a single forced style read per element and commit, where a read per
   * channel used to force one each.
   */ const flushReleases = ()=>{
        releaseQueued = false;
        const element = target;
        const channels = [
            ...releasing
        ].filter((channel)=>!running.has(channel) && element?.style.getPropertyValue(cssName(channel)) === identityOf(channel));
        releasing.clear();
        if (element == null || channels.length === 0) {
            return;
        }
        for (const channel of channels){
            element.style.removeProperty(cssName(channel));
        }
        const style = element.ownerDocument.defaultView?.getComputedStyle(element);
        for (const channel of channels){
            const underneath = style?.getPropertyValue(cssName(channel));
            if (underneath != null && !isIdentityText(channel, underneath)) {
                element.style.setProperty(cssName(channel), identityOf(channel));
            }
        }
    };
    /**
   * Curve time an animation still has to play on its own clock (its keyframes
   * hold the end for END_HOLD_MS after the curve), or null where the engine
   * does not report it; a paused animation always has some left.
   */ const remainingCurve = (animation)=>{
        const timing = animation.effect?.getTiming?.();
        const current = animation.currentTime;
        if (timing == null || current == null) {
            return animation.playState === 'paused' ? Infinity : null;
        }
        const left = Number(timing.duration) - END_HOLD_MS - Number(current);
        return animation.playState === 'paused' ? Math.max(left, 1) : left;
    };
    // -- promotion -------------------------------------------------------------
    /** Writes the promoted channels as will-change (or the pseudo's property). */ const writePromotion = (element)=>{
        const list = [
            ...promoted
        ].join(', ');
        if (promotionProperty != null) {
            if (list === '') {
                element.style.removeProperty(promotionProperty);
            } else {
                element.style.setProperty(promotionProperty, list);
            }
            return;
        }
        if (list === '') {
            element.style.willChange = ownWillChange ?? '';
            ownWillChange = null;
            return;
        }
        if (ownWillChange == null) {
            ownWillChange = element.style.willChange;
        }
        // Without an inline value, the stylesheet's reasons stay alongside the
        // promotion's. They were read in the task after the element was attached.
        // A promotion that comes first (an element attached in this task that
        // moves at once) is written now. Its reasons join it once the callback's
        // microtasks run (queueSheetRead).
        if (ownWillChange === '' && !sheetWillChangeRead) {
            element.style.willChange = [
                ...promoted
            ].join(', ');
            queueSheetReadFor(element);
            return;
        }
        const base = ownWillChange !== '' ? ownWillChange : sheetWillChange;
        const own = base === 'auto' ? '' : base;
        const reasons = own.split(',').map((reason)=>reason.trim()).filter((reason)=>reason !== '' && !promoted.has(reason));
        element.style.willChange = [
            ...reasons,
            ...promoted
        ].join(', ');
    };
    /** Reads the element's own will-change while no promotion of ours is written. */ const readSheetWillChange = (element)=>{
        sheetWillChange = element.ownerDocument.defaultView?.getComputedStyle(element).getPropertyValue('will-change') ?? '';
        sheetWillChangeRead = true;
    };
    /** Joins the stylesheet's reasons to a promotion once the callback ends. */ const queueSheetReadFor = (element)=>{
        if (sheetReadQueuedFor === element) {
            return;
        }
        sheetReadQueuedFor = element;
        // Still waiting: the same node, still promoted, with no inline reason.
        const waits = ()=>sheetReadQueuedFor === element && target === element && promoted.size > 0 && ownWillChange === '';
        queueSheetRead({
            lift: ()=>{
                if (waits()) {
                    element.style.willChange = '';
                }
            },
            read: ()=>{
                if (waits()) {
                    readSheetWillChange(element);
                }
            },
            write: ()=>{
                if (sheetReadQueuedFor !== element) {
                    return;
                }
                sheetReadQueuedFor = null;
                if (target === element && promoted.size > 0) {
                    writePromotion(element);
                }
            }
        });
    };
    /**
   * Reads sheetWillChange in a task of its own, so a later promotion reads no
   * style in its own task. Skipped while a promotion of ours is written,
   * which the read would see (demote asks again), and for a node out of the
   * document. A pseudo-element's promotion is its own property, with
   * nothing to read.
   */ const readSheetWillChangeLater = ()=>{
        cancelSheetWillChangeRead();
        sheetWillChangeRead = false;
        if (target == null || promotionProperty != null) {
            return;
        }
        const element = target;
        sheetReadTimer = setTimeout(()=>{
            sheetReadTimer = null;
            // A node out of the document has no style to read, and reading one
            // still costs a style pass: a shared animator (animatorFor) is never
            // detached, so its node can leave with this read waiting. Skipped, the
            // read waits for a promotion that needs it.
            if (target === element && promoted.size === 0 && element.isConnected) {
                readSheetWillChange(element);
            }
        }, 0);
    };
    const cancelSheetWillChangeRead = ()=>{
        if (sheetReadTimer != null) {
            clearTimeout(sheetReadTimer);
            sheetReadTimer = null;
        }
    };
    /**
   * Gives the element (or its pseudo-element) a compositing layer for
   * `channel` from the task that starts the motion: Mobile Safari runs an
   * animation whose start time is set from script on its compositor at its
   * first commit only if the element already has a layer.
   */ const promote = (channel)=>{
        if (target == null) {
            return;
        }
        if (!promoted.has(channel)) {
            promoted.add(channel);
            writePromotion(target);
        }
        scheduleDemote();
    };
    /** Ends promotion PROMOTION_LINGER_MS after the last motion ends. */ const scheduleDemote = ()=>{
        if (demoteTimer != null) {
            clearTimeout(demoteTimer);
        }
        let end = now();
        for (const segment of segments.values()){
            end = Math.max(end, segment.start + segment.duration);
        }
        demoteTimer = setTimeout(()=>{
            demoteTimer = null;
            const time = now();
            const moving = [
                ...segments.values()
            ].some((segment)=>time < segment.start + segment.duration);
            if (moving || pendingGroups.size > 0) {
                scheduleDemote();
                return;
            }
            demote();
        }, Math.max(0, end - now()) + PROMOTION_LINGER_MS);
    };
    const demote = ()=>{
        if (demoteTimer != null) {
            clearTimeout(demoteTimer);
            demoteTimer = null;
        }
        if (promoted.size === 0) {
            return;
        }
        promoted.clear();
        if (target != null) {
            writePromotion(target);
            // Its stylesheet may have changed its will-change since.
            readSheetWillChangeLater();
        }
    };
    // -- starting from rest ---------------------------------------------------
    /**
   * A call starts from rest when nothing on the channels it drives moves on
   * screen and nothing pins its clock (`at`). A curve still waiting for its
   * first frame counts as rest, as does one whose tail already shows as at
   * rest. Returns its start group, or null for an explicit start.
   */ const beginGroup = (time, properties, at, start)=>{
        if (target == null || typeof target.animate !== 'function') {
            return null;
        }
        const channels = new Set();
        for (const property of properties){
            channels.add(CHANNEL_OF[property]);
        }
        if (at != null) {
            // An explicit clock is the caller's, except a clock no later than a
            // call from rest on these channels still waiting for the browser's
            // start (an event timestamp, such as a drop's, for the reorder that
            // rebases it): the new call joins that call, and the browser's start
            // moves both. A later clock is a later call, often a frame or more
            // later while the browser has not started the first: it keeps its own
            // clock, since joining would sample its curve from the earlier call's
            // time and hold its first value for the gap.
            for (const channel of channels){
                for (const property of CHANNELS[channel]){
                    const group = segments.get(property)?.group;
                    if (group != null && !group.resolved && at <= group.provisional) {
                        return group;
                    }
                }
            }
            return null;
        }
        // A call that continues motion keeps its call's clock, unless it asks
        // for the browser's start (`commit`). `presented` asks only for a call
        // from rest. A curve that still moves is not at rest, so a call on it
        // continues from the value and velocity on screen. A tail that shows as
        // at rest counts as rest, so a call on it waits, under `presented` for
        // its two frames.
        for (const channel of start === 'commit' ? [] : channels){
            for (const property of CHANNELS[channel]){
                const segment = segments.get(property);
                // A call's first frame puts its channels on screen, even before the
                // browser reports the start. So such a channel is not at rest either.
                if (segment != null && time < endOf(property, segment) && (segment.group == null || segment.group.resolved || shownSince(property, segment) != null) && !showsAtRest(property, segment, time)) {
                    return null;
                }
            }
        }
        let resolve = ()=>{};
        const started = new Promise((r)=>{
            resolve = r;
        });
        return {
            provisional: time,
            fresh: false,
            segments: [],
            animations: [],
            channels: new Set(),
            resolved: false,
            resolve,
            started
        };
    };
    /** Commits a call's changes, from rest when it has a start group. */ const commitCall = (group, owner, changed, time, presented = false, waitsForFrame = false)=>{
        if (group != null) {
            for (const property of changed){
                const segment = segments.get(property);
                if (segment != null && segment.owner === owner) {
                    segment.group = group;
                    group.segments.push(segment);
                }
            }
        }
        if (presented && group != null && requestFrame != null) {
            // At rest until then: the animations, and the layer they promote, come
            // two frames later. Promoting now, a layer at rest for two frames, left
            // a stale paint of the element's rest in WebKit on iOS 26.2 (a title in
            // a scroller inside a clipped card) after the motion ended.
            // Each call waits its own two frames: one queued after another change
            // flushed the queue, or after an earlier call's first frame, still
            // waits its two.
            const call = {
                group,
                changed
            };
            deferredCalls.push(call);
            requestFrame(()=>requestFrame(()=>flushDeferredThrough(call)));
            return;
        }
        if (group == null && waitsForFrame) {
            deferRebuild(changed, time);
            return;
        }
        startCall(group, changed, time);
    };
    /** Calls with `start: 'presented'` waiting for their second frame. */ const deferredCalls = [];
    /** Creates the animations of the given waiting calls, in call order. */ const startDeferred = (calls)=>{
        for (const { group, changed } of calls){
            // Not a channel that holds the curve of a later call still waiting: a
            // later presented call that took a property over starts that channel
            // with its own two frames. Every other property starts here, whatever
            // its segment's group: a value Reduce Motion writes at once, or lands
            // under a dip, has no curve of this call's.
            const own = [];
            let handedTo = null;
            for (const property of changed){
                const holder = CHANNELS[CHANNEL_OF[property]].map((other)=>segments.get(other)?.group).find((waiting)=>waiting != null && waiting !== group && deferredCalls.some((call)=>call.group === waiting));
                if (holder == null) {
                    own.push(property);
                    continue;
                }
                // A curve of this call's in that channel never ran: the element held
                // it at its start. It starts with the later call, which creates the
                // channel, dated from that call's start, so the model reads what the
                // screen shows.
                const segment = segments.get(property);
                if (segment != null && segment.group === group) {
                    segment.start += holder.provisional - group.provisional;
                    segment.group = holder;
                    holder.segments.push(segment);
                    group.segments.splice(group.segments.indexOf(segment), 1);
                    handedTo = holder;
                }
            }
            if (own.length === 0 && handedTo != null) {
                // Everything this call still plays starts with the later call.
                const adopter = handedTo;
                group.adoptedBy = adopter;
                void adopter.started.then((start)=>resolveGroup(group, start));
                continue;
            }
            // From the call's own time: the curve starts at the browser's commit.
            startCall(group, own, group.provisional);
        }
    };
    /** Creates the animations of every waiting call, in call order. */ const flushDeferred = ()=>{
        startDeferred(deferredCalls.splice(0));
    };
    /**
   * A call's second frame: it starts, with every call queued before it (in
   * call order), unless another change created it already.
   */ const flushDeferredThrough = (call)=>{
        const index = deferredCalls.indexOf(call);
        if (index >= 0) {
            startDeferred(deferredCalls.splice(0, index + 1));
        }
    };
    const startCall = (group, changed, time)=>{
        callGroup = group;
        try {
            commit(changed, time);
        } finally{
            callGroup = null;
        }
        if (group == null) {
            return;
        }
        if (group.animations.length === 0) {
            resolveGroup(group, group.provisional); // nothing to start
            return;
        }
        pendingGroups.add(group);
        group.fresh = true;
        // The task that creates the animations, not the call's: a presented
        // call's is its second frame's callback, wherever in its frame the call
        // was made.
        group.task = markTask(now(), now);
        // The call's `start: 'next-frame'` marks its task, so the calls made
        // before the task's first microtask move together. A call after it opens
        // a new mark.
        if (group.nextFrame === true) {
            group.task.nextFrame = true;
        }
        group.madeInFrame = frameDepth > 0;
        queueMicrotask(()=>{
            group.fresh = false;
        });
        for (const animation of group.animations){
            // A cancel before the first frame rejects each one's ready promise.
            animation.ready?.catch(()=>{});
        }
        const ready = group.animations[0].ready;
        if (ready == null || typeof ready.then !== 'function') {
            resolveGroup(group, group.provisional); // no pending start to wait for
            return;
        }
        // The browser sets the start: at the frame that commits the animations,
        // or when its compositor starts them (Chromium). Read it in that first
        // frame, ahead of anything that might pause or seek the animations, and
        // when `ready` settles.
        requestFrame?.((frame)=>{
            syncGroup(group);
            group.framed = true;
            // Chromium's compositor starts a composited animation when the frame
            // that commits it reaches it, and tells the page that start a frame or
            // more later (longer under load). Until then the call would read as
            // not started while the screen moves it, and a retarget or a rebase
            // would replay its curve from the start. A call made in a task, still
            // waiting in the first frame after it, starts when this frame runs. The
            // compositor takes that time as its start. All calls the frame commits
            // take one read of it (frameTime). That read is not the frame timestamp,
            // which after a block is the frame time from before the block. Only
            // when this frame is the one that commits it: not for a call made in a
            // frame callback, whose frame committed it already, nor when a block
            // ran between the call and this frame (more than LATE_START_MS), after
            // which this frame cannot tell a call made in a task from one a page's
            // own frame callback made; those keep the browser's start.
            if (group.resolved) {
                return;
            }
            const at = frameTime(frame, now);
            if (group.madeInFrame !== true && (// A call made in an input event's own task says so with
            // `start: 'next-frame'`. This frame commits such a call however
            // late it comes. A later listener's block then holds the motion
            // back instead of skipping into it.
            group.task?.nextFrame === true || at - (group.task?.first ?? group.provisional) <= __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$frameBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LATE_START_MS"]) && group.animations.some((animation)=>animation.startTime == null && animation.playState === 'running')) {
                resolveGroup(group, at);
            }
            // The browser's start is still unread. The compositor starts the call
            // near this frame, so each moving channel's reads take the curve from
            // now until the browser tells its start.
            if (!group.resolved) {
                for (const channel of group.channels){
                    const animation = running.get(channel);
                    if (animation != null && group.animations.includes(animation) && animation.startTime == null && animation.playState === 'running') {
                        (group.latest ??= new Map()).set(channel, at);
                    }
                }
            }
        });
        ready.then(()=>syncGroup(group), ()=>settleCancelled(group));
    };
    /**
   * A call whose first animation was cancelled before its first frame: if a
   * later call in the same task took over its curves, it starts with that
   * call; otherwise it never started.
   */ const settleCancelled = (group)=>{
        if (group.resolved) {
            return;
        }
        let adopter = group.adoptedBy;
        while(adopter?.adoptedBy != null){
            adopter = adopter.adoptedBy;
        }
        if (adopter != null && adopter !== group) {
            void adopter.started.then((start)=>resolveGroup(group, start));
            return;
        }
        // A same-task write replaced the animation the call waited on: the call
        // still starts with the browser's start of the ones that remain.
        if (awaitStart(group)) {
            return;
        }
        resolveGroup(group, group.provisional);
    };
    /**
   * Waits for the browser's start of a call through one of its animations
   * still playing; false when none is left to wait on.
   */ const awaitStart = (group)=>{
        const live = group.animations.find((animation)=>animation.playState !== 'idle');
        const ready = live?.ready;
        if (ready == null || typeof ready.then !== 'function') {
            return false;
        }
        ready.then(()=>syncGroup(group), ()=>settleCancelled(group));
        return true;
    };
    const syncGroup = (group)=>{
        if (group.resolved) {
            return;
        }
        for (const animation of group.animations){
            if (animation.startTime != null) {
                resolveGroup(group, startAfterBlock(group, Number(animation.startTime)));
                return;
            }
        }
        // Finished from outside before the browser started it (a sampler's
        // finish() on a held animation): nothing is left to wait on, so the call
        // keeps its own clock, and a later call on an explicit clock does not
        // join it and wait for a start that never comes.
        if (group.animations.length > 0 && group.animations.every((animation)=>animation.playState === 'finished' || animation.playState === 'idle') && group.animations.some((animation)=>animation.playState === 'finished')) {
            resolveGroup(group, group.provisional);
            return;
        }
        // No start yet (paused before its first frame by a harness or a page,
        // or resumed with play() and still pending): neither `ready` nor the
        // first frame will look again, so keep looking each frame until the call
        // has a start, or its animations finish (its own clock) or are cancelled.
        if (group.animations.some((animation)=>animation.startTime == null && animation.playState !== 'idle')) {
            requestFrame?.(()=>syncGroup(group));
        }
    };
    /**
   * Reads the start of every call whose first frame may have been committed:
   * not those created in the running task, whose start the browser cannot
   * have set (reading it there can cost a style update per call).
   */ const syncPending = ()=>{
        for (const group of pendingGroups){
            if (!group.fresh) {
                syncGroup(group);
            }
        }
        syncFinished();
    };
    /**
   * An animation finished from outside (a test utility's or devtools'
   * `finish()`) shows its end state while the model still reads its curve:
   * the curve ends now in the model too, so the next call starts from what
   * is on screen.
   */ const syncFinished = ()=>{
        for (const [channel, animation] of running){
            if (animation.playState !== 'finished') {
                continue;
            }
            const time = now();
            for (const property of CHANNELS[channel]){
                const segment = segments.get(property);
                if (segment == null || time >= segment.start + segment.duration) {
                    continue;
                }
                segments.delete(property);
                resting[property] = segment.target;
            }
        }
    };
    /**
   * The start of a call from rest, on the frame that commits it. Chromium,
   * like Core Animation, starts a pending animation when it commits it, so a
   * main-thread block later in the call's task delays the motion; WebKit
   * dates it at its last frame time before that task, so the first frame
   * after the block would show it skipped into its curve. When the task ran
   * on more than LATE_START_MS past its first call, a start the browser put
   * by the task's first animations (a presented call's second frame, not the
   * call) and more than LATE_START_MS before the call's first read (its
   * `ready`, once the task has ended, or the first frame after it) moves to
   * that read, with every animation of the call, and every call of the task
   * moves to the same read. A shorter task, or a read other tasks delay,
   * keeps the browser's start.
   */ const startAfterBlock = (group, start)=>{
        const timeline = typeof document === 'undefined' ? null : document.timeline?.currentTime;
        // A start well after the animations were created is the browser's
        // commit of them.
        if (timeline == null || group.framed === true || start > (group.task?.first ?? group.provisional) + __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$frameBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LATE_START_MS"]) {
            return start;
        }
        const { task } = group;
        // A read in the task's first microtasks comes after its end too.
        // A later listener of an input event may hold the event's task past its
        // first microtask. So for a call made with `start: 'next-frame'`, the
        // task ends at this read: the first frame after the task, or its `ready`.
        const ended = task?.nextFrame === true ? now() : task?.ended ?? now();
        if (task == null || ended - task.first <= __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$frameBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LATE_START_MS"]) {
            return start;
        }
        // Read once the task has ended (its `ready`) or in the first frame after
        // it, both after the block; the task's other calls take the same read.
        const at = task.at ?? Math.max(now(), timeline);
        if (at - start <= __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$frameBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LATE_START_MS"]) {
            return start;
        }
        task.at = at;
        for (const animation of group.animations){
            if (animation.playState !== 'idle') {
                animation.startTime = at;
            }
        }
        return at;
    };
    /** Moves a call from rest onto the time the browser started it. */ const resolveGroup = (group, start)=>{
        if (group.resolved) {
            return;
        }
        group.resolved = true;
        pendingGroups.delete(group);
        for (const animation of group.animations){
            // One clock for the whole call; a cancelled one stays cancelled (a
            // start time would play it again).
            if (animation.startTime == null && animation.playState !== 'idle') {
                animation.startTime = start;
            }
        }
        const delta = start - group.provisional;
        if (delta !== 0) {
            for (const segment of group.segments){
                segment.start += delta;
            }
            for (const channel of group.channels){
                const animation = running.get(channel);
                if (animation == null || !group.animations.includes(animation)) {
                    continue;
                }
                const ends = CHANNELS[channel].flatMap((p)=>{
                    const segment = segments.get(p);
                    return segment == null ? [] : [
                        segment.start + segment.duration
                    ];
                });
                if (ends.length > 0) {
                    scheduleRetire(channel, animation, Math.max(...ends));
                }
            }
            for (const owner of new Set(group.segments.map((s)=>s.owner))){
                if (owner.settled || owner.timer == null) {
                    continue;
                }
                clearTimeout(owner.timer);
                const ends = group.segments.filter((segment)=>segment.owner === owner).map((segment)=>segment.start + segment.duration);
                owner.timer = setTimeout(()=>settleAtEnd(owner), Math.max(0, Math.max(start, ...ends) - now()));
            }
        }
        group.resolve(start);
    };
    // -- handles --------------------------------------------------------------
    const lastSpring = new WeakMap();
    const interrupt = (property, time)=>{
        cancelLanding(property);
        const segment = segments.get(property);
        if (segment == null) {
            return;
        }
        if (time < segment.start + segment.duration && !carriedOwners.has(segment.owner)) {
            settle(segment.owner, false);
        }
    };
    const settle = (owner, finished)=>{
        if (owner.settled) {
            return;
        }
        owner.settled = true;
        if (owner.timer != null) {
            clearTimeout(owner.timer);
            owner.timer = null;
        }
        owner.resolve(finished);
    };
    /**
   * A handle whose curves have reached their end on the wall clock finishes,
   * unless a sampler holds one of its animations (paused, or sought back):
   * then it waits on that animation's own time, as retiring does
   * (scheduleRetire), so `finished` never resolves under motion still on
   * screen.
   */ const settleAtEnd = (owner)=>{
        owner.timer = null;
        let wait = 0;
        for (const [channel, animation] of running){
            if (!CHANNELS[channel].some((property)=>segments.get(property)?.owner === owner)) {
                continue;
            }
            if (heldForFrame.has(channel)) {
                wait = Math.max(wait, END_RECHECK_MS);
                continue;
            }
            const remaining = remainingCurve(animation);
            if (remaining != null && remaining > 0) {
                wait = Math.max(wait, animation.playState === 'paused' ? RETIRE_RECHECK_MS : Math.max(remaining, END_RECHECK_MS));
            }
        }
        if (wait > 0) {
            owner.timer = setTimeout(()=>settleAtEnd(owner), wait);
            return;
        }
        settle(owner, true);
    };
    const makeHandle = (owner, properties, finished, time, group = null, settlesWithLanding = false)=>{
        const ends = properties.map((p)=>{
            const segment = segments.get(p);
            return segment != null && segment.owner === owner ? segment.start + segment.duration : time;
        });
        const end = Math.max(time, ...ends);
        if (settlesWithLanding) {
        // The landing it joined settles it.
        } else if (properties.length === 0 || end <= time) {
            settle(owner, true);
        } else {
            // Interruptions settle false as they happen (interrupt); reaching the
            // end untouched is completion.
            owner.timer = setTimeout(()=>settleAtEnd(owner), Math.max(0, end - now()));
        }
        // The call's own curves, as it started them.
        const curves = new Map();
        for (const property of properties){
            const segment = segments.get(property);
            if (segment != null && segment.owner === owner) {
                curves.set(property, segment);
            }
        }
        const handle = {
            properties,
            finished,
            started: group?.started ?? Promise.resolve(time),
            curve: (property)=>{
                const segment = curves.get(property === 'scale' ? 'scaleX' : property);
                if (segment == null) {
                    return null;
                }
                return {
                    duration: segment.duration / 1000,
                    at: (t)=>t * 1000 >= segment.duration ? segment.target : segment.at(Math.max(0, t * 1000)),
                    velocity: (t)=>t * 1000 >= segment.duration ? 0 : segment.speed(t * 1000)
                };
            },
            value: (property, at = now())=>{
                syncPending();
                return valueAt(property, at);
            },
            velocity: (property, at = now())=>{
                syncPending();
                return velocityAt(property, at);
            },
            retarget: (to, transition, retargetOptions)=>{
                const spring = transition?.spring ?? lastSpring.get(owner);
                if (spring == null) {
                    throw new Error('animator: retarget needs a spring');
                }
                return animator.animate(to, {
                    ...transition,
                    spring
                }, retargetOptions);
            },
            // The call's own curves, and its travel still waiting to land under
            // Reduce Motion: a catch freezes both where they are on screen
            // (AST-094 FR6), travel first so the fade's landing no longer carries
            // it, as `animator.stop()` does.
            stop: ()=>animator.stop(PROPERTIES.filter((p)=>properties.includes(p) && (segments.get(p)?.owner === owner || [
                        ...landings
                    ].some((landing)=>landing.values.has(p) && (landing.owners.get(p) ?? landing.owner) === owner))))
        };
        return handle;
    };
    const newOwner = ()=>{
        let resolve = ()=>{};
        const finished = new Promise((r)=>{
            resolve = r;
        });
        return {
            owner: {
                resolve,
                settled: false,
                timer: null
            },
            finished
        };
    };
    // -- segment factories ------------------------------------------------------
    const springSegment = (owner, property, start, to, spring, velocity)=>// The motion role it plays, at the tempo of the theme it is in.
        springFrom(owner, property, start, valueAt(property, start), velocity, to, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$resolveMotion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveMotion"])(target, spring));
    /**
   * `resolved` is already at the theme's tempo. A restart passes a segment's
   * spring as it is.
   */ const springFrom = (owner, property, start, from, velocity, to, resolved)=>{
        if (from === to && velocity === 0) {
            return null;
        }
        const curve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solveSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSpring"])(resolved), {
            from,
            to,
            velocity
        });
        const duration = Math.min(MAX_DURATION_MS, curve.settleTime(SETTLE_THRESHOLD[property]) * 1000);
        return {
            start,
            duration,
            target: to,
            at: (t)=>curve.value(t / 1000),
            speed: (t)=>curve.velocity(t / 1000),
            jumps: [],
            owner,
            spring: resolved
        };
    };
    /** The retarget of `additive`: the old curve plus a spring of the difference. */ const additiveSegment = (owner, property, start, to, spring, old)=>{
        const oldEnd = old.start + old.duration;
        const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$resolveMotion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveMotion"])(target, spring);
        const delta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solveSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSpring"])(resolved), {
            from: 0,
            to: to - old.target,
            velocity: 0
        });
        const deltaMs = Math.min(MAX_DURATION_MS, delta.settleTime(SETTLE_THRESHOLD[property]) * 1000);
        const ownAt = (t)=>t >= deltaMs ? to - old.target : delta.value(t / 1000);
        const oldAt = (time)=>time >= oldEnd ? old.target : old.at(Math.max(0, time - old.start));
        return {
            start,
            duration: Math.min(MAX_DURATION_MS, Math.max(oldEnd - start, deltaMs)),
            target: to,
            at: (t)=>oldAt(start + t) + ownAt(t),
            speed: (t)=>(start + t >= oldEnd ? 0 : old.speed(start + t - old.start)) + (t >= deltaMs ? 0 : delta.velocity(t / 1000)),
            jumps: old.jumps.map((jump)=>old.start + jump - start).filter((jump)=>jump > 0),
            owner,
            spring: resolved,
            isAdditive: true
        };
    };
    /**
   * `additive` for a played curve: the old curve plus the new curve's shape,
   * scaled to the difference between the two targets.
   */ const additiveCurveSegment = (owner, start, curve, old)=>{
        const from = curve.at(0);
        const to = curve.at(curve.duration);
        const scale = (to - old.target) / (to - from);
        const ms = Math.min(MAX_DURATION_MS, curve.duration * 1000);
        const oldEnd = old.start + old.duration;
        const oldAt = (time)=>time >= oldEnd ? old.target : old.at(Math.max(0, time - old.start));
        return {
            start,
            duration: Math.min(MAX_DURATION_MS, Math.max(oldEnd - start, ms)),
            target: to,
            at: (t)=>oldAt(start + t) + (t >= ms ? to - old.target : (curve.at(t / 1000) - from) * scale),
            speed: (t)=>(start + t >= oldEnd ? 0 : old.speed(start + t - old.start)) + (t >= ms ? 0 : curve.velocity(t / 1000) * scale),
            jumps: old.jumps.map((jump)=>old.start + jump - start).filter((jump)=>jump > 0),
            owner
        };
    };
    const fadeSegment = (owner, start, stops, jumps = [])=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$timing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerReducedMotionCrossFade"])();
        const ease = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$bezier$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezier"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$resolveMotion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveMotion"])(target, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$timing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reducedMotionCrossFade"].curve));
        const duration = stops[stops.length - 1].at;
        const at = (t)=>{
            for(let i = 0; i + 1 < stops.length; i++){
                const a = stops[i];
                const b = stops[i + 1];
                if (t < b.at || i + 2 === stops.length) {
                    if (b.at === a.at) {
                        return b.value;
                    }
                    const p = Math.min(1, Math.max(0, (t - a.at) / (b.at - a.at)));
                    return a.value + (b.value - a.value) * ease(p);
                }
            }
            return stops[stops.length - 1].value;
        };
        return {
            start,
            duration,
            target: stops[stops.length - 1].value,
            at,
            speed: (t)=>(at(t + 0.5) - at(Math.max(0, t - 0.5))) / (t >= 0.5 ? 1 : 0.5 + t) * 1000,
            jumps,
            owner,
            isFade: true
        };
    };
    // -- a retarget's start ----------------------------------------------------
    /**
   * What the screen shows of a property after a call that continues its
   * motion: the old curve, or the value at rest. It shows that until the
   * frame that commits the call. A rebase since then moves the element
   * under it by `offset`.
   */ const shown = new Map();
    /**
   * Channels whose rebuild waits for the frame that commits their call, with
   * the time of the last call on each.
   */ const heldForFrame = new Map();
    let isShownLookQueued = false;
    let stopWatchingHidden = null;
    /** The page whose frames the animator's own frame source draws. */ const framePage = options.requestFrame == null && typeof document !== 'undefined' ? document : null;
    /**
   * Whether no frame comes. A hidden page draws none. The frame source of a
   * hidden page draws none either, while the element shows elsewhere (a
   * Picture-in-Picture window's opener).
   */ const isPageHidden = ()=>target?.ownerDocument.visibilityState === 'hidden' || framePage?.visibilityState === 'hidden';
    const forgetShown = ()=>{
        shown.clear();
        syncWaiting();
        stopWatchingHidden?.();
    };
    /** This animator's entry in the waiting calls, from what still waits. */ const waitKey = {};
    const syncWaiting = ()=>{
        let first = Infinity;
        for (const entry of shown.values()){
            first = Math.min(first, entry.since);
        }
        if (first === Infinity) {
            waitingCalls.delete(waitKey);
        } else {
            waitingCalls.set(waitKey, first);
        }
    };
    /**
   * Rebuilds channels from their last calls' times, as those calls would
   * have rebuilt them: the same keyframes and start time.
   */ const rebuildOnCallClocks = (channels)=>{
        for (const time of new Set(channels.map(([, at])=>at))){
            commit(channels.filter(([, at])=>at === time).flatMap(([channel])=>CHANNELS[channel]), time);
        }
    };
    const flushWaiting = ()=>{
        const channels = [
            ...heldForFrame
        ];
        heldForFrame.clear();
        rebuildOnCallClocks(channels);
    };
    /**
   * A hidden page draws no frames and shows nothing, so its calls keep their
   * own clock, as the timers do (scheduleRetire). A page that goes hidden
   * before the frame forgets what it showed and rebuilds what waits.
   */ const watchHidden = ()=>{
        const pages = [
            ...new Set([
                target?.ownerDocument,
                framePage
            ].filter((page)=>page != null))
        ];
        if (stopWatchingHidden != null || pages.length === 0) {
            return;
        }
        const onChange = ()=>{
            if (isPageHidden()) {
                forgetShown();
                flushWaiting();
            }
        };
        for (const page of pages){
            page.addEventListener('visibilitychange', onChange);
        }
        stopWatchingHidden = ()=>{
            for (const page of pages){
                page.removeEventListener('visibilitychange', onChange);
            }
            stopWatchingHidden = null;
        };
    };
    /**
   * Holds a call's channels for the frame that commits it, which rebuilds
   * them (lookAtShown). Until then the old curve plays on, and no end look
   * retires it.
   */ const deferRebuild = (changed, time)=>{
        for (const property of changed){
            const channel = CHANNEL_OF[property];
            const isNew = !heldForFrame.has(channel);
            heldForFrame.set(channel, time);
            if (!isNew) {
                continue;
            }
            stale.delete(channel);
            clearTimeout(retireTimers.get(channel));
            retireTimers.delete(channel);
            clearTimeout(retireLooks.get(channel));
            retireLooks.delete(channel);
        }
    };
    /** A rebuild before that frame commits the channel's calls at once. */ const commitWaitingNow = (channel)=>{
        if (!heldForFrame.delete(channel)) {
            return;
        }
        for (const property of CHANNELS[channel]){
            shown.delete(property);
        }
        syncWaiting();
    };
    /**
   * Rebuilds a waiting channel from what the screen shows, after a rebase
   * moved the element under it. The old curve plays on, shifted with the
   * element, until the frame that commits the call.
   */ const rebuildShown = (channel, time)=>{
        const model = new Map();
        const rests = new Map();
        for (const property of CHANNELS[channel]){
            const entry = shown.get(property);
            if (entry == null) {
                continue;
            }
            model.set(property, segments.get(property));
            rests.set(property, resting[property]);
            if (entry.segment == null) {
                segments.delete(property);
                resting[property] = entry.resting + entry.offset;
            } else {
                segments.set(property, shifted(entry.segment, entry.offset));
            }
        }
        const callTime = heldForFrame.get(channel);
        heldForFrame.delete(channel);
        try {
            rebuild(channel, time);
        } finally{
            for (const [property, segment] of model){
                if (segment == null) {
                    segments.delete(property);
                } else {
                    segments.set(property, segment);
                }
            }
            for (const [property, rest] of rests){
                resting[property] = rest;
            }
            if (callTime != null) {
                heldForFrame.set(channel, callTime);
            }
        }
    };
    /**
   * Notes what the screen shows of each property that a call continuing
   * motion changes, before the call replaces its curve. The call's channels
   * then wait for the frame that commits it, which rebuilds them
   * (lookAtShown). That holds for a call in a frame callback of the page's.
   * A call from rest, a call on an explicit clock and a call in an
   * animator's frame callback start on their frame already.
   */ const noteShown = (properties, time, group, at)=>{
        if (group != null || at != null || frameDepth > 0 || requestFrame == null || target == null || typeof target.animate !== 'function' || isPageHidden()) {
            return false;
        }
        // A curve on these channels may still wait for the browser's start.
        // Its call's own start then settles where the new curve begins.
        const list = [
            ...properties
        ];
        if (list.some((property)=>CHANNELS[CHANNEL_OF[property]].some((other)=>{
                const segment = segments.get(other);
                return segment != null && isHeld(segment);
            }))) {
            return false;
        }
        for (const property of list){
            if (shown.has(property)) {
                continue;
            }
            shown.set(property, {
                segment: segments.get(property) ?? null,
                resting: resting[property],
                offset: 0,
                since: time
            });
        }
        syncWaiting();
        watchHidden();
        if (!isShownLookQueued) {
            isShownLookQueued = true;
            requestFrame(lookAtShown);
        }
        return true;
    };
    /** The value and velocity that the screen shows of a property at `time`. */ const shownAt = (entry, time)=>{
        const { segment, offset } = entry;
        if (segment == null) {
            return {
                value: entry.resting + offset,
                velocity: 0
            };
        }
        const elapsed = time - segment.start;
        if (elapsed >= segment.duration) {
            return {
                value: segment.target + offset,
                velocity: 0
            };
        }
        const t = Math.max(0, elapsed);
        return {
            value: segment.at(t) + offset,
            velocity: segment.speed(t)
        };
    };
    const shifted = (segment, offset)=>offset === 0 ? segment : {
            ...segment,
            target: segment.target + offset,
            at: (t)=>segment.at(t) + offset
        };
    /**
   * The frame that commits calls that continue motion. When it comes more
   * than LATE_START_MS after the first call it commits on any animator, the
   * screen has shown the old curve. Each spring that they leave
   * then starts here, from the value on screen, as UIKit's added spring
   * begins at its commit. It keeps a velocity that its call handed it, such
   * as a release's, and otherwise takes the one on screen. A played curve or
   * a coast keeps its call's clock, and an earlier frame keeps every call on
   * its own clock.
   */ const lookAtShown = (frame)=>{
        isShownLookQueued = false;
        const entries = [
            ...shown
        ];
        const channels = [
            ...heldForFrame
        ];
        heldForFrame.clear();
        forgetShown();
        if (target == null) {
            return;
        }
        const at = frameTime(frame, now);
        const late = at - firstCommitted(frame, Math.min(...entries.map(([, entry])=>entry.since))) > __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$frameBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LATE_START_MS"];
        const changed = [];
        const owners = new Set();
        for (const [property, entry] of entries){
            const current = segments.get(property);
            if (!late || current == null || current.spring == null || current.isFade === true || isHeld(current)) {
                continue;
            }
            const screen = shownAt(entry, at);
            const next = current.isAdditive === true && entry.segment != null ? additiveSegment(current.owner, property, at, current.target, current.spring, shifted(entry.segment, entry.offset)) : springFrom(current.owner, property, at, screen.value, current.handedVelocity ?? (// From rest, the call's own start velocity.
            entry.segment == null ? current.speed(0) : screen.velocity), current.target, current.spring);
            if (next == null) {
                segments.delete(property);
                resting[property] = current.target;
            } else {
                segments.set(property, current.handedVelocity == null ? next : {
                    ...next,
                    handedVelocity: current.handedVelocity
                });
            }
            owners.add(current.owner);
            changed.push(property);
        }
        const restarted = new Set(changed.map((property)=>CHANNEL_OF[property]));
        if (restarted.size > 0) {
            commit([
                ...restarted
            ].flatMap((channel)=>CHANNELS[channel]), at);
        }
        rebuildOnCallClocks(channels.filter(([channel])=>!restarted.has(channel)));
        for (const owner of owners){
            if (owner.settled || owner.timer == null) {
                continue;
            }
            clearTimeout(owner.timer);
            let end = at;
            for (const segment of segments.values()){
                if (segment.owner === owner) {
                    end = Math.max(end, segment.start + segment.duration);
                }
            }
            owner.timer = setTimeout(()=>settleAtEnd(owner), Math.max(0, end - now()));
        }
    };
    // -- the animator -----------------------------------------------------------
    const commit = (changed, time)=>{
        const channels = new Set();
        for (const property of changed){
            channels.add(CHANNEL_OF[property]);
        }
        if (channels.has('opacity')) {
            borrowedOpacity = null;
        }
        for (const channel of channels){
            rebuild(channel, time);
        }
        flushReleases();
    };
    /** Reduced Motion landings still waiting for the element to be transparent. */ const landings = new Set();
    /** Calls a later call's landing carries: an interrupt does not settle them. */ const carriedOwners = new Set();
    /**
   * A later write to `property` takes it from any landing. A write to opacity
   * decides what shows, so a landing still waiting writes its travel at once
   * rather than never, and its calls settle as interrupted.
   */ const cancelLanding = (property)=>{
        for (const landing of [
            ...landings
        ]){
            if (property === 'opacity') {
                endLanding(landing);
                landNow(landing);
            } else if (landing.values.delete(property)) {
                // Set or stopped before it landed: the call whose move it was did
                // not finish (a carried value is an earlier call's).
                const moved = landing.owners.get(property) ?? landing.owner;
                landing.owners.delete(property);
                if (!moved.settled) {
                    settle(moved, false);
                }
            }
        }
    };
    const landNow = (landing)=>{
        const changed = [];
        for (const [property, value] of landing.values){
            segments.delete(property);
            resting[property] = value;
            changed.push(property);
        }
        if (changed.length > 0) {
            commit(changed, now());
        }
        for (const owner of [
            landing.owner,
            ...landing.carried
        ]){
            carriedOwners.delete(owner);
            if (!owner.settled) {
                settle(owner, false);
            }
        }
    };
    /**
   * A later Reduced Motion call that lands too carries the landings still
   * waiting: their travel lands with its own, which wins where both move a
   * property, and their calls settle when it lands. So two calls in one
   * frame (a drag cancel's position and scale) both land.
   */ const adoptLandings = (plan, properties)=>{
        const carried = [];
        const owners = new Map();
        for (const landing of [
            ...landings
        ]){
            for (const [property, value] of landing.values){
                const moved = landing.owners.get(property) ?? landing.owner;
                if (!properties.includes(property) && !plan.values.has(property)) {
                    plan.values.set(property, value);
                    owners.set(property, moved);
                } else if (!moved.settled) {
                    // This call takes the property over: the earlier move never lands.
                    settle(moved, false);
                }
            }
            carried.push(landing.owner, ...landing.carried);
            endLanding(landing);
        }
        for (const owner of carried){
            carriedOwners.add(owner);
        }
        return {
            carried,
            owners
        };
    };
    /**
   * A call joins the newest waiting dip: it takes the landing over and
   * settles when the dip ends, and the call it replaces lands with it. Each
   * value keeps the call whose move it is.
   */ const joinWaitingDip = (owner)=>{
        const dip = [
            ...landings
        ].reverse().find((landing)=>landing.fadeIn != null);
        if (dip == null) {
            settle(owner, true);
            return;
        }
        for (const property of dip.values.keys()){
            if (!dip.owners.has(property)) {
                dip.owners.set(property, dip.owner);
            }
        }
        dip.carried.push(dip.owner);
        carriedOwners.add(dip.owner);
        dip.owner = owner;
    };
    /** Where opacity is heading: past a waiting landing's fade back in. */ const opacityHeading = ()=>{
        let to = finalValue('opacity');
        for (const landing of landings){
            if (landing.fadeIn != null) {
                to = landing.fadeIn.to;
            } else if (landing.restore != null) {
                to = landing.restore;
            }
        }
        return to;
    };
    const endLanding = (landing)=>{
        if (landing.timer != null) {
            clearTimeout(landing.timer);
        }
        landings.delete(landing);
    };
    /**
   * How long `landing` still waits for its fade, in ms. A sampler that pauses
   * the fade holds it, so it checks again later. A resumed fade holds it until
   * the fade starts again. A fade that runs past the landing's due time, as
   * after a pause, holds it for the rest of the fade. Any other fade holds
   * nothing.
   */ const fadeHeldFor = (landing)=>{
        const animation = running.get('opacity');
        const owner = segments.get('opacity')?.owner;
        if (animation == null || owner == null || owner !== landing.owner && !landing.carried.includes(owner)) {
            return 0;
        }
        if (animation.playState === 'paused') {
            return RETIRE_RECHECK_MS;
        }
        // The timeline reads the frame before a long task, so the fade's current
        // time would date a fade that has ended as still running.
        const start = animation.startTime;
        const duration = Number(animation.effect?.getTiming?.().duration);
        if (!Number.isFinite(duration)) {
            return 0;
        }
        if (start == null) {
            // A fade resumed with play() has no start until its next frame.
            return animation.playState === 'running' ? END_RECHECK_MS : 0;
        }
        // A fade that ends by the landing's due time holds nothing. A timer runs
        // in whole milliseconds, so it often fires a fraction early.
        const end = Number(start) + duration - END_HOLD_MS;
        if (landing.due != null && end <= landing.due) {
            return 0;
        }
        const left = end - now();
        return left > 0 ? left : 0;
    };
    /**
   * The landing's timer: it lands once its fade lets it. A call that takes the
   * landing over lands it directly, at once.
   */ const landWhenFaded = (landing)=>{
        const held = fadeHeldFor(landing);
        if (held > 0) {
            landing.due = now() + held;
            landing.timer = setTimeout(()=>landWhenFaded(landing), held);
            return;
        }
        land(landing);
    };
    /** Arms a landing from the call's start (the browser's, for a call from rest). */ const scheduleLanding = (owner, started, plan, adopted)=>{
        const owners = new Map();
        for (const property of plan.values.keys()){
            owners.set(property, adopted?.owners.get(property) ?? owner);
        }
        const landing = {
            ...plan,
            owner,
            carried: adopted?.carried ?? [],
            owners,
            timer: null,
            due: null
        };
        landings.add(landing);
        // The handle settles when the landing (and its fade back in) is done.
        if (owner.timer != null) {
            clearTimeout(owner.timer);
            owner.timer = null;
        }
        void started.then((start)=>{
            if (!landings.has(landing)) {
                return;
            }
            landing.due = start + landing.at;
            landing.timer = setTimeout(()=>landWhenFaded(landing), Math.max(0, landing.due - now()));
        });
    };
    /**
   * Writes the travel while the element is transparent: a plain style write,
   * never an animation (DR2: opacity only), so it is never shown in the wrong
   * place. In a dip the fade back in starts from here and takes what is left
   * of the cross-fade, so the dip ends when it was due even when a busy main
   * thread runs this timer late; past the whole fade back in (100 ms late or
   * more) the element appears at once where it landed, with no animation,
   * and the call settles then.
   */ const land = (landing)=>{
        landings.delete(landing);
        landing.timer = null;
        const time = now();
        const changed = [];
        for (const [property, value] of landing.values){
            segments.delete(property);
            resting[property] = value;
            changed.push(property);
        }
        let end = time;
        // The fade back in takes what is left of the cross-fade: a timer that a
        // busy main thread runs late shortens it, so the dip still ends when it
        // was due (design:reduced-motion DR2, 200 ms or less), and the element is
        // never shown before it lands. Past the whole fade back in nothing is
        // left: the element appears at once, a plain write with no fade for the
        // browser to start a frame later, so the call settles showing it.
        const late = landing.due == null ? 0 : Math.max(0, time - landing.due);
        const appears = landing.fadeIn != null && late >= landing.fadeIn.ms;
        if (landing.fadeIn != null && !appears) {
            const ms = landing.fadeIn.ms - late;
            segments.set('opacity', fadeSegment(landing.owner, time, [
                {
                    at: 0,
                    value: valueAt('opacity', time)
                },
                {
                    at: ms,
                    value: landing.fadeIn.to
                }
            ]));
            changed.push('opacity');
            end = time + ms;
        } else if (landing.fadeIn != null) {
            segments.delete('opacity');
            resting.opacity = landing.fadeIn.isBorrowed === true ? IDENTITY.opacity : landing.fadeIn.to;
            changed.push('opacity');
        } else if (landing.restore != null) {
            segments.delete('opacity');
            resting.opacity = landing.restoreIsBorrowed === true ? IDENTITY.opacity : landing.restore;
            changed.push('opacity');
        }
        commit(changed, time);
        if (landing.restoreIsBorrowed === true || appears && landing.fadeIn?.isBorrowed === true) {
            // The stylesheet owns its opacity again.
            releaseOwnOpacity();
        } else if (landing.fadeIn?.isBorrowed === true) {
            // The fade back in returns to the stylesheet's opacity: it owns it
            // again once the fade ends (releaseIdentity).
            borrowedOpacity = landing.fadeIn.to;
        }
        // The calls it carries are done: their travel has landed.
        for (const carried of landing.carried){
            carriedOwners.delete(carried);
            if (!carried.settled) {
                settle(carried, true);
            }
        }
        const { owner } = landing;
        if (owner.settled) {
            return;
        }
        if (end <= time) {
            settle(owner, true);
        } else {
            owner.timer = setTimeout(()=>settleAtEnd(owner), Math.max(0, end - now()));
        }
    };
    /**
   * A call that sets a value still waiting to land takes it over: the earlier
   * move never lands, and its call settles interrupted. Once nothing waiting
   * is left, a call that names its own opacity replaces an earlier fade back
   * in or restore too, so a caught dismissal fades straight back up instead
   * of dipping. Whatever still waits is carried by the new plan.
   */ const takeOverLandings = (properties, namesOpacity)=>{
        for (const property of properties){
            if (property !== 'opacity') {
                cancelLanding(property);
            }
        }
        if (!namesOpacity) {
            // A dip left with nothing to land (a move taken back) fades straight
            // back in from where it is, rather than finishing its dip.
            for (const landing of [
                ...landings
            ]){
                if (landing.values.size === 0 && landing.fadeIn != null) {
                    endLanding(landing);
                    land(landing);
                }
            }
            return;
        }
        for (const landing of [
            ...landings
        ]){
            // A waiting call that named its own opacity loses it to this call: it
            // never reaches that opacity, so it settles interrupted even though its
            // travel still lands.
            for (const owner of [
                landing.owner,
                ...landing.carried
            ]){
                if (namedOpacity.has(owner) && !owner.settled) {
                    settle(owner, false);
                }
            }
            if (landing.values.size > 0) {
                continue;
            }
            endLanding(landing);
            if (landing.fadeIn?.isBorrowed === true || landing.restoreIsBorrowed === true) {
                // The call's own opacity owns it now, not the stylesheet's.
                borrowedOpacity = null;
            }
            for (const owner of [
                landing.owner,
                ...landing.carried
            ]){
                carriedOwners.delete(owner);
                if (!owner.settled) {
                    settle(owner, false);
                }
            }
        }
    };
    /** Reduce Motion calls that named their own opacity. */ const namedOpacity = new WeakSet();
    /**
   * Where opacity was heading before a call took the waiting landings over:
   * an entrance by role that catches an exit fades back to what the exit
   * would have restored.
   */ let headingBeforeTakeOver = null;
    /** What the Reduce Motion planner reads of this animator. */ const planView = {
        valueAt,
        opacityHeading: ()=>headingBeforeTakeOver ?? opacityHeading(),
        ownOpacity: ()=>ownOpacity(),
        writesOwnOpacity: ()=>writesOwnOpacity(),
        get borrowedOpacity () {
            return borrowedOpacity;
        },
        get hasOpacityCurve () {
            return segments.has('opacity');
        },
        get restingOpacity () {
            return resting.opacity;
        },
        get hasPendingLanding () {
            return landings.size > 0;
        },
        get hasWaitingDip () {
            return [
                ...landings
            ].some((landing)=>landing.fadeIn != null);
        }
    };
    /**
   * Reduced Motion (see the file header): the planner's plan
   * (reducedMotionPlan.ts) as this call's segments.
   */ const reducedMotion = (owner, time, targets, properties, fade, role)=>{
        const heading = opacityHeading();
        // An entrance or an exit by role drives the opacity as a named one does.
        takeOverLandings(properties, targets.opacity != null || role != null);
        if (targets.opacity != null) {
            namedOpacity.add(owner);
        }
        headingBeforeTakeOver = heading;
        let plan;
        try {
            plan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$reducedMotionPlan$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["planReducedMotion"])(planView, time, targets, properties, fade, role);
        } finally{
            headingBeforeTakeOver = null;
        }
        const next = {};
        for (const property of plan.atOnce){
            next[property] = null;
        }
        if (plan.opacityFade != null) {
            next.opacity = fadeSegment(owner, time, plan.opacityFade);
        }
        return {
            next,
            holds: plan.holds,
            landing: plan.landing,
            borrowed: plan.borrowed,
            joins: plan.joins
        };
    };
    const animator = {
        get element () {
            return target;
        },
        reducedMotion (reducedOptions = {}) {
            if (!prefersReducedMotion()) {
                return 'off';
            }
            return isCoarsePointer() || reducedOptions.touchRelease === true ? 'crossfade' : 'instant';
        },
        attach (next) {
            if (next === target) {
                return;
            }
            flushDeferred();
            present(false);
            // The next node never showed the old curves.
            forgetShown();
            heldForFrame.clear();
            if (next == null) {
                // Unmount, unless a node replaces this one in the same task (React's
                // replacement order: attach(null), then the new node): nothing is
                // left to animate, so at the end of the task every other handle
                // settles as interrupted, every atRest() wait settles and no
                // completion timer outlives the element, as in dispose()
                // (architecture:react-component-runtime INV5). A replacement keeps
                // them all: the motion goes on on the new node.
                lastDetached = target;
                if (!unmountQueued) {
                    unmountQueued = true;
                    queueMicrotask(()=>{
                        if (!unmountQueued) {
                            return;
                        }
                        unmountQueued = false;
                        // A Reduce Motion move still waiting lands where it was going, as
                        // in dispose(), on the node just detached too: a dip's fade out
                        // left its low opacity inline there, so a later attach of that
                        // node (a Suspense or Activity reveal) shows it landed and
                        // visible. Its calls settle as interrupted.
                        onLastDetached(()=>{
                            landPending(false);
                            // The landing's commit rebuilt every channel it touched on the
                            // detached node, any axis still moving included: leave that
                            // node with no animation, timer or promotion.
                            for (const animation of running.values()){
                                animation.cancel();
                            }
                            running.clear();
                            for (const timer of retireTimers.values()){
                                clearTimeout(timer);
                            }
                            retireTimers.clear();
                            for (const timer of retireLooks.values()){
                                clearTimeout(timer);
                            }
                            retireLooks.clear();
                            retireFrames.clear();
                            demote();
                            // demote() asks for a fresh will-change read of the node it
                            // demotes; a detached node gets none.
                            cancelSheetWillChangeRead();
                        });
                        lastDetached = null;
                        const time = now();
                        for (const property of PROPERTIES){
                            interrupt(property, time);
                        }
                        for (const wait of [
                            ...restWaits
                        ]){
                            wait.settle();
                        }
                    });
                }
            } else {
                // A node in place of the one just detached: no unmount.
                unmountQueued = false;
                lastDetached = null;
            }
            // After the landing's commit, which can promote the element again.
            demote();
            // A pseudo-element holds an identity with a static animation, which the
            // cancel below drops: note the channels to hold again on the next node
            // (never a borrowed opacity, which is the stylesheet's).
            const isOpacityBorrowed = borrowedOpacity != null || [
                ...landings
            ].some((landing)=>landing.restoreIsBorrowed === true);
            const pseudoHeld = pseudoElement == null || target == null ? null : new Set(Object.keys(CHANNELS).filter((channel)=>running.has(channel) && !(channel === 'opacity' && isOpacityBorrowed) && CHANNELS[channel].every((p)=>!segments.has(p) && resting[p] === IDENTITY[p])));
            for (const animation of running.values()){
                animation.cancel();
            }
            running.clear();
            for (const timer of retireTimers.values()){
                clearTimeout(timer);
            }
            retireTimers.clear();
            for (const timer of retireLooks.values()){
                clearTimeout(timer);
            }
            retireLooks.clear();
            retireFrames.clear();
            if (isOpacityBorrowed) {
                // A running borrowed dip (or an exit by role returning to the
                // stylesheet) stays in the model through any attach, so a pending
                // move still lands while the element is invisible; only the
                // outgoing element gets its stylesheet's opacity back.
                releaseOwnOpacity();
            }
            // Identities the outgoing node holds inline over a stylesheet that
            // differs, kept through a detach for the node that comes next.
            if (target != null) {
                const outgoing = target;
                heldIdentity = pseudoHeld ?? new Set(Object.keys(CHANNELS).filter((channel)=>outgoing.style.getPropertyValue(cssName(channel)) === identityOf(channel)));
            }
            const held = heldIdentity;
            target = next;
            // A new node: its own will-change is read again.
            cancelSheetWillChangeRead();
            sheetWillChangeRead = false;
            if (target == null) {
                return;
            }
            heldIdentity = new Set();
            const time = now();
            // A borrowed dip that ended while detached hands the opacity back
            // instead of writing the borrowed value inline.
            const dip = segments.get('opacity');
            if (borrowedOpacity != null && (dip == null || time >= dip.start + dip.duration)) {
                borrowedOpacity = null;
                segments.delete('opacity');
                resting.opacity = IDENTITY.opacity;
            }
            for (const channel of Object.keys(CHANNELS)){
                const properties = CHANNELS[channel];
                const isDefault = properties.every((p)=>!segments.has(p) && resting[p] === IDENTITY[p]);
                if (!isDefault) {
                    rebuild(channel, time);
                } else if (held.has(channel)) {
                    // An identity the animator held inline over a stylesheet that
                    // differs goes onto the new node too (writeInline keeps it only
                    // where the new node's stylesheet still differs); a pseudo-element's
                    // is held again.
                    if (pseudoElement != null) {
                        hold(channel, time);
                    } else {
                        writeInline(channel, (property)=>resting[property]);
                    }
                }
            }
            flushReleases();
            readSheetWillChangeLater();
        },
        get (property, time = now()) {
            syncPending();
            return valueAt(property === 'scale' ? 'scaleX' : property, time);
        },
        getVelocity (property, time = now()) {
            syncPending();
            return velocityAt(property === 'scale' ? 'scaleX' : property, time);
        },
        set (values, setOptions = {}) {
            syncPending();
            flushDeferred();
            const time = now();
            const next = expand(values);
            for (const [property, value] of Object.entries(next)){
                interrupt(property, time);
                segments.delete(property);
                shown.delete(property);
                resting[property] = value;
            }
            // Direct manipulation: the layer makes each write a composite only.
            if (setOptions.promote !== false) {
                for (const property of Object.keys(next)){
                    promote(CHANNEL_OF[property]);
                }
            }
            commit(Object.keys(next), time);
        },
        animate (to, transition, animateOptions = {}) {
            syncPending();
            if (animateOptions.start !== 'presented') {
                flushDeferred();
            }
            const time = animateOptions.at ?? callTime(now);
            const targets = expand(to);
            const velocities = expand(transition.velocity ?? {});
            const { owner, finished } = newOwner();
            lastSpring.set(owner, transition.spring);
            const properties = Object.keys(targets);
            const next = {};
            let plan = null;
            if (prefersReducedMotion()) {
                plan = reducedMotion(owner, time, targets, properties, isCoarsePointer() || animateOptions.touchRelease === true, animateOptions.crossfadeAs);
                Object.assign(next, plan.next);
            } else {
                for (const property of properties){
                    const running = animateOptions.additive === true && velocities[property] == null ? segmentAt(property, time) : null;
                    if (running != null && !isHeld(running)) {
                        next[property] = additiveSegment(owner, property, time, targets[property], transition.spring, running);
                        continue;
                    }
                    const handed = velocities[property];
                    const current = velocityAt(property, time);
                    const segment = springSegment(owner, property, time, targets[property], transition.spring, handed ?? current);
                    // A velocity that is the curve's own at the call keeps the current
                    // velocity, as no velocity does. Any other is handed on, such as a
                    // release's.
                    const isHanded = handed != null && Math.abs(handed - current) > SAMPLE_TOLERANCE[property] * REST_FRAMES_PER_SECOND;
                    next[property] = segment != null && isHanded ? {
                        ...segment,
                        handedVelocity: handed
                    } : segment;
                }
            }
            const group = beginGroup(time, Object.keys(next), animateOptions.at, animateOptions.start);
            // Ignored with `at`, which may join an earlier call's start.
            if (group != null && animateOptions.at == null && animateOptions.start === 'next-frame') {
                group.nextFrame = true;
            }
            const waitsForFrame = noteShown(Object.keys(next), time, group, animateOptions.at);
            const adopted = plan?.landing != null ? adoptLandings(plan.landing, Object.keys(next)) : null;
            const changed = [];
            for (const [property, segment] of Object.entries(next)){
                interrupt(property, time);
                changed.push(property);
                if (segment == null) {
                    // Read before the segment goes: valueAt falls back to resting.
                    const value = plan?.holds[property] ?? targets[property] ?? valueAt(property, time);
                    segments.delete(property);
                    resting[property] = value;
                } else {
                    segments.set(property, segment);
                }
            }
            commitCall(group, owner, changed, time, animateOptions.start === 'presented' && animateOptions.at == null, waitsForFrame);
            if (plan?.borrowed != null) {
                // The dip's own commit cleared it; the borrow lasts the dip.
                borrowedOpacity = plan.borrowed;
            }
            if (plan?.joins === true) {
                joinWaitingDip(owner);
            }
            const handle = plan?.joins === true ? makeHandle(owner, [
                'opacity'
            ], finished, time, group, true) : makeHandle(owner, changed, finished, time, group);
            if (plan?.landing != null) {
                scheduleLanding(owner, handle.started, plan.landing, adopted);
            }
            return handle;
        },
        play (curves, playOptions = {}) {
            syncPending();
            if (playOptions.start !== 'presented') {
                flushDeferred();
            }
            const time = playOptions.at ?? callTime(now);
            const { owner, finished } = newOwner();
            const byProperty = {};
            // `scale` first, so an explicit `scaleX` or `scaleY` beside it wins.
            const entries = Object.entries(curves).sort(([a], [b])=>Number(b === 'scale') - Number(a === 'scale'));
            for (const [key, curve] of entries){
                if (curve == null) {
                    continue;
                }
                if (!Number.isFinite(curve.duration) || curve.duration < 0) {
                    throw new RangeError(`animator: a curve needs a finite duration ≥ 0 (got ${curve.duration})`);
                }
                for (const property of expandList([
                    key
                ])){
                    byProperty[property] = curve;
                }
            }
            const properties = Object.keys(byProperty);
            const targets = {};
            for (const property of properties){
                const curve = byProperty[property];
                targets[property] = curve.at(curve.duration);
            }
            const plan = prefersReducedMotion() ? reducedMotion(owner, time, targets, properties, isCoarsePointer() || playOptions.touchRelease === true, playOptions.crossfadeAs) : null;
            const next = {
                ...plan?.next
            };
            for (const property of properties){
                if (property in next) {
                    continue;
                }
                const curve = byProperty[property];
                const running = playOptions.additive === true ? segmentAt(property, time) : null;
                if (running != null && !isHeld(running) && curve.duration > 0 && Math.abs(curve.at(curve.duration) - curve.at(0)) > 1e-9) {
                    next[property] = additiveCurveSegment(owner, time, curve, running);
                    continue;
                }
                next[property] = curve.duration === 0 ? null : {
                    start: time,
                    duration: Math.min(MAX_DURATION_MS, curve.duration * 1000),
                    target: targets[property],
                    at: (t)=>curve.at(t / 1000),
                    speed: (t)=>curve.velocity(t / 1000),
                    jumps: [],
                    owner,
                    source: curve
                };
            }
            const group = beginGroup(time, Object.keys(next), playOptions.at, playOptions.start);
            // Ignored with `at`, which may join an earlier call's start.
            if (group != null && playOptions.at == null && playOptions.start === 'next-frame') {
                group.nextFrame = true;
            }
            const waitsForFrame = noteShown(Object.keys(next), time, group, playOptions.at);
            const adopted = plan?.landing != null ? adoptLandings(plan.landing, Object.keys(next)) : null;
            const changed = [];
            for (const [property, segment] of Object.entries(next)){
                interrupt(property, time);
                changed.push(property);
                if (segment == null) {
                    // Read before the segment goes: valueAt falls back to resting.
                    const value = plan?.holds[property] ?? targets[property] ?? valueAt(property, time);
                    segments.delete(property);
                    resting[property] = value;
                } else {
                    segments.set(property, segment);
                }
            }
            commitCall(group, owner, changed, time, playOptions.start === 'presented' && playOptions.at == null, waitsForFrame);
            if (plan?.borrowed != null) {
                // The dip's own commit cleared it; the borrow lasts the dip.
                borrowedOpacity = plan.borrowed;
            }
            if (plan?.joins === true) {
                joinWaitingDip(owner);
            }
            const handle = plan?.joins === true ? makeHandle(owner, [
                'opacity'
            ], finished, time, group, true) : makeHandle(owner, changed, finished, time, group);
            if (plan?.landing != null) {
                scheduleLanding(owner, handle.started, plan.landing, adopted);
            }
            return handle;
        },
        decay (curves, decayOptions = {}) {
            syncPending();
            flushDeferred();
            const time = decayOptions.at ?? callTime(now);
            // Under Reduce Motion only momentum keeps moving (DR2, DEC-2): a curve
            // that is a transition plays as `animate` does, a cross-fade or at once.
            const reduce = prefersReducedMotion();
            const transitions = {};
            for (const property of DECAY_PROPERTIES){
                const curve = curves[property];
                if (reduce && curve?.isTransition === true) {
                    transitions[property] = curve.at(curve.duration);
                }
            }
            const transitioned = Object.keys(transitions).length > 0 ? animator.animate(transitions, REDUCED_TRANSITION, {
                at: time,
                touchRelease: decayOptions.touchRelease
            }) : null;
            const { owner, finished } = newOwner();
            // Momentum moves the translate axes only (DR2's throw exception).
            const properties = DECAY_PROPERTIES.filter((property)=>curves[property] != null && transitions[property] === undefined);
            if (transitioned != null && properties.length === 0) {
                return transitioned;
            }
            const group = beginGroup(time, properties, decayOptions.at);
            const waitsForFrame = noteShown(properties, time, group, decayOptions.at);
            for (const property of properties){
                const curve = curves[property];
                interrupt(property, time);
                if (!(curve.duration > 0)) {
                    segments.delete(property);
                    resting[property] = curve.at(0);
                    continue;
                }
                segments.set(property, {
                    start: time,
                    duration: Math.min(MAX_DURATION_MS, curve.duration * 1000),
                    target: curve.at(curve.duration),
                    at: (t)=>curve.at(t / 1000),
                    speed: (t)=>curve.velocity(t / 1000),
                    jumps: [],
                    owner
                });
            }
            commitCall(group, owner, properties, time, false, waitsForFrame);
            const handle = makeHandle(owner, properties, finished, time, group);
            if (transitioned == null) {
                return handle;
            }
            // One handle for the whole release: the cross-faded axes too.
            const faded = transitioned;
            const owns = (property)=>faded.properties.includes(property);
            return {
                ...handle,
                properties: [
                    ...handle.properties,
                    ...faded.properties
                ],
                started: Promise.all([
                    handle.started,
                    faded.started
                ]).then(([coasting])=>coasting),
                finished: Promise.all([
                    handle.finished,
                    faded.finished
                ]).then(([coasted, done])=>coasted && done),
                value: (property, at)=>owns(property) ? faded.value(property, at) : handle.value(property, at),
                velocity: (property, at)=>owns(property) ? faded.velocity(property, at) : handle.velocity(property, at),
                stop: ()=>{
                    handle.stop();
                    faded.stop();
                }
            };
        },
        stop (properties) {
            syncPending();
            flushDeferred();
            const time = now();
            const list = properties == null ? PROPERTIES : expandList(properties);
            const changed = [];
            // A borrowed dip, or an exit by role that returns to the stylesheet.
            const wasBorrowed = borrowedOpacity != null || [
                ...landings
            ].some((landing)=>landing.restoreIsBorrowed === true);
            // Read before the landings go: a dip's fade back in, an exit's restore.
            const heading = opacityHeading();
            for (const property of list){
                cancelLanding(property);
                const segment = segments.get(property);
                if (segment == null) {
                    continue;
                }
                // A Reduce Motion fade is never left half done: it finishes, and a
                // dip on the stylesheet's opacity hands that opacity back. A call
                // that continued the motion and is still not on screen past its
                // frame shows the old curve: the element stops where that is.
                const noted = shown.get(property);
                shown.delete(property);
                const value = !segment.isFade ? noted != null && time - noted.since > __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$frameBlock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LATE_START_MS"] ? shownAt(noted, time).value : valueAt(property, time) : wasBorrowed ? IDENTITY.opacity : heading;
                interrupt(property, time);
                segments.delete(property);
                resting[property] = value;
                changed.push(property);
            }
            commit(changed, time);
            if (wasBorrowed && changed.includes('opacity')) {
                releaseOwnOpacity();
            }
        },
        rebase (deltas, rebaseOptions = {}) {
            syncPending();
            flushDeferred();
            const time = rebaseOptions.at ?? now();
            const towards = expand(rebaseOptions.towards ?? {});
            const changed = [];
            const owners = new Set();
            for (const [property, delta] of Object.entries(expand(deltas))){
                if (delta === 0) {
                    continue;
                }
                const noted = shown.get(property);
                if (noted != null) {
                    noted.offset += delta;
                }
                const segment = segmentAt(property, time);
                if (segment == null) {
                    changed.push(property);
                    resting[property] = valueAt(property, time) + delta;
                    segments.delete(property);
                    continue;
                }
                owners.add(segment.owner);
                // A curve still waiting for the browser's start stays in its call:
                // it starts with that call's commit. A curve whose call had its first
                // frame is on screen already, so it leaves the call (leaveWaitingCall).
                const latest = shownSince(property, segment);
                const group = latest == null && segment.group != null && !segment.group.resolved ? segment.group : undefined;
                const replace = (next)=>{
                    if (group != null) {
                        replaceIn(group, segment, next);
                    }
                    segments.set(property, next);
                };
                const heading = towards[property];
                if (segment.spring != null && heading != null && Math.abs(segment.target + delta - heading) <= SAME_VALUE) {
                    // The spring keeps its course to the shifted target from its own
                    // start.
                    const whole = {
                        ...segment,
                        target: heading,
                        at: (t)=>segment.at(t) + delta
                    };
                    if (latest == null) {
                        changed.push(property);
                        replace(whole);
                        continue;
                    }
                    // While the browser has not told the start, only the model moves.
                    // The call that follows rebuilds the channel from it, or else the
                    // end of the task does.
                    const waiting = segment.group;
                    if (waiting != null && !waiting.resolved) {
                        replaceIn(waiting, segment, whole);
                        segments.set(property, whole);
                        markStale(CHANNEL_OF[property]);
                        continue;
                    }
                }
                changed.push(property);
                if (segment.spring != null) {
                    const from = valueAt(property, time) + delta;
                    const velocity = velocityAt(property, time);
                    if (latest != null) {
                        leaveWaitingCall(segment, CHANNEL_OF[property], latest);
                    }
                    const curve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solveSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSpring"])(segment.spring), {
                        from,
                        to: segment.target,
                        velocity
                    });
                    replace({
                        start: group?.provisional ?? time,
                        ...group != null ? {
                            group
                        } : {},
                        duration: Math.min(MAX_DURATION_MS, curve.settleTime(SETTLE_THRESHOLD[property]) * 1000),
                        target: segment.target,
                        at: (t)=>curve.value(t / 1000),
                        speed: (t)=>curve.velocity(t / 1000),
                        jumps: [],
                        owner: segment.owner,
                        spring: segment.spring
                    });
                } else {
                    if (latest != null) {
                        leaveWaitingCall(segment, CHANNEL_OF[property], latest);
                    }
                    replace({
                        ...segment,
                        source: undefined,
                        target: segment.target + delta,
                        at: (t)=>segment.at(t) + delta
                    });
                }
            }
            // A waiting channel shows its old curve, moved with the element, until
            // the frame that commits its call.
            commit(changed.filter((property)=>!heldForFrame.has(CHANNEL_OF[property])), time);
            for (const channel of new Set(changed.map((p)=>CHANNEL_OF[p]))){
                if (heldForFrame.has(channel)) {
                    rebuildShown(channel, time);
                }
            }
            // The handles that own the rebased curves finish at their new ends.
            for (const owner of owners){
                if (owner.settled || owner.timer == null) {
                    continue;
                }
                clearTimeout(owner.timer);
                let end = time;
                for (const segment of segments.values()){
                    if (segment.owner === owner) {
                        end = Math.max(end, segment.start + segment.duration);
                    }
                }
                owner.timer = setTimeout(()=>settleAtEnd(owner), Math.max(0, end - now()));
            }
        },
        async atRest (properties) {
            const list = properties == null ? PROPERTIES : expandList(properties);
            return new Promise((resolve)=>{
                const wait = {
                    timer: null,
                    settle: ()=>{}
                };
                const done = ()=>{
                    if (wait.timer != null) {
                        clearTimeout(wait.timer);
                    }
                    restWaits.delete(wait);
                    resolve();
                };
                wait.settle = done;
                restWaits.add(wait);
                const check = ()=>{
                    wait.timer = null;
                    syncPending();
                    const time = now();
                    let end = time;
                    for (const property of list){
                        const segment = segments.get(property);
                        if (segment != null) {
                            end = Math.max(end, segment.start + segment.duration);
                        }
                    }
                    if (landings.size > 0) {
                        // A Reduced Motion landing is still to come.
                        wait.timer = setTimeout(check, 16);
                    } else if (end <= time) {
                        done();
                    } else {
                        // A retarget or a later start moves the end: look again then.
                        wait.timer = setTimeout(check, end - time);
                    }
                };
                check();
            });
        },
        dispose () {
            flushDeferred();
            // A Reduce Motion move still waiting to land is written at its end
            // state, so the element is left visible where it was going (the node
            // just detached, when an unmount is pending); its call and the calls
            // it carries settle as interrupted.
            if (target == null && unmountQueued) {
                target = lastDetached;
            }
            lastDetached = null;
            unmountQueued = false;
            landPending(false);
            // Nothing moves any more: every atRest() wait settles.
            for (const wait of [
                ...restWaits
            ]){
                wait.settle();
            }
            const time = now();
            for (const property of PROPERTIES){
                interrupt(property, time);
            }
            for (const animation of running.values()){
                animation.cancel();
            }
            running.clear();
            stale.clear();
            forgetShown();
            heldForFrame.clear();
            for (const timer of retireTimers.values()){
                clearTimeout(timer);
            }
            retireTimers.clear();
            present(false);
            for (const timer of retireLooks.values()){
                clearTimeout(timer);
            }
            retireLooks.clear();
            retireFrames.clear();
            handBackBorrow();
            demote();
            cancelSheetWillChangeRead();
            target = null;
        }
    };
    animator.attach(element);
    return animator;
}
function expandList(properties) {
    const out = new Set();
    for (const property of properties){
        if (property === 'scale') {
            out.add('scaleX');
            out.add('scaleY');
        } else {
            out.add(property);
        }
    }
    return [
        ...out
    ];
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/bezier.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file bezier.ts
 * @input Cubic-bézier control points [x1, y1, x2, y2]
 * @output Exports `cubicBezier`, the timing function CSS and Core Animation
 *   define by those points (progress → eased progress)
 * @position Pure math under the animator (the Reduced Motion cross-fade runs
 *   on Core Animation's named curves); no DOM, no React
 *
 * The curve runs from (0, 0) to (1, 1) with the two given control points;
 * x is time, y is progress. Solved for x by Newton's method with a bisection
 * fallback, the approach browser engines use for CSS `cubic-bezier()`.
 *
 * SYNC: When modified, update /packages/core/src/motion/bezier.test.ts
 */ /** The timing function for `points`: maps time progress to eased progress. */ __turbopack_context__.s([
    "cubicBezier",
    ()=>cubicBezier
]);
function cubicBezier([x1, y1, x2, y2]) {
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;
    const sampleX = (t)=>((ax * t + bx) * t + cx) * t;
    const sampleY = (t)=>((ay * t + by) * t + cy) * t;
    const slopeX = (t)=>(3 * ax * t + 2 * bx) * t + cx;
    const solveT = (x)=>{
        let t = x;
        for(let i = 0; i < 8; i++){
            const error = sampleX(t) - x;
            if (Math.abs(error) < 1e-7) {
                return t;
            }
            const slope = slopeX(t);
            if (Math.abs(slope) < 1e-6) {
                break;
            }
            t -= error / slope;
        }
        let lo = 0;
        let hi = 1;
        t = x;
        for(let i = 0; i < 60; i++){
            const value = sampleX(t);
            if (Math.abs(value - x) < 1e-7) {
                break;
            }
            if (value < x) {
                lo = t;
            } else {
                hi = t;
            }
            t = (lo + hi) / 2;
        }
        return t;
    };
    return (x)=>x <= 0 ? 0 : x >= 1 ? 1 : sampleY(solveT(x));
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/carryAnimations.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "carryAnimations",
    ()=>carryAnimations,
    "restoreAnimations",
    ()=>restoreAnimations,
    "saveAnimation",
    ()=>saveAnimation,
    "saveAnimations",
    ()=>saveAnimations
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file carryAnimations.ts
 * @input The CSS animations and transitions of an element and its subtree,
 *   read before the browser starts them afresh
 * @output Exports `saveAnimations` and `carryAnimations`, which carry them on
 *   in a clone of the element. Also `saveAnimation` and `restoreAnimations`,
 *   which put them back after a display reset
 * @position Motion foundation; the transient copy (transientCopy.ts) and the
 *   layer runtime's re-placement (Layer/preserveAnimations.ts) use it
 */ /**
 * Animation members written in a fixed order rather than generically: the
 * timeline before the range that is measured on it, the rate before the
 * time, and the start time (or, for a paused animation, the current time)
 * last, once the play state is set. `effect` is not
 * replaced, because a CSS animation whose effect script replaces leaves the
 * stylesheet's control; its state is copied onto the new effect instead.
 */ const ORDERED = new Set([
    'effect',
    'timeline',
    'rangeStart',
    'rangeEnd',
    'playbackRate',
    'startTime',
    'currentTime'
]);
/** Every accessor with a setter on `object`'s prototype chain. */ function writableAccessors(object) {
    const names = new Set();
    for(let proto = Object.getPrototypeOf(object); proto != null && proto !== Object.prototype; proto = Object.getPrototypeOf(proto)){
        for (const [name, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(proto))){
            if (descriptor.set != null) {
                names.add(name);
            }
        }
    }
    return [
        ...names
    ];
}
/**
 * A textual form of a value that is compared by content rather than by
 * identity: a CSS numeric value (as in a timeline range offset) through its
 * serialization, a plain object (a range) through its members. Anything else
 * is compared by identity (`null`).
 */ function contentOf(value) {
    if (typeof CSSNumericValue !== 'undefined' && value instanceof CSSNumericValue) {
        return value.toString();
    }
    if (value != null && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
        return Object.entries(value).map(([key, inner])=>`${key}:${contentOf(inner) ?? String(inner)}`).join(';');
    }
    return null;
}
function differs(a, b) {
    if (a === b) {
        return false;
    }
    const textA = contentOf(a);
    return textA == null || textA !== contentOf(b);
}
function saveAnimation(animation) {
    const effect = animation.effect;
    const values = {};
    for (const name of writableAccessors(animation)){
        values[name] = animation[name];
    }
    const effectValues = {};
    if (effect != null) {
        for (const name of writableAccessors(effect)){
            effectValues[name] = effect[name];
        }
    }
    return {
        animation,
        name: animation.animationName ?? '',
        target: effect?.target ?? null,
        pseudoElement: effect?.pseudoElement ?? null,
        values,
        effectValues,
        timing: effect?.getTiming() ?? null,
        keyframes: effect?.getKeyframes() ?? null,
        playState: animation.playState,
        replaceState: animation.replaceState
    };
}
function write(object, name, value) {
    object[name] = value;
}
/** Give `next` the effect state `saved` had: every writable member. */ function restoreEffect(next, saved) {
    for (const name of writableAccessors(next)){
        if (name in saved.effectValues && differs(saved.effectValues[name], next[name])) {
            write(next, name, saved.effectValues[name]);
        }
    }
    if (saved.timing != null) {
        const timing = next.getTiming();
        const changed = {};
        for (const [field, value] of Object.entries(saved.timing)){
            if (differs(value, timing[field])) {
                changed[field] = value;
            }
        }
        if (Object.keys(changed).length > 0) {
            next.updateTiming(changed);
        }
    }
    if (saved.keyframes != null && JSON.stringify(saved.keyframes) !== JSON.stringify(next.getKeyframes())) {
        next.setKeyframes(saved.keyframes);
    }
}
/**
 * Gives `next` the start time `original` runs on, now or, while its play is
 * still pending, once that play starts. A pending play has no start time
 * yet: it resolves on the frame that first draws the animation.
 */ function followStart(next, original) {
    const take = ()=>{
        if (original.startTime != null && next.playState !== 'idle') {
            next.startTime = original.startTime;
        }
    };
    if (original.startTime != null) {
        take();
        return;
    }
    original.ready.then(take, ()=>undefined);
}
/** Give `next` the state `saved` had, member by member. */ function restore(next, saved) {
    const effect = next.effect;
    if (effect != null) {
        restoreEffect(effect, saved);
    }
    const current = next;
    for (const name of [
        'timeline',
        'rangeStart',
        'rangeEnd'
    ]){
        if (name in saved.values && differs(saved.values[name], current[name])) {
            write(next, name, saved.values[name]);
        }
    }
    for (const name of writableAccessors(next)){
        if (!ORDERED.has(name) && name in saved.values && differs(saved.values[name], current[name])) {
            write(next, name, saved.values[name]);
        }
    }
    if (saved.replaceState === 'persisted' && next.replaceState !== 'persisted') {
        next.persist();
    }
    const rate = saved.values.playbackRate;
    if (typeof rate === 'number' && rate !== next.playbackRate) {
        next.playbackRate = rate;
    }
    if (saved.playState === 'paused' && next.playState !== 'paused') {
        next.pause();
    } else if (saved.playState !== 'paused' && next.playState === 'paused') {
        next.play();
    }
    // A running animation is anchored to its timeline by its start time, which
    // carries its current time on exactly. A paused one has none and keeps its
    // current time. A finished one holds its end: finishing it again holds the
    // same time, though its start time is then counted from now, since script
    // cannot set a start time and a held time together.
    const start = saved.values.startTime;
    const time = saved.values.currentTime;
    if (saved.playState === 'finished') {
        next.finish();
    } else if (start != null) {
        next.startTime = start;
    } else if (time != null) {
        next.currentTime = time;
        // A running one saved while its play was pending had no start time yet.
        // It takes the start its original resolves to, so the two run in step.
        if (saved.playState === 'running') {
            followStart(next, saved.animation);
        }
    }
}
/** Resume a cancelled CSS transition with a script animation in its state. */ function resumeTransition(saved) {
    if (saved.target == null || saved.keyframes == null) {
        return;
    }
    const replacement = saved.target.animate(saved.keyframes, {
        pseudoElement: saved.pseudoElement ?? undefined
    });
    restore(replacement, saved);
}
function isTransition(animation) {
    return typeof CSSTransition !== 'undefined' && animation instanceof CSSTransition;
}
function isCssAnimation(animation) {
    return typeof CSSAnimation !== 'undefined' && animation instanceof CSSAnimation;
}
/**
 * Finishes an animation that ends: an infinite one cannot be finished, and is
 * left as it runs.
 */ function finishIfItEnds(animation) {
    const end = animation.effect?.getComputedTiming().endTime;
    if (end != null && Number.isFinite(Number(end)) && animation.playbackRate !== 0) {
        animation.finish();
    }
}
/** The members a copy's animation does not take: its element's keep them. */ const IDENTITY_MEMBERS = new Set([
    'id',
    'onfinish',
    'oncancel',
    'onremove'
]);
/**
 * `saved` for an animation that carries on on the copy of its element:
 * aimed at the copy, without the element's id and event handlers.
 */ function retarget(saved, copyOf) {
    const target = saved.target == null ? null : copyOf(saved.target);
    if (target == null) {
        return null;
    }
    const values = Object.fromEntries(Object.entries(saved.values).filter(([name])=>!IDENTITY_MEMBERS.has(name)));
    const effectValues = {
        ...saved.effectValues
    };
    if ('target' in effectValues) {
        effectValues.target = target;
    }
    return {
        ...saved,
        target,
        values,
        effectValues
    };
}
function restoreAnimations(root, saved, survivors) {
    const after = root.getAnimations({
        subtree: true
    });
    const current = new Set(after);
    const cancelled = [];
    for (const state of saved){
        if (current.has(state.animation)) {
            continue;
        }
        if (isTransition(state.animation)) {
            resumeTransition(state);
        } else {
            cancelled.push(state);
        }
    }
    const recreated = after.filter((animation)=>(isCssAnimation(animation) || isTransition(animation)) && !survivors.has(animation));
    const unmatched = [];
    for (const animation of recreated){
        const effect = animation.effect;
        const name = animation.animationName ?? '';
        const index = cancelled.findIndex((state)=>state.name === name && state.target === (effect?.target ?? null) && state.pseudoElement === (effect?.pseudoElement ?? null));
        if (index === -1) {
            unmatched.push(animation);
        } else {
            restore(animation, cancelled.splice(index, 1)[0]);
        }
    }
    for (const animation of unmatched){
        const name = animation.animationName ?? '';
        const index = cancelled.findIndex((state)=>state.name === name);
        if (index === -1) {
            finishIfItEnds(animation);
        } else {
            restore(animation, cancelled.splice(index, 1)[0]);
        }
    }
}
function saveAnimations(root) {
    if (typeof root.getAnimations !== 'function') {
        return [];
    }
    return root.getAnimations({
        subtree: true
    }).filter((animation)=>isCssAnimation(animation) || isTransition(animation)).map(saveAnimation);
}
function carryAnimations(saved, copy, copyOf) {
    if (typeof copy.getAnimations !== 'function') {
        return;
    }
    restoreAnimations(copy, saved.flatMap((state)=>retarget(state, copyOf) ?? []), new Set());
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/frameBlock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file frameBlock.ts
 * @input none
 * @output LATE_START_MS
 * @position The motion modules' shared measure of a main-thread block.
 */ /**
 * How long a task must run on past a frame, or past its first call from rest,
 * to count as a block. It is two frames at 60 Hz. Browser start times are
 * frame times, while a task's end is on a live clock. So only a block longer
 * than a frame plus the task's own length stands out from that quantization.
 */ __turbopack_context__.s([
    "LATE_START_MS",
    ()=>LATE_START_MS
]);
const LATE_START_MS = 34;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/linearEasing.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "linearEasing",
    ()=>linearEasing,
    "sampleCount",
    ()=>sampleCount
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file linearEasing.ts
 * @input A duration and the fraction of a move done at each time
 * @output Exports `linearEasing`, that curve as CSS `linear()` easing text,
 *   and `sampleCount`, how many samples cover a duration at 60 per second
 * @position Pure math under the motion helpers; no DOM, no React
 */ /** Samples per second of a sampled curve: one per frame at 60 Hz. */ const SAMPLES_PER_SECOND = 60;
function sampleCount(durationMs) {
    return Math.max(2, Math.ceil(durationMs / 1000 * SAMPLES_PER_SECOND) + 1);
}
function linearEasing(durationMs, done) {
    const count = sampleCount(durationMs);
    const stops = [];
    for(let i = 0; i < count; i++){
        const value = done(i / (count - 1) * durationMs);
        stops.push(String(Math.round(value * 10000) / 10000));
    }
    return `linear(${stops.join(', ')})`;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/presentation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "batchPresented",
    ()=>batchPresented,
    "clearPresentedResolve",
    ()=>clearPresentedResolve,
    "presentedElements",
    ()=>presentedElements,
    "presentedOffsetOf",
    ()=>presentedOffsetOf,
    "registerPresentedOffset",
    ()=>registerPresentedOffset,
    "resolvePresented",
    ()=>resolvePresented,
    "watchPresentedElements",
    ()=>watchPresentedElements,
    "writePresentedResolve",
    ()=>writePresentedResolve
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file presentation.ts
 * @input Animators reporting, while a translate runs on the compositor, how
 *   far their element is drawn from where the engine hit-tests it, and how
 *   to make the engine hit-test it where it is drawn
 * @output The registry that the gesture host reads at touch-down, to send a
 *   touch to what is drawn. The host also follows it to keep a drag on a
 *   moving element blocking. Exports: registerPresentedOffset,
 *   batchPresented, presentedElements, presentedOffsetOf, resolvePresented,
 *   watchPresentedElements and the resolve write
 * @position Motion foundation (DOM, no React). Written by animator.ts and
 *   animatedLayout.ts, read by gestures/GestureHost.ts; internal to core
 *
 * iOS WebKit hit-tests an element that a Web Animations transform moves on
 * the compositor where the animation STARTED: it keeps the transform it
 * resolved when the animation went to the compositor, so event targets,
 * `elementFromPoint` and `getBoundingClientRect` stay there for the whole
 * curve, while the inline style holds the value the curve starts from (the
 * animator writes it there while the curve runs) and the computed style is
 * live (iOS 26.2, measured). A style write on the element makes it
 * resolve the transform again, to the value drawn at that moment, and it
 * stays there. UIKit keeps an interruptible animation hit-testable where it
 * is drawn (UIViewPropertyAnimator), so the host corrects for it from this
 * registry.
 *
 * Translation only: a scale or a rotation (a zoom transition, a lifted
 * preview) is still hit at its untransformed box.
 *
 * An engine workaround (`spec:AST-013` FR6). Review condition: re-measure on
 * each iOS release, and remove this registry and the host's correction once
 * iOS WebKit hit-tests a compositor-moved element where it is drawn.
 * Regression fixture: gestures/__tests__/presentedHitTesting.test.ts.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/flatTree.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/nodeType.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-client] (ecmascript)");
;
;
;
/** How far an element is drawn from where the engine hit-tests it, CSS px. */ /** What an animator reports for an element it is moving. */ const ZERO = {
    x: 0,
    y: 0
};
// Registered, so the gesture host hit-tests elements a swizzled copy moves
// as it does the package's.
const presented = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["realmValue"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sharedKey"])('motion/presentation', 1), ()=>({
        sources: new Map(),
        watchers: new Set(),
        // Inside batchPresented, a change waits for the batch's end.
        batchDepth: 0,
        isChanged: false
    }));
const { sources, watchers } = presented;
/** Tell every watcher the reported elements changed; one's throw stops none. */ function notifyWatchers() {
    if (presented.batchDepth > 0) {
        presented.isChanged = true;
        return;
    }
    for (const watcher of [
        ...watchers
    ]){
        try {
            watcher();
        } catch (error) {
            queueMicrotask(()=>{
                throw error;
            });
        }
    }
}
function batchPresented(apply) {
    presented.batchDepth += 1;
    try {
        apply();
    } finally{
        presented.batchDepth -= 1;
        if (presented.batchDepth === 0 && presented.isChanged) {
            presented.isChanged = false;
            notifyWatchers();
        }
    }
}
function watchPresentedElements(listener) {
    watchers.add(listener);
    return ()=>{
        watchers.delete(listener);
    };
}
function registerPresentedOffset(element, source) {
    sources.set(element, source);
    notifyWatchers();
    return ()=>{
        if (sources.get(element) === source) {
            sources.delete(element);
            notifyWatchers();
        }
    };
}
function presentedElements() {
    return sources.size === 0 ? [] : [
        ...sources.keys()
    ];
}
function presentedOffsetOf(element, time) {
    if (sources.size === 0) {
        return ZERO;
    }
    let x = 0;
    let y = 0;
    for(let node = element; node != null; node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parentAcrossShadow"])(node)){
        const source = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(node) ? sources.get(node) : undefined;
        if (source != null) {
            const offset = source.offset(time);
            x += offset.x;
            y += offset.y;
        }
    }
    return {
        x,
        y
    };
}
/** The custom property whose writes make WebKit resolve a moving element. */ const RESOLVE_PROPERTY = '--astryx-presented';
function writePresentedResolve(element) {
    const last = Number(element.style.getPropertyValue(RESOLVE_PROPERTY)) || 0;
    element.style.setProperty(RESOLVE_PROPERTY, String(last + 1));
}
function clearPresentedResolve(element) {
    element.style.removeProperty(RESOLVE_PROPERTY);
}
function resolvePresented(elements) {
    for (const element of elements){
        sources.get(element)?.resolve();
    }
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/progress.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mapProgress",
    ()=>mapProgress,
    "mapRange",
    ()=>mapRange,
    "presentedProgressVelocity",
    ()=>presentedProgressVelocity,
    "progressCurve",
    ()=>progressCurve
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file progress.ts
 * @input A spring, a normalized progress, an animator's presented velocities
 * @output Exports `progressCurve` (a spring's progress from 0 to 1 as a
 *   MotionCurve), `mapProgress` (one curve as a function of another),
 *   `mapRange` (the clamped linear map most companions use) and
 *   `presentedProgressVelocity` (the progress velocity that continues what
 *   an animator shows)
 * @position Shared by the motion building blocks that move several channels
 *   along one path and by companion motion (a
 *   scrim's dim following a sheet): one velocity unit, one curve mapping and
 *   one way to continue an interrupted motion
 *
 * A path is described by a normalized progress: 0 where it starts, 1 where
 * it rests, beyond either end on a spring's overshoot. Its velocity is in
 * progress per second; each channel's own velocity stays in the channel's
 * units per second.
 *
 * An interrupted motion continues from what is on screen: the
 * block reads the presented values and velocities from the animator at one
 * `now` (`get`, `getVelocity`), restarts a path from those values, and starts
 * its progress with the presented velocity projected on the path's tangent
 * at its start, v·t / (t·t), where t = d(values)/dp. Channels are weighted
 * into one unit first (px per unit of scale, say), so a scale and a
 * translation count alike.
 *
 * A companion follows a driving curve through `mapProgress`, most often
 * with `mapRange`: `mapProgress(sheetY, mapRange([closedY, openY], [0, dim]))`
 * dims a scrim as a sheet rises. Played on another animator, it stays in
 * lockstep only when it starts with its driver: pass the driver's start,
 * `scrim.play({opacity}, {at: start})` with `start = await handle.started`
 * (or one shared `at` for both calls); two calls from rest otherwise each
 * start at their own commit.
 *
 * SYNC: When modified, update /packages/core/src/motion/progress.test.ts and
 * /packages/core/src/motion/README.md.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/spring.js [app-client] (ecmascript)");
;
/** The step of the finite differences taken on a progress. */ const STEP = 1e-4;
function progressCurve(spring, { velocity = 0, epsilon = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SETTLING_EPSILON"] } = {}) {
    const curve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solveSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSpring"])(spring), {
        from: 0,
        to: 1,
        velocity
    });
    const duration = curve.settleTime(epsilon);
    return {
        duration,
        at: (t)=>t >= duration ? 1 : curve.value(t),
        velocity: (t)=>t >= duration ? 0 : curve.velocity(t)
    };
}
function mapProgress(driver, f) {
    return {
        duration: driver.duration,
        at: (t)=>f(driver.at(t)),
        velocity: (t)=>{
            const value = driver.at(t);
            return (f(value + STEP) - f(value - STEP)) / (2 * STEP) * driver.velocity(t);
        }
    };
}
function mapRange(input, output, { clamp = true } = {}) {
    const [a, b] = input;
    const [c, d] = output;
    return (x)=>{
        let t = a === b ? x < a ? 0 : 1 : (x - a) / (b - a);
        if (clamp) {
            t = Math.min(1, Math.max(0, t));
        }
        // Exact at both ends.
        return t === 0 ? c : t === 1 ? d : c + (d - c) * t;
    };
}
function presentedProgressVelocity(animator, channels, now) {
    let along = 0;
    let squared = 0;
    for (const channel of channels){
        const weight = channel.weight ?? 1;
        const tangent = (channel.at(STEP) - channel.at(0)) / STEP * weight;
        along += animator.getVelocity(channel.property, now) * weight * tangent;
        squared += tangent * tangent;
    }
    return squared > 1e-12 ? along / squared : 0;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/reducedMotion.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file reducedMotion.stylex.ts
 * @input StyleX constant definitions
 * @output reducedMotionFadeConsts (the Reduced Motion cross-fade's duration
 *   and easing) for StyleX transitions, and reducedMotionKeys (its two media
 *   keys, which a transition spells literally)
 * @position The CSS side of the Reduced Motion policy (reducedMotion.ts):
 *   values a transition takes under its two Reduce Motion media keys
 *
 * Constants, not theme variables: no theme lengthens the fade
 * (design:reduced-motion DR4). They equal `timing.reducedMotionCrossFadeMs`
 * and `timing.curves.move`, which reducedMotion.test.ts checks.
 *
 * SYNC: When modified, update /packages/core/src/motion/uikit/timing.ts and
 * /packages/core/src/motion/reducedMotion.test.ts.
 */ __turbopack_context__.s([
    "reducedMotionFadeConsts",
    ()=>reducedMotionFadeConsts,
    "reducedMotionKeys",
    ()=>reducedMotionKeys
]);
;
const reducedMotionFadeConsts = {
    duration: "200ms",
    easing: "cubic-bezier(0.42, 0, 0.58, 1)"
};
const reducedMotionKeys = {
    fade: "@media (prefers-reduced-motion: reduce) and (pointer: coarse)",
    instant: "@media (prefers-reduced-motion: reduce) and (not (pointer: coarse))"
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/reducedMotionPlan.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TRAVEL_PROPERTIES",
    ()=>TRAVEL_PROPERTIES,
    "planReducedMotion",
    ()=>planReducedMotion
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file reducedMotionPlan.ts
 * @input A call's targets and a read-only view of the animator's opacity
 *   state
 * @output planReducedMotion, TRAVEL_PROPERTIES and the plan's types
 * @position The animator's Reduce Motion planner (packages/core/src/motion):
 *   what one call becomes under Reduce Motion. animator.ts applies the plan;
 *   the policy itself is described in its header (design:reduced-motion
 *   DR1–DR4).
 *
 * With `fade` (a coarse primary pointer, or a touch drag's release), a call
 * becomes an opacity-only cross-fade whose travel lands while the element is
 * transparent: an entrance from 0 lands at once and fades in, an exit to 0
 * fades out in place and then lands, and any other call that moves dips
 * (fades out, lands, fades back in). Without `fade`, everything lands at once. When no call owns
 * the opacity, a dip or a fade by role starts from and returns to the
 * element's own (stylesheet) opacity, which the plan reports as `borrowed`.
 * The planner is pure: it reads the animator only through
 * `ReducedMotionView` and returns what to write.
 *
 * SYNC: When modified, update animator.ts (its header's Reduce Motion
 * section, and `reducedMotion`, which applies the plan) and animator.test.ts.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$timing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/timing.js [app-client] (ecmascript)");
;
const TRAVEL_PROPERTIES = [
    'x',
    'y',
    'rotate',
    'scaleX',
    'scaleY'
];
/** A point of the opacity fade: ms after the call's start, and the value. */ /** The travel a plan writes later, while the element is transparent. */ /** What the planner reads of the animator, at the call's time. */ /** What Reduce Motion makes of a call. */ /** The opacity no call has changed. */ const IDENTITY_OPACITY = 1;
function planReducedMotion(view, time, targets, properties, fade, role) {
    const holds = {};
    if (!fade) {
        return {
            atOnce: [
                ...properties
            ],
            opacityFade: null,
            holds,
            landing: null
        };
    }
    const atOnce = properties.filter((property)=>TRAVEL_PROPERTIES.includes(property));
    const opacityNow = view.valueAt('opacity', time);
    // A fade the call does not name keeps going where it was heading.
    const opacityTo = targets.opacity ?? view.opacityHeading();
    const travel = properties.filter((property)=>TRAVEL_PROPERTIES.includes(property) && Math.abs(targets[property] - view.valueAt(property, time)) > 1e-9);
    // Only the call's own opacity (or its role) makes it an entrance or an
    // exit: a fade it does not name, such as a dip still running, does not.
    const named = targets.opacity != null;
    let entering = named && opacityTo > opacityNow + 1e-6;
    let leaving = named && opacityTo < opacityNow - 1e-6;
    let fadeFrom = opacityNow;
    let fadeTo = opacityTo;
    let restore = null;
    // A fade by role on a surface no call owns opacity on starts from, or
    // returns to, the element's own (stylesheet) opacity, as a dip does.
    const roleBorrow = role != null && !named && view.borrowedOpacity == null && !view.hasOpacityCurve && view.restingOpacity === IDENTITY_OPACITY && !view.writesOwnOpacity() ? view.ownOpacity() : null;
    if (!entering && !leaving && role === 'entrance') {
        entering = true;
        // From transparent, or from where a running fade (an exit caught
        // midway) has it.
        fadeFrom = view.hasOpacityCurve ? opacityNow : 0;
        fadeTo = roleBorrow ?? opacityTo;
    } else if (!entering && !leaving && role === 'exit') {
        leaving = true;
        fadeFrom = roleBorrow ?? opacityNow;
        fadeTo = 0;
        restore = roleBorrow ?? opacityTo;
    }
    // A move still waiting to land (an earlier dip's) lands at this call's
    // invisible moment, never while the element shows.
    const pending = view.hasPendingLanding;
    // Not a role: nothing lengthens it (design:reduced-motion DR4).
    const ms = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$timing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reducedMotionCrossFade"].durationMs;
    const landsLater = (at, fadeIn)=>{
        const values = new Map();
        for (const property of travel){
            holds[property] = view.valueAt(property, time);
            values.set(property, targets[property]);
        }
        return {
            at,
            values,
            fadeIn,
            restore,
            ...roleBorrow != null && restore != null ? {
                restoreIsBorrowed: true
            } : {}
        };
    };
    // A call that names the opacity a waiting dip returns to, and names no
    // travel, joins that dip: the fade goes on as it was and the call settles
    // when the dip ends. A second dip, opened from where the first had got
    // to, would fade the element out twice.
    if (named && view.hasWaitingDip && !properties.some((property)=>TRAVEL_PROPERTIES.includes(property)) && Math.abs(opacityTo - view.opacityHeading()) < 1e-6) {
        return {
            atOnce: [],
            opacityFade: null,
            holds,
            landing: null,
            joins: true
        };
    }
    // Travel lands only while the element is transparent (DR1, DR2): an
    // entrance that starts visible, or an exit that ends visible, dips instead
    // when it has travel or a waiting landing to carry.
    const carries = travel.length > 0 || pending;
    if (entering && !pending && (!carries || fadeFrom <= 1e-6)) {
        // Lands at once (the travel is written at once) and fades in.
        return {
            atOnce,
            opacityFade: [
                {
                    at: 0,
                    value: fadeFrom
                },
                {
                    at: ms,
                    value: fadeTo
                }
            ],
            holds,
            landing: null,
            borrowed: roleBorrow
        };
    }
    if (leaving && (!carries || fadeTo <= 1e-6)) {
        // Fades out in place, then lands.
        const opacityFade = [
            {
                at: 0,
                value: fadeFrom
            },
            {
                at: ms,
                value: fadeTo
            }
        ];
        return {
            atOnce,
            opacityFade,
            holds,
            landing: travel.length > 0 || restore != null || pending ? landsLater(ms, null) : null
        };
    }
    if (carries) {
        // A dip: fades out, lands while transparent, fades back in. When no
        // call owns opacity it starts from and returns to the element's own
        // (stylesheet) opacity, not the model's 1.
        // A dip still running on borrowed opacity (its fade out or back in)
        // lends the same borrow to the next one: overlapping dips never pin
        // the stylesheet's value inline.
        const priorBorrow = view.borrowedOpacity;
        // An opacity the animator left inline (a `set` over a stylesheet that
        // hides or dims the element) is owned too: a dip returns to it.
        const ownsOpacity = named || priorBorrow == null && (view.hasOpacityCurve || view.restingOpacity !== IDENTITY_OPACITY || view.writesOwnOpacity());
        const borrowed = ownsOpacity ? null : priorBorrow ?? view.ownOpacity();
        if (borrowed != null && borrowed <= 1e-6) {
            // A stylesheet that hides the element lends nothing: invisible, the
            // move lands at once, with no dip.
            return {
                atOnce,
                opacityFade: null,
                holds,
                landing: null
            };
        }
        // It opens at the opacity on screen: an earlier dip's, when one is
        // still running, else the borrowed stylesheet value.
        const opacityFade = [
            {
                at: 0,
                value: view.hasOpacityCurve ? opacityNow : borrowed ?? opacityNow
            },
            {
                at: ms / 2,
                value: 0
            }
        ];
        const landing = landsLater(ms / 2, {
            to: borrowed ?? opacityTo,
            ms: ms / 2,
            isBorrowed: borrowed != null
        });
        return {
            atOnce,
            opacityFade,
            holds,
            landing,
            borrowed
        };
    }
    return {
        atOnce: 'opacity' in targets ? [
            ...atOnce,
            'opacity'
        ] : atOnce,
        opacityFade: null,
        holds,
        landing: null
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/resolveMotion.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveMotion",
    ()=>resolveMotion,
    "resolveMoveTiming",
    ()=>resolveMoveTiming,
    "resolveSettleMs",
    ()=>resolveSettleMs
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file resolveMotion.ts
 * @input A motion role: a spring or curve of a registered motion table, or a
 *   table group and the key of one of its values. The element the motion
 *   plays on, for its theme's tempo (themeTempo.ts)
 * @output resolveMotion: the role's value at the theme's tempo.
 *   resolveSettleMs: how long a spring role, or one move on it, takes to
 *   settle there, for a CSS part that plays with it. resolveMoveTiming: that
 *   move's duration and its progress as CSS easing
 * @position Motion foundation; the animator resolves every spring and curve
 *   it is handed with it, and components resolve the durations they time
 *   with it
 *
 * Every touch motion passes through here, so the role a value plays is named
 * in one place. The per-role tables stay internal (`spec:AST-094` DEC-15).
 * Nothing reads a role's own CSS variable, and no page or theme style sets a
 * role. Nothing here reads layout, listens or observes, imports a table, or
 * runs on import or on the server.
 *
 * The value plays at the tempo of the theme the element is in. The tempo
 * stretches a spring and scales a duration. A curve, a part that follows a
 * finger, and a busy loop play as measured. At tempo 1 every role plays
 * exactly its table value.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/motion/resolveMotion.test.ts
 * - /packages/core/src/motion/animator.ts (resolves each role it plays)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/roles.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roleValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/roleValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/spring.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$linearEasing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/linearEasing.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$themeTempo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/themeTempo.js [app-client] (ecmascript)");
;
;
;
;
;
/**
 * The roles the tempo leaves as measured: the parts that follow a finger,
 * and ProgressBar's busy loop.
 */ const FIXED_ROLES = new Set([
    'springs.fingerTracking',
    'switchControl.tracking',
    'progress.reducedMotionPulseMs'
]);
/** Each role spring at each tempo, so a role resolves to one object per tempo. */ const springsAtTempo = new WeakMap();
/**
 * `spring` at `tempo`. In each of its forms, the undamped period grows by the
 * tempo and the damping ratio stays. So the motion keeps its shape and takes
 * `tempo` times as long.
 */ function springAtTempo(spring, tempo) {
    let byTempo = springsAtTempo.get(spring);
    if (byTempo == null) {
        byTempo = new Map();
        springsAtTempo.set(spring, byTempo);
    }
    let scaled = byTempo.get(tempo);
    if (scaled == null) {
        if ('response' in spring) {
            scaled = {
                response: spring.response * tempo,
                dampingRatio: spring.dampingRatio
            };
        } else if ('duration' in spring) {
            scaled = {
                duration: spring.duration * tempo,
                bounce: spring.bounce
            };
        } else {
            scaled = {
                ...spring.mass == null ? null : {
                    mass: spring.mass
                },
                stiffness: spring.stiffness / (tempo * tempo),
                damping: spring.damping / tempo
            };
        }
        byTempo.set(tempo, scaled);
    }
    return scaled;
}
function resolveMotion(element, leafOrGroup, key) {
    const value = key === undefined ? leafOrGroup : leafOrGroup[key];
    const role = key === undefined ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motionRoleOf"])(leafOrGroup) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motionRoleIn"])(leafOrGroup, key);
    if (role == null || role.kind === 'curve' || FIXED_ROLES.has(role.id)) {
        return value;
    }
    const tempo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$themeTempo$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeTempo"])(element);
    if (tempo === 1) {
        return value;
    }
    if (typeof value === 'number') {
        return value * tempo;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roleValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSpring"])(value) ? springAtTempo(value, tempo) : value;
}
function resolveSettleMs(element, spring, move) {
    const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSpring"])(resolveMotion(element, spring));
    return move == null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["settlingDuration"])(resolved) * 1000 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solveSpring"])(resolved, move).settleTime(move.epsilon) * 1000;
}
function resolveMoveTiming(element, spring, move, doneAt = move.to) {
    const curve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solveSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSpring"])(resolveMotion(element, spring)), move);
    const durationMs = curve.settleTime(move.epsilon) * 1000;
    const span = doneAt - move.from;
    if (span === 0 || durationMs === 0) {
        return {
            durationMs,
            easing: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$linearEasing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linearEasing"])(durationMs, ()=>1)
        };
    }
    const progressAt = (t)=>(curve.value(t / 1000) - move.from) / span;
    // The first millisecond at which the move reaches `doneAt`, if it does.
    let reachedAt = Infinity;
    for(let t = 0; t <= durationMs; t++){
        if (progressAt(t) >= 1) {
            reachedAt = t;
            break;
        }
    }
    return {
        durationMs,
        easing: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$linearEasing$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linearEasing"])(durationMs, (t)=>t >= reachedAt ? 1 : progressAt(t))
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/roleValue.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatMotionRoleValue",
    ()=>formatMotionRoleValue,
    "isCurve",
    ()=>isCurve,
    "isMotionRoleId",
    ()=>isMotionRoleId,
    "isSpring",
    ()=>isSpring,
    "motionRoleVariable",
    ()=>motionRoleVariable,
    "short",
    ()=>short
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file roleValue.ts
 * @input A role id, or a role's kind and value
 * @output isMotionRoleId, motionRoleVariable and formatMotionRoleValue (a
 *   role value's CSS form), with the role kinds
 * @position The value half of the internal motion roles: no registry and
 *   no parsing. roles.ts holds the registry and re-exports these.
 *
 * SYNC: When modified, update /packages/core/src/motion/roles.test.ts.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/spring.js [app-client] (ecmascript)");
;
/** The three kinds of value a role can hold. */ /** Cubic-bézier control points `[x1, y1, x2, y2]`. */ const ROLE_ID = /^[a-z][A-Za-z0-9]*(\.[a-z][A-Za-z0-9]*)+$/;
function isMotionRoleId(id) {
    return ROLE_ID.test(id);
}
function motionRoleVariable(id) {
    if (!isMotionRoleId(id)) {
        throw new Error(`motion role "${id}" must be a dotted table path such as "springs.sheetPresent"`);
    }
    return `--motion-${id.split('.').map((part)=>part.replace(/[A-Z]/g, (c)=>`-${c.toLowerCase()}`)).join('-')}`;
}
function isSpring(value) {
    if (value === null || typeof value !== 'object' || Array.isArray(value)) {
        return false;
    }
    return 'response' in value && 'dampingRatio' in value || 'duration' in value && 'bounce' in value || 'stiffness' in value && 'damping' in value;
}
function isCurve(value) {
    return Array.isArray(value) && value.length === 4 && value.every((n)=>typeof n === 'number');
}
function short(n) {
    return String(Number(n.toPrecision(6)));
}
function formatMotionRoleValue(kind, value) {
    if (kind === 'spring') {
        if (!isSpring(value)) {
            throw new TypeError('a spring is {response, dampingRatio}, {duration, bounce} or {mass?, stiffness, damping}');
        }
        const { duration, bounce } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["durationBounceOf"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSpring"])(value));
        if (!(bounce < 1)) {
            throw new RangeError('a spring must settle: its bounce must be below 1 (a damping ratio above 0)');
        }
        return `${short(duration)}s ${short(bounce)}`;
    }
    if (kind === 'duration') {
        if (!(typeof value === 'number' && Number.isFinite(value) && value >= 0)) {
            throw new TypeError('a duration is a finite number of milliseconds ≥ 0');
        }
        return `${short(value)}ms`;
    }
    if (!isCurve(value) || !value.every(Number.isFinite)) {
        throw new TypeError('a curve is four finite numbers [x1, y1, x2, y2]');
    }
    if (value[0] < 0 || value[0] > 1 || value[2] < 0 || value[2] > 1) {
        throw new RangeError("a curve's x1 and x2 must lie in [0, 1]");
    }
    return `cubic-bezier(${value.map(short).join(', ')})`;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/roles.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "listMotionRoles",
    ()=>listMotionRoles,
    "motionRole",
    ()=>motionRole,
    "motionRoleIn",
    ()=>motionRoleIn,
    "motionRoleOf",
    ()=>motionRoleOf,
    "parseCssEasing",
    ()=>parseCssEasing,
    "parseMotionRoleValue",
    ()=>parseMotionRoleValue,
    "registerMotionTable",
    ()=>registerMotionTable,
    "registerSpringRole",
    ()=>registerSpringRole
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file roles.ts
 * @input The motion tables (motion/uikit and each component's own table)
 * @output registerMotionTable, motionRoleOf, motionRoleIn, listMotionRoles,
 *   motionRoleVariable, and the CSS form of a role's value
 *   (formatMotionRoleValue, parseMotionRoleValue), and parseCssEasing for a
 *   CSS transition's easing
 * @position Motion foundation, internal to core: read by the code that
 *   resolves a role when a motion starts. No public API writes a role: touch
 *   motion stays internal until the public motion-token set is decided.
 *
 * A motion role is one value of a motion table: a
 * spring, a duration (a key ending in `Ms`, in milliseconds) or a curve (four
 * cubic-bézier control points). The roles are the ones `spec:AST-094` FR4
 * names, each by its table path, such as `springs.settle` or
 * `timing.curves.move`: a table lists its roles when it registers, and every
 * other value, a component's measured spring included, stays an internal
 * constant. No shipped component reads the roles yet.
 * A role is carried by one CSS custom property, `--motion-` followed by its id
 * in kebab case (`--motion-springs-settle`), which nothing public writes; an
 * empty property means the table's value, so the table stays the one measured
 * source of every value.
 *
 * Gesture thresholds, the velocity filter, the timings that decide who gets a
 * touch and haptics are not motion: they are not roles (tables leave them out
 * with `exclude`).
 *
 * SYNC: When modified, update /packages/core/src/motion/roles.test.ts.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roleValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/roleValue.js [app-client] (ecmascript)");
;
;
/** One registered role. */ const rolesById = new Map();
/** A table id → the table registered under it. */ const tablesById = new Map();
/** A spring or curve leaf → its role. */ const roleOfLeaf = new WeakMap();
/** A table or one of its groups → its path. */ const pathOfGroup = new WeakMap();
/** A table path → the role id it is registered under, when renamed. */ const roleIdOfPath = new Map();
function registerMotionTable(id, table, { roles = [], exclude = [], rename = {} } = {}) {
    if (!/^[a-z][A-Za-z0-9]*$/.test(id)) {
        throw new Error(`motion table id "${id}" must be one camelCase word`);
    }
    // Registering the same table again changes nothing: each table's
    // register function may run from every touch module that uses it.
    if (tablesById.get(id) === table) {
        return;
    }
    tablesById.set(id, table);
    const skip = new Set(exclude.map((path)=>`${id}.${path}`));
    const listed = new Set(roles.map((name)=>`${id}.${name}`));
    const walk = (group, prefix)=>{
        pathOfGroup.set(group, prefix);
        for (const [key, value] of Object.entries(group)){
            const path = `${prefix}.${key}`;
            if (skip.has(path)) {
                continue;
            }
            let kind = null;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roleValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSpring"])(value)) {
                kind = 'spring';
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roleValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCurve"])(value)) {
                kind = 'curve';
            } else if (typeof value === 'number' && key.endsWith('Ms')) {
                kind = 'duration';
            } else if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
                walk(value, path);
                continue;
            }
            if (kind == null) {
                continue;
            }
            const relative = path.slice(id.length + 1);
            const roleId = relative in rename ? `${id}.${rename[relative]}` : path;
            // Only the roles the table lists; every other value stays internal.
            if (!listed.has(roleId)) {
                continue;
            }
            if (roleId !== path) {
                roleIdOfPath.set(path, roleId);
            }
            let leaf = value;
            if (typeof leaf === 'object') {
                const taken = roleOfLeaf.get(leaf);
                if (taken != null && taken.id !== roleId) {
                    leaf = Object.freeze(Array.isArray(leaf) ? [
                        ...leaf
                    ] : {
                        ...leaf
                    });
                    group[key] = leaf;
                }
            }
            const role = {
                id: roleId,
                kind,
                variable: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roleValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motionRoleVariable"])(roleId),
                value: leaf
            };
            rolesById.set(roleId, role);
            if (typeof leaf === 'object') {
                roleOfLeaf.set(leaf, role);
            }
        }
    };
    walk(table, id);
}
function registerSpringRole(id, leaf) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roleValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionRoleId"])(id)) {
        throw new Error(`motion role "${id}" must be a dotted table path such as "springs.settle"`);
    }
    if (roleOfLeaf.get(leaf)?.id !== id) {
        const role = {
            id,
            kind: 'spring',
            variable: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roleValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motionRoleVariable"])(id),
            value: leaf
        };
        rolesById.set(id, role);
        roleOfLeaf.set(leaf, role);
    }
    return leaf;
}
function motionRoleOf(leaf) {
    return leaf !== null && typeof leaf === 'object' ? roleOfLeaf.get(leaf) : undefined;
}
function motionRoleIn(group, key) {
    const prefix = pathOfGroup.get(group);
    if (prefix == null) {
        return undefined;
    }
    const path = `${prefix}.${key}`;
    return rolesById.get(roleIdOfPath.get(path) ?? path);
}
function motionRole(id) {
    return rolesById.get(id);
}
function listMotionRoles() {
    return [
        ...rolesById.values()
    ].sort((a, b)=>a.id < b.id ? -1 : 1);
}
const NUMBER = '(-?(?:\\d+\\.?\\d*|\\.\\d+)(?:e-?\\d+)?)';
const SPRING_VALUE = new RegExp(`^${NUMBER}s\\s+${NUMBER}$`);
const DURATION_VALUE = new RegExp(`^${NUMBER}(ms|s)$`);
const CURVE_VALUE = new RegExp(`^cubic-bezier\\(\\s*${NUMBER}\\s*,\\s*${NUMBER}\\s*,\\s*${NUMBER}\\s*,\\s*${NUMBER}\\s*\\)$`);
function parseMotionRoleValue(kind, text) {
    const value = text.trim();
    if (value === '') {
        return null;
    }
    if (kind === 'spring') {
        const m = SPRING_VALUE.exec(value);
        if (m == null) {
            return null;
        }
        const duration = Number(m[1]);
        const bounce = Number(m[2]);
        // A bounce of 1 is undamped: it never settles.
        return duration > 0 && bounce > -1 && bounce < 1 ? {
            duration,
            bounce
        } : null;
    }
    if (kind === 'duration') {
        const m = DURATION_VALUE.exec(value);
        if (m == null) {
            return null;
        }
        const ms = Number(m[1]) * (m[2] === 's' ? 1000 : 1);
        return ms >= 0 ? ms : null;
    }
    const m = CURVE_VALUE.exec(value);
    if (m == null) {
        return null;
    }
    const points = [
        m[1],
        m[2],
        m[3],
        m[4]
    ].map(Number);
    return points[0] >= 0 && points[0] <= 1 && points[2] >= 0 && points[2] <= 1 ? points : null;
}
/** The CSS easing keywords, as the control points CSS gives them. */ const EASING_KEYWORDS = {
    linear: [
        0,
        0,
        1,
        1
    ],
    ease: [
        0.25,
        0.1,
        0.25,
        1
    ],
    'ease-in': [
        0.42,
        0,
        1,
        1
    ],
    'ease-out': [
        0,
        0,
        0.58,
        1
    ],
    'ease-in-out': [
        0.42,
        0,
        0.58,
        1
    ]
};
function parseCssEasing(text) {
    const value = text.trim();
    return EASING_KEYWORDS[value] ?? parseMotionRoleValue('curve', value);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/rubberBand.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rubberBand",
    ()=>rubberBand,
    "rubberBandClamp",
    ()=>rubberBandClamp,
    "rubberBandInverse",
    ()=>rubberBandInverse,
    "rubberBandSlope",
    ()=>rubberBandSlope,
    "rubberBandUnclamp",
    ()=>rubberBandUnclamp
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file rubberBand.ts
 * @input An overflow past an edge, the scroll view's dimension and UIKit's
 *   rubber-band coefficient
 * @output Exports `rubberBand` (finger overflow → displayed overflow), its
 *   inverse, its slope, and the clamp/unclamp pair over a [min, max] range
 * @position Pure math; no DOM, no React
 *
 * UIScrollView resists a drag past its content edge with
 *   b = (1 − 1 ÷ (x·c ÷ d + 1))·d
 * where x is how far the finger has gone past the edge, d the scroll view's
 * size on that axis and c = 0.55 (uikit/scroll.ts records the sources). The
 * displayed overflow b approaches d but never reaches it, and its slope at
 * the edge is c: the first points of overflow move at 55 % of the finger.
 *
 * The inverse matters for spec:AST-094 FR6 (a finger catches any animation
 * mid-flight): a finger that lands on content still bouncing back has to
 * resume the drag from the finger position that would produce the overflow
 * on screen, or the content jumps.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/motion/rubberBand.test.ts
 * - /packages/core/src/motion/README.md
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$scroll$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/scroll.js [app-client] (ecmascript)");
;
function rubberBand(overflow, dimension, coefficient = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$scroll$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scroll"].rubberBand.coefficient) {
    if (!(dimension > 0)) {
        return 0;
    }
    const x = Math.abs(overflow);
    const banded = (1 - 1 / (x * coefficient / dimension + 1)) * dimension;
    return overflow < 0 ? -banded : banded;
}
function rubberBandInverse(displayed, dimension, coefficient = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$scroll$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scroll"].rubberBand.coefficient) {
    if (!(dimension > 0)) {
        return 0;
    }
    const b = Math.abs(displayed);
    if (b >= dimension) {
        return displayed < 0 ? -Infinity : Infinity;
    }
    const x = dimension / coefficient * b / (dimension - b);
    return displayed < 0 ? -x : x;
}
function rubberBandSlope(overflow, dimension, coefficient = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$scroll$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scroll"].rubberBand.coefficient) {
    if (!(dimension > 0)) {
        return 0;
    }
    const u = Math.abs(overflow) * coefficient / dimension + 1;
    return coefficient / (u * u);
}
function rubberBandClamp(value, min, max, dimension, coefficient = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$scroll$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scroll"].rubberBand.coefficient) {
    if (value < min) {
        return min + rubberBand(value - min, dimension, coefficient);
    }
    if (value > max) {
        return max + rubberBand(value - max, dimension, coefficient);
    }
    return value;
}
function rubberBandUnclamp(displayed, min, max, dimension, coefficient = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$scroll$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scroll"].rubberBand.coefficient) {
    if (displayed < min) {
        return min + rubberBandInverse(displayed - min, dimension, coefficient);
    }
    if (displayed > max) {
        return max + rubberBandInverse(displayed - max, dimension, coefficient);
    }
    return displayed;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/spring.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SETTLING_EPSILON",
    ()=>SETTLING_EPSILON,
    "absoluteVelocity",
    ()=>absoluteVelocity,
    "dampingRatioOf",
    ()=>dampingRatioOf,
    "durationBounceOf",
    ()=>durationBounceOf,
    "naturalFrequency",
    ()=>naturalFrequency,
    "relativeVelocity",
    ()=>relativeVelocity,
    "responseDampingOf",
    ()=>responseDampingOf,
    "responseOf",
    ()=>responseOf,
    "settlingDuration",
    ()=>settlingDuration,
    "solveSpring",
    ()=>solveSpring,
    "solveSpringTowardRamp",
    ()=>solveSpringTowardRamp,
    "springFromDurationBounce",
    ()=>springFromDurationBounce,
    "springFromPhysics",
    ()=>springFromPhysics,
    "springFromResponse",
    ()=>springFromResponse,
    "springFromUIKitDampingDuration",
    ()=>springFromUIKitDampingDuration,
    "toSpring",
    ()=>toSpring
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file spring.ts
 * @input Spring parameters in any of the four vocabularies Apple uses
 * @output Exports the `Spring` model, conversions between SwiftUI
 *   (duration, bounce), SwiftUI/WWDC (response, damping ratio),
 *   CASpringAnimation (mass, stiffness, damping) and UIKit's legacy
 *   `usingSpringWithDamping:initialSpringVelocity:` parameters, the closed-form
 *   solution of the spring (`solveSpring`) and of a spring chasing a target
 *   that moves at a constant speed (`solveSpringTowardRamp`), and
 *   `settlingDuration`
 * @position Pure math under the motion animator; no DOM, no React
 *
 * One model, the damped harmonic oscillator m·x″ + c·x′ + k·x = 0, solved in
 * closed form for its three regimes (under-, critically and over-damped). It
 * is the model behind SwiftUI's `Spring`, `CASpringAnimation` and UIKit's
 * spring timing parameters, so a curve computed here is the curve UIKit
 * computes for the same parameters.
 *
 * Units: time in seconds, velocity in units per second (the units of the
 * animated value: px for a translation, 1 for a scale or an opacity), the
 * same units SwiftUI and Core Animation use.
 *
 * Conversions, with their sources:
 * - (duration, bounce) → (mass, stiffness, damping): the three equations of
 *   WWDC23 "Animate with springs" (session 10158):
 *     mass = 1, stiffness = (2π ÷ duration)²,
 *     damping = (1 − bounce) × 4π ÷ duration          for bounce ≥ 0,
 *     damping = 4π ÷ (duration × (1 + bounce))        for bounce < 0.
 * - (response, dampingRatio) → physics: WWDC18 "Designing Fluid Interfaces"
 *   (session 803) defines the response as the period of the undamped spring,
 *   so ω₀ = 2π ÷ response; damping ratio ζ = c ÷ (2·√(k·m)) as stated in
 *   https://developer.apple.com/documentation/uikit/uispringtimingparameters/init(mass:stiffness:damping:initialvelocity:)
 * - UIKit's relative initial velocity: "A value of 1 corresponds to the total
 *   animation distance traversed in one second"
 *   (https://developer.apple.com/documentation/uikit/uiview/animate(withduration:delay:usingspringwithdamping:initialspringvelocity:options:animations:completion:)).
 *
 * Settling duration follows UIKit's own duration solver: the time after which
 * the displacement from the target, for a unit move, stays below ε = 0.001
 * (the epsilon SwiftUI documents for `Spring.settlingDuration`). Underdamped,
 * it is the closed-form time at which the decaying envelope |A| + |B| of
 * A·cos + B·sin falls to ε; critically damped and overdamped, the root of the
 * envelope found numerically. Read from UIKit on the iOS 26.2 simulator, the
 * underdamped values match to the last digit (`CASpringAnimation`
 * `settlingDuration` for every stiffness/damping/velocity in the grid, and the
 * duration UIKit gives `UIView.animate(springDuration:bounce:)`); critically
 * damped ones land within 0.02 % of the duration UIKit picks (it stops 0.0016
 * later in ω₀·t). Core Animation's `settlingDuration` PROPERTY additionally
 * rounds critically damped and overdamped springs up to the next 0.1 s; that
 * rounding is not modeled. Nor is Core Animation's overdamped rendering: with
 * `allowsOverdamping` on (only `UIView.animate(springDuration:bounce:)` with a
 * negative bounce turns it on) Core Animation swaps the two exponentials'
 * coefficients and flips the initial velocity's sign, so its "overdamped"
 * curve overshoots (stiffness 100, damping 40: 104.5 % at 200 ms); every other
 * UIKit spring has it off and is clamped to critical, as `springFromPhysics`
 * does. The bound also reproduces Apple's
 * CASpringAnimation documentation example (stiffness 100, damping 5 →
 * "approximately 2.85 seconds"; damping 15 → "just over 1 second") and
 * WebKit's iOS switch durations, the settling durations of its UIKit-matched
 * springs (0.4880138408543766 s and 0.5073965509413827 s in
 * Source/WebCore/rendering/ios/RenderThemeIOS.h). See spring.test.ts.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/motion/spring.test.ts
 * - /packages/core/src/motion/README.md
 */ const TAU = 2 * Math.PI;
/**
 * A spring, in Core Animation's physical vocabulary. Every other way of
 * describing a spring converts to this one.
 */ /** SwiftUI's two-parameter description: `Spring(duration:bounce:)`. */ /** WWDC18's design-friendly description: response and damping ratio. */ function assertPositiveFinite(name, value) {
    if (!(Number.isFinite(value) && value > 0)) {
        throw new RangeError(`spring: ${name} must be a positive number, got ${value}`);
    }
}
function springFromDurationBounce({ duration, bounce }) {
    assertPositiveFinite('duration', duration);
    if (!Number.isFinite(bounce)) {
        throw new RangeError(`spring: bounce must be finite, got ${bounce}`);
    }
    // −1 itself would be infinite damping.
    const b = Math.min(1, Math.max(-0.999999, bounce));
    const stiffness = (TAU / duration) ** 2;
    const damping = b >= 0 ? (1 - b) * 2 * TAU / duration : 2 * TAU / (duration * (1 + b));
    return {
        mass: 1,
        stiffness,
        damping
    };
}
function springFromResponse({ response, dampingRatio }) {
    assertPositiveFinite('response', response);
    if (!(Number.isFinite(dampingRatio) && dampingRatio >= 0)) {
        throw new RangeError(`spring: dampingRatio must be ≥ 0, got ${dampingRatio}`);
    }
    const omega = TAU / response;
    return {
        mass: 1,
        stiffness: omega * omega,
        damping: 2 * dampingRatio * omega
    };
}
function springFromPhysics({ mass = 1, stiffness, damping, allowOverdamping = false }) {
    assertPositiveFinite('mass', mass);
    assertPositiveFinite('stiffness', stiffness);
    if (!(Number.isFinite(damping) && damping >= 0)) {
        throw new RangeError(`spring: damping must be ≥ 0, got ${damping}`);
    }
    const critical = 2 * Math.sqrt(stiffness * mass);
    return {
        mass,
        stiffness,
        damping: allowOverdamping ? damping : Math.min(damping, critical)
    };
}
function naturalFrequency(spring) {
    return Math.sqrt(spring.stiffness / spring.mass);
}
function dampingRatioOf(spring) {
    return spring.damping / (2 * Math.sqrt(spring.stiffness * spring.mass));
}
function responseOf(spring) {
    return TAU / naturalFrequency(spring);
}
function durationBounceOf(spring) {
    const zeta = dampingRatioOf(spring);
    return {
        duration: responseOf(spring),
        bounce: zeta <= 1 ? 1 - zeta : 1 / zeta - 1
    };
}
function responseDampingOf(spring) {
    return {
        response: responseOf(spring),
        dampingRatio: dampingRatioOf(spring)
    };
}
function toSpring(description) {
    if ('stiffness' in description) {
        return springFromPhysics(description);
    }
    if ('bounce' in description) {
        return springFromDurationBounce(description);
    }
    return springFromResponse(description);
}
function relativeVelocity(velocity, from, to) {
    return velocity / (to - from);
}
function absoluteVelocity(relative, from, to) {
    return relative * (to - from);
}
/** A spring released from a value with a velocity, heading for a target. */ // |ζ − 1| below this is solved as critically damped: the under/overdamped
// forms lose precision as ωd or the root gap goes to zero, and the critical
// form differs from them by O(|ζ − 1|) there.
const CRITICAL_TOLERANCE = 1e-6;
function solveSpring(spring, { from, to, velocity: initialVelocity = 0 }) {
    const omega0 = naturalFrequency(spring);
    const zeta = dampingRatioOf(spring);
    // Displacement from the target; the ODE is solved for x(t) = value − to.
    const x0 = from - to;
    const v0 = initialVelocity;
    let displacement;
    let speed;
    let envelope;
    // Where the envelope peaks (critically damped only; elsewhere 0).
    let envelopePeak = 0;
    if (zeta < 1 - CRITICAL_TOLERANCE) {
        const decay = zeta * omega0;
        const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
        const a = x0;
        const b = (v0 + decay * x0) / omegaD;
        const bv = (decay * v0 + omega0 * omega0 * x0) / omegaD;
        displacement = (t)=>Math.exp(-decay * t) * (a * Math.cos(omegaD * t) + b * Math.sin(omegaD * t));
        speed = (t)=>Math.exp(-decay * t) * (v0 * Math.cos(omegaD * t) - bv * Math.sin(omegaD * t));
        const amplitude = Math.abs(a) + Math.abs(b);
        envelope = (t)=>amplitude * Math.exp(-decay * t);
    } else if (zeta <= 1 + CRITICAL_TOLERANCE) {
        const b = v0 + omega0 * x0;
        displacement = (t)=>(x0 + b * t) * Math.exp(-omega0 * t);
        speed = (t)=>(v0 - omega0 * b * t) * Math.exp(-omega0 * t);
        const absA = Math.abs(x0);
        const absB = Math.abs(b);
        envelope = (t)=>(absA + absB * t) * Math.exp(-omega0 * t);
        // (|A| + |B|·t)·e^(−ω₀t) rises until t = 1/ω₀ − |A|/|B|, then decays.
        envelopePeak = absB > 0 ? Math.max(0, 1 / omega0 - absA / absB) : 0;
    } else {
        const root = omega0 * Math.sqrt(zeta * zeta - 1);
        const r1 = -zeta * omega0 + root; // slow root
        const r2 = -zeta * omega0 - root; // fast root
        const c1 = (v0 - r2 * x0) / (r1 - r2);
        const c2 = x0 - c1;
        displacement = (t)=>c1 * Math.exp(r1 * t) + c2 * Math.exp(r2 * t);
        speed = (t)=>r1 * c1 * Math.exp(r1 * t) + r2 * c2 * Math.exp(r2 * t);
        const absC1 = Math.abs(c1);
        const absC2 = Math.abs(c2);
        envelope = (t)=>absC1 * Math.exp(r1 * t) + absC2 * Math.exp(r2 * t);
    }
    const settleTime = (threshold)=>{
        if (!(threshold > 0)) {
            return Infinity;
        }
        if (zeta === 0) {
            return x0 === 0 && v0 === 0 ? 0 : Infinity;
        }
        const start = envelopePeak;
        if (envelope(start) <= threshold) {
            // `start` is where the bound peaks (0 when it only decays), so the
            // bound is within the threshold everywhere.
            return 0;
        }
        if (zeta < 1 - CRITICAL_TOLERANCE) {
            // Closed form: amplitude · e^(−ζω₀t) = threshold.
            const amplitude = envelope(0);
            return Math.log(amplitude / threshold) / (zeta * omega0);
        }
        // Monotone decreasing after `start`: bracket, then bisect.
        let lo = start;
        let hi = Math.max(start, 1 / omega0);
        while(envelope(hi) > threshold){
            lo = hi;
            hi *= 2;
            if (hi > 1e6) {
                return Infinity;
            }
        }
        for(let i = 0; i < 100 && hi - lo > 1e-12; i++){
            const mid = (lo + hi) / 2;
            if (envelope(mid) > threshold) {
                lo = mid;
            } else {
                hi = mid;
            }
        }
        return hi;
    };
    return {
        spring,
        from,
        to,
        initialVelocity,
        value: (t)=>to + displacement(t),
        velocity: (t)=>speed(t),
        settleTime
    };
}
function solveSpringTowardRamp(spring, { from, velocity: initialVelocity = 0, target, slope }) {
    const lag = spring.damping * slope / spring.stiffness;
    // x(t) = target + slope·t − lag + h(t), with h a free spring around 0.
    const free = solveSpring(spring, {
        from: from - target + lag,
        to: 0,
        velocity: initialVelocity - slope
    });
    return {
        spring,
        lag,
        value: (t)=>target + slope * t - lag + free.value(t),
        velocity: (t)=>slope + free.velocity(t)
    };
}
const SETTLING_EPSILON = 0.001;
function settlingDuration(spring, { initialVelocity = 0, epsilon = SETTLING_EPSILON } = {}) {
    return solveSpring(spring, {
        from: 0,
        to: 1,
        velocity: initialVelocity
    }).settleTime(epsilon);
}
/**
 * ω₀ · duration that UIKit's legacy spring derivation lands on, by damping
 * ratio, for a release at rest. Read from UIKit
 * (`UIView.animate(withDuration: 1, usingSpringWithDamping: ζ,
 * initialSpringVelocity: 0)`; `UIViewPropertyAnimator(duration:dampingRatio:)`
 * gives identical springs, and ω₀ scales as 1 ÷ duration): measured: UIKit
 * lab (injected host app), iOS 26.2 sim iPhone 17 Pro, CAAnimation read,
 * Oct 23 2026.
 */ const UIKIT_LEGACY_OMEGA_DURATION = [
    [
        0.1,
        46.102
    ],
    [
        0.15,
        33.4801
    ],
    [
        0.2,
        26.5936
    ],
    [
        0.25,
        22.2149
    ],
    [
        0.3,
        19.1698
    ],
    [
        0.35,
        16.9236
    ],
    [
        0.4,
        15.1966
    ],
    [
        0.45,
        13.8275
    ],
    [
        0.5,
        12.7169
    ],
    [
        0.55,
        11.8001
    ],
    [
        0.6,
        11.0335
    ],
    [
        0.65,
        10.3869
    ],
    [
        0.7,
        9.8396
    ],
    [
        0.75,
        9.3779
    ],
    [
        0.8,
        8.9943
    ],
    [
        0.85,
        8.6897
    ],
    [
        0.9,
        8.4808
    ],
    [
        0.95,
        8.4425
    ],
    [
        1,
        9.2334
    ]
];
function springFromUIKitDampingDuration({ duration, dampingRatio }) {
    assertPositiveFinite('duration', duration);
    // UIKit's ratio is clamped to (0, 1]: it has no overdamped springs.
    const zeta = Math.min(1, Math.max(1e-3, dampingRatio));
    const table = UIKIT_LEGACY_OMEGA_DURATION;
    let c = table[0][1] * table[0][0] / zeta;
    for(let i = 0; i + 1 < table.length; i++){
        const [z0, c0] = table[i];
        const [z1, c1] = table[i + 1];
        if (zeta >= z0 && zeta <= z1) {
            c = c0 + (c1 - c0) * (zeta - z0) / (z1 - z0);
            break;
        }
    }
    const omega0 = c / duration;
    return {
        mass: 1,
        stiffness: omega0 * omega0,
        damping: 2 * zeta * omega0
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/themeTempo.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "themeTempo",
    ()=>themeTempo
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file themeTempo.ts
 * @input An element on the page
 * @output `themeTempo(element)`: the tempo of the theme the element is in
 * @position Motion foundation; resolveMotion.ts scales a motion role by it,
 *   and the pager scales its settle by it, which no role names
 *
 * A theme that sets `tempo` writes it, clamped, to the private custom
 * property `--_astryx-motion-tempo` beside its duration tokens. An
 * adaptation rule writes it where its condition holds, and a nested theme
 * that sets no tempo inherits it. A layer whose durations come from a
 * duration scale writes a tempo of 1, so its springs keep its own pace. One
 * read of a custom property forces no layout.
 * Nothing here imports a theme module, runs on import or runs on the server.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/motion/themeTempo.test.ts
 * - /packages/core/src/theme/themeMotion.ts (writes the property)
 */ /** The property a theme that sets `tempo` writes (theme/themeMotion.ts). */ const TEMPO_PROPERTY = '--_astryx-motion-tempo';
function themeTempo(element) {
    const view = element?.ownerDocument?.defaultView;
    if (element == null || view == null) {
        return 1;
    }
    const text = view.getComputedStyle(element).getPropertyValue(TEMPO_PROPERTY).trim();
    const tempo = text === '' ? Number.NaN : Number(text);
    return Number.isFinite(tempo) && tempo > 0 ? tempo : 1;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/themeTiming.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "declaredTimingTokens",
    ()=>declaredTimingTokens,
    "easedProgress",
    ()=>easedProgress,
    "readThemeTiming",
    ()=>readThemeTiming,
    "readThemeTokenText",
    ()=>readThemeTokenText,
    "readThemeTokens",
    ()=>readThemeTokens,
    "resolveTiming",
    ()=>resolveTiming
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file themeTiming.ts
 * @input An element, and the CSS or the theme tokens that time one motion
 * @output readThemeTiming: the eased progress from 0 to 1 that times a motion,
 *   as one timed MotionCurve. It reads the element's own transition, or
 *   tokens where the element is. It plays an easing that is not a cubic
 *   Bézier as the browser plays it. readThemeTokens and resolveTiming: that
 *   duration and easing as values. readThemeTokenText: a token's text where
 *   the element is. easedProgress: the curve for a length and an easing
 *   already read.
 * @position Motion foundation, internal to core. Motion that a tap, a key or
 *   the program starts reads its duration and easing from the theme with it.
 *
 * SYNC: When modified, update /packages/core/src/motion/themeTiming.test.ts
 *   and /packages/core/src/motion/__tests__/themeTiming.interaction.browser.spec.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$bezier$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/bezier.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/roles.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokenReferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokenReferences.js [app-client] (ecmascript)");
;
;
;
const declaredTimingTokens = {
    '--duration-fast-min': '130ms',
    '--duration-fast': '175ms',
    '--duration-fast-max': '230ms',
    '--duration-medium-min': '310ms',
    '--duration-medium': '410ms',
    '--duration-medium-max': '550ms',
    '--duration-slow-min': '730ms',
    '--duration-slow': '975ms',
    '--duration-slow-max': '1300ms',
    '--duration-exit': 'var(--duration-fast)',
    '--ease-standard': 'cubic-bezier(0.24, 1, 0.4, 1)',
    '--ease-entrance': 'cubic-bezier(0.24, 1, 0.4, 1)',
    '--ease-move': 'cubic-bezier(0.24, 1, 0.4, 1)',
    '--ease-exit': 'cubic-bezier(0.3, 0, 0.6, 0.6)'
};
function easedProgress(seconds, ease, { jumps = false } = {}) {
    const at = (t)=>seconds <= 0 || t >= seconds ? 1 : ease(Math.max(0, t) / seconds);
    // A central difference, one step inside the curve at either end.
    const step = Math.min(1e-3, seconds / 100);
    return {
        duration: seconds,
        at,
        velocity: (t)=>{
            if (seconds <= 0 || t >= seconds) {
                return 0;
            }
            const before = Math.max(0, t - step);
            const after = Math.min(seconds, t + step);
            if (!jumps) {
                return (at(after) - at(before)) / (after - before);
            }
            const here = at(t);
            const slopes = [];
            if (t > before) {
                slopes.push((here - at(before)) / (t - before));
            }
            if (after > t) {
                slopes.push((at(after) - here) / (after - t));
            }
            return slopes.reduce((a, b)=>Math.abs(b) < Math.abs(a) ? b : a);
        }
    };
}
function firstDurationMs(style) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parseMotionRoleValue"])('duration', style.transitionDuration.split(',')[0] ?? '');
}
/** The first transition's easing in a computed style, as the style writes it. */ function firstEasingText(style) {
    return style.transitionTimingFunction.split(/,(?![^(]*\))/)[0] ?? '';
}
/** The first transition's easing in a computed style. */ function firstEasing(style) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parseCssEasing"])(firstEasingText(style));
}
/**
 * The easing `text` as the browser plays it. A paused animation with that
 * easing gives its eased progress at each time it is set to. This reads an
 * easing that is not a cubic Bézier, such as `linear()` or `steps()`. Null
 * when the browser plays no such easing, or has no Web Animations.
 */ function browserEasing(doc, text) {
    const view = doc.defaultView;
    if (typeof view?.Animation !== 'function' || typeof view.KeyframeEffect !== 'function') {
        return null;
    }
    let animation;
    try {
        animation = new view.Animation(new view.KeyframeEffect(null, null, {
            duration: 1000,
            easing: text,
            fill: 'both'
        }), null);
    } catch  {
        // The browser throws on an easing it cannot play.
        return null;
    }
    return (x)=>{
        animation.currentTime = Math.min(1, Math.max(0, x)) * 1000;
        return animation.effect?.getComputedTiming().progress ?? 1;
    };
}
/**
 * The curve for a duration and an easing, or null if either cannot play. An
 * easing that is not a cubic Bézier plays as the browser plays `easing`, and
 * a jump in it carries no speed.
 */ function progressOf(doc, { ms, points }, easing) {
    if (ms == null || ms <= 0) {
        return null;
    }
    if (points != null) {
        return easedProgress(ms / 1000, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$bezier$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezier"])(points));
    }
    const ease = browserEasing(doc, easing);
    return ease == null ? null : easedProgress(ms / 1000, ease, {
        jumps: true
    });
}
function resolveTiming(element, { duration, easing }) {
    const plainMs = duration == null ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parseMotionRoleValue"])('duration', duration);
    const plainPoints = easing == null ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parseCssEasing"])(easing);
    const doc = element.ownerDocument;
    const view = doc.defaultView;
    const needsMs = duration != null && plainMs == null;
    const needsPoints = easing != null && plainPoints == null;
    if (view == null || !needsMs && !needsPoints) {
        return {
            ms: plainMs,
            points: plainPoints
        };
    }
    const probe = doc.createElement('span');
    // A computed value needs no layout, so the probe never renders.
    probe.style.setProperty('display', 'none', 'important');
    // The browser refuses a value it cannot read, and the property stays unset.
    const takes = (property, value)=>{
        probe.style.setProperty(property, value, 'important');
        return probe.style.getPropertyValue(property) !== '';
    };
    const hasMs = needsMs && takes('transition-duration', duration);
    const hasPoints = needsPoints && takes('transition-timing-function', easing);
    (doc.body ?? doc.documentElement).append(probe);
    try {
        const style = view.getComputedStyle(probe);
        return {
            ms: hasMs ? firstDurationMs(style) : plainMs,
            points: hasPoints ? firstEasing(style) : plainPoints
        };
    } finally{
        probe.remove();
    }
}
/**
 * The value of `token` in `style`. With none, it is the default core declares,
 * and the references in that default read their own tokens in `style` too.
 */ function tokenValue(style, token) {
    const own = style.getPropertyValue(token).trim();
    if (own !== '') {
        return own;
    }
    const declared = {};
    for (const [name, value] of Object.entries(declaredTimingTokens)){
        declared[name] = style.getPropertyValue(name).trim() || value;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokenReferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveTokenReferences"])(declared)[token] ?? '';
}
function readThemeTokens(element, { duration, easing }) {
    const style = element.ownerDocument.defaultView?.getComputedStyle(element);
    if (style == null) {
        return {
            ms: null,
            points: null
        };
    }
    return resolveTiming(element, {
        duration: duration == null ? undefined : tokenValue(style, duration),
        easing: easing == null ? undefined : tokenValue(style, easing)
    });
}
function readThemeTokenText(element, token) {
    const style = element.ownerDocument.defaultView?.getComputedStyle(element);
    return style == null ? null : tokenValue(style, token);
}
function readThemeTiming(element, tokens) {
    const doc = element.ownerDocument;
    const style = doc.defaultView?.getComputedStyle(element);
    if (style == null) {
        return null;
    }
    if (tokens != null) {
        const easing = tokenValue(style, tokens.easing);
        const duration = tokenValue(style, tokens.duration);
        return progressOf(doc, resolveTiming(element, {
            duration,
            easing
        }), easing);
    }
    const easing = firstEasingText(style);
    return progressOf(doc, {
        ms: firstDurationMs(style),
        points: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parseCssEasing"])(easing)
    }, easing);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/gestures.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HAPTIC_FEEDBACK_KINDS",
    ()=>HAPTIC_FEEDBACK_KINDS,
    "HAPTIC_VIBRATION_PATTERNS",
    ()=>HAPTIC_VIBRATION_PATTERNS,
    "UIKIT_CLICK",
    ()=>UIKIT_CLICK,
    "UIKIT_CONTROL",
    ()=>UIKIT_CONTROL,
    "UIKIT_GESTURES",
    ()=>UIKIT_GESTURES,
    "UIKIT_LONG_PRESS",
    ()=>UIKIT_LONG_PRESS,
    "UIKIT_MENU_PRESS",
    ()=>UIKIT_MENU_PRESS,
    "UIKIT_PAN",
    ()=>UIKIT_PAN,
    "UIKIT_PINCH",
    ()=>UIKIT_PINCH,
    "UIKIT_PRESS",
    ()=>UIKIT_PRESS,
    "UIKIT_ROTATION",
    ()=>UIKIT_ROTATION,
    "UIKIT_SCREEN_EDGE_PAN",
    ()=>UIKIT_SCREEN_EDGE_PAN,
    "UIKIT_SWIPE",
    ()=>UIKIT_SWIPE,
    "UIKIT_TAP",
    ()=>UIKIT_TAP,
    "UIKIT_VELOCITY",
    ()=>UIKIT_VELOCITY
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file gestures.ts
 * @input Nothing: plain data
 * @output Exports one constant per recognizer or domain (UIKIT_TAP,
 *   UIKIT_LONG_PRESS, UIKIT_PAN, …, UIKIT_PRESS, UIKIT_VELOCITY), the gesture
 *   thresholds recognizers read, a reader importing only its group; their
 *   union UIKIT_GESTURES; and the GestureConstant type: a value and its unit
 * @position Gesture half of the UIKit constants table. Springs, scroll
 *   physics and timing live beside it in this folder; no component carries a
 *   gesture number of its own.
 *
 * Units are CSS pixels and milliseconds. On a phone with
 * `width=device-width`, one CSS pixel is one UIKit point, so a UIKit distance
 * in points is the same number here.
 *
 * Every leaf carries one or more `@source` (apple-docs | wwdc | webkit |
 * measured | GUESS); webkit and GUESS values also carry the `@measure` task
 * that will confirm or replace them (MEASUREMENTS.md lists them all).
 * uikit.test.ts enforces both. Only the value and its unit ship: where a
 * number comes from stays in its JSDoc, out of the bundle. The press clocks
 * are the same values as `DELAYS_CONTENT_TOUCHES_MS` and timing's `press`,
 * written as numbers so each group bundles alone; gestures.test.ts holds
 * them equal. Safari on iOS runs UIKit's own
 * recognizers for tap-to-click, long press, double tap and the start of a
 * page scroll, so many guesses can be settled by measuring Safari itself.
 *
 * The measurements the sources name:
 * - UIKit lab: in-process reads and touch runs of fresh UIKit recognizers
 *   (private ivars read with key-value coding, every value confirmed with HID
 *   touches and the recognizer state log), iPhone 17 Pro simulator, iOS 26.2.
 * - Settings and Contacts: the repository's own measurement of the touch
 *   press model, recorded in packages/core/src/utils/pressGesture.ts, driven
 *   with real HID touches and filmed at 60 fps.
 * - Mobile Safari: Safari page scroll is a UIScrollView; the distance at which
 *   it claims a slow drag is where a press becomes a scroll, and the last
 *   moment a page can still cancel the scroll.
 *
 * SYNC: When modified, update packages/core/src/motion/uikit/gestures.test.ts.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$scroll$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/scroll.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$longPress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/longPress.js [app-client] (ecmascript)");
;
;
const UIKIT_TAP = {
    /**
   * How far each finger may travel from where it landed before a tap
   * fails, as a distance.
   * @source measured: UIKit lab, iOS 26.2 simulator, ivar reads confirmed
   *   with HID touches, Oct 23 2026: UITapGestureRecognizer
   *   _allowableMovement 45; 44 pt taps, 46 pt fails, the same on the
   *   diagonal
   */ allowableMovement: {
        value: 45,
        unit: 'px'
    },
    /**
   * Longest interval between one tap lifting and the next landing.
   * @source measured: UIKit lab, iOS 26.2 simulator, ivar reads confirmed
   *   with HID touches, Oct 23 2026: _maximumIntervalBetweenSuccessiveTaps
   *   0.35 s; 330 ms double-taps, 370 ms does not
   */ maximumIntervalBetweenTaps: {
        value: 350,
        unit: 'ms'
    },
    /**
   * How far a later tap may land from the first one of the sequence.
   * @source measured: UIKit lab, iOS 26.2 simulator, ivar reads confirmed
   *   with HID touches, Oct 23 2026: _allowableSeparation is unbounded and
   *   the 45 pt movement rule applies between taps; 44 pt double-taps, 46
   *   does not
   */ allowableSeparation: {
        value: 45,
        unit: 'px'
    },
    /**
   * Longest a finger may stay down and still tap.
   * @source measured: UIKit lab, iOS 26.2 simulator, ivar reads confirmed
   *   with HID touches, Oct 23 2026: maximumTapDuration 1.5 s; a 1.4 s hold
   *   taps, 1.6 s does not
   */ maximumTapDuration: {
        value: 1500,
        unit: 'ms'
    }
};
const UIKIT_LONG_PRESS = {
    /**
   * UILongPressGestureRecognizer.minimumPressDuration default.
   * @source apple-docs
   *   https://developer.apple.com/documentation/uikit/uilongpressgesturerecognizer/minimumpressduration
   * @source measured: UIKit lab, iOS 26.2 simulator, ivar reads confirmed
   *   with HID touches, Oct 23 2026: _minimumPressDuration 0.5
   */ minimumPressDuration: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$longPress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LONG_PRESS_DURATION_MS"],
        unit: 'ms'
    },
    /**
   * UILongPressGestureRecognizer.allowableMovement default, a distance.
   * @source apple-docs
   *   https://developer.apple.com/documentation/uikit/uilongpressgesturerecognizer/allowablemovement
   * @source measured: UIKit lab, iOS 26.2 simulator, ivar reads confirmed
   *   with HID touches, Oct 23 2026: a (7, 7) drift begins, (7.2, 7.2) fails
   */ allowableMovement: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$longPress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LONG_PRESS_ALLOWABLE_MOVEMENT_PX"],
        unit: 'px'
    }
};
const UIKIT_PAN = {
    /**
   * Travel before a pan begins, PER AXIS: |dx| or |dy| reaching it. The
   * translation is reset when the pan begins, so the hysteresis is not
   * part of it. Kept below the distance at which WebKit claims a drag for
   * scrolling, so a pan that must cancel the native scroll still sees
   * cancelable `touchmove`s.
   * @source measured: UIKit lab, iOS 26.2 simulator, ivar reads confirmed
   *   with HID touches, Oct 23 2026: UIPanGestureRecognizer _hysteresis 10; x
   *   and y began at 10.0, a diagonal at (10.67, 10.67); translation(in:) is
   *   0 at .began
   */ hysteresis: {
        value: 10,
        unit: 'px'
    }
};
const UIKIT_SWIPE = {
    /**
   * Travel along the swipe direction before a swipe is recognized.
   * @source measured: UIKit lab, iOS 26.2 simulator, ivar reads confirmed
   *   with HID touches, Oct 23 2026: UISwipeGestureRecognizer minimum primary
   *   movement 50; recognized during the motion; 40 pt does not
   */ minimumDistance: {
        value: 50,
        unit: 'px'
    },
    /**
   * Longest a swipe may take before it fails.
   * @source measured: UIKit lab, iOS 26.2 simulator, ivar reads confirmed
   *   with HID touches, Oct 23 2026: UISwipeGestureRecognizer maximum
   *   duration 0.5 s
   */ maximumDuration: {
        value: 500,
        unit: 'ms'
    },
    /**
   * Travel across the swipe direction that fails it.
   * @source measured: UIKit lab, iOS 26.2 simulator, ivar reads confirmed
   *   with HID touches, Oct 23 2026: UISwipeGestureRecognizer maximum
   *   secondary movement 50
   */ maximumSecondaryMovement: {
        value: 50,
        unit: 'px'
    },
    /**
   * How the minimum movement relaxes over time. Read, not modelled: a
   * 120 pt swipe over 0.8 s was recognized at 303 ms, below 50 pt of travel.
   * @source measured: UIKit lab, iOS 26.2 simulator, ivar reads confirmed
   *   with HID touches, Oct 23 2026: UISwipeGestureRecognizer
   *   rateOfMinimumMovementDecay 0.06 (not modelled)
   */ minimumMovementDecay: {
        value: 0.06,
        unit: 'ratio'
    }
};
const UIKIT_PINCH = {
    /**
   * Change of the distance between two fingers before a pinch begins. The
   * scale is then measured against the starting span moved by this much,
   * so it does not jump.
   * @source measured: UIKit lab, iOS 26.2 simulator, ivar reads confirmed
   *   with HID touches, Oct 23 2026: UIPinchGestureRecognizer _hysteresis 8;
   *   out from 120 began at 144 with scale 1.125 (= 144 / 128)
   */ hysteresis: {
        value: 8,
        unit: 'px'
    }
};
const UIKIT_ROTATION = {
    /**
   * Rotation of the two-finger vector before a rotation begins.
   * @source GUESS — UIRotationGestureRecognizer has no scalar threshold among
   *   its ivars; 5 degrees. The simulator HID cannot rotate two fingers: a
   *   device run (or an XCUITest rotate) logging the angle at .began.
   * @measure M-G10
   */ // 5° in radians, written out so the group bundles alone.
    hysteresis: {
        value: 0.08726646259971647,
        unit: 'rad'
    }
};
const UIKIT_SCREEN_EDGE_PAN = {
    /**
   * Width of the band at the screen edge a touch must land in.
   * @source measured: UIKit lab, iOS 26.2 simulator, ivar reads confirmed
   *   with HID touches, Oct 23 2026: UIScreenEdgePanGestureRecognizer
   *   _edgeRegionSize 40.2 on a 402 pt wide screen (10 % of it); edge pans
   *   cannot begin from simulator HID
   */ edgeRegion: {
        value: 40.2,
        unit: 'px'
    },
    /**
   * Travel before an edge pan begins.
   * @source measured: UIKit lab, iOS 26.2 simulator, ivar reads confirmed
   *   with HID touches, Oct 23 2026: the screen-edge pan hysteresis ivar 15
   */ hysteresis: {
        value: 15,
        unit: 'px'
    }
};
const UIKIT_CONTROL = {
    /**
   * How far outside its bounds a UIControl keeps a press inside: a finger
   * dragged out is still "inside" until it passes this margin.
   * @source measured: UIKit lab, iOS 26.2 simulator, ivar reads confirmed
   *   with HID touches, Oct 23 2026: UIButton (.system) stays inside up to 70
   *   pt out, touchDragExit at 71, touchDragEnter at 69 coming back;
   *   touchUpInside up to 70, touchUpOutside from 71
   */ trackingExpansion: {
        value: 70,
        unit: 'px'
    }
};
const UIKIT_PRESS = {
    /**
   * UIScrollView.delaysContentTouches: a touch in a scroller highlights after
   * this.
   * @source measured: Settings and Contacts, iOS 26.2 simulator, HID touches
   *   filmed at 60 fps (utils/pressGesture.ts), Oct 6 2026
   */ contentTouchDelay: {
        value: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$scroll$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DELAYS_CONTENT_TOUCHES_MS"],
        unit: 'ms'
    },
    /**
   * A tap shorter than the delay shows the highlight at the lift for this
   * long.
   * @source measured: Settings and Contacts, iOS 26.2 simulator, HID touches
   *   filmed at 60 fps (utils/pressGesture.ts), Oct 6 2026
   */ quickTapFlash: {
        value: 100,
        unit: 'ms'
    },
    /**
   * Travel at which a press is a scroll, not a press.
   * @source measured: Mobile Safari 26.2, iOS 26.2 simulator, slow HID drag
   *   on a scrollable page (1 pt steps): last cancelable touchmove at 10 px,
   *   pointercancel and the first uncancelable touchmove at 11 px, Oct 23
   *   2026
   */ slop: {
        value: 10,
        unit: 'px'
    },
    /**
   * A touch this soon after a finger-driven scroll moved is a brake, not a
   * press.
   * @source measured: Settings and Contacts, iOS 26.2 simulator, HID touches
   *   filmed at 60 fps (utils/pressGesture.ts), Oct 6 2026
   */ scrollBrake: {
        value: 150,
        unit: 'ms'
    },
    /**
   * How long after a finger was down a scroll can still be that finger's
   * momentum (the brake only counts scrolls a finger drove).
   * @source GUESS — The press model bound (utils/pressFeedback.ts): iOS
   *   momentum runs for a second or two after the lift.
   * @measure M-G19
   */ momentumMemory: {
        value: 3000,
        unit: 'ms'
    }
};
const UIKIT_MENU_PRESS = {
    /**
   * How far the finger may move on a button inside a scroll view during the
   * content-touch delay and still open the menu. It is the trigger's drift
   * allowance.
   * @source GUESS — Between the 12 pt that opened and the 14 pt that did not.
   *   UIKit lab, iOS 26.2 simulator, iPhone 17 Pro, gesture-state hook, Oct
   *   23 2026 (M-MN1). On a button outside any scroll view, a 12 pt move
   *   within 80 ms still opened the menu at about 151 ms. Moves of 14, 17, 20
   *   and 25 pt opened nothing. The recognizer reads an allowableMovement of
   *   10.
   * @measure M-G21
   */ holdOpenSlop: {
        value: 13,
        unit: 'px'
    },
    /**
   * After the menu opens under a still-held finger, the finger travels this
   * far before it starts picking. The distance is a straight line from the
   * first sample the menu receives after it opened. Until then nothing is
   * lit, and lifting acts on nothing.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, gesture-state hook, steps 150 ms apart, Oct 23 2026
   *   (M-MN2): with the menu open under a held finger and a 1 pt first step,
   *   moves of (0, 9) and (7, 7) picked nothing; (0, 10), (0, 11), (10, 0),
   *   (9, 9) and (10, 10) picked; a 9 pt step followed by 3 pt more picked
   *   nothing
   */ handoff: {
        value: 10,
        unit: 'px'
    }
};
const UIKIT_VELOCITY = {
    /**
   * UIPanGestureRecognizer.velocity(in:) is this times the newest event's
   * instantaneous velocity plus the rest times the previous event's
   * (instantaneous velocity: position change over timestamp change between
   * consecutive events, the touch-down counting as the first). The lift
   * does not update it, and a finger at rest sends no events, so UIKit
   * reports the last moving value after a pause; Astryx's release reads 0
   * once the finger has rested (`spec:AST-100` FR2).
   * @source measured: UIKit lab, iOS 26.2 simulator, ivar reads confirmed
   *   with HID touches, Oct 23 2026: fitted to all 69 velocity(in:) values of
   *   six HID streams (constant, accelerating, pauses before the lift) to 0.0
   *   pt/s
   */ currentWeight: {
        value: 0.2,
        unit: 'ratio'
    },
    /**
   * A scrolling surface's release (paging, a wheel) is this times the
   * newest pan value plus the rest times the previous one
   * (architecture:interaction-modality INV10).
   * @source GUESS — architecture:interaction-modality INV10 states
   *   UIScrollView's release as 0.25 x the newest pan value + 0.75 x the
   *   previous one.
   * @measure M-G14
   */ scrollReleaseWeight: {
        value: 0.25,
        unit: 'ratio'
    },
    /**
   * A contact that has not moved for longer than this before it lifts
   * releases at 0 (spec:AST-100 FR2). Not a UIKit value: UIKit's filter
   * never decays, so it flings after a rest.
   * @source GUESS — Android VelocityTracker and Flutter VelocityTracker
   *   treat a pointer that has not moved for 40 ms as stopped.
   * @measure M-G16
   */ stillness: {
        value: 40,
        unit: 'ms'
    }
};
const UIKIT_CLICK = {
    /**
   * Longest a guard waits for the browser's click after a touch it swallowed.
   * @source GUESS — A safety bound, not a UIKit number; the click guard's own.
   * @measure M-G17
   */ strayClickWindow: {
        value: 400,
        unit: 'ms'
    }
};
const UIKIT_GESTURES = {
    tap: UIKIT_TAP,
    longPress: UIKIT_LONG_PRESS,
    pan: UIKIT_PAN,
    swipe: UIKIT_SWIPE,
    pinch: UIKIT_PINCH,
    rotation: UIKIT_ROTATION,
    screenEdgePan: UIKIT_SCREEN_EDGE_PAN,
    control: UIKIT_CONTROL,
    press: UIKIT_PRESS,
    menuPress: UIKIT_MENU_PRESS,
    velocity: UIKIT_VELOCITY
};
const HAPTIC_FEEDBACK_KINDS = [
    'selection',
    'impactLight',
    'impactMedium',
    'impactHeavy',
    'impactSoft',
    'impactRigid',
    'notificationSuccess',
    'notificationWarning',
    'notificationError'
];
const HAPTIC_VIBRATION_PATTERNS = {
    selection: {
        value: [
            5
        ],
        unit: 'ms'
    },
    impactLight: {
        value: [
            8
        ],
        unit: 'ms'
    },
    impactMedium: {
        value: [
            12
        ],
        unit: 'ms'
    },
    impactHeavy: {
        value: [
            18
        ],
        unit: 'ms'
    },
    impactSoft: {
        value: [
            10
        ],
        unit: 'ms'
    },
    impactRigid: {
        value: [
            6
        ],
        unit: 'ms'
    },
    notificationSuccess: {
        value: [
            8,
            60,
            12
        ],
        unit: 'ms'
    },
    notificationWarning: {
        value: [
            12,
            80,
            12
        ],
        unit: 'ms'
    },
    notificationError: {
        value: [
            12,
            50,
            12,
            50,
            18
        ],
        unit: 'ms'
    }
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/longPress.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file longPress.ts
 * @input Nothing
 * @output Exports LONG_PRESS_DURATION_MS and LONG_PRESS_ALLOWABLE_MOVEMENT_PX
 * @position The one source of the long-press numbers. The constants table's
 *   `longPress` entries (gestures.ts, which carry the sources) take their
 *   values from here, and so do `useLongPress` and `useMenuPress`, which
 *   import only this module: a menu does not pay for the whole gestures
 *   table.
 *
 * SYNC: When modified, update longPress.test.ts.
 */ /**
 * How long a finger rests before a long press begins, in ms:
 * `UILongPressGestureRecognizer.minimumPressDuration` (see
 * `UIKIT_GESTURES.longPress.minimumPressDuration` for the source).
 */ __turbopack_context__.s([
    "LONG_PRESS_ALLOWABLE_MOVEMENT_PX",
    ()=>LONG_PRESS_ALLOWABLE_MOVEMENT_PX,
    "LONG_PRESS_DURATION_MS",
    ()=>LONG_PRESS_DURATION_MS
]);
const LONG_PRESS_DURATION_MS = 500;
const LONG_PRESS_ALLOWABLE_MOVEMENT_PX = 10;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/scroll.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELAYS_CONTENT_TOUCHES_MS",
    ()=>DELAYS_CONTENT_TOUCHES_MS,
    "registerScrollTable",
    ()=>registerScrollTable,
    "scroll",
    ()=>scroll
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file scroll.ts
 * @input Nothing; data only
 * @output Exports `scroll`, the UIScrollView constants: deceleration rates,
 *   the rubber-band coefficient, the bounce-back spring and the content-touch
 *   delay
 * @position The scroll domain of the UIKit constants table (motion/uikit);
 *   read by the motion math and components
 *
 * Every leaf carries one `@source` (apple-docs | wwdc | webkit | measured |
 * GUESS); webkit and GUESS values also carry the `@measure` task that will
 * confirm or replace them (listed in MEASUREMENTS.md). uikit.test.ts
 * enforces both.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/motion/MEASUREMENTS.md (measurement tasks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/roles.js [app-client] (ecmascript) <locals>");
;
const DELAYS_CONTENT_TOUCHES_MS = 150;
const scroll = {
    decelerationRate: {
        /**
     * Normal deceleration: the release velocity is multiplied by this every
     * millisecond, as a continuous exponential (UIScrollView keeps ln r,
     * −0.002002, and velocities in pt/ms). The scroll view's own
     * target for a release (`scrollViewWillEndDragging`) is
     * v · r ÷ (1 − r), within 1 %: WWDC18 803's projection function.
     * @source apple-docs https://developer.apple.com/documentation/uikit/uiscrollview/decelerationrate-swift.struct/normal
     *   (the constant, not its number)
     * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
     *   iPhone 17 Pro, rawValue read, Oct 23 2026 (also a new scroll view's
     *   decelerationRate)
     * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
     *   iPhone 17 Pro, deceleration ivars read mid-coast
     *   (`_decelerationFactor` 0.998, `_decelerationLnFactorV` −0.002002, the
     *   velocity decaying 0.4343 over 400 ms) and willEndDragging targets,
     *   Oct 23 2026
     */ normal: 0.998,
        /**
     * Fast deceleration (`UIScrollView.DecelerationRate.fast`).
     * @source apple-docs https://developer.apple.com/documentation/uikit/uiscrollview/decelerationrate-swift.struct/fast
     *   (the constant, not its number)
     * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
     *   iPhone 17 Pro, rawValue read and `_decelerationFactor` 0.99 (ln
     *   −0.01005) mid-coast, Oct 23 2026
     */ fast: 0.99
    },
    rubberBand: {
        /**
     * c in b = (1 − 1 ÷ (x·c ÷ d + 1))·d, d = the scroll view's size on the
     * axis, x = the finger's travel past the edge after the
     * pan's 10 pt hysteresis.
     * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
     *   iPhone 17 Pro, UIScrollView offsets released 100 / 300 / 600 pt past
     *   the edge of an 874 pt view: 47 / 135 / 236.67 against the formula's
     *   46.85 / 134.9 / 236.6, Oct 23 2026
     * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
     *   iPhone 17 Pro, sheet drags hooked: UISheetPresentationController
     *   passes `withRubberBandCoefficient: 0.55` on every drag, Oct 23 2026
     */ coefficient: 0.55
    },
    /**
   * The spring that returns content released past an edge, and that catches
   * a coast hitting an edge (its velocity handed to the spring).
   * @source GUESS — critically damped as in I. Lobanov's UIScrollView
   *   reimplementation (no oscillation at the bound); pace from SwiftUI's
   *   `.smooth` default duration. Measured so far (iOS 26.2 simulator, Oct 23
   *   2026): back to the edge in about 0.5 s with no overshoot, but no single
   *   spring from rest fits releases 47, 135 and 237 pt past the edge, so
   *   UIKit's bounce is not a plain spring; the model is still to fit
   * @measure M-S3
   */ bounce: {
        duration: 0.5,
        bounce: 0
    },
    /**
   * `delaysContentTouches`: how long a scroll view holds a touch-down from
   * its content while it decides whether the touch is a scroll (no highlight
   * flash on a quick scroll), in ms.
   * @source wwdc 2014-235 "Advanced Scrollviews and Touch Handling
   *   Techniques": the touch-delay recognizer UIScrollView uses runs "a
   *   pretty short timer … Let's say .15 seconds" (presenter's example value)
   * @source measured: Settings and Contacts, iOS 26.2, simulator driven with
   *   real HID touches at 60 fps, recorded with the touch press model
   *   (PRESS_ONSET_MS in packages/core/src/utils/pressGesture.ts, 2026-10-06)
   */ delaysContentTouchesMs: DELAYS_CONTENT_TOUCHES_MS,
    /**
   * Scroll-to-top after a status-bar tap: not a spring. The offset
   * approaches the top as 1 − e^(−9.7 t) whatever the distance (done in about
   * 1.6 s for 500, 2000 or 8000 pt), which is a decay at this per-millisecond
   * rate (e^(−0.0097)) whose rest point is the top: a decay with a
   * starting velocity of 9.7 × the distance per second. A tap starts it, not
   * a throw, so under Reduce Motion it is a transition, not a coast: it
   * cross-fades to the top within 200 ms on a coarse pointer (DR2) and jumps
   * there on any other (DR3). Only momentum that continues a throw keeps
   * decaying under Reduce Motion (`design:reduced-motion` DR2, DEC-2), so a
   * component checks for Reduce Motion before it plays this decay.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, setContentOffset log after status-bar taps (starts 85–95
   *   ms after the tap), Oct 23 2026
   */ scrollToTopRate: 0.99035
};
function registerScrollTable() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["registerMotionTable"])('scroll', scroll, {
        // Arbitration: who gets the touch, not how anything moves.
        exclude: [
            'delaysContentTouchesMs'
        ]
    });
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/segmented.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "registerSegmentedTable",
    ()=>registerSegmentedTable,
    "segmentedControl",
    ()=>segmentedControl
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file segmented.ts
 * @input Nothing; data only
 * @output Exports `segmentedControl`, UISegmentedControl's selection slide
 *   spring, its drag overshoot and its lift; and `registerSegmentedTable`,
 *   which registers the two springs as internal motion roles
 * @position The segmented-control domain of the UIKit constants table
 *   (motion/uikit); read by SegmentedControl's touch presentation
 *
 * SYNC: When modified, update:
 * - /packages/core/src/SegmentedControl/useSegmentedSelectionMotion.ts
 * - /packages/core/src/motion/README.md (domain list)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/roles.js [app-client] (ecmascript) <locals>");
;
const segmentedControl = {
    /**
   * The selection indicator's slide from the old segment to the new one,
   * after a tap or a programmatic change. Its response is 0.40 s and its
   * damping ratio 0.85. That gives about 1.25 pt of overshoot on a 200 pt
   * move, settled by about 0.6 s. The width follows the same spring when the
   * segments differ in width.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, UIViewSpringAnimationBehavior read on the lens position
   *   for a tap and a programmatic set (dampingRatio 0.85, response 0.40,
   *   tracking off), Oct 23 2026
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, per-frame log of the lens's presentation position and
   *   velocity (method C) for a tap, a programmatic set and an animated set,
   *   least-squares spring fit (response 0.395 / 0.405 / 0.400 s, damping
   *   ratio 0.855 / 0.845 / 0.850, rms at most 0.65 pt over 200 pt),
   *   Oct 23 2026
   */ selectionSpring: {
        response: 0.4,
        dampingRatio: 0.85
    },
    /**
   * How far past the first or last segment's center the lens follows a
   * dragging finger, in pt. Beyond that, the lens stays put while the finger
   * goes on.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, a drag 60 pt past the last segment: the lens stops about
   *   11 pt past its center (312 vs 301), Oct 23 2026
   */ dragOvershoot: 11,
    /**
   * How much a finger's press on the selected segment grows the lens, in pt
   * (width, height). The growth is the same at every control size.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, per-frame lens bounds of a held selected segment:
   *   96 × 27 to 120 × 43 (three segments), 71 × 27 to 95 × 43 (four
   *   segments), 126 × 40 to 150 × 56 (a 390 × 44 control), Oct 23 2026
   */ liftGrowth: [
        24,
        16
    ],
    /**
   * The lens growing by `liftGrowth` under a finger that presses the
   * selected segment, and shrinking back after the release. It is critically
   * damped and reaches 99 % in about 0.27 s.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, UIViewSpringAnimationBehaviorSettings read on the lens
   *   while it lifts and settles (dampingRatio 1.0, response 0.25),
   *   Oct 23 2026
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, per-frame lens bounds of a 600 ms hold of the selected
   *   segment, spring fit with (1.0, 0.25): lift rms 0.16 pt (width) and
   *   0.13 pt (height), settle rms 0.05 pt and 0.03 pt, each starting about
   *   16 ms after the touch event, Nov 2 2026
   */ lift: {
        response: 0.25,
        dampingRatio: 1
    }
};
function registerSegmentedTable() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["registerMotionTable"])('segmented', segmentedControl, {
        roles: [
            'selectionSpring',
            'lift'
        ]
    });
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/springs.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTION_SHEET_DISMISS_SPRING",
    ()=>ACTION_SHEET_DISMISS_SPRING,
    "ACTION_SHEET_PRESENT_SPRING",
    ()=>ACTION_SHEET_PRESENT_SPRING,
    "ALERT_DISMISS_SPRING",
    ()=>ALERT_DISMISS_SPRING,
    "ALERT_PRESENT_SPRING",
    ()=>ALERT_PRESENT_SPRING,
    "BANNER_SPRING",
    ()=>BANNER_SPRING,
    "CONTEXT_MENU_DISMISS_SPRING",
    ()=>CONTEXT_MENU_DISMISS_SPRING,
    "CONTEXT_MENU_LIFT_SPRING",
    ()=>CONTEXT_MENU_LIFT_SPRING,
    "CONTEXT_MENU_MORPH_SPRING",
    ()=>CONTEXT_MENU_MORPH_SPRING,
    "DIRECT_CHANGE_SPRING",
    ()=>DIRECT_CHANGE_SPRING,
    "EMPHASIS_SPRING",
    ()=>EMPHASIS_SPRING,
    "FINGER_TRACKING_SPRING",
    ()=>FINGER_TRACKING_SPRING,
    "KEYBOARD_SPRING",
    ()=>KEYBOARD_SPRING,
    "MENU_CLOSE_SPRING",
    ()=>MENU_CLOSE_SPRING,
    "MENU_OPEN_SPRING",
    ()=>MENU_OPEN_SPRING,
    "MENU_REDUCED_MOTION_SPRING",
    ()=>MENU_REDUCED_MOTION_SPRING,
    "NAVIGATION_BAR_ELEMENTS_SPRING",
    ()=>NAVIGATION_BAR_ELEMENTS_SPRING,
    "NAVIGATION_INTERACTIVE_POP_FINISH_SPRING",
    ()=>NAVIGATION_INTERACTIVE_POP_FINISH_SPRING,
    "NAVIGATION_POP_SPRING",
    ()=>NAVIGATION_POP_SPRING,
    "NAVIGATION_PUSH_SPRING",
    ()=>NAVIGATION_PUSH_SPRING,
    "QUICK_CHANGE_SPRING",
    ()=>QUICK_CHANGE_SPRING,
    "SETTLE_SPRING",
    ()=>SETTLE_SPRING,
    "SHEET_DETENT_SPRING",
    ()=>SHEET_DETENT_SPRING,
    "SHEET_DISMISS_SPRING",
    ()=>SHEET_DISMISS_SPRING,
    "SHEET_DISMISS_SWIPE_SPRING",
    ()=>SHEET_DISMISS_SWIPE_SPRING,
    "SHEET_PRESENT_SPRING",
    ()=>SHEET_PRESENT_SPRING,
    "SHEET_RELEASE_FAST_SPRING",
    ()=>SHEET_RELEASE_FAST_SPRING,
    "SLIDER_DROP_SPRING",
    ()=>SLIDER_DROP_SPRING,
    "SLIDER_LIFT_SPRING",
    ()=>SLIDER_LIFT_SPRING,
    "SLIDER_RELEASE_SPRING",
    ()=>SLIDER_RELEASE_SPRING,
    "STATE_CHANGE_SPRING",
    ()=>STATE_CHANGE_SPRING,
    "SUB_MENU_BACK_SPRING",
    ()=>SUB_MENU_BACK_SPRING,
    "SUB_MENU_OPEN_SPRING",
    ()=>SUB_MENU_OPEN_SPRING,
    "SWITCH_THUMB_MOVE_SPRING",
    ()=>SWITCH_THUMB_MOVE_SPRING,
    "TIMED_CHANGE_SPRING",
    ()=>TIMED_CHANGE_SPRING,
    "VIEW_CHANGE_SPRING",
    ()=>VIEW_CHANGE_SPRING,
    "registerSpringsTable",
    ()=>registerSpringsTable,
    "springs",
    ()=>springs
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file springs.ts
 * @input Nothing; data only
 * @output One export per UIKit / SwiftUI interaction spring the touch
 *   presentations use (`SHEET_PRESENT_SPRING`, `SETTLE_SPRING`, …), each in
 *   the vocabulary of its source (SpringDescription: duration/bounce,
 *   response/dampingRatio or mass/stiffness/damping; a reader normalizes them
 *   to one form), and `springs`, the table of all of them by row name
 * @position The springs domain of the UIKit constants table (motion/uikit)
 *
 * Every leaf carries one or more `@source` (apple-docs | wwdc | webkit |
 * measured | GUESS); webkit and GUESS values also carry the `@measure` task
 * that will confirm or replace them (MEASUREMENTS.md lists them all).
 * uikit.test.ts enforces both.
 *
 * Most springs are measured on iOS 26.2 or documented by Apple; one is still
 * a GUESS (`banner`). `switchThumbMove` is the switch's measured travel,
 * which uikit/switch.ts reads. A guess starts from the nearest sourced
 * spring and names it. A component built on the table gets the measured
 * value the moment it lands, without changing.
 *
 * Press highlight in/out are fades, not springs: see timing.ts.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/motion/MEASUREMENTS.md (measurement tasks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/roles.js [app-client] (ecmascript) <locals>");
;
/**
 * Registers the row as the role `springs.<name>` and returns it. A page that
 * plays no spring ships no springs registry. Each spring role registers
 * itself when the module that plays it loads (one idempotent in-memory write,
 * no DOM). Write each call with the pure annotation, so a bundle that does
 * not use the row drops the call.
 */ function springRole(name, spring) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["registerSpringRole"])(`springs.${name}`, spring);
}
const SETTLE_SPRING = /* @__PURE__ */ springRole('settle', {
    duration: 0.5,
    bounce: 0
});
const QUICK_CHANGE_SPRING = /* @__PURE__ */ springRole('quickChange', {
    duration: 0.5,
    bounce: 0.15
});
const EMPHASIS_SPRING = /* @__PURE__ */ springRole('emphasis', {
    duration: 0.5,
    bounce: 0.3
});
const FINGER_TRACKING_SPRING = /* @__PURE__ */ springRole('fingerTracking', {
    response: 0.15,
    dampingRatio: 0.86
});
const STATE_CHANGE_SPRING = /* @__PURE__ */ springRole('stateChange', {
    response: 0.55,
    dampingRatio: 1
});
const DIRECT_CHANGE_SPRING = /* @__PURE__ */ springRole('directChange', {
    response: 0.5,
    dampingRatio: 0.825
});
const TIMED_CHANGE_SPRING = /* @__PURE__ */ springRole('timedChange', {
    duration: 0.5,
    bounce: 0
});
const VIEW_CHANGE_SPRING = /* @__PURE__ */ springRole('viewChange', {
    mass: 3,
    stiffness: 1000,
    damping: 500
});
const NAVIGATION_PUSH_SPRING = {
    response: 0.3,
    dampingRatio: 1
};
const NAVIGATION_POP_SPRING = {
    response: 0.3,
    dampingRatio: 1
};
const NAVIGATION_INTERACTIVE_POP_FINISH_SPRING = {
    response: 0.3,
    dampingRatio: 0.85
};
const NAVIGATION_BAR_ELEMENTS_SPRING = {
    duration: 0.6,
    bounce: 0
};
const SHEET_PRESENT_SPRING = {
    mass: 3,
    stiffness: 1000,
    damping: 500
};
const SHEET_DISMISS_SPRING = {
    mass: 3,
    stiffness: 1000,
    damping: 500
};
const SHEET_DETENT_SPRING = {
    response: 0.3441442326,
    dampingRatio: 1
};
const SHEET_RELEASE_FAST_SPRING = {
    response: 0.3441442326,
    dampingRatio: 0.8
};
const SHEET_DISMISS_SWIPE_SPRING = /* @__PURE__ */ springRole('sheetDismissSwipe', {
    response: 0.3441442326,
    dampingRatio: 0.8
});
const ALERT_PRESENT_SPRING = {
    mass: 1,
    stiffness: 522.35,
    damping: 45.71
};
const ALERT_DISMISS_SPRING = {
    mass: 1,
    stiffness: 522.35,
    damping: 45.71
};
const ACTION_SHEET_PRESENT_SPRING = {
    mass: 1,
    stiffness: 522.35,
    damping: 45.71
};
const ACTION_SHEET_DISMISS_SPRING = {
    mass: 1,
    stiffness: 522.35,
    damping: 45.71
};
const MENU_OPEN_SPRING = /* @__PURE__ */ springRole('menuOpen', {
    response: 0.32,
    dampingRatio: 0.8
});
const MENU_CLOSE_SPRING = /* @__PURE__ */ springRole('menuClose', {
    response: 0.35,
    dampingRatio: 0.85
});
const SUB_MENU_OPEN_SPRING = /* @__PURE__ */ springRole('subMenuOpen', {
    response: 0.4,
    dampingRatio: 0.85
});
const SUB_MENU_BACK_SPRING = /* @__PURE__ */ springRole('subMenuBack', {
    response: 0.4,
    dampingRatio: 1
});
const CONTEXT_MENU_LIFT_SPRING = /* @__PURE__ */ springRole('contextMenuLift', {
    response: 0.32,
    dampingRatio: 0.8
});
const CONTEXT_MENU_DISMISS_SPRING = /* @__PURE__ */ springRole('contextMenuDismiss', {
    response: 0.35,
    dampingRatio: 0.85
});
const CONTEXT_MENU_MORPH_SPRING = /* @__PURE__ */ springRole('contextMenuMorph', {
    response: 0.3,
    dampingRatio: 0.8
});
const MENU_REDUCED_MOTION_SPRING = {
    response: 0.4,
    dampingRatio: 1
};
const SWITCH_THUMB_MOVE_SPRING = {
    response: 0.3,
    dampingRatio: 1
};
const KEYBOARD_SPRING = {
    mass: 1,
    stiffness: 555.0265,
    damping: 47.118
};
const BANNER_SPRING = {
    mass: 3,
    stiffness: 1000,
    damping: 500
};
const SLIDER_RELEASE_SPRING = /* @__PURE__ */ springRole('sliderRelease', {
    response: 0.4,
    dampingRatio: 1
});
const SLIDER_LIFT_SPRING = /* @__PURE__ */ springRole('sliderLift', {
    response: 0.215,
    dampingRatio: 0.6
});
const SLIDER_DROP_SPRING = /* @__PURE__ */ springRole('sliderDrop', {
    response: 0.5,
    dampingRatio: 0.7
});
const springs = {
    settle: SETTLE_SPRING,
    quickChange: QUICK_CHANGE_SPRING,
    emphasis: EMPHASIS_SPRING,
    fingerTracking: FINGER_TRACKING_SPRING,
    stateChange: STATE_CHANGE_SPRING,
    directChange: DIRECT_CHANGE_SPRING,
    timedChange: TIMED_CHANGE_SPRING,
    viewChange: VIEW_CHANGE_SPRING,
    navigationPush: NAVIGATION_PUSH_SPRING,
    navigationPop: NAVIGATION_POP_SPRING,
    navigationInteractivePopFinish: NAVIGATION_INTERACTIVE_POP_FINISH_SPRING,
    navigationBarElements: NAVIGATION_BAR_ELEMENTS_SPRING,
    sheetPresent: SHEET_PRESENT_SPRING,
    sheetDismiss: SHEET_DISMISS_SPRING,
    sheetDetent: SHEET_DETENT_SPRING,
    sheetReleaseFast: SHEET_RELEASE_FAST_SPRING,
    sheetDismissSwipe: SHEET_DISMISS_SWIPE_SPRING,
    alertPresent: ALERT_PRESENT_SPRING,
    alertDismiss: ALERT_DISMISS_SPRING,
    actionSheetPresent: ACTION_SHEET_PRESENT_SPRING,
    actionSheetDismiss: ACTION_SHEET_DISMISS_SPRING,
    menuOpen: MENU_OPEN_SPRING,
    menuClose: MENU_CLOSE_SPRING,
    subMenuOpen: SUB_MENU_OPEN_SPRING,
    subMenuBack: SUB_MENU_BACK_SPRING,
    contextMenuLift: CONTEXT_MENU_LIFT_SPRING,
    contextMenuDismiss: CONTEXT_MENU_DISMISS_SPRING,
    contextMenuMorph: CONTEXT_MENU_MORPH_SPRING,
    menuReducedMotion: MENU_REDUCED_MOTION_SPRING,
    switchThumbMove: SWITCH_THUMB_MOVE_SPRING,
    keyboard: KEYBOARD_SPRING,
    banner: BANNER_SPRING,
    sliderRelease: SLIDER_RELEASE_SPRING,
    sliderLift: SLIDER_LIFT_SPRING,
    sliderDrop: SLIDER_DROP_SPRING
};
/**
 * The only springs that are motion roles. The touch presentations' record
 * names some, and a component's own record names others, such as Slider's
 * three. The generated motion role table lists each with its record.
 * The registry takes these rows alone, so registering ships no other spring.
 */ const SPRING_ROLES = {
    fingerTracking: FINGER_TRACKING_SPRING,
    emphasis: EMPHASIS_SPRING,
    settle: SETTLE_SPRING,
    quickChange: QUICK_CHANGE_SPRING,
    viewChange: VIEW_CHANGE_SPRING,
    timedChange: TIMED_CHANGE_SPRING,
    stateChange: STATE_CHANGE_SPRING,
    directChange: DIRECT_CHANGE_SPRING,
    menuOpen: MENU_OPEN_SPRING,
    menuClose: MENU_CLOSE_SPRING,
    subMenuOpen: SUB_MENU_OPEN_SPRING,
    subMenuBack: SUB_MENU_BACK_SPRING,
    sheetDismissSwipe: SHEET_DISMISS_SWIPE_SPRING,
    contextMenuLift: CONTEXT_MENU_LIFT_SPRING,
    contextMenuDismiss: CONTEXT_MENU_DISMISS_SPRING,
    contextMenuMorph: CONTEXT_MENU_MORPH_SPRING,
    sliderRelease: SLIDER_RELEASE_SPRING,
    sliderLift: SLIDER_LIFT_SPRING,
    sliderDrop: SLIDER_DROP_SPRING
};
function registerSpringsTable() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["registerMotionTable"])('springs', SPRING_ROLES, {
        roles: Object.keys(SPRING_ROLES)
    });
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/switch.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "registerSwitchTable",
    ()=>registerSwitchTable,
    "switchControl",
    ()=>switchControl
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file switch.ts
 * @input The springs table's measured switch travel (springs.ts)
 * @output Exports `switchControl`: UISwitch's geometry, the springs of its
 *   Liquid Glass thumb and of its track color, the drag's rubber band and
 *   flip distance, and the release timing
 * @position The switch domain of the UIKit constants table (motion/uikit)
 *
 * The values are UISwitch's on iOS 26.2, read in a UIKit host app on the
 * simulator. Lengths are in pt (CSS px). uikit.test.ts checks each `@source`.
 *
 * SYNC: When modified, update /packages/core/src/motion/MEASUREMENTS.md.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/roles.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$springs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/springs.js [app-client] (ecmascript)");
;
;
const switchControl = {
    /**
   * The control's size (width × height): the track.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, `UISwitch` frame 63 × 28 (intrinsic 61 × 28), track view
   *   63 × 28 with corner radius 14, Oct 23 2026
   */ trackSize: [
        63,
        28
    ],
    /**
   * The thumb at rest (width × height), inset equally from the track's top,
   * bottom and nearer end; it never changes size between off and on.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, `_UILiquidLensView` frame 37 × 24 at x 2 (off) and
   *   x 24 (on) inside the 63 × 28 track, Oct 23 2026
   */ thumbSize: [
        37,
        24
    ],
    /**
   * The thumb lifted under a finger (width × height). The lens grows about
   * its own center, past the track, and holds this size while the finger
   * stays down.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, lens bounds settled at 58 × 38.33 during a 1 s hold
   *   (center unmoved), Oct 23 2026
   */ liftedThumbSize: [
        58,
        38.333
    ],
    /**
   * The lift: the thumb growing to `liftedThumbSize` while its white fill
   * fades out and the clear glass fades in (one spring drives all three).
   * Starts with the touch outside a scroll view, after its content delay
   * inside one. UISwitch keeps it under Reduce Motion; core's Switch does not
   * lift then.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, per-frame lens bounds during a 1 s hold fitted with one
   *   spring for width and height (rms 0.29 pt; the fill's and the glass's
   *   opacity overshoot by the same 13 %; the lens's settings read on a tap
   *   say damping 0.625, response 0.27, whose 8 % overshoot is short of the
   *   frames' 12 %), Oct 23 2026
   */ lift: {
        response: 0.23,
        dampingRatio: 0.55
    },
    /**
   * The settle after the finger lifts: the lens shrinking back to
   * `thumbSize` while the white fill returns over the glass.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, the lens's spring settings read on a tap (damping 0.7,
   *   response 0.5); per-frame lens bounds after the lift of a 1 s hold fit
   *   one spring at 0.49 / 0.70 (rms 0.065 pt; the opacities undershoot by
   *   the same 4.5 %), Oct 23 2026
   */ settle: {
        response: 0.5,
        dampingRatio: 0.7
    },
    /**
   * The settle never starts sooner than this after the lift began, so a
   * quick tap still shows the lifted lens, in ms.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, a 50 ms tap: the lift→settle hand-off fitted at 235 ms
   *   after the lift began (rms 0.33 pt), Oct 23 2026
   * @measure M-SW07
   */ minimumLiftMs: 235,
    /**
   * The thumb travelling to the committed end after a release or a
   * programmatic change. It starts from the thumb's own velocity.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, the lens's position behavior read on a tap (damping 1,
   *   response 0.3); the lens center after a 50 ms tap and after a 1 s hold
   *   fits one spring at 0.31 / 1 (rms 0.11 pt), Oct 23 2026; the springs
   *   table's `SWITCH_THUMB_MOVE_SPRING` holds the one value
   */ travel: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$springs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SWITCH_THUMB_MOVE_SPRING"],
    /**
   * During a drag the thumb chases the finger: each move retargets this
   * spring at the finger's position, rubber-banded past either end.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, a 4 s drag off → on → past both ends: the lens center
   *   simulated as this spring chasing the rubber-banded finger fits every
   *   frame (rms 0.21 pt), Oct 23 2026
   */ tracking: {
        response: 0.36,
        dampingRatio: 1
    },
    /**
   * The drag's rubber band past either end: UIScrollView's
   * `(1 − 1 ÷ (x·c ÷ d + 1))·d`. The coefficient c and the dimension d are in
   * pt for the 28 pt control. Scale d with the track height.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, the same drag fit: c 0.55, d 11.75–12 pt, the
   *   translation measured from where the finger landed, Oct 23 2026
   */ rubberBand: {
        coefficient: 0.55,
        dimension: 12
    },
    /**
   * A drag flips the switch by the finger, not the thumb. Once the finger is
   * this far from where it landed, toward the other end, the switch shows
   * the other side. The distance is the track width minus the thumb width
   * (63 − 37 pt). Back past where it landed, the starting side shows again.
   * Flips happen on touch events only, so a fast swipe flips on the lift.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, `UISwitchModernVisualElement` ivars per frame and the
   *   "SwitchWellPosition" springs during 1 pt-step drags: the same 26 pt for
   *   presses at x 8, 20.5 and 45, with and without a 400 ms hold, mirrored
   *   on an on switch; flipping back at the press point, Oct 23 2026
   */ flipDistance: 26,
    /**
   * The track color turning on: the well image sliding in on a critically
   * damped spring, starting when the switch flips (the lift of a tap).
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, `CASpringAnimation` "SwitchWellPosition" read: mass 1,
   *   stiffness 85.377, damping 18.480 (response 0.68 s), Oct 23 2026
   */ wellOn: {
        mass: 1,
        stiffness: 85.37720070146501,
        damping: 18.47995678582231
    },
    /**
   * The track color turning off: the same well sliding back, faster.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, `CASpringAnimation` "SwitchWellPosition" read: mass 1,
   *   stiffness 246.740, damping 31.416 (response 0.40 s), Oct 23 2026
   */ wellOff: {
        mass: 1,
        stiffness: 246.74011002723395,
        damping: 31.41592653589793
    },
    /**
   * The lifted lens's drop shadow: y offset and radius in pt, then black
   * alpha; none at rest.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, the lens layer's presented `shadowOffset` (0, 7),
   *   `shadowRadius` 3, `shadowOpacity` 0.12 once lifted, 0 at rest,
   *   Oct 23 2026
   */ liftedShadow: [
        7,
        3,
        0.12
    ],
    /**
   * UISwitch plays no haptic on a tap, a hold or a drag.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, every `UIFeedbackGenerator` entry point hooked: no call
   *   on tap, hold, drag or flip, Oct 23 2026
   */ haptic: 'none'
};
function registerSwitchTable() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["registerMotionTable"])('switchControl', switchControl, {
        roles: [
            'lift',
            'settle',
            'travel',
            'tracking',
            'wellOn',
            'wellOff',
            'minimumLiftMs'
        ]
    });
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/timing.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "press",
    ()=>press,
    "reducedMotionCrossFade",
    ()=>reducedMotionCrossFade,
    "registerReducedMotionCrossFade",
    ()=>registerReducedMotionCrossFade,
    "registerTimingTable",
    ()=>registerTimingTable,
    "timing",
    ()=>timing
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file timing.ts
 * @input Nothing; data only
 * @output Exports `timing`: the non-spring clocks and curves UIKit uses
 *   (press highlight onset, flash and fade, Core Animation's named Bézier
 *   curves, the navigation bar hide/show duration, the keyboard
 *   notification duration, the Reduced Motion cross-fade)
 * @position The timing domain of the UIKit constants table (motion/uikit)
 *
 * Every leaf carries one or more `@source` (apple-docs | wwdc | webkit |
 * measured | GUESS); webkit and GUESS values also carry the `@measure` task
 * that will confirm or replace them (MEASUREMENTS.md). uikit.test.ts
 * enforces both.
 *
 * Durations are in ms (the unit of pointer-event timestamps, which these
 * clocks are compared against); curves are cubic-bézier control points
 * [x1, y1, x2, y2].
 *
 * SYNC: When modified, update:
 * - /packages/core/src/motion/MEASUREMENTS.md (measurement tasks)
 * - /packages/core/src/utils/pressGesture.ts (the press clocks are measured
 *   there and must agree; uikit/uikit.test.ts checks it)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/roles.js [app-client] (ecmascript) <locals>");
;
const press = {
    /**
   * Highlight onset once a press is believed: none, the highlight is
   * painted in the frame the touch is accepted (after
   * `scroll.delaysContentTouchesMs` inside a scroller).
   * @source measured: Settings and Contacts, iOS 26.2, simulator driven
   *   with real HID touches at 60 fps (touch press model,
   *   packages/core/src/utils/pressGesture.ts, 2026-10-06)
   */ highlightInMs: 0,
    /**
   * A tap released before the onset delay still flashes the highlight at
   * full strength for this long before fading.
   * @source measured: Settings and Contacts, iOS 26.2, simulator driven
   *   with real HID touches at 60 fps (PRESS_FLASH_MS,
   *   packages/core/src/utils/pressGesture.ts, 2026-10-06)
   */ flashMs: 100,
    /**
   * Highlight fade after release: UIKit's deselect cross-fade. Reference
   * only, not played: a press release plays the theme's exit motion tokens
   * (`--duration-exit`, `--ease-exit`).
   * @source measured: Settings and Contacts, iOS 26.2, simulator driven
   *   with real HID touches at 60 fps (touch press model,
   *   packages/core/src/utils/pressGesture.ts, 2026-10-06)
   */ highlightOutMs: 200,
    /**
   * The highlight fade's curve after release: an ease-out that spends the
   * whole clock fading (strength about 0.2 at the midpoint). Reference only,
   * not played: a press release plays the theme's `--ease-exit`.
   * @source GUESS — the release curve the touch press model shipped with,
   *   chosen to read as UIKit's deselect cross-fade, not read from UIKit
   * @measure M-PR1
   */ highlightOutCurve: [
        0,
        0,
        0.2,
        1
    ],
    /**
   * A touch on a scroller that moved this recently brakes it instead of
   * pressing.
   * @source measured: Settings and Contacts, iOS 26.2, simulator driven
   *   with real HID touches at 60 fps (PRESS_SCROLL_BRAKE_MS,
   *   packages/core/src/utils/pressGesture.ts, 2026-10-06)
   */ scrollBrakeMs: 150,
    /**
   * UIButton (filled configuration) release: the label cross-fade and the
   * background color both run 0.25 s on `curves.move`.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, CAAnimation read (CATransition fade and backgroundColor),
   *   Oct 23 2026
   */ buttonReleaseMs: 250
};
const reducedMotionCrossFade = {
    /**
   * The Reduced Motion cross-fade, in ms, on `curves.move`: under
   * Reduce Motion an entrance, exit, presentation switch or state change
   * becomes an opacity-only cross-fade of this length on a coarse pointer
   * (design:reduced-motion DR2 caps it at 200 ms, by owner decision DEC-1
   * of 2026-10-24, departing from UIKit's own navigation cross-fade,
   * measured below at 0.5 s). Not a role: nothing lengthens it (DR4).
   * @source apple-docs https://developer.apple.com/documentation/uikit/uiaccessibility/preferscrossfadetransitions
   *   (the setting)
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, CAAnimation dump with Reduce Motion and Prefer
   *   Cross-Fade Transitions on (opacity CABasicAnimation 0.5 s,
   *   (0.42, 0, 0.58, 1)), Oct 23 2026
   */ durationMs: 200,
    /**
   * `easeInEaseOut`; UIKit's default curve (`UIView.AnimationCurve
   * .easeInOut`, "the default curve for most animations").
   * @source apple-docs https://developer.apple.com/documentation/quartzcore/camediatimingfunctionname/easeineaseout
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, CAMediaTimingFunction read from UIView.animate,
   *   Oct 23 2026
   */ curve: [
        0.42,
        0,
        0.58,
        1
    ]
};
// `timing` composes the fade from bindings, not property reads, so a bundle
// that reads only the fade drops the rest of the table.
const { durationMs: reducedMotionCrossFadeMs, curve: move } = reducedMotionCrossFade;
const timing = {
    press,
    curves: {
        /**
     * `CAMediaTimingFunctionName.default`: "the timing of … most system
     * animations" that are not springs.
     * @source apple-docs https://developer.apple.com/documentation/quartzcore/camediatimingfunctionname/default
     * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
     *   iPhone 17 Pro, CAMediaTimingFunction read from UIView.animate,
     *   Oct 23 2026
     */ viewChange: [
            0.25,
            0.1,
            0.25,
            1
        ],
        // The Reduce Motion fade's curve, sourced on `reducedMotionCrossFade`.
        move,
        /**
     * `easeIn`.
     * @source apple-docs https://developer.apple.com/documentation/quartzcore/camediatimingfunctionname/easein
     * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
     *   iPhone 17 Pro, CAMediaTimingFunction read from UIView.animate,
     *   Oct 23 2026
     */ exit: [
            0.42,
            0,
            1,
            1
        ],
        /**
     * `easeOut`.
     * @source apple-docs https://developer.apple.com/documentation/quartzcore/camediatimingfunctionname/easeout
     * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
     *   iPhone 17 Pro, CAMediaTimingFunction read from UIView.animate,
     *   Oct 23 2026
     */ entrance: [
            0,
            0,
            0.58,
            1
        ]
    },
    /**
   * `UINavigationController.hideShowBarDuration`, in ms.
   * @source apple-docs https://developer.apple.com/documentation/uikit/uinavigationcontroller/hideshowbarduration
   *   (the constant, not its value)
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, read, Oct 23 2026
   */ navigationBarHideShowMs: 200,
    /**
   * The duration the keyboard notifications report
   * (UIKeyboardAnimationDurationUserInfoKey, with curve 7), show and hide
   * alike, in ms. The frame follows `springs.keyboard`, cut at this time.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, UIKeyboardWillShow / WillHide / WillChangeFrame read,
   *   Oct 23 2026
   */ keyboardNotificationMs: 383.3,
    /**
   * Core Animation's implicit animation duration
   * (`CATransaction.animationDuration()`), in ms.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, read, Oct 23 2026
   */ stateChangeMs: 250,
    // The Reduce Motion fade's length, sourced on `reducedMotionCrossFade`.
    reducedMotionCrossFadeMs
};
function registerTimingTable() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["registerMotionTable"])('timing', timing, {
        // Arbitration: who gets the touch, not how anything moves; the Reduced
        // Motion fade, which nothing may lengthen (design:reduced-motion DR4);
        // and the keyboard's own timing, which motion in step with the keyboard
        // rides (spec:AST-094 FR4).
        exclude: [
            'press.scrollBrakeMs',
            'reducedMotionCrossFadeMs',
            'keyboardNotificationMs'
        ],
        // The motion roles: only the ones spec:AST-094 FR4 names. The press
        // clocks and every other value are internal measured constants.
        roles: [
            'stateChangeMs',
            'curves.viewChange',
            'curves.exit',
            'curves.entrance',
            'curves.move'
        ]
    });
}
// The fade's curve under its table path, for registerReducedMotionCrossFade.
const reducedMotionCrossFadeRoles = {
    curves: {
        move
    }
};
function registerReducedMotionCrossFade() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["registerMotionTable"])('timing', reducedMotionCrossFadeRoles, {
        roles: [
            'curves.move'
        ]
    });
}
}),
]);

//# sourceMappingURL=0aq__%40astryxdesign_core_dist_motion_1hzgj40guv2e3._.js.map