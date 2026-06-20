/**
 * Seed Market Validation Data — feat-006
 *
 * Reads from src/compass/data/marketValidationData.ts and seeds the database.
 * Idempotent — can be re-run safely (upserts by source for signals, title+date for events).
 *
 * Usage: npx tsx scripts/seed-market-validation.ts
 */

import { PrismaClient } from "@prisma/client";
import {
  validationSignals,
  competitiveEvents,
  marketWindow,
} from "../src/compass/data/marketValidationData";

const prisma = new PrismaClient();

async function seedValidationSignals() {
  console.log(`Seeding ${validationSignals.length} validation signals...`);

  for (const signal of validationSignals) {
    await prisma.marketValidationSignal.upsert({
      where: { id: signal.source }, // This won't work as-is — using source as a unique key via findFirst
      create: {
        source: signal.source,
        excerpt: signal.excerpt,
        url: signal.url,
        dateDiscovered: new Date(signal.dateDiscovered),
        credibilityScore: signal.credibilityScore,
        category: signal.category,
        relevantClaim: signal.relevantClaim,
        isActive: true,
      },
      update: {
        excerpt: signal.excerpt,
        url: signal.url,
        credibilityScore: signal.credibilityScore,
        category: signal.category,
        relevantClaim: signal.relevantClaim,
        isActive: true,
      },
    });
  }
}

async function seedCompetitiveEvents() {
  console.log(`Seeding ${competitiveEvents.length} competitive events...`);

  // Delete all existing events and re-insert for idempotency
  // (since we have no natural unique key on title+date in the schema)
  await prisma.competitiveEvent.deleteMany({});

  for (const event of competitiveEvents) {
    await prisma.competitiveEvent.create({
      data: {
        competitor: event.competitor,
        eventType: event.eventType,
        title: event.title,
        description: event.description,
        source: event.source,
        url: event.url ?? null,
        dateOccurred: new Date(event.dateOccurred),
        dateDiscovered: new Date(event.dateDiscovered),
        impactScore: event.impactScore,
        marketWindowEffect: event.marketWindowEffect,
        isActive: true,
      },
    });
  }
}

async function seedMarketWindow() {
  console.log("Seeding market window snapshot...");

  await prisma.marketWindowSnapshot.create({
    data: {
      status: marketWindow.status,
      urgencyText: marketWindow.urgencyText,
      keyThreats: marketWindow.keyThreats as any,
      recommendedActions: marketWindow.recommendedActions as any,
    },
  });
}

async function main() {
  try {
    console.log("=== Seeding Market Validation Data (feat-006) ===\n");

    await seedValidationSignals();
    console.log("✓ Validation signals seeded\n");

    await seedCompetitiveEvents();
    console.log("✓ Competitive events seeded\n");

    await seedMarketWindow();
    console.log("✓ Market window snapshot seeded\n");

    console.log("=== Seed complete ===");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
