import { PROJECTS, type Project } from "@/app/works/projects";

export type PortfolioReference = {
  href: string;
  label: string;
};

export type PortfolioKnowledgeEntry = {
  id: string;
  type: "bio" | "experience" | "skills" | "project" | "awards" | "community";
  title: string;
  summary: string;
  details: string[];
  keywords: string[];
  references: PortfolioReference[];
  projectType?: string;
  yearLabel?: string;
  tags?: string[];
};

function flattenProjects(projects: Project[]): Project[] {
  return projects.flatMap((project) => [
    project,
    ...(project.subprojects ? flattenProjects(project.subprojects) : []),
  ]);
}

function cleanText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function isPlaceholderText(text: string) {
  const normalized = text.toLowerCase();
  return (
    normalized.includes("{insert") ||
    normalized.includes("team_ph") ||
    normalized.includes("ph.") ||
    normalized.includes("placeholder")
  );
}

function usableText(text: string) {
  const cleaned = cleanText(text);
  if (!cleaned) return false;
  if (isPlaceholderText(cleaned)) return false;
  return true;
}

const staticEntries: PortfolioKnowledgeEntry[] = [
  {
    id: "bio-overview",
    type: "bio",
    title: "About Sophya",
    summary:
      "Sophya Mirza is a UC Berkeley mechanical engineer focused on aerospace, automotive, energy, and hard-tech systems with a build-test-ship mindset.",
    details: [
      "First-generation Iranian American mechanical engineer at UC Berkeley.",
      "Interested in propulsion, structures, battery systems, cryogenics, and real-world infrastructure.",
      "Emphasizes first-principles thinking, rapid iteration, and hardware ownership.",
    ],
    keywords: [
      "sophya",
      "bio",
      "background",
      "about",
      "berkeley",
      "mechanical engineer",
      "aerospace",
      "energy",
      "automotive",
    ],
    references: [
      { href: "/bio", label: "Bio" },
      { href: "/toolkit", label: "Experience" },
    ],
  },
  {
    id: "experience-highlights",
    type: "experience",
    title: "Industry Experience",
    summary:
      "Sophya has worked across propulsion, structures, batteries, cryogenics, standards, and venture through roles at Astranis, SpaceX, NASA, Proterra, LBNL, SAE, and Berkeley teams.",
    details: [
      "Astranis: propulsion RE intern focused on seals, manifolds, test stands, and Beckhoff DAQ.",
      "SpaceX: Starship primary structures RE intern supporting structures, weld processes, TPS, and qualification work.",
      "NASA TRACERS: mechanical intern for GSE, testing, integration, and pneumatic prototyping.",
      "Proterra: thermal and battery R&D co-op for test fixture design and manufacturing quality.",
      "LBNL: cryogenic mechanical engineering for superconducting instrumentation and test hardware.",
    ],
    keywords: [
      "resume",
      "experience",
      "work",
      "internship",
      "career",
      "astranis",
      "spacex",
      "nasa",
      "proterra",
      "lbnl",
      "sae",
      "venture",
    ],
    references: [
      { href: "/toolkit", label: "Experience" },
      { href: "/contact", label: "Contact + Resume" },
    ],
  },
  {
    id: "skills-overview",
    type: "skills",
    title: "Technical Toolkit",
    summary:
      "The portfolio highlights strengths in CAD, analysis, simulation, prototyping, machining, cryogenic hardware, instrumentation, DAQ, and test execution.",
    details: [
      "CAD: SolidWorks, CATIA, NX, Fusion, Onshape, GD&T, DFM, PDM, and PLM.",
      "Analysis: ANSYS, Abaqus, Nastran, Thermal Desktop, MATLAB, Python, Excel, LabVIEW, FEA, CFD, and FMEA.",
      "Build and test: CNC, manual machining, cryogenic systems, fluids P&ID, instrumentation, valves, regulators, ATP authoring, and diagnostics.",
    ],
    keywords: [
      "skills",
      "toolkit",
      "cad",
      "analysis",
      "simulation",
      "fea",
      "cfd",
      "machining",
      "manufacturing",
      "labview",
      "python",
      "solidworks",
      "nx",
      "catia",
    ],
    references: [
      { href: "/toolkit", label: "Toolkit" },
      { href: "/works", label: "Projects" },
    ],
  },
  {
    id: "awards-overview",
    type: "awards",
    title: "Awards and Recognition",
    summary:
      "Sophya’s portfolio includes honors tied to engineering, leadership, and space-focused work, including Edison Scholars, SAE Engineering Scholar, and The Mars Generation 24 Under 24.",
    details: [
      "Recognized for academic excellence, leadership, and community impact.",
      "Awards span engineering scholarship, maker recognition, and space innovation.",
    ],
    keywords: [
      "awards",
      "honors",
      "recognition",
      "scholarship",
      "edison",
      "mars generation",
      "sae scholar",
    ],
    references: [{ href: "/toolkit", label: "Awards + Honors" }],
  },
  {
    id: "community-overview",
    type: "community",
    title: "Community and Leadership",
    summary:
      "The site positions Sophya as both a builder and community contributor through mentorship, student leadership, STEM advocacy, and technical communities.",
    details: [
      "Founder of SAE university chapter at Berkeley and active in engineering communities.",
      "Mentorship and advocacy appear throughout the bio and experience pages.",
      "Interests and community-facing work emphasize builder culture and technical mentorship.",
    ],
    keywords: [
      "community",
      "leadership",
      "mentor",
      "mentorship",
      "advocacy",
      "sae",
      "builder community",
      "outreach",
    ],
    references: [
      { href: "/recreation", label: "Community" },
      { href: "/bio", label: "Bio" },
    ],
  },
];

const projectEntries: PortfolioKnowledgeEntry[] = flattenProjects(PROJECTS).map(
  (project) => ({
    id: project.slug,
    type: "project",
    title: project.title,
    summary: [project.overview, project.systemOverview, project.subtitle]
      .map((item) => (item ? cleanText(item) : ""))
      .find((item) => usableText(item)) ?? project.title,
    details: [
      project.subtitle,
      ...(project.accomplishments ?? []),
      ...(project.contributions ?? []),
      ...(project.results ?? []),
      ...(project.toolsAndSkills ?? []),
      ...(project.sections?.flatMap((section) => [
        section.title,
        section.summary ?? "",
        ...(section.bullets ?? []),
      ]) ?? []),
    ]
      .map((item) => cleanText(item))
      .filter((item) => usableText(item)),
    keywords: [
      project.slug.replace(/-/g, " "),
      project.title,
      project.subtitle,
      project.projectType,
      project.focusArea ?? "",
      project.team ?? "",
      ...(project.tags ?? []),
      ...(project.toolsAndSkills ?? []),
    ]
      .join(" ")
      .toLowerCase()
      .split(/[^a-z0-9+#]+/i)
      .filter(Boolean),
    references: [
      { href: `/works/${project.slug}`, label: project.title },
      { href: "/works", label: "All Projects" },
    ],
    projectType: project.projectType,
    yearLabel: project.yearLabel,
    tags: project.tags,
  })
);

export const PORTFOLIO_KNOWLEDGE: PortfolioKnowledgeEntry[] = [
  ...staticEntries,
  ...projectEntries,
];
