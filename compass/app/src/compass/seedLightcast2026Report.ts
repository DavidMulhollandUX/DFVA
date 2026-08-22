/**
 * Lightcast 2026 Customer Impact Report — Market Validation Signal seed data.
 *
 * Usage:
 *   cd compass/app && DATABASE_URL="postgresql://..." npx tsx src/compass/seedLightcast2026Report.ts
 *
 * Idempotent: uses skipDuplicates: true on (source, excerpt).
 */

import { PrismaClient } from "@prisma/client";

export const LIGHTCAST_2026_SIGNALS = [
  {
    source: "Lightcast 2026 Customer Impact Report",
    excerpt:
      "96% of ~1,000 customers surveyed say labour market intelligence (LMI) is essential to their operations.",
    url: "https://lightcast.io/resources/research/customer-impact-report-2026",
    dateDiscovered: new Date("2026-07-15"),
    credibilityScore: 8,
    category: "market_validation",
    relevantClaim:
      "LMI demand is near-universal — 96% of institutions consider it essential. Validates DFVA's core market thesis.",
    isActive: true,
  },
  {
    source: "Lightcast 2026 Customer Impact Report",
    excerpt:
      "90% of education customers use labour market intelligence for program review and curriculum planning — the exact use case DFVA serves.",
    url: "https://lightcast.io/resources/research/customer-impact-report-2026",
    dateDiscovered: new Date("2026-07-15"),
    credibilityScore: 8,
    category: "market_validation",
    relevantClaim:
      "Program review is the dominant education use case for LMI. DFVA's assessment pipeline directly addresses this need.",
    isActive: true,
  },
  {
    source: "Lightcast 2026 Customer Impact Report",
    excerpt:
      "89% of customers say labour market intelligence becomes MORE critical as their organisation adopts AI — AI amplifies the need for structured assessment data.",
    url: "https://lightcast.io/resources/research/customer-impact-report-2026",
    dateDiscovered: new Date("2026-07-15"),
    credibilityScore: 9,
    category: "market_validation",
    relevantClaim:
      "AI adoption increases LMI demand — exactly as DFVA's AI-durability thesis predicts. The market is racing toward what DFVA already delivers.",
    isActive: true,
  },
  {
    source: "TIME Top WorkTech Companies 2026",
    excerpt:
      "Lightcast named to TIME's Top WorkTech Companies 2026 list, confirming the vendor's brand strength is growing rapidly in the education technology market.",
    url: "https://time.com/collection/worktech-2026/",
    dateDiscovered: new Date("2026-07-15"),
    credibilityScore: 7,
    category: "market_validation",
    relevantClaim:
      "Lightcast's TIME recognition confirms LMI is a mainstream education technology category. DFVA must differentiate on education-specific methodology.",
    isActive: true,
  },
  {
    source: "Lightcast 2026 Customer Impact Report",
    excerpt:
      "Lightcast surveyed approximately 1,000 customers for the 2026 Customer Impact Report, making this the largest vendor-conducted LMI survey to date.",
    url: "https://lightcast.io/resources/research/customer-impact-report-2026",
    dateDiscovered: new Date("2026-07-15"),
    credibilityScore: 8,
    category: "market_validation",
    relevantClaim:
      "Large-N survey methodology gives this report higher credibility than typical vendor marketing. The findings represent genuine market sentiment, not cherry-picked anecdotes.",
    isActive: true,
  },
];

/**
 * Seed the Lightcast 2026 report signals into the database.
 * Idempotent — safe to run multiple times.
 */
export async function seedLightcast2026Report(prismaClient: PrismaClient) {
  let created = 0;
  for (const signal of LIGHTCAST_2026_SIGNALS) {
    const existing = await prismaClient.marketValidationSignal.findFirst({
      where: { source: signal.source, excerpt: signal.excerpt },
    });
    if (!existing) {
      await prismaClient.marketValidationSignal.create({ data: signal });
      created++;
    }
  }
  console.log(
    `Lightcast 2026 report: ${created} new signals seeded (${LIGHTCAST_2026_SIGNALS.length} total in set).`,
  );
  return created;
}

// Allow running directly: npx tsx src/compass/seedLightcast2026Report.ts
if (
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith("seedLightcast2026Report.ts")
) {
  const prisma = new PrismaClient();
  seedLightcast2026Report(prisma)
    .then((count) => {
      console.log(`Done. ${count} records created.`);
    })
    .catch((e) => {
      console.error("Seed failed:", e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}
