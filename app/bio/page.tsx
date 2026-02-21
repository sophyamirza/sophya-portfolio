"use client";

import Image from "next/image";
import Link from "next/link";

const THERMAL =
  "bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)]";

function RailBlock({
  title,
  items,
  accent = "text-white/80",
}: {
  title: string;
  items: string[];
  accent?: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <div className="flex items-center justify-between">
        <div className="text-xs tracking-[0.35em] text-white/50">{title}</div>
        <div className={`h-2 w-2 rounded-full ${THERMAL} opacity-70`} />
      </div>
      <div className="mt-4 space-y-2">
        {items.map((x) => (
          <div key={x} className={`text-sm ${accent}`}>
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

      <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-20 md:pt-24">
        {/* top title */}
        <div className="text-xs tracking-[0.35em] text-white/50">BIO</div>
        <h1 className="mt-4 text-6xl md:text-7xl tracking-tight">Sophya Mirza</h1>
        <div className={`mt-5 h-[2px] w-64 ${THERMAL} opacity-70`} />
        <p className="mt-6 max-w-3xl text-white/65">
          Mechanical engineer designing, building, and testing hardware at the
          extremes. Bias toward shipping. Tight feedback loops. Extreme ownership.
        </p>

        {/* 3-column layout */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[360px_1fr_320px]">
          {/* LEFT: photo (sticky) */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-4">
              <div className={`h-[2px] w-full ${THERMAL} opacity-35`} />
              <div className="mt-4 relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10">
                {/* change this path */}
                <Image
                  src="/images/bio.jpg"
                  alt="Sophya Mirza"
                  fill
                  sizes="360px"
                  className="object-cover"
                  priority={false}
                />
              </div>
              <div className="mt-4 text-xs tracking-[0.35em] text-white/50">
                LOS ANGELES · BERKELEY
              </div>
            </div>
          </aside>

          {/* CENTER: long text (Bio + Manifesto under it) */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
            {/* BIO */}
            <div className="text-xs tracking-[0.35em] text-white/50">BIO</div>
            <h2 className="mt-3 text-3xl md:text-4xl tracking-tight">Background</h2>
            <div className={`mt-4 h-[2px] w-44 ${THERMAL} opacity-55`} />

            <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-white/75">
              <p>
                I grew up in LA, between backyard experiments, late night takeout,
                and the constant roar of LAX. Somewhere between breakthrough tech in
                Gundo and fortune cookies, I learned that enthusiasm is something you
                create.
              </p>

              <p>
                I’ve always been driven to understand how things actually work by
                building them. What started as science fairs and a chance to meet the
                President became something deeper after watching the{" "}
                <Highlight tone="cool">Space Shuttle</Highlight> fly over my school on
                its final journey. Months later, I found myself competing beneath
                that same shuttle at the Science Center, a full circle moment that
                set the direction.
              </p>

              <p>
                At 14, I spent a summer in rural NC bouldering the Chimneys, touring
                wind farms and hydroelectric dams, and getting hooked on turbines and
                generators. That experience led to my earliest projects refurbishing
                generators and cemented what I care about most:{" "}
                <Highlight tone="warm">hands on engineering</Highlight>, validation
                through testing, and learning by doing.
              </p>

              <p>
                Since then, I’ve worked and interned every summer learning how real
                hardware gets built, shipped, and occasionally redesigned overnight.
                Along the way, I’ve taken extreme ownership across propulsion
                systems, vehicle structures, and test infrastructure at{" "}
                <Highlight>SpaceX</Highlight>, <Highlight>Astranis</Highlight>,{" "}
                <Highlight>Proterra</Highlight>, <Highlight>NASA</Highlight>, and{" "}
                <Highlight>SSL</Highlight>, growing from a member to lead engineer on
                my bipropellant rocketry team and founding teams that built critical
                technology for EVA missions for Artemis.
              </p>

              <p>
                Today, I bring that same enthusiasm to designing, building, and
                testing end to end hardware, driven by fast iteration, deep
                ownership, and turning science fiction into engineered reality.
              </p>
            </div>

            {/* MANIFESTO directly under bio */}
            <div className="mt-14">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-xs tracking-[0.35em] text-white/50">
                    MANIFESTO
                  </div>
                  <h2 className="mt-3 text-3xl md:text-4xl tracking-tight">
                    Rebuild the Loop
                  </h2>
                  <div className={`mt-4 h-[2px] w-44 ${THERMAL} opacity-55`} />
                </div>

                <Link
                  href="https://YOUR_SUBSTACK_URL_HERE"
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-2 text-xs tracking-[0.22em] uppercase text-white/85 transition-all duration-300 hover:border-[rgba(255,59,31,0.45)] hover:bg-[rgba(255,59,31,0.06)]"
                >
                  Read full text on Substack →
                </Link>
              </div>

              <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-white/75">
                <p className="text-white/85">Our future depends on making things again.</p>

                <p>
                  If we can’t design, build, test, and iterate fast, we lose when
                  supply chains break or timelines collapse.
                </p>

                <p>
                  American dynamism isn’t nostalgia, it’s velocity for humankind.
                  Shorter loops. Faster learning. Full ownership of design,
                  manufacturing, test, and integration.
                </p>

                <p>
                  Manufacturing is 11% of U.S. GDP but fuels nearly 70% of private
                  R&D. Offshoring stretched lead times and slowed iteration. To meet
                  rising demand in technology, space, energy, and defense, we need
                  production at home.
                </p>

                <p>
                  <Highlight tone="warm">Onshoring is compression:</Highlight> redesign
                  Monday, cut Friday. Progress lives where loops close and ownership
                  is absolute.
                </p>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <p className="text-white/85">If it breaks, I own it.</p>
                  <p className="text-white/85">If a test fails, I own it.</p>
                  <p className="mt-3 text-white/70">
                    Because if no one owns the outcome, no one learns and the idea
                    never leaves the whiteboard.
                  </p>

                  <div className="mt-6 h-px w-52 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  <p className="mt-6 text-white/80">
                    Success is cycle time. It’s hardware that survives contact with
                    reality.
                  </p>

                  <p className="mt-4 text-white/85">
                    Design. Integrate. Test. Fix. Ship. (Repeat)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT: rail lists (sticky) */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-xs tracking-[0.35em] text-white/50">SECTIONS</div>
              <div className="mt-4 space-y-2 text-white/70">
                {[
                  { id: "bio", label: "BIO" },
                  { id: "manifesto", label: "MANIFESTO" },
                ].map((x) => (
                  <a
                    key={x.id}
                    href={`#${x.id}`}
                    className="block rounded-xl px-3 py-2 text-sm tracking-[0.18em] transition-all duration-300 hover:bg-white/[0.03] hover:text-white"
                  >
                    {x.label}
                  </a>
                ))}
              </div>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="mt-6 text-[11px] tracking-[0.28em] text-white/45">
                DESIGN · INTEGRATE · TEST · FIX · SHIP
              </div>
            </div>

            <RailBlock
              title="EXPERIENCE"
              items={["SpaceX", "Astranis", "NASA", "Proterra", "SSL (Cryogenics)"]}
            />
            <RailBlock
              title="DESIGN"
              items={["System architecture", "Interfaces", "CAD + GD&T", "DFM trades"]}
            />
            <RailBlock
              title="FABRICATION"
              items={["Prototyping", "CNC + manual machining", "3D printing", "Composites"]}
            />
            <RailBlock title="EDUCATION" items={["UC Berkeley · Mechanical Engineering"]} />
            <RailBlock
              title="INTERESTS"
              items={[
                "Propulsion",
                "Test engineering",
                "Manufacturing",
                "Robotics",
                "Cryogenics",
                "Community building",
                "Photography",
                "Jiu-jitsu",
              ]}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}