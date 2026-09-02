import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  Link2,
  Loader2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  AlertTriangle,
  Info,
  Search,
} from "lucide-react";
import { Button } from "../client/components/ui/button";
import { Input } from "../client/components/ui/input";
import { Label } from "../client/components/ui/label";
import { Card, CardContent } from "../client/components/ui/card";
import { PageShell } from "../client/components/PageShell";
import { useAction, useQuery } from "wasp/client/operations";
import {
  assessProgram,
  getAssessmentJobs,
  getAssessmentJob,
} from "wasp/client/operations";
import { useAuth } from "wasp/client/auth";
import type { AssessmentJob } from "wasp/entities";
import {
  checkHandbookUrl,
  ASSESSABLE_PROGRAMS,
  type HandbookUrlCheck,
} from "./handbookUrlCheck";
import { v4PortfolioRows } from "./v4/portfolioStats";
import { formatDate } from "./formatDate";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../client/components/ui/alert";

const EXAMPLE_URL =
  ASSESSABLE_PROGRAMS[0]?.handbookUrl ??
  "https://handbook.unimelb.edu.au/2026/courses/mc-cs";

// Programs scored on the current v4 instrument, derived from the same rows
// that drive /insights so the two pages cannot disagree.
const scoredCount = v4PortfolioRows().filter((r) => r.assessed).length;

export default function AssessorPage() {
  const [inputUrl, setInputUrl] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Anonymous submissions have no owner, so the server can't list them back
  // (it couldn't tell one visitor from another). We hold their ids here for
  // the life of the page instead; each row polls for its own result.
  const [anonJobIds, setAnonJobIds] = useState<string[]>([]);

  const { data: user, isLoading: isUserLoading } = useAuth();
  const isSignedIn = Boolean(user);

  const check = useMemo<HandbookUrlCheck>(
    () => checkHandbookUrl(inputUrl),
    [inputUrl],
  );

  const matchingPrograms = useMemo(() => {
    const q = programFilter.trim().toLowerCase();
    if (!q) return ASSESSABLE_PROGRAMS;
    return ASSESSABLE_PROGRAMS.filter(
      (p) =>
        p.program.toLowerCase().includes(q) ||
        p.handbookUrl.toLowerCase().includes(q),
    );
  }, [programFilter]);

  const {
    data: jobs = [],
    isLoading,
    error: jobsError,
    refetch,
  } = useQuery(getAssessmentJobs, undefined, {
    // Signed-out callers get [] back, so skip the request entirely.
    enabled: isSignedIn,
    // Poll while any job is still running so status badges flip to
    // Complete/Failed without a manual refresh (react-query v4 signature).
    refetchInterval: (data: { status: string }[] | undefined) =>
      Array.isArray(data) && data.some((j) => !isSettled(j.status))
        ? 1500
        : false,
  });
  const submitAction = useAction(assessProgram);

  const canSubmit =
    !submitting && (check.kind === "known" || check.kind === "unknown");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    // Submit the canonical URL for known programs — the assessment services
    // match by exact string, so a trailing slash would drop us to a placeholder.
    const url = check.kind === "known" ? check.canonicalUrl : inputUrl.trim();

    setSubmitting(true);
    setSubmitError(null);
    try {
      const job = await submitAction({ handbookUrl: url });
      setInputUrl("");
      // Signed out, this id is the only handle on the result — keep it so the
      // row below can poll for it.
      if (!isSignedIn && job?.id) {
        setAnonJobIds((ids) => [job.id, ...ids]);
      }
    } catch (err) {
      // A rejected submission never becomes a job, so nothing downstream would
      // show it. Surface it on the form instead.
      setSubmitError(
        err instanceof Error && err.message
          ? err.message
          : "Could not queue that assessment. Try again.",
      );
    } finally {
      setSubmitting(false);
      if (isSignedIn) refetch();
    }
  }

  const historyIsLoading = isUserLoading || (isSignedIn && isLoading);
  const hasHistory = isSignedIn ? jobs.length > 0 : anonJobIds.length > 0;

  return (
    <PageShell width="narrow" className="py-16">
      <div className="mb-8">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          Assess a Program
        </h1>
        <p className="text-muted-foreground mt-2">
          One input: a link to a course page in a university handbook. The
          assessment scores the program on eight curriculum items across two
          sub-scales (adaptiveness and workplace practice), checks two
          preconditions, and places the program against the portfolio median.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <Label htmlFor="handbook-url" className="text-foreground">
          Handbook course page link
        </Label>
        <p className="text-muted-foreground mt-1 mb-2 text-sm">
          Paste the page for the <strong>whole course</strong> — the one whose
          address contains <code className="font-mono">/courses/</code> and the
          course code. A single subject page, a faculty page, or a PDF won't
          work.
        </p>
        <div className="flex gap-3">
          <Input
            id="handbook-url"
            type="text"
            inputMode="url"
            placeholder={EXAMPLE_URL}
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-1 font-mono text-sm"
            aria-describedby="handbook-url-feedback"
            autoComplete="off"
            disabled={submitting}
          />
          <Button type="submit" className="shrink-0" disabled={!canSubmit}>
            {submitting ? "Analysing…" : "Analyse"}
          </Button>
        </div>

        <div id="handbook-url-feedback" aria-live="polite" className="mt-2">
          {submitError ? (
            <FeedbackLine tone="error" icon={XCircle}>
              {submitError}
            </FeedbackLine>
          ) : (
            <UrlFeedback check={check} />
          )}
        </div>
      </form>

      <div className="text-muted-foreground mb-12 space-y-2 text-xs">
        <p className="flex items-start gap-2">
          <Info className="mt-px h-3.5 w-3.5 shrink-0" />
          <span>
            Nothing to upload here — the assessor reads the handbook page
            itself. Supporting documents belong on the{" "}
            <Link to="/file-upload" className="hover:text-primary underline">
              file upload
            </Link>{" "}
            page and are not part of the score.
          </span>
        </p>
        {!isUserLoading && !isSignedIn && (
          <p className="flex items-start gap-2">
            <Info className="mt-px h-3.5 w-3.5 shrink-0" />
            <span>
              No account needed. Results stay on this page until you leave it —{" "}
              <Link to="/login" className="hover:text-primary underline">
                sign in
              </Link>{" "}
              to keep a history you can come back to.
            </span>
          </p>
        )}
      </div>

      {historyIsLoading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
        </div>
      ) : jobsError ? (
        <Alert variant="destructive" data-testid="assess-history-error">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Could not load your assessments</AlertTitle>
          <AlertDescription>
            {(jobsError as Error).message ??
              "The request failed. Reload the page to try again."}
          </AlertDescription>
        </Alert>
      ) : !hasHistory ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center py-24 text-center">
          <Link2 className="mb-4 h-10 w-10 opacity-20" />
          <p className="text-sm">
            No assessments queued yet.
            <br />
            Paste a course page link above, or pick a program below.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
            {isSignedIn ? "Assessment History" : "This Session"}
          </p>
          {isSignedIn
            ? jobs.map((job) => <JobRow key={job.id} job={job} />)
            : anonJobIds.map((id) => <AnonymousJobRow key={id} jobId={id} />)}
        </div>
      )}

      <div className="border-border bg-muted/30 mt-16 rounded-xl border p-6">
        <h2 className="text-foreground text-sm font-semibold">
          Programs with a full assessment ({ASSESSABLE_PROGRAMS.length} of{" "}
          {scoredCount} scored)
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Pick one to fill the field above. {scoredCount} programs have been
          scored on the current v4 instrument; the {ASSESSABLE_PROGRAMS.length}{" "}
          listed here have handbook URLs and return a pre-written report. Any
          other course page still works — it just comes back as a provisional
          placeholder.
        </p>
        <div className="relative mt-4">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            type="search"
            placeholder="Filter by program name or code…"
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
            className="pl-9"
            aria-label="Filter assessable programs"
          />
        </div>
        <ul className="mt-3 max-h-72 space-y-1 overflow-y-auto">
          {matchingPrograms.length === 0 ? (
            <li className="text-muted-foreground py-4 text-center text-sm">
              No program matches “{programFilter.trim()}”.
            </li>
          ) : (
            matchingPrograms.map((p) => (
              <li key={p.handbookUrl}>
                <button
                  type="button"
                  onClick={() => setInputUrl(p.handbookUrl)}
                  className="hover:bg-muted w-full rounded-md px-3 py-2 text-left transition-colors"
                >
                  <span className="text-foreground block text-sm font-medium">
                    {p.program}
                  </span>
                  <span className="text-muted-foreground block font-mono text-xs">
                    {p.handbookUrl}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </PageShell>
  );
}

function statusBadge(status: string) {
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
}

function isSettled(status: string): boolean {
  return status === "complete" || status === "failed";
}

/** The fields a history row reads. The list query omits reportJson, so it is
 *  optional here and the slug falls back to the column that was denormalised
 *  for exactly this purpose. */
type JobRowJob = Pick<
  AssessmentJob,
  "id" | "status" | "createdAt" | "handbookUrl" | "programName" | "errorMessage"
> & {
  /** Denormalised on the entity; the list query reads it out of reportJson. */
  assessmentSlug?: string | null;
  reportJson?: unknown;
};

function reportSlug(job: JobRowJob): string | null {
  const j = job.reportJson;
  const fromJson =
    j && typeof j === "object" && !Array.isArray(j)
      ? (j as Record<string, unknown>)["assessmentSlug"]
      : undefined;
  return typeof fromJson === "string" ? fromJson : job.assessmentSlug ?? null;
}

/** One row of history. Rendered from a list query or a single-job poll alike. */
function JobRow({ job }: { job: JobRowJob }) {
  const slug = reportSlug(job);
  return (
    <Card>
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
            {formatDate(job.createdAt, "medium")}
            {job.status === "failed" && job.errorMessage && (
              <> · {job.errorMessage}</>
            )}
          </p>
        </div>
        {job.status === "complete" && slug && (
          <Link
            to={`/reports/${slug}`}
            className="text-primary inline-flex shrink-0 items-center gap-1 text-xs font-medium hover:underline"
          >
            View Report
            <ExternalLink className="h-3 w-3" />
          </Link>
        )}
        {statusBadge(job.status)}
      </CardContent>
    </Card>
  );
}

/**
 * An anonymous job isn't listed by getAssessmentJobs (nothing identifies the
 * visitor who owns it), so each row fetches itself by the id we kept at submit
 * time and polls until the assessment settles.
 */
function AnonymousJobRow({ jobId }: { jobId: string }) {
  const { data: job, error } = useQuery(
    getAssessmentJob,
    { id: jobId },
    {
      refetchInterval: (data: { status: string } | null | undefined) =>
        data && !isSettled(data.status) ? 1500 : false,
    },
  );

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center gap-4 py-4">
          <XCircle className="text-destructive h-5 w-5 shrink-0" />
          <p className="text-muted-foreground flex-1 text-sm">
            Could not load this assessment.{" "}
            {(error as Error).message ?? "Reload the page to try again."}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!job) {
    return (
      <Card>
        <CardContent className="flex items-center gap-4 py-4">
          <Loader2 className="text-muted-foreground h-5 w-5 shrink-0 animate-spin" />
          <p className="text-muted-foreground flex-1 text-sm">Queued…</p>
        </CardContent>
      </Card>
    );
  }

  return <JobRow job={job} />;
}

function UrlFeedback({ check }: { check: HandbookUrlCheck }) {
  switch (check.kind) {
    case "empty":
      return null;
    case "invalid":
      return (
        <FeedbackLine tone="error" icon={XCircle}>
          That isn't a web address. Copy the full link from your browser's
          address bar, starting with <code className="font-mono">https://</code>
          .
        </FeedbackLine>
      );
    case "not-course":
      return (
        <FeedbackLine tone="error" icon={XCircle}>
          This isn't a course page — its address has no{" "}
          <code className="font-mono">/courses/&lt;code&gt;</code> segment. From
          a subject page, go up to the course that contains it.
        </FeedbackLine>
      );
    case "unknown":
      return (
        <FeedbackLine tone="warning" icon={AlertTriangle}>
          <strong className="font-mono">{check.courseCode}</strong> has no
          published assessment yet. Submitting queues a provisional placeholder,
          not a scored report.
        </FeedbackLine>
      );
    case "known":
      return (
        <FeedbackLine tone="success" icon={CheckCircle2}>
          Recognised: <strong>{check.program.program}</strong> — full assessment
          available.
        </FeedbackLine>
      );
  }
}

const TONE_CLASSES = {
  success: "text-emerald-700 dark:text-emerald-400",
  warning: "text-amber-700 dark:text-amber-400",
  error: "text-red-700 dark:text-red-400",
} as const;

function FeedbackLine({
  tone,
  icon: Icon,
  children,
}: {
  tone: keyof typeof TONE_CLASSES;
  icon: typeof CheckCircle2;
  children: React.ReactNode;
}) {
  return (
    <p className={`flex items-start gap-2 text-sm ${TONE_CLASSES[tone]}`}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}
