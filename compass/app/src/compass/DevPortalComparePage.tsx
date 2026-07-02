import { DFVA_API_DATA, COMPETITORS, type CompetitorApiData } from './apiCompetitiveData';
import { Shield, Check, X, AlertTriangle, Minus, ExternalLink } from 'lucide-react';

const ALL_COMPETITORS = [DFVA_API_DATA, ...COMPETITORS];

function QualityCell({ value }: { value: string | string[] | boolean }) {
  if (value === 'accurate' || value === 'consistent' || value === 'simple') {
    return <Check className="h-5 w-5 text-green-500" />;
  }
  if (value === 'partial' || value === 'moderate') {
    return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
  }
  if (value === 'inaccurate' || value === 'inconsistent' || value === 'complex') {
    return <X className="h-5 w-5 text-red-500" />;
  }
  if (value === 'none' || value === false) {
    return <Minus className="h-5 w-5 text-muted-foreground/40" />;
  }
  if (value === 'unknown') {
    return <span className="text-sm text-muted-foreground">?</span>;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="text-xs text-muted-foreground">None</span>;
    }
    return (
      <span className="text-xs font-mono">
        {value.join(', ')}
      </span>
    );
  }
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="h-5 w-5 text-green-500" />
    ) : (
      <X className="h-5 w-5 text-red-500" />
    );
  }
  return <span className="text-xs">{String(value)}</span>;
}

const DIMENSIONS: { key: keyof CompetitorApiData; label: string; tooltip: string }[] = [
  { key: 'docsAccuracy', label: 'Docs Accuracy', tooltip: 'How accurate is the public API documentation?' },
  { key: 'authComplexity', label: 'Auth Simplicity', tooltip: 'How simple is authentication? (simple = Bearer token, complex = OAuth2 maze)' },
  { key: 'responseConsistency', label: 'Response Format', tooltip: 'Are API responses consistently structured?' },
  { key: 'sdkLanguages', label: 'SDKs', tooltip: 'Officially supported SDK languages' },
  { key: 'hasPlayground', label: 'Playground', tooltip: 'Interactive API tester available?' },
  { key: 'hasStatusPage', label: 'Status Page', tooltip: 'Public endpoint health dashboard?' },
];

export default function DevPortalComparePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          API Quality Comparison
        </h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Side-by-side comparison of developer experience quality across
          curriculum management platforms. DFVA's API is built from the ground
          up for developers — every other platform treats its API as internal
          plumbing.
        </p>

        {/* Matrix */}
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-semibold w-48">Dimension</th>
                {ALL_COMPETITORS.map((c) => (
                  <th key={c.name} className="text-center p-4 font-semibold">
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DIMENSIONS.map((dim, i) => (
                <tr key={String(dim.key)} className={i % 2 === 0 ? 'bg-muted/20' : ''}>
                  <td className="p-4">
                    <span className="font-medium">{dim.label}</span>
                    <span className="block text-xs text-muted-foreground">
                      {dim.tooltip}
                    </span>
                  </td>
                  {ALL_COMPETITORS.map((c) => (
                    <td key={c.name} className="text-center p-4">
                      <div className="flex justify-center">
                        <QualityCell value={c[dim.key] ?? 'unknown'} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pain points detail */}
        <div className="mt-12 space-y-8">
          {COMPETITORS.map((competitor) => (
            <div key={competitor.name} className="rounded-lg border p-6">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-500" />
                {competitor.name} — Known Issues
              </h2>
              {competitor.painPoints.length > 0 ? (
                <ul className="space-y-2">
                  {competitor.painPoints.map((pain, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Research in progress — evidence being collected.
                </p>
              )}
              {competitor.sourceUrls.length > 0 && (
                <div className="mt-4 text-xs text-muted-foreground">
                  <span className="font-semibold">Sources: </span>
                  {competitor.sourceUrls.map((url, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline ml-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {url.replace('https://github.com/', '')}
                      {i < competitor.sourceUrls.length - 1 && ', '}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* DFVA highlight */}
        <div className="mt-12 rounded-lg border border-green-500/20 bg-green-500/5 p-6">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            Why DFVA's API is different
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>
                <strong>Accurate OpenAPI 3.1 spec</strong> — every endpoint,
                parameter, and response schema documented. Verified against
                live responses.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>
                <strong>Simple Bearer token auth</strong> — no OAuth2 mazes,
                no dual-ID systems. One key, one header.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>
                <strong>Consistent JSON responses</strong> — standardized error
                format. No nested data-wrapping surprises.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>
                <strong>Typed SDKs for TypeScript and Python</strong> — generated
                from the OpenAPI spec. Autocomplete in your IDE.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>
                <strong>Interactive playground</strong> — test endpoints with
                your API key, see live responses and copy working code snippets.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span>
                <strong>Public status dashboard</strong> — endpoint health,
                uptime, and incident history. No guessing if the API is down.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
