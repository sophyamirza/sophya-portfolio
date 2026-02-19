import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "./projects";

export default function WorksPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-10">
        <div className="text-xs tracking-[0.35em] text-white/60">WORKS</div>
        <h1 className="mt-4 text-5xl md:text-6xl tracking-tight">
          Project Highlights
        </h1>
        <p className="mt-4 max-w-2xl text-white/70">
          Selected projects across propulsion, robotics, autonomy, cryogenics,
          and product engineering.
        </p>
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/works/${p.slug}`}
              className="group block"
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/[0.04]">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={p.slug === "alula"}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                </div>

                <div className="p-7 md:p-8">
                  <div className="flex items-baseline justify-between gap-6">
                    <div>
                      <div className="text-2xl md:text-3xl text-white">
                        {p.title}
                      </div>
                      <div className="mt-1 text-white/70">{p.subtitle}</div>
                    </div>

                    <div className="text-xs tracking-[0.22em] uppercase text-white/50 group-hover:text-white/70 transition-colors">
                      View →
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/15 bg-white/[0.02] px-3 py-1 text-[11px] tracking-wide text-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
