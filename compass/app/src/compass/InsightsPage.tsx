// compass/app/src/compass/InsightsPage.tsx
import { Link } from 'react-router';
import { InsightsGate } from './InsightsGate';
import { PROGRAMS } from './sharedProgramData';
import { getFaculty, facultySlug } from './faculty';
import { Building2, TrendingUp, ArrowRight, Shield } from 'lucide-react';
import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../client/components/ui/card';

export default function InsightsPage() {
  const faculties = useMemo(() => {
    const groups: Record<string, { count: number; avgScore: number }> = {};
    for (const p of PROGRAMS) {
      const f = getFaculty(p.program);
      if (!groups[f]) groups[f] = { count: 0, avgScore: 0 };
      groups[f].count++;
      groups[f].avgScore += p.score;
    }
    for (const f of Object.keys(groups)) {
      groups[f].avgScore /= groups[f].count;
    }
    return Object.entries(groups).sort((a, b) => b[1].avgScore - a[1].avgScore);
  }, []);

  return (
    <InsightsGate>
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Insights</h1>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">PREMIUM</span>
          </div>
          <p className="text-muted-foreground">
            Faculty-level analytics and university-wide portfolio intelligence for strategic planning.
          </p>
        </div>

        {/* Portfolio Health card */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              University Portfolio Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive portfolio-wide analysis: risk distribution, dimension health matrix, programs on the threshold, and recommended university-wide actions.
            </p>
            <Link
              to="/insights/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              View Portfolio Report <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Faculty cards */}
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Faculty Insight Reports
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {faculties.map(([name, stats]) => (
            <Link key={name} to={`/insights/faculty/${facultySlug(name)}`}>
              <Card className="h-full hover:border-primary/40 transition-colors cursor-pointer">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{stats.count} program{stats.count !== 1 ? 's' : ''}</span>
                    <span className="font-bold">{stats.avgScore.toFixed(1)}<span className="text-xs font-normal text-muted-foreground">/36</span></span>
                  </div>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${stats.avgScore >= 24 ? 'bg-emerald-500' : stats.avgScore >= 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${(stats.avgScore / 36) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </InsightsGate>
  );
}
