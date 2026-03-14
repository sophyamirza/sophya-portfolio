"use client";

import { useEffect, useRef } from "react";

type Vec2 = { x: number; y: number };
type P3 = { x: number; y: number; z: number };
type Segment3 = [P3, P3];
type Shape3 = {
  name: string;
  points: P3[];
  edges: [number, number][];
};

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

function thermal(v01: number, a: number) {
  const t = clamp(v01, 0, 1);
  const h = lerp(240, 0, t);
  const s = 95;
  const l = lerp(40, 60, t);
  return `hsla(${h} ${s}% ${l}% / ${a})`;
}

function distToSegment2(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number
) {
  const vx = bx - ax;
  const vy = by - ay;
  const wx = px - ax;
  const wy = py - ay;
  const c1 = vx * wx + vy * wy;
  if (c1 <= 0) return Math.hypot(px - ax, py - ay);
  const c2 = vx * vx + vy * vy;
  if (c2 <= c1) return Math.hypot(px - bx, py - by);
  const t = c1 / c2;
  const qx = ax + t * vx;
  const qy = ay + t * vy;
  return Math.hypot(px - qx, py - qy);
}

function resampleClosed(points: P3[], n: number): P3[] {
  const dists: number[] = [0];
  let total = 0;

  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const d = Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
    total += d;
    dists.push(total);
  }

  const out: P3[] = [];
  for (let i = 0; i < n; i++) {
    const target = (i / n) * total;

    let seg = 0;
    while (seg < dists.length - 1 && dists[seg + 1] < target) seg++;

    const a = points[seg % points.length];
    const b = points[(seg + 1) % points.length];
    const segStart = dists[seg];
    const segEnd = dists[seg + 1];
    const span = Math.max(1e-6, segEnd - segStart);
    const t = (target - segStart) / span;

    out.push({
      x: lerp(a.x, b.x, t),
      y: lerp(a.y, b.y, t),
      z: lerp(a.z, b.z, t),
    });
  }

  return out;
}

function makeShapeFromOutline(name: string, raw: [number, number][], zScale = 0): Shape3 {
  const outline = raw.map(([x, y]) => ({ x, y, z: 0 }));
  const points = resampleClosed(outline, 96).map((p, i) => ({
    x: p.x,
    y: p.y,
    z: Math.sin((i / 96) * Math.PI * 2) * zScale,
  }));

  const edges: [number, number][] = [];
  for (let i = 0; i < points.length; i++) {
    edges.push([i, (i + 1) % points.length]);
  }

  return { name, points, edges };
}

// ---------- SHAPES ----------

// F1-ish side profile
const f1Shape = makeShapeFromOutline("F1", [
  [-1.55, 0.04],
  [-1.25, 0.03],
  [-1.08, 0.01],
  [-0.92, -0.01],
  [-0.82, -0.06],
  [-0.72, -0.15],
  [-0.56, -0.16],
  [-0.42, -0.09],
  [-0.22, -0.06],
  [-0.08, -0.02],
  [0.10, -0.01],
  [0.26, 0.00],
  [0.42, -0.02],
  [0.60, -0.10],
  [0.76, -0.14],
  [0.95, -0.12],
  [1.12, -0.03],
  [1.25, 0.00],
  [1.42, 0.01],
  [1.52, 0.00],
  [1.52, 0.09],
  [1.35, 0.09],
  [1.18, 0.12],
  [1.00, 0.16],
  [0.82, 0.17],
  [0.64, 0.12],
  [0.38, 0.08],
  [0.14, 0.20],
  [-0.14, 0.26],
  [-0.34, 0.24],
  [-0.54, 0.16],
  [-0.72, 0.11],
  [-0.92, 0.12],
  [-1.10, 0.14],
  [-1.30, 0.14],
  [-1.55, 0.14],
], 0.04);

// Fighter jet-ish
const jetShape = makeShapeFromOutline("Jet", [
  [-1.7, 0.0],
  [-1.45, 0.03],
  [-1.15, 0.06],
  [-0.8, 0.09],
  [-0.25, 0.11],
  [0.15, 0.36],
  [0.62, 0.16],
  [1.02, 0.12],
  [1.38, 0.06],
  [1.72, 0.0],
  [1.38, -0.06],
  [1.02, -0.12],
  [0.62, -0.16],
  [0.15, -0.36],
  [-0.25, -0.11],
  [-0.8, -0.09],
  [-1.15, -0.06],
  [-1.45, -0.03],
], 0.06);

// Reentry capsule / blunt body
const capsuleShape = makeShapeFromOutline("Capsule", [
  [-1.1, 0.0],
  [-1.0, 0.18],
  [-0.78, 0.34],
  [-0.38, 0.48],
  [0.1, 0.44],
  [0.55, 0.26],
  [0.92, 0.08],
  [1.0, 0.0],
  [0.92, -0.08],
  [0.55, -0.26],
  [0.1, -0.44],
  [-0.38, -0.48],
  [-0.78, -0.34],
  [-1.0, -0.18],
], 0.035);

// Airfoil / wing section
const airfoilShape = makeShapeFromOutline("Airfoil", [
  [-1.6, 0.0],
  [-1.3, 0.08],
  [-0.95, 0.16],
  [-0.45, 0.2],
  [0.05, 0.18],
  [0.65, 0.1],
  [1.15, 0.04],
  [1.55, 0.01],
  [1.6, 0.0],
  [1.55, -0.005],
  [1.1, -0.018],
  [0.55, -0.032],
  [-0.05, -0.05],
  [-0.6, -0.06],
  [-1.0, -0.05],
  [-1.35, -0.028],
], 0.02);

const shapes: Shape3[] = [f1Shape, jetShape, capsuleShape, airfoilShape];

function morphShapes(a: Shape3, b: Shape3, t: number): Shape3 {
  const points = a.points.map((p, i) => {
    const q = b.points[i];
    return {
      x: lerp(p.x, q.x, t),
      y: lerp(p.y, q.y, t),
      z: lerp(p.z, q.z, t),
    };
  });

  return {
    name: `${a.name}-${b.name}`,
    points,
    edges: a.edges,
  };
}

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const targetMouse = useRef<Vec2>({ x: -9999, y: -9999 });
  const smoothMouse = useRef<Vec2>({ x: -9999, y: -9999 });
  const hoverRef = useRef(false);

  const targetScroll = useRef(0);
  const smoothScroll = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const parent = canvas.parentElement!;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      hoverRef.current = true;
    };

    const onLeave = () => {
      hoverRef.current = false;
      targetMouse.current = { x: -9999, y: -9999 };
    };

    const onScroll = () => {
      targetScroll.current = window.scrollY || 0;
    };

    resize();
    onScroll();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    // ---------- CONFIG ----------
    const speed = 0.34;

    const U = 220;
    const V = 72;
    const dotBase = 1.15;

    const sheetLen = 7.4;
    const sheetWid = 1.65;
    const sheetY0 = -0.02;

    const camZ = 2.6;
    const fov = 1.32;

    const twistA = 1.75;
    const twistB = 1.0;
    const rollA = 0.44;
    const bendA = 0.28;

    const disperseRadiusPx = 360;
    const disperseStrength = 56;
    const jitterStrength = 8;

    const xScale = 0.43;
    const yScale = 0.39;

    // object placement
    const objectScale = 0.78;
    const objectX = 0.28;
    const objectY = 0.02;
    const objectZ = 0.0;
    const morphCycleSec = 5.4;

    const project = (x: number, y: number, z: number, w: number, h: number) => {
      const inv = fov / (camZ - z);
      return {
        x: w * 0.5 + x * inv * w * xScale,
        y: h * 0.47 + y * inv * h * yScale,
        s: inv,
      };
    };

    const getMorphedShape = (timeSec: number) => {
      const cycle = timeSec / morphCycleSec;
      const idx = Math.floor(cycle) % shapes.length;
      const next = (idx + 1) % shapes.length;
      const rawT = cycle - Math.floor(cycle);
      const easedT = smoothstep(0, 1, rawT);
      return morphShapes(shapes[idx], shapes[next], easedT);
    };

    const drawWireframe = (
      shape: Shape3,
      w: number,
      h: number,
      timeSec: number,
      glowBoost: number
    ) => {
      const projected = shape.points.map((p, i) => {
        const sway =
          0.025 * Math.sin(timeSec * 1.15 + i * 0.12) +
          0.018 * Math.cos(timeSec * 0.9 + i * 0.07);

        const px = p.x * objectScale + objectX;
        const py = p.y * objectScale + objectY + sway * 0.12;
        const pz = p.z * objectScale + objectZ;

        return project(px, py, pz, w, h);
      });

      // glow pass
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let pass = 0; pass < 2; pass++) {
        ctx.beginPath();
        for (const [aIdx, bIdx] of shape.edges) {
          const a = projected[aIdx];
          const b = projected[bIdx];
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }

        if (pass === 0) {
          ctx.strokeStyle = `rgba(255,255,255,${0.08 + glowBoost * 0.08})`;
          ctx.lineWidth = 6;
          ctx.shadowBlur = 24;
          ctx.shadowColor = "rgba(130,200,255,0.28)";
        } else {
          ctx.strokeStyle = `rgba(255,255,255,${0.42 + glowBoost * 0.18})`;
          ctx.lineWidth = 1.2;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
      }

      // internal ribs
      ctx.beginPath();
      const ribs = 18;
      for (let i = 0; i < ribs; i++) {
        const a = projected[Math.floor((i / ribs) * projected.length)];
        const b = projected[Math.floor((((i / ribs) + 0.5) % 1) * projected.length)];
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
      ctx.strokeStyle = `rgba(255,255,255,${0.07 + glowBoost * 0.05})`;
      ctx.lineWidth = 0.7;
      ctx.stroke();

      ctx.restore();
    };

    const draw = (tMs: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      smoothMouse.current = {
        x: lerp(smoothMouse.current.x, targetMouse.current.x, 0.6),
        y: lerp(smoothMouse.current.y, targetMouse.current.y, 0.6),
      };
      smoothScroll.current = lerp(smoothScroll.current, targetScroll.current, 0.08);

      const t = tMs * 0.001;
      const flowT = t * speed;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);

      // subtle background glow
      const bg = ctx.createRadialGradient(
        w * 0.58,
        h * 0.5,
        0,
        w * 0.58,
        h * 0.5,
        Math.max(w, h) * 0.8
      );
      bg.addColorStop(0, "rgba(255,255,255,0.04)");
      bg.addColorStop(0.45, "rgba(60,120,255,0.03)");
      bg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const mx = smoothMouse.current.x;
      const my = smoothMouse.current.y;

      const scroll01 = clamp(smoothScroll.current / 900, 0, 1);
      const sheetY = sheetY0 + scroll01 * 0.04;

      const morphed = getMorphedShape(t);

      const shapeSegmentsWorld: Segment3[] = morphed.edges.map(([ia, ib]) => {
        const a = morphed.points[ia];
        const b = morphed.points[ib];
        return [
          {
            x: a.x * objectScale + objectX,
            y: a.y * objectScale + objectY,
            z: a.z * objectScale + objectZ,
          },
          {
            x: b.x * objectScale + objectX,
            y: b.y * objectScale + objectY,
            z: b.z * objectScale + objectZ,
          },
        ];
      });

      const shapeSegmentsScreen = shapeSegmentsWorld.map(([a, b]) => [
        project(a.x, a.y, a.z, w, h),
        project(b.x, b.y, b.z, w, h),
      ]);

      type Dot = { x: number; y: number; r: number; c: string; z: number };
      const dots: Dot[] = [];

      for (let layer = 0; layer < 2; layer++) {
        const layerPhase = layer === 0 ? 0 : 1.3;
        const layerAlpha = layer === 0 ? 1.0 : 0.26;
        const layerDotScale = layer === 0 ? 1.0 : 0.84;
        const layerJitterScale = layer === 0 ? 1.0 : 0.6;

        for (let iu = 0; iu < U; iu++) {
          const u = iu / (U - 1);
          const x = (u - 0.5) * sheetLen;

          const travel = u * 3.15 - flowT * 1.48 + layerPhase;

          const bend = bendA * Math.sin(travel * 0.72);
          const roll = rollA * Math.sin(flowT * 0.56 + layerPhase * 0.34);
          const twist =
            twistA * Math.sin(travel * 0.88) +
            twistB * Math.sin(travel * 1.76 + 0.92);

          for (let iv = 0; iv < V; iv++) {
            const v = iv / (V - 1);
            const across = (v - 0.5) * sheetWid;

            let worldX = x;
            let worldY = sheetY + bend + across * Math.cos(twist + roll);
            let worldZ = across * Math.sin(twist + roll);

            worldZ += 0.072 * Math.sin(travel * 3.12 + v * 2.35);

            // object influence field
            let minDist2d = Infinity;
            let nearestSegIndex = -1;

            const preProj = project(worldX, worldY, worldZ, w, h);

            for (let si = 0; si < shapeSegmentsScreen.length; si++) {
              const [a, b] = shapeSegmentsScreen[si];
              const d = distToSegment2(preProj.x, preProj.y, a.x, a.y, b.x, b.y);
              if (d < minDist2d) {
                minDist2d = d;
                nearestSegIndex = si;
              }
            }

            const objR = 112;
            const objField = clamp(1 - minDist2d / objR, 0, 1);

            if (objField > 0 && nearestSegIndex >= 0) {
              const [a, b] = shapeSegmentsWorld[nearestSegIndex];
              const segMidY = (a.y + b.y) * 0.5;
              const segMidZ = (a.z + b.z) * 0.5;

              // flow wraps around object and accelerates visually
              const side = across >= 0 ? 1 : -1;
              worldY += side * objField * objField * 0.12;
              worldZ += (worldZ - segMidZ) * objField * 0.28 + side * objField * 0.08;
              worldX += objField * 0.045;
              worldY += (worldY - segMidY) * objField * 0.05;
            }

            const p = project(worldX, worldY, worldZ, w, h);

            let sx = p.x;
            let sy = p.y;

            let heat = objField * 0.3;

            if (hoverRef.current) {
              const dx = sx - mx;
              const dy = sy - my;
              const dist = Math.hypot(dx, dy);
              const R = disperseRadiusPx;

              if (dist < R) {
                const fall = 1 - dist / R;
                heat += fall * 0.55;

                const ux = dist > 1e-6 ? dx / dist : 0;
                const uy = dist > 1e-6 ? dy / dist : 0;

                const push = fall * fall * disperseStrength * (layer === 0 ? 1.0 : 0.5);
                sx += ux * push;
                sy += uy * push;

                const n1 = Math.sin(u * 97.3 + v * 41.7 + flowT * 2.25 + layerPhase);
                const n2 = Math.cos(u * 53.1 - v * 88.9 - flowT * 2.0 + layerPhase);
                const jit = fall * jitterStrength * layerJitterScale;
                sx += n1 * jit;
                sy += n2 * jit;
              }
            }

            const depth01 = clamp((worldZ + 0.95) / 1.12, 0, 1);
            const thermal01 = clamp(
              depth01 * 0.8 + u * 0.13 + heat * 0.42 + objField * 0.18,
              0,
              1
            );

            const r = clamp(
              dotBase * layerDotScale + p.s * (0.8 + depth01 * 1.18) * layerDotScale,
              0.8,
              objField > 0.12 ? 3.25 : 2.9
            );

            const a = clamp(
              (0.1 + depth01 * 0.62 + objField * 0.18) * layerAlpha,
              0.05,
              0.96
            );

            dots.push({
              x: sx,
              y: sy,
              r,
              c: thermal(thermal01, a),
              z: worldZ + (layer === 0 ? 0 : -0.24),
            });
          }
        }
      }

      dots.sort((a, b) => a.z - b.z);

      // faint stream trails
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < 44; i++) {
        const yy = h * (0.31 + (i / 44) * 0.4);
        const alpha = 0.018 * (1 - Math.abs(i / 44 - 0.5) * 1.2);
        ctx.beginPath();
        ctx.moveTo(0, yy + Math.sin(t * 0.7 + i * 0.35) * 6);
        ctx.bezierCurveTo(
          w * 0.26,
          yy - 20 + Math.sin(t * 0.85 + i * 0.2) * 9,
          w * 0.56,
          yy + 16 + Math.cos(t * 0.92 + i * 0.25) * 12,
          w,
          yy + Math.sin(t * 0.5 + i * 0.17) * 8
        );
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      ctx.restore();

      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.c;
        ctx.fill();
      }

      // wireframe object on top
      drawWireframe(morphed, w, h, t, hoverRef.current ? 0.7 : 0.0);

      // central glow where the object sits
      const objGlow = ctx.createRadialGradient(
        w * 0.61,
        h * 0.53,
        0,
        w * 0.61,
        h * 0.53,
        w * 0.18
      );
      objGlow.addColorStop(0, "rgba(255,255,255,0.07)");
      objGlow.addColorStop(0.25, "rgba(80,160,255,0.05)");
      objGlow.addColorStop(0.6, "rgba(0,255,170,0.03)");
      objGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = objGlow;
      ctx.fillRect(0, 0, w, h);

      // top readability fade
      const topFade = ctx.createLinearGradient(0, 0, 0, h * 0.24);
      topFade.addColorStop(0, "rgba(0,0,0,0.62)");
      topFade.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, w, h * 0.24);

      // left readability fade for copy
      const leftFade = ctx.createLinearGradient(0, 0, w * 0.34, 0);
      leftFade.addColorStop(0, "rgba(0,0,0,0.58)");
      leftFade.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = leftFade;
      ctx.fillRect(0, 0, w * 0.36, h * 0.5);

      // bottom fade
      const bottomFade = ctx.createLinearGradient(0, h * 0.58, 0, h);
      bottomFade.addColorStop(0, "rgba(0,0,0,0)");
      bottomFade.addColorStop(1, "rgba(0,0,0,0.8)");
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-auto" />;
}