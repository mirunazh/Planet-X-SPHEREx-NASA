module.exports = [
"[project]/web/node_modules/@astryxdesign/core/dist/utils/browserClickWait.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BROWSER_CLICK_WAIT_MS",
    ()=>BROWSER_CLICK_WAIT_MS,
    "awaitBrowserClick",
    ()=>awaitBrowserClick,
    "clickAndReport",
    ()=>clickAndReport,
    "clickForLift",
    ()=>clickForLift
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file browserClickWait.ts
 * @input An element a tap's lift released on, and the control that acts on
 *   its click
 * @output BROWSER_CLICK_WAIT_MS, awaitBrowserClick, clickForLift and
 *   clickAndReport
 * @position The one wait for the browser's click after a tap, shared by
 *   Switch/useSwitchTouch.ts and SegmentedControl/useSegmentedTouchTracking.ts.
 *   It swallows nothing: utils/clickGuard.ts is the one guard for a late click.
 *
 * SYNC: When modified, update browserClickWait.test.ts.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/clickGuard.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputStream.js [app-ssr] (ecmascript)");
;
;
const BROWSER_CLICK_WAIT_MS = 300;
function awaitBrowserClick(target, { onClicked, onNoClick }) {
    const view = target.ownerDocument.defaultView;
    if (view == null) {
        // A document with no window gets no click: the wait runs out at once.
        let isEnded = false;
        queueMicrotask(()=>{
            if (!isEnded) {
                onNoClick();
            }
        });
        return ()=>{
            isEnded = true;
        };
    }
    let isDone = false;
    let report = null;
    let timer = null;
    let stopListening = null;
    const stop = ()=>{
        isDone = true;
        stopListening?.();
        stopListening = null;
        if (timer != null) {
            view.clearTimeout(timer);
            timer = null;
        }
    };
    stopListening = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'click', (event)=>{
        if (isDone || !event.isTrusted || !target.contains(event.target)) {
            return;
        }
        stop();
        // After every handler has run: was it cancelled?
        report = view.setTimeout(()=>{
            report = null;
            onClicked(event.defaultPrevented);
        }, 0);
    });
    timer = view.setTimeout(()=>{
        if (isDone) {
            return;
        }
        stop();
        onNoClick();
    }, BROWSER_CLICK_WAIT_MS);
    return ()=>{
        stop();
        if (report != null) {
            view.clearTimeout(report);
            report = null;
        }
    };
}
function clickAndReport(element) {
    const view = element.ownerDocument.defaultView;
    let clicked = null;
    const grab = (event)=>{
        if (clicked == null && event.target === element) {
            clicked = event;
        }
    };
    view?.addEventListener('click', grab, true);
    try {
        element.click();
    } finally{
        view?.removeEventListener('click', grab, true);
    }
    return clicked?.defaultPrevented === true;
}
function clickForLift(element) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["armClickGuard"])(element.ownerDocument);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withoutClickGuard"])(()=>clickAndReport(element));
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/chainEventHandlers.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file chainEventHandlers.ts
 * @input Multiple React event handlers (or undefined)
 * @output A single handler that calls every handler in order
 * @position Utility; used where a component's own handler and a consumer
 *   handler share one element and the consumer must observe every event the
 *   component handled, as it did when the consumer's handler sat on an
 *   ancestor and received the event by bubbling.
 *
 * Unlike `composeEventHandlers`, `event.preventDefault()` in an earlier handler
 * does not skip later ones: the component's handler runs first and cannot hide
 * the event from the consumer, and the consumer cannot cancel the component's
 * behavior.
 */ /**
 * Chain event handlers into one. Every handler runs, in argument order.
 *
 * @example
 * ```
 * <input onKeyDown={chainEventHandlers(handleKeyDown, onKeyDownProp)} />
 * ```
 */ __turbopack_context__.s([
    "chainEventHandlers",
    ()=>chainEventHandlers
]);
function chainEventHandlers(...handlers) {
    return (event)=>{
        for (const handler of handlers){
            handler?.(event);
        }
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/clickGuard.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CLICK_GUARD_WINDOW_MS",
    ()=>CLICK_GUARD_WINDOW_MS,
    "__resetClickGuardForTest",
    ()=>__resetClickGuardForTest,
    "armClickGuard",
    ()=>armClickGuard,
    "disarmClickGuard",
    ()=>disarmClickGuard,
    "isClickGuardArmed",
    ()=>isClickGuardArmed,
    "withoutClickGuard",
    ()=>withoutClickGuard
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file clickGuard.ts
 * @input A document whose gesture already acted (a menu row's release, a
 *   touch a gesture recognizer claimed)
 * @output armClickGuard (and its ClickGuardOptions), disarmClickGuard,
 *   isClickGuardArmed, withoutClickGuard and CLICK_GUARD_WINDOW_MS
 * @position The one guard for the browser's click after a gesture that
 *   already acted, shared by hooks/useMenuPress.ts, gestures/GestureHost.ts,
 *   utils/boxHold.ts and the keyboard module's tap route
 *   (keyboard/keyboardHeight.ts)
 *
 * SYNC: When modified, update clickGuard.test.ts, hooks/useMenuPress.ts,
 * gestures/GestureHost.ts and utils/boxHold.ts.
 */ // Armed at a tracked release, the guard swallows the next click on the
// window's capture phase (utils/inputStream.ts), so no framework sees it. It
// disarms on that click, at the next `pointerdown`, or after
// {@link CLICK_GUARD_WINDOW_MS}. After the menu press model arms it, its click
// listener stays, so it keeps its place ahead of window listeners that the
// page adds later (AST-057, AST-094). If only the gesture host arms it, the
// click listener stays only while the guard is armed.
//
// An arm at a claimed touch's lift also takes that touch's late `mousedown`
// and `mouseup`. WebKit sends them a few ms after a held tap's cancelled
// `touchend`, aimed at whatever is under the finger by then. They go with
// the click, the next `pointerdown` or the window, as the guard does.
//
// The menu press model's arm at a finger's release also cancels that touch's
// `touchend`, so the browser creates no click and no compatibility mouse
// events. A busy main thread can otherwise hold that click past the window,
// when a drill-in has put another row under the finger. When the menu names
// the touch by its identifier, another finger's `touchend` passes; a touch it
// could not name keeps the old rule, and the next `touchend` is cancelled.
//
// Some clicks always pass:
// - a click with `detail` 0: a keyboard's, a screen reader's, or one that the
//   page dispatches;
// - a click dispatched inside {@link withoutClickGuard};
// - the hidden haptic switch's click (gestures/haptics.ts).
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$hapticSwitch$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/hapticSwitch.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputStream.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchEndMark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/touchEndMark.js [app-ssr] (ecmascript)");
;
;
;
;
const CLICK_GUARD_WINDOW_MS = 400;
/** Options for {@link armClickGuard}. */ /**
 * The click guard's state, registered, so a swizzled copy guards the same
 * clicks as the package.
 */ const guardState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["realmValue"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedKey"])('click-guard', 1), ()=>({
        guards: new Map(),
        /** The click listeners that stay, by window: the menu press model's. */ stayingClickListeners: new WeakMap(),
        unguardedDepth: 0
    }));
const { guards, stayingClickListeners } = guardState;
/** Listen for the next click on `view`'s capture phase; returns the stop. */ function listenForClicks(view) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'click', (event)=>{
        const doc = view.document;
        if (!guards.has(doc) || isExempt(event)) {
            return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
        disarmClickGuard(doc);
    }, {
        cancels: true
    });
}
function armClickGuard(doc, { staysInstalled = false, takesLateMouse = false, cancelsTouchEnd = false, touchIdentifier } = {}) {
    const view = doc.defaultView;
    if (view == null) {
        return;
    }
    disarmClickGuard(doc);
    const guard = {
        unsubscribers: [],
        timer: null
    };
    if (staysInstalled && !stayingClickListeners.has(view)) {
        stayingClickListeners.set(view, listenForClicks(view));
    }
    if (!stayingClickListeners.has(view)) {
        // The gesture host's arm: the click listener lasts while this guard does.
        guard.unsubscribers.push(listenForClicks(view));
    }
    guards.set(doc, guard);
    guard.unsubscribers.push(// The next press is a new gesture: its click must never be eaten.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'pointerdown', ()=>disarmClickGuard(doc)));
    if (takesLateMouse) {
        for (const type of [
            'mousedown',
            'mouseup'
        ]){
            guard.unsubscribers.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, type, swallowLateMouse, {
                cancels: true
            }));
        }
    }
    if (cancelsTouchEnd) {
        // The release of the gesture in flight then brings no light dismiss.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchEndMark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["markTouchEndCancelled"])();
        // A touch sends its pointerup before its touchend, so without an
        // identifier the next touchend counts as that touch's own. The next
        // pointerdown disarms the guard first.
        const stopTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'touchend', (event)=>{
            if (touchIdentifier != null && !endsTouch(event, touchIdentifier)) {
                // Another finger lifted: leave its touchend.
                return;
            }
            stopTouchEnd();
            // A touchend that the browser took for a scroll is not cancelable.
            // The guard stays armed for a click that may follow it.
            if (event.cancelable) {
                event.preventDefault();
                // No click follows a cancelled touchend.
                disarmClickGuard(doc);
            }
        }, {
            cancels: true
        });
        guard.unsubscribers.push(stopTouchEnd);
    }
    guard.timer = setTimeout(()=>disarmClickGuard(doc), CLICK_GUARD_WINDOW_MS);
}
/**
 * Whether `event` ends the touch `identifier`. A `touchend` without
 * `changedTouches` counts as that touch's own.
 */ function endsTouch(event, identifier) {
    const changed = event.changedTouches;
    if (changed == null) {
        return true;
    }
    return Array.from(changed).some((touch)=>touch.identifier === identifier);
}
function disarmClickGuard(doc) {
    const guard = guards.get(doc);
    if (guard == null) {
        return;
    }
    guards.delete(doc);
    if (guard.timer != null) {
        clearTimeout(guard.timer);
    }
    for (const unsubscribe of guard.unsubscribers){
        unsubscribe();
    }
}
function isClickGuardArmed(doc) {
    return guards.has(doc);
}
function withoutClickGuard(dispatch) {
    guardState.unguardedDepth++;
    try {
        return dispatch();
    } finally{
        guardState.unguardedDepth--;
    }
}
function __resetClickGuardForTest() {
    for (const doc of [
        ...guards.keys()
    ]){
        disarmClickGuard(doc);
    }
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
/** Swallows a claimed touch's late `mousedown` or `mouseup`. */ function swallowLateMouse(event) {
    if (isExempt(event)) {
        return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
}
function isExempt(event) {
    if (event.detail === 0 || guardState.unguardedDepth > 0) {
        return true;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$hapticSwitch$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHapticSwitch"])(event.target);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/composeEventHandlers.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file composeEventHandlers.ts
 * @input Multiple React event handlers (or undefined)
 * @output A single handler that calls each in order, stopping if one prevents default
 * @position Utility; used by components that own an interaction (a click that
 *   selects, a keydown that drives arrow navigation) but also accept a consumer
 *   handler for the same event through {...rest}. Composes them instead of
 *   letting one clobber the other.
 *
 * Order is call order: the first argument runs first. Put the consumer handler
 * first so it can opt out of the component's built-in behavior via
 * `event.preventDefault()`; put the component's handler first when its behavior
 * must always run regardless of the consumer.
 */ /**
 * Compose event handlers into one. Each handler runs in argument order; if any
 * calls `event.preventDefault()`, the remaining handlers are skipped.
 *
 * @example
 * ```tsx
 * // Consumer first: a consumer onClick can preventDefault to block selection.
 * <button onClick={composeEventHandlers(onClickProp, handleSelect)} />
 *
 * // Component first: built-in keyboard nav always runs.
 * <div onKeyDown={composeEventHandlers(handleArrowKeys, onKeyDownProp)} />
 * ```
 */ __turbopack_context__.s([
    "composeEventHandlers",
    ()=>composeEventHandlers
]);
function composeEventHandlers(...handlers) {
    return (event)=>{
        for (const handler of handlers){
            handler?.(event);
            if (event.defaultPrevented) {
                return;
            }
        }
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/disabledInteraction.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file disabledInteraction.ts
 * @input An optional caller keydown handler, or a control's caller props
 * @output Event props that keep a focusable, aria-disabled control inert, and
 *   the caller props such a control hands its element
 * @position Shared by controls that replace native `disabled` with
 *   `aria-disabled` under spec:AST-085 (FR1, FR2)
 */ /**
 * Event props for a disabled control that stays focusable. Native `disabled`
 * dispatched no click at all; without it, Enter and Space still synthesize a
 * click that native listeners on the element (a wrapping Popover's trigger)
 * receive. Cancelling those keys keeps the click from existing, and the click
 * handler cancels pointer clicks and keeps them from reaching ancestors. Other
 * keys still reach the caller's handler.
 */ __turbopack_context__.s([
    "disabledInteractionProps",
    ()=>disabledInteractionProps,
    "withholdCallerHandlers",
    ()=>withholdCallerHandlers
]);
function disabledInteractionProps(onKeyDown) {
    return {
        onClick: (event)=>{
            event.preventDefault();
            event.stopPropagation();
        },
        onKeyDown: (event)=>{
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
            } else {
                onKeyDown?.(event);
            }
        }
    };
}
function withholdCallerHandlers(props, isDisabled) {
    if (!isDisabled) {
        return props;
    }
    return Object.fromEntries(Object.entries(props).filter(([key])=>!/^on[A-Z]/.test(key) || /^on(Focus|Blur)/.test(key)));
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/flatTree.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "containsAlongFlatTree",
    ()=>containsAlongFlatTree,
    "deepActiveElement",
    ()=>deepActiveElement,
    "parentAcrossShadow",
    ()=>parentAcrossShadow,
    "shadowHostOf",
    ()=>shadowHostOf,
    "shadowRootsOutward",
    ()=>shadowRootsOutward
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file flatTree.ts
 * @input A DOM node
 * @output Exports parentAcrossShadow, containsAlongFlatTree, which walks it,
 *   deepActiveElement, shadowHostOf, a shadow root's host, and
 *   shadowRootsOutward
 * @position The flat-tree parent the browser scrolls and dispatches
 *   through. The gesture host's native-scroll probe, the outside-press watch,
 *   the selection lock and the Layer module's input hold share it. The press
 *   feedback controller uses the selection lock without the gesture system
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/nodeType.js [app-ssr] (ecmascript)");
;
function parentAcrossShadow(node) {
    // The flat tree the browser scrolls and dispatches through: a slotted node
    // goes to its slot, a shadow root to its host.
    const slot = node.assignedSlot;
    if (slot != null) {
        return slot;
    }
    if (node.parentNode != null) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isShadowRoot"])(node.parentNode) ? node.parentNode.host : node.parentNode;
    }
    return null;
}
function containsAlongFlatTree(ancestor, node) {
    for(let at = node; at != null; at = parentAcrossShadow(at)){
        if (at === ancestor) {
            return true;
        }
    }
    return false;
}
function deepActiveElement(doc) {
    let active = doc?.activeElement ?? null;
    while(active?.shadowRoot?.activeElement != null){
        active = active.shadowRoot.activeElement;
    }
    return active;
}
function shadowHostOf(node) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isShadowRoot"])(node) ? node.host : null;
}
function shadowRootsOutward(node) {
    const roots = [];
    for(let at = node, host = shadowHostOf(at); host != null; at = host.getRootNode(), host = shadowHostOf(at)){
        roots.push({
            root: at,
            host
        });
    }
    return roots;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/focusOutline.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FOCUS_OUTLINE",
    ()=>FOCUS_OUTLINE,
    "FOCUS_OUTLINE_PARTS",
    ()=>FOCUS_OUTLINE_PARTS,
    "FOCUS_OUTLINE_PARTS_NONE",
    ()=>FOCUS_OUTLINE_PARTS_NONE,
    "focusOutlineProps",
    ()=>focusOutlineProps,
    "focusOutlineStyles",
    ()=>focusOutlineStyles
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file focusOutline.stylex.ts
 * @input Uses StyleX and theme color tokens
 * @output Exports shared focus-outline prop builders
 * @position Internal utility for consistent keyboard focus outlines across core components
 */ // Every ring in core and lab comes from here, except Switch's: its condition
// is a component-scoped ancestor marker, which cannot be shared without
// leaking focus state. A component may override only the offset. The values
// come from the `--focus-outline-*` tokens, so a theme restyles every ring at
// once. The `:focus-visible` condition is not themeable, so a theme cannot
// show the ring to pointer users.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
;
;
;
const FOCUS_OUTLINE_WIDTH = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusVars"]['--focus-outline-width'];
const FOCUS_OUTLINE_STYLE = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusVars"]['--focus-outline-style'];
const FOCUS_OUTLINE_COLOR = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusVars"]['--focus-outline-color'];
const FOCUS_OUTLINE_OFFSET = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusVars"]['--focus-outline-offset'];
const FOCUS_OUTLINE = `${FOCUS_OUTLINE_WIDTH} ${FOCUS_OUTLINE_STYLE} ${FOCUS_OUTLINE_COLOR}`;
/**
 * Written as longhands rather than the `outline` shorthand.
 *
 * A shorthand resets every longhand it covers, so `outline: 2px solid accent`
 * would clobber a later `outlineColor` no matter the order — which is how
 * destructive buttons silently lost their red ring. With longhands, a variant
 * can re-color the ring and inherit width, style and offset.
 */ const focusOutlineLonghands = {
    outlineWidth: FOCUS_OUTLINE_WIDTH,
    outlineStyle: FOCUS_OUTLINE_STYLE,
    outlineColor: FOCUS_OUTLINE_COLOR
};
const FOCUS_OUTLINE_PARTS = {
    outlineWidth: FOCUS_OUTLINE_WIDTH,
    outlineStyle: FOCUS_OUTLINE_STYLE,
    outlineColor: FOCUS_OUTLINE_COLOR,
    outlineOffset: FOCUS_OUTLINE_OFFSET
};
const FOCUS_OUTLINE_PARTS_NONE = {
    outlineWidth: '',
    outlineStyle: '',
    outlineColor: '',
    outlineOffset: ''
};
const focusOutlineStyles = {
    focusVisible: {
        kMeerF: "x1k57tk5 x1vidyx5",
        k3XXqK: "x1t137rt x1jhp3zv",
        kjBf7l: "xx47ajj",
        kInvED: "x1wfwxd8 x1vwwbsn",
        $$css: true
    },
    focusWithin: {
        kMeerF: "x1k57tk5 x11j6mr8",
        k3XXqK: "x1t137rt xciu248",
        kjBf7l: "x1uy843r",
        kInvED: "x1wfwxd8 x1jumodi",
        $$css: true
    },
    focusWithinFirstChild: {
        kMeerF: "x1k57tk5 xmmisi4",
        k3XXqK: "x1t137rt xfd04fr",
        kjBf7l: "xobxmqy",
        kInvED: "x1wfwxd8 x2vr5qc",
        $$css: true
    },
    focusWithinCombobox: {
        kMeerF: "x1k57tk5 x1ufq04b",
        k3XXqK: "x1t137rt x151uj7h",
        kjBf7l: "x4jz7i8",
        kInvED: "x1wfwxd8 x1fz9cfn",
        $$css: true
    },
    suppressed: {
        kMeerF: "x1k57tk5",
        k3XXqK: "x1t137rt",
        kInvED: "x1wfwxd8",
        $$css: true
    },
    publishFocusVisibleVars: {
        "--_focus-outline": "x17wzz1v xqih627",
        "--_focus-outline-offset": "xgzxwq1 xqchwus",
        $$css: true
    },
    focusWithinOrPublished: {
        kI3sdo: "xaw4jrz x16s19ga",
        kInvED: "x1kvmbwa x1jumodi",
        $$css: true
    }
};
// StyleX does not expose a stable public input type for stylex.props();
// keep this helper permissive so it mirrors stylex.props() itself.
function makeFocusOutlineProps(style) {
    return (...styles)=>// Caller styles LAST, so a component can deliberately re-color its ring —
        // destructive buttons ring in error red, not accent. StyleX is last-wins,
        // and reversing this to protect the ring silently ate that override.
        //
        // The hazard in this direction is the opposite one: a caller whose base
        // style carries `outline: 'none'` wipes the ring out entirely (TreeList
        // did, and shipped a focusable row with no visible focus). Two things
        // guard it — this file states the rule, and the ring is written as
        // LONGHANDS, so an override has to name `outlineStyle`/`outlineWidth`
        // explicitly rather than erasing them through the `outline` shorthand.
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](style, ...styles);
}
const focusOutlineProps = {
    focusVisible: makeFocusOutlineProps(focusOutlineStyles.focusVisible),
    focusWithin: makeFocusOutlineProps(focusOutlineStyles.focusWithin),
    focusWithinFirstChild: makeFocusOutlineProps(focusOutlineStyles.focusWithinFirstChild),
    suppressed: makeFocusOutlineProps(focusOutlineStyles.suppressed),
    publishFocusVisibleVars: makeFocusOutlineProps(focusOutlineStyles.publishFocusVisibleVars),
    focusWithinOrPublished: makeFocusOutlineProps(focusOutlineStyles.focusWithinOrPublished)
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/hitArea.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HIT_INSET_PROPERTIES",
    ()=>HIT_INSET_PROPERTIES,
    "INTERACTIVE_SELECTOR",
    ()=>INTERACTIVE_SELECTOR,
    "MIN_TOUCH_TARGET",
    ()=>MIN_TOUCH_TARGET,
    "NO_HIT_INSETS",
    ()=>NO_HIT_INSETS,
    "clampedHitInsets",
    ()=>clampedHitInsets,
    "groupGrowth",
    ()=>groupGrowth,
    "resetHitAreaForTests",
    ()=>resetHitAreaForTests,
    "resolveHitTarget",
    ()=>resolveHitTarget,
    "settlingAnimations",
    ()=>settlingAnimations,
    "watchHitArea",
    ()=>watchHitArea,
    "whenSettled",
    ()=>whenSettled,
    "writeHitInsets",
    ()=>writeHitInsets
]);
/**
 * @file hitArea.ts
 * @input A target's rect and its neighbours' rects (or, for a live control,
 *   the element and the page around it)
 * @output The touch hit area: how far a target may grow toward 44 px on each
 *   side without taking a tap that is nearer a neighbour. `clampedHitInsets`
 *   and `resolveHitTarget` answer from rects. `watchHitArea` keeps a control's
 *   insets live where the primary pointer is coarse. `groupGrowth` sizes a
 *   group's box from its edge members, and shrinks a side the members do not
 *   reach. `INTERACTIVE_SELECTOR` names what a touch can land on
 * @position Core-internal utility, not exported from `@astryxdesign/core/utils`.
 *   Groups that measure their actions at press start pass `resolveHitTarget`;
 *   a standalone control writes `watchHitArea`'s insets to an invisible
 *   coarse-only hit layer
 *
 */ // A finger needs a 44 × 44 px target, but a control may not grow on a phone,
// and its hit area must never take a neighbor's taps. Each side grows toward
// the minimum and stops at half the gap to the nearest neighbor on that side,
// so a tap always goes to the nearer target. CSS cannot see the neighbors, so a
// live control measures: only under a coarse primary pointer (AST-094), only on
// screen, and in one read pass per frame within a 4 ms budget. Until the first
// pass the insets are 0, so first paint never overlaps anything.
// The insets are lengths in the control's own box, so a pass measures in its
// layout px. A layer that opens from a smaller scale then keeps the insets of
// the size it settles at.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputStream.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/nodeType.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedMutationObserver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedMutationObserver.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
;
const MIN_TOUCH_TARGET = 44;
const NO_HIT_INSETS = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};
const HIT_INSET_PROPERTIES = {
    top: '--astryx-hit-inset-top',
    right: '--astryx-hit-inset-right',
    bottom: '--astryx-hit-inset-bottom',
    left: '--astryx-hit-inset-left'
};
/**
 * The gap between two rects along each axis: positive where they are apart on
 * that axis, negative where their projections overlap.
 */ function gaps(a, b) {
    return {
        x: Math.max(b.left - a.right, a.left - b.right),
        y: Math.max(b.top - a.bottom, a.top - b.bottom)
    };
}
function grown(rect, insets) {
    return {
        left: rect.left - insets.left,
        top: rect.top - insets.top,
        right: rect.right + insets.right,
        bottom: rect.bottom + insets.bottom
    };
}
function intersects(a, b) {
    return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
}
/** How far `rect` grows toward `minSize` on each axis, centered, unclamped. */ function growth(rect, minSize) {
    const x = Math.max(0, (minSize - (rect.right - rect.left)) / 2);
    const y = Math.max(0, (minSize - (rect.bottom - rect.top)) / 2);
    return {
        top: y,
        right: x,
        bottom: y,
        left: x
    };
}
function groupGrowth(group, members, minSize = MIN_TOUCH_TARGET) {
    if (members.length === 0) {
        return NO_HIT_INSETS;
    }
    const insets = {
        top: -Infinity,
        right: -Infinity,
        bottom: -Infinity,
        left: -Infinity
    };
    for (const member of members){
        const own = growth(member, minSize);
        insets.top = Math.max(insets.top, own.top - (member.top - group.top));
        insets.right = Math.max(insets.right, own.right - (group.right - member.right));
        insets.bottom = Math.max(insets.bottom, own.bottom - (group.bottom - member.bottom));
        insets.left = Math.max(insets.left, own.left - (member.left - group.left));
    }
    return insets;
}
function clampedHitInsets(target, neighbours, minSize = MIN_TOUCH_TARGET, full = growth(target, minSize)) {
    if (full.top === 0 && full.right === 0 && full.bottom === 0 && full.left === 0) {
        return NO_HIT_INSETS;
    }
    const insets = {
        ...full
    };
    for (const rect of neighbours){
        const gap = gaps(target, rect);
        if (gap.x < 0 && gap.y < 0) {
            continue;
        }
        // Each one's half of the gap: a tap there is nearer that one.
        const half = {
            top: Math.max(0, gap.y) / 2,
            right: Math.max(0, gap.x) / 2,
            bottom: Math.max(0, gap.y) / 2,
            left: Math.max(0, gap.x) / 2
        };
        // Either one, at full growth, would reach into the other's half, or
        // their full areas would meet (a wide and a tall target, diagonally).
        const reach = grown(target, full);
        const neighbourReach = grown(rect, growth(rect, minSize));
        const crosses = intersects(reach, grown(rect, half)) || intersects(neighbourReach, grown(target, half)) || intersects(reach, neighbourReach);
        if (!crosses) {
            continue;
        }
        if (gap.x >= gap.y) {
            if (rect.left >= target.right) {
                insets.right = Math.min(insets.right, half.right);
            } else {
                insets.left = Math.min(insets.left, half.left);
            }
        } else {
            if (rect.top >= target.bottom) {
                insets.bottom = Math.min(insets.bottom, half.bottom);
            } else {
                insets.top = Math.min(insets.top, half.top);
            }
        }
    }
    return insets;
}
function contains(rect, x, y) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}
function distanceTo(rect, x, y) {
    const dx = Math.max(rect.left - x, 0, x - rect.right);
    const dy = Math.max(rect.top - y, 0, y - rect.bottom);
    return Math.hypot(dx, dy);
}
function resolveHitTarget(x, y, rects, minSize = MIN_TOUCH_TARGET) {
    let nearest = -1;
    let nearestDistance = Infinity;
    rects.forEach((rect, index)=>{
        const distance = distanceTo(rect, x, y) * 1e6 + Math.hypot(x - (rect.left + rect.right) / 2, y - (rect.top + rect.bottom) / 2);
        if (distance < nearestDistance) {
            nearest = index;
            nearestDistance = distance;
        }
    });
    if (nearest === -1) {
        return -1;
    }
    const rect = rects[nearest];
    return contains(grown(rect, growth(rect, minSize)), x, y) ? nearest : -1;
}
function writeHitInsets(element, insets) {
    for (const side of [
        'top',
        'right',
        'bottom',
        'left'
    ]){
        element.style.setProperty(HIT_INSET_PROPERTIES[side], `${insets[side]}px`);
    }
}
const INTERACTIVE_SELECTOR = [
    'a[href]',
    'area[href]',
    'button',
    'input:not([type="hidden"])',
    'select',
    'textarea',
    'summary',
    'label[for]',
    '[contenteditable=""]',
    '[contenteditable="true"]',
    '[role="button"]',
    '[role="link"]',
    '[role="checkbox"]',
    '[role="radio"]',
    '[role="switch"]',
    '[role="tab"]',
    '[role="menuitem"]',
    '[role="menuitemcheckbox"]',
    '[role="menuitemradio"]',
    '[role="treeitem"]',
    '[role="combobox"]',
    '[role="textbox"]',
    '[role="searchbox"]',
    '[role="spinbutton"]',
    '[role="option"]',
    '[role="slider"]',
    '[tabindex]:not([tabindex="-1"])'
].join(',');
const TOUCH_QUERY = '(pointer: coarse)';
/**
 * How long one frame's pass may spend on controls, ms, after its one read of
 * the page: a page appearing with hundreds of controls spreads over a few
 * frames instead of one long task.
 */ const FRAME_BUDGET_MS = 4;
/**
 * How long a control's parent must stay still after a text or child change
 * before its controls re-measure, ms: a label or link beside a control can
 * move without resizing the control or its parent.
 */ const CONTENT_SETTLE_MS = 100;
/**
 * How long the page must go without a scroll event before a pass runs, ms,
 * where the browser sends no `scrollend`.
 */ const SCROLL_STILL_MS = 150;
const PASSIVE_CAPTURE = {
    capture: true,
    passive: true
};
/**
 * The mutations that can change which elements `INTERACTIVE_SELECTOR`
 * matches: elements added, removed or moved, and the attributes it reads.
 */ const CANDIDATE_MUTATIONS = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: [
        'href',
        'type',
        'for',
        'contenteditable',
        'role',
        'tabindex'
    ]
};
function now() {
    return typeof performance === 'undefined' ? Date.now() : performance.now();
}
/** Each watched element: its watches, and what observes it while coarse. */ const watched = new Map();
const pending = new Set();
const observedSizes = new WeakMap();
const scopeTimers = new Map();
let frame = null;
let view = null;
/** The document the shared press listener is on, while it is on one. */ let pressDocument = null;
let pointer = null;
let visibility = null;
let resize = null;
let isCoarse = false;
/**
 * The page's interactive elements. An added subtree, an attribute change or
 * a watch change updates them, and a read drops the elements that left the
 * page. So the page is matched only once.
 */ let interactive = null;
let interactiveDocument = null;
let stopInteractiveWatch = null;
/**
 * The page's scroll gate, one for every copy of Core. It knows whether the
 * page is scrolling, from a scroll to its end or a still beat. Each copy that
 * observes adds what it runs as the scroll ends.
 */ const scrollGate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedState"])('utils/hit-area/scroll-gate', 1, ()=>({
        isScrolling: false,
        timer: undefined,
        stop: null,
        onEnd: new Set()
    }));
function stopWatchingInteractive() {
    stopInteractiveWatch?.();
    stopInteractiveWatch = null;
    interactiveDocument = null;
    interactive = null;
}
function sameInsets(a, b) {
    return a.top === b.top && a.right === b.right && a.bottom === b.bottom && a.left === b.left;
}
function deliver(watch, insets) {
    if (sameInsets(watch.last, insets)) {
        return;
    }
    watch.last = insets;
    watch.onInsets(insets);
}
/** Whether `candidate` is the control itself, or part of it. */ function isOwn(watch, candidate) {
    const { element } = watch;
    if (candidate === element || candidate.contains(element) || element.contains(candidate)) {
        return true;
    }
    // The control's own <label for> toggles it: not a neighbour.
    const control = candidate.control;
    return control != null && element.contains(control);
}
/**
 * An element's client rect as a plain object: the pass compares every control
 * with every candidate, and a DOMRect's getters cost far more than fields.
 */ function plainRect(element) {
    const { left, top, right, bottom } = element.getBoundingClientRect();
    return {
        left,
        top,
        right,
        bottom
    };
}
/** A box that the transforms around it leave at its layout size. */ const UNSCALED = {
    x: 1,
    y: 1
};
/** One axis of a box's scale on screen: its client size over its layout size. */ function axisScale(onScreen, layout) {
    if (!(layout > 0) || !(onScreen > 0)) {
        return 1;
    }
    const scale = onScreen / layout;
    // Within rounding of 1 the box is at its layout size: no change to the rects.
    return Math.abs(scale - 1) < 1e-3 ? 1 : scale;
}
/**
 * How far the transforms around `element` scale its box on screen, per axis.
 * A layer that opens from a smaller scale scales every rect inside it, while
 * the layout box keeps the size the layer settles at. Only a scale is
 * expected: a rotated or skewed box would read as a larger scale.
 */ function screenScale(element, onScreen) {
    // The offset size is the layout size in whole pixels, unaffected by
    // transforms, and costs no style resolution. A box with none, such as an SVG
    // element or a jsdom box, reads as unscaled.
    const box = element;
    const offsetWidth = box.offsetWidth ?? 0;
    const offsetHeight = box.offsetHeight ?? 0;
    if (offsetWidth === 0 || offsetHeight === 0) {
        return UNSCALED;
    }
    // Within a pixel of its layout size the box reads as unscaled, which bounds
    // the inset error at about a pixel. Only a box that a transform shrinks or
    // grows reads its exact size from the computed style.
    if (Math.abs(onScreen.right - onScreen.left - offsetWidth) <= 1 && Math.abs(onScreen.bottom - onScreen.top - offsetHeight) <= 1) {
        return UNSCALED;
    }
    const style = element.ownerDocument.defaultView?.getComputedStyle(element);
    if (style == null || !style.width.endsWith('px')) {
        return UNSCALED;
    }
    const px = (value)=>Number.parseFloat(value) || 0;
    const isContentBox = style.boxSizing !== 'border-box';
    const width = px(style.width) + (isContentBox ? px(style.paddingLeft) + px(style.paddingRight) + px(style.borderLeftWidth) + px(style.borderRightWidth) : 0);
    const height = px(style.height) + (isContentBox ? px(style.paddingTop) + px(style.paddingBottom) + px(style.borderTopWidth) + px(style.borderBottomWidth) : 0);
    return {
        x: axisScale(onScreen.right - onScreen.left, width),
        y: axisScale(onScreen.bottom - onScreen.top, height)
    };
}
/**
 * `rect` in the layout px of the box at `origin`: its offset from `origin`,
 * divided by that box's scale on screen.
 */ function inLayout(rect, origin, scale) {
    if (scale.x === 1 && scale.y === 1) {
        return rect;
    }
    return {
        left: origin.left + (rect.left - origin.left) / scale.x,
        top: origin.top + (rect.top - origin.top) / scale.y,
        right: origin.left + (rect.right - origin.left) / scale.x,
        bottom: origin.top + (rect.bottom - origin.top) / scale.y
    };
}
/** The watched element `element` belongs to, if any (itself included). */ function watchedOwner(element) {
    for(let node = element; node != null; node = node.parentElement){
        if (watched.has(node)) {
            return node;
        }
    }
    return null;
}
/**
 * The page's interactive elements. A watched control counts by its own box,
 * never by a part inside it (its invisible input is grown by its hit area,
 * which must not shrink a neighbour's).
 */ function interactiveElements(doc) {
    if (typeof MutationObserver === 'undefined') {
        // Nothing reports a change, so nothing is kept.
        interactive = null;
    } else if (interactiveDocument !== doc) {
        stopWatchingInteractive();
        interactiveDocument = doc;
        stopInteractiveWatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedMutationObserver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["observeMutations"])(doc, CANDIDATE_MUTATIONS, updateInteractive);
    } else {
        // A mutation earlier in this task is not delivered yet.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedMutationObserver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flushMutations"])(CANDIDATE_MUTATIONS);
    }
    if (interactive != null) {
        // A removed element leaves the list here, at the next read.
        for (const element of interactive){
            if (!element.isConnected) {
                interactive.delete(element);
            }
        }
        return [
            ...interactive
        ];
    }
    const elements = new Set();
    addMatches(elements, doc);
    interactive = elements;
    return [
        ...elements
    ];
}
/** Adds the interactive elements in `root`, each as its watched owner. */ function addMatches(kept, root) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(root) && root.matches(INTERACTIVE_SELECTOR)) {
        kept.add(watchedOwner(root) ?? root);
    }
    for (const found of root.querySelectorAll(INTERACTIVE_SELECTOR)){
        kept.add(watchedOwner(found) ?? found);
    }
}
/**
 * Keeps the list current from one batch of mutations: an added subtree is
 * matched alone, and an element that the selector stops matching leaves.
 */ function updateInteractive(records) {
    const kept = interactive;
    if (kept == null) {
        return;
    }
    for (const record of records){
        if (record.type !== 'attributes') {
            record.addedNodes.forEach((node)=>{
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(node)) {
                    addMatches(kept, node);
                }
            });
            continue;
        }
        const { target } = record;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(target)) {
            continue;
        }
        if (target.matches(INTERACTIVE_SELECTOR)) {
            kept.add(watchedOwner(target) ?? target);
        } else if (!watched.has(target)) {
            kept.delete(target);
        }
    }
}
/** Whether a watched element counts by its own box for anything in it. */ function ownsAMatch(owner) {
    if (owner.matches(INTERACTIVE_SELECTOR)) {
        return true;
    }
    for (const found of owner.querySelectorAll(INTERACTIVE_SELECTOR)){
        if (watchedOwner(found) === owner) {
            return true;
        }
    }
    return false;
}
/** A newly watched element: what it holds now counts by its box. */ function regroup(element) {
    const kept = interactive;
    if (kept == null) {
        return;
    }
    for (const found of element.querySelectorAll(INTERACTIVE_SELECTOR)){
        kept.delete(found);
    }
    addMatches(kept, element);
    // An outer watch that counted only for what `element` holds stops counting.
    const outer = element.parentElement == null ? null : watchedOwner(element.parentElement);
    if (outer != null && kept.has(outer) && !ownsAMatch(outer)) {
        kept.delete(outer);
    }
}
/** An element no longer watched: what it held counts by its own box again. */ function ungroup(element) {
    const kept = interactive;
    if (kept == null) {
        return;
    }
    kept.delete(element);
    addMatches(kept, element);
}
/** The page's interactive elements and their rects: one read. */ function readCandidates(doc) {
    return interactiveElements(doc).map((element)=>({
            element,
            rect: plainRect(element)
        }));
}
/** A control's rect and clamped insets, from candidates already read. */ function measureOne(watch, candidates) {
    const target = plainRect(watch.element);
    const scale = screenScale(watch.element, target);
    // Two targets each growing up to half the minimum reach each other from a
    // minimum apart.
    const reach = Math.max(0, watch.minSize);
    const band = grown(target, {
        top: reach * scale.y,
        right: reach * scale.x,
        bottom: reach * scale.y,
        left: reach * scale.x
    });
    const neighbours = candidates.filter(({ element, rect })=>rect.right > rect.left && rect.bottom > rect.top && intersects(band, rect) && !isOwn(watch, element)).map(({ rect })=>rect);
    return {
        target,
        // The insets are in the control's layout px. The returned rects stay in
        // screen px for a touch's distance checks. A neighbour maps by the
        // control's scale, as if it is in the same layer. A neighbour outside that
        // layer then reads farther away. A touch compares screen distances, so it
        // still counts that neighbour.
        insets: clampedHitInsets(inLayout(target, target, scale), neighbours.map((rect)=>inLayout(rect, target, scale)), watch.minSize, watch.growth?.(inLayout(target, target, scale), (rect)=>inLayout(rect, target, scale))),
        neighbours
    };
}
function settlingAnimations(root) {
    if (typeof root.getAnimations !== 'function') {
        return [];
    }
    const animations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(root) ? root.getAnimations({
        subtree: true
    }) : root.getAnimations();
    return animations.filter((animation)=>{
        if (animation.playState !== 'running' && animation.playState !== 'paused') {
            return false;
        }
        const end = animation.effect?.getComputedTiming().endTime;
        return typeof end === 'number' && Number.isFinite(end);
    });
}
/** The properties whose animation moves or resizes a box on screen. */ const BOX_MOTION = /^(transform|translate|scale|rotate|offset[A-Z]\w*|inset\w*|top|right|bottom|left|(min|max)?(Width|Height|width|height|BlockSize|InlineSize)|blockSize|inlineSize|margin\w*|padding\w*)$/;
/**
 * Whether an animation can move or resize a box on screen. Its keyframes'
 * properties tell: a fade or a color change moves nothing.
 */ function movesBoxes(animation) {
    const effect = animation.effect;
    if (typeof effect?.getKeyframes !== 'function') {
        return true;
    }
    return effect.getKeyframes().some((frame)=>Object.keys(frame).some((key)=>BOX_MOTION.test(key)));
}
/**
 * The animations in `doc` that move boxes now: running and finite, on a
 * property that moves or resizes a box. A paused one holds still, which an
 * app can leave paused, and a fade or a tint moves nothing. The pass and the
 * click's check read the same motion.
 */ function movingAnimations(doc) {
    return settlingAnimations(doc).filter((animation)=>animation.playState === 'running' && movesBoxes(animation));
}
function whenSettled(animations, then) {
    void Promise.allSettled(animations.map(async (animation)=>animation.finished)).then(then);
}
/**
 * Whether a running animation on an ancestor holds the watch back. It moves
 * the control, so a read now takes a box in motion. The watch is measured
 * once each such animation ends. The control's own motion, such as a press's
 * scale, is its owner's to wait out.
 */ function isHeldBack(watch, moving) {
    let isHeld = false;
    for (const animation of moving){
        const target = animation.effect?.target;
        if (target == null || target === watch.element || !target.contains(watch.element)) {
            continue;
        }
        isHeld = true;
        if (!watch.heldBy.has(animation)) {
            watch.heldBy.add(animation);
            whenSettled([
                animation
            ], ()=>{
                watch.heldBy.delete(animation);
                if (watch.isVisible && watched.get(watch.element)?.watches.has(watch)) {
                    schedule(watch);
                }
            });
        }
    }
    return isHeld;
}
/** One pass: every pending control's reads, then every write. */ function measure() {
    frame = null;
    if (scrollGate.isScrolling) {
        // The pending watches wait: the scroll's end asks for the frame.
        return;
    }
    const visible = [
        ...pending
    ].filter((watch)=>watch.isVisible);
    pending.clear();
    if (!isCoarse || visible.length === 0) {
        return;
    }
    const doc = visible[0].element.ownerDocument;
    const moving = movingAnimations(doc);
    const due = visible.filter((watch)=>!isHeldBack(watch, moving));
    if (due.length === 0) {
        return;
    }
    // Reads: the page's interactive elements once for the whole pass.
    const candidates = readCandidates(doc);
    // The budget is for the controls: the page read above is once a frame.
    const started = now();
    const results = [];
    for (const watch of due){
        // At least one control a frame; past the budget the rest wait for the
        // next frame, their insets still 0 (safe) until measured.
        if (results.length > 0 && now() - started > FRAME_BUDGET_MS) {
            pending.add(watch);
            continue;
        }
        results.push({
            watch,
            insets: measureOne(watch, candidates).insets
        });
    }
    // Writes.
    for (const { watch, insets } of results){
        deliver(watch, insets);
    }
    if (pending.size > 0) {
        requestFrame();
    }
}
function requestFrame() {
    if (frame == null && !scrollGate.isScrolling && typeof requestAnimationFrame === 'function') {
        frame = requestAnimationFrame(measure);
    }
}
function onScroll() {
    scrollGate.isScrolling = true;
    if (scrollGate.timer !== undefined) {
        clearTimeout(scrollGate.timer);
    }
    scrollGate.timer = setTimeout(endScroll, SCROLL_STILL_MS);
}
function endScroll() {
    if (scrollGate.timer !== undefined) {
        clearTimeout(scrollGate.timer);
        scrollGate.timer = undefined;
    }
    if (!scrollGate.isScrolling) {
        return;
    }
    scrollGate.isScrolling = false;
    for (const resume of [
        ...scrollGate.onEnd
    ]){
        resume();
    }
}
/** This copy's pass, once the page's scroll ends. */ function resumeAfterScroll() {
    if (pending.size > 0) {
        requestFrame();
    }
}
function schedule(watch) {
    if (!isCoarse) {
        return;
    }
    pending.add(watch);
    requestFrame();
}
function scheduleAll() {
    for (const entry of watched.values()){
        entry.watches.forEach(schedule);
    }
}
/**
 * At a touch's start, arm a check on the control it landed on. The touch's
 * click re-measures the control, or the press does while an animation moves
 * it. If a neighbour moved nearer since the last measurement, the click is
 * swallowed: the tap does nothing rather than toggle the wrong control.
 * Nothing is re-sent to the neighbour, and the next tap uses the fresh
 * insets. A watch whose owner reads its own targets when a press begins skips
 * this (`checkAtPress`).
 */ function onPress(event) {
    // One listener on the document for every watched control, so a control, row
    // or handle has none of its own (AST-103 FR5). The innermost watched element
    // that the press lands in is the one it is for.
    for(let node = event.target instanceof Element ? event.target : null; node != null; node = node.parentElement){
        if (watched.has(node)) {
            checkPress(node, event);
            return;
        }
    }
}
function checkPress(element, event) {
    const entry = watched.get(element);
    if (entry == null) {
        return;
    }
    // A check left from a touch that sent no click goes with the next one.
    entry.disarm?.();
    if (!isCoarse || event.pointerType !== 'touch') {
        return;
    }
    const checked = [
        ...entry.watches
    ].filter((watch)=>watch.checkAtPress);
    if (checked.length === 0) {
        return;
    }
    const press = {
        x: event.clientX,
        y: event.clientY,
        target: event.target
    };
    // A control that an ancestor animation moves is measured now. By its
    // click, its box is no longer where the finger landed.
    const isMoving = checked.some((watch)=>watch.heldBy.size > 0);
    const isNearerAtPress = isMoving && isNearerNeighbour(element, entry, checked, press, readCandidates(element.ownerDocument));
    if (isMoving && !isNearerAtPress) {
        return;
    }
    // A control at rest reads no layout at the press, so a scroll it starts
    // never waits on a read. Its click comes only once the touch is a tap, and
    // measures then.
    const check = (click)=>{
        disarm();
        // A keyboard or assistive-technology activation (detail 0) is never
        // this touch's click: it goes through.
        if (click.detail === 0) {
            return;
        }
        if (isNearerAtPress || isNearerAtClick(element, entry, checked, press)) {
            click.preventDefault();
            click.stopPropagation();
        }
    };
    const doc = element.ownerDocument;
    let stopNextPress = null;
    const disarm = ()=>{
        element.removeEventListener('click', check, true);
        element.removeEventListener('pointercancel', disarm, true);
        stopNextPress?.();
        stopNextPress = null;
        if (entry.disarm === disarm) {
            entry.disarm = null;
        }
    };
    element.addEventListener('click', check, true);
    // A touch the browser takes (a scroll) sends no click.
    element.addEventListener('pointercancel', disarm, true);
    // Any next press, here or elsewhere (the control's own label), ends it.
    // This press has already passed the window, so only a later press does.
    const pageView = doc.defaultView;
    if (pageView != null) {
        stopNextPress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(pageView, 'pointerdown', disarm);
    }
    entry.disarm = disarm;
}
/**
 * The control's box on screen without its own scale transform, such as a
 * press's. The scale is about the box's center, so the center stays.
 */ function withoutOwnScale(element, onScreen) {
    const transform = element.ownerDocument.defaultView?.getComputedStyle(element).transform;
    const scale = /^matrix\(([^,]+),[^,]+,[^,]+,([^,]+),/.exec(transform ?? '');
    if (scale == null) {
        return onScreen;
    }
    const scaleX = Number.parseFloat(scale[1]);
    const scaleY = Number.parseFloat(scale[2]);
    if (!(scaleX > 0) || !(scaleY > 0)) {
        return onScreen;
    }
    const centerX = (onScreen.left + onScreen.right) / 2;
    const centerY = (onScreen.top + onScreen.bottom) / 2;
    const halfWidth = (onScreen.right - onScreen.left) / scaleX / 2;
    const halfHeight = (onScreen.bottom - onScreen.top) / scaleY / 2;
    return {
        left: centerX - halfWidth,
        top: centerY - halfHeight,
        right: centerX + halfWidth,
        bottom: centerY + halfHeight
    };
}
/** Measures the watch in a pass once the control's own motion has ended. */ function scheduleAtRest(watch) {
    const { element } = watch;
    const moving = settlingAnimations(element);
    if (moving.length === 0) {
        schedule(watch);
        return;
    }
    whenSettled(moving, ()=>{
        if (watched.get(element)?.watches.has(watch)) {
            schedule(watch);
        }
    });
}
/**
 * Whether a fresh measurement puts the press nearer a neighbour than the
 * control. A press on content that the control paints past its box is the
 * control's.
 */ function isNearerNeighbour(element, entry, checked, press, candidates) {
    // The touch is the control's unless a neighbour is nearer it: inside the
    // fresh area too (a corner beside an offset or diagonal neighbour), and
    // a few px past it, where a browser's own touch adjustment reaches.
    let isNearer = false;
    for (const watch of checked){
        const { target, insets, neighbours } = measureOne(watch, candidates);
        const own = distanceTo(withoutOwnScale(watch.element, target), press.x, press.y);
        isNearer ||= neighbours.some((rect)=>distanceTo(rect, press.x, press.y) < own);
        // The press still scales the control, so these insets read a scaled box.
        // A pass after the press's motion ends takes the insets instead.
        if (!sameInsets(watch.last, insets)) {
            scheduleAtRest(watch);
        }
    }
    // A watch can own its descendants' touches. Then a press that the browser
    // hit-tests onto a descendant lands on content the element paints, even
    // past its own box. A swipe panel's entry beside a moved row is such
    // content. That touch is the element's.
    const isOnOwnContent = [
        ...entry.watches
    ].some((watch)=>watch.ownsDescendantTouches) && press.target instanceof Node && press.target !== element && element.contains(press.target);
    return isNearer && !isOnOwnContent;
}
/**
 * Whether a fresh measurement at a touch's click puts the press nearer a
 * neighbour than the control.
 */ function isNearerAtClick(element, entry, checked, press) {
    const doc = element.ownerDocument;
    // The touch landed before its click. An animation that the press did not
    // see may have moved the control or a neighbour since. Its fresh box is
    // not the one the finger landed on. The control's click then goes through,
    // as the browser's hit test took it, and a moving neighbour is left out.
    const moving = movingAnimations(doc);
    const isMoved = (node, isOwnMotionCounted)=>moving.some((animation)=>{
            const target = animation.effect?.target;
            return target != null && target.contains(node) && (isOwnMotionCounted || target !== node);
        });
    if (isMoved(element, false)) {
        return false;
    }
    const candidates = readCandidates(doc).filter((candidate)=>!isMoved(candidate.element, true));
    return isNearerNeighbour(element, entry, checked, press, candidates);
}
function onScopeChange(scope) {
    const timer = scopeTimers.get(scope);
    if (timer != null) {
        clearTimeout(timer);
    }
    scopeTimers.set(scope, setTimeout(()=>{
        scopeTimers.delete(scope);
        for (const [element, entry] of watched){
            if (element.parentElement === scope) {
                entry.watches.forEach(schedule);
            }
        }
    }, CONTENT_SETTLE_MS));
}
/** Starts observing one element; only while the pointer is coarse. */ function observe(element, entry) {
    const parent = element.parentElement;
    visibility?.observe(element);
    resize?.observe(element);
    if (parent != null) {
        resize?.observe(parent);
    }
    const stopScope = parent == null ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedMutationObserver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["observeContent"])(parent, ()=>onScopeChange(parent));
    entry.release = ()=>{
        visibility?.unobserve(element);
        resize?.unobserve(element);
        const parentShared = [
            ...watched.keys()
        ].some((other)=>other !== element && other.parentElement === parent);
        if (parent != null && !parentShared) {
            resize?.unobserve(parent);
            const timer = scopeTimers.get(parent);
            if (timer != null) {
                clearTimeout(timer);
                scopeTimers.delete(parent);
            }
        }
        stopScope?.();
        entry.disarm?.();
    };
}
/**
 * Everything that watches the page for hit areas is on only while the
 * primary pointer is coarse, so a mouse page runs no observer, timer or
 * listener for them.
 */ function startObserving() {
    if (view == null) {
        return;
    }
    view.addEventListener('resize', scheduleAll);
    // The first copy to observe listens for the page; the others share it.
    if (scrollGate.stop == null) {
        const stopScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'scroll', onScroll);
        const stopScrollEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'scrollend', endScroll);
        scrollGate.stop = ()=>{
            stopScroll();
            stopScrollEnd();
        };
    }
    scrollGate.onEnd.add(resumeAfterScroll);
    pressDocument = view.document;
    pressDocument.addEventListener('pointerdown', onPress, PASSIVE_CAPTURE);
    if (typeof IntersectionObserver === 'function') {
        visibility = new IntersectionObserver((entries)=>{
            for (const entry of entries){
                watched.get(entry.target)?.watches.forEach((watch)=>{
                    watch.isVisible = entry.isIntersecting;
                    if (watch.isVisible) {
                        schedule(watch);
                    } else {
                        pending.delete(watch);
                    }
                });
            }
        });
    }
    if (typeof ResizeObserver === 'function') {
        resize = new ResizeObserver((entries)=>{
            for (const entry of entries){
                // The first notice of an element is its observation, not a resize:
                // the control's first measurement is already pending.
                const { width, height } = entry.contentRect;
                const size = `${width}x${height}`;
                const last = observedSizes.get(entry.target);
                observedSizes.set(entry.target, size);
                if (last === undefined || last === size) {
                    continue;
                }
                for (const [element, item] of watched){
                    if (element === entry.target || element.parentElement === entry.target) {
                        item.watches.forEach(schedule);
                    }
                }
            }
        });
    }
    for (const [element, entry] of watched){
        // Without IntersectionObserver every control counts as on screen.
        entry.watches.forEach((watch)=>{
            watch.isVisible = visibility == null;
        });
        observe(element, entry);
        if (visibility == null) {
            entry.watches.forEach(schedule);
        }
    }
}
function stopObserving() {
    for (const entry of watched.values()){
        entry.release?.();
        entry.release = null;
    }
    view?.removeEventListener('resize', scheduleAll);
    scrollGate.onEnd.delete(resumeAfterScroll);
    // The last copy to stop observing ends the page's listening.
    if (scrollGate.onEnd.size === 0) {
        scrollGate.stop?.();
        scrollGate.stop = null;
        if (scrollGate.timer !== undefined) {
            clearTimeout(scrollGate.timer);
            scrollGate.timer = undefined;
        }
        scrollGate.isScrolling = false;
    }
    // The listener leaves the document it went on. A window can close first, as
    // a removed iframe's, and then it has no document to read.
    pressDocument?.removeEventListener('pointerdown', onPress, PASSIVE_CAPTURE);
    pressDocument = null;
    visibility?.disconnect();
    resize?.disconnect();
    visibility = null;
    resize = null;
    scopeTimers.forEach((timer)=>clearTimeout(timer));
    scopeTimers.clear();
    stopWatchingInteractive();
    if (frame != null && typeof cancelAnimationFrame === 'function') {
        cancelAnimationFrame(frame);
    }
    frame = null;
    pending.clear();
}
function onPointerChange() {
    const next = pointer?.matches ?? false;
    if (next === isCoarse) {
        return;
    }
    isCoarse = next;
    if (isCoarse) {
        startObserving();
        return;
    }
    stopObserving();
    for (const entry of watched.values()){
        entry.watches.forEach((watch)=>deliver(watch, NO_HIT_INSETS));
    }
}
function resetHitAreaForTests() {
    stopObserving();
    for (const entry of watched.values()){
        entry.disarm?.();
    }
    watched.clear();
    pending.clear();
    pointer?.removeEventListener('change', onPointerChange);
    pointer = null;
    view = null;
    isCoarse = false;
}
function watchHitArea(element, onInsets, { minSize = MIN_TOUCH_TARGET, ownsDescendantTouches = false, growth: growthOf, checkAtPress = true } = {}) {
    const owner = element.ownerDocument.defaultView;
    if (owner == null) {
        return ()=>{};
    }
    view = owner;
    // Read the pointer query at every watch, not only the first: an
    // environment that replaces matchMedia (a test) must not leave a stale
    // answer behind from a watch that never stopped.
    const query = owner.matchMedia?.(TOUCH_QUERY) ?? null;
    if (query !== pointer) {
        pointer?.removeEventListener('change', onPointerChange);
        pointer = query;
        pointer?.addEventListener('change', onPointerChange);
    }
    onPointerChange();
    const watch = {
        element,
        minSize,
        ownsDescendantTouches,
        growth: growthOf,
        checkAtPress,
        onInsets,
        isVisible: isCoarse && visibility == null,
        last: NO_HIT_INSETS,
        heldBy: new Set()
    };
    let entry = watched.get(element);
    if (entry == null) {
        entry = {
            watches: new Set(),
            release: null,
            disarm: null
        };
        watched.set(element, entry);
        regroup(element);
        entry.watches.add(watch);
        if (isCoarse) {
            observe(element, entry);
        }
    } else {
        // Another watch of an observed element: as visible as the first.
        watch.isVisible = [
            ...entry.watches
        ][0]?.isVisible ?? watch.isVisible;
        entry.watches.add(watch);
    }
    if (watch.isVisible) {
        schedule(watch);
    }
    return ()=>{
        const own = watched.get(element);
        if (own == null || !own.watches.delete(watch)) {
            return;
        }
        pending.delete(watch);
        if (own.watches.size === 0) {
            own.release?.();
            watched.delete(element);
            ungroup(element);
        }
        if (watched.size === 0) {
            stopObserving();
            pointer?.removeEventListener('change', onPointerChange);
            pointer = null;
            view = null;
            isCoarse = false;
        }
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/ime.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isImeKeyEvent",
    ()=>isImeKeyEvent
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file ime.ts
 * @input A keyboard event (a React event's `nativeEvent`, or a native DOM
 *   KeyboardEvent) with optional `isComposing` and `keyCode`
 * @output `isImeKeyEvent`: whether a keydown is part of an IME composition and
 *   must not act as a command
 * @position Shared low-level utility for every surface that handles Enter,
 *   Escape or arrows in `onKeyDown`
 */ // During IME composition (Korean, Japanese, Chinese), the browser fires a
// keydown to commit or cancel the composition before `compositionend`. A
// plain handler sees Enter or Escape and runs a command mid-composition. So
// return early on a composing keydown. Do not explain this again at call
// sites.
//
// Both signals are needed. `isComposing` is the standard signal. keyCode 229
// is the legacy fallback: some IMEs and older Safari send the composing
// keydown with `isComposing` not yet true, but with keyCode 229. Do not drop
// it without a browser-matrix audit.
//
// Prefer the native event (`e.nativeEvent`) from React handlers. The
// parameter is structurally typed, so both event shapes work. `keyCode` is
// deprecated in the DOM types but is still present at runtime.
/**
 * The sentinel `keyCode` that browsers report while an IME processes a key
 * event. See the note above for why this legacy signal stays.
 */ const IME_PROCESSING_KEY_CODE = 229;
function isImeKeyEvent(event) {
    return event.isComposing === true || event.keyCode === IME_PROCESSING_KEY_CODE;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/inputAge.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clockOf",
    ()=>clockOf,
    "msSinceInput",
    ()=>msSinceInput,
    "timeOn",
    ()=>timeOn
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file inputAge.ts
 * @input An input's time stamp, and its event or the node it landed on
 * @output clockOf, timeOn and msSinceInput: the clock of the window that
 *   stamped an input, its time on that clock, and how long ago it happened
 * @position Internal utility. The content-touch delay (utils/pressFeedback.ts,
 *   gestures/PressTracker.ts) and the long-press hold
 *   (hooks/longPressDetector.ts) count from the touch with it.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/nodeType.js [app-ssr] (ecmascript)");
;
function clockOf(source) {
    const view = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(source) ? ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDocument"])(source) ? source : source.ownerDocument)?.defaultView : source?.view;
    return view?.performance ?? (typeof performance === 'undefined' ? null : performance);
}
function timeOn(clock, timeStamp) {
    // A stamp of 0 means the event carries no time, so a delay falls back to
    // its full length on the page's timer.
    if (timeStamp == null || !Number.isFinite(timeStamp) || timeStamp <= 0) {
        return undefined;
    }
    if (clock != null && Math.abs(Date.now() - timeStamp) < Math.abs(clock.now() - timeStamp)) {
        return clock.now() - (Date.now() - timeStamp);
    }
    return timeStamp;
}
function msSinceInput(time, source) {
    const clock = clockOf(source);
    const at = timeOn(clock, time);
    return clock == null || at == null ? 0 : Math.max(0, clock.now() - at);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/inputAria.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file inputAria.ts
 * @input Receives input label/description IDs and optional InputGroup context
 * @output Exports getInputARIA and joinAriaIDs for consistent input ARIA composition
 * @position Internal utility; used by inputs that compose labels/descriptions
 */ __turbopack_context__.s([
    "getInputARIA",
    ()=>getInputARIA,
    "joinAriaIDs",
    ()=>joinAriaIDs
]);
function joinAriaIDs(...values) {
    const ids = values.flatMap((value)=>typeof value === 'string' ? value.trim().split(/\s+/) : []).filter(Boolean);
    if (ids.length === 0) {
        return undefined;
    }
    return Array.from(new Set(ids)).join(' ');
}
function getInputARIA(labelID, describedByIDs = [], inputGroup) {
    return {
        ariaLabelledBy: inputGroup ? joinAriaIDs(inputGroup.labelID, labelID) : undefined,
        ariaDescribedBy: joinAriaIDs(inputGroup?.describedByIDs, ...describedByIDs)
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/inputStream.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDownPresses",
    ()=>getDownPresses,
    "getLastMousePoint",
    ()=>getLastMousePoint,
    "getLastPointerType",
    ()=>getLastPointerType,
    "subscribeInput",
    ()=>subscribeInput
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file inputStream.ts
 * @input A window, and subscribers to its input events (the press feedback
 *   controller, the gesture host)
 * @output subscribeInput, getLastPointerType, getLastMousePoint and
 *   getDownPresses: the type of the latest pointer event the stream
 *   delivered, where the latest mouse one was, and where each finger and pen
 *   press that is down was last
 * @position The one entry for document-wide input listeners in core: one
 *   native listener per event type on the window's capture phase, shared by
 *   every subscriber
 *
 * SYNC: When modified, update inputStream.test.ts.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-ssr] (ecmascript)");
;
// The window's capture phase runs before document listeners, so an app's
// `stopPropagation` there does not hide input from press feedback or the
// gesture host. A claiming recognizer still needs the touch to reach its
// element. A passivity switch or a new first subscriber adds a type's
// listener again. App window-capture listeners added meanwhile then run
// before it. Document events and element
// `scroll` reach the window's capture phase too, and so does an element's
// `blur` or `focus`. A subscriber for the window's own event checks
// `event.target`.
//
// Subscribers run in subscription order, after the ones subscribed `first`.
// A first subscriber that returns `true` ends the dispatch: no later
// subscriber hears the event. One that throws is reported, and the rest still
// run.
//
// A type's native listener is passive, so it blocks no scroll. It is
// non-passive only while a subscriber that cancels the event
// (`{cancels: true}`) is subscribed. With no subscriber left, it is removed.
/** Options for {@link subscribeInput}. */ /** The events a window's capture phase sees: its own, and the document's. */ /**
 * Registered, so a swizzled copy's subscribers join the package's window
 * listeners.
 */ const inputState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["realmValue"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedKey"])('input-stream', 1), ()=>({
        streams: new WeakMap(),
        /** The type of the latest pointer event each window's stream delivered. */ lastPointerTypes: new WeakMap(),
        /** Where the latest mouse pointer event each window's stream delivered was. */ lastMousePoints: new WeakMap(),
        /** Each window's finger and pen presses that are down, by pointer id. */ downPresses: new WeakMap()
    }));
const { streams, lastPointerTypes, lastMousePoints, downPresses } = inputState;
const NO_PRESSES = new Map();
function getLastPointerType(view) {
    return lastPointerTypes.get(view) ?? null;
}
function getLastMousePoint(view) {
    return lastMousePoints.get(view) ?? null;
}
function getDownPresses(view) {
    return downPresses.get(view) ?? NO_PRESSES;
}
function subscribeInput(view, type, listener, { cancels = false, first = false } = {}) {
    let channels = streams.get(view);
    if (channels == null) {
        channels = new Map();
        streams.set(view, channels);
    }
    let channel = channels.get(type);
    if (channel == null) {
        channel = {
            subscribers: [],
            native: null
        };
        channels.set(type, channel);
    }
    const subscriber = {
        listener: listener,
        cancels,
        isFirst: first
    };
    const firstLater = first ? channel.subscribers.findIndex((other)=>!other.isFirst) : -1;
    if (firstLater === -1) {
        channel.subscribers.push(subscriber);
    } else {
        channel.subscribers.splice(firstLater, 0, subscriber);
    }
    register(view, type, channel);
    let isSubscribed = true;
    return ()=>{
        if (!isSubscribed) {
            return;
        }
        isSubscribed = false;
        const current = streams.get(view)?.get(type);
        if (current == null) {
            return;
        }
        const index = current.subscribers.indexOf(subscriber);
        if (index !== -1) {
            current.subscribers.splice(index, 1);
        }
        register(view, type, current);
        if (current.subscribers.length === 0) {
            streams.get(view)?.delete(type);
            // Without a listener the stream cannot hear a press end, so the
            // presses it recorded may already have ended.
            if (type === 'pointerup' || type === 'pointercancel') {
                downPresses.delete(view);
            }
        }
    };
}
/**
 * Bring the channel's native listener in line with its subscribers: none
 * without subscribers, non-passive while one of them cancels.
 */ function register(view, type, channel) {
    const wanted = channel.subscribers.length === 0 ? null : channel.subscribers.some((subscriber)=>subscriber.cancels);
    const native = channel.native;
    if (native != null && native.cancels === wanted) {
        return;
    }
    if (native != null) {
        view.removeEventListener(type, native.listener, {
            capture: true
        });
        channel.native = null;
    }
    if (wanted == null) {
        return;
    }
    const listener = (event)=>dispatch(view, channel, event);
    view.addEventListener(type, listener, {
        capture: true,
        passive: !wanted
    });
    channel.native = {
        listener,
        cancels: wanted
    };
}
function dispatch(view, channel, event) {
    // Recorded before any subscriber runs, so each reads the pointer at hand.
    const { pointerType, clientX, clientY } = event;
    if (typeof pointerType === 'string' && pointerType !== '') {
        lastPointerTypes.set(view, pointerType);
    }
    if (pointerType === 'mouse' && typeof clientX === 'number' && typeof clientY === 'number') {
        lastMousePoints.set(view, {
            x: clientX,
            y: clientY
        });
    }
    if (pointerType === 'touch' || pointerType === 'pen') {
        recordPress(view, event);
    }
    // A subscriber may subscribe or unsubscribe while the event runs; the
    // event goes to those subscribed when it arrived.
    for (const subscriber of [
        ...channel.subscribers
    ]){
        if (!channel.subscribers.includes(subscriber)) {
            continue;
        }
        try {
            if (subscriber.listener(event) === true && subscriber.isFirst) {
                return;
            }
        } catch (error) {
            report(error);
        }
    }
}
function recordPress(view, event) {
    const { pointerId, clientX, clientY } = event;
    if (typeof pointerId !== 'number') {
        return;
    }
    let presses = downPresses.get(view);
    if (event.type === 'pointerup' || event.type === 'pointercancel') {
        presses?.delete(pointerId);
        return;
    }
    if (event.type !== 'pointerdown' && !(event.type === 'pointermove' && presses?.has(pointerId) === true) || typeof clientX !== 'number' || typeof clientY !== 'number') {
        return;
    }
    if (presses == null) {
        presses = new Map();
        downPresses.set(view, presses);
    }
    presses.set(pointerId, {
        x: clientX,
        y: clientY
    });
}
function report(error) {
    if (typeof globalThis.reportError === 'function') {
        globalThis.reportError(error);
        return;
    }
    queueMicrotask(()=>{
        throw error;
    });
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/interactionModality.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__resetInteractionModalityForTest",
    ()=>__resetInteractionModalityForTest,
    "__startInteractionModalityTrackingForTest",
    ()=>__startInteractionModalityTrackingForTest,
    "__trackInteractionModalityInForTest",
    ()=>__trackInteractionModalityInForTest,
    "getInteractionModality",
    ()=>getInteractionModality,
    "isTextEntrySincePointer",
    ()=>isTextEntrySincePointer,
    "useInteractionModalityTracking",
    ()=>useInteractionModalityTracking,
    "useInteractionModalityTrackingFor",
    ()=>useInteractionModalityTrackingFor
]);
/**
 * @file interactionModality.ts
 * @input Global pointerdown/keydown events
 * @output useInteractionModalityTracking, useInteractionModalityTrackingFor,
 *   and getInteractionModality, which reads how the user last interacted in a
 *   document, and isTextEntrySincePointer, which reads whether every key
 *   since the last pointer press typed into a text-entry field
 * @position Internal document-wide singleton; used where `:focus-visible`
 *   alone is too broad
 */ // `:focus-visible` stays the condition that draws a focus ring. But it also
// matches a text field that a pointer focused, so a clicked field shows where
// typing goes. A ring for keyboard focus only needs to know which device
// moved focus. Use this as a gate beside `:focus-visible`, never in its
// place.
//
// The store lives on `document`, so duplicate Astryx bundles share one state
// and one listener pair. The page's listeners stay for the document lifetime,
// so input between consumers is not lost. A second document (a same-origin
// iframe, a Document Picture-in-Picture window) gets its own store while a
// consumer there is mounted. Importing this module has no DOM side effects,
// and server rendering keeps the keyboard-safe default.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/keyboard/keyboardHeight.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const interactionModalityStoreKey = Symbol.for('@astryxdesign/core/interaction-modality/v1');
function getStore(targetDocument) {
    const singletonDocument = targetDocument;
    const existingStore = singletonDocument[interactionModalityStoreKey];
    if (existingStore != null) {
        return existingStore;
    }
    // Default to keyboard: with no interaction yet, focus arrived
    // programmatically or from the browser restoring it, and showing a ring is
    // the safe error.
    const store = {
        modality: 'keyboard',
        isTextEntrySincePointer: false,
        isListening: false,
        onPointerDown: ()=>{
            store.modality = 'pointer';
            store.isTextEntrySincePointer = true;
        },
        onKeyDown: (event)=>{
            // Modifier-only presses are not navigation — holding Shift before a
            // click must not turn that click into "keyboard".
            if (event.metaKey || event.altKey || event.ctrlKey) {
                return;
            }
            store.modality = 'keyboard';
            if (!isTextEntryKey(event)) {
                store.isTextEntrySincePointer = false;
            }
        }
    };
    Object.defineProperty(singletonDocument, interactionModalityStoreKey, {
        value: store
    });
    return store;
}
/**
 * An on-screen keyboard sends `Unidentified` or `Process` for many keys, and
 * `Enter` is its Go key. `Shift`, `CapsLock` and `Dead` only shape the next
 * character. Other named keys move focus or the caret, so they are keyboard
 * navigation.
 */ const TEXT_ENTRY_NAMED_KEYS = new Set([
    'Backspace',
    'CapsLock',
    'Dead',
    'Delete',
    'Enter',
    'Process',
    'Shift',
    'Unidentified'
]);
function isTextEntryKey(event) {
    const target = typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTextEntryControl"])(target instanceof Element ? target : null)) {
        return false;
    }
    const key = typeof event.key === 'string' ? event.key : '';
    return event.isComposing === true || [
        ...key
    ].length === 1 || TEXT_ENTRY_NAMED_KEYS.has(key);
}
/**
 * Start or stop hearing a document's input. The one place that listens, so a
 * change in how input is heard touches nothing else.
 */ function setListening(targetDocument, store, isListening) {
    if (store.isListening === isListening) {
        return;
    }
    store.isListening = isListening;
    if (isListening) {
        targetDocument.addEventListener('pointerdown', store.onPointerDown, {
            capture: true,
            passive: true
        });
        targetDocument.addEventListener('keydown', store.onKeyDown, {
            capture: true,
            passive: true
        });
    } else {
        targetDocument.removeEventListener('pointerdown', store.onPointerDown, {
            capture: true
        });
        targetDocument.removeEventListener('keydown', store.onKeyDown, {
            capture: true
        });
    }
}
function trackInteractionModality() {
    if (typeof document === 'undefined') {
        return ()=>{};
    }
    setListening(document, getStore(document), true);
    // The document owns these listeners once activated. Removing them when the
    // last consumer unmounts would miss input before the next consumer mounts.
    return ()=>{};
}
/**
 * Track a second document while a consumer there is mounted: a component an
 * app renders into a same-origin iframe or a Document Picture-in-Picture
 * window gets input there that never reaches the page's listeners. The first
 * consumer installs the document's listener pair and the last one's cleanup
 * removes it. The page's own document keeps its document-lifetime listeners.
 */ function trackInteractionModalityIn(targetDocument) {
    if (typeof document !== 'undefined' && targetDocument === document) {
        return trackInteractionModality();
    }
    const store = getStore(targetDocument);
    store.consumers = (store.consumers ?? 0) + 1;
    setListening(targetDocument, store, true);
    let isReleased = false;
    return ()=>{
        if (isReleased) {
            return;
        }
        isReleased = true;
        store.consumers = (store.consumers ?? 1) - 1;
        if (store.consumers === 0) {
            setListening(targetDocument, store, false);
        }
    };
}
/** What a component gets from its one modality call. */ /**
 * A second-document hold for the node a ref callback receives: called with
 * each node and with `null`, it releases the previous document before it holds
 * a new one, and its returned cleanup releases it too, so React's ref cleanup
 * and `null` calls both work and a release never runs twice.
 */ function holdNodeDocument(node, previous) {
    previous.release?.();
    previous.release = null;
    const ownerDocument = node?.ownerDocument;
    if (ownerDocument == null || typeof document !== 'undefined' && ownerDocument === document) {
        return undefined;
    }
    const release = trackInteractionModalityIn(ownerDocument);
    previous.release = release;
    return ()=>{
        release();
        if (previous.release === release) {
            previous.release = null;
        }
    };
}
function useInteractionModalityTracking() {
    // Syncs the document's interaction-modality tracking with this mount.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>trackInteractionModality(), []);
    const nodeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const holdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        release: null
    });
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((node)=>{
        nodeRef.current = node;
        const release = holdNodeDocument(node, holdRef.current);
        // React's ref cleanup runs instead of a `null` call; it must also forget
        // the detached node, so the reader never answers from a document whose
        // listeners are gone.
        return ()=>{
            release?.();
            if (nodeRef.current === node) {
                nodeRef.current = null;
            }
        };
    }, []);
    const readModality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>getInteractionModality(nodeRef.current), []);
    return {
        ref,
        readModality
    };
}
function useInteractionModalityTrackingFor(elementRef, isEnabled = true) {
    // Syncs the document's interaction-modality tracking with this mount.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>isEnabled ? trackInteractionModality() : undefined, [
        isEnabled
    ]);
    // Syncs modality tracking in the element's second document, such as an iframe
    // or a Picture-in-Picture window.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const ownerDocument = elementRef.current?.ownerDocument;
        if (!isEnabled || ownerDocument == null || typeof document !== 'undefined' && ownerDocument === document) {
            return undefined;
        }
        return trackInteractionModalityIn(ownerDocument);
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>getInteractionModality(elementRef.current), [
        elementRef
    ]);
}
function getInteractionModality(target) {
    const targetDocument = target == null ? null : target.nodeType === 9 ? target : target.ownerDocument;
    if (targetDocument != null) {
        return getStore(targetDocument).modality;
    }
    return typeof document === 'undefined' ? 'keyboard' : getStore(document).modality;
}
function isTextEntrySincePointer(target) {
    const targetDocument = target == null ? typeof document === 'undefined' ? null : document : target.nodeType === 9 ? target : target.ownerDocument;
    if (targetDocument == null) {
        return false;
    }
    const store = getStore(targetDocument);
    return store.isTextEntrySincePointer ?? store.modality === 'pointer';
}
function __resetInteractionModalityForTest() {
    if (typeof document !== 'undefined') {
        const store = getStore(document);
        store.modality = 'keyboard';
        store.isTextEntrySincePointer = false;
    }
}
const __startInteractionModalityTrackingForTest = trackInteractionModality;
const __trackInteractionModalityInForTest = trackInteractionModalityIn;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/interactionOverlay.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/* eslint-disable @astryx/no-hover-on-disabled -- Every hover branch is
 * nested beneath ENABLED below. Keeping that shared guard outside the media
 * branch is what gives hover and active matching generated specificity. */ /**
 * @file Shared hover and pressed overlay states
 * @input StyleX and the semantic interaction-overlay color tokens
 * @output Reusable background-color and background-image state styles, the
 *   touch press's registered strength variable (`pressVars`) and its clocks
 *   (`pressConsts`). The list row's compositor press layer and its clocks
 *   are internal (privateAttributes/press.stylex.ts, utils/rowPressLayer.stylex.ts)
 * @position Internal styling utility for interactive core surfaces
 *
 * SYNC: When modified, update pressFeedback.ts, pressGesture.ts (the fade
 * clock), hooks/usePressFeedback.doc.mjs, the components that paint the touch
 * press off an ancestor scope or a pseudo-element (Switch, Tab,
 * CheckboxInput, RadioListItem, ClickableCard, SelectableCard, Thumbnail),
 * Button (a tracked action sizes its `:active` image to zero) and
 * scripts/build-css.test.mjs.
 */ // Every surface that paints a press uses one of these styles, so a change to
// the press is made here once.
//
// Keep the enabled guard outside the states. StyleX gives media-nested rules
// a higher priority. With `:active` repeated in the hover branch, hover and
// press get the same specificity, and StyleX emits `:active` last.
//
// A mouse keeps `:active`. A finger does not: on iOS Safari `:active` paints
// on the touch and can outlive the start of a scroll. So under
// `@media (pointer: coarse)` the press controller (pressFeedback.ts) writes
// `data-astryx-press`: `on` when the press is believed, and `fading` for the
// release. The query reads the primary pointer, so on a phone a mouse or
// Space-key press loses `:active` too, and the controller writes the
// attribute at once.
//
// The `on` and `fading` arms paint through `--astryx-press-alpha`, a
// registered `<number>` from 0 to 1. Gradients do not interpolate, but a registered number does.
// The touch paint is the pressed token at that strength, painted as a
// background image, so a composer's color transition cannot fade the onset
// in. `on` sets the strength to 1 on the first frame. `fading` animates it
// from 1 to 0, not to the hover strength, because a finger has no hover. The
// release plays the theme's exit motion tokens, which follow its tempo.
//
// The release is an animation, not a transition. Composers own their
// `transition-*` longhands, and StyleX is last-wins per property. A
// transition would also make the release arm declare 0, so a composer that
// transitions `background-image` would start its own fade. With keyframes,
// both arms declare 1 and only the animation moves. An engine without
// `@property` steps the paint off at half the release.
//
// Composers must not set `backgroundImage` on the color variants, or
// `animation-*` on the element that composes them. The touch arms own both.
__turbopack_context__.s([
    "interactionOverlayStyles",
    ()=>interactionOverlayStyles,
    "pressConsts",
    ()=>pressConsts,
    "pressVars",
    ()=>pressVars
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/reducedMotion.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
;
;
;
;
;
const pressVars = {
    "--astryx-press-alpha": "var(--astryx-press-alpha)",
    __varGroupHash__: "x1qqxm5o"
};
const pressConsts = {
    releaseMs: 200
};
/**
 * The release's clock: the theme's exit duration. The token already
 * follows the theme's tempo. The controller's timer reads the
 * same property.
 */ const PRESS_RELEASE_DURATION = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["durationVars"]['--duration-exit'];
/** The same clock under Reduce Motion, no longer than the Reduce Motion fade. */ const PRESS_RELEASE_DURATION_REDUCED = `min(${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["durationVars"]['--duration-exit']}, ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["reducedMotionFadeConsts"].duration})`;
const ENABLED = ':where(:not(:disabled,[aria-disabled="true"]))';
const HOVER_HOVER = '@media (hover: hover)';
const COARSE = '@media (pointer: coarse)';
/**
 * Written by the touch press controller while a press is believed. The
 * attribute is the system's own (`data-astryx-*`, like the pressable marker),
 * outside the namespace a theme's state keys generate into (`[data-<state>]`),
 * so a theme state can never collide with it.
 *
 * The press selectors are typed `string`, not as literals. As a computed key,
 * a `string` gives the object an index signature, and StyleX reads the value
 * type from it. See {@link ByAttribute}.
 */ const PRESSED_ON = '[data-astryx-press="on"]';
/** Written by the touch press controller for the release's exit. */ const PRESSED_FADING = '[data-astryx-press="fading"]';
const PRESS_ALPHA = pressVars['--astryx-press-alpha'];
const hoverImage = `linear-gradient(${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorVars"]['--color-overlay-hover']}, ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorVars"]['--color-overlay-hover']})`;
const pressedImage = `linear-gradient(${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorVars"]['--color-overlay-pressed']}, ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorVars"]['--color-overlay-pressed']})`;
const neutralImage = `linear-gradient(${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorVars"]['--color-neutral']}, ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorVars"]['--color-neutral']})`;
/**
 * The pressed token at the touch press's current strength: the one
 * declaration of the press's paint. Declared as `--_press-paint` on the
 * element the controller writes to (every style below carries it), where the
 * strength is 1 while a press is believed and animates 1 → 0 over the
 * release, so its computed value follows the fade frame by frame and is
 * inherited, resolved, by whatever paints it: the element's own arms, a
 * descendant (a switch's track and thumb, a tab's hover layer), or a `::after`
 * (a card, an indicator owner). Those paint `var(--_press-paint)` or
 * `var(--_press-paint-image)` and never rebuild the expression;
 * pressPaintSource.test.ts holds it to this file.
 */ const pressedOverlayColor = `color-mix(in srgb, ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorVars"]['--color-overlay-pressed']} calc(${PRESS_ALPHA} * 100%), transparent)`;
const pressPaint = {
    '--_press-paint': pressedOverlayColor,
    '--_press-paint-image': 'linear-gradient(var(--_press-paint), var(--_press-paint))'
};
/** The paint, read back off the element: the overlay's gradient layer. */ const pressedOverlayImage = 'var(--_press-paint-image)';
/** Strength 1 → 0; the release arm runs it over {@link PRESS_RELEASE_DURATION}. */ const pressRelease = "x10jkm1t-B";
/**
 * The release's curve: the theme's exit easing. The list row's layer
 * (privateAttributes/press.stylex.ts) and Switch's press layers use the same
 * token; interactionOverlay.cell.test.ts and Switch.test.tsx fail if they
 * differ.
 */ const RELEASE_EASE = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["easeVars"]['--ease-exit'];
/**
 * The touch press's strength and its release, on the element the controller
 * writes to. Every variant below carries both. `pressedAlpha` is the pair
 * alone.
 *
 * The keys are literal on purpose. StyleX reads `stylex.create` from the raw
 * AST. An object hoisted out of the call can first pass through a preset that
 * lowers ES2015, such as `next/babel`. That preset turns computed keys into
 * helper calls, and the build fails with "Referenced constant is not
 * defined". `PRESS_ALPHA` has a generated name, so it stays at each use. The
 * literal keys equal PRESSED_ON and PRESSED_FADING above.
 */ const pressStrength = {
    default: null,
    '[data-astryx-press="on"]': 1,
    '[data-astryx-press="fading"]': 1
};
/**
 * A value that only attribute selectors choose, such as the press arms.
 *
 * StyleX infers a value's type from its `default`, its `:` and `@`
 * conditions, and an index signature. Literal attribute keys are none of
 * these. For a property whose conditions are all literal attribute keys, it
 * infers `unknown`, and no component's `xstyle` accepts that. This type gives
 * the hoisted press arms an index signature.
 */ const pressReleaseAnimation = {
    animationName: {
        default: null,
        '[data-astryx-press="fading"]': pressRelease
    },
    animationDuration: {
        default: null,
        '[data-astryx-press="fading"]': {
            default: PRESS_RELEASE_DURATION,
            '@media (prefers-reduced-motion: reduce)': PRESS_RELEASE_DURATION_REDUCED
        }
    },
    animationTimingFunction: {
        default: null,
        '[data-astryx-press="fading"]': RELEASE_EASE
    },
    animationFillMode: {
        default: null,
        '[data-astryx-press="fading"]': 'both'
    }
};
const interactionOverlayStyles = {
    backgroundColor: {
        "--astryx-press-alpha": "x11z29ks xli5ek3",
        kKVMdj: "x14e4jsf",
        k44tkh: "xem8lmn xogcwkh",
        kyAemX: "x1t1ddl7",
        kWV6AL: "xziyay6",
        "--_press-paint": "xz2mauf",
        "--_press-paint-image": "x1l7afqf",
        kWkggS: "xjbqb8w x1anq1lc x1s5nr2v x13ugjdw xl8sb5e xoevpu5 xprvw0a",
        kKwaWg: "x7ngsy6 xubczrd",
        $$css: true
    },
    backgroundImage: {
        "--astryx-press-alpha": "x11z29ks xli5ek3",
        kKVMdj: "x14e4jsf",
        k44tkh: "xem8lmn xogcwkh",
        kyAemX: "x1t1ddl7",
        kWV6AL: "xziyay6",
        "--_press-paint": "xz2mauf",
        "--_press-paint-image": "x1l7afqf",
        kKwaWg: "x7uyq82 x3f84ok x7ngsy6 xubczrd xmvprkv xetgvay",
        $$css: true
    },
    backgroundImageOnNeutral: {
        "--astryx-press-alpha": "x11z29ks xli5ek3",
        kKVMdj: "x14e4jsf",
        k44tkh: "xem8lmn xogcwkh",
        kyAemX: "x1t1ddl7",
        kWV6AL: "xziyay6",
        "--_press-paint": "xz2mauf",
        "--_press-paint-image": "x1l7afqf",
        kKwaWg: "x14bno8m xzmimnh xvbnuu x5rw36h x1qxwyo6 x1otsd3y xo3fi6e",
        $$css: true
    },
    pressedBackgroundColor: {
        "--astryx-press-alpha": "x11z29ks xli5ek3",
        kKVMdj: "x14e4jsf",
        k44tkh: "xem8lmn xogcwkh",
        kyAemX: "x1t1ddl7",
        kWV6AL: "xziyay6",
        "--_press-paint": "xz2mauf",
        "--_press-paint-image": "x1l7afqf",
        kWkggS: "x1anq1lc x1s5nr2v x13ugjdw xl8sb5e",
        kKwaWg: "x7ngsy6 xubczrd",
        $$css: true
    },
    pressedAlpha: {
        "--astryx-press-alpha": "x11z29ks xli5ek3",
        kKVMdj: "x14e4jsf",
        k44tkh: "xem8lmn xogcwkh",
        kyAemX: "x1t1ddl7",
        kWV6AL: "xziyay6",
        "--_press-paint": "xz2mauf",
        "--_press-paint-image": "x1l7afqf",
        $$css: true
    }
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/isApplePlatform.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file isApplePlatform.ts
 * @input Reads navigator.userAgentData.platform and navigator.platform
 * @output Exports isApplePlatform
 * @position Internal util; the single platform detection behind useHotkeys and Kbd
 *
 * Deliberately absent from utils/index.ts: packages/core/src/index.ts does
 * `export * from './utils'`, so naming it there would publish it as API.
 * Import it by path, as interactionModality is imported.
 */ /**
 * Detects whether the current platform is macOS/iOS.
 * Prefers the User-Agent Client Hints API when it names a platform (modern
 * Chrome/Edge), falls back to navigator.platform (deprecated but universally
 * supported) when it names none.
 */ __turbopack_context__.s([
    "isApplePlatform",
    ()=>isApplePlatform
]);
function isApplePlatform() {
    if (typeof navigator === 'undefined') {
        return false;
    }
    const uaData = 'userAgentData' in navigator ? navigator.userAgentData : null;
    if (uaData && typeof uaData === 'object' && 'platform' in uaData) {
        const uaPlatform = uaData.platform;
        const named = typeof uaPlatform === 'string' ? uaPlatform.trim() : '';
        // A value that names nothing is no answer, not a negative one: builds that
        // rewrite their client-hints identity ship '', and 'Unknown' is the spec's
        // own sentinel for "cannot say". Both fall through rather than reading as
        // "not Apple".
        if (named !== '' && named.toLowerCase() !== 'unknown') {
            return /mac/i.test(named);
        }
    }
    return /Mac|iPhone|iPad|iPod/.test(navigator.platform ?? '');
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/isRenderable.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file isRenderable.ts
 * @input A ReactNode value
 * @output Boolean indicating whether the value passes the shallow React-slot check
 * @position Utility for checking if a React slot prop has non-empty scalar content.
 *
 * React treats null, undefined, true, false, and '' as empty — they render
 * nothing. This utility excludes exactly those values. It does not inspect
 * descendants: elements, arrays, fragments, and other containers return true
 * even when their contents ultimately render nothing.
 *
 * Use this instead of `prop != null` when a slot should also reject booleans and
 * the empty string. Do not use the return value as proof that DOM output exists.
 */ /**
 * Returns false for null, undefined, booleans, and the empty string; true for
 * every other ReactNode value. The check is shallow and does not inspect the
 * descendants of elements or containers.
 *
 * @example
 * ```tsx
 * const hasSideNav = isRenderable(sideNav);
 * const hasTopNav = isRenderable(topNav);
 * ```
 */ __turbopack_context__.s([
    "isRenderable",
    ()=>isRenderable
]);
function isRenderable(node) {
    return node != null && typeof node !== 'boolean' && node !== '';
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/layoutViewport.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file layoutViewport.ts
 * @input A window: its innerHeight and innerWidth, its visual viewport's
 *   width and scale, and its document's root box
 * @output layoutViewportHeight, the layout viewport's height in layout px
 *   less a classic horizontal scrollbar, and __resetLayoutViewportForTest
 * @position Internal shared measurement, not re-exported from the utils
 *   entry. The keyboard module, BottomSheet's keyboard obstruction and any
 *   layout that sizes against the layout viewport read it.
 */ /**
 * The layout viewport's height, CSS px, in the units of element rects.
 *
 * `innerHeight` is the layout viewport's height in most engines. WebKit
 * reports `innerHeight` and `innerWidth` in the pinch-zoomed visual
 * viewport's px instead. At a 1.33 zoom of a 402 × 714 layout viewport,
 * Safari on iOS 26.2 reports 536 and 302. Element rects and the visual
 * viewport's height times its scale stay in layout px. So, read as is, a zoom
 * shrinks the layout viewport by the zoom, and the function scales the height
 * back.
 */ __turbopack_context__.s([
    "__resetLayoutViewportForTest",
    ()=>__resetLayoutViewportForTest,
    "layoutViewportHeight",
    ()=>layoutViewportHeight
]);
function layoutViewportHeight(win) {
    const viewport = win.visualViewport;
    const width = viewport?.width ?? 0;
    if (viewport == null || !(width > 0)) {
        return win.innerHeight - horizontalScrollbarHeight(win);
    }
    const scale = viewport.scale;
    // Which units `innerWidth` is in tells the two apart without naming an
    // engine. It is the visual viewport's width where the zoom applies, and
    // that width times the scale where it does not. `innerWidth` is a whole
    // number of px against a fractional width, so it never equals either, and
    // the nearest wins with no tolerance constant. At a scale of 1 the two
    // widths are equal, so the function takes `innerHeight` as it is. A classic
    // scrollbar, which `innerWidth` counts, then changes nothing.
    const fromVisual = Math.abs(win.innerWidth - width);
    const fromLayout = Math.abs(win.innerWidth - width * scale);
    const height = fromVisual < fromLayout ? win.innerHeight * scale : win.innerHeight;
    return height - horizontalScrollbarHeight(win);
}
/**
 * The document's classic horizontal scrollbar, CSS px. It is in
 * `innerHeight` but not in the visual viewport's height. On a desktop page
 * wider than its window, Chromium's `innerHeight` is 800 for a 785 px visual
 * viewport. It is the part of `innerHeight` the root's client height leaves
 * out, up to the thickness of a scrollbar that takes room. Where scrollbars
 * overlay the content, as on every phone, that thickness is 0. So the room a
 * hidden toolbar adds to `innerHeight` is never taken for a scrollbar. Chrome
 * on Android sizes the root to the viewport with its toolbar shown.
 */ function horizontalScrollbarHeight(win) {
    const root = win.document.documentElement;
    const gap = win.innerHeight - root.clientHeight;
    if (!(gap > 0) || root.scrollWidth <= root.clientWidth) {
        return 0;
    }
    return Math.min(gap, scrollbarThickness(win.document));
}
// The scrollbar thickness each document measured, and the device pixel ratio
// it measured it at. A browser zoom changes the ratio, and with it how many
// CSS px a classic scrollbar takes. Measuring writes a probe to the document
// and forces a layout, so it runs once per document and zoom. Every later
// measurement stays one layout read.
let thicknesses = new WeakMap();
/** How much room a scrollbar takes from a scrolling box: 0 where overlaid. */ function scrollbarThickness(doc) {
    const devicePixelRatio = doc.defaultView?.devicePixelRatio ?? 1;
    const known = thicknesses.get(doc);
    if (known != null && known.devicePixelRatio === devicePixelRatio) {
        return known.thickness;
    }
    const thickness = measureScrollbarThickness(doc);
    thicknesses.set(doc, {
        devicePixelRatio,
        thickness
    });
    return thickness;
}
function measureScrollbarThickness(doc) {
    const probe = doc.createElement('div');
    probe.style.position = 'absolute';
    probe.style.top = '-200px';
    probe.style.width = '100px';
    probe.style.height = '100px';
    probe.style.overflow = 'scroll';
    probe.style.visibility = 'hidden';
    (doc.body ?? doc.documentElement).append(probe);
    const thickness = probe.offsetHeight - probe.clientHeight;
    probe.remove();
    return thickness;
}
function __resetLayoutViewportForTest() {
    thicknesses = new WeakMap();
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mergeProps",
    ()=>mergeProps
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * Merge xds-* props, stylex.props result, and optional consumer className/style.
 *
 * stylex.props() returns { className, style }. This merges the Astryx stable
 * class name plus any data-attribute reflection from `themeProps()` with the
 * StyleX class name so both StyleX styles and the theme-targeting surface are
 * applied.
 *
 * Consumer className is appended after StyleX classes.
 * Consumer style is spread after StyleX inline styles, so these values take priority.
 *
 * @example
 * ```tsx
 * // Root element with themeProps
 * <div {...mergeProps(
 *   themeProps('button', { variant }),
 *   stylex.props(styles.base, variants[variant]),
 *   className,
 *   style,
 * )} />
 *
 * // Internal element — stylex + dynamic style only
 * <div {...mergeProps(
 *   stylex.props(styles.track),
 *   { style: { width: dynamicWidth } },
 * )} />
 * ```
 */ function mergeTwoProps(base, overrides) {
    const merged = {
        ...base,
        ...overrides
    };
    const cls = [
        base.className,
        overrides.className
    ].filter(Boolean).join(' ');
    if (cls) {
        merged.className = cls;
    } else {
        delete merged.className;
    }
    const mergedStyle = overrides.style && base.style ? {
        ...base.style,
        ...overrides.style
    } : overrides.style || base.style;
    if (mergedStyle) {
        merged.style = mergedStyle;
    } else {
        delete merged.style;
    }
    return merged;
}
function mergeProps(xdsClassOrStylexResult, stylexResultOrClassName, classNameOrStyle, style) {
    // Disambiguate: first arg is string → (xdsClass, stylexResult, className?, style?)
    // first arg is object → merge arbitrary props (supports themeProps + data attrs).
    if (typeof xdsClassOrStylexResult === 'string') {
        const xdsClass = xdsClassOrStylexResult;
        const stylexResult = stylexResultOrClassName ?? {
            className: ''
        };
        const className = classNameOrStyle;
        let cls = stylexResult.className ? `${xdsClass} ${stylexResult.className}` : xdsClass;
        if (className) {
            cls = `${cls} ${className}`;
        }
        const mergedStyle = style && stylexResult.style ? {
            ...stylexResult.style,
            ...style
        } : style || stylexResult.style;
        return {
            ...stylexResult,
            className: cls,
            style: mergedStyle
        };
    }
    const first = xdsClassOrStylexResult;
    const second = typeof stylexResultOrClassName === 'string' ? {
        className: stylexResultOrClassName
    } : stylexResultOrClassName ?? {};
    let merged = mergeTwoProps(first, second);
    if (typeof classNameOrStyle === 'string') {
        merged = mergeTwoProps(merged, {
            className: classNameOrStyle
        });
    } else if (classNameOrStyle != null) {
        merged = mergeTwoProps(merged, {
            style: classNameOrStyle
        });
    }
    if (style != null) {
        merged = mergeTwoProps(merged, {
            style
        });
    }
    return merged;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeRefs.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file mergeRefs.ts
 * @input Multiple React refs (callback, object, or undefined)
 * @output A single callback ref that forwards to all inputs
 * @position Utility; used by components that need to merge an external ref
 *   with an internal ref (e.g., popover trigger + consumer ref).
 */ __turbopack_context__.s([
    "mergeRefs",
    ()=>mergeRefs
]);
function mergeRefs(...refs) {
    return (value)=>{
        const cleanups = [];
        for (const ref of refs){
            if (typeof ref === 'function') {
                const cleanup = ref(value);
                cleanups.push(typeof cleanup === 'function' ? cleanup : ()=>ref(null));
            } else if (ref != null) {
                const mutableRef = ref;
                mutableRef.current = value;
                cleanups.push(()=>{
                    mutableRef.current = null;
                });
            }
        }
        if (value != null && cleanups.length > 0) {
            return ()=>{
                for (const cleanup of cleanups){
                    cleanup();
                }
            };
        }
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/moduleLoader.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file moduleLoader.ts
 * @input A function that imports a module on demand
 * @output Exports `createModuleLoader`: one shared load of that module, and
 *   the module once it has loaded
 * @position Internal utility. A component that loads a module before it is
 *   needed renders the loaded module directly, with no suspended render, so
 *   React does not hold back what it shows.
 */ /** One module, loaded once on demand. Internal. */ __turbopack_context__.s([
    "createModuleLoader",
    ()=>createModuleLoader
]);
function createModuleLoader(importModule) {
    let module = null;
    let pending = null;
    return {
        async load () {
            pending ??= importModule().then((loadedModule)=>{
                module = loadedModule;
                return loadedModule;
            }, (error)=>{
                pending = null;
                throw error;
            });
            return pending;
        },
        loaded: ()=>module
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/nodeType.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file nodeType.ts
 * @input A value that may be a DOM node from any window
 * @output isNode, isElement, isHTMLElement, isDocument and isShadowRoot:
 *   type guards that hold for a node from any window
 * @position Shared DOM checks for code that handles nodes and events from
 *   another window's document, such as a same-origin iframe's or a popup's
 *
 * Each check reads the node type or namespace, not `instanceof`. A node from
 * another window belongs to that window's realm, where `instanceof` against
 * this window's classes is false. An element moved into another window's
 * document keeps the realm it was made in.
 */ /** Whether `value` is a DOM node, from this window or another one. */ __turbopack_context__.s([
    "isDocument",
    ()=>isDocument,
    "isElement",
    ()=>isElement,
    "isHTMLElement",
    ()=>isHTMLElement,
    "isNode",
    ()=>isNode,
    "isShadowRoot",
    ()=>isShadowRoot
]);
function isNode(value) {
    return typeof value === 'object' && value !== null && typeof value.nodeType === 'number';
}
function isElement(value) {
    return isNode(value) && value.nodeType === 1;
}
function isDocument(value) {
    return isNode(value) && value.nodeType === 9;
}
function isShadowRoot(value) {
    return isNode(value) && value.nodeType === 11 && 'host' in value;
}
function isHTMLElement(value) {
    return isElement(value) && value.namespaceURI === 'http://www.w3.org/1999/xhtml';
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/pressDisabled.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file pressDisabled.ts
 * @input An element
 * @output `isDisabledControl`: whether an element is a disabled control, so a
 *   press on it performs no action
 * @position The one disabled-control check that press feedback
 *   (../gestures/haptics) and the hover layers' touch trigger
 *   (../Layer/useTouchTrigger) share, so the two never disagree about a
 *   control. It lives outside the gesture code, which a public import that
 *   uses no gesture never carries (architecture:react-component-runtime
 *   INV13).
 */ /**
 * Whether `element` is a disabled control: `aria-disabled="true"`, or a form
 * control the browser counts as `:disabled` (a disabled fieldset's controls
 * included). A disabled control performs no action, so it gives no press
 * feedback (spec:AST-094 FR23), and a tap on it opens its reason instead
 * (component:Tooltip FR5).
 */ __turbopack_context__.s([
    "isDisabledControl",
    ()=>isDisabledControl
]);
function isDisabledControl(element) {
    if (element.getAttribute('aria-disabled') === 'true') {
        return true;
    }
    try {
        return element.matches(':disabled');
    } catch  {
        return false;
    }
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/pressFeedback.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PRESSABLE_ATTRIBUTE",
    ()=>PRESSABLE_ATTRIBUTE,
    "PRESSED_ATTRIBUTE",
    ()=>PRESSED_ATTRIBUTE,
    "PRESS_GESTURE_MEMORY_MS",
    ()=>PRESS_GESTURE_MEMORY_MS,
    "cancelPress",
    ()=>cancelPress,
    "installBoxHold",
    ()=>installBoxHold,
    "installPressFeedback",
    ()=>installPressFeedback,
    "pressFadeMs",
    ()=>pressFadeMs,
    "pressableProps",
    ()=>pressableProps
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file pressFeedback.ts
 * @input The press state machine (pressGesture.ts), the menu-press and
 *   press-group markers and the scroll-view test (scrollView.ts). Also the
 *   input clock (inputAge.ts) and the document's pointer, keyboard, scroll
 *   and visibility events
 * @output PRESSABLE_ATTRIBUTE, PRESSED_ATTRIBUTE, pressableProps,
 *   pressFadeMs, installPressFeedback, cancelPress and installBoxHold
 * @position The DOM half of the touch press model. usePressFeedback installs
 *   it, and the CSS arms live in interactionOverlay.stylex.ts.
 *
 * SYNC: When modified, update pressGesture.ts, hooks/usePressFeedback.ts,
 * hooks/usePressFeedback.doc.mjs, utils/interactionOverlay.stylex.ts and
 * pressFeedback.test.ts.
 */ // One delegated controller per document writes `data-astryx-press` on the
// nearest pressable surface. A virtualized list can have more than a thousand
// rows, and listeners and state for each row cost too much. A press here
// costs one attribute write and no React render.
//
// Where the primary pointer is fine, the controller ignores the mouse and the
// keyboard, and CSS `:active` keeps their press. A surface that owns a
// control's box (pressBox.stylex.ts), as a checkbox or a radio row does, is
// the exception. There the controller paints a mouse's or a pen's press at
// once and fades it on release, as it does a finger's. The surface's `:active`
// arm yields while it does. On a row, a press on a nested control is that
// control's: the row's container rule ends the row's paint
// (hooks/useClickableContainer.ts).
// Under a coarse primary pointer the CSS drops `:active`, so the controller
// paints every press. A mouse, trackpad or Space press paints at once. The
// controller reads the same query as the stylesheet, so they agree.
//
// A finger waits only inside a scroller. Outside one, a surface highlights in
// the frame the finger lands, as a UIControl does. Inside one, it waits the
// content-touch delay, because the touch can become a scroll. The delay counts
// from the touch's own timestamp, so a late listener does not add to it. Rows
// follow the same rule.
//
// A surface's hold does nothing, so it keeps the browser's long-press text
// selection (AST-094). Only an element whose hold does something suppresses
// it, through the gesture host. The `touchcancel` listener is on only while
// the primary pointer is coarse.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$menuPressMarker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/menuPressMarker.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/pressGesture.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$coarsePointer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/coarsePointer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/reducedMotion.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/roles.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$themeTiming$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/themeTiming.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputStream.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/scrollView.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputAge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputAge.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchQueries$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/touchQueries.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressBox$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/pressBox.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$primaryClick$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/primaryClick.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressHoldsDrag$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/pressHoldsDrag.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressGroupItem$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/pressGroupItem.stylex.js [app-ssr] (ecmascript)");
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
const PRESSABLE_ATTRIBUTE = 'data-astryx-pressable';
const PRESSED_ATTRIBUTE = 'data-astryx-press';
const pressableProps = {
    [PRESSABLE_ATTRIBUTE]: ''
};
const PRESS_GESTURE_MEMORY_MS = 3000;
/** A surface that is not enabled does not press, however it is touched. */ const DISABLED = ':disabled, [aria-disabled="true"]';
/**
 * The `<input>` types a Space press activates as a button. Browsers hold
 * `:active` on these (and on `<button>`) while Space is down; on a link or a
 * `role="button"` element Space does nothing, so neither paints there. A
 * checkbox or radio is left out: its pressable surface is the row around it,
 * and desktop Chromium and WebKit leave that row at rest for a Space press
 * (only the input matches `:active`), so it paints nothing here either.
 */ const SPACE_ACTIVATED_INPUT_TYPES = new Set([
    'button',
    'image',
    'reset',
    'submit'
]);
/**
 * A menu's own highlight is its only paint. A press held on one row while the
 * highlight follows the pointer to another would light two rows.
 */ const MENU_PRESS_ROOT = `[${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$menuPressMarker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MENU_PRESS_MARKER"]}]`;
/**
 * One tracking slot. A finger's press runs the whole machine (the delay, the
 * slop, the scroll that takes it away). A mouse button's or the Space key's
 * press is believed at once and only waits for its release, so it has a slot
 * of its own: a finger landing never ends it, and it never swallows a
 * finger's press.
 */ const finger = {
    live: null
};
/**
 * A finger's or a pen's contact on a control's box (utils/boxHold.ts). It
 * keeps its pointer, the press it started (none for a brake) and the box
 * hold's end.
 * A braking contact counts, and so does one that a scroll cancels. Each ends
 * at its own lift or cancel. Only a press that is still live at the lift is a
 * still lift.
 */ let contact = null;
/** Ends the box contact and tells its box hold, once. */ function endContact(isStillLift) {
    const ended = contact;
    contact = null;
    ended?.end(isStillLift);
}
/** The box hold that a box component installs (utils/boxHold.ts). */ let boxHold = null;
function installBoxHold(hold) {
    boxHold = hold;
}
const button = {
    live: null
};
/** How many callers hold the controller installed; listeners exist while > 0. */ let holders = 0;
/** Whether the stylesheet left mouse and keyboard presses to the controller; read at the first one. */ /**
 * When a scroller last moved UNDER A FINGER OF ITS OWN, and which one.
 *
 * Only a finger-driven scroll is recorded, so the brake cannot fire for a
 * scroll the app performed itself. The test is the touch's own target: a
 * scroll is that finger's if the finger was inside the scroller that moved,
 * within {@link PRESS_GESTURE_MEMORY_MS}.
 */ let lastScrollAt = 0;
let lastScroller = null;
/** When a finger was last on the glass, and where it landed. */ let lastTouchAt = 0;
let lastTouchTarget = null;
const TIMER_MS = {
    fade: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESS_FADE_MS"],
    flash: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESS_FLASH_MS"],
    onset: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESS_ONSET_MS"]
};
function pressFadeMs(element) {
    const exit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$themeTiming$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readThemeTokens"])(element, {
        duration: '--duration-exit'
    }).ms ?? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESS_FADE_MS"];
    const reduced = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bound = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$roles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parseMotionRoleValue"])('duration', __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["reducedMotionFadeConsts"].duration);
    return reduced && bound != null ? Math.min(exit, bound) : exit;
}
/**
 * The release animations that still run for `element`'s press. Each is a
 * finite CSS animation that has not finished. It runs on the element, on its
 * `::before` or `::after`, or on a descendant whose nearest press owner is
 * the element, because a component can draw its release on a part inside the
 * surface. A press owner nested inside plays the release of its own press,
 * so it never extends this one. The list is empty where the engine has no Web
 * Animations.
 */ function releaseAnimationsOf(element) {
    if (typeof element.getAnimations !== 'function') {
        return [];
    }
    return element.getAnimations({
        subtree: true
    }).filter((animation)=>{
        // The effect of a CSS animation is a KeyframeEffect. Its target is the
        // element, also when the animation runs on a pseudo-element.
        const effect = animation.effect;
        const target = effect?.target ?? null;
        if (effect == null || target == null || !('animationName' in animation) || target !== element && target.closest(`[${PRESSABLE_ATTRIBUTE}]`) !== element) {
            return false;
        }
        if (!Number.isFinite(Number(effect.getComputedTiming().endTime))) {
            return false;
        }
        return animation.playState !== 'finished';
    });
}
/**
 * Calls `end` when the release on `element` is over. A busy main thread
 * delays the first frame of the release animation, and with it the end. So a
 * clock that starts at the `fading` write can cut the release short. When
 * `clockMs` runs out, the release waits for each release animation that still
 * runs or still waits for its first frame. It ends when those finish or are
 * cancelled, as when the surface is unmounted or restyled. With no release
 * animation (an instant release, a surface without one, an engine without Web
 * Animations), the release ends at the clock. Returns a cancel.
 */ function endAfterRelease(element, clockMs, end) {
    let waiting = true;
    const timer = setTimeout(()=>{
        const running = releaseAnimationsOf(element);
        if (running.length === 0) {
            end();
            return;
        }
        void Promise.allSettled(running.map(async (animation)=>animation.finished)).then(()=>{
            if (waiting) {
                end();
            }
        });
    }, clockMs);
    return ()=>{
        waiting = false;
        clearTimeout(timer);
    };
}
const TIMER_EVENT = {
    fade: 'fadeEnd',
    flash: 'flashEnd',
    onset: 'onset'
};
function paintElement(element, paint) {
    if (paint === 'none') {
        element.removeAttribute(PRESSED_ATTRIBUTE);
        return;
    }
    // A step that keeps the paint writes nothing, so the element sees one
    // change per paint.
    if (element.getAttribute(PRESSED_ATTRIBUTE) !== paint) {
        element.setAttribute(PRESSED_ATTRIBUTE, paint);
    }
}
function clearTimer(slot) {
    if (slot.live?.timer != null) {
        slot.live.timer();
        slot.live.timer = null;
    }
}
/**
 * Run one event through the machine and make the DOM say what it answered.
 *
 * A step that returns `timer: null` without a phase change is a
 * pass-through: the running phase still owes its transition. So do not clear
 * the timer on every step. That would strand a paint on a control that nobody
 * touches:
 * - Finger jitter inside the slop during the onset delay kills the onset
 *   timer, so the press never paints.
 * - A `pointercancel` or scroll during a quick tap's flash leaves `on`
 *   painted. iOS Safari sends that cancel at `scrollend`, seconds later.
 * - The same during the fade strands `fading` and the tracking slot, which
 *   holds an element that a virtualized list may have unmounted.
 */ function apply(slot, step, sinceEventMs = 0) {
    const live = slot.live;
    if (live == null) {
        return;
    }
    const phaseMoved = step.gesture.phase !== live.gesture.phase;
    if (step.timer != null || phaseMoved) {
        clearTimer(slot);
    }
    live.gesture = step.gesture;
    paintElement(live.element, step.paint);
    if (step.gesture.phase === 'idle') {
        slot.live = null;
        return;
    }
    if (step.timer != null) {
        const kind = step.timer;
        const fire = ()=>{
            if (slot.live != null) {
                slot.live.timer = null;
            }
            apply(slot, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressGestureStep"])(slot.live?.gesture ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["idlePressGesture"])(), {
                kind: TIMER_EVENT[kind]
            }));
        };
        if (kind === 'fade') {
            // The release fade follows the theme's tempo (AST-108). It ends when
            // its animation ends, however late a busy main thread let it start.
            live.timer = endAfterRelease(live.element, pressFadeMs(live.element), fire);
        } else {
            // A TIMER, never `requestAnimationFrame`: iOS throttles frame callbacks
            // while a scroll runs, so a frame-based delay would fire late, after the
            // scroll, and paint a control nobody is pressing any more. The onset
            // counts from the touch, so the time the listener waited comes off it.
            const delay = kind === 'onset' ? Math.max(0, TIMER_MS.onset - sinceEventMs) : TIMER_MS[kind];
            const timer = setTimeout(fire, delay);
            live.timer = ()=>clearTimeout(timer);
        }
    }
}
/**
 * The innermost pressable surface at the touch, or nothing.
 *
 * Innermost wins: a button inside a pressable row takes the press, the way a
 * button inside a native cell takes the highlight instead of the cell. A
 * disabled surface takes it and paints nothing, so a press on a disabled
 * control does not light the row around it.
 */ function surfaceAt(target) {
    if (!(target instanceof Element)) {
        return null;
    }
    const found = target.closest(`[${PRESSABLE_ATTRIBUTE}]`);
    if (!(found instanceof HTMLElement) || found.matches(DISABLED)) {
        return null;
    }
    return found;
}
/**
 * Is this touch a brake on a list that the finger set moving, not a press?
 * A native list highlights nothing for a brake. No later signal cancels it,
 * because the stopped scroll sends no more events.
 *
 * Apps often scroll by themselves (a pinned transcript, `scrollIntoView`, a
 * restored position), so two conditions narrow it:
 * 1. The scroller contains the pressed element.
 * 2. A finger in that scroller drove the scroll, as `onScroll` records.
 */ function scrollerIsBraking(element) {
    if (Date.now() - lastScrollAt >= __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESS_SCROLL_BRAKE_MS"]) {
        return false;
    }
    return lastScroller instanceof Node && lastScroller.contains(element);
}
/**
 * Let go of a slot once its gesture is over.
 *
 * A gesture that became a scroll ends in `pointercancel`, not `pointerup`, so
 * without this the dead gesture holds the slot for ever and every press after
 * the first scroll is swallowed.
 */ function releaseIfDead(slot) {
    if (slot.live?.gesture.phase === 'dead') {
        clearTimer(slot);
        slot.live = null;
    }
}
/** Drop the paint and forget the gesture, without running the machine. */ function finish(slot) {
    const live = slot.live;
    if (live == null) {
        return;
    }
    clearTimer(slot);
    live.element.removeAttribute(PRESSED_ATTRIBUTE);
    slot.live = null;
    if (slot === button) {
        holdKey(false);
    }
}
function cancelPress(element) {
    if (finger.live?.element === element) {
        finish(finger);
    }
    if (button.live?.element === element) {
        finish(button);
    }
}
/** A new press on an element owns its paint: the other slot's gesture there ends. */ function takeOver(other, element) {
    if (other.live?.element === element) {
        finish(other);
    }
}
/**
 * Whether presses with a mouse or a key are the controller's to paint here.
 * Asked at each such press: rendering a pressable never queries the pointer,
 * so a layout that must not depend on it stays independent.
 */ function stylesheetDroppedActive() {
    // The shared touch resolver's key (AST-012): the condition under which the
    // stylesheet drops `:active`, read once per press.
    return typeof window.matchMedia === 'function' && window.matchMedia(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchQueries$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TOUCH_QUERY"]).matches;
}
/**
 * Whether the press on `target` lands on a surface that takes the
 * fine-pointer press. There a mouse's or a pen's press paints at once, on any
 * primary pointer.
 */ function paintsFinePress(target) {
    const surface = surfaceAt(target);
    return surface != null && paintsFinePointerPress(surface);
}
/**
 * Whether `surface` takes the fine-pointer press. It does when it owns a
 * control's box.
 */ function paintsFinePointerPress(surface) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressBox$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressBoxesIn"])(surface).length > 0;
}
/**
 * The surface a mouse button's or the Space key's press paints, if any: the
 * innermost marked surface, outside a menu and off a tracked action. A key's
 * press paints only a focused element that is itself the surface, as
 * `:active` does.
 */ function buttonSurfaceAt(target, pointerId) {
    const element = surfaceAt(target);
    if (element == null || element.closest(MENU_PRESS_ROOT) != null) {
        return null;
    }
    // A tracker that follows a mouse paints a mouse press on its own actions.
    if (pointerId != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressGroupItem$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTrackedByGroup"])(element, 'mouse')) {
        return null;
    }
    if (pointerId == null && element !== target) {
        return null;
    }
    return element;
}
/** Start a mouse button's or the Space key's press on the surface, if there is one. */ function pressButton(target, pointerId) {
    // A press still fading elsewhere goes now: the new one owns the slot.
    finish(button);
    const element = buttonSurfaceAt(target, pointerId);
    if (element == null) {
        return;
    }
    takeOver(finger, element);
    button.live = {
        element,
        gesture: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["idlePressGesture"])(),
        pointerId,
        timer: null
    };
    holdKey(pointerId == null);
    apply(button, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressGestureStep"])(button.live.gesture, {
        kind: 'buttonDown'
    }));
}
/**
 * Whether a release on `element` ends at once. Under Reduce Motion a fine
 * pointer's release changes at once, with no fade. This holds on a surface
 * that takes the fine-pointer press, where the primary pointer is fine.
 */ function releasesAtOnce(element) {
    return paintsFinePointerPress(element) && !stylesheetDroppedActive() && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
/** The mouse button or the key came up: the press fades like a finger's. */ function releaseButton() {
    holdKey(false);
    if (button.live == null) {
        return;
    }
    if (releasesAtOnce(button.live.element)) {
        cancelButton();
        return;
    }
    apply(button, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressGestureStep"])(button.live.gesture, {
        kind: 'up'
    }));
}
/** The platform took the mouse's press away: the paint goes at once. */ function cancelButton() {
    holdKey(false);
    if (button.live == null) {
        return;
    }
    apply(button, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressGestureStep"])(button.live.gesture, {
        kind: 'cancel'
    }));
    releaseIfDead(button);
}
function onPointerDown(event) {
    if (event.pointerType === 'mouse') {
        // A mouse already has hover and keeps `:active` where the primary pointer
        // is fine; the touch treatment's CSS is inside `@media (pointer: coarse)`.
        // Not tracking it there keeps desktop identical and costs the mouse path
        // nothing, except on a surface that takes the fine-pointer press. Only
        // the primary button paints, as `:active` does. On such a surface a
        // macOS ctrl-click is a context click, so it paints nothing either.
        if (stylesheetDroppedActive() ? event.button === 0 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$primaryClick$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPrimaryClick"])(event) && paintsFinePress(event.target)) {
            pressButton(event.target, event.pointerId);
        }
        return;
    }
    // On a surface that takes the fine-pointer press, a pen's barrel or eraser
    // button is not a press.
    if (event.pointerType === 'pen' && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$primaryClick$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPrimaryClick"])(event) && paintsFinePress(event.target)) {
        return;
    }
    armTouchCancel();
    // A second finger or a new press ends the last box contact; its lift is not
    // a still lift.
    endContact(false);
    if (finger.live != null) {
        const fingerIsUp = finger.live.gesture.phase === 'fading' || finger.live.gesture.phase === 'flash';
        // A finger still down means a SECOND finger: a pinch or a two-finger
        // scroll is not a press, so the first gesture ends and the second paints
        // nothing.
        if (!fingerIsUp) {
            finish(finger);
            return;
        }
        // A finger already up means the last tap is still fading. The new touch
        // owns the surface from here; swallowing it would make the second of two
        // quick taps answer with nothing.
        finish(finger);
    }
    const element = surfaceAt(event.target);
    // On a surface that takes the fine-pointer press, a pen presses at once on
    // any primary pointer, in a scroll view too. The delay and the brake wait
    // out a finger's scroll.
    const presentsAtOnce = event.pointerType === 'pen' && element != null && paintsFinePointerPress(element);
    // The touch clock is stamped AFTER the brake reads it, deliberately: the
    // question the brake asks is whether a PREVIOUS finger could still be
    // driving this scroll, and stamping first would make every first touch on a
    // freshly restored page answer yes.
    const braking = element != null && !presentsAtOnce && scrollerIsBraking(element);
    lastTouchAt = Date.now();
    lastTouchTarget = event.target instanceof Node ? event.target : null;
    // A group's tracker that follows this pointer paints its action, so two
    // writers would erase each other's paint. The touch still counts for the
    // brake above.
    if (element == null || (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressGroupItem$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTrackedByGroup"])(element, event.pointerType)) {
        return;
    }
    // A braking finger presses nothing, but a box hold still follows it.
    const end = boxHold?.start(element, event.target) ?? null;
    const live = braking ? null : {
        element,
        gesture: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["idlePressGesture"])(),
        pointerId: event.pointerId,
        timer: null
    };
    if (end != null) {
        contact = {
            pointerId: event.pointerId,
            live,
            end
        };
    }
    if (live == null) {
        return;
    }
    takeOver(button, element);
    finger.live = live;
    apply(finger, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressGestureStep"])(live.gesture, {
        kind: 'down',
        x: event.clientX,
        y: event.clientY,
        delayed: !presentsAtOnce && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isInsideScrollView"])(element)
    }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputAge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["msSinceInput"])(event.timeStamp, event));
}
function onPointerMove(event) {
    const live = finger.live;
    if (live == null || live.pointerId != null && event.pointerId !== live.pointerId) {
        return;
    }
    // The finger drags the surface's own control: its travel keeps the press.
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressHoldsDrag$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["holdsPressThroughDrag"])(live.element)) {
        return;
    }
    apply(finger, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressGestureStep"])(live.gesture, {
        kind: 'move',
        x: event.clientX,
        y: event.clientY
    }));
}
function onPointerUp(event) {
    // The mouse exclusion applies to the brake's clocks too, not only to the
    // paint: a mouse release inside a scroller would make the next wheel or
    // programmatic scroll there look finger-driven, which swallows a real touch
    // press landing inside the brake window. A coarse pointer and a mouse can
    // both be present on one device.
    if (event.pointerType === 'mouse') {
        if (button.live != null && button.live.pointerId === event.pointerId) {
            releaseButton();
        }
        return;
    }
    // The lift is when momentum starts, so it is the clock the brake wants most.
    lastTouchAt = Date.now();
    if (event.target instanceof Node) {
        lastTouchTarget = event.target;
    }
    if (contact != null && contact.pointerId === event.pointerId) {
        // Read before the release step: a press that travelled or that a scroll
        // took is dead or gone by now.
        const pressed = contact.live;
        endContact(pressed != null && finger.live === pressed && pressed.gesture.phase !== 'dead');
    }
    const live = finger.live;
    if (live == null || live.pointerId != null && event.pointerId !== live.pointerId) {
        return;
    }
    const step = event.pointerType === 'pen' && releasesAtOnce(live.element) ? 'cancel' : 'up';
    apply(finger, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressGestureStep"])(live.gesture, {
        kind: step
    }));
    releaseIfDead(finger);
}
/**
 * The scroller claimed the gesture, or the platform took it.
 *
 * `pointercancel` is the primary signal. On iOS it fires before the first
 * `scroll` event, so this cancel runs one frame ahead of the list's motion,
 * as UIKit's `touchesCancelled` does.
 */ function onCancel(event) {
    // A cancelled mouse pointer ends the mouse's press, not a finger's.
    const pointer = event;
    if (pointer?.pointerType === 'mouse') {
        if (button.live != null && button.live.pointerId === pointer.pointerId) {
            cancelButton();
        }
        return;
    }
    // Only the pointer's own cancel ends its contact. A scroll's cancel keeps it:
    // the finger is still down.
    if (pointer?.pointerId != null && contact?.pointerId === pointer.pointerId) {
        endContact(false);
    }
    const live = finger.live;
    if (live == null) {
        return;
    }
    apply(finger, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressGestureStep"])(live.gesture, {
        kind: 'cancel'
    }));
    // The pointer is gone: a scroll-claimed gesture sends no further pointer
    // events, so nothing else would ever free the slot.
    releaseIfDead(finger);
}
/**
 * `dragstart`, and NOT `contextmenu`: a press that becomes a drag has taken
 * the gesture, whatever pressed it, but a right-click is a mouse act this
 * controller never tracks, and listening for it would read as a takeover of
 * the browser's own menu.
 */ function onDragStart() {
    onCancel();
    cancelButton();
}
/** A scroll anywhere above the pressed element, caught in the capture phase. */ function onScroll(event) {
    const scroller = event.target instanceof Node ? event.target : document;
    // A scroll counts as a finger's only if that finger was inside THIS
    // scroller, recently. Anything else is the program moving something, and
    // must leave the brake unarmed rather than merely un-refreshed.
    const driven = Date.now() - lastTouchAt < PRESS_GESTURE_MEMORY_MS && lastTouchTarget != null && scroller.contains(lastTouchTarget);
    if (driven) {
        lastScrollAt = Date.now();
        lastScroller = scroller;
    }
    const live = finger.live;
    if (live == null) {
        return;
    }
    // The CANCEL arm is deliberately wider than the brake: any scroll above the
    // pressed element takes the gesture, driven by a finger or not. A mouse's
    // or a key's press is not a finger's and keeps going, as `:active` does.
    const reaches = scroller === document || scroller.contains(live.element);
    if (!reaches) {
        return;
    }
    onCancel();
}
/** Whether a Space press on this element is an activation browsers paint as `:active`. */ function activatesOnSpace(target) {
    if (target instanceof HTMLButtonElement) {
        return true;
    }
    return target instanceof HTMLInputElement && SPACE_ACTIVATED_INPUT_TYPES.has(target.type);
}
/** A tracked action takes no `:active` paint, so a key's press paints here. */ function isTrackedAction(target) {
    return target instanceof Element && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressGroupItem$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTrackedByGroup"])(target);
}
/**
 * Space went down on a focused button that is itself a pressable surface.
 * Heard in the BUBBLE phase, after the page's own handlers, so a press the
 * page cancelled (`preventDefault`) paints nothing, exactly as `:active` does
 * not engage for one.
 */ function onKeyDown(event) {
    if (event.key !== ' ' || event.repeat || event.isComposing || event.defaultPrevented || !activatesOnSpace(event.target) || !(stylesheetDroppedActive() || isTrackedAction(event.target))) {
        return;
    }
    pressButton(event.target, null);
}
function onKeyUp(event) {
    if (event.key === ' ' && button.live != null && button.live.pointerId == null) {
        releaseButton();
    }
}
/**
 * Focus left the pressed button, or the window lost focus: the key's release
 * may never arrive here, so the press ends now, with its fade.
 */ function onBlur() {
    if (button.live != null && button.live.pointerId == null) {
        releaseButton();
    }
}
/**
 * The backstop: a surface that leaves the document while it is painted must
 * not come back painted. A virtualized list mounts and unmounts rows as they
 * cross the scrollport, and React re-uses elements; the scroll cancel already
 * makes that unreachable while a press is live, because recycling needs a
 * scroll.
 */ function onVisibilityChange() {
    if (document.visibilityState === 'hidden') {
        endContact(false);
        finish(finger);
        finish(button);
    }
}
/** The input stream subscriptions while installed. */ let unsubscribers = [];
/** The touch-only `touchcancel` subscription, while the pointer is coarse. */ let stopTouchCancel = null;
let stopWatchingPointer = null;
/**
 * The touch-only listener is on only while the primary pointer is coarse.
 * Where it is fine, a finger's press still ends through `pointercancel`.
 */ function hearTouchCancel(on) {
    if (on === (stopTouchCancel != null)) {
        return;
    }
    if (on) {
        stopTouchCancel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(window, 'touchcancel', onCancel);
    } else {
        stopTouchCancel?.();
        stopTouchCancel = null;
    }
}
/**
 * Read the primary pointer when the first finger or pen lands, and follow it
 * from then on: installing asks nothing, so a page no one touches never
 * queries it.
 */ function armTouchCancel() {
    if (stopWatchingPointer != null) {
        return;
    }
    stopWatchingPointer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$coarsePointer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["watchCoarsePointer"])(window, hearTouchCancel);
    hearTouchCancel((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$coarsePointer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCoarsePointer"])(window));
}
// The pointer, drag, scroll and visibility listeners are passive and on the
// window's capture phase, through the shared input stream
// (utils/inputStream.ts): a page of pressables blocks no scroll, and an app's
// capture-phase stopPropagation at the document cannot starve the controller.
function addListeners() {
    unsubscribers = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(window, 'pointerdown', onPointerDown),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(window, 'pointermove', onPointerMove),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(window, 'pointerup', onPointerUp),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(window, 'pointercancel', onCancel),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(window, 'dragstart', onDragStart),
        // `scroll` does not bubble; the capture phase hears every scroller.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(window, 'scroll', onScroll),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(window, 'visibilitychange', onVisibilityChange)
    ];
    // The key path listens after the page's own handlers, at the window's
    // bubble phase: a Space press the page cancels (`defaultPrevented`) paints
    // nothing. Only Space's press needs the key's release and focus loss, so
    // those two are attached while it is held (holdKey).
    window.addEventListener('keydown', onKeyDown, PASSIVE);
}
function removeListeners() {
    endContact(false);
    boxHold?.endWaits();
    for (const unsubscribe of unsubscribers.splice(0)){
        unsubscribe();
    }
    stopWatchingPointer?.();
    stopWatchingPointer = null;
    hearTouchCancel(false);
    window.removeEventListener('keydown', onKeyDown);
    holdKey(false);
}
const PASSIVE_CAPTURE = {
    capture: true,
    passive: true
};
const PASSIVE = {
    passive: true
};
/** Whether the key-release listeners are attached. */ let keyHeld = false;
/**
 * Attach the key's release and focus-loss listeners while Space holds a
 * press, and take them down when it ends: at rest the key path costs one
 * `keydown` listener.
 */ function holdKey(held) {
    if (held === keyHeld) {
        return;
    }
    keyHeld = held;
    if (held) {
        window.addEventListener('keyup', onKeyUp, PASSIVE);
        // `blur` does not bubble: the capture phase hears the element losing
        // focus and the window losing it.
        window.addEventListener('blur', onBlur, PASSIVE_CAPTURE);
    } else {
        window.removeEventListener('keyup', onKeyUp);
        window.removeEventListener('blur', onBlur, PASSIVE_CAPTURE);
    }
}
function installPressFeedback() {
    if ("TURBOPACK compile-time truthy", 1) {
        return ()=>undefined;
    }
    //TURBOPACK unreachable
    ;
    let released;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/pressGesture.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PRESS_FADE_MS",
    ()=>PRESS_FADE_MS,
    "PRESS_FLASH_MS",
    ()=>PRESS_FLASH_MS,
    "PRESS_ONSET_MS",
    ()=>PRESS_ONSET_MS,
    "PRESS_SCROLL_BRAKE_MS",
    ()=>PRESS_SCROLL_BRAKE_MS,
    "PRESS_SLOP_PX",
    ()=>PRESS_SLOP_PX,
    "idlePressGesture",
    ()=>idlePressGesture,
    "pressGestureStep",
    ()=>pressGestureStep
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file pressGesture.ts
 * @input A press gesture's current phase and one pointer, key or timer event
 * @output Exports the press state machine (pressGestureStep, idlePressGesture),
 *   its clocks (PRESS_ONSET_MS, PRESS_SLOP_PX, PRESS_FLASH_MS, PRESS_FADE_MS,
 *   PRESS_SCROLL_BRAKE_MS) and their types
 * @position Pure half of the touch press model; driven by pressFeedback.ts,
 *   tested by pressGesture.test.ts without a browser
 *
 * SYNC: When modified, update pressFeedback.ts (the controller) and
 * pressGesture.test.ts.
 */ // A native list delays a press by 0.15 s, cancels it when a scroll claims the
// gesture, never brings it back in that gesture, and fades it only on
// release. On iOS Safari, CSS `:active` paints at once and stays painted into
// a scroll. So on a coarse pointer this machine owns the pressed state, and
// `:active` keeps only the mouse. The stylesheet drops `:active` by the
// primary pointer, so a mouse, trackpad or Space press on such a device comes
// here as `buttonDown`: painted at once and faded on release.
//
// Only a finger inside a scroller waits. The controller tells the machine
// which touch waits (`down`'s `delayed`), and a touch that does not wait goes
// straight to `pressed`. After that the machine is the same.
//
// The constants were measured against native apps. The machine knows nothing
// of the DOM, so {@link pressGestureStep}'s cases are the state diagram.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokenReferences$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokenReferences.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
;
;
const PRESS_ONSET_MS = 150;
const PRESS_SLOP_PX = 10;
const PRESS_FLASH_MS = 100;
const PRESS_FADE_MS = Number.parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokenReferences$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveTokenReferences"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["durationDefaults"])['--duration-exit']);
const PRESS_SCROLL_BRAKE_MS = 150;
/** What the surface should be painting. `fading` is the release's exit. */ /**
 * Where a gesture is.
 *
 * `dead` is the load-bearing one: a gesture that became a scroll stays dead
 * until the finger lifts and a new one starts, so a finger that stops moving,
 * or comes back to the control it started on, paints nothing. That is the
 * difference between this and `:active`.
 *
 * `buttonHeld` is a press made with a mouse button or the Space key. No
 * scroller can claim one, so it paints at once, travel does not end it, and
 * only the release does.
 */ const IDLE = {
    originX: 0,
    originY: 0,
    phase: 'idle'
};
/** A finger that has gone this far is scrolling, not pressing. */ function travelled(gesture, x, y) {
    return Math.hypot(x - gesture.originX, y - gesture.originY) > PRESS_SLOP_PX;
}
function step(gesture, phase, paint, timer) {
    return {
        gesture: {
            ...gesture,
            phase
        },
        paint,
        timer
    };
}
function pressGestureStep(gesture, event) {
    if (event.kind === 'down') {
        // A surface with no scroller above it: nothing can turn this touch into a
        // scroll, so it paints in the frame it lands, as a UIControl highlights.
        if (event.delayed === false) {
            return {
                gesture: {
                    originX: event.x,
                    originY: event.y,
                    phase: 'pressed'
                },
                paint: 'on',
                timer: null
            };
        }
        // A new touch always starts armed and painting nothing, whatever the last
        // gesture ended as. This is the only way out of `dead`.
        return {
            gesture: {
                originX: event.x,
                originY: event.y,
                phase: 'armed'
            },
            paint: 'none',
            timer: 'onset'
        };
    }
    if (event.kind === 'buttonDown') {
        // Nothing can turn a mouse button or a key into a scroll, so there is
        // nothing to wait for: paint now, as `:active` does on a desktop.
        return {
            gesture: {
                originX: 0,
                originY: 0,
                phase: 'buttonHeld'
            },
            paint: 'on',
            timer: null
        };
    }
    switch(gesture.phase){
        case 'armed':
            if (event.kind === 'move') {
                // Travel is a scroll. Nothing was painted, so nothing is removed; the
                // gesture is simply over.
                return travelled(gesture, event.x, event.y) ? step(gesture, 'dead', 'none', null) : {
                    gesture,
                    paint: 'none',
                    timer: null
                };
            }
            // The scroller claimed it before the delay elapsed: the fling case, and
            // the reason a flick paints nothing at all.
            if (event.kind === 'cancel') {
                return step(gesture, 'dead', 'none', null);
            }
            // The finger stayed. Paint, instantly and completely.
            if (event.kind === 'onset') {
                return step(gesture, 'pressed', 'on', null);
            }
            // Too quick for the delay. UIKit forwards the held touch and the release
            // together, so the paint appears HERE, at the lift.
            if (event.kind === 'up') {
                return step(gesture, 'flash', 'on', 'flash');
            }
            return {
                gesture,
                paint: 'none',
                timer: null
            };
        case 'pressed':
            if (event.kind === 'move' && !travelled(gesture, event.x, event.y)) {
                // A press with a shaky hand is still a press: measured, a 4 pt drag
                // over 2 s kept the native highlight for the whole gesture.
                return {
                    gesture,
                    paint: 'on',
                    timer: null
                };
            }
            // A cancel removes the paint with no transition, one frame BEFORE the
            // list moves.
            if (event.kind === 'move' || event.kind === 'cancel') {
                return step(gesture, 'dead', 'none', null);
            }
            // A release fades.
            if (event.kind === 'up') {
                return step(gesture, 'fading', 'fading', 'fade');
            }
            return {
                gesture,
                paint: 'on',
                timer: null
            };
        case 'buttonHeld':
            // Travel is not a scroll here (a mouse dragged off a button keeps its
            // `:active` until the button comes up), so only the release ends the
            // press, with the same fade a finger's release gets.
            if (event.kind === 'up') {
                return step(gesture, 'fading', 'fading', 'fade');
            }
            // The platform took it (a drag began, the pointer was cancelled): the
            // paint goes at once, as for a finger.
            if (event.kind === 'cancel') {
                return step(gesture, 'dead', 'none', null);
            }
            return {
                gesture,
                paint: 'on',
                timer: null
            };
        case 'flash':
            // The full-strength hold is over; hand it to the same fade a long press
            // gets, so both releases leave the same way.
            if (event.kind === 'flashEnd') {
                return step(gesture, 'fading', 'fading', 'fade');
            }
            // The finger is already up. A cancel here is the platform tidying up
            // after the tap (iOS sends `pointercancel` at `scrollend`), and it must
            // not clip the answer the tap earned.
            return {
                gesture,
                paint: 'on',
                timer: null
            };
        case 'fading':
            if (event.kind === 'fadeEnd') {
                return {
                    gesture: IDLE,
                    paint: 'none',
                    timer: null
                };
            }
            return {
                gesture,
                paint: 'fading',
                timer: null
            };
        case 'dead':
            // The finger lifting is what ends a cancelled gesture: until it does, a
            // second finger is a second finger and not a press. Resolving to idle
            // here is what lets the NEXT touch be heard at all; without it a gesture
            // that became a scroll holds the controller's one slot for ever, and
            // every press after the first scroll answers with nothing.
            if (event.kind === 'up') {
                return {
                    gesture: IDLE,
                    paint: 'none',
                    timer: null
                };
            }
            return {
                gesture,
                paint: 'none',
                timer: null
            };
        case 'idle':
            // Only a touch (handled above) starts a gesture; anything else while
            // idle is a stray timer or a release with nothing to release.
            return {
                gesture: IDLE,
                paint: 'none',
                timer: null
            };
    }
}
function idlePressGesture() {
    return IDLE;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/primaryClick.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isPrimaryClick",
    ()=>isPrimaryClick
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file primaryClick.ts
 * @input A mouse or pen button press: its `button` and `ctrlKey`
 * @output Exports isPrimaryClick
 * @position Internal util, the one primary-click rule: the gesture host
 *   starts a press only for one, and the press controller paints only one;
 *   platform detection is utils/isApplePlatform.ts
 *
 * Deliberately absent from utils/index.ts: packages/core/src/index.ts does
 * `export * from './utils'`, so naming it there would publish it as API.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isApplePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/isApplePlatform.js [app-ssr] (ecmascript)");
;
function isPrimaryClick(event) {
    return event.button === 0 && !(event.ctrlKey && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isApplePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isApplePlatform"])());
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/safeUrl.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSafeDestination",
    ()=>isSafeDestination,
    "isSafeUrl",
    ()=>isSafeUrl,
    "sanitizeUrl",
    ()=>sanitizeUrl
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file safeUrl.ts
 * @input Navigation strings or supported structured router destinations
 * @output The shared blocked-scheme decision, without rewriting accepted inputs
 * @position Core navigation policy; embedded-resource policy is separate
 */ function normalizeUrl(url) {
    // eslint-disable-next-line no-control-regex -- inspect schemes without browser-ignored controls
    return url.replace(/[\x00-\x1f\x7f]/g, '').trim();
}
/**
 * The form a URL's scheme is compared in: lowercase, and without the spaces
 * after the scheme's colon, which a data URL's media type ignores
 * (`data: text/html` is HTML).
 */ function comparableUrl(normalized) {
    return normalized.toLowerCase().replace(/^([a-z][a-z\d+.-]*:) +/, '$1');
}
function sanitizeUrl(url) {
    const normalized = normalizeUrl(url);
    const lower = comparableUrl(normalized);
    if (lower.startsWith('javascript:') || lower.startsWith('vbscript:') || lower.startsWith('data:text/html')) {
        return null;
    }
    return normalized;
}
function isSafeUrl(url) {
    return sanitizeUrl(url) !== null;
}
function isSafeDestination(destination) {
    if (destination == null) {
        return true;
    }
    if (typeof destination === 'string') {
        return isSafeUrl(destination);
    }
    if (typeof destination !== 'object') {
        return false;
    }
    const { pathname, href, protocol, host, hostname } = destination;
    for (const field of [
        pathname,
        href,
        protocol,
        host,
        hostname
    ]){
        if (field != null && typeof field !== 'string') {
            return false;
        }
    }
    if (typeof pathname === 'string' && !isSafeUrl(pathname)) {
        return false;
    }
    if (typeof href === 'string' && !isSafeUrl(href)) {
        return false;
    }
    if (typeof protocol === 'string' && protocol !== '') {
        // URL-object formatters accept a protocol with or without its colon and
        // can assemble a data media type from the host and pathname fields.
        const normalizedProtocol = normalizeUrl(protocol);
        const prefix = normalizedProtocol.endsWith(':') ? normalizedProtocol : `${normalizedProtocol}:`;
        if (!isSafeUrl(prefix)) {
            return false;
        }
        const body = host || hostname || '';
        const path = typeof pathname === 'string' ? pathname : '';
        if (!isSafeUrl(`${prefix}${body}${path}`)) {
            return false;
        }
    }
    return true;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/scrollView.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SCROLLABLE_OVERFLOW",
    ()=>SCROLLABLE_OVERFLOW,
    "isInsideScrollView",
    ()=>isInsideScrollView,
    "parseTouchAction",
    ()=>parseTouchAction,
    "rootOverflow",
    ()=>rootOverflow,
    "touchActionAllowsPan",
    ()=>touchActionAllowsPan
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file scrollView.ts
 * @input An element and its computed styles
 * @output Exports parseTouchAction, touchActionAllowsPan, rootOverflow,
 *   SCROLLABLE_OVERFLOW and isInsideScrollView: whether a touch on the
 *   element lands inside a box the browser can scroll
 * @position The one definition of "inside a scroll view", shared by the
 *   press feedback controller (utils/pressFeedback.ts), the gesture core's
 *   native-scroll probe (gestures/nativeScroll.ts) and Layer's outside-press
 *   watch, so Core's main entry can ask it without the gesture core
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/flatTree.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/nodeType.js [app-ssr] (ecmascript)");
;
;
const SCROLLABLE_OVERFLOW = new Set([
    'auto',
    'scroll',
    'overlay'
]);
/** How far a box must overflow, in px, before it counts as scrolling. */ const OVERFLOW_TOLERANCE_PX = 1;
function parseTouchAction(value) {
    const tokens = value.trim().split(/\s+/);
    if (tokens.includes('auto') || tokens.includes('manipulation')) {
        return {
            x: true,
            y: true
        };
    }
    if (tokens.includes('none')) {
        return {
            x: false,
            y: false
        };
    }
    return {
        x: tokens.some((token)=>token === 'pan-x' || token === 'pan-left' || token === 'pan-right'),
        y: tokens.some((token)=>token === 'pan-y' || token === 'pan-up' || token === 'pan-down')
    };
}
function touchActionAllowsPan(element, axis) {
    const view = element.ownerDocument.defaultView;
    if (view == null) {
        return false;
    }
    for(let node = element; node != null; node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parentAcrossShadow"])(node)){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(node) && !parseTouchAction(view.getComputedStyle(node).touchAction || 'auto')[axis]) {
            return false;
        }
    }
    return true;
}
function rootOverflow(doc, axis) {
    const view = doc.defaultView;
    if (view == null) {
        return 'hidden';
    }
    for (const element of [
        doc.documentElement,
        doc.body
    ]){
        if (element == null) {
            continue;
        }
        const style = view.getComputedStyle(element);
        const value = axis === 'x' ? style.overflowX : style.overflowY;
        if (value === 'hidden' || value === 'clip') {
            return 'hidden';
        }
    }
    return 'auto';
}
function overflows(element, axis) {
    return axis === 'y' ? element.scrollHeight - element.clientHeight > OVERFLOW_TOLERANCE_PX : element.scrollWidth - element.clientWidth > OVERFLOW_TOLERANCE_PX;
}
function isInsideScrollView(element, { readsTouchAction = true } = {}) {
    const doc = element.ownerDocument;
    const view = doc.defaultView;
    if (view == null) {
        return false;
    }
    const root = doc.scrollingElement ?? doc.documentElement;
    let panX = true;
    let panY = true;
    for(let node = element; node != null;){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(node)) {
            const style = view.getComputedStyle(node);
            if (readsTouchAction) {
                const pans = parseTouchAction(style.touchAction || 'auto');
                panX &&= pans.x;
                panY &&= pans.y;
            }
            if (node === root || node === doc.documentElement) {
                break;
            }
            if (panY && SCROLLABLE_OVERFLOW.has(style.overflowY) && overflows(node, 'y') || panX && SCROLLABLE_OVERFLOW.has(style.overflowX) && overflows(node, 'x')) {
                return true;
            }
            if (style.position === 'fixed') {
                return false;
            }
        }
        node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parentAcrossShadow"])(node);
    }
    return panY && SCROLLABLE_OVERFLOW.has(rootOverflow(doc, 'y')) && overflows(root, 'y') || panX && SCROLLABLE_OVERFLOW.has(rootOverflow(doc, 'x')) && overflows(root, 'x');
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/selectionLock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "caretAt",
    ()=>caretAt,
    "lockDragSelection",
    ()=>lockDragSelection,
    "lockSelection",
    ()=>lockSelection,
    "locksSelectionFor",
    ()=>locksSelectionFor,
    "selectionRangesOf",
    ()=>selectionRangesOf,
    "startsOnSelectableText",
    ()=>startsOnSelectableText
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file selectionLock.ts
 * @input The elements a held touch contact presses, and the touch's target
 * @output lockSelection and locksSelectionFor give a held finger's lock.
 *   lockDragSelection gives a claimed mouse or pen drag's hold, which keeps
 *   the page's selection. startsOnSelectableText and selectionRangesOf are
 *   what a mouse or pen press reads.
 * @position Recognizers whose hold does something bring lockSelection; the
 *   gesture host imports the drag hold and the press reads.
 *
 * SYNC: When modified, update GestureHost.ts and utils/pressFeedback.ts; the
 * iOS query matches utils/touchPresentation.ts.
 */ // A hold that does something never starts a selection or the callout under
// the finger (AST-094). A text field keeps its selection, because a held
// finger places its caret. A style change repaints what it covers, so the
// way to refuse differs by engine:
// - iOS WebKit fires no `selectstart` for a long press, so only
//   `user-select` refuses it. The lock covers every held element, inline and
//   refcounted. A lock on only the element under the finger let a long press
//   select a word beside it. WebKit makes every input selectable, so an input
//   under the finger is locked too.
// - Elsewhere, cancelling `selectstart` refuses the selection with no style
//   write, so nothing repaints.
//
// A mouse never takes the lock, so its released behavior stays (AST-017).
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/flatTree.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputStream.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchQueries$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/touchQueries.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/nodeType.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-ssr] (ecmascript)");
;
;
;
;
;
/** What a held finger must not start on a control or a cell. */ const SELECTION_LOCK = [
    '-webkit-touch-callout',
    '-webkit-user-select',
    'user-select'
];
/** Inputs whose text a held finger edits: it places the caret there. */ const TEXT_ENTRY_TYPES = new Set([
    'text',
    'search',
    'email',
    'url',
    'tel',
    'password',
    'number'
]);
function locksSelectionFor(pointerType) {
    return pointerType !== 'mouse';
}
/**
 * Locked elements, how many contacts hold each, and what to restore. Every
 * copy of Core counts here, so the first lock's saved styles come back only
 * after the last release in any copy.
 */ const locks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedWeakMap"])('utils/selection-lock/locks', 1);
function lockSelection(elements, target) {
    const set = new Set(elements);
    if (isSelectableControl(target) && [
        ...set
    ].some((element)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containsAlongFlatTree"])(element, target))) {
        set.add(target);
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchQueries$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isIosWebKit"])()) {
        const refuse = (event)=>{
            if (!isTextEntry(event.target)) {
                event.preventDefault();
            }
        };
        for (const element of set){
            element.addEventListener('selectstart', refuse);
        }
        let isRefusing = true;
        return ()=>{
            if (isRefusing) {
                isRefusing = false;
                for (const element of set){
                    element.removeEventListener('selectstart', refuse);
                }
            }
        };
    }
    return lockStyles(set);
}
function lockDragSelection(elements, view, kept, onReleased) {
    const doc = view?.document ?? null;
    let keptRanges = kept;
    let roots = shadowRootsOfRanges(keptRanges);
    // The selection when the lift released the hold, until the lift's
    // handlers ran.
    let atLift = null;
    const restore = ()=>{
        const selection = view?.getSelection();
        // The focused field keeps its own selection (a drag never starts in one).
        if (selection == null || isTextEntry((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deepActiveElement"])(doc))) {
            return;
        }
        const held = heldRanges(selection, roots);
        if (keptRanges.length === 0) {
            if (held.some((range)=>!range.collapsed)) {
                selection.removeAllRanges();
            }
            return;
        }
        // A render can remove what the kept selection held: then there is
        // nothing to put back.
        if (sameRanges(held, keptRanges) || !keptRanges.every(isValidRange)) {
            return;
        }
        selectRanges(selection, keptRanges);
    };
    restore();
    const set = new Set(elements);
    const refuse = (event)=>{
        if (!isTextEntry(event.target)) {
            event.preventDefault();
        }
    };
    for (const element of set){
        element.addEventListener('selectstart', refuse);
    }
    const stopDocument = view == null ? [] : [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'selectstart', refuse, {
            cancels: true
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'selectionchange', restore)
    ];
    const unlockStyles = lockStyles(set);
    let stage = 'held';
    let timer = null;
    const releaseDocument = ()=>{
        if (stage === 'done') {
            return;
        }
        stage = 'done';
        if (timer != null) {
            view?.clearTimeout(timer);
            timer = null;
        }
        try {
            restore();
        } finally{
            for (const stop of stopDocument){
                stop();
            }
            onReleased?.();
        }
    };
    const release = ({ isCancel = false } = {})=>{
        if (stage === 'held') {
            stage = 'lifted';
            atLift = selectionRangesOf(view);
            for (const element of set){
                element.removeEventListener('selectstart', refuse);
            }
            unlockStyles();
            // A lift's own mouseup and click follow in its task and must still
            // meet the hold; nothing follows a cancel, which ends it at once.
            if (view == null || isCancel) {
                releaseDocument();
            } else {
                timer = view.setTimeout(releaseDocument, 0);
            }
        } else if (stage === 'lifted' && isCancel) {
            releaseDocument();
        }
    };
    release.keepLiftSelection = ()=>{
        if (stage !== 'lifted' || atLift == null) {
            return;
        }
        const before = atLift;
        atLift = null;
        const keepIfChanged = ()=>{
            const now = selectionRangesOf(view);
            if (stage !== 'done' && !sameRanges(now, before)) {
                keptRanges = now;
                roots = shadowRootsOfRanges(now);
            }
        };
        keepIfChanged();
        // A click's state update renders in a microtask, and its layout effect
        // may select then. That still runs before the press's own mouseup.
        queueMicrotask(keepIfChanged);
    };
    return release;
}
function selectionRangesOf(view) {
    const selection = view?.getSelection();
    if (selection == null) {
        return [];
    }
    const composed = composedRangesOf(selection, []);
    if (composed != null) {
        return composed.filter((range)=>!range.collapsed).map(liveWhereItCan);
    }
    if (selection.isCollapsed) {
        return [];
    }
    const ranges = [];
    for(let index = 0; index < selection.rangeCount; index++){
        ranges.push(selection.getRangeAt(index).cloneRange());
    }
    return ranges;
}
function startsOnSelectableText(doc, x, y, target) {
    if (isTextEntry(target)) {
        return true;
    }
    const caret = caretAt(doc, x, y, [
        ...ownShadowRoot(target),
        ...openShadowRootsOf(target)
    ]);
    if (caret == null) {
        return false;
    }
    const { node, offset } = caret;
    if (node.nodeType !== 3 || (node.textContent ?? '').trim() === '') {
        return false;
    }
    // Text directly under a shadow root takes its host's style.
    const element = node.parentElement ?? (node.parentNode == null ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadowHostOf"])(node.parentNode));
    if (element == null || !allowsSelection(element) || isInButton(node)) {
        return false;
    }
    const length = (node.textContent ?? '').length;
    const range = doc.createRange();
    if (typeof range.getClientRects !== 'function') {
        return false;
    }
    for (const start of [
        offset - 1,
        offset
    ]){
        if (start < 0 || start >= length) {
            continue;
        }
        range.setStart(node, start);
        range.setEnd(node, start + 1);
        for (const rect of Array.from(range.getClientRects())){
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                return true;
            }
        }
    }
    return false;
}
/** Whether `node` is inside a native button, along the flat tree. */ function isInButton(node) {
    for(let at = node; at != null; at = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parentAcrossShadow"])(at)){
        if (at.nodeType === 1 && at.localName === 'button') {
            return true;
        }
    }
    return false;
}
function caretAt(doc, x, y, shadowRoots) {
    const queries = doc;
    if (typeof queries.caretPositionFromPoint === 'function') {
        // Without the roots, a point over shadow text answers at its host.
        const position = shadowRoots.length > 0 ? queries.caretPositionFromPoint(x, y, {
            shadowRoots: [
                ...shadowRoots
            ]
        }) : queries.caretPositionFromPoint(x, y);
        return position == null ? null : {
            node: position.offsetNode,
            offset: position.offset
        };
    }
    if (typeof queries.caretRangeFromPoint === 'function') {
        const range = queries.caretRangeFromPoint(x, y);
        return range == null ? null : {
            node: range.startContainer,
            offset: range.startOffset
        };
    }
    return null;
}
/** Whether an element's text can be selected (`user-select` is not none). */ function allowsSelection(element) {
    const style = element.ownerDocument.defaultView?.getComputedStyle(element);
    if (style == null) {
        return false;
    }
    return style.getPropertyValue('user-select') !== 'none' && style.getPropertyValue('-webkit-user-select') !== 'none';
}
/**
 * The ranges `selection` holds, with boundaries inside `shadowRoots` where the
 * engine reads composed ranges.
 */ function heldRanges(selection, shadowRoots) {
    const composed = composedRangesOf(selection, shadowRoots);
    if (composed != null) {
        return composed;
    }
    const ranges = [];
    for(let index = 0; index < selection.rangeCount; index++){
        ranges.push(selection.getRangeAt(index));
    }
    return ranges;
}
/**
 * A live copy of `range` when both boundaries share a root, so it follows
 * DOM changes. A range across roots stays static: no live range holds it.
 */ function liveWhereItCan(range) {
    const live = range.startContainer.ownerDocument?.createRange();
    if (live == null || range.startContainer.getRootNode() !== range.endContainer.getRootNode()) {
        return range;
    }
    live.setStart(range.startContainer, range.startOffset);
    live.setEnd(range.endContainer, range.endOffset);
    return live;
}
/** Whether both of `range`'s boundaries still exist in the document. */ function isValidRange(range) {
    return isValidBoundary(range.startContainer, range.startOffset) && isValidBoundary(range.endContainer, range.endOffset);
}
function isValidBoundary(node, offset) {
    const length = node.nodeType === 3 || node.nodeType === 4 || node.nodeType === 8 ? node.length : node.childNodes.length;
    return node.isConnected && offset >= 0 && offset <= length;
}
/** Whether two range lists have the same boundaries, in order. */ function sameRanges(held, kept) {
    return held.length === kept.length && kept.every((range, index)=>{
        const other = held[index];
        return other.startContainer === range.startContainer && other.startOffset === range.startOffset && other.endContainer === range.endContainer && other.endOffset === range.endOffset;
    });
}
/**
 * Put `ranges` back as the selection. One range goes through
 * `setBaseAndExtent`, which also reaches inside a shadow root.
 */ function selectRanges(selection, ranges) {
    const [only] = ranges;
    if (ranges.length === 1 && typeof selection.setBaseAndExtent === 'function') {
        selection.setBaseAndExtent(only.startContainer, only.startOffset, only.endContainer, only.endOffset);
        return;
    }
    selection.removeAllRanges();
    for (const range of ranges){
        const copy = range.startContainer.ownerDocument?.createRange();
        if (copy == null) {
            continue;
        }
        copy.setStart(range.startContainer, range.startOffset);
        copy.setEnd(range.endContainer, range.endOffset);
        selection.addRange(copy);
    }
}
/**
 * The selection's composed ranges, reaching into each open shadow root a
 * boundary lands on; null where the engine has no `getComposedRanges`.
 * Without the roots, a selection inside a shadow root reads as one around
 * its host.
 */ function composedRangesOf(selection, known) {
    const query = selection.getComposedRanges;
    if (typeof query !== 'function') {
        return null;
    }
    // Engines take the roots as a dictionary, or, in older releases, as
    // arguments.
    const read = (roots)=>{
        try {
            return query.call(selection, {
                shadowRoots: roots
            });
        } catch  {
            try {
                return query.call(selection, ...roots);
            } catch  {
                return null;
            }
        }
    };
    const roots = [
        ...known
    ];
    for(;;){
        const ranges = read([
            ...roots
        ]);
        if (ranges == null) {
            return null;
        }
        const found = new Set();
        for (const range of ranges){
            for (const [node, offset] of [
                [
                    range.startContainer,
                    range.startOffset
                ],
                [
                    range.endContainer,
                    range.endOffset
                ]
            ]){
                for (const child of [
                    node.childNodes[offset],
                    node.childNodes[offset - 1]
                ]){
                    const root = child?.nodeType === 1 ? child.shadowRoot : null;
                    if (root != null && !roots.includes(root)) {
                        found.add(root);
                    }
                }
            }
        }
        if (found.size === 0) {
            return ranges;
        }
        roots.push(...found);
    }
}
/** The open shadow roots on the root chains of `ranges`' boundaries. */ function shadowRootsOfRanges(ranges) {
    const roots = new Set();
    for (const range of ranges){
        for (const root of [
            ...openShadowRootsOf(range.startContainer),
            ...openShadowRootsOf(range.endContainer)
        ]){
            roots.add(root);
        }
    }
    return [
        ...roots
    ];
}
/**
 * The open shadow root `target` hosts, if any. A press on text directly under
 * a shadow root targets its host.
 */ function ownShadowRoot(target) {
    const root = target?.nodeType === 1 ? target.shadowRoot : null;
    return root == null ? [] : [
        root
    ];
}
/** The open shadow roots on `target`'s root chain, innermost first. */ function openShadowRootsOf(target) {
    if (target == null || typeof target.nodeType !== 'number') {
        return [];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadowRootsOutward"])(target.getRootNode()).map(({ root })=>root).filter((root)=>root.mode === 'open');
}
/**
 * The selection-lock styles on `set`, refcounted per element; idempotent
 * release.
 */ function lockStyles(set) {
    const locked = [];
    for (const element of set){
        const style = styleOf(element);
        if (style == null) {
            continue;
        }
        locked.push(element);
        const lock = locks.get(element);
        if (lock != null) {
            lock.count += 1;
            continue;
        }
        locks.set(element, {
            count: 1,
            saved: SELECTION_LOCK.map((name)=>({
                    name,
                    value: style.getPropertyValue(name),
                    priority: style.getPropertyPriority(name)
                }))
        });
        for (const name of SELECTION_LOCK){
            style.setProperty(name, 'none');
        }
    }
    let isReleased = false;
    return ()=>{
        if (isReleased) {
            return;
        }
        isReleased = true;
        for (const element of locked){
            const lock = locks.get(element);
            if (lock == null || --lock.count > 0) {
                continue;
            }
            locks.delete(element);
            const style = styleOf(element);
            for (const { name, value, priority } of lock.saved){
                if (value === '') {
                    style?.removeProperty(name);
                } else {
                    style?.setProperty(name, value, priority);
                }
            }
        }
    };
}
/**
 * A form control WebKit's own stylesheet makes selectable, which no
 * ancestor's lock reaches: every input that is not a text field.
 */ function isSelectableControl(node) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(node) && node.localName === 'input' && !TEXT_ENTRY_TYPES.has(node.type);
}
/** Text a held finger edits: it places the caret there. */ function isTextEntry(node) {
    const element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(node) ? node : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(node) ? node.parentElement : null;
    if (element == null) {
        return false;
    }
    if (element.localName === 'textarea') {
        return true;
    }
    if (element.localName === 'input') {
        return TEXT_ENTRY_TYPES.has(element.type);
    }
    return element.isContentEditable;
}
/**
 * An element's inline style, when it has one (HTML and SVG elements). It is
 * checked as an object, so another window's style passes too.
 */ function styleOf(element) {
    const style = element.style;
    return typeof style === 'object' && style !== null ? style : null;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/setInputValue.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file setInputValue.ts
 * @input An input element and a new value
 * @output Sets the value as the user would, so the input's own change handler
 *   runs
 * @position Internal utility; used by TextInput's clear and Typeahead's
 *   edit and clear paths. Not exported from the utils entry.
 */ /**
 * Set `input`'s value through the native setter and dispatch an `input`
 * event. React tracks the value it last wrote, so a plain assignment fires no
 * `onChange`. The native setter makes React see a real change, and the event
 * reaches the input's own change handler with a real change event.
 */ __turbopack_context__.s([
    "setInputValue",
    ()=>setInputValue
]);
function setInputValue(input, value) {
    const setNativeValue = Object.getOwnPropertyDescriptor(input.ownerDocument.defaultView?.HTMLInputElement.prototype ?? HTMLInputElement.prototype, 'value')?.set;
    setNativeValue?.call(input, value);
    input.dispatchEvent(new Event('input', {
        bubbles: true
    }));
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedMutationObserver.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "flushMutations",
    ()=>flushMutations,
    "observeContent",
    ()=>observeContent,
    "observeMutations",
    ()=>observeMutations
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
/**
 * @file sharedMutationObserver.ts
 * @input MutationObserver API
 * @output Exports observeMutations (one shared observer per set of options),
 *   observeContent, its text-and-children form, and flushMutations
 * @position Internal utility; consumed by useTruncation, hitArea, AppShell's
 *   main-overflow observer, ModalAnnounceProvider's presentation watch and
 *   CheckboxList's required group. The mutation counterpart of sharedResizeObserver:
 *   one observer for every element observed with the same options, so a
 *   repeated cell, row or region does not create one observer per instance.
 */ /**
 * Called once per batch with the records that reached the registration: those
 * whose target is its element or, with `subtree`, one of its descendants.
 * A caller that needs only to know that something changed ignores them.
 */ const CONTENT_OPTIONS = {
    characterData: true,
    childList: true,
    subtree: true
};
/**
 * One observer per distinct set of options: an observer holds one set of
 * options per node, so registrations that need different options cannot
 * share one.
 */ const observers = new Map();
function optionsKey(options) {
    return JSON.stringify([
        options.attributes === true,
        options.attributeFilter == null ? null : [
            ...options.attributeFilter
        ].sort(),
        options.attributeOldValue === true,
        options.characterData === true,
        options.childList === true,
        options.subtree === true
    ]);
}
function createSharedObserver(options) {
    const callbacks = new Map();
    const isSubtree = options.subtree === true;
    const deliver = (records)=>{
        // One call per callback per batch, however many records it received.
        // With `subtree`, a record's target can be any descendant, so walk up to
        // the observed roots; without it, the target is the observed node.
        const pending = new Map();
        for (const record of records){
            const due = new Set();
            if (!isSubtree) {
                callbacks.get(record.target)?.forEach((callback)=>due.add(callback));
            } else {
                for(let node = record.target; node; node = node.parentNode){
                    callbacks.get(node)?.forEach((callback)=>due.add(callback));
                }
            }
            due.forEach((callback)=>{
                const received = pending.get(callback);
                if (received) {
                    received.push(record);
                } else {
                    pending.set(callback, [
                        record
                    ]);
                }
            });
        }
        pending.forEach((received, callback)=>callback(received));
    };
    return {
        observer: new MutationObserver(deliver),
        callbacks,
        deliver
    };
}
function observeMutations(element, options, callback) {
    if (typeof MutationObserver === 'undefined') {
        return ()=>{};
    }
    const key = optionsKey(options);
    let shared = observers.get(key);
    if (shared == null) {
        shared = createSharedObserver(options);
        observers.set(key, shared);
    }
    const { observer, callbacks } = shared;
    const existing = callbacks.get(element);
    if (existing) {
        existing.add(callback);
    } else {
        callbacks.set(element, new Set([
            callback
        ]));
        observer.observe(element, options);
    }
    let isSubscribed = true;
    return ()=>{
        if (!isSubscribed) {
            return;
        }
        isSubscribed = false;
        const targetCallbacks = callbacks.get(element);
        targetCallbacks?.delete(callback);
        if (targetCallbacks?.size === 0) {
            callbacks.delete(element);
        }
        if (callbacks.size === 0 && observers.get(key)?.observer === observer) {
            observer.disconnect();
            observers.delete(key);
        }
    };
}
function observeContent(element, callback) {
    return observeMutations(element, CONTENT_OPTIONS, callback);
}
function flushMutations(options) {
    const shared = observers.get(optionsKey(options));
    const records = shared?.observer.takeRecords() ?? [];
    if (shared != null && records.length > 0) {
        shared.deliver(records);
    }
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/textDirection.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "textDirectionProps",
    ()=>textDirectionProps
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file textDirection.ts
 * @input A component's text content (a string, a number, or a rich node)
 * @output textDirectionProps: `dir="ltr"` for plain text that holds no
 *   right-to-left letter, otherwise nothing, so the text keeps the page's
 *   direction
 * @position Core-internal helper, not exported from the package. Badge,
 *   Token and InputGroupText put it on the element that holds caller text,
 *   beside `unicode-bidi: isolate`.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$firstStrongDirection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/firstStrongDirection.js [app-ssr] (ecmascript)");
;
function textDirectionProps(content) {
    if (typeof content !== 'string' && typeof content !== 'number') {
        return {};
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$firstStrongDirection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasStrongRightToLeft"])(String(content)) ? {} : {
        dir: 'ltr'
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/touchEndMark.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearTouchEndMark",
    ()=>clearTouchEndMark,
    "isTouchEndCancelled",
    ()=>isTouchEndCancelled,
    "markTouchEndCancelled",
    ()=>markTouchEndCancelled
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file touchEndMark.ts
 * @input The click guard's arm for a touch whose touchend it cancels
 * @output Whether the release in flight is a touch whose touchend the click
 *   guard cancels, for the gesture counter
 * @position Internal leaf module. The click guard writes the mark and the
 *   gesture counter reads it, so neither module imports the other and
 *   neither entry pulls in the other's code
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-ssr] (ecmascript)");
;
// Shared through the realm, so a second copy of Core reads the same mark.
const mark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedState"])('utils/touch-end-mark/state', 1, ()=>({
        isSet: false
    }));
function markTouchEndCancelled() {
    mark.isSet = true;
}
function isTouchEndCancelled() {
    return mark.isSet;
}
function clearTouchEndMark() {
    mark.isSet = false;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/touchHitArea.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTouchHitArea",
    ()=>useTouchHitArea
]);
/**
 * @file touchHitArea.ts
 * @input Whether an element takes taps, how it grows, the shared touch hit
 *   area (utils/hitArea.ts) and the Web Animations around the element
 * @output `useTouchHitArea`, a callback ref that keeps an element's hit insets
 *   live for its invisible layer (`touchHitAreaStyles.layer`)
 * @position Core-internal hook for the coarse-only 44 px target. List rows,
 *   InfoTip, CheckboxInput, RadioListItem, SegmentedControl segments and the
 *   press-tracking groups use it, and so can any control whose target outgrows
 *   its box under a finger.
 *
 * SYNC: When modified, update internal/touchHitArea.stylex.ts and
 * touchHitArea.test.tsx.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$hitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/hitArea.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
/** How an owner's element grows, for an owner with its own rule. */ const NO_OPTIONS = {};
/**
 * Watches `element` and takes its insets only at rest. Returns the stop.
 *
 * Under a coarse primary pointer, the shared utility measures how far the
 * element's hit target may grow without reaching a neighbor's half of the
 * gap. This writes those insets on the element, where its layer reads them.
 * Under a fine pointer the shared utility starts no observer.
 *
 * Elements move by transform: a list row in an update's slide, a swipe, or
 * neighbors that slide past. The shared measurement reads them as they stand
 * in one frame. So a measurement that arrives while the parent has a finite
 * animation running or held is dropped. When those animations end, the
 * element is watched again. The insets are then taken at rest, and no frame
 * of a compositor-only motion lays out or paints for them.
 */ function watchAtRest(element, minSize, { growth, checkAtPress, ownsDescendantTouches = true }) {
    let stopWatch = ()=>{};
    let isStopped = false;
    let isWaiting = false;
    let hasWritten = false;
    // A stopped watch clears the insets it wrote. A fresh watch skips a
    // measurement equal to its start, zero, so old insets would otherwise stay.
    // A watch that wrote nothing, as under a mouse, writes nothing.
    const stop = ()=>{
        stopWatch();
        if (hasWritten) {
            hasWritten = false;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$hitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeHitInsets"])(element, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$hitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NO_HIT_INSETS"]);
        }
    };
    const watch = ()=>{
        stopWatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$hitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["watchHitArea"])(element, (insets)=>{
            // The finite animations in the element's parent, the element
            // included: a row's own motion and its neighbors'.
            const moving = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$hitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["settlingAnimations"])(element.parentElement ?? element);
            if (moving.length === 0) {
                hasWritten = true;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$hitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeHitInsets"])(element, insets);
                return;
            }
            if (isWaiting) {
                return;
            }
            isWaiting = true;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$hitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["whenSettled"])(moving, ()=>{
                isWaiting = false;
                if (!isStopped) {
                    stop();
                    watch();
                }
            });
        }, // By default the layer is the host's own `::after`, so a touch on the
        // host's content is the host's, even where that content paints past
        // its box.
        {
            minSize,
            ownsDescendantTouches,
            growth: growth == null ? undefined : (target, toLayout)=>growth(target, toLayout, element),
            checkAtPress
        });
    };
    watch();
    return ()=>{
        isStopped = true;
        stop();
    };
}
/** The watch on an element, and how many attached refs hold it. */ const heldWatches = new WeakMap();
/**
 * Holds the element's watch, and starts it on the first hold. Returns the
 * release. A ref that changes, such as a merge with a caller's inline ref,
 * detaches and attaches again in one commit. So the last release waits a
 * microtask, and an attach in between keeps the watch and its insets.
 */ function holdWatch(element, options) {
    let held = heldWatches.get(element);
    if (held == null) {
        held = {
            stop: watchAtRest(element, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$hitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MIN_TOUCH_TARGET"], options),
            holders: 0
        };
        heldWatches.set(element, held);
    }
    held.holders += 1;
    const entry = held;
    let isReleased = false;
    return ()=>{
        if (isReleased) {
            return;
        }
        isReleased = true;
        entry.holders -= 1;
        queueMicrotask(()=>{
            if (entry.holders === 0 && heldWatches.get(element) === entry) {
                heldWatches.delete(element);
                entry.stop();
            }
        });
    };
}
function useTouchHitArea(enabled, options = NO_OPTIONS) {
    // Syncs with an external system: the shared touch hit area
    // (utils/hitArea.ts) measures the element against its neighbors and writes
    // its insets on it. The ref's cleanup stops the watch.
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((element)=>{
        if (!enabled || element == null) {
            return undefined;
        }
        return holdWatch(element, options);
    }, [
        enabled,
        options
    ]);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/triggerFocus.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file triggerFocus.ts
 * @input A focus event on a hover-layer trigger and its focusTrigger value
 * @output Whether that focus counts as focus on the trigger, and a gate that
 *   remembers it for the matching blur
 * @position Shared focus-trigger judgement for Tooltip and HoverCard
 */ /** When focus on a trigger opens its layer. */ /** Whether `element` is in the tab order or naturally focusable. */ __turbopack_context__.s([
    "createTriggerFocusGate",
    ()=>createTriggerFocusGate,
    "isFocusForTrigger",
    ()=>isFocusForTrigger,
    "isFocusOnTrigger",
    ()=>isFocusOnTrigger,
    "isFocusableTrigger",
    ()=>isFocusableTrigger
]);
function isFocusableTrigger(element) {
    if (element.hasAttribute('tabindex')) {
        return element.tabIndex >= 0;
    }
    const focusableTags = [
        'A',
        'BUTTON',
        'INPUT',
        'SELECT',
        'TEXTAREA'
    ];
    if (focusableTags.includes(element.tagName)) {
        return !element.disabled;
    }
    return element.isContentEditable;
}
function isFocusForTrigger(event, mode) {
    return isFocusOnTrigger(event.target, event.currentTarget, mode);
}
function isFocusOnTrigger(target, trigger, mode) {
    if (mode === 'always') {
        return true;
    }
    if (mode === 'never') {
        return false;
    }
    return trigger != null && (target === trigger || isFocusableTrigger(trigger));
}
function createTriggerFocusGate() {
    let isCounted = false;
    return {
        focusIn (event, mode) {
            isCounted = isFocusForTrigger(event, mode);
            return isCounted;
        },
        focusOut (event, mode) {
            if (!isCounted && !isFocusForTrigger(event, mode)) {
                return false;
            }
            isCounted = false;
            return true;
        }
    };
}
}),
];

//# sourceMappingURL=0aq__%40astryxdesign_core_dist_utils_1-b-hp8vkbylf._.js.map