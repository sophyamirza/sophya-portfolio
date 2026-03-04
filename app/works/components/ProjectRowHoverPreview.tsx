// app/works/components/ProjectRowHoverPreview.tsx

"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";

type Preview = {
  staticSrc?: string;
  hoverSrc?: string;
  alt?: string;
};

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

export default function ProjectRowHoverPreview({
  title,
  preview,
  fallbackCover,
  fallbackGallery,
}: {
  title: string;
  preview?: Preview;
  fallbackCover?: string;
  fallbackGallery?: string[];
}) {
  const staticSrc = preview?.staticSrc ?? fallbackCover ?? fallbackGallery?.[0];
  const hoverSrc =
    preview?.hoverSrc ??
    fallbackGallery?.[1] ??
    fallbackGallery?.[0] ??
    fallbackCover;

  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const raf = useRef<number | null>(null);
  const last = useRef({ x: 0, y: 0 });

  const enabled = Boolean(staticSrc && hoverSrc);

  const onMove = (e: React.MouseEvent) => {
    if (!enabled) return;

    last.current = { x: e.clientX, y: e.clientY };

    if (raf.current) return;
    raf.current = window.requestAnimationFrame(() => {
      raf.current = null;

      const pad = 18;
      const w = 320;
      const h = 220;

      const x = clamp(last.current.x + 22, pad, window.innerWidth - w - pad);
      const y = clamp(last.current.y + 22, pad, window.innerHeight - h - pad);

      setPos({ x, y });
    });
  };

  const hoverAlt = preview?.alt ?? `${title} hover preview`;
  const staticAlt = preview?.alt ?? `${title} preview`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
    >
      {/* right-side static image */}
      {staticSrc ? (
        <div className="relative h-[92px] w-[150px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <Image
            src={staticSrc}
            alt={staticAlt}
            fill
            className="object-cover opacity-90 transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="150px"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70" />
        </div>
      ) : (
        <div className="h-[92px] w-[150px] rounded-2xl border border-white/10 bg-white/[0.02]" />
      )}

      {/* floating follow-cursor image */}
      <AnimatePresence>
        {enabled && hovered ? (
          <motion.div
            className="pointer-events-none fixed z-[80]"
            style={{ left: pos.x, top: pos.y }}
            initial={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
            transition={{ duration: 0.16 }}
          >
            <div className="relative h-[220px] w-[340px] overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <Image
                src={hoverSrc!}
                alt={hoverAlt}
                fill
                className="object-cover opacity-95"
                sizes="340px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-[11px] tracking-[0.28em] uppercase text-white/70">
                {title}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}