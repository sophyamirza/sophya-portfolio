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
  size?: "lg" | "md" | "sm";
  x: number;
  y: number;
};

type NodeState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));

export default function IndustryPage() {
  const milestones: Milestone[] = useMemo(
    () => [
      {
        org: "VC Technical Fellow",
        role: "Venture Capital",
        when: "2025 – Present",
        tags: "VENTURE · DEEP TECH · STARTUPS",
        logo: "/logos/haas.PNG",
        size: "sm",
        x: 10,
        y: 54,
      },
      {
        org: "Astranis",
        role: "Propulsion RE Intern",
        when: "JAN 2025 – MAY 2025 (5 Mos)",
        tags: "PROPULSION · SEALS / MANIFOLDS · TEST STAND · BECKHOFF DAQ",
        logo: "/logos/astranis.PNG",
        size: "lg",
        x: 20,
        y: 18,
      },
      {
        org: "SpaceX",
        role: "Starship Primary Structures RE Intern",
        when: "APR 2024 – AUG 2024 (5 Mos)",
        tags: "PRIMARY STRUCTURES DESIGN · WELD PROCESSES · TPS · HEADER TANK QUAL",
        logo: "/logos/spacex.PNG",
        size: "lg",
        x: 69,
        y: 20,
      },
      {
        org: "SAE International",
        role: "AM / SAF / Aerospace Standards",
        when: "AUG 2023 – AUG 2024 (1 YR)",
        tags: "STANDARDS · SOFTWARE AUTOMATION · CERTIFICATION · ADDITIVE MANUFACTURING · SUSTAINABLE AVIATION FUELS",
        logo: "/logos/sae.PNG",
        size: "sm",
        x: 84,
        y: 49,
      },
      {
        org: "NASA: TRACERS MISSION",
        role: "Mechanical Intern",
        when: "MAY 2023 – AUG 2023 (4 Mos)",
        tags: "GSE DESIGN · TVAC, VIBE, MOI TESTING · INTEGRATION · PNEUMATIC PROTOTYPING",
        logo: "/logos/NASA.png",
        size: "lg",
        x: 45,
        y: 42,
      },
      {
        org: "Design for Nanomanufacturing Lab",
        role: "Mechanical Engineer",
        when: "AUG 2022 – MAY 2023 (1 YR)",
        tags: "PHOTOLITHOGRAPHY · MICROFLUIDICS DESIGN · VOLUMETRIC ADDITIVE MANUFACTURING · COMPUTER AXIAL LITHOGRAPHY",
        logo: "/logos/DFM.png",
        size: "sm",
        x: 86,
        y: 72,
      },
      {
        org: "Proterra",
        role: "Thermals / Battery R&D Co-op",
        when: "MAY 2022 – DEC 2022 (8 Mos)",
        tags: "BATTERIES · THERMALS · TEST FIXTURE DESIGN · MANUFACTURING QUALITY",
        logo: "/logos/proterra.PNG",
        size: "md",
        x: 22,
        y: 74,
      },
      {
        org: "Lawrence Berkeley National Lab",
        role: "Cryogenic Mechanical Engineer",
        when: "JAN 2022 – AUG 2023 (1.5 YR)",
        tags: "CRYOGENICS · INSTRUMENTATION DESIGN · SUPERCONDUCTING SYSTEMS",
        logo: "/logos/lbnl.PNG",
        size: "md",
        x: 63,
        y: 73,
      },
      {
        org: "Space Technologies & Rocketry",
        role: "Propulsion RE → Deputy Lead",
        when: "NOV 2021 – JAN 2025 (3+ YR)",
        tags: "PROPULSION · LOX/ETHYL FEED · VALVES · ENGINE TEST",
        logo: "/logos/star.PNG",
        size: "md",
        x: 43,
        y: 88,
      },
      {
        org: "Avanti Technologies",
        role: "DIRECTOR OF SYSTEMS ENGINEERING · LEAD RMO",
        when: "2020 – 2021",
        tags: "SYSTEM ARCHITECTURE · QUALITY · INTEGRATION · RISK MANAGEMENT · SPS",
        logo: "/logos/avantilogo.PNG",
        size: "sm",
        x: 8,
        y: 89,
      },
    ],
    []
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const frameRef = useRef<number | null>(null);

  const basePositions = useMemo(
    () =>
      milestones.map((m) => ({
        x: m.x,
        y: m.y,
      })),
    [milestones]
  );

  const [nodes, setNodes] = useState<NodeState[]>(
    milestones.map((m) => ({
      x: m.x,
      y: m.y,
      vx: 0,
      vy: 0,
    }))
  );

  useEffect(() => {
    let t = 0;

    const animate = () => {
      t += 0.012;

      setNodes((prev) =>
        prev.map((node, i) => {
          const base = basePositions[i];
          const m = milestones[i];

          const dxToBase = base.x - node.x;
          const dyToBase = base.y - node.y;

          let ax = dxToBase * 0.012;
          let ay = dyToBase * 0.012;

          const driftX = Math.sin(t * 0.9 + i * 1.7) * 0.04;
          const driftY = Math.cos(t * 1.1 + i * 1.3) * 0.04;

          ax += driftX;
          ay += driftY;

          const mx = mouseRef.current.x;
          const my = mouseRef.current.y;

          const dx = node.x - mx;
          const dy = node.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const repelRadius =
            m.size === "lg" ? 24 : m.size === "md" ? 20 : 16;

          if (dist < repelRadius) {
            const force = (1 - dist / repelRadius) * 0.95;
            const ux = dx / (dist || 1);
            const uy = dy / (dist || 1);
            ax += ux * force;
            ay += uy * force;
          }

          const vx = (node.vx + ax) * 0.9;
          const vy = (node.vy + ay) * 0.9;

          const x = clamp(node.x + vx, 4, 92);
          const y = clamp(node.y + vy, 8, 92);

          return { x, y, vx, vy };
        })
      );

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [basePositions, milestones]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    mouseRef.current = { x, y };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 };
  };

  const sizeClasses = (size: Milestone["size"]) => {
    switch (size) {
      case "lg":
        return "w-[340px] md:w-[380px] min-h-[220px]";
      case "md":
        return "w-[280px] md:w-[310px] min-h-[190px]";
      default:
        return "w-[220px] md:w-[245px] min-h-[160px]";
    }
  };

  const mobileSizeClasses = (size: Milestone["size"]) => {
    switch (size) {
      case "lg":
        return "min-h-[210px]";
      case "md":
        return "min-h-[180px]";
      default:
        return "min-h-[160px]";
    }
  };

  const logoSize = (size: Milestone["size"]) => {
    switch (size) {
      case "lg":
        return 54;
      case "md":
        return 46;
      default:
        return 38;
    }
  };

  const MilestoneCard = ({
    m,
    desktop = false,
  }: {
    m: Milestone;
    desktop?: boolean;
  }) => {
    const isLarge = m.size === "lg";

    return (
      <div
        className={[
          "group relative rounded-[28px] border border-white/12 bg-white/[0.04]",
          "backdrop-blur-md transition-all duration-300",
          "hover:border-white/25 hover:bg-white/[0.07]",
          "hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]",
          desktop ? sizeClasses(m.size) : `w-full ${mobileSizeClasses(m.size)}`,
        ].join(" ")}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_38%)]" />
        <div
          className={[
            "pointer-events-none absolute -inset-[1px] rounded-[28px] opacity-0 blur-xl transition-opacity duration-300",
            isLarge
              ? "bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.16),rgba(255,255,255,0.02),transparent_70%)] group-hover:opacity-100"
              : "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.10),rgba(255,255,255,0.02),transparent_70%)] group-hover:opacity-100",
          ].join(" ")}
        />

        <div className="relative p-5 md:p-6">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/20 md:h-16 md:w-16">
              <Image
                src={m.logo}
                alt={m.org}
                width={logoSize(m.size)}
                height={logoSize(m.size)}
                className="rounded object-contain"
              />
            </div>

            <div className="min-w-0">
              <div
                className={[
                  "tracking-[0.24em] text-white/50",
                  isLarge ? "text-[11px]" : "text-[10px]",
                ].join(" ")}
              >
                {m.when}
              </div>
              <div
                className={[
                  "mt-1 leading-tight text-white",
                  m.size === "lg"
                    ? "text-3xl md:text-4xl"
                    : m.size === "md"
                    ? "text-2xl md:text-3xl"
                    : "text-xl md:text-2xl",
                ].join(" ")}
              >
                {m.org}
              </div>
            </div>
          </div>

          <div
            className={[
              "text-white/78",
              m.size === "lg"
                ? "text-base md:text-lg"
                : m.size === "md"
                ? "text-sm md:text-base"
                : "text-sm",
            ].join(" ")}
          >
            {m.role}
          </div>

          <div
            className={[
              "mt-4 text-white/42",
              m.size === "lg"
                ? "text-xs tracking-[0.16em]"
                : "text-[10px] tracking-[0.14em]",
            ].join(" ")}
          >
            {m.tags}
          </div>

          <div className="mt-6 h-px w-[55%] bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-60" />
        </div>
      </div>
    );
  };

  const connectorPoints = nodes.map((node) => ({
    x: node.x,
    y: node.y,
  }));

  const polylinePoints = connectorPoints
    .map((p) => `${p.x},${p.y}`)
    .join(" ");

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Analytics />
      <StarOrbsBackground />

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_18%_12%,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_650px_at_78%_18%,rgba(6,182,212,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_70%_78%,rgba(239,68,68,0.05),transparent_62%)]" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.62)_60%,rgba(0,0,0,0.95)_100%)]" />
      </div>

      <div className="pointer-events-none fixed inset-0 hidden md:block">
        <div
          className={[
            "absolute inset-0",
            "opacity-[0.06] mix-blend-screen",
            "invert",
            "bg-[url('/images/campanile.svg')] bg-repeat",
            "bg-[length:320px_320px]",
            "bg-[position:0px_0px]",
            "blur-[0.2px]",
            "[mask-image:radial-gradient(circle_at_center,black_0%,black_55%,transparent_78%)]",
          ].join(" ")}
        />
      </div>

      <div className="relative z-10 px-8 pt-20 md:px-20">
        <div className="flex flex-wrap items-end gap-6">
          <h1 className="text-5xl tracking-tight md:text-6xl">EXPERIENCE</h1>

          <Link
            href="/contact#resume"
            className={[
              "mb-2 inline-flex items-center rounded-full border border-white/15",
              "bg-white/[0.03] px-5 py-2 text-xs tracking-[0.22em] uppercase",
              "text-white/80 transition backdrop-blur-sm hover:border-white/25 hover:text-white",
            ].join(" ")}
          >
            Detailed Resume
          </Link>
        </div>

        <div className="mt-4 h-[2px] w-44 bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-80" />

        <p className="mt-4 max-w-2xl text-white/60">
          A floating field of engineering roles across propulsion, structures,
          cryogenics, batteries, research, and venture.
        </p>
      </div>

      {/* Mobile */}
      <section className="relative z-10 px-5 pb-20 pt-10 md:hidden">
        <div className="mx-auto flex max-w-xl flex-col gap-5">
          {milestones.map((m, i) => (
            <div key={`${m.org}-${m.when}`} className="relative">
              <div className="mb-2 text-[11px] tracking-[0.28em] text-white/35">
                {String(i + 1).padStart(2, "0")}
              </div>
              <MilestoneCard m={m} />
            </div>
          ))}
        </div>
      </section>

      {/* Desktop floating */}
      <section className="relative z-10 hidden px-6 pb-24 pt-8 md:block md:px-10">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mx-auto h-[1200px] max-w-[1600px]"
        >
          {/* Chronology connector layer */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chronoLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(0,179,255,0.55)" />
                <stop offset="35%" stopColor="rgba(57,255,20,0.45)" />
                <stop offset="68%" stopColor="rgba(255,230,0,0.40)" />
                <stop offset="100%" stopColor="rgba(255,0,51,0.42)" />
              </linearGradient>

              <filter id="chronoGlow">
                <feGaussianBlur stdDeviation="0.6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <polyline
              points={polylinePoints}
              fill="none"
              stroke="url(#chronoLine)"
              strokeWidth="0.22"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.45"
              filter="url(#chronoGlow)"
              strokeDasharray="1.2 0.9"
            />

            {connectorPoints.map((p, i) => (
              <g key={`marker-${i}`} transform={`translate(${p.x}, ${p.y})`}>
                <circle
                  r="0.72"
                  fill="rgba(255,255,255,0.92)"
                  opacity="0.95"
                />
                <circle
                  r="1.35"
                  fill="none"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="0.12"
                />
                <text
                  x="1.8"
                  y="-1.2"
                  fontSize="1.3"
                  fill="rgba(255,255,255,0.38)"
                  letterSpacing="0.12em"
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            ))}
          </svg>

          {/* Floating cards */}
          {milestones.map((m, i) => {
            const node = nodes[i];

            return (
              <div
                key={`${m.org}-${m.when}`}
                className="absolute z-10 will-change-transform"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative">
                  <div className="pointer-events-none absolute -left-4 -top-4 rounded-full border border-white/12 bg-black/55 px-2 py-1 text-[10px] tracking-[0.22em] text-white/55 backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <MilestoneCard m={m} desktop />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}