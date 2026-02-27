"use client";

import StarOrbsBackground from "@/components/StarOrbsBackground";
import { Analytics } from "@vercel/analytics/next";
import React, { useEffect, useMemo, useRef, useState } from "react";
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

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

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
        when: "APR 2024 – AUG 2024 (5 Mos)" ,
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
        tags: "GSE DESIGN· TVAC, VIBE, MOI TESTING · INTEGRATION  ·  PNEUMATIC PROTOTYPING",
        logo: "/logos/NASA.png",
      },
      {
        org: "Proterra",
        role: "Thermals / Battery R&D Co-op",
        when: "MAY 2022 – DEC 2022 (8 Mos)",
        tags: "BATTERIES · THERMALS · TEST FIXTURE DESIGN· MANUFACTURING QUALITY",
        logo: "/logos/proterra.PNG",
      },
      {
        org: "Lawrence Berkeley National Lab",
        role: "Cryogenic Mechanical Engineer",
        when: "JAN 2022 – AUG 2023 (1.5 YR)",
        tags: "CRYOGENICS · INSTRUMENTATION DESIGN· SUPERCONDUCTING SYSTEMS",
        logo: "/logos/lbnl.PNG",
      },
      {
        org: "Design for Nanomanufacturing Lab",
        role: "Mechanical Engineer",
        when: "AUG 2022 – MAY 2023 (1 YR)",
        tags:
          "PHOTOLITHOGRAPHY · MICROFLUIDICS DESIGN· VOLUMETRIC ADDITIVE MANUFACTURING · COMPUTER AXIAL LITHOGRAPHY",
        logo: "/logos/DFM.png",
      },
      {
        org: "Space Technologies & Rocketry",
        role: "Propulsion RE → Deputy Lead",
        when: "NOV 2021 – JAN 2025 (3+ YR)",
        tags: "PROPULSION · LOX/ETHYL FEED · VALVES · ENGINE TEST",
        logo: "/logos/star.PNG",
      },
    ],
    []
  );

  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [vis, setVis] = useState<number[]>(() => milestones.map(() => 0));

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight || 1;

      let bestIdx = 0;
      let bestDist = Infinity;

      const nextVis = milestones.map((_, i) => {
        const el = itemRefs.current[i];
        if (!el) return 0;

        const r = el.getBoundingClientRect();
        const center = r.top + r.height * 0.5;
        const focus = vh * 0.45;
        const dist = Math.abs(center - focus);

        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }

        return clamp(1 - dist / (vh * 0.75), 0, 1);
      });

      setActiveIndex(bestIdx);
      setVis(nextVis);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [milestones]);

  return (
    <main className="min-h-screen bg-black text-white relative">
      <Analytics />

      {/* 🌌 glowing orb background */}
      <StarOrbsBackground />

      {/* subtle haze */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_18%_12%,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_650px_at_78%_18%,rgba(6,182,212,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_70%_78%,rgba(239,68,68,0.05),transparent_62%)]" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.62)_60%,rgba(0,0,0,0.95)_100%)]" />
      </div>

      {/* Campanile watermark */}
      <div className="pointer-events-none fixed inset-y-0 right-0 hidden md:block">
        <div
          className={[
            "sticky top-15 h-[calc(100vh-6rem)] w-[460px]",
            "invert opacity-[0.12] mix-blend-screen",
            "[mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]",
          ].join(" ")}
        >
          <img
            src="/images/campanile.svg"
            alt=""
            className="h-full w-full object-contain object-right"
          />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-8 md:px-20 pt-20">
        <div className="flex items-end gap-6 flex-wrap">
          <h1 className="text-5xl md:text-6xl tracking-tight">EXPERIENCE</h1>

          <Link
            href="/contact#resume"
            className={[
              "inline-flex items-center rounded-full border border-white/15",
              "bg-white/[0.03] px-5 py-2 text-xs tracking-[0.22em] uppercase",
              "text-white/80 hover:text-white hover:border-white/25",
              "transition backdrop-blur-sm",
              "mb-2",
            ].join(" ")}
          >
            Detailed Resume
          </Link>
        </div>

        <div className="mt-4 h-[2px] w-44 bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-80" />

        <p className="mt-4 text-white/60 max-w-2xl">
          A timeline of engineering roles across propulsion, structures,
          cryogenics, batteries, and research.
        </p>
      </div>

      {/* Timeline */}
      <section className="relative z-10 mt-14 pb-32">
        <div className="relative mx-auto max-w-7xl px-6 md:px-16">
          <div className="pointer-events-none hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-white/15" />

          <div className="flex flex-col gap-12 md:gap-14">
            {milestones.map((m, i) => {
              const left = i % 2 === 0;
              const active = i === activeIndex;
              const v = vis[i] ?? 0;

              const base = 0.62;
              const opacity = base + (1 - base) * v;

              const motionStyle: React.CSSProperties = {
                opacity,
                transform: `translate3d(0, ${Math.round((1 - v) * 10)}px, 0)`,
                transition: "opacity 220ms ease, transform 220ms ease",
              };

              const cardStyle: React.CSSProperties = {
                borderColor: active
                  ? "rgba(255,255,255,0.24)"
                  : "rgba(255,255,255,0.10)",
                boxShadow: active
                  ? "0 0 44px rgba(255,255,255,0.09)"
                  : "0 0 28px rgba(255,255,255,0.04)",
              };

              const Card = (
                <div className="relative" style={motionStyle}>
                  <div
                    className="rounded-2xl border bg-white/[0.02] p-7 md:p-8 backdrop-blur-sm"
                    style={cardStyle}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src={m.logo}
                        alt={m.org}
                        width={44}
                        height={44}
                        className="rounded"
                      />
                      <div className="text-sm tracking-[0.28em] text-white/55">
                        {m.when}
                      </div>
                    </div>

                    <div className="text-3xl md:text-4xl">{m.org}</div>
                    <div className="text-white/75 text-base md:text-lg">
                      {m.role}
                    </div>

                    <div className="mt-4 text-xs md:text-sm tracking-[0.18em] text-white/45">
                      {m.tags}
                    </div>

                    <div className="mt-7 h-px w-52 bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-60" />
                  </div>
                </div>
              );

              return (
                <div
                  key={`${m.org}-${m.when}`}
                  ref={(el) => {
  itemRefs.current[i] = el;
}}
                  className="grid grid-cols-1 md:grid-cols-[1fr_72px_1fr] gap-y-8 md:gap-y-0"
                >
                  <div className="md:col-start-1">
                    {left ? Card : <div className="hidden md:block" />}
                  </div>

                  <div className="relative md:col-start-2 flex items-start justify-center">
                    <div className="relative mt-12">
                      <div
                        className="rounded-full"
                        style={{
                          width: active ? 14 : 10,
                          height: active ? 14 : 10,
                          background: active
                            ? "rgba(255,255,255,0.95)"
                            : "rgba(255,255,255,0.70)",
                        }}
                      />
                    </div>
                  </div>

                  <div className="md:col-start-3">
                    {!left ? Card : <div className="hidden md:block" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}