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

export type ProjectSection = {
  id: string; // stable anchor
  title: string;
  summary?: string;
  bullets?: string[];
  images?: string[];
};

export type ProjectPreview = {
  // shown to the right of the title (always visible)
  staticSrc: string;
  // follows the cursor on hover
  hoverSrc: string;
  alt?: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;

  // keep years for detail pages / timeline metadata
  year: string;
  yearLabel: string;

  // primary grouping key for Works page sections
  projectType: ProjectType;

  tags: string[];
  cover?: string;

  preview?: ProjectPreview;

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

  gallery?: string[];
  sections?: ProjectSection[];
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
  // =========================
  // Propulsion & Fluids
  // =========================
  {
    slug: "alula",
    title: "ALULA",
    subtitle: "Liquid bi-prop engine rocket",
    year: "2026",
    yearLabel: "2026",
    projectType: "Propulsion & Fluids",
    tags: ["Propulsion", "Feed System", "Cryogenics", "Fluids P&ID", "Ethanol/LOX"],
    cover: "/projects/ALULA/feed/01.jpg",
    preview: {
      staticSrc: "/projects/ALULA/cover.PNG",
      hoverSrc: "/projects/ALULA/engine1.PNG",
      alt: "ALULA preview",
    },
    overview:
      "Liquid ethanol/LOX rocket program spanning propulsion architecture, feed system integration, and test-driven iteration to flight.",
    highlights: [
      "Led feed system build and critical valve hardware for ethanol/LOX",
      "Designed + machined flight components (RQD, injector, nozzle)",
      "Validated hardware through Mojave testing and successful launch + recovery",
    ],
    status: "COMPLETED",
    date: "LAUNCHED",
    focusArea: "Propulsion Engineering",
    systemOverview:
      "ALULA is a student-built liquid bi-propellant rocket using ethanol and liquid oxygen. The propulsion stack includes a pressure-fed cryogenic feed system, purpose-built valves and disconnects for safe ground operations, and a manufacturable de Laval nozzle selected to balance performance with the realities of student-shop tooling. The program closed design-test loops through subsystem verification, integrated hot-fire and range testing, and culminated in a flight campaign with successful recovery.",
    toolsAndSkills: [
      "SolidWorks CAD",
      "Manual milling (Bridgeport)",
      "Lathe machining",
      "Injector / nozzle manufacturing",
      "Fluids P&ID",
      "Feed system design",
      "Cryogenic handling",
      "RPA",
      "MATLAB",
      "long nights cronking fittings and bending hardine",
    ],
    contributions: [
      "Owned Remote Quick Disconnect (RQD) from design → manufacturing → assembly → test → flight; modeled in SolidWorks, machined on lathe + Bridgeport, and validated in ground ops and launch environment.",
      "Machined the injector and supported end-to-end propulsion hardware fabrication for flight-ready integration.",
      "Built an RPA-driven workflow to optimize thrust chamber/nozzle geometry for the vehicle mission; selected a manufacturable de Laval nozzle over a bell nozzle due to tooling constraints, then verified integrity with thermal + force simulation prior to machining an aluminum nozzle used on launch.",
      "Designed a pressure-actuated valve and led the build/integration of the ethanol/LOX feed system (interfaces, routing, and assembly readiness for test).",
      "Designed and produced the final iteration pyro valve to regulate LOX/ethanol lines: SolidWorks design → prototype aluminum machining → flight stainless version for cryogenic compatibility; performed thermal and pressure-drop analysis and validated against real testing. (0.05 g black powder actuator with e-match ignition driving piston for flow control.)",
      "Handled logistics and test execution support, including transporting critical propulsion hardware to Mojave for range testing and iteration.",
    ],
    results: [
      "Won the Friends of Amateur Rocketry ‘Dollar Per Foot’ competition.",
      "Reached an apogee of 6,126 ft!",
      "Successful flight recovery.",
    ],
    sections: [
      {
        id: "feed-system",
        title: "Cryogenic Feed System",
        summary:
          "Pressure-fed LOX/ethanol architecture with student-shop manufacturable interfaces and test-driven integration.",
        bullets: [
          "Routing + interfaces designed for rapid assembly and leak-check iteration",
          "Integration readiness for Mojave range ops",
        ],
        images: ["/projects/ALULA/feed/01.jpg", "/projects/ALULA/feed/02.jpg"],
      },
      {
        id: "rqd",
        title: "Remote Quick Disconnect (RQD)",
        summary:
          "Remotely actuated disconnect to release the pressurant fill line pre-launch and eliminate manual pad ops.",
        bullets: [
          "SolidWorks → manual machining (lathe + Bridgeport) → integration",
          "Validated in ground ops and flight environment",
        ],
        images: [
          "/projects/ALULA/rqd/01.jpg",
          "/projects/ALULA/rqd/02.jpg",
          "/projects/ALULA/rqd/03.jpg",
        ],
      },
      {
        id: "valves",
        title: "Valves: Pressure-Actuated + Pyro Valve",
        summary:
          "Lightweight actuation strategy for LOX/ethanol regulation with cryo-compatible final hardware.",
        bullets: [
          "0.05 g black powder actuator with e-match ignition",
          "Thermal + pressure drop analysis validated via test",
        ],
        images: ["/projects/ALULA/valves/01.jpg", "/projects/ALULA/valves/02.jpg"],
      },
      {
        id: "injector-nozzle",
        title: "Injector + De Laval Nozzle",
        summary:
          "Manufacturable nozzle selection and machining under limited tooling, verified by thermal + force simulation.",
        bullets: [
          "De Laval chosen over bell for manufacturability",
          "Machined aluminum nozzle used for flight",
        ],
        images: ["/projects/ALULA/nozzle/01.jpg", "/projects/ALULA/nozzle/02.jpg"],
      },
      {
        id: "testing",
        title: "Mojave Testing Campaign",
        summary:
          "Range testing and iteration cadence to close design–test loops prior to launch.",
        bullets: [
          "Transported critical hardware + supported range ops",
          "Validated integrated stack prior to flight",
        ],
        images: [
          "/projects/ALULA/test/01.jpg",
          "/projects/ALULA/test/02.jpg",
          "/projects/ALULA/test/03.jpg",
        ],
      },
    ],
  },

  // =========================
  // ADD YOUR OTHER PROJECTS BACK BELOW
  // (These are safe placeholders so you immediately see multiple rows on /works)
  // Replace titles/paths/content with your real ones.
  // Make sure every slug is UNIQUE.
  // =========================

  {
    slug: "cold-gas-thruster-stand",
    title: "Cold Gas Thruster Test Stand",
    subtitle: "Vacuum-compatible xenon feed + DAQ instrumentation",
    year: "2025",
    yearLabel: "2025",
    projectType: "Test Systems & Instrumentation",
    tags: ["Vacuum", "DAQ", "Beckhoff", "Xenon", "Test"],
    cover: "/projects/PLACEHOLDERS/thruster-stand/cover.jpg",
    preview: {
      staticSrc: "/projects/PLACEHOLDERS/thruster-stand/thumb.jpg",
      hoverSrc: "/projects/PLACEHOLDERS/thruster-stand/hover.jpg",
      alt: "Thruster stand preview",
    },
    overview:
      "End-to-end test stand to characterize cold gas thrusters in vacuum with a tight integration loop across plumbing, sensors, and controls.",
    highlights: [
      "Integrated sensors + DAQ and validated acquisition flow",
      "Designed vacuum-compatible plumbing + interfaces",
      "Built for iteration speed and repeatable runs",
    ],
    status: "{insert status here}",
    date: "{insert date here}",
    focusArea: "{insert focus area here}",
    systemOverview: PH.systemOverview,
    toolsAndSkills: PH.tools,
    contributions: PH.contributions,
    results: PH.results,
    gallery: ["/projects/PLACEHOLDERS/thruster-stand/01.jpg"],
  },

  {
    slug: "hygromorphic-composite-skins",
    title: "Adaptive Composite Skins",
    subtitle: "Hygromorphic + stiffness-tunable composite concepts",
    year: "2025",
    yearLabel: "2025",
    projectType: "Analysis & Simulation",
    tags: ["Composites", "ANSYS", "Structures", "Aero"],
    cover: "/projects/PLACEHOLDERS/composites/cover.jpg",
    preview: {
      staticSrc: "/projects/PLACEHOLDERS/composites/thumb.jpg",
      hoverSrc: "/projects/PLACEHOLDERS/composites/hover.jpg",
      alt: "Composite skins preview",
    },
    overview:
      "Concept exploration and simulation of tunable composite skins for adaptive performance under constraints.",
    highlights: ["Defined stackups + constraints", "Ran simulation sweeps", "Synthesized trade study outputs"],
    status: "{insert status here}",
    date: "{insert date here}",
    focusArea: "{insert focus area here}",
    systemOverview: PH.systemOverview,
    toolsAndSkills: PH.tools,
    contributions: PH.contributions,
    results: PH.results,
  },

  {
    slug: "silent-mouse",
    title: "Low-Cost Silent Mouse",
    subtitle: "Hardware iteration + ergonomic improvements",
    year: "2025",
    yearLabel: "2025",
    projectType: "Product Design & Mechanisms",
    tags: ["Product", "Mechanisms", "Rapid Iteration", "DFM"],
    cover: "/projects/PLACEHOLDERS/mouse/cover.jpg",
    preview: {
      staticSrc: "/projects/PLACEHOLDERS/mouse/thumb.jpg",
      hoverSrc: "/projects/PLACEHOLDERS/mouse/hover.jpg",
      alt: "Silent mouse preview",
    },
    overview:
      "Designed and built a silent mouse with mechanical and ergonomic refinements driven by hands-on iteration.",
    highlights: ["Switch + encoder modifications", "Assembly + wiring constraints solved", "Cost target achieved"],
    status: "{insert status here}",
    date: "{insert date here}",
    focusArea: "{insert focus area here}",
    systemOverview: PH.systemOverview,
    toolsAndSkills: PH.tools,
    contributions: PH.contributions,
    results: PH.results,
  },
];

// Build slug index (unique slugs only)
export const PROJECTS_BY_SLUG = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p])
) as Record<string, Project>;

// Optional: by-type grouping for other UI
export const PROJECTS_BY_TYPE = PROJECT_TYPE_ORDER.map((type) => ({
  type,
  projects: PROJECTS.filter((p) => p.projectType === type),
})).filter((group) => group.projects.length > 0);

// DEV-ONLY: warn if any projectType is invalid
if (process.env.NODE_ENV !== "production") {
  const allowed = new Set(PROJECT_TYPE_ORDER);
  const invalid = PROJECTS.filter((p) => !allowed.has(p.projectType));
  if (invalid.length) {
    // eslint-disable-next-line no-console
    console.warn(
      "Projects with invalid projectType (will fall under Other on /works):",
      invalid.map((p) => ({ slug: p.slug, projectType: p.projectType }))
    );
  }

  // DEV-ONLY: warn if any slugs are duplicated (prevents silent overwrites)
  const seen = new Set<string>();
  const dups: string[] = [];
  for (const p of PROJECTS) {
    if (seen.has(p.slug)) dups.push(p.slug);
    seen.add(p.slug);
  }
  if (dups.length) {
    // eslint-disable-next-line no-console
    console.warn("Duplicate project slugs (will overwrite in PROJECTS_BY_SLUG):", dups);
  }
}