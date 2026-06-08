import { HttpError } from 'wasp/server';
import type { 
  AssessProgram,
  GetAssessmentJobs, 
  GetAssessmentJob,
} from 'wasp/server/operations';
import { getAssessmentService } from './assessmentService';

type AssessmentJob = any;

/**
 * Submit a handbook URL for assessment.
 * Returns the AssessmentJob record.
 */
export const assessProgram: AssessProgram<{ handbookUrl: string }, AssessmentJob> = async (
  { handbookUrl },
  context
) => {
  if (!handbookUrl || !handbookUrl.startsWith('http')) {
    throw new HttpError(400, 'Invalid handbook URL');
  }

  const job = await context.entities.AssessmentJob.create({
    data: {
      handbookUrl,
      status: 'processing',
      userId: context.user?.id ?? null,
    },
  });

  try {
    const service = getAssessmentService();
    const result = await service.assess(handbookUrl);

    const updated = await context.entities.AssessmentJob.update({
      where: { id: job.id },
      data: {
        status: 'complete',
        courseCode: result.courseCode,
        programName: result.programName,
        score: result.score,
        maxScore: result.maxScore,
        riskBand: result.riskBand,
        thresholds: result.thresholds,
        dimensions: result.dimensions,
        reportJson: result.reportJson,
      },
    });

    return updated;
  } catch (error: any) {
    await context.entities.AssessmentJob.update({
      where: { id: job.id },
      data: {
        status: 'failed',
        errorMessage: error.message ?? 'Unknown error',
      },
    });
    throw new HttpError(500, `Assessment failed: ${error.message}`);
  }
};

/**
 * List all assessment jobs (most recent first).
 */
export const getAssessmentJobs: GetAssessmentJobs<void, AssessmentJob[]> = async (
  _args,
  context
) => {
  return context.entities.AssessmentJob.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
};

/**
 * Get a single assessment job by ID.
 */
export const getAssessmentJob: GetAssessmentJob<{ id: string }, AssessmentJob | null> = async (
  { id },
  context
) => {
  return context.entities.AssessmentJob.findUnique({
    where: { id },
  });
};
