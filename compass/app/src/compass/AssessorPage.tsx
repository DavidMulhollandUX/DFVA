import { useState } from "react";
import { Link2, Loader2 } from "lucide-react";
import { Button } from "../client/components/ui/button";
import { Input } from "../client/components/ui/input";
import { Card, CardContent } from "../client/components/ui/card";

interface AssessmentJob {
  id: string;
  url: string;
  addedAt: Date;
}

export default function AssessorPage() {
  const [inputUrl, setInputUrl] = useState("");
  const [jobs, setJobs] = useState<AssessmentJob[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputUrl.trim();
    if (!trimmed) return;
    setJobs((prev) => [
      ...prev,
      { id: crypto.randomUUID(), url: trimmed, addedAt: new Date() },
    ]);
    setInputUrl("");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Assess a Program
        </h1>
        <p className="mt-2 text-muted-foreground">
          Paste a university handbook URL to queue a DFVA viability assessment.
          The analysis will score the program across 10 dimensions and assign a
          risk band from RESILIENT to CRITICAL.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-12">
        <Input
          type="url"
          placeholder="https://handbook.unimelb.edu.au/2025/courses/..."
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="flex-1"
          required
        />
        <Button type="submit" className="shrink-0">
          Analyse
        </Button>
      </form>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
          <Link2 className="h-10 w-10 opacity-20 mb-4" />
          <p className="text-sm">
            No assessments queued yet.
            <br />
            Paste a handbook URL above to begin.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Assessment Queue
          </p>
          {[...jobs].reverse().map((job) => (
            <Card key={job.id}>
              <CardContent className="flex items-center gap-4 py-4">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-foreground">
                    {job.url}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Queued at {job.addedAt.toLocaleTimeString()} · Analysing…
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                  Processing
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-16 rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="text-sm font-semibold text-foreground mb-2">
          Example URLs to try
        </h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "https://handbook.unimelb.edu.au/2025/courses/b-des",
            "https://handbook.unimelb.edu.au/2025/courses/b-com",
            "https://handbook.unimelb.edu.au/2025/courses/mc-cs",
          ].map((url) => (
            <li key={url}>
              <button
                type="button"
                onClick={() => setInputUrl(url)}
                className="font-mono text-xs hover:text-primary transition-colors text-left"
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
