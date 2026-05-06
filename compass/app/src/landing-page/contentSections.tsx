import daBoiAvatar from "../client/static/da-boi.webp";
import type { GridFeature } from "./components/FeaturesGrid";

export const features: GridFeature[] = [
  {
    name: "Curriculum Viability Score",
    description: "10-dimension rubric scores each program 0–36. Dimensions cover automation exposure, AI literacy, systems thinking, decision ownership, research rigour, and more.",
    emoji: "🎯",
    href: "/assess",
    size: "large",
  },
  {
    name: "Risk Band Classification",
    description: "RESILIENT, MODERATE RISK, HIGH RISK, or CRITICAL — giving committees a clear signal for where to act before the next accreditation cycle.",
    emoji: "📊",
    href: "/reports",
    size: "small",
  },
  {
    name: "Labour Market Intelligence",
    description: "Job-family hiring signals mapped directly to curriculum outcomes so academic staff can see which graduate capabilities are compressing under AI pressure.",
    emoji: "📈",
    href: "/reports",
    size: "small",
  },
  {
    name: "AI Literacy and Governance",
    description: "Explicit scoring of whether graduates can design, supervise, and critique AI workflows — not just use tools — including ethics and accountability dimensions.",
    emoji: "🤖",
    href: "/assess",
    size: "medium",
  },
  {
    name: "Redesign Roadmap",
    description: "Prioritised recommendations table linked to specific dimensions, with effort ratings and market signal evidence — ready to take to a curriculum committee.",
    emoji: "🔧",
    href: "/assess",
    size: "medium",
  },
  {
    name: "2027 Graduate Profile",
    description: "A concrete description of the resilient graduate the program should produce — usable as a program learning outcome statement or accreditation brief.",
    emoji: "🎓",
    href: "/reports",
    size: "small",
  },
  {
    name: "Three Threshold Questions",
    description: "YES / NO / UNCERTAIN verdicts on AI replaceability, decision ownership, and 5-year employability — anchored to curriculum evidence, not opinion.",
    emoji: "❓",
    href: "/assess",
    size: "small",
  },
  {
    name: "Outcome Evidence Scoring",
    description: "Scores how well the program publishes destination data — roles, industries, salary, and time-to-employment — to support quality assurance reporting.",
    emoji: "🔬",
    href: "/assess",
    size: "medium",
  },
  {
    name: "Handbook URL Input",
    description: "Paste any university handbook URL. COMPASS retrieves the curriculum and generates a full report in minutes — no manual data entry required.",
    emoji: "⚡",
    href: "/assess",
    size: "medium",
  },
];

export const testimonials = [
  {
    name: "David Mulholland",
    role: "Associate Director, Service Experience & Design, University of Melbourne",
    avatarSrc: daBoiAvatar,
    socialUrl: "#",
    quote:
      "For the first time we have a structured, evidence-based way to answer the question curriculum committees keep avoiding: will this graduate still be employable in five years, and what do we need to change to make sure they are?",
  },
];

export const faqs = [
  {
    id: 1,
    question: "Who is COMPASS for?",
    answer:
      "Program directors, curriculum committees, academic quality assurance teams, careers services, and faculty leadership who need to make evidence-based decisions about curriculum relevance in an AI-augmented labour market.",
    href: "/assess",
  },
  {
    id: 2,
    question: "What does the risk band mean for my program?",
    answer:
      "Programs score 0–36 across 10 dimensions. RESILIENT (28–36) means graduates are well-positioned. MODERATE RISK (20–27) signals targeted action is needed. HIGH RISK (12–19) indicates systemic curriculum gaps. CRITICAL (0–11) requires urgent redesign before the next cohort enrols.",
    href: "/reports",
  },
  {
    id: 3,
    question: "What evidence does COMPASS use?",
    answer:
      "COMPASS combines your published handbook curriculum with current labour market hiring signals and professional discourse analysis. Each dimension score includes curriculum evidence and market signal rationale — not opinion.",
    href: "/assess",
  },
  {
    id: 4,
    question: "How does this support accreditation and quality cycles?",
    answer:
      "The 2027 Graduate Profile output is designed to function as a program learning outcome statement. The recommendations table maps directly to accreditation dimensions and includes effort ratings, making it straightforward to incorporate into a periodic program review.",
    href: "/assess",
  },
];

export const footerNavigation = {
  app: [
    { name: "Assess a Program", href: "/assess" },
    { name: "Reports", href: "/reports" },
  ],
  company: [
    { name: "University of Melbourne", href: "https://unimelb.edu.au" },
    { name: "Privacy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

export const examples: never[] = [];
