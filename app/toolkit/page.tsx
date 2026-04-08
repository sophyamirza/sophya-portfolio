"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Variants } from "framer-motion";

type Section = {
  title: string;
  subtitle: string;
  items: string[];
  previewSrc: string;
};

type Milestone = {
  org: string;
  role: string;
  when: string;
  tags: string;
  logo: string;
  secondaryLogo?: string;
};

type Award = {
  title: string;
  issuer: string;
  when: string;
  description: string;
  image: string;
  href: string;
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
    title: "DEV, BUILD + TEST",
    subtitle: "Prototyping, diagnostics, ATPs, Acceptance/Quals Testing",
    previewSrc: "/toolkit/test.PNG",
    items: [
      "Prototyping + dev hardware",
      "CNC + manual machining",
      "Fluids P&ID, cryo experience",
      "3D printing (FDM + SLA)",
      "Instrumentation (seals, manifolds, tubing)",
      "DAQ (NI, Beckhoff, Arduino, etc.)",
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

const milestones: Milestone[] = [
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
];

const awards: Award[] = [
  {
    title: "Edison Scholars: The Makers of Tomorrow",
    issuer: "Southern California Edison",
    when: "",
    description:
      "The Edison Scholars program recognizes students who want to be the makers of tomorrow, the changemakers, inventors, and pioneers. Awarded $50,000 toward college tuition.",
    image: "/logos/edisonlogo.PNG",
    href: "https://energized.edison.com/meet-our-2021-edison-scholars-6837617",
  },
  {
    title: "The Mars Generation: 24 Under 24",
    issuer: "Innovators and Leaders in Space Award",
    when: "",
    description:
      "Not too many people can say their earliest achievements include building alternating current electromagnetic generators and deciphering the artificial intelligence behind tactile and photocell navigating mechanisms that play a key role in…",
    image: "/logos/tmglogoblack.PNG",
    href: "https://themarsgeneration.org/the-mars-generation-announces-24-under-24-leaders-and-innovators-in-steam-and-space-award-winners-for-2019/",
  },
  {
    title: "SAE Engineering Scholar",
    issuer: "SAE International",
    when: "",
    description:
      "For academic excellence pursuing their passion for engineering.",
    image: "/logos/sae.PNG",
    href: "https://legacy.sae.org/binaries//content/assets/cm/content/participate/scholarships/21_sae_scholarship_recipient_list.pdf",
  },
  {
    title: "Mechanical Engineering Scholars Program (ME Scholars)",
    issuer: "Dept. of Mechanical Engineering, UC Berkeley",
    when: "",
    description:
      "Distingushed as top acheiveing students in the ME department for strong academic performance, leadership, and contributions to the community.",
    image: "/logos/meche.PNG",
    href: "https://example.com",
  },
  {
    title: "Engineering Scholars as Engaged Scholars (ES^2)",
    issuer: "UC Berkeley College of Engineering",
    when: "",
    description:
      "Design & Innovation, Social Responsibility, Community Collaboration, Leadership and Impact Oriented Technical Researh Fellow",
    image: "/logos/es2.PNG",
    href: "https://engineering.berkeley.edu/students/programs/engineering-scholars-as-engaged-scholars/",
  },
  {
    title: "Young Eisner Scholars",
    issuer: "",
    when: "",
    description:
      "Supporting high acheiving students from middle school till college and career onwards",
    image: "/logos/yes.PNG",
    href: "https://engineering.berkeley.edu/students/programs/engineering-scholars-as-engaged-scholars/",
  },
  {
    title: "All Ways Up Scholar",
    issuer: "Class of 2025",
    when: "",
    description:
      "Nurturing the potential of our country’s future leaders, activists and philanthropists,",
    image: "/logos/AWU.PNG",
    href: "https://www.allwaysup.org/what-we-do/scholarships/",
  },
];

const otherAwards = [
  "Broadcom MASTERS Alumni",
  "Society of Women Engineers",
  "FRC Robotics Judge + Mentor",
  "AIAA @ Berkeley",
  "Founder of SAE University Chapter at Berkeley",
  "etc.",
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
  const [hover, setHover] = useState<{
    show: boolean;
    src: string;
    title: string;
    x: number;
    y: number;
  }>({ show: false, src: "", title: "", x: 0, y: 0 });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? milestones[activeIndex] : null;

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

  const closeModal = () => setActiveIndex(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const PREVIEW = 168;
  const OFFSET = 18;

  const previewStyle = {
    left: hover.x + OFFSET,
    top: hover.y + OFFSET,
    width: PREVIEW,
    height: PREVIEW,
  };

  return (
    <main className="min-h-screen bg-black text-white">
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
            <div className="absolute inset-x-0 top-0 z-10 h-[2px] bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-50" />

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

            <div className="absolute inset-x-0 bottom-0 z-10 bg-black/55 px-3 py-2 backdrop-blur">
              <div className="text-[10px] tracking-[0.28em] text-white/80">
                {hover.title.toUpperCase()}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-28 pt-20 md:pt-24">
        <section>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs tracking-[0.35em] text-white/50">
                EXPERIENCE
              </div>

              <h1 className="mt-4 text-5xl tracking-tight md:text-6xl">
                Built in Industry
              </h1>

              <div className="mt-4 h-[2px] w-40 bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-45" />

              <p className="mt-6 max-w-2xl text-white/70">
                A selection of engineering roles across propulsion, structures,
                cryogenics, batteries, research, and venture.
              </p>
            </div>

            <Link
              href="/contact#resume"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-xs uppercase tracking-[0.22em] text-white/90 transition-all duration-300 hover:border-[rgba(255,59,31,0.45)] hover:bg-[rgba(255,59,31,0.06)]"
            >
              Detailed Resume
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {milestones.map((m, i) => (
              <button
                key={`${m.org}-${m.when}`}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={[
                  "group relative flex aspect-[1.15/1] items-center justify-center overflow-hidden rounded-[22px] border border-white/10",
                  "bg-white/[0.03] p-4 backdrop-blur-sm transition-all duration-300",
                  "hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_0_32px_rgba(255,255,255,0.05)]",
                ].join(" ")}
                aria-label={`Show ${m.org}`}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(120px_80px_at_50%_45%,rgba(255,255,255,0.08),transparent_70%)]" />
                </div>

                <div className="relative flex h-full w-full items-center justify-center">
                  <div className="relative h-full w-full">
                    <Image
                      src={m.logo}
                      alt={m.org}
                      fill
                      className="object-contain opacity-90 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <div className="text-xs tracking-[0.35em] text-white/50">
            RECOGNITION
          </div>

          <h2 className="mt-4 text-4xl tracking-tight md:text-5xl">
            Awards + Honors
          </h2>

          <div className="mt-4 h-[2px] w-40 bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-45" />

          <p className="mt-6 max-w-2xl text-white/70">
            Fellowships, distinctions, and recognitions earned across
            engineering, leadership, and technical work.
          </p>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {awards.map((award) => (
              <Link
                key={`${award.title}-${award.when}`}
                href={award.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
              >
                <div className="relative h-full min-h-[260px] overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:scale-[1.015] hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_0_24px_rgba(255,255,255,0.05)]">
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -inset-20 bg-[radial-gradient(300px_120px_at_20%_10%,rgba(255,59,31,0.14),transparent_60%)]" />
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-35" />
                  </div>

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:shadow-[0_0_18px_rgba(255,255,255,0.10)]">
                        <Image
                          src={award.image}
                          alt={award.title}
                          fill
                          className="object-contain p-1"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                          {award.when}
                        </div>

                        <h3 className="mt-1 text-base leading-tight text-white">
                          {award.title}
                        </h3>

                        <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/55">
                          {award.issuer}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 flex-1 text-xs leading-relaxed text-white/66">
                      {award.description}
                    </p>

                    <div className="mt-4 text-[10px] uppercase tracking-[0.22em] text-white/40 transition-colors duration-300 group-hover:text-white/70">
                      View →
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            <div className="group block h-full">
              <div className="relative h-full min-h-[260px] overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_0_24px_rgba(255,255,255,0.05)]">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -inset-20 bg-[radial-gradient(300px_120px_at_20%_10%,rgba(255,59,31,0.14),transparent_60%)]" />
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-35" />
                </div>

                <div className="relative flex h-full flex-col">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                    Additional Recognition
                  </div>

                  <h3 className="mt-2 text-base leading-tight text-white">
                    Other Awards + Affiliations
                  </h3>

                  <div className="mt-4 flex flex-1 flex-wrap content-start gap-2">
                    {otherAwards.map((award) => (
                      <span
                        key={award}
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/75"
                      >
                        {award}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="text-xs tracking-[0.35em] text-white/50">TOOLKIT</div>

          <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl tracking-tight md:text-5xl">
                Technical Arsenal
              </h2>

              <div className="mt-4 h-[2px] w-40 bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-45" />

              <p className="mt-6 max-w-2xl text-white/70">
                Design, build, test, iterate, with a bias toward shipping
                hardware that works in real constraints.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <Link
                href="/works"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-xs uppercase tracking-[0.22em] text-white/90 transition-all duration-300 hover:border-[rgba(255,59,31,0.45)] hover:bg-[rgba(255,59,31,0.06)]"
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
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -inset-24 bg-[radial-gradient(600px_200px_at_20%_20%,rgba(255,59,31,0.16),transparent_60%)]" />
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-35" />
                </div>

                <div className="relative">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-lg tracking-[0.22em] text-white/85">
                        {s.title.toUpperCase()}
                      </h3>
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
        </section>

        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="h-px w-64 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/72 px-6 pb-8 pt-20 backdrop-blur-md md:pt-24"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-3xl rounded-[30px] border border-white/15 bg-[#050505]/95 p-6 shadow-[0_0_80px_rgba(0,0,0,0.55)] md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/80 transition hover:border-white/25 hover:text-white"
            >
              ← Back
            </button>

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
              <h2 className="max-w-[14ch] text-4xl leading-[0.95] tracking-tight text-white md:text-6xl">
                {active.org}
              </h2>
              <p className="mt-3 text-2xl leading-tight text-white/75 md:text-3xl">
                {active.role}
              </p>
            </div>

            <div className="mt-8 text-sm uppercase tracking-[0.22em] text-white/45 md:text-[15px]">
              {active.tags}
            </div>

            <div className="mt-10 h-[2px] w-56 max-w-full bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-80" />
          </div>
        </div>
      )}
    </main>
  );
}
