/**
 * Coursedog ClassRanked acquisition response — seed data for feat-013.
 *
 * Creates CompetitiveEvent + MarketValidationSignal records and updates
 * MarketWindowSnapshot to NARROWING with the acquisition as the top threat.
 *
 * Usage:
 *   cd compass/app && DATABASE_URL="postgresql://..." npx tsx src/compass/seedClassRankedAcquisitionResponse.ts
 *
 * Idempotent — safe to run multiple times (findFirst checks before create).
 */

import { PrismaClient } from "@prisma/client";

export const CLASSRANKED_ACQUISITION_EVENT = {
  competitor: "Coursedog",
  eventType: "ACQUISITION",
  title:
    "Coursedog Acquires ClassRanked, Rebrands to Intelligent Academic Operations Platform",
  description:
    "Coursedog has acquired ClassRanked (AI-driven course evaluations) and rebranded to " +
    "\u201CIntelligent Academic Operations Platform.\u201D The expanded product stack now includes: " +
    "Assessment Cloud (Assessment Management + Course Evaluations via ClassRanked), " +
    "Coursedog Intelligence (AI-driven insights), Labor Market Insights, " +
    "Inferred Program Maps (auto degree-to-course mapping), and Course Demand Projections. " +
    "This acquisition consolidates Coursedog as the most feature-complete academic operations platform " +
    "and represents the most significant competitive encroachment on DFVA\u2019s assessment lane to date. " +
    "Coursedog now owns both the curriculum management platform and the assessment tool " +
    "that evaluates programs running on that platform \u2014 creating a structural conflict of interest " +
    "that DFVA\u2019s independent standard is designed to resolve.",
  source: "Coursedog product pages + GitHub intelligence (research-loop)",
  url: "https://www.coursedog.com/product/assessment",
  dateOccurred: new Date("2026-07-09"),
  dateDiscovered: new Date("2026-07-09"),
  impactScore: 5, // max per Prisma schema (1-5 range, displayed as 10/10)
  marketWindowEffect: "CLOSING",
  isActive: true,
};

export const CLASSRANKED_ACQUISITION_SIGNALS = [
  {
    source: "Coursedog Product Pages + GitHub (research-loop monitoring)",
    excerpt:
      "Coursedog has acquired ClassRanked, an AI-driven course evaluations company, and rebranded to " +
      "\u201CIntelligent Academic Operations Platform.\u201D The acquisition consolidates the assessment " +
      "category \u2014 Coursedog now owns Assessment Cloud, Coursedog Intelligence, Labor Market Insights, " +
      "Inferred Program Maps, and Course Demand Projections. This is the strongest market validation to date " +
      "that assessment is a standalone product category, not a feature of operations software.",
    url: "https://www.coursedog.com/product/assessment",
    dateDiscovered: new Date("2026-07-09"),
    credibilityScore: 9,
    category: "competitor_move",
    relevantClaim:
      "The ClassRanked acquisition confirms that AI-driven course evaluation and program assessment " +
      "is a distinct market category. Coursedog\u2019s willingness to acquire an entire company to enter " +
      "this space validates DFVA\u2019s thesis that assessment is a standalone category requiring " +
      "dedicated methodology, not a feature bolted onto curriculum management.",
    isActive: true,
  },
  {
    source: "Coursedog Rebrand Announcement (research-loop monitoring)",
    excerpt:
      "Coursedog has rebranded to \u201CIntelligent Academic Operations Platform,\u201D consolidating " +
      "assessment, curriculum, scheduling, and intelligence under a single vendor umbrella. " +
      "This is a category ownership play \u2014 Coursedog is positioning as the unified platform " +
      "for all academic operations, including the assessment layer DFVA was built to serve.",
    url: "https://www.coursedog.com/product/assessment",
    dateDiscovered: new Date("2026-07-09"),
    credibilityScore: 8,
    category: "competitor_move",
    relevantClaim:
      "The rebrand to \u201CIntelligent Academic Operations Platform\u201D signals Coursedog\u2019s intent " +
      "to own the entire academic operations stack, including assessment. This creates a structural " +
      "incentive for Coursedog\u2019s assessment features to optimize for the platform, not for the " +
      "institution. DFVA\u2019s independence \u2014 assessment unbound from any curriculum platform " +
      "\u2014 is the counter-positioning that resolves this conflict of interest.",
    isActive: true,
  },
  {
    source: "Coursedog Product Analysis (research-loop monitoring)",
    excerpt:
      "Coursedog\u2019s expanded product stack \u2014 Coursedog Intelligence, Inferred Program Maps, " +
      "Course Demand Projections, and Labor Market Insights \u2014 provides descriptive analytics: " +
      "what IS happening with enrollments, demand, and scheduling. These are not prescriptive " +
      "methodologies that evaluate what SHOULD exist for a degree to remain durable. The distinction " +
      "between descriptive platform analytics and prescriptive independent assessment is the core " +
      "differentiation DFVA must own before Coursedog\u2019s integrated narrative becomes the default.",
    url: "https://www.coursedog.com/product/assessment",
    dateDiscovered: new Date("2026-07-09"),
    credibilityScore: 7,
    category: "competitor_move",
    relevantClaim:
      "Coursedog\u2019s analytics are descriptive (what IS happening on the platform). " +
      "DFVA\u2019s 11-dimension durability scoring is prescriptive (what SHOULD exist for a " +
      "durable degree). This is not a feature difference \u2014 it is a governance difference. " +
      "Vendor-integrated assessment optimizes for the platform; independent assessment " +
      "optimizes for the institution.",
    isActive: true,
  },
];

export const CLASSRANKED_MARKET_WINDOW_UPDATE = {
  status: "NARROWING" as const,
  urgencyText:
    "Coursedog has acquired ClassRanked and rebranded to Intelligent Academic Operations Platform. " +
    "The market window is narrowing \u2014 the assessment category is being actively consolidated " +
    "by the largest academic operations vendor. DFVA must establish its independent standard framing " +
    "before vendor-integrated assessment becomes the default mental model for program evaluation.",
  keyThreats: [
    "Coursedog acquires ClassRanked \u2014 assessment category consolidation, vendor now owns both platform and assessment tool",
    "Coursedog Assessment Cloud \u2014 third product pillar with Assessment Management + Course Evaluations (ClassRanked)",
    "Coursedog rebrands to Intelligent Academic Operations Platform \u2014 category ownership play",
    "Coursedog Inferred Program Maps + Course Demand Projections \u2014 descriptive analytics that could expand to prescriptive",
  ],
  recommendedActions: [
    "Counter-position on independence: vendor-owned assessment has a structural conflict of interest \u2014 the assessment tool is owned by the platform it assesses. DFVA\u2019s independence is the product, not a feature.",
    "Differentiate on prescriptive vs descriptive: 11-dimension methodology (what SHOULD exist) vs AI-driven insights (what IS happening). Methodology, not automation.",
    "Accelerate go-to-market before Coursedog\u2019s integrated assessment+operations narrative becomes the default category frame.",
    "Build competitive comparison surfaces (Insights, DevPortal) that make the independence vs vendor-integrated distinction self-evident.",
  ],
};

export async function seedClassRankedAcquisitionResponse(
  prismaClient: PrismaClient,
) {
  let created = 0;

  // 1. CompetitiveEvent
  const existingEvent = await prismaClient.competitiveEvent.findFirst({
    where: {
      competitor: CLASSRANKED_ACQUISITION_EVENT.competitor,
      title: CLASSRANKED_ACQUISITION_EVENT.title,
    },
  });
  if (!existingEvent) {
    await prismaClient.competitiveEvent.create({
      data: CLASSRANKED_ACQUISITION_EVENT,
    });
    created++;
    console.log("\u2713 CompetitiveEvent: ClassRanked acquisition");
  } else {
    console.log("\u2192 CompetitiveEvent already exists, skipped");
  }

  // 2. MarketValidationSignals
  for (const signal of CLASSRANKED_ACQUISITION_SIGNALS) {
    const existing = await prismaClient.marketValidationSignal.findFirst({
      where: { source: signal.source, excerpt: signal.excerpt },
    });
    if (!existing) {
      await prismaClient.marketValidationSignal.create({ data: signal });
      created++;
    }
  }
  console.log(
    `\u2713 MarketValidationSignals: ${CLASSRANKED_ACQUISITION_SIGNALS.length} signals checked`,
  );

  // 3. MarketWindowSnapshot \u2014 upsert pattern
  const latest = await prismaClient.marketWindowSnapshot.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (latest) {
    await prismaClient.marketWindowSnapshot.update({
      where: { id: latest.id },
      data: {
        status: CLASSRANKED_MARKET_WINDOW_UPDATE.status,
        urgencyText: CLASSRANKED_MARKET_WINDOW_UPDATE.urgencyText,
        keyThreats: CLASSRANKED_MARKET_WINDOW_UPDATE.keyThreats,
        recommendedActions: CLASSRANKED_MARKET_WINDOW_UPDATE.recommendedActions,
      },
    });
    console.log(
      `\u2713 MarketWindowSnapshot updated to ${CLASSRANKED_MARKET_WINDOW_UPDATE.status}`,
    );
  } else {
    await prismaClient.marketWindowSnapshot.create({
      data: {
        status: CLASSRANKED_MARKET_WINDOW_UPDATE.status,
        urgencyText: CLASSRANKED_MARKET_WINDOW_UPDATE.urgencyText,
        keyThreats: CLASSRANKED_MARKET_WINDOW_UPDATE.keyThreats,
        recommendedActions: CLASSRANKED_MARKET_WINDOW_UPDATE.recommendedActions,
      },
    });
    console.log(
      `\u2713 MarketWindowSnapshot created (${CLASSRANKED_MARKET_WINDOW_UPDATE.status})`,
    );
  }

  return created;
}

// Allow running directly
if (
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith("seedClassRankedAcquisitionResponse.ts")
) {
  const prisma = new PrismaClient();
  seedClassRankedAcquisitionResponse(prisma)
    .then((count) => {
      console.log(`Done. ${count} records created.`);
    })
    .catch((e) => {
      console.error("Seed failed:", e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}
