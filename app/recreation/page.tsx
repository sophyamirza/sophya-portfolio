"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const THERMAL =
  "bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)]";

const sections = [
  { id: "bio", label: "BIO" },
  { id: "manifesto", label: "MANIFESTO" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "design", label: "DESIGN + FABRICATION" },
  { id: "education", label: "EDUCATION" },
  { id: "interests", label: "INTERESTS" },
];

function SectionHeader({
  id,
  label,
  title,
}: {
  id: string;
  label: string;
  title: string;
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <div className="text-xs tracking-[0.35em] text-white/50">{label}</div>
      <h2 className="mt-3 text-3xl md:text-4xl tracking-tight text-white">
        {title}
      </h2>
      <div className={`mt-4 h-[2px] w-36 ${THERMAL} opacity-60`} />
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden lg:block lg:col-span-4">
      <div className="sticky top-24 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <div className="text-xs tracking-[0.35em] text-white/50">SECTIONS</div>

        <nav className="mt-5 flex flex-col gap-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group flex items-center justify-between rounded-2xl border border-transparent px-3 py-2 text-sm text-white/70 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03] hover:text-white"
            >
              <span className="tracking-[0.18em]">{s.label}</span>
              <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-70">
                →
              </span>
            </a>
          ))}
        </nav>

        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="mt-6 text-xs tracking-[0.28em] text-white/45">
          DESIGN · INTEGRATE · TEST · FIX · SHIP
        </div>
      </div>
    </aside>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-white/70 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06] hover:text-white">
      {children}
    </span>
  );
}

export default function BioPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* subtle haze */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_18%_12%,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_650px_at_78%_18%,rgba(6,182,212,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_70%_78%,rgba(239,68,68,0.05),transparent_62%)]" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.62)_60%,rgba(0,0,0,0.95)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-20 md:pt-24">
        {/* Header */}
        <div className="flex flex-col gap-5">
          <div className="text-xs tracking-[0.35em] text-white/50">BIO</div>

          <div className="flex flex-col gap-3">
            <h1 className="text-6xl md:text-7xl tracking-tight">Sophya Mirza</h1>
            <div className={`h-[2px] w-56 ${THERMAL} opacity-70`} />
            <p className="max-w-2xl text-white/65">
              Mechanical engineer designing, building, and testing hardware at the
              extremes. Bias toward shipping. Tight feedback loops. Extreme ownership.
            </p>
          </div>
        </div>

        {/* Layout */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Main column */}
          <div className="lg:col-span-8">
            {/* Bio */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
              <SectionHeader id="bio" label="BIO" title="Background" />

              <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-white/75">
                <p>
                  I grew up in LA, between backyard experiments, late night takeout,
                  and the constant roar of LAX. Somewhere between breakthrough tech
                  in Gundo and fortune cookies, I learned that enthusiasm is something
                  you create.
                </p>

                <p>
                  I’ve always been driven to understand how things actually work by
                  building them. What started as science fairs and a chance to meet
                  the President became something deeper after watching the Space
                  Shuttle fly over my school on its final journey. Months later, I
                  found myself competing beneath that same shuttle at the Science
                  Center, a full circle moment that set the direction.
                </p>

                <p>
                  At 14, I spent a summer in rural NC bouldering the Chimneys, touring
                  wind farms and hydroelectric dams, and getting hooked on turbines
                  and generators. That experience led to my earliest projects
                  refurbishing generators and cemented what I care about most: hands
                  on engineering, validation through testing, and learning by doing.
                </p>

                <p>
                  Since then, I’ve worked and interned every summer learning how real
                  hardware gets built, shipped, and occasionally redesigned overnight.
                  Along the way, I’ve taken extreme ownership across propulsion
                  systems, vehicle structures, and test infrastructure at SpaceX,
                  Astranis, Proterra, NASA, and SSL, growing from a member to lead
                  engineer on my bipropellant rocketry team and founding teams that
                  built critical technology for EVA missions for Artemis.
                </p>

                <p>
                  Today, I bring that same enthusiasm to designing, building, and
                  testing end to end hardware, driven by fast iteration, deep
                  ownership, and turning science fiction into engineered reality.
                </p>
              </div>
            </section>

            {/* Manifesto */}
            <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <SectionHeader
                  id="manifesto"
                  label="MANIFESTO"
                  title="Rebuild the Loop"
                />

                <Link
                  href="https://YOUR_SUBSTACK_URL_HERE"
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-2 text-xs tracking-[0.22em] uppercase text-white/85 transition-all duration-300 hover:border-[rgba(255,59,31,0.45)] hover:bg-[rgba(255,59,31,0.06)]"
                >
                  Read full text on Substack →
                </Link>
              </div>

              <motion.div
                className="mt-8 space-y-5 text-[15px] leading-relaxed text-white/75"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
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
                  Manufacturing is 11% of U.S. GDP but fuels nearly 70% of private R&D.
                  Offshoring stretched lead times and slowed iteration. To meet rising
                  demand in technology, space, energy, and defense, we need production
                  at home.
                </p>

                <p>Onshoring is compression: redesign Monday, cut Friday.</p>

                <p>Progress lives where loops close and ownership is absolute.</p>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <p className="text-white/85">If it breaks, I own it.</p>
                  <p className="text-white/85">If a test fails, I own it.</p>
                  <p className="mt-3 text-white/70">
                    Because if no one owns the outcome, no one learns and the idea
                    never leaves the whiteboard.
                  </p>

                  <div className="mt-6 h-px w-44 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  <p className="mt-6 text-white/80">
                    Success is cycle time. It’s hardware that survives contact with reality.
                  </p>

                  <p className="mt-4 text-white/85">
                    Design. Integrate. Test. Fix. Ship. (Repeat)
                  </p>
                </div>
              </motion.div>
            </section>

            {/* Interests (main column, matches reference vibe) */}
            <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
              <SectionHeader id="interests" label="INTERESTS" title="What I’m drawn to" />
              <div className="mt-8 flex flex-wrap gap-2.5">
                {[
                  "Propulsion",
                  "Test engineering",
                  "Manufacturing",
                  "Robotics",
                  "Aero + structures",
                  "Cryogenics",
                  "Deep tech startups",
                  "Community building",
                  "Photography",
                  "Jiu-jitsu",
                ].map((x) => (
                  <Tag key={x}>{x}</Tag>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar column */}
          <div className="lg:col-span-4">
            <Sidebar />

            {/* Reference-style stacked lists (right rail content) */}
            <div className="mt-10 lg:mt-0 lg:sticky lg:top-[26rem] space-y-6 hidden lg:block">
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs tracking-[0.35em] text-white/50">
                  EXPERIENCE
                </div>
                <div className="mt-4 space-y-2 text-white/75">
                  {["SpaceX", "Astranis", "NASA", "Proterra", "SSL / Cryogenics"].map(
                    (x) => (
                      <div key={x} className="text-sm">
                        {x}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs tracking-[0.35em] text-white/50">
                  DESIGN
                </div>
                <div className="mt-4 space-y-2 text-white/75">
                  {["CAD + GD&T", "DFM", "Interfaces", "Architecture + trades"].map(
                    (x) => (
                      <div key={x} className="text-sm">
                        {x}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs tracking-[0.35em] text-white/50">
                  FABRICATION
                </div>
                <div className="mt-4 space-y-2 text-white/75">
                  {["Prototyping", "CNC + manual machining", "3D printing", "Composites"].map(
                    (x) => (
                      <div key={x} className="text-sm">
                        {x}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs tracking-[0.35em] text-white/50">
                  EDUCATION
                </div>
                <div className="mt-4 text-sm text-white/75">
                  UC Berkeley Mechanical Engineering
                </div>
              </div>
            </div>

            {/* Small portrait block (optional, matches the reference layout) */}
            <div className="mt-10 hidden lg:block">
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-4">
                <div className={`h-[2px] w-full ${THERMAL} opacity-40`} />
                <div className="mt-4 relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10">
                  {/* Replace with your own image path */}
                  <Image
                    src="/images/bio.jpg"
                    alt="Sophya Mirza"
                    fill
                    sizes="(min-width: 1024px) 320px, 0px"
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="mt-4 text-xs tracking-[0.35em] text-white/50">
                  LOS ANGELES → BERKELEY
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom divider */}
        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </main>
  );
}