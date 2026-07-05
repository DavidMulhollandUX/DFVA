// compass/app/src/compass/InsightsGate.tsx

// BACKLOG: Implement Wasp role-based permissions for Insights access.
// Roles: INSIGHTS_VIEWER, INSIGHTS_ADMIN. Gate on server-side operations. Target: Q3 2026.
const IS_LICENSED_DEMO = true;

export function InsightsGate({ children }: { children: React.ReactNode }) {
  if (IS_LICENSED_DEMO) return <>{children}</>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="border-border bg-card rounded-xl border p-12">
        <div className="bg-primary/10 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
          <svg
            className="text-primary h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <h2 className="text-foreground mb-3 text-2xl font-bold">
          Premium Insights
        </h2>
        <p className="text-muted-foreground mx-auto mb-6 max-w-md">
          Faculty-level and university-wide analytics require an Insights
          license. Available to Faculty Deans, Associate Deans, and Strategy
          teams.
        </p>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold transition-colors">
          Request Access
        </button>
        <p className="text-muted-foreground mt-4 text-xs">
          Contact the Service Experience & Design team for licensing
          information.
        </p>
      </div>
    </div>
  );
}
