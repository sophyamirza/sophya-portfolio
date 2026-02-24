import Link from "next/link";
import Image from "next/image";
import ImageCarousel from "@/app/works/components/ImageCarousel";
import { PROJECTS_BY_SLUG } from "@/app/works/projects";

const THERMAL_GRADIENT =
  "linear-gradient(90deg,#3b82f6 0%,#06b6d4 18%,#22c55e 40%,#eab308 62%,#f97316 82%,#ef4444 100%)";

function HeroPlaceholder({ title }: { title: string }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_20%_20%,rgba(59,130,246,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_460px_at_75%_25%,rgba(6,182,212,0.12),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_420px_at_70%_80%,rgba(239,68,68,0.08),transparent_62%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-6 px-6">
        <div className="text-[34px] md:text-[44px] leading-none tracking-tight text-white/10 select-none">
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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = PROJECTS_BY_SLUG[slug];

  if (!p) {
    return (
      <main className="min-h-screen bg-black text-white px-6 py-24">
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

  const yearLabel = p.yearLabel ?? p.year;
  const status = p.status ?? "{insert status here}";
  const team = p.team ?? "{insert team here}";
  const date = p.date ?? "{insert date here}";
  const focusArea = p.focusArea ?? "{insert focus area here}";

  const systemOverview =
    p.systemOverview ??
    "{insert system overview here: architecture, constraints, analysis approach, validation plan, and key design decisions.}";

  const toolsAndSkills =
    p.toolsAndSkills ?? ["{insert tool}", "{insert tool}", "{insert tool}"];

  const contributions =
    p.contributions ?? [
      "{insert contribution here}",
      "{insert contribution here}",
      "{insert contribution here}",
    ];

  const results = p.results ?? ["{insert result here}", "{insert result here}"];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* background haze (thermal/analysis) */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_18%_12%,rgba(59,130,246,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_650px_at_78%_18%,rgba(6,182,212,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_70%_78%,rgba(239,68,68,0.06),transparent_62%)]" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.62)_60%,rgba(0,0,0,0.95)_100%)]" />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-10">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-white/60 hover:text-white/80"
        >
          ← Back to Works
        </Link>

        {/* top meta row */}
        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs tracking-[0.35em] text-white/45">
              {yearLabel}
            </div>

            <h1 className="mt-3 text-5xl md:text-6xl tracking-tight">
              {p.title}
            </h1>

            <div className="mt-3 text-white/70 text-lg md:text-xl">
              {p.subtitle}
            </div>
          </div>

          {/* status + team */}
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

            <div className="mt-5 text-[11px] tracking-[0.35em] text-white/45">
              TEAM
            </div>
            <div className="mt-2 text-sm text-white/70">{team}</div>
          </div>
        </div>

        {/* tags row */}
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

        {/* divider */}
        <div
          className="mt-10 h-px w-full opacity-80"
          style={{ background: THERMAL_GRADIENT }}
        />

        {/* HERO (✅ carousel replaces placeholder/cover when gallery exists) */}
        <div className="mt-10 relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          {p.gallery?.length ? (
            <>
              <ImageCarousel
                images={p.gallery}
                alt={`${p.title} contours`}
                fillParent
              />
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 h-[2px]"
                style={{ background: THERMAL_GRADIENT }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </>
          ) : p.cover ? (
            <>
              <Image
                src={p.cover}
                alt={p.title}
                fill
                className="object-cover opacity-95"
                sizes="100vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
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

      {/* body */}
      <section className="relative mx-auto max-w-6xl px-6 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="md:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div className="text-xs tracking-[0.35em] text-white/55">
                SYSTEM OVERVIEW
              </div>
              <p className="mt-5 text-lg leading-relaxed text-white/80">
                {systemOverview}
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div className="text-xs tracking-[0.35em] text-white/55">
                MY CONTRIBUTIONS
              </div>

              <ol className="mt-6 space-y-4">
                {contributions.map((c, i) => (
                  <li key={`${c}-${i}`} className="flex gap-4">
                    <div
                      className="mt-[2px] w-10 shrink-0 text-[12px] tracking-[0.22em]"
                      style={{
                        background: THERMAL_GRADIENT,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        opacity: isPlaceholder(c) ? 0.5 : 0.95,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="text-white/80">{c}</div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div className="text-xs tracking-[0.35em] text-white/55">
                RESULTS
              </div>

              <ul className="mt-6 space-y-3 text-white/80">
                {results.map((r, i) => (
                  <li key={`${r}-${i}`} className="flex gap-3">
                    <span
                      className="mt-[7px] h-2 w-2 rounded-full"
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
            </div>
          </div>

          {/* RIGHT */}
          <aside className="space-y-10">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div className="text-xs tracking-[0.35em] text-white/55">
                TOOLS & SKILLS
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {toolsAndSkills.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-[11px] tracking-wide text-white/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div className="text-xs tracking-[0.35em] text-white/55">
                DATE
              </div>
              <div
                className="mt-4 text-lg text-white/85"
                style={{ opacity: isPlaceholder(date) ? 0.55 : 1 }}
              >
                {date}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div className="text-xs tracking-[0.35em] text-white/55">
                FOCUS AREA
              </div>
              <div
                className="mt-4 text-lg text-white/85"
                style={{ opacity: isPlaceholder(focusArea) ? 0.55 : 1 }}
              >
                {focusArea}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}