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
    // 1. Filter completed jobs and convert to ProgramReport shape
    const fromDb: ProgramReport[] = jobs
      .filter((j: any) => j.status === 'complete' && j.reportJson)
      .map((j: any) => jobToReport(j));

    // 2. Build set of slugs already covered by DB
    const dbSlugs = new Set(fromDb.map(r => r.assessmentSlug));

    // 3. Merge: DB first, then PROGRAMS entries not yet in DB
    return [
      ...fromDb,
      ...PROGRAMS.filter(p => !dbSlugs.has(p.assessmentSlug)),
    ];
  }, [jobs]);

  return { reports, isLoading };
}
