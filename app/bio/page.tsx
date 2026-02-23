"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

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

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.06,
      },
    },
  };

  const chip = {
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

  // Default chip style
  const defaultChip =
    "border border-white/12 bg-white/[0.03] text-white/75";

  // Thermal chip style (gradient border)
  // Technique: outer gradient wrapper + inner dark pill
  const thermalOuter =
    `p-[1px] rounded-full ${THERMAL} ` +
    "shadow-[0_0_22px_rgba(255,255,255,0.08)]";
  const thermalInner =
    "rounded-full border border-white/10 bg-black/60 text-white/85";

  return (
    <div className="pt-7 first:pt-0">
      <div className="text-xs tracking-[0.35em] text-white/55">{title}</div>
      <div className={`mt-3 h-[2px] w-28 ${THERMAL} opacity-45`} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={[
          "mt-4 flex flex-wrap",
          dense ? "gap-2" : "gap-2",
          // tighter wrap on mobile (less horizontal dead space)
          "max-w-full",
        ].join(" ")}
      >
        {clean.map((x) =>
          variant === "thermal" ? (
            <motion.span key={x} variants={chip} className={thermalOuter}>
              <span className={`${baseChip} ${sizeChip} ${thermalInner}`}>
                {x}
              </span>
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
        <h1 className="mt-4 text-5xl sm:text-6xl md:text-7xl tracking-tight">
          SOPHYA MIRZA
        </h1>
        <div className={`mt-5 h-[2px] w-64 ${THERMAL} opacity-70`} />
        <p className="mt-6 max-w-3xl text-white/65">
          Mechanical engineer designing, building, and testing hardware at the
          extremes. Bias toward shipping. Tight feedback loops. Extreme
          ownership.
        </p>

        {/* grid */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:gap-12 lg:grid-cols-[360px_minmax(0,1fr)_300px]">
          {/* LEFT IMAGE */}
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
                LOS ANGELES · SAN FRANCISCO
              </div>
            </div>
          </aside>

          {/* CENTER */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-10">
            <div className="text-xs tracking-[0.35em] text-white/50">BIO</div>
            <div className={`mt-4 h-[2px] w-44 ${THERMAL} opacity-55`} />

            <div className="mt-8 space-y-6 text-[15px] sm:text-[16px] leading-relaxed text-white/75">
              <p>
                A few years ago, a fortune cookie told me that I create
                enthusiasm. I grew up in LA, a melting pot shaped by backyard
                innovation, late night takeout, and the constant roar of LAX.
                Somewhere between the breakthrough tech in Gundo and those
                fortune cookies, I leaned into that idea. Pairing my energy with
                extreme ownership I’ve had the privilege to own high consequence
                hardware at SpaceX, NASA, Astranis, SSL, Proterra, and beyond.
              </p>

              <p>
                I’ve always been a tinkerer, inventor, and builder. What started
                as robotics competitions and science fairs to meet the President,
                quickly became something deeper the day I watched the Space
                Shuttle fly over my school on its final journey. That moment lit
                a fuse that has been burning ever since. Years later, I found
                myself underneath that same shuttle at the same science center,
                doing what I loved most while earning national awards and
                scholarships along the way.
              </p>

              <p>
                At 14, I really ran with it, spending a summer in rural NC living
                alongside adventurous college students, climbing in the Chimneys,
                roaming wind farms, touring hydroelectric dams, and getting
                mesmerized by turbines and generators. That experience sparked
                my earliest projects refurbishing generators and cemented what I
                care about most: scrappy hands on engineering, validation
                through testing, and learning by doing.
              </p>

              <p>
                Those principles still guide me today, now, paired with a bigger
                vision for impact.
              </p>

              <p>
                I hope to bring that same enthusiasm, ownership, and curiosity
                to your team!
              </p>
            </div>

            {/* MANIFESTO */}
            <div className="mt-14">
              <div className="text-xs tracking-[0.35em] text-white/50">
                MANIFESTO
              </div>
              <div className={`mt-4 h-[2px] w-56 ${THERMAL} opacity-55`} />

              <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-white/70">
                <p>
                  <Highlight>Build real things.</Highlight>
                </p>
                <p>Test early. Break fast. Learn faster.</p>
                <p>
                  <Highlight tone="warm">Own the outcome end to end.</Highlight>
                </p>
                <p>Optimize for signal, not comfort.</p>
                <p>Bias toward shipping.</p>
                <p>Respect craft. Earn trust.</p>
                <p>Do hard things with good people.</p>
              </div>
            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
              {/* EXPERIENCE gets thermal chips */}
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
                items={["Prototyping", "CNC", "3D Printing", "Composites"]}
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