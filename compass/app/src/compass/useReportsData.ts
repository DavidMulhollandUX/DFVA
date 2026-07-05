import { useMemo, useEffect, useState } from "react";
import { useQuery } from "wasp/client/operations";
import { getAssessmentJobs } from "wasp/client/operations";
import { useAuth } from "wasp/client/auth";
import {
  PROGRAMS,
  CACHE_VERSION,
  type ProgramReport,
} from "./sharedProgramData";
import { jobToReport } from "./jobToReport";

// In-memory cache to prevent any loading state on tab/route switching
let memoryCache: ProgramReport[] | null = null;

const LS_KEY = "compass:reports_cache";

/** Read localStorage cache, validating version. Returns null if stale/missing. */
function readCache(): ProgramReport[] | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const { v, reports } = JSON.parse(raw);
    if (v !== CACHE_VERSION || !Array.isArray(reports) || reports.length === 0)
      return null;
    return reports;
  } catch {
    return null;
  }
}

function writeCache(reports: ProgramReport[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ v: CACHE_VERSION, reports }));
  } catch {
    /* quota exceeded — non-critical */
  }
}

/**
 * Merge completed DB assessments with hardcoded PROGRAMS.
 * DB data takes precedence for matching assessmentSlug.
 * Returns ProgramReport[] for ReportsPage consumption.
 * Caches reports in memory and localStorage with CACHE_VERSION guard.
 */
export function useReportsData(): {
  reports: ProgramReport[];
  isLoading: boolean;
} {
  const { data: user, isLoading: isUserLoading } = useAuth();

  const { data: jobs = [], isLoading: isJobsLoading } = useQuery(
    getAssessmentJobs,
    undefined,
    {
      enabled: !!user,
      staleTime: 5 * 60 * 1000,
      cacheTime: 15 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  // Init from memory → localStorage (version-checked) → PROGRAMS fallback
  const [cachedReports, setCachedReports] = useState<ProgramReport[]>(() => {
    if (memoryCache) return memoryCache;
    const fromLs = readCache();
    if (fromLs) {
      memoryCache = fromLs;
      return fromLs;
    }
    return PROGRAMS;
  });

  const mergedReports = useMemo(() => {
    const fromDb: ProgramReport[] = [];
    const dbSlugs = new Set<string>();
    for (const j of jobs as any[]) {
      if (j.status !== "complete" || !j.reportJson) continue;
      const r = jobToReport(j);
      if (dbSlugs.has(r.assessmentSlug)) continue;
      dbSlugs.add(r.assessmentSlug);
      fromDb.push(r);
    }

    return [
      ...fromDb,
      ...PROGRAMS.filter((p) => !dbSlugs.has(p.assessmentSlug)),
    ];
  }, [jobs]);

  // Sync to memory + localStorage whenever merged data changes
  useEffect(() => {
    if (jobs.length > 0) {
      memoryCache = mergedReports;
      writeCache(mergedReports);
      setCachedReports(mergedReports);
    }
  }, [mergedReports, jobs]);

  const hasData = cachedReports.length > 0;
  const isLoading = (isUserLoading || (!!user && isJobsLoading)) && !hasData;

  return {
    reports: hasData ? cachedReports : mergedReports,
    isLoading,
  };
}
