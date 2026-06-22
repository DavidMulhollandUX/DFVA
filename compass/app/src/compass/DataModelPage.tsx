import { COMPETITORS, DFVA_MODEL } from "./competitiveData";
import { Link } from "react-router";
import { ArrowLeft, Database, ExternalLink, Shield, CheckCircle } from "lucide-react";

export default function DataModelPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        to="/reports"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to reports
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-lg bg-emerald-500/10 p-2">
            <Database className="h-6 w-6 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            How DFVA Models Curriculum Data
          </h1>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          DFVA stores every curriculum element as structured, typed, queryable JSON —
          a fundamentally different data architecture from every competitor in the market.
        </p>
      </div>

      {/* Architecture overview */}
      <section className="mb-12 rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-emerald-500" />
          The Structured Data Moat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DFVA_MODEL.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Schema overview — simple reference */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">Data Schema</h2>
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-semibold text-foreground">Model</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Description</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Key Fields</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="px-4 py-3 font-mono text-xs text-primary">SyllabusSnapshot</td>
                <td className="px-4 py-3 text-muted-foreground">Top-level curriculum snapshot for a degree program</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">programCode, creditStructure, subjects[], streams[], researchComponent</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="px-4 py-3 font-mono text-xs text-primary">Subject</td>
                <td className="px-4 py-3 text-muted-foreground">Individual course/unit within a degree</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">code, name, level, creditPoints, type, prerequisites[], hasAIRelevance</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="px-4 py-3 font-mono text-xs text-primary">Stream</td>
                <td className="px-4 py-3 text-muted-foreground">Named major/specialisation within a degree</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">name, subjects[], capstoneSubject, creditPoints</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="px-4 py-3 font-mono text-xs text-primary">CreditStructure</td>
                <td className="px-4 py-3 text-muted-foreground">Credit point breakdown by subject type</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">total, core, elective, breadth, research, capstone</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="px-4 py-3 font-mono text-xs text-primary">DimensionScore[]</td>
                <td className="px-4 py-3 text-muted-foreground">11-dimension DFVA assessment scores</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">label, score (0-3), max (3)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-primary">Prerequisite</td>
                <td className="px-4 py-3 text-muted-foreground">Subject prerequisite relationship</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">subject, requires, type (prerequisite|corequisite|recommended)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Competitor comparison */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">Competitor Comparison</h2>
        <div className="space-y-4">
          {COMPETITORS.map((c) => (
            <div key={c.name} className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{c.icon}</span>
                <h3 className="text-base font-semibold text-foreground">{c.name}</h3>
                <span className="text-xs text-muted-foreground">{c.tagline}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                <span className="font-medium text-red-500">Data model:</span> {c.dataModel}
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                <span className="font-medium text-red-500/80">Problem:</span> {c.problem}
              </p>
              <p className="text-sm text-emerald-500/90 mb-3">
                <span className="font-medium">DFVA advantage:</span> {c.dfvaAdvantage}
              </p>
              <div className="flex flex-wrap gap-2">
                {c.citations.map((cit, ci) => (
                  <a
                    key={ci}
                    href={cit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-primary/70 hover:text-primary underline underline-offset-2"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {cit.source} {cit.date && `(${cit.date})`}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DFVA advantage summary */}
      <section className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl">{DFVA_MODEL.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-emerald-400">{DFVA_MODEL.name}</h2>
            <p className="text-sm text-emerald-500/70">{DFVA_MODEL.tagline}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl">{DFVA_MODEL.dataModel}</p>
      </section>

      <div className="mt-8 text-center">
        <Link
          to="/docs/structured-curriculum-schema.md"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          Full schema documentation on GitHub
        </Link>
      </div>
    </div>
  );
}
