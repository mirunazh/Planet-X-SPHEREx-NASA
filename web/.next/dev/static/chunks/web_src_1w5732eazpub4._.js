(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/src/app/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$Theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/Theme.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$LinkProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Link/LinkProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$skyblink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/theme/skyblink.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const STYLE_ID = 'skyblink-theme';
// The theme CSS is generated during the server render and shipped in the HTML, so the first paint is
// already themed. (defineTheme is client-only code, so a server component cannot do this.) The
// browser reuses the shipped text instead of generating it a second time.
function ThemeStyle() {
    _s();
    const [css] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ThemeStyle.useState": ()=>(typeof document === 'undefined' ? null : document.getElementById(STYLE_ID)?.textContent) ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$skyblink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["skyblinkCss"])()
    }["ThemeStyle.useState"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
        id: STYLE_ID,
        dangerouslySetInnerHTML: {
            __html: css
        }
    }, void 0, false, {
        fileName: "[project]/web/src/app/providers.tsx",
        lineNumber: 16,
        columnNumber: 10
    }, this);
}
_s(ThemeStyle, "JQRbjHOf9b/3hP3uLByTnCGgA2U=");
_c = ThemeStyle;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$Theme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Theme"], {
        theme: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$skyblink$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["skyblinkBuilt"],
        mode: "dark",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeStyle, {}, void 0, false, {
                fileName: "[project]/web/src/app/providers.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$LinkProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinkProvider"], {
                component: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                children: children
            }, void 0, false, {
                fileName: "[project]/web/src/app/providers.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/web/src/app/providers.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c1 = Providers;
var _c, _c1;
__turbopack_context__.k.register(_c, "ThemeStyle");
__turbopack_context__.k.register(_c1, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/theme/skyblink.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "skyblinkBuilt",
    ()=>skyblinkBuilt,
    "skyblinkCss",
    ()=>skyblinkCss,
    "skyblinkTheme",
    ()=>skyblinkTheme
]);
// The app's Astryx theme: dark only, built from tokens.ts. It extends Neutral for its component
// rules (segmented control, switch, badge) and pins every colour explicitly, the accent included,
// because a seeded accent comes out inverted in dark mode (Astryx issue 4276, note 14 E3).
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$defineTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/defineTheme.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$generateThemeRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/theme/generateThemeRules.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$theme$2d$neutral$2f$dist$2f$source$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/theme-neutral/dist/source.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/theme/tokens.ts [app-client] (ecmascript)");
;
;
;
const px = (n)=>`${n}px`;
const tint = (hex, alpha)=>{
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${n >> 16}, ${n >> 8 & 255}, ${n & 255}, ${alpha})`;
};
const touch = px(44);
const statusTokens = Object.fromEntries([
    'info',
    'success',
    'error'
].flatMap((s)=>[
        [
            `--color-${s}`,
            __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"][s]
        ],
        [
            `--color-${s}-muted`,
            tint(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"][s], 0.14)
        ],
        [
            `--color-text-${s}`,
            __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"][s]
        ],
        [
            `--color-on-${s}`,
            __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].onAccent
        ],
        [
            `--color-on-${s}-muted`,
            __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].text
        ]
    ]));
const spacing = Object.fromEntries([
    0,
    0.5,
    1,
    1.5,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12
].map((n)=>[
        `--spacing-${String(n).replace('.', '-')}`,
        px(n * __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spaceUnit"])
    ]));
/** App-only tokens, read by globals.css as var(--sb-...). */ const appTokens = {
    '--sb-bg': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].bg,
    '--sb-surface': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].surface,
    '--sb-raised': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].raised,
    '--sb-border': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].border,
    '--sb-border-strong': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].borderStrong,
    '--sb-text': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].text,
    '--sb-text-muted': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].textMuted,
    '--sb-text-faint': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].textFaint,
    '--sb-accent': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].accent,
    '--sb-accent-text': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].accentText,
    '--sb-accent-muted': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].accentMuted,
    '--sb-on-accent': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].onAccent,
    '--sb-plate': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].plate,
    '--sb-no-data': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].noData,
    '--sb-marker-predicted': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marker"].predicted,
    '--sb-marker-measured': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marker"].measured,
    '--sb-marker-input': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marker"].input,
    '--sb-marker-neighbour': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marker"].neighbour,
    '--sb-font-ui': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["font"].ui,
    '--sb-font-data': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["font"].data,
    ...Object.fromEntries(Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["type"]).flatMap(([k, [size, lead]])=>[
            [
                `--sb-text-${k}`,
                px(size)
            ],
            [
                `--sb-lead-${k}`,
                px(lead)
            ]
        ])),
    '--sb-duration-blink': `${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].blink}ms`,
    '--sb-touch': touch
};
const skyblinkTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$defineTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["defineTheme"])({
    name: 'skyblink',
    extends: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$theme$2d$neutral$2f$dist$2f$source$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["neutralTheme"],
    localTokens: appTokens,
    typography: {
        scale: {
            base: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["type"].ui[0],
            ratio: 1.2
        },
        body: {
            family: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["font"].ui
        },
        heading: {
            family: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["font"].ui
        },
        code: {
            family: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["font"].data
        }
    },
    motion: {
        fast: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].fast,
        medium: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].medium,
        slow: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].slow,
        ratio: 0.75
    },
    components: {
        // The accent is reserved for the primary action and the thing that moved, so an "on" switch is a quiet light grey.
        switch: {
            base: {
                '--color-accent': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].textMuted,
                '--color-background-gray': 'var(--color-border-emphasized)'
            }
        }
    },
    adaptations: {
        rules: [
            {
                // Phones: every control is at least 44 px tall.
                when: {
                    width: {
                        below: 'sm'
                    }
                },
                value: {
                    tokens: {
                        '--size-element-sm': touch,
                        '--size-element-md': touch,
                        '--size-element-lg': touch
                    },
                    components: {
                        'segmented-control': {
                            base: {
                                padding: '0px'
                            }
                        },
                        'segmented-control-item': {
                            'size:sm': {
                                height: touch
                            },
                            'size:md': {
                                height: touch
                            }
                        }
                    }
                }
            }
        ]
    },
    tokens: {
        ...spacing,
        '--radius-inner': px(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].inner),
        '--radius-element': px(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].element),
        '--radius-container': px(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].container),
        '--radius-page': px(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["radius"].page),
        '--color-background-body': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].bg,
        '--color-background-surface': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].surface,
        '--color-background-card': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].surface,
        '--color-background-popover': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].raised,
        '--color-background-muted': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].raised,
        '--color-neutral': 'rgba(214, 224, 255, 0.08)',
        '--color-overlay': 'rgba(4, 6, 10, 0.8)',
        '--color-overlay-hover': 'rgba(214, 224, 255, 0.06)',
        '--color-overlay-pressed': 'rgba(214, 224, 255, 0.10)',
        '--color-border': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].border,
        '--color-border-emphasized': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].borderStrong,
        '--color-skeleton': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].raised,
        '--color-shadow': 'rgba(0, 0, 0, 0.5)',
        '--color-text-primary': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].text,
        '--color-text-secondary': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].textMuted,
        '--color-text-disabled': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].textFaint,
        '--color-icon-primary': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].text,
        '--color-icon-secondary': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].textMuted,
        '--color-icon-disabled': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].textFaint,
        '--color-accent': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].accent,
        '--color-accent-muted': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].accentMuted,
        '--color-text-accent': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].accentText,
        '--color-icon-accent': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].accent,
        '--color-on-accent': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].onAccent,
        '--focus-outline-color': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].accent,
        ...statusTokens,
        // The only warning in the app is "It moved", so warning wears the infrared accent.
        '--color-warning': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].accent,
        '--color-warning-muted': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].accentMuted,
        '--color-text-warning': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].accentText,
        '--color-on-warning': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].onAccent,
        '--color-on-warning-muted': '#FFC2AE',
        '--color-background-orange': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].accentMuted,
        '--color-text-orange': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].accentText,
        '--color-border-orange': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].accent,
        '--color-background-gray': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].raised,
        '--color-text-gray': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].textMuted,
        '--color-border-gray': __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].borderStrong
    }
});
const skyblinkBuilt = {
    ...skyblinkTheme,
    __built: true
};
function skyblinkCss() {
    const { prose, component } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$theme$2f$generateThemeRules$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateThemeCSS"])(skyblinkTheme);
    return [
        '@layer reset, astryx-base, astryx-theme;',
        `@layer reset {\n${prose}\n}`,
        `@layer astryx-theme {\n:root { color-scheme: dark; }\n${component}\n}`
    ].join('\n');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/theme/tokens.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Design tokens: the one source for colour, type, spacing, radius and motion. They feed the Astryx
// theme (skyblink.ts) and, as --sb-* custom properties, the app's own CSS (globals.css) and canvas.
//
// Contrast (WCAG 2 ratio, computed): on bg / on surface. Marker colours are measured against a
// typical sky pixel, #262626 (grey 38/255 = the median of the per-visit median pixel over all five
// targets after the display stretch); each marker also has a dark outline and its own shape.
// Okabe-Ito hexes checked against Okabe & Ito, "Color Universal Design", fig. 16
// (jfly.uni-koeln.de/color/): sky blue 86,180,233; yellow 240,228,66; reddish purple 204,121,167;
// bluish green 0,158,115.
__turbopack_context__.s([
    "color",
    ()=>color,
    "font",
    ()=>font,
    "marker",
    ()=>marker,
    "motion",
    ()=>motion,
    "radius",
    ()=>radius,
    "spaceUnit",
    ()=>spaceUnit,
    "type",
    ()=>type
]);
const color = {
    bg: '#080B12',
    surface: '#0E1422',
    raised: '#161D30',
    border: 'rgba(214, 224, 255, 0.10)',
    borderStrong: '#3A4666',
    text: '#E8ECF6',
    textMuted: '#A3AEC9',
    textFaint: '#5B6786',
    accent: '#FF6A3D',
    accentText: '#FF8A63',
    accentMuted: 'rgba(255, 106, 61, 0.16)',
    onAccent: '#10121A',
    plate: '#04060A',
    noData: '#6E1830',
    info: '#6FB3FF',
    success: '#3DDC97',
    warning: '#F0C24B',
    error: '#FF5C7A'
};
const marker = {
    predicted: '#56B4E9',
    measured: '#F0E442',
    input: '#CC79A7',
    neighbour: '#009E73',
    outline: 'rgba(0, 0, 0, 0.85)'
};
const font = {
    ui: 'var(--font-inter), system-ui, -apple-system, "Segoe UI", sans-serif',
    data: 'var(--font-mono), ui-monospace, "SF Mono", Menlo, monospace'
};
const type = {
    caption: [
        12,
        16
    ],
    ui: [
        14,
        20
    ],
    body: [
        16,
        24
    ],
    title: [
        20,
        28
    ],
    heading: [
        28,
        34
    ],
    display: [
        104,
        100
    ]
};
const spaceUnit = 4;
const radius = {
    inner: 4,
    element: 6,
    container: 10,
    page: 16
};
const motion = {
    fast: 120,
    medium: 200,
    slow: 400,
    blink: 1200
}; // Breakpoints (CSS media queries cannot read variables, so globals.css repeats these numbers):
 // below 640 px (Astryx 'sm') every control is 44 px tall; below 960 px /watch stacks into one column.
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=web_src_1w5732eazpub4._.js.map