// app/works/[slug]/page.tsx

import Link from "next/link";
import Image from "next/image";
import ImageCarousel from "../components/ImageCarousel";
import { PROJECTS, PROJECTS_BY_SLUG, type Project } from "../projects";

const THERMAL_GRADIENT =
  "linear-gradient(90deg,#3b82f6 0%,#06b6d4 18%,#22c55e 40%,#eab308 62%,#f97316 82%,#ef4444 100%)";

const SECTION_LABELS: Record<string, string> = {
  "Propulsion & Fluids": "Propulsion, GSE, Fluids",
  "Test Systems & Instrumentation": "Test Fixtures, Cryogenics & Instrumentation",
  "Analysis & Simulation": "Analysis & Sims",
  "Product Design & Mechanisms": "Product Design & Dev",
  "Robotics & Autonomy": "Robotics, UAVs & Autonomy",
};

function HeroPlaceholder({ title }: { title: string }) {
  return (
    <div className="relative h-[420px] w-full md:h-[560px]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_20%_20%,rgba(59,130,246,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_460px_at_75%_25%,rgba(6,182,212,0.12),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_420px_at_70%_80%,rgba(239,68,68,0.08),transparent_62%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

      <div className="absolute inset-x-0 bottom-6 px-6">
        <div className="select-none text-[34px] leading-none tracking-tight text-white/10 md:text-[44px]">
          {title}
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:3px_3px]" />
    </div>
  );
}

function isPlaceholder(s?: string) {
  if (!s) return true;
  return s.trim().startsWith("{insert");
}

function flattenProjects(projects: Project[]): Project[] {
  return projects.flatMap((project) => [
    project,
    ...(project.subprojects ? flattenProjects(project.subprojects) : []),
  ]);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = PROJECTS_BY_SLUG[slug];

  if (!p) {
    return (
      <main className="min-h-screen bg-black px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl">Project not found</h1>
          <Link
            href="/works"
            className="mt-8 inline-flex rounded-full border border-white/20 px-6 py-3 text-sm text-white hover:border-white/50"
          >
            Back to Works
          </Link>
        </div>
      </main>
    );
  }

  const allProjects = flattenProjects(PROJECTS);
  const childProjects = allProjects.filter((project) => project.parentSlug === p.slug);

  const sectionLabel = SECTION_LABELS[p.projectType] ?? "Engineering";

  const status = p.status ?? "{insert status here}";
  const date = p.date ?? "{insert date here}";
  const focusArea = p.focusArea ?? "{insert focus area here}";

  const systemOverview =
    p.systemOverview ??
    p.overview ??
    "{insert system overview here: architecture, constraints, analysis approach, validation plan, and key design decisions.}";

  const toolsAndSkills =
    p.toolsAndSkills ?? ["{insert tool}", "{insert tool}", "{insert tool}"];

  const accomplishments =
    p.accomplishments ?? [
      "{insert accomplishment here}",
      "{insert accomplishment here}",
      "{insert accomplishment here}",
    ];

  const results = p.results ?? ["{insert result here}", "{insert result here}"];

  const hasVideo = Boolean(p.videoSrc);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_18%_12%,rgba(59,130,246,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_650px_at_78%_18%,rgba(6,182,212,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_70%_78%,rgba(239,68,68,0.06),transparent_62%)]" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.62)_60%,rgba(0,0,0,0.95)_100%)]" />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 pb-10 pt-16">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/60 hover:text-white/80"
        >
          ← Back to Works
        </Link>

        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs tracking-[0.35em] text-white/45">
              {sectionLabel}
            </div>

            <h1 className="mt-3 text-5xl tracking-tight md:text-6xl">
              {p.title}
            </h1>

            <div className="mt-3 text-lg text-white/70 md:text-xl">
              {p.subtitle}
            </div>
          </div>

          <div className="md:text-right">
            <div className="text-[11px] tracking-[0.35em] text-white/45">
              STATUS
            </div>
            <div
              className="mt-2 text-sm font-medium"
              style={{
                background: THERMAL_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                opacity: isPlaceholder(status) ? 0.55 : 0.95,
              }}
            >
              {status}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {(p.tags ?? []).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-[11px] tracking-wide text-white/60"
            >
              {t}
            </span>
          ))}
        </div>

        <div
          className="mt-10 h-px w-full opacity-80"
          style={{ background: THERMAL_GRADIENT }}
        />

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-black">
          {p.gallery?.length ? (
            <>
              <ImageCarousel images={p.gallery} alt={`${p.title} images`} />
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 z-30 h-[2px]"
                style={{ background: THERMAL_GRADIENT }}
              />
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/10 via-transparent to-black/10" />
            </>
          ) : p.cover ? (
            <>
              <div className="relative min-h-[360px] w-full sm:min-h-[460px] md:min-h-[560px]">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  priority
                  className="object-contain opacity-95"
                  sizes="100vw"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-black/30" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 h-[2px]"
                style={{ background: THERMAL_GRADIENT }}
              />
            </>
          ) : (
            <HeroPlaceholder title={p.title} />
          )}
        </div>
      </section>

      {/* Rest of the page unchanged */}
    </main>
  );
}