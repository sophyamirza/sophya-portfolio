"use client";

import StarOrbsBackground from "@/components/StarOrbsBackground";
import { Analytics } from "@vercel/analytics/next";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Milestone = {
  org: string;
  role: string;
  when: string;
  tags: string;
  logo: string;
  secondaryLogo?: string;
};

export default function IndustryPage() {
  const milestones: Milestone[] = useMemo(
    () => [
      {
        org: "VC Technical Fellow",
        role: "Venture Capital",
        when: "2025 – Present",
        tags: "VENTURE · DEEP TECH · STARTUPS",
        logo: "/logos/haas.PNG",
      },
      {
        org: "Astranis",
        role: "Propulsion RE Intern",
        when: "JAN 2025 – MAY 2025 (5 Mos)",
        tags: "PROPULSION · SEALS / MANIFOLDS · TEST STAND · BECKHOFF DAQ",
        logo: "/logos/astranis.PNG",
      },
      {
        org: "SpaceX",
        role: "Starship Primary Structures RE Intern",
        when: "APR 2024 – AUG 2024 (5 Mos)",
        tags: "PRIMARY STRUCTURES DESIGN · WELD PROCESSES · TPS · HEADER TANK QUAL",
        logo: "/logos/spacex.PNG",
      },
      {
        org: "SAE International",
        role: "AM / SAF / Aerospace Standards",
        when: "AUG 2023 – AUG 2024 (1 YR)",
        tags: "STANDARDS · SOFTWARE AUTOMATION · CERTIFICATION · ADDITIVE MANUFACTURING · SUSTAINABLE AVIATION FUELS",
        logo: "/logos/sae.PNG",
      },
      {
        org: "NASA: TRACERS MISSION",
        role: "Mechanical Intern",
        when: "MAY 2023 – AUG 2023 (4 Mos)",
        tags: "GSE DESIGN · TVAC, VIBE, MOI TESTING · INTEGRATION · PNEUMATIC PROTOTYPING",
        logo: "/logos/NASA.png",
      },
      {
        org: "Proterra",
        role: "Thermals / Battery R&D Co-op",
        when: "MAY 2022 – DEC 2022 (8 Mos)",
        tags: "BATTERIES · THERMALS · TEST FIXTURE DESIGN · MANUFACTURING QUALITY",
        logo: "/logos/proterra.PNG",
      },
      {
        org: "Lawrence Berkeley National Lab",
        role: "Cryogenic Mechanical Engineer",
        when: "JAN 2022 – AUG 2023 (1.5 YR)",
        tags: "CRYOGENICS · INSTRUMENTATION DESIGN · SUPERCONDUCTING SYSTEMS",
        logo: "/logos/lbnl.PNG",
      },
      {
        org: "Design for Nanomanufacturing Lab",
        role: "Mechanical Engineer",
        when: "AUG 2022 – MAY 2023 (1 YR)",
        tags: "PHOTOLITHOGRAPHY · MICROFLUIDICS DESIGN · VOLUMETRIC ADDITIVE MANUFACTURING · COMPUTER AXIAL LITHOGRAPHY",
        logo: "/logos/DFM.png",
      },
      {
        org: "Space Technologies & Rocketry",
        role: "Propulsion RE → Deputy Lead",
        when: "NOV 2021 – JAN 2025 (3+ YR)",
        tags: "PROPULSION · LOX/ETHYL FEED · VALVES · ENGINE TEST",
        logo: "/logos/star.PNG",
      },
      {
        org: "Avanti Technologies",
        role: "Director of Systems Engineering · Lead RMO",
        when: "2020 – 2021",
        tags: "SYSTEM ARCHITECTURE · QUALITY · INTEGRATION · RISK MANAGEMENT · SPS",
        logo: "/logos/avantilogo.PNG",
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const active = milestones[activeIndex];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Analytics />
      <StarOrbsBackground />

      {/* haze */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_18%_12%,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_650px_at_78%_18%,rgba(6,182,212,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_70%_78%,rgba(239,68,68,0.05),transparent_62%)]" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.62)_60%,rgba(0,0,0,0.95)_100%)]" />
      </div>

      {/* campanile watermark */}
      <div className="pointer-events-none fixed inset-0 hidden md:block">
        <div
          className={[
            "absolute inset-0",
            "opacity-[0.05] mix-blend-screen invert",
            "bg-[url('/images/campanile.svg')] bg-repeat",
            "bg-[length:300px_300px]",
            "bg-[position:0px_0px]",
            "[mask-image:radial-gradient(circle_at_center,black_0%,black_55%,transparent_78%)]",
          ].join(" ")}
        />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] flex-col px-6 pb-8 pt-16 md:px-10 lg:px-12">
        {/* Header */}
        <div className="shrink-0">
          <div className="flex flex-wrap items-end gap-6">
            <h1 className="text-4xl tracking-tight md:text-5xl lg:text-6xl">
              EXPERIENCE
            </h1>

            <Link
              href="/contact#resume"
              className="mb-1 inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-5 py-2 text-[11px] uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm transition hover:border-white/25 hover:text-white"
            >
              Detailed Resume
            </Link>
          </div>

          <div className="mt-4 h-[2px] w-44 bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-80" />

          <p className="mt-4 max-w-2xl text-sm text-white/60 md:text-base">
            A selection of engineering roles across propulsion, structures,
            cryogenics, batteries, research, and venture.
          </p>
        </div>

        {/* Main Bento Layout */}
        <div className="mt-8 grid min-h-0 flex-1 grid-cols-1 gap-6 xl:grid-cols-[1.15fr_1.85fr]">
          {/* Info Card */}
          <div className="min-h-0">
            <div className="flex h-full min-h-[320px] flex-col rounded-[28px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm md:min-h-[360px] md:p-6 lg:p-7">
              <div className="flex items-center gap-4">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] md:h-20 md:w-20">
                  <Image
                    src={active.logo}
                    alt={active.org}
                    fill
                    className="object-contain p-2.5"
                  />
                </div>

                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-[0.34em] text-white/50 md:text-xs">
                    {active.when}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="max-w-[14ch] text-4xl leading-[0.95] tracking-tight text-white md:text-5xl">
                  {active.org}
                </h2>
                <p className="mt-3 text-2xl leading-tight text-white/75 md:text-3xl">
                  {active.role}
                </p>
              </div>

              <div className="mt-8 text-sm uppercase tracking-[0.22em] text-white/45 md:text-[15px]">
                {active.tags}
              </div>

              <div className="mt-auto pt-8">
                <div className="h-[2px] w-56 max-w-full bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-80" />
              </div>
            </div>
          </div>

          {/* Logo Grid */}
          <div className="min-h-0">
            <div className="grid h-full grid-cols-5 grid-rows-2 gap-3 md:gap-4">
              {milestones.map((m, i) => {
                const isActive = i === activeIndex;

                return (
                  <button
                    key={`${m.org}-${m.when}`}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={[
                      "group relative flex min-h-0 items-center justify-center overflow-hidden rounded-[22px] border transition-all duration-300",
                      "bg-white/[0.03] backdrop-blur-sm",
                      isActive
                        ? "border-white/30 shadow-[0_0_32px_rgba(255,255,255,0.08)]"
                        : "border-white/10 hover:border-white/20",
                    ].join(" ")}
                    aria-label={`Show ${m.org}`}
                  >
                    <div
                      className={[
                        "absolute inset-0 opacity-0 transition-opacity duration-300",
                        isActive ? "opacity-100" : "group-hover:opacity-100",
                      ].join(" ")}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(120px_80px_at_50%_45%,rgba(255,255,255,0.08),transparent_70%)]" />
                    </div>

                    <div className="relative flex h-full w-full items-center justify-center p-3 md:p-4">
                      <div className="relative h-full w-full">
                        <Image
                          src={m.logo}
                          alt={m.org}
                          fill
                          className={[
                            "object-contain transition-all duration-300",
                            isActive
                              ? "scale-100 opacity-100"
                              : "scale-[0.96] opacity-85 group-hover:scale-100 group-hover:opacity-100",
                          ].join(" ")}
                        />
                      </div>
                    </div>

                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-90" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}