import Link from "next/link";
import Image from "next/image";
import { PROJECTS_BY_SLUG } from "../projects";

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

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-white/60 hover:text-white/80"
        >
          ← Back to Works
        </Link>

        <h1 className="mt-6 text-5xl md:text-6xl tracking-tight">{p.title}</h1>
        <p className="mt-3 text-xl text-white/70">{p.subtitle}</p>

        <div className="mt-8 relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={p.cover}
            alt={p.title}
            fill
            className="object-cover opacity-95"
            sizes="100vw"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="text-xs tracking-[0.35em] text-white/55">
              OVERVIEW
            </div>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              {p.overview}
            </p>

            <div className="mt-10 text-xs tracking-[0.35em] text-white/55">
              HIGHLIGHTS
            </div>
            <ul className="mt-5 space-y-3 text-white/80">
              {p.highlights.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-[7px] h-2 w-2 rounded-full bg-[rgba(255,59,31,0.55)] shadow-[0_0_16px_rgba(255,59,31,0.18)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="text-xs tracking-[0.35em] text-white/55">TAGS</div>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-[11px] tracking-wide text-white/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
