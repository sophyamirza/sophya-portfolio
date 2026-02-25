// app/works/projects.ts

export type Project = {
  slug: string;
  title: string;
  subtitle: string;

  year: string; // sorting key (ex: "2026", "2021")
  yearLabel: string; // display label (ex: "2021–2023")

  tags: string[];
  cover?: string; // optional: "/projects/<slug>/cover.png"

  // list-level copy (used on gallery page or SEO)
  overview: string;
  highlights: string[];

  // detail-page fields (match your screenshot layout)
  status?: string; // e.g. "In Progress", "Deployed", "Prototype Validated"
  date?: string; // e.g. "January 2026"
  focusArea?: string; // e.g. "Aerodynamics & Composites"
  team?: string; // e.g. "Sophya Mirza" or "Sophya Mirza, ..."
  systemOverview?: string;
  toolsAndSkills?: string[];
  contributions?: string[];
  results?: string[];

  // future-proofing (optional)
  gallery?: string[]; // image paths
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
    slug: "alula",
    title: "ALULA",
    subtitle: "Liquid bi-prop engine rocket",
    year: "2026",
    yearLabel: "2026",
    tags: ["Feed System", "Cryogenics", "Fluids P&ID", "Propulsion", "Ethanol/LOX"],
    overview:
      "Propulsion build spanning engine architecture through components, integration, and test-driven iteration.",
    highlights: [
      "Owned major architecture decisions and interfaces",
      "Developed feed system concepts and documentation (P&ID mindset)",
      "Closed loops through prototyping and validation",
    ],
    status: "{insert status here}",
    date: "{insert date here}",
    focusArea: "Propulsion Systems",
    team: "Sophya Mirza",
    systemOverview: PH.systemOverview,
    toolsAndSkills: ["P&ID", "Feed system design", "Cryogenic handling", ...PH.tools],
    contributions: PH.contributions,
    results: PH.results,
  },
  {
    slug: "cf-rear-wing",
    title: "Vehicle Optimized Carbon Fiber Rear Wing",
    subtitle: "Custom Tesla Model 3 mods",
    year: "2026",
    yearLabel: "2026",
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
    toolsAndSkills: [
      "CFD",
      "Composites layup",
      "CAD",
      "Vehicle integration",
      ...PH.tools,
    ],
    contributions: PH.contributions,
    results: PH.results,
  },
  {
    slug: "blunt-body-analysis",
    title: "Blunt Body Analysis",
    subtitle: "Supersonic flow over a blunt body",
    year: "2026",
    yearLabel: "2026",
    tags: ["Aerodynamics", "ANSYS", "Simulation", "Mesh refinement"],
    overview:
      "Computation of supersonic flow over a blunt body with emphasis on meshing strategy, convergence, and result interpretation.",
    highlights: [
      "Built and refined meshes to resolve key gradients",
      "Ran parameter and convergence checks",
      "Interpreted flow features and sensitivity to numerical choices",
    ],
    status: "COMPLETED",
    date: "2026",
    focusArea: "Aerodynamics",

    // ✅ added: carousel image paths (matches your folder + uppercase .PNG)
    gallery: Array.from({ length: 16 }, (_, i) => {
      const n = i + 1;
      return `/projects/BLUNTBODY/contour${n}.PNG`;
    }),

    systemOverview: PH.systemOverview,
    toolsAndSkills: ["ANSYS Fluent", "Meshing", "Convergence study", ...PH.tools],
    contributions: PH.contributions,
    results: PH.results,
  },

  // =========================
  // 2025
  // =========================
  
  {
    slug: "nasa-suits-spacebears",
    title: "NASA SUITS",
    subtitle: "Founding team SPACEBEARS — UI tech for Artemis",
    year: "2025",
    yearLabel: "2025",
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
    tags: ["Vacuum Hardware", "Cryogenic Instrumentation", "GSE design", "Testing"],
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
    tags: [
      "Planetary Gearbox",
      "Cable actuation",
      "Joint-space PID",
      "Embedded motor control",
      "3D Printing",
    ],
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
    tags: [
      "Closed-cycle cryostat",
      "XLDsl dilution fridge",
      "PCB design",
      "Mechanical enclosure",
      "ANSYS",
      "DAQ",
      "ATP authoring",
    ],
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

export const PROJECTS_BY_SLUG = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p])
) as Record<string, Project>;