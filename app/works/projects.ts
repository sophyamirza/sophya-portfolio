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
    ],
  },

  {
    slug: "alula",
    title: "ALULA",
    subtitle: "Liquid bi-prop engine rocket",
    year: "2021-2025",
    yearLabel: "2021-2025",
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
      "Designed (Solidworks) and developed an Electronic Pressure Regulator for accurate propellant pressurization, using SolidWorks and ASME Y14.5 GD&T to create DFM ready hardware that reduced feed system droop by ~35% at a MEOP of 6,000 psi and cryo @  −183∘C, with hand calc backed sizing for a ±3 psi regulation band and 440 kg-cm (32 ft-lb) actuation torque.",
      "Developed the final iteration pyrotechnic isolation valve for cryogenic LOX/ethanol service, using SolidWorks, running hand calcs for piston area, black powder energy, and sealing loads, and confirming actuation timing and margins with simulation before machining on a lathe the aluminum prototypes and stainless flight hardware.",
      "Built (RPA) driven sizing workflow for the ethanol/LOX thrust chamber and exhaust, trading nozzle contour against vehicle trajectory to meet our apogee target by selecting a manufacturable de Laval nozzle over a bell contour with only a minor performance penalty, then verified aluminum and steel flight hardware using hand heat flux/hoop stress calculations and SolidWorks thermal/structural simulations to ensure adequate margin against melting and thrust loads.",
      "Grew from prop member to prop subsytems RE and led as prop. dept. lead.Had fun building sick rockets!",
    ],
    status: "COMPLETED",
    date: "2021-2025",
    focusArea: "Propulsion Engineering",
    systemOverview:
      "UC Berkeley’s first successfully recovered liquid bi-propellant rocket, flown at the Friends of Amateur Rocketry launch site in the Mojave Desert. The vehicle uses a cryogenic feed system with ethanol fuel and liquid oxygen oxidizer, main valves and remote quick disconnects for safe ground handling, and a manufacturable de Laval nozzle selected to balance performance with student-shop tooling limits. I started on the team my Freshman year of college as a Prop member, them became a prop RE, and eventually led the prop team as the prop deputy lead and PM.",
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
      "Designed and developed an Electronic Pressure Regulator for accurate propellant pressurization, using SolidWorks and ASME Y14.5 GD&T to create DFM ready hardware that reduced feed system droop by ~35% at a MEOP of 6,000 psi and cryo @  −183∘C, with hand calc backed sizing for a ±3 psi regulation band and 440 kg-cm (32 ft-lb) actuation torque.",
      "Machined the injector and supported end-to-end propulsion hardware fabrication for flight-ready integration.",
      "Built an RPA driven sizing workflow for the ethanol/LOX thrust chamber and exhaust, trading nozzle contour against vehicle trajectory to meet our apogee target",
      " selected a manufacturable de Laval nozzle over a bell contour with only a minor performance penalty, then verified aluminum flight hardware using hand heat-flux/hoop-stress calculations and SolidWorks thermal/structural simulations to ensure adequate margin against melting and thrust loads.",
      "Developed the final iteration pyrotechnic isolation valve for cryogenic LOX/ethanol service, using SolidWorks for kinematic layouts and dimensioned drawings with Y14.5 GD&T, running hand calcs for piston area, black powder energy, and sealing loads, and confirming actuation timing and structural margins with simulation before machining aluminum prototypes and stainless flight hardware.",
      "Coordinated propulsion logistics and test operations while also closing the analysis loop on valves, the Electronic Pressure Regulator, RQD, and the main feed system by comparing test data to pre-flight hand calcs and simulation predictions, then feeding those results back into revised CAD, drawings, and DFM updates for subsequent iterations.",
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
      "/projects/ALULA/alula13.jpg",
    ],

    sections: [
      {
        id: "details",
        title: "Details",
        bullets: [
          "Initial Thrust: 500 lbf",
          "Chamber: 375 psi, 3300 K",
          "Burn Time: 12–16 s",
          "Propellants: LOX / Ethanol",
          "O/F Ratio: 1.6 > 1.5",
          "Cooling: Ablative Canvas / Phenolic",
          "Injector: Unlike Doublet Impinging",
        ],
      },
      {
        id: "feed-system",
        title: "Cryogenic Feed System",
        summary:
          "LOX/ethanol feed system architecture with student-shop manufacturable interfaces and test-driven integration.",
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
          "Validated fit, function, and release behavior through ground testing, Wrote ATPs foroperations and launch use.",
        ],
        status: "COMPLETED",
        date: "2025",
        focusArea: "Propulsion Hardware",
        team: "Sophya Mirza",
        systemOverview:
          "Remotely actuated quick disconnect for ALULA rocket pressurant lines, designed to support safe pad operations, rapid separation, and robust integration into the broader propulsion stack.The mechanism is composed of two cylindrical sleeves. Upon the piston's actuation, the outer sleeve moves against the female socket of the swage, effectively releasing the male fitting. The system operates with a minimum pressure requirement of 60 PSI. I turned it on a lathe out of stainless steel to avoid freezing LoX under cryo.",
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
        gallery: ["/projects/VALVES/valves1.PNG", "/projects/VALVES/valves2.PNG"],
      },
      {
  slug: "alula-engine",
  parentSlug: "alula",
  title: "Engine",
  subtitle: "Injector, chamber, and nozzle hardware",
  year: "2021-2025",
  yearLabel: "2021-2025",
  projectType: "Propulsion & Fluids",
  tags: ["Engine", "Injector", "Nozzle", "Combustion Hardware"],
  cover: "/projects/ALULA/engine1.PNG",
  preview: {
    staticSrc: "/projects/ALULA/engine1.PNG",
    hoverSrc: "/projects/ALULA/engine2.PNG",
    alt: "ALULA Engine preview",
  },
  overview:
    "Liquid rocket engine development for ALULA spanning injector design, thrust chamber sizing, manufacturable nozzle trades, thermal validation, and integration into the full ethanol/LOX propulsion stack.",
  accomplishments: [
    "Used RPA to model the thrust chamber and nozzle geometry around vehicle-level performance goals and target apogee.",
    "Designed one of the earliest injector concepts and machined the final injector hardware.",
    "Selected a manufacturable de Laval nozzle over a bell nozzle to preserve performance while matching student-shop tooling limits.",
    "Ran SolidWorks thermal and force simulations to verify the chamber and nozzle would survive launch conditions.",
    "Supported integrated engine validation through design iteration, manufacturing, and hot-fire-informed updates.",
  ],
  status: "COMPLETED",
  date: "2025",
  focusArea: "Rocket Engine Hardware",
  team: "Sophya Mirza",
  systemOverview:
    "I supported development of the ALULA liquid rocket engine, including the injector, chamber, and nozzle. I used RPA to model the ideal thrust chamber shape around our specific flight vehicle, thrust target, burn duration, and apogee goal. We intentionally moved away from a standard bell nozzle because it was too difficult to manufacture with the tools available to us, and instead selected a de Laval geometry that gave similar performance with a much more practical machining path. I also designed one of the earliest injector concepts and later manufactured and machined the final injector version, then used SolidWorks thermal and structural simulations to verify the hardware would survive launch loads and heating.",
  toolsAndSkills: [
    "RPA",
    "SolidWorks CAD",
    "SolidWorks Simulation",
    "Injector design",
    "Nozzle design",
    "Thermal analysis",
    "Combustion hardware",
    "Manual machining",
    "Lathe",
    "Manufacturing for limited-tool environments",
  ],
  contributions: [
    "Modeled the engine around vehicle-level requirements, including thrust target, burn duration, and apogee, using RPA.",
    "Traded manufacturability against ideal performance and selected a de Laval nozzle instead of a standard bell contour.",
    "Designed one of the first injector concepts and machined the final injector hardware used for the engine program.",
    "Ran thermal and force simulations in SolidWorks to check chamber and nozzle survivability under expected launch conditions.",
    "Supported engine integration into the broader ALULA propulsion system and fed analysis results back into hardware decisions.",
  ],
  results: [
    "Engine geometry was sized around a realistic, vehicle-specific mission target rather than a generic textbook configuration.",
    "De Laval nozzle selection preserved near-target performance while enabling practical manufacturing with student-shop tools.",
    "Injector, chamber, and nozzle hardware were carried through design, machining, and integrated propulsion validation.",
    "Thermal and structural analysis established acceptable margin before fabrication and launch use.",
  ],

  sections: [
    {
      id: "engine-overview",
      title: "High-Level System Parameters",
      summary:
        "Vehicle-level and engine-level targets used to size the chamber, nozzle, and injector architecture.",
      bullets: [
        "Target Apogee: 2500 m ±10%",
        "Approx. Vehicle Mass: 40 kg dry",
        "Approx. Thrust Level / Burn Time: 1.80 kN, 10 s",
        "Priorities: stable, conservative performance and efficient manufacturing / assembly",
        "Injector: unlike-doublet impinging, LOX-centered",
        "Chamber: ablative + fuel-jetted wall film, 6061 aluminum jacket",
        "Nozzle: graphite throat, 316 stainless steel expansion section",
      ],
      
    },
    {
      id: "engine-details",
      title: "Engine Details",
      summary:
        "Baseline operating parameters and combustion hardware choices used to define the engine configuration.",
      bullets: [
        "Initial Thrust: 500 lbf",
        "Chamber: 375 psi, 3300 K",
        "Burn Time: 12–16 s",
        "Propellants: LOX / Ethanol",
        "O/F Ratio: 1.6 > 1.5",
        "Cooling: Ablative Canvas / Phenolic",
        "Injector: Unlike Doublet Impinging",
      ],
      images: [
        "/projects/ALULA/engine1.PNG",
      ],
    },
    {
      id: "injector-design",
      title: "Injector Design",
      summary:
        "I designed one of the earliest injector concepts and later machined the final injector version, balancing atomization behavior, manufacturability, and hot-fire robustness.",
      bullets: [
        "Designed one of the earliest injector concepts and manufactured / machined the final version",
        "Unlike-doublet impinging injector, LOX-centered",
        "Roughly 8:1 orifice L:D",
        "Free Path : Fuel Diameter = 4.5:1",
        "Impinger total angle: 69°",
        "Resulting fan angle: 1.0° inwards",
        "Area split: 1/3 inner / outer",
        "Fuel shedding instability reduced from 2.66 kHz to 1.06 kHz",
        "Heat flux at injector face remained acceptable through hot-fire",
      ],
      images: [
        "/projects/ALULA/2engine.PNG",
        "/projects/ALULA/7engine.PNG",
      ],
    },
    {
      id: "wall-film-cooling",
      title: "Wall Film Cooling Strategy",
      summary:
        "Secondary ethanol film cooling was added around the chamber wall to protect the phenolic liner and control local heating near the hottest regions.",
      bullets: [
        "No change to injection holes",
        "8 holes pointed radially around hotspot regions",
        "10–15% of ethanol mass flow rate allocated to film cooling",
        "Simple geometry improved machine-ability",
        "Primary concerns: pressure drop through cooling holes",
        "Primary concerns: high frictional losses",
        "Primary concerns: selecting an impact angle that hit the phenolic without splash-back while still spreading ethanol broadly",
      ],
      
    },
    {
      id: "chamber-and-nozzle",
      title: "Chamber and Nozzle Architecture",
      summary:
        "The chamber and nozzle were split into manufacturable material sections to manage heat load, fabrication limits, and structural margin.",
      bullets: [
        "Chamber Sleeve: 6061-T6 aluminum, 3.625 in OD, 3.25 in ID",
        "Ablative Sleeve: canvas phenolic, 3.25 in OD, 2.75 in ID",
        "Nozzle: upper graphite section",
        "Nozzle: lower 316 stainless steel section",
        "Planned YSZ or alternative ceramic coating to reduce steel temperature",
        "Nozzle redesign followed a previous nozzle blowout",
        "Mounted using a steel snap ring",
      ],
      images: [
        "/projects/ALULA/9engine.PNG",
      ],
    },
    {
      id: "rpa-nozzle-trade",
      title: "RPA Sizing and Nozzle Trade",
      summary:
        "I used RPA to size the thrust chamber shape and nozzle around the actual ALULA flight vehicle and apogee target, then selected a manufacturable de Laval contour instead of a standard bell nozzle.",
      bullets: [
        "Modeled the ideal thrust chamber shape around the specific flight vehicle and mission goal",
        "Used target apogee and thrust requirements to guide chamber and nozzle sizing",
        "Decided against a standard bell nozzle because it was too difficult to manufacture with available tools",
        "Selected a de Laval nozzle that delivered similar performance with a far more practical manufacturing path",
        "Closed the loop between propulsion analysis and hardware fabrication constraints",
      ],
      images: [
        "/projects/ALULA/engine2.PNG",
      ],
    },
    {
      id: "thermal-structural-validation",
      title: "Thermal and Structural Validation",
      summary:
        "I ran SolidWorks thermal and force simulations to verify the engine hardware would survive expected launch heating and load cases before fabrication and use.",
      bullets: [
        "Highest stresses were concentrated in the nozzle assembly, especially the stainless expansion section",
        "Projected factor of safety for stainless expansion section: ~2.4",
        "Projected factor of safety for graphite section: ~1.5",
        "Temperatures were believed to be conservative / likely overestimates",
        "Planned ceramic coating on stainless section to further reduce temperature",
        "Used simulation results to guide confidence in the final hardware geometry",
      ],
      images: [
        "/projects/ALULA/1engine.PNG",
        "/projects/ALULA/3engine.PNG",
      ],
    },
    {
      id: "igniter-and-integration",
      title: "Igniter and Integration Updates",
      summary:
        "Igniter and mounting geometry were iterated for better reliability, cleaner integration, and reduced risk of interference with the updated nozzle hardware.",
      bullets: [
        "Igniter core kept the same base architecture but was slimmed down",
        "Considered extra e-match / black powder for improved reliability",
        "Top cup on the mount was reduced or removed to lower chance of nozzle strike",
        "Mount changed from 3 arms to 4 arms for simpler, thicker geometry",
        "Planned further testing with COM-DAQ hardware to prevent misfires and board damage",
        "Required follow-on work included modifying clamps to fit the new nozzle geometry",
      ],
      images: [
        "/projects/ALULA/4engine.PNG",
      ],
    },
  ],

    gallery: [
    "/projects/ALULA/engine1.PNG",
    "/projects/ALULA/engine2.PNG",
  ],
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
      "The liquid helium dunk probe system was developed to enable low-noise, four-point resistance measurements of superconducting transition-edge sensor (TES) and related wire-bonded devices used in Cosmic Microwave Background (CMB) detector research at LBNL. The system integrates a copper/PCB mounting stage housed inside a cryogenic dewar, read out through a Bendix vacuum feedthrough to a Lake Shore 372 AC resistance bridge. This setup allows rapid iterative testing of devices at millikelvin temperatures without requiring a full cryostat cooldown, providing a flexible platform for diagnosing electrical shorts, verifying thermal anchoring, and characterizing normal and superconducting transitions.I am a researcher in the Cosmic Microwave Background (CMB) group at Lawrence Berkeley National Laboratory, where we develop advanced instrumentation for next generation cosmology experiments. We design and test superconducting detectors, cryogenic readout systems, and optical components to enable ultra sensitive measurements of the early universe. As part of Lawrence Berkeley National Laboratory, a U.S. Department of Energy National Laboratory operated by the University of California, we collaborate with national and international partners to push the limits of precision cosmology and support upcoming space and ground based CMB missions.studies the oldest light in the universe to search for the imprint of quantum fluctuations left behind by cosmic inflation, determine the abundance of light relic particles in the early universe, measure the absolute scale of the neutrino mass, probe the physics of dark matter dark energy, and more. ",
    accomplishments: [
      "Designed and modeled a liquid helium dunk probe assembly in SolidWorks with four-point measurement capability and integrated thermal anchoring for cryogenic stability",
      "Developed a custom signal PCB in EAGLE with independent TES bias and sense lines to minimize cross talk and improve low resistance measurement accuracy",
      "Machined and assembled a vacuum-compatible copper enclosure and probe housing, achieving a base temperature of 49 mK during continuous operation",
      "Integrated and wire bonded TES samples, confirming shorts on full-wafer setup at 4 K (source under investigation)",
      "Measured normal resistance (Rn) of LS CH1 sample 'DL-LF-r1-001A-Pix36-40GHz-Bot' using high-bias sweeps: 7.6 mΩ @ 31.6 mA, 6.7 mΩ @ 10 mA, 3.4 mΩ @ 3.16 mA, 0.007 mΩ ≤ 1 mA, indicating persistent niobium short behavior",
      "Correlated cryogenic electrical data across dunk probe and BlueFors cryostat runs to validate experimental consistency and identify low-current anomalies",
      "Collaborated effectively with PhD students, fostering teamwork and knowledge exchange to drive the project's success in fabricating mechanisms and instrumentation for future unvierse exploration.",
    ],

    status: "COMPLETED",
    focusArea: "Cryogenic Instrumentation",
    team: "Sophya Mirza",
    systemOverview:
      "I developed the liquid helium dunk probe system at Lawrence Berkeley National Laboratory to enable low noise, four point resistance measurements of superconducting transition edge sensor (TES) devices for Cosmic Microwave Background (CMB) detector research. Working within the CMB group, a U.S. Department of Energy National Laboratory operated by the University of California, we design and test cryogenic instrumentation to study the oldest light in the universe and explore fundamental physics such as cosmic inflation, neutrino mass, and dark matter.",
    toolsAndSkills: ["Vacuum hardware", "Cryogenic testing", "GSE design", ...PH.tools],
    contributions: PH.contributions,
    results: [
      "Validated the liquid helium dunk probe for four-point measurements, confirming electrical continuity and cryogenic stability.",
      "Re-tested BT10-01-Dual-TES sample to verify a previously observed niobium short; results confirmed the anomaly using the new probe setup.",
      "Conducted measurements on three 'Test B' dies (Q4B-30T, Q5B, Q6B); Q4B-30T indicated a possible short but was lost in the He dewar, while Q5B and Q6B showed no shorts.",
      "Analyzed archived data for SOLF-2B pixels 27 and 34; pixel 27 showed no short, and pixel 34 reproduced a low-current short consistent with earlier findings.",
      "Observed negative resistance readings, interpreted as measurements below the instrument’s valid range due to extremely low resistance.",
      "Verified 107 Ω warm resistance for BT10-01-Dual-TES using both multimeter and Lakeshore setups for cross-validation.",
      "Configured additional samples for follow-up BlueFors Cryostat testing to maintain continuity between dunk probe and cryostat datasets.",
      "/projects/DUNKPROBE/dunkresults.PNG",
    ],

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
    gallery: ["/projects/MAGBOOM/magboom3.PNG", "/projects/MAGBOOM/magboom4.PNG"],
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
    ],
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