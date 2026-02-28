// app/works/projects.ts

export type ProjectType =
  | "Propulsion & Fluids"
  | "Robotics & Autonomy"
  | "Analysis & Simulation"
  | "Test Systems & Instrumentation"
  | "Product Design & Mechanisms"
  | "Power & Energy Systems";

export const PROJECT_TYPE_ORDER: ProjectType[] = [
  "Propulsion & Fluids",
  "Robotics & Autonomy",
  "Analysis & Simulation",
  "Test Systems & Instrumentation",
  "Product Design & Mechanisms",
  "Power & Energy Systems",
];

export type ProjectImage = {
  src: string;
  alt?: string;
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;

  year: string;
  yearLabel: string;

  projectType: ProjectType;

  tags: string[];
  cover?: string;

  overview: string;
  highlights: string[];

  status?: string;
  date?: string;
  focusArea?: string;
  team?: string;
  systemOverview?: string;
  toolsAndSkills?: string[];
  contributions?: string[];
  results?: string[];

  // Existing: carousel images (hero)
  gallery?: string[];

  // ✅ NEW: additional photo boxes (not in carousel)
  photoGrid?: ProjectImage[];
};

const PH = {
  systemOverview:
    "{insert system overview here: architecture, constraints, analysis approach, validation plan, and key design decisions.}",
  contributions: [
    "{insert contribution here}",
    "{insert contribution here}",
    "{insert contribution here}",
  ],
  results: [
    "{insert result here: metrics, validation outcome, performance improvement}",
    "{insert result here}",
  ],
  tools: ["{insert tool}", "{insert tool}", "{insert tool}"],
};

export const PROJECTS: Project[] = [
  // ... your other projects unchanged ...

  {
    slug: "helium-dunk-probe",
    title: "Helium Dunk Probe",
    subtitle: "Dewar Instrument",
    year: "2024",
    yearLabel: "2024",
    projectType: "Test Systems & Instrumentation",
    tags: ["Vacuum Hardware", "Cryogenic Instrumentation", "GSE Design", "Testing"],
    overview:
      "Designed and fabricated a liquid helium dunk probe enabling 4-point TES resistance measurements at 4.2 K. Integrated with Lakeshore metrology and BlueFors Cryostat systems to validate electrical shorts in superconducting samples.",
    highlights: [
      "Reduced test turnaround time by >70% compared to full cryostat cooldowns",
      "Measured six TES samples (BT10-01, Q4B–Q6B, SOLF-2B-27/34) with µΩ–kΩ resolution (<1% uncertainty)",
      "Confirmed niobium short in BT10-01 and characterized cryogenic shorts below 10 mΩ",
      "Improved probe sensitivity and documentation for next-generation hardware iteration",
    ],
    status: "BUILT, TESTED, VALIDATED",
    date: "2024",
    focusArea: "Cryogenic Instrumentation",
    team: "Sophya Mirza",
    systemOverview:
      "Designed and fabricated a liquid helium dunk probe enabling 4-point TES resistance measurements at 4.2 K. Integrated with Lakeshore metrology and BlueFors Cryostat systems to validate electrical shorts in superconducting samples.",
    toolsAndSkills: [
      "Vacuum hardware",
      "Cryogenic testing (LHe 4.2K)",
      "4-point resistance measurements",
      "Lakeshore metrology",
      "BlueFors Cryostat integration",
      "Test documentation",
    ],
    contributions: [
      "Designed and fabricated the dunk probe mechanical stack for repeatable immersion testing at 4.2K.",
      "Integrated Lakeshore workflow for 4-point TES resistance measurements across µΩ–kΩ.",
      "Executed measurement campaign across six TES samples and validated suspected shorts.",
      "Iterated probe setup to improve sensitivity, repeatability, and documentation handoff.",
    ],
    results: [
      "Reduced test turnaround time by >70% vs full cryostat cooldown cycles.",
      "Measured six TES samples with <1% uncertainty; resolved cryogenic shorts below 10 mΩ.",
      "Confirmed niobium short in BT10-01 and characterized short behavior across additional samples.",
    ],

    /**
     * ✅ Carousel (hero): use the most “visual” shots you want people to swipe through.
     * Put these files in /public/... and reference them by public path.
     */
    gallery: [
      "/projects/DUNKPROBE/dunkprobefullassembly.png",
      "/projects/DUNKPROBE/dunkprobecloseup.png",
    ],

    /**
     * ✅ Extra photo boxes (below): include additional build photos, closeups, context shots.
     */
    photoGrid: [
      {
        src: "/projects/DUNKPROBE/dunkprobebuild.png",
        alt: "Dunk probe build closeup",
        caption: "Probe head build + wiring harness",
      },
      {
        src: "/projects/DUNKPROBE/dunkprobebuild2.png",
        alt: "Probe build in progress",
        caption: "Assembly iteration (pre-potting)",
      },
      {
        src: "/projects/DUNKPROBE/dunkprobecloseup2.png",
        alt: "Closeup of sensor interfaces",
        caption: "Connector + contact interface details",
      },
      {
        src: "/projects/DUNKPROBE/dunkprobecloseup.png",
        alt: "Closeup of dunk probe head",
        caption: "Final head configuration",
      },
    ],
  },

  // ... rest unchanged
];

export const PROJECTS_BY_SLUG = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p])
) as Record<string, Project>;

export const PROJECTS_BY_TYPE = PROJECT_TYPE_ORDER.map((type) => ({
  type,
  projects: PROJECTS.filter((p) => p.projectType === type),
})).filter((group) => group.projects.length > 0);