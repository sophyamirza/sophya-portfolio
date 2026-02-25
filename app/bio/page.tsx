"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
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
        staggerChildren: 0.035,
        delayChildren: 0.06,
      },
    },
  };

  const chip: Variants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const baseChip =
    "inline-flex items-center rounded-full backdrop-blur-md transition " +
    "hover:bg-white/[0.06] hover:border-white/25 " +
    "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.35)] " +
    "active:scale-[0.99]";

  const sizeChip = dense
    ? "px-2.5 py-1 text-[11px] sm:text-[12px]"
    : "px-3 py-1 text-[11px] sm:text-[12px]";

  const defaultChip = "border border-white/12 bg-white/[0.03] text-white/75";

  // ✅ Single-color highlight chips (no rainbow)
  const thermalInner =
    "border border-white/10 text-white/90 " +
    "bg-[rgba(0,179,255,0.22)] " +
    "shadow-[0_0_18px_rgba(0,179,255,0.18)]";

  return (
    <div className="pt-7 first:pt-0">
      <div className="text-xs tracking-[0.35em] text-white/55">{title}</div>
      <div className={`mt-3 h-[2px] w-28 ${THERMAL} opacity-45`} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={["mt-4 flex flex-wrap", "gap-2", "max-w-full"].join(" ")}
      >
        {clean.map((x) =>
          variant === "thermal" ? (
            <motion.span
              key={x}
              variants={chip}
              className={`${baseChip} ${sizeChip} ${thermalInner}`}
            >
              {x}
            </motion.span>
          ) : (
            <motion.span
              key={x}
              variants={chip}
              className={`${baseChip} ${sizeChip} ${defaultChip}`}
            >
              {x}
            </motion.span>
          )
        )}
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
  const photos = useMemo(
    () => [
      { src: "/images/bio.jpg", alt: "Sophya Mirza headshot", caption: "" },
      {
        src: "/images/scicenter.jpg",
        alt: "California Science Center: Scott Manley (left), Sophya (Center), Jeanette Epps (Right)",
        caption:
          "California Science Center: Scott Manley (left), Sophya (Center), Jeanette Epps (Right)",
      },
    ],
    []
  );

  const [idx, setIdx] = useState(0);

  const next = () => setIdx((i) => (i + 1) % photos.length);
  const prev = () => setIdx((i) => (i - 1 + photos.length) % photos.length);

  useEffect(() => {
    const ms = 6000;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % photos.length);
    }, ms);
    return () => clearInterval(t);
  }, [photos.length]);

  const fade: Variants = {
    hidden: { opacity: 0, scale: 1.01 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  };

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

        {/* ✅ Title in the same editorial serif style */}
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
        <p className="mt-6 max-w-3xl text-white/65">
          DESIGN. BUILD. TEST. SHIP.
        
        </p>

        {/* grid */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:gap-12 lg:grid-cols-[360px_minmax(0,1fr)_300px]">
          {/* LEFT IMAGE (carousel) */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-4">
              <div className={`h-[2px] w-full ${THERMAL} opacity-35`} />

              <div className="mt-4 relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={photos[idx].src}
                    variants={fade}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <Image
                      src={photos[idx].src}
                      alt={photos[idx].alt}
                      fill
                      sizes="360px"
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* arrows + caption */}
              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous photo"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-white/75 hover:bg-white/[0.06] hover:border-white/25"
                >
                  ‹
                </button>

                <div className="px-2 text-center text-[11px] tracking-[0.28em] text-white/50">
                  {photos[idx].caption
                    ? photos[idx].caption
                    : "LOS ANGELES · SAN FRANCISCO"}
                </div>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Next photo"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-white/75 hover:bg-white/[0.06] hover:border-white/25"
                >
                  ›
                </button>
              </div>
            </div>
          </aside>

          {/* CENTER */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-10">
            <div className="text-xs tracking-[0.35em] text-white/50">BIO</div>
            <div className={`mt-4 h-[2px] w-44 ${THERMAL} opacity-55`} />

            <div className="mt-8 space-y-6 text-[15px] sm:text-[16px] leading-relaxed text-white/75">
              <p>
                A few years ago, a fortune cookie told me I create enthusiasm. Growing up in LA between backyard builds, takeout and the roar of LAX, I learned early that progress comes from ownership and iteration. Watching the Space Shuttle fly over my school to the California Science Center and watching videos of Anousheh Ansari, another American Iranian woman reach space made this path tangible and set the direction.
              </p>

              <p>
                I’ve always been a builder. What began with robotics competitions and science fairs as a chance to meet the President evolved into hands on engineering focused on design build test loops. A formative summer touring wind farms and hydroelectric dams led me to refurbish generators and sparked a lasting fascination with energy systems, turbomachinery, and high consequence hardware.
              </p>

              <p>
                Since then, I’ve worked across propulsion and satellite systems, owning components from CAD and analysis through manufacturing, integration, and test. My focus has been solving real hardware problems under schedule and performance constraints closing loops quickly, validating through data, and taking full responsibility for outcomes.
              </p>

              <p>
                Those principles still guide me today, now, paired with a bigger
                vision for impact.
              </p>

              <p>
                I aim to bring that same rigor, enthusiasm, curiosity, and bias toward execution to your team!
              </p>
            </div>

            {/* MANIFESTO */}
            <div className="mt-14">
              <div className="text-xs tracking-[0.35em] text-white/50">
                MANIFESTO
              </div>
              <div className={`mt-4 h-[2px] w-56 ${THERMAL} opacity-55`} />

              <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-white/70">
                <p>
                  Our future depends on <Highlight>making things again</Highlight>
                  , with fast loops from design to test to iteration.
                </p>
                <p>
                  <Highlight tone="warm">Onshoring is compression</Highlight>:
                  shorter lead times, tighter feedback, and better ownership.
                </p>
                <p>
                  Extreme ownership closes the loop: if it breaks, I own it. If a
                  test fails, I own it.
                </p>
                <p>
                  Success is cycle time.{" "}
                  <Highlight tone="cool">Ship hardware that survives reality.</Highlight>
                </p>

                {/* CTA */}
                <div className="pt-4">
                  <a
                    href="https://sophyamirza.substack.com/p/build-real-things"
                    target="_blank"
                    rel="noreferrer"
                    className={[
                      "inline-flex items-center justify-center gap-2",
                      "rounded-full px-4 py-2 text-[12px] sm:text-[13px]",
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
                  "Space Sciences Lab",
                  "SAE International",
                  "Lawrence Berkeley National Lab",
                ]}
              />

              <ChipSection
                title="DESIGN"
                dense
                items={["NX", "CATIA", "SolidWorks", "GD&T", "PLM", "PDM"]}
              />

              <ChipSection
                title="FABRICATION"
                dense
                items={[
                  "Prototyping",
                  "CNC",
                  "Manual Milling + Turning",
                  "3D Printing",
                  "amateur welding (MIG, HHLBW, Stud, TIG)",
                  "CF Layups",
                  "waterjet/laser",
                ]}
              />

              <ChipSection
                title="EDUCATION"
                dense
                items={["UC Berkeley · Mechanical Engineering"]}
              />

              <ChipSection
                title="INTERESTS"
                dense
                items={[
                  "Investing podcasts & market mechanics",
                  "Tech disruptors & sci-fi novels",
                  "CNC & manual machining",
                  "Jiu jitsu",
                  "Climbing, hiking & solo backpacking",
                  "Fostering builder communities",
                  "Industry engagement",
                  "Mentorship & STEM advocacy",
                  "Cooking Persian food",
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