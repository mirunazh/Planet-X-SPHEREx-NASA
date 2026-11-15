(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/src/components/MissionView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MissionView",
    ()=>MissionView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Badge$2f$Badge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Badge/Badge.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Banner$2f$Banner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Banner/Banner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Button/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$SegmentedControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/SegmentedControl/SegmentedControl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$SegmentedControlItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/SegmentedControl/SegmentedControlItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$Switch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Switch/Switch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/sky.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/strings.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/viewState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$SkyCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/SkyCanvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$MoverBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/MoverBanner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$TimeAxis$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/TimeAxis.tsx [app-client] (ecmascript)");
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
;
;
;
;
const day = (mjd)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mjdToDate"])(mjd).toISOString().slice(0, 10);
const dateTime = (mjd)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mjdToDate"])(mjd).toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
const reducedMotion = ()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function MissionView({ autoplay, resolution }) {
    _s();
    const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useView"])();
    const set = v.set;
    const [manifest, setManifest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MissionView.useEffect": ()=>{
            if (!v.mission) return;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadManifest"])(v.mission).then(setManifest, {
                "MissionView.useEffect": (e)=>setError(String(e))
            }["MissionView.useEffect"]);
        }
    }["MissionView.useEffect"], [
        v.mission
    ]);
    const group = manifest ? manifest.groups.find((g)=>g.id === v.group) ?? manifest.groups.find((g)=>g.id === manifest.truth.group) ?? manifest.groups[0] : null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MissionView.useEffect": ()=>{
            if (group && group.id !== v.group) set({
                group: group.id
            });
        }
    }["MissionView.useEffect"], [
        group,
        v.group,
        set
    ]);
    const frames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MissionView.useMemo[frames]": ()=>manifest && group ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["framesFor"])(manifest, group, v.mode) : []
    }["MissionView.useMemo[frames]"], [
        manifest,
        group,
        v.mode
    ]);
    const n = frames.length;
    const idx = Math.min(v.frame, Math.max(0, n - 1));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MissionView.useEffect": ()=>{
            if (n && v.frame > n - 1) set({
                frame: n - 1
            });
        }
    }["MissionView.useEffect"], [
        n,
        v.frame,
        set
    ]);
    // Prefetch the whole sequence so playback is smooth.
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MissionView.useEffect": ()=>{
            let alive = true;
            let count = 0;
            setLoaded(0);
            for (const f of frames)(0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadFrame"])(f.url).then({
                "MissionView.useEffect": ()=>alive && setLoaded(++count)
            }["MissionView.useEffect"], {
                "MissionView.useEffect": (e)=>alive && setError(String(e))
            }["MissionView.useEffect"]);
            return ({
                "MissionView.useEffect": ()=>{
                    alive = false;
                }
            })["MissionView.useEffect"];
        }
    }["MissionView.useEffect"], [
        frames
    ]);
    // The image and its readout always describe the same frame.
    const [shown, setShown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MissionView.useEffect": ()=>{
            const f = frames[idx];
            if (!f) return;
            let alive = true;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadFrame"])(f.url).then({
                "MissionView.useEffect": (data)=>alive && setShown({
                        frame: f,
                        data,
                        index: idx
                    })
            }["MissionView.useEffect"], {
                "MissionView.useEffect": (e)=>alive && setError(String(e))
            }["MissionView.useEffect"]);
            return ({
                "MissionView.useEffect": ()=>{
                    alive = false;
                }
            })["MissionView.useEffect"];
        }
    }["MissionView.useEffect"], [
        frames,
        idx
    ]);
    const autoplayed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MissionView.useEffect": ()=>{
            if (autoplay && !autoplayed.current && n > 1 && loaded === n && !reducedMotion()) {
                autoplayed.current = true;
                set({
                    playing: true
                });
            }
        }
    }["MissionView.useEffect"], [
        autoplay,
        loaded,
        n,
        set
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MissionView.useEffect": ()=>{
            if (!v.playing || n < 2) return;
            const id = setInterval({
                "MissionView.useEffect.id": ()=>{
                    const s = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useView"].getState();
                    let next = s.frame + 1;
                    if (next >= n) {
                        if (!s.loop) return s.set({
                            playing: false
                        });
                        next = 0;
                    }
                    s.set({
                        frame: next
                    });
                }
            }["MissionView.useEffect.id"], 1000 / v.fps);
            return ({
                "MissionView.useEffect": ()=>clearInterval(id)
            })["MissionView.useEffect"];
        }
    }["MissionView.useEffect"], [
        v.playing,
        v.fps,
        n
    ]);
    const togglePlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MissionView.useCallback[togglePlay]": ()=>{
            const s = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useView"].getState();
            if (!s.playing && !s.loop && s.frame >= n - 1) s.set({
                frame: 0
            });
            s.set({
                playing: !s.playing
            });
        }
    }["MissionView.useCallback[togglePlay]"], [
        n
    ]);
    const step = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MissionView.useCallback[step]": (d)=>{
            const s = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useView"].getState();
            if (n) s.set({
                playing: false,
                frame: (Math.min(s.frame, n - 1) + d + n) % n
            });
        }
    }["MissionView.useCallback[step]"], [
        n
    ]);
    const zoomBy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MissionView.useCallback[zoomBy]": (f)=>{
            const s = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useView"].getState();
            s.set({
                zoom: Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZOOM_MAX"], Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZOOM_MIN"], s.zoom * f))
            });
        }
    }["MissionView.useCallback[zoomBy]"], []);
    const fit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MissionView.useCallback[fit]": ()=>set({
                zoom: 1,
                cx: 60,
                cy: 60
            })
    }["MissionView.useCallback[fit]"], [
        set
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MissionView.useEffect": ()=>{
            const onKey = {
                "MissionView.useEffect.onKey": (e)=>{
                    if (e.metaKey || e.ctrlKey || e.altKey) return;
                    const t = e.target instanceof Element ? e.target : document.body;
                    if (t.closest('input, textarea, select, [contenteditable="true"]')) return;
                    if (e.key === ' ') {
                        if (t.closest('button, a, [role="button"], [role="radio"], [role="switch"], [role="slider"]')) return;
                        e.preventDefault();
                        togglePlay();
                    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                        if (t.closest('[role="slider"], [role="radio"], [role="radiogroup"]')) return;
                        e.preventDefault();
                        step(e.key === 'ArrowRight' ? 1 : -1);
                    } else if (e.key === '+' || e.key === '=') zoomBy(1.5);
                    else if (e.key === '-') zoomBy(1 / 1.5);
                    else if (e.key === '0') fit();
                }
            }["MissionView.useEffect.onKey"];
            window.addEventListener('keydown', onKey);
            return ({
                "MissionView.useEffect": ()=>window.removeEventListener('keydown', onKey)
            })["MissionView.useEffect"];
        }
    }["MissionView.useEffect"], [
        togglePlay,
        step,
        zoomBy,
        fit
    ]);
    const setMode = (mode)=>{
        if (!manifest || !group || mode === v.mode) return;
        const pass = frames[idx]?.pass.index ?? 0;
        const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["framesFor"])(manifest, group, mode);
        set({
            mode,
            frame: Math.max(0, target.findIndex((f)=>f.pass.index === pass))
        });
    };
    const setGroup = (id)=>{
        if (!manifest) return;
        const g = manifest.groups.find((x)=>x.id === id);
        const pass = frames[idx]?.pass.index ?? 0;
        set({
            group: id,
            frame: Math.max(0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["framesFor"])(manifest, g, v.mode).findIndex((f)=>f.pass.index === pass))
        });
    };
    const toggleOverlay = (k, on)=>set({
            overlays: {
                ...v.overlays,
                [k]: on
            }
        });
    if (error) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Banner$2f$Banner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Banner"], {
        status: "error",
        title: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].loadFailed,
        description: error
    }, void 0, false, {
        fileName: "[project]/web/src/components/MissionView.tsx",
        lineNumber: 153,
        columnNumber: 21
    }, this);
    if (!manifest || !group) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "muted",
        children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].loadingFrames(0, 1)
    }, void 0, false, {
        fileName: "[project]/web/src/components/MissionView.tsx",
        lineNumber: 154,
        columnNumber: 35
    }, this);
    const f = shown?.frame ?? null;
    const pass = f?.pass ?? null;
    const typed = v.ra !== null && v.dec !== null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["skyToPixel"])(manifest.grid, v.ra, v.dec) : null;
    const inputMarker = typed ?? (manifest.challengeInput ? {
        x: manifest.challengeInput.x,
        y: manifest.challengeInput.y
    } : null);
    const releases = manifest.provenance.releases;
    const neighbour = pass?.blendedWith ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["skyToPixel"])(manifest.grid, pass.blendedWith.ra, pass.blendedWith.dec) : null;
    const when = (fr)=>v.mode === 'stack' ? fr.pass.label : day(fr.mjdStart);
    const detail = pass && [
        pass.detected && pass.saturationRadiusPx ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].saturated : pass.detected && pass.snr !== null ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].detected(pass.snr.toFixed(pass.snr < 100 ? 1 : 0)) : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].notDetected,
        pass.blendedWith ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].blended(pass.blendedWith.name) : null,
        v.mode === 'exp' ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].fromPassStack(pass.label) : null
    ].filter(Boolean).join(' ');
    const kindBadge = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Badge$2f$Badge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        label: manifest.kind === 'mover' ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].kindMover : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].kindVariable,
        variant: manifest.kind === 'mover' ? 'orange' : 'neutral'
    }, void 0, false, {
        fileName: "[project]/web/src/components/MissionView.tsx",
        lineNumber: 176,
        columnNumber: 21
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "watch",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "viewer",
                "aria-label": manifest.name,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "plate",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$SkyCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkyCanvas"], {
                                data: shown?.data ?? null,
                                display: f?.display ?? group.display,
                                size: manifest.grid.width,
                                scaleArcsec: manifest.grid.scaleArcsec,
                                zoom: v.zoom,
                                cx: v.cx,
                                cy: v.cy,
                                predicted: v.overlays.pred && pass ? pass.predicted : null,
                                measured: v.overlays.meas && pass?.measured ? pass.measured : null,
                                input: v.overlays.input ? inputMarker : null,
                                neighbour: v.overlays.meas && neighbour ? neighbour : null,
                                label: `${manifest.name}, ${pass?.label ?? ''}, ${f ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].wavelengthRange(f.wavelengthUmMin, f.wavelengthUmMax) : ''}`,
                                onView: set
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "plate-stamp data",
                                "aria-hidden": "true",
                                children: loaded < n ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].loadingFrames(loaded, n) : f ? v.mode === 'stack' ? pass?.label : dateTime(f.mjdStart) : ''
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/MissionView.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$TimeAxis$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimeAxis"], {
                        frames: frames,
                        index: idx,
                        headLabel: frames[idx] ? when(frames[idx]) : '',
                        isDisabled: n < 2,
                        onSeek: (x)=>set({
                                playing: false,
                                frame: x
                            })
                    }, void 0, false, {
                        fileName: "[project]/web/src/components/MissionView.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "transport",
                        role: "group",
                        "aria-label": __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].playbackLabel,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].stepBack,
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glyph, {
                                    d: "M7 3v10M14 3 8 8l6 5Z"
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/MissionView.tsx",
                                    lineNumber: 205,
                                    columnNumber: 44
                                }, this),
                                isIconOnly: true,
                                onClick: ()=>step(-1),
                                isDisabled: n < 2
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                label: v.playing ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].pause : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].play,
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glyph, {
                                    d: v.playing ? 'M4.5 3h2.5v10H4.5zM9.5 3H12v10H9.5z' : 'M4.5 2.5v11l9-5.5Z'
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/MissionView.tsx",
                                    lineNumber: 208,
                                    columnNumber: 19
                                }, this),
                                variant: "primary",
                                onClick: togglePlay,
                                isDisabled: n < 2
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].stepForward,
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glyph, {
                                    d: "M9 3v10M2 3l6 5-6 5Z"
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/MissionView.tsx",
                                    lineNumber: 213,
                                    columnNumber: 47
                                }, this),
                                isIconOnly: true,
                                onClick: ()=>step(1),
                                isDisabled: n < 2
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "counter data",
                                "aria-live": "off",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].frameOf(idx + 1, n)
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "zoom",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].zoomOut,
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glyph, {
                                            d: "M3 8h10"
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/components/MissionView.tsx",
                                            lineNumber: 218,
                                            columnNumber: 45
                                        }, this),
                                        isIconOnly: true,
                                        onClick: ()=>zoomBy(1 / 1.5),
                                        isDisabled: v.zoom <= __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZOOM_MIN"]
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 218,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].zoomIn,
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Glyph, {
                                            d: "M3 8h10M8 3v10"
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/components/MissionView.tsx",
                                            lineNumber: 219,
                                            columnNumber: 44
                                        }, this),
                                        isIconOnly: true,
                                        onClick: ()=>zoomBy(1.5),
                                        isDisabled: v.zoom >= __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZOOM_MAX"]
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 219,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].zoomReset,
                                        onClick: fit
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 220,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "data muted",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].zoomValue(v.zoom)
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/MissionView.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/components/MissionView.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "rail",
                children: [
                    resolution && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$MoverBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MoverBanner"], {
                        res: resolution,
                        here: true
                    }, void 0, false, {
                        fileName: "[project]/web/src/components/MissionView.tsx",
                        lineNumber: 227,
                        columnNumber: 24
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "target-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                children: manifest.name
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, this),
                            kindBadge,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: manifest.summary
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/MissionView.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    f && pass && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                        className: "readout",
                        "aria-live": "polite",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].readoutDate
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 237,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                children: v.mode === 'stack' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        pass.label,
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "data muted",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].dateRange(day(f.mjdStart), day(f.mjdEnd))
                                        }, void 0, false, {
                                            fileName: "[project]/web/src/components/MissionView.tsx",
                                            lineNumber: 241,
                                            columnNumber: 32
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/web/src/components/MissionView.tsx",
                                    lineNumber: 240,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "data",
                                    children: dateTime(f.mjdStart)
                                }, void 0, false, {
                                    fileName: "[project]/web/src/components/MissionView.tsx",
                                    lineNumber: 244,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 238,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].readoutWavelength
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 247,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                className: "data",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].wavelengthRange(f.wavelengthUmMin, f.wavelengthUmMax)
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 248,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].readoutExposures
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 249,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                className: "data",
                                children: f.exposures.length
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].readoutGroup
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 251,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                className: "data",
                                children: (v.mode === 'exp' ? [
                                    f.exposures[0].detector
                                ] : pass.detectors).join(' + ')
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 252,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].readoutDetection
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 253,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                children: detail
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 254,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/MissionView.tsx",
                        lineNumber: 236,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "control",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "control-label",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].overlaysLabel
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "legend-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$SkyCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkerSwatch"], {
                                        kind: "predicted"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$Switch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].overlayPredicted,
                                        value: v.overlays.pred,
                                        onChange: (on)=>toggleOverlay('pred', on)
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 262,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "legend-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$SkyCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkerSwatch"], {
                                        kind: "measured"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 265,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$Switch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].overlayMeasured,
                                        value: v.overlays.meas,
                                        onChange: (on)=>toggleOverlay('meas', on)
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 266,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 264,
                                columnNumber: 11
                            }, this),
                            inputMarker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "legend-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$SkyCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkerSwatch"], {
                                        kind: "input"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 270,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$Switch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                        label: typed ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].overlayInput : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].overlayInputChallenge,
                                        value: v.overlays.input,
                                        onChange: (on)=>toggleOverlay('input', on)
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 271,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 269,
                                columnNumber: 13
                            }, this),
                            neighbour && v.overlays.meas && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "legend-row legend-note",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$SkyCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkerSwatch"], {
                                        kind: "neighbour"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 276,
                                        columnNumber: 15
                                    }, this),
                                    __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].overlayNeighbour
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 275,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "legend-row legend-note",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$SkyCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkerSwatch"], {
                                        kind: "noData"
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 281,
                                        columnNumber: 13
                                    }, this),
                                    __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].noData
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 280,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/MissionView.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "control",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "control-label",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].modeLabel
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 287,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$SegmentedControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SegmentedControl"], {
                                label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].modeLabel,
                                value: v.mode,
                                onChange: (x)=>setMode(x),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$SegmentedControlItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SegmentedControlItem"], {
                                        value: "stack",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].modeStack
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 291,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$SegmentedControlItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SegmentedControlItem"], {
                                        value: "exp",
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].modeExp
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 292,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 290,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hint",
                                children: v.mode === 'exp' ? __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].modeExpHint : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].modeStackHint
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 294,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/MissionView.tsx",
                        lineNumber: 286,
                        columnNumber: 9
                    }, this),
                    manifest.groups.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "control",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "control-label",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].groupLabel
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 299,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$SegmentedControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SegmentedControl"], {
                                label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].groupLabel,
                                value: group.id,
                                onChange: setGroup,
                                children: manifest.groups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$SegmentedControlItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SegmentedControlItem"], {
                                        value: g.id,
                                        label: g.detectors.join(' + ')
                                    }, g.id, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 302,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hint",
                                children: group.label
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 305,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/MissionView.tsx",
                        lineNumber: 298,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "control",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "control-label",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].speed
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "control-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$SegmentedControl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SegmentedControl"], {
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].speed,
                                        size: "sm",
                                        value: String(v.fps),
                                        onChange: (x)=>set({
                                                fps: Number(x)
                                            }),
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FPS_STEPS"].map((fps)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$SegmentedControl$2f$SegmentedControlItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SegmentedControlItem"], {
                                                value: String(fps),
                                                label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].speedValue(fps)
                                            }, fps, false, {
                                                fileName: "[project]/web/src/components/MissionView.tsx",
                                                lineNumber: 314,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 312,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Switch$2f$Switch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                        label: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].loop,
                                        value: v.loop,
                                        onChange: (on)=>set({
                                                loop: on
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 317,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 311,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/MissionView.tsx",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "hint keys",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                children: "Space"
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 322,
                                columnNumber: 11
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                children: '←'
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 322,
                                columnNumber: 28
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                children: '→'
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 322,
                                columnNumber: 45
                            }, this),
                            " ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].keyboardHint
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/MissionView.tsx",
                        lineNumber: 321,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                        className: "notes",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].notesHeading
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 326,
                                columnNumber: 11
                            }, this),
                            f && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: [
                                            __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].provenanceHeading,
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "data muted",
                                                children: [
                                                    "(",
                                                    f.exposures.length,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web/src/components/MissionView.tsx",
                                                lineNumber: 330,
                                                columnNumber: 39
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 329,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "files",
                                        children: f.exposures.map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        className: "data",
                                                        href: e.uri,
                                                        rel: "noreferrer",
                                                        children: e.id
                                                    }, void 0, false, {
                                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 21
                                                    }, this),
                                                    ' ',
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "muted",
                                                        children: [
                                                            e.detector,
                                                            ", ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "data",
                                                                children: e.wavelengthUm.toFixed(3)
                                                            }, void 0, false, {
                                                                fileName: "[project]/web/src/components/MissionView.tsx",
                                                                lineNumber: 339,
                                                                columnNumber: 37
                                                            }, this),
                                                            " micron, ",
                                                            e.release
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                                        lineNumber: 338,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, e.id, true, {
                                                fileName: "[project]/web/src/components/MissionView.tsx",
                                                lineNumber: 334,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 332,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 328,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].releasesHeading
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 347,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        children: releases.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: [
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].provenanceRelease(r.release, ''),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        className: "data",
                                                        href: `https://doi.org/${r.doi}`,
                                                        rel: "noreferrer",
                                                        children: r.doi
                                                    }, void 0, false, {
                                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                                        lineNumber: 352,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, r.release, true, {
                                                fileName: "[project]/web/src/components/MissionView.tsx",
                                                lineNumber: 350,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 348,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 346,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].caveatsHeading
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 360,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        children: [
                                            manifest.caveats.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["plainNote"])(c)
                                                }, c, false, {
                                                    fileName: "[project]/web/src/components/MissionView.tsx",
                                                    lineNumber: 363,
                                                    columnNumber: 17
                                                }, this)),
                                            manifest.challengeInput && !typed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["plainNote"])(manifest.challengeInput.note)
                                            }, void 0, false, {
                                                fileName: "[project]/web/src/components/MissionView.tsx",
                                                lineNumber: 365,
                                                columnNumber: 53
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web/src/components/MissionView.tsx",
                                        lineNumber: 361,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/MissionView.tsx",
                                lineNumber: 359,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/MissionView.tsx",
                        lineNumber: 325,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/components/MissionView.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/web/src/components/MissionView.tsx",
        lineNumber: 179,
        columnNumber: 5
    }, this);
}
_s(MissionView, "+fccu4FiYOzOzXX7lmfQ85hOVBc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useView"]
    ];
});
_c = MissionView;
/** 16 px transport glyph; the button's label stays the accessible name. */ function Glyph({ d }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 16 16",
        "aria-hidden": "true",
        fill: "currentColor",
        stroke: "currentColor",
        strokeWidth: "1.6",
        strokeLinejoin: "round",
        strokeLinecap: "round",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: d
        }, void 0, false, {
            fileName: "[project]/web/src/components/MissionView.tsx",
            lineNumber: 378,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/web/src/components/MissionView.tsx",
        lineNumber: 377,
        columnNumber: 5
    }, this);
}
_c1 = Glyph;
var _c, _c1;
__turbopack_context__.k.register(_c, "MissionView");
__turbopack_context__.k.register(_c1, "Glyph");
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
"[project]/web/src/components/SkyCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MarkerSwatch",
    ()=>MarkerSwatch,
    "SkyCanvas",
    ()=>SkyCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Draws one 121 x 121 float32 frame with the manifest stretch, crisp pixels, zoom and pan, and the
// position markers. Pixel (x, y) is a 0-based pixel centre; (cx, cy) is the pixel shown at the centre.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/sky.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/strings.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/viewState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/theme/tokens.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const rgb = (hex)=>[
        1,
        3,
        5
    ].map((i)=>parseInt(hex.slice(i, i + 2), 16));
const NAN_RGB = rgb(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].noData);
function renderImage(data, display, size) {
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(size, size);
    for(let i = 0; i < data.length; i++){
        const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stretch"])(data[i], display);
        const o = i * 4;
        if (Number.isNaN(s)) {
            [img.data[o], img.data[o + 1], img.data[o + 2]] = NAN_RGB;
        } else {
            const g = Math.round(s * 255);
            img.data[o] = img.data[o + 1] = img.data[o + 2] = g;
        }
        img.data[o + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    return c;
}
const clamp = (v, lo, hi)=>Math.min(hi, Math.max(lo, v));
function SkyCanvas(p) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [cssW, setCssW] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const image = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SkyCanvas.useMemo[image]": ()=>p.data ? renderImage(p.data, p.display, p.size) : null
    }["SkyCanvas.useMemo[image]"], [
        p.data,
        p.display,
        p.size
    ]);
    const viewRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(p);
    viewRef.current = p;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SkyCanvas.useEffect": ()=>{
            const el = ref.current;
            const ro = new ResizeObserver({
                "SkyCanvas.useEffect": ([e])=>setCssW(e.contentRect.width)
            }["SkyCanvas.useEffect"]);
            ro.observe(el);
            return ({
                "SkyCanvas.useEffect": ()=>ro.disconnect()
            })["SkyCanvas.useEffect"];
        }
    }["SkyCanvas.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SkyCanvas.useEffect": ()=>{
            const el = ref.current;
            if (!el || !cssW) return;
            const dpr = window.devicePixelRatio || 1;
            el.width = Math.round(cssW * dpr);
            el.height = Math.round(cssW * dpr);
            const ctx = el.getContext('2d');
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.fillStyle = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].plate;
            ctx.fillRect(0, 0, cssW, cssW);
            const scale = cssW / p.size * p.zoom; // css px per sky pixel
            const toCss = {
                "SkyCanvas.useEffect.toCss": (x, y)=>[
                        (x - p.cx) * scale + cssW / 2,
                        (y - p.cy) * scale + cssW / 2
                    ]
            }["SkyCanvas.useEffect.toCss"];
            if (image) {
                ctx.imageSmoothingEnabled = false;
                const [left, top] = toCss(-0.5, -0.5);
                ctx.drawImage(image, left, top, p.size * scale, p.size * scale);
            }
            const stroke = {
                "SkyCanvas.useEffect.stroke": (hue, w, path)=>{
                    for (const [c, lw] of [
                        [
                            __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marker"].outline,
                            w + 2.5
                        ],
                        [
                            hue,
                            w
                        ]
                    ]){
                        ctx.beginPath();
                        path();
                        ctx.strokeStyle = c;
                        ctx.lineWidth = lw;
                        ctx.stroke();
                    }
                }
            }["SkyCanvas.useEffect.stroke"];
            if (p.predicted) {
                const [x, y] = toCss(p.predicted.x, p.predicted.y);
                const r = Math.max(2.2 * scale, 9);
                stroke(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marker"].predicted, 1.8, {
                    "SkyCanvas.useEffect": ()=>ctx.arc(x, y, r, 0, Math.PI * 2)
                }["SkyCanvas.useEffect"]);
            }
            if (p.neighbour) {
                const [x, y] = toCss(p.neighbour.x, p.neighbour.y);
                const a = Math.max(1.8 * scale, 8);
                ctx.setLineDash([
                    4,
                    3
                ]);
                stroke(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marker"].neighbour, 1.5, {
                    "SkyCanvas.useEffect": ()=>ctx.rect(x - a, y - a, 2 * a, 2 * a)
                }["SkyCanvas.useEffect"]);
                ctx.setLineDash([]);
            }
            if (p.measured) {
                const [x, y] = toCss(p.measured.x, p.measured.y);
                const a = Math.max(1.2 * scale, 6);
                stroke(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marker"].measured, 1.8, {
                    "SkyCanvas.useEffect": ()=>{
                        ctx.moveTo(x - a, y);
                        ctx.lineTo(x + a, y);
                        ctx.moveTo(x, y - a);
                        ctx.lineTo(x, y + a);
                    }
                }["SkyCanvas.useEffect"]);
            }
            if (p.input) {
                const [x, y] = toCss(p.input.x, p.input.y);
                const a = Math.max(1.6 * scale, 8);
                stroke(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marker"].input, 1.8, {
                    "SkyCanvas.useEffect": ()=>{
                        ctx.moveTo(x, y - a);
                        ctx.lineTo(x + a, y);
                        ctx.lineTo(x, y + a);
                        ctx.lineTo(x - a, y);
                        ctx.closePath();
                    }
                }["SkyCanvas.useEffect"]);
            }
            // Compass (north up, east left) and a scale bar.
            ctx.font = `500 12px ${getComputedStyle(el).fontFamily}`;
            ctx.fillStyle = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].text;
            ctx.strokeStyle = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].text;
            ctx.lineWidth = 1.5;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
            ctx.shadowBlur = 3;
            const ox = cssW - 18;
            const oy = 46;
            ctx.beginPath();
            ctx.moveTo(ox, oy);
            ctx.lineTo(ox, oy - 26);
            ctx.moveTo(ox, oy);
            ctx.lineTo(ox - 26, oy);
            ctx.stroke();
            ctx.textAlign = 'center';
            ctx.fillText(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].compassNorth, ox, oy - 31);
            ctx.textAlign = 'right';
            ctx.fillText(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].compassEast, ox - 30, oy + 4);
            const arcsec = [
                5,
                10,
                15,
                30,
                60,
                120
            ].find({
                "SkyCanvas.useEffect": (a)=>a / p.scaleArcsec * scale >= 50
            }["SkyCanvas.useEffect"]) ?? 120;
            const len = arcsec / p.scaleArcsec * scale;
            ctx.beginPath();
            ctx.moveTo(12, cssW - 14);
            ctx.lineTo(12 + len, cssW - 14);
            ctx.stroke();
            ctx.textAlign = 'left';
            ctx.fillText(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].scaleBar(arcsec), 12, cssW - 20);
            ctx.shadowBlur = 0;
        }
    }["SkyCanvas.useEffect"], [
        cssW,
        image,
        p.zoom,
        p.cx,
        p.cy,
        p.predicted,
        p.measured,
        p.input,
        p.neighbour,
        p.size,
        p.scaleArcsec
    ]);
    // Pan by dragging, zoom with the wheel about the cursor.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SkyCanvas.useEffect": ()=>{
            const el = ref.current;
            let drag = null;
            const scale = {
                "SkyCanvas.useEffect.scale": ()=>el.clientWidth / viewRef.current.size * viewRef.current.zoom
            }["SkyCanvas.useEffect.scale"];
            const max = {
                "SkyCanvas.useEffect.max": ()=>viewRef.current.size - 1
            }["SkyCanvas.useEffect.max"];
            const down = {
                "SkyCanvas.useEffect.down": (e)=>{
                    el.setPointerCapture(e.pointerId);
                    drag = {
                        x: e.clientX,
                        y: e.clientY,
                        cx: viewRef.current.cx,
                        cy: viewRef.current.cy
                    };
                }
            }["SkyCanvas.useEffect.down"];
            const move = {
                "SkyCanvas.useEffect.move": (e)=>{
                    if (!drag) return;
                    const s = scale();
                    viewRef.current.onView({
                        cx: clamp(drag.cx - (e.clientX - drag.x) / s, 0, max()),
                        cy: clamp(drag.cy - (e.clientY - drag.y) / s, 0, max())
                    });
                }
            }["SkyCanvas.useEffect.move"];
            const up = {
                "SkyCanvas.useEffect.up": ()=>drag = null
            }["SkyCanvas.useEffect.up"];
            const wheel = {
                "SkyCanvas.useEffect.wheel": (e)=>{
                    e.preventDefault();
                    const v = viewRef.current;
                    const rect = el.getBoundingClientRect();
                    const s = scale();
                    const px = e.clientX - rect.left - rect.width / 2;
                    const py = e.clientY - rect.top - rect.height / 2;
                    const zoom = clamp(v.zoom * Math.exp(-e.deltaY * 0.0015), __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZOOM_MIN"], __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZOOM_MAX"]);
                    const s2 = el.clientWidth / v.size * zoom;
                    const dx = v.cx + px / s;
                    const dy = v.cy + py / s;
                    v.onView({
                        zoom,
                        cx: clamp(dx - px / s2, 0, max()),
                        cy: clamp(dy - py / s2, 0, max())
                    });
                }
            }["SkyCanvas.useEffect.wheel"];
            el.addEventListener('pointerdown', down);
            el.addEventListener('pointermove', move);
            el.addEventListener('pointerup', up);
            el.addEventListener('pointercancel', up);
            el.addEventListener('wheel', wheel, {
                passive: false
            });
            return ({
                "SkyCanvas.useEffect": ()=>{
                    el.removeEventListener('pointerdown', down);
                    el.removeEventListener('pointermove', move);
                    el.removeEventListener('pointerup', up);
                    el.removeEventListener('pointercancel', up);
                    el.removeEventListener('wheel', wheel);
                }
            })["SkyCanvas.useEffect"];
        }
    }["SkyCanvas.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: ref,
        className: "sky-canvas",
        role: "img",
        "aria-label": p.label
    }, void 0, false, {
        fileName: "[project]/web/src/components/SkyCanvas.tsx",
        lineNumber: 213,
        columnNumber: 10
    }, this);
}
_s(SkyCanvas, "rDo4/AjbWVvcv6Q2J1q8LNWvff8=");
_c = SkyCanvas;
function MarkerSwatch({ kind }) {
    const shape = {
        predicted: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "9",
            cy: "9",
            r: "6"
        }, void 0, false, {
            fileName: "[project]/web/src/components/SkyCanvas.tsx",
            lineNumber: 219,
            columnNumber: 16
        }, this),
        measured: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M3 9h12M9 3v12"
        }, void 0, false, {
            fileName: "[project]/web/src/components/SkyCanvas.tsx",
            lineNumber: 220,
            columnNumber: 15
        }, this),
        input: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M9 2.5 15.5 9 9 15.5 2.5 9Z"
        }, void 0, false, {
            fileName: "[project]/web/src/components/SkyCanvas.tsx",
            lineNumber: 221,
            columnNumber: 12
        }, this),
        neighbour: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
            x: "3",
            y: "3",
            width: "12",
            height: "12",
            strokeDasharray: "3 2.4"
        }, void 0, false, {
            fileName: "[project]/web/src/components/SkyCanvas.tsx",
            lineNumber: 222,
            columnNumber: 16
        }, this),
        noData: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
            x: "3",
            y: "3",
            width: "12",
            height: "12",
            fill: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].noData,
            stroke: "none"
        }, void 0, false, {
            fileName: "[project]/web/src/components/SkyCanvas.tsx",
            lineNumber: 223,
            columnNumber: 13
        }, this)
    }[kind];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "swatch",
        width: "18",
        height: "18",
        viewBox: "0 0 18 18",
        "aria-hidden": "true",
        fill: "none",
        stroke: kind === 'noData' ? undefined : __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$theme$2f$tokens$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marker"][kind],
        strokeWidth: "2",
        children: shape
    }, void 0, false, {
        fileName: "[project]/web/src/components/SkyCanvas.tsx",
        lineNumber: 226,
        columnNumber: 5
    }, this);
}
_c1 = MarkerSwatch;
var _c, _c1;
__turbopack_context__.k.register(_c, "SkyCanvas");
__turbopack_context__.k.register(_c1, "MarkerSwatch");
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
"[project]/web/src/components/TimeAxis.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TimeAxis",
    ()=>TimeAxis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// The main scrubber: a real time axis from the first to the last visit. Each frame is a mark at its
// date, sized by how many photos it holds; the current one is lit in the accent. One slider for
// keyboard and screen readers (arrows, Home, End), pointer down or drag picks the nearest frame.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/strings.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const MONTH = new Intl.DateTimeFormat('en', {
    month: 'short',
    timeZone: 'UTC'
});
const mid = (f)=>(f.mjdStart + f.mjdEnd) / 2;
const toMjd = (d)=>d.getTime() / 86400000 + 40587;
function TimeAxis({ frames, index, headLabel, isDisabled, onSeek }) {
    _s();
    const track = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const n = frames.length;
    const axis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TimeAxis.useMemo[axis]": ()=>{
            if (!frames.length) return null;
            const t0 = Math.min(...frames.map({
                "TimeAxis.useMemo[axis].t0": (f)=>f.mjdStart
            }["TimeAxis.useMemo[axis].t0"]));
            const t1 = Math.max(...frames.map({
                "TimeAxis.useMemo[axis].t1": (f)=>f.mjdEnd
            }["TimeAxis.useMemo[axis].t1"]));
            const span = t1 - t0 || 1;
            const kmax = Math.max(...frames.map({
                "TimeAxis.useMemo[axis].kmax": (f)=>f.exposures.length
            }["TimeAxis.useMemo[axis].kmax"]));
            const marks = frames.map({
                "TimeAxis.useMemo[axis].marks": (f)=>({
                        p: frames.length > 1 ? (mid(f) - t0) / span : 0.5,
                        size: kmax > 1 ? Math.round(6 + 12 * Math.sqrt(f.exposures.length / kmax)) : 7
                    })
            }["TimeAxis.useMemo[axis].marks"]);
            // One tick per month; January carries its year, every third month its name.
            // ponytail: monthly ticks suit the one-year SPHEREx baseline; thin them out if a span runs to years.
            const ticks = [];
            const start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mjdToDate"])(t0);
            for(let m = 1;; m++){
                const d = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + m, 1));
                if (toMjd(d) >= t1) break;
                const month = d.getUTCMonth();
                ticks.push({
                    p: (toMjd(d) - t0) / span,
                    label: month === 0 ? String(d.getUTCFullYear()) : month % 3 === 0 ? MONTH.format(d) : null
                });
            }
            return {
                t0,
                span,
                marks,
                ticks
            };
        }
    }["TimeAxis.useMemo[axis]"], [
        frames
    ]);
    if (!axis) return null;
    const head = axis.marks[index]?.p ?? 0;
    const seekAt = (clientX)=>{
        const r = track.current.getBoundingClientRect();
        const t = axis.t0 + (clientX - r.left) / r.width * axis.span;
        let best = 0;
        frames.forEach((f, i)=>{
            if (Math.abs(mid(f) - t) < Math.abs(mid(frames[best]) - t)) best = i;
        });
        onSeek(best);
    };
    const onPointerDown = (e)=>{
        if (isDisabled) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        seekAt(e.clientX);
    };
    const onPointerMove = (e)=>{
        if (e.currentTarget.hasPointerCapture(e.pointerId)) seekAt(e.clientX);
    };
    const onKeyDown = (e)=>{
        const step = {
            ArrowRight: 1,
            ArrowUp: 1,
            ArrowLeft: -1,
            ArrowDown: -1,
            PageUp: 10,
            PageDown: -10
        };
        const next = e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : e.key in step ? index + step[e.key] : null;
        if (next === null || isDisabled) return;
        e.preventDefault();
        onSeek(Math.max(0, Math.min(n - 1, next)));
    };
    // --p (0 to 1) slides a label's anchor from its left edge to its right edge, so it never overhangs the axis.
    const at = (p)=>({
            left: `${p * 100}%`,
            '--p': p
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "timeline",
        role: "slider",
        tabIndex: isDisabled ? -1 : 0,
        "aria-label": __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].timeAxis,
        "aria-valuemin": 1,
        "aria-valuemax": n,
        "aria-valuenow": index + 1,
        "aria-valuetext": __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].timeAxisValue(headLabel, index + 1, n),
        "aria-disabled": isDisabled || undefined,
        onPointerDown: onPointerDown,
        onPointerMove: onPointerMove,
        onKeyDown: onKeyDown,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "timeline-track",
            ref: track,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "timeline-line"
                }, void 0, false, {
                    fileName: "[project]/web/src/components/TimeAxis.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this),
                axis.ticks.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "timeline-tick",
                        style: at(t.p),
                        "data-major": t.label ? '' : undefined,
                        children: t.label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "timeline-label data",
                            children: t.label
                        }, void 0, false, {
                            fileName: "[project]/web/src/components/TimeAxis.tsx",
                            lineNumber: 102,
                            columnNumber: 25
                        }, this)
                    }, t.p, false, {
                        fileName: "[project]/web/src/components/TimeAxis.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this)),
                axis.marks.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "timeline-mark",
                        "data-current": i === index ? '' : undefined,
                        style: {
                            ...at(m.p),
                            width: m.size,
                            height: m.size
                        }
                    }, i, false, {
                        fileName: "[project]/web/src/components/TimeAxis.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "timeline-needle",
                    style: at(head)
                }, void 0, false, {
                    fileName: "[project]/web/src/components/TimeAxis.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "timeline-head data",
                    style: at(head),
                    children: headLabel
                }, void 0, false, {
                    fileName: "[project]/web/src/components/TimeAxis.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/src/components/TimeAxis.tsx",
            lineNumber: 98,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/web/src/components/TimeAxis.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_s(TimeAxis, "spFs/Gy9rVzLexq+JBGeb/sYb70=");
_c = TimeAxis;
var _c;
__turbopack_context__.k.register(_c, "TimeAxis");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/components/TopBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TopBar",
    ()=>TopBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/strings.ts [app-client] (ecmascript)");
;
;
;
function TopBar({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "topbar",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: "brand",
                "aria-label": `${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].appName}, ${__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].home}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "28",
                        height: "28",
                        viewBox: "0 0 32 32",
                        "aria-hidden": "true",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                x: "0.5",
                                y: "0.5",
                                width: "31",
                                height: "31",
                                rx: "6.5",
                                fill: "var(--sb-surface)",
                                stroke: "var(--sb-border-strong)"
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/TopBar.tsx",
                                lineNumber: 10,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "9.5",
                                cy: "20",
                                r: "2.8",
                                fill: "var(--sb-text-faint)"
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/TopBar.tsx",
                                lineNumber: 11,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "19.5",
                                cy: "13",
                                r: "3.4",
                                fill: "var(--sb-text)"
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/TopBar.tsx",
                                lineNumber: 12,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "19.5",
                                cy: "13",
                                r: "7.6",
                                fill: "none",
                                stroke: "var(--sb-accent)",
                                strokeWidth: "2"
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/TopBar.tsx",
                                lineNumber: 13,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/TopBar.tsx",
                        lineNumber: 9,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].appName
                    }, void 0, false, {
                        fileName: "[project]/web/src/components/TopBar.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/components/TopBar.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/web/src/components/TopBar.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = TopBar;
var _c;
__turbopack_context__.k.register(_c, "TopBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/web/src/components/WatchPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WatchPage",
    ()=>WatchPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Banner$2f$Banner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Banner/Banner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$Link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/@astryxdesign/core/dist/Link/Link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/resolve.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/sky.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/strings.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/lib/viewState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$MissionView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/MissionView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$MoverBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/MoverBanner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$TargetCards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/TargetCards.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$TopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/src/components/TopBar.tsx [app-client] (ecmascript)");
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
;
;
;
function WatchPage() {
    _s();
    const search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])().toString();
    const written = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [nav, setNav] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [res, setRes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const mission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useView"])({
        "WatchPage.useView[mission]": (s)=>s.mission
    }["WatchPage.useView[mission]"]);
    const ra = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useView"])({
        "WatchPage.useView[ra]": (s)=>s.ra
    }["WatchPage.useView[ra]"]);
    const dec = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useView"])({
        "WatchPage.useView[dec]": (s)=>s.dec
    }["WatchPage.useView[dec]"]);
    // A navigation (first load or a link) re-reads the URL; the strings this page writes itself are ignored.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WatchPage.useEffect": ()=>{
            if (search === written.current) return;
            const { view, hasFrame } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseView"])(search);
            __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useView"].setState({
                ...view,
                playing: false
            });
            setRes(null);
            setError(null);
            setNav({
                "WatchPage.useEffect": (n)=>({
                        id: (n?.id ?? 0) + 1,
                        autoplay: !hasFrame
                    })
            }["WatchPage.useEffect"]);
        }
    }["WatchPage.useEffect"], [
        search
    ]);
    // Keep the URL in sync (debounced, and not while playing: browsers throttle replaceState).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WatchPage.useEffect": ()=>{
            let t;
            const unsub = __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useView"].subscribe({
                "WatchPage.useEffect.unsub": (s)=>{
                    clearTimeout(t);
                    if (s.playing) return;
                    t = setTimeout({
                        "WatchPage.useEffect.unsub": ()=>{
                            written.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeView"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["viewOf"])(s));
                            window.history.replaceState(null, '', `?${written.current}`);
                        }
                    }["WatchPage.useEffect.unsub"], 250);
                }
            }["WatchPage.useEffect.unsub"]);
            return ({
                "WatchPage.useEffect": ()=>{
                    clearTimeout(t);
                    unsub();
                }
            })["WatchPage.useEffect"];
        }
    }["WatchPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WatchPage.useEffect": ()=>{
            if (nav === null || ra === null || dec === null) return;
            let alive = true;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$resolve$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePosition"])(ra, dec).then({
                "WatchPage.useEffect": (r)=>{
                    if (!alive) return;
                    setRes(r);
                    if (!__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useView"].getState().mission && r.mission) __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useView"].getState().set({
                        mission: r.mission.id
                    });
                }
            }["WatchPage.useEffect"], {
                "WatchPage.useEffect": (e)=>alive && setError(String(e))
            }["WatchPage.useEffect"]);
            return ({
                "WatchPage.useEffect": ()=>{
                    alive = false;
                }
            })["WatchPage.useEffect"];
        }
    }["WatchPage.useEffect"], [
        nav,
        ra,
        dec
    ]);
    if (nav === null) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$TopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopBar"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Link$2f$Link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                    href: "/",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].backHome
                }, void 0, false, {
                    fileName: "[project]/web/src/components/WatchPage.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/web/src/components/WatchPage.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "watch-page",
                children: [
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f40$astryxdesign$2f$core$2f$dist$2f$Banner$2f$Banner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Banner"], {
                        status: "error",
                        title: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].loadFailed,
                        description: error
                    }, void 0, false, {
                        fileName: "[project]/web/src/components/WatchPage.tsx",
                        lineNumber: 76,
                        columnNumber: 19
                    }, this),
                    mission ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$MissionView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MissionView"], {
                        autoplay: nav.autoplay,
                        resolution: res
                    }, `${nav.id}-${mission}`, false, {
                        fileName: "[project]/web/src/components/WatchPage.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this) : ra !== null && dec !== null ? res ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "placeholder",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$MoverBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MoverBanner"], {
                                res: res
                            }, void 0, false, {
                                fileName: "[project]/web/src/components/WatchPage.tsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "empty-plate",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].placeholderTitle
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/WatchPage.tsx",
                                        lineNumber: 84,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].placeholderPosition,
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "data",
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRa"])(ra),
                                                    " ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$sky$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDec"])(dec)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web/src/components/WatchPage.tsx",
                                                lineNumber: 86,
                                                columnNumber: 43
                                            }, this),
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "data muted",
                                                children: [
                                                    "(",
                                                    ra.toFixed(6),
                                                    " ",
                                                    dec.toFixed(6),
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/web/src/components/WatchPage.tsx",
                                                lineNumber: 87,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/web/src/components/WatchPage.tsx",
                                        lineNumber: 85,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "muted",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].placeholderBody
                                    }, void 0, false, {
                                        fileName: "[project]/web/src/components/WatchPage.tsx",
                                        lineNumber: 91,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/web/src/components/WatchPage.tsx",
                                lineNumber: 83,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$TargetCards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TargetCards"], {}, void 0, false, {
                                fileName: "[project]/web/src/components/WatchPage.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/web/src/components/WatchPage.tsx",
                        lineNumber: 81,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "muted",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$strings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S"].searching
                    }, void 0, false, {
                        fileName: "[project]/web/src/components/WatchPage.tsx",
                        lineNumber: 96,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$components$2f$TargetCards$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TargetCards"], {}, void 0, false, {
                        fileName: "[project]/web/src/components/WatchPage.tsx",
                        lineNumber: 99,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/web/src/components/WatchPage.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/web/src/components/WatchPage.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(WatchPage, "wuLRQo0ymeluGQ95b5yBBjs2Qs8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useView"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useView"],
        __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$src$2f$lib$2f$viewState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useView"]
    ];
});
_c = WatchPage;
var _c;
__turbopack_context__.k.register(_c, "WatchPage");
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
"[project]/web/src/lib/viewState.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_VIEW",
    ()=>DEFAULT_VIEW,
    "FPS_STEPS",
    ()=>FPS_STEPS,
    "ZOOM_MAX",
    ()=>ZOOM_MAX,
    "ZOOM_MIN",
    ()=>ZOOM_MIN,
    "parseView",
    ()=>parseView,
    "serializeView",
    ()=>serializeView,
    "useView",
    ()=>useView,
    "viewOf",
    ()=>viewOf
]);
// The whole view lives in the URL so a copied link restores the same frame. Parsing is tolerant:
// anything missing or malformed falls back to the default, never throws.
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const ZOOM_MIN = 1;
const ZOOM_MAX = 16;
const FPS_STEPS = [
    0.5,
    1,
    2,
    4,
    8,
    12
];
const CENTRE = 60;
const DEFAULT_VIEW = {
    mission: null,
    ra: null,
    dec: null,
    group: null,
    mode: 'stack',
    frame: 0,
    overlays: {
        pred: true,
        meas: true,
        input: true
    },
    zoom: 1,
    cx: CENTRE,
    cy: CENTRE,
    fps: 2,
    loop: true
};
const ID = /^[a-z0-9_-]{1,40}$/i;
function num(v, lo, hi) {
    if (v === null || v.trim() === '') return null;
    const n = Number(v);
    return Number.isFinite(n) && n >= lo && n <= hi ? n : null;
}
const round = (n, d)=>Number(n.toFixed(d));
function serializeView(s) {
    const p = new URLSearchParams();
    if (s.mission) p.set('m', s.mission);
    if (s.ra !== null && s.dec !== null) {
        p.set('ra', String(round(s.ra, 6)));
        p.set('dec', String(round(s.dec, 6)));
    }
    if (s.group) p.set('g', s.group);
    p.set('mode', s.mode);
    p.set('f', String(s.frame));
    const ov = [
        'pred',
        'meas',
        'input'
    ].filter((k)=>s.overlays[k]);
    p.set('ov', ov.length ? ov.join(',') : 'none');
    p.set('z', String(round(s.zoom, 2)));
    p.set('cx', String(round(s.cx, 2)));
    p.set('cy', String(round(s.cy, 2)));
    p.set('fps', String(s.fps));
    p.set('loop', s.loop ? '1' : '0');
    return p.toString();
}
function parseView(search) {
    const p = new URLSearchParams(search);
    const v = {
        ...DEFAULT_VIEW,
        overlays: {
            ...DEFAULT_VIEW.overlays
        }
    };
    const m = p.get('m');
    if (m && ID.test(m)) v.mission = m;
    const ra = num(p.get('ra'), 0, 360);
    const dec = num(p.get('dec'), -90, 90);
    if (ra !== null && dec !== null) {
        v.ra = ra;
        v.dec = dec;
    }
    const g = p.get('g');
    if (g && ID.test(g)) v.group = g;
    if (p.get('mode') === 'exp') v.mode = 'exp';
    const f = num(p.get('f'), 0, 100000);
    if (f !== null) v.frame = Math.floor(f);
    const ov = p.get('ov');
    if (ov !== null) {
        const set = new Set(ov.split(','));
        v.overlays = {
            pred: set.has('pred'),
            meas: set.has('meas'),
            input: set.has('input')
        };
    }
    v.zoom = num(p.get('z'), ZOOM_MIN, ZOOM_MAX) ?? v.zoom;
    v.cx = num(p.get('cx'), 0, 121) ?? v.cx;
    v.cy = num(p.get('cy'), 0, 121) ?? v.cy;
    const fps = num(p.get('fps'), 0, 100);
    if (fps !== null && FPS_STEPS.includes(fps)) v.fps = fps;
    if (p.get('loop') === '0') v.loop = false;
    return {
        view: v,
        hasFrame: f !== null
    };
}
const useView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        ...DEFAULT_VIEW,
        playing: false,
        set: (patch)=>set(patch)
    }));
function viewOf(s) {
    const { mission, ra, dec, group, mode, frame, overlays, zoom, cx, cy, fps, loop } = s;
    return {
        mission,
        ra,
        dec,
        group,
        mode,
        frame,
        overlays,
        zoom,
        cx,
        cy,
        fps,
        loop
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=web_src_0gtx3-ddk8l7n._.js.map