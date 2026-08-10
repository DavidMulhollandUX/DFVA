import {
  Gauge,
  Layers,
  LineChart,
  Cpu,
  ClipboardList,
  GraduationCap,
  CircleHelp,
  FileCheck,
  Link2,
  ShieldCheck,
  BookOpenCheck,
  PencilRuler,
  Stamp,
  Users,
} from "lucide-react";
import { brand } from "../branding/brandConfig";
import type { GridFeature } from "./components/FeaturesGrid";

const iconClass = "h-7 w-7 text-secondary";

export const features: GridFeature[] = [
  {
    name: "Durability Assessment",
    description:
      "Two measured axes: destination AI exposure, measured from the occupations a program's graduates actually enter on a published index — and curriculum adaptiveness, scored from handbook evidence. Crossed, never summed, into one defensible position.",
    icon: <Gauge className={iconClass} />,
    href: "/assess",
    size: "medium",
  },
  {
    name: "Position & Confidence",
    description:
      "High or low exposure × high or low adaptiveness — a measurement-first position published with its stability ('firm', or 'near a threshold'). Committees get language and evidence to act, never a number the instrument can't defend.",
    icon: <Layers className={iconClass} />,
    href: "/reports",
    size: "medium",
  },
  {
    name: "Labour-Market Intelligence",
    description:
      "Job-family hiring signals mapped to curriculum outcomes, including the human, relational and judgment-intensive capabilities growing in value as AI compresses adjacent roles.",
    icon: <LineChart className={iconClass} />,
    href: "/reports",
    size: "medium",
  },
  {
    name: "AI Literacy & Governance",
    description:
      "Scores whether graduates can design, supervise and critique AI workflows, not just use the tools, including ethics and accountability.",
    icon: <Cpu className={iconClass} />,
    href: "/assess",
    size: "medium",
  },
  {
    name: "Redesign Roadmap",
    description: `Evidence that sits in a report goes nowhere. ${brand.name} turns findings into a prioritised recommendations table, with effort ratings, market rationale and owners, ready for a curriculum committee.`,
    icon: <ClipboardList className={iconClass} />,
    href: "/assess",
    size: "medium",
  },
  {
    name: "2027 Graduate Profile",
    description:
      "A concrete description of the resilient graduate a program should produce, usable as a learning-outcome statement or accreditation brief.",
    icon: <GraduationCap className={iconClass} />,
    href: "/reports",
    size: "medium",
  },
  {
    name: "Intervention Simulator",
    description:
      "Every reachable position under curriculum improvement is enumerated — see exactly which changes would move a program's position, and which wouldn't, before committing committee time to them.",
    icon: <CircleHelp className={iconClass} />,
    href: "/reports",
    size: "medium",
  },
  {
    name: "Evidence & Provenance",
    description:
      "Every exposure value carries its index vintage, destination coverage and occupation-mapping provenance — and every destination title is published, so a reader can check the report against the underlying data.",
    icon: <FileCheck className={iconClass} />,
    href: "/reports",
    size: "medium",
  },
  {
    name: "Handbook URL Input",
    description: `Paste any university handbook URL. ${brand.name} retrieves the curriculum and produces a full rating in minutes, with no manual data entry.`,
    icon: <Link2 className={iconClass} />,
    href: "/assess",
    size: "medium",
  },
];

// ── Story sections ────────────────────────────────────────────────

export const problem = {
  eyebrow: "Why now",
  title: "The signal already exists. It just arrives too late.",
  body: "Employer dissatisfaction, graduate outcomes, skills shortages: the market is shouting about which degrees are losing value. But the signal lands five to seven years stale, after graduation, when nothing can be changed. Curriculum governance runs on multi-year cycles while the labour market re-shapes itself annually. Everyone commits real money and real years on faith.",
  stats: [
    {
      value: "5–10×",
      label:
        "Mismatch between curriculum governance cycles (18 to 84 months) and labour-market change (12 to 18 months).",
    },
    {
      value: "79% → 74%",
      label:
        "Domestic full-time graduate employment, fallen in a single year (QILT 2024).",
    },
    {
      value: "$40k–$200k",
      label:
        "Committed per degree on backward-looking proxies: ATAR, brand, a cousin's advice.",
    },
  ],
};

export const howItWorks = {
  eyebrow: "How it works",
  title: "Curriculum in. A defensible verdict out.",
  steps: [
    {
      icon: Link2,
      title: "Point it at the curriculum",
      body: "Paste a handbook URL. Evidura retrieves the published program, units and learning outcomes, with no manual data entry.",
    },
    {
      icon: Gauge,
      title: "Measure and score",
      body: "Destination AI exposure is measured from the program's own graduate destinations on a published index; curriculum adaptiveness is scored from handbook evidence. The two cross into a position with a stated confidence — never a single summed score.",
    },
    {
      icon: ClipboardList,
      title: "Act on the roadmap",
      body: "Get the named gaps and a prioritised redesign roadmap, with effort ratings and owners, ready to take into a committee.",
    },
  ],
};

export const trustPillars = {
  eyebrow: "Why you can trust the signal",
  title: "Independent. Evidence-led. Citable.",
  pillars: [
    {
      icon: ShieldCheck,
      title: "Independent",
      body: "An assessment is only worth what its impartiality is worth. Evidura is built to be beholden to no program it assesses. Results are confidential to the commissioning institution — we name the band plainly, and we trust you to decide what to do with it.",
    },
    {
      icon: BookOpenCheck,
      title: "Evidence-led",
      body: "Nothing is scored that can't trace to a cited source or the published rubric. Every dimension shows its working: curriculum evidence and market rationale, not vibes.",
    },
    {
      icon: FileCheck,
      title: "Citable",
      body: "No black box. The rubric is published and the bands are comparable across programs, so the signal can go straight into a committee paper or accreditation brief.",
    },
  ],
};

export const decisionMoments = {
  eyebrow: "At the moment of decision",
  title: "Read the rating before the commitment is made.",
  description:
    "The market's signal is most useful before anyone is locked in. Evidura is designed to sit at the three points where a degree's future is actually decided.",
  moments: [
    {
      icon: PencilRuler,
      title: "Design",
      body: "Pressure-test a new or revised program against labour-market durability while the curriculum is still on the drawing board.",
    },
    {
      icon: Stamp,
      title: "Approval",
      body: "Give committees an evidenced, comparable verdict at the approval gate, not a hedged review that defers the hard question.",
    },
    {
      icon: Users,
      title: "Enrolment",
      body: "With institutional consent, give prospective students a trusted signal in place of brand and ATAR proxies. Available when the institution chooses to publish.",
    },
  ],
};

export const closingCta = {
  title: "Durability, made visible.",
  body: "An instrument for the decision-maker, not a verdict over them. View an example report, or assess a program of your own.",
};

// ── In discovery ──────────────────────────────────────────────────
// Roles (not names) of stakeholders engaged in validation discovery
// sessions. Honest framing: participants, not endorsers. Kept broad on
// purpose, no single faculty named.

export const validation = {
  eyebrow: "In discovery",
  title: "Built with the people who decide",
  description:
    "Evidura is being shaped through discovery sessions with the academics and university leaders who actually own curriculum, employability and quality. These are the kinds of roles we have worked through it with.",
  roles: [
    "Faculty academic-services directors",
    "Associate deans (education and undergraduate programs)",
    "Employability researchers and teaching academics",
    "Careers and work-integrated-learning leads",
  ],
};

export const faqs = [
  {
    id: 1,
    question: `Who is ${brand.name} for?`,
    answer:
      "Program directors, curriculum committees, academic quality-assurance teams, faculty leadership, and anyone holding a curriculum-reform mandate who needs evidence-based decisions about relevance in an AI-augmented labour market. It's especially useful for established programs: the ones with the most credibility are often the least likely to get an honest external signal about drift.",
    href: "/assess",
  },
  {
    id: 2,
    question: "What does the position mean for my program?",
    answer:
      "Each program is placed on two axes: destination AI exposure, measured from where its graduates actually work on a published occupation index, and curriculum adaptiveness, scored from curriculum evidence. The four positions (high/low exposure × high/low adaptiveness) are relative to the assessed portfolio, and every position is published with its confidence. High exposure does not mean jobs disappearing — the most AI-exposed occupations are projected to grow; exposure says where the content of the work is changing, and adaptiveness says how well the curriculum prepares graduates for that change.",
    href: "/reports",
  },
  {
    id: 3,
    question: `What evidence does ${brand.name} use?`,
    answer: `${brand.name} combines your published handbook curriculum with current labour-market hiring signals and professional-discourse analysis. Each dimension score includes curriculum evidence and market rationale, not opinion, and traces to the published rubric.`,
    href: "/assess",
  },
  {
    id: 4,
    question: "How does this support accreditation and quality cycles?",
    answer:
      "The 2027 Graduate Profile output is designed to function as a program learning-outcome statement. The recommendations table maps to accreditation dimensions and includes effort ratings, making it straightforward to fold into a periodic program review.",
    href: "/assess",
  },
  {
    id: 5,
    question: `Can I run ${brand.name} on the same program more than once?`,
    answer: `Yes, and you should. Curriculum relevance isn't a fixed point. Running ${brand.name} annually, or at the start of each planning cycle, lets you track whether targeted changes have moved the rating. A living curriculum needs a living feedback loop, not a one-time audit.`,
    href: "/assess",
  },
  {
    id: 6,
    question: "Who sees the results?",
    answer: `Only you. ${brand.name} assessments are confidential to the commissioning institution. No program score is ever published without your explicit written consent. The annual State of Degree Durability index reports anonymised aggregate trends only — individual programs and institutions are never identified.`,
  },
  {
    id: 7,
    question: `Can we publish our own ${brand.signalName}?`,
    answer: `Yes — on your terms. Once the independence structure is fully established, institutions can opt in to display their own assessment scores on program pages. Display is RESILIENT and MODERATE RISK bands only initially, and requires a current (within 12 months) assessment.`,
  },
];

export const footerNavigation = {
  app: [
    { name: "Assess a Program", href: "/assess" },
    { name: "Reports", href: "/reports" },
    { name: "Developers", href: "/developers" },
  ],
  company: [
    { name: "University of Melbourne", href: "https://unimelb.edu.au" },
    { name: "Privacy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

export const examples: never[] = [];
