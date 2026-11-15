(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/node_modules/@astryxdesign/core/dist/Link/LinkContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LinkContext",
    ()=>LinkContext
]);
/**
 * @file LinkContext.ts
 * @input createSharedContext, LinkComponentType
 * @output Exports LinkContext and LinkContextValue
 * @position Context definition for polymorphic link support
 *
 * Separated from LinkProvider.tsx to allow components to consume
 * the context without pulling in the full provider implementation.
 * Follows the ThemeContext.ts / Theme.tsx pattern.
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Link/LinkProvider.tsx
 * - /packages/core/src/Link/useLinkComponent.ts
 * - /packages/core/src/Link/index.ts
 * - /packages/core/src/Link/Link.doc.mjs
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
const LinkContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSharedContext"])('LinkContext', 1, null);
LinkContext.displayName = 'LinkContext';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Link/LinkProvider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LinkProvider",
    ()=>LinkProvider
]);
/**
 * @file LinkProvider.tsx
 * @input React, LinkContext, LinkComponentType
 * @output Exports LinkProvider component and LinkProviderProps
 * @position Provider component for polymorphic link support
 *
 * Sets the default link component for all Astryx components in the subtree.
 * Individual components can still override via the `as` prop.
 *
 * @example
 * ```
 * import Link from 'next/link';
 * <LinkProvider component={Link}>
 *   <App />
 * </LinkProvider>
 * ```
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Link/index.ts
 * - /packages/core/src/Link/Link.doc.mjs
 * - /packages/cli/assets/templates/blocks/components/Link/ (showcase blocks)
 * - /packages/cli/assets/templates/blocks/components/LinkProvider/ (example blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$LinkContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Link/LinkContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
function LinkProvider({ component, children }) {
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LinkProvider.useMemo[value]": ()=>({
                component
            })
    }["LinkProvider.useMemo[value]"], [
        component
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$LinkContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinkContext"], {
        value: value,
        children: children
    });
}
LinkProvider.displayName = 'LinkProvider';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsomorphicLayoutEffect.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsomorphicLayoutEffect",
    ()=>useIsomorphicLayoutEffect
]);
/**
 * @file useIsomorphicLayoutEffect.ts
 * @input React useLayoutEffect, useEffect
 * @output Exports useIsomorphicLayoutEffect
 * @position Internal utility; used by components that need useLayoutEffect
 *   but must avoid the SSR warning React emits when useLayoutEffect runs
 *   on the server (where there is no DOM to synchronously measure).
 *
 * On the client this is useLayoutEffect; on the server it falls back to
 * useEffect (which is a no-op during SSR anyway). The runtime behavior is
 * identical — neither hook fires during server rendering — but React only
 * warns about useLayoutEffect.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"] : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"];
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMediaQuery.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMediaQuery",
    ()=>useMediaQuery
]);
/**
 * @file useMediaQuery.ts
 * @input Uses React useSyncExternalStore, useCallback, and watchMediaQuery
 *   (utils/coarsePointer.ts)
 * @output Exports useMediaQuery hook for responsive breakpoint detection
 * @position Core hook; used by consumers for responsive patterns
 *
 * SSR-safe media query hook that subscribes to window.matchMedia changes
 * via useSyncExternalStore — the canonical React pattern for external
 * browser state. Every caller of a query shares one watch.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/hooks/index.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$coarsePointer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/coarsePointer.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const watches = new Map();
function subscribeToQuery(query, reader) {
    // A DOM without `matchMedia`, such as a test DOM, has nothing to watch.
    if (typeof window.matchMedia !== 'function') {
        return ()=>{};
    }
    let watch = watches.get(query);
    if (watch == null) {
        const readers = new Set();
        const stop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$coarsePointer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["watchMediaQuery"])(window, query, ()=>{
            for (const each of Array.from(readers)){
                each();
            }
        });
        watch = {
            readers,
            stop
        };
        watches.set(query, watch);
    }
    const entry = watch;
    entry.readers.add(reader);
    return ()=>{
        entry.readers.delete(reader);
        if (entry.readers.size === 0 && watches.get(query) === entry) {
            entry.stop();
            watches.delete(query);
        }
    };
}
function useMediaQuery(query, serverDefault = false) {
    const subscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMediaQuery.useCallback[subscribe]": (onStoreChange)=>subscribeToQuery(query, onStoreChange)
    }["useMediaQuery.useCallback[subscribe]"], [
        query
    ]);
    const getSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMediaQuery.useCallback[getSnapshot]": ()=>typeof window.matchMedia === 'function' ? window.matchMedia(query).matches : serverDefault
    }["useMediaQuery.useCallback[getSnapshot]"], [
        query,
        serverDefault
    ]);
    const getServerSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMediaQuery.useCallback[getServerSnapshot]": ()=>serverDefault
    }["useMediaQuery.useCallback[getServerSnapshot]"], [
        serverDefault
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, getSnapshot, getServerSnapshot);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/naming.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file naming.ts
 * @input None (pure constants/helpers)
 * @output Centralized namespace-prefix constants and helpers for all
 *   externally-observable name surfaces: CSS classes, data attributes,
 *   CSS custom properties, and CSS layer names.
 * @position Single source of truth consumed by the runtime (components,
 *   theme generation) AND by build/CLI tooling (build-theme.mjs, discovery)
 *   via the `@astryxdesign/core/naming` subpath export.
 *
 * ## Why this module exists
 *
 * The namespace prefix `astryx` is part of several externally-observable
 * contracts (`.astryx-button` classes, `data-astryx-theme` attributes,
 * `--astryx-card-padding` custom properties). Historically each of these was
 * hardcoded independently across the runtime, the theme build pipeline, and
 * discovery tooling, kept in sync only by `<!-- SYNC: ... -->` comments.
 * Centralizing the prefix here means it lives in ONE place instead of
 * hundreds of literals.
 *
 * ## Surfaces
 *
 * - CSS classes: `.astryx-button` via {@link classPrefix} / {@link stableClassName}.
 * - data attributes: `data-astryx-*` via {@link dataAttrNamespace} / {@link dataAttr}.
 * - CSS custom properties: `--astryx-*` via {@link cssVarNamespace} / {@link cssVar}.
 * - CSS layers: `astryx-base` / `astryx-theme`.
 *
 * SYNC: packages/core/src/utils/themeProps.ts (consumes classPrefix)
 * SYNC: packages/core/src/utils/parseStyleKey.ts
 * SYNC: packages/cli/src/commands/build-theme.mjs (imports @astryxdesign/core/naming)
 */ /**
 * The DOM/CSS namespace prefix for all externally-observable surfaces
 * (classes, theme/media data attributes, CSS custom properties).
 */ __turbopack_context__.s([
    "NAMESPACE",
    ()=>NAMESPACE,
    "classPrefix",
    ()=>classPrefix,
    "cssVar",
    ()=>cssVar,
    "cssVarNamespace",
    ()=>cssVarNamespace,
    "dataAttr",
    ()=>dataAttr,
    "dataAttrNamespace",
    ()=>dataAttrNamespace,
    "stableClassName",
    ()=>stableClassName
]);
const NAMESPACE = 'astryx';
const classPrefix = NAMESPACE;
const dataAttrNamespace = NAMESPACE;
const cssVarNamespace = NAMESPACE;
function stableClassName(component) {
    return `${classPrefix}-${component}`;
}
function dataAttr(name) {
    return `data-${dataAttrNamespace}-${name}`;
}
function cssVar(name) {
    return `--${cssVarNamespace}-${name}`;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/press.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PRESS_BELIEVED_SELECTOR",
    ()=>PRESS_BELIEVED_SELECTOR
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file privateAttributes/press.ts
 * @input None.
 * @output `PRESS_BELIEVED_SELECTOR`, which matches an element while the press
 *   controller believes a press on it, inside it, or around it.
 * @position Owner module of the private press attribute. The press controller
 *   (utils/pressFeedback.ts) writes the attribute. Its `.stylex.ts` sibling
 *   writes the styles that read it, and the theme engine (theme/) builds a
 *   themed press on this selector. No package entry exports it.
 */ const PRESS_ON = '[data-astryx-press="on"]';
// The public pressable marker (`utils/pressFeedback.ts` PRESSABLE_ATTRIBUTE).
// The theme engine cannot import that runtime module.
const PRESSABLE = '[data-astryx-pressable]';
const PRESS_BELIEVED_SELECTOR = `:is(${PRESS_ON}, ` + `${PRESS_ON} :where(:not(${PRESSABLE}, ${PRESS_ON} ${PRESSABLE} *)), ` + `:where(:not(${PRESSABLE})):has(${PRESS_ON}))`;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/reducedMotion.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reducedMotionMarkProps",
    ()=>reducedMotionMarkProps,
    "setRootReducedMotionMark",
    ()=>setRootReducedMotionMark,
    "themeReducesMotion",
    ()=>themeReducesMotion
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file privateAttributes/reducedMotion.stylex.ts
 * @input Whether a theme reduces motion for everyone
 * @output reducedMotionMarkProps and setRootReducedMotionMark, which write the
 *   mark, and themeReducesMotion, which reads it
 * @position Owner module of the private reduced-motion attribute: the only
 *   file that writes its name. Theme marks its root, and the root theme marks
 *   `<html>`; the animator, reducedMotionFade and the layout glide read it as
 *   the person's Reduce Motion setting. No package entry exports it.
 */ const REDUCED_MOTION = 'data-astryx-reduced-motion';
function reducedMotionMarkProps(isMarked) {
    return isMarked ? {
        [REDUCED_MOTION]: ''
    } : {};
}
function setRootReducedMotionMark(root, isMarked) {
    if (isMarked) {
        root.setAttribute(REDUCED_MOTION, '');
    } else {
        root.removeAttribute(REDUCED_MOTION);
    }
}
function themeReducesMotion(element) {
    return element?.closest?.(`[${REDUCED_MOTION}]`) != null;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/textSizeProbe.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isTextSizeProbe",
    ()=>isTextSizeProbe,
    "markTextSizeProbe",
    ()=>markTextSizeProbe
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file privateAttributes/textSizeProbe.stylex.ts
 * @input The hidden element that measures the reader's text size
 * @output markTextSizeProbe, which marks that element, and isTextSizeProbe,
 *   which reads the mark
 * @position Owner module of the private text-size-probe attribute: the only
 *   file that writes its name. theme/dynamicType.ts marks the one probe the
 *   root Theme runtime keeps on `<body>`. No package entry exports it.
 */ const TEXT_SIZE_PROBE = 'data-astryx-text-size-probe';
function markTextSizeProbe(element) {
    element.setAttribute(TEXT_SIZE_PROBE, '');
}
function isTextSizeProbe(target) {
    return target instanceof Element && target.hasAttribute(TEXT_SIZE_PROBE);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/Theme.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Theme",
    ()=>Theme,
    "ThemeNestingContext",
    ()=>ThemeNestingContext
]);
/**
 * Theme Provider Component
 *
 * Applies theme tokens and sets color-scheme for light-dark() to work.
 * Themes are created with `defineTheme()` and applied via CSS:
 * - Token overrides set as CSS custom properties on [data-astryx-theme]
 * - Component overrides scoped via @scope'd CSS selectors on stable Astryx
 *   target classes combined with reflected `data-*` prop/state attributes
 *
 * Root detection: The first Theme in the tree (no parent Theme)
 * automatically syncs attributes to `document.documentElement`:
 * - `data-theme` — drives `color-scheme` via reset.css rules, ensuring browser
 *   chrome (scrollbars, native form controls, date pickers) reflects the mode.
 * - `data-astryx-theme` — enables @scope'd theme CSS to reach elements rendered
 *   outside the Theme wrapper (portals, toast fallback viewports).
 *
 * The root Theme also reads the reader's text size (iOS Dynamic Type) from a
 * hidden, empty `font: -apple-system-body` probe and keeps the page's scales
 * in an adopted stylesheet; every theme's font sizes follow them, and no
 * attribute is written (see dynamicType.ts).
 *
 * For RSC / SSR, set `data-theme` on `<html>` in your root server layout
 * to avoid a flash of wrong theme before hydration:
 *
 *   <html lang="en" data-theme="dark">
 *
 * @example
 * ```
 * const ocean = defineTheme({
 *   name: 'ocean',
 *   tokens: { '--color-accent': ['#0077B6', '#48CAE4'] },
 *   components: { card: { base: { borderWidth: '2px' } } },
 *   icons: oceanIcons,
 * });
 * <Theme theme={ocean}><App /></Theme>
 * ```
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsomorphicLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$generateThemeRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/generateThemeRules.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/themeRegistry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/naming.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$dynamicType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/dynamicType.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/useTheme.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/devWarning.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeMotion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/themeMotion.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/reducedMotion.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-client] (ecmascript)");
/**
 * Theme provider props
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
/**
 * Styles for the theme wrapper
 */ const wrapperStyles = {
    base: {
        k1xSpc: "xjp7ctv",
        kMwMTN: "x1tgivj0",
        kMv6JI: "x9ynric",
        $$css: true
    },
    light: {
        kQNsl9: "x19aimcq",
        $$css: true
    },
    dark: {
        kQNsl9: "xntwwlm",
        $$css: true
    },
    system: {
        kQNsl9: "x108lcm5",
        $$css: true
    },
    reducedMotion: {
        "--_astryx-reduced-motion": "x1e3mt4b",
        $$css: true
    }
};
const ThemeNestingContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSharedContext"])('ThemeNestingContext', 1, false);
ThemeNestingContext.displayName = 'ThemeNestingContext';
// =============================================================================
// Style injection for unbuilt themes
// =============================================================================
/**
 * The CSS is shared by the whole document. Remove it only when the last
 * `Theme` that uses it unmounts.
 */ const injectedThemes = new Map();
const THEME_LAYER_ORDER = '@layer reset, astryx-base, astryx-theme;';
function writeThemeStyles(theme, id) {
    const { prose, component } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$generateThemeRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateThemeCSS"])(theme);
    const styles = [];
    // Prose defaults go into @layer reset — lowest priority, scoped to
    // the theme region. Any class-based style (StyleX, .xds-*) wins.
    if (prose) {
        const proseStyle = document.createElement('style');
        proseStyle.setAttribute((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataAttr"])('theme-prose'), theme.name);
        proseStyle.setAttribute((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataAttr"])('id'), id);
        proseStyle.textContent = `${THEME_LAYER_ORDER}\n@layer reset {\n${prose}\n}`;
        document.head.appendChild(proseStyle);
        styles.push(proseStyle);
    }
    // Component overrides go into @layer astryx-theme — above StyleX layers
    // so themes can intentionally restyle components.
    if (component) {
        const compStyle = document.createElement('style');
        compStyle.setAttribute((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataAttr"])('theme'), theme.name);
        compStyle.setAttribute((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataAttr"])('id'), id);
        compStyle.textContent = `${THEME_LAYER_ORDER}\n@layer astryx-theme {\n${component}\n}`;
        document.head.appendChild(compStyle);
        styles.push(compStyle);
    }
    return styles;
}
/** Replace an entry's CSS with `theme`'s. */ function rewriteThemeStyles(entry, theme, id) {
    for (const style of entry.styles){
        style.remove();
    }
    entry.theme = theme;
    entry.styles = writeThemeStyles(theme, id);
}
/**
 * Hook to inject theme CSS into the document.
 * Built themes (from `astryx theme build`) skip injection — their CSS
 * is in a separate file imported by the consumer.
 */ function useThemeStyleInjection(theme) {
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const [instance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useThemeStyleInjection.useState": ()=>({})
    }["useThemeStyleInjection.useState"]);
    // Syncs the document's stylesheets with the runtime theme CSS.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInsertionEffect"])({
        "useThemeStyleInjection.useInsertionEffect": ()=>{
            // Built themes have their CSS in a separate file — skip injection
            if (theme.__built) {
                return;
            }
            const themeKey = `astryx-theme-${theme.name}`;
            let entry = injectedThemes.get(themeKey);
            if (entry == null) {
                // One-time perf hint per theme
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warnOnce"])(`theme-injection:${theme.name}`, 'Theme', `"${theme.name}" is using runtime style injection. ` + `For better performance, use the pre-built theme:\n\n` + `  import {${theme.name}Theme} from '@astryxdesign/theme-${theme.name}/built';\n` + `  import '@astryxdesign/theme-${theme.name}/theme.css';\n\n` + `For custom themes, run \`npx @astryxdesign/cli theme build <file>\` to generate ` + `the built artifacts.`);
                entry = {
                    users: new Map(),
                    owner: instance,
                    formerOwner: null,
                    theme,
                    styles: writeThemeStyles(theme, id)
                };
                injectedThemes.set(themeKey, entry);
            }
            // A later `Theme` does no generation. The CSS of the first `Theme` that
            // injected the name stays in the document.
            entry.users.set(instance, {
                theme,
                id
            });
            if (entry.formerOwner === instance) {
                // The owner's own theme changed: its new definition paints, as on main.
                entry.owner = instance;
                entry.formerOwner = null;
                if (entry.theme !== theme) {
                    rewriteThemeStyles(entry, theme, id);
                }
            }
            const current = entry;
            return ({
                "useThemeStyleInjection.useInsertionEffect": ()=>{
                    current.users.delete(instance);
                    if (current.users.size === 0) {
                        for (const style of current.styles){
                            style.remove();
                        }
                        injectedThemes.delete(themeKey);
                        return;
                    }
                    if (current.owner !== instance) {
                        return;
                    }
                    // The earliest-mounted `Theme` that remains takes over the CSS. If its
                    // theme differs, as after a redefinition under the same name, its CSS
                    // replaces the old one.
                    const [nextOwner, next] = [
                        ...current.users
                    ][0];
                    current.owner = nextOwner;
                    current.formerOwner = instance;
                    if (next.theme !== current.theme) {
                        rewriteThemeStyles(current, next.theme, next.id);
                    }
                }
            })["useThemeStyleInjection.useInsertionEffect"];
        }
    }["useThemeStyleInjection.useInsertionEffect"], [
        theme,
        id,
        instance
    ]);
}
// =============================================================================
// Root color-scheme sync
// =============================================================================
/**
 * Hook to sync theme attributes to document.documentElement for the root provider.
 * Skipped for nested Theme instances.
 *
 * Syncs two attributes:
 * - `data-theme` (light/dark) — reset.css maps this to color-scheme, controlling
 *   browser chrome (scrollbars, native form controls, date pickers).
 * - `data-astryx-theme` (theme name) — enables @scope'd theme CSS to reach elements
 *   outside the Theme wrapper (e.g. toast fallback viewports, portals).
 *
 * - 'light' | 'dark' → sets data-theme="light" | "dark"
 * - 'system' → removes data-theme (reset.css defaults to color-scheme: light dark)
 *
 * A theme that reduces motion for everyone also marks `<html>` with
 * `data-astryx-reduced-motion` and its custom property, so layers portaled
 * outside the wrapper reduce their motion too.
 */ function useRootThemeSync(isNested, mode, themeName, reducesMotion) {
    // Syncs the theme attributes on the root `<html>` element.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])({
        "useRootThemeSync.useIsomorphicLayoutEffect": ()=>{
            if (isNested) {
                return;
            }
            if (typeof document === 'undefined') {
                return;
            }
            if (mode === 'light' || mode === 'dark') {
                document.documentElement.setAttribute('data-theme', mode);
            } else {
                // system — remove attribute, let reset.css default apply
                document.documentElement.removeAttribute('data-theme');
            }
            // Sync theme name so @scope rules reach portals/fallback viewports.
            document.documentElement.setAttribute((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataAttr"])('theme'), themeName);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setRootReducedMotionMark"])(document.documentElement, reducesMotion);
            if (reducesMotion) {
                document.documentElement.style.setProperty(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeMotion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["REDUCED_MOTION_PROPERTY"], '1');
            } else {
                document.documentElement.style.removeProperty(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeMotion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["REDUCED_MOTION_PROPERTY"]);
            }
            return ({
                "useRootThemeSync.useIsomorphicLayoutEffect": ()=>{
                    document.documentElement.removeAttribute('data-theme');
                    document.documentElement.removeAttribute((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataAttr"])('theme'));
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setRootReducedMotionMark"])(document.documentElement, false);
                    document.documentElement.style.removeProperty(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeMotion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["REDUCED_MOTION_PROPERTY"]);
                }
            })["useRootThemeSync.useIsomorphicLayoutEffect"];
        }
    }["useRootThemeSync.useIsomorphicLayoutEffect"], [
        isNested,
        mode,
        themeName,
        reducesMotion
    ]);
}
/**
 * Hook to keep the page's text size scales on the reader's text size (iOS
 * Dynamic Type, or `env(preferred-text-scale)` elsewhere) for the root
 * provider; see dynamicType.ts. Skipped for nested Theme instances.
 */ function useRootTextSizeSync(isNested) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])({
        "useRootTextSizeSync.useIsomorphicLayoutEffect": ()=>{
            if (isNested || typeof document === 'undefined') {
                return;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$dynamicType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncReaderTextSize"])(document);
        }
    }["useRootTextSizeSync.useIsomorphicLayoutEffect"], [
        isNested
    ]);
}
function Theme({ theme, mode = 'system', children }) {
    const isNested = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(ThemeNestingContext);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerTheme"])(theme);
    useThemeStyleInjection(theme);
    // resolveMotionKnobs resolves no public theme to 'always', so no theme
    // marks its root.
    const reducesMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeMotion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveMotionKnobs"])(theme.__axes?.motion).reducedMotion === 'always';
    useRootThemeSync(isNested, mode, theme.name, reducesMotion);
    useRootTextSizeSync(isNested);
    // Get color-scheme style
    const colorSchemeStyle = mode === 'dark' ? wrapperStyles.dark : mode === 'light' ? wrapperStyles.light : wrapperStyles.system;
    // Memoize the context value to prevent unnecessary re-renders
    const ctxValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Theme.useMemo[ctxValue]": ()=>({
                theme,
                mode
            })
    }["Theme.useMemo[ctxValue]"], [
        theme,
        mode
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeContext"], {
        value: ctxValue,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(ThemeNestingContext, {
            value: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](wrapperStyles.base, colorSchemeStyle, reducesMotion && wrapperStyles.reducedMotion),
                "data-astryx-theme": theme.name,
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reducedMotionMarkProps"])(reducesMotion),
                "data-theme": mode === 'system' ? undefined : mode,
                children: children
            })
        })
    });
}
Theme.displayName = 'Theme';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/contrast.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compositeOver",
    ()=>compositeOver,
    "contrastRatio",
    ()=>contrastRatio,
    "relativeLuminance",
    ()=>relativeLuminance
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file contrast.ts
 * @input CSS color strings (hex, rgb()/rgba()) or parsed RGBA values
 * @output WCAG 2.x relative luminance and contrast ratios
 * @position Theme utility; consumed by expandColorScale.ts and theme tests
 *
 * Dependency-free WCAG 2.x contrast math. Backs the contrast guarantees
 * for generated color tokens (WCAG 1.4.3 text contrast >= 4.5:1,
 * WCAG 1.4.11 non-text contrast >= 3:1).
 *
 * Semi-transparent foregrounds are composited over their backdrop in
 * gamma-encoded sRGB space (matching CSS alpha compositing) before the
 * ratio is measured — a translucent token has no contrast of its own,
 * only against what it renders on.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/color.js [app-client] (ecmascript)");
;
function relativeLuminance(color) {
    const channel = (c)=>{
        const s = c / 255;
        return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b);
}
function compositeOver(foreground, backdrop) {
    const a = foreground.a;
    return {
        r: foreground.r * a + backdrop.r * (1 - a),
        g: foreground.g * a + backdrop.g * (1 - a),
        b: foreground.b * a + backdrop.b * (1 - a),
        a: 1
    };
}
function resolve(value, label) {
    if (typeof value !== 'string') {
        return value;
    }
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseColor"])(value);
    if (parsed === null) {
        throw new TypeError(`contrastRatio: could not parse ${label} "${value}"`);
    }
    return parsed;
}
function contrastRatio(foreground, background) {
    const bg = resolve(background, 'background');
    if (bg.a < 1) {
        throw new TypeError('contrastRatio: background must be opaque — composite it over its backdrop first');
    }
    let fg = resolve(foreground, 'foreground');
    if (fg.a < 1) {
        fg = compositeOver(fg, bg);
    }
    const lumA = relativeLuminance(fg);
    const lumB = relativeLuminance(bg);
    const lighter = Math.max(lumA, lumB);
    const darker = Math.min(lumA, lumB);
    return (lighter + 0.05) / (darker + 0.05);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/declarationBoundary.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeDeclarationValue",
    ()=>analyzeDeclarationValue,
    "canonicalizeDeclarationName",
    ()=>canonicalizeDeclarationName,
    "checkDeclarationName",
    ()=>checkDeclarationName,
    "checkDeclarationValue",
    ()=>checkDeclarationValue
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file Declaration boundary scanner
 *
 * Decides whether a consumer-supplied property name and value can be emitted
 * as exactly one CSS declaration, `name: value;`, without the value ending
 * the declaration early or swallowing what follows it. Theme definitions are
 * code, but apps assemble them from stored input (brand colors,
 * white-labeling), so the generated stylesheet must never extend beyond the
 * declarations it means to emit.
 *
 * The scanner follows the CSS Syntax Module Level 3 tokenizer for everything
 * that decides where a declaration ends: strings with backslash escapes and
 * line continuations, comments, `url()` with an unquoted body, escaped code
 * points outside strings, and `()`, `[]`, `{}` block nesting. Inside any of
 * those a `;` or a brace is inert, exactly as a browser reads it, so a `data:`
 * URI, `Gill\ Sans`, or a closed comment passes through byte-identically.
 * Only what a browser would read as the end of the declaration or rule is
 * rejected: an unnested `;`, `{` or `}`, an unbalanced closer, and anything
 * left open at the end of the value (a string, comment, block, or url whose
 * closer would then be the generator's own `;` or `}`). A `bad-string` or
 * `bad-url` token is rejected as well: the browser would discard the
 * declaration anyway, and a diagnostic beats a silent no-op.
 *
 * @input A property name or a declaration value as authored in a theme
 * @output `null` when it can be emitted, otherwise the reason it cannot
 * @position packages/core/src/theme/declarationBoundary.ts
 */ /** Newline per CSS Syntax §4.2 (after preprocessing, CR and FF are newlines). */ function isNewline(ch) {
    return ch === '\n' || ch === '\r' || ch === '\f';
}
function isWhitespace(ch) {
    return ch === ' ' || ch === '\t' || isNewline(ch);
}
function isHexDigit(ch) {
    return /^[0-9a-fA-F]$/.test(ch);
}
/** Name-start code point: letter, underscore, or any non-ASCII code point. */ function isNameStart(ch) {
    return /^[A-Za-z_]$/.test(ch) || ch.charCodeAt(0) >= 0x80;
}
function isNameChar(ch) {
    return isNameStart(ch) || /^[0-9-]$/.test(ch);
}
/** CSS Syntax §3.3 preprocessing, for scanning only; emitted bytes stay intact. */ function preprocess(input) {
    const normalized = input.replace(/\r\n?|\f/g, '\n').replace(/\0/g, '\uFFFD');
    let output = '';
    for(let index = 0; index < normalized.length; index++){
        const code = normalized.charCodeAt(index);
        if (code >= 0xd800 && code <= 0xdbff) {
            const next = normalized.charCodeAt(index + 1);
            if (next >= 0xdc00 && next <= 0xdfff) {
                output += normalized[index] + normalized[index + 1];
                index++;
            } else {
                output += '\uFFFD';
            }
        } else if (code >= 0xdc00 && code <= 0xdfff) {
            output += '\uFFFD';
        } else {
            output += normalized[index];
        }
    }
    return output;
}
/** Non-printable code points make an unquoted url() a bad-url token. */ // eslint-disable-next-line no-control-regex -- these code points are the subject
const NON_PRINTABLE = /[\x01-\x08\x0b\x0e-\x1f\x7f]/;
/** "Check if two code points are a valid escape" (§4.3.8). */ function isValidEscape(input, pos) {
    return input[pos] === '\\' && pos + 1 < input.length && !isNewline(input[pos + 1]);
}
/** "Check if three code points would start an ident sequence" (§4.3.9). */ function startsIdent(input, pos) {
    const ch = input[pos];
    if (ch === '-') {
        const next = input[pos + 1];
        return next !== undefined && (next === '-' || isNameStart(next) || isValidEscape(input, pos + 1));
    }
    if (ch === '\\') {
        return isValidEscape(input, pos);
    }
    return ch !== undefined && isNameStart(ch);
}
/**
 * "Consume an escaped code point" (§4.3.7), positioned after the backslash.
 * Returns the position after the escape. A hex escape takes up to six hex
 * digits plus one optional whitespace; anything else takes one code point.
 */ function consumeEscape(input, pos) {
    if (isHexDigit(input[pos])) {
        let end = pos;
        while(end < input.length && end - pos < 6 && isHexDigit(input[end])){
            end++;
        }
        if (end < input.length && isWhitespace(input[end])) {
            end++;
        }
        return end;
    }
    // A surrogate pair is one code point.
    const code = input.codePointAt(pos) ?? 0;
    return pos + (code > 0xffff ? 2 : 1);
}
/**
 * "Consume an ident sequence" (§4.3.11) starting at `pos`. Returns the
 * position after it and the decoded name (escapes resolved, for the
 * case-insensitive `url` check; hex escapes decode to their code point).
 */ function consumeIdent(input, pos) {
    let name = '';
    let i = pos;
    while(i < input.length){
        const ch = input[i];
        if (isNameChar(ch)) {
            name += ch;
            i++;
        } else if (isValidEscape(input, i)) {
            const end = consumeEscape(input, i + 1);
            if (isHexDigit(input[i + 1])) {
                const hex = input.slice(i + 1, end).trim();
                const code = parseInt(hex, 16);
                name += code === 0 || code > 0x10ffff || code >= 0xd800 && code <= 0xdfff ? '\uFFFD' : String.fromCodePoint(code);
            } else {
                name += input.slice(i + 1, end);
            }
            i = end;
        } else {
            break;
        }
    }
    return {
        end: i,
        name
    };
}
/**
 * "Consume a string token" (§4.3.5), positioned at the opening quote.
 * Returns the position after the closing quote, or a rejection reason.
 */ function consumeString(input, pos) {
    const quote = input[pos];
    let i = pos + 1;
    while(i < input.length){
        const ch = input[i];
        if (ch === quote) {
            return {
                end: i + 1
            };
        }
        if (isNewline(ch)) {
            // A raw newline ends the string as a bad-string token; the browser
            // discards the declaration, so a diagnostic is more useful than
            // reasoning about where that leaves the next `;`.
            return {
                reason: 'a newline inside a quoted string makes a bad string'
            };
        }
        if (ch === '\\') {
            if (i + 1 >= input.length) {
                break;
            }
            // Escaped newline is a line continuation; any other escape consumes
            // the escaped code point (so `\"` never closes the string).
            i = isNewline(input[i + 1]) ? i + 2 : consumeEscape(input, i + 1);
            continue;
        }
        i++;
    }
    return {
        reason: `an unclosed ${quote} string would swallow the rest of the rule`
    };
}
/**
 * "Consume a url token" (§4.3.6), positioned after `url(` and any leading
 * whitespace, with a non-quote next code point. Returns the position after
 * the closing `)`, or a rejection reason (bad-url or unclosed).
 */ function consumeUrl(input, pos) {
    let i = pos;
    while(i < input.length){
        const ch = input[i];
        if (ch === ')') {
            return {
                end: i + 1
            };
        }
        if (isWhitespace(ch)) {
            while(i < input.length && isWhitespace(input[i])){
                i++;
            }
            if (i >= input.length) {
                break;
            }
            if (input[i] === ')') {
                return {
                    end: i + 1
                };
            }
            return {
                reason: 'whitespace inside an unquoted url() makes a bad url'
            };
        }
        if (NON_PRINTABLE.test(ch)) {
            return {
                reason: 'a non-printable character inside url() makes a bad url'
            };
        }
        if (ch === '"' || ch === "'" || ch === '(') {
            return {
                reason: `"${ch}" inside an unquoted url() makes a bad url; quote the URL instead`
            };
        }
        if (ch === '\\') {
            if (!isValidEscape(input, i)) {
                return {
                    reason: 'a stray backslash inside url() makes a bad url'
                };
            }
            i = consumeEscape(input, i + 1);
            continue;
        }
        i++;
    }
    return {
        reason: 'an unclosed url( would swallow the rest of the rule'
    };
}
const CLOSER = {
    '(': ')',
    '[': ']',
    '{': '}'
};
function checkDeclarationValue(input) {
    const value = preprocess(input);
    const open = [];
    let i = 0;
    while(i < value.length){
        const ch = value[i];
        if (ch === '/' && value[i + 1] === '*') {
            const close = value.indexOf('*/', i + 2);
            if (close === -1) {
                return 'an unclosed /* comment would swallow the rest of the rule';
            }
            i = close + 2;
            continue;
        }
        if (ch === '"' || ch === "'") {
            const result = consumeString(value, i);
            if ('reason' in result) {
                return result.reason;
            }
            i = result.end;
            continue;
        }
        if (startsIdent(value, i)) {
            const ident = consumeIdent(value, i);
            i = ident.end;
            if (value[i] === '(' && ident.name.toLowerCase() === 'url') {
                let j = i + 1;
                while(j < value.length && isWhitespace(value[j])){
                    j++;
                }
                if (value[j] === '"' || value[j] === "'") {
                    // `url("...")` is an ordinary function token; the string and the
                    // closing paren are handled by the loop.
                    open.push(')');
                    i = i + 1;
                    continue;
                }
                const result = consumeUrl(value, j);
                if ('reason' in result) {
                    return result.reason;
                }
                i = result.end;
            }
            continue;
        }
        if (ch === '\\') {
            if (i + 1 >= value.length) {
                // `\` followed by the generator's own `;` would escape it.
                return 'a trailing backslash would escape the declaration terminator';
            }
            // `\` + newline is not an escape: the backslash is a delim and the
            // newline is whitespace. Anything else escapes the next code point.
            i = isNewline(value[i + 1]) ? i + 1 : consumeEscape(value, i + 1);
            continue;
        }
        if (ch === '(' || ch === '[' || ch === '{') {
            if (ch === '{' && open.length === 0) {
                return 'an unquoted "{" would open a nested block';
            }
            open.push(CLOSER[ch]);
            i++;
            continue;
        }
        if (ch === ')' || ch === ']' || ch === '}') {
            if (open.length === 0) {
                return ch === '}' ? 'an unquoted "}" would close the rule' : `an unbalanced "${ch}" has nothing to close`;
            }
            const expected = open.pop();
            if (expected !== ch) {
                return `"${ch}" does not close the open "${expected === ')' ? '(' : expected === ']' ? '[' : '{'}"`;
            }
            i++;
            continue;
        }
        if (ch === ';' && open.length === 0) {
            return 'an unquoted ";" would end the declaration';
        }
        i++;
    }
    if (open.length > 0) {
        const closer = open[open.length - 1];
        const opener = closer === ')' ? '(' : closer === ']' ? '[' : '{';
        return `an unclosed "${opener}" would swallow the rest of the rule`;
    }
    return null;
}
function skipWhitespaceAndComments(input, start) {
    let index = start;
    for(;;){
        while(index < input.length && isWhitespace(input[index])){
            index++;
        }
        if (input[index] !== '/' || input[index + 1] !== '*') {
            return index;
        }
        const close = input.indexOf('*/', index + 2);
        if (close === -1) {
            return input.length;
        }
        index = close + 2;
    }
}
function varReferenceAt(input, openParen) {
    const start = skipWhitespaceAndComments(input, openParen + 1);
    if (!startsIdent(input, start)) {
        return null;
    }
    const token = consumeIdent(input, start);
    if (!token.name.startsWith('--')) {
        return null;
    }
    const end = skipWhitespaceAndComments(input, token.end);
    return input[end] === ',' || input[end] === ')' ? token.name : null;
}
function startsNumber(input, position) {
    const first = input[position];
    const second = input[position + 1];
    const third = input[position + 2];
    if (first === '+' || first === '-') {
        return /^[0-9]$/.test(second ?? '') || second === '.' && /^[0-9]$/.test(third ?? '');
    }
    return /^[0-9]$/.test(first ?? '') || first === '.' && /^[0-9]$/.test(second ?? '');
}
function consumeNumber(input, position) {
    let index = position;
    if (input[index] === '+' || input[index] === '-') {
        index++;
    }
    while(/^[0-9]$/.test(input[index] ?? '')){
        index++;
    }
    if (input[index] === '.' && /^[0-9]$/.test(input[index + 1] ?? '')) {
        index += 2;
        while(/^[0-9]$/.test(input[index] ?? '')){
            index++;
        }
    }
    if ((input[index] === 'e' || input[index] === 'E') && (/^[0-9]$/.test(input[index + 1] ?? '') || (input[index + 1] === '+' || input[index + 1] === '-') && /^[0-9]$/.test(input[index + 2] ?? ''))) {
        index++;
        if (input[index] === '+' || input[index] === '-') {
            index++;
        }
        while(/^[0-9]$/.test(input[index] ?? '')){
            index++;
        }
    }
    return index;
}
const DECLARATION_ANALYSIS_CACHE = new Map();
const MAX_DECLARATION_ANALYSIS_CACHE = 4096;
function analyzeDeclarationValue(input) {
    const cached = DECLARATION_ANALYSIS_CACHE.get(input);
    if (cached !== undefined) {
        return cached;
    }
    const reason = checkDeclarationValue(input);
    if (reason !== null) {
        const analysis = {
            reason,
            references: [],
            important: false,
            singleVarReference: null
        };
        if (DECLARATION_ANALYSIS_CACHE.size >= MAX_DECLARATION_ANALYSIS_CACHE) {
            DECLARATION_ANALYSIS_CACHE.clear();
        }
        DECLARATION_ANALYSIS_CACHE.set(input, analysis);
        return analysis;
    }
    const value = preprocess(input);
    const references = [];
    const open = [];
    const topLevelTokens = [];
    const firstTopLevelTokens = [];
    let topLevelTokenCount = 0;
    const recordTopLevel = (token)=>{
        if (open.length === 0) {
            topLevelTokenCount++;
            if (firstTopLevelTokens.length === 0) {
                firstTopLevelTokens.push(token);
            }
            topLevelTokens.push(token);
            if (topLevelTokens.length > 2) {
                topLevelTokens.shift();
            }
        }
    };
    let index = 0;
    while(index < value.length){
        const character = value[index];
        if (isWhitespace(character)) {
            index++;
            continue;
        }
        if (character === '/' && value[index + 1] === '*') {
            index = value.indexOf('*/', index + 2) + 2;
            continue;
        }
        if (character === '"' || character === "'") {
            recordTopLevel({
                type: 'other',
                value: character
            });
            const string = consumeString(value, index);
            index = 'end' in string ? string.end : value.length;
            continue;
        }
        if (character === '#') {
            const nameStart = index + 1;
            if (isNameChar(value[nameStart]) || isValidEscape(value, nameStart)) {
                recordTopLevel({
                    type: 'other',
                    value: '#'
                });
                index = consumeIdent(value, nameStart).end;
                continue;
            }
        }
        if (character === '@' && startsIdent(value, index + 1)) {
            recordTopLevel({
                type: 'other',
                value: '@'
            });
            index = consumeIdent(value, index + 1).end;
            continue;
        }
        if (startsNumber(value, index)) {
            recordTopLevel({
                type: 'other',
                value: character
            });
            index = consumeNumber(value, index);
            if (startsIdent(value, index)) {
                index = consumeIdent(value, index).end;
            } else if (value[index] === '%') {
                index++;
            }
            continue;
        }
        if (startsIdent(value, index)) {
            const ident = consumeIdent(value, index);
            index = ident.end;
            const isFunction = value[index] === '(';
            const reference = isFunction && ident.name.toLowerCase() === 'var' ? varReferenceAt(value, index) : null;
            recordTopLevel(reference !== null ? {
                type: 'var-function',
                value: ident.name,
                reference
            } : {
                type: isFunction ? 'other' : 'ident',
                value: ident.name
            });
            if (isFunction) {
                if (reference !== null) {
                    references.push(reference);
                }
                if (ident.name.toLowerCase() === 'url') {
                    let body = index + 1;
                    while(body < value.length && isWhitespace(value[body])){
                        body++;
                    }
                    if (value[body] !== '"' && value[body] !== "'") {
                        const url = consumeUrl(value, body);
                        index = 'end' in url ? url.end : value.length;
                        continue;
                    }
                }
                open.push(')');
                index++;
            }
            continue;
        }
        if (character === '(' || character === '[' || character === '{') {
            recordTopLevel({
                type: 'other',
                value: character
            });
            open.push(CLOSER[character]);
            index++;
            continue;
        }
        if (character === ')' || character === ']' || character === '}') {
            open.pop();
            index++;
            continue;
        }
        if (character === '!') {
            recordTopLevel({
                type: 'delim',
                value: character
            });
        } else {
            recordTopLevel({
                type: 'other',
                value: character
            });
        }
        index++;
    }
    const previousTopLevel = topLevelTokens.at(-2);
    const lastTopLevel = topLevelTokens.at(-1);
    const important = previousTopLevel?.type === 'delim' && previousTopLevel.value === '!' && lastTopLevel?.type === 'ident' && lastTopLevel.value.toLowerCase() === 'important';
    const firstTopLevelToken = firstTopLevelTokens[0];
    const singleVarReference = topLevelTokenCount - (important ? 2 : 0) === 1 && firstTopLevelToken?.type === 'var-function' ? firstTopLevelToken.reference ?? null : null;
    const analysis = {
        reason: null,
        references,
        important,
        singleVarReference
    };
    if (DECLARATION_ANALYSIS_CACHE.size >= MAX_DECLARATION_ANALYSIS_CACHE) {
        DECLARATION_ANALYSIS_CACHE.clear();
    }
    DECLARATION_ANALYSIS_CACHE.set(input, analysis);
    return analysis;
}
function canonicalizeDeclarationName(input) {
    const name = preprocess(input);
    if (name.length === 0 || !startsIdent(name, 0)) {
        return null;
    }
    const ident = consumeIdent(name, 0);
    return ident.end === name.length ? ident.name : null;
}
function checkDeclarationName(input) {
    const name = preprocess(input);
    if (name.length === 0 || !startsIdent(name, 0)) {
        return 'a property name must be a CSS identifier';
    }
    const { end } = consumeIdent(name, 0);
    if (end !== name.length) {
        return `a property name must be one CSS identifier; "${name[end]}" cannot appear in one`;
    }
    return null;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/defineTheme.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defineTheme",
    ()=>defineTheme,
    "isDefinedTheme",
    ()=>isDefinedTheme,
    "tokenDefaults",
    ()=>tokenDefaults
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * defineTheme — Create an Astryx theme from a flat token map.
 *
 * Adaptations resolve against the effective root axes and components, retaining
 * authored component pins without repeating root typography defaults.
 *
 * Two distribution modes:
 * - Unbuilt: Theme generates CSS and injects a <style> tag at runtime
 * - Built: `astryx theme build` pre-compiles to a CSS file; Theme just
 *   sets the data-astryx-theme attribute
 *
 * Token values can be:
 * - A string: used as-is for both light and dark modes
 * - A [light, dark] tuple: converted to light-dark(light, dark)
 *
 * @example
 * ```
 * const oceanTheme = defineTheme({
 *   name: 'ocean',
 *   tokens: {
 *     '--color-accent': ['#0077B6', '#48CAE4'],    // [light, dark]
 *     '--color-background-surface': ['#F0F8FF', '#0A1628'],
 *     '--radius-container': '16px',                     // same in both modes
 *   },
 *   icons: oceanIcons,
 * });
 *
 * <Theme theme={oceanTheme}>
 *   <App />
 * </Theme>
 * ```
 *
 * SYNC: `DefineThemeInput` is the theme surface. Adding, removing, or renaming
 * a field means updating:
 * - /packages/cli/assets/theme.template.ts (documents every field; the
 *   drift guard is scripts/check-theme-template.test.mjs)
 * - /packages/cli/assets/docs/theme.doc.mjs (`astryx docs theme`)
 */ /**
 * Icon overrides a theme may declare: any built-in semantic name, plus the
 * namespaced keys components and libraries own (`'richtext:bold'`). Each entry
 * is a React node or a pure synchronous function of `{size, variant}`, where
 * `variant` is one of `Variant` or `undefined`.
 */ /**
 * The variant names a base theme lists: exact for a theme from `defineTheme`,
 * any string for another `DefinedTheme`, none without a base.
 */ /**
 * The variant names a theme lists: its own `iconVariants` when it sets the
 * field, otherwise the list it inherits from `extends`.
 */ /**
 * The same names, as a type `defineTheme` does not infer from: only
 * `iconVariants` and `extends` decide a theme's names, never the parameter
 * types of its icon entry functions.
 */ /** The node-valued view of a theme's icons that public reads return. */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$onMediaTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/onMediaTokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$resolveThemeValues$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/resolveThemeValues.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeAdaptations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/themeAdaptations.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$domainTokens$2f$domainTokenDefaults$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/domainTokens/domainTokenDefaults.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/themeRegistry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$localTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/localTokens.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
const tokenDefaults = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorDefaults"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacingDefaults"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sizeDefaults"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["borderDefaults"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusDefaults"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radiusDefaults"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shadowDefaults"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["durationDefaults"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easeDefaults"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["typographyDefaults"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textSizeDefaults"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontWeightDefaults"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["typeScaleDefaults"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$domainTokens$2f$domainTokenDefaults$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["domainTokenDefaults"]
};
// =============================================================================
// defineTheme
// =============================================================================
/**
 * Describe a rejected `extends` value for the error message — enough to tell a
 * missed import (`undefined`) from a module namespace or a plain object.
 */ function describeBadBase(value) {
    if (value === undefined) {
        return 'undefined';
    }
    if (value === null) {
        return 'null';
    }
    if (typeof value !== 'object') {
        return typeof value;
    }
    const keys = Object.keys(value);
    return `an object with keys [${keys.slice(0, 4).join(', ')}${keys.length > 4 ? ', …' : ''}]`;
}
/** The slow band's duration tokens. */ const SLOW_BAND = [
    '--duration-slow-min',
    '--duration-slow',
    '--duration-slow-max'
];
/**
 * The base's tokens for the duration-scale fields a child leaves unset
 * (spec:AST-108 FR5, field by field): a child that sets no `slow` of its own
 * regenerates only the fast and medium bands, so an inherited slow band stays
 * as the base's tokens hold it, at the ratio it was made with; and a child
 * that sets no `easing` keeps the base's `--ease-standard`, an explicit one
 * included, however many themes down either is inherited.
 */ function inheritedScaleTokens(base, baseMotion, own) {
    const names = [
        ...'slow' in baseMotion && !('slow' in own) ? SLOW_BAND : [],
        ...'easing' in baseMotion && !('easing' in own) ? [
            '--ease-standard'
        ] : []
    ];
    if (names.length === 0) {
        return undefined;
    }
    const tokens = base.tokens;
    return Object.fromEntries(names.flatMap((name)=>tokens[name] !== undefined ? [
            [
                name,
                tokens[name]
            ]
        ] : []));
}
/**
 * Refuses a duration scale that is missing `fast`, `medium` or `ratio` after
 * inheritance. The scale applies only when all three are present, so a partial
 * one beside a knob (`{fast: 100, tempo: 1.2}`) would otherwise be dropped
 * silently, though its fields win over `tempo` (spec:AST-108 FR5). Adaptation
 * rules refuse the same in `completeMotion`.
 */ function assertCompleteMotionScale(motion, themeName) {
    const scale = motion;
    const writesScale = scale.fast !== undefined || scale.medium !== undefined || scale.ratio !== undefined || scale.slow !== undefined || scale.easing !== undefined;
    if (writesScale && (scale.fast === undefined || scale.medium === undefined || scale.ratio === undefined)) {
        throw new Error(`defineTheme("${themeName}"): \`motion\` sets a duration scale field, so it must supply \`fast\`, \`medium\`, and \`ratio\` unless each missing field is inherited from \`extends\`.`);
    }
}
function defineTheme(input) {
    // Pre-seed from the base theme when `extends` is provided (lowest precedence).
    // A base that is not a theme is refused rather than ignored: `extends` used
    // to inherit nothing when its value was undefined, which is what a named
    // import silently resolving to the wrong module hands over, and the theme
    // then built into a plausible-looking stylesheet missing everything it was
    // supposed to inherit.
    if ('extends' in input && !isDefinedTheme(input.extends)) {
        throw new Error(`defineTheme("${input.name}"): \`extends\` must be a theme from defineTheme(), got ${describeBadBase(input.extends)}. ` + `Check that the import naming your base theme resolves to its source and exports that name — ` + `a generated \`<theme>.js\` artifact sitting next to the source exports \`<name>Theme\`, not the source's own export.`);
    }
    const base = input.extends;
    // The theme's own value axes and the resolved base an `extends` supplies.
    // The same axis metadata is retained so adaptation rules can complete partial
    // configs without approximating values from unrelated built-in defaults.
    //
    // Motion inherits field by field (spec:AST-108 FR5): a duration-scale field
    // or knob the child leaves unset keeps its base's value, so the child's
    // motion tokens come from the merged configuration. They resolve base first,
    // then generated (`architecture:theme-authoring-contract`): what the child
    // generates replaces the base's tokens, its explicit ones included. A
    // child's motion regenerates only what it sets: an inherited slow band and
    // an inherited easing keep the base's tokens.
    const baseMotion = base?.__axes?.motion;
    const motion = input.motion != null && baseMotion != null ? {
        ...baseMotion,
        ...input.motion
    } : input.motion;
    if (motion != null) {
        assertCompleteMotionScale(motion, input.name);
    }
    const inheritedScale = input.motion != null && base != null && baseMotion != null ? inheritedScaleTokens(base, baseMotion, input.motion) : undefined;
    const ownValues = {
        typography: input.typography,
        color: input.color,
        radius: input.radius,
        motion,
        syntax: input.syntax,
        tokens: inheritedScale != null && Object.keys(inheritedScale).length > 0 ? {
            ...inheritedScale,
            ...input.tokens
        } : input.tokens,
        components: input.components
    };
    const ownAxes = {
        typography: input.typography,
        color: input.color,
        radius: input.radius,
        motion: input.motion
    };
    const seed = base ? {
        tokens: base.tokens,
        components: base.components
    } : undefined;
    // An explicit --ease-standard follows the character the theme inherits
    // when it sets no motion of its own (FR2).
    const { tokens, components } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$resolveThemeValues$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveThemeValues"])(ownValues, seed, {
        inheritedCharacter: baseMotion?.character
    });
    // On-media token overrides (base's resolved surface, then defaults, then
    // this theme's own overrides). They compile after adaptations so the
    // media-surface value stays more specific in the authored cascade.
    const __onDark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$onMediaTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveOnMedia"])('dark', input.onDark, base?.__onDark);
    const __onLight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$onMediaTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveOnMedia"])('light', input.onLight, base?.__onLight);
    const localTokenContract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$localTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveLocalTokenContract"])(input, base, tokens, tokenDefaults);
    // Adaptations inherit their breakpoint map and ordered rules. Every rule is
    // re-resolved against this theme's effective root axes, so a child can change
    // the root scale while preserving the base rule's authored intent.
    const __axes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeAdaptations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveThemeGenerativeAxes"])(base?.__axes, ownAxes);
    const __adaptations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeAdaptations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeThemeAdaptations"])(input.name, base?.__adaptations, input.adaptations);
    const __adaptationRules = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeAdaptations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveThemeAdaptationRules"])(input.name, __adaptations, __axes, tokens, localTokenContract?.localTokens, components);
    // Icons — input entries override base entries by key. The base's entries
    // include its function entries, which its node-valued `icons` does not.
    const baseIcons = base?.__icons ?? base?.icons;
    const iconEntries = input.icons && baseIcons ? {
        ...baseIcons,
        ...input.icons
    } : input.icons ?? baseIcons;
    const icons = readThemeIconNodes(iconEntries);
    // The variant list is theme-level: a list this theme sets replaces the
    // inherited one; an omitted list is inherited.
    const iconVariants = input.iconVariants !== undefined ? [
        ...input.iconVariants
    ] : base?.iconVariants;
    // An inherited function entry keeps the list of the theme that defined it,
    // so it receives a variant only when both lists contain it.
    const iconEntryVariants = resolveIconEntryVariants(iconEntries, input.icons, base, iconVariants);
    // The base's static `componentIcons` view omits its slot functions, so read
    // its `__componentIcons` first.
    const componentIconValues = mergeComponentIcons(base?.__componentIcons ?? base?.componentIcons, input.componentIcons);
    const componentIcons = staticComponentIcons(componentIconValues);
    // Indicator overrides merge by name, like icons: a child theme replacing one
    // indicator keeps the ones its base replaced.
    const indicators = input.indicators && base?.indicators ? {
        ...base.indicators,
        ...input.indicators
    } : input.indicators ?? base?.indicators;
    const theme = {
        name: input.name,
        tokens,
        ...localTokenContract ? {
            localTokens: localTokenContract.localTokens,
            __localTokenOwners: localTokenContract.owners,
            __localTokenLineage: localTokenContract.lineage
        } : {},
        components,
        icons,
        ...icons !== iconEntries ? {
            __icons: iconEntries
        } : {},
        ...iconVariants !== undefined ? {
            iconVariants
        } : {},
        ...iconEntryVariants !== undefined ? {
            __iconEntryVariants: iconEntryVariants
        } : {},
        ...componentIcons !== undefined ? {
            componentIcons
        } : {},
        ...componentIcons !== componentIconValues ? {
            __componentIcons: componentIconValues
        } : {},
        indicators,
        __inputTokens: base?.__inputTokens || input.tokens ? {
            ...base?.__inputTokens,
            ...input.tokens
        } : undefined,
        __onDark,
        __onLight,
        __adaptations,
        __adaptationRules,
        __axes
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerTheme"])(theme);
    return theme;
}
/**
 * For each function entry this theme inherits, the variant list of the theme
 * that defined it, where that list is not this theme's own. Entries this theme
 * defines use its own list, so they need no record.
 */ function resolveIconEntryVariants(entries, ownEntries, base, iconVariants) {
    if (entries == null || base == null) {
        return undefined;
    }
    const baseRecord = base.__iconEntryVariants;
    let record;
    for (const [name, entry] of Object.entries(entries)){
        if (typeof entry !== 'function' || ownEntries != null && Object.hasOwn(ownEntries, name)) {
            continue;
        }
        const definingVariants = baseRecord != null && Object.hasOwn(baseRecord, name) ? baseRecord[name] : base.iconVariants;
        if (definingVariants !== iconVariants) {
            record ??= {};
            record[name] = definingVariants;
        }
    }
    return record;
}
/**
 * A theme's slot values: the base's, then this theme's own, by slot. An own
 * entry replaces the inherited one whole; an `undefined` entry is omitted, so
 * the inherited one stays.
 */ function mergeComponentIcons(inherited, own) {
    if (own == null) {
        return inherited;
    }
    const merged = {
        ...inherited
    };
    for (const [slot, value] of Object.entries(own)){
        if (value !== undefined) {
            merged[slot] = value;
        }
    }
    return merged;
}
/**
 * The static view of a theme's slot values, without its slot functions.
 * Values without a function are returned as the same object.
 */ function staticComponentIcons(values) {
    if (values == null || !Object.values(values).some((value)=>typeof value === 'function')) {
        return values;
    }
    const view = {};
    for (const [slot, value] of Object.entries(values)){
        if (typeof value !== 'function') {
            view[slot] = value;
        }
    }
    return view;
}
/**
 * The node-valued view of a theme's icon entries: each function entry read at
 * `{size: 'md'}`. Entries without a function are returned as the same object.
 */ function readThemeIconNodes(entries) {
    if (entries == null || !Object.values(entries).some((entry)=>typeof entry === 'function')) {
        return entries;
    }
    const nodes = {};
    for (const [name, entry] of Object.entries(entries)){
        nodes[name] = typeof entry === 'function' ? entry({
            size: 'md'
        }) : entry;
    }
    return nodes;
}
;
function isDefinedTheme(theme) {
    return typeof theme === 'object' && theme !== null && 'name' in theme && 'tokens' in theme && !('styles' in theme);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/derivedVarRegistry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file Derived variable registry — maps CSS properties to internal vars.
 *
 * Used by generateThemeRules to expand standard CSS properties (borderRadius,
 * padding) into internal CSS custom properties that components read.
 *
 * This is a compiled registry — the source of truth lives in each component's
 * doc file (theming.derived). The consistency test in derivedVarRegistry.test.ts
 * verifies this file stays in sync with the docs.
 *
 * When adding a new component with derived vars:
 * 1. Add the `derived` field to the component's doc.mjs file
 * 2. Add the corresponding entry here
 * 3. The consistency test will catch any drift
 *
 * @position Core theme infrastructure — read by generateThemeRules at runtime
 */ /**
 * Component → derived var mappings.
 *
 * Keys are lowercase component names (matching defineTheme component keys).
 * Values are ordered arrays — earlier entries emit first when multiple
 * entries share the same property.
 */ __turbopack_context__.s([
    "derivedVarRegistry",
    ()=>derivedVarRegistry,
    "getDerivedVars",
    ()=>getDerivedVars
]);
const derivedVarRegistry = {
    avatar: [
        {
            property: 'borderRadius',
            vars: [
                '--_avatar-radius'
            ]
        }
    ],
    banner: [
        {
            property: 'borderRadius',
            vars: [
                '--_banner-radius'
            ]
        }
    ],
    'bottom-sheet': [
        {
            property: 'padding',
            expand: 'container'
        }
    ],
    button: [
        {
            property: 'borderRadius',
            vars: [
                '--_button-radius'
            ]
        }
    ],
    card: [
        {
            property: 'borderRadius',
            vars: [
                '--_card-radius'
            ]
        },
        {
            property: 'padding',
            expand: 'container'
        }
    ],
    'chat-composer': [
        {
            property: 'borderRadius',
            vars: [
                '--_chat-composer-radius'
            ]
        },
        {
            property: 'padding',
            vars: [
                '--_chat-composer-padding'
            ]
        }
    ],
    dialog: [
        {
            property: 'borderRadius',
            vars: [
                '--_dialog-radius'
            ]
        },
        {
            property: 'padding',
            expand: 'container'
        }
    ],
    drawer: [
        {
            property: 'padding',
            expand: 'container'
        }
    ],
    'context-menu': [
        {
            property: 'borderRadius',
            vars: [
                '--_dropdown-menu-radius'
            ]
        },
        {
            property: 'padding',
            vars: [
                '--_dropdown-menu-padding'
            ]
        }
    ],
    'dropdown-menu': [
        {
            property: 'borderRadius',
            vars: [
                '--_dropdown-menu-radius'
            ]
        },
        {
            property: 'padding',
            vars: [
                '--_dropdown-menu-padding'
            ]
        }
    ],
    field: [
        {
            property: 'borderRadius',
            vars: [
                '--_field-radius'
            ]
        }
    ],
    'hover-card': [
        {
            property: 'borderRadius',
            vars: [
                '--_hovercard-radius'
            ]
        }
    ],
    icon: [
        {
            property: 'width',
            vars: [
                '--_icon-width'
            ],
            replaces: true
        },
        {
            property: 'height',
            vars: [
                '--_icon-height'
            ],
            replaces: true
        }
    ],
    item: [
        {
            property: 'paddingInline',
            vars: [
                '--_item-inset-inline'
            ]
        }
    ],
    'number-input': [
        {
            property: 'padding',
            expand: 'container'
        },
        {
            property: 'borderRadius',
            vars: [
                '--_field-radius'
            ]
        }
    ],
    popover: [
        {
            property: 'borderRadius',
            vars: [
                '--_popover-radius'
            ]
        }
    ],
    'progress-bar-mark': [
        {
            property: 'width',
            vars: [
                '--_progressbar-mark-width'
            ],
            replaces: true
        },
        {
            property: 'height',
            vars: [
                '--_progressbar-mark-height'
            ],
            replaces: true
        }
    ],
    section: [
        {
            property: 'padding',
            expand: 'container'
        }
    ],
    'segmented-control': [
        {
            property: 'borderRadius',
            vars: [
                '--_segmented-control-radius'
            ]
        },
        {
            property: 'padding',
            vars: [
                '--_segmented-control-padding'
            ]
        }
    ],
    'text-area': [
        {
            property: 'paddingInline',
            vars: [
                '--_textarea-inline-padding'
            ],
            replaces: true
        }
    ]
};
function getDerivedVars(component, property) {
    const entries = derivedVarRegistry[component];
    if (!entries) {
        return [];
    }
    return entries.filter((e)=>e.property === property);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/domainTokens/dataTokens.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file dataTokens.ts
 * @input dataTokens.stylex.ts (generated; do not edit)
 * @output dataTokenDefaults, DataTokenName
 * @position Plain compatibility view for theme validation and JavaScript token resolution
 *
 * Run `pnpm generate:data-tokens` after editing the canonical StyleX source.
 */ __turbopack_context__.s([
    "dataTokenDefaults",
    ()=>dataTokenDefaults
]);
const dataTokenDefaults = {
    '--color-data-categorical-blue': 'light-dark(#0171E3, #0171E3)',
    '--color-data-categorical-orange': 'light-dark(#EB6E00, #EB6E00)',
    '--color-data-categorical-purple': 'light-dark(#6B1EFD, #6B1EFD)',
    '--color-data-categorical-green': 'light-dark(#0B991F, #0B991F)',
    '--color-data-categorical-pink': 'light-dark(#F351C0, #F351C0)',
    '--color-data-categorical-cyan': 'light-dark(#0171A4, #0171A4)',
    '--color-data-categorical-red': 'light-dark(#F5394F, #F5394F)',
    '--color-data-categorical-teal': 'light-dark(#08A3A3, #08A3A3)',
    '--color-data-categorical-brown': 'light-dark(#965E03, #965E03)',
    '--color-data-categorical-indigo': 'light-dark(#6F8AFF, #6F8AFF)',
    '--color-data-neutral': 'light-dark(#8494A3, #8C939B)',
    '--color-data-blue-5': 'light-dark(#02165E, #02165E)',
    '--color-data-blue-4': 'light-dark(#004CBC, #004CBC)',
    '--color-data-blue-3': 'light-dark(#2694FE, #2694FE)',
    '--color-data-blue-2': 'light-dark(#78BEFF, #78BEFF)',
    '--color-data-blue-1': 'light-dark(#DBECFF, #DBECFF)',
    '--color-data-shamrock-5': 'light-dark(#0B603D, #0B603D)',
    '--color-data-shamrock-4': 'light-dark(#138546, #138546)',
    '--color-data-shamrock-3': 'light-dark(#24BB5E, #24BB5E)',
    '--color-data-shamrock-2': 'light-dark(#8EF7AA, #8EF7AA)',
    '--color-data-shamrock-1': 'light-dark(#D6FEE4, #D6FEE4)',
    '--color-data-orange-5': 'light-dark(#A13F04, #A13F04)',
    '--color-data-orange-4': 'light-dark(#D66100, #D66100)',
    '--color-data-orange-3': 'light-dark(#FD9537, #FD9537)',
    '--color-data-orange-2': 'light-dark(#FDB876, #FDB876)',
    '--color-data-orange-1': 'light-dark(#FFE6CF, #FFE6CF)',
    '--color-data-pink-5': 'light-dark(#8E1073, #8E1073)',
    '--color-data-pink-4': 'light-dark(#D123A1, #D123A1)',
    '--color-data-pink-3': 'light-dark(#F989D3, #F989D3)',
    '--color-data-pink-2': 'light-dark(#FEADE3, #FEADE3)',
    '--color-data-pink-1': 'light-dark(#FCE3F4, #FCE3F4)',
    '--color-data-purple-5': 'light-dark(#3E0697, #3E0697)',
    '--color-data-purple-4': 'light-dark(#6B1EFD, #6B1EFD)',
    '--color-data-purple-3': 'light-dark(#9081FF, #9081FF)',
    '--color-data-purple-2': 'light-dark(#B3B0FE, #B3B0FE)',
    '--color-data-purple-1': 'light-dark(#E8E8FB, #E8E8FB)',
    '--color-data-red-5': 'light-dark(#9D0519, #9D0519)',
    '--color-data-red-4': 'light-dark(#D31130, #D31130)',
    '--color-data-red-3': 'light-dark(#FB7D87, #FB7D87)',
    '--color-data-red-2': 'light-dark(#FFB2B8, #FFB2B8)',
    '--color-data-red-1': 'light-dark(#FEE4E6, #FEE4E6)',
    '--color-data-teal-5': 'light-dark(#08767D, #08767D)',
    '--color-data-teal-4': 'light-dark(#0C9293, #0C9293)',
    '--color-data-teal-3': 'light-dark(#0DB7AF, #0DB7AF)',
    '--color-data-teal-2': 'light-dark(#6CE6D8, #6CE6D8)',
    '--color-data-teal-1': 'light-dark(#D7FCF8, #D7FCF8)',
    '--color-data-yellow-5': 'light-dark(#8A5001, #8A5001)',
    '--color-data-yellow-4': 'light-dark(#D69804, #D69804)',
    '--color-data-yellow-3': 'light-dark(#FBCE03, #FBCE03)',
    '--color-data-yellow-2': 'light-dark(#FCEC85, #FCEC85)',
    '--color-data-yellow-1': 'light-dark(#FDF6BA, #FDF6BA)',
    '--color-data-gray-5': 'light-dark(#25363F, #333338)',
    '--color-data-gray-4': 'light-dark(#5D6C7B, #666A72)',
    '--color-data-gray-3': 'light-dark(#AFB9C4, #B2B8BE)',
    '--color-data-gray-2': 'light-dark(#CCD3DB, #D0D3D6)',
    '--color-data-gray-1': 'light-dark(#F1F4F7, #F2F4F6)'
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/domainTokens/domainTokenDefaults.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "domainTokenDefaults",
    ()=>domainTokenDefaults
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file domainTokens/domainTokenDefaults.ts
 * @input syntaxTokenDefaults, dataTokenDefaults
 * @output domainTokenDefaults
 * @position Merges the domain token defaults for defineTheme. Kept out of the
 *   domainTokens barrel because defineTheme sits in a lazily imported module
 *   graph, which imports no barrel (pinned by scripts/core-single-bundle.test.mjs).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$syntax$2f$tokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/syntax/tokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$domainTokens$2f$dataTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/domainTokens/dataTokens.js [app-client] (ecmascript)");
;
;
const domainTokenDefaults = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$syntax$2f$tokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syntaxTokenDefaults"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$domainTokens$2f$dataTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataTokenDefaults"]
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/dynamicType.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FONT_SIZE_STEP_STYLES",
    ()=>FONT_SIZE_STEP_STYLES,
    "PREFERRED_TEXT_SCALE",
    ()=>PREFERRED_TEXT_SCALE,
    "TEXT_SIZE_CATEGORIES",
    ()=>TEXT_SIZE_CATEGORIES,
    "dynamicTypeScale",
    ()=>dynamicTypeScale,
    "dynamicTypeScaleProperty",
    ()=>dynamicTypeScaleProperty,
    "dynamicTypeScaleRule",
    ()=>dynamicTypeScaleRule,
    "preferredTextScaleRule",
    ()=>preferredTextScaleRule,
    "readerTextSizeEntries",
    ()=>readerTextSizeEntries,
    "scaledFontSizeEntries",
    ()=>scaledFontSizeEntries,
    "scaledStepProperty",
    ()=>scaledStepProperty,
    "syncReaderTextSize",
    ()=>syncReaderTextSize,
    "textSizeCategoryForBodySize",
    ()=>textSizeCategoryForBodySize
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file dynamicType.ts
 * @input The UIKit point sizes per text style (uikitTypography.ts), the raw
 *   font-size tokens (tokens.stylex.ts)
 * @output The reader's text size categories, the category a measured Body
 *   size names, each raw font-size step's UIKit curve and scale, the rule that
 *   gives a category its scales, the scaled raw font-size declarations every
 *   theme emits and the semantic sizes it fixes, and the root Theme's text
 *   size sync
 * @position Theme utility; read by generateThemeRules.ts (every theme's font
 *   sizes, as it writes them) and Theme.tsx (the root provider keeps the
 *   scales current)
 *
 * On iOS the reader picks a text size in Settings, and each UIKit text style
 * follows it on its own curve. Mobile Safari shows the choice only through
 * the `font: -apple-system-*` keywords, and the root font size stays 16px.
 * So the root Theme runtime keeps one hidden, empty probe with
 * `font: -apple-system-body` on `<body>`, reads the category from its size,
 * and gives the page that category's scales in an adopted stylesheet. It
 * reads again when the probe resizes. Each theme writes a font size as its
 * own value times the scale of the text style it plays, so only sizes move.
 * Every scale is 1 at the default category. macOS Safari knows the keyword,
 * but its fixed 13px Body names no category.
 *
 * Elsewhere every scale reads `env(preferred-text-scale)`, with 1 as the
 * fallback, so an engine without it changes nothing. Chromium on Android sets
 * it from the system font scale. A page that carries
 * `<meta name="text-scale" content="scale">` already scales its root font
 * size, so it gets no scales: rem sizes follow the root once.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/theme/dynamicType.test.ts
 * - /packages/core/src/theme/generateThemeRules.ts (readerTextSizeEntries)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$uikitTypography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/uikitTypography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$textSizeProbe$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/textSizeProbe.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedResizeObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedResizeObserver.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
;
;
;
;
const TEXT_SIZE_CATEGORIES = [
    'xs',
    's',
    'm',
    'l',
    'xl',
    'xxl',
    'xxxl',
    'ax1',
    'ax2',
    'ax3',
    'ax4',
    'ax5'
];
/** One of the reader's text size categories. */ /** Index of Large, the default category, in every table row. */ const LARGE = 3;
function textSizeCategoryForBodySize(px) {
    return TEXT_SIZE_CATEGORIES[columnForBodySize(px)] ?? null;
}
/** The table column whose Body size this is, or -1. */ function columnForBodySize(px) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$uikitTypography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["typography"].body.findIndex((size)=>Math.abs(size - px) < 0.5);
}
const FONT_SIZE_STEP_STYLES = {
    '--font-size-4xs': 'caption2',
    '--font-size-3xs': 'caption2',
    '--font-size-2xs': 'caption2',
    '--font-size-xs': 'caption1',
    '--font-size-sm': 'footnote',
    '--font-size-base': 'body',
    '--font-size-lg': 'title3',
    '--font-size-xl': 'title2',
    '--font-size-2xl': 'title1',
    '--font-size-3xl': 'title1',
    '--font-size-4xl': 'largeTitle',
    '--font-size-5xl': 'largeTitle'
};
function dynamicTypeScale(style, category) {
    const row = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$uikitTypography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["typography"][style];
    return row[TEXT_SIZE_CATEGORIES.indexOf(category)] / row[LARGE];
}
function dynamicTypeScaleProperty(style) {
    return `--_dynamic-type-${style.replace(/[A-Z]/g, (m)=>`-${m.toLowerCase()}`)}`;
}
/** The styles some step scales on, in table order. */ const SCALED_STYLES = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$uikitTypography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["typography"]).filter((style)=>Object.values(FONT_SIZE_STEP_STYLES).includes(style));
// =============================================================================
// CSS
// =============================================================================
/** A scale written to four decimals, without trailing zeros. */ function formatScale(scale) {
    return String(Number(scale.toFixed(4)));
}
function dynamicTypeScaleRule(category) {
    return scaleRuleForColumn(category === null ? -1 : TEXT_SIZE_CATEGORIES.indexOf(category));
}
/**
 * The rule for one table column. Large and -1 get none. It also scales Core's
 * default steps in the base layer, below every theme. So a page or theme with
 * no type scale follows too.
 */ function scaleRuleForColumn(column) {
    if (column < 0 || column === LARGE) {
        return '';
    }
    return scaleRule((style)=>formatScale(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$uikitTypography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["typography"][style][column] / __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$uikitTypography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["typography"][style][LARGE]));
}
const PREFERRED_TEXT_SCALE = 'env(preferred-text-scale, 1)';
function preferredTextScaleRule() {
    return scaleRule(()=>PREFERRED_TEXT_SCALE);
}
function scaleRule(scaleOf) {
    const declarations = (entries)=>entries.map(([name, value])=>`  ${name}: ${value};`).join('\n');
    return `@layer astryx-base {\n:root {\n${declarations(scaledFontSizeEntries(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textSizeDefaults"]))}\n}\n}\n:root {\n${declarations(SCALED_STYLES.map((style)=>[
            dynamicTypeScaleProperty(style),
            scaleOf(style)
        ]))}\n}`;
}
function scaledStepProperty(step) {
    return `--_scaled-${step.slice(2)}`;
}
function scaledFontSizeEntries(tokens) {
    const steps = Object.keys(FONT_SIZE_STEP_STYLES);
    const fixedValue = (name)=>{
        const [value, important] = splitImportant(name && tokens[name] || '');
        return isFixedSize(value) ? {
            value,
            important
        } : null;
    };
    return steps.flatMap((name, index)=>{
        const own = fixedValue(name);
        if (own === null) {
            return [];
        }
        const { value, important } = own;
        const scaled = `calc(${value} * var(${dynamicTypeScaleProperty(FONT_SIZE_STEP_STYLES[name])}, 1))`;
        const next = steps[index + 1];
        const nextOwn = fixedValue(next);
        let expression = scaled;
        if (next !== undefined && (tokens[next] === undefined || nextOwn)) {
            const ownPx = lengthInPx(value);
            const nextPx = nextOwn && lengthInPx(nextOwn.value);
            expression = ownPx !== null && nextPx != null && ownPx <= nextPx ? `min(${scaled}, var(${scaledStepProperty(next)}))` : `min(${scaled}, max(var(${scaledStepProperty(next)}, ${value}), ${value}))`;
        }
        return [
            [
                scaledStepProperty(name),
                expression
            ],
            [
                name,
                `var(${scaledStepProperty(name)})${important}`
            ]
        ];
    });
}
/**
 * The raw step each semantic font size reads in the core defaults
 * (`--text-supporting-size` reads `--font-size-sm`), in their order.
 */ const TEXT_SIZE_STEPS = Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["typeScaleDefaults"]).flatMap(([name, value])=>{
    const step = /^var\((--font-size-[a-z0-9]+)\)$/.exec(value)?.[1];
    return name.endsWith('-size') && step !== undefined && step in FONT_SIZE_STEP_STYLES ? [
        [
            name,
            step
        ]
    ] : [];
});
/**
 * Whether a size stays where the theme put it. That is a length, such as
 * `12px`, `0.75rem` or a `clamp()` of them, that reads no variable. Sizes in
 * `em` or `%` follow the parent.
 */ function isFixedSize(value) {
    return /\d[a-z]/i.test(value) && !/var\(|%|\d(?:em|ex|ch|ic|cap|lh)\b/i.test(value);
}
function readerTextSizeEntries(entries) {
    const scaled = new Map(scaledFontSizeEntries(Object.fromEntries(entries)));
    const fixedSteps = new Map(TEXT_SIZE_STEPS);
    return entries.flatMap(([name, raw])=>{
        const step = scaled.get(name);
        if (step !== undefined) {
            const property = scaledStepProperty(name);
            return [
                [
                    property,
                    scaled.get(property) ?? ''
                ],
                [
                    name,
                    step
                ]
            ];
        }
        const [value, important] = splitImportant(raw);
        const reads = fixedSteps.get(name);
        return [
            [
                name,
                reads !== undefined && isFixedSize(value) ? `calc(${value} * var(${dynamicTypeScaleProperty(FONT_SIZE_STEP_STYLES[reads])}, 1))${important}` : raw
            ]
        ];
    });
}
/**
 * A value and its trailing `!important`, apart. `!important` inside `calc()`
 * makes the value invalid. So the scale wraps only the value, and
 * `!important` goes after the expression.
 */ function splitImportant(value) {
    const match = /\s*!\s*important\s*$/i.exec(value);
    return match ? [
        value.slice(0, match.index),
        ' !important'
    ] : [
        value,
        ''
    ];
}
/** A `px` or `rem` length in px (16px to the rem); null for anything else. */ function lengthInPx(value) {
    const match = /^(-?\d*\.?\d+)(px|rem)$/.exec(value?.trim() ?? '');
    if (match == null) {
        return null;
    }
    return Number(match[1]) * (match[2] === 'rem' ? 16 : 1);
}
function syncReaderTextSize(doc) {
    let shared = sharedSyncs.get(doc);
    if (shared == null) {
        const stop = startReaderTextSizeSync(doc);
        if (stop == null) {
            return undefined;
        }
        shared = {
            holders: 0,
            stop
        };
        sharedSyncs.set(doc, shared);
    }
    shared.holders += 1;
    const held = shared;
    let isReleased = false;
    return ()=>{
        if (isReleased) {
            return;
        }
        isReleased = true;
        held.holders -= 1;
        if (held.holders === 0) {
            sharedSyncs.delete(doc);
            held.stop();
        }
    };
}
/** Each document's shared probe and stylesheet, and how many roots hold them. */ const sharedSyncs = new WeakMap();
function startReaderTextSizeSync(doc) {
    const view = doc.defaultView;
    if (view == null || typeof view.CSSStyleSheet !== 'function' || !Array.isArray(doc.adoptedStyleSheets)) {
        return undefined;
    }
    if (!view.CSS?.supports?.('font', '-apple-system-body')) {
        return startPreferredTextScale(doc, view);
    }
    const probe = doc.createElement('span');
    probe.setAttribute('aria-hidden', 'true');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$textSizeProbe$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markTextSizeProbe"])(probe);
    probe.style.cssText = 'position:fixed;inset:0 auto auto 0;inline-size:1em;block-size:1em;visibility:hidden;pointer-events:none;font:-apple-system-body';
    (doc.body ?? doc.documentElement).append(probe);
    const sheet = new view.CSSStyleSheet();
    doc.adoptedStyleSheets = [
        ...doc.adoptedStyleSheets,
        sheet
    ];
    const read = ()=>sheet.replaceSync(scaleRuleForColumn(columnForBodySize(Number.parseFloat(view.getComputedStyle(probe).fontSize))));
    // observeResize reads once now and again whenever the probe resizes.
    const stopObserving = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedResizeObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observeResize"])(probe, read);
    return ()=>{
        stopObserving();
        probe.remove();
        doc.adoptedStyleSheets = doc.adoptedStyleSheets.filter((adopted)=>adopted !== sheet);
    };
}
/**
 * Give every scale `env(preferred-text-scale)`, which the engine keeps
 * current, so nothing is measured or observed. Does nothing on a page whose
 * text-scale meta already scales the root font size.
 */ function startPreferredTextScale(doc, view) {
    if (doc.querySelector('meta[name="text-scale"][content="scale" i]') != null) {
        return undefined;
    }
    const sheet = new view.CSSStyleSheet();
    sheet.replaceSync(preferredTextScaleRule());
    doc.adoptedStyleSheets = [
        ...doc.adoptedStyleSheets,
        sheet
    ];
    return ()=>{
        doc.adoptedStyleSheets = doc.adoptedStyleSheets.filter((adopted)=>adopted !== sheet);
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/expandColorScale.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ensureContrastTone",
    ()=>ensureContrastTone,
    "expandColorScale",
    ()=>expandColorScale
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file expandColorScale.ts
 * @input Color scale configuration { accent?, neutralStyle?, contrast? }
 * @output Token overrides for derivable color tokens
 * @position Theme utility; consumed by defineTheme.ts
 *
 * Generates color token overrides from an accent seed using the HCT
 * perceptual color model. Only produces tokens that meaningfully
 * derive from the accent — status colors, categorical hues, and fixed
 * tokens (on-dark/on-light) fall through to colorDefaults.
 *
 * `accent` is optional: a neutral-only config still gets the full neutral
 * ramp (seeded from the default accent's hue) while the accent tokens
 * themselves fall through to colorDefaults, same as the tokens above.
 *
 * `accent` also accepts a `[light, dark]` tuple (matching `TokenValue` in
 * defineTheme). A tuple seeds each color scheme from its own half: the
 * light side of every generated `light-dark()` pair derives from the light
 * accent's palettes, the dark side from the dark accent's. A plain string
 * seeds both sides identically, token for token the same output as before
 * tuples existed.
 *
 * WCAG contrast guarantees (asserted in expandColorScale.test.ts):
 * - Text tones are guaranteed >= 4.5:1 against their surfaces by tone
 *   spacing alone — HCT tone is CIE L*, which fixes relative luminance
 *   regardless of hue/chroma, so the fixed tone assignments hold for any
 *   accent/neutralStyle (WCAG 1.4.3), and each half of a tuple pairs with
 *   surfaces derived from that same seed.
 * - --color-border-emphasized (form-control boundaries) is tone-bumped
 *   until it reaches >= 3:1 against the generated surface (WCAG 1.4.11).
 * - --color-border, --color-skeleton, and --color-track are intentionally
 *   decorative/redundant cues and are NOT held to 3:1 — see the test file
 *   for the rationale.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/theme/defineTheme.ts
 * - /packages/cli/assets/theme.template.ts (the annotated field reference)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$contrast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/contrast.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/hct.js [app-client] (ecmascript)");
;
;
// =============================================================================
// Types
// =============================================================================
/**
 * Color scale configuration.
 *
 * @example
 * ```
 * // Minimal — just a seed color
 * { accent: '#0064E0' }
 *
 * // Per-scheme seeds: light palettes from '#0064E0', dark from '#48CAE4'
 * { accent: ['#0064E0', '#48CAE4'] }
 *
 * // With customization
 * { accent: '#B7410E', neutralStyle: 'warm', contrast: 'high' }
 *
 * // Neutral-only — keeps the default accent, themes the neutrals
 * { neutralStyle: 'warm' }
 * ```
 */ // =============================================================================
// Neutral chroma by style
// =============================================================================
const NEUTRAL_CHROMA = {
    warm: 7,
    cool: 5,
    neutral: 3
};
const NEUTRAL_VARIANT_CHROMA = {
    warm: 10,
    cool: 8,
    neutral: 6
};
/**
 * Hue source for accent-less configs — the light half of
 * colorDefaults['--color-accent'] (a test guards the two against drift).
 * Only its hue reaches the output: the accent tokens stay ungenerated, so
 * they keep their colorDefaults values rather than this seed's derivation.
 */ const DEFAULT_ACCENT_SEED = '#0064E0';
// =============================================================================
// Computation
// =============================================================================
function ld(light, dark) {
    return `light-dark(${light}, ${dark})`;
}
function accentWithAlpha(alpha) {
    return `color-mix(in srgb, var(--color-accent) ${alpha * 100}%, transparent)`;
}
/** WCAG 1.4.11 minimum contrast for non-text UI boundaries. */ const NON_TEXT_MIN_CONTRAST = 3;
function ensureContrastTone(hue, chroma, startTone, step, background, minRatio) {
    let tone = startTone;
    let hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hctToHex"])({
        hue,
        chroma,
        tone
    });
    while((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$contrast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contrastRatio"])(hex, background) < minRatio && tone + step >= 0 && tone + step <= 100){
        tone += step;
        hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hctToHex"])({
            hue,
            chroma,
            tone
        });
    }
    return hex;
}
function expandColorScale(config) {
    const { accent, neutralStyle = 'cool', contrast = 'standard' } = config;
    // Normalize to per-scheme seeds. A string accent (or an absent one) uses
    // the same seed for both halves, which keeps single-seed output identical
    // to the pre-tuple implementation.
    const [lightAccent, darkAccent] = Array.isArray(accent) ? accent : [
        accent,
        accent
    ];
    const lightSeed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToHct"])(lightAccent ?? DEFAULT_ACCENT_SEED);
    const sameSeed = darkAccent === lightAccent;
    const darkSeed = sameSeed ? lightSeed : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToHct"])(darkAccent ?? DEFAULT_ACCENT_SEED);
    const neutralChroma = NEUTRAL_CHROMA[neutralStyle] ?? 5;
    const neutralVariantChroma = NEUTRAL_VARIANT_CHROMA[neutralStyle] ?? 8;
    // Palette naming: *L palettes feed the light (first) half of each ld()
    // pair below, *D palettes the dark (second) half. With a single seed the
    // D palettes alias the L ones.
    const PL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tonalPalette"])(lightSeed.hue, Math.max(lightSeed.chroma, 48));
    const NL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tonalPalette"])(lightSeed.hue, neutralChroma);
    const NVL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tonalPalette"])(lightSeed.hue, neutralVariantChroma);
    const PD = sameSeed ? PL : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tonalPalette"])(darkSeed.hue, Math.max(darkSeed.chroma, 48));
    const ND = sameSeed ? NL : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tonalPalette"])(darkSeed.hue, neutralChroma);
    const NVD = sameSeed ? NVL : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tonalPalette"])(darkSeed.hue, neutralVariantChroma);
    const isHigh = contrast === 'high';
    const textPrimaryLightTone = isHigh ? 0 : 10;
    const textPrimaryDarkTone = isHigh ? 99 : 90;
    const textSecondaryLightTone = isHigh ? 20 : 30;
    const textSecondaryDarkTone = isHigh ? 80 : 70;
    // Borders track contrast the same way text does: high contrast pulls the
    // emphasized border tone toward mid-scale (stronger against both the near-
    // white light surface and the near-black dark surface) and thickens the
    // otherwise-decorative subtle hairline by doubling its alpha, so structural
    // boundaries stay perceivable for users who opt into high contrast.
    const borderSubtleAlpha = isHigh ? 0.2 : 0.1;
    // Emphasized borders outline form controls (CheckboxInput, Selector), so
    // they are non-text UI boundaries under WCAG 1.4.11 and must reach 3:1
    // against the surface they sit on. High contrast starts at a more
    // aggressive tone (50 vs 70/30), guaranteeing a stronger result; standard
    // contrast starts at 70/30 and walks toward mid-scale only as far as needed.
    const borderEmphasizedStartLight = isHigh ? 50 : 70;
    const borderEmphasizedStartDark = isHigh ? 50 : 30;
    const borderEmphasized = ld(ensureContrastTone(lightSeed.hue, neutralVariantChroma, borderEmphasizedStartLight, -1, NL[99], NON_TEXT_MIN_CONTRAST), ensureContrastTone(darkSeed.hue, neutralVariantChroma, borderEmphasizedStartDark, 1, ND[10], NON_TEXT_MIN_CONTRAST));
    return {
        // Core semantic — only with a seed accent. Without one these fall through
        // to colorDefaults, whose --color-accent is NOT what the default seed
        // derives: defaulting the seed instead of omitting the tokens would
        // recolor every neutral-only theme. Nullish and not truthy, matching the
        // seed above, so a supplied-but-malformed accent keeps its old behavior.
        ...accent != null ? {
            '--color-accent': ld(PL[40], PD[80]),
            // Derived accent tokens reference --color-accent instead of baking its
            // resolved hex, so a scoped override of the base token re-accents the
            // whole subtree at runtime. --color-on-accent stays baked: it is a
            // contrast computation against the accent, which CSS cannot express.
            '--color-accent-muted': ld(accentWithAlpha(0.2), accentWithAlpha(0.25)),
            '--color-on-accent': ld(PL[100], PD[20])
        } : null,
        '--color-neutral': ld((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexWithAlpha"])(NL[10], 0.1), (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexWithAlpha"])(ND[90], 0.2)),
        '--color-background-surface': ld(NL[99], ND[10]),
        '--color-background-body': ld(NL[95], ND[5]),
        '--color-overlay': ld((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexWithAlpha"])(NL[10], 0.4), (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexWithAlpha"])(ND[10], 0.6)),
        '--color-overlay-hover': ld((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexWithAlpha"])(NL[10], 0.05), (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexWithAlpha"])(ND[100], 0.05)),
        '--color-overlay-pressed': ld((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexWithAlpha"])(NL[10], 0.1), (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexWithAlpha"])(ND[100], 0.1)),
        '--color-background-muted': ld((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexWithAlpha"])(NL[10], 0.05), (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexWithAlpha"])(ND[10], 0.5)),
        // Text
        '--color-text-primary': ld(NL[textPrimaryLightTone], ND[textPrimaryDarkTone]),
        '--color-text-secondary': ld(NVL[textSecondaryLightTone], NVD[textSecondaryDarkTone]),
        '--color-text-disabled': ld(NVL[60], NVD[40]),
        '--color-text-accent': 'var(--color-accent)',
        // Icon
        '--color-icon-accent': 'var(--color-accent)',
        '--color-icon-primary': ld(NL[textPrimaryLightTone], ND[textPrimaryDarkTone]),
        '--color-icon-secondary': ld(NVL[textSecondaryLightTone], NVD[textSecondaryDarkTone]),
        '--color-icon-disabled': ld(NVL[60], NVD[40]),
        // Surface variants
        '--color-background-card': ld(NL[99], ND[10]),
        '--color-background-popover': ld(NL[99], ND[20]),
        '--color-background-inverted': ld(NL[10], ND[99]),
        // Border
        // Decorative hairline — not a WCAG 1.4.11 boundary. High contrast
        // doubles the alpha so structural boundaries stay perceivable.
        '--color-border': ld((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexWithAlpha"])(NL[10], borderSubtleAlpha), (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexWithAlpha"])(ND[95], borderSubtleAlpha)),
        '--color-border-emphasized': borderEmphasized,
        // Effects
        '--color-skeleton': ld(NVL[70], NVD[30]),
        // Channel-on-body surface (ProgressBar/Slider tracks, Switch off-state).
        // Defaults to the same NV[70]/NV[30] ramp stop as --color-skeleton.
        '--color-track': ld(NVL[70], NVD[30]),
        '--color-shadow': ld((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexWithAlpha"])(NL[0], 0.1), (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$hct$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexWithAlpha"])(ND[0], 0.3)),
        '--color-tint-hover': ld('black', 'white')
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/expandMotionScale.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "expandMotionScale",
    ()=>expandMotionScale
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file expandMotionScale.ts
 * @input Motion scale configuration { fast, medium, ratio, easing? }
 * @output Token overrides for duration and easing primitives
 * @position Theme utility; consumed by defineTheme.ts
 *
 * Computes duration min/max variants from base values and a scaling ratio:
 *   min = base × ratio
 *   max = base / ratio
 *
 * This gives theme authors a simple 3-value interface (fast, medium, ratio)
 * that expands into a coherent 6-token duration scale. A "snappy" theme
 * lowers the base; a "cinematic" theme raises it — and the proportional
 * relationships between variants are preserved automatically.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/theme/expandMotionScale.test.ts
 * - /packages/core/src/theme/defineTheme.ts
 * - /packages/cli/assets/theme.template.ts (the annotated field reference)
 */ // =============================================================================
// Types
// =============================================================================
/**
 * Motion scale configuration.
 *
 * @example
 * ```
 * // Default Astryx motion scale
 * { fast: 175, medium: 410, slow: 975, ratio: 0.75 }
 *
 * // Snappy theme (reduced motion budget)
 * { fast: 100, medium: 250, ratio: 0.75 }
 *
 * // Cinematic theme (dramatic animations)
 * { fast: 200, medium: 500, slow: 1200, ratio: 0.7 }
 *
 * // With custom easing
 * { fast: 175, medium: 410, ratio: 0.75, easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)' }
 * ```
 */ /** Token overrides produced by expandMotionScale. */ // =============================================================================
// Implementation
// =============================================================================
/**
 * Round a duration in ms to the nearest 5ms for clean token values.
 */ function roundMs(ms) {
    return Math.round(ms / 5) * 5;
}
function expandMotionScale(config) {
    const { fast, medium, slow, ratio, easing } = config;
    const tokens = {
        // Duration primitives
        '--duration-fast-min': `${roundMs(fast * ratio)}ms`,
        '--duration-fast': `${roundMs(fast)}ms`,
        '--duration-fast-max': `${roundMs(fast / ratio)}ms`,
        '--duration-medium-min': `${roundMs(medium * ratio)}ms`,
        '--duration-medium': `${roundMs(medium)}ms`,
        '--duration-medium-max': `${roundMs(medium / ratio)}ms`
    };
    // Slow band (optional — only emitted when slow base is provided)
    if (slow != null) {
        tokens['--duration-slow-min'] = `${roundMs(slow * ratio)}ms`;
        tokens['--duration-slow'] = `${roundMs(slow)}ms`;
        tokens['--duration-slow-max'] = `${roundMs(slow / ratio)}ms`;
    }
    // Easing override (optional — default comes from easeDefaults)
    if (easing) {
        tokens['--ease-standard'] = easing;
    }
    return tokens;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/expandRadiusScale.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file expandRadiusScale.ts
 * @input Radius scale configuration { base, multiplier }
 * @output Token overrides for radius tokens
 * @position Theme utility; consumed by defineTheme.ts
 *
 * Computes border-radius values from a base unit and multiplier.
 * --radius-none and --radius-full are always fixed (never affected by multiplier).
 * --radius-inner through --radius-page = base * step * multiplier.
 *
 * Semantic scale:
 *   --radius-none      → 0px (fixed)
 *   --radius-inner     → base × 1 × multiplier (internal corners)
 *   --radius-element   → base × 2 × multiplier (buttons, inputs)
 *   --radius-container → base × 3 × multiplier (cards, panels)
 *   --radius-page      → base × 7 × multiplier (page-level containers)
 *   --radius-chat      → base × 7 × multiplier (chat surfaces; tracks page)
 *   --radius-full      → 9999px (fixed, pill shapes)
 *
 * SYNC: When modified, update:
 * - /packages/core/src/theme/expandRadiusScale.test.ts
 * - /packages/core/src/theme/defineTheme.ts
 * - /packages/cli/assets/theme.template.ts (the annotated field reference)
 */ // =============================================================================
// Types
// =============================================================================
/**
 * Radius scale configuration.
 *
 * @example
 * ```
 * // Default Astryx radius scale
 * { base: 4, multiplier: 1 }
 *
 * // Sharp/brutalist — all radii become 0
 * { base: 4, multiplier: 0 }
 *
 * // Extra rounded
 * { base: 4, multiplier: 1.5 }
 * ```
 */ /**
 * Generated radius token overrides.
 * Keys are CSS custom property names, values are CSS strings.
 */ // =============================================================================
// Computation
// =============================================================================
/**
 * Expand a radius scale config into token overrides.
 *
 * --radius-none and --radius-full are fixed anchors.
 * --radius-inner through --radius-page scale with base × step × multiplier.
 *
 * @example
 * ```
 * const tokens = expandRadiusScale({ base: 4, multiplier: 1 });
 * // tokens['--radius-none'] === '0px'
 * // tokens['--radius-inner'] === '4px'       (4 × 1 × 1)
 * // tokens['--radius-element'] === '8px'     (4 × 2 × 1)
 * // tokens['--radius-container'] === '12px'  (4 × 3 × 1)
 * // tokens['--radius-page'] === '28px'       (4 × 7 × 1)
 * // tokens['--radius-chat'] === '28px'       (4 × 7 × 1)
 * // tokens['--radius-full'] === '9999px'
 *
 * const sharp = expandRadiusScale({ base: 4, multiplier: 0 });
 * // All scalable tokens become '0px', none and full unchanged
 * ```
 */ __turbopack_context__.s([
    "expandRadiusScale",
    ()=>expandRadiusScale
]);
function expandRadiusScale(config) {
    const { base, multiplier } = config;
    return {
        '--radius-none': '0px',
        '--radius-inner': `${Math.round(base * 1 * multiplier)}px`,
        '--radius-element': `${Math.round(base * 2 * multiplier)}px`,
        '--radius-container': `${Math.round(base * 3 * multiplier)}px`,
        '--radius-page': `${Math.round(base * 7 * multiplier)}px`,
        // Chat surfaces track the page step (× 7) so they scale with the theme
        // multiplier, but remain a distinct token for independent theming. #2072
        '--radius-chat': `${Math.round(base * 7 * multiplier)}px`,
        '--radius-full': '9999px'
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/expandTypeScale.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "expandTypeScale",
    ()=>expandTypeScale,
    "generateTypeScaleComponents",
    ()=>generateTypeScaleComponents
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file expandTypeScale.ts
 * @input Type scale configuration { base, ratio, weights? }
 * @output Token overrides for raw size tokens and semantic typography tokens
 * @position Theme utility; consumed by defineTheme.ts
 *
 * Computes a complete typography token set from a base size and scaling ratio
 * using a geometric progression: size = base × ratio^step.
 *
 * Two-layer architecture:
 *   Layer 1: Raw size tokens (--font-size-4xs … --font-size-4xl)
 *            Geometric progression in rem.
 *   Layer 2: Semantic tokens (--heading-*, --text-*-size/leading/weight)
 *            Sizes are var() references to Layer 1.
 *            Line heights are hardcoded computed values (4px grid snapped).
 *            Weights are var() references to font-weight tokens.
 *
 * The named leading tokens (--leading-tight … --leading-relaxed) are NOT
 * modified by the type scale — they remain as intent-based ratios for
 * component use.
 *
 * Step mapping:
 *   step -5 → --font-size-4xs   (sub-scale)
 *   step -4 → --font-size-3xs   (sub-scale)
 *   step -3 → --font-size-2xs   (sub-scale)
 *   step -2 → --font-size-xs   (h6)
 *   step -1 → --font-size-sm    (h5, supporting)
 *   step  0 → --font-size-base  (h4, body, label, code)
 *   step +1 → --font-size-lg    (h3, large)
 *   step +2 → --font-size-xl    (h2)
 *   step +3 → --font-size-2xl   (h1)
 *   step +4 → --font-size-3xl
 *   step +5 → --font-size-4xl
 *
 * Line heights use a tiered target ratio based on font size:
 *   < 20px  → 1.5   (body text, small UI)
 *   20–31px → 1.4   (medium headings)
 *   ≥ 32px  → 1.25  (large display headings)
 *
 * Then 4px-grid-snapped with Math.round and a minimum of fontSize + 4.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/theme/expandTypeScale.test.ts
 * - /packages/core/src/theme/defineTheme.ts
 * - /packages/cli/assets/theme.template.ts (the annotated field reference)
 */ // =============================================================================
// Types
// =============================================================================
/** Font weight value — either a CSS string or a var() reference. */ /**
 * Weight overrides for heading levels.
 * Keys are heading levels 1–6, values are CSS font-weight values
 * (e.g. '600', 'var(--font-weight-bold)').
 */ /**
 * Weight overrides for text types.
 * Keys are built-in text type names, values are CSS font-weight values.
 * Accepts additional string keys for custom theme-defined text types.
 */ /**
 * Type scale configuration.
 *
 * @example
 * ```
 * // Default Astryx type scale
 * { base: 14, ratio: 1.2 }
 *
 * // With custom weights
 * {
 *   base: 14,
 *   ratio: 1.2,
 *   weights: {
 *     heading: { 1: 'var(--font-weight-bold)', 3: 'var(--font-weight-bold)' },
 *     text: { large: 'var(--font-weight-normal)' },
 *   },
 * }
 *
 * // Suggested starting points:
 * //   Dense/functional: { base: 12, ratio: 1.125 }
 * //   Default:          { base: 14, ratio: 1.2 }
 * //   Airy/editorial:   { base: 16, ratio: 1.25 }
 * ```
 */ /**
 * Generated typography token overrides.
 * Keys are CSS custom property names, values are CSS strings.
 */ // =============================================================================
// Constants
// =============================================================================
/**
 * Step → raw size token name.
 * These tokens form the geometric font size scale.
 *
 * The full scale spans steps -5 to +5:
 *   -5 → --font-size-4xs (sub-scale)
 *   -4 → --font-size-3xs (sub-scale)
 *   -3 → --font-size-2xs (sub-scale)
 *   -2 → --font-size-xs
 *   -1 → --font-size-sm
 *    0 → --font-size-base (anchor)
 *   +1 → --font-size-lg
 *   +2 → --font-size-xl
 *   +3 → --font-size-2xl
 *   +4 → --font-size-3xl
 *   +5 → --font-size-4xl
 */ const STEP_TO_SIZE_TOKEN = {
    [-5]: '--font-size-4xs',
    [-4]: '--font-size-3xs',
    [-3]: '--font-size-2xs',
    [-2]: '--font-size-xs',
    [-1]: '--font-size-sm',
    [0]: '--font-size-base',
    [1]: '--font-size-lg',
    [2]: '--font-size-xl',
    [3]: '--font-size-2xl',
    [4]: '--font-size-3xl',
    [5]: '--font-size-4xl',
    [6]: '--font-size-5xl'
};
/**
 * Heading level → step offset from base (h4 = 0).
 * h1 is 3 steps above base, h6 is 2 steps below.
 */ const HEADING_STEPS = {
    1: 3,
    2: 2,
    3: 1,
    4: 0,
    5: -1,
    6: -2
};
/**
 * Text type → step offset from base.
 * body/label/code are at base, large is one step up, supporting one step down.
 */ const TEXT_STEPS = {
    body: 0,
    large: 1,
    label: 0,
    code: 0,
    supporting: -1,
    'display-1': 6,
    // largest — continues progression above h1
    'display-2': 5,
    'display-3': 4 // closest to h1
};
/**
 * Default font weights per heading level.
 */ const DEFAULT_HEADING_WEIGHTS = {
    1: 'var(--font-weight-semibold)',
    2: 'var(--font-weight-semibold)',
    3: 'var(--font-weight-semibold)',
    4: 'var(--font-weight-semibold)',
    5: 'var(--font-weight-semibold)',
    6: 'var(--font-weight-semibold)'
};
/**
 * Default font weights per text type.
 */ const DEFAULT_TEXT_WEIGHTS = {
    body: 'var(--font-weight-normal)',
    large: 'var(--font-weight-semibold)',
    label: 'var(--font-weight-medium)',
    code: 'var(--font-weight-normal)',
    supporting: 'var(--font-weight-normal)',
    'display-1': 'var(--font-weight-normal)',
    'display-2': 'var(--font-weight-normal)',
    'display-3': 'var(--font-weight-normal)'
};
// =============================================================================
// Computation
// =============================================================================
/**
 * Compute a font size from the geometric progression and round to nearest integer.
 */ function computeSize(base, ratio, step) {
    return Math.round(base * Math.pow(ratio, step));
}
/** Convert px to rem based on the standard 16px root font size. */ function pxToRem(px) {
    const rem = Math.round(px / 16 * 10000) / 10000;
    return `${rem}rem`;
}
/**
 * Tiered target line-height ratio based on font size.
 *
 *   < 20px  → 1.5   (body text, small UI elements)
 *   20–31px → 1.4   (medium headings, transitional)
 *   ≥ 32px  → 1.25  (large display headings)
 */ function targetLeadingRatio(fontSize) {
    return fontSize < 20 ? 1.5 : fontSize < 32 ? 1.4 : 1.25;
}
/**
 * Compute a unitless line-height ratio, snapped so the computed px value
 * aligns to a 4px grid. Ensures a minimum gap of fontSize + 4px.
 *
 * Uses a tiered target ratio — see `targetLeadingRatio`.
 */ function computeLeading(fontSize) {
    const target = targetLeadingRatio(fontSize);
    const rawLh = fontSize * target;
    const snappedLh = Math.max(Math.round(rawLh / 4) * 4, Math.ceil((fontSize + 4) / 4) * 4);
    return Math.round(snappedLh / fontSize * 10000) / 10000;
}
function expandTypeScale(config) {
    const { base, ratio, weights } = config;
    const tokens = {};
    // Merge weight overrides with defaults
    const headingWeights = {
        ...DEFAULT_HEADING_WEIGHTS,
        ...weights?.heading
    };
    const textWeights = {
        ...DEFAULT_TEXT_WEIGHTS,
        ...weights?.text
    };
    // ── Layer 1: Raw size tokens (rem) ────────────────────────────────────────
    for(let step = -5; step <= 6; step++){
        const size = computeSize(base, ratio, step);
        tokens[STEP_TO_SIZE_TOKEN[step]] = pxToRem(size);
    }
    // ── Layer 2: Semantic tokens ──────────────────────────────────────────────
    // Sizes → var() refs to Layer 1
    // Line heights → hardcoded computed values (4px grid snapped)
    // Weights → var() refs (unchanged)
    // Heading tokens
    for (const [levelStr, step] of Object.entries(HEADING_STEPS)){
        const level = Number(levelStr);
        const size = computeSize(base, ratio, step);
        const leading = computeLeading(size);
        tokens[`--text-heading-${level}-size`] = `var(${STEP_TO_SIZE_TOKEN[step]})`;
        tokens[`--text-heading-${level}-weight`] = headingWeights[level];
        tokens[`--text-heading-${level}-leading`] = `${leading}`;
    }
    // Text tokens
    for (const [type, step] of Object.entries(TEXT_STEPS)){
        const size = computeSize(base, ratio, step);
        const leading = computeLeading(size);
        tokens[`--text-${type}-size`] = `var(${STEP_TO_SIZE_TOKEN[step]})`;
        tokens[`--text-${type}-weight`] = textWeights[type];
        tokens[`--text-${type}-leading`] = `${leading}`;
    }
    return tokens;
}
// =============================================================================
// Component override generation
// =============================================================================
const TEXT_FONT_FAMILIES = {
    body: 'var(--font-family-body)',
    large: 'var(--font-family-body)',
    label: 'var(--font-family-body)',
    code: 'var(--font-family-code)',
    supporting: 'var(--font-family-body)',
    'display-1': 'var(--font-family-heading)',
    'display-2': 'var(--font-family-heading)',
    'display-3': 'var(--font-family-heading)'
};
function generateTypeScaleComponents(_config) {
    const components = {};
    const headingRules = {};
    for (const level of [
        1,
        2,
        3,
        4,
        5,
        6
    ]){
        headingRules[`level:${level}`] = {
            fontFamily: 'var(--font-family-heading)',
            fontSize: `var(--text-heading-${level}-size)`,
            fontWeight: `var(--text-heading-${level}-weight)`,
            lineHeight: `var(--text-heading-${level}-leading)`
        };
    }
    // `Heading` renders both a `level:N` and, when set, a `type:display-N`
    // visual-prop class simultaneously (type sizing takes precedence over
    // level sizing — see Heading.tsx's own `type ? sizeByTypeStyles[type] :
    // sizeByLevelStyles[level]`). Without a `type:display-N` rule here, the
    // `level:N` rule is the only one that matches, so it silently wins
    // regardless of `type` once a theme supplies a type scale. Emitting these
    // after the level rules keeps them later in source order, so they take
    // precedence at equal specificity, matching the component's own logic.
    // fontWeight is intentionally omitted, mirroring the `text` branch below
    // and preserving `defaultWeightByTypeStyles`.
    for (const type of [
        'display-1',
        'display-2',
        'display-3'
    ]){
        headingRules[`type:${type}`] = {
            fontFamily: 'var(--font-family-heading)',
            fontSize: `var(--text-${type}-size)`,
            lineHeight: `var(--text-${type}-leading)`
        };
    }
    components.heading = headingRules;
    const textRules = {};
    for (const type of [
        'body',
        'large',
        'label',
        'code',
        'supporting',
        'display-1',
        'display-2',
        'display-3'
    ]){
        textRules[`type:${type}`] = {
            fontFamily: TEXT_FONT_FAMILIES[type],
            fontSize: `var(--text-${type}-size)`,
            lineHeight: `var(--text-${type}-leading)`
        };
    }
    components.text = textRules;
    return components;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/generateThemeRules.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateAdaptationCSS",
    ()=>generateAdaptationCSS,
    "generateOnMediaCSS",
    ()=>generateOnMediaCSS,
    "generateThemeCSS",
    ()=>generateThemeCSS,
    "generateThemeRules",
    ()=>generateThemeRules,
    "generateThemeRulesSplit",
    ()=>generateThemeRulesSplit,
    "generatedScopedStatusRoleDefaults",
    ()=>generatedScopedStatusRoleDefaults
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file Theme CSS generation utilities
 *
 * Shared logic for generating CSS rules from a resolved theme definition,
 * including source-scoped semantic role defaults and one component-leaf lowering
 * path for root, adaptation, and media-surface values plus condition-correct
 * Heading weight precedence guards.
 * Built adaptation metadata resolves against the same root component defaults
 * as defineTheme, so scale-only rules do not reset authored component styles.
 * Used by both the runtime path (Theme injects <style>) and the build
 * path (`astryx theme build` pre-compiles to CSS files).
 *
 * Every consumer-supplied declaration is checked by declarationBoundary.ts
 * before it is emitted, so a value can never end its declaration or rule
 * early. A refused declaration is dropped and reported in the supplied
 * warnings array (build receipts), or through `console.warn` (runtime).
 *
 * Extracted from defineTheme.ts to reduce cyclomatic complexity and provide
 * a clear single-responsibility module for CSS generation.
 *
 * @input DefinedTheme (resolved theme object from defineTheme), optional warnings array
 * @output CSS rule strings, split by layer (component vs prose), and warning text
 *   for each dropped declaration
 * @position packages/core/src/theme/generateThemeRules.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeAdaptations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/themeAdaptations.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$parseStyleKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/parseStyleKey.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$derivedVarRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/derivedVarRegistry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusRoleDerivation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/statusRoleDerivation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/naming.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$declarationBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/declarationBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$dynamicType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/dynamicType.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokenReferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokenReferences.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$press$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/press.js [app-client] (ecmascript)");
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
 * Theme @scope selectors.
 *
 * Theme CSS is @scope'd to the theme-name data attribute that Theme writes
 * (`data-astryx-theme`).
 *
 * @example themeScopeStart('mytheme')
 *   -> '[data-astryx-theme="mytheme"]'
 */ function themeScopeStart(name) {
    return `[data-${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataAttrNamespace"]}-theme="${name}"]`;
}
/** Scope limit matching the theme attribute (nested-theme boundary). */ const THEME_SCOPE_TO = `[data-${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataAttrNamespace"]}-theme]`;
/** Media-surface selector, e.g. for [data-astryx-media="dark"]. */ function mediaSelector(surface) {
    return `[data-${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataAttrNamespace"]}-media="${surface}"]`;
}
/** Component base-class selector, e.g. '.astryx-button'. */ function componentClassSelector(component, suffix) {
    return `.${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["classPrefix"]}-${component}${suffix}`;
}
/** Scope a component selector to an inverted media surface when requested. */ function componentSelector(component, suffix, surface) {
    const selector = componentClassSelector(component, suffix);
    return surface ? `:is(${mediaSelector(surface)}) :is(${selector})` : selector;
}
/**
 * Guard appended to a themed `:hover` rule so it cannot match a disabled
 * element.
 *
 * A theme authoring `':hover': {backgroundColor: …}` is describing the
 * enabled control; `:hover` on its own would paint that background on a
 * disabled one too, because browsers suppress a disabled control's events,
 * not its hover styling. `:where()` contributes no specificity, so a themed
 * hover rule still weighs exactly what it weighed before.
 *
 * Mirrors the `@astryx/no-hover-on-disabled` lint rule, which enforces the
 * same guard on the components' own StyleX styles.
 */ const HOVER_DISABLED_GUARD = ':where(:not(:disabled,[aria-disabled="true"]))';
/**
 * Append a pseudo-class to every selector in a comma-separated selector list.
 *
 * Selector helpers may emit comma-separated lists. CSS does not distribute a
 * trailing pseudo over selector lists, so `${list}:hover` would only target the
 * final selector. Rewrite each item so the pseudo applies to all of them.
 *
 * A `:hover` pseudo also picks up the disabled guard. A pseudo-ELEMENT has to
 * end the selector, so the guard is spliced in before it.
 */ function appendPseudoToSelectorList(selector, pseudo) {
    const parts = [];
    let depth = 0;
    let start = 0;
    for(let i = 0; i < selector.length; i++){
        const char = selector[i];
        if (char === '(') {
            depth++;
        } else if (char === ')') {
            depth = Math.max(0, depth - 1);
        } else if (char === ',' && depth === 0) {
            parts.push(selector.slice(start, i).trim());
            start = i + 1;
        }
    }
    parts.push(selector.slice(start).trim());
    const guarded = guardHoverPseudo(pseudo);
    return parts.map((part)=>`${part}${guarded}`).join(', ');
}
/**
 * The touch press model (utils/interactionOverlay.stylex.ts, pressFeedback.ts).
 * A mouse keeps `:active`. Under a coarse primary pointer, the press
 * controller marks a press it believes. A finger then paints no press on the
 * touch or through a scroll.
 */ const COARSE_POINTER_QUERY = '(pointer: coarse)';
const ACTIVE_PSEUDO = /:active(?![-\w])/g;
/**
 * The rules for one themed pseudo-class override. A themed `:active` follows
 * the press model: the `:active` rule applies only off a coarse pointer, and
 * under one the press attribute takes `:active`'s place.
 */ function pseudoRules(baseSelector, pseudo, declarations) {
    if (!new RegExp(ACTIVE_PSEUDO.source).test(pseudo)) {
        return [
            `  ${appendPseudoToSelectorList(baseSelector, pseudo)} {\n${declarations}\n  }`
        ];
    }
    const pressed = pseudo.replace(ACTIVE_PSEUDO, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$press$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRESS_BELIEVED_SELECTOR"]);
    return [
        `  @media not all and ${COARSE_POINTER_QUERY} {\n  ${appendPseudoToSelectorList(baseSelector, pseudo)} {\n${declarations}\n  }\n  }`,
        `  @media ${COARSE_POINTER_QUERY} {\n  ${appendPseudoToSelectorList(baseSelector, pressed)} {\n${declarations}\n  }\n  }`
    ];
}
/** Insert the disabled guard into a `:hover` pseudo, keeping any pseudo-element last. */ function guardHoverPseudo(pseudo) {
    if (!/^:hover(?![-\w])/.test(pseudo) || pseudo.includes('[aria-disabled')) {
        return pseudo;
    }
    const pseudoElement = pseudo.indexOf('::');
    return pseudoElement === -1 ? pseudo + HOVER_DISABLED_GUARD : pseudo.slice(0, pseudoElement) + HOVER_DISABLED_GUARD + pseudo.slice(pseudoElement);
}
// =============================================================================
// Types
// =============================================================================
/**
 * Structured output from generateThemeRulesSplit.
 * Separates prose element defaults from component/token overrides
 * so callers can place them in different CSS layers.
 */ /**
 * Output from generateThemeCSS — two CSS blocks for different layers.
 */ // =============================================================================
// Internal helpers
// =============================================================================
/** Convert camelCase CSS property to kebab-case */ function toKebabCase(str) {
    return str.replace(/[A-Z]/g, (m)=>`-${m.toLowerCase()}`);
}
/** Padding properties that trigger container token mapping */ const PADDING_PROPS = new Set([
    'padding',
    'paddingBlock',
    'paddingInline',
    'paddingBlockStart',
    'paddingBlockEnd',
    'paddingInlineStart',
    'paddingInlineEnd'
]);
/**
 * Physical block-axis longhands, and the logical longhand each one *is* in
 * every horizontal writing mode. Normalizing them costs no direction
 * assumption, which is why they can join the container expansion.
 *
 * `paddingLeft`/`paddingRight` are deliberately absent. They are
 * direction-relative — left is inline-start in LTR and inline-end in RTL — and
 * the expansion's tokens are consumed by logical properties, so mapping them
 * would put the padding on the opposite edge in RTL. They keep their physical
 * meaning and land on the element as `padding-left`/`padding-right`; the cost
 * is that a component's internals cannot see them.
 */ const PHYSICAL_BLOCK_PADDING_PROPS = {
    paddingTop: 'paddingBlockStart',
    paddingBottom: 'paddingBlockEnd'
};
/**
 * Every padding spelling the container expansion consumes. Kept separate from
 * PADDING_PROPS, which also routes longhands to `vars`-style derived entries —
 * those carry one value for the whole box, so a single physical edge must not
 * reach them.
 */ const CONTAINER_PADDING_PROPS = new Set([
    ...PADDING_PROPS,
    ...Object.keys(PHYSICAL_BLOCK_PADDING_PROPS)
]);
/**
 * Parse CSS padding shorthand/longhand into block/inline values.
 * Supports 1-3 value shorthands, logical properties, and the physical block
 * longhands normalized by PHYSICAL_BLOCK_PADDING_PROPS.
 */ function parsePadding(props) {
    const result = {};
    for (const [rawProp, value] of props){
        const prop = PHYSICAL_BLOCK_PADDING_PROPS[rawProp] ?? rawProp;
        // An empty shorthand sets nothing. It keeps the longhands before it.
        switch(prop){
            case 'padding':
                {
                    const parts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokenReferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitTopLevelWhitespace"])(value);
                    if (parts.length === 0) {
                        break;
                    }
                    if (parts.length === 1) {
                        result.blockStart = parts[0];
                        result.blockEnd = parts[0];
                        result.inline = parts[0];
                    } else if (parts.length === 2) {
                        result.blockStart = parts[0];
                        result.blockEnd = parts[0];
                        result.inline = parts[1];
                    } else if (parts.length >= 3) {
                        result.blockStart = parts[0];
                        result.inline = parts[1];
                        result.blockEnd = parts[2];
                    }
                    break;
                }
            case 'paddingBlock':
                {
                    const parts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokenReferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitTopLevelWhitespace"])(value);
                    if (parts.length === 0) {
                        break;
                    }
                    result.blockStart = parts[0];
                    result.blockEnd = parts[1] ?? parts[0];
                    break;
                }
            case 'paddingInline':
                {
                    const parts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokenReferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitTopLevelWhitespace"])(value);
                    if (parts.length === 0) {
                        break;
                    }
                    if (parts.length === 1) {
                        result.inline = parts[0];
                    } else {
                        result.inlineStart = parts[0];
                        result.inlineEnd = parts[1];
                    }
                    break;
                }
            case 'paddingBlockStart':
                result.blockStart = value;
                break;
            case 'paddingBlockEnd':
                result.blockEnd = value;
                break;
            case 'paddingInlineStart':
                result.inlineStart = value;
                break;
            case 'paddingInlineEnd':
                result.inlineEnd = value;
                break;
        }
    }
    return result;
}
/**
 * Expand parsed padding into component-scoped public tokens.
 *
 * Emits the rebranded --astryx-<component>-padding tokens (shorthand +
 * directional overrides), e.g.:
 *   --astryx-card-padding: 20px
 *   --astryx-card-padding-inline: 20px
 *   --astryx-card-padding-block-start: 20px
 *   --astryx-card-padding-block-end: 20px
 *
 * The component reads these with an inverted fallback chain
 * (var(--astryx-*, default)). The container.stylex.ts default styles read
 * these via var() fallbacks,
 * so the theme CSS sets the value and the component picks it up through
 * CSS custom property cascade — no layer competition with StyleX output.
 */ function expandContainerPadding(component, parsed, resetInheritedSpecificity = false) {
    const prefix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cssVar"])(`${component}-padding`);
    const tokens = [];
    // Resolve effective inline values (inlineStart/End override inline)
    const effectiveInlineStart = parsed.inlineStart ?? parsed.inline;
    const effectiveInlineEnd = parsed.inlineEnd ?? parsed.inline;
    const inlineSymmetric = effectiveInlineStart != null && effectiveInlineEnd != null && effectiveInlineStart === effectiveInlineEnd;
    // If all sides are the same, emit the shorthand token only
    const allSame = inlineSymmetric && parsed.blockStart != null && parsed.blockEnd != null && effectiveInlineStart === parsed.blockStart && parsed.blockStart === parsed.blockEnd;
    if (allSame) {
        tokens.push([
            prefix,
            effectiveInlineStart ?? ''
        ]);
    } else {
        // Directional tokens
        if (parsed.inlineStart != null || parsed.inlineEnd != null) {
            // Asymmetric inline — emit start and end separately
            if (effectiveInlineStart != null) {
                tokens.push([
                    `${prefix}-inline-start`,
                    effectiveInlineStart
                ]);
            }
            if (effectiveInlineEnd != null) {
                tokens.push([
                    `${prefix}-inline-end`,
                    effectiveInlineEnd
                ]);
            }
        } else if (parsed.inline != null) {
            tokens.push([
                `${prefix}-inline`,
                parsed.inline
            ]);
        }
        if (parsed.blockStart != null) {
            tokens.push([
                `${prefix}-block-start`,
                parsed.blockStart
            ]);
        }
        if (parsed.blockEnd != null) {
            tokens.push([
                `${prefix}-block-end`,
                parsed.blockEnd
            ]);
        }
    }
    if (resetInheritedSpecificity) {
        const emitted = new Set(tokens.map(([name])=>name));
        const moreSpecific = emitted.has(prefix) ? [
            `${prefix}-inline`,
            `${prefix}-inline-start`,
            `${prefix}-inline-end`,
            `${prefix}-block-start`,
            `${prefix}-block-end`
        ] : emitted.has(`${prefix}-inline`) ? [
            `${prefix}-inline-start`,
            `${prefix}-inline-end`
        ] : [];
        for (const name of moreSpecific){
            if (!emitted.has(name)) {
                // `initial` makes a custom property guaranteed-invalid so var() follows
                // its fallback, clearing a more-specific declaration from a root rule.
                tokens.push([
                    name,
                    'initial'
                ]);
            }
        }
    }
    return tokens;
}
// =============================================================================
// Declaration assembly: a declaration always stays one declaration
// =============================================================================
const warnToConsole = (message)=>{
    console.warn(`[astryx theme] ${message}`);
};
/** Build receipts collect warning text; runtime callers warn by default. */ function diagnosticSink(warnings) {
    return warnings ? (message)=>warnings.push(message) : warnToConsole;
}
/** Shorten an authored value for a one-line message. */ function previewValue(value) {
    const oneLine = JSON.stringify(value);
    return oneLine.length > 80 ? `${oneLine.slice(0, 77)}..."` : oneLine;
}
function reportDrop(sink, property, value, location, reason) {
    sink(`dropped "${property}" in ${location}: ${reason} (value: ${previewValue(value)})`);
}
/**
 * True when `name: value;` stays exactly one declaration; otherwise reports
 * the drop and returns false. Both checks follow CSS syntax, so valid CSS a
 * browser keeps inside one declaration (a `data:` URI, `Gill\ Sans`, a closed
 * comment, a vendor-prefixed property) is never refused; see
 * declarationBoundary.ts for the rules.
 */ function acceptDeclaration(property, value, location, sink) {
    const reason = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$declarationBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkDeclarationName"])(property) ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$declarationBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkDeclarationValue"])(value);
    if (reason === null) {
        return true;
    }
    reportDrop(sink, property, value, location, reason);
    return false;
}
/**
 * Assemble `prop: value;` lines, dropping (and reporting) any entry whose
 * property or value could not stay a single declaration. Theme definitions
 * are code, but apps do assemble them from stored input (brand colors,
 * white-labeling), so the generated stylesheet must never extend beyond the
 * declarations it means to emit.
 */ function joinDeclarations(entries, location, sink, mapProp = (p)=>p) {
    const lines = [];
    for (const [rawProp, rawValue] of entries){
        // Legacy unenrolled tokens retain non-string values. Scan the same text
        // interpolation has always emitted, without changing the normalized theme.
        const value = stringifyTokenValue(rawValue);
        const prop = mapProp(rawProp);
        if (acceptDeclaration(prop, value, location, sink)) {
            lines.push(`    ${prop}: ${value};`);
        }
    }
    return lines.join('\n');
}
/**
 * Public tokens whose canonical default references another public token: the
 * status roles and `--duration-exit`. StyleX owns the document defaults. A
 * theme that authors a source repeats its omitted token at the theme root so
 * nested Theme regions bind the alias locally without changing authored-token
 * metadata.
 *
 * Conditional scopes repeat an omitted alias only when the source changes on
 * that scope. Explicit adaptation role writes are replayed after generated
 * aliases (and on media descendants) so authored role precedence survives
 * overlapping conditions without disabling the alias in non-matching states.
 */ const SCOPED_REFERENCE_DEFAULTS = [
    [
        '--color-text-info',
        '--color-text-blue'
    ],
    [
        '--color-text-success',
        '--color-text-green'
    ],
    [
        '--color-text-warning',
        '--color-text-yellow'
    ],
    [
        '--color-text-error',
        '--color-text-red'
    ],
    [
        '--color-on-info-muted',
        '--color-text-blue'
    ],
    [
        '--color-on-success-muted',
        '--color-text-green'
    ],
    [
        '--color-on-warning-muted',
        '--color-text-yellow'
    ],
    [
        '--color-on-error-muted',
        '--color-text-red'
    ],
    // Icon and border roles follow the text role, set or derived (INV17).
    [
        '--color-icon-info',
        '--color-text-info'
    ],
    [
        '--color-icon-success',
        '--color-text-success'
    ],
    [
        '--color-icon-warning',
        '--color-text-warning'
    ],
    [
        '--color-icon-error',
        '--color-text-error'
    ],
    [
        '--color-border-info',
        '--color-text-info'
    ],
    [
        '--color-border-success',
        '--color-text-success'
    ],
    [
        '--color-border-warning',
        '--color-text-warning'
    ],
    [
        '--color-border-error',
        '--color-text-error'
    ],
    [
        '--duration-exit',
        '--duration-fast'
    ]
];
const SCOPED_REFERENCE_SOURCES = new Map(SCOPED_REFERENCE_DEFAULTS);
/** Colours INV17's derivation measures; a scope that sets one re-derives. */ const STATUS_MEASURED = /^--color-(?:info|success|warning|error|on-|background-surface|background-card)/;
const STATUS_ROLE_ORDER = new Map(SCOPED_REFERENCE_DEFAULTS.map(([role], index)=>[
        role,
        index
    ]));
function stringifyTokenValue(value) {
    if (typeof value === 'string') {
        return value;
    }
    // Preserve the exact JavaScript interpolation behavior legacy themes received
    // before declaration analysis accepted non-string token values.
    return String(value);
}
function assignTokenCascade(state, ...tokenSets) {
    for (const tokens of tokenSets){
        for (const [rawToken, rawValue] of Object.entries(tokens ?? {})){
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$declarationBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canonicalizeDeclarationName"])(rawToken);
            const value = stringifyTokenValue(rawValue);
            const analysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$declarationBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeDeclarationValue"])(value);
            // Match joinDeclarations: declarations that cannot be emitted never
            // participate in the browser cascade this safety model validates.
            if (token === null || analysis.reason !== null) {
                continue;
            }
            if (state.important.has(token) && !analysis.important) {
                continue;
            }
            state.values[token] = value;
            if (analysis.important) {
                state.important.add(token);
            } else {
                state.important.delete(token);
            }
        }
    }
}
function createTokenCascade(...tokenSets) {
    const state = {
        values: {},
        important: new Set()
    };
    assignTokenCascade(state, ...tokenSets);
    return state;
}
/** Check whether one candidate value closes a cycle through its own role. */ function tokenValuesWouldHaveCycleWithValue(tokens, relevantToken, candidateValue) {
    const stack = [
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$declarationBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeDeclarationValue"])(candidateValue).references
    ];
    const visited = new Set();
    while(stack.length > 0){
        const token = stack.pop();
        if (token === undefined) {
            continue;
        }
        if (token === relevantToken) {
            return true;
        }
        if (visited.has(token) || !Object.prototype.hasOwnProperty.call(tokens, token)) {
            continue;
        }
        visited.add(token);
        for (const reference of (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$declarationBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeDeclarationValue"])(stringifyTokenValue(tokens[token])).references){
            if (reference === relevantToken || Object.prototype.hasOwnProperty.call(tokens, reference)) {
                stack.push(reference);
            }
        }
    }
    return false;
}
const WIDTH_CELL_RANK = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
    '2xl': 5
};
function adaptationConditionMatchesCell(condition, widthRank, pointer, contrast, motion) {
    const from = condition.width?.from;
    if (from !== undefined && widthRank < WIDTH_CELL_RANK[from]) {
        return false;
    }
    const below = condition.width?.below;
    if (below !== undefined && widthRank >= WIDTH_CELL_RANK[below]) {
        return false;
    }
    return (condition.pointer === undefined || condition.pointer === pointer) && (condition.contrast === undefined || condition.contrast === contrast) && (condition.motion === undefined || condition.motion === motion);
}
const REACHABLE_MATCH_SET_CACHE = new WeakMap();
/** Every reachable ordered adaptation-rule match set, including the root. */ function reachableAdaptationMatchSets(rules) {
    const cached = REACHABLE_MATCH_SET_CACHE.get(rules);
    if (cached !== undefined) {
        return cached;
    }
    const matchSets = new Map();
    for(let widthRank = 0; widthRank <= 5; widthRank++){
        for (const pointer of [
            'coarse',
            'fine',
            'none'
        ]){
            for (const contrast of [
                'more',
                'less',
                'no-preference',
                'custom'
            ]){
                for (const motion of [
                    'reduce',
                    'no-preference'
                ]){
                    const indexes = rules.flatMap((rule, index)=>adaptationConditionMatchesCell(rule.when, widthRank, pointer, contrast, motion) ? [
                            index
                        ] : []);
                    matchSets.set(indexes.join(','), indexes);
                }
            }
        }
    }
    const reachable = [
        ...matchSets.values()
    ];
    REACHABLE_MATCH_SET_CACHE.set(rules, reachable);
    return reachable;
}
function effectiveAdaptationTokenValues(rootTokens, rootLocalTokens, rootAliases, rules, matchingRuleIndexes, conditionalAliases = []) {
    const effective = createTokenCascade(rootTokens, Object.fromEntries(rootAliases), rootLocalTokens);
    for (const index of matchingRuleIndexes){
        const rule = rules[index];
        assignTokenCascade(effective, rule.tokens, Object.fromEntries(conditionalAliases[index] ?? []), rule.localTokens);
    }
    // Emission replays authored roles after every ordinary adaptation block so
    // an explicit role beats aliases from any later overlapping rule.
    for (const index of matchingRuleIndexes){
        assignTokenCascade(effective, Object.fromEntries(authoredStatusRoleEntries(rules[index].tokens)));
    }
    return effective.values;
}
function retainedAdaptationRules(theme) {
    if (!('__adaptations' in theme) && !('__adaptationRules' in theme)) {
        return [];
    }
    return resolvedAdaptationRules(theme);
}
function generatedScopedStatusRoleDefaults(tokens, localTokens = {}, rules = []) {
    // INV17: roles a theme leaves unset while setting their status source are
    // computed against the theme's own surfaces first; the aliases below then
    // treat them as present, so icon and border roles follow a derived text role.
    const entries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusRoleDerivation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deriveStatusRoleTokens"])(tokens, localTokens);
    const authoredRoot = createTokenCascade(tokens, Object.fromEntries(entries), localTokens).values;
    const states = reachableAdaptationMatchSets(rules).map((indexes)=>({
            indexes,
            values: effectiveAdaptationTokenValues(tokens, localTokens, entries, rules, indexes)
        }));
    for (const [role, source] of SCOPED_REFERENCE_DEFAULTS){
        const alias = `var(${source})`;
        if (authoredRoot[role] !== undefined || authoredRoot[source] === undefined && !entries.some(([emitted])=>emitted === source)) {
            continue;
        }
        const isSafe = states.every(({ values })=>values[role] !== undefined || !tokenValuesWouldHaveCycleWithValue(values, role, alias));
        if (isSafe) {
            entries.push([
                role,
                alias
            ]);
            for (const { values } of states){
                if (values[role] === undefined) {
                    values[role] = alias;
                }
            }
        }
    }
    // One canonical order whether a role is derived or aliased, so themes that
    // differ only in which roles needed computing still emit comparable rules.
    return entries.sort(([a], [b])=>(STATUS_ROLE_ORDER.get(a) ?? 0) - (STATUS_ROLE_ORDER.get(b) ?? 0));
}
function authoredStatusRoleEntries(tokens) {
    const canonicalTokens = createTokenCascade(tokens).values;
    return SCOPED_REFERENCE_DEFAULTS.flatMap(([role])=>{
        const value = canonicalTokens[role];
        return value === undefined ? [] : [
            [
                role,
                stringifyTokenValue(value)
            ]
        ];
    });
}
function tokenValueIsAliasOf(value, source) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$declarationBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeDeclarationValue"])(stringifyTokenValue(value)).singleVarReference === source;
}
function mediaRoleRestorationValue(role, value) {
    const source = SCOPED_REFERENCE_SOURCES.get(role);
    return source !== undefined && tokenValueIsAliasOf(value, source) ? value : 'inherit';
}
function generatedAdaptationStatusRoleDefaults(rootTokens, rootLocalTokens, rules, rootAliases) {
    const aliases = rules.map(()=>[]);
    const rootValues = createTokenCascade(rootTokens, Object.fromEntries(rootAliases), rootLocalTokens).values;
    const states = reachableAdaptationMatchSets(rules).map((indexes)=>({
            indexes,
            values: effectiveAdaptationTokenValues(rootTokens, rootLocalTokens, rootAliases, rules, indexes, aliases)
        }));
    for (const [index, rule] of rules.entries()){
        const authoredRule = createTokenCascade(rule.tokens, rule.localTokens).values;
        // INV17 in an adaptation: a rule that changes a colour the derivation
        // measures gets the roles derived from the root and that rule together.
        if (Object.keys(authoredRule).some((token)=>STATUS_MEASURED.test(token))) {
            const ruleDerived = new Map((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusRoleDerivation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deriveStatusRoleTokens"])({
                ...rootTokens,
                ...rule.tokens
            }, {
                ...rootLocalTokens,
                ...rule.localTokens
            }));
            for (const [role, value] of ruleDerived){
                if (authoredRule[role] === undefined && rootValues[role] !== value) {
                    aliases[index].push([
                        role,
                        value
                    ]);
                }
            }
        }
        // Roles this rule derived count as set: they are not overwritten by an
        // alias, and roles that follow them (icon and border) alias them here.
        const ruleRoles = new Map(aliases[index]);
        const ruleSources = {
            ...authoredRule,
            ...Object.fromEntries(ruleRoles)
        };
        for (const [role, source] of SCOPED_REFERENCE_DEFAULTS){
            const alias = `var(${source})`;
            const rootRole = rootValues[role];
            if (ruleRoles.has(role) || authoredRule[role] !== undefined || ruleSources[source] === undefined && !aliases[index].some(([emitted])=>emitted === source) || rootRole !== undefined) {
                continue;
            }
            const matchingStates = states.filter(({ indexes })=>indexes.includes(index));
            const isSafe = matchingStates.every(({ values })=>values[role] !== undefined || !tokenValuesWouldHaveCycleWithValue(values, role, alias));
            if (isSafe) {
                aliases[index].push([
                    role,
                    alias
                ]);
                for (const { values } of matchingStates){
                    if (values[role] === undefined) {
                        values[role] = alias;
                    }
                }
            }
        }
    }
    return aliases;
}
function generatedMediaStatusRoleDefaults(tokens, rootTokens, rootLocalTokens, rules, rootAliases) {
    const aliases = [];
    const rootValues = createTokenCascade(rootTokens, Object.fromEntries(rootAliases), rootLocalTokens).values;
    // A media surface sits on content the compiler cannot measure, so a status
    // colour set there reaches its roles as an INV16 alias, even where the root
    // holds an INV17-derived value.
    const rootDerived = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusRoleDerivation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deriveStatusRoleTokens"])(rootTokens, rootLocalTokens).map(([role])=>role));
    const authoredMedia = createTokenCascade(tokens).values;
    const authoredRolesByRule = rules.map((rule)=>new Map(authoredStatusRoleEntries(rule.tokens)));
    const states = reachableAdaptationMatchSets(rules).map((indexes)=>({
            indexes,
            values: {
                ...authoredMedia
            }
        }));
    const candidateValueFor = (role, alias, matchingRuleIndexes)=>{
        const candidate = createTokenCascade({
            [role]: alias
        });
        for (const index of matchingRuleIndexes){
            const authoredValue = authoredRolesByRule[index].get(role);
            if (authoredValue !== undefined) {
                assignTokenCascade(candidate, {
                    [role]: mediaRoleRestorationValue(role, authoredValue)
                });
            }
        }
        return stringifyTokenValue(candidate.values[role]);
    };
    for (const [role, source] of SCOPED_REFERENCE_DEFAULTS){
        const alias = `var(${source})`;
        const rootRole = rootValues[role];
        if (authoredMedia[role] !== undefined || authoredMedia[source] === undefined && !aliases.some(([emitted])=>emitted === source) || rootRole !== undefined && !tokenValueIsAliasOf(rootRole, source) && !rootDerived.has(role)) {
            continue;
        }
        const candidateValues = states.map(({ indexes, values })=>({
                values,
                candidate: candidateValueFor(role, alias, indexes)
            }));
        const isSafe = candidateValues.every(({ values, candidate })=>values[role] === candidate || !tokenValuesWouldHaveCycleWithValue(values, role, candidate));
        if (isSafe) {
            aliases.push([
                role,
                alias
            ]);
            for (const { values, candidate } of candidateValues){
                values[role] = candidate;
            }
        }
    }
    // Content on a fill does not depend on the surface beneath it, so a status
    // fill set here gets its INV17 content colour (theme-compilation INV17).
    const mediaFills = new Set(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusRoleDerivation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATUS_NAMES"].filter((status)=>authoredMedia[`--color-${status}`] !== undefined && authoredMedia[`--color-on-${status}`] === undefined).map((status)=>`--color-on-${status}`));
    if (mediaFills.size > 0) {
        for (const [role, value] of (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusRoleDerivation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deriveStatusRoleTokens"])({
            ...rootTokens,
            ...tokens
        }, rootLocalTokens)){
            if (mediaFills.has(role) && rootValues[role] !== value) {
                aliases.push([
                    role,
                    value
                ]);
            }
        }
    }
    return aliases;
}
/** The `:scope` token block for portable and theme-local token values. */ function tokenBlock(source, location, sink, tokenEntries = Object.entries(source.tokens)) {
    const declarations = [
        // Font sizes follow the reader's text size where the root Theme sets the
        // scales. Elsewhere each scale is 1.
        joinDeclarations((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$dynamicType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readerTextSizeEntries"])(tokenEntries), `${location}tokens`, sink),
        joinDeclarations(Object.entries(source.localTokens ?? {}), `${location}localTokens`, sink)
    ].filter((block)=>block.length > 0).join('\n');
    const hasEntries = tokenEntries.length > 0 || Object.keys(source.localTokens ?? {}).length > 0;
    return hasEntries ? `  :scope {\n${declarations}\n  }` : null;
}
/** `components.button["variant:secondary"]`-style location for a rule. */ function componentLocation(prefix, component, key) {
    return `${prefix}components.${component}[${JSON.stringify(key)}]`;
}
// =============================================================================
// Public API
// =============================================================================
/**
 * Generate the intermediary CSS rules for a theme.
 *
 * Returns an array of CSS rule strings — the shared format used by both
 * the runtime path (useInsertionEffect) and the build path (astryx theme build).
 */ /**
 * The parts of a theme that turn into CSS rules.
 *
 * Narrower than `DefinedTheme` on purpose: an adaptation rule is not a whole
 * theme, and it calls this with only the values that rule writes. Typing the
 * parameter as `DefinedTheme` would let a future field be read here and silently
 * lost for every conditional rule, with no type error to catch it.
 */ const STATUS_ROLE_GENERATION_CACHE = new WeakMap();
let activeStatusRoleGeneration;
function tokenSetSignature(tokens) {
    return Object.entries(tokens ?? {}).map(([name, value])=>[
            name,
            typeof value,
            stringifyTokenValue(value)
        ]);
}
function statusRoleGenerationSignature(theme, rules) {
    return JSON.stringify([
        tokenSetSignature(theme.tokens),
        tokenSetSignature(theme.localTokens),
        rules.map((rule)=>[
                rule.query,
                rule.when,
                tokenSetSignature(rule.tokens),
                tokenSetSignature(rule.localTokens),
                rule.components
            ])
    ]);
}
function createStatusRoleGenerationContext(theme) {
    const rules = resolvedAdaptationRules(theme);
    const signature = statusRoleGenerationSignature(theme, rules);
    const cached = STATUS_ROLE_GENERATION_CACHE.get(theme);
    if (cached?.signature === signature) {
        return cached.context;
    }
    const context = {
        theme,
        rules,
        rootAliases: generatedScopedStatusRoleDefaults(theme.tokens, theme.localTokens, rules)
    };
    STATUS_ROLE_GENERATION_CACHE.set(theme, {
        signature,
        context
    });
    return context;
}
function statusRoleGenerationContext(theme) {
    return activeStatusRoleGeneration?.theme === theme ? activeStatusRoleGeneration : createStatusRoleGenerationContext(theme);
}
function adaptationStatusRoleDefaults(context) {
    context.adaptationAliases ??= generatedAdaptationStatusRoleDefaults(context.theme.tokens, context.theme.localTokens, context.rules, context.rootAliases);
    return context.adaptationAliases;
}
function generateThemeRules(theme, warnings) {
    const parts = [];
    const sink = diagnosticSink(warnings);
    // Bare prose rules reference semantic variables instead of baking the root
    // value. That lets adaptation token writes take effect through CSS alone
    // without duplicating prose selectors inside every media query.
    const val = (key)=>`var(${key})`;
    // 1. Token block — CSS custom properties on :scope. Source-derived status
    // aliases live here once; conditional rules only emit authored writes.
    const context = activeStatusRoleGeneration?.theme === theme ? activeStatusRoleGeneration : undefined;
    const rules = context?.rules ?? retainedAdaptationRules(theme);
    const rootAliases = context?.rootAliases ?? generatedScopedStatusRoleDefaults(theme.tokens, theme.localTokens, rules);
    const tokenRules = tokenBlock(theme, '', sink, [
        ...Object.entries(theme.tokens),
        ...rootAliases
    ]);
    if (tokenRules !== null) {
        parts.push(tokenRules);
    }
    // 1b. Base font — apply the theme's declared body font to the scope root.
    // Components styled with `font-family: inherit` (SideNav items, Buttons)
    // otherwise resolve against the browser default serif, since nothing else
    // sets a page font. `font-family` inherits, so one rule on :scope covers
    // the tree. Only emitted when the theme declares a body font; a bare theme
    // still contributes no font rule of its own.
    if (theme.tokens['--font-family-body']) {
        parts.push(`  :scope {\n    font-family: var(--font-family-body);\n  }`);
    }
    // 2. Component overrides: stable .astryx-* target classes combined with
    // reflected data-* selectors for visual props and runtime states.
    if (theme.components) {
        generateComponentRules(theme.components, parts, {
            sink
        });
    }
    // 3. Prose HTML element rules (h1-h6, p, small, code, hr)
    generateProseRules(val, parts);
    // 4. Prop-level color overrides (for text/heading/link specificity)
    generateColorOverrides(theme.components || {}, parts);
    // 5. Text `size`-prop font-size overrides (so an explicit size beats a
    //    themed type's font-size across the astryx-base → astryx-theme layers)
    generateSizeOverrides(theme.components || {}, parts);
    // 6. Heading `weight`-prop overrides. These are emitted after authored type
    //    rules in the same layer so an explicit prop remains an override even
    //    when a custom visual type declares its own default weight.
    generateHeadingWeightOverrides(theme.components || {}, parts);
    // (on-media rules are generated separately — see generateOnMediaCSS)
    return parts;
}
/** Named Heading/Text weight props and their theme-owned token values. */ const HEADING_WEIGHT_TOKEN_MAP = {
    normal: 'var(--font-weight-normal)',
    medium: 'var(--font-weight-medium)',
    semibold: 'var(--font-weight-semibold)',
    bold: 'var(--font-weight-bold)'
};
/**
 * Re-emit Heading's explicit weight choices in the theme layer.
 *
 * Component and type overrides live above the StyleX base layer, so the
 * component's ordinary weight class cannot win there by itself. Emitting the
 * reflected weight classes after authored component rules makes the public
 * `weight` prop a dependable override of a type or level default.
 */ function generateHeadingWeightOverrides(components, parts, { surface, inheritedComponents, forceAll = false, authoredOnly = false } = {}) {
    const headingRules = components.heading;
    const headingRuleMap = headingRules && typeof headingRules === 'object' && !Array.isArray(headingRules) ? headingRules : undefined;
    if (!headingRuleMap && !forceAll) {
        return;
    }
    const inheritedHeadingRules = inheritedComponents?.heading;
    const inheritedHeadingRuleMap = inheritedHeadingRules && typeof inheritedHeadingRules === 'object' ? inheritedHeadingRules : undefined;
    for (const [weightName, weightValue] of Object.entries(HEADING_WEIGHT_TOKEN_MAP)){
        const styleKey = `weight:${weightName}`;
        const authoredWeight = headingRuleMap ? getAuthoredHeadingWeight(headingRuleMap, styleKey) : undefined;
        if (authoredOnly && authoredWeight === undefined) {
            continue;
        }
        const inheritedWeight = inheritedHeadingRuleMap ? getAuthoredHeadingWeight(inheritedHeadingRuleMap, styleKey) : undefined;
        const effectiveWeight = authoredWeight ?? inheritedWeight ?? weightValue;
        const suffix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$parseStyleKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseStyleKey"])(styleKey);
        const selector = componentSelector('heading', suffix, surface);
        parts.push(`  ${selector} { font-weight: ${effectiveWeight}; }`);
    }
}
/**
 * The `fontWeight` a heading rule authors for `styleKey`, or undefined when
 * it has none. A value that cannot stay one declaration is treated as not
 * authored, so the override falls back to the inherited or token weight
 * instead of interpolating it; the drop itself is reported where that same
 * rule's declarations are emitted, so it is not reported twice here.
 */ function getAuthoredHeadingWeight(headingRuleMap, styleKey) {
    const rule = headingRuleMap[styleKey];
    if (rule == null || typeof rule !== 'object' || Array.isArray(rule)) {
        return undefined;
    }
    const fontWeight = rule.fontWeight;
    return typeof fontWeight === 'string' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$declarationBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkDeclarationValue"])(fontWeight) === null ? fontWeight : undefined;
}
/** Options shared by root, adaptation, and media-surface component lowering. */ /**
 * Generate component override rules using stable `.astryx-*` target classes
 * and reflected `data-*` selectors for prop/state keys. Handles derived var
 * expansion and container padding mapping for every theme layer.
 */ function generateComponentRules(components, parts, { resetInheritedPaddingSpecificity = false, surface, sink = warnToConsole, location: locationPrefix = '' } = {}) {
    for (const [component, rules] of Object.entries(components)){
        for (const [key, styles] of Object.entries(rules)){
            const entries = Object.entries(styles);
            if (entries.length === 0) {
                continue;
            }
            const suffix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$parseStyleKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseStyleKey"])(key);
            const baseSelector = componentSelector(component, suffix, surface);
            const location = componentLocation(locationPrefix, component, key);
            // Separate regular properties from pseudo-class overrides
            const props = [];
            const pseudos = [];
            for (const [prop, value] of entries){
                if (prop.startsWith(':') && typeof value === 'object') {
                    pseudos.push([
                        prop,
                        value
                    ]);
                } else if (acceptDeclaration(toKebabCase(prop), `${value}`, location, sink)) {
                    props.push([
                        prop,
                        value
                    ]);
                }
            }
            // Derived var expansion: for each CSS property, check if the
            // component has derived var entries and emit additional declarations.
            // Entries are processed in order (priority).
            // - `vars`: emit internal CSS custom property declarations
            // - `expand: 'container'`: expand padding to container layout tokens
            // - `replaces: true`: emit only the var, dropping the source property
            let finalProps = props;
            const derivedProps = [];
            let containerExpanded = false;
            const replacedProps = new Set();
            for (const [prop, value] of props){
                const derived = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$derivedVarRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDerivedVars"])(component, prop);
                // Padding longhands (paddingBlock, paddingInline, etc.) also
                // match the 'padding' derived entry for container expansion.
                const paddingDerived = PADDING_PROPS.has(prop) && prop !== 'padding' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$derivedVarRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDerivedVars"])(component, 'padding') : [];
                for (const entry of [
                    ...derived,
                    ...paddingDerived
                ]){
                    if (entry.expand === 'container' && PADDING_PROPS.has(prop)) {
                        containerExpanded = true;
                    }
                    if (entry.replaces) {
                        replacedProps.add(prop);
                    }
                    if (entry.vars) {
                        for (const varName of entry.vars){
                            derivedProps.push([
                                varName,
                                value
                            ]);
                        }
                    }
                }
                // A physical block longhand reaches the container expansion only. It
                // names one edge, so it must not feed a `vars` entry above, which
                // carries the padding for the whole box.
                if (prop in PHYSICAL_BLOCK_PADDING_PROPS && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$derivedVarRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDerivedVars"])(component, 'padding').some((e)=>e.expand === 'container')) {
                    containerExpanded = true;
                }
            }
            // Container padding expansion: replace padding props with
            // component-scoped container tokens for layout integration.
            if (containerExpanded) {
                const paddingProps = props.filter(([p])=>CONTAINER_PADDING_PROPS.has(p));
                const nonPaddingProps = props.filter(([p])=>!CONTAINER_PADDING_PROPS.has(p));
                const parsed = parsePadding(paddingProps);
                const containerTokens = expandContainerPadding(component, parsed, resetInheritedPaddingSpecificity);
                finalProps = [
                    ...nonPaddingProps,
                    ...containerTokens
                ];
            }
            // Drop properties whose derived entry set `replaces` — their value is
            // carried by the emitted var and must not land on the class element.
            if (replacedProps.size > 0) {
                finalProps = finalProps.filter(([p])=>!replacedProps.has(p));
            }
            if (derivedProps.length > 0) {
                finalProps = [
                    ...finalProps,
                    ...derivedProps
                ];
            }
            // Emit base rule
            if (finalProps.length > 0) {
                const declarations = joinDeclarations(finalProps, location, sink, toKebabCase);
                parts.push(`  ${baseSelector} {\n${declarations}\n  }`);
            }
            // Emit pseudo-class rules
            for (const [pseudo, pseudoStyles] of pseudos){
                const pseudoEntries = Object.entries(pseudoStyles);
                if (pseudoEntries.length > 0) {
                    const declarations = joinDeclarations(pseudoEntries, `${location}[${JSON.stringify(pseudo)}]`, sink, toKebabCase);
                    parts.push(...pseudoRules(baseSelector, pseudo, declarations));
                }
            }
        }
    }
}
/**
 * Generate prose HTML element default rules (h1-h6, p, small, code, hr).
 * Wrapped in :where() for zero specificity — these are defaults that
 * any class-based style (StyleX, .astryx-* overrides) should beat.
 * The caller places these in the reset layer (not astryx-theme) so they
 * sit below all component styles in the cascade.
 */ function generateProseRules(val, parts) {
    parts.push(`  :where(h1, h2, h3, h4, h5, h6) {
    font-family: var(--font-family-heading);
    color: var(--color-text-primary);
  }`);
    for(let level = 1; level <= 6; level++){
        parts.push(`  :where(h${level}) {
    font-size: ${val(`--text-heading-${level}-size`)};
    font-weight: ${val(`--text-heading-${level}-weight`)};
    line-height: ${val(`--text-heading-${level}-leading`)};
  }`);
    }
    parts.push(`  :where(p) {
    font-family: var(--font-family-body);
    font-size: ${val('--text-body-size')};
    font-weight: ${val('--text-body-weight')};
    line-height: ${val('--text-body-leading')};
    color: var(--color-text-primary);
  }`);
    parts.push(`  :where(small) {
    font-size: ${val('--text-supporting-size')};
    font-weight: ${val('--text-supporting-weight')};
    line-height: ${val('--text-supporting-leading')};
    color: var(--color-text-secondary);
  }`);
    parts.push(`  :where(code, pre) {
    font-family: var(--font-family-code);
    font-size: ${val('--text-code-size')};
    line-height: ${val('--text-code-leading')};
  }`);
    parts.push(`  :where(hr) {
    border: none;
    border-top: 1px solid var(--color-border);
  }`);
}
/**
 * Generate prop-level color override rules for text/heading/link components.
 * These ensure color prop classes override theme token changes.
 */ function generateColorOverrides(components, parts, surface) {
    const TEXT_COLOR_MAP = {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        disabled: 'var(--color-text-disabled)',
        placeholder: 'var(--color-text-secondary)',
        accent: 'var(--color-text-accent)',
        // A label that follows its owner's color, such as a Link's, keeps doing
        // so when a theme styles the target's base color.
        inherit: 'inherit'
    };
    const touchesText = 'text' in components;
    const touchesHeading = 'heading' in components;
    const touchesLink = 'link' in components;
    if (touchesText || touchesHeading || touchesLink) {
        for (const [colorName, colorValue] of Object.entries(TEXT_COLOR_MAP)){
            if (touchesText) {
                parts.push(`  ${componentSelector('text', (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$parseStyleKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseStyleKey"])(`color:${colorName}`), surface)} { color: ${colorValue}; }`);
            }
            if (touchesHeading) {
                parts.push(`  ${componentSelector('heading', (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$parseStyleKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseStyleKey"])(`color:${colorName}`), surface)} { color: ${colorValue}; }`);
            }
            if (touchesLink) {
                parts.push(`  ${componentSelector('link', (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$parseStyleKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseStyleKey"])(`color:${colorName}`), surface)} { color: ${colorValue}; }`);
            }
        }
    }
}
/**
 * Map a Text `size` prop value to its raw font-size token.
 * Mirrors `sizeStyles` in `Text/text.stylex.ts` (note `xsm` → `--font-size-xs`).
 * <!-- SYNC: packages/core/src/Text/text.stylex.ts (sizeStyles) -->
 */ const TEXT_SIZE_TOKEN_MAP = {
    '4xs': 'var(--font-size-4xs)',
    '3xs': 'var(--font-size-3xs)',
    '2xs': 'var(--font-size-2xs)',
    xsm: 'var(--font-size-xs)',
    sm: 'var(--font-size-sm)',
    base: 'var(--font-size-base)',
    lg: 'var(--font-size-lg)',
    xl: 'var(--font-size-xl)',
    '2xl': 'var(--font-size-2xl)',
    '3xl': 'var(--font-size-3xl)',
    '4xl': 'var(--font-size-4xl)'
};
/**
 * Generate `size`-prop font-size overrides for the Text component.
 *
 * The `size` prop is documented as a font-size override that wins over the
 * size implied by `type`. Its StyleX class lives in `@layer astryx-base`, but a
 * theme's per-type font-size rule (`.astryx-text.<type>`) lives in the higher
 * `@layer astryx-theme`, so the layer cascade let the theme silently shadow
 * `size` for any `type` the theme styled. Re-emitting the size classes here —
 * same layer as the type rules, same `.astryx-text.<x>` specificity, later in
 * source — restores `size` as a real override.
 *
 * Only `font-size` is overridden; line-height and other type properties are
 * intentionally preserved, matching the prop's documented contract.
 *
 * Gated on the theme touching `text` (which includes the auto-generated
 * type-scale rules) — with no theme type rule to beat, the base-layer StyleX
 * class already wins and no override is needed.
 */ function generateSizeOverrides(components, parts, surface) {
    if (!('text' in components)) {
        return;
    }
    for (const [sizeName, sizeValue] of Object.entries(TEXT_SIZE_TOKEN_MAP)){
        const suffix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$parseStyleKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseStyleKey"])(`size:${sizeName}`);
        parts.push(`  ${componentSelector('text', suffix, surface)} { font-size: ${sizeValue}; }`);
    }
}
function generateThemeRulesSplit(theme, warnings) {
    const allRules = generateThemeRules(theme, warnings);
    const prose = [];
    const component = [];
    for (const rule of allRules){
        if (rule.trimStart().startsWith(':where(')) {
            prose.push(rule);
        } else {
            component.push(rule);
        }
    }
    return {
        component,
        prose
    };
}
function resolvedAdaptationRules(theme) {
    // Retained metadata is part of the built-theme contract. Validate it even
    // when a concrete rule cache is present so a stale or malformed breakpoint
    // map cannot bypass the same checks live themes receive.
    const normalized = theme.__adaptations === undefined ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeAdaptations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeThemeAdaptations"])(theme.name, theme.__adaptations, undefined);
    if (Array.isArray(theme.__adaptationRules)) {
        return theme.__adaptationRules;
    }
    if (normalized === undefined) {
        return [];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeAdaptations$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveThemeAdaptationRules"])(theme.name, normalized, theme.__axes ?? {}, theme.tokens, theme.localTokens, theme.components) ?? [];
}
function generateOnMediaCSS(theme, warnings) {
    const parts = [];
    const scopeSelector = themeScopeStart(theme.name);
    const sink = diagnosticSink(warnings);
    const context = statusRoleGenerationContext(theme);
    const { rules, rootAliases } = context;
    const mediaStatusRoleDefaults = new Map();
    for (const surface of [
        'dark',
        'light'
    ]){
        const onMedia = surface === 'dark' ? theme.__onDark : theme.__onLight;
        if (!onMedia) {
            continue;
        }
        const location = surface === 'dark' ? 'onDark.' : 'onLight.';
        // Token overrides. MediaTheme writes on a descendant surface, so a source
        // alias must be local unless an authored root/adaptation role owns it.
        const statusRoleDefaults = generatedMediaStatusRoleDefaults(onMedia.tokens, theme.tokens, theme.localTokens, rules, rootAliases);
        mediaStatusRoleDefaults.set(surface, statusRoleDefaults);
        const tokenEntries = [
            ...Object.entries(onMedia.tokens),
            ...statusRoleDefaults
        ];
        if (tokenEntries.length > 0) {
            // The surface re-declares font sizes the way a theme's root does, so they
            // keep following the reader's text size there (see dynamicType.ts).
            const declarations = joinDeclarations((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$dynamicType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readerTextSizeEntries"])(tokenEntries), `${location}tokens`, sink);
            parts.push(`  ${mediaSelector(surface)} {\n${declarations}\n  }`);
        }
        // Component overrides use the same lowering as root and adaptations so a
        // surface writes the same derived leaf and can win by source order.
        if (onMedia.components) {
            generateComponentRules(onMedia.components, parts, {
                resetInheritedPaddingSpecificity: true,
                surface,
                sink,
                location
            });
            generateColorOverrides(onMedia.components, parts, surface);
            generateSizeOverrides(onMedia.components, parts, surface);
            // Apply the effective explicit Heading weight after media-specific type
            // rules. A surface-authored target wins, followed by the inherited main
            // target and then the built-in token fallback.
            generateHeadingWeightOverrides(onMedia.components, parts, {
                surface,
                inheritedComponents: theme.components
            });
        }
    }
    const adaptationMediaRoleBlocks = [];
    for (const [index, rule] of rules.entries()){
        const authoredRoles = authoredStatusRoleEntries(rule.tokens);
        if (authoredRoles.length === 0) {
            continue;
        }
        const roleParts = [];
        for (const surface of [
            'dark',
            'light'
        ]){
            const onMedia = surface === 'dark' ? theme.__onDark : theme.__onLight;
            if (!onMedia) {
                continue;
            }
            const generatedRoles = new Set((mediaStatusRoleDefaults.get(surface) ?? []).map(([role])=>role));
            const restorationEntries = authoredRoles.filter(([role])=>generatedRoles.has(role)).map(([role, value])=>[
                    role,
                    mediaRoleRestorationValue(role, value)
                ]);
            if (restorationEntries.length === 0) {
                continue;
            }
            const declarations = joinDeclarations(restorationEntries, `adaptations[${index}].on${surface}.statusRoles.`, sink);
            roleParts.push(`  ${mediaSelector(surface)} {\n${declarations}\n  }`);
        }
        if (roleParts.length > 0) {
            adaptationMediaRoleBlocks.push(generateAdaptationMediaBlock(rule.query, roleParts, scopeSelector));
        }
    }
    if (parts.length === 0 && adaptationMediaRoleBlocks.length === 0) {
        return '';
    }
    const blocks = [];
    if (parts.length > 0) {
        const inner = parts.join('\n\n');
        blocks.push(`@scope (${scopeSelector}) to (${THEME_SCOPE_TO}) {\n${inner}\n}`);
    }
    blocks.push(...adaptationMediaRoleBlocks);
    return blocks.join('\n\n');
}
/** Generate only the declarations one adaptation rule writes. */ function generateAdaptationRuleRules(rule, location, sink, statusRoleDefaults) {
    const parts = [];
    const tokens = tokenBlock(rule, location, sink, [
        ...Object.entries(rule.tokens),
        ...statusRoleDefaults
    ]);
    if (tokens !== null) {
        parts.push(tokens);
    }
    if (rule.components) {
        generateComponentRules(rule.components, parts, {
            resetInheritedPaddingSpecificity: true,
            sink,
            location
        });
        generateColorOverrides(rule.components, parts);
        generateSizeOverrides(rule.components, parts);
    }
    return parts;
}
function hasHeadingComponentRules(components) {
    const headingRules = components?.heading;
    return headingRules !== null && typeof headingRules === 'object' && !Array.isArray(headingRules);
}
function generateAdaptationMediaBlock(query, parts, scopeSelector) {
    return `@media ${query} {\n  @scope (${scopeSelector}) to (${THEME_SCOPE_TO}) {\n${parts.map(indentRule).join('\n\n')}\n  }\n}`;
}
function generateAdaptationCSS(theme, warnings) {
    const sink = diagnosticSink(warnings);
    // Built themes can reach this compiler without passing through defineTheme.
    // Resolve retained metadata so width points remain observable through
    // AppShell and inheritance even when a rule emits no CSS.
    const context = statusRoleGenerationContext(theme);
    const { rules } = context;
    if (rules.length === 0) {
        return {
            prose: '',
            component: ''
        };
    }
    const scopeSelector = themeScopeStart(theme.name);
    const blocks = [];
    const adaptsHeading = rules.some((rule)=>hasHeadingComponentRules(rule.components));
    const statusRoleDefaults = adaptationStatusRoleDefaults(context);
    // Emit ordinary rule writes first, without inherited Heading weight
    // fallbacks. Carrying an earlier weight into a later block makes that value
    // active whenever the later condition matches, even if the earlier condition
    // does not. Pairwise merging cannot repair that: multiple mutually exclusive
    // earlier rules can each overlap one broad later rule.
    for (const [index, rule] of rules.entries()){
        const parts = generateAdaptationRuleRules(rule, `adaptations[${index}].`, sink, statusRoleDefaults[index]);
        if (parts.length === 0) {
            continue;
        }
        blocks.push(generateAdaptationMediaBlock(rule.query, parts, scopeSelector));
    }
    // Replay explicit role writes after every generated source alias. This keeps
    // an authored role authoritative when its condition overlaps a later rule
    // that changes only the role's source, while the alias still works when the
    // authored-role condition is inactive.
    for (const [index, rule] of rules.entries()){
        const roleEntries = authoredStatusRoleEntries(rule.tokens);
        if (roleEntries.length === 0) {
            continue;
        }
        const roleRule = tokenBlock({
            tokens: {}
        }, `adaptations[${index}].statusRoles.`, sink, roleEntries);
        if (roleRule !== null) {
            blocks.push(generateAdaptationMediaBlock(rule.query, [
                roleRule
            ], scopeSelector));
        }
    }
    if (adaptsHeading) {
        // Put one unconditional effective-root guard after every ordinary
        // adaptation block. It restores the public weight prop above every
        // conditional type/level default without attributing any prior rule's
        // value to a condition that did not author it.
        const rootWeightParts = [];
        generateHeadingWeightOverrides(theme.components ?? {}, rootWeightParts, {
            forceAll: true
        });
        blocks.push(`@scope (${scopeSelector}) to (${THEME_SCOPE_TO}) {\n${rootWeightParts.join('\n\n')}\n}`);
        // Reapply only explicitly authored conditional weight writes, preserving
        // authored rule order so co-matching writes retain last-write-wins.
        for (const rule of rules){
            const authoredWeightParts = [];
            generateHeadingWeightOverrides(rule.components ?? {}, authoredWeightParts, {
                authoredOnly: true
            });
            if (authoredWeightParts.length > 0) {
                blocks.push(generateAdaptationMediaBlock(rule.query, authoredWeightParts, scopeSelector));
            }
        }
    }
    return {
        prose: '',
        component: blocks.join('\n\n')
    };
}
/** Indent the rule start without rewriting newlines inside authored values. */ function indentRule(rule) {
    return `  ${rule}`;
}
function generateThemeCSS(theme, warnings) {
    if (activeStatusRoleGeneration?.theme === theme) {
        return generateThemeCSSWithContext(theme, warnings);
    }
    const previous = activeStatusRoleGeneration;
    activeStatusRoleGeneration = createStatusRoleGenerationContext(theme);
    try {
        return generateThemeCSSWithContext(theme, warnings);
    } finally{
        activeStatusRoleGeneration = previous;
    }
}
function generateThemeCSSWithContext(theme, warnings) {
    const { component, prose } = generateThemeRulesSplit(theme, warnings);
    const scopeSelector = themeScopeStart(theme.name);
    const scopeTo = THEME_SCOPE_TO;
    let proseCss = '';
    if (prose.length > 0) {
        const proseInner = prose.join('\n\n');
        proseCss = `@scope (${scopeSelector}) to (${scopeTo}) {\n${proseInner}\n}`;
    }
    // Component rules: bounded scope (stops at nested themes) +
    // on-media rules in unbounded scope (can reach [data-astryx-media] elements)
    let componentCss = '';
    if (component.length > 0) {
        const componentInner = component.join('\n\n');
        componentCss = `@scope (${scopeSelector}) to (${scopeTo}) {\n${componentInner}\n}`;
    }
    // Adaptations follow the root theme in authored order. Media-surface rules
    // follow adaptations so onDark/onLight keep their specified precedence.
    const adaptationCss = generateAdaptationCSS(theme, warnings);
    if (adaptationCss.component) {
        componentCss = componentCss ? `${componentCss}\n\n${adaptationCss.component}` : adaptationCss.component;
    }
    const onMediaCss = generateOnMediaCSS(theme, warnings);
    if (onMediaCss) {
        componentCss = componentCss ? `${componentCss}\n\n${onMediaCss}` : onMediaCss;
    }
    return {
        prose: proseCss,
        component: componentCss
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/hct.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hctToHex",
    ()=>hctToHex,
    "hexToHct",
    ()=>hexToHct,
    "hexWithAlpha",
    ()=>hexWithAlpha,
    "tonalPalette",
    ()=>tonalPalette
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file hct.ts
 * @input Hex color string (#RRGGBB)
 * @output HCT color representation (Hue, Chroma, Tone)
 * @position Theme utility; consumed by expandColorScale.ts
 *
 * Minimal HCT (Hue, Chroma, Tone) color space implementation.
 * Ported from Google's material-color-utilities (Apache-2.0).
 * Zero runtime dependencies — all math is self-contained.
 *
 * HCT combines:
 * - Hue from CIELab (perceptually uniform hue)
 * - Chroma approximated via CIELab C*ab (colorfulness)
 * - Tone from L* (CIE Lightness, 0=black, 100=white)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/color.js [app-client] (ecmascript)");
;
// =============================================================================
// Types
// =============================================================================
// =============================================================================
// sRGB <-> Linear RGB
// =============================================================================
function srgbToLinear(c) {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}
function linearToSrgb(c) {
    const s = c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    return Math.round(Math.min(255, Math.max(0, s * 255)));
}
// =============================================================================
// Linear RGB <-> XYZ (D65 illuminant)
// =============================================================================
function linearRgbToXyz(r, g, b) {
    return [
        0.4124564 * r + 0.3575761 * g + 0.1804375 * b,
        0.2126729 * r + 0.7151522 * g + 0.072175 * b,
        0.0193339 * r + 0.119192 * g + 0.9503041 * b
    ];
}
function xyzToLinearRgb(x, y, z) {
    return [
        3.2404542 * x - 1.5371385 * y - 0.4985314 * z,
        -0.969266 * x + 1.8760108 * y + 0.041556 * z,
        0.0556434 * x - 0.2040259 * y + 1.0572252 * z
    ];
}
// =============================================================================
// XYZ <-> L*a*b*
// =============================================================================
const D65_WHITE = [
    0.95047,
    1.0,
    1.08883
];
function labF(t) {
    const delta = 6 / 29;
    return t > delta * delta * delta ? Math.cbrt(t) : t / (3 * delta * delta) + 4 / 29;
}
function labFInv(t) {
    const delta = 6 / 29;
    return t > delta ? t * t * t : 3 * delta * delta * (t - 4 / 29);
}
function xyzToLab(x, y, z) {
    const fx = labF(x / D65_WHITE[0]);
    const fy = labF(y / D65_WHITE[1]);
    const fz = labF(z / D65_WHITE[2]);
    return [
        116 * fy - 16,
        500 * (fx - fy),
        200 * (fy - fz)
    ];
}
function labToXyz(L, a, b) {
    const fy = (L + 16) / 116;
    const fx = a / 500 + fy;
    const fz = fy - b / 200;
    return [
        labFInv(fx) * D65_WHITE[0],
        labFInv(fy) * D65_WHITE[1],
        labFInv(fz) * D65_WHITE[2]
    ];
}
// =============================================================================
// Tone <-> Y (CIE Luminance)
// =============================================================================
function toneToY(tone) {
    return labFInv((tone + 16) / 116);
}
// =============================================================================
// Hex <-> RGB
// =============================================================================
function hexToRgb(hex) {
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseHex"])(hex);
    if (parsed === null) {
        return [
            0,
            0,
            0
        ];
    }
    return [
        parsed.r,
        parsed.g,
        parsed.b
    ];
}
function hexToHct(hex) {
    const [r, g, b] = hexToRgb(hex);
    const lr = srgbToLinear(r);
    const lg = srgbToLinear(g);
    const lb = srgbToLinear(b);
    const [x, y, z] = linearRgbToXyz(lr, lg, lb);
    const [L, a, bLab] = xyzToLab(x, y, z);
    const hueRad = Math.atan2(bLab, a);
    let hue = hueRad * 180 / Math.PI;
    if (hue < 0) {
        hue += 360;
    }
    const chroma = Math.sqrt(a * a + bLab * bLab);
    const tone = L;
    return {
        hue,
        chroma,
        tone: Math.max(0, Math.min(100, tone))
    };
}
function hctToHex(hct) {
    const { hue, chroma, tone } = hct;
    if (tone <= 0) {
        return '#000000';
    }
    if (tone >= 100) {
        return '#FFFFFF';
    }
    if (chroma < 0.5) {
        const gray = toneToGray(tone);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHex"])(gray, gray, gray);
    }
    let lo = 0;
    let hi = chroma;
    let bestHex = '#000000';
    for(let i = 0; i < 16; i++){
        const mid = (lo + hi) / 2;
        const candidate = hctComponentToHex(hue, mid, tone);
        if (candidate !== null) {
            bestHex = candidate;
            lo = mid;
        } else {
            hi = mid;
        }
    }
    return bestHex;
}
function toneToGray(tone) {
    const y = toneToY(tone);
    return linearToSrgb(y);
}
function hctComponentToHex(hue, chroma, tone) {
    const hueRad = hue * Math.PI / 180;
    const a = Math.cos(hueRad) * chroma;
    const b = Math.sin(hueRad) * chroma;
    const L = tone;
    const [x, y, z] = labToXyz(L, a, b);
    const [lr, lg, lb] = xyzToLinearRgb(x, y, z);
    const r = linearToSrgb(lr);
    const g = linearToSrgb(lg);
    const bVal = linearToSrgb(lb);
    const rLin = srgbToLinear(r);
    const gLin = srgbToLinear(g);
    const bLin = srgbToLinear(bVal);
    const tolerance = 0.02;
    if (Math.abs(rLin - lr) > tolerance || Math.abs(gLin - lg) > tolerance || Math.abs(bLin - lb) > tolerance) {
        return null;
    }
    if (r < 0 || r > 255 || g < 0 || g > 255 || bVal < 0 || bVal > 255) {
        return null;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHex"])(r, g, bVal);
}
// =============================================================================
// Tonal Palette
// =============================================================================
const PALETTE_TONES = [
    0,
    5,
    10,
    20,
    30,
    40,
    50,
    60,
    70,
    80,
    90,
    95,
    99,
    100
];
function tonalPalette(hue, chroma) {
    const result = {};
    for (const tone of PALETTE_TONES){
        result[tone] = hctToHex({
            hue,
            chroma,
            tone
        });
    }
    return result;
}
function hexWithAlpha(hex, alpha) {
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0').toUpperCase();
    return hex + alphaHex;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/localTokens.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertNoTokenCycles",
    ()=>assertNoTokenCycles,
    "resolveAdaptationLocalTokens",
    ()=>resolveAdaptationLocalTokens,
    "resolveLocalTokenContract",
    ()=>resolveLocalTokenContract
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file localTokens.ts
 * @input Root and adaptation theme-local token declarations and references
 * @output Validated exact-name ownership metadata plus normalized conditional writes
 * @position Theme-local ownership boundary; final adaptation-cycle validation is
 *   performed after the reachable ordered cascade is assembled.
 */ const CSS_NAME_CHARACTER = String.raw`(?:[-_a-zA-Z0-9]|\P{ASCII}|\\(?:[0-9a-fA-F]{1,6}[ \t\r\n\f]?|[^\r\n\f]))`;
const CSS_CUSTOM_PROPERTY_NAME_PATTERN = new RegExp(`^--${CSS_NAME_CHARACTER}*$`, 'u');
const CSS_VAR_PATTERN = new RegExp(`var\\(\\s*(--${CSS_NAME_CHARACTER}*)(?=\\s*(?:,|\\)))`, 'giu');
function hasOwn(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
}
function isValidCSSCustomPropertyName(name) {
    return !name.includes('\0') && CSS_CUSTOM_PROPERTY_NAME_PATTERN.test(name);
}
function resolveTokenValue(value, path) {
    if (typeof value === 'string') {
        return value;
    }
    if (Array.isArray(value) && value.length === 2 && typeof value[0] === 'string' && typeof value[1] === 'string') {
        return `light-dark(${value[0]}, ${value[1]})`;
    }
    throw new Error(`${path} must be a CSS string or a [light, dark] string tuple.`);
}
function collectCustomPropertyReferences(value, refs) {
    if (typeof value === 'string') {
        CSS_VAR_PATTERN.lastIndex = 0;
        for(let match = CSS_VAR_PATTERN.exec(value); match; match = CSS_VAR_PATTERN.exec(value)){
            refs.add(match[1]);
        }
        return;
    }
    if (Array.isArray(value)) {
        for (const item of value){
            collectCustomPropertyReferences(item, refs);
        }
        return;
    }
    if (value && typeof value === 'object') {
        for (const nested of Object.values(value)){
            collectCustomPropertyReferences(nested, refs);
        }
    }
}
function assertNoTokenCycles(tokenValues, context, relevantNames) {
    const dependencies = new Map();
    for (const [name, value] of Object.entries(tokenValues)){
        const refs = new Set();
        collectCustomPropertyReferences(value, refs);
        dependencies.set(name, [
            ...refs
        ].filter((reference)=>hasOwn(tokenValues, reference)));
    }
    const findCyclePath = (start, component)=>{
        const path = [
            start
        ];
        const onPath = new Set(path);
        const search = (name)=>{
            for (const dependency of dependencies.get(name) ?? []){
                if (!component.has(dependency)) {
                    continue;
                }
                if (dependency === start) {
                    path.push(start);
                    return true;
                }
                if (onPath.has(dependency)) {
                    continue;
                }
                path.push(dependency);
                onPath.add(dependency);
                if (search(dependency)) {
                    return true;
                }
                onPath.delete(dependency);
                path.pop();
            }
            return false;
        };
        search(start);
        return path;
    };
    let nextIndex = 0;
    const indexes = new Map();
    const lowlinks = new Map();
    const stack = [];
    const onStack = new Set();
    const visit = (name)=>{
        const index = nextIndex++;
        indexes.set(name, index);
        lowlinks.set(name, index);
        stack.push(name);
        onStack.add(name);
        for (const dependency of dependencies.get(name) ?? []){
            if (!indexes.has(dependency)) {
                visit(dependency);
                lowlinks.set(name, Math.min(lowlinks.get(name) ?? index, lowlinks.get(dependency) ?? 0));
            } else if (onStack.has(dependency)) {
                lowlinks.set(name, Math.min(lowlinks.get(name) ?? index, indexes.get(dependency) ?? 0));
            }
        }
        if (lowlinks.get(name) !== index) {
            return;
        }
        const component = [];
        let member;
        do {
            member = stack.pop() ?? name;
            onStack.delete(member);
            component.push(member);
        }while (member !== name)
        const hasCycle = component.length > 1 || (dependencies.get(component[0]) ?? []).includes(component[0]);
        if (!hasCycle || relevantNames && !component.some((componentName)=>relevantNames.has(componentName))) {
            return;
        }
        const start = component.find((componentName)=>relevantNames?.has(componentName)) ?? component[0];
        const cycle = findCyclePath(start, new Set(component)).join(' -> ');
        throw new Error(`${context ? `${context}: ` : ''}Theme token cycle detected: ${cycle}.`);
    };
    for (const name of Object.keys(tokenValues)){
        if (!indexes.has(name)) {
            visit(name);
        }
    }
}
function assertInheritedContract(themeName, base) {
    const lineage = base.__localTokenLineage;
    if (!Array.isArray(lineage) || lineage.length === 0 || lineage[lineage.length - 1] !== base.name || lineage.some((name)=>typeof name !== 'string' || name.length === 0)) {
        throw new Error(`defineTheme("${themeName}"): the base theme has invalid theme-local token lineage metadata.`);
    }
    if (!base.localTokens || typeof base.localTokens !== 'object' || Array.isArray(base.localTokens) || !base.__localTokenOwners || typeof base.__localTokenOwners !== 'object' || Array.isArray(base.__localTokenOwners)) {
        throw new Error(`defineTheme("${themeName}"): the base theme has incomplete theme-local token metadata.`);
    }
    for (const [name, value] of Object.entries(base.localTokens)){
        const owner = base.__localTokenOwners[name];
        if (typeof value !== 'string' || !owner || !lineage.includes(owner) || !isValidCSSCustomPropertyName(name)) {
            throw new Error(`defineTheme("${themeName}"): inherited local token "${name}" does not match its exact lineage metadata.`);
        }
    }
    for (const name of Object.keys(base.__localTokenOwners)){
        if (!hasOwn(base.localTokens, name)) {
            throw new Error(`defineTheme("${themeName}"): inherited local-token owner metadata names undeclared token "${name}".`);
        }
    }
}
function resolveLocalTokenContract(input, base, tokens, portableTokens) {
    const directlyEnrolled = hasOwn(input, 'localTokens');
    const inherited = base?.__localTokenLineage !== undefined;
    if (!directlyEnrolled && !inherited) {
        return undefined;
    }
    if (inherited && base) {
        assertInheritedContract(input.name, base);
    }
    const localTokens = {
        ...base?.localTokens
    };
    const owners = {
        ...base?.__localTokenOwners
    };
    const declarations = input.localTokens;
    if (directlyEnrolled && (declarations === null || declarations === undefined || typeof declarations !== 'object' || Array.isArray(declarations))) {
        throw new Error(`defineTheme("${input.name}"): localTokens must be a token map.`);
    }
    for (const [name, value] of Object.entries(declarations ?? {})){
        const inheritedOwner = owners[name];
        if (!isValidCSSCustomPropertyName(name)) {
            throw new Error(`defineTheme("${input.name}"): local token "${name}" must be a valid CSS custom-property name.`);
        }
        if (!inheritedOwner) {
            owners[name] = input.name;
        }
        localTokens[name] = resolveTokenValue(value, `defineTheme("${input.name}").localTokens["${name}"]`);
    }
    for (const name of Object.keys(localTokens)){
        if (!owners[name]) {
            throw new Error(`defineTheme("${input.name}"): inherited local token "${name}" has no owner metadata.`);
        }
        if (hasOwn(tokens, name) || hasOwn(portableTokens, name)) {
            throw new Error(`defineTheme("${input.name}"): token "${name}" cannot be declared in both tokens and localTokens.`);
        }
    }
    assertNoTokenCycles(localTokens, `defineTheme("${input.name}").localTokens`);
    return {
        localTokens,
        owners,
        lineage: [
            ...base?.__localTokenLineage ?? [],
            input.name
        ]
    };
}
function resolveAdaptationLocalTokens(themeName, ruleIndex, declarations, rootLocalTokens) {
    const path = `defineTheme("${themeName}").adaptations.rules[${ruleIndex}].value.localTokens`;
    if (declarations === undefined) {
        return undefined;
    }
    if (declarations === null || typeof declarations !== 'object' || Array.isArray(declarations)) {
        throw new Error(`${path} must be a token map.`);
    }
    const resolved = {};
    for (const [name, value] of Object.entries(declarations)){
        if (!rootLocalTokens || !hasOwn(rootLocalTokens, name)) {
            throw new Error(`${path}["${name}"] cannot enroll a theme-local token. Declare it in the root theme or an exact enrolled base first.`);
        }
        resolved[name] = resolveTokenValue(value, `${path}["${name}"]`);
    }
    return Object.keys(resolved).length > 0 ? resolved : undefined;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/mergeComponents.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file Component style-map merging
 *
 * One merge rule for component overrides, shared by every layer that composes
 * them: `extends` inheritance, generated type-scale rules, and the on-media
 * (`onDark`/`onLight`) surfaces. Merging is per style key, so a child that
 * restates one property of `button.base` keeps the rest of the base's.
 *
 * @input two ComponentStyleMaps — the base and the overrides that win
 * @output a merged ComponentStyleMap
 * @position packages/core/src/theme/mergeComponents.ts
 */ /**
 * Deep-merge component style maps: `overrides` wins per style key, and every
 * component and key the base declared that the overrides do not mention is
 * carried through untouched.
 */ __turbopack_context__.s([
    "deepMergeComponents",
    ()=>deepMergeComponents
]);
function deepMergeComponents(base, overrides) {
    if (!base && !overrides) {
        return undefined;
    }
    if (!base) {
        return overrides;
    }
    if (!overrides) {
        return base;
    }
    const result = {};
    // Start with all base entries
    for (const [component, rules] of Object.entries(base)){
        result[component] = {
            ...rules
        };
    }
    // Merge overrides on top
    for (const [component, rules] of Object.entries(overrides)){
        if (!result[component]) {
            result[component] = {
                ...rules
            };
        } else {
            for (const [key, styles] of Object.entries(rules)){
                result[component][key] = {
                    ...result[component][key],
                    ...styles
                };
            }
        }
    }
    return result;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/motionKnobs.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file motionKnobs.ts
 * @input A theme's motion knobs (`tempo`, `character`)
 * @output Their types and `resolveMotionKnobs`, which fills in the defaults
 *   and clamps `tempo` (`spec:AST-108` FR1). `reducedMotion` is not a public
 *   knob until `'always'` ships: every theme resolves to `'system'`
 * @position Theme utility with no imports: themeMotion.ts builds the motion
 *   tokens on it, and the motion foundation reads a theme's knobs through it
 *   without loading the token stylesheet. Pure; safe on the server and in
 *   plain Node.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/theme/themeMotion.ts (re-exports these)
 * - /packages/core/src/theme/themeMotion.test.ts
 */ /** How lively a theme's motion feels. */ /**
 * Whose Reduce Motion setting a theme follows: `'system'`, each person's own,
 * or `'always'`, reduced for everyone. Internal: `resolveKnobs` resolves
 * every theme to `'system'` until `'always'` ships (`spec:AST-108` FR6).
 */ /** The motion knobs a theme sets (`spec:AST-108` FR1). */ /** The knobs with their defaults filled in and `tempo` clamped. */ /** The range `tempo` is clamped to. */ __turbopack_context__.s([
    "TEMPO_RANGE",
    ()=>TEMPO_RANGE,
    "resolveKnobs",
    ()=>resolveKnobs
]);
const TEMPO_RANGE = {
    min: 0.75,
    max: 1.5
};
const CHARACTERS = [
    'crisp',
    'standard',
    'expressive'
];
function resolveKnobs(config) {
    const tempoIsSet = typeof config?.tempo === 'number' && Number.isFinite(config.tempo);
    const tempo = tempoIsSet ? Math.min(TEMPO_RANGE.max, Math.max(TEMPO_RANGE.min, config.tempo)) : 1;
    const character = config?.character != null && CHARACTERS.includes(config.character) ? config.character : 'standard';
    return {
        tempo,
        character,
        reducedMotion: 'system',
        tempoIsSet
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/onMediaTokens.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultOnDarkTokens",
    ()=>defaultOnDarkTokens,
    "defaultOnLightTokens",
    ()=>defaultOnLightTokens,
    "resolveOnMedia",
    ()=>resolveOnMedia
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file onMediaTokens.ts
 * @input Theme token values from defineTheme
 * @output Default on-dark / on-light token overrides for MediaTheme
 * @position Theme system utility; consumed by defineTheme and generateThemeRules
 *
 * Generates semantic token overrides for content rendered on inverted surfaces.
 * "onDark" = content on a dark background (light text, white-tinted interactions)
 * "onLight" = content on a light background (dark text, black-tinted interactions)
 *
 * The primary mechanism is `color-scheme` — setting `color-scheme: dark` on the
 * media element makes all `light-dark()` tokens resolve to their dark-side values.
 * Only a small set of tokens need explicit overrides (text/icon primary use
 * `var(--color-on-dark)` instead of the dark-mode grey, accent collapses to
 * on-color, etc.).
 *
 * Themes can provide additional token and component overrides via the
 * `onDark`/`onLight` fields in `defineTheme()`.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$mergeComponents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/mergeComponents.js [app-client] (ecmascript)");
;
const defaultOnDarkTokens = {
    'color-scheme': 'dark',
    // Text/icon primary — pure on-color, not dark-mode grey
    '--color-text-primary': 'var(--color-on-dark)',
    '--color-icon-primary': 'var(--color-on-dark)',
    // Accent collapses to on-color in inverted context
    '--color-accent': 'var(--color-on-dark)'
};
const defaultOnLightTokens = {
    'color-scheme': 'light',
    // Text/icon primary — pure on-color, not light-mode dark
    '--color-text-primary': 'var(--color-on-light)',
    '--color-icon-primary': 'var(--color-on-light)',
    // Accent collapses to on-color
    '--color-accent': 'var(--color-on-light)'
};
/**
 * Resolve a token value to a CSS string.
 */ function resolveValue(value) {
    if (Array.isArray(value)) {
        return `light-dark(${value[0]}, ${value[1]})`;
    }
    return value;
}
function resolveOnMedia(surface, input, base) {
    const defaults = surface === 'dark' ? defaultOnDarkTokens : defaultOnLightTokens;
    const tokens = {
        ...defaults,
        ...base?.tokens
    };
    if (input?.tokens) {
        for (const [key, value] of Object.entries(input.tokens)){
            if (value !== undefined) {
                tokens[key] = resolveValue(value);
            }
        }
    }
    return {
        tokens,
        components: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$mergeComponents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepMergeComponents"])(base?.components, input?.components)
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/resolveThemeValues.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildFontFamily",
    ()=>buildFontFamily,
    "buildFontFamilyTokens",
    ()=>buildFontFamilyTokens,
    "buildTypeScaleConfig",
    ()=>buildTypeScaleConfig,
    "resolveFontWeight",
    ()=>resolveFontWeight,
    "resolveThemeValues",
    ()=>resolveThemeValues,
    "resolveTokenValue",
    ()=>resolveTokenValue
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file resolveThemeValues.ts
 * @input The value-bearing axes of a theme input (typography, color, radius,
 *        motion, syntax, tokens, components) and an optional resolved seed
 * @output A resolved token map and component style map
 * @position Theme system core; consumed by defineTheme and themeAdaptations
 *
 * One resolution pipeline, shared by every layer that turns declarative theme
 * axes into concrete values. `defineTheme` runs its top-level input over an
 * optional base seed. An adaptation rule completes partial axes from root
 * metadata first, then runs its own value without a seed to obtain exactly the
 * leaves that rule writes.
 *
 * Precedence inside one resolved layer, lowest to highest: seed → color → type
 * scale → radius → motion → font families → syntax → explicit `tokens`.
 * Ordered rule-vs-root and rule-vs-rule precedence is owned by
 * `themeAdaptations` and CSS source order, outside this value resolver.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/theme/defineTheme.ts (its only other caller)
 * - /packages/core/src/theme/themeAdaptations.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$expandTypeScale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/expandTypeScale.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeMotion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/themeMotion.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$expandRadiusScale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/expandRadiusScale.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$expandColorScale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/expandColorScale.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$mergeComponents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/mergeComponents.js [app-client] (ecmascript)");
;
;
;
;
;
;
function resolveTokenValue(value, { strict = false } = {}) {
    if (typeof value === 'string') {
        return value;
    }
    if (Array.isArray(value) && value.length === 2 && typeof value[0] === 'string' && typeof value[1] === 'string') {
        return `light-dark(${value[0]}, ${value[1]})`;
    }
    if (strict) {
        throw new Error('Theme token values must be CSS strings or [light, dark] string tuples.');
    }
    // The legacy path, preserved verbatim: any array is read as a light/dark
    // pair, and a non-string scalar is emitted as it always was. TypeScript has
    // narrowed `value` to `never` by here — by the declared type these cannot
    // exist, and that mismatch with runtime is exactly why this path stays.
    if (Array.isArray(value)) {
        return `light-dark(${value[0]}, ${value[1]})`;
    }
    return value;
}
function resolveFontWeight(weight) {
    const named = {
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)'
    };
    return named[weight] ?? weight;
}
function buildFontFamily(family, fallbacks) {
    if (!family) {
        return undefined;
    }
    const quoted = family.includes(' ') ? `"${family}"` : family;
    if (fallbacks) {
        return `${quoted}, ${fallbacks}`;
    }
    return quoted;
}
function buildTypeScaleConfig(typo) {
    if (!typo.scale) {
        return undefined;
    }
    // Collect weight overrides from typography roles
    const headingWeights = {};
    const headingRole = typo.heading;
    if (headingRole?.weights) {
        for (const [level, w] of Object.entries(headingRole.weights)){
            if (w) {
                headingWeights[Number(level)] = resolveFontWeight(w);
            }
        }
    }
    // Default heading weight from role
    const defaultHeadingWeight = headingRole?.weight ? resolveFontWeight(headingRole.weight) : undefined;
    if (defaultHeadingWeight) {
        for(let i = 1; i <= 6; i++){
            if (!(i in headingWeights)) {
                headingWeights[i] = defaultHeadingWeight;
            }
        }
    }
    // Text weight overrides from roles
    const textWeights = {};
    if (typo.body?.weight) {
        textWeights.body = resolveFontWeight(typo.body.weight);
    }
    if (typo.code?.weight) {
        textWeights.code = resolveFontWeight(typo.code.weight);
    }
    return {
        base: typo.scale.base,
        ratio: typo.scale.ratio,
        weights: {
            ...Object.keys(headingWeights).length > 0 ? {
                heading: headingWeights
            } : {},
            ...Object.keys(textWeights).length > 0 ? {
                text: textWeights
            } : {}
        }
    };
}
function buildFontFamilyTokens(typo) {
    const tokens = {};
    const bodyFamily = buildFontFamily(typo.body?.family, typo.body?.fallbacks);
    const headingFamily = buildFontFamily(typo.heading?.family, typo.heading?.fallbacks) ?? bodyFamily;
    const codeFamily = buildFontFamily(typo.code?.family, typo.code?.fallbacks);
    if (bodyFamily) {
        tokens['--font-family-body'] = bodyFamily;
    }
    if (headingFamily) {
        tokens['--font-family-heading'] = headingFamily;
    }
    if (codeFamily) {
        tokens['--font-family-code'] = codeFamily;
    }
    return tokens;
}
function resolveThemeValues(input, seed, { strictTokens = false, inheritedCharacter, standardBeneath } = {}) {
    const tokens = {
        ...seed?.tokens
    };
    const typo = input.typography;
    const typeScaleConfig = typo ? buildTypeScaleConfig(typo) : undefined;
    // 1. Color-generated tokens (lowest precedence for colors)
    if (input.color) {
        Object.assign(tokens, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$expandColorScale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandColorScale"])(input.color));
    }
    // 2. Type-scale-generated tokens
    if (typeScaleConfig) {
        Object.assign(tokens, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$expandTypeScale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandTypeScale"])(typeScaleConfig));
    }
    // 3. Radius-generated tokens
    if (input.radius) {
        Object.assign(tokens, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$expandRadiusScale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandRadiusScale"])(input.radius));
    }
    // 4. Motion-generated tokens (spec:AST-108 FR2, FR5). A layer that writes
    // durations also writes the copies busy loops read (FR4), so an enclosing
    // theme's tempo copies never stand in for its own: without a tempo of its
    // own, they are its durations. Such a layer also writes a tempo of 1, so
    // its springs keep the pace of its durations inside a theme with a tempo.
    if (input.motion) {
        const motion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeMotion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["expandThemeMotion"])(input.motion);
        Object.assign(tokens, motion);
        let writesDurations = false;
        for (const [name, value] of Object.entries(motion)){
            const preTempo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeMotion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["preTempoName"])(name);
            if (preTempo !== name) {
                writesDurations = true;
                if (!(preTempo in motion)) {
                    tokens[preTempo] = value;
                }
            }
        }
        if (writesDurations && !(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeMotion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MOTION_TEMPO_PROPERTY"] in motion)) {
            tokens[__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeMotion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MOTION_TEMPO_PROPERTY"]] = '1';
        }
    }
    // 5. Font family tokens
    if (typo) {
        Object.assign(tokens, buildFontFamilyTokens(typo));
    }
    // 6. Syntax theme tokens
    if (input.syntax) {
        const prefix = '--color-syntax-';
        for (const [key, value] of Object.entries(input.syntax.tokens)){
            tokens[prefix + key] = value;
        }
    }
    // 7. Explicit token overrides — highest precedence within this input layer.
    // A generated axis in the same root or adaptation value cannot beat them.
    if (input.tokens) {
        const own = input.tokens;
        for (const [key, value] of Object.entries(input.tokens)){
            if (value !== undefined) {
                tokens[key] = resolveTokenValue(value, {
                    strict: strictTokens
                });
                // An explicit duration beats tempo, so a busy loop reading the
                // pre-tempo value reads it too (spec:AST-108 FR4).
                const preTempo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeMotion$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["preTempoName"])(key);
                if (preTempo !== key && own[preTempo] === undefined) {
                    tokens[preTempo] = tokens[key];
                }
            }
        }
    }
    // At 'standard', --ease-entrance and --ease-move equal the resolved
    // --ease-standard (spec:AST-108 FR2): the layer's own, else the one beneath
    // it. A layer that sets them itself, or whose character, its own or the one
    // it inherits, picks its own curve, keeps them.
    const own = input.tokens ?? {};
    const ownCharacter = input.motion != null && 'character' in input.motion ? input.motion.character : undefined;
    const character = ownCharacter ?? inheritedCharacter;
    if (ownCharacter === 'standard' || own['--ease-standard'] !== undefined && (character === undefined || character === 'standard')) {
        const standard = tokens['--ease-standard'] ?? standardBeneath ?? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easeDefaults"]['--ease-standard'];
        for (const name of [
            '--ease-entrance',
            '--ease-move'
        ]){
            if (own[name] === undefined) {
                tokens[name] = standard;
            }
        }
    }
    // Components: generated type-scale rules (lowest) → this input's own →
    // all of it over the seed's.
    let components = input.components;
    if (typeScaleConfig) {
        components = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$mergeComponents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepMergeComponents"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$expandTypeScale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateTypeScaleComponents"])(typeScaleConfig), input.components);
    }
    if (seed?.components) {
        components = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$mergeComponents$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepMergeComponents"])(seed.components, components);
    }
    return {
        tokens,
        components
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/statusColor.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STATUS_CHROMA_FLOOR",
    ()=>STATUS_CHROMA_FLOOR,
    "STATUS_LIGHTNESS_RANGE",
    ()=>STATUS_LIGHTNESS_RANGE,
    "composite",
    ()=>composite,
    "contrastRatio",
    ()=>contrastRatio,
    "fromOklch",
    ()=>fromOklch,
    "isChromatic",
    ()=>isChromatic,
    "parseConcreteColor",
    ()=>parseConcreteColor,
    "relativeLuminance",
    ()=>relativeLuminance,
    "solveLightness",
    ()=>solveLightness,
    "toHex",
    ()=>toHex,
    "toOklch",
    ()=>toOklch
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file statusColor.ts
 * @input Concrete sRGB colours (hex or rgb()) from resolved theme tokens
 * @output Contrast, OKLCH, chroma, and lightness-solving helpers for status roles
 * @position Pure colour maths shared by status-role derivation
 *   (architecture:theme-compilation INV17) and the status contrast checks.
 *
 * Contrast follows WCAG 2.x relative luminance. Lightness adjustments move a
 * colour along OKLCH lightness at its own hue, reducing chroma only as far as
 * needed to stay inside sRGB, so a derived role keeps its status hue.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/color.js [app-client] (ecmascript)");
;
const toLinear = (v)=>{
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const fromLinear = (v)=>{
    const c = v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055;
    return c * 255;
};
function composite(top, under) {
    const a = top.a;
    return {
        r: top.r * a + under.r * (1 - a),
        g: top.g * a + under.g * (1 - a),
        b: top.b * a + under.b * (1 - a),
        a: 1
    };
}
function relativeLuminance({ r, g, b }) {
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}
function contrastRatio(foreground, background) {
    const bg = background.a < 1 ? composite(background, {
        r: 255,
        g: 255,
        b: 255,
        a: 1
    }) : background;
    const fg = foreground.a < 1 ? composite(foreground, bg) : foreground;
    const a = relativeLuminance(fg);
    const b = relativeLuminance(bg);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
function toOklch({ r, g, b }) {
    const lr = toLinear(r);
    const lg = toLinear(g);
    const lb = toLinear(b);
    const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
    const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
    const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
    const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    return {
        l: L,
        c: Math.hypot(A, B),
        h: Math.atan2(B, A)
    };
}
function oklchToLinear({ l: L, c, h }) {
    const A = c * Math.cos(h);
    const B = c * Math.sin(h);
    const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
    const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
    const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
    return [
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
    ];
}
function fromOklch(color) {
    let c = color.c;
    for(let i = 0; i < 40; i++){
        const rgb = oklchToLinear({
            ...color,
            c
        });
        if (rgb.every((v)=>v >= -1e-4 && v <= 1 + 1e-4)) {
            const [r, g, b] = rgb.map((v)=>fromLinear(Math.min(1, Math.max(0, v))));
            return {
                r,
                g,
                b,
                a: 1
            };
        }
        c *= 0.9;
    }
    const [r, g, b] = oklchToLinear({
        ...color,
        c: 0
    }).map((v)=>fromLinear(Math.min(1, Math.max(0, v))));
    return {
        r,
        g,
        b,
        a: 1
    };
}
const STATUS_CHROMA_FLOOR = 0.03;
const STATUS_LIGHTNESS_RANGE = [
    0.2,
    0.95
];
function isChromatic(color) {
    const { l, c } = toOklch(color);
    return c >= STATUS_CHROMA_FLOOR && l >= STATUS_LIGHTNESS_RANGE[0] && l <= STATUS_LIGHTNESS_RANGE[1];
}
function solveLightness(color, backdrops, ratio) {
    const passes = (candidate)=>backdrops.every((backdrop)=>contrastRatio(candidate, backdrop) >= ratio);
    const opaque = {
        ...color,
        a: 1
    };
    if (passes(opaque)) {
        return opaque;
    }
    const meanLuminance = backdrops.reduce((sum, b)=>sum + relativeLuminance(b), 0) / backdrops.length;
    const base = toOklch(opaque);
    // Light backdrops need a darker colour; dark backdrops a lighter one.
    const darker = meanLuminance > 0.18;
    let lo = darker ? 0 : base.l;
    let hi = darker ? base.l : 1;
    const at = (l)=>fromOklch({
            ...base,
            l
        });
    const target = darker ? at(0) : at(1);
    if (!passes(target)) {
        return null;
    }
    // Binary search for the passing lightness closest to the original.
    for(let i = 0; i < 32; i++){
        const mid = (lo + hi) / 2;
        const ok = passes(at(mid));
        if (darker) {
            if (ok) {
                lo = mid;
            } else {
                hi = mid;
            }
        } else if (ok) {
            hi = mid;
        } else {
            lo = mid;
        }
    }
    const solved = at(darker ? lo : hi);
    return passes(solved) ? solved : target;
}
function parseConcreteColor(value) {
    return value === undefined ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseColor"])(value);
}
function toHex(color) {
    const hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatHex"])(color.r, color.g, color.b);
    if (color.a >= 1) {
        return hex;
    }
    const alpha = Math.round(color.a * 255).toString(16).padStart(2, '0').toUpperCase();
    return `${hex}${alpha}`;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/statusRoleDerivation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STATUS_NAMES",
    ()=>STATUS_NAMES,
    "deriveStatusRoleTokens",
    ()=>deriveStatusRoleTokens,
    "statusSourceToken",
    ()=>statusSourceToken
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file statusRoleDerivation.ts
 * @input A theme's portable and local token maps
 * @output Concrete values for the status roles the theme does not set
 * @position Theme generation step for architecture:theme-compilation INV17,
 *   called by generateThemeRules for runtime and static output alike.
 *
 * Each status (`info`, `success`, `warning`, `error`) has one strong fill,
 * `--color-<status>`. A theme that sets a fill, its content, its pale fill, or
 * a surface gets the roles it leaves unset, computed against its own colours:
 * - `--color-on-<status>`: the theme's light or dark content colour
 *   (`--color-on-dark` or `--color-on-light`), whichever contrasts more with
 *   the fill, or pure white or black when neither reaches 4.5:1;
 * - `--color-text-<status>`: the fill's hue at 4.5:1 on surface and card;
 * - `--color-on-<status>-muted`: the fill's hue at 4.5:1 on the pale fill over
 *   the surface.
 * Fills are never derived: a fill a theme does not set is Core's. Icon and
 * border roles alias the text role through the scoped status-role aliases in
 * generateThemeRules, so they are not computed here.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/statusColor.js [app-client] (ecmascript)");
;
;
const STATUS_NAMES = [
    'info',
    'success',
    'warning',
    'error'
];
const TEXT_RATIO = 4.5;
// Solve slightly above the floor so rounding to #RRGGBB never lands below it.
const SOLVE_RATIO = TEXT_RATIO + 0.08;
const MODES = [
    'light',
    'dark'
];
function statusSourceToken(status) {
    return `--color-${status}`;
}
function splitTopLevel(input) {
    const parts = [];
    let depth = 0;
    let current = '';
    for (const ch of input){
        if (ch === '(') {
            depth++;
        }
        if (ch === ')') {
            depth--;
        }
        if (ch === ',' && depth === 0) {
            parts.push(current.trim());
            current = '';
            continue;
        }
        current += ch;
    }
    parts.push(current.trim());
    return parts;
}
/**
 * Resolve one token to a concrete value for a mode, following `light-dark()`
 * and `var()` through the theme's tokens and then Core's colour defaults.
 * This stays local (rather than using tokens.ts) so theme generation does not
 * import the runtime token helpers that themselves depend on defineTheme.
 */ function resolveToken(tokens, name, mode, seen = new Set()) {
    if (seen.has(name)) {
        return undefined;
    }
    const raw = tokens[name] ?? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorDefaults"][name];
    return resolveValue(tokens, raw, mode, new Set([
        ...seen,
        name
    ]));
}
function resolveValue(tokens, raw, mode, seen) {
    if (Array.isArray(raw)) {
        return resolveValue(tokens, raw[mode === 'light' ? 0 : 1], mode, seen);
    }
    if (typeof raw !== 'string') {
        return undefined;
    }
    const value = raw.trim();
    if (/^light-dark\(/i.test(value) && value.endsWith(')')) {
        const [light, dark] = splitTopLevel(value.slice(value.indexOf('(') + 1, -1));
        return resolveValue(tokens, mode === 'light' ? light : dark, mode, seen);
    }
    const ref = /^var\(\s*(--[\w-]+)\s*(?:,(.*))?\)$/s.exec(value);
    if (ref) {
        const resolved = resolveToken(tokens, ref[1], mode, seen);
        return resolved ?? (ref[2] ? resolveValue(tokens, ref[2], mode, seen) : undefined);
    }
    return value;
}
const CORE_TOKENS = {};
function resolveModes(tokens) {
    const names = new Set([
        ...Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorDefaults"]),
        ...Object.keys(tokens)
    ]);
    const at = (mode)=>{
        const out = {};
        for (const name of names){
            const value = resolveToken(tokens, name, mode);
            if (value !== undefined) {
                out[name] = value;
            }
        }
        return out;
    };
    return {
        light: at('light'),
        dark: at('dark')
    };
}
let coreCache;
function core() {
    coreCache ??= resolveModes(CORE_TOKENS);
    return coreCache;
}
function statusHue(status, resolved, mode) {
    const color = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseConcreteColor"])(resolved[statusSourceToken(status)]);
    if (color !== null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isChromatic"])(color)) {
        return {
            ...color,
            a: 1
        };
    }
    // A grey source falls back to Core's own status hue, so derived text stays
    // chromatic.
    const fallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseConcreteColor"])(core()[mode][statusSourceToken(status)]);
    return fallback === null ? null : {
        ...fallback,
        a: 1
    };
}
function opaqueOver(color, under) {
    return color.a < 1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composite"])(color, under) : color;
}
function deriveForMode(status, resolved, mode) {
    // Every colour the computations measure must be concrete. When one is not
    // (an oklch() value, an unknown reference), the status keeps its scoped
    // aliases instead of a guess (architecture:theme-compilation INV17).
    const source = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseConcreteColor"])(resolved[statusSourceToken(status)]);
    const hue = statusHue(status, resolved, mode);
    const surface = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseConcreteColor"])(resolved['--color-background-surface']);
    const cardColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseConcreteColor"])(resolved['--color-background-card']);
    const muted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseConcreteColor"])(resolved[`--color-${status}-muted`]);
    const onDark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseConcreteColor"])(resolved['--color-on-dark']);
    const onLight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseConcreteColor"])(resolved['--color-on-light']);
    if (source === null || hue === null || surface === null || cardColor === null || muted === null || onDark === null || onLight === null) {
        return null;
    }
    const opaqueSurface = opaqueOver(surface, {
        r: 255,
        g: 255,
        b: 255,
        a: 1
    });
    const card = opaqueOver(cardColor, opaqueSurface);
    const fill = opaqueOver(source, opaqueSurface);
    const roles = {};
    const lightInk = opaqueOver(onDark, fill);
    const darkInk = opaqueOver(onLight, fill);
    const themeInk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contrastRatio"])(lightInk, fill) >= (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contrastRatio"])(darkInk, fill) ? lightInk : darkInk;
    // A theme's off-white and off-black content can both miss the floor on a
    // mid-tone fill; pure white or black always reaches it.
    const white = {
        r: 255,
        g: 255,
        b: 255,
        a: 1
    };
    const black = {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    };
    roles.on = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contrastRatio"])(themeInk, fill) >= TEXT_RATIO ? themeInk : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contrastRatio"])(white, fill) >= (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["contrastRatio"])(black, fill) ? white : black;
    const text = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solveLightness"])(hue, [
        opaqueSurface,
        card
    ], SOLVE_RATIO);
    if (text !== null) {
        roles.text = text;
    }
    const pale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composite"])(muted.a < 1 ? muted : {
        ...muted,
        a: 1
    }, opaqueSurface);
    const onMuted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["solveLightness"])(hue, [
        pale
    ], SOLVE_RATIO);
    if (onMuted !== null) {
        roles.onMuted = onMuted;
    }
    return roles;
}
const ROLE_TOKENS = {
    on: (s)=>`--color-on-${s}`,
    text: (s)=>`--color-text-${s}`,
    onMuted: (s)=>`--color-on-${s}-muted`
};
function deriveStatusRoleTokens(tokens, localTokens = {}) {
    const authored = new Set(Object.keys(tokens));
    const surfaceSet = authored.has('--color-background-surface') || authored.has('--color-background-card');
    const inkSet = authored.has('--color-on-dark') || authored.has('--color-on-light');
    const resolved = resolveModes({
        ...localTokens,
        ...tokens
    });
    const entries = [];
    for (const status of STATUS_NAMES){
        const fillSet = authored.has(statusSourceToken(status));
        const mutedSet = authored.has(`--color-${status}-muted`);
        // Which roles this theme's own colours affect.
        const affects = {
            on: fillSet || inkSet,
            text: fillSet || surfaceSet,
            onMuted: fillSet || mutedSet || surfaceSet
        };
        if (!affects.on && !affects.text && !affects.onMuted) {
            continue;
        }
        const perMode = MODES.map((mode)=>deriveForMode(status, resolved[mode], mode));
        if (perMode.some((r)=>r === null)) {
            continue;
        }
        for (const key of Object.keys(ROLE_TOKENS)){
            const token = ROLE_TOKENS[key](status);
            if (!affects[key] || authored.has(token)) {
                continue;
            }
            const [light, dark] = perMode.map((r)=>r?.[key]);
            if (light === undefined || dark === undefined) {
                continue;
            }
            entries.push([
                token,
                `light-dark(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(light)}, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$statusColor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(dark)})`
            ]);
        }
    }
    return entries;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/syntax/defineSyntaxTheme.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_SYNTAX_KEYS",
    ()=>ALL_SYNTAX_KEYS,
    "REQUIRED_SYNTAX_KEYS",
    ()=>REQUIRED_SYNTAX_KEYS,
    "defineSyntaxTheme",
    ()=>defineSyntaxTheme,
    "resolveSyntaxTokenForMode",
    ()=>resolveSyntaxTokenForMode,
    "syntaxThemeStyle",
    ()=>syntaxThemeStyle,
    "syntaxThemeToCSS",
    ()=>syntaxThemeToCSS
]);
/**
 * @file defineSyntaxTheme.ts
 * @input syntaxTokenDefaults from tokens.ts
 * @output defineSyntaxTheme, SyntaxTheme, syntaxThemeStyle
 * @position Syntax theme definition API; consumed by presets, SyntaxTheme, defineTheme
 *
 * @see https://github.com/meta/astryx/issues/1148
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$syntax$2f$tokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/syntax/tokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/devWarning.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use strict';
;
;
// =============================================================================
// Types
// =============================================================================
/** Human-readable syntax token name (without CSS custom property prefix). */ /** The diff row slots a syntax theme MAY set; unset ones keep their defaults. */ /**
 * Token value — either a single string or a [light, dark] tuple.
 * Tuples are converted to CSS light-dark() at theme creation time.
 */ /**
 * Token map for defineSyntaxTheme input — values can be strings or tuples.
 * The diff row slots are optional: a theme that sets none keeps the defaults
 * (semantic success/error muted tints and the muted surface).
 */ /**
 * Resolved token map — all values are CSS strings (tuples resolved to
 * light-dark()). The diff row slots are optional here as in the input, so a
 * map written before they existed still type-checks; an unset slot renders
 * its default.
 */ /** Input to defineSyntaxTheme. */ /** A defined syntax theme — tokens are resolved to CSS strings. */ // =============================================================================
// Token key <-> CSS property mapping
// =============================================================================
const CSS_PREFIX = '--color-syntax-';
function toCSSProperty(key) {
    return CSS_PREFIX + key;
}
const ALL_SYNTAX_KEYS = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$syntax$2f$tokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syntaxTokenDefaults"]).map((k)=>k.replace(CSS_PREFIX, ''));
const DIFF_KEYS = new Set(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$syntax$2f$tokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIFF_SYNTAX_TOKEN_NAMES"].map((name)=>name.replace(CSS_PREFIX, '')));
/** The marker slots: unset in a theme, they follow that theme's punctuation. */ const MARKER_KEYS = new Set([
    'added-marker',
    'removed-marker'
]);
const REQUIRED_SYNTAX_KEYS = ALL_SYNTAX_KEYS.filter((key)=>!DIFF_KEYS.has(key));
// =============================================================================
// Helpers
// =============================================================================
/** Resolve a token value to a CSS string. Tuples become light-dark(). */ function resolveTokenValue(value) {
    if (Array.isArray(value)) {
        return `light-dark(${value[0]}, ${value[1]})`;
    }
    return value;
}
function resolveSyntaxTokenForMode(value, mode) {
    if (Array.isArray(value)) {
        return mode === 'dark' ? value[1] : value[0];
    }
    const match = value.match(/^light-dark\(([^,]+),([^)]+)\)$/);
    if (match) {
        return mode === 'dark' ? match[2].trim() : match[1].trim();
    }
    return value;
}
function defineSyntaxTheme(input) {
    const missing = REQUIRED_SYNTAX_KEYS.filter((key)=>!(key in input.tokens));
    if (missing.length > 0) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["devWarn"])('defineSyntaxTheme', `"${input.name}": missing tokens: ${missing.join(', ')}. ` + `All ${REQUIRED_SYNTAX_KEYS.length} syntax colour tokens are required; ` + `the diff row slots (added, removed, diff-header, added-marker, removed-marker) are optional.`);
    }
    // Resolve tuples to light-dark() CSS strings. An unset diff row paint keeps
    // its default so every existing theme renders a readable diff unchanged; an
    // unset marker slot takes this theme's own line-number colour (its
    // punctuation token) rather than the page theme's green and red, and an
    // unset header paint is none at all (the header row sits on this theme's
    // own background with punctuation text), so number, glyph, and header
    // text stay legible on this theme's background in every page mode — the
    // glyph's shape carries the meaning where the colour does not.
    const resolved = {};
    for (const key of ALL_SYNTAX_KEYS){
        const value = input.tokens[key];
        resolved[key] = value !== undefined ? resolveTokenValue(value) : MARKER_KEYS.has(key) ? 'var(--color-syntax-punctuation)' : key === 'diff-header' ? 'transparent' : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$syntax$2f$tokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syntaxTokenDefaults"][toCSSProperty(key)];
    }
    return {
        name: input.name,
        tokens: resolved,
        __inputTokens: {
            ...input.tokens
        }
    };
}
function syntaxThemeStyle(theme) {
    const vars = {};
    for (const key of ALL_SYNTAX_KEYS){
        // An unset diff slot is left to its default rather than written empty.
        const value = theme.tokens[key];
        if (value !== undefined) vars[toCSSProperty(key)] = value;
    }
    return vars;
}
function syntaxThemeToCSS(theme) {
    // An unset diff slot is left to its default rather than written `undefined`.
    return ALL_SYNTAX_KEYS.filter((key)=>theme.tokens[key] !== undefined).map((key)=>toCSSProperty(key) + ': ' + theme.tokens[key] + ';').join('\n  ');
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/syntax/tokens.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file tokens.ts
 * @input None (pure token definitions)
 * @output syntaxTokenDefaults, SyntaxTokenName
 * @position Domain token sub-module; re-exported from domainTokens/index.ts
 *
 * Code syntax highlighting tokens. Used by the CodeBlock component and any
 * consumer that renders highlighted source code.
 *
 * Default values reference the theme's named palette via var() so syntax
 * colors automatically adapt to any theme's color system. Themes can also
 * set an explicit syntax theme via defineTheme({ syntax: dracula }).
 *
 * 14 token colours and the code background, validated against 11 community
 * code themes — all of them map cleanly to those slots — plus five diff row
 * slots (added, removed, header paints; added and removed markers) that default
 * to semantic tokens, so a syntax theme that does not set them keeps a
 * readable diff.
 *
 * @see https://github.com/meta/astryx/issues/1148
 */ __turbopack_context__.s([
    "DIFF_SYNTAX_TOKEN_NAMES",
    ()=>DIFF_SYNTAX_TOKEN_NAMES,
    "syntaxTokenDefaults",
    ()=>syntaxTokenDefaults
]);
const syntaxTokenDefaults = {
    // keyword -> accent text (control flow: if, return, const)
    '--color-syntax-keyword': 'var(--color-text-accent)',
    // string -> green text (string literals)
    '--color-syntax-string': 'var(--color-text-green)',
    // comment -> secondary text (passive annotations)
    '--color-syntax-comment': 'var(--color-text-secondary)',
    // number -> orange text (numeric literals)
    '--color-syntax-number': 'var(--color-text-orange)',
    // function -> blue text (function/method names)
    '--color-syntax-function': 'var(--color-text-blue)',
    // type -> purple text (types, interfaces, classes)
    '--color-syntax-type': 'var(--color-text-purple)',
    // variable -> primary text (neutral identifiers)
    '--color-syntax-variable': 'var(--color-text-primary)',
    // operator -> cyan text (=, +, =>, &&)
    '--color-syntax-operator': 'var(--color-text-cyan)',
    // constant -> orange text (true, false, null)
    '--color-syntax-constant': 'var(--color-text-orange)',
    // tag -> red text (HTML/JSX tags)
    '--color-syntax-tag': 'var(--color-text-red)',
    // attribute -> teal text (HTML/JSX attributes)
    '--color-syntax-attribute': 'var(--color-text-teal)',
    // property -> cyan text (object properties)
    '--color-syntax-property': 'var(--color-text-cyan)',
    // punctuation -> secondary text (brackets, semicolons). Not disabled text:
    // disabled grey is calibrated to fail AA on purpose (WCAG exempts inactive
    // controls), and punctuation in a code sample is normal, always-active
    // text — see #5386.
    '--color-syntax-punctuation': 'var(--color-text-secondary)',
    // background -> muted surface
    '--color-syntax-background': 'var(--color-background-muted)',
    // Diff rows (CodeBlock isDiff): whole-row tints behind unchanged syntax
    // colours. Added/removed derive from the semantic success/error muted
    // tokens at 25% strength: at full strength the secondary-grey syntax
    // tokens (operator, punctuation, comment) fall under 4.5:1 on the tints
    // in light; at 25% every default token clears it on both schemes with
    // margin while the tint still reads against the plain row. Header rows
    // (@@, and ---/+++ before the first hunk) sit on the muted surface.
    '--color-syntax-added': 'color-mix(in srgb, var(--color-success-muted) 25%, transparent)',
    '--color-syntax-removed': 'color-mix(in srgb, var(--color-error-muted) 25%, transparent)',
    '--color-syntax-diff-header': 'var(--color-background-muted)',
    // The margin of a changed row — its line number and +/- glyph — in the
    // default theme's tinted-text tokens, made for tinted surfaces; a defined
    // syntax theme that leaves them unset follows its own punctuation colour
    // (see defineSyntaxTheme). Code text keeps the syntax theme's colours.
    '--color-syntax-added-marker': 'var(--color-text-green)',
    '--color-syntax-removed-marker': 'var(--color-text-red)'
};
const DIFF_SYNTAX_TOKEN_NAMES = [
    '--color-syntax-added',
    '--color-syntax-removed',
    '--color-syntax-diff-header',
    '--color-syntax-added-marker',
    '--color-syntax-removed-marker'
];
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/themeAdaptations.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_COMPACT_DEFINITION",
    ()=>DEFAULT_COMPACT_DEFINITION,
    "DEFAULT_WIDTH_BREAKPOINTS",
    ()=>DEFAULT_WIDTH_BREAKPOINTS,
    "WIDTH_BREAKPOINT_NAMES",
    ()=>WIDTH_BREAKPOINT_NAMES,
    "compactDefinition",
    ()=>compactDefinition,
    "normalizeThemeAdaptations",
    ()=>normalizeThemeAdaptations,
    "resolveThemeAdaptationRules",
    ()=>resolveThemeAdaptationRules,
    "resolveThemeGenerativeAxes",
    ()=>resolveThemeGenerativeAxes
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file themeAdaptations.ts
 * @input Ordered environment-conditioned theme value rules from defineTheme
 * @output Validated breakpoint metadata, the compact definition, and resolved
 *   CSS-first rule layers
 * @position Theme system core; consumed by defineTheme, AppShell, and the CSS compiler
 *
 * Adaptations are deliberately closed and ordered. Width points are fixed names,
 * sparse rules and reserved token routing are rejected during normalization,
 * condition fields are ANDed, and rule order is the precedence model: every
 * matching rule writes after the root theme and later matching writes win.
 * Invariant type-scale component defaults already declared at root are omitted;
 * authored rule leaves and generated token writes retain their cascade order.
 * Token cycles are judged after each reachable ordered cascade is complete.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/theme/defineTheme.ts (`DefineThemeInput.adaptations`)
 * - /packages/core/src/theme/generateThemeRules.ts (`generateAdaptationCSS`)
 * - /packages/core/src/AppShell/AppShell.tsx (named breakpoint consumption)
 * - /packages/cli/assets/theme.template.ts
 * - /packages/cli/assets/docs/theme.doc.mjs
 * - /packages/cli/api/theme/build/build.mjs
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$resolveThemeValues$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/resolveThemeValues.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$localTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/localTokens.js [app-client] (ecmascript)");
;
;
const WIDTH_BREAKPOINT_NAMES = [
    'sm',
    'md',
    'lg',
    'xl',
    '2xl'
];
const DEFAULT_WIDTH_BREAKPOINTS = Object.freeze({
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
});
/**
 * When a screen is compact, for a component that chooses a presentation by
 * screen size (`spec:AST-012` FR9): width below the theme's effective `md`
 * point, or height below 500. The numbers are the same on every platform (CSS
 * pixels on the web, points on iOS, density-independent pixels on Android).
 */ /** The viewport height below which a screen is compact (`spec:AST-012` FR9). */ const COMPACT_HEIGHT_BELOW = 500;
function compactDefinition(points = DEFAULT_WIDTH_BREAKPOINTS) {
    const width = `(width < ${points.md}px)`;
    const height = `(height < ${COMPACT_HEIGHT_BELOW}px)`;
    return Object.freeze({
        widthBelow: points.md,
        heightBelow: COMPACT_HEIGHT_BELOW,
        query: `${width}, ${height}`,
        coarsePointerQuery: `${width} and (pointer: coarse), ${height} and (pointer: coarse)`
    });
}
const DEFAULT_COMPACT_DEFINITION = compactDefinition();
/** Inclusive lower and exclusive upper edges for one width condition. */ /** Closed environmental condition vocabulary. Fields are ANDed. */ /** Typography overrides inside an adaptation rule. */ /** Theme values an adaptation rule may write. */ /** One ordered condition-to-value adaptation rule. */ /** Adaptation authoring input accepted by defineTheme. */ // =============================================================================
// Normalized and resolved metadata
// =============================================================================
/** Validated authoring data retained for source-equivalent theme extension. */ /** Generative-axis metadata needed to complete partial adaptation values. */ /** One rule lowered to concrete CSS writes. */ // =============================================================================
// Structural validation
// =============================================================================
function isRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function assertRecord(value, path) {
    if (!isRecord(value)) {
        throw new Error(`${path} must be an object.`);
    }
}
function assertAllowedKeys(value, allowed, path) {
    for (const key of Object.keys(value)){
        if (!allowed.has(key)) {
            throw new Error(`${path}.${key} is not supported.`);
        }
    }
}
function cloneData(value) {
    if (Array.isArray(value)) {
        const cloned = [];
        for (const item of value){
            cloned.push(cloneData(item));
        }
        return cloned;
    }
    if (isRecord(value)) {
        return Object.fromEntries(Object.entries(value).map(([key, nested])=>[
                key,
                cloneData(nested)
            ]));
    }
    return value;
}
const BREAKPOINT_NAMES = new Set(WIDTH_BREAKPOINT_NAMES);
const ADAPTATION_KEYS = new Set([
    'widthBreakpoints',
    'rules'
]);
const RULE_KEYS = new Set([
    'when',
    'value'
]);
const CONDITION_AXES = [
    'width',
    'pointer',
    'contrast',
    'motion'
];
const CONDITION_KEYS = new Set(CONDITION_AXES);
const WIDTH_CONDITION_KEYS = new Set([
    'from',
    'below'
]);
const VALUE_KEYS = new Set([
    'typography',
    'color',
    'radius',
    'motion',
    'tokens',
    'localTokens',
    'components'
]);
function normalizeBreakpointOverrides(value, path) {
    assertRecord(value, path);
    assertAllowedKeys(value, BREAKPOINT_NAMES, path);
    const result = {};
    for (const name of WIDTH_BREAKPOINT_NAMES){
        const point = value[name];
        if (point === undefined) {
            continue;
        }
        if (typeof point !== 'number' || !Number.isFinite(point) || point <= 0) {
            throw new Error(`${path}.${name} must be a finite positive number of CSS pixels.`);
        }
        result[name] = point;
    }
    return result;
}
function assertCompleteBreakpoints(value, path) {
    const overrides = normalizeBreakpointOverrides(value, path);
    for (const name of WIDTH_BREAKPOINT_NAMES){
        if (overrides[name] === undefined) {
            throw new Error(`${path}.${name} is missing from the effective breakpoint map.`);
        }
    }
    return overrides;
}
function assertIncreasingBreakpoints(points, path) {
    let previous;
    for (const name of WIDTH_BREAKPOINT_NAMES){
        if (previous !== undefined && points[name] <= points[previous]) {
            throw new Error(`${path} must be strictly increasing: ${name} (${points[name]}) is not above ${previous} (${points[previous]}).`);
        }
        previous = name;
    }
}
function normalizeCondition(value, path) {
    assertRecord(value, path);
    assertAllowedKeys(value, CONDITION_KEYS, path);
    const defined = Object.fromEntries(Object.entries(value).filter(([, nested])=>nested !== undefined));
    if (Object.keys(defined).length === 0) {
        throw new Error(`${path} must contain at least one condition.`);
    }
    const condition = cloneData(defined);
    if (condition.width !== undefined) {
        assertRecord(condition.width, `${path}.width`);
        assertAllowedKeys(condition.width, WIDTH_CONDITION_KEYS, `${path}.width`);
        if (condition.width.from === undefined && condition.width.below === undefined) {
            throw new Error(`${path}.width must contain \`from\`, \`below\`, or both.`);
        }
        for (const edge of [
            'from',
            'below'
        ]){
            const name = condition.width[edge];
            if (name !== undefined && (typeof name !== 'string' || !BREAKPOINT_NAMES.has(name))) {
                throw new Error(`${path}.width.${edge} must be one of ${WIDTH_BREAKPOINT_NAMES.join(', ')}.`);
            }
        }
    }
    if (condition.pointer !== undefined && condition.pointer !== 'coarse' && condition.pointer !== 'fine') {
        throw new Error(`${path}.pointer must be 'coarse' or 'fine'.`);
    }
    if (condition.contrast !== undefined && condition.contrast !== 'more' && condition.contrast !== 'less' && condition.contrast !== 'no-preference') {
        throw new Error(`${path}.contrast must be 'more', 'less', or 'no-preference'.`);
    }
    if (condition.motion !== undefined && condition.motion !== 'reduce' && condition.motion !== 'no-preference') {
        throw new Error(`${path}.motion must be 'reduce' or 'no-preference'.`);
    }
    return condition;
}
function normalizeValue(value, path) {
    assertRecord(value, path);
    assertAllowedKeys(value, VALUE_KEYS, path);
    for (const key of VALUE_KEYS){
        const nested = value[key];
        if (nested !== undefined && !isRecord(nested)) {
            throw new Error(`${path}.${key} must be an object.`);
        }
    }
    return cloneData(value);
}
function normalizeRule(value, path) {
    assertRecord(value, path);
    assertAllowedKeys(value, RULE_KEYS, path);
    if (!Object.prototype.hasOwnProperty.call(value, 'when')) {
        throw new Error(`${path}.when is required.`);
    }
    if (!Object.prototype.hasOwnProperty.call(value, 'value')) {
        throw new Error(`${path}.value is required.`);
    }
    return {
        when: normalizeCondition(value.when, `${path}.when`),
        value: normalizeValue(value.value, `${path}.value`)
    };
}
function normalizeRules(value, path) {
    if (!Array.isArray(value)) {
        throw new Error(`${path} must be an array of {when, value} objects.`);
    }
    for(let index = 0; index < value.length; index++){
        if (!Object.prototype.hasOwnProperty.call(value, index)) {
            throw new Error(`${path}[${index}] must be present.`);
        }
    }
    return value.map((rule, index)=>normalizeRule(rule, `${path}[${index}]`));
}
function normalizeThemeAdaptations(themeName, inherited, input) {
    const rootPath = `defineTheme("${themeName}").adaptations`;
    let inheritedPoints = {
        ...DEFAULT_WIDTH_BREAKPOINTS
    };
    let inheritedRules = [];
    if (inherited !== undefined) {
        assertRecord(inherited, `defineTheme("${themeName}").extends.__adaptations`);
        assertAllowedKeys(inherited, new Set([
            'widthBreakpoints',
            'rules'
        ]), `defineTheme("${themeName}").extends.__adaptations`);
        inheritedPoints = assertCompleteBreakpoints(inherited.widthBreakpoints, `defineTheme("${themeName}").extends.__adaptations.widthBreakpoints`);
        inheritedRules = normalizeRules(inherited.rules, `defineTheme("${themeName}").extends.__adaptations.rules`);
    }
    let ownPoints = {};
    let ownRules = [];
    if (input !== undefined) {
        assertRecord(input, rootPath);
        assertAllowedKeys(input, ADAPTATION_KEYS, rootPath);
        if (input.widthBreakpoints !== undefined) {
            ownPoints = normalizeBreakpointOverrides(input.widthBreakpoints, `${rootPath}.widthBreakpoints`);
        }
        if (input.rules !== undefined) {
            ownRules = normalizeRules(input.rules, `${rootPath}.rules`);
        }
    }
    const widthBreakpoints = {
        ...inheritedPoints,
        ...ownPoints
    };
    assertIncreasingBreakpoints(widthBreakpoints, `${rootPath}.widthBreakpoints`);
    return {
        widthBreakpoints,
        rules: [
            ...inheritedRules,
            ...ownRules
        ]
    };
}
// =============================================================================
// Axis completion and rule resolution
// =============================================================================
function mergeRole(root, rule) {
    if (!root) {
        return rule;
    }
    if (!rule) {
        return root;
    }
    return {
        ...root,
        ...rule,
        weights: root.weights || rule.weights ? {
            ...root.weights,
            ...rule.weights
        } : undefined
    };
}
function assertFiniteNumber(value, path) {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
        throw new Error(`${path} must be a finite number.`);
    }
}
function completeTypography(root, rule, path) {
    const writesScale = rule.scale !== undefined || [
        rule.body,
        rule.heading,
        rule.code
    ].some((role)=>role?.weight !== undefined || role?.weights !== undefined);
    let scale = writesScale ? root?.scale : undefined;
    if (rule.scale !== undefined) {
        const base = rule.scale.base ?? root?.scale?.base;
        const ratio = rule.scale.ratio ?? root?.scale?.ratio;
        if (base === undefined || ratio === undefined) {
            throw new Error(`${path}.scale must supply both \`base\` and \`ratio\` unless the missing field exists on the effective root typography axis.`);
        }
        assertFiniteNumber(base, `${path}.scale.base`);
        assertFiniteNumber(ratio, `${path}.scale.ratio`);
        scale = {
            base,
            ratio
        };
    } else if (writesScale && scale === undefined) {
        throw new Error(`${path} sets typography weights without an effective root scale. Supply \`scale.base\` and \`scale.ratio\` in the same rule.`);
    }
    return {
        ...scale ? {
            scale
        } : {},
        body: mergeRole(root?.body, rule.body),
        heading: mergeRole(root?.heading, rule.heading),
        code: mergeRole(root?.code, rule.code)
    };
}
function completeRadius(root, rule, path) {
    const base = rule.base ?? root?.base;
    const multiplier = rule.multiplier ?? root?.multiplier;
    if (base === undefined || multiplier === undefined) {
        throw new Error(`${path} must supply both \`base\` and \`multiplier\` unless the missing field exists on the effective root radius axis.`);
    }
    assertFiniteNumber(base, `${path}.base`);
    assertFiniteNumber(multiplier, `${path}.multiplier`);
    return {
        base,
        multiplier
    };
}
function completeMotion(root, rule, path) {
    // Not a public field, but a plain-JS caller may still pass it.
    if (rule.reducedMotion !== undefined) {
        throw new Error(`${path}.reducedMotion is a theme-wide setting: set it on the theme's own ` + `motion, not in an adaptation rule.`);
    }
    const tempo = rule.tempo ?? root?.tempo;
    const character = rule.character ?? root?.character;
    const knobs = {
        ...tempo !== undefined ? {
            tempo
        } : {},
        ...character !== undefined ? {
            character
        } : {}
    };
    if (knobs.tempo !== undefined) {
        assertFiniteNumber(knobs.tempo, `${path}.tempo`);
    }
    const rootScale = root != null && 'fast' in root ? root : {};
    const writesScale = rule.fast !== undefined || rule.medium !== undefined || rule.ratio !== undefined || rule.slow !== undefined || rule.easing !== undefined;
    if (!writesScale && 'fast' in rootScale === false) {
        // Knobs only, over a root with no scale: the knobs generate the tokens.
        return knobs;
    }
    const fast = rule.fast ?? rootScale.fast;
    const medium = rule.medium ?? rootScale.medium;
    const ratio = rule.ratio ?? rootScale.ratio;
    if (fast === undefined || medium === undefined || ratio === undefined) {
        throw new Error(`${path} must supply \`fast\`, \`medium\`, and \`ratio\` unless each missing field exists on the effective root motion axis.`);
    }
    assertFiniteNumber(fast, `${path}.fast`);
    assertFiniteNumber(medium, `${path}.medium`);
    assertFiniteNumber(ratio, `${path}.ratio`);
    const slow = rule.slow ?? rootScale.slow;
    if (slow !== undefined) {
        assertFiniteNumber(slow, `${path}.slow`);
    }
    const easing = rule.easing ?? rootScale.easing;
    return {
        fast,
        medium,
        ratio,
        ...slow !== undefined ? {
            slow
        } : {},
        ...easing !== undefined ? {
            easing
        } : {},
        ...knobs
    };
}
function valueToThemeInput(themeName, ruleIndex, value, axes) {
    const path = `defineTheme("${themeName}").adaptations.rules[${ruleIndex}].value`;
    return {
        typography: value.typography ? completeTypography(axes.typography, value.typography, `${path}.typography`) : undefined,
        color: value.color ? {
            ...axes.color,
            ...value.color
        } : undefined,
        radius: value.radius ? completeRadius(axes.radius, value.radius, `${path}.radius`) : undefined,
        motion: value.motion ? completeMotion(axes.motion, value.motion, `${path}.motion`) : undefined,
        tokens: value.tokens,
        components: value.components
    };
}
function assertConcreteLeaf(value, path) {
    if (typeof value === 'string') {
        if (/\b(?:NaN|undefined)\b/.test(value)) {
            throw new Error(`${path} resolved to the invalid CSS value "${value}".`);
        }
        return;
    }
    if (isRecord(value)) {
        for (const [key, nested] of Object.entries(value)){
            assertConcreteLeaf(nested, `${path}.${key}`);
        }
        return;
    }
    throw new Error(`${path} must resolve to a concrete CSS string.`);
}
function mediaQueryForCondition(themeName, ruleIndex, condition, points) {
    const path = `defineTheme("${themeName}").adaptations.rules[${ruleIndex}].when`;
    const parts = [];
    if (condition.width) {
        const from = condition.width.from;
        const below = condition.width.below;
        if (from !== undefined && below !== undefined && points[from] >= points[below]) {
            throw new Error(`${path}.width must resolve to \`from < below\`; ${from} is ${points[from]}px and ${below} is ${points[below]}px.`);
        }
        if (from !== undefined) {
            parts.push(`(width >= ${points[from]}px)`);
        }
        if (below !== undefined) {
            parts.push(`(width < ${points[below]}px)`);
        }
    }
    if (condition.pointer !== undefined) {
        parts.push(`(pointer: ${condition.pointer})`);
    }
    if (condition.contrast !== undefined) {
        parts.push(`(prefers-contrast: ${condition.contrast})`);
    }
    if (condition.motion !== undefined) {
        parts.push(`(prefers-reduced-motion: ${condition.motion})`);
    }
    if (parts.length === 0) {
        throw new Error(`${path} must contain at least one concrete condition.`);
    }
    return parts.join(' and ');
}
const ENVIRONMENT_VALUES = {
    pointer: [
        'coarse',
        'fine',
        'none'
    ],
    contrast: [
        'more',
        'less',
        'no-preference',
        'custom'
    ],
    motion: [
        'reduce',
        'no-preference'
    ]
};
const COMPLETE_ENVIRONMENT_VALUES = ENVIRONMENT_VALUES;
/** Whether one normalized rule matches one representative environment cell. */ function conditionMatchesEnvironment(condition, points, environment) {
    const from = condition.width?.from;
    if (from !== undefined && environment.width < points[from]) {
        return false;
    }
    const below = condition.width?.below;
    if (below !== undefined && environment.width >= points[below]) {
        return false;
    }
    if (condition.pointer !== undefined && condition.pointer !== environment.pointer) {
        return false;
    }
    if (condition.contrast !== undefined && condition.contrast !== environment.contrast) {
        return false;
    }
    if (condition.motion !== undefined && condition.motion !== environment.motion) {
        return false;
    }
    return true;
}
/**
 * Reject token cycles reachable in any matching adaptation-rule cascade.
 *
 * Conditions use a finite, closed vocabulary. Sampling zero and each named
 * width boundary covers every distinct width truth region; the discrete axes
 * enumerate every browser state relevant to the supported queries. For each
 * reachable match set, portable and local writes are applied in authored order
 * before checking the effective graph, so a later matching rule may
 * intentionally repair an earlier cycle just as it does in CSS.
 */ function assertNoReachableTokenCycles(themeName, points, rootTokens, rootLocalTokens, rules) {
    const tokenRuleIndexes = rules.flatMap((rule, index)=>Object.keys(rule.tokens).length > 0 || rule.localTokens && Object.keys(rule.localTokens).length > 0 ? [
            index
        ] : []);
    if (tokenRuleIndexes.length === 0) {
        return;
    }
    const widthEnvironments = [
        0,
        ...WIDTH_BREAKPOINT_NAMES.map((name)=>points[name])
    ];
    const checkedMatchSets = new Set();
    for (const width of widthEnvironments){
        for (const pointer of COMPLETE_ENVIRONMENT_VALUES.pointer){
            for (const contrast of COMPLETE_ENVIRONMENT_VALUES.contrast){
                for (const motion of COMPLETE_ENVIRONMENT_VALUES.motion){
                    const environment = {
                        width,
                        pointer,
                        contrast,
                        motion
                    };
                    const matchingRuleIndexes = tokenRuleIndexes.filter((index)=>conditionMatchesEnvironment(rules[index].when, points, environment));
                    if (matchingRuleIndexes.length === 0) {
                        continue;
                    }
                    const signature = matchingRuleIndexes.join(',');
                    if (checkedMatchSets.has(signature)) {
                        continue;
                    }
                    checkedMatchSets.add(signature);
                    const effective = {
                        ...rootTokens,
                        ...rootLocalTokens
                    };
                    const relevantNames = new Set();
                    for (const index of matchingRuleIndexes){
                        const rule = rules[index];
                        Object.assign(effective, rule.tokens, rule.localTokens);
                        for (const name of Object.keys(rule.tokens)){
                            relevantNames.add(name);
                        }
                        for (const name of Object.keys(rule.localTokens ?? {})){
                            relevantNames.add(name);
                        }
                    }
                    const indexes = matchingRuleIndexes.join(', ');
                    const queries = matchingRuleIndexes.map((index)=>rules[index].query).join('; ');
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$localTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertNoTokenCycles"])(effective, `defineTheme("${themeName}").adaptations ${matchingRuleIndexes.length === 1 ? 'rule' : 'overlapping rules'} [${indexes}] (${queries})`, relevantNames);
                }
            }
        }
    }
}
function resolveThemeGenerativeAxes(inherited, own) {
    const inheritedTypography = inherited?.typography;
    const ownTypography = own.typography;
    const resolveFamily = (inheritedRole, ownRole, followsOwnBody = false)=>{
        const merged = mergeRole(inheritedRole, ownRole);
        if (!merged) {
            return undefined;
        }
        if (ownRole?.family) {
            return {
                ...merged,
                family: ownRole.family,
                fallbacks: ownRole.fallbacks
            };
        }
        if (followsOwnBody) {
            return {
                ...merged,
                family: undefined,
                fallbacks: undefined
            };
        }
        // A fallback without a family is inert in buildFontFamilyTokens(), so it
        // cannot replace the fallback attached to an inherited effective family.
        return {
            ...merged,
            family: inheritedRole?.family,
            fallbacks: inheritedRole?.fallbacks
        };
    };
    let body = resolveFamily(inheritedTypography?.body, ownTypography?.body);
    let heading = resolveFamily(inheritedTypography?.heading, ownTypography?.heading, Boolean(ownTypography?.body?.family && !ownTypography?.heading?.family));
    let code = resolveFamily(inheritedTypography?.code, ownTypography?.code);
    // Weights reach tokens only when a scale is expanded. The most recent
    // config that declares a scale owns every weight; omitted weights become the
    // expander defaults rather than resurrecting values from an earlier scale.
    const weightOwner = ownTypography?.scale ? ownTypography : inheritedTypography?.scale ? inheritedTypography : undefined;
    const applyWeights = (role, owner)=>role ? {
            ...role,
            weight: owner?.weight,
            weights: owner?.weights
        } : undefined;
    body = applyWeights(body, weightOwner?.body);
    heading = applyWeights(heading, weightOwner?.heading);
    code = applyWeights(code, weightOwner?.code);
    const typography = inheritedTypography || ownTypography ? {
        ...inheritedTypography,
        ...ownTypography,
        scale: ownTypography?.scale ?? inheritedTypography?.scale,
        body,
        heading,
        code
    } : undefined;
    // A color config regenerates its neutral ramp even when `accent` is omitted,
    // so an authored child config replaces rather than field-merges the base axis.
    const color = own.color ?? inherited?.color;
    const radius = own.radius ? {
        ...inherited?.radius,
        ...own.radius
    } : inherited?.radius;
    const motion = own.motion ? {
        ...inherited?.motion,
        ...own.motion
    } : inherited?.motion;
    return {
        ...typography ? {
            typography
        } : {},
        ...color ? {
            color
        } : {},
        ...radius ? {
            radius
        } : {},
        ...motion ? {
            motion
        } : {}
    };
}
/**
 * Type-scale component generation is invariant var() wiring, not scale values.
 * Keep root declarations (including authored pins) in the root cascade instead
 * of resetting them in a rule that only changes tokens. Fill missing root paths
 * for rule-only scales, and retain every authored rule leaf, even when it equals
 * the root: that write may intentionally undo an earlier matching rule.
 *
 * SYNC: expandTypeScale.ts (generateTypeScaleComponents)
 */ function omitRootTypeScaleDefaults(resolved, root, authored) {
    if (!resolved || !root) {
        return resolved;
    }
    const components = {};
    for (const [component, rules] of Object.entries(resolved)){
        for (const [key, styles] of Object.entries(rules)){
            const writes = Object.fromEntries(Object.entries(styles).filter(([property])=>root[component]?.[key]?.[property] === undefined || Object.hasOwn(authored?.[component]?.[key] ?? {}, property)));
            if (Object.keys(writes).length > 0) {
                (components[component] ??= {})[key] = writes;
            }
        }
    }
    return Object.keys(components).length > 0 ? components : undefined;
}
function resolveThemeAdaptationRules(themeName, adaptations, axes, rootTokens, rootLocalTokens, rootComponents) {
    if (adaptations.rules.length === 0) {
        return undefined;
    }
    const resolvedRules = adaptations.rules.map((rule, index)=>{
        const input = valueToThemeInput(themeName, index, rule.value, axes);
        const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$resolveThemeValues$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveThemeValues"])(input, undefined, // Authored adaptation values are a new surface with no legacy
        // acceptance to preserve, so a malformed token is rejected here rather
        // than emitted. The root path stays lenient for compatibility.
        // SYNC: packages/core/src/theme/resolveThemeValues.ts (resolveTokenValue)
        // A rule without motion of its own keeps the theme's character, so its
        // explicit --ease-standard leaves that character's curves alone; one
        // at 'standard' matches the theme's --ease-standard.
        {
            strictTokens: true,
            inheritedCharacter: axes.motion?.character,
            standardBeneath: rootTokens['--ease-standard']
        });
        for (const [name, value] of Object.entries(resolved.tokens)){
            assertConcreteLeaf(value, `defineTheme("${themeName}").adaptations.rules[${index}].value.tokens["${name}"]`);
        }
        if (resolved.components) {
            assertConcreteLeaf(resolved.components, `defineTheme("${themeName}").adaptations.rules[${index}].value.components`);
        }
        for (const name of Object.keys(rule.value.tokens ?? {})){
            if (rootLocalTokens && Object.prototype.hasOwnProperty.call(rootLocalTokens, name)) {
                throw new Error(`defineTheme("${themeName}").adaptations.rules[${index}].value.tokens["${name}"] matches an enrolled theme-local declaration; write it through value.localTokens instead.`);
            }
        }
        const localTokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$localTokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveAdaptationLocalTokens"])(themeName, index, rule.value.localTokens, rootLocalTokens);
        return {
            when: rule.when,
            query: mediaQueryForCondition(themeName, index, rule.when, adaptations.widthBreakpoints),
            tokens: resolved.tokens,
            localTokens,
            components: input.typography?.scale ? omitRootTypeScaleDefaults(resolved.components, rootComponents, rule.value.components) : resolved.components
        };
    });
    assertNoReachableTokenCycles(themeName, adaptations.widthBreakpoints, rootTokens, rootLocalTokens, resolvedRules);
    return resolvedRules;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/themeMotion.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHARACTER_EASE",
    ()=>CHARACTER_EASE,
    "MOTION_TEMPO_PROPERTY",
    ()=>MOTION_TEMPO_PROPERTY,
    "REDUCED_MOTION_PROPERTY",
    ()=>REDUCED_MOTION_PROPERTY,
    "durationTokensAt",
    ()=>durationTokensAt,
    "expandThemeMotion",
    ()=>expandThemeMotion,
    "preTempoName",
    ()=>preTempoName,
    "resolveMotionKnobs",
    ()=>resolveMotionKnobs,
    "resolveThemeMotion",
    ()=>resolveThemeMotion
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file themeMotion.ts
 * @input A theme's motion configuration: the knobs (`tempo`, `character`),
 *   the existing `MotionScaleConfig`, or both
 * @output The resolved knobs, the motion tokens they generate, and
 *   `resolveThemeMotion`, the internal resolver the animator and server code
 *   read (`spec:AST-108` FR1, FR2, FR5, FR6)
 * @position Theme utility; consumed by resolveThemeValues.ts. Pure: no DOM,
 *   no import-time work, safe on the server.
 *
 * `tempo` scales every motion duration token, clamped to 0.75–1.5.
 * `character` picks the entrance and move curves. Every theme follows each
 * person's Reduce Motion setting (`reducedMotion` resolves to `'system'`).
 * The animator's springs follow `tempo` (motion/themeTempo.ts), but not
 * `character` yet. With the defaults (tempo 1, `'standard'`, `'system'`)
 * every token is today's.
 *
 * A `MotionScaleConfig` keeps generating its duration tokens, and its fields
 * win over `tempo` (FR5); explicit `tokens` win over both in
 * resolveThemeValues.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/theme/themeMotion.test.ts
 * - /packages/core/src/theme/resolveThemeValues.ts
 * - /packages/core/src/theme/defineTheme.ts (the `motion` field's docs)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$expandMotionScale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/expandMotionScale.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$motionKnobs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/motionKnobs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokenReferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokenReferences.js [app-client] (ecmascript)");
;
;
;
;
;
const CHARACTER_EASE = {
    crisp: 'cubic-bezier(0, 0, 0.2, 1)',
    standard: null,
    expressive: 'cubic-bezier(0.3, 1.2, 0.5, 1)'
};
function resolveMotionKnobs(config) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$motionKnobs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveKnobs"])(config);
}
function isScaleConfig(config) {
    return 'fast' in config && 'medium' in config && 'ratio' in config;
}
/** A duration token's value in ms (`'175ms'` → 175). */ function msOf(value) {
    return Number.parseFloat(value);
}
const MOTION_TEMPO_PROPERTY = '--_astryx-motion-tempo';
const REDUCED_MOTION_PROPERTY = '--_astryx-reduced-motion';
/**
 * A reference such as `--duration-exit` follows the token it names, so tempo
 * writes no value for it.
 */ const TIMED_DURATION_DEFAULTS = Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["durationDefaults"]).filter(([, value])=>!value.startsWith('var('));
function durationTokensAt(tempo) {
    const tokens = {};
    for (const [name, value] of TIMED_DURATION_DEFAULTS){
        tokens[name] = `${Math.round(msOf(value) * tempo)}ms`;
    }
    return tokens;
}
function preTempoName(token) {
    return token.replace(/^--duration-/, '--_astryx-pre-tempo-duration-');
}
function expandThemeMotion(config) {
    const knobs = resolveMotionKnobs(config);
    const tokens = {};
    if (knobs.tempoIsSet) {
        Object.assign(tokens, durationTokensAt(knobs.tempo));
        for (const [name, value] of TIMED_DURATION_DEFAULTS){
            tokens[preTempoName(name)] = value;
        }
        // The press release fade, a fixed clock in the stylesheet, scales by the
        // tempo itself (FR4; `component:Button` FR15), read where it plays.
        tokens[MOTION_TEMPO_PROPERTY] = String(knobs.tempo);
    }
    if (isScaleConfig(config)) {
        const scale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$expandMotionScale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["expandMotionScale"])(config);
        Object.assign(tokens, scale);
        if (knobs.tempoIsSet) {
            for (const [name, value] of Object.entries(scale)){
                if (name.startsWith('--duration-')) {
                    tokens[preTempoName(name)] = value;
                }
            }
        }
    }
    const scaleEasing = isScaleConfig(config) && config.easing != null ? config.easing : null;
    const ease = CHARACTER_EASE[knobs.character] ?? (config.character != null ? scaleEasing ?? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easeDefaults"]['--ease-standard'] : scaleEasing);
    if (ease != null) {
        tokens['--ease-entrance'] = ease;
        tokens['--ease-move'] = ease;
    }
    return tokens;
}
function resolveThemeMotion(theme) {
    // A defined theme's motion is its axes': its own merged with its base's.
    const config = theme.__axes?.motion ?? theme.motion;
    const knobs = resolveMotionKnobs(config);
    const generated = config ? expandThemeMotion(config) : {};
    // The graph the references resolve through: the defaults, the knobs'
    // tokens, then the theme's own (a light/dark pair is not a motion value, so
    // only plain strings take part).
    const graph = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["durationDefaults"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easeDefaults"],
        ...generated
    };
    for (const tokens of [
        theme.localTokens,
        theme.tokens
    ]){
        for (const [name, value] of Object.entries(tokens ?? {})){
            if (typeof value === 'string') {
                graph[name] = value;
            }
        }
    }
    const explicit = (name)=>typeof theme.tokens?.[name] === 'string' || name in generated;
    const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokenReferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveTokenReferences"])(graph);
    const durations = {};
    for (const name of Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["durationDefaults"])){
        durations[name] = resolved[name];
    }
    const standard = resolved['--ease-standard'];
    return {
        knobs,
        durations,
        easings: {
            '--ease-standard': standard,
            '--ease-entrance': explicit('--ease-entrance') ? resolved['--ease-entrance'] : standard,
            '--ease-move': explicit('--ease-move') ? resolved['--ease-move'] : standard
        }
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/themeRegistry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRegisteredTheme",
    ()=>getRegisteredTheme,
    "getRegisteredThemes",
    ()=>getRegisteredThemes,
    "registerTheme",
    ()=>registerTheme,
    "resetThemes",
    ()=>resetThemes
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file themeRegistry.ts
 * @input DefinedTheme objects from defineTheme() or built theme packages
 * @output Exports registerTheme, getRegisteredTheme, getRegisteredThemes, resetThemes
 * @position Server-safe theme registry for theme-name-based SSR resolution
 *
 * This module has NO 'use client' directive. It is importable from SSR/RSC and
 * lets code resolve theme data by stable theme name without React context.
 * Copies of Core on one React share the registry.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedForReact$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedForReact.js [app-client] (ecmascript)");
;
// Every copy of Core on one React shares this registry. A theme can hold React
// elements (its icons), so a second React keeps its own.
const themeRegistry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedForReact$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sharedForReact"])('theme/theme-registry/themes', 1, ()=>new Map());
function registerTheme(theme) {
    themeRegistry.set(theme.name, theme);
}
function getRegisteredTheme(name) {
    if (name == null || name === '') {
        return null;
    }
    return themeRegistry.get(name) ?? null;
}
function getRegisteredThemes() {
    return new Map(themeRegistry);
}
function resetThemes() {
    themeRegistry.clear();
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/tokenReferences.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findMatchingParen",
    ()=>findMatchingParen,
    "resolveTokenReferences",
    ()=>resolveTokenReferences,
    "splitTopLevelComma",
    ()=>splitTopLevelComma,
    "splitTopLevelWhitespace",
    ()=>splitTopLevelWhitespace
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file tokenReferences.ts
 * @input A flat map of token names to raw CSS values
 * @output `resolveTokenReferences`, which follows `var(--name[, fallback])`
 *   references through the map, and the CSS parsing helpers it shares
 *   (`splitTopLevelComma`, `splitTopLevelWhitespace`, `findMatchingParen`)
 * @position Theme utility with no imports: tokens.ts resolves a theme's token
 *   graph on it (evaluating color functions as it goes), and themeMotion.ts
 *   resolves motion tokens written as references on it. Pure; safe on the
 *   server.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/theme/tokens.ts
 * - /packages/core/src/theme/themeMotion.ts
 * - /packages/core/src/theme/generateThemeRules.ts (padding shorthands)
 */ /**
 * Call `visit` for each top-level character of a CSS value. A top-level
 * character is outside parentheses and outside quoted strings. In a quoted
 * string, a backslash escapes the next character. The scan stops when `visit`
 * returns true.
 */ function scanTopLevel(input, visit) {
    let depth = 0;
    let quote = null;
    let isEscaped = false;
    for(let i = 0; i < input.length; i++){
        const char = input[i];
        if (quote !== null) {
            if (isEscaped) {
                isEscaped = false;
            } else if (char === '\\') {
                isEscaped = true;
            } else if (char === quote) {
                quote = null;
            }
            continue;
        }
        if (char === '"' || char === "'") {
            quote = char;
            continue;
        }
        if (char === '(') {
            depth++;
            continue;
        }
        if (char === ')') {
            depth = Math.max(0, depth - 1);
            continue;
        }
        if (depth === 0 && visit(i)) {
            return;
        }
    }
}
function splitTopLevelComma(input) {
    let split = null;
    scanTopLevel(input, (i)=>{
        if (input[i] !== ',') {
            return false;
        }
        split = [
            input.slice(0, i).trim(),
            input.slice(i + 1).trim()
        ];
        return true;
    });
    return split;
}
function splitTopLevelWhitespace(input) {
    const parts = [];
    let start = 0;
    scanTopLevel(input, (i)=>{
        if (/\s/.test(input[i])) {
            if (i > start) {
                parts.push(input.slice(start, i));
            }
            start = i + 1;
        }
        return false;
    });
    if (input.length > start) {
        parts.push(input.slice(start));
    }
    return parts;
}
function findMatchingParen(input, openIndex) {
    let depth = 0;
    for(let i = openIndex; i < input.length; i++){
        const char = input[i];
        if (char === '(') {
            depth++;
        } else if (char === ')') {
            depth--;
            if (depth === 0) {
                return i;
            }
        }
    }
    return -1;
}
function resolveTokenReferences(raw, evaluate = (expr)=>expr) {
    const cache = {};
    // `seen` tracks the reference chain, so a cycle resolves to the literal
    // reference instead of recursing forever.
    const substitute = (expr, seen)=>{
        const start = expr.indexOf('var(');
        if (start === -1) {
            return expr;
        }
        const openIndex = start + 'var'.length;
        const closeIndex = findMatchingParen(expr, openIndex);
        if (closeIndex === -1) {
            return expr;
        }
        const inner = expr.slice(openIndex + 1, closeIndex);
        const commaSplit = splitTopLevelComma(inner);
        const name = (commaSplit ? commaSplit[0] : inner).trim();
        const fallback = commaSplit ? commaSplit[1] : null;
        let replacement;
        if (seen.has(name)) {
            replacement = expr.slice(start, closeIndex + 1);
        } else if (name in raw) {
            seen.add(name);
            replacement = reference(name, seen);
            seen.delete(name);
        } else if (fallback !== null) {
            replacement = substitute(fallback.trim(), seen);
        } else {
            replacement = expr.slice(start, closeIndex + 1);
        }
        const rest = substitute(expr.slice(closeIndex + 1), seen);
        return expr.slice(0, start) + replacement + rest;
    };
    const reference = (name, seen)=>{
        if (name in cache) {
            return cache[name];
        }
        const value = raw[name];
        if (value === undefined) {
            return '';
        }
        const resolved = evaluate(value.includes('var(') ? substitute(value, seen) : value);
        cache[name] = resolved;
        return resolved;
    };
    for (const name of Object.keys(raw)){
        reference(name, new Set());
    }
    return cache;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveThemeToken",
    ()=>resolveThemeToken,
    "resolveThemeTokens",
    ()=>resolveThemeTokens,
    "tokenVar",
    ()=>tokenVar,
    "tokenVars",
    ()=>tokenVars
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file tokens.ts
 * @input DefinedTheme objects and token names
 * @output Server-safe token helpers for resolving theme values and building CSS var references
 * @position Public theme utility; backs useTheme and external styling-library adapters
 *
 * Use these helpers when code outside React hooks needs Astryx token values:
 * build-time theme adapters, chart configuration, canvas/SVG rendering, tests,
 * or plain JS theme objects for other styling libraries.
 *
 * Derived tokens can reference other tokens (`var(--color-accent)`) and use CSS
 * color functions (`color-mix`). The resolver follows those references through
 * the theme iteratively and evaluates the supported color functions so callers
 * receive concrete raw values, not CSS expressions.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/theme/useTheme.ts
 * - /packages/core/src/theme/tokenReferences.ts (the `var()` resolver)
 * - /packages/core/src/theme/index.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$defineTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/defineTheme.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/color.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$generateThemeRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/generateThemeRules.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokenReferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokenReferences.js [app-client] (ecmascript)");
;
;
;
;
function tokenVar(name) {
    return `var(${name})`;
}
const tokenVars = Object.fromEntries(Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$defineTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["tokenDefaults"]).map((name)=>[
        name,
        tokenVar(name)
    ]));
/** Parse a CSS light-dark(light, dark) function into its two argument values. */ function parseLightDark(value) {
    const trimmed = value.trim();
    const prefix = 'light-dark(';
    if (!trimmed.startsWith(prefix) || !trimmed.endsWith(')')) {
        return null;
    }
    const inner = trimmed.slice(prefix.length, -1);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokenReferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitTopLevelComma"])(inner);
}
/**
 * Resolve a token value for a specific mode.
 *
 * - `[light, dark]` tuple → picks the side for `mode`
 * - `light-dark(light, dark)` string → parses nested CSS values and picks the side
 * - any other string → returned unchanged
 */ function resolveXDSTokenValue(value, mode) {
    if (Array.isArray(value)) {
        return mode === 'dark' ? value[1] : value[0];
    }
    const parsed = parseLightDark(value);
    if (parsed !== null) {
        return mode === 'dark' ? parsed[1] : parsed[0];
    }
    return value;
}
// =============================================================================
// Reference resolution — turn token expressions into concrete raw values
// =============================================================================
//
// Generated themes emit derived tokens as references to other tokens rather
// than baked-in values, so a scoped CSS override of a base token re-themes the
// subtree that references it. The CSS cascade resolves those references, but
// non-CSS consumers (canvas, SVG, data-viz) need the concrete value. The same
// resolution replays in JS: tokenReferences.ts follows `var()` references
// through the resolved token map (guarding against cycles), and these helpers
// evaluate the CSS color functions used by the theme generator against those
// values.
/** Split a color-mix component into its color and optional percentage. */ function parseMixComponent(part) {
    const trimmed = part.trim();
    const match = trimmed.match(/\s+([\d.]+)%$/);
    if (match) {
        return {
            color: trimmed.slice(0, match.index).trim(),
            percentage: parseFloat(match[1])
        };
    }
    return {
        color: trimmed,
        percentage: null
    };
}
/**
 * Evaluate `color-mix(in <space>, c1 [p1], c2 [p2])` to a concrete color.
 *
 * Supports the `srgb` color space (the one the theme generator emits) using
 * the CSS Color 5 algorithm: normalize the percentages, interpolate the
 * premultiplied channels, then apply the alpha multiplier when the mix weights
 * sum to less than 100%. Returns null for anything it can't evaluate so the
 * original expression is preserved rather than guessed.
 */ function evaluateColorMix(body) {
    const spaceMatch = body.match(/^in\s+([\w-]+)\s*,\s*(.+)$/s);
    if (!spaceMatch) {
        return null;
    }
    const [, colorSpace, rest] = spaceMatch;
    if (colorSpace.toLowerCase() !== 'srgb') {
        return null;
    }
    const split = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokenReferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitTopLevelComma"])(rest);
    if (split === null) {
        return null;
    }
    const first = parseMixComponent(split[0]);
    const second = parseMixComponent(split[1]);
    if (first === null || second === null) {
        return null;
    }
    const c1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseColor"])(first.color);
    const c2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseColor"])(second.color);
    if (c1 === null || c2 === null) {
        return null;
    }
    // Fill in omitted percentages, then normalize so they sum to 100%.
    let p1;
    let p2;
    if (first.percentage !== null && second.percentage !== null) {
        p1 = first.percentage;
        p2 = second.percentage;
    } else if (first.percentage !== null) {
        p1 = first.percentage;
        p2 = 100 - p1;
    } else if (second.percentage !== null) {
        p2 = second.percentage;
        p1 = 100 - p2;
    } else {
        p1 = 50;
        p2 = 50;
    }
    const sum = p1 + p2;
    if (sum <= 0) {
        return null;
    }
    const w1 = p1 / sum;
    const w2 = p2 / sum;
    const alphaMultiplier = sum < 100 ? sum / 100 : 1;
    // Interpolate in premultiplied sRGB, then un-premultiply.
    const mixedA = w1 * c1.a + w2 * c2.a;
    const premix = (k1, k2)=>w1 * k1 * c1.a + w2 * k2 * c2.a;
    const rp = premix(c1.r, c2.r);
    const gp = premix(c1.g, c2.g);
    const bp = premix(c1.b, c2.b);
    const rgb = mixedA === 0 ? {
        r: 0,
        g: 0,
        b: 0
    } : {
        r: rp / mixedA,
        g: gp / mixedA,
        b: bp / mixedA
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$color$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatColor"])({
        ...rgb,
        a: mixedA * alphaMultiplier
    });
}
/** Evaluate every supported color function in an expression, innermost first. */ function evaluateColorFunctions(expr) {
    const idx = expr.indexOf('color-mix(');
    if (idx === -1) {
        return expr;
    }
    const openIndex = idx + 'color-mix'.length;
    const closeIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokenReferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findMatchingParen"])(expr, openIndex);
    if (closeIndex === -1) {
        return expr;
    }
    const body = evaluateColorFunctions(expr.slice(openIndex + 1, closeIndex));
    const evaluated = evaluateColorMix(body);
    const replacement = evaluated ?? `color-mix(${body})`;
    return expr.slice(0, idx) + replacement + evaluateColorFunctions(expr.slice(closeIndex + 1));
}
function resolveThemeTokens(theme, options) {
    const { mode } = options;
    const resolved = {};
    for (const [key, value] of Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$defineTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["tokenDefaults"])){
        resolved[key] = resolveXDSTokenValue(value, mode);
    }
    if (theme == null) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokenReferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveTokenReferences"])(resolved, evaluateColorFunctions);
    }
    // A theme's local tokens resolve its references to them, then leave the
    // result: they are theme-local names, not Astryx tokens.
    const localKeys = new Set(Object.keys(theme.localTokens ?? {}));
    for (const [key, value] of Object.entries(theme.localTokens ?? {})){
        resolved[key] = resolveXDSTokenValue(value, mode);
    }
    // Status roles the theme leaves unset resolve as its generated root CSS
    // declares them (architecture:theme-compilation INV16 and INV17), so
    // JavaScript and CSS agree (architecture:theme-tokens INV6).
    for (const [key, value] of (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$generateThemeRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generatedScopedStatusRoleDefaults"])(theme.tokens, theme.localTokens ?? {})){
        resolved[key] = resolveXDSTokenValue(value, mode);
    }
    for (const [key, value] of Object.entries(theme.tokens)){
        resolved[key] = resolveXDSTokenValue(value, mode);
    }
    if (theme.__inputTokens) {
        for (const [key, value] of Object.entries(theme.__inputTokens)){
            if (value !== undefined) {
                resolved[key] = resolveXDSTokenValue(value, mode);
            }
        }
    }
    return Object.fromEntries(Object.entries((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokenReferences$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveTokenReferences"])(resolved, evaluateColorFunctions)).filter(([key])=>!localKeys.has(key)));
}
function resolveThemeToken(theme, name, options) {
    const tokens = resolveThemeTokens(theme, options);
    return tokens[name] ?? options.fallback ?? '';
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * Astryx Design Tokens
 *
 * Defines all design tokens using StyleX defineVars.
 * - *Defaults: Plain objects with default values (used by defineVars and themes)
 * - *Vars: CSS custom properties that themes can override via createTheme
 *
 * SYNC: When modified, run `node scripts/generate-token-docs.mjs` to update docs.
 * CI checks for drift via --check flag. Adding or removing a token FAMILY (a
 * whole `*Defaults` group) also means updating:
 * - /packages/cli/assets/theme.template.ts (its inventory of what exists)
 *
 * Domain tokens (syntax highlighting, data visualization) live separately in
 * /packages/core/src/theme/domainTokens/ — they're tree-shaken from core components.
 */ __turbopack_context__.s([
    "borderDefaults",
    ()=>borderDefaults,
    "borderVars",
    ()=>borderVars,
    "colorDefaults",
    ()=>colorDefaults,
    "colorVars",
    ()=>colorVars,
    "durationDefaults",
    ()=>durationDefaults,
    "durationVars",
    ()=>durationVars,
    "easeDefaults",
    ()=>easeDefaults,
    "easeVars",
    ()=>easeVars,
    "focusDefaults",
    ()=>focusDefaults,
    "focusVars",
    ()=>focusVars,
    "fontWeightDefaults",
    ()=>fontWeightDefaults,
    "fontWeightVars",
    ()=>fontWeightVars,
    "radiusDefaults",
    ()=>radiusDefaults,
    "radiusVars",
    ()=>radiusVars,
    "shadowDefaults",
    ()=>shadowDefaults,
    "shadowVars",
    ()=>shadowVars,
    "sizeDefaults",
    ()=>sizeDefaults,
    "sizeVars",
    ()=>sizeVars,
    "spacingDefaults",
    ()=>spacingDefaults,
    "spacingVars",
    ()=>spacingVars,
    "textSizeDefaults",
    ()=>textSizeDefaults,
    "textSizeVars",
    ()=>textSizeVars,
    "typeScaleDefaults",
    ()=>typeScaleDefaults,
    "typeScaleVars",
    ()=>typeScaleVars,
    "typographyDefaults",
    ()=>typographyDefaults,
    "typographyVars",
    ()=>typographyVars
]);
;
const colorDefaults = {
    // Core semantic
    '--color-accent': 'light-dark(#0064E0, #0171E3)',
    '--color-accent-muted': 'light-dark(#0082FB33, #0082FB3F)',
    '--color-on-accent': 'light-dark(#FFFFFF, #FFFFFF)',
    '--color-neutral': 'light-dark(rgba(5, 54, 89, 0.1), rgba(223, 226, 229, 0.2))',
    '--color-background-surface': 'light-dark(#FFFFFF, #1F1F22)',
    '--color-background-body': 'light-dark(#F1F4F7, #111112)',
    '--color-overlay': 'light-dark(#01122866, #11111299)',
    '--color-overlay-hover': 'light-dark(#0536590C, #FFFFFF0C)',
    '--color-overlay-pressed': 'light-dark(#05365919, #FFFFFF19)',
    '--color-background-muted': 'light-dark(#0536590C, #1111127F)',
    // Text
    '--color-text-primary': 'light-dark(#0A1317, #DFE2E5)',
    '--color-text-secondary': 'light-dark(#4E606F, #AAAFB5)',
    '--color-text-disabled': 'light-dark(#A4B0BC, #6F747C)',
    '--color-text-accent': 'light-dark(#0064E0, #3E9EFB)',
    '--color-on-dark': 'light-dark(#FFFFFF, #FFFFFF)',
    '--color-on-light': 'light-dark(#000000, #000000)',
    // Icon
    '--color-icon-accent': 'light-dark(#0064E0, #2694FE)',
    '--color-icon-primary': 'light-dark(#0A1317, #DFE2E5)',
    '--color-icon-secondary': 'light-dark(#4E606F, #AAAFB5)',
    '--color-icon-disabled': 'light-dark(#A4B0BC, #6F747C)',
    // Surface variants
    '--color-background-card': 'light-dark(#FFFFFF, #1F1F22)',
    '--color-background-popover': 'light-dark(#FFFFFF, #28292C)',
    '--color-background-inverted': 'light-dark(#0A1317, #FFFFFF)',
    '--color-background-error-inverted': 'light-dark(#AA071E, #E3193B)',
    // Status fills (architecture:theme-tokens INV11). Each `--color-<status>` is
    // the strong status fill, and `--color-on-<status>` is content on it at
    // 4.5:1 or more. `-muted` is the pale fill, with `--color-on-<status>-muted`.
    // Info is independent of the accent.
    '--color-info': 'light-dark(#0064E0, #0064E0)',
    '--color-info-muted': 'light-dark(#0082FB33, #0082FB3F)',
    '--color-on-info': 'light-dark(#FFFFFF, #FFFFFF)',
    '--color-success': 'light-dark(#0D8626, #0D8626)',
    '--color-success-muted': 'light-dark(#0B991F33, #0B991F3F)',
    '--color-on-success': 'light-dark(#FFFFFF, #FFFFFF)',
    '--color-error': 'light-dark(#E3193B, #F5394F)',
    '--color-error-muted': 'light-dark(#E3193B33, #F5394F3F)',
    // Dark error is light enough that white misses 4.5:1, so its content is dark.
    '--color-on-error': 'light-dark(#FFFFFF, #0A1317)',
    '--color-warning': 'light-dark(#E9AF08, #F2C00B)',
    '--color-warning-muted': 'light-dark(#E2A40033, #E2A4003F)',
    '--color-on-warning': 'light-dark(#0A1317, #0A1317)',
    // Status text on the default page and card surfaces, 4.5:1 or more.
    '--color-text-info': 'var(--color-text-blue)',
    '--color-text-success': 'var(--color-text-green)',
    '--color-text-warning': 'var(--color-text-yellow)',
    '--color-text-error': 'var(--color-text-red)',
    // Status icons and borders on those surfaces follow the text role.
    '--color-icon-info': 'var(--color-text-info)',
    '--color-icon-success': 'var(--color-text-success)',
    '--color-icon-warning': 'var(--color-text-warning)',
    '--color-icon-error': 'var(--color-text-error)',
    '--color-border-info': 'var(--color-text-info)',
    '--color-border-success': 'var(--color-text-success)',
    '--color-border-warning': 'var(--color-text-warning)',
    '--color-border-error': 'var(--color-text-error)',
    // Content on pale status fills.
    '--color-on-info-muted': 'var(--color-text-blue)',
    '--color-on-success-muted': 'var(--color-text-green)',
    '--color-on-warning-muted': 'var(--color-text-yellow)',
    '--color-on-error-muted': 'var(--color-text-red)',
    // Border
    '--color-border': 'light-dark(#05365919, #F2F4F619)',
    '--color-border-emphasized': 'light-dark(#CCD3DB, #494D53)',
    // Effects
    '--color-skeleton': 'light-dark(#CCD3DB, #5A5E66)',
    // "Channel on body" — slim affordances that need to read against body
    // luminance (ProgressBar tracks, Slider rails, Switch off-state). Default
    // is the same low-contrast surface as --color-skeleton; themes can
    // override per their neutral ramp if 1-D channels need more weight.
    '--color-track': 'light-dark(#CCD3DB, #5A5E66)',
    '--color-shadow': 'light-dark(rgba(5, 54, 89, 0.1), rgba(0, 0, 0, 0.3))',
    // Hover tint: black in light mode, white in dark mode - used with color-mix for hover states
    '--color-tint-hover': 'light-dark(black, white)',
    // Blue
    '--color-background-blue': 'light-dark(#0171E333, #0171E333)',
    '--color-border-blue': 'light-dark(#0064E0, #2694FE)',
    // Blue 650 / 500
    '--color-icon-blue': 'light-dark(#0064E0, #2694FE)',
    '--color-text-blue': 'light-dark(#042F97, #AFD7FF)',
    // Cyan
    '--color-background-cyan': 'light-dark(#03A7D733, #03A7D733)',
    '--color-border-cyan': 'light-dark(#089DD0, #0171A4)',
    // Cyan 500 / 650
    '--color-icon-cyan': 'light-dark(#00ACC1, #26C6DA)',
    '--color-text-cyan': 'light-dark(#014975, #A1EEF9)',
    // Gray
    '--color-background-gray': 'light-dark(#0A131733, #666A724C)',
    '--color-border-gray': 'light-dark(#647685, #748695)',
    // Gray 600 / 550
    '--color-icon-gray': 'light-dark(#4E606F, #AAAFB5)',
    '--color-text-gray': 'light-dark(#0A1317, #E7EAED)',
    // Green
    '--color-background-green': 'light-dark(#24BB5E33, #24BB5E33)',
    '--color-border-green': 'light-dark(#0D8626, #0B991F)',
    // Green 600 / 550
    '--color-icon-green': 'light-dark(#0D8626, #26A756)',
    '--color-text-green': 'light-dark(#09441F, #A5F690)',
    // Orange
    '--color-background-orange': 'light-dark(#F2790233, #F2790233)',
    '--color-border-orange': 'light-dark(#EB6E00, #B34A01)',
    // Orange 500 / 650
    '--color-icon-orange': 'light-dark(#E9690B, #FB8C00)',
    '--color-text-orange': 'light-dark(#6B2203, #FDB876)',
    // Pink
    '--color-background-pink': 'light-dark(#E638B333, #E638B333)',
    '--color-border-pink': 'light-dark(#F351C0, #C02294)',
    // Pink 500 / 650
    '--color-icon-pink': 'light-dark(#C2185B, #EC407A)',
    '--color-text-pink': 'light-dark(#650053, #FEADE3)',
    // Purple
    '--color-background-purple': 'light-dark(#7952FF33, #7952FF33)',
    '--color-border-purple': 'light-dark(#9081FF, #7340FE)',
    // Purple 500 / 650
    '--color-icon-purple': 'light-dark(#5B08D8, #7952FF)',
    '--color-text-purple': 'light-dark(#3E0697, #B3B0FE)',
    // Red
    '--color-background-red': 'light-dark(#E3193B33, #E3193B33)',
    '--color-border-red': 'light-dark(#E3193B, #F5394F)',
    '--color-icon-red': 'light-dark(#D31130, #E3193B)',
    '--color-text-red': 'light-dark(#7B0210, #FFB2B8)',
    // Teal
    '--color-background-teal': 'light-dark(#0DB7AF33, #0DB7AF33)',
    '--color-border-teal': 'light-dark(#08A3A3, #08767D)',
    // Teal 500 / 650
    '--color-icon-teal': 'light-dark(#009688, #26A69A)',
    '--color-text-teal': 'light-dark(#083943, #40DCCD)',
    // Yellow
    '--color-background-yellow': 'light-dark(#E2A40033, #E2A40033)',
    '--color-border-yellow': 'light-dark(#C58600, #B47700)',
    // Yellow 500 / 550
    '--color-icon-yellow': 'light-dark(#FBC02D, #FFEE58)',
    '--color-text-yellow': 'light-dark(#753F07, #FBCE03)'
};
const colorVars = {
    "--color-accent": "var(--color-accent)",
    "--color-accent-muted": "var(--color-accent-muted)",
    "--color-on-accent": "var(--color-on-accent)",
    "--color-neutral": "var(--color-neutral)",
    "--color-background-surface": "var(--color-background-surface)",
    "--color-background-body": "var(--color-background-body)",
    "--color-overlay": "var(--color-overlay)",
    "--color-overlay-hover": "var(--color-overlay-hover)",
    "--color-overlay-pressed": "var(--color-overlay-pressed)",
    "--color-background-muted": "var(--color-background-muted)",
    "--color-text-primary": "var(--color-text-primary)",
    "--color-text-secondary": "var(--color-text-secondary)",
    "--color-text-disabled": "var(--color-text-disabled)",
    "--color-text-accent": "var(--color-text-accent)",
    "--color-on-dark": "var(--color-on-dark)",
    "--color-on-light": "var(--color-on-light)",
    "--color-icon-accent": "var(--color-icon-accent)",
    "--color-icon-primary": "var(--color-icon-primary)",
    "--color-icon-secondary": "var(--color-icon-secondary)",
    "--color-icon-disabled": "var(--color-icon-disabled)",
    "--color-background-card": "var(--color-background-card)",
    "--color-background-popover": "var(--color-background-popover)",
    "--color-background-inverted": "var(--color-background-inverted)",
    "--color-background-error-inverted": "var(--color-background-error-inverted)",
    "--color-info": "var(--color-info)",
    "--color-info-muted": "var(--color-info-muted)",
    "--color-on-info": "var(--color-on-info)",
    "--color-success": "var(--color-success)",
    "--color-success-muted": "var(--color-success-muted)",
    "--color-on-success": "var(--color-on-success)",
    "--color-error": "var(--color-error)",
    "--color-error-muted": "var(--color-error-muted)",
    "--color-on-error": "var(--color-on-error)",
    "--color-warning": "var(--color-warning)",
    "--color-warning-muted": "var(--color-warning-muted)",
    "--color-on-warning": "var(--color-on-warning)",
    "--color-text-info": "var(--color-text-info)",
    "--color-text-success": "var(--color-text-success)",
    "--color-text-warning": "var(--color-text-warning)",
    "--color-text-error": "var(--color-text-error)",
    "--color-icon-info": "var(--color-icon-info)",
    "--color-icon-success": "var(--color-icon-success)",
    "--color-icon-warning": "var(--color-icon-warning)",
    "--color-icon-error": "var(--color-icon-error)",
    "--color-border-info": "var(--color-border-info)",
    "--color-border-success": "var(--color-border-success)",
    "--color-border-warning": "var(--color-border-warning)",
    "--color-border-error": "var(--color-border-error)",
    "--color-on-info-muted": "var(--color-on-info-muted)",
    "--color-on-success-muted": "var(--color-on-success-muted)",
    "--color-on-warning-muted": "var(--color-on-warning-muted)",
    "--color-on-error-muted": "var(--color-on-error-muted)",
    "--color-border": "var(--color-border)",
    "--color-border-emphasized": "var(--color-border-emphasized)",
    "--color-skeleton": "var(--color-skeleton)",
    "--color-track": "var(--color-track)",
    "--color-shadow": "var(--color-shadow)",
    "--color-tint-hover": "var(--color-tint-hover)",
    "--color-background-blue": "var(--color-background-blue)",
    "--color-border-blue": "var(--color-border-blue)",
    "--color-icon-blue": "var(--color-icon-blue)",
    "--color-text-blue": "var(--color-text-blue)",
    "--color-background-cyan": "var(--color-background-cyan)",
    "--color-border-cyan": "var(--color-border-cyan)",
    "--color-icon-cyan": "var(--color-icon-cyan)",
    "--color-text-cyan": "var(--color-text-cyan)",
    "--color-background-gray": "var(--color-background-gray)",
    "--color-border-gray": "var(--color-border-gray)",
    "--color-icon-gray": "var(--color-icon-gray)",
    "--color-text-gray": "var(--color-text-gray)",
    "--color-background-green": "var(--color-background-green)",
    "--color-border-green": "var(--color-border-green)",
    "--color-icon-green": "var(--color-icon-green)",
    "--color-text-green": "var(--color-text-green)",
    "--color-background-orange": "var(--color-background-orange)",
    "--color-border-orange": "var(--color-border-orange)",
    "--color-icon-orange": "var(--color-icon-orange)",
    "--color-text-orange": "var(--color-text-orange)",
    "--color-background-pink": "var(--color-background-pink)",
    "--color-border-pink": "var(--color-border-pink)",
    "--color-icon-pink": "var(--color-icon-pink)",
    "--color-text-pink": "var(--color-text-pink)",
    "--color-background-purple": "var(--color-background-purple)",
    "--color-border-purple": "var(--color-border-purple)",
    "--color-icon-purple": "var(--color-icon-purple)",
    "--color-text-purple": "var(--color-text-purple)",
    "--color-background-red": "var(--color-background-red)",
    "--color-border-red": "var(--color-border-red)",
    "--color-icon-red": "var(--color-icon-red)",
    "--color-text-red": "var(--color-text-red)",
    "--color-background-teal": "var(--color-background-teal)",
    "--color-border-teal": "var(--color-border-teal)",
    "--color-icon-teal": "var(--color-icon-teal)",
    "--color-text-teal": "var(--color-text-teal)",
    "--color-background-yellow": "var(--color-background-yellow)",
    "--color-border-yellow": "var(--color-border-yellow)",
    "--color-icon-yellow": "var(--color-icon-yellow)",
    "--color-text-yellow": "var(--color-text-yellow)",
    __varGroupHash__: "xj0fimd"
};
const spacingDefaults = {
    '--spacing-0': '0rem',
    '--spacing-0-5': '0.125rem',
    '--spacing-1': '0.25rem',
    '--spacing-1-5': '0.375rem',
    '--spacing-2': '0.5rem',
    '--spacing-3': '0.75rem',
    '--spacing-4': '1rem',
    '--spacing-5': '1.25rem',
    '--spacing-6': '1.5rem',
    '--spacing-7': '1.75rem',
    '--spacing-8': '2rem',
    '--spacing-9': '2.25rem',
    '--spacing-10': '2.5rem',
    '--spacing-11': '2.75rem',
    '--spacing-12': '3rem'
};
const spacingVars = {
    "--spacing-0": "var(--spacing-0)",
    "--spacing-0-5": "var(--spacing-0-5)",
    "--spacing-1": "var(--spacing-1)",
    "--spacing-1-5": "var(--spacing-1-5)",
    "--spacing-2": "var(--spacing-2)",
    "--spacing-3": "var(--spacing-3)",
    "--spacing-4": "var(--spacing-4)",
    "--spacing-5": "var(--spacing-5)",
    "--spacing-6": "var(--spacing-6)",
    "--spacing-7": "var(--spacing-7)",
    "--spacing-8": "var(--spacing-8)",
    "--spacing-9": "var(--spacing-9)",
    "--spacing-10": "var(--spacing-10)",
    "--spacing-11": "var(--spacing-11)",
    "--spacing-12": "var(--spacing-12)",
    __varGroupHash__: "x1kvdh9l"
};
const sizeDefaults = {
    '--size-element-sm': '28px',
    '--size-element-md': '32px',
    '--size-element-lg': '36px'
};
const sizeVars = {
    "--size-element-sm": "var(--size-element-sm)",
    "--size-element-md": "var(--size-element-md)",
    "--size-element-lg": "var(--size-element-lg)",
    __varGroupHash__: "xkgjyic"
};
const borderDefaults = {
    '--border-width': '1px'
};
const borderVars = {
    "--border-width": "var(--border-width)",
    __varGroupHash__: "xafi2nm"
};
const focusDefaults = {
    '--focus-outline-width': '2px',
    '--focus-outline-style': 'solid',
    '--focus-outline-color': 'var(--color-accent)',
    '--focus-outline-offset': '3px'
};
const focusVars = {
    "--focus-outline-width": "var(--focus-outline-width)",
    "--focus-outline-style": "var(--focus-outline-style)",
    "--focus-outline-color": "var(--focus-outline-color)",
    "--focus-outline-offset": "var(--focus-outline-offset)",
    __varGroupHash__: "xzxs3qz"
};
const radiusDefaults = {
    '--radius-none': '0px',
    '--radius-inner': '4px',
    '--radius-element': '8px',
    '--radius-container': '12px',
    '--radius-page': '28px',
    // Chat surfaces (bubbles, composer, drawer) are intentionally rounder than
    // cards in the same view. Tracks --radius-page's value by default but is a
    // distinct token so chat rounding can be themed independently. See #2072.
    '--radius-chat': '28px',
    '--radius-full': '9999px'
};
const radiusVars = {
    "--radius-none": "var(--radius-none)",
    "--radius-inner": "var(--radius-inner)",
    "--radius-element": "var(--radius-element)",
    "--radius-container": "var(--radius-container)",
    "--radius-page": "var(--radius-page)",
    "--radius-chat": "var(--radius-chat)",
    "--radius-full": "var(--radius-full)",
    __varGroupHash__: "xrw1vgx"
};
const shadowDefaults = {
    // Outer elevation shadows (ascending intensity: low < med < high)
    '--shadow-low': '0px 1px 1px light-dark(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), 0px 2px 8px light-dark(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2))',
    '--shadow-med': '0px 1px 2px light-dark(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), 0px 2px 12px light-dark(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2))',
    '--shadow-high': '0px 2px 2px light-dark(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), 0px 8px 24px light-dark(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3))',
    // Inset shadows for input border rings (interaction + validation states)
    '--shadow-inset-hover': 'inset 0px 0px 0px 2px light-dark(rgba(5, 54, 89, 0.15), rgba(223, 226, 229, 0.2))',
    '--shadow-inset-selected': 'inset 0px 0px 0px 2px rgba(1, 113, 227, 0.5)',
    '--shadow-inset-success': 'inset 0px 0px 0px 2px rgba(38, 167, 86, 0.3)',
    '--shadow-inset-warning': 'inset 0px 0px 0px 2px rgba(226, 164, 0, 0.3)',
    '--shadow-inset-error': 'inset 0px 0px 0px 2px rgba(227, 25, 59, 0.3)'
};
const shadowVars = {
    "--shadow-low": "var(--shadow-low)",
    "--shadow-med": "var(--shadow-med)",
    "--shadow-high": "var(--shadow-high)",
    "--shadow-inset-hover": "var(--shadow-inset-hover)",
    "--shadow-inset-selected": "var(--shadow-inset-selected)",
    "--shadow-inset-success": "var(--shadow-inset-success)",
    "--shadow-inset-warning": "var(--shadow-inset-warning)",
    "--shadow-inset-error": "var(--shadow-inset-error)",
    __varGroupHash__: "xua8qm3"
};
const durationDefaults = {
    '--duration-fast-min': '130ms',
    '--duration-fast': '175ms',
    '--duration-fast-max': '230ms',
    '--duration-medium-min': '310ms',
    '--duration-medium': '410ms',
    '--duration-medium-max': '550ms',
    '--duration-slow-min': '730ms',
    '--duration-slow': '975ms',
    '--duration-slow-max': '1300ms',
    /** The standard dismissal duration. */ '--duration-exit': 'var(--duration-fast)'
};
const durationVars = {
    "--duration-fast-min": "var(--duration-fast-min)",
    "--duration-fast": "var(--duration-fast)",
    "--duration-fast-max": "var(--duration-fast-max)",
    "--duration-medium-min": "var(--duration-medium-min)",
    "--duration-medium": "var(--duration-medium)",
    "--duration-medium-max": "var(--duration-medium-max)",
    "--duration-slow-min": "var(--duration-slow-min)",
    "--duration-slow": "var(--duration-slow)",
    "--duration-slow-max": "var(--duration-slow-max)",
    "--duration-exit": "var(--duration-exit)",
    __varGroupHash__: "x14lkjui"
};
const easeDefaults = {
    '--ease-standard': 'cubic-bezier(0.24, 1, 0.4, 1)',
    /**
   * Entrances: a layer or element arriving. A theme's `character` sets it
   * (spec:AST-108 FR2); at `'standard'` it equals --ease-standard.
   */ '--ease-entrance': 'cubic-bezier(0.24, 1, 0.4, 1)',
    /**
   * Moves: an element changing place or size on screen. A theme's
   * `character` sets it; at `'standard'` it equals --ease-standard.
   */ '--ease-move': 'cubic-bezier(0.24, 1, 0.4, 1)',
    '--ease-exit': 'cubic-bezier(0.3, 0, 0.6, 0.6)'
};
const easeVars = {
    "--ease-standard": "var(--ease-standard)",
    "--ease-entrance": "var(--ease-entrance)",
    "--ease-move": "var(--ease-move)",
    "--ease-exit": "var(--ease-exit)",
    __varGroupHash__: "xf09i69"
};
const typographyDefaults = {
    '--font-family-body': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    '--font-family-code': '"SF Mono", Monaco, Consolas, monospace',
    '--font-family-heading': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
};
const typographyVars = {
    "--font-family-body": "var(--font-family-body)",
    "--font-family-code": "var(--font-family-code)",
    "--font-family-heading": "var(--font-family-heading)",
    __varGroupHash__: "x5tdzeq"
};
const textSizeDefaults = {
    // Full geometric scale: round(14 × 1.2^step) / 16, default base=14, ratio=1.2
    '--font-size-4xs': '0.375rem',
    // step -5: 6px (14 × 1.2⁻⁵ ≈ 5.63 → 6)
    '--font-size-3xs': '0.4375rem',
    // step -4: 7px (14 × 1.2⁻⁴ ≈ 6.75 → 7)
    '--font-size-2xs': '0.5rem',
    // step -3: 8px (14 × 1.2⁻³ ≈ 8.10 → 8)
    '--font-size-xs': '0.625rem',
    // step -2: 10px (14 × 1.2⁻² ≈ 9.72 → 10)
    '--font-size-sm': '0.75rem',
    // step -1: 12px (14 × 1.2⁻¹ ≈ 11.67 → 12)
    '--font-size-base': '0.875rem',
    // step  0: 14px — base anchor
    '--font-size-lg': '1.0625rem',
    // step +1: 17px (14 × 1.2¹ ≈ 16.8 → 17)
    '--font-size-xl': '1.25rem',
    // step +2: 20px (14 × 1.2² ≈ 20.16 → 20)
    '--font-size-2xl': '1.5rem',
    // step +3: 24px (14 × 1.2³ ≈ 24.19 → 24)
    '--font-size-3xl': '1.8125rem',
    // step +4: 29px (14 × 1.2⁴ ≈ 29.03 → 29)
    '--font-size-4xl': '2.1875rem',
    // step +5: 35px (14 × 1.2⁵ ≈ 34.84 → 35)
    '--font-size-5xl': '2.625rem' // step +6: 42px (14 × 1.2⁶ ≈ 41.80 → 42)
};
const textSizeVars = {
    "--font-size-4xs": "var(--font-size-4xs)",
    "--font-size-3xs": "var(--font-size-3xs)",
    "--font-size-2xs": "var(--font-size-2xs)",
    "--font-size-xs": "var(--font-size-xs)",
    "--font-size-sm": "var(--font-size-sm)",
    "--font-size-base": "var(--font-size-base)",
    "--font-size-lg": "var(--font-size-lg)",
    "--font-size-xl": "var(--font-size-xl)",
    "--font-size-2xl": "var(--font-size-2xl)",
    "--font-size-3xl": "var(--font-size-3xl)",
    "--font-size-4xl": "var(--font-size-4xl)",
    "--font-size-5xl": "var(--font-size-5xl)",
    __varGroupHash__: "x1q1ms06"
};
const fontWeightDefaults = {
    '--font-weight-normal': '400',
    // body, captions, code
    '--font-weight-medium': '500',
    // subheadlines, data viz
    '--font-weight-semibold': '600',
    // emphasized body, titles
    '--font-weight-bold': '700' // strong emphasis, headings
};
const fontWeightVars = {
    "--font-weight-normal": "var(--font-weight-normal)",
    "--font-weight-medium": "var(--font-weight-medium)",
    "--font-weight-semibold": "var(--font-weight-semibold)",
    "--font-weight-bold": "var(--font-weight-bold)",
    __varGroupHash__: "x1ccmotb"
};
const typeScaleDefaults = {
    // Sizes are var() references to raw size tokens.
    // Line heights are hardcoded computed values (4px grid snapped, tiered target).
    // When typography.scale is used in defineTheme, both raw tokens AND these semantic
    // tokens are overridden together.
    //
    // Step mapping: h6=-2, h5=-1, h4=0(base), h3=+1, h2=+2, h1=+3
    //
    // Heading tokens
    '--text-heading-1-size': 'var(--font-size-2xl)',
    // step +3: 24px
    '--text-heading-1-weight': 'var(--font-weight-semibold)',
    '--text-heading-1-leading': '1.3333',
    // 24px → 32px (target 1.4, 4px snap)
    '--text-heading-2-size': 'var(--font-size-xl)',
    // step +2: 20px
    '--text-heading-2-weight': 'var(--font-weight-semibold)',
    '--text-heading-2-leading': '1.4',
    // 20px → 28px (target 1.4, 4px snap)
    '--text-heading-3-size': 'var(--font-size-lg)',
    // step +1: 17px
    '--text-heading-3-weight': 'var(--font-weight-semibold)',
    '--text-heading-3-leading': '1.4118',
    // 17px → 24px (target 1.5, 4px snap)
    '--text-heading-4-size': 'var(--font-size-base)',
    // step  0: 14px — base anchor
    '--text-heading-4-weight': 'var(--font-weight-semibold)',
    '--text-heading-4-leading': '1.4286',
    // 14px → 20px (target 1.5, 4px snap)
    '--text-heading-5-size': 'var(--font-size-sm)',
    // step -1: 12px
    '--text-heading-5-weight': 'var(--font-weight-semibold)',
    '--text-heading-5-leading': '1.6667',
    // 12px → 20px (target 1.5, 4px snap)
    '--text-heading-6-size': 'var(--font-size-xs)',
    // step -2: 10px
    '--text-heading-6-weight': 'var(--font-weight-semibold)',
    '--text-heading-6-leading': '1.6',
    // 10px → 16px (target 1.5, min dominated)
    // Text tokens — body/label/code at base(0), large at +1, supporting at -1
    '--text-body-size': 'var(--font-size-base)',
    // 14px
    '--text-body-weight': 'var(--font-weight-normal)',
    '--text-body-leading': '1.4286',
    // 14px → 20px
    '--text-large-size': 'var(--font-size-lg)',
    // 17px
    '--text-large-weight': 'var(--font-weight-semibold)',
    '--text-large-leading': '1.4118',
    // 17px → 24px
    '--text-label-size': 'var(--font-size-base)',
    // 14px
    '--text-label-weight': 'var(--font-weight-medium)',
    '--text-label-leading': '1.4286',
    // 14px → 20px
    '--text-code-size': 'var(--font-size-base)',
    // 14px
    '--text-code-weight': 'var(--font-weight-normal)',
    '--text-code-leading': '1.4286',
    // 14px → 20px
    '--text-supporting-size': 'var(--font-size-sm)',
    // 12px
    '--text-supporting-weight': 'var(--font-weight-normal)',
    '--text-supporting-leading': '1.6667',
    // 12px → 20px
    // Display tokens — continue the geometric progression above h1.
    // Display 1 = step +6 (largest, 42px), Display 3 = step +4 (29px, closest to h1).
    // Line heights are tighter (~1.2) than headings (~1.3) since large text reads better tight.
    // Font weight is normal (400) to balance the visual presence of large sizes.
    '--text-display-1-size': 'var(--font-size-5xl)',
    // 42px (14 × 1.2⁶, largest)
    '--text-display-1-weight': 'var(--font-weight-normal)',
    '--text-display-1-leading': '1.2381',
    '--text-display-2-size': 'var(--font-size-4xl)',
    // 35px (14 × 1.2⁵)
    '--text-display-2-weight': 'var(--font-weight-normal)',
    '--text-display-2-leading': '1.2571',
    '--text-display-3-size': 'var(--font-size-3xl)',
    // 29px (14 × 1.2⁴, closest to h1)
    '--text-display-3-weight': 'var(--font-weight-normal)',
    '--text-display-3-leading': '1.2414'
};
const typeScaleVars = {
    "--text-heading-1-size": "var(--text-heading-1-size)",
    "--text-heading-1-weight": "var(--text-heading-1-weight)",
    "--text-heading-1-leading": "var(--text-heading-1-leading)",
    "--text-heading-2-size": "var(--text-heading-2-size)",
    "--text-heading-2-weight": "var(--text-heading-2-weight)",
    "--text-heading-2-leading": "var(--text-heading-2-leading)",
    "--text-heading-3-size": "var(--text-heading-3-size)",
    "--text-heading-3-weight": "var(--text-heading-3-weight)",
    "--text-heading-3-leading": "var(--text-heading-3-leading)",
    "--text-heading-4-size": "var(--text-heading-4-size)",
    "--text-heading-4-weight": "var(--text-heading-4-weight)",
    "--text-heading-4-leading": "var(--text-heading-4-leading)",
    "--text-heading-5-size": "var(--text-heading-5-size)",
    "--text-heading-5-weight": "var(--text-heading-5-weight)",
    "--text-heading-5-leading": "var(--text-heading-5-leading)",
    "--text-heading-6-size": "var(--text-heading-6-size)",
    "--text-heading-6-weight": "var(--text-heading-6-weight)",
    "--text-heading-6-leading": "var(--text-heading-6-leading)",
    "--text-body-size": "var(--text-body-size)",
    "--text-body-weight": "var(--text-body-weight)",
    "--text-body-leading": "var(--text-body-leading)",
    "--text-large-size": "var(--text-large-size)",
    "--text-large-weight": "var(--text-large-weight)",
    "--text-large-leading": "var(--text-large-leading)",
    "--text-label-size": "var(--text-label-size)",
    "--text-label-weight": "var(--text-label-weight)",
    "--text-label-leading": "var(--text-label-leading)",
    "--text-code-size": "var(--text-code-size)",
    "--text-code-weight": "var(--text-code-weight)",
    "--text-code-leading": "var(--text-code-leading)",
    "--text-supporting-size": "var(--text-supporting-size)",
    "--text-supporting-weight": "var(--text-supporting-weight)",
    "--text-supporting-leading": "var(--text-supporting-leading)",
    "--text-display-1-size": "var(--text-display-1-size)",
    "--text-display-1-weight": "var(--text-display-1-weight)",
    "--text-display-1-leading": "var(--text-display-1-leading)",
    "--text-display-2-size": "var(--text-display-2-size)",
    "--text-display-2-weight": "var(--text-display-2-weight)",
    "--text-display-2-leading": "var(--text-display-2-leading)",
    "--text-display-3-size": "var(--text-display-3-size)",
    "--text-display-3-weight": "var(--text-display-3-weight)",
    "--text-display-3-leading": "var(--text-display-3-leading)",
    __varGroupHash__: "x1etlgq0"
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/uikitTypography.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file uikitTypography.ts
 * @input Nothing; data only
 * @output Exports `typography`: the point size of each UIKit text style at each
 *   content size category (Dynamic Type), from xSmall to AX5
 * @position Theme data: theme/dynamicType.ts scales a theme's own type scale
 *   on these curves when the reader changes their text size.
 *
 * Every row lists the twelve content size categories in order: xSmall, Small,
 * Medium, Large (the default), xLarge, xxLarge, xxxLarge, then the five
 * accessibility sizes AX1–AX5 that Larger Accessibility Sizes unlocks. A row
 * is what `UIFont.preferredFont(forTextStyle:compatibleWith:)` returns for that
 * style, and what Mobile Safari computes for the matching
 * `font: -apple-system-*` keyword (`title0` is Large Title, `title1`–`title3`
 * are Title 1–3).
 *
 * Only the styles a theme role scales on are listed (theme/dynamicType.ts maps
 * each raw font-size step to one of them).
 *
 * Every row carries one or more `@source`: Apple's documentation, a WWDC
 * session, WebKit's own source, or a measurement naming its subject, the iOS
 * version and the date. dynamicType.test.ts enforces it.
 *
 * SYNC: When modified, update /packages/core/src/theme/dynamicType.ts
 */ __turbopack_context__.s([
    "typography",
    ()=>typography
]);
const typography = {
    /**
   * Large Title, in points per content size category (xSmall … AX5).
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, UIFont.preferredFont(forTextStyle:compatibleWith:) at
   *   each content size category, Oct 23 2026
   * @source measured: Mobile Safari, iOS 26.2 simulator, iPhone 17 Pro,
   *   computed font-size of `font: -apple-system-title0` at each category,
   *   Oct 24 2026
   * @source apple-docs https://developer.apple.com/design/human-interface-guidelines/typography
   */ largeTitle: [
        31,
        32,
        33,
        34,
        36,
        38,
        40,
        44,
        48,
        52,
        56,
        60
    ],
    /**
   * Title 1, in points per content size category (xSmall … AX5).
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, UIFont.preferredFont(forTextStyle:compatibleWith:) at
   *   each content size category, Oct 23 2026
   * @source measured: Mobile Safari, iOS 26.2 simulator, iPhone 17 Pro,
   *   computed font-size of `font: -apple-system-title1` at each category,
   *   Oct 24 2026
   * @source apple-docs https://developer.apple.com/design/human-interface-guidelines/typography
   */ title1: [
        25,
        26,
        27,
        28,
        30,
        32,
        34,
        38,
        43,
        48,
        53,
        58
    ],
    /**
   * Title 2, in points per content size category (xSmall … AX5).
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, UIFont.preferredFont(forTextStyle:compatibleWith:) at
   *   each content size category, Oct 23 2026
   * @source measured: Mobile Safari, iOS 26.2 simulator, iPhone 17 Pro,
   *   computed font-size of `font: -apple-system-title2` at each category,
   *   Oct 24 2026
   * @source apple-docs https://developer.apple.com/design/human-interface-guidelines/typography
   */ title2: [
        19,
        20,
        21,
        22,
        24,
        26,
        28,
        34,
        39,
        44,
        50,
        56
    ],
    /**
   * Title 3, in points per content size category (xSmall … AX5).
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, UIFont.preferredFont(forTextStyle:compatibleWith:) at
   *   each content size category, Oct 23 2026
   * @source measured: Mobile Safari, iOS 26.2 simulator, iPhone 17 Pro,
   *   computed font-size of `font: -apple-system-title3` at each category,
   *   Oct 24 2026
   * @source apple-docs https://developer.apple.com/design/human-interface-guidelines/typography
   */ title3: [
        17,
        18,
        19,
        20,
        22,
        24,
        26,
        31,
        37,
        43,
        49,
        55
    ],
    /**
   * Body, in points per content size category (xSmall … AX5). Every
   * category has its own Body size, so Body alone identifies the category.
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, UIFont.preferredFont(forTextStyle:compatibleWith:) at
   *   each content size category, Oct 23 2026
   * @source measured: Mobile Safari, iOS 26.2 simulator, iPhone 17 Pro,
   *   computed font-size of `font: -apple-system-body` at each category,
   *   Oct 24 2026
   * @source apple-docs https://developer.apple.com/design/human-interface-guidelines/typography
   */ body: [
        14,
        15,
        16,
        17,
        19,
        21,
        23,
        28,
        33,
        40,
        47,
        53
    ],
    /**
   * Footnote, in points per content size category (xSmall … AX5).
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, UIFont.preferredFont(forTextStyle:compatibleWith:) at
   *   each content size category, Oct 23 2026
   * @source measured: Mobile Safari, iOS 26.2 simulator, iPhone 17 Pro,
   *   computed font-size of `font: -apple-system-footnote` at each category,
   *   Oct 24 2026
   * @source apple-docs https://developer.apple.com/design/human-interface-guidelines/typography
   */ footnote: [
        12,
        12,
        12,
        13,
        15,
        17,
        19,
        23,
        27,
        33,
        38,
        44
    ],
    /**
   * Caption 1, in points per content size category (xSmall … AX5).
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, UIFont.preferredFont(forTextStyle:compatibleWith:) at
   *   each content size category, Oct 23 2026
   * @source measured: Mobile Safari, iOS 26.2 simulator, iPhone 17 Pro,
   *   computed font-size of `font: -apple-system-caption1` at each category,
   *   Oct 24 2026
   * @source apple-docs https://developer.apple.com/design/human-interface-guidelines/typography
   */ caption1: [
        11,
        11,
        11,
        12,
        14,
        16,
        18,
        22,
        26,
        32,
        37,
        43
    ],
    /**
   * Caption 2, in points per content size category (xSmall … AX5).
   * @source measured: UIKit lab (injected host app), iOS 26.2 simulator,
   *   iPhone 17 Pro, UIFont.preferredFont(forTextStyle:compatibleWith:) at
   *   each content size category, Oct 23 2026
   * @source measured: Mobile Safari, iOS 26.2 simulator, iPhone 17 Pro,
   *   computed font-size of `font: -apple-system-caption2` at each category,
   *   Oct 24 2026
   * @source apple-docs https://developer.apple.com/design/human-interface-guidelines/typography
   */ caption2: [
        11,
        11,
        11,
        11,
        13,
        15,
        17,
        20,
        24,
        29,
        34,
        40
    ]
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/theme/useTheme.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeContext",
    ()=>ThemeContext,
    "useTheme",
    ()=>useTheme,
    "useThemeDefinition",
    ()=>useThemeDefinition,
    "useThemeName",
    ()=>useThemeName
]);
/**
 * @file useTheme.ts
 * @input ThemeContext provided by Theme
 * @output Exports useTheme, useThemeName, and internal theme-object access
 * @position Theme hook; used by data viz, canvas, and non-CSS consumers
 *
 * Provides synchronous access to theme token values resolved for the
 * current color mode — no DOM reads on the provider path, no double render.
 * The returned `mode` is always 'light' | 'dark': 'system', and any value
 * outside the union, resolves through the OS preference.
 * Without a reachable ThemeContext it consults `<html data-theme>` and
 * `<html data-astryx-theme>` (kept in sync by Theme) via shared, refcounted
 * MutationObservers before assuming OS preference/default tokens. Provider-path
 * consumers subscribe to no-op stores instead, so mounting under a Theme never
 * creates an observer. Token resolution is shared with the server-safe helpers
 * in ./tokens.ts.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/theme/index.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/themeRegistry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/naming.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMediaQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMediaQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
;
;
;
const ThemeContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSharedContext"])('ThemeContext', 1, null);
ThemeContext.displayName = 'ThemeContext';
// =============================================================================
// Return type
// =============================================================================
/**
 * Resolved theme data returned by useTheme.
 */ // =============================================================================
// Hook
// =============================================================================
function getRootModeAttrSnapshot() {
    if (typeof document === 'undefined') {
        return null;
    }
    const attr = document.documentElement.getAttribute('data-theme');
    return attr === 'light' || attr === 'dark' ? attr : null;
}
function getRootModeAttrServerSnapshot() {
    return null;
}
function getRootNameAttrSnapshot() {
    if (typeof document === 'undefined') {
        return null;
    }
    return document.documentElement.getAttribute((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataAttr"])('theme'));
}
function getRootNameAttrServerSnapshot() {
    return null;
}
function getNullThemeSnapshot() {
    return null;
}
// Every no-context consumer wants the same <html data-theme> attribute, so
// one MutationObserver — refcounted via this listener set — serves all of
// them instead of one per consumer.
const rootModeAttrListeners = new Set();
let rootModeAttrObserver = null;
const rootNameAttrListeners = new Set();
let rootNameAttrObserver = null;
function notifyRootModeAttrListeners() {
    for (const listener of rootModeAttrListeners){
        listener();
    }
}
function subscribeRootModeAttr(onStoreChange) {
    rootModeAttrListeners.add(onStoreChange);
    if (rootModeAttrListeners.size === 1 && typeof MutationObserver !== 'undefined') {
        rootModeAttrObserver = new MutationObserver(notifyRootModeAttrListeners);
        rootModeAttrObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: [
                'data-theme'
            ]
        });
    }
    return ()=>{
        rootModeAttrListeners.delete(onStoreChange);
        if (rootModeAttrListeners.size === 0 && rootModeAttrObserver) {
            rootModeAttrObserver.disconnect();
            rootModeAttrObserver = null;
        }
    };
}
function notifyRootNameAttrListeners() {
    for (const listener of rootNameAttrListeners){
        listener();
    }
}
function subscribeRootNameAttr(onStoreChange) {
    rootNameAttrListeners.add(onStoreChange);
    if (rootNameAttrListeners.size === 1 && typeof MutationObserver !== 'undefined') {
        rootNameAttrObserver = new MutationObserver(notifyRootNameAttrListeners);
        rootNameAttrObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dataAttr"])('theme')
            ]
        });
    }
    return ()=>{
        rootNameAttrListeners.delete(onStoreChange);
        if (rootNameAttrListeners.size === 0 && rootNameAttrObserver) {
            rootNameAttrObserver.disconnect();
            rootNameAttrObserver = null;
        }
    };
}
function subscribeNoop() {
    return ()=>{};
}
/**
 * Reads the root Theme's mode off `<html data-theme>`, live via the shared
 * MutationObserver. Null means no root Theme has synced it (none present,
 * or mode is 'system'). `hasCtx` switches which store this subscribes to —
 * a no-op store when a ThemeContext exists — instead of skipping the hook
 * call, so provider-path consumers never touch the DOM or the observer.
 */ function useRootModeAttr(hasCtx) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(hasCtx ? subscribeNoop : subscribeRootModeAttr, hasCtx ? getNullThemeSnapshot : getRootModeAttrSnapshot, getRootModeAttrServerSnapshot);
}
function useRootThemeNameAttr(hasCtx) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(hasCtx ? subscribeNoop : subscribeRootNameAttr, hasCtx ? getNullThemeSnapshot : getRootNameAttrSnapshot, getRootNameAttrServerSnapshot);
}
function useThemeName() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(ThemeContext);
    const hasCtx = ctx != null;
    const rootThemeName = useRootThemeNameAttr(hasCtx);
    return ctx?.theme.name ?? rootThemeName;
}
function useThemeDefinition(enabled = true) {
    // `use` may be called conditionally, unlike the other hooks.
    const ctx = enabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(ThemeContext) : null;
    const hasCtx = ctx != null;
    const rootThemeName = useRootThemeNameAttr(hasCtx || !enabled);
    if (!enabled) {
        return undefined;
    }
    return ctx?.theme ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRegisteredTheme"])(rootThemeName) ?? undefined;
}
function useTheme() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(ThemeContext);
    // Falls back to the root Theme's mode via <html data-theme> when there's
    // no ThemeContext ancestor (e.g. useToast's detached fallback viewport).
    // Resolves to null when `ctx` is present, so it has no effect there.
    const hasCtx = ctx != null;
    const rootAttrMode = useRootModeAttr(hasCtx);
    const rootThemeName = useRootThemeNameAttr(hasCtx);
    // Resolve 'system' to 'light' | 'dark' using the OS preference
    const prefersDark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMediaQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMediaQuery"])('(prefers-color-scheme: dark)');
    const mode = ctx?.mode ?? rootAttrMode ?? 'system';
    const theme = ctx?.theme ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRegisteredTheme"])(rootThemeName);
    // Anything outside light|dark (a stale persisted preference cast to
    // ThemeMode, say) resolves like 'system', the way the root Theme's <html>
    // sync already treats it, so the declared return type holds.
    const effectiveMode = mode === 'light' || mode === 'dark' ? mode : prefersDark ? 'dark' : 'light';
    // Build the full resolved map, memoized on theme + effective mode
    const tokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useTheme.useMemo[tokens]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveThemeTokens"])(theme, {
                mode: effectiveMode
            })
    }["useTheme.useMemo[tokens]"], [
        theme,
        effectiveMode
    ]);
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTheme.useCallback[token]": (name)=>tokens[name] ?? ''
    }["useTheme.useCallback[token]"], [
        tokens
    ]);
    const name = theme?.name ?? 'default';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useTheme.useMemo": ()=>({
                name,
                mode: effectiveMode,
                token,
                tokens
            })
    }["useTheme.useMemo"], [
        name,
        effectiveMode,
        token,
        tokens
    ]);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/coarsePointer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isCoarsePointer",
    ()=>isCoarsePointer,
    "matchesMediaQuery",
    ()=>matchesMediaQuery,
    "watchCoarsePointer",
    ()=>watchCoarsePointer,
    "watchMediaQuery",
    ()=>watchMediaQuery
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file coarsePointer.ts
 * @input A window
 * @output Exports isCoarsePointer, matchesMediaQuery, watchCoarsePointer and
 *   watchMediaQuery: whether the primary pointer is coarse (TOUCH_QUERY) or
 *   any media query matches, and when either changes
 * @position The coarse-pointer gate of packages/core/src/gestures and of
 *   the press controller (pressFeedback.ts): touch-only work registers only
 *   while it holds. useMediaQuery and the presentation resolvers read and
 *   watch through matchesMediaQuery and watchMediaQuery
 *
 * Under a coarse primary pointer, a phone's touch work stays registered: the
 * gesture host's page listeners, the page hold and the finger scroll. Under a
 * fine one, recognizers still attach, and the host listens on the page only
 * during a press (AST-094). The answer can change while the page is open (a
 * tablet docking a mouse), so a holder watches it.
 *
 * SYNC: When modified, update coarsePointer.test.ts.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchQueries$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/touchQueries.js [app-client] (ecmascript)");
;
function isCoarsePointer(view) {
    return matchesMediaQuery(view, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchQueries$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH_QUERY"]);
}
function matchesMediaQuery(view, query) {
    return typeof view?.matchMedia === 'function' && view.matchMedia(query).matches;
}
function watchMediaQuery(view, query, listener) {
    if (typeof view?.matchMedia !== 'function') {
        return ()=>{};
    }
    const list = view.matchMedia(query);
    const onChange = ()=>listener(list.matches);
    if (typeof list.addEventListener === 'function') {
        list.addEventListener('change', onChange);
        return ()=>list.removeEventListener('change', onChange);
    }
    // Safari before 14 only has the older pair.
    list.addListener(onChange);
    return ()=>list.removeListener(onChange);
}
function watchCoarsePointer(view, listener) {
    return watchMediaQuery(view, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchQueries$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOUCH_QUERY"], listener);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/color.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatColor",
    ()=>formatColor,
    "formatHex",
    ()=>formatHex,
    "parseColor",
    ()=>parseColor,
    "parseHex",
    ()=>parseHex,
    "parseRgb",
    ()=>parseRgb,
    "toGLFloats",
    ()=>toGLFloats
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file color.ts
 * @input CSS color strings (hex, rgb()/rgba(), a small set of named colors)
 * @output Shared color parsing/formatting primitives used across the design system
 * @position Package utility; backs theme token resolution, HCT color math, and chart/WebGL rendering
 *
 * A single home for the color parsers that were previously duplicated across
 * the theme layer, charts, and lab. Consumers get one well-tested definition of
 * "parse this color" rather than several subtly different regexes.
 */ /** A color decomposed into 0-255 RGB channels and a 0-1 alpha. */ /** The named colors the design system relies on in token expressions. */ const NAMED_COLORS = {
    transparent: {
        r: 0,
        g: 0,
        b: 0,
        a: 0
    },
    black: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    },
    white: {
        r: 255,
        g: 255,
        b: 255,
        a: 1
    }
};
const clamp = (value, min, max)=>Math.max(min, Math.min(max, value));
/** Expand a shorthand hex body (`rgb`/`rgba`) to its full form (`rrggbb`/`rrggbbaa`). */ function expandShorthand(body) {
    return body.split('').map((c)=>c + c).join('');
}
function parseHex(hex) {
    if (typeof hex !== 'string') {
        return null;
    }
    const body = hex.trim().replace(/^#/, '');
    const normalized = body.length === 3 || body.length === 4 ? expandShorthand(body) : body;
    if (normalized.length !== 6 && normalized.length !== 8 || !/^[0-9a-fA-F]+$/.test(normalized)) {
        return null;
    }
    return {
        r: parseInt(normalized.slice(0, 2), 16),
        g: parseInt(normalized.slice(2, 4), 16),
        b: parseInt(normalized.slice(4, 6), 16),
        a: normalized.length === 8 ? parseInt(normalized.slice(6, 8), 16) / 255 : 1
    };
}
function parseRgb(value) {
    const open = value.indexOf('(');
    if (open === -1 || !value.trim().endsWith(')')) {
        return null;
    }
    const body = value.slice(open + 1, value.lastIndexOf(')')).replace(/\//g, ' ');
    const parts = body.split(/[\s,]+/).map((p)=>p.trim()).filter(Boolean);
    if (parts.length < 3) {
        return null;
    }
    const channel = (p)=>{
        const n = p.endsWith('%') ? parseFloat(p) / 100 * 255 : parseFloat(p);
        return clamp(n, 0, 255);
    };
    const r = channel(parts[0]);
    const g = channel(parts[1]);
    const b = channel(parts[2]);
    if ([
        r,
        g,
        b
    ].some(Number.isNaN)) {
        return null;
    }
    let a = 1;
    if (parts.length >= 4) {
        const raw = parts[3];
        a = raw.endsWith('%') ? parseFloat(raw) / 100 : parseFloat(raw);
        if (Number.isNaN(a)) {
            return null;
        }
        a = clamp(a, 0, 1);
    }
    return {
        r,
        g,
        b,
        a
    };
}
function parseColor(value) {
    const trimmed = value.trim();
    // A plain record answers `constructor` and `__proto__` from
    // Object.prototype, so the lookup must test own properties.
    const name = trimmed.toLowerCase();
    if (Object.hasOwn(NAMED_COLORS, name)) {
        return {
            ...NAMED_COLORS[name]
        };
    }
    if (trimmed.startsWith('#')) {
        return parseHex(trimmed);
    }
    if (/^rgba?\(/i.test(trimmed)) {
        return parseRgb(trimmed);
    }
    return null;
}
function formatHex(r, g, b) {
    const channel = (c)=>clamp(Math.round(c), 0, 255).toString(16).padStart(2, '0').toUpperCase();
    return `#${channel(r)}${channel(g)}${channel(b)}`;
}
function formatColor({ r, g, b, a }) {
    if (a >= 1) {
        return formatHex(r, g, b);
    }
    const round = (n)=>clamp(Math.round(n), 0, 255);
    return `rgba(${round(r)}, ${round(g)}, ${round(b)}, ${parseFloat(a.toFixed(4))})`;
}
/** Neutral fallback (mid-grey) for colors a GL path can't parse — visible, never NaN. */ const GL_FALLBACK = [
    0.5,
    0.5,
    0.5
];
function toGLFloats(color) {
    if (color === null || ![
        color.r,
        color.g,
        color.b
    ].every(Number.isFinite)) {
        return GL_FALLBACK;
    }
    const channel = (c)=>clamp(c, 0, 255) / 255;
    return [
        channel(color.r),
        channel(color.g),
        channel(color.b)
    ];
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/devWarning.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__resetDevWarnings",
    ()=>__resetDevWarnings,
    "createDevWarnings",
    ()=>createDevWarnings,
    "devError",
    ()=>devError,
    "devWarn",
    ()=>devWarn,
    "formatDevMessage",
    ()=>formatDevMessage,
    "warnOnce",
    ()=>warnOnce
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file devWarning.ts
 * @input A component/hook name and a message
 * @output Standardized `Component: message` console warnings and errors
 * @position Shared dev-logging utility used across components and hooks
 *
 * Every message reads `Component: message`, so the source is clear in the
 * console. Prefer `useDevWarning` in components, because it does not repeat
 * a warning on each render. These helpers are for plain functions, module
 * initialization and effects.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/utils/index.ts
 * - /packages/core/src/hooks/useDevWarning.ts (the render-path counterpart)
 */ // Bundlers replace this value at build time. The declaration lets a product
// without Node's types type-check this file.
const isDev = ("TURBOPACK compile-time value", "development") !== 'production';
function formatDevMessage(component, message) {
    return `${component}: ${message}`;
}
function devWarn(component, message, ...args) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    console.warn(formatDevMessage(component, message), ...args);
}
function createDevWarnings() {
    const warned = new Set();
    return (component, message, key = message)=>{
        if (("TURBOPACK compile-time value", "development") === 'production' || warned.has(key)) {
            return;
        }
        warned.add(key);
        devWarn(component, message);
    };
}
function devError(component, message, ...args) {
    console.error(formatDevMessage(component, message), ...args);
}
const warnedKeys = new Set();
function warnOnce(key, component, message, ...args) {
    if (!isDev || warnedKeys.has(key)) {
        return;
    }
    warnedKeys.add(key);
    console.warn(formatDevMessage(component, message), ...args);
}
function __resetDevWarnings() {
    warnedKeys.clear();
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/parseStyleKey.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseStyleKey",
    ()=>parseStyleKey
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)");
;
/** Escape a value for a double-quoted CSS attribute selector string. */ function escapeAttributeValue(value) {
    let escaped = '';
    for (const char of value){
        const codePoint = char.codePointAt(0) ?? 0;
        if (char === '"' || char === '\\' || codePoint < 0x20 || codePoint === 0x7f) {
            escaped += `\\${(codePoint === 0 ? 0xfffd : codePoint).toString(16)} `;
        } else {
            escaped += char;
        }
    }
    return escaped;
}
function parseStyleKey(key) {
    if (key === 'base') {
        return '';
    }
    return key.split('+').map((part)=>{
        const separator = part.indexOf(':');
        const prop = separator === -1 ? part : part.slice(0, separator);
        const value = separator === -1 ? part : part.slice(separator + 1);
        return `[${(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeDataAttributeName"])(prop)}="${escapeAttributeValue(value)}"]`;
    }).join('');
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSharedContext",
    ()=>createSharedContext
]);
/**
 * @file sharedContext.ts
 * @input A registered name and its protocol version
 * @output A React context per key and React, shared by every copy of Core
 *   that runs on that React
 * @position Shared runtime state: a swizzled copy and the package use the same
 *   contexts and stores when their protocol versions match
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
function createSharedContext(name, version, defaultValue) {
    const byReact = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["realmValue"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sharedKey"])(`context/${name}`, version), ()=>new WeakMap(), (value)=>value instanceof WeakMap);
    const existing = byReact.get(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]);
    if (existing != null) {
        return existing;
    }
    const SharedContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(defaultValue);
    SharedContext.displayName = name;
    byReact.set(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"], SharedContext);
    return SharedContext;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedForReact.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sharedForReact",
    ()=>sharedForReact
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file sharedForReact.ts
 * @input A registered name, its protocol version, and the React this module
 *   loads with
 * @output One value per React under that name, shared by every copy of Core
 *   on that React
 * @position Shared runtime state for values that hold React components or
 *   elements; no client directive, so server modules can use it
 *
 * Server and client React builds are separate instances, so each keeps its
 * own value.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-client] (ecmascript)");
;
;
function sharedForReact(name, version, create) {
    const byReact = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["realmValue"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sharedKey"])(`react/${name}`, version), ()=>new WeakMap(), (value)=>value instanceof WeakMap);
    if (byReact.has(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])) {
        return byReact.get(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]);
    }
    const value = create();
    byReact.set(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"], value);
    return value;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file sharedRealm.ts
 * @input A registered name and its protocol version
 * @output One value per key in the JavaScript realm, shared by every copy of
 *   Core, and the shapes that hold it: state, maps, stores, brands and
 *   sequences
 * @position Shared runtime state for stores and contexts; no React and no
 *   client directive, so server-safe modules can use it
 */ /**
 * The registered key of a shared value. The version names the value's shape.
 * Change it when a copy built against the old shape cannot read the value.
 * Each copy then keeps its own value.
 */ __turbopack_context__.s([
    "realmValue",
    ()=>realmValue,
    "resetSharedStateForTest",
    ()=>resetSharedStateForTest,
    "sharedBrand",
    ()=>sharedBrand,
    "sharedKey",
    ()=>sharedKey,
    "sharedMap",
    ()=>sharedMap,
    "sharedSequence",
    ()=>sharedSequence,
    "sharedState",
    ()=>sharedState,
    "sharedStore",
    ()=>sharedStore,
    "sharedWeakMap",
    ()=>sharedWeakMap,
    "sharedWeakSet",
    ()=>sharedWeakSet
]);
function sharedKey(name, version) {
    return Symbol.for(`@astryxdesign/core/${name}/v${version}`);
}
function realmValue(key, create, accepts = ()=>true) {
    const realm = globalThis;
    if (Object.hasOwn(realm, key)) {
        const existing = realm[key];
        return accepts(existing) ? existing : create();
    }
    const value = create();
    realm[key] = value;
    return value;
}
function sharedState(name, version, create) {
    return realmValue(sharedKey(name, version), create);
}
function sharedMap(name, version) {
    return sharedState(name, version, ()=>new Map());
}
function sharedWeakMap(name, version) {
    return sharedState(name, version, ()=>new WeakMap());
}
function sharedWeakSet(name, version) {
    return sharedState(name, version, ()=>new WeakSet());
}
function sharedStore(name, version, initial) {
    return sharedState(name, version, ()=>{
        let value = initial;
        const listeners = new Set();
        return {
            get: ()=>value,
            set: (next)=>{
                if (Object.is(next, value)) {
                    return;
                }
                value = next;
                for (const listener of [
                    ...listeners
                ]){
                    listener();
                }
            },
            subscribe: (listener)=>{
                listeners.add(listener);
                return ()=>{
                    listeners.delete(listener);
                };
            }
        };
    });
}
function sharedBrand(name, version) {
    const key = sharedKey(name, version);
    return {
        key,
        read: (target)=>typeof target === 'object' && target !== null && key in target ? target[key] : undefined
    };
}
function sharedSequence(name, version) {
    const counter = sharedState(name, version, ()=>({
            next: 0
        }));
    return ()=>{
        counter.next += 1;
        return counter.next;
    };
}
function resetSharedStateForTest(prefix = '') {
    const realm = globalThis;
    const start = `@astryxdesign/core/${prefix}`;
    for (const key of Object.getOwnPropertySymbols(realm)){
        if (key.description?.startsWith(start)) {
            Reflect.deleteProperty(realm, key);
        }
    }
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedResizeObserver.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isResizeObserved",
    ()=>isResizeObserved,
    "observeResize",
    ()=>observeResize,
    "observeResizeAfterLayout",
    ()=>observeResizeAfterLayout,
    "unobserveResize",
    ()=>unobserveResize
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
/**
 * @file sharedResizeObserver.ts
 * @input ResizeObserver API
 * @output Exports observeResize / unobserveResize for shared observation,
 *   observeResizeAfterLayout for a first measurement after layout, and the
 *   internal isResizeObserved
 * @position Utility; consumed by useTruncation, useOverflow, and any component
 *   that needs resize observation without creating per-instance observers
 *
 * A single ResizeObserver can observe thousands of elements. Creating one
 * per component (e.g. per table cell) is wasteful — browsers batch
 * observations per observer instance, so a shared observer means one
 * callback dispatch per animation frame instead of N.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/utils/index.ts (exports)
 * - /packages/core/src/Text/useTruncation.ts (primary consumer)
 * - /packages/core/src/Lightbox/Lightbox.tsx (observeResizeAfterLayout)
 */ let observer = null;
// A callback may be registered more than once for one element. The inner map
// keeps those registrations alive independently without dispatching duplicate
// work for the same callback reference.
const callbacks = new Map();
/**
 * The shared observer, or null where the API does not exist (jsdom, an old
 * browser). Callers still get the one-shot measurement `observeResize` fires
 * on registration; live resize updates are the part that needs the API.
 */ function getObserver() {
    if (typeof ResizeObserver === 'undefined') {
        return null;
    }
    if (!observer) {
        observer = new ResizeObserver((entries)=>{
            for (const entry of entries){
                const targetCallbacks = callbacks.get(entry.target);
                if (targetCallbacks) {
                    // A callback may unsubscribe while dispatch is in progress.
                    for (const cb of [
                        ...targetCallbacks.keys()
                    ]){
                        cb(entry);
                    }
                }
            }
        });
    }
    return observer;
}
function isResizeObserved(element) {
    return callbacks.has(element);
}
function observeResize(element, callback) {
    const existing = callbacks.get(element);
    if (existing) {
        existing.set(callback, (existing.get(callback) ?? 0) + 1);
    } else {
        callbacks.set(element, new Map([
            [
                callback,
                1
            ]
        ]));
    }
    getObserver()?.observe(element);
    // Fire once immediately so callers get an initial measurement
    // without duplicating their logic outside the observer path.
    const entry = {
        target: element
    };
    callback(entry);
    let isSubscribed = true;
    return ()=>{
        if (!isSubscribed) {
            return;
        }
        isSubscribed = false;
        unobserveResize(element, callback);
    };
}
function observeResizeAfterLayout(element, onResize) {
    if (typeof ResizeObserver === 'undefined') {
        return null;
    }
    const wasObserved = isResizeObserved(element);
    let isRegistered = false;
    let isActive = true;
    const unsubscribe = observeResize(element, (entry)=>{
        if (isRegistered) {
            onResize(entry);
        }
    });
    isRegistered = true;
    if (wasObserved) {
        queueMicrotask(()=>{
            if (isActive) {
                onResize(null);
            }
        });
    }
    return ()=>{
        isActive = false;
        unsubscribe();
    };
}
function unobserveResize(element, callback) {
    const targetCallbacks = callbacks.get(element);
    if (callback != null) {
        const registrationCount = targetCallbacks?.get(callback);
        if (targetCallbacks == null || registrationCount == null) {
            return;
        }
        if (registrationCount > 1) {
            targetCallbacks.set(callback, registrationCount - 1);
            return;
        }
        targetCallbacks.delete(callback);
        if (targetCallbacks.size > 0) {
            return;
        }
    }
    callbacks.delete(element);
    if (observer) {
        observer.unobserve(element);
        if (callbacks.size === 0) {
            observer.disconnect();
            observer = null;
        }
    }
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pickDataAttributes",
    ()=>pickDataAttributes,
    "themeDataAttributeName",
    ()=>themeDataAttributeName,
    "themeDataAttributes",
    ()=>themeDataAttributes,
    "themeProps",
    ()=>themeProps
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/naming.js [app-client] (ecmascript)");
;
function themeDataAttributeName(prop) {
    return `data-${prop.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`;
}
function pickDataAttributes(props) {
    const attrs = {};
    for (const [key, value] of Object.entries(props)){
        if (key.startsWith('data-')) {
            attrs[key] = value;
        }
    }
    return attrs;
}
/**
 * Build the stable Astryx target class name for a component.
 *
 * Visual props and runtime states are reflected only as explicit `data-*`
 * attributes. The `astryx-` prefix comes from the centralized naming module
 * (`packages/core/src/naming.ts`) so the namespace lives in one place.
 *
 * <!-- SYNC: packages/core/src/naming.ts (namespace prefix source of truth) -->
 * <!-- SYNC: packages/core/src/utils/parseStyleKey.ts -->
 *
 * @param component - Component name in lowercase (e.g. 'button', 'card')
 * @returns Stable target class
 */ function buildClassName(component) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$naming$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stableClassName"])(component);
}
function themeDataAttributes(props) {
    const attrs = {};
    if (props) {
        for (const [prop, value] of Object.entries(props)){
            if (value == null) {
                continue;
            }
            attrs[themeDataAttributeName(prop)] = String(value);
        }
    }
    return attrs;
}
function themeProps(component, props) {
    return {
        className: buildClassName(component),
        ...themeDataAttributes(props)
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/utils/touchQueries.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file touchQueries.ts
 * @input Nothing: plain strings
 * @output TOUCH_QUERY, the media query for a coarse primary pointer; and
 *   IOS_SUPPORTS_QUERY with isIosWebKit, the iOS WebKit engine check
 * @position The dependency-free half of touchPresentation.ts, for code that
 *   must load without React or the theme: the motion foundation, which
 *   Node-side specs and browser proofs load without a StyleX compile.
 *   touchPresentation.ts re-exports it beside the hook and the parts that
 *   read the theme.
 */ /** The primary pointer is coarse: touch behaviours. */ __turbopack_context__.s([
    "IOS_SUPPORTS_QUERY",
    ()=>IOS_SUPPORTS_QUERY,
    "TOUCH_QUERY",
    ()=>TOUCH_QUERY,
    "isIosWebKit",
    ()=>isIosWebKit
]);
const TOUCH_QUERY = '(pointer: coarse)';
const IOS_SUPPORTS_QUERY = '(-webkit-touch-callout: none)';
function isIosWebKit(view = globalThis) {
    return view?.CSS?.supports?.(IOS_SUPPORTS_QUERY) === true;
}
}),
"[project]/web/node_modules/@astryxdesign/theme-neutral/dist/source.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "neutralIconRegistry",
    ()=>neutralIconRegistry,
    "neutralPalettes",
    ()=>neutralPalettes,
    "neutralTheme",
    ()=>neutralTheme
]);
// src/neutralTheme.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$defineTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/defineTheme.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$syntax$2f$defineSyntaxTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/syntax/defineSyntaxTheme.js [app-client] (ecmascript)");
// src/icons.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-left.mjs [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsLeft$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevrons-left.mjs [app-client] (ecmascript) <export default as ChevronsLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsRight$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevrons-right.mjs [app-client] (ecmascript) <export default as ChevronsRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/circle-check-big.mjs [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$exclamation$2d$point$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/triangle-exclamation-point.mjs [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/calendar.mjs [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/external-link.mjs [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/ellipsis.mjs [app-client] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/upload.mjs [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/arrow-up.mjs [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/arrow-down.mjs [app-client] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/arrow-up-down.mjs [app-client] (ecmascript) <export default as ArrowUpDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/funnel.mjs [app-client] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/eye-off.mjs [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$columns$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Columns$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/columns-2.mjs [app-client] (ecmascript) <export default as Columns>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/copy.mjs [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/check-check.mjs [app-client] (ecmascript) <export default as CheckCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/wrench.mjs [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/square.mjs [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/mic.mjs [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
var iconProps = {
    size: "1em",
    "aria-hidden": true
};
var neutralIconRegistry = {
    close: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
        ...iconProps
    }),
    chevronDown: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
        ...iconProps
    }),
    chevronLeft: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
        ...iconProps
    }),
    chevronRight: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
        ...iconProps
    }),
    chevronsLeft: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsLeft$3e$__["ChevronsLeft"], {
        ...iconProps
    }),
    chevronsRight: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsRight$3e$__["ChevronsRight"], {
        ...iconProps
    }),
    check: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
        ...iconProps
    }),
    success: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
        ...iconProps
    }),
    error: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
        ...iconProps
    }),
    warning: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$exclamation$2d$point$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
        ...iconProps
    }),
    info: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
        ...iconProps
    }),
    calendar: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
        ...iconProps
    }),
    clock: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
        ...iconProps
    }),
    externalLink: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
        ...iconProps
    }),
    menu: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
        ...iconProps
    }),
    moreHorizontal: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
        ...iconProps
    }),
    search: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
        ...iconProps
    }),
    upload: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
        ...iconProps
    }),
    arrowUp: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
        ...iconProps
    }),
    arrowDown: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
        ...iconProps
    }),
    arrowsUpDown: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpDown$3e$__["ArrowUpDown"], {
        ...iconProps
    }),
    funnel: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
        ...iconProps
    }),
    eyeSlash: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
        ...iconProps
    }),
    viewColumns: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$columns$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Columns$3e$__["Columns"], {
        ...iconProps
    }),
    copy: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
        ...iconProps
    }),
    checkDouble: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__["CheckCheck"], {
        ...iconProps
    }),
    wrench: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"], {
        ...iconProps
    }),
    stop: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
        ...iconProps
    }),
    microphone: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
        ...iconProps
    })
};
// src/neutralPaletteRefs.generated.ts
var neutralPaletteRefs = {
    purple: {
        light: {
            25: "#5c0e6c",
            30: "#6b187c",
            70: "#d885eb",
            75: "#e496f6",
            80: "#efa8ff",
            85: "#f3bfff",
            90: "#f7d5ff"
        },
        dark: {
            25: "#4a2f51",
            80: "#eaacf8"
        }
    },
    green: {
        light: {
            25: "#00490b",
            30: "#0b5615",
            45: "#2f7d33",
            65: "#6ab26b",
            75: "#90ca90",
            80: "#a4d6a3"
        },
        dark: {
            25: "#2b422b",
            80: "#aad4a9",
            85: "#bce0bb"
        }
    },
    neutral: {
        light: {
            0: "#000000",
            5: "#111111",
            10: "#1b1b1b",
            30: "#474747",
            35: "#525252",
            45: "#6a6a6a",
            60: "#919191",
            85: "#d4d4d4",
            90: "#e2e2e2",
            95: "#f1f1f1",
            100: "#ffffff"
        },
        dark: {
            0: "#000000",
            5: "#111111",
            10: "#1b1b1b",
            15: "#262626",
            20: "#303030",
            30: "#474747",
            35: "#525252",
            65: "#9e9e9e",
            75: "#b9b9b9",
            80: "#c6c6c6",
            85: "#d4d4d4",
            90: "#e2e2e2",
            95: "#f1f1f1",
            100: "#ffffff"
        }
    },
    orange: {
        light: {
            25: "#622700",
            30: "#733100",
            75: "#ff9e55",
            85: "#ffc7a1"
        },
        dark: {
            25: "#503424",
            65: "#df843f",
            80: "#ffb37e"
        }
    },
    blue: {
        light: {
            25: "#003978",
            30: "#00458c",
            45: "#0067ce",
            50: "#0074e2",
            80: "#a1caff",
            85: "#b9d7ff"
        },
        dark: {
            25: "#253c5a",
            65: "#5aa0f8",
            75: "#88bcff",
            80: "#a1caff"
        }
    },
    red: {
        light: {
            25: "#76000c",
            30: "#8a0011",
            45: "#c0262c",
            55: "#de4745",
            65: "#fa6762",
            80: "#ffaea7",
            85: "#ffc4be"
        },
        dark: {
            25: "#5b2b28",
            75: "#ff9890",
            80: "#ffaea7"
        }
    },
    yellow: {
        light: {
            25: "#4b3900",
            30: "#584400",
            45: "#836700",
            65: "#c29900",
            75: "#e2b623",
            80: "#eec448",
            85: "#f8d36a"
        },
        dark: {
            25: "#453a1c",
            80: "#e3c36c",
            90: "#fae19e"
        }
    },
    teal: {
        light: {
            25: "#00463d",
            30: "#005348",
            80: "#90d7c8",
            85: "#a9e2d6"
        },
        dark: {
            25: "#28413c",
            65: "#4fb1a0",
            75: "#81c9bb"
        }
    },
    cyan: {
        dark: {
            25: "#274046",
            65: "#49adc4",
            75: "#71c7dd",
            80: "#85d5e9",
            85: "#9ae2f4"
        },
        light: {
            25: "#004351"
        }
    },
    pink: {
        light: {
            25: "#70003f",
            70: "#fc78b1",
            85: "#ffc0d7"
        },
        dark: {
            25: "#572b3d",
            75: "#fd92bd",
            80: "#ffa9ca"
        }
    }
};
// src/neutralTheme.ts
var { blue, cyan, green, neutral, orange, pink, purple, red, teal, yellow } = neutralPaletteRefs;
var withAlpha = (color, alpha)=>`${color}${alpha}`;
var neutralSyntax = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$syntax$2f$defineSyntaxTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineSyntaxTheme"])({
    name: "astryx-neutral",
    tokens: {
        keyword: [
            purple.light[30],
            purple.light[80]
        ],
        string: [
            green.light[30],
            green.light[80]
        ],
        comment: [
            neutral.light[35],
            neutral.dark[75]
        ],
        number: [
            orange.light[30],
            orange.dark[80]
        ],
        function: [
            blue.light[30],
            blue.dark[80]
        ],
        type: [
            purple.light[30],
            purple.light[80]
        ],
        variable: [
            neutral.light[5],
            neutral.dark[90]
        ],
        operator: [
            neutral.light[35],
            neutral.dark[75]
        ],
        constant: [
            orange.light[30],
            orange.dark[80]
        ],
        tag: [
            red.light[30],
            red.dark[80]
        ],
        attribute: [
            yellow.light[30],
            yellow.light[80]
        ],
        property: [
            teal.light[30],
            teal.light[80]
        ],
        punctuation: [
            neutral.light[35],
            neutral.dark[75]
        ],
        background: [
            neutral.light[100],
            neutral.dark[5]
        ]
    }
});
var neutralLocalTokens = {
    // Deprecated: kept with its released name, meaning, and value for Neutral
    // extensions (theme:neutral DEC-1); Neutral itself paints status through the
    // portable --color-* roles and no longer reads it.
    "--astryx-theme-neutral-color-status-fill-accent": [
        "#0074e2",
        "#6d9cfe"
    ]
};
var neutralTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$defineTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["defineTheme"])({
    name: "neutral",
    localTokens: neutralLocalTokens,
    // Typography: Figtree across body, heading, and display sizes (display
    // size tokens inherit from heading.family). Monospace stays as the
    // platform default for code.
    // Scale: base=14, ratio=1.2. Bold weights on h3/h4 for subsection hierarchy.
    typography: {
        scale: {
            base: 14,
            ratio: 1.2
        },
        body: {
            family: "Figtree",
            fallbacks: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        },
        heading: {
            family: "Figtree",
            fallbacks: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            weights: {
                3: "bold",
                4: "bold"
            }
        },
        code: {
            family: "ui-monospace",
            fallbacks: '"SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
        }
    },
    // Touch + narrow (Mobile Type, Pin): floor base to the 16px floor and
    // re-derive the ratio so Display 1 keeps its desktop size:
    // ratio' = 1.2 * (14/16)^(1/6) ~= 1.1736. Body 14 -> 16px, display-1 stays 42px.
    adaptations: {
        rules: [
            {
                when: {
                    pointer: "coarse",
                    width: {
                        below: "lg"
                    }
                },
                value: {
                    typography: {
                        scale: {
                            base: 16,
                            ratio: 1.1736
                        }
                    }
                }
            }
        ]
    },
    // Motion: snappier than default to match shadcn/Tailwind conventions.
    // Produces: fast-min=95ms, fast=125ms, fast-max=165ms,
    //           medium-min=225ms, medium=300ms, medium-max=400ms.
    motion: {
        fast: 125,
        medium: 300,
        slow: 700,
        ratio: 0.75
    },
    syntax: neutralSyntax,
    tokens: {
        "--color-background-surface": [
            neutral.light[100],
            neutral.dark[15]
        ],
        "--color-background-body": [
            neutral.light[95],
            neutral.dark[10]
        ],
        "--color-background-card": [
            neutral.light[100],
            neutral.dark[10]
        ],
        "--color-background-popover": [
            neutral.light[100],
            neutral.dark[10]
        ],
        "--color-background-muted": [
            neutral.light[95],
            neutral.dark[10]
        ],
        "--color-accent": [
            neutral.light[10],
            neutral.dark[95]
        ],
        "--color-accent-muted": [
            neutral.light[85],
            neutral.dark[30]
        ],
        "--color-neutral": [
            withAlpha(neutral.light[0], "0F"),
            withAlpha(neutral.dark[100], "1A")
        ],
        // Overlays (modal scrims, hover/pressed tints)
        "--color-overlay": [
            withAlpha(neutral.light[0], "80"),
            withAlpha(neutral.dark[0], "CC")
        ],
        "--color-overlay-hover": [
            withAlpha(neutral.light[0], "0D"),
            withAlpha(neutral.dark[100], "0D")
        ],
        "--color-overlay-pressed": [
            withAlpha(neutral.light[0], "1A"),
            withAlpha(neutral.dark[100], "1A")
        ],
        // Text
        "--color-text-primary": [
            neutral.light[0],
            neutral.dark[100]
        ],
        "--color-text-secondary": [
            neutral.light[30],
            neutral.dark[65]
        ],
        "--color-text-disabled": [
            neutral.light[60],
            neutral.dark[35]
        ],
        "--color-text-accent": [
            neutral.light[10],
            neutral.dark[95]
        ],
        "--color-on-dark": neutral.light[100],
        "--color-on-light": neutral.light[5],
        "--color-on-accent": [
            neutral.light[100],
            neutral.dark[5]
        ],
        "--color-on-success": [
            neutral.light[100],
            neutral.dark[5]
        ],
        "--color-on-error": [
            neutral.light[100],
            neutral.dark[5]
        ],
        "--color-on-warning": neutral.light[5],
        "--color-info": [
            "#0074e2",
            "#6d9cfe"
        ],
        "--color-info-muted": [
            blue.light[85],
            withAlpha(blue.dark[75], "3D")
        ],
        "--color-on-info": [
            neutral.light[100],
            neutral.dark[5]
        ],
        "--color-text-info": [
            blue.light[45],
            blue.dark[80]
        ],
        "--color-text-success": [
            green.light[45],
            green.light[75]
        ],
        "--color-text-warning": [
            yellow.light[45],
            yellow.light[80]
        ],
        "--color-text-error": [
            red.light[45],
            red.dark[80]
        ],
        "--color-on-info-muted": [
            blue.light[25],
            blue.dark[80]
        ],
        "--color-on-success-muted": [
            green.light[25],
            green.light[75]
        ],
        "--color-on-warning-muted": [
            yellow.light[25],
            yellow.light[80]
        ],
        "--color-on-error-muted": [
            red.light[25],
            red.dark[80]
        ],
        // Icon
        "--color-icon-accent": [
            neutral.light[10],
            neutral.dark[95]
        ],
        "--color-icon-primary": [
            neutral.light[0],
            neutral.dark[100]
        ],
        "--color-icon-secondary": [
            neutral.light[45],
            neutral.dark[65]
        ],
        "--color-icon-disabled": [
            neutral.light[60],
            neutral.dark[35]
        ],
        // Strong status fills (architecture:theme-tokens INV11): Neutral's
        // reviewed status-fill colours, with --color-on-<status> above.
        "--color-success": [
            "#198100",
            "#64af4c"
        ],
        "--color-warning": "#ffce2f",
        "--color-error": [
            "#c9303a",
            "#ff705d"
        ],
        "--color-success-muted": [
            green.dark[85],
            withAlpha(green.light[75], "3D")
        ],
        "--color-error-muted": [
            red.light[85],
            withAlpha(red.dark[75], "3D")
        ],
        "--color-warning-muted": [
            yellow.dark[90],
            withAlpha(yellow.light[75], "3D")
        ],
        "--color-border": [
            withAlpha(neutral.light[0], "14"),
            withAlpha(neutral.dark[100], "1A")
        ],
        "--color-border-emphasized": [
            neutral.light[85],
            neutral.dark[35]
        ],
        // Effects
        "--color-skeleton": [
            neutral.light[95],
            neutral.dark[35]
        ],
        "--color-shadow": [
            withAlpha(neutral.light[0], "1A"),
            withAlpha(neutral.dark[0], "4D")
        ],
        "--color-tint-hover": [
            neutral.light[0],
            neutral.dark[100]
        ],
        "--color-background-red": [
            red.light[85],
            red.dark[25]
        ],
        "--color-border-red": [
            red.light[80],
            red.light[65]
        ],
        "--color-icon-red": [
            red.light[25],
            red.dark[75]
        ],
        "--color-text-red": [
            red.light[25],
            red.dark[80]
        ],
        "--color-background-orange": [
            orange.light[85],
            orange.dark[25]
        ],
        "--color-border-orange": [
            orange.light[85],
            orange.dark[65]
        ],
        "--color-icon-orange": [
            orange.light[25],
            orange.light[75]
        ],
        "--color-text-orange": [
            orange.light[25],
            orange.dark[80]
        ],
        "--color-background-yellow": [
            yellow.dark[90],
            yellow.dark[25]
        ],
        "--color-border-yellow": [
            yellow.dark[80],
            yellow.light[65]
        ],
        "--color-icon-yellow": [
            yellow.light[25],
            yellow.light[75]
        ],
        "--color-text-yellow": [
            yellow.light[25],
            yellow.light[80]
        ],
        "--color-background-green": [
            green.dark[85],
            green.dark[25]
        ],
        "--color-border-green": [
            green.dark[80],
            green.light[65]
        ],
        "--color-icon-green": [
            green.light[25],
            green.light[75]
        ],
        "--color-text-green": [
            green.light[25],
            green.light[75]
        ],
        "--color-background-teal": [
            teal.light[85],
            teal.dark[25]
        ],
        "--color-border-teal": [
            teal.light[80],
            teal.dark[65]
        ],
        "--color-icon-teal": [
            teal.light[25],
            teal.dark[75]
        ],
        "--color-text-teal": [
            teal.light[25],
            teal.light[80]
        ],
        "--color-background-cyan": [
            cyan.dark[85],
            cyan.dark[25]
        ],
        "--color-border-cyan": [
            cyan.dark[80],
            cyan.dark[65]
        ],
        "--color-icon-cyan": [
            cyan.light[25],
            cyan.dark[75]
        ],
        "--color-text-cyan": [
            cyan.light[25],
            cyan.dark[80]
        ],
        "--color-background-blue": [
            blue.light[85],
            blue.dark[25]
        ],
        "--color-border-blue": [
            blue.light[80],
            blue.dark[65]
        ],
        "--color-icon-blue": [
            blue.light[25],
            blue.dark[75]
        ],
        "--color-text-blue": [
            blue.light[25],
            blue.dark[80]
        ],
        "--color-background-purple": [
            purple.light[90],
            purple.dark[25]
        ],
        "--color-border-purple": [
            purple.light[85],
            purple.light[70]
        ],
        "--color-icon-purple": [
            purple.light[25],
            purple.light[75]
        ],
        "--color-text-purple": [
            purple.light[25],
            purple.dark[80]
        ],
        "--color-background-pink": [
            pink.light[85],
            pink.dark[25]
        ],
        "--color-border-pink": [
            pink.light[85],
            pink.light[70]
        ],
        "--color-icon-pink": [
            pink.light[25],
            pink.dark[75]
        ],
        "--color-text-pink": [
            pink.light[25],
            pink.dark[80]
        ],
        "--color-background-gray": [
            neutral.light[90],
            neutral.dark[20]
        ],
        "--color-border-gray": [
            neutral.light[85],
            neutral.dark[15]
        ],
        "--color-icon-gray": [
            neutral.light[30],
            neutral.dark[65]
        ],
        "--color-text-gray": [
            neutral.light[10],
            neutral.dark[85]
        ],
        // =========================================================================
        // Radius — slightly larger than default (kept as-is)
        // --radius-none and --radius-full are always fixed and must never be
        // scaled by a theme (see defineTheme's radius config docs) — 0 and
        // 9999px respectively, matching @astryxdesign/core's own defaults.
        // =========================================================================
        "--radius-none": "0px",
        "--radius-inner": "0.375rem",
        "--radius-element": "0.625rem",
        "--radius-container": "0.75rem",
        "--radius-page": "1.75rem",
        "--radius-full": "9999px",
        // =========================================================================
        // Shadows
        //
        // Light mode: matches origin/main exactly (5%/10% low+med, 10%/15% high).
        // Subtle drops; light surfaces don't need rim highlights.
        //
        // Dark mode: deepened drops + an all-around 1px white inset that wraps
        // every edge ("Figma-style bezel"). The inset mimics ambient light
        // catching the surface's rim on every side, giving cards/popovers/modals
        // a substantial "lit from above" feel that drop shadows alone can't
        // achieve against a dark canvas.
        //   low  :  drops 25%/40% + 8%  white all-around inset
        //   med  :  drops 35%/50% + 12% white all-around inset
        //   high :  drops 50%/70% + 15% white all-around inset
        //
        // The inset layer uses light-dark(transparent, ...) so light mode is
        // unaffected — main's exact light values are preserved.
        // =========================================================================
        "--shadow-low": "0 2px 4px light-dark(oklch(0 0 0 / 5%), oklch(0 0 0 / 25%)), 0 4px 8px light-dark(oklch(0 0 0 / 10%), oklch(0 0 0 / 40%)), inset 0 0 0 1px light-dark(transparent, oklch(1 0 0 / 8%))",
        "--shadow-med": "0 2px 4px light-dark(oklch(0 0 0 / 5%), oklch(0 0 0 / 35%)), 0 4px 12px light-dark(oklch(0 0 0 / 10%), oklch(0 0 0 / 50%)), inset 0 0 0 1px light-dark(transparent, oklch(1 0 0 / 12%))",
        "--shadow-high": "0 4px 6px light-dark(oklch(0 0 0 / 10%), oklch(0 0 0 / 50%)), 0 12px 24px light-dark(oklch(0 0 0 / 15%), oklch(0 0 0 / 70%)), inset 0 0 0 1px light-dark(transparent, oklch(1 0 0 / 15%))",
        "--shadow-inset-hover": `inset 0px 0px 0px 2px ${withAlpha(blue.light[50], "4D")}`,
        "--shadow-inset-selected": `inset 0px 0px 0px 2px ${withAlpha(blue.light[50], "80")}`,
        "--shadow-inset-success": `inset 0px 0px 0px 2px ${withAlpha(green.light[45], "4D")}`,
        "--shadow-inset-warning": `inset 0px 0px 0px 2px ${withAlpha(yellow.light[85], "4D")}`,
        "--shadow-inset-error": `inset 0px 0px 0px 2px ${withAlpha(red.light[55], "4D")}`
    },
    components: {
        // In dark mode, secondary text falls under 4.5:1 on the selected fill
        // and under its hover. Selected rows use the next stop that clears both.
        item: {
            selected: {
                "--color-text-secondary": `light-dark(${neutral.light[30]}, ${neutral.dark[80]})`
            }
        },
        "tree-list-item": {
            selected: {
                "--color-text-secondary": `light-dark(${neutral.light[30]}, ${neutral.dark[80]})`
            }
        },
        // A dropzone's hint sits on the same fill while a file is dragged over.
        // That state has no target, so the dropzone takes the lift at rest too.
        "file-input": {
            "mode:dropzone": {
                "--color-text-secondary": `light-dark(${neutral.light[30]}, ${neutral.dark[80]})`
            }
        },
        // A numbered citation is a pill on the same fill.
        citation: {
            "variant:number": {
                "--color-text-secondary": `light-dark(${neutral.light[30]}, ${neutral.dark[80]})`
            }
        },
        button: {
            "variant:destructive": {
                backgroundColor: "var(--color-error-muted)",
                color: "var(--color-on-error-muted)"
            }
        },
        badge: {
            "variant:neutral": {
                backgroundColor: "var(--color-background-gray)",
                color: "var(--color-text-gray)"
            },
            "variant:red": {
                backgroundColor: "var(--color-background-red)",
                color: "var(--color-text-red)"
            },
            "variant:orange": {
                backgroundColor: "var(--color-background-orange)",
                color: "var(--color-text-orange)"
            },
            "variant:yellow": {
                backgroundColor: "var(--color-background-yellow)",
                color: "var(--color-text-yellow)"
            },
            "variant:green": {
                backgroundColor: "var(--color-background-green)",
                color: "var(--color-text-green)"
            },
            "variant:teal": {
                backgroundColor: "var(--color-background-teal)",
                color: "var(--color-text-teal)"
            },
            "variant:cyan": {
                backgroundColor: "var(--color-background-cyan)",
                color: "var(--color-text-cyan)"
            },
            "variant:blue": {
                backgroundColor: "var(--color-background-blue)",
                color: "var(--color-text-blue)"
            },
            "variant:purple": {
                backgroundColor: "var(--color-background-purple)",
                color: "var(--color-text-purple)"
            },
            "variant:pink": {
                backgroundColor: "var(--color-background-pink)",
                color: "var(--color-text-pink)"
            },
            "variant:gray": {
                backgroundColor: "var(--color-background-gray)",
                color: "var(--color-text-gray)"
            }
        },
        // Give the Neutral segmented control a roomier inset without changing its
        // outside height. The selected item stays flat against the tinted track.
        "segmented-control": {
            base: {
                padding: "var(--spacing-1)"
            }
        },
        // An unselected label sits on the translucent track, which lifts the
        // page under it. In dark mode secondary text falls under 4.5:1 on the
        // track over the surface, so it takes the same next stop.
        "segmented-control-item": {
            base: {
                "--color-text-secondary": `light-dark(${neutral.light[30]}, ${neutral.dark[80]})`
            },
            "size:sm": {
                height: "calc(var(--size-element-sm) - 8px)"
            },
            "size:md": {
                height: "calc(var(--size-element-md) - 8px)"
            },
            "size:lg": {
                height: "calc(var(--size-element-lg) - 8px)"
            },
            selected: {
                boxShadow: "none"
            }
        },
        switch: {
            base: {
                "--color-background-gray": "var(--color-border-emphasized)"
            }
        },
        "progress-bar": {
            base: {
                "--color-background-muted": "var(--color-border-emphasized)"
            }
        },
        card: {
            base: {
                padding: "var(--spacing-3)"
            }
        },
        section: {
            base: {
                padding: "var(--spacing-3)"
            }
        }
    },
    icons: neutralIconRegistry
});
// src/neutralPalettes.generated.ts
var black = "#000000";
var white = "#ffffff";
var palette = {
    "neutral": {
        "name": "Neutral",
        "light": {
            "0": "#000000",
            "5": "#111111",
            "10": "#1b1b1b",
            "15": "#262626",
            "20": "#303030",
            "25": "#3b3b3b",
            "30": "#474747",
            "35": "#525252",
            "40": "#5e5e5e",
            "45": "#6a6a6a",
            "50": "#777777",
            "55": "#848484",
            "60": "#919191",
            "65": "#9e9e9e",
            "70": "#ababab",
            "75": "#b9b9b9",
            "80": "#c6c6c6",
            "85": "#d4d4d4",
            "90": "#e2e2e2",
            "95": "#f1f1f1",
            "100": "#ffffff"
        },
        "dark": {
            "0": "#000000",
            "5": "#111111",
            "10": "#1b1b1b",
            "15": "#262626",
            "20": "#303030",
            "25": "#3b3b3b",
            "30": "#474747",
            "35": "#525252",
            "40": "#5e5e5e",
            "45": "#6a6a6a",
            "50": "#777777",
            "55": "#848484",
            "60": "#919191",
            "65": "#9e9e9e",
            "70": "#ababab",
            "75": "#b9b9b9",
            "80": "#c6c6c6",
            "85": "#d4d4d4",
            "90": "#e2e2e2",
            "95": "#f1f1f1",
            "100": "#ffffff"
        }
    },
    "red": {
        "name": "Red",
        "light": {
            "0": "#000000",
            "5": "#2c0000",
            "10": "#3e0002",
            "15": "#500004",
            "20": "#620008",
            "25": "#76000c",
            "30": "#8a0011",
            "35": "#9e0015",
            "40": "#af1320",
            "45": "#c0262c",
            "50": "#cf3738",
            "55": "#de4745",
            "60": "#ed5753",
            "65": "#fa6762",
            "70": "#ff7f77",
            "75": "#ff9890",
            "80": "#ffaea7",
            "85": "#ffc4be",
            "90": "#ffd8d4",
            "95": "#ffece9",
            "100": "#ffffff"
        },
        "dark": {
            "0": "#000000",
            "5": "#200908",
            "10": "#2f1110",
            "15": "#3d1917",
            "20": "#4c221f",
            "25": "#5b2b28",
            "30": "#6b3431",
            "35": "#7e3c38",
            "40": "#92423e",
            "45": "#a84743",
            "50": "#be4e49",
            "55": "#d15752",
            "60": "#e1645e",
            "65": "#ee736c",
            "70": "#fb837b",
            "75": "#ff9890",
            "80": "#ffaea7",
            "85": "#ffc4be",
            "90": "#ffd8d4",
            "95": "#ffece9",
            "100": "#ffffff"
        }
    },
    "orange": {
        "name": "Orange",
        "light": {
            "0": "#000000",
            "5": "#250500",
            "10": "#340d00",
            "15": "#431600",
            "20": "#521f00",
            "25": "#622700",
            "30": "#733100",
            "35": "#833a00",
            "40": "#944400",
            "45": "#a54f00",
            "50": "#b45c00",
            "55": "#c76600",
            "60": "#d97000",
            "65": "#e97e1d",
            "70": "#f58d3a",
            "75": "#ff9e55",
            "80": "#ffb37e",
            "85": "#ffc7a1",
            "90": "#ffdac2",
            "95": "#ffede1",
            "100": "#ffffff"
        },
        "dark": {
            "0": "#000000",
            "5": "#1c0c05",
            "10": "#29160d",
            "15": "#362014",
            "20": "#43291c",
            "25": "#503424",
            "30": "#603d2a",
            "35": "#72462d",
            "40": "#864f2c",
            "45": "#9b5627",
            "50": "#af5f1d",
            "55": "#c2691b",
            "60": "#d1762b",
            "65": "#df843f",
            "70": "#eb9352",
            "75": "#f7a266",
            "80": "#ffb37e",
            "85": "#ffc7a1",
            "90": "#ffdac2",
            "95": "#ffede1",
            "100": "#ffffff"
        }
    },
    "yellow": {
        "name": "Yellow",
        "light": {
            "0": "#000000",
            "5": "#190f00",
            "10": "#251a00",
            "15": "#312400",
            "20": "#3e2e00",
            "25": "#4b3900",
            "30": "#584400",
            "35": "#664f00",
            "40": "#745b00",
            "45": "#836700",
            "50": "#927300",
            "55": "#a17f00",
            "60": "#b18c00",
            "65": "#c29900",
            "70": "#d2a700",
            "75": "#e2b623",
            "80": "#eec448",
            "85": "#f8d36a",
            "90": "#ffe193",
            "95": "#fff0ca",
            "100": "#ffffff"
        },
        "dark": {
            "0": "#000000",
            "5": "#161002",
            "10": "#221b08",
            "15": "#2d250e",
            "20": "#392f15",
            "25": "#453a1c",
            "30": "#524521",
            "35": "#615124",
            "40": "#705c24",
            "45": "#80681f",
            "50": "#907316",
            "55": "#a17f07",
            "60": "#b18c00",
            "65": "#be9921",
            "70": "#cba73d",
            "75": "#d7b554",
            "80": "#e3c36c",
            "85": "#efd284",
            "90": "#fae19e",
            "95": "#fff0c8",
            "100": "#ffffff"
        }
    },
    "green": {
        "name": "Green",
        "light": {
            "0": "#000000",
            "5": "#001800",
            "10": "#002400",
            "15": "#003002",
            "20": "#003d05",
            "25": "#00490b",
            "30": "#0b5615",
            "35": "#17631e",
            "40": "#237028",
            "45": "#2f7d33",
            "50": "#3c8a3f",
            "55": "#4a984c",
            "60": "#59a55b",
            "65": "#6ab26b",
            "70": "#7dbe7e",
            "75": "#90ca90",
            "80": "#a4d6a3",
            "85": "#b7e2b6",
            "90": "#cbeeca",
            "95": "#defadd",
            "100": "#ffffff"
        },
        "dark": {
            "0": "#000000",
            "5": "#091409",
            "10": "#112011",
            "15": "#192b19",
            "20": "#223622",
            "25": "#2b422b",
            "30": "#344e34",
            "35": "#3c5c3c",
            "40": "#436a43",
            "45": "#497849",
            "50": "#508651",
            "55": "#59945a",
            "60": "#65a266",
            "65": "#74af75",
            "70": "#85bb85",
            "75": "#97c897",
            "80": "#aad4a9",
            "85": "#bce0bb",
            "90": "#ceecce",
            "95": "#e1f8e0",
            "100": "#ffffff"
        }
    },
    "teal": {
        "name": "Teal",
        "light": {
            "0": "#000000",
            "5": "#001612",
            "10": "#00221c",
            "15": "#002e27",
            "20": "#003a32",
            "25": "#00463d",
            "30": "#005348",
            "35": "#006154",
            "40": "#006e60",
            "45": "#007c6d",
            "50": "#008b7a",
            "55": "#009986",
            "60": "#01a894",
            "65": "#34b5a1",
            "70": "#56c0ae",
            "75": "#74ccbb",
            "80": "#90d7c8",
            "85": "#a9e2d6",
            "90": "#c1eee4",
            "95": "#d7f9f2",
            "100": "#ffffff"
        },
        "dark": {
            "0": "#000000",
            "5": "#071411",
            "10": "#0f1f1c",
            "15": "#172a26",
            "20": "#1f3531",
            "25": "#28413c",
            "30": "#2f4e48",
            "35": "#325b53",
            "40": "#326a60",
            "45": "#2d796c",
            "50": "#248979",
            "55": "#299786",
            "60": "#39a593",
            "65": "#4fb1a0",
            "70": "#68bdad",
            "75": "#81c9bb",
            "80": "#99d5c8",
            "85": "#b1e0d6",
            "90": "#c6ece3",
            "95": "#dbf8f1",
            "100": "#ffffff"
        }
    },
    "cyan": {
        "name": "Cyan",
        "light": {
            "0": "#000000",
            "5": "#00151b",
            "10": "#002028",
            "15": "#002c35",
            "20": "#003743",
            "25": "#004351",
            "30": "#00505f",
            "35": "#005d6e",
            "40": "#006a7d",
            "45": "#00788d",
            "50": "#00859d",
            "55": "#0093ad",
            "60": "#00a2be",
            "65": "#29afcb",
            "70": "#45bdd7",
            "75": "#5ecae3",
            "80": "#75d7ef",
            "85": "#8ee4f9",
            "90": "#afefff",
            "95": "#d9f7ff",
            "100": "#ffffff"
        },
        "dark": {
            "0": "#000000",
            "5": "#071316",
            "10": "#0f1e22",
            "15": "#17292e",
            "20": "#1f343a",
            "25": "#274046",
            "30": "#2e4c54",
            "35": "#325963",
            "40": "#326774",
            "45": "#2d7586",
            "50": "#228499",
            "55": "#2592a9",
            "60": "#35a0b7",
            "65": "#49adc4",
            "70": "#5dbad1",
            "75": "#71c7dd",
            "80": "#85d5e9",
            "85": "#9ae2f4",
            "90": "#b1eefe",
            "95": "#d9f7ff",
            "100": "#ffffff"
        }
    },
    "blue": {
        "name": "Blue",
        "light": {
            "0": "#000000",
            "5": "#000f30",
            "10": "#001a41",
            "15": "#002452",
            "20": "#002f65",
            "25": "#003978",
            "30": "#00458c",
            "35": "#0050a2",
            "40": "#005cb8",
            "45": "#0067ce",
            "50": "#0074e2",
            "55": "#1e81f0",
            "60": "#348ffd",
            "65": "#529fff",
            "70": "#6eaeff",
            "75": "#88bcff",
            "80": "#a1caff",
            "85": "#b9d7ff",
            "90": "#d0e5ff",
            "95": "#e8f2ff",
            "100": "#ffffff"
        },
        "dark": {
            "0": "#000000",
            "5": "#051121",
            "10": "#0d1c2f",
            "15": "#15263d",
            "20": "#1d314b",
            "25": "#253c5a",
            "30": "#2b486c",
            "35": "#2f5382",
            "40": "#315f99",
            "45": "#346bb1",
            "50": "#3778c7",
            "55": "#3e84dc",
            "60": "#4a92eb",
            "65": "#5aa0f8",
            "70": "#6eaeff",
            "75": "#88bcff",
            "80": "#a1caff",
            "85": "#b9d7ff",
            "90": "#d0e5ff",
            "95": "#e8f2ff",
            "100": "#ffffff"
        }
    },
    "purple": {
        "name": "Purple",
        "light": {
            "0": "#000000",
            "5": "#210028",
            "10": "#31003b",
            "15": "#3f004c",
            "20": "#4e045c",
            "25": "#5c0e6c",
            "30": "#6b187c",
            "35": "#781f8a",
            "40": "#842699",
            "45": "#9130a7",
            "50": "#9f3cb5",
            "55": "#ad4dc3",
            "60": "#bb5fd1",
            "65": "#ca72de",
            "70": "#d885eb",
            "75": "#e496f6",
            "80": "#efa8ff",
            "85": "#f3bfff",
            "90": "#f7d5ff",
            "95": "#fbeaff",
            "100": "#ffffff"
        },
        "dark": {
            "0": "#000000",
            "5": "#180b1b",
            "10": "#251329",
            "15": "#311c36",
            "20": "#3e2544",
            "25": "#4a2f51",
            "30": "#58395f",
            "35": "#674270",
            "40": "#784983",
            "45": "#895196",
            "50": "#9a59a9",
            "55": "#aa63ba",
            "60": "#b870c9",
            "65": "#c57ed5",
            "70": "#d28de2",
            "75": "#de9ced",
            "80": "#eaacf8",
            "85": "#f3bfff",
            "90": "#f7d5ff",
            "95": "#fbeaff",
            "100": "#ffffff"
        }
    },
    "pink": {
        "name": "Pink",
        "light": {
            "0": "#000000",
            "5": "#290013",
            "10": "#3b001e",
            "15": "#4b0028",
            "20": "#5d0034",
            "25": "#70003f",
            "30": "#83004b",
            "35": "#950457",
            "40": "#a61863",
            "45": "#b52970",
            "50": "#c5387c",
            "55": "#d44789",
            "60": "#e25796",
            "65": "#ef67a3",
            "70": "#fc78b1",
            "75": "#ff90bd",
            "80": "#ffa9ca",
            "85": "#ffc0d7",
            "90": "#ffd5e4",
            "95": "#ffeaf1",
            "100": "#ffffff"
        },
        "dark": {
            "0": "#000000",
            "5": "#1e0912",
            "10": "#2d111d",
            "15": "#3b1927",
            "20": "#492132",
            "25": "#572b3d",
            "30": "#663449",
            "35": "#783b55",
            "40": "#8c4161",
            "45": "#a1476e",
            "50": "#b54e7b",
            "55": "#c85688",
            "60": "#d76395",
            "65": "#e572a3",
            "70": "#f181b0",
            "75": "#fd92bd",
            "80": "#ffa9ca",
            "85": "#ffc0d7",
            "90": "#ffd5e4",
            "95": "#ffeaf1",
            "100": "#ffffff"
        }
    }
};
// src/neutralPalettes.ts
var neutralPalettes = {
    black,
    white,
    ...palette
};
;
}),
"[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "attrs",
    ()=>attrs,
    "create",
    ()=>create,
    "createTheme",
    ()=>createTheme,
    "defaultMarker",
    ()=>defaultMarker,
    "defineConsts",
    ()=>defineConsts,
    "defineMarker",
    ()=>defineMarker,
    "defineVars",
    ()=>defineVars,
    "env",
    ()=>env,
    "firstThatWorks",
    ()=>firstThatWorks,
    "keyframes",
    ()=>keyframes,
    "legacyMerge",
    ()=>legacyMerge,
    "positionTry",
    ()=>positionTry,
    "props",
    ()=>props,
    "types",
    ()=>types,
    "unstable_conditional",
    ()=>unstable_conditional,
    "unstable_createThemeNested",
    ()=>unstable_createThemeNested,
    "unstable_defineConstsNested",
    ()=>unstable_defineConstsNested,
    "unstable_defineVarsNested",
    ()=>unstable_defineVarsNested,
    "viewTransitionClass",
    ()=>viewTransitionClass,
    "when",
    ()=>when
]);
var styleq = {};
var hasRequiredStyleq;
function requireStyleq() {
    if (hasRequiredStyleq) return styleq;
    hasRequiredStyleq = 1;
    Object.defineProperty(styleq, "__esModule", {
        value: true
    });
    styleq.styleq = void 0;
    var cache = new WeakMap();
    var compiledKey = '$$css';
    function createStyleq(options) {
        var disableCache;
        var disableMix;
        var transform;
        if (options != null) {
            disableCache = options.disableCache === true;
            disableMix = options.disableMix === true;
            transform = options.transform;
        }
        return function styleq() {
            var definedProperties = [];
            var className = '';
            var inlineStyle = null;
            var debugString = '';
            var nextCache = disableCache ? null : cache;
            var styles = new Array(arguments.length);
            for(var i = 0; i < arguments.length; i++){
                styles[i] = arguments[i];
            }
            while(styles.length > 0){
                var possibleStyle = styles.pop();
                if (possibleStyle == null || possibleStyle === false) {
                    continue;
                }
                if (Array.isArray(possibleStyle)) {
                    for(var _i = 0; _i < possibleStyle.length; _i++){
                        styles.push(possibleStyle[_i]);
                    }
                    continue;
                }
                var style = transform != null ? transform(possibleStyle) : possibleStyle;
                if (style.$$css != null) {
                    var classNameChunk = '';
                    if (nextCache != null && nextCache.has(style)) {
                        var cacheEntry = nextCache.get(style);
                        if (cacheEntry != null) {
                            classNameChunk = cacheEntry[0];
                            debugString = cacheEntry[2];
                            definedProperties.push.apply(definedProperties, cacheEntry[1]);
                            nextCache = cacheEntry[3];
                        }
                    } else {
                        var definedPropertiesChunk = [];
                        for(var prop in style){
                            var value = style[prop];
                            if (prop === compiledKey) {
                                var compiledKeyValue = style[prop];
                                if (compiledKeyValue !== true) {
                                    debugString = debugString ? compiledKeyValue + '; ' + debugString : compiledKeyValue;
                                }
                                continue;
                            }
                            if (typeof value === 'string' || value === null) {
                                if (!definedProperties.includes(prop)) {
                                    definedProperties.push(prop);
                                    if (nextCache != null) {
                                        definedPropertiesChunk.push(prop);
                                    }
                                    if (typeof value === 'string') {
                                        classNameChunk += classNameChunk ? ' ' + value : value;
                                    }
                                }
                            } else {
                                console.error("styleq: ".concat(prop, " typeof ").concat(String(value), " is not \"string\" or \"null\"."));
                            }
                        }
                        if (nextCache != null) {
                            var weakMap = new WeakMap();
                            nextCache.set(style, [
                                classNameChunk,
                                definedPropertiesChunk,
                                debugString,
                                weakMap
                            ]);
                            nextCache = weakMap;
                        }
                    }
                    if (classNameChunk) {
                        className = className ? classNameChunk + ' ' + className : classNameChunk;
                    }
                } else {
                    if (disableMix) {
                        if (inlineStyle == null) {
                            inlineStyle = {};
                        }
                        inlineStyle = Object.assign({}, style, inlineStyle);
                    } else {
                        var subStyle = null;
                        for(var _prop in style){
                            var _value = style[_prop];
                            if (_value !== undefined) {
                                if (!definedProperties.includes(_prop)) {
                                    if (_value != null) {
                                        if (inlineStyle == null) {
                                            inlineStyle = {};
                                        }
                                        if (subStyle == null) {
                                            subStyle = {};
                                        }
                                        subStyle[_prop] = _value;
                                    }
                                    definedProperties.push(_prop);
                                    nextCache = null;
                                }
                            }
                        }
                        if (subStyle != null) {
                            inlineStyle = Object.assign(subStyle, inlineStyle);
                        }
                    }
                }
            }
            var styleProps = [
                className,
                inlineStyle,
                debugString
            ];
            return styleProps;
        };
    }
    var styleq$1 = styleq.styleq = createStyleq();
    styleq$1.factory = createStyleq;
    return styleq;
}
var styleqExports = /*@__PURE__*/ requireStyleq();
const errorForFn = (name)=>new Error(`Unexpected 'stylex.${name}' call at runtime. Styles must be compiled by '@stylexjs/babel-plugin'.`);
const errorForType = (key)=>errorForFn(`types.${key}`);
const create = function stylexCreate(_styles) {
    throw errorForFn('create');
};
const createTheme = (_baseTokens, _overrides)=>{
    throw errorForFn('createTheme');
};
const defineConsts = function stylexDefineConsts(_styles) {
    throw errorForFn('defineConsts');
};
const defineVars = function stylexDefineVars(_styles) {
    throw errorForFn('defineVars');
};
const unstable_conditional = function stylexConditional(_value) {
    throw errorForFn('unstable_conditional');
};
const unstable_defineVarsNested = function stylexDefineVarsNested(_styles) {
    throw errorForFn('unstable_defineVarsNested');
};
const unstable_defineConstsNested = function stylexDefineConstsNested(_styles) {
    throw errorForFn('unstable_defineConstsNested');
};
const unstable_createThemeNested = (_baseTokens, _overrides)=>{
    throw errorForFn('unstable_createThemeNested');
};
const defineMarker = ()=>{
    throw errorForFn('defineMarker');
};
const firstThatWorks = (..._styles)=>{
    throw errorForFn('firstThatWorks');
};
const keyframes = (_keyframes)=>{
    throw errorForFn('keyframes');
};
const positionTry = (_positionTry)=>{
    throw errorForFn('positionTry');
};
function props(...styles) {
    const [className, style, dataStyleSrc] = styleqExports.styleq(styles);
    const result = {};
    if (className != null && className !== '') {
        result.className = className;
    }
    if (style != null && Object.keys(style).length > 0) {
        result.style = style;
    }
    if (dataStyleSrc != null && dataStyleSrc !== '') {
        result['data-style-src'] = dataStyleSrc;
    }
    return result;
}
const toKebabCase = (str)=>str.replace(/([A-Z])/g, '-$1').toLowerCase();
function attrs(...styles) {
    const { className, style, 'data-style-src': dataStyleSrc } = props.apply(this, styles);
    const result = {};
    if (className != null) {
        result.class = className;
    }
    if (style != null) {
        result.style = Object.entries(style).map(([key, value])=>{
            if (key.startsWith('--')) {
                return `${key}:${value}`;
            }
            return `${toKebabCase(key)}:${value}`;
        }).join(';');
    }
    if (dataStyleSrc != null) {
        result['data-style-src'] = dataStyleSrc;
    }
    return result;
}
const viewTransitionClass = (_viewTransitionClass)=>{
    throw errorForFn('viewTransitionClass');
};
const defaultMarker = ()=>{
    throw errorForFn('defaultMarker');
};
const when = {
    ancestor: (_p)=>{
        throw errorForFn('when.ancestor');
    },
    descendant: (_p)=>{
        throw errorForFn('when.descendant');
    },
    siblingBefore: (_p)=>{
        throw errorForFn('when.siblingBefore');
    },
    siblingAfter: (_p)=>{
        throw errorForFn('when.siblingAfter');
    },
    anySibling: (_p)=>{
        throw errorForFn('when.anySibling');
    }
};
const env = Object.freeze({});
const types = {
    angle: (_v)=>{
        throw errorForType('angle');
    },
    color: (_v)=>{
        throw errorForType('color');
    },
    url: (_v)=>{
        throw errorForType('url');
    },
    image: (_v)=>{
        throw errorForType('image');
    },
    integer: (_v)=>{
        throw errorForType('integer');
    },
    lengthPercentage: (_v)=>{
        throw errorForType('lengthPercentage');
    },
    length: (_v)=>{
        throw errorForType('length');
    },
    percentage: (_v)=>{
        throw errorForType('percentage');
    },
    number: (_v)=>{
        throw errorForType('number');
    },
    resolution: (_v)=>{
        throw errorForType('resolution');
    },
    time: (_v)=>{
        throw errorForType('time');
    },
    transformFunction: (_v)=>{
        throw errorForType('transformFunction');
    },
    transformList: (_v)=>{
        throw errorForType('transformList');
    }
};
const legacyMerge = /*@__PURE__*/ function() {
    function _legacyMerge(...styles) {
        const [className] = styleqExports.styleq(styles);
        return className;
    }
    _legacyMerge.create = create;
    _legacyMerge.createTheme = createTheme;
    _legacyMerge.defineConsts = defineConsts;
    _legacyMerge.defineMarker = defineMarker;
    _legacyMerge.defineVars = defineVars;
    _legacyMerge.defaultMarker = defaultMarker;
    _legacyMerge.firstThatWorks = firstThatWorks;
    _legacyMerge.keyframes = keyframes;
    _legacyMerge.positionTry = positionTry;
    _legacyMerge.props = props;
    _legacyMerge.attrs = attrs;
    _legacyMerge.types = types;
    _legacyMerge.when = when;
    _legacyMerge.viewTransitionClass = viewTransitionClass;
    _legacyMerge.env = env;
    _legacyMerge.unstable_conditional = unstable_conditional;
    _legacyMerge.unstable_defineVarsNested = unstable_defineVarsNested;
    _legacyMerge.unstable_defineConstsNested = unstable_defineConstsNested;
    _legacyMerge.unstable_createThemeNested = unstable_createThemeNested;
    return _legacyMerge;
}();
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/Icon.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Icon
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$mergeClasses$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$build$2f$buildLucideIconForReact$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$hasA11yProp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$context$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/context.mjs [app-client] (ecmascript)");
"use strict";
"use client";
;
;
;
;
;
const Icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ color, size, width, height, strokeWidth, absoluteStrokeWidth, nonScalingStroke, className = "", children, iconNode = [], icon = {
    node: iconNode,
    aliases: [],
    size: 24
}, ...rest }, ref)=>{
    const { size: contextSize = 24, strokeWidth: contextStrokeWidth = 2, absoluteStrokeWidth: contextAbsoluteStrokeWidth = false, nonScalingStroke: contextNonScalingStroke = false, color: contextColor = "currentColor", className: contextClass = "" } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$context$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLucideContext"])() ?? {};
    const hasAccessibleProp = Boolean(children) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$hasA11yProp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasA11yProp"])(rest);
    const [name, svgAttributes, builtIconNode = []] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$build$2f$buildLucideIconForReact$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(icon, {
        color: color ?? contextColor,
        width: width ?? size ?? contextSize,
        height: height ?? size ?? contextSize,
        strokeWidth: strokeWidth ?? contextStrokeWidth,
        absoluteStrokeWidth: absoluteStrokeWidth ?? contextAbsoluteStrokeWidth,
        nonScalingStroke: nonScalingStroke ?? contextNonScalingStroke,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$mergeClasses$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClasses"])(contextClass, className),
        hasA11yProp: hasAccessibleProp,
        attributes: rest
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(name, {
        ref,
        ...svgAttributes
    }, [
        ...builtIconNode.map(([tag, attrs])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]);
});
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/context.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LucideProvider",
    ()=>LucideProvider,
    "useLucideContext",
    ()=>useLucideContext
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use strict";
"use client";
;
const LucideContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({});
function LucideProvider({ children, size, color, strokeWidth, absoluteStrokeWidth, nonScalingStroke, className }) {
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LucideProvider.useMemo[value]": ()=>({
                size,
                color,
                strokeWidth,
                absoluteStrokeWidth,
                nonScalingStroke,
                className
            })
    }["LucideProvider.useMemo[value]"], [
        size,
        color,
        strokeWidth,
        absoluteStrokeWidth,
        nonScalingStroke,
        className
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(LucideContext.Provider, {
        value
    }, children);
}
const useLucideContext = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LucideContext);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>createLucideIcon
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$toLucideIconData$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$toPascalCase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/Icon.mjs [app-client] (ecmascript)");
;
;
;
;
function createLucideIcon(iconDataOrName, iconNode = [], aliases = []) {
    const iconData = typeof iconDataOrName === "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$toLucideIconData$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toLucideIconData"])(iconDataOrName, iconNode, aliases) : iconDataOrName;
    const Component = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            ref,
            icon: iconData,
            className,
            ...props
        }));
    if (iconData.name) {
        Component.displayName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$toPascalCase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toPascalCase"])(iconData.name);
    }
    return Component;
}
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/arrow-down.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>ArrowDown
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "arrow-down",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 5v14",
                key: "s699le"
            }
        ],
        [
            "path",
            {
                d: "m19 12-7 7-7-7",
                key: "1idqje"
            }
        ]
    ]
};
__iconData.node;
const ArrowDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/arrow-down.mjs [app-client] (ecmascript) <export default as ArrowDown>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowDown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/arrow-down.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/arrow-up-down.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>ArrowUpDown
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "arrow-up-down",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m21 16-4 4-4-4",
                key: "f6ql7i"
            }
        ],
        [
            "path",
            {
                d: "M17 20V4",
                key: "1ejh1v"
            }
        ],
        [
            "path",
            {
                d: "m3 8 4-4 4 4",
                key: "11wl7u"
            }
        ],
        [
            "path",
            {
                d: "M7 4v16",
                key: "1glfcx"
            }
        ]
    ]
};
__iconData.node;
const ArrowUpDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/arrow-up-down.mjs [app-client] (ecmascript) <export default as ArrowUpDown>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowUpDown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/arrow-up-down.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/arrow-up.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>ArrowUp
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "arrow-up",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m5 12 7-7 7 7",
                key: "hav0vg"
            }
        ],
        [
            "path",
            {
                d: "M12 19V5",
                key: "x0mq9r"
            }
        ]
    ]
};
__iconData.node;
const ArrowUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/arrow-up.mjs [app-client] (ecmascript) <export default as ArrowUp>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/arrow-up.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/calendar.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Calendar
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "calendar",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M8 2v3",
                key: "1ioesn"
            }
        ],
        [
            "path",
            {
                d: "M16 2v3",
                key: "otl347"
            }
        ],
        [
            "rect",
            {
                x: "3",
                y: "3",
                width: "18",
                height: "18",
                rx: "2",
                key: "h1oib"
            }
        ],
        [
            "path",
            {
                d: "M3 9h18",
                key: "1pudct"
            }
        ]
    ]
};
__iconData.node;
const Calendar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/calendar.mjs [app-client] (ecmascript) <export default as Calendar>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Calendar",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/calendar.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/check-check.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>CheckCheck
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "check-check",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M18 6 7 17l-5-5",
                key: "116fxf"
            }
        ],
        [
            "path",
            {
                d: "m22 10-7.5 7.5L13 16",
                key: "ke71qq"
            }
        ]
    ]
};
__iconData.node;
const CheckCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/check-check.mjs [app-client] (ecmascript) <export default as CheckCheck>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckCheck",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/check-check.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Check
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "check",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M20 6 9 17l-5-5",
                key: "1gmf2c"
            }
        ]
    ]
};
__iconData.node;
const Check = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript) <export default as Check>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Check",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/check.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>ChevronDown
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "chevron-down",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m6 9 6 6 6-6",
                key: "qrunsl"
            }
        ]
    ]
};
__iconData.node;
const ChevronDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript) <export default as ChevronDown>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronDown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-left.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>ChevronLeft
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "chevron-left",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m15 18-6-6 6-6",
                key: "1wnfg3"
            }
        ]
    ]
};
__iconData.node;
const ChevronLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-left.mjs [app-client] (ecmascript) <export default as ChevronLeft>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-left.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>ChevronRight
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "chevron-right",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m9 18 6-6-6-6",
                key: "mthhwq"
            }
        ]
    ]
};
__iconData.node;
const ChevronRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/chevrons-left.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>ChevronsLeft
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "chevrons-left",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m11 17-5-5 5-5",
                key: "13zhaf"
            }
        ],
        [
            "path",
            {
                d: "m18 17-5-5 5-5",
                key: "h8a8et"
            }
        ]
    ]
};
__iconData.node;
const ChevronsLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/chevrons-left.mjs [app-client] (ecmascript) <export default as ChevronsLeft>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronsLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevrons-left.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/chevrons-right.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>ChevronsRight
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "chevrons-right",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m6 17 5-5-5-5",
                key: "xnjwq"
            }
        ],
        [
            "path",
            {
                d: "m13 17 5-5-5-5",
                key: "17xmmf"
            }
        ]
    ]
};
__iconData.node;
const ChevronsRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/chevrons-right.mjs [app-client] (ecmascript) <export default as ChevronsRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronsRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/chevrons-right.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/circle-check-big.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>CircleCheckBig
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "circle-check-big",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M21.801 10A10 10 0 1 1 17 3.335",
                key: "yps3ct"
            }
        ],
        [
            "path",
            {
                d: "m9 11 3 3L22 4",
                key: "1pflzl"
            }
        ]
    ],
    aliases: [
        "check-circle"
    ]
};
__iconData.node;
const CircleCheckBig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/circle-check-big.mjs [app-client] (ecmascript) <export default as CheckCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/circle-check-big.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>CircleX
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "circle-x",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "10",
                key: "1mglay"
            }
        ],
        [
            "path",
            {
                d: "m15 9-6 6",
                key: "1uzhvr"
            }
        ],
        [
            "path",
            {
                d: "m9 9 6 6",
                key: "z0biqf"
            }
        ]
    ],
    aliases: [
        "x-circle"
    ]
};
__iconData.node;
const CircleX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-client] (ecmascript) <export default as XCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "XCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Clock
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "clock",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "10",
                key: "1mglay"
            }
        ],
        [
            "path",
            {
                d: "M12 6v6l4 2",
                key: "mmk7yg"
            }
        ]
    ]
};
__iconData.node;
const Clock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Clock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/columns-2.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Columns2
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "columns-2",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "18",
                height: "18",
                x: "3",
                y: "3",
                rx: "2",
                key: "afitv7"
            }
        ],
        [
            "path",
            {
                d: "M12 3v18",
                key: "108xh3"
            }
        ]
    ],
    aliases: [
        "columns"
    ]
};
__iconData.node;
const Columns2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/columns-2.mjs [app-client] (ecmascript) <export default as Columns>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Columns",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$columns$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$columns$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/columns-2.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/copy.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Copy
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "copy",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "14",
                height: "14",
                x: "8",
                y: "8",
                rx: "2",
                ry: "2",
                key: "17jyea"
            }
        ],
        [
            "path",
            {
                d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
                key: "zix9uf"
            }
        ]
    ]
};
__iconData.node;
const Copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/copy.mjs [app-client] (ecmascript) <export default as Copy>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Copy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/copy.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/ellipsis.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Ellipsis
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "ellipsis",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "1",
                key: "41hilf"
            }
        ],
        [
            "circle",
            {
                cx: "19",
                cy: "12",
                r: "1",
                key: "1wjl8i"
            }
        ],
        [
            "circle",
            {
                cx: "5",
                cy: "12",
                r: "1",
                key: "1pcz8c"
            }
        ]
    ],
    aliases: [
        "more-horizontal"
    ]
};
__iconData.node;
const Ellipsis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/ellipsis.mjs [app-client] (ecmascript) <export default as MoreHorizontal>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MoreHorizontal",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/ellipsis.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/external-link.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>ExternalLink
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "external-link",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M15 3h6v6",
                key: "1q9fwt"
            }
        ],
        [
            "path",
            {
                d: "M10 14 21 3",
                key: "gplh6r"
            }
        ],
        [
            "path",
            {
                d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
                key: "a6xqqp"
            }
        ]
    ]
};
__iconData.node;
const ExternalLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/external-link.mjs [app-client] (ecmascript) <export default as ExternalLink>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExternalLink",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/external-link.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/eye-off.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>EyeOff
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "eye-off",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
                key: "ct8e1f"
            }
        ],
        [
            "path",
            {
                d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
                key: "151rxh"
            }
        ],
        [
            "path",
            {
                d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
                key: "13bj9a"
            }
        ],
        [
            "path",
            {
                d: "m2 2 20 20",
                key: "1ooewy"
            }
        ]
    ]
};
__iconData.node;
const EyeOff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/eye-off.mjs [app-client] (ecmascript) <export default as EyeOff>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EyeOff",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/eye-off.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/funnel.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Funnel
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "funnel",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
                key: "sc7q7i"
            }
        ]
    ],
    aliases: [
        "filter"
    ]
};
__iconData.node;
const Funnel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/funnel.mjs [app-client] (ecmascript) <export default as Filter>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Filter",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/funnel.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Info
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "info",
    size: 24,
    node: [
        [
            "circle",
            {
                cx: "12",
                cy: "12",
                r: "10",
                key: "1mglay"
            }
        ],
        [
            "path",
            {
                d: "M12 16v-4",
                key: "1dtifu"
            }
        ],
        [
            "path",
            {
                d: "M12 8h.01",
                key: "e9boi3"
            }
        ]
    ]
};
__iconData.node;
const Info = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript) <export default as Info>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Info",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Menu
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "menu",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M4 5h16",
                key: "1tepv9"
            }
        ],
        [
            "path",
            {
                d: "M4 12h16",
                key: "1lakjw"
            }
        ],
        [
            "path",
            {
                d: "M4 19h16",
                key: "1djgab"
            }
        ]
    ]
};
__iconData.node;
const Menu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-client] (ecmascript) <export default as Menu>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Menu",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/mic.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Mic
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "mic",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 19v3",
                key: "npa21l"
            }
        ],
        [
            "path",
            {
                d: "M19 10v2a7 7 0 0 1-14 0v-2",
                key: "1vc78b"
            }
        ],
        [
            "rect",
            {
                x: "9",
                y: "2",
                width: "6",
                height: "13",
                rx: "3",
                key: "s6n7sd"
            }
        ]
    ]
};
__iconData.node;
const Mic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/mic.mjs [app-client] (ecmascript) <export default as Mic>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Mic",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/mic.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Search
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "search",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m21 21-4.34-4.34",
                key: "14j7rj"
            }
        ],
        [
            "circle",
            {
                cx: "11",
                cy: "11",
                r: "8",
                key: "4ej97u"
            }
        ]
    ]
};
__iconData.node;
const Search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Search",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/square.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Square
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "square",
    size: 24,
    node: [
        [
            "rect",
            {
                width: "18",
                height: "18",
                x: "3",
                y: "3",
                rx: "2",
                key: "afitv7"
            }
        ]
    ]
};
__iconData.node;
const Square = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/square.mjs [app-client] (ecmascript) <export default as Square>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Square",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/square.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/triangle-exclamation-point.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>TriangleExclamationPoint
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "triangle-exclamation-point",
    size: 24,
    node: [
        [
            "path",
            {
                d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
                key: "wmoenq"
            }
        ],
        [
            "path",
            {
                d: "M12 9v4",
                key: "juzpu7"
            }
        ],
        [
            "path",
            {
                d: "M12 17h.01",
                key: "p32p05"
            }
        ]
    ],
    aliases: [
        "alert-triangle",
        "triangle-alert"
    ]
};
__iconData.node;
const TriangleExclamationPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/triangle-exclamation-point.mjs [app-client] (ecmascript) <export default as AlertTriangle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertTriangle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$exclamation$2d$point$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$exclamation$2d$point$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/triangle-exclamation-point.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/upload.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Upload
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "upload",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M12 3v12",
                key: "1x0j5s"
            }
        ],
        [
            "path",
            {
                d: "m17 8-5-5-5 5",
                key: "7q97r8"
            }
        ],
        [
            "path",
            {
                d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
                key: "ih7n3h"
            }
        ]
    ]
};
__iconData.node;
const Upload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/upload.mjs [app-client] (ecmascript) <export default as Upload>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Upload",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/upload.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/wrench.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>Wrench
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "wrench",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
                key: "1ngwbx"
            }
        ]
    ]
};
__iconData.node;
const Wrench = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/wrench.mjs [app-client] (ecmascript) <export default as Wrench>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Wrench",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/wrench.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconData",
    ()=>__iconData,
    "default",
    ()=>X
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/createLucideIcon.mjs [app-client] (ecmascript)");
;
const __iconData = {
    name: "x",
    size: 24,
    node: [
        [
            "path",
            {
                d: "M18 6 6 18",
                key: "1bl5f8"
            }
        ],
        [
            "path",
            {
                d: "m6 6 12 12",
                key: "d8bk6v"
            }
        ]
    ]
};
__iconData.node;
const X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(__iconData);
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "X",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript)");
}),
"[project]/web/node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>buildLucideIconForReact
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$build$2f$buildLucideIconNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs [app-client] (ecmascript)");
;
function buildLucideIconForReact(icon, params = {}) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$build$2f$buildLucideIconNode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(icon, {
        ...params,
        attributeNames: {
            ...params.attributeNames,
            class: "className",
            "stroke-width": "strokeWidth",
            "stroke-linecap": "strokeLinecap",
            "stroke-linejoin": "strokeLinejoin",
            "vector-effect": "vectorEffect"
        }
    });
}
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>buildLucideIconNode
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$build$2f$defaultAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/shared/src/build/defaultAttributes.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$mergeClasses$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs [app-client] (ecmascript)");
;
;
function isDefined(value) {
    return value !== null && value !== void 0;
}
function buildLucideIconNode(icon, params = {}) {
    const attributeNames = params.attributeNames ?? {};
    const getAttributeName = (attributeName)=>attributeNames[attributeName] ?? attributeName;
    const viewBoxWidth = icon.size ?? icon.width ?? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$build$2f$defaultAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]["width"];
    const viewBoxHeight = icon.size ?? icon.height ?? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$build$2f$defaultAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]["height"];
    const aliasClassNames = icon.aliases?.filter((alias)=>typeof alias === "string" && alias.trim() !== "").map((alias)=>`lucide-${alias}`) ?? [];
    const iconClassNames = [
        ...icon.name ? [
            `lucide-${icon.name}`
        ] : [],
        ...aliasClassNames
    ];
    const classNamesFromClassName = params.className?.split(" ").filter(Boolean) ?? [];
    const className = params.includeDefaultClasses === false ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$mergeClasses$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClasses"])(...classNamesFromClassName) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$mergeClasses$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClasses"])("lucide", ...iconClassNames, ...classNamesFromClassName);
    const calculatedStrokeWidth = params.absoluteStrokeWidth ? Number(params.strokeWidth ?? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$build$2f$defaultAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]["stroke-width"]) * Number(icon.size ?? icon.width ?? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$build$2f$defaultAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]["width"]) / Number(params.size ?? params.width ?? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$build$2f$defaultAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]["width"]) : params.strokeWidth ?? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$build$2f$defaultAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]["stroke-width"];
    const attributes = {
        ...Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$build$2f$defaultAttributes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]).reduce((attrs, [attrName, value])=>{
            attrs[getAttributeName(attrName)] = value;
            return attrs;
        }, {}),
        ..."color" in params && params.color && {
            [getAttributeName("stroke")]: params.color
        },
        ..."size" in params && isDefined(params.size) && {
            [getAttributeName("width")]: params.size,
            [getAttributeName("height")]: params.size
        },
        ..."width" in params && isDefined(params.width) && {
            [getAttributeName("width")]: params.width
        },
        ..."height" in params && isDefined(params.height) && {
            [getAttributeName("height")]: params.height
        },
        [getAttributeName("stroke-width")]: calculatedStrokeWidth,
        ...className && {
            [getAttributeName("class")]: className
        },
        [getAttributeName("viewBox")]: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
        ...params.hasA11yProp === false ? {
            [getAttributeName("aria-hidden")]: "true"
        } : {},
        ..."attributes" in params && params.attributes
    };
    return [
        "svg",
        attributes,
        icon.node.map((child)=>{
            const [name, attrs, children] = child;
            const nextAttrs = params.nonScalingStroke ? {
                [getAttributeName("vector-effect")]: "non-scaling-stroke",
                ...attrs
            } : attrs;
            return children ? [
                name,
                nextAttrs,
                children
            ] : [
                name,
                nextAttrs
            ];
        })
    ];
}
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/shared/src/build/defaultAttributes.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>defaultAttributes
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
};
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasA11yProp",
    ()=>hasA11yProp
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const hasA11yProp = (props)=>{
    for(const prop in props){
        if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
            return true;
        }
    }
    return false;
};
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mergeClasses",
    ()=>mergeClasses
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toCamelCase",
    ()=>toCamelCase
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const toCamelCase = (string)=>{
    let out = "";
    let upperNext = false;
    for (const ch of string){
        if (ch === "-" || ch === "_" || ch <= " ") {
            upperNext = out.length > 0;
            continue;
        }
        if (out.length === 0) {
            out += ch.toLowerCase();
        } else {
            out += upperNext ? ch.toUpperCase() : ch;
        }
        upperNext = false;
    }
    return out;
};
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toKebabCase",
    ()=>toKebabCase
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const toKebabCase = (string)=>string?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toLucideIconData",
    ()=>toLucideIconData
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$toKebabCase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs [app-client] (ecmascript)");
;
function toLucideIconData(iconName, iconNode, aliases = []) {
    if (iconNode == null) {
        throw new Error("[lucide]: iconNode is required when icon name is used");
    }
    return {
        name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$toKebabCase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toKebabCase"])(iconName),
        size: 24,
        node: iconNode,
        ...aliases.length > 0 ? {
            aliases
        } : {}
    };
}
;
}),
"[project]/web/node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toPascalCase",
    ()=>toPascalCase
]);
/**
 * @license lucide-react v1.73.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$toCamelCase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs [app-client] (ecmascript)");
;
const toPascalCase = (string)=>{
    const camelCase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2f$toCamelCase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toCamelCase"])(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
;
}),
"[project]/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * A React component that extends the HTML `<a>` element to provide
 * [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation. This is the primary way to navigate between routes in Next.js.
 *
 * @remarks
 * - Prefetching is only enabled in production.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */ default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/web/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _formaturl = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _usemergedref = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)");
const _routerreducertypes = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/components/router-reducer/router-reducer-types.js [app-client] (ecmascript)");
const _links = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)");
const _types = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)");
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, href, linkInstanceRef, replace, scroll, onNavigate, transitionTypes, prefetchIntent = 'none') {
    if (typeof window !== 'undefined') {
        const { nodeName } = e.currentTarget;
        // anchors inside an svg have a lowercase nodeName
        const isAnchorNodeName = nodeName.toUpperCase() === 'A';
        if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute('download')) {
            // ignore click for browser’s default behavior
            return;
        }
        if (!(0, _islocalurl.isLocalURL)(href)) {
            if (replace) {
                // browser default behavior does not replace the history state
                // so we need to do it manually
                e.preventDefault();
                location.replace(href);
            }
            // ignore click for browser’s default behavior
            return;
        }
        e.preventDefault();
        if (onNavigate) {
            let isDefaultPrevented = false;
            onNavigate({
                preventDefault: ()=>{
                    isDefaultPrevented = true;
                }
            });
            if (isDefaultPrevented) {
                return;
            }
        }
        const { navigate } = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/components/navigator.js [app-client] (ecmascript)");
        navigate(href, replace ? 'replace' : 'push', scroll === false ? _routerreducertypes.ScrollBehavior.NoScroll : _routerreducertypes.ScrollBehavior.Default, linkInstanceRef.current, transitionTypes, prefetchIntent);
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
function LinkComponent(props) {
    const [linkStatus, setOptimisticLinkStatus] = (0, _react.useOptimistic)(_links.IDLE_LINK_STATUS);
    let children;
    const linkInstanceRef = (0, _react.useRef)(null);
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, onNavigate, transitionTypes, ref: forwardedRef, unstable_dynamicOnHover, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    const prefetchIntent = prefetchProp === false ? 'none' : prefetchProp === true ? 'full' : 'auto';
    const fetchStrategy = prefetchIntent !== 'none' ? getFetchStrategyFromPrefetchIntent(prefetchIntent) : _types.FetchStrategy.PPR;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : ''));
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            unstable_dynamicOnHover: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true,
            onNavigate: true,
            transitionTypes: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart' || key === 'onNavigate') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'legacyBehavior' || key === 'unstable_dynamicOnHover') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else if (key === 'prefetch') {
                if (props[key] != null && valType !== 'boolean' && props[key] !== 'auto') {
                    throw createPropError({
                        key,
                        expected: '`boolean | "auto"`',
                        actual: valType
                    });
                }
            } else if (key === 'transitionTypes') {
                if (props[key] != null && !Array.isArray(props[key])) {
                    throw createPropError({
                        key,
                        expected: '`string[]`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
    }
    const resolvedHref = asProp || hrefProp;
    const formattedHref = formatStringOrUrl(resolvedHref);
    if ("TURBOPACK compile-time truthy", 1) {
        const { warnOnce } = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
        if (props.locale) {
            warnOnce('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof resolvedHref === 'string') {
                href = resolvedHref;
            } else if (typeof resolvedHref === 'object' && typeof resolvedHref.pathname === 'string') {
                href = resolvedHref.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw new Error(`Dynamic href \`${href}\` found in <Link> while using the \`/app\` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href`);
                }
            }
        }
    }
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (children?.$$typeof === Symbol.for('react.lazy')) {
            throw new Error(`\`<Link legacyBehavior>\` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's \`<a>\` tag.`);
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn(`"onClick" was passed to <Link> with \`href\` of \`${formattedHref}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
            }
            if (onMouseEnterProp) {
                console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${formattedHref}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw new Error(`No children were passed to <Link> with \`href\` of \`${formattedHref}\` but one child is required https://nextjs.org/docs/messages/link-no-children`);
                }
                throw new Error(`Multiple children were passed to <Link> with \`href\` of \`${formattedHref}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : ''));
            }
        } else //TURBOPACK unreachable
        ;
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if (children?.type === 'a') {
                throw new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor');
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    // Capture the Owner Stack during render so dev-only warnings emitted later
    // at navigation time can be associated with the JSX that created
    // this <Link>.
    const ownerStack = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined;
    // Use a callback ref to attach an IntersectionObserver to the anchor tag on
    // mount. In the future we will also use this to keep track of all the
    // currently mounted <Link> instances, e.g. so we can re-prefetch them after
    // a revalidation or refresh.
    const observeLinkVisibilityOnMount = _react.default.useCallback({
        "LinkComponent.useCallback[observeLinkVisibilityOnMount]": (element)=>{
            if (router !== null) {
                linkInstanceRef.current = (0, _links.mountLinkInstance)(element, formattedHref, router, fetchStrategy, prefetchEnabled, setOptimisticLinkStatus, ownerStack);
            }
            return ({
                "LinkComponent.useCallback[observeLinkVisibilityOnMount]": ()=>{
                    if (linkInstanceRef.current) {
                        (0, _links.unmountLinkForCurrentNavigation)(linkInstanceRef.current);
                        linkInstanceRef.current = null;
                    }
                    (0, _links.unmountPrefetchableInstance)(element);
                }
            })["LinkComponent.useCallback[observeLinkVisibilityOnMount]"];
        }
    }["LinkComponent.useCallback[observeLinkVisibilityOnMount]"], [
        prefetchEnabled,
        formattedHref,
        router,
        fetchStrategy,
        setOptimisticLinkStatus,
        ownerStack
    ]);
    const mergedRef = (0, _usemergedref.useMergedRef)(observeLinkVisibilityOnMount, childRef);
    const childProps = {
        ref: mergedRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`);
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, formattedHref, linkInstanceRef, replace, scroll, onNavigate, transitionTypes, prefetchIntent);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const upgradeToDynamicPrefetch = undefined;
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            const upgradeToDynamicPrefetch = unstable_dynamicOnHover === true;
            (0, _links.onNavigationIntent)(e.currentTarget, upgradeToDynamicPrefetch);
        }
    };
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(formattedHref)) {
        childProps.href = formattedHref;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(formattedHref);
    }
    let link;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            const { errorOnce } = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)");
            errorOnce('`legacyBehavior` is deprecated and will be removed in a future ' + 'release. A codemod is available to upgrade your components:\n\n' + 'npx @next/codemod@latest new-link .\n\n' + 'Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components');
        }
        link = /*#__PURE__*/ _react.default.cloneElement(child, childProps);
    } else {
        link = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            ...restProps,
            ...childProps,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LinkStatusContext.Provider, {
        value: linkStatus,
        children: link
    });
}
const LinkStatusContext = /*#__PURE__*/ (0, _react.createContext)(_links.IDLE_LINK_STATUS);
const useLinkStatus = ()=>{
    return (0, _react.useContext)(LinkStatusContext);
};
function getFetchStrategyFromPrefetchIntent(prefetchIntent) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return prefetchIntent === 'auto' ? _types.FetchStrategy.PPR : _types.FetchStrategy.Full;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/web/node_modules/next/dist/client/components/bfcache-state-manager.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useRouterBFCache", {
    enumerable: true,
    get: function() {
        return useRouterBFCache;
    }
});
const _react = __turbopack_context__.r("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// When the flag is disabled, only track the currently active tree
const MAX_BF_CACHE_ENTRIES = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 1;
function useRouterBFCache(activeTree, activeRenderTree, activeStateKey) {
    // The currently active entry. The entries form a linked list, sorted in
    // order of most recently active. This allows us to reuse parts of the list
    // without cloning, unless there's a reordering or removal.
    // TODO: Once we start tracking back/forward history at each route level,
    // we should use the history order instead. In other words, when traversing
    // to an existing entry as a result of a popstate event, we should maintain
    // the existing order instead of moving it to the front of the list. I think
    // an initial implementation of this could be to pass an incrementing id
    // to history.pushState/replaceState, then use that here for ordering.
    const [prevActiveEntry, setPrevActiveEntry] = (0, _react.useState)(()=>{
        const initialEntry = {
            tree: activeTree,
            renderTree: activeRenderTree,
            stateKey: activeStateKey,
            next: null
        };
        return initialEntry;
    });
    if (prevActiveEntry.tree === activeTree) {
        // Fast path. The active tree hasn't changed, so we can reuse the
        // existing state.
        return prevActiveEntry;
    }
    // The route tree changed. Note that this doesn't mean that the tree changed
    // *at this level* — the change may be due to a child route. Either way, we
    // need to either add or update the router tree in the bfcache.
    //
    // The rest of the code looks more complicated than it actually is because we
    // can't mutate the state in place; we have to copy-on-write.
    // Create a new entry for the active cache key. This is the head of the new
    // linked list.
    const newActiveEntry = {
        tree: activeTree,
        renderTree: activeRenderTree,
        stateKey: activeStateKey,
        next: null
    };
    // We need to append the old list onto the new list. If the head of the new
    // list was already present in the cache, then we'll need to clone everything
    // that came before it. Then we can reuse the rest.
    let n = 1;
    let oldEntry = prevActiveEntry;
    let clonedEntry = newActiveEntry;
    while(oldEntry !== null && n < MAX_BF_CACHE_ENTRIES){
        if (oldEntry.stateKey === activeStateKey) {
            // Fast path. This entry in the old list that corresponds to the key that
            // is now active. We've already placed a clone of this entry at the front
            // of the new list. We can reuse the rest of the old list without cloning.
            // NOTE: We don't need to worry about eviction in this case because we
            // haven't increased the size of the cache, and we assume the max size
            // is constant across renders. If we were to change it to a dynamic limit,
            // then the implementation would need to account for that.
            clonedEntry.next = oldEntry.next;
            break;
        } else {
            // Clone the entry and append it to the list.
            n++;
            const entry = {
                tree: oldEntry.tree,
                renderTree: oldEntry.renderTree,
                stateKey: oldEntry.stateKey,
                next: null
            };
            clonedEntry.next = entry;
            clonedEntry = entry;
        }
        oldEntry = oldEntry.next;
    }
    setPrevActiveEntry(newActiveEntry);
    return newActiveEntry;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/web/node_modules/next/dist/client/components/client-boundary-params.browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Browser variant of `./client-boundary-params`. In the browser the params and
// searchParams are created at render time rather than dynamically tracked.
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    createClientParams: null,
    createClientSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createClientParams: function() {
        return _paramsbrowser.createRenderParamsFromClient;
    },
    createClientSearchParams: function() {
        return _searchparamsbrowser.createRenderSearchParamsFromClient;
    }
});
const _paramsbrowser = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/request/params.browser.js [app-client] (ecmascript)");
const _searchparamsbrowser = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/request/search-params.browser.js [app-client] (ecmascript)");
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/web/node_modules/next/dist/client/components/client-page.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClientPageRoot", {
    enumerable: true,
    get: function() {
        return ClientPageRoot;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _react = __turbopack_context__.r("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const _routeparams = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/route-params.js [app-client] (ecmascript)");
const _hooksclientcontextsharedruntime = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js [app-client] (ecmascript)");
const _clientboundaryparams = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/components/client-boundary-params.browser.js [app-client] (ecmascript)");
function ClientPageRoot({ Component, serverProvidedParams }) {
    let searchParams;
    let params;
    if (serverProvidedParams !== null) {
        searchParams = serverProvidedParams.searchParams;
        params = serverProvidedParams.params;
    } else {
        // When Cache Components is enabled, the server does not pass the params as
        // props; they are parsed on the client and passed via context.
        const layoutRouterContext = (0, _react.use)(_approutercontextsharedruntime.LayoutRouterContext);
        params = layoutRouterContext !== null ? layoutRouterContext.parentParams : {};
        // This is an intentional behavior change: when Cache Components is enabled,
        // client segments receive the "canonical" search params, not the
        // rewritten ones. Users should either call useSearchParams directly or pass
        // the rewritten ones in from a Server Component.
        // TODO: Log a deprecation error when this object is accessed
        searchParams = (0, _routeparams.urlSearchParamsToParsedUrlQuery)((0, _react.use)(_hooksclientcontextsharedruntime.SearchParamsContext));
    }
    const clientSearchParams = (0, _clientboundaryparams.createClientSearchParams)(searchParams);
    const clientParams = (0, _clientboundaryparams.createClientParams)(params);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, {
        params: clientParams,
        searchParams: clientSearchParams
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/web/node_modules/next/dist/client/components/client-segment.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClientSegmentRoot", {
    enumerable: true,
    get: function() {
        return ClientSegmentRoot;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _react = __turbopack_context__.r("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const _clientboundaryparams = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/components/client-boundary-params.browser.js [app-client] (ecmascript)");
function ClientSegmentRoot({ Component, slots, serverProvidedParams }) {
    let params;
    if (serverProvidedParams !== null) {
        params = serverProvidedParams.params;
    } else {
        // When Cache Components is enabled, the server does not pass the params
        // as props; they are parsed on the client and passed via context.
        const layoutRouterContext = (0, _react.use)(_approutercontextsharedruntime.LayoutRouterContext);
        params = layoutRouterContext !== null ? layoutRouterContext.parentParams : {};
    }
    const clientParams = (0, _clientboundaryparams.createClientParams)(params);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, {
        ...slots,
        params: clientParams
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/web/node_modules/next/dist/client/components/instant-validation/boundary.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    InstantValidationBoundaryContext: null,
    PlaceValidationBoundaryBelowThisLevel: null,
    RenderValidationBoundaryAtThisLevel: null,
    SlotMarker: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    InstantValidationBoundaryContext: function() {
        return _impl.InstantValidationBoundaryContext;
    },
    PlaceValidationBoundaryBelowThisLevel: function() {
        return _impl.PlaceValidationBoundaryBelowThisLevel;
    },
    RenderValidationBoundaryAtThisLevel: function() {
        return _impl.RenderValidationBoundaryAtThisLevel;
    },
    SlotMarker: function() {
        return _impl.SlotMarker;
    }
});
const _impl = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/components/instant-validation/impl.browser.js [app-client] (ecmascript)");
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/web/node_modules/next/dist/client/components/instant-validation/impl.browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    InstantValidationBoundaryContext: null,
    PlaceValidationBoundaryBelowThisLevel: null,
    RenderValidationBoundaryAtThisLevel: null,
    SlotMarker: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    InstantValidationBoundaryContext: function() {
        return InstantValidationBoundaryContext;
    },
    PlaceValidationBoundaryBelowThisLevel: function() {
        return PlaceValidationBoundaryBelowThisLevel;
    },
    RenderValidationBoundaryAtThisLevel: function() {
        return RenderValidationBoundaryAtThisLevel;
    },
    SlotMarker: function() {
        return SlotMarker;
    }
});
const InstantValidationBoundaryContext = null;
const PlaceValidationBoundaryBelowThisLevel = null;
const RenderValidationBoundaryAtThisLevel = null;
const SlotMarker = null;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/web/node_modules/next/dist/client/components/layout-router.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    LoadingBoundaryProvider: null,
    default: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    LoadingBoundaryProvider: function() {
        return LoadingBoundaryProvider;
    },
    /**
 * OuterLayoutRouter handles the current segment as well as <Offscreen> rendering of other segments.
 * It can be rendered next to each other with a different `parallelRouterKey`, allowing for Parallel routes.
 */ default: function() {
        return OuterLayoutRouter;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/web/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _unresolvedthenable = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/components/unresolved-thenable.js [app-client] (ecmascript)");
const _errorboundary = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/components/error-boundary.js [app-client] (ecmascript)");
const _disablesmoothscroll = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/router/utils/disable-smooth-scroll.js [app-client] (ecmascript)");
const _redirectboundary = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/components/redirect-boundary.js [app-client] (ecmascript)");
const _errorboundary1 = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/components/http-access-fallback/error-boundary.js [app-client] (ecmascript)");
const _boundary = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/components/instant-validation/boundary.js [app-client] (ecmascript)");
const _createsegmentkey = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/components/router-reducer/create-segment-key.browser.js [app-client] (ecmascript)");
const _bfcachestatemanager = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/components/bfcache-state-manager.js [app-client] (ecmascript)");
const _apppaths = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/router/utils/app-paths.js [app-client] (ecmascript)");
const _hooksclientcontextsharedruntime = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js [app-client] (ecmascript)");
const _routeparams = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/route-params.js [app-client] (ecmascript)");
const _rendertree = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/components/render-tree.js [app-client] (ecmascript)");
/**
 * Resolve the root scroll padding used by the viewport check.
 *
 * Computed lengths serialize as pixels, but percentages remain relative to
 * the scrollport. Preserve the existing behavior for values that still
 * contain unresolved CSS math.
 */ function getScrollPaddingTopInPixels(htmlElement, viewportHeight) {
    const scrollPaddingTop = getComputedStyle(htmlElement).scrollPaddingTop;
    const value = Number.parseFloat(scrollPaddingTop);
    if (!Number.isFinite(value) || value < 0) {
        return 0;
    }
    if (scrollPaddingTop.endsWith('px')) {
        return value;
    }
    if (scrollPaddingTop.endsWith('%')) {
        return value / 100 * viewportHeight;
    }
    return 0;
}
/**
 * Check where the top corner of the HTMLElement is relative to the usable
 * viewport.
 *
 * Scroll padding is resolved lazily so an empty Fragment does not trigger a
 * computed style read. The caller caches the value for the second check.
 */ function getScrollTargetState(instance, viewportHeight, getScrollPaddingTop) {
    const rects = instance.getClientRects();
    if (rects.length === 0) {
        return 0;
    }
    let elementTop = Number.POSITIVE_INFINITY;
    for(let i = 0; i < rects.length; i++){
        const rect = rects[i];
        if (rect.top < elementTop) {
            elementTop = rect.top;
        }
    }
    return elementTop >= getScrollPaddingTop() && elementTop <= viewportHeight ? 1 : 2;
}
/**
 * Find the DOM node for a hash fragment.
 * If `top` the page has to scroll to the top of the page. This mirrors the browser's behavior.
 * If the hash fragment is an id, the page has to scroll to the element with that id.
 * If the hash fragment is a name, the page has to scroll to the first element with that name.
 */ function getHashFragmentDomNode(hashFragment) {
    // If the hash fragment is `top` the page has to scroll to the top of the page.
    if (hashFragment === 'top') {
        return document.body;
    }
    // If the hash fragment is an id, the page has to scroll to the element with that id.
    return document.getElementById(hashFragment) ?? // If the hash fragment is a name, the page has to scroll to the first element with that name.
    document.getElementsByName(hashFragment)[0] ?? null;
}
/**
 * Uses Fragment refs for scrolling.
 * Does not focus the first host descendant.
 */ function InnerScrollHandler(props) {
    const childrenRef = _react.default.useRef(null);
    (0, _react.useLayoutEffect)(()=>{
        const { scrollRef: scrollHandlerRef, renderTree } = props;
        const scrollRef = scrollHandlerRef.forceScroll ? scrollHandlerRef.scrollRef : renderTree.data.scrollRef;
        if (scrollRef === null || !scrollRef.current) return;
        let instance = null;
        const hashFragment = scrollHandlerRef.hashFragment;
        if (hashFragment) {
            instance = getHashFragmentDomNode(hashFragment);
            if (instance === null) {
                // A missing hash target is still a handled scroll intent. Do not
                // fall back to the route Fragment or leave the intent pending.
                scrollRef.current = false;
                scrollHandlerRef.onlyHashChange = false;
                scrollHandlerRef.hashFragment = null;
                return;
            }
        } else {
            instance = childrenRef.current;
        }
        // If there is no DOM node this layout-router level is skipped. It'll be handled higher-up in the tree.
        if (instance === null) {
            return;
        }
        let didHandleScroll = false;
        (0, _disablesmoothscroll.disableSmoothScrollDuringRouteTransition)(()=>{
            const htmlElement = document.documentElement;
            let viewportHeight = null;
            let initialTargetState = null;
            let scrollPaddingTop = null;
            const getScrollPaddingTop = ()=>{
                if (scrollPaddingTop === null) {
                    // Reuse the style and layout update from the geometry read.
                    scrollPaddingTop = getScrollPaddingTopInPixels(htmlElement, viewportHeight);
                }
                return scrollPaddingTop;
            };
            if (!hashFragment) {
                // Store the current viewport height because reading `clientHeight` causes a reflow,
                // and it won't change during this function.
                viewportHeight = htmlElement.clientHeight;
                initialTargetState = getScrollTargetState(instance, viewportHeight, getScrollPaddingTop);
                // An empty Fragment is not a scroll target. In particular, avoid
                // React's sibling fallback and leave the scroll signal available
                // for another changed segment.
                if (initialTargetState === 0) {
                    return;
                }
            }
            didHandleScroll = true;
            // Mark as scrolled so no other segment scrolls for this navigation.
            scrollRef.current = false;
            // This handler intentionally leaves focus untouched; resetting focus on
            // navigation is deferred.
            // In case of hash scroll, we only need to scroll the element into view
            if (hashFragment) {
                instance.scrollIntoView();
                return;
            }
            // If the element's top edge is already in the viewport, exit early.
            if (initialTargetState === 1) {
                return;
            }
            // Otherwise, try scrolling go the top of the document to be backward compatible with pages
            // scrollIntoView() called on `<html/>` element scrolls horizontally on chrome and firefox (that shouldn't happen)
            // We could use it to scroll horizontally following RTL but that also seems to be broken - it will always scroll left
            // scrollLeft = 0 also seems to ignore RTL and manually checking for RTL is too much hassle so we will scroll just vertically
            htmlElement.scrollTop = 0;
            // Scroll to domNode if domNode is not in viewport when scrolled to top of document
            if (getScrollTargetState(instance, viewportHeight, getScrollPaddingTop) === 2) {
                // Scroll into view doesn't scroll horizontally by default when not needed
                instance.scrollIntoView();
            }
        }, {
            // We will force layout by querying domNode position
            dontForceLayout: true,
            onlyHashChange: scrollHandlerRef.onlyHashChange
        });
        if (!didHandleScroll) {
            return;
        }
        // Mutate after scrolling so that it can be read by `disableSmoothScrollDuringRouteTransition`
        scrollHandlerRef.onlyHashChange = false;
        scrollHandlerRef.hashFragment = null;
    }, // but be prepared for lots of manual testing.
    undefined);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_react.Fragment, {
        ref: childrenRef,
        children: props.children
    });
}
function ScrollHandler({ children, renderTree }) {
    const context = (0, _react.useContext)(_approutercontextsharedruntime.GlobalLayoutRouterContext);
    if (!context) {
        throw new Error('invariant global layout router not mounted');
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(InnerScrollHandler, {
        scrollRef: context.scrollRef,
        renderTree: renderTree,
        children: children
    });
}
/**
 * InnerLayoutRouter handles rendering the provided segment based on the cache.
 */ function InnerLayoutRouter({ tree, segmentPath, debugNameContext, renderTree, params, url, isActive }) {
    const context = (0, _react.useContext)(_approutercontextsharedruntime.GlobalLayoutRouterContext);
    const parentNavPromises = (0, _react.useContext)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
    if (!context) {
        throw new Error('invariant global layout router not mounted');
    }
    // `rsc` represents the renderable node for this segment.
    // If this segment has a `prefetchRsc`, it's the statically prefetched data.
    // We should use that on initial render instead of `rsc`. Then we'll switch
    // to `rsc` when the dynamic response streams in.
    //
    // If no prefetch data is available, then we go straight to rendering `rsc`.
    const resolvedPrefetchRsc = renderTree.data.prefetchRsc !== null ? renderTree.data.prefetchRsc : renderTree.data.rsc;
    // We use `useDeferredValue` to handle switching between the prefetched and
    // final values. The second argument is returned on initial render, then it
    // re-renders with the first argument.
    const rsc = (0, _react.useDeferredValue)(renderTree.data.rsc, resolvedPrefetchRsc);
    // `rsc` is either a React node or a promise for a React node, except we
    // special case `null` to represent that this segment's data is missing. If
    // it's a promise, we need to unwrap it so we can determine whether or not the
    // data is missing.
    let resolvedRsc;
    if ((0, _rendertree.isDeferredRsc)(rsc)) {
        const unwrappedRsc = (0, _react.use)(rsc);
        if (unwrappedRsc === null) {
            // If the promise was resolved to `null`, it means the data for this
            // segment was not returned by the server. Suspend indefinitely. When this
            // happens, the router is responsible for triggering a new state update to
            // un-suspend this segment.
            (0, _react.use)(_unresolvedthenable.unresolvedThenable);
        }
        resolvedRsc = unwrappedRsc;
    } else {
        // This is not a deferred RSC promise. Don't need to unwrap it.
        if (rsc === null) {
            (0, _react.use)(_unresolvedthenable.unresolvedThenable);
        }
        resolvedRsc = rsc;
    }
    // In dev, we create a NavigationPromisesContext containing the instrumented promises that provide
    // `useSelectedLayoutSegment` and `useSelectedLayoutSegments`.
    // Promises are cached outside of render to survive suspense retries.
    let navigationPromises = null;
    if ("TURBOPACK compile-time truthy", 1) {
        const { createNestedLayoutNavigationPromises } = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/components/navigation-devtools.js [app-client] (ecmascript)");
        navigationPromises = createNestedLayoutNavigationPromises(tree, parentNavPromises);
    }
    let children = resolvedRsc;
    if (navigationPromises) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)(_hooksclientcontextsharedruntime.NavigationPromisesContext.Provider, {
            value: navigationPromises,
            children: resolvedRsc
        });
    }
    children = /*#__PURE__*/ (0, _jsxruntime.jsx)(_approutercontextsharedruntime.LayoutRouterContext.Provider, {
        value: {
            parentTree: tree,
            parentRenderTree: renderTree,
            parentSegmentPath: segmentPath,
            parentParams: params,
            // This is always set to null as we enter a child segment. It's
            // populated by LoadingBoundaryProvider the next time we reach a
            // loading boundary.
            parentLoadingData: null,
            debugNameContext: debugNameContext,
            // TODO-APP: overriding of url for parallel routes
            url: url,
            isActive: isActive
        },
        children: children
    });
    return children;
}
function LoadingBoundaryProvider({ loading, children }) {
    // Provides the data needed to render a loading.tsx boundary, via context.
    //
    // loading.tsx creates a Suspense boundary around each of a layout's child
    // slots. (Might be bit confusing to think about the data flow, but: if
    // loading.tsx and layout.tsx are in the same directory, they are assigned
    // to the same render tree.)
    //
    // This provider component does not render the Suspense boundary directly;
    // that's handled by LoadingBoundary.
    //
    // TODO: For simplicity, we should combine this provider with LoadingBoundary
    // and render the Suspense boundary directly. The only real benefit of doing
    // it separately is so that when there are multiple parallel routes, we only
    // send the boundary data once, rather than once per child. But that's a
    // negligible benefit and can be achieved via caching instead.
    const parentContext = (0, _react.use)(_approutercontextsharedruntime.LayoutRouterContext);
    if (parentContext === null) {
        return children;
    }
    // All values except for parentLoadingData are the same as the parent context.
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_approutercontextsharedruntime.LayoutRouterContext.Provider, {
        value: {
            parentTree: parentContext.parentTree,
            parentRenderTree: parentContext.parentRenderTree,
            parentSegmentPath: parentContext.parentSegmentPath,
            parentParams: parentContext.parentParams,
            parentLoadingData: loading,
            debugNameContext: parentContext.debugNameContext,
            url: parentContext.url,
            isActive: parentContext.isActive
        },
        children: children
    });
}
/**
 * Renders suspense boundary with the provided "loading" property as the fallback.
 * If no loading property is provided it renders the children without a suspense boundary.
 */ function LoadingBoundary({ name, loading, children }) {
    // TODO: For LoadingBoundary, and the other built-in boundary types, don't
    // wrap in an extra function component if no user-defined boundary is
    // provided. In other words, inline this conditional wrapping logic into
    // the parent component. More efficient and keeps unnecessary junk out of
    // the component stack.
    if (loading !== null) {
        const loadingRsc = loading[0];
        const loadingStyles = loading[1];
        const loadingScripts = loading[2];
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_react.Suspense, {
            name: name,
            fallback: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
                children: [
                    loadingStyles,
                    loadingScripts,
                    loadingRsc
                ]
            }),
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: children
    });
}
function OuterLayoutRouter({ parallelRouterKey, error, errorStyles, errorScripts, templateStyles, templateScripts, template, notFound, forbidden, unauthorized, segmentViewBoundaries }) {
    const context = (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);
    if (!context) {
        throw new Error('invariant expected layout router to be mounted');
    }
    const { parentTree, parentRenderTree, parentSegmentPath, parentParams, parentLoadingData, url, isActive, debugNameContext } = context;
    // Get the render tree for this segment by reading it from the parent segment's
    // child map.
    const parentTreeSegment = parentTree[0];
    const segmentPath = parentSegmentPath === null ? // the code. We should clean this up.
    [
        parallelRouterKey
    ] : parentSegmentPath.concat([
        parentTreeSegment,
        parallelRouterKey
    ]);
    // The "state" key of a segment is the one passed to React. In the browser it
    // represents the identity of the UI tree. Whenever the state key changes,
    // the tree is recreated and the state is reset. In the App Router model,
    // search params do not cause state to be lost, so two segments with the same
    // segment path but different search params should have the same state key.
    // On the server, the key describes the segment's structure instead, so it
    // stays the same when unknown params become known during HTML resume.
    //
    // Whether the data can be reused is tracked separately, by the segment
    // cache's vary paths.
    const activeTree = parentTree[1][parallelRouterKey];
    const activeRenderTree = parentRenderTree.slots?.get(parallelRouterKey);
    if (activeTree === undefined || activeRenderTree === undefined) {
        // Could not find a matching segment. The client tree is inconsistent with
        // the server tree. Suspend indefinitely; the router will have already
        // detected the inconsistency when handling the server response, and
        // triggered a refresh of the page to recover.
        (0, _react.use)(_unresolvedthenable.unresolvedThenable);
    }
    let maybeValidationBoundaryId = null;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const activeSegment = activeTree[0];
    const activeStateKey = (0, _createsegmentkey.createSegmentKey)(activeSegment);
    // At each level of the route tree, not only do we render the currently
    // active segment — we also render the last N segments that were active at
    // this level inside a hidden <Activity> boundary, to preserve their state
    // if or when the user navigates to them again.
    //
    // bfcacheEntry is a linked list of FlightRouterStates.
    let bfcacheEntry = (0, _bfcachestatemanager.useRouterBFCache)(activeTree, activeRenderTree, activeStateKey);
    let children = [];
    do {
        const tree = bfcacheEntry.tree;
        const renderTree = bfcacheEntry.renderTree;
        const stateKey = bfcacheEntry.stateKey;
        const segment = tree[0];
        /*
    - Error boundary
      - Only renders error boundary if error component is provided.
      - Rendered for each segment to ensure they have their own error state.
      - When gracefully degrade for bots, skip rendering error boundary.
    - Loading boundary
      - Only renders suspense boundary if loading components is provided.
      - Rendered for each segment to ensure they have their own loading state.
      - Passed to the router during rendering to ensure it can be immediately rendered when suspending on a Flight fetch.
  */ let segmentBoundaryTriggerNode = null;
        let segmentViewStateNode = null;
        if ("TURBOPACK compile-time truthy", 1) {
            const { SegmentBoundaryTriggerNode, SegmentViewStateNode } = __turbopack_context__.r("[project]/web/node_modules/next/dist/next-devtools/userspace/app/segment-explorer-node.js [app-client] (ecmascript)");
            const pagePrefix = (0, _apppaths.normalizeAppPath)(url);
            segmentViewStateNode = /*#__PURE__*/ (0, _jsxruntime.jsx)(SegmentViewStateNode, {
                page: pagePrefix
            }, pagePrefix);
            segmentBoundaryTriggerNode = /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(SegmentBoundaryTriggerNode, {})
            });
        }
        let params = parentParams;
        if (Array.isArray(segment)) {
            // This segment contains a route param. Accumulate these as we traverse
            // down the router tree. The result represents the set of params that
            // the layout/page components are permitted to access below this point.
            const paramName = segment[0];
            const paramCacheKey = segment[1];
            const paramType = segment[2];
            const paramValue = (0, _routeparams.getParamValueFromCacheKey)(paramCacheKey, paramType);
            if (paramValue !== null) {
                params = {
                    ...parentParams,
                    [paramName]: paramValue
                };
            }
        }
        const debugName = getBoundaryDebugNameFromSegment(segment);
        // `debugNameContext` represents the nearest non-"virtual" parent segment.
        // `getBoundaryDebugNameFromSegment` returns undefined for virtual segments.
        // So if `debugName` is undefined, the context is passed through unchanged.
        const childDebugNameContext = debugName ?? debugNameContext;
        // In practical terms, clicking this name in the Suspense DevTools
        // should select the child slots of that layout.
        //
        // So the name we apply to the Activity boundary is actually based on
        // the nearest parent segments.
        //
        // We skip over "virtual" parents, i.e. ones inserted by Next.js that
        // don't correspond to application-defined code.
        const isVirtual = debugName === undefined;
        const debugNameToDisplay = isVirtual ? undefined : debugNameContext;
        let templateValue = /*#__PURE__*/ (0, _jsxruntime.jsxs)(ScrollHandler, {
            renderTree: renderTree,
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_errorboundary.ErrorBoundary, {
                    errorComponent: error,
                    errorStyles: errorStyles,
                    errorScripts: errorScripts,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(LoadingBoundary, {
                        name: debugNameToDisplay,
                        // TODO: The loading module data for a segment is stored on the
                        // parent, then applied to each of that parent segment's
                        // parallel route slots. In the simple case where there's only
                        // one parallel route (the `children` slot), this is no
                        // different from if the loading module data were stored on the
                        // child directly. But I'm not sure this actually makes sense
                        // when there are multiple parallel routes. It's not a huge
                        // issue because you always have the option to define a narrower
                        // loading boundary for a particular slot. But this sort of
                        // smells like an implementation accident to me.
                        loading: parentLoadingData,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_errorboundary1.HTTPAccessFallbackBoundary, {
                            notFound: notFound,
                            forbidden: forbidden,
                            unauthorized: unauthorized,
                            children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_redirectboundary.RedirectBoundary, {
                                children: [
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)(InnerLayoutRouter, {
                                        url: url,
                                        tree: tree,
                                        params: params,
                                        renderTree: renderTree,
                                        segmentPath: segmentPath,
                                        debugNameContext: childDebugNameContext,
                                        isActive: isActive && stateKey === activeStateKey
                                    }),
                                    segmentBoundaryTriggerNode
                                ]
                            })
                        })
                    })
                }),
                segmentViewStateNode
            ]
        });
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        let child = /*#__PURE__*/ (0, _jsxruntime.jsxs)(_approutercontextsharedruntime.TemplateContext.Provider, {
            value: templateValue,
            children: [
                templateStyles,
                templateScripts,
                template
            ]
        }, stateKey);
        if ("TURBOPACK compile-time truthy", 1) {
            const { SegmentStateProvider } = __turbopack_context__.r("[project]/web/node_modules/next/dist/next-devtools/userspace/app/segment-explorer-node.js [app-client] (ecmascript)");
            child = /*#__PURE__*/ (0, _jsxruntime.jsxs)(SegmentStateProvider, {
                children: [
                    child,
                    segmentViewBoundaries
                ]
            }, stateKey);
        }
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        children.push(child);
        bfcacheEntry = bfcacheEntry.next;
    }while (bfcacheEntry !== null)
    return children;
}
function getBoundaryDebugNameFromSegment(segment) {
    if (segment === '/') {
        // Reached the root
        return '/';
    }
    if (typeof segment === 'string') {
        if (isVirtualLayout(segment)) {
            return undefined;
        } else {
            return segment + '/';
        }
    }
    const paramCacheKey = segment[1];
    return paramCacheKey + '/';
}
function isVirtualLayout(segment) {
    return(// (like __PAGE__ and __DEFAULT__) to avoid collisions with
    // user-defined route groups.
    segment === '(__SLOT__)');
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/web/node_modules/next/dist/client/components/render-from-template-context.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return RenderFromTemplateContext;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/web/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
function RenderFromTemplateContext() {
    const children = (0, _react.useContext)(_approutercontextsharedruntime.TemplateContext);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: children
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/web/node_modules/next/dist/client/request/params.browser.dev.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createRenderParamsFromClient", {
    enumerable: true,
    get: function() {
        return createRenderParamsFromClient;
    }
});
const _reflect = __turbopack_context__.r("[project]/web/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)");
const _reflectutils = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)");
const CachedParams = new WeakMap();
function makeDynamicallyTrackedParamsWithDevWarnings(underlyingParams) {
    const cachedParams = CachedParams.get(underlyingParams);
    if (cachedParams) {
        return cachedParams;
    }
    const promise = Promise.resolve(underlyingParams);
    const proxiedProperties = new Set();
    Object.keys(underlyingParams).forEach((prop)=>{
        if (_reflectutils.wellKnownProperties.has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            proxiedProperties.add(prop);
        }
    });
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            if (typeof prop === 'string') {
                if (proxiedProperties.has(prop)) {
                    const expression = (0, _reflectutils.describeStringPropertyAccess)('params', prop);
                    warnForSyncAccess(expression);
                }
            }
            return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        set (target, prop, value, receiver) {
            if (typeof prop === 'string') {
                proxiedProperties.delete(prop);
            }
            return _reflect.ReflectAdapter.set(target, prop, value, receiver);
        },
        ownKeys (target) {
            warnForEnumeration();
            return Reflect.ownKeys(target);
        }
    });
    proxiedPromise.status = 'fulfilled';
    proxiedPromise.value = underlyingParams;
    CachedParams.set(underlyingParams, proxiedPromise);
    return proxiedPromise;
}
function warnForSyncAccess(expression) {
    console.error(`A param property was accessed directly with ${expression}. ` + `\`params\` is a Promise and must be unwrapped with \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
}
function warnForEnumeration() {
    console.error(`params are being enumerated. ` + `\`params\` is a Promise and must be unwrapped with \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
}
function createRenderParamsFromClient(clientParams) {
    return makeDynamicallyTrackedParamsWithDevWarnings(clientParams);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/web/node_modules/next/dist/client/request/params.browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createRenderParamsFromClient", {
    enumerable: true,
    get: function() {
        return createRenderParamsFromClient;
    }
});
const createRenderParamsFromClient = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[project]/web/node_modules/next/dist/client/request/params.browser.dev.js [app-client] (ecmascript)").createRenderParamsFromClient : "TURBOPACK unreachable";
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/web/node_modules/next/dist/client/request/search-params.browser.dev.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createRenderSearchParamsFromClient", {
    enumerable: true,
    get: function() {
        return createRenderSearchParamsFromClient;
    }
});
const _reflect = __turbopack_context__.r("[project]/web/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)");
const _reflectutils = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)");
const CachedSearchParams = new WeakMap();
function makeUntrackedSearchParamsWithDevWarnings(underlyingSearchParams) {
    const cachedSearchParams = CachedSearchParams.get(underlyingSearchParams);
    if (cachedSearchParams) {
        return cachedSearchParams;
    }
    const proxiedProperties = new Set();
    const promise = Promise.resolve(underlyingSearchParams);
    Object.keys(underlyingSearchParams).forEach((prop)=>{
        if (_reflectutils.wellKnownProperties.has(prop)) {
        // These properties cannot be shadowed because they need to be the
        // true underlying value for Promises to work correctly at runtime
        } else {
            proxiedProperties.add(prop);
        }
    });
    const proxiedPromise = new Proxy(promise, {
        get (target, prop, receiver) {
            if (typeof prop === 'string') {
                if (!_reflectutils.wellKnownProperties.has(prop) && (proxiedProperties.has(prop) || // We are accessing a property that doesn't exist on the promise nor
                // the underlying searchParams.
                Reflect.has(target, prop) === false)) {
                    const expression = (0, _reflectutils.describeStringPropertyAccess)('searchParams', prop);
                    warnForSyncAccess(expression);
                }
            }
            return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        set (target, prop, value, receiver) {
            if (typeof prop === 'string') {
                proxiedProperties.delete(prop);
            }
            return Reflect.set(target, prop, value, receiver);
        },
        has (target, prop) {
            if (typeof prop === 'string') {
                if (!_reflectutils.wellKnownProperties.has(prop) && (proxiedProperties.has(prop) || // We are accessing a property that doesn't exist on the promise nor
                // the underlying searchParams.
                Reflect.has(target, prop) === false)) {
                    const expression = (0, _reflectutils.describeHasCheckingStringProperty)('searchParams', prop);
                    warnForSyncAccess(expression);
                }
            }
            return Reflect.has(target, prop);
        },
        ownKeys (target) {
            warnForSyncSpread();
            return Reflect.ownKeys(target);
        }
    });
    proxiedPromise.status = 'fulfilled';
    proxiedPromise.value = underlyingSearchParams;
    CachedSearchParams.set(underlyingSearchParams, proxiedPromise);
    return proxiedPromise;
}
function warnForSyncAccess(expression) {
    console.error(`A searchParam property was accessed directly with ${expression}. ` + `\`searchParams\` is a Promise and must be unwrapped with \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
}
function warnForSyncSpread() {
    console.error(`The keys of \`searchParams\` were accessed directly. ` + `\`searchParams\` is a Promise and must be unwrapped with \`React.use()\` before accessing its properties. ` + `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
}
function createRenderSearchParamsFromClient(underlyingSearchParams) {
    return makeUntrackedSearchParamsWithDevWarnings(underlyingSearchParams);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/web/node_modules/next/dist/client/request/search-params.browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createRenderSearchParamsFromClient", {
    enumerable: true,
    get: function() {
        return createRenderSearchParamsFromClient;
    }
});
const createRenderSearchParamsFromClient = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[project]/web/node_modules/next/dist/client/request/search-params.browser.dev.js [app-client] (ecmascript)").createRenderSearchParamsFromClient : "TURBOPACK unreachable";
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/web/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (previously via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
}
}),
"[project]/web/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/web/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/web/node_modules/next/dist/lib/metadata/generate/icon-mark.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IconMark", {
    enumerable: true,
    get: function() {
        return IconMark;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const IconMark = ()=>{
    if (typeof window !== 'undefined') {
        return null;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
        name: "\xabnxt-icon\xbb"
    });
};
}),
"[project]/web/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReflectAdapter", {
    enumerable: true,
    get: function() {
        return ReflectAdapter;
    }
});
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === 'function') {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
}
}),
"[project]/web/node_modules/next/dist/shared/lib/router/utils/disable-smooth-scroll.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Run function with `scroll-behavior: auto` applied to `<html/>`.
 * This css change will be reverted after the function finishes.
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "disableSmoothScrollDuringRouteTransition", {
    enumerable: true,
    get: function() {
        return disableSmoothScrollDuringRouteTransition;
    }
});
function disableSmoothScrollDuringRouteTransition(fn, options = {}) {
    // if only the hash is changed, we don't need to disable smooth scrolling
    // we only care to prevent smooth scrolling when navigating to a new page to avoid jarring UX
    if (options.onlyHashChange) {
        fn();
        return;
    }
    const htmlElement = document.documentElement;
    const hasDataAttribute = htmlElement.dataset.scrollBehavior === 'smooth';
    if (!hasDataAttribute) {
        // Warn if smooth scrolling is detected but no data attribute is present
        if (("TURBOPACK compile-time value", "development") === 'development' && getComputedStyle(htmlElement).scrollBehavior === 'smooth') {
            const { warnOnce } = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
            warnOnce('Detected `scroll-behavior: smooth` on the `<html>` element. To disable smooth scrolling during route transitions, ' + 'add `data-scroll-behavior="smooth"` to your <html> element. ' + 'Learn more: https://nextjs.org/docs/messages/missing-data-scroll-behavior');
        }
        // No smooth scrolling configured, run directly without style manipulation
        fn();
        return;
    }
    // Proceed with temporarily disabling smooth scrolling
    const existing = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = 'auto';
    if (!options.dontForceLayout) {
        // In Chrome-based browsers we need to force reflow before calling `scrollTo`.
        // Otherwise it will not pickup the change in scrollBehavior
        // More info here: https://github.com/vercel/next.js/issues/40719#issuecomment-1336248042
        htmlElement.getClientRects();
    }
    fn();
    htmlElement.style.scrollBehavior = existing;
}
}),
"[project]/web/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/web/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return `${protocol}${host}${pathname}${search}${hash}`;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
                }
            });
        }
    }
    return formatUrl(url);
}
}),
"[project]/web/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
});
const _utils = __turbopack_context__.r("[project]/web/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _hasbasepath = __turbopack_context__.r("[project]/web/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)");
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
}
}),
"[project]/web/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>{
    // Fast path: an absolute URL must start with a letter (the scheme).
    // Check for a-z and A-Z without the cost of the regex.
    const c = url.charCodeAt(0);
    const isLetter = c >= 65 /* A */  && c <= 90 || c >= 97 /* a */  && c <= 122;
    /* z */ if (!isLetter) {
        return false;
    }
    return ABSOLUTE_URL_REGEX.test(url);
};
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (App.prototype?.getInitialProps) {
            const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
            throw new Error(message);
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw new Error(message);
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = `Cannot find module for page: ${page}`;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
}
}),
"[project]/web/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/web/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
        return errorOnce;
    }
});
let errorOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const errors = new Set();
    errorOnce = (msg)=>{
        if (!errors.has(msg)) {
            console.error(msg);
        }
        errors.add(msg);
    };
}
}),
"[project]/web/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This regex will have fast negatives meaning valid identifiers may not pass
// this test. However this is only used during static generation to provide hints
// about why a page bailed out of some or all prerendering and we can use bracket notation
// for example while `ಠ_ಠ` is a valid identifier it's ok to print `searchParams['ಠ_ಠ']`
// even if this would have been fine too `searchParams.ಠ_ಠ`
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    describeHasCheckingStringProperty: null,
    describeStringPropertyAccess: null,
    wellKnownProperties: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    describeHasCheckingStringProperty: function() {
        return describeHasCheckingStringProperty;
    },
    describeStringPropertyAccess: function() {
        return describeStringPropertyAccess;
    },
    wellKnownProperties: function() {
        return wellKnownProperties;
    }
});
const isDefinitelyAValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
function describeStringPropertyAccess(target, prop) {
    if (isDefinitelyAValidIdentifier.test(prop)) {
        return `\`${target}.${prop}\``;
    }
    return `\`${target}[${JSON.stringify(prop)}]\``;
}
function describeHasCheckingStringProperty(target, prop) {
    const stringifiedProp = JSON.stringify(prop);
    return `\`Reflect.has(${target}, ${stringifiedProp})\`, \`${stringifiedProp} in ${target}\`, or similar`;
}
const wellKnownProperties = new Set([
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toString',
    'valueOf',
    'toLocaleString',
    // Promise prototype
    'then',
    'catch',
    'finally',
    // React Promise extension
    'status',
    // 'value',
    // 'error',
    // React introspection
    'displayName',
    '_debugInfo',
    // Common tested properties
    'toJSON',
    '$$typeof',
    '__esModule',
    // Tested by flight when checking for iterables
    '@@iterator'
]);
}),
]);

//# sourceMappingURL=0aq__0p3q4mfh5ywhd._.js.map