"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { PROJECTS } from "./projects";

type HoverState =
  | {
      on: true;
      x: number;
      y: number;
      slug: string;
      title: string;
      subtitle: string;
      cover?: string;
      tags: string[];
      yearLabel: string;
    }
  | { on: false };

function PlaceholderPreview({ title }: { title: string }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]" />
      <div className="absolute inset-0 bg-[radial-gradient(650px_280px_at_25%_20%,rgba(255,59,31,0.22),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(760px_360px_at_85%_25%,rgba(255,255,255,0.10),transparent_58%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/18 to-transparent" />
      <div className="absolute inset-x-0 bottom-5 px-5">
        <div className="text-[28px] leading-none tracking-tight text-white/14 select-none">
          {title}
        </div>
      </div>
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:3px_3px]" />
    </div>
  );
}

function groupForList(projects: typeof PROJECTS) {
  // Sort by year desc (year is numeric string like "2026", "2025", "2024", "2021")
  // Keep within-year in declared order.
  return [...projects].sort((a, b) => Number(b.year) - Number(a.year));
}

export default function WorksPage() {
  const items = useMemo(() => groupForList(PROJECTS), []);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [hover, setHover] = useState<HoverState>({ on: false });

  const onMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const r = containerRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    setHover((prev) => (prev.on ? { ...prev, x, y } : prev));
  };

  const onEnter = (
    e: React.MouseEvent,
    p: (typeof PROJECTS)[number]
  ) => {
    if (!containerRef.current) return;

    const r = containerRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    setHover({
      on: true,
      x,
      y,
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle,
      cover: (p as any).cover, // optional
      tags: p.tags ?? [],
      yearLabel: (p as any).yearLabel ?? p.year,
    });
  };

  const onLeave = () => setHover({ on: false });

  return (
    <main className="min-h-screen bg-black text-white">
      {/* haze background like reference */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_20%_10%,rgba(255,59,31,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_85%_20%,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.55)_62%,rgba(0,0,0,0.92)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-10">
        <div className="text-xs tracking-[0.35em] text-white/55">
          RECENT WORKS
        </div>

        {/* Use your serif font from layout; keep big title like screenshot */}
        <h1 className="mt-6 text-6xl md:text-7xl tracking-tight">
          The Engineering Gallery
          <span className="ml-2 text-[rgba(255,59,31,0.85)]">•</span>
        </h1>
      </div>

      <section
        ref={containerRef}
        className="relative mx-auto max-w-6xl px-6 pb-28"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {/* list */}
        <div className="mt-10 border-t border-white/10">
          {items.map((p) => (
            <Link
              key={p.slug}
              href={`/works/${p.slug}`}
              className="group block"
              onMouseEnter={(e) => onEnter(e, p)}
              onMouseLeave={onLeave}
            >
              <div className="grid grid-cols-[78px_1fr] md:grid-cols-[90px_1fr_auto] gap-6 md:gap-10 items-center py-10 border-b border-white/10">
                {/* year */}
                <div className="text-xs tracking-[0.35em] text-white/45">
                  {(p as any).yearLabel ?? p.year}
                </div>

                {/* title */}
                <div className="min-w-0">
                  <div className="text-5xl md:text-6xl leading-[0.98] tracking-tight text-white/95 transition-colors duration-200 group-hover:text-white">
                    {p.title}
                  </div>
                  <div className="mt-3 text-white/55">
                    {p.subtitle}
                  </div>
                </div>

                {/* tags */}
                <div className="hidden md:flex flex-wrap justify-end gap-2 max-w-[520px]">
                  {(p.tags ?? []).slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/12 bg-white/[0.02] px-3 py-1 text-[11px] tracking-wide text-white/55"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* hover preview that follows cursor */}
        {hover.on && (
          <div
            className="pointer-events-none absolute z-50"
            style={{
              // offset so it sits nicely by the cursor
              transform: `translate3d(${Math.round(hover.x + 22)}px, ${Math.round(
                hover.y - 140
              )}px, 0)`,
            }}
          >
            <div className="w-[340px] h-[220px] rounded-2xl overflow-hidden border border-white/15 bg-black/60 backdrop-blur shadow-[0_25px_80px_rgba(0,0,0,0.7)]">
              <div className="relative h-full w-full">
                {/* image if available; otherwise placeholder */}
                {hover.cover ? (
                  <Image
                    src={hover.cover}
                    alt={hover.title}
                    fill
                    className="object-cover"
                    sizes="340px"
                    priority
                  />
                ) : (
                  <PlaceholderPreview title={hover.title} />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

                <div className="absolute left-4 right-4 bottom-4">
                  <div className="text-[11px] tracking-[0.22em] uppercase text-[rgba(255,59,31,0.70)]">
                    {(hover.tags?.[0] ?? "PROJECT").toString()}
                  </div>
                  <div className="mt-1 text-lg text-white/90 leading-snug">
                    {hover.title}
                  </div>
                  <div className="mt-1 text-white/65 text-sm">
                    {hover.subtitle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* mobile note */}
        <div className="mt-10 text-xs text-white/40 md:hidden">
          Tip: hover previews are desktop-only. Tap a project to open it.
        </div>
      </section>
    </main>
  );
}