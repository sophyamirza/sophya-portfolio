"use client";
import { Analytics } from "@vercel/analytics/next"
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

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
        org: "Space Fellow",
        role: "Venture Capital",
        when: "2025 – Present",
        tags: "VENTURE · DEEP TECH · STARTUPS ",
        logo: "/logos/haas.PNG",
      },
      {
        org: "Astranis",
        role: "Propulsion RE Intern",
        when: "JAN 2025 – MAY 2025",
        tags: "PROPULSION · SEALS / MANIFOLDS · TEST STAND · BECKHOFF DAQ",
        logo: "/logos/astranis.PNG",
      },
      {
        org: "Space Technologies & Rocketry",
        role: "Propulsion RE → Deputy Lead",
        when: "NOV 2021 – JAN 2025",
        tags: "PROPULSION · LOX/ETHYL FEED · VALVES · ENGINE TEST",
        logo: "/logos/star.PNG",
      },
      {
        org: "SpaceX",
        role: "Starship Primary Structures RE Intern",
        when: "APR 2024 – AUG 2024",
        tags: "PRIMARY STRUCTURES · MANUFACTURING · TPS · CRYO QUAL",
        logo: "/logos/spacex.PNG",
      },
      {
        org: "SAE International",
        role: "AM / SAF / Aerospace Standards",
        when: "AUG 2023 – AUG 2024",
        tags: "STANDARDS · CERTIFICATION · ADDITIVE · SAF",
        logo: "/logos/sae.PNG",
      },
      {
        org: "NASA — SSL TRACERS",
        role: "Mechanical Intern",
        when: "MAY 2023 – AUG 2023",
        tags: "GSE · STRUCTURAL TEST · SATELLITE INTEGRATION",
        logo: "/logos/NASA.png",
        
      },
      {
        org: "Proterra",
        role: "Thermals / Battery R&D Co-op",
        when: "MAY 2022 – DEC 20s22",
        tags: "BATTERIES · THERMALS · TEST · MANUFACTURING QUALITY",
        logo: "/logos/proterra.PNG",
      },
      {
        org: "Lawrence Berkeley National Lab",
        role: "Cryogenic Mechanical Engineer",
        when: "JAN 2022 – AUG 2023",
        tags: "CRYOGENICS · INSTRUMENTATION · SUPERCONDUCTING SYSTEMS",
        logo: "/logos/lbnl.PNG",
      },
       {
        org: "Design for Nanomanufacturing Lab",
        role: " Mechanical Engineer ",
        when: "AUG 2022 – MAY 2023",
        tags: "PHOTOLITHOGRAPHY · MICROFLUIDICS · VOLUMETRIC ADDITIVE MANUFACTURING · COMPUTER AXIAL LITHOGRAPHY",
        logo: "/logos/DFM.png",
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

        return clamp(1 - dist / (vh * 0.65), 0, 1);
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
    <main className="min-h-screen bg-black text-white">
      {/* Campanile background */}
      <div className="fixed right-24 top-24 bottom-0 pointer-events-none opacity-[0.06]">
        <img src="/images/campanile.svg" className="h-[140vh]" alt="" />
      </div>

      {/* Header */}
      <div className="px-8 md:px-20 pt-20">
        <h1 className="text-5xl md:text-6xl tracking-tight">EXPERIENCE</h1>
        <p className="mt-4 text-white/60 max-w-2xl">
          A vertical timeline of engineering roles across propulsion, structures,
          cryogenics, batteries, and aerospace systems.
        </p>
      </div>

      <section className="relative mt-14 pb-32">
        {/* center line */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-white/15" />

        <div className="mx-auto max-w-6xl px-6 md:px-16">
          <div className="flex flex-col gap-16">
            {milestones.map((m, i) => {
              const left = i % 2 === 0;
              const active = i === activeIndex;
              const v = vis[i] ?? 0;

              return (
                <div
                  key={i}
                  ref={(el) => {
  itemRefs.current[i] = el;
}}

                  className="relative"
                  style={{
                    opacity: 0.35 + v * 0.65,
                    transform: `translate3d(0, ${Math.round((1 - v) * 18)}px, 0)`,
                    transition: "opacity 160ms linear, transform 160ms linear",
                  }}
                >
                  {/* node */}
                  <div className="absolute left-1/2 top-10 -translate-x-1/2">
                    <div
                      style={{
                        width: active ? 14 : 10,
                        height: active ? 14 : 10,
                        borderRadius: "50%",
                        background: active
                          ? "rgba(255,255,255,0.95)"
                          : "rgba(255,255,255,0.7)",
                        boxShadow: active
                          ? "0 0 24px rgba(255,255,255,0.2)"
                          : "0 0 14px rgba(255,255,255,0.1)",
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className={left ? "md:pr-10" : "md:col-start-2 md:pl-10"}>
                      <div
                        className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm"
                        style={{
                          borderColor: active
                            ? "rgba(255,255,255,0.22)"
                            : "rgba(255,255,255,0.10)",
                          boxShadow: active
                            ? "0 0 40px rgba(255,255,255,0.08)"
                            : "0 0 28px rgba(255,255,255,0.04)",
                        }}
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <Image src={m.logo} alt={m.org} width={36} height={36} />

                            {m.secondaryLogo && (
                              <Image
                                src={m.secondaryLogo}
                                alt="SSL"
                                width={30}
                                height={30}
                              />
                            )}
                          </div>

                          <div className="text-xs tracking-[0.28em] text-white/55">
                            {m.when}
                          </div>
                        </div>

                        <div className="text-2xl">{m.org}</div>
                        <div className="text-white/75">{m.role}</div>

                        <div className="mt-3 text-[11px] tracking-[0.18em] text-white/45">
                          {m.tags}
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block" />
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
