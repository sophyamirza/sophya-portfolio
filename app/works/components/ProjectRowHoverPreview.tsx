// app/works/components/ProjectRowHoverPreview.tsx

"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type Preview = {
  staticSrc?: string;
  hoverSrc?: string;
  alt?: string;
};

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

/**
 * Right-side static thumbnail.
 * (No hover logic here anymore)
 */
export function ProjectRowThumb({
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
  const staticAlt = preview?.alt ?? `${title} preview`;

  return staticSrc ? (
    <div className="relative h-[120px] w-[200px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <Image
        src={staticSrc}
        alt={staticAlt}
        fill
        className="object-cover opacity-90 transition-transform duration-300 group-hover:scale-[1.02]"
        sizes="200px"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70" />
    </div>
  ) : (
    <div className="h-[92px] w-[150px] rounded-2xl border border-white/10 bg-white/[0.02]" />
  );
}

/**
 * Cursor-follow hover preview.
 * The parent row controls `show` + `pos`.
 */
export function ProjectRowFollower({
  title,
  preview,
  fallbackCover,
  fallbackGallery,
  show,
  pos,
}: {
  title: string;
  preview?: Preview;
  fallbackCover?: string;
  fallbackGallery?: string[];
  show: boolean;
  pos: { x: number; y: number };
}) {
  const hoverSrc =
    preview?.hoverSrc ??
    fallbackGallery?.[1] ??
    fallbackGallery?.[0] ??
    fallbackCover;

  const enabled = Boolean(hoverSrc);
  const hoverAlt = preview?.alt ?? `${title} hover preview`;

  return (
    <AnimatePresence>
      {enabled && show ? (
        <motion.div
          className="pointer-events-none fixed z-[80]"
          style={{ left: pos.x, top: pos.y }}
          initial={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
          transition={{ duration: 0.16 }}
        >
          <div className="relative h-[260px] w-[420px] overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <Image
              src={hoverSrc!}
              alt={hoverAlt}
              fill
              className="object-cover opacity-95"
              sizes="420px"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-[11px] tracking-[0.28em] uppercase text-white/70">
              {title}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/**
 * Helper for row mouse positioning (optional export)
 */
export function computeFollowerPos(clientX: number, clientY: number) {
  const pad = 18;
  const w = 420;
  const h = 260;

  const x = clamp(clientX + 22, pad, window.innerWidth - w - pad);
  const y = clamp(clientY + 22, pad, window.innerHeight - h - pad);

  return { x, y };
}