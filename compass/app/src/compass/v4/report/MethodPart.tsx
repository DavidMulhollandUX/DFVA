import { Card, CardContent } from "../../../client/components/ui/card";
import { Cite } from "../HowThisRubricWorksDialog";
import { verificationBody, verificationSummary } from "../verificationState";
import { V4_REFERENCES } from "../data/v4Rubric";
import { V4_META } from "../data/v4Meta";
import type { V4PanelC } from "../data/v4PanelC";
import { MethodDetails } from "./ReportChrome";
import {
  ANCHOR_DERIVATION_TAIL,
  METHOD_INSTRUMENT_SUMMARY,
  METHOD_INTRO,
  METHOD_VALIDATION_SUMMARY,
  NOT_IN_EXTRACT_LABEL,
  NO_IRR_BODY,
  NO_IRR_HEAD,
  NO_PANEL_HEAD,
  SCOPE_LIMITS_HEAD,
  STABILITY_COMPLETE_BODY,
  STABILITY_COMPLETE_HEAD,
  STABILITY_PENDING_BODY,
  STABILITY_PENDING_HEAD,
  ambiguitySummary,
  referencesSummary,
} from "./copy";

/** Part C: what the pilot rests on, what it recorded as ambiguous, what the
 *  validation program has not yet established, and the reference list. */
export function MethodPart({ panelC }: { panelC: V4PanelC }) {
  return (
    <>
      <p className="text-muted-foreground mb-5 text-sm">{METHOD_INTRO}</p>

      <MethodDetails summary={METHOD_INSTRUMENT_SUMMARY}>
        <Card className="border-0 shadow-none">
          <CardContent className="pt-4">
            <p className="text-muted-foreground mb-3 text-sm">
              The five items of v3.1 (D2, D3, D7, B, D5) defined adaptiveness
              through their own anchors, without an external referent; the
              associated risk of construct underrepresentation is discussed by
              Woods, Lyons and colleagues
              <Cite refs={[18]} />. Version 4 adopts the definition of adaptive
              capabilities in the TEQSA-commissioned guidance (Lodge et al.,
              2026
              <Cite refs={[1]} />
              ): digital literacy, distributed cognition, hybrid metacognition
              and life-long learning, built on deep disciplinary knowledge.
              Items C1 to C4 correspond to the four capabilities and C5 retains
              inquiry. Disciplinary depth is treated as gate G1, following the
              evidence in Deming and Noray
              <Cite refs={[6]} /> that applied technical skill functions as a
              precondition whose earnings premium declines with time. The
              Irreplaceability item has been removed on the grounds that its
              correlation with the total is better explained as a
              general-impression effect.
            </p>
            <p className="text-muted-foreground text-sm">
              Anchors are declarative statements about documented curriculum
              evidence (the Brynjolfsson–Mitchell–Rock SML form
              <Cite refs={[8]} />
              {ANCHOR_DERIVATION_TAIL}
            </p>
          </CardContent>
        </Card>
      </MethodDetails>

      <MethodDetails
        summary={ambiguitySummary(
          verificationSummary(panelC.verified),
          panelC.ambiguities.length,
        )}
      >
        <Card className="border-0 shadow-none">
          <CardContent className="pt-4">
            <p className="text-muted-foreground mb-3 text-sm">
              {verificationBody(panelC.verified)}
            </p>
            <ul className="text-muted-foreground flex flex-col gap-2 text-sm">
              {panelC.ambiguities.map((a) => (
                <li key={a} className="border-secondary border-l-2 pl-3">
                  {a}
                </li>
              ))}
              {(panelC.notScoreable ?? []).map((n) => (
                <li key={n} className="border-border border-l-2 pl-3">
                  <span className="text-foreground text-xs font-semibold uppercase">
                    {NOT_IN_EXTRACT_LABEL}
                  </span>{" "}
                  {n}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </MethodDetails>

      <MethodDetails summary={METHOD_VALIDATION_SUMMARY}>
        <Card className="border-0 shadow-none">
          <CardContent className="pt-4">
            <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
              <li>
                <strong className="text-foreground font-medium">
                  {V4_META.complete
                    ? STABILITY_COMPLETE_HEAD
                    : STABILITY_PENDING_HEAD}
                </strong>{" "}
                {V4_META.complete
                  ? STABILITY_COMPLETE_BODY
                  : STABILITY_PENDING_BODY}
              </li>
              <li>
                <strong className="text-foreground font-medium">
                  {NO_IRR_HEAD}
                </strong>{" "}
                {NO_IRR_BODY}
              </li>
              <li>
                <strong className="text-foreground font-medium">
                  {NO_PANEL_HEAD}
                </strong>{" "}
                An expert panel with crosswalks to the discipline's own
                competency frameworks — CEPH and WHO-ASPHER for public health,
                AHRI and SHRM for human resources — is the specified next step,
                following Kane's argument-based approach to validation
                <Cite refs={[17]} />.
              </li>
              <li>
                <strong className="text-foreground font-medium">
                  {SCOPE_LIMITS_HEAD}
                </strong>{" "}
                Scores describe documented curriculum intent, and the inference
                to graduate capability rests on constructive alignment, stated
                as an assumption. Indigenous data governance is not scored as a
                distinct construct; it counts toward C3 level 3 where taught
                <Cite refs={[2]} />. Physical and perceptual capability
                <Cite refs={[7]} /> is not scored.
              </li>
            </ul>
          </CardContent>
        </Card>
      </MethodDetails>

      <MethodDetails summary={referencesSummary(V4_REFERENCES.length)}>
        <Card className="border-0 shadow-none">
          <CardContent className="pt-4">
            <ol className="text-muted-foreground flex flex-col gap-2 text-sm">
              {V4_REFERENCES.map((r) => (
                <li key={r.n} className="flex gap-2">
                  <span className="text-foreground shrink-0 font-mono text-xs font-semibold">
                    [{r.n}]
                  </span>
                  <span>
                    {r.citation}
                    {r.url && (
                      <>
                        {" "}
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary-muted-foreground underline"
                        >
                          {r.url.replace(/^https?:\/\//, "").split("/")[0]}
                        </a>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </MethodDetails>
    </>
  );
}
