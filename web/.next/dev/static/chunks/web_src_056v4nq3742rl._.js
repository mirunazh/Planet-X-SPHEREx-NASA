(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/src/components/CoordForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CoordForm",
    ()=>CoordForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Banner$2f$Banner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Banner/Banner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Button/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$TextInput$2f$TextInput$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/TextInput/TextInput.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/resolve.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/sky.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/strings.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$MoverBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/MoverBanner.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
const CHALLENGE = '08h55m10.831s -07d14m42.53s';
function CoordForm() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [res, setRes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const submit = async (value = text)=>{
        setRes(null);
        const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseCoords"])(value);
        if (!r.ok) return setError(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"][r.error]);
        setError(null);
        setBusy(true);
        try {
            const resolution = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePosition"])(r.ra, r.dec);
            // A known object crossed this spot: explain first. Otherwise go straight to the images.
            if (resolution.hits.length) setRes(resolution);
            else router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["watchHref"])(resolution.mission?.id ?? null, r.ra, r.dec));
        } catch (e) {
            setError(`${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].loadFailed} ${String(e)}`);
        } finally{
            setBusy(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "lookup",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "coord-form",
                onSubmit: (e)=>{
                    e.preventDefault();
                    void submit();
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "coord-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$TextInput$2f$TextInput$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextInput"], {
                                label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].coordLabel,
                                description: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].coordHelp,
                                placeholder: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].coordPlaceholder,
                                value: text,
                                onChange: (v)=>setText(v),
                                status: error ? {
                                    type: 'error',
                                    message: error
                                } : undefined,
                                hasSpellCheck: false,
                                autoComplete: "off",
                                width: "100%"
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/CoordForm.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].coordSubmit,
                                type: "submit",
                                variant: "primary",
                                isLoading: busy
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/CoordForm.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/CoordForm.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].tryChallenge(CHALLENGE),
                        variant: "ghost",
                        onClick: ()=>{
                            setText(CHALLENGE);
                            void submit(CHALLENGE);
                        },
                        children: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].tryChallengeShort,
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "data",
                                children: CHALLENGE
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/CoordForm.tsx",
                                lineNumber: 71,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/CoordForm.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/components/CoordForm.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            busy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Banner$2f$Banner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Banner"], {
                status: "info",
                title: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].searching
            }, void 0, false, {
                fileName: "[project]/web/src/components/CoordForm.tsx",
                lineNumber: 74,
                columnNumber: 16
            }, this),
            res && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$MoverBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MoverBanner"], {
                res: res
            }, void 0, false, {
                fileName: "[project]/web/src/components/CoordForm.tsx",
                lineNumber: 75,
                columnNumber: 15
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/web/src/components/CoordForm.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(CoordForm, "dNRIkEJIsVE48Kp13jTd+/sSHc8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CoordForm;
var _c;
__turbopack_context__.k.register(_c, "CoordForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/components/MoverBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MoverBanner",
    ()=>MoverBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Banner$2f$Banner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Banner/Banner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Button/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/resolve.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/strings.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
;
function MoverBanner({ res, here = false }) {
    const best = res.hits[0];
    if (!best) return null;
    const name = res.name ?? best.mover.name;
    const more = res.hits.length > 1 ? ` ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].otherMovers(res.hits.length - 1)}` : '';
    if (res.moved) {
        const href = res.mission ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["watchHref"])(res.mission.id, res.ra, res.dec) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["watchHref"])(null, best.nowRa, best.nowDec);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Banner$2f$Banner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Banner"], {
            status: "warning",
            title: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].movedTitle(name),
            description: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].movedBody(String(Math.round(best.year)), best.nowSepArcsec, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPASS_WORDS"][best.nowDirection]) + more,
            endContent: here ? undefined : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].jumpToIt,
                variant: "primary",
                href: href
            }, void 0, false, {
                fileName: "[project]/web/src/components/MoverBanner.tsx",
                lineNumber: 23,
                columnNumber: 40
            }, this)
        }, void 0, false, {
            fileName: "[project]/web/src/components/MoverBanner.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Banner$2f$Banner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Banner"], {
        status: "info",
        title: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].hereTitle(name),
        description: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].hereBody(name, best.nowSepArcsec.toFixed(1)) + more,
        endContent: here || !res.mission ? undefined : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].openMission,
            variant: "primary",
            href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["watchHref"])(res.mission.id, res.ra, res.dec)
        }, void 0, false, {
            fileName: "[project]/web/src/components/MoverBanner.tsx",
            lineNumber: 32,
            columnNumber: 54
        }, this)
    }, void 0, false, {
        fileName: "[project]/web/src/components/MoverBanner.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = MoverBanner;
var _c;
__turbopack_context__.k.register(_c, "MoverBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/components/TargetCards.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TargetCards",
    ()=>TargetCards
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Badge$2f$Badge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Badge/Badge.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$ClickableCard$2f$ClickableCard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/ClickableCard/ClickableCard.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/resolve.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/strings.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function TargetCards() {
    _s();
    const [index, setIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TargetCards.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadIndex"])().then(setIndex, {
                "TargetCards.useEffect": (e)=>setError(String(e))
            }["TargetCards.useEffect"]);
        }
    }["TargetCards.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "targets",
        "aria-labelledby": "targets",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                id: "targets",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].targetsHeading
            }, void 0, false, {
                fileName: "[project]/web/src/components/TargetCards.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "targets-intro",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].targetsIntro
            }, void 0, false, {
                fileName: "[project]/web/src/components/TargetCards.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted",
                children: `${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].loadFailed} ${error}`
            }, void 0, false, {
                fileName: "[project]/web/src/components/TargetCards.tsx",
                lineNumber: 21,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cards",
                children: index?.missions.map((m)=>{
                    const g = m.groups[0];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$ClickableCard$2f$ClickableCard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClickableCard"], {
                        className: "target-card",
                        label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].openTarget(m.name),
                        href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["watchHref"])(m.id),
                        padding: 0,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card-plate",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["missionUrl"])(m.id, `stacks/${g}_p0.png`),
                                        alt: "",
                                        width: 121,
                                        height: 121
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/TargetCards.tsx",
                                        lineNumber: 29,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        className: "blink",
                                        src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["missionUrl"])(m.id, `stacks/${g}_p${m.nPasses[g] - 1}.png`),
                                        alt: "",
                                        width: 121,
                                        height: 121,
                                        loading: "lazy"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/TargetCards.tsx",
                                        lineNumber: 30,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/TargetCards.tsx",
                                lineNumber: 28,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card-text",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: m.name
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/TargetCards.tsx",
                                        lineNumber: 33,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "card-meta",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Badge$2f$Badge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                label: m.kind === 'mover' ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].kindMover : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].kindVariable,
                                                variant: m.kind === 'mover' ? 'orange' : 'neutral'
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/TargetCards.tsx",
                                                lineNumber: 35,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "muted",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].passesCount(m.nPasses[g])
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/TargetCards.tsx",
                                                lineNumber: 36,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web/src/components/TargetCards.tsx",
                                        lineNumber: 34,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: m.summary
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/TargetCards.tsx",
                                        lineNumber: 38,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/TargetCards.tsx",
                                lineNumber: 32,
                                columnNumber: 15
                            }, this)
                        ]
                    }, m.id, true, {
                        fileName: "[project]/web/src/components/TargetCards.tsx",
                        lineNumber: 26,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/web/src/components/TargetCards.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/web/src/components/TargetCards.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(TargetCards, "hEdXZo5Fs6YVk0YkSBTxOeB4HmU=");
_c = TargetCards;
var _c;
__turbopack_context__.k.register(_c, "TargetCards");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/lib/data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Typed loader for the static mission assets (schema "mission-index/1" and "mission-manifest/1",
// see pipeline/README.md). Everything is served from public/data, copied by `npm run sync-assets`.
__turbopack_context__.s([
    "DATA_ROOT",
    ()=>DATA_ROOT,
    "FRAME_BYTES",
    ()=>FRAME_BYTES,
    "GRID_SIZE",
    ()=>GRID_SIZE,
    "dateToYear",
    ()=>dateToYear,
    "framesFor",
    ()=>framesFor,
    "loadFrame",
    ()=>loadFrame,
    "loadIndex",
    ()=>loadIndex,
    "loadManifest",
    ()=>loadManifest,
    "missionUrl",
    ()=>missionUrl,
    "mjdToDate",
    ()=>mjdToDate,
    "parseFrame",
    ()=>parseFrame,
    "referencedFrameFiles",
    ()=>referencedFrameFiles
]);
const DATA_ROOT = '/data';
const GRID_SIZE = 121;
const FRAME_BYTES = GRID_SIZE * GRID_SIZE * 4;
function missionUrl(missionId, relPath) {
    return `${DATA_ROOT}/missions/${missionId}/${relPath}`;
}
async function getJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
    return await res.json();
}
function loadIndex() {
    return getJson(`${DATA_ROOT}/missions/index.json`);
}
const manifestCache = new Map();
function loadManifest(missionId) {
    let p = manifestCache.get(missionId);
    if (!p) {
        p = getJson(`${DATA_ROOT}/missions/${missionId}/manifest.json`).then((m)=>{
            if (m.schema !== 'mission-manifest/1') throw new Error(`${missionId}: unexpected schema ${m.schema}`);
            for (const g of m.groups)g.exposures.sort((a, b)=>a.mjd - b.mjd);
            return m;
        });
        p.catch(()=>manifestCache.delete(missionId));
        manifestCache.set(missionId, p);
    }
    return p;
}
function parseFrame(buf, label = 'frame') {
    if (buf.byteLength !== FRAME_BYTES) throw new Error(`${label}: ${buf.byteLength} bytes, expected ${FRAME_BYTES}`);
    // ponytail: assumes a little-endian host (every browser platform in use); DataView if that ever changes.
    return new Float32Array(buf);
}
const frameCache = new Map();
function loadFrame(url) {
    let p = frameCache.get(url);
    if (!p) {
        p = fetch(url).then(async (res)=>{
            if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
            return parseFrame(await res.arrayBuffer(), url);
        });
        p.catch(()=>frameCache.delete(url));
        frameCache.set(url, p);
    }
    return p;
}
function framesFor(manifest, group, mode) {
    const passByIndex = new Map(group.passes.map((p)=>[
            p.index,
            p
        ]));
    if (mode === 'stack') {
        return group.passes.map((pass)=>({
                url: missionUrl(manifest.id, pass.stack),
                display: group.display,
                pass,
                exposures: group.exposures.filter((e)=>e.pass === pass.index),
                mjdStart: pass.mjdStart,
                mjdEnd: pass.mjdEnd,
                wavelengthUmMin: pass.wavelengthUmMin,
                wavelengthUmMax: pass.wavelengthUmMax
            }));
    }
    return group.exposures.filter((e)=>passByIndex.has(e.pass)).map((e)=>({
            url: missionUrl(manifest.id, e.frame),
            display: group.displayExposure,
            pass: passByIndex.get(e.pass),
            exposures: [
                e
            ],
            mjdStart: e.mjd,
            mjdEnd: e.mjd,
            wavelengthUmMin: e.wavelengthUm - e.bandwidthUm / 2,
            wavelengthUmMax: e.wavelengthUm + e.bandwidthUm / 2
        }));
}
function referencedFrameFiles(manifest) {
    return manifest.groups.flatMap((g)=>[
            ...g.passes.map((p)=>p.stack),
            ...g.exposures.map((e)=>e.frame)
        ]);
}
function mjdToDate(mjd) {
    return new Date((mjd - 40587) * 86400000);
}
function dateToYear(d) {
    const y = d.getUTCFullYear();
    const start = Date.UTC(y, 0, 1);
    return y + (d.getTime() - start) / (Date.UTC(y + 1, 0, 1) - start);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/lib/movers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SEARCH_RADIUS_ARCSEC",
    ()=>SEARCH_RADIUS_ARCSEC,
    "YEAR_MAX",
    ()=>YEAR_MAX,
    "YEAR_MIN",
    ()=>YEAR_MIN,
    "hasMoved",
    ()=>hasMoved,
    "loadMovers",
    ()=>loadMovers,
    "moversFromCatalogue",
    ()=>moversFromCatalogue,
    "positionAt",
    ()=>positionAt,
    "searchMovers",
    ()=>searchMovers
]);
// "It moved" check: which known high-proper-motion object had its track pass the typed position.
// Catalogue: movers-pm500.json (SIMBAD, epoch 2000.0). Propagation as in pipeline/movers/NOTES.md:
// dRA_deg = pmRaCosDec * dt / 3.6e6 / cos(dec); dDec_deg = pmDec * dt / 3.6e6; separation by haversine.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/sky.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/data.ts [app-client] (ecmascript)");
;
;
const SEARCH_RADIUS_ARCSEC = 15;
const YEAR_MIN = 1990;
const YEAR_MAX = 2027;
function moversFromCatalogue(cat) {
    const i = (c)=>cat.columns.indexOf(c);
    const [n, r, d, pr, pd] = [
        'name',
        'ra',
        'dec',
        'pmRaCosDec',
        'pmDec'
    ].map(i);
    return cat.rows.map((row)=>({
            name: row[n],
            ra: row[r],
            dec: row[d],
            pmRaCosDec: row[pr],
            pmDec: row[pd]
        }));
}
let cataloguePromise = null;
function loadMovers() {
    if (!cataloguePromise) {
        cataloguePromise = fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DATA_ROOT"]}/movers-pm500.json`).then((res)=>{
            if (!res.ok) throw new Error(`movers-pm500.json: HTTP ${res.status}`);
            return res.json();
        }).then(moversFromCatalogue);
        cataloguePromise.catch(()=>cataloguePromise = null);
    }
    return cataloguePromise;
}
function positionAt(m, year) {
    const dt = year - 2000;
    const dec = m.dec + m.pmDec * dt / 3.6e6;
    const ra = m.ra + m.pmRaCosDec * dt / 3.6e6 / Math.cos(m.dec * Math.PI / 180);
    return {
        ra: (ra % 360 + 360) % 360,
        dec
    };
}
function searchMovers(movers, ra, dec, now, radius = SEARCH_RADIUS_ARCSEC) {
    const cosDec = Math.cos(dec * Math.PI / 180);
    const hits = [];
    for (const m of movers){
        // Cheap reject: no object here moves more than ~11"/yr, so 37 yr of track stays within 0.15 deg.
        if (Math.abs(m.dec - dec) > 0.2) continue;
        const dRa = (m.ra - ra + 540) % 360 - 180;
        if (Math.abs(dRa * cosDec) > 0.2) continue;
        // Closest approach of a straight track on the tangent plane, clamped to the window.
        const e0 = -dRa * cosDec * 3600; // typed position minus object at 2000, arcsec east
        const n0 = (dec - m.dec) * 3600;
        const ve = m.pmRaCosDec / 1000;
        const vn = m.pmDec / 1000;
        const v2 = ve * ve + vn * vn;
        const tBest = v2 > 0 ? 2000 + (e0 * ve + n0 * vn) / v2 : 2000;
        const year = Math.min(YEAR_MAX, Math.max(YEAR_MIN, tBest));
        const at = positionAt(m, year);
        const minSep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["separationArcsec"])(ra, dec, at.ra, at.dec);
        if (minSep > radius) continue;
        const nowPos = positionAt(m, now);
        const east = ((nowPos.ra - ra + 540) % 360 - 180) * cosDec * 3600;
        const north = (nowPos.dec - dec) * 3600;
        hits.push({
            mover: m,
            year,
            minSepArcsec: minSep,
            nowRa: nowPos.ra,
            nowDec: nowPos.dec,
            nowSepArcsec: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["separationArcsec"])(ra, dec, nowPos.ra, nowPos.dec),
            nowDirection: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compass"])(east, north)
        });
    }
    return hits.sort((a, b)=>a.minSepArcsec - b.minSepArcsec);
}
function hasMoved(hit) {
    return hit.nowSepArcsec > SEARCH_RADIUS_ARCSEC;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/lib/resolve.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadAllManifests",
    ()=>loadAllManifests,
    "missionContaining",
    ()=>missionContaining,
    "resolvePosition",
    ()=>resolvePosition,
    "watchHref",
    ()=>watchHref
]);
// Turns a typed sky position into what the app should show: known movers that crossed it, and which
// static mission (if any) covers the position or the mover's position today.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$movers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/movers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/sky.ts [app-client] (ecmascript)");
;
;
;
function missionContaining(manifests, ra, dec) {
    return manifests.find((m)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["insideGrid"])(m.grid, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["skyToPixel"])(m.grid, ra, dec))) ?? null;
}
let allManifests = null;
function loadAllManifests() {
    if (!allManifests) {
        allManifests = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadIndex"])().then((ix)=>Promise.all(ix.missions.map((m)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadManifest"])(m.id))));
        allManifests.catch(()=>allManifests = null);
    }
    return allManifests;
}
async function resolvePosition(ra, dec, now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dateToYear"])(new Date())) {
    const [movers, manifests] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$movers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadMovers"])(),
        loadAllManifests()
    ]);
    const hits = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$movers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchMovers"])(movers, ra, dec, now);
    const best = hits[0] ?? null;
    const showsBest = best ? missionContaining(manifests, best.nowRa, best.nowDec) : null;
    const mission = showsBest ?? missionContaining(manifests, ra, dec);
    const name = best ? showsBest ? `${showsBest.name} (${best.mover.name})` : best.mover.name : null;
    return {
        ra,
        dec,
        hits,
        moved: best && (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$movers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasMoved"])(best) ? best : null,
        mission,
        name
    };
}
function watchHref(missionId, ra, dec) {
    const p = new URLSearchParams();
    if (missionId) p.set('m', missionId);
    if (ra !== undefined && dec !== undefined) {
        p.set('ra', String(Number(ra.toFixed(6))));
        p.set('dec', String(Number(dec.toFixed(6))));
    }
    return `/watch?${p}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/lib/sky.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Sky maths: display stretch, coordinate parsing and formatting, the mission grid projection,
// angular separation. Pure functions, unit tested in sky.test.ts.
__turbopack_context__.s([
    "compass",
    ()=>compass,
    "formatDec",
    ()=>formatDec,
    "formatRa",
    ()=>formatRa,
    "insideGrid",
    ()=>insideGrid,
    "parseCoords",
    ()=>parseCoords,
    "separationArcsec",
    ()=>separationArcsec,
    "skyToPixel",
    ()=>skyToPixel,
    "stretch",
    ()=>stretch,
    "tangentOffsetArcsec",
    ()=>tangentOffsetArcsec
]);
const D2R = Math.PI / 180;
function stretch(v, d) {
    if (Number.isNaN(v)) return NaN;
    const t = Math.min(1, Math.max(0, (v - d.vmin) / (d.vmax - d.vmin)));
    return Math.asinh(t / d.soft) / Math.asinh(1 / d.soft);
}
const NUM = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;
function parseCoords(input) {
    const cleaned = input.trim().replace(/[−–]/g, '-') // typographic minus signs pasted from papers
    .replace(/[hdms°'"′″:,]/gi, ' ').trim();
    if (!cleaned) return {
        ok: false,
        error: 'coordEmpty'
    };
    const tokens = cleaned.split(/\s+/);
    if (!tokens.every((t)=>NUM.test(t))) return {
        ok: false,
        error: 'coordUnreadable'
    };
    const n = tokens.map(Number);
    if (tokens.length === 2) {
        const [ra, dec] = n;
        if (ra < 0 || ra >= 360) return {
            ok: false,
            error: 'coordRaRange'
        };
        if (dec < -90 || dec > 90) return {
            ok: false,
            error: 'coordDecRange'
        };
        return {
            ok: true,
            ra,
            dec
        };
    }
    if (tokens.length === 6) {
        const [h, rm, rs, , dm, ds] = n;
        const signed = [
            0,
            1,
            2,
            4,
            5
        ].some((i)=>/^[+-]/.test(tokens[i]));
        if (signed) return {
            ok: false,
            error: 'coordUnreadable'
        };
        if (h >= 24 || rm >= 60 || rs >= 60) return {
            ok: false,
            error: 'coordRaRange'
        };
        const sign = tokens[3].startsWith('-') ? -1 : 1;
        const dabs = Math.abs(n[3]) + dm / 60 + ds / 3600;
        if (dm >= 60 || ds >= 60 || dabs > 90) return {
            ok: false,
            error: 'coordDecRange'
        };
        return {
            ok: true,
            ra: (h + rm / 60 + rs / 3600) * 15,
            dec: sign * dabs
        };
    }
    return {
        ok: false,
        error: 'coordUnreadable'
    };
}
function sexa(value, decimals) {
    const totalSec = Math.abs(value) * 3600;
    const round = 10 ** decimals;
    let s = Math.round(totalSec % 60 * round) / round;
    let m = Math.floor(totalSec / 60) % 60;
    let d = Math.floor(totalSec / 3600);
    if (s >= 60) {
        s -= 60;
        m += 1;
    }
    if (m >= 60) {
        m -= 60;
        d += 1;
    }
    return [
        d,
        m,
        s.toFixed(decimals).padStart(decimals + 3, '0')
    ];
}
function formatRa(raDeg) {
    const [h, m, s] = sexa(raDeg / 15, 2);
    return `${String(h % 24).padStart(2, '0')}h${String(m).padStart(2, '0')}m${s}s`;
}
function formatDec(decDeg) {
    const [d, m, s] = sexa(decDeg, 1);
    return `${decDeg < 0 ? '-' : '+'}${String(d).padStart(2, '0')}d${String(m).padStart(2, '0')}m${s}s`;
}
function separationArcsec(ra1, dec1, ra2, dec2) {
    const s = Math.sin((dec2 - dec1) * D2R / 2) ** 2 + Math.cos(dec1 * D2R) * Math.cos(dec2 * D2R) * Math.sin((ra2 - ra1) * D2R / 2) ** 2;
    return 2 * Math.asin(Math.min(1, Math.sqrt(s))) / D2R * 3600;
}
function tangentOffsetArcsec(ra0, dec0, ra, dec) {
    const da = (ra - ra0) * D2R;
    const d0 = dec0 * D2R;
    const d = dec * D2R;
    const cosc = Math.sin(d0) * Math.sin(d) + Math.cos(d0) * Math.cos(d) * Math.cos(da);
    const xi = Math.cos(d) * Math.sin(da) / cosc;
    const eta = (Math.cos(d0) * Math.sin(d) - Math.sin(d0) * Math.cos(d) * Math.cos(da)) / cosc;
    return {
        east: xi / D2R * 3600,
        north: eta / D2R * 3600
    };
}
function skyToPixel(grid, ra, dec) {
    const { east, north } = tangentOffsetArcsec(grid.ra0, grid.dec0, ra, dec);
    const c = (grid.width - 1) / 2;
    return {
        x: c - east / grid.scaleArcsec,
        y: c - north / grid.scaleArcsec
    };
}
function insideGrid(grid, p, marginPx = 0) {
    return p.x >= -0.5 + marginPx && p.y >= -0.5 + marginPx && p.x <= grid.width - 0.5 - marginPx && p.y <= grid.height - 0.5 - marginPx;
}
function compass(east, north) {
    const pa = (Math.atan2(east, north) / D2R + 360) % 360;
    return [
        'N',
        'NE',
        'E',
        'SE',
        'S',
        'SW',
        'W',
        'NW'
    ][Math.round(pa / 45) % 8];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/lib/strings.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Every user-facing string lives here so a translation can be dropped in later.
// No em dashes (house rule): commas, colons or parentheses instead.
// Voice: a curious 14 to 20 year old. Plain words first, the technical term second, in brackets.
__turbopack_context__.s([
    "COMPASS_WORDS",
    ()=>COMPASS_WORDS,
    "S",
    ()=>S,
    "plainNote",
    ()=>plainNote
]);
/** The product name: the team has not chosen one yet, so it lives in this one constant. */ const APP_NAME = 'SPHEREx Time Viewer';
const PITCH = 'Find the next Tombaugh.';
const S = {
    appName: APP_NAME,
    pageTitle: `${APP_NAME}: ${PITCH.slice(0, 1).toLowerCase()}${PITCH.slice(1, -1)}`,
    pageDescription: 'Watch real NASA infrared images of one patch of sky change over time, then spot what moved.',
    pitch: PITCH,
    pitchBody: 'Clyde Tombaugh was 24 when he found Pluto in 1930 by flicking between two photos of the sky, and you can do the same with real infrared images from NASA’s SPHEREx telescope.',
    home: 'Home',
    coordLabel: 'Where to look: sky coordinates (RA and Dec)',
    coordPlaceholder: '08h55m10.831s -07d14m42.53s',
    coordHelp: 'Degrees, like 133.795129 -7.245147, or hours, minutes and seconds, like 08 55 10.831 -07 14 42.53.',
    coordSubmit: 'Look here',
    tryChallenge: (c)=>`Try the challenge position (${c})`,
    tryChallengeShort: 'Try the challenge position',
    coordEmpty: 'Type a position first.',
    coordUnreadable: 'That does not look like coordinates. Try 133.795129 -7.245147 or 08h55m10.831s -07d14m42.53s.',
    coordRaRange: 'Right ascension must be 0 to 360 degrees (or 0 to 24 hours, minutes and seconds under 60).',
    coordDecRange: 'Declination must be between -90 and +90 degrees (minutes and seconds under 60).',
    searching: 'Checking the catalogue of fast-moving stars...',
    loadFailed: 'Could not load the data:',
    targetsHeading: 'Or start with a real target',
    targetsIntro: 'Five patches of sky that SPHEREx photographed again and again. Hover or focus a card to blink its first and last visit.',
    kindMover: 'Moves',
    kindVariable: 'Changes brightness',
    passesCount: (n)=>`${n} visits`,
    openTarget: (name)=>`Watch ${name}`,
    movedTitle: (name)=>`It moved: ${name} was here, but not any more`,
    movedBody: (year, sepArcsec, dir)=>`It passed this position around ${year}. Today it is ${sepArcsec.toFixed(0)} arcseconds${sepArcsec >= 60 ? ` (${(sepArcsec / 60).toFixed(1)} arcminutes)` : ''} to the ${dir}.`,
    hereTitle: (name)=>`Known object here: ${name}`,
    hereBody: (name, sep)=>`${name} is ${sep} arcseconds from the position you typed.`,
    jumpToIt: 'Jump to it',
    openMission: 'Open its SPHEREx images',
    otherMovers: (n)=>`${n} more known object${n === 1 ? '' : 's'} crossed this spot.`,
    placeholderTitle: 'No ready-made images for this spot yet',
    placeholderBody: 'Loading SPHEREx images for any coordinate, live from the NASA archive, is the next step of this project. For now the viewer has real images for the five targets below.',
    placeholderPosition: 'You asked for',
    backHome: 'All targets',
    modeLabel: 'Show',
    modeStack: 'One per visit',
    modeExp: 'Every photo',
    modeStackHint: 'Each visit stacks all its photos (exposures) into one cleaner image.',
    modeExpHint: 'Each photo (exposure) sees a slightly different infrared colour, so brightness flickers from frame to frame.',
    groupLabel: 'Camera (detector)',
    play: 'Play',
    pause: 'Pause',
    stepBack: 'Previous frame',
    stepForward: 'Next frame',
    loop: 'Loop',
    speed: 'Speed (frames per second)',
    speedValue: (fps)=>`${fps}`,
    playbackLabel: 'Playback',
    timeAxis: 'Time',
    timeAxisValue: (date, i, n)=>`${date}, frame ${i} of ${n}`,
    frameOf: (i, n)=>`Frame ${i} of ${n}`,
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    zoomReset: 'Fit',
    zoomValue: (z)=>`${z.toFixed(1)}x`,
    loadingFrames: (done, total)=>`Loading frames ${done} of ${total}`,
    keyboardHint: 'Space plays or pauses, arrow keys step, drag to pan, scroll to zoom.',
    overlaysLabel: 'On the image',
    overlayPredicted: 'Where it should be (predicted)',
    overlayMeasured: 'Where we found it (measured)',
    overlayNeighbour: 'A nearby ordinary star: the blob there is that star, not the target',
    overlayInput: 'Your position (typed)',
    overlayInputChallenge: 'The challenge position',
    noData: 'Dark red pixels: no data, or too bright to record',
    readoutDate: 'When',
    readoutWavelength: 'Infrared colour (wavelength)',
    readoutExposures: 'Photos (exposures)',
    readoutGroup: 'Camera (detector)',
    readoutDetection: 'Target',
    detected: (snr)=>`Seen: its signal is ${snr} times the noise (S/N).`,
    notDetected: 'Not seen in this frame.',
    fromPassStack: (label)=>`Position and markers come from the ${label} stack.`,
    blended: (name)=>`It overlaps a nearby ordinary star (${name}).`,
    saturated: 'Too bright to measure its brightness: the centre is blank, so the position comes from the glow around it.',
    wavelengthRange: (a, b)=>`${a.toFixed(3)} to ${b.toFixed(3)} micron`,
    dateRange: (a, b)=>a === b ? a : `${a} to ${b}`,
    notesHeading: 'Technical notes',
    provenanceHeading: 'Source files for this frame',
    releasesHeading: 'Data releases',
    provenanceRelease: (rel, doi)=>`${rel}, DOI ${doi}`,
    caveatsHeading: 'Notes from the data pipeline',
    compassNorth: 'N',
    compassEast: 'E',
    scaleBar: (arcsec)=>`${arcsec}"`,
    footerNoEndorse: 'NASA does not endorse this project.',
    footerData: 'Images: SPHEREx Level 2 spectral images (NASA/JPL-Caltech), from the NASA/IPAC Infrared Science Archive (IRSA).',
    footerMovers: 'Fast-moving star catalogue: SIMBAD, CDS, Strasbourg.',
    footerChallenge: 'Built for the 2026 NASA Space Apps Challenge, "Planet X and SPHEREx".'
};
function plainNote(text) {
    return text.replace(/\s*\((?:pass field \w+|notes? \d+(?: and \d+)?)\)/g, '').replace(/,\s*notes? \d+(?: and \d+)?(?=\))/g, '').replace(/,?\s*as in notes? \d+(?: and \d+)?/g, '');
}
const COMPASS_WORDS = {
    N: 'north',
    NE: 'north-east',
    E: 'east',
    SE: 'south-east',
    S: 'south',
    SW: 'south-west',
    W: 'west',
    NW: 'north-west'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=web_src_056v4nq3742rl._.js.map