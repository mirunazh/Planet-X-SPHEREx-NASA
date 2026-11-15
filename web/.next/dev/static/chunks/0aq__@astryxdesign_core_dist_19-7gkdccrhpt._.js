(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/node_modules/@astryxdesign/core/dist/Badge/Badge.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/isRenderable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$textDirection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/textDirection.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
    const hasLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRenderable"])(label);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
        ref: ref,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('badge', {
            variant
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](styles.base, hasLabel && styles.grows, variants[variant], xstyle), className, style),
        title: labelTitle,
        ...props,
        children: [
            icon,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$textDirection$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textDirectionProps"])(label),
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
"[project]/web/node_modules/@astryxdesign/core/dist/Banner/Banner.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Button/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/Icon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Collapsible$2f$useCollapsible$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Collapsible/useCollapsible.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/composeEventHandlers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/isRenderable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$edgeCompensation$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layout/edgeCompensation.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Banner$2f$Banner$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Banner/Banner.generated.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEnglishFallback"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Banner$2f$Banner$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
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
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    const [isDismissed, setIsDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // The disclosure state machine is the shared one — Banner owns no collapse
    // state of its own. `collapsible={false}` disables it, and that is what
    // makes the content permanently visible.
    //
    // The one place Banner departs from the hook's defaults: `useCollapsible`
    // opens by default, a banner starts closed. Its header already carries the
    // message, so the content is supplementary — and this is the behaviour
    // Banner has always had.
    const collapsibleConfig = collapsible != null && typeof collapsible === 'object' ? collapsible : {};
    const { isEnabled: isCollapsible, isOpen: isExpanded, toggle: handleToggleExpand } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Collapsible$2f$useCollapsible$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCollapsible"])({
        isCollapsible: collapsible !== false && {
            ...collapsibleConfig,
            defaultIsOpen: collapsibleConfig.defaultIsOpen ?? false
        }
    });
    // The element focus came from before it entered the banner. Dismissing
    // unmounts the whole banner, dismiss button included, so without a handoff
    // the browser drops focus to <body> and a keyboard user loses their place.
    // ToastViewport makes the same handoff when a focused toast is dismissed.
    const focusOriginRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Links the expand/collapse toggle to the content region it shows/hides so
    // assistive tech can move from the button to its controlled content
    // (disclosure pattern). The region is conditionally rendered, so aria-controls
    // below is set only while it's mounted to avoid a dangling reference. A
    // non-collapsible banner has no toggle, so neither end of the link is used.
    const contentId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const defaultIconName = defaultIconNames[status];
    const iconColor = statusIconColor[status];
    const hasChildren = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRenderable"])(children);
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
    const showEndArea = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRenderable"])(endContent) || isDismissable || hasToggle;
    // Center items vertically when there's only a title (no description)
    // and the banner has action buttons
    const hasActions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRenderable"])(endContent) || isDismissable;
    const isSingleLine = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRenderable"])(description) && hasActions;
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        ref: ref,
        onFocusCapture: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composeEventHandlers"])(onFocusCapture, handleFocusCapture),
        onPointerDownCapture: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composeEventHandlers"])(onPointerDownCapture, handlePointerDownCapture),
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('banner-frame', {
            container,
            elevation
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](styles.root, elevationStyles[elevation], isCard && elevation !== 'none' && styles.rootElevatedCard, xstyle), className, style),
        role: isUrgentAlert ? undefined : role,
        ...frameProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('banner', {
                    container,
                    status
                }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](styles.header, isSingleLine && styles.headerCentered, hasStatusStyle(status) && statusStyles[status], isCard && (showContent ? styles.headerCardWithContent : styles.headerCardStandalone))),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRenderable"])(icon) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('banner-icon', {
                            status
                        }), {
                            className: "x78zum5 x6s0dn4 x2lah0s"
                        }) : {
                            className: "x78zum5 x6s0dn4 x2lah0s"
                        },
                        "aria-hidden": "true",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRenderable"])(icon) ? icon : defaultIconName != null ? /*#__PURE__*/ // Applied to the status <Icon> itself rather than the wrapper, so
                        // the element that paints the glyph is the element a theme
                        // targets — a 'banner-icon' 'status:X' color override beats the
                        // Icon's own variant from @layer astryx-theme (#4166).
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                            icon: defaultIconName,
                            size: "md",
                            color: iconColor,
                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('banner-icon', {
                                status
                            })
                        }) : null
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        role: isUrgentAlert ? 'alert' : undefined,
                        ...alertAriaProps,
                        ...{
                            0: {
                                className: "x78zum5 xdt5ytf xxhr3t x98rzlu xeuugli"
                            },
                            1: {
                                className: "x78zum5 xdt5ytf xxhr3t x98rzlu xeuugli xgualba"
                            }
                        }[!!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRenderable"])(endContent) << 0],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
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
                            isUrgentAlert && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRenderable"])(description) && ' ',
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRenderable"])(description) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('banner-description'), {
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
                    showEndArea && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](styles.endArea, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$edgeCompensation$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["edgeCompSlot"].inset(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacingVars"]['--spacing-2'])),
                        children: [
                            endContent,
                            hasToggle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                label: isExpanded ? t('@astryx.banner.collapse') : t('@astryx.banner.expand'),
                                tooltip: isExpanded ? t('@astryx.banner.collapse') : t('@astryx.banner.expand'),
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                                    icon: "chevronDown",
                                    size: "sm",
                                    color: "inherit",
                                    xstyle: [
                                        styles.chevron,
                                        isExpanded && styles.chevronExpanded
                                    ]
                                }),
                                onClick: handleToggleExpand,
                                className: hasStatusStyle(status) ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](statusControlStyles[status]).className : undefined,
                                "aria-expanded": isExpanded,
                                "aria-controls": showContent ? contentId : undefined,
                                isIconOnly: true
                            }),
                            isDismissable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                label: dismissName,
                                tooltip: dismissTooltip,
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                                    icon: "close",
                                    size: "sm",
                                    color: "inherit"
                                }),
                                onClick: handleDismiss,
                                className: hasStatusStyle(status) ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](statusControlStyles[status]).className : undefined,
                                isIconOnly: true
                            })
                        ]
                    })
                ]
            }),
            showContent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                id: hasToggle ? contentId : undefined,
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('banner-content', {
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
"[project]/web/node_modules/@astryxdesign/core/dist/Button/Button.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/useTooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$Spinner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Spinner/Spinner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/Icon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$VisuallyHidden$2f$VisuallyHidden$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/VisuallyHidden/VisuallyHidden.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$IconDefaultSizeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/IconDefaultSizeContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$IconSize$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/IconSize.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$edgeCompensation$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layout/edgeCompensation.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SizeContext$2f$SizeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/SizeContext/SizeContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$ButtonGroup$2f$ButtonGroupContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/ButtonGroup/ButtonGroupContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsHydrating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsHydrating.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$pressGroupContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/pressGroupContext.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressGroupItem$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/pressGroupItem.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$InputGroupContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/InputGroup/InputGroupContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$InputGroupInternalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/InputGroup/InputGroupInternalContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$groupStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/InputGroup/groupStyles.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMergedRefs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchHitArea$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/touchHitArea.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$buttonHitArea$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Button/buttonHitArea.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$internal$2f$touchHitArea$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/internal/touchHitArea.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$useLinkComponent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Link/useLinkComponent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/focusOutline.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/interactionOverlay.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$press$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/press.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$usePressFeedback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/usePressFeedback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Button$2f$Button$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Button/Button.generated.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/isRenderable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEnglishFallback"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Button$2f$Button$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
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
const SPINNER_DELAY = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["durationVars"]['--duration-medium-min'];
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
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRenderable"])(node)) {
        return true;
    }
    if (!/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"])(node) || node.type !== __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"]) {
        return false;
    }
    const { label } = node.props;
    return typeof label !== 'string' || label.trim() === '';
}
function Button({ label, variant = 'secondary', size: sizeProp, type = 'button', isDisabled = false, isLoading = false, isInterruptible = false, clickAction, icon, isIconOnly = false, width, elevation = 'none', children, endContent, tooltip, href, as, target, rel, xstyle, className, style, ref, ...props }) {
    const pressFeedback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$usePressFeedback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePressFeedback"])();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    const size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SizeContext$2f$SizeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSize"])(sizeProp, 'md');
    const buttonGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$ButtonGroup$2f$ButtonGroupContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useButtonGroup"])();
    const isSolidVariant = variant === 'primary' || variant === 'secondary' || variant === 'destructive';
    // A tracking group's tracker paints this button's pointer press. A menu
    // trigger is not tracked: it keeps its own press and opening.
    const groupPointers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$pressGroupContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PressGroupContext"]);
    const groupItemProps = groupPointers != null && !MENU_POPUPS.has(String(props['aria-haspopup'])) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressGroupItem$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pressGroupItemProps"])(groupPointers) : undefined;
    const isGroupTracked = groupItemProps != null;
    const inputGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$InputGroupContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInputGroup"])();
    const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    // clickAction is normally fire-once (submit/save/pay), so a same-tick
    // double-click must dedupe — which neither isPending nor useOptimistic do.
    // Hence the ref guard. Interruptible callers (e.g. ToggleButton) opt out so a
    // re-click can land and interrupt the in-flight action with a fresh one.
    const actionInFlightRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isLoadingState = isLoading || isPending;
    // The loading live region must exist empty before it receives "Loading":
    // many screen readers skip a live region that mounts already holding its
    // text, which is what a Button first rendered loading did (spec:AST-086
    // FR3). Only that case holds the text back, until the frame after the
    // region mounts; a Button mounted idle never re-renders for this.
    const [isLiveRegionReady, setIsLiveRegionReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Button.useState": ()=>!isLoadingState
    }["Button.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Button.useEffect": ()=>{
            if (isLiveRegionReady) {
                return;
            }
            const frame = requestAnimationFrame({
                "Button.useEffect.frame": ()=>setIsLiveRegionReady(true)
            }["Button.useEffect.frame"]);
            return ({
                "Button.useEffect": ()=>cancelAnimationFrame(frame)
            })["Button.useEffect"];
        }
    }["Button.useEffect"], [
        isLiveRegionReady
    ]);
    // Delay the spinner reveal for action-driven loading (clickAction's own
    // transition) so a fast action that settles within the delay does not flash
    // a spinner. Interruptible loading is delayed too, so rapid re-clicks settle
    // before any spinner shows. Explicit isLoading-only stays immediate, since
    // the consumer is deliberately showing it.
    const delaySpinner = isPending || isInterruptible;
    const groupDisabled = buttonGroup?.isDisabled ?? false;
    const inputGroupState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$InputGroupInternalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InputGroupInternalContext"]);
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
    const isHydrating = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsHydrating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsHydrating"])();
    const renderedType = buttonDisabled && isHydrating && (type === 'submit' || type === 'reset') ? 'button' : type;
    // The group draws one band for all its members: a ButtonGroup, or a
    // tracking group that says so. A disabled or busy-only button takes no tap.
    const groupDrawsBand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$pressGroupContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PressGroupBandContext"]);
    const hasHitArea = buttonGroup == null && !groupDrawsBand && !buttonDisabled;
    const hitAreaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchHitArea$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTouchHitArea"])(hasHitArea, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$buttonHitArea$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ButtonHitAreaContext"]));
    // isIconOnly prop is the source of truth for icon-only rendering.
    // When false (default), label is always rendered as visible text.
    const LinkComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$useLinkComponent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLinkComponent"])(as);
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
    const tooltipHook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTooltip"])({
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
        [__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$edgeCompensation$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EDGE_COMP_ATTR"]]: ''
    } : null;
    // Shared StyleX props for both button and link rendering
    const sharedStylexProps = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusOutlineProps"].focusVisible(styles.base, isIconOnly ? iconOnlySizeStyles[size] : sizeStyles[size], isIconOnly && styles.iconOnly, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interactionOverlayStyles"].backgroundImage, // The press the controller writes, on a layer under the label whose
    // release runs on the compositor.
    __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$press$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rowPressLayerStyles"].cell, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$press$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rowPressLayerStyles"].cellOnImage, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$press$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["controlPressLayerStyles"].control, isGroupTracked && styles.trackedOverlay, buttonDisabled && styles.inactive, isTrueDisabled && styles.disabled, buttonDisabled && styles.ariaDisabled, renderAsLink && styles.link, !buttonGroup && (isGroupTracked ? styles.pressableTracked : styles.pressable), buttonGroup && (buttonGroup.orientation === 'horizontal' ? groupStyles.horizontal : groupStyles.vertical), inputGroup != null && buttonGroup == null && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$groupStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupStyles"].buttonAddon, buttonGroup && (variant === 'primary' || variant === 'destructive') && (buttonGroup.orientation === 'horizontal' ? groupStyles.onSolidHorizontal : groupStyles.onSolidVertical), // Standalone floating buttons only — a grouped button's elevation is owned
    // by the ButtonGroup so the shared surface lifts as one unit.
    !buttonGroup && elevationStyles[elevation], width != null && dynamicStyles.width(width), isSolidVariant && (buttonGroup == null ? forcedColorsEdge.standalone : buttonGroup.orientation === 'horizontal' ? forcedColorsEdge.groupHorizontal : forcedColorsEdge.groupVertical), isSolidVariant && buttonGroup != null && (buttonGroup.orientation === 'horizontal' ? variant === 'destructive' ? forcedColorsEdgeColor.horizontalOnError : forcedColorsEdgeColor.horizontal : variant === 'destructive' ? forcedColorsEdgeColor.verticalOnError : forcedColorsEdgeColor.vertical), // AFTER the shared focus outline: the outline supplies width/style/offset
    // for every variant, and `destructive` re-colors just the ring to match
    // its own surface. Ordering is the mechanism — StyleX is last-wins.
    variants[variant], xstyle);
    const sharedMergedProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])(// Inside a group the group owns the surface's elevation, so the button
    // reflects the tier it actually paints rather than the prop it was handed.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('button', {
        variant,
        size,
        elevation: buttonGroup ? 'none' : elevation
    }), sharedStylexProps, className, style);
    const iconSize = iconSizeByButtonSize[size];
    const buttonContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            isLoadingState && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                ...{
                    0: {
                        className: "x10l6tqk x13vifvy x1o0tod xtijo5x x1ey2m1c xrvj5dj x1ku5rj1"
                    },
                    1: {
                        className: "x10l6tqk x13vifvy x1o0tod xtijo5x x1ey2m1c xrvj5dj x1ku5rj1 xqcmdr3 xb2rp9n xskzprw x17yabm6 x14q22ui"
                    }
                }[!!delaySpinner << 0],
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$Spinner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                    size: "sm",
                    shade: "inherit"
                })
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](styles.contentWrapper, // The content wrapper's `::after` carries the touch band, so the
                // button's own `::before` (the touch press) and `::after` (a
                // caller's decoration) stay as they are.
                hasHitArea && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$internal$2f$touchHitArea$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["touchHitAreaStyles"].layer, isLoadingState && (delaySpinner ? loadingStyles.hiddenContentDelayed : loadingStyles.hiddenContent)),
                "aria-hidden": isLoadingState || undefined,
                children: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRenderable"])(icon) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](styles.iconWrapper, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$IconSize$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconBoxSizeStyles"][iconSize]),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$IconDefaultSizeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IconDefaultSizeProvider"], {
                            value: iconSize,
                            children: icon
                        })
                    }),
                    isIconOnly ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        ...{
                            className: "xb3r6kr xlyipyv xeuugli"
                        },
                        children: children ?? label
                    }),
                    !isIconOnly && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRenderable"])(endContent) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        ...{
                            className: "x3nfvp2 x6s0dn4 x1heor9g"
                        },
                        children: endContent
                    })
                ]
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$VisuallyHidden$2f$VisuallyHidden$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VisuallyHidden"], {
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
    const mergedButtonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(ref, tooltip != null ? tooltipHook.ref : undefined, hitAreaRef);
    let element;
    if (renderAsLink) {
        element = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(LinkComponent, {
            ref: mergedButtonRef,
            href: href,
            target: target,
            rel: rel,
            ...inputGroup != null && buttonGroup == null ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$groupStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputGroupItemProps"] : undefined,
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
        element = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
            ref: mergedButtonRef,
            type: renderedType,
            ...inputGroup != null && buttonGroup == null ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$groupStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputGroupItemProps"] : undefined,
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
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
"[project]/web/node_modules/@astryxdesign/core/dist/Button/buttonHitArea.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
const BUTTON_HIT_AREA = {
    ownsDescendantTouches: false
};
const ButtonHitAreaContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSharedContext"])('ButtonHitAreaContext', 1, BUTTON_HIT_AREA);
ButtonHitAreaContext.displayName = 'ButtonHitAreaContext';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/ButtonGroup/ButtonGroupContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const ButtonGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('ButtonGroupContext', 1, null);
ButtonGroupContext.displayName = 'ButtonGroupContext';
function useButtonGroup() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(ButtonGroupContext);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Card/Card.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$container$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layout/container.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$containerCorners$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layout/containerCorners.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$padding$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layout/padding.stylex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)");
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
    const paddingToken = useThemeDefault ? undefined : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$padding$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["spacingStepToToken"][padding];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        ref: ref,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('card', {
            variant,
            elevation
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](styles.card, // A theme's own variant is not a key here: the lookup is undefined,
        // StyleX drops it, and the theme rule paints over base styles.
        variantStyles[variant], elevationStyles[elevation], hasFixedHeight && styles.scrollable, dynamicStyles.sizing(width ?? null, height ?? null, maxWidth ?? null, minHeight ?? null), ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$container$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["container"])(paddingToken == null ? {
            useThemeDefault: 'card'
        } : {
            paddingInnerX: paddingToken,
            paddingInnerY: paddingToken,
            paddingOuterX: paddingToken,
            paddingOuterY: paddingToken
        }), styles.corners, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$containerCorners$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["containerCornerStyles"].publish, // Applied after the container padding so the border-inset calc wins;
        // it reads the --container-padding-* vars set above.
        variant === 'default' && styles.withBorder, xstyle), className, style),
        ...props,
        children: children
    });
}
Card.displayName = 'Card';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/ClickableCard/ClickableCard.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$chainEventHandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/chainEventHandlers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Card/Card.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useClickableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useClickableContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$useLinkComponent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Link/useLinkComponent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/focusOutline.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/interactionOverlay.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$usePressFeedback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/usePressFeedback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMergedRefs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$disabledInteraction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/disabledInteraction.js [app-client] (ecmascript)");
// =============================================================================
// Styles — only the interactive layer, Card handles everything else
// =============================================================================
// The touch press's paint, declared by the shared overlay styles on the
// element the controller writes to (`pressedAlpha`) at the press's strength,
// 1 while on and 1 → 0 over the release, and inherited resolved by the
// `::after` that paints it. See interactionOverlay.stylex.ts.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
    const pressable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$usePressFeedback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePressFeedback"])();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const interactiveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const restoreFocusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // The isDisabled value of the link that just detached: a link card that
    // flips it replaces its hidden link (router component and plain anchor),
    // and only that replacement takes focus back.
    const detachedDisabledRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // A focused link remounts when isDisabled changes: the replacement takes
    // focus back, without scrolling, if focus fell to the page. Any other
    // detach and attach (a hidden Activity or Suspense boundary revealed
    // again) leaves focus where the person put it.
    const setInteractiveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ClickableCard.useCallback[setInteractiveRef]": (node)=>{
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
        }
    }["ClickableCard.useCallback[setInteractiveRef]"], [
        isDisabled
    ]);
    const LinkComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$useLinkComponent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLinkComponent"])();
    const { onClick, onMouseUp, onPointerDown } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useClickableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClickableContainer"])({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Card$2f$Card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        ref: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(ref, containerRef),
        ...isDisabled ? undefined : pressable,
        width: width,
        height: height,
        maxWidth: maxWidth,
        padding: padding,
        variant: variant,
        elevation: elevation,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('clickable-card', {
            variant
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusOutlineProps"].focusWithin(), classNameProp, style),
        xstyle: [
            styles.interactive,
            hasBorder ? styles.bordered : styles.borderless,
            !isDisabled && styles.overlay,
            // The touch press's strength and release, on the element the
            // controller writes to; the `::after` above paints off it.
            !isDisabled && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interactionOverlayStyles"].pressedAlpha,
            !isDisabled && hasBorder && styles.borderedHoverOnPointer,
            isDisabled && styles.disabled,
            xstyleProp
        ],
        onClick: !isDisabled ? onClick : undefined,
        onMouseUp: !isDisabled ? handleMouseUp : undefined,
        onPointerDown: !isDisabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$chainEventHandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chainEventHandlers"])(onPointerDown, onPointerDownProp) : onPointerDownProp,
        ...props,
        children: [
            isLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(LinkRoot, {
                ref: setInteractiveRef,
                href: isDisabled ? undefined : href,
                target: isDisabled ? undefined : target,
                role: isDisabled ? 'link' : undefined,
                ...isDisabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$disabledInteraction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disabledInteractionProps"])() : null,
                "aria-label": label,
                "aria-disabled": isDisabled || undefined,
                tabIndex: 0,
                ...{
                    className: "x10l6tqk x1i1rx1s xjm9jq1 x1717udv xkdpibf xb3r6kr xzpqnlu xuxw1ft xc342km"
                }
            }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                ref: setInteractiveRef,
                type: "button",
                "aria-label": label,
                "aria-disabled": isDisabled || undefined,
                onClick: onClickProp,
                ...isDisabled ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$disabledInteraction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["disabledInteractionProps"])() : null,
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
"[project]/web/node_modules/@astryxdesign/core/dist/Collapsible/CollapsibleGroupContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const CollapsibleGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSharedContext"])('CollapsibleGroupContext', 1, null);
CollapsibleGroupContext.displayName = 'CollapsibleGroupContext';
const CollapsibleGroupPresentationContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('CollapsibleGroupPresentationContext', 1, null);
CollapsibleGroupPresentationContext.displayName = 'CollapsibleGroupPresentationContext';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Collapsible/useCollapsible.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Collapsible$2f$CollapsibleGroupContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Collapsible/CollapsibleGroupContext.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
function useCollapsible(options) {
    const { isCollapsible, value } = options;
    // Check for CollapsibleGroup context
    const group = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Collapsible$2f$CollapsibleGroupContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollapsibleGroupContext"]);
    const isControlledByGroup = group != null && value != null;
    // Parse config: true → empty config, object → as-is, false/undefined → null
    const config = isCollapsible === true ? {} : isCollapsible ? isCollapsible : null;
    const isEnabled = config != null;
    // Internal state for uncontrolled mode
    const [internalIsOpen, setInternalIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useCollapsible.useState": ()=>{
            if (isControlledByGroup) {
                return true;
            } // group manages this
            if (config?.isOpen !== undefined) {
                return config.isOpen;
            }
            return config?.defaultIsOpen ?? true;
        }
    }["useCollapsible.useState"]);
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
"[project]/web/node_modules/@astryxdesign/core/dist/Field/Field.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Field",
    ()=>Field
]);
/**
 * @file Field.tsx
 * @input Uses React, StyleX, BaseProps, FieldLabel/FieldStatus, FormLayoutContext, Text, VisuallyHidden, theme/status utilities
 * @output Exports Field component, FieldProps
 * @position Core implementation; consumed by index.ts, tested by Field.test.tsx
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/Field/Field.doc.mjs (props table, features, implementation notes)
 * - /packages/core/src/Field/Field.test.tsx (tests for new/changed behavior)
 * - /packages/core/src/Field/index.ts (exports if types change)
 * - /apps/storybook/stories/Field.stories.tsx (storybook stories)
 * - /packages/cli/assets/templates/blocks/components/Field/ (showcase blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$FieldLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Field/FieldLabel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FieldStatus$2f$FieldStatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/FieldStatus/FieldStatus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FieldStatus$2f$useFieldStatusAnnouncement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/FieldStatus/useFieldStatusAnnouncement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useDevWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useDevWarning.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FormLayout$2f$FormLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/FormLayout/FormLayoutContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Text/Text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$VisuallyHidden$2f$VisuallyHidden$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/VisuallyHidden/VisuallyHidden.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
const styles = {
    container: {
        k1xSpc: "x78zum5",
        kXwgrk: "xdt5ytf",
        kHBbk8: "xc8icb0",
        k7Eaqz: "xeuugli",
        $$css: true
    },
    containerGap: {
        kOIVth: "xzye2dw",
        $$css: true
    },
    horizontalLabels: {
        k1xSpc: "xjp7ctv",
        $$css: true
    },
    attachedStatusLayer: {
        kVAEAm: "x1n2onr6",
        kY2c9j: "x8knxv4",
        $$css: true
    }
};
// Dynamic style for the consumer-controlled field width. Numbers are treated
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
function Field({ label, isLabelHidden = false, description, inputID, labelID, isGroupLabel = false, descriptionID, isOptional = false, isRequired = false, isDisabled = false, labelIcon, status, labelTooltip, statusVariant = 'attached', width, xstyle, children, className, style, ref, ...props }) {
    const { direction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FormLayout$2f$FormLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLayoutContext"]);
    const isHorizontalLabels = direction === 'horizontal-labels';
    const resolvedDescriptionID = descriptionID ?? (description ? `${inputID}-desc` : undefined);
    const resolvedMessageID = status?.messageID ?? (status?.message ? `${inputID}-status` : undefined);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useDevWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDevWarning"])('Field', 'isOptional and isRequired are mutually exclusive. isOptional takes precedence.', isOptional && isRequired);
    const labelNode = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$FieldLabel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldLabel"], {
        label: label,
        inputID: inputID,
        labelID: labelID,
        isGroupLabel: isGroupLabel,
        isLabelHidden: isLabelHidden,
        isDisabled: isDisabled,
        isOptional: isOptional,
        isRequired: isRequired,
        labelIcon: labelIcon,
        labelTooltip: labelTooltip,
        description: isHorizontalLabels ? undefined : description,
        descriptionID: isHorizontalLabels ? undefined : resolvedDescriptionID
    });
    // The 'tooltip' variant surfaces status through the input's on-field icon
    // tooltip, so Field renders no message box for it. Without a FieldStatus
    // nothing would speak the message, so Field announces it on the same
    // channel and timing FieldStatus uses: placement changes where the message
    // is shown, not whether a screen-reader user hears it.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FieldStatus$2f$useFieldStatusAnnouncement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldStatusAnnouncement"])(statusVariant === 'tooltip' ? status?.message : undefined, status?.type);
    const statusNode = status?.message && statusVariant !== 'tooltip' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FieldStatus$2f$FieldStatus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldStatus"], {
        type: status.type,
        message: status.message,
        id: resolvedMessageID,
        variant: statusVariant,
        xstyle: statusVariant === 'attached' ? styles.attachedStatusLayer : undefined
    }) : null;
    // ─── Horizontal-labels mode ───────────────────────────────────────────
    // Use display:contents so the parent grid's `auto 1fr` columns place
    // the label in column 1 and the input group in column 2. Description
    // and status are grouped with the input in column 2.
    // The label wrapper gets top padding to align label text with input text.
    if (isHorizontalLabels) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
            ref: ref,
            ...props,
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('field', {
                layout: 'horizontal-labels'
            }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](styles.horizontalLabels, xstyle), className, style),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                    ...{
                        className: "x1enrzb7"
                    },
                    children: labelNode
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                    ...{
                        className: "x78zum5 xdt5ytf xc8icb0 x19nvjgn xlumz0n x1qs65gq"
                    },
                    children: [
                        description && (isLabelHidden ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$VisuallyHidden$2f$VisuallyHidden$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VisuallyHidden"], {
                            id: resolvedDescriptionID,
                            children: description
                        }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                            type: "supporting",
                            display: "block",
                            id: resolvedDescriptionID,
                            children: description
                        })),
                        children,
                        statusNode
                    ]
                })
            ]
        });
    }
    // ─── Default mode (vertical / horizontal) ─────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        ref: ref,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('field'), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](styles.container, !isLabelHidden && styles.containerGap, width != null && dynamicStyles.width(width), xstyle), className, style),
        ...props,
        children: [
            labelNode,
            statusVariant === 'attached' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
                ...{
                    className: "x78zum5 xdt5ytf xc8icb0 x19nvjgn xlumz0n x1qs65gq"
                },
                children: [
                    children,
                    statusNode
                ]
            }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    children,
                    statusNode
                ]
            })
        ]
    });
}
Field.displayName = 'Field';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Field/FieldLabel.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/Icon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InfoTip$2f$InfoTip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/InfoTip/InfoTip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useInputContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useInputContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useResolvedRequired$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useResolvedRequired.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Field$2f$FieldLabel$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Field/FieldLabel.generated.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEnglishFallback"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Field$2f$FieldLabel$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
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
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    // The visible indicator only; each control resolves its own `aria-required`
    // so the unmarked majority is still announced.
    const { showsRequiredMarker: showRequired, showsOptionalMarker: showOptional } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useResolvedRequired$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResolvedOptionality"])({
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
    const descriptionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const controlRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FieldLabel.useMemo[controlRef]": ()=>({
                get current () {
                    return inputID == null ? null : descriptionRef.current?.ownerDocument.getElementById(inputID) ?? null;
                },
                set current (_value){}
            })
    }["FieldLabel.useMemo[controlRef]"], [
        inputID
    ]);
    const descriptionClickProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useInputContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInputContainer"])({
        containerRef: descriptionRef,
        inputRef: controlRef,
        disabled: !forwardsDescriptionClick
    });
    const labelContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            labelIcon && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderIconSlot"])(labelIcon, {
                size: 'sm',
                color: 'inherit'
            }),
            label,
            statusText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
                ...{
                    className: "x1sodnla x141an7d x1ltkj2j xv1l7n4"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                        "aria-hidden": "true",
                        children: " \u2219 "
                    }),
                    statusText
                ]
            })
        ]
    });
    const labelElement = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(LabelElement, {
        ref: ref,
        id: labelID,
        htmlFor: isGroupLabel ? undefined : inputID,
        ...rest,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])(// A control that knows what kind of label this is passes its own
        // target down (CheckboxInput's `checkbox-label`, Switch's
        // `switch-label`); it arrives as `className` and composes onto this
        // one. The label itself does not describe its own placement — it
        // cannot know it, and any encoding it guessed would be wrong for a
        // caller that arranges labels differently (Field's
        // `horizontal-labels`).
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('field-label'), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](styles.label, isDisabled && styles.labelDisabled, isLabelHidden && styles.srOnly, xstyle), className, style),
        children: labelContent
    });
    const labelWithHelp = labelTooltip ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InfoTip$2f$InfoTip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InfoTip"], {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
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
"[project]/web/node_modules/@astryxdesign/core/dist/Field/InputClearButton.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InputClearButton",
    ()=>InputClearButton,
    "InternalInputClearButton",
    ()=>InternalInputClearButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Button/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$buttonHitArea$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Button/buttonHitArea.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$hitArea$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/hitArea.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/Icon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Field$2f$InputClearButton$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Field/InputClearButton.generated.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEnglishFallback"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Field$2f$InputClearButton$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
// WebKit moves a tap toward a clickable element near it. The field's other
// parts, such as the chevron, are not clickable themselves. So a band that
// comes near one takes a tap on it. Toward a part, the band reaches at most
// this far, in px.
const PART_REACH = 2;
/**
 * How far the clear button's band grows on each side. It grows toward the
 * minimum target and stops at half the gap to each of the field's other parts
 * (the chevron, the status icon, the spinner). A tap on a part is the
 * field's. No hit-area neighbour stops the band there, because the parts are
 * not interactive. Toward a part beside it, the band also stops at
 * `PART_REACH`.
 */ function clearButtonGrowth(target, toLayout, element) {
    const parts = [];
    for (const part of element.parentElement?.children ?? []){
        const box = part.getBoundingClientRect();
        if (part !== element && box.width > 0 && box.height > 0) {
            parts.push(toLayout({
                left: box.left,
                top: box.top,
                right: box.right,
                bottom: box.bottom
            }));
        }
    }
    const insets = {
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$hitArea$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clampedHitInsets"])(target, parts)
    };
    for (const rect of parts){
        if (rect.top < target.bottom && target.top < rect.bottom) {
            if (rect.left >= target.right) {
                insets.right = Math.min(insets.right, PART_REACH);
            } else if (rect.right <= target.left) {
                insets.left = Math.min(insets.left, PART_REACH);
            }
        }
    }
    return insets;
}
const CLEAR_BUTTON_HIT_AREA = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$buttonHitArea$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BUTTON_HIT_AREA"],
    growth: clearButtonGrowth
};
const styles = {
    button: {
        kZKoxP: "x1qx5ct2",
        kmuXW: "x2lah0s",
        $$css: true
    }
};
function renderInputClearButton({ label, tooltip, onClick, onPointerDown, onClickCapture, xstyle, iconClassName, ...rest }) {
    const { className: iconTargetClassName } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('input-clear-icon');
    const { className: buttonTargetClassName } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('input-clear-button');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$buttonHitArea$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ButtonHitAreaContext"], {
        value: CLEAR_BUTTON_HIT_AREA,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pickDataAttributes"])(rest),
            variant: "ghost",
            size: "sm",
            label: label,
            tooltip: tooltip,
            className: buttonTargetClassName,
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                icon: "close",
                size: "sm",
                color: "secondary",
                className: iconClassName != null ? `${iconTargetClassName} ${iconClassName}` : iconTargetClassName
            }),
            onPointerDown: (e)=>{
                // WebKit drops the click of a touch whose pointerdown is cancelled.
                // For touch, the mousedown handler below keeps focus in the field.
                if (e.pointerType !== 'touch') {
                    e.preventDefault();
                }
                onPointerDown?.(e);
            },
            onMouseDown: (e)=>e.preventDefault(),
            onClick: onClick,
            onClickCapture: onClickCapture,
            isIconOnly: true,
            xstyle: [
                styles.button,
                xstyle
            ]
        })
    });
}
function InputClearButton(props) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    return renderInputClearButton({
        ...props,
        tooltip: t('@astryx.inputClearButton.tooltip')
    });
}
function InternalInputClearButton(props) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    return renderInputClearButton({
        ...props,
        tooltip: t('@astryx.inputClearButton.tooltip')
    });
}
InputClearButton.displayName = 'InputClearButton';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Field/fieldParts.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFieldInputStyling",
    ()=>useFieldInputStyling
]);
/**
 * @file fieldParts.ts
 * @input Uses BaseProps, FormLayoutContext, InputGroupContext, useDevWarning
 * @output Exports FieldInputBaseProps, the container and control part style
 *   props, and useFieldInputStyling
 * @position Shared styling contract for every Field-composed input
 *   (family:input-fields FR10): base props reach the primary semantic control,
 *   there is no root `xstyle`/`className`/`style`, `container*` styles the Field
 *   box where one renders, and `control*` styles the visual control box.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/Field/fieldInputFamily.test.tsx (family registry and type checks)
 * - /packages/core/src/Field/index.ts (type exports)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FormLayout$2f$FormLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/FormLayout/FormLayoutContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$InputGroupContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/InputGroup/InputGroupContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useDevWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useDevWarning.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
;
/** Root styling props a Field-composed input does not accept. */ /** Styling for the Field box (label, control, and status together). */ // A prop mixin for Field-composed inputs, not a component props type.
// eslint-disable-next-line @astryx/require-base-props, @astryx/require-ref-prop
/** Styling for the visual control box (border, background, icons, end controls). */ // A prop mixin for Field-composed inputs, not a component props type.
// eslint-disable-next-line @astryx/require-base-props, @astryx/require-ref-prop
/**
 * BaseProps for a Field-composed input. Root `xstyle`, `className`, and `style`
 * are omitted, so passing one is a type error; style the field through
 * `container*` and the control box through `control*`.
 */ /** Styling props to pass to Field's own `xstyle`/`className`/`style`. */ const ROOT_STYLING_MESSAGE = '`xstyle`, `className`, and `style` are not supported on Field-composed inputs and were ignored. ' + 'Style the field with `containerXstyle`/`containerClassName`/`containerStyle` and the control box with ' + '`controlXstyle`/`controlClassName`/`controlStyle`. `astryx upgrade` rewrites existing usage.';
const CONTAINER_WITHOUT_FIELD_MESSAGE = '`containerXstyle`/`containerClassName`/`containerStyle` have no effect here because no Field box renders ' + '(inside InputGroup or a `horizontal-labels` FormLayout). Inside InputGroup, style the InputGroup.';
function useFieldInputStyling(component, restProps, containerProps) {
    const inputGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$InputGroupContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInputGroup"])();
    const { direction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FormLayout$2f$FormLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLayoutContext"]);
    const hasFieldBox = inputGroup == null && direction !== 'horizontal-labels';
    const untyped = restProps;
    const hasRootStyling = untyped.xstyle != null || untyped.className != null || untyped.style != null;
    let rest = restProps;
    if (hasRootStyling) {
        const { xstyle: _xstyle, className: _className, style: _style, ...remaining } = untyped;
        rest = remaining;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useDevWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDevWarning"])(component, ROOT_STYLING_MESSAGE, hasRootStyling);
    const { containerXstyle, containerClassName, containerStyle } = containerProps;
    const hasContainerStyling = containerXstyle != null || containerClassName != null || containerStyle != null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useDevWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDevWarning"])(component, CONTAINER_WITHOUT_FIELD_MESSAGE, hasContainerStyling && !hasFieldBox);
    return {
        rest,
        hasFieldBox,
        container: hasFieldBox ? {
            xstyle: containerXstyle,
            className: containerClassName,
            style: containerStyle
        } : {}
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Field/inputDisabledFocus.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file inputDisabledFocus.ts
 * @input Uses StyleX and theme tokens
 * @output inputDisabledFocusStyles (internal; not re-exported from Field/index.ts):
 *   the one place every field's disabled focus ring is defined
 * @position Field wrapper style shared by the text-entry fields
 */ __turbopack_context__.s([
    "inputDisabledFocusStyles",
    ()=>inputDisabledFocusStyles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
;
;
;
const inputDisabledFocusStyles = {
    ring: {
        kVAM5u: "xvy26l8 x16it14f xqgemzk",
        kGVxlE: "x1gnnqk1 xwmge8v",
        $$css: true
    },
    nestedRing: {
        kVAM5u: "xvy26l8 x1ta6xgg xa99h4j",
        kGVxlE: "x1gnnqk1 x151j4nw",
        $$css: true
    },
    withinRing: {
        kVAM5u: "xvy26l8 x6q1khz xohk9ji",
        kGVxlE: "x1gnnqk1 xuihb5h",
        $$css: true
    },
    inputFocusRing: {
        kVAM5u: "xvy26l8 x2uiyk xq9p6t4",
        kGVxlE: "x1gnnqk1 xxsos93",
        $$css: true
    }
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Field/inputStyles.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file inputStyles.stylex.ts
 * @input Uses theme tokens (color, spacing, radius, shadow, transition)
 * @output Exports shared input wrapper appearance styles, and the text field
 *   timing that shows the focus look at once under a coarse pointer
 * @position Shared styles consumed by TextInput, TextArea, NumberInput, DateInput,
 *   TimeInput, Selector, Typeahead, and Tokenizer
 *
 * Centralizes the input wrapper appearance (borders, focus outlines, hover shadows,
 * disabled state, status variants) so all input components stay in sync.
 * Individual components layer their own overrides (padding, alignment, etc.)
 * via stylex.props composition.
 */ __turbopack_context__.s([
    "inputStatusBorderStyles",
    ()=>inputStatusBorderStyles,
    "inputStatusFocusStyles",
    ()=>inputStatusFocusStyles,
    "inputStatusFocusWithinStyles",
    ()=>inputStatusFocusWithinStyles,
    "inputStatusHoverShadowStyles",
    ()=>inputStatusHoverShadowStyles,
    "inputWrapperStyles",
    ()=>inputWrapperStyles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
;
;
;
const inputWrapperStyles = {
    base: {
        kB7OPa: "x9f619",
        kVAEAm: "x1n2onr6",
        kY2c9j: "x1vjfegm",
        k1xSpc: "x78zum5",
        kGNEyG: "x6s0dn4",
        kOIVth: "x1txdalj",
        k8WAf4: "xu0wf1k",
        kg3NbH: "xf314gf",
        kMzoRj: "x1litavf",
        ksu8eU: "x1y0btm7",
        kVAM5u: "xvy26l8 x6q1khz xohk9ji",
        "--_field-radius": "x1832zxr",
        kaIpWk: "xvdfih8",
        kWkggS: "x10xzikg",
        k1ekBW: "x12zzom9",
        kIyJzY: "xuedmi6 x12w9bfk",
        kAMwcw: "xlr8y92",
        kGVxlE: "x1gnnqk1 x1xqjsvb xuihb5h",
        kI3sdo: "x1a2a7pz",
        $$css: true
    },
    disabled: {
        kkrTdU: "xt0e3qv",
        kSiTet: "xbyyjgo",
        kVAM5u: "xvy26l8",
        kGVxlE: "x1gnnqk1",
        $$css: true
    },
    textField: {
        kIyJzY: "xuedmi6 xuh6ohu xzyh0sv",
        $$css: true
    }
};
const inputStatusBorderStyles = {
    warning: {
        kVAM5u: "xrwcrn0 x1pl5oko xohk9ji",
        $$css: true
    },
    error: {
        kVAM5u: "xw4o254 x1kaqvcv xohk9ji",
        $$css: true
    },
    success: {
        kVAM5u: "x1cu78b5 x1lbxt8w xohk9ji",
        $$css: true
    }
};
const inputStatusHoverShadowStyles = {
    warning: {
        kGVxlE: "x1gnnqk1 x9156jc",
        $$css: true
    },
    error: {
        kGVxlE: "x1gnnqk1 x1bgmis8",
        $$css: true
    },
    success: {
        kGVxlE: "x1gnnqk1 x8wp45d",
        $$css: true
    }
};
const inputStatusFocusWithinStyles = {
    warning: {
        kVAM5u: "xrwcrn0 x1pl5oko xohk9ji",
        $$css: true
    },
    error: {
        kVAM5u: "xw4o254 x1kaqvcv xohk9ji",
        $$css: true
    },
    success: {
        kVAM5u: "x1cu78b5 x1lbxt8w xohk9ji",
        $$css: true
    }
};
const inputStatusFocusStyles = {
    warning: {
        kVAM5u: "xrwcrn0 xy8f8gr",
        $$css: true
    },
    error: {
        kVAM5u: "xw4o254 xfpexjq",
        $$css: true
    },
    success: {
        kVAM5u: "x1cu78b5 x1p6lex4",
        $$css: true
    }
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Field/textEntryTraits.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file textEntryTraits.ts
 * @input The keyboard-trait props a text field accepts
 * @output EnterKeyHint, InputMode and AutoCapitalize (the package entry exports
 *   these), TextEntryTraitProps and textEntryTraitAttributes
 * @position Shared by TextInput, TextArea and the search inputs: the one place
 *   that says how a field tells a touch keyboard what it holds
 *
 * SYNC: When modified, update:
 * - /packages/core/src/TextInput/TextInput.tsx and TextInput.doc.mjs
 * - /packages/core/src/TextArea/TextArea.tsx and TextArea.doc.mjs
 * - /packages/core/src/Typeahead/BaseTypeahead.tsx, Field/PanelSearchInput.tsx
 *   and CommandPalette/CommandPaletteInput.tsx (the search inputs)
 * - /packages/core/src/Field/index.ts (type exports)
 */ /**
 * What the Return key of a touch keyboard says. iOS gives `done`, `go`,
 * `next`, `search` and `send` their own key (a glyph on iOS 26: a checkmark,
 * an arrow, a chevron, a magnifier, an up arrow); `enter` and `previous` keep
 * the plain Return key. Chrome on Android (Gboard) gives every value its own
 * key; with no hint, a single-line field's key reads Next while another field
 * follows and a multi-line field's keeps Return, and a `type="url"` field
 * shows Next instead of `go` while another field follows.
 */ /**
 * Which touch keyboard a field asks for, by the HTML standard's `inputmode`
 * values. `numeric` brings up the number pad, and on iOS `search` brings up
 * the web-search keyboard (a period key and a Go key, whatever
 * `enterKeyHint` says).
 */ /**
 * When a touch keyboard capitalizes as you type: `off` and `none` never,
 * `on` and `sentences` at the start of each sentence (the HTML standard names
 * each of these two states twice), `words` at the start of each word, and
 * `characters` every letter.
 */ /**
 * Keyboard traits of a text field: a prop mixin for TextInput and TextArea,
 * not a component's props. A touch keyboard reads these traits from the
 * focused element. An absent prop renders no attribute, so the browser keeps
 * its own default (on iOS a field capitalizes sentences, except a URL field).
 */ /** The native attributes the traits render as. */ /**
 * Maps keyboard-trait props onto the native attributes for the editable
 * element. Absent props produce no attribute.
 *
 * @example
 * ```
 * <input {...textEntryTraitAttributes({enterKeyHint: 'search', hasAutoCorrect: false})} />
 * ```
 */ __turbopack_context__.s([
    "textEntryTraitAttributes",
    ()=>textEntryTraitAttributes
]);
function textEntryTraitAttributes({ enterKeyHint, inputMode, autoCapitalize, hasAutoCorrect }) {
    const attributes = {};
    if (enterKeyHint != null) {
        attributes.enterKeyHint = enterKeyHint;
    }
    if (inputMode != null) {
        attributes.inputMode = inputMode;
    }
    if (autoCapitalize != null) {
        attributes.autoCapitalize = autoCapitalize;
    }
    if (hasAutoCorrect != null) {
        attributes.autoCorrect = hasAutoCorrect ? 'on' : 'off';
    }
    return attributes;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/FieldStatus/FieldStatus.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FieldStatus",
    ()=>FieldStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useEntryAnimation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useEntryAnimation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/Icon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FieldStatus$2f$useFieldStatusAnnouncement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/FieldStatus/useFieldStatusAnnouncement.js [app-client] (ecmascript)");
/**
 * Maps each status type to its status glyph. Mirrors the mapping the input
 * controls already use for the on-field status affordance, so the detached
 * message shows the same icon a consumer sees elsewhere for that status.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
const ATTACHED_OVERLAP = `var(--_field-status-overlap, ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacingVars"]['--spacing-1-5']})`;
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
    const entryStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useEntryAnimation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEntryAnimation"])('slideDown');
    // Announce-on-mount is intentional: callers conditionally mount FieldStatus
    // when a status appears (and whole forms can mount with a server-side
    // validation error already present), and both cases must be heard.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FieldStatus$2f$useFieldStatusAnnouncement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldStatusAnnouncement"])(message, type);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        ref: ref,
        id: id,
        ...rest,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('field-status', {
            type,
            variant
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](styles.base, entryStyle, variant === 'attached' ? styles.attached : styles.detached, colorStyles[type], xstyle), className, style),
        children: variant === 'detached' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
            ...{
                className: "x78zum5 x1cy8zhl xzye2dw"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    ...{
                        className: "x3nfvp2 x6s0dn4 x14o5nre x2lah0s"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                        icon: statusIconMap[type],
                        size: "sm",
                        color: "inherit",
                        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('field-status-icon', {
                            type
                        })
                    })
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    children: message
                })
            ]
        }) : message
    });
}
FieldStatus.displayName = 'FieldStatus';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/FieldStatus/useFieldStatusAnnouncement.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounce$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useAnnounce.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
function useFieldStatusAnnouncement(message, type) {
    const announce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounce$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnnounce"])();
    // Syncs the live region with the status message.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFieldStatusAnnouncement.useEffect": ()=>{
            if (message) {
                announce(message, type === 'error' ? 'assertive' : 'polite');
            }
        }
    }["useFieldStatusAnnouncement.useEffect"], [
        announce,
        message,
        type
    ]);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/FormLayout/FormLayoutContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
const FormLayoutContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('FormLayoutContext', 1, {
    direction: 'vertical'
});
FormLayoutContext.displayName = 'FormLayoutContext';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Icon/Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/useTheme.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$globalIconRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/globalIconRegistry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeRefs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$IconDefaultSizeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/IconDefaultSizeContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$IconSize$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/IconSize.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
    const size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$IconDefaultSizeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIconSize"])(sizeProp);
    // Derive ARIA from `label`: decorative (aria-hidden) by default, or a
    // meaningful image (role="img" + aria-label) when `label` is non-empty.
    const a11yProps = getIconA11yProps(label);
    // String mode: resolve from icon registry, wrap in styled span
    if (typeof icon === 'string') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(IconFromRegistry, {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(IconComponent, {
        ref: ref,
        ...a11yProps,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('icon', {
            size,
            color
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](styles.root, colorStyles[color], __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$IconSize$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["iconSizeStyles"][size], xstyle), className ?? undefined, style),
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
    const themeName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useThemeName"])();
    const resolvedIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$globalIconRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveIcon"])(name, themeName, {
        size,
        variant
    });
    // The glyph can change while the span stays. Attach the ref again when it
    // does.
    const attachSvgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "IconFromRegistry.useCallback[attachSvgRef]": (span)=>svgRef == null ? undefined : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeRefs"])(svgRef)(span?.querySelector('svg') ?? null)
    }["IconFromRegistry.useCallback[attachSvgRef]"], // eslint-disable-next-line @eslint-react/exhaustive-deps -- resolveIcon's inputs: a new glyph gets a new attach, and a function entry's new element each render does not.
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
        ref: svgRef == null ? undefined : attachSvgRef,
        ...a11yProps,
        ...restSpanProps,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('icon', {
            size,
            color
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](styles.span, colorStyles[color], registrySizeStyles[size], xstyle), className ?? undefined, style),
        children: resolvedIcon
    });
}
function renderIconSlot(icon, props) {
    if (typeof icon === 'string') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Icon, {
            icon: icon,
            ...props
        });
    }
    if (typeof icon === 'function' || typeof icon === 'object' && icon !== null && 'render' in icon) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Icon, {
            icon: icon,
            ...props
        });
    }
    return icon;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Icon/IconDefaultSizeContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const IconDefaultSizeContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('IconDefaultSizeContext', 1, null);
IconDefaultSizeContext.displayName = 'IconDefaultSizeContext';
const IconDefaultSizeProvider = IconDefaultSizeContext.Provider;
function useIconSize(size) {
    const contextualSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(IconDefaultSizeContext);
    return size ?? contextualSize ?? 'md';
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Icon/IconSize.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/Icon/defaultIcons.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultIcons",
    ()=>defaultIcons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
    /** ✕ — two diagonal lines */ close: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M6 6l12 12M6 18L18 6"
        })
    }),
    /** ▾ — downward chevron */ chevronDown: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M6 9l6 6 6-6"
        })
    }),
    /** ⌄ — compact NumberInput stepper chevron */ 'numberInput:stepperDown': /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M7.5 9.75l4.5 4.5 4.5-4.5"
        })
    }),
    /** ‹ — left chevron */ chevronLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M15 6l-6 6 6 6"
        })
    }),
    /** › — right chevron */ chevronRight: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M9 6l6 6-6 6"
        })
    }),
    /** « — double left chevron (first / jump to start) */ chevronsLeft: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M18 6l-6 6 6 6M11 6l-6 6 6 6"
        })
    }),
    /** » — double right chevron (last / jump to end) */ chevronsRight: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M6 6l6 6-6 6M13 6l6 6-6 6"
        })
    }),
    /** ✓ — checkmark */ check: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M5 13l4 4L19 7"
        })
    }),
    /** ✓ in circle — success state (solid fill for status visibility) */ success: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...solidSvgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M12 3a9 9 0 100 18 9 9 0 000-18zm4.06 6.56a.75.75 0 00-1.12-1l-3.94 4.4-1.94-1.94a.75.75 0 00-1.06 1.06l2.5 2.5a.75.75 0 001.09-.03l4.47-5z"
        })
    }),
    /** ✕ in circle — error state (solid fill for status visibility) */ error: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...solidSvgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M12 3a9 9 0 100 18 9 9 0 000-18zm-2.47 5.47a.75.75 0 00-1.06 1.06L10.94 12l-2.47 2.47a.75.75 0 101.06 1.06L12 13.06l2.47 2.47a.75.75 0 101.06-1.06L13.06 12l2.47-2.47a.75.75 0 00-1.06-1.06L12 10.94l-2.47-2.47z"
        })
    }),
    /** △ with ! — warning (solid fill for status visibility) */ warning: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...solidSvgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M10.29 3.86L2.07 19.05A2 2 0 003.78 22h16.44a2 2 0 001.71-2.95L13.71 3.86a2 2 0 00-3.42 0zM12 9a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 9zm0 9a1 1 0 100-2 1 1 0 000 2z"
        })
    }),
    /** ⓘ — information (solid fill for status visibility) */ info: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...solidSvgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M12 3a9 9 0 100 18 9 9 0 000-18zm0 4a1 1 0 100 2 1 1 0 000-2zm-.75 3.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5z"
        })
    }),
    /** 📅 — calendar */ calendar: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        ...svgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
                x: "3",
                y: "4",
                width: "18",
                height: "18",
                rx: "2"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M16 2v4M8 2v4M3 10h18"
            })
        ]
    }),
    /** 🕐 — clock */ clock: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        ...svgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                cx: "12",
                cy: "12",
                r: "9"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M12 7v5l3 3"
            })
        ]
    }),
    /** ↗ — external link arrow */ externalLink: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        ...svgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M15 3h6v6"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M10 14L21 3"
            })
        ]
    }),
    /** ☰ — hamburger menu (three horizontal lines) */ menu: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M4 6h16M4 12h16M4 18h16"
        })
    }),
    /** ⋯ — three horizontal dots (more/overflow) */ moreHorizontal: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        ...solidSvgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                cx: "5",
                cy: "12",
                r: "1.5"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                cx: "12",
                cy: "12",
                r: "1.5"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                cx: "19",
                cy: "12",
                r: "1.5"
            })
        ]
    }),
    /** 🔍 — magnifying glass (search) */ search: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        ...svgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                cx: "11",
                cy: "11",
                r: "8"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M21 21l-4.35-4.35"
            })
        ]
    }),
    /** ⇧ — upload into a tray */ upload: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M12 16V4m0 0L7 9m5-5l5 5M4 15v4a2 2 0 002 2h12a2 2 0 002-2v-4"
        })
    }),
    /** ↑ — arrow up (sort ascending) */ arrowUp: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M12 19V5m0 0l-7 7m7-7l7 7"
        })
    }),
    /** ↓ — arrow down (sort descending) */ arrowDown: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M12 5v14m0 0l7-7m-7 7l-7-7"
        })
    }),
    /** ↕ — arrows up-down (unsorted / sortable indicator) */ arrowsUpDown: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
        })
    }),
    /** 🔽 — funnel (filter indicator) */ funnel: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
        })
    }),
    /** 👁‍🗨 — eye with slash (hidden column) */ eyeSlash: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
        })
    }),
    /** ☐☐ — view columns (column settings) */ viewColumns: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"
        })
    }),
    /** clipboard — copy to clipboard */ copy: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        ...svgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M8 4v12a2 2 0 002 2h8a2 2 0 002-2V7.242a2 2 0 00-.602-1.43L16.083 2.57A2 2 0 0014.685 2H10a2 2 0 00-2 2z"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M16 18v2a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2"
            })
        ]
    }),
    /** ✓✓ — double checkmark (delivered/read) */ checkDouble: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        ...svgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M2 13l4 4L14 7"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M9 13l4 4L21 7"
            })
        ]
    }),
    wrench: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...svgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
            d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        })
    }),
    /** ■ — stop (rounded square, solid fill for media control) */ stop: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
        ...solidSvgProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("rect", {
            x: "6",
            y: "6",
            width: "12",
            height: "12",
            rx: "2"
        })
    }),
    /** 🎤 — microphone (voice input / dictation) */ microphone: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("svg", {
        ...svgProps,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M12 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3z"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M19 10v1a7 7 0 01-14 0v-1"
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("path", {
                d: "M12 18v4m-4 0h8"
            })
        ]
    })
};
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Icon/globalIconRegistry.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$defaultIcons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/defaultIcons.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/themeRegistry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/devWarning.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedForReact$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedForReact.js [app-client] (ecmascript)");
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
const registry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedForReact$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sharedForReact"])('icon/global-icon-registry/state', 1, ()=>({
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
    return typeof source === 'string' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$themeRegistry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRegisteredTheme"])(source) : source ?? null;
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
        entry: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$defaultIcons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultIcons"][name] ?? fallback,
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warnOnce"])('icon-registry:global-register-icons', 'Icon', '`registerIcons()` applies icon overrides globally. Prefer `defineTheme({ icons })` for theme-scoped icon overrides.');
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
    const names = new Set(Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$defaultIcons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultIcons"]));
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
    return typeof value === 'string' && !isNamespacedKey(value) && Object.hasOwn(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$defaultIcons$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultIcons"], value);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warnOnce"])(`component-icons:${slot}:${problem}`, 'Icon', `componentIcons["${slot}"] ${problem}. The component keeps its own value for that field.`);
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
"[project]/web/node_modules/@astryxdesign/core/dist/Indicator/indicator.markers.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/InfoTip/InfoTip.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMergedRefs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/Icon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerClickBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerClickBoundary.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/useTooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$InfoTip$2f$InfoTip$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/InfoTip/InfoTip.generated.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/focusOutline.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchHitArea$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/touchHitArea.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$internal$2f$touchHitArea$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/internal/touchHitArea.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEnglishFallback"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$InfoTip$2f$InfoTip$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
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
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    const hitAreaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$touchHitArea$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTouchHitArea"])(true);
    // Whether a press pinned the help. A hover or focus preview is not pinned.
    const [isPinned, setIsPinned] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Whether the help shows, pinned or previewed: the button names it in
    // `aria-controls` only then.
    const [isShown, setIsShown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleShow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "InfoTip.useCallback[handleShow]": ()=>setIsShown(true)
    }["InfoTip.useCallback[handleShow]"], []);
    // Every close ends the pin: a second press, Escape, a press outside, or
    // focus leaving.
    const handleHide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "InfoTip.useCallback[handleHide]": ()=>{
            setIsShown(false);
            setIsPinned(false);
        }
    }["InfoTip.useCallback[handleHide]"], []);
    const tooltip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTooltip"])({
        onShow: handleShow,
        onHide: handleHide
    });
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(ref, hitAreaRef, tooltip.ref);
    // A primary mouse or pen press on a preview calls show() first. The hook's
    // press-to-close then leaves it open. The click pins it.
    const handlePointerDownCapture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "InfoTip.useCallback[handlePointerDownCapture]": (event)=>{
            if (event.button !== 0 || event.pointerType === 'touch' || isPinned || !isShown) {
                return;
            }
            tooltip.show();
        }
    }["InfoTip.useCallback[handlePointerDownCapture]"], [
        isPinned,
        isShown,
        tooltip
    ]);
    // A click, tap, Enter, or Space pins the help, and the next one closes it.
    // The press stops at the button: a clickable row, card, or label around it
    // does nothing, and document listeners still see it.
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "InfoTip.useCallback[handleClick]": (event)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerClickBoundary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stopInReactTree"])(event);
            event.preventDefault();
            if (isPinned) {
                tooltip.hide();
                return;
            }
            tooltip.show();
            setIsPinned(true);
        }
    }["InfoTip.useCallback[handleClick]"], [
        isPinned,
        tooltip
    ]);
    // No Escape handler of its own. The tooltip's entry in the shared dismissal
    // stack takes Escape, so one press never closes both the help and an
    // enclosing Dialog.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pickDataAttributes"])(rest),
                ref: mergedRef,
                type: "button",
                "aria-label": label ?? t('@astryx.infoTip.label'),
                "aria-describedby": tooltip.describedBy,
                "aria-expanded": isPinned,
                "aria-controls": isShown ? tooltip.describedBy : undefined,
                onPointerDownCapture: handlePointerDownCapture,
                onClick: handleClick,
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusOutlineStyles"].focusVisible, styles.trigger, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$internal$2f$touchHitArea$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["touchHitAreaStyles"].layer, xstyle), className, style),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
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
"[project]/web/node_modules/@astryxdesign/core/dist/InputGroup/InputGroupContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const InputGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('InputGroupContext', 1, null);
InputGroupContext.displayName = 'InputGroupContext';
function useInputGroup() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(InputGroupContext);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/InputGroup/InputGroupInternalContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
const InputGroupInternalContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('InputGroupInternalContext', 1, {
    isDisabled: false
});
InputGroupInternalContext.displayName = 'InputGroupInternalContext';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/InputGroup/groupStyles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
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
"[project]/web/node_modules/@astryxdesign/core/dist/Layout/container.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
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
 */ const SP4 = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacingVars"]['--spacing-4'];
const SP6 = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacingVars"]['--spacing-6'];
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
"[project]/web/node_modules/@astryxdesign/core/dist/Layout/containerCorners.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/Layout/edgeCompensation.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/Layout/overlayPaddingReset.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/Layout/padding.stylex.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
// In their own modules so an overlay's eager code imports them without this
// one, and a lazily loaded overlay that uses the container padding styles
// below keeps those out of the chunk it shares with that code.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$paddingStyles$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layout/paddingStyles.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layout$2f$overlayPaddingReset$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layout/overlayPaddingReset.stylex.js [app-client] (ecmascript)");
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
"[project]/web/node_modules/@astryxdesign/core/dist/Layout/paddingStyles.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
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
"[project]/web/node_modules/@astryxdesign/core/dist/Link/useLinkComponent.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$LinkContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Link/LinkContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$safeUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/safeUrl.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
function createSafeLink(Component) {
    function SafeLink({ href, to, ref, ...rest }) {
        // An undefined destination can crash a router or resolve to the current
        // route. Reject the whole handoff, not just one prop or a fallback value.
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$safeUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSafeDestination"])(href) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$safeUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSafeDestination"])(to)) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])('a', {
                ref,
                ...rest
            });
        }
        if (Component === 'a') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])('a', {
                ref,
                ...rest,
                href
            });
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(Component, {
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
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$LinkContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinkContext"]);
    const resolved = as ?? ctx?.component ?? 'a';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useLinkComponent.useMemo": ()=>createSafeLink(resolved)
    }["useLinkComponent.useMemo"], [
        resolved
    ]);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/SizeContext/SizeContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const SizeContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('SizeContext', 1, null);
SizeContext.displayName = 'SizeContext';
function useSize(sizeProp, defaultSize = 'md') {
    const inherited = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(SizeContext);
    return sizeProp ?? inherited ?? defaultSize;
}
const SizeProvider = SizeContext.Provider;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Spinner/Spinner.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$SpinnerOwnerContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Spinner/SpinnerOwnerContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Text/Text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeRefs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounceRenderedText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useAnnounceRenderedText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Spinner$2f$Spinner$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Spinner/Spinner.generated.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$spinnerRotor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Spinner/spinnerRotor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEnglishFallback"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$Spinner$2f$Spinner$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
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
    const labelId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    const spinnerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Spinner.useMemo[rootRef]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeRefs"])(spinnerRef, ref)
    }["Spinner.useMemo[rootRef]"], [
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
    const isComposedInOwner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$SpinnerOwnerContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpinnerOwnerContext"]);
    const isHidden = restProps['aria-hidden'] === true || restProps['aria-hidden'] === 'true';
    const callerRole = restProps.role;
    const hasShippedSilentRole = callerRole != null && callerRole !== 'progressbar';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounceRenderedText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnnounceRenderedText"])(spinnerRef, !isComposedInOwner && !isHidden && !hasShippedSilentRole, '', {
        skipFirstRender: true,
        fallbackText: resolvedAriaLabel
    });
    const spinner = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("span", {
        ref: hasLabel ? undefined : rootRef,
        role: "progressbar",
        "aria-label": namedByVisibleLabel ? undefined : resolvedAriaLabel,
        "aria-labelledby": namedByVisibleLabel ? labelId : undefined,
        "data-testid": hasLabel ? undefined : testId,
        ...hasLabel ? {} : restProps,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])(hasLabel ? '' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('spinner', {
            size,
            shade
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](styles.spinner, // The defaults are declared on whichever element carries the theme
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
                width: 0,
                height: 0,
                "aria-hidden": "true",
                ...{
                    className: "xlp1x4z x1lliihq x15r89dc x6v0vjy x7yyq19 x1rea2x4"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("circle", {
                    cx: "50%",
                    cy: "50%",
                    r: diameter / 2,
                    strokeWidth: border,
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](styles.circle, styles.track, trackOpacityStyles[shade])
                })
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                ref: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$spinnerRotor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncRotationPhase"],
                "aria-hidden": "true",
                ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](styles.rotor, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$spinnerRotor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spinnerRotorStyles"].turn),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("svg", {
                    width: frameSize,
                    height: frameSize,
                    ...{
                        className: "xlp1x4z x1lliihq x15r89dc x6v0vjy x7yyq19 x1rea2x4"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("circle", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        ref: rootRef,
        "data-testid": testId,
        ...restProps,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('spinner', {
            size,
            shade
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](styles.wrapper, sizeStyles[size], shadeStyles[shade], xstyle), className, style),
        children: [
            spinner,
            typeof label === 'string' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
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
"[project]/web/node_modules/@astryxdesign/core/dist/Spinner/SpinnerOwnerContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
const SpinnerOwnerContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSharedContext"])('SpinnerOwnerContext', 1, false);
SpinnerOwnerContext.displayName = 'SpinnerOwnerContext';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Spinner/spinnerRotor.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SPINNER_ARC_FRACTION",
    ()=>SPINNER_ARC_FRACTION,
    "spinnerRotorStyles",
    ()=>spinnerRotorStyles,
    "syncRotationPhase",
    ()=>syncRotationPhase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-client] (ecmascript)");
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
 */ const rotors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sharedState"])('spinner/spinner-rotor/state', 1, ()=>({
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
"[project]/web/node_modules/@astryxdesign/core/dist/Text/Text.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Text/text.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$useTruncation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Text/useTruncation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$TruncationTooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Text/TruncationTooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/composeEventHandlers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMergedRefs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$textClampContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Text/textClampContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
    if (type in __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sizeByTypeStyles"]) {
        return type;
    }
    return 'body';
}
function resolveStyleColor(color) {
    // The `in` guard is a runtime check for consumer-augmented custom colors
    // (which widen `TextColor` beyond the built-ins via TextColorMap); within
    // core the two types coincide, so no cast is needed.
    if (color in __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorStyles"]) {
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
    const truncation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$useTruncation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTruncation"])({
        maxLines: hasTruncateTooltip === false ? 0 : maxLines
    });
    // Tooltip for truncated text
    const tooltipPlacement = typeof hasTruncateTooltip === 'string' ? hasTruncateTooltip : 'above';
    const tooltipEnabled = maxLines > 0 && hasTruncateTooltip !== false && truncation.isTruncated;
    // The tooltip mounts on the first hover, tap or focus, not with the text.
    const tooltipInterest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$TruncationTooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTruncationTooltipInterest"])(tooltipEnabled);
    // Ref for the text element (used as tooltip anchor)
    const textRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Keep the merged ref stable across rerenders.
    const mergedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(ref, truncation.ref, textRef);
    const isInClampedText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$textClampContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextClampContext"]);
    // A capsize block removes a multi-line clamp.
    const isClamped = maxLines === 1 || maxLines > 1 && !hasCapsize;
    // Build inline style for -webkit-line-clamp (dynamic value)
    const inlineStyle = maxLines > 1 ? {
        WebkitLineClamp: maxLines
    } : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Component, {
                ref: mergedRef,
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('text', {
                    type,
                    size,
                    color: resolvedColor
                }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorStyles"][styleColor], __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sizeByTypeStyles"][styleType], size && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sizeStyles"][size], __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultWeightByTypeStyles"][styleType], weight && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["weightStyles"][weight], // Display: use truncation styles when maxLines > 0
                maxLines === 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncationStyles"].singleLine : maxLines > 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncationStyles"].multiLine : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["displayStyles"][resolvedDisplay], // Word break when truncating
                maxLines > 0 && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wordBreakStyles"][resolvedWordBreak], // Text wrap
                textWrap && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textWrapStyles"][textWrap], // Justify (text alignment)
                justify !== 'start' && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["justifyStyles"][justify], // Capsize
                hasCapsize && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["capsizeStyles"].enabled, // Decorations
                hasStrikethrough && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decorationStyles"].strikethrough, hasTabularNumbers && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tabularNumbersStyle"].enabled, // User xstyle
                xstyle), className, {
                    ...style,
                    ...inlineStyle
                }),
                ...props,
                onPointerEnter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composeEventHandlers"])(tooltipInterest.onPointerEnter, props.onPointerEnter),
                onPointerLeave: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composeEventHandlers"])(tooltipInterest.onPointerLeave, props.onPointerLeave),
                onPointerDown: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composeEventHandlers"])(tooltipInterest.onPointerDown, props.onPointerDown),
                onFocus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composeEventHandlers"])(tooltipInterest.onFocus, props.onFocus),
                onBlur: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$composeEventHandlers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composeEventHandlers"])(tooltipInterest.onBlur, props.onBlur),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$textClampContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextClampContext"], {
                    value: isClamped || isInClampedText,
                    children: children
                })
            }),
            tooltipEnabled && tooltipInterest.isWanted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$TruncationTooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TruncationTooltip"], {
                anchorRef: textRef,
                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("span", {
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Text$2f$text$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncationTooltipStyles"].content),
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
"[project]/web/node_modules/@astryxdesign/core/dist/Text/TruncationTooltip.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$moduleLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/moduleLoader.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useTouchTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/useTouchTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/nodeType.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$tooltipPresentInterest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/tooltipPresentInterest.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
const tooltipModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$moduleLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createModuleLoader"])(async ()=>__turbopack_context__.A("[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/Tooltip.js [app-client] (ecmascript, async loader)"));
function useTruncationTooltipInterest(isEnabled) {
    const [isWanted, setIsWanted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tooltip, setTooltip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useTruncationTooltipInterest.useState": ()=>tooltipModule.loaded()?.Tooltip ?? null
    }["useTruncationTooltipInterest.useState"]);
    // Syncs with the module loader: truncated text loads the Tooltip module, so
    // the first interaction mounts the tooltip at once.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTruncationTooltipInterest.useEffect": ()=>{
            if (!isEnabled || tooltip != null) {
                return;
            }
            let isCurrent = true;
            tooltipModule.load().then({
                "useTruncationTooltipInterest.useEffect": (loaded)=>{
                    if (isCurrent) {
                        setTooltip({
                            "useTruncationTooltipInterest.useEffect": ()=>loaded.Tooltip
                        }["useTruncationTooltipInterest.useEffect"]);
                    }
                }
            }["useTruncationTooltipInterest.useEffect"], {
                "useTruncationTooltipInterest.useEffect": ()=>{}
            }["useTruncationTooltipInterest.useEffect"]);
            return ({
                "useTruncationTooltipInterest.useEffect": ()=>{
                    isCurrent = false;
                }
            })["useTruncationTooltipInterest.useEffect"];
        }
    }["useTruncationTooltipInterest.useEffect"], [
        isEnabled,
        tooltip
    ]);
    const interestRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        interest: null,
        tapEvent: null,
        isRead: false
    });
    const tapRecognizer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useTouchTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTapRecognizer"])();
    const want = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTruncationTooltipInterest.useCallback[want]": (interest, tapEvent = null)=>{
            const state = interestRef.current;
            if (!isEnabled || state.isRead) {
                return;
            }
            state.interest = interest;
            state.tapEvent = tapEvent;
            setIsWanted(true);
        }
    }["useTruncationTooltipInterest.useCallback[want]"], [
        isEnabled
    ]);
    const forget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTruncationTooltipInterest.useCallback[forget]": (interest)=>{
            const state = interestRef.current;
            if (!state.isRead && state.interest === interest) {
                state.interest = null;
            }
        }
    }["useTruncationTooltipInterest.useCallback[forget]"], []);
    const onPointerEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTruncationTooltipInterest.useCallback[onPointerEnter]": (event)=>{
            if (event.pointerType !== 'touch') {
                want('hover');
            }
        }
    }["useTruncationTooltipInterest.useCallback[onPointerEnter]"], [
        want
    ]);
    const onPointerLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTruncationTooltipInterest.useCallback[onPointerLeave]": ()=>forget('hover')
    }["useTruncationTooltipInterest.useCallback[onPointerLeave]"], [
        forget
    ]);
    const onPointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTruncationTooltipInterest.useCallback[onPointerDown]": (event)=>{
            if (!isEnabled || interestRef.current.isRead) {
                tapRecognizer.forget();
                return;
            }
            const isTouch = tapRecognizer.press(event.nativeEvent, event.currentTarget, {
                "useTruncationTooltipInterest.useCallback[onPointerDown].isTouch": (tapEvent)=>want('tap', tapEvent)
            }["useTruncationTooltipInterest.useCallback[onPointerDown].isTouch"]);
            // A mouse press cancels a hover show, as a mounted tooltip does. A pen
            // press waits for its tap.
            if (!isTouch) {
                forget('hover');
            }
        }
    }["useTruncationTooltipInterest.useCallback[onPointerDown]"], [
        isEnabled,
        tapRecognizer,
        want,
        forget
    ]);
    const onFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTruncationTooltipInterest.useCallback[onFocus]": (event)=>{
            const target = event.target;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(target) && target.matches(':focus-visible') && // Chrome on Android focuses a tapped child before the tap's click.
            // Skip that focus, so the click still opens the tooltip.
            !tapRecognizer.isTouchPressCurrent()) {
                want('focus');
            }
        }
    }["useTruncationTooltipInterest.useCallback[onFocus]"], [
        want,
        tapRecognizer
    ]);
    const onBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTruncationTooltipInterest.useCallback[onBlur]": ()=>forget('focus')
    }["useTruncationTooltipInterest.useCallback[onBlur]"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$tooltipPresentInterest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipPresentInterestContext"], {
        value: interest.interestRef,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Tooltip, {
            anchorRef: anchorRef,
            content: content,
            placement: placement
        })
    });
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Text/text.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
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
"[project]/web/node_modules/@astryxdesign/core/dist/Text/textClampContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
const TextClampContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('TextClampContext', 1, false);
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Text/useTruncation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedResizeObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedResizeObserver.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedMutationObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedMutationObserver.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
function useTruncation(options) {
    const { maxLines, isExpanded = false } = options;
    const [isTruncated, setIsTruncated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [fullText, setFullText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const elementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const unobserveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const unobserveContentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // The last measured answer, which the text keeps while it is expanded.
    const answerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        isTruncated: false,
        fullText: ''
    });
    // The text an expanded element kept its answer for when it went.
    const keptForRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const checkTruncation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTruncation.useCallback[checkTruncation]": (element)=>{
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
        }
    }["useTruncation.useCallback[checkTruncation]"], [
        maxLines
    ]);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTruncation.useCallback[ref]": (element)=>{
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
                const unobserve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedResizeObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observeResizeAfterLayout"])(element, {
                    "useTruncation.useCallback[ref].unobserve": ()=>{
                        checkTruncation(element);
                    }
                }["useTruncation.useCallback[ref].unobserve"]);
                if (unobserve == null) {
                    checkTruncation(element);
                }
                unobserveRef.current = unobserve;
                // New text in a box that keeps its size fires no resize, so the
                // captured text and truncated state would otherwise stay stale.
                unobserveContentRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedMutationObserver$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["observeContent"])(element, {
                    "useTruncation.useCallback[ref]": ()=>{
                        checkTruncation(element);
                    }
                }["useTruncation.useCallback[ref]"]);
            } else {
                setIsTruncated(false);
                setFullText('');
            }
        }
    }["useTruncation.useCallback[ref]"], [
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
"[project]/web/node_modules/@astryxdesign/core/dist/TextInput/TextInput.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextInput",
    ()=>TextInput
]);
/**
 * @file TextInput.tsx
 * @input Uses React, useId, ChangeEvent, Field, Icon, InputGroupContext,
 *   textEntryTraits (the touch-keyboard trait props)
 * @output Exports TextInput component, TextInputProps, TextInputType
 * @position Core implementation; consumed by index.ts, tested by TextInput.test.tsx
 *
 * SYNC: When modified, update these files to stay in sync:
 * - /packages/core/src/TextInput/TextInput.doc.mjs (props table, features, implementation notes)
 * - /packages/core/src/TextInput/TextInput.test.tsx (tests for new/changed behavior)
 * - /packages/core/src/TextInput/index.ts (exports if types change)
 * - /apps/storybook/stories/TextInput.stories.tsx (storybook stories)
 * - /packages/cli/assets/templates/blocks/components/TextInput/ (showcase blocks)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$Field$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Field/Field.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$InputClearButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Field/InputClearButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$inputStyles$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Field/inputStyles.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/Icon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/isRenderable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$disabledInteraction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/disabledInteraction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$Spinner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Spinner/Spinner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/useTooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$VisuallyHidden$2f$VisuallyHidden$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/VisuallyHidden/VisuallyHidden.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputAria$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputAria.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$ime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/ime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$textEntryTraits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Field/textEntryTraits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$groupStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/InputGroup/groupStyles.js [app-client] (ecmascript)");
// Re-export shared types for convenience
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SizeContext$2f$SizeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/SizeContext/SizeContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useInputContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useInputContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useInputStatusIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useInputStatusIcon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useResolvedRequired$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useResolvedRequired.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$InputGroupContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/InputGroup/InputGroupContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$InputGroupInternalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/InputGroup/InputGroupInternalContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$fieldParts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Field/fieldParts.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$inputDisabledFocus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Field/inputDisabledFocus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMergedRefs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useBusyAnnouncement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useBusyAnnouncement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$setInputValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/setInputValue.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$TextInput$2f$TextInput$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/TextInput/TextInput.generated.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
const sizeStyles = {
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEnglishFallback"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$TextInput$2f$TextInput$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
function TextInput({ type = 'text', label, isLabelHidden = false, description, isOptional = false, isRequired = false, isDisabled: isDisabledProp = false, isReadOnly = false, disabledMessage, startIcon, status, statusVariant = 'attached', size: sizeProp, onChange, changeAction, isLoading = false, value, placeholder, labelTooltip, hasClear = false, hasAutoFocus = false, htmlName, onEnter, onKeyDown, enterKeyHint, inputMode, autoCapitalize, hasAutoCorrect, hasSpellCheck, width, containerXstyle, containerClassName, containerStyle, controlXstyle, controlClassName, controlStyle, ref, id: idProp, 'aria-describedby': ariaDescribedByProp, 'aria-labelledby': ariaLabelledByProp, ...restProps }) {
    const inputGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$InputGroupContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInputGroup"])();
    const inputGroupState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$InputGroupInternalContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InputGroupInternalContext"]);
    const isDisabled = isDisabledProp || inputGroupState.isDisabled;
    const { rest, container } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$fieldParts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFieldInputStyling"])('TextInput', restProps, {
        containerXstyle,
        containerClassName,
        containerStyle
    });
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    const isEffectivelyRequired = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useResolvedRequired$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useResolvedRequired"])({
        isRequired,
        isOptional
    });
    // A disabled field keeps its tab stop but, like a natively disabled one,
    // runs no caller event handler other than focus and blur (`spec:AST-085` FR2).
    const fieldProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$disabledInteraction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withholdCallerHandlers"])(rest, isDisabled);
    const size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SizeContext$2f$SizeContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSize"])(sizeProp, 'md');
    const generatedID = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const id = idProp ?? generatedID;
    const fieldLabelID = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const inputLabelID = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const descriptionID = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const statusMessageID = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    const [optimisticValue, setOptimisticValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOptimistic"])(value);
    const isBusy = isLoading || optimisticValue !== value;
    // The busy Spinner is decorative; this control announces its busy start
    // (spec:AST-086 FR8).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useBusyAnnouncement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBusyAnnouncement"])(isBusy, t('@astryx.spinner.loading'), containerRef);
    // Disabled-reason tooltip. The tooltip listeners attach to the input container (which already exists) and
    // the input stays perceivable via aria-disabled instead of the native
    // disabled attribute. The field is made read-only so it can't be typed into,
    // and value mutation is blocked by the isDisabled guard in handleChange.
    const showsDisabledMessage = isDisabled && !!disabledMessage;
    const disabledMessageTooltip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTooltip"])({
        placement: 'above',
        // The container div is not naturally focusable; focusin bubbles up from
        // the input, so always attach focus listeners.
        focusTrigger: 'always',
        isEnabled: showsDisabledMessage
    });
    const { statusIcon, describedBy: statusTooltipDescribedBy } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useInputStatusIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInputStatusIcon"])({
        status,
        statusVariant,
        isInGroup: !!inputGroup
    });
    const { ariaLabelledBy, ariaDescribedBy } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputAria$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInputARIA"])(inputLabelID, [
        description ? descriptionID : null,
        // The status message element is rendered by Field, which is skipped
        // inside an InputGroup — only reference it when it actually exists.
        !inputGroup && statusVariant !== 'tooltip' && status?.message ? statusMessageID : null,
        // The tooltip variant renders no message box; describe the input by the
        // tooltip's content instead so the status is still announced.
        statusTooltipDescribedBy,
        showsDisabledMessage ? disabledMessageTooltip.describedBy : null
    ], inputGroup);
    // A caller aria-labelledby names the input together with the field's own
    // label (the Field label standalone, the group and input labels in a group).
    const inputLabelledBy = ariaLabelledByProp != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputAria$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["joinAriaIDs"])(ariaLabelledBy ?? fieldLabelID, ariaLabelledByProp) : ariaLabelledBy;
    const handleChange = (e)=>{
        // Value can't change while showing a disabled message (the field is
        // read-only and non-native-disabled), but guard the handler too so the
        // optimistic value and callbacks never fire.
        if (isDisabled || isReadOnly) {
            return;
        }
        const newValue = e.target.value;
        onChange?.(newValue, e);
        if (changeAction && !e.defaultPrevented) {
            startTransition(async ()=>{
                setOptimisticValue(newValue);
                await changeAction(newValue, e);
            });
        }
    };
    // A native value set and an `input` event run the input's own change handler.
    // So the clear gets a real change event and the same callback order and
    // cancellation as typing.
    const handleClear = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TextInput.useCallback[handleClear]": (e)=>{
            const input = inputRef.current;
            if (input != null && input.value !== '') {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$setInputValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setInputValue"])(input, '');
            }
            if (!e || e.detail === 0) {
                inputRef.current?.focus();
            } else {
                // Focus inside the tap: iOS Safari brings up its keyboard only for a
                // focus made while handling the touch, so a field the tap reaches
                // unfocused gets its keyboard, as UIKit's clear button makes the
                // field first responder. `preventScroll` keeps a scrolled page where
                // it is.
                inputRef.current?.focus({
                    preventScroll: true
                });
            }
        }
    }["TextInput.useCallback[handleClear]"], []);
    // Focus input when clicking anywhere on the wrapper (icons, padding, etc.)
    const { onClick: handleWrapperClick, onMouseUp: handleWrapperMouseUp } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useInputContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInputContainer"])({
        containerRef,
        inputRef,
        disabled: isDisabled
    });
    const inputWrapper = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])("div", {
        ref: (el)=>{
            containerRef.current = el;
            // Anchor + hover/focus listeners for the disabled-message tooltip.
            // Handlers are gated internally by isEnabled, and anchor names
            // compose, so attaching unconditionally is safe.
            disabledMessageTooltip.ref(el);
        },
        onClick: handleWrapperClick,
        onMouseUp: handleWrapperMouseUp,
        ...inputGroup ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$groupStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputGroupItemProps"] : undefined,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeProps"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('text-input', {
            size,
            status: status?.type ?? null,
            disabled: isDisabled ? 'disabled' : null,
            readonly: isReadOnly ? 'readonly' : null
        }), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$inputStyles$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputWrapperStyles"].base, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$inputStyles$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputWrapperStyles"].textField, sizeStyles[size], isDisabled && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$inputStyles$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputWrapperStyles"].disabled, isDisabled && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$inputDisabledFocus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputDisabledFocusStyles"].ring, status && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$inputStyles$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputStatusBorderStyles"][status.type], status && !isDisabled && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$inputStyles$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputStatusHoverShadowStyles"][status.type], status && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$inputStyles$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputStatusFocusWithinStyles"][status.type], inputGroup && __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$InputGroup$2f$groupStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["groupStyles"].inGroup, controlXstyle), controlClassName, controlStyle),
        children: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$isRenderable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRenderable"])(startIcon) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderIconSlot"])(startIcon, {
                size: 'sm',
                color: 'secondary'
            }),
            inputGroup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$VisuallyHidden$2f$VisuallyHidden$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VisuallyHidden"], {
                id: inputLabelID,
                children: label
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("input", {
                ...fieldProps,
                ref: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(ref, inputRef),
                id: id,
                name: isDisabled ? undefined : htmlName,
                type: type,
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$textEntryTraits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textEntryTraitAttributes"])({
                    enterKeyHint,
                    inputMode,
                    autoCapitalize,
                    hasAutoCorrect
                }),
                ...hasSpellCheck != null ? {
                    spellCheck: hasSpellCheck
                } : {},
                value: optimisticValue,
                onChange: handleChange,
                onKeyDown: isDisabled || onEnter || onKeyDown ? (e)=>{
                    if (isDisabled) {
                        // A read-only field still submits its form on Enter.
                        if (e.key === 'Enter') {
                            e.preventDefault();
                        }
                        return;
                    }
                    // The composing keydown fires before compositionend, so without
                    // this guard pressing Enter to commit a Japanese/Chinese/Korean
                    // IME conversion would trigger onEnter (submit/save actions)
                    // before the user intends to submit. onKeyDown still receives
                    // the raw event. See utils/ime.ts (#6082).
                    if (e.key === 'Enter' && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$ime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isImeKeyEvent"])(e.nativeEvent)) {
                        onEnter?.();
                    }
                    onKeyDown?.(e);
                } : undefined,
                placeholder: placeholder,
                "aria-disabled": isDisabled ? 'true' : undefined,
                readOnly: isReadOnly || isDisabled || undefined,
                autoFocus: hasAutoFocus,
                "data-autofocus": hasAutoFocus || undefined,
                "aria-describedby": [
                    ariaDescribedByProp,
                    ariaDescribedBy
                ].filter(Boolean).join(' ') || undefined,
                "aria-required": isEffectivelyRequired ? 'true' : undefined,
                "aria-invalid": status?.type === 'error' ? 'true' : undefined,
                "aria-busy": isBusy || undefined,
                "aria-labelledby": inputLabelledBy,
                ...{
                    0: {
                        className: "x1lliihq x98rzlu xeuugli xc342km xng3xce x1717udv x9ynric xjm74w1 xf9zqsd xw6l6zx x1tgivj0 xjbqb8w x1a2a7pz xeyghm5"
                    },
                    1: {
                        className: "x1lliihq x98rzlu xeuugli xc342km xng3xce x1717udv x9ynric xjm74w1 xf9zqsd xw6l6zx x1tgivj0 xjbqb8w x1a2a7pz xeyghm5 xt0e3qv"
                    }
                }[!!isDisabled << 0]
            }),
            isBusy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Spinner$2f$Spinner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                size: "sm",
                "aria-hidden": "true"
            }),
            hasClear && value !== '' && !isDisabled && !isReadOnly && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$InputClearButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InputClearButton"], {
                label: t('@astryx.textInput.clearLabel', {
                    label
                }),
                onClick: handleClear
            }),
            statusIcon
        ]
    });
    if (inputGroup) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                inputWrapper,
                showsDisabledMessage && disabledMessageTooltip.renderTooltip(disabledMessage)
            ]
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Field$2f$Field$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
        ...container,
        label: label,
        isLabelHidden: isLabelHidden,
        description: description,
        inputID: id,
        labelID: ariaLabelledByProp != null ? fieldLabelID : undefined,
        descriptionID: description ? descriptionID : undefined,
        isOptional: isOptional,
        isRequired: isRequired,
        isDisabled: isDisabled,
        status: status ? {
            type: status.type,
            message: status.message,
            messageID: status.message ? statusMessageID : undefined
        } : undefined,
        statusVariant: statusVariant,
        labelTooltip: labelTooltip,
        width: width,
        children: [
            inputWrapper,
            showsDisabledMessage && disabledMessageTooltip.renderTooltip(disabledMessage)
        ]
    });
}
TextInput.displayName = 'TextInput';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/tooltipPresentInterest.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
const TooltipPresentInterestContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSharedContext"])('TooltipPresentInterestContext', 1, null);
TooltipPresentInterestContext.displayName = 'TooltipPresentInterestContext';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/useTooltip.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useCommittedRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useCommittedRef.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsomorphicLayoutEffect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$tooltipPresentInterest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/tooltipPresentInterest.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$triggerFocus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/triggerFocus.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/useLayer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useTouchTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/useTouchTrigger.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounceRenderedText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useAnnounceRenderedText.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMergedRefs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerAnimations$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerAnimations.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerSurfacePress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerSurfacePress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$outsidePress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/outsidePress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useLayerDismissal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/useLayerDismissal.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
/**
 * Grace period (ms) before hiding on pointer-leave when no explicit `hideDelay`
 * is set, so the pointer can travel across the small gap from the trigger onto
 * the tooltip surface without the tooltip disappearing (WCAG 1.4.13 hoverable).
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
    const layer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayerInternal"])({
        mode: 'context',
        onShow,
        onHide,
        keepsAnchorClear: true
    });
    const { ref: layerRef, anchorId: layerAnchorId, show: showLayer, hide: hideLayer, isOpen: isLayerOpen, id: layerId, render: renderLayer } = layer;
    const popoverXstyle = styles.container;
    const showTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hideTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const triggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Set only by a Core component that mounts the tooltip on interaction.
    const presentInterest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$tooltipPresentInterest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipPresentInterestContext"]);
    // Counts the renders in which the tooltip is disabled. A pending show
    // records it, so a show scheduled before a disable is dropped even when
    // the tooltip is enabled again before the timer fires.
    const disabledRendersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    if (!isEnabled) {
        disabledRendersRef.current += 1;
    }
    // Clear all timeouts
    const clearTimeouts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[clearTimeouts]": ()=>{
            if (showTimeoutRef.current) {
                clearTimeout(showTimeoutRef.current);
                showTimeoutRef.current = null;
            }
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
                hideTimeoutRef.current = null;
            }
        }
    }["useTooltip.useCallback[clearTimeouts]"], []);
    // Touch resolves immediately: the hover delays exist to filter out a pointer
    // passing across the trigger, and a tap is never that.
    const showNow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[showNow]": ()=>{
            clearTimeouts();
            showLayer();
        }
    }["useTooltip.useCallback[showNow]"], [
        clearTimeouts,
        showLayer
    ]);
    const hideNow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[hideNow]": ()=>{
            clearTimeouts();
            hideLayer();
        }
    }["useTooltip.useCallback[hideNow]"], [
        clearTimeouts,
        hideLayer
    ]);
    const latestRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useCommittedRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCommittedRef"])({
        isOpen,
        isLayerOpen,
        onShow,
        onHide
    });
    // The app's show() holds the tooltip open until hide(), Escape, a press or
    // scroll outside, or focus leaving the trigger and the tooltip.
    const isHeldRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [isHeldState, setIsHeldState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const setHeld = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[setHeld]": (next)=>{
            isHeldRef.current = next;
            setIsHeldState(next);
        }
    }["useTooltip.useCallback[setHeld]"], []);
    // Whether the current hold began during a press on the trigger. Such a
    // hold ends with the press when the press ends off the trigger, as no click
    // pins it. The hover rules then decide. isHoldInThisTaskRef covers a show()
    // that runs before the hook's own pointerdown listener.
    const isHoldFromPressRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isHoldInThisTaskRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const handleReleaseInLayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[handleReleaseInLayer]": ()=>{
            if (isHoldFromPressRef.current && isHeldRef.current) {
                isHoldFromPressRef.current = false;
                setHeld(false);
            }
        }
    }["useTooltip.useCallback[handleReleaseInLayer]"], [
        setHeld
    ]);
    // The touch trigger's outside dismissal (a press or scroll outside) ends a
    // hold with the tooltip.
    const hideFromTouch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[hideFromTouch]": ()=>{
            if (isHeldRef.current) {
                setHeld(false);
                const latest = latestRef.current;
                if (latest.isOpen !== undefined) {
                    latest.onHide?.();
                    return;
                }
            }
            hideNow();
        }
    }["useTooltip.useCallback[hideFromTouch]"], [
        setHeld,
        hideNow,
        latestRef
    ]);
    const { isTouchPointerRef, isTouchInteraction, handlePointerEnter, handlePointerDown: handleTouchPointerDown, clearTapOpen, armOutsideDismiss, answerTap } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useTouchTrigger$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTouchTriggerInternal"])({
        touchTrigger,
        isEnabled,
        isControlled: isOpen !== undefined,
        isOpen: isLayerOpen,
        layerId,
        triggerRef,
        show: showNow,
        hide: hideFromTouch
    }, handleReleaseInLayer, true);
    const isHeldOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[isHeldOpen]": ()=>{
            const latest = latestRef.current;
            return isHeldRef.current && latest.isLayerOpen && latest.isOpen !== false;
        }
    }["useTooltip.useCallback[isHeldOpen]"], [
        latestRef
    ]);
    const releaseHold = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[releaseHold]": ()=>{
            clearTapOpen();
            setHeld(false);
            const latest = latestRef.current;
            if (latest.isOpen !== undefined) {
                latest.onHide?.();
                return;
            }
            hideNow();
        }
    }["useTooltip.useCallback[releaseHold]"], [
        clearTapOpen,
        setHeld,
        hideNow,
        latestRef
    ]);
    const dropHold = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[dropHold]": ()=>{
            if (isHeldRef.current) {
                setHeld(false);
            }
        }
    }["useTooltip.useCallback[dropHold]"], [
        setHeld
    ]);
    // Focus leaving the trigger and the tooltip ends a hold, whatever
    // `focusTrigger` is. Focus that leaves for no element is a press's to
    // decide. The trigger can sit in another document, so the check uses its
    // own window.
    const handleHeldFocusOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[handleHeldFocusOut]": (event)=>{
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$outsidePress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noteOutsideDismissal"])(view.document);
            releaseHold();
        }
    }["useTooltip.useCallback[handleHeldFocusOut]"], [
        isHeldOpen,
        layerId,
        releaseHold
    ]);
    const isHoldShown = isHeldState && isLayerOpen && isOpen !== false;
    // Only a hold announces the text: a preview is already the trigger's
    // description.
    const contentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounceRenderedText$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnnounceRenderedText"])(contentRef, isHoldShown, 'pinned');
    const contentRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useMergedRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMergedRefs"])(contentRef, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerSurfacePress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerLayerSurface"]);
    // Schedule show with delay (suppressed when isOpen is false)
    const scheduleShow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[scheduleShow]": ()=>{
            if (!isEnabled || isOpen === false) {
                return;
            }
            clearTimeouts();
            const disabledRenders = disabledRendersRef.current;
            showTimeoutRef.current = setTimeout({
                "useTooltip.useCallback[scheduleShow]": ()=>{
                    // A show runs only if the tooltip stayed enabled since it was
                    // scheduled: nothing would close a tooltip that opens after a disable.
                    if (disabledRendersRef.current === disabledRenders) {
                        showLayer();
                    }
                }
            }["useTooltip.useCallback[scheduleShow]"], delay);
        }
    }["useTooltip.useCallback[scheduleShow]"], [
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
    const scheduleHide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[scheduleHide]": ()=>{
            if (isOpen === true || isHeldOpen()) {
                return;
            }
            clearTimeouts();
            const effectiveHideDelay = hideDelay > 0 ? hideDelay : HOVER_BRIDGE_DELAY;
            hideTimeoutRef.current = setTimeout({
                "useTooltip.useCallback[scheduleHide]": ()=>{
                    hideLayer();
                }
            }["useTooltip.useCallback[scheduleHide]"], effectiveHideDelay);
        }
    }["useTooltip.useCallback[scheduleHide]"], [
        isOpen,
        isHeldOpen,
        clearTimeouts,
        hideLayer,
        hideDelay
    ]);
    // Cancel a pending hide (e.g. the pointer entered the tooltip surface).
    const cancelHide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[cancelHide]": ()=>{
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
                hideTimeoutRef.current = null;
            }
        }
    }["useTooltip.useCallback[cancelHide]"], []);
    // Event handlers
    const handleMouseEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[handleMouseEnter]": ()=>{
            // A tap synthesizes mouseenter. On touch the tap path owns the decision,
            // so hover must not also fire — including the tap that just opened the
            // tooltip, which would otherwise be double-handled.
            if (isTouchPointerRef.current) {
                return;
            }
            scheduleShow();
        }
    }["useTooltip.useCallback[handleMouseEnter]"], [
        isTouchPointerRef,
        scheduleShow
    ]);
    const handleMouseLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[handleMouseLeave]": (event)=>{
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
        }
    }["useTooltip.useCallback[handleMouseLeave]"], [
        isTouchPointerRef,
        layerId,
        scheduleHide
    ]);
    // Under `auto`, whether focus counts is decided when it arrives, and a
    // focus that counted still hides on blur (utils/triggerFocus.ts).
    const [focusGate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$triggerFocus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTriggerFocusGate"]);
    // Whether focus on `target` opens the tooltip. With a `trigger`, its
    // `focusTrigger` rule applies too. Only `:focus-visible` focus opens it, and
    // a tap never does: a tapped `<input>` also matches `:focus-visible`.
    const opensOnFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[opensOnFocus]": (target, trigger)=>{
            if (trigger != null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$triggerFocus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFocusOnTrigger"])(target, trigger, focusTrigger)) {
                return false;
            }
            return !isTouchInteraction() && target.matches(':focus-visible');
        }
    }["useTooltip.useCallback[opensOnFocus]"], [
        focusTrigger,
        isTouchInteraction
    ]);
    const handleFocusIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[handleFocusIn]": (e)=>{
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
        }
    }["useTooltip.useCallback[handleFocusIn]"], [
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
    const handleFocusOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[handleFocusOut]": (e)=>{
            if (!focusGate.focusOut(e, focusTrigger)) {
                return;
            }
            scheduleHide();
        }
    }["useTooltip.useCallback[handleFocusOut]"], [
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
    const isTriggerPressedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const stopPressTrackingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const trackTriggerPress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[trackTriggerPress]": ()=>{
            stopPressTrackingRef.current?.();
            const view = triggerRef.current?.ownerDocument.defaultView;
            if (view == null) {
                return;
            }
            isTriggerPressedRef.current = true;
            const trigger = triggerRef.current;
            const stop = {
                "useTooltip.useCallback[trackTriggerPress].stop": (event)=>{
                    // A press that ends on the trigger keeps its hold, as a click does.
                    if (event?.type === 'pointerup' && event.target instanceof view.Node && trigger?.contains(event.target) === true) {
                        isHoldFromPressRef.current = false;
                    }
                    view.removeEventListener('pointerup', stop, true);
                    view.removeEventListener('pointercancel', stop, true);
                    isTriggerPressedRef.current = false;
                    stopPressTrackingRef.current = null;
                }
            }["useTooltip.useCallback[trackTriggerPress].stop"];
            view.addEventListener('pointerup', stop, true);
            view.addEventListener('pointercancel', stop, true);
            stopPressTrackingRef.current = stop;
        }
    }["useTooltip.useCallback[trackTriggerPress]"], []);
    const handlePointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[handlePointerDown]": (event)=>{
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
        }
    }["useTooltip.useCallback[handlePointerDown]"], [
        handleTouchPointerDown,
        trackTriggerPress,
        isOpen,
        clearTimeouts,
        hideLayer
    ]);
    // The trigger's listeners call the committed handlers through this ref, so
    // the trigger ref callback keeps one identity.
    const handlersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useCommittedRef$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCommittedRef"])({
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
    const detachTriggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Set when the trigger detached while the tooltip was disabled: the
    // caller removed the wiring (DropdownMenu's Button while its menu is
    // open), so the next enabled attach reads the focus that arrived meanwhile.
    const wasSuppressedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Set by a detach until it settles on the committed flags.
    const isDetachPendingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // A caller removes the wiring as it disables the tooltip. Close an
    // uncontrolled tooltip then, or the next attach shows a stale tooltip. A
    // detach while enabled, such as a merged ref that changes identity on a
    // re-render, keeps a hovered or held tooltip open.
    const settleDetach = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[settleDetach]": ()=>{
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
        }
    }["useTooltip.useCallback[settleDetach]"], [
        handlersRef
    ]);
    // Synchronizes the tooltip's popover with a trigger that detached in this
    // commit. It runs after the insertion Effects write the flags. A detach in a
    // commit that does not render this hook settles in its microtask.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsomorphicLayoutEffect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])({
        "useTooltip.useIsomorphicLayoutEffect": ()=>{
            settleDetach();
        }
    }["useTooltip.useIsomorphicLayoutEffect"]);
    // The trigger's ref callback owns every trigger listener, and reads the
    // trigger's state when it attaches and detaches.
    const interactionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[interactionRef]": (el)=>{
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
            const latest = {
                "useTooltip.useCallback[interactionRef].latest": ()=>handlersRef.current
            }["useTooltip.useCallback[interactionRef].latest"];
            // `pointerenter` runs before the synthesized `mouseenter` a tap produces,
            // which is what lets the hover path know it is looking at a finger.
            const onPointerEnter = {
                "useTooltip.useCallback[interactionRef].onPointerEnter": (e)=>latest().handlePointerEnter(e)
            }["useTooltip.useCallback[interactionRef].onPointerEnter"];
            const onMouseEnter = {
                "useTooltip.useCallback[interactionRef].onMouseEnter": ()=>latest().handleMouseEnter()
            }["useTooltip.useCallback[interactionRef].onMouseEnter"];
            const onMouseLeave = {
                "useTooltip.useCallback[interactionRef].onMouseLeave": (e)=>latest().handleMouseLeave(e)
            }["useTooltip.useCallback[interactionRef].onMouseLeave"];
            // Press-to-dismiss on a mouse; tap-to-open on a touch pointer.
            const onPointerDown = {
                "useTooltip.useCallback[interactionRef].onPointerDown": (e)=>latest().handlePointerDown(e)
            }["useTooltip.useCallback[interactionRef].onPointerDown"];
            // Focus counts unless focus never opens the tooltip; `auto` decides per
            // event (isFocusForTrigger).
            const onFocusIn = {
                "useTooltip.useCallback[interactionRef].onFocusIn": (e)=>{
                    if (latest().focusTrigger !== 'never') {
                        latest().handleFocusIn(e);
                    }
                }
            }["useTooltip.useCallback[interactionRef].onFocusIn"];
            const onFocusOut = {
                "useTooltip.useCallback[interactionRef].onFocusOut": (e)=>{
                    if (latest().focusTrigger !== 'never') {
                        latest().handleFocusOut(e);
                    }
                }
            }["useTooltip.useCallback[interactionRef].onFocusOut"];
            // A held tooltip's own focus-leave close, whatever `focusTrigger` is.
            const onHeldFocusOut = {
                "useTooltip.useCallback[interactionRef].onHeldFocusOut": (e)=>latest().handleHeldFocusOut(e)
            }["useTooltip.useCallback[interactionRef].onHeldFocusOut"];
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
            const detach = {
                "useTooltip.useCallback[interactionRef].detach": ()=>{
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
                }
            }["useTooltip.useCallback[interactionRef].detach"];
            detachTriggerRef.current = detach;
            return detach;
        }
    }["useTooltip.useCallback[interactionRef]"], [
        handlersRef,
        settleDetach
    ]);
    // Combined ref - shorthand for calling both positionRef and interactionRef
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[ref]": (el)=>{
            layerRef(el);
            const detachInteraction = interactionRef(el);
            if (el == null) {
                return;
            }
            return ({
                "useTooltip.useCallback[ref]": ()=>{
                    detachInteraction?.();
                    layerRef(null);
                }
            })["useTooltip.useCallback[ref]"];
        }
    }["useTooltip.useCallback[ref]"], [
        layerRef,
        interactionRef
    ]);
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTooltip.useEffect": ()=>{
            return ({
                "useTooltip.useEffect": ()=>{
                    clearTimeouts();
                }
            })["useTooltip.useEffect"];
        }
    }["useTooltip.useEffect"], [
        clearTimeouts
    ]);
    // Show on mount when isDefaultOpen is true
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTooltip.useEffect": ()=>{
            if (isDefaultOpen) {
                showLayer();
            }
        // eslint-disable-next-line @eslint-react/exhaustive-deps -- mount-only: isDefaultOpen is not reactive
        }
    }["useTooltip.useEffect"], []);
    // Controlled open state — overrides hover/focus triggers
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTooltip.useEffect": ()=>{
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
        }
    }["useTooltip.useEffect"], [
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$useLayerDismissal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayerDismissal"])({
        // Registered for the hook's lifetime rather than gated on `isLayerOpen`:
        // that state can lag a frame behind the DOM, so a press arriving right after
        // the layer appears would find nothing registered. Because this layer
        // CONSUMES the press, a stale registration would be worse than a missed one
        // — it would silently eat Escapes meant for the dialog underneath — so
        // presence is answered from the DOM at press time instead of from state.
        isActive: true,
        isPresent: {
            "useTooltip.useLayerDismissal": ()=>{
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
            }
        }["useTooltip.useLayerDismissal"],
        onDismiss: {
            "useTooltip.useLayerDismissal": ()=>{
                clearTimeouts();
                clearTapOpen();
                dropHold();
                if (isOpen !== undefined) {
                    onHide?.();
                    return;
                }
                hideLayer();
            }
        }["useTooltip.useLayerDismissal"]
    });
    // Render function that wraps layer.render with tooltip styling
    const renderTooltip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[renderTooltip]": (children, props)=>{
            const renderPlacement = props?.placement ?? placement;
            const renderProps = {
                placement: renderPlacement,
                alignment: props?.alignment ?? alignment,
                offset: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spacingVars"]['--spacing-1'],
                role: 'tooltip',
                xstyle: [
                    popoverXstyle,
                    __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerAnimations$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["layerAnimations"][renderPlacement]
                ],
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('tooltip').className,
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
                ref: contentRefs,
                ...{
                    className: "xfsso4q xy143xn x12gdq22 x1djylfy xw5ewwj x13faqbe"
                },
                children: children
            }), renderProps);
        }
    }["useTooltip.useCallback[renderTooltip]"], [
        renderLayer,
        placement,
        alignment,
        popoverXstyle,
        cancelHide,
        scheduleHide,
        contentRefs
    ]);
    const show = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[show]": ()=>{
            clearTimeouts();
            if (!isEnabled) {
                return;
            }
            setHeld(true);
            armOutsideDismiss();
            isHoldFromPressRef.current = isTriggerPressedRef.current;
            isHoldInThisTaskRef.current = true;
            triggerRef.current?.ownerDocument.defaultView?.setTimeout({
                "useTooltip.useCallback[show]": ()=>{
                    isHoldInThisTaskRef.current = false;
                }
            }["useTooltip.useCallback[show]"], 0);
            const latest = latestRef.current;
            if (latest.isOpen !== undefined) {
                latest.onShow?.();
                return;
            }
            showLayer();
        }
    }["useTooltip.useCallback[show]"], [
        clearTimeouts,
        isEnabled,
        setHeld,
        armOutsideDismiss,
        showLayer,
        latestRef
    ]);
    const hide = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTooltip.useCallback[hide]": ()=>{
            clearTimeouts();
            releaseHold();
        }
    }["useTooltip.useCallback[hide]"], [
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
"[project]/web/node_modules/@astryxdesign/core/dist/VisuallyHidden/VisuallyHidden.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
function VisuallyHidden({ children, as: element = 'span', ref, ...rest }) {
    // `className` and `style` are off the interface, and the ignored `xstyle`
    // is off by intent. Take all three back off at runtime so a cast cannot reach
    // the element either: `xstyle` is not a valid attribute, so spreading it writes
    // xstyle="[object Object]" into the DOM, and a cast `style` keeps the last word
    // on `position` and un-hides the node.
    const { xstyle: _xstyle, className: _className, style: _style, ...props } = rest;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(element, {
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
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/menuPressMarker.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/pressGroupContext.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerScopedContext.js [app-client] (ecmascript)");
// Button reads the marker here, not from its private StyleX module: a
// swizzled Button imports each StyleX module by its public path.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressGroupItem$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/pressGroupItem.stylex.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const PressGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('PressGroupContext', 1, null);
PressGroupContext.displayName = 'PressGroupContext';
const PressGroupBandContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerScopedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLayerScopedContext"])('PressGroupBandContext', 1, false);
PressGroupBandContext.displayName = 'PressGroupBandContext';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useAnnounce.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-client] (ecmascript)");
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
const channel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sharedState"])('hooks/use-announce/channel', 1, ()=>{
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
    const modal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(ModalAnnounceContext);
    // The latest write of a `hasReplace` instance. Its next message withdraws
    // it if assistive technology has not had it yet.
    const withdrawPreviousRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAnnounce.useCallback": (message, politeness = 'polite')=>{
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
        }
    }["useAnnounce.useCallback"], [
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
const ModalAnnounceContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSharedContext"])('ModalAnnounceContext', 1, null);
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
const pendingByRegion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sharedWeakMap"])('hooks/use-announce/pending-by-region', 1);
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
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useAnnounceRenderedText.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounce$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useAnnounce.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsHydrating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsHydrating.js [app-client] (ecmascript)");
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
    const ownAnnounce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounce$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnnounce"])();
    const announce = ownerAnnounce ?? ownAnnounce;
    const spokenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isHydrating = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsHydrating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsHydrating"])();
    // Captured once: an owner rendered before the document finished loading, or
    // hydrated from server HTML, is part of the page the person arrived at.
    const [renderedWithPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useAnnounceRenderedText.useState": ()=>isHydrating || document.readyState !== 'complete'
    }["useAnnounceRenderedText.useState"]);
    const isFirstRunRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    // Syncs the live region with the rendered text.
    // No dependency array: the text lives in the DOM, and a caller can change it
    // without a prop that this hook sees. One text read per render is cheap, and
    // the dedupe below makes later renders no-ops.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAnnounceRenderedText.useEffect": ()=>{
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
                text = (element.getAttribute('aria-labelledby') ?? '').split(/\s+/).map({
                    "useAnnounceRenderedText.useEffect": (id)=>{
                        // Each referenced element as read: its hidden parts dropped, as
                        // the accessible name drops them.
                        const target = element.ownerDocument.getElementById(id);
                        return target == null ? '' : renderedText(target);
                    }
                }["useAnnounceRenderedText.useEffect"]).join(' ').replace(/\s+/g, ' ').trim() || fallbackText;
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
        }
    }["useAnnounceRenderedText.useEffect"]);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useBusyAnnouncement.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBusyAnnouncement",
    ()=>useBusyAnnouncement
]);
/**
 * @file useBusyAnnouncement.ts
 * @input Whether the owning control is busy, the words to announce, and a ref
 *   to an element inside the control
 * @output Announces each busy start once, through the shared polite channel
 *   or a persistent region inside the open modal dialog holding the control
 * @position Core a11y hook for controls that show a decorative busy Spinner.
 *   It is a shared detail of the busy controls, so it is not in hooks/index.ts.
 */ // The busy Spinner is decorative, so the control announces its busy state,
// once for each busy start (AST-086). A re-render or a StrictMode replay does
// not repeat it, and the settle re-arms it. An owner calls the returned function
// when it announces the outcome. A busy start that is not yet announced is
// then dropped, so it never follows its own outcome. While a native modal is
// open, the page-body channel is not exposed. So a control in a modal
// announces through that dialog's polite region, also in a modal that an app
// renders without Astryx.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounce$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useAnnounce.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
function useBusyAnnouncement(isBusy, message, elementRef) {
    const announce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounce$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnnounce"])();
    const hasAnnouncedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const frameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // This busy start's share of the shared channel's pending text, until it
    // settles.
    const channelMessageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Or how to take back its write inside a modal, wherever the modal moves
    // it, until it settles.
    const modalMessageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Syncs the live region with `isBusy`. When it becomes true, the busy message
    // is announced one frame later.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBusyAnnouncement.useEffect": ()=>{
            if (!isBusy) {
                hasAnnouncedRef.current = false;
                channelMessageRef.current = null;
                modalMessageRef.current = null;
                return;
            }
            if (hasAnnouncedRef.current) {
                return;
            }
            // Choose the route a frame later: a Dialog opening in the same commit
            // calls showModal() in its own Effect, which runs after this one.
            const frame = requestAnimationFrame({
                "useBusyAnnouncement.useEffect.frame": ()=>{
                    frameRef.current = null;
                    hasAnnouncedRef.current = true;
                    // The nearest open native modal around the control's element, Astryx or
                    // app-rendered. Else the shared `useAnnounce` route, which follows the
                    // nearest Astryx modal around this hook's caller.
                    const dialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounce$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enclosingModalDialog"])(elementRef.current);
                    if (dialog != null) {
                        modalMessageRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounce$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["announceInModal"])(dialog, message);
                    } else {
                        announce(message, 'polite');
                        channelMessageRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounce$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["takeJoinedAnnouncement"])();
                    }
                }
            }["useBusyAnnouncement.useEffect.frame"]);
            frameRef.current = frame;
            return ({
                "useBusyAnnouncement.useEffect": ()=>{
                    cancelAnimationFrame(frame);
                    frameRef.current = null;
                }
            })["useBusyAnnouncement.useEffect"];
        }
    }["useBusyAnnouncement.useEffect"], [
        announce,
        elementRef,
        isBusy,
        message
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useBusyAnnouncement.useCallback": ()=>{
            if (frameRef.current != null) {
                cancelAnimationFrame(frameRef.current);
                frameRef.current = null;
                // Still busy until the settled state commits; do not schedule again.
                hasAnnouncedRef.current = true;
            }
            // Written to the channel, or inside the modal, but not yet exposed:
            // withdraw it too.
            if (channelMessageRef.current != null) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useAnnounce$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withdrawPendingAnnouncement"])(channelMessageRef.current, 'polite');
                channelMessageRef.current = null;
            }
            if (modalMessageRef.current != null) {
                const withdraw = modalMessageRef.current;
                modalMessageRef.current = null;
                withdraw();
            }
        }
    }["useBusyAnnouncement.useCallback"], []);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useClickableContainer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerSurfacePress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Layer/layerSurfacePress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$safeUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/safeUrl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/pressFeedback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressBox$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/pressBox.stylex.js [app-client] (ecmascript)");
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
    return matchesInteractiveSelectors(element) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Layer$2f$layerSurfacePress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLayerSurface"])(element);
}
function cancelNestedPress(event, container, ownAction) {
    const target = event.target;
    if (container == null || event.pointerType !== 'touch' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$privateAttributes$2f$pressBox$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pressBoxesIn"])(container).length === 0 || !(target instanceof Element) || target === event.currentTarget || !hasInteractiveAncestor(target, container) || // The container's own action, such as the control it delegates to: a
    // press on it activates the container.
    ownAction?.contains(target) === true) {
        return;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cancelPress"])(container);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useClickableContainer.useEffect": ()=>{
            const el = containerRef.current;
            if (el) {
                el.setAttribute(PRESSABLE_CONTAINER_ATTRIBUTE, 'true');
            }
        }
    }["useClickableContainer.useEffect"], [
        containerRef
    ]);
    return useClickableContainerProxy(options);
}
function useClickableContainerProxy({ containerRef, interactiveRef, onClick: onClickProp, href, target, disabled = false }) {
    const onClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useClickableContainerProxy.useCallback[onClick]": (event)=>{
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
            if (href != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$safeUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSafeUrl"])(href)) {
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
        }
    }["useClickableContainerProxy.useCallback[onClick]"], [
        containerRef,
        interactiveRef,
        onClickProp,
        href,
        target,
        disabled
    ]);
    const onMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useClickableContainerProxy.useCallback[onMouseUp]": (event)=>{
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
            if (isMiddleClick && href != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$safeUrl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSafeUrl"])(href) && (eventTarget === event.currentTarget || !hasInteractiveAncestor(eventTarget, containerEl))) {
                window.open(href, '_blank', 'noopener');
            }
        }
    }["useClickableContainerProxy.useCallback[onMouseUp]"], [
        containerRef,
        href,
        disabled
    ]);
    // The press-state counterpart of onClick's rule: a press that would not
    // activate the container shows no press on it. That holds for a finger on
    // every container, and for a mouse or a pen on one that owns a control's box.
    const onPointerDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useClickableContainerProxy.useCallback[onPointerDown]": (event)=>{
            if (disabled) {
                return;
            }
            cancelNestedPress(event, containerRef.current, interactiveRef?.current ?? null);
        }
    }["useClickableContainerProxy.useCallback[onPointerDown]"], [
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
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useCommittedRef.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
function useCommittedRef(value) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(value);
    useCommittedRefInto(ref, value);
    return ref;
}
function useCommittedRefInto(ref, value) {
    // Stores values only. Refs to DOM nodes are not attached yet when this runs.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInsertionEffect"])({
        "useCommittedRefInto.useInsertionEffect": ()=>{
            // eslint-disable-next-line react-compiler/react-compiler -- the caller hands over its own ref so that this hook writes it
            ref.current = value;
        }
    }["useCommittedRefInto.useInsertionEffect"]);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useDevWarning.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDevWarning",
    ()=>useDevWarning,
    "useDevWarningPerMessage",
    ()=>useDevWarningPerMessage
]);
/**
 * @file useDevWarning.ts
 * @input A component name, a message, and a boolean condition
 * @output Public once-per-mount warnings and an internal per-message variant
 * @position Core hook; both paths share one render-safe diagnostic owner.
 *   A stable instance and an effect warn after commit, without a re-render.
 *
 * SYNC: When modified, update:
 * - /packages/core/src/hooks/index.ts
 * - /packages/core/src/utils/devWarning.ts (the imperative counterpart)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/devWarning.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
function useDevWarning(component, message, condition = true) {
    useWarning(component, message, condition, false);
}
function useDevWarningPerMessage(component, message, condition = true) {
    useWarning(component, message, condition, true);
}
function useWarning(component, message, condition, isPerMessage) {
    // State survives Fast Refresh, so a hot update does not repeat a warning.
    const [warn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDevWarnings"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWarning.useEffect": ()=>{
            // Synchronize the development diagnostic sink after committed renders.
            if (condition) {
                warn(component, message, isPerMessage ? message : '');
            }
        }
    }["useWarning.useEffect"], [
        component,
        message,
        condition,
        isPerMessage,
        warn
    ]);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useEntryAnimation.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsHydrating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsHydrating.js [app-client] (ecmascript)");
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
if (typeof window !== 'undefined') {
    requestAnimationFrame(()=>{
        initialPaintComplete = true;
    });
}
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
    const isHydrating = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useIsHydrating$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsHydrating"])();
    // Captured once: a hydrated element must not start animating when React
    // re-renders it with the client snapshot after hydration.
    const [animate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useEntryAnimation.useState": ()=>!isHydrating && initialPaintComplete
    }["useEntryAnimation.useState"]);
    return animate ? styles[preset] : null;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useInputContainer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useClickableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/hooks/useClickableContainer.js [app-client] (ecmascript)");
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
    const onClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useInputContainer.useCallback[onClick]": ()=>{
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
        }
    }["useInputContainer.useCallback[onClick]"], [
        inputRef
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$hooks$2f$useClickableContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClickableContainer"])({
        containerRef,
        interactiveRef: inputRef,
        onClick,
        disabled
    });
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useInputStatusIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useInputStatusIcon",
    ()=>useInputStatusIcon
]);
/**
 * @file useInputStatusIcon.tsx
 * @input Input status, statusVariant, and InputGroup awareness
 * @output The on-field status icon element (with tooltip) and aria-describedby wiring
 * @position Shared hook for bordered inputs that render a status affordance inside the control
 *
 * SYNC: When modified, update:
 * - /packages/core/src/hooks/index.ts (exports)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@stylexjs/stylex/lib/es/stylex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Icon/Icon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Tooltip/useTooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/themeProps.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/focusOutline.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$hooks$2f$useInputStatusIcon$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/hooks/useInputStatusIcon.generated.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEnglishFallback"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$generated$2d$english$2f$hooks$2f$useInputStatusIcon$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
/**
 * Maps each status type to its glyph. Shared so every input shows the same icon
 * for a given status, matching the detached message box's leading icon.
 */ const STATUS_ICON = {
    warning: 'warning',
    error: 'error',
    success: 'success'
};
/**
 * Accessible-name i18n keys for the focusable status button, keyed by type.
 */ const STATUS_BUTTON_LABEL_KEY = {
    warning: '@astryx.input.statusButton.warning',
    error: '@astryx.input.statusButton.error',
    success: '@astryx.input.statusButton.success'
};
const styles = {
    statusButton: {
        k1xSpc: "x3nfvp2",
        kGNEyG: "x6s0dn4",
        kjj79g: "xl56j7k",
        kmVPX3: "x1717udv",
        kogj98: "x1ghz6dp",
        kMzoRj: "xc342km",
        ksu8eU: "xng3xce",
        kWkggS: "xjbqb8w",
        kMwMTN: "x1heor9g",
        kkrTdU: "x1ypdohk x16khyan",
        kfzvcC: "x67bb7w",
        kaIpWk: "xjspbzw",
        kInvED: "x7s97pk",
        $$css: true
    }
};
function useInputStatusIcon({ status, statusVariant = 'attached', isInGroup = false, size = 'md' }) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$useComponentTranslator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useComponentTranslator"])();
    const isTooltipVariant = statusVariant === 'tooltip';
    const hasTooltip = isTooltipVariant && !!status?.message;
    // Touch tap-to-toggle. Hover is unavailable on touch, and useTooltip
    // suppresses simulated hover there, so on touch a tap controls visibility.
    // `undefined` leaves the tooltip uncontrolled (pointer + keyboard drive it);
    // a boolean takes control for the current open/close cycle.
    const [tapOpen, setTapOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const tooltip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Tooltip$2f$useTooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTooltip"])({
        placement: 'above',
        isEnabled: hasTooltip,
        isOpen: tapOpen
    });
    // Give control back to hover and focus after a tap-opened tooltip is
    // dismissed.
    const handleButtonBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useInputStatusIcon.useCallback[handleButtonBlur]": ()=>{
            setTapOpen(undefined);
        }
    }["useInputStatusIcon.useCallback[handleButtonBlur]"], []);
    const handleButtonClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useInputStatusIcon.useCallback[handleButtonClick]": ()=>{
            // Only take control on touch/hover-less devices. On hover-capable devices
            // pointer hover and keyboard focus already drive the tooltip (uncontrolled),
            // so a click-toggle would fight them; leave it uncontrolled there.
            if (typeof window === 'undefined' || typeof window.matchMedia !== 'function' || !window.matchMedia('(hover: none)').matches) {
                return;
            }
            setTapOpen({
                "useInputStatusIcon.useCallback[handleButtonClick]": (prev)=>prev === true ? false : true
            }["useInputStatusIcon.useCallback[handleButtonClick]"]);
        }
    }["useInputStatusIcon.useCallback[handleButtonClick]"], []);
    // Escape dismisses a tap-opened tooltip and returns to the uncontrolled
    // state. useTooltip handles Escape only when it is uncontrolled.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInputStatusIcon.useEffect": ()=>{
            if (tapOpen !== true) {
                return;
            }
            const onKeyDown = {
                "useInputStatusIcon.useEffect.onKeyDown": (e)=>{
                    if (e.key === 'Escape') {
                        setTapOpen(undefined);
                    }
                }
            }["useInputStatusIcon.useEffect.onKeyDown"];
            document.addEventListener('keydown', onKeyDown);
            return ({
                "useInputStatusIcon.useEffect": ()=>document.removeEventListener('keydown', onKeyDown)
            })["useInputStatusIcon.useEffect"];
        }
    }["useInputStatusIcon.useEffect"], [
        tapOpen
    ]);
    // Inside a group the group owns status rendering; the detached message box
    // renders its own leading icon, so the on-field icon would duplicate it.
    const shouldRenderIcon = !!status && !isInGroup && statusVariant !== 'detached';
    if (!shouldRenderIcon) {
        return {
            statusIcon: null,
            describedBy: undefined
        };
    }
    const icon = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Icon$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
        icon: STATUS_ICON[status.type],
        size: size,
        color: status.type,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$themeProps$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["themeProps"])('input-status-icon', {
            size,
            status: status.type
        })
    });
    // Attached (and tooltip-without-message) variants: plain, non-interactive
    // icon. The message box (attached) already carries the text.
    if (!hasTooltip) {
        return {
            statusIcon: icon,
            describedBy: undefined
        };
    }
    return {
        statusIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("button", {
                    type: "button",
                    ref: tooltip.ref,
                    "aria-label": t(STATUS_BUTTON_LABEL_KEY[status.type]),
                    "aria-describedby": tooltip.describedBy,
                    onClick: handleButtonClick,
                    onBlur: handleButtonBlur,
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$stylexjs$2f$stylex$2f$lib$2f$es$2f$stylex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["props"](__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$focusOutline$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focusOutlineStyles"].focusVisible, styles.statusButton),
                    children: icon
                }),
                tooltip.renderTooltip(status.message)
            ]
        }),
        describedBy: tooltip.describedBy
    };
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useIsHydrating.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
// Nothing ever changes, so there is nothing to subscribe to.
const subscribe = ()=>()=>{};
const getSnapshot = ()=>false;
const getServerSnapshot = ()=>true;
function useIsHydrating() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, getSnapshot, getServerSnapshot);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useMergedRefs.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/mergeRefs.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
function useMergedRefs(refA, refB, refC, refD, refE, refF) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useMergedRefs.useMemo": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$mergeRefs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeRefs"])(refA, refB, refC, refD, refE, refF)
    }["useMergedRefs.useMemo"], [
        refA,
        refB,
        refC,
        refD,
        refE,
        refF
    ]);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/usePressFeedback.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/pressFeedback.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
function usePressFeedback() {
    // Syncs the shared document listener for press feedback with this mount.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePressFeedback.useEffect": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["installPressFeedback"])()
    }["usePressFeedback.useEffect"], []);
    return __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressFeedback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pressableProps"];
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/hooks/useResolvedRequired.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FormLayout$2f$FormLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/FormLayout/FormLayoutContext.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
function useResolvedOptionality({ isRequired = false, isOptional = false }) {
    const { defaultOptionality } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$FormLayout$2f$FormLayoutContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLayoutContext"]);
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
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/InternationalizationContext.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$resolve$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/resolve.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedContext.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
const InternationalizationContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSharedContext"])('InternationalizationContext', 1, {
    locale: 'en',
    direction: 'ltr',
    messages: {},
    translate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$resolve$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getResolve"])('en', {})
});
InternationalizationContext.displayName = 'InternationalizationContext';
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-client] (ecmascript)");
;
// Every copy of Core registers into one map, so a context that one copy
// created resolves the English of another copy's components.
const registered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["realmValue"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sharedKey"])('i18n/english-fallback', 1), ()=>({}));
const englishFallback = registered;
function registerEnglishFallback(messages) {
    Object.assign(registered, messages);
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/firstStrongDirection.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Banner/Banner.generated.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Button/Button.generated.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Field/FieldLabel.generated.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Field/InputClearButton.generated.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @generated by scripts/generate-i18n-runtime.mjs from packages/core/locales/en.json,
 * holding the English for the catalog keys named in packages/core/src/Field/InputClearButton.tsx.
 * Do not edit by hand. Run `pnpm generate:i18n-runtime` instead.
 */ const english = {
    "@astryx.inputClearButton.tooltip": "Clear"
};
const __TURBOPACK__default__export__ = english;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/InfoTip/InfoTip.generated.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/Spinner/Spinner.generated.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/TextInput/TextInput.generated.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @generated by scripts/generate-i18n-runtime.mjs from packages/core/locales/en.json,
 * holding the English for the catalog keys named in packages/core/src/TextInput/TextInput.tsx.
 * Do not edit by hand. Run `pnpm generate:i18n-runtime` instead.
 */ const english = {
    "@astryx.spinner.loading": "Loading",
    "@astryx.textInput.clearLabel": "Clear {label}"
};
const __TURBOPACK__default__export__ = english;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/generated-english/hooks/useInputStatusIcon.generated.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @generated by scripts/generate-i18n-runtime.mjs from packages/core/locales/en.json,
 * holding the English for the catalog keys named in packages/core/src/hooks/useInputStatusIcon.tsx.
 * Do not edit by hand. Run `pnpm generate:i18n-runtime` instead.
 */ const english = {
    "@astryx.input.statusButton.error": "Error details",
    "@astryx.input.statusButton.success": "Success details",
    "@astryx.input.statusButton.warning": "Warning details"
};
const __TURBOPACK__default__export__ = english;
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/resolve.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$intl$2d$messageformat$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/intl-messageformat/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/englishFallback.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/devWarning.js [app-client] (ecmascript)");
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
        f = new __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$intl$2d$messageformat$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](message, locale);
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
function getResolve(locale, messages, overrides, english = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$englishFallback$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["englishFallback"]) {
    const lookup = getLookup(locale, messages, overrides);
    return (key, values)=>{
        const result = lookup[key] ?? english[key];
        if (result === undefined) {
            // Fires ONLY when a key is missing from every source including the
            // shipped `en` catalog — a real bug (typo, stale catalog, deleted key).
            // Fallback to `en` from a non-en locale is expected and stays silent,
            // matching the FormatJS / i18next default.
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warnOnce"])(`astryx-i18n:${locale}::${key}`, 'astryx-i18n', `missing key: ${key} (locale: ${locale})`);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$devWarning$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__resetDevWarnings"])();
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/i18n/useComponentTranslator.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$InternationalizationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/i18n/InternationalizationContext.js [app-client] (ecmascript)");
// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';
;
;
;
function useComponentTranslator() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$i18n$2f$InternationalizationContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InternationalizationContext"]);
    return ctx.translate;
}
}),
"[project]/web/node_modules/@astryxdesign/core/dist/internal/touchHitArea.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/keyboard/keyboardHeight.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/clickGuard.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$coarsePointer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/coarsePointer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/inputStream.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/nodeType.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$layoutViewport$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/layoutViewport.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/pressGesture.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$selectionLock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/selectionLock.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-client] (ecmascript)");
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
    const height = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$layoutViewport$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["layoutViewportHeight"])(win) - viewport.height * (viewport.scale ?? 1);
    return height > KEYBOARD_EPSILON ? Math.round(height * 100) / 100 : 0;
}
/** A report from the keyboard module, in the order the window raised them. */ const stores = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sharedWeakMap"])('keyboard/keyboard-height/stores', 1);
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
    return height > KEYBOARD_EPSILON && height < shown - KEYBOARD_EPSILON && hasVirtualKeyboard(win) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$coarsePointer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchesMediaQuery"])(win, REDUCED_MOTION_QUERY);
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
    const stopResize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeInput"])(win, 'resize', (event)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNode"])(event.target)) {
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
    const stopFocusIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeInput"])(win, 'focusin', onFocus);
    const stopFocusOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeInput"])(win, 'focusout', onFocus);
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
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(element) || element.getAttribute('inputmode') === 'none') {
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
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElement"])(target)) {
        return null;
    }
    const direct = target.closest('input, textarea, [contenteditable]:not([contenteditable="false"])');
    if (container.contains(direct) && isTextEntryControl(direct)) {
        return direct;
    }
    const label = target.closest('label');
    const control = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(label) ? label.control : null;
    return container.contains(control) && isTextEntryControl(control) ? control : null;
}
/** The caller's rules for refuseFocusReveal. */ // One shared `blur` subscription per document serves every caller of
// refuseFocusReveal in it, so listeners do not grow with the number of
// instances. The first caller adds it, and the last removes it.
const focusTakeovers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sharedWeakMap"])('keyboard/keyboard-height/focus-takeovers', 1);
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
        const stop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'blur', (event)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$nodeType$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNode"])(event.target)) {
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
const touchStartWatches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sharedWeakMap"])('keyboard/keyboard-height/touch-start-watches', 1);
function watchTouchStarts(doc, onTouchStart) {
    let shared = touchStartWatches.get(doc);
    if (shared == null) {
        const view = doc.defaultView;
        if (view == null) {
            return ()=>{};
        }
        const watches = new Set();
        const stop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$inputStream$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeInput"])(view, 'touchstart', ()=>{
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
        Math.hypot(touch.clientX - start.x, touch.clientY - start.y) > __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$pressGesture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRESS_SLOP_PX"]) {
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$clickGuard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["armClickGuard"])(region.ownerDocument, {
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
    const caret = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$selectionLock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["caretAt"])(control.ownerDocument, x, y, []);
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
    const caret = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$selectionLock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["caretAt"])(doc, x, y, []);
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
"[project]/web/node_modules/@astryxdesign/core/dist/keyboard/keyboardLayoutGuide.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/keyboard/keyboardHeight.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/keyboard/keyboardModel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/sharedRealm.js [app-client] (ecmascript)");
;
;
;
function keyboardProfileOf(win) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasVirtualKeyboard"])(win) ? 'chromium' : null;
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTextEntryControl"])(element) || element instanceof HTMLSelectElement && !element.disabled;
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
const guides = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$sharedRealm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sharedWeakMap"])('keyboard/keyboard-layout-guide/guides', 1);
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
    let model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createKeyboardModel"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getKeyboardHeight"])(win));
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
            const inset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getKeyboardHeight"])(win);
            if (inset != null && inset > 0.5 && awaitsHide()) {
                return;
            }
            publish(model.verify(inset, win.performance.now()));
        }, Math.max(0, due - win.performance.now()));
    };
    const attach = ()=>{
        profile = keyboardProfileOf(win);
        model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardModel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createKeyboardModel"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getKeyboardHeight"])(win));
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
                    publish(model.report((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getKeyboardHeight"])(win), settled));
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
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$keyboard$2f$keyboardHeight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeKeyboardHeight"])(win, onReport, {
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
"[project]/web/node_modules/@astryxdesign/core/dist/keyboard/keyboardModel.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$android$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/android/keyboard.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$bezier$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/bezier.js [app-client] (ecmascript)");
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
        const ease = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$bezier$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezier"])(slide.points);
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
        durationMs: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$android$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyboard"].showMs,
        points: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$android$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyboard"].showCurve
    };
    const hideSlide = {
        durationMs: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$android$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyboard"].hideMs,
        points: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$android$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyboard"].hideCurve
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
                return begin('hide', 0, time - __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$android$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyboard"].hideReportLagMs);
            }
            if (target <= EPSILON) {
                // Chrome reports the show just after Gboard starts up: ride from
                // that moment, joining the slide where it is. A smaller first
                // report is the accessory bar, the keyboard's own following: ride
                // to the last keyboard's height and let its report confirm it.
                const predicted = shownInset > inset + EPSILON;
                return begin('show', predicted ? shownInset : inset, time - __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$android$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyboard"].showReportLagMs, {
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
            return begin('hide', 0, time + __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$android$2f$keyboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyboard"].hideAfterBlurMs, {
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
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/hapticSwitch.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/layerPortalBoundary.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/layerRoot.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/press.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/tokens.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/motion/reducedMotion.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/utils/interactionOverlay.stylex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Indicator$2f$indicator$2e$markers$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Indicator/indicator.markers.stylex.js [app-client] (ecmascript)");
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
const PRESS_ALPHA = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$utils$2f$interactionOverlay$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pressVars"]['--astryx-press-alpha'];
const hoverImage = `linear-gradient(${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorVars"]['--color-overlay-hover']}, ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorVars"]['--color-overlay-hover']})`;
const pressedImage = `linear-gradient(${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorVars"]['--color-overlay-pressed']}, ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorVars"]['--color-overlay-pressed']})`;
/** The overlay's paint, read back off the element (its gradient layer). */ const pressedOverlayImage = 'var(--_press-paint-image)';
/**
 * The overlay's strength release (interactionOverlay.stylex.ts), restated so
 * a fine pointer keeps it: the same keyframes, so the same animation.
 */ const pressRelease = "x10jkm1t-B";
/**
 * A press layer's clock as CSS: the strength release's clock, the theme's
 * exit duration, so the layer and the strength land together.
 */ const CELL_RELEASE = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["durationVars"]['--duration-exit'];
/** The same clock under Reduce Motion, no longer than the Reduce Motion fade. */ const CELL_RELEASE_REDUCED = `min(${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["durationVars"]['--duration-exit']}, ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$motion$2f$reducedMotion$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reducedMotionFadeConsts"].duration})`;
const REDUCED_MOTION = '@media (prefers-reduced-motion: reduce)';
/** Opacity 1 → 0: the row layer leaves; its fading arm runs it. */ const cellRelease = "x1jn504y-B";
/** The release's curve: the theme's exit easing, as the strength's. */ const RELEASE_EASE = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easeVars"]['--ease-exit'];
/** A List divider's width (ListItem's bottom border). */ const DIVIDER_WIDTH = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$tokens$2e$stylex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["borderVars"]['--border-width'];
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
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/pressBox.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/pressGroupItem.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/web/node_modules/@astryxdesign/core/dist/privateAttributes/pressHoldsDrag.stylex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
]);

//# sourceMappingURL=0aq__%40astryxdesign_core_dist_19-7gkdccrhpt._.js.map