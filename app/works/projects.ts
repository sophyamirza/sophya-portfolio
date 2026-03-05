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

  year: string; // keep years for detail pages / timeline metadata
  yearLabel: string;

  // ✅ needed by Works grouping + slug page section label
  projectType: ProjectType;

  tags: string[];
  cover?: string;

  // ✅ used by Works hover thumb + follower preview
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

const TEAM_PH = "Sophya Mirza, {insert team here}";

export const PROJECTS: Project[] = [
  // =========================
  // 2026
  // =========================
  {
    slug: "cf-rear-wing",
    title: "Vehicle Optimized Carbon Fiber Rear Wing",
    subtitle: "Custom Tesla Model 3 mods",
    year: "2026",
    yearLabel: "2026",
    projectType: "Product Design & Mechanisms",
    tags: ["Aerodynamics", "Composites", "Downforce", "Spoiler"],
    overview:
      "Carbon fiber rear wing concept focused on aero performance, vehicle integration, and manufacturability, iterated through design trades and build constraints.",
    highlights: [
      "Defined constraints: packaging, mounts, loads, manufacturability",
      "Iterated geometry through aero + structural trade space",
      "Designed for assembly, serviceability, and repeatable fabrication",
    ],
    status: "{insert status here}",
    date: "{insert date here}",
    focusArea: "Aerodynamics & Composites",
    team: "Sophya Mirza",
    systemOverview: PH.systemOverview,
    toolsAndSkills: ["CFD", "Composites layup", "CAD", "Vehicle integration", ...PH.tools],
    contributions: PH.contributions,
    results: PH.results,
  },
  {
    slug: "blunt-body-analysis",
    title: "Blunt Body Analysis",
    subtitle: "Supersonic flow over a blunt body",
    year: "2026",
    yearLabel: "2026",
    projectType: "Analysis & Simulation",
    tags: ["Aerodynamics", "ANSYS", "Simulation", "Mesh refinement"],
    overview:
      "Computation of supersonic flow over a blunt body with emphasis on meshing strategy, convergence, and result interpretation.",
    highlights: [
      "Built and refined meshes to resolve key gradients",
      "Ran parameter and convergence checks",
      "Interpreted flow features and sensitivity to numerical choices",
    ],
    status: "{insert status here}",
    date: "{insert date here}",
    focusArea: "High-Speed Aerodynamics",
    team: "Sophya Mirza",
    systemOverview: PH.systemOverview,
    toolsAndSkills: ["ANSYS Fluent", "Meshing", "Convergence study", ...PH.tools],
    contributions: PH.contributions,
    results: PH.results,
  },

  // =========================
  // 2025
  // =========================
  {
    // ✅ Keep ONLY ONE ALULA entry (duplicate slugs will overwrite)
    slug: "alula",
    title: "ALULA",
    subtitle: "Liquid bi-prop engine rocket",
    year: "2025",
    yearLabel: "2025",
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
        bullets: ["0.05 g black powder actuator with e-match ignition", "Thermal + pressure drop analysis validated via test"],
        images: ["/projects/ALULA/valves/01.jpg", "/projects/ALULA/valves/02.jpg"],
      },
      {
        id: "injector-nozzle",
        title: "Injector + De Laval Nozzle",
        summary:
          "Manufacturable nozzle selection and machining under limited tooling, verified by thermal + force simulation.",
        bullets: ["De Laval chosen over bell for manufacturability", "Machined aluminum nozzle used for flight"],
        images: ["/projects/ALULA/nozzle/01.jpg", "/projects/ALULA/nozzle/02.jpg"],
      },
      {
        id: "testing",
        title: "Mojave Testing Campaign",
        summary: "Range testing and iteration cadence to close design–test loops prior to launch.",
        bullets: ["Transported critical hardware + supported range ops", "Validated integrated stack prior to flight"],
        images: ["/projects/ALULA/test/01.jpg", "/projects/ALULA/test/02.jpg", "/projects/ALULA/test/03.jpg"],
      },
    ],
  },

  {
    slug: "nasa-suits-spacebears",
    title: "NASA SUITS",
    subtitle: "Founding team SPACEBEARS — UI tech for Artemis",
    year: "2025",
    yearLabel: "2025",
    projectType: "Robotics & Autonomy",
    tags: ["RESTful API", "Embedded Systems", "AR/XR", "LiDAR", "Sensors"],
    overview:
      "Spacesuit user interface technology targeting the Artemis campaign, spanning sensing, integration, and software-hardware interface considerations.",
    highlights: [
      "Defined system interfaces and integration constraints",
      "Worked across embedded + sensing + UX requirements",
      "Built toward reliable, testable subsystem behavior",
    ],
    status: "{insert status here}",
    date: "{insert date here}",
    focusArea: "Embedded Sensing & Human Systems",
    team: TEAM_PH,
    systemOverview: PH.systemOverview,
    toolsAndSkills: ["Embedded systems", "APIs", "Sensors", "LiDAR", ...PH.tools],
    contributions: PH.contributions,
    results: PH.results,
  },
  {
    slug: "rescuebot",
    title: "RescueBot",
    subtitle: "Quadrupedal robot",
    year: "2025",
    yearLabel: "2025",
    projectType: "Robotics & Autonomy",
    tags: ["Gait optimization", "Mechanism design", "Automation", "Controls"],
    overview:
      "Quadruped robotics project focused on mechanical robustness and performance iteration through testing.",
    highlights: [
      "Mechanism design informed by load paths and serviceability",
      "Iterated gaits and control behavior from test data",
      "Integrated subsystems for repeatable performance",
    ],
    status: "{insert status here}",
    date: "{insert date here}",
    focusArea: "Robotics & Mechanisms",
    team: TEAM_PH,
    systemOverview: PH.systemOverview,
    toolsAndSkills: ["Mechanism design", "Controls", "Prototyping", ...PH.tools],
    contributions: PH.contributions,
    results: PH.results,
  },
  {
    slug: "bike-frame-optimization",
    title: "Bike Frame Optimization",
    subtitle: "Drag analysis of truncated NACA-profiled tube",
    year: "2025",
    yearLabel: "2025",
    projectType: "Analysis & Simulation",
    tags: ["Wind Tunnel Testing", "CFD", "MATLAB", "Aerodynamics"],
    overview:
      "Aerodynamic analysis of truncated NACA-profiled tubing combining testing and simulation to guide geometry choices.",
    highlights: [
      "Compared drag trends across geometry variants",
      "Built a workflow tying CFD, test, and post-processing",
      "Used results to inform practical design direction",
    ],
    status: "{insert status here}",
    date: "{insert date here}",
    focusArea: "Aero Testing & CFD",
    team: "Sophya Mirza",
    systemOverview: PH.systemOverview,
    toolsAndSkills: ["Wind tunnel testing", "CFD", "MATLAB", ...PH.tools],
    contributions: PH.contributions,
    results: PH.results,
  },

  // =========================
  // 2024
  // =========================
  {
    slug: "helium-dunk-probe",
    title: "Helium Dunk Probe",
    subtitle: "Dewar instrument",
    year: "2024",
    yearLabel: "2024",
    projectType: "Test Systems & Instrumentation",
    tags: ["Vacuum Hardware", "Cryogenic Instrumentation", "GSE design", "Testing"],
    cover: "/projects/DUNKPROBE/dunkprobebuild2.PNG",
    preview: {
      staticSrc: "/projects/DUNKPROBE/dunkprobebuild2.PNG",
      hoverSrc: "/projects/DUNKPROBE/dunkprobebuild.PNG",
      alt: "Dunk Probe preview",
    },
    overview:
      "Cryogenic dewar probe hardware with vacuum-compatible design, integration, and test procedures.",
    highlights: [
      "Designed vacuum-compatible mechanical hardware",
      "Owned integration details and testing approach",
      "Improved reliability through iteration and documentation",
    ],
    status: "{insert status here}",
    date: "{insert date here}",
    focusArea: "Cryogenic Instrumentation",
    team: "Sophya Mirza",
    systemOverview: PH.systemOverview,
    toolsAndSkills: ["Vacuum hardware", "Cryogenic testing", "GSE design", ...PH.tools],
    contributions: PH.contributions,
    results: PH.results,
  },
  {
    slug: "metamorphic-designs",
    title: "Metamorphic Designs",
    subtitle: "Adaptive furniture design",
    year: "2024",
    yearLabel: "2024",
    projectType: "Product Design & Mechanisms",
    tags: ["Product Design", "CNC Routing", "Prototyping", "Market Analysis", "Urban Design"],
    overview:
      "Adaptive furniture concepts exploring transformable geometry, manufacturability, and real-world constraints.",
    highlights: [
      "Prototyped and refined mechanisms with practical constraints",
      "Balanced aesthetics, function, and manufacturability",
      "Incorporated market and user considerations into design choices",
    ],
    status: "{insert status here}",
    date: "{insert date here}",
    focusArea: "Product Design & Prototyping",
    team: "Sophya Mirza",
    systemOverview: PH.systemOverview,
    toolsAndSkills: ["CNC routing", "Prototyping", "Design for manufacture", ...PH.tools],
    contributions: PH.contributions,
    results: PH.results,
  },
  {
    slug: "pneumatic-magnetometer-boom-gse",
    title: "Pneumatic Magnetometer Boom GSE",
    subtitle: "Air bearing test stand",
    year: "2024",
    yearLabel: "2024",
    projectType: "Test Systems & Instrumentation",
    tags: ["Pneumatics", "Air Bearings", "Instrumentation", "GSE design", "Testing"],
    overview:
      "Pneumatic / air-bearing GSE enabling controlled testing with instrumentation and repeatable workflows.",
    highlights: [
      "Designed pneumatic architecture and integration points",
      "Instrumented the setup for clean data capture",
      "Validated behavior through testing and iteration",
    ],
    status: "{insert status here}",
    date: "{insert date here}",
    focusArea: "Test Systems & GSE",
    team: "Sophya Mirza",
    systemOverview: PH.systemOverview,
    toolsAndSkills: ["Pneumatics", "Air bearings", "Instrumentation", ...PH.tools],
    contributions: PH.contributions,
    results: PH.results,
  },
  {
    slug: "patris",
    title: "PATRIS",
    subtitle: "Probing articulated tubular robotic inspection",
    year: "2024",
    yearLabel: "2024",
    projectType: "Robotics & Autonomy",
    tags: ["Planetary Gearbox", "Cable actuation", "Joint-space PID", "Embedded motor control", "3D Printing"],
    overview:
      "Robotic inspection system emphasizing drivetrain design, embedded motor control, and controllable articulation.",
    highlights: [
      "Designed transmission and actuation approach",
      "Implemented and tuned joint-space control behavior",
      "Built prototypes to validate mechanics + control integration",
    ],
    status: "{insert status here}",
    date: "{insert date here}",
    focusArea: "Robotics & Embedded Control",
    team: TEAM_PH,
    systemOverview: PH.systemOverview,
    toolsAndSkills: ["Gearbox design", "Embedded control", "3D printing", ...PH.tools],
    contributions: PH.contributions,
    results: PH.results,
  },
  {
    slug: "bluefors-dr1-cryostat",
    title: "BlueFors DR1 Cryostat",
    subtitle: "Superconducting transition instrumentation",
    year: "2024",
    yearLabel: "2024",
    projectType: "Test Systems & Instrumentation",
    tags: ["Closed-cycle cryostat", "XLDsl dilution fridge", "PCB design", "Mechanical enclosure", "ANSYS", "DAQ", "ATP authoring"],
    overview:
      "Cryostat instrumentation and enclosure work spanning integration constraints, analysis, and test procedure authoring.",
    highlights: [
      "Designed mechanical enclosure + interfaces",
      "Supported analysis and integration constraints",
      "Authored test procedures (ATP) and supported bring-up",
    ],
    status: "{insert status here}",
    date: "{insert date here}",
    focusArea: "Cryogenics & Test Engineering",
    team: "Sophya Mirza",
    systemOverview: PH.systemOverview,
    toolsAndSkills: ["DAQ", "ANSYS", "PCB design", "ATP authoring", ...PH.tools],
    contributions: PH.contributions,
    results: PH.results,
  },

  // =========================
  // 2021–2023
  // =========================
  {
    slug: "4680-liion-test-fixture",
    title: "4680 Li-ion Cell Test Fixture",
    subtitle: "Battery cell charging and discharging",
    year: "2021",
    yearLabel: "2021–2023",
    projectType: "Power & Energy Systems",
    tags: ["High voltage", "Power electronics", "Custom fixture", "Fiber temp sensing", "Circuit design"],
    overview:
      "Battery test fixture designed for repeatable charge/discharge workflows, safe operation, and clean instrumentation.",
    highlights: [
      "Designed fixture for repeatability and safety",
      "Integrated sensing strategy for thermal/behavior insight",
      "Iterated based on testing and failure modes",
    ],
    status: "{insert status here}",
    date: "{insert date here}",
    focusArea: "Test Hardware & Power",
    team: "Sophya Mirza",
    systemOverview: PH.systemOverview,
    toolsAndSkills: ["HV safety", "Power electronics", "Fixture design", ...PH.tools],
    contributions: PH.contributions,
    results: PH.results,
  },
  {
    slug: "kitta",
    title: "KITTA",
    subtitle: "Drone delivery platform",
    year: "2021",
    yearLabel: "2021–2023",
    projectType: "Robotics & Autonomy",
    tags: ["UAV", "Payload release mechanism", "Autonomy", "Path planning"],
    overview:
      "Drone delivery platform work spanning mechanism design and autonomy-related system considerations.",
    highlights: [
      "Designed payload release mechanism with real constraints",
      "Considered autonomy + path planning requirements",
      "Prototyped and iterated to improve reliability",
    ],
    status: "{insert status here}",
    date: "{insert date here}",
    focusArea: "UAV Mechanisms",
    team: TEAM_PH,
    systemOverview: PH.systemOverview,
    toolsAndSkills: ["Mechanism design", "Rapid prototyping", "Integration", ...PH.tools],
    contributions: PH.contributions,
    results: PH.results,
  },
  {
    slug: "usv",
    title: "USV",
    subtitle: "Unmanned sea surface vehicle",
    year: "2021",
    yearLabel: "2021–2023",
    projectType: "Robotics & Autonomy",
    tags: ["3D Printing", "Enclosure design", "Mechanism design", "Integration"],
    overview:
      "Unmanned sea surface vehicle work focused on enclosure/mechanism design and practical integration.",
    highlights: [
      "Designed enclosure and mechanisms for environmental constraints",
      "Built prototypes with fast iteration loops",
      "Integrated subsystems for dependable operation",
    ],
    status: "{insert status here}",
    date: "{insert date here}",
    focusArea: "Marine Robotics Hardware",
    team: TEAM_PH,
    systemOverview: PH.systemOverview,
    toolsAndSkills: ["Enclosure design", "3D printing", "Integration", ...PH.tools],
    contributions: PH.contributions,
    results: PH.results,
  },
];

// Build slug index
export const PROJECTS_BY_SLUG = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p])
) as Record<string, Project>;

// Optional: by-type grouping for other UI
export const PROJECTS_BY_TYPE = PROJECT_TYPE_ORDER.map((type) => ({
  type,
  projects: PROJECTS.filter((p) => p.projectType === type),
})).filter((group) => group.projects.length > 0);

// DEV-ONLY: warn if any projectType is invalid + if any slugs duplicate
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