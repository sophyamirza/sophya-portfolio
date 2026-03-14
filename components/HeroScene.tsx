"use client";

import { useEffect, useRef } from "react";

type Vec2 = { x: number; y: number };

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function thermal(v01: number, a: number) {
  const t = clamp(v01, 0, 1);
  const h = lerp(240, 0, t); // deep blue -> red
  const s = 95;
  const l = lerp(38, 60, t);
  return `hsla(${h} ${s}% ${l}% / ${a})`;
}

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // pointer smoothing (for easing back)
  const targetMouse = useRef<Vec2>({ x: -9999, y: -9999 });
  const smoothMouse = useRef<Vec2>({ x: -9999, y: -9999 });
  const hoverRef = useRef(false);

  // scroll smoothing (for cinematic drift)
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

    // -------- CONFIG ----------
    const speed = 0.38;

    // dots
    const U = 210;
    const V = 70;
    const dotBase = 1.25;

    // Overscan band so it flows off-screen
    const sheetLen = 7.2;
    const sheetWid = 1.55;

    // base placement (we’ll add scroll drift)
    const sheetY0 = -0.06;

    // camera
    const camZ = 2.55;
    const fov = 1.32;

    // bend/twist
    const twistA = 1.85;
    const twistB = 1.05;
    const rollA = 0.5;
    const bendA = 0.34;

    // dispersion (repulsion)
    const disperseRadiusPx = 360;
    const disperseStrength = 52;
    const jitterStrength = 10;

    // projection scaling (off-screen reach)
    const xScale = 0.42; // increase to push farther off-screen
    const yScale = 0.4;

    const project = (x: number, y: number, z: number, w: number, h: number) => {
      const inv = fov / (camZ - z);
      return {
        x: w * 0.5 + x * inv * w * xScale,
        y: h * 0.46 + y * inv * h * yScale,
        s: inv,
      };
    };

    const draw = (tMs: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // smooth mouse + scroll (ease back)
      smoothMouse.current = {
        x: lerp(smoothMouse.current.x, targetMouse.current.x, 0.6),
        y: lerp(smoothMouse.current.y, targetMouse.current.y, 0.6),
      };
      smoothScroll.current = lerp(smoothScroll.current, targetScroll.current, 0.08);

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);

      // vignette
      const vg = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, Math.max(w, h));
      vg.addColorStop(0, "rgba(255,255,255,0.05)");
      vg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      const t = (tMs * 0.001) * speed;

      const mx = smoothMouse.current.x;
      const my = smoothMouse.current.y;

      // scroll drift: subtle vertical shift (capped)
      const scroll01 = clamp(smoothScroll.current / 900, 0, 1);
      const sheetY = sheetY0 + scroll01 * 0.06;

      type Dot = { x: number; y: number; r: number; c: string; z: number };
      const dots: Dot[] = [];

      // 2 layers for depth
      for (let layer = 0; layer < 2; layer++) {
        const layerPhase = layer === 0 ? 0 : 1.35;
        const layerAlpha = layer === 0 ? 1.0 : 0.28;
        const layerDotScale = layer === 0 ? 1.0 : 0.85;
        const layerJitterScale = layer === 0 ? 1.0 : 0.65;

        for (let iu = 0; iu < U; iu++) {
          const u = iu / (U - 1);
          const x = (u - 0.5) * sheetLen;

          // horizontal travel
          const travel = u * 3.1 - t * 1.55 + layerPhase;

          const bend = bendA * Math.sin(travel * 0.75);
          const roll = rollA * Math.sin(t * 0.6 + layerPhase * 0.3);
          const twist =
            twistA * Math.sin(travel * 0.9) +
            twistB * Math.sin(travel * 1.8 + 0.9);

          for (let iv = 0; iv < V; iv++) {
            const v = iv / (V - 1);
            const across = (v - 0.5) * sheetWid;

            const yBase = sheetY + bend + across * Math.cos(twist + roll);
            let z = across * Math.sin(twist + roll);

            // micro ripples
            z += 0.075 * Math.sin(travel * 3.15 + v * 2.4);

            const p = project(x, yBase, z, w, h);

            let sx = p.x;
            let sy = p.y;

            // dispersion near cursor
            let heat = 0;
            if (hoverRef.current) {
              const dx = sx - mx;
              const dy = sy - my;
              const dist = Math.hypot(dx, dy);
              const R = disperseRadiusPx;

              if (dist < R) {
                const fall = 1 - dist / R;
                heat = fall;

                const ux = dist > 1e-6 ? dx / dist : 0;
                const uy = dist > 1e-6 ? dy / dist : 0;

                // push outward
                const push = fall * fall * disperseStrength * (layer === 0 ? 1.0 : 0.55);
                sx += ux * push;
                sy += uy * push;

                // stable-ish jitter (scatter)
                const n1 = Math.sin(u * 97.3 + v * 41.7 + t * 2.3 + layerPhase);
                const n2 = Math.cos(u * 53.1 - v * 88.9 - t * 2.0 + layerPhase);
                const jit = fall * jitterStrength * layerJitterScale;
                sx += n1 * jit;
                sy += n2 * jit;
              }
            }

            // thermal mapping (full spectrum)
            const depth01 = clamp((z + 0.9) / 1.05, 0, 1);
            const thermal01 = clamp(depth01 * 0.84 + u * 0.14 + heat * 0.34, 0, 1);

            const r = clamp(
              dotBase * layerDotScale + p.s * (0.85 + depth01 * 1.15) * layerDotScale,
              0.8,
              3.0
            );

            const a = clamp((0.12 + depth01 * 0.64) * layerAlpha, 0.06, 0.92);

            dots.push({
              x: sx,
              y: sy,
              r,
              c: thermal(thermal01, a),
              z: z + (layer === 0 ? 0 : -0.25),
            });
          }
        }
      }

      // depth sort
      dots.sort((a, b) => a.z - b.z);

      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.c;
        ctx.fill();
      }

      // readability fades
      const topFade = ctx.createLinearGradient(0, 0, 0, h * 0.22);
      topFade.addColorStop(0, "rgba(0,0,0,0.55)");
      topFade.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, w, h * 0.22);

      const bottomFade = ctx.createLinearGradient(0, h * 0.55, 0, h);
      bottomFade.addColorStop(0, "rgba(0,0,0,0)");
      bottomFade.addColorStop(1, "rgba(0,0,0,0.78)");
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
