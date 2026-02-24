"use client";

import React, { useEffect, useRef } from "react";

type Orb = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number; // alpha
  hue: number;
  tw: number; // twinkle speed
};

export default function StarOrbsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const orbsRef = useRef<Orb[]>([]);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const dprRef = useRef<number>(1);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;

      const { innerWidth: w, innerHeight: h } = window;
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // (re)seed orbs
      const count = Math.round((w * h) / 52000); // scale with viewport
      const orbs: Orb[] = [];

      for (let i = 0; i < count; i++) {
        const r = 12 + Math.random() * 46; // glow size
        const speed = (0.05 + Math.random() * 0.22) * (prefersReduced ? 0.2 : 1);
        const angle = Math.random() * Math.PI * 2;

        orbs.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          a: 0.05 + Math.random() * 0.10,
          hue: 190 + Math.random() * 120, // cyan→green→amber range
          tw: 0.6 + Math.random() * 1.6,
        });
      }

      // add a few “stars” (tiny)
      const stars = Math.round((w * h) / 9000);
      for (let i = 0; i < stars; i++) {
        const r = 0.6 + Math.random() * 1.3;
        orbs.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          vx: (Math.random() - 0.5) * 0.02 * (prefersReduced ? 0.2 : 1),
          vy: (Math.random() - 0.5) * 0.02 * (prefersReduced ? 0.2 : 1),
          a: 0.12 + Math.random() * 0.20,
          hue: 200 + Math.random() * 70,
          tw: 1.4 + Math.random() * 2.6,
        });
      }

      orbsRef.current = orbs;
    };

    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      pointerRef.current = {
        x: e.clientX / w,
        y: e.clientY / h,
      };
    };

    const step = (t: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // clear with slight persistence for glow trails
      ctx.clearRect(0, 0, w, h);

      const px = pointerRef.current.x - 0.5;
      const py = pointerRef.current.y - 0.5;

      for (const o of orbsRef.current) {
        // drift
        o.x += o.vx;
        o.y += o.vy;

        // wrap
        if (o.x < -o.r) o.x = w + o.r;
        if (o.x > w + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = h + o.r;
        if (o.y > h + o.r) o.y = -o.r;

        // parallax (subtle)
        const par = Math.min(o.r / 60, 1) * 10; // bigger glow moves more
        const x = o.x + px * par;
        const y = o.y + py * par;

        // twinkle
        const tw = 0.5 + 0.5 * Math.sin((t / 1000) * o.tw + (o.x + o.y) * 0.01);
        const alpha = o.a * (0.6 + 0.9 * tw);

        // glow gradient
        const g = ctx.createRadialGradient(x, y, 0, x, y, o.r);
        g.addColorStop(0, `hsla(${o.hue}, 95%, 70%, ${alpha})`);
        g.addColorStop(0.35, `hsla(${o.hue}, 90%, 60%, ${alpha * 0.55})`);
        g.addColorStop(1, `hsla(${o.hue}, 90%, 55%, 0)`);

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, o.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });

    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* extra soft vignette so it blends into your haze */}
      <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.75)_100%)]" />
    </div>
  );
}