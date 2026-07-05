import { describe, it, expect, vi } from "vitest";

// Hermetic wasp/server mock — see authorizationGuards.test.ts for rationale.
vi.mock("wasp/server", () => ({
  HttpError: class HttpError extends Error {
    statusCode: number;
    data?: unknown;
    constructor(statusCode: number, message?: string, data?: unknown) {
      super(message);
      this.statusCode = statusCode;
      this.data = data;
    }
  },
}));

import { getAssessmentJobs, getAssessmentJob } from "../operations";

// Helper to build a minimal mock context
function mockContext(user: { id: string } | null) {
  const jobStore = [
    {
      id: "job-1",
      userId: "user-a",
      handbookUrl: "https://example.com/a",
      status: "complete",
    },
    {
      id: "job-2",
      userId: "user-b",
      handbookUrl: "https://example.com/b",
      status: "processing",
    },
  ];

  return {
    user,
    entities: {
      AssessmentJob: {
        updateMany: vi.fn().mockResolvedValue({ count: 0 }),
        findMany: vi.fn().mockImplementation((args: any) => {
          if (args?.where?.userId) {
            return jobStore.filter((j) => j.userId === args.where.userId);
          }
          return [...jobStore];
        }),
        findUnique: vi.fn().mockImplementation((args: any) => {
          return jobStore.find((j) => j.id === args?.where?.id) ?? null;
        }),
      },
    },
  };
}

describe("getAssessmentJobs — auth guards", () => {
  it("returns 401 when user is not authenticated", async () => {
    const ctx = mockContext(null);
    await expect(
      getAssessmentJobs(undefined as any, ctx as any),
    ).rejects.toMatchObject({ statusCode: 401 });
  });

  it("returns only jobs belonging to the authenticated user", async () => {
    const ctx = mockContext({ id: "user-a" });
    const jobs = await getAssessmentJobs(undefined as any, ctx as any);
    expect(jobs).toHaveLength(1);
    expect(jobs[0].id).toBe("job-1");
    expect(jobs[0].userId).toBe("user-a");
    expect(ctx.entities.AssessmentJob.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: "user-a" } }),
    );
  });

  it("returns empty array when user has no jobs", async () => {
    const ctx = mockContext({ id: "user-none" });
    const jobs = await getAssessmentJobs(undefined as any, ctx as any);
    expect(jobs).toHaveLength(0);
  });
});

describe("getAssessmentJob — auth guards", () => {
  it("returns 401 when user is not authenticated", async () => {
    const ctx = mockContext(null);
    await expect(
      getAssessmentJob({ id: "job-1" }, ctx as any),
    ).rejects.toMatchObject({ statusCode: 401 });
  });

  it("returns the job when it belongs to the authenticated user", async () => {
    const ctx = mockContext({ id: "user-a" });
    const job = await getAssessmentJob({ id: "job-1" }, ctx as any);
    expect(job).not.toBeNull();
    expect(job!.id).toBe("job-1");
  });

  it("returns null when job does not exist (regardless of auth)", async () => {
    const ctx = mockContext({ id: "user-a" });
    const job = await getAssessmentJob({ id: "job-nonexistent" }, ctx as any);
    expect(job).toBeNull();
  });

  it("returns 404 when job belongs to another user (hides existence)", async () => {
    const ctx = mockContext({ id: "user-a" });
    await expect(
      getAssessmentJob({ id: "job-2" }, ctx as any),
    ).rejects.toMatchObject({ statusCode: 404 });
  });
});
