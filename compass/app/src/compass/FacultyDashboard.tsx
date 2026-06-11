import { useMemo } from 'react';
import { Link, useParams } from 'react-router';
import { PROGRAMS, type ProgramReport } from './sharedProgramData';
import { getFaculty, facultySlug } from './faculty';
import { Building2, AlertTriangle } from 'lucide-react';
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

    // Compute dimension averages
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
      bands,
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

export default function FacultyDashboard() {
  const { facultySlug: selectedSlug } = useParams<{ facultySlug: string }>();
  const faculties = useMemo(() => computeFacultyStats(), []);
  const aiLiteracyAvg = useMemo(() => {
    const scores = PROGRAMS.map(p => p.dimensions.find(d => d.label === 'AI Literacy')?.score ?? 0);
    return scores.reduce((s, v) => s + v, 0) / scores.length;
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <Building2 className="h-8 w-8 text-primary" />
          Faculty Comparison
        </h1>
        <p className="mt-2 text-muted-foreground">
          DFVA performance across all faculties. Sort by average score, risk distribution, or dimension strength.
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
                <tr
                  key={f.name}
                  className={`border-b border-border transition-colors ${
                    selectedSlug && facultySlug(f.name) === selectedSlug
                      ? 'bg-primary/5'
                      : 'hover:bg-muted/30'
                  }`}
                >
                  <td className="px-4 py-3 font-medium">
                    <Link to="/reports" className="hover:text-primary transition-colors">
                      {f.name}
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
