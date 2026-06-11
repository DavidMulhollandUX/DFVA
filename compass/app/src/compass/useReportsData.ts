import { useMemo } from 'react';
import { useQuery } from 'wasp/client/operations';
import { getAssessmentJobs } from 'wasp/client/operations';
import { PROGRAMS, type ProgramReport } from './sharedProgramData';
import { jobToReport } from './jobToReport';

/**
 * Merge completed DB assessments with hardcoded PROGRAMS.
 * DB data takes precedence for matching assessmentSlug.
 * Returns ProgramReport[] for ReportsPage consumption.
 */
export function useReportsData(): {
  reports: ProgramReport[];
  isLoading: boolean;
} {
  const { data: jobs = [], isLoading } = useQuery(getAssessmentJobs);

  const reports = useMemo(() => {
    // 1. Convert completed jobs to ProgramReport shape, keeping only the newest
    //    job per assessmentSlug (jobs arrive most-recent-first; re-running an
    //    assessment must not produce duplicate cards/keys).
    const fromDb: ProgramReport[] = [];
    const dbSlugs = new Set<string>();
    for (const j of jobs as any[]) {
      if (j.status !== 'complete' || !j.reportJson) continue;
      const r = jobToReport(j);
      if (dbSlugs.has(r.assessmentSlug)) continue;
      dbSlugs.add(r.assessmentSlug);
      fromDb.push(r);
    }

    // 2. Merge: DB first, then PROGRAMS entries not yet in DB
    return [
      ...fromDb,
      ...PROGRAMS.filter(p => !dbSlugs.has(p.assessmentSlug)),
    ];
  }, [jobs]);

  return { reports, isLoading };
}
