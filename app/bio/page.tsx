"use client";

import Image from "next/image";
import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "500", "600", "700"],
});

const THERMAL =
  "bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)]";

type ChipVariant = "default" | "thermal";

function ChipSection({
  title,
  items,
  variant = "default",
  dense = false,
}: {
  title: string;
  items: string[];
  variant?: ChipVariant;
  dense?: boolean;
}) {
  const clean = items.map((x) => x.trim()).filter(Boolean);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.08,
      },
    },
  };

  const chip: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="pt-10 first:pt-0">
      {/* SECTION TITLE — match editorial style */}
      <div
        className={[
          "text-sm tracking-[0.35em]",
          "text-white/60",
          playfair.className,
        ].join(" ")}
      >
        {title}
      </div>

      <div className={`mt-4 h-[2px] w-32 ${THERMAL} opacity-40`} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-6 flex flex-wrap gap-2.5"
      >
        {clean.map((x) => (
          <motion.span
            key={x}
            variants={chip}
            className={[
              // Smaller bubble
              "px-3.5 py-1.5",
              "rounded-full",

              // Smaller font
              "text-[12px] sm:text-[13px]",
              "font-medium tracking-wide",

              // Cleaner background
              variant === "thermal"
                ? "bg-[rgba(0,179,255,0.18)] text-white border border-white/15"
                : "bg-white/[0.04] text-white/85 border border-white/12",

              // Sleek interaction
              "transition-all duration-300",
              "hover:bg-white/[0.08] hover:border-white/30",
              "hover:scale-[1.02]",
              "backdrop-blur-md",
            ].join(" ")}
          >
            {x}
          </motion.span>
        ))}
      </motion.div>
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
  // ✅ Keep ONLY the headshot (no carousel)
  const headshot = useMemo(
    () => ({ src: "/images/bio.jpg", alt: "Sophya Mirza headshot" }),
    []
  );

  return (
    <main className="min-h-screen bg-black text-white">
      {/* haze */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_18%_12%,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_650px_at_78%_18%,rgba(6,182,212,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_70%_78%,rgba(239,68,68,0.05),transparent_62%)]" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.62)_60%,rgba(0,0,0,0.95)_100%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1500px] px-6 sm:px-10 pb-28 pt-20 md:pt-24">
        {/* header */}
        <div className="text-xs tracking-[0.35em] text-white/50">BIO</div>

        {/* Title */}
        <h1
          className={[
            "mt-4 tracking-tight",
            "text-5xl sm:text-6xl md:text-7xl",
            playfair.className,
            "italic",
          ].join(" ")}
        >
          SOPHYA MIRZA
        </h1>

        <div className={`mt-5 h-[2px] w-64 ${THERMAL} opacity-70`} />
        <p className="mt-6 max-w-3xl text-white/65">DESIGN. BUILD. TEST. SHIP.</p>

        {/* grid */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:gap-12 lg:grid-cols-[360px_minmax(0,1fr)_300px]">
          {/* LEFT IMAGE (single headshot) */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-4">
              <div className={`h-[2px] w-full ${THERMAL} opacity-35`} />

              <div className="mt-4 relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={headshot.src}
                  alt={headshot.alt}
                  fill
                  sizes="360px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* caption (static) */}
              <div className="mt-3 px-2 text-center text-[11px] tracking-[0.28em] text-white/50">
                LOS ANGELES · SAN FRANCISCO
              </div>
            </div>
          </aside>

          {/* CENTER */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 flex flex-col">
            {/* BIO TITLE */}
            <div
              className={[
                "text-lg sm:text-xl tracking-[0.3em]",
                "text-white/70",
                playfair.className,
              ].join(" ")}
            >
              BIO
            </div>

            <div className={`mt-5 h-[2px] w-56 ${THERMAL} opacity-60`} />

            {/* BIO BODY — larger + same font as page theme */}
            <div className="mt-10 space-y-7 text-[17px] sm:text-[18px] leading-[1.8] text-white/80">
             

              <p>
                Hey, I’m Sophya! A first gen Persian American mechanical engineer (UC Berkeley) who grew up under the LAX flight path where the Shuttle made its final touch down to the Science Center turning that curiosity into direction. At 14, I spent a summer in rural NC climbing The Chimneys, exploring wind farms, and helping refurbish hydroelectric dams in TN, where I first got hooked on turbines, generators, and the infrastructure that generates, moves, and scales. Since then, I’ve been driven to build technologies that push progress in aerospace, energy, and transportation.

              </p>

              <p>
                I’m a builder at heart. I’ve owned and delivered hardware working on satellite propulsion, launch vehicle structures, SAFs, manufacturing, batteries and more. My work spans the full stack: CAD, FEA, testing, and manufacturing, with a focus on turning designs into real, working systems quickly and reliably.
              </p>

              <p>
                A fortune cookie once told me I “create enthusiasm,” and I’ve taken that seriously. I bring energy, clarity, and momentum to hard problems, especially in fast moving, ambiguous environments.
              </p>
              
              <p>
                Outside of engineering, I train jiu jitsu, which keeps me grounded in adaptability and composure under pressure. That same mindset shows up in my work: first principles thinking, rapid iteration, and a bias toward building and learning from real hardware.
              </p>
              
              <p>
                I’m excited to bring that mindset and execution to your team!
              </p>
            </div>

            {/* MANIFESTO */}
            <div className="mt-20">
              <div
                className={[
                  "text-lg sm:text-xl tracking-[0.3em]",
                  "text-white/70",
                  playfair.className,
                ].join(" ")}
              >
                MANIFESTO
              </div>

              <div className={`mt-5 h-[2px] w-64 ${THERMAL} opacity-60`} />

              <div className="mt-10 space-y-7 text-[17px] sm:text-[18px] leading-[1.8] text-white/80">
                <p>
                  The future is reindustrialization: making things again.
                </p>
                <p>
                  Onshoring is compression: tighter loops, faster feedback, greater ownership.
                </p>
                <p>
                  Extreme ownership closes the loop: if it breaks, I own it. If a test fails, I own it.
                </p>
                <p>Success is cycle time and quality. Ship hardware that survives reality.</p>

                {/* CTA */}
                <div className="pt-6">
                  <a
                    href="https://substack.com/home/post/p-190588622"
                    target="_blank"
                    rel="noreferrer"
                    className={[
                      "inline-flex items-center justify-center gap-2",
                      "rounded-full px-5 py-2 text-[13px]",
                      "border border-white/14 bg-white/[0.03] text-white/80",
                      "hover:bg-white/[0.06] hover:border-white/25",
                      "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.35)]",
                      "active:scale-[0.99]",
                      "transition",
                    ].join(" ")}
                  >
                    Read the manifesto
                    <span aria-hidden className="text-white/55">
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
              <ChipSection
                title="EXPERIENCE"
                variant="thermal"
                dense
                items={[
                  "SpaceX",
                  "Astranis",
                  "NASA",
                  "Proterra",
                  "SSL",
                  "SAE",
                  "LBNL",
                  "Avanti Technologies",
              
            
                ]}
              />

              <ChipSection
                title="DESIGN"
                dense
                items={["NX", "CATIA", "Onshape", "Fusion", "SolidWorks", "GD&T", "PLM", "PDM"]}
              />

              <ChipSection
                title="FABRICATION"
                dense
                items={[
                  "Prototyping",
                  "CNC",
                  "Manual Mill",
                  "Lathe",
                  "3D Printing",
                  "amateur welding (MIG, HHLBW, Stud, TIG)",
                  "Carbon Fiber Layups",
                  "laserjet",
                  "waterjet",
                ]}
              />

              <ChipSection
                title="EDUCATION"
                dense
                items={["UC Berkeley · Mechanical Engineering · Spring '25"]}
              />

              <ChipSection
                title="INTERESTS"
                dense
                items={[
                  "podcasts",
                  "sci-fi novels",
                  "CNC", "",
                  "Jiu jitsu",
                  "Climbing", "hiking", "backpacking",
                  "Fostering builder communities",
                  "Industry engagement",
                  "Technical Mentorship & STEM advocacy",
                  "Persian food",
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