module.exports = [
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/GestureArena.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GestureArena",
    ()=>GestureArena,
    "browserClock",
    ()=>browserClock
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file GestureArena.ts
 * @input Touch input (began / moved / ended / cancelled / taken by the
 *   browser), each new touch with the recognizers on its hit path and the
 *   view-level consumer under it
 * @output Exports GestureArena (UIKit's gesture environment), its clock
 *   abstraction and the click disposition type
 * @position Pure coordinator of packages/core/src/gestures: no DOM. The DOM
 *   host (GestureHost.ts) feeds it real events and carries out what it
 *   decides; tests feed it synthetic streams with explicit timestamps.
 *
 * WHAT IT DECIDES, the way UIKit decides it:
 *
 * - Participation. A new touch is offered to every recognizer on its hit
 *   path, innermost first; each one that accepts it tracks it until it ends.
 * - Exclusivity. Two recognizers that share a touch are not active at once
 *   unless both allow it (`shouldRecognizeSimultaneously`, FR15). The first
 *   to recognize fails the other possible ones; a recognizer that tries to
 *   begin while a conflicting one is active fails instead.
 * - Failure requirements. A recognizer that requires another to fail waits
 *   (still `possible`) until that one fails, then recognizes; if that one
 *   recognizes, it fails. An idle recognizer holds nothing up.
 * - Delivery to the view. The touch's consumer (a pressable control) gets
 *   began / moved / ended unless a recognizer delays them
 *   (`delaysTouchesBegan`, `delaysTouchesEnded`) or recognizing cancels them
 *   (`cancelsTouchesInView`).
 * - The browser. A touch owned by a recognized gesture is CLAIMED: the host
 *   cancels the browser's pan and zoom for it. A touch whose gesture
 *   cancelled the view's touches has its click swallowed; a click held for a
 *   recognizer that may still recognize is DEFERRED, then replayed or dropped.
 *
 * TIME. Every input carries its timestamp, and timers are deadlines on that
 * same clock. Before an input is processed, every timer due at or before its
 * timestamp runs first, at its own deadline. A long press therefore begins at
 * exactly touch-down + 500 ms even when the main thread was blocked and the
 * timer callback came late, and a test drives the whole machine with explicit
 * timestamps and no real time at all.
 *
 * SYNC: When modified, update GestureRecognizer.ts and
 * __tests__/arena.test.ts.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/GestureRecognizer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/types.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/recognizerInternals.js [app-ssr] (ecmascript)");
;
;
;
const browserClock = {
    now: ()=>typeof performance === 'undefined' ? Date.now() : performance.now(),
    setTimeout: (callback, ms)=>setTimeout(callback, ms),
    clearTimeout: (handle)=>clearTimeout(handle)
};
class GestureArena {
    /** The touches whose move the arena is delivering right now. */ movingIds = new Set();
    records = new Map();
    /** Recognizers involved in the current interaction, in resolution order. */ active = [];
    timers = new Map();
    realTimer = null;
    realTimerDeadline = Number.POSITIVE_INFINITY;
    /** The time of the event or timer being processed; null between them. */ currentTime = null;
    /** The latest time processed: input never moves the clock backwards. */ latestTime = Number.NEGATIVE_INFINITY;
    depth = 0;
    /** Open `deferResolution` calls: what their stops unblock waits. */ deferDepth = 0;
    /** A deferred stop left a resolution for the next pass. */ owesResolution = false;
    constructor(options = {}){
        this.options = options;
        this.clock = options.clock ?? browserClock;
        this.environment = options.environment ?? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_ENVIRONMENT"];
    }
    // --- Queries ---------------------------------------------------------------
    /** The current time on the event clock. */ now() {
        return this.currentTime ?? Math.max(this.latestTime, this.clock.now());
    }
    /** Whether a recognizer owns this touch, so the browser must not pan or zoom it. */ isClaimed(id) {
        return this.records.get(id)?.isClaimed === true;
    }
    /** @internal The view-level consumer of this touch, if any. */ consumerOf(id) {
        return this.records.get(id)?.consumer ?? null;
    }
    /** The live touch with this id. */ getTouch(id) {
        return this.records.get(id)?.touch;
    }
    /**
   * The recognizers that took touch `id` when it began: each was enabled,
   * accepted its pointer, and its `shouldReceiveTouch` agreed. Empty for a
   * touch the arena does not track.
   */ participantsOf(id) {
        return this.records.get(id)?.participants ?? [];
    }
    /** Every touch the arena tracks, lifted ones awaiting a decision included. */ get touches() {
        return [
            ...this.records.values()
        ].map((record)=>record.touch);
    }
    /** Recognizers taking part in the current interaction, in resolution order. */ get involvedRecognizers() {
        return this.active;
    }
    // --- Input -----------------------------------------------------------------
    /** New contacts, each with the recognizers on its hit path. */ began(inputs) {
        if (inputs.length === 0) {
            return;
        }
        this.run(inputs[0].time, ()=>{
            const newTouches = new Map();
            const created = [];
            for (const input of inputs){
                if (this.records.has(input.id)) {
                    continue;
                }
                const time = this.clampTime(input.time);
                const sample = {
                    x: input.x,
                    y: input.y,
                    time
                };
                const touch = {
                    id: input.id,
                    pointerType: input.pointerType,
                    phase: 'began',
                    x: input.x,
                    y: input.y,
                    time,
                    startX: input.x,
                    startY: input.y,
                    startTime: time,
                    samples: [
                        ...input.history ?? [],
                        sample
                    ],
                    target: input.target,
                    scroll: input.scroll ?? null,
                    takenByBrowser: false,
                    ...input.scrollType == null ? {} : {
                        scrollType: input.scrollType
                    }
                };
                const participants = [];
                for (const [depth, recognizer] of input.recognizers.entries()){
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).wantsTouch(touch)) {
                        continue;
                    }
                    participants.push(recognizer);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).arena = this;
                    if (!this.active.includes(recognizer)) {
                        // Resolution follows `active`, so a recognizer joins ahead of any
                        // that sits further out on this touch's path: when two recognize
                        // on the same event the innermost wins (FR15), whichever finger
                        // brought the outer one in first.
                        const outer = this.active.findIndex((other)=>input.recognizers.indexOf(other) > depth);
                        if (outer === -1) {
                            this.active.push(recognizer);
                        } else {
                            this.active.splice(outer, 0, recognizer);
                        }
                    }
                    const list = newTouches.get(recognizer) ?? [];
                    list.push(touch);
                    newTouches.set(recognizer, list);
                }
                const record = {
                    touch,
                    participants,
                    consumer: input.consumer ?? null,
                    view: 'none',
                    isLifted: false,
                    isClaimed: false,
                    suppressClick: false,
                    deferredClick: false
                };
                this.records.set(input.id, record);
                created.push(record);
            }
            const context = this.context();
            for (const recognizer of [
                ...this.active
            ]){
                const touches = newTouches.get(recognizer);
                if (touches != null) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).deliverBegan(touches, context);
                }
            }
            // A recognizer already tracking a gesture hears of a touch that began
            // off its hit path (a second finger elsewhere on the page), which it
            // would otherwise never see.
            for (const recognizer of [
                ...this.active
            ]){
                const own = newTouches.get(recognizer);
                const elsewhere = created.map((record)=>record.touch).filter((touch)=>own == null || !own.includes(touch));
                if (elsewhere.length > 0 && recognizer.numberOfTouches > 0) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).deliverBeganElsewhere(elsewhere, context);
                }
            }
            for (const record of created){
                this.deliverViewBegan(record);
            }
        });
    }
    /**
   * A contact began where nothing takes part (plain page content). It is
   * never tracked and stays the browser's; recognizers already tracking a
   * gesture hear of it, as of any touch off their hit path.
   */ untrackedBegan(input) {
        if (!this.active.some((recognizer)=>recognizer.numberOfTouches > 0)) {
            return;
        }
        this.run(input.time, ()=>{
            const time = this.clampTime(input.time);
            const touch = {
                id: input.id,
                pointerType: input.pointerType,
                phase: 'began',
                x: input.x,
                y: input.y,
                time,
                startX: input.x,
                startY: input.y,
                startTime: time,
                samples: [
                    {
                        x: input.x,
                        y: input.y,
                        time
                    }
                ],
                target: input.target,
                scroll: input.scroll ?? null,
                takenByBrowser: false
            };
            const context = this.context();
            for (const recognizer of [
                ...this.active
            ]){
                if (recognizer.numberOfTouches > 0) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).deliverBeganElsewhere([
                        touch
                    ], context);
                }
            }
        });
    }
    /** Contacts moved. */ moved(inputs) {
        if (inputs.length === 0) {
            return;
        }
        this.run(inputs[0].time, ()=>{
            const changed = this.update(inputs, 'moved');
            if (changed.length === 0) {
                return;
            }
            const context = this.context();
            const previous = this.movingIds;
            this.movingIds = new Set(changed.map((touch)=>touch.id));
            try {
                for (const recognizer of [
                    ...this.active
                ]){
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).deliverMoved(changed, context);
                }
            } finally{
                this.movingIds = previous;
            }
            for (const touch of changed){
                const record = this.records.get(touch.id);
                if (record?.view === 'delivered') {
                    record.consumer?.touchMoved(touch);
                }
            }
        });
    }
    /**
   * Contacts lifted. Returns, per touch, what the browser's click for it
   * should do.
   */ ended(inputs) {
        const dispositions = new Map();
        if (inputs.length === 0) {
            return dispositions;
        }
        this.run(inputs[0].time, ()=>{
            const changed = this.update(inputs, 'ended');
            const context = this.context();
            for (const recognizer of [
                ...this.active
            ]){
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).deliverEnded(changed, context);
            }
            // A lift can decide a waiting recognition (its requirement lifted
            // undecided and failed): settle those first, so each click's answer is
            // the final one, never a `defer` for a click already replayed (FR21).
            this.reviewPending();
            for (const touch of changed){
                const record = this.records.get(touch.id);
                if (record == null) {
                    continue;
                }
                record.isLifted = true;
                dispositions.set(touch.id, this.resolveEnd(record));
            }
        });
        return dispositions;
    }
    /** The system took these contacts (`touchcancel`, a mouse `pointercancel`). */ cancelled(ids, time) {
        this.run(time, ()=>{
            const touches = this.liveTouches(ids);
            for (const touch of touches){
                touch.phase = 'cancelled';
            }
            const context = this.context();
            for (const recognizer of [
                ...this.active
            ]){
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).deliverCancelled(touches, context);
            }
            for (const touch of touches){
                const record = this.records.get(touch.id);
                if (record == null) {
                    continue;
                }
                record.isLifted = true;
                record.suppressClick = true;
                this.cancelView(record);
            }
        });
    }
    /**
   * The browser took these contacts for its own pan or zoom: their pointer
   * stream is gone (`pointercancel`) and no click will follow. Possible
   * recognizers sharing them fail and active ones are cancelled, as UIKit
   * fails everything a scroll view's pan beats, except a recognizer that
   * keeps observing the touch. Such a watcher never claims it: a drag the
   * browser took stays the browser's (FR14).
   */ browserTookOver(ids, time) {
        this.run(time, ()=>{
            const touches = this.liveTouches(ids).filter((touch)=>!touch.takenByBrowser);
            if (touches.length === 0) {
                return;
            }
            for (const touch of touches){
                touch.takenByBrowser = true;
            }
            const context = this.context();
            for (const recognizer of [
                ...this.active
            ]){
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).deliverTakenByBrowser(touches, context);
            }
            for (const touch of touches){
                const record = this.records.get(touch.id);
                if (record == null) {
                    continue;
                }
                record.suppressClick = true;
                this.cancelView(record);
            }
        });
    }
    /** Run every timer due at or before `time` (the host's timer and tests). */ advanceTime(time) {
        this.run(time, ()=>{});
    }
    // --- Recognizer requests (internal) ----------------------------------------
    /** @internal A recognizer asked for a state change. */ requestTransition(recognizer, next) {
        const from = recognizer.state;
        if (next === 'failed') {
            this.fail(recognizer);
            return;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).pending != null && (next === 'began' || next === 'ended')) {
            // Already waiting on a requirement; the recognition stands as asked.
            return;
        }
        if (from === 'possible' && (next === 'began' || next === 'ended')) {
            this.attemptRecognition(recognizer, next);
            return;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isActive"])(from) && (next === 'changed' || next === 'ended')) {
            this.apply(recognizer, next);
            return;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isActive"])(from) && next === 'cancelled') {
            this.apply(recognizer, 'cancelled');
        }
    }
    /** @internal Arm a recognizer's one timer at an absolute deadline. */ setTimer(recognizer, deadline, callback) {
        this.timers.set(recognizer, {
            deadline,
            callback
        });
        this.scheduleRealTimer();
    }
    /** @internal */ clearTimer(recognizer) {
        if (this.timers.delete(recognizer)) {
            this.scheduleRealTimer();
        }
    }
    /** @internal A recognizer takes its touches from the view, unclaimed. */ cancelTouchesInViewOf(recognizer) {
        this.cancelViewTouchesOf(recognizer);
    }
    /**
   * Runs `body`, code outside input that stops recognizers (an Effect that
   * turns one off or detaches it), without resolving what those stops
   * unblock: the recognitions waiting on them, the touches they held from
   * a view, the resets. A pass a microtask later resolves all of it, at the
   * last event's time, so the listeners and consumers it reaches hear it
   * outside the caller's frame and read the recognized state
   * (react-component-runtime INV2).
   */ deferResolution(body) {
        this.deferDepth += 1;
        try {
            body();
        } finally{
            this.deferDepth -= 1;
        }
        if (this.deferDepth === 0 && this.owesResolution) {
            queueMicrotask(()=>{
                if (this.owesResolution && this.deferDepth === 0) {
                    this.run(this.lastEventTime(), ()=>{});
                }
            });
        }
    }
    /** The last event's time, or now before any event. */ lastEventTime() {
        return Number.isFinite(this.latestTime) ? this.latestTime : this.clock.now();
    }
    /** Cancel an active recognizer, or fail a possible one. */ stop(recognizer) {
        // A cancel from code between events happens at the last event's time:
        // wall time would run deadlines ahead of input still queued (FR16).
        const time = this.currentTime ?? (Number.isFinite(this.latestTime) ? this.latestTime : this.clock.now());
        this.run(time, ()=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isActive"])(recognizer.state)) {
                this.apply(recognizer, 'cancelled');
            } else if (recognizer.state === 'possible' && recognizer.isInvolved()) {
                // An idle recognizer stays `possible`: nothing would ever reset it.
                this.fail(recognizer);
            }
        });
    }
    // --- Resolution ------------------------------------------------------------
    attemptRecognition(recognizer, next) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).shouldBegin() || this.isVetoedByConsumer(recognizer) || this.isRefusedByBrowser(recognizer)) {
            this.fail(recognizer);
            return;
        }
        let isWaiting = false;
        for (const other of this.active){
            if (other === recognizer || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).requiresFailureOf(other)) {
                continue;
            }
            if (other.state === 'failed') {
                continue;
            }
            if (other.state !== 'possible') {
                // The requirement recognized (or is mid-gesture): this one cannot.
                this.fail(recognizer);
                return;
            }
            if (other.isInvolved()) {
                isWaiting = true;
            }
        }
        if (isWaiting) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).pending = next;
            this.claim(recognizer);
            return;
        }
        for (const other of this.active){
            if (other !== recognizer && (// A discrete winner (`ended`) still holding its touches blocks too.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isActive"])(other.state) || other.state === 'ended' && other.trackedTouches.length > 0) && this.conflicts(other, recognizer)) {
                this.fail(recognizer);
                return;
            }
        }
        this.apply(recognizer, next);
        // Recognizing beats every possible recognizer it conflicts with, and
        // everything that required it to fail.
        for (const other of [
            ...this.active
        ]){
            if (other === recognizer || other.state !== 'possible') {
                continue;
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(other).requiresFailureOf(recognizer) || this.conflicts(recognizer, other)) {
                this.fail(other);
            }
        }
        this.claim(recognizer);
        // A watcher takes nothing from the view either: the press and the click
        // under it stay (spec:AST-094 FR11, FR19; FR15 exempts watchers). Only
        // `cancelTouchesInView` takes them, as a pager's catch on a release's settle
        // does.
        if (recognizer.claimsTouches && recognizer.cancelsTouchesInView) {
            this.cancelViewTouchesOf(recognizer);
        }
    }
    /** Whether `winner` being recognized prevents `other`. */ conflicts(winner, other) {
        if (!sharesTouches(winner, other) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(winner).allowsSimultaneous(other) || // A watcher (claimsTouches false) prevents nothing and nothing
        // prevents it.
        !winner.claimsTouches || !other.claimsTouches) {
            return false;
        }
        return winner.canPrevent(other) && other.canBePrevented(winner);
    }
    /**
   * Whether a recognizer that claims touches would take a contact the
   * browser keeps while it is down (`refusesClaim`).
   */ isRefusedByBrowser(recognizer) {
        const refuses = this.options.refusesClaim;
        if (refuses == null || !recognizer.claimsTouches) {
            return false;
        }
        return recognizer.trackedTouches.some((touch)=>touch.phase !== 'ended' && touch.phase !== 'cancelled' && refuses(touch));
    }
    /** UIControl's rule: a control may veto an overlapping ancestor recognizer. */ isVetoedByConsumer(recognizer) {
        for (const id of (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).seenTouchIds){
            const consumer = this.records.get(id)?.consumer;
            if (consumer?.allowsAncestorRecognizer?.(recognizer) === false) {
                return true;
            }
        }
        return false;
    }
    fail(recognizer) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTerminal"])(recognizer.state)) {
            return;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isActive"])(recognizer.state)) {
            this.apply(recognizer, 'cancelled');
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).pending = null;
        // apply() gives back any claim it held (releaseClaim), waiting or not.
        this.apply(recognizer, 'failed');
        this.reviewPending();
    }
    /**
   * A recognition that claimed its touches and then fails or is cancelled (a
   * waiting recognition that fails, a gesture a second finger or the app
   * cancels) gives them back to the browser unless another recognition owns
   * them, so a finger still resting there can pinch-zoom the page. A gesture
   * that cancels itself on a finger's move (a long press past its tolerance)
   * keeps that finger until it lifts: the drag goes on, and the page never
   * takes it over midway (`spec:AST-094` FR14), as UIKit's scroll view never
   * takes a touch another recognizer had.
   */ releaseClaim(recognizer, keep = new Set()) {
        const released = [];
        for (const touch of recognizer.trackedTouches){
            const record = this.records.get(touch.id);
            if (record == null || !record.isClaimed || keep.has(touch.id)) {
                continue;
            }
            // A recognized discrete gesture (`ended`, a swipe) still owns its
            // touches until they lift.
            const isOwned = this.active.some((other)=>other !== recognizer && other.claimsTouches && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isActive"])(other.state) || other.state === 'ended' || (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(other).pending != null) && other.trackedTouches.some((tracked)=>tracked.id === touch.id));
            if (!isOwned) {
                record.isClaimed = false;
                released.push(touch.id);
            }
        }
        if (released.length > 0) {
            this.options.onRelease?.(released);
        }
    }
    apply(recognizer, next) {
        const from = recognizer.state;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).applyState(next);
        if (recognizer.state === next && from !== next) {
            this.options.onTransition?.(recognizer, from, next);
        } else if (next === 'changed' && from === 'changed') {
            this.options.onTransition?.(recognizer, from, next);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTerminal"])(next)) {
            this.clearTimer(recognizer);
        }
        if (next === 'cancelled') {
            this.releaseClaim(recognizer, this.movingIds);
        } else if (next === 'failed') {
            this.releaseClaim(recognizer);
        }
    }
    /**
   * Re-run every waiting recognition whose requirements may have resolved.
   * Repeats until nothing changes, so chains (A waits on B waits on C)
   * settle in one pass.
   */ reviewPending() {
        if (this.deferDepth > 0) {
            this.owesResolution = true;
            return;
        }
        let changed = true;
        while(changed){
            changed = false;
            for (const recognizer of [
                ...this.active
            ]){
                const next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).pending;
                if (next == null || recognizer.state !== 'possible') {
                    continue;
                }
                const blocked = this.active.some((other)=>other !== recognizer && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).requiresFailureOf(other) && other.state === 'possible' && other.isInvolved());
                if (blocked) {
                    continue;
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).pending = null;
                this.attemptRecognition(recognizer, next);
                changed = true;
            }
        }
    }
    claim(recognizer) {
        if (!recognizer.claimsTouches) {
            return;
        }
        const claimed = [];
        for (const touch of recognizer.trackedTouches){
            const record = this.records.get(touch.id);
            if (record != null && !record.isLifted && !record.isClaimed && !record.touch.takenByBrowser) {
                // A touch the browser took stays the browser's (FR14).
                record.isClaimed = true;
                claimed.push(touch.id);
            }
        }
        if (claimed.length > 0) {
            this.options.onClaim?.(claimed, recognizer);
        }
    }
    // --- View delivery ---------------------------------------------------------
    deliverViewBegan(record) {
        if (record.consumer == null || record.view !== 'none') {
            return;
        }
        if (record.suppressClick) {
            record.view = 'done';
            return;
        }
        if (this.beginDelayers(record)) {
            record.view = 'held';
            return;
        }
        record.view = 'delivered';
        record.consumer.touchBegan(record.touch);
    }
    /** What a lifted touch's view and click get, decided at the lift. */ resolveEnd(record) {
        if (record.suppressClick) {
            return 'suppress';
        }
        const isHeld = this.endDelayers(record);
        switch(record.view){
            case 'delivered':
                if (isHeld) {
                    record.view = 'endHeld';
                    record.deferredClick = true;
                    return 'defer';
                }
                record.view = 'done';
                record.consumer?.touchEnded(record.touch);
                return 'allow';
            case 'held':
                if (!this.beginDelayers(record)) {
                    // The recognizer that held the view finished on this lift: the
                    // view gets the whole touch now and the click goes with it, not a
                    // `defer` for a click already released.
                    record.view = 'delivered';
                    record.consumer?.touchBegan(record.touch);
                    return this.resolveEnd(record);
                }
                record.deferredClick = true;
                return 'defer';
            case 'none':
            case 'endHeld':
            case 'done':
                if (isHeld) {
                    record.deferredClick = true;
                    return 'defer';
                }
                return 'allow';
        }
    }
    /** Release whatever no recognizer is holding any more. */ reviewHeld() {
        for (const record of this.records.values()){
            if (record.view === 'held' && !this.beginDelayers(record)) {
                if (record.suppressClick) {
                    record.view = 'done';
                } else {
                    record.view = 'delivered';
                    record.consumer?.touchBegan(record.touch);
                    if (record.isLifted && !this.endDelayers(record)) {
                        record.view = 'done';
                        record.consumer?.touchEnded(record.touch);
                    } else if (record.isLifted) {
                        record.view = 'endHeld';
                    }
                }
            }
            if (record.view === 'endHeld' && !this.endDelayers(record)) {
                record.view = 'done';
                if (record.suppressClick) {
                    record.consumer?.touchCancelled(record.touch);
                } else {
                    record.consumer?.touchEnded(record.touch);
                }
            }
            if (record.deferredClick && record.view !== 'held' && record.view !== 'endHeld' && !this.endDelayers(record)) {
                record.deferredClick = false;
                this.options.onDeferredClick?.(record.touch, !record.suppressClick);
            }
        }
    }
    beginDelayers(record) {
        return record.participants.some((recognizer)=>recognizer.delaysTouchesBegan && recognizer.state === 'possible' && recognizer.isInvolved() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).seenTouchIds.has(record.touch.id));
    }
    endDelayers(record) {
        return record.participants.some((recognizer)=>recognizer.delaysTouchesEnded && recognizer.state === 'possible' && recognizer.isInvolved() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).seenTouchIds.has(record.touch.id));
    }
    cancelViewTouchesOf(recognizer) {
        for (const id of (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).seenTouchIds){
            const record = this.records.get(id);
            if (record == null) {
                continue;
            }
            record.suppressClick = true;
            this.cancelView(record);
        }
    }
    cancelView(record) {
        if (record.view === 'delivered' || record.view === 'endHeld') {
            record.consumer?.touchCancelled(record.touch);
        }
        if (record.view !== 'none' || record.consumer != null) {
            record.view = 'done';
        }
    }
    // --- Plumbing --------------------------------------------------------------
    context() {
        return {
            time: this.now(),
            allTouches: [
                ...this.records.values()
            ].filter((record)=>!record.isLifted).map((record)=>record.touch)
        };
    }
    liveTouches(ids) {
        const touches = [];
        for (const id of ids){
            const record = this.records.get(id);
            if (record != null && !record.isLifted) {
                touches.push(record.touch);
            }
        }
        return touches;
    }
    update(inputs, phase) {
        const changed = [];
        for (const input of inputs){
            const record = this.records.get(input.id);
            if (record == null || record.isLifted) {
                continue;
            }
            const time = this.clampTime(input.time);
            const touch = record.touch;
            const history = (input.history ?? []).filter((sample)=>sample.time > touch.time && sample.time < time);
            touch.samples = [
                ...history,
                {
                    x: input.x,
                    y: input.y,
                    time
                }
            ];
            touch.x = input.x;
            touch.y = input.y;
            touch.time = time;
            touch.phase = phase;
            changed.push(touch);
        }
        return changed;
    }
    clampTime(time) {
        const clamped = Math.max(time, this.latestTime);
        this.latestTime = clamped;
        return clamped;
    }
    /**
   * One external entry: run the timers due by `time`, then `body`, then
   * settle (release held deliveries, reset finished recognizers, forget
   * finished touches). Re-entrant calls (a listener feeding input) run
   * inline and settle with the outermost one.
   */ run(time, body) {
        this.depth += 1;
        try {
            if (this.depth === 1 && this.deferDepth === 0 && this.owesResolution) {
                // A deferred stop resolves before anything newer: input that comes
                // ahead of its microtask (a nested dispatch) sees settled state.
                this.owesResolution = false;
                this.currentTime = this.clampTime(this.lastEventTime());
                this.settle();
            }
            this.flushTimers(time);
            this.currentTime = this.clampTime(time);
            body();
            // Re-entrant calls settle with the outermost one: settling mid-delivery
            // would reset recognizers that have not heard the event yet. Inside
            // `deferResolution`, the next pass settles.
            if (this.depth === 1) {
                if (this.deferDepth > 0) {
                    this.owesResolution = true;
                } else {
                    this.owesResolution = false;
                    this.settle();
                }
            }
        } finally{
            this.depth -= 1;
            if (this.depth === 0) {
                this.currentTime = null;
            }
        }
    }
    flushTimers(upTo) {
        for(;;){
            let due = null;
            for (const entry of this.timers){
                if (entry[1].deadline <= upTo && (due == null || entry[1].deadline < due[1].deadline || // Same instant: the innermost (earlier in `active`) goes first,
                // as FR15's innermost rule decides a tie on one event.
                entry[1].deadline === due[1].deadline && this.rank(entry[0]) < this.rank(due[0]))) {
                    due = entry;
                }
            }
            if (due == null) {
                break;
            }
            const [recognizer, timer] = due;
            this.timers.delete(recognizer);
            this.currentTime = this.clampTime(timer.deadline);
            timer.callback();
            // Inside a re-entrant entry the outermost call settles (see run()).
            if (this.depth <= 1) {
                this.settle();
            }
        }
        this.scheduleRealTimer();
    }
    /** A recognizer's place in resolution order: innermost first, idle last. */ rank(recognizer) {
        const index = this.active.indexOf(recognizer);
        return index === -1 ? Number.POSITIVE_INFINITY : index;
    }
    settle() {
        this.reviewPending();
        this.reviewHeld();
        let didReset = false;
        for (const recognizer of [
            ...this.active
        ]){
            const isFinished = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTerminal"])(recognizer.state) && recognizer.numberOfTouches === 0 || recognizer.state === 'possible' && !recognizer.isInvolved();
            if (!isFinished) {
                continue;
            }
            this.active = this.active.filter((other)=>other !== recognizer);
            const from = recognizer.state;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).resetToPossible();
            didReset = true;
            if (from !== 'possible') {
                this.options.onTransition?.(recognizer, from, 'possible');
            }
        }
        if (didReset) {
            // A recognizer that finished above may have been the one holding a
            // touch from its view; release it now, not at the next input.
            this.reviewHeld();
        }
        let dropped = false;
        for (const [id, record] of this.records){
            if (record.isLifted && record.view !== 'held' && record.view !== 'endHeld' && !record.deferredClick) {
                this.records.delete(id);
                dropped = true;
            }
        }
        if (dropped && this.records.size === 0) {
            this.options.onIdle?.();
        }
    }
    scheduleRealTimer() {
        let earliest = Number.POSITIVE_INFINITY;
        for (const timer of this.timers.values()){
            earliest = Math.min(earliest, timer.deadline);
        }
        if (earliest === this.realTimerDeadline) {
            return;
        }
        if (this.realTimer != null) {
            this.clock.clearTimeout(this.realTimer);
            this.realTimer = null;
        }
        this.realTimerDeadline = earliest;
        if (earliest === Number.POSITIVE_INFINITY) {
            return;
        }
        const delay = Math.max(0, earliest - this.clock.now());
        const fire = (mayYield)=>{
            this.realTimer = null;
            this.realTimerDeadline = Number.POSITIVE_INFINITY;
            if (mayYield && this.clock.now() > earliest) {
                // Late: a long task held the main thread past the deadline, and
                // input queued behind it may come before the deadline (a lift that
                // fails a long press). Let that input dispatch first, once.
                this.realTimerDeadline = earliest;
                this.realTimer = this.clock.setTimeout(()=>fire(false), 0);
                return;
            }
            // The event clock moves to the deadline only, so input still queued
            // keeps its own timestamps.
            this.advanceTime(earliest);
        };
        this.realTimer = this.clock.setTimeout(()=>fire(true), delay);
    }
}
function sharesTouches(a, b) {
    for (const id of (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(a).seenTouchIds){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(b).seenTouchIds.has(id)) {
            return true;
        }
    }
    return false;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/GestureHost.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GestureHost",
    ()=>GestureHost,
    "getGestureHost",
    ()=>getGestureHost,
    "scrollTypeOf",
    ()=>scrollTypeOf
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file GestureHost.ts
 * @input DOM touch, pointer, click, contextmenu, scroll and focus events of
 *   one document; elements with recognizers and consumers attached; the
 *   input hold's held layers (Layer/inputHold `holdsTouch`)
 * @output Exports GestureHost (the DOM side of the gesture system) and
 *   getGestureHost (one host per document)
 * @position Browser adapter of packages/core/src/gestures: turns real events
 *   into GestureArena input, and carries out what the arena decides
 *
 * FOR EVERY POINTER
 *
 * - Recognizers and press consumers attach for a mouse, a pen and a finger
 *   alike (`spec:AST-094` FR43, FR19). Where the primary pointer is coarse
 *   the host listens while something enabled could take a touch. Where it
 *   is fine, each element with an enabled recognizer or consumer keeps one
 *   passive `pointerdown` listener and the page has none; a press on it (a
 *   mouse's primary button, a pen, or a finger, whose `pointerdown` comes
 *   before its `touchstart`) installs the host's page listeners, which go
 *   once that press's contacts end and the arena has decided them, a tap
 *   that waits on a double tap included (FR24). After the last detach the
 *   host holds nothing: no listener, note, frame or timer (releaseWhenIdle).
 *   Under every pointer, an element whose recognizer claims a moving finger
 *   also keeps its blocking `touchmove`, a listener FR24 counts apart from
 *   the press's one.
 * - A press consumer takes a mouse press as a press (DEC-21): PressTracker's
 *   fine-pointer profile paints at once and brakes no scroll (FR11).
 * - The host follows the query (a tablet docking or undocking a mouse):
 *   turning fine cancels every touch in flight.
 * - `perEventPointer` (AttachOptions), from before FR43, changes nothing.
 *
 * INPUT CHANNELS
 *
 * - Fingers begin and end with Touch Events: they are the only cancelable
 *   channel (a pointer event's preventDefault cannot stop a scroll or a
 *   click), they keep arriving after the browser takes a pan (which a
 *   watcher following the scroll to the lift needs, `spec:AST-094` FR20,
 *   DEC-7), and every event lists all the fingers at once. A
 *   finger's movement is sampled from ONE channel: its `pointermove`s, once
 *   its pointerdown has paired with its touchstart (by target and
 *   position), since Chromium sends no `touchmove` until a finger has
 *   travelled about 16 px while a tap fails and a pan begins at 10; touch
 *   events sample only a finger no pointer event reported. The other
 *   channel keeps its control duties but feeds no sample.
 * - A finger's events go to the element it landed on even after that
 *   element leaves the document, and then never reach the document. Each
 *   tracked finger's target therefore gets its own listeners, and a finger
 *   the events say is no longer down is cancelled, so a re-rendered or
 *   removed target never strands a gesture.
 * - Mice and pens come from Pointer Events, with coalesced samples for
 *   velocity. A pen on an iPad also produces `stylus` touches; those are left
 *   to the pointer path, except that a claimed pen's stylus moves are
 *   cancelled as a finger's.
 * - `pointercancel` on a finger is the browser saying it took that finger
 *   for its own pan or zoom; so is a `touchmove` that can no longer be
 *   cancelled where `touch-action` let the browser pan, and a scroll above
 *   the touch.
 *
 * FINGERS
 *
 * - The host keeps one record of where each finger on the screen landed
 *   (`fingersDown()`). Finger scrolls (fingerScroll.ts) read it, and a
 *   scroll lock's page hold (pageHold.ts) asks which touches a recognizer
 *   owns; both live in their own modules, so a page that needs neither
 *   never ships them.
 *
 * TOUCHES ON MOVING ELEMENTS
 *
 * - iOS WebKit hit-tests an element a compositor animation moves where the
 *   animation started. There, at touch-down, the host resolves the moving
 *   elements (motion/presentation.ts: one style write each) and asks the
 *   engine again, so a contact goes to what is drawn under it; press
 *   trackers read `presentedRect`, and a retargeted tap clicks what it
 *   touched once, with the engine's own click cancelled or swallowed.
 *
 * WHAT THE BROWSER IS TOLD
 *
 * - Each element gets the `touch-action` its recognizers leave the browser
 *   (touchAction.ts), never wider than the element's own value (a caller's
 *   explicit `touch-action` stays in force), set inline when they attach and
 *   restored when they detach.
 * - While a finger or a pen is down, text selection and the touch callout
 *   are off only where the hold does something (`spec:AST-094` FR41): on the
 *   elements of recognizers that bring a `selectionLock`, and on a non-text
 *   input under the finger inside them (WebKit's own style makes every
 *   input selectable); restored when the contact ends. A finger or a pen
 *   takes it under any primary pointer; a mouse never does (`spec:AST-017`
 *   FR59).
 * - Each element with a recognizer that can claim a touch while it moves (a
 *   pan, a swipe, a long press that then drags, a pinch) gets a
 *   NON-passive `touchmove` listener that cancels the event only while a
 *   recognizer owns one of its touches (a pan claims when it begins, at
 *   UIKit's 10 pt, `spec:AST-094` FR17). Nothing else is ever cancelled, so a
 *   touch nobody claims scrolls exactly as it would without the system. The
 *   known cost: a scroll that BEGINS on such an element waits for a busy main
 *   thread (measured in iOS Safari; a passive listener would hand every
 *   diagonal to the scroll instead). Elements whose recognizers only claim
 *   at the lift (taps), recognizers that never claim (`claimsTouches` false)
 *   and press consumers get no blocking listener, and the listener a
 *   finger's target gets at touch-down is passive for them too, so a scroll
 *   starting on them never waits.
 * - The browser took a finger on `pointercancel`, on its first uncancelable
 *   `touchmove` where it could pan, or on a scroll above it once the finger
 *   has travelled the slop; a scroll under a finger that has not moved is
 *   the page's own and leaves the touch alone.
 * - A lift whose click must not happen cancels its `touchend` (no click, no
 *   compatibility mouse events) and arms the shared click guard
 *   (utils/clickGuard.ts, the menu press model's too) for the browser's next
 *   click; a click held for a recognizer that may still recognize is
 *   replayed if they all fail. Keyboard and assistive-technology clicks
 *   (`detail === 0`) always pass.
 * - A `contextmenu` while a recognizer owns a touch, or while a press
 *   consumer holds the menu closed (`holdsContextMenu`), is cancelled. So a
 *   long press never also opens the browser's menu.
 * - When the app loses focus (a window blur, a hidden page), every touch in
 *   flight is cancelled, as in UIKit; a finger the browser keeps alive lifts
 *   on nothing: its `touchend` is cancelled (`spec:AST-094` FR28).
 *
 * SSR-safe: nothing touches `window` or `document` until something attaches.
 *
 * SYNC: When modified, update GestureHost.test.ts and README.md.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$isRtlElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/isRtlElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$presentation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/presentation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/gestures.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureArena$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/GestureArena.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$nativeScroll$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/nativeScroll.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/flatTree.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/scrollView.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchQueries$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/touchQueries.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$wheelSegmenter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/wheelSegmenter.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$inputHold$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/inputHold.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$touchAction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/touchAction.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$touchActionRule$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/touchActionRule.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/recognizerInternals.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/clickGuard.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputAge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputAge.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputStream.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$primaryClick$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/primaryClick.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$selectionLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/selectionLock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$coarsePointer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/coarsePointer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$hostRegistry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/hostRegistry.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/nodeType.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const STYLE_PROPERTIES = {
    touchAction: 'touch-action',
    WebkitTouchCallout: '-webkit-touch-callout',
    WebkitUserSelect: '-webkit-user-select',
    userSelect: 'user-select'
};
/**
 * A CSS-wide keyword, which names no touch-action of its own: the value in
 * force resolves it (`initial` and `unset` to `auto`, `inherit` to the
 * parent's).
 */ function isCssWideKeyword(value) {
    return CSS_WIDE_KEYWORDS.has(value.trim().toLowerCase());
}
const CSS_WIDE_KEYWORDS = new Set([
    'initial',
    'inherit',
    'unset',
    'revert',
    'revert-layer'
]);
/**
 * Run `task` in the next frame, before it paints: a read there styles what
 * the frame must style anyway, and its writes are what the frame shows.
 */ function inNextFrame(view, task) {
    if (view != null && typeof view.requestAnimationFrame === 'function') {
        const frame = view.requestAnimationFrame(task);
        return ()=>view.cancelAnimationFrame(frame);
    }
    const timeout = setTimeout(task, 0);
    return ()=>clearTimeout(timeout);
}
/** An armed press tracker's own element listeners: they never cancel. */ const PASSIVE_CAPTURE = {
    capture: true,
    passive: true
};
/**
 * Whether a recognizer can take a touch while it moves, and so needs the
 * blocking `touchmove` listener that stops the browser's pan. A tap claims
 * only at the lift (it fails once the finger travels), so it needs none.
 */ function claimsWhileMoving(recognizer) {
    return recognizer.claimsTouches && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).acceptsTouchInput && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).family !== 'tap';
}
/**
 * Whether a recognizer takes a contact that comes with Touch Events and a
 * long press's contextmenu: a finger's or a pen's. A scroll-only recognizer
 * (`allowedPointerTypes: []`) and a mouse-only one take neither.
 */ function takesTouchContacts(recognizer) {
    const types = recognizer.allowedPointerTypes;
    return types == null || types.has('touch') || types.has('pen');
}
/**
 * A pan (or a pan subclass), told apart by its family rather than its class,
 * so a page that constructs no pan never ships PanGestureRecognizer.
 */ function isPanRecognizer(recognizer) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).family === 'pan';
}
/**
 * A screen-edge pan, told apart by its kind (architecture:react-component-runtime
 * INV13), so the host can report its layout changes without importing it.
 */ function asScreenEdgePan(recognizer) {
    return recognizer.kind === 'screenEdgePan' ? recognizer : null;
}
function hasStylusTouch(event) {
    return touchesOf(event.changedTouches).some((touch)=>touch.touchType === 'stylus');
}
/**
 * How long a claimed finger's lift waits for its `touchend`, ms. The touchend
 * follows its pointerup in the same frame; a browser that sends pointer events
 * alone for a finger never sends it, and the record goes.
 */ const CLAIMED_LIFT_MS = 500;
/** At most this many claimed lifts wait for their `touchend` at once (FR24). */ const CLAIMED_LIFT_LIMIT = 8;
/** A touchstart and a pointerdown describe one finger: same target, same spot. */ function isSamePlace(a, b) {
    return a.target === b.target && Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1;
}
function isPointerKind(type) {
    return type === 'touch' || type === 'mouse' || type === 'pen';
}
/**
 * What an event, or one of its touches, landed on. Inside an open shadow root
 * the document's listeners see the shadow host, in `event.target` and in a
 * touch's `target` alike, while the composed path starts at the element
 * itself. A touch whose target is not the event's (another finger) keeps its
 * own.
 */ function landedOn(event, retargeted = event.target) {
    if (retargeted !== event.target) {
        return retargeted;
    }
    return event.composedPath()[0] ?? retargeted;
}
/**
 * How long after its last event a pinch or a mouse wheel's notches end, ms.
 * The web reports no wheel phases, so a quiet wheel is a lifted one.
 */ const WHEEL_END_MS = 100;
/**
 * How long after its last event a vertical trackpad scroll ends, ms (a
 * sheet's pull), whoever keeps it. A slow drag's stream pauses longer than
 * WHEEL_END_MS between events.
 */ const WHEEL_FOLLOW_END_V_MS = 180;
/**
 * The same horizontally, ms (a pager's or a row's swipe), whose slow
 * swipes pause longer still.
 */ const WHEEL_FOLLOW_END_MS = 220;
/** A line-mode wheel's line, px, as the platforms scroll it. */ const WHEEL_LINE_PX = 40;
/** The span a ctrl-wheel pinch's two contacts start at, px. */ const WHEEL_PINCH_SPAN = 100;
/** A wheel gesture: the contacts it drives in the arena, or none where the page keeps it. */ /** A trackpad scroll a pan follows: where its fingers lift, and what waits until then. */ /**
 * How long after its last wheel a wheel gesture ends, ms. A trackpad's
 * two-finger scroll waits out a slow drag's pauses for its axis, whoever
 * keeps the stream. A pinch and a mouse wheel's notches end 100 ms after
 * their last wheel.
 */ function wheelEndMs(kind, scrollType, isHorizontal) {
    if (kind === 'pinch' || scrollType !== 'continuous') {
        return WHEEL_END_MS;
    }
    return isHorizontal ? WHEEL_FOLLOW_END_MS : WHEEL_FOLLOW_END_V_MS;
}
/**
 * A provisional lead `debt` after a move of `moved`. The debt is what a
 * followed pan shows past the fingers' travel, or short of it. Half the move
 * is absorbed, so the pan keeps moving the way the fingers do.
 */ function absorbedDebt(debt, moved) {
    return Math.sign(debt) * Math.max(0, Math.abs(debt) - Math.abs(moved) / 2);
}
/**
 * A stall held a bunched wheel's frames back, and the move just before it took
 * their time. So the wheel joins that move's reading. It can restore what the
 * late move lowered, but never passes the speed before it.
 */ function joinReading(f, trueX, trueY) {
    if (f.readSpan <= 0) {
        return;
    }
    f.speedX = joinedSpeed(f.speedX, (trueX - f.readFromX) / f.readSpan, f.priorSpeedX);
    f.speedY = joinedSpeed(f.speedY, (trueY - f.readFromY) / f.readSpan, f.priorSpeedY);
}
/**
 * A joined reading, held to the speed before the late move. It only ever
 * raises the current speed, in the current direction.
 */ function joinedSpeed(current, reading, prior) {
    const held = Math.sign(reading) * Math.min(Math.abs(reading), Math.abs(prior));
    return held * current >= 0 && Math.abs(held) > Math.abs(current) ? held : current;
}
/**
 * `target` where it is ahead of `shown` in the direction of `speed`, else
 * `shown`: a reconcile that never steps back.
 */ function ahead(shown, target, speed) {
    return speed === 0 || (target - shown) * Math.sign(speed) > 0 ? target : shown;
}
/**
 * A wheel's deltas in CSS px: a line is `WHEEL_LINE_PX`, a page the
 * viewport.
 */ function wheelPixels(wheel, view) {
    if (wheel.deltaMode === 1) {
        return {
            dx: wheel.deltaX * WHEEL_LINE_PX,
            dy: wheel.deltaY * WHEEL_LINE_PX
        };
    }
    if (wheel.deltaMode === 2) {
        return {
            dx: wheel.deltaX * (view?.innerWidth ?? 0),
            dy: wheel.deltaY * (view?.innerHeight ?? 0)
        };
    }
    return {
        dx: wheel.deltaX,
        dy: wheel.deltaY
    };
}
function scrollTypeOf(wheel) {
    if (wheel.deltaMode !== 0 || wheel.shiftKey) {
        return 'discrete';
    }
    const remainder = (value)=>{
        const fraction = Math.abs(value - Math.round(value));
        return fraction > 0 && fraction < 0.01;
    };
    if (remainder(wheel.deltaX) || remainder(wheel.deltaY)) {
        return 'discrete';
    }
    const legacy = wheel;
    if (typeof legacy.wheelDeltaY !== 'number' || typeof legacy.wheelDeltaX !== 'number') {
        return 'discrete';
    }
    const precise = (delta, legacyDelta)=>delta === 0 ? legacyDelta === 0 : Math.abs(Math.abs(legacyDelta) - 3 * Math.abs(delta)) <= Math.max(1.5, 0.05 * Math.abs(delta) * 3);
    if (!precise(wheel.deltaY, legacy.wheelDeltaY) || !precise(wheel.deltaX, legacy.wheelDeltaX)) {
        return 'discrete';
    }
    const tick = (delta, legacyDelta)=>legacyDelta !== 0 && legacyDelta % 120 === 0 && delta % 40 === 0;
    return tick(wheel.deltaY, legacy.wheelDeltaY) || tick(wheel.deltaX, legacy.wheelDeltaX) ? 'discrete' : 'continuous';
}
/** Read without the pan class, which a page with no pan never ships. */ function isScrollEdgePan(recognizer) {
    return recognizer.scrollEdge === true;
}
/**
 * Whether a pan takes a contact moving by (cx, cy), by its own direction
 * rule, `axisRatio` included. A move its rule leaves undecided stays the
 * page's.
 */ function panTakesMove(recognizer, cx, cy) {
    return ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).classify?.({
        x: cx,
        y: cy
    }) ?? 'begin') === 'begin';
}
/**
 * An event's time on the arena's clock: `timing.now()`, with `timing` the
 * clock of the event's own window. Some engines and DOM emulators stamp
 * events in epoch milliseconds instead.
 */ function eventTime(event, timing) {
    const time = event.timeStamp;
    if (time > 1e12 && timing != null && timing.timeOrigin > 0) {
        return time - timing.timeOrigin;
    }
    return time;
}
/**
 * The arena clock for `doc`. The page's own document keeps the page's clock.
 * A same-origin iframe or a Picture-in-Picture window stamps its events from
 * its own start, so its clock reads that window's `performance`. A page can
 * replace that object after the host exists, so each reading looks it up.
 */ function documentClock(doc) {
    const view = doc.defaultView;
    if (view == null || view === globalThis) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureArena$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["browserClock"];
    }
    return {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureArena$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["browserClock"],
        now: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputAge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clockOf"])(doc)?.now() ?? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureArena$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["browserClock"].now()
    };
}
/** A touch list as an array; a synthetic event may carry none. */ function touchesOf(list) {
    return list == null ? [] : Array.from(list);
}
class GestureHost {
    registry = new Map();
    /** Stops following the animator's moving elements (iOS WebKit only). */ stopWatchingMovers = null;
    /** Whether the document carries the blocking touchmove for a mover. */ stopBlockingForMovers = null;
    /** Elements whose caller touch-action waits for a read after paint. */ pendingCallerReads = new Set();
    isCallerReadScheduled = false;
    /** Cancels the scheduled next-frame read (readCallerTouchActionInNextFrame). */ cancelCallerRead = null;
    /** The selection lock each contact holds, by host contact id. */ lockedBy = new Map();
    /**
   * The page's selection when each mouse or pen press began: a drag a
   * recognizer claims keeps it.
   */ pressSelections = new Map();
    /**
   * Mouse and pen contacts that began on selectable text. Once one moves, the
   * browser keeps the drag for a selection, and no recognizer claims it.
   */ selectingContacts = new Set();
    /**
   * Drag selection holds until their last task ends, a task after their lift
   * (lockDragSelection); the last detach ends them at once.
   */ dragHolds = new Set();
    /** Each claimed contact's drag hold, until its lift or a give-back. */ claimHolds = new Map();
    /**
   * Contacts sent to what is drawn instead of what the engine hit, by host
   * contact id, with where they landed (for their click).
   */ retargeted = new Map();
    /** Touch.identifier → arena id, for live fingers. */ touchIds = new Map();
    /**
   * Fingers cancelled because the app lost focus, kept until the browser
   * ends them: a browser that keeps such a touch alive must not let its
   * lift click (`spec:AST-094` FR28: nothing acts).
   */ cancelledFingers = new Set();
    /**
   * The pens and pointer-read fingers that the app's lost focus cancelled,
   * by pointer id. Each is kept until its lift, which must not click either,
   * or until a new press.
   */ cancelledPointers = new Map();
    /** Touch.identifier → the element the finger landed on. */ touchTargets = new Map();
    /**
   * Finger targets with listeners of their own: how many fingers each, and
   * how many of those a recognizer could claim while they move (only those
   * need the blocking `touchmove` listener).
   */ watched = new Map();
    /** Fingers whose target listener is the blocking one. */ blockingFingers = new Set();
    /**
   * Fingers a participant could claim (a recognizer that claims touches, or
   * a press consumer): only their target's `touchend` may need cancelling,
   * so a touch only watchers follow gets a passive one (`spec:AST-094`
   * FR20).
   */ claimingFingers = new Set();
    /** Touch events already handled (the document's and the target's listeners both see one). */ processed = new WeakSet();
    /** pointerId → arena id, for live mouse and pen contacts. */ pointerIds = new Map();
    /** Each contact's kind: a blur refuses a pen's or a pointer-read finger's lift, never a mouse's. */ pointerKinds = new Map();
    /**
   * The boxes the host watches for screen-edge pans (syncLayoutWatch): each
   * element with an enabled one, and the root for one whose band moves with
   * the viewport (spec:AST-094 FR18, FR19, DEC-22), and the one observer
   * that watches them.
   */ layoutWatched = new Set();
    layoutObserver = null;
    /** Where and when the last pen hold the host tracked ended. */ lastPenLift = null;
    /**
   * Arena ids of the pen contacts that left the long press's tolerance
   * before its duration. No such contact is a hold.
   */ driftedPens = new Set();
    /** Fingers whose first uncancelable `touchmove` was already judged. */ judgedUncancelable = new Set();
    /**
   * A finger's pointerId → its arena id, once its pointerdown and its
   * touchstart are paired. Chromium sends no `touchmove` until a finger has
   * travelled its slop (about 16 px), but sends every `pointermove`, so a
   * paired finger is sampled from its pointer events (`pointerFed`); and its
   * `pointercancel` is the browser's claim of exactly that finger.
   */ fingerPointers = new Map();
    /** Finger pointerdowns still waiting for their touchstart. */ pendingPointers = new Map();
    /**
   * A paired finger's lift, at its `pointerup`: the place and clock its moves
   * came on. Linux WebKit stamps the `touchend` that follows only after the
   * page's pointerup listeners finish. A busy listener would then make a flick
   * read as a resting finger. Read at the touchend, dropped with the finger.
   */ liftStamps = new Map();
    /**
   * Where fingers come from their pointer events, where claimed fingers
   * lifted and when: the `touchend` that follows each `pointerup` is
   * cancelled (FR21). A record no `touchend` consumed expires
   * (CLAIMED_LIFT_MS).
   */ claimedLifts = [];
    /** The one timer that drops claimed lifts whose `touchend` never came. */ claimedLiftTimer = null;
    /** The arena's clock, which the claimed lifts' timer runs on too. */ /**
   * The clock of the document's own window, which stamps its events. A page
   * can replace it after the host exists, so each read looks it up.
   */ get timing() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputAge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clockOf"])(this.doc);
    }
    /** Fingers still waiting for their pointerdown, by arena id. */ unpairedTouches = new Map();
    /** Whether the host follows `(pointer: coarse)` (no read was passed). */ /** The last sample fed per contact: a contact's time never runs back. */ lastFed = new Map();
    /**
   * Fingers whose samples come from their pointer events. A finger the
   * browser reports on both channels is sampled from ONE: the pointer
   * channel, where its pointerdown paired with its touchstart; touch events
   * sample only a finger no pointer event reported (no Pointer Events). The
   * other channel keeps its control duties (cancelling, claiming, the
   * browser's takeover) but never feeds a sample, so the two copies of one
   * move cannot both reach a velocity, however far apart they arrive.
   */ pointerFed = new Set();
    /** When a finger was last down or lifted, and where it landed. */ lastTouch = null;
    /** Scrollers a recognizer is scrolling itself this frame (ownScroll). */ ownedScrolls = new Map();
    /** Numbers each ownScroll call: only the newest one's timer clears it. */ ownScrollCalls = 0;
    /** Cancels each scroller's pending ownScroll frames. */ ownScrollFrames = new Map();
    /** The last scroll a finger drove, and when. */ lastScroll = null;
    /** Predicates that hold a touch's target away from every participant. */ touchGates = new Set();
    /** Who keeps the listeners installed without a registration (retain). */ retainers = 0;
    /** Told after every touch event that changed the fingers on the screen. */ fingerListeners = new Set();
    /**
   * Where each finger now on the screen landed, from the last touch event's
   * `touches` (every finger, whether or not a recognizer tracks it).
   */ fingerTargets = [];
    nextId = 1;
    /** The wheel gesture in progress. */ wheel = null;
    /** The wheel latch's input-stream subscription, while a gesture is latched. */ stopWheelLatch = null;
    /** Splits the wheel stream into gestures and reads a trackpad's lift. */ segmenter = new __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$wheelSegmenter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WheelSegmenter"]();
    /** The latest wheel's segment. */ wheelSegment = null;
    /** Wheels already taken: each element on the path with a listener hears one. */ wheelsSeen = new WeakSet();
    isInstalled = false;
    /**
   * Whether the primary pointer is coarse (`spec:AST-094` FR19), read when
   * something first attaches and kept current while anything is attached.
   */ isCoarse = false;
    stopWatchingPointer = null;
    /** The input stream subscriptions while installed. */ unsubscribers = [];
    /**
   * Where the primary pointer is fine, each element that uses a gesture
   * listens for a press itself; the page's listeners last that press (FR24).
   */ armedElements = new Map();
    isArmedPress = false;
    /**
   * Whether the installed listeners include the cancelable ones (the
   * document's touchend, contextmenu and the window's click): only while a
   * participant that can claim is attached (`spec:AST-094` FR20).
   */ isClaimingInstalled = false;
    /** The input stream subscriptions syncClaimingListeners keeps. */ claimingUnsubscribers = [];
    usesTouchEvents = true;
    constructor(doc, options = {}){
        this.doc = doc;
        this.inputMode = options.inputMode ?? 'auto';
        this.presentedHitTesting = options.presentedHitTesting ?? 'auto';
        const environment = {
            viewportSize: ()=>({
                    width: doc.defaultView?.innerWidth ?? 0,
                    height: doc.defaultView?.innerHeight ?? 0
                }),
            // The writing direction through core's one helper.
            isRtl: (view)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(view) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$isRtlElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRtlElement"])(view),
            // A screen-edge pan tells a view within its edge band from any other
            // by its box (spec:AST-094 FR18).
            viewRect: (view)=>{
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(view)) {
                    return null;
                }
                const { left, top, width, height } = view.getBoundingClientRect();
                return {
                    left,
                    top,
                    width,
                    height
                };
            }
        };
        this.clock = options.clock ?? documentClock(doc);
        this.arena = new __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureArena$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GestureArena"]({
            clock: this.clock,
            environment,
            onDeferredClick: (touch, allowed)=>this.replayClick(touch, allowed),
            // A press whose decision waited on a timer (a tap waiting on a double
            // tap) ends here: an armed press stops listening (FR24).
            onIdle: ()=>this.releaseArmedPress(),
            onTransition: options.onTransition,
            onClaim: (ids, claimer)=>this.lockClaimedDrags(ids, claimer),
            onRelease: (ids)=>this.releaseClaimedDrags(ids),
            refusesClaim: (touch)=>this.selectingContacts.has(touch.id) && (touch.x !== touch.startX || touch.y !== touch.startY)
        });
        const view = doc.defaultView;
        // A test may pass its own read; otherwise the one coarse-pointer gate,
        // followed as it changes.
        this.followsPointer = options.isPrimaryPointerCoarse == null;
        this.isPrimaryPointerCoarse = options.isPrimaryPointerCoarse ?? (()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$coarsePointer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCoarsePointer"])(view));
    }
    // --- Attachment ------------------------------------------------------------
    /** Attach a recognizer to an element. Returns the detach function. */ attach(element, recognizer, options = {}) {
        const registration = this.registrationFor(element);
        // Each attachment says whether the host styles the element for its
        // recognizer. The element is styled while an attached recognizer asks.
        if (options.manageStyle === false) {
            registration.unstyled.add(recognizer);
            if (registration.recognizers.length === 0) {
                registration.manageStyle = false;
            }
        } else {
            registration.manageStyle = true;
        }
        // An action group while any attachment asks, whatever their order.
        const asksForGroup = options.actionGroup === true;
        if (asksForGroup) {
            registration.actionGroupAsks += 1;
            registration.actionGroup = true;
        }
        recognizer.view = element;
        registration.recognizers.push(recognizer);
        recognizer.onEnabledChange = ()=>{
            this.refresh(element, registration);
            this.syncListeners();
        };
        const edgePan = asScreenEdgePan(recognizer);
        if (edgePan != null) {
            // A new answer may also move the band the pan watches onto or off the
            // right side, whose band moves with the viewport (an in-place switch
            // of direction): the layout watch follows (FR18, FR24, DEC-22).
            edgePan.onTouchBehaviorChange = ()=>{
                this.refresh(element, registration);
                this.syncLayoutWatch();
            };
        }
        this.refresh(element, registration);
        this.syncListeners();
        return ()=>{
            recognizer.onEnabledChange = null;
            if (asksForGroup) {
                registration.actionGroupAsks -= 1;
                registration.actionGroup = registration.actionGroupAsks > 0;
            }
            if (edgePan != null) {
                edgePan.onTouchBehaviorChange = null;
            }
            const index = registration.recognizers.indexOf(recognizer);
            if (index >= 0) {
                registration.recognizers.splice(index, 1);
            }
            registration.unstyled.delete(recognizer);
            // A recognizer whose view goes away mid-gesture is cancelled, as in
            // UIKit when a view leaves the window.
            if (recognizer.state !== 'possible' || recognizer.isInvolved()) {
                recognizer.cancel();
            }
            const wheel = this.wheel;
            if (wheel != null && wheel.takers.includes(recognizer) && !this.wheelHasTaker(wheel)) {
                // At its last wheel: a later stamp would move the arena's clock past
                // the next input's own time.
                this.endWheel(wheel.last);
            }
            this.refresh(element, registration);
            // Even when the element keeps other attachments: one left disabled
            // keeps no listener or observer (FR24).
            this.syncListeners();
            this.cleanup(element, registration);
        };
    }
    /**
   * Watch the box of each element with an enabled screen-edge pan, and the
   * root's for a pan that watches the right side, whose band moves with the
   * viewport: a resize may move an element into or out of its edge band, and
   * the pan then measures again and re-derives the element's touch-action
   * (FR19). The host sets touch-action for every pointer (FR43), so it
   * watches under any primary pointer. One ResizeObserver serves every
   * element and goes with the last one, and no listener is added (FR24); an
   * engine without ResizeObserver keeps each pan's first measurement.
   */ syncLayoutWatch() {
        const wanted = new Set();
        let watchesViewport = false;
        for (const [element, registration] of this.registry){
            for (const recognizer of registration.recognizers){
                const edgePan = asScreenEdgePan(recognizer);
                if (edgePan != null && edgePan.isEnabled) {
                    wanted.add(element);
                    watchesViewport ||= edgePan.watchesViewport;
                }
            }
        }
        if (watchesViewport) {
            wanted.add(this.doc.documentElement);
        }
        for (const element of [
            ...this.layoutWatched
        ]){
            if (!wanted.has(element)) {
                this.layoutObserver?.unobserve(element);
                this.layoutWatched.delete(element);
            }
        }
        if (wanted.size === 0) {
            this.layoutObserver?.disconnect();
            this.layoutObserver = null;
            return;
        }
        const view = this.doc.defaultView;
        if (this.layoutObserver == null && view != null && typeof view.ResizeObserver === 'function') {
            this.layoutObserver = new view.ResizeObserver(this.onLayoutChange);
            for (const element of this.layoutWatched){
                this.layoutObserver.observe(element);
            }
        }
        for (const element of wanted){
            if (!this.layoutWatched.has(element)) {
                this.layoutObserver?.observe(element);
                this.layoutWatched.add(element);
            }
        }
    }
    /** A watched box or the root resized: each enabled edge pan measures again. */ onLayoutChange = ()=>{
        for (const registration of this.registry.values()){
            for (const recognizer of registration.recognizers){
                const edgePan = asScreenEdgePan(recognizer);
                if (edgePan != null && edgePan.isEnabled) {
                    edgePan.layoutChanged();
                }
            }
        }
    };
    /** Attach the view-level touch consumer of an element (a pressable control). */ attachConsumer(element, consumer, _options = {}) {
        const registration = this.registrationFor(element);
        registration.consumer = consumer;
        this.refresh(element, registration);
        this.syncListeners();
        return ()=>{
            if (registration.consumer === consumer) {
                registration.consumer = null;
            }
            // A keepsTouch consumer's blocking touchmove goes with it, even while
            // the element keeps its recognizers.
            this.refresh(element, registration);
            // Even when the element keeps a recognizer: one left disabled keeps
            // no listener or observer (FR24).
            this.syncListeners();
            this.cleanup(element, registration);
        };
    }
    /**
   * @internal The document this host serves.
   */ get document() {
        return this.doc;
    }
    /**
   * @internal Whether a recognizer owns the touch with this Touch Events
   * `identifier`, so the browser must not pan it (pageHold.ts asks).
   */ isTouchClaimed(identifier) {
        const id = this.touchIds.get(identifier);
        return id != null && this.arena.isClaimed(id);
    }
    /**
   * An element's box where it is drawn: the box the engine reports, moved
   * by the compositor animations of it and its ancestors on engines that
   * report and hit-test those where they started (iOS WebKit). Elsewhere
   * `getBoundingClientRect` already reports the drawn box. Press trackers
   * read their bounds through it.
   */ presentedRect(element) {
        const box = element.getBoundingClientRect();
        if (!this.hitTestsLayout()) {
            return box;
        }
        const { x, y } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$presentation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["presentedOffsetOf"])(element);
        if (x === 0 && y === 0) {
            return box;
        }
        return {
            left: box.left + x,
            top: box.top + y,
            right: box.right + x,
            bottom: box.bottom + y
        };
    }
    /** Whether this engine hit-tests a compositor-moved element at layout. */ hitTestsLayout() {
        return this.presentedHitTesting === 'always' || this.presentedHitTesting === 'auto' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchQueries$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isIosWebKit"])(this.doc.defaultView);
    }
    /**
   * Where a contact lands among what is drawn. iOS WebKit hit-tests an
   * element that a compositor animation moves where the animation started:
   * a finger on a settling sheet lands on whatever sat under the sheet's
   * start (the scrim, which closes it), and a finger where the sheet was
   * lands on the sheet. UIKit keeps an interruptible animation hit-testable
   * where it is drawn (UIViewPropertyAnimator). The touch goes to what was
   * drawn under the finger when it landed (`time`, its event's timestamp),
   * even when a busy main thread hands it over later, and content that slid
   * under the finger since takes nothing (`spec:AST-094` FR11).
   */ presentedTarget(native, x, y, time) {
        if (!this.hitTestsLayout()) {
            return native;
        }
        const movers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$presentation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["presentedElements"])().filter((element)=>{
            if (!element.isConnected || element.ownerDocument !== this.doc) {
                return false;
            }
            const { x: dx, y: dy } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$presentation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["presentedOffsetOf"])(element);
            return Math.abs(dx) >= 0.5 || Math.abs(dy) >= 0.5;
        });
        if (movers.length === 0) {
            return native;
        }
        // One style write per mover makes the engine hit-test it where it is
        // drawn now; the hit test below flushes them. The engine then gets
        // z-order, pointer-events and clipping right, which no box math would.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$presentation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePresented"])(movers);
        let hit = this.drawnAt(x, y);
        // A mover kept going while the touch waited for the main thread: what
        // was under the finger when it landed is now that far along. A timestamp
        // on another clock, or older than a second, is not corrected.
        const age = (this.doc.defaultView?.performance.now() ?? time) - time;
        if (age > 0 && age < 1000) {
            const movedSince = (mover)=>{
                const then = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$presentation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["presentedOffsetOf"])(mover, time);
                return Math.abs(then.x) >= 0.5 || Math.abs(then.y) >= 0.5 ? then : null;
            };
            const now = hit;
            const under = now == null ? undefined : movers.find((mover)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containsAlongFlatTree"])(mover, now));
            let landedOnMover = false;
            for (const mover of movers){
                const then = movedSince(mover);
                if (then == null) {
                    continue;
                }
                const landed = this.drawnAt(x - then.x, y - then.y);
                if (landed != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containsAlongFlatTree"])(mover, landed)) {
                    hit = landed;
                    landedOnMover = true;
                    break;
                }
            }
            // Content that slid under the finger after it landed takes nothing:
            // the touch goes to what was there, beneath it.
            if (!landedOnMover && under != null && movedSince(under) != null) {
                hit = this.drawnBeneath(x, y, movers);
            }
        }
        if (hit == null || hit === native) {
            return native;
        }
        const found = hit;
        const node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(native) ? native : null;
        const isAboutMover = movers.some((mover)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containsAlongFlatTree"])(mover, found) || node != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containsAlongFlatTree"])(mover, node));
        return isAboutMover ? found : native;
    }
    /** What is drawn at a point beneath every mover. */ drawnBeneath(x, y, movers) {
        if (typeof this.doc.elementsFromPoint !== 'function') {
            return null;
        }
        return this.doc.elementsFromPoint(x, y).find((element)=>!movers.some((mover)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containsAlongFlatTree"])(mover, element))) ?? null;
    }
    /** What is drawn at a point, inside open shadow roots too. */ drawnAt(x, y) {
        let hit = this.doc.elementFromPoint(x, y);
        // The document answers a shadow host for anything inside its open root:
        // descend to what is drawn there.
        while(hit?.shadowRoot != null){
            const inner = hit.shadowRoot.elementFromPoint(x, y);
            if (inner == null || inner === hit) {
                break;
            }
            hit = inner;
        }
        return hit;
    }
    /** The browser took these touches (a scroll): no click of ours for them. */ browserTook(ids, time) {
        for (const id of ids){
            this.retargeted.delete(id);
        }
        this.arena.browserTookOver(ids, time);
    }
    /**
   * The click a retargeted tap earned, on what was drawn under the finger.
   * The engine's own click would hit the start position, so the caller
   * cancels it (or the click guard drops it, a late one included) and this one
   * is the tap's single activation.
   */ clickRetargeted(target, x, y, pointerType) {
        const view = this.doc.defaultView;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(target) || !target.isConnected || view == null) {
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["armClickGuard"])(this.doc, {
            takesLateMouse: pointerType === 'touch'
        });
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(target) && target.matches('input, textarea, select, [contenteditable]')) {
            target.focus();
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withoutClickGuard"])(()=>target.dispatchEvent(new view.MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                composed: true,
                detail: 1,
                clientX: x,
                clientY: y
            })));
    }
    /**
   * Re-derive an element's styles and the host's listeners after its
   * recognizers' options or its consumer's enabled state changed.
   */ update(element) {
        if (!this.followsPointer) {
            // A read passed in (a test's) is not followed: an update reads it again.
            this.isCoarse = this.isPrimaryPointerCoarse();
        }
        const registration = this.registry.get(element);
        if (registration != null) {
            this.refresh(element, registration);
        }
        this.syncListeners();
    }
    /**
   * The Pointer Events `pointerId` of a contact the arena tracks: a mouse's
   * or a pen's own, and for a finger driven by touch events the pointer its
   * touch was paired with (null before the pairing, or without Pointer
   * Events). It hands a held finger to code that follows pointers, as a
   * menu does when a long press turns into a press-drag selection.
   */ pointerIdOf(touch) {
        const id = typeof touch === 'number' ? touch : touch.id;
        for (const [pointerId, arenaId] of this.fingerPointers){
            if (arenaId === id) {
                return pointerId;
            }
        }
        for (const [pointerId, arenaId] of this.pointerIds){
            if (arenaId === id) {
                return pointerId;
            }
        }
        return null;
    }
    /**
   * Whether a finger set a scroller containing `node` moving within the last
   * `window` ms. A touch there now brakes the scroll rather than pressing
   * whatever is under it: a native list highlights nothing for one.
   */ isScrollBraking(node, window = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIKIT_PRESS"].scrollBrake.value) {
        const last = this.lastScroll;
        return last != null && this.arena.now() - last.time < window && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containsAlongFlatTree"])(last.scroller, node);
    }
    /**
   * @internal Keep the host's listeners installed until the returned
   * function runs, with no recognizer attached (fingerScroll.ts reads the
   * finger record meanwhile).
   */ retain() {
        this.retainers += 1;
        // A watch is not an attach: no warning where the pointer is fine.
        this.watchPointer();
        this.syncListeners();
        let isRetained = true;
        return ()=>{
            if (!isRetained) {
                return;
            }
            isRetained = false;
            this.retainers -= 1;
            this.uninstallIfIdle();
        };
    }
    /**
   * @internal Call `listener` after each touch event the host hears, once
   * the finger record is up to date. Returns the unsubscribe.
   */ onFingersChange(listener) {
        this.fingerListeners.add(listener);
        return ()=>{
            this.fingerListeners.delete(listener);
        };
    }
    /** @internal Whether a finger that landed inside `node` is down now. */ isFingerDownIn(node) {
        // Along the flat tree: a finger on content inside an open shadow root is
        // in the scroller around that root.
        return this.fingerTargets.some((target)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containsAlongFlatTree"])(node, target));
    }
    /**
   * @internal Whether a pen that went down inside `node` is down now,
   * whichever participant keeps it. A pen's own menu event is that hold's
   * (contextRequest.ts).
   */ isPenDownIn(node) {
        return this.arena.touches.some((touch)=>touch.pointerType === 'pen' && // A lifted pen that a recognizer still decides on is no longer down.
            touch.phase !== 'ended' && touch.phase !== 'cancelled' && touch.target instanceof Node && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containsAlongFlatTree"])(node, touch.target));
    }
    /**
   * @internal When a pen hold that went down inside `node` last ended, at
   * its lift or a cancel. The time is on the host's clock: negative infinity
   * when none did.
   */ lastPenLiftIn(node) {
        const lift = this.lastPenLift;
        return lift != null && lift.target instanceof Node && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containsAlongFlatTree"])(node, lift.target) ? lift.time : Number.NEGATIVE_INFINITY;
    }
    registrationFor(element) {
        this.watchPointer();
        let registration = this.registry.get(element);
        if (registration == null) {
            registration = {
                recognizers: [],
                consumer: null,
                hasTouchEndListener: false,
                hasTouchMoveListener: false,
                hasWheelListener: false,
                savedStyle: new Map(),
                authorTouchAction: null,
                manageStyle: true,
                unstyled: new Set(),
                actionGroup: false,
                actionGroupAsks: 0
            };
            this.registry.set(element, registration);
        }
        return registration;
    }
    /** Whether anything attached could take input. */ needsInput() {
        return this.registry.size > 0 || this.retainers > 0;
    }
    refresh(element, registration) {
        if (registration.manageStyle && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(element)) {
            this.applyStyle(element, registration);
        }
        this.syncTouchMoveListener(element, registration);
    }
    /**
   * The element's blocking `touchmove`. For every pointer a claiming
   * recognizer keeps it: a finger's claim cancels its moves here (FR19), a
   * listener FR24 counts outside the one-listener budget a fine pointer's
   * element keeps for its press (syncArmed). A kept press needs it only
   * while a press is held: a phone's before every touch (Safari honours a
   * blocking listener only when registered before the touch began), a fine
   * pointer's only during an armed press, whose `pointerdown` comes before
   * the touch it brings (FR24).
   */ syncTouchMoveListener(element, registration) {
        // Where fingers come from their pointer events (Pointer Events input, or
        // a window with no ontouchstart), a claimed finger's touchend is not the
        // host's own document listener's to cancel, so the element cancels it
        // (FR21). Under a coarse pointer always: touch emulation turned on after
        // load hides ontouchstart yet sends touches. Under a fine one wherever
        // the browser sends Touch Events, as a touchscreen laptop does (FR43);
        // elsewhere no touchend ever comes, and the element keeps no listener
        // (FR24).
        const needsEndListener = this.readsFingersFromPointerEvents() && (this.isCoarse || this.sendsTouchEvents()) && registration.recognizers.some((recognizer)=>recognizer.isEnabled && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).acceptsTouchInput);
        if (needsEndListener && !registration.hasTouchEndListener) {
            element.addEventListener('touchend', this.onClaimedTouchEnd, {
                passive: false
            });
            registration.hasTouchEndListener = true;
        } else if (!needsEndListener && registration.hasTouchEndListener) {
            element.removeEventListener('touchend', this.onClaimedTouchEnd);
            registration.hasTouchEndListener = false;
        }
        const needsListener = registration.recognizers.some((recognizer)=>recognizer.isEnabled && claimsWhileMoving(recognizer)) || registration.consumer?.keepsTouch != null && registration.consumer.isEnabled?.() !== false && (this.isCoarse || this.isArmedPress);
        // The blocking listener sits on the element itself (FR19: a scroll that
        // starts elsewhere never waits on it), but every element shares the
        // host's one handler, which routes through the arena.
        if (needsListener && !registration.hasTouchMoveListener) {
            element.addEventListener('touchmove', this.onBlockingTouchMove, {
                passive: false
            });
            registration.hasTouchMoveListener = true;
        } else if (!needsListener && registration.hasTouchMoveListener) {
            element.removeEventListener('touchmove', this.onBlockingTouchMove);
            registration.hasTouchMoveListener = false;
        }
        // Wheel and trackpad input, only where an enabled recognizer takes it. A
        // non-passive wheel listener makes the browser's scrolling over the
        // element wait for the main thread.
        const needsWheel = registration.recognizers.some((recognizer)=>recognizer.isEnabled && // A watcher never takes the wheel: the page keeps it.
            recognizer.claimsTouches && recognizer.allowedScrollTypes.size > 0 && (// A wheel drives a pan or a pinch only.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).family === 'pan' || (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).family === 'pinch'));
        if (needsWheel && !registration.hasWheelListener) {
            element.addEventListener('wheel', this.onWheel, {
                passive: false
            });
            registration.hasWheelListener = true;
        } else if (!needsWheel && registration.hasWheelListener) {
            element.removeEventListener('wheel', this.onWheel);
            registration.hasWheelListener = false;
        }
    }
    applyStyle(element, registration) {
        // A disabled recognizer leaves the browser everything (FR24).
        // Every pointer gets it: a touchscreen laptop's finger as a phone's (FR43).
        const active = registration.recognizers.filter((recognizer)=>recognizer.isEnabled && !registration.unstyled.has(recognizer));
        let style = active.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$touchAction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gestureHostStyle"])(active) : {};
        // A control that keeps its touch (a stepper's hold-repeat) takes taps in
        // quick succession: the browser's double-tap zoom goes, as for a tap
        // recognizer (`spec:AST-094` FR18), for every pointer (FR43).
        if (style.touchAction == null && registration.consumer?.keepsTouch != null) {
            style = {
                ...style,
                touchAction: 'manipulation'
            };
        }
        for (const key of Object.keys(STYLE_PROPERTIES)){
            const property = STYLE_PROPERTIES[key];
            let value = style[key];
            if (key === 'touchAction') {
                value = this.touchActionToWrite(element, registration, value);
            }
            if (value != null) {
                if (!registration.savedStyle.has(property)) {
                    registration.savedStyle.set(property, element.style.getPropertyValue(property));
                }
                element.style.setProperty(property, value);
            } else if (registration.savedStyle.has(property)) {
                const saved = registration.savedStyle.get(property) ?? '';
                registration.savedStyle.delete(property);
                if (saved === '') {
                    element.style.removeProperty(property);
                } else {
                    element.style.setProperty(property, saved);
                }
            }
        }
    }
    /**
   * The touch-action to write inline, if any. The author's value (a
   * trigger's own `touch-action: none`) stays in force and the host never
   * allows more (spec:AST-094 FR18, DEC-8):
   * - an inline value is the style's own, read with no recalc, and the host
   *   writes what both allow, inline; a CSS-wide keyword (`initial`,
   *   `inherit`, `unset`, `revert`, `revert-layer`) names no touch-action of
   *   its own, so it is read as an author rule is, as what it resolves to;
   * - otherwise the element is marked with the derived value, under a rule
   *   any author rule outranks, as the recognizer attaches: a subtree that
   *   mounts with it is styled once, never restyled for it in a later frame.
   *   The next frame reads what is in force, styles clean, and the host
   *   writes inline only what both allow where that is narrower than an
   *   author rule's value.
   */ touchActionToWrite(element, registration, derived) {
        if (derived == null) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$touchActionRule$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unmarkTouchAction"])(element);
            registration.authorTouchAction = null;
            return undefined;
        }
        const property = STYLE_PROPERTIES.touchAction;
        const inline = registration.savedStyle.has(property) ? registration.savedStyle.get(property) ?? '' : element.style.getPropertyValue(property);
        if (inline !== '' && !isCssWideKeyword(inline)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$touchActionRule$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unmarkTouchAction"])(element);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$touchAction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["intersectTouchAction"])(derived, inline);
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$touchActionRule$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["markTouchAction"])(element, derived)) {
            // No document or shadow root to hold the rule (a detached element):
            // nothing is styled there, and the next frame looks again.
            this.readCallerTouchActionInNextFrame(element);
            return undefined;
        }
        const read = registration.authorTouchAction;
        if (read == null || read.derived !== derived) {
            // The rule is in force until the read: the derived value, or the
            // author's where the author sets one.
            this.readCallerTouchActionInNextFrame(element);
            return undefined;
        }
        if (read.author == null) {
            return undefined;
        }
        const both = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$touchAction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["intersectTouchAction"])(derived, read.author);
        return both === read.author ? undefined : both;
    }
    /**
   * Read the touch-action in force on each marked element in the next frame,
   * then apply its style again. Batched: one style read serves every pending
   * element, and the writes follow the reads. The host has written no
   * touch-action inline on them, so a value other than the mark is an author
   * rule's.
   */ readCallerTouchActionInNextFrame(element) {
        this.pendingCallerReads.add(element);
        if (this.isCallerReadScheduled) {
            return;
        }
        this.isCallerReadScheduled = true;
        this.cancelCallerRead = inNextFrame(this.doc.defaultView, ()=>{
            this.isCallerReadScheduled = false;
            this.cancelCallerRead = null;
            const pending = [];
            for (const candidate of this.pendingCallerReads){
                const registration = this.registry.get(candidate);
                if (registration != null) {
                    pending.push([
                        candidate,
                        registration
                    ]);
                }
            }
            this.pendingCallerReads.clear();
            const view = this.doc.defaultView;
            for (const [candidate, registration] of pending){
                const derived = candidate.getAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$touchActionRule$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TOUCH_ACTION_ATTRIBUTE"]);
                if (derived == null || view == null) {
                    continue;
                }
                const inForce = view.getComputedStyle(candidate).touchAction || 'auto';
                registration.authorTouchAction = {
                    derived,
                    author: inForce === derived ? null : inForce
                };
            }
            for (const [candidate, registration] of pending){
                this.applyStyle(candidate, registration);
            }
        });
    }
    cleanup(element, registration) {
        if (registration.recognizers.length > 0 || registration.consumer != null) {
            // What stays may take nothing (only disabled recognizers): FR24.
            this.syncListeners();
            return;
        }
        if (registration.hasTouchEndListener) {
            element.removeEventListener('touchend', this.onClaimedTouchEnd);
            registration.hasTouchEndListener = false;
        }
        if (registration.hasTouchMoveListener) {
            element.removeEventListener('touchmove', this.onBlockingTouchMove);
        }
        if (registration.hasWheelListener) {
            element.removeEventListener('wheel', this.onWheel);
        }
        this.registry.delete(element);
        this.uninstallIfIdle();
    }
    /**
   * Listen only while something could take a touch now (`spec:AST-094`
   * FR24, FR43): where the primary pointer is coarse, an enabled recognizer
   * or consumer, or a finger-scroll watch; where it is fine, only during a
   * press an element armed (syncArmed). Otherwise no document listener is
   * registered, so an idle page and a disabled control pay nothing.
   */ syncListeners() {
        this.syncLayoutWatch();
        this.syncArmed();
        if (this.shouldListen()) {
            this.install();
            this.syncClaimingListeners();
        } else {
            this.uninstall();
        }
        this.syncMoverBlocking();
    }
    /**
   * Safari honours a blocking `touchmove` only where it was registered before
   * the touch began, on the engine's own target, and on iOS WebKit a finger
   * on an element a compositor animation moves lands, for the engine, on
   * whatever sits under the motion's start (see presentedTarget). So while an
   * element a recognizer that claims moving touches lives in (or around) is
   * moving, the blocking listener subscribes to the window's capturing
   * `touchmove` through the shared input stream with `{cancels: true}`,
   * which sees every touch on the page whatever the engine targets and makes
   * that one listener non-passive (`spec:AST-094` FR19;
   * architecture:react-component-runtime INV13). It leaves when the motion
   * ends: only while it is subscribed does a scroll starting anywhere wait on
   * the main thread.
   */ syncMoverBlocking() {
        const isWatching = this.isInstalled && this.hitTestsLayout();
        if (isWatching && this.stopWatchingMovers == null) {
            this.stopWatchingMovers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$presentation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["watchPresentedElements"])(()=>this.syncMoverBlocking());
        } else if (!isWatching && this.stopWatchingMovers != null) {
            this.stopWatchingMovers();
            this.stopWatchingMovers = null;
        }
        const needed = isWatching && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$presentation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["presentedElements"])().some((mover)=>this.hasClaimingRecognizerAround(mover));
        if (needed === (this.stopBlockingForMovers != null)) {
            return;
        }
        const view = this.doc.defaultView;
        if (needed && view != null) {
            this.stopBlockingForMovers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'touchmove', this.onBlockingTouchMove, {
                cancels: true
            });
        } else if (!needed) {
            this.stopBlockingForMovers?.();
            this.stopBlockingForMovers = null;
        }
    }
    /** Whether a recognizer that claims moving touches lives in or around `mover`. */ hasClaimingRecognizerAround(mover) {
        if (!mover.isConnected || mover.ownerDocument !== this.doc) {
            return false;
        }
        for (const [element, registration] of this.registry){
            if (((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containsAlongFlatTree"])(mover, element) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containsAlongFlatTree"])(element, mover)) && registration.recognizers.some((recognizer)=>recognizer.isEnabled && claimsWhileMoving(recognizer))) {
                return true;
            }
        }
        return false;
    }
    /**
   * Where the primary pointer is fine, each element with an enabled
   * recognizer or press consumer listens for a press itself: one passive
   * `pointerdown` listener on the element. The host's page listeners come at
   * that press and go once its contacts end and the arena drops their last
   * record (onIdle: a decision that waited on a timer), so an idle page has none
   * (`spec:AST-094` FR24, FR43). A finger on a touchscreen whose primary
   * pointer is fine sends its `pointerdown` before its `touchstart`, so the
   * host hears both.
   */ syncArmed() {
        const wanted = new Set();
        if (!this.isCoarse) {
            for (const [element, registration] of this.registry){
                const consumer = registration.consumer;
                if (registration.recognizers.some((recognizer)=>recognizer.isEnabled && (// One that takes only scroll input has no press to arm.
                    recognizer.allowedPointerTypes == null || recognizer.allowedPointerTypes.size > 0)) || consumer != null && consumer.isEnabled?.() !== false) {
                    wanted.add(element);
                }
            }
        }
        for (const [element, release] of this.armedElements){
            if (!wanted.has(element)) {
                release();
                this.armedElements.delete(element);
            }
        }
        for (const element of wanted){
            if (this.armedElements.has(element)) {
                continue;
            }
            element.addEventListener('pointerdown', this.onArmedPress, PASSIVE_CAPTURE);
            this.armedElements.set(element, ()=>{
                element.removeEventListener('pointerdown', this.onArmedPress, PASSIVE_CAPTURE);
            });
        }
        if (wanted.size === 0 && this.isArmedPress) {
            this.isArmedPress = false;
            this.syncKeptPresses();
        }
    }
    /** A press on an armed element, a mouse's primary button, a pen or a finger: listen for this press. */ onArmedPress = (event)=>{
        const press = event;
        if (this.isInstalled || !isPointerKind(press.pointerType) || press.pointerType !== 'touch' && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$primaryClick$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPrimaryClick"])(press)) {
            return;
        }
        this.isArmedPress = true;
        this.syncKeptPresses();
        this.install();
        // A finger's or a pen's press brings the cancelable touchend and the
        // contextmenu canceller, as wherever the host installs, so a claimed
        // lift clicks nothing and a claimed hold opens no browser menu (FR21). A
        // mouse's press needs neither.
        if (press.pointerType !== 'mouse') {
            this.syncClaimingListeners();
        }
        // The window's capture phase is over for this event: hand it on.
        this.onPointerDown(press);
    };
    /** A kept press's blocking `touchmove` follows the armed press (syncTouchMoveListener). */ syncKeptPresses() {
        for (const [element, registration] of this.registry){
            if (registration.consumer?.keepsTouch != null) {
                this.syncTouchMoveListener(element, registration);
            }
        }
    }
    /**
   * A new press is a new gesture, as the click guard reads one, so the lifts
   * the blur cancelled owe nothing after it. A second finger keeps the other
   * fingers' refusals, since those fingers may still be down.
   */ dropCancelledLifts(event) {
        const isSecond = event.pointerType === 'touch' && event.isPrimary === false;
        for (const [pointerId, kind] of [
            ...this.cancelledPointers
        ]){
            if (pointerId === event.pointerId || !(isSecond && kind === 'touch')) {
                this.cancelledPointers.delete(pointerId);
            }
        }
    }
    /**
   * After a contact ends: an armed press that is over stops listening. A
   * contact the lost focus cancelled still owes its lift, so the press is
   * not over until that lift comes. A lift the page never hears ends it at
   * the next press, or at a cancel.
   */ releaseArmedPress() {
        if (!this.isArmedPress) {
            return;
        }
        queueMicrotask(()=>{
            if (this.isArmedPress && this.arena.touches.length === 0 && this.cancelledPointers.size === 0) {
                this.isArmedPress = false;
                this.syncKeptPresses();
                this.syncListeners();
            }
        });
    }
    /** With nothing attached, stop listening and stop following the pointer. */ uninstallIfIdle() {
        this.syncListeners();
        if (this.registry.size === 0 && this.retainers === 0) {
            this.uninstall();
            this.stopWatchingPointer?.();
            this.stopWatchingPointer = null;
            this.releaseWhenIdle();
        }
    }
    /**
   * In the microtask after the last detach, unless something attached again
   * in the same task (a component that remounts mid-press keeps its notes):
   * nothing the host holds outlives it, no note and no pending frame or
   * timer (`spec:AST-094` FR24).
   */ releaseWhenIdle() {
        queueMicrotask(()=>{
            if (this.registry.size > 0 || this.retainers > 0) {
                return;
            }
            this.cancelledFingers.clear();
            this.cancelledPointers.clear();
            this.clearClaimedLifts();
            this.cancelCallerRead?.();
            this.cancelCallerRead = null;
            this.isCallerReadScheduled = false;
            this.pendingCallerReads.clear();
            for (const cancel of this.ownScrollFrames.values()){
                cancel();
            }
            this.ownScrollFrames.clear();
            this.ownedScrolls.clear();
            // A drag's hold whose press lifted in this task ends now, not a task
            // later: nothing is attached to meet its mouseup or click.
            for (const release of [
                ...this.dragHolds
            ]){
                release({
                    isCancel: true
                });
            }
            this.pressSelections.clear();
            this.selectingContacts.clear();
        });
    }
    /** Read the primary pointer, and follow it while anything is attached. */ watchPointer() {
        if (this.stopWatchingPointer != null) {
            return;
        }
        const view = this.doc.defaultView;
        this.isCoarse = this.isPrimaryPointerCoarse();
        this.stopWatchingPointer = this.followsPointer ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$coarsePointer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["watchCoarsePointer"])(view, (isCoarse)=>this.pointerChanged(isCoarse)) : ()=>{};
    }
    /**
   * The primary pointer turned coarse or fine (a tablet docking a mouse):
   * install or remove everything, as if each attach happened now.
   */ pointerChanged(isCoarse) {
        if (isCoarse === this.isCoarse) {
            return;
        }
        this.isCoarse = isCoarse;
        if (!isCoarse) {
            this.cancelEverything(this.arena.now());
        }
        for (const [element, registration] of this.registry){
            this.refresh(element, registration);
        }
        this.syncListeners();
    }
    /**
   * Whether an enabled participant could claim a touch or cancel a lift: a
   * consumer, or a recognizer that claims touches and takes a finger or a
   * pen. With only watchers, or only scroll-only recognizers
   * (`allowedPointerTypes: []`), the host's listeners are all passive.
   */ hasClaimer() {
        for (const registration of this.registry.values()){
            const consumer = registration.consumer;
            if (consumer != null && consumer.isEnabled?.() !== false || registration.recognizers.some((recognizer)=>recognizer.isEnabled && recognizer.claimsTouches && takesTouchContacts(recognizer))) {
                return true;
            }
        }
        return false;
    }
    /**
   * Keeps the touchend cancelable, and the contextmenu subscription on,
   * only while a claimer is attached; with only watchers the touchend is
   * passive and the contextmenu is off. Clicks are the click guard's
   * (utils/clickGuard.ts), whose one listener a window gets only once a
   * gesture first arms it.
   */ syncClaimingListeners() {
        if (!this.isInstalled) {
            return;
        }
        const isClaiming = this.hasClaimer();
        if (isClaiming === this.isClaimingInstalled) {
            return;
        }
        const view = this.doc.defaultView;
        for (const unsubscribe of this.claimingUnsubscribers.splice(0)){
            unsubscribe();
        }
        if (view != null) {
            if (this.inputMode === 'auto') {
                this.claimingUnsubscribers.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'touchend', this.onTouchEnd, {
                    cancels: isClaiming
                }));
            }
            if (isClaiming) {
                this.claimingUnsubscribers.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'contextmenu', this.onContextMenu, {
                    cancels: true
                }));
            }
        }
        this.isClaimingInstalled = isClaiming;
    }
    shouldListen() {
        if (!this.needsInput()) {
            return false;
        }
        // A retainer (a finger-scroll watch) listens only where the pointer is
        // coarse: it follows a finger's scroll, which a fine pointer's page
        // leaves to the browser (FR24).
        if (this.isCoarse && this.retainers > 0) {
            return true;
        }
        let isUsed = false;
        for (const registration of this.registry.values()){
            const consumer = registration.consumer;
            if (consumer != null && consumer.isEnabled?.() !== false || registration.recognizers.some((recognizer)=>recognizer.isEnabled)) {
                isUsed = true;
                break;
            }
        }
        // Where the primary pointer is fine, only while a press an element armed
        // is held (syncArmed, FR24, FR43).
        return isUsed && (this.isCoarse || this.isArmedPress);
    }
    // --- Listeners -------------------------------------------------------------
    install() {
        this.watchPointer();
        if (!this.needsInput()) {
            return;
        }
        if (this.isInstalled) {
            return;
        }
        const view = this.doc.defaultView;
        this.isInstalled = true;
        this.usesTouchEvents = this.inputMode === 'auto' && view != null && 'ontouchstart' in view;
        if (view == null) {
            // A document without a window receives no input.
            return;
        }
        // The window's capture phase, through the shared input stream
        // (utils/inputStream.ts): ahead of any document listener, so an app's
        // window-capture stopPropagation, or a document-capture
        // stopImmediatePropagation registered first, no longer hides a touch
        // from the recognizers. A recognizer that must claim mid-gesture still
        // needs the touch to reach its element, where its blocking touchmove
        // sits. Only the listeners that cancel are non-passive, and only while a
        // claimer is attached (syncClaimingListeners); none of them is a
        // touchstart or touchmove, so none of them holds a scroll.
        this.unsubscribers = [
            // Pointer Events only: a finger comes from its pointer events alone. A
            // browser that has Touch Events still sends them for the same finger,
            // and reading both would track it twice (a long press needs one touch).
            ...this.inputMode === 'auto' ? [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'touchstart', this.onTouchStart),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'touchmove', this.onTouchMove),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'touchcancel', this.onTouchCancel)
            ] : [],
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'pointerdown', this.onPointerDown),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'pointermove', this.onPointerMove),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'pointerup', this.onPointerUp),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'pointercancel', this.onPointerCancel),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'scroll', this.onScroll),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'visibilitychange', this.onVisibilityChange),
            // The window's own blur; an element's blur (a Node's) reaches the
            // window's capture phase too and means nothing here.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'blur', (event)=>{
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(event.target)) {
                    this.onBlur();
                }
            })
        ];
        // Passive until a claimer is attached (syncClaimingListeners).
        this.isClaimingInstalled = false;
        this.claimingUnsubscribers = this.inputMode === 'auto' ? [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'touchend', this.onTouchEnd)
        ] : [];
    }
    uninstall() {
        if (!this.isInstalled) {
            return;
        }
        this.isInstalled = false;
        // Unheard from here on: no fingers to keep.
        this.fingerTargets = [];
        this.isClaimingInstalled = false;
        for (const unsubscribe of [
            ...this.unsubscribers.splice(0),
            ...this.claimingUnsubscribers.splice(0)
        ]){
            unsubscribe();
        }
        this.cancelEverything(this.arena.now());
        // A claimed lift's note stays: an armed press's listeners go in the
        // microtask after its pointerup, the touchend comes after that microtask
        // in the same task (iOS and WebKit), and the element's own listener still
        // takes it (noteClaimedLift).
        this.lastTouch = null;
        this.lastScroll = null;
    }
    // --- Hit path --------------------------------------------------------------
    /**
   * The recognizers on the path from `target` to the document, innermost
   * first, and (for a contact) its consumer: the innermost element with an
   * attached consumer.
   */ participantsAt(target, pointerType) {
        const recognizers = [];
        let consumer = null;
        let consumerElement = null;
        // A layer that the input hold holds takes no touch while it presents.
        // The host asks the hold, so the hold needs nothing from gestures/. A
        // root-entry component can then use the hold with no gesture code.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(target) && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$inputHold$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["holdsTouch"])(target) || [
            ...this.touchGates
        ].some((gate)=>gate(target)))) {
            return {
                recognizers,
                consumer,
                consumerElement
            };
        }
        let hasConsumerOwner = pointerType == null;
        for(let node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(target) ? target : null; node != null; node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parentAcrossShadow"])(node)){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(node)) {
                continue;
            }
            const registration = this.registry.get(node);
            if (registration != null) {
                // Every pointer (`spec:AST-094` FR43), hover included.
                recognizers.push(...registration.recognizers);
            }
            if (hasConsumerOwner || pointerType == null) {
                continue;
            }
            // A press consumer takes every pointer's press, a mouse's too
            // (`spec:AST-094` FR43, DEC-21).
            if (registration?.consumer != null) {
                consumer = registration.consumer;
                consumerElement = node;
                hasConsumerOwner = true;
                continue;
            }
        }
        return {
            recognizers,
            consumer,
            consumerElement
        };
    }
    /**
   * Turn text selection and the touch callout off, for as long as this
   * finger or pen is down, only on the elements whose hold does something:
   * a long press's (a menu, a hold-repeat), those of recognizers created
   * with a `selectionLock` (a slider's thumb, a switch's drag, a tab bar's
   * zero-delay lens) and that of a press tracker created with one (a
   * stepper's hold-repeat). Anything whose hold does nothing, a plain
   * press-tracked control or row included, keeps the browser's long-press
   * selection (`spec:AST-094` FR41). Restored when the contact ends. Callers
   * lock for a finger or a pen under any primary pointer, never for a mouse
   * (locksSelectionFor), and only once the arena has admitted the contact:
   * `recognizers` and `consumer` are the ones that took it.
   */ lockSelection(id, recognizers, target, consumer, consumerElement) {
        // Each recognizer whose hold does something brings its lock; the host
        // never imports one (a component without such a hold does not bundle
        // it). Only one that took this contact locks for it: a recognizer that
        // declined it (its pointer, or its own shouldReceiveTouch) has no hold
        // here.
        // A recognizer attached with manageStyle: false leaves the element's
        // styles to the caller, the lock included (AttachOptions.manageStyle).
        const managed = (element, recognizer)=>{
            const registration = this.registry.get(element);
            return registration?.manageStyle !== false && (recognizer == null || registration?.unstyled.has(recognizer) !== true);
        };
        const byLock = new Map();
        for (const recognizer of recognizers){
            const lock = recognizer.selectionLock;
            if (lock != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(recognizer.view) && managed(recognizer.view, recognizer)) {
                const elements = byLock.get(lock) ?? new Set();
                elements.add(recognizer.view);
                byLock.set(lock, elements);
            }
        }
        const consumerLock = consumer?.selectionLock;
        if (consumerLock != null && consumerElement != null && managed(consumerElement)) {
            const elements = byLock.get(consumerLock) ?? new Set();
            elements.add(consumerElement);
            byLock.set(consumerLock, elements);
        }
        if (byLock.size > 0) {
            const undo = [
                ...byLock
            ].map(([lock, elements])=>lock(elements, target));
            this.lockedBy.set(id, ()=>{
                for (const release of undo){
                    release();
                }
            });
        }
    }
    /**
   * Wheel and trackpad input. A wheel gesture drives the recognizers that
   * allow its scroll type, as a contact that moves with the content. A pan
   * takes it along its own axis, once no scroller between the pointer and
   * the pan's element can scroll that way. The gesture's first wheel decides
   * this. A pinch takes a ctrl-wheel, as a trackpad pinches, as two contacts
   * whose span follows exp(-deltaY / 100). A wheel the page keeps is never
   * prevented, and a wheel a recognizer takes always is. A gesture ends its
   * end window after its last wheel (wheelEndMs), at that wheel's time, so
   * its release keeps its velocity. A gesture a recognizer took is latched
   * to it, as a browser latches a scroller. While the gesture lasts, the
   * shared input stream hands this every wheel first, wherever it lands. So
   * a pan whose element moves from under a still pointer keeps the gesture.
   * The page listener exists only during a gesture.
   */ onWheel = (event)=>{
        const wheel = event;
        if (this.wheelsSeen.has(wheel)) {
            return;
        }
        this.wheelsSeen.add(wheel);
        const time = eventTime(wheel, this.timing);
        const kind = wheel.ctrlKey ? 'pinch' : 'pan';
        let gesture = this.wheel;
        if (gesture != null && (gesture.kind !== kind || time - gesture.last >= gesture.endMs)) {
            this.endWheel(time);
            gesture = null;
        }
        if (gesture != null && gesture.ids.length > 0 && gesture.follow?.lifted !== true && !this.wheelHasTaker(gesture)) {
            // Every recognizer that took it has left (detached, disabled or
            // cancelled), so the rest of the gesture is the page's. A followed
            // pan's own lift does not count. Its momentum stays latched and
            // prevented until the splitter's next gesture or the end timer, and
            // moves nothing. The release is stamped at its last wheel.
            this.endWheel(gesture.last);
            const left = wheelPixels(wheel, this.doc.defaultView);
            gesture = {
                kind,
                scrollType: scrollTypeOf(wheel),
                ids: [],
                x: wheel.clientX,
                y: wheel.clientY,
                span: WHEEL_PINCH_SPAN,
                last: time,
                endMs: wheelEndMs(kind, scrollTypeOf(wheel), Math.abs(left.dx) > Math.abs(left.dy)),
                timer: null,
                takers: []
            };
            this.wheel = gesture;
        }
        let { dx, dy } = wheelPixels(wheel, this.doc.defaultView);
        const horizontal = Math.abs(dx) > Math.abs(dy);
        // The splitter reads a pan's stream only. A ctrl-wheel pinch has no
        // fingers' phase or momentum to tell apart, and ends 100 ms after its
        // last wheel.
        let seg = null;
        if (kind === 'pan') {
            // Only a trackpad's wheel can join its glide late; a mouse wheel's
            // notches keep the splitter's other rules.
            seg = this.segmenter.push(time, horizontal ? dx : dy, horizontal ? WHEEL_FOLLOW_END_MS : WHEEL_FOLLOW_END_V_MS, scrollTypeOf(wheel) === 'continuous');
        } else {
            this.segmenter.end();
        }
        this.wheelSegment = seg;
        if (seg?.boundary != null) {
            if (gesture != null) {
                this.endWheel(time);
                gesture = null;
            }
        }
        // A late wheel the glide took was the fingers' first when this one grows.
        if (seg != null && seg.carried !== 0) {
            if (horizontal) {
                dx += seg.carried;
            } else {
                dy += seg.carried;
            }
        }
        if (gesture == null) {
            gesture = this.beginWheel(wheel, kind, dx, dy, time);
            this.wheel = gesture;
            if (gesture.ids.length > 0) {
                this.latchWheel();
            }
        }
        gesture.last = time;
        if (gesture.timer != null) {
            this.clock.clearTimeout(gesture.timer);
        }
        // A trackpad scroll waits out a slow drag's pauses, whoever
        // keeps it; a pinch or a mouse wheel's notches 100 ms.
        gesture.timer = this.clock.setTimeout(()=>{
            this.segmenter.end();
            this.endWheel();
        }, gesture.endMs);
        if (gesture.ids.length === 0) {
            return;
        }
        wheel.preventDefault();
        if (gesture.kind === 'pan' && gesture.follow) {
            const f = gesture.follow;
            if (f.lifted) {
                return;
            }
            if (this.wheelSegment?.liftNow === true) {
                // Momentum began: the fingers lifted before the held deltas. The pan
                // keeps the travel it showed through the undecided stretch. It lets
                // go here, still moving at the fingers' speed, so its release carries
                // on from it. The rest of the momentum never moves the pan.
                this.followProvisionally(gesture, f, time);
                f.lifted = true;
                this.arena.ended([
                    {
                        id: gesture.ids[0],
                        x: gesture.x,
                        y: gesture.y,
                        time
                    }
                ]);
                return;
            }
            if (this.wheelSegment?.decaying === true) {
                // Undecided: the real deltas wait for the splitter while the
                // fingers' last speed carries the pan on. A held wheel with its own
                // frame ends the reading a stall's bunch joins.
                f.heldX += dx;
                f.heldY += dy;
                if (this.wheelSegment.bunched) {
                    // A raised speed moves on from where the pan is shown, so the
                    // position never jumps inside the bunch.
                    const since = time - f.lastMove;
                    const speedX = f.speedX;
                    const speedY = f.speedY;
                    joinReading(f, f.trueX - f.heldX, f.trueY - f.heldY);
                    f.baseX += (speedX - f.speedX) * since;
                    f.baseY += (speedY - f.speedY) * since;
                } else {
                    f.readSpan = 0;
                }
                this.followProvisionally(gesture, f, time);
                return;
            }
            // The fingers' own delta; the held ones were theirs too. Their moves
            // absorb what the pan shows ahead of their travel, or behind it, half a
            // move at a time. So the pan never steps back, and ends on their travel.
            const beforeX = f.trueX - f.heldX;
            const beforeY = f.trueY - f.heldY;
            const debtX = absorbedDebt(gesture.x - beforeX, dx);
            const debtY = absorbedDebt(gesture.y - beforeY, dy);
            const trueX = beforeX - dx;
            const trueY = beforeY - dy;
            // A wheel the splitter reads as one stall's merge has no speed of its
            // own. It joins the reading of the move before its bunch, whose
            // interval holds its time.
            const elapsed = time - f.lastMove;
            if (this.wheelSegment?.bunched === true) {
                joinReading(f, trueX, trueY);
            } else if (elapsed > 0) {
                f.priorSpeedX = f.speedX;
                f.priorSpeedY = f.speedY;
                f.readFromX = f.trueX;
                f.readFromY = f.trueY;
                f.readSpan = elapsed;
                f.speedX = (trueX - f.trueX) / elapsed;
                f.speedY = (trueY - f.trueY) / elapsed;
            }
            f.trueX = trueX;
            f.trueY = trueY;
            f.heldX = 0;
            f.heldY = 0;
            f.lastMove = time;
            gesture.x = trueX + debtX;
            gesture.y = trueY + debtY;
            f.baseX = gesture.x;
            f.baseY = gesture.y;
            this.arena.moved([
                {
                    id: gesture.ids[0],
                    x: gesture.x,
                    y: gesture.y,
                    time
                }
            ]);
            return;
        }
        if (gesture.kind === 'pan') {
            gesture.x -= dx;
            gesture.y -= dy;
            this.arena.moved([
                {
                    id: gesture.ids[0],
                    x: gesture.x,
                    y: gesture.y,
                    time
                }
            ]);
        } else {
            gesture.span *= Math.exp(-dy / 100);
            this.arena.moved(this.pinchContacts(gesture, time));
        }
    };
    /**
   * Move a followed pan through the splitter's undecided stretch. It moves on
   * from where it was shown at the fingers' last move, at their last speed.
   * It never passes what that speed projects for the time since.
   */ followProvisionally(gesture, f, time) {
        const elapsed = Math.max(0, time - f.lastMove);
        const x = f.baseX + f.speedX * elapsed;
        const y = f.baseY + f.speedY * elapsed;
        if (x === gesture.x && y === gesture.y) {
            return;
        }
        gesture.x = x;
        gesture.y = y;
        this.arena.moved([
            {
                id: gesture.ids[0],
                x,
                y,
                time
            }
        ]);
    }
    /** Start a wheel gesture: who takes it, decided once, or nobody. */ beginWheel(wheel, kind, dx, dy, time) {
        const type = scrollTypeOf(wheel);
        const isHorizontal = Math.abs(dx) > Math.abs(dy);
        const kept = {
            kind,
            scrollType: type,
            ids: [],
            x: wheel.clientX,
            y: wheel.clientY,
            span: WHEEL_PINCH_SPAN,
            last: time,
            endMs: wheelEndMs(kind, type, isHorizontal),
            timer: null,
            takers: []
        };
        // A contact already down keeps its gesture; the wheel stays the page's.
        // So does a first wheel another handler already prevented, or one that
        // cannot be cancelled: no recognizer could take it from the page.
        if (this.arena.touches.length > 0 || dx === 0 && dy === 0 || wheel.defaultPrevented || !wheel.cancelable) {
            return kept;
        }
        // Every scroller under the pointer, the page included, as a finger's
        // probe reads them, without touch-action, which a wheel ignores.
        // What the wheel landed on: at a shadow host's listener the event's
        // target is the host, and a scroller inside its tree must count.
        const target = landedOn(wheel);
        const scroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$nativeScroll$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createNativeScrollProbe"])(target, {
            readsTouchAction: false
        });
        const takers = [];
        for(let node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(target) ? target : null; node != null; node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parentAcrossShadow"])(node)){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(node)) {
                continue;
            }
            for (const recognizer of this.registry.get(node)?.recognizers ?? []){
                // A pan follows a trackpad, never a mouse wheel's notches, which
                // scroll what is under the pointer.
                if (!recognizer.isEnabled || !recognizer.claimsTouches || !recognizer.allowedScrollTypes.has(type) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).family !== kind || kind === 'pan' && type !== 'continuous') {
                    continue;
                }
                if (kind === 'pan' && (!panTakesMove(recognizer, -dx, -dy) || this.scrollerTakes(target, node, dx, dy, isHorizontal, this.keepsAxis(node, isHorizontal)) || // A scroll-edge pan only past every scroller's edge.
                isScrollEdgePan(recognizer) && scroll.canScroll(-dx, -dy))) {
                    continue;
                }
                takers.push(recognizer);
            }
        }
        if (takers.length === 0) {
            return kept;
        }
        const base = {
            pointerType: 'mouse',
            target,
            scroll,
            scrollType: type,
            recognizers: takers,
            consumer: null
        };
        const ids = kind === 'pan' ? [
            this.nextId++
        ] : [
            this.nextId++,
            this.nextId++
        ];
        const gesture = {
            ...kept,
            ids,
            takers
        };
        if (kind === 'pan' && type === 'continuous') {
            gesture.follow = {
                lifted: false,
                heldX: 0,
                heldY: 0,
                lastMove: time,
                trueX: kept.x,
                trueY: kept.y,
                baseX: kept.x,
                baseY: kept.y,
                speedX: 0,
                speedY: 0,
                readFromX: kept.x,
                readFromY: kept.y,
                readSpan: 0,
                priorSpeedX: 0,
                priorSpeedY: 0
            };
        }
        this.arena.began(kind === 'pan' ? [
            {
                ...base,
                id: ids[0],
                x: wheel.clientX,
                y: wheel.clientY,
                time
            }
        ] : this.pinchContacts(gesture, time).map((input)=>({
                ...base,
                ...input
            })));
        // Every recognizer it was offered to may decline it (its own
        // shouldReceiveTouch). Then nobody took the wheel, and it scrolls the
        // page from its first step, as with no gesture system.
        if (ids.every((id)=>this.arena.participantsOf(id).length === 0)) {
            this.arena.cancelled(ids, time);
            return kept;
        }
        return gesture;
    }
    /**
   * Whether a scroller between `target` and `boundary` (both included)
   * scrolls this wheel now, along the wheel's major axis. It uses the edge
   * test a finger's probe uses (canElementScroll). With `keepsBoundary`, the
   * boundary's own scroll is its recognizers', as it is for a finger.
   */ scrollerTakes(target, boundary, dx, dy, isHorizontal, keepsBoundary) {
        for(let node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(target) ? target : null; node != null; node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parentAcrossShadow"])(node)){
            if (node === boundary && keepsBoundary) {
                break;
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(node) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$nativeScroll$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["canElementScroll"])(node, isHorizontal ? -dx : 0, isHorizontal ? 0 : -dy)) {
                return true;
            }
            if (node === boundary) {
                break;
            }
        }
        return false;
    }
    /**
   * Whether the touch-action the host derives for `element` keeps the
   * wheel's axis from the browser. A finger's pan along that axis is then
   * the element's recognizers', and so is a trackpad's scroll of the element
   * itself.
   */ keepsAxis(element, isHorizontal) {
        const registration = this.registry.get(element);
        if (registration == null || !registration.manageStyle) {
            return false;
        }
        const active = registration.recognizers.filter((recognizer)=>recognizer.isEnabled && !registration.unstyled.has(recognizer));
        const touchAction = active.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$touchAction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gestureHostStyle"])(active).touchAction : undefined;
        if (touchAction == null) {
            return false;
        }
        const allowed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseTouchAction"])(touchAction);
        return isHorizontal ? !allowed.x : !allowed.y;
    }
    /** A ctrl-wheel pinch's two contacts, `span` apart around its center. */ pinchContacts(gesture, time) {
        return [
            {
                id: gesture.ids[0],
                x: gesture.x - gesture.span / 2,
                y: gesture.y,
                time
            },
            {
                id: gesture.ids[1],
                x: gesture.x + gesture.span / 2,
                y: gesture.y,
                time
            }
        ];
    }
    /** Whether a recognizer that took this wheel gesture still takes part in it. */ wheelHasTaker(gesture) {
        // A cancelled or failed recognizer keeps that state until its contacts
        // end, which a wheel gesture's do only here.
        return gesture.takers.some((recognizer)=>{
            const { state } = recognizer;
            return recognizer.isEnabled && (state === 'began' || state === 'changed' || state === 'possible' && recognizer.isInvolved());
        });
    }
    /**
   * Route every wheel on the page to the live wheel gesture, from its claim.
   * The route is the shared input stream's capture listener on the window,
   * which runs before any document listener. It is non-passive only while it
   * is subscribed.
   */ latchWheel() {
        const view = this.doc.defaultView;
        if (this.stopWheelLatch == null && view != null) {
            const cancelWheel = ()=>{
                const ids = this.dropDrivenWheel();
                if (ids.length > 0) {
                    this.arena.cancelled(ids, this.arena.now());
                }
            };
            const stops = [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'wheel', this.onWheel, {
                    cancels: true
                }),
                // A page that loses focus or hides ends a trackpad pan, as it ends
                // every touch. An element's blur reaches the window's capture phase
                // too and means nothing here.
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'blur', (event)=>{
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(event.target)) {
                        cancelWheel();
                    }
                }),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'visibilitychange', ()=>{
                    if (this.doc.visibilityState === 'hidden') {
                        cancelWheel();
                    }
                })
            ];
            this.stopWheelLatch = ()=>{
                for (const stop of stops){
                    stop();
                }
            };
        }
    }
    /**
   * Hold the page's selection for a mouse or pen contact that a recognizer
   * claims. Examples are a pan's drag and a press a group claims at its own
   * pointerdown. While the contact is down, the claiming recognizers'
   * elements refuse a new selection. The selection the page had at the press
   * is put back over anything that replaced it. That includes the press's own
   * collapse and a selection the drag made before its claim. The claiming
   * recognizer's element holds from its claim, in any state: a waiting
   * recognizer claims while possible, and a swipe claims as ended. The
   * participants that already recognize hold too. A claim given back to the
   * browser lets its hold go (releaseClaimedDrags). A drag that starts on
   * selectable text never gets here, because no recognizer claims it
   * (`selectingContacts`). A tap claims only at its lift, so a click keeps
   * the selection it made. A finger keeps the touch-down lock alone.
   */ lockClaimedDrags(ids, claimer) {
        for (const id of ids){
            if (this.claimHolds.has(id)) {
                continue;
            }
            const touch = this.arena.touches.find((each)=>each.id === id);
            // A claim made at the contact's own lift (a tap's) holds nothing: the
            // drag is over, and a click keeps the selection it made. A wheel's
            // contact keeps the page's selection, as a scroll does.
            if (touch == null || touch.pointerType === 'touch' || touch.scrollType != null || touch.phase === 'ended' || touch.phase === 'cancelled') {
                continue;
            }
            const elements = new Set();
            for (const recognizer of this.arena.participantsOf(id)){
                if ((recognizer.state === 'began' || recognizer.state === 'changed') && recognizer.view?.nodeType === 1) {
                    elements.add(recognizer.view);
                }
            }
            if (claimer.view?.nodeType === 1) {
                elements.add(claimer.view);
            }
            if (elements.size === 0) {
                continue;
            }
            const release = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$selectionLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lockDragSelection"])(elements, this.doc.defaultView, this.pressSelections.get(id) ?? [], ()=>{
                this.dragHolds.delete(release);
            });
            this.dragHolds.add(release);
            // A press lock the contact took at its press stays in `lockedBy`. The
            // hold sits beside it, and the contact's end releases both.
            if (!this.lockedBy.has(id)) {
                this.lockedBy.set(id, release);
            }
            this.claimHolds.set(id, release);
        }
    }
    /**
   * Claimed contacts the arena gave back. Their drag holds end at once, so
   * the browser's drag selects again. A contact's press lock (lockSelection)
   * is not a drag hold and stays.
   */ releaseClaimedDrags(ids) {
        for (const id of ids){
            const release = this.claimHolds.get(id);
            if (release == null) {
                continue;
            }
            this.claimHolds.delete(id);
            if (this.lockedBy.get(id) === release) {
                this.lockedBy.delete(id);
            }
            release({
                isCancel: true
            });
        }
    }
    /**
   * End the trackpad pan a recognizer still drives, when the page loses focus
   * or hides, and return its contacts to cancel. The rest of its stream is
   * the page's until the stream ends, as a touch the browser takes is. A
   * ctrl-wheel pinch keeps its stream, so the page never zooms for it. A
   * gesture the page keeps stays as it is. So does a pan its lift released:
   * its momentum stays latched and prevented until the stream ends.
   */ dropDrivenWheel() {
        const gesture = this.wheel;
        if (gesture == null || gesture.kind !== 'pan' || gesture.ids.length === 0 || gesture.follow?.lifted === true) {
            return [];
        }
        const kept = {
            ...gesture,
            ids: [],
            takers: []
        };
        delete kept.follow;
        this.wheel = kept;
        this.stopWheelLatch?.();
        this.stopWheelLatch = null;
        return gesture.ids;
    }
    /**
   * End the wheel gesture in progress. On its own timer, it ends its end
   * window after its last wheel. A taker that leaves (a detach, a disable)
   * passes that last wheel's time. An input that ends it sooner (a press,
   * the next gesture's first wheel) passes its own time. Both times are on
   * the wheels' time base (eventTime), never the host's clock, which need
   * not share it.
   */ endWheel(endTime) {
        const gesture = this.wheel;
        this.stopWheelLatch?.();
        this.stopWheelLatch = null;
        if (gesture == null) {
            return;
        }
        this.wheel = null;
        if (gesture.timer != null) {
            this.clock.clearTimeout(gesture.timer);
        }
        if (gesture.ids.length === 0 || gesture.follow?.lifted) {
            return;
        }
        // Fingers that stop without a lift end on their travel, where it runs
        // ahead of what the pan shows. What the undecided stretch showed past it
        // stays, as a step back would show.
        if (gesture.follow != null) {
            const f = gesture.follow;
            const x = ahead(gesture.x, f.trueX - f.heldX, f.speedX);
            const y = ahead(gesture.y, f.trueY - f.heldY, f.speedY);
            if (x !== gesture.x || y !== gesture.y) {
                gesture.x = x;
                gesture.y = y;
                this.arena.moved([
                    {
                        id: gesture.ids[0],
                        x,
                        y,
                        time: gesture.last
                    }
                ]);
            }
        }
        // A trackpad scroll whose fingers stop releases still, past the
        // velocity's stillness interval. A pinch releases 100 ms after its last
        // wheel, and a lift released the pan already. The release is never later
        // than the input that ends it (a press, the next gesture's first wheel).
        // The arena's clock only moves forward, so a later stamp would move that
        // input's times too.
        const end = gesture.last + gesture.endMs;
        const time = endTime == null ? end : Math.max(gesture.last, Math.min(end, endTime));
        this.arena.ended(gesture.kind === 'pan' ? [
            {
                id: gesture.ids[0],
                x: gesture.x,
                y: gesture.y,
                time
            }
        ] : this.pinchContacts(gesture, time));
    }
    /**
   * At a mouse or pen press, mark one that lands on selectable text: once it
   * moves, it is the browser's drag, and selects text.
   * Text whose hold does something is locked at this press already
   * (lockSelection), so it is not selectable text.
   */ noteSelectingPress(id, x, y, target) {
        if (!this.lockedBy.has(id) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$selectionLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startsOnSelectableText"])(this.doc, x, y, target)) {
            this.selectingContacts.add(id);
        }
    }
    /**
   * Undo a contact's selection locks, its press lock and its drag hold, at
   * once for a cancel, and forget its press's selection; idempotent. A
   * drag's hold keeps its last task after a lift (lockDragSelection).
   */ unlockSelection(id, isCancel = false) {
        const lock = this.lockedBy.get(id);
        lock?.({
            isCancel
        });
        // A press lock keeps `lockedBy` when the contact also has a drag hold.
        // Release the hold too.
        const hold = this.claimHolds.get(id);
        if (hold != null && hold !== lock) {
            hold({
                isCancel
            });
        }
        this.lockedBy.delete(id);
        this.claimHolds.delete(id);
        this.pressSelections.delete(id);
        this.selectingContacts.delete(id);
    }
    // --- Touch events ----------------------------------------------------------
    /**
   * Hold touches away from every participant while `gate(target)` answers
   * true. Returns the release. The input hold's held layers need no gate,
   * because the host asks `holdsTouch` for every touch.
   */ addTouchGate(gate) {
        this.touchGates.add(gate);
        return ()=>{
            this.touchGates.delete(gate);
        };
    }
    /**
   * @internal Whether a press consumer that keeps its press (a hold-repeat
   * control, `keepsTouch`) sits on the path from `target` up to `boundary`,
   * both included. Such a control keeps its long press its own. Its right
   * click and Shift+F10 still reach a context request around it
   * (contextRequest.ts).
   */ keepsPressBetween(target, boundary) {
        for(let node = target instanceof Node ? target : null; node != null; node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parentAcrossShadow"])(node)){
            if (!(node instanceof Element)) {
                continue;
            }
            const consumer = this.registry.get(node)?.consumer;
            if (consumer?.keepsTouch != null && consumer.isEnabled?.() !== false) {
                return true;
            }
            if (node === boundary) {
                break;
            }
        }
        return false;
    }
    /**
   * How many fingers are on the screen: the length of `touches` in the last
   * touch event the host's listeners heard (`touchstart`, `touchmove`,
   * `touchend`, `touchcancel`), whatever its target, so a finger on an
   * element with no recognizer counts too. 0 before any, and while no
   * listener is installed. A recognizer that must not begin under a second
   * finger reads it in `shouldBegin`.
   */ fingersDown() {
        return this.fingerTargets.length;
    }
    /** Whether this event is new to the host (and mark it handled). */ takeEvent(event) {
        if (this.processed.has(event)) {
            return false;
        }
        this.processed.add(event);
        return true;
    }
    onTouchStart = (event)=>{
        this.endWheel(eventTime(event, this.timing));
        this.noteFingersDown(event);
        // Where the host reads a finger from its pointer events (no ontouchstart,
        // as after touch emulation turns on), its Touch Events would track it twice.
        if (!this.usesTouchEvents || !this.takeEvent(event)) {
            return;
        }
        if (this.fingerTargets.length > 1) {
            this.failUnclaimedLoneFingerPans();
        }
        const time = eventTime(event, this.timing);
        const inputs = [];
        const untracked = [];
        const stale = [];
        // Locked once the arena knows which recognizers took each finger.
        const toLock = [];
        for (const touch of touchesOf(event.changedTouches)){
            if (touch.touchType === 'stylus') {
                continue;
            }
            // A finger number still tracked here began again: the touch it named
            // ended where no listener of ours could hear it.
            this.cancelledFingers.delete(touch.identifier);
            const previous = this.forgetFinger(touch.identifier);
            if (previous != null) {
                stale.push(previous);
            }
            const native = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(touch.target) ? landedOn(event, touch.target) : landedOn(event);
            const target = this.presentedTarget(native, touch.clientX, touch.clientY, event.timeStamp);
            const { recognizers, consumer, consumerElement } = this.participantsAt(target, 'touch');
            if (recognizers.length === 0 && consumer == null) {
                // Nothing here takes part: the touch stays the page's, but a
                // recognizer tracking another finger hears it began (a second
                // finger beside an open menu ends its press, spec:AST-094 FR28).
                untracked.push({
                    id: this.nextId++,
                    x: touch.clientX,
                    y: touch.clientY,
                    time,
                    pointerType: 'touch',
                    target
                });
                continue;
            }
            const id = this.nextId++;
            this.touchIds.set(touch.identifier, id);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$selectionLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locksSelectionFor"])('touch')) {
                toLock.push({
                    id,
                    target,
                    consumerElement
                });
            }
            // The finger's events keep going to what the engine hit. A disabled
            // participant can never claim, so a scroll never waits on it.
            this.watchTarget(touch.identifier, native, recognizers.some((recognizer)=>recognizer.isEnabled && claimsWhileMoving(recognizer)) || consumer?.keepsTouch != null && consumer.isEnabled?.() !== false, consumer != null && consumer.isEnabled?.() !== false || recognizers.some((recognizer)=>recognizer.isEnabled && recognizer.claimsTouches));
            this.lastFed.set(id, {
                x: touch.clientX,
                y: touch.clientY,
                time
            });
            this.pairTouch(id, {
                x: touch.clientX,
                y: touch.clientY,
                target: native
            });
            if (target !== native && target != null) {
                this.retargeted.set(id, {
                    x: touch.clientX,
                    y: touch.clientY,
                    target
                });
            }
            inputs.push({
                id,
                x: touch.clientX,
                y: touch.clientY,
                time,
                pointerType: 'touch',
                target,
                scroll: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$nativeScroll$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createNativeScrollProbe"])(target),
                recognizers,
                consumer
            });
        }
        if (stale.length > 0) {
            this.arena.cancelled(stale, time);
        }
        this.arena.began(inputs);
        for (const { id, target, consumerElement } of toLock){
            this.lockSelection(id, this.arena.participantsOf(id), target, this.arena.consumerOf(id) ?? null, consumerElement);
        }
        for (const input of untracked){
            this.arena.untrackedBegan(input);
        }
        // Again once the new fingers are delivered: a pinch's second finger may
        // have landed on another one-finger pan, the next row.
        if (this.fingerTargets.length > 1 && !this.isFingerClaimed()) {
            this.failUnclaimedLoneFingerPans();
        }
        // Stamped after the consumers judged the touch: the brake asks whether
        // an EARLIER finger is still driving a scroll.
        const landed = landedOn(event);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(landed)) {
            this.lastTouch = {
                target: landed,
                time
            };
        }
    };
    onTouchMove = (event)=>{
        this.noteFingersDown(event);
        // Where the host reads a finger from its pointer events (no ontouchstart,
        // as after touch emulation turns on), its Touch Events would track it twice.
        if (!this.usesTouchEvents || !this.takeEvent(event)) {
            return;
        }
        this.dropFingersNotDown(event);
        const time = eventTime(event, this.timing);
        const ids = [];
        const inputs = [];
        for (const touch of touchesOf(event.changedTouches)){
            const id = this.touchIds.get(touch.identifier);
            if (id == null) {
                continue;
            }
            ids.push(id);
            inputs.push({
                id,
                x: touch.clientX,
                y: touch.clientY,
                time
            });
        }
        if (inputs.length === 0) {
            return;
        }
        if (!event.cancelable) {
            // The browser no longer asks the page about these fingers. WebKit
            // stops asking when it takes the touch to pan (its pointercancel comes
            // with it); Chromium also stops after one unconsumed touchmove, even
            // when `touch-action` keeps it from panning the way the finger went (a
            // horizontal drag under pan-y). So a finger's FIRST uncancelable move
            // counts as the browser's claim only if the browser could pan along
            // the finger's main axis since touch-down; later ones add nothing, and
            // pointercancel or a scroll still report any real pan.
            const placed = new Map(inputs.map((input)=>[
                    input.id,
                    input
                ]));
            const taken = ids.filter((id)=>{
                const touch = this.arena.getTouch(id);
                if (touch == null || touch.takenByBrowser || this.arena.isClaimed(id) || touch.scroll?.allowsNativePan === false || this.judgedUncancelable.has(id)) {
                    return false;
                }
                this.judgedUncancelable.add(id);
                const input = placed.get(id);
                if (input == null || touch.scroll == null) {
                    return true;
                }
                const dx = input.x - touch.startX;
                const dy = input.y - touch.startY;
                return Math.abs(dx) >= Math.abs(dy) ? touch.scroll.canScroll(dx, 0) : touch.scroll.canScroll(0, dy);
            });
            if (taken.length > 0) {
                this.browserTook(taken, time);
            }
        }
        // A finger its pointer events sample is fed from there, never from here.
        this.feedMoves(inputs.filter((input)=>!this.pointerFed.has(input.id)));
    };
    /** The one blocking `touchmove` handler every claiming element shares. */ onBlockingTouchMove = (event)=>{
        this.cancelIfClaimed(event);
    };
    /**
   * Cancel a `touchmove` while a recognizer owns one of its fingers. A touch
   * no recognizer owns keeps its moves (`spec:AST-094` FR19): nothing is
   * cancelled before a recognizer begins, or for a touch it does not track,
   * unless a recognizer holds that finger already (a scroll-edge pan pulling
   * away from an edge every scroller under it is at; FR19, DEC-18).
   */ /**
   * Under `inputMode: 'pointer-events'` a finger comes from its pointer
   * events, so its touches carry no id of ours: the live finger it is, the
   * nearest pointer-fed finger on the same target. Its touchmoves can then
   * be cancelled once a recognizer claims it (`spec:AST-094` FR19, FR21).
   */ pointerFingerAt(touch) {
        let best = null;
        let bestDistance = Number.POSITIVE_INFINITY;
        for (const finger of this.arena.touches){
            if (finger.pointerType !== 'touch' || finger.phase === 'ended' || finger.phase === 'cancelled' || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(finger.target) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(touch.target) || // Along the flat tree, both ways: the finger's target can be inside
            // an open shadow root while its touches reach the host retargeted.
            !((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containsAlongFlatTree"])(finger.target, touch.target) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containsAlongFlatTree"])(touch.target, finger.target))) {
                continue;
            }
            const d = Math.hypot(finger.x - touch.clientX, finger.y - touch.clientY);
            if (d < bestDistance) {
                best = finger;
                bestDistance = d;
            }
        }
        return best?.id;
    }
    /**
   * Cancel the `touchend` of a finger a recognizer owned when it lifted
   * (`inputMode: 'pointer-events'`): its `pointerup` came first, at the same
   * place on the same target (`spec:AST-094` FR21). Records older than
   * CLAIMED_LIFT_MS are dropped first: their touchend never came.
   */ onClaimedTouchEnd = (event)=>{
        const end = event;
        const time = eventTime(end, this.timing);
        for(let i = this.claimedLifts.length - 1; i >= 0; i--){
            if (time - this.claimedLifts[i].time > CLAIMED_LIFT_MS) {
                this.claimedLifts.splice(i, 1);
            }
        }
        if (!end.cancelable || end.defaultPrevented) {
            return;
        }
        for (const touch of touchesOf(end.changedTouches)){
            // As its pointer landed: inside an open shadow root this listener
            // sees the touch retargeted to the host.
            const index = this.claimedLifts.findIndex((lift)=>isSamePlace(lift, {
                    x: touch.clientX,
                    y: touch.clientY,
                    target: landedOn(end, touch.target)
                }));
            if (index >= 0) {
                this.claimedLifts.splice(index, 1);
                if (this.claimedLifts.length === 0) {
                    this.clearClaimedLifts();
                }
                end.preventDefault();
                return;
            }
        }
    };
    cancelIfClaimed(event) {
        if (!event.cancelable || event.defaultPrevented) {
            return;
        }
        // Only the touches this move reports: another finger a recognizer owns
        // does not make this one its own.
        const moved = touchesOf(event.changedTouches);
        for (const touch of moved){
            const id = this.touchIds.get(touch.identifier) ?? (// Where fingers come from pointer events (inputMode 'pointer-events',
            // or 'auto' with no ontouchstart), the touch is matched to its pointer.
            this.usesTouchEvents ? undefined : this.pointerFingerAt(touch));
            if (id != null && (this.arena.isClaimed(id) || // A kept press keeps its finger under any pointer (FR11, DEC-21).
            this.arena.consumerOf(id)?.keepsTouch?.(id) === true || // A recognizer that holds the finger before it begins: a
            // scroll-edge pan pulling away from an edge (FR19, DEC-18), only
            // while this is the one finger on the screen: with a second one
            // down anywhere, even off the recognizer's element, the moves stay
            // the browser's, for its pinch (FR10).
            event.touches.length === 1 && this.arena.participantsOf(id).some((recognizer)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).keepsTouch(id)))) {
                event.preventDefault();
                return;
            }
        }
        if (hasStylusTouch(event)) {
            for (const id of this.pointerIds.values()){
                if (this.arena.isClaimed(id)) {
                    // A pen whose pointer a recognizer owns: its stylus touches too,
                    // never a finger no recognizer owns.
                    event.preventDefault();
                    return;
                }
            }
        }
    }
    onTouchEnd = (event)=>{
        this.releaseArmedPress();
        this.noteFingersDown(event);
        // Where the host reads a finger from its pointer events (no ontouchstart,
        // as after touch emulation turns on), its Touch Events would track it twice.
        if (!this.usesTouchEvents || !this.takeEvent(event)) {
            return;
        }
        this.dropFingersNotDown(event);
        const time = eventTime(event, this.timing);
        const inputs = [];
        const retargetedEnds = [];
        let isRefused = false;
        for (const touch of touchesOf(event.changedTouches)){
            if (this.cancelledFingers.delete(touch.identifier)) {
                isRefused = true;
                continue;
            }
            const tracked = this.touchIds.get(touch.identifier);
            const landed = tracked == null ? undefined : this.retargeted.get(tracked);
            const lift = tracked == null ? undefined : this.liftStamps.get(tracked);
            const id = this.forgetFinger(touch.identifier);
            if (id == null) {
                continue;
            }
            inputs.push({
                id,
                x: lift?.x ?? touch.clientX,
                y: lift?.y ?? touch.clientY,
                time: lift?.time ?? time
            });
            if (landed != null) {
                retargetedEnds.push({
                    id,
                    landed,
                    x: touch.clientX,
                    y: touch.clientY
                });
            }
        }
        // The arena takes the lifts in time order, so it never raises an earlier
        // lift to a later one.
        inputs.sort((a, b)=>a.time - b.time);
        // The lift is when momentum starts: the clock the brake wants most.
        const landed = landedOn(event);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(landed)) {
            this.lastTouch = {
                target: landed,
                time: inputs.length > 0 ? Math.max(...inputs.map((i)=>i.time)) : time
            };
        }
        const dispositions = inputs.length > 0 ? this.arena.ended(inputs) : new Map();
        let cancelsClick = isRefused || needsSuppression(dispositions);
        // A tap sent to what is drawn: the engine's click would hit the layout
        // position, so it is cancelled and the tap clicks what it touched.
        for (const end of retargetedEnds){
            if (this.clickRetargetedTap(end.landed, end, dispositions.get(end.id), 'touch')) {
                cancelsClick = true;
            }
        }
        if (cancelsClick) {
            if (event.cancelable) {
                event.preventDefault();
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["armClickGuard"])(this.doc, {
                takesLateMouse: true
            });
        }
    };
    /**
   * Clicks what a retargeted contact touched if it ended as a tap the
   * engine would click: nothing claimed it, the browser did not take it
   * (a taken contact is no longer retargeted), and the finger stayed within
   * a tap's movement. Returns whether it clicked.
   */ clickRetargetedTap(landed, end, disposition, pointerType) {
        if (landed == null || disposition !== 'allow') {
            return false;
        }
        const moved = Math.hypot(end.x - landed.x, end.y - landed.y);
        if (moved > __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIKIT_TAP"].allowableMovement.value) {
            return false;
        }
        this.clickRetargeted(landed.target, end.x, end.y, pointerType);
        return true;
    }
    onTouchCancel = (event)=>{
        this.releaseArmedPress();
        this.noteFingersDown(event);
        // Where the host reads a finger from its pointer events (no ontouchstart,
        // as after touch emulation turns on), its Touch Events would track it twice.
        if (!this.usesTouchEvents || !this.takeEvent(event)) {
            return;
        }
        const listed = touchesOf(event.changedTouches);
        // A cancel that names no finger is the system taking them all.
        const identifiers = listed.length > 0 ? listed.map((touch)=>touch.identifier) : [
            ...this.touchIds.keys()
        ];
        if (listed.length === 0) {
            this.cancelledFingers.clear();
        }
        for (const identifier of identifiers){
            this.cancelledFingers.delete(identifier);
        }
        const ids = [];
        for (const identifier of identifiers){
            const id = this.forgetFinger(identifier);
            if (id != null) {
                ids.push(id);
            }
        }
        if (ids.length > 0) {
            this.arena.cancelled(ids, eventTime(event, this.timing));
        }
    };
    /** The target's own listeners, for a target that left the document. */ onTargetTouchMove = (event)=>{
        this.onTouchMove(event);
        this.cancelIfClaimed(event);
    };
    /** The same for a finger nothing could claim while it moves: never blocks. */ onTargetTouchMovePassive = (event)=>{
        this.onTouchMove(event);
    };
    onTargetTouchEnd = (event)=>{
        this.onTouchEnd(event);
    };
    /** The same, registered passively for a touch only watchers follow. */ onTargetTouchEndPassive = (event)=>{
        this.onTouchEnd(event);
    };
    onTargetTouchCancel = (event)=>{
        this.onTouchCancel(event);
    };
    /**
   * Cancel tracked fingers the event says are no longer down. `touches`
   * lists every finger on the screen; one missing from it (and not lifting
   * in this very event) ended where we could not see it.
   */ dropFingersNotDown(event) {
        if (event.touches == null || this.touchIds.size === 0 && this.cancelledFingers.size === 0) {
            return;
        }
        const down = new Set();
        for (const touch of touchesOf(event.touches)){
            down.add(touch.identifier);
        }
        for (const touch of touchesOf(event.changedTouches)){
            down.add(touch.identifier);
        }
        for (const identifier of [
            ...this.cancelledFingers
        ]){
            if (!down.has(identifier)) {
                this.cancelledFingers.delete(identifier);
            }
        }
        const gone = [
            ...this.touchIds.keys()
        ].filter((identifier)=>!down.has(identifier));
        const ids = [];
        for (const identifier of gone){
            const id = this.forgetFinger(identifier);
            if (id != null) {
                ids.push(id);
            }
        }
        if (ids.length > 0) {
            this.arena.cancelled(ids, eventTime(event, this.timing));
        }
    }
    watchTarget(identifier, target, isBlocking, isClaiming) {
        if (target == null || typeof target.addEventListener !== 'function') {
            return;
        }
        this.touchTargets.set(identifier, target);
        const state = this.watched.get(target);
        if (state == null) {
            this.watched.set(target, {
                count: 1,
                blocking: isBlocking ? 1 : 0,
                claiming: isClaiming ? 1 : 0
            });
            if (isBlocking) {
                this.blockingFingers.add(identifier);
            }
            if (isClaiming) {
                this.claimingFingers.add(identifier);
            }
            target.addEventListener('touchmove', isBlocking ? this.onTargetTouchMove : this.onTargetTouchMovePassive, {
                passive: !isBlocking
            });
            target.addEventListener('touchend', isClaiming ? this.onTargetTouchEnd : this.onTargetTouchEndPassive, {
                passive: !isClaiming
            });
            target.addEventListener('touchcancel', this.onTargetTouchCancel, {
                passive: true
            });
            return;
        }
        const wasBlocking = state.blocking > 0;
        const wasClaiming = state.claiming > 0;
        state.count += 1;
        if (isBlocking) {
            state.blocking += 1;
            this.blockingFingers.add(identifier);
        }
        if (isClaiming) {
            state.claiming += 1;
            this.claimingFingers.add(identifier);
        }
        this.swapTargetTouchMove(target, wasBlocking, state.blocking > 0);
        this.swapTargetTouchEnd(target, wasClaiming, state.claiming > 0);
    }
    unwatchTarget(identifier) {
        const target = this.touchTargets.get(identifier);
        if (target == null) {
            return;
        }
        this.touchTargets.delete(identifier);
        const state = this.watched.get(target);
        if (state == null) {
            return;
        }
        const wasBlocking = state.blocking > 0;
        const wasClaiming = state.claiming > 0;
        state.count -= 1;
        if (this.blockingFingers.delete(identifier)) {
            state.blocking -= 1;
        }
        if (this.claimingFingers.delete(identifier)) {
            state.claiming -= 1;
        }
        if (state.count > 0) {
            this.swapTargetTouchMove(target, wasBlocking, state.blocking > 0);
            this.swapTargetTouchEnd(target, wasClaiming, state.claiming > 0);
            return;
        }
        this.watched.delete(target);
        target.removeEventListener('touchmove', wasBlocking ? this.onTargetTouchMove : this.onTargetTouchMovePassive);
        target.removeEventListener('touchend', wasClaiming ? this.onTargetTouchEnd : this.onTargetTouchEndPassive);
        target.removeEventListener('touchcancel', this.onTargetTouchCancel);
    }
    /**
   * Keeps one `touchmove` listener on a watched target: the blocking one
   * while a finger on it could be claimed as it moves, a passive one
   * otherwise, so a scroll starting there never waits on the main thread
   * (`spec:AST-094` FR19).
   */ swapTargetTouchMove(target, wasBlocking, isBlocking) {
        if (wasBlocking === isBlocking) {
            return;
        }
        target.removeEventListener('touchmove', wasBlocking ? this.onTargetTouchMove : this.onTargetTouchMovePassive);
        target.addEventListener('touchmove', isBlocking ? this.onTargetTouchMove : this.onTargetTouchMovePassive, {
            passive: !isBlocking
        });
    }
    /**
   * Keeps one `touchend` listener on a watched target: the cancelable one
   * while a finger on it has a participant that could claim (a lift whose
   * click must not happen cancels its `touchend`), a passive one while only
   * watchers follow its fingers (`spec:AST-094` FR20).
   */ swapTargetTouchEnd(target, wasClaiming, isClaiming) {
        if (wasClaiming === isClaiming) {
            return;
        }
        target.removeEventListener('touchend', wasClaiming ? this.onTargetTouchEnd : this.onTargetTouchEndPassive);
        target.addEventListener('touchend', isClaiming ? this.onTargetTouchEnd : this.onTargetTouchEndPassive, {
            passive: !isClaiming
        });
    }
    /** Stop tracking a finger by its Touch.identifier; returns its arena id. */ forgetFinger(identifier) {
        const id = this.touchIds.get(identifier);
        this.touchIds.delete(identifier);
        this.unwatchTarget(identifier);
        if (id != null) {
            this.forgetContact(id);
        }
        return id;
    }
    pairTouch(id, place) {
        for (const [pointerId, pending] of this.pendingPointers){
            if (isSamePlace(pending, place)) {
                this.pendingPointers.delete(pointerId);
                this.fingerPointers.set(pointerId, id);
                this.pointerFed.add(id);
                return;
            }
        }
        this.unpairedTouches.set(id, place);
    }
    pairPointer(pointerId, place) {
        for (const [id, unpaired] of this.unpairedTouches){
            if (isSamePlace(unpaired, place)) {
                this.unpairedTouches.delete(id);
                this.fingerPointers.set(pointerId, id);
                this.pointerFed.add(id);
                return;
            }
        }
        this.pendingPointers.set(pointerId, place);
    }
    /** Feed moves from a contact's sampling channel, in time order. */ feedMoves(inputs) {
        const fresh = inputs.filter((input)=>{
            const last = this.lastFed.get(input.id);
            if (last != null && input.time < last.time) {
                return false;
            }
            this.lastFed.set(input.id, {
                x: input.x,
                y: input.y,
                time: input.time
            });
            return true;
        });
        if (fresh.length > 0) {
            this.arena.moved(fresh);
        }
    }
    /** Forget a contact's pairing and echo state. */ forgetContact(id) {
        this.unlockSelection(id);
        this.retargeted.delete(id);
        this.lastFed.delete(id);
        this.pointerFed.delete(id);
        this.liftStamps.delete(id);
        this.judgedUncancelable.delete(id);
        this.unpairedTouches.delete(id);
        for (const [pointerId, paired] of this.fingerPointers){
            if (paired === id) {
                this.fingerPointers.delete(pointerId);
            }
        }
    }
    // --- Pointer events --------------------------------------------------------
    onPointerDown = (event)=>{
        this.endWheel(eventTime(event, this.timing));
        // A new press: whatever click is still owed to the last one is not this.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disarmClickGuard"])(this.doc);
        if (!isPointerKind(event.pointerType)) {
            return;
        }
        this.dropCancelledLifts(event);
        if (event.pointerType === 'touch' && this.usesTouchEvents) {
            this.pairPointer(event.pointerId, {
                x: event.clientX,
                y: event.clientY,
                target: landedOn(event)
            });
            return;
        }
        if (event.pointerType === 'touch' && event.isPrimary === false) {
            // Fingers from pointer events: a second one, wherever either lands,
            // leaves the two to the page's pinch, as onTouchStart does. A finger
            // that is not the primary pointer is a second finger, even where the
            // host never heard the first.
            this.failUnclaimedLoneFingerPans();
        }
        // A right click, a pen's barrel button, or a ctrl-click on macOS (its
        // context click) starts no press (FR43).
        if (event.pointerType !== 'touch' && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$primaryClick$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPrimaryClick"])(event)) {
            return;
        }
        const landed = landedOn(event);
        const target = this.presentedTarget(landed, event.clientX, event.clientY, event.timeStamp);
        const { recognizers, consumer, consumerElement } = this.participantsAt(target, event.pointerType);
        if (recognizers.length === 0 && consumer == null) {
            return;
        }
        const id = this.nextId++;
        this.pointerIds.set(event.pointerId, id);
        this.pointerKinds.set(event.pointerId, event.pointerType);
        if (target !== landed && target != null) {
            this.retargeted.set(id, {
                x: event.clientX,
                y: event.clientY,
                target
            });
        }
        // Before the arena admits it: a press a group claims at its own
        // pointerdown keeps the selection the page has now.
        if (event.pointerType !== 'touch') {
            this.pressSelections.set(id, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$selectionLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["selectionRangesOf"])(this.doc.defaultView));
        }
        this.arena.began([
            {
                id,
                x: event.clientX,
                y: event.clientY,
                time: eventTime(event, this.timing),
                pointerType: event.pointerType,
                target,
                scroll: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$nativeScroll$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createNativeScrollProbe"])(target),
                recognizers,
                consumer
            }
        ]);
        if (event.pointerType === 'touch' && event.isPrimary === false && !this.isFingerClaimed()) {
            // Again once this finger is delivered: it may have landed on another
            // one-finger pan.
            this.failUnclaimedLoneFingerPans();
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$selectionLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locksSelectionFor"])(event.pointerType)) {
            // The presented target: what the pen is on, where the engine's own
            // hit test may still see the motion's start.
            this.lockSelection(id, this.arena.participantsOf(id), target, this.arena.consumerOf(id) ?? null, consumerElement);
        }
        if (event.pointerType !== 'touch') {
            // The engine's own hit: the text its caret query and a drag select.
            this.noteSelectingPress(id, event.clientX, event.clientY, landed);
        }
    };
    onPointerMove = (event)=>{
        if (event.pointerType === 'touch' && this.usesTouchEvents) {
            const id = this.fingerPointers.get(event.pointerId);
            if (id != null) {
                this.feedMoves([
                    {
                        id,
                        x: event.clientX,
                        y: event.clientY,
                        time: eventTime(event, this.timing),
                        history: coalescedHistory(event, this.timing)
                    }
                ]);
            }
            return;
        }
        const id = this.pointerIds.get(event.pointerId);
        if (id != null) {
            if (event.pointerType === 'pen') {
                this.notePenDrift(id, event.clientX, event.clientY, eventTime(event, this.timing));
            }
            this.arena.moved([
                {
                    id,
                    x: event.clientX,
                    y: event.clientY,
                    time: eventTime(event, this.timing),
                    history: coalescedHistory(event, this.timing)
                }
            ]);
            return;
        }
    };
    onPointerUp = (event)=>{
        this.releaseArmedPress();
        if (event.pointerType === 'touch' && this.usesTouchEvents) {
            // The lift itself is the touchend's: it alone can cancel the click. Its
            // place and time are this event's, where the finger's moves were read.
            const id = this.fingerPointers.get(event.pointerId);
            if (id != null && this.pointerFed.has(id)) {
                this.liftStamps.set(id, {
                    x: event.clientX,
                    y: event.clientY,
                    time: eventTime(event, this.timing)
                });
            }
            this.fingerPointers.delete(event.pointerId);
            this.pendingPointers.delete(event.pointerId);
            return;
        }
        const id = this.pointerIds.get(event.pointerId);
        if (id == null) {
            // A contact the lost focus cancelled: its lift clicks nothing.
            if (this.cancelledPointers.delete(event.pointerId)) {
                this.refuseCancelledLift(event);
            }
            return;
        }
        this.pointerIds.delete(event.pointerId);
        this.pointerKinds.delete(event.pointerId);
        const hold = this.claimHolds.get(id);
        this.unlockSelection(id);
        const target = this.arena.getTouch(id)?.target;
        const isPenHold = event.pointerType === 'pen' && this.isPenHold(id, eventTime(event, this.timing));
        this.driftedPens.delete(id);
        const dispositions = this.arena.ended([
            {
                id,
                x: event.clientX,
                y: event.clientY,
                time: eventTime(event, this.timing)
            }
        ]);
        // A selection the lift's own handlers made stays, as a click's does.
        hold?.keepLiftSelection();
        if (isPenHold) {
            this.lastPenLift = {
                target,
                time: this.arena.now()
            };
        }
        // A retargeted tap's own click arms the click guard for the engine's.
        const landed = this.retargeted.get(id);
        this.retargeted.delete(id);
        const clicked = this.clickRetargetedTap(landed, {
            x: event.clientX,
            y: event.clientY
        }, dispositions.get(id), event.pointerType);
        if (!clicked && needsSuppression(dispositions)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["armClickGuard"])(this.doc, {
                takesLateMouse: event.pointerType === 'touch'
            });
        }
        // A finger read from its pointer events: the touchend that follows the
        // lift is cancelled when a gesture took it, which the lift itself may
        // decide (a hold whose time came with it), or when its tap was retargeted
        // (FR21).
        if (event.pointerType === 'touch' && (clicked || needsSuppression(dispositions))) {
            this.noteClaimedLift(event);
        }
    };
    /**
   * Note a claimed finger's lift, so the `touchend` that follows its
   * `pointerup` is cancelled (FR21). Only where an element's listener can take
   * that touchend: elsewhere none comes, and the note would hold its node for
   * nothing. At most CLAIMED_LIFT_LIMIT wait, the oldest going first, and one
   * timer drops each once CLAIMED_LIFT_MS has passed (FR24); the host's
   * uninstall keeps them, as it can run in the microtask after the pointerup,
   * before the touchend that comes later in the same task.
   */ noteClaimedLift(event) {
        if (!this.readsFingersFromPointerEvents() || !(this.isCoarse || this.sendsTouchEvents())) {
            return;
        }
        this.claimedLifts.push({
            x: event.clientX,
            y: event.clientY,
            target: landedOn(event),
            time: eventTime(event, this.timing)
        });
        if (this.claimedLifts.length > CLAIMED_LIFT_LIMIT) {
            this.claimedLifts.shift();
        }
        this.armClaimedLiftTimer();
    }
    /** Arm the one timer for the oldest claimed lift still waiting. */ armClaimedLiftTimer() {
        if (this.claimedLiftTimer != null || this.claimedLifts.length === 0) {
            return;
        }
        const due = this.claimedLifts[0].time + CLAIMED_LIFT_MS;
        this.claimedLiftTimer = this.clock.setTimeout(()=>{
            this.claimedLiftTimer = null;
            const now = this.clock.now();
            for(let i = this.claimedLifts.length - 1; i >= 0; i--){
                if (now - this.claimedLifts[i].time >= CLAIMED_LIFT_MS) {
                    this.claimedLifts.splice(i, 1);
                }
            }
            this.armClaimedLiftTimer();
        }, Math.max(0, due - this.clock.now()));
    }
    /** Drop every claimed lift and its timer, once the last one is taken. */ clearClaimedLifts() {
        this.claimedLifts.length = 0;
        if (this.claimedLiftTimer != null) {
            this.clock.clearTimeout(this.claimedLiftTimer);
            this.claimedLiftTimer = null;
        }
    }
    onPointerCancel = (event)=>{
        this.releaseArmedPress();
        if (event.pointerType === 'touch' && this.usesTouchEvents) {
            const id = this.fingerPointers.get(event.pointerId) ?? this.touchForCancelledPointer(event);
            this.fingerPointers.delete(event.pointerId);
            this.pendingPointers.delete(event.pointerId);
            if (id != null) {
                // The pointer channel ends here while the finger keeps moving (the
                // browser scrolls with it): its touch events, now the only channel,
                // sample it, as a watcher following the scroll to the lift needs.
                this.pointerFed.delete(id);
                this.browserTook([
                    id
                ], eventTime(event, this.timing));
            }
            return;
        }
        // A contact that ends in a cancel owes no refused lift.
        this.cancelledPointers.delete(event.pointerId);
        const id = this.pointerIds.get(event.pointerId);
        if (id != null) {
            this.pointerIds.delete(event.pointerId);
            this.pointerKinds.delete(event.pointerId);
            this.unlockSelection(id, true);
            this.retargeted.delete(id);
            const target = this.arena.getTouch(id)?.target;
            const isPenHold = event.pointerType === 'pen' && this.isPenHold(id, eventTime(event, this.timing));
            this.driftedPens.delete(id);
            this.arena.cancelled([
                id
            ], eventTime(event, this.timing));
            if (isPenHold) {
                this.lastPenLift = {
                    target,
                    time: this.arena.now()
                };
            }
        }
    };
    /**
   * Whether a pen contact is a hold: it stays within the long press's
   * tolerance for its duration. Only such a hold fires the platform's own
   * menu event, so the host notes no other pen's lift.
   */ isPenHold(id, time) {
        const touch = this.arena.getTouch(id);
        return touch != null && !this.driftedPens.has(id) && time - touch.startTime >= __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIKIT_LONG_PRESS"].minimumPressDuration.value;
    }
    /**
   * A pen contact that leaves the long press's tolerance before its duration
   * is no hold, so its lift arms no menu refusal.
   */ notePenDrift(id, x, y, time) {
        const touch = this.arena.getTouch(id);
        if (touch != null && time - touch.startTime < __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIKIT_LONG_PRESS"].minimumPressDuration.value && Math.hypot(x - touch.startX, y - touch.startY) > __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIKIT_LONG_PRESS"].allowableMovement.value) {
            this.driftedPens.add(id);
        }
    }
    /**
   * Which live finger a touch `pointercancel` is about. The pointer keeps
   * the target the finger landed on (implicit capture), as the Touch does;
   * among fingers on that target, the nearest. WebKit also numbers the
   * pointer like the Touch, which settles what position cannot.
   */ touchForCancelledPointer(event) {
        let best = null;
        let bestDistance = Number.POSITIVE_INFINITY;
        for (const touch of this.arena.touches){
            if (touch.pointerType !== 'touch' || touch.phase === 'ended' || touch.phase === 'cancelled' || touch.target !== landedOn(event)) {
                continue;
            }
            const d = Math.hypot(touch.x - event.clientX, touch.y - event.clientY);
            if (d < bestDistance) {
                best = touch;
                bestDistance = d;
            }
        }
        if (best != null) {
            return best.id;
        }
        return this.touchIds.get(event.pointerId) ?? null;
    }
    // --- Clicks, menus, scrolls, focus -----------------------------------------
    replayClick(touch, allowed) {
        if (!allowed) {
            return;
        }
        // The browser's own click was swallowed while recognizers decided; they
        // all failed, so the click the touch earned is delivered now.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disarmClickGuard"])(this.doc);
        const target = touch.target;
        const view = this.doc.defaultView;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(target) || !target.isConnected || view == null) {
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withoutClickGuard"])(()=>target.dispatchEvent(new view.MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                composed: true,
                detail: 1,
                clientX: touch.x,
                clientY: touch.y
            })));
    }
    onContextMenu = (event)=>{
        for (const touch of this.arena.touches){
            if (this.arena.isClaimed(touch.id) || this.arena.consumerOf(touch.id)?.holdsContextMenu?.(touch.id) === true) {
                event.preventDefault();
                return;
            }
        }
    };
    /**
   * A recognizer is about to scroll `scroller` itself (a menu's edge
   * autoscroll, spec:AST-094 FR30): the scroll that write fires is not a
   * finger's and not the browser taking one. It passes until the end of the
   * next frame, when that event has fired; a real pan in that window still
   * reports itself through pointercancel or touchcancel.
   */ ownScroll(scroller) {
        const call = ++this.ownScrollCalls;
        this.ownedScrolls.set(scroller, call);
        const view = this.doc.defaultView;
        if (view == null) {
            return;
        }
        // A newer call keeps it until its own frame has passed: its frames
        // replace the older call's.
        this.ownScrollFrames.get(scroller)?.();
        let inner = 0;
        const outer = view.requestAnimationFrame(()=>{
            inner = view.requestAnimationFrame(()=>{
                this.ownScrollFrames.delete(scroller);
                if (this.ownedScrolls.get(scroller) === call) {
                    this.ownedScrolls.delete(scroller);
                }
            });
        });
        this.ownScrollFrames.set(scroller, ()=>{
            view.cancelAnimationFrame(outer);
            if (inner !== 0) {
                view.cancelAnimationFrame(inner);
            }
        });
    }
    /**
   * @internal Whether a recognizer is scrolling `scroller` itself now
   * (ownScroll): that scroll is not a finger's (fingerScroll.ts reads it).
   */ isOwnScroll(scroller) {
        return this.ownedScrolls.has(scroller);
    }
    onScroll = (event)=>{
        const time = eventTime(event, this.timing);
        const scroller = event.target === this.doc ? this.doc : event.target;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(scroller) || this.ownedScrolls.has(scroller)) {
            return;
        }
        // A scroll is a finger's only if that finger was inside this scroller,
        // recently; anything else is the program moving something.
        const last = this.lastTouch;
        if (last != null && time - last.time < __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIKIT_PRESS"].momentumMemory.value && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containsAlongFlatTree"])(scroller, last.target)) {
            this.lastScroll = {
                scroller,
                time
            };
        }
        const taken = [];
        for (const touch of this.arena.touches){
            if (touch.takenByBrowser || touch.phase === 'ended' || touch.phase === 'cancelled' || touch.pointerType !== 'touch' || this.arena.isClaimed(touch.id)) {
                continue;
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(touch.target) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containsAlongFlatTree"])(scroller, touch.target) && // Only a pan this finger drove takes the touch: the browser starts
            // one only once the finger has travelled the take distance
            // (spec:AST-094 FR20). A scroll under a finger that has not
            // (scrollIntoView, a transcript pinned to its end, scroll
            // anchoring) is the page's own: the touch, and the click it earns,
            // stay where they are.
            Math.hypot(touch.x - touch.startX, touch.y - touch.startY) >= __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIKIT_PRESS"].slop.value) {
                taken.push(touch.id);
            }
        }
        if (taken.length > 0) {
            this.browserTook(taken, time);
        }
    };
    noteFingersDown(event) {
        const fingers = [];
        for (const touch of touchesOf(event.touches)){
            if (touch.touchType !== 'stylus') {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(touch.target)) {
                    fingers.push(touch.target);
                }
            }
        }
        this.fingerTargets = fingers;
        for (const listener of [
            ...this.fingerListeners
        ]){
            listener();
        }
    }
    /**
   * A second finger landed somewhere (wherever: often on a plain row): a
   * pan that takes one finger only and has not claimed its touch fails, so
   * the two fingers stay the browser's pinch (WCAG 1.4.4) instead of the
   * pan claiming them midway. A drag a recognizer has claimed keeps its
   * finger: a second finger never cancels or redirects it (`spec:AST-094`
   * FR10), and no claim is released here.
   */ failUnclaimedLoneFingerPans() {
        for (const recognizer of [
            ...this.arena.involvedRecognizers
        ]){
            if (isPanRecognizer(recognizer) && recognizer.state === 'possible' && recognizer.maximumNumberOfTouches === 1 && recognizer.trackedTouches.length > 0 && recognizer.trackedTouches.every((touch)=>touch.pointerType === 'touch' && !this.arena.isClaimed(touch.id))) {
                recognizer.cancel();
            }
        }
    }
    /** Whether a finger's drag is claimed: then two fingers make no pinch. */ isFingerClaimed() {
        return this.arena.touches.some((touch)=>touch.pointerType === 'touch' && this.arena.isClaimed(touch.id));
    }
    onVisibilityChange = ()=>{
        if (this.doc.visibilityState === 'hidden') {
            this.cancelEverything(this.arena.now());
            // As at a blur: an armed press's page listeners go once nothing is left
            // to hear.
            this.releaseArmedPress();
        }
    };
    onBlur = ()=>{
        this.cancelEverything(this.arena.now());
        // An armed press's page listeners go once nothing is left to hear. A pen
        // or a pointer-read finger the blur cancelled still owes its lift.
        this.releaseArmedPress();
    };
    /** Whether the browser sends Touch Events at all (`ontouchstart`). */ sendsTouchEvents() {
        const view = this.doc.defaultView;
        return view != null && 'ontouchstart' in view;
    }
    /**
   * Whether the host reads fingers from their pointer events: Pointer Events
   * input, or a window with no `ontouchstart` (touch emulation turned on
   * after load), as the move path does.
   */ readsFingersFromPointerEvents() {
        const view = this.doc.defaultView;
        return this.inputMode === 'pointer-events' || view != null && !('ontouchstart' in view);
    }
    /**
   * The lift of a contact the lost focus cancelled: its click is refused,
   * and a finger's touchend after it is cancelled.
   */ refuseCancelledLift(event) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["armClickGuard"])(this.doc, {
            takesLateMouse: event.pointerType === 'touch'
        });
        if (event.pointerType === 'touch') {
            // Noted as a claimed lift is: capped, and gone after its time.
            this.noteClaimedLift(event);
        }
    }
    /** The app lost focus: UIKit cancels every touch in flight. */ cancelEverything(time) {
        // The browser may keep a pen or a pointer-read finger down: its lift must
        // not click. A mouse button held through the blur keeps its click.
        for (const [pointerId, kind] of this.pointerKinds){
            if (kind !== 'mouse') {
                this.cancelledPointers.set(pointerId, kind);
            }
        }
        const ids = [
            ...this.pointerIds.values()
        ];
        for (const id of ids){
            this.unlockSelection(id, true);
        }
        for (const identifier of [
            ...this.touchIds.keys()
        ]){
            // The browser may keep the touch alive: its lift must not click.
            this.cancelledFingers.add(identifier);
            const id = this.forgetFinger(identifier);
            if (id != null) {
                ids.push(id);
            }
        }
        this.pointerIds.clear();
        this.pointerKinds.clear();
        this.driftedPens.clear();
        this.retargeted.clear();
        this.fingerPointers.clear();
        this.pendingPointers.clear();
        this.unpairedTouches.clear();
        this.lastFed.clear();
        this.pointerFed.clear();
        this.liftStamps.clear();
        // A trackpad pan a recognizer still drives is cancelled with them.
        ids.push(...this.dropDrivenWheel());
        if (ids.length > 0) {
            this.arena.cancelled(ids, time);
        }
    }
}
function needsSuppression(dispositions) {
    for (const disposition of dispositions.values()){
        if (disposition !== 'allow') {
            return true;
        }
    }
    return false;
}
function coalescedHistory(event, timing) {
    if (typeof event.getCoalescedEvents !== 'function') {
        return [];
    }
    const coalesced = event.getCoalescedEvents();
    return coalesced.slice(0, -1).map((sample)=>({
            x: sample.clientX,
            y: sample.clientY,
            time: eventTime(sample, timing)
        }));
}
function getGestureHost(doc) {
    let host = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$hostRegistry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gestureHosts"].get(doc);
    if (host == null) {
        host = new GestureHost(doc);
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$hostRegistry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gestureHosts"].set(doc, host);
    }
    return host;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/GestureRecognizer.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_NATIVE_TOUCH",
    ()=>ALL_NATIVE_TOUCH,
    "GestureRecognizer",
    ()=>GestureRecognizer,
    "MANIPULATION",
    ()=>MANIPULATION,
    "isActive",
    ()=>isActive,
    "isTerminal",
    ()=>isTerminal,
    "isTransitionAllowed",
    ()=>isTransitionAllowed
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file GestureRecognizer.ts
 * @input Touches delivered by a GestureArena
 * @output Exports GestureRecognizer, the base every recognizer extends
 *   (UIGestureRecognizer), and its options and listener types
 * @position Core of packages/core/src/gestures: subclasses interpret touches
 *   and request state changes; the arena decides whether a change is allowed
 *   (require-to-fail, exclusivity, should-begin) and applies it
 *
 * The state machine is UIKit's:
 *
 *   possible ─► began ─► changed* ─► ended | cancelled     (continuous)
 *   possible ─► ended                                       (discrete: "recognized")
 *   possible ─► failed
 *
 * A recognizer in a terminal state ignores the touches it still has and
 * returns to `possible` (its `reset()` runs) once all of them have ended,
 * exactly as UIKit resets a recognizer before the next touch sequence.
 *
 * Listeners (UIKit's target-action) fire for `began`, `changed`, `ended` and
 * `cancelled`, never for `failed`. They run synchronously inside the input
 * event, so a listener that writes a transform writes it in the same frame
 * as the input, with no React render in between.
 *
 * SYNC: When modified, update GestureArena.ts, recognizerInternals.ts and
 * README.md.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/types.js [app-ssr] (ecmascript)");
;
/**
 * Turns text selection and the touch callout off on `elements` (and on a
 * non-text input `target` inside one) for one held press; returns the undo.
 * utils/selectionLock.ts's `lockSelection` is the one implementation.
 */ const ACTION_STATES = new Set([
    'began',
    'changed',
    'ended',
    'cancelled'
]);
/** Transitions UIKit allows; anything else is a recognizer bug. */ const ALLOWED = {
    possible: [
        'began',
        'ended',
        'failed'
    ],
    began: [
        'changed',
        'ended',
        'cancelled'
    ],
    changed: [
        'changed',
        'ended',
        'cancelled'
    ],
    ended: [
        'possible'
    ],
    cancelled: [
        'possible'
    ],
    failed: [
        'possible'
    ]
};
function isTransitionAllowed(from, to) {
    return ALLOWED[from].includes(to);
}
function isTerminal(state) {
    return state === 'ended' || state === 'cancelled' || state === 'failed';
}
function isActive(state) {
    return state === 'began' || state === 'changed';
}
const ALL_NATIVE_TOUCH = {
    panX: true,
    panY: true,
    pinchZoom: true,
    doubleTapZoom: true
};
const MANIPULATION = {
    panX: true,
    panY: true,
    pinchZoom: true,
    doubleTapZoom: false
};
/**
 * What a recognizer is. The gesture code tells the family apart by it, never
 * by `instanceof` (`architecture:react-component-runtime` INV13); a
 * screen-edge pan is its own kind, though it is built on the pan.
 */ let nextRecognizerId = 1;
class GestureRecognizer {
    /** What this recognizer is (see RecognizerKind). */ /** Stable id, for ordering and debugging. */ id = nextRecognizerId++;
    /** See GestureRecognizerOptions.selectionLock. */ /** See GestureRecognizerOptions.allowedScrollTypes. */ /**
   * The element (or any object) the recognizer is attached to. The DOM host
   * sets it; the arena treats it as opaque.
   */ view = null;
    /** @internal The arena delivering touches to this recognizer, if any. */ arena = null;
    /** @internal A recognition waiting for a failure requirement. */ pending = null;
    /**
   * The delegate functions. Typed against the base so a subclass stays
   * assignable to GestureRecognizer; each is only ever called with `this`.
   */ stateValue = 'possible';
    // Typed against the base so a subclass stays assignable to
    // GestureRecognizer; every listener is only ever called with `this`.
    listeners = new Set();
    transitionListeners = new Set();
    failureRequirements = new Set();
    simultaneousWith = new Set();
    /** Touches currently tracked, by id. */ touches = new Map();
    /** @internal Every touch id received since the last reset. */ seenTouchIds = new Set();
    lastLocation = {
        x: 0,
        y: 0
    };
    constructor(options = {}){
        this.options = options;
        this.name = options.name ?? this.constructor.name;
        this.isEnabled = options.isEnabled ?? true;
        this.cancelsTouchesInView = options.cancelsTouchesInView ?? true;
        this.selectionLock = options.selectionLock ?? null;
        this.delaysTouchesBegan = options.delaysTouchesBegan ?? false;
        this.delaysTouchesEnded = options.delaysTouchesEnded ?? true;
        this.allowedPointerTypes = options.allowedPointerTypes == null ? null : new Set(options.allowedPointerTypes);
        this.allowedScrollTypes = new Set(options.allowedScrollTypes ?? this.defaultScrollTypes);
        this.requiresExclusiveTouchType = options.requiresExclusiveTouchType ?? true;
    }
    /** Discrete recognizers go from `possible` straight to `ended`. */ get isDiscrete() {
        return false;
    }
    /**
   * Whether recognizing takes the touches from the browser: while a claiming
   * recognizer owns a touch, the host cancels the browser's pan and zoom for
   * it. Every touch recognizer claims; hover has no touches to claim.
   */ get claimsTouches() {
        return this.options.claimsTouches ?? true;
    }
    get state() {
        return this.stateValue;
    }
    /**
   * What the browser may still do natively on this recognizer's view: the
   * host intersects these across a view's recognizers into its
   * `touch-action`. A recognizer that takes no touches constrains nothing.
   */ get nativeTouchBehavior() {
        return ALL_NATIVE_TOUCH;
    }
    /** @internal Whether this recognizer listens to touch at all. */ get acceptsTouchInput() {
        return this.allowedPointerTypes == null || this.allowedPointerTypes.has('touch');
    }
    /** How many touches the recognizer is tracking right now. */ get numberOfTouches() {
        return this.touches.size;
    }
    /** The touches being tracked, in the order they began. */ get trackedTouches() {
        return [
            ...this.touches.values()
        ];
    }
    /**
   * The centroid of the tracked touches in client coordinates; after they
   * end, where they were last.
   */ location() {
        if (this.touches.size === 0) {
            return this.lastLocation;
        }
        let x = 0;
        let y = 0;
        for (const touch of this.touches.values()){
            x += touch.x;
            y += touch.y;
        }
        this.lastLocation = {
            x: x / this.touches.size,
            y: y / this.touches.size
        };
        return this.lastLocation;
    }
    /** Facts about the page (viewport, writing direction). */ get environment() {
        return this.arena?.environment ?? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_ENVIRONMENT"];
    }
    // --- Relationships -------------------------------------------------------
    /** UIKit's `require(toFail:)`: recognize only once `other` has failed. */ requireToFail(other) {
        this.failureRequirements.add(other);
        return this;
    }
    /** Let this and `others` be recognized at the same time (both directions). */ recognizeSimultaneouslyWith(...others) {
        for (const other of others){
            this.simultaneousWith.add(other);
            other.simultaneousWith.add(this);
        }
        return this;
    }
    /** @internal Whether this recognizer must wait for `other` to fail. */ requiresFailureOf(other) {
        return this.failureRequirements.has(other) || this.options.shouldRequireFailureOf?.(this, other) === true || other.options.shouldBeRequiredToFailBy?.(other, this) === true;
    }
    /**
   * @internal Whether this and `other` may be active together: both allow it
   * (`recognizeSimultaneouslyWith` sets both sides; each delegate answers for
   * its own recognizer), so one delegate alone keeps them exclusive (FR15).
   */ allowsSimultaneous(other) {
        return this.simultaneousWith.has(other) || this.options.shouldRecognizeSimultaneously?.(this, other) === true && other.options.shouldRecognizeSimultaneously?.(other, this) === true;
    }
    /** @internal The delegate's should-begin answer. */ shouldBegin() {
        return this.options.shouldBegin?.(this) ?? true;
    }
    /**
   * @internal Whether this recognizer holds `touchId` before it begins: the
   * host then cancels that finger's moves as for a touch a recognizer owns.
   * None does by default (`spec:AST-094` FR19); a scroll-edge pan holds a
   * finger pulling away from an edge every scroller under it is at.
   */ keepsTouch(_touchId) {
        return false;
    }
    /** UIKit's `canPrevent(_:)`: whether recognizing fails `other`. */ canPrevent(_other) {
        return true;
    }
    /** UIKit's `canBePrevented(by:)`. */ canBePrevented(_other) {
        return true;
    }
    /**
   * Whether this recognizer is still part of the current interaction: it
   * tracks touches, is waiting on a requirement, or (a multi-tap between
   * taps) expects more input. An idle `possible` recognizer cannot recognize
   * and so does not hold up anything that requires it to fail.
   */ isInvolved() {
        return this.touches.size > 0 || this.pending != null;
    }
    // --- Listeners -----------------------------------------------------------
    /** Called on began, changed, ended (recognized) and cancelled. */ addListener(listener) {
        const stored = listener;
        this.listeners.add(stored);
        return ()=>{
            this.listeners.delete(stored);
        };
    }
    /** Called on every transition, including failed and the reset to possible. */ addTransitionListener(listener) {
        const stored = listener;
        this.transitionListeners.add(stored);
        return ()=>{
            this.transitionListeners.delete(stored);
        };
    }
    // --- Subclass API --------------------------------------------------------
    /** New touches for this recognizer. */ touchesBegan(_touches, _event) {}
    touchesMoved(_touches, _event) {}
    /** Touches lifted; they are removed from `touches` after this returns. */ touchesEnded(_touches, _event) {}
    /**
   * The system or the browser took these touches. By default an active
   * gesture is cancelled and a possible one fails.
   */ touchesCancelled(_touches, _event) {
        if (isActive(this.state)) {
            this.setState('cancelled');
        } else if (this.state === 'possible') {
            this.setState('failed');
        }
    }
    /**
   * The browser took these touches for its own pan or zoom (their pointer
   * stream is gone). Return true to keep observing them; by default they are
   * treated as cancelled. An observer never claims them: a drag the browser
   * took stays the browser's (FR14).
   */ touchesTakenByBrowser(touches, event) {
        if (!this.claimsTouches) {
            // A watcher follows the browser's scroll to the lift.
            return true;
        }
        this.touchesCancelled(touches, event);
        return false;
    }
    /**
   * A touch began elsewhere (off this recognizer's hit path) while this
   * recognizer tracks touches of its own. It is not this recognizer's touch
   * and is never delivered as one; a recognizer that a foreign finger should
   * end (a menu's press slide) cancels itself here. By default nothing
   * happens.
   */ touchBeganElsewhere(_touches, _event) {}
    /** Clear per-gesture state before the next attempt. */ reset() {}
    /** The scroll types taken when the options name none (UIKit's: none). */ get defaultScrollTypes() {
        return [];
    }
    /**
   * Whether a touch may join. The base checks enabled, pointer kind and
   * exclusivity of kind; subclasses narrow it (a one-finger pan ignores a
   * second finger once it is moving).
   */ acceptsTouch(touch) {
        if (!this.isEnabled) {
            return false;
        }
        if (touch.scrollType != null) {
            // Scroll input is no pointer: only the scroll types allowed count.
            return this.allowedScrollTypes.has(touch.scrollType) && (this.options.shouldReceiveTouch?.(this, touch) ?? true);
        }
        if (this.allowedPointerTypes != null && !this.allowedPointerTypes.has(touch.pointerType)) {
            return false;
        }
        if (this.requiresExclusiveTouchType) {
            for (const existing of this.touches.values()){
                if (existing.pointerType !== touch.pointerType) {
                    return false;
                }
            }
        }
        return this.options.shouldReceiveTouch?.(this, touch) ?? true;
    }
    /**
   * Ask for a state change. The arena may refuse (the recognizer fails
   * instead) or defer it until a failure requirement resolves.
   */ setState(next) {
        if (this.arena != null) {
            this.arena.requestTransition(this, next);
        } else {
            this.applyState(next);
        }
    }
    /** Arm the recognizer's one timer at an absolute time on the event clock. */ setTimer(deadline, callback) {
        this.arena?.setTimer(this, deadline, callback);
    }
    clearTimer() {
        this.arena?.clearTimer(this);
    }
    /** The event clock's current time. */ now() {
        return this.arena?.now() ?? 0;
    }
    /**
   * Takes this recognizer's touches from the view, as a claiming winner does
   * under `cancelsTouchesInView`: the view's press ends and no click follows.
   * The touches stay unclaimed, so the page still scrolls.
   */ cancelTouchesInView() {
        this.arena?.cancelTouchesInViewOf(this);
    }
    // --- Arena hooks (internal) ----------------------------------------------
    /** @internal Whether this recognizer takes `touch` right now. */ wantsTouch(touch) {
        if (this.state !== 'possible' && !isActive(this.state)) {
            return false;
        }
        if (this.pending != null) {
            return false;
        }
        return this.acceptsTouch(touch);
    }
    /** @internal */ deliverBegan(touches, event) {
        for (const touch of touches){
            this.touches.set(touch.id, touch);
            this.seenTouchIds.add(touch.id);
        }
        this.location();
        this.touchesBegan(touches, event);
    }
    /** @internal */ deliverBeganElsewhere(touches, event) {
        if (isTerminal(this.state)) {
            return;
        }
        this.touchBeganElsewhere(touches, event);
    }
    /** @internal */ deliverMoved(touches, event) {
        const own = touches.filter((touch)=>this.touches.has(touch.id));
        if (own.length === 0 || isTerminal(this.state)) {
            return;
        }
        this.location();
        this.touchesMoved(own, event);
    }
    /** @internal */ deliverEnded(touches, event) {
        const own = touches.filter((touch)=>this.touches.has(touch.id));
        if (own.length === 0) {
            return;
        }
        this.location();
        if (!isTerminal(this.state)) {
            this.touchesEnded(own, event);
        }
        for (const touch of own){
            this.touches.delete(touch.id);
        }
    }
    /** @internal */ deliverCancelled(touches, event) {
        const own = touches.filter((touch)=>this.touches.has(touch.id));
        if (own.length === 0) {
            return;
        }
        if (!isTerminal(this.state)) {
            this.touchesCancelled(own, event);
        }
        for (const touch of own){
            this.touches.delete(touch.id);
        }
    }
    /** @internal */ deliverTakenByBrowser(touches, event) {
        const own = touches.filter((touch)=>this.touches.has(touch.id));
        if (own.length === 0) {
            return;
        }
        if (!isTerminal(this.state) && this.touchesTakenByBrowser(own, event)) {
            return;
        }
        for (const touch of own){
            this.touches.delete(touch.id);
        }
    }
    /** @internal The host's hook: listeners follow whether anything is enabled. */ onEnabledChange = null;
    /**
   * UIKit's `isEnabled` setter: turning a recognizer off mid-gesture cancels
   * the gesture (an active one) or fails it (a possible one).
   */ setEnabled(value) {
        const changed = this.isEnabled !== value;
        this.isEnabled = value;
        if (changed) {
            this.onEnabledChange?.();
        }
        if (!value && (this.state !== 'possible' || this.isInvolved())) {
            this.cancel();
        }
    }
    /** Cancel this recognizer if it is active, or fail it if it is possible. */ cancel() {
        if (this.arena != null) {
            this.arena.stop(this);
        } else if (isActive(this.state)) {
            this.applyState('cancelled');
        } else if (this.state === 'possible' && this.isInvolved()) {
            // An idle recognizer stays `possible`: nothing would ever reset it.
            this.applyState('failed');
        }
    }
    /** @internal Apply a transition the arena has approved. */ applyState(next) {
        const from = this.stateValue;
        if (from === next && next !== 'changed') {
            return;
        }
        if (!isTransitionAllowed(from, next)) {
            return;
        }
        this.stateValue = next;
        if (next !== 'possible') {
            this.pending = null;
        }
        for (const listener of [
            ...this.transitionListeners
        ]){
            listener(this, from, next);
        }
        if (ACTION_STATES.has(next)) {
            for (const listener of [
                ...this.listeners
            ]){
                listener(this);
            }
        }
    }
    /** @internal Return to `possible` for the next attempt. */ resetToPossible() {
        this.clearTimer();
        this.pending = null;
        this.touches.clear();
        this.seenTouchIds.clear();
        this.reset();
        this.applyState('possible');
    }
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/PanGestureRecognizer.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PanGestureRecognizer",
    ()=>PanGestureRecognizer
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file PanGestureRecognizer.ts
 * @input Touches from a GestureArena, each with a probe of the native
 *   scrollers under it
 * @output Exports PanGestureRecognizer (UIPanGestureRecognizer), its options
 *   and direction type
 * @position Continuous recognizer of packages/core/src/gestures; the base of
 *   ScreenEdgePanGestureRecognizer
 *
 * Begins once the touches' centroid has travelled `hysteresis` px along
 * either axis (UIKit applies it per axis, not as a distance) with between
 * `minimumNumberOfTouches` and `maximumNumberOfTouches` fingers down, in the
 * allowed `direction`. As in UIKit, `translation()` is reset when the pan
 * begins, so the travel spent on the threshold is not part of it and a
 * dragged surface does not jump; `totalTranslation()` is the movement since
 * the fingers landed, and `travelAtBegan` what the threshold took.
 * `velocity()` is UIKit's own filter (see VelocityTracker), fed one sample
 * per event; the lift's position updates neither, as in UIKit. Adding or
 * lifting a finger never jumps the translation: the centroid is re-based so
 * the gesture continues where it was. Once moving, fingers past the maximum
 * are ignored, so a second finger never breaks a one-finger pan.
 *
 * NATIVE SCROLL COORDINATION, for a pan over content the browser scrolls
 * (a sheet over its own list):
 *
 * - `scrollEdge`: the pan begins only if no scroller under the touch could
 *   scroll for that movement — the finger landed at the edge and pulls away
 *   from it. The browser has not committed yet, so beginning claims the
 *   touch and the browser never scrolls.
 * - `firstMoveDecides`: a one-way pan holds the touch from a first move its
 *   own way. Any other first move fails it, so the page keeps the touch.
 *
 * Who gets the drag is decided once, when it begins: a drag that began as
 * the browser's scroll stays the browser's to the lift and rubber-bands at
 * the content's edge, as a UIKit scroll view keeps it (`spec:AST-094` FR14).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/gestures.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/geometry.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/GestureRecognizer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$tapWobble$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/tapWobble.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$VelocityTracker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/VelocityTracker.js [app-ssr] (ecmascript)");
;
;
;
;
;
const ZERO = {
    x: 0,
    y: 0
};
const DIRECTION_VECTORS = {
    left: {
        x: -1,
        y: 0
    },
    right: {
        x: 1,
        y: 0
    },
    up: {
        x: 0,
        y: -1
    },
    down: {
        x: 0,
        y: 1
    }
};
class PanGestureRecognizer extends __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GestureRecognizer"] {
    get kind() {
        return 'pan';
    }
    /** @internal The host's brand: a pan follows the one-finger rule (recognizerInternals). */ get family() {
        return 'pan';
    }
    /** The axis a `lockAxis` pan locked to when it began. */ lockedAxis = null;
    /** The movement the begin threshold took (excluded from `translation()`). */ travelAtBegan = ZERO;
    /**
   * Read once per press. A finger that lands later keeps the press's
   * threshold.
   */ /** The lift's event time once the pan ended: its release (AST-100 FR2). */ releaseTime = undefined;
    /** The centroid where the gesture started, in client px. */ origin = ZERO;
    /** Re-basing that keeps the translation continuous across finger changes. */ adjust = ZERO;
    /** Translation since touch-down, before `setTranslation` offsets. */ raw = ZERO;
    offset = ZERO;
    /** How a `firstMoveDecides` pan read the touch's first move, once it moved. */ firstMove = null;
    constructor(options = {}){
        super(options);
        this.minimumNumberOfTouches = options.minimumNumberOfTouches ?? 1;
        this.maximumNumberOfTouches = options.maximumNumberOfTouches ?? Number.POSITIVE_INFINITY;
        const { hysteresis } = options;
        this.hysteresisFor = typeof hysteresis === 'function' ? hysteresis : null;
        this.hysteresis = typeof hysteresis === 'number' ? hysteresis : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIKIT_PAN"].hysteresis.value;
        this.direction = options.direction ?? 'any';
        this.axisRatio = options.axisRatio ?? 1;
        this.lockAxis = options.lockAxis ?? false;
        this.scrollEdge = options.scrollEdge ?? false;
        this.firstMoveDecides = options.firstMoveDecides ?? false;
        this.tracker = new __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$VelocityTracker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VelocityTracker"]();
    }
    /**
   * Movement since the pan began (or since `setTranslation`), client px; the
   * movement since touch-down while it is still possible.
   */ translation() {
        return this.locked({
            x: this.raw.x + this.offset.x,
            y: this.raw.y + this.offset.y
        });
    }
    /**
   * Change the allowed direction for the next gesture (a pan in progress
   * keeps the one it began with). The element's touch-action is derived
   * when the recognizer is attached: switching between directions that
   * leave the browser the same touches (up and down) needs nothing more.
   */ setDirection(direction) {
        this.direction = direction;
    }
    /** UIKit's `setTranslation(_:in:)`: make the current translation read `value`. */ setTranslation(value) {
        this.offset = {
            x: value.x - this.raw.x,
            y: value.y - this.raw.y
        };
    }
    /** Movement since the fingers landed, threshold included, client px. */ totalTranslation() {
        return this.raw;
    }
    /**
   * Velocity in px/s, UIKit's way, for a dragged surface. At the release it
   * is 0 when the finger rested longer than the stillness interval before
   * lifting, or moved fewer than twice (spec:AST-100 FR2).
   */ velocity() {
        return this.locked(this.tracker.velocity(this.releaseTime));
    }
    /**
   * A scrolling surface's release velocity in px/s (paging, a wheel): the
   * scroll-view blend of the pan's last two values, with the same release
   * rules (architecture:interaction-modality INV10).
   */ scrollVelocity() {
        return this.locked(this.tracker.scrollVelocity(this.releaseTime ?? this.tracker.lastSample?.time ?? 0));
    }
    /**
   * The browser keeps the axis a two-way pan does not use. A one-way pan,
   * and a pan that coordinates with native scrolling, leave the browser
   * everything: the other direction still scrolls (a toast dragged away from
   * its edge scrolls the page), and the pan claims its own direction by
   * cancelling `touchmove` when it begins, below the distance at which the
   * browser decides to scroll. Pinch-zoom stays the browser's.
   */ get nativeTouchBehavior() {
        if (this.scrollEdge || DIRECTION_VECTORS[this.direction] != null) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ALL_NATIVE_TOUCH"];
        }
        const horizontal = this.direction === 'horizontal' || this.direction === 'left' || this.direction === 'right';
        const vertical = this.direction === 'vertical' || this.direction === 'up' || this.direction === 'down';
        return {
            panX: vertical,
            panY: horizontal,
            pinchZoom: true,
            doubleTapZoom: false
        };
    }
    acceptsTouch(touch) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isActive"])(this.state) && this.numberOfTouches >= this.maximumNumberOfTouches) {
            // A moving pan keeps its fingers: an extra one never fails it.
            return false;
        }
        return super.acceptsTouch(touch);
    }
    touchesBegan(touches, event) {
        if (this.numberOfTouches === touches.length) {
            const first = touches[0];
            if (this.hysteresisFor != null && first != null) {
                this.hysteresis = this.hysteresisFor(first);
            }
            this.origin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["centroid"])(this.touches.values());
            this.adjust = ZERO;
            this.raw = ZERO;
            this.offset = ZERO;
            this.tracker.reset();
            this.tracker.add(this.origin.x, this.origin.y, event.time);
        } else {
            this.rebase(new Set(touches.map((touch)=>touch.id)), 'added');
        }
        if (this.state === 'possible' && this.numberOfTouches > this.maximumNumberOfTouches) {
            this.setState('failed');
        }
    }
    touchesMoved(_touches, event) {
        this.track(event.time);
        if (this.state === 'possible') {
            if (this.firstMoveDecides && this.firstMove == null && (this.raw.x !== 0 || this.raw.y !== 0)) {
                this.firstMove = this.classify(this.raw);
                if (this.firstMove !== 'begin') {
                    this.setState('failed');
                    return;
                }
            }
            this.tryBegin();
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isActive"])(this.state)) {
            this.setState('changed');
        }
    }
    touchesEnded(touches, event) {
        // UIKit reads neither the translation nor the velocity from the lift; the
        // lift's time only decides whether the finger was still (AST-100 FR2).
        const remaining = this.numberOfTouches - touches.length;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isActive"])(this.state)) {
            if (remaining < this.minimumNumberOfTouches) {
                this.releaseTime = event.time;
                this.setState('ended');
                return;
            }
            this.rebase(new Set(touches.map((touch)=>touch.id)), 'removed');
            return;
        }
        if (remaining === 0 || remaining < this.minimumNumberOfTouches) {
            this.setState('failed');
            return;
        }
        this.rebase(new Set(touches.map((touch)=>touch.id)), 'removed');
    }
    reset() {
        this.lockedAxis = null;
        this.travelAtBegan = ZERO;
        this.origin = ZERO;
        this.adjust = ZERO;
        this.raw = ZERO;
        this.offset = ZERO;
        this.releaseTime = undefined;
        this.firstMove = null;
        this.tracker.reset();
    }
    /**
   * What this movement means for a pan limited to a direction: begin, fail,
   * or undecided (between `axisRatio`'s lines), which fails it too once it
   * reaches its hysteresis.
   */ classify(translation) {
        if (this.direction === 'any') {
            return 'begin';
        }
        const isHorizontal = this.direction === 'horizontal' || this.direction === 'left' || this.direction === 'right';
        const along = isHorizontal ? translation.x : translation.y;
        const across = Math.abs(isHorizontal ? translation.y : translation.x);
        const magnitude = Math.abs(along);
        if (magnitude > this.axisRatio * across) {
            // The axis is decided; a one-way pan also needs the right sign.
            const vector = DIRECTION_VECTORS[this.direction];
            const sign = vector == null ? 0 : vector.x + vector.y;
            return sign === 0 || Math.sign(along) === sign ? 'begin' : 'fail';
        }
        return across * Math.min(1, this.axisRatio) > magnitude ? 'fail' : 'wait';
    }
    tryBegin() {
        const count = this.numberOfTouches;
        if (count < this.minimumNumberOfTouches) {
            return;
        }
        if (count > this.maximumNumberOfTouches) {
            this.setState('failed');
            return;
        }
        const moved = this.raw;
        if (Math.max(Math.abs(moved.x), Math.abs(moved.y)) < this.hysteresis) {
            return;
        }
        const verdict = this.classify(moved);
        if (verdict === 'fail') {
            this.setState('failed');
            return;
        }
        if (verdict === 'wait') {
            // Past its 10 px begin and still no clear axis: a pan that competes
            // with native scrolling must decide by then (`spec:AST-094` FR19), so
            // it leaves the touch to the browser.
            this.setState('failed');
            return;
        }
        if (this.scrollEdge && this.nativeCanScroll(moved.x, moved.y)) {
            // The content under the finger still scrolls this way: it is a scroll,
            // the browser's to the lift (FR14).
            this.setState('failed');
            return;
        }
        if (this.lockAxis && this.direction === 'any') {
            this.lockedAxis = Math.abs(moved.x) >= Math.abs(moved.y) ? 'x' : 'y';
        }
        this.startFromHere();
        this.setState('began');
    }
    /**
   * Leave the threshold's travel out of the translation, as UIKit does at
   * .began: up to `hysteresis` px per axis, so a slow drag starts at zero and
   * a step that overshoots keeps the overshoot (measured: a slow diagonal
   * that crossed at (10.67, 10.67) reads (0.67, 0.67); a 3:1 drag crossing at
   * (11, 3.67) reads (1, 0)). Some fast first moves read zero in UIKit; that
   * case is not modelled.
   */ startFromHere() {
        const limit = this.hysteresis;
        const swallowed = {
            x: Math.sign(this.raw.x) * Math.min(Math.abs(this.raw.x), limit),
            y: Math.sign(this.raw.y) * Math.min(Math.abs(this.raw.y), limit)
        };
        this.travelAtBegan = swallowed;
        this.offset = {
            x: -swallowed.x,
            y: -swallowed.y
        };
    }
    /**
   * Inside a tap's wobble the moves stay the browser's, so WebKit keeps the
   * tap's click. Past it, at an edge where the browser would only rubber-band,
   * the pan holds the finger before it begins (`spec:AST-094` FR19, DEC-18).
   * A move the content can still scroll stays the browser's, and so does every
   * move while a second finger is down (a pinch).
   */ keepsTouch(touchId) {
        const touch = this.touches.get(touchId);
        if (!this.scrollEdge && !this.firstMoveDecides || this.state !== 'possible' || // A lone finger only: two fingers before a claim are the page's pinch
        // (spec:AST-094 FR10).
        this.touches.size !== 1 || touch == null || touch.pointerType !== 'touch' || touch.takenByBrowser) {
            return false;
        }
        if (this.firstMoveDecides) {
            // A first move its own way holds the finger until the pan begins.
            return this.firstMove === 'begin';
        }
        const moved = this.raw;
        return this.travelAlongAxis(moved) >= __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$tapWobble$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TAP_WOBBLE"] && this.classify(moved) === 'begin' && !this.nativeCanScroll(moved.x, moved.y);
    }
    travelAlongAxis(moved) {
        if (this.direction === 'any') {
            return Math.max(Math.abs(moved.x), Math.abs(moved.y));
        }
        const isHorizontal = this.direction === 'horizontal' || this.direction === 'left' || this.direction === 'right';
        return Math.abs(isHorizontal ? moved.x : moved.y);
    }
    nativeCanScroll(dx, dy) {
        for (const touch of this.touches.values()){
            if (touch.scroll?.canScroll(dx, dy) === true) {
                return true;
            }
        }
        return false;
    }
    track(time) {
        const current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["centroid"])(this.touches.values());
        const virtual = {
            x: current.x + this.adjust.x,
            y: current.y + this.adjust.y
        };
        // UIKit's filter runs once per event.
        this.tracker.add(virtual.x, virtual.y, time);
        this.raw = {
            x: virtual.x - this.origin.x,
            y: virtual.y - this.origin.y
        };
    }
    /** Keep the translation continuous when fingers join or leave. */ rebase(changedIds, kind) {
        const all = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["centroid"])(this.touches.values());
        const others = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["centroid"])(this.touches.values(), changedIds);
        const [before, after] = kind === 'added' ? [
            others,
            all
        ] : [
            all,
            others
        ];
        this.adjust = {
            x: this.adjust.x + before.x - after.x,
            y: this.adjust.y + before.y - after.y
        };
    }
    locked(value) {
        if (this.lockedAxis === 'x') {
            return {
                x: value.x,
                y: 0
            };
        }
        if (this.lockedAxis === 'y') {
            return {
                x: 0,
                y: value.y
            };
        }
        return value;
    }
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/PressTracker.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PRESS_PROFILES",
    ()=>PRESS_PROFILES,
    "createPressTracker",
    ()=>createPressTracker,
    "vetoesSingleTap",
    ()=>vetoesSingleTap
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file PressTracker.ts
 * @input Touches the arena delivers to a pressable view (TouchConsumer)
 * @output Exports createPressTracker and its PressTracker interface
 *   (UIControl's touch tracking, built by a factory per
 *   architecture:react-component-runtime INV13), its options, the
 *   control event type, and PRESS_PROFILES (a control's and a table cell's
 *   tracking and release clock)
 * @position View-level consumer of packages/core/src/gestures: what a
 *   UIControl does with the touches no gesture recognizer took
 *
 * UIControl semantics, event for event:
 *
 * - `touchDown` when the finger lands; the highlight comes on in the same
 *   frame, unless the control sits in a scroller. There it waits
 *   `contentTouchDelay` (UIScrollView.delaysContentTouches) from the touch's
 *   own time, so a flick paints nothing.
 * - `touchDragInside` / `touchDragOutside` on every move, `touchDragExit` /
 *   `touchDragEnter` when the finger crosses the control's bounds EXPANDED
 *   by `trackingExpansion` (a fingertip dragged a little off a button is
 *   still on it). The highlight follows inside / outside.
 * - `touchUpInside` / `touchUpOutside` at the lift. A tap quicker than the
 *   scroller delay shows the highlight at the lift for `quickTapFlash`.
 * - `touchCancel` when a recognizer took the touch (`cancelsTouchesInView`)
 *   or the browser took it to scroll: the highlight goes at once, with no
 *   release, one frame before the content moves.
 *
 * Two profiles (PRESS_PROFILES) cover what UIKit does:
 *
 * - `control` (a button, a switch): as above.
 * - `cell` (a table or collection row): the highlight waits the
 *   content-touch delay inside a scroll view and comes on at once outside one
 *   (`spec:AST-094` FR11), travel past the pan hysteresis cancels the press
 *   for good (the scroll view took the touch), and a quicker tap highlights
 *   at the lift straight into the release, with no flash.
 *
 * And UIControl's iOS 6 rule: a single-finger single tap recognizer on an
 * ANCESTOR does not beat the control's own action for a touch on it (the
 * default veto; `vetoesAncestorRecognizer` replaces it, as a slider vetoes a
 * pan along its track).
 *
 * The bounds are read once, when the finger lands; nothing reads layout
 * during the press. Activation stays the browser's click, which the arena
 * swallows for a touch a recognizer took.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/gestures.js [app-ssr] (ecmascript)");
// Importing the whole table bundles its curves into each press-tracking control.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$timing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/timing.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputAge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputAge.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/geometry.js [app-ssr] (ecmascript)");
;
;
;
;
const PRESS = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIKIT_PRESS"];
const PRESS_PROFILES = {
    /** UIControl: same-frame highlight outside scrollers, 70 pt tracking. */ control: {
        highlightDelay: 'inScrollers',
        quickTapFlash: PRESS.quickTapFlash.value,
        // The shared press styles release every surface on the deselect clock
        // until a control runs its own release (UIButton's 250 ms), so a
        // painter's `fading` never outlasts the fade it shows.
        releaseMs: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$timing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["press"].highlightOutMs
    },
    /**
   * A table or collection cell: inside a scroll view it highlights after the
   * content-touch delay, outside one at once (AST-094 FR11: the delay applies
   * only inside scroll views); cancelled by the scroll.
   */ cell: {
        highlightDelay: 'inScrollers',
        cancelTravel: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIKIT_PAN"].hysteresis.value,
        quickTapFlash: 0,
        releaseMs: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$timing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["press"].highlightOutMs
    }
};
function vetoesSingleTap(recognizer) {
    if (recognizer.kind !== 'tap') {
        return false;
    }
    const tap = recognizer;
    return tap.numberOfTapsRequired === 1 && tap.numberOfTouchesRequired === 1;
}
function createPressTracker(options) {
    let isKept = false;
    let touchId = null;
    let bounds = null;
    let highlightTimer = null;
    let flashTimer = null;
    /** A pending highlight whose finger travelled: it will never paint. */ let isPendingDead = false;
    const state = {
        isHighlighted: false,
        isTracking: false,
        isTouchInside: false
    };
    const contains = (touch)=>{
        if (bounds == null) {
            return true;
        }
        const margin = tracker.trackingExpansion;
        return touch.x >= bounds.left - margin && touch.x <= bounds.right + margin && touch.y >= bounds.top - margin && touch.y <= bounds.bottom + margin;
    };
    const emit = (event, touch)=>{
        options.onControlEvent?.(event, touch);
    };
    const setHighlighted = (value)=>{
        if (value && touchId != null) {
            // Delivered: the control keeps this touch until it ends (also when a
            // quick tap's flash is still showing as the press arrives).
            isKept = true;
        }
        if (state.isHighlighted === value) {
            return;
        }
        state.isHighlighted = value;
        options.onHighlightChange?.(value);
    };
    const clearHighlightTimer = ()=>{
        if (highlightTimer != null) {
            clearTimeout(highlightTimer);
            highlightTimer = null;
        }
    };
    const clearFlash = ()=>{
        if (flashTimer != null) {
            clearTimeout(flashTimer);
            flashTimer = null;
        }
    };
    const finish = ()=>{
        // A highlight shown at the lift (a quick tap's flash) keeps nothing.
        isKept = false;
        touchId = null;
        state.isTracking = false;
        state.isTouchInside = false;
        bounds = null;
    };
    const touchCancelled = (touch)=>{
        if (touch.id !== touchId) {
            return;
        }
        isKept = false;
        clearHighlightTimer();
        emit('touchCancel', touch);
        setHighlighted(false);
        finish();
    };
    const tracker = {
        get isHighlighted () {
            return state.isHighlighted;
        },
        get isTracking () {
            return state.isTracking;
        },
        get isTouchInside () {
            return state.isTouchInside;
        },
        trackingExpansion: options.trackingExpansion ?? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIKIT_CONTROL"].trackingExpansion.value,
        isEnabled () {
            return options.isEnabled?.() !== false;
        },
        holdsContextMenu (id) {
            return options.holdsContextMenu?.(id) === true;
        },
        touchBegan (touch) {
            if (touchId != null || options.isEnabled?.() === false || // The scroll brake is a finger's (`spec:AST-094` FR11, DEC-21).
            touch.pointerType === 'touch' && options.isBraking?.(touch) === true) {
                return;
            }
            clearFlash();
            touchId = touch.id;
            bounds = options.getBounds();
            state.isTracking = true;
            state.isTouchInside = true;
            isPendingDead = false;
            emit('touchDown', touch);
            const delay = options.highlightDelay ?? 'inScrollers';
            const delays = touch.pointerType === 'touch' && (delay === 'always' || delay === 'inScrollers' && touch.scroll?.isInsideScroller === true);
            if (delays) {
                // The delay counts from the touch, so the time a busy main thread
                // took to deliver it comes off the wait. The touch's time is on the
                // clock of its own window, which can be an iframe's.
                const wait = Math.max(0, PRESS.contentTouchDelay.value - (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputAge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["msSinceInput"])(touch.time, touch.target));
                highlightTimer = setTimeout(()=>{
                    highlightTimer = null;
                    if (state.isTouchInside) {
                        setHighlighted(true);
                    }
                }, wait);
            } else {
                setHighlighted(true);
            }
        },
        touchMoved (touch) {
            if (touch.id !== touchId) {
                return;
            }
            const cancelTravel = options.cancelTravel;
            if (cancelTravel != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["travel"])(touch) > cancelTravel) {
                // A cell's scroll view took the touch: the press is over.
                touchCancelled(touch);
                return;
            }
            if (highlightTimer != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$geometry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["travel"])(touch) > PRESS.slop.value) {
                // A finger travelling before the delay ran out is scrolling: the
                // press it began never paints, as a flick on a list paints nothing.
                clearTimeout(highlightTimer);
                highlightTimer = null;
                isPendingDead = true;
            }
            const inside = contains(touch);
            if (inside !== state.isTouchInside) {
                state.isTouchInside = inside;
                emit(inside ? 'touchDragEnter' : 'touchDragExit', touch);
                if (highlightTimer == null && !isPendingDead) {
                    setHighlighted(inside);
                }
            }
            emit(inside ? 'touchDragInside' : 'touchDragOutside', touch);
        },
        touchEnded (touch) {
            if (touch.id !== touchId) {
                return;
            }
            isKept = false;
            const inside = contains(touch);
            const wasPending = highlightTimer != null;
            clearHighlightTimer();
            emit(inside ? 'touchUpInside' : 'touchUpOutside', touch);
            const flash = options.quickTapFlash ?? PRESS.quickTapFlash.value;
            if (wasPending && inside) {
                // Quicker than the delay: the highlight shows at the lift, for the
                // flash, or (a cell) straight into the release.
                setHighlighted(true);
                if (flash > 0) {
                    flashTimer = setTimeout(()=>{
                        flashTimer = null;
                        setHighlighted(false);
                    }, flash);
                } else {
                    setHighlighted(false);
                }
            } else {
                setHighlighted(false);
            }
            finish();
        },
        touchCancelled,
        allowsAncestorRecognizer (recognizer) {
            const candidate = recognizer;
            if (candidate.view != null && candidate.view === options.view) {
                return true;
            }
            const vetoes = options.vetoesAncestorRecognizer ?? vetoesSingleTap;
            return !vetoes(candidate);
        },
        dispose () {
            clearHighlightTimer();
            clearFlash();
            setHighlighted(false);
            finish();
        },
        get selectionLock () {
            return options.selectionLock;
        }
    };
    if (options.keepsTouch === true) {
        // Only the tracked touch whose press was delivered is kept.
        return Object.assign(tracker, {
            keepsTouch: (id)=>isKept && touchId === id
        });
    }
    return tracker;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/VelocityTracker.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VelocityTracker",
    ()=>VelocityTracker
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file VelocityTracker.ts
 * @input Timestamped positions of a moving contact, and the release time
 * @output Exports VelocityTracker, the one velocity tracker every continuous
 *   recognizer uses (architecture:interaction-modality INV10,
 *   spec:AST-100 FR1, FR2)
 * @position Pure math under packages/core/src/gestures; no DOM
 *
 * What a release hands to a spring or a deceleration: the finger's velocity
 * when it lifted, in px per SECOND (UIKit's unit for `velocity(in:)`).
 *
 * One filter, iOS's measured blend, updated on each MOVED sample (a sample
 * at the newest position is not motion):
 *
 * - A pan's velocity is 0.2 times the newest interval's velocity plus 0.8
 *   times the previous interval's (an interval runs from one moved sample to
 *   the next; the touch-down counts as the first). With one interval so far
 *   it is that interval, as UIKit reports it. It reproduces every value
 *   UIKit reported on six HID streams, and like UIKit's it reacts a frame
 *   late to an acceleration.
 * - A scrolling surface's release (paging, a wheel) is 0.25 times the newest
 *   pan value plus 0.75 times the previous one.
 *
 * A release (`velocity(releaseTime)`, `scrollVelocity(releaseTime)`) reads 0
 * when the contact was still for longer than the stillness interval before
 * lifting, the one difference from iOS, whose filter never decays and so
 * flings after a rest; and 0 with fewer than two moved samples.
 *
 * Feed it one sample per input event: coalesced samples would change its
 * timing.
 *
 * SYNC: When modified, update VelocityTracker.test.ts.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/gestures.js [app-ssr] (ecmascript)");
;
const ZERO = {
    x: 0,
    y: 0
};
const PAN_CURRENT_WEIGHT = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIKIT_VELOCITY"].currentWeight.value;
const SCROLL_CURRENT_WEIGHT = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIKIT_VELOCITY"].scrollReleaseWeight.value;
function blend(weight, current, previous) {
    return {
        x: weight * current.x + (1 - weight) * previous.x,
        y: weight * current.y + (1 - weight) * previous.y
    };
}
class VelocityTracker {
    /** The newest sample added, moved or not. */ newest = null;
    /**
   * The newest moved samples, oldest first (the touch-down counts as the
   * first); the filter reads the last three.
   */ moved = [];
    /** Moved samples since the touch-down. */ moves = 0;
    /** The newest pan value, and the one before it. */ pan = ZERO;
    previousPan = ZERO;
    constructor(options = {}){
        this.stillness = options.stillness ?? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIKIT_VELOCITY"].stillness.value;
    }
    /** Forget every sample (a new gesture). */ reset() {
        this.newest = null;
        this.moved = [];
        this.moves = 0;
        this.pan = ZERO;
        this.previousPan = ZERO;
    }
    /**
   * Record a position. Timestamps must not go backwards (an older sample is
   * ignored), and a moved sample at the newest moved sample's timestamp
   * replaces it. A sample at the newest position is not motion: it changes
   * no velocity, unless `isMotion` says the contact moved anyway (a pinch's
   * value holding while both fingers move, which reads as zero velocity for
   * that interval).
   */ add(x, y, time, { isMotion = false } = {}) {
        if (this.newest != null && time < this.newest.time) {
            return;
        }
        this.newest = {
            x,
            y,
            time
        };
        const last = this.moved[this.moved.length - 1];
        if (last != null && x === last.x && y === last.y && !isMotion) {
            return;
        }
        if (last != null && time === last.time) {
            this.moved[this.moved.length - 1] = {
                x,
                y,
                time
            };
        } else {
            this.moved.push({
                x,
                y,
                time
            });
            if (this.moved.length > 3) {
                this.moved.shift();
            }
            if (last != null) {
                this.moves += 1;
                this.previousPan = this.pan;
            }
        }
        this.pan = panVelocity(this.moved);
    }
    /**
   * Re-base the samples by an offset (a recognizer whose value was set
   * mid-gesture): every interval, the moved-sample count and the velocity
   * carry on unchanged.
   */ offsetBy(dx, dy) {
        const shift = (sample)=>({
                ...sample,
                x: sample.x + dx,
                y: sample.y + dy
            });
        this.newest = this.newest == null ? null : shift(this.newest);
        this.moved = this.moved.map(shift);
    }
    /**
   * Re-base the samples by a factor (a pinch whose scale was set
   * mid-gesture): positions and velocities scale with it, and the
   * moved-sample count carries on.
   */ scaleBy(factor) {
        const scale = (sample)=>({
                ...sample,
                x: sample.x * factor,
                y: sample.y * factor
            });
        this.newest = this.newest == null ? null : scale(this.newest);
        this.moved = this.moved.map(scale);
        this.pan = {
            x: this.pan.x * factor,
            y: this.pan.y * factor
        };
        this.previousPan = {
            x: this.previousPan.x * factor,
            y: this.previousPan.y * factor
        };
    }
    /** Record every sample in order. */ addSamples(samples) {
        for (const sample of samples){
            this.add(sample.x, sample.y, sample.time);
        }
    }
    /** The newest sample, if any. */ get lastSample() {
        return this.newest;
    }
    /**
   * The pan's velocity in px/s. Pass the release's event time to read the
   * release velocity of a dragged surface: 0 after a rest longer than the
   * stillness interval, or with fewer than two moved samples (AST-100 FR2).
   */ velocity(releaseTime) {
        if (releaseTime != null && !this.releases(releaseTime)) {
            return ZERO;
        }
        return this.pan;
    }
    /**
   * A scrolling surface's release velocity in px/s (paging, a wheel): 0.25
   * times the newest pan value plus 0.75 times the previous one, with the
   * same stillness and two-moved-sample rules (AST-100 FR2).
   */ scrollVelocity(releaseTime) {
        if (!this.releases(releaseTime)) {
            return ZERO;
        }
        return blend(SCROLL_CURRENT_WEIGHT, this.pan, this.previousPan);
    }
    releases(releaseTime) {
        const last = this.moved[this.moved.length - 1];
        return this.moves >= 2 && last != null && releaseTime - last.time <= this.stillness;
    }
}
/**
 * UIPanGestureRecognizer's filter over the newest moved samples: 0.2 x the
 * newest interval's velocity + 0.8 x the previous one's; one interval so far
 * is reported whole, as UIKit does.
 */ function panVelocity(moved) {
    const n = moved.length;
    if (n < 2) {
        return ZERO;
    }
    const current = pairVelocity(moved[n - 2], moved[n - 1]);
    if (n === 2) {
        return current;
    }
    return blend(PAN_CURRENT_WEIGHT, current, pairVelocity(moved[n - 3], moved[n - 2]));
}
/** Instantaneous velocity (px/s) between two samples, zero across no time. */ function pairVelocity(start, end) {
    const dt = end.time - start.time;
    if (dt <= 0) {
        return ZERO;
    }
    return {
        x: (end.x - start.x) / dt * 1000,
        y: (end.y - start.y) / dt * 1000
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/geometry.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file geometry.ts
 * @input Touches
 * @output Exports the small geometry helpers recognizers share: centroid,
 *   distance, span and angle of two touches, angle unwrapping
 * @position Pure helpers under packages/core/src/gestures
 */ __turbopack_context__.s([
    "angleBetween",
    ()=>angleBetween,
    "centroid",
    ()=>centroid,
    "distance",
    ()=>distance,
    "travel",
    ()=>travel,
    "unwrapAngle",
    ()=>unwrapAngle
]);
function centroid(touches, excluding) {
    let x = 0;
    let y = 0;
    let count = 0;
    for (const touch of touches){
        if (excluding?.has(touch.id)) {
            continue;
        }
        x += touch.x;
        y += touch.y;
        count += 1;
    }
    return count === 0 ? {
        x: 0,
        y: 0
    } : {
        x: x / count,
        y: y / count
    };
}
function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}
function travel(touch) {
    return Math.hypot(touch.x - touch.startX, touch.y - touch.startY);
}
function angleBetween(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x);
}
function unwrapAngle(angle, reference) {
    let result = angle;
    while(result - reference > Math.PI){
        result -= 2 * Math.PI;
    }
    while(result - reference < -Math.PI){
        result += 2 * Math.PI;
    }
    return result;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/gestureSync.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSyncingGestures",
    ()=>isSyncingGestures,
    "syncingGestures",
    ()=>syncingGestures,
    "useIsUnmountedRef",
    ()=>useIsUnmountedRef
]);
/**
 * @file gestureSync.ts
 * @input Nothing: module state and a React ref
 * @output Exports useIsUnmountedRef, and the gesture-sync depth
 *   (syncingGestures, isSyncingGestures) the gesture hooks read
 * @position Internal helpers shared by useGestureRecognizer and
 *   usePressTracker, so each hook imports only what it uses
 *
 * SYNC: When modified, update __tests__/useGestureRecognizer.test.tsx.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsomorphicLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
/**
 * How many hooks are driving a recognizer from an Effect right now: an
 * `isEnabled` sync, or the detach of a replaced node that cancels a gesture
 * in flight. While one runs no hook's listener calls its caller's callback
 * (react-component-runtime INV2, INV3): the recognizer it stops is cancelled
 * silently, and what that stop unblocks (a recognizer that required it to
 * fail) resolves in the arena's next pass, a microtask later, where its
 * listener reports as usual (`deferringResolution` in useGestureRecognizer).
 * A press tracker's callbacks wait for a microtask after it (usePressTracker).
 */ const sync = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedState"])('gestures/gesture-sync/state', 1, ()=>({
        syncingDepth: 0
    }));
function syncingGestures(body) {
    sync.syncingDepth += 1;
    try {
        return body();
    } finally{
        sync.syncingDepth -= 1;
    }
}
function isSyncingGestures() {
    return sync.syncingDepth > 0;
}
function useIsUnmountedRef() {
    const isUnmountedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Syncs the flag with the component's mount.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        isUnmountedRef.current = false;
        return ()=>{
            isUnmountedRef.current = true;
        };
    }, []);
    return isUnmountedRef;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/hostRegistry.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gestureHosts",
    ()=>gestureHosts
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file hostRegistry.ts
 * @input Documents, and the gesture host created for each
 * @output Exports gestureHosts: each document's gesture host, once something
 *   has asked getGestureHost for it, shared by every copy of Core
 * @position Shared by GestureHost.ts, which creates and records the hosts, and
 *   code that only asks a host that already exists (pageHold.ts), which then
 *   imports nothing of the host itself.
 *
 * SYNC: When modified, update GestureHost.ts (getGestureHost) and pageHold.ts.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-ssr] (ecmascript)");
;
const gestureHosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["realmValue"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedKey"])('gestures/host', 1), ()=>new WeakMap());
}),
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/nativeScroll.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canElementScroll",
    ()=>canElementScroll,
    "createNativeScrollProbe",
    ()=>createNativeScrollProbe
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file nativeScroll.ts
 * @input An element a touch landed on
 * @output Exports createNativeScrollProbe (the NativeScrollProbe a host gives
 *   each touch, and each wheel gesture without the touch-action narrowing)
 *   and parseTouchAction
 * @position DOM half of the scroll coordination in packages/core/src/gestures
 *
 * Answers one question for a recognizer without letting it touch the DOM:
 * would the browser scroll something if this finger moved that way?
 *
 * The browser scrolls the innermost scroller that has room, then chains
 * outward, so the answer is "yes" while ANY scroller under the touch can
 * still move in that direction, with three narrowings that match the
 * browser's own:
 *
 * - `touch-action` between the touch target and a scroller must allow the
 *   axis, or the browser will not pan that scroller with a finger;
 * - an `overscroll-behavior` other than `auto` on the axis stops the chain at
 *   that scroller (a sheet body with `contain` never scrolls the page);
 * - a finger moving down scrolls content toward its START (scrollTop
 *   decreasing), and horizontally the range follows the writing direction
 *   (RTL `scrollLeft` runs from minus the overflow to zero).
 *
 * Styles are read once per touch, on the first question; scroll offsets are
 * read fresh on every question, since a native scroll moves them.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$isRtlElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/isRtlElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/flatTree.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/scrollView.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/nodeType.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const EDGE_TOLERANCE = 1;
function buildChain(target, readsTouchAction) {
    const doc = target.ownerDocument;
    const view = doc.defaultView;
    if (view == null) {
        return {
            entries: [],
            allowsPan: false
        };
    }
    const root = doc.scrollingElement ?? doc.documentElement;
    const chain = [];
    let allowX = true;
    let allowY = true;
    let reachedRoot = false;
    for(let node = target; node != null; node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parentAcrossShadow"])(node)){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(node)) {
            continue;
        }
        const style = view.getComputedStyle(node);
        if (readsTouchAction) {
            const pans = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseTouchAction"])(style.touchAction || 'auto');
            allowX &&= pans.x;
            allowY &&= pans.y;
        }
        const isRoot = node === root || node === doc.documentElement;
        if (isRoot) {
            reachedRoot = true;
        }
        const overflowX = isRoot ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rootOverflow"])(doc, 'x') : style.overflowX;
        const overflowY = isRoot ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rootOverflow"])(doc, 'y') : style.overflowY;
        const scrollsX = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SCROLLABLE_OVERFLOW"].has(overflowX);
        const scrollsY = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SCROLLABLE_OVERFLOW"].has(overflowY);
        if (scrollsX || scrollsY) {
            const element = isRoot ? root : node;
            const [behaviorX, behaviorY] = overscrollBehavior(style);
            chain.push({
                element,
                x: scrollsX && allowX,
                y: scrollsY && allowY,
                // The writing direction through core's one helper.
                isRtl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$isRtlElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRtlElement"])(element),
                stopsX: behaviorX !== 'auto',
                stopsY: behaviorY !== 'auto'
            });
        }
        if (isRoot) {
            break;
        }
    }
    if (!reachedRoot && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(root)) {
        chain.push({
            element: root,
            x: allowX && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SCROLLABLE_OVERFLOW"].has((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rootOverflow"])(doc, 'x')),
            y: allowY && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SCROLLABLE_OVERFLOW"].has((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rootOverflow"])(doc, 'y')),
            isRtl: false,
            stopsX: false,
            stopsY: false
        });
    }
    return {
        entries: chain,
        allowsPan: allowX || allowY
    };
}
/** `overscroll-behavior` per axis, from the longhands or the shorthand. */ function overscrollBehavior(style) {
    const x = style.overscrollBehaviorX;
    const y = style.overscrollBehaviorY;
    if (x !== '' && y !== '' && x != null && y != null) {
        return [
            x,
            y
        ];
    }
    const [first = 'auto', second = first] = (style.getPropertyValue('overscroll-behavior') || 'auto').trim().split(/\s+/);
    return [
        x || first,
        y || second
    ];
}
function canMoveY(element, dy) {
    if (element.scrollHeight - element.clientHeight <= EDGE_TOLERANCE) {
        return false;
    }
    return dy > 0 ? element.scrollTop > EDGE_TOLERANCE - 0.5 : element.scrollTop < element.scrollHeight - element.clientHeight - EDGE_TOLERANCE + 0.5;
}
function canMoveX(entry, dx) {
    const { element } = entry;
    const overflow = element.scrollWidth - element.clientWidth;
    if (overflow <= EDGE_TOLERANCE) {
        return false;
    }
    const min = entry.isRtl ? -overflow : 0;
    const max = entry.isRtl ? 0 : overflow;
    // A finger moving right drags the content right: scrollLeft decreases.
    return dx > 0 ? element.scrollLeft > min + EDGE_TOLERANCE - 0.5 : element.scrollLeft < max - EDGE_TOLERANCE + 0.5;
}
function canElementScroll(element, dx, dy) {
    const view = element.ownerDocument.defaultView;
    if (view == null) {
        return false;
    }
    const style = view.getComputedStyle(element);
    if (dy !== 0 && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SCROLLABLE_OVERFLOW"].has(style.overflowY) && canMoveY(element, dy)) {
        return true;
    }
    return dx !== 0 && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SCROLLABLE_OVERFLOW"].has(style.overflowX) && canMoveX({
        element,
        isRtl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$isRtlElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRtlElement"])(element)
    }, dx);
}
function createNativeScrollProbe(target, { readsTouchAction = true } = {}) {
    let chain = null;
    const getChain = ()=>{
        chain ??= (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(target) ? buildChain(target, readsTouchAction) : {
            entries: [],
            allowsPan: false
        };
        return chain.entries;
    };
    return {
        canScroll (dx, dy) {
            const ax = Math.abs(dx);
            const ay = Math.abs(dy);
            // The minor axis of a mostly-straight drag is the hand's wobble, not
            // a direction: the browser locks to the major one.
            const considerX = ax > 0 && ax >= ay / 2;
            const considerY = ay > 0 && ay >= ax / 2;
            for (const entry of getChain()){
                if (considerY && entry.y && canMoveY(entry.element, dy)) {
                    return true;
                }
                if (considerX && entry.x && canMoveX(entry, dx)) {
                    return true;
                }
                const stops = (!considerX || entry.stopsX) && (!considerY || entry.stopsY);
                if (stops && (entry.stopsX || entry.stopsY)) {
                    return false;
                }
            }
            return false;
        },
        get allowsNativePan () {
            getChain();
            return chain?.allowsPan === true;
        },
        get isInsideScroller () {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(target) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isInsideScrollView"])(target, {
                readsTouchAction
            });
        }
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/recognizerInternals.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file recognizerInternals.ts
 * @input GestureRecognizer
 * @output internals(recognizer): the members the arena, the host and the
 *   React hooks drive, and RecognizerFamily, the brand the host reads instead
 *   of `instanceof`
 * @position Internal to packages/core/src/gestures; never exported from the
 *   package
 *
 * A recognizer's arena plumbing (its arena, a pending recognition, touch
 * delivery, approved transitions) is `protected` on the class, so the
 * published type offers it to subclasses only. The arena and the host reach
 * it through this view, and so do the React hooks, for the arena an Effect's
 * stop defers its resolution to.
 *
 * SYNC: When modified, update the `protected` members of GestureRecognizer.ts.
 */ /**
 * The kinds of recognizer the host and touch-action treat specially. Each of
 * those classes brands itself (a subclass inherits the brand), so the host
 * never imports a recognizer class: a page ships only the recognizers it
 * constructs.
 */ /** The members of a recognizer only the gesture system calls. */ /** The gesture system's view of `recognizer`. */ __turbopack_context__.s([
    "internals",
    ()=>internals
]);
function internals(recognizer) {
    return recognizer;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/tapWobble.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file tapWobble.ts
 * @input Nothing
 * @output `TAP_WOBBLE`, how far a tap's finger drifts, px
 * @position A leaf module of packages/core/src/gestures. The shared
 *   scroll-edge pan and BottomSheet's pull both leave a touch's moves to the
 *   browser until they reach it.
 */ /**
 * A tap's wobble, px. WebKit ends a touch's click when one of its moves is
 * cancelled. So a pan or a pull leaves moves inside this distance to the
 * browser. Mobile Safari commits its native pan on a kept move this long, so
 * the hold starts at it.
 * @source measured: Mobile Safari, iOS 26.2 simulator (iPhone 17 Pro), HID
 *   swipes down a BottomSheet's list at its top, Nov 9 2026. A kept first
 *   move of 4 px, its later moves cancelled, commits no native pan (3 of 3).
 *   A kept first move of 5 px commits it (4 of 5).
 */ __turbopack_context__.s([
    "TAP_WOBBLE",
    ()=>TAP_WOBBLE
]);
const TAP_WOBBLE = 5;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/touchAction.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "combinedNativeBehavior",
    ()=>combinedNativeBehavior,
    "deriveTouchAction",
    ()=>deriveTouchAction,
    "gestureHostStyle",
    ()=>gestureHostStyle,
    "intersectTouchAction",
    ()=>intersectTouchAction
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file touchAction.ts
 * @input The recognizers attached to one element
 * @output Exports deriveTouchAction (the element's `touch-action`),
 *   gestureHostStyle (the inline style a host sets for its recognizers) and
 *   intersectTouchAction (what both a derived and a caller's value allow).
 *   The selection and callout lock for one held press is the recognizer's
 *   own `selectionLock` (gestures/selectionLock.ts), which the host calls
 * @position Browser negotiation of packages/core/src/gestures, pure so a
 *   server render can emit the same style the client would set
 *
 * `touch-action` is decided when the finger lands and cannot change during
 * the gesture, so it must say up front what the browser may still do: the
 * intersection of what every recognizer on the element leaves it.
 *
 * - A tap or long press only removes double-tap zoom (`manipulation`): no
 *   300 ms click delay, scrolling and pinch-zoom untouched.
 * - A one-axis pan or swipe gives the browser the other axis.
 * - A pan that coordinates with native scrolling (`scrollEdge`) keeps both
 *   axes: who gets the drag is decided once, when it begins, and a drag the
 *   browser began scrolling stays the browser's to the lift (`spec:AST-094`
 *   FR14).
 * - `pinch-zoom` stays in every value unless a pinch recognizer is attached,
 *   so the page stays zoomable (WCAG 1.4.4).
 *
 * WebKit pans a drag with any vertical component even under `pan-y`, so the
 * value alone does not protect a horizontal pan there: the host also cancels
 * `touchmove` while a recognizer owns the touch (see GestureHost.ts).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/recognizerInternals.js [app-ssr] (ecmascript)");
;
function combinedNativeBehavior(recognizers) {
    let panX = true;
    let panY = true;
    let pinchZoom = true;
    let doubleTapZoom = true;
    for (const recognizer of recognizers){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer).acceptsTouchInput || !recognizer.claimsTouches) {
            continue;
        }
        const behavior = recognizer.nativeTouchBehavior;
        panX &&= behavior.panX;
        panY &&= behavior.panY;
        pinchZoom &&= behavior.pinchZoom;
        doubleTapZoom &&= behavior.doubleTapZoom;
    }
    return {
        panX,
        panY,
        pinchZoom,
        doubleTapZoom
    };
}
function deriveTouchAction(recognizers) {
    const behavior = combinedNativeBehavior(recognizers);
    if (behavior.panX && behavior.panY && behavior.pinchZoom && behavior.doubleTapZoom) {
        return null;
    }
    if (behavior.panX && behavior.panY && behavior.pinchZoom) {
        return 'manipulation';
    }
    const tokens = [];
    if (behavior.panX) {
        tokens.push('pan-x');
    }
    if (behavior.panY) {
        tokens.push('pan-y');
    }
    if (behavior.pinchZoom) {
        tokens.push('pinch-zoom');
    }
    return tokens.length === 0 ? 'none' : tokens.join(' ');
}
function gestureHostStyle(recognizers) {
    const style = {};
    const touchAction = deriveTouchAction(recognizers);
    if (touchAction != null) {
        style.touchAction = touchAction;
    }
    return style;
}
/** What a `touch-action` value lets the browser do, as tokens. */ const ALL_PANS = [
    'pan-left',
    'pan-right',
    'pan-up',
    'pan-down',
    'pinch-zoom'
];
function touchActionTokens(value) {
    const parts = value.trim().split(/\s+/).filter((part)=>part !== '');
    const tokens = new Set();
    if (parts.length === 0) {
        parts.push('auto');
    }
    for (const part of parts){
        if (part === 'auto') {
            ALL_PANS.forEach((token)=>tokens.add(token));
            tokens.add('double-tap-zoom');
        } else if (part === 'manipulation') {
            ALL_PANS.forEach((token)=>tokens.add(token));
        } else if (part === 'pan-x') {
            tokens.add('pan-left').add('pan-right');
        } else if (part === 'pan-y') {
            tokens.add('pan-up').add('pan-down');
        } else if (ALL_PANS.includes(part)) {
            tokens.add(part);
        }
    }
    return tokens;
}
function intersectTouchAction(derived, caller) {
    const own = touchActionTokens(caller);
    const both = new Set([
        ...touchActionTokens(derived)
    ].filter((token)=>own.has(token)));
    if (ALL_PANS.every((token)=>both.has(token))) {
        return both.has('double-tap-zoom') ? 'auto' : 'manipulation';
    }
    const parts = [];
    for (const [axis, start, end] of [
        [
            'pan-x',
            'pan-left',
            'pan-right'
        ],
        [
            'pan-y',
            'pan-up',
            'pan-down'
        ]
    ]){
        if (both.has(start) && both.has(end)) {
            parts.push(axis);
        } else if (both.has(start)) {
            parts.push(start);
        } else if (both.has(end)) {
            parts.push(end);
        }
    }
    if (both.has('pinch-zoom')) {
        parts.push('pinch-zoom');
    }
    return parts.length === 0 ? 'none' : parts.join(' ');
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/touchActionRule.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file touchActionRule.ts
 * @input An element and the touch-action its recognizers derive
 * @output Exports markTouchAction and unmarkTouchAction: the element carries
 *   the derived value in TOUCH_ACTION_ATTRIBUTE, and its document or shadow
 *   root holds one zero-specificity rule per value in the first cascade
 *   layer (`reset`), so any author rule, in any layer or none, or inline
 *   value outranks the host's (`spec:AST-094` FR18, DEC-8); a root's rules
 *   go with its last marked element (FR24)
 * @position The gesture host's touch-action writer (GestureHost.ts)
 *
 * The mark is set as a recognizer attaches, so a subtree that mounts with
 * it is styled once with its touch-action: a value written after that first
 * styling restyles every descendant (each one's effective touch-action
 * changes). Until the host reads the element's own value, the value in
 * force is the author's where the author sets one, and the derived value
 * elsewhere: never wider than the author's.
 *
 * SYNC: When modified, update GestureHost.ts.
 */ /** The attribute that carries the host's derived touch-action. */ __turbopack_context__.s([
    "TOUCH_ACTION_ATTRIBUTE",
    ()=>TOUCH_ACTION_ATTRIBUTE,
    "markTouchAction",
    ()=>markTouchAction,
    "unmarkTouchAction",
    ()=>unmarkTouchAction
]);
const TOUCH_ACTION_ATTRIBUTE = 'data-astryx-touch-action';
/**
 * The cascade layer the rules sit in: the first in the order every package
 * stylesheet declares (`spec:AST-080` FR3), so an author rule in any later
 * layer, or in none, outranks them. Unlayered, they would outrank every
 * layered author rule.
 */ const RULE_LAYER = 'reset';
/**
 * Per document or shadow root: the values it has a rule for, their rules'
 * text, where that text goes (an adopted sheet, or a style element where
 * constructable sheets are missing), and the elements marked there. The
 * rules go with the root's last marked element (`spec:AST-094` FR24).
 */ const sheets = new WeakMap();
/** Where each marked element's rule lives, for its unmark after it leaves. */ const markedRoots = new WeakMap();
function sheetOf(root) {
    let entry = sheets.get(root);
    if (entry == null) {
        const doc = root.nodeType === 9 ? root : root.ownerDocument;
        let write;
        let remove;
        // A constructable sheet where the engine has one; a style element only
        // where it has none, so any other error from a sheet is not hidden.
        const Sheet = doc?.defaultView?.CSSStyleSheet;
        if (typeof Sheet === 'function' && 'replaceSync' in Sheet.prototype && 'adoptedStyleSheets' in root) {
            const sheet = new Sheet();
            root.adoptedStyleSheets = [
                ...root.adoptedStyleSheets,
                sheet
            ];
            write = (css)=>sheet.replaceSync(css);
            remove = ()=>{
                root.adoptedStyleSheets = root.adoptedStyleSheets.filter((adopted)=>adopted !== sheet);
            };
        } else {
            const style = doc?.createElement('style');
            const parent = root.nodeType === 9 ? doc?.head ?? doc?.documentElement : root;
            if (style != null && parent != null) {
                parent.append(style);
                write = (css)=>{
                    style.textContent = css;
                };
                remove = ()=>style.remove();
            }
        }
        if (write == null || remove == null) {
            return null;
        }
        entry = {
            values: new Set(),
            marked: new Set(),
            css: '',
            write,
            remove
        };
        sheets.set(root, entry);
    }
    return entry;
}
function markTouchAction(element, value) {
    const root = element.getRootNode();
    const entry = element.isConnected && (root.nodeType === 9 || 'host' in root) ? sheetOf(root) : null;
    if (entry == null) {
        return false;
    }
    if (!entry.values.has(value)) {
        entry.values.add(value);
        entry.css += `:where([${TOUCH_ACTION_ATTRIBUTE}="${value}"]){touch-action:${value}}`;
        entry.write(`@layer ${RULE_LAYER}{${entry.css}}`);
    }
    if (element.getAttribute(TOUCH_ACTION_ATTRIBUTE) !== value) {
        element.setAttribute(TOUCH_ACTION_ATTRIBUTE, value);
    }
    const previous = markedRoots.get(element);
    if (previous != null && previous !== root) {
        // Moved to another root: the old one lets it go.
        releaseMark(element, previous);
    }
    entry.marked.add(element);
    markedRoots.set(element, root);
    return true;
}
/** `root` no longer holds `element`'s mark; its last mark takes the rules. */ function releaseMark(element, root) {
    const entry = sheets.get(root);
    if (entry == null) {
        return;
    }
    entry.marked.delete(element);
    if (entry.marked.size === 0) {
        entry.remove();
        sheets.delete(root);
    }
}
function unmarkTouchAction(element) {
    element.removeAttribute(TOUCH_ACTION_ATTRIBUTE);
    const root = markedRoots.get(element);
    if (root == null) {
        return;
    }
    markedRoots.delete(element);
    releaseMark(element, root);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/types.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_ENVIRONMENT",
    ()=>DEFAULT_ENVIRONMENT
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file types.ts
 * @input Nothing
 * @output Exports the data the gesture system passes around: recognizer
 *   states, pointer kinds, touches (UITouch), the per-event context, the
 *   environment a host provides, and the view-level touch consumer contract
 * @position Shared vocabulary of packages/core/src/gestures; no runtime code
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/nodeType.js [app-ssr] (ecmascript)");
;
const DEFAULT_ENVIRONMENT = {
    viewportSize () {
        if ("TURBOPACK compile-time truthy", 1) {
            return {
                width: 0,
                height: 0
            };
        }
        //TURBOPACK unreachable
        ;
    },
    isRtl (view) {
        if (("TURBOPACK compile-time value", "undefined") === 'undefined' || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(view)) {
            return false;
        }
        //TURBOPACK unreachable
        ;
    },
    viewRect (view) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(view)) {
            return null;
        }
        const { left, top, width, height } = view.getBoundingClientRect();
        return {
            left,
            top,
            width,
            height
        };
    }
}; /**
 * A view-level touch consumer: what UIKit delivers `touchesBegan` /
 * `touchesEnded` to when no gesture recognizer takes the touch (a UIControl).
 * The arena delivers through it, honoring `delaysTouchesBegan`,
 * `delaysTouchesEnded` and `cancelsTouchesInView`.
 */ 
}),
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/useGestureRecognizer.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGestureRecognizer",
    ()=>useGestureRecognizer
]);
/**
 * @file useGestureRecognizer.ts
 * @input An element ref, a recognizer factory and a gesture listener
 * @output Exports useGestureRecognizer (usePressTracker lives in
 *   usePressTracker.ts, so a gesture-only component never imports the press
 *   tracker)
 * @position React face of packages/core/src/gestures
 *
 * The recognizer is created once and keeps its identity for the life of the
 * component, so relationships set up at creation (`requireToFail`,
 * `recognizeSimultaneouslyWith`) hold. The listener is read through a ref:
 * passing a new function each render re-attaches nothing, and a gesture
 * costs no React render at all — the listener runs inside the input event
 * and writes to the DOM itself. The recognizer attaches in a layout effect,
 * so its `touch-action` is in place before the browser can see a finger, and
 * re-attaches on any commit that finds another element behind the ref. After
 * unmount neither hook calls the consumer back.
 *
 * SYNC: When modified, update useGestureRecognizer.test.tsx and README.md.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsomorphicLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureHost$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/GestureHost.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAttachment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useAttachment.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$gestureSync$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/gestureSync.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/recognizerInternals.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
;
;
;
/**
 * Runs `body` with the recognizer's arena leaving what it unblocks to the
 * next pass, outside the Effect (GestureArena.deferResolution). A recognizer
 * that has met no touch has no arena, and nothing waits on it.
 */ function deferringResolution(recognizer, body) {
    const { arena } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$recognizerInternals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["internals"])(recognizer);
    if (arena == null) {
        body();
        return;
    }
    arena.deferResolution(body);
}
function useGestureRecognizer(ref, create, onGesture, options = {}) {
    const [recognizer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(create);
    const onGestureRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(onGesture);
    // Syncs the listener's ref with the caller's newest callback.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        onGestureRef.current = onGesture;
    });
    const { isEnabled = true, manageStyle = true, perEventPointer = false, actionGroup = false } = options;
    const isUnmountedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$gestureSync$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsUnmountedRef"])();
    // Syncs the recognizer's target-action listener with this component. The
    // listener runs inside input events, never during a render or an Effect,
    // and goes quiet once the component unmounts.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>recognizer.addListener((current)=>{
            if (!isUnmountedRef.current && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$gestureSync$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSyncingGestures"])()) {
                onGestureRef.current?.(current);
            }
        }), [
        recognizer,
        isUnmountedRef
    ]);
    // Syncs the recognizer's `isEnabled` with the option. It runs first,
    // under the guard, so disabling cancels a gesture in flight before its
    // attachment goes.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$gestureSync$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncingGestures"])(()=>{
            deferringResolution(recognizer, ()=>{
                recognizer.setEnabled(isEnabled);
            });
        });
    }, [
        recognizer,
        isEnabled
    ]);
    // Syncs the document's gesture host with the element behind `ref`. A
    // disabled gesture is not attached at all: no listener and no
    // `touch-action` of its own on the element (spec:AST-094 FR24). A replaced
    // node is released and the new one attached; detaching cancels a gesture in
    // progress from a layout effect, and that cancel reaches no caller callback
    // (react-component-runtime INV2, INV3).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAttachment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAttachment"])(ref, (element)=>{
        if (!isEnabled) {
            return ()=>{};
        }
        const detach = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureHost$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGestureHost"])(element.ownerDocument).attach(element, recognizer, {
            manageStyle,
            perEventPointer,
            actionGroup
        });
        return ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$gestureSync$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncingGestures"])(()=>deferringResolution(recognizer, detach));
        };
    }, `${manageStyle}:${perEventPointer}:${isEnabled}:${actionGroup}`);
    return recognizer;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/usePressTracker.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePressTracker",
    ()=>usePressTracker
]);
/**
 * @file usePressTracker.ts
 * @input An element ref and press tracker options
 * @output Exports usePressTracker
 * @position React face of packages/core/src/gestures' PressTracker, in its
 *   own module so a component that only recognizes gestures never imports
 *   the press tracker
 *
 * The callbacks and the profile are read through refs: one tracker serves
 * the component's life, so a profile change applies from the tracker's next
 * read and never ends a press in progress. After unmount the tracker calls
 * nothing back.
 *
 * SYNC: When modified, update useGestureRecognizer.test.tsx and README.md.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsomorphicLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/gestures.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureHost$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/GestureHost.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$PressTracker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/PressTracker.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAttachment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useAttachment.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$gestureSync$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/gestureSync.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
;
;
;
;
function usePressTracker(ref, options = {}) {
    const optionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(options);
    // True while an Effect releases the tracker, so the press it ends reaches
    // no caller callback.
    const isReleasingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // The ref is read through a ref too: a caller may pass a new ref object
    // on a render, and the one tracker must follow it.
    const refRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(ref);
    // Syncs the options and ref refs with the newest render.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        optionsRef.current = options;
        refRef.current = ref;
    });
    const isUnmountedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$gestureSync$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsUnmountedRef"])();
    const { perEventPointer = false } = options;
    // Calls a caller callback: never while an Effect releases the tracker or
    // after unmount. While any gesture hook's isEnabled sync runs (turning off
    // a recognizer the press waits on resolves the press in that arena pass,
    // inside the Effect), the call waits for a microtask after it, in order,
    // so the press still ends, un-highlighted, outside the Effect
    // (react-component-runtime INV2).
    const [deliver] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(call)=>{
            if (isReleasingRef.current || isUnmountedRef.current) {
                return;
            }
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$gestureSync$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSyncingGestures"])()) {
                call();
                return;
            }
            queueMicrotask(()=>{
                if (!isUnmountedRef.current) {
                    call();
                }
            });
        });
    // One tracker for the component's life, reading its profile through the
    // options ref: a profile change never rebuilds it, so a press in progress
    // survives it (the change applies from the tracker's next read).
    // `keepsTouch` is the exception, fixed when the tracker is created: it
    // decides whether the host gives the element a blocking touchmove.
    const [tracker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$PressTracker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPressTracker"])({
            getBounds: ()=>{
                const element = refRef.current.current;
                return element == null ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureHost$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGestureHost"])(element.ownerDocument).presentedRect(element);
            },
            get view () {
                return refRef.current.current;
            },
            onControlEvent: (event, touch)=>deliver(()=>optionsRef.current.onControlEvent?.(event, touch)),
            onHighlightChange: (isHighlighted)=>deliver(()=>optionsRef.current.onHighlightChange?.(isHighlighted)),
            trackingExpansion: options.trackingExpansion,
            get highlightDelay () {
                return optionsRef.current.highlightDelay;
            },
            get cancelTravel () {
                return optionsRef.current.cancelTravel;
            },
            get quickTapFlash () {
                return optionsRef.current.quickTapFlash;
            },
            keepsTouch: options.keepsTouch,
            get selectionLock () {
                return optionsRef.current.selectionLock;
            },
            // The caller's veto, read on every touch, else the tracker's own.
            vetoesAncestorRecognizer: (recognizer)=>(optionsRef.current.vetoesAncestorRecognizer ?? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$PressTracker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["vetoesSingleTap"])(recognizer),
            isEnabled: ()=>optionsRef.current.isEnabled?.() ?? true,
            holdsContextMenu: (id)=>optionsRef.current.holdsContextMenu?.(id) === true,
            // The caller's brake, or the host's: a touch that stops a flick
            // presses nothing, as a UIKit control in a decelerating scroll view.
            isBraking: (touch)=>{
                const own = optionsRef.current.isBraking;
                if (own != null) {
                    return own(touch);
                }
                const element = refRef.current.current;
                return element != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureHost$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGestureHost"])(element.ownerDocument).isScrollBraking(element);
            }
        }));
    const { trackingExpansion } = options;
    // Syncs the tracker's tracking expansion with the option.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        tracker.trackingExpansion = trackingExpansion ?? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIKIT_CONTROL"].trackingExpansion.value;
    }, [
        tracker,
        trackingExpansion
    ]);
    // Syncs the host's press consumer with the element behind `ref`.
    // Releasing the element (a replaced node, unmount) disposes the press,
    // which un-highlights a control it was holding.
    const attachment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            tracker,
            perEventPointer
        }), [
        tracker,
        perEventPointer
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAttachment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAttachment"])(ref, (element)=>{
        const detach = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureHost$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGestureHost"])(element.ownerDocument).attachConsumer(element, attachment.tracker, {
            perEventPointer: attachment.perEventPointer
        });
        return ()=>{
            isReleasingRef.current = true;
            try {
                detach();
                tracker.dispose();
            } finally{
                isReleasingRef.current = false;
            }
        };
    }, attachment);
    // Syncs the host's listeners with the tracker's enabled state, which can
    // change with any render: the host listens only while an enabled control
    // is attached (spec:AST-094 FR24). A control disabled under a finger ends
    // that press here, inside the release guard: a disabled control tracks no
    // touch, and this Effect calls back no caller, whether the host stops
    // listening or another control keeps it listening.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        const element = refRef.current.current;
        isReleasingRef.current = true;
        try {
            if (tracker.isTracking && !(optionsRef.current.isEnabled?.() ?? true)) {
                tracker.dispose();
            }
            if (element != null) {
                // The update's arena pass can settle other recognizers and trackers
                // too: it runs as a gesture sync, so none calls its caller back from
                // this Effect.
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$gestureSync$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncingGestures"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureHost$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGestureHost"])(element.ownerDocument).update(element));
            }
        } finally{
            isReleasingRef.current = false;
        }
    });
    return tracker;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/gestures/wheelSegmenter.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WheelSegmenter",
    ()=>WheelSegmenter,
    "isBunched",
    ()=>isBunched
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file wheelSegmenter.ts
 * @input A wheel stream's deltas along one axis, with their event times
 * @output Exports WheelSegmenter and isBunched. WheelSegmenter splits the
 *   stream into gestures and reads a trackpad's lift (the onset of momentum).
 *   It keeps a trackpad's late or merged glide wheels in their flick.
 *   isBunched tells one stall's merge from a frame.
 * @position Read by GestureHost.ts's wheel input: the web reports no
 *   trackpad contact or phase, so both are inferred.
 */ /** Momentum arrives at frame rate: a pause this long ends it. */ const MOMENTUM_GAP_MS = 50;
/**
 * A wheel this close to the one before, ms, is one stall's merge. Frames come
 * further apart at every display rate up to 500 Hz, which is 2 ms.
 */ const BUNCHED_MS = 1.5;
/** Shrinking deltas in a row before the lift is read. */ const LIFT_RUN = 4;
/** And how much of its size the run has lost by then. */ const LIFT_DECAY = 0.8;
/** How near a wheel must lie to a sum of the glide's next steps, px. */ const FIT_PX = 1;
/** Or as a share of that sum, when the share is larger. */ const FIT_SHARE = 0.25;
/** The most glide steps one wheel is read as carrying. */ const MAX_STEPS = 64;
/** How near a late or rising wheel must lie to the glide's sum, as a share. */ const LATE_FIT_SHARE = 0.15;
/**
 * How far a wheel may grow past the last unbunched one and still be the
 * glide, px.
 */ const RISE_PX = 0.5;
/** A stream's frame interval until it shows its own, ms. */ const FRAME_MS = 16;
/** The longest frame interval a trackpad reports at: 60 Hz, ms. */ const SLOWEST_FRAME_MS = 1000 / 60;
/** The intervals that set a gesture's frame before its window applies. */ const FIRST_PACES = 3;
function isBunched(intervalMs) {
    return intervalMs <= BUNCHED_MS;
}
class WheelSegmenter {
    gesture = 0;
    phase = 'finger';
    last = -Infinity;
    previous = 0;
    sign = 0;
    count = 0;
    run = 0;
    runStart = 0;
    /** The decay's step-to-step ratio, from the last two one-step wheels. */ ratio = 1;
    /** The gesture's last on-pace intervals, ms: their median is its frame. */ paces = [];
    /** The intervals in a row that came slower than the frame allows, ms. */ slower = [];
    /** When the gesture's last wheel within two frames of the one before came. */ onPace = -Infinity;
    /** The gesture's last wheel that was not bunched, px. */ paced = 0;
    /** A wheel joined the glide late: a later one that grows is the fingers'. */ resumed = false;
    /**
   * The signed travel of the last wheel that joined the glide late, with any
   * wheel merged with it.
   */ joined = 0;
    /**
   * Reads one wheel. `continuous` is whether it carries a trackpad's
   * signature (`scrollTypeOf`). Only those wheels can join a glide late.
   */ push(time, delta, idleMs, continuous = false) {
        const size = Math.abs(delta);
        const sign = Math.sign(delta);
        const gap = time - this.last;
        const bunched = this.count > 0 && isBunched(gap);
        const frame = this.frameMs();
        let boundary = null;
        let carriedSteps = null;
        if (this.count === 0) {
            boundary = this.gesture === 0 ? 'first' : 'idle';
        } else if (this.phase === 'finger' && gap >= idleMs) {
            boundary = 'idle';
        } else if (this.phase === 'momentum') {
            // A late wheel carries the steps of its whole stall, which began at the
            // last wheel that came on pace.
            const frames = Math.round((time - this.onPace) / frame);
            const late = gap >= MOMENTUM_GAP_MS;
            const rises = !bunched && size >= 2 && size > this.previous * 1.3 + 0.5;
            if (sign !== 0 && this.sign !== 0 && sign !== this.sign) {
                boundary = 'reversal';
            } else if (late || rises) {
                // A wheel that rises on pace is the fingers'. One that rises after a
                // skipped frame may carry the frames its stall held.
                if (continuous && sign === this.sign && (late || gap >= 1.5 * frame)) {
                    carriedSteps = this.glideSteps(size, Math.max(1, frames), LATE_FIT_SHARE);
                }
                if (carriedSteps == null) {
                    boundary = late ? 'gap' : 'jump';
                }
            } else if (continuous && this.resumed && !bunched && size > FIT_PX && size > this.paced + RISE_PX) {
                // A glide only falls, so after a late wheel one that grows is the
                // fingers'. A whole-pixel glide repeats a step as it slows.
                boundary = 'jump';
            }
        }
        if (carriedSteps == null && boundary == null && bunched && continuous) {
            if (this.phase === 'momentum') {
                carriedSteps = this.glideSteps(size, MAX_STEPS);
            } else if (this.run > 0) {
                // In a shrinking run, the decay reads a merge only where it explains
                // the merge better than steady steps do.
                const decay = this.glideSteps(size, MAX_STEPS);
                if (decay != null && decay > 1 && Math.abs(size - this.glideSum(decay)) < this.steadyOff(size)) {
                    carriedSteps = decay;
                }
            }
        }
        // A bunched wheel carries the steps of the frames it merged. The decay
        // goes on from its last step, so the steps after it read as they are.
        const steps = carriedSteps ?? (boundary == null && bunched && this.previous > 0 ? Math.max(1, Math.round(size / this.previous)) : 1);
        // On the decay, a wheel of several steps ends at the decay's own step.
        const onDecay = carriedSteps != null && carriedSteps > 1;
        // A bunched wheel is read by its last step, as the decay goes on from it.
        const step = onDecay ? this.previous * this.ratio ** steps : size / steps;
        if (boundary != null) {
            this.gesture += 1;
            this.phase = 'finger';
            this.count = 0;
            this.run = 0;
            this.ratio = 1;
            this.resumed = false;
            this.paces = [];
            this.slower = [];
        }
        // The late wheel was the fingers' when the next one grows: the new
        // gesture takes its travel.
        const carried = boundary === 'jump' ? this.joined : 0;
        const joinedLate = boundary == null && carriedSteps != null && !bunched;
        if (joinedLate) {
            this.resumed = true;
        }
        // A wheel merged with the late one is the same dispatch: it adds to it.
        this.joined = joinedLate ? delta : bunched && boundary == null && this.joined !== 0 ? this.joined + delta : 0;
        if (!bunched) {
            this.paced = size;
        }
        let liftNow = false;
        let decaying = false;
        if (this.phase === 'finger' && this.count >= 3 && size > 0) {
            decaying = onDecay ? this.ratio <= 0.995 : step <= this.previous * 0.995 && step >= this.previous * 0.5;
            if (decaying) {
                if (this.run === 0) {
                    this.runStart = this.previous;
                }
                this.run += 1;
            } else {
                this.run = 0;
            }
            if (this.run >= LIFT_RUN && step <= this.runStart * LIFT_DECAY) {
                this.phase = 'momentum';
                liftNow = true;
            }
        }
        if (steps === 1 && this.count > 0 && this.previous > 0 && step > 0) {
            this.ratio = Math.min(1, Math.max(0.5, step / this.previous));
        }
        if (!bunched && boundary == null && gap < MOMENTUM_GAP_MS) {
            this.notePace(gap, frame);
        }
        if (boundary != null || !bunched && gap < 2 * frame) {
            this.onPace = time;
        }
        this.count += 1;
        this.previous = step;
        if (sign !== 0) {
            this.sign = sign;
        }
        this.last = time;
        return {
            boundary,
            phase: this.phase,
            gesture: this.gesture,
            liftNow,
            decaying: decaying && !liftNow,
            bunched: boundary == null && bunched,
            carried
        };
    }
    /**
   * Keep an interval for the frame. The gesture's first FIRST_PACES set it.
   * After them, only an interval within half a frame and one and a half
   * frames counts: a stall's squeezed wheels come faster. FIRST_PACES slower
   * intervals in a row set the frame again, so a squeezed start cannot hold
   * it down.
   */ notePace(gap, frame) {
        const inWindow = gap >= 0.5 * frame && gap <= 1.5 * frame;
        if (this.paces.length < FIRST_PACES || inWindow) {
            this.paces = [
                ...this.paces.slice(-7),
                gap
            ];
            this.slower = [];
            return;
        }
        this.slower = gap > 1.5 * frame ? [
            ...this.slower,
            gap
        ] : [];
        if (this.slower.length >= FIRST_PACES) {
            this.paces = this.slower;
            this.slower = [];
        }
    }
    /**
   * The gesture's frame interval: the median of its last on-pace intervals,
   * or FRAME_MS before it shows one. A trackpad reports at 60 Hz or faster,
   * so a longer median is a stall's.
   */ frameMs() {
        if (this.paces.length === 0) {
            return FRAME_MS;
        }
        const sorted = [
            ...this.paces
        ].sort((a, b)=>a - b);
        const middle = sorted.length >> 1;
        const median = sorted.length % 2 === 1 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
        return Math.min(median, SLOWEST_FRAME_MS);
    }
    /** The sum of the decay's next `count` steps from `previous`. */ glideSum(count) {
        let next = this.previous * this.ratio;
        let sum = 0;
        for(let i = 0; i < count; i++){
            sum += next;
            next *= this.ratio;
        }
        return sum;
    }
    /**
   * How far a merge of `size` lies from whole steps of the run's steady
   * size, or of its last step, whichever lies nearer.
   */ steadyOff(size) {
        return Math.min(...[
            this.runStart,
            this.previous
        ].filter((step)=>step > 0).map((step)=>Math.abs(size - Math.max(1, Math.round(size / step)) * step)));
    }
    /**
   * How many of the decay's next steps a trackpad wheel of `size` carries,
   * at most `most`. A wheel at or below the next step carries one. A larger
   * one carries the fewest steps whose sum lies within FIT_PX or `share` of
   * it. The decay goes on from `previous` at `ratio` a step. Null when
   * no sum lies that near.
   */ glideSteps(size, most, share = FIT_SHARE) {
        if (this.previous <= 0 || size <= 0) {
            return null;
        }
        let next = this.previous * this.ratio;
        if (size <= next + FIT_PX) {
            return 1;
        }
        let sum = next;
        for(let count = 2; count <= Math.min(most, MAX_STEPS); count++){
            next *= this.ratio;
            sum += next;
            if (Math.abs(size - sum) <= Math.max(FIT_PX, sum * share)) {
                return count;
            }
        }
        return null;
    }
    /** The gesture ended on its own (its timer): the next event starts one. */ end() {
        this.count = 0;
    }
}
}),
];

//# sourceMappingURL=0aq__%40astryxdesign_core_dist_gestures_0yazwwk_3_cy7._.js.map