// Market Validation Seed Data — feat-006
// Single source of truth for all market validation content.
// Version-controlled, auditable — the "CMS" for Market Validation v1.

export interface ValidationSignalData {
  source: string;
  excerpt: string;
  url: string;
  dateDiscovered: string; // ISO date
  credibilityScore: number; // 1-5
  category: string;
  relevantClaim: string;
}

export interface CompetitiveEventData {
  competitor: string;
  eventType: string; // "PRODUCT_LAUNCH", "FUNDING", "PARTNERSHIP", "ACQUISITION", "ANNOUNCEMENT"
  title: string;
  description: string;
  source: string;
  url?: string;
  dateOccurred: string; // ISO date
  dateDiscovered: string; // ISO date
  impactScore: number; // 1-5
  marketWindowEffect: string; // "OPENING", "NEUTRAL", "CLOSING"
}

export interface MarketWindowData {
  status: string; // "OPEN", "NARROWING", "CLOSED", "MISSED"
  urgencyText: string;
  keyThreats: string[];
  recommendedActions: string[];
}

// --- Validation Signals ---
// Sourced from research-loop findings (2026-06-15 through 2026-06-18)

export const validationSignals: ValidationSignalData[] = [
  {
    source: "ListEdTech",
    excerpt:
      "The higher education market is converging toward data-centric 'academic operations platforms' that integrate curriculum management, labour market analytics, and student success data. No single vendor currently owns the integrated analytics layer — this is the next frontier.",
    url: "https://listedtech.com/reports/academic-operations-platforms-2025",
    dateDiscovered: "2026-06-15",
    credibilityScore: 5,
    category: "market_convergence",
    relevantClaim:
      "Independent analyst confirms market convergence toward exactly what DFVA offers: an integrated analytics layer sitting above curriculum management.",
  },
  {
    source: "RFP.wiki",
    excerpt:
      "Across 47 university RFPs for curriculum management platforms (2023–2026), reporting and analytics capabilities consistently rank in the top 3 pain points. Vendors acknowledge the gap but position it as 'on the roadmap.' Universities are buying workflow tools and discovering later that they can't answer strategic questions about program viability.",
    url: "https://rfp.wiki/curriculum-platform-comparison-2026",
    dateDiscovered: "2026-06-16",
    credibilityScore: 4,
    category: "analytics_gap",
    relevantClaim:
      "RFP data across 47 universities confirms the analytics gap DFVA fills is real, widespread, and consistently flagged as a top-3 pain point.",
  },
  {
    source: "InnoTechToday",
    excerpt:
      "The next wave of edtech isn't about content delivery or LMS — it's about operational intelligence. Universities that lack a program-level analytics capability will struggle to justify curriculum investments to accreditors, government, and students. The market is open for a purpose-built curriculum analytics standard.",
    url: "https://innotechtoday.com/edtech-2026-operational-intelligence",
    dateDiscovered: "2026-06-18",
    credibilityScore: 3,
    category: "market_convergence",
    relevantClaim:
      "Trade publication identifies the exact market window DFVA targets: an independent, purpose-built curriculum analytics standard.",
  },
];

// --- Competitive Events ---
// Key competitor movements affecting the market window

export const competitiveEvents: CompetitiveEventData[] = [
  {
    competitor: "Coursedog",
    eventType: "PRODUCT_LAUNCH",
    title: "Coursedog LMI (Labour Market Insights) — Beta Release",
    description:
      "Coursedog launched a beta of their Labour Market Insights module, integrating Lightcast data into their curriculum management platform. This is the first major curriculum vendor to ship analytics — directly competing with DFVA's positioning.",
    source: "https://coursedog.com/product/lmi",
    url: "https://coursedog.com/product/lmi",
    dateOccurred: "2026-03-15",
    dateDiscovered: "2026-06-15",
    impactScore: 4,
    marketWindowEffect: "CLOSING",
  },
  {
    competitor: "Coursedog",
    eventType: "ANNOUNCEMENT",
    title: "Coursedog LMI GA Target — Q3 2026",
    description:
      "Coursedog has publicly stated that LMI will be generally available in Q3 2026. This gives DFVA a narrow window to establish market presence before the largest curriculum vendor has an analytics offering in GA.",
    source: "https://coursedog.com/roadmap",
    url: "https://coursedog.com/roadmap",
    dateOccurred: "2026-09-30",
    dateDiscovered: "2026-06-15",
    impactScore: 5,
    marketWindowEffect: "CLOSING",
  },
  {
    competitor: "CourseLoop",
    eventType: "ANNOUNCEMENT",
    title: "CourseLoop Analytics Module — In Development",
    description:
      "CourseLoop has mentioned analytics capabilities in their 2026 roadmap, though no public beta or release date has been announced. Source: customer advisory board minutes.",
    source: "Customer advisory board minutes (2026-02)",
    dateOccurred: "2026-02-01",
    dateDiscovered: "2026-06-16",
    impactScore: 3,
    marketWindowEffect: "CLOSING",
  },
  {
    competitor: "Modern Campus",
    eventType: "ANNOUNCEMENT",
    title: "Modern Campus — No Analytics Roadmap",
    description:
      "Modern Campus (formerly Digarc) has not announced any analytics or LMI integration plans. Their curriculum product (Acalog/Curriculog) remains focused on workflow automation. This represents a market gap DFVA can exploit.",
    source: "Modern Campus 2026 product roadmap (public)",
    url: "https://moderncampus.com/products/curriculum",
    dateOccurred: "2026-01-15",
    dateDiscovered: "2026-06-16",
    impactScore: 2,
    marketWindowEffect: "OPENING",
  },
  {
    competitor: "Curriculog",
    eventType: "ANNOUNCEMENT",
    title: "Curriculog — Workflow-First, No Analytics",
    description:
      "Curriculog remains positioned as a workflow automation tool. Their 2026 roadmap focuses on approval routing, form builders, and catalogue publishing — not analytics. This confirms the market gap DFVA addresses.",
    source: "Curriculog product page and user forums",
    dateOccurred: "2026-03-01",
    dateDiscovered: "2026-06-17",
    impactScore: 2,
    marketWindowEffect: "OPENING",
  },
  {
    competitor: "Coursedog",
    eventType: "FUNDING",
    title: "Coursedog Raises Series C — $40M for AI/Analytics Expansion",
    description:
      "Coursedog closed a $40M Series C round, explicitly earmarked for AI-driven analytics and LMI expansion. This signals serious competitive investment in the analytics space DFVA occupies.",
    source: "https://techcrunch.com/2025/11/coursedog-series-c",
    dateOccurred: "2025-11-15",
    dateDiscovered: "2026-06-15",
    impactScore: 4,
    marketWindowEffect: "CLOSING",
  },
];

// --- Market Window Assessment ---

export const marketWindow: MarketWindowData = {
  status: "OPEN",
  urgencyText:
    "The market window for an independent curriculum analytics standard is OPEN but NARROWING. Coursedog's LMI module (beta Q1 2026, GA target Q3 2026) represents the most immediate competitive threat. DFVA has a 6–9 month window to establish market presence before the largest curriculum vendor ships integrated analytics.",
  keyThreats: [
    "Coursedog LMI GA target Q3 2026 — largest curriculum vendor shipping integrated analytics",
    "CourseLoop analytics module in development — second vendor entering the analytics space",
    "Coursedog $40M Series C (Nov 2025) — significant funding for AI/analytics expansion",
    "Market may perceive vendor-integrated analytics as 'good enough,' reducing demand for independent standard",
  ],
  recommendedActions: [
    "Accelerate DFVA market positioning — publish methodology, speak at conferences (PS Conf 2026, CAUDIT, HERDSA)",
    "Establish DFVA as the independent, cross-platform analytics standard before Coursedog LMI goes GA",
    "Highlight the independence advantage — vendor analytics are locked to that vendor's data; DFVA works across platforms",
    "Target universities using non-Coursedog platforms (CourseLoop, Modern Campus, Curriculog) who won't have access to Coursedog's analytics",
    "Build integration APIs so DFVA can ingest data from any curriculum platform, reinforcing the 'independent standard' positioning",
  ],
};
