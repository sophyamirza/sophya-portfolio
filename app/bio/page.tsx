"use client";

import Image from "next/image";
import Link from "next/link";

const THERMAL =
  "bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)]";

function RailSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="pt-7 first:pt-0">
      <div className="text-xs tracking-[0.35em] text-white/55">{title}</div>
      <div className={`mt-3 h-[2px] w-28 ${THERMAL} opacity-45`} />
      <div className="mt-4 space-y-2">
        {items.map((x) => (
          <div key={x} className="text-sm text-white/75">
            {x}
          </div>
        ))}
      </div>
    </div>
  );
}

function Highlight({
  children,
  tone = "thermal",
}: {
  children: React.ReactNode;
  tone?: "thermal" | "warm" | "cool";
}) {
  const cls =
    tone === "thermal"
      ? "text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.20)]"
      : tone === "warm"
      ? "text-[rgba(255,59,31,0.95)]"
      : "text-[rgba(0,179,255,0.95)]";

  return <span className={`font-semibold ${cls}`}>{children}</span>;
}

export default function BioPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* haze */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_18%_12%,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_650px_at_78%_18%,rgba(6,182,212,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_70%_78%,rgba(239,68,68,0.05),transparent_62%)]" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.62)_60%,rgba(0,0,0,0.95)_100%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1500px] px-10 pb-28 pt-20 md:pt-24">
        {/* header */}
        <div className="text-xs tracking-[0.35em] text-white/50">BIO</div>
        <h1 className="mt-4 text-6xl md:text-7xl tracking-tight">
          Sophya Mirza
        </h1>
        <div className={`mt-5 h-[2px] w-64 ${THERMAL} opacity-70`} />
        <p className="mt-6 max-w-3xl text-white/65">
          Mechanical engineer designing, building, and testing hardware at the
          extremes. Bias toward shipping. Tight feedback loops. Extreme ownership.
        </p>

        {/* UPDATED GRID */}
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[360px_minmax(0,1fr)_280px]">

          {/* LEFT IMAGE (smaller) */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-4">
              <div className={`h-[2px] w-full ${THERMAL} opacity-35`} />
              <div className="mt-4 relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/images/bio.jpg"
                  alt="Sophya Mirza"
                  fill
                  sizes="360px"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 text-xs tracking-[0.35em] text-white/50">
                LOS ANGELES · BERKELEY
              </div>
            </div>
          </aside>

          {/* CENTER BIO (now wider) */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-10">

            <div className="text-xs tracking-[0.35em] text-white/50">BIO</div>
            <div className={`mt-4 h-[2px] w-44 ${THERMAL} opacity-55`} />

            <div className="mt-8 space-y-6 text-[16px] leading-relaxed text-white/75">
              <p>
                I grew up in LA, between backyard experiments, late night takeout,
                and the constant roar of LAX. Somewhere between breakthrough tech in
                Gundo and fortune cookies, I learned that enthusiasm is something you create.
              </p>

              <p>
                I’ve always been driven to understand how things actually work by
                building them. What started as science fairs and a chance to meet the
                President became something deeper after watching the{" "}
                <Highlight tone="cool">Space Shuttle</Highlight> fly over my school.
              </p>

              <p>
                At 14, I spent a summer in rural NC touring wind farms and hydroelectric dams.
                That experience cemented what I care about most:{" "}
                <Highlight tone="warm">hands on engineering</Highlight>, validation through testing, and learning by doing.
              </p>

              <p>
                Since then, I’ve taken extreme ownership across propulsion systems,
                vehicle structures, and test infrastructure at{" "}
                <Highlight>SpaceX</Highlight>, <Highlight>Astranis</Highlight>,{" "}
                <Highlight>NASA</Highlight>, and others.
              </p>

              <p>
                Today, I design, build, and test end to end hardware driven by fast
                iteration and deep ownership.
              </p>
            </div>
          </section>

          {/* THINNER RIGHT SIDEBAR */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">

              <RailSection
                title="EXPERIENCE"
                items={["SpaceX", "Astranis", "NASA", "Proterra", "SSL"]}
              />

              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

              <RailSection
                title="DESIGN"
                items={["System architecture", "CAD + GD&T", "DFM trades"]}
              />

              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

              <RailSection
                title="FABRICATION"
                items={["Prototyping", "CNC", "3D printing", "Composites"]}
              />

              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

              <RailSection
                title="EDUCATION"
                items={["UC Berkeley · Mechanical Engineering"]}
              />

              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

              <RailSection
                title="INTERESTS"
                items={[
                  "Propulsion",
                  "Manufacturing",
                  "Cryogenics",
                  "Muay Thai",
                  "Jiu-jitsu",
                ]}
              />

              <div className="mt-8 text-[11px] tracking-[0.28em] text-white/45">
                DESIGN · INTEGRATE · TEST · FIX · SHIP
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}