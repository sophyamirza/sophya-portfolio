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

  // ✅ these are your canonical narrative fields
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
      "Reached an apogee of 6,126 ft!",
      "Successful flight recovery.",
    ],
  },

  // ✅ MOVED: Pneumatic Mag Boom under Propulsion, GSE, Fluids
  {
    slug: "pneumatic-magnetometer-boom-gse",
    title: "Pneumatic Magnetometer Boom GSE",
    subtitle: "Air bearing test stand",
    year: "2024",
    yearLabel: "2024",
    projectType: "Propulsion & Fluids",
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
      "Built converging baseline CFD solution and applied pressure gradient based adaptive mesh refinement to resolve detached normal shock structure",
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
  // Test Systems & Instrumentation
  // =========================
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

    // ✅ Make the rendered fields real (even without fallbacks)
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
  },

  {
    slug: "bluefors-dr1-cryostat",
    title: "BlueFors DR1 Cryostat",
    subtitle: "Superconducting transition instrumentation",
    year: "2024",
    yearLabel: "2024",
    projectType: "Test Systems & Instrumentation",
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

  {
    slug: "4680-liion-test-fixture",
    title: "4680 Li-ion Cell Test Fixture",
    subtitle: "Battery cell charging and discharging",
    year: "2021",
    yearLabel: "2021–2023",
    projectType: "Test Systems & Instrumentation",
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

  // ...rest of your projects unchanged
];

export const PROJECTS_BY_SLUG = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p])
) as Record<string, Project>;

export const PROJECTS_BY_TYPE = PROJECT_TYPE_ORDER.map((type) => ({
  type,
  projects: PROJECTS.filter((p) => p.projectType === type),
})).filter((group) => group.projects.length > 0);