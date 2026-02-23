"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import type { Variants } from "framer-motion";

type Section = {
  title: string;
  subtitle: string;
  items: string[];
  previewSrc: string; // <-- add a hover preview image per section
};

const sections: Section[] = [
  {
    title: "CAD",
    subtitle: "Design intent, integration-ready assemblies, DFM-first.",
    previewSrc: "/toolkit/cad.PNG",
    items: [
      "SolidWorks",
      "CATIA",
      "NX",
      "Fusion",
      "Onshape",
      "GD&T + DFM",
      "PDM + PLM",
    ],
  },
  {
    title: "Analysis + Sim",
    subtitle: "Validate trades, converge answers, quantify risk.",
    previewSrc: "/toolkit/analysis.PNG",
    items: [
      "ANSYS (Fluent / Mechanical)",
      "ANSA",
      "Abaqus",
      "Nastran",
      "Thermal Desktop",
      "MATLAB",
      "Python + Excel",
      "LabVIEW",
      "FEA / CFD / FMEA",
    ],
  },
  {
    title: "DEV + TEST",
    subtitle: "Prototyping, diagnostics, ATPs, Acceptance/Quals Testing",
    previewSrc: "/toolkit/test.PNG",
    items: [
      "Prototyping + dev hardware",
      "CNC + manual machining",
      "Fluids P&ID, cryo experience",
      "3D printing (FDM + SLA)",
      "Instrumentation (seals, manifolds, tubing)",
      "DAQ (NI, Beckhoff, Arduino, etc.",
      "Valves + regulators",
      "ATP authoring",
      "Sift, Grafana, Ion, WarpDrive",
    ],
  },
  {
    title: "Additional",
    subtitle: "Standards, EE tooling, and communication edge.",
    previewSrc: "/toolkit/additional.PNG",
    items: [
      "Polyglot: English, Farsi, Spanish, Hindi, Urdu, Arabic",
      "EAGLE",
      "Altium",
      "S-016, 91-710 + additional standards",
      "ESD Rev L(24) — NASA JPL",
    ],
  },
];

const container: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function SkillChip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-white/75 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06] hover:text-white">
      {children}
    </span>
  );
}

export default function ToolkitPage() {
  // hover-preview state
  const [hover, setHover] = useState<{
    show: boolean;
    src: string;
    title: string;
    x: number;
    y: number;
  }>({ show: false, src: "", title: "", x: 0, y: 0 });

  // rAF throttle so we don't setState on every mousemove
  const raf = useRef<number | null>(null);
  const nextPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const updatePos = (x: number, y: number) => {
    nextPos.current = { x, y };
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = null;
      setHover((h) => ({ ...h, x: nextPos.current.x, y: nextPos.current.y }));
    });
  };

  // preview box sizing/offset
  const PREVIEW = 168; // px (small square)
  const OFFSET = 18;

  const previewStyle: React.CSSProperties = {
    // keep the square slightly offset from the cursor
    left: hover.x + OFFSET,
    top: hover.y + OFFSET,
    width: PREVIEW,
    height: PREVIEW,
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Cursor-follow preview */}
      <div className="pointer-events-none fixed inset-0 z-[60]">
        <motion.div
          initial={false}
          animate={{
            opacity: hover.show ? 1 : 0,
            scale: hover.show ? 1 : 0.96,
          }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="absolute"
          style={previewStyle}
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-[0_0_36px_rgba(255,255,255,0.10)]">
            {/* subtle thermal top edge */}
            <div className="absolute inset-x-0 top-0 z-10 h-[2px] bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-50" />

            {/* image */}
            {hover.src ? (
              <Image
                src={hover.src}
                alt={hover.title}
                fill
                sizes="168px"
                className="object-cover"
                priority={false}
              />
            ) : null}

            {/* label */}
            <div className="absolute inset-x-0 bottom-0 z-10 bg-black/55 px-3 py-2 backdrop-blur">
              <div className="text-[10px] tracking-[0.28em] text-white/80">
                {hover.title.toUpperCase()}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-28 pt-20 md:pt-24">
        <div className="text-xs tracking-[0.35em] text-white/50">TOOLKIT</div>

        <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-5xl md:text-6xl tracking-tight">
              Technical Arsenal
            </h1>

            <div className="mt-4 h-[2px] w-40 bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-45" />

            <p className="mt-6 max-w-2xl text-white/70">
              Design, build, test, iterate, with a bias toward shipping hardware
              that works in real constraints.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <Link
              href="/works"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-xs tracking-[0.22em] uppercase text-white/90 transition-all duration-300 hover:border-[rgba(255,59,31,0.45)] hover:bg-[rgba(255,59,31,0.06)]"
            >
              See projects that use this →
            </Link>
          </div>
        </div>

        <motion.div
          className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {sections.map((s) => (
            <motion.div
              key={s.title}
              variants={item}
              className={[
                "group relative overflow-hidden rounded-3xl border border-white/10",
                "bg-white/[0.02] p-8 md:p-10",
                "transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04]",
              ].join(" ")}
              onMouseEnter={(e) => {
                setHover({
                  show: true,
                  src: s.previewSrc,
                  title: s.title,
                  x: e.clientX,
                  y: e.clientY,
                });
              }}
              onMouseMove={(e) => updatePos(e.clientX, e.clientY)}
              onMouseLeave={() =>
                setHover((h) => ({ ...h, show: false, src: "", title: "" }))
              }
            >
              {/* subtle glow + thermal edge */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-24 bg-[radial-gradient(600px_200px_at_20%_20%,rgba(255,59,31,0.16),transparent_60%)]" />
                <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-35" />
              </div>

              <div className="relative">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-lg tracking-[0.22em] text-white/85">
                      {s.title.toUpperCase()}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">
                      {s.subtitle}
                    </p>
                  </div>

                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[rgba(255,59,31,0.65)] shadow-[0_0_18px_rgba(255,59,31,0.25)]" />
                </div>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {s.items.map((x) => (
                    <SkillChip key={x}>{x}</SkillChip>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="max-w-2xl text-center text-sm tracking-wide text-white/55">
            
          </p>

          <div className="h-px w-64 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>
      </div>
    </main>
  );
}