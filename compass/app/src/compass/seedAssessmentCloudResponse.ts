/**
 * Coursedog Assessment Cloud response — seed data for feat-017.
 *
 * Creates CompetitiveEvent + MarketValidationSignal records and upserts
 * MarketWindowSnapshot to NARROWING with Assessment Cloud as top threat.
 *
 * Usage:
 *   cd compass/app && DATABASE_URL="postgresql://..." npx tsx src/compass/seedAssessmentCloudResponse.ts
 *
 * Idempotent — safe to run multiple times (findFirst checks before create).
 */

import { PrismaClient } from "@prisma/client";

export const ASSESSMENT_CLOUD_EVENT = {
  competitor: "Coursedog",
  eventType: "PRODUCT_LAUNCH",
  title: "Coursedog Elevates Assessment to Third Product Pillar",
  description:
    "Coursedog has elevated Assessment to a core product pillar alongside Curriculum Cloud and Scheduling Cloud. " +
    "The Assessment Cloud includes Assessment Management and Course Evaluations (from the July 2026 ClassRanked acquisition). " +
    "Coursedog also announced its first annual Academic Operations Conference. " +
    "This structural commitment to assessment represents the most direct competitive encroachment on DFVA's core domain to date.",
  source: "Coursedog product pages + changelog monitoring (research-loop)",
  url: "https://www.coursedog.com/product/assessment",
  dateOccurred: new Date("2026-07-15"),
  dateDiscovered: new Date("2026-07-16"),
  impactScore: 5, // max per Prisma schema (1-5 range)
  marketWindowEffect: "CLOSING",
  isActive: true,
};

export const ASSESSMENT_CLOUD_SIGNALS = [
  {
    source: "Coursedog Product Pages (research-loop monitoring)",
    excerpt:
      "Coursedog has elevated Assessment to a third product pillar, sitting alongside Curriculum Cloud and Scheduling Cloud. " +
      "The Assessment Cloud includes Assessment Management and Course Evaluations (ClassRanked). " +
      "This is the most direct competitive move into DFVA's assessment lane.",
    url: "https://www.coursedog.com/product/assessment",
    dateDiscovered: new Date("2026-07-16"),
    credibilityScore: 8,
    category: "competitor_move",
    relevantClaim:
      "Coursedog is structurally committed to assessment — not a feature experiment but a dedicated product pillar. " +
      "DFVA's independent, methodology-first differentiation is now directly relevant to Coursedog customers evaluating assessment quality.",
    isActive: true,
  },
  {
    source: "Coursedog Announcements (research-loop monitoring)",
    excerpt:
      "Coursedog announced its first annual Academic Operations Conference. " +
      "This is a category-ownership play — establishing Coursedog as the convener of the 'academic operations' conversation, " +
      "which now explicitly includes assessment.",
    url: "https://www.coursedog.com/events",
    dateDiscovered: new Date("2026-07-16"),
    credibilityScore: 7,
    category: "competitor_move",
    relevantClaim:
      "Coursedog is attempting to own the academic operations category narrative. " +
      "DFVA must establish its independent assessment standard framing before the conference establishes Coursedog's integrated narrative as the default.",
    isActive: true,
  },
];

export const MARKET_WINDOW_UPDATE = {
  status: "NARROWING" as const,
  urgencyText:
    "Coursedog has structurally committed to assessment as a third product pillar. " +
    "The market window is narrowing — the assessment category is being actively contested, not just encroached. " +
    "DFVA must differentiate on methodology depth, independence, and platform-agnostic architecture " +
    "before Coursedog's integrated assessment+operations narrative becomes the default category frame.",
  keyThreats: [
    "Coursedog Assessment Cloud — third product pillar with Assessment Management + Course Evaluations (ClassRanked)",
    "Coursedog Academic Operations Conference — category ownership play",
    "Coursedog Inferred Program Maps + Course Demand Projections — descriptive analytics that could expand to prescriptive",
  ],
  recommendedActions: [
    "Ship counter-positioning content: independent standard, methodology depth vs breadth, platform-agnostic framing",
    "Accelerate go-to-market before Coursedog's Academic Operations Conference establishes category narrative",
    "Build competitive comparison surfaces (landing page, DevPortal, Insights) that make differentiation self-evident",
    "Monitor Coursedog conference content for prescriptive assessment feature signals",
  ],
};

export async function seedAssessmentCloudResponse(prismaClient: PrismaClient) {
  let created = 0;

  // 1. CompetitiveEvent
  const existingEvent = await prismaClient.competitiveEvent.findFirst({
    where: {
      competitor: ASSESSMENT_CLOUD_EVENT.competitor,
      title: ASSESSMENT_CLOUD_EVENT.title,
    },
  });
  if (!existingEvent) {
    await prismaClient.competitiveEvent.create({ data: ASSESSMENT_CLOUD_EVENT });
    created++;
    console.log("✓ CompetitiveEvent: Assessment Cloud pillar launch");
  } else {
    console.log("→ CompetitiveEvent already exists, skipped");
  }

  // 2. MarketValidationSignals
  for (const signal of ASSESSMENT_CLOUD_SIGNALS) {
    const existing = await prismaClient.marketValidationSignal.findFirst({
      where: { source: signal.source, excerpt: signal.excerpt },
    });
    if (!existing) {
      await prismaClient.marketValidationSignal.create({ data: signal });
      created++;
    }
  }
  console.log(
    `✓ MarketValidationSignals: ${ASSESSMENT_CLOUD_SIGNALS.length} signals checked (${created - (created > 0 ? 1 : 0)} new, rest deduped)`
  );

  // 3. MarketWindowSnapshot — upsert pattern
  const latest = await prismaClient.marketWindowSnapshot.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (latest) {
    await prismaClient.marketWindowSnapshot.update({
      where: { id: latest.id },
      data: {
        status: MARKET_WINDOW_UPDATE.status,
        urgencyText: MARKET_WINDOW_UPDATE.urgencyText,
        keyThreats: MARKET_WINDOW_UPDATE.keyThreats,
        recommendedActions: MARKET_WINDOW_UPDATE.recommendedActions,
      },
    });
    console.log(`✓ MarketWindowSnapshot updated to ${MARKET_WINDOW_UPDATE.status}`);
  } else {
    await prismaClient.marketWindowSnapshot.create({
      data: {
        status: MARKET_WINDOW_UPDATE.status,
        urgencyText: MARKET_WINDOW_UPDATE.urgencyText,
        keyThreats: MARKET_WINDOW_UPDATE.keyThreats,
        recommendedActions: MARKET_WINDOW_UPDATE.recommendedActions,
      },
    });
    console.log(`✓ MarketWindowSnapshot created (${MARKET_WINDOW_UPDATE.status})`);
  }

  return created;
}

// Allow running directly
if (
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith("seedAssessmentCloudResponse.ts")
) {
  const prisma = new PrismaClient();
  seedAssessmentCloudResponse(prisma)
    .then((count) => {
      console.log(`Done. ${count} records created.`);
    })
    .catch((e) => {
      console.error("Seed failed:", e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}
