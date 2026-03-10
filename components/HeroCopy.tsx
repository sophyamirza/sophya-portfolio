"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function HeroCopy() {
  const ref = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);

  // parallax
  const target = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const [style, setStyle] = useState<{ transform: string }>({
    transform: "translate3d(0px,0px,0)",
  });

  // typewriter
  const FULL =
    "I design, build, and test hardware at the extremes: from near absolute zero cryogenic systems to some of the hottest engines in aerospace.";
  const [typed, setTyped] = useState("");
  const [cursorOn, setCursorOn] = useState(true);

  // -------- TUNABLES ----------
  const START_DELAY_MS = 520; // wait for name to appear
  const TYPE_MS = 9; // ✅ typing speed (lower=faster). Try 10, 12, 14, 18
  // ----------------------------

  // parallax loop
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const nx = (e.clientX / w - 0.5) * 2; // -1..1
      const ny = (e.clientY / h - 0.5) * 2;
      target.current = { x: nx, y: ny };
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      smooth.current.x += (target.current.x - smooth.current.x) * 0.08;
      smooth.current.y += (target.current.y - smooth.current.y) * 0.08;

      const dx = smooth.current.x * 10;
      const dy = smooth.current.y * 6;

      setStyle({ transform: `translate3d(${dx}px, ${dy}px, 0)` });
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // typewriter (with proper cleanup)
  useEffect(() => {
    let i = 0;
    let interval: number | null = null;

    const startDelay = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i++;
        setTyped(FULL.slice(0, i));
        if (i >= FULL.length && interval) {
          window.clearInterval(interval);
          interval = null;
        }
      }, TYPE_MS);
    }, START_DELAY_MS);

    // optional: let user skip typing by click/press
    const skip = () => {
      setTyped(FULL);
      if (interval) {
        window.clearInterval(interval);
        interval = null;
      }
      window.clearTimeout(startDelay);
    };

    window.addEventListener("pointerdown", skip, { passive: true });
    window.addEventListener("keydown", skip);

    return () => {
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.clearTimeout(startDelay);
      if (interval) window.clearInterval(interval);
    };
  }, []);

  // blinking cursor
  useEffect(() => {
    const blink = window.setInterval(() => setCursorOn((v) => !v), 520);
    return () => window.clearInterval(blink);
  }, []);

  return (
    <div ref={ref} style={style}>
      <motion.div
        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="text-xs tracking-[0.35em] text-white/70">HEY, I'M</div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
        className="mt-4 text-5xl md:text-7xl leading-[0.95] italic tracking-tight text-white/90"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        SOPHYA
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.16 }}
        className="mt-6 max-w-2xl text-white/75 text-lg"
      >
        <span>{typed}</span>
        <span className="ml-1 inline-block w-[0.6ch]">
          <span className={cursorOn ? "opacity-100" : "opacity-0"}>|</span>
        </span>
      </motion.p>
    </div>
  );
}
