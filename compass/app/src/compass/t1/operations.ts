// TechnologyOne Data Connector — feat-011 Phase 3
// Wasp operations: import, query, and bulk-assess T1 data.
//
// File-based import pipeline: detect format → parse → normalize → store.
// Follows the fire-and-forget pattern from assessProgram.

import { HttpError } from "wasp/server";
import type {
  T1ImportJob,
  T1ProgramSnapshot,
  T1EnrolmentTrend,
  Institution,
  AssessmentJob,
} from "wasp/entities";
import type {
  ImportT1Data,
  GetT1ImportJob,
  GetT1Portfolio,
  GetT1EnrolmentTrends,
  AssessT1Programs,
} from "wasp/server/operations";

import { detectT1FileType } from "./detect";
import { parseT1File } from "./parser";
import type { T1FileType, T1RawProgram, T1ParseResult } from "./types";
import { normalizePrograms } from "./normalizer";
import { getAssessmentService } from "../assessmentService";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Compute SHA-256 hex digest for file deduplication. */
async function sha256(buffer: ArrayBuffer): Promise<string> {
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Find or create an Institution by code.
 * Returns the existing institution if found; creates one with a placeholder name otherwise.
 */
async function findOrCreateInstitution(
  code: string,
  institutions: { findUnique: Function; create: Function }
): Promise<Institution> {
  let inst = await institutions.findUnique({ where: { code } });
  if (!inst) {
    inst = await institutions.create({
      data: {
        code,
        name: code.toUpperCase(),
        country: "AU",
      },
    });
  }
  return inst;
}

// ---------------------------------------------------------------------------
// Operation: importT1Data
//
// Accepts a File buffer, detects T1 format, parses, normalizes,
// and stores T1ProgramSnapshot + T1EnrolmentTrend records.
// Returns the import summary.
// ---------------------------------------------------------------------------

export const importT1Data: ImportT1Data = async (
  { fileBuffer, fileName, institutionCode },
  context
) => {
  const {
    entities: {
      Institution: institutions,
      T1ImportJob: importJobs,
      T1ProgramSnapshot: snapshots,
      T1EnrolmentTrend: trends,
    },
  } = context;

  if (!fileBuffer || !fileName || !institutionCode) {
    throw new HttpError(400, "fileBuffer, fileName, and institutionCode are required");
  }

  const buffer = new Uint8Array(fileBuffer);
  const fileSize = buffer.byteLength;

  // Dedup check
  const fileHash = await sha256(fileBuffer);
  const existing = await importJobs.findUnique({ where: { fileHash } });
  if (existing) {
    return {
      importJobId: existing.id,
      programCount: existing.entityCount,
      warnings: [`Duplicate file (${fileName}) — existing import ${existing.id} returned.`],
      status: existing.status,
    };
  }

  // Detect file type
  let fileType: T1FileType;
  try {
    fileType = detectT1FileType(buffer, fileName);
  } catch (err: any) {
    throw new HttpError(400, err.message);
  }

  // Resolve institution
  const institution = await findOrCreateInstitution(institutionCode, institutions);

  // Create import job (queued → processing)
  const job = await importJobs.create({
    data: {
      institutionId: institution.id,
      fileHash,
      fileName,
      fileType,
      fileSize,
      status: "processing",
    },
  });

  // Parse
  let parseResult: T1ParseResult;
  try {
    parseResult = parseT1File(buffer, fileType, fileName);
  } catch (err: any) {
    await importJobs.update({
      where: { id: job.id },
      data: { status: "failed", errorMessage: `Parse error: ${err.message}` },
    });
    throw new HttpError(422, `Failed to parse ${fileName}: ${err.message}`);
  }

  // Normalize
  const normalized = normalizePrograms(parseResult.programs, institutionCode);

  // Store snapshots
  let storedCount = 0;
  const snapshotIds: string[] = [];
  for (const prog of normalized.programs) {
    const snap = await snapshots.create({
      data: {
        importJobId: job.id,
        institutionId: institution.id,
        programCode: prog.programCode,
        programName: prog.programName,
        level: prog.level,
        handbookUrl: prog.handbookUrl,
        enrolmentCount: prog.enrolmentCount,
        applications: prog.applications,
        offers: prog.offers,
        acceptances: prog.acceptances,
        retentionRate: prog.retentionRate,
        progressionRate: prog.progressionRate,
        courseList: prog.courseList,
        sourceFileType: fileType,
        isActive: true,
      },
    });
    snapshotIds.push(snap.id);
    storedCount++;

    // Also create an enrolment trend row if enrolment data is present
    if (prog.enrolmentCount != null) {
      const now = new Date();
      const year = now.getFullYear();
      const semester = now.getMonth() < 6 ? 1 : 2;
      await trends.upsert({
        where: {
          institutionId_programCode_year_semester: {
            institutionId: institution.id,
            programCode: prog.programCode,
            year,
            semester,
          },
        },
        create: {
          importJobId: job.id,
          institutionId: institution.id,
          programCode: prog.programCode,
          year,
          semester,
          applications: prog.applications ?? 0,
          offers: prog.offers ?? 0,
          acceptances: prog.acceptances ?? 0,
          enrolments: prog.enrolmentCount,
          withdrawalCount: 0,
        },
        update: {
          applications: prog.applications ?? 0,
          offers: prog.offers ?? 0,
          acceptances: prog.acceptances ?? 0,
          enrolments: prog.enrolmentCount,
        },
      });
    }
  }

  // Mark import complete
  const allWarnings = [...parseResult.warnings, ...normalized.warnings];
  await importJobs.update({
    where: { id: job.id },
    data: {
      status: "complete",
      rowCount: parseResult.rowCount,
      entityCount: storedCount,
      entityTypes: parseResult.entityTypes,
    },
  });

  return {
    importJobId: job.id,
    programCount: storedCount,
    warnings: allWarnings,
    status: "complete",
  };
};

// ---------------------------------------------------------------------------
// Query: getT1ImportJob
//
// Returns the status and summary of a single import job.
// ---------------------------------------------------------------------------

export const getT1ImportJob: GetT1ImportJob = async (
  { importJobId },
  context
) => {
  const { entities: { T1ImportJob: importJobs } } = context;
  const job = await importJobs.findUnique({
    where: { id: importJobId },
    include: { snapshots: true },
  });
  if (!job) throw new HttpError(404, "Import job not found");
  return job;
};

// ---------------------------------------------------------------------------
// Query: getT1Portfolio
//
// Returns all T1ProgramSnapshot records for an institution,
// joined with latest AssessmentJob if an assessment exists.
// ---------------------------------------------------------------------------

export const getT1Portfolio: GetT1Portfolio = async (
  { institutionCode },
  context
) => {
  const {
    entities: {
      Institution: institutions,
      T1ProgramSnapshot: snapshots,
      AssessmentJob: assessmentJobs,
    },
  } = context;

  const institution = await institutions.findUnique({
    where: { code: institutionCode },
  });
  if (!institution) throw new HttpError(404, `Institution "${institutionCode}" not found`);

  const programSnapshots = await snapshots.findMany({
    where: { institutionId: institution.id, isActive: true },
    orderBy: { programCode: "asc" },
  });

  // Enrich with latest assessment if available
  const enriched = await Promise.all(
    programSnapshots.map(async (snap) => {
      const latestAssessment = await assessmentJobs.findFirst({
        where: { t1ProgramSnapshotId: snap.id },
        orderBy: { createdAt: "desc" },
      });
      return {
        ...snap,
        latestAssessment: latestAssessment ?? null,
      };
    })
  );

  return enriched;
};

// ---------------------------------------------------------------------------
// Query: getT1EnrolmentTrends
//
// Returns time-series enrolment data with optional program filter.
// ---------------------------------------------------------------------------

export const getT1EnrolmentTrends: GetT1EnrolmentTrends = async (
  { institutionCode, programCode },
  context
) => {
  const {
    entities: { Institution: institutions, T1EnrolmentTrend: trends },
  } = context;

  const institution = await institutions.findUnique({
    where: { code: institutionCode },
  });
  if (!institution) throw new HttpError(404, `Institution "${institutionCode}" not found`);

  const where: any = { institutionId: institution.id };
  if (programCode) {
    where.programCode = programCode;
  }

  return trends.findMany({
    where,
    orderBy: [{ year: "asc" }, { semester: "asc" }],
  });
};

// ---------------------------------------------------------------------------
// Action: assessT1Programs
//
// Bulk-assess all programs in an institution's T1 portfolio.
// Creates AssessmentJob records linked via t1ProgramSnapshotId.
// Rate-limited to 10 concurrent assessments.
// ---------------------------------------------------------------------------

export const assessT1Programs: AssessT1Programs = async (
  { institutionCode },
  context
) => {
  const {
    entities: {
      Institution: institutions,
      T1ProgramSnapshot: snapshots,
      AssessmentJob: assessmentJobs,
    },
  } = context;

  const institution = await institutions.findUnique({
    where: { code: institutionCode },
  });
  if (!institution) throw new HttpError(404, `Institution "${institutionCode}" not found`);

  const programSnapshots = await snapshots.findMany({
    where: { institutionId: institution.id, isActive: true },
  });

  if (programSnapshots.length === 0) {
    throw new HttpError(400, `No T1 program data found for institution "${institutionCode}". Upload a T1 export first.`);
  }

  const MAX_CONCURRENT = 10;
  const created: string[] = [];
  const skipped: string[] = [];

  for (let i = 0; i < programSnapshots.length; i += MAX_CONCURRENT) {
    const batch = programSnapshots.slice(i, i + MAX_CONCURRENT);

    const batchResults = await Promise.allSettled(
      batch.map(async (snap) => {
        // Skip if already assessed recently (within 7 days)
        const recent = await assessmentJobs.findFirst({
          where: {
            t1ProgramSnapshotId: snap.id,
            createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          },
        });
        if (recent) {
          skipped.push(snap.programCode);
          return null;
        }

        const service = getAssessmentService();
        const handbookUrl = snap.handbookUrl || `https://handbook.unimelb.edu.au/courses/${snap.programCode.toLowerCase()}`;

        const result = await service.assess(handbookUrl);

        const job = await assessmentJobs.create({
          data: {
            programCode: snap.programCode,
            programName: snap.programName || result.programName,
            handbookUrl,
            status: "complete",
            courseCode: result.courseCode,
            score: result.score,
            maxScore: result.maxScore,
            riskBand: result.riskBand,
            thresholds: result.thresholds as any,
            dimensions: result.dimensions as any,
            reportJson: result.reportJson as any,
            syllabusJson: result.syllabusJson as any,
            t1ProgramSnapshotId: snap.id,
          },
        });
        created.push(job.id);
        return job;
      })
    );

    // Log any failures in this batch
    for (const r of batchResults) {
      if (r.status === "rejected") {
        console.error("T1 bulk assess error:", r.reason);
      }
    }
  }

  return {
    institutionCode,
    totalPrograms: programSnapshots.length,
    assessed: created.length,
    skipped: skipped.length,
    skippedPrograms: skipped,
    assessmentJobIds: created,
  };
};
