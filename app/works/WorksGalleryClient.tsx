"use client";

import Link from "next/link";
import React, { useMemo, useRef, useState } from "react";
import {
  ProjectRowFollower,
  ProjectRowThumb,
  computeFollowerPos,
} from "./components/ProjectRowHoverPreview";
import type { ProjectListItem } from "./page";

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

function groupByType(projects: ProjectListItem[]) {
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

type ProjectRowProps = {
  project: ProjectListItem;
  activeSlug: string | null;
  setActiveSlug: React.Dispatch<React.SetStateAction<string | null>>;
  onMove: (e: React.MouseEvent) => void;
  pos: { x: number; y: number };
  isSubproject?: boolean;
};

function ProjectRow({
  project,
  activeSlug,
  setActiveSlug,
  onMove,
  pos,
  isSubproject = false,
}: ProjectRowProps) {
  const show = activeSlug === project.slug;

  return (
    <div
      className={
        isSubproject
          ? "ml-8 border-l border-white/10 pl-6 md:ml-14 md:pl-8"
          : ""
      }
    >
      <Link
        href={`/works/${project.slug}`}
        className="group block"
        onMouseEnter={() => setActiveSlug(project.slug)}
        onMouseLeave={() =>
          setActiveSlug((s) => (s === project.slug ? null : s))
        }
        onMouseMove={onMove}
      >
        <div className="grid items-start gap-12 md:grid-cols-[1fr_auto]">
          <div>
            {isSubproject ? (
              <div className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/35">
                Subsystem
              </div>
            ) : null}

            <div
              className={
                isSubproject
                  ? "text-3xl leading-tight tracking-tight text-white/90 md:text-4xl"
                  : "text-5xl leading-tight tracking-tight"
              }
            >
              {project.title}
            </div>

            <div
              className={
                isSubproject
                  ? "mt-2 text-sm text-white/50"
                  : "mt-3 text-white/60"
              }
            >
              {project.subtitle}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.slice(0, 5).map((t) => (
                <span
                  key={t}
                  className={
                    isSubproject
                      ? "rounded-full border border-white/10 px-3 py-1 text-[10px] text-white/45"
                      : "rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/60"
                  }
                >
                  {t}
                </span>
              ))}
            </div>

            <div
              className={
                isSubproject
                  ? "mt-4 h-px w-0 opacity-70 transition-all duration-300 group-hover:w-[160px]"
                  : "mt-4 h-px w-0 transition-all duration-300 group-hover:w-[200px]"
              }
              style={{ background: THERMAL_GRADIENT }}
            />
          </div>

          <div
            className={isSubproject ? "origin-top-right scale-90 pt-2" : "pt-2"}
          >
            <ProjectRowThumb
              title={project.title}
              preview={project.preview}
              fallbackCover={project.cover}
            />
          </div>
        </div>

        <ProjectRowFollower
          title={project.title}
          preview={project.preview}
          fallbackCover={project.cover}
          show={show}
          pos={pos}
        />
      </Link>
    </div>
  );
}

export default function WorksGalleryClient({
  projects,
}: {
  projects: ProjectListItem[];
}) {
  const sections = useMemo(() => groupByType(projects), [projects]);

  const [activeSlug, setActiveSlug] = useState<string | null>(null);
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

  return (
    <main className="min-h-screen bg-black text-white">
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
                {section.projects.map((project) => (
                  <div key={project.slug} className="space-y-6">
                    <ProjectRow
                      project={project}
                      activeSlug={activeSlug}
                      setActiveSlug={setActiveSlug}
                      onMove={onMove}
                      pos={pos}
                    />

                    {!!project.subprojects?.length && (
                      <div className="space-y-6">
                        {project.subprojects.map((subproject) => (
                          <ProjectRow
                            key={subproject.slug}
                            project={subproject}
                            activeSlug={activeSlug}
                            setActiveSlug={setActiveSlug}
                            onMove={onMove}
                            pos={pos}
                            isSubproject
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
