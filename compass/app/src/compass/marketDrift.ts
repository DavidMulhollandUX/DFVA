import type { MarketDriftJob } from 'wasp/server/jobs';

/**
 * Weekly background scheduled worker that checks for labour market shift & drift.
 * Iterates through all completed assessment jobs, simulates industry cluster score drift,
 * and logs warning flags if any program's future-durability score drops.
 */
export const scanMarketDrift: MarketDriftJob<any, any> = async (_args, context) => {
  console.log('[COMPASS] Starting weekly labour market shift & drift scan...');

  try {
    const jobs = await context.entities.AssessmentJob.findMany({
      where: { status: 'complete' },
    });

    if (jobs.length === 0) {
      console.log('[COMPASS] No completed assessment jobs found to analyze.');
      return;
    }

    // Define mock updated cluster-specific dimension modifiers.
    // In a production app, these would be retrieved from a live external scraping API (e.g. Adzuna/Lightcast).
    // A multiplier < 1.0 indicates AI advances have automated that skill, reducing its irreplaceability.
    const clusterModifiers: Record<string, Record<string, number>> = {
      'Software/IT': {
        'D5': 0.8,  // AI Literacy is now commoditized
        'D1': 0.7,  // Automation Exposure is higher
        'D2': 1.1,  // Systems Thinking is more valuable
        'D3': 0.9,  // Basic technical coding depth is slightly less unique
      },
      'BioSciences': {
        'D5': 0.9,
        'D7': 1.1,  // Research rigour is premium
        'D3': 1.0,
      },
      'default': {
        'D1': 0.8,
        'D5': 0.85,
        'D2': 1.05,
      }
    };

    for (const job of jobs) {
      if (!job.syllabusJson || !job.score) continue;

      const syllabus = job.syllabusJson as any;
      const courses = syllabus.courses || [];
      const iraMatrix = syllabus.iraMatrix || [];

      // Determine primary cluster from course code prefix
      let cluster = 'default';
      const codeUpper = (job.courseCode ?? '').toUpperCase();
      if (codeUpper.includes('COMP') || codeUpper.includes('CS') || codeUpper.includes('IS')) {
        cluster = 'Software/IT';
      } else if (codeUpper.includes('BIOL') || codeUpper.includes('SCIE') || codeUpper.includes('SCI')) {
        cluster = 'BioSciences';
      }

      const modifiers = clusterModifiers[cluster] || clusterModifiers['default'];
      
      // Fast, database-only recalculation:
      // We look at all "Assessed" (A) skills. If a modifier exists for that dimension,
      // we apply it to calculate a drifted score.
      let driftedScore = 0;
      
      // Gather unique dimension IDs that are assessed
      const assessedDims = new Set<string>();
      iraMatrix.forEach((skill: any) => {
        if (skill.level === 'A') {
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
        const msg = `ALERT: Program "${job.programName}" (${job.courseCode}) has drifted. Future-durability score fell from ${job.score} to ${finalScore} (-${drop.toFixed(1)} pts) due to AI automation in ${cluster} hiring models.`;
        
        console.warn(`[COMPASS] ${msg}`);
        
        // Log to database logs
        await context.entities.Logs.create({
          data: {
            message: msg,
            level: 'warning',
          }
        });
      }
    }

    console.log('[COMPASS] Labor market shift & drift scan completed successfully.');
  } catch (error: any) {
    console.error('[COMPASS] Error executing weekly marketDriftJob:', error);
  }
};
