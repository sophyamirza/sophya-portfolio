// app/works/projects.ts
export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  cover: string; // /public path
  tags: string[];
  overview: string;
  highlights: string[];
};

export const PROJECTS: Project[] = [
  // 2026
  {
    slug: "tesla-m3-rear-wing",
    title: "Vehicle Optimized Aero CF Rear Wing",
    subtitle: "Tesla Model 3",
    year: "2026",
    cover: "/projects/tesla-m3-rear-wing/cover.png",
    tags: ["Aero", "Composites", "Design"],
    overview:
      "A carbon fiber rear wing concept focused on aero performance and manufacturability, sized and iterated through design trades and practical build constraints.",
    highlights: [
      "Defined design intent and constraints (vehicle integration, loads, packaging)",
      "Iterated geometry via aero + structural trade space exploration",
      "Designed for manufacturability and assembly realities",
    ],
  },

  // 2025
  {
    slug: "alula",
    title: "ALULA",
    subtitle: "Liquid Bi-Prop Engine",
    year: "2025",
    cover: "/projects/alula/cover.png",
    tags: ["Propulsion", "Valves", "Feed System", "Cryogenics", "Ethyl/lox"],
    overview:
      "A propulsion build spanning engine architecture through components, integration, and test-driven iteration.",
    highlights: [
      "Engine, chamber, and injector design work",
      "Feed system layout, valves, and interfaces",
      "Integrated a test stand workflow to close loops quickly",
    ],
  },
  
  
  {
    slug: "space-bears",
    title: "Space Bears",
    subtitle: "Quadrupedal robot",
    year: "2025",
    cover: "/projects/space-bears/cover.png",
    tags: ["Robotics", "Mechanisms", "Integration"],
    overview:
      "A quadruped robotics build emphasizing mechanical robustness and iterative integration.",
    highlights: [
      "Mechanical design for durability and serviceability",
      "Integration and bring-up support",
      "Iterated based on real testing and failure modes",
    ],
  },
  {
    slug: "bike-project",
    title: "Bike Project",
    subtitle: "Mechanical build + iteration",
    year: "2025",
    cover: "/projects/bike-project/cover.png",
    tags: ["Mechanical", "Design", "Build"],
    overview:
      "A hands-on mechanical build focused on design iteration, practicality, and clean execution.",
    highlights: [
      "Defined requirements and constraints upfront",
      "Built and iterated based on ride/test feedback",
      "Documented decisions and tradeoffs",
    ],
  },

  // 2024
  {
    slug: "ptsd",
    title: "PTSD",
    subtitle: "Project (add short description)",
    year: "2024",
    cover: "/projects/ptsd/cover.png",
    tags: ["Project", "Systems"],
    overview:
      "A 2024 project page placeholder—swap in your real overview and highlights.",
    highlights: ["Key highlight 1", "Key highlight 2", "Key highlight 3"],
  },
  {
    slug: "metamorphic-designs",
    title: "Metamorphic Designs",
    subtitle: "Adaptive structures / mechanisms",
    year: "2024",
    cover: "/projects/metamorphic-designs/cover.png",
    tags: ["Mechanisms", "Structures", "Design"],
    overview:
      "Metamorphic design concepts exploring geometry change, compliance, and practical constraints.",
    highlights: [
      "Explored mechanisms and morphing concepts",
      "Iterated via prototypes and constraint-driven design",
      "Documented tradeoffs and performance targets",
    ],
  },
  {
    slug: "airbearings",
    title: "Airbearings",
    subtitle: "Precision motion / low friction systems",
    year: "2024",
    cover: "/projects/airbearings/cover.png",
    tags: ["Precision", "Mechanics", "Test"],
    overview:
      "Airbearing-related work focused on precision motion and integration constraints.",
    highlights: ["System integration", "Test/validation", "Iteration and tuning"],
  },
  {
    slug: "six-axis-arm",
    title: "6-Axis Arm",
    subtitle: "Robot arm design + integration",
    year: "2024",
    cover: "/projects/six-axis-arm/cover.png",
    tags: ["Robotics", "Mechanisms", "Control"],
    overview:
      "A 6-axis arm build centered on mechanical design, integration, and performance validation.",
    highlights: ["Kinematics-driven design", "Integration + bring-up", "Testing"],
  },

  // 2021–2023
  {
    slug: "ussv",
    title: "USSV",
    subtitle: "Systems build (2021–2023)",
    year: "2023",
    cover: "/projects/ussv/cover.png",
    tags: ["Systems", "Build", "Integration"],
    overview:
      "USSV work across multiple years—system design and execution with iterative refinement.",
    highlights: ["Scope + requirements", "Build and integration", "Testing"],
  },
  {
    slug: "wind-turbine",
    title: "Wind Turbine Project",
    subtitle: "Design + build + iteration",
    year: "2023",
    cover: "/projects/wind-turbine/cover.png",
    tags: ["Energy", "Mechanics", "Design"],
    overview:
      "A turbine build focused on constraint-driven design and practical performance validation.",
    highlights: ["Design trades", "Fabrication", "Test and iteration"],
  },
  {
    slug: "dfm",
    title: "DFM",
    subtitle: "Design for manufacturability",
    year: "2022",
    cover: "/projects/dfm/cover.png",
    tags: ["Manufacturing", "Design", "Process"],
    overview:
      "DFM work emphasizing manufacturable designs, clean interfaces, and practical process choices.",
    highlights: ["Tolerance/interfaces", "Process tradeoffs", "Documentation"],
  },
  {
    slug: "cmb-dunk-probe",
    title: "CMB Dunk Probe",
    subtitle: "Cryogenic hardware",
    year: "2022",
    cover: "/projects/cmb-dunk-probe/cover.png",
    tags: ["Cryogenics", "Instrumentation", "Build"],
    overview:
      "Cryogenic probe hardware work supporting experimental operations and reliability.",
    highlights: ["Mechanical design", "Integration", "Experimental support"],
  },
  {
    slug: "cmb-bluefors-instrument",
    title: "CMB BlueFors Instrument",
    subtitle: "Cryostat integration",
    year: "2022",
    cover: "/projects/cmb-bluefors-instrument/cover.png",
    tags: ["Cryogenics", "Integration", "Systems"],
    overview:
      "BlueFors cryostat instrumentation integration with tight constraints and careful procedures.",
    highlights: ["Constraint-driven design", "Integration", "Operational reliability"],
  },
  {
    slug: "4680-test-fixture",
    title: "4680 Li-ion Cell Test Fixture",
    subtitle: "Battery test hardware",
    year: "2021",
    cover: "/projects/4680-test-fixture/cover.png",
    tags: ["Batteries", "Thermals", "Test"],
    overview:
      "A test fixture built to support repeatable battery characterization and safe operation.",
    highlights: ["Mechanical fixture design", "Test workflow", "Iteration"],
  },
];

export const PROJECTS_BY_SLUG = Object.fromEntries(
  PROJECTS.map((p) => [p.slug, p])
) as Record<string, Project>;
