import { Link as RouterLink } from "react-router";
import { Button } from "../../client/components/ui/button";

export default function Hero() {
  return (
    <div className="relative w-full pt-14">
      <TopGradient />
      <BottomGradient />
      <div className="md:p-24">
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <div className="lg:mb-18 mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
              Prototype · Education Innovation · University of Melbourne
            </div>
            <h1 className="text-foreground text-5xl font-bold sm:text-6xl">
              Does your curriculum{" "}
              <span className="text-gradient-primary italic">prepare graduates</span>{" "}
              for an AI-augmented workforce?
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-8">
              COMPASS gives program directors, curriculum committees, and quality assurance teams
              an evidence-based scorecard to assess labour-market durability — and a prioritised
              redesign roadmap that turns findings into decisions, not shelf documents.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="default" asChild>
                <RouterLink to="/assess">
                  Assess a Program <span aria-hidden="true">→</span>
                </RouterLink>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <RouterLink to="/reports">
                  See Example Reports
                </RouterLink>
              </Button>
            </div>
          </div>
          <div className="mt-14 flow-root sm:mt-14">
            <div className="m-2 flex justify-center rounded-xl lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
                {[
                  { band: "RESILIENT", score: "28–36", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" },
                  { band: "MODERATE RISK", score: "20–27", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" },
                  { band: "HIGH RISK", score: "12–19", color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300" },
                ].map(b => (
                  <div key={b.band} className={`rounded-xl px-4 py-5 text-center ${b.color}`}>
                    <div className="text-xl font-bold">{b.score}</div>
                    <div className="text-xs font-semibold mt-1 uppercase tracking-wide">{b.band}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopGradient() {
  return (
    <div
      className="absolute right-0 top-0 -z-10 w-full transform-gpu overflow-hidden blur-3xl sm:top-0"
      aria-hidden="true"
    >
      <div
        className="aspect-1020/880 w-280 flex-none bg-linear-to-tr from-amber-400 to-purple-300 opacity-10 sm:right-1/4 sm:translate-x-1/2 dark:hidden"
        style={{
          clipPath:
            "polygon(80% 20%, 90% 55%, 50% 100%, 70% 30%, 20% 50%, 50% 0)",
        }}
      />
    </div>
  );
}

function BottomGradient() {
  return (
    <div
      className="absolute inset-x-0 top-[calc(100%-40rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-65rem)]"
      aria-hidden="true"
    >
      <div
        className="relative aspect-1020/880 w-360 bg-linear-to-br from-amber-400 to-purple-300 opacity-10 sm:-left-3/4 sm:translate-x-1/4 dark:hidden"
        style={{
          clipPath: "ellipse(80% 30% at 80% 50%)",
        }}
      />
    </div>
  );
}
