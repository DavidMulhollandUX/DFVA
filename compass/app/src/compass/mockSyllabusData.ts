// compass/app/src/compass/mockSyllabusData.ts

export interface CourseNode {
  code: string;
  title: string;
  level: number; // 1, 2, 3
  prereqs: string[];
  core: boolean;
}

export interface IraSkill {
  courseCode: string;
  dimensionId: string; // D1 - D10, B
  level: "I" | "R" | "A"; // Introduce, Reinforce, Assess
  rationale: string;
}

export interface SyllabusData {
  courses: CourseNode[];
  iraMatrix: IraSkill[];
  theoreticalFlow: Record<string, number>;
  csvFlow?: Record<string, number>;
  isGenericFallback?: boolean; // true when rendering default data, not real program
}

export function generateMockSyllabus(slug: string): SyllabusData {
  if (slug === "dfva-b-sci") {
    // Bachelor of Science Mock Syllabus
    const courses: CourseNode[] = [
      {
        code: "SCIE10001",
        title: "Today's Science, Tomorrow's World",
        level: 1,
        prereqs: [],
        core: true,
      },
      {
        code: "BIOL10001",
        title: "Biology: Life's Machinery",
        level: 1,
        prereqs: [],
        core: false,
      },
      {
        code: "CHEM10001",
        title: "Chemistry: Foundations",
        level: 1,
        prereqs: [],
        core: false,
      },
      {
        code: "COMP10001",
        title: "Foundations of Computing",
        level: 1,
        prereqs: [],
        core: false,
      },

      {
        code: "BIOL20001",
        title: "Genetics & Evolution",
        level: 2,
        prereqs: ["BIOL10001"],
        core: false,
      },
      {
        code: "CHEM20001",
        title: "Organic Chemistry & Synthesis",
        level: 2,
        prereqs: ["CHEM10001"],
        core: false,
      },
      {
        code: "COMP20002",
        title: "Algorithms & Data Structures",
        level: 2,
        prereqs: ["COMP10001"],
        core: false,
      },

      {
        code: "SCIE30001",
        title: "Science Capstone Project",
        level: 3,
        prereqs: ["SCIE10001"],
        core: true,
      },
      {
        code: "GENE30001",
        title: "Advanced Genomics",
        level: 3,
        prereqs: ["BIOL20001"],
        core: false,
      },
      {
        code: "COMP30002",
        title: "Artificial Intelligence & Machine Learning",
        level: 3,
        prereqs: ["COMP20002"],
        core: false,
      },
    ];

    const iraMatrix: IraSkill[] = [
      // D5: AI Literacy
      {
        courseCode: "COMP10001",
        dimensionId: "D5",
        level: "I",
        rationale: "Introduces basic python coding and algorithmic execution.",
      },
      {
        courseCode: "COMP20002",
        dimensionId: "D5",
        level: "R",
        rationale:
          "Reinforces algorithm complexity, optimization, and data structures.",
      },
      {
        courseCode: "COMP30002",
        dimensionId: "D5",
        level: "A",
        rationale:
          "Formally assesses AI neural networks, model design, and ethical governance.",
      },
      {
        courseCode: "SCIE30001",
        dimensionId: "D5",
        level: "A",
        rationale:
          "Assesses the application of AI tools in collaborative scientific research reports.",
      },

      // D2: Systems Thinking
      {
        courseCode: "SCIE10001",
        dimensionId: "D2",
        level: "I",
        rationale: "Introduces transdisciplinary scientific problem-framing.",
      },
      {
        courseCode: "BIOL20001",
        dimensionId: "D2",
        level: "R",
        rationale:
          "Applies feedback loops and genetic mapping system interactions.",
      },
      {
        courseCode: "SCIE30001",
        dimensionId: "D2",
        level: "A",
        rationale:
          "Assesses trade-off analysis and project-level systems design.",
      },

      // D3: Technical Depth
      {
        courseCode: "CHEM10001",
        dimensionId: "D3",
        level: "I",
        rationale: "Basic chemical formula mechanics.",
      },
      {
        courseCode: "COMP20002",
        dimensionId: "D3",
        level: "R",
        rationale: "Deep quantitative algorithmic modeling.",
      },
      {
        courseCode: "GENE30001",
        dimensionId: "D3",
        level: "A",
        rationale:
          "Assesses primary data generation from genome sequencer scans.",
      },
    ];

    // Theoretical Flow Rates (Cores = 100%, electives split equally per level)
    const theoreticalFlow: Record<string, number> = {
      SCIE10001: 100,
      BIOL10001: 33.3,
      CHEM10001: 33.3,
      COMP10001: 33.3,
      BIOL20001: 33.3,
      CHEM20001: 33.3,
      COMP20002: 33.3,
      SCIE30001: 100,
      GENE30001: 50,
      COMP30002: 50,
    };

    return { courses, iraMatrix, theoreticalFlow, isGenericFallback: false };
  }

  if (slug === "dfva-b-des") {
    // Bachelor of Design Mock Syllabus
    const courses: CourseNode[] = [
      {
        code: "DESN10001",
        title: "Design Foundations: Form & Space",
        level: 1,
        prereqs: [],
        core: true,
      },
      {
        code: "DESN10002",
        title: "Digital Design Tools",
        level: 1,
        prereqs: [],
        core: false,
      },
      {
        code: "DESN20001",
        title: "User Experience (UX) Design",
        level: 2,
        prereqs: ["DESN10002"],
        core: true,
      },
      {
        code: "DESN20002",
        title: "Design Anthropologies",
        level: 2,
        prereqs: ["DESN10001"],
        core: false,
      },
      {
        code: "DESN30001",
        title: "Studio Capstone: Integrated Systems",
        level: 3,
        prereqs: ["DESN20001"],
        core: true,
      },
    ];

    const iraMatrix: IraSkill[] = [
      // D5: AI Literacy
      {
        courseCode: "DESN10002",
        dimensionId: "D5",
        level: "I",
        rationale:
          "Introduces generative image and vector layout AI generation tools.",
      },
      {
        courseCode: "DESN20001",
        dimensionId: "D5",
        level: "R",
        rationale:
          "Reinforces AI-augmented user testing analysis and wireframing.",
      },
      {
        courseCode: "DESN30001",
        dimensionId: "D5",
        level: "A",
        rationale:
          "Assesses deployment of complex design systems with embedded AI workflows.",
      },
    ];

    const theoreticalFlow: Record<string, number> = {
      DESN10001: 100,
      DESN10002: 50,
      DESN20001: 100,
      DESN20002: 50,
      DESN30001: 100,
    };

    return { courses, iraMatrix, theoreticalFlow, isGenericFallback: false };
  }

  // Default Fallback Mock Syllabus (Master of Information Systems or general)
  const courses: CourseNode[] = [
    {
      code: "CORE10001",
      title: "Systems Analysis & Design Core",
      level: 1,
      prereqs: [],
      core: true,
    },
    {
      code: "ELEC10002",
      title: "Information Systems Elective A",
      level: 1,
      prereqs: [],
      core: false,
    },
    {
      code: "ELEC10003",
      title: "Information Systems Elective B",
      level: 1,
      prereqs: [],
      core: false,
    },
    {
      code: "CORE20001",
      title: "Database & Cloud Architectures",
      level: 2,
      prereqs: ["CORE10001"],
      core: true,
    },
    {
      code: "ELEC20002",
      title: "Enterprise Networks",
      level: 2,
      prereqs: ["ELEC10002"],
      core: false,
    },
    {
      code: "CORE30001",
      title: "Enterprise Systems Capstone Project",
      level: 3,
      prereqs: ["CORE20001"],
      core: true,
    },
  ];

  const iraMatrix: IraSkill[] = [
    {
      courseCode: "CORE10001",
      dimensionId: "D5",
      level: "I",
      rationale: "Introduces basic data modeling and database logic.",
    },
    {
      courseCode: "CORE20001",
      dimensionId: "D5",
      level: "R",
      rationale:
        "Reinforces cloud deployment architectures and security frameworks.",
    },
    {
      courseCode: "CORE30001",
      dimensionId: "D5",
      level: "A",
      rationale: "Formally assesses end-to-end cloud database deployment.",
    },
  ];

  const theoreticalFlow: Record<string, number> = {
    CORE10001: 100,
    ELEC10002: 50,
    ELEC10003: 50,
    CORE20001: 100,
    ELEC20002: 50,
    CORE30001: 100,
  };

  return { courses, iraMatrix, theoreticalFlow, isGenericFallback: true };
}
