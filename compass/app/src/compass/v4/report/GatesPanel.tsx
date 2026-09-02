import { Cite } from "../HowThisRubricWorksDialog";
import { gateState } from "../gateState";
import { V4_GATES, type V4RubricGate } from "../data/v4Rubric";
import type { V4GateResult, V4PanelC } from "../data/v4PanelC";
import { CardLabel } from "./ReportChrome";
import {
  AWARDED_MARK,
  GATE_MET_LABEL,
  GATE_NOT_MET_LABEL,
  GATE_NO_EVIDENCE,
  GATE_NO_RATIONALE,
  HEADING_GATE_CONSTRUCT,
  HEADING_GATE_DECISION,
  HEADING_HANDBOOK_EVIDENCE,
  LABEL_PRECONDITIONS,
  PRECONDITIONS_INTRO,
  gateChipText,
  gateOutcomeLine,
  gateWhyHeading,
} from "./copy";

/** One gate as an expandable row. Gates used to render as a bare pill reading
 * "G1 Disciplinary foundation ✓", which named an internal identifier and left a
 * tick mark to carry the whole meaning — a reader had no way to learn what was
 * tested, what the result decides, or why it landed that way (the rationale sat
 * in a title attribute, invisible on touch devices). The identifier is now a
 * small notation and the row states the outcome in words, with the condition
 * and the rater's reasoning underneath. */
export function GateResult({
  gate,
  result,
}: {
  gate: V4RubricGate;
  result: V4GateResult | undefined;
}) {
  const state = gateState(result);
  const tone =
    state === "met"
      ? "text-position-well-positioned-ink bg-position-well-positioned-tint"
      : state === "not-met"
        ? "text-destructive bg-destructive/10"
        : "text-muted-foreground bg-muted";
  return (
    <details className="group flex-1" data-testid={`gate-${gate.id}`}>
      <summary className="border-border hover:bg-card-accent flex cursor-pointer list-none items-center gap-3 rounded-lg border p-3 [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="text-muted-foreground shrink-0 text-xs transition-transform group-open:rotate-90"
        >
          ▶
        </span>
        <span className="min-w-0 flex-1">
          <span className="text-foreground block text-sm font-medium">
            {gate.name}
          </span>
          <span className="text-muted-foreground block text-xs">
            {gateOutcomeLine(state)}
          </span>
        </span>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase ${tone}`}
        >
          {gateChipText(state)}
        </span>
        <span className="text-muted-foreground shrink-0 font-mono text-[10px]">
          {gate.id}
        </span>
      </summary>
      <div className="bg-card-accent mt-2 mb-1 ml-5 rounded-md p-3">
        <p className="text-muted-foreground mb-1 text-[10px] font-semibold tracking-[0.18em] uppercase">
          {HEADING_GATE_CONSTRUCT}
        </p>
        <p className="text-muted-foreground text-xs italic">{gate.construct}</p>
        <p className="text-muted-foreground mt-3 mb-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase">
          {HEADING_GATE_DECISION}
        </p>
        <ul className="flex flex-col gap-1.5">
          {[
            {
              label: GATE_MET_LABEL,
              text: gate.pass,
              applies: state === "met",
            },
            {
              label: GATE_NOT_MET_LABEL,
              text: gate.fail,
              applies: state === "not-met",
            },
          ].map((condition) => (
            <li
              key={condition.label}
              className={`flex items-start gap-2 rounded-md p-1.5 text-sm ${
                condition.applies
                  ? "bg-background border-secondary border-l-2 font-medium"
                  : "text-muted-foreground"
              }`}
            >
              <span
                className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] uppercase ${
                  condition.applies
                    ? "bg-secondary/20 text-foreground"
                    : "bg-muted"
                }`}
              >
                {condition.label}
              </span>
              <span className="min-w-0">
                {condition.text}
                {condition.applies && (
                  <span className="text-secondary-muted-foreground ml-1.5 text-xs font-semibold whitespace-nowrap">
                    {AWARDED_MARK}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground mt-3 mb-1 text-[10px] font-semibold tracking-[0.18em] uppercase">
          {gateWhyHeading(state)}
        </p>
        <p className="text-foreground text-sm leading-relaxed">
          {result?.rationale ?? GATE_NO_RATIONALE}
        </p>
        <p className="text-muted-foreground mt-3 mb-1 text-[10px] font-semibold tracking-[0.18em] uppercase">
          {HEADING_HANDBOOK_EVIDENCE}
        </p>
        {result?.evidenceLines?.length ? (
          <ul className="flex flex-col gap-1">
            {result.evidenceLines.map((evidence) => (
              <li
                key={evidence}
                className="border-secondary text-muted-foreground border-l-2 pl-2 text-sm italic"
              >
                “{evidence}”
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">{GATE_NO_EVIDENCE}</p>
        )}
      </div>
    </details>
  );
}

/** The preconditions block that closes the scorecard: what a precondition is,
 *  one expandable row per gate, and why these two and not others. */
export function GatesPanel({ panelC }: { panelC: V4PanelC }) {
  return (
    <div className="border-border mt-6 border-t pt-4">
      <CardLabel>{LABEL_PRECONDITIONS}</CardLabel>
      <p className="text-muted-foreground mb-3 text-sm">
        {PRECONDITIONS_INTRO}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        {V4_GATES.map((gate) => (
          <GateResult
            key={gate.id}
            gate={gate}
            result={panelC.gates?.[gate.id as "G1" | "G2"]}
          />
        ))}
      </div>
      <p className="text-muted-foreground mt-3 text-xs">
        Disciplinary foundation is a precondition because the TEQSA framework
        places deep disciplinary knowledge beneath the four capabilities rather
        than among them
        <Cite refs={[1]} />. Decision-making under uncertainty was a scored item
        in earlier versions and became a floor once most programs cleared it.
        The Irreplaceability item used in v3.1 has been removed in v4.
      </p>
    </div>
  );
}
