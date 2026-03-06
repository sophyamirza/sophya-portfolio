"use client";

import StarOrbsBackground from "@/components/StarOrbsBackground";
import { Analytics } from "@vercel/analytics/next";
import React, { useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type Milestone = {
  org: string;
  role: string;
  when: string;
  tags: string;
  logo: string;
  size?: "lg" | "md" | "sm";
};

export default function IndustryPage() {

  const milestones: Milestone[] = useMemo(
    () => [

      {
        org: "Avanti Technologies",
        role: "Director of Systems Engineering",
        when: "2020 – 2021",
        tags: "SYSTEM ARCHITECTURE · QUALITY · INTEGRATION",
        logo: "/logos/avantilogo.PNG",
        size: "sm",
      },

      {
        org: "Space Technologies & Rocketry",
        role: "Propulsion RE → Deputy Lead",
        when: "2021 – 2025",
        tags: "PROPULSION · LOX/ETHYL · ENGINE TEST",
        logo: "/logos/star.PNG",
        size: "md",
      },

      {
        org: "Lawrence Berkeley National Lab",
        role: "Cryogenic Mechanical Engineer",
        when: "2022 – 2023",
        tags: "CRYOGENICS · SUPERCONDUCTING SYSTEMS",
        logo: "/logos/lbnl.PNG",
        size: "md",
      },

      {
        org: "Proterra",
        role: "Battery Thermal R&D",
        when: "2022",
        tags: "BATTERIES · THERMALS · TEST FIXTURES",
        logo: "/logos/proterra.PNG",
        size: "md",
      },

      {
        org: "NASA TRACERS",
        role: "Mechanical Intern",
        when: "2023",
        tags: "TVAC · VIBE · INTEGRATION",
        logo: "/logos/NASA.png",
        size: "lg",
      },

      {
        org: "SAE International",
        role: "Aerospace Standards",
        when: "2023 – 2024",
        tags: "STANDARDS · CERTIFICATION",
        logo: "/logos/sae.PNG",
        size: "sm",
      },

      {
        org: "SpaceX",
        role: "Starship Structures",
        when: "2024",
        tags: "PRIMARY STRUCTURES · TPS",
        logo: "/logos/spacex.PNG",
        size: "lg",
      },

      {
        org: "Astranis",
        role: "Propulsion RE Intern",
        when: "2025",
        tags: "PROPULSION · TEST STAND",
        logo: "/logos/astranis.PNG",
        size: "lg",
      },

      {
        org: "VC Technical Fellow",
        role: "Venture Capital",
        when: "2025 – Present",
        tags: "VENTURE · DEEP TECH",
        logo: "/logos/haas.PNG",
        size: "sm",
      },

    ],
    []
  );

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const sizeClass = (size?: string) => {

    if (size === "lg") return "w-[420px]";
    if (size === "md") return "w-[340px]";
    return "w-[260px]";
  };

  return (

    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      <Analytics />
      <StarOrbsBackground />

      {/* HEADER */}

      <div className="relative z-10 px-8 md:px-20 pt-24">

        <div className="flex items-end gap-6 flex-wrap">

          <h1 className="text-6xl tracking-tight">
            EXPERIENCE
          </h1>

          <Link
            href="/contact#resume"
            className="mb-2 rounded-full border border-white/20 px-5 py-2 text-xs tracking-[0.25em] uppercase hover:border-white/40"
          >
            Detailed Resume
          </Link>

        </div>

        <div className="mt-5 h-[2px] w-40 bg-gradient-to-r from-blue-400 via-green-400 to-red-500" />

      </div>

      {/* HORIZONTAL TIMELINE */}

      <section className="relative mt-24">

        {/* timeline line */}

        <div className="absolute left-0 right-0 top-[160px] h-[2px] bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 via-orange-400 to-red-500 opacity-50" />

        {/* scroll container */}

        <div
          ref={scrollRef}
          className="relative z-10 flex gap-20 overflow-x-auto px-20 pb-24 pt-10 scrollbar-none"
        >

          {milestones.map((m, i) => (

            <div
              key={i}
              className={`relative flex-shrink-0 ${sizeClass(m.size)}`}
            >

              {/* timeline node */}

              <div className="absolute left-10 top-[140px] h-4 w-4 rounded-full bg-white/80" />

              {/* card */}

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:border-white/30 transition">

                <div className="flex items-center gap-4 mb-4">

                  <Image
                    src={m.logo}
                    alt={m.org}
                    width={48}
                    height={48}
                    className="object-contain"
                  />

                  <div className="text-xs tracking-[0.25em] text-white/50">
                    {m.when}
                  </div>

                </div>

                <div className="text-3xl mb-2">
                  {m.org}
                </div>

                <div className="text-white/70 mb-4">
                  {m.role}
                </div>

                <div className="text-xs tracking-[0.15em] text-white/40">
                  {m.tags}
                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}