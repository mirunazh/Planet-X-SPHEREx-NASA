# WCAG 2.x contrast ratio for the token pairs listed in NOTES.md. Run: python3 contrast.py
import sys
def lum(h):
    h = h.lstrip('#'); c = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    c = [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
def cr(a, b):
    la, lb = sorted((lum(a), lum(b)), reverse=True); return (la + 0.05) / (lb + 0.05)
assert abs(cr('#000000', '#FFFFFF') - 21) < 1e-9 and abs(cr('#E9E7E2', '#1E1F21') - 13.35) < 0.01
pairs = [l.split() for l in sys.stdin.read().strip().splitlines()] if not sys.stdin.isatty() else []
for p in pairs:
    print(f"{p[0]} on {p[1]}: {cr(p[0], p[1]):.2f}  {' '.join(p[2:])}")
