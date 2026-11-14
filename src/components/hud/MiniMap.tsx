'use client';

/**
 * Whole-sky map in galactic Mollweide (Milky Way across the middle, longitude
 * increasing to the left), painted from the same NASA Allsky image as the globe,
 * with the current footprint drawn on top. Click to fly there.
 */
import { useEffect, useRef } from 'react';
import * as healpix from '@hscmap/healpix';
import { useNav } from '@/lib/store';
import { SURVEYS } from '@/lib/sky/surveys';
import { ALLSKY_COLUMNS, allskyPixel, allskyUrl } from '@/lib/sky/hips';
import { type Vec3, DEG, RAD, add, cross, eqToGal, galToEq, normalize, radecToVec, scale, vecToRadec } from '@/lib/sky/coords';
import { effectiveFov, pickSky, visibleRadiusDeg } from '@/lib/sky/view';
import { currentView, flyTo, viewportAspect } from '@/lib/navigation';
import { loadAllsky } from '../sky/allsky';
import { HINT } from './hints';

const W = 256;
const H = 128;

function forward(v: Vec3): { x: number; y: number } {
  const { ra: lRaw, dec: b } = vecToRadec(eqToGal(v));
  const l = ((((lRaw + 180) % 360) + 360) % 360) - 180;
  const lambda = -l * DEG;
  const phi = b * DEG;
  let theta = phi;
  if (Math.abs(phi) > Math.PI / 2 - 1e-6) {
    theta = Math.sign(phi) * (Math.PI / 2);
  } else {
    for (let i = 0; i < 12; i++) {
      const f = 2 * theta + Math.sin(2 * theta) - Math.PI * Math.sin(phi);
      const d = 2 + 2 * Math.cos(2 * theta);
      if (Math.abs(d) < 1e-12) break;
      theta -= f / d;
    }
  }
  return { x: (((lambda / Math.PI) * Math.cos(theta) + 1) / 2) * W, y: ((1 - Math.sin(theta)) / 2) * H };
}

function inverse(px: number, py: number): Vec3 | null {
  const X = (px / W) * 2 - 1;
  const Y = 1 - (py / H) * 2;
  if (X * X + Y * Y > 1) return null;
  const theta = Math.asin(Y);
  const b = Math.asin((2 * theta + Math.sin(2 * theta)) / Math.PI) * RAD;
  const lambda = (Math.PI * X) / Math.cos(theta);
  if (Math.abs(lambda) > Math.PI) return null;
  return galToEq(radecToVec(-lambda * RAD, b));
}

function paintBackground(bitmap: ImageBitmap): HTMLCanvasElement {
  const src = document.createElement('canvas');
  src.width = bitmap.width;
  src.height = bitmap.height;
  const sctx = src.getContext('2d', { willReadFrequently: true });
  const out = document.createElement('canvas');
  out.width = W;
  out.height = H;
  const octx = out.getContext('2d');
  if (!sctx || !octx) return out;
  sctx.drawImage(bitmap, 0, 0);
  const data = sctx.getImageData(0, 0, src.width, src.height).data;
  const tilePx = bitmap.width / ALLSKY_COLUMNS;
  const levels = Math.round(Math.log2(tilePx));
  const nside = 2 ** (3 + levels);
  const per = 4 ** levels;
  const img = octx.createImageData(W, H);
  for (let py = 0; py < H; py++) {
    for (let px = 0; px < W; px++) {
      const v = inverse(px + 0.5, py + 0.5);
      if (!v) continue;
      const ipix = healpix.vec2pix_nest(nside, v);
      const { x: ne, y: nw } = healpix.bit_decombine(ipix % per);
      const p = allskyPixel(Math.floor(ipix / per), ne, nw, tilePx);
      const si = (Math.floor(p.y) * src.width + Math.floor(p.x)) * 4;
      const di = (py * W + px) * 4;
      img.data[di] = data[si];
      img.data[di + 1] = data[si + 1];
      img.data[di + 2] = data[si + 2];
      img.data[di + 3] = 255;
    }
  }
  octx.putImageData(img, 0, 0);
  return out;
}

function smallCircle(center: Vec3, radiusDeg: number, steps = 64): Vec3[] {
  const c = normalize(center);
  const helper: Vec3 = Math.abs(c[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
  const e1 = normalize(cross(c, helper));
  const e2 = cross(c, e1);
  const r = radiusDeg * DEG;
  const pts: Vec3[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 * Math.PI;
    pts.push(normalize(add(scale(c, Math.cos(r)), add(scale(e1, Math.sin(r) * Math.cos(t)), scale(e2, Math.sin(r) * Math.sin(t))))));
  }
  return pts;
}

function footprint(): Vec3[] {
  const view = currentView();
  const aspect = viewportAspect();
  if (view.mode === 'globe') return smallCircle(view.center, visibleRadiusDeg(view, aspect));
  const pts: Vec3[] = [];
  const edge = (fn: (t: number) => [number, number]) => {
    for (let i = 0; i <= 12; i++) {
      const [x, y] = fn(i / 12);
      const p = pickSky(view, aspect, x, y);
      if (p) pts.push(p);
    }
  };
  edge((t) => [-1 + 2 * t, 1]);
  edge((t) => [1, 1 - 2 * t]);
  edge((t) => [1 - 2 * t, -1]);
  edge((t) => [-1, -1 + 2 * t]);
  return pts;
}

export function MiniMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const background = useRef<HTMLCanvasElement | null>(null);
  const surveyId = useNav((s) => s.surveyId);
  const frame = useNav((s) => s.frame);

  useEffect(() => {
    const survey = SURVEYS[surveyId];
    let cancelled = false;
    loadAllsky(allskyUrl(survey, survey.isCube ? frame : 0))
      .then((asset) => {
        if (!cancelled) background.current = paintBackground(asset.bitmap);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [surveyId, frame]);

  useEffect(() => {
    let raf = 0;
    let lastSig = '';
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;
      const st = useNav.getState();
      const dpr = st.viewport.dpr || 1;
      const sig = `${st.center.join()}|${st.fov}|${st.distance}|${st.mode}|${background.current ? 1 : 0}|${dpr}`;
      if (sig === lastSig) return;
      lastSig = sig;
      if (canvas.width !== W * dpr) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(W / 2, H / 2, W / 2 - 0.5, H / 2 - 0.5, 0, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = '#070b16';
      ctx.fillRect(0, 0, W, H);
      if (background.current) {
        ctx.globalAlpha = 0.9;
        ctx.drawImage(background.current, 0, 0, W, H);
        ctx.globalAlpha = 1;
      }
      ctx.strokeStyle = 'rgba(160, 190, 235, 0.25)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, H / 2);
      ctx.lineTo(W, H / 2);
      ctx.moveTo(W / 2, 0);
      ctx.lineTo(W / 2, H);
      ctx.stroke();

      const pts = footprint().map(forward);
      ctx.strokeStyle = '#7fe3ff';
      ctx.fillStyle = 'rgba(127, 227, 255, 0.18)';
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      pts.forEach((p, i) => {
        if (i === 0 || Math.abs(p.x - pts[i - 1].x) > W / 2) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
      const c = forward(st.center);
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(c.x, c.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.strokeStyle = 'rgba(160, 190, 235, 0.45)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(W / 2, H / 2, W / 2 - 0.5, H / 2 - 0.5, 0, 0, Math.PI * 2);
      ctx.stroke();
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="minimap" data-hint={HINT.minimap}>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{ width: W, height: H }}
        role="img"
        aria-label="Whole-sky map in galactic coordinates, with the current view outlined. Click to fly there."
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const v = inverse(((e.clientX - r.left) / r.width) * W, ((e.clientY - r.top) / r.height) * H);
          if (v) flyTo(v, effectiveFov(currentView()), 'navigation');
        }}
      />
      <p className="minimap-caption">Galactic map · Milky Way across the middle</p>
    </div>
  );
}
