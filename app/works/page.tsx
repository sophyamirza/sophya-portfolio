"use client";

import Link from "next/link";
import { useMemo } from "react";
import { PROJECTS } from "./projects";

const THERMAL_GRADIENT =
  "linear-gradient(90deg,#3b82f6 0%,#06b6d4 18%,#22c55e 40%,#eab308 62%,#f97316 82%,#ef4444 100%)";

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

export default function WorksPage() {
  const sections = useMemo(() => groupByType(PROJECTS), []);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-32">
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
                  <Link key={p.slug} href={`/works/${p.slug}`} className="group block">
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
      </section>
    </main>
  );
}