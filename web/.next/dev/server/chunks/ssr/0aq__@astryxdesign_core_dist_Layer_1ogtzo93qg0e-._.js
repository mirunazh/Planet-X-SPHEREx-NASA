module.exports = [
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/LayerContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LayerContext",
    ()=>LayerContext,
    "useLayerContext",
    ()=>useLayerContext
]);
/**
 * @file LayerContext.ts
 * @input React context
 * @output Exports LayerContext and related types
 * @position Context definition for LayerProvider
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Layer/index.ts
 * - /packages/core/src/Layer/LayerProvider.tsx
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const LayerContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSharedContext"])('LayerContext', 1, null);
LayerContext.displayName = 'LayerContext';
function useLayerContext() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(LayerContext);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/LayerDepthContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LayerDepthContext",
    ()=>LayerDepthContext,
    "LayerDepthProvider",
    ()=>LayerDepthProvider,
    "useLayerDepth",
    ()=>useLayerDepth
]);
/**
 * @file LayerDepthContext.tsx
 * @input React depth context
 * @output Exports LayerDepthContext, useLayerDepth, LayerDepthProvider
 * @position Layer system; how the dismissal stack learns which layer is nested
 *   inside which.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Layer/index.ts
 * - /packages/core/src/Layer/useLayerDismissal.ts
 *
 * Nesting is read from the React tree rather than the DOM. Two reasons:
 *
 * - **Portals.** A nested overlay routinely renders into `document.body` or the
 *   native top layer, so DOM containment reports it as a sibling of the layer
 *   it is logically inside. React context flows through `createPortal`, so the
 *   tree keeps the relationship the DOM loses.
 * - **Same-commit mounts.** Depth is fixed during render. Effect order is not
 *   available then and is misleading anyway: React runs child effects before
 *   parent effects, so an inner layer registers first and looks "older" than
 *   the outer layer that contains it.
 *
 * There is nothing to mount at the app root: the context defaults to 0, and
 * each layer provides depth for its OWN content, so nesting composes on its own.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-ssr] (ecmascript)");
/**
 * How many layers deep the current subtree is. 0 at the app root; each layer
 * increments it for its own content.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
const LayerDepthContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSharedContext"])('LayerDepthContext', 1, 0);
LayerDepthContext.displayName = 'LayerDepthContext';
function useLayerDepth() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(LayerDepthContext);
}
function LayerDepthProvider({ children }) {
    const depth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(LayerDepthContext);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(LayerDepthContext, {
        value: depth + 1,
        children: children
    });
}
LayerDepthProvider.displayName = 'LayerDepthProvider';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/anchorName.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file anchorName.ts
 * @input HTMLElement with CSS anchor-name property
 * @output Helpers for managing comma-separated anchor-name lists
 * @position Utility; used by useLayer for multi-anchor support
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Layer/useLayer.tsx (imports from here)
 */ /**
 * CSS `anchor-name` is a comma-separated list, so multiple layers can anchor to
 * the same element (e.g. several TopNavMegaMenus anchored to one <nav>). These
 * helpers add/remove a single layer's anchor id without clobbering the others —
 * overwriting the whole property would break every sibling layer's positioning.
 */ __turbopack_context__.s([
    "addAnchorName",
    ()=>addAnchorName,
    "readAnchorNames",
    ()=>readAnchorNames,
    "removeAnchorName",
    ()=>removeAnchorName,
    "writeAnchorNames",
    ()=>writeAnchorNames
]);
function readAnchorNames(el) {
    const value = el.style.anchorName ?? '';
    return value.split(',').map((name)=>name.trim()).filter(Boolean);
}
function writeAnchorNames(el, names) {
    el.style.anchorName = names.join(', ');
}
function addAnchorName(el, name) {
    const names = readAnchorNames(el);
    if (!names.includes(name)) {
        names.push(name);
        writeAnchorNames(el, names);
    }
}
function removeAnchorName(el, name) {
    const names = readAnchorNames(el);
    // A write invalidates the element's style even when the value is the same.
    if (names.includes(name)) {
        writeAnchorNames(el, names.filter((existing)=>existing !== name));
    }
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/gestureCounter.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "afterRelease",
    ()=>afterRelease,
    "claimContextMenuPress",
    ()=>claimContextMenuPress,
    "claimPress",
    ()=>claimPress,
    "currentGesture",
    ()=>currentGesture,
    "currentGestureHasClicked",
    ()=>currentGestureHasClicked,
    "isPressInFlight",
    ()=>isPressInFlight,
    "isReleaseInFlight",
    ()=>isReleaseInFlight
]);
/**
 * @file gestureCounter.ts
 * @input Pointer and context-menu events through the shared input stream;
 *   keydown and click on the document
 * @output Exports the gesture identity, whether its click has run, whether a
 *   press is down or being released (afterRelease runs a callback once that
 *   release is handled), and the press claims (claimPress,
 *   claimContextMenuPress)
 * @position Internal to the package, not exported. useLayer reads it to tell
 *   a click that belongs to a dismissing press from a fresh one.
 *   useTouchTrigger, useMenuPress, ContextMenu and DropdownMenu read the
 *   gesture too. A layer or a menu that opens on a press claims that press
 *   here
 *
 * A browser light-dismiss and the trigger's own click come from ONE press, and
 * which of them React sees first is a race. Comparing timestamps against a
 * window guesses; counting gestures does not. The counter advances on every
 * new press or keystroke, so "the click from the gesture that dismissed the
 * layer" is exactly "the click while the counter still reads what it read at
 * the dismissal", no matter how long the main thread was blocked in between.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputStream.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchEndMark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/touchEndMark.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedState"])('layer/gesture-counter/state', 1, ()=>({
        gesture: 0,
        clickedGesture: null,
        contextMenuGesture: null,
        pressPointerId: null,
        // The gesture whose release is being handled: from its pointerup until
        // its click, or the next task when no click comes.
        releasingGesture: null,
        // Whether a pointerup is being dispatched now: from the window's capture
        // phase to its bubble phase.
        isDispatchingRelease: false,
        // The pointer type of the release in flight.
        releasingPointerType: '',
        claimedPress: null,
        isListening: false,
        unsubscribePress: null
    }));
/**
 * Adds the fields an older copy of Core may have made the shared slot
 * without, so a page with both copies does not throw.
 */ function ensureFields() {
    if (state.releasingGesture === undefined) {
        state.releasingGesture = null;
    }
    if (state.isDispatchingRelease === undefined) {
        state.isDispatchingRelease = false;
    }
    if (state.releasingPointerType === undefined) {
        state.releasingPointerType = '';
    }
}
function advance() {
    state.gesture += 1;
}
// The page listens for a press's end and its context menu only while a press
// is down. At rest it keeps one window pointerup listener, which ends the
// release's dispatch.
function startPress(event) {
    ensureFields();
    state.isDispatchingRelease = false;
    // A mark from an earlier press never reaches this one.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchEndMark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearTouchEndMark"])();
    advance();
    state.pressPointerId = event.pointerId;
    const view = event.view ?? document.defaultView;
    if (state.unsubscribePress != null || view == null) {
        return;
    }
    const unsubscribes = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'pointerup', endPress, {
            first: true
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'pointercancel', endPress, {
            first: true
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'contextmenu', markContextMenu, {
            first: true
        })
    ];
    state.unsubscribePress = ()=>{
        for (const unsubscribe of unsubscribes){
            unsubscribe();
        }
    };
}
function endPress(event) {
    ensureFields();
    if (event.type === 'pointerup') {
        const gesture = state.gesture;
        state.releasingGesture = gesture;
        state.releasingPointerType = event.pointerType;
        state.isDispatchingRelease = true;
        // A release that brings no click (a touch whose touchend was cancelled)
        // ends at the next task.
        setTimeout(()=>{
            if (state.releasingGesture === gesture) {
                state.releasingGesture = null;
            }
        }, 0);
    }
    state.pressPointerId = null;
    state.unsubscribePress?.();
    state.unsubscribePress = null;
}
function markContextMenu() {
    state.contextMenuGesture = state.gesture;
}
function markClicked(event) {
    ensureFields();
    state.clickedGesture = state.gesture;
    // A click the page dispatches while the release itself is dispatched (a
    // menu row's activation) comes before the release's light dismiss, so it
    // does not end the release. Any other click does.
    if (state.releasingGesture === state.gesture && !(state.isDispatchingRelease && event.detail === 0)) {
        state.releasingGesture = null;
    }
}
function endReleaseDispatch() {
    state.isDispatchingRelease = false;
}
function listen() {
    ensureFields();
    // An older copy of Core may have installed these listeners first. Its
    // listeners open no release window, so a show during a release is not
    // deferred, as before.
    if (state.isListening || typeof document === 'undefined') {
        return;
    }
    state.isListening = true;
    // Capture phase: the count must advance before any handler reads it.
    const view = document.defaultView;
    if (view != null) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'pointerdown', startPress, {
            first: true
        });
        // The window's bubble phase comes after every handler of the release.
        view.addEventListener('pointerup', endReleaseDispatch);
    }
    document.addEventListener('keydown', advance, true);
    // Capture phase observes the click even when a consumer stops propagation.
    document.addEventListener('click', markClicked, true);
}
function currentGesture() {
    listen();
    return state.gesture;
}
function currentGestureHasClicked() {
    listen();
    return state.clickedGesture === state.gesture;
}
function isReleaseInFlight() {
    listen();
    if (state.releasingGesture === null || state.releasingGesture !== state.gesture) {
        return false;
    }
    return !(state.releasingPointerType === 'touch' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchEndMark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTouchEndCancelled"])());
}
function afterRelease(doc, callback) {
    let isDone = false;
    const run = ()=>{
        if (isDone) {
            return;
        }
        isDone = true;
        cancel();
        callback();
    };
    // First on the window's capture phase: the browser's light dismiss for the
    // release ran before the click, and the callback runs inside the click, so
    // focus it moves counts as made during the click. A click dispatched while
    // the release is dispatched is not the release's own.
    const view = doc.defaultView;
    const stopClick = view == null ? ()=>{} : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'click', (event)=>{
        if (state.isDispatchingRelease && event.detail === 0) {
            return;
        }
        // The release ends at its click, before the callback runs, so a
        // show the callback asks for is not held again.
        if (state.releasingGesture === state.gesture) {
            state.releasingGesture = null;
        }
        run();
    }, {
        first: true
    });
    const timer = setTimeout(run, 0);
    function cancel() {
        isDone = true;
        stopClick();
        clearTimeout(timer);
    }
    return cancel;
}
function isPressInFlight() {
    listen();
    return state.pressPointerId !== null;
}
function claimPress(layer, { releaseTarget = null, onRelease } = {}) {
    listen();
    const pointerId = state.pressPointerId;
    const view = layer.ownerDocument.defaultView;
    if (pointerId === null || view == null) {
        return;
    }
    if (state.claimedPress !== null && state.claimedPress.layer === layer && state.claimedPress.pointerId === pointerId && state.claimedPress.gesture === state.gesture) {
        return;
    }
    const claim = {
        layer,
        pointerId,
        gesture: state.gesture
    };
    state.claimedPress = claim;
    // Gives the pointer to `holder`, or lets it go when `holder` is null.
    const holdCapture = (holder)=>{
        try {
            if (holder !== null) {
                holder.setPointerCapture(pointerId);
                return;
            }
            for (const element of [
                layer,
                releaseTarget
            ]){
                if (element?.hasPointerCapture(pointerId) === true) {
                    element.releasePointerCapture(pointerId);
                }
            }
        } catch  {
        // The pointer is no longer active (its release did not reach the
        // page), so no release can dismiss the layer.
        }
    };
    // The press began on the release target, so the pointer is over it now.
    holdCapture(releaseTarget ?? layer);
    // A move of the pointer reads no layout. The claim reads the layer's box,
    // and the box of each popover open in it (a sub-menu), once. It reads them
    // again only after a scroll, a resize or a toggle in the layer.
    let boxes = null;
    const readBoxes = ()=>{
        let nested = [];
        try {
            nested = [
                ...layer.querySelectorAll(':popover-open')
            ];
        } catch  {
        // An engine without `:popover-open` has no nested popover to read.
        }
        return [
            layer,
            ...nested
        ].map((el)=>el.getBoundingClientRect());
    };
    const isOverLayer = (x, y)=>{
        boxes ??= readBoxes();
        return boxes.some((box)=>x >= box.left && x < box.right && y >= box.top && y < box.bottom);
    };
    let targetBox = null;
    const isOverTarget = (x, y)=>{
        targetBox ??= releaseTarget?.getBoundingClientRect() ?? null;
        if (targetBox === null) {
            return false;
        }
        return x >= targetBox.left && x < targetBox.right && y >= targetBox.top && y < targetBox.bottom;
    };
    const invalidate = ()=>{
        boxes = null;
        targetBox = null;
    };
    const followPointer = (event)=>{
        if (event.pointerId === pointerId) {
            const { clientX: x, clientY: y } = event;
            if (isOverLayer(x, y)) {
                holdCapture(null);
            } else if (releaseTarget !== null && isOverTarget(x, y)) {
                holdCapture(releaseTarget);
            } else {
                holdCapture(layer);
            }
        }
    };
    const unsubscribes = [];
    const stop = ()=>{
        for (const unsubscribe of unsubscribes){
            unsubscribe();
        }
        unsubscribes.length = 0;
        if (state.claimedPress === claim) {
            state.claimedPress = null;
        }
    };
    // A control that takes the pointer during the press keeps it, for example
    // a row that a swipe moves. The claim then ends, and it neither takes the
    // pointer back nor cancels the tap.
    const yieldToTaker = (event)=>{
        if (event.pointerId === pointerId && event.target !== layer && event.target !== releaseTarget) {
            stop();
        }
    };
    const endClaim = (event)=>{
        if (event.pointerId === pointerId) {
            stop();
            if (event.type === 'pointerup') {
                onRelease?.();
            }
        }
    };
    // A layer that closes while the button is still down lets the pointer go,
    // so the page under it hovers again.
    const onToggle = (event)=>{
        if (event.target === layer && event.newState === 'closed') {
            holdCapture(null);
            stop();
            return;
        }
        invalidate();
    };
    layer.addEventListener('toggle', onToggle, true);
    unsubscribes.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'pointermove', followPointer), (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'gotpointercapture', yieldToTaker), (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'pointerup', endClaim), (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'pointercancel', endClaim), (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'scroll', invalidate), (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'resize', invalidate), ()=>layer.removeEventListener('toggle', onToggle, true));
}
function claimContextMenuPress(layer) {
    listen();
    if (state.contextMenuGesture === state.gesture) {
        claimPress(layer);
    }
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerAnimations.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file layerAnimations.stylex.ts
 * @input Uses StyleX, theme duration/easing tokens, the Reduce Motion fade
 *   constants, the side the layer runtime writes for a shown layer
 * @output Exports shared entry animation styles for layer-based components
 * @position Shared animation primitives; consumed by DropdownMenu, Popover,
 *   HoverCard, Tooltip, Selector, and any component using useLayer
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Layer/layerEntranceSide.ts
 *
 * Provides opt-in entry animations for popover/layer components. Apply one
 * to the element that fills the layer (its surface), not to the layer.
 * Chromium lays an anchored layer out again on each frame that its own
 * style animates. On the layer the entrance still plays, at that cost.
 * An anchored layer's entrance slides from, and scales about, the side the
 * layer lands on after any flip (layerEntranceSide.ts).
 *
 * @example
 * ```
 * import {layerAnimations} from '../Layer/layerAnimations.stylex';
 *
 * // Direction-aware (for components that know placement):
 * layer.render(
 *   <div {...stylex.props(styles.surface, layerAnimations[placement])}>
 *     <Content />
 *   </div>,
 * );
 *
 * // usePopover's surface takes the hook's `xstyle`:
 * const popover = usePopover({xstyle: layerAnimations.below});
 * ```
 */ __turbopack_context__.s([
    "layerAnimations",
    ()=>layerAnimations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/reducedMotion.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
;
;
;
;
;
// The layer runtime writes the side a shown anchored layer landed on. It
// writes a step toward the trigger on each axis (-1, 0 or 1) and the scale's
// origin. It also writes the room to the trigger, which caps the step. Each
// fallback is the placement's own side, used when nothing is written.
const ENTER_X = '--_astryx-layer-enter-x';
const ENTER_Y = '--_astryx-layer-enter-y';
const ENTER_ORIGIN = '--_astryx-layer-enter-origin';
const ENTER_GAP = '--_astryx-layer-enter-gap';
// One step: the spacing token, or the room to the trigger when that is less.
// Without a written gap, the step is the token.
const STEP = `min(${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spacingVars"]['--spacing-2']}, var(${ENTER_GAP}, ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spacingVars"]['--spacing-2']}))`;
const enterBelow = "x1fbltco-B";
const enterAbove = "xmqt0mh-B";
const enterEnd = "x1yqd01s-B";
const enterStart = "x12ghk8m-B";
// RTL: the horizontal fallback is a physical translateX, so it mirrors under
// RTL. A layer on the inline-end or inline-start side then slides in from
// the physical side that follows the reading flow. Only the horizontal
// fallbacks mirror; the vertical ones are direction-neutral. The side the
// runtime writes is physical already.
const enterEndRtl = "x12ghk8m-B";
const enterStartRtl = "x1yqd01s-B";
// Reduce Motion under a finger: the same entrance without its travel. A touch
// presentation substitutes a cross-fade for motion, never a jump.
// The fade's curve rides in its first keyframe, so the published class type
// of `animationTimingFunction` stays the theme ease's.
const fadeIn = "x12p7u8f-B";
// No theme value lengthens the Reduce Motion fade, so its values are constants.
// The media keys stay literal: StyleX gives an imported at-rule key a later
// priority layer (see reducedMotionKeys).
const animationBase = {
    animationDuration: {
        default: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["durationVars"]['--duration-fast-max'],
        '@media (prefers-reduced-motion: reduce) and (pointer: coarse)': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["reducedMotionFadeConsts"].duration
    },
    animationTimingFunction: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["easeVars"]['--ease-standard'],
    animationFillMode: 'backwards',
    // The origin is a plain style, not a keyframe: a keyframe that animates it
    // would keep the entrance off the compositor.
    transformOrigin: `var(${ENTER_ORIGIN}, 50% 50%)`
};
const layerAnimations = {
    below: {
        kKVMdj: "x1d5jn3a x2g3n7u xaqowwx",
        k44tkh: "x9uej1z x10got5w",
        kyAemX: "x128ha8g",
        kWV6AL: "xskzprw",
        k3nNDw: "x9r0mi6",
        $$css: true
    },
    above: {
        kKVMdj: "xksu0ym x2g3n7u xaqowwx",
        k44tkh: "x9uej1z x10got5w",
        kyAemX: "x128ha8g",
        kWV6AL: "xskzprw",
        k3nNDw: "x9r0mi6",
        $$css: true
    },
    end: {
        kKVMdj: "xyzx0um xixcm9l x2g3n7u xaqowwx",
        k44tkh: "x9uej1z x10got5w",
        kyAemX: "x128ha8g",
        kWV6AL: "xskzprw",
        k3nNDw: "x9r0mi6",
        $$css: true
    },
    start: {
        kKVMdj: "x1qqotkc x1g7o29q x2g3n7u xaqowwx",
        k44tkh: "x9uej1z x10got5w",
        kyAemX: "x128ha8g",
        kWV6AL: "xskzprw",
        k3nNDw: "x9r0mi6",
        $$css: true
    }
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerClickBoundary.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "layerClickBoundary",
    ()=>layerClickBoundary,
    "stopInReactTree",
    ()=>stopInReactTree
]);
/**
 * @file layerClickBoundary.ts
 * @input React pointer, mouse, touch and click events on a layer root
 * @output Exports layerClickBoundary, the props every layer content root
 *   spreads, including the layer-root mark; also stopInReactTree
 * @position Internal to Layer; used by useLayer's renderers and the Dialog,
 *   Drawer, Lightbox, MobileNav, BottomSheetPanel and ToastViewport roots.
 *   Not exported from the package.
 *
 * A press that starts inside a layer runs the handlers inside the layer and
 * the root's own, then stops propagating through the React tree, so no
 * bubble-phase handler on an ancestor of the layer's JSX position receives it.
 * Capture-phase handlers on those ancestors already ran. The stop is
 * React-only: it marks the synthetic event stopped and never calls the
 * native `stopPropagation()`, so document and window listeners (outside
 * presses, light dismiss, deferred clicks) still receive the press.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$layerRoot$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/layerRoot.stylex.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
/** The React event props that stop at a layer root. */ const BOUNDARY_EVENTS = [
    'onClick',
    'onAuxClick',
    'onDoubleClick',
    'onContextMenu',
    'onMouseDown',
    'onMouseUp',
    'onMouseMove',
    'onMouseOver',
    'onMouseOut',
    'onPointerDown',
    'onPointerUp',
    'onPointerMove',
    'onPointerOver',
    'onPointerOut',
    'onPointerCancel',
    'onGotPointerCapture',
    'onLostPointerCapture',
    'onTouchStart',
    'onTouchMove',
    'onTouchEnd',
    'onTouchCancel'
];
const returnTrue = ()=>true;
function stopInReactTree(event) {
    event.isPropagationStopped = returnTrue;
}
function layerClickBoundary(own = {}) {
    const props = {};
    for (const name of BOUNDARY_EVENTS){
        const handler = own[name];
        props[name] = typeof handler === 'function' ? (event)=>{
            handler(event);
            stopInReactTree(event);
        } : stopInReactTree;
    }
    return {
        // Every boundary event is set by the loop above.
        ...props,
        // Marks the root, so code outside the layer can find where it starts.
        ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$layerRoot$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layerRootProps"]
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerEntranceSide.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LAYER_ENTER_GAP_PROPERTY",
    ()=>LAYER_ENTER_GAP_PROPERTY,
    "LAYER_ENTER_ORIGIN_PROPERTY",
    ()=>LAYER_ENTER_ORIGIN_PROPERTY,
    "LAYER_ENTER_X_PROPERTY",
    ()=>LAYER_ENTER_X_PROPERTY,
    "LAYER_ENTER_Y_PROPERTY",
    ()=>LAYER_ENTER_Y_PROPERTY,
    "layerEntranceSide",
    ()=>layerEntranceSide,
    "readLayerEntranceSide",
    ()=>readLayerEntranceSide,
    "writeLayerEntranceSide",
    ()=>writeLayerEntranceSide
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file layerEntranceSide.ts
 * @input A shown layer and what it is anchored to
 * @output Exports `layerEntranceSide`, the side a layer landed on from two
 *   boxes. `readLayerEntranceSide` reads both boxes in one pass, and
 *   `writeLayerEntranceSide` gives that side to the layer's entrance.
 * @position Layer runtime: runs in the task that shows a layer, before its
 *   first frame. The entrance in layerAnimations.stylex.ts reads the custom
 *   properties it writes. Popover's touch growth grows from the same point.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Layer/layerAnimations.stylex.ts
 * - /packages/core/src/Popover/popoverSurfaceFrame.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$settledBox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/settledBox.js [app-ssr] (ecmascript)");
;
const LAYER_ENTER_X_PROPERTY = '--_astryx-layer-enter-x';
const LAYER_ENTER_Y_PROPERTY = '--_astryx-layer-enter-y';
const LAYER_ENTER_ORIGIN_PROPERTY = '--_astryx-layer-enter-origin';
const LAYER_ENTER_GAP_PROPERTY = '--_astryx-layer-enter-gap';
const clamp = (value, max)=>Math.min(max, Math.max(0, value));
function layerEntranceSide(layer, anchor) {
    if (layer.width <= 0 || layer.height <= 0) {
        return null;
    }
    const anchorX = anchor.left + anchor.width / 2;
    const anchorY = anchor.top + anchor.height / 2;
    const originX = clamp(anchorX - layer.left, layer.width);
    const originY = clamp(anchorY - layer.top, layer.height);
    const isPoint = anchor.width <= 1 && anchor.height <= 1;
    const coversAnchor = originX > 0 && originX < layer.width && originY > 0 && originY < layer.height;
    if (coversAnchor) {
        return {
            x: 0,
            y: 0,
            originX,
            originY,
            gap: 0
        };
    }
    const apartX = (layer.left + layer.width / 2 - anchorX) / ((layer.width + anchor.width) / 2);
    const apartY = (layer.top + layer.height / 2 - anchorY) / ((layer.height + anchor.height) / 2);
    if (Math.abs(apartY) >= Math.abs(apartX)) {
        const below = apartY > 0;
        return {
            x: 0,
            y: below ? -1 : 1,
            originX,
            originY: below ? 0 : layer.height,
            gap: isPoint ? null : Math.max(0, below ? layer.top - (anchor.top + anchor.height) : anchor.top - (layer.top + layer.height))
        };
    }
    const right = apartX > 0;
    return {
        x: right ? -1 : 1,
        y: 0,
        originX: right ? 0 : layer.width,
        originY,
        gap: isPoint ? null : Math.max(0, right ? layer.left - (anchor.left + anchor.width) : anchor.left - (layer.left + layer.width))
    };
}
function readLayerEntranceSide(layer, anchor) {
    const anchorBox = anchor.getBoundingClientRect();
    return layerEntranceSide((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$settledBox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["settledBox"])(layer), anchorBox);
}
const px = (value)=>`${Math.round(value * 1000) / 1000}px`;
function writeLayerEntranceSide(layer, side) {
    layer.style.setProperty(LAYER_ENTER_X_PROPERTY, side == null ? 'initial' : String(side.x));
    layer.style.setProperty(LAYER_ENTER_Y_PROPERTY, side == null ? 'initial' : String(side.y));
    layer.style.setProperty(LAYER_ENTER_ORIGIN_PROPERTY, side == null ? 'initial' : `${px(side.originX)} ${px(side.originY)}`);
    // Floored, so rounding never carries the step past the anchor's edge.
    const gap = side?.gap == null ? null : Math.floor(side.gap * 1000) / 1000;
    layer.style.setProperty(LAYER_ENTER_GAP_PROPERTY, gap == null ? 'initial' : `${gap}px`);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerHost.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveLayerPortalTarget",
    ()=>resolveLayerPortalTarget
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file layerHost.ts
 * @input Uses the intended inline parent, renderer-managed roots and layer roots
 * @output Exports the corrective portal resolver
 * @position Layer utility; used by useLayer to place the popover in the DOM
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Layer/layerHost.test.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$layerPortalBoundary$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/layerPortalBoundary.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$layerRoot$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/layerRoot.stylex.js [app-ssr] (ecmascript)");
;
;
/**
 * Ancestors a layer must not be hosted inside.
 *
 * Two overlapping reasons, both verified in Chrome:
 *
 * 1. The HTML parser owns server markup. `<p>` and the heading-ish elements
 *    take phrasing content only, so a block element inside one makes the
 *    parser close the paragraph and reparent the rest — the layer's content
 *    ends up in the page instead of the popover. A nested `<a>` triggers the
 *    same tearing through the adoption agency algorithm.
 * 2. Interactive ancestors capture the layer's own interactions. A card
 *    hosted inside an `<a>` or `<button>` puts its links and buttons inside
 *    that control: clicking one navigates the wrapping link, and every
 *    focusable in the card joins the control's own tab stop.
 *
 * Inline formatting elements are on the list for a third, milder reason: a
 * layer hosted in one inherits its typography (font-size, text-align), so a
 * card in a 13px centered paragraph renders 13px and centered.
 */ const UNSAFE_HOSTS = new Set([
    // Phrasing-content-only containers
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'dt',
    'pre',
    'legend',
    'data',
    'dfn',
    'meter',
    'output',
    'progress',
    'option',
    'optgroup',
    // Structural containers whose direct children are restricted. An inert
    // <template> marker is valid script-supporting content in these positions,
    // but the eventual div/span layer is not.
    'table',
    'thead',
    'tbody',
    'tfoot',
    'tr',
    'colgroup',
    'ul',
    'ol',
    'menu',
    'dl',
    'select',
    'datalist',
    'picture',
    'hgroup',
    'ruby',
    'rt',
    'rp',
    // Interactive containers
    'a',
    'button',
    'label',
    'summary',
    // Inline formatting context
    'span',
    'em',
    'strong',
    'b',
    'i',
    'u',
    's',
    'small',
    'mark',
    'code',
    'kbd',
    'samp',
    'var',
    'sub',
    'sup',
    'abbr',
    'cite',
    'q',
    'time',
    'bdi',
    'bdo',
    'ins',
    'del'
]);
function resolveLayerPortalTarget(inlineParent) {
    if (!inlineParent) {
        return null;
    }
    let outermostUnsafe = null;
    let isTargetLayerOwned = false;
    let node = inlineParent;
    while(node){
        const tagName = node.tagName.toLowerCase();
        if (tagName === 'dialog') {
            break;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$layerRoot$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLayerRoot"])(node)) {
            isTargetLayerOwned = true;
        }
        if (UNSAFE_HOSTS.has(tagName)) {
            outermostUnsafe = node;
            // Escaping this ancestor also leaves any nearer layer-owned scope.
            isTargetLayerOwned = false;
        } else if (outermostUnsafe !== null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$layerPortalBoundary$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRendererManagedRoot"])(node) && !isTargetLayerOwned) {
            outermostUnsafe = node;
        }
        node = node.parentElement;
    }
    return outermostUnsafe?.parentElement ?? null;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerInset.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "layerInsetProperties",
    ()=>layerInsetProperties
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file layerInset.ts
 * @input A LayerProvider inset declaration
 * @output The inline custom properties that carry it to a layer or the toast
 *   viewport, where the gutter reads them
 * @position Layer runtime; the mechanism behind `LayerProvider.inset`
 *   (spec:AST-059 FR6). The property names are implementation; the provider
 *   prop is the public surface.
 */ const INSET_PROPERTIES = [
    [
        'blockStart',
        '--astryx-layer-inset-block-start'
    ],
    [
        'blockEnd',
        '--astryx-layer-inset-block-end'
    ],
    [
        'inlineStart',
        '--astryx-layer-inset-inline-start'
    ],
    [
        'inlineEnd',
        '--astryx-layer-inset-inline-end'
    ]
];
function toCssLength(value) {
    return typeof value === 'number' ? `${value}px` : value;
}
function layerInsetProperties(inset) {
    const style = {};
    if (inset) {
        for (const [edge, property] of INSET_PROPERTIES){
            const value = inset[edge];
            if (value != null && value !== '') {
                style[property] = toCssLength(value);
            }
        }
    }
    return style;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerKeyboardClearance.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file layerKeyboardClearance.ts
 * @input A layer's box, the layout viewport's height and the keyboard's
 *   cover
 * @output Exports `LAYER_KEYBOARD_CLEARANCE_PX`, `LAYER_ANCHORED_ATTRIBUTE` and
 *   `keyboardClearanceCap`
 * @position Layer runtime: the software keyboard cap's numbers, with no DOM
 *   and no React. A browser proof can import them on its own.
 *   useLayerKeyboardClearance.ts applies them.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Layer/useLayerKeyboardClearance.ts
 * - /packages/core/src/Layer/useLayerKeyboardClearance.test.tsx
 */ /**
 * How far above the software keyboard a capped layer ends, CSS px. It is the
 * clearance UIKit keeps under a popover the keyboard would cover.
 * @source measured: UIKit lab, iOS 26.2 simulator, iPhone 17 Pro. A
 *   320 × 533 popover below a source at y 160 (top 204) shrank to 325 pt.
 *   Its bottom stopped at 529, with the keyboard's top at about 539. It
 *   shrank from UIKeyboardWillShow over the keyboard's 0.3833 s, and grew
 *   back the same way on the hide. A 320 × 240 popover clear of the keyboard
 *   did not move.
 */ __turbopack_context__.s([
    "LAYER_ANCHORED_ATTRIBUTE",
    ()=>LAYER_ANCHORED_ATTRIBUTE,
    "LAYER_KEYBOARD_CLEARANCE_PX",
    ()=>LAYER_KEYBOARD_CLEARANCE_PX,
    "keyboardClearanceCap",
    ()=>keyboardClearanceCap
]);
const LAYER_KEYBOARD_CLEARANCE_PX = 10;
const LAYER_ANCHORED_ATTRIBUTE = 'data-layer-anchored';
function keyboardClearanceCap(box, viewportHeight, inset) {
    if (inset <= 0) {
        return null;
    }
    const limit = viewportHeight - inset - LAYER_KEYBOARD_CLEARANCE_PX;
    if (box.bottom <= limit) {
        return null;
    }
    return Math.max(0, limit - box.top);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LayerContentBoundary",
    ()=>LayerContentBoundary,
    "createLayerScopedContext",
    ()=>createLayerScopedContext
]);
/**
 * @file layerScopedContext.tsx
 * @input Surface-scoped React contexts and layer content
 * @output Private context creation and whole-value content boundary
 * @position AST-038 surface membership; unrelated contexts retain their owners
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
;
/**
 * The reset of each layer-scoped context from every copy of Core on this
 * React. A layer boundary from any of those copies resets them all, and never
 * renders another React's contexts.
 */ const resetsByReact = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["realmValue"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedKey"])('layer-scoped-context-resets', 2), ()=>new WeakMap(), (value)=>value instanceof WeakMap);
let resets = resetsByReact.get(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"]);
if (resets == null) {
    resets = new Map();
    resetsByReact.set(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"], resets);
}
const reactResets = resets;
function createLayerScopedContext(name, version, defaultValue) {
    const Context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSharedContext"])(name, version, defaultValue);
    if (!reactResets.has(Context)) {
        reactResets.set(Context, (children)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Context, {
                value: defaultValue,
                children: children
            }));
    }
    return Context;
}
function LayerContentBoundary({ children }) {
    // Keep the provider chain stable for this mount: lazy imports must not
    // remount existing content and discard its state or focus.
    const [resetChain] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>[
            ...reactResets.values()
        ]);
    return resetChain.reduceRight((content, reset)=>reset(content), children);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerSlideRules.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LAYER_CLEARANCE_PROPERTY",
    ()=>LAYER_CLEARANCE_PROPERTY,
    "SLIDE_RULES_ID",
    ()=>SLIDE_RULES_ID,
    "anchorClearAlignment",
    ()=>anchorClearAlignment,
    "besideRuleName",
    ()=>besideRuleName,
    "ensureSlideRules",
    ()=>ensureSlideRules,
    "fitRuleName",
    ()=>fitRuleName,
    "getAnchorClearFallbacks",
    ()=>getAnchorClearFallbacks,
    "slideRuleName",
    ()=>slideRuleName,
    "slideRulesCss",
    ()=>slideRulesCss
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file layerSlideRules.ts
 * @input A layer's placement and alignment
 * @output The `@position-try` rules for its slide options and their names, and
 *   the beside and fit options of a layer that must never settle over its
 *   anchor
 * @position Layer runtime geometry; the slide of spec:AST-059 FR4
 *
 * The slide is a position option whose area spans the whole alignment axis,
 * so a layer wider than the room beside its trigger on both sides still
 * reaches the side of the trigger that has room on the placement axis. A
 * plain `<position-area>` fallback would keep the base margins and insets,
 * which belong to an edge-aligned layer: the alignment-axis gutter on one
 * edge only, and the clearance/gutter pair of the base side on the placement
 * axis. Each slide option therefore carries its own declarations — the
 * gutter on both alignment-axis edges, and the clearance facing the anchor
 * with the gutter on the far edge of the side it lands on.
 *
 * An above or below layer that must never settle over its anchor
 * (spec:AST-059 FR4, Tooltip) uses one combined fallback list from the start,
 * and no option in it overlaps the anchor. `beside` lands on a
 * side across the alignment axis, spanning the whole block axis, at the
 * content's own inline size, so it fits only where the layer fits without
 * squeezing. `fit` lands above or below sized to the room on that side, so
 * overflow scrolls inside the layer, and is never smaller than half of the room
 * the trigger leaves on the block axis, so it fits only on the side with more
 * room; the list tries both only after the layer's own position, the opposite
 * side at the layer's own size and `beside`, so only content taller than the
 * room on both sides is sized to a room. No option is sized to whatever room
 * is left: a browser keeps a layer on the option it last used for as long as
 * that option still fits, so such an option would hold an open layer on a side
 * shrunk to a sliver after its anchor moved. Chromium applies a position
 * option's width and height properties but not their min/max forms, so the
 * sizes are `inline-size` and `block-size`. Inside a scrolling panel, Chromium
 * does not choose an option again while the panel scrolls, and it shifts a box
 * that runs out of room back into the room, onto the anchor. So the layer and
 * every option align `unsafe` toward the anchor on the placement axis: a box
 * that runs out of room overflows away from the anchor instead.
 *
 * The rules are static — the anchor clearance travels through a custom
 * property — so one style sheet per document carries all of them. It is
 * installed from a layout effect, before the layer's first paint, rather than
 * through StyleX, whose `positionTry()` output is malformed in the pinned
 * release. The sheet lives in the document head, not beside or inside the
 * layer: a sibling would change what a parent's last child is, and text
 * inside a role-bearing layer would name it to assistive technology.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerViewportInset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerViewportInset.stylex.js [app-ssr] (ecmascript)");
;
const LAYER_CLEARANCE_PROPERTY = '--_astryx-layer-clearance';
function slideRuleName(placement, alignment, side) {
    return `--astryx-layer-slide-${placement}-${alignment}-${side}`;
}
const CLEARANCE = `var(${LAYER_CLEARANCE_PROPERTY}, 0px)`;
/** Two declarations: the `env()`-less fallback first, then the full value. */ function pair(property, fallback, value) {
    return `${property}:${fallback};${property}:${value};`;
}
function blockGutter(property) {
    return pair(property, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerViewportInset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layerViewportInset"].gutterBlockFallback, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerViewportInset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layerViewportInset"].gutterBlock);
}
function inlineGutter(property) {
    return pair(property, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerViewportInset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layerViewportInset"].gutterInlineFallback, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerViewportInset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layerViewportInset"].gutterInline);
}
const OPPOSITE = {
    above: 'below',
    below: 'above',
    start: 'end',
    end: 'start'
};
function areaFor(placement) {
    switch(placement){
        case 'above':
            return 'self-block-start span-all';
        case 'below':
            return 'self-block-end span-all';
        case 'start':
            return 'self-inline-start span-all';
        case 'end':
            return 'self-inline-end span-all';
    }
}
/** The placement-axis margins for a layer resting on `placement`'s side. */ function placementMargins(placement) {
    switch(placement){
        case 'above':
            return `margin-block-end:${CLEARANCE};${blockGutter('margin-block-start')}`;
        case 'below':
            return `margin-block-start:${CLEARANCE};${blockGutter('margin-block-end')}`;
        case 'start':
            return `margin-inline-end:${CLEARANCE};${inlineGutter('margin-inline-start')}`;
        case 'end':
            return `margin-inline-start:${CLEARANCE};${inlineGutter('margin-inline-end')}`;
    }
}
/** The alignment-axis gutter on both edges, with the base inset reset. */ function alignmentMargins(placement) {
    return placement === 'above' || placement === 'below' ? `${inlineGutter('margin-inline-start')}${inlineGutter('margin-inline-end')}inset-inline-start:0;inset-inline-end:0;` : `${blockGutter('margin-block-start')}${blockGutter('margin-block-end')}inset-block-start:0;inset-block-end:0;`;
}
function rule(placement, alignment, side) {
    const landing = side === 'same' ? placement : OPPOSITE[placement];
    return `@position-try ${slideRuleName(placement, alignment, side)}{position-area:${areaFor(landing)};${placementMargins(landing)}${alignmentMargins(landing)}}`;
}
const PLACEMENTS = [
    'above',
    'below',
    'start',
    'end'
];
const ALIGNMENTS = [
    'start',
    'center',
    'end'
];
function anchorClearAlignment(side) {
    return side === 'above' || side === 'start' ? 'unsafe self-end' : 'unsafe self-start';
}
function besideRuleName(side) {
    return `--astryx-layer-beside-${side}`;
}
function fitRuleName(side) {
    return `--astryx-layer-fit-${side}`;
}
/**
 * `beside`: the slide's geometry on an inline side, at the content's own
 * inline size. A content-sized layer would otherwise wrap to whatever sliver
 * of room the trigger leaves and always fit. On the block axis it drops the
 * layer's own alignment toward its anchor, so it centres on the trigger and
 * slides into view.
 */ function besideRule(side) {
    return `@position-try ${besideRuleName(side)}{position-area:${areaFor(side)};${placementMargins(side)}${alignmentMargins(side)}inline-size:max-content;align-self:normal;justify-self:${anchorClearAlignment(side)};}`;
}
/** The block size of the room on one block side: the area minus its margins. */ function roomCap(gutter) {
    return `calc(100% - ${CLEARANCE} - ${gutter})`;
}
/**
 * Half of the room the trigger leaves on the block axis, minus one side's
 * margins and one pixel: a side whose room is at least this much is the
 * roomier side. The pixel lets both sides fit when the trigger sits at the
 * viewport's middle, where rounding could otherwise fail both.
 */ function halfRoom(viewport, gutter) {
    return `calc((${viewport} - anchor-size(block)) / 2 - ${CLEARANCE} - ${gutter} - 1px)`;
}
/**
 * `fit`: the slide's geometry on a block side, sized to the room on that
 * side; the layer scrolls what does not fit (FR3). It is at least half of the
 * room the trigger leaves, so it overflows, and does not fit, on the side
 * with less room.
 */ function fitRule(side) {
    const size = (viewport, gutter)=>`max(${roomCap(gutter)}, ${halfRoom(viewport, gutter)})`;
    const blockSize = pair('block-size', size('100vh', __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerViewportInset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layerViewportInset"].gutterBlockFallback), size('100dvb', __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerViewportInset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layerViewportInset"].gutterBlock));
    return `@position-try ${fitRuleName(side)}{position-area:${areaFor(side)};${placementMargins(side)}${alignmentMargins(side)}${blockSize}align-self:${anchorClearAlignment(side)};}`;
}
function getAnchorClearFallbacks(placement) {
    if (placement !== 'above' && placement !== 'below') {
        return '';
    }
    const opposite = placement === 'above' ? 'below' : 'above';
    return `flip-block, ${besideRuleName('end')}, ${besideRuleName('start')}, ${fitRuleName(placement)}, ${fitRuleName(opposite)}`;
}
function slideRulesCss() {
    return [
        ...PLACEMENTS.flatMap((placement)=>ALIGNMENTS.flatMap((alignment)=>[
                    rule(placement, alignment, 'same'),
                    rule(placement, alignment, 'opposite')
                ])),
        besideRule('end'),
        besideRule('start'),
        fitRule('above'),
        fitRule('below')
    ].join('');
}
const SLIDE_RULES_ID = 'astryx-layer-slide-rules';
function ensureSlideRules(doc) {
    if (doc.getElementById(SLIDE_RULES_ID)) {
        return;
    }
    const style = doc.createElement('style');
    style.id = SLIDE_RULES_ID;
    style.textContent = slideRulesCss();
    doc.head.appendChild(style);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerStack.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dispatchLayerEscapeKeyDown",
    ()=>dispatchLayerEscapeKeyDown,
    "isTextComposing",
    ()=>isTextComposing,
    "isTopmostLayer",
    ()=>isTopmostLayer,
    "registerLayer",
    ()=>registerLayer,
    "resetLayerStackForTests",
    ()=>resetLayerStackForTests
]);
/**
 * @file layerStack.ts
 * @input Uses the isImeKeyEvent predicate from utils/ime
 * @output Exports the shared layer dismissal stack: registration, top-most
 *   ordering, the Escape listener on each document that holds a layer, and its
 *   internal local-event dispatcher
 * @position Internal to the Layer system; consumed by useLayerDismissal, which
 *   is what overlays actually call. Not exported from the package root.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Layer/useLayerDismissal.ts
 * - /packages/core/src/Layer/useLayerDismissal.test.tsx
 *
 * ## Why one stack
 *
 * Every overlay used to own its own Escape listener, so one press dismissed
 * every open layer (a popover inside a Dialog closed both; a Modal opened from
 * inside another Modal closed both). Patching this per primitive produced
 * parallel registries — the focus-trap Escape stack, Drawer's LIFO registry,
 * useScrollLock's counter. This module is the single registry those collapse
 * into. One press dismisses exactly one layer.
 *
 * ## Only the top layer acts
 *
 * The stack owns ONE `keydown` listener per document and routes the press to
 * the top-most layer itself. Overlays do not listen; they register and say what
 * they want done. The alternative — every layer listens and filters itself out
 * — is what forces `stopPropagation()` choreography between element-level and
 * document-level listeners, and it silently breaks whenever a layer forgets.
 *
 * ## One listener per document
 *
 * A layer can live in a document other than the one this module was loaded
 * in: an app may render into a same-origin iframe or a Document
 * Picture-in-Picture window through a portal. A key press reaches only the
 * document it happened in, so the listener goes on the layer's own document —
 * its container's `ownerDocument` — with that document's first layer, and comes
 * off with its last. A layer that names no container counts as the global
 * `document`'s.
 *
 * The top-most layer is chosen among the layers of the document the press
 * arrived in, the way each document keeps its own browser top layer. A press in
 * one window never reaches past it to dismiss a layer in another, and one press
 * still dismisses exactly one layer.
 *
 * ## Bubble phase, not capture
 *
 * The listener is on the BUBBLE phase so content inside a layer can claim the
 * press first, either by `stopPropagation()` (the press never reaches the
 * document listener) or by `preventDefault()` (we see it and stand down).
 * A host whose public event prop can stop propagation may route the still-
 * unprevented event through `dispatchLayerEscapeKeyDown` at its own boundary;
 * the same stack still chooses the owner. Editors are why `preventDefault()`
 * remains the explicit cancellation signal: their own Escape action must win.
 *
 * ## The stack, not the browser, decides
 *
 * When the stack handles a press it calls `preventDefault()`, which suppresses
 * the browser's own close-watcher behavior — both `<dialog>`'s `cancel` event
 * and `popover="auto"` light-dismiss (verified in Chromium; the default action
 * runs after propagation, so a bubble-phase `preventDefault` still beats it).
 * That is deliberate: the native top layer only covers `showModal()` and
 * `popover="auto"`, so relying on it would leave non-modal `show()` drawers,
 * `popover="manual"` layers, and older browsers on a second, differently-behaved
 * code path. One code path, one ordering, everywhere.
 *
 * ## An Escape that cancels an IME composition
 *
 * That press is not a dismissal, so no layer acts on it — but the stack still
 * claims it, because an unclaimed Escape is exactly what makes the browser
 * raise a close request, and that request dismisses the layer through its
 * `cancel` handler on the same keypress. Claiming is the whole fix; the guard
 * that only returns measures identically to no guard at all.
 *
 * Close requests that arrive with no keydown to read — the Android back
 * gesture, the platform close watcher — are answered by the hosts, which ask
 * `isTextComposing()` through `useLayerDismissal`.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$ime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/ime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
/**
 * What a layer does with an Escape press that reaches it.
 *
 * - `'close'` — dismiss this layer and consume the press. One Escape closes
 *   exactly this layer. The default, and correct for every dismissible layer:
 *   modals, popovers, menus, comboboxes, and hover layers alike.
 * - `'block'` — consume the press WITHOUT dismissing. For a layer that requires
 *   an explicit choice (`Dialog purpose="required"`): Escape must not dismiss
 *   it, and must not fall through and dismiss something behind it either.
 *
 * There is deliberately no "dismiss but let the press continue" variant. Escape
 * affects exactly one layer, always — a rule with no per-component exceptions
 * is one users can predict. Hover layers were the tempting exception (the user
 * never opened the tip, so why should it eat their press?), but guessing wrong
 * that way is destructive: someone dismissing a stray tooltip over a form would
 * lose the whole dialog. Guessing wrong the other way costs one keystroke.
 */ /** An entry and the document it was registered in. */ // Every copy of Core on the page shares this stack. A swizzled layer and a
// package layer then order and dismiss as one.
const stack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedState"])('layer/layer-stack/state', 1, ()=>({
        entries: [],
        // Registration order per layer identity. `useLayerDismissal` keeps one token
        // through effect re-registration while an active layer changes depth or behavior
        // — a Dialog whose `purpose` flips while open, a focus trap that moves — and
        // through StrictMode's setup/cleanup replay. Counting those registrations would
        // hand the layer a fresh, higher seq and promote it above layers opened over it.
        // A genuine inactive -> active cycle receives a new token in the hook, matching
        // the browser top layer's show order.
        seqByToken: new WeakMap(),
        nextSeq: 0,
        // How many registered layers live in each document: the listeners go on a
        // document with its first layer and come off with its last.
        layerCountByDocument: new Map(),
        // The documents in which a text composition is running. Tracked from
        // composition events because the DOM offers no way to ask.
        composingDocuments: new Set(),
        // How to remove each document's listeners, kept by the copy that added them.
        stopListeningByDocument: new Map()
    }));
function seqFor(token) {
    const existing = stack.seqByToken.get(token);
    if (existing !== undefined) {
        return existing;
    }
    const seq = stack.nextSeq++;
    stack.seqByToken.set(token, seq);
    return seq;
}
/**
 * Order two entries: positive when `a` is above `b`, negative when below.
 * Three keys, each earning its place:
 *
 * 1. **Depth.** The layer nested inside the other is on top. This is what makes
 *    an inner-and-outer pair that mount in the SAME commit come out right;
 *    registration order alone gets it backwards, because React runs child
 *    effects before parent effects.
 * 2. **DOM containment.** Depth only moves when a layer wraps its content in a
 *    `LayerDepthProvider`, which a bare `useFocusTrap` cannot do — it renders
 *    nothing. For those, containment recovers the nesting the tree did not
 *    report.
 * 3. **Registration order.** For unrelated layers, the one whose current active
 *    cycle registered later is on top, matching how the browser's own top layer
 *    stacks. Effect re-registration within that active cycle keeps its place so
 *    depth or behavior changes cannot jump the queue; a close/reopen cycle gets
 *    a fresh identity from `useLayerDismissal` and moves to the top.
 *
 * Modality is deliberately NOT a key. Ranking modals above everything sounds
 * right and is not: a hover tip shown inside a modal renders on top of it, so
 * a modal-first rule would hand the press to the dialog and strand the tip.
 * Nesting already covers the case modality was meant to catch — a layer opened
 * from inside another is deeper, modal or not.
 *
 * Note this is a PARTIAL order: containment relates only nested pairs. Callers
 * must resolve the top with a pairwise max scan, never `Array.sort`, whose
 * result is undefined for a non-transitive comparator.
 */ function compareEntries(a, b) {
    if (a.depth !== b.depth) {
        return a.depth - b.depth;
    }
    const aEl = a.getContainer?.() ?? null;
    const bEl = b.getContainer?.() ?? null;
    if (aEl != null && bEl != null && aEl !== bEl) {
        if (bEl.contains(aEl)) {
            return 1;
        }
        if (aEl.contains(bEl)) {
            return -1;
        }
    }
    return a.seq - b.seq;
}
function isPresentEntry(entry) {
    return entry.isPresent?.() ?? true;
}
function isTextComposing() {
    return stack.composingDocuments.size > 0;
}
// The listeners sit on documents, so the current target is the document the
// composition runs in.
function handleCompositionStart(event) {
    stack.composingDocuments.add(event.currentTarget);
}
// Focus leaving the field ends the composition too. Clearing on blur as well
// means a compositionend this listener never sees cannot leave the flag stuck
// on, swallowing every later close request.
function handleCompositionEnd(event) {
    stack.composingDocuments.delete(event.currentTarget);
}
/**
 * The top-most present layer of `doc`, or null when nothing is on screen
 * there.
 */ function topPresentEntry(doc) {
    let top = null;
    for (const entry of stack.entries){
        if (entry.ownerDocument !== doc || !isPresentEntry(entry)) {
            continue;
        }
        if (top == null || compareEntries(entry, top) > 0) {
            top = entry;
        }
    }
    return top;
}
function isTopmostLayer(token) {
    const entry = stack.entries.find((candidate)=>candidate.token === token);
    return entry != null && topPresentEntry(entry.ownerDocument) === entry;
}
/** The global document, or null where there is no DOM. */ function globalDocument() {
    return typeof document === 'undefined' ? null : document;
}
/**
 * The document a key press happened in: its target's, or the target itself
 * when the press was dispatched at a document. Read from `nodeType` rather
 * than `instanceof`, which names this module's window and so misses a node
 * of another one.
 */ function documentOfEvent(event) {
    const target = event.target;
    if (target == null) {
        return null;
    }
    return target.nodeType === 9 ? target : target.ownerDocument;
}
/**
 * Resolve an Escape press against the layers of `doc`. Returns whether it was
 * handled.
 */ function dispatchEscape(doc) {
    const top = topPresentEntry(doc);
    if (top == null) {
        return false;
    }
    if (top.behavior === 'block') {
        return true;
    }
    top.dismiss();
    return true;
}
function dispatchLayerEscapeKeyDown(event) {
    if (event.key !== 'Escape') {
        return;
    }
    const doc = documentOfEvent(event) ?? globalDocument();
    // An IME user pressing Escape is cancelling a composition, not dismissing a
    // layer. Claim the press anyway, then stand down: left unclaimed, the browser
    // raises its own close request, which arrives at a layer's `cancel` handler
    // and dismisses it on this very keypress — measured in Chromium, where a
    // guard that only returns behaves exactly like no guard at all. Claim it only
    // while a layer is on screen; with nothing to protect, the press is not ours.
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$ime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isImeKeyEvent"])(event)) {
        if (topPresentEntry(doc) != null) {
            event.preventDefault();
        }
        return;
    }
    // Content inside a layer already claimed this press (see the bubble-phase
    // note in the file header). Honor it and leave the default action alone.
    if (event.defaultPrevented) {
        return;
    }
    if (dispatchEscape(doc)) {
        // Suppress the browser's own close-watcher so it cannot dismiss a second
        // layer behind our back. Propagation is left alone: consumers may
        // legitimately listen for Escape on window, and the stack's decision is
        // already recorded in defaultPrevented.
        event.preventDefault();
    }
}
function startListening(doc) {
    doc.addEventListener('keydown', dispatchLayerEscapeKeyDown);
    doc.addEventListener('compositionstart', handleCompositionStart, true);
    doc.addEventListener('compositionend', handleCompositionEnd, true);
    doc.addEventListener('blur', handleCompositionEnd, true);
    // The copy that adds the listeners keeps their remover in the shared state,
    // so the copy that closes the document's last layer removes these ones.
    stack.stopListeningByDocument.set(doc, ()=>{
        doc.removeEventListener('keydown', dispatchLayerEscapeKeyDown);
        doc.removeEventListener('compositionstart', handleCompositionStart, true);
        doc.removeEventListener('compositionend', handleCompositionEnd, true);
        doc.removeEventListener('blur', handleCompositionEnd, true);
    });
}
function stopListening(doc) {
    stack.stopListeningByDocument.get(doc)?.();
    stack.stopListeningByDocument.delete(doc);
    stack.composingDocuments.delete(doc);
}
function registerLayer(entry) {
    // The document the layer lives in: its container's, else the global one.
    const ownerDocument = entry.getContainer?.()?.ownerDocument ?? globalDocument();
    const full = {
        ...entry,
        seq: seqFor(entry.token),
        ownerDocument
    };
    stack.entries.push(full);
    if (ownerDocument != null) {
        const count = stack.layerCountByDocument.get(ownerDocument) ?? 0;
        stack.layerCountByDocument.set(ownerDocument, count + 1);
        if (count === 0) {
            startListening(ownerDocument);
        }
    }
    return ()=>{
        const index = stack.entries.indexOf(full);
        if (index === -1) {
            return;
        }
        stack.entries.splice(index, 1);
        if (ownerDocument == null) {
            return;
        }
        const count = stack.layerCountByDocument.get(ownerDocument) ?? 1;
        if (count > 1) {
            stack.layerCountByDocument.set(ownerDocument, count - 1);
            return;
        }
        stack.layerCountByDocument.delete(ownerDocument);
        stopListening(ownerDocument);
    };
}
function resetLayerStackForTests() {
    stack.entries.length = 0;
    stack.seqByToken = new WeakMap();
    stack.nextSeq = 0;
    for (const doc of stack.layerCountByDocument.keys()){
        stopListening(doc);
    }
    stack.layerCountByDocument.clear();
    stack.composingDocuments.clear();
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerStructureReset.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file layerStructureReset.stylex.ts
 * @input Uses StyleX
 * @output Stops inherited structural custom properties at a layer's content boundary
 * @position Private Core styling; AST-038 FR7 owns the accepted contract
 */ __turbopack_context__.s([
    "layerStructureReset",
    ()=>layerStructureReset
]);
;
const layerStructureReset = {
    reset: {
        "--step-connector-gap": "x1qkaldv",
        "--_astryx-text-overflow-wrap": "x1c9qq8g",
        $$css: true
    }
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerSurfacePress.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isLayerSurface",
    ()=>isLayerSurface,
    "registerLayerSurface",
    ()=>registerLayerSurface
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file layerSurfacePress.ts
 * @input The content element of an open Tooltip or HoverCard surface.
 * @output A registry of those elements, read only by the public
 *   hasInteractiveAncestor, whose documentation promises that a press inside
 *   one answers true.
 * @position Kept until the next minor for that public answer; Core's own
 *   containers rely on layer roots stopping such presses instead. Not
 *   exported from the package.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-ssr] (ecmascript)");
;
const surfaces = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedWeakSet"])('layer/layer-surface-press/surfaces', 1);
function registerLayerSurface(element) {
    if (element == null) {
        return;
    }
    surfaces.add(element);
    const root = element.parentElement;
    if (root?.hasAttribute('popover')) {
        surfaces.add(root);
    }
}
function isLayerSurface(element) {
    return surfaces.has(element);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerTextReset.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file layerTextReset.stylex.ts
 * @input Uses StyleX and the active theme's body typography tokens
 * @output Shared text baseline for content-bearing layer roots
 * @position Private Core styling; AST-038 owns the accepted contract
 */ __turbopack_context__.s([
    "layerTextReset",
    ()=>layerTextReset
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
;
;
;
const layerTextReset = {
    reset: {
        kMv6JI: "x9ynric",
        kGuDYH: "xjm74w1",
        k63SB2: "xxovm9e",
        kLWn49: "xw6l6zx",
        kKX8nH: "x1j61x8r",
        k9WMMc: "x1yc453h",
        kJI5tL: "x7ssn7h",
        kTHuQy: "xzugeeo",
        kP9fke: "x6mezaz",
        kb6lSQ: "x1i21sxh",
        k4JVr9: "xp3md9m",
        kKMj4B: "x19pm5ym",
        khDVqt: "xeaf4i8",
        kTgw9: "x1lldw8n",
        kHjlTd: "x1h4wwuj",
        kE4Cay: "xxydokm",
        $$css: true
    }
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerViewportInset.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file layerViewportInset.stylex.ts
 * @input Uses the spacing token, the device safe-area insets, the
 *   app-declared `--astryx-layer-inset-*` custom properties, and the
 *   keyboard cap each layer's own style declares
 *   (`--_layer-keyboard-max-block-size`)
 * @output Exports the one definition of an anchored layer's viewport gutter
 *   and the size caps derived from it
 * @position Layer runtime geometry; read by useLayer and by consumers that
 *   clamp a size of their own (spec:AST-059 FR1, FR7)
 *
 * An anchored layer keeps a gutter from each viewport edge: the spacing-4 step
 * or the device safe-area inset for that edge, whichever is larger, plus the
 * inset an app declares for a persistent bar floating over that edge. The
 * inline gutter reads the larger of the two physical safe-area insets, so a
 * layer that flips across the inline axis still clears a notch on either side.
 *
 * `defineConsts`, not plain exported strings: StyleX inlines a cross-file
 * value only through `defineVars`/`defineConsts` from a `.stylex.ts` file.
 * Nothing here is a theme variable: the gutter is geometry, not treatment.
 *
 * App declaration (once, usually on `:root`):
 *
 * ```css
 * :root { --astryx-layer-inset-block-end: var(--app-nav-bar-height, 0px); }
 * ```
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Layer/useLayer.tsx
 * - /packages/core/src/Layer/useLayerKeyboardClearance.ts
 * - /packages/core/src/Layer/layerViewportInset.test.ts
 * - /docs/specs/AST-059-layer-viewport-inset/spec.md
 */ __turbopack_context__.s([
    "layerViewportInset",
    ()=>layerViewportInset
]);
;
// `defineConsts` admits only static values, so the spacing token is named by
// its custom property rather than through `spacingVars`; it is the same
// `--spacing-4` every other gutter in core reads.
const SPACING = 'var(--spacing-4)';
const INSET_BLOCK_START = 'var(--astryx-layer-inset-block-start, 0px)';
const INSET_BLOCK_END = 'var(--astryx-layer-inset-block-end, 0px)';
const INSET_INLINE_START = 'var(--astryx-layer-inset-inline-start, 0px)';
const INSET_INLINE_END = 'var(--astryx-layer-inset-inline-end, 0px)';
// Each layer's own style declares the room the software keyboard leaves it
// (useLayer.tsx's `keyboardCap`, from useLayerKeyboardClearance.ts). An
// uncapped layer declares a limit out of reach.
const KEYBOARD_CAP_PROPERTY = '--_layer-keyboard-max-block-size';
const GUTTER_BLOCK_START = `calc(max(${SPACING}, env(safe-area-inset-top, 0px)) + ${INSET_BLOCK_START})`;
const GUTTER_BLOCK_END = `calc(max(${SPACING}, env(safe-area-inset-bottom, 0px)) + ${INSET_BLOCK_END})`;
const GUTTER_INLINE_LEFT = `calc(max(${SPACING}, env(safe-area-inset-left, 0px)) + ${INSET_INLINE_START})`;
const GUTTER_INLINE_RIGHT = `calc(max(${SPACING}, env(safe-area-inset-right, 0px)) + ${INSET_INLINE_END})`;
// A flipped layer may land on either inline side, so one gutter serves both
// edges: the larger safe-area inset plus the larger app inset.
const GUTTER_INLINE = `calc(max(${SPACING}, env(safe-area-inset-left, 0px), env(safe-area-inset-right, 0px)) + max(${INSET_INLINE_START}, ${INSET_INLINE_END}))`;
// The positional gutter on the block axis is an inset the flip tactics mirror
// between the two edges, so one value serves both: the larger of the two.
const GUTTER_BLOCK = `calc(max(${SPACING}, env(safe-area-inset-top, 0px), env(safe-area-inset-bottom, 0px)) + max(${INSET_BLOCK_START}, ${INSET_BLOCK_END}))`;
const layerViewportInset = {
    gutterBlockStart: "calc(max(var(--spacing-4), env(safe-area-inset-top, 0px)) + var(--astryx-layer-inset-block-start, 0px))",
    gutterBlockEnd: "calc(max(var(--spacing-4), env(safe-area-inset-bottom, 0px)) + var(--astryx-layer-inset-block-end, 0px))",
    gutterInline: "calc(max(var(--spacing-4), env(safe-area-inset-left, 0px), env(safe-area-inset-right, 0px)) + max(var(--astryx-layer-inset-inline-start, 0px), var(--astryx-layer-inset-inline-end, 0px)))",
    gutterBlock: "calc(max(var(--spacing-4), env(safe-area-inset-top, 0px), env(safe-area-inset-bottom, 0px)) + max(var(--astryx-layer-inset-block-start, 0px), var(--astryx-layer-inset-block-end, 0px)))",
    gutterBlockFallback: "calc(var(--spacing-4) + max(var(--astryx-layer-inset-block-start, 0px), var(--astryx-layer-inset-block-end, 0px)))",
    gutterBlockStartFallback: "calc(var(--spacing-4) + var(--astryx-layer-inset-block-start, 0px))",
    gutterBlockEndFallback: "calc(var(--spacing-4) + var(--astryx-layer-inset-block-end, 0px))",
    gutterInlineFallback: "calc(var(--spacing-4) + max(var(--astryx-layer-inset-inline-start, 0px), var(--astryx-layer-inset-inline-end, 0px)))",
    maxInlineSize: "calc(100vi - calc(max(var(--spacing-4), env(safe-area-inset-left, 0px)) + var(--astryx-layer-inset-inline-start, 0px)) - calc(max(var(--spacing-4), env(safe-area-inset-right, 0px)) + var(--astryx-layer-inset-inline-end, 0px)))",
    maxInlineSizeFallback: "calc(100vw - var(--spacing-4) - var(--spacing-4) - var(--astryx-layer-inset-inline-start, 0px) - var(--astryx-layer-inset-inline-end, 0px))",
    maxBlockSize: "min(calc(100dvb - calc(max(var(--spacing-4), env(safe-area-inset-top, 0px)) + var(--astryx-layer-inset-block-start, 0px)) - calc(max(var(--spacing-4), env(safe-area-inset-bottom, 0px)) + var(--astryx-layer-inset-block-end, 0px))), var(--_layer-keyboard-max-block-size, 100dvb))",
    maxBlockSizeFallback: "min(calc(100vh - var(--spacing-4) - var(--spacing-4) - var(--astryx-layer-inset-block-start, 0px) - var(--astryx-layer-inset-block-end, 0px)), var(--_layer-keyboard-max-block-size, 100vh))"
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/outsidePress.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isFocusInsideOwnedLayer",
    ()=>isFocusInsideOwnedLayer,
    "isPressInsideOwnedLayer",
    ()=>isPressInsideOwnedLayer,
    "noteOutsideDismissal",
    ()=>noteOutsideDismissal,
    "outsideDismissalCount",
    ()=>outsideDismissalCount,
    "useOutsidePress",
    ()=>useOutsidePress,
    "watchOutsidePress",
    ()=>watchOutsidePress
]);
/**
 * @file outsidePress.ts
 * @input Pointer presses on a document and on the shadow roots around a
 *   given root; with closesOnPan or onPan, pan moves from core's input stream
 * @output watchOutsidePress, and useOutsidePress, one watch per component.
 *   noteOutsideDismissal and outsideDismissalCount keep a per-document count
 *   of layers that an outside press or focus move closed. The inside tests
 *   are isPressInsideOwnedLayer and isFocusInsideOwnedLayer
 * @position Internal to Layer: the outside-press dismissal for a manual
 *   popover whose owner decides what counts as inside. Not exported.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/gestures.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/flatTree.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputStream.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/nodeType.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/scrollView.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
;
;
;
;
// A modal host's backdrop press reads this. A press that closed a layer above
// the host is that layer's, so the host stays open.
const outsideDismissals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedWeakMap"])('layer/outside-press/outside-dismissals', 1);
function noteOutsideDismissal(doc) {
    outsideDismissals.set(doc, (outsideDismissals.get(doc) ?? 0) + 1);
}
function outsideDismissalCount(doc) {
    return outsideDismissals.get(doc) ?? 0;
}
function watchOutsidePress(owner, isInside, onOutside, { pointerTypes, closesOnPan = false, onPan, root = null } = {}) {
    const doc = owner.ownerDocument;
    const reportPan = closesOnPan ? undefined : onPan;
    const followsPans = closesOnPan || reportPan != null;
    const shadows = root == null ? [] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadowRootsOutward"])(root);
    let startedOutside = false;
    let panStart = null;
    const follows = (event)=>pointerTypes == null || pointerTypes.includes(event.pointerType);
    const close = ()=>{
        startedOutside = false;
        panStart = null;
        noteOutsideDismissal(doc);
        onOutside();
    };
    // Capture phase, so a press whose target stops propagation is still seen.
    // An inner root's listener runs after the outer ones', so its judgment
    // stands.
    const handleDown = (event)=>{
        if (!follows(event)) {
            return;
        }
        if (closesOnPan && panStart != null && panStart.id !== event.pointerId && !event.isPrimary) {
            return;
        }
        startedOutside = !isInside(event.composedPath());
        if (followsPans) {
            panStart = startedOutside ? {
                id: event.pointerId,
                x: event.clientX,
                y: event.clientY
            } : null;
        }
    };
    const handleMove = (event)=>{
        if (panStart?.id === event.pointerId && Math.max(Math.abs(event.clientX - panStart.x), Math.abs(event.clientY - panStart.y)) >= __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIKIT_PAN"].hysteresis.value) {
            if (reportPan != null) {
                const axis = Math.abs(event.clientX - panStart.x) >= Math.abs(event.clientY - panStart.y) ? 'x' : 'y';
                const target = event.composedPath()[0];
                startedOutside = false;
                panStart = null;
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(target) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$scrollView$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["touchActionAllowsPan"])(target, axis)) {
                    reportPan();
                }
                return;
            }
            close();
        }
    };
    const judgeUp = (event)=>{
        if (reportPan != null || !follows(event) || closesOnPan && panStart?.id !== event.pointerId) {
            return;
        }
        const wasOutside = startedOutside;
        startedOutside = false;
        panStart = null;
        if (wasOutside && !isInside(event.composedPath())) {
            noteOutsideDismissal(doc);
            onOutside();
        }
    };
    // The document and each root see a lift inside a deeper closed root as a
    // lift on that root's host. So each of them judges, in the capture phase,
    // only a lift whose path does not hold the host below it. The innermost root
    // judges every lift it sees. A host judges a lift on itself, which no root
    // sees.
    let judgedLift = null;
    const judgeUpUnlessBelow = (hostBelow)=>(event)=>{
            if (event === judgedLift || hostBelow != null && event.composedPath().includes(hostBelow)) {
                return;
            }
            judgedLift = event;
            judgeUp(event);
        };
    const handleUp = judgeUpUnlessBelow(shadows.at(-1)?.host ?? null);
    const liftJudges = shadows.map(({ root: shadow, host }, index)=>({
            shadow,
            host,
            handleRootUp: judgeUpUnlessBelow(index === 0 ? null : shadows[index - 1].host),
            handleHostUp: judgeUpUnlessBelow(null)
        }));
    const handleCancel = (event)=>{
        if (!follows(event)) {
            return;
        }
        if (closesOnPan && panStart?.id === event.pointerId) {
            close();
        } else if (!closesOnPan) {
            startedOutside = false;
            panStart = null;
        }
    };
    const judges = [
        doc,
        ...shadows.map(({ root: shadow })=>shadow)
    ];
    for (const target of judges){
        target.addEventListener('pointerdown', handleDown, true);
    }
    const view = doc.defaultView;
    const stopMoves = followsPans && view != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'pointermove', handleMove) : null;
    doc.addEventListener('pointerup', handleUp, true);
    for (const { shadow, host, handleRootUp, handleHostUp } of liftJudges){
        shadow.addEventListener('pointerup', handleRootUp, true);
        host.addEventListener('pointerup', handleHostUp);
    }
    doc.addEventListener('pointercancel', handleCancel, true);
    return ()=>{
        for (const target of judges){
            target.removeEventListener('pointerdown', handleDown, true);
        }
        stopMoves?.();
        doc.removeEventListener('pointerup', handleUp, true);
        for (const { shadow, host, handleRootUp, handleHostUp } of liftJudges){
            shadow.removeEventListener('pointerup', handleRootUp, true);
            host.removeEventListener('pointerup', handleHostUp);
        }
        doc.removeEventListener('pointercancel', handleCancel, true);
    };
}
function useOutsidePress() {
    const stopRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        stopRef.current?.();
        stopRef.current = null;
    }, []);
    const start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((owner, isInside, onOutside, options)=>{
        stopRef.current?.();
        stopRef.current = watchOutsidePress(owner, isInside, onOutside, options);
    }, []);
    // Stops the outside-press listeners on unmount.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>stop, [
        stop
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            start,
            stop
        }), [
        start,
        stop
    ]);
}
/** Whether `node` is the layer with this id, or inside it across shadow roots. */ function isWithinLayer(node, layerId) {
    for(let current = node; current != null; current = current.parentNode ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadowHostOf"])(current)){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(current) && current.id === layerId) {
            return true;
        }
    }
    return false;
}
function isPressInsideOwnedLayer(path, field, layerId) {
    return path.some((target)=>target === field || layerId !== '' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(target) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(target) && target.id === layerId);
}
function isFocusInsideOwnedLayer(next, field, layerId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(next) && (field?.contains(next) === true || isWithinLayer(next, layerId));
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/popoverOperations.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "afterPopoverOperations",
    ()=>afterPopoverOperations,
    "isBrowserHideInFlight",
    ()=>isBrowserHideInFlight,
    "isPopoverOperationInFlight",
    ()=>isPopoverOperationInFlight,
    "observeBrowserHide",
    ()=>observeBrowserHide,
    "runPopoverOperation",
    ()=>runPopoverOperation
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file popoverOperations.ts
 * @input Popover API events (`beforetoggle`, `toggle`) and the layers' own show/hide calls
 * @output The per-document ledger of popover operations in flight, and the deferral of a show that arrives inside one
 * @position Internal to the layer runtime; used by useLayer
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Layer/useLayer.tsx
 * - /packages/core/src/Layer/popoverOperations.test.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-ssr] (ecmascript)");
;
/**
 * Popover operations in flight, per document.
 *
 * The Popover API refuses to show a popover while the document is in the
 * middle of showing or hiding ANY popover: `showPopover()` throws an
 * `InvalidStateError` ("Invalid to show a popover during another show
 * operation"; Chromium 150+, where 149 still accepts such a show).
 * Hiding a popover restores focus to the element that had it —
 * synchronously, inside that window — so a focus-driven layer on the element
 * receiving focus (a tooltip on the trigger that just closed a popover) asks
 * to show while the hide is still running.
 *
 * Two kinds of operation are counted:
 *
 * - The layers' own shows and hides pass through `runPopoverOperation`, so
 *   their windows are known exactly: a `show()` that arrives inside one is
 *   deferred ahead of asking the browser.
 * - A hide the browser runs on its own — an Escape its close watcher answers,
 *   a light dismiss, an `auto` popover evicted by another one opening — never
 *   passes through here. It is observable from its element's events:
 *   `beforetoggle` fires synchronously as the hide starts, and `toggle` in a
 *   task once it has ended; `observeBrowserHide` counts it between the two.
 *   That window is wider than the engine's, which ends when the hide returns,
 *   so a show inside it is asked of the browser first and deferred only when
 *   the browser refuses it: a light dismiss at `pointerup` followed by a show
 *   at `click` in the same gesture still opens at once.
 *
 * A deferred show waits in `afterPopoverOperations` and replays, one
 * microtask each, once the document's last operation of either kind has
 * ended and the script that started it has unwound.
 */ const ownOperationsByDocument = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedWeakMap"])('layer/popover-operations/own-operations-by-document', 1);
const browserHidesByDocument = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedWeakMap"])('layer/popover-operations/browser-hides-by-document', 1);
const settledCallbacksByDocument = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedWeakMap"])('layer/popover-operations/settled-callbacks-by-document', 1);
function count(map, doc, delta) {
    map.set(doc, Math.max(0, (map.get(doc) ?? 0) + delta));
}
function anyInFlight(doc) {
    return (ownOperationsByDocument.get(doc) ?? 0) > 0 || (browserHidesByDocument.get(doc) ?? 0) > 0;
}
function ended(doc) {
    if (!anyInFlight(doc) && settledCallbacksByDocument.has(doc)) {
        // The operation's own script is still on the stack (the `finally` of a
        // `runPopoverOperation`, a `toggle` listener): replay once it has unwound.
        queueMicrotask(()=>replaySettled(doc));
    }
}
function replaySettled(doc) {
    if (anyInFlight(doc)) {
        // Another operation started before the replay ran; its end replays.
        return;
    }
    const callbacks = settledCallbacksByDocument.get(doc);
    if (callbacks == null) {
        return;
    }
    settledCallbacksByDocument.delete(doc);
    // One microtask each: a replay that throws reaches the page on its own and
    // leaves the ones after it to run.
    for (const callback of callbacks){
        queueMicrotask(callback);
    }
}
function runPopoverOperation(doc, operation) {
    count(ownOperationsByDocument, doc, 1);
    try {
        operation();
    } finally{
        count(ownOperationsByDocument, doc, -1);
        ended(doc);
    }
}
function isPopoverOperationInFlight(doc) {
    return (ownOperationsByDocument.get(doc) ?? 0) > 0;
}
function isBrowserHideInFlight(doc) {
    return (browserHidesByDocument.get(doc) ?? 0) > 0;
}
/** Popovers whose browser-run hide is being counted, so one hide is counted once. */ const browserHidesInFlight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedWeakSet"])('layer/popover-operations/browser-hides-in-flight', 1);
function observeBrowserHide(popover) {
    if (browserHidesInFlight.has(popover)) {
        return;
    }
    browserHidesInFlight.add(popover);
    const doc = popover.ownerDocument;
    count(browserHidesByDocument, doc, 1);
    const view = doc.defaultView ?? globalThis;
    let timer = null;
    let done = false;
    const finish = ()=>{
        if (done) {
            return;
        }
        done = true;
        popover.removeEventListener('toggle', finish);
        if (timer != null) {
            view.clearTimeout(timer);
            timer = null;
        }
        browserHidesInFlight.delete(popover);
        count(browserHidesByDocument, doc, -1);
        ended(doc);
    };
    popover.addEventListener('toggle', finish);
    timer = view.setTimeout(finish, 0);
}
function afterPopoverOperations(doc, callback) {
    if (!anyInFlight(doc)) {
        callback();
        return;
    }
    const callbacks = settledCallbacksByDocument.get(doc);
    if (callbacks == null) {
        settledCallbacksByDocument.set(doc, [
            callback
        ]);
    } else {
        callbacks.push(callback);
    }
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/preserveAnimations.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "preserveAnimations",
    ()=>preserveAnimations
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file preserveAnimations.ts
 * @input An element whose subtree is about to leave rendering for one forced
 *   layout, and the function that does it
 * @output The same CSS animations and transitions afterwards, in the state
 *   they were in before
 * @position Layer runtime; the re-placement of a layer that keeps its anchor
 *   clear (spec:AST-059 FR4)
 *
 * Taking an element out of rendering cancels every CSS animation and
 * transition of it and its subtree. When it returns, the browser creates the
 * animations again from the stylesheet, at their start. It starts no
 * transition but one from `@starting-style`, and script-created animations
 * are untouched. `preserveAnimations` reads every animation's state first.
 * Afterwards it gives each recreated CSS animation that state, and resumes
 * each cancelled transition with a script animation at the same point. Any
 * other animation the return started is finished, unless it never ends
 * (motion/carryAnimations.ts). The browser fires
 * `animationcancel`/`transitioncancel` for the old ones and `animationstart`
 * for the new ones.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$carryAnimations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/carryAnimations.js [app-ssr] (ecmascript)");
;
function preserveAnimations(root, reset) {
    if (typeof root.getAnimations !== 'function') {
        reset();
        return;
    }
    const before = root.getAnimations({
        subtree: true
    });
    const saved = before.map(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$carryAnimations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveAnimation"]);
    reset();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$carryAnimations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["restoreAnimations"])(root, saved, new Set(before));
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/settledBox.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "settledBox",
    ()=>settledBox
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file settledBox.ts
 * @input A layer element
 * @output Exports `settledBox`: the layer's box where its position option put
 *   it, without the transform an entrance (or anything else) applies to it
 * @position Layer runtime: the one box read the fallback order, the software
 *   keyboard's cap and the exit copy measure with. Its readers are listed
 *   below.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Layer/useLayer.tsx
 * - /packages/core/src/Layer/useLayerKeyboardClearance.ts
 * - /packages/core/src/Layer/layerExitCopy.ts
 */ const TRANSFORM_PROPERTIES = [
    'transform',
    'translate',
    'scale',
    'rotate'
];
/** A 2D affine matrix in the order CSS `matrix()` lists it: a, b, c, d, e, f. */ const IDENTITY = [
    1,
    0,
    0,
    1,
    0,
    0
];
/**
 * Chromium and WebKit place layout boxes on a 1/64 px grid. The computed
 * transform keeps six digits, so a derived edge can miss that grid by
 * millionths of a px. An edge that close moves onto the grid. Firefox uses a
 * 1/60 px grid, so its edges stay as derived.
 */ const LAYOUT_UNITS_PER_PX = 64;
const GRID_TOLERANCE_PX = 1 / 2048;
/** How much nearer the scaled size must be, px, for the box to carry it. */ const SCALE_TOLERANCE_PX = 1 / 32;
function hasTransform(style) {
    return TRANSFORM_PROPERTIES.some((name)=>{
        const value = style.getPropertyValue(name);
        return value !== '' && value !== 'none';
    });
}
function isSet(value) {
    return value !== '' && value !== 'none';
}
function multiply(m, n) {
    return [
        m[0] * n[0] + m[2] * n[1],
        m[1] * n[0] + m[3] * n[1],
        m[0] * n[2] + m[2] * n[3],
        m[1] * n[2] + m[3] * n[3],
        m[0] * n[4] + m[2] * n[5] + m[4],
        m[1] * n[4] + m[3] * n[5] + m[5]
    ];
}
/**
 * The element's whole 2D transform, as one matrix, or null for a transform
 * this cannot read (3D, or a rotation in another unit). The individual
 * transform properties apply before `transform`, in this order (CSS
 * Transforms 2). An engine reports a computed `transform` as `matrix()`.
 */ function transformOf(style) {
    const translate = style.getPropertyValue('translate');
    const rotate = style.getPropertyValue('rotate');
    const scale = style.getPropertyValue('scale');
    const transform = style.getPropertyValue('transform');
    let matrix = IDENTITY;
    if (isSet(translate)) {
        const [x = '0', y = '0', z] = translate.split(' ');
        // The computed `translate` keeps a percentage, which is not a length.
        if (z != null || !translate.split(' ').every((value)=>value.endsWith('px'))) {
            return null;
        }
        matrix = multiply(matrix, [
            1,
            0,
            0,
            1,
            parseFloat(x),
            parseFloat(y)
        ]);
    }
    if (isSet(rotate)) {
        if (!/^-?[\d.]+deg$/.test(rotate)) {
            return null;
        }
        const angle = parseFloat(rotate) * Math.PI / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        matrix = multiply(matrix, [
            cos,
            sin,
            -sin,
            cos,
            0,
            0
        ]);
    }
    if (isSet(scale)) {
        const [x = '1', y = x, z] = scale.split(' ');
        if (z != null) {
            return null;
        }
        matrix = multiply(matrix, [
            parseFloat(x),
            0,
            0,
            parseFloat(y),
            0,
            0
        ]);
    }
    if (isSet(transform)) {
        const listed = /^matrix\(([^)]*)\)$/.exec(transform);
        const values = listed?.[1].split(',').map((value)=>parseFloat(value));
        if (values?.length !== 6 || values.some((value)=>Number.isNaN(value))) {
            return null;
        }
        matrix = multiply(matrix, values);
    }
    return matrix;
}
/**
 * Whether the matrix only translates and scales: the box keeps its edges
 * parallel to the axes, and its layout size is its transformed size over the
 * scale.
 */ function isAxisAligned([a, b, c, d]) {
    return b === 0 && c === 0 && a !== 0 && d !== 0;
}
/**
 * Whether the layer's transform can be taken out of its box by calculation.
 * Not while one of its animations is pending: Chromium can then report the
 * first keyframe before the box carries it. Not under a CSS zoom other than 1:
 * the computed translation and origin are then in the layer's own px, not in
 * the box's.
 */ function canUndoByCalculation(layer) {
    const zoom = layer.currentCSSZoom ?? 1;
    if (zoom !== 1) {
        return false;
    }
    return !(layer.getAnimations?.() ?? []).some((animation)=>animation.pending);
}
/** The layer's border-box size in layout px, unrounded, from its used size. */ function layoutSize(style) {
    const px = (name)=>parseFloat(style.getPropertyValue(name)) || 0;
    const isContentBox = style.getPropertyValue('box-sizing') !== 'border-box';
    const extra = (sides)=>isContentBox ? sides.reduce((sum, side)=>sum + px(`padding-${side}`) + px(`border-${side}-width`), 0) : 0;
    return {
        width: px('width') + extra([
            'left',
            'right'
        ]),
        height: px('height') + extra([
            'top',
            'bottom'
        ])
    };
}
/**
 * Whether the box read carries the scale of `matrix`. Right after a layer
 * shows, Chromium can report its entrance's first frame in the computed style
 * while the box read is still laid out without it. The box carries the scale
 * only when its size is clearly nearer the layout size times the scale than
 * the layout size itself. A scale too near 1 to tell them apart does not
 * count.
 */ function carriesScale(rect, style, [a, , , d]) {
    const { width, height } = layoutSize(style);
    if (!(width > 0) || !(height > 0)) {
        return false;
    }
    const scaledError = Math.abs(rect.width - width * Math.abs(a)) + Math.abs(rect.height - height * Math.abs(d));
    const unscaledError = Math.abs(rect.width - width) + Math.abs(rect.height - height);
    return scaledError + SCALE_TOLERANCE_PX < unscaledError;
}
function onLayoutGrid(value) {
    const snapped = Math.round(value * LAYOUT_UNITS_PER_PX) / LAYOUT_UNITS_PER_PX;
    return Math.abs(snapped - value) < GRID_TOLERANCE_PX ? snapped : value;
}
/**
 * `rect`, the box of an element whose computed style carries the 2D transform
 * `matrix`, with that transform undone. The transformed box's centre is the
 * image of the element's centre. So undoing the transform about its origin on
 * that centre gives the untransformed box. A box that only translates and
 * scales gets its layout size from the transformed size, exactly, and needs
 * no other read. Any other box takes its layout size from `offsetWidth` and
 * `offsetHeight`, which round to whole pixels.
 */ function untransform(rect, layer, style, matrix) {
    const [a, b, c, d, e, f] = matrix;
    const isExact = isAxisAligned(matrix);
    const width = isExact ? rect.width / Math.abs(a) : layer.offsetWidth;
    const height = isExact ? rect.height / Math.abs(d) : layer.offsetHeight;
    if (!isExact && width <= 0) {
        return rect;
    }
    const [originX = 0, originY = 0] = style.getPropertyValue('transform-origin').split(' ').map((value)=>parseFloat(value));
    const x = width / 2 - originX;
    const y = height / 2 - originY;
    const centreX = a * x + c * y + e;
    const centreY = b * x + d * y + f;
    const left = rect.left + rect.width / 2 - centreX - originX;
    const top = rect.top + rect.height / 2 - centreY - originY;
    if (!isExact) {
        return new DOMRect(left, top, width, height);
    }
    const snappedLeft = onLayoutGrid(left);
    const snappedTop = onLayoutGrid(top);
    return new DOMRect(snappedLeft, snappedTop, onLayoutGrid(left + width) - snappedLeft, onLayoutGrid(top + height) - snappedTop);
}
function settledBox(layer) {
    const view = layer.ownerDocument.defaultView;
    const style = view?.getComputedStyle(layer);
    if (style == null || !hasTransform(style)) {
        return layer.getBoundingClientRect();
    }
    const matrix = transformOf(style);
    if (matrix != null && isAxisAligned(matrix) && canUndoByCalculation(layer)) {
        const rect = layer.getBoundingClientRect();
        if (carriesScale(rect, style, matrix)) {
            return untransform(rect, layer, style, matrix);
        }
    }
    const transitions = style.getPropertyValue('transition-property').split(',').map((p)=>p.trim());
    const durations = style.getPropertyValue('transition-duration').split(',').map(parseFloat);
    const transitioned = transitions.some((name, index)=>(name === 'all' || TRANSFORM_PROPERTIES.includes(name)) && (durations[index % durations.length] ?? 0) > 0);
    if (transitioned) {
        const rect = layer.getBoundingClientRect();
        return matrix == null ? rect : untransform(rect, layer, style, matrix);
    }
    const saved = TRANSFORM_PROPERTIES.map((name)=>[
            name,
            layer.style.getPropertyValue(name),
            layer.style.getPropertyPriority(name)
        ]);
    for (const name of TRANSFORM_PROPERTIES){
        layer.style.setProperty(name, 'none', 'important');
    }
    const box = layer.getBoundingClientRect();
    const under = view?.getComputedStyle(layer);
    const underMatrix = under != null && hasTransform(under) ? transformOf(under) : null;
    const settled = under != null && underMatrix != null ? untransform(box, layer, under, underMatrix) : box;
    for (const [name, value, priority] of saved){
        if (value === '') {
            layer.style.removeProperty(name);
        } else {
            layer.style.setProperty(name, value, priority);
        }
    }
    return settled;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/useLayer.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPositionTryFallbacks",
    ()=>getPositionTryFallbacks,
    "getSelfAlignment",
    ()=>getSelfAlignment,
    "useKeepLayerOpenProps",
    ()=>useKeepLayerOpenProps,
    "useLayer",
    ()=>useLayer,
    "useLayerInternal",
    ()=>useLayerInternal
]);
/**
 * @file useLayer.tsx
 * @input Uses React hooks, Popover API (its `beforetoggle`/`toggle` events through the popoverOperations ledger), CSS anchor positioning, owned DOM boundaries, shared text/provider boundaries
 * @output Exports the public useLayer hook plus internal trigger helpers.
 * @position Core layer utility; used by useHoverCard, useTooltip, etc.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Layer/useLayer.doc.mjs
 * - /packages/core/src/Layer/useLayer.test.tsx
 * - /packages/core/src/Layer/index.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useCommittedRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useCommittedRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerClickBoundary$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerClickBoundary.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$anchorName$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/anchorName.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$gestureCounter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/gestureCounter.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerHost$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerHost.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerTextReset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerTextReset.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerStructureReset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerStructureReset.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerViewportInset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerViewportInset.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useLayerKeyboardClearance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/useLayerKeyboardClearance.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerEntranceSide$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerEntranceSide.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerKeyboardClearance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerKeyboardClearance.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$settledBox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/settledBox.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerInset$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerInset.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerSlideRules$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerSlideRules.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$popoverOperations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/popoverOperations.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$preserveAnimations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/preserveAnimations.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$LayerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/LayerContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsomorphicLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$overlayPaddingReset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layout/overlayPaddingReset.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedResizeObserver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedResizeObserver.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedMutationObserver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedMutationObserver.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/flatTree.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/nodeType.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputStream.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
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
const _temp = {
    keoZOQ: "x1vhfslr",
    k1K539: "x119uzjn",
    "$$css": true
};
const _temp2 = {
    keoZOQ: "x1lhixnp",
    k1K539: "xlm3tn6",
    "$$css": true
};
const _temp3 = {
    k71WvV: "xa3ewmy",
    "$$css": true
};
const _temp4 = {
    keTefX: "x1cytvie",
    "$$css": true
};
const styles = {
    keyboardCap: (cap, overflow, inset)=>[
            {
                "--_layer-keyboard-max-block-size": cap != null ? "x1ex41ac" : cap,
                "--_layer-keyboard-overflow": overflow != null ? "xypflj0" : overflow,
                "--_layer-keyboard-inset-block-end": inset != null ? "xihxjaz" : inset,
                $$css: true
            },
            {
                "--x---_layer-keyboard-max-block-size": cap != null ? cap : undefined,
                "--x---_layer-keyboard-overflow": overflow != null ? overflow : undefined,
                "--x---_layer-keyboard-inset-block-end": inset != null ? inset : undefined
            }
        ],
    scrollsOnOverflow: {
        kORKVm: "x1odjw0f",
        $$css: true
    },
    base: {
        keoZOQ: "xdj266r",
        k1K539: "xat24cr",
        keTefX: "x1lziwak",
        k71WvV: "x14z9mp",
        kLKAdn: "xexx8yu",
        kGO01o: "x18d9i69",
        kZCmMZ: "x1c1uobl",
        kwRFfy: "xyri2b",
        kMzoRj: "xc342km",
        ksu8eU: "xng3xce",
        kVQacm: "x1rea2x4",
        kWkggS: "xjbqb8w",
        $$css: true
    },
    fixed: {
        kVAEAm: "xixxii4",
        $$css: true
    },
    placementBelow: (offset)=>[
            _temp,
            {
                "--x-marginBlockStart": ((val)=>typeof val === "number" ? val + "px" : val != null ? val : undefined)(offset)
            }
        ],
    placementAbove: (offset)=>[
            _temp2,
            {
                "--x-marginBlockEnd": ((val)=>typeof val === "number" ? val + "px" : val != null ? val : undefined)(offset)
            }
        ],
    placementEnd: (offset)=>[
            _temp3,
            {
                keTefX: offset != null ? "x4lel18" : offset,
                $$css: true
            },
            {
                "--x-marginInlineStart": ((val)=>typeof val === "number" ? val + "px" : val != null ? val : undefined)(offset)
            }
        ],
    placementStart: (offset)=>[
            _temp4,
            {
                k71WvV: offset != null ? "x1c9tiao" : offset,
                $$css: true
            },
            {
                "--x-marginInlineEnd": ((val)=>typeof val === "number" ? val + "px" : val != null ? val : undefined)(offset)
            }
        ],
    farBelow: {
        k1K539: "x119uzjn",
        $$css: true
    },
    farAbove: {
        keoZOQ: "x1lhixnp",
        $$css: true
    },
    farEnd: {
        k71WvV: "xa3ewmy",
        $$css: true
    },
    farStart: {
        keTefX: "x1cytvie",
        $$css: true
    },
    viewportFit: {
        kB7OPa: "x9f619",
        ks0D6T: "xc0b1yq",
        kskxy: "x3v4n1",
        $$css: true
    },
    gutterInlineEnd: {
        k71WvV: "x144kxal",
        $$css: true
    },
    gutterInlineStart: {
        keTefX: "xpdk1p0",
        $$css: true
    },
    gutterBlockEnd: {
        k1K539: "x3z50q0",
        $$css: true
    },
    gutterBlockStart: {
        keoZOQ: "x1j6tnbc",
        $$css: true
    }
};
/**
 * Props for a control that sits on the trigger but must not dismiss the layer.
 */ /**
 * Position placement relative to anchor.
 * Logical: start/end resolve against the popover's own inherited direction
 * via CSS (RTL contexts mirror automatically, no JS involved).
 */ /**
 * Alignment along the placement axis
 */ /**
 * Render props for context mode (anchor positioning)
 */ /**
 * Render props for fixed mode (manual coordinates)
 */ /**
 * Base options shared by both modes
 */ /**
 * Options for context mode (CSS anchor positioning)
 */ /**
 * Options for fixed mode (manual positioning)
 */ /**
 * Return type for context mode
 */ /**
 * Return type for fixed mode
 */ /**
 * Context-mode options a core component may pass through `useLayerInternal`;
 * not part of the public `useLayer` options.
 */ function toCssLength(value) {
    return typeof value === 'number' ? `${value}px` : value;
}
/**
 * Make the engine choose a shown layer's position option afresh: a browser
 * keeps a laid-out layer on the option it last used until the layer stops
 * being rendered, so the layer is taken out of rendering for one forced
 * layout and restored, in the same task. No frame paints in between and the
 * popover stays open, so no toggle event fires and focus and hover are
 * untouched. Every CSS animation and transition of the layer and its content
 * is put back in the state it was in (`preserveAnimations`).
 */ function placeAfresh(layer) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$preserveAnimations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["preserveAnimations"])(layer, ()=>{
        const display = layer.style.display;
        layer.style.display = 'none';
        layer.getBoundingClientRect();
        layer.style.display = display;
    });
}
/**
 * Whether an animation is running and ends on its own. A paused or idle
 * animation does not end by itself. An animation with an infinite end time
 * never ends. Waiting on either holds the layer for good.
 */ function endsOnItsOwn(animation) {
    return animation.playState === 'running' && animation.effect?.getComputedTiming().endTime !== Infinity;
}
/**
 * The finite animations still running on `layer` and its content. A layer
 * that fades out keeps running them after the browser hides it, and it stays
 * placed against its anchor until they end.
 */ function exitAnimations(layer) {
    if (layer == null || typeof layer.getAnimations !== 'function') {
        return [];
    }
    return layer.getAnimations({
        subtree: true
    }).filter(endsOnItsOwn);
}
/**
 * Whether the closed state's transition keeps `layer` shown after it hides.
 * Only a discrete `display` transition holds a hidden layer shown, until it
 * ends. Read it while the layer is closed: the close takes its values from
 * the closed state's style.
 */ function closeTransitionKeepsShown(layer) {
    const style = layer.ownerDocument.defaultView?.getComputedStyle(layer);
    if (style == null) {
        return false;
    }
    const list = (name)=>style.getPropertyValue(name).split(',').map((value)=>value.trim());
    const behaviors = list('transition-behavior');
    const durations = list('transition-duration').map(parseFloat);
    const delays = list('transition-delay').map(parseFloat);
    return list('transition-property').some((name, index)=>{
        const behavior = behaviors[index % behaviors.length];
        const duration = durations[index % durations.length] || 0;
        const delay = delays[index % delays.length] || 0;
        return (name === 'all' || name === 'display') && behavior === 'allow-discrete' && duration + Math.max(0, delay) > 0;
    });
}
/** The keyframe animations that `layer`'s style declares, or `none`. */ function animationNames(layer) {
    const style = layer.ownerDocument.defaultView?.getComputedStyle(layer);
    return style?.getPropertyValue('animation-name').trim() || 'none';
}
/** The settled boxes of a layer and its anchor, from one measurement pass. */ /**
 * Whether the standard list has failed a layer that must keep its anchor
 * clear: its box covers the anchor or, while the anchor is in view, leaves the
 * viewport on the block axis. Only a box that overlaps the anchor counts; a
 * layer flush against it does not.
 */ function failsAnchor({ layer: l, anchor: a }, viewportBlock) {
    if (l.width <= 0 || l.height <= 0) {
        return false;
    }
    const covers = l.left < a.right && a.left < l.right && l.top < a.bottom && a.top < l.bottom;
    const anchorInView = a.bottom > 0 && a.top < viewportBlock;
    return covers || anchorInView && (l.top < 0 || l.bottom > viewportBlock);
}
/**
 * For a layer that must never settle over its anchor (spec:AST-059 FR4). Every
 * option of its one combined fallback list keeps it clear of its anchor, and
 * the engine picks one. Where the box still covers the anchor or, while the
 * anchor is in view, leaves the viewport on the block axis, the layer is
 * placed afresh (`placeAfresh`) from that list. The runtime calls this in the
 * same task as every show and remount, and while the layer is open whenever
 * its size, its content's size, its anchor's size or the viewport changes;
 * each of those reads lands before the next frame paints. It also runs once
 * in the first frame painted after a scroll of the anchor stops
 * (`observeScrollStop`), because during a scroll the browser does not choose
 * an option again. Nothing watches an anchor that moves without resizing, so
 * the layer never jumps to another side mid-scroll. It returns the boxes it
 * read when it leaves the layer in place, so a show reads them once. After a
 * fresh placement, or without an anchor, it returns `null`.
 */ function keepAnchorClear(layer, anchor) {
    if (anchor == null) {
        return null;
    }
    // One measurement pass. `settledBox` can write the layer's transforms and
    // restore them, so it reads last.
    const anchorBox = anchor.getBoundingClientRect();
    // The viewport's block extent, as the layer's anchor positioning sees it.
    const viewportBlock = layer.ownerDocument.documentElement.clientHeight;
    const boxes = {
        anchor: anchorBox,
        layer: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$settledBox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["settledBox"])(layer)
    };
    if (failsAnchor(boxes, viewportBlock)) {
        placeAfresh(layer);
        return null;
    }
    return boxes;
}
/**
 * Gives a shown layer's entrance its side. The boxes `keepAnchorClear` read
 * stand when it left the layer in place; otherwise the side is read here,
 * after the placement. Only an anchored layer has a side.
 */ function writeEntranceSide(layer, trigger, boxes) {
    if (trigger == null || !layer.hasAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerKeyboardClearance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LAYER_ANCHORED_ATTRIBUTE"])) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerEntranceSide$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeLayerEntranceSide"])(layer, null);
        return;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerEntranceSide$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeLayerEntranceSide"])(layer, boxes == null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerEntranceSide$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readLayerEntranceSide"])(layer, trigger) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerEntranceSide$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layerEntranceSide"])(boxes.layer, boxes.anchor));
}
/**
 * How long a scroll must stay still, in ms, to count as stopped where the
 * browser does not fire `scrollend`.
 */ const SCROLL_STILL_MS = 150;
/**
 * The shadow roots along `node`'s flat-tree path. `scroll` and `scrollend`
 * are not composed, so a scroll inside a shadow tree reaches its shadow root
 * but not the window.
 */ function shadowRootsAbove(node) {
    const roots = [];
    for(let current = node; current; current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parentAcrossShadow"])(current)){
        const root = current.getRootNode();
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isShadowRoot"])(root) && !roots.includes(root)) {
            roots.push(root);
        }
    }
    return roots;
}
/**
 * Calls `onStop` once each time a scroll of the page or of an ancestor of
 * `anchor` stops, in the first frame painted after it stops. During a scroll,
 * Chromium does not choose a layer's position option again, so the layer is
 * checked once the scroll stops. A scroll stops at `scrollend`; where the
 * browser does not fire it, a scroll stops after `SCROLL_STILL_MS` with no
 * `scroll` event. A scroll that starts again before the check cancels it. No
 * handler reads layout.
 */ function observeScrollStop(view, anchor, onStop) {
    let frame = null;
    let timer = null;
    const cancel = ()=>{
        if (frame !== null) {
            view.cancelAnimationFrame(frame);
            frame = null;
        }
        if (timer !== null) {
            view.clearTimeout(timer);
            timer = null;
        }
    };
    // At `scrollend`, and in the frame after it, Chromium still reads the
    // anchored layer at its position before the scroll. After one painted
    // frame it reads the position the scroll gave it.
    const callAfterNextPaint = ()=>{
        cancel();
        frame = view.requestAnimationFrame(()=>{
            frame = null;
            timer = view.setTimeout(()=>{
                timer = null;
                frame = view.requestAnimationFrame(()=>{
                    frame = null;
                    onStop();
                });
            });
        });
    };
    const firesScrollEnd = view.onscrollend !== undefined;
    const isAnchorScroll = (event)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$flatTree$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containsAlongFlatTree"])(event.target, anchor);
    const onScroll = (event)=>{
        if (!isAnchorScroll(event)) {
            return;
        }
        cancel();
        if (!firesScrollEnd) {
            timer = view.setTimeout(()=>{
                timer = null;
                callAfterNextPaint();
            }, SCROLL_STILL_MS);
        }
    };
    const onScrollEnd = (event)=>{
        if (isAnchorScroll(event)) {
            callAfterNextPaint();
        }
    };
    const unsubscribes = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'scroll', onScroll)
    ];
    if (firesScrollEnd) {
        unsubscribes.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'scrollend', onScrollEnd));
    }
    const listening = {
        capture: true,
        passive: true
    };
    const shadowRoots = shadowRootsAbove(anchor);
    for (const shadowRoot of shadowRoots){
        shadowRoot.addEventListener('scroll', onScroll, listening);
        if (firesScrollEnd) {
            shadowRoot.addEventListener('scrollend', onScrollEnd, listening);
        }
    }
    return ()=>{
        for (const unsubscribe of unsubscribes){
            unsubscribe();
        }
        for (const shadowRoot of shadowRoots){
            shadowRoot.removeEventListener('scroll', onScroll, listening);
            shadowRoot.removeEventListener('scrollend', onScrollEnd, listening);
        }
        cancel();
    };
}
/**
 * Watch an open layer that keeps its anchor clear, and its anchor, for every
 * change that can re-settle the layer over the anchor (spec:AST-059 FR4, FR8):
 * the layer, its content or the anchor resizing (ResizeObserver, before
 * paint), the viewport resizing (before paint), and a scroll of the anchor
 * stopping (`observeScrollStop`, in the first frame painted after it). Each
 * calls `keepAnchorClear` for this layer and anchor while `isCurrent` says
 * they are still the live pair. Returns the function that removes every
 * observer and listener it added.
 */ function observeAnchorClearance(layer, anchor, isCurrent) {
    const view = layer.ownerDocument.defaultView;
    if (!view) {
        return ()=>{};
    }
    const reread = ()=>{
        if (isCurrent()) {
            keepAnchorClear(layer, anchor);
        }
    };
    let observer = null;
    if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(reread);
        observer.observe(layer);
        for (const child of Array.from(layer.children)){
            observer.observe(child);
        }
        observer.observe(anchor);
    }
    view.addEventListener('resize', reread);
    const stopObservingScrollStop = observeScrollStop(view, anchor, reread);
    return ()=>{
        observer?.disconnect();
        stopObservingScrollStop();
        view.removeEventListener('resize', reread);
    };
}
/** Whether `element` is shown as a popover (`:popover-open`). */ function isShownAsPopover(element) {
    try {
        return element.matches(':popover-open');
    } catch  {
        // An engine without the pseudo-class has no popovers to be shown as.
        return false;
    }
}
/**
 * Whether `anchor` is a valid CSS anchor right now: it has a layout box, and
 * any `<dialog>` it sits in is showing, as a modal (`open`) or as a popover
 * (a non-modal `Drawer` is shown with `showPopover()` and never `open`).
 * `Dialog` displays its element during render but only calls `showModal()` in
 * a later Effect, so in that window the trigger already has a box while the
 * dialog is not yet in the top layer; opening a layer then paints it before
 * the dialog is modal.
 */ function isAnchorReady(anchor) {
    // No layout box at all: `display: none`, or inside a closed `<dialog>`. An
    // element that renders but is empty (an inline `<span>` with no content, such
    // as a ContextMenu's cursor anchor in a shadow root without Astryx's styles)
    // still has one 0x0 client rect and is a valid anchor.
    if (anchor.getClientRects().length === 0) {
        return false;
    }
    const dialog = anchor.closest('dialog');
    return dialog == null || dialog.open || isShownAsPopover(dialog);
}
/**
 * Calls `onReady` one frame later, once every running animation that ends on
 * its own, on the document timeline, on `anchor` or an ancestor, has finished.
 * Calls it synchronously if `document.getAnimations` does not exist (jsdom).
 * Returns a cancel function.
 *
 * `getBoundingClientRect()` reflects an ancestor's CSS transform, so an
 * anchor sitting inside a running entry animation — Dialog's own
 * scale/translate enter transition, e.g. — keeps reporting a different box
 * every frame for as long as that animation runs, even though a
 * `ResizeObserver` sees no size change at all (a transform never changes the
 * anchor's own layout box). Anchoring a layer to the trigger's box mid
 * transition, rather than the one it settles into, has produced a CSS
 * anchor-positioning resolution that never gets revisited once the trigger
 * stops moving: the layer is stranded at its unanchored fallback position
 * for the rest of that open.
 *
 * The check itself waits one frame before reading `document.getAnimations()`:
 * a CSS animation just triggered by a `display`/class change (exactly what
 * unhides a Dialog's content) is not yet in that list in the same task —
 * measured directly, not assumed — so checking synchronously would always see
 * zero animations and defeat the whole guard. One frame is enough for the UA
 * to have started it.
 *
 * The wait skips an animation that never ends by itself: a paused one, an
 * infinite one such as `StatusDot`'s pulse, and a scroll- or view-driven one.
 * `Animation.finished` never resolves for these, so waiting on them would
 * block a layer that anchors to them from ever opening.
 */ function waitForAncestorAnimations(anchor, onReady) {
    if (typeof document.getAnimations !== 'function') {
        onReady();
        return ()=>{};
    }
    let cancelled = false;
    const handle = requestAnimationFrame(()=>{
        if (cancelled) {
            return;
        }
        const running = document.getAnimations().filter((animation)=>{
            const target = animation.effect instanceof KeyframeEffect ? animation.effect.target : null;
            if (!(target instanceof Node) || !(target === anchor || target.contains(anchor))) {
                return false;
            }
            // A scroll- or view-driven animation finishes only when the person
            // scrolls to the end of its range, so it is not a settle to wait on.
            if (animation.timeline !== document.timeline) {
                return false;
            }
            return endsOnItsOwn(animation);
        });
        if (running.length === 0) {
            onReady();
            return;
        }
        void Promise.all(running.map(async (animation)=>animation.finished.catch(()=>{}))).then(()=>{
            if (!cancelled) {
                onReady();
            }
        });
    });
    return ()=>{
        cancelled = true;
        cancelAnimationFrame(handle);
    };
}
/**
 * Where a context layer is hosted, published to the one component that
 * renders it. The hook resolves the mount from the marker's parent once the
 * marker is in the DOM, and the slot below subscribes to it, so the render
 * that places the layer re-renders the slot alone: the hook's host (a
 * Tooltip, a Popover, a menu) and everything under it render once on mount.
 */ function createContextLayerMountStore() {
    let mount = null;
    const listeners = new Set();
    return {
        get: ()=>mount,
        set: (next)=>{
            if (next === mount) {
                return;
            }
            mount = next;
            for (const listener of listeners){
                listener();
            }
        },
        subscribe: (onChange)=>{
            listeners.add(onChange);
            return ()=>{
                listeners.delete(onChange);
            };
        }
    };
}
const readNoMount = ()=>null;
/**
 * The marker and, once the hook has resolved where it goes, the layer. The
 * server and the hydrating render carry the marker alone, so block content
 * never enters server markup inside `<p>` and its kin; the mount arrives from
 * the marker's ref callback, and only this component re-renders to place the
 * layer.
 */ function ContextLayerSlot({ mountStore, renderLayer, sentinelRef }) {
    const mount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(mountStore.subscribe, mountStore.get, readNoMount);
    // Keep the marker mounted after resolving the layer. Apart from giving
    // us the real JSX parent on first show, this lets its ref report when a
    // persistent hook's render call moves to a different host.
    const sentinel = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("template", {
        ref: sentinelRef
    });
    if (mount === null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: sentinel
        });
    }
    const layer = renderLayer(mount);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            sentinel,
            mount.portalTarget ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(layer, mount.portalTarget) : layer
        ]
    });
}
function readPortalWritingContext(element, portalTarget) {
    const view = element.ownerDocument.defaultView;
    if (!view) {
        return {};
    }
    const sourceStyle = view.getComputedStyle(element);
    const targetStyle = view.getComputedStyle(portalTarget);
    // Do not snapshot custom properties here. The portal target is the closest
    // safe ancestor, so theme variables continue to inherit and update there.
    // These two properties can be set on the unsafe chain itself and directly
    // affect the logical anchor-positioning keywords used by the layer. Only
    // override values the portal would actually lose; matching values should
    // keep inheriting from the target so later direction changes remain live.
    return {
        ...sourceStyle.direction !== targetStyle.direction && {
            direction: sourceStyle.direction
        },
        ...sourceStyle.writingMode !== targetStyle.writingMode && {
            writingMode: sourceStyle.writingMode
        }
    };
}
/**
 * Map logical placement/alignment to a CSS position-area value.
 *
 * Uses the self-* logical keyword family: the inline axis resolves against
 * the popover's own direction (inherited inline or preserved when portaled),
 * so it mirrors in RTL without placement-specific JS. The block axis is
 * direction-neutral but must come from the same keyword family — mixing
 * physical `top` with `self-inline-*` produces an invalid position-area
 * (computes to `none`, which pins the popover to the viewport corner because
 * styles.base zeroes the UA margins).
 *
 * Note the plain logical family (`inline-start`, no `self-`) is NOT a
 * substitute: it resolves against the containing block — the page root for
 * a top-layer popover — so it ignores `direction` set on a subtree, which
 * is exactly #3389's repro.
 */ function getPositionArea(placement = 'above', alignment = 'center') {
    if (placement === 'above' || placement === 'below') {
        const block = placement === 'above' ? 'self-block-start' : 'self-block-end';
        if (alignment === 'start') {
            return `${block} span-self-inline-end`;
        }
        if (alignment === 'end') {
            return `${block} span-self-inline-start`;
        }
        return block; // center
    }
    const inline = placement === 'start' ? 'self-inline-start' : 'self-inline-end';
    if (alignment === 'start') {
        return `${inline} span-self-block-end`;
    }
    if (alignment === 'end') {
        return `${inline} span-self-block-start`;
    }
    return inline; // center
}
function getPositionTryFallbacks(placement = 'above', alignment = 'center') {
    const flips = 'flip-block, flip-inline, flip-block flip-inline';
    const slides = `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerSlideRules$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["slideRuleName"])(placement, alignment, 'same')}, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerSlideRules$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["slideRuleName"])(placement, alignment, 'opposite')}`;
    if (alignment !== 'center') {
        return `${flips}, ${slides}`;
    }
    if (placement === 'above' || placement === 'below') {
        const [same, opposite] = placement === 'above' ? [
            'top',
            'bottom'
        ] : [
            'bottom',
            'top'
        ];
        return `${flips}, ${same} span-left, ${same} span-right, ${opposite} span-left, ${opposite} span-right, ${slides}`;
    }
    const [same, opposite] = placement === 'start' ? [
        'left',
        'right'
    ] : [
        'right',
        'left'
    ];
    return `${flips}, ${same} span-top, ${same} span-bottom, ${opposite} span-top, ${opposite} span-bottom, ${slides}`;
}
function getSelfAlignment(placement, alignment, isAnchorInView) {
    if (isAnchorInView || alignment === 'center') {
        return {};
    }
    const edge = alignment === 'start' ? 'unsafe self-start' : 'unsafe self-end';
    return placement === 'above' || placement === 'below' ? {
        justifySelf: edge
    } : {
        alignSelf: edge
    };
}
/**
 * The gutter styles for a placement/alignment pair: the far viewport edge of
 * the alignment axis, or both edges when centered (spec:AST-059 FR1).
 */ function getGutterStyles(placement, alignment) {
    if (placement === 'above' || placement === 'below') {
        if (alignment === 'start') {
            return [
                styles.gutterInlineEnd
            ];
        }
        if (alignment === 'end') {
            return [
                styles.gutterInlineStart
            ];
        }
        return [
            styles.gutterInlineStart,
            styles.gutterInlineEnd
        ];
    }
    if (alignment === 'start') {
        return [
            styles.gutterBlockEnd
        ];
    }
    if (alignment === 'end') {
        return [
            styles.gutterBlockStart
        ];
    }
    return [
        styles.gutterBlockStart,
        styles.gutterBlockEnd
    ];
}
function useKeepLayerOpenProps(id, isOpen) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            onPointerDown: (event)=>{
                const control = event.currentTarget;
                const doc = control.ownerDocument;
                // The runtime shows the layer before its open state commits. The
                // layer renders in the control's own tree, a shadow root included.
                const root = control.getRootNode();
                const layer = ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isShadowRoot"])(root) ? root : doc).getElementById(id);
                if (!isOpen && (layer == null || !isShownAsPopover(layer))) {
                    return;
                }
                // The browser reads the invoker relationship at both ends of the press.
                control.setAttribute('popovertarget', id);
                const onPressEnd = ()=>{
                    doc.removeEventListener('pointerup', onPressEnd);
                    doc.removeEventListener('pointercancel', onPressEnd);
                    // Light dismiss runs as the pointerup default action after listeners.
                    doc.defaultView?.setTimeout(()=>{
                        control.removeAttribute('popovertarget');
                    }, 0);
                };
                doc.addEventListener('pointerup', onPressEnd);
                doc.addEventListener('pointercancel', onPressEnd);
            },
            onClickCapture: (event)=>{
                const control = event.currentTarget;
                if (control.hasAttribute('popovertarget')) {
                    // Being an invoker would otherwise toggle the layer shut.
                    event.preventDefault();
                    control.removeAttribute('popovertarget');
                }
            }
        }), [
        id,
        isOpen
    ]);
}
/**
 * Core layer hook that handles popover behavior and positioning.
 *
 * Supports two positioning modes with type-safe render props:
 * - `context`: CSS anchor positioning relative to a trigger element
 * - `fixed`: Fixed positioning at specified coordinates
 *
 * @example
 * ```
 * const layer = useLayer({ mode: 'context' });
 * <button ref={layer.ref}>Trigger</button>
 * {layer.render(<Content />, { placement: 'above', alignment: 'center' })}
 * ```
 */ function useLayerImplementation(options) {
    const { mode, onShow, onHide, lightDismiss = false } = options;
    const lazyMount = mode === 'context' ? options.lazyMount ?? false : false;
    const keepsMountAfterShow = lazyMount && mode === 'context' ? options.keepsMountAfterShow ?? false : false;
    const keepsAnchorClear = mode === 'context' ? options.keepsAnchorClear ?? false : false;
    const watchesOutsidePans = mode === 'context' ? options.watchesOutsidePans : undefined;
    const writesEntranceSide = mode === 'context' ? options.writesEntranceSide ?? false : false;
    const onCloseStart = mode === 'context' ? options.onCloseStart : undefined;
    const onCloseStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useCommittedRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCommittedRef"])(onCloseStart);
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const anchorId = `--astryx-layer-${id.replace(/:/g, '')}`;
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Whether the anchor is inside the viewport (spec:AST-059 FR5). The slide
    // fallback is withdrawn while it is not, so an aligned layer holds its
    // position and size instead of chasing an anchor nobody can see.
    const [isAnchorInView, setIsAnchorInView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Mirror so the pre-paint read commits nothing when the answer is unchanged.
    const isAnchorInViewRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(true);
    const updateAnchorInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((inView)=>{
        if (isAnchorInViewRef.current !== inView) {
            isAnchorInViewRef.current = inView;
            setIsAnchorInView(inView);
        }
    }, []);
    // The inset the app declared on LayerProvider (FR6). Read through context
    // and written inline on the layer, so a corrective portal cannot escape it
    // and no measurement is needed to apply it.
    const layerContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$LayerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayerContext"])();
    const declaredInset = layerContext?.inset;
    const popoverRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // The DOM element on which the current logical open state was applied.
    // A portal target change replaces the popover element; retaining the old
    // reference lets the ref callback recognize and reopen its replacement.
    const openedPopoverRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const triggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // A detach (contextRef(null)) still in its transient window — cancelled if
    // the same element reattaches before the microtask runs, applied
    // (removing the anchor name) otherwise. See contextRef below.
    const pendingTriggerDetachRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Context layers place a persistent inert marker at their real JSX position.
    // Its parent tells us whether the final layer can stay inline or needs a
    // corrective portal, including after the render call moves.
    const sentinelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const contextMountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // The resolved mount reaches the slot through this store, never through
    // state on this hook, so placing the layer renders the slot alone. The
    // generation counts mounts that REPLACE a resolved one (a render call that
    // moved to another host): the layer element is recreated then, and the
    // effects below that bind to it re-run.
    const [mountStore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(createContextLayerMountStore);
    const [mountGeneration, setMountGeneration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // A show() that cannot run yet is remembered here and replayed: one that
    // arrives before the final layer mounts runs when its popover ref attaches;
    // one that arrives while another popover is mid show/hide runs once that
    // operation has unwound. hide() forgets it either way.
    const pendingShowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Cancels a show that waits for a press's release to be handled.
    const cancelAfterReleaseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Ref mirrors isOpen for synchronous reads inside show/hide.
    // State drives re-renders; the ref lets the imperative calls avoid
    // stale-closure reads of the previous isOpen value.
    const isOpenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // The exit of the layer that closed last, while it still paints. Its
    // trigger stays an anchor until it ends, also when the trigger attaches
    // again during it. Null once it has ended.
    const exitRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Read at the last show, from the closed state's style.
    const closeKeepsShownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // A closed trigger is no anchor, once the layer stops painting. A show
    // during the exit keeps the name, and so does a later exit.
    const releaseAnchor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((layer)=>{
        const exit = {};
        exitRef.current = exit;
        const release = ()=>{
            if (exitRef.current !== exit) {
                return;
            }
            exitRef.current = null;
            const trigger = triggerRef.current;
            if (!isOpenRef.current && trigger != null) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$anchorName$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeAnchorName"])(trigger, anchorId);
            }
        };
        // The animation read lays out the page between the writes of the close.
        // Skip it when the layer stops painting as it hides.
        const running = closeKeepsShownRef.current ? exitAnimations(layer) : [];
        if (running.length === 0) {
            release();
            return;
        }
        void Promise.all(running.map(async (animation)=>animation.finished.catch(()=>undefined))).then(release);
    }, [
        anchorId
    ]);
    // The gesture during which the browser last closed this layer on its own.
    // openNow reads it so that the same press cannot reopen the layer.
    const dismissedByGestureRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // The trigger the layer was open for when the browser closed it. Only a
    // show from that trigger is the dismissing press reopening it.
    const dismissedTriggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // A hide the browser has started on its own (light dismiss, popover="auto"
    // stack eviction, an Escape its close watcher answers), from `beforetoggle`
    // until its `toggle`, with the trigger the layer was open for. `moved` is
    // set when a show from another trigger reopens the layer during that hide.
    const browserHideRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const forgetDismissalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Stops the watch for pans outside the open layer (`watchesOutsidePans`).
    const stopOutsidePanWatchRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stopOutsidePanWatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        stopOutsidePanWatchRef.current?.();
        stopOutsidePanWatchRef.current = null;
    }, []);
    const wasJustDismissed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const gesture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$gestureCounter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["currentGesture"])();
        return dismissedByGestureRef.current === gesture;
    }, []);
    /**
   * Asks the browser to show the popover. Returns false when the browser
   * refused with an `InvalidStateError` while a hide it runs itself is still
   * in flight (the ledger counts it from `beforetoggle`); the caller then
   * replays the show once that hide has ended. Any other failure, and a
   * refusal outside such a hide, reaches the caller: a replay runs outside
   * the hide, so one that fails is not caught here.
   */ const showPopoverElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((popover)=>{
        // Finding infra-4: the Popover API is unsupported on Safari <17 and
        // Firefox <125. On those browsers `showPopover` does not exist, so fall
        // back to plain visibility instead of throwing.
        if (typeof popover.showPopover === 'function') {
            const doc = popover.ownerDocument;
            const duringBrowserHide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$popoverOperations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isBrowserHideInFlight"])(doc);
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$popoverOperations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runPopoverOperation"])(doc, ()=>{
                    // The trigger is passed as the popover's invoker `source`: a layer
                    // hosted away from its trigger then still takes its sequential
                    // focus order (and its popover nesting) from the trigger rather
                    // than from its own DOM position. Browsers without the option
                    // ignore it. `source` is declared as an `HTMLElement`. A
                    // caller-rendered icon trigger is an `SVGElement`, whose dictionary
                    // conversion throws before the popover opens. Omitting the option
                    // for it still anchors the layer, because positioning reads the
                    // anchor-name pair, and only gives up the invoker's focus order.
                    // The check asks the trigger's own window: an HTML trigger rendered
                    // into another document (an iframe, a Picture-in-Picture window) is
                    // not an instance of this window's `HTMLElement`, and keeps its
                    // source.
                    const trigger = triggerRef.current;
                    const triggerView = trigger?.ownerDocument.defaultView;
                    popover.showPopover({
                        source: triggerView != null && trigger instanceof triggerView.HTMLElement ? trigger : undefined
                    });
                });
            } catch (error) {
                // The name, not the constructor: a popover in another document throws
                // that document's `DOMException`.
                if (duringBrowserHide && error?.name === 'InvalidStateError') {
                    return false;
                }
                throw error;
            }
        } else {
            popover.style.display = 'block';
        }
        openedPopoverRef.current = popover;
        return true;
    }, []);
    const isCurrentContextPopover = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((popover)=>{
        if (mode !== 'context') {
            return true;
        }
        const mount = contextMountRef.current;
        if (mount === null) {
            return false;
        }
        const expectedParent = mount.portalTarget ?? sentinelRef.current?.parentElement ?? null;
        return popover.parentElement === expectedParent;
    }, [
        mode
    ]);
    const requestContextMount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (mode !== 'context') {
            return;
        }
        const sentinel = sentinelRef.current;
        const inlineParent = sentinel?.parentElement ?? null;
        if (!sentinel || !inlineParent) {
            return;
        }
        // The slide options' `@position-try` rules (FR4) are installed in the
        // layer's document before its first paint, here where the mount resolves:
        // the marker's arrival is the one event every mount has, whether the
        // render call mounts with its host or later. One sheet serves every layer.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerSlideRules$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ensureSlideRules"])(sentinel.ownerDocument);
        const portalTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerHost$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveLayerPortalTarget"])(inlineParent);
        // A mount for a layer that is opening or open reads its writing context
        // now; a closed layer's waits for its first show.
        const opening = pendingShowRef.current || isOpenRef.current;
        const mount = {
            portalTarget,
            portalStyle: portalTarget == null ? {} : opening ? readPortalWritingContext(sentinel, portalTarget) : null
        };
        const replaced = contextMountRef.current !== null;
        contextMountRef.current = mount;
        mountStore.set(mount);
        if (replaced) {
            setMountGeneration((generation)=>generation + 1);
        }
    }, [
        mode,
        mountStore
    ]);
    // Reads the writing context a closed layer's mount deferred, before the
    // layer opens. It is written on the popover at once, so the first open frame
    // already has it (layer-runtime INV12), and published to the slot, whose
    // render writes the same values. A value the caller's own `style` sets is
    // already inline and wins, as it does in render.
    const applyDeferredWritingContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((popover)=>{
        const mount = contextMountRef.current;
        const sentinel = sentinelRef.current;
        if (mount === null || mount.portalTarget === null || mount.portalStyle !== null || sentinel === null) {
            return;
        }
        const portalStyle = readPortalWritingContext(sentinel, mount.portalTarget);
        if (portalStyle.direction != null && popover.style.direction === '') {
            popover.style.direction = portalStyle.direction;
        }
        if (portalStyle.writingMode != null && popover.style.writingMode === '') {
            popover.style.writingMode = portalStyle.writingMode;
        }
        const next = {
            ...mount,
            portalStyle
        };
        contextMountRef.current = next;
        mountStore.set(next);
    }, [
        mountStore
    ]);
    const clearContextMount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (mode !== 'context' || !lazyMount || keepsMountAfterShow) {
            return;
        }
        contextMountRef.current = null;
        mountStore.set(null);
    }, [
        mode,
        lazyMount,
        keepsMountAfterShow,
        mountStore
    ]);
    const openNow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        // Every caller lands here, so this is where the dismissing press is
        // absorbed: opening now from the same trigger would reopen the popup that
        // press closed. A show from another trigger of the layer opens it there.
        if (wasJustDismissed() && dismissedTriggerRef.current === triggerRef.current) {
            return;
        }
        // A light-dismiss layer asked to show while a press's release is handled
        // (a menu row acts at the release) would be closed by that release's
        // light dismiss, which runs after the handlers. It shows once the
        // release is handled, so it stays a native auto popover.
        if (lightDismiss && !isOpenRef.current && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$gestureCounter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isReleaseInFlight"])()) {
            const doc = popoverRef.current?.ownerDocument ?? document;
            pendingShowRef.current = true;
            cancelAfterReleaseRef.current?.();
            cancelAfterReleaseRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$gestureCounter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["afterRelease"])(doc, ()=>{
                cancelAfterReleaseRef.current = null;
                if (pendingShowRef.current) {
                    pendingShowRef.current = false;
                    showRef.current();
                }
            });
            return;
        }
        // A show from another trigger while the browser closes the layer for its
        // old trigger: the layer moves to the new trigger. It opens there now, and
        // the old trigger's close is not reported.
        const browserHide = browserHideRef.current;
        if (browserHide != null && isOpenRef.current && browserHide.popover === popoverRef.current && browserHide.trigger !== triggerRef.current) {
            browserHide.moved = true;
            openedPopoverRef.current = null;
            isOpenRef.current = false;
            stopOutsidePanWatch();
        }
        // A context popover left over until React commits a previous hide must not
        // be reopened. The synchronous mount ref is the source of truth.
        const candidate = popoverRef.current;
        const popover = candidate && isCurrentContextPopover(candidate) ? candidate : null;
        if (!popover) {
            pendingShowRef.current = true;
            requestContextMount();
            return;
        }
        if (!isOpenRef.current) {
            const replayWhenSettled = ()=>{
                pendingShowRef.current = true;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$popoverOperations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["afterPopoverOperations"])(popover.ownerDocument, ()=>{
                    if (pendingShowRef.current) {
                        pendingShowRef.current = false;
                        showRef.current();
                    }
                });
            };
            // Another layer's own show or hide is running (typically a hide that is
            // handing focus back to this layer's trigger): the browser would refuse
            // the show, so replay this call once that operation has returned.
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$popoverOperations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPopoverOperationInFlight"])(popover.ownerDocument)) {
                replayWhenSettled();
                return;
            }
            // The close takes its values from the closed state's style. Read it
            // before the writes of the show, so the read lays nothing out.
            const closeTransitionHolds = closeTransitionKeepsShown(popover);
            const closedAnimations = animationNames(popover);
            applyDeferredWritingContext(popover);
            // The trigger takes the layer's anchor name in the task that shows the
            // layer, so the layer's first frame is placed against it.
            const anchor = triggerRef.current;
            if (anchor != null) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$anchorName$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAnchorName"])(anchor, anchorId);
            }
            // A hide the browser runs itself (an Escape its close watcher answers)
            // is counted too, from `beforetoggle` until the element's `toggle`, a
            // task after the hide has returned. The show is asked of the browser
            // first, because the browser accepts it once its hide has returned (a
            // light dismiss at pointerup, then this show at the click); only a show
            // it refuses replays once the hide's count has ended.
            if (!showPopoverElement(popover)) {
                // The replay anchors the trigger again; until then it is closed. An
                // exit still running keeps the name.
                if (anchor != null && exitRef.current == null) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$anchorName$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeAnchorName"])(anchor, anchorId);
                }
                replayWhenSettled();
                return;
            }
            // A keyframe animation that only the closed state declares starts at
            // the close, and it can animate `display`. One that both states declare
            // is the entrance, and the hide stops it.
            const closeStartsAnimation = closedAnimations !== 'none' && closedAnimations !== animationNames(popover);
            closeKeepsShownRef.current = closeTransitionHolds || closeStartsAnimation;
            if (lightDismiss) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$gestureCounter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["claimContextMenuPress"])(popover);
                if (watchesOutsidePans != null) {
                    stopOutsidePanWatch();
                    stopOutsidePanWatchRef.current = watchesOutsidePans(popover);
                }
            }
            const anchorBoxes = keepsAnchorClear ? keepAnchorClear(popover, triggerRef.current) : null;
            if (!writesEntranceSide) {
                writeEntranceSide(popover, triggerRef.current, anchorBoxes);
            }
            isOpenRef.current = true;
            setIsOpen(true);
            onShow?.();
        }
    }, [
        anchorId,
        onShow,
        keepsAnchorClear,
        writesEntranceSide,
        lightDismiss,
        watchesOutsidePans,
        stopOutsidePanWatch,
        requestContextMount,
        applyDeferredWritingContext,
        showPopoverElement,
        isCurrentContextPopover,
        wasJustDismissed
    ]);
    // A wait for the trigger to get a layout box, started by a show() that
    // found none. Cancelled by the next show()/hide() or by
    // unmount, so a stale wait from a closed-then-reopened layer never fires
    // openNow() after the fact.
    const pendingAnchorWaitRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // The element that wait is observing, so a trigger swapped out underneath it
    // can restart the wait on the new element (see `contextRef`).
    const pendingAnchorElementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // The deferred restart `contextRef` queues after a trigger swap. Any
    // show()/hide() or a new wait supersedes it, so a layer that was hidden in
    // the same commit never reopens by itself.
    const pendingRestartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cancelPendingAnchorWait = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        pendingAnchorWaitRef.current?.();
        pendingAnchorWaitRef.current = null;
        pendingAnchorElementRef.current = null;
        if (pendingRestartRef.current) {
            pendingRestartRef.current.cancelled = true;
            pendingRestartRef.current = null;
        }
    }, []);
    // A wait that reached its end: nothing is pending any more, so a later
    // trigger swap must not restart it.
    const finishAnchorWait = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        pendingAnchorWaitRef.current = null;
        pendingAnchorElementRef.current = null;
    }, []);
    // A trigger with no layout box (no client rect) is not a valid CSS anchor. Opening against it now resolves the popover to
    // its fallback position (the viewport corner), and unlike a live layout
    // change, that resolution does not get revisited once the trigger later
    // gets a box: the popover is stuck there for the rest of this open.
    //
    // The concrete case this guards: a Dialog mounts its children before it
    // opens (`isOpen` gates only `showModal()`, not rendering), so a context
    // layer with `isDefaultOpen` or a controlled `isOpen={true}` inside one can
    // mount, and show() can run, while the trigger sits inside a `<dialog>`
    // that hasn't gone modal yet and so has no box. Anchor readiness lives here
    // rather than in each caller because this is the one place that already
    // owns the trigger element (`triggerRef`, set by `contextRef` below) and the
    // one place every context-mode show() funnels through.
    const show = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        cancelPendingAnchorWait();
        const anchor = mode === 'context' ? triggerRef.current : null;
        if (!anchor) {
            openNow();
            return;
        }
        if (isAnchorReady(anchor)) {
            // A trigger that already has a layout box is a valid anchor: open now, in the
            // same task as the interaction that asked, so a menu still opens on
            // press and not on the next frame. Only a trigger with no layout box has to wait.
            openNow();
            return;
        }
        // No layout engine to wait on (jsdom, an old browser): same fallback
        // sharedResizeObserver.ts uses for the same gap. Skip the wait rather than
        // throw, and open against whatever box is available now. A missing
        // `document.getAnimations` is the signal for "no real layout" here: jsdom
        // reports every box as 0x0 forever, so a ResizeObserver stub that never
        // fires would otherwise hold every layer closed.
        if (typeof ResizeObserver === 'undefined' || typeof document.getAnimations !== 'function') {
            openNow();
            return;
        }
        // The wait is driven by signals, never by polling. Any of them re-reads `isAnchorReady`; the first that
        // finds the anchor ready wins. None resolves against a boxless trigger, so
        // a layer whose container gains layout much later still ends up anchored,
        // not opened against a 0x0 box because a cap gave up first:
        //
        // - ResizeObserver: a block-level trigger gaining a box.
        // - IntersectionObserver: reports a `display: inline` trigger, which
        //   ResizeObserver never delivers an entry for, such as the wrapper
        //   `<span>` of a text-only Tooltip or HoverCard. It also fires
        //   when a hidden ancestor is displayed.
        // - The enclosing `<dialog>`'s `open` attribute and `toggle` event: the
        //   trigger can have a box before the dialog is modal (see
        //   `isAnchorReady`), and a popover-shown dialog never sets `open`.
        //
        // A ResizeObserver stub that fires synchronously (several component tests
        // use one) resolves exactly as fast as it always did. Environments with no
        // real layout ever are excluded before this point.
        const anchorElement = anchor;
        const dialog = anchor.closest('dialog');
        let cancelSettleWait = ()=>{};
        let resolved = false;
        // The shared observers hand back an unsubscribe for this
        // registration only, so the teardown does not touch other observers of the
        // same element.
        let stopResize = ()=>{};
        let stopMutations = ()=>{};
        const release = ()=>{
            stopResize();
            intersection?.disconnect();
            stopMutations();
            dialog?.removeEventListener('toggle', check);
        };
        const resolve = ()=>{
            resolved = true;
            release();
            // Once the box exists, a short settle wait lets an ancestor's running
            // entry animation finish before the layer anchors to it.
            cancelSettleWait = waitForAncestorAnimations(anchor, ()=>{
                finishAnchorWait();
                openNow();
            });
        };
        function check() {
            if (!resolved && isAnchorReady(anchorElement)) {
                resolve();
            }
        }
        const intersection = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(check);
        stopResize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedResizeObserver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["observeResize"])(anchor, check);
        if (!resolved) {
            intersection?.observe(anchor);
            if (dialog) {
                stopMutations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedMutationObserver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["observeMutations"])(dialog, {
                    attributes: true,
                    attributeFilter: [
                        'open'
                    ]
                }, check);
                dialog.addEventListener('toggle', check);
            }
        } else {
            // The registration itself resolved the wait before its unsubscribe
            // existed, so release it now.
            release();
        }
        pendingAnchorWaitRef.current = ()=>{
            resolved = true;
            release();
            cancelSettleWait();
        };
        pendingAnchorElementRef.current = anchor;
    }, [
        mode,
        openNow,
        cancelPendingAnchorWait,
        finishAnchorWait
    ]);
    const hide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        cancelAfterReleaseRef.current?.();
        cancelAfterReleaseRef.current = null;
        cancelPendingAnchorWait();
        pendingShowRef.current = false;
        if (isOpenRef.current) {
            const el = popoverRef.current;
            // A close that plays out after the layer is hidden starts here, while
            // the browser still shows it. The `beforetoggle` handler below starts
            // the browser's own hides.
            onCloseStartRef.current?.();
            // Clear the open state BEFORE hiding: hidePopover fires `toggle`, and
            // the reconciler below reads this ref to tell the browser's own
            // dismissals from ours.
            openedPopoverRef.current = null;
            isOpenRef.current = false;
            stopOutsidePanWatch();
            // See finding infra-4 note in `show`: mirror the same guard on hide so
            // unsupported browsers degrade gracefully instead of throwing.
            if (el) {
                if (typeof el.hidePopover === 'function') {
                    // Hiding hands focus back to the previously focused element while
                    // the browser still counts this popover as hiding; a layer that
                    // focus wakes (a tooltip on that element) defers its show until
                    // this returns.
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$popoverOperations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runPopoverOperation"])(el.ownerDocument, ()=>{
                        el.hidePopover();
                    });
                } else {
                    el.style.display = 'none';
                }
            }
            setIsOpen(false);
            onHide?.();
        }
        releaseAnchor(popoverRef.current);
        clearContextMount();
    }, [
        onHide,
        clearContextMount,
        releaseAnchor,
        cancelPendingAnchorWait,
        stopOutsidePanWatch,
        onCloseStartRef
    ]);
    // A deferred show() replays through a ref so the queued closure reaches the
    // current callback rather than the one captured when it was queued.
    const showRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(show);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useCommittedRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCommittedRefInto"])(showRef, show);
    // The open-state geometry observers of a layer that keeps its anchor clear
    // (`observeAnchorClearance`), as their teardown. The open-state layout
    // effect binds them; the trigger callback ref rebinds them when a caller
    // replaces the trigger element while the layer stays open.
    const clearObserversRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Stable ref for the trigger element (context mode only).
    //
    // A combined ref can call this ref with `null` and then with the same
    // element. Removing `anchor-name` in that gap strands an open layer at its
    // fallback position. So a `null` call removes the name one microtask later,
    // unless the same element attaches again first. A different element takes
    // over at once, and a `null` with nothing after it (an unmount) removes the
    // name.
    const contextRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((el)=>{
        if (!el) {
            const stale = triggerRef.current;
            if (!stale) {
                return;
            }
            const pending = {
                element: stale,
                cancelled: false
            };
            pendingTriggerDetachRef.current = pending;
            queueMicrotask(()=>{
                if (pending.cancelled || triggerRef.current !== stale) {
                    return;
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$anchorName$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeAnchorName"])(stale, anchorId);
                triggerRef.current = null;
                // A real unmount: stop waiting on an element that will never get a
                // box, and release the observers an open layer kept on it.
                if (pendingAnchorElementRef.current === stale) {
                    cancelPendingAnchorWait();
                }
                if (keepsAnchorClear && isOpenRef.current) {
                    clearObserversRef.current?.();
                    clearObserversRef.current = null;
                }
            });
            return;
        }
        // Reattaching the exact element a pending detach targeted: cancel it,
        // the churn never happened as far as the anchor name is concerned.
        if (pendingTriggerDetachRef.current?.element === el) {
            pendingTriggerDetachRef.current.cancelled = true;
            pendingTriggerDetachRef.current = null;
        }
        // Remove only THIS layer's anchor name from the previous element so
        // other layers sharing the same trigger keep their anchors.
        if (triggerRef.current && triggerRef.current !== el) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$anchorName$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeAnchorName"])(triggerRef.current, anchorId);
        }
        // Only a shown layer's trigger is an anchor. WebKit's Linux ports run the
        // transform animation of an element that holds an anchor on the main
        // thread. A busy task would then freeze a surface that moves around a
        // closed trigger.
        if (el && (isOpenRef.current || exitRef.current != null)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$anchorName$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addAnchorName"])(el, anchorId);
        }
        const previous = triggerRef.current;
        triggerRef.current = el;
        // A trigger replaced while the layer is open (React detaches the old
        // node with `null`, then attaches the new one): the old trigger's
        // observers are removed before the new trigger's are added, and
        // binding them reads the new trigger's geometry at once.
        if (keepsAnchorClear && isOpenRef.current && el !== previous) {
            clearObserversRef.current?.();
            clearObserversRef.current = null;
            const layer = popoverRef.current;
            if (layer) {
                clearObserversRef.current = observeAnchorClearance(layer, el, ()=>popoverRef.current === layer && triggerRef.current === el);
                keepAnchorClear(layer, el);
            }
        }
        // A show() is still waiting for a box on a different trigger: that wait
        // observes the element it started with, so it would never end for this
        // one. Restart it on the new trigger, after the commit that attached it.
        const waitingOn = pendingAnchorElementRef.current;
        if (waitingOn && waitingOn !== el) {
            cancelPendingAnchorWait();
            const restart = {
                cancelled: false
            };
            pendingRestartRef.current = restart;
            queueMicrotask(()=>{
                if (restart.cancelled) {
                    return;
                }
                pendingRestartRef.current = null;
                if (triggerRef.current === el && !isOpenRef.current) {
                    showRef.current();
                }
            });
        }
    }, [
        anchorId,
        cancelPendingAnchorWait,
        keepsAnchorClear
    ]);
    // Arm only when the dismissing gesture's click is still ahead of us. Some
    // engines deliver click first; in that order there is nothing left to absorb.
    const rememberDismissal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((doc)=>{
        forgetDismissalRef.current?.();
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$gestureCounter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["currentGestureHasClicked"])()) {
            return;
        }
        dismissedByGestureRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$gestureCounter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["currentGesture"])();
        dismissedTriggerRef.current = triggerRef.current;
        const view = doc.defaultView;
        let forgetTimer = null;
        const forget = ()=>{
            dismissedByGestureRef.current = null;
            dismissedTriggerRef.current = null;
            doc.removeEventListener('click', scheduleForget, true);
            if (forgetTimer !== null) {
                view?.clearTimeout(forgetTimer);
                forgetTimer = null;
            }
            if (forgetDismissalRef.current === forget) {
                forgetDismissalRef.current = null;
            }
        };
        const scheduleForget = ()=>{
            doc.removeEventListener('click', scheduleForget, true);
            // The next task keeps the dismissal armed through React's click handler.
            if (view) {
                forgetTimer = view.setTimeout(()=>{
                    forgetTimer = null;
                    if (forgetDismissalRef.current === forget) {
                        forget();
                    }
                }, 0);
            } else {
                forget();
            }
        };
        doc.addEventListener('click', scheduleForget, true);
        forgetDismissalRef.current = forget;
    }, []);
    // Syncs the document's capture-phase gesture tracking with this mount.
    // Unmount forgets the layer's dismissal, releases a pending anchor wait and
    // a show waiting for a release, and stops the outside-pan watch.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Install capture-phase gesture tracking before the first interaction.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$gestureCounter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["currentGesture"])();
        return ()=>{
            forgetDismissalRef.current?.();
            pendingAnchorWaitRef.current?.();
            cancelAfterReleaseRef.current?.();
            cancelAfterReleaseRef.current = null;
            stopOutsidePanWatch();
        };
    }, [
        stopOutsidePanWatch
    ]);
    // Reconcile browser-initiated closes (light-dismiss, popover="auto" stack
    // eviction). These are the only cases where the DOM mutates without going
    // through our show/hide — we sync React state back to match.
    //
    // No "open" case: the browser never spontaneously opens a popover. Opens
    // only happen via showPopover() which we always call from show().
    //
    // The isOpenRef guard prevents double-firing: when our hide() already set
    // the ref to false, the subsequent toggle event (which the browser fires
    // as a side-effect of hidePopover) sees false and skips.
    // A hide the browser runs itself (light dismiss, popover="auto" stack
    // eviction, an Escape its close watcher answers) never passes through
    // hide(), so the ledger of popover operations would not know the document
    // is mid-hide, and a layer that the hide's focus restore wakes would ask the
    // browser to show inside it. `beforetoggle` fires synchronously as such a
    // hide starts; the ledger counts the hide from there until the element's
    // own `toggle`, independent of this hook's bindings, which a render inside
    // the hide can replace.
    const handleBeforeToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        const toggleEvent = e;
        const el = e.currentTarget;
        if (toggleEvent.newState !== 'closed' || el == null) {
            return;
        }
        if (isOpenRef.current) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$popoverOperations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["observeBrowserHide"])(el);
            onCloseStartRef.current?.();
            browserHideRef.current = {
                popover: el,
                trigger: triggerRef.current,
                moved: false
            };
            // The browser's own close releases the name from its toggle event.
            return;
        }
        // Our hide drops its trigger's anchor name here, inside the hide, so the
        // hide's own layout covers the change. A name dropped after that layout
        // costs one more. A layer that the closed state keeps shown keeps the
        // name until its exit ends.
        const trigger = triggerRef.current;
        if (trigger != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$anchorName$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readAnchorNames"])(trigger).includes(anchorId) && !closeKeepsShownRef.current) {
            exitRef.current = null;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$anchorName$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeAnchorName"])(trigger, anchorId);
        }
    }, [
        anchorId,
        onCloseStartRef
    ]);
    const handleToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        const toggleEvent = e;
        const browserHide = browserHideRef.current;
        if (browserHide != null && browserHide.popover === e.currentTarget) {
            browserHideRef.current = null;
            // The layer moved to another trigger during the hide: it is open, and
            // the old trigger's close is not reported.
            if (browserHide.moved) {
                return;
            }
        }
        if (toggleEvent.newState === 'closed' && isOpenRef.current) {
            openedPopoverRef.current = null;
            isOpenRef.current = false;
            stopOutsidePanWatch();
            rememberDismissal(e.currentTarget?.ownerDocument ?? document);
            releaseAnchor(e.currentTarget);
            setIsOpen(false);
            onHide?.();
            clearContextMount();
        }
    }, [
        onHide,
        clearContextMount,
        rememberDismissal,
        releaseAnchor,
        stopOutsidePanWatch
    ]);
    // Ref callback for popover element — sets up the `toggle` listener.
    // Tracks the element + handler currently bound so the listener is removed
    // when the element detaches or when `handleToggle`'s identity changes (a new
    // `onHide` prop), preventing stale-closure listeners from accumulating on the
    // same element (infra-10).
    const listenedElRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const listenedHandlerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const bindToggleListener = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((el, handler)=>{
        if (listenedElRef.current && listenedHandlerRef.current && (listenedElRef.current !== el || listenedHandlerRef.current !== handler)) {
            listenedElRef.current.removeEventListener('toggle', listenedHandlerRef.current);
            listenedElRef.current.removeEventListener('beforetoggle', handleBeforeToggle);
            listenedElRef.current = null;
            listenedHandlerRef.current = null;
        }
        if (el && listenedElRef.current !== el) {
            el.addEventListener('toggle', handler);
            el.addEventListener('beforetoggle', handleBeforeToggle);
            listenedElRef.current = el;
            listenedHandlerRef.current = handler;
        }
    }, [
        handleBeforeToggle
    ]);
    // An anchored layer that would run under the software keyboard keeps its
    // block-start edge and ends clear of the keyboard.
    const { cap: keyboardCap, lift: keyboardLift, inset: keyboardInset, followLayerElement } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useLayerKeyboardClearance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useLayerKeyboardClearance"])(isOpen && mode === 'context', popoverRef);
    const popoverRefCallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((el)=>{
        popoverRef.current = el;
        bindToggleListener(el, handleToggle);
        if (el && pendingShowRef.current) {
            pendingShowRef.current = false;
            show();
        } else if (el && isOpenRef.current && openedPopoverRef.current !== el && isCurrentContextPopover(el)) {
            // Changing a portal target remounts the popover. Preserve the logical
            // open state without firing onShow again for the replacement element.
            // A show the browser refused during one of its own hides replays once
            // that hide has ended, for the element still mounted then. The
            // keyboard cap follows the replacement element too.
            followLayerElement();
            if (showPopoverElement(el)) {
                const anchorBoxes = keepsAnchorClear ? keepAnchorClear(el, triggerRef.current) : null;
                writeEntranceSide(el, triggerRef.current, anchorBoxes);
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$popoverOperations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["afterPopoverOperations"])(el.ownerDocument, ()=>{
                    const current = popoverRef.current;
                    if (isOpenRef.current && current === el && openedPopoverRef.current !== el && showPopoverElement(el)) {
                        const anchorBoxes = keepsAnchorClear ? keepAnchorClear(el, triggerRef.current) : null;
                        writeEntranceSide(el, triggerRef.current, anchorBoxes);
                    }
                });
            }
        }
    }, [
        handleToggle,
        bindToggleListener,
        show,
        showPopoverElement,
        isCurrentContextPopover,
        keepsAnchorClear,
        followLayerElement
    ]);
    const sentinelRefCallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((el)=>{
        sentinelRef.current = el;
        // A layer that keeps its mount re-resolves it too once it has one.
        if (el && (!lazyMount || pendingShowRef.current || isOpenRef.current || keepsMountAfterShow && contextMountRef.current != null)) {
            // The render call may have moved while the hook stayed mounted.
            // Resolve again from the newly attached marker rather than reusing a
            // portal target from its previous JSX position.
            requestContextMount();
        }
    }, [
        lazyMount,
        keepsMountAfterShow,
        requestContextMount
    ]);
    // Re-bind when the handler identity changes while the element stays mounted,
    // and detach on unmount.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (popoverRef.current) {
            bindToggleListener(popoverRef.current, handleToggle);
        }
        return ()=>{
            if (listenedElRef.current && listenedHandlerRef.current) {
                listenedElRef.current.removeEventListener('toggle', listenedHandlerRef.current);
                listenedElRef.current.removeEventListener('beforetoggle', handleBeforeToggle);
                listenedElRef.current = null;
                listenedHandlerRef.current = null;
            }
        };
    }, [
        handleToggle,
        bindToggleListener,
        handleBeforeToggle
    ]);
    // Anchor visibility (FR5). The first frame must already be right (FR8), so
    // the opening read is synchronous — a layout effect runs before paint, and a
    // state change inside it re-renders before paint — against the visual
    // viewport. IntersectionObserver then tracks changes while open; with no
    // root it reports against the viewport and through every ancestor clip, so
    // an anchor scrolled out of a panel reads as out of view too.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        if (!isOpen || mode !== 'context') {
            return;
        }
        const anchor = triggerRef.current;
        if (!anchor) {
            return;
        }
        const view = anchor.ownerDocument.defaultView;
        if (view) {
            // Edge-adjacent counts as in view, as IntersectionObserver reports it;
            // an engine with no layout (a zero rect) therefore reads as in view too.
            const rect = anchor.getBoundingClientRect();
            const inView = rect.bottom >= 0 && rect.right >= 0 && rect.top <= view.innerHeight && rect.left <= view.innerWidth;
            updateAnchorInView(inView);
        }
        if (typeof IntersectionObserver === 'undefined') {
            return;
        }
        const observer = new IntersectionObserver((entries)=>{
            const latest = entries[entries.length - 1];
            if (latest) {
                updateAnchorInView(latest.isIntersecting);
            }
        });
        observer.observe(anchor);
        return ()=>observer.disconnect();
    }, [
        isOpen,
        mode,
        updateAnchorInView
    ]);
    // A layer that keeps its anchor clear re-reads its geometry while it
    // is open: content that grows, an anchor that resizes or moves (in layout or
    // by a scroll) or a viewport resize can each re-settle the standard list over the anchor or
    // give the layer a scroll range (`observeAnchorClearance`). The external
    // systems are those browser observers and listeners; this effect binds them
    // while the layer is open and removes them when it closes, unmounts or is
    // remounted by a moved render call (`mountGeneration`). A trigger replaced
    // while open is rebound by the trigger callback ref, so no DOM node enters
    // state.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        if (!keepsAnchorClear || !isOpen || mode !== 'context') {
            return;
        }
        const layer = popoverRef.current;
        const anchor = triggerRef.current;
        if (!layer || !anchor) {
            return;
        }
        clearObserversRef.current?.();
        clearObserversRef.current = observeAnchorClearance(layer, anchor, ()=>popoverRef.current === layer && triggerRef.current === anchor);
        return ()=>{
            clearObserversRef.current?.();
            clearObserversRef.current = null;
        };
    }, [
        keepsAnchorClear,
        isOpen,
        mode,
        mountGeneration
    ]);
    // Render function for context mode
    const renderContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((children, props)=>{
        const { placement = 'above', alignment = 'center', positioning = 'anchor', offset, role, 'aria-label': ariaLabel, xstyle, className: extraClassName, style: extraStyle, as: Container = 'div', onMouseEnter, onMouseLeave } = props || {};
        // CSS anchor positioning (dynamic, not in StyleX)
        const standardFallbacks = getPositionTryFallbacks(placement, alignment);
        // An above or below layer that keeps its anchor clear uses one combined
        // list whose options never overlap the anchor (FR4).
        const clearFallbacks = keepsAnchorClear && positioning === 'anchor' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerSlideRules$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAnchorClearFallbacks"])(placement) : '';
        const anchorStyle = positioning === 'custom' ? // Consumer authors its own position styles via `style` — keep
        // only the anchor wiring, derive nothing from placement.
        {
            positionAnchor: anchorId
        } : {
            positionAnchor: anchorId,
            positionArea: getPositionArea(placement, alignment),
            positionTryFallbacks: clearFallbacks || standardFallbacks,
            ...clearFallbacks ? {
                alignSelf: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerSlideRules$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anchorClearAlignment"])(placement)
            } : {},
            ...getSelfAlignment(placement, alignment, isAnchorInView)
        };
        const clearance = offset ? toCssLength(offset) : null;
        const clearanceProperty = positioning === 'anchor' && clearance != null ? {
            [__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerSlideRules$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LAYER_CLEARANCE_PROPERTY"]]: clearance
        } : {};
        const offsetStyle = positioning !== 'anchor' ? null : clearance == null ? placement === 'above' ? styles.farAbove : placement === 'below' ? styles.farBelow : placement === 'start' ? styles.farStart : styles.farEnd : placement === 'above' ? styles.placementAbove(clearance) : placement === 'below' ? styles.placementBelow(clearance) : placement === 'start' ? styles.placementStart(clearance) : styles.placementEnd(clearance);
        const viewportStyles = positioning === 'anchor' ? [
            styles.viewportFit,
            ...getGutterStyles(placement, alignment)
        ] : null;
        const stylexResult = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerTextReset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layerTextReset"].reset, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerStructureReset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layerStructureReset"].reset, styles.base, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$overlayPaddingReset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["overlayPaddingReset"].reset, styles.keyboardCap(keyboardCap == null ? '100vh' : `${keyboardCap}px`, keyboardCap == null ? 'visible' : 'auto', keyboardInset == null ? 'initial' : `${keyboardInset}px`), keepsAnchorClear && styles.scrollsOnOverflow, viewportStyles, offsetStyle, xstyle);
        const combinedClassName = extraClassName ? `${extraClassName} ${stylexResult.className ?? ''}` : stylexResult.className;
        // The marker gives us the actual JSX parent without mounting arbitrary
        // children there. Safe positions preserve the existing DOM order and
        // cascade; unsafe positions use the nearest corrective portal target.
        // The slot renders the layer once the hook has resolved that mount.
        const renderLayer = (mount)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Container, {
                ref: popoverRefCallback,
                id: id,
                ...positioning === 'anchor' ? {
                    [__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerKeyboardClearance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LAYER_ANCHORED_ATTRIBUTE"]]: ''
                } : {},
                role: role,
                "aria-label": ariaLabel,
                popover: lightDismiss ? 'auto' : 'manual',
                className: combinedClassName,
                style: {
                    ...stylexResult.style,
                    ...anchorStyle,
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useLayerKeyboardClearance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["keyboardLiftStyle"])(keyboardLift),
                    ...clearanceProperty,
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerInset$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layerInsetProperties"])(declaredInset),
                    ...mount.portalStyle,
                    ...extraStyle
                },
                onMouseEnter: onMouseEnter,
                onMouseLeave: onMouseLeave,
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerClickBoundary$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layerClickBoundary"])(),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerContentBoundary"], {
                    children: children
                })
            });
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ContextLayerSlot, {
            mountStore: mountStore,
            renderLayer: renderLayer,
            sentinelRef: sentinelRefCallback
        });
    }, [
        anchorId,
        declaredInset,
        id,
        isAnchorInView,
        keepsAnchorClear,
        keyboardCap,
        keyboardInset,
        keyboardLift,
        lightDismiss,
        mountStore,
        popoverRefCallback,
        sentinelRefCallback
    ]);
    // Render function for fixed mode
    const renderFixed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((children, props)=>{
        const { x, y, xstyle, className: extraClassName, style: extraStyle } = props;
        // Dynamic position values
        const positionStyle = {
            top: y,
            left: x
        };
        const stylexResult = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerTextReset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layerTextReset"].reset, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerStructureReset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layerStructureReset"].reset, styles.base, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$overlayPaddingReset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["overlayPaddingReset"].reset, // A fixed layer is never capped; it still sets its own limit so it is
        // not clamped by a capped layer it sits in.
        styles.keyboardCap('100vh', 'visible', 'initial'), styles.fixed, xstyle);
        const combinedClassName = extraClassName ? `${extraClassName} ${stylexResult.className ?? ''}` : stylexResult.className;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
            ref: popoverRefCallback,
            id: id,
            popover: lightDismiss ? 'auto' : 'manual',
            className: combinedClassName,
            style: {
                ...stylexResult.style,
                ...positionStyle,
                ...extraStyle
            },
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerClickBoundary$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layerClickBoundary"])(),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LayerContentBoundary"], {
                children: children
            })
        });
    }, [
        popoverRefCallback,
        id,
        lightDismiss
    ]);
    const contextResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            ref: contextRef,
            anchorId,
            show,
            hide,
            isOpen,
            id,
            render: renderContext
        }), [
        contextRef,
        anchorId,
        show,
        hide,
        isOpen,
        id,
        renderContext
    ]);
    const fixedResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            ref: undefined,
            show,
            hide,
            isOpen,
            id,
            render: renderFixed
        }), [
        show,
        hide,
        isOpen,
        id,
        renderFixed
    ]);
    return mode === 'context' ? contextResult : fixedResult;
}
function useLayer(options) {
    return useLayerImplementation(options);
}
function useLayerInternal(options) {
    return useLayerImplementation(options);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/useLayerDismissal.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useKeyedLayerDismissal",
    ()=>useKeyedLayerDismissal,
    "useLayerDismissal",
    ()=>useLayerDismissal
]);
/**
 * @file useLayerDismissal.ts
 * @input Uses React hooks, the layer stack, and LayerDepthContext
 * @output Exports useLayerDismissal + its option/return types
 * @position The API overlays use to join the shared dismissal stack. Wraps
 *   layerStack (registration + the Escape listener on each layer's document)
 *   and reads nesting depth from LayerDepthContext.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Layer/index.ts
 * - /packages/core/src/Layer/useLayerDismissal.test.tsx
 * - /packages/core/src/Layer/layerStack.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$LayerDepthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/LayerDepthContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerStack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerStack.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
function useLayerDismissal(options) {
    return useKeyedLayerDismissal(options, null);
}
function useKeyedLayerDismissal(options, registrationKey) {
    const { isActive, onDismiss, escapeBehavior = 'close', getContainer, isPresent, isEnabled = true } = options;
    const depth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$LayerDepthContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayerDepth"])();
    // Identity remains stable while one active layer re-registers because its
    // depth or behavior changed. A later inactive -> active cycle gets a fresh
    // identity below so its registration order matches a newly shown top-layer
    // host rather than the component's original mount order.
    const tokenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    const wasRegisteredRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // The stack calls these during an event, outside React's render, so they must
    // reach the latest closures rather than the ones captured at registration.
    const onDismissRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(onDismiss);
    const getContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(getContainer);
    const isPresentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(isPresent);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        onDismissRef.current = onDismiss;
        getContainerRef.current = getContainer;
        isPresentRef.current = isPresent;
    });
    const isRegistered = isActive && isEnabled;
    // Syncs the shared dismissal stack with `isRegistered`. A registered layer
    // gets Escape and outside presses in stack order.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isRegistered) {
            wasRegisteredRef.current = false;
            return;
        }
        if (!wasRegisteredRef.current) {
            tokenRef.current = {};
            wasRegisteredRef.current = true;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerStack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerLayer"])({
            token: tokenRef.current,
            depth,
            behavior: escapeBehavior,
            getContainer: ()=>getContainerRef.current?.() ?? null,
            isPresent: ()=>isPresentRef.current?.() ?? true,
            dismiss: ()=>onDismissRef.current()
        });
    }, [
        isRegistered,
        depth,
        escapeBehavior,
        registrationKey
    ]);
    const shouldDismissOnCloseRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>isRegistered && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerStack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTextComposing"])() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerStack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTopmostLayer"])(tokenRef.current), [
        isRegistered
    ]);
    return {
        shouldDismissOnCloseRequest
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/useLayerKeyboardClearance.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LAYER_KEYBOARD_CAP_PROPERTY",
    ()=>LAYER_KEYBOARD_CAP_PROPERTY,
    "LAYER_KEYBOARD_INSET_PROPERTY",
    ()=>LAYER_KEYBOARD_INSET_PROPERTY,
    "LAYER_KEYBOARD_OVERFLOW_PROPERTY",
    ()=>LAYER_KEYBOARD_OVERFLOW_PROPERTY,
    "keyboardLiftStyle",
    ()=>keyboardLiftStyle,
    "useLayerKeyboardClearance",
    ()=>useLayerKeyboardClearance
]);
/**
 * @file useLayerKeyboardClearance.ts
 * @input Whether an anchor-mode layer is open, its element, and the keyboard
 *   module: its one height, and its layout guide for timing.
 * @output Exports `useLayerKeyboardClearance` and its result type,
 *   `keyboardLiftStyle`, `keyboardClearanceCap`, `LAYER_ANCHORED_ATTRIBUTE`,
 *   `LAYER_KEYBOARD_CAP_PROPERTY`, `LAYER_KEYBOARD_OVERFLOW_PROPERTY`,
 *   `LAYER_KEYBOARD_INSET_PROPERTY` and `LAYER_KEYBOARD_CLEARANCE_PX`
 * @position Layer runtime, through the layer's touch module: the software
 *   keyboard's part of the viewport caps
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Layer/layerKeyboardClearance.ts
 * - /packages/core/src/Layer/settledBox.ts
 * - /packages/core/src/Layer/useLayerKeyboardClearance.test.tsx
 * - /packages/core/src/Layer/layerViewportInset.stylex.ts
 * - /packages/core/src/Selector/hooks.ts
 * - /docs/specs/AST-059-layer-viewport-inset/spec.md
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsomorphicLayoutEffect.js [app-ssr] (ecmascript)");
// The keyboard module's own files, not its index. The index also re-exports
// BottomSheet's keyboard hook. An import through it would put that hook's
// on-demand code in every layered component.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardLayoutGuide$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/keyboard/keyboardLayoutGuide.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/keyboard/keyboardHeight.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$timing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/timing.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerKeyboardClearance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerKeyboardClearance.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$settledBox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/settledBox.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$browserClickWait$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/browserClickWait.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputStream.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$layoutViewport$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/layoutViewport.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
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
const LAYER_KEYBOARD_CAP_PROPERTY = '--_layer-keyboard-max-block-size';
const LAYER_KEYBOARD_OVERFLOW_PROPERTY = '--_layer-keyboard-overflow';
const LAYER_KEYBOARD_INSET_PROPERTY = '--_layer-keyboard-inset-block-end';
/**
 * Scrolls the nearest scroll container between `target` and `layer` the
 * least amount that shows `target` inside it.
 */ function keepInView(layer, target) {
    const view = layer.ownerDocument.defaultView;
    for(let box = target.parentElement; box != null; box = box === layer ? null : box.parentElement){
        const overflowY = view?.getComputedStyle(box).overflowY;
        if (box.scrollHeight > box.clientHeight + 1 && (overflowY === 'auto' || overflowY === 'scroll')) {
            const outer = box.getBoundingClientRect();
            const inner = target.getBoundingClientRect();
            if (inner.bottom > outer.bottom) {
                box.scrollTop += inner.bottom - outer.bottom;
            } else if (inner.top < outer.top) {
                box.scrollTop -= outer.top - inner.top;
            }
            return;
        }
    }
}
function keyboardLiftStyle(lift) {
    return lift == null ? null : {
        insetBlockStart: -lift,
        insetBlockEnd: lift
    };
}
function useLayerKeyboardClearance(isOpen, layerRef) {
    const [cap, setCap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lift, setLift] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [keyboardInset, setKeyboardInset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // The cap the layer renders with, read by the measurement between commits.
    const capRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const liftRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const keyboardInsetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Set while the layer is open: follows the runtime when it replaces the
    // layer element without closing it.
    const resyncRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Syncs the cap with the software keyboard's layout guide and with the
    // open layer's element.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        const initial = layerRef.current;
        const win = initial?.ownerDocument.defaultView;
        if (!isOpen || initial == null || win == null) {
            return;
        }
        // The window, for the hoisted press handlers below.
        const view = win;
        let isDisposed = false;
        const guide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardLayoutGuide$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getKeyboardLayoutGuide"])(win);
        // The element the cap and the press tracking are on. The runtime can
        // replace the layer element while it stays open; `sync` moves both to the
        // element the ref holds now.
        let layer = initial;
        // The field reveal after a cap stands down if a person's input reached
        // the layer since the cap.
        let personInputs = 0;
        const notePersonInput = ()=>{
            personInputs += 1;
        };
        const sync = ()=>{
            const next = layerRef.current;
            if (next == null || next === layer) {
                return false;
            }
            layer.removeEventListener('pointerdown', handlePress, true);
            layer.removeEventListener('touchstart', notePersonInput, {
                capture: true
            });
            layer.removeEventListener('wheel', notePersonInput, {
                capture: true
            });
            layer = next;
            layer.addEventListener('pointerdown', handlePress, true);
            layer.addEventListener('touchstart', notePersonInput, {
                capture: true,
                passive: true
            });
            layer.addEventListener('wheel', notePersonInput, {
                capture: true,
                passive: true
            });
            return true;
        };
        // Renders the layer with `next` and returns once that commit has laid it
        // out, so the measurement after it reads the new box. Runs outside
        // React's own work: keyboard reports, timers, frames and native events.
        const commitCap = (next, nextInset = keyboardInsetRef.current, nextLift = null)=>{
            if (isDisposed || capRef.current === next && keyboardInsetRef.current === nextInset && liftRef.current === nextLift) {
                return;
            }
            capRef.current = next;
            keyboardInsetRef.current = nextInset;
            liftRef.current = nextLift;
            // eslint-disable-next-line @eslint-react/dom-no-flush-sync -- the box is measured at its new size in the same task, before the frame paints
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flushSync"])(()=>{
                setCap(next);
                setKeyboardInset(nextInset);
                setLift(nextLift);
            });
            sync();
        };
        // Measured at the layer's own size, as the fallback order places it:
        // returns whether the layer is capped.
        const capFor = (inset)=>{
            // The inset goes out in the commit that lifts the cap. So a layer that
            // places itself by the inset has moved before its box is read. While
            // the layer stays open, the inset only grows. A keyboard that goes down
            // then leaves a layer placed by it where it is.
            const reported = inset > 0 ? inset + __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerKeyboardClearance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LAYER_KEYBOARD_CLEARANCE_PX"] : 0;
            const held = Math.max(reported, keyboardInsetRef.current ?? 0);
            commitCap(null, held > 0 ? held : null);
            if (inset <= 0) {
                return false;
            }
            // In layout px, the box's and the keyboard's units: WebKit reports
            // `innerHeight` in the pinch-zoomed visual viewport's px.
            const viewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$layoutViewport$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layoutViewportHeight"])(win);
            const box = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$settledBox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["settledBox"])(layer);
            const height = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerKeyboardClearance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyboardClearanceCap"])(box, viewport, inset);
            if (height == null) {
                return false;
            }
            commitCap(height);
            // A layer too tall for the room on both sides of its trigger sits over
            // the trigger, where the viewport fit shifted it. Shorter, it fits below
            // the trigger, and the fallback order moves it down. Lift it back, so it
            // keeps the block-start edge it had when the cap landed. A layer that
            // holds its block-end edge (placed above its trigger) moves only its
            // top, and is not lifted.
            const placed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$settledBox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["settledBox"])(layer);
            if (placed.top > box.top + 1 && Math.abs(placed.bottom - box.bottom) > 1) {
                commitCap(height, keyboardInsetRef.current, placed.top - box.top);
                // An engine that does not move the layer by the lift leaves it below
                // the trigger: cap it from where it starts there.
                const lifted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$settledBox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["settledBox"])(layer);
                if (Math.abs(lifted.top - box.top) > 1) {
                    commitCap(height);
                    const again = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerKeyboardClearance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyboardClearanceCap"])(placed, viewport, inset);
                    if (again != null) {
                        commitCap(again);
                    }
                }
            }
            // The cap holds the block-start edge: below its trigger the top stays
            // and the bottom comes up. Placed above its trigger the layer holds its
            // bottom instead, which a shorter box cannot lift: leave it as it is.
            const limit = viewport - inset - __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerKeyboardClearance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LAYER_KEYBOARD_CLEARANCE_PX"];
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$settledBox$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["settledBox"])(layer).bottom > limit + 1) {
                commitCap(null);
                return false;
            }
            return true;
        };
        const avoid = (inset)=>{
            sync();
            if (!layer.hasAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerKeyboardClearance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LAYER_ANCHORED_ATTRIBUTE"])) {
                commitCap(null, null);
                return;
            }
            if (!capFor(inset)) {
                return;
            }
            // The composing component makes its surface a scroll container once it
            // overflows. That comes a frame later, as its observer reports the
            // smaller box. Keep the field being typed into in view after that. A
            // person who presses, touches or turns a wheel in the layer by then has
            // placed its content, so the reveal stands down. A component's own
            // scroll, such as a list keeping its active option in view, does not
            // stop it. The next cap reveals the field again.
            const focused = layer.ownerDocument.activeElement;
            if (focused != null && focused !== layer && layer.contains(focused)) {
                const inputsAtCap = personInputs;
                win.requestAnimationFrame(()=>win.requestAnimationFrame(()=>{
                        if (!isDisposed && personInputs === inputsAtCap) {
                            keepInView(layer, focused);
                        }
                    }));
            }
        };
        let pending = null;
        const cancelPending = ()=>{
            if (pending != null) {
                win.clearTimeout(pending);
                pending = null;
            }
        };
        // A tap in the capped layer can blur the field it leaves (a button takes
        // focus on Android and in Chromium). The keyboard then starts down. The
        // full height must not come back between the tap's press and its click.
        // Otherwise the click lands on whatever moved under the finger. Such a
        // change waits for the browser's click after the lift (`awaitBrowserClick`).
        // The window's release subscriptions are held only while a press in the
        // layer is live.
        const pressed = new Set();
        let deferred = null;
        let stopWaiting = null;
        let stopFollowing = null;
        const follow = ()=>{
            const stops = [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'pointerup', handleRelease),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'pointercancel', handleRelease)
            ];
            stopFollowing = ()=>{
                for (const stop of stops){
                    stop();
                }
            };
        };
        const unfollow = ()=>{
            stopFollowing?.();
            stopFollowing = null;
        };
        const runDeferred = ()=>{
            stopWaiting?.();
            stopWaiting = null;
            pressed.clear();
            unfollow();
            const run = deferred;
            deferred = null;
            run?.();
        };
        function handlePress(event) {
            notePersonInput();
            if (pressed.size === 0) {
                follow();
            }
            pressed.add(event.pointerId);
        }
        function handleRelease(event) {
            if (!pressed.has(event.pointerId)) {
                return;
            }
            if (event.type === 'pointercancel') {
                runDeferred();
                return;
            }
            stopWaiting ??= (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$browserClickWait$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["awaitBrowserClick"])(layer, {
                onClicked: runDeferred,
                onNoClick: runDeferred
            });
        }
        layer.addEventListener('pointerdown', handlePress, true);
        layer.addEventListener('touchstart', notePersonInput, {
            capture: true,
            passive: true
        });
        layer.addEventListener('wheel', notePersonInput, {
            capture: true,
            passive: true
        });
        const unsubscribe = guide.subscribe((transition)=>{
            cancelPending();
            if (transition.animated && transition.to > transition.from) {
                // Rising: the keyboard covers the difference on its way up. A box's
                // height cannot change on the compositor, so the cap changes once,
                // when the keyboard arrives. Chrome draws Gboard's slide; Safari's
                // keyboard takes UIKit's notification duration.
                const arrival = transition.start + (guide.profile === 'chromium' && transition.curve != null ? transition.curve.durationMs : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$timing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["timing"].keyboardNotificationMs);
                pending = win.setTimeout(()=>{
                    pending = null;
                    avoid(transition.to);
                }, Math.max(0, arrival - win.performance.now()));
                return;
            }
            // Falling (it uncovers the full height as it goes) or at once; after
            // the click of a press in progress inside the layer.
            if (pressed.size > 0) {
                deferred = ()=>avoid(transition.to);
                return;
            }
            avoid(transition.to);
        });
        // Opened while a keyboard is up: capped in the task that opens it. So no
        // frame callback reads the layer uncapped, and no frame paints it so. The
        // runtime has shown the layer before this commit. A read here places it,
        // as the fallback order's read in the same task does. `flushSync` cannot
        // run inside a commit, so the cap runs in a microtask right after it.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getKeyboardHeight"])(win) > 0) {
            win.queueMicrotask(()=>{
                if (!isDisposed) {
                    avoid((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getKeyboardHeight"])(win));
                }
            });
        }
        // A layer element the runtime swaps in while the layer is open. The press
        // tracking moves to it in the commit that brings it. Its own box is read
        // in the next frame, before that frame paints: the runtime shows the new
        // element only after this call. Like a keyboard change, it waits for a
        // press in the layer to make its click. A rising keyboard's arrival reads
        // it instead.
        let swapped = null;
        resyncRef.current = ()=>{
            if (!sync() || swapped != null || (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getKeyboardHeight"])(win) <= 0) {
                return;
            }
            swapped = win.requestAnimationFrame(()=>{
                swapped = null;
                if (isDisposed || pending != null) {
                    return;
                }
                if (pressed.size > 0) {
                    deferred = ()=>avoid((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getKeyboardHeight"])(win));
                    return;
                }
                avoid((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getKeyboardHeight"])(win));
            });
        };
        return ()=>{
            isDisposed = true;
            resyncRef.current = null;
            if (swapped != null) {
                win.cancelAnimationFrame(swapped);
            }
            unsubscribe();
            cancelPending();
            stopWaiting?.();
            layer.removeEventListener('pointerdown', handlePress, true);
            layer.removeEventListener('touchstart', notePersonInput, {
                capture: true
            });
            layer.removeEventListener('wheel', notePersonInput, {
                capture: true
            });
            unfollow();
            // A closed layer reopens at its own size.
            if (capRef.current != null) {
                capRef.current = null;
                setCap(null);
            }
            if (liftRef.current != null) {
                liftRef.current = null;
                setLift(null);
            }
            if (keyboardInsetRef.current != null) {
                keyboardInsetRef.current = null;
                setKeyboardInset(null);
            }
        };
    }, [
        isOpen,
        layerRef
    ]);
    const followLayerElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        resyncRef.current?.();
    }, []);
    return {
        cap: isOpen ? cap : null,
        lift: isOpen ? lift : null,
        inset: isOpen ? keyboardInset : null,
        followLayerElement
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layer/useTouchTrigger.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TOUCH_POINTER_TYPES",
    ()=>TOUCH_POINTER_TYPES,
    "isActionTrigger",
    ()=>isActionTrigger,
    "tapLandsOnDisabledControl",
    ()=>tapLandsOnDisabledControl,
    "useTapRecognizer",
    ()=>useTapRecognizer,
    "useTapStop",
    ()=>useTapStop,
    "useTouchTrigger",
    ()=>useTouchTrigger,
    "useTouchTriggerInternal",
    ()=>useTouchTriggerInternal
]);
/**
 * @file useTouchTrigger.ts
 * @input Touch trigger mode, layer open state, trigger ref, show/hide callbacks
 * @output Exports useTouchTrigger hook, isActionTrigger, LayerTouchTrigger type,
 *   tapLandsOnDisabledControl, TOUCH_POINTER_TYPES, useTapRecognizer and
 *   useTapStop (internal:
 *   not re-exported from index). Also useTouchTriggerInternal, with the
 *   outside dismissal's arm for useTooltip's hold (Core-internal).
 * @position Layer hook; shared touch behavior for useTooltip and useHoverCard
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Layer/index.ts
 * - /packages/core/src/hooks/useClickableContainer.ts (innermostInteractive)
 *
 * Hover is the one trigger a touch screen cannot express. A tap synthesizes
 * `mouseenter`, so an untreated hover layer either opens on every tap and
 * lingers with nothing to close it, or swallows the tap the user aimed at the
 * control underneath.
 *
 * What the trigger DOES decides which of those the tap deserves. A trigger
 * that performs an action — a button, a link, a form control — keeps its tap:
 * the layer stays shut, because the tap already has somewhere to go and a hint
 * about a control the user just operated is noise. A trigger that performs no
 * action — an info icon, an abbreviation, a truncated label — has nothing to
 * lose, so the tap opens the layer and the next tap outside dismisses it. That
 * is `auto`; `tap` and `none` state the choice outright, which is what an
 * icon-button whose only job is to reveal the layer needs. An `aria-disabled`
 * control performs no action: a tap that lands in one, or on a label for a
 * disabled control, opens the layer, so its reason has a touch path. (A
 * natively `disabled` control receives no click at all.)
 *
 * A touch decides nothing until it is a tap. A finger landing on the trigger
 * may be starting a scroll, a pinch or a long press, and only the browser
 * knows which once the finger moves or lifts. Its `click` is that verdict (on
 * iOS it comes from UIKit's own tap recognizer), so the press only records
 * itself and the tap's `click` opens or closes the layer; a press the browser
 * takes for scrolling ends in `pointercancel` and never gets there. That is
 * how a UIKit tap behaves: it recognizes when the finger lifts and fails once
 * the scroll view claims the touch. The tap outside that closes a tap-opened
 * layer counts when the finger lifts too, or when a scroll takes the touch,
 * which is when UIKit dismisses a popover.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useCommittedRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useCommittedRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$gestureCounter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/gestureCounter.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$outsidePress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/outsidePress.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useClickableContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useClickableContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressDisabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/pressDisabled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/nodeType.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/keyboard/keyboardHeight.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionModality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/interactionModality.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
;
;
;
;
;
;
const TOUCH_POINTER_TYPES = new Set([
    'touch',
    'pen'
]);
function useTapRecognizer() {
    const [recognizer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(createTapRecognizer);
    // Releases a pending tap on unmount.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>()=>recognizer.forget(), [
        recognizer
    ]);
    return recognizer;
}
function createTapRecognizer() {
    let stopWaiting = null;
    let waitingGesture = null;
    const forget = ()=>{
        stopWaiting?.();
        stopWaiting = null;
    };
    return {
        press (event, trigger, onTap) {
            forget();
            if (!TOUCH_POINTER_TYPES.has(event.pointerType)) {
                return false;
            }
            if (trigger == null) {
                return true;
            }
            // The tap must belong to this press. A key press or a new pointer press
            // advances the gesture, so a keyboard activation that later fires
            // `click` on the trigger (Enter on a button) is not mistaken for it.
            const gesture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$gestureCounter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["currentGesture"])();
            waitingGesture = gesture;
            const stop = ()=>{
                trigger.removeEventListener('click', handleTap);
                trigger.removeEventListener('pointercancel', stop);
                if (stopWaiting === stop) {
                    stopWaiting = null;
                }
            };
            const handleTap = (tapEvent)=>{
                stop();
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$gestureCounter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["currentGesture"])() === gesture) {
                    onTap(tapEvent);
                }
            };
            trigger.addEventListener('click', handleTap);
            trigger.addEventListener('pointercancel', stop);
            stopWaiting = stop;
            return true;
        },
        forget,
        isTouchPressCurrent: ()=>stopWaiting != null && waitingGesture === (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$gestureCounter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["currentGesture"])()
    };
}
function useTapStop(event) {
    const pressIsTapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const onPointerDown = (pointer)=>{
        pressIsTapRef.current = TOUCH_POINTER_TYPES.has(pointer.pointerType);
    };
    const cancel = (mouse)=>{
        if (pressIsTapRef.current) {
            mouse.preventDefault();
        }
        pressIsTapRef.current = false;
    };
    return event === 'click' ? {
        onPointerDown,
        onClick: cancel
    } : {
        onPointerDown,
        onMouseDown: cancel
    };
}
/**
 * ARIA roles that make an element do something when activated. An explicit
 * role wins over the tag: `<button role="presentation">` is scenery, and a
 * `<span role="button">` is a real control.
 */ const ACTION_ROLES = new Set([
    'button',
    'checkbox',
    'combobox',
    'link',
    'menuitem',
    'menuitemcheckbox',
    'menuitemradio',
    'option',
    'radio',
    'searchbox',
    'slider',
    'spinbutton',
    'switch',
    'tab',
    'textbox'
]);
function isActionTrigger(element) {
    // A disabled control performs no action: its tap is free to open the layer
    // that explains why it is disabled.
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressDisabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDisabledControl"])(element)) {
        return false;
    }
    const role = element.getAttribute('role');
    if (role != null && role !== '') {
        return ACTION_ROLES.has(role);
    }
    switch(element.tagName){
        case 'LABEL':
            {
                // A label acts by operating its control, so a label for a disabled one
                // performs none.
                const control = element.control;
                return control == null || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressDisabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDisabledControl"])(control);
            }
        case 'BUTTON':
        case 'INPUT':
        case 'SELECT':
        case 'SUMMARY':
        case 'TEXTAREA':
            return true;
        case 'A':
        case 'AREA':
            return element.hasAttribute('href');
        default:
            return isEditable(element);
    }
}
/**
 * Whether this element takes a tap itself, as a disabled control does: an
 * `aria-disabled` (or `:disabled`) control, or a label for one.
 */ function isDisabledTarget(element) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressDisabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDisabledControl"])(element)) {
        return true;
    }
    if (element.tagName === 'LABEL') {
        const control = element.control;
        return control != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressDisabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDisabledControl"])(control);
    }
    return false;
}
function tapLandsOnDisabledControl(tapped) {
    const innermost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useClickableContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["innermostInteractive"])(tapped, null, (element)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useClickableContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["matchesInteractiveSelectors"])(element) || element.tagName === 'LABEL' || (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressDisabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isDisabledControl"])(element));
    return innermost != null && isDisabledTarget(innermost);
}
/**
 * Whether typing into this element edits it. Reads the attribute as well as
 * the property: jsdom does not implement `isContentEditable`, and an editor
 * that is an action in the browser must not be inert under test.
 */ function isEditable(element) {
    if (element.isContentEditable === true) {
        return true;
    }
    const attribute = element.getAttribute('contenteditable');
    return attribute != null && attribute !== 'false';
}
function useTouchTrigger(options) {
    const touch = useTouchTriggerInternal(options);
    return {
        isTouchPointerRef: touch.isTouchPointerRef,
        isTouchInteraction: touch.isTouchInteraction,
        handlePointerEnter: touch.handlePointerEnter,
        handlePointerDown: touch.handlePointerDown,
        clearTapOpen: touch.clearTapOpen
    };
}
function useTouchTriggerInternal(options, /**
 * Called when a press that the outside dismissal watches ends with its
 * pointer lifted inside the layer: the layer stays open, and useTooltip
 * ends a hold that the press started.
 */ onReleaseInLayer, /**
 * Whether a tap on a text-entry control inside the trigger only focuses
 * that control, so no tooltip covers text the person starts to type. Only
 * useTooltip passes it.
 */ isTextEntryTapIgnored = false) {
    const { touchTrigger, isEnabled, isControlled, isOpen, layerId, triggerRef, show, hide } = options;
    const isTouchPointerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // The committed values for the document listener, which outlives the render
    // that armed it.
    const hideRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useCommittedRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCommittedRef"])(hide);
    const layerIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useCommittedRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCommittedRef"])(layerId);
    const onReleaseInLayerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useCommittedRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCommittedRef"])(onReleaseInLayer);
    // Whether a tap is what opened the layer. Only a tap-open owes the user an
    // outside-tap dismissal: a hover-opened layer already closes on
    // pointer-leave, and a controlled one is not ours to close.
    const isTapOpenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const outsideListenerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // The documents the outside dismissal listens on: the page's, and the
    // trigger's own when it renders in another document, such as an iframe.
    const outsideDocumentsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const tapRecognizer = useTapRecognizer();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionModality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInteractionModalityTrackingFor"])(triggerRef);
    const disarmOutsideDismiss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        isTapOpenRef.current = false;
        const listener = outsideListenerRef.current;
        if (listener == null) {
            return;
        }
        outsideListenerRef.current = null;
        for (const doc of outsideDocumentsRef.current){
            doc.removeEventListener('pointerup', listener, true);
            doc.removeEventListener('pointercancel', listener, true);
        }
        outsideDocumentsRef.current = [];
    }, []);
    // Capture phase, so a trigger that stops propagation cannot strand an open
    // layer. It is armed by the opening tap's `click`, after that tap's own
    // `pointerup`, so the listener never sees the tap that opened the layer.
    // A tap outside counts when it lifts (`pointerup`); a scroll or pinch that
    // starts outside counts as soon as the browser takes it (`pointercancel`).
    const armOutsideDismiss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        isTapOpenRef.current = true;
        if (outsideListenerRef.current != null) {
            return;
        }
        const own = triggerRef.current?.ownerDocument ?? document;
        const docs = own === document ? [
            document
        ] : [
            document,
            own
        ];
        const handleOutsidePointerEnd = (event)=>{
            const target = event.target;
            if (target != null) {
                // A tap on the trigger is the trigger's to toggle. A scroll that
                // starts there is a scroll outside the layer, and it does close it.
                if (event.type === 'pointerup' && triggerRef.current?.contains(target) === true) {
                    return;
                }
                // Hover card content is interactive; a tap inside it is not a dismiss.
                if (docs.some((doc)=>doc.getElementById(layerIdRef.current)?.contains(target) === true)) {
                    if (event.type === 'pointerup') {
                        onReleaseInLayerRef.current?.();
                    }
                    return;
                }
            }
            disarmOutsideDismiss();
            if (target != null) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$outsidePress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["noteOutsideDismissal"])(target.ownerDocument ?? document);
            }
            hideRef.current();
        };
        outsideListenerRef.current = handleOutsidePointerEnd;
        outsideDocumentsRef.current = docs;
        for (const doc of docs){
            doc.addEventListener('pointerup', handleOutsidePointerEnd, true);
            doc.addEventListener('pointercancel', handleOutsidePointerEnd, true);
        }
    }, [
        triggerRef,
        disarmOutsideDismiss,
        hideRef,
        layerIdRef,
        onReleaseInLayerRef
    ]);
    // Releases the outside-dismiss listener on unmount.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>disarmOutsideDismiss, [
        disarmOutsideDismiss
    ]);
    const isTouchInteraction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>isTouchPointerRef.current && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionModality$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTextEntrySincePointer"])(triggerRef.current), [
        triggerRef
    ]);
    const handlePointerEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        // Only a finger is hoverless on arrival. A pen in detection range hovers
        // like a mouse, and treating its arrival as touch would bail out of the
        // hover path and leave a stylus user with no tooltip at all. A pen that
        // presses is a tap, and `handlePointerDown` still reads it as one.
        isTouchPointerRef.current = event.pointerType === 'touch';
    }, []);
    // A tap's `click` runs this after a commit. It reads that commit's props
    // through `answerTapRef`.
    const respondToTap = (tapEvent)=>{
        const trigger = triggerRef.current;
        const tapped = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(tapEvent?.target) ? tapEvent.target : null;
        // A disabled field keeps its reason's tap, and a trigger that is itself
        // a field keeps its own tap.
        if (isTextEntryTapIgnored && tapped != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(trigger)) {
            const field = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findTextEntryControl"])(tapped, trigger);
            if (field != null && field !== trigger && !tapLandsOnDisabledControl(tapped)) {
                return;
            }
        }
        // A tap that landed in a disabled control is that control's: its reason
        // opens. Every other tap is the trigger's to decide.
        const mode = touchTrigger === 'auto' ? tapped != null && tapLandsOnDisabledControl(tapped) ? 'tap' : trigger != null && isActionTrigger(trigger) ? 'none' : 'tap' : touchTrigger;
        if (mode === 'none' || !isEnabled) {
            // A layer left open by an earlier tap must not survive the next one.
            disarmOutsideDismiss();
            hide();
            return;
        }
        // A lazily mounted layer reports `isOpen` a tick after `show()`, so the
        // tap's own bookkeeping is what makes the second tap a close.
        if (isOpen || isTapOpenRef.current) {
            disarmOutsideDismiss();
            hide();
            return;
        }
        armOutsideDismiss();
        show();
    };
    const answerTapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useCommittedRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCommittedRef"])(respondToTap);
    const handlePointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        const isTouch = TOUCH_POINTER_TYPES.has(event.pointerType);
        isTouchPointerRef.current = isTouch;
        if (!isTouch || isControlled) {
            tapRecognizer.forget();
            return false;
        }
        const trigger = event.currentTarget instanceof Element ? event.currentTarget : triggerRef.current;
        tapRecognizer.press(event, trigger, (tapEvent)=>answerTapRef.current(tapEvent));
        return true;
    }, [
        isControlled,
        triggerRef,
        tapRecognizer,
        answerTapRef
    ]);
    // A layer closed by any other path (Escape, a consumer, the browser) leaves
    // no tap-open to dismiss. Only a true open→closed transition counts: a
    // lazily mounted layer still reports `false` for a tick after the tap asked
    // it to open, and reading that as a close would disarm the dismissal the
    // tap-open just armed.
    const wasOpenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(isOpen);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (wasOpenRef.current && !isOpen) {
            disarmOutsideDismiss();
        }
        wasOpenRef.current = isOpen;
    }, [
        isOpen,
        disarmOutsideDismiss
    ]);
    const answerTap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((tapEvent)=>answerTapRef.current(tapEvent), [
        answerTapRef
    ]);
    return {
        isTouchPointerRef,
        isTouchInteraction,
        handlePointerEnter,
        handlePointerDown,
        clearTapOpen: disarmOutsideDismiss,
        armOutsideDismiss,
        answerTap
    };
}
}),
];

//# sourceMappingURL=0aq__%40astryxdesign_core_dist_Layer_1ogtzo93qg0e-._.js.map