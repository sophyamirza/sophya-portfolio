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

function BentoCard({
  label,
  children,
  className = "",
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10",
        "shadow-[0_10px_40px_rgba(0,0,0,0.18)]",
        className,
      ].join(" ")}
    >
      {label ? (
        <div className="flex items-center justify-between gap-6">
          <div className="text-xs tracking-[0.35em] text-white/55">{label}</div>
          <div
            className="h-px flex-1 opacity-60"
            style={{ background: THERMAL_GRADIENT }}
          />
        </div>
      ) : null}
      <div className={label ? "mt-6" : ""}>{children}</div>
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

function SectionImageCollage({
  images,
  altBase,
}: {
  images: string[];
  altBase: string;
}) {
  if (!images.length) return null;

  if (images.length === 1) {
    return (
      <div className="grid grid-cols-1">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <div className="relative min-h-[520px] overflow-hidden rounded-xl bg-black">
            <Image
              src={images[0]}
              alt={`${altBase} 1`}
              fill
              className="object-contain"
              sizes="(max-width: 1279px) 100vw, 42vw"
            />
          </div>
        </div>
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4"
          >
            <div className="relative min-h-[460px] overflow-hidden rounded-xl bg-black">
              <Image
                src={src}
                alt={`${altBase} ${i + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1535px) 100vw, 36vw"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
      {images.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4"
        >
          <div className="relative min-h-[400px] overflow-hidden rounded-xl bg-black">
            <Image
              src={src}
              alt={`${altBase} ${i + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 1535px) 100vw, 36vw"
            />
          </div>
        </div>
      ))}
    </div>
  );
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

  const sectionLabel =
    SECTION_LABELS[p.projectType] ?? p.projectType ?? "Engineering";

  const status = p.status ?? "{insert status here}";
  const date = p.date ?? "{insert date here}";
  const focusArea = p.focusArea ?? "{insert focus area here}";

  const systemOverview =
    p.systemOverview ??
    p.overview ??
    "{insert system overview here: architecture, constraints, analysis approach, validation plan, and key design decisions.}";

  const toolsAndSkills =
    p.toolsAndSkills ?? ["{insert tool}", "{insert tool}", "{insert tool}"];

  const results =
    p.results ??
    (p.accomplishments?.length
      ? p.accomplishments
      : ["{insert result here}", "{insert result here}"]);

  const hasVideo = Boolean(p.videoSrc);
  const useSectionCollage = p.slug === "alula-engine";

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_18%_12%,rgba(59,130,246,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_650px_at_78%_18%,rgba(6,182,212,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_70%_78%,rgba(239,68,68,0.06),transparent_62%)]" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.62)_60%,rgba(0,0,0,0.95)_100%)]" />
      </div>

      <section className="relative mx-auto max-w-[1750px] px-6 pb-10 pt-16 2xl:px-12">
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

      <section className="relative mx-auto max-w-[1750px] px-6 pb-28 2xl:px-12">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 auto-rows-[minmax(180px,auto)]">
          <BentoCard label="SYSTEM OVERVIEW" className="xl:col-span-8">
            <p className="max-w-none text-lg leading-relaxed text-white/80 md:text-[22px]">
              {systemOverview}
            </p>
          </BentoCard>

          <BentoCard label="PROJECT META" className="xl:col-span-4">
            <div className="space-y-5">
              <div>
                <div className="text-[11px] tracking-[0.28em] text-white/40">DATE</div>
                <div
                  className="mt-2 text-lg text-white/85"
                  style={{ opacity: isPlaceholder(date) ? 0.55 : 1 }}
                >
                  {date}
                </div>
              </div>

              <div className="h-px w-full bg-white/10" />

              <div>
                <div className="text-[11px] tracking-[0.28em] text-white/40">
                  FOCUS AREA
                </div>
                <div
                  className="mt-2 text-lg text-white/85"
                  style={{ opacity: isPlaceholder(focusArea) ? 0.55 : 1 }}
                >
                  {focusArea}
                </div>
              </div>

              <div className="h-px w-full bg-white/10" />

              <div>
                <div className="text-[11px] tracking-[0.28em] text-white/40">STATUS</div>
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
          </BentoCard>

          <BentoCard label="TOOLS & SKILLS" className="xl:col-span-5">
            <div className="flex flex-wrap gap-2">
              {toolsAndSkills.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-[11px] tracking-wide text-white/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </BentoCard>

          {childProjects.length ? (
            <BentoCard label="SUBSYSTEMS" className="xl:col-span-7">
              <div className="flex flex-wrap gap-3">
                {childProjects.map((child) => (
                  <Link
                    key={child.slug}
                    href={`/works/${child.slug}`}
                    className="rounded-full border border-white/15 bg-white/[0.02] px-4 py-2 text-sm text-white/75 transition hover:border-white/35 hover:bg-white/[0.04] hover:text-white"
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            </BentoCard>
          ) : null}

          {p.accomplishments?.length ? (
            <BentoCard
              label="ACCOMPLISHMENTS"
              className={childProjects.length ? "xl:col-span-6" : "xl:col-span-7"}
            >
              <ul className="space-y-4 text-lg leading-relaxed text-white/80">
                {p.accomplishments.map((h, i) => (
                  <li key={`${h}-${i}`} className="flex gap-4">
                    <span
                      className="mt-[11px] h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{
                        background: THERMAL_GRADIENT,
                        boxShadow: "0 0 16px rgba(255,255,255,0.08)",
                        opacity: 0.9,
                      }}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </BentoCard>
          ) : null}

          <BentoCard
            label="RESULTS"
            className={p.accomplishments?.length ? "xl:col-span-6" : "xl:col-span-5"}
          >
            <ul className="space-y-4 text-lg leading-relaxed text-white/80">
              {results.map((r, i) => (
                <li key={`${r}-${i}`} className="flex gap-4">
                  <span
                    className="mt-[11px] h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      background: THERMAL_GRADIENT,
                      boxShadow: "0 0 16px rgba(255,255,255,0.08)",
                      opacity: isPlaceholder(r) ? 0.45 : 0.9,
                    }}
                  />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </BentoCard>

          {hasVideo ? (
            <BentoCard label="TEST VIDEO" className="xl:col-span-12">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
                <video
                  className="h-auto w-full"
                  controls
                  playsInline
                  preload="metadata"
                  poster={p.videoPoster}
                >
                  <source src={p.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </BentoCard>
          ) : null}

          {!childProjects.length && p.sections?.length ? (
            <div className="xl:col-span-12 grid grid-cols-1 gap-6 2xl:grid-cols-12">
              {p.sections.map((s, index) => {
                const reverse = index % 2 === 1;
                const hasImages = Boolean(s.images?.length);
                const splitLayout = useSectionCollage && hasImages;

                if (splitLayout) {
                  return (
                    <section
                      key={s.id}
                      id={s.id}
                      className="2xl:col-span-12 grid grid-cols-1 gap-6 2xl:grid-cols-12"
                    >
                      <div
                        className={[
                          "2xl:col-span-6",
                          reverse ? "2xl:order-2" : "",
                        ].join(" ")}
                      >
                        <BentoCard label="SECTION" className="h-full">
                          <h2 className="max-w-none text-3xl tracking-tight text-white/90 md:text-5xl">
                            {s.title}
                          </h2>

                          {s.summary ? (
                            <p className="mt-5 max-w-none text-xl leading-relaxed text-white/75">
                              {s.summary}
                            </p>
                          ) : null}

                          {s.bullets?.length ? (
                            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 text-lg leading-relaxed text-white/80 md:grid-cols-2">
                              {s.bullets.map((b, i) => (
                                <li key={`${s.id}-b-${i}`} className="flex gap-4">
                                  <span
                                    className="mt-[11px] h-2.5 w-2.5 shrink-0 rounded-full"
                                    style={{
                                      background: THERMAL_GRADIENT,
                                      boxShadow: "0 0 16px rgba(255,255,255,0.08)",
                                      opacity: 0.9,
                                    }}
                                  />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </BentoCard>
                      </div>

                      <div
                        className={[
                          "2xl:col-span-6",
                          reverse ? "2xl:order-1" : "",
                        ].join(" ")}
                      >
                        <SectionImageCollage
                          images={s.images!}
                          altBase={`${p.title} ${s.title} images`}
                        />
                      </div>
                    </section>
                  );
                }

                return (
                  <section
                    key={s.id}
                    id={s.id}
                    className={hasImages ? "2xl:col-span-6" : "2xl:col-span-4"}
                  >
                    <BentoCard label="SECTION" className="h-full">
                      <h2 className="max-w-none text-3xl tracking-tight text-white/90 md:text-4xl">
                        {s.title}
                      </h2>

                      {s.summary ? (
                        <p className="mt-5 max-w-none text-lg leading-relaxed text-white/75">
                          {s.summary}
                        </p>
                      ) : null}

                      {s.bullets?.length ? (
                        <ul className="mt-6 space-y-3 text-base leading-relaxed text-white/80">
                          {s.bullets.map((b, i) => (
                            <li key={`${s.id}-b-${i}`} className="flex gap-4">
                              <span
                                className="mt-[10px] h-2.5 w-2.5 shrink-0 rounded-full"
                                style={{
                                  background: THERMAL_GRADIENT,
                                  boxShadow: "0 0 16px rgba(255,255,255,0.08)",
                                  opacity: 0.9,
                                }}
                              />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {hasImages ? (
                        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black">
                            <ImageCarousel
                              images={s.images!}
                              alt={`${p.title} ${s.title} images`}
                            />
                            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/10 via-transparent to-black/10" />
                          </div>
                        </div>
                      ) : null}
                    </BentoCard>
                  </section>
                );
              })}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}