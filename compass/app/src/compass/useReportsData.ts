import { useMemo, useEffect, useState } from 'react';
import { useQuery } from 'wasp/client/operations';
import { getAssessmentJobs } from 'wasp/client/operations';
import { useAuth } from 'wasp/client/auth';
import { PROGRAMS, type ProgramReport } from './sharedProgramData';
import { jobToReport } from './jobToReport';

// In-memory cache to prevent any loading state on tab/route switching
let memoryCache: ProgramReport[] | null = null;

/**
 * Merge completed DB assessments with hardcoded PROGRAMS.
 * DB data takes precedence for matching assessmentSlug.
 * Returns ProgramReport[] for ReportsPage consumption.
 * Caches reports in memory and localStorage to prevent infinite reloading loops.
 */
export function useReportsData(): {
  reports: ProgramReport[];
  isLoading: boolean;
} {
  const { data: user, isLoading: isUserLoading } = useAuth();
  
  // Use React Query with caching parameters
  const { data: jobs = [], isLoading: isJobsLoading } = useQuery(getAssessmentJobs, undefined, {
    enabled: !!user,
    staleTime: 5 * 60 * 1000,          // consider data fresh for 5 minutes
    cacheTime: 15 * 60 * 1000,          // keep in cache for 15 minutes
    refetchOnWindowFocus: false,        // don't refetch on window focus
    refetchOnMount: false,             // don't refetch on mount if data is fresh
  });

  // Initialize from memory cache or localStorage
  const [cachedReports, setCachedReports] = useState<ProgramReport[]>(() => {
    if (memoryCache) return memoryCache;
    try {
      const local = localStorage.getItem('compass:reports_cache');
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          memoryCache = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading reports cache from localStorage', e);
    }
    // Fallback: merge PROGRAMS as initial data
    return PROGRAMS;
  });

  const mergedReports = useMemo(() => {
    // Convert completed jobs to ProgramReport shape, keeping only the newest job per assessmentSlug
    const fromDb: ProgramReport[] = [];
    const dbSlugs = new Set<string>();
    for (const j of jobs as any[]) {
      if (j.status !== 'complete' || !j.reportJson) continue;
      const r = jobToReport(j);
      if (dbSlugs.has(r.assessmentSlug)) continue;
      dbSlugs.add(r.assessmentSlug);
      fromDb.push(r);
    }

    // Merge: DB first, then PROGRAMS entries not yet in DB
    const finalReports = [
      ...fromDb,
      ...PROGRAMS.filter(p => !dbSlugs.has(p.assessmentSlug)),
    ];

    return finalReports;
  }, [jobs]);

  // Synchronize dynamic updates back to memory and localStorage
  useEffect(() => {
    if (jobs.length > 0) {
      memoryCache = mergedReports;
      try {
        localStorage.setItem('compass:reports_cache', JSON.stringify(mergedReports));
      } catch (e) {
        console.warn('Error writing reports cache to localStorage', e);
      }
      setCachedReports(mergedReports);
    }
  }, [mergedReports, jobs]);

  // If we already have cached reports (even if it's just the fallback PROGRAMS list),
  // we do not want to show a blank loading screen.
  // We only show loading state if we have no cached data and the query/user is actively loading.
  const hasData = cachedReports.length > 0;
  const isLoading = (isUserLoading || (!!user && isJobsLoading)) && !hasData;

  return { 
    reports: hasData ? cachedReports : mergedReports, 
    isLoading 
  };
}
