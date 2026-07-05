import { HttpError } from "wasp/server";
import type { AssessmentJob } from "wasp/entities";
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
} from "wasp/server/operations";
import * as z from "zod";
import { ensureArgsSchemaOrThrowHttpError } from "../server/validation";
import { logger } from "../server/logger";
import { getAssessmentService } from "./assessmentService";

/**
 * Throw unless the authenticated user owns the given assessment job.
 * Mirrors the ownership guard used by getAssessmentJob / getSyllabusMap.
 * Requires the calling operation to declare AssessmentJob in its Wasp entities.
 */
async function assertOwnsAssessmentJob(
  assessmentJobId: string,
  userId: string,
  assessmentJobs: {
    findUnique(args: {
      where: { id: string };
      select: { userId: true };
    }): Promise<{ userId: string | null } | null>;
  },
): Promise<void> {
  const job = await assessmentJobs.findUnique({
    where: { id: assessmentJobId },
    select: { userId: true },
  });
  if (!job) throw new HttpError(404, "Assessment job not found");
  if (job.userId !== userId) {
    throw new HttpError(403, "Forbidden");
  }
}

/**
 * Submit a handbook URL for assessment.
 * Returns the AssessmentJob record.
 */
const assessProgramInputSchema = z.object({
  handbookUrl: z
    .string()
    .url()
    .refine((u) => /^https?:\/\//.test(u), "Handbook URL must be http(s)"),
});

export const assessProgram: AssessProgram<
  { handbookUrl: string },
  AssessmentJob
> = async (rawArgs, context) => {
  if (!context.user) throw new HttpError(401, "Authentication required");
  const { handbookUrl } = ensureArgsSchemaOrThrowHttpError(
    assessProgramInputSchema,
    rawArgs,
  );

  const job = await context.entities.AssessmentJob.create({
    data: {
      handbookUrl,
      status: "processing",
      userId: context.user.id,
    },
  });

  // Run assessment in background so the UI can show "Processing..." immediately.
  // The client polls getAssessmentJobs to see when status changes to complete/failed.
  const service = getAssessmentService();
  service
    .assess(handbookUrl)
    .then(async (result) => {
      await context.entities.AssessmentJob.update({
        where: { id: job.id },
        data: {
          status: "complete",
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
    .catch(async (error: unknown) => {
      const message = error instanceof Error ? error.message : "Unknown error";
      logger.error("Assessment failed", error, { jobId: job.id, handbookUrl });
      try {
        await context.entities.AssessmentJob.update({
          where: { id: job.id },
          data: {
            status: "failed",
            errorMessage: message,
          },
        });
      } catch (updateError) {
        // Without this the rejection is unhandled and the failure is lost entirely.
        logger.error(
          "Failed to persist failed status for assessment job",
          updateError,
          {
            jobId: job.id,
          },
        );
      }
    });

  // Return job immediately while assessment runs in background
  return job;
};

/**
 * List all assessment jobs (most recent first).
 */
/** Jobs stuck in `processing` longer than this are presumed lost to a server restart. */
const STALE_JOB_CUTOFF_MS = 30 * 60 * 1000;

type AssessmentJobListItem = Pick<
  AssessmentJob,
  | "id"
  | "status"
  | "courseCode"
  | "programName"
  | "handbookUrl"
  | "score"
  | "maxScore"
  | "riskBand"
  | "errorMessage"
  | "createdAt"
  | "userId"
> & { reportJson: { assessmentSlug: string | null } | null };

export const getAssessmentJobs: GetAssessmentJobs<
  void,
  AssessmentJobListItem[]
> = async (_args, context) => {
  if (!context.user) throw new HttpError(401, "Authentication required");

  // The assessment runs as a fire-and-forget promise (see assessProgram); a
  // server restart mid-run would otherwise strand the job in `processing` and
  // the client would poll it forever.
  await context.entities.AssessmentJob.updateMany({
    where: {
      userId: context.user.id,
      status: "processing",
      createdAt: { lt: new Date(Date.now() - STALE_JOB_CUTOFF_MS) },
    },
    data: {
      status: "failed",
      errorMessage: "Timed out (server restarted during assessment)",
    },
  });

  // List fields only — reportJson/syllabusJson/dimensions/thresholds are heavy
  // Json columns the list view never renders, and AssessorPage polls this query
  // every 1.5s while a job is processing. Syllabus data is served per-job by
  // getSyllabusMap. reportJson is trimmed to the one field the UI links with;
  // a dedicated assessmentSlug column would let Prisma skip loading it entirely.
  const jobs = await context.entities.AssessmentJob.findMany({
    where: { userId: context.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      status: true,
      courseCode: true,
      programName: true,
      handbookUrl: true,
      score: true,
      maxScore: true,
      riskBand: true,
      errorMessage: true,
      createdAt: true,
      userId: true,
      reportJson: true,
    },
  });

  return jobs.map((job) => {
    const slug =
      job.reportJson &&
      typeof job.reportJson === "object" &&
      "assessmentSlug" in job.reportJson
        ? (job.reportJson as { assessmentSlug?: unknown }).assessmentSlug
        : null;
    return {
      ...job,
      reportJson: typeof slug === "string" ? { assessmentSlug: slug } : null,
    };
  });
};

/**
 * Get a single assessment job by ID.
 */
const jobIdInputSchema = z.object({ id: z.string().min(1) });

export const getAssessmentJob: GetAssessmentJob<
  { id: string },
  AssessmentJob | null
> = async (rawArgs, context) => {
  if (!context.user) throw new HttpError(401, "Authentication required");
  const { id } = ensureArgsSchemaOrThrowHttpError(jobIdInputSchema, rawArgs);

  const job = await context.entities.AssessmentJob.findUnique({
    where: { id },
  });

  // Return null if job doesn't exist (not an auth issue)
  if (!job) return null;

  // If the job belongs to a different user, return 404 to hide its existence
  if (job.userId !== context.user.id) {
    throw new HttpError(404, "Assessment job not found");
  }

  return job;
};

// Deliberately public (no auth check): backs the public /insights pages.
// If non-public fields are ever added to MarketValidationSignal, add a select.
export const getValidationSignals: GetValidationSignals<void, any[]> = async (
  _args,
  context,
) => {
  return context.entities.MarketValidationSignal.findMany({
    where: { isActive: true },
    orderBy: { credibilityScore: "desc" },
    take: 200,
  });
};

// Deliberately public (no auth check): backs the public /insights pages.
export const getCompetitiveEvents: GetCompetitiveEvents<void, any[]> = async (
  _args,
  context,
) => {
  return context.entities.CompetitiveEvent.findMany({
    where: { isActive: true },
    orderBy: { dateOccurred: "desc" },
    take: 200,
  });
};

// Deliberately public (no auth check): backs the public /insights pages.
export const getMarketWindowStatus: GetMarketWindowStatus<
  void,
  any | null
> = async (_args, context) => {
  return context.entities.MarketWindowSnapshot.findFirst({
    orderBy: { createdAt: "desc" },
  });
};

const syllabusMapInputSchema = z.object({ jobId: z.string().min(1) });

export const getSyllabusMap: GetSyllabusMap<{ jobId: string }, any> = async (
  rawArgs,
  context,
) => {
  if (!context.user) throw new HttpError(401, "Authentication required");
  const { jobId } = ensureArgsSchemaOrThrowHttpError(
    syllabusMapInputSchema,
    rawArgs,
  );

  const job = await context.entities.AssessmentJob.findUnique({
    where: { id: jobId },
    select: { syllabusJson: true, userId: true },
  });

  if (!job) throw new HttpError(404, "Assessment job not found");
  if (job.userId !== context.user.id) {
    throw new HttpError(403, "Forbidden");
  }

  return job.syllabusJson;
};

const updateCourseInterventionInputSchema = z.object({
  assessmentJobId: z.string().min(1),
  courseCode: z.string().min(1).max(20),
  dimensionId: z.number().int().min(1).max(11),
  ownerName: z.string().min(1).max(100),
  ownerEmail: z.string().email().max(200),
  // Matches the CourseInterventionOwner.status comment in schema.prisma
  status: z.enum(["assigned", "in_progress", "completed"]),
  targetDate: z
    .string()
    .refine(
      (d) => !Number.isNaN(Date.parse(d)),
      "targetDate must be a parseable date",
    )
    .optional(),
});

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
> = async (rawArgs, context) => {
  if (!context.user) throw new HttpError(401, "Authentication required");
  const args = ensureArgsSchemaOrThrowHttpError(
    updateCourseInterventionInputSchema,
    rawArgs,
  );
  await assertOwnsAssessmentJob(
    args.assessmentJobId,
    context.user.id,
    context.entities.AssessmentJob,
  );

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

const courseInterventionsInputSchema = z.object({
  assessmentJobId: z.string().min(1),
});

export const getCourseInterventions: GetCourseInterventions<
  { assessmentJobId: string },
  any[]
> = async (rawArgs, context) => {
  if (!context.user) throw new HttpError(401, "Authentication required");
  const { assessmentJobId } = ensureArgsSchemaOrThrowHttpError(
    courseInterventionsInputSchema,
    rawArgs,
  );
  await assertOwnsAssessmentJob(
    assessmentJobId,
    context.user.id,
    context.entities.AssessmentJob,
  );

  return context.entities.CourseInterventionOwner.findMany({
    where: { assessmentJobId },
  });
};

const uploadAlumniDataInputSchema = z.object({
  programCode: z.string().min(1).max(20),
  alumni: z
    .array(
      z.object({
        jobTitle: z.string().min(1).max(200),
        employer: z.string().max(200).optional(),
        graduationYear: z.number().int().min(1950).max(2100),
        industryCluster: z.string().min(1).max(100),
      }),
    )
    .min(1)
    .max(1000),
});

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
> = async (rawArgs, context) => {
  if (!context.user) throw new HttpError(401, "Authentication required");
  const { programCode, alumni } = ensureArgsSchemaOrThrowHttpError(
    uploadAlumniDataInputSchema,
    rawArgs,
  );
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

import { generateApiKey as genKey, hashApiKey } from "./api/auth";
import type {
  GenerateApiKey,
  RevokeApiKey,
  ListApiKeys,
} from "wasp/server/operations";

/**
 * Get or create the "self" institution used as the default for
 * user-generated API keys from the developer portal.
 */
type SelfInstitution = { id: string };

async function getOrCreateSelfInstitution(context: {
  entities: {
    Institution: {
      findUnique(args: {
        where: { code: string };
      }): Promise<SelfInstitution | null>;
      create(args: {
        data: { name: string; code: string; country: string };
      }): Promise<SelfInstitution>;
    };
  };
}): Promise<SelfInstitution> {
  const SELF_CODE = "dfva-self";
  let inst = await context.entities.Institution.findUnique({
    where: { code: SELF_CODE },
  });
  if (!inst) {
    inst = await context.entities.Institution.create({
      data: {
        name: "DFVA (Self)",
        code: SELF_CODE,
        country: "AU",
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

const generateApiKeyInputSchema = z.object({
  name: z.string().trim().min(1, "Key name is required").max(100),
});

/**
 * Generate a new API key for the logged-in user.
 * Returns the raw key ONCE — it is never stored.
 */
export const generateApiKey: GenerateApiKey<
  { name: string },
  { apiKey: ApiKeyResult; rawKey: string }
> = async (rawArgs, context) => {
  if (!context.user) throw new HttpError(401, "Authentication required");
  const { name } = ensureArgsSchemaOrThrowHttpError(
    generateApiKeyInputSchema,
    rawArgs,
  );

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
> = async (rawArgs, context) => {
  if (!context.user) throw new HttpError(401, "Authentication required");
  const { keyId } = ensureArgsSchemaOrThrowHttpError(
    z.object({ keyId: z.string().min(1) }),
    rawArgs,
  );

  const key = await context.entities.ApiKey.findUnique({
    where: { id: keyId },
  });

  if (!key) throw new HttpError(404, "API key not found");
  if (key.userId !== context.user.id) {
    throw new HttpError(403, "You can only revoke your own API keys");
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
export const listApiKeys: ListApiKeys<void, ApiKeyResult[]> = async (
  _args,
  context,
) => {
  if (!context.user) throw new HttpError(401, "Authentication required");

  const keys = await context.entities.ApiKey.findMany({
    where: {
      userId: context.user.id,
    },
    orderBy: { createdAt: "desc" },
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
