import { describe, it, expect, vi } from "vitest";

// The assessment itself runs fire-and-forget after assessProgram returns; stub
// it so these tests exercise the auth contract, not the scoring pipeline.
vi.mock("../assessmentService", () => ({
  getAssessmentService: () => ({
    assess: vi.fn().mockResolvedValue({
      courseCode: "MC-CS",
      programName: "Master of Computer Science",
      score: 30,
      maxScore: 36,
      riskBand: "RESILIENT",
      thresholds: { q1: "YES", q2: "YES", q3: "YES" },
      dimensions: [],
      reportJson: {},
    }),
  }),
}));

import {
  getAssessmentJobs,
  getAssessmentJob,
  assessProgram,
} from "../operations";

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
    {
      id: "job-anon",
      userId: null,
      handbookUrl: "https://example.com/anon",
      status: "complete",
    },
  ];

  return {
    user,
    entities: {
      AssessmentJob: {
        create: vi
          .fn()
          .mockImplementation((args: any) =>
            Promise.resolve({ id: "job-new", ...args.data }),
          ),
        update: vi.fn().mockResolvedValue({}),
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
  it("returns an empty history for anonymous callers, without querying", async () => {
    // /assess is public, so this must not 401. It must also not leak the
    // ownerless anonymous jobs, which belong to no identifiable visitor.
    const ctx = mockContext(null);
    const jobs = await getAssessmentJobs(undefined as any, ctx as any);
    expect(jobs).toEqual([]);
    expect(ctx.entities.AssessmentJob.findMany).not.toHaveBeenCalled();
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
  it("lets an anonymous caller read an ownerless job by id", async () => {
    // The uuid is the only handle on an anonymous submission — holding it is
    // what grants access, otherwise the public /assess page could never show
    // a signed-out visitor their own result.
    const ctx = mockContext(null);
    const job = await getAssessmentJob({ id: "job-anon" }, ctx as any);
    expect(job).not.toBeNull();
    expect(job!.id).toBe("job-anon");
  });

  it("still hides an owned job from an anonymous caller", async () => {
    const ctx = mockContext(null);
    await expect(
      getAssessmentJob({ id: "job-1" }, ctx as any),
    ).rejects.toMatchObject({ statusCode: 404 });
  });

  it("lets a signed-in user read an ownerless job too", async () => {
    const ctx = mockContext({ id: "user-a" });
    const job = await getAssessmentJob({ id: "job-anon" }, ctx as any);
    expect(job!.id).toBe("job-anon");
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

const VALID_URL = "https://handbook.unimelb.edu.au/2026/courses/mc-cs";

// Runs last: the anonymous throughput cap is module-scoped state, so exhausting
// it here would 429 any anonymous submission tested after this point.
describe("assessProgram — public submission", () => {
  it("accepts an anonymous submission and stores it without an owner", async () => {
    const ctx = mockContext(null);
    const job = await assessProgram({ handbookUrl: VALID_URL }, ctx as any);
    expect(job.id).toBe("job-new");
    expect(ctx.entities.AssessmentJob.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ userId: null }),
      }),
    );
  });

  it("attributes a signed-in submission to that user", async () => {
    const ctx = mockContext({ id: "user-a" });
    await assessProgram({ handbookUrl: VALID_URL }, ctx as any);
    expect(ctx.entities.AssessmentJob.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ userId: "user-a" }),
      }),
    );
  });

  it("still rejects a malformed URL", async () => {
    const ctx = mockContext(null);
    await expect(
      assessProgram({ handbookUrl: "not-a-url" }, ctx as any),
    ).rejects.toMatchObject({ statusCode: 400 });
  });

  it("caps anonymous throughput, but never the signed-in path", async () => {
    // Drain the anonymous budget.
    for (let i = 0; i < 40; i++) {
      await assessProgram({ handbookUrl: VALID_URL }, mockContext(null) as any)
        .then(() => undefined)
        .catch(() => undefined);
    }

    await expect(
      assessProgram({ handbookUrl: VALID_URL }, mockContext(null) as any),
    ).rejects.toMatchObject({ statusCode: 429 });

    // A signed-in user is unaffected by the anonymous cap.
    const signedIn = mockContext({ id: "user-a" });
    await expect(
      assessProgram({ handbookUrl: VALID_URL }, signedIn as any),
    ).resolves.toBeDefined();
  });
});
