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

/**
 * ProjectType (internal) -> display label (what you want shown on Works page)
 * Keep keys in sync with ProjectType union in projects.ts
 */
const SECTION_LABELS: Record<string, string> = {
  "Propulsion & Fluids": "Propulsion, GSE, Fluids",
  "Test Systems & Instrumentation": "Test Fixtures, Cryogenics & Instrumentation",
  "Analysis & Simulation": "Analysis & Sims",
  "Product Design & Mechanisms": "Product Design & Dev",
  "Robotics & Autonomy": "Robotics, UAVs & Autonomy",
  "Power & Energy Systems": "Power & Energy Systems",
};

/** Control the order of sections on the Works page */
const SECTION_ORDER = [
  "Propulsion & Fluids",
  "Test Systems & Instrumentation",
  "Analysis & Simulation",
  "Product Design & Mechanisms",
  "Robotics & Autonomy",
  "Power & Energy Systems",
] as const;

function groupByType(projects: typeof PROJECTS) {
  return SECTION_ORDER.map((type) => ({
    type,
    title: SECTION_LABELS[type] ?? type,
    projects: projects.filter((p) => p.projectType === type),
  })).filter((g) => g.projects.length > 0);
}

function CTAButton({
  href,
  label,
  isExternal = true,
}: {
  href: string;
  label: string;
  isExternal?: boolean;
}) {
  const common =
    "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm text-white/80 backdrop-blur hover:border-white/35 hover:text-white transition";

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={common}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={common}>
      {label}
    </Link>
  );
}

export default function WorksPage() {
  const sections = useMemo(() => groupByType(PROJECTS), []);

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
        className="relative mx-auto max-w-6xl px-6 pt-24 pb-24"
      >
        <h1 className="text-6xl md:text-7xl tracking-tight">
          Engineering Gallery
        </h1>

        {/* SECTION GROUPS */}
        <div className="mt-16 space-y-20">
          {sections.map((section) => (
            <div key={section.type}>
              {/* SECTION DIVIDER */}
              <div className="flex items-center gap-6 mb-10">
                <div
                  className="h-px flex-1 opacity-80"
                  style={{ background: THERMAL_GRADIENT }}
                />
                <div className="text-xs tracking-[0.35em] text-white/60">
                  {section.title}
                </div>
                <div
                  className="h-px flex-1 opacity-80"
                  style={{ background: THERMAL_GRADIENT }}
                />
              </div>

              {/* PROJECTS */}
              <div className="space-y-12">
                {section.projects.map((p) => (
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

        {/* ✅ END CAP / FOOTER NAV — prevents “glitchy” end-of-page */}
        <div className="mt-24">
          <div className="flex items-center gap-6 mb-10">
            <div
              className="h-px flex-1 opacity-70"
              style={{ background: THERMAL_GRADIENT }}
            />
            <div className="text-xs tracking-[0.35em] text-white/50">
              CONNECT
            </div>
            <div
              className="h-px flex-1 opacity-70"
              style={{ background: THERMAL_GRADIENT }}
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="text-white/75 text-lg md:text-xl tracking-tight">
              Want to talk builds, tests, or weird hardware problems?
            </div>
            <div className="mt-2 text-white/55 text-sm">
              Reach out — I read everything.
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <CTAButton
                href="https://www.linkedin.com/in/sophya-mirza-4947981b7/"
                label="LinkedIn"
              />
              <CTAButton href="mailto:sophyamirza@gmail.com" label="Email" />
              <CTAButton
                href="https://sophyamirza.substack.com/"
                label="Substack"
              />
              <CTAButton href="/contact" label="Contact Page" isExternal={false} />
            </div>

            {/* extra bottom padding so hover preview never clips */}
            <div className="mt-10 h-10" />
          </div>

          {/* final spacer */}
          <div className="h-16" />
        </div>

        {/* HOVER PREVIEW */}
        {hover.on && (
          <div
            className="pointer-events-none absolute z-50"
            style={{
              transform: `translate3d(${hover.x + 20}px, ${
                hover.y - 140
              }px,0)`,
            }}
          >
            <div className="w-[320px] h-[200px] rounded-xl overflow-hidden border border-white/15 bg-black/70">
              {hover.cover ? (
                <Image src={hover.cover} alt="" fill className="object-cover" />
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