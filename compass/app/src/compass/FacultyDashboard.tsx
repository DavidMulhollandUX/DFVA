import { useMemo } from 'react';
import { Link, useParams } from 'react-router';
import { PROGRAMS, type ProgramReport } from './sharedProgramData';
import { getFaculty, facultySlug } from './faculty';
import { Building2, AlertTriangle, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../client/components/ui/card';

const DIM_LABELS = [
  'Automation Exposure', 'Systems Thinking', 'Technical Depth',
  'Decision-Making', 'AI Literacy', 'Domain Depth', 'Research Rigour',
  'Human & Relational', 'Curriculum Currency', 'Outcome Evidence',
  'Irreplaceability (bonus)',
];

interface FacultyStats {
  name: string;
  count: number;
  avgScore: number;
  minScore: number;
  maxScore: number;
  bands: Record<string, number>;
  dimAvgs: Record<string, number>;
  weakestDim: string;
  weakestAvg: number;
  strongestDim: string;
  strongestAvg: number;
  programs: ProgramReport[];
}

function computeFacultyStats(): FacultyStats[] {
  const groups: Record<string, ProgramReport[]> = {};
  for (const p of PROGRAMS) {
    const f = getFaculty(p.program);
    if (!groups[f]) groups[f] = [];
    groups[f].push(p);
  }

  return Object.entries(groups).map(([name, programs]) => {
    const avgScore = programs.reduce((s, p) => s + p.score, 0) / programs.length;

    const bands: Record<string, number> = {};
    for (const p of programs) {
      bands[p.riskBand] = (bands[p.riskBand] || 0) + 1;
    }

    const dimAvgs: Record<string, number> = {};
    for (const dim of DIM_LABELS) {
      const scores = programs.map(p => p.dimensions.find(d => d.label === dim)?.score ?? 0);
      dimAvgs[dim] = scores.reduce((s, v) => s + v, 0) / scores.length;
    }

    const entries = Object.entries(dimAvgs);
    const weakest = entries.reduce((a, b) => a[1] < b[1] ? a : b);
    const strongest = entries.reduce((a, b) => a[1] > b[1] ? a : b);

    return {
      name, programs, count: programs.length, avgScore,
      minScore: Math.min(...programs.map(p => p.score)),
      maxScore: Math.max(...programs.map(p => p.score)),
      bands, dimAvgs,
      weakestDim: weakest[0], weakestAvg: weakest[1],
      strongestDim: strongest[0], strongestAvg: strongest[1],
    };
  }).sort((a, b) => b.avgScore - a.avgScore);
}

function scoreColor(score: number): string {
  if (score >= 24) return 'text-emerald-600 dark:text-emerald-400';
  if (score >= 20) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
}

function scoreBg(score: number): string {
  if (score >= 24) return 'bg-emerald-50 dark:bg-emerald-900/20';
  if (score >= 20) return 'bg-yellow-50 dark:bg-yellow-900/20';
  return 'bg-red-50 dark:bg-red-900/20';
}

const riskBandStyles: Record<string, string> = {
  RESILIENT: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  'MODERATE RISK': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  'HIGH RISK': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  CRITICAL: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};
function dimBar(avg: number): string {
  const pct = avg / 3;
  if (pct >= 0.83) return 'bg-emerald-500';
  if (pct >= 0.5) return 'bg-yellow-500';
  return 'bg-red-500';
}

// ---------------------------------------------------------------------------
// Per-faculty detail view (rendered when /insights/faculty/:facultySlug matches)
// ---------------------------------------------------------------------------
function FacultyDetail({ f }: { f: FacultyStats }) {
  const programs = [...f.programs].sort((a, b) => b.score - a.score);
  const nearThreshold = programs.filter(p => p.score >= 26 && p.score < 28);
  const atRisk = programs.filter(p => p.riskBand === 'HIGH RISK' || p.riskBand === 'CRITICAL');
  const dims = DIM_LABELS.map(l => ({ label: l, avg: f.dimAvgs[l] })).sort((a, b) => a.avg - b.avg);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <Link to="/insights/faculty" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> All faculties
      </Link>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            {f.name}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {f.count} program{f.count !== 1 ? 's' : ''} assessed · range {f.minScore}–{f.maxScore}/36
          </p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${scoreColor(f.avgScore)}`}>{f.avgScore.toFixed(1)}<span className="text-base font-normal text-muted-foreground">/36</span></div>
          <div className="text-xs text-muted-foreground">faculty average</div>
        </div>
      </div>

      {/* band distribution + strength/gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader><CardTitle className="text-base">Risk distribution</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'RESILIENT', color: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300' },
                { label: 'MODERATE RISK', color: 'bg-yellow-500', text: 'text-yellow-700 dark:text-yellow-300' },
                { label: 'HIGH RISK', color: 'bg-orange-500', text: 'text-orange-700 dark:text-orange-300' },
                { label: 'CRITICAL', color: 'bg-red-500', text: 'text-red-700 dark:text-red-300' },
              ].map(b => {
                const c = f.bands[b.label] || 0;
                return (
                  <div key={b.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className={c > 0 ? b.text : 'text-muted-foreground'}>{b.label}</span>
                      <span className="font-medium">{c} <span className="text-xs text-muted-foreground">({Math.round((c / f.count) * 100)}%)</span></span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${b.color}`} style={{ width: `${(c / f.count) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Dimension profile</CardTitle></CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-3">
              Strongest: <span className="font-medium text-foreground">{f.strongestDim} ({f.strongestAvg.toFixed(1)})</span> · Weakest: <span className="font-medium text-foreground">{f.weakestDim} ({f.weakestAvg.toFixed(1)})</span>
            </p>
            <div className="space-y-1.5">
              {dims.map(d => (
                <div key={d.label} className="flex items-center gap-2">
                  <span className="w-32 shrink-0 text-[11px] text-muted-foreground truncate">{d.label}</span>
                  <span className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <span className={`block h-full rounded-full ${dimBar(d.avg)}`} style={{ width: `${(d.avg / 3) * 100}%` }} />
                  </span>
                  <span className="w-7 text-right text-[11px] font-semibold tabular-nums">{d.avg.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* near-threshold / at-risk callouts */}
      {(nearThreshold.length > 0 || atRisk.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {nearThreshold.length > 0 && (
            <div className="rounded-lg border border-border bg-emerald-50 dark:bg-emerald-900/10 p-4">
              <div className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-1">Closest to RESILIENT</div>
              <div className="text-sm text-muted-foreground">{nearThreshold.map(p => `${p.program} (${p.score}, ${28 - p.score} to go)`).join(' · ')}</div>
            </div>
          )}
          {atRisk.length > 0 && (
            <div className="rounded-lg border border-border bg-red-50 dark:bg-red-900/10 p-4">
              <div className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">Needs attention</div>
              <div className="text-sm text-muted-foreground">{atRisk.map(p => `${p.program} (${p.score}, ${p.riskBand})`).join(' · ')}</div>
            </div>
          )}
        </div>
      )}

      {/* programs table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Program</th>
                <th className="text-center px-3 py-3 font-semibold">Score</th>
                <th className="text-center px-3 py-3 font-semibold">Band</th>
                <th className="text-left px-4 py-3 font-semibold">Weakest dimensions</th>
                <th className="px-3 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {programs.map(p => {
                const weak = [...p.dimensions].sort((a, b) => a.score - b.score).slice(0, 2).map(d => d.label).join(', ');
                return (
                  <tr key={p.assessmentSlug} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{p.program}</td>
                    <td className="text-center px-3 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${scoreColor(p.score)} ${scoreBg(p.score)}`}>{p.score}</span>
                    </td>
                    <td className="text-center px-3 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${riskBandStyles[p.riskBand]}`}>{p.riskBand}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{weak}</td>
                    <td className="px-3 py-3 text-right">
                      <Link to={`/reports/${p.assessmentSlug}`} className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                        Report <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// All-faculty comparison (default /insights/faculty view)
// ---------------------------------------------------------------------------
export default function FacultyDashboard() {
  const { facultySlug: selectedSlug } = useParams<{ facultySlug: string }>();
  const faculties = useMemo(() => computeFacultyStats(), []);
  const aiLiteracyAvg = useMemo(() => {
    const scores = PROGRAMS.map(p => p.dimensions.find(d => d.label === 'AI Literacy')?.score ?? 0);
    return scores.reduce((s, v) => s + v, 0) / scores.length;
  }, []);

  const selected = selectedSlug ? faculties.find(f => facultySlug(f.name) === selectedSlug) : undefined;
  if (selected) return <FacultyDetail f={selected} />;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <Building2 className="h-8 w-8 text-primary" />
          Faculty Comparison
        </h1>
        <p className="mt-2 text-muted-foreground">
          DFVA performance across all faculties. Select a faculty to drill into its programs.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Faculties Assessed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{faculties.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">University Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(faculties.reduce((s, f) => s + f.avgScore * f.count, 0) / faculties.reduce((s, f) => s + f.count, 0)).toFixed(1)}
            </div>
            <div className="text-xs text-muted-foreground">weighted by program count</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Literacy Gap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {aiLiteracyAvg.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">/ 3</span>
            </div>
            <div className="text-xs text-muted-foreground">university-wide average</div>
          </CardContent>
        </Card>
      </div>

      {/* Faculty table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Faculty</th>
                <th className="text-center px-3 py-3 font-semibold">Programs</th>
                <th className="text-center px-3 py-3 font-semibold">Avg Score</th>
                <th className="text-center px-3 py-3 font-semibold">RESILIENT</th>
                <th className="text-center px-3 py-3 font-semibold">MODERATE</th>
                <th className="text-center px-3 py-3 font-semibold">HIGH</th>
                <th className="text-center px-3 py-3 font-semibold">CRITICAL</th>
                <th className="text-left px-4 py-3 font-semibold">Weakest Dimension</th>
              </tr>
            </thead>
            <tbody>
              {faculties.map((f) => (
                <tr key={f.name} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    <Link to={`/insights/faculty/${facultySlug(f.name)}`} className="inline-flex items-center gap-1 hover:text-primary transition-colors">
                      {f.name} <ArrowRight className="h-3 w-3 opacity-50" />
                    </Link>
                  </td>
                  <td className="text-center px-3 py-3 text-muted-foreground">{f.count}</td>
                  <td className="text-center px-3 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${scoreColor(f.avgScore)} ${scoreBg(f.avgScore)}`}>
                      {f.avgScore.toFixed(1)}
                    </span>
                  </td>
                  <td className="text-center px-3 py-3">
                    {f.bands['RESILIENT'] ? (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                        {f.bands['RESILIENT']}
                      </span>
                    ) : <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="text-center px-3 py-3">
                    {f.bands['MODERATE RISK'] ? (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                        {f.bands['MODERATE RISK']}
                      </span>
                    ) : <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="text-center px-3 py-3">
                    {f.bands['HIGH RISK'] ? (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                        {f.bands['HIGH RISK']}
                      </span>
                    ) : <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="text-center px-3 py-3">
                    {f.bands['CRITICAL'] ? (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                        {f.bands['CRITICAL']}
                      </span>
                    ) : <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                      <span className="text-xs">{f.weakestDim}</span>
                      <span className="text-xs text-muted-foreground">({f.weakestAvg.toFixed(1)})</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
