import { HttpError } from 'wasp/server';
import type { 
  AssessProgram,
  GetAssessmentJobs, 
  GetAssessmentJob,
  GetValidationSignals,
  GetCompetitiveEvents,
  GetMarketWindowStatus,
  GetSyllabusMap,
  UpdateCourseIntervention,
  GetCourseInterventions,
  UploadAlumniData,
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
          syllabusJson: result.syllabusJson as any,
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
  if (!context.user) throw new HttpError(401, 'Authentication required');

  return context.entities.AssessmentJob.findMany({
    where: { userId: context.user.id },
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
  if (!context.user) throw new HttpError(401, 'Authentication required');

  const job = await context.entities.AssessmentJob.findUnique({
    where: { id },
  });

  // Return null if job doesn't exist (not an auth issue)
  if (!job) return null;

  // If the job belongs to a different user, return 404 to hide its existence
  if (job.userId !== context.user.id) {
    throw new HttpError(404, 'Assessment job not found');
  }

  return job;
};

export const getValidationSignals: GetValidationSignals<void, any[]> = async (
  _args,
  context
) => {
  return context.entities.MarketValidationSignal.findMany({
    where: { isActive: true },
    orderBy: { credibilityScore: 'desc' },
  });
};

export const getCompetitiveEvents: GetCompetitiveEvents<void, any[]> = async (
  _args,
  context
) => {
  return context.entities.CompetitiveEvent.findMany({
    where: { isActive: true },
    orderBy: { dateOccurred: 'desc' },
  });
};

export const getMarketWindowStatus: GetMarketWindowStatus<void, any | null> = async (
  _args,
  context
) => {
  return context.entities.MarketWindowSnapshot.findFirst({
    orderBy: { createdAt: 'desc' },
  });
};

export const getSyllabusMap: GetSyllabusMap<{ jobId: string }, any> = async (
  { jobId },
  context
) => {
  if (!context.user) throw new HttpError(401, 'Authentication required');

  const job = await context.entities.AssessmentJob.findUnique({
    where: { id: jobId },
    select: { syllabusJson: true, userId: true },
  });

  if (!job) throw new HttpError(404, 'Assessment job not found');
  if (job.userId !== context.user.id) {
    throw new HttpError(403, 'Forbidden');
  }

  return job.syllabusJson;
};

export const updateCourseIntervention: UpdateCourseIntervention<
  {
    assessmentJobId: string;
    courseCode: string;
    dimensionId: number;
    ownerName: string;
    ownerEmail: string;
    status: string;
    targetDate?: string;
  },
  any
> = async (args, context) => {
  if (!context.user) throw new HttpError(401, 'Authentication required');

  return context.entities.CourseInterventionOwner.upsert({
    where: {
      assessmentJobId_courseCode_dimensionId: {
        assessmentJobId: args.assessmentJobId,
        courseCode: args.courseCode,
        dimensionId: args.dimensionId,
      },
    },
    update: {
      ownerName: args.ownerName,
      ownerEmail: args.ownerEmail,
      status: args.status,
      targetDate: args.targetDate ? new Date(args.targetDate) : undefined,
    },
    create: {
      assessmentJobId: args.assessmentJobId,
      courseCode: args.courseCode,
      dimensionId: args.dimensionId,
      ownerName: args.ownerName,
      ownerEmail: args.ownerEmail,
      status: args.status,
      targetDate: args.targetDate ? new Date(args.targetDate) : undefined,
    },
  });
};

export const getCourseInterventions: GetCourseInterventions<
  { assessmentJobId: string },
  any[]
> = async ({ assessmentJobId }, context) => {
  if (!context.user) throw new HttpError(401, 'Authentication required');

  return context.entities.CourseInterventionOwner.findMany({
    where: { assessmentJobId },
  });
};

export const uploadAlumniData: UploadAlumniData<
  {
    programCode: string;
    alumni: Array<{
      jobTitle: string;
      employer?: string;
      graduationYear: number;
      industryCluster: string;
    }>;
  },
  any
> = async ({ programCode, alumni }, context) => {
  if (!context.user) throw new HttpError(401, 'Authentication required');
  const userId = context.user.id;

  const records = alumni.map((a) => ({
    userId,
    programCode,
    graduationYear: a.graduationYear,
    jobTitle: a.jobTitle,
    employer: a.employer || null,
    industryCluster: a.industryCluster,
  }));

  return context.entities.AlumniDestination.createMany({
    data: records,
  });
};

// --- API Key Management (feat-009) ---

import { generateApiKey as genKey, hashApiKey } from './api/auth';
import type {
  GenerateApiKey,
  RevokeApiKey,
  ListApiKeys,
} from 'wasp/server/operations';

/**
 * Get or create the "self" institution used as the default for
 * user-generated API keys from the developer portal.
 */
async function getOrCreateSelfInstitution(context: any) {
  const SELF_CODE = 'dfva-self';
  let inst = await context.entities.Institution.findUnique({
    where: { code: SELF_CODE },
  });
  if (!inst) {
    inst = await context.entities.Institution.create({
      data: {
        name: 'DFVA (Self)',
        code: SELF_CODE,
        country: 'AU',
      },
    });
  }
  return inst;
}

type ApiKeyResult = {
  id: string;
  name: string;
  keyPrefix: string;
  isActive: boolean;
  createdAt: Date;
};

/**
 * Generate a new API key for the logged-in user.
 * Returns the raw key ONCE — it is never stored.
 */
export const generateApiKey: GenerateApiKey<
  { name: string },
  { apiKey: ApiKeyResult; rawKey: string }
> = async ({ name }, context) => {
  if (!context.user) throw new HttpError(401, 'Authentication required');
  if (!name || name.trim().length === 0) {
    throw new HttpError(400, 'Key name is required');
  }

  const institution = await getOrCreateSelfInstitution(context);
  const { rawKey, keyHash, keyPrefix } = genKey();

  const apiKey = await context.entities.ApiKey.create({
    data: {
      name: name.trim(),
      keyHash,
      keyPrefix,
      isActive: true,
      institutionId: institution.id,
      userId: context.user.id,
    },
  });

  return {
    apiKey: {
      id: apiKey.id,
      name: apiKey.name,
      keyPrefix: apiKey.keyPrefix,
      isActive: apiKey.isActive,
      createdAt: apiKey.createdAt,
    },
    rawKey,
  };
};

/**
 * Revoke an API key owned by the logged-in user.
 */
export const revokeApiKey: RevokeApiKey<
  { keyId: string },
  { success: boolean }
> = async ({ keyId }, context) => {
  if (!context.user) throw new HttpError(401, 'Authentication required');

  const key = await context.entities.ApiKey.findUnique({
    where: { id: keyId },
  });

  if (!key) throw new HttpError(404, 'API key not found');
  if (key.userId !== context.user.id) {
    throw new HttpError(403, 'You can only revoke your own API keys');
  }

  await context.entities.ApiKey.update({
    where: { id: keyId },
    data: { isActive: false },
  });

  return { success: true };
};

/**
 * List API keys for the logged-in user.
 * Only returns prefixes — never the raw key or hash.
 */
export const listApiKeys: ListApiKeys<
  void,
  ApiKeyResult[]
> = async (_args, context) => {
  if (!context.user) throw new HttpError(401, 'Authentication required');

  const keys = await context.entities.ApiKey.findMany({
    where: {
      userId: context.user.id,
    },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      keyPrefix: true,
      isActive: true,
      createdAt: true,
    },
  });

  return keys;
};


