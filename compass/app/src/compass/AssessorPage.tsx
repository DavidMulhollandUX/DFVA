import { useState } from "react";
import { Link } from "react-router";
import {
  Link2,
  Loader2,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "../client/components/ui/button";
import { Input } from "../client/components/ui/input";
import { Card, CardContent } from "../client/components/ui/card";
import { useAction, useQuery } from "wasp/client/operations";
import { assessProgram, getAssessmentJobs } from "wasp/client/operations";

export default function AssessorPage() {
  const [inputUrl, setInputUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    data: jobs = [],
    isLoading,
    refetch,
  } = useQuery(getAssessmentJobs, undefined, {
    // Poll while any job is still running so status badges flip to
    // Complete/Failed without a manual refresh (react-query v4 signature).
    refetchInterval: (data: any) =>
      Array.isArray(data) &&
      data.some((j: any) => j.status !== "complete" && j.status !== "failed")
        ? 1500
        : false,
  });
  const submitAction = useAction(assessProgram);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputUrl.trim();
    if (!trimmed) return;

    setSubmitting(true);
    try {
      await submitAction({ handbookUrl: trimmed });
      setInputUrl("");
      refetch();
    } catch (err: any) {
      refetch();
    } finally {
      setSubmitting(false);
    }
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return (
          <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
            Complete
          </span>
        );
      case "failed":
        return (
          <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
            Failed
          </span>
        );
      case "processing":
      case "queued":
      default:
        return (
          <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            Processing
          </span>
        );
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          Assess a Program
        </h1>
        <p className="text-muted-foreground mt-2">
          Paste a university handbook URL to queue a DFVA viability assessment.
          The analysis will score the program across 10 dimensions and assign a
          risk band from RESILIENT to CRITICAL.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-12 flex gap-3">
        <Input
          type="url"
          placeholder="https://handbook.unimelb.edu.au/2025/courses/..."
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="flex-1"
          required
          disabled={submitting}
        />
        <Button type="submit" className="shrink-0" disabled={submitting}>
          {submitting ? "Analysing…" : "Analyse"}
        </Button>
      </form>

      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center py-24 text-center">
          <Link2 className="mb-4 h-10 w-10 opacity-20" />
          <p className="text-sm">
            No assessments queued yet.
            <br />
            Paste a handbook URL above to begin.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
            Assessment History
          </p>
          {jobs.map((job: any) => (
            <Card key={job.id}>
              <CardContent className="flex items-center gap-4 py-4">
                {job.status === "complete" ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                ) : job.status === "failed" ? (
                  <XCircle className="h-5 w-5 shrink-0 text-red-500" />
                ) : (
                  <Loader2 className="text-muted-foreground h-5 w-5 shrink-0 animate-spin" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-sm font-medium">
                    {job.programName ?? job.handbookUrl}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    {new Date(job.createdAt).toLocaleString()}
                    {job.status === "failed" && job.errorMessage && (
                      <> · {job.errorMessage}</>
                    )}
                  </p>
                </div>
                {job.status === "complete" &&
                  job.reportJson?.assessmentSlug && (
                    <Link
                      to={`/reports/${job.reportJson.assessmentSlug}`}
                      className="text-primary inline-flex shrink-0 items-center gap-1 text-xs font-medium hover:underline"
                    >
                      View Report
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                {statusBadge(job.status)}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="border-border bg-muted/30 mt-16 rounded-xl border p-6">
        <h2 className="text-foreground mb-2 text-sm font-semibold">
          Example URLs to try
        </h2>
        <ul className="text-muted-foreground space-y-2 text-sm">
          {[
            "https://handbook.unimelb.edu.au/2025/courses/b-des",
            "https://handbook.unimelb.edu.au/2025/courses/b-com",
            "https://handbook.unimelb.edu.au/2025/courses/mc-cs",
          ].map((url) => (
            <li key={url}>
              <button
                type="button"
                onClick={() => setInputUrl(url)}
                className="hover:text-primary text-left font-mono text-xs transition-colors"
              >
                {url}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
