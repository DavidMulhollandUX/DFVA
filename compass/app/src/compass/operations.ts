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

  if (!context.user) throw new HttpError(401, 'Authentication required');

  const job = await context.entities.AssessmentJob.create({
    data: {
      handbookUrl,
      status: 'processing',
      userId: context.user.id,
    },
  });

  // Run assessment in background so the UI can show "Processing..." immediately.
  // The client polls getAssessmentJobs to see when status changes to complete/failed.
  const service = getAssessmentService();
  service.assess(handbookUrl)
    .then(async (result) => {
      await context.entities.AssessmentJob.update({
        where: { id: job.id },
        data: {
          status: 'complete',
          courseCode: result.courseCode,
          programName: result.programName,
          score: result.score,
          maxScore: result.maxScore,
          riskBand: result.riskBand,
          thresholds: result.thresholds as any,
          dimensions: result.dimensions as any,
          reportJson: result.reportJson as any,
        },
      });
    })
    .catch(async (error: any) => {
      await context.entities.AssessmentJob.update({
        where: { id: job.id },
        data: {
          status: 'failed',
          errorMessage: error.message ?? 'Unknown error',
        },
      });
    });

  // Return job immediately while assessment runs in background
  return job;
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
