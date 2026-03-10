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
  accomplishments: string[];

  status?: string;
  date?: string;
  focusArea?: string;
  team?: string;
  systemOverview?: string;
  toolsAndSkills?: string[];
  contributions?: string[];
  results?: string[];

  gallery?: string[];
  videoSrc?: string;
  videoPoster?: string;

  sections?: ProjectSection[];

  subprojects?: Project[];
  parentSlug?: string;
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
  {
    slug: "blunt-body-analysis",
    title: "Blunt Body Analysis",
    subtitle: "Supersonic flow over a blunt body",
    year: "2026",
    yearLabel: "2026",
    projectType: "Analysis & Simulation",
    tags: ["Aerodynamics", "ANSYS", "Simulation", "Mesh refinement"],
    cover: "/projects/DUNKPROBE/dunkprobebuild2.PNG",
    preview: {
      staticSrc: "/projects/BLUNTBODY/blunt1.PNG",
      hoverSrc: "/projects/BLUNTBODY/blunt2.PNG",
      alt: "Blunt Body Analysis preview",
    },
    overview:
      "Computation of supersonic flow over a blunt body with emphasis on meshing strategy, convergence, and result interpretation.",
    accomplishments: [
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
    gallery: [      
        "/projects/BLUNTBODY/contour1.PNG",
       "/projects/BLUNTBODY/contour2.PNG",
      "/projects/BLUNTBODY/contour3.PNG",
        "/projects/BLUNTBODY/contour4.PNG",
          "/projects/BLUNTBODY/contour5.PNG",
          "/projects/BLUNTBODY/contour6.PNG",
          "/projects/BLUNTBODY/contour7.PNG",
          "/projects/BLUNTBODY/contour8.PNG",
          "/projects/BLUNTBODY/contour9.PNG",
          "/projects/BLUNTBODY/contour10.PNG",
          "/projects/BLUNTBODY/contour11.PNG",
          "/projects/BLUNTBODY/contour12.PNG",
          "/projects/BLUNTBODY/contour13.PNG",
          "/projects/BLUNTBODY/contour14.PNG",
          "/projects/BLUNTBODY/contour15.PNG",
          "/projects/BLUNTBODY/contour16.PNG",
      ]
  },

  {
    slug: "alula",
    title: "ALULA",
    subtitle: "Liquid bi-prop engine rocket",
    year: "2025",
    yearLabel: "2025",
    projectType: "Propulsion & Fluids",
    tags: ["Propulsion", "Feed System", "Cryogenics", "Fluids P&ID", "Ethanol/LOX"],
    cover: "/projects/ALULA/alulahotfire.png",
    preview: {
      staticSrc: "/projects/ALULA/cover.PNG",
      hoverSrc: "/projects/ALULA/engine1.PNG",
      alt: "ALULA preview",
    },
    overview:
      "Liquid ethanol/LOX rocket program spanning propulsion architecture, feed system integration, and test-driven iteration to flight.",
    accomplishments: [
      "Designed (Solidworks) and developed an Electronic Pressure Regulator for accurate propellant pressurization, using SolidWorks and ASME Y14.5 GD&T to create DFM ready hardware that reduced feed system droop by ~35% at a MEOP of 6,000 psi and cryo @  −183∘C, with hand calc backed sizing for a ±3 psi regulation band and 440 kg‑cm (32 ft‑lb) actuation torque.",
      "Developed the final iteration pyrotechnic isolation valve for cryogenic LOX/ethanol service, using SolidWorks, running hand calcs for piston area, black powder energy, and sealing loads, and confirming actuation timing and margins with simulation before machining on a lathe the aluminum prototypes and stainless flight hardware.",
      "Built (RPA) driven sizing workflow for the ethanol/LOX thrust chamber and exhaust, trading nozzle contour against vehicle trajectory to meet our apogee target by selecting a manufacturable de Laval nozzle over a bell contour with only a minor performance penalty, then verified aluminum and steel flight hardware using hand heat flux/hoop stress calculations and SolidWorks thermal/structural simulations to ensure adequate margin against melting and thrust loads.",
      "Grew from prop member to prop subsytems RE and led as prop. dept. lead.Had fun building sick rockets!",
    ],
    status: "COMPLETED",
    date: "LAUNCHED",
    focusArea: "Propulsion Engineering",
    systemOverview:
      "UC Berkeley’s first successfully recovered liquid bi‑propellant rocket, flown at the Friends of Amateur Rocketry launch site in the Mojave Desert.The vehicle uses a pressure fed cryogenic feed system with ethanol fuel and liquid oxygen oxidizer, main valves and remote quick disconnects for safe ground handling, and a manufacturable de Laval nozzle selected to balance performance with student‑shop tooling limits.",
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
      "ANSYS",
      "long nights cronking fittings and bending hardine",
    ],
    contributions: [
      "Designed and developed an Electronic Pressure Regulator for accurate propellant pressurization, using SolidWorks and ASME Y14.5 GD&T to create DFM ready hardware that reduced feed system droop by ~35% at a MEOP of 6,000 psi and cryo @  −183∘C, with hand calc backed sizing for a ±3 psi regulation band and 440 kg‑cm (32 ft‑lb) actuation torque.",
      "Machined the injector and supported end-to-end propulsion hardware fabrication for flight-ready integration.",
      "Built an RPA driven sizing workflow for the ethanol/LOX thrust chamber and exhaust, trading nozzle contour against vehicle trajectory to meet our apogee target",
      " selected a manufacturable de Laval nozzle over a bell contour with only a minor performance penalty, then verified aluminum flight hardware using hand heat‑flux/hoop‑stress calculations and SolidWorks thermal/structural simulations to ensure adequate margin against melting and thrust loads.",
      "Developed the final iteration pyrotechnic isolation valve for cryogenic LOX/ethanol service, using SolidWorks for kinematic layouts and dimensioned drawings with Y14.5 GD&T, running hand calcs for piston area, black powder energy, and sealing loads, and confirming actuation timing and structural margins with simulation before machining aluminum prototypes and stainless flight hardware.",
      "Coordinated propulsion logistics and test operations while also closing the analysis loop on valves, the Electronic Pressure Regulator, RQD, and the main feed system by comparing test data to pre‑flight hand calcs and simulation predictions, then feeding those results back into revised CAD, drawings, and DFM updates for subsequent iterations.",
    ],
    results: [
      "Won the Friends of Amateur Rocketry ‘Dollar Per Foot’ competition.",
      "Reached an apogee of 6,126 ft!",
      "Successful flight recovery.",
    ],
    gallery: [
          "/projects/ALULA/alulahotfire.png",
          "/projects/ALULA/cover.PNG",
          "/projects/ALULA/star3.jpg",
          "/projects/ALULA/alulaCAD.PNG",
          "/projects/ALULA/ALULAINTEGRATED.jpg",
          "/projects/ALULA/star1.jpg",
          "/projects/ALULA/engine1.PNG",
          "/projects/ALULA/engine2.PNG",
          "/projects/ALULA/feedsystem.PNG",
          "/projects/ALULA/launch.PNG",
          "/projects/ALULA/recovery.PNG",
          "/projects/ALULA/star2.jpg",
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
        id: "testing",
        title: "Mojave Testing Campaign",
        summary:
          "Range testing and iteration cadence to close design–test loops prior to launch.",
        bullets: [
          "Transported critical hardware + supported range ops",
          "Validated integrated stack prior to flight",
        ],
    
      },
    ],

    subprojects: [
      {
        slug: "alula-rqd",
        parentSlug: "alula",
        title: "Remote Quick Disconnect for Pressurant Lines",
        subtitle: "Pressurant disconnect hardware",
        year: "2025",
        yearLabel: "2025",
        projectType: "Propulsion & Fluids",
        tags: ["RQD", "Pressurant Lines", "Machining", "Flight Hardware"],
        cover: "/projects/RQD/RQD1.PNG",
        preview: {
          staticSrc: "/projects/RQD/RQD1.PNG",
          hoverSrc: "/projects/RQD/rqd2.PNG",
          alt: "Remote Quick Disconnect preview",
        },
        overview:
          "A remotely actuated quick disconnect (QD) system for the ALULA rocket pressurant umbilical to enable safe ground pressurization and rapid separation at liftoff. Pressurant flow into the system is controlled by a pressurant flow valve, preventing gas from entering the propellant tanks outside of controlled pressurization operations. A high pressure check valve on the pressurant fill tree prevents pressurant gas from escaping once the umbilical is disconnected prior to flight, protecting the exposed fill port and maintaining system pressure.",
        accomplishments: [
          "Designed (Solidworks) quick disconnect hardware around operational constraints and launch sequence requirements.",
          "3D printed working prototype and machined flight hardware out of SS. Built and assembled the hardware for integration within the pressurant system.",
          "Validated fit, function, and release behavior through ground testing, operations and launch use.",
        
        ],
        status: "COMPLETED",
        date: "2025",
        focusArea: "Propulsion Hardware",
        team: "Sophya Mirza",
        systemOverview:
          "Remotely actuated quick disconnect for ALULA rocket pressurant lines, designed to support safe pad operations, rapid separation, and robust integration into the broader propulsion stack.",
        toolsAndSkills: [
          "SolidWorks CAD",
          "Manual machining",
          "Bridgeport",
          "Lathe",
          "Flight hardware integration",
        ],
          
        results: [
          "Enabled remote line separation during launch ops.",
          "Integrated successfully into ALULA propulsion architecture. Validated in ground and flight environments.",
          "The high pressure side of the system is the primary leak risk, so I conducted extensive pressure testing and leak checks prior to cold flow operations. Based on testing, an acceptable leak rate of up to ~10 psi/min was defined for the pressurant tank and associated plumbing.",
        ],
        gallery: [
          "/projects/RQD/RQDCAD.PNG",
          "/projects/RQD/RQDDWG.PNG",
          "/projects/RQD/RQD1.PNG",
          "/projects/RQD/RQ3D.jpg",
        ],
        videoSrc: "/projects/RQD/RQDTEST.mp4",
        videoPoster: "/projects/RQD/RQD1.PNG",
      },
      {
        slug: "alula-main-valves-system",
        parentSlug: "alula",
        title: "Main Valves System",
        subtitle: "Primary propellant flow control",
        year: "2025",
        yearLabel: "2025",
        projectType: "Propulsion & Fluids",
        tags: ["Valves", "Flow Control", "Cryogenics", "Propellant System"],
        cover: "/projects/VALVES/valves1.PNG",
        preview: {
          staticSrc: "/projects/VALVES/valves1.PNG",
          hoverSrc: "/projects/VALVES/valves2.PNG",
          alt: "Main Valves System preview",
        },
        overview:
          "Main valve system for controlling propellant flow through the ethanol and LOX feed architecture.",
        accomplishments: [
          "Supported primary fluid routing and control",
          "Designed for cryogenic compatibility",
          "Iterated through test-driven hardware development",
        ],
        status: "COMPLETED",
        date: "2025",
        focusArea: "Valve Design & Propellant Control",
        team: "Sophya Mirza",
        systemOverview:
          "Primary valve hardware for regulating flow through the ALULA ethanol and LOX systems, balancing cryogenic compatibility, actuation constraints, and integration with the larger feed architecture.",
        toolsAndSkills: [
          "Valve design",
          "Cryogenic hardware",
          "Flow path design",
          "Pressure drop analysis",
          "SolidWorks CAD",
        ],
        contributions: [
          "Supported main propellant flow routing and control architecture.",
          "Designed and iterated valve hardware for cryogenic compatibility.",
          "Closed design-test loops through hardware iteration and validation.",
        ],
        results: [
          "Provided reliable flow control for the propulsion system.",
          "Integrated into the ALULA feed architecture.",
          "Validated through test-driven development.",
        ],
        videoSrc: "/projects/ALULA/ALULALaunch.mp4",
        videoPoster: "/projects/ALULA/RQD1.PNG",
       gallery: [
          "/projects/VALVES/valves1.PNG",
          "/projects/VALVES/valves2.PNG",
        ],
      },
      {
        slug: "alula-engine",
        parentSlug: "alula",
        title: "Engine",
        subtitle: "Injector, chamber, and nozzle hardware",
        year: "2025",
        yearLabel: "2025",
        projectType: "Propulsion & Fluids",
        tags: ["Engine", "Injector", "Nozzle", "Combustion Hardware"],
        cover: "/projects/ALULA/engine1.PNG",
        preview: {
          staticSrc: "/projects/ALULA/engine1.PNG",
          hoverSrc: "/projects/ALULA/engine2.PNG",
          alt: "ALULA Engine preview",
        },
        overview:
          "Liquid rocket engine hardware including injector, chamber, and nozzle development for ALULA.",
        accomplishments: [
          "Supported engine hardware design and manufacturing",
          "Selected manufacturable nozzle geometry",
          "Contributed to integrated propulsion system validation",
        ],
        status: "COMPLETED",
        date: "2025",
        focusArea: "Rocket Engine Hardware",
        team: "Sophya Mirza",
        systemOverview:
          "Engine hardware development for ALULA, including injector, chamber, and nozzle trade studies, manufacturing decisions, and integration into the broader liquid propulsion system.",
        toolsAndSkills: [
          "Injector manufacturing",
          "Nozzle design",
          "RPA",
          "Thermal analysis",
          "Machining",
        ],
        contributions: [
          "Supported design and manufacturing of engine hardware.",
          "Selected manufacturable nozzle geometry based on performance and tooling constraints.",
          "Contributed to integrated propulsion system validation prior to launch.",
        ],
        results: [
          "Engine hardware integrated into the ALULA propulsion stack.",
          "Manufacturable design choices enabled student-shop fabrication.",
          "Supported successful campaign through launch and recovery.",
        ],
        gallery: ["/projects/ALULA/engine1.PNG", 
                  "/projects/ALULA/engine2.PNG"],
      
      },
    ],
  },

  {
    slug: "rescuebot",
    title: "RescueBot",
    subtitle: "Quadrupedal robot",
    year: "2025",
    yearLabel: "2025",
    projectType: "Analysis & Simulation",
    tags: ["Gait optimization", "Mechanism design", "Automation", "Controls"],
    cover: "/projects/RESCUEBOT/rescuebot1.PNG",
    preview: {
      staticSrc: "/projects/RESCUEBOT/rescuebot1.PNG",
      hoverSrc: "/projects/RESCUEBOT/rescuebot2.PNG",
      alt: "RescueBot preview",
    },
    overview:
      "Quadruped robotics project focused on mechanical robustness and performance iteration through testing.",
    accomplishments: [
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
    gallery: [
          "/projects/RESCUEBOT/bot1.png",
          "/projects/RESCUEBOT/bot2.png",
          "/projects/RESCUEBOT/bot3.png",
          "/projects/RESCUEBOT/bot4.png",
          "/projects/RESCUEBOT/bot5.png",
          "/projects/RESCUEBOT/bot6.png",
          "/projects/RESCUEBOT/bot7.png",
          "/projects/RESCUEBOT/bot8.png",
          "/projects/RESCUEBOT/bot9.png",
        ],
  },
  {
    slug: "bike-frame-optimization",
    title: "Bike Frame Optimization",
    subtitle: "Drag analysis of truncated NACA-profiled tube",
    year: "2025",
    yearLabel: "2025",
    projectType: "Analysis & Simulation",
    cover: "/projects/DUNKPROBE/dunkprobebuild2.PNG",
    preview: {
      staticSrc: "/projects/BIKEFRAME/naca1.PNG",
      hoverSrc: "/projects/BIKEFRAME/naca2.PNG",
      alt: "Drag preview",
    },
    tags: ["Wind Tunnel Testing", "CFD", "MATLAB", "Aerodynamics"],
    overview:
      "Aerodynamic analysis of truncated NACA-profiled tubing combining testing and simulation to guide geometry choices.",
    accomplishments: [
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
      hoverSrc: "/projects/DUNKPROBE/badunk.PNG",
      alt: "Dunk Probe preview",
    },
    overview:
      "Cryogenic dewar probe hardware with vacuum-compatible design, integration, and test procedures.",
    accomplishments: [
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
    gallery: [
          "/projects/DUNKPROBE/badunk.PNG",
          "/projects/DUNKPROBE/dunkprobebuild2.PNG",
          "/projects/DUNKPROBE/dunkprobecloseup.PNG",
          "/projects/DUNKPROBE/dunkprobecloseup2.PNG",
          "/projects/DUNKPROBE/dunkprobefullassembly.PNG",
        ],

  },
  {
    slug: "metamorphic-designs",
    title: "Metamorphic Designs",
    subtitle: "Adaptive furniture design",
    year: "2024",
    yearLabel: "2024",
    projectType: "Product Design & Mechanisms",
    tags: ["Product Design", "CNC Routing", "Prototyping", "Market Analysis", "Urban Design"],
    cover: "/projects//METAMORPHIC/table2.PNG",
    preview: {
      staticSrc: "/projects/METAMORPHIC/table2.jpg",
      hoverSrc: "/projects/METAMORPHIC/table1.PNG",
      alt: "Metamorphic Designs preview",
    },
    overview:
      "Adaptive furniture concepts exploring transformable geometry, manufacturability, and real-world constraints.",
    accomplishments: [
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
    cover: "/projects/DUNKPROBE/dunkprobebuild2.PNG",
    preview: {
      staticSrc: "/projects/MAGBOOM/magboom1.PNG",
      hoverSrc: "/projects/MAGBOOM/magboom2.PNG",
      alt: "MagBoom preview",
    },
    overview:
      "Pneumatic / air-bearing GSE enabling controlled testing with instrumentation and repeatable workflows.",
    accomplishments: [
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
    gallery: [
          "/projects/MAGBOOM/magboom3.PNG",
          "/projects/MAGBOOM/magboom4.PNG",
        ],
  },
  {
    slug: "patris",
    title: "PATRIS",
    subtitle: "Probing articulated tubular robotic inspection",
    year: "2024",
    yearLabel: "2024",
    projectType: "Robotics & Autonomy",
    tags: ["Planetary Gearbox", "Cable actuation", "Joint-space PID", "Embedded motor control", "3D Printing"],
    cover: "/projects/DUNKPROBE/dunkprobebuild2.PNG",
    preview: {
      staticSrc: "/projects/PATRIS/patris.PNG",
      hoverSrc: "/projects/PATRIS/patris2.PNG",
      alt: "Drone preview",
    },
    overview:
      "Robotic inspection system emphasizing drivetrain design, embedded motor control, and controllable articulation.",
    accomplishments: [
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
    title: "BluFors DR1 Cryostat",
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
    cover: "/projects/BLUEFORS/instrument1.PNG",
    preview: {
      staticSrc: "/projects/BLUEFORS/instrument9.PNG",
      hoverSrc: "/projects/BLUEFORS/instrument10.PNG",
      alt: "BlueFors DR1 preview",
    },
    overview:
      "Cryostat instrumentation and enclosure work spanning integration constraints, analysis, and test procedure authoring.",
    accomplishments: [
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
    gallery: [
          "/projects/BLUEFORS/instrument9.PNG",
          "/projects/BLUEFORS/instrument10.PNG",
          "/projects/BLUEFORS/instrument1.PNG",
          "/projects/BLUEFORS/instrument2.PNG",
          "/projects/BLUEFORS/instrument3.PNG",
          "/projects/BLUEFORS/instrument4.PNG",
          "/projects/BLUEFORS/instrument5.PNG",
          "/projects/BLUEFORS/instrument6.PNG",
          "/projects/BLUEFORS/instrument7.PNG",
          "/projects/BLUEFORS/instrument8.PNG",
        ],
  },

  {
    slug: "4680-liion-test-fixture",
    title: "4680 Li-ion Cell Test Fixture",
    subtitle: "Battery cell charging and discharging",
    year: "2021",
    yearLabel: "2021–2023",
    projectType: "Test Systems & Instrumentation",
    tags: ["High voltage", "Power electronics", "Custom fixture", "Fiber temp sensing", "Circuit design"],
    cover: "/projects/DUNKPROBE/dunkprobebuild2.PNG",
    preview: {
      staticSrc: "/projects/TESTFIXTURE/charger5.PNG",
      hoverSrc: "/projects/TESTFIXTURE/charger4.PNG",
      alt: "Test Fixture preview",
    },
    overview:
      "Battery test fixture designed for repeatable charge/discharge workflows, safe operation, and clean instrumentation.",
    accomplishments: [
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
      gallery: [      
        "/projects/TESTFIXTURE/charger1.PNG",
       "/projects/TESTFIXTURE/charger2.PNG",
      "/projects/TESTFIXTURE/charger3.PNG",
        "/projects/TESTFIXTURE/charger4.PNG",
          "/projects/TESTFIXTURE/charger5.PNG",
      ]
  },
  {
    slug: "kitta",
    title: "KITTA",
    subtitle: "Drone delivery platform",
    year: "2021",
    yearLabel: "2021–2023",
    projectType: "Robotics & Autonomy",
    tags: ["UAV", "Payload release mechanism", "Autonomy", "Path planning"],
    cover: "/projects/DUNKPROBE/dunkprobebuild2.PNG",
    preview: {
      staticSrc: "/projects/KITTA/KITTA.PNG",
      hoverSrc: "/projects/KITTA/KITTA2.PNG",
      alt: "Drone preview",
    },
    overview:
      "Drone delivery platform work spanning mechanism design and autonomy-related system considerations.",
    accomplishments: [
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
    cover: "/projects/DUNKPROBE/dunkprobebuild2.PNG",
    preview: {
      staticSrc: "/projects/USV/usv1.PNG",
      hoverSrc: "/projects/USV/usv2.PNG",
      alt: "Drone preview",
    },
    overview:
      "Unmanned sea surface vehicle work focused on enclosure/mechanism design and practical integration.",
    accomplishments: [
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

if (process.env.NODE_ENV !== "production") {
  const allowed = new Set(PROJECT_TYPE_ORDER);

  const invalid = ALL_PROJECTS.filter((p) => !allowed.has(p.projectType));
  if (invalid.length) {
    console.warn(
      "Projects with invalid projectType (will fall under Other on /works):",
      invalid.map((p) => ({ slug: p.slug, projectType: p.projectType }))
    );
  }

  const seen = new Set<string>();
  const dups: string[] = [];
  for (const p of ALL_PROJECTS) {
    if (seen.has(p.slug)) dups.push(p.slug);
    seen.add(p.slug);
  }
  if (dups.length) {
    console.warn("Duplicate project slugs (will overwrite in PROJECTS_BY_SLUG):", dups);
  }
}