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

export type Project = {
  slug: string;
  title: string;
  subtitle: string;

  // keep years for detail pages / timeline metadata, but stop using for sorting
  year: string;
  yearLabel: string;

  // ✅ NEW: primary grouping key for Works page sections
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

  gallery?: string[];
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
      "Reached an apogee of 6,126 ft.",
      "Successful flight recovery.",
    ],
  },

  // =========================
  // Product Design & Mechanisms
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

  // =========================
  // Analysis & Simulation
  // =========================
  {
    slug: "blunt-body-analysis",
    title: "CFD Validation of Supersonic Shock Formation",
    subtitle:
      "Mesh-Converged Analysis of Normal Shock Behavior and Stagnation Properties (Mach 2–3)",
    year: "2026",
    yearLabel: "2026",
    projectType: "Analysis & Simulation",
    tags: [
      "Compressible Flow",
      "Supersonic Aerodynamics",
      "ANSYS Fluent",
      "CFD Validation",
      "Mesh Refinement",
      "Shock Physics",
    ],
    overview:
      "Performed mesh converged CFD simulations of supersonic flow over a blunt body to capture detached normal shock formation and stagnation behavior. Results were quantitatively validated against analytical normal shock relations, achieving ≤0.4% error across pressure, temperature, and density ratios. Conducted Mach sensitivity studies (M=2–3) to evaluate shock stand-off distance and subsonic region evolution.",
    highlights: [
      "Developed converged baseline CFD solution and applied pressure-gradient-based adaptive mesh refinement to resolve detached normal shock structure",
      "Validated CFD pressure, temperature, and density ratios against analytical normal shock equations with ≤0.4% discrepancy",
      "Extracted symmetry-line flow properties to identify shock location and quantify stagnation pressure recovery",
      "Performed Mach sweep (2.0–3.0) to analyze shock stand-off distance, sonic line contraction, and subsonic region behavior",
      "Evaluated total pressure loss across the normal shock and verified stagnation trends using compressible flow theory",
    ],
    status: "COMPLETED",
    date: "2026",
    focusArea: "Supersonic Aerodynamics & CFD Validation",
    gallery: Array.from({ length: 16 }, (_, i) => `/projects/BLUNTBODY/contour${i + 1}.PNG`),
    systemOverview:
      "Performed mesh-converged CFD simulations of supersonic flow over a blunt body to capture detached normal shock formation and stagnation behavior. Results were quantitatively validated against analytical normal shock relations, achieving ≤0.4% error across pressure, temperature, and density ratios. Conducted Mach sensitivity studies (M=2–3) to evaluate shock stand-off distance and subsonic region evolution.",
    toolsAndSkills: ["ANSYS Fluent", "Meshing", "Convergence study"],
    contributions: [
      "Developed converged baseline CFD solution and applied pressure-gradient-based adaptive mesh refinement to resolve detached normal shock structure",
      "Validated CFD pressure, temperature, and density ratios against analytical normal shock equations with ≤0.4% discrepancy",
      "Extracted symmetry-line flow properties to identify shock location and quantify stagnation pressure recovery",
      "Performed Mach sweep (2.0–3.0) to analyze shock stand-off distance, sonic line contraction, and subsonic region behavior",
      "Evaluated total pressure loss across the normal shock and verified stagnation trends using compressible flow theory",
    ],
    results: [
      "Achieved solver convergence in ~1500 iterations; performed adaptive mesh refinement in high pressure-gradient regions (>5×10⁷ Pa/m) to improve shock resolution",
      "Measured stagnation point pressure of ~430 kPa, confirming expected total pressure loss across the shock followed by isentropic recovery to stagnation",
      "Simulated Mach 2.0, 2.5, and 3.0 flow over a blunt body to resolve bow shock formation, stagnation behavior, and subsonic regions",
      "Demonstrated physically consistent trends with increasing Mach number: stronger shocks, higher post-shock pressure/temperature, and shrinking subsonic regions (sonic line moving closer to the body)",
    ],
  },

  // =========================
  // Robotics & Autonomy
  // =========================
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

  // =========================
  // Analysis & Simulation
  // =========================
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
  // Test Systems & Instrumentation
  // =========================
  {
    slug: "helium-dunk-probe",
    title: "Helium Dunk Probe",
    subtitle: "Dewar instrument",
    year: "2024",
    yearLabel: "2024",
    projectType: "Test Systems & Instrumentation",
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
  // Product Design & Mechanisms
  // =========================
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

  // =========================
  // Power & Energy Systems
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
];

export const PROJECTS_BY_SLUG = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p])
) as Record<string, Project>;

// ✅ NEW: grouped export for Works page sections
export const PROJECTS_BY_TYPE = PROJECT_TYPE_ORDER.map((type) => ({
  type,
  projects: PROJECTS.filter((p) => p.projectType === type),
})).filter((group) => group.projects.length > 0);