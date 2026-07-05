import { describe, it, expect, vi } from "vitest";

import {
  getCourseInterventions,
  updateCourseIntervention,
} from "../operations";

// B1 regression tests: cross-user access must be rejected on operations that
// take an id/key argument. Each guard mirrors the ownership check already used
// by getAssessmentJob / getSyllabusMap.

// --- getCourseInterventions / updateCourseIntervention -----------------------

function mockCompassContext(user: { id: string } | null) {
  const jobStore = [
    { id: "job-a", userId: "user-a" },
    { id: "job-b", userId: "user-b" },
  ];
  return {
    user,
    entities: {
      AssessmentJob: {
        findUnique: vi
          .fn()
          .mockImplementation(
            (args: any) =>
              jobStore.find((j) => j.id === args?.where?.id) ?? null,
          ),
      },
      CourseInterventionOwner: {
        findMany: vi.fn().mockResolvedValue([{ id: "ci-1" }]),
        upsert: vi.fn().mockResolvedValue({ id: "ci-1" }),
      },
    },
  };
}

const interventionArgs = {
  assessmentJobId: "job-a",
  courseCode: "COMP10001",
  dimensionId: 1,
  ownerName: "Owner",
  ownerEmail: "owner@example.com",
  status: "assigned",
};

describe("getCourseInterventions — ownership guard", () => {
  it("rejects unauthenticated callers with 401", async () => {
    const ctx = mockCompassContext(null);
    await expect(
      getCourseInterventions({ assessmentJobId: "job-a" }, ctx as any),
    ).rejects.toMatchObject({ statusCode: 401 });
  });

  it("rejects reading interventions on another user's job with 403", async () => {
    const ctx = mockCompassContext({ id: "user-b" }); // job-a belongs to user-a
    await expect(
      getCourseInterventions({ assessmentJobId: "job-a" }, ctx as any),
    ).rejects.toMatchObject({ statusCode: 403 });
    expect(
      ctx.entities.CourseInterventionOwner.findMany,
    ).not.toHaveBeenCalled();
  });

  it("returns 404 when the job does not exist", async () => {
    const ctx = mockCompassContext({ id: "user-a" });
    await expect(
      getCourseInterventions({ assessmentJobId: "job-missing" }, ctx as any),
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  it("returns interventions when the caller owns the job", async () => {
    const ctx = mockCompassContext({ id: "user-a" });
    const result = await getCourseInterventions(
      { assessmentJobId: "job-a" },
      ctx as any,
    );
    expect(result).toEqual([{ id: "ci-1" }]);
  });
});

describe("updateCourseIntervention — ownership guard", () => {
  it("rejects unauthenticated callers with 401", async () => {
    const ctx = mockCompassContext(null);
    await expect(
      updateCourseIntervention(interventionArgs as any, ctx as any),
    ).rejects.toMatchObject({ statusCode: 401 });
  });

  it("rejects writing to another user's job with 403", async () => {
    const ctx = mockCompassContext({ id: "user-b" }); // job-a belongs to user-a
    await expect(
      updateCourseIntervention(interventionArgs as any, ctx as any),
    ).rejects.toMatchObject({ statusCode: 403 });
    expect(ctx.entities.CourseInterventionOwner.upsert).not.toHaveBeenCalled();
  });

  it("upserts when the caller owns the job", async () => {
    const ctx = mockCompassContext({ id: "user-a" });
    await updateCourseIntervention(interventionArgs as any, ctx as any);
    expect(ctx.entities.CourseInterventionOwner.upsert).toHaveBeenCalledOnce();
  });
});

// --- getDownloadFileSignedURL -----------------------------------------------

vi.mock("../../file-upload/s3Utils", () => ({
  getDownloadFileSignedURLFromS3: vi
    .fn()
    .mockResolvedValue("https://signed.example/url"),
  getUploadFileSignedURLFromS3: vi.fn(),
  deleteFileFromS3: vi.fn(),
  checkFileExistsInS3: vi.fn(),
}));

// Imported after the mock is declared (vi.mock is hoisted, so this is safe).
import { getDownloadFileSignedURL } from "../../file-upload/operations";
import { getDownloadFileSignedURLFromS3 } from "../../file-upload/s3Utils";

function mockFileContext(user: { id: string } | null) {
  const fileStore = [
    { id: "file-1", s3Key: "user-a/report.pdf", userId: "user-a" },
  ];
  return {
    user,
    entities: {
      File: {
        findFirst: vi.fn().mockImplementation((args: any) => {
          const { s3Key, user: userWhere } = args?.where ?? {};
          return (
            fileStore.find(
              (f) => f.s3Key === s3Key && f.userId === userWhere?.id,
            ) ?? null
          );
        }),
      },
    },
  };
}

describe("getDownloadFileSignedURL — ownership guard", () => {
  it("rejects unauthenticated callers with 401", async () => {
    const ctx = mockFileContext(null);
    await expect(
      getDownloadFileSignedURL({ s3Key: "user-a/report.pdf" }, ctx as any),
    ).rejects.toMatchObject({ statusCode: 401 });
    expect(getDownloadFileSignedURLFromS3).not.toHaveBeenCalled();
  });

  it("rejects downloading another user's file with 404", async () => {
    const ctx = mockFileContext({ id: "user-b" }); // file belongs to user-a
    await expect(
      getDownloadFileSignedURL({ s3Key: "user-a/report.pdf" }, ctx as any),
    ).rejects.toMatchObject({ statusCode: 404 });
    expect(getDownloadFileSignedURLFromS3).not.toHaveBeenCalled();
  });

  it("signs a URL when the caller owns the file", async () => {
    const ctx = mockFileContext({ id: "user-a" });
    const url = await getDownloadFileSignedURL(
      { s3Key: "user-a/report.pdf" },
      ctx as any,
    );
    expect(url).toBe("https://signed.example/url");
    expect(getDownloadFileSignedURLFromS3).toHaveBeenCalledWith({
      s3Key: "user-a/report.pdf",
    });
  });
});
