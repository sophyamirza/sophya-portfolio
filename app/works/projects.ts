// app/works/projects.ts

export type ProjectType =
  | "Propulsion & Fluids"
  | "Robotics & Autonomy"
  | "Analysis & Simulation"
  | "Test Systems & Instrumentation"
  | "Product Design & Mechanisms";

export const PROJECT_TYPE_ORDER: ProjectType[] = [
  "Propulsion & Fluids",
  "Robotics & Autonomy",
  "Analysis & Simulation",
  "Test Systems & Instrumentation",
  "Product Design & Mechanisms",
];

export type ProjectSection = {
  id: string;
  title: string;
  summary?: string;
  bullets?: string[];
  images?: string[];
};

export type ProjectPreview = {
  staticSrc: string;
  hoverSrc: string;
  alt?: string;
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

  // NEW
  subprojects?: Project[];
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
    "{insert result here}",
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
      "Carbon fiber rear wing concept focused on aero performance and manufacturability.",
    highlights: [
      "Defined structural constraints",
      "Iterated aero geometry",
      "Designed repeatable fabrication process",
    ],
    status: "{insert status}",
    date: "{insert date}",
    focusArea: "Aerodynamics",
    team: "Sophya Mirza",
    systemOverview: PH.systemOverview,
    toolsAndSkills: ["CFD", "CAD", ...PH.tools],
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
    tags: ["Aerodynamics", "ANSYS", "Simulation"],
    cover: "/projects/DUNKPROBE/dunkprobebuild2.PNG",
    preview: {
      staticSrc: "/projects/BLUNTBODY/blunt1.PNG",
      hoverSrc: "/projects/BLUNTBODY/blunt2.PNG",
      alt: "Blunt Body Analysis preview",
    },
    overview:
      "Supersonic CFD study focusing on meshing strategy and convergence.",
    highlights: [
      "Mesh refinement studies",
      "Parameter sweeps",
      "Shock structure interpretation",
    ],
    status: "{insert status}",
    date: "{insert date}",
    focusArea: "High Speed Aerodynamics",
    team: "Sophya Mirza",
    systemOverview: PH.systemOverview,
    toolsAndSkills: ["ANSYS Fluent", "Meshing", ...PH.tools],
    contributions: PH.contributions,
    results: PH.results,
  },

  // =========================
  // 2025
  // =========================

  {
    slug: "alula",
    title: "ALULA",
    subtitle: "Liquid bi-prop engine rocket",
    year: "2025",
    yearLabel: "2025",
    projectType: "Propulsion & Fluids",
    tags: ["Propulsion", "Feed System", "Cryogenics"],
    cover: "/projects/ALULA/feed/01.jpg",
    preview: {
      staticSrc: "/projects/ALULA/cover.PNG",
      hoverSrc: "/projects/ALULA/engine1.PNG",
      alt: "ALULA preview",
    },
    overview:
      "Liquid ethanol/LOX rocket program spanning propulsion architecture and test driven iteration.",
    highlights: [
      "Built propulsion feed system",
      "Machined injector and nozzle hardware",
      "Successful launch campaign",
    ],

    subprojects: [
      {
        slug: "alula-rqd",
        title: "Remote Quick Disconnect for Pressurant Lines",
        subtitle: "Pressurant disconnect hardware",
        year: "2025",
        yearLabel: "2025",
        projectType: "Propulsion & Fluids",
        tags: ["RQD", "Pressurant Lines", "Machining"],
        cover: "/projects/ALULA/rqd/01.jpg",
        preview: {
          staticSrc: "/projects/ALULA/rqd/01.jpg",
          hoverSrc: "/projects/ALULA/rqd/02.jpg",
          alt: "RQD preview",
        },
        overview:
          "Remote quick disconnect hardware designed for pressurant line separation during launch operations.",
        highlights: [
          "Designed and machined disconnect hardware",
          "Integrated into pressurant system",
          "Validated during launch ops",
        ],
      },

      {
        slug: "alula-main-valves-system",
        title: "Main Valves System",
        subtitle: "Primary propellant flow control",
        year: "2025",
        yearLabel: "2025",
        projectType: "Propulsion & Fluids",
        tags: ["Valves", "Cryogenic Flow", "Propellant System"],
        cover: "/projects/ALULA/valves/01.jpg",
        preview: {
          staticSrc: "/projects/ALULA/valves/01.jpg",
          hoverSrc: "/projects/ALULA/valves/02.jpg",
          alt: "Valve system preview",
        },
        overview:
          "Valve system responsible for regulating ethanol and LOX propellant flow.",
        highlights: [
          "Cryogenic compatible hardware",
          "Propellant routing architecture",
          "Validated through testing",
        ],
      },

      {
        slug: "alula-engine",
        title: "Engine",
        subtitle: "Injector, chamber, and nozzle hardware",
        year: "2025",
        yearLabel: "2025",
        projectType: "Propulsion & Fluids",
        tags: ["Engine", "Injector", "Nozzle"],
        cover: "/projects/ALULA/nozzle/01.jpg",
        preview: {
          staticSrc: "/projects/ALULA/nozzle/01.jpg",
          hoverSrc: "/projects/ALULA/nozzle/02.jpg",
          alt: "Engine preview",
        },
        overview:
          "Liquid rocket engine hardware including injector, chamber, and nozzle design.",
        highlights: [
          "Manufactured injector hardware",
          "Selected manufacturable nozzle geometry",
          "Integrated into propulsion stack",
        ],
      },
    ],
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
    tags: ["Cryogenics", "Vacuum Hardware"],
    preview: {
      staticSrc: "/projects/DUNKPROBE/dunkprobebuild2.PNG",
      hoverSrc: "/projects/DUNKPROBE/dunkprobebuild.PNG",
    },
    overview: "Cryogenic instrumentation hardware.",
    highlights: [
      "Vacuum compatible design",
      "Integrated instrumentation",
      "Test iteration",
    ],
  },

  {
    slug: "pneumatic-magnetometer-boom-gse",
    title: "Pneumatic Magnetometer Boom GSE",
    subtitle: "Air bearing test stand",
    year: "2024",
    yearLabel: "2024",
    projectType: "Test Systems & Instrumentation",
    tags: ["Pneumatics", "Instrumentation"],
    preview: {
      staticSrc: "/projects/MAGBOOM/magboom1.PNG",
      hoverSrc: "/projects/MAGBOOM/magboom2.PNG",
    },
    overview: "Pneumatic air bearing test stand.",
    highlights: [
      "Designed pneumatic architecture",
      "Instrumented test platform",
      "Validated through testing",
    ],
  },
];

function flattenProjects(projects: Project[]): Project[] {
  return projects.flatMap((project) => [
    project,
    ...(project.subprojects ? flattenProjects(project.subprojects) : []),
  ]);
}

const ALL_PROJECTS = flattenProjects(PROJECTS);

export const PROJECTS_BY_SLUG = Object.fromEntries(
  ALL_PROJECTS.map((p) => [p.slug, p])
) as Record<string, Project>;

export const PROJECTS_BY_TYPE = PROJECT_TYPE_ORDER.map((type) => ({
  type,
  projects: PROJECTS.filter((p) => p.projectType === type),
})).filter((group) => group.projects.length > 0);