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
    }
  | { on: false };

const THERMAL_GRADIENT =
  "linear-gradient(90deg,#3b82f6 0%,#06b6d4 18%,#22c55e 40%,#eab308 62%,#f97316 82%,#ef4444 100%)";

function PlaceholderPreview({ title }: { title: string }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-[radial-gradient(700px_300px_at_20%_20%,rgba(59,130,246,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-4 px-4 text-white/10 text-2xl select-none">
        {title}
      </div>
    </div>
  );
}

function groupByYear(projects: typeof PROJECTS) {
  const sorted = [...projects].sort((a, b) => Number(b.year) - Number(a.year));
  return sorted.reduce<Record<string, typeof PROJECTS>>((acc, p) => {
    acc[p.yearLabel] ||= [];
    acc[p.yearLabel].push(p);
    return acc;
  }, {});
}

export default function WorksPage() {
  const grouped = useMemo(() => groupByYear(PROJECTS), []);
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState<HoverState>({ on: false });

  const onMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !hover.on) return;
    const r = containerRef.current.getBoundingClientRect();
    setHover((h) => ({ ...h, x: e.clientX - r.left, y: e.clientY - r.top }));
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section
        ref={containerRef}
        onMouseMove={onMove}
        onMouseLeave={() => setHover({ on: false })}
        className="mx-auto max-w-6xl px-6 pt-24 pb-32"
      >
        <h1 className="text-6xl md:text-7xl tracking-tight">
          Engineering Gallery
        </h1>

        {/* YEAR GROUPS */}
        <div className="mt-16 space-y-20">
          {years.map((year) => (
            <div key={year}>
              {/* YEAR DIVIDER */}
              <div className="flex items-center gap-6 mb-10">
                <div
                  className="h-px flex-1 opacity-80"
                  style={{ background: THERMAL_GRADIENT }}
                />
                <div className="text-xs tracking-[0.35em] text-white/60">
                  {year}
                </div>
                <div
                  className="h-px flex-1 opacity-80"
                  style={{ background: THERMAL_GRADIENT }}
                />
              </div>

              {/* PROJECTS */}
              <div className="space-y-12">
                {grouped[year].map((p) => (
                  <Link
                    key={p.slug}
                    href={`/works/${p.slug}`}
                    className="group block"
                    onMouseEnter={(e) => {
                      const r = containerRef.current!.getBoundingClientRect();
                      setHover({
                        on: true,
                        x: e.clientX - r.left,
                        y: e.clientY - r.top,
                        slug: p.slug,
                        title: p.title,
                        subtitle: p.subtitle,
                        cover: p.cover,
                        tags: p.tags,
                      });
                    }}
                  >
                    <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
                      <div>
                        <div className="text-5xl leading-tight tracking-tight">
                          {p.title}
                        </div>
                        <div className="mt-3 text-white/60">{p.subtitle}</div>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {p.tags.slice(0, 5).map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/60"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* hover underline */}
                        <div
                          className="mt-4 h-px w-0 group-hover:w-[200px] transition-all duration-300"
                          style={{ background: THERMAL_GRADIENT }}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* HOVER PREVIEW */}
        {hover.on && (
          <div
            className="pointer-events-none absolute z-50"
            style={{
              transform: `translate3d(${hover.x + 20}px, ${hover.y - 140}px,0)`,
            }}
          >
            <div className="w-[320px] h-[200px] rounded-xl overflow-hidden border border-white/15 bg-black/70">
              {hover.cover ? (
                <Image
                  src={hover.cover}
                  alt=""
                  fill
                  className="object-cover"
                />
              ) : (
                <PlaceholderPreview title={hover.title} />
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}