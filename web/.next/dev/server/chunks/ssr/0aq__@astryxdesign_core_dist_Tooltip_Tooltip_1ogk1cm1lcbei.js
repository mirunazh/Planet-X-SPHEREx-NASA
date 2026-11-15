module.exports = [
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
];

//# sourceMappingURL=0aq__%40astryxdesign_core_dist_Tooltip_Tooltip_1ogk1cm1lcbei.js.map