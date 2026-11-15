module.exports = [
"[project]/web/node_modules/@astryxdesign/core/dist/Badge/Badge.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file Badge.tsx
 * @input Uses React, HTMLAttributes
 * @output Exports Badge component, BadgeProps, BadgeVariant types
 * @position Core implementation; consumed by index.ts
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Badge/Badge.doc.mjs (props table, features, implementation notes)
 * - /packages/core/src/Badge/Badge.test.tsx (tests for new/changed behavior)
 * - /packages/core/src/Badge/index.ts (exports if types change)
 * - /apps/storybook/stories/Badge.stories.tsx (storybook stories)
 * - /packages/cli/assets/templates/blocks/components/Badge/ (showcase blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/isRenderable.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$textDirection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/textDirection.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
/**
 * Base badge styles
 */ const styles = {
    base: {
        k1xSpc: "x3nfvp2",
        kGNEyG: "x6s0dn4",
        kjj79g: "xl56j7k",
        kOIVth: "xzye2dw",
        kZKoxP: "x1grt7ep",
        k8WAf4: "xt970qd",
        kg3NbH: "xf314gf",
        kaIpWk: "xjspbzw",
        kMv6JI: "xjb2p0i",
        kGuDYH: "x141an7d",
        kLWn49: "x1ltkj2j",
        k63SB2: "x1e4wzip",
        khDVqt: "xuxw1ft",
        ks0D6T: "x193iq5w",
        k7Eaqz: "xeuugli",
        $$css: true
    },
    grows: {
        kAzted: "x1tn5z8q",
        $$css: true
    }
};
/**
 * Variant styles for different badge appearances.
 * Semantic variants use solid backgrounds; non-semantic use tinted backgrounds.
 */ const variants = {
    neutral: {
        kWkggS: "x17x4s8c",
        kMwMTN: "x1tgivj0",
        $$css: true
    },
    info: {
        kWkggS: "xcc0xtb",
        kMwMTN: "x1jxcxwi",
        kMeerF: "xcthrzx",
        k3XXqK: "x815t2r",
        kjBf7l: "x3teovq",
        kInvED: "xvr1dqx",
        $$css: true
    },
    success: {
        kWkggS: "xdsz4j9",
        kMwMTN: "xri61p4",
        kMeerF: "xcthrzx",
        k3XXqK: "x815t2r",
        kjBf7l: "x3teovq",
        kInvED: "xvr1dqx",
        $$css: true
    },
    warning: {
        kWkggS: "x1q8g9m5",
        kMwMTN: "xrebv38",
        kMeerF: "xcthrzx",
        k3XXqK: "x815t2r",
        kjBf7l: "x3teovq",
        kInvED: "xvr1dqx",
        $$css: true
    },
    error: {
        kWkggS: "x1pjz0fi",
        kMwMTN: "x1m024r3",
        kMeerF: "xcthrzx",
        k3XXqK: "x815t2r",
        kjBf7l: "x3teovq",
        kInvED: "xvr1dqx",
        $$css: true
    },
    blue: {
        kWkggS: "x1o0wnni",
        kMwMTN: "x1vvqiwl",
        $$css: true
    },
    cyan: {
        kWkggS: "x1rgj867",
        kMwMTN: "x1txnczv",
        $$css: true
    },
    green: {
        kWkggS: "x1sqjeoo",
        kMwMTN: "xltfdvo",
        $$css: true
    },
    orange: {
        kWkggS: "x1e9xt6e",
        kMwMTN: "xm47u9q",
        $$css: true
    },
    pink: {
        kWkggS: "xnpoty2",
        kMwMTN: "xiuofww",
        $$css: true
    },
    purple: {
        kWkggS: "x16i6n6f",
        kMwMTN: "x1m9wyeb",
        $$css: true
    },
    red: {
        kWkggS: "x1cibrc5",
        kMwMTN: "x1joocv1",
        $$css: true
    },
    teal: {
        kWkggS: "x1jtji5o",
        kMwMTN: "x9x0lbs",
        $$css: true
    },
    yellow: {
        kWkggS: "x1bo7t0x",
        kMwMTN: "xdhq94a",
        $$css: true
    }
};
function Badge({ variant = 'neutral', label, icon, xstyle, className, style, ref, ...props }) {
    // Clipping a label makes its tail unrecoverable, so the full text has to
    // stay reachable somewhere. `title` is the half of that answer which costs
    // nothing: no measurement, no hook, so `Badge` renders the same on the
    // server and stays usable in a server component. It follows the shape
    // `BaseTable` already uses for a truncated header cell (BaseTable.tsx) —
    // string content only, and only when there is something to show.
    //
    // A rich label is left alone: it is a subtree whose text would have to be
    // flattened to a string, and flattening renders a guess — an icon, a
    // `<strong>`, a nested element all read differently.
    //
    // It is set whether or not the label actually fits, because knowing that
    // requires measuring. The refinement — a tooltip only when the text is
    // really cut, reachable by hover and by focus — needs that measurement and
    // a client component, so it is tracked in #5585.
    const labelTitle = typeof label === 'number' ? String(label) : typeof label === 'string' && label.length > 0 ? label : undefined;
    // Whether the label renders anything, which is when the badge grows with it.
    const hasLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRenderable"])(label);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
        ref: ref,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('badge', {
            variant
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.base, hasLabel && styles.grows, variants[variant], xstyle), className, style),
        title: labelTitle,
        ...props,
        children: [
            icon,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$textDirection$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["textDirectionProps"])(label),
                ...{
                    className: "xb3r6kr xlyipyv xeuugli x4ej8vm"
                },
                children: label
            })
        ]
    });
}
Badge.displayName = 'Badge';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Banner/Banner.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Banner",
    ()=>Banner
]);
/**
 * @file Banner.tsx
 * @input Uses React useState/useRef/useId, useCollapsible, Button, Icon (with registry string names), StyleX
 * @output Exports Banner component, BannerProps, BannerStatus, BannerContainer types
 * @position Core implementation; consumed by index.ts, tested by Banner.test.tsx
 *
 * Visual structure:
 * - Banner frame (themeProps 'banner-frame'): owns the resting elevation and,
 *   for elevated card banners, the outer radius that shapes that shadow
 * - Header area (themeProps 'banner'): colored status background with icon, title, description, actions, dismiss
 * - End area restores the ordinary text context for consumer `endContent`; built-in controls opt back into the status foreground
 * - Content area (themeProps 'banner-content'): card background for additional content (children)
 * - Status icon (themeProps 'banner-icon'): the target rides on the default
 *   <Icon> itself — the element that paints — so 'status:X' overrides reach
 *   the glyph (#4166); for a custom `icon` node it stays on the layout wrapper
 * - Description (themeProps 'banner-description'): the supporting line owns its
 *   own colour and type, and the space between it and the title
 * - The end area carries no target: it is a layout row (flex, wrap, edge
 *   compensation) rather than a painted surface, and a theme that wants the
 *   header to grow around its buttons sets `padding-block` on 'banner'
 * - No left border accent — color is expressed through the full header background
 * - Each visual area owns its own border-radius (no overflow:clip on the container)
 * - Children are collapsible by default: a toggle appears in the header end
 *   area and the content starts closed. `collapsible={false}` opts out and
 *   pins the content open with no toggle. The whole collapse axis (enabled /
 *   default / controlled) lives on that one prop and is driven by the shared
 *   `useCollapsible` hook rather than local state.
 *
 * Status controls visual treatment only. Banner carries no live-region role by
 * default: an async outcome is announced from its transition handler through
 * `useAnnounce`. A caller marks an urgent message with `role="alert"`, which
 * lands on the message element (title and description), not on the frame.
 *
 * Title and description render as <div> (not <p>): they accept arbitrary
 * ReactNode content, and <p> cannot legally contain block-level children
 * (the HTML parser reparents them, desyncing SSR markup from the hydrated
 * DOM). Using <div> keeps these slots composable with any content. Their
 * StyleX styles set margin: 0 and explicit typography, so the rendered
 * appearance is identical to the previous <p>.
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Banner/Banner.doc.mjs (props table, features, implementation notes)
 * - /packages/core/src/Banner/Banner.test.tsx (tests for new/changed behavior)
 * - /packages/core/src/Banner/index.ts (exports if types change)
 * - /apps/storybook/stories/Banner.stories.tsx (storybook stories)
 * - /packages/cli/assets/templates/blocks/components/Banner/ (showcase blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Button/Button.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/Icon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Collapsible$2f$useCollapsible$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Collapsible/useCollapsible.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/composeEventHandlers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/isRenderable.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$edgeCompensation$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layout/edgeCompensation.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Banner$2f$Banner$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Banner/Banner.generated.js [app-ssr] (ecmascript)");
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerEnglishFallback"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Banner$2f$Banner$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
// =============================================================================
// Types
// =============================================================================
/**
 * Status type controlling the banner's icon and color.
 * Extensible via module augmentation of BannerStatusMap.
 */ /**
 * Container type of the banner.
 * - `card`: standalone card with border-radius and shadow
 * - `section`: full-width section banner (no border-radius)
 *
 * Extensible via module augmentation of BannerContainerMap.
 */ // =============================================================================
// Status lookups
// =============================================================================
// `BannerStatus` is `keyof BannerStatusMap`, and index.ts documents augmenting
// that interface to add a status. Every lookup below is therefore partial: an
// augmented status the library has never heard of falls through to the base
// visual treatment: no status fill and no default glyph. Announcement semantics
// remain caller-owned for every status.
const defaultIconNames = {
    info: 'info',
    warning: 'warning',
    error: 'error',
    success: 'success'
};
const statusIconColor = {
    info: 'inherit',
    warning: 'inherit',
    error: 'inherit',
    success: 'inherit'
};
// =============================================================================
// Styles
// =============================================================================
const styles = {
    root: {
        k1xSpc: "x78zum5",
        kXwgrk: "xdt5ytf",
        kMv6JI: "xjb2p0i",
        $$css: true
    },
    rootElevatedCard: {
        kaIpWk: "x1vf2byn",
        $$css: true
    },
    header: {
        k1xSpc: "x78zum5",
        kGNEyG: "x1cy8zhl",
        kwnvtZ: "x1a02dak",
        k1C7PZ: "xak3so",
        khm7nJ: "x4olc9o",
        k8WAf4: "x8o8v82",
        kg3NbH: "x1pzlopt",
        $$css: true
    },
    headerCardStandalone: {
        kaIpWk: "x1vf2byn",
        $$css: true
    },
    headerCardWithContent: {
        krdFHd: "xwxb7qi",
        kfmiAY: "x13nour3",
        kVL7Gh: "xbiv7yw",
        kT0f0o: "x16uus16",
        $$css: true
    },
    headerCentered: {
        kGNEyG: "x6s0dn4",
        $$css: true
    },
    endArea: {
        k1xSpc: "x78zum5",
        kGNEyG: "x6s0dn4",
        kwnvtZ: "x1a02dak",
        kjj79g: "x13a6bvl",
        kOIVth: "x1txdalj",
        kmuXW: "x2lah0s",
        kMwMTN: "x1tgivj0",
        ks0D6T: "x193iq5w",
        keTefX: "xvc5jky",
        kqGvvJ: "x81ka23",
        $$css: true
    },
    chevron: {
        k1ekBW: "x11xpdln",
        kIyJzY: "xuedmi6 x12w9bfk",
        kAMwcw: "xlr8y92",
        $$css: true
    },
    chevronExpanded: {
        k3aq6I: "x19jd1h0",
        $$css: true
    }
};
const statusStyles = {
    info: {
        kWkggS: "xjeheca",
        kMwMTN: "x1w9aomi",
        kMeerF: "xcthrzx",
        k3XXqK: "x815t2r",
        kjBf7l: "x3teovq",
        kInvED: "xvr1dqx",
        $$css: true
    },
    warning: {
        kWkggS: "x24i8r5",
        kMwMTN: "xfy1f8t",
        kMeerF: "xcthrzx",
        k3XXqK: "x815t2r",
        kjBf7l: "x3teovq",
        kInvED: "xvr1dqx",
        $$css: true
    },
    error: {
        kWkggS: "x1pritpl",
        kMwMTN: "xl8t7bd",
        kMeerF: "xcthrzx",
        k3XXqK: "x815t2r",
        kjBf7l: "x3teovq",
        kInvED: "xvr1dqx",
        $$css: true
    },
    success: {
        kWkggS: "xu13z74",
        kMwMTN: "xvchut",
        kMeerF: "xcthrzx",
        k3XXqK: "x815t2r",
        kjBf7l: "x3teovq",
        kInvED: "xvr1dqx",
        $$css: true
    }
};
// Scope status text context to each built-in Button. Its tooltip is a sibling,
// so it does not inherit these control-only variables.
const statusControlStyles = {
    info: {
        "--color-text-primary": "x1lheorj",
        $$css: true
    },
    warning: {
        "--color-text-primary": "xtlqn95",
        $$css: true
    },
    error: {
        "--color-text-primary": "xyur9ww",
        $$css: true
    },
    success: {
        "--color-text-primary": "xul3f6w",
        $$css: true
    }
};
/**
 * Narrows an augmented `BannerStatus` to one the style map actually carries,
 * so an unknown status renders with no status fill rather than crashing the
 * lookup. StyleX style maps cannot be declared `Partial`, hence the guard.
 */ function hasStatusStyle(status) {
    return Object.prototype.hasOwnProperty.call(statusStyles, status);
}
// Resting elevation for the banner. Applied to the root so the shadow wraps
// the whole banner (header + optional content). 'none' is the default and
// leaves the layout-only root untouched. For the `card` container the root is
// rounded (rootElevatedCard) so the shadow follows the card silhouette; the
// full-width `section` container stays square.
const elevationStyles = {
    none: {
        kGVxlE: "x1gnnqk1",
        $$css: true
    },
    low: {
        kGVxlE: "x1i5ehqx",
        $$css: true
    },
    med: {
        kGVxlE: "x14hfi27",
        $$css: true
    },
    high: {
        kGVxlE: "x1kcpxr7",
        $$css: true
    }
};
function Banner({ status, title, description, icon, isDismissable = false, onDismiss, dismissLabel, endContent, container = 'card', elevation = 'none', collapsible = true, children, xstyle, className, style, ref, onFocusCapture, onPointerDownCapture, role, ...rest }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    const [isDismissed, setIsDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // The disclosure state machine is the shared one — Banner owns no collapse
    // state of its own. `collapsible={false}` disables it, and that is what
    // makes the content permanently visible.
    //
    // The one place Banner departs from the hook's defaults: `useCollapsible`
    // opens by default, a banner starts closed. Its header already carries the
    // message, so the content is supplementary — and this is the behaviour
    // Banner has always had.
    const collapsibleConfig = collapsible != null && typeof collapsible === 'object' ? collapsible : {};
    const { isEnabled: isCollapsible, isOpen: isExpanded, toggle: handleToggleExpand } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Collapsible$2f$useCollapsible$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCollapsible"])({
        isCollapsible: collapsible !== false && {
            ...collapsibleConfig,
            defaultIsOpen: collapsibleConfig.defaultIsOpen ?? false
        }
    });
    // The element focus came from before it entered the banner. Dismissing
    // unmounts the whole banner, dismiss button included, so without a handoff
    // the browser drops focus to <body> and a keyboard user loses their place.
    // ToastViewport makes the same handoff when a focused toast is dismissed.
    const focusOriginRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Links the expand/collapse toggle to the content region it shows/hides so
    // assistive tech can move from the button to its controlled content
    // (disclosure pattern). The region is conditionally rendered, so aria-controls
    // below is set only while it's mounted to avoid a dangling reference. A
    // non-collapsible banner has no toggle, so neither end of the link is used.
    const contentId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const defaultIconName = defaultIconNames[status];
    const iconColor = statusIconColor[status];
    const hasChildren = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRenderable"])(children);
    // Keep the default tooltip concise while the accessible name identifies
    // the banner; an explicit translated override names both surfaces.
    const dismiss = t('@astryx.banner.dismiss');
    const dismissTooltip = dismissLabel ?? dismiss;
    const dismissName = dismissLabel ?? (typeof title === 'string' ? t('@astryx.banner.dismissTitled', {
        dismiss,
        title
    }) : dismiss);
    if (isDismissed) {
        return null;
    }
    // `focusin` reports the element focus came *from* as relatedTarget; on
    // pointerdown focus has not moved yet, so document.activeElement is it.
    const rememberFocusOrigin = (candidate, root)=>{
        if (candidate instanceof HTMLElement && candidate !== document.body && !root.contains(candidate)) {
            focusOriginRef.current = candidate;
        }
    };
    const handleFocusCapture = (event)=>{
        rememberFocusOrigin(event.relatedTarget, event.currentTarget);
    };
    const handlePointerDownCapture = (event)=>{
        rememberFocusOrigin(document.activeElement, event.currentTarget);
    };
    const handleDismiss = ()=>{
        const origin = focusOriginRef.current;
        setIsDismissed(true);
        onDismiss?.();
        // Move focus before React removes the subtree, so the browser never has a
        // frame where the focused node is gone.
        if (origin?.isConnected) {
            origin.focus();
        }
    };
    // The toggle exists only for a collapsible banner that actually has content
    // to disclose.
    const hasToggle = isCollapsible && hasChildren;
    // Show the end area if there are actions, dismiss, or a collapsible toggle
    const showEndArea = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRenderable"])(endContent) || isDismissable || hasToggle;
    // Center items vertically when there's only a title (no description)
    // and the banner has action buttons
    const hasActions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRenderable"])(endContent) || isDismissable;
    const isSingleLine = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRenderable"])(description) && hasActions;
    // Non-collapsible children are always shown; collapsible ones follow the
    // hook's open state.
    const showContent = hasChildren && (!isCollapsible || isExpanded);
    const isCard = container === 'card';
    // An urgent alert covers the authored message only, so controls, their
    // tooltips and the content area stay out of what is announced.
    const isUrgentAlert = role === 'alert';
    // The alert's name and other ARIA states belong to the alert element.
    const alertAriaProps = {};
    const frameProps = {};
    for (const [key, value] of Object.entries(rest)){
        if (isUrgentAlert && key.startsWith('aria-')) {
            alertAriaProps[key] = value;
        } else {
            frameProps[key] = value;
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        ref: ref,
        onFocusCapture: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(onFocusCapture, handleFocusCapture),
        onPointerDownCapture: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(onPointerDownCapture, handlePointerDownCapture),
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('banner-frame', {
            container,
            elevation
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.root, elevationStyles[elevation], isCard && elevation !== 'none' && styles.rootElevatedCard, xstyle), className, style),
        role: isUrgentAlert ? undefined : role,
        ...frameProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('banner', {
                    container,
                    status
                }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.header, isSingleLine && styles.headerCentered, hasStatusStyle(status) && statusStyles[status], isCard && (showContent ? styles.headerCardWithContent : styles.headerCardStandalone))),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRenderable"])(icon) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('banner-icon', {
                            status
                        }), {
                            className: "x78zum5 x6s0dn4 x2lah0s"
                        }) : {
                            className: "x78zum5 x6s0dn4 x2lah0s"
                        },
                        "aria-hidden": "true",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRenderable"])(icon) ? icon : defaultIconName != null ? /*#__PURE__*/ // Applied to the status <Icon> itself rather than the wrapper, so
                        // the element that paints the glyph is the element a theme
                        // targets — a 'banner-icon' 'status:X' color override beats the
                        // Icon's own variant from @layer astryx-theme (#4166).
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                            icon: defaultIconName,
                            size: "md",
                            color: iconColor,
                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('banner-icon', {
                                status
                            })
                        }) : null
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        role: isUrgentAlert ? 'alert' : undefined,
                        ...alertAriaProps,
                        ...{
                            0: {
                                className: "x78zum5 xdt5ytf xxhr3t x98rzlu xeuugli"
                            },
                            1: {
                                className: "x78zum5 xdt5ytf xxhr3t x98rzlu xeuugli xgualba"
                            }
                        }[!!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRenderable"])(endContent) << 0],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                ...{
                                    0: {
                                        className: "x1ghz6dp xjb2p0i xcr08ib x2mo6ok x1kq96og x1tgivj0 xj0a0fe x5ujdhh"
                                    },
                                    1: {
                                        className: "x1ghz6dp xjb2p0i xcr08ib x2mo6ok x1kq96og xj0a0fe x5ujdhh x1heor9g"
                                    }
                                }[!!hasStatusStyle(status) << 0],
                                children: title
                            }),
                            isUrgentAlert && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRenderable"])(description) && ' ',
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRenderable"])(description) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('banner-description'), {
                                    0: {
                                        className: "x1ghz6dp xjb2p0i x141an7d x1sodnla x1ltkj2j xv1l7n4 xj0a0fe x5ujdhh"
                                    },
                                    1: {
                                        className: "x1ghz6dp xjb2p0i x141an7d x1sodnla x1ltkj2j xj0a0fe x5ujdhh x1heor9g"
                                    }
                                }[!!hasStatusStyle(status) << 0]),
                                children: description
                            })
                        ]
                    }),
                    showEndArea && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.endArea, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$edgeCompensation$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["edgeCompSlot"].inset(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spacingVars"]['--spacing-2'])),
                        children: [
                            endContent,
                            hasToggle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                label: isExpanded ? t('@astryx.banner.collapse') : t('@astryx.banner.expand'),
                                tooltip: isExpanded ? t('@astryx.banner.collapse') : t('@astryx.banner.expand'),
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                    icon: "chevronDown",
                                    size: "sm",
                                    color: "inherit",
                                    xstyle: [
                                        styles.chevron,
                                        isExpanded && styles.chevronExpanded
                                    ]
                                }),
                                onClick: handleToggleExpand,
                                className: hasStatusStyle(status) ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](statusControlStyles[status]).className : undefined,
                                "aria-expanded": isExpanded,
                                "aria-controls": showContent ? contentId : undefined,
                                isIconOnly: true
                            }),
                            isDismissable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                label: dismissName,
                                tooltip: dismissTooltip,
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                                    icon: "close",
                                    size: "sm",
                                    color: "inherit"
                                }),
                                onClick: handleDismiss,
                                className: hasStatusStyle(status) ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](statusControlStyles[status]).className : undefined,
                                isIconOnly: true
                            })
                        ]
                    })
                ]
            }),
            showContent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                id: hasToggle ? contentId : undefined,
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('banner-content', {
                    container,
                    status
                }), {
                    0: {
                        className: "x1de1mus x8o8v82 x1pzlopt xgbv0en xw8tdv1 x92x3c3 x1t7ytsu x18b5jzi x1q0q8m5 x1j92z86 x1gejf6u xw8gpjh"
                    },
                    1: {
                        className: "x1de1mus x8o8v82 x1pzlopt xgbv0en xw8tdv1 x92x3c3 x1t7ytsu x18b5jzi x1q0q8m5 x1j92z86 x1gejf6u xw8gpjh x1k5g1gk x1eprgri"
                    }
                }[!!isCard << 0]),
                children: children
            })
        ]
    });
}
Banner.displayName = 'Banner';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Button/Button.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
/**
 * @file Button.tsx
 * @input Uses React, ButtonHTMLAttributes, ReactNode, i18n (useComponentTranslator), group contexts
 * @output Exports Button component, ButtonProps, ButtonVariant types
 * @position Core implementation; consumed by index.ts, tested by Button.test.tsx
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Button/Button.doc.mjs (props table, features, implementation notes)
 * - /packages/core/src/Button/Button.test.tsx (tests for new/changed behavior)
 * - /packages/core/src/Button/index.ts (exports if types change)
 * - /apps/storybook/stories/Button.stories.tsx (storybook stories)
 * - /packages/cli/assets/templates/blocks/components/Button/ (showcase blocks)
 *
 * Last synced props: label, variant, size, isDisabled, isLoading, isInterruptible, clickAction, icon, isIconOnly, width, children, tooltip, endContent, href, as, target, rel
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/useTooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$Spinner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Spinner/Spinner.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/Icon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$VisuallyHidden$2f$VisuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/VisuallyHidden/VisuallyHidden.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$IconDefaultSizeContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/IconDefaultSizeContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$IconSize$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/IconSize.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$edgeCompensation$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layout/edgeCompensation.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SizeContext$2f$SizeContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/SizeContext/SizeContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$ButtonGroup$2f$ButtonGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/ButtonGroup/ButtonGroupContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsHydrating$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsHydrating.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$pressGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/pressGroupContext.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressGroupItem$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/pressGroupItem.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$InputGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/InputGroup/InputGroupContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$InputGroupInternalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/InputGroup/InputGroupInternalContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$groupStyles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/InputGroup/groupStyles.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMergedRefs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchHitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/touchHitArea.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$buttonHitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Button/buttonHitArea.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$internal$2f$touchHitArea$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/internal/touchHitArea.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$useLinkComponent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Link/useLinkComponent.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/focusOutline.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/interactionOverlay.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$press$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/press.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$usePressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/usePressFeedback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Button$2f$Button$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Button/Button.generated.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/isRenderable.js [app-ssr] (ecmascript)");
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
;
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerEnglishFallback"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Button$2f$Button$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
/**
 * Written by the press controller or a group's tracker while a press is
 * believed. Typed `string`, so StyleX reads it as a computed key.
 */ const PRESSED_ON = '[data-astryx-press="on"]';
/** `aria-haspopup` values of a trigger that keeps its own press and opening. */ const MENU_POPUPS = new Set([
    'true',
    'menu',
    'listbox'
]);
/**
 * Base button styles
 * Pseudo-classes are nested within properties per StyleX recommendation:
 * https://stylexjs.com/docs/learn/styling-ui/defining-styles#pseudo-classes
 */ const styles = {
    base: {
        "--button-focus-offset": "x16bblx1",
        kInvED: "x1wfwxd8 x13aywxo",
        kVAEAm: "x1n2onr6",
        k1xSpc: "x3nfvp2",
        kGNEyG: "x6s0dn4",
        kjj79g: "xl56j7k",
        kOIVth: "x1txdalj",
        k8WAf4: "xce4md1",
        kg3NbH: "xrrkdod",
        kMzoRj: "xc342km",
        ksu8eU: "xng3xce",
        kaIpWk: "x1jxw6zd",
        kMv6JI: "xjb2p0i",
        kGuDYH: "xcr08ib",
        kLWn49: "x1kq96og",
        k63SB2: "x1e4wzip",
        khDVqt: "xuxw1ft",
        k7Eaqz: "xeuugli",
        ks0D6T: "x193iq5w",
        kkrTdU: "x1ypdohk x16khyan",
        k1ekBW: "xrafxwg",
        kIyJzY: "xuedmi6 x12w9bfk",
        kAMwcw: "xlr8y92",
        $$css: true
    },
    pressable: {
        k3aq6I: "x3oybdh x8ppqj x1249l8d xbht4k1 x1ex9uxt x3y5scg xg3abmg xoigjuk",
        $$css: true
    },
    trackedOverlay: {
        kgSjnq: "x1vl4g35",
        $$css: true
    },
    pressableTracked: {
        k3aq6I: "x3oybdh x3y5scg xg3abmg xoigjuk",
        $$css: true
    },
    inactive: {
        kkrTdU: "xt0e3qv",
        kKwaWg: "x18o3ruo",
        k3aq6I: "x1c071of x1pdlv7q x1ylxtyb",
        $$css: true
    },
    disabled: {
        kSiTet: "xbyyjgo",
        $$css: true
    },
    ariaDisabled: {
        kKwaWg: "x18o3ruo xuqm82a x1bev2v5",
        $$css: true
    },
    iconOnly: {
        "--button-icon-only-aspect": "x1v15ycx",
        kOBAk4: "xioom0i",
        kg3NbH: "xnjsko4",
        k8WAf4: "xt970qd",
        kmuXW: "x2lah0s",
        ks0D6T: "x1x1rfll",
        $$css: true
    },
    iconWrapper: {
        k1xSpc: "x3nfvp2",
        kGNEyG: "x6s0dn4",
        kjj79g: "xl56j7k",
        kmuXW: "x2lah0s",
        $$css: true
    },
    contentWrapper: {
        k1xSpc: "x78zum5",
        kzQI83: "x1iyjqo2",
        kmuXW: "xs83m0k",
        kCS8Yb: "xdl72j9",
        kSGwAc: "xkh2ocl",
        kXwgrk: "x1beo9mf",
        kwnvtZ: "x18qz0cn",
        kGNEyG: "x1h91t0o",
        kjj79g: "xarpa2k",
        kOIVth: "x14kbac9",
        k7Eaqz: "xeuugli",
        $$css: true
    },
    link: {
        kybGjl: "x1hl2dhg",
        $$css: true
    }
};
// Dynamic style for the consumer-controlled button width. Numbers are treated
// as pixels by StyleX; strings (e.g. '100%') are used as-is.
const dynamicStyles = {
    width: (width)=>[
            {
                kzqmXN: width != null ? "x5lhr3w" : width,
                $$css: true
            },
            {
                "--x-width": ((val)=>typeof val === "number" ? val + "px" : val != null ? val : undefined)(width)
            }
        ]
};
// At the default text size one label line is shorter than the element size,
// so a caller's height still replaces this one. A larger text size makes the
// line taller, and the button grows with its label.
const sizeStyles = {
    sm: {
        kZKoxP: "x7xd7g3",
        $$css: true
    },
    md: {
        kZKoxP: "x11l75t8",
        $$css: true
    },
    lg: {
        kZKoxP: "xbswrv2",
        $$css: true
    }
};
// An icon-only button holds its glyph, which does not grow with the text, so
// it keeps a fixed square size.
const iconOnlySizeStyles = {
    sm: {
        kZKoxP: "x6k0iem",
        $$css: true
    },
    md: {
        kZKoxP: "x1ueg155",
        $$css: true
    },
    lg: {
        kZKoxP: "xssyfek",
        $$css: true
    }
};
/**
 * Resting elevation for floating buttons (e.g. a FAB). `none` is the default
 * flat button; `low`/`med`/`high` map to the shadow token scale. 'none' stays
 * a literal so it never conflicts with a variant's background layering.
 */ const elevationStyles = {
    none: {
        kGVxlE: "x1gnnqk1",
        $$css: true
    },
    low: {
        kGVxlE: "x1i5ehqx",
        $$css: true
    },
    med: {
        kGVxlE: "x14hfi27",
        $$css: true
    },
    high: {
        kGVxlE: "x1kcpxr7",
        $$css: true
    }
};
/**
 * Variant styles using backgroundImage for layered colors
 * Pseudo-classes are nested within properties per StyleX recommendation
 * Overlay is stacked on top of base color using multiple linear-gradients
 * Focus outline is shared across variants for consistent keyboard affordance.
 */ const variants = {
    primary: {
        kWkggS: "x1ewilqj",
        kMwMTN: "x17wrial",
        $$css: true
    },
    secondary: {
        kWkggS: "x17x4s8c",
        kMwMTN: "x1tgivj0",
        $$css: true
    },
    ghost: {
        kWkggS: "xjbqb8w",
        kMwMTN: "x1tgivj0",
        $$css: true
    },
    destructive: {
        kWkggS: "x1pjz0fi",
        kMwMTN: "x1m024r3",
        kVAM5u: "x1w1tqly",
        kjBf7l: "x1e0x2sz",
        $$css: true
    }
};
/**
 * Button variant type derived from ButtonVariantMap.
 * Extensible via module augmentation of ButtonVariantMap.
 */ /**
 * Button size type derived from the sizeStyles StyleX object
 */ const iconSizeByButtonSize = {
    sm: 'sm',
    md: 'sm',
    lg: 'md'
};
const spinnerReveal = "x18re5ia-B";
const contentHide = "x188b6p3-B";
// Hold the loading swap for a short delay so a fast action (e.g. clickAction)
// that settles within the delay never flashes a spinner. The spinner fade-in
// and the content hide share the same delay so the button never shows an empty
// frame in between. Reduced motion is instant.
const SPINNER_DELAY = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["durationVars"]['--duration-medium-min'];
const loadingStyles = {
    hiddenContent: {
        kMwMTN: "x19co3pv",
        $$css: true
    },
    hiddenContentDelayed: {
        kKVMdj: "x1ffowhz",
        k44tkh: "xjlvqhv",
        kWV6AL: "x10e4vud",
        kKxzle: "x17yabm6 x14q22ui",
        $$css: true
    }
};
/**
 * "I am the last member of the group" — the trailing end cap.
 *
 * NOT `:last-child`: several members render an invisible layer element AFTER
 * their button (a tooltip'd Button returns button + layer; DropdownMenu returns
 * trigger + popover). `useLayer` renders those inline rather than portaling
 * them, so the layer — not the button — took the `:last-child` slot and the real
 * trailing button silently kept square corners (#2508).
 *
 * Layers always carry the native `popover` attribute (useLayer.tsx), and a
 * popover is never an in-flow member — it is `display: none` until shown, then
 * promoted to the top layer. Context layers also retain an inert `<template>`
 * marker so they can re-resolve their JSX position. Neither element is a group
 * member, so "last member" is: no following element sibling besides those
 * pieces of layer infrastructure — the last sibling that is not one of them.
 *
 * Written as `:nth-last-child(1 of …)`, not `:not(:has(~ …))`: the stylesheet
 * is global, and WebKit re-evaluates a sibling-relative `:has()` against every
 * earlier sibling on each insertion, so filling any container on the page
 * became quadratic (ButtonGroup FR3). A member is never layer infrastructure,
 * so being the last such sibling is the same as having none after it.
 *
 * Reading it the other way round — marking the *buttons* and testing for a
 * marked sibling — is the trap: it silently reclassifies anything it doesn't
 * recognise as "not a member", so a member wrapped in a `display: contents`
 * wrapper (Tooltip, HoverCard) or a raw child would make the button BEFORE it
 * round mid-group. Ignoring known layers keeps the predicate conservative: an
 * unrecognised sibling still counts, exactly as `:last-child` did, so the worst
 * case degrades to the old behaviour instead of a wrong corner.
 *
 * Kept as a same-file const: StyleX only statically evaluates a selector key
 * from a const in the same file.
 *
 * The leading edge still uses `:first-child` — a member's button always precedes
 * its own layer, so the first button is genuinely `:first-child`.
 */ const IS_LAST_ITEM = ':nth-last-child(1 of :not([popover]):not(template):not(dialog))';
const groupStyles = {
    horizontal: {
        krdFHd: "x15mokao x8eehn2",
        kVL7Gh: "xbiv7yw x1xrp5p4",
        kfmiAY: "x1ga7v0g x1ursdma",
        kT0f0o: "x16uus16 x1qa286i",
        k2ei4v: "xgbv0en x1pjv70x",
        kVhnKS: "x1t7ytsu xyf0ibl",
        kGJrpR: "x1j92z86",
        $$css: true
    },
    vertical: {
        krdFHd: "x15mokao x8eehn2",
        kfmiAY: "x1ga7v0g x2qxyot",
        kVL7Gh: "xbiv7yw x1muvjzw",
        kT0f0o: "x16uus16 x1qa286i",
        kEafiO: "x11xkdxz x1g31smg",
        kPef9Z: "x13fuv20 x1d9v4yf",
        kLZC3w: "x1pc3f07",
        $$css: true
    },
    onSolidHorizontal: {
        kGJrpR: "xrvmtm5",
        $$css: true
    },
    onSolidVertical: {
        kLZC3w: "x11npmm7",
        $$css: true
    }
};
/**
 * A solid variant's edge in forced colors. These variants separate themselves
 * from the page with a fill alone and have no border; forced colors discards
 * the fill, which would leave plain text with no perceivable boundary
 * (WCAG 1.4.11). `ButtonText` is the platform's own button edge. `ghost` is
 * flat by design and keeps none.
 *
 * Outside forced colors a standalone button keeps the base's borderless
 * values, and a grouped button's longhands are `null`, so the group's own
 * values stay. A grouped button gets only the longhands its group does not own: the group's
 * dividers stay where they are under both StyleX style resolutions, and the
 * group's first and last buttons close its outer edge.
 */ const FORCED_COLORS = '@media (forced-colors: active)';
const forcedColorsEdge = {
    standalone: {
        kMzoRj: "xc342km x13rsnn2",
        ksu8eU: "xng3xce xx61lck",
        kVAM5u: "x1ylmb6m",
        $$css: true
    },
    groupHorizontal: {
        kEafiO: "x1lym3mf",
        kPef9Z: "x4z998w",
        kt9PQ7: "x15anc7y",
        kfdmCh: "xe3zi7u",
        k2ei4v: "xgbv0en x1pjv70x xnvtw6h",
        kVhnKS: "x1t7ytsu xyf0ibl x1jd14un",
        ke9TFa: "x1s1fdp0",
        k8ry5P: "x1nzwmfm",
        $$css: true
    },
    groupVertical: {
        k2ei4v: "xjg5lhu",
        kVhnKS: "x1gbqego",
        ke9TFa: "xmzn1mo",
        k8ry5P: "xf1j0q2",
        kEafiO: "x11xkdxz x1g31smg x1qvjua",
        kPef9Z: "x13fuv20 x1d9v4yf xz5oem8",
        kt9PQ7: "x12u9vjp",
        kfdmCh: "xoqbfsn",
        $$css: true
    }
};
// The color of a grouped button's forced-colors edge: `destructive` takes
// `CanvasText`, the others `ButtonText`. These are the same longhands the
// edge sets, so the color holds whichever order a build puts shorthands and
// longhands in.
const forcedColorsEdgeColor = {
    horizontal: {
        kLZC3w: "xnvbotg",
        kL6WhQ: "xaj2e6u",
        kBCPoo: "xcy1b24",
        $$css: true
    },
    horizontalOnError: {
        kLZC3w: "x19dwuzr",
        kL6WhQ: "xszdk7l",
        kBCPoo: "x1nw5ucf",
        $$css: true
    },
    vertical: {
        kGJrpR: "x1hbxdp3",
        kBCPoo: "xhdp0qd",
        kL6WhQ: "xlkh95r",
        $$css: true
    },
    verticalOnError: {
        kGJrpR: "xjslfuv",
        kBCPoo: "x1x0u81l",
        kL6WhQ: "x2ab8f3",
        $$css: true
    }
};
/**
 * Whether `node` adds nothing to a content name: nothing renders, or an Icon
 * with no label. Any other node can add text.
 */ function addsNoName(node) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRenderable"])(node)) {
        return true;
    }
    if (!/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidElement"])(node) || node.type !== __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"]) {
        return false;
    }
    const { label } = node.props;
    return typeof label !== 'string' || label.trim() === '';
}
function Button({ label, variant = 'secondary', size: sizeProp, type = 'button', isDisabled = false, isLoading = false, isInterruptible = false, clickAction, icon, isIconOnly = false, width, elevation = 'none', children, endContent, tooltip, href, as, target, rel, xstyle, className, style, ref, ...props }) {
    const pressFeedback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$usePressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePressFeedback"])();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    const size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SizeContext$2f$SizeContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSize"])(sizeProp, 'md');
    const buttonGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$ButtonGroup$2f$ButtonGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useButtonGroup"])();
    const isSolidVariant = variant === 'primary' || variant === 'secondary' || variant === 'destructive';
    // A tracking group's tracker paints this button's pointer press. A menu
    // trigger is not tracked: it keeps its own press and opening.
    const groupPointers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$pressGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PressGroupContext"]);
    const groupItemProps = groupPointers != null && !MENU_POPUPS.has(String(props['aria-haspopup'])) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressGroupItem$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressGroupItemProps"])(groupPointers) : undefined;
    const isGroupTracked = groupItemProps != null;
    const inputGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$InputGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInputGroup"])();
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransition"])();
    // clickAction is normally fire-once (submit/save/pay), so a same-tick
    // double-click must dedupe — which neither isPending nor useOptimistic do.
    // Hence the ref guard. Interruptible callers (e.g. ToggleButton) opt out so a
    // re-click can land and interrupt the in-flight action with a fresh one.
    const actionInFlightRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isLoadingState = isLoading || isPending;
    // The loading live region must exist empty before it receives "Loading":
    // many screen readers skip a live region that mounts already holding its
    // text, which is what a Button first rendered loading did (spec:AST-086
    // FR3). Only that case holds the text back, until the frame after the
    // region mounts; a Button mounted idle never re-renders for this.
    const [isLiveRegionReady, setIsLiveRegionReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>!isLoadingState);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isLiveRegionReady) {
            return;
        }
        const frame = requestAnimationFrame(()=>setIsLiveRegionReady(true));
        return ()=>cancelAnimationFrame(frame);
    }, [
        isLiveRegionReady
    ]);
    // Delay the spinner reveal for action-driven loading (clickAction's own
    // transition) so a fast action that settles within the delay does not flash
    // a spinner. Interruptible loading is delayed too, so rapid re-clicks settle
    // before any spinner shows. Explicit isLoading-only stays immediate, since
    // the consumer is deliberately showing it.
    const delaySpinner = isPending || isInterruptible;
    const groupDisabled = buttonGroup?.isDisabled ?? false;
    const inputGroupState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$InputGroupInternalContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InputGroupInternalContext"]);
    const isTrueDisabled = isDisabled || groupDisabled || inputGroupState.isDisabled;
    // Busy-only: the button can't fire again purely because an action is in
    // flight, not because it's genuinely isDisabled/group-disabled. Per the API
    // Conventions "Disabled vs Busy" rule, busy is visual-only (aria-busy +
    // spinner) and must never take focusability away — the click-handler ref
    // guard (actionInFlightRef) is what actually makes a fire-once action fire
    // once, so the native disabled attribute adds nothing but a focus loss
    // here. When interruptible, the loading state drives the spinner and
    // aria-busy but not disabled at all, so clicks keep landing and can
    // interrupt the in-flight action.
    const isBusyOnlyDisabled = !isTrueDisabled && isLoadingState && !isInterruptible;
    const buttonDisabled = isTrueDisabled || isBusyOnlyDisabled;
    // Server markup has no click guard until it hydrates, and a native submit
    // or reset button acts on its form without one.
    const isHydrating = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsHydrating$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsHydrating"])();
    const renderedType = buttonDisabled && isHydrating && (type === 'submit' || type === 'reset') ? 'button' : type;
    // The group draws one band for all its members: a ButtonGroup, or a
    // tracking group that says so. A disabled or busy-only button takes no tap.
    const groupDrawsBand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$pressGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PressGroupBandContext"]);
    const hasHitArea = buttonGroup == null && !groupDrawsBand && !buttonDisabled;
    const hitAreaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchHitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTouchHitArea"])(hasHitArea, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$buttonHitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ButtonHitAreaContext"]));
    // isIconOnly prop is the source of truth for icon-only rendering.
    // When false (default), label is always rendered as visible text.
    const LinkComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$useLinkComponent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLinkComponent"])(as);
    // Render as link when href is provided and the button is not TRULY
    // disabled. Disabled links are an accessibility anti-pattern, so a
    // genuinely isDisabled/group-disabled button falls back to <button>.
    // Busy-only does NOT fall back: swapping <a> for a disabled <button>
    // mid-action would drop focus the same way the native attribute does
    // (credit @AKnassa, #4879), which is exactly the bug this PR fixes.
    const renderAsLink = href != null && !isTrueDisabled;
    // Attach tooltip behavior via the hook rather than wrapping the button in a
    // <Tooltip> element. The hook adds hover/focus triggers to the button itself,
    // so no extra DOM node is inserted — the button stays a direct child of its
    // container (no layout shift, and edge-compensation markers remain
    // discoverable through the container's direct-child `:has()` selector).
    const tooltipHook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTooltip"])({
        placement: 'above',
        isEnabled: tooltip != null
    });
    const handleClick = (e)=>{
        // The ref guard dedupes fire-once actions. Interruptible callers skip it so
        // a re-click while pending starts a fresh action that interrupts the prior.
        if (buttonDisabled || actionInFlightRef.current && !isInterruptible) {
            e.preventDefault();
            // An aria-disabled button still receives clicks. preventDefault cancels
            // only its own default action, such as a form submit. Stop propagation
            // so a clickable ancestor does not act.
            e.stopPropagation();
            return;
        }
        props.onClick?.(e);
        if (clickAction && !e.defaultPrevented) {
            actionInFlightRef.current = true;
            startTransition(async ()=>{
                try {
                    await clickAction(e);
                } finally{
                    actionInFlightRef.current = false;
                }
            });
        }
    };
    // A disabled button cancels Enter and Space, its activation keys. Other
    // keys, such as Escape and the arrows, still reach the caller's handler.
    const handleKeyDown = buttonDisabled ? (e)=>{
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
        } else {
            props.onKeyDown?.(e);
        }
    } : undefined;
    // Ghost buttons are edge-compensatable — containers detect this attribute
    // via :has() and pull their own slot margins to align flush at edges.
    const isFlat = variant === 'ghost';
    const edgeCompAttr = isFlat ? {
        [__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$edgeCompensation$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EDGE_COMP_ATTR"]]: ''
    } : null;
    // Shared StyleX props for both button and link rendering
    const sharedStylexProps = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusOutlineProps"].focusVisible(styles.base, isIconOnly ? iconOnlySizeStyles[size] : sizeStyles[size], isIconOnly && styles.iconOnly, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["interactionOverlayStyles"].backgroundImage, // The press the controller writes, on a layer under the label whose
    // release runs on the compositor.
    __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$press$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rowPressLayerStyles"].cell, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$press$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rowPressLayerStyles"].cellOnImage, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$press$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["controlPressLayerStyles"].control, isGroupTracked && styles.trackedOverlay, buttonDisabled && styles.inactive, isTrueDisabled && styles.disabled, buttonDisabled && styles.ariaDisabled, renderAsLink && styles.link, !buttonGroup && (isGroupTracked ? styles.pressableTracked : styles.pressable), buttonGroup && (buttonGroup.orientation === 'horizontal' ? groupStyles.horizontal : groupStyles.vertical), inputGroup != null && buttonGroup == null && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$groupStyles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupStyles"].buttonAddon, buttonGroup && (variant === 'primary' || variant === 'destructive') && (buttonGroup.orientation === 'horizontal' ? groupStyles.onSolidHorizontal : groupStyles.onSolidVertical), // Standalone floating buttons only — a grouped button's elevation is owned
    // by the ButtonGroup so the shared surface lifts as one unit.
    !buttonGroup && elevationStyles[elevation], width != null && dynamicStyles.width(width), isSolidVariant && (buttonGroup == null ? forcedColorsEdge.standalone : buttonGroup.orientation === 'horizontal' ? forcedColorsEdge.groupHorizontal : forcedColorsEdge.groupVertical), isSolidVariant && buttonGroup != null && (buttonGroup.orientation === 'horizontal' ? variant === 'destructive' ? forcedColorsEdgeColor.horizontalOnError : forcedColorsEdgeColor.horizontal : variant === 'destructive' ? forcedColorsEdgeColor.verticalOnError : forcedColorsEdgeColor.vertical), // AFTER the shared focus outline: the outline supplies width/style/offset
    // for every variant, and `destructive` re-colors just the ring to match
    // its own surface. Ordering is the mechanism — StyleX is last-wins.
    variants[variant], xstyle);
    const sharedMergedProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])(// Inside a group the group owns the surface's elevation, so the button
    // reflects the tier it actually paints rather than the prop it was handed.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('button', {
        variant,
        size,
        elevation: buttonGroup ? 'none' : elevation
    }), sharedStylexProps, className, style);
    const iconSize = iconSizeByButtonSize[size];
    const buttonContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            isLoadingState && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                ...{
                    0: {
                        className: "x10l6tqk x13vifvy x1o0tod xtijo5x x1ey2m1c xrvj5dj x1ku5rj1"
                    },
                    1: {
                        className: "x10l6tqk x13vifvy x1o0tod xtijo5x x1ey2m1c xrvj5dj x1ku5rj1 xqcmdr3 xb2rp9n xskzprw x17yabm6 x14q22ui"
                    }
                }[!!delaySpinner << 0],
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$Spinner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Spinner"], {
                    size: "sm",
                    shade: "inherit"
                })
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.contentWrapper, // The content wrapper's `::after` carries the touch band, so the
                // button's own `::before` (the touch press) and `::after` (a
                // caller's decoration) stay as they are.
                hasHitArea && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$internal$2f$touchHitArea$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["touchHitAreaStyles"].layer, isLoadingState && (delaySpinner ? loadingStyles.hiddenContentDelayed : loadingStyles.hiddenContent)),
                "aria-hidden": isLoadingState || undefined,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRenderable"])(icon) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.iconWrapper, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$IconSize$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["iconBoxSizeStyles"][iconSize]),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$IconDefaultSizeContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IconDefaultSizeProvider"], {
                            value: iconSize,
                            children: icon
                        })
                    }),
                    isIconOnly ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        ...{
                            className: "xb3r6kr xlyipyv xeuugli"
                        },
                        children: children ?? label
                    }),
                    !isIconOnly && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRenderable"])(endContent) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        ...{
                            className: "x3nfvp2 x6s0dn4 x1heor9g"
                        },
                        children: endContent
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$VisuallyHidden$2f$VisuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VisuallyHidden"], {
                role: "status",
                "aria-live": "polite",
                children: isLoadingState && isLiveRegionReady ? t('@astryx.button.loading') : ''
            })
        ]
    });
    // aria-label is set when:
    // 1. Icon-only mode (label is the only accessible name)
    // 2. Loading state on non-icon-only (announce the button's purpose)
    // 3. Children differ from label (children are visible, label is accessible name)
    const needsAriaLabel = isIconOnly && label !== '' || isLoadingState && !isIconOnly || children != null && children !== label;
    const ariaLabelProp = needsAriaLabel ? {
        'aria-label': label
    } : null;
    // The Button's accessible name when props decide it: the derived
    // aria-label, else a caller aria-label, else the label text alone. It is
    // not known here when a caller aria-labelledby names the Button from other
    // elements, or when `icon` or `endContent` can add text to its content
    // name (a count, for example). A decorative Icon in either slot adds none.
    const accessibleName = props['aria-labelledby'] != null ? undefined : needsAriaLabel ? label : props['aria-label'] ?? (addsNoName(icon) && addsNoName(endContent) ? label : undefined);
    // A tooltip that repeats the name adds nothing to the description, so a
    // screen reader does not read the same words twice.
    const isTooltipName = tooltip != null && accessibleName != null && tooltip.trim() === accessibleName.trim();
    // When a tooltip is attached via the hook, point aria-describedby at the
    // tooltip content (composing with any consumer-provided value).
    const describedByProp = tooltip != null && !isTooltipName ? {
        'aria-describedby': [
            props['aria-describedby'],
            tooltipHook.describedBy
        ].filter(Boolean).join(' ') || undefined
    } : null;
    // Merge the consumer ref with the tooltip hook's trigger ref so both point at
    // the same element. useMergedRefs tolerates undefined, so this is a no-op for
    // the tooltip side when no tooltip is set.
    const mergedButtonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMergedRefs"])(ref, tooltip != null ? tooltipHook.ref : undefined, hitAreaRef);
    let element;
    if (renderAsLink) {
        element = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(LinkComponent, {
            ref: mergedButtonRef,
            href: href,
            target: target,
            rel: rel,
            ...inputGroup != null && buttonGroup == null ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$groupStyles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inputGroupItemProps"] : undefined,
            ...sharedMergedProps,
            ...pressFeedback,
            ...groupItemProps,
            ...props,
            ...ariaLabelProp,
            ...describedByProp,
            ...edgeCompAttr,
            // A caller's own busy or disabled state is kept, so a component that
            // hands these props to a Button (a caller-rendered trigger) is heard.
            "aria-busy": isLoadingState || props['aria-busy'] || undefined,
            "aria-disabled": buttonDisabled || props['aria-disabled'] || undefined,
            onClick: handleClick,
            ...handleKeyDown ? {
                onKeyDown: handleKeyDown
            } : null,
            children: buttonContent
        });
    } else {
        element = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("button", {
            ref: mergedButtonRef,
            type: renderedType,
            ...inputGroup != null && buttonGroup == null ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$groupStyles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["inputGroupItemProps"] : undefined,
            ...sharedMergedProps,
            ...pressFeedback,
            ...groupItemProps,
            ...props,
            ...isTrueDisabled ? {
                name: undefined
            } : null,
            ...ariaLabelProp,
            ...describedByProp,
            ...edgeCompAttr,
            // A caller's own busy or disabled state is kept, so a component that
            // hands these props to a Button (a caller-rendered trigger) is heard.
            "aria-busy": isLoadingState || props['aria-busy'] || undefined,
            "aria-disabled": buttonDisabled || props['aria-disabled'] || undefined,
            onClick: handleClick,
            ...handleKeyDown ? {
                onKeyDown: handleKeyDown
            } : null,
            children: buttonContent
        });
    }
    if (tooltip) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                element,
                tooltipHook.renderTooltip(tooltip)
            ]
        });
    }
    return element;
}
Button.displayName = 'Button';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Button/buttonHitArea.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BUTTON_HIT_AREA",
    ()=>BUTTON_HIT_AREA,
    "ButtonHitAreaContext",
    ()=>ButtonHitAreaContext
]);
/**
 * @file buttonHitArea.ts
 * @input Uses createSharedContext and the touch hit-area options type
 * @output Exports ButtonHitAreaContext, the touch hit-area options a Button
 *   passes to useTouchHitArea, and BUTTON_HIT_AREA, their default
 * @position Internal to Core. A Core part that renders a Button and needs a
 *   different band, such as InputClearButton, provides its own options.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
const BUTTON_HIT_AREA = {
    ownsDescendantTouches: false
};
const ButtonHitAreaContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSharedContext"])('ButtonHitAreaContext', 1, BUTTON_HIT_AREA);
ButtonHitAreaContext.displayName = 'ButtonHitAreaContext';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/ButtonGroup/ButtonGroupContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ButtonGroupContext",
    ()=>ButtonGroupContext,
    "useButtonGroup",
    ()=>useButtonGroup
]);
/**
 * @file ButtonGroupContext.ts
 * @input Layer-scoped React context
 * @output Exports ButtonGroup context and useButtonGroup hook
 * @position Shared context; consumed by Button for group-aware styling
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const ButtonGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('ButtonGroupContext', 1, null);
ButtonGroupContext.displayName = 'ButtonGroupContext';
function useButtonGroup() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(ButtonGroupContext);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Card/Card.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file Card.tsx
 * @input Uses container utility, StyleX
 * @output Exports Card component, CardProps, CardVariant types
 * @position Core card container component
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Card/Card.doc.mjs (props table, features)
 * - /packages/core/src/Card/index.ts (exports if types change)
 * - /apps/storybook/stories/Card.stories.tsx (storybook stories)
 * - /packages/cli/assets/templates/blocks/components/Card/ (showcase blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$container$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layout/container.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$containerCorners$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layout/containerCorners.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$padding$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layout/padding.stylex.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-ssr] (ecmascript)");
// =============================================================================
// Variant type
// =============================================================================
/**
 * Background color variant for Card, derived from CardVariantMap.
 * Extensible via module augmentation of CardVariantMap.
 *
 * - `default`: standard card background with visible border
 * - `transparent`: no background, no visible border — for grouping content without visual weight
 * - `muted`: subtle muted background for de-emphasised cards
 * - Non-semantic palette: `blue | cyan | gray | green | orange | pink | purple | red | teal | yellow`
 *   Each uses the corresponding `--color-background-<name>` token (20% opacity tint).
 *
 * Only `default` draws a visible border. Its border width is subtracted from
 * the padding so the total inset (border + padding) equals the padding token —
 * keeping content geometry faithful to the spacing scale and identical to the
 * borderless variants. Themes can override borderWidth/borderColor.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
// =============================================================================
// Styles
// =============================================================================
const styles = {
    card: {
        "--_card-radius": "x2kkz0m",
        kaIpWk: "x153u1i6",
        k7Eaqz: "xeuugli",
        kVQacm: "x7giv3",
        kGVxlE: "x1p8z4y0",
        $$css: true
    },
    withBorder: {
        kMzoRj: "x1litavf",
        ksu8eU: "x1y0btm7",
        kVAM5u: "x14i3s5s",
        kZCmMZ: "xs19ii7",
        kwRFfy: "x12frdag",
        kLKAdn: "x1nex4ik",
        kGO01o: "xbv1mwh",
        $$css: true
    },
    corners: {
        "--_container-corner-block-start": "x1pvlcl8",
        "--_container-corner-block-end": "xd1in52",
        $$css: true
    },
    scrollable: {
        kVQacm: "xysyzu8",
        $$css: true
    }
};
// Background variant styles — each maps to a design token. Typed as PARTIAL
// over CardVariant: a theme can add a variant, and the record deliberately has
// no entry for it, so the lookup is undefined, StyleX drops it, and the card
// takes base styles for the theme rule to paint over.
const variantStyles = {
    default: {
        kWkggS: "x1de1mus",
        $$css: true
    },
    transparent: {
        kWkggS: "xjbqb8w",
        $$css: true
    },
    muted: {
        kWkggS: "xwmxj5m",
        $$css: true
    },
    blue: {
        kWkggS: "x1o0wnni",
        $$css: true
    },
    cyan: {
        kWkggS: "x1rgj867",
        $$css: true
    },
    gray: {
        kWkggS: "xspzpui",
        $$css: true
    },
    green: {
        kWkggS: "x1sqjeoo",
        $$css: true
    },
    orange: {
        kWkggS: "x1e9xt6e",
        $$css: true
    },
    pink: {
        kWkggS: "xnpoty2",
        $$css: true
    },
    purple: {
        kWkggS: "x16i6n6f",
        $$css: true
    },
    red: {
        kWkggS: "x1cibrc5",
        $$css: true
    },
    teal: {
        kWkggS: "x1jtji5o",
        $$css: true
    },
    yellow: {
        kWkggS: "x1bo7t0x",
        $$css: true
    }
};
// Elevation → shadow-token map. Sets the private --_card-elevation variable
// (not box-shadow directly) so it composes with --_card-ring in the shadow
// list above — a selection ring and a resting elevation coexist without one
// overwriting the other. 'none' is a transparent no-op (not the CSS literal
// `none`, which would be invalid inside the comma-separated shadow list).
const elevationStyles = {
    none: {
        "--_card-elevation": "xw28qpl",
        $$css: true
    },
    low: {
        "--_card-elevation": "x1nn8khe",
        $$css: true
    },
    med: {
        "--_card-elevation": "x1ovzxg0",
        $$css: true
    },
    high: {
        "--_card-elevation": "xnpe7fx",
        $$css: true
    }
};
// Dynamic styles for sizing props
const dynamicStyles = {
    sizing: (width, height, maxWidth, minHeight)=>[
            {
                kzqmXN: width != null ? "x5lhr3w" : width,
                kZKoxP: height != null ? "x16ye13r" : height,
                ks0D6T: maxWidth != null ? "xf68679" : maxWidth,
                kAzted: minHeight != null ? "x82snj4" : minHeight,
                $$css: true
            },
            {
                "--x-width": ((val)=>typeof val === "number" ? val + "px" : val != null ? val : undefined)(width),
                "--x-height": ((val)=>typeof val === "number" ? val + "px" : val != null ? val : undefined)(height),
                "--x-maxWidth": ((val)=>typeof val === "number" ? val + "px" : val != null ? val : undefined)(maxWidth),
                "--x-minHeight": ((val)=>typeof val === "number" ? val + "px" : val != null ? val : undefined)(minHeight)
            }
        ]
};
function Card({ width, height, maxWidth, minHeight, children, padding, variant = 'default', elevation = 'none', xstyle, className, style, ref, ...props }) {
    // Only enable scrolling when card has a fixed height (not null/undefined and not "auto")
    const hasFixedHeight = height != null && height !== 'auto';
    // When no explicit padding prop, use theme default (set via container tokens)
    const useThemeDefault = padding == null;
    const paddingToken = useThemeDefault ? undefined : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$padding$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["spacingStepToToken"][padding];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        ref: ref,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('card', {
            variant,
            elevation
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.card, // A theme's own variant is not a key here: the lookup is undefined,
        // StyleX drops it, and the theme rule paints over base styles.
        variantStyles[variant], elevationStyles[elevation], hasFixedHeight && styles.scrollable, dynamicStyles.sizing(width ?? null, height ?? null, maxWidth ?? null, minHeight ?? null), ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$container$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["container"])(paddingToken == null ? {
            useThemeDefault: 'card'
        } : {
            paddingInnerX: paddingToken,
            paddingInnerY: paddingToken,
            paddingOuterX: paddingToken,
            paddingOuterY: paddingToken
        }), styles.corners, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$containerCorners$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["containerCornerStyles"].publish, // Applied after the container padding so the border-inset calc wins;
        // it reads the --container-padding-* vars set above.
        variant === 'default' && styles.withBorder, xstyle), className, style),
        ...props,
        children: children
    });
}
Card.displayName = 'Card';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/ClickableCard/ClickableCard.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClickableCard",
    ()=>ClickableCard
]);
/**
 * @file ClickableCard.tsx
 * @input Uses Card, useClickableContainer, StyleX
 * @output Exports ClickableCard component and ClickableCardProps
 * @position Interactive card for navigation or action targets
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/ClickableCard/ClickableCard.doc.mjs (props table, features)
 * - /packages/core/src/ClickableCard/index.ts (exports if types change)
 * - /apps/storybook/stories/ClickableCard.stories.tsx (storybook stories)
 * - /packages/cli/assets/templates/blocks/components/Card/ClickableCardShowcase.tsx (showcase block)
 * - /packages/cli/assets/templates/blocks/components/Card/ClickableCardWithNestedButton.tsx (block)
 * - /packages/cli/assets/templates/blocks/components/Card/ClickableCardElevated.tsx (block)
 *
 * Composes Card for all visual styling (radius, padding, variants,
 * container tokens, theming). Adds an interactive wrapper with
 * useClickableContainer for safe nested interactive elements.
 *
 * A hidden <button> or <a> inside the card provides the accessible role,
 * label, and focus ring — the card surface itself has no role/tabIndex.
 * This gives screen readers a real interactive element to announce while
 * keeping the visual hover/active overlay on the full card.
 *
 * For static display, use Card.
 * For toggle selection, use SelectableCard.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$chainEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/chainEventHandlers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Card$2f$Card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Card/Card.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useClickableContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useClickableContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$useLinkComponent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Link/useLinkComponent.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/focusOutline.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/interactionOverlay.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$usePressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/usePressFeedback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMergedRefs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$disabledInteraction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/disabledInteraction.js [app-ssr] (ecmascript)");
// =============================================================================
// Styles — only the interactive layer, Card handles everything else
// =============================================================================
// The touch press's paint, declared by the shared overlay styles on the
// element the controller writes to (`pressedAlpha`) at the press's strength,
// 1 while on and 1 → 0 over the release, and inherited resolved by the
// `::after` that paints it. See interactionOverlay.stylex.ts.
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
const pressedOverlayImage = 'var(--_press-paint-image)';
/** Written by the press controller while it paints a press. */ const PRESSED_ON = '[data-astryx-press="on"]';
/** Written by the press controller for the press's release. */ const PRESSED_FADING = '[data-astryx-press="fading"]';
const styles = {
    interactive: {
        kVAEAm: "x1n2onr6",
        kkrTdU: "x1ypdohk x16khyan",
        kybGjl: "x1hl2dhg",
        kMwMTN: "x1heor9g",
        $$css: true
    },
    overlay: {
        "--_press-overlay": "x1s9pv7w xb8awce x1a5qima xmfmiv1 x1hn5ov8",
        k5JduY: "x1s928wv",
        kwXMNM: "x1j6awrg",
        kv0HGH: "xarstr8",
        kloYau: "x2q1x1w",
        kRicXK: "x1ywzrc5 x1xg7wox x15tr235 x1l4pwez",
        kPNhGg: "x97pup0 x12t15ek x1ntmb8i",
        kA8PQs: "x1dlmc9c xszhkds",
        ks3ayO: "x1l0fnur x1l0866b x7bosnz",
        kNctxI: "x1rd1oi2 xlif165",
        $$css: true
    },
    borderless: {
        kMzoRj: "xc342km",
        $$css: true
    },
    bordered: {
        kVAM5u: "x14i3s5s",
        kZCmMZ: "xs19ii7",
        kwRFfy: "x12frdag",
        kLKAdn: "x1nex4ik",
        kGO01o: "xbv1mwh",
        k1ekBW: "xshfolx x1xcegdw",
        kIyJzY: "xuedmi6 xo2sced x18etpvv",
        kAMwcw: "xlr8y92 xro0fum",
        $$css: true
    },
    borderedHoverOnPointer: {
        kpsWHe: "x1xwh4np",
        $$css: true
    },
    disabled: {
        kkrTdU: "xt0e3qv",
        kSiTet: "xbyyjgo",
        $$css: true
    }
};
function ClickableCard({ label, onClick: onClickProp, onMouseUp: onMouseUpProp, onPointerDown: onPointerDownProp, href, target, isDisabled = false, children, padding, variant = 'default', elevation = 'none', width, height, maxWidth, ref, xstyle: xstyleProp, className: classNameProp, style, ...props }) {
    const pressable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$usePressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePressFeedback"])();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const interactiveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const restoreFocusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // The isDisabled value of the link that just detached: a link card that
    // flips it replaces its hidden link (router component and plain anchor),
    // and only that replacement takes focus back.
    const detachedDisabledRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // A focused link remounts when isDisabled changes: the replacement takes
    // focus back, without scrolling, if focus fell to the page. Any other
    // detach and attach (a hidden Activity or Suspense boundary revealed
    // again) leaves focus where the person put it.
    const setInteractiveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((node)=>{
        if (node == null) {
            const previous = interactiveRef.current;
            restoreFocusRef.current = previous != null && previous === previous.ownerDocument.activeElement;
            detachedDisabledRef.current = isDisabled;
            interactiveRef.current = null;
            return;
        }
        interactiveRef.current = node;
        const isFlip = detachedDisabledRef.current != null && detachedDisabledRef.current !== isDisabled;
        const active = node.ownerDocument.activeElement;
        const hasFallen = active == null || active === node.ownerDocument.body;
        if (restoreFocusRef.current && isFlip && hasFallen) {
            node.focus({
                preventScroll: true
            });
        }
        restoreFocusRef.current = false;
        detachedDisabledRef.current = null;
    }, [
        isDisabled
    ]);
    const LinkComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$useLinkComponent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLinkComponent"])();
    const { onClick, onMouseUp, onPointerDown } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useClickableContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useClickableContainer"])({
        containerRef,
        interactiveRef,
        onClick: onClickProp,
        href,
        target,
        disabled: isDisabled
    });
    const handleMouseUp = onMouseUpProp ? (e)=>{
        onMouseUp(e);
        onMouseUpProp(e);
    } : onMouseUp;
    const isLink = href != null;
    // Disabled links have no href, so bypass the router and render an anchor.
    const LinkRoot = isDisabled ? 'a' : LinkComponent;
    // Only the `default` variant has a visible border. Card draws a transparent
    // 1px border on every other variant purely to avoid layout jitter; we drop
    // it here so the hover overlay covers the full box with no untinted ring.
    const hasBorder = variant === 'default';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Card$2f$Card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
        ref: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMergedRefs"])(ref, containerRef),
        ...isDisabled ? undefined : pressable,
        width: width,
        height: height,
        maxWidth: maxWidth,
        padding: padding,
        variant: variant,
        elevation: elevation,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('clickable-card', {
            variant
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusOutlineProps"].focusWithin(), classNameProp, style),
        xstyle: [
            styles.interactive,
            hasBorder ? styles.bordered : styles.borderless,
            !isDisabled && styles.overlay,
            // The touch press's strength and release, on the element the
            // controller writes to; the `::after` above paints off it.
            !isDisabled && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["interactionOverlayStyles"].pressedAlpha,
            !isDisabled && hasBorder && styles.borderedHoverOnPointer,
            isDisabled && styles.disabled,
            xstyleProp
        ],
        onClick: !isDisabled ? onClick : undefined,
        onMouseUp: !isDisabled ? handleMouseUp : undefined,
        onPointerDown: !isDisabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$chainEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["chainEventHandlers"])(onPointerDown, onPointerDownProp) : onPointerDownProp,
        ...props,
        children: [
            isLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(LinkRoot, {
                ref: setInteractiveRef,
                href: isDisabled ? undefined : href,
                target: isDisabled ? undefined : target,
                role: isDisabled ? 'link' : undefined,
                ...isDisabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$disabledInteraction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disabledInteractionProps"])() : null,
                "aria-label": label,
                "aria-disabled": isDisabled || undefined,
                tabIndex: 0,
                ...{
                    className: "x10l6tqk x1i1rx1s xjm9jq1 x1717udv xkdpibf xb3r6kr xzpqnlu xuxw1ft xc342km"
                }
            }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("button", {
                ref: setInteractiveRef,
                type: "button",
                "aria-label": label,
                "aria-disabled": isDisabled || undefined,
                onClick: onClickProp,
                ...isDisabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$disabledInteraction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disabledInteractionProps"])() : null,
                ...{
                    className: "x10l6tqk x1i1rx1s xjm9jq1 x1717udv xkdpibf xb3r6kr xzpqnlu xuxw1ft xc342km"
                }
            }),
            children
        ]
    });
}
ClickableCard.displayName = 'ClickableCard';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Collapsible/CollapsibleGroupContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CollapsibleGroupContext",
    ()=>CollapsibleGroupContext,
    "CollapsibleGroupPresentationContext",
    ()=>CollapsibleGroupPresentationContext
]);
/**
 * @file CollapsibleGroupContext.tsx
 * @input Layer-scoped React context
 * @output Exports CollapsibleGroupContext, CollapsibleGroupContextValue,
 *   CollapsibleGroupPresentationContext, CollapsibleGroupPresentationValue,
 *   CollapsibleGroupDensity, and CollapsibleChevronPosition types
 * @position Context definitions for collapsible group coordination and presentation
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Collapsible/CollapsibleGroup.tsx (provider)
 * - /packages/core/src/Collapsible/Collapsible.doc.mjs
 * - /packages/cli/assets/templates/blocks/components/Collapsible/ (showcase blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const CollapsibleGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSharedContext"])('CollapsibleGroupContext', 1, null);
CollapsibleGroupContext.displayName = 'CollapsibleGroupContext';
const CollapsibleGroupPresentationContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('CollapsibleGroupPresentationContext', 1, null);
CollapsibleGroupPresentationContext.displayName = 'CollapsibleGroupPresentationContext';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Collapsible/useCollapsible.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCollapsible",
    ()=>useCollapsible
]);
/**
 * @file useCollapsible.ts
 * @input Uses React useState/use, CollapsibleGroupContext
 * @output Exports useCollapsible hook, CollapsibleConfig (formerly CollapsibleConfig), UseCollapsibleOptions, UseCollapsibleReturn types
 * @position Reusable hook for collapsible behavior — used by Card, Section, etc.
 *
 * Encapsulates the full collapsible state machine:
 * - Parsing boolean | config into normalized config
 * - Checking for CollapsibleGroup context (group-controlled mode)
 * - Managing internal state for uncontrolled mode
 * - Providing a unified toggle handler
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Collapsible/index.ts (exports)
 * - /packages/core/src/Collapsible/Collapsible.doc.mjs
 *
 * NOTE: Public hooks use the `useXDS` prefix per Astryx naming conventions.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Collapsible$2f$CollapsibleGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Collapsible/CollapsibleGroupContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
function useCollapsible(options) {
    const { isCollapsible, value } = options;
    // Check for CollapsibleGroup context
    const group = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Collapsible$2f$CollapsibleGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleGroupContext"]);
    const isControlledByGroup = group != null && value != null;
    // Parse config: true → empty config, object → as-is, false/undefined → null
    const config = isCollapsible === true ? {} : isCollapsible ? isCollapsible : null;
    const isEnabled = config != null;
    // Internal state for uncontrolled mode
    const [internalIsOpen, setInternalIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if (isControlledByGroup) {
            return true;
        } // group manages this
        if (config?.isOpen !== undefined) {
            return config.isOpen;
        }
        return config?.defaultIsOpen ?? true;
    });
    // Determine open state from the appropriate source
    let isOpen;
    if (isControlledByGroup && value != null) {
        isOpen = group.isOpen(value);
    } else if (config?.isOpen !== undefined) {
        isOpen = config.isOpen;
    } else {
        isOpen = internalIsOpen;
    }
    // Toggle handler dispatches to the appropriate controller.
    //
    // Controlled vs uncontrolled is decided by whether `isOpen` was provided —
    // mirroring how `isOpen` is derived above. `onOpenChange` is a notification
    // callback, not a signal of control: an uncontrolled component may still want
    // to observe changes. So in uncontrolled mode we drive internal state AND
    // fire the callback; only in controlled mode do we defer entirely to the
    // parent via the callback.
    const toggle = ()=>{
        if (isControlledByGroup && value != null) {
            group.toggle(value);
            return;
        }
        const next = !isOpen;
        // Uncontrolled: internal state is the source of truth, so update it.
        if (config?.isOpen === undefined) {
            setInternalIsOpen(next);
        }
        // Always notify — for both controlled and uncontrolled usage.
        config?.onOpenChange?.(next);
    };
    return {
        isEnabled,
        isOpen,
        toggle
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Field/FieldLabel.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldLabel",
    ()=>FieldLabel
]);
/**
 * @file FieldLabel.tsx
 * @input Uses React, Icon, IconType, InfoTip, useComponentTranslator, useResolvedOptionality
 * @output Exports FieldLabel component, FieldLabelProps
 * @position Core label implementation; used by Field, CheckboxInput, Switch
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Field/Field.doc.mjs (props table, features, implementation notes)
 * - /packages/core/src/Field/index.ts (exports if types change)
 * - /packages/core/src/FormLayout/FormLayoutContext.ts (defaultOptionality drives the indicator)
 * - /packages/cli/assets/templates/blocks/components/Field/ (showcase blocks)
 * - /packages/core/locales/en.json (@astryx.field.required / @astryx.field.optional / @astryx.field.labelTooltip)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/Icon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InfoTip$2f$InfoTip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/InfoTip/InfoTip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useInputContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useInputContainer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useResolvedRequired$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useResolvedRequired.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Field$2f$FieldLabel$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Field/FieldLabel.generated.js [app-ssr] (ecmascript)");
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerEnglishFallback"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Field$2f$FieldLabel$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
const styles = {
    label: {
        k1xSpc: "x78zum5",
        kGNEyG: "x6s0dn4",
        kOIVth: "xzye2dw",
        kMv6JI: "x9ynric",
        kGuDYH: "xcr08ib",
        kLWn49: "x1kq96og",
        k63SB2: "x1e4wzip",
        kMwMTN: "xv1l7n4",
        kkrTdU: "x1ypdohk x16khyan",
        $$css: true
    },
    labelDisabled: {
        kMwMTN: "xnbbluu",
        kkrTdU: "xt0e3qv",
        $$css: true
    },
    infoTipHidden: {
        kVAEAm: "x10l6tqk xs5wpqw",
        kSGwAc: "xqcrz7y",
        kMcinP: "xzpqnlu xfnbp2s",
        kVQacm: "xb3r6kr xrta9n2",
        khDVqt: "xuxw1ft",
        $$css: true
    },
    srOnly: {
        ksu8eU: "xng3xce",
        kMcinP: "xzpqnlu",
        kZKoxP: "xjm9jq1",
        kLqNvP: "x1o0tod",
        kogj98: "xkdpibf",
        kVQacm: "xb3r6kr",
        kmVPX3: "x1717udv",
        kfzvcC: "x47corl",
        kVAEAm: "x10l6tqk",
        k87sOh: "x13vifvy",
        kfSwDN: "x87ps6o",
        khDVqt: "xuxw1ft",
        kzqmXN: "x1i1rx1s",
        $$css: true
    }
};
function FieldLabel({ label, inputID, labelID, isGroupLabel = false, isLabelHidden = false, isDisabled = false, isOptional = false, isRequired = false, labelIcon, labelTooltip, description, descriptionID, className, style, xstyle, ref, ...rest }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    // The visible indicator only; each control resolves its own `aria-required`
    // so the unmarked majority is still announced.
    const { showsRequiredMarker: showRequired, showsOptionalMarker: showOptional } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useResolvedRequired$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useResolvedOptionality"])({
        isRequired,
        isOptional
    });
    const statusText = showOptional ? t('@astryx.field.optional') : showRequired ? t('@astryx.field.required') : null;
    // A group label (e.g. for a radiogroup) must not be a literal `<label>`
    // element: a `<label>` semantically names a single form control and can't be
    // associated with a group. Render it as a `<span>` instead, keeping all the
    // label styling and slots. The group references it via `aria-labelledby`.
    const LabelElement = isGroupLabel ? 'span' : 'label';
    // Clicking the description forwards to the associated control, so the whole
    // label area (label text + description) is one hit target — mirroring native
    // `<label>` click behavior, which the description can't get from `htmlFor`
    // because it stays a sibling `<span>` (nesting it in the `<label>` would fold
    // it into the control's accessible name and double-announce it alongside
    // `aria-describedby`). A group label names a group, not one control, so it
    // has nothing to forward to.
    const forwardsDescriptionClick = !isGroupLabel && inputID != null;
    // Reuse `useInputContainer` — the same hook input wrappers use to forward
    // clicks on non-interactive chrome to their control. It skips nested
    // interactive content (a link/button inside a ReactNode description) and
    // guards against forwarding during text selection, so the description needs
    // no bespoke click logic. The "input" is resolved from `inputID` lazily via
    // a ref-shaped object, since FieldLabel points at the control by id rather
    // than holding a ref to it.
    const descriptionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const controlRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            get current () {
                return inputID == null ? null : descriptionRef.current?.ownerDocument.getElementById(inputID) ?? null;
            },
            set current (_value){}
        }), [
        inputID
    ]);
    const descriptionClickProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useInputContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInputContainer"])({
        containerRef: descriptionRef,
        inputRef: controlRef,
        disabled: !forwardsDescriptionClick
    });
    const labelContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            labelIcon && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["renderIconSlot"])(labelIcon, {
                size: 'sm',
                color: 'inherit'
            }),
            label,
            statusText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                ...{
                    className: "x1sodnla x141an7d x1ltkj2j xv1l7n4"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        "aria-hidden": "true",
                        children: " \u2219 "
                    }),
                    statusText
                ]
            })
        ]
    });
    const labelElement = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(LabelElement, {
        ref: ref,
        id: labelID,
        htmlFor: isGroupLabel ? undefined : inputID,
        ...rest,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])(// A control that knows what kind of label this is passes its own
        // target down (CheckboxInput's `checkbox-label`, Switch's
        // `switch-label`); it arrives as `className` and composes onto this
        // one. The label itself does not describe its own placement — it
        // cannot know it, and any encoding it guessed would be wrong for a
        // caller that arranges labels differently (Field's
        // `horizontal-labels`).
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('field-label'), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.label, isDisabled && styles.labelDisabled, isLabelHidden && styles.srOnly, xstyle), className, style),
        children: labelContent
    });
    const labelWithHelp = labelTooltip ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
        ...{
            0: {
                className: "x3nfvp2 x6s0dn4 x16dsc37 xzye2dw"
            },
            1: {
                className: "x6s0dn4 x16dsc37 xzye2dw xjp7ctv"
            }
        }[!!isLabelHidden << 0],
        children: [
            labelElement,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InfoTip$2f$InfoTip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InfoTip"], {
                content: labelTooltip,
                label: t('@astryx.field.labelTooltip', {
                    label
                }),
                xstyle: isLabelHidden ? styles.infoTipHidden : undefined
            })
        ]
    }) : labelElement;
    // Without a description, preserve the original public DOM: the label itself
    // remains the caller's flex/grid item and its layout overrides apply there.
    if (!description) {
        return labelWithHelp;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        ...{
            0: {
                className: "x78zum5 xdt5ytf"
            },
            1: {
                className: "xdt5ytf xjp7ctv"
            }
        }[!!isLabelHidden << 0],
        children: [
            labelWithHelp,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                ref: forwardsDescriptionClick ? descriptionRef : undefined,
                id: descriptionID,
                ...forwardsDescriptionClick ? descriptionClickProps : undefined,
                ...{
                    0: {
                        className: "x9ynric x141an7d x1ltkj2j x1sodnla xv1l7n4"
                    },
                    2: {
                        className: "x9ynric x141an7d x1ltkj2j x1sodnla xv1l7n4 x1ypdohk x16khyan"
                    },
                    1: {
                        className: "x9ynric x141an7d x1ltkj2j x1sodnla xv1l7n4 xng3xce xzpqnlu xjm9jq1 x1o0tod xkdpibf xb3r6kr x1717udv x47corl x10l6tqk x13vifvy x87ps6o xuxw1ft x1i1rx1s"
                    },
                    3: {
                        className: "x9ynric x141an7d x1ltkj2j x1sodnla xv1l7n4 x1ypdohk x16khyan xng3xce xzpqnlu xjm9jq1 x1o0tod xkdpibf xb3r6kr x1717udv x47corl x10l6tqk x13vifvy x87ps6o xuxw1ft x1i1rx1s"
                    }
                }[!!forwardsDescriptionClick << 1 | !!isLabelHidden << 0],
                children: description
            })
        ]
    });
}
FieldLabel.displayName = 'FieldLabel';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/FieldStatus/FieldStatus.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldStatus",
    ()=>FieldStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useEntryAnimation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useEntryAnimation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/Icon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FieldStatus$2f$useFieldStatusAnnouncement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/FieldStatus/useFieldStatusAnnouncement.js [app-ssr] (ecmascript)");
/**
 * Maps each status type to its status glyph. Mirrors the mapping the input
 * controls already use for the on-field status affordance, so the detached
 * message shows the same icon a consumer sees elsewhere for that status.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file FieldStatus.tsx
 * @input Uses React, stylex, theme tokens, useFieldStatusAnnouncement, Icon
 * @output Exports FieldStatus component, FieldStatusProps
 * @position Core implementation; consumed by Field, Switch, CheckboxInput, and the FieldStatus entrypoint
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/FieldStatus/FieldStatus.doc.mjs (props table, features, implementation notes)
 * - /packages/core/src/Field/Field.doc.mjs (compat docs when public API changes)
 * - /packages/core/src/FieldStatus/index.ts (exports if types change)
 * - /packages/core/src/FieldStatus/useFieldStatusAnnouncement.ts (announcement timing shared with Field)
 * - /packages/core/src/Field/index.ts (compat re-export if public API changes)
 * - /packages/cli/assets/templates/blocks/components/FieldStatus/ (showcase blocks)
 */ 'use client';
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
const statusIconMap = {
    warning: 'warning',
    error: 'error',
    success: 'success'
};
const ATTACHED_OVERLAP = `var(--_field-status-overlap, ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spacingVars"]['--spacing-1-5']})`;
const styles = {
    base: {
        kMeerF: "xcthrzx",
        k3XXqK: "x815t2r",
        kjBf7l: "x3teovq",
        kInvED: "xvr1dqx",
        kMv6JI: "x9ynric",
        kGuDYH: "x141an7d",
        kLWn49: "x1ltkj2j",
        kHjlTd: "xj0a0fe",
        "--_astryx-text-overflow-wrap": "x5ujdhh",
        $$css: true
    },
    attached: {
        keoZOQ: "x3dbumh",
        kLKAdn: "xdgtoc0",
        kGO01o: "x1wesfrj",
        kg3NbH: "xf314gf",
        kVL7Gh: "xquck67",
        kT0f0o: "x14i3lts",
        kfzvcC: "x47corl",
        $$css: true
    },
    detached: {
        keoZOQ: "xcsaf9d",
        k8WAf4: "xce4md1",
        kg3NbH: "xf314gf",
        kaIpWk: "xh6dtrn",
        $$css: true
    }
};
const colorStyles = {
    warning: {
        kWkggS: "x24i8r5",
        kMwMTN: "xfy1f8t",
        $$css: true
    },
    error: {
        kWkggS: "x1pritpl",
        kMwMTN: "xl8t7bd",
        $$css: true
    },
    success: {
        kWkggS: "xu13z74",
        kMwMTN: "xvchut",
        $$css: true
    }
};
function FieldStatus({ ref, type, message, id, variant = 'attached', xstyle, className, style, ...rest }) {
    const entryStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useEntryAnimation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEntryAnimation"])('slideDown');
    // Announce-on-mount is intentional: callers conditionally mount FieldStatus
    // when a status appears (and whole forms can mount with a server-side
    // validation error already present), and both cases must be heard.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FieldStatus$2f$useFieldStatusAnnouncement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFieldStatusAnnouncement"])(message, type);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        ref: ref,
        id: id,
        ...rest,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('field-status', {
            type,
            variant
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.base, entryStyle, variant === 'attached' ? styles.attached : styles.detached, colorStyles[type], xstyle), className, style),
        children: variant === 'detached' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
            ...{
                className: "x78zum5 x1cy8zhl xzye2dw"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    ...{
                        className: "x3nfvp2 x6s0dn4 x14o5nre x2lah0s"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                        icon: statusIconMap[type],
                        size: "sm",
                        color: "inherit",
                        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('field-status-icon', {
                            type
                        })
                    })
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    children: message
                })
            ]
        }) : message
    });
}
FieldStatus.displayName = 'FieldStatus';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/FieldStatus/useFieldStatusAnnouncement.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFieldStatusAnnouncement",
    ()=>useFieldStatusAnnouncement
]);
/**
 * @file useFieldStatusAnnouncement.ts
 * @input Uses React useEffect and useAnnounce
 * @output Exports the internal useFieldStatusAnnouncement hook
 * @position Internal to the field family; the one place that decides when and
 *   how loudly a field status message is spoken. FieldStatus calls it for the
 *   attached and detached message boxes, and Field calls it for the tooltip
 *   placement, which renders no FieldStatus. Not exported from the package.
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/FieldStatus/FieldStatus.tsx
 * - /packages/core/src/Field/Field.tsx
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounce$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useAnnounce.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
function useFieldStatusAnnouncement(message, type) {
    const announce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounce$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAnnounce"])();
    // Syncs the live region with the status message.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (message) {
            announce(message, type === 'error' ? 'assertive' : 'polite');
        }
    }, [
        announce,
        message,
        type
    ]);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/FormLayout/FormLayoutContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormLayoutContext",
    ()=>FormLayoutContext
]);
/**
 * @file FormLayoutContext.ts
 * @input Layer-scoped React context
 * @output Exports FormLayoutContext, FormLayoutDirection, FormOptionality, and
 *   EntryErrorBehavior types
 * @position Context for form layout direction, default optionality, and the
 *   default entry error behavior
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/FormLayout/FormLayout.tsx (prop + context value)
 * - /packages/core/src/Field/FieldLabel.tsx (indicator resolution)
 * - /packages/core/src/Field/useEntryErrorBehavior.ts (entry error behavior resolution)
 * - /packages/core/src/FormLayout/index.ts (exports if types change)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
const FormLayoutContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('FormLayoutContext', 1, {
    direction: 'vertical'
});
FormLayoutContext.displayName = 'FormLayoutContext';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Icon/Icon.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Icon",
    ()=>Icon,
    "renderIconSlot",
    ()=>renderIconSlot
]);
/**
 * @file Icon.tsx
 * @input Uses ReactSVGProps, icon components or semantic icon names, and an
 *   optional IconVariant request
 * @output Exports Icon component, IconProps, IconColor, IconSize, IconType types
 * @position Core implementation; consumed by index.ts, tested by Icon.test.tsx
 *
 * Supports two modes:
 * - Component mode: Pass an SVG icon component (e.g. from @heroicons/react) — rendered
 *   directly with and spread SVG props.
 * - String mode: Pass a semantic name (e.g. 'close', 'chevronDown') — resolved from the
 *   theme's icon registry (or built-in fallback SVGs) and wrapped in a styled span.
 *   A function registry entry receives `{size, variant}`: the size resolved by
 *   ORD1 and the requested variant when the entry can receive it.
 *
 * Both modes size the glyph from the `icon` target's private size vars
 * (`iconSizeStyles` in IconSize.stylex.ts, `registrySizeStyles` below), so a
 * theme's `width` and `height` on that target's size selector set the size's
 * glyph dimension, including the font size 1em-based registry artwork follows.
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Icon/Icon.doc.mjs (props table, features, implementation notes)
 * - /packages/core/src/Icon/Icon.test.tsx (tests for new/changed behavior)
 * - /packages/core/src/Icon/index.ts (exports if types change)
 * - /apps/storybook/stories/Icon.stories.tsx (storybook stories)
 * - /packages/cli/assets/templates/blocks/components/Icon/ (showcase blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/useTheme.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$globalIconRegistry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/globalIconRegistry.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeRefs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$IconDefaultSizeContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/IconDefaultSizeContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$IconSize$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/IconSize.stylex.js [app-ssr] (ecmascript)");
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
// =============================================================================
// Styles
// =============================================================================
const styles = {
    root: {
        kmuXW: "x2lah0s",
        $$css: true
    },
    span: {
        k1xSpc: "x3nfvp2",
        kGNEyG: "x6s0dn4",
        kjj79g: "xl56j7k",
        kmuXW: "x2lah0s",
        $$css: true
    }
};
/**
 * Size styles for string-based registry icons: the glyph dimensions
 * `iconSizeStyles` reads from the `icon` target's private vars, plus a
 * `fontSize`, because registry artwork is 1em-based. `fontSize` is the smaller
 * side, which fits square artwork into a non-square box the way an SVG viewBox
 * does.
 */ const registrySizeStyles = {
    xsm: {
        kzqmXN: "x13u0t82",
        kZKoxP: "x89eeu2",
        kGuDYH: "x1uq1jy3",
        $$css: true
    },
    sm: {
        kzqmXN: "xomy6nw",
        kZKoxP: "x14eyxzr",
        kGuDYH: "x1qzu985",
        $$css: true
    },
    md: {
        kzqmXN: "x1vvatio",
        kZKoxP: "x1jxzzob",
        kGuDYH: "xhhwgqx",
        $$css: true
    },
    lg: {
        kzqmXN: "x1gbskz6",
        kZKoxP: "xol4r8t",
        kGuDYH: "x14nqahd",
        $$css: true
    }
};
const colorStyles = {
    primary: {
        kMwMTN: "xtbr613",
        $$css: true
    },
    secondary: {
        kMwMTN: "xv9yike",
        $$css: true
    },
    tertiary: {
        kMwMTN: "xv9yike",
        $$css: true
    },
    disabled: {
        kMwMTN: "xqa6c3m",
        $$css: true
    },
    accent: {
        kMwMTN: "xqwr325",
        $$css: true
    },
    info: {
        kMwMTN: "x1gc9m53",
        $$css: true
    },
    success: {
        kMwMTN: "x1vau044",
        $$css: true
    },
    error: {
        kMwMTN: "xskb5cx",
        $$css: true
    },
    warning: {
        kMwMTN: "x4z9hng",
        $$css: true
    },
    inherit: {
        kMwMTN: "x1heor9g",
        $$css: true
    },
    blue: {
        kMwMTN: "x1fns2mt",
        $$css: true
    },
    red: {
        kMwMTN: "xeffzf7",
        $$css: true
    },
    green: {
        kMwMTN: "xmxeech",
        $$css: true
    },
    gray: {
        kMwMTN: "x1eyinzz",
        $$css: true
    },
    cyan: {
        kMwMTN: "x157w0xa",
        $$css: true
    },
    teal: {
        kMwMTN: "x1f3zxcb",
        $$css: true
    },
    yellow: {
        kMwMTN: "x1g6zdft",
        $$css: true
    },
    orange: {
        kMwMTN: "xxu74a4",
        $$css: true
    },
    pink: {
        kMwMTN: "x1kxxfg5",
        $$css: true
    },
    purple: {
        kMwMTN: "xzdw94u",
        $$css: true
    }
};
// =============================================================================
// Types
// =============================================================================
/**
 * Type for icon components that can be passed to Icon.
 * Use this type when accepting an icon prop in other components.
 */ /**
 * Props for Icon component.
 * Extends SVGProps to allow passing additional SVG attributes (used when icon is a component).
 */ /**
 * Derives the ARIA attributes for an icon from its `label` prop.
 *
 * - Non-empty `label` → meaningful image: `role="img"` + `aria-label`, and no
 *   `aria-hidden` (an `aria-hidden` element is removed from the accessibility
 *   tree, so its accessible name would be ignored). Icon passes
 *   `aria-hidden: undefined`. Many icon components, such as Heroicons, write
 *   `aria-hidden="true"` unless a prop replaces it.
 * - Omitted or empty `label` → decorative default: `aria-hidden="true"`.
 *
 * The result is spread BEFORE `{...props}` in both render modes so an explicit
 * `aria-hidden` / `role` / `aria-label` from the consumer always wins.
 */ function getIconA11yProps(label) {
    return label != null && label !== '' ? {
        role: 'img',
        'aria-label': label,
        'aria-hidden': undefined
    } : {
        'aria-hidden': 'true'
    };
}
function Icon({ icon, color = 'inherit', size: sizeProp, variant, label, ref, className, style, xstyle, ...props }) {
    const size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$IconDefaultSizeContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIconSize"])(sizeProp);
    // Derive ARIA from `label`: decorative (aria-hidden) by default, or a
    // meaningful image (role="img" + aria-label) when `label` is non-empty.
    const a11yProps = getIconA11yProps(label);
    // String mode: resolve from icon registry, wrap in styled span
    if (typeof icon === 'string') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(IconFromRegistry, {
            name: icon,
            color: color,
            size: size,
            variant: variant,
            a11yProps: a11yProps,
            className: className,
            style: style,
            xstyle: xstyle,
            svgRef: ref,
            spanProps: props
        });
    }
    // Component mode: render SVG component directly with ref forwarding. A
    // supplied component never receives `variant`; it was destructured above.
    const IconComponent = icon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(IconComponent, {
        ref: ref,
        ...a11yProps,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('icon', {
            size,
            color
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.root, colorStyles[color], __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$IconSize$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["iconSizeStyles"][size], xstyle), className ?? undefined, style),
        ...props
    });
}
Icon.displayName = 'Icon';
// =============================================================================
// Internal: Registry Icon Renderer
// =============================================================================
/**
 * Internal component that resolves a semantic icon name from the registry
 * and renders it in a styled span with proper sizing.
 *
 * Extracted as a separate component so the registry is only read when the
 * icon prop is a string. A function entry receives the resolved size and the
 * requested variant when the entry can receive it.
 */ function IconFromRegistry({ name, color, size, variant, a11yProps, className, style, xstyle, svgRef, spanProps }) {
    const themeName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useThemeName"])();
    const resolvedIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$globalIconRegistry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveIcon"])(name, themeName, {
        size,
        variant
    });
    // The glyph can change while the span stays. Attach the ref again when it
    // does.
    const attachSvgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((span)=>svgRef == null ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeRefs"])(svgRef)(span?.querySelector('svg') ?? null), // eslint-disable-next-line @eslint-react/exhaustive-deps -- resolveIcon's inputs: a new glyph gets a new attach, and a function entry's new element each render does not.
    [
        svgRef,
        name,
        themeName,
        size,
        variant
    ]);
    if (resolvedIcon == null) {
        return null;
    }
    // The styling props (className, style, xstyle) are handled here so they
    // COMPOSE with the internal astryx-icon + StyleX classes/styles instead of
    // being shadowed by the later spread: xstyle folds into stylex.props, and
    // className/style merge via mergeProps. Other span props keep their prior
    // precedence (spread before the internal merge).
    const restSpanProps = spanProps ?? {};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
        ref: svgRef == null ? undefined : attachSvgRef,
        ...a11yProps,
        ...restSpanProps,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('icon', {
            size,
            color
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.span, colorStyles[color], registrySizeStyles[size], xstyle), className ?? undefined, style),
        children: resolvedIcon
    });
}
function renderIconSlot(icon, props) {
    if (typeof icon === 'string') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Icon, {
            icon: icon,
            ...props
        });
    }
    if (typeof icon === 'function' || typeof icon === 'object' && icon !== null && 'render' in icon) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Icon, {
            icon: icon,
            ...props
        });
    }
    return icon;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Icon/IconDefaultSizeContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IconDefaultSizeProvider",
    ()=>IconDefaultSizeProvider,
    "useIconSize",
    ()=>useIconSize
]);
/**
 * @file IconDefaultSizeContext.ts
 * @input Uses layer-scoped React context and an optional Icon size prop
 * @output Supplies a component-owned default size to descendant Icon instances
 * @position Internal Icon sizing context; consumed by Icon and icon-slot owners
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const IconDefaultSizeContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('IconDefaultSizeContext', 1, null);
IconDefaultSizeContext.displayName = 'IconDefaultSizeContext';
const IconDefaultSizeProvider = IconDefaultSizeContext.Provider;
function useIconSize(size) {
    const contextualSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(IconDefaultSizeContext);
    return size ?? contextualSize ?? 'md';
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Icon/IconSize.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file IconSize.stylex.ts
 * @input Defines the Icon size scale and reads the `icon` target's private
 *   `--_icon-width` / `--_icon-height` vars
 * @output Exports shared Icon size types and StyleX styles
 * @position Internal Icon sizing source; consumed by Icon and icon-slot owners
 *
 * SYNC: When the private vars change, update Icon.tsx (registrySizeStyles),
 * derivedVarRegistry.ts, and the `theming.vars` / `theming.derived` entries in
 * Icon.doc.mjs.
 */ __turbopack_context__.s([
    "iconBoxSizeStyles",
    ()=>iconBoxSizeStyles,
    "iconSizeStyles",
    ()=>iconSizeStyles
]);
;
/**
 * Icon sizes are expressed in `rem` so they scale with the root font-size.
 * Values are the px-equivalents at a 16px root: 12, 16, 20, and 24px.
 */ const iconSizeValues = {
    xsm: '0.75rem',
    sm: '1rem',
    md: '1.25rem',
    lg: '1.5rem'
};
const iconSizeStyles = {
    xsm: {
        kzqmXN: "x13u0t82",
        kZKoxP: "x89eeu2",
        $$css: true
    },
    sm: {
        kzqmXN: "xomy6nw",
        kZKoxP: "x14eyxzr",
        $$css: true
    },
    md: {
        kzqmXN: "x1vvatio",
        kZKoxP: "x1jxzzob",
        $$css: true
    },
    lg: {
        kzqmXN: "x1gbskz6",
        kZKoxP: "xol4r8t",
        $$css: true
    }
};
const iconBoxSizeStyles = {
    xsm: {
        kzqmXN: "x1jw3ynk",
        kZKoxP: "xvle69y",
        kGuDYH: "xboafo0",
        $$css: true
    },
    sm: {
        kzqmXN: "xcdlrvm",
        kZKoxP: "x1l36t39",
        kGuDYH: "x1jchvi3",
        $$css: true
    },
    md: {
        kzqmXN: "xwqq7k2",
        kZKoxP: "xmll18r",
        kGuDYH: "x1603h9y",
        $$css: true
    },
    lg: {
        kzqmXN: "xp8d6y2",
        kZKoxP: "xam5rvr",
        kGuDYH: "xngnso2",
        $$css: true
    }
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Icon/defaultIcons.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultIcons",
    ()=>defaultIcons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file defaultIcons.tsx
 * @input Uses React JSX for inline SVGs
 * @output Exports defaultIcons registry with lightweight SVG fallbacks
 * @position Fallback icons used when no theme provides an icon registry
 *
 * These are intentionally minimal inline SVGs (~1.4KB total) that provide
 * basic visual completeness without any external icon library dependency.
 * Themes should override these with higher-quality icons from a proper
 * icon library (heroicons, lucide, Material Symbols, etc.).
 *
 * All icons:
 * - Use a 24x24 viewBox
 * - Use currentColor for stroke/fill (inherits from parent)
 * - Are aria-hidden (decorative by default)
 * - Use stroke-based rendering with 1.5px stroke width (matching heroicons outline style)
 * - Status icons (checkCircle, xCircle, warning, info) use solid fills for better color visibility
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Icon/globalIconRegistry.tsx (IconName type if names change)
 * - /packages/core/src/Icon/Icon.doc.mjs (fallback icon documentation)
 */ const svgProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    width: '1em',
    height: '1em',
    'aria-hidden': true
};
/**
 * Props for solid/filled SVG icons.
 * Status icons (checkCircle, xCircle, warning, info) use solid fills for better
 * color visibility at small sizes, matching the heroicons solid style
 * used by themes.
 */ const solidSvgProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    width: '1em',
    height: '1em',
    'aria-hidden': true
};
const defaultIcons = {
    /** ✕ — two diagonal lines */ close: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M6 6l12 12M6 18L18 6"
        })
    }),
    /** ▾ — downward chevron */ chevronDown: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M6 9l6 6 6-6"
        })
    }),
    /** ⌄ — compact NumberInput stepper chevron */ 'numberInput:stepperDown': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M7.5 9.75l4.5 4.5 4.5-4.5"
        })
    }),
    /** ‹ — left chevron */ chevronLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M15 6l-6 6 6 6"
        })
    }),
    /** › — right chevron */ chevronRight: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M9 6l6 6-6 6"
        })
    }),
    /** « — double left chevron (first / jump to start) */ chevronsLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M18 6l-6 6 6 6M11 6l-6 6 6 6"
        })
    }),
    /** » — double right chevron (last / jump to end) */ chevronsRight: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M6 6l6 6-6 6M13 6l6 6-6 6"
        })
    }),
    /** ✓ — checkmark */ check: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M5 13l4 4L19 7"
        })
    }),
    /** ✓ in circle — success state (solid fill for status visibility) */ success: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...solidSvgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M12 3a9 9 0 100 18 9 9 0 000-18zm4.06 6.56a.75.75 0 00-1.12-1l-3.94 4.4-1.94-1.94a.75.75 0 00-1.06 1.06l2.5 2.5a.75.75 0 001.09-.03l4.47-5z"
        })
    }),
    /** ✕ in circle — error state (solid fill for status visibility) */ error: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...solidSvgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M12 3a9 9 0 100 18 9 9 0 000-18zm-2.47 5.47a.75.75 0 00-1.06 1.06L10.94 12l-2.47 2.47a.75.75 0 101.06 1.06L12 13.06l2.47 2.47a.75.75 0 101.06-1.06L13.06 12l2.47-2.47a.75.75 0 00-1.06-1.06L12 10.94l-2.47-2.47z"
        })
    }),
    /** △ with ! — warning (solid fill for status visibility) */ warning: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...solidSvgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M10.29 3.86L2.07 19.05A2 2 0 003.78 22h16.44a2 2 0 001.71-2.95L13.71 3.86a2 2 0 00-3.42 0zM12 9a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 9zm0 9a1 1 0 100-2 1 1 0 000 2z"
        })
    }),
    /** ⓘ — information (solid fill for status visibility) */ info: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...solidSvgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M12 3a9 9 0 100 18 9 9 0 000-18zm0 4a1 1 0 100 2 1 1 0 000-2zm-.75 3.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5z"
        })
    }),
    /** 📅 — calendar */ calendar: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        ...svgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                x: "3",
                y: "4",
                width: "18",
                height: "18",
                rx: "2"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M16 2v4M8 2v4M3 10h18"
            })
        ]
    }),
    /** 🕐 — clock */ clock: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        ...svgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                cx: "12",
                cy: "12",
                r: "9"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M12 7v5l3 3"
            })
        ]
    }),
    /** ↗ — external link arrow */ externalLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        ...svgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M15 3h6v6"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M10 14L21 3"
            })
        ]
    }),
    /** ☰ — hamburger menu (three horizontal lines) */ menu: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M4 6h16M4 12h16M4 18h16"
        })
    }),
    /** ⋯ — three horizontal dots (more/overflow) */ moreHorizontal: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        ...solidSvgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                cx: "5",
                cy: "12",
                r: "1.5"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                cx: "12",
                cy: "12",
                r: "1.5"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                cx: "19",
                cy: "12",
                r: "1.5"
            })
        ]
    }),
    /** 🔍 — magnifying glass (search) */ search: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        ...svgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                cx: "11",
                cy: "11",
                r: "8"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M21 21l-4.35-4.35"
            })
        ]
    }),
    /** ⇧ — upload into a tray */ upload: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M12 16V4m0 0L7 9m5-5l5 5M4 15v4a2 2 0 002 2h12a2 2 0 002-2v-4"
        })
    }),
    /** ↑ — arrow up (sort ascending) */ arrowUp: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M12 19V5m0 0l-7 7m7-7l7 7"
        })
    }),
    /** ↓ — arrow down (sort descending) */ arrowDown: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M12 5v14m0 0l7-7m-7 7l-7-7"
        })
    }),
    /** ↕ — arrows up-down (unsorted / sortable indicator) */ arrowsUpDown: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
        })
    }),
    /** 🔽 — funnel (filter indicator) */ funnel: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
        })
    }),
    /** 👁‍🗨 — eye with slash (hidden column) */ eyeSlash: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
        })
    }),
    /** ☐☐ — view columns (column settings) */ viewColumns: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"
        })
    }),
    /** clipboard — copy to clipboard */ copy: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        ...svgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L16.083 2.57A2 2 0 0014.685 2H10a2 2 0 00-2 2z"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M16 18v2a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2"
            })
        ]
    }),
    /** ✓✓ — double checkmark (delivered/read) */ checkDouble: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        ...svgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M2 13l4 4L14 7"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M9 13l4 4L21 7"
            })
        ]
    }),
    wrench: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        })
    }),
    /** ■ — stop (rounded square, solid fill for media control) */ stop: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...solidSvgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("rect", {
            x: "6",
            y: "6",
            width: "12",
            height: "12",
            rx: "2"
        })
    }),
    /** 🎤 — microphone (voice input / dictation) */ microphone: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        ...svgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M12 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3z"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M19 10v1a7 7 0 01-14 0v-1"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M12 18v4m-4 0h8"
            })
        ]
    })
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Icon/globalIconRegistry.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getExtendedIcon",
    ()=>getExtendedIcon,
    "getIcon",
    ()=>getIcon,
    "getIconRegistry",
    ()=>getIconRegistry,
    "registerIcons",
    ()=>registerIcons,
    "resetIcons",
    ()=>resetIcons,
    "resolveComponentIcon",
    ()=>resolveComponentIcon,
    "resolveIcon",
    ()=>resolveIcon
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file globalIconRegistry.tsx
 * @input Theme icon entries (a DefinedTheme or a registered theme name), the
 *   process-wide registry, and built-in defaults
 * @output Exports registerIcons, getIconRegistry, getIcon, getExtendedIcon,
 *   resetIcons, resolveIcon and resolveComponentIcon (internal), IconName,
 *   IconRegistry, IconEntry, IconRequest
 * @position Global and theme-scoped icon registry and component icon slot
 *   resolution; works in server and client environments
 *
 * This module has NO 'use client' directive — it's importable from RSC.
 * Components resolve semantic icons through getIcon() or the client useIcon() hook.
 *
 * An entry is a React node or a pure synchronous function of an
 * {@link IconRequest}. Resolution picks one source — theme entry, then
 * process-wide registration, then built-in default; a nullish static entry
 * falls through — and a selected function's result is final. `Icon` passes
 * its resolved size and a variant the entry can receive (listed by the active
 * theme and, for a theme entry, by the theme that defined it), otherwise
 * `undefined`; the public reads below pass `{size: 'md'}`.
 *
 * `resolveComponentIcon` is the only caller of a theme's `componentIcons`
 * slot functions. It turns a slot, its state, and the component's own
 * fallback into the request the component renders through `Icon`.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$defaultIcons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/defaultIcons.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeRegistry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/themeRegistry.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/devWarning.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedForReact$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedForReact.js [app-ssr] (ecmascript)");
;
;
;
;
// =============================================================================
// Types
// =============================================================================
/**
 * Semantic icon names used internally by Astryx components.
 *
 * These represent the functional purpose of each icon, not a specific
 * visual representation. Themes provide the actual icon components.
 */ // SYNC: packages/cli/assets/docs/icons.doc.mjs — update USAGE_HINTS when adding names
/**
 * A namespaced extension key, `'<namespace>:<name>'`.
 *
 * This is the tier for a glyph that belongs to one component or library rather
 * than to the system: `'richtext:bold'`, `'numberInput:stepperDown'`. A theme
 * overrides it by key through `registerIcons` or `defineTheme({icons})`,
 * exactly as it overrides a built-in name, and the core {@link IconName} union
 * stays reserved for glyphs the whole system shares.
 *
 * Accepted anywhere a built-in name is, including `<Icon icon>` — which is
 * what lets a namespaced glyph keep `size`, `color` and `xstyle`.
 */ /**
 * A semantic icon name — either one of the built-in {@link IconName}s or an
 * arbitrary string key contributed by a library/app.
 *
 * The `(string & {})` intersection keeps the built-in names available for
 * autocomplete while still allowing any string, so downstream libraries can
 * register and resolve their own keys (e.g. `'richtext:bold'`) without having
 * to widen the core `IconName` union.
 */ /**
 * A complete icon registry: every semantic name mapped to a React node.
 */ /**
 * What `Icon` asks a function icon entry for: the final Icon size, resolved
 * explicit `size` → owning component's default → `'md'`, and a variant name
 * or `undefined`.
 *
 * Inside `defineTheme`, `Variant` is the theme's listed `iconVariants`; a
 * process-wide registration receives {@link IconVariant}.
 */ /**
 * A theme or process-wide icon entry: a React node, or a pure synchronous
 * function of the {@link IconRequest} that returns one.
 *
 * A function computes its result from the request only — no hooks, DOM or
 * SVG measurement, browser globals, network access, mutable module state, or
 * side effects. Once selected, its result is final: returning `null` or
 * `undefined` renders no glyph instead of falling through to another source.
 *
 * @example
 * ```
 * defineTheme({
 *   name: 'brand',
 *   icons: {
 *     info: ({size}) => <InfoIcon weight={size === 'sm' ? 'bold' : 'regular'} />,
 *   },
 * });
 * ```
 */ /**
 * How resolution holds any entry: an entry typed for some variant names
 * accepts a request with none of them.
 */ /** The request every public, one-argument read uses. */ const PUBLIC_READ_REQUEST = {
    size: 'md'
};
// =============================================================================
// Global Registry
// =============================================================================
// Every copy of Core on one React shares this registry. Entries are React
// elements, so a second React keeps its own.
const registry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedForReact$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedForReact"])('icon/global-icon-registry/state', 1, ()=>({
        entries: {}
    }));
/**
 * A key is namespaced when it carries a `<namespace>:` prefix — the runtime
 * form of {@link NamespacedIconName}, which is how the typed
 * {@link getIconRegistry} snapshot tells a built-in name from a component- or
 * library-owned one.
 */ function isNamespacedKey(name) {
    return name.includes(':');
}
function getTheme(source) {
    return typeof source === 'string' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeRegistry$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRegisteredTheme"])(source) : source ?? null;
}
/**
 * The theme's icon entries, functions included. A theme from `defineTheme`
 * keeps them in `__icons` when any entry is a function (its public `icons`
 * is the node view); otherwise `icons` already holds them.
 */ function getThemeIconEntries(theme) {
    if (theme == null) {
        return null;
    }
    return theme.__icons ?? theme.icons ?? null;
}
/**
 * The selected entry, with every variant list a requested variant must be in
 * for the entry to receive it. No lists: the entry receives no variant.
 */ /**
 * Pick the one source that answers `name`: the theme entry, then the
 * process-wide registration, then the built-in default, then `fallback`. A
 * nullish static entry falls through; a function is returned as-is, because
 * its result is final.
 *
 * A theme entry may receive a variant listed by the active theme and by the
 * theme that defined the entry (an inherited entry keeps its defining
 * theme's list). A process-wide registration may receive a variant the
 * active theme lists.
 */ function selectIconEntry(name, source, fallback) {
    const theme = getTheme(source);
    const activeVariants = theme?.iconVariants;
    const themeEntry = getThemeIconEntries(theme)?.[name];
    if (theme != null && themeEntry != null) {
        const definingVariants = theme.__iconEntryVariants != null && Object.hasOwn(theme.__iconEntryVariants, name) ? theme.__iconEntryVariants[name] : activeVariants;
        return {
            entry: themeEntry,
            variantLists: [
                activeVariants,
                definingVariants
            ]
        };
    }
    const globalEntry = registry.entries[name];
    if (globalEntry != null) {
        return {
            entry: globalEntry,
            variantLists: [
                activeVariants
            ]
        };
    }
    return {
        entry: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$defaultIcons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultIcons"][name] ?? fallback,
        variantLists: []
    };
}
/**
 * Read a selected entry for a request: call a function, return a node as-is.
 * The function receives the requested variant only when every list of the
 * selection contains it; otherwise it receives `undefined`.
 */ function readIconEntry({ entry, variantLists }, { size, variant }) {
    if (typeof entry !== 'function') {
        return entry;
    }
    const receivable = variant !== undefined && variantLists.length > 0 && variantLists.every((list)=>list?.includes(variant) === true);
    // A receivable variant is one the entry's theme lists, which is the type
    // the entry was written against.
    return entry(receivable ? {
        size,
        variant
    } : {
        size
    });
}
function resolveIcon(name, source, request) {
    return readIconEntry(selectIconEntry(name, source), request);
}
function registerIcons(icons) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["warnOnce"])('icon-registry:global-register-icons', 'Icon', '`registerIcons()` applies icon overrides globally. Prefer `defineTheme({ icons })` for theme-scoped icon overrides.');
    registry.entries = {
        ...registry.entries,
        ...icons
    };
}
function getIconRegistry(source) {
    const registry = {};
    // Only surface built-in IconName keys here — namespaced keys, whether
    // contributed by a library or shipped as a component's own default, are
    // resolved via getIcon/getExtendedIcon and intentionally kept out of the
    // typed IconRegistry snapshot.
    const names = new Set(Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$defaultIcons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultIcons"]));
    for (const name of Object.keys(getThemeIconEntries(getTheme(source)) ?? {})){
        names.add(name);
    }
    for (const name of names){
        if (isNamespacedKey(name)) {
            continue;
        }
        registry[name] = readIconEntry(selectIconEntry(name, source), PUBLIC_READ_REQUEST);
    }
    return registry;
}
function getIcon(name, source) {
    return readIconEntry(selectIconEntry(name, source), PUBLIC_READ_REQUEST);
}
function getExtendedIcon(name, fallback, source) {
    return readIconEntry(selectIconEntry(name, source, fallback), PUBLIC_READ_REQUEST);
}
// =============================================================================
// Component icon slots
// =============================================================================
/**
 * A theme's stored value for a slot, function included. A function was typed
 * for its slot's state; resolution passes it the state of that slot only.
 */ /** The state a slot's component passes: `undefined` for a stateless slot. */ /**
 * What a component renders for a slot when the theme maps nothing: its own
 * icon name (or `null` for none), and optionally its own variant and size.
 */ /** A slot resolved to what the component renders through `Icon`. */ const ICON_SIZES = new Set([
    'xsm',
    'sm',
    'md',
    'lg'
]);
function isIconName(value) {
    return typeof value === 'string' && !isNamespacedKey(value) && Object.hasOwn(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$defaultIcons$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultIcons"], value);
}
/**
 * The theme's slot values, functions included. A theme from `defineTheme`
 * keeps them in `__componentIcons` when any value is a function (its public
 * `componentIcons` is the static view); otherwise `componentIcons` holds them.
 */ function getThemeComponentIcons(theme) {
    if (theme == null) {
        return null;
    }
    return theme.__componentIcons ?? theme.componentIcons ?? null;
}
function warnMalformedRequest(slot, problem) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["warnOnce"])(`component-icons:${slot}:${problem}`, 'Icon', `componentIcons["${slot}"] ${problem}. The component keeps its own value for that field.`);
}
/**
 * Apply a theme's request to the component's fallback, field by field. A
 * missing field keeps the fallback. An unknown icon, a variant the active
 * theme does not list, or an unsupported size is ignored with one
 * development-only warning.
 */ function applyComponentIconRequest(slot, fallback, request, theme) {
    if (request === undefined) {
        return fallback;
    }
    if (request === null) {
        return {
            ...fallback,
            icon: null
        };
    }
    if (typeof request !== 'object' || Array.isArray(request)) {
        warnMalformedRequest(slot, `returned ${JSON.stringify(request)}, which is not a request`);
        return fallback;
    }
    const { icon, variant, size } = request;
    let resolved = fallback;
    if (icon === null || isIconName(icon)) {
        resolved = {
            ...resolved,
            icon
        };
    } else if (icon !== undefined) {
        warnMalformedRequest(slot, `requests the unknown icon ${JSON.stringify(icon)}`);
    }
    if (typeof variant === 'string' && theme?.iconVariants?.includes(variant)) {
        resolved = {
            ...resolved,
            variant
        };
    } else if (variant !== undefined) {
        warnMalformedRequest(slot, `requests the variant ${JSON.stringify(variant)}, which the theme does not list`);
    }
    if (ICON_SIZES.has(size)) {
        resolved = {
            ...resolved,
            size: size
        };
    } else if (size !== undefined) {
        warnMalformedRequest(slot, `requests the unsupported size ${JSON.stringify(size)}`);
    }
    return resolved;
}
function resolveComponentIcon(slot, state, fallback, source) {
    const own = fallback === null || typeof fallback === 'string' ? {
        icon: fallback
    } : fallback;
    const theme = getTheme(source);
    const value = getThemeComponentIcons(theme)?.[slot];
    if (value === undefined) {
        return own;
    }
    if (typeof value === 'function') {
        const result = value(state);
        if (typeof result === 'string') {
            warnMalformedRequest(slot, `returned ${JSON.stringify(result)}, which is not a request`);
            return own;
        }
        return applyComponentIconRequest(slot, own, result, theme);
    }
    if (typeof value === 'string') {
        return applyComponentIconRequest(slot, own, {
            icon: value
        }, theme);
    }
    return applyComponentIconRequest(slot, own, value, theme);
}
function resetIcons() {
    registry.entries = {};
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Indicator/indicator.markers.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
__turbopack_context__.s([
    "indicatorScope",
    ()=>indicatorScope
]);
;
const indicatorScope = {
    x1odsvnm: "x1odsvnm",
    $$css: true
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/InfoTip/InfoTip.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InfoTip",
    ()=>InfoTip
]);
/**
 * @file InfoTip.tsx
 * @input Uses React, StyleX, useTooltip, Icon, useComponentTranslator, the
 *   shared touch hit area, color/spacing/radius/duration/ease tokens
 * @output Exports InfoTip component, InfoTipProps, InfoTipSize types
 * @position Core implementation; consumed by index.ts, tested by
 *   InfoTip.test.tsx; `@astryxdesign/lab` re-exports it, deprecated
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/InfoTip/InfoTip.doc.mjs (props table, features)
 * - /docs/specs/components/InfoTip/InfoTip.spec.md (contract)
 * - /packages/core/src/InfoTip/InfoTip.test.tsx (tests for new/changed behavior)
 * - /packages/core/src/InfoTip/index.ts (exports if types change)
 * - /packages/cli/assets/templates/blocks/components/InfoTip/ (showcase and example blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMergedRefs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/Icon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerClickBoundary$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerClickBoundary.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/useTooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$InfoTip$2f$InfoTip$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/InfoTip/InfoTip.generated.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/focusOutline.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchHitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/touchHitArea.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$internal$2f$touchHitArea$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/internal/touchHitArea.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-ssr] (ecmascript)");
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerEnglishFallback"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$InfoTip$2f$InfoTip$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
/**
 * Size of the info icon. Maps 1:1 to Icon sizes
 * (xsm: 12px, sm: 16px, md: 20px, lg: 24px).
 */ const styles = {
    trigger: {
        kVAEAm: "x1n2onr6",
        k1xSpc: "x3nfvp2",
        kGNEyG: "x6s0dn4",
        kjj79g: "xl56j7k",
        kXLuUW: "xxymvpz",
        kmVPX3: "x12nba7r",
        kogj98: "x1ghz6dp",
        ksu8eU: "xng3xce",
        kWkggS: "xjbqb8w",
        kaIpWk: "xjspbzw",
        kkrTdU: "x1ypdohk x16khyan",
        kMwMTN: "xv9yike x10ue8fs",
        k1ekBW: "xt3l3uh",
        kIyJzY: "xuedmi6",
        kAMwcw: "xlr8y92",
        $$css: true
    }
};
function InfoTip({ content, label, size = 'sm', ref, xstyle, className, style, ...rest }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    const hitAreaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchHitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTouchHitArea"])(true);
    // Whether a press pinned the help. A hover or focus preview is not pinned.
    const [isPinned, setIsPinned] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Whether the help shows, pinned or previewed: the button names it in
    // `aria-controls` only then.
    const [isShown, setIsShown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleShow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setIsShown(true), []);
    // Every close ends the pin: a second press, Escape, a press outside, or
    // focus leaving.
    const handleHide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsShown(false);
        setIsPinned(false);
    }, []);
    const tooltip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTooltip"])({
        onShow: handleShow,
        onHide: handleHide
    });
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMergedRefs"])(ref, hitAreaRef, tooltip.ref);
    // A primary mouse or pen press on a preview calls show() first. The hook's
    // press-to-close then leaves it open. The click pins it.
    const handlePointerDownCapture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        if (event.button !== 0 || event.pointerType === 'touch' || isPinned || !isShown) {
            return;
        }
        tooltip.show();
    }, [
        isPinned,
        isShown,
        tooltip
    ]);
    // A click, tap, Enter, or Space pins the help, and the next one closes it.
    // The press stops at the button: a clickable row, card, or label around it
    // does nothing, and document listeners still see it.
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerClickBoundary$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stopInReactTree"])(event);
        event.preventDefault();
        if (isPinned) {
            tooltip.hide();
            return;
        }
        tooltip.show();
        setIsPinned(true);
    }, [
        isPinned,
        tooltip
    ]);
    // No Escape handler of its own. The tooltip's entry in the shared dismissal
    // stack takes Escape, so one press never closes both the help and an
    // enclosing Dialog.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("button", {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pickDataAttributes"])(rest),
                ref: mergedRef,
                type: "button",
                "aria-label": label ?? t('@astryx.infoTip.label'),
                "aria-describedby": tooltip.describedBy,
                "aria-expanded": isPinned,
                "aria-controls": isShown ? tooltip.describedBy : undefined,
                onPointerDownCapture: handlePointerDownCapture,
                onClick: handleClick,
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusOutlineStyles"].focusVisible, styles.trigger, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$internal$2f$touchHitArea$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["touchHitAreaStyles"].layer, xstyle), className, style),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                    icon: "info",
                    size: size
                })
            }),
            tooltip.renderTooltip(content)
        ]
    });
}
InfoTip.displayName = 'InfoTip';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/InputGroup/InputGroupContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InputGroupContext",
    ()=>InputGroupContext,
    "useInputGroup",
    ()=>useInputGroup
]);
/**
 * @file InputGroupContext.ts
 * @input Layer-scoped React context/use
 * @output Exports InputGroup context and useInputGroup hook
 * @position Shared context; consumed by input components for group-aware styling and ARIA associations
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const InputGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('InputGroupContext', 1, null);
InputGroupContext.displayName = 'InputGroupContext';
function useInputGroup() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(InputGroupContext);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/InputGroup/InputGroupInternalContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InputGroupInternalContext",
    ()=>InputGroupInternalContext
]);
/**
 * @file InputGroupInternalContext.ts
 * @input Layer-scoped React context
 * @output Package-private InputGroup state context
 * @position Internal group state; not re-exported by index.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
const InputGroupInternalContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('InputGroupInternalContext', 1, {
    isDisabled: false
});
InputGroupInternalContext.displayName = 'InputGroupInternalContext';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/InputGroup/groupStyles.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file groupStyles.ts
 * @input Uses StyleX, theme tokens, and layer-aware group end-cap selectors
 * @output Exports shared group-aware styles for InputGroup children
 * @position Shared styles consumed by InputGroup-compatible controls and addons
 */ __turbopack_context__.s([
    "groupStyles",
    ()=>groupStyles,
    "inputGroupItemProps",
    ()=>inputGroupItemProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
;
;
;
const inputGroupItemProps = {
    'data-astryx-input-group-item': ''
};
const MEMBER = '[data-astryx-input-group-item]';
// Anything a caller places after a member (a wrapped Button, a custom element)
// still counts as following it, so the trailing edge keeps today's rule over
// any sibling; only context-layer infrastructure (popovers, inert markers,
// native dialog surfaces) is skipped. Followers are not always members, so
// this rule cannot name them by the marker.
//
// `:nth-last-child(1 of S)`, not `:not(:has(~ S))`: the stylesheet is global,
// and WebKit re-evaluates a sibling-relative `:has()` against every earlier
// sibling on each insertion, so filling any container became quadratic
// (ButtonGroup FR3). A member always matches S, so being the last of S is the
// same as having no following S.
const IS_LAST_ITEM = ':nth-last-child(1 of :not([popover]):not(template):not(dialog))';
const FOLLOWED = `:not(${IS_LAST_ITEM})`;
// Button consumes InputGroup context anywhere below the group, including buttons
// inside an input's own implementation. Keep the visual adaptation on direct
// children so internal clear, calendar, and disclosure actions stay unchanged.
const DIRECT_INPUT_GROUP_ADDON = `:where(.astryx-input-group > ${MEMBER})`;
const DIRECT_INPUT_GROUP_ADDON_FOCUS_VISIBLE = `${DIRECT_INPUT_GROUP_ADDON}:focus-visible`;
const DIRECT_INPUT_GROUP_ADDON_NOT_FIRST = `${DIRECT_INPUT_GROUP_ADDON}:not(:first-child)`;
const DIRECT_INPUT_GROUP_ADDON_WITH_MEMBER_AFTER = `${DIRECT_INPUT_GROUP_ADDON}${FOLLOWED}`;
const groupStyles = {
    buttonAddon: {
        krdFHd: "x132ell6",
        kVL7Gh: "x1y3chn8",
        kfmiAY: "x1lsh8a1",
        kT0f0o: "xz46atp",
        kZKoxP: "x1y436bp",
        kY2c9j: "xf5goe6",
        $$css: true
    },
    inGroup: {
        kUk6DE: "x98rzlu",
        k7Eaqz: "xeuugli",
        kZKoxP: "x5yr21d",
        keTefX: "xd10s4z x1pwwqoy",
        krdFHd: "x15mokao x8eehn2",
        kVL7Gh: "xbiv7yw x1xrp5p4",
        kfmiAY: "x1ga7v0g x1ursdma",
        kT0f0o: "x16uus16 x1qa286i",
        kXnDq0: "x1pc0aet",
        $$css: true
    }
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/InteractiveRoleContext/InteractiveRoleContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InteractiveRoleContext",
    ()=>InteractiveRoleContext,
    "useInteractiveRoleContext",
    ()=>useInteractiveRoleContext
]);
/**
 * @file InteractiveRoleContext.ts
 * @input createSharedContext, use
 * @output Exports InteractiveRoleContext, useInteractiveRoleContext
 * @position Context primitive; consumed by useInteractiveRole hook
 *
 * Provides a role override to optionally-interactive child components.
 * When a parent (Popover, DropdownMenu, etc.) needs its child to render
 * as a button, it wraps the child in this context with role = 'button'.
 *
 * Components don't consume this directly — they use `useInteractiveRole`
 * which checks this context as one of its decision inputs.
 *
 * Follows the same pattern as SizeContext:
 *   SizeContext provides size → useSize resolves it
 *   InteractiveRoleContext provides role → useInteractiveRole resolves it
 *
 * SYNC: When modified, update:
 * - /packages/core/src/InteractiveRoleContext/index.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const InteractiveRoleContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSharedContext"])('InteractiveRoleContext', 1, null);
InteractiveRoleContext.displayName = 'InteractiveRoleContext';
function useInteractiveRoleContext() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(InteractiveRoleContext);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Kbd/Kbd.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Kbd",
    ()=>Kbd
]);
/**
 * @file Kbd.tsx
 * @input Uses React, StyleX, theme tokens, shortcut key names, aliases, provider-bound translator
 * @output Exports Kbd component and KbdProps with localized shortcut text
 * @position Core implementation; renders styled keyboard shortcut indicators
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Kbd/index.ts
 * - /packages/cli/assets/templates/blocks/components/Kbd/ (showcase blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isApplePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/isApplePlatform.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Kbd$2f$Kbd$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Kbd/Kbd.generated.js [app-ssr] (ecmascript)");
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerEnglishFallback"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Kbd$2f$Kbd$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
const styles = {
    wrapper: {
        k1xSpc: "x3nfvp2",
        kGNEyG: "x6s0dn4",
        kOIVth: "xzye2dw",
        kmuXW: "x2lah0s",
        $$css: true
    }
};
/** Symbols that every platform shows. Modifier text depends on the platform. */ const KEY_DISPLAY = new Map([
    [
        'enter',
        '\u21B5'
    ],
    // ↵
    [
        'backspace',
        '\u232B'
    ],
    // ⌫
    [
        'tab',
        '\u21E5'
    ],
    // ⇥
    [
        'up',
        '\u2191'
    ],
    [
        'down',
        '\u2193'
    ],
    [
        'left',
        '\u2190'
    ],
    [
        'right',
        '\u2192'
    ],
    [
        'plus',
        '+'
    ]
]);
const APPLE_MODIFIER_DISPLAY = new Map([
    [
        'mod',
        '\u2318'
    ],
    // ⌘
    [
        'meta',
        '\u2318'
    ],
    // ⌘ — the Command key
    [
        'ctrl',
        '\u2303'
    ],
    // ⌃
    [
        'alt',
        '\u2325'
    ],
    // ⌥
    [
        'shift',
        '\u21E7'
    ] // ⇧
]);
/** Catalog keys for the modifiers' short text elsewhere and before hydration. */ const MODIFIER_SHORT_TEXT = new Map([
    [
        'mod',
        '@astryx.kbd.key.controlShort'
    ],
    [
        'ctrl',
        '@astryx.kbd.key.controlShort'
    ],
    [
        'alt',
        '@astryx.kbd.key.altShort'
    ],
    [
        'shift',
        '@astryx.kbd.key.shiftShort'
    ],
    [
        'meta',
        '@astryx.kbd.key.windowsShort'
    ]
]);
const KBD_KEY_ALIASES = new Map([
    [
        'esc',
        'escape'
    ],
    [
        'return',
        'enter'
    ]
]);
/** The server render has no platform, so it uses the non-Apple text. */ function getKeyDisplay(key, isMac, t) {
    const appleSymbol = isMac ? APPLE_MODIFIER_DISPLAY.get(key) : undefined;
    if (appleSymbol != null) {
        return appleSymbol;
    }
    const shortText = isMac ? undefined : MODIFIER_SHORT_TEXT.get(key);
    if (shortText != null) {
        return t(shortText);
    }
    if (key === 'escape') {
        return t('@astryx.kbd.key.escapeShort');
    }
    return KEY_DISPLAY.get(key) ?? key.toUpperCase();
}
/**
 * Spoken-word labels for screen readers. The visual `KEY_DISPLAY` uses glyphs
 * (⌘, ⇧, ↵, …) that assistive tech cannot announce meaningfully, so the
 * accessible name for the shortcut is built from these words instead.
 */ const KEY_LABEL = new Map([
    [
        'ctrl',
        '@astryx.kbd.key.control'
    ],
    [
        'alt',
        '@astryx.kbd.key.alt'
    ],
    [
        'shift',
        '@astryx.kbd.key.shift'
    ],
    [
        'enter',
        '@astryx.kbd.key.enter'
    ],
    [
        'backspace',
        '@astryx.kbd.key.backspace'
    ],
    [
        'escape',
        '@astryx.kbd.key.escape'
    ],
    [
        'tab',
        '@astryx.kbd.key.tab'
    ],
    [
        'up',
        '@astryx.kbd.key.up'
    ],
    [
        'down',
        '@astryx.kbd.key.down'
    ],
    [
        'left',
        '@astryx.kbd.key.left'
    ],
    [
        'right',
        '@astryx.kbd.key.right'
    ],
    [
        'plus',
        '@astryx.kbd.key.plus'
    ]
]);
function getKeyLabel(key, isMac, t) {
    if (key === 'mod') {
        return t(isMac ? '@astryx.kbd.key.command' : '@astryx.kbd.key.control');
    }
    const labelKey = KEY_LABEL.get(key);
    return labelKey ? t(labelKey) : key.toUpperCase();
}
function subscribeToPlatformChanges() {
    return ()=>{};
}
function getServerPlatformSnapshot() {
    return false;
}
function Kbd({ keys, ref, xstyle, className, style, ...rest }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    const isMac = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribeToPlatformChanges, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isApplePlatform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isApplePlatform"], getServerPlatformSnapshot);
    const keyOccurrences = new Map();
    const parts = keys.split('+').map((key)=>key.trim().toLowerCase()).map((sourceKey)=>{
        const occurrence = keyOccurrences.get(sourceKey) ?? 0;
        keyOccurrences.set(sourceKey, occurrence + 1);
        return {
            key: KBD_KEY_ALIASES.get(sourceKey) ?? sourceKey,
            reactKey: `${sourceKey}:${occurrence}`
        };
    });
    // Screen-reader name: the joined spoken labels (e.g. "Command + K"), since
    // the visual glyphs below are announced meaninglessly by assistive tech.
    const accessibleName = parts.map(({ key })=>getKeyLabel(key, isMac, t)).reduce((shortcut, key, index)=>index === 0 ? key : t('@astryx.kbd.shortcut', {
            shortcut,
            key
        }), '');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
        ...rest,
        ref: ref,
        role: "img",
        "aria-label": accessibleName,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('kbd'), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.wrapper, xstyle), className, style),
        children: parts.map(({ key, reactKey })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("kbd", {
                "aria-hidden": "true",
                ...{
                    className: "x3nfvp2 x6s0dn4 xl56j7k x16asifk x1grt7ep x1tn5z8q x7a5moj xx3sua9 x17x4s8c xlxy82 x1q0q8m5 xib2hle x1tgivj0 x9ynric x141an7d x1e4wzip x1ltkj2j x87ps6o"
                },
                children: getKeyDisplay(key, isMac, t)
            }, reactKey))
    });
}
Kbd.displayName = 'Kbd';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layout/container.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file container.stylex.ts
 * @input Uses @stylexjs/stylex, spacing from theme
 * @output StyleX utility for layout container styling
 * @position Layout utility; used by Card, Section, Dialog, BottomSheet, and
 * Drawer
 *
 * ## Public API for themes
 *
 * Themes set `padding` on container component overrides. The theme build
 * pipeline expands this to component-scoped CSS custom properties, emitting
 * the `--astryx-*` tokens that the component reads:
 *
 *   --astryx-card-padding            (shorthand — all sides; emitted)
 *   --astryx-card-padding-inline     (horizontal)
 *   --astryx-card-padding-block-start
 *   --astryx-card-padding-block-end
 *
 * Read order per level: `var(--astryx-…, <next level>)`, terminating at
 * `--spacing-4`. Same pattern for section, dialog, bottom-sheet, and
 * drawer.
 *
 * ```ts
 * components: {
 *   card: { base: { padding: '20px' } },          // → --astryx-card-padding: 20px
 *   section: { base: { padding: '12px 20px' } },  // → directional tokens
 *   dialog: { base: { padding: '16px' } },
 *   'bottom-sheet': { base: { padding: '16px' } },
 *   drawer: { base: { padding: '16px' } },
 * }
 * ```
 *
 * Internal variables (`--layout-padding-inner-x`, `--container-padding-*`,
 * `--container-corner-*`, `--_section-padding-propagated`) are implementation
 * details and must not be referenced by themes. They also do not cross an overlay boundary — see
 * `overlayPaddingReset` in padding.stylex.ts.
 *
 * SYNC: When modified, update /packages/core/src/Layout/Layout.doc.mjs
 */ __turbopack_context__.s([
    "container",
    ()=>container
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
;
;
;
/**
 * Spacing token keys for padding props.
 */ const baseStyles = {
    container: {
        kB7OPa: "x9f619",
        kZCmMZ: "x1c35znw",
        kwRFfy: "x64h4k7",
        kLKAdn: "x14m0hsi",
        kGO01o: "xc1wllq",
        "--layout-padding-own-outer-x": "x1vii845",
        "--layout-padding-own-outer-y": "xojybgt",
        $$css: true
    }
};
/**
 * Component-scoped padding tokens.
 *
 * Each container component (card, section, dialog, bottom-sheet, drawer) has
 * public CSS custom properties that themes can set. The pipeline emits the `--astryx-*` names,
 * which the component reads via `var(--astryx-…, …)`:
 *
 *   --astryx-card-padding          (shorthand — all sides)
 *   --astryx-card-padding-inline
 *   --astryx-card-padding-inline-start
 *   --astryx-card-padding-inline-end
 *   --astryx-card-padding-block-start
 *   --astryx-card-padding-block-end
 *
 * The theme build pipeline maps `padding: '20px'` on a container component
 * to these tokens. The component reads them with var() fallbacks to --spacing-4.
 *
 * This indirection exists because StyleX's useCSSLayers emits priority-0
 * custom property assignments outside any @layer, making them impossible
 * to override from @layer astryx-theme. By reading from a higher-level token,
 * the theme CSS sets the token value and the component picks it up via
 * CSS custom property cascade — no layer competition.
 */ const SP4 = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spacingVars"]['--spacing-4'];
const SP6 = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spacingVars"]['--spacing-6'];
// Card padding chains: --astryx-* then the next specificity level, terminating
// at --spacing-4. Built as chained const strings (no function calls) so StyleX
// can statically analyze them; see naming.ts for the prefix policy.
const cardShorthand = `var(--astryx-card-padding, ${SP4})`;
const cardInline = `var(--astryx-card-padding-inline, ${cardShorthand})`;
const cardInlineStart = `var(--astryx-card-padding-inline-start, ${cardInline})`;
const cardInlineEnd = `var(--astryx-card-padding-inline-end, ${cardInline})`;
const cardBlockStart = `var(--astryx-card-padding-block-start, ${cardShorthand})`;
const cardBlockEnd = `var(--astryx-card-padding-block-end, ${cardShorthand})`;
// Section padding chains: --astryx-* then the next specificity level, terminating
// at --spacing-4. Built as chained const strings (no function calls) so StyleX
// can statically analyze them; see naming.ts for the prefix policy.
// `--_section-padding-propagated` (set by an ancestor Section with explicit
// padding) is read AHEAD of the public theme token, so a propagated value
// still wins over the theme for nested sections. Splitting the two names is
// what lets an overlay drop the inherited value at its boundary while keeping
// the theme's — see `overlayPaddingReset` in padding.stylex.ts.
const sectionThemeShorthand = `var(--astryx-section-padding, ${SP4})`;
const sectionShorthand = `var(--_section-padding-propagated, ${sectionThemeShorthand})`;
const sectionInline = `var(--astryx-section-padding-inline, ${sectionShorthand})`;
const sectionInlineStart = `var(--astryx-section-padding-inline-start, ${sectionInline})`;
const sectionInlineEnd = `var(--astryx-section-padding-inline-end, ${sectionInline})`;
const sectionBlockStart = `var(--astryx-section-padding-block-start, ${sectionShorthand})`;
const sectionBlockEnd = `var(--astryx-section-padding-block-end, ${sectionShorthand})`;
// Dialog padding chains: --astryx-* then the next specificity level, terminating
// at --spacing-4. Built as chained const strings (no function calls) so StyleX
// can statically analyze them; see naming.ts for the prefix policy.
const dialogShorthand = `var(--astryx-dialog-padding, ${SP4})`;
const dialogInline = `var(--astryx-dialog-padding-inline, ${dialogShorthand})`;
const dialogInlineStart = `var(--astryx-dialog-padding-inline-start, ${dialogInline})`;
const dialogInlineEnd = `var(--astryx-dialog-padding-inline-end, ${dialogInline})`;
const dialogBlockStart = `var(--astryx-dialog-padding-block-start, ${dialogShorthand})`;
const dialogBlockEnd = `var(--astryx-dialog-padding-block-end, ${dialogShorthand})`;
// Bottom sheet padding chains: --astryx-* then the next specificity level,
// terminating at --spacing-4 like Dialog. Built as chained const strings (no
// function calls) so StyleX can statically analyze them; see naming.ts for the
// prefix policy.
const bottomSheetShorthand = `var(--astryx-bottom-sheet-padding, ${SP4})`;
const bottomSheetInline = `var(--astryx-bottom-sheet-padding-inline, ${bottomSheetShorthand})`;
const bottomSheetInlineStart = `var(--astryx-bottom-sheet-padding-inline-start, ${bottomSheetInline})`;
const bottomSheetInlineEnd = `var(--astryx-bottom-sheet-padding-inline-end, ${bottomSheetInline})`;
const bottomSheetBlockStart = `var(--astryx-bottom-sheet-padding-block-start, ${bottomSheetShorthand})`;
const bottomSheetBlockEnd = `var(--astryx-bottom-sheet-padding-block-end, ${bottomSheetShorthand})`;
// The band under a bottom sheet's grab bar (--spacing-6) is not container
// padding: the sheet publishes only the padding past it and applies the band
// on top (BottomSheetPanel). The layout padding variables keep the plain
// padding.
const bottomSheetBlockStartClear = `max(calc(${bottomSheetBlockStart} - ${SP6}), 0px)`;
// Drawer padding chains: --astryx-* then the next specificity level,
// terminating at --spacing-4 like Dialog. Built as chained const strings (no
// function calls) so StyleX can statically analyze them; see naming.ts for the
// prefix policy.
const drawerShorthand = `var(--astryx-drawer-padding, ${SP4})`;
const drawerInline = `var(--astryx-drawer-padding-inline, ${drawerShorthand})`;
const drawerInlineStart = `var(--astryx-drawer-padding-inline-start, ${drawerInline})`;
const drawerInlineEnd = `var(--astryx-drawer-padding-inline-end, ${drawerInline})`;
const drawerBlockStart = `var(--astryx-drawer-padding-block-start, ${drawerShorthand})`;
const drawerBlockEnd = `var(--astryx-drawer-padding-block-end, ${drawerShorthand})`;
const cardDefaultPaddingStyles = {
    containerPaddingInlineStart: {
        "--container-padding-inline-start": "xjmlhfd",
        $$css: true
    },
    containerPaddingInlineEnd: {
        "--container-padding-inline-end": "x1ihxwbr",
        $$css: true
    },
    containerPaddingBlockStart: {
        "--container-padding-block-start": "x1rqz8me",
        $$css: true
    },
    containerPaddingBlockEnd: {
        "--container-padding-block-end": "x1omyuck",
        $$css: true
    },
    layoutPaddingOuterX: {
        "--layout-padding-outer-x": "x14rzhog",
        $$css: true
    },
    layoutPaddingOuterY: {
        "--layout-padding-outer-y": "xjej9fs",
        $$css: true
    },
    layoutPaddingInnerX: {
        "--layout-padding-inner-x": "x4poyjn",
        $$css: true
    },
    layoutPaddingInnerY: {
        "--layout-padding-inner-y": "x1u1kw4e",
        $$css: true
    }
};
const sectionDefaultPaddingStyles = {
    containerPaddingInlineStart: {
        "--container-padding-inline-start": "x19lemt0",
        $$css: true
    },
    containerPaddingInlineEnd: {
        "--container-padding-inline-end": "xu1wldr",
        $$css: true
    },
    containerPaddingBlockStart: {
        "--container-padding-block-start": "xnw7zt4",
        $$css: true
    },
    containerPaddingBlockEnd: {
        "--container-padding-block-end": "xek4msv",
        $$css: true
    },
    layoutPaddingOuterX: {
        "--layout-padding-outer-x": "x15i0zw9",
        $$css: true
    },
    layoutPaddingOuterY: {
        "--layout-padding-outer-y": "x1vw4zgg",
        $$css: true
    },
    layoutPaddingInnerX: {
        "--layout-padding-inner-x": "x1v3gmnx",
        $$css: true
    },
    layoutPaddingInnerY: {
        "--layout-padding-inner-y": "x15yx5hm",
        $$css: true
    }
};
const dialogDefaultPaddingStyles = {
    containerPaddingInlineStart: {
        "--container-padding-inline-start": "x1tewnwq",
        $$css: true
    },
    containerPaddingInlineEnd: {
        "--container-padding-inline-end": "x11h1f2o",
        $$css: true
    },
    containerPaddingBlockStart: {
        "--container-padding-block-start": "x1g2kccc",
        $$css: true
    },
    containerPaddingBlockEnd: {
        "--container-padding-block-end": "x1gvthzm",
        $$css: true
    },
    layoutPaddingOuterX: {
        "--layout-padding-outer-x": "x1hsjncj",
        $$css: true
    },
    layoutPaddingOuterY: {
        "--layout-padding-outer-y": "x1pui4bz",
        $$css: true
    },
    layoutPaddingInnerX: {
        "--layout-padding-inner-x": "x2so38",
        $$css: true
    },
    layoutPaddingInnerY: {
        "--layout-padding-inner-y": "xinu7xd",
        $$css: true
    }
};
const bottomSheetDefaultPaddingStyles = {
    containerPaddingInlineStart: {
        "--container-padding-inline-start": "xv7mus7",
        $$css: true
    },
    containerPaddingInlineEnd: {
        "--container-padding-inline-end": "x1ui7op6",
        $$css: true
    },
    containerPaddingBlockStart: {
        "--container-padding-block-start": "x1hx5klf",
        $$css: true
    },
    containerPaddingBlockEnd: {
        "--container-padding-block-end": "x1of45zw",
        $$css: true
    },
    layoutPaddingOuterX: {
        "--layout-padding-outer-x": "x11ixy8q",
        $$css: true
    },
    layoutPaddingOuterY: {
        "--layout-padding-outer-y": "x1iwhsh0",
        $$css: true
    },
    layoutPaddingInnerX: {
        "--layout-padding-inner-x": "xp9icaw",
        $$css: true
    },
    layoutPaddingInnerY: {
        "--layout-padding-inner-y": "x10u54dy",
        $$css: true
    }
};
const drawerDefaultPaddingStyles = {
    containerPaddingInlineStart: {
        "--container-padding-inline-start": "x1mndvw9",
        $$css: true
    },
    containerPaddingInlineEnd: {
        "--container-padding-inline-end": "xlsqznw",
        $$css: true
    },
    containerPaddingBlockStart: {
        "--container-padding-block-start": "x18184ib",
        $$css: true
    },
    containerPaddingBlockEnd: {
        "--container-padding-block-end": "x1g5mqay",
        $$css: true
    },
    layoutPaddingOuterX: {
        "--layout-padding-outer-x": "x18e7m0u",
        $$css: true
    },
    layoutPaddingOuterY: {
        "--layout-padding-outer-y": "xc006j",
        $$css: true
    },
    layoutPaddingInnerX: {
        "--layout-padding-inner-x": "x1qbr0dm",
        $$css: true
    },
    layoutPaddingInnerY: {
        "--layout-padding-inner-y": "x1ek71mq",
        $$css: true
    }
};
/**
 * Map from component name to its theme default padding styles.
 * Each component reads from its own public CSS custom property.
 */ const themeDefaultStyles = {
    card: cardDefaultPaddingStyles,
    section: sectionDefaultPaddingStyles,
    dialog: dialogDefaultPaddingStyles,
    'bottom-sheet': bottomSheetDefaultPaddingStyles,
    drawer: drawerDefaultPaddingStyles
};
/**
 * Container inline padding styles for edge compensation.
 * Sets --container-padding-inline-start and --container-padding-inline-end so
 * edge-compensating children (bleed tables, dividers, etc.) know the inline
 * padding to compensate against.
 */ const containerPaddingInlineStartStyles = {
    spacing0: {
        "--container-padding-inline-start": "x1gu2k80",
        $$css: true
    },
    spacing0_5: {
        "--container-padding-inline-start": "x14ws0sr",
        $$css: true
    },
    spacing1: {
        "--container-padding-inline-start": "x1cvlban",
        $$css: true
    },
    spacing1_5: {
        "--container-padding-inline-start": "x176g23i",
        $$css: true
    },
    spacing2: {
        "--container-padding-inline-start": "x1xlrr2o",
        $$css: true
    },
    spacing3: {
        "--container-padding-inline-start": "xfdwxua",
        $$css: true
    },
    spacing4: {
        "--container-padding-inline-start": "x1dlhslv",
        $$css: true
    },
    spacing5: {
        "--container-padding-inline-start": "x1s81nki",
        $$css: true
    },
    spacing6: {
        "--container-padding-inline-start": "x1ep0dkj",
        $$css: true
    },
    spacing7: {
        "--container-padding-inline-start": "x157xojc",
        $$css: true
    },
    spacing8: {
        "--container-padding-inline-start": "xw1diwv",
        $$css: true
    },
    spacing9: {
        "--container-padding-inline-start": "xraca2a",
        $$css: true
    },
    spacing10: {
        "--container-padding-inline-start": "xserb3f",
        $$css: true
    },
    spacing11: {
        "--container-padding-inline-start": "xziclwo",
        $$css: true
    },
    spacing12: {
        "--container-padding-inline-start": "x1iiwihq",
        $$css: true
    }
};
const containerPaddingInlineEndStyles = {
    spacing0: {
        "--container-padding-inline-end": "x91ghl5",
        $$css: true
    },
    spacing0_5: {
        "--container-padding-inline-end": "x1wz3t3y",
        $$css: true
    },
    spacing1: {
        "--container-padding-inline-end": "x2oyxnl",
        $$css: true
    },
    spacing1_5: {
        "--container-padding-inline-end": "xntetml",
        $$css: true
    },
    spacing2: {
        "--container-padding-inline-end": "xcas3b9",
        $$css: true
    },
    spacing3: {
        "--container-padding-inline-end": "xu0ipoa",
        $$css: true
    },
    spacing4: {
        "--container-padding-inline-end": "xs0pscg",
        $$css: true
    },
    spacing5: {
        "--container-padding-inline-end": "xgkj7vj",
        $$css: true
    },
    spacing6: {
        "--container-padding-inline-end": "x94cj42",
        $$css: true
    },
    spacing7: {
        "--container-padding-inline-end": "x11tj35w",
        $$css: true
    },
    spacing8: {
        "--container-padding-inline-end": "x1b9k1pi",
        $$css: true
    },
    spacing9: {
        "--container-padding-inline-end": "x19w02kr",
        $$css: true
    },
    spacing10: {
        "--container-padding-inline-end": "xx5lg5w",
        $$css: true
    },
    spacing11: {
        "--container-padding-inline-end": "x1nmgbqg",
        $$css: true
    },
    spacing12: {
        "--container-padding-inline-end": "x1wsfsk2",
        $$css: true
    }
};
/**
 * Container block-start/block-end padding styles for vertical bleed.
 * Split into start and end because Layout areas have asymmetric block padding
 * (e.g., Header: block-start=outer-y, block-end=inner-y).
 */ const containerPaddingBlockStartStyles = {
    spacing0: {
        "--container-padding-block-start": "x1i3qcxz",
        $$css: true
    },
    spacing0_5: {
        "--container-padding-block-start": "xvdf9ev",
        $$css: true
    },
    spacing1: {
        "--container-padding-block-start": "xnsckjb",
        $$css: true
    },
    spacing1_5: {
        "--container-padding-block-start": "x1kbx601",
        $$css: true
    },
    spacing2: {
        "--container-padding-block-start": "xa8b4fq",
        $$css: true
    },
    spacing3: {
        "--container-padding-block-start": "x11k4f5r",
        $$css: true
    },
    spacing4: {
        "--container-padding-block-start": "xm01sq8",
        $$css: true
    },
    spacing5: {
        "--container-padding-block-start": "xp8wdkl",
        $$css: true
    },
    spacing6: {
        "--container-padding-block-start": "x1hmud4d",
        $$css: true
    },
    spacing7: {
        "--container-padding-block-start": "x1c00sag",
        $$css: true
    },
    spacing8: {
        "--container-padding-block-start": "xfv60at",
        $$css: true
    },
    spacing9: {
        "--container-padding-block-start": "x14fzdu7",
        $$css: true
    },
    spacing10: {
        "--container-padding-block-start": "x17h9kl7",
        $$css: true
    },
    spacing11: {
        "--container-padding-block-start": "x1rdjxae",
        $$css: true
    },
    spacing12: {
        "--container-padding-block-start": "xecwdl6",
        $$css: true
    }
};
const containerPaddingBlockEndStyles = {
    spacing0: {
        "--container-padding-block-end": "xkunwnr",
        $$css: true
    },
    spacing0_5: {
        "--container-padding-block-end": "x1cao3zv",
        $$css: true
    },
    spacing1: {
        "--container-padding-block-end": "x57a7ii",
        $$css: true
    },
    spacing1_5: {
        "--container-padding-block-end": "xv53x8y",
        $$css: true
    },
    spacing2: {
        "--container-padding-block-end": "x1lsgcmx",
        $$css: true
    },
    spacing3: {
        "--container-padding-block-end": "x1q3ppug",
        $$css: true
    },
    spacing4: {
        "--container-padding-block-end": "x4hfsld",
        $$css: true
    },
    spacing5: {
        "--container-padding-block-end": "xbib2ws",
        $$css: true
    },
    spacing6: {
        "--container-padding-block-end": "x1q8d17g",
        $$css: true
    },
    spacing7: {
        "--container-padding-block-end": "x1yqogew",
        $$css: true
    },
    spacing8: {
        "--container-padding-block-end": "x8lgq76",
        $$css: true
    },
    spacing9: {
        "--container-padding-block-end": "x1f7f9rt",
        $$css: true
    },
    spacing10: {
        "--container-padding-block-end": "x15vxphk",
        $$css: true
    },
    spacing11: {
        "--container-padding-block-end": "x4bg2x9",
        $$css: true
    },
    spacing12: {
        "--container-padding-block-end": "x186mjxr",
        $$css: true
    }
};
const paddingOuterXStyles = {
    spacing0: {
        "--layout-padding-outer-x": "xswhm3q",
        $$css: true
    },
    spacing0_5: {
        "--layout-padding-outer-x": "xihiwg7",
        $$css: true
    },
    spacing1: {
        "--layout-padding-outer-x": "xc96xmq",
        $$css: true
    },
    spacing1_5: {
        "--layout-padding-outer-x": "x1u93lgd",
        $$css: true
    },
    spacing2: {
        "--layout-padding-outer-x": "x15dxnc0",
        $$css: true
    },
    spacing3: {
        "--layout-padding-outer-x": "xadgj3j",
        $$css: true
    },
    spacing4: {
        "--layout-padding-outer-x": "x1v56qcf",
        $$css: true
    },
    spacing5: {
        "--layout-padding-outer-x": "x1nzs0gl",
        $$css: true
    },
    spacing6: {
        "--layout-padding-outer-x": "x1c3n52a",
        $$css: true
    },
    spacing7: {
        "--layout-padding-outer-x": "x1gfiokx",
        $$css: true
    },
    spacing8: {
        "--layout-padding-outer-x": "x1t3kfz",
        $$css: true
    },
    spacing9: {
        "--layout-padding-outer-x": "xzr4qsh",
        $$css: true
    },
    spacing10: {
        "--layout-padding-outer-x": "x1jdf5a4",
        $$css: true
    },
    spacing11: {
        "--layout-padding-outer-x": "x1hct0t0",
        $$css: true
    },
    spacing12: {
        "--layout-padding-outer-x": "x11cyqoe",
        $$css: true
    }
};
const paddingOuterYStyles = {
    spacing0: {
        "--layout-padding-outer-y": "x1mzf5mb",
        $$css: true
    },
    spacing0_5: {
        "--layout-padding-outer-y": "x1vj96e0",
        $$css: true
    },
    spacing1: {
        "--layout-padding-outer-y": "x1gpfxoh",
        $$css: true
    },
    spacing1_5: {
        "--layout-padding-outer-y": "xd3dqby",
        $$css: true
    },
    spacing2: {
        "--layout-padding-outer-y": "x10pz7y9",
        $$css: true
    },
    spacing3: {
        "--layout-padding-outer-y": "x1p6yq3h",
        $$css: true
    },
    spacing4: {
        "--layout-padding-outer-y": "xx738ci",
        $$css: true
    },
    spacing5: {
        "--layout-padding-outer-y": "x6yxws5",
        $$css: true
    },
    spacing6: {
        "--layout-padding-outer-y": "x180vrwl",
        $$css: true
    },
    spacing7: {
        "--layout-padding-outer-y": "x1q6rme1",
        $$css: true
    },
    spacing8: {
        "--layout-padding-outer-y": "xid7e43",
        $$css: true
    },
    spacing9: {
        "--layout-padding-outer-y": "x1t5kicu",
        $$css: true
    },
    spacing10: {
        "--layout-padding-outer-y": "x26l4wa",
        $$css: true
    },
    spacing11: {
        "--layout-padding-outer-y": "x10zktp0",
        $$css: true
    },
    spacing12: {
        "--layout-padding-outer-y": "x1yz3n6a",
        $$css: true
    }
};
const paddingInnerXStyles = {
    spacing0: {
        "--layout-padding-inner-x": "xj1bl4l",
        $$css: true
    },
    spacing0_5: {
        "--layout-padding-inner-x": "xlriy2h",
        $$css: true
    },
    spacing1: {
        "--layout-padding-inner-x": "x6uuyak",
        $$css: true
    },
    spacing1_5: {
        "--layout-padding-inner-x": "xd38f90",
        $$css: true
    },
    spacing2: {
        "--layout-padding-inner-x": "xxqksqd",
        $$css: true
    },
    spacing3: {
        "--layout-padding-inner-x": "x1fyui2f",
        $$css: true
    },
    spacing4: {
        "--layout-padding-inner-x": "x1i2ajwi",
        $$css: true
    },
    spacing5: {
        "--layout-padding-inner-x": "x1tac27u",
        $$css: true
    },
    spacing6: {
        "--layout-padding-inner-x": "x1ntgf3t",
        $$css: true
    },
    spacing7: {
        "--layout-padding-inner-x": "xhjd9tl",
        $$css: true
    },
    spacing8: {
        "--layout-padding-inner-x": "xn7c84u",
        $$css: true
    },
    spacing9: {
        "--layout-padding-inner-x": "xeqkbsz",
        $$css: true
    },
    spacing10: {
        "--layout-padding-inner-x": "x1vf4qco",
        $$css: true
    },
    spacing11: {
        "--layout-padding-inner-x": "xsmamsf",
        $$css: true
    },
    spacing12: {
        "--layout-padding-inner-x": "x2xk2xj",
        $$css: true
    }
};
const paddingInnerYStyles = {
    spacing0: {
        "--layout-padding-inner-y": "xwuefyo",
        $$css: true
    },
    spacing0_5: {
        "--layout-padding-inner-y": "x180h0y5",
        $$css: true
    },
    spacing1: {
        "--layout-padding-inner-y": "xmpug6m",
        $$css: true
    },
    spacing1_5: {
        "--layout-padding-inner-y": "x1g8jpzm",
        $$css: true
    },
    spacing2: {
        "--layout-padding-inner-y": "x1lksgje",
        $$css: true
    },
    spacing3: {
        "--layout-padding-inner-y": "x4j7gld",
        $$css: true
    },
    spacing4: {
        "--layout-padding-inner-y": "x1s3ehtl",
        $$css: true
    },
    spacing5: {
        "--layout-padding-inner-y": "x1rj5eim",
        $$css: true
    },
    spacing6: {
        "--layout-padding-inner-y": "x1ftgg6u",
        $$css: true
    },
    spacing7: {
        "--layout-padding-inner-y": "x1ho74vh",
        $$css: true
    },
    spacing8: {
        "--layout-padding-inner-y": "xm2cs6f",
        $$css: true
    },
    spacing9: {
        "--layout-padding-inner-y": "x1vsq92b",
        $$css: true
    },
    spacing10: {
        "--layout-padding-inner-y": "x18gbwmk",
        $$css: true
    },
    spacing11: {
        "--layout-padding-inner-y": "x14zymzj",
        $$css: true
    },
    spacing12: {
        "--layout-padding-inner-y": "xzfpkx9",
        $$css: true
    }
};
const maxHeightStyles = {
    containerMaxHeight: (maxHeight)=>[
            {
                "--container-max-height": maxHeight != null ? "x18nyedi" : maxHeight,
                $$css: true
            },
            {
                "--x---container-max-height": maxHeight != null ? maxHeight : undefined
            }
        ]
};
function container({ padding = 'spacing4', paddingOuterX, paddingOuterY, paddingInnerX, paddingInnerY, useThemeDefault, maxHeight }) {
    const outerX = paddingOuterX ?? padding;
    const outerY = paddingOuterY ?? padding;
    const innerX = paddingInnerX ?? padding;
    const innerY = paddingInnerY ?? padding;
    const maxHeightStyle = maxHeight ? maxHeightStyles.containerMaxHeight(maxHeight) : null;
    // When useThemeDefault is a component name, cascade from the component's
    // public CSS container tokens (set by theme pipeline from `padding` shorthand)
    // so themes can override each component's padding independently.
    if (useThemeDefault) {
        const defaults = themeDefaultStyles[useThemeDefault];
        return [
            baseStyles.container,
            defaults.containerPaddingInlineStart,
            defaults.containerPaddingInlineEnd,
            defaults.containerPaddingBlockStart,
            defaults.containerPaddingBlockEnd,
            defaults.layoutPaddingOuterX,
            defaults.layoutPaddingOuterY,
            defaults.layoutPaddingInnerX,
            defaults.layoutPaddingInnerY,
            maxHeightStyle
        ];
    }
    return [
        baseStyles.container,
        containerPaddingInlineStartStyles[outerX],
        containerPaddingInlineEndStyles[outerX],
        containerPaddingBlockStartStyles[outerY],
        containerPaddingBlockEndStyles[outerY],
        paddingOuterXStyles[outerX],
        paddingOuterYStyles[outerY],
        paddingInnerXStyles[innerX],
        paddingInnerYStyles[innerY],
        maxHeightStyle
    ];
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layout/containerCorners.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file containerCorners.stylex.ts
 * @input Uses @stylexjs/stylex
 * @output containerCornerStyles: the corner publication rounded padding
 *   publishers share
 * @position Layout utility beside container(). Internal: the package does not
 *   export `containerCornerStyles`. The `--container-corner-*` variables it
 *   sets are in the shipped CSS, but no API documents them; only Table and
 *   List read them.
 */ __turbopack_context__.s([
    "containerCornerStyles",
    ()=>containerCornerStyles
]);
;
const containerCornerStyles = {
    publish: {
        "--container-corner-start-start": "xcfde6v x9dr3yd x1x9b3rp",
        "--container-corner-start-end": "x1os27km xa6mq3f x1fj5z48",
        "--container-corner-end-start": "x102ry9 xvdszl0 xpl7j7d",
        "--container-corner-end-end": "x1q2p8vm xdqj9nm xrfh3k4",
        $$css: true
    }
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layout/edgeCompensation.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file edgeCompensation.stylex.ts
 * @input Uses @stylexjs/stylex
 * @output StyleX utilities for container-driven edge compensation
 * @position Layout utility; used by containers (Toolbar, Banner, etc.)
 *
 * ## Container-Driven Edge Compensation
 *
 * Interactive components with transparent padding (ghost buttons, tabs)
 * create excess visual space at container edges. The container's padding + the
 * component's own transparent padding doubles up.
 *
 * The solution is fully container-driven:
 *
 * 1. **Components** mark themselves with `data-astryx-edge-comp` (a passive
 *    data attribute — no styles attached).
 * 2. **Containers** use `:has(> [data-astryx-edge-comp]:first-child)` and
 *    `:has(> [data-astryx-edge-comp]:last-child)` to detect edge-adjacent
 *    compensatable items and apply negative margin to their slot wrappers.
 *
 * The container owns both the detection and the adjustment. Components
 * just declare eligibility.
 *
 * SYNC: When modified, update /packages/core/src/Layout/Layout.doc.mjs
 */ __turbopack_context__.s([
    "EDGE_COMP_ATTR",
    ()=>EDGE_COMP_ATTR,
    "edgeCompSlot",
    ()=>edgeCompSlot
]);
;
const EDGE_COMP_ATTR = 'data-astryx-edge-comp';
/**
 * Container-side edge compensation styles.
 *
 * Apply to slot wrapper divs. The slot detects whether its first/last
 * child is an edge-compensatable component and pulls its own margin
 * inward by the specified inset amount.
 *
 * @example
 * ```tsx
 * <div {...stylex.props(
 *   styles.startSlot,
 *   edgeCompSlot.inset(spacingVars['--spacing-2']),
 * )}>
 *   {startContent}
 * </div>
 * ```
 */ const _temp = {
    keTefX: "x1kftj4p",
    k71WvV: "x92e2el",
    "$$css": true
};
const edgeCompSlot = {
    inset: (amount)=>[
            _temp,
            {
                "--x-126w13d": ((val)=>typeof val === "number" ? val + "px" : val != null ? val : undefined)(`calc(-1 * ${amount})`),
                "--x-4drmnv": ((val)=>typeof val === "number" ? val + "px" : val != null ? val : undefined)(`calc(-1 * ${amount})`)
            }
        ]
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layout/overlayPaddingReset.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file overlayPaddingReset.stylex.ts
 * @input Uses @stylexjs/stylex
 * @output overlayPaddingReset: the container padding boundary at an overlay's root
 * @position Layout utility, re-exported by padding.stylex.ts and Layout/index.ts.
 *   Its own module so an overlay's eager code (useLayer) imports it without
 *   padding.stylex.ts: a lazily loaded overlay that uses the container padding
 *   styles there then keeps them out of the eager chunk it shares with this
 *   module.
 */ __turbopack_context__.s([
    "overlayPaddingReset",
    ()=>overlayPaddingReset
]);
;
const overlayPaddingReset = {
    reset: {
        "--container-padding-inline-start": "xrhngw9",
        "--container-padding-inline-end": "xjsfl84",
        "--container-padding-block-start": "x1047aw6",
        "--container-padding-block-end": "xax9j7h",
        "--container-corner-start-start": "xcfde6v",
        "--container-corner-start-end": "x1os27km",
        "--container-corner-end-start": "x102ry9",
        "--container-corner-end-end": "x1q2p8vm",
        "--layout-padding-outer-x": "xdt8ak2",
        "--layout-padding-outer-y": "x1rs4lu4",
        "--layout-padding-own-outer-x": "x1vii845",
        "--layout-padding-own-outer-y": "xojybgt",
        "--layout-padding-inner-x": "x1qfll2g",
        "--layout-padding-inner-y": "xyvxpqs",
        "--_section-padding-propagated": "x1f17rg1",
        $$css: true
    }
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layout/padding.stylex.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file padding.stylex.ts
 * @input Uses @stylexjs/stylex, spacing from theme
 * @output StyleX styles for numeric padding prop on layout components, the
 *   container padding variables, and (re-exported) paddingStyles and
 *   overlayPaddingReset
 * @position Layout utility; used by Card, Section, and Layout sub-components
 */ __turbopack_context__.s([
    "containerPaddingBlockEndVarStyles",
    ()=>containerPaddingBlockEndVarStyles,
    "containerPaddingBlockStartVarStyles",
    ()=>containerPaddingBlockStartVarStyles,
    "containerPaddingInlineEndVarStyles",
    ()=>containerPaddingInlineEndVarStyles,
    "containerPaddingInlineStartVarStyles",
    ()=>containerPaddingInlineStartVarStyles,
    "containerPaddingInlineVarStyles",
    ()=>containerPaddingInlineVarStyles,
    "layoutPaddingOuterXVarStyles",
    ()=>layoutPaddingOuterXVarStyles,
    "layoutPaddingOuterYVarStyles",
    ()=>layoutPaddingOuterYVarStyles,
    "paddingBlockEndStyles",
    ()=>paddingBlockEndStyles,
    "paddingBlockStartStyles",
    ()=>paddingBlockStartStyles,
    "paddingBlockStyles",
    ()=>paddingBlockStyles,
    "paddingInlineEndStyles",
    ()=>paddingInlineEndStyles,
    "paddingInlineStartStyles",
    ()=>paddingInlineStartStyles,
    "paddingInlineStyles",
    ()=>paddingInlineStyles,
    "sectionPaddingPropagationStyles",
    ()=>sectionPaddingPropagationStyles,
    "spacingStepToToken",
    ()=>spacingStepToToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
// In their own modules so an overlay's eager code imports them without this
// one, and a lazily loaded overlay that uses the container padding styles
// below keeps those out of the chunk it shares with that code.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$paddingStyles$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layout/paddingStyles.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$overlayPaddingReset$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layout/overlayPaddingReset.stylex.js [app-ssr] (ecmascript)");
;
;
;
;
;
const spacingStepToToken = {
    0: 'spacing0',
    0.5: 'spacing0_5',
    1: 'spacing1',
    1.5: 'spacing1_5',
    2: 'spacing2',
    3: 'spacing3',
    4: 'spacing4',
    5: 'spacing5',
    6: 'spacing6',
    8: 'spacing8',
    10: 'spacing10'
};
const containerPaddingInlineVarStyles = {
    "0": {
        "--container-padding-inline-start": "x1gu2k80",
        "--container-padding-inline-end": "x91ghl5",
        $$css: true
    },
    "1": {
        "--container-padding-inline-start": "x1cvlban",
        "--container-padding-inline-end": "x2oyxnl",
        $$css: true
    },
    "2": {
        "--container-padding-inline-start": "x1xlrr2o",
        "--container-padding-inline-end": "xcas3b9",
        $$css: true
    },
    "3": {
        "--container-padding-inline-start": "xfdwxua",
        "--container-padding-inline-end": "xu0ipoa",
        $$css: true
    },
    "4": {
        "--container-padding-inline-start": "x1dlhslv",
        "--container-padding-inline-end": "xs0pscg",
        $$css: true
    },
    "5": {
        "--container-padding-inline-start": "x1s81nki",
        "--container-padding-inline-end": "xgkj7vj",
        $$css: true
    },
    "6": {
        "--container-padding-inline-start": "x1ep0dkj",
        "--container-padding-inline-end": "x94cj42",
        $$css: true
    },
    "8": {
        "--container-padding-inline-start": "xw1diwv",
        "--container-padding-inline-end": "x1b9k1pi",
        $$css: true
    },
    "10": {
        "--container-padding-inline-start": "xserb3f",
        "--container-padding-inline-end": "xx5lg5w",
        $$css: true
    },
    "0.5": {
        "--container-padding-inline-start": "x14ws0sr",
        "--container-padding-inline-end": "x1wz3t3y",
        $$css: true
    },
    "1.5": {
        "--container-padding-inline-start": "x176g23i",
        "--container-padding-inline-end": "xntetml",
        $$css: true
    }
};
const containerPaddingBlockStartVarStyles = {
    "0": {
        "--container-padding-block-start": "x1i3qcxz",
        $$css: true
    },
    "1": {
        "--container-padding-block-start": "xnsckjb",
        $$css: true
    },
    "2": {
        "--container-padding-block-start": "xa8b4fq",
        $$css: true
    },
    "3": {
        "--container-padding-block-start": "x11k4f5r",
        $$css: true
    },
    "4": {
        "--container-padding-block-start": "xm01sq8",
        $$css: true
    },
    "5": {
        "--container-padding-block-start": "xp8wdkl",
        $$css: true
    },
    "6": {
        "--container-padding-block-start": "x1hmud4d",
        $$css: true
    },
    "8": {
        "--container-padding-block-start": "xfv60at",
        $$css: true
    },
    "10": {
        "--container-padding-block-start": "x17h9kl7",
        $$css: true
    },
    "0.5": {
        "--container-padding-block-start": "xvdf9ev",
        $$css: true
    },
    "1.5": {
        "--container-padding-block-start": "x1kbx601",
        $$css: true
    }
};
const containerPaddingBlockEndVarStyles = {
    "0": {
        "--container-padding-block-end": "xkunwnr",
        $$css: true
    },
    "1": {
        "--container-padding-block-end": "x57a7ii",
        $$css: true
    },
    "2": {
        "--container-padding-block-end": "x1lsgcmx",
        $$css: true
    },
    "3": {
        "--container-padding-block-end": "x1q3ppug",
        $$css: true
    },
    "4": {
        "--container-padding-block-end": "x4hfsld",
        $$css: true
    },
    "5": {
        "--container-padding-block-end": "xbib2ws",
        $$css: true
    },
    "6": {
        "--container-padding-block-end": "x1q8d17g",
        $$css: true
    },
    "8": {
        "--container-padding-block-end": "x8lgq76",
        $$css: true
    },
    "10": {
        "--container-padding-block-end": "x15vxphk",
        $$css: true
    },
    "0.5": {
        "--container-padding-block-end": "x1cao3zv",
        $$css: true
    },
    "1.5": {
        "--container-padding-block-end": "xv53x8y",
        $$css: true
    }
};
const layoutPaddingOuterXVarStyles = {
    "0": {
        "--layout-padding-own-outer-x": "xhcsosl",
        $$css: true
    },
    "1": {
        "--layout-padding-own-outer-x": "x14y473",
        $$css: true
    },
    "2": {
        "--layout-padding-own-outer-x": "x18c6olm",
        $$css: true
    },
    "3": {
        "--layout-padding-own-outer-x": "x1cfn5ow",
        $$css: true
    },
    "4": {
        "--layout-padding-own-outer-x": "xh30wjg",
        $$css: true
    },
    "5": {
        "--layout-padding-own-outer-x": "xse87af",
        $$css: true
    },
    "6": {
        "--layout-padding-own-outer-x": "xznoj5s",
        $$css: true
    },
    "8": {
        "--layout-padding-own-outer-x": "xtjvahm",
        $$css: true
    },
    "10": {
        "--layout-padding-own-outer-x": "xczqutc",
        $$css: true
    },
    "0.5": {
        "--layout-padding-own-outer-x": "x1ftjo2o",
        $$css: true
    },
    "1.5": {
        "--layout-padding-own-outer-x": "x1k4nu17",
        $$css: true
    }
};
const layoutPaddingOuterYVarStyles = {
    "0": {
        "--layout-padding-own-outer-y": "xe1wva8",
        $$css: true
    },
    "1": {
        "--layout-padding-own-outer-y": "x1nxw61z",
        $$css: true
    },
    "2": {
        "--layout-padding-own-outer-y": "xm4vj23",
        $$css: true
    },
    "3": {
        "--layout-padding-own-outer-y": "x69uvy7",
        $$css: true
    },
    "4": {
        "--layout-padding-own-outer-y": "x139ridu",
        $$css: true
    },
    "5": {
        "--layout-padding-own-outer-y": "x1cq2jmq",
        $$css: true
    },
    "6": {
        "--layout-padding-own-outer-y": "x1ir1f5p",
        $$css: true
    },
    "8": {
        "--layout-padding-own-outer-y": "xhbsdkj",
        $$css: true
    },
    "10": {
        "--layout-padding-own-outer-y": "xaqnhag",
        $$css: true
    },
    "0.5": {
        "--layout-padding-own-outer-y": "x1b6unwa",
        $$css: true
    },
    "1.5": {
        "--layout-padding-own-outer-y": "x1g16mdy",
        $$css: true
    }
};
const paddingInlineStyles = {
    "0": {
        kZCmMZ: "x18gyask",
        kwRFfy: "x1s0aq8i",
        $$css: true
    },
    "1": {
        kZCmMZ: "x1vsv5vr",
        kwRFfy: "x1nryj5t",
        $$css: true
    },
    "2": {
        kZCmMZ: "x12gdq22",
        kwRFfy: "x1djylfy",
        $$css: true
    },
    "3": {
        kZCmMZ: "x126nfab",
        kwRFfy: "x1t818jl",
        $$css: true
    },
    "4": {
        kZCmMZ: "x1rey3nv",
        kwRFfy: "xnjyzlh",
        $$css: true
    },
    "5": {
        kZCmMZ: "x1blguxw",
        kwRFfy: "xdbrk9v",
        $$css: true
    },
    "6": {
        kZCmMZ: "x31w388",
        kwRFfy: "x1we12cn",
        $$css: true
    },
    "8": {
        kZCmMZ: "x1j3hnjz",
        kwRFfy: "x1q91b2g",
        $$css: true
    },
    "10": {
        kZCmMZ: "xqp078j",
        kwRFfy: "x160ivqr",
        $$css: true
    },
    "0.5": {
        kZCmMZ: "x138rykx",
        kwRFfy: "x1le3yxw",
        $$css: true
    },
    "1.5": {
        kZCmMZ: "xfti1ec",
        kwRFfy: "x17hk9do",
        $$css: true
    }
};
const paddingBlockStyles = {
    "0": {
        kLKAdn: "x1ydh6w3",
        kGO01o: "x1l20ajd",
        $$css: true
    },
    "1": {
        kLKAdn: "xfsso4q",
        kGO01o: "xy143xn",
        $$css: true
    },
    "2": {
        kLKAdn: "x1xye8es",
        kGO01o: "x1wesfrj",
        $$css: true
    },
    "3": {
        kLKAdn: "x1vlblms",
        kGO01o: "xvmdzux",
        $$css: true
    },
    "4": {
        kLKAdn: "x1oa1p4a",
        kGO01o: "x1awphl8",
        $$css: true
    },
    "5": {
        kLKAdn: "xx7rijo",
        kGO01o: "x1hk98q",
        $$css: true
    },
    "6": {
        kLKAdn: "x1adxfkp",
        kGO01o: "xjpqqx5",
        $$css: true
    },
    "8": {
        kLKAdn: "xoxd1wu",
        kGO01o: "x2oz4g1",
        $$css: true
    },
    "10": {
        kLKAdn: "xk6660b",
        kGO01o: "x2izi54",
        $$css: true
    },
    "0.5": {
        kLKAdn: "xbx876j",
        kGO01o: "xij103a",
        $$css: true
    },
    "1.5": {
        kLKAdn: "x1kwdpsa",
        kGO01o: "x1opdxmq",
        $$css: true
    }
};
const paddingInlineStartStyles = {
    "0": {
        kZCmMZ: "x18gyask",
        $$css: true
    },
    "1": {
        kZCmMZ: "x1vsv5vr",
        $$css: true
    },
    "2": {
        kZCmMZ: "x12gdq22",
        $$css: true
    },
    "3": {
        kZCmMZ: "x126nfab",
        $$css: true
    },
    "4": {
        kZCmMZ: "x1rey3nv",
        $$css: true
    },
    "5": {
        kZCmMZ: "x1blguxw",
        $$css: true
    },
    "6": {
        kZCmMZ: "x31w388",
        $$css: true
    },
    "8": {
        kZCmMZ: "x1j3hnjz",
        $$css: true
    },
    "10": {
        kZCmMZ: "xqp078j",
        $$css: true
    },
    "0.5": {
        kZCmMZ: "x138rykx",
        $$css: true
    },
    "1.5": {
        kZCmMZ: "xfti1ec",
        $$css: true
    }
};
const paddingInlineEndStyles = {
    "0": {
        kwRFfy: "x1s0aq8i",
        $$css: true
    },
    "1": {
        kwRFfy: "x1nryj5t",
        $$css: true
    },
    "2": {
        kwRFfy: "x1djylfy",
        $$css: true
    },
    "3": {
        kwRFfy: "x1t818jl",
        $$css: true
    },
    "4": {
        kwRFfy: "xnjyzlh",
        $$css: true
    },
    "5": {
        kwRFfy: "xdbrk9v",
        $$css: true
    },
    "6": {
        kwRFfy: "x1we12cn",
        $$css: true
    },
    "8": {
        kwRFfy: "x1q91b2g",
        $$css: true
    },
    "10": {
        kwRFfy: "x160ivqr",
        $$css: true
    },
    "0.5": {
        kwRFfy: "x1le3yxw",
        $$css: true
    },
    "1.5": {
        kwRFfy: "x17hk9do",
        $$css: true
    }
};
const containerPaddingInlineStartVarStyles = {
    "0": {
        "--container-padding-inline-start": "x1gu2k80",
        $$css: true
    },
    "1": {
        "--container-padding-inline-start": "x1cvlban",
        $$css: true
    },
    "2": {
        "--container-padding-inline-start": "x1xlrr2o",
        $$css: true
    },
    "3": {
        "--container-padding-inline-start": "xfdwxua",
        $$css: true
    },
    "4": {
        "--container-padding-inline-start": "x1dlhslv",
        $$css: true
    },
    "5": {
        "--container-padding-inline-start": "x1s81nki",
        $$css: true
    },
    "6": {
        "--container-padding-inline-start": "x1ep0dkj",
        $$css: true
    },
    "8": {
        "--container-padding-inline-start": "xw1diwv",
        $$css: true
    },
    "10": {
        "--container-padding-inline-start": "xserb3f",
        $$css: true
    },
    "0.5": {
        "--container-padding-inline-start": "x14ws0sr",
        $$css: true
    },
    "1.5": {
        "--container-padding-inline-start": "x176g23i",
        $$css: true
    }
};
const containerPaddingInlineEndVarStyles = {
    "0": {
        "--container-padding-inline-end": "x91ghl5",
        $$css: true
    },
    "1": {
        "--container-padding-inline-end": "x2oyxnl",
        $$css: true
    },
    "2": {
        "--container-padding-inline-end": "xcas3b9",
        $$css: true
    },
    "3": {
        "--container-padding-inline-end": "xu0ipoa",
        $$css: true
    },
    "4": {
        "--container-padding-inline-end": "xs0pscg",
        $$css: true
    },
    "5": {
        "--container-padding-inline-end": "xgkj7vj",
        $$css: true
    },
    "6": {
        "--container-padding-inline-end": "x94cj42",
        $$css: true
    },
    "8": {
        "--container-padding-inline-end": "x1b9k1pi",
        $$css: true
    },
    "10": {
        "--container-padding-inline-end": "xx5lg5w",
        $$css: true
    },
    "0.5": {
        "--container-padding-inline-end": "x1wz3t3y",
        $$css: true
    },
    "1.5": {
        "--container-padding-inline-end": "xntetml",
        $$css: true
    }
};
const paddingBlockStartStyles = {
    "0": {
        kLKAdn: "x1ydh6w3",
        $$css: true
    },
    "1": {
        kLKAdn: "xfsso4q",
        $$css: true
    },
    "2": {
        kLKAdn: "x1xye8es",
        $$css: true
    },
    "3": {
        kLKAdn: "x1vlblms",
        $$css: true
    },
    "4": {
        kLKAdn: "x1oa1p4a",
        $$css: true
    },
    "5": {
        kLKAdn: "xx7rijo",
        $$css: true
    },
    "6": {
        kLKAdn: "x1adxfkp",
        $$css: true
    },
    "8": {
        kLKAdn: "xoxd1wu",
        $$css: true
    },
    "10": {
        kLKAdn: "xk6660b",
        $$css: true
    },
    "0.5": {
        kLKAdn: "xbx876j",
        $$css: true
    },
    "1.5": {
        kLKAdn: "x1kwdpsa",
        $$css: true
    }
};
const paddingBlockEndStyles = {
    "0": {
        kGO01o: "x1l20ajd",
        $$css: true
    },
    "1": {
        kGO01o: "xy143xn",
        $$css: true
    },
    "2": {
        kGO01o: "x1wesfrj",
        $$css: true
    },
    "3": {
        kGO01o: "xvmdzux",
        $$css: true
    },
    "4": {
        kGO01o: "x1awphl8",
        $$css: true
    },
    "5": {
        kGO01o: "x1hk98q",
        $$css: true
    },
    "6": {
        kGO01o: "xjpqqx5",
        $$css: true
    },
    "8": {
        kGO01o: "x2oz4g1",
        $$css: true
    },
    "10": {
        kGO01o: "x2izi54",
        $$css: true
    },
    "0.5": {
        kGO01o: "xij103a",
        $$css: true
    },
    "1.5": {
        kGO01o: "x1opdxmq",
        $$css: true
    }
};
const sectionPaddingPropagationStyles = {
    "0": {
        "--_section-padding-propagated": "x7mo41q",
        $$css: true
    },
    "1": {
        "--_section-padding-propagated": "x1j3iakl",
        $$css: true
    },
    "2": {
        "--_section-padding-propagated": "xezgk69",
        $$css: true
    },
    "3": {
        "--_section-padding-propagated": "x1wtz8uf",
        $$css: true
    },
    "4": {
        "--_section-padding-propagated": "x5wdj8h",
        $$css: true
    },
    "5": {
        "--_section-padding-propagated": "xgjndll",
        $$css: true
    },
    "6": {
        "--_section-padding-propagated": "x15i4jqh",
        $$css: true
    },
    "8": {
        "--_section-padding-propagated": "xmb9lpv",
        $$css: true
    },
    "10": {
        "--_section-padding-propagated": "x4h2jfd",
        $$css: true
    },
    "0.5": {
        "--_section-padding-propagated": "x2ccaqq",
        $$css: true
    },
    "1.5": {
        "--_section-padding-propagated": "xxa843v",
        $$css: true
    }
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Layout/paddingStyles.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file paddingStyles.stylex.ts
 * @input Uses @stylexjs/stylex, spacing from theme
 * @output paddingStyles: uniform padding on all four sides by SpacingStep
 * @position Layout utility, re-exported by padding.stylex.ts. Its own module so an
 *   overlay's eager code (usePopover) imports it without padding.stylex.ts:
 *   a lazily loaded overlay that uses the container padding styles there then
 *   keeps them out of the eager chunk it shares with this module.
 */ __turbopack_context__.s([
    "paddingStyles",
    ()=>paddingStyles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
;
;
;
const paddingStyles = {
    "0": {
        kZCmMZ: "x18gyask",
        kwRFfy: "x1s0aq8i",
        kLKAdn: "x1ydh6w3",
        kGO01o: "x1l20ajd",
        $$css: true
    },
    "1": {
        kZCmMZ: "x1vsv5vr",
        kwRFfy: "x1nryj5t",
        kLKAdn: "xfsso4q",
        kGO01o: "xy143xn",
        $$css: true
    },
    "2": {
        kZCmMZ: "x12gdq22",
        kwRFfy: "x1djylfy",
        kLKAdn: "x1xye8es",
        kGO01o: "x1wesfrj",
        $$css: true
    },
    "3": {
        kZCmMZ: "x126nfab",
        kwRFfy: "x1t818jl",
        kLKAdn: "x1vlblms",
        kGO01o: "xvmdzux",
        $$css: true
    },
    "4": {
        kZCmMZ: "x1rey3nv",
        kwRFfy: "xnjyzlh",
        kLKAdn: "x1oa1p4a",
        kGO01o: "x1awphl8",
        $$css: true
    },
    "5": {
        kZCmMZ: "x1blguxw",
        kwRFfy: "xdbrk9v",
        kLKAdn: "xx7rijo",
        kGO01o: "x1hk98q",
        $$css: true
    },
    "6": {
        kZCmMZ: "x31w388",
        kwRFfy: "x1we12cn",
        kLKAdn: "x1adxfkp",
        kGO01o: "xjpqqx5",
        $$css: true
    },
    "8": {
        kZCmMZ: "x1j3hnjz",
        kwRFfy: "x1q91b2g",
        kLKAdn: "xoxd1wu",
        kGO01o: "x2oz4g1",
        $$css: true
    },
    "10": {
        kZCmMZ: "xqp078j",
        kwRFfy: "x160ivqr",
        kLKAdn: "xk6660b",
        kGO01o: "x2izi54",
        $$css: true
    },
    "0.5": {
        kZCmMZ: "x138rykx",
        kwRFfy: "x1le3yxw",
        kLKAdn: "xbx876j",
        kGO01o: "xij103a",
        $$css: true
    },
    "1.5": {
        kZCmMZ: "xfti1ec",
        kwRFfy: "x17hk9do",
        kLKAdn: "x1kwdpsa",
        kGO01o: "x1opdxmq",
        $$css: true
    }
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Link/Link.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Link",
    ()=>Link
]);
/**
 * @file Link.tsx
 * @input Uses React, AnchorHTMLAttributes, ReactNode
 * @output Exports Link component, LinkProps
 * @position Core implementation; consumed by index.ts, tested by Link.test.tsx
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Link/Link.doc.mjs (props table, features, implementation notes)
 * - /packages/core/src/Link/Link.test.tsx (tests for new/changed behavior)
 * - /packages/core/src/Link/index.ts (exports if types change)
 * - /apps/storybook/stories/Link.stories.tsx (storybook stories)
 * - /packages/cli/assets/templates/blocks/components/Link/ (showcase blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/Icon.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Text/Text.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$textClampContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Text/textClampContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$VisuallyHidden$2f$VisuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/VisuallyHidden/VisuallyHidden.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$useLinkComponent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Link/useLinkComponent.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$computeTargetAndRel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Link/computeTargetAndRel.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useInteractiveRole$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useInteractiveRole.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/focusOutline.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/interactionOverlay.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$usePressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/usePressFeedback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$disabledInteraction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/disabledInteraction.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Link$2f$Link$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Link/Link.generated.js [app-ssr] (ecmascript)");
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerEnglishFallback"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Link$2f$Link$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
/**
 * Base link styles
 */ const styles = {
    base: {
        k1xSpc: "x3nfvp2",
        kGNEyG: "x6s0dn4",
        kOIVth: "x1lsbc85",
        kMv6JI: "xjb2p0i",
        kGuDYH: "x1qlqyl8",
        kLWn49: "x15bjb6t",
        k63SB2: "x1pd3egz",
        kybGjl: "x1hl2dhg x13nosk6",
        kkrTdU: "x1ypdohk x16khyan",
        k1ekBW: "x1mpt4pi",
        kIyJzY: "xuedmi6",
        kAMwcw: "xlr8y92",
        $$css: true
    },
    truncating: {
        ks0D6T: "x193iq5w",
        k7Eaqz: "xeuugli",
        $$css: true
    },
    buttonReset: {
        kWkggS: "xjbqb8w",
        ksu8eU: "xng3xce",
        kmVPX3: "x1717udv",
        k9WMMc: "x16tdsg8",
        kfzvcC: "x67bb7w",
        kVAEAm: "x1n2onr6",
        $$css: true
    },
    inClampedText: {
        k1xSpc: "xt0psk2",
        kInvED: "x1c097ug",
        $$css: true
    },
    externalIconInClampedText: {
        keTefX: "xladpz9",
        kXLuUW: "xxymvpz",
        $$css: true
    },
    hasUnderline: {
        kybGjl: "x1bvjpef",
        $$css: true
    },
    disabled: {
        kkrTdU: "xt0e3qv",
        kSiTet: "xbyyjgo",
        kfzvcC: "x47corl",
        $$css: true
    },
    standalone: {
        kGuDYH: "xjm74w1",
        kLWn49: "xw6l6zx",
        $$css: true
    }
};
/**
 * Link color styles — applied to the <a> element so the underline
 * and icon colors match the text color set by Text.
 */ const linkColorStyles = {
    primary: {
        kMwMTN: "x1tgivj0 xcunlro",
        $$css: true
    },
    secondary: {
        kMwMTN: "xv1l7n4 x7jm8ul",
        $$css: true
    },
    disabled: {
        kMwMTN: "xnbbluu",
        $$css: true
    },
    placeholder: {
        kMwMTN: "xv1l7n4",
        $$css: true
    },
    accent: {
        kMwMTN: "xjse4m1 x1rfoswn",
        $$css: true
    },
    inherit: {
        kMwMTN: "x1heor9g",
        $$css: true
    }
};
// Spread these props after the caller's props, so a caller `aria-disabled` or
// `role` cannot replace them. A caller `tabIndex` still applies, so a disabled
// Link keeps the focus order it has when enabled.
function disabledAnchorProps(onKeyDown) {
    return {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$disabledInteraction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disabledInteractionProps"])(onKeyDown),
        role: 'link',
        'aria-disabled': true
    };
}
// The native button keeps its own role.
function disabledButtonProps(onKeyDown) {
    return {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$disabledInteraction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disabledInteractionProps"])(onKeyDown),
        role: undefined,
        'aria-disabled': true
    };
}
function Link({ as, label, href, hasUnderline = false, isDisabled = false, isExternalLink = false, newTabLabel: newTabLabelFromProps, target: targetFromProps, onClick, tooltip, isStandalone = false, type = 'body', size, weight, color = 'accent', display = 'inline', maxLines = 0, children, rel: relFromProps, xstyle, className, style, ref, ...props }) {
    // Constant marker props; the hook's only effect is installing the shared
    // document controller once, so the link's output stays a pure function of
    // its props.
    const pressable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$usePressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePressFeedback"])();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    const newTabLabel = newTabLabelFromProps ?? t('@astryx.link.newTab');
    const LinkComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$useLinkComponent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLinkComponent"])(as);
    const role = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useInteractiveRole$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInteractiveRole"])({
        href,
        onClick,
        isDisabled
    });
    // Determine target and rel based on isExternalLink
    const { target, rel } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$computeTargetAndRel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["computeTargetAndRel"])(isExternalLink ? '_blank' : targetFromProps, relFromProps);
    // When role resolves to 'button' (no href, or context-provided),
    // render as a <button> with link styling for semantic correctness.
    const renderAsButton = role === 'button' || role === 'inert' && href == null;
    const isExternalWithIcon = isExternalLink && !renderAsButton;
    // Link reads the enclosing Text's clamp, never its own children (AV1). A
    // Link with its own display or clamp keeps its own box.
    const isInClampedText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$textClampContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextClampContext"]) && display === 'inline' && maxLines === 0;
    // The reflected theme attributes win over a caller's same-named `data-*`, so
    // theme targeting always sees the real value (public-component-api INV5).
    const reflectedAttributes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeDataAttributes"])({
        color
    });
    // For a color the root paints, the label inherits it, so the label, the
    // underline, and the icon keep one color at rest and on hover, whatever a
    // theme sets on its text targets.
    const labelColor = color in linkColorStyles ? 'inherit' : color;
    const sharedContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                type: type,
                size: size,
                weight: weight,
                color: labelColor,
                display: display,
                maxLines: maxLines,
                children: children
            }),
            isExternalWithIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                        icon: "externalLink",
                        size: "xsm",
                        color: "inherit",
                        xstyle: isInClampedText && styles.externalIconInClampedText
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$VisuallyHidden$2f$VisuallyHidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VisuallyHidden"], {
                        children: newTabLabel
                    })
                ]
            })
        ]
    });
    let linkElement;
    if (renderAsButton) {
        linkElement = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("button", {
            ref: ref,
            type: "button",
            onClick: onClick,
            ...isDisabled ? undefined : pressable,
            "aria-label": label || undefined,
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('link', {
                color
            }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusOutlineProps"].focusVisible(styles.base, styles.buttonReset, linkColorStyles[color], // The system's pressed overlay behind the text; the hover stays the
            // colour change above, so a press is the one background it paints.
            !isDisabled && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["interactionOverlayStyles"].pressedBackgroundColor, hasUnderline && styles.hasUnderline, isStandalone && styles.standalone, isDisabled && styles.disabled, maxLines > 0 && styles.truncating, xstyle), className, style),
            ...props,
            ...reflectedAttributes,
            ...isDisabled ? disabledButtonProps(props.onKeyDown) : null,
            children: sharedContent
        });
    } else if (isDisabled) {
        // A disabled link renders as an <a> with no href, so nothing can navigate
        // and the consumer onClick never fires. It keeps a Tab stop and the link
        // role so keyboard and screen-reader users still find it. The router
        // LinkComponent is deliberately skipped — a disabled link performs no
        // navigation, and custom router links may require a live href. target/rel
        // are omitted with the href.
        linkElement = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("a", {
            ref: ref,
            "aria-label": label || undefined,
            tabIndex: 0,
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('link', {
                color
            }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusOutlineProps"].focusVisible(styles.base, isInClampedText && styles.inClampedText, linkColorStyles[color], hasUnderline && styles.hasUnderline, isStandalone && styles.standalone, styles.disabled, maxLines > 0 && styles.truncating, xstyle), className, style),
            ...props,
            ...reflectedAttributes,
            ...disabledAnchorProps(props.onKeyDown),
            children: sharedContent
        });
    } else {
        linkElement = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(LinkComponent, {
            ref: ref,
            href: href,
            target: target,
            rel: rel,
            onClick: onClick,
            ...isDisabled ? undefined : pressable,
            "aria-label": label || undefined,
            "aria-disabled": isDisabled || undefined,
            tabIndex: isDisabled ? -1 : undefined,
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('link', {
                color
            }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusOutlineProps"].focusVisible(styles.base, isInClampedText && styles.inClampedText, linkColorStyles[color], !isDisabled && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["interactionOverlayStyles"].pressedBackgroundColor, hasUnderline && styles.hasUnderline, isStandalone && styles.standalone, isDisabled && styles.disabled, maxLines > 0 && styles.truncating, xstyle), className, style),
            ...props,
            ...reflectedAttributes,
            children: sharedContent
        });
    }
    // Wrap with tooltip if provided
    if (tooltip) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
            content: tooltip,
            placement: "above",
            children: linkElement
        });
    }
    return linkElement;
}
Link.displayName = 'Link';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Link/computeTargetAndRel.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeTargetAndRel",
    ()=>computeTargetAndRel
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file computeTargetAndRel.ts
 * @input Link target and rel values
 * @output Exports helper for normalizing target/rel link props
 * @position Internal utility; consumed by link-rendering components
 */ const BLANK_TARGET_REL_TOKENS = [
    'noopener',
    'noreferrer'
];
function computeTargetAndRel(target, rel) {
    if (target !== '_blank') {
        return {
            target,
            rel
        };
    }
    const tokens = rel?.split(/\s+/).filter(Boolean) ?? [];
    for (const token of BLANK_TARGET_REL_TOKENS){
        if (!tokens.includes(token)) {
            tokens.push(token);
        }
    }
    return {
        target,
        rel: tokens.join(' ')
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Link/useLinkComponent.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLinkComponent",
    ()=>useLinkComponent
]);
/**
 * @file useLinkComponent.ts
 * @input Per-component override, LinkProvider context, and navigation props
 * @output Stable link component with destination checks and custom-router `to` injection
 * @position Shared native and custom link boundary; rejected destinations render
 *   as destination-less anchors without invoking a router.
 *
 * SYNC: Link.doc.mjs and LinkProvider.doc.mjs describe this boundary.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$LinkContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Link/LinkContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$safeUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/safeUrl.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
function createSafeLink(Component) {
    function SafeLink({ href, to, ref, ...rest }) {
        // An undefined destination can crash a router or resolve to the current
        // route. Reject the whole handoff, not just one prop or a fallback value.
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$safeUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSafeDestination"])(href) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$safeUrl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSafeDestination"])(to)) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])('a', {
                ref,
                ...rest
            });
        }
        if (Component === 'a') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])('a', {
                ref,
                ...rest,
                href
            });
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(Component, {
            ref,
            ...rest,
            href,
            to: to ?? href
        });
    }
    SafeLink.displayName = `SafeLink(${typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Component'})`;
    return SafeLink;
}
function useLinkComponent(as) {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$LinkContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LinkContext"]);
    const resolved = as ?? ctx?.component ?? 'a';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>createSafeLink(resolved), [
        resolved
    ]);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/SegmentedControl/SegmentedControl.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SegmentedControl",
    ()=>SegmentedControl
]);
/**
 * @file SegmentedControl.tsx
 * @input Uses React, StyleX, SegmentedControlContext, useListFocus,
 *   useKeyboardHint, useTouchPresentation, useSegmentedSelectionMotion
 * @output Exports SegmentedControl component and SegmentedControlProps type
 * @position Container wrapper; provides context to SegmentedControlItem children
 *
 * SYNC: When modified, update:
 * - /packages/core/src/SegmentedControl/SegmentedControl.doc.mjs
 * - /packages/core/src/SegmentedControl/index.ts
 * - /packages/core/src/SegmentedControl/SegmentedControl.test.tsx
 * - /packages/core/src/SegmentedControl/useSegmentedSelectionMotion.ts
 * - /packages/cli/assets/templates/blocks/components/SegmentedControl/ (showcase blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$SegmentedControlContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/SegmentedControl/SegmentedControlContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useListFocus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useListFocus.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$segmentDisabled$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/segmentDisabled.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useKeyboardHint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useKeyboardHint.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/useTooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/composeEventHandlers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputAria$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputAria.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SizeContext$2f$SizeContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/SizeContext/SizeContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMergedRefs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchPresentation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/touchPresentation.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$useSegmentedSelectionMotion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/SegmentedControl/useSegmentedSelectionMotion.js [app-ssr] (ecmascript)");
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
// =============================================================================
// Styles
// =============================================================================
const styles = {
    container: {
        kVAEAm: "x1n2onr6",
        kHBbk8: "xc8icb0",
        k1xSpc: "x3nfvp2",
        kGNEyG: "x6s0dn4",
        kzqmXN: "xeq5yr9",
        ks0D6T: "x1x1rfll xzzx6db",
        k7Eaqz: "x15x72sd xmzx3xy",
        kOIVth: "x1lsbc85",
        "--_segmented-control-padding": "x18jk3ff",
        kmVPX3: "xpoxszi",
        kWkggS: "x17x4s8c",
        $$css: true
    },
    fill: {
        k1xSpc: "x78zum5",
        kzqmXN: "xh8yej3",
        $$css: true
    },
    disabled: {
        kSiTet: "xbyyjgo",
        $$css: true
    },
    lens: {
        kgeoSG: "x1cpjm7i",
        kEoFBp: "x1hmns74",
        kxmVGU: "xy5mcqj",
        k75S9Q: "x1h6x5ug",
        k96MEf: "x319kzk",
        kOlAkY: "xj84cd",
        kgzTxl: "xlxjeq7",
        kQmYQc: "xtql2tq",
        kEdqc7: "x1xm9zrc",
        km8f2m: "xkk1bqk",
        ktHQil: "x1e91tbo",
        kSdLuy: "xwrs98t",
        ku0W4C: "x13rwrtk",
        kLkRvE: "x1nk0e2p",
        k3DiCg: "x19ph129",
        kuPSpR: "xkyjh71",
        k836YN: "xai7mxl",
        kTP8oX: "xzr6j9d",
        khXQ3S: "x1mz0nwo",
        k2irxo: "xtojb3y",
        ktNmms: "x19rx9s5",
        kGBI9E: "x1gz1ewn",
        ks091d: "xirquxt",
        k9BEaU: "x1rj83xg",
        kLSKZI: "x1gp8cmm",
        kg8CZY: "x267z7u",
        kgb78d: "xu7nluz",
        kTJRYx: "xaki043",
        kUmSqE: "x131tjkd",
        k2L7bE: "x10hoewy",
        krR4Wo: "x1rimih4",
        kjBTDo: "xjmzqq9",
        ktumvE: "xymdich",
        kwknyK: "x1l1ofoh",
        kSMQRv: "x1whvb6r",
        k1cwP5: "xg5vybf",
        k6d8aP: "x1j47n5p",
        klC6Y0: "x11t1reg",
        kFbLEI: "x1icymkt",
        k5JduY: "x1s928wv",
        kwXMNM: "x1j6awrg",
        kDVEDD: "xi4xitw",
        kH8cDV: "x1ggeerv",
        k3foIR: "x3g43gi",
        kkgrvl: "x1l8h5kv",
        k4zj60: "x1fv2pxm",
        kWgvks: "xx38sju",
        k51VwD: "x8ihlwz",
        kloYau: "x2q1x1w",
        kMEsQN: "x1631zco",
        kWkaDd: "x1y8idqa",
        kU8QeM: "xwnwc82",
        ks3ayO: "x1wb6yj0",
        kNctxI: "x10e6nnj",
        kgUb28: "x1d269y",
        kakxe6: "x1pxrrzi",
        kIWj2l: "x19crzk3",
        kJM1pu: "x17as9s2",
        kM2ZXO: "x54l34w",
        kbMawA: "x1tmynux",
        kgFEc0: "x13ob3d2",
        kDH5la: "xbn9yse",
        kBNLoZ: "x1icybqf",
        kskBYc: "xk12vn8",
        k9Mpue: "xsbnptc",
        k6OB6z: "x1n4cxts",
        kHSQhd: "x11at6vl",
        kFO5lE: "x1t5rpqk",
        kRcv9L: "x1ff385h",
        kHi7i2: "x1tili5q",
        kh0EW9: "xe87dmk",
        kjCSS1: "x3sz45y",
        kfzc6R: "x18pjm2d",
        kc1AQg: "xa4st9h",
        kvRJ0G: "x1tqw9ds",
        kcGwG1: "x1pgdhoo",
        kR8tOf: "xc4c6yy",
        kxzRJW: "xt64kwx",
        $$css: true
    }
};
const sizeStyles = {
    sm: {
        "--_segmented-control-radius": "x9icjy1",
        kaIpWk: "x1hapoqb",
        $$css: true
    },
    md: {
        "--_segmented-control-radius": "x9icjy1",
        kaIpWk: "x1hapoqb",
        $$css: true
    },
    lg: {
        "--_segmented-control-radius": "x9icjy1",
        kaIpWk: "x1hapoqb",
        $$css: true
    }
};
function SegmentedControl({ ref, value, onChange, label, size: sizeProp, layout = 'hug', isDisabled = false, disabledMessage, children, xstyle, className, style, onKeyDown: onKeyDownProp, onFocus: onFocusProp, onBlur: onBlurProp, 'aria-describedby': ariaDescribedByProp, ...rest }) {
    const size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SizeContext$2f$SizeContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSize"])(sizeProp, 'md');
    // A touch device (a coarse primary pointer) gets UIKit's motion: the
    // selection slides on a spring. Under a mouse it slides on the theme's
    // duration and easing.
    const isTouchPresentation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchPresentation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useTouchPresentation"])().isTouch;
    const trackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Every pointer's press is tracked. A drag from the selected segment
    // carries the lens, and the lift commits the segment nearest the pointer.
    // A lift outside the control commits nothing.
    const { selection, attachTrack } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$useSegmentedSelectionMotion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSegmentedSelectionMotion"])(trackRef, value, isTouchPresentation, !isDisabled);
    // Disabled-reason tooltip. Applies to the whole-group disabled state. The
    // tooltip listeners attach to the radiogroup container, which keeps pointer
    // events while disabled; the radios stay perceivable via aria-disabled.
    // Selection is blocked by the isDisabled guards in the click/focus handlers.
    const showsDisabledMessage = isDisabled && !!disabledMessage;
    const disabledMessageTooltip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTooltip"])({
        placement: 'above',
        // The radiogroup container is not naturally focusable; focusin bubbles up
        // from the radios, so always attach focus listeners.
        focusTrigger: 'always',
        isEnabled: showsDisabledMessage
    });
    // Roving tabindex + arrow/Home/End navigation is owned by the shared
    // useListFocus primitive: it stamps a single tab stop (tabIndex 0/-1) across
    // the radios, skips disabled ones, wraps at the ends, handles Home/End, and
    // repairs the tab stop on mount and whenever items mount/disable — replacing
    // the component's former inline keyboard handler and tab-stop repair effect.
    const { listRef, handleKeyDown, handleFocus } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useListFocus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInternalListFocus"])({
        itemSelector: '[role="radio"]:not([aria-disabled="true"])',
        hasRovingTabIndex: true,
        // One Tab stop, placed by the control (FR2, FR7): the selected segment,
        // enabled or not and in a disabled control too, else the first segment
        // not disabled by its own isDisabled, else the first.
        tabStopOrder: orderTabStop,
        wrap: true,
        orientation: 'horizontal'
    });
    const hint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useKeyboardHint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useKeyboardHint"])({
        orientation: 'horizontal',
        isEnabled: !isDisabled
    });
    const handleContainerKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        selection.keyPressed();
        onKeyDownProp?.(e);
        if (e.defaultPrevented) {
            return;
        }
        hint.onKeyDown(e);
        handleKeyDown(e);
    }, [
        selection,
        onKeyDownProp,
        hint,
        handleKeyDown
    ]);
    // Selection-follows-focus (APG radiogroup): useListFocus only *moves* focus,
    // so whenever it lands focus on a new radio (arrow/Home/End, or a click) we
    // select that radio's value. Reading the focused element's data-value here
    // keeps selection in lockstep with focus without duplicating the navigation
    // logic. Disabled radios are ignored (they should never become the value),
    // and the already-selected value is skipped so an initial Tab-in (or a click
    // on the current segment) is a no-op, matching click behavior.
    const handleContainerFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        onFocusProp?.(e);
        if (e.defaultPrevented) {
            return;
        }
        hint.onFocus(e);
        handleFocus(e);
        if (isDisabled) {
            return;
        }
        // Only select when focus moved WITHIN the group (arrow/Home/End — APG
        // selection-follows-focus). When focus is entering from outside, Tab
        // must stay a pure focus move: with an unmatched or disabled-selected
        // value the roving tab stop falls back to the first enabled radio, and
        // selecting it here would rewrite the form value on mere traversal.
        // Clicks are unaffected: the item's own handleClick selects.
        if (!e.currentTarget.contains(e.relatedTarget)) {
            return;
        }
        // A mouse or pen press moves focus at pointerdown. A finger moves it
        // after the lift, before the tap's click. The press commits through
        // that click, so this focus move selects nothing.
        if (selection.isPressing()) {
            return;
        }
        const focused = e.target?.closest('[role="radio"][data-value]');
        if (!focused || focused.getAttribute('aria-disabled') === 'true') {
            return;
        }
        const nextValue = focused.dataset.value;
        if (nextValue != null && nextValue !== value) {
            onChange(nextValue);
        }
    }, [
        onFocusProp,
        hint,
        handleFocus,
        isDisabled,
        onChange,
        selection,
        value
    ]);
    const contextValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            value,
            onChange,
            size,
            layout,
            isDisabled,
            disabledReasonID: showsDisabledMessage ? disabledMessageTooltip.describedBy : undefined,
            isTouchPresentation
        }), [
        value,
        onChange,
        size,
        layout,
        isDisabled,
        showsDisabledMessage,
        disabledMessageTooltip.describedBy,
        isTouchPresentation
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$SegmentedControlContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SegmentedControlContext"], {
        value: contextValue,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                ref: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMergedRefs"])(ref, listRef, trackRef, attachTrack, disabledMessageTooltip.ref),
                ...rest,
                role: "radiogroup",
                "aria-label": label,
                "aria-disabled": isDisabled || undefined,
                "aria-describedby": (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputAria$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["joinAriaIDs"])(ariaDescribedByProp, showsDisabledMessage ? disabledMessageTooltip.describedBy : undefined),
                onKeyDown: handleContainerKeyDown,
                onFocus: handleContainerFocus,
                onBlur: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(onBlurProp, hint.onBlur),
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('segmented-control', {
                    size
                }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.container, sizeStyles[size], layout === 'fill' && styles.fill, (isTouchPresentation || !isDisabled) && styles.lens, isDisabled && styles.disabled, xstyle), className, style),
                children: [
                    children,
                    hint.hintElement
                ]
            }),
            showsDisabledMessage && disabledMessageTooltip.renderTooltip(disabledMessage)
        ]
    });
}
SegmentedControl.displayName = 'SegmentedControl';
/**
 * The control's segments, its Tab stop first: the selected segment, enabled
 * or not, else the first segment not disabled by its own isDisabled, else the
 * first (FR2, FR7).
 */ function orderTabStop(list) {
    const segments = Array.from(list.querySelectorAll('[role="radio"]'));
    const stop = segments.find((segment)=>segment.getAttribute('aria-checked') === 'true') ?? segments.find((segment)=>!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$segmentDisabled$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSegmentDisabledOnItsOwn"])(segment)) ?? segments[0];
    return stop == null ? [] : [
        stop,
        ...segments.filter((segment)=>segment !== stop)
    ];
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/SegmentedControl/SegmentedControlContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SegmentedControlContext",
    ()=>SegmentedControlContext,
    "useSegmentedControlContext",
    ()=>useSegmentedControlContext
]);
/**
 * @file SegmentedControlContext.ts
 * @input Layer-scoped React context, use
 * @output Exports SegmentedControlContext, useSegmentedControlContext
 * @position Context provider; consumed by SegmentedControlItem.tsx
 *
 * SYNC: When modified, update /packages/core/src/SegmentedControl/SegmentedControl.doc.mjs
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const SegmentedControlContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('SegmentedControlContext', 1, null);
SegmentedControlContext.displayName = 'SegmentedControlContext';
function useSegmentedControlContext() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(SegmentedControlContext);
    if (ctx == null) {
        throw new Error('useSegmentedControlContext must be used within SegmentedControl. ' + 'Wrap your SegmentedControlItem in <SegmentedControl>.');
    }
    return ctx;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/SegmentedControl/SegmentedControlItem.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SegmentedControlItem",
    ()=>SegmentedControlItem
]);
/**
 * @file SegmentedControlItem.tsx
 * @input Uses React, StyleX, SegmentedControlContext
 * @output Exports SegmentedControlItem component and SegmentedControlItemProps type
 * @position Child item; renders as a radio button within the segmented control
 *
 * SYNC: When modified, update:
 * - /packages/core/src/SegmentedControl/useSegmentedSelectionMotion.ts (the title marker)
 * - /packages/core/src/SegmentedControl/SegmentedControl.doc.mjs
 * - /packages/core/src/SegmentedControl/index.ts
 * - /packages/core/src/SegmentedControl/SegmentedControl.test.tsx
 * - /packages/cli/assets/templates/blocks/components/SegmentedControl/ (showcase blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputAria$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputAria.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$segmentDisabled$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/segmentDisabled.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$segmentTitle$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/segmentTitle.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$SegmentedControlContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/SegmentedControl/SegmentedControlContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/composeEventHandlers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/focusOutline.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/interactionOverlay.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$usePressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/usePressFeedback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/isRenderable.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMergedRefs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchHitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/touchHitArea.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$internal$2f$touchHitArea$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/internal/touchHitArea.stylex.js [app-ssr] (ecmascript)");
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
// =============================================================================
// Styles
// =============================================================================
const styles = {
    base: {
        kVAEAm: "x1n2onr6",
        k1xSpc: "x3nfvp2",
        kGNEyG: "x6s0dn4",
        kjj79g: "xl56j7k",
        kOIVth: "xzye2dw",
        kg3NbH: "xrrkdod",
        kWkggS: "xjbqb8w",
        kMzoRj: "xc342km",
        ksu8eU: "xng3xce",
        kMv6JI: "xjb2p0i",
        kGuDYH: "xcr08ib",
        kLWn49: "x1kq96og",
        k63SB2: "x1e4wzip",
        kMwMTN: "xv1l7n4",
        kkrTdU: "x1ypdohk x16khyan",
        khDVqt: "xuxw1ft",
        k7Eaqz: "xeuugli",
        k1ekBW: "x1vix5yk",
        kIyJzY: "xuedmi6",
        kAMwcw: "xlr8y92",
        $$css: true
    },
    selected: {
        kAXs8y: "x1kzknox",
        kMwMTN: "x1tgivj0 x1k5gbb1",
        k63SB2: "x2mo6ok",
        kWkggS: "x10xzikg x1jzqe4",
        kGVxlE: "x1i5ehqx",
        $$css: true
    },
    disabled: {
        kkrTdU: "xt0e3qv",
        kMwMTN: "xnbbluu",
        $$css: true
    },
    fill: {
        kUk6DE: "x98rzlu",
        k7Eaqz: "xeuugli",
        kjj79g: "xl56j7k",
        $$css: true
    },
    iconOnly: {
        kmuXW: "x2lah0s",
        $$css: true
    },
    icon: {
        k1xSpc: "x3nfvp2",
        kGNEyG: "x6s0dn4",
        kjj79g: "xl56j7k",
        kmuXW: "x2lah0s",
        $$css: true
    },
    touchPresentation: {
        k1ekBW: "x13b0p5u",
        $$css: true
    }
};
const CONCENTRIC_RADIUS = 'max(0px, calc(var(--_segmented-control-radius) - var(--_segmented-control-padding)))';
const sizeStyles = {
    sm: {
        kZKoxP: "xzj98nu",
        kaIpWk: "xc910v0",
        kg3NbH: "xf314gf",
        kGuDYH: "x141an7d",
        $$css: true
    },
    md: {
        kZKoxP: "x184gfjb",
        kaIpWk: "xc910v0",
        kg3NbH: "xrrkdod",
        $$css: true
    },
    lg: {
        kZKoxP: "x1uiybsj",
        kaIpWk: "xc910v0",
        kg3NbH: "xrrkdod",
        $$css: true
    }
};
const iconSizeStyles = {
    sm: {
        kzqmXN: "x6jxa94",
        kZKoxP: "x1v9usgg",
        $$css: true
    },
    md: {
        kzqmXN: "x1kky2od",
        kZKoxP: "xlup9mm",
        $$css: true
    },
    lg: {
        kzqmXN: "x1xp8n7a",
        kZKoxP: "xmix8c7",
        $$css: true
    }
};
function SegmentedControlItem({ ref, value, label, isLabelHidden = false, icon, isDisabled = false, onClick: onClickProp, xstyle, 'aria-describedby': ariaDescribedByProp, ...rest }) {
    const pressable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$usePressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePressFeedback"])();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$SegmentedControlContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSegmentedControlContext"])();
    const isSelected = ctx.value === value;
    const isItemDisabled = isDisabled || ctx.isDisabled;
    const size = ctx.size;
    const isFill = ctx.layout === 'fill';
    // Consumer-first: a consumer onClick can call preventDefault() to opt out of
    // selection; otherwise selection proceeds when enabled and not selected.
    // A disabled segment invokes no caller callback (spec:AST-085 FR2), so the
    // consumer onClick is left out while it is disabled, including the selected
    // segment of a group disabled with a reason, which stays focusable.
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(isItemDisabled ? undefined : onClickProp, ()=>{
        if (!isItemDisabled && !isSelected) {
            ctx.onChange(value);
        }
    });
    // A disabled segment takes no taps, so it gets no band.
    const hasHitArea = !isItemDisabled;
    const segmentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMergedRefs"])(ref, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchHitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTouchHitArea"])(hasHitArea));
    const iconElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRenderable"])(icon) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.icon, iconSizeStyles[size]),
        children: icon
    }) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("button", {
        ref: segmentRef,
        ...rest,
        type: "button",
        role: "radio",
        "aria-checked": isSelected,
        "aria-disabled": isItemDisabled || undefined,
        "aria-label": isLabelHidden ? label : undefined,
        "aria-describedby": (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputAria$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["joinAriaIDs"])(ariaDescribedByProp, ctx.disabledReasonID),
        "data-value": value,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$segmentDisabled$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["segmentDisabledProps"])(isDisabled),
        ...!isSelected && !isItemDisabled ? pressable : undefined,
        // The selected segment holds the Tab stop, disabled or not (spec:AST-085
        // FR1); activation stays blocked by the isItemDisabled guard. With no
        // selected segment, the group places the stop (SegmentedControl FR2).
        tabIndex: isSelected ? 0 : -1,
        onClick: handleClick,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('segmented-control-item', {
            size,
            selected: isSelected ? 'selected' : null,
            disabled: isItemDisabled ? 'disabled' : null
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusOutlineProps"].focusVisible(styles.base, sizeStyles[size], isFill && styles.fill, isLabelHidden && styles.iconOnly, isSelected && styles.selected, // The shared hover and pressed overlay, on the segments a press can
        // change: the selected segment keeps its raised surface as it is.
        !isSelected && !isItemDisabled && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["interactionOverlayStyles"].backgroundColor, isItemDisabled && styles.disabled, hasHitArea && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$internal$2f$touchHitArea$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["touchHitAreaStyles"].layer, ctx.isTouchPresentation === true && styles.touchPresentation, xstyle)),
        children: [
            iconElement,
            !isLabelHidden && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$segmentTitle$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["segmentTitleProps"],
                ...{
                    className: "xb3r6kr xlyipyv xeuugli"
                },
                children: label
            })
        ]
    });
}
SegmentedControlItem.displayName = 'SegmentedControlItem';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/SegmentedControl/useSegmentedSelectionMotion.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LAYER_GEOMETRY",
    ()=>LAYER_GEOMETRY,
    "SEGMENT_SELECTOR",
    ()=>SEGMENT_SELECTOR,
    "SURFACE_PROPERTIES",
    ()=>SURFACE_PROPERTIES,
    "SegmentedSelectionMotion",
    ()=>SegmentedSelectionMotion,
    "layerVariable",
    ()=>layerVariable,
    "useSegmentedSelectionMotion",
    ()=>useSegmentedSelectionMotion
]);
/**
 * @file useSegmentedSelectionMotion.ts
 * @input The radiogroup, the selected value, the presentation and tracking
 *   flags; the animator, the UIKit table and the touch tracking
 * @output Exports `useSegmentedSelectionMotion`, `SegmentedSelectionMotion`,
 *   the layer custom properties and the segment and title selectors
 * @position SegmentedControl's touch layer
 *
 * SYNC: When modified, update:
 * - /packages/core/src/SegmentedControl/SegmentedControl.tsx (the pseudo-elements)
 * - /packages/core/src/SegmentedControl/SegmentedControlItem.tsx (the title marker)
 * - /packages/core/src/SegmentedControl/useSegmentedTouchTracking.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$animator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/animator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$segmented$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/segmented.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$springs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/springs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsomorphicLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedResizeObserver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedResizeObserver.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$segmentTitle$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/segmentTitle.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$progress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/progress.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$themeTiming$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/themeTiming.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$useSegmentedTouchTracking$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/SegmentedControl/useSegmentedTouchTracking.js [app-ssr] (ecmascript)");
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
const SEGMENT_SELECTOR = '[role="radio"][data-value]';
/**
 * The selected face moves to another segment only when the lens's center is
 * this far past the boundary. The distance is a quarter of that segment's
 * width, at least 8 px.
 */ const FACE_HYSTERESIS_RATIO = 0.25;
const FACE_HYSTERESIS_MIN_PX = 8;
const SURFACE_PROPERTIES = [
    'background-color',
    'background-image',
    'background-position',
    'background-size',
    'background-repeat',
    'background-origin',
    'background-clip',
    'box-shadow',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-bottom-right-radius',
    'border-bottom-left-radius',
    'border-top-width',
    'border-right-width',
    'border-bottom-width',
    'border-left-width',
    'border-top-style',
    'border-right-style',
    'border-bottom-style',
    'border-left-style',
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
    'backdrop-filter',
    '-webkit-backdrop-filter'
];
const LAYER_GEOMETRY = [
    'left',
    'top',
    'width',
    'height',
    'visibility'
];
/**
 * The lifted lens's edge: the theme's low elevation, as on Switch's lifted
 * thumb. The lens copies the selected surface, which can match the page.
 * Without an edge, a lifted lens hides the track around it.
 */ const LIFTED_SHADOW = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shadowVars"]['--shadow-low'];
function layerVariable(layer, property) {
    return `--_segmented-${layer}-${property.replace(/^-+/, '')}`;
}
/**
 * What the destination segment shows while the lens carries its surface.
 * Written inline with priority so a theme's rule for the selected segment
 * cannot paint a second surface; borders keep their width so nothing moves.
 */ const HIDDEN_SURFACE = [
    [
        'background-color',
        'transparent'
    ],
    [
        'background-image',
        'none'
    ],
    [
        'box-shadow',
        'none'
    ],
    [
        'border-top-color',
        'transparent'
    ],
    [
        'border-right-color',
        'transparent'
    ],
    [
        'border-bottom-color',
        'transparent'
    ],
    [
        'border-left-color',
        'transparent'
    ],
    [
        'backdrop-filter',
        'none'
    ],
    [
        '-webkit-backdrop-filter',
        'none'
    ]
];
/** A title's face: what a dragging finger moves between titles. */ /** A box in the track's padding-box coordinates, in CSS px. */ /** A finger's touch, from landing to letting go. */ /**
 * The motion a release starts after its commit's click runs. It aims at the
 * destination's box when the new value shows, because the titles' new weights
 * move the segments. Until the value comes back, it aims at the box measured
 * at landing.
 */ function faceOf(element) {
    const style = getComputedStyle(element);
    return {
        color: style.color,
        fontWeight: style.fontWeight
    };
}
/**
 * A hidden segment's own inline declarations (its `style`) for the properties
 * `hideSurface` overrides: value and priority, restored by `showSurface`.
 */ const ownSurface = new WeakMap();
function hideSurface(segment) {
    if (!ownSurface.has(segment)) {
        ownSurface.set(segment, HIDDEN_SURFACE.map(([property])=>[
                property,
                segment.style.getPropertyValue(property),
                segment.style.getPropertyPriority(property)
            ]));
    }
    for (const [property, value] of HIDDEN_SURFACE){
        segment.style.setProperty(property, value, 'important');
    }
}
/** Gives a hidden segment its surface back, its own inline values included. */ function showSurface(segment) {
    const own = ownSurface.get(segment);
    if (own == null) {
        return;
    }
    ownSurface.delete(segment);
    for (const [property, value, priority] of own){
        if (value === '') {
            segment.style.removeProperty(property);
        } else {
            segment.style.setProperty(property, value, priority);
        }
    }
}
/**
 * Paints `layer` with `segment`'s computed surface. All values are read
 * before any is written. A write to the track's style makes the next
 * computed-style read recompute. Interleaved reads and writes restyle the
 * control once per property.
 */ function paintLayer(track, layer, segment) {
    const style = getComputedStyle(segment);
    const values = SURFACE_PROPERTIES.map((property)=>style.getPropertyValue(property));
    SURFACE_PROPERTIES.forEach((property, index)=>{
        track.style.setProperty(layerVariable(layer, property), values[index]);
    });
}
/** Copies the lens's paint onto the ::after. */ function copyLensPaint(track) {
    for (const property of SURFACE_PROPERTIES){
        track.style.setProperty(layerVariable('after', property), track.style.getPropertyValue(layerVariable('lens', property)));
    }
}
/** Lays `layer` out on `box` and shows it. */ function placeLayer(track, layer, box) {
    track.style.setProperty(layerVariable(layer, 'left'), `${box.x}px`);
    track.style.setProperty(layerVariable(layer, 'top'), `${box.y}px`);
    track.style.setProperty(layerVariable(layer, 'width'), `${box.width}px`);
    track.style.setProperty(layerVariable(layer, 'height'), `${box.height}px`);
    track.style.setProperty(layerVariable(layer, 'visibility'), 'visible');
}
/** Hides `layer` and drops its custom properties. */ function clearLayer(track, layer) {
    for (const property of [
        ...LAYER_GEOMETRY,
        ...SURFACE_PROPERTIES
    ]){
        track.style.removeProperty(layerVariable(layer, property));
    }
}
/**
 * The scale an ancestor transform applies to the track's client rects. The
 * lens lays out untransformed. `offsetWidth` rounds to whole pixels, so a
 * fractional track width reads as a scale slightly off 1. Only a real
 * transform moves it further than that rounding.
 */ function scaleOf(track, rect) {
    if (track.offsetWidth <= 0 || rect.width <= 0) {
        return 1;
    }
    return Math.abs(rect.width - track.offsetWidth) <= 1 ? 1 : rect.width / track.offsetWidth;
}
/** Boxes relative to the track's padding box. */ function boxesIn(track) {
    const trackRect = track.getBoundingClientRect();
    const scale = scaleOf(track, trackRect);
    return (element)=>{
        const rect = element.getBoundingClientRect();
        return {
            x: (rect.left - trackRect.left) / scale - track.clientLeft,
            y: (rect.top - trackRect.top) / scale - track.clientTop,
            width: rect.width / scale,
            height: rect.height / scale
        };
    };
}
/** Maps a client x to the track's padding-box x, read once per touch. */ function trackXIn(track) {
    const rect = track.getBoundingClientRect();
    const scale = scaleOf(track, rect);
    return (clientX)=>(clientX - rect.left) / scale - track.clientLeft;
}
function segmentsOf(track) {
    return Array.from(track.querySelectorAll(SEGMENT_SELECTOR));
}
function isLaidOut(box) {
    return box.width > 0 && box.height > 0;
}
function center(box) {
    return box.x + box.width / 2;
}
/** Whether two boxes are the same to a quarter of a pixel. */ function isSameBox(a, b) {
    return Math.abs(a.x - b.x) < 0.25 && Math.abs(a.y - b.y) < 0.25 && Math.abs(a.width - b.width) < 0.25 && Math.abs(a.height - b.height) < 0.25;
}
function isEnabledSegment(segment) {
    return !segment.hasAttribute('disabled') && segment.getAttribute('aria-disabled') !== 'true';
}
const titleOf = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$segmentTitle$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["titleOfSegment"];
/** A theme that gives the segments no transition: the lens lands at once. */ const INSTANT = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$themeTiming$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["easedProgress"])(0.001, (progress)=>progress);
/** What the control reads of its selection motion. */ function defaultNow() {
    return typeof performance === 'undefined' ? Date.now() : performance.now();
}
class SegmentedSelectionMotion {
    track = null;
    carried = null;
    /**
   * Segments whose surface the lens carried until a change turned it
   * elsewhere. They keep their surface hidden until the lens lands. A tap's
   * press paint can still fade on such a segment. That paint would cover the
   * lens, which sits under the segments' backgrounds, while the lens crosses
   * it.
   */ abandoned = new Set();
    /** The segment showing the selected face under a dragging finger. */ facedSegment = null;
    /** The frame request that keeps the face on the lens while it is carried. */ lensFrame = null;
    /** Titles wearing the other face's color during a drag. */ faceOverrides = new Set();
    /** The motions the hand-back waits for. */ running = new Set();
    /** A finger holds the lens: a drag from the selected segment carries it. */ isHeld = false;
    /** The held lens grew by `liftGrowth`; its settle shrinks it back. */ isLifted = false;
    /**
   * The lifted lens wears the theme's elevation. The hand-back clears this
   * shadow with the lens, so a commit's repaint keeps it until then.
   */ hasLiftedEdge = false;
    /**
   * The touch presentation applies (a coarse primary pointer), so every
   * change slides on UIKit's springs. When it is off, a change slides on the
   * theme's duration and easing, as the segments' transition does. A drag from
   * the selected segment carries the lens on the pointer itself.
   */ isPresenting = true;
    /**
   * Segments whose own transitions are off while a fine pointer's carry is
   * on screen, with their own inline values to give back.
   */ stilled = new Map();
    /** The frame request that gives the stilled segments their transitions back. */ thawFrame = null;
    touch = null;
    /**
   * The value a touch already moved the lens to: the selection change that
   * follows (the controlled value coming back) re-aims the lens.
   */ committed = null;
    /**
   * The commit's click ran without a veto: the lens waits for the value
   * until the slide settles.
   */ isAwaitingValue = false;
    /** The motion a release starts once its commit's click has run. */ pending = null;
    /** The last release was a finger's (decline and re-aim follow it). */ releasedByFinger = true;
    /** The ::after shows the leaving surface (Reduced Motion). */ isLeavingShown = false;
    /** Bumped by every leaving fade; a finished fade clears only its own. */ leaving = 0;
    /** The ::after: the surface fading out under Reduced Motion. */ constructor(animator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$animator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createMotionEngine"])(null, {
        pseudoElement: '::before'
    }), options = {}){
        this.animator = animator;
        // The chase plays the shared `springs.fingerTracking` role, which
        // registers as its module loads. The slide plays the segmented role, which
        // registers here before the first animation. A second call does nothing.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$springs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerSpringsTable"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$segmented$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerSegmentedTable"])();
        this.now = options.now ?? defaultNow;
        this.after = options.afterAnimator ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$animator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createMotionEngine"])(null, {
            pseudoElement: '::after',
            initial: {
                opacity: 0
            }
        });
    }
    /** Attaches the radiogroup whose pseudo-elements are the lens (null detaches). */ attachTrack(element) {
        if (element !== this.track) {
            this.settle();
        }
        this.track = element;
        this.animator.attach(element);
        this.after.attach(element);
    }
    /** True while the lens carries the selected surface. */ get isSliding() {
        return this.carried != null;
    }
    /** A press (any pointer's) is down on the control, from landing to letting go. */ get isPressed() {
        return this.touch != null;
    }
    /**
   * Whether the touch presentation applies. Off, under a fine primary
   * pointer, a change slides on the theme's timing, and a drag from the
   * selected segment still carries the lens. A change of presentation hands
   * anything in flight back.
   */ present(isPresenting) {
        if (this.isPresenting === isPresenting) {
            return;
        }
        this.isPresenting = isPresenting;
        this.settle();
    }
    /** The segment that commits `value`, if the track has one. */ segmentFor(track, value) {
        return segmentsOf(track).find((segment)=>segment.dataset.value === value) ?? null;
    }
    /** The selection moved from `from` to `to`; the DOM already shows `to`. */ select(track, from, to) {
        if (this.track !== track) {
            return;
        }
        const origin = this.segmentFor(track, from);
        const destination = this.segmentFor(track, to);
        const isTouchCommit = this.committed === to;
        // The commit's own styles take over from a drag's borrowed faces.
        this.clearFaces();
        this.committed = null;
        this.isAwaitingValue = false;
        if (isTouchCommit) {
            if (this.pending?.destination === destination && destination != null) {
                // Adopted during the click: the lens moves now, on the box the
                // destination has with the new value shown.
                this.startPending(destination, boxesIn(track)(destination));
            }
            // The new selection now paints the surface the lens carries, and its
            // titles' weights may have moved the segments since the lens set off.
            const carried = this.carried;
            if (carried != null && carried.segment === destination) {
                if (carried.hidden !== destination) {
                    showSurface(carried.hidden);
                    this.paintLens(track, destination);
                    hideSurface(destination);
                    carried.hidden = destination;
                }
                this.reaim(track, destination);
            }
            return;
        }
        if (!this.slidesChanges()) {
            // A fine pointer under Reduce Motion: the theme's transition shows the
            // change.
            this.settle();
            return;
        }
        if (destination == null) {
            // Nothing is selected any more: no surface to carry.
            this.settle();
            return;
        }
        if (this.carried == null && origin == null) {
            // Nothing was selected: there is no surface to slide from.
            return;
        }
        const boxOf = boxesIn(track);
        const to_ = boxOf(destination);
        if (!isLaidOut(to_)) {
            this.settle();
            return;
        }
        const from_ = this.carried == null ? boxOf(origin) : null;
        if (this.animator.reducedMotion() !== 'off') {
            this.crossFadeTo(destination, to_, from_, destination, false);
            return;
        }
        const at = this.carry(destination, to_, from_, destination);
        // A programmatic or keyboard change: the whole box slides.
        this.settleLens(destination, {
            at
        });
    }
    /**
   * Whether a change of value slides the lens. A fine pointer under Reduce
   * Motion leaves the change to the theme's transition.
   */ slidesChanges() {
        return this.isPresenting || this.animator.reducedMotion() === 'off';
    }
    /**
   * A press landed on `origin`, the segment the action-group tracker resolved
   * for it (null: none). It reads the track's geometry and title faces once.
   * Under Reduced Motion a finger's release cross-fades.
   */ begin(track, origin, isFinger = true) {
        const segments = segmentsOf(track);
        const boxOf = boxesIn(track);
        const boxes = new Map(segments.map((segment)=>[
                segment,
                boxOf(segment)
            ]));
        const toTrackX = trackXIn(track);
        const selected = segments.find((segment)=>segment.getAttribute('aria-checked') === 'true') ?? null;
        const carriesLens = origin != null && origin === selected;
        const selectedTitle = selected != null ? titleOf(selected) : null;
        // An enabled segment's unselected face: a disabled title has its own.
        const other = segments.find((segment)=>segment !== selected && isEnabledSegment(segment));
        const otherTitle = other != null ? titleOf(other) : null;
        const faces = selectedTitle != null && otherTitle != null ? {
            selected: faceOf(selectedTitle),
            unselected: faceOf(otherTitle)
        } : null;
        this.touch = {
            toTrackX,
            boxes,
            origin,
            carriesLens,
            isFinger,
            faces
        };
    }
    /**
   * The press tracker highlighted the press, as UIControl does: at once, or
   * after a scroller's content delay. A press on the selected segment lifts
   * the lens then. A touch the page scrolls first lifts nothing.
   */ highlighted() {
        if (this.touch?.carriesLens === true) {
            this.lift();
        }
    }
    /**
   * The lens binds on the selected segment and grows by `liftGrowth` on the
   * `lift` spring. A slide still on its way goes on to that segment on the
   * slide spring, at its own speed. Any pointer lifts it under the touch
   * presentation, as Switch's thumb does. A fine primary pointer and Reduce
   * Motion keep it at its resting size.
   */ lift() {
        if (this.isLifted || !this.isPresenting || this.animator.reducedMotion() !== 'off') {
            return;
        }
        this.hold();
        const carried = this.carried;
        if (!this.isHeld || carried == null) {
            return;
        }
        const [width, height] = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$segmented$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["segmentedControl"].liftGrowth;
        const lifted = {
            scaleX: (carried.box.width + width) / carried.box.width,
            scaleY: (carried.box.height + height) / carried.box.height
        };
        this.isLifted = true;
        this.hasLiftedEdge = true;
        const position = {
            x: 0
        };
        this.springLens(position, this.springFrom(position, 'selection'));
        this.springLens(lifted, this.springFrom(lifted, 'lift'));
        this.showLiftedEdge();
    }
    /** The lifted lens's edge: the theme's low elevation. */ showLiftedEdge() {
        this.track?.style.setProperty(layerVariable('lens', 'box-shadow'), LIFTED_SHADOW);
    }
    /** Paints the lens with `segment`'s surface; a lifted lens keeps its edge. */ paintLens(track, segment) {
        paintLayer(track, 'lens', segment);
        if (this.hasLiftedEdge) {
            this.showLiftedEdge();
        }
    }
    /**
   * The finger moved to `clientX`. A drag from the selected segment carries
   * the lens. A touch elsewhere leaves the lens alone, and that segment shows
   * the shared pressed overlay.
   */ drag(clientX) {
        const touch = this.touch;
        if (touch == null || !touch.carriesLens) {
            return;
        }
        // A drag that starts before the highlight lifts the lens as well.
        this.lift();
        this.hold();
        if (!this.isHeld) {
            return;
        }
        this.chase(clientX);
        this.followLens();
    }
    /**
   * A finger's press on the selected segment, or the first move of a drag
   * from it, binds the lens there. Under Reduced Motion too: the lens follows
   * the hand, and only the release cross-fades.
   */ hold() {
        const touch = this.touch;
        if (touch == null || touch.origin == null || this.isHeld) {
            return;
        }
        const box = touch.boxes.get(touch.origin);
        if (!isLaidOut(box)) {
            return;
        }
        this.carry(touch.origin, box, null, touch.origin);
        this.isHeld = true;
    }
    /**
   * The selected face follows the held lens: it goes to the segment under the
   * lens's presented center. Hysteresis around each boundary keeps a finger
   * that rests on a boundary from flipping it. This runs every frame while
   * the lens is held, so the face keeps up as the lens settles under a still
   * finger.
   */ followLens() {
        const touch = this.touch;
        const carried = this.carried;
        if (touch == null || !touch.carriesLens || !this.isHeld || carried == null || touch.origin == null) {
            this.lensFrame = null;
            return;
        }
        const lensCenter = this.presented(carried.box, this.now()).center;
        const spans = [
            ...touch.boxes.entries()
        ].filter(([segment])=>isEnabledSegment(segment)).sort((a, b)=>a[1].x - b[1].x);
        const current = this.facedSegment ?? touch.origin;
        const at = spans.findIndex(([segment])=>segment === current);
        if (at >= 0) {
            const edge = (i)=>(spans[i][1].x + spans[i][1].width + spans[i + 1][1].x) / 2;
            let next = at;
            while(next + 1 < spans.length && lensCenter > edge(next)){
                next += 1;
            }
            while(next > 0 && lensCenter < edge(next - 1)){
                next -= 1;
            }
            if (next !== at) {
                const boundary = next > at ? edge(at) : edge(at - 1);
                const hysteresis = Math.max(FACE_HYSTERESIS_MIN_PX, FACE_HYSTERESIS_RATIO * spans[next][1].width);
                if (Math.abs(lensCenter - boundary) >= hysteresis) {
                    const segment = spans[next][0];
                    this.showFaceAt(segment === touch.origin ? null : segment);
                }
            }
        }
        const view = this.track?.ownerDocument.defaultView;
        if (this.lensFrame == null && view != null) {
            this.lensFrame = view.requestAnimationFrame(()=>{
                this.lensFrame = null;
                this.followLens();
            });
        }
    }
    /** The held lens's center chases the finger at `clientX`. */ chase(clientX) {
        const touch = this.touch;
        const carried = this.carried;
        if (touch == null || carried == null) {
            return;
        }
        const centers = [
            ...touch.boxes.values()
        ].map(center);
        const reach = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$segmented$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["segmentedControl"].dragOvershoot;
        const target = Math.min(Math.max(touch.toTrackX(clientX), Math.min(...centers) - reach), Math.max(...centers) + reach);
        if (!this.isPresenting || this.animator.reducedMotion() !== 'off') {
            // A mouse or a pen holds the lens directly, as a finger does under
            // Reduce Motion. Each move writes the pointer's position.
            this.animator.set({
                x: target - center(carried.box)
            });
            return;
        }
        // Start each chase at the call. A chase from rest waits for the browser
        // to start it. Android Chrome sends the next move first, so the lens
        // would stick.
        const at = this.now();
        this.springLens({
            x: target - center(carried.box)
        }, this.springFrom({
            x: target - center(carried.box)
        }, 'tracking'), {
            at
        });
    }
    /**
   * The finger let go on `target`, the segment the tracker resolved for it
   * (null: none, or a disabled one). Moves the lens there and returns its
   * value when it is not the selected one (the tracker's lift commits it
   * through its click), else null.
   */ release(target) {
        const touch = this.touch;
        this.touch = null;
        if (touch == null) {
            return null;
        }
        const selected = [
            ...touch.boxes.keys()
        ].find((segment)=>segment.getAttribute('aria-checked') === 'true') ?? null;
        // A disabled segment never commits: the lens settles back on the
        // selection.
        const destination = (target != null && isEnabledSegment(target) ? target : null) ?? selected;
        if (destination == null) {
            this.clearFaces();
            if (this.isHeld) {
                this.isHeld = false;
                this.settle();
            }
            return null;
        }
        const box = touch.boxes.get(destination);
        const value = destination !== selected ? destination.dataset.value ?? null : null;
        // A drag's borrowed face stays only if the lift commits (the commit
        // takes it over).
        if (value == null) {
            this.clearFaces();
        }
        const isHeld = touch.carriesLens && this.isHeld;
        this.committed = value;
        this.isAwaitingValue = false;
        this.releasedByFinger = touch.isFinger;
        if (value == null) {
            if (isHeld) {
                // The held lens settles back on the selection.
                this.moveLensTo(destination, box, selected ?? destination, touch.isFinger);
            }
            return null;
        }
        // The commit follows at once, through the segment's click; the lens
        // moves once it has run, on the box the destination has then. A held
        // lens settles there; a tap (or a drag that started elsewhere) slides
        // there from the selected segment.
        // A fine pointer under Reduce Motion moves only a held lens.
        if (isHeld || selected != null && this.slidesChanges()) {
            this.pending = {
                destination,
                box,
                isHeld,
                from: !isHeld && selected != null ? touch.boxes.get(selected) : null,
                touchRelease: touch.isFinger
            };
        }
        return value;
    }
    /**
   * The commit's click for `value` has run. A click that the item's
   * `onClick` cancels sends the lens back at once. Otherwise the lens waits
   * for the value, which a parent can adopt later.
   */ clicked(track, value, isCancelled) {
        if (this.committed !== value) {
            // Adopted during the click, or superseded.
            return;
        }
        if (isCancelled) {
            this.pending = null;
            this.decline(track, value);
            return;
        }
        this.isAwaitingValue = true;
        // React can render the click's change only after the event that
        // dispatched it ends: a click inside a touch handler is batched with it.
        // Wait one turn. If the value is adopted by then, the lens already moves
        // on the new box. Otherwise it aims at the box measured at landing and
        // re-aims when the value comes back.
        queueMicrotask(()=>{
            if (this.committed === value && this.pending != null) {
                this.startPending(this.selectedIn(track));
            }
        });
    }
    /**
   * The value the finger let go on was not adopted. The item's `onClick`
   * cancelled it, or a controlled parent kept its value. The lens goes back
   * to the selected segment. The next change to that value slides as any
   * change does.
   */ decline(track, value) {
        if (this.committed !== value) {
            return;
        }
        this.committed = null;
        this.isAwaitingValue = false;
        this.pending = null;
        this.clearFaces();
        const selected = segmentsOf(track).find((segment)=>segment.getAttribute('aria-checked') === 'true') ?? null;
        if (selected == null || this.carried == null) {
            this.settle();
            return;
        }
        const box = boxesIn(track)(selected);
        if (!isLaidOut(box)) {
            this.settle();
            return;
        }
        this.moveLensTo(selected, box, selected, this.releasedByFinger);
    }
    /** The touch was taken away (the page scrolled): the lens goes back. */ cancel() {
        const touch = this.touch;
        this.touch = null;
        this.clearFaces();
        if (touch == null || !touch.carriesLens || touch.origin == null || !this.isHeld) {
            // Nothing was held: nothing to put back.
            return;
        }
        const box = touch.boxes.get(touch.origin);
        this.moveLensTo(touch.origin, box, touch.origin, touch.isFinger);
    }
    /** Hands the surface back to its segment now and hides the lens. */ settle() {
        this.endLeaving();
        this.isHeld = false;
        this.isLifted = false;
        this.hasLiftedEdge = false;
        this.pending = null;
        const carried = this.carried;
        if (carried != null) {
            this.carried = null;
            this.running.clear();
            this.animator.stop();
            this.after.stop();
            showSurface(carried.hidden);
            for (const segment of this.abandoned){
                showSurface(segment);
            }
            this.abandoned.clear();
            if (this.track != null) {
                clearLayer(this.track, 'lens');
                clearLayer(this.track, 'after');
            }
            this.isLeavingShown = false;
        }
        // Once the surfaces are back on screen, so nothing fades in.
        this.thawTransitions();
    }
    /**
   * The control resized. The lens aims at boxes measured when its motion
   * began, so it hands the surface back rather than land somewhere stale.
   * Two cases keep the motion. In the first, the track keeps its measured
   * size: a new title weight resized a content-sized control before the box
   * was measured. In the second, a finger holds the lens.
   */ resized(track) {
        const carried = this.carried;
        // A finger that holds the lens reflows the titles itself, because the
        // selected face moves to the title under it. The lens follows the finger,
        // and the commit measures the destination again.
        if (carried == null || this.touch != null) {
            return;
        }
        if (Math.abs(track.offsetWidth - carried.trackSize.width) < 0.5 && Math.abs(track.offsetHeight - carried.trackSize.height) < 0.5) {
            return;
        }
        this.settle();
    }
    /**
   * Ends everything in flight (unmount). The controller stays usable, so an
   * effect cleanup followed by a setup (StrictMode's extra mount) loses
   * nothing.
   */ stop() {
        this.touch = null;
        if (this.lensFrame != null) {
            this.track?.ownerDocument.defaultView?.cancelAnimationFrame(this.lensFrame);
            this.lensFrame = null;
        }
        this.committed = null;
        this.isAwaitingValue = false;
        this.clearFaces();
        this.settle();
        this.cancelThaw();
        this.restoreTransitions();
    }
    /**
   * A fine pointer's carry. The segments' own transitions go off while the
   * lens is on screen, so the borrowed surface does not fade out and back in.
   * Under a finger, the touch presentation already turns them off.
   */ stillTransitions() {
        const track = this.track;
        if (track == null) {
            return;
        }
        this.cancelThaw();
        for (const segment of segmentsOf(track)){
            if (!this.stilled.has(segment)) {
                this.stilled.set(segment, [
                    segment.style.getPropertyValue('transition-property'),
                    segment.style.getPropertyPriority('transition-property')
                ]);
            }
            segment.style.setProperty('transition-property', 'none', 'important');
        }
    }
    /**
   * Gives the stilled segments their transitions back two frames after the
   * hand-back, once the surfaces it gave back have been on screen.
   */ thawTransitions() {
        if (this.stilled.size === 0 || this.thawFrame != null) {
            return;
        }
        const view = this.track?.ownerDocument.defaultView;
        if (view == null) {
            this.restoreTransitions();
            return;
        }
        this.thawFrame = view.requestAnimationFrame(()=>{
            this.thawFrame = view.requestAnimationFrame(()=>{
                this.thawFrame = null;
                this.restoreTransitions();
            });
        });
    }
    cancelThaw() {
        if (this.thawFrame != null) {
            this.track?.ownerDocument.defaultView?.cancelAnimationFrame(this.thawFrame);
            this.thawFrame = null;
        }
    }
    restoreTransitions() {
        for (const [segment, [value, priority]] of this.stilled){
            if (value === '') {
                segment.style.removeProperty('transition-property');
            } else {
                segment.style.setProperty('transition-property', value, priority);
            }
        }
        this.stilled.clear();
    }
    /** The selected segment, as the DOM shows it now. */ selectedIn(track) {
        return segmentsOf(track).find((segment)=>segment.getAttribute('aria-checked') === 'true') ?? null;
    }
    /**
   * Starts the motion the release left pending: on `box` (the destination's
   * box now) or the box measured at landing, showing `paint`'s surface (the
   * selected segment's).
   */ startPending(paint, box) {
        const pending = this.pending;
        this.pending = null;
        if (pending == null) {
            return;
        }
        const to = box ?? pending.box;
        const surface = this.carried?.hidden ?? paint ?? pending.destination;
        if (pending.isHeld) {
            this.moveLensTo(pending.destination, to, surface, pending.touchRelease);
        } else if (pending.from != null) {
            this.slideTo(pending.destination, to, pending.from, surface, pending.touchRelease);
        }
    }
    /**
   * Aims the lens at `destination`'s box as it is now: a value adopted
   * after its click (mid-flight) moves the segments with its titles' new
   * weights.
   */ reaim(track, destination) {
        const carried = this.carried;
        if (carried == null) {
            return;
        }
        const box = boxesIn(track)(destination);
        if (!isLaidOut(box) || isSameBox(box, carried.box)) {
            return;
        }
        this.moveLensTo(destination, box, carried.hidden, this.releasedByFinger);
    }
    /**
   * Binds the lens for `segment`, with `box` as its layout box and `paint`'s
   * surface, the selected segment's. It keeps what is on screen. With nothing
   * carried, it starts from `from`, a segment's resting box. Otherwise it
   * starts from the presented geometry, re-based onto the new box with its
   * velocities.
   */ carry(segment, box, from, paint) {
        const track = this.track;
        if (track == null) {
            return undefined;
        }
        if (!this.isPresenting) {
            // Before the surface is borrowed: it must not fade out.
            this.stillTransitions();
        }
        const previous = this.carried;
        let start;
        // Motion already on screen continues from this instant; a start from
        // rest waits for the browser to commit it (the animator's rule).
        let at;
        this.velocity = {};
        if (previous != null) {
            at = this.now();
            const presented = this.presented(previous.box, at);
            start = {
                x: presented.center - center(box),
                scaleX: presented.width / box.width,
                scaleY: presented.height / box.height
            };
            this.velocity = {
                x: this.animator.getVelocity('x', at),
                scaleX: this.animator.getVelocity('scaleX', at) * previous.box.width / box.width,
                scaleY: this.animator.getVelocity('scaleY', at) * previous.box.height / box.height
            };
        } else {
            const origin = from ?? box;
            start = {
                x: center(origin) - center(box),
                scaleX: origin.width / box.width,
                scaleY: origin.height / box.height
            };
        }
        if (previous?.hidden !== paint) {
            if (previous != null) {
                this.abandoned.add(previous.hidden);
            }
            // A segment abandoned mid-flight still has its surface hidden: read
            // its paint with it shown.
            if (this.abandoned.has(paint)) {
                showSurface(paint);
            }
            this.paintLens(track, paint);
            hideSurface(paint);
            this.abandoned.delete(paint);
        }
        placeLayer(track, 'lens', box);
        this.carried = {
            segment,
            box,
            hidden: paint,
            trackSize: {
                width: track.offsetWidth,
                height: track.offsetHeight
            }
        };
        // Opaque, whatever a Reduce Motion fade left.
        this.animator.set({
            ...start,
            opacity: 1
        });
        return at;
    }
    /** Velocities captured by the last `carry`, in the new box's units. */ velocity = {};
    /** A spring transition that keeps the captured velocities of `values`. */ springFrom(values, kind) {
        const spring = kind === 'selection' ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$segmented$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["segmentedControl"].selectionSpring : kind === 'lift' ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$segmented$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["segmentedControl"].lift : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$springs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["springs"].fingerTracking;
        const velocity = {};
        for (const key of Object.keys(values)){
            const v = this.velocity[key];
            if (v != null && v !== 0) {
                velocity[key] = v;
            }
        }
        // A captured velocity is spent by the first call that drives its channel.
        this.velocity = Object.fromEntries(Object.entries(this.velocity).filter(([key])=>!(key in values)));
        return Object.keys(velocity).length > 0 ? {
            spring,
            velocity
        } : {
            spring
        };
    }
    /**
   * The lens settles at its resting place on `segment`. Under a finger it
   * springs on the slide spring, and a lifted lens shrinks back on the lift's.
   * Under a fine pointer it takes the theme's duration and easing, as the
   * segments' own transition does.
   */ settleLens(segment, options) {
        const rest = {
            x: 0,
            scaleX: 1,
            scaleY: 1
        };
        if (this.isPresenting && this.isLifted) {
            this.isLifted = false;
            const position = {
                x: 0
            };
            const size = {
                scaleX: 1,
                scaleY: 1
            };
            this.springLens(position, this.springFrom(position, 'selection'), options);
            this.springLens(size, this.springFrom(size, 'lift'), options);
            return;
        }
        if (this.isPresenting) {
            this.springLens(rest, this.springFrom(rest, 'selection'), options);
            return;
        }
        this.velocity = {};
        // The segment's own transition carries the theme's duration and easing.
        // They stay readable while a carry turns its property off.
        const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$themeTiming$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readThemeTiming"])(segment) ?? INSTANT;
        const at = options.at;
        // Unclamped, so an easing that overshoots carries the lens with it.
        const toward = (from, to)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$progress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapProgress"])(progress, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$progress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapRange"])([
                0,
                1
            ], [
                from,
                to
            ], {
                clamp: false
            }));
        this.trackHandle(this.animator.play({
            x: toward(this.animator.get('x', at), 0),
            scaleX: toward(this.animator.get('scaleX', at), 1),
            scaleY: toward(this.animator.get('scaleY', at), 1)
        }, options));
    }
    /** Springs the lens toward `values`. */ springLens(values, transition, options) {
        this.trackHandle(this.animator.animate(values, transition, options));
    }
    /** The lens's presented center and size, from the animator. */ presented(box, at) {
        return {
            center: center(box) + this.animator.get('x', at),
            width: box.width * this.animator.get('scaleX', at),
            height: box.height * this.animator.get('scaleY', at)
        };
    }
    /**
   * The lens settles on `segment`, at its resting size. Under Reduced Motion
   * a finger's release (`touchRelease`) cross-fades on any primary pointer. A
   * mouse's or a pen's lands at once under a fine one.
   */ moveLensTo(segment, box, paint, touchRelease) {
        this.isHeld = false;
        if (!isLaidOut(box)) {
            this.settle();
            return;
        }
        if (this.animator.reducedMotion({
            touchRelease
        }) !== 'off') {
            this.crossFadeTo(segment, box, null, this.carried?.hidden ?? paint, touchRelease);
            return;
        }
        const at = this.carry(segment, box, null, this.carried?.hidden ?? paint);
        this.settleLens(segment, {
            at
        });
    }
    /**
   * A tap's slide: from `from` to `segment` on the slide spring. Under Reduced
   * Motion there is no travel, and a finger's tap (`touchRelease`) fades.
   */ slideTo(segment, box, from, paint, touchRelease) {
        if (!isLaidOut(box)) {
            this.settle();
            return;
        }
        if (this.animator.reducedMotion({
            touchRelease
        }) !== 'off') {
            this.crossFadeTo(segment, box, this.carried == null ? from : null, this.carried?.hidden ?? paint, touchRelease);
            return;
        }
        const at = this.carry(segment, box, this.carried == null ? from : null, this.carried?.hidden ?? paint);
        this.settleLens(segment, {
            at
        });
    }
    /**
   * Under Reduced Motion, the lens lands on `segment` and fades in there, as
   * an animator entrance. The surface on screen fades out in place on the
   * same clock. That surface is the lens when it was carried, else `from`'s
   * resting surface. The animator decides whether anything fades. On a fine
   * pointer, both change at once unless a touch released the change
   * (`touchRelease`).
   */ crossFadeTo(segment, box, from, paint, touchRelease) {
        const track = this.track;
        if (track == null) {
            return;
        }
        // What is on screen before the lens is rebound.
        let leaving = null;
        let opacity = 1;
        const previous = this.carried;
        if (previous != null) {
            const now = this.now();
            const presented = this.presented(previous.box, now);
            leaving = {
                x: presented.center - presented.width / 2,
                y: previous.box.y,
                width: presented.width,
                height: previous.box.height
            };
            opacity = this.animator.get('opacity', now);
        } else if (from != null) {
            leaving = from;
        }
        this.isHeld = false;
        this.endLeaving();
        this.after.stop();
        clearLayer(track, 'after');
        this.isLeavingShown = false;
        const fades = leaving != null && opacity > 0 && this.animator.reducedMotion({
            touchRelease
        }) === 'crossfade';
        if (fades) {
            this.leave(track, previous != null, paint, leaving, opacity, box);
        }
        const at = this.carry(segment, box, from, paint);
        this.velocity = {};
        this.trackHandle(this.animator.animate({
            x: 0,
            scaleX: 1,
            scaleY: 1
        }, {
            spring: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$segmented$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["segmentedControl"].selectionSpring
        }, {
            at,
            crossfadeAs: 'entrance',
            touchRelease
        }));
        if (fades) {
            this.fadeLeaving(box, leaving, at, touchRelease);
        }
    }
    /**
   * Paints the ::after with the surface on screen (the lens's paint, or
   * `paint`'s resting surface) where it is (`from`, at `opacity`).
   */ leave(track, fromLens, paint, from, opacity, box) {
        if (fromLens) {
            copyLensPaint(track);
        } else {
            paintLayer(track, 'after', paint);
        }
        placeLayer(track, 'after', {
            ...from,
            y: box.y,
            height: box.height
        });
        this.isLeavingShown = true;
        this.after.set({
            x: 0,
            scaleX: 1,
            scaleY: 1,
            opacity
        });
    }
    /**
   * The ::after fades out in place while the lens fades in on `box`. As a
   * leaving travel, it fades on the animator's Reduce Motion clock. It lands
   * only once it is invisible.
   */ fadeLeaving(box, from, at, touchRelease) {
        const id = ++this.leaving;
        const handle = this.after.animate({
            x: center(box) - center(from),
            opacity: 0
        }, {
            spring: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$segmented$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["segmentedControl"].selectionSpring
        }, {
            at,
            touchRelease
        });
        void handle.finished.then(()=>{
            if (this.leaving === id) {
                this.endLeaving();
            }
        });
    }
    endLeaving() {
        if (!this.isLeavingShown) {
            return;
        }
        this.isLeavingShown = false;
        this.leaving++;
        this.after.stop();
        if (this.track != null) {
            clearLayer(this.track, 'after');
        }
    }
    /**
   * Waits for `handle`; the surface goes back when nothing is left. A
   * touch's value still waiting to come back when the motion settles goes
   * back instead: the settled slide bounds the wait.
   */ trackHandle(handle) {
        this.running.add(handle);
        void handle.finished.then(()=>{
            this.running.delete(handle);
            if (this.running.size > 0 || this.isHeld || this.touch != null) {
                return;
            }
            const committed = this.committed;
            if (this.isAwaitingValue && committed != null && this.track != null) {
                this.decline(this.track, committed);
                return;
            }
            if (this.committed == null) {
                this.settle();
            }
        });
    }
    /**
   * Gives `segment`'s title the selected face and the selected segment's
   * title an unselected one (none for null or the selected segment), at once.
   */ showFaceAt(segment) {
        const touch = this.touch;
        const selected = touch?.origin ?? null;
        if (segment === this.facedSegment) {
            return;
        }
        this.clearFaces();
        if (touch?.faces == null || selected == null || segment == null || segment === selected) {
            return;
        }
        const title = titleOf(segment);
        const selectedTitle = titleOf(selected);
        if (title == null || selectedTitle == null) {
            return;
        }
        this.wearFace(title, touch.faces.selected);
        this.wearFace(selectedTitle, touch.faces.unselected);
        this.facedSegment = segment;
    }
    /**
   * Mid-drag, the face is the color alone. A weight swap changes the titles'
   * widths, which moves the segments under the finger and shakes the
   * boundary. The commit's own styles give the new weight at the lift.
   */ wearFace(title, face) {
        title.style.color = face.color;
        this.faceOverrides.add(title);
    }
    /** Every title back to its own face. */ clearFaces() {
        for (const title of this.faceOverrides){
            title.style.removeProperty('color');
        }
        this.faceOverrides.clear();
        this.facedSegment = null;
    }
}
function useSegmentedSelectionMotion(trackRef, value, isPresenting, isTracking) {
    const [motion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>new SegmentedSelectionMotion());
    const previousValueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(value);
    // The lens is the radiogroup's own pseudo-elements. The animators attach to
    // it while the touch presentation applies or while a press can drag it,
    // which any pointer can.
    const isEnabled = isPresenting || isTracking;
    // Syncs the lens animators with the pointer presentation: a flip hands any
    // motion in flight back.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        motion.present(isPresenting);
    }, [
        isPresenting,
        motion
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        const from = previousValueRef.current;
        previousValueRef.current = value;
        const track = trackRef.current;
        if (!isEnabled || track == null || from === value) {
            return;
        }
        motion.select(track, from, value);
    }, [
        isEnabled,
        motion,
        trackRef,
        value
    ]);
    // Stops the animators that drive the radiogroup's pseudo-elements.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>()=>motion.stop(), [
        motion
    ]);
    // Every pointer's press is tracked. The lift commits the segment nearest
    // the pointer, through that segment's click.
    const clickWait = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$useSegmentedTouchTracking$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSegmentedTouchTracking"])(trackRef, motion, isTracking);
    // The animators attach to the radiogroup while enabled. The lens aims at
    // boxes measured when its motion began, so a resize hands the surface back.
    const attachTrack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((track)=>{
        if (track == null || !isEnabled) {
            return undefined;
        }
        motion.attachTrack(track);
        const unobserve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedResizeObserver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["observeResize"])(track, ()=>motion.resized(track));
        return ()=>{
            unobserve();
            motion.settle();
            motion.attachTrack(null);
        };
    }, [
        isEnabled,
        motion
    ]);
    const [selection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>({
            isPressing: ()=>motion.isPressed || clickWait.isAwaiting(),
            keyPressed: clickWait.end
        }));
    return {
        selection,
        attachTrack
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/SegmentedControl/useSegmentedTouchTracking.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "liftTargetAt",
    ()=>liftTargetAt,
    "measureLiftArea",
    ()=>measureLiftArea,
    "measureSegments",
    ()=>measureSegments,
    "segmentTargetAt",
    ()=>segmentTargetAt,
    "useSegmentedTouchTracking",
    ()=>useSegmentedTouchTracking
]);
/**
 * @file useSegmentedTouchTracking.ts
 * @input The radiogroup element, the selection motion controller and whether
 *   the control is enabled
 * @output useSegmentedTouchTracking (a press of any pointer, landing to
 *   lift, and its ClickWait), and segmentTargetAt, measureSegments,
 *   measureLiftArea and liftTargetAt, the segment a pointer counts for
 * @position Internal to SegmentedControl; drives useSegmentedSelectionMotion.ts
 *
 * SYNC: When modified, update:
 * - /packages/core/src/SegmentedControl/useSegmentedSelectionMotion.ts
 * - /packages/core/src/SegmentedControl/__tests__/SegmentedControl.interaction.browser.spec.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$PanGestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/PanGestureRecognizer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$useGestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/useGestureRecognizer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$usePressTracker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/usePressTracker.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$actionGroupTracker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/actionGroupTracker.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$selectionLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/selectionLock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsomorphicLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$browserClickWait$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/browserClickWait.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$hitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/hitArea.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/clickGuard.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/pressFeedback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$useSegmentedSelectionMotion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/SegmentedControl/useSegmentedSelectionMotion.js [app-ssr] (ecmascript)");
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
/**
 * A tap's click still to come. Until it runs, a focus move the tap causes
 * selects nothing. A key press, the next press or a cancel ends the wait.
 */ /** A ref to nothing: hooks given it attach nothing. */ const DETACHED = {
    current: null
};
function measureSegments(track) {
    return Array.from(track.querySelectorAll(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$useSegmentedSelectionMotion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SEGMENT_SELECTOR"]), (element)=>{
        const rect = element.getBoundingClientRect();
        return {
            element,
            left: rect.left,
            right: rect.right
        };
    });
}
/**
 * Whether no segment has a width: the control has no layout, as in a unit
 * test's DOM. A single collapsed segment does not count.
 */ function hasNoLayout(segments) {
    return segments.every(({ left, right })=>right - left <= 0);
}
function isDisabled(element) {
    return element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true';
}
function segmentTargetAt(x, segments) {
    let best = null;
    let distance = Infinity;
    for (const segment of segments){
        const d = Math.max(segment.left - x, 0, x - segment.right);
        if (d < distance) {
            distance = d;
            best = segment;
        }
    }
    return best != null && !isDisabled(best.element) ? best.element : null;
}
function liftTargetAt(x, y, area, segments) {
    const isInside = area.some((box)=>x >= box.left && x <= box.right && y >= box.top && y <= box.bottom);
    return isInside ? segmentTargetAt(x, segments) : null;
}
const NO_AREA = [];
/** A measured hit inset on `element`, px (0 when none is written). */ function hitInset(element, side) {
    const value = Number.parseFloat(element.style.getPropertyValue(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$hitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HIT_INSET_PROPERTIES"][side]));
    return Number.isFinite(value) ? value : 0;
}
function measureLiftArea(track, segments) {
    const { left, top, right, bottom } = track.getBoundingClientRect();
    return [
        {
            left,
            top,
            right,
            bottom
        },
        ...segments.map(({ element })=>{
            const box = element.getBoundingClientRect();
            return {
                left: box.left - hitInset(element, 'left'),
                top: box.top - hitInset(element, 'top'),
                right: box.right + hitInset(element, 'right'),
                bottom: box.bottom + hitInset(element, 'bottom')
            };
        })
    ];
}
function useSegmentedTouchTracking(trackRef, motion, isEnabled) {
    /** The horizontal pan began for this touch: it is a drag, not a tap. */ const isDraggingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    /** The press began on the selected segment, so the lens shows it. */ const isLensPressRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    /** Escape cancelled this press: the rest of it changes nothing. */ const isCancelledRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    /** The segments as the finger found them (disabled ones too). */ const segmentsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    /** The lift area as the finger found it. */ const areaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(NO_AREA);
    const trackerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const tracker = trackerRef.current ??= (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$actionGroupTracker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createActionGroupTracker"])(()=>({
            roots: ()=>[
                    trackRef.current
                ],
            itemSelector: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$useSegmentedSelectionMotion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SEGMENT_SELECTOR"],
            highlightExpansion: 0,
            tracksAlong: 'x',
            // The press controller paints the touched segment, as everywhere under a
            // finger. Once a press from another segment drags, the tracker paints the
            // segment it would commit. A held lens shows the selected face instead.
            paintsHighlight: (item)=>isDraggingRef.current && !isLensPressRef.current && item.getAttribute('aria-checked') !== 'true',
            onCancel: ()=>{
                isCancelledRef.current = true;
                clickWait.end();
                for (const { element } of segmentsRef.current){
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cancelPress"])(element);
                }
                motion.cancel();
            },
            resolveTarget: (x, y, _targets)=>liftTargetAt(x, y, areaRef.current, segmentsRef.current),
            onActivated: (item, cancelled)=>{
                const track = trackRef.current;
                const value = item.dataset.value;
                if (track != null && value != null) {
                    motion.clicked(track, value, cancelled);
                }
            },
            swallowsNativeClick: true
        }));
    /** Click waits still running: an unmount ends them. */ const pendingClicksRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    /**
   * A tap lifted and its click has not run. After a direct click, the
   * browser's late copy can still move focus, so the wait then lasts until the
   * next key or press.
   */ const clickToComeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [clickWait] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>({
            isAwaiting: ()=>clickToComeRef.current,
            end: ()=>{
                clickToComeRef.current = false;
            }
        }));
    // Ends the tracker's window listeners and any click wait on unmount.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        const pendingClicks = pendingClicksRef.current;
        return ()=>{
            tracker.dispose();
            clickWait.end();
            for (const end of [
                ...pendingClicks
            ]){
                end();
            }
        };
    }, [
        tracker,
        clickWait
    ]);
    // Every pointer type is tracked. A disabled control attaches nothing.
    const attachRef = isEnabled ? trackRef : DETACHED;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$usePressTracker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePressTracker"])(attachRef, {
        isEnabled: ()=>isEnabled,
        onHighlightChange: (isHighlighted)=>{
            if (isHighlighted) {
                motion.highlighted();
            }
        },
        onControlEvent: (event, touch)=>{
            const track = trackRef.current;
            if (track == null) {
                return;
            }
            switch(event){
                case 'touchDown':
                    {
                        clickWait.end();
                        isDraggingRef.current = false;
                        isCancelledRef.current = false;
                        segmentsRef.current = measureSegments(track);
                        areaRef.current = measureLiftArea(track, segmentsRef.current);
                        tracker.begin(touch.x, touch.y);
                        isLensPressRef.current = tracker.beganOn?.getAttribute('aria-checked') === 'true';
                        motion.begin(track, tracker.beganOn, touch.pointerType === 'touch');
                        break;
                    }
                case 'touchUpInside':
                case 'touchUpOutside':
                    {
                        if (isCancelledRef.current) {
                            // The browser's own click for this lift still comes when it ends
                            // on the segment the press began on. The guard takes it.
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["armClickGuard"])(track.ownerDocument);
                            break;
                        }
                        if (hasNoLayout(segmentsRef.current)) {
                            // Without layout the lift names no segment. The click on the
                            // segment the press reached selects it, as under a fine pointer.
                            tracker.cancel();
                            motion.cancel();
                            break;
                        }
                        // The lift decides, wherever the press began.
                        tracker.move(touch.x, touch.y);
                        const lifted = tracker.highlighted;
                        const isTap = event === 'touchUpInside' && !isDraggingRef.current && lifted != null && lifted === tracker.beganOn;
                        const value = motion.release(lifted);
                        if (value != null && isTap && lifted != null) {
                            // A tap: the browser's own click commits it.
                            tracker.cancel();
                            clickToComeRef.current = true;
                            const pending = pendingClicksRef.current;
                            const endWait = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$browserClickWait$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["awaitBrowserClick"])(lifted, {
                                onClicked: (isCancelled)=>{
                                    pending.delete(endWait);
                                    clickWait.end();
                                    motion.clicked(track, value, isCancelled);
                                },
                                onNoClick: ()=>{
                                    pending.delete(endWait);
                                    motion.clicked(track, value, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$browserClickWait$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clickForLift"])(lifted));
                                }
                            });
                            pending.add(endWait);
                        } else if (value != null) {
                            // No click comes from the browser for a drag: the segment's own
                            // click, inside the lift's event; its onClick may veto it.
                            tracker.end();
                        } else {
                            tracker.cancel();
                        }
                        break;
                    }
                case 'touchCancel':
                    clickWait.end();
                    tracker.cancel();
                    motion.cancel();
                    break;
                case 'touchDragInside':
                case 'touchDragOutside':
                case 'touchDragEnter':
                case 'touchDragExit':
                    break;
            }
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$useGestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGestureRecognizer"])(attachRef, ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$PanGestureRecognizer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PanGestureRecognizer"]({
            name: 'segmented-control-drag',
            direction: 'horizontal',
            cancelsTouchesInView: false,
            // No title is selectable under a held finger, as in UIKit. A hold on
            // the track does something: a drag carries the lens and commits where
            // it lifts. So this recognizer brings the lock, and the host turns off
            // text selection and the callout on the track while a finger is down.
            selectionLock: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$selectionLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lockSelection"]
        }), (recognizer)=>{
        if (isCancelledRef.current) {
            return;
        }
        if (recognizer.state === 'began') {
            isDraggingRef.current = true;
        }
        if (recognizer.state === 'began' || recognizer.state === 'changed') {
            const { x, y } = recognizer.location();
            // The lens chases the finger, then the tracker moves the highlight.
            motion.drag(x);
            tracker.move(x, y);
        }
    }, {
        isEnabled
    });
    return clickWait;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/SizeContext/SizeContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SizeContext",
    ()=>SizeContext,
    "SizeProvider",
    ()=>SizeProvider,
    "useSize",
    ()=>useSize
]);
/**
 * @file SizeContext.ts
 * @input Layer-scoped React context, use
 * @output Exports SizeContext, useSize, ElementSize, SizeProvider
 * @position Context provider; consumed by Button, TextInput, TabList, Selector, etc.
 *
 * Generic size context that lets container components (Toolbar, TopNav, Card headers)
 * cascade a default size to interactive children. Children use the context as a
 * fallback — an explicit `size` prop always wins.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const SizeContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('SizeContext', 1, null);
SizeContext.displayName = 'SizeContext';
function useSize(sizeProp, defaultSize = 'md') {
    const inherited = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(SizeContext);
    return sizeProp ?? inherited ?? defaultSize;
}
const SizeProvider = SizeContext.Provider;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Spinner/Spinner.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Spinner",
    ()=>Spinner
]);
/**
 * @file Spinner.tsx
 * @input Uses React, i18n (useComponentTranslator), StyleX, SVG rendering
 * @output Exports Spinner component, SpinnerProps, SpinnerSize, SpinnerShade types
 * @position Core implementation of spinner loading indicator
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Spinner/Spinner.doc.mjs
 * - /packages/core/src/Spinner/Spinner.test.tsx and __tests__/SpinnerMotion.a11y.chromium.spec.ts (rotor timing)
 * - /packages/core/src/Spinner/index.ts
 * - /apps/storybook/stories/Spinner.stories.tsx
 * - /packages/cli/assets/templates/blocks/components/Spinner/ (showcase blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$SpinnerOwnerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Spinner/SpinnerOwnerContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Text/Text.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeRefs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounceRenderedText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useAnnounceRenderedText.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Spinner$2f$Spinner$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Spinner/Spinner.generated.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$spinnerRotor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Spinner/spinnerRotor.js [app-ssr] (ecmascript)");
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerEnglishFallback"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Spinner$2f$Spinner$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
// =============================================================================
// Constants
// =============================================================================
/**
 * The fraction of the ring the arc covers: SPINNER_ARC_FRACTION. StyleX reads
 * only a literal in this file, and a test pins the two together.
 *
 * Themeable via `--spinner-arc-fraction`, declared alongside the other public
 * vars in `sizeStyles` below. Only the inline `strokeDasharray` attribute
 * (the pre-stylesheet render) still reads the constant directly; the CSS side
 * composes the dash from the live var.
 */ const ARC_FRACTION = 0.375;
const PI = 3.141592653589793;
const SIZES = {
    sm: {
        diameter: 10,
        border: 2
    },
    md: {
        diameter: 14,
        border: 3
    },
    lg: {
        diameter: 18,
        border: 3
    },
    xl: {
        diameter: 28,
        border: 4
    }
};
/**
 * Opacity the track is drawn at, per shade. `77 / 255` is the `4D` the onMedia
 * track used to append to the token's hex — the same composite, but applied as
 * `stroke-opacity` to a color off the cascade, so it no longer depends on the
 * token being hex notation and it applies to a themed color too.
 */ const TRACK_OPACITY = {
    default: 1,
    subtle: 1,
    onMedia: 77 / 255,
    inherit: 0.3
};
/**
 * Where the resolved geometry lands: the public var, resolved into a registered
 * `<length>` the `calc()`s below can do arithmetic on. The box and the ring
 * read these; the public vars are declared once, on the element carrying the
 * theme target, by `sizeStyles`.
 */ const RESOLVED_DIAMETER = '--_spinner-ring-diameter';
const RESOLVED_STROKE = '--_spinner-ring-stroke';
const RESOLVED_GEOMETRY_VARS = [
    RESOLVED_DIAMETER,
    RESOLVED_STROKE
];
/**
 * The composed box size: diameter plus a stroke width on each side.
 *
 * It is deliberately NOT registered, unlike the pair above. The element reads
 * it through an inline `width`/`height` with the size's own default as the
 * `var()` fallback, so a render with no stylesheet — where nothing declares
 * it — still sizes the box the way it always did. A registered property always
 * has a value (its `initial-value`), which would swallow that fallback and
 * collapse the box to zero.
 */ const BOX_SIZE = '--_spinner-box-size';
/**
 * Register the resolved geometry vars as `<length>`.
 *
 * Both are consumed inside `calc()` — the box adds two stroke widths to a diameter,
 * the circle halves one. Unregistered, a custom property substitutes as text,
 * so whatever a theme wrote lands in the expression verbatim and a bare `0`
 * (a valid length on its own, a `<number>` inside `calc()`) poisons the sum:
 * `calc(28px + 0 * 2)` is invalid at computed-value time and the box loses its
 * size. Registered, the value is already an absolute length by the time the
 * `calc()` sees it, so `0` means `0px` — a zero-width stroke that paints
 * nothing — rather than a bare `0` that invalidates the sum and leaves the box
 * with no size at all. One `stroke-width` drives both circles, so a themed
 * stroke width of `0` hides the arc along with the track; an arc with no track behind
 * it is `--spinner-track-color: transparent`.
 *
 * Only these private vars are registered. The four public ones deliberately
 * are not: a registered property has an `initial-value`, so every element in
 * the document would report a value for it — and
 * `.github/scripts/theme-var-reachability.js` finds a var's declaring element
 * by exactly that test, so registering them would point the guard at `<html>`
 * and report a var no theme can select.
 */ function registerSpinnerVars() {
    if (typeof CSS === 'undefined' || typeof CSS.registerProperty !== 'function') {
        return;
    }
    for (const name of RESOLVED_GEOMETRY_VARS){
        try {
            CSS.registerProperty({
                name,
                syntax: '<length>',
                inherits: true,
                initialValue: '0px'
            });
        } catch  {
        // Already registered — a second copy of the package on the page, or a
        // fast-refresh re-evaluation. registerProperty throws rather than
        // replacing, and the existing registration is this same one.
        }
    }
}
// Registering an inherited property with an `initial-value` invalidates style
// for the whole document, so this runs when the module is evaluated rather
// than when a spinner mounts. A spinner is the loading indicator: it mounts
// onto a page that is already rendered, with someone already waiting, and the
// recalc it triggers there is paid on the full tree. At import the tree is
// whatever has rendered so far, which for a bundle loaded in the head is
// nothing.
//
// It is safe at module scope in both directions. The `typeof CSS` guard above
// keeps it out of the server render, and tree-shaking cannot strip it from a
// build that renders a spinner: core's `sideEffects` allowlist does not name
// this file, so a bundle that never imports `Spinner` drops the module whole —
// registration and all, which is the outcome you want — while one that does
// import it keeps the module, and a bare call is not something a bundler may
// elide.
registerSpinnerVars();
// =============================================================================
// Styles
// =============================================================================
const styles = {
    wrapper: {
        k1xSpc: "x3nfvp2",
        kXwgrk: "xdt5ytf",
        kGNEyG: "x6s0dn4",
        kOIVth: "x1txdalj",
        $$css: true
    },
    spinner: {
        k1xSpc: "xwz0xwf",
        kgQiWS: "x1ku5rj1",
        kXLuUW: "xxymvpz",
        "--_spinner-ring-diameter": "x2lq4xu",
        "--_spinner-ring-stroke": "x10qssua",
        "--_spinner-box-size": "x69vvuq",
        kmuXW: "x2lah0s",
        $$css: true
    },
    rotor: {
        k1xSpc: "x1lliihq",
        kJuA4N: "x15r89dc",
        kzqmXN: "x6v0vjy",
        kZKoxP: "x7yyq19",
        $$css: true
    },
    circle: {
        kDwRjp: "xbh8q5q",
        kR8GR0: "x1764fhq",
        k3nNDw: "x1g0ag68",
        kU5bRw: "x1owpc8m",
        kPFa82: "xio8zfp",
        kfJifR: "xgw3ha0",
        $$css: true
    },
    track: {
        kjVXCG: "xalkhop",
        $$css: true
    }
};
// What each named `size` and `shade` resolve to. Both groups DECLARE the four
// public vars, on the element that carries the `spinner` theme target, and
// everything downstream reads them — so a theme's `@layer astryx-theme` rule
// against `.astryx-spinner[data-size="xl"]` overrides the default the same way it does for
// `--tree-list-indent` or `--button-focus-offset`, e.g.
// spinner: { 'size:xl': { '--spinner-diameter': '40px' } }.
//
// Declaring is only safe because #5410 moved the compiled StyleX CSS inside
// `@layer astryx-base`. Before it, StyleX emitted custom-property
// declarations at priority 0 and therefore OUTSIDE its layers, and an
// unlayered declaration beats every layer — so a StyleX-declared
// `--spinner-diameter: 10px` shadowed the theme's own rule no matter how
// specific the theme got. An earlier revision of this component worked around
// that by never declaring the public var and reading it with the default as a
// `var()` fallback; that is no longer necessary, and the fallback shape has a
// cost of its own — with nothing declaring the var,
// `theme-var-reachability.js` cannot find an element to check, so a documented
// var reads as unreachable.
// Arc fraction is not itself size-dependent, but it declares alongside the
// two vars that are, on the same per-size condition (`!hasLabel` gate at the
// call site) — it needs a home on whichever element carries the theme
// target, and this is the object already wired to be there.
const sizeStyles = {
    sm: {
        "--spinner-diameter": "x11wm0hx",
        "--spinner-stroke-width": "xls98ul",
        "--spinner-arc-fraction": "x7o5821",
        $$css: true
    },
    md: {
        "--spinner-diameter": "x15pu9g6",
        "--spinner-stroke-width": "xr0wkrm",
        "--spinner-arc-fraction": "x7o5821",
        $$css: true
    },
    lg: {
        "--spinner-diameter": "x1w424tr",
        "--spinner-stroke-width": "xr0wkrm",
        "--spinner-arc-fraction": "x7o5821",
        $$css: true
    },
    xl: {
        "--spinner-diameter": "x1orj1z9",
        "--spinner-stroke-width": "x7y2bof",
        "--spinner-arc-fraction": "x7o5821",
        $$css: true
    }
};
const shadeStyles = {
    default: {
        "--spinner-color": "xt1b8mc",
        "--spinner-track-color": "xspt9s2",
        $$css: true
    },
    subtle: {
        "--spinner-color": "x1jevo6s",
        "--spinner-track-color": "xspt9s2",
        $$css: true
    },
    onMedia: {
        "--spinner-color": "x13u6jys",
        "--spinner-track-color": "x1ufpcf6",
        $$css: true
    },
    inherit: {
        "--spinner-color": "x1uzk0gl",
        "--spinner-track-color": "xbfzqbu",
        $$css: true
    }
};
// The track's alpha is a property, not a color: it composites over whatever
// color the shade or the theme supplies. `77 / 255` is the `4D` the onMedia
// token's hex used to carry.
const trackOpacityStyles = {
    default: {
        kDd8S0: "x1g350g8",
        $$css: true
    },
    subtle: {
        kDd8S0: "x1g350g8",
        $$css: true
    },
    onMedia: {
        kDd8S0: "x1smxkh6",
        $$css: true
    },
    inherit: {
        kDd8S0: "x7bo2k",
        $$css: true
    }
};
function Spinner({ size = 'md', shade = 'default', label, xstyle, className, style, 'aria-label': ariaLabel, 'data-testid': testId, ref, ...restProps }) {
    const { border, diameter } = SIZES[size];
    const frameSize = diameter + border * 2;
    const circumference = Math.PI * diameter;
    const arcLength = circumference * ARC_FRACTION;
    const hasLabel = label != null;
    const labelId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    const spinnerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeRefs"])(spinnerRef, ref), [
        ref
    ]);
    // When a visible string label renders (and no explicit aria-label is set),
    // name the progressbar from the visible Text via aria-labelledby instead
    // of duplicating the same string as aria-label — the duplicate would be
    // announced twice by screen readers (WCAG 4.1.2).
    const namedByVisibleLabel = hasLabel && typeof label === 'string' && ariaLabel == null;
    // Resolve accessible name: explicit aria-label > string label > the
    // localized default. The fallback is AT-facing text, so it goes through the
    // translation runtime like visible text does.
    const resolvedAriaLabel = ariaLabel ?? (typeof label === 'string' ? label : undefined) ?? t('@astryx.spinner.loading');
    // Only a standalone Spinner announces. A Core component that composes it
    // owns the task and silences it through the internal SpinnerOwnerContext;
    // app code hides it with `aria-hidden`. A caller `role` other than
    // progressbar also keeps it silent, as it shipped, so app code that
    // silenced a composed ring that way keeps working; new code uses
    // `aria-hidden`.
    const isComposedInOwner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$SpinnerOwnerContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SpinnerOwnerContext"]);
    const isHidden = restProps['aria-hidden'] === true || restProps['aria-hidden'] === 'true';
    const callerRole = restProps.role;
    const hasShippedSilentRole = callerRole != null && callerRole !== 'progressbar';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounceRenderedText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAnnounceRenderedText"])(spinnerRef, !isComposedInOwner && !isHidden && !hasShippedSilentRole, '', {
        skipFirstRender: true,
        fallbackText: resolvedAriaLabel
    });
    const spinner = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("span", {
        ref: hasLabel ? undefined : rootRef,
        role: "progressbar",
        "aria-label": namedByVisibleLabel ? undefined : resolvedAriaLabel,
        "aria-labelledby": namedByVisibleLabel ? labelId : undefined,
        "data-testid": hasLabel ? undefined : testId,
        ...hasLabel ? {} : restProps,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])(hasLabel ? '' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('spinner', {
            size,
            shade
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.spinner, // The defaults are declared on whichever element carries the theme
        // target, and only there: when a label moves the target to the
        // wrapper, this span must inherit the wrapper's value rather than
        // declare its own, which would shadow a theme's override with the
        // default it is trying to replace.
        !hasLabel && sizeStyles[size], !hasLabel && shadeStyles[shade], !hasLabel && xstyle), hasLabel ? undefined : className, // The box is sized here, after the caller's `style`, exactly as it was
        // before the geometry became themeable: the component's own size wins
        // over a `style={{width}}` a caller passes, and the precedence between
        // the two is unchanged by this PR. What the value is made of has
        // changed — it is the composed var rather than a number — so a themed
        // diameter moves the box with the ring. The fallback is the size's own
        // frame, for the render where no stylesheet has declared the var.
        {
            ...hasLabel ? {} : style,
            width: `var(${BOX_SIZE}, ${frameSize}px)`,
            height: `var(${BOX_SIZE}, ${frameSize}px)`
        }),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
                width: 0,
                height: 0,
                "aria-hidden": "true",
                ...{
                    className: "xlp1x4z x1lliihq x15r89dc x6v0vjy x7yyq19 x1rea2x4"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                    cx: "50%",
                    cy: "50%",
                    r: diameter / 2,
                    strokeWidth: border,
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.circle, styles.track, trackOpacityStyles[shade])
                })
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                ref: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$spinnerRotor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncRotationPhase"],
                "aria-hidden": "true",
                ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.rotor, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$spinnerRotor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spinnerRotorStyles"].turn),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("svg", {
                    width: frameSize,
                    height: frameSize,
                    ...{
                        className: "xlp1x4z x1lliihq x15r89dc x6v0vjy x7yyq19 x1rea2x4"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                        cx: "50%",
                        cy: "50%",
                        r: diameter / 2,
                        strokeWidth: border,
                        strokeDasharray: `${arcLength} ${circumference - arcLength}`,
                        ...{
                            className: "xbh8q5q x1764fhq x1g0ag68 x1owpc8m xio8zfp xgw3ha0 xtve3lm x9tu13d xdv9ggb"
                        }
                    })
                })
            })
        ]
    });
    if (!hasLabel) {
        return spinner;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        ref: rootRef,
        "data-testid": testId,
        ...restProps,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('spinner', {
            size,
            shade
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.wrapper, sizeStyles[size], shadeStyles[shade], xstyle), className, style),
        children: [
            spinner,
            typeof label === 'string' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$Text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Text"], {
                id: labelId,
                type: "body",
                weight: "bold",
                children: label
            }) : label
        ]
    });
}
Spinner.displayName = 'Spinner';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Spinner/SpinnerOwnerContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SpinnerOwnerContext",
    ()=>SpinnerOwnerContext
]);
/**
 * @file SpinnerOwnerContext.ts
 * @input React
 * @output SpinnerOwnerContext: true inside a Core component that owns the
 *   task a composed Spinner shows, so that Spinner announces nothing
 * @position Internal to core: not exported from Spinner/index.ts, and core's
 *   `exports` do not list this module. The owner of a task announces it, so
 *   a Spinner it composes stays silent; app code hides a composed Spinner
 *   with `aria-hidden` instead.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Spinner/Spinner.tsx
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
const SpinnerOwnerContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSharedContext"])('SpinnerOwnerContext', 1, false);
SpinnerOwnerContext.displayName = 'SpinnerOwnerContext';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Spinner/spinnerRotor.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SPINNER_ARC_FRACTION",
    ()=>SPINNER_ARC_FRACTION,
    "spinnerRotorStyles",
    ()=>spinnerRotorStyles,
    "syncRotationPhase",
    ()=>syncRotationPhase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
;
const SPINNER_ARC_FRACTION = 0.375;
/**
 * Full turns in one iteration of the rotation.
 *
 * Chromium wakes the main thread at each iteration boundary while the
 * document listens for `animationiteration`. React listens for it on every
 * root. One iteration holds 100 turns, so the wake comes once in 100 turns.
 * Each turn is 360 degrees, so the ring looks the same.
 */ const TURNS_PER_ITERATION = 100;
/**
 * A `transform` animation runs on the compositor, so the ring keeps turning
 * while a script runs. A `stroke-dashoffset` animation would repaint the arc
 * on the main thread every frame, so it would stop while a script runs.
 */ const rotation = "x11cqc53-B";
const spinnerRotorStyles = {
    turn: {
        k6sLGO: "x1so62im",
        k44tkh: "xidn0ey x14hxw50",
        ko0y90: "xa4qsjk",
        kKVMdj: "x129v4ae",
        kyAemX: "x1esw782",
        $$css: true
    }
};
/**
 * Pin every ring's rotation to the document timeline's origin instead of its
 * own start time, so spinners mounted seconds apart stay in phase.
 *
 * Setting `startTime` is exact where arithmetic on a clock read is not. A
 * negative `animation-delay` computed at mount is only as good as the gap
 * between the clock read and the frame the animation starts in. At 10x CPU
 * throttling that gap measured 116 degrees of drift.
 *
 * Rotors are collected and pinned in one frame. `getAnimations()` resolves
 * style, and `startTime` dirties it again. So pinning them one at a time makes
 * each mount re-force what the previous one invalidated: 53 style recalcs for
 * 38 spinners, against 19 batched.
 */ const rotors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedState"])('spinner/spinner-rotor/state', 1, ()=>({
        pendingRotors: new Set(),
        flushScheduled: false
    }));
function pinRotorsToTimelineOrigin() {
    rotors.flushScheduled = false;
    const animations = [];
    for (const rotor of rotors.pendingRotors){
        animations.push(...rotor.getAnimations());
    }
    rotors.pendingRotors.clear();
    for (const animation of animations){
        animation.startTime = 0;
    }
}
function syncRotationPhase(rotor) {
    if (rotor == null) {
        return undefined;
    }
    // jsdom implements no Web Animations, and this runs in every consumer's
    // component tests.
    if (typeof rotor.getAnimations !== 'function') {
        return undefined;
    }
    rotors.pendingRotors.add(rotor);
    if (!rotors.flushScheduled) {
        rotors.flushScheduled = true;
        requestAnimationFrame(pinRotorsToTimelineOrigin);
    }
    return ()=>{
        rotors.pendingRotors.delete(rotor);
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Switch/Switch.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Switch",
    ()=>Switch
]);
/**
 * @file Switch.tsx
 * @input Uses React, useId, ChangeEvent, FieldLabel, FieldStatus, IconType, InputStatus, useTooltip, i18n (useComponentTranslator)
 * @output Exports Switch component, SwitchProps, SwitchLabelPosition, SwitchLabelSpacing
 * @position Core implementation; consumed by index.ts, tested by Switch.test.tsx
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Switch/Switch.doc.mjs (props table, features, implementation notes)
 * - /packages/core/src/Switch/Switch.test.tsx (tests for new/changed behavior)
 * - /packages/core/src/Switch/index.ts (exports if types change)
 * - /apps/storybook/stories/Switch.stories.tsx (storybook stories)
 * - /packages/cli/assets/templates/blocks/components/Switch/ (showcase blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$FieldLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Field/FieldLabel.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FieldStatus$2f$FieldStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/FieldStatus/FieldStatus.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$Spinner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Spinner/Spinner.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/useTooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$rtlStyles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/rtlStyles.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$switch$2e$markers$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Switch/switch.markers.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounce$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useAnnounce.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMergedRefs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$usePressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/usePressFeedback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Switch$2f$Switch$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Switch/Switch.generated.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/reducedMotion.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/interactionOverlay.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressHoldsDrag$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/pressHoldsDrag.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$useSwitchTouch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Switch/useSwitchTouch.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsomorphicLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$hitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/hitArea.js [app-ssr] (ecmascript)");
/**
 * The track box of each size, px (width × height), for the touch
 * presentation's thumb geometry.
 * SYNC: wrapperSizeStyles and trackSizeStyles below.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerEnglishFallback"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Switch$2f$Switch$2e$generated$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
;
;
;
;
;
;
;
;
;
const TRACK_SIZE = {
    sm: [
        32,
        20
    ],
    md: [
        40,
        24
    ]
};
/**
 * A finger: utils/touchPresentation.ts's TOUCH_QUERY. The touch presentation
 * is one model on every touch device: the lift, tracking, flip rule and
 * springs sit under it alone.
 * SYNC: utils/touchPresentation.ts TOUCH_QUERY.
 */ const TOUCH = '@media (pointer: coarse)';
/** The press controller's two states on the row it writes to. */ const PRESS_ON = '[data-astryx-press="on"]';
const PRESS_FADING = '[data-astryx-press="fading"]';
/**
 * The shared press release, for the press layers the switch fades on the
 * compositor: the theme's exit motion tokens, no longer than the Reduce
 * Motion fade under Reduce Motion. Switch.test.tsx compares them with
 * the overlay's.
 * SYNC: utils/interactionOverlay.stylex.ts PRESS_RELEASE_DURATION,
 * PRESS_RELEASE_DURATION_REDUCED and RELEASE_EASE.
 */ const PRESS_RELEASE_DURATION = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["durationVars"]['--duration-exit'];
const PRESS_RELEASE_DURATION_REDUCED = `min(${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["durationVars"]['--duration-exit']}, ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["reducedMotionFadeConsts"].duration})`;
const PRESS_RELEASE_EASE = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["easeVars"]['--ease-exit'];
// The measured hit insets (utils/hitArea), 0 until measured.
const HIT_TOP = 'var(--astryx-hit-inset-top, 0px)';
const HIT_RIGHT = 'var(--astryx-hit-inset-right, 0px)';
const HIT_BOTTOM = 'var(--astryx-hit-inset-bottom, 0px)';
const HIT_LEFT = 'var(--astryx-hit-inset-left, 0px)';
const wrapperSizeStyles = {
    sm: {
        kzqmXN: "x1td3qas",
        kZKoxP: "x1qx5ct2",
        $$css: true
    },
    md: {
        kzqmXN: "x100vrsf",
        kZKoxP: "xxk0z11",
        $$css: true
    }
};
// Every touch value sits in the same property as the mouse value, as a
// nested condition, never in a later style. A later style that names a
// property replaces all of it, mouse value included.
const trackSizeStyles = {
    sm: {
        kzqmXN: "x1td3qas",
        kZKoxP: "x1qx5ct2",
        kmVPX3: "x1i3ajwb",
        $$css: true
    },
    md: {
        kzqmXN: "x100vrsf",
        kZKoxP: "xxk0z11",
        kmVPX3: "xfawy5m",
        $$css: true
    }
};
// The thumb is one circle under any pointer, at each state's size. Under a
// finger it rests by insets instead of a transform, centered in the track's
// height at each end. So the compositor moves and lifts it with translate and
// scale alone; useSwitchTouch measures the box it renders.
const thumbOffSizeStyles = {
    sm: {
        kzqmXN: "x6jxa94",
        kZKoxP: "x1v9usgg",
        kLqNvP: "x13kxlb5",
        k3aq6I: "xbryuvx xhyyqqw",
        $$css: true
    },
    md: {
        kzqmXN: "x1kky2od",
        kZKoxP: "xlup9mm",
        kLqNvP: "xsprn4g",
        k3aq6I: "xbryuvx xhyyqqw",
        $$css: true
    }
};
const thumbOnSizeStyles = {
    sm: {
        kzqmXN: "x1kky2od",
        kZKoxP: "xlup9mm",
        kLqNvP: "xskqmzm",
        kt4wiu: "x1syr3z6",
        k3aq6I: "xv5t66b xi9aj42 x1pxz8w1 xhyyqqw",
        $$css: true
    },
    md: {
        kzqmXN: "xw4jnvo",
        kZKoxP: "x1qx5ct2",
        kLqNvP: "xskqmzm",
        kt4wiu: "x1syr3z6",
        k3aq6I: "x15481yp x12xz5k6 x1pxz8w1 xhyyqqw",
        $$css: true
    }
};
// The pressed overlay, painted as a gradient layer OVER the track's and
// thumb's own fills so it composes with the on/off colors and the hover tint
// instead of replacing them. Same token Button's overlay paints with. The
// switch is a two-part control whose focusable input sits beside the track,
// so the press is read off the shared scope marker (the row), the way the
// hover tint already is: pressing the input, the track or the label all
// activate the row.
const pressedImage = `linear-gradient(${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorVars"]['--color-overlay-pressed']}, ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorVars"]['--color-overlay-pressed']})`;
/** The touch press's release on the press layer: opacity 1 → 0. */ const pressLayerRelease = "x1jn504y-B";
const PRESS_ALPHA = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressVars"]['--astryx-press-alpha'];
/**
 * The shared strength's release, restated so a fine pointer keeps it: the
 * same keyframes, so the same animation.
 */ const pressStrengthRelease = "x10jkm1t-B";
const pressOwnerStyles = {
    pressedAlphaLayered: {
        kKVMdj: "x14e4jsf xxsp3er x6su2wr",
        $$css: true
    }
};
const labelWrapperSizeStyles = {
    sm: {
        kAzted: "xisnujt",
        $$css: true
    },
    md: {
        kAzted: "xjwf9q1",
        $$css: true
    }
};
const styles = {
    container: {
        k1xSpc: "x78zum5",
        kGNEyG: "x6s0dn4",
        kOIVth: "x1txdalj",
        $$css: true
    },
    containerLabelHidden: {
        kOIVth: "xxhr3t",
        $$css: true
    },
    containerSpread: {
        kjj79g: "x1qughib",
        kzqmXN: "xh8yej3",
        $$css: true
    },
    statusGap: {
        keoZOQ: "xtbrsbv",
        $$css: true
    },
    switchWrapper: {
        kVAEAm: "x1n2onr6",
        k1xSpc: "x78zum5",
        kGNEyG: "x6s0dn4",
        kmuXW: "x2lah0s",
        kHBbk8: "xc8icb0",
        $$css: true
    },
    switchWrapperInteractive: {
        kFalU9: "xge0x1e",
        $$css: true
    },
    input: {
        kVAEAm: "x10l6tqk",
        k87sOh: "xwa60dl",
        kogj98: "x1ghz6dp",
        kmVPX3: "x1717udv",
        kSiTet: "xg01cxk",
        kkrTdU: "x1ypdohk x16khyan",
        kY2c9j: "x1vjfegm",
        $$css: true
    },
    inputCoarse: {
        kzqmXN: "xh8yej3 x1uj43hb",
        kZKoxP: "x5yr21d xgjkl26",
        k3aq6I: "x11lhmoz x1xdvw9q",
        $$css: true
    },
    inputDisabled: {
        kkrTdU: "xt0e3qv",
        $$css: true
    },
    inputBusy: {
        kfzvcC: "x47corl",
        $$css: true
    },
    track: {
        k1xSpc: "x78zum5",
        kGNEyG: "x6s0dn4",
        kVAEAm: "xrxqdxo",
        kHBbk8: "xsmms64",
        kaIpWk: "xjspbzw",
        k1ekBW: "x15406qy",
        kIyJzY: "xuedmi6 xouc37c xzwa1y6 xuh6ohu",
        kAMwcw: "xlr8y92",
        kB7OPa: "x9f619",
        kMzoRj: "xc342km x13rsnn2",
        ksu8eU: "xng3xce xx61lck",
        kVAM5u: "x1w1tqly",
        kKwaWg: "x1xm682w xowtp19",
        kgeoSG: "xpxppvc x15cra4q",
        kEoFBp: "x1hmns74",
        kFcpXp: "xxx281p",
        kxmVGU: "x12maryy",
        kPB484: "xxyica1",
        km8f2m: "xkk1bqk",
        kLkRvE: "x1my3e5g",
        k5QlbN: "x2huugr x1ccaw7f",
        k7EzDT: "xxhzo2e",
        kQZAMR: "xs8z9ty x1e7l4zx",
        kZiNAr: "x15baseh",
        k8Tatv: "xq2jpp1",
        k5JduY: "x1s928wv",
        kc3QkE: "x1h1zc6f x1ep27e9",
        kwXMNM: "x1j6awrg",
        kv0HGH: "xarstr8",
        kDVEDD: "x1r0yslu",
        kUfP38: "x1k48kgn",
        kloYau: "x2q1x1w",
        kypkao: "xmf22ne",
        ks3ayO: "x1uc2128",
        kWkaDd: "x177mwkx",
        $$css: true
    },
    trackFocus: {
        kI3sdo: "x1a2a7pz x1hn17kp",
        kInvED: "xa7ti9",
        $$css: true
    },
    trackOff: {
        kWkggS: "xspzpui x1a8ae7b x9yvj25",
        $$css: true
    },
    trackOn: {
        kWkggS: "x1ewilqj xcgwt1n x1jzqe4",
        $$css: true
    },
    trackDisabled: {
        kSiTet: "xbyyjgo",
        kVAM5u: "xmnqt3w",
        $$css: true
    },
    trackDisabledOff: {
        kWkggS: "xspzpui",
        $$css: true
    },
    thumb: {
        k1xSpc: "x78zum5",
        kGNEyG: "x6s0dn4",
        kjj79g: "xl56j7k",
        kaIpWk: "xjspbzw",
        kVAEAm: "x8imsj1",
        kYYq5F: "x1s6gw0t",
        kqGvvJ: "xfmjvo4",
        kY2c9j: "x1e8ofxz",
        kfzvcC: "x1bjav06",
        k1ekBW: "xh3q6i0 xiz4dsw",
        kIyJzY: "xuedmi6 xzwa1y6 xuh6ohu",
        kAMwcw: "xlr8y92",
        kgeoSG: "xpxppvc x15cra4q",
        kEoFBp: "x1hmns74",
        kFcpXp: "xxx281p",
        kPB484: "xxyica1",
        km8f2m: "xkk1bqk",
        kLkRvE: "x1my3e5g",
        k5QlbN: "x2huugr x1ccaw7f",
        k7EzDT: "xxhzo2e",
        kQZAMR: "xs8z9ty x1e7l4zx",
        kZiNAr: "x15baseh",
        k8Tatv: "xq2jpp1",
        k5JduY: "x1s928wv",
        kc3QkE: "x1h1zc6f x1ep27e9",
        kwXMNM: "x1j6awrg",
        kv0HGH: "xarstr8",
        kUfP38: "x1k48kgn",
        kloYau: "x2q1x1w",
        kypkao: "xmf22ne",
        kbMawA: "xoca22b",
        kWkaDd: "x177mwkx",
        kKwaWg: "x1xm682w xowtp19",
        $$css: true
    },
    thumbOff: {
        kWkggS: "x10xzikg xwvh9j7",
        $$css: true
    },
    thumbOn: {
        kWkggS: "x10xzikg x1sir5s4",
        $$css: true
    },
    labelWrapper: {
        k1xSpc: "x78zum5",
        kXwgrk: "xdt5ytf",
        kjj79g: "xl56j7k",
        $$css: true
    }
};
// Dynamic field width (number -> px, string used as-is).
const dynamicWidthStyles = {
    width: (width)=>[
            {
                kzqmXN: width != null ? "x5lhr3w" : width,
                $$css: true
            },
            {
                "--x-width": ((val)=>typeof val === "number" ? val + "px" : val != null ? val : undefined)(width)
            }
        ]
};
function Switch({ label, isLabelHidden = false, description, onChange, changeAction, isLoading = false, value, isDisabled = false, htmlName, disabledMessage, isOptional = false, isRequired = false, onFocus, onBlur, labelIcon, labelTooltip, labelPosition = 'end', labelSpacing = 'hug', status, size = 'md', width, xstyle, className, style, ref, 'aria-describedby': ariaDescribedByProp, 'aria-labelledby': ariaLabelledByProp, ...rest }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    // The row is the pressable: the input, the track and the label all sit
    // inside it, and the pressed arms above read the row's scope marker.
    const pressable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$usePressFeedback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePressFeedback"])();
    const descriptionID = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const statusMessageID = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const [, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransition"])();
    const [optimisticValue, setOptimisticValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOptimistic"])(value);
    const isBusy = isLoading || optimisticValue !== value;
    const announce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounce$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAnnounce"])();
    // One announcement per busy start (spec:AST-086 FR6). The ref outlives
    // StrictMode's effect replay and rerenders, so only a new busy start (busy
    // again after settling) speaks again.
    const announcedBusyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isBusy) {
            announcedBusyRef.current = false;
            return;
        }
        if (announcedBusyRef.current) {
            return;
        }
        announcedBusyRef.current = true;
        announce(t('@astryx.switch.loading'));
    }, [
        announce,
        isBusy,
        t
    ]);
    const isOn = optimisticValue === true;
    // Disabled-reason tooltip. Disabled controls swallow pointer events, so the
    // tooltip listeners attach to the switch row (which already exists) and the
    // native checkbox stays perceivable via aria-disabled instead of the disabled
    // attribute. Toggling is blocked by the isDisabled guard in onChange.
    const showsDisabledMessage = isDisabled && !!disabledMessage;
    const disabledMessageTooltip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTooltip"])({
        placement: 'above',
        // The container row is not naturally focusable; focusin bubbles up from the
        // native input, so always attach focus listeners.
        focusTrigger: 'always',
        isEnabled: showsDisabledMessage
    });
    // Build aria-describedby from description and status message
    // Only include descriptionID when the element actually renders.
    // FieldLabel renders the description (with descriptionID) even when the
    // label is visually hidden — it's sr-only, so keep it linked.
    // A consumer's own `aria-describedby` describes the control, so it comes
    // first here rather than landing on the field wrapper via `...rest`.
    const describedByParts = [];
    if (ariaDescribedByProp) {
        describedByParts.push(ariaDescribedByProp);
    }
    if (description) {
        describedByParts.push(descriptionID);
    }
    if (status?.message) {
        describedByParts.push(statusMessageID);
    }
    if (showsDisabledMessage) {
        describedByParts.push(disabledMessageTooltip.describedBy);
    }
    const ariaDescribedBy = describedByParts.length > 0 ? describedByParts.join(' ') : undefined;
    // The touch presentation (coarse pointer): its parts are always rendered;
    // CSS shows them under a finger and the hook animates and listens there.
    const surfaceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const thumbRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const trackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const touchParts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            surface: surfaceRef,
            input: inputRef,
            thumb: thumbRef,
            track: trackRef
        }), []);
    // The track in a state: its theme target and fill. The other state's, for
    // the fade layer's colour (switchFill.ts).
    const trackPropsFor = (on)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('switch', {
            checked: on ? 'checked' : null,
            disabled: isDisabled ? 'disabled' : null,
            size
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.track, trackSizeStyles[size], on ? styles.trackOn : styles.trackOff, styles.trackFocus, isDisabled && styles.trackDisabled, isDisabled && !on && styles.trackDisabledOff));
    // Syncs the hit area's insets with the layout around the switch, through
    // utils/hitArea's observers. Under a coarse pointer they grow toward 44 px,
    // stopping at half the gap to each neighbouring target. A disabled switch
    // watches nothing.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        const surface = surfaceRef.current;
        if (surface == null || isDisabled) {
            return;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$hitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["watchHitArea"])(surface, (insets)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$hitArea$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeHitInsets"])(surface, insets));
    }, [
        isDisabled
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$useSwitchTouch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSwitchTouch"])(touchParts, {
        isOn,
        isInteractive: !isDisabled && !isBusy,
        isDisabled,
        trackSize: TRACK_SIZE[size],
        otherTrackProps: trackPropsFor(!isOn)
    });
    const switchElement = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        ref: surfaceRef,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.switchWrapper, wrapperSizeStyles[size], !isDisabled && !isBusy && styles.switchWrapperInteractive),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("input", {
                ref: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMergedRefs"])(ref, disabledMessageTooltip.positionRef, inputRef),
                id: id,
                type: "checkbox",
                role: "switch",
                name: isDisabled ? undefined : htmlName,
                checked: isOn,
                "aria-disabled": isDisabled ? 'true' : undefined,
                form: isDisabled ? '' : undefined,
                required: isRequired,
                "aria-required": isRequired ? 'true' : undefined,
                onChange: (e)=>{
                    if (isDisabled || isBusy) {
                        return;
                    }
                    const checked = e.target.checked;
                    onChange?.(checked, e);
                    if (changeAction && !e.defaultPrevented) {
                        startTransition(async ()=>{
                            setOptimisticValue(checked);
                            await changeAction(checked, e);
                        });
                    }
                },
                onFocus: onFocus,
                onBlur: onBlur,
                "aria-labelledby": ariaLabelledByProp,
                "aria-describedby": ariaDescribedBy,
                "aria-invalid": status?.type === 'error' ? true : isRequired ? false : undefined,
                "aria-busy": isBusy || undefined,
                ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.input, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$rtlStyles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rtlStyles"].centerInline('-50%'), styles.inputCoarse, isDisabled && styles.inputDisabled, isBusy && styles.inputBusy, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$switch$2e$markers$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchFocusInput"])
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                ref: trackRef,
                "aria-hidden": "true",
                ...trackPropsFor(isOn),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    ref: thumbRef,
                    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('switch-thumb', {
                        checked: isOn ? 'checked' : null,
                        size
                    }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.thumb, isOn ? thumbOnSizeStyles[size] : thumbOffSizeStyles[size], isOn ? styles.thumbOn : styles.thumbOff)),
                    children: isBusy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$Spinner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Spinner"], {
                        size: "sm"
                    })
                })
            })
        ]
    });
    const labelElement = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.labelWrapper, labelWrapperSizeStyles[size]),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$FieldLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldLabel"], {
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('switch-label'),
            label: label,
            inputID: id,
            isLabelHidden: isLabelHidden,
            isDisabled: isDisabled,
            isOptional: isOptional,
            isRequired: isRequired,
            labelIcon: labelIcon,
            labelTooltip: labelTooltip,
            description: description,
            descriptionID: descriptionID
        })
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('switch-field', {
            labelPosition: labelPosition !== 'end' ? labelPosition : undefined,
            labelSpacing: labelSpacing !== 'hug' ? labelSpacing : undefined
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](width != null && dynamicWidthStyles.width(width), xstyle), className, style),
        ...rest,
        // Native `disabled` suppressed clicks and key events on the switch; the
        // switch is no longer natively disabled, so withhold the caller's
        // handlers while disabled (spec:AST-085 FR2).
        onClick: isDisabled ? undefined : rest.onClick,
        onKeyDown: isDisabled ? undefined : rest.onKeyDown,
        onKeyUp: isDisabled ? undefined : rest.onKeyUp,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                ref: (el)=>{
                    // Interaction (hover/focus) listeners for the disabled-message
                    // tooltip attach to the whole row for a larger trigger target;
                    // positioning anchors on the switch itself (above) so the tooltip
                    // appears next to the control, not the far edge of the row.
                    // Handlers are gated internally by isEnabled, so attaching
                    // unconditionally is safe.
                    disabledMessageTooltip.interactionRef(el);
                },
                ...isDisabled ? undefined : pressable,
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressHoldsDrag$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressHoldsDragProps"])(!isDisabled),
                ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](styles.container, isLabelHidden && styles.containerLabelHidden, labelSpacing === 'spread' && styles.containerSpread, !isDisabled && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$switch$2e$markers$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchScope"], // The touch press's strength and release live on the row the
                // controller writes to; the track and thumb inherit and paint it.
                !isDisabled && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["interactionOverlayStyles"].pressedAlpha, !isDisabled && pressOwnerStyles.pressedAlphaLayered),
                children: [
                    ' ',
                    labelPosition === 'start' ? [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: labelElement
                        }, "label"),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: switchElement
                        }, "switch")
                    ] : [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: switchElement
                        }, "switch"),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: labelElement
                        }, "label")
                    ]
                ]
            }),
            status?.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FieldStatus$2f$FieldStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldStatus"], {
                type: status.type,
                message: status.message,
                id: statusMessageID,
                variant: "detached",
                xstyle: styles.statusGap
            }),
            showsDisabledMessage && disabledMessageTooltip.renderTooltip(disabledMessage)
        ]
    });
}
Switch.displayName = 'Switch';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Switch/switch.markers.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
__turbopack_context__.s([
    "switchFocusInput",
    ()=>switchFocusInput,
    "switchScope",
    ()=>switchScope
]);
;
const switchScope = {
    x1iwu4tg: "x1iwu4tg",
    $$css: true
};
const switchFocusInput = {
    x7rrw3w: "x7rrw3w",
    $$css: true
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Switch/switchFill.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file switchFill.ts
 * @input Switch's track element and the props its other state renders with
 * @output Exports TrackState, sameTrackState, trackStateOf, readInState and
 *   readFillOf: an element read in its other state, in place
 * @position Shared by Switch.tsx and useSwitchTouch.ts for the colour fade
 *   under a finger
 *
 * The colour fade needs the track's fill in its other state, as the theme
 * paints it. readFillOf swaps the track's class and attributes, reads the
 * colour and swaps back in the same task, so nothing paints in between.
 *
 * SYNC: When modified, update Switch.tsx and useSwitchTouch.ts.
 */ /** A track state: its class name and its data attributes. */ /** Whether two track states render alike: the same class and attributes. */ __turbopack_context__.s([
    "readFillOf",
    ()=>readFillOf,
    "readInState",
    ()=>readInState,
    "sameTrackState",
    ()=>sameTrackState,
    "trackStateOf",
    ()=>trackStateOf
]);
function sameTrackState(a, b) {
    if (a === b) {
        return true;
    }
    if (a == null || b == null || a.className !== b.className) {
        return false;
    }
    const names = Object.keys(a.attributes);
    return names.length === Object.keys(b.attributes).length && names.every((name)=>a.attributes[name] === b.attributes[name]);
}
function trackStateOf(props) {
    const attributes = {};
    let className = '';
    for (const [name, value] of Object.entries(props)){
        if (name === 'className' && typeof value === 'string') {
            className = value;
        } else if (name.startsWith('data-') && value != null) {
            // As React writes a data attribute: every value but null or undefined.
            attributes[name] = String(value);
        }
    }
    return {
        className,
        attributes
    };
}
function readInState(element, state, read) {
    const names = new Set(Object.keys(state.attributes));
    for (const attribute of Array.from(element.attributes)){
        if (attribute.name.startsWith('data-')) {
            names.add(attribute.name);
        }
    }
    const savedClass = element.className;
    const saved = new Map();
    for (const name of names){
        saved.set(name, element.getAttribute(name));
    }
    const apply = (className, valueOf)=>{
        element.className = className;
        for (const name of names){
            const value = valueOf(name);
            if (value == null) {
                element.removeAttribute(name);
            } else {
                element.setAttribute(name, value);
            }
        }
    };
    apply(state.className, (name)=>state.attributes[name] ?? null);
    try {
        return read(element);
    } finally{
        apply(savedClass, (name)=>saved.get(name) ?? null);
    }
}
function readFillOf(track, state) {
    return readInState(track, state, (element)=>getComputedStyle(element).backgroundColor);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Switch/switchTouch.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "commitOnRelease",
    ()=>commitOnRelease,
    "dragTarget",
    ()=>dragTarget,
    "settleTime",
    ()=>settleTime,
    "startFlip",
    ()=>startFlip,
    "stepFlip",
    ()=>stepFlip,
    "switchTouchGeometry",
    ()=>switchTouchGeometry
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file switchTouch.ts
 * @input The UIKit switch constants (motion/uikit/switch.ts) and a track size
 * @output The pure model of Switch's touch presentation: thumb geometry, the
 *   drag's target, the flip rule, the commit on release, and when the lifted
 *   thumb may settle
 * @position Pure half of Switch's touch presentation; driven by
 *   useSwitchTouch.ts, tested by switchTouch.test.ts without a browser
 *
 * Positions are thumb offsets from the off end, 0 … `travel`, in the writing
 * direction; the caller mirrors them for right-to-left.
 * SYNC: When modified, update useSwitchTouch.ts and switchTouch.test.ts.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$rubberBand$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/rubberBand.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/switch.js [app-ssr] (ecmascript)");
;
;
const [UIKIT_TRACK_WIDTH, UIKIT_TRACK_HEIGHT] = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchControl"].trackSize;
const [UIKIT_THUMB_WIDTH, UIKIT_THUMB_HEIGHT] = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchControl"].thumbSize;
const [LIFTED_WIDTH, LIFTED_HEIGHT] = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchControl"].liftedThumbSize;
function switchTouchGeometry(trackWidth, trackHeight, thumb) {
    const thumbHeight = thumb?.height ?? trackHeight * UIKIT_THUMB_HEIGHT / UIKIT_TRACK_HEIGHT;
    const thumbWidth = thumb?.width ?? trackWidth * UIKIT_THUMB_WIDTH / UIKIT_TRACK_WIDTH;
    const inset = Math.max(0, (trackHeight - thumbHeight) / 2);
    // UIKit lifts to 58 × 38.3 from 37 × 24; here the lift fills at most half
    // the gap on each side, on both axes alike.
    const liftScale = Math.max(1, Math.min(LIFTED_WIDTH / UIKIT_THUMB_WIDTH, LIFTED_HEIGHT / UIKIT_THUMB_HEIGHT, thumbWidth > 0 ? 1 + inset / thumbWidth : 1, thumbHeight > 0 ? 1 + inset / thumbHeight : 1));
    const liftGrowth = thumbWidth * (liftScale - 1) / 2;
    return {
        trackWidth,
        trackHeight,
        thumbWidth,
        thumbHeight,
        inset,
        travel: Math.max(0, trackWidth - thumbWidth - 2 * inset),
        liftScaleX: liftScale,
        liftScaleY: liftScale,
        rubberBandDimension: Math.max(0, Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchControl"].rubberBand.dimension * trackHeight / UIKIT_TRACK_HEIGHT, inset - liftGrowth)),
        flipDistance: Math.max(0, trackWidth - thumbWidth)
    };
}
function dragTarget(start, translation, geometry) {
    const { travel, rubberBandDimension } = geometry;
    const coefficient = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchControl"].rubberBand.coefficient;
    const raw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$rubberBand$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rubberBandUnclamp"])(start, 0, travel, rubberBandDimension, coefficient) + translation;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$rubberBand$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rubberBandClamp"])(raw, 0, travel, rubberBandDimension, coefficient);
}
function startFlip(isOn) {
    return {
        startedOn: isOn,
        isVisuallyOn: isOn,
        isArmed: false,
        didFlip: false
    };
}
function stepFlip(flip, translation, geometry) {
    // Travel toward the other end: right from off, left from on.
    const toward = flip.startedOn ? -translation : translation;
    if (flip.isVisuallyOn !== flip.startedOn) {
        return toward < 0 ? {
            ...flip,
            isVisuallyOn: flip.startedOn,
            isArmed: false
        } : flip;
    }
    const isPast = toward >= geometry.flipDistance;
    if (flip.isArmed && isPast) {
        return {
            ...flip,
            isVisuallyOn: !flip.startedOn,
            isArmed: false,
            didFlip: true
        };
    }
    return isPast === flip.isArmed ? flip : {
        ...flip,
        isArmed: isPast
    };
}
function commitOnRelease(flip, isOn) {
    return flip?.didFlip === true ? flip.isVisuallyOn : !isOn;
}
function settleTime(releaseTime, liftTime, minimumLiftMs = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchControl"].minimumLiftMs) {
    return Math.max(releaseTime, liftTime + minimumLiftMs);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Switch/useSwitchTouch.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SwitchTouchController",
    ()=>SwitchTouchController,
    "useSwitchTouch",
    ()=>useSwitchTouch
]);
/**
 * @file useSwitchTouch.ts
 * @input Switch's parts (gesture surface, input, thumb and track), its value,
 *   whether it is interactive, the track's other state (switchFill.ts) and
 *   the thumb geometry (switchTouch.ts)
 * @output Exports useSwitchTouch: Switch's gestures for a mouse, a pen and a
 *   finger, and its touch presentation under a coarse primary pointer
 * @position DOM half of Switch's touch presentation, on the gesture system
 *   (../gestures) and the compositor animator (../motion/animator)
 *
 * SYNC: When modified, update switchTouch.ts, Switch.tsx
 * and __tests__/Switch.interaction.browser.spec.ts.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureHost$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/GestureHost.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$PressTracker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/gestures/PressTracker.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$isRtlElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/isRtlElement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsomorphicLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$animator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/animator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/spring.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/gestures.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/uikit/switch.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$resolveMotion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/resolveMotion.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchPresentation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/touchPresentation.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$browserClickWait$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/browserClickWait.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$boxHold$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/boxHold.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/clickGuard.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$switchTouch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Switch/switchTouch.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$switchFill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Switch/switchFill.js [app-ssr] (ecmascript)");
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
/** The fade layer's colour, set on the track for its ::after (Switch.tsx). */ const FADE_FILL = '--_switch-fade-fill';
/** The track's own fill while a change is held (inline, over its CSS). */ const BASE_FILL = 'background-color';
const TRAVEL = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchControl"].travel;
const TRACKING = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchControl"].tracking;
/**
 * Horizontal travel at which the press begins if it has not (a pan
 * begins here), px.
 */ const PAN_HYSTERESIS = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$gestures$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UIKIT_GESTURES"].pan.hysteresis.value;
function now() {
    return typeof performance === 'undefined' ? Date.now() : performance.now();
}
/**
 * The lift spring until `holdSeconds`, then the settle spring from where the
 * lift got to. It is one curve, so the settle starts on the compositor's
 * clock.
 */ function liftThenSettle({ from, velocity, lifted, rest, holdSeconds, threshold, lift, settle }) {
    const hold = Math.max(0, holdSeconds);
    const first = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["solveSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toSpring"])(lift), {
        from,
        to: lifted,
        velocity
    });
    const second = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["solveSpring"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$spring$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toSpring"])(settle), {
        from: first.value(hold),
        to: rest,
        velocity: first.velocity(hold)
    });
    return {
        duration: hold + second.settleTime(threshold),
        at: (t)=>t < hold ? first.value(t) : second.value(t - hold),
        velocity: (t)=>t < hold ? first.velocity(t) : second.velocity(t - hold)
    };
}
class SwitchTouchController {
    elements = null;
    isInteractive = true;
    /** The side the visuals show or head to. */ /** +1 left-to-right, −1 right-to-left. */ direction = 1;
    thumb = null;
    /** The fade layer: its opacity is how far the visuals are from the value. */ fade = null;
    /** The lifted shadow: the thumb's `::after`, faded in with the lift. */ shadow = null;
    /** When the thumb lifted (document timeline, ms); null while at rest. */ liftTime = null;
    /** When the running settle leaves the lift (settleTime), ms. */ settleAt = null;
    otherTrack = null;
    /**
   * A change landed mid-fade, and the fade already heads to it. The track's
   * own fill stays the previous value's (inline) until the fade lands. So the
   * change's frame builds no curve and repaints nothing. `baseHold` counts
   * holds, so a settled one ignores its late landing.
   */ baseHeld = false;
    baseHold = 0;
    detachers = [];
    /** When the press began (document timeline, ms); null with no press. */ pressTime = null;
    /** The thumb's offset when the current finger landed. */ downOffset = 0;
    drag = null;
    /** The finger's last travel along x, for a lift that reports none. */ lastTravel = 0;
    /**
   * The press and the pan both report every touch event; the first report
   * takes the step and this skips the second (cleared after the event).
   */ isStepping = false;
    /** The current touch already ended in a release. */ released = false;
    /**
   * Reduced motion: a release changed the value. The thumb's travel waits for
   * the value to commit, so its one cross-fade lands in the new frame.
   */ pendingTravel = false;
    /** Passive: a finger is down on the switch. */ isTracking = false;
    /** Which presentation the switch has: the touch one, or its own. */ presentation = 'touch';
    /** Passive: a lift is waiting for the browser's own click; this ends it. */ endBrowserClickWait = null;
    reconcileTimer = null;
    constructor(isOn, geometry){
        this.isOn = isOn;
        this.isVisuallyOn = isOn;
        this.geometry = geometry;
    }
    get isAttached() {
        return this.elements != null;
    }
    attach(elements, presentation) {
        this.detach();
        this.elements = elements;
        this.presentation = presentation;
        this.measureGeometry();
        this.direction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$isRtlElement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isRtlElement"])(elements.surface) ? -1 : 1;
        this.isVisuallyOn = this.isOn;
        const host = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$GestureHost$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getGestureHost"])(elements.surface.ownerDocument);
        if (presentation === 'pointer') {
            // The switch's own look: the gestures decide the value and the CSS
            // shows it.
            this.detachers = this.attachPassive(host, elements);
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerSwitchTable"])();
        this.thumb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$animator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createMotionEngine"])(elements.thumb);
        // The layer rests clear (its class's opacity 0) while the visuals show
        // the value; from here its opacity is the animator's. The stylesheet
        // shows that rest (`base`), so no animation holds it there. These writes
        // promote nothing: a page of switches holds no compositing layer until
        // one moves.
        this.fade = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$animator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createMotionEngine"])(elements.track, {
            pseudoElement: '::after',
            initial: {
                opacity: 0
            },
            base: {
                opacity: 0
            }
        });
        this.fade.set({
            opacity: 0
        }, {
            promote: false
        });
        this.shadow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$animator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createMotionEngine"])(elements.thumb, {
            pseudoElement: '::after',
            initial: {
                opacity: 0
            },
            base: {
                opacity: 0
            }
        });
        this.shadow.set({
            opacity: 0
        }, {
            promote: false
        });
        this.paintFade();
        this.detachers = this.attachPassive(host, elements);
    }
    /**
   * Passive: UIControl's tracking, which never blocks a scroll. The press
   * begins with the touch, or with the first horizontal move a pan would
   * begin on. Inside a scroller the touch waits for the content delay. Every
   * move steps the flip rule, and the release commits. A touch the browser
   * takes for its scroll yields with no toggle.
   */ attachPassive(host, elements) {
        const { surface } = elements;
        const tracker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$gestures$2f$PressTracker$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPressTracker"])({
            view: surface,
            getBounds: ()=>surface.getBoundingClientRect(),
            isEnabled: ()=>this.isInteractive,
            isBraking: ()=>host.isScrollBraking(surface),
            // A held finger selects no text beside the switch.
            selectionLock: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$boxHold$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lockPressedRow"],
            // A held switch opens no menu (UISwitch shows none).
            holdsContextMenu: ()=>this.pressTime != null,
            onControlEvent: (event, touch)=>this.onControlEvent(event, touch),
            onHighlightChange: (isHighlighted)=>{
                if (isHighlighted && this.isTracking && this.pressTime == null) {
                    this.pressBegan(now());
                }
            }
        });
        return [
            host.attachConsumer(surface, tracker),
            ()=>tracker.dispose()
        ];
    }
    /** Undo everything: listeners, timers, animations and inline styles. */ detach() {
        for (const detach of this.detachers){
            detach();
        }
        this.detachers = [];
        this.clearTimers();
        for (const animator of [
            this.thumb,
            this.fade,
            this.shadow
        ]){
            const element = animator?.element;
            animator?.dispose();
            if (element != null) {
                for (const property of [
                    'translate',
                    'scale',
                    'opacity'
                ]){
                    element.style.removeProperty(property);
                }
            }
        }
        this.elements?.track.style.removeProperty(FADE_FILL);
        this.elements?.track.style.removeProperty(BASE_FILL);
        this.baseHeld = false;
        this.baseHold++;
        this.thumb = this.fade = this.shadow = null;
        this.liftTime = null;
        this.elements = null;
        this.pressTime = null;
        this.drag = null;
        this.isTracking = false;
    }
    setInteractive(isInteractive) {
        this.isInteractive = isInteractive;
        if (!isInteractive && this.pressTime != null) {
            this.abandon(now());
        }
    }
    /** The track's other state, re-rendered with each value. */ setOtherTrack(otherTrack) {
        const previous = this.otherTrack;
        this.otherTrack = otherTrack;
        // A held fill was read from the previous other state; a re-render that
        // keeps it keeps the hold.
        if (this.baseHeld && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$switchFill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sameTrackState"])(previous, otherTrack)) {
            this.landBase(now());
        }
    }
    setGeometry(geometry) {
        this.geometry = geometry;
        this.measureGeometry();
        this.thumb?.set({
            x: 0,
            scaleX: 1,
            scaleY: 1
        }, {
            promote: false
        });
    }
    /**
   * The thumb geometry from the rendered boxes. The track's box lets a theme
   * resize the track. The thumb's box is the circle of the current value. It
   * rests by insets from the track's padding box, so padding does not move it.
   */ measureGeometry() {
        const track = this.elements?.track;
        const thumb = this.elements?.thumb;
        if (track == null) {
            return;
        }
        // Fractional boxes: the track's border box less its border (it has no
        // transform). The thumb's used size comes from its computed style, which
        // its scale does not change.
        const box = track.getBoundingClientRect();
        const trackWidth = box.width - 2 * track.clientLeft;
        const trackHeight = box.height - 2 * track.clientTop;
        if (trackWidth <= 0 || trackHeight <= 0) {
            return;
        }
        const style = thumb == null ? null : getComputedStyle(thumb);
        const thumbWidth = style == null ? NaN : parseFloat(style.width);
        const thumbHeight = style == null ? NaN : parseFloat(style.height);
        this.geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$switchTouch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchTouchGeometry"])(trackWidth, trackHeight, thumbWidth > 0 && thumbHeight > 0 ? {
            width: thumbWidth,
            height: thumbHeight
        } : undefined);
    }
    /**
   * The rendered value changed. The CSS has already moved the thumb's
   * resting place. So the thumb's delta is rebased first, and nothing moves on
   * screen. Then the visuals head for the new value.
   */ setValue(isOn) {
        if (isOn === this.isOn) {
            return;
        }
        const previous = this.isOn;
        this.isOn = isOn;
        const thumb = this.thumb;
        if (thumb == null) {
            this.isVisuallyOn = isOn;
            return;
        }
        const time = now();
        // The thumb's CSS rest moved with the value: shift it back by as much,
        // so nothing moves on screen. A spring keeps its target through the shift
        // and is sent to the new rest below. A spring already heading for the new
        // rest moves whole instead, keeping its start time and velocity. A
        // reduced-motion dip shifts whole, its end included, and keeps going.
        const springs = thumb.reducedMotion() === 'off';
        thumb.rebase({
            x: this.direction * (this.rest(previous) - this.rest(isOn))
        }, springs ? {
            towards: {
                x: this.toX(this.rest(isOn))
            }
        } : {});
        // Each state has its own thumb size, the circle a mouse sees. The box the
        // CSS now renders is the new value's. Its scale takes the old size over
        // and grows or shrinks it from there.
        const before = this.geometry;
        this.measureGeometry();
        if (springs) {
            this.rescaleThumb(before, this.geometry, time);
        }
        // The track now shows the new value's fill. The fade layer swaps to the
        // other fill and to the complement of its opacity. Nothing changes on
        // screen, and the fade keeps heading where the visuals head.
        const fade = this.fade;
        if (fade != null) {
            this.landBase(time);
            // Already heading here (a release, a drag that flipped). The running
            // fade carries the change over the previous fill, held as the track's
            // own until it lands. WebKit plays a curve built in a held frame only
            // once the long task ends. A swap here would step the colour back.
            if (this.isVisuallyOn !== isOn || !this.holdBase()) {
                this.swapFade(time);
            }
        }
        const wasDragging = this.drag != null && !this.released;
        if (wasDragging) {
            // The app changed the value mid-gesture: the value wins and the
            // gesture ends without committing.
            this.drag = null;
            this.released = true;
            this.pressEnded();
        }
        // A release already sent the visuals here. Any other change, the app's or
        // one mid-gesture, sends them now, and a spring heads for the new rest.
        if (springs || wasDragging || this.pendingTravel || this.isVisuallyOn !== isOn) {
            const touchRelease = this.pendingTravel;
            this.pendingTravel = false;
            this.showSide(isOn, time, thumb.getVelocity('x', time), touchRelease);
        }
    }
    // --- Touches ---------------------------------------------------------------
    touchDown(time) {
        this.landBase(time);
        this.released = false;
        this.pendingTravel = false;
        this.drag = null;
        this.lastTravel = 0;
        this.downOffset = this.offsetAt(time);
    }
    /** Passive: a mouse, a pen or a finger on the switch, UIControl's events. */ onControlEvent(event, touch) {
        const travel = touch.x - touch.startX;
        // The switch reads the thumb when it handles the event. Its motion has no
        // start of its own. A call that continues motion starts then, from the
        // curve on screen. A call from rest starts at the frame that shows it, as
        // Core Animation starts an animation at its commit. A busy main thread
        // hands the switch an event late and commits its frame late. The motion
        // is delayed, never stepped back or skipped into. The event's own time is
        // the recognizers'.
        const time = now();
        switch(event){
            case 'touchDown':
                this.isTracking = true;
                this.touchDown(time);
                return;
            case 'touchDragInside':
            case 'touchDragOutside':
                if (this.released || !this.isInteractive) {
                    return;
                }
                if (this.pressTime == null) {
                    if (Math.abs(travel) < PAN_HYSTERESIS) {
                        return;
                    }
                    // A pan would begin here: the switch takes the horizontal drag.
                    this.pressBegan(time);
                }
                this.move(time, travel);
                return;
            case 'touchUpInside':
            case 'touchUpOutside':
                this.isTracking = false;
                if (this.released || !this.isInteractive) {
                    return;
                }
                // The finger's lift is a step of its own: a flip armed by the last
                // move happens here (a fast swipe flips on the lift).
                this.move(time, travel);
                if (this.drag?.flip.didFlip !== true && event === 'touchUpInside') {
                    // A tap, a hold or a short drag: the browser's click activates it.
                    // Only a finger's lift can come with no click (a hold). A mouse or a
                    // pen gets one whenever it is released on the input. With no click,
                    // it was released off the input, inside the tracking slop. The
                    // switch is then left alone, as the native checkbox is.
                    this.release(time, {
                        byBrowserClick: true,
                        clicksIfNoBrowserClick: touch.pointerType === 'touch'
                    });
                    return;
                }
                if (touch.pointerType !== 'touch' && (event === 'touchUpOutside' || this.drag?.flip.didFlip !== true)) {
                    // A mouse or a pen released outside the tracking bounds, flipped or
                    // not, leaves the switch alone, as the native checkbox does. So the
                    // press can be taken back (WCAG 2.5.2). Only a finger's press slid
                    // off toggles.
                    this.released = true;
                    this.abandon(time);
                    return;
                }
                // A drag that flipped, or a press slid off and lifted outside, which
                // toggles as UISwitch's does. The switch decides this lift itself, so
                // the shared click guard swallows the browser's click, if one comes.
                // A drag back past the press commits nothing, and its click must not
                // toggle either.
                if (this.elements != null) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["armClickGuard"])(this.elements.input.ownerDocument);
                }
                this.release(time);
                return;
            case 'touchCancel':
                // The browser took the touch for its scroll, or a recognizer above
                // took it: the switch yields.
                this.isTracking = false;
                if (!this.released) {
                    this.released = true;
                    this.abandon(time);
                }
                return;
            case 'touchDragEnter':
            case 'touchDragExit':
                return;
        }
    }
    /**
   * One touch event of a held or dragged switch. It retargets the thumb at the
   * finger (one style write) and steps the flip rule.
   */ move(time, travel) {
        const thumb = this.thumb;
        if (this.isStepping) {
            return;
        }
        this.isStepping = true;
        queueMicrotask(()=>{
            this.isStepping = false;
        });
        const x = this.direction * (travel ?? this.lastTravel);
        this.lastTravel = travel ?? this.lastTravel;
        const drag = this.drag ??= {
            start: this.downOffset,
            flip: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$switchTouch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["startFlip"])(this.isOn)
        };
        // The thumb under the finger is direct manipulation, which reduced
        // motion leaves alone. Under it the thumb is placed at once: the animator
        // would cross-fade a move. Under a fine pointer nothing follows the
        // pointer. The switch keeps its own look, and the value moves the thumb.
        if (thumb != null) {
            const target = this.toX((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$switchTouch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dragTarget"])(drag.start, x, this.geometry));
            if (thumb.reducedMotion() === 'off') {
                thumb.animate({
                    x: target
                }, {
                    spring: TRACKING
                });
            } else {
                thumb.set({
                    x: target
                });
            }
        }
        drag.flip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$switchTouch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stepFlip"])(drag.flip, x, this.geometry);
        if (drag.flip.isVisuallyOn !== this.isVisuallyOn) {
            this.showWell(drag.flip.isVisuallyOn, time);
        }
    }
    /**
   * The finger lifted after a tap, a hold or a drag. `byBrowserClick`: the
   * browser's own click activates the input, and the switch clicks it only
   * if that click never comes.
   */ release(time, { byBrowserClick = false, clicksIfNoBrowserClick = true } = {}) {
        if (this.released) {
            return;
        }
        this.released = true;
        this.clearTimers();
        const commit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$switchTouch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commitOnRelease"])(this.drag?.flip ?? null, this.isOn);
        this.drag = null;
        if (this.pressTime == null) {
            // A tap quicker than a scroller's content delay: the press begins now.
            this.pressBegan(time);
        }
        if (commit !== this.isOn && this.thumb != null && this.thumb.reducedMotion({
            touchRelease: true
        }) !== 'off') {
            // Under reduced motion the travel is one cross-fade, played when the
            // value commits (setValue). It lands in the new value's frame. The
            // colour starts now.
            this.pendingTravel = true;
            this.showWell(commit, time, true);
        } else {
            this.showSide(commit, time, undefined, true);
        }
        this.pressEnded(time, true);
        const surface = this.elements?.surface;
        if (byBrowserClick && surface != null) {
            // The lift's own click activates the input natively: the switch then
            // clicks nothing itself.
            this.endBrowserClickWait = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$browserClickWait$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["awaitBrowserClick"])(surface, {
                onClicked: ()=>{
                    this.endBrowserClickWait = null;
                    this.scheduleReconcile();
                },
                onNoClick: ()=>{
                    this.endBrowserClickWait = null;
                    if (clicksIfNoBrowserClick && commit !== this.isOn) {
                        this.clickInput();
                    }
                    this.scheduleReconcile();
                }
            });
            return;
        }
        if (commit !== this.isOn) {
            // No click comes from the browser for this lift; the input's own click
            // keeps every native path (form value, onChange, the label).
            this.clickInput();
        }
        this.scheduleReconcile();
    }
    /**
   * The switch's own click on its input. The shared click guard then swallows
   * the browser's late click for the same lift, so the switch toggles once.
   */ clickInput() {
        const input = this.elements?.input;
        if (input != null) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$browserClickWait$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clickForLift"])(input);
        }
    }
    /** If the owner kept the old value, the visuals go back to it. */ scheduleReconcile() {
        if (this.reconcileTimer != null) {
            clearTimeout(this.reconcileTimer);
        }
        this.reconcileTimer = setTimeout(()=>{
            this.reconcileTimer = null;
            if (this.drag == null && this.isVisuallyOn !== this.isOn) {
                this.pendingTravel = false;
                this.showSide(this.isOn, now(), undefined, true);
            }
        }, 0);
    }
    /** The touch ended without a release (cancelled, or the switch turned off). */ abandon(time) {
        this.drag = null;
        this.showSide(this.isOn, time, undefined, true);
        this.pressEnded(time, true);
    }
    // --- Visuals ---------------------------------------------------------------
    rest(isOn) {
        return isOn ? this.geometry.travel : 0;
    }
    /** The animator's x for a thumb offset, relative to its CSS place. */ toX(offset) {
        return this.direction * (offset - this.rest(this.isOn));
    }
    /** The thumb's offset on screen at `time`, from the curve. */ offsetAt(time) {
        const x = this.thumb?.get('x', time) ?? 0;
        return this.rest(this.isOn) + this.direction * x;
    }
    showWell(isOn, time, touchRelease = false) {
        this.isVisuallyOn = isOn;
        this.paintFade();
        this.animateFade(time, undefined, touchRelease);
    }
    /**
   * The fade layer heads for the visuals, on UIKit's well springs (on:
   * 0.68 s, off: 0.40 s). It is clear when they show the value. It is opaque,
   * the other fill, when they show the other side.
   */ animateFade(time, velocity, touchRelease = false) {
        // Under reduced motion the animator plays this as its cross-fade.
        this.fade?.animate({
            opacity: this.isVisuallyOn === this.isOn ? 0 : 1
        }, {
            spring: this.isVisuallyOn ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchControl"].wellOn : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchControl"].wellOff,
            velocity: velocity == null ? undefined : {
                opacity: velocity
            }
        }, {
            touchRelease
        });
    }
    /**
   * The track now shows the new value's fill. The fade layer swaps to the
   * other fill and to the complement of its opacity, so nothing changes on
   * screen. It keeps heading where the visuals head, on the running clock.
   */ swapFade(time) {
        const fade = this.fade;
        if (fade == null) {
            return;
        }
        const opacity = fade.get('opacity', time);
        const fadeVelocity = fade.getVelocity('opacity', time);
        this.paintFade();
        fade.rebase({
            opacity: 1 - 2 * opacity
        });
        this.animateFade(time, -fadeVelocity);
    }
    /**
   * Holds the track's own fill at the previous value's (the other state's,
   * now) until the fade lands. False when there is nothing to read it from.
   */ holdBase() {
        const track = this.elements?.track;
        const fade = this.fade;
        if (track == null || fade == null || this.otherTrack == null) {
            return false;
        }
        track.style.setProperty(BASE_FILL, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$switchFill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readFillOf"])(track, this.otherTrack));
        this.baseHeld = true;
        const hold = ++this.baseHold;
        void fade.atRest([
            'opacity'
        ]).then(()=>{
            if (hold === this.baseHold) {
                this.landBase(now());
            }
        });
        return true;
    }
    /**
   * Ends a held fill: the track shows its value's fill again and the fade
   * layer swaps under it. Once the fade has landed, the layer is opaque and
   * nothing changes on screen. Called early, by a new touch, value or other
   * state, the swap keeps the picture where it is.
   */ landBase(time) {
        if (!this.baseHeld) {
            return;
        }
        this.baseHeld = false;
        this.baseHold++;
        this.elements?.track.style.removeProperty(BASE_FILL);
        this.swapFade(time);
    }
    /** The fade layer's colour: the track's fill in its other state. */ paintFade() {
        const track = this.elements?.track;
        if (track == null || this.fade == null || this.otherTrack == null) {
            return;
        }
        track.style.setProperty(FADE_FILL, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$switchFill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readFillOf"])(track, this.otherTrack));
    }
    /** Track color and thumb head for one side. */ showSide(isOn, time, velocity, touchRelease = false) {
        if (isOn !== this.isVisuallyOn) {
            this.showWell(isOn, time, touchRelease);
        }
        // Under reduced motion the animator cross-fades this travel: the thumb
        // fades out where it is and back in at its rest.
        this.thumb?.animate({
            x: this.toX(this.rest(isOn))
        }, {
            spring: TRAVEL,
            velocity: velocity == null ? undefined : {
                x: velocity
            }
        }, {
            touchRelease
        });
    }
    /** The press began: the switch holds the touch and the thumb lifts. */ pressBegan(time) {
        this.pressTime = time;
        this.lift(time);
    }
    /** The press ended (a release, a cancel or the switch turning off). */ pressEnded(time = now(), touchRelease = false) {
        this.pressTime = null;
        this.settle(time, touchRelease);
    }
    /**
   * The thumb grows about its center into half the gap around it, and its
   * lifted shadow fades in. Under reduced motion nothing lifts: the lift is
   * feedback with no fade of its own.
   */ lift(time) {
        if (this.thumb == null || this.thumb.reducedMotion() !== 'off') {
            return;
        }
        this.liftTime = time;
        const lift = this.thumb.animate({
            scaleX: this.geometry.liftScaleX,
            scaleY: this.geometry.liftScaleY
        }, {
            spring: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchControl"].lift
        });
        this.shadow?.animate({
            opacity: 1
        }, {
            spring: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchControl"].lift
        });
        // A lift from rest starts at the frame that shows it: the minimum lift
        // counts from there.
        void lift.started.then((start)=>{
            if (this.liftTime === time) {
                this.liftTime = start;
            }
        });
    }
    /**
   * The thumb settles back after the press, no sooner than the minimum lift
   * time after it lifted. One curve per property, built now, starts the
   * settle on the compositor's clock.
   */ settle(time, touchRelease) {
        const liftTime = this.liftTime;
        if (liftTime == null) {
            return;
        }
        this.liftTime = null;
        // The lift played these roles at the thumb's tempo, so the settle and the
        // minimum lift take that tempo too.
        const element = this.thumb?.element;
        const lift = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$resolveMotion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveMotion"])(element, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchControl"].lift);
        const settle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$resolveMotion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveMotion"])(element, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchControl"].settle);
        this.settleAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$switchTouch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["settleTime"])(time, liftTime, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$resolveMotion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveMotion"])(element, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchControl"], 'minimumLiftMs'));
        const hold = (this.settleAt - time) / 1000;
        const play = (animator, property, lifted, rest, threshold)=>{
            if (animator == null) {
                return;
            }
            animator.play({
                [property]: liftThenSettle({
                    from: animator.get(property, time),
                    velocity: animator.getVelocity(property, time),
                    lifted,
                    rest,
                    holdSeconds: hold,
                    threshold,
                    lift,
                    settle
                })
            }, {
                touchRelease
            });
        };
        play(this.thumb, 'scaleX', this.geometry.liftScaleX, 1, 1e-4);
        play(this.thumb, 'scaleY', this.geometry.liftScaleY, 1, 1e-4);
        play(this.shadow, 'opacity', 1, 0, 1e-3);
    }
    /**
   * The thumb's box changed size with the value: the on circle is larger.
   * Its scale carries the size it showed, so nothing jumps. Then it heads for
   * the new box through the settle, or to the lift a held press keeps.
   */ rescaleThumb(before, after, time) {
        const thumb = this.thumb;
        if (thumb == null || !(before.thumbWidth > 0 && before.thumbHeight > 0) || !(after.thumbWidth > 0 && after.thumbHeight > 0) || before.thumbWidth === after.thumbWidth && before.thumbHeight === after.thumbHeight) {
            return;
        }
        const held = this.liftTime != null;
        const hold = this.settleAt == null ? 0 : Math.max(0, this.settleAt - time) / 1000;
        for (const [property, factor, lifted] of [
            [
                'scaleX',
                before.thumbWidth / after.thumbWidth,
                before.liftScaleX
            ],
            [
                'scaleY',
                before.thumbHeight / after.thumbHeight,
                before.liftScaleY
            ]
        ]){
            const keep = lifted * factor;
            thumb.play({
                [property]: liftThenSettle({
                    from: thumb.get(property, time) * factor,
                    velocity: thumb.getVelocity(property, time) * factor,
                    lifted: keep,
                    rest: held ? keep : 1,
                    holdSeconds: held ? 0 : hold,
                    threshold: 1e-4,
                    lift: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$resolveMotion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveMotion"])(thumb.element, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchControl"].lift),
                    settle: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$resolveMotion$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveMotion"])(thumb.element, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$uikit$2f$switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchControl"].settle)
                })
            });
        }
    }
    clearTimers() {
        this.endBrowserClickWait?.();
        this.endBrowserClickWait = null;
        if (this.reconcileTimer != null) {
            clearTimeout(this.reconcileTimer);
            this.reconcileTimer = null;
        }
    }
}
function useSwitchTouch(parts, { isOn, isInteractive, isDisabled, trackSize, otherTrackProps }) {
    const { isTouch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchPresentation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useTouchPresentation"])();
    const [trackWidth, trackHeight] = trackSize;
    const geometry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$switchTouch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["switchTouchGeometry"])(trackWidth, trackHeight), [
        trackWidth,
        trackHeight
    ]);
    const otherTrack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$switchFill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trackStateOf"])(otherTrackProps);
    const [controller] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>new SwitchTouchController(isOn, geometry));
    // Syncs the touch controller's animators with the value. It runs first: the
    // thumb's CSS place and the track's fill have just changed with the value.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        controller.setOtherTrack(otherTrack);
        controller.setValue(isOn);
    });
    // Syncs the controller's thumb geometry with the track's size.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        controller.setGeometry(geometry);
    }, [
        controller,
        geometry
    ]);
    // Syncs whether the controller's gestures take a press.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        controller.setInteractive(isInteractive);
    }, [
        controller,
        isInteractive
    ]);
    // Attaches the controller's DOM listeners and animators to the switch's
    // parts, and detaches them on cleanup.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        const surface = parts.surface.current;
        const input = parts.input.current;
        const thumb = parts.thumb.current;
        const track = parts.track.current;
        // A disabled switch takes no press: no listener is active. A busy one
        // stays attached (setInteractive ignores its presses),
        // so the change that made it busy keeps its motion.
        if (isDisabled || surface == null || input == null || thumb == null || track == null) {
            return undefined;
        }
        controller.attach({
            surface,
            input,
            thumb,
            track
        }, isTouch ? 'touch' : 'pointer');
        return ()=>controller.detach();
    }, [
        controller,
        isTouch,
        isDisabled,
        parts
    ]);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Text/Text.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Text",
    ()=>Text,
    "resolveStyleColor",
    ()=>resolveStyleColor
]);
/**
 * @file Text.tsx
 * @input Uses React, HTMLAttributes, ReactNode
 * @output Exports Text component, TextProps, TextType, TextSize types
 * @position Core implementation; consumed by index.ts, tested by Text.test.tsx
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Text/Text.doc.mjs (props table, features, implementation notes)
 * - /packages/core/src/Text/Text.test.tsx (tests for new/changed behavior)
 * - /packages/core/src/Text/index.ts (exports if types change)
 * - /apps/storybook/stories/Text.stories.tsx (storybook stories)
 * - /packages/cli/assets/templates/blocks/components/Text/ (showcase blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Text/text.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$useTruncation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Text/useTruncation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$TruncationTooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Text/TruncationTooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/composeEventHandlers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMergedRefs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$textClampContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Text/textClampContext.js [app-ssr] (ecmascript)");
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
// Default color by text type — custom types fall back to 'primary'
const defaultColorByType = {
    body: 'primary',
    large: 'primary',
    label: 'primary',
    supporting: 'secondary',
    code: 'primary',
    'display-1': 'primary',
    'display-2': 'primary',
    'display-3': 'primary',
    inherit: 'inherit'
};
/**
 * Resolve the StyleX style key for a text type.
 * Custom (theme-defined) types fall back to 'body' for baseline StyleX styles;
 * their visual treatment comes from theme CSS overrides (.astryx-text.<type>).
 */ function resolveStyleType(type) {
    if (type in __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sizeByTypeStyles"]) {
        return type;
    }
    return 'body';
}
function resolveStyleColor(color) {
    // The `in` guard is a runtime check for consumer-augmented custom colors
    // (which widen `TextColor` beyond the built-ins via TextColorMap); within
    // core the two types coincide, so no cast is needed.
    if (color in __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorStyles"]) {
        return color;
    }
    return 'primary';
}
function Text({ type = 'body', size, color, weight, display = 'inline', maxLines = 0, hasTruncateTooltip = true, wordBreak, textWrap, justify = 'start', hasCapsize = false, hasStrikethrough = false, hasTabularNumbers = false, xstyle, className, style, as: Component = 'span', children, ref, ...props }) {
    // Resolve color with type-based default
    const resolvedColor = color ?? defaultColorByType[type] ?? 'primary';
    // Resolve style type — custom types fall back to 'body' for StyleX baseline
    const styleType = resolveStyleType(type);
    // Resolve style color — custom colors fall back to 'primary' for StyleX
    // baseline; the real color comes from theme CSS via the rendered `color`
    // class (see themeProps below).
    const styleColor = resolveStyleColor(resolvedColor);
    // Resolve wordBreak with smart default
    const resolvedWordBreak = wordBreak ?? (maxLines === 1 ? 'break-all' : 'break-word');
    // Resolve display - force block when maxLines > 0 or hasCapsize
    const resolvedDisplay = maxLines > 0 || hasCapsize ? 'block' : display;
    // Truncation detection. Only the tooltip reads the measured overflow, so
    // with the tooltip off the text is clipped by CSS alone and nothing is
    // measured or observed.
    const truncation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$useTruncation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTruncation"])({
        maxLines: hasTruncateTooltip === false ? 0 : maxLines
    });
    // Tooltip for truncated text
    const tooltipPlacement = typeof hasTruncateTooltip === 'string' ? hasTruncateTooltip : 'above';
    const tooltipEnabled = maxLines > 0 && hasTruncateTooltip !== false && truncation.isTruncated;
    // The tooltip mounts on the first hover, tap or focus, not with the text.
    const tooltipInterest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$TruncationTooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTruncationTooltipInterest"])(tooltipEnabled);
    // Ref for the text element (used as tooltip anchor)
    const textRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Keep the merged ref stable across rerenders.
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMergedRefs"])(ref, truncation.ref, textRef);
    const isInClampedText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$textClampContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextClampContext"]);
    // A capsize block removes a multi-line clamp.
    const isClamped = maxLines === 1 || maxLines > 1 && !hasCapsize;
    // Build inline style for -webkit-line-clamp (dynamic value)
    const inlineStyle = maxLines > 1 ? {
        WebkitLineClamp: maxLines
    } : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Component, {
                ref: mergedRef,
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('text', {
                    type,
                    size,
                    color: resolvedColor
                }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorStyles"][styleColor], __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sizeByTypeStyles"][styleType], size && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sizeStyles"][size], __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultWeightByTypeStyles"][styleType], weight && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["weightStyles"][weight], // Display: use truncation styles when maxLines > 0
                maxLines === 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncationStyles"].singleLine : maxLines > 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncationStyles"].multiLine : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["displayStyles"][resolvedDisplay], // Word break when truncating
                maxLines > 0 && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wordBreakStyles"][resolvedWordBreak], // Text wrap
                textWrap && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["textWrapStyles"][textWrap], // Justify (text alignment)
                justify !== 'start' && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["justifyStyles"][justify], // Capsize
                hasCapsize && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["capsizeStyles"].enabled, // Decorations
                hasStrikethrough && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decorationStyles"].strikethrough, hasTabularNumbers && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tabularNumbersStyle"].enabled, // User xstyle
                xstyle), className, {
                    ...style,
                    ...inlineStyle
                }),
                ...props,
                onPointerEnter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(tooltipInterest.onPointerEnter, props.onPointerEnter),
                onPointerLeave: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(tooltipInterest.onPointerLeave, props.onPointerLeave),
                onPointerDown: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(tooltipInterest.onPointerDown, props.onPointerDown),
                onFocus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(tooltipInterest.onFocus, props.onFocus),
                onBlur: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeEventHandlers"])(tooltipInterest.onBlur, props.onBlur),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$textClampContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TextClampContext"], {
                    value: isClamped || isInClampedText,
                    children: children
                })
            }),
            tooltipEnabled && tooltipInterest.isWanted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$TruncationTooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TruncationTooltip"], {
                anchorRef: textRef,
                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["props"](__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncationTooltipStyles"].content),
                    children: truncation.fullText
                }),
                placement: tooltipPlacement,
                interest: tooltipInterest
            })
        ]
    });
}
Text.displayName = 'Text';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Text/TruncationTooltip.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TruncationTooltip",
    ()=>TruncationTooltip,
    "useTruncationTooltipInterest",
    ()=>useTruncationTooltipInterest
]);
/**
 * @file TruncationTooltip.tsx
 * @input A truncated element's ref, its full text and the tooltip placement
 * @output Exports `useTruncationTooltipInterest`, which loads the Tooltip
 *   module once text is truncated and tracks the first hover, tap or focus on
 *   it, and `TruncationTooltip`, the Tooltip that mounts on that interaction
 * @position Shared by Text, Heading and Lab's LineClamp (through Core's internal
 *   line-clamp entry). Until the first interaction a page of
 *   truncated text mounts no tooltip layers, and the tooltip that then mounts
 *   answers that interaction as it would once mounted.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$moduleLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/moduleLoader.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useTouchTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/useTouchTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/nodeType.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$tooltipPresentInterest$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/tooltipPresentInterest.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
;
;
;
// The Tooltip module. Once loaded, a tooltip renders from it at once: no
// boundary suspends, so the first hover's delay starts on the hover.
const tooltipModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$moduleLoader$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createModuleLoader"])(async ()=>__turbopack_context__.A("[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/Tooltip.js [app-ssr] (ecmascript, async loader)"));
function useTruncationTooltipInterest(isEnabled) {
    const [isWanted, setIsWanted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tooltip, setTooltip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>tooltipModule.loaded()?.Tooltip ?? null);
    // Syncs with the module loader: truncated text loads the Tooltip module, so
    // the first interaction mounts the tooltip at once.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isEnabled || tooltip != null) {
            return;
        }
        let isCurrent = true;
        tooltipModule.load().then((loaded)=>{
            if (isCurrent) {
                setTooltip(()=>loaded.Tooltip);
            }
        }, ()=>{});
        return ()=>{
            isCurrent = false;
        };
    }, [
        isEnabled,
        tooltip
    ]);
    const interestRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        interest: null,
        tapEvent: null,
        isRead: false
    });
    const tapRecognizer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useTouchTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTapRecognizer"])();
    const want = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((interest, tapEvent = null)=>{
        const state = interestRef.current;
        if (!isEnabled || state.isRead) {
            return;
        }
        state.interest = interest;
        state.tapEvent = tapEvent;
        setIsWanted(true);
    }, [
        isEnabled
    ]);
    const forget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((interest)=>{
        const state = interestRef.current;
        if (!state.isRead && state.interest === interest) {
            state.interest = null;
        }
    }, []);
    const onPointerEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        if (event.pointerType !== 'touch') {
            want('hover');
        }
    }, [
        want
    ]);
    const onPointerLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>forget('hover'), [
        forget
    ]);
    const onPointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        if (!isEnabled || interestRef.current.isRead) {
            tapRecognizer.forget();
            return;
        }
        const isTouch = tapRecognizer.press(event.nativeEvent, event.currentTarget, (tapEvent)=>want('tap', tapEvent));
        // A mouse press cancels a hover show, as a mounted tooltip does. A pen
        // press waits for its tap.
        if (!isTouch) {
            forget('hover');
        }
    }, [
        isEnabled,
        tapRecognizer,
        want,
        forget
    ]);
    const onFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        const target = event.target;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(target) && target.matches(':focus-visible') && // Chrome on Android focuses a tapped child before the tap's click.
        // Skip that focus, so the click still opens the tooltip.
        !tapRecognizer.isTouchPressCurrent()) {
            want('focus');
        }
    }, [
        want,
        tapRecognizer
    ]);
    const onBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>forget('focus'), [
        forget
    ]);
    return {
        isWanted,
        tooltip,
        interestRef,
        onPointerEnter,
        onPointerLeave,
        onPointerDown,
        onFocus,
        onBlur
    };
}
function TruncationTooltip({ anchorRef, content, placement, interest }) {
    // A first interaction before the module loads mounts the tooltip once it
    // has: the interaction is held until the tooltip reads it.
    const Tooltip = interest.tooltip;
    if (Tooltip == null) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$tooltipPresentInterest$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipPresentInterestContext"], {
        value: interest.interestRef,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(Tooltip, {
            anchorRef: anchorRef,
            content: content,
            placement: placement
        })
    });
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Text/text.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file text.stylex.ts
 * @input Uses StyleX, theme tokens
 * @output Exports StyleX styles for Text and Heading props
 * @position Styles module; consumed by Text.tsx, Heading.tsx
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Text/Text.doc.mjs
 */ __turbopack_context__.s([
    "capsizeStyles",
    ()=>capsizeStyles,
    "colorStyles",
    ()=>colorStyles,
    "decorationStyles",
    ()=>decorationStyles,
    "defaultWeightByTypeStyles",
    ()=>defaultWeightByTypeStyles,
    "displayStyles",
    ()=>displayStyles,
    "justifyStyles",
    ()=>justifyStyles,
    "sizeByLevelStyles",
    ()=>sizeByLevelStyles,
    "sizeByTypeStyles",
    ()=>sizeByTypeStyles,
    "sizeStyles",
    ()=>sizeStyles,
    "tabularNumbersStyle",
    ()=>tabularNumbersStyle,
    "textWrapStyles",
    ()=>textWrapStyles,
    "truncationStyles",
    ()=>truncationStyles,
    "truncationTooltipStyles",
    ()=>truncationTooltipStyles,
    "weightStyles",
    ()=>weightStyles,
    "wordBreakStyles",
    ()=>wordBreakStyles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
;
;
;
const colorStyles = {
    primary: {
        kMwMTN: "x1tgivj0",
        $$css: true
    },
    secondary: {
        kMwMTN: "xv1l7n4",
        $$css: true
    },
    disabled: {
        kMwMTN: "xnbbluu",
        $$css: true
    },
    placeholder: {
        kMwMTN: "xv1l7n4",
        $$css: true
    },
    accent: {
        kMwMTN: "xjse4m1",
        $$css: true
    },
    inherit: {
        kMwMTN: "x1heor9g",
        $$css: true
    }
};
const weightStyles = {
    normal: {
        k63SB2: "x1sodnla",
        $$css: true
    },
    medium: {
        k63SB2: "x1e4wzip",
        $$css: true
    },
    semibold: {
        k63SB2: "x2mo6ok",
        $$css: true
    },
    bold: {
        k63SB2: "x1lvx875",
        $$css: true
    }
};
const defaultWeightByTypeStyles = {
    body: {
        k63SB2: "xxovm9e",
        $$css: true
    },
    large: {
        k63SB2: "x149oux8",
        $$css: true
    },
    label: {
        k63SB2: "xmhvcl5",
        $$css: true
    },
    code: {
        k63SB2: "xx3eeay",
        $$css: true
    },
    supporting: {
        k63SB2: "xv8on6e",
        $$css: true
    },
    "display-1": {
        k63SB2: "x1txul5o",
        $$css: true
    },
    "display-2": {
        k63SB2: "x1y36c3f",
        $$css: true
    },
    "display-3": {
        k63SB2: "x1on40hk",
        $$css: true
    },
    inherit: {
        k63SB2: "x1pd3egz",
        $$css: true
    }
};
const sizeByTypeStyles = {
    body: {
        kGuDYH: "xjm74w1",
        kLWn49: "xw6l6zx",
        $$css: true
    },
    large: {
        kGuDYH: "x18juvz8",
        kLWn49: "xf74fhv",
        $$css: true
    },
    label: {
        kGuDYH: "xcr08ib",
        kLWn49: "x1kq96og",
        $$css: true
    },
    code: {
        kGuDYH: "xp03k98",
        kLWn49: "x17iicif",
        kMv6JI: "x9m5x89",
        $$css: true
    },
    supporting: {
        kGuDYH: "x141an7d",
        kLWn49: "x1ltkj2j",
        $$css: true
    },
    "display-1": {
        kGuDYH: "xsub3ws",
        kLWn49: "x112ttwr",
        $$css: true
    },
    "display-2": {
        kGuDYH: "x1yego12",
        kLWn49: "xh0iwvy",
        $$css: true
    },
    "display-3": {
        kGuDYH: "xlgnzhf",
        kLWn49: "x1ujwuaq",
        $$css: true
    },
    inherit: {
        kGuDYH: "x1qlqyl8",
        kLWn49: "x15bjb6t",
        $$css: true
    }
};
const sizeStyles = {
    "4xs": {
        kGuDYH: "xxc45ev",
        $$css: true
    },
    "3xs": {
        kGuDYH: "x10p7juq",
        $$css: true
    },
    "2xs": {
        kGuDYH: "x16a80zy",
        $$css: true
    },
    xsm: {
        kGuDYH: "x51wmvv",
        $$css: true
    },
    sm: {
        kGuDYH: "x1eqnyfr",
        $$css: true
    },
    base: {
        kGuDYH: "x1j29vfg",
        $$css: true
    },
    lg: {
        kGuDYH: "xc7cgfe",
        $$css: true
    },
    xl: {
        kGuDYH: "x1wqms48",
        $$css: true
    },
    "2xl": {
        kGuDYH: "xhs0kqb",
        $$css: true
    },
    "3xl": {
        kGuDYH: "x10srzze",
        $$css: true
    },
    "4xl": {
        kGuDYH: "xqcvi3d",
        $$css: true
    }
};
const sizeByLevelStyles = {
    "1": {
        kGuDYH: "xcg7oai",
        kLWn49: "xfmsba7",
        k63SB2: "x1v68xuy",
        $$css: true
    },
    "2": {
        kGuDYH: "x1xvnhcw",
        kLWn49: "x1cpk1wn",
        k63SB2: "x12yy4cs",
        $$css: true
    },
    "3": {
        kGuDYH: "xii13ha",
        kLWn49: "xwjzt0u",
        k63SB2: "x1jcxfy8",
        $$css: true
    },
    "4": {
        kGuDYH: "x8tkxat",
        kLWn49: "xqerer",
        k63SB2: "x2hcmsi",
        $$css: true
    },
    "5": {
        kGuDYH: "xsgqta0",
        kLWn49: "xo3gurs",
        k63SB2: "xno150v",
        $$css: true
    },
    "6": {
        kGuDYH: "xw5ohdf",
        kLWn49: "xeixjfn",
        k63SB2: "x1pw4frv",
        $$css: true
    }
};
// =============================================================================
// Display Styles
// =============================================================================
// Text that is not truncated. A token longer than its line (a URL, an ID)
// wraps instead of overflowing, so in ordinary flow text does not force
// horizontal scrolling at 320 CSS px (WCAG 2.2 1.4.10; Text and Heading FR3).
// `break-word` keeps min-content, so tables and auto-sized columns lay out
// ordinary words as before; a flex child still needs `min-width: 0` from its
// container. A container that wraps with `anywhere` (an empty state, a toast,
// a banner) sets the private `--_astryx-text-overflow-wrap` beside its own
// `overflow-wrap`, so Text inside it keeps `anywhere`.
const NON_TRUNCATED_OVERFLOW_WRAP = 'var(--_astryx-text-overflow-wrap, break-word)';
const displayStyles = {
    inline: {
        k1xSpc: "xt0psk2",
        kHjlTd: "xh015us",
        $$css: true
    },
    block: {
        k1xSpc: "x1lliihq",
        kHjlTd: "xh015us",
        $$css: true
    }
};
const truncationStyles = {
    singleLine: {
        kVQacm: "xb3r6kr",
        kg5iWk: "xlyipyv",
        khDVqt: "xuxw1ft",
        k1xSpc: "x1lliihq",
        $$css: true
    },
    multiLine: {
        kVQacm: "xb3r6kr",
        k1xSpc: "x104kibb",
        kgKLqz: "x1ua5tub",
        $$css: true
    }
};
const wordBreakStyles = {
    "break-word": {
        kTgw9: "x1lldw8n",
        kHjlTd: "x1mzt3pk",
        $$css: true
    },
    "break-all": {
        kTgw9: "x1yn0g08",
        $$css: true
    }
};
const textWrapStyles = {
    wrap: {
        kN2L0X: "xk4td0m",
        $$css: true
    },
    nowrap: {
        kN2L0X: "xebhuq6",
        $$css: true
    },
    balance: {
        kN2L0X: "x1w2vvpw",
        $$css: true
    },
    pretty: {
        kN2L0X: "x1fzhlzt",
        $$css: true
    }
};
const capsizeStyles = {
    enabled: {
        kxwWH2: "x1b2iylo",
        kzeHkT: "xwgcxoh",
        k1xSpc: "x1lliihq",
        $$css: true
    }
};
const decorationStyles = {
    strikethrough: {
        kybGjl: "xmqliwb",
        $$css: true
    }
};
const tabularNumbersStyle = {
    enabled: {
        kcqcaj: "xss6m8b",
        $$css: true
    }
};
const justifyStyles = {
    start: {
        k9WMMc: "x1yc453h",
        $$css: true
    },
    center: {
        k9WMMc: "x2b8uid",
        $$css: true
    },
    end: {
        k9WMMc: "xp4054r",
        $$css: true
    }
};
const truncationTooltipStyles = {
    content: {
        ks0D6T: "xw5ewwj",
        kTgw9: "x13faqbe",
        $$css: true
    }
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Text/textClampContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextClampContext",
    ()=>TextClampContext
]);
/**
 * @file textClampContext.ts
 * @input Uses createLayerScopedContext
 * @output TextClampContext: true inside a Text that clamps its lines
 * @position Internal; Text provides it and Link reads it
 *
 * A layer boundary resets it to false, because content in a layer is not
 * inside the clamped text box.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
const TextClampContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('TextClampContext', 1, false);
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Text/useTruncation.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTruncation",
    ()=>useTruncation
]);
/**
 * @file useTruncation.ts
 * @input Uses React hooks, sharedResizeObserver, sharedMutationObserver
 * @output Exports useTruncation hook for detecting text overflow
 * @position Hook; consumed by Text.tsx, Heading.tsx and Lightbox.tsx
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Text/Text.doc.mjs
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedResizeObserver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedResizeObserver.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedMutationObserver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedMutationObserver.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
function useTruncation(options) {
    const { maxLines, isExpanded = false } = options;
    const [isTruncated, setIsTruncated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [fullText, setFullText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const elementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const unobserveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const unobserveContentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // The last measured answer, which the text keeps while it is expanded.
    const answerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        isTruncated: false,
        fullText: ''
    });
    // The text an expanded element kept its answer for when it went.
    const keptForRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const checkTruncation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((element)=>{
        if (maxLines === 0) {
            setIsTruncated(false);
            return;
        }
        // Capture full text content
        answerRef.current.fullText = element.textContent ?? '';
        setFullText(answerRef.current.fullText);
        // Check for overflow
        if (maxLines === 1) {
            // Single-line: check horizontal overflow
            answerRef.current.isTruncated = element.scrollWidth > element.offsetWidth;
            setIsTruncated(answerRef.current.isTruncated);
        } else {
            // Multi-line: use Range to measure actual content height.
            // When -webkit-line-clamp is active, browsers may report
            // scrollHeight === offsetHeight (the clamped size), so the
            // naive scrollHeight check fails. Range.getBoundingClientRect()
            // measures the real text content regardless of clamping.
            let contentHeight = element.scrollHeight;
            try {
                const range = document.createRange();
                range.selectNodeContents(element);
                contentHeight = range.getBoundingClientRect().height;
                range.detach();
            } catch  {
            // Fallback to scrollHeight (e.g. jsdom in tests)
            }
            answerRef.current.isTruncated = contentHeight > element.offsetHeight;
            setIsTruncated(answerRef.current.isTruncated);
        }
    }, [
        maxLines
    ]);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((element)=>{
        // Cleanup previous observation. Unsubscribing by callback rather than
        // by element leaves any other observer of the same node untouched.
        unobserveRef.current?.();
        unobserveRef.current = null;
        unobserveContentRef.current?.();
        unobserveContentRef.current = null;
        const previous = elementRef.current;
        elementRef.current = element;
        // Shown in full, the text keeps the answer it had when clamped.
        if (isExpanded) {
            if (element != null) {
                setIsTruncated(answerRef.current.isTruncated);
                setFullText(answerRef.current.fullText);
            } else {
                keptForRef.current = previous;
            }
            return;
        }
        // A kept answer is about the text it measured. Other text starts from
        // none, as it does after its old element goes.
        const keptFor = keptForRef.current;
        keptForRef.current = null;
        if (keptFor != null && element !== keptFor) {
            answerRef.current = {
                isTruncated: false,
                fullText: ''
            };
            setIsTruncated(false);
            setFullText('');
        }
        if (element && maxLines > 0) {
            // Observe via the shared singleton, if available. The observer's
            // first notification measures a new element. The browser sends it
            // after its own layout, so mounting text forces no layout pass. The
            // truncated state only decides whether to compose the tooltip, so
            // nothing paints differently.
            const unobserve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedResizeObserver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["observeResizeAfterLayout"])(element, ()=>{
                checkTruncation(element);
            });
            if (unobserve == null) {
                checkTruncation(element);
            }
            unobserveRef.current = unobserve;
            // New text in a box that keeps its size fires no resize, so the
            // captured text and truncated state would otherwise stay stale.
            unobserveContentRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedMutationObserver$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["observeContent"])(element, ()=>{
                checkTruncation(element);
            });
        } else {
            setIsTruncated(false);
            setFullText('');
        }
    }, [
        maxLines,
        isExpanded,
        checkTruncation
    ]);
    return {
        ref,
        isTruncated,
        fullText
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/Tooltip.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tooltip",
    ()=>Tooltip
]);
/**
 * @file Tooltip.tsx
 * @input Uses React, useTooltip hook
 * @output Exports Tooltip component for hover/focus triggered tooltips
 * @position Layer component; uses display:contents wrapper to avoid cloneElement
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Tooltip/index.ts
 * - /apps/storybook/stories/Tooltip.stories.tsx
 * - /packages/cli/assets/templates/blocks/components/Tooltip/ (showcase blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsomorphicLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/focusOutline.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/useTooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
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
const styles = {
    wrapperInline: {
        k1xSpc: "xt0psk2",
        $$css: true
    },
    hoverIndication: {
        kMnn75: "xujl8zx",
        kmVMDM: "xev0dqp",
        k1TLXF: "xycaml9",
        kcSHmL: "xrys4gj",
        $$css: true
    }
};
/**
 * Check if children are text-only (no React elements)
 */ function isTextOnly(children) {
    return typeof children === 'string' || typeof children === 'number';
}
/**
 * Utility to merge ARIA ID strings
 */ function mergeIds(...ids) {
    const filtered = ids.filter(Boolean);
    return filtered.length > 0 ? filtered.join(' ') : undefined;
}
function Tooltip({ children, anchorRef, content, placement = 'above', alignment = 'center', delay = 200, hideDelay = 0, focusTrigger = 'auto', touchTrigger = 'auto', isEnabled = true, onOpenChange, hasHoverIndication = 'auto', isOpen, isDefaultOpen }) {
    const wrapperRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textOnly = children != null ? isTextOnly(children) : false;
    // Determine if hover indication should be shown
    const showHoverIndication = hasHoverIndication === true || hasHoverIndication === 'auto' && textOnly;
    const handleShow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        onOpenChange?.(true);
    }, [
        onOpenChange
    ]);
    const handleHide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        onOpenChange?.(false);
    }, [
        onOpenChange
    ]);
    // Use the hook for all tooltip behavior
    const tooltip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTooltip"])({
        placement,
        alignment,
        delay,
        hideDelay,
        focusTrigger,
        touchTrigger,
        isEnabled,
        isOpen,
        isDefaultOpen,
        onShow: handleShow,
        onHide: handleHide
    });
    // Sibling mode: attach to external anchorRef
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        if (!anchorRef) {
            return;
        }
        const attach = (el)=>{
            // Use combined ref for position + interaction
            tooltip.ref(el);
            // Set aria-describedby, merging with existing
            const existingDescribedBy = el.getAttribute('aria-describedby');
            el.setAttribute('aria-describedby', mergeIds(existingDescribedBy, tooltip.describedBy) ?? '');
            return ()=>{
                tooltip.ref(null);
                if (existingDescribedBy) {
                    el.setAttribute('aria-describedby', existingDescribedBy);
                } else {
                    el.removeAttribute('aria-describedby');
                }
            };
        };
        const el = anchorRef.current;
        if (el) {
            return attach(el);
        }
        // React attaches an ancestor's ref after its descendants' layout effects,
        // so a tooltip rendered inside its own anchor (SideNavItem's collapsed
        // rail tooltip) still sees null here on mount, and this effect's deps
        // never change to re-run it. Re-check once the commit has attached all
        // refs; if the anchor is still gone, this tooltip has no anchor, as before.
        let detach;
        let cancelled = false;
        queueMicrotask(()=>{
            if (cancelled) {
                return;
            }
            const el = anchorRef.current;
            if (el) {
                detach = attach(el);
            }
        });
        return ()=>{
            cancelled = true;
            detach?.();
        };
    }, [
        anchorRef,
        tooltip.ref,
        tooltip.describedBy
    ]);
    // For element children with display:contents, attach ref to first child
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        if (anchorRef) {
            return;
        } // Skip if using anchorRef mode
        if (textOnly) {
            return;
        } // Skip for text-only (ref is on wrapper)
        const wrapper = wrapperRef.current;
        if (!wrapper) {
            return;
        }
        const firstChild = wrapper.firstElementChild;
        if (!firstChild) {
            return;
        }
        // Use combined ref for position + interaction
        tooltip.ref(firstChild);
        // Set aria-describedby, merging with existing
        const existingDescribedBy = firstChild.getAttribute('aria-describedby');
        firstChild.setAttribute('aria-describedby', mergeIds(existingDescribedBy, tooltip.describedBy) ?? '');
        return ()=>{
            tooltip.ref(null);
            if (existingDescribedBy) {
                firstChild.setAttribute('aria-describedby', existingDescribedBy);
            } else {
                firstChild.removeAttribute('aria-describedby');
            }
        };
    }, [
        anchorRef,
        textOnly,
        tooltip.ref,
        tooltip.describedBy
    ]);
    // Sibling mode: render only the tooltip (no wrapper needed)
    if (anchorRef && children == null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: tooltip.renderTooltip(content)
        });
    }
    // For text-only children: use inline span with ref on wrapper
    if (textOnly) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    ref: tooltip.ref,
                    tabIndex: 0,
                    "aria-describedby": tooltip.describedBy,
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusOutlineProps"].focusVisible(styles.wrapperInline, showHoverIndication && styles.hoverIndication),
                    children: children
                }),
                tooltip.renderTooltip(content)
            ]
        });
    }
    // For element children: use display:contents, ref on first child
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                ref: wrapperRef,
                ...{
                    className: "xjp7ctv"
                },
                children: children
            }),
            tooltip.renderTooltip(content)
        ]
    });
}
Tooltip.displayName = 'Tooltip';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/tooltipPresentInterest.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TooltipPresentInterestContext",
    ()=>TooltipPresentInterestContext
]);
/**
 * @file tooltipPresentInterest.ts
 * @input createSharedContext
 * @output Exports `TooltipPresentInterestContext` and its value types: the
 *   interaction on a tooltip's anchor that mounted the tooltip
 * @position Internal to Core, not exported from the Tooltip entry. A
 *   truncated Text or Heading mounts its tooltip on the first hover, tap or
 *   focus, and provides that interaction here, so the tooltip answers it when
 *   its trigger attaches, as its own listeners would have.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
const TooltipPresentInterestContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSharedContext"])('TooltipPresentInterestContext', 1, null);
TooltipPresentInterestContext.displayName = 'TooltipPresentInterestContext';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/useTooltip.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTooltip",
    ()=>useTooltip
]);
/**
 * @file useTooltip.tsx
 * @input Uses useLayer, useTouchTriggerInternal, React hooks
 * @output Exports useTooltip hook with stable trigger refs for hover/focus/tap tooltips
 *   and imperative show() and hide() for an app-built toggle trigger
 * @position Layer hook; builds on useLayer for tooltip behavior
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Tooltip/index.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useCommittedRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useCommittedRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsomorphicLayoutEffect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$tooltipPresentInterest$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/tooltipPresentInterest.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$triggerFocus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/triggerFocus.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useLayer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/useLayer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useTouchTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/useTouchTrigger.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounceRenderedText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useAnnounceRenderedText.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMergedRefs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerAnimations$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerAnimations.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerSurfacePress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerSurfacePress.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$outsidePress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/outsidePress.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useLayerDismissal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/useLayerDismissal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
/**
 * Grace period (ms) before hiding on pointer-leave when no explicit `hideDelay`
 * is set, so the pointer can travel across the small gap from the trigger onto
 * the tooltip surface without the tooltip disappearing (WCAG 1.4.13 hoverable).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
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
const HOVER_BRIDGE_DELAY = 100;
const styles = {
    container: {
        kWkggS: "x19aspcf",
        kMwMTN: "xrkvqaz",
        kaIpWk: "x1hviunn",
        kMv6JI: "x9ynric",
        kGuDYH: "xjm74w1",
        kLWn49: "xw6l6zx",
        $$css: true
    }
};
function useTooltip(options = {}) {
    const { placement = 'above', alignment = 'center', delay = 200, hideDelay = 0, focusTrigger = 'auto', touchTrigger = 'auto', isEnabled = true, isOpen, isDefaultOpen = false, onShow, onHide } = options;
    // A tooltip stays open while its trigger is hovered, so it must never settle
    // over the trigger: content taller than the room above and below opens
    // beside it, or on the roomier side sized to that room, and scrolls what does not
    // fit inside the surface, which stays hoverable (spec:AST-059 FR4).
    const layer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useLayer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayerInternal"])({
        mode: 'context',
        onShow,
        onHide,
        keepsAnchorClear: true
    });
    const { ref: layerRef, anchorId: layerAnchorId, show: showLayer, hide: hideLayer, isOpen: isLayerOpen, id: layerId, render: renderLayer } = layer;
    const popoverXstyle = styles.container;
    const showTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hideTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const triggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Set only by a Core component that mounts the tooltip on interaction.
    const presentInterest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$tooltipPresentInterest$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TooltipPresentInterestContext"]);
    // Counts the renders in which the tooltip is disabled. A pending show
    // records it, so a show scheduled before a disable is dropped even when
    // the tooltip is enabled again before the timer fires.
    const disabledRendersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    if (!isEnabled) {
        disabledRendersRef.current += 1;
    }
    // Clear all timeouts
    const clearTimeouts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (showTimeoutRef.current) {
            clearTimeout(showTimeoutRef.current);
            showTimeoutRef.current = null;
        }
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
    }, []);
    // Touch resolves immediately: the hover delays exist to filter out a pointer
    // passing across the trigger, and a tap is never that.
    const showNow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        clearTimeouts();
        showLayer();
    }, [
        clearTimeouts,
        showLayer
    ]);
    const hideNow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        clearTimeouts();
        hideLayer();
    }, [
        clearTimeouts,
        hideLayer
    ]);
    const latestRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useCommittedRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCommittedRef"])({
        isOpen,
        isLayerOpen,
        onShow,
        onHide
    });
    // The app's show() holds the tooltip open until hide(), Escape, a press or
    // scroll outside, or focus leaving the trigger and the tooltip.
    const isHeldRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [isHeldState, setIsHeldState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const setHeld = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((next)=>{
        isHeldRef.current = next;
        setIsHeldState(next);
    }, []);
    // Whether the current hold began during a press on the trigger. Such a
    // hold ends with the press when the press ends off the trigger, as no click
    // pins it. The hover rules then decide. isHoldInThisTaskRef covers a show()
    // that runs before the hook's own pointerdown listener.
    const isHoldFromPressRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isHoldInThisTaskRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const handleReleaseInLayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (isHoldFromPressRef.current && isHeldRef.current) {
            isHoldFromPressRef.current = false;
            setHeld(false);
        }
    }, [
        setHeld
    ]);
    // The touch trigger's outside dismissal (a press or scroll outside) ends a
    // hold with the tooltip.
    const hideFromTouch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (isHeldRef.current) {
            setHeld(false);
            const latest = latestRef.current;
            if (latest.isOpen !== undefined) {
                latest.onHide?.();
                return;
            }
        }
        hideNow();
    }, [
        setHeld,
        hideNow,
        latestRef
    ]);
    const { isTouchPointerRef, isTouchInteraction, handlePointerEnter, handlePointerDown: handleTouchPointerDown, clearTapOpen, armOutsideDismiss, answerTap } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useTouchTrigger$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTouchTriggerInternal"])({
        touchTrigger,
        isEnabled,
        isControlled: isOpen !== undefined,
        isOpen: isLayerOpen,
        layerId,
        triggerRef,
        show: showNow,
        hide: hideFromTouch
    }, handleReleaseInLayer, true);
    const isHeldOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const latest = latestRef.current;
        return isHeldRef.current && latest.isLayerOpen && latest.isOpen !== false;
    }, [
        latestRef
    ]);
    const releaseHold = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        clearTapOpen();
        setHeld(false);
        const latest = latestRef.current;
        if (latest.isOpen !== undefined) {
            latest.onHide?.();
            return;
        }
        hideNow();
    }, [
        clearTapOpen,
        setHeld,
        hideNow,
        latestRef
    ]);
    const dropHold = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (isHeldRef.current) {
            setHeld(false);
        }
    }, [
        setHeld
    ]);
    // Focus leaving the trigger and the tooltip ends a hold, whatever
    // `focusTrigger` is. Focus that leaves for no element is a press's to
    // decide. The trigger can sit in another document, so the check uses its
    // own window.
    const handleHeldFocusOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        if (!isHeldOpen()) {
            return;
        }
        const next = event.relatedTarget;
        const trigger = triggerRef.current;
        const view = trigger?.ownerDocument.defaultView;
        if (view == null || !(next instanceof view.Node)) {
            return;
        }
        const surface = trigger?.ownerDocument.getElementById(layerId) ?? null;
        if (trigger?.contains(next) === true || surface?.contains(next) === true) {
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$outsidePress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["noteOutsideDismissal"])(view.document);
        releaseHold();
    }, [
        isHeldOpen,
        layerId,
        releaseHold
    ]);
    const isHoldShown = isHeldState && isLayerOpen && isOpen !== false;
    // Only a hold announces the text: a preview is already the trigger's
    // description.
    const contentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounceRenderedText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAnnounceRenderedText"])(contentRef, isHoldShown, 'pinned');
    const contentRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMergedRefs"])(contentRef, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerSurfacePress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["registerLayerSurface"]);
    // Schedule show with delay (suppressed when isOpen is false)
    const scheduleShow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!isEnabled || isOpen === false) {
            return;
        }
        clearTimeouts();
        const disabledRenders = disabledRendersRef.current;
        showTimeoutRef.current = setTimeout(()=>{
            // A show runs only if the tooltip stayed enabled since it was
            // scheduled: nothing would close a tooltip that opens after a disable.
            if (disabledRendersRef.current === disabledRenders) {
                showLayer();
            }
        }, delay);
    }, [
        isEnabled,
        isOpen,
        clearTimeouts,
        showLayer,
        delay
    ]);
    // Schedule hide with delay (suppressed when isOpen is true).
    // A small hover bridge (when hideDelay is 0) lets the pointer travel from the
    // trigger onto the tooltip surface without the tooltip vanishing — required
    // for WCAG 1.4.13 (Content on Hover or Focus: hoverable).
    const scheduleHide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (isOpen === true || isHeldOpen()) {
            return;
        }
        clearTimeouts();
        const effectiveHideDelay = hideDelay > 0 ? hideDelay : HOVER_BRIDGE_DELAY;
        hideTimeoutRef.current = setTimeout(()=>{
            hideLayer();
        }, effectiveHideDelay);
    }, [
        isOpen,
        isHeldOpen,
        clearTimeouts,
        hideLayer,
        hideDelay
    ]);
    // Cancel a pending hide (e.g. the pointer entered the tooltip surface).
    const cancelHide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
    }, []);
    // Event handlers
    const handleMouseEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        // A tap synthesizes mouseenter. On touch the tap path owns the decision,
        // so hover must not also fire — including the tap that just opened the
        // tooltip, which would otherwise be double-handled.
        if (isTouchPointerRef.current) {
            return;
        }
        scheduleShow();
    }, [
        isTouchPointerRef,
        scheduleShow
    ]);
    const handleMouseLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        // On touch the synthesized mouseleave arrives with the next tap elsewhere,
        // which the outside-tap dismissal already handles — and handling it here
        // too would close the tooltip behind the tap-open bookkeeping's back.
        if (isTouchPointerRef.current) {
            return;
        }
        // Leaving straight onto the tooltip: the surface's onMouseEnter already
        // ran, because React dispatches it from the mouseout that precedes this
        // mouseleave, so a hide scheduled now would never be cancelled. The
        // surface's own mouse leave schedules the hide instead.
        const next = event.relatedTarget;
        const surface = next == null ? null : next.ownerDocument?.getElementById(layerId);
        if (surface != null && surface.contains(next)) {
            return;
        }
        scheduleHide();
    }, [
        isTouchPointerRef,
        layerId,
        scheduleHide
    ]);
    // Under `auto`, whether focus counts is decided when it arrives, and a
    // focus that counted still hides on blur (utils/triggerFocus.ts).
    const [focusGate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$triggerFocus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTriggerFocusGate"]);
    // Whether focus on `target` opens the tooltip. With a `trigger`, its
    // `focusTrigger` rule applies too. Only `:focus-visible` focus opens it, and
    // a tap never does: a tapped `<input>` also matches `:focus-visible`.
    const opensOnFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((target, trigger)=>{
        if (trigger != null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$triggerFocus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFocusOnTrigger"])(target, trigger, focusTrigger)) {
            return false;
        }
        return !isTouchInteraction() && target.matches(':focus-visible');
    }, [
        focusTrigger,
        isTouchInteraction
    ]);
    const handleFocusIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (!focusGate.focusIn(e, focusTrigger) || !isEnabled) {
            return;
        }
        if (!opensOnFocus(e.target, null)) {
            return;
        }
        clearTimeouts();
        // Held closed, the focus reports through onShow and shows nothing. The
        // caller decides.
        const latest = latestRef.current;
        if (latest.isOpen === false) {
            latest.onShow?.();
            return;
        }
        showLayer();
    }, [
        focusGate,
        focusTrigger,
        isEnabled,
        opensOnFocus,
        clearTimeouts,
        showLayer,
        latestRef
    ]);
    // A held tooltip's focus-leave close is the hold's own: it listens on the
    // trigger whatever `focusTrigger` is. This schedules the unheld hide, which
    // a held tooltip skips.
    const handleFocusOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (!focusGate.focusOut(e, focusTrigger)) {
            return;
        }
        scheduleHide();
    }, [
        focusGate,
        focusTrigger,
        scheduleHide
    ]);
    // Pressing the trigger hides its own tooltip: once the control is activated
    // the hint has served its purpose, and a tooltip lingering over a
    // just-pressed control reads as stale. Fires on pointerdown so it feels
    // immediate. Uncontrolled tooltips only — a controlled tooltip's visibility
    // is owned by the consumer. `hideLayer()` self-guards when already closed.
    // A touch press is a different gesture (it may be the only way to open the
    // tooltip at all), so the touch path answers it first.
    // Whether a press on the trigger is down, from the hook's pointerdown to
    // the press's end.
    const isTriggerPressedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const stopPressTrackingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const trackTriggerPress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        stopPressTrackingRef.current?.();
        const view = triggerRef.current?.ownerDocument.defaultView;
        if (view == null) {
            return;
        }
        isTriggerPressedRef.current = true;
        const trigger = triggerRef.current;
        const stop = (event)=>{
            // A press that ends on the trigger keeps its hold, as a click does.
            if (event?.type === 'pointerup' && event.target instanceof view.Node && trigger?.contains(event.target) === true) {
                isHoldFromPressRef.current = false;
            }
            view.removeEventListener('pointerup', stop, true);
            view.removeEventListener('pointercancel', stop, true);
            isTriggerPressedRef.current = false;
            stopPressTrackingRef.current = null;
        };
        view.addEventListener('pointerup', stop, true);
        view.addEventListener('pointercancel', stop, true);
        stopPressTrackingRef.current = stop;
    }, []);
    const handlePointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        trackTriggerPress();
        // The app's hide() closes a held tooltip. A press neither hides it here
        // nor waits for a tap verdict. A show() in a capture handler of this
        // press runs before this listener. Tie that hold to the press.
        if (isHeldRef.current) {
            if (isHoldInThisTaskRef.current) {
                isHoldFromPressRef.current = true;
            }
            return;
        }
        if (handleTouchPointerDown(event)) {
            // A pen in range starts the hover show before it lands. Left pending,
            // that show opens the layer during the press. The tap then closes it.
            if (showTimeoutRef.current) {
                clearTimeout(showTimeoutRef.current);
                showTimeoutRef.current = null;
            }
            return;
        }
        if (isOpen !== undefined) {
            return;
        }
        clearTimeouts();
        hideLayer();
    }, [
        handleTouchPointerDown,
        trackTriggerPress,
        isOpen,
        clearTimeouts,
        hideLayer
    ]);
    // The trigger's listeners call the committed handlers through this ref, so
    // the trigger ref callback keeps one identity.
    const handlersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useCommittedRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCommittedRef"])({
        handleMouseEnter,
        handleMouseLeave,
        handleFocusIn,
        handleFocusOut,
        handleHeldFocusOut,
        handlePointerEnter,
        handlePointerDown,
        focusTrigger,
        isEnabled,
        isOpen,
        dropHold,
        hideNow,
        showNow,
        opensOnFocus,
        presentInterest,
        answerTap
    });
    // Removes the attached trigger's listeners (the trigger ref callback's
    // cleanup).
    const detachTriggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Set when the trigger detached while the tooltip was disabled: the
    // caller removed the wiring (DropdownMenu's Button while its menu is
    // open), so the next enabled attach reads the focus that arrived meanwhile.
    const wasSuppressedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Set by a detach until it settles on the committed flags.
    const isDetachPendingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // A caller removes the wiring as it disables the tooltip. Close an
    // uncontrolled tooltip then, or the next attach shows a stale tooltip. A
    // detach while enabled, such as a merged ref that changes identity on a
    // re-render, keeps a hovered or held tooltip open.
    const settleDetach = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!isDetachPendingRef.current) {
            return;
        }
        isDetachPendingRef.current = false;
        const latest = handlersRef.current;
        if (!latest.isEnabled && latest.isOpen === undefined) {
            wasSuppressedRef.current = true;
            latest.dropHold();
            latest.hideNow();
        }
    }, [
        handlersRef
    ]);
    // Synchronizes the tooltip's popover with a trigger that detached in this
    // commit. It runs after the insertion Effects write the flags. A detach in a
    // commit that does not render this hook settles in its microtask.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])(()=>{
        settleDetach();
    });
    // The trigger's ref callback owns every trigger listener, and reads the
    // trigger's state when it attaches and detaches.
    const interactionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((el)=>{
        // A caller that reports `null` by hand detaches the trigger, as the
        // returned cleanup does.
        if (el == null) {
            detachTriggerRef.current?.();
            return;
        }
        if (el === triggerRef.current) {
            return;
        }
        detachTriggerRef.current?.();
        const latest = ()=>handlersRef.current;
        // `pointerenter` runs before the synthesized `mouseenter` a tap produces,
        // which is what lets the hover path know it is looking at a finger.
        const onPointerEnter = (e)=>latest().handlePointerEnter(e);
        const onMouseEnter = ()=>latest().handleMouseEnter();
        const onMouseLeave = (e)=>latest().handleMouseLeave(e);
        // Press-to-dismiss on a mouse; tap-to-open on a touch pointer.
        const onPointerDown = (e)=>latest().handlePointerDown(e);
        // Focus counts unless focus never opens the tooltip; `auto` decides per
        // event (isFocusForTrigger).
        const onFocusIn = (e)=>{
            if (latest().focusTrigger !== 'never') {
                latest().handleFocusIn(e);
            }
        };
        const onFocusOut = (e)=>{
            if (latest().focusTrigger !== 'never') {
                latest().handleFocusOut(e);
            }
        };
        // A held tooltip's own focus-leave close, whatever `focusTrigger` is.
        const onHeldFocusOut = (e)=>latest().handleHeldFocusOut(e);
        el.addEventListener('pointerenter', onPointerEnter);
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
        el.addEventListener('pointerdown', onPointerDown);
        el.addEventListener('focusin', onFocusIn);
        el.addEventListener('focusout', onFocusOut);
        el.addEventListener('focusout', onHeldFocusOut);
        triggerRef.current = el;
        // A trigger that attaches again after its wiring was removed
        // (DropdownMenu's Button as its menu closes) missed the focus that
        // arrived meanwhile. Show for it only if it would open the tooltip.
        // Returned keyboard focus does; focus returned after a pointer pick does
        // not. Any other attach leaves the tooltip as it is, so a tooltip
        // dismissed with Escape stays closed.
        const focused = el.ownerDocument.activeElement;
        const wasSuppressed = wasSuppressedRef.current;
        if (latest().isEnabled) {
            wasSuppressedRef.current = false;
        }
        if (wasSuppressed && latest().isEnabled && latest().isOpen === undefined && latest().focusTrigger !== 'never' && focused instanceof HTMLElement && el.contains(focused) && latest().opensOnFocus(focused, el)) {
            latest().showNow();
        }
        // This tooltip mounted after the interaction that wants it. It answers
        // that interaction once, by the same rules as its listeners.
        const state = latest().presentInterest?.current;
        const interest = state == null || state.isRead ? null : state.interest;
        const tapEvent = state?.tapEvent ?? null;
        if (state != null) {
            state.isRead = true;
        }
        if (latest().isEnabled && latest().isOpen === undefined) {
            if (interest === 'hover') {
                latest().handleMouseEnter();
            } else if (interest === 'tap') {
                latest().answerTap(tapEvent);
            } else if (interest === 'focus' && latest().focusTrigger !== 'never' && focused instanceof HTMLElement && el.contains(focused) && latest().opensOnFocus(focused, el)) {
                latest().showNow();
            }
        }
        const detach = ()=>{
            if (detachTriggerRef.current === detach) {
                detachTriggerRef.current = null;
            }
            el.removeEventListener('pointerenter', onPointerEnter);
            el.removeEventListener('mouseenter', onMouseEnter);
            el.removeEventListener('mouseleave', onMouseLeave);
            el.removeEventListener('pointerdown', onPointerDown);
            el.removeEventListener('focusin', onFocusIn);
            el.removeEventListener('focusout', onFocusOut);
            el.removeEventListener('focusout', onHeldFocusOut);
            stopPressTrackingRef.current?.();
            if (triggerRef.current === el) {
                triggerRef.current = null;
            }
            // This cleanup runs before the commit's insertion Effects write the
            // flags, so the detach settles once they are written.
            isDetachPendingRef.current = true;
            queueMicrotask(settleDetach);
        };
        detachTriggerRef.current = detach;
        return detach;
    }, [
        handlersRef,
        settleDetach
    ]);
    // Combined ref - shorthand for calling both positionRef and interactionRef
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((el)=>{
        layerRef(el);
        const detachInteraction = interactionRef(el);
        if (el == null) {
            return;
        }
        return ()=>{
            detachInteraction?.();
            layerRef(null);
        };
    }, [
        layerRef,
        interactionRef
    ]);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            clearTimeouts();
        };
    }, [
        clearTimeouts
    ]);
    // Show on mount when isDefaultOpen is true
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isDefaultOpen) {
            showLayer();
        }
    // eslint-disable-next-line @eslint-react/exhaustive-deps -- mount-only: isDefaultOpen is not reactive
    }, []);
    // Controlled open state — overrides hover/focus triggers
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen === undefined) {
            return;
        }
        if (isOpen) {
            clearTimeouts();
            showLayer();
        } else {
            clearTimeouts();
            // A hold ends when the consumer closes the tooltip.
            dropHold();
            hideLayer();
        }
    }, [
        isOpen,
        clearTimeouts,
        showLayer,
        hideLayer,
        dropHold
    ]);
    // Dismiss on Escape (WCAG 1.4.13 — dismissible) through the shared layer
    // stack. A visible tip is the top-most layer, so it takes the press and
    // consumes it: Escape hides the tip and leaves the dialog underneath open.
    // The user presses Escape again to close that. Consuming (rather than also
    // dismissing what is beneath) keeps one rule with no per-component
    // exceptions, and the failure mode is one extra keystroke instead of a
    // dialog closing under someone who only wanted the tip gone.
    //
    // A controlled tooltip stays on the stack and takes the press like any other
    // layer, but answers it by reporting instead of hiding: `isOpen` is the
    // consumer's value, so only their update may change it. Same contract as a
    // controlled Dialog.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useLayerDismissal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayerDismissal"])({
        // Registered for the hook's lifetime rather than gated on `isLayerOpen`:
        // that state can lag a frame behind the DOM, so a press arriving right after
        // the layer appears would find nothing registered. Because this layer
        // CONSUMES the press, a stale registration would be worse than a missed one
        // — it would silently eat Escapes meant for the dialog underneath — so
        // presence is answered from the DOM at press time instead of from state.
        isActive: true,
        isPresent: ()=>{
            const el = typeof document === 'undefined' ? null : document.getElementById(layerId);
            if (el == null) {
                return false;
            }
            try {
                return el.matches(':popover-open');
            } catch  {
                // Browsers without the Popover API (and some test environments) cannot
                // answer the selector; fall back to the hook's own state.
                return isLayerOpen;
            }
        },
        onDismiss: ()=>{
            clearTimeouts();
            clearTapOpen();
            dropHold();
            if (isOpen !== undefined) {
                onHide?.();
                return;
            }
            hideLayer();
        }
    });
    // Render function that wraps layer.render with tooltip styling
    const renderTooltip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((children, props)=>{
        const renderPlacement = props?.placement ?? placement;
        const renderProps = {
            placement: renderPlacement,
            alignment: props?.alignment ?? alignment,
            offset: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["spacingVars"]['--spacing-1'],
            role: 'tooltip',
            xstyle: [
                popoverXstyle,
                __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerAnimations$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layerAnimations"][renderPlacement]
            ],
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["themeProps"])('tooltip').className,
            // Keep the tooltip open while the pointer is over the surface itself
            // (WCAG 1.4.13 hoverable). These sit on the layer container — the
            // element the user actually hovers — not the inner content div, since
            // mouseenter/leave do not bubble.
            onMouseEnter: cancelHide,
            onMouseLeave: scheduleHide
        };
        return renderLayer(/*#__PURE__*/ // FR11: React bubbles a press on the surface to the trigger's
        // ancestors, portaled or not. A registered surface counts as
        // something else in the shared interactive-ancestor walk, so a
        // clickable container around the trigger leaves the press alone while
        // document listeners still see it.
        // The hold's announcement reads this element's text.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
            ref: contentRefs,
            ...{
                className: "xfsso4q xy143xn x12gdq22 x1djylfy xw5ewwj x13faqbe"
            },
            children: children
        }), renderProps);
    }, [
        renderLayer,
        placement,
        alignment,
        popoverXstyle,
        cancelHide,
        scheduleHide,
        contentRefs
    ]);
    const show = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        clearTimeouts();
        if (!isEnabled) {
            return;
        }
        setHeld(true);
        armOutsideDismiss();
        isHoldFromPressRef.current = isTriggerPressedRef.current;
        isHoldInThisTaskRef.current = true;
        triggerRef.current?.ownerDocument.defaultView?.setTimeout(()=>{
            isHoldInThisTaskRef.current = false;
        }, 0);
        const latest = latestRef.current;
        if (latest.isOpen !== undefined) {
            latest.onShow?.();
            return;
        }
        showLayer();
    }, [
        clearTimeouts,
        isEnabled,
        setHeld,
        armOutsideDismiss,
        showLayer,
        latestRef
    ]);
    const hide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        clearTimeouts();
        releaseHold();
    }, [
        clearTimeouts,
        releaseHold
    ]);
    return {
        ref,
        positionRef: layerRef,
        interactionRef,
        anchorId: layerAnchorId,
        describedBy: layerId,
        renderTooltip,
        show,
        hide
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/VisuallyHidden/VisuallyHidden.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VisuallyHidden",
    ()=>VisuallyHidden
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file VisuallyHidden.tsx
 * @input Uses React createElement/ElementType, stylex
 * @output Exports VisuallyHidden component and VisuallyHiddenProps
 * @position Accessibility primitive; renders content in the a11y tree while
 *   hiding it visually (icon-only labels, aria-live regions, SR-only context)
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/VisuallyHidden/VisuallyHidden.doc.mjs
 * - /packages/core/src/VisuallyHidden/VisuallyHidden.test.tsx
 * - /apps/storybook/stories/VisuallyHidden.stories.tsx
 * - /packages/cli/assets/templates/blocks/components/VisuallyHidden/ (showcase blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
function VisuallyHidden({ children, as: element = 'span', ref, ...rest }) {
    // `className` and `style` are off the interface, and the ignored `xstyle`
    // is off by intent. Take all three back off at runtime so a cast cannot reach
    // the element either: `xstyle` is not a valid attribute, so spreading it writes
    // xstyle="[object Object]" into the DOM, and a cast `style` keeps the last word
    // on `position` and un-hides the node.
    const { xstyle: _xstyle, className: _className, style: _style, ...props } = rest;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(element, {
        ref: ref,
        // Spread consumer props (aria-*, role, id, data-*, handlers) first, then
        // the fixed clip styles, so the visually-hidden class can never be
        // displaced. There is no consumer className/style to merge — by design.
        ...props,
        ...{
            className: "x10l6tqk x1i1rx1s xjm9jq1 xkdpibf x1717udv xb3r6kr xzpqnlu xuxw1ft xng3xce x13vifvy x1o0tod x47corl x87ps6o"
        }
    }, children);
}
VisuallyHidden.displayName = 'VisuallyHidden';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/InternationalizationContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InternationalizationContext",
    ()=>InternationalizationContext
]);
/**
 * @file InternationalizationContext.ts
 * @input createSharedContext, i18n types
 * @output Exports InternationalizationContext and InternationalizationContextValue
 * @position Context definition for client-side locale + messages
 *
 * Separated from InternationalizationProvider.tsx so components can consume
 * the context without pulling in the full provider implementation.
 * Follows the LinkContext.ts / ThemeContext.ts pattern.
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/i18n/InternationalizationProvider.tsx
 * - /packages/core/src/i18n/t.client.ts
 * - /packages/core/src/i18n/useDirection.ts
 * - /packages/core/src/i18n/useLocale.ts
 * - /packages/core/src/i18n/useCollator.ts
 * - /packages/core/src/i18n/getLocaleDirection.ts
 * - /packages/core/src/i18n/index.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$resolve$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/resolve.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const InternationalizationContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createSharedContext"])('InternationalizationContext', 1, {
    locale: 'en',
    direction: 'ltr',
    messages: {},
    translate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$resolve$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getResolve"])('en', {})
});
InternationalizationContext.displayName = 'InternationalizationContext';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "englishFallback",
    ()=>englishFallback,
    "registerEnglishFallback",
    ()=>registerEnglishFallback
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file englishFallback.ts
 * @input English key-to-message maps registered at module scope by the Core
 *   modules that name those keys
 * @output registerEnglishFallback and the read-only englishFallback map
 * @position The shipped English fallback resolve.ts reads after the locale
 *   chain.
 *
 * A Core module that names catalog keys registers the English for exactly
 * those keys from its generated map (`i18n/generated-english/`, derived by
 * scripts/generate-i18n-runtime.mjs):
 *
 *   import english from '../i18n/generated-english/Button/Button.generated';
 *   registerEnglishFallback(english);
 *
 * so a component carries the English it can show rather than the whole
 * catalog. Registration runs when the module loads, before any of its code
 * can look a key up, so a key resolves wherever the module naming it is
 * loaded. Public paths that resolve arbitrary Astryx keys register the whole
 * catalog through fullEnglishFallback.ts.
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/i18n/resolve.ts
 * - /packages/core/src/i18n/fullEnglishFallback.ts
 * - /scripts/i18n-english-fallback.mjs
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-ssr] (ecmascript)");
;
// Every copy of Core registers into one map, so a context that one copy
// created resolves the English of another copy's components.
const registered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["realmValue"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedKey"])('i18n/english-fallback', 1), ()=>({}));
const englishFallback = registered;
function registerEnglishFallback(messages) {
    Object.assign(registered, messages);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/firstStrongDirection.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "firstStrongDirection",
    ()=>firstStrongDirection,
    "hasStrongRightToLeft",
    ()=>hasStrongRightToLeft
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file firstStrongDirection.ts
 * @input A string of text
 * @output 'ltr' | 'rtl' | null — the direction of the text's first strongly
 *   directional character, or null when it has none
 * @position Shared classifier for components that give a block of prose the
 *   direction of its own text (Markdown blocks). Server-safe: it reads no
 *   context.
 */ // Each expression with a Unicode property escape is built at runtime: a
// source build may rewrite a regular expression literal with one, and the
// Babel copy that Next.js bundles has no Unicode data to do that.
/**
 * The strongly right-to-left characters of the Unicode Bidirectional
 * Algorithm: Bidi_Class `R` and `AL`. The living scripts are named. The two
 * ranges cover the historic right-to-left scripts in the Supplementary
 * Multilingual Plane, which have no script escapes that every engine knows.
 */ const STRONG_RTL = new RegExp(String.raw`[\p{Script=Adlam}\p{Script=Arabic}\p{Script=Hebrew}\p{Script=Mandaic}\p{Script=Nko}\p{Script=Samaritan}\p{Script=Syriac}\p{Script=Thaana}\u200F\u061C\u{10800}-\u{10FFF}\u{1E800}-\u{1EFFF}]`, 'u');
/**
 * The weak characters of the Arabic script: its digits, the number signs
 * before them, and the currency and per-cent marks beside them. They are
 * Bidi_Class `AN`, `EN` or `ET`, so the scan skips them. NKo and Adlam digits
 * are Bidi_Class `R` and are not here.
 */ const WEAK_ARABIC_NUMBER = /[\u0600-\u0605\u0609\u060A\u0660-\u0669\u066A-\u066C\u06DD\u06F0-\u06F9\u0890\u0891\u08E2]/u;
/**
 * Bidi_Class `L`: every other letter, the letter numbers (`\p{Letter}` does
 * not include them), and the left-to-right mark. Digits, punctuation and
 * symbols are not here, so the scan skips them.
 */ const STRONG_LTR = new RegExp(String.raw`[\p{Letter}\p{Nl}\u200E]`, 'u');
/**
 * Bidi_Class `NSM`: a combining mark takes the direction of its base
 * character. A mark has its base letter's script, so without this check a
 * leading Hebrew point would read as right-to-left.
 */ const COMBINING_MARK = new RegExp(String.raw`\p{Mark}`, 'u');
function hasStrongRightToLeft(text) {
    for (const character of text){
        if (STRONG_RTL.test(character)) {
            return true;
        }
    }
    return false;
}
function firstStrongDirection(text) {
    for (const character of text){
        if (COMBINING_MARK.test(character) || WEAK_ARABIC_NUMBER.test(character)) {
            continue;
        }
        if (STRONG_RTL.test(character)) {
            return 'rtl';
        }
        if (STRONG_LTR.test(character)) {
            return 'ltr';
        }
    }
    return null;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Banner/Banner.generated.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @generated by scripts/generate-i18n-runtime.mjs from packages/core/locales/en.json,
 * holding the English for the catalog keys named in packages/core/src/Banner/Banner.tsx.
 * Do not edit by hand. Run `pnpm generate:i18n-runtime` instead.
 */ const english = {
    "@astryx.banner.collapse": "Collapse",
    "@astryx.banner.dismiss": "Dismiss",
    "@astryx.banner.dismissTitled": "{dismiss} {title}",
    "@astryx.banner.expand": "Expand"
};
const __TURBOPACK__default__export__ = english;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Button/Button.generated.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @generated by scripts/generate-i18n-runtime.mjs from packages/core/locales/en.json,
 * holding the English for the catalog keys named in packages/core/src/Button/Button.tsx.
 * Do not edit by hand. Run `pnpm generate:i18n-runtime` instead.
 */ const english = {
    "@astryx.button.loading": "Loading"
};
const __TURBOPACK__default__export__ = english;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Field/FieldLabel.generated.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @generated by scripts/generate-i18n-runtime.mjs from packages/core/locales/en.json,
 * holding the English for the catalog keys named in packages/core/src/Field/FieldLabel.tsx.
 * Do not edit by hand. Run `pnpm generate:i18n-runtime` instead.
 */ const english = {
    "@astryx.field.labelTooltip": "About {label}",
    "@astryx.field.optional": "Optional",
    "@astryx.field.required": "Required"
};
const __TURBOPACK__default__export__ = english;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/InfoTip/InfoTip.generated.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @generated by scripts/generate-i18n-runtime.mjs from packages/core/locales/en.json,
 * holding the English for the catalog keys named in packages/core/src/InfoTip/InfoTip.tsx.
 * Do not edit by hand. Run `pnpm generate:i18n-runtime` instead.
 */ const english = {
    "@astryx.infoTip.label": "More information"
};
const __TURBOPACK__default__export__ = english;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Kbd/Kbd.generated.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @generated by scripts/generate-i18n-runtime.mjs from packages/core/locales/en.json,
 * holding the English for the catalog keys named in packages/core/src/Kbd/Kbd.tsx.
 * Do not edit by hand. Run `pnpm generate:i18n-runtime` instead.
 */ const english = {
    "@astryx.kbd.key.alt": "Alt",
    "@astryx.kbd.key.altShort": "Alt",
    "@astryx.kbd.key.backspace": "Backspace",
    "@astryx.kbd.key.command": "Command",
    "@astryx.kbd.key.control": "Control",
    "@astryx.kbd.key.controlShort": "Ctrl",
    "@astryx.kbd.key.down": "Down arrow",
    "@astryx.kbd.key.enter": "Enter",
    "@astryx.kbd.key.escape": "Escape",
    "@astryx.kbd.key.escapeShort": "Esc",
    "@astryx.kbd.key.left": "Left arrow",
    "@astryx.kbd.key.plus": "Plus",
    "@astryx.kbd.key.right": "Right arrow",
    "@astryx.kbd.key.shift": "Shift",
    "@astryx.kbd.key.shiftShort": "Shift",
    "@astryx.kbd.key.tab": "Tab",
    "@astryx.kbd.key.up": "Up arrow",
    "@astryx.kbd.key.windowsShort": "Win",
    "@astryx.kbd.shortcut": "{shortcut} + {key}"
};
const __TURBOPACK__default__export__ = english;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Link/Link.generated.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @generated by scripts/generate-i18n-runtime.mjs from packages/core/locales/en.json,
 * holding the English for the catalog keys named in packages/core/src/Link/Link.tsx.
 * Do not edit by hand. Run `pnpm generate:i18n-runtime` instead.
 */ const english = {
    "@astryx.link.newTab": "(opens in new tab)"
};
const __TURBOPACK__default__export__ = english;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Spinner/Spinner.generated.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @generated by scripts/generate-i18n-runtime.mjs from packages/core/locales/en.json,
 * holding the English for the catalog keys named in packages/core/src/Spinner/Spinner.tsx.
 * Do not edit by hand. Run `pnpm generate:i18n-runtime` instead.
 */ const english = {
    "@astryx.spinner.loading": "Loading"
};
const __TURBOPACK__default__export__ = english;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Switch/Switch.generated.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @generated by scripts/generate-i18n-runtime.mjs from packages/core/locales/en.json,
 * holding the English for the catalog keys named in packages/core/src/Switch/Switch.tsx.
 * Do not edit by hand. Run `pnpm generate:i18n-runtime` instead.
 */ const english = {
    "@astryx.switch.loading": "Loading"
};
const __TURBOPACK__default__export__ = english;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/hooks/useKeyboardHint.generated.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @generated by scripts/generate-i18n-runtime.mjs from packages/core/locales/en.json,
 * holding the English for the catalog keys named in packages/core/src/hooks/useKeyboardHint.tsx.
 * Do not edit by hand. Run `pnpm generate:i18n-runtime` instead.
 */ const english = {
    "@astryx.keyboardHint.toNavigate": "to navigate"
};
const __TURBOPACK__default__export__ = english;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/resolve.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__resetForTests",
    ()=>__resetForTests,
    "getResolve",
    ()=>getResolve,
    "resolveLocaleChain",
    ()=>resolveLocaleChain
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file resolve.ts
 * @input Key + values + locale + catalog + overrides
 * @output Formatted message string
 * @position Shared lookup + ICU formatting core, used by useTranslator().
 *
 * Lookup order:
 *   1. Per-locale override for the exact locale
 *   2. Per-locale override for a parent locale (pt-BR → pt)
 *   3. Shipped catalog entry for the exact locale
 *   4. Shipped catalog entry for a parent locale (pt-BR → pt)
 *   5. Shipped English: the English registered by the loaded modules that
 *      name the key (englishFallback.ts), or the whole catalog on public
 *      paths that resolve arbitrary keys
 *   6. The key itself (dev-visible fallback, warns once)
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/i18n/useTranslator.ts
 * - /packages/core/src/i18n/englishFallback.ts
 * - /packages/core/src/i18n/__tests__/resolve.test.ts
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$intl$2d$messageformat$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/intl-messageformat/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/devWarning.js [app-ssr] (ecmascript)");
;
;
;
/**
 * Cache of parsed ICU MessageFormat objects keyed by `${locale}::${message}`.
 * IntlMessageFormat parsing is non-trivial; caching avoids reparsing on every
 * render. The cache is unbounded in principle but bounded in practice by the
 * static set of astryx keys.
 */ const formatterCache = new Map();
function getFormatter(message, locale) {
    const cacheKey = `${locale}::${message}`;
    let f = formatterCache.get(cacheKey);
    if (f === undefined) {
        f = new __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$intl$2d$messageformat$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](message, locale);
        formatterCache.set(cacheKey, f);
    }
    return f;
}
function resolveLocaleChain(locale) {
    let canonical;
    try {
        canonical = new Intl.Locale(locale).baseName;
    } catch  {
        // Malformed input — fall back to the raw string so callers still get a chain.
        canonical = locale;
    }
    const parts = canonical.split('-');
    const chain = [];
    for(let i = parts.length; i > 0; i--){
        chain.push(parts.slice(0, i).join('-'));
    }
    return chain;
}
function getLookup(locale, messages, overrides) {
    const lookup = {};
    const chain = resolveLocaleChain(locale);
    // 1 + 2. Overrides (most specific to least specific in the chain)
    if (overrides !== undefined) {
        for (const tag of chain){
            if (overrides[tag]) {
                for (const [key, value] of Object.entries(overrides[tag])){
                    if (lookup[key] === undefined && value !== null) {
                        lookup[key] = value;
                    }
                }
            }
        }
    }
    for (const tag of chain){
        if (messages[tag]) {
            for (const [key, value] of Object.entries(messages[tag])){
                const message = typeof value === 'string' ? value : value?.defaultMessage;
                if (lookup[key] === undefined && message != null) {
                    lookup[key] = message;
                }
            }
        }
    }
    return lookup;
}
function getResolve(locale, messages, overrides, english = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["englishFallback"]) {
    const lookup = getLookup(locale, messages, overrides);
    return (key, values)=>{
        const result = lookup[key] ?? english[key];
        if (result === undefined) {
            // Fires ONLY when a key is missing from every source including the
            // shipped `en` catalog — a real bug (typo, stale catalog, deleted key).
            // Fallback to `en` from a non-en locale is expected and stays silent,
            // matching the FormatJS / i18next default.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["warnOnce"])(`astryx-i18n:${locale}::${key}`, 'astryx-i18n', `missing key: ${key} (locale: ${locale})`);
            return key;
        }
        if (values === undefined) {
            // Static string — skip the parser entirely for the common case
            return result;
        }
        const formatted = getFormatter(result, locale).format(values);
        // IntlMessageFormat.format returns string | (string | React elements) — we
        // only ever pass string values so it will be a string; assert for the type
        // system.
        return formatted;
    };
}
function __resetForTests() {
    formatterCache.clear();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["__resetDevWarnings"])();
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useComponentTranslator",
    ()=>useComponentTranslator
]);
/**
 * @file useComponentTranslator.ts
 * @input InternationalizationContext (via use())
 * @output useComponentTranslator, and registerEnglishFallback re-exported for
 *   the same importers
 * @position Internal translator for Core components. Not exported from the
 *   package; application code uses the public `useTranslator`.
 *
 * Returns the same provider-bound translator as the public hook. The public
 * hook also registers the whole English catalog, because application code may
 * translate any Astryx key; a component instead registers the English for the
 * keys it names, from its generated map:
 *
 *   import {
 *     registerEnglishFallback,
 *     useComponentTranslator,
 *   } from '../i18n/useComponentTranslator';
 *   import english from '../i18n/generated-english/Button/Button.generated';
 *
 *   registerEnglishFallback(english);
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/i18n/useTranslator.ts
 * - /packages/core/src/i18n/englishFallback.ts
 * - /scripts/i18n-english-fallback.mjs
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$InternationalizationContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/InternationalizationContext.js [app-ssr] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
function useComponentTranslator() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$InternationalizationContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InternationalizationContext"]);
    return ctx.translate;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/internal/touchHitArea.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file touchHitArea.stylex.ts
 * @input Uses StyleX and the insets that utils/hitArea.ts writes on a host
 * @output Exports `touchHitAreaStyles.layer`, a host's invisible hit band
 *   under a coarse pointer, and `touchHitAreaStyles.layerBelowChildren`, the
 *   same band drawn below the host's children
 * @position Internal styling utility for Button (and so the input clear
 *   button), CheckboxInput, RadioListItem, List rows, InfoTip,
 *   SegmentedControl segments and the press-tracking groups. Each keeps its
 *   insets live with `useTouchHitArea` (utils/touchHitArea.ts).
 *
 * The band is the host's `::after`, grown past each edge by the measured
 * inset. A clip path cuts out the host's box, so its content keeps its taps.
 * A tap on the band lands on the host. Button draws the band on its content
 * wrapper instead, which leaves its own `::after` to callers. The insets then
 * reach the wrapper by inheritance, a tap on the band lands on that
 * descendant, and the watch has `ownsDescendantTouches` off. A host whose children fill its box,
 * such as a press-tracking group, takes `layerBelowChildren`. That band is its
 * `::before`, so its positioned children paint over the clip path's edge, and
 * the pixels on their own edges stay theirs. SYNC: utils/hitArea.ts
 * HIT_INSET_PROPERTIES, utils/touchHitArea.ts and utils/touchHitArea.test.tsx.
 */ __turbopack_context__.s([
    "touchHitAreaStyles",
    ()=>touchHitAreaStyles
]);
;
// StyleX reads these at build time, so they are spelled out.
const TOUCH = '@media (pointer: coarse)';
// The insets are measured in the viewport, so the sides are physical.
const TOP = 'var(--astryx-hit-inset-top, 0px)';
const RIGHT = 'var(--astryx-hit-inset-right, 0px)';
const BOTTOM = 'var(--astryx-hit-inset-bottom, 0px)';
const LEFT = 'var(--astryx-hit-inset-left, 0px)';
// The insets start at the host's border box, but the band's offsets start at
// its padding box. So a host that draws a border declares its width on that
// side, 0 by default. It declares it on its own `::after`, so content inside
// the host never inherits it.
const BORDER_TOP = 'var(--_hit-border-top, 0px)';
const BORDER_RIGHT = 'var(--_hit-border-right, 0px)';
const BORDER_BOTTOM = 'var(--_hit-border-bottom, 0px)';
const BORDER_LEFT = 'var(--_hit-border-left, 0px)';
// The host is the band's containing block, so a host that is not positioned
// sets `position: relative`. The band has no z-index of its own. Inside a
// List, which isolates its rows, ListItem raises it. Under a finger the host's
// `::after`, or `::before` below its children, is this band, so decorate the
// host with a child.
const BAND = {
    content: {
        default: null,
        [TOUCH]: '""'
    },
    position: {
        default: null,
        [TOUCH]: 'absolute'
    },
    inset: {
        default: null,
        [TOUCH]: `calc((${TOP} + ${BORDER_TOP}) * -1) calc((${RIGHT} + ${BORDER_RIGHT}) * -1) calc((${BOTTOM} + ${BORDER_BOTTOM}) * -1) calc((${LEFT} + ${BORDER_LEFT}) * -1)`
    },
    // The outer rectangle, then the host's box as an even-odd hole.
    clipPath: {
        default: null,
        [TOUCH]: `polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${LEFT} ${TOP}, calc(100% - ${RIGHT}) ${TOP}, calc(100% - ${RIGHT}) calc(100% - ${BOTTOM}), ${LEFT} calc(100% - ${BOTTOM}), ${LEFT} ${TOP})`
    }
};
const touchHitAreaStyles = {
    layer: {
        k5JduY: "x1fjtqre",
        kwXMNM: "x7b72wb",
        kv0HGH: "x1ukc1h5",
        kJYu5r: "x1c440c0",
        $$css: true
    },
    layerBelowChildren: {
        kgeoSG: "xrfab51",
        kEoFBp: "xjupvsi",
        kFcpXp: "xg52tuh",
        ksxFz7: "x1la2cvp",
        $$css: true
    }
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/keyboard/keyboardHeight.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KEYBOARD_EPSILON",
    ()=>KEYBOARD_EPSILON,
    "__focusTakeoverCallersForTest",
    ()=>__focusTakeoverCallersForTest,
    "claimTapFocus",
    ()=>claimTapFocus,
    "findTextEntryControl",
    ()=>findTextEntryControl,
    "focusAtPoint",
    ()=>focusAtPoint,
    "getKeyboardHeight",
    ()=>getKeyboardHeight,
    "hasVirtualKeyboard",
    ()=>hasVirtualKeyboard,
    "isKeyboardMeasurable",
    ()=>isKeyboardMeasurable,
    "isTextEntryControl",
    ()=>isTextEntryControl,
    "measureKeyboardHeight",
    ()=>measureKeyboardHeight,
    "refuseFocusReveal",
    ()=>refuseFocusReveal,
    "subscribeKeyboardHeight",
    ()=>subscribeKeyboardHeight,
    "watchRevealPan",
    ()=>watchRevealPan
]);
/**
 * @file keyboardHeight.ts
 * @input The visual viewport, the window's input stream (focus, blur,
 *   resize, scroll and touch), and the layout viewport's height
 * @output The on-screen keyboard module: measureKeyboardHeight,
 *   isKeyboardMeasurable, hasVirtualKeyboard, subscribeKeyboardHeight,
 *   getKeyboardHeight, isTextEntryControl, findTextEntryControl,
 *   refuseFocusReveal and watchRevealPan
 * @position Core's one source for the on-screen keyboard. It is internal to
 *   core and never exported from the package.
 *
 * SYNC: When modified, update /packages/core/src/keyboard/README.md
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/clickGuard.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$coarsePointer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/coarsePointer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputStream.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/nodeType.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$layoutViewport$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/layoutViewport.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/pressGesture.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$selectionLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/selectionLock.js [app-ssr] (ecmascript)");
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
;
const KEYBOARD_EPSILON = 1;
// Android's Remove animations setting, which makes Chrome report a hide in
// steps.
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
// How long a step of a hide waits for the next report. It is longer than
// Gboard's whole hide (hideMs).
const HIDE_STEP_WAIT_MS = 300;
// How long a hide's steps wait in all, from the first. A toolbar's moves
// while a lower keyboard stays up cannot hold the layout longer.
const HIDE_STEP_LIMIT_MS = 1000;
const NON_TEXT_INPUT_TYPES = new Set([
    'button',
    'checkbox',
    'color',
    'file',
    'hidden',
    'image',
    'radio',
    'range',
    'reset',
    'submit'
]);
function isKeyboardMeasurable(win) {
    return win.visualViewport != null && win.self === win.top;
}
function measureKeyboardHeight(win) {
    const viewport = win.visualViewport;
    if (viewport == null || !isKeyboardMeasurable(win)) {
        return 0;
    }
    const height = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$layoutViewport$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["layoutViewportHeight"])(win) - viewport.height * (viewport.scale ?? 1);
    return height > KEYBOARD_EPSILON ? Math.round(height * 100) / 100 : 0;
}
/** A report from the keyboard module, in the order the window raised them. */ const stores = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedWeakMap"])('keyboard/keyboard-height/stores', 1);
function storeOf(win) {
    let store = stores.get(win);
    if (store == null) {
        store = {
            height: 0,
            listeners: new Set(),
            focusListeners: new Set(),
            detach: null,
            detachFocus: null
        };
        stores.set(win, store);
    }
    return store;
}
function hasVirtualKeyboard(win) {
    return 'virtualKeyboard' in win.navigator;
}
// Whether a report of `height` is one step of a hide. Under Remove
// animations, Chrome on Android reports a hide as several lower keyboards
// that are still up, before the report of none.
function isHideStep(win, shown, height) {
    return height > KEYBOARD_EPSILON && height < shown - KEYBOARD_EPSILON && hasVirtualKeyboard(win) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$coarsePointer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["matchesMediaQuery"])(win, REDUCED_MOTION_QUERY);
}
function attach(win, store) {
    const viewport = win.visualViewport;
    store.height = measureKeyboardHeight(win);
    // Set while a step of a hide waits. The store keeps the height it reported,
    // so every reader lays out once, when the keyboard comes to rest.
    let stepTimer = null;
    let stepHeight = 0;
    let stepLimit = 0;
    const deliver = (height, timeStamp)=>{
        store.height = height;
        const report = {
            type: 'viewport',
            height,
            timeStamp
        };
        for (const listener of [
            ...store.listeners
        ]){
            listener(report);
        }
    };
    const onViewport = (event)=>{
        const height = measureKeyboardHeight(win);
        if (isHideStep(win, store.height, height)) {
            // A pan reports the same step again, and leaves the wait as it is.
            if (stepTimer != null && Math.abs(height - stepHeight) < KEYBOARD_EPSILON) {
                return;
            }
            const now = win.performance.now();
            if (stepTimer == null) {
                stepLimit = now + HIDE_STEP_LIMIT_MS;
            } else {
                clearTimeout(stepTimer);
            }
            stepHeight = height;
            // The report of none, a report back up, or a quiet spell ends the wait.
            stepTimer = setTimeout(()=>{
                stepTimer = null;
                deliver(measureKeyboardHeight(win), win.performance.now());
            }, Math.min(HIDE_STEP_WAIT_MS, stepLimit - now));
            return;
        }
        if (stepTimer != null) {
            clearTimeout(stepTimer);
            stepTimer = null;
        }
        deliver(height, event.timeStamp);
    };
    viewport?.addEventListener('resize', onViewport);
    viewport?.addEventListener('scroll', onViewport);
    // Only the window's own resize reports: a window's own event has no node as
    // its target.
    const stopResize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(win, 'resize', (event)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(event.target)) {
            onViewport(event);
        }
    });
    return ()=>{
        if (stepTimer != null) {
            clearTimeout(stepTimer);
            stepTimer = null;
        }
        viewport?.removeEventListener('resize', onViewport);
        viewport?.removeEventListener('scroll', onViewport);
        stopResize();
    };
}
// Focus moves are heard only while a subscriber asks for them. A viewport
// reader, such as a Tall BottomSheet's hook under any pointer, adds no focus
// listener.
function attachFocus(win, store) {
    const onFocus = (event)=>{
        const report = {
            type: event.type === 'focusin' ? 'focusin' : 'focusout',
            height: store.height,
            timeStamp: event.timeStamp,
            target: event.target,
            relatedTarget: event.relatedTarget
        };
        for (const listener of [
            ...store.focusListeners
        ]){
            listener(report);
        }
    };
    const stopFocusIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(win, 'focusin', onFocus);
    const stopFocusOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(win, 'focusout', onFocus);
    return ()=>{
        stopFocusIn();
        stopFocusOut();
    };
}
function subscribeKeyboardHeight(win, listener, { focus = false } = {}) {
    const store = storeOf(win);
    store.listeners.add(listener);
    if (store.detach == null) {
        store.detach = attach(win, store);
    }
    if (focus) {
        store.focusListeners.add(listener);
        if (store.detachFocus == null) {
            store.detachFocus = attachFocus(win, store);
        }
    }
    return ()=>{
        store.listeners.delete(listener);
        if (focus) {
            store.focusListeners.delete(listener);
            if (store.focusListeners.size === 0 && store.detachFocus != null) {
                store.detachFocus();
                store.detachFocus = null;
            }
        }
        if (store.listeners.size === 0 && store.detach != null) {
            store.detach();
            store.detach = null;
        }
    };
}
function getKeyboardHeight(win) {
    const store = stores.get(win);
    return store?.detach != null ? store.height : measureKeyboardHeight(win);
}
function isTextEntryControl(element) {
    // Reads the kind by name, so an element of another window (a same-origin
    // iframe, a Picture-in-Picture window) passes too.
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(element) || element.getAttribute('inputmode') === 'none') {
        return false;
    }
    if (element.localName === 'textarea') {
        const textArea = element;
        return !textArea.disabled && !textArea.readOnly;
    }
    if (element.localName === 'input') {
        const input = element;
        return !input.disabled && !input.readOnly && !NON_TEXT_INPUT_TYPES.has((input.getAttribute('type') ?? 'text').toLowerCase());
    }
    return element.matches('[contenteditable]:not([contenteditable="false"])');
}
function findTextEntryControl(target, container) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"])(target)) {
        return null;
    }
    const direct = target.closest('input, textarea, [contenteditable]:not([contenteditable="false"])');
    if (container.contains(direct) && isTextEntryControl(direct)) {
        return direct;
    }
    const label = target.closest('label');
    const control = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"])(label) ? label.control : null;
    return container.contains(control) && isTextEntryControl(control) ? control : null;
}
/** The caller's rules for refuseFocusReveal. */ // One shared `blur` subscription per document serves every caller of
// refuseFocusReveal in it, so listeners do not grow with the number of
// instances. The first caller adds it, and the last removes it.
const focusTakeovers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedWeakMap"])('keyboard/keyboard-height/focus-takeovers', 1);
function refuseFocusReveal(doc, { isActive, claim, park }) {
    const onBlur = (event)=>{
        if (isActive != null && !isActive()) {
            return;
        }
        const destination = claim(event.relatedTarget);
        if (destination != null) {
            if (destination !== doc.activeElement) {
                destination.focus({
                    preventScroll: true
                });
            }
            return;
        }
        if (event.relatedTarget == null) {
            park?.(event.target);
        }
    };
    let shared = focusTakeovers.get(doc);
    if (shared == null) {
        const view = doc.defaultView;
        if (view == null) {
            return ()=>{};
        }
        const callers = new Set();
        // Callers hear each blur in the order they came, as separate listeners
        // would; one that stopped during this blur no longer hears it.
        const listener = (event)=>{
            for (const caller of [
                ...callers
            ]){
                if (callers.has(caller)) {
                    caller(event);
                }
            }
        };
        // `blur` does not bubble: only the capture phase hears every one, and it
        // runs before the browser's own focus step. The window's own blur moves
        // no focus inside the document.
        const stop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'blur', (event)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(event.target)) {
                listener(event);
            }
        });
        shared = {
            stop,
            callers
        };
        focusTakeovers.set(doc, shared);
    }
    shared.callers.add(onBlur);
    return ()=>{
        const current = focusTakeovers.get(doc);
        if (current == null || !current.callers.delete(onBlur)) {
            return;
        }
        if (current.callers.size === 0) {
            current.stop();
            focusTakeovers.delete(doc);
        }
    };
}
function __focusTakeoverCallersForTest(doc) {
    return focusTakeovers.get(doc)?.callers.size ?? 0;
}
/** The caller's rules for watchRevealPan. */ /** A watch for the browser's own reveal pan (see watchRevealPan). */ // One shared touch subscription per document serves every reveal-pan watch
// in it, so no instance adds a listener. The first watch adds it, and the
// last removes it.
const touchStartWatches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedWeakMap"])('keyboard/keyboard-height/touch-start-watches', 1);
function watchTouchStarts(doc, onTouchStart) {
    let shared = touchStartWatches.get(doc);
    if (shared == null) {
        const view = doc.defaultView;
        if (view == null) {
            return ()=>{};
        }
        const watches = new Set();
        const stop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'touchstart', ()=>{
            for (const watch of [
                ...watches
            ]){
                watch();
            }
        });
        shared = {
            stop,
            watches
        };
        touchStartWatches.set(doc, shared);
    }
    shared.watches.add(onTouchStart);
    return ()=>{
        const current = touchStartWatches.get(doc);
        if (current == null || !current.watches.delete(onTouchStart)) {
            return;
        }
        if (current.watches.size === 0) {
            current.stop();
            touchStartWatches.delete(doc);
        }
    };
}
function watchRevealPan(win, { owns, onTouch }) {
    const doc = win.document;
    let atReport = null;
    let touchedSinceReport = false;
    const stopTouchStarts = watchTouchStarts(doc, ()=>{
        touchedSinceReport = true;
        onTouch?.();
    });
    return {
        report: ()=>{
            const viewport = win.visualViewport;
            atReport = viewport == null ? null : {
                x: win.scrollX,
                y: win.scrollY,
                top: viewport.offsetTop,
                scale: viewport.scale
            };
            touchedSinceReport = false;
        },
        isRevealPan: (height)=>{
            const viewport = win.visualViewport;
            const focused = doc.activeElement;
            return viewport != null && atReport != null && !touchedSinceReport && height > 0 && viewport.offsetTop > atReport.top && viewport.scale === atReport.scale && win.scrollX === atReport.x && win.scrollY === atReport.y && focused instanceof HTMLElement && isTextEntryControl(focused) && owns(focused);
        },
        putBack: (anchor)=>{
            const options = {
                block: 'start',
                inline: 'nearest',
                behavior: 'instant'
            };
            if (anchor != null) {
                anchor.scrollIntoView(options);
                return;
            }
            // A fixed element sits in the layout viewport, which the pan does not
            // move: scrolling its top into view pans the visual viewport back.
            const probe = doc.createElement('div');
            probe.style.position = 'fixed';
            probe.style.left = '0';
            probe.style.top = `${atReport?.top ?? 0}px`;
            probe.style.width = '1px';
            probe.style.height = '1px';
            probe.style.visibility = 'hidden';
            probe.style.pointerEvents = 'none';
            (doc.body ?? doc.documentElement).append(probe);
            probe.scrollIntoView(options);
            probe.remove();
        },
        stop: stopTouchStarts
    };
}
function claimTapFocus(region, { claim, deliver }) {
    // The touch the route follows, and the listeners that follow it: on the
    // region only, and only while that touch is down.
    let start = null;
    // On the iOS simulator, a tap held about 250 ms still gets its mousedown and
    // click. They come a few ms after its touchend, though the route cancelled
    // that touchend. They go to whatever is under the finger by then, which can
    // take the focus the tap delivered. The click guard takes them
    // (utils/clickGuard.ts).
    const stopFollowing = ()=>{
        start = null;
        region.removeEventListener('touchmove', onMove);
        region.removeEventListener('touchend', onEnd);
        region.removeEventListener('touchcancel', stopFollowing);
    };
    function onMove(event) {
        const touch = event.touches[0];
        if (start == null || event.touches.length !== 1 || touch == null || // Past the press slop, the touch is the browser's to scroll, not a tap
        // on a field.
        Math.hypot(touch.clientX - start.x, touch.clientY - start.y) > __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRESS_SLOP_PX"]) {
            stopFollowing();
        }
    }
    function onEnd(event) {
        const touch = event.changedTouches[0];
        const tap = start;
        stopFollowing();
        // Still the same field, still without focus.
        if (tap == null || touch == null || !event.cancelable || claim(tap.control) !== tap.control) {
            return;
        }
        event.preventDefault();
        deliver(tap.control, touch.clientX, touch.clientY, touch);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["armClickGuard"])(region.ownerDocument, {
            takesLateMouse: true
        });
    }
    const onStart = (event)=>{
        if (start != null) {
            // Another finger joined the one the route follows: not a tap.
            stopFollowing();
            return;
        }
        const touch = event.touches[0];
        const control = event.touches.length === 1 && touch != null ? claim(event.target) : null;
        if (control == null || touch == null) {
            return;
        }
        start = {
            x: touch.clientX,
            y: touch.clientY,
            control
        };
        region.addEventListener('touchmove', onMove, {
            passive: true
        });
        // Not passive: only the end of the touch can still cancel the browser's
        // focus and its reveal.
        region.addEventListener('touchend', onEnd);
        region.addEventListener('touchcancel', stopFollowing);
    };
    region.addEventListener('touchstart', onStart, {
        passive: true
    });
    return ()=>{
        stopFollowing();
        region.removeEventListener('touchstart', onStart);
    };
}
function isTextControl(element) {
    return element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement;
}
/**
 * A text control's caret for a tap at (x, y). It is where the browser maps
 * the point inside the control. Where the browser maps none, it is after the
 * text, the convention for a focus without a point. A control with no text
 * selection stays as it is.
 */ function placeTextControlCaret(control, x, y) {
    if (control.selectionStart == null) {
        return;
    }
    const caret = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$selectionLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["caretAt"])(control.ownerDocument, x, y, []);
    const offset = caret != null && caret.node === control ? caret.offset : control.value.length;
    control.setSelectionRange(offset, offset);
}
function focusAtPoint(editable, x, y) {
    editable.focus({
        preventScroll: true
    });
    if (isTextControl(editable)) {
        placeTextControlCaret(editable, x, y);
        return;
    }
    const doc = editable.ownerDocument;
    const caret = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$selectionLock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["caretAt"])(doc, x, y, []);
    if (caret != null && editable.isContentEditable && editable.contains(caret.node)) {
        const range = doc.createRange();
        range.setStart(caret.node, caret.offset);
        range.collapse(true);
        const selection = doc.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
    }
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/keyboard/keyboardLayoutGuide.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bringsUpKeyboard",
    ()=>bringsUpKeyboard,
    "getKeyboardLayoutGuide",
    ()=>getKeyboardLayoutGuide,
    "hidesField",
    ()=>hidesField,
    "keyboardProfileOf",
    ()=>keyboardProfileOf
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file keyboardLayoutGuide.ts
 * @input The keyboard module's reports (subscribeKeyboardHeight) and
 *   createKeyboardModel
 * @output getKeyboardLayoutGuide (a window's one guide), bringsUpKeyboard and
 *   the KeyboardLayoutGuide type
 * @position The web's UIKeyboardLayoutGuide: where the software keyboard
 *   covers the layout viewport and how it moves. Touch presentations read it
 *   to keep content above the keyboard. It is internal to core.
 *
 * SYNC: When modified, update /packages/core/src/keyboard/README.md
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/keyboard/keyboardHeight.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardModel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/keyboard/keyboardModel.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-ssr] (ecmascript)");
;
;
;
function keyboardProfileOf(win) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasVirtualKeyboard"])(win) ? 'chromium' : null;
}
/** A window's keyboard layout guide. */ // Extra time after a predicted transition's end before checking it.
const VERIFY_SLACK_MS = 150;
// How long after a field gains focus Chrome may still report the keyboard
// gone for a moment (measured: back within 50 ms of the move).
const FOCUS_HANDOFF_MS = 150;
// Controls whose picker Chrome on Android opens over the page while the
// keyboard goes away; on iOS the picker takes the keyboard's place.
const PICKER_INPUT_TYPES = new Set([
    'date',
    'datetime-local',
    'month',
    'time',
    'week'
]);
function bringsUpKeyboard(target) {
    const element = target instanceof Element ? target : null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTextEntryControl"])(element) || element instanceof HTMLSelectElement && !element.disabled;
}
// Whether `target` is a select, or a date or time field, which Chrome on
// Android edits in a picker over the page.
function opensPickerOverPage(target) {
    const element = target;
    if (element == null || element.nodeType !== 1) {
        return false;
    }
    return element.tagName === 'SELECT' || element.tagName === 'INPUT' && PICKER_INPUT_TYPES.has(element.type);
}
function hidesField(target) {
    return target.tagName === 'IFRAME' || target.tagName === 'FRAME' || target.tagName === 'OBJECT' || target.tagName === 'EMBED' || target.shadowRoot != null || target.tagName.includes('-');
}
const guides = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sharedWeakMap"])('keyboard/keyboard-layout-guide/guides', 1);
function getKeyboardLayoutGuide(win) {
    let guide = guides.get(win);
    if (guide == null) {
        guide = createGuide(win);
        guides.set(win, guide);
    }
    return guide;
}
function createGuide(win) {
    const listeners = new Set();
    let profile = keyboardProfileOf(win);
    let model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardModel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createKeyboardModel"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getKeyboardHeight"])(win));
    let verifyTimer = null;
    let detach = null;
    // Whether focusing `target` keeps an input view where the keyboard is. On
    // iOS, a select's picker or a date or time field's picker takes the
    // keyboard's place. Chrome on Android opens it over the page, and the
    // keyboard goes away.
    const keepsInputView = (target)=>bringsUpKeyboard(target) && !(profile === 'chromium' && opensPickerOverPage(target));
    // Whether a hide predicted from a blur is under way with nothing focused
    // that can keep a keyboard up. Then only Chrome's report of the keyboard
    // gone counts.
    const awaitsHide = ()=>{
        const active = win.document.activeElement;
        return model.transition.kind === 'hide' && model.transition.predicted && !keepsInputView(active) && !(active != null && hidesField(active));
    };
    const publish = (transition)=>{
        if (transition == null) {
            return;
        }
        if (transition.predicted) {
            scheduleVerify(transition);
        }
        for (const listener of [
            ...listeners
        ]){
            listener(transition);
        }
    };
    const scheduleVerify = (transition)=>{
        if (verifyTimer != null) {
            clearTimeout(verifyTimer);
        }
        const due = transition.start + (transition.curve?.durationMs ?? 0) + VERIFY_SLACK_MS;
        verifyTimer = setTimeout(()=>{
            verifyTimer = null;
            const inset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getKeyboardHeight"])(win);
            if (inset != null && inset > 0.5 && awaitsHide()) {
                return;
            }
            publish(model.verify(inset, win.performance.now()));
        }, Math.max(0, due - win.performance.now()));
    };
    const attach = ()=>{
        profile = keyboardProfileOf(win);
        model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardModel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createKeyboardModel"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getKeyboardHeight"])(win));
        // When a field that brings up a keyboard last gained focus.
        let keyboardFocusAt = -Infinity;
        let handoffTimer = null;
        const report = (height, time)=>{
            if (handoffTimer != null) {
                clearTimeout(handoffTimer);
                handoffTimer = null;
            }
            const settled = keyboardFocusAt + FOCUS_HANDOFF_MS;
            if (profile === 'chromium' && height < 0.5 && model.inset >= 0.5 && time < settled && keepsInputView(win.document.activeElement)) {
                // Focus just moved to another field: Chrome reports the keyboard
                // gone before it reports it back. Hold the hide until the move
                // settles, then believe whatever the keyboard is doing.
                handoffTimer = setTimeout(()=>{
                    handoffTimer = null;
                    publish(model.report((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getKeyboardHeight"])(win), settled));
                }, settled - time);
                return null;
            }
            if (height > 0.5 && awaitsHide()) {
                return null;
            }
            return model.report(height, time);
        };
        const onReport = (event)=>{
            if (event.type === 'viewport') {
                publish(report(event.height, event.timeStamp));
            } else if (event.type === 'focusin') {
                if (keepsInputView(event.target)) {
                    keyboardFocusAt = event.timeStamp;
                    publish(model.focused(event.timeStamp));
                }
            } else if (keepsInputView(event.target) && !keepsInputView(event.relatedTarget)) {
                publish(model.blurred(event.timeStamp));
            }
        };
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribeKeyboardHeight"])(win, onReport, {
            focus: true
        });
        return ()=>{
            unsubscribe();
            if (handoffTimer != null) {
                clearTimeout(handoffTimer);
                handoffTimer = null;
            }
            if (verifyTimer != null) {
                clearTimeout(verifyTimer);
                verifyTimer = null;
            }
        };
    };
    return {
        get profile () {
            return profile;
        },
        get inset () {
            return model.inset;
        },
        get transition () {
            return model.transition;
        },
        presentation (time = win.performance.now()) {
            return model.presentation(time);
        },
        subscribe (listener) {
            listeners.add(listener);
            if (detach == null) {
                detach = attach();
            }
            return ()=>{
                listeners.delete(listener);
                if (listeners.size === 0 && detach != null) {
                    detach();
                    detach = null;
                }
            };
        }
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/keyboard/keyboardModel.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createKeyboardModel",
    ()=>createKeyboardModel
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file keyboardModel.ts
 * @input `keyboard` from the Android table: Gboard's slides and Chrome's
 *   report timings
 * @output createKeyboardModel, the keyboard layout guide's clock-free core,
 *   and the KeyboardTransition and KeyboardModel types
 * @position The state of the keyboard layout guide (keyboardLayoutGuide.ts).
 *   It infers the keyboard's transition from the visual viewport's reports
 *   and focus changes, each input with its own time. It is internal to core.
 *
 * SYNC: When modified, update /packages/core/src/keyboard/README.md
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$android$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/android/keyboard.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$bezier$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/bezier.js [app-ssr] (ecmascript)");
;
;
/** Which browser's keyboard reports the guide reads. */ /** An eased slide: the curve a transition plays (Gboard going up or down). */ /** How the keyboard's cover changes. */ /** One change of the keyboard's cover, as the guide reports it. */ /** The guide's clock-free core: inputs carry their own times. */ const EPSILON = 0.5;
function createKeyboardModel(initialInset = 0) {
    let transition = {
        kind: 'change',
        from: initialInset,
        to: initialInset,
        start: -Infinity,
        velocity: 0,
        animated: false,
        predicted: false,
        curve: null
    };
    // The inset over seconds since the transition's start.
    let curve = null;
    // An eased slide's value and velocity.
    const easedCurve = (from, to, slide)=>{
        const span = slide.durationMs / 1000;
        const ease = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$bezier$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezier"])(slide.points);
        const value = (t)=>from + (to - from) * ease(Math.min(1, Math.max(0, t / span)));
        return {
            value,
            velocity: (t)=>{
                if (t >= span) {
                    return 0;
                }
                const a = Math.max(0, t - 0.001);
                const b = Math.min(span, t + 0.001);
                return (value(b) - value(a)) / (b - a);
            }
        };
    };
    // Gboard's slides, as Chrome draws them: the table's show and hide curves.
    const showSlide = {
        durationMs: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$android$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyboard"].showMs,
        points: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$android$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyboard"].showCurve
    };
    const hideSlide = {
        durationMs: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$android$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyboard"].hideMs,
        points: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$android$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyboard"].hideCurve
    };
    // How long the current transition moves for.
    const lengthOf = ()=>transition.curve != null ? transition.curve.durationMs : 0;
    // The inset of the last keyboard that was up, for a hide that turns back.
    let shownInset = initialInset;
    const presentation = (time)=>{
        // A jump has happened at its start; a curve starts from `from`.
        if (time < transition.start) {
            return transition.from;
        }
        if (curve == null || time >= transition.start + lengthOf()) {
            return transition.to;
        }
        return curve.value((time - transition.start) / 1000);
    };
    const velocity = (time)=>{
        if (time <= transition.start) {
            return transition.velocity;
        }
        if (curve == null || time >= transition.start + lengthOf()) {
            return 0;
        }
        return curve.velocity((time - transition.start) / 1000);
    };
    const begin = (kind, to, start, { animated = true, predicted = false } = {})=>{
        // Never date a transition before the one it interrupts.
        const at = Math.max(start, transition.start);
        const from = presentation(at);
        const v = animated ? velocity(at) : 0;
        const slide = animated ? to > from ? showSlide : hideSlide : null;
        transition = {
            kind,
            from,
            to,
            start: at,
            velocity: v,
            animated,
            predicted,
            curve: slide
        };
        curve = slide != null && Math.abs(to - from) + Math.abs(v) > 0 ? easedCurve(from, to, slide) : null;
        if (to > EPSILON) {
            shownInset = to;
        }
        return transition;
    };
    const confirm = ()=>{
        if (transition.predicted) {
            transition = {
                ...transition,
                predicted: false
            };
        }
        return null;
    };
    return {
        get inset () {
            return transition.to;
        },
        get transition () {
            return transition;
        },
        presentation,
        velocity,
        report (inset, time) {
            if (inset == null) {
                return null;
            }
            const target = transition.to;
            if (Math.abs(inset - target) < EPSILON) {
                return confirm();
            }
            if (inset <= EPSILON) {
                // A hide nothing predicted (Back): Chrome reports it just after
                // Gboard starts down, so it rides from that moment.
                return begin('hide', 0, time - __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$android$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyboard"].hideReportLagMs);
            }
            if (target <= EPSILON) {
                // Chrome reports the show just after Gboard starts up: ride from
                // that moment, joining the slide where it is. A smaller first
                // report is the accessory bar, the keyboard's own following: ride
                // to the last keyboard's height and let its report confirm it.
                const predicted = shownInset > inset + EPSILON;
                return begin('show', predicted ? shownInset : inset, time - __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$android$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyboard"].showReportLagMs, {
                    predicted
                });
            }
            // The keyboard changed while up (another keyboard, or the keyboard's
            // report after the accessory bar's): Chrome lays the page out at once.
            return begin('change', inset, time, {
                animated: false
            });
        },
        blurred (time) {
            if (transition.to <= EPSILON) {
                return null;
            }
            return begin('hide', 0, time + __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$android$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyboard"].hideAfterBlurMs, {
                predicted: true
            });
        },
        focused (time) {
            if (transition.kind !== 'hide' || !transition.predicted) {
                return null;
            }
            // Focus came back before the predicted hide finished: the keyboard
            // turns back to the inset it had.
            return begin('show', shownInset, Math.max(time, transition.start), {
                predicted: true
            });
        },
        verify (inset, time) {
            if (!transition.predicted || inset == null || time < transition.start + lengthOf()) {
                return null;
            }
            if (Math.abs(inset - transition.to) < EPSILON) {
                return confirm();
            }
            return begin(inset > transition.to ? 'show' : 'hide', inset, time);
        }
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/hapticSwitch.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isHapticSwitch",
    ()=>isHapticSwitch,
    "markHapticSwitch",
    ()=>markHapticSwitch
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file privateAttributes/hapticSwitch.stylex.ts
 * @input The hidden switch a label's tap haptic plays through
 * @output markHapticSwitch, which marks that switch, and isHapticSwitch,
 *   which reads the mark
 * @position Owner module of the private haptic-switch attribute
 *   (`architecture:public-component-api` INV23): the only file that writes
 *   its name. gestures/haptics.ts marks its hidden switch; the click guard
 *   skips that switch without importing the haptics module, so a gesture
 *   that only guards clicks carries no haptics code
 *   (`architecture:react-component-runtime` INV13). No package entry
 *   exports it.
 */ const HAPTIC_SWITCH = 'data-astryx-haptic-switch';
function markHapticSwitch(element) {
    element.setAttribute(HAPTIC_SWITCH, '');
}
function isHapticSwitch(target) {
    return target instanceof Element && target.hasAttribute(HAPTIC_SWITCH);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/layerPortalBoundary.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isRendererManagedRoot",
    ()=>isRendererManagedRoot,
    "rendererManagedRootProps",
    ()=>rendererManagedRootProps
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file privateAttributes/layerPortalBoundary.stylex.ts
 * @input An element whose DOM a renderer reconciles
 * @output rendererManagedRootProps, which marks such a root, and
 *   isRendererManagedRoot, which reads the mark
 * @position Owner module of the private layer-portal-boundary attribute in
 *   Core: the only Core file that writes its name. Layer's corrective portal
 *   resolver reads it. RichText writes the same mark from its own owner
 *   module. No package entry exports it.
 */ const LAYER_PORTAL_BOUNDARY = 'data-astryx-layer-portal-boundary';
const RENDERER_MANAGED = 'external';
const rendererManagedRootProps = {
    [LAYER_PORTAL_BOUNDARY]: RENDERER_MANAGED
};
function isRendererManagedRoot(element) {
    return element.getAttribute(LAYER_PORTAL_BOUNDARY) === RENDERER_MANAGED;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/layerRoot.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "closestLayerRoot",
    ()=>closestLayerRoot,
    "isLayerRoot",
    ()=>isLayerRoot,
    "layerRootProps",
    ()=>layerRootProps
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file privateAttributes/layerRoot.stylex.ts
 * @input A layer content root
 * @output layerRootProps, which marks an element as a layer root,
 *   closestLayerRoot, which finds the nearest marked root, and isLayerRoot,
 *   which reads the mark on one element
 * @position Owner module of the private layer-root attribute: the only
 *   file that writes its name. Layer's click boundary spreads the mark on
 *   every layer root; SelectableCard reads it for its compatibility path
 *   until the next minor; Layer's corrective portal resolver reads it to stop
 *   at the nearest layer root. No package entry exports it.
 */ const LAYER_ROOT = 'data-astryx-layer-root';
const layerRootProps = {
    [LAYER_ROOT]: ''
};
function closestLayerRoot(target) {
    return target.closest(`[${LAYER_ROOT}]`);
}
function isLayerRoot(element) {
    return element.hasAttribute(LAYER_ROOT);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/press.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/* eslint-disable @astryx/no-hover-on-disabled -- Every hover branch is
 * nested beneath ENABLED below, as in interactionOverlay.stylex.ts. */ /**
 * @file privateAttributes/press.stylex.ts
 * @input StyleX, the overlay color tokens, the touch press strength
 *   (`pressVars`), the theme's exit motion tokens and the indicator scope
 *   marker
 * @output Ready-made press styles for list rows, Button and the layer over a
 *   selection control's box. No package entry exports them.
 * @position Owner module of the private press attribute: the press controller
 *   (utils/pressFeedback.ts) writes it, and this file reads it.
 *   utils/interactionOverlay.cell.test.ts tests the row layer.
 */ __turbopack_context__.s([
    "controlPressLayerStyles",
    ()=>controlPressLayerStyles,
    "indicatorPressPaintStyles",
    ()=>indicatorPressPaintStyles,
    "rowPressLayerStyles",
    ()=>rowPressLayerStyles,
    "rowPressPaintStyles",
    ()=>rowPressPaintStyles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/reducedMotion.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/interactionOverlay.stylex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Indicator$2f$indicator$2e$markers$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Indicator/indicator.markers.stylex.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
// The overlay's arm selectors (interactionOverlay.stylex.ts), restated here:
// StyleX resolves a style's keys within its own file.
const ENABLED = ':where(:not(:disabled,[aria-disabled="true"]))';
const HOVER_HOVER = '@media (hover: hover)';
const COARSE = '@media (pointer: coarse)';
const PRESSED_ON = '[data-astryx-press="on"]';
const PRESSED_FADING = '[data-astryx-press="fading"]';
/**
 * A press in any of its states: the row layer exists only then, so at rest a
 * row's own `::before` and its stacking are untouched.
 */ const PRESSED_ANY = ':is([data-astryx-press="on"],[data-astryx-press="fading"])';
/** The element is pressed, and the press controller does not paint the press. */ const ACTIVE_UNPAINTED = `:active:not(${PRESSED_ON},${PRESSED_FADING})`;
/**
 * The nested controls that keep their own press, each at `:active`. It is
 * INTERACTIVE_SELECTORS (hooks/useClickableContainer.ts), which StyleX cannot
 * import, less the read-only ones. A RadioList row's own radio is the row's
 * action, so its press is the row's. CSS cannot tell it from a nested radio
 * input, so a nested one presses the circle too.
 * RadioListItem.press.source-build.test.mjs keeps the two lists equal.
 */ const NESTED_CONTROL_ACTIVE = 'button:not([aria-readonly="true"]):active,' + 'a:not([aria-readonly="true"]):active,' + 'input:not([type="radio"],[aria-readonly="true"]):active,' + 'select:not([aria-readonly="true"]):active,' + 'textarea:not([aria-readonly="true"]):active,' + '[role="button"]:not([aria-readonly="true"]):active,' + '[role="link"]:not([aria-readonly="true"]):active,' + '[role="checkbox"]:not([aria-readonly="true"]):active,' + '[role="radio"]:not([aria-readonly="true"]):active,' + '[role="switch"]:not([aria-readonly="true"]):active,' + '[role="tab"]:not([aria-readonly="true"]):active,' + '[role="menuitem"]:not([aria-readonly="true"]):active,' + '[role="option"]:not([aria-readonly="true"]):active,' + '[role="combobox"]:not([aria-readonly="true"]):active,' + '[role="listbox"]:not([aria-readonly="true"]):active,' + '[role="slider"]:not([aria-readonly="true"]):active,' + '[role="spinbutton"]:not([aria-readonly="true"]):active,' + '[data-pressable-container]:not([aria-readonly="true"]):active';
const PRESS_ALPHA = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pressVars"]['--astryx-press-alpha'];
const hoverImage = `linear-gradient(${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorVars"]['--color-overlay-hover']}, ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorVars"]['--color-overlay-hover']})`;
const pressedImage = `linear-gradient(${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorVars"]['--color-overlay-pressed']}, ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colorVars"]['--color-overlay-pressed']})`;
/** The overlay's paint, read back off the element (its gradient layer). */ const pressedOverlayImage = 'var(--_press-paint-image)';
/**
 * The overlay's strength release (interactionOverlay.stylex.ts), restated so
 * a fine pointer keeps it: the same keyframes, so the same animation.
 */ const pressRelease = "x10jkm1t-B";
/**
 * A press layer's clock as CSS: the strength release's clock, the theme's
 * exit duration, so the layer and the strength land together.
 */ const CELL_RELEASE = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["durationVars"]['--duration-exit'];
/** The same clock under Reduce Motion, no longer than the Reduce Motion fade. */ const CELL_RELEASE_REDUCED = `min(${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["durationVars"]['--duration-exit']}, ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["reducedMotionFadeConsts"].duration})`;
const REDUCED_MOTION = '@media (prefers-reduced-motion: reduce)';
/** Opacity 1 → 0: the row layer leaves; its fading arm runs it. */ const cellRelease = "x1jn504y-B";
/** The release's curve: the theme's exit easing, as the strength's. */ const RELEASE_EASE = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["easeVars"]['--ease-exit'];
/** A List divider's width (ListItem's bottom border). */ const DIVIDER_WIDTH = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["borderVars"]['--border-width'];
/** How far a highlighted row's tint reaches past its edge: one divider. */ const PAST_DIVIDER = `calc(-1 * ${DIVIDER_WIDTH})`;
/**
 * The surface a travelling List row rides on (travelling.stylex.ts sets it).
 * A row of a List with dividers adds it to its own shadows.
 */ const TRAVELLING_SURFACE = 'var(--_travelling-surface, none)';
/** The same surface as one shadow in a list of them. */ const TRAVELLING_SURFACE_LAYER = 'var(--_travelling-surface, 0 0 transparent)';
/**
 * A tint one divider tall, just above the row: over the row before's divider.
 * A travelling row keeps its surface under the tint.
 */ const tintAbove = (tint)=>`0 ${PAST_DIVIDER} 0 0 ${tint}, ${TRAVELLING_SURFACE_LAYER}`;
const rowPressLayerStyles = {
    cell: {
        kKwaWg: "x7ngsy6 x10ogxw0 xubczrd x18xnkjv",
        kKVMdj: "x14e4jsf x6su2wr",
        kHBbk8: "xif6eam",
        kgeoSG: "x1ocadqd",
        kEoFBp: "x1ukh9kf",
        kFcpXp: "xrkptjy",
        kxmVGU: "xjscm90",
        kPB484: "x1kec4ew",
        km8f2m: "x13r5q6d",
        kLkRvE: "x1dn949c",
        k5QlbN: "xw7rim2 xr9xsjc",
        k7EzDT: "x1bxn267",
        kQZAMR: "x1osot8d xbkwwzw",
        kZiNAr: "x10t12yn",
        k8Tatv: "x1dn5vsf",
        $$css: true
    },
    overDividers: {
        kGVxlE: "x1a8j72w x1gmmbal xnwmnb6 x1smloqv xmo6azi x1spxf8v xvofup6 xv3779j xrpmvov",
        k96MEf: "x1v1ro1q",
        k5Ofw7: "x1rj2gwv",
        $$css: true
    },
    cellWithoutLayer: {
        kKwaWg: "x18o3ruo",
        kKVMdj: "x14e4jsf",
        kHBbk8: "xrqzsdu",
        kgeoSG: "x1995whq",
        $$css: true
    },
    cellOnImage: {
        kKwaWg: "x7uyq82 x3f84ok x7ngsy6 x10ogxw0 xubczrd x18xnkjv xmvprkv xetgvay",
        $$css: true
    },
    cellOnImagePressOnly: {
        kKwaWg: "x7uyq82 x3f84ok x7ngsy6 x10ogxw0 xubczrd x18xnkjv",
        $$css: true
    }
};
const controlPressLayerStyles = {
    control: {
        k6sLGO: "x1mrddfy",
        $$css: true
    }
};
const rowPressPaintStyles = {
    checkboxRow: {
        "--_checkbox-row-press-paint": "x1ectg7s x1u7ooqu x1b9k41a",
        $$css: true
    },
    radioRow: {
        "--_radio-row-press": "x19rtxe xkwazwr",
        $$css: true
    }
};
const indicatorPressPaintStyles = {
    handDown: {
        "--_indicator-press-image": "x1dueop1 x189o2zt",
        "--_indicator-active-press": "x1qwhovg x858ff1",
        $$css: true
    },
    activeFill: {
        ks3ayO: "xyhc2n1 xur6jaf xtawv5c",
        $$css: true
    },
    image: {
        kNctxI: "x178sc5r x1d4iov5",
        $$css: true
    }
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/pressBox.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pressBoxAt",
    ()=>pressBoxAt,
    "pressBoxProps",
    ()=>pressBoxProps,
    "pressBoxesIn",
    ()=>pressBoxesIn
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file privateAttributes/pressBox.stylex.ts
 * @input A control's box: the non-text part around its input and indicator
 * @output pressBoxProps, which marks the box, pressBoxAt, which finds the
 *   marked box that a press starts in, and pressBoxesIn, which lists the
 *   marked boxes a surface owns
 * @position Owner module of the private press-box attribute: the only file
 *   that writes its name. CheckboxInput and RadioListItem mark their boxes.
 *   utils/boxHold.ts reads the mark. The press controller and the container
 *   rule give a surface that owns a box the fine-pointer press. No package
 *   entry exports it.
 */ const PRESS_BOX = 'data-astryx-press-box';
/**
 * The public pressable marker (utils/pressFeedback.ts PRESSABLE_ATTRIBUTE).
 * The press controller imports this module, so this module cannot import it.
 */ const PRESSABLE = '[data-astryx-pressable]';
const pressBoxProps = {
    [PRESS_BOX]: ''
};
function pressBoxAt(target, surface) {
    if (!(target instanceof Element)) {
        return null;
    }
    const box = target.closest(`[${PRESS_BOX}]`);
    return box instanceof HTMLElement && surface.contains(box) ? box : null;
}
function pressBoxesIn(surface) {
    return Array.from(surface.querySelectorAll(`[${PRESS_BOX}]`)).filter((box)=>box.closest(PRESSABLE) === surface);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/pressGroupItem.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isPressGroupItem",
    ()=>isPressGroupItem,
    "isTrackedByGroup",
    ()=>isTrackedByGroup,
    "pressGroupItemProps",
    ()=>pressGroupItemProps
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file privateAttributes/pressGroupItem.stylex.ts
 * @input Nothing: the private press-group-item attribute
 * @output pressGroupItemProps, which marks an action a group's tracker
 *   follows with the pointers it follows, and the readers isPressGroupItem
 *   and isTrackedByGroup
 * @position Owner module of the private press-group-item attribute: the only
 *   file that writes its name. AlertDialog's actions and a Button inside a
 *   tracking group carry the mark. The press controller
 *   (utils/pressFeedback.ts) leaves a press of those pointers to the group's
 *   tracker. No package entry exports it.
 */ const PRESS_GROUP_ITEM = 'data-astryx-press-group-item';
function pressGroupItemProps(pointerTypes) {
    return {
        [PRESS_GROUP_ITEM]: pointerTypes.join(' ')
    };
}
function isPressGroupItem(element) {
    return element.hasAttribute(PRESS_GROUP_ITEM);
}
function isTrackedByGroup(element, pointerType = null) {
    const marked = element.closest(`[${PRESS_GROUP_ITEM}]`);
    if (marked == null) {
        return false;
    }
    return pointerType == null || (marked.getAttribute(PRESS_GROUP_ITEM) ?? '').split(' ').includes(pointerType);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/pressHoldsDrag.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "holdsPressThroughDrag",
    ()=>holdsPressThroughDrag,
    "pressHoldsDragProps",
    ()=>pressHoldsDragProps
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file privateAttributes/pressHoldsDrag.stylex.ts
 * @input Whether a pressable's own drag moves under the finger
 * @output pressHoldsDragProps, which marks such a pressable, and
 *   holdsPressThroughDrag, which reads the mark
 * @position Owner module of the private press-holds-drag attribute: the only
 *   file that writes its name. Switch marks its row; the press controller
 *   (utils/pressFeedback.ts) keeps the press painted through that row's
 *   drag. No package entry exports it.
 */ const PRESS_HOLDS_DRAG = 'data-astryx-press-holds-drag';
function pressHoldsDragProps(holdsDrag) {
    return holdsDrag ? {
        [PRESS_HOLDS_DRAG]: ''
    } : {};
}
function holdsPressThroughDrag(element) {
    return element.hasAttribute(PRESS_HOLDS_DRAG);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/segmentDisabled.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSegmentDisabledOnItsOwn",
    ()=>isSegmentDisabledOnItsOwn,
    "segmentDisabledProps",
    ()=>segmentDisabledProps
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file privateAttributes/segmentDisabled.stylex.ts
 * @input A segment's own `isDisabled`
 * @output segmentDisabledProps, which marks a SegmentedControl segment
 *   disabled by its own `isDisabled`, and isSegmentDisabledOnItsOwn, which
 *   reads that mark
 * @position Owner module of the private segment-disabled attribute
 *   (`architecture:public-component-api` INV23): the only file that writes
 *   its name. SegmentedControl reads it to place the Tab stop of a control
 *   disabled with a reason (`component:SegmentedControl` FR2). No package
 *   entry exports it.
 */ const SEGMENT_DISABLED = 'data-astryx-segment-disabled';
function segmentDisabledProps(isDisabled) {
    return isDisabled ? {
        [SEGMENT_DISABLED]: ''
    } : {};
}
function isSegmentDisabledOnItsOwn(segment) {
    return segment.hasAttribute(SEGMENT_DISABLED);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/segmentTitle.stylex.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "segmentTitleProps",
    ()=>segmentTitleProps,
    "titleOfSegment",
    ()=>titleOfSegment
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file privateAttributes/segmentTitle.stylex.ts
 * @input Nothing
 * @output segmentTitleProps, which marks a SegmentedControl segment's title,
 *   and titleOfSegment, which finds that title in a segment
 * @position Owner module of the private segment-title attribute: the only
 *   file that writes its name. No package entry exports it.
 */ const SEGMENT_TITLE = 'data-astryx-segment-title';
const segmentTitleProps = {
    [SEGMENT_TITLE]: ''
};
function titleOfSegment(segment) {
    return segment.querySelector(`[${SEGMENT_TITLE}]`);
}
}),
];

//# sourceMappingURL=0aq__%40astryxdesign_core_dist_1_l1vonfm8t4q._.js.map