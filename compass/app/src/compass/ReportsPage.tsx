import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../client/components/ui/card";
import {
  ArrowRight,
  BarChart2,
  ClipboardList,
  Loader2,
  TrendingUp,
  Search,
  ChevronDown,
  ChevronUp,
  X,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import {
  riskBandConfig,
  thresholdConfig,
  dimBarColor,
  type DimensionScore,
} from "./sharedProgramData";
import type { ProgramReport } from "./sharedProgramData";
import { useReportsData } from "./useReportsData";
import { getFaculty } from "./faculty";

function ScoreGauge({
  score,
  max,
  band,
}: {
  score: number;
  max: number;
  band: ProgramReport["riskBand"];
}) {
  const cfg = riskBandConfig[band];
  const pct = Math.round((score / max) * 100);
  return (
    <div className="flex shrink-0 flex-col items-center justify-center">
      <div
        className={`relative flex h-20 w-20 items-center justify-center rounded-full border-4 ${cfg.border} ${cfg.bg}`}
      >
        <div className="text-center">
          <span className={`text-xl font-bold ${cfg.text}`}>{score}</span>
          <span className="text-muted-foreground block text-[10px]">
            / {max}
          </span>
        </div>
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 96 96"
          fill="none"
        >
          <circle
            cx="48"
            cy="48"
            r="44"
            strokeWidth="4"
            className="stroke-border"
          />
          <circle
            cx="48"
            cy="48"
            r="44"
            strokeWidth="4"
            strokeDasharray={`${(pct / 100) * 276.5} 276.5`}
            strokeLinecap="round"
            className={`${cfg.bar} opacity-80`}
            stroke="currentColor"
          />
        </svg>
      </div>
      <span
        className={`mt-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${cfg.bg} ${cfg.text} border ${cfg.border}`}
      >
        {cfg.label}
      </span>
    </div>
  );
}

function DimensionBars({ dimensions }: { dimensions: DimensionScore[] }) {
  return (
    <div className="bg-muted/20 border-border/45 mt-4 space-y-2 rounded-lg border p-3">
      {dimensions.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="text-muted-foreground w-36 shrink-0 truncate text-xs">
            {d.label}
          </span>
          <div className="flex flex-1 items-center gap-2">
            <div className="bg-muted h-1.5 flex-1 overflow-hidden rounded-full">
              <div
                className={`h-full rounded-full transition-all ${dimBarColor(
                  d.score,
                  d.max,
                )}`}
                style={{ width: `${(d.score / d.max) * 100}%` }}
              />
            </div>
            <span className="text-foreground w-8 shrink-0 text-right text-xs font-semibold">
              {d.score}/{d.max}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ThresholdPills({
  thresholds,
}: {
  thresholds: {
    q1: "YES" | "NO" | "UNCERTAIN";
    q2: "YES" | "NO" | "UNCERTAIN";
    q3: "YES" | "NO" | "UNCERTAIN";
  };
}) {
  const items = [
    { label: "AI replaces output?", value: thresholds.q1 },
    { label: "Designs systems / owns decisions?", value: thresholds.q2 },
    { label: "More employable in 5 years?", value: thresholds.q3 },
  ];
  return (
    <div className="bg-muted/20 border-border/45 mt-4 space-y-1.5 rounded-lg border p-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between gap-2"
        >
          <span className="text-muted-foreground text-xs">{item.label}</span>
          <span
            className={`text-xs font-bold ${
              thresholdConfig[item.value]?.color ?? ""
            }`}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ReportsPage() {
  const { reports, isLoading } = useReportsData();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [facultyFilter, setFacultyFilter] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("score-desc");
  const [expandedSlugs, setExpandedSlugs] = useState<Record<string, boolean>>(
    {},
  );

  const faculties = useMemo(() => {
    return [...new Set(reports.map((p) => getFaculty(p.program)))].sort();
  }, [reports]);

  const toggleExpand = (slug: string) => {
    setExpandedSlugs((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const filteredReports = useMemo(() => {
    let result = [...reports];

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.program.toLowerCase().includes(q) ||
          p.institution.toLowerCase().includes(q) ||
          p.assessmentSlug.toLowerCase().includes(q),
      );
    }

    if (facultyFilter !== "all") {
      result = result.filter((p) => getFaculty(p.program) === facultyFilter);
    }

    if (riskFilter !== "all") {
      result = result.filter((p) => p.riskBand === riskFilter);
    }

    switch (sortBy) {
      case "score-desc":
        result.sort((a, b) => b.score - a.score);
        break;
      case "score-asc":
        result.sort((a, b) => a.score - b.score);
        break;
      case "name":
        result.sort((a, b) => a.program.localeCompare(b.program));
        break;
      case "risk": {
        const order = {
          CRITICAL: 0,
          "HIGH RISK": 1,
          "MODERATE RISK": 2,
          RESILIENT: 3,
        };
        result.sort(
          (a, b) => (order[a.riskBand] ?? 2) - (order[b.riskBand] ?? 2),
        );
        break;
      }
    }
    return result;
  }, [reports, searchQuery, facultyFilter, riskFilter, sortBy]);

  let content: React.ReactNode;
  if (isLoading) {
    content = (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
      </div>
    );
  } else if (reports.length === 0) {
    content = (
      <div className="text-muted-foreground flex flex-col items-center justify-center py-24 text-center">
        <BarChart2 className="mb-4 h-10 w-10 opacity-20" />
        <p className="text-sm">No assessment reports yet.</p>
      </div>
    );
  } else if (filteredReports.length === 0) {
    content = (
      <div className="text-muted-foreground border-border bg-card/20 flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
        <Search className="mb-3 h-8 w-8 opacity-20" />
        <p className="text-sm font-medium">
          No programs match your search filters.
        </p>
        <button
          onClick={() => {
            setSearchQuery("");
            setFacultyFilter("all");
            setRiskFilter("all");
          }}
          className="text-primary mt-3 text-xs font-semibold hover:underline"
        >
          Clear filters
        </button>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col gap-5">
        {filteredReports.map((p) => {
          const cfg = riskBandConfig[p.riskBand];
          const isExpanded = expandedSlugs[p.assessmentSlug] || false;
          const resilientCount = p.dimensions.filter(
            (d) => d.score === 3,
          ).length;

          return (
            <Card
              key={p.assessmentSlug}
              className={`border-border/80 bg-card/85 hover:border-primary/20 overflow-hidden border shadow-sm transition-all duration-300 hover:shadow-md`}
            >
              {/* Header */}
              <CardHeader
                className={`${cfg.bg} border-border/20 border-b px-6 pt-5 pb-4`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-1">
                    <CardTitle className="text-foreground text-base leading-snug font-bold">
                      {p.program}
                    </CardTitle>
                    <div className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                      <span>{p.institution}</span>
                      <span className="text-muted-foreground/30">•</span>
                      <span>{p.level}</span>
                      <span className="text-muted-foreground/30">•</span>
                      <span>Assessed {p.date}</span>
                    </div>

                    {/* Expand/Collapse Panel Trigger */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleExpand(p.assessmentSlug);
                        }}
                        className="bg-background/60 hover:bg-background/90 border-border/80 text-foreground flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-all"
                      >
                        {isExpanded ? (
                          <>
                            <span>Collapse</span>
                            <ChevronUp className="h-3 w-3" />
                          </>
                        ) : (
                          <>
                            <span>Inspect Scores</span>
                            <ChevronDown className="h-3 w-3" />
                          </>
                        )}
                      </button>
                      <span className="text-muted-foreground bg-muted/40 border-border/30 rounded border px-1.5 py-0.5 text-[11px] font-medium">
                        {resilientCount} / 11 Resilient
                      </span>
                    </div>
                  </div>

                  <ScoreGauge
                    score={p.score}
                    max={p.maxScore}
                    band={p.riskBand}
                  />
                </div>
              </CardHeader>

              <CardContent
                className={`${isExpanded ? "pt-5" : "pt-4"} px-6 pb-5`}
              >
                {/* Collapsible details wrapper */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded
                      ? "mb-5 max-h-[750px] opacity-100"
                      : "pointer-events-none max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-border/40 grid grid-cols-1 gap-4 border-b pb-4 md:grid-cols-2">
                    <div>
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                        Dimension Scores
                      </p>
                      <DimensionBars dimensions={p.dimensions} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                        Threshold Diagnostics
                      </p>
                      <ThresholdPills thresholds={p.thresholds} />
                    </div>
                  </div>
                </div>

                {/* Report links */}
                <div
                  className={`divide-border/60 border-border grid divide-x overflow-hidden rounded-lg border ${
                    p.recommendSlug ? "grid-cols-3" : "grid-cols-2"
                  }`}
                >
                  <Link
                    to={`/reports/${p.assessmentSlug}`}
                    className={`flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold ${cfg.text} ${cfg.hoverBg} text-center transition-colors`}
                  >
                    <BarChart2 className="h-3.5 w-3.5" />
                    <span>Assessment</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                  <Link
                    to={`/reports/${p.marketSlug}`}
                    className={`flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold ${cfg.text} ${cfg.hoverBg} text-center transition-colors`}
                  >
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>Market Intel</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                  {p.recommendSlug && (
                    <Link
                      to={`/reports/${p.recommendSlug}`}
                      className={`flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold ${cfg.text} ${cfg.hoverBg} text-center transition-colors`}
                    >
                      <ClipboardList className="h-3.5 w-3.5" />
                      <span>Redesign Plan</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-8">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          Assessment Reports
        </h1>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Comprehensive curriculum audit reports cataloged by program. Select a
          card's sub-report link to open the unified Workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-4">
        {/* Left hand side filters */}
        {!isLoading && reports.length > 0 && (
          <div className="space-y-4 md:sticky md:top-20 md:col-span-1">
            <div className="border-border bg-card/40 space-y-4 rounded-xl border p-4 shadow-sm backdrop-blur-sm">
              <div className="text-muted-foreground border-border/40 flex items-center gap-1.5 border-b pb-2 text-xs font-semibold tracking-wider uppercase">
                <SlidersHorizontal className="text-primary h-3.5 w-3.5" />
                Filters & Sorting
              </div>

              {/* Search Input */}
              <div className="space-y-1.5">
                <label className="text-muted-foreground block text-[10px] font-bold tracking-wider uppercase">
                  Search
                </label>
                <div className="relative">
                  <Search className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Type to search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-muted/30 hover:bg-muted/50 focus:bg-background border-border text-foreground placeholder:text-muted-foreground focus:ring-primary/10 w-full rounded-lg border py-2 pr-9 pl-9 text-xs transition-all outline-none focus:ring-2"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-muted-foreground hover:text-foreground absolute top-2.5 right-3"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Faculty dropdown */}
              <div className="space-y-1.5">
                <label className="text-muted-foreground block text-[10px] font-bold tracking-wider uppercase">
                  Faculty
                </label>
                <div className="relative">
                  <select
                    value={facultyFilter}
                    onChange={(e) => setFacultyFilter(e.target.value)}
                    className="border-border bg-background text-foreground focus:ring-primary/10 w-full cursor-pointer appearance-none rounded-lg border bg-none px-3 py-2 pr-9 text-xs font-medium transition-colors focus:ring-2 focus:outline-none"
                  >
                    <option value="all">All Faculties</option>
                    {faculties.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="text-muted-foreground pointer-events-none absolute top-3 right-3 h-4 w-4" />
                </div>
              </div>

              {/* Risk Band dropdown */}
              <div className="space-y-1.5">
                <label className="text-muted-foreground block text-[10px] font-bold tracking-wider uppercase">
                  Risk Band
                </label>
                <div className="relative">
                  <select
                    value={riskFilter}
                    onChange={(e) => setRiskFilter(e.target.value)}
                    className="border-border bg-background text-foreground focus:ring-primary/10 w-full cursor-pointer appearance-none rounded-lg border bg-none px-3 py-2 pr-9 text-xs font-medium transition-colors focus:ring-2 focus:outline-none"
                  >
                    <option value="all">All Risk Bands</option>
                    <option value="RESILIENT">RESILIENT</option>
                    <option value="MODERATE RISK">MODERATE RISK</option>
                    <option value="HIGH RISK">HIGH RISK</option>
                    <option value="CRITICAL">CRITICAL</option>
                  </select>
                  <ChevronDown className="text-muted-foreground pointer-events-none absolute top-3 right-3 h-4 w-4" />
                </div>
              </div>

              {/* Sort Order dropdown */}
              <div className="space-y-1.5">
                <label className="text-muted-foreground block text-[10px] font-bold tracking-wider uppercase">
                  Sort By
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border-border bg-background text-foreground focus:ring-primary/10 w-full cursor-pointer appearance-none rounded-lg border bg-none px-3 py-2 pr-9 text-xs font-medium transition-colors focus:ring-2 focus:outline-none"
                  >
                    <option value="score-desc">Score: High → Low</option>
                    <option value="score-asc">Score: Low → High</option>
                    <option value="name">Name: A–Z</option>
                    <option value="risk">Risk Band</option>
                  </select>
                  <ChevronDown className="text-muted-foreground pointer-events-none absolute top-3 right-3 h-4 w-4" />
                </div>
              </div>

              {/* Reset Filters button */}
              {(facultyFilter !== "all" ||
                riskFilter !== "all" ||
                searchQuery !== "") && (
                <button
                  onClick={() => {
                    setFacultyFilter("all");
                    setRiskFilter("all");
                    setSearchQuery("");
                  }}
                  className="border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary mt-2 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset all filters
                </button>
              )}
            </div>

            <div className="text-muted-foreground flex items-center gap-1 px-1 text-[11px] font-semibold">
              Showing {filteredReports.length} of {reports.length} programs
            </div>
          </div>
        )}

        {/* Right hand side reports list */}
        <div className={reports.length > 0 ? "md:col-span-3" : "col-span-4"}>
          {content}
        </div>
      </div>
    </div>
  );
}
