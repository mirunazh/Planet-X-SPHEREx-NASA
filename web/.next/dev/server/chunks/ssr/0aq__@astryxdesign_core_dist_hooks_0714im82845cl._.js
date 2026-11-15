module.exports = [
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/actionGroupTracker.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DISABLED_SELECTOR",
    ()=>DISABLED_SELECTOR,
    "createActionGroupTracker",
    ()=>createActionGroupTracker,
    "measureActions",
    ()=>measureActions,
    "onCenterLine",
    ()=>onCenterLine
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file actionGroupTracker.ts
 * @input The tracked elements, the action selector and hit expansion, the
 *   group's axis, and the press paint and the press controller's fade clock
 * @output createActionGroupTracker, ActionGroupTracker,
 *   ActionGroupTrackerOptions, ActionGroupTarget and measureActions (the
 *   actions the tracker tracks, measured). Also onCenterLine (where a finger
 *   counts in a one-axis group) and DISABLED_SELECTOR (the actions it skips)
 * @position Internal core tracker for a held finger that slides across a
 *   group of actions. Gesture recognizers drive it.
 *
 * SYNC: When modified, update actionGroupTracker.test.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$browserClickWait$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/browserClickWait.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/clickGuard.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputStream.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/pressFeedback.js [app-ssr] (ecmascript)");
;
;
;
;
const DISABLED_SELECTOR = ':disabled, [aria-disabled="true"]';
function measureActions(roots, itemSelector, isItem) {
    const targets = [];
    for (const root of roots){
        if (root == null) {
            continue;
        }
        for (const element of root.querySelectorAll(itemSelector)){
            if (element.matches(DISABLED_SELECTOR) || isItem?.(element) === false) {
                continue;
            }
            const { left, top, right, bottom } = element.getBoundingClientRect();
            targets.push({
                element,
                left,
                top,
                right,
                bottom
            });
        }
    }
    return targets;
}
/** A one-axis group's box, px, and the window whose keys can cancel. */ /** The box around every root, read once; null when no root is rendered. */ function measureBand(roots) {
    let band = null;
    for (const root of roots){
        if (root == null) {
            continue;
        }
        const rect = root.getBoundingClientRect();
        if (band == null) {
            band = {
                left: rect.left,
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
                view: root.ownerDocument.defaultView
            };
        } else {
            band.left = Math.min(band.left, rect.left);
            band.top = Math.min(band.top, rect.top);
            band.right = Math.max(band.right, rect.right);
            band.bottom = Math.max(band.bottom, rect.bottom);
        }
    }
    return band;
}
function onCenterLine(band, axis, x, y) {
    const clamp = (value, low, high)=>Math.min(Math.max(value, low), high);
    return axis === 'x' ? [
        clamp(x, band.left, band.right),
        (band.top + band.bottom) / 2
    ] : [
        (band.left + band.right) / 2,
        clamp(y, band.top, band.bottom)
    ];
}
function createActionGroupTracker(getOptions) {
    let actions = [];
    let highlighted = null;
    let beganOn = null;
    let landedOn = null;
    let isTracking = false;
    let isInert = false;
    // The finger's last position: `remeasure` resolves it again.
    let lastX = 0;
    let lastY = 0;
    const fades = new Map();
    // A one-axis group's box, read at the begin: the finger counts inside it.
    let band = null;
    let stopEscape = null;
    const paints = (element)=>{
        const option = getOptions().paintsHighlight;
        return typeof option === 'function' ? option(element) : option !== false;
    };
    const clearFade = (element)=>{
        const fade = fades.get(element);
        if (fade != null) {
            clearTimeout(fade);
            fades.delete(element);
        }
    };
    const paint = (element)=>{
        if (!paints(element)) {
            return;
        }
        clearFade(element);
        element.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESSED_ATTRIBUTE"], 'on');
    };
    const cut = (element)=>{
        if (!paints(element)) {
            return;
        }
        clearFade(element);
        element.removeAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESSED_ATTRIBUTE"]);
    };
    const release = (element)=>{
        if (!paints(element)) {
            return;
        }
        clearFade(element);
        element.setAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESSED_ATTRIBUTE"], 'fading');
        // The stylesheet's release follows the theme's tempo, so the fade ends on
        // the press controller's clock.
        fades.set(element, setTimeout(()=>{
            fades.delete(element);
            if (element.getAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESSED_ATTRIBUTE"]) === 'fading') {
                element.removeAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESSED_ATTRIBUTE"]);
            }
        }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressFadeMs"])(element)));
    };
    const highlight = (next)=>{
        if (next === highlighted) {
            return;
        }
        const previous = highlighted;
        if (previous != null) {
            cut(previous);
        }
        highlighted = next;
        if (next != null) {
            paint(next);
        }
        getOptions().onHighlightChange?.(next, previous);
    };
    const measure = ()=>{
        const { roots, itemSelector, isItem } = getOptions();
        return measureActions(roots(), itemSelector, isItem);
    };
    const actionAt = (fingerX, fingerY)=>{
        const { resolveTarget, highlightExpansion: margin, tracksAlong } = getOptions();
        const [x, y] = band == null || tracksAlong == null ? [
            fingerX,
            fingerY
        ] : onCenterLine(band, tracksAlong, fingerX, fingerY);
        if (resolveTarget != null) {
            return actions.length === 0 ? null : resolveTarget(x, y, actions);
        }
        // Rects that share an edge, or that have no layout (a test renderer), can
        // both hold the point: the one the press landed on wins.
        let first = null;
        for (const action of actions){
            if (x >= action.left - margin && x <= action.right + margin && y >= action.top - margin && y <= action.bottom + margin) {
                if (landedOn != null && action.element.contains(landedOn)) {
                    return action.element;
                }
                first ??= action.element;
            }
        }
        return first;
    };
    const reset = ()=>{
        actions = [];
        highlighted = null;
        beganOn = null;
        landedOn = null;
        isTracking = false;
        isInert = false;
        band = null;
        stopEscape?.();
        stopEscape = null;
    };
    const cancel = ()=>{
        const current = highlighted;
        const wasTracking = isTracking;
        reset();
        if (current != null) {
            cut(current);
            if (wasTracking) {
                getOptions().onHighlightChange?.(null, current);
            }
        }
    };
    // Escape takes back a press in a one-axis group, where no slide-off can.
    const listenForEscape = (view)=>{
        if (view == null) {
            return;
        }
        // The key is handled, so a dialog around the group stays open.
        stopEscape = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'keydown', (event)=>{
            if (event.key === 'Escape' && isTracking) {
                event.preventDefault();
                cancel();
                getOptions().onCancel?.();
            }
        }, {
            cancels: true
        });
    };
    return {
        begin (x, y, { inert = false, landed = null } = {}) {
            // A press can begin while another is tracked, when a second recognizer
            // takes over the finger (a trigger's held press, then the menu's): the
            // action the first one lit loses its paint.
            const previous = highlighted;
            if (previous != null) {
                cut(previous);
            }
            stopEscape?.();
            stopEscape = null;
            // An inert press tracks no action: nothing to paint, nothing to run.
            actions = inert ? [] : measure();
            const { roots, tracksAlong } = getOptions();
            band = inert || tracksAlong == null ? null : measureBand(roots());
            if (band != null) {
                listenForEscape(band.view);
            }
            highlighted = null;
            isTracking = true;
            isInert = inert;
            landedOn = landed;
            lastX = x;
            lastY = y;
            getOptions().onMove?.(x, y);
            const target = actionAt(x, y);
            beganOn = target;
            if (target != null) {
                highlighted = target;
                paint(target);
            }
            if (target !== previous) {
                getOptions().onHighlightChange?.(target, previous);
            }
        },
        move (x, y) {
            if (!isTracking) {
                return;
            }
            lastX = x;
            lastY = y;
            getOptions().onMove?.(x, y);
            highlight(actionAt(x, y));
        },
        end () {
            const lifted = highlighted;
            const wasTracking = isTracking;
            reset();
            if (!wasTracking || lifted == null) {
                return null;
            }
            release(lifted);
            if (lifted.matches(DISABLED_SELECTOR)) {
                return null;
            }
            const { onActivate, onActivated, swallowsNativeClick } = getOptions();
            if (onActivate != null) {
                onActivate(lifted);
                if (swallowsNativeClick === true) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["armClickGuard"])(lifted.ownerDocument);
                }
            } else {
                const cancelled = swallowsNativeClick === true ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$browserClickWait$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clickForLift"])(lifted) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$browserClickWait$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clickAndReport"])(lifted);
                onActivated?.(lifted, cancelled);
            }
            return lifted;
        },
        cancel,
        offsetBy (dx, dy) {
            for (const box of band == null ? actions : [
                ...actions,
                band
            ]){
                box.left += dx;
                box.right += dx;
                box.top += dy;
                box.bottom += dy;
            }
        },
        remeasure () {
            if (!isTracking || isInert) {
                return;
            }
            actions = measure();
            if (band != null) {
                band = measureBand(getOptions().roots()) ?? band;
            }
            highlight(actionAt(lastX, lastY));
        },
        get highlighted () {
            return highlighted;
        },
        get beganOn () {
            return beganOn;
        },
        get isTracking () {
            return isTracking;
        },
        dispose () {
            for (const [element, fade] of fades){
                clearTimeout(fade);
                if (element.getAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESSED_ATTRIBUTE"]) === 'fading') {
                    element.removeAttribute(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESSED_ATTRIBUTE"]);
                }
            }
            fades.clear();
            reset();
        }
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/anchoredHint.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "anchoredHintStyles",
    ()=>anchoredHintStyles,
    "renderAnchoredHint",
    ()=>renderAnchoredHint
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
const styles = {
    hint: {
        kVAEAm: "xixxii4",
        kpwlN0: "x1anvkwx",
        kogj98: "x1ghz6dp",
        kMzoRj: "xc342km",
        ksu8eU: "xng3xce",
        kWkggS: "x1prclbq",
        kaIpWk: "xh6dtrn",
        kGVxlE: "x1i5ehqx",
        kLKAdn: "xfsso4q",
        kGO01o: "xy143xn",
        kZCmMZ: "x12gdq22",
        kwRFfy: "x1djylfy",
        kGuDYH: "x141an7d",
        kLWn49: "x1ltkj2j",
        kMwMTN: "xv1l7n4",
        khDVqt: "xuxw1ft",
        kSiTet: "xg01cxk xofkqq2",
        k1ekBW: "xsm4mo9",
        kIyJzY: "xx6bhzk",
        kzIqYQ: "xd00j3c",
        $$css: true
    },
    passive: {
        kfzvcC: "x47corl",
        $$css: true
    },
    keys: {
        k1xSpc: "x3nfvp2",
        kGNEyG: "x6s0dn4",
        kOIVth: "xzye2dw",
        $$css: true
    },
    label: {
        keTefX: "x11g1kdw",
        $$css: true
    }
};
const anchoredHintStyles = {
    keys: styles.keys,
    label: styles.label
};
function renderAnchoredHint(layer, content, { isInteractive = false } = {}) {
    return layer.render(content, {
        placement: 'below',
        alignment: 'start',
        xstyle: [
            styles.hint,
            !isInteractive && styles.passive
        ],
        style: {
            marginBlockStart: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spacingVars"]['--spacing-2']
        }
    });
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/focusableSelector.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file focusableSelector.ts
 * @input None (a plain CSS selector string constant)
 * @output Exports FOCUSABLE_SELECTOR, isDisabledWithin and preferTabStops
 * @position Internal utility; the canonical CSS selector for focusable
 *   elements, shared by focus-management hooks (e.g. useFocusTrap) so the
 *   selector isn't duplicated across components/hooks. Not exported from the
 *   public barrel — internal implementation detail.
 */ /**
 * Canonical CSS selector for commonly focusable elements. Includes the
 * tabbable natives (button/link/input/select/textarea/[tabindex]) plus
 * editable and media elements the browser also puts in the tab order —
 * contenteditable, media with controls, iframe, and an open <details>'s
 * <summary> — which a naive selector misses, letting Tab escape a trap whose
 * only interactive content is (e.g.) a contenteditable composer (infra-8).
 *
 * This is the canonical focusable selector; prefer importing it here over
 * re-declaring the string so behavior stays consistent across hooks.
 */ __turbopack_context__.s([
    "FOCUSABLE_SELECTOR",
    ()=>FOCUSABLE_SELECTOR,
    "isDisabledWithin",
    ()=>isDisabledWithin,
    "preferTabStops",
    ()=>preferTabStops
]);
const FOCUSABLE_SELECTOR = 'button:not([disabled]), a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), [contenteditable]:not([contenteditable="false"]), audio[controls], video[controls], iframe, details > summary:first-child';
function isDisabledWithin(element, container) {
    const disabled = element.closest('[aria-disabled="true"]');
    return disabled != null && container.contains(disabled);
}
function preferTabStops(elements) {
    // A browser's querySelectorAll returns document order. jsdom can group a
    // selector list's matches by selector. Sort them here.
    const inDocumentOrder = [
        ...elements
    ].sort((a, b)=>a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
    const isTabStop = (element)=>element.getAttribute('tabindex') !== '-1';
    return [
        ...inDocumentOrder.filter(isTabStop),
        ...inDocumentOrder.filter((element)=>!isTabStop(element))
    ];
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/isRtlElement.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isRtlElement",
    ()=>isRtlElement
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
function isRtlElement(el) {
    if ("TURBOPACK compile-time truthy", 1) {
        return false;
    }
    //TURBOPACK unreachable
    ;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/menuPressMarker.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file menuPressMarker.ts
 * @input None (a plain attribute-name constant)
 * @output Exports MENU_PRESS_MARKER
 * @position Dependency-free home of the public menu-press marker, so the press
 *   feedback controller (utils/pressFeedback.ts) can read it without loading
 *   the menu-press hook into every pressable component's bundle.
 *   useMenuPress.ts re-exports it; the public path stays
 *   `@astryxdesign/core/hooks`.
 */ /** Marks a menu root that carries the menu press model (useMenuPress). */ __turbopack_context__.s([
    "MENU_PRESS_MARKER",
    ()=>MENU_PRESS_MARKER
]);
const MENU_PRESS_MARKER = 'data-astryx-menu-press';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/pressGroupContext.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PressGroupBandContext",
    ()=>PressGroupBandContext,
    "PressGroupContext",
    ()=>PressGroupContext
]);
/**
 * @file pressGroupContext.ts
 * @input The layer-scoped context factory (Layer/layerScopedContext) and
 *   the press-group marker (privateAttributes/pressGroupItem.stylex)
 * @output PressGroupContext: the pointer types a group's own tracker follows
 *   on its actions, or null outside one. PressGroupBandContext: whether the
 *   group draws an action's touch band. pressGroupItemProps: the marker Button
 *   writes
 * @position Internal; not exported from the hooks entry. Groups that track
 *   presses provide it, and Button reads it. A layer resets it, so a Button
 *   in a member's layer is not tracked.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-ssr] (ecmascript)");
// Button reads the marker here, not from its private StyleX module: a
// swizzled Button imports each StyleX module by its public path.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressGroupItem$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/pressGroupItem.stylex.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const PressGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('PressGroupContext', 1, null);
PressGroupContext.displayName = 'PressGroupContext';
const PressGroupBandContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('PressGroupBandContext', 1, false);
PressGroupBandContext.displayName = 'PressGroupBandContext';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useAnnounce.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModalAnnounceContext",
    ()=>ModalAnnounceContext,
    "__resetLiveRegionsForTest",
    ()=>__resetLiveRegionsForTest,
    "announceInModal",
    ()=>announceInModal,
    "announceMessage",
    ()=>announceMessage,
    "clearModalRegion",
    ()=>clearModalRegion,
    "clearRegion",
    ()=>clearRegion,
    "enclosingModalDialog",
    ()=>enclosingModalDialog,
    "forwardWaiting",
    ()=>forwardWaiting,
    "handleOf",
    ()=>handleOf,
    "installModalRoute",
    ()=>installModalRoute,
    "isOpenModal",
    ()=>isOpenModal,
    "modalRegion",
    ()=>modalRegion,
    "takeJoinedAnnouncement",
    ()=>takeJoinedAnnouncement,
    "unexposedMessages",
    ()=>unexposedMessages,
    "unexposedWords",
    ()=>unexposedWords,
    "useAnnounce",
    ()=>useAnnounce,
    "withdrawPendingAnnouncement",
    ()=>withdrawPendingAnnouncement,
    "writeModalRegion",
    ()=>writeModalRegion
]);
/**
 * @file useAnnounce.ts
 * @input React context; DOM live regions; animation frames
 * @output useAnnounce, AnnouncePoliteness, UseAnnounceOptions; the internal
 *   modal context, in-dialog region writer, and modal route hook
 * @position Core a11y hook for screen-reader announcements. A message goes to
 *   the nearest open native modal around its caller, else to the shared
 *   page-body regions. `modalAnnounce.ts` holds the modal route.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/hooks/index.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
function handleOf(receipt) {
    return ()=>{
        const withdraw = receipt.withdraw;
        receipt.withdraw = null;
        withdraw?.();
    };
}
function forwardWaiting(waiting, deliver) {
    for (const { text, receipts } of waiting){
        for (const receipt of receipts){
            receipt.withdraw = deliver(text);
        }
    }
}
const CONTAINER_ATTR = 'data-astryx-live-region';
// The same clip as VisuallyHidden. It is inline, so the regions work without
// a stylesheet.
const VISUALLY_HIDDEN_CSS = 'position:absolute;width:1px;height:1px;margin:-1px;padding:0;' + 'overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;' + 'inset-block-start:0;inset-inline-start:0;pointer-events:none;' + 'user-select:none;';
/**
 * Screen readers need this time to read the message. The clear then keeps
 * stale status text out of the accessibility tree.
 */ const CLEAR_DELAY_MS = 2000;
// The announcement channel's state. Every copy of Core on the page uses this
// one channel, so a swizzled component and the package write to the same pair
// of live regions and join the same frame of messages.
const channel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedState"])('hooks/use-announce/channel', 1, ()=>{
    const clearTimers = {
        polite: null,
        assertive: null
    };
    // Messages written before the region exposes them wait here. One frame
    // exposes them together and in order, so none is dropped. An identical
    // repeat is kept once.
    const pendingFrames = {
        polite: null,
        assertive: null
    };
    const pendingMessages = {
        polite: [],
        assertive: []
    };
    return {
        clearTimers,
        pendingFrames,
        pendingMessages,
        // The pending message the latest announce joined, until its announcer
        // takes it.
        lastJoined: null,
        // The live regions are created once and stay mounted (see getRegions).
        regions: null,
        modalRoute: null
    };
});
function cancelScheduledClear(politeness) {
    const timer = channel.clearTimers[politeness];
    if (timer != null) {
        clearTimeout(timer);
        channel.clearTimers[politeness] = null;
    }
}
// Each pending message counts its waiting announcers. When one withdraws it
// (a busy start overtaken by its outcome), the message stays for the others.
function cancelPendingFrames(politeness) {
    const frame = channel.pendingFrames[politeness];
    if (frame != null) {
        cancelAnimationFrame(frame);
        channel.pendingFrames[politeness] = null;
    }
    channel.pendingMessages[politeness] = [];
}
function scheduleClear(politeness, target) {
    cancelScheduledClear(politeness);
    channel.clearTimers[politeness] = setTimeout(()=>{
        channel.clearTimers[politeness] = null;
        target.textContent = '';
    }, CLEAR_DELAY_MS);
}
// The live regions are created once and stay mounted. Many screen readers do
// not announce a live region that is created with its content. They do
// announce a text change in an empty region that is already mounted.
function createRegion(politeness) {
    const el = document.createElement('div');
    el.setAttribute(CONTAINER_ATTR, politeness);
    el.setAttribute('aria-live', politeness);
    el.setAttribute('aria-atomic', 'true');
    el.setAttribute('role', politeness === 'assertive' ? 'alert' : 'status');
    el.style.cssText = VISUALLY_HIDDEN_CSS;
    document.body.appendChild(el);
    return el;
}
function getRegions() {
    if (typeof document === 'undefined') {
        return null;
    }
    if (channel.regions) {
        // A test cleanup can remove a region from the DOM. Attach it again.
        if (!channel.regions.polite.isConnected) {
            document.body.appendChild(channel.regions.polite);
        }
        if (!channel.regions.assertive.isConnected) {
            document.body.appendChild(channel.regions.assertive);
        }
        return channel.regions;
    }
    channel.regions = {
        polite: createRegion('polite'),
        assertive: createRegion('assertive')
    };
    return channel.regions;
}
function announceMessage(message, politeness) {
    const r = getRegions();
    if (!r) {
        return null;
    }
    const target = politeness === 'assertive' ? r.assertive : r.polite;
    const repeat = channel.pendingMessages[politeness].find((pending)=>pending.text === message);
    if (repeat != null) {
        repeat.holders += 1;
        channel.lastJoined = repeat;
        return ()=>withdrawPendingAnnouncement(repeat, politeness);
    }
    const pending = {
        text: message,
        holders: 1
    };
    channel.pendingMessages[politeness].push(pending);
    channel.lastJoined = pending;
    if (channel.pendingFrames[politeness] == null) {
        // Clear first, so the change is seen when the new text equals the old
        // text. Some assistive technology ignores identical content.
        target.textContent = '';
        // Some assistive technology merges an immediate re-set with the clear. A
        // re-set in the next frame is more reliable.
        channel.pendingFrames[politeness] = requestAnimationFrame(()=>{
            channel.pendingFrames[politeness] = null;
            target.textContent = channel.pendingMessages[politeness].map((pending)=>pending.text).join(' ');
            channel.pendingMessages[politeness] = [];
        });
    }
    // The clear keeps the last message out of the accessibility tree. Each
    // announce restarts the delay, which is much longer than the frame re-set.
    scheduleClear(politeness, target);
    return ()=>withdrawPendingAnnouncement(pending, politeness);
}
function clearRegion(politeness) {
    cancelPendingFrames(politeness);
    cancelScheduledClear(politeness);
    if (!channel.regions) {
        return;
    }
    const target = politeness === 'assertive' ? channel.regions.assertive : channel.regions.polite;
    target.textContent = '';
}
function useAnnounce({ hasReplace = false } = {}) {
    const modal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(ModalAnnounceContext);
    // The latest write of a `hasReplace` instance. Its next message withdraws
    // it if assistive technology has not had it yet.
    const withdrawPreviousRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message, politeness = 'polite')=>{
        if (hasReplace) {
            const withdrawPrevious = withdrawPreviousRef.current;
            withdrawPreviousRef.current = null;
            withdrawPrevious?.();
        }
        let written;
        // `modal` is non-null only below a provider, and a provider loads the
        // route. The route decides where the caller is heard.
        if (modal != null && channel.modalRoute != null) {
            written = channel.modalRoute.announce(modal, message, politeness);
        } else if (!message) {
            // An empty message clears the region, with the messages that are
            // not yet exposed.
            clearRegion(politeness);
            written = null;
        } else {
            written = announceMessage(message, politeness);
        }
        if (hasReplace) {
            withdrawPreviousRef.current = written;
        }
    }, [
        hasReplace,
        modal
    ]);
}
// Inside an Astryx modal (AST-086 FR14)
//
// The modal route lives in `modalAnnounce.ts`. ModalAnnounceProvider imports
// it, and it installs itself here when it loads. A component that calls
// `useAnnounce` but renders no modal never loads it. This module keeps what a
// caller without an Astryx modal needs: the region writer for a native modal
// that an app renders, and the DOM walk that finds that modal.
const MODAL_REGION_ATTR = 'data-astryx-modal-live-region';
const ModalAnnounceContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSharedContext"])('ModalAnnounceContext', 1, null);
ModalAnnounceContext.displayName = 'ModalAnnounceContext';
function installModalRoute(route) {
    channel.modalRoute = route;
}
function isOpenModal(dialog) {
    return dialog != null && dialog.open && dialog.matches(':modal');
}
function enclosingModalDialog(element) {
    let dialog = element?.closest('dialog') ?? null;
    while(dialog != null){
        if (isOpenModal(dialog)) {
            return dialog;
        }
        dialog = dialog.parentElement?.closest('dialog') ?? null;
    }
    return null;
}
function announceInModal(dialog, message, politeness = 'polite') {
    if (channel.modalRoute != null) {
        return channel.modalRoute.announceInModal(dialog, message, politeness);
    }
    if (isOpenModal(dialog)) {
        return writeModalRegion(dialog, message, politeness);
    }
    return announceMessage(message, politeness);
}
/** What the route asks of the writer in the write frame. @internal */ // The pending state of each in-dialog region: the messages written since its
// text was last exposed, the frame that exposes them, the next frame, and the
// clear timer. Assistive technology does not take text in the frame that sets
// it. So a message that arrives before the next frame joins the words.
const pendingByRegion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedWeakMap"])('hooks/use-announce/pending-by-region', 1);
function cancelPending(pending) {
    if (pending.frame != null) {
        cancelAnimationFrame(pending.frame);
    }
    if (pending.settleFrame != null) {
        cancelAnimationFrame(pending.settleFrame);
    }
    if (pending.timer != null) {
        clearTimeout(pending.timer);
    }
}
function unexposedMessages(target) {
    return unexposedWords(target).map((words)=>words.text);
}
function waitingIn(pending) {
    return pending.messages.map((text)=>({
            text,
            receipts: pending.receipts.get(text) ?? []
        }));
}
function unexposedWords(target) {
    const pending = pendingByRegion.get(target);
    if (pending == null) {
        return [];
    }
    return pending.frame != null || pending.settleFrame != null ? waitingIn(pending) : [];
}
function modalRegion(dialog, politeness) {
    return dialog.querySelector(`:scope > [${MODAL_REGION_ATTR}="${politeness}"]`);
}
/**
 * The dialog's own live region for one urgency, created empty on first use
 * and kept as a direct child of the dialog so it survives the dialog's
 * content re-rendering.
 */ function ensureModalRegion(dialog, politeness) {
    let region = modalRegion(dialog, politeness);
    if (region == null) {
        region = document.createElement('div');
        region.setAttribute(MODAL_REGION_ATTR, politeness);
        region.setAttribute('role', politeness === 'assertive' ? 'alert' : 'status');
        region.setAttribute('aria-live', politeness);
        region.setAttribute('aria-atomic', 'true');
        region.style.cssText = VISUALLY_HIDDEN_CSS;
        dialog.appendChild(region);
    }
    return region;
}
function writeModalRegion(dialog, message, politeness, guard) {
    const target = ensureModalRegion(dialog, politeness);
    const unexposed = unexposedMessages(target);
    const messages = unexposed.includes(message) ? unexposed : [
        ...unexposed,
        message
    ];
    const previous = pendingByRegion.get(target);
    const receipts = unexposed.length > 0 && previous != null ? previous.receipts : new Map();
    const receipt = {
        withdraw: null
    };
    receipts.set(message, [
        ...receipts.get(message) ?? [],
        receipt
    ]);
    if (previous != null) {
        cancelPending(previous);
    }
    // Clear first, so the change is seen when the new text equals the old
    // text. Some assistive technology ignores identical content.
    target.textContent = '';
    const pending = {
        messages,
        receipts,
        frame: null,
        settleFrame: null,
        timer: null
    };
    pending.frame = requestAnimationFrame(()=>{
        pending.frame = null;
        if (guard != null && !guard.isExposed()) {
            // The region stopped being exposed after the call. Send the words and
            // their receipts to where they will be heard.
            pendingByRegion.delete(target);
            guard.redirect(waitingIn(pending));
            return;
        }
        target.textContent = pending.messages.join(' ');
        pending.settleFrame = requestAnimationFrame(()=>{
            pending.settleFrame = null;
        });
        pending.timer = setTimeout(()=>{
            target.textContent = '';
            pendingByRegion.delete(target);
        }, CLEAR_DELAY_MS);
    });
    pendingByRegion.set(target, pending);
    receipt.withdraw = ()=>withdrawFromRegion(target, message, receipt);
    return handleOf(receipt);
}
/**
 * Withdraw one announcer's share of `message` from `target` while it is not
 * yet exposed. Then a busy start overtaken by its outcome is never heard, and
 * a `hasReplace` instance's next message replaces its previous one. The
 * message stays while another announcer holds it. A receipt that is not among
 * the waiting words takes back nothing.
 */ function withdrawFromRegion(target, message, receipt) {
    const pending = pendingByRegion.get(target);
    if (pending == null || pending.frame == null && pending.settleFrame == null) {
        return;
    }
    const receipts = pending.receipts.get(message);
    const at = receipts?.indexOf(receipt) ?? -1;
    if (receipts == null || at < 0) {
        return;
    }
    receipts.splice(at, 1);
    if (receipts.length > 0) {
        return;
    }
    pending.receipts.delete(message);
    pending.messages = pending.messages.filter((text)=>text !== message);
    if (pending.messages.length === 0) {
        cancelPending(pending);
        pendingByRegion.delete(target);
        target.textContent = '';
    } else if (pending.frame == null) {
        // Already written this frame, not yet taken: show the rest.
        target.textContent = pending.messages.join(' ');
    }
}
function clearModalRegion(dialog, politeness) {
    const region = modalRegion(dialog, politeness);
    if (region == null) {
        return;
    }
    const pending = pendingByRegion.get(region);
    if (pending != null) {
        cancelPending(pending);
        pendingByRegion.delete(region);
    }
    region.textContent = '';
}
function takeJoinedAnnouncement() {
    const joined = channel.lastJoined;
    channel.lastJoined = null;
    return joined;
}
function withdrawPendingAnnouncement(joined, politeness) {
    const pending = channel.pendingMessages[politeness];
    const index = pending.indexOf(joined);
    if (index < 0) {
        return;
    }
    pending[index].holders -= 1;
    if (pending[index].holders <= 0) {
        pending.splice(index, 1);
    }
}
function __resetLiveRegionsForTest() {
    cancelPendingFrames('polite');
    cancelPendingFrames('assertive');
    cancelScheduledClear('polite');
    cancelScheduledClear('assertive');
    channel.lastJoined = null;
    if (channel.regions) {
        channel.regions.polite.remove();
        channel.regions.assertive.remove();
        channel.regions = null;
    }
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useAnnounceRenderedText.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "renderedText",
    ()=>renderedText,
    "useAnnounceRenderedText",
    ()=>useAnnounceRenderedText
]);
/**
 * @file useAnnounceRenderedText.ts
 * @input A ref to a rendered element, whether it shows, and a token for each
 *   new occasion to speak
 * @output Announces the element's rendered text through the polite live
 *   region, or through the owner's announcer
 * @position Core a11y hook. It is not in hooks/index.ts, because that barrel
 *   is public and a new public hook needs admission (AST-002). Import it by
 *   path.
 */ // Some content reaches assistive technology only through a live region. For
// example, a listbox permits only `option` and `group` children, so a panel
// message in it has `role="presentation"`. When that content is a caller's
// `ReactNode`, announce what was rendered, not a built-in default (AST-056,
// AST-086).
//
// The text comes from the DOM after render, not from React children, so text
// that a child component generates is included. A live region that mounts
// with its content is not reliably announced, so the persistent `useAnnounce`
// region speaks it. Content with `aria-hidden` or `hidden` is left out. An
// `aria-label` on a descendant is not used.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounce$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useAnnounce.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsHydrating$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsHydrating.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
const LIVE_CONTAINER = '[role="log"], [role="status"], [role="alert"], [aria-live="polite"], [aria-live="assertive"]';
const HIDDEN = '[aria-hidden="true"], [hidden]';
const BLOCKS = 'p, div, li, br, h1, h2, h3, h4, h5, h6';
/**
 * Each child element's rendered text as its own block, joined by spaces. Text
 * placed directly in the element, beside its child elements, counts as a block
 * too (a status bar is an icon followed by its bare message).
 */ function blockText(element, exclude) {
    return Array.from(element.childNodes).map((child)=>{
        if (child.nodeType === Node.TEXT_NODE) {
            return (child.textContent ?? '').replace(/\s+/g, ' ').trim();
        }
        // By node type, not `instanceof`: an element from another document's
        // window (a portal into a same-origin iframe) fails this window's
        // constructor checks.
        if (child.nodeType === Node.ELEMENT_NODE) {
            const part = child;
            return part.matches(HIDDEN) || exclude != null && part.matches(exclude) ? '' : renderedText(part, exclude);
        }
        return '';
    }).filter((part)=>part !== '').join(' ');
}
function renderedText(element, exclude) {
    const view = element.ownerDocument.defaultView;
    const displayOf = (node)=>view?.getComputedStyle(node).display ?? '';
    const parts = [];
    const walk = (node, parentDisplay)=>{
        if (node.nodeType === Node.TEXT_NODE) {
            parts.push(node.textContent ?? '');
            return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) {
            return;
        }
        const part = node;
        if (part.matches(HIDDEN) || exclude != null && part.matches(exclude)) {
            return;
        }
        const display = displayOf(part);
        const isBlock = part.matches(BLOCKS) || display !== '' && display !== 'contents' && !display.startsWith('inline') || /\b(flex|grid)\b/.test(parentDisplay);
        if (isBlock) {
            parts.push(' ');
        }
        part.childNodes.forEach((child)=>walk(child, display));
        if (isBlock) {
            parts.push(' ');
        }
    };
    const ownDisplay = displayOf(element);
    element.childNodes.forEach((child)=>walk(child, ownDisplay));
    return parts.join('').replace(/\s+/g, ' ').trim();
}
function useAnnounceRenderedText(ref, isShown, occasion, { skipFirstRender = false, politeness = 'polite', fallbackText, announce: ownerAnnounce, exclude } = {}) {
    const ownAnnounce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounce$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAnnounce"])();
    const announce = ownerAnnounce ?? ownAnnounce;
    const spokenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isHydrating = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsHydrating$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsHydrating"])();
    // Captured once: an owner rendered before the document finished loading, or
    // hydrated from server HTML, is part of the page the person arrived at.
    const [renderedWithPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>isHydrating || document.readyState !== 'complete');
    const isFirstRunRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(true);
    // Syncs the live region with the rendered text.
    // No dependency array: the text lives in the DOM, and a caller can change it
    // without a prop that this hook sees. One text read per render is cheap, and
    // the dedupe below makes later renders no-ops.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const isFirstRun = isFirstRunRef.current;
        isFirstRunRef.current = false;
        const element = ref.current;
        if (!isShown || element?.closest(HIDDEN) || element?.checkVisibility?.() === false) {
            spokenRef.current = null;
            return;
        }
        if (!element) {
            return;
        }
        if (skipFirstRender && element.parentElement?.closest(LIVE_CONTAINER)) {
            return;
        }
        let text = skipFirstRender ? blockText(element, exclude) : renderedText(element, exclude);
        if (text === '' && fallbackText !== undefined) {
            text = (element.getAttribute('aria-labelledby') ?? '').split(/\s+/).map((id)=>{
                // Each referenced element as read: its hidden parts dropped, as
                // the accessible name drops them.
                const target = element.ownerDocument.getElementById(id);
                return target == null ? '' : renderedText(target);
            }).join(' ').replace(/\s+/g, ' ').trim() || fallbackText;
        }
        if (text === '') {
            // Nothing readable on screen either, so there is no announcement that
            // would match what the sighted user is seeing.
            return;
        }
        const spoken = `${occasion}\u0000${text}`;
        if (spokenRef.current === spoken) {
            return;
        }
        spokenRef.current = spoken;
        const isPageLoad = isFirstRun && renderedWithPage || document.readyState !== 'complete';
        if (skipFirstRender && isPageLoad) {
            // Part of the page the person arrived at: remember it, say nothing.
            return;
        }
        announce(text, politeness);
    });
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useAttachment.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAttachment",
    ()=>useAttachment,
    "useAttachmentPair",
    ()=>useAttachmentPair
]);
/**
 * @file useAttachment.ts
 * @input Node refs (an element's, or the document's), an attach function
 *   and a key
 * @output Exports useAttachment and useAttachmentPair (two elements): they keep
 *   the attach function bound to the nodes the refs hold across commits
 * @position Internal React helper, not in hooks/index.ts: the one attach and
 *   release lifecycle of the gesture hooks, the pager and useAnimator
 *
 * SYNC: When modified, update gestures/__tests__/useGestureRecognizer.test.tsx,
 * gestures/__tests__/useFingerScroll.test.tsx and
 * __tests__/useAttachmentPair.test.tsx.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsomorphicLayoutEffect.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
function useAttachment(ref, attach, key) {
    useAttachedNodes([
        ref
    ], ([node])=>attach(node), key);
}
function useAttachmentPair(firstRef, secondRef, attach, key) {
    useAttachedNodes([
        firstRef,
        secondRef
    ], ([first, second])=>attach(first, second), key);
}
/**
 * The lifecycle both share: one attachment of the nodes the refs hold. It is
 * made once every node is there, and released when a node or `key` changes
 * and at unmount.
 */ function useAttachedNodes(refs, attach, key) {
    const attachmentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Syncs the attachment with the DOM nodes the refs hold after this commit.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        const nodes = refs.map((ref)=>ref.current);
        const current = attachmentRef.current;
        if (current != null && current.key === key && nodes.every((node, index)=>node === current.nodes[index])) {
            return;
        }
        current?.release();
        attachmentRef.current = nodes.every((node)=>node != null) ? {
            nodes: nodes,
            key,
            release: attach(nodes)
        } : null;
    });
    // Releases the attachment at unmount.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>()=>{
            attachmentRef.current?.release();
            attachmentRef.current = null;
        }, []);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useClickableContainer.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INTERACTIVE_SELECTORS",
    ()=>INTERACTIVE_SELECTORS,
    "PRESSABLE_CONTAINER_ATTRIBUTE",
    ()=>PRESSABLE_CONTAINER_ATTRIBUTE,
    "cancelNestedPress",
    ()=>cancelNestedPress,
    "hasInteractiveAncestor",
    ()=>hasInteractiveAncestor,
    "hasTextSelection",
    ()=>hasTextSelection,
    "innermostInteractive",
    ()=>innermostInteractive,
    "matchesInteractiveSelectors",
    ()=>matchesInteractiveSelectors,
    "useClickableContainer",
    ()=>useClickableContainer,
    "useClickableContainerProxy",
    ()=>useClickableContainerProxy
]);
/**
 * @file useClickableContainer.ts
 * @input Container ref, interactive element ref, click/href handlers
 * @output onClick, onMouseUp and onPointerDown handlers for the container;
 *   INTERACTIVE_SELECTORS list; hasInteractiveAncestor and the shared
 *   innermostInteractive walk; the internal useClickableContainerProxy, the
 *   handlers without the marker
 * @position Core hook for clickable containers with nested interactive
 *   elements. A click on a nested button or link does not run the card's
 *   action, and a finger press there shows no press on the card. Each navigation
 *   passes the rule in utils/safeUrl.ts first.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/hooks/index.ts (export)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerSurfacePress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerSurfacePress.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$safeUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/safeUrl.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/pressFeedback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressBox$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/pressBox.stylex.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
;
;
const PRESSABLE_CONTAINER_ATTRIBUTE = 'data-pressable-container';
const INTERACTIVE_SELECTORS = [
    'button',
    'a',
    'input',
    'select',
    'textarea',
    '[role="button"]',
    '[role="link"]',
    '[role="checkbox"]',
    '[role="radio"]',
    '[role="switch"]',
    '[role="tab"]',
    '[role="menuitem"]',
    '[role="option"]',
    '[role="combobox"]',
    '[role="listbox"]',
    '[role="slider"]',
    '[role="spinbutton"]',
    `[${PRESSABLE_CONTAINER_ATTRIBUTE}]`
].join(',');
const NON_INTERACTIVE_SELECTORS = '[aria-readonly="true"]';
function matchesInteractiveSelectors(element) {
    return element.matches(INTERACTIVE_SELECTORS) && !element.matches(NON_INTERACTIVE_SELECTORS);
}
function innermostInteractive(el, rootEl, isInteractive = matchesInteractiveSelectors) {
    let current = el;
    while(current != null && current !== rootEl && current !== document.body){
        if (isInteractive(current)) {
            return current;
        }
        current = current.parentElement;
    }
    return null;
}
function hasInteractiveAncestor(el, rootEl) {
    return innermostInteractive(el, rootEl, belongsToSomethingElse) != null;
}
// hasInteractiveAncestor documents this answer until the next minor.
// A layer root stops such a press before any bubble-phase React handler.
// A native listener or a capture-phase handler still sees it.
function belongsToSomethingElse(element) {
    return matchesInteractiveSelectors(element) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerSurfacePress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLayerSurface"])(element);
}
function cancelNestedPress(event, container, ownAction) {
    const target = event.target;
    if (container == null || event.pointerType !== 'touch' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressBox$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressBoxesIn"])(container).length === 0 || !(target instanceof Element) || target === event.currentTarget || !hasInteractiveAncestor(target, container) || // The container's own action, such as the control it delegates to: a
    // press on it activates the container.
    ownAction?.contains(target) === true) {
        return;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cancelPress"])(container);
}
function hasTextSelection(node) {
    if (typeof document === 'undefined' || !('getSelection' in document)) {
        return false;
    }
    const selection = document.getSelection();
    if (selection == null || selection.isCollapsed) {
        return false;
    }
    return node.contains(selection.anchorNode);
}
function useClickableContainer(options) {
    const { containerRef } = options;
    // Mark container as pressable for the interactive selector check
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = containerRef.current;
        if (el) {
            el.setAttribute(PRESSABLE_CONTAINER_ATTRIBUTE, 'true');
        }
    }, [
        containerRef
    ]);
    return useClickableContainerProxy(options);
}
function useClickableContainerProxy({ containerRef, interactiveRef, onClick: onClickProp, href, target, disabled = false }) {
    const onClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        if (disabled) {
            return;
        }
        const containerEl = containerRef.current;
        if (!containerEl) {
            return;
        }
        if (hasTextSelection(containerEl)) {
            return;
        }
        const eventTarget = event.target;
        if (!(eventTarget instanceof Element)) {
            return;
        }
        if (eventTarget !== event.currentTarget && hasInteractiveAncestor(eventTarget, containerEl)) {
            return;
        }
        onClickProp?.(event);
        if (event.defaultPrevented) {
            return;
        }
        // React DOM checks the hrefs that it writes, but nothing below passes
        // through React. So the shared navigation rule decides once, before the
        // target, a modifier key, or the delegated anchor picks a sink. A
        // blocked href does not navigate, but the click handler above still ran.
        if (href != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$safeUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSafeUrl"])(href)) {
            const shouldOpenNewTab = target === '_blank' || event.ctrlKey || event.metaKey;
            if (shouldOpenNewTab) {
                window.open(href, '_blank', 'noopener');
            } else if (interactiveRef?.current) {
                // Proxy click to the sr-only link so the framework link component
                // handles navigation (client-side transitions in Next.js, etc.).
                interactiveRef.current.click();
            } else {
                // eslint-disable-next-line react-compiler/react-compiler -- browser navigation API
                window.location.href = href;
            }
        }
        // Proxy click to the interactive ref if no explicit handler
        if (href == null && onClickProp == null && interactiveRef?.current) {
            const clickEvent = new MouseEvent('click', {
                bubbles: event.bubbles,
                cancelable: event.cancelable,
                ctrlKey: event.ctrlKey,
                metaKey: event.metaKey,
                shiftKey: event.shiftKey,
                altKey: event.altKey,
                button: event.button
            });
            interactiveRef.current.dispatchEvent(clickEvent);
            event.stopPropagation();
        }
    }, [
        containerRef,
        interactiveRef,
        onClickProp,
        href,
        target,
        disabled
    ]);
    const onMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        if (disabled) {
            return;
        }
        const containerEl = containerRef.current;
        if (!containerEl) {
            return;
        }
        const eventTarget = event.target;
        if (!(eventTarget instanceof Element)) {
            return;
        }
        // Middle-click on href opens in new tab (same scheme rule as onClick —
        // this navigation never passes through React either).
        const isMiddleClick = event.button === 1;
        if (isMiddleClick && href != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$safeUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSafeUrl"])(href) && (eventTarget === event.currentTarget || !hasInteractiveAncestor(eventTarget, containerEl))) {
            window.open(href, '_blank', 'noopener');
        }
    }, [
        containerRef,
        href,
        disabled
    ]);
    // The press-state counterpart of onClick's rule: a press that would not
    // activate the container shows no press on it. That holds for a finger on
    // every container, and for a mouse or a pen on one that owns a control's box.
    const onPointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        if (disabled) {
            return;
        }
        cancelNestedPress(event, containerRef.current, interactiveRef?.current ?? null);
    }, [
        containerRef,
        interactiveRef,
        disabled
    ]);
    return {
        onClick,
        onMouseUp,
        onPointerDown
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useCommittedRef.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCommittedRef",
    ()=>useCommittedRef,
    "useCommittedRefInto",
    ()=>useCommittedRefInto
]);
/**
 * @file useCommittedRef.ts
 * @input A value from the current render: a prop or a callback
 * @output Exports useCommittedRef and useCommittedRefInto
 * @position Internal hooks; not in hooks/index.ts or the package entry
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
function useCommittedRef(value) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(value);
    useCommittedRefInto(ref, value);
    return ref;
}
function useCommittedRefInto(ref, value) {
    // Stores values only. Refs to DOM nodes are not attached yet when this runs.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInsertionEffect"])(()=>{
        // eslint-disable-next-line react-compiler/react-compiler -- the caller hands over its own ref so that this hook writes it
        ref.current = value;
    });
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useEntryAnimation.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEntryAnimation",
    ()=>useEntryAnimation
]);
/**
 * @file useEntryAnimation.ts
 * @input Uses React, StyleX, theme tokens, useIsHydrating
 * @output Exports useEntryAnimation hook for mount-only entry animations
 * @position Hook utility; consumed by FieldStatus and available to consumers
 *
 * It animates only an element that mounts after the first page paint.
 * Server-rendered elements hydrate without the entry style and never play it
 * (spec:AST-013 FR13).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsHydrating$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsHydrating.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
;
;
// Track whether the initial page paint has completed, so elements a
// client-only root renders on page load do not animate; only dynamically
// inserted ones should. Server-rendered elements are covered by
// useIsHydrating instead: hydration can run after this flag turns true.
let initialPaintComplete = false;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const slideDown = "xiylxmw-B";
const slideUp = "x1b6yrix-B";
const fadeIn = "x18re5ia-B";
const scaleIn = "x1k48ry3-B";
const styles = {
    slideDown: {
        kKVMdj: "x1srr2gu x1aquc0h",
        k44tkh: "x9uej1z",
        kyAemX: "x128ha8g",
        kWV6AL: "xskzprw",
        $$css: true
    },
    slideUp: {
        kKVMdj: "x1dvww92 x1aquc0h",
        k44tkh: "x9uej1z",
        kyAemX: "x128ha8g",
        kWV6AL: "xskzprw",
        $$css: true
    },
    fadeIn: {
        kKVMdj: "xqcmdr3 x1aquc0h",
        k44tkh: "x9uej1z",
        kyAemX: "x128ha8g",
        kWV6AL: "xskzprw",
        $$css: true
    },
    scaleIn: {
        kKVMdj: "x97zbip x1aquc0h",
        k44tkh: "x9uej1z",
        kyAemX: "x128ha8g",
        kWV6AL: "xskzprw",
        $$css: true
    }
};
function useEntryAnimation(preset = 'slideDown') {
    const isHydrating = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsHydrating$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsHydrating"])();
    // Captured once: a hydrated element must not start animating when React
    // re-renders it with the client snapshot after hydration.
    const [animate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>!isHydrating && initialPaintComplete);
    return animate ? styles[preset] : null;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useInputContainer.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useInputContainer",
    ()=>useInputContainer
]);
/**
 * @file useInputContainer.ts
 * @input Container ref, input ref
 * @output onClick and onMouseUp handlers for the input container wrapper
 * @position Hook for input wrapper containers that delegate focus to the inner input/textarea
 *
 * Uses useClickableContainer to safely handle nested interactive elements
 * (clear buttons, calendar toggles, etc.) while focusing the input when
 * clicking non-interactive areas (icons, padding, status indicators).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useClickableContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useClickableContainer.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
/**
 * Input types that should receive `.focus()` when the container is clicked.
 * Other input types (e.g. checkbox, radio, file) use `.click()` instead.
 */ const FOCUS_INPUT_TYPES = new Set([
    'text',
    'password',
    'email',
    'number',
    'search',
    'tel',
    'url',
    'date',
    'datetime-local',
    'month',
    'time',
    'week'
]);
/**
 * `aria-haspopup` values that advertise a control opens a popup on activation.
 * https://www.w3.org/TR/wai-aria-1.2/#aria-haspopup
 */ const HASPOPUP_VALUES = new Set([
    'true',
    'menu',
    'listbox',
    'tree',
    'grid',
    'dialog'
]);
/**
 * Whether an element is a popup trigger — a combobox or any control that
 * advertises `aria-haspopup`. Such controls activate their popup on *click*
 * (e.g. DateInput's `<input type="text" role="combobox" aria-haspopup="dialog">`
 * opens its calendar via `onClick`, with no `onFocus` opener). Forwarding a
 * container click to `.focus()` would focus the control but leave the popup
 * closed — so we `.click()` these instead. Plain text inputs (no popup) are
 * unaffected and keep `.focus()`.
 */ function isPopupTrigger(el) {
    if (el.getAttribute('role') === 'combobox') {
        return true;
    }
    const haspopup = el.getAttribute('aria-haspopup');
    return haspopup != null && HASPOPUP_VALUES.has(haspopup);
}
function useInputContainer({ containerRef, inputRef, disabled = false }) {
    const onClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const input = inputRef.current;
        if (input == null) {
            return;
        }
        // Popup triggers (combobox / aria-haspopup) activate their popup on
        // *click*, not focus — so check this BEFORE the type check, otherwise a
        // `type="text"` combobox (DateInput) would `.focus()` and never open.
        if (input instanceof HTMLElement && isPopupTrigger(input)) {
            input.click();
        } else if (input instanceof HTMLInputElement && FOCUS_INPUT_TYPES.has(input.type)) {
            input.focus();
        } else if (input instanceof HTMLTextAreaElement) {
            input.focus();
        } else if (input instanceof HTMLElement) {
            input.click();
        } else if ('focus' in input) {
            input.focus();
        }
    }, [
        inputRef
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useClickableContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useClickableContainer"])({
        containerRef,
        interactiveRef: inputRef,
        onClick,
        disabled
    });
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useInteractiveRole.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useInteractiveRole",
    ()=>useInteractiveRole
]);
/**
 * @file useInteractiveRole.ts
 * @input useInteractiveTrigger
 * @output useInteractiveRole hook and InteractiveRole type
 * @position Hook utility for polymorphic components such as Token, Thumbnail,
 *   Item and ClickableCard. Add new context-based triggers here, so the
 *   components that use this hook need no change.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/hooks/index.ts (export)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InteractiveRoleContext$2f$InteractiveRoleContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/InteractiveRoleContext/InteractiveRoleContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
function useInteractiveRole({ href, onClick, isDisabled = false }) {
    const contextRole = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InteractiveRoleContext$2f$InteractiveRoleContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInteractiveRoleContext"])();
    // A disabled href is skipped, so the checks below decide the role.
    if (href != null && !isDisabled) {
        return 'link';
    }
    if (onClick != null) {
        return 'button';
    }
    // 3. Context-provided role override (e.g., Popover provides 'button')
    if (contextRole != null) {
        return contextRole;
    }
    return 'inert';
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsHydrating.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsHydrating",
    ()=>useIsHydrating
]);
/**
 * @file useIsHydrating.ts
 * @input Uses React useSyncExternalStore
 * @output Exports useIsHydrating (internal; not re-exported from hooks/index.ts)
 * @position Internal utility; read by useEntryAnimation so markup that
 *   hydrates server HTML matches the server (spec:AST-013 FR9, FR13)
 *
 * React renders with the server snapshot on the server and again in the
 * client render that hydrates server HTML, then re-renders with the client
 * snapshot. Code that must render the server's markup while hydrating reads
 * this instead of a first-paint flag, timer, animation frame, or mount Effect.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
// Nothing ever changes, so there is nothing to subscribe to.
const subscribe = ()=>()=>{};
const getSnapshot = ()=>false;
const getServerSnapshot = ()=>true;
function useIsHydrating() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, getSnapshot, getServerSnapshot);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useKeyboardHint.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useKeyboardHint",
    ()=>useKeyboardHint
]);
/**
 * @file useKeyboardHint.tsx
 * @input Uses React, StyleX, Kbd, useLayer, the shared anchored hint
 *   (hooks/anchoredHint.tsx), i18n (useComponentTranslator)
 * @output Exports useKeyboardHint hook — ephemeral arrow-key navigation hint
 * @position Core hook; shows sighted keyboard users how to navigate composite
 *   widgets that use roving tabindex (single Tab stop, arrows inside)
 *
 * SYNC: When modified, update:
 * - /packages/core/src/hooks/anchoredHint.tsx
 * - /packages/core/src/hooks/index.ts
 * - /packages/core/src/hooks/useKeyboardHint.doc.mjs
 * - /apps/storybook/stories/useKeyboardHint.stories.tsx
 * - /packages/cli/assets/templates/blocks/components/Hooks/useKeyboardHintHookUsage.tsx
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Kbd$2f$Kbd$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Kbd/Kbd.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useLayer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/useLayer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useLayerDismissal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/useLayerDismissal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$hooks$2f$useKeyboardHint$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/hooks/useKeyboardHint.generated.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$anchoredHint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/anchoredHint.js [app-ssr] (ecmascript)");
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerEnglishFallback"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$hooks$2f$useKeyboardHint$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const ARROW_KEYS = new Set([
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown'
]);
const ARROW_HINT_KEYS = {
    horizontal: [
        'left',
        'right'
    ],
    vertical: [
        'up',
        'down'
    ],
    both: [
        'left',
        'right',
        'up',
        'down'
    ]
};
function useKeyboardHint(options = {}) {
    const { orientation = 'horizontal', dismissAfterMs, isEnabled = true } = options;
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    const timeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dismissedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isVisibleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const anchorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const layerAnchorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(()=>{});
    const clearDismissTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);
    // Registered on the layer stack only while the hint shows, so it registers
    // after its anchor is set and ranks in the anchor's document.
    const [isShowing, setIsShowing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleLayerShow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        isVisibleRef.current = true;
    }, []);
    const handleLayerHide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        isVisibleRef.current = false;
        setIsShowing(false);
        clearDismissTimeout();
        layerAnchorRef.current(null);
    }, [
        clearDismissTimeout
    ]);
    const layer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useLayer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayer"])({
        mode: 'context',
        onShow: handleLayerShow,
        onHide: handleLayerHide
    });
    layerAnchorRef.current = layer.ref;
    // Hide + mark dismissed (won't re-show for this instance)
    const dismiss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        dismissedRef.current = true;
        clearDismissTimeout();
        layer.hide();
        isVisibleRef.current = false;
        layerAnchorRef.current(null);
    }, [
        clearDismissTimeout,
        layer
    ]);
    // Show the layer anchored to the focused element
    const show = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((anchor)=>{
        if (dismissedRef.current || !isEnabled) {
            return;
        }
        anchorRef.current = anchor;
        layerAnchorRef.current(anchor);
        setIsShowing(true);
        layer.show();
        clearDismissTimeout();
        if (dismissAfterMs != null) {
            timeoutRef.current = setTimeout(()=>{
                dismiss();
            }, dismissAfterMs);
        }
    }, [
        clearDismissTimeout,
        dismiss,
        dismissAfterMs,
        isEnabled,
        layer
    ]);
    // Registered while the hint shows, in its anchor's document. The hint's
    // host is a layer, so a hint in a dialog ranks above that dialog.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useLayerDismissal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayerDismissal"])({
        isActive: isShowing,
        isPresent: ()=>isVisibleRef.current,
        onDismiss: dismiss,
        getContainer: ()=>anchorRef.current
    });
    // Releases the dismiss timer and the layer anchor on unmount.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>()=>{
            clearDismissTimeout();
            layerAnchorRef.current(null);
        }, [
        clearDismissTimeout
    ]);
    // --- Handlers ---
    const onFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (dismissedRef.current || !isEnabled) {
            return;
        }
        // Only show on keyboard focus (focus-visible)
        const target = e.target;
        if (!target.matches(':focus-visible')) {
            return;
        }
        const container = e.currentTarget;
        // React bubbles focus from portaled children (a sheet or popover opened
        // from the row) to the container; that focus is not in the row, where
        // the arrow keys work, so it neither shows nor spends the hint.
        if (!container.contains(target)) {
            return;
        }
        // Only show when focus enters from outside the container
        if (e.relatedTarget instanceof Node && container.contains(e.relatedTarget)) {
            return;
        }
        show(target);
    }, [
        show,
        isEnabled
    ]);
    const onBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (!isVisibleRef.current) {
            return;
        }
        const container = e.currentTarget;
        // Only dismiss when focus leaves the container entirely
        if (e.relatedTarget instanceof Node && container.contains(e.relatedTarget)) {
            // Focus moved within — re-anchor to the new target
            if (!dismissedRef.current && e.relatedTarget instanceof HTMLElement) {
                layerAnchorRef.current(e.relatedTarget);
            }
            return;
        }
        dismiss();
    }, [
        dismiss
    ]);
    const onKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (!isVisibleRef.current) {
            return;
        }
        if (ARROW_KEYS.has(e.key)) {
            dismiss();
        }
    }, [
        dismiss
    ]);
    // --- Render the hint element ---
    const arrowContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$anchoredHint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anchoredHintStyles"].keys),
        children: ARROW_HINT_KEYS[orientation].map((key)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Kbd$2f$Kbd$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kbd"], {
                keys: key
            }, key))
    });
    const hintElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$anchoredHint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["renderAnchoredHint"])(layer, /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
        "aria-hidden": "true",
        children: [
            arrowContent,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$anchoredHint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anchoredHintStyles"].label),
                children: t('@astryx.keyboardHint.toNavigate')
            })
        ]
    }));
    return {
        hintElement,
        onFocus,
        onBlur,
        onKeyDown
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useListFocus.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "oneTabStopAmong",
    ()=>oneTabStopAmong,
    "useInternalListFocus",
    ()=>useInternalListFocus,
    "useListFocus",
    ()=>useListFocus
]);
/**
 * @file useListFocus.ts
 * @input Uses React useCallback, useRef, useIsomorphicLayoutEffect,
 *   isRtlElement
 * @output Exports useListFocus hook for linear list keyboard navigation
 * @position Core hook; used by TabMenu for dropdown menu navigation, Toolbar
 *   for roving tabindex, ButtonGroup, ContextMenu, NavHeadingMenu, and more.
 *   Auto-detects RTL from the container's computed direction so horizontal
 *   arrow keys follow visual direction (WCAG 1.3.2).
 *
 * SYNC: When modified, update:
 * - /packages/core/src/hooks/index.ts
 * - /packages/core/src/hooks/useListFocus.doc.mjs
 * - /packages/core/src/hooks/useListFocus.test.tsx
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$isRtlElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/isRtlElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsomorphicLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusReturn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/focusReturn.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
;
/**
 * Navigation orientation for a linear list.
 * - `'horizontal'`: ArrowLeft/ArrowRight move between items.
 * - `'vertical'`: ArrowUp/ArrowDown move between items.
 * - `'both'`: all four arrows move between items (in linear DOM order).
 */ /**
 * Configuration for list focus behavior
 */ /**
 * Options only Core components pass; this module's internal export, not
 * re-exported from `hooks/index.ts`, so not public API.
 */ /**
 * Return type for useListFocus hook
 */ // Text-editing inputs whose caret must not be hijacked by arrow navigation.
const TEXT_INPUT_TYPES = new Set([
    'text',
    'search',
    'url',
    'tel',
    'email',
    'password',
    'number'
]);
/**
 * Whether `el` sits under a `hidden` or `inert` ancestor that is itself inside
 * `listEl` (the list's own state is not consulted). Such a row cannot take
 * focus — a drilled-in menu hides the rows a view replaced — so it
 * leaves the roving order and the typeahead.
 */ function isHiddenWithin(el, listEl) {
    const hidden = el.parentElement?.closest('[hidden],[inert]');
    return hidden != null && hidden !== listEl && listEl.contains(hidden);
}
/**
 * The nearest `contenteditable` root for `el`, or null when `el` is not inside
 * an editable region. Prefers the browser's `isContentEditable` property and
 * falls back to the closest `[contenteditable]` ancestor whose value is not
 * `"false"` (so environments without `isContentEditable` still work).
 */ function getContentEditableRoot(el) {
    if (el.isContentEditable) {
        return el;
    }
    const candidate = el.closest('[contenteditable]');
    if (candidate && candidate.getAttribute('contenteditable') !== 'false') {
        return candidate;
    }
    return null;
}
/**
 * Whether an arrow/Home/End key should be left to the browser because the
 * event target is a text-editing element whose caret is not yet at the boundary
 * in the direction of travel (or a selection is present). Returns true when the
 * list should NOT steal the key.
 *
 * Covers three editing surfaces:
 * - `<textarea>` and text-type `<input>` — use `selectionStart`/`selectionEnd`
 *   to steal only at the boundary in the travel direction.
 * - `contenteditable` (rich-text editor / chat composer) — precise caret
 *   boundary detection in an arbitrary editable subtree is fragile, so we err
 *   on the side of never hijacking an active editor: defer on every caret key
 *   whenever focus is inside a non-empty contenteditable. (An empty editable
 *   has nothing to caret through, so navigation may proceed.)
 */ function shouldDeferToCaret(target, key) {
    if (!(target instanceof HTMLElement)) {
        return false;
    }
    // contenteditable (covers an element with contenteditable="" / "true" and
    // descendants that inherit it). `isContentEditable` is the reliable property
    // in the browser; fall back to the nearest `contenteditable` ancestor for
    // environments (e.g. jsdom) that don't implement the property.
    const editableRoot = getContentEditableRoot(target);
    if (editableRoot) {
        const selection = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        // A non-collapsed selection means the user is selecting text — never steal.
        if (selection && selection.rangeCount > 0 && !selection.isCollapsed) //TURBOPACK unreachable
        ;
        // Collapsed caret (or no selection API): defer whenever the editor has
        // content, so arrow keys stay with the active rich-text editor.
        return (editableRoot.textContent ?? '').length > 0;
    }
    const isTextarea = target.tagName === 'TEXTAREA';
    const isTextInput = target.tagName === 'INPUT' && TEXT_INPUT_TYPES.has(target.type);
    if (!isTextarea && !isTextInput) {
        return false;
    }
    const input = target;
    const { selectionStart, selectionEnd, value } = input;
    // A non-collapsed selection means the user is selecting text — never steal.
    if (selectionStart !== selectionEnd) {
        return true;
    }
    // number inputs report null selection; treat as "always defer" for caret keys.
    if (selectionStart == null) {
        return true;
    }
    if (key === 'ArrowLeft' || key === 'ArrowUp' || key === 'Home') {
        // Defer unless the caret is at the very start.
        return selectionStart > 0;
    }
    if (key === 'ArrowRight' || key === 'ArrowDown' || key === 'End') {
        // Defer unless the caret is at the very end.
        return selectionStart < value.length;
    }
    return false;
}
function useListFocus(options = {}) {
    return useInternalListFocus(options);
}
function isDisabledItem(el) {
    return el.getAttribute('aria-disabled') === 'true' || el.disabled === true || el.hasAttribute('disabled');
}
function oneTabStopAmong(itemSelector, boundarySelector) {
    return (list)=>{
        const items = Array.from(list.querySelectorAll(itemSelector)).filter((el)=>!isHiddenWithin(el, list) && el.closest(boundarySelector) === list);
        const enabled = items.filter((el)=>!isDisabledItem(el));
        const candidates = enabled.length > 0 ? enabled : items;
        const stop = candidates.find((el)=>el.getAttribute('tabindex') === '0') ?? candidates[0];
        return stop == null ? items : [
            stop,
            ...items.filter((el)=>el !== stop)
        ];
    };
}
function useInternalListFocus(options = {}) {
    const { itemSelector = '[role="menuitem"]', boundarySelector, wrap = true, onEscape, orientation = 'vertical', hasHomeEnd = true, hasPaging = false, hasRovingTabIndex = false, tabStopOrder, hasCaretGuard = false, focusFollowsLastInput = false, reachesDisabledItems = false } = options;
    const listRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    /**
   * Whether an item is disabled and therefore cannot receive DOM focus.
   * A `.focus()` call on such an element silently no-ops, so navigation must
   * skip these to avoid freezing on a disabled item (menus-4, navigation-5).
   */ const isItemDisabled = isDisabledItem;
    /**
   * Get all focusable items in the list.
   */ const getItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const listEl = listRef.current;
        if (!listEl) {
            return [];
        }
        const matched = Array.from(listEl.querySelectorAll(itemSelector)).filter((el)=>!isHiddenWithin(el, listEl));
        // When a boundary is set, keep only items that belong to THIS list level —
        // i.e. whose nearest boundary ancestor is our own container. This excludes
        // items inside nested lists (e.g. inline submenu flyouts) that would
        // otherwise be swept in by querySelectorAll.
        if (!boundarySelector) {
            return matched;
        }
        return matched.filter((el)=>el.closest(boundarySelector) === listEl);
    }, [
        itemSelector,
        boundarySelector
    ]);
    /**
   * Whether a key event belongs to this list level rather than a nested list.
   * With a boundary set, an event that originated inside a nested boundary
   * (e.g. a submenu flyout) has bubbled up to us and must be ignored so we
   * don't double-handle navigation. Without a boundary, every event is ours.
   */ const ownsEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        const listEl = listRef.current;
        if (!listEl || !boundarySelector) {
            return true;
        }
        const target = e.target;
        if (!target) {
            return true;
        }
        return target.closest(boundarySelector) === listEl;
    }, [
        boundarySelector
    ]);
    /**
   * Find the next item index from `start` that `isSkipped` does not pass over
   * (by default, the next enabled item), moving by `step`, optionally
   * wrapping. Returns -1 when no such item exists in range. Skipping
   * disabled items here (rather than relying on the selector) keeps navigation
   * from stalling on an item whose `.focus()` silently no-ops.
   */ const findItemIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((items, start, step, shouldWrap, isSkipped = isItemDisabled)=>{
        const count = items.length;
        if (count === 0) {
            return -1;
        }
        let index = start;
        for(let i = 0; i < count; i++){
            if (index < 0 || index >= count) {
                if (!shouldWrap) {
                    return -1;
                }
                index = (index + count) % count;
            }
            const item = items[index];
            if (item && !isSkipped(item)) {
                return index;
            }
            index += step;
        }
        return -1;
    }, [
        isItemDisabled
    ]);
    const isSkippedByKeys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((el)=>!reachesDisabledItems && isItemDisabled(el), [
        reachesDisabledItems,
        isItemDisabled
    ]);
    /**
   * Get the currently focused item index.
   */ const getCurrentIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const items = getItems();
        const active = document.activeElement;
        return items.findIndex((item)=>item === active || item.contains(active));
    }, [
        getItems
    ]);
    // --- Roving tabindex ownership (opt-in via `hasRovingTabIndex`) -------------
    /**
   * Set `tabindex` on an item, but only when it differs (avoids redundant DOM
   * writes). Uses setAttribute so the value reflects even for elements (like
   * `<button>`) whose default tabIndex is already 0.
   */ const setTabIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((el, value)=>{
        if (el.getAttribute('tabindex') !== String(value)) {
            el.setAttribute('tabindex', String(value));
        }
    }, []);
    /**
   * Stamp the roving tab stop: exactly one enabled item is tabbable (0), the
   * rest are -1. Prefer keeping the currently-tabbable item if it is still
   * enabled; otherwise promote the first enabled item (tab-stop repair).
   */ const syncTabStops = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const listEl = listRef.current;
        if (listEl != null && tabStopOrder != null) {
            const [stop, ...others] = tabStopOrder(listEl);
            if (stop != null) {
                setTabIndex(stop, 0);
            }
            for (const el of others){
                setTabIndex(el, -1);
            }
            return;
        }
        const items = getItems();
        const enabled = items.filter((el)=>!isItemDisabled(el));
        if (enabled.length === 0) {
            return;
        }
        const current = enabled.find((el)=>el.getAttribute('tabindex') === '0');
        const tabbable = current ?? enabled[0];
        for (const el of items){
            setTabIndex(el, el === tabbable ? 0 : -1);
        }
    }, [
        getItems,
        isItemDisabled,
        setTabIndex,
        tabStopOrder
    ]);
    // Keep the tab stop valid across renders (items added/removed, disabled
    // toggled). Runs after every commit but only when roving tabindex is on.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        if (hasRovingTabIndex) {
            syncTabStops();
        }
    });
    /**
   * Move focus to `items[index]`. When roving tabindex is enabled, also move
   * the tab stop so `index` becomes the sole tabbable item.
   */ const focusIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((items, index)=>{
        const target = items[index];
        if (!target) {
            return;
        }
        if (hasRovingTabIndex) {
            // An owner-placed stop may sit on an element outside `items`, such as
            // a disabled checked radio; it gives way to the target too.
            const listEl = listRef.current;
            const sharing = listEl != null && tabStopOrder != null ? [
                ...items,
                ...tabStopOrder(listEl)
            ] : items;
            for (const el of sharing){
                setTabIndex(el, el === target ? 0 : -1);
            }
        }
        if (focusFollowsLastInput) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusReturn$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusForLastInput"])(target);
        } else {
            target.focus();
        }
    }, [
        hasRovingTabIndex,
        setTabIndex,
        focusFollowsLastInput,
        tabStopOrder
    ]);
    /**
   * Focus an item by index, clamping to valid range.
   */ const focusItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((index)=>{
        const items = getItems();
        if (items.length === 0) {
            return;
        }
        const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
        focusIndex(items, clampedIndex);
    }, [
        getItems,
        focusIndex
    ]);
    /**
   * Focus the first enabled item. Returns true when an item was focused.
   */ const focusFirst = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const items = getItems();
        const index = findItemIndex(items, 0, 1, false);
        if (index !== -1) {
            focusIndex(items, index);
            return true;
        }
        return false;
    }, [
        getItems,
        findItemIndex,
        focusIndex
    ]);
    /**
   * Focus the last enabled item. Returns true when an item was focused.
   */ const focusLast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const items = getItems();
        const index = findItemIndex(items, items.length - 1, -1, false);
        if (index !== -1) {
            focusIndex(items, index);
            return true;
        }
        return false;
    }, [
        getItems,
        findItemIndex,
        focusIndex
    ]);
    /**
   * PageDown / PageUp: move to the last / first enabled item fully
   * visible in the scrolling container. Pressed there again, scroll one
   * viewport further and land on the last / first item then visible. Never
   * wraps; at the end of the list it stays on the last enabled item.
   */ const focusPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((direction)=>{
        const container = listRef.current;
        const items = getItems();
        if (!container || items.length === 0) {
            return;
        }
        const currentIndex = getCurrentIndex();
        const enabledIndices = items.map((item, index)=>isSkippedByKeys(item) ? -1 : index).filter((index)=>index !== -1);
        if (enabledIndices.length === 0) {
            return;
        }
        const edgeVisible = ()=>{
            const bounds = container.getBoundingClientRect();
            const visible = enabledIndices.filter((index)=>{
                const rect = items[index].getBoundingClientRect();
                return rect.top >= bounds.top - 1 && rect.bottom <= bounds.bottom + 1;
            });
            if (visible.length === 0) {
                return -1;
            }
            return direction === 1 ? visible[visible.length - 1] : visible[0];
        };
        const isAhead = (index)=>currentIndex === -1 || (direction === 1 ? index > currentIndex : index < currentIndex);
        if (currentIndex === -1 && direction === -1) {
            focusFirst();
            return;
        }
        let target = edgeVisible();
        if (target === -1 || !isAhead(target)) {
            // Already at the visible edge: one viewport further.
            const before = container.scrollTop;
            container.scrollTop = before + direction * container.clientHeight;
            target = edgeVisible();
            if (target === -1 || !isAhead(target)) {
                // No usable geometry (or nothing moved): step by the number of rows
                // a viewport shows, never wrapping.
                const pageSize = Math.max(1, enabledIndices.filter((index)=>{
                    const bounds = container.getBoundingClientRect();
                    const rect = items[index].getBoundingClientRect();
                    return rect.height > 0 && rect.top >= bounds.top - 1 && rect.bottom <= bounds.bottom + 1;
                }).length);
                const position = enabledIndices.indexOf(currentIndex);
                const from = position === -1 ? direction === 1 ? -1 : enabledIndices.length : position;
                const next = Math.max(0, Math.min(enabledIndices.length - 1, from + direction * pageSize));
                target = enabledIndices[next];
            }
        }
        if (target !== -1 && target !== currentIndex) {
            focusIndex(items, target);
        }
    }, [
        getItems,
        getCurrentIndex,
        isSkippedByKeys,
        focusIndex,
        focusFirst
    ]);
    /**
   * Keep the roving stop pointing at whatever ended up focused (e.g. a click
   * or programmatic focus) so the next Tab behaves correctly. No-op unless
   * roving tabindex is enabled.
   */ const handleFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (hasRovingTabIndex) {
            syncTabStops();
        }
    }, [
        hasRovingTabIndex,
        syncTabStops
    ]);
    /**
   * Handle keyboard navigation.
   */ const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        // Let browser/OS shortcut chords (Ctrl/Cmd/Alt + key) through untouched.
        if (e.ctrlKey || e.metaKey || e.altKey) {
            return;
        }
        // Ignore events that bubbled up from a nested list (e.g. a submenu
        // flyout, which renders inline inside this container). That level owns
        // and already handled them; re-handling here would move focus twice.
        if (!ownsEvent(e)) {
            return;
        }
        // Escape is handled regardless of orientation, but only *consumed* when
        // a handler asked for it: a list with no dismissal to perform must leave
        // the key to whatever host layer does have one, and those defer to
        // `defaultPrevented` (see `useFocusTrap`) or to the native popover.
        if (e.key === 'Escape') {
            if (onEscape) {
                e.preventDefault();
                onEscape();
            }
            return;
        }
        const horizontal = orientation === 'horizontal' || orientation === 'both';
        const vertical = orientation === 'vertical' || orientation === 'both';
        // Resolve which keys advance vs retreat, honoring RTL for horizontal.
        // Direction is resolved lazily — getComputedStyle runs only when a
        // horizontal arrow key is actually pressed (SSR-safe, no layout thrash
        // on unrelated keys).
        const nextKeys = [];
        const prevKeys = [];
        if (horizontal) {
            const rtl = e.key === 'ArrowLeft' || e.key === 'ArrowRight' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$isRtlElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRtlElement"])(listRef.current) : false;
            nextKeys.push(rtl ? 'ArrowLeft' : 'ArrowRight');
            prevKeys.push(rtl ? 'ArrowRight' : 'ArrowLeft');
        }
        if (vertical) {
            nextKeys.push('ArrowDown');
            prevKeys.push('ArrowUp');
        }
        const isNext = nextKeys.includes(e.key);
        const isPrev = prevKeys.includes(e.key);
        const isHome = hasHomeEnd && e.key === 'Home';
        const isEnd = hasHomeEnd && e.key === 'End';
        const isPageDown = hasPaging && e.key === 'PageDown';
        const isPageUp = hasPaging && e.key === 'PageUp';
        if (!isNext && !isPrev && !isHome && !isEnd && !isPageDown && !isPageUp) {
            return;
        }
        // Never hijack a caret key from a nested text input mid-line. Check both
        // the React event target and the actual focused element (events may
        // bubble up to the container).
        if (hasCaretGuard && (shouldDeferToCaret(e.target, e.key) || shouldDeferToCaret(document.activeElement, e.key))) {
            return;
        }
        const currentIndex = getCurrentIndex();
        const items = getItems();
        let nextFrom = currentIndex === -1 ? 0 : currentIndex + 1;
        let prevFrom = currentIndex === -1 ? items.length - 1 : currentIndex - 1;
        // Focus on an owner-placed stop outside `items`, such as a disabled
        // checked radio, moves to the enabled item beside it in document order.
        const active = document.activeElement;
        if (currentIndex === -1 && tabStopOrder != null && active != null && listRef.current?.contains(active)) {
            const after = items.findIndex((item)=>(active.compareDocumentPosition(item) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0);
            nextFrom = after === -1 ? items.length : after;
            prevFrom = nextFrom - 1;
        }
        if (isPageDown) {
            focusPage(1);
        } else if (isPageUp) {
            focusPage(-1);
        } else {
            let target;
            if (isNext) {
                target = findItemIndex(items, nextFrom, 1, wrap, isSkippedByKeys);
            } else if (isPrev) {
                target = findItemIndex(items, prevFrom, -1, wrap, isSkippedByKeys);
            } else if (isHome) {
                target = findItemIndex(items, 0, 1, false, isSkippedByKeys);
            } else {
                target = findItemIndex(items, items.length - 1, -1, false, isSkippedByKeys);
            }
            if (target !== -1) {
                focusIndex(items, target);
            }
        }
        e.preventDefault();
    }, [
        getCurrentIndex,
        getItems,
        wrap,
        orientation,
        hasHomeEnd,
        hasPaging,
        hasCaretGuard,
        findItemIndex,
        isSkippedByKeys,
        focusIndex,
        focusPage,
        onEscape,
        ownsEvent,
        tabStopOrder
    ]);
    return {
        listRef,
        handleKeyDown,
        handleFocus,
        focusItem,
        focusFirst,
        focusLast,
        ownsEvent,
        getItems
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMergedRefs.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMergedRefs",
    ()=>useMergedRefs
]);
/**
 * @file useMergedRefs.ts
 * @input React refs to combine into one stable callback ref
 * @output Exports useMergedRefs
 * @position Core hook; use when one element must receive multiple refs
 *
 * SYNC: When modified, update:
 * - /packages/core/src/hooks/index.ts
 * - /packages/core/src/hooks/useMergedRefs.doc.mjs
 * - /packages/core/src/hooks/useMergedRefs.test.tsx
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeRefs.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
function useMergedRefs(refA, refB, refC, refD, refE, refF) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeRefs"])(refA, refB, refC, refD, refE, refF), [
        refA,
        refB,
        refC,
        refD,
        refE,
        refF
    ]);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/usePressFeedback.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePressFeedback",
    ()=>usePressFeedback
]);
/**
 * @file usePressFeedback.ts
 * @input The document-level press controller (utils/pressFeedback.ts)
 * @output Exports usePressFeedback
 * @position Core hook; every component that paints a press calls it and
 *   spreads its result on the element that paints
 *
 * SYNC: When modified, update:
 * - /packages/core/src/hooks/index.ts
 * - /packages/core/src/hooks/usePressFeedback.doc.mjs
 * - /packages/core/src/utils/pressFeedback.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/pressFeedback.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
function usePressFeedback() {
    // Syncs the shared document listener for press feedback with this mount.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["installPressFeedback"])(), []);
    return __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressableProps"];
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useResolvedRequired.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useResolvedOptionality",
    ()=>useResolvedOptionality,
    "useResolvedRequired",
    ()=>useResolvedRequired
]);
/**
 * @file useResolvedRequired.ts
 * @input Uses React, FormLayoutContext
 * @output Exports useResolvedOptionality and useResolvedRequired
 * @position Resolves a field's effective aria-required, and which optionality
 *   marker its label shows, against the form default
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/FormLayout/FormLayoutContext.ts (defaultOptionality source)
 * - /packages/core/src/FormLayout/FormLayout.tsx (prop doc: aria-required behavior)
 * - /packages/core/src/Field/FieldLabel.tsx (the visible marker)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FormLayout$2f$FormLayoutContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/FormLayout/FormLayoutContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
function useResolvedOptionality({ isRequired = false, isOptional = false }) {
    const { defaultOptionality } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FormLayout$2f$FormLayoutContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormLayoutContext"]);
    const showsOptionalMarker = isOptional && defaultOptionality !== 'optional';
    return {
        isRequired: !isOptional && (isRequired || defaultOptionality === 'required'),
        showsRequiredMarker: !showsOptionalMarker && isRequired && defaultOptionality !== 'required',
        showsOptionalMarker
    };
}
function useResolvedRequired({ isRequired = false, isOptional = false }) {
    return useResolvedOptionality({
        isRequired,
        isOptional
    }).isRequired;
}
}),
];

//# sourceMappingURL=0aq__%40astryxdesign_core_dist_hooks_0714im82845cl._.js.map