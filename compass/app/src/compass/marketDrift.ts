import type { MarketDriftJob } from "wasp/server/jobs";
import { logger } from "../server/logger";

/**
 * Explicit course-code-prefix → industry-cluster map. Substring matching
 * ("codeUpper.includes('IS')") misclassified any code containing those
 * letters — e.g. HIST would have been bucketed as Software/IT.
 */
const CLUSTER_BY_CODE_PREFIX: Record<string, string> = {
  "MC-CS": "Software/IT",
  "MC-IS": "Software/IT",
  "MC-IT": "Software/IT",
  "MC-DS": "Software/IT",
  COMP: "Software/IT",
  "B-SCI": "BioSciences",
  BIOL: "BioSciences",
  SCIE: "BioSciences",
};

function clusterForCourseCode(courseCode: string | null): string {
  const codeUpper = (courseCode ?? "").toUpperCase();
  for (const [prefix, cluster] of Object.entries(CLUSTER_BY_CODE_PREFIX)) {
    if (codeUpper.startsWith(prefix)) return cluster;
  }
  return "default";
}

/**
 * Weekly background scheduled worker that checks for labour market shift & drift.
 * Iterates through all completed assessment jobs, simulates industry cluster score drift,
 * and logs warning flags if any program's future-durability score drops.
 */
export const scanMarketDrift: MarketDriftJob<any, any> = async (
  _args,
  context,
) => {
  logger.info("Starting weekly labour market shift & drift scan", {
    job: "marketDriftJob",
  });

  try {
    const jobs = await context.entities.AssessmentJob.findMany({
      where: { status: "complete" },
    });

    if (jobs.length === 0) {
      logger.info("No completed assessment jobs found to analyze", {
        job: "marketDriftJob",
      });
      return;
    }

    // Define mock updated cluster-specific dimension modifiers.
    // In a production app, these would be retrieved from a live external scraping API (e.g. Adzuna/Lightcast).
    // A multiplier < 1.0 indicates AI advances have automated that skill, reducing its irreplaceability.
    const clusterModifiers: Record<string, Record<string, number>> = {
      "Software/IT": {
        D5: 0.8, // AI Literacy is now commoditized
        D1: 0.7, // Automation Exposure is higher
        D2: 1.1, // Systems Thinking is more valuable
        D3: 0.9, // Basic technical coding depth is slightly less unique
      },
      BioSciences: {
        D5: 0.9,
        D7: 1.1, // Research rigour is premium
        D3: 1.0,
      },
      default: {
        D1: 0.8,
        D5: 0.85,
        D2: 1.05,
      },
    };

    for (const job of jobs) {
      if (!job.syllabusJson || !job.score) continue;

      const syllabus = job.syllabusJson as any;
      const courses = syllabus.courses || [];
      const iraMatrix = syllabus.iraMatrix || [];

      // Determine primary cluster from course code prefix
      const cluster = clusterForCourseCode(job.courseCode);

      const modifiers =
        clusterModifiers[cluster] || clusterModifiers["default"];

      // Fast, database-only recalculation:
      // We look at all "Assessed" (A) skills. If a modifier exists for that dimension,
      // we apply it to calculate a drifted score.
      let driftedScore = 0;

      // Gather unique dimension IDs that are assessed
      const assessedDims = new Set<string>();
      iraMatrix.forEach((skill: any) => {
        if (skill.level === "A") {
          assessedDims.add(skill.dimensionId);
        }
      });

      // Calculate new score: baseline is total unique assessed skills.
      // Suppose each assessed skill originally contributes a base weight of 2 points.
      // (Pre-seeded B-Sci score is 23, B-Des is 17).
      // Let's calculate the delta drift:
      let driftDelta = 0;
      assessedDims.forEach((dimId) => {
        if (modifiers[dimId]) {
          const mod = modifiers[dimId];
          // If modifier is less than 1, we drift downward
          if (mod < 1.0) {
            driftDelta += (mod - 1.0) * 2; // e.g. (0.7 - 1.0) * 2 = -0.6
          } else {
            driftDelta += (mod - 1.0) * 1.5;
          }
        }
      });

      const finalScore = Math.max(0, Math.round(job.score + driftDelta));

      if (finalScore < job.score) {
        const drop = job.score - finalScore;
        const msg = `ALERT: Program "${job.programName}" (${
          job.courseCode
        }) has drifted. Future-durability score fell from ${
          job.score
        } to ${finalScore} (-${drop.toFixed(
          1,
        )} pts) due to AI automation in ${cluster} hiring models.`;

        logger.warn(msg, {
          job: "marketDriftJob",
          courseCode: job.courseCode,
          cluster,
        });

        // Log to database logs
        await context.entities.Logs.create({
          data: {
            message: msg,
            level: "warning",
          },
        });
      }
    }

    logger.info("Labour market shift & drift scan completed successfully", {
      job: "marketDriftJob",
    });
  } catch (error: unknown) {
    logger.error("Weekly marketDriftJob failed", error, {
      job: "marketDriftJob",
    });
    // Rethrow so PgBoss records the failure and applies its retry policy —
    // swallowing here made a permanently broken weekly job look successful.
    throw error;
  }
};
