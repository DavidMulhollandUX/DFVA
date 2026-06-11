// compass/app/src/compass/PortfolioHealthPage.tsx
import { Link } from 'react-router';
import { InsightsGate } from './InsightsGate';
import { PROGRAMS } from './sharedProgramData';
import { useMemo } from 'react';
import { ArrowLeft, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../client/components/ui/card';

export default function PortfolioHealthPage() {
  const stats = useMemo(() => {
    const bands: Record<string, number> = {};
    const dimTotals: Record<string, number> = {};
    for (const p of PROGRAMS) {
      bands[p.riskBand] = (bands[p.riskBand] || 0) + 1;
      for (const d of p.dimensions) {
        dimTotals[d.label] = (dimTotals[d.label] || 0) + d.score;
      }
    }
    
    const weakest = Object.entries(dimTotals).reduce((a, b) => a[1] < b[1] ? a : b);
    const avgScore = PROGRAMS.reduce((s, p) => s + p.score, 0) / PROGRAMS.length;
    
    const threshold = PROGRAMS.filter(p => p.score >= 25 && p.score <= 27).sort((a, b) => b.score - a.score).slice(0, 5);
    
    const highRisk = PROGRAMS.filter(p => p.riskBand === 'HIGH RISK' || p.riskBand === 'CRITICAL');
    
    return { bands, avgScore, weakest, threshold, highRisk, dimTotals, count: PROGRAMS.length };
  }, []);

  const total = stats.count;
  const resilientCount = stats.bands['RESILIENT'] || 0;
  const moderateCount = stats.bands['MODERATE RISK'] || 0;
  const highCount = stats.bands['HIGH RISK'] || 0;
  const criticalCount = stats.bands['CRITICAL'] || 0;

  return (
    <InsightsGate>
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-8">
          <Link to="/insights" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Insights
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Portfolio Health Report</h1>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">PREMIUM</span>
          </div>
          <p className="text-muted-foreground">University-wide DFVA portfolio analysis for senior leadership.</p>
        </div>

        {/* Health score */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">PORTFOLIO HEALTH SCORE</div>
                <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">C+</div>
                <div className="text-xs text-muted-foreground mt-1">{stats.count} programs assessed</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">Weighted Average</div>
                <div className="text-3xl font-bold">{stats.avgScore.toFixed(1)}<span className="text-lg font-normal text-muted-foreground">/36</span></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Risk Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: 'RESILIENT', count: resilientCount, color: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300' },
                  { label: 'MODERATE RISK', count: moderateCount, color: 'bg-yellow-500', text: 'text-yellow-700 dark:text-yellow-300' },
                  { label: 'HIGH RISK', count: highCount, color: 'bg-orange-500', text: 'text-orange-700 dark:text-orange-300' },
                  { label: 'CRITICAL', count: criticalCount, color: 'bg-red-500', text: 'text-red-700 dark:text-red-300' },
                ].map(band => (
                  <div key={band.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className={band.count > 0 ? band.text : 'text-muted-foreground'}>{band.label}</span>
                      <span className="font-medium">{band.count} <span className="text-xs text-muted-foreground">({((band.count / total) * 100).toFixed(0)}%)</span></span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${band.color}`} style={{ width: `${(band.count / total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Key Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium">AI Literacy Gap:</span> University average {((stats.dimTotals['AI Literacy'] || 0) / total).toFixed(1)}/3 — weakest dimension across all programs
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium">{highCount} programs</span> in HIGH RISK or CRITICAL bands require immediate attention
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium">{stats.threshold.length} programs</span> within 3 points of RESILIENT — quick wins available
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium">{((moderateCount / total) * 100).toFixed(0)}% of programs</span> cluster in MODERATE RISK — stable but not resilient
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Programs on the edge */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Programs on the Threshold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Programs 1–3 points from RESILIENT (28+). Each requires a targeted intervention.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stats.threshold.map(p => (
                <Link key={p.assessmentSlug} to={`/reports/${p.assessmentSlug}`} className="flex items-center justify-between rounded-lg border border-border p-3 hover:border-primary/40 transition-colors">
                  <div>
                    <div className="text-sm font-medium">{p.program}</div>
                    <div className="text-xs text-muted-foreground">{p.score}/36 — {28 - p.score} pts to RESILIENT</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recommended University-Wide Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { priority: 'P1', action: 'AI Literacy Sprint', detail: 'Add AI literacy module to all programs within 3 points of RESILIENT. Single highest-impact intervention — would push up to 7 programs into RESILIENT territory.' },
                { priority: 'P1', action: 'Creative Arts Audit', detail: 'Comprehensive review of creative practice programs. MC-SCWR at 11/36 CRITICAL signals structural AI exposure in creative fields.' },
                { priority: 'P2', action: 'Business Faculty Review', detail: 'Bimodal risk profile — MC-APBUSA leads on AI literacy while MC-BAMKTG and MC-BASE show high automation exposure. Develop faculty-level AI strategy.' },
                { priority: 'P2', action: 'Market Data Expansion', detail: 'Add GOS-L 3-year outcomes, international graduate data, and occupation-level AI exposure indices to improve D10 precision.' },
                { priority: 'P3', action: 'Go8 Benchmarking', detail: 'Score equivalent programs at USyd, UNSW, ANU, UQ, and Monash to establish comparative resilience baseline.' },
              ].map((rec, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${
                    rec.priority === 'P1' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                    rec.priority === 'P2' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>{rec.priority}</span>
                  <div>
                    <div className="text-sm font-medium">{rec.action}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{rec.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </InsightsGate>
  );
}
