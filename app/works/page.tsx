"use client";

import Link from "next/link";
import React, { useMemo, useRef, useState } from "react";
import { PROJECTS, type Project } from "./projects";
import {
  ProjectRowFollower,
  ProjectRowThumb,
  computeFollowerPos,
} from "./components/ProjectRowHoverPreview";

const THERMAL_GRADIENT =
  "linear-gradient(90deg,#3b82f6 0%,#06b6d4 18%,#22c55e 40%,#eab308 62%,#f97316 82%,#ef4444 100%)";

const SECTION_LABELS: Record<string, string> = {
  "Propulsion & Fluids": "Propulsion, GSE, Fluids",
  "Test Systems & Instrumentation": "Test Fixtures, Cryogenics & Instrumentation",
  "Analysis & Simulation": "Analysis & Sims",
  "Product Design & Mechanisms": "Product Design & Dev",
  "Robotics & Autonomy": "Robotics, UAVs & Autonomy",
};

const SECTION_ORDER = [
  "Propulsion & Fluids",
  "Test Systems & Instrumentation",
  "Analysis & Simulation",
  "Product Design & Mechanisms",
  "Robotics & Autonomy",
] as const;

type SectionType = (typeof SECTION_ORDER)[number] | "Other";

function groupByType(projects: typeof PROJECTS) {
  const knownTypes = new Set<string>(SECTION_ORDER);

  const known = SECTION_ORDER.map((type) => ({
    type: type as SectionType,
    title: SECTION_LABELS[type] ?? type,
    projects: projects.filter((p) => p.projectType === type),
  })).filter((g) => g.projects.length > 0);

  const unknownProjects = projects.filter((p) => !knownTypes.has(p.projectType));

  if (unknownProjects.length > 0) {
    known.push({
      type: "Other" as SectionType,
      title: "Other",
      projects: unknownProjects,
    });
  }

  return known;
}

export default function WorksPage() {
  const sections = useMemo(() => groupByType(PROJECTS), []);

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const raf = useRef<number | null>(null);
  const last = useRef({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    last.current = { x: e.clientX, y: e.clientY };

    if (raf.current) return;

    raf.current = window.requestAnimationFrame(() => {
      raf.current = null;
      setPos(computeFollowerPos(last.current.x, last.current.y));
    });
  };

  const onEnterProject = (project: Project) => {
    setActiveProject(project);
  };

  const onLeaveProject = () => {
    setActiveProject(null);
  };

  return (
    <main
  className="min-h-screen bg-black text-white"
  onMouseLeave={() => setActiveProject(null)}
>
      <section className="mx-auto max-w-6xl px-6 pb-32 pt-24">
        <h1 className="text-6xl tracking-tight md:text-7xl">
          Engineering Gallery
        </h1>

        <div className="mt-16 space-y-20">
          {sections.map((section) => (
            <div key={section.type}>
              <div className="mb-10 flex items-center gap-6">
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

              <div className="space-y-12">
                {section.projects.map((p) => (
                  <div key={p.slug} className="space-y-6">
                    {/* Main project */}
                    <Link
                      href={`/works/${p.slug}`}
                      className="group block"
                      onMouseEnter={() => onEnterProject(p)}
                      onMouseLeave={onLeaveProject}
                      onMouseMove={onMove}
                    >
                      <div className="grid items-start gap-12 md:grid-cols-[1fr_auto]">
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

                          <div
                            className="mt-4 h-px w-0 transition-all duration-300 group-hover:w-[200px]"
                            style={{ background: THERMAL_GRADIENT }}
                          />
                        </div>

                        <div className="pt-2">
                          <ProjectRowThumb
                            title={p.title}
                            preview={p.preview}
                            fallbackCover={p.cover}
                            fallbackGallery={p.gallery}
                          />
                        </div>
                      </div>
                    </Link>

                    {/* Subprojects */}
                    {p.subprojects?.length ? (
                      <div className="ml-10 space-y-6 md:ml-16">
                        {p.subprojects.map((sp) => (
                          <Link
                            key={sp.slug}
                            href={`/works/${sp.slug}`}
                            className="group block"
                            onMouseEnter={() => onEnterProject(sp)}
                            onMouseLeave={onLeaveProject}
                            onMouseMove={onMove}
                          >
                            <div className="grid items-start gap-12 md:grid-cols-[1fr_auto]">
                              <div>
                                <div className="text-4xl leading-tight tracking-tight text-white/90">
                                  {sp.title}
                                </div>

                                <div className="mt-2 text-sm text-white/50">
                                  {sp.subtitle}
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                  {sp.tags.slice(0, 5).map((t) => (
                                    <span
                                      key={t}
                                      className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-white/50"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>

                                <div
                                  className="mt-4 h-px w-0 opacity-70 transition-all duration-300 group-hover:w-[160px]"
                                  style={{ background: THERMAL_GRADIENT }}
                                />
                              </div>

                              <div className="origin-top-right scale-90 pt-2">
                                <ProjectRowThumb
                                  title={sp.title}
                                  preview={sp.preview}
                                  fallbackCover={sp.cover}
                                  fallbackGallery={sp.gallery}
                                />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProjectRowFollower
        title={activeProject?.title ?? ""}
        preview={activeProject?.preview}
        fallbackCover={activeProject?.cover}
        fallbackGallery={activeProject?.gallery}
        show={Boolean(activeProject)}
        pos={pos}
      />
    </main>
  );
}