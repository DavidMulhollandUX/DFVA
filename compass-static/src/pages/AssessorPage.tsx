import { useState } from 'react'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'

interface AssessmentJob {
  id: string
  url: string
  status: 'loading' | 'done' | 'error'
}

const EXAMPLES = [
  'https://handbook.unimelb.edu.au/2025/courses/b-des',
  'https://handbook.unimelb.edu.au/2025/courses/b-com',
  'https://handbook.unimelb.edu.au/2025/courses/mc-journprof',
]

export default function AssessorPage() {
  const [url, setUrl] = useState('')
  const [jobs, setJobs] = useState<AssessmentJob[]>([])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) return
    setJobs((prev) => [
      { id: crypto.randomUUID(), url: trimmed, status: 'loading' },
      ...prev,
    ])
    setUrl('')
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Assess a Program</h1>
        <p className="mt-2 text-muted-foreground">
          Paste a university handbook URL below. COMPASS will analyse the curriculum and generate a
          full DFVA report.
        </p>
        <p className="mt-1 text-xs text-orange-500 font-medium">
          Prototype — analysis is simulated and will not complete.
        </p>
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://handbook.unimelb.edu.au/2025/courses/b-des"
          className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Analyse
        </button>
      </form>

      {/* Example URLs */}
      <div className="mt-4">
        <p className="text-xs text-muted-foreground mb-2">Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => setUrl(ex)}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              {new URL(ex).pathname.split('/').pop()}
            </button>
          ))}
        </div>
      </div>

      {/* Job queue */}
      {jobs.length > 0 && (
        <div className="mt-10 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Queue
          </p>
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"
            >
              {job.status === 'loading' && (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-orange-500" />
              )}
              {job.status === 'done' && (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              )}
              {job.status === 'error' && (
                <XCircle className="h-4 w-4 shrink-0 text-red-500" />
              )}
              <span className="truncate text-sm text-foreground">{job.url}</span>
              {job.status === 'loading' && (
                <span className="ml-auto shrink-0 text-xs text-muted-foreground">Analysing…</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
