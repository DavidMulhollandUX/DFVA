/**
 * Reader-facing prose for the v4 Durability Report, kept out of the render
 * tree. V4ReportPage.tsx grew ~65 hardcoded blocks inline, which is how a
 * sentence written against one program ships as a claim about every program.
 * Anything that varies with the record is a function of the record here, so
 * the corpus test can read every string one file at a time.
 *
 * Blocks that carry inline markup (citation marks, links, emphasis) stay in
 * their component: turning them into strings would either lose the markup or
 * reintroduce HTML in a string.
 */
import type { GateState } from "../gateState";
import { joinList, lowerFirst } from "../gateState";
import { V4_RUBRIC, type V4RubricItem } from "../data/v4Rubric";
import type { V4ItemResult, V4PanelC } from "../data/v4PanelC";

/** Every scored item, in rubric order, with its result. */
export const scoredItems = (
  r: V4PanelC,
): Array<{ item: V4RubricItem; score: number }> =>
  V4_RUBRIC.map((item) => ({
    item,
    score: (r[item.id as keyof V4PanelC] as V4ItemResult).score,
  }));

/** What the curriculum documents — named from the items that actually scored. */
export function strengthSummary(r: V4PanelC): string {
  const strong = scoredItems(r).filter((s) => s.score >= 2);
  if (strong.length === 0) {
    return "No item reaches the level at which the instrument treats a capability as documented and assessed.";
  }
  return `The documented curriculum evidences ${joinList(
    strong.map((s) => lowerFirst(s.item.name)),
  )}.`;
}

/** What it does not — named from the items at or below the outcome-only level. */
export function gapSummary(r: V4PanelC): string {
  const weak = scoredItems(r).filter((s) => s.score <= 1);
  if (weak.length === 0) {
    return "No item sits at or below the level where a capability is claimed but not assessed.";
  }
  const tail =
    " At these levels the capability is absent from the core, or stated in outcomes without an assessment that confirms it.";
  // When everything is weak the strength sentence has already said so; repeating
  // all eight item names adds length and no information.
  if (weak.length === V4_RUBRIC.length) {
    return `Every item sits at or below the level where a capability may be claimed but is not assessed.${tail}`;
  }
  const named = weak.map(
    (s) => `${s.item.id} ${lowerFirst(s.item.name)} (${s.score}/3)`,
  );
  return `It does not document assessed capability in ${joinList(
    named,
  )}.${tail}`;
}

/* ---------------------------------------------------------------- headings */

export const HEADING_LEVEL_ANCHORS = "How the levels are anchored";
export const HEADING_WHY_THIS_LEVEL = "Why this level and not the one above";
export const HEADING_HANDBOOK_EVIDENCE = "Handbook evidence (verbatim)";
export const HEADING_GATE_CONSTRUCT = "What this precondition tests";
export const HEADING_GATE_DECISION = "How it is decided";
export const HEADING_GATE_UNRECORDED = "What the record says";
export const AWARDED_MARK = "← this program";

export const gateWhyHeading = (state: GateState): string =>
  state === "unrecorded"
    ? HEADING_GATE_UNRECORDED
    : `Why this program was recorded as ${state === "met" ? "met" : "not met"}`;

/* -------------------------------------------------------- items and gates */

export const ITEM_NO_EVIDENCE =
  "This record cites no verbatim handbook line for the item. The instrument requires one at every level, so the score above rests on the reasoning alone and should be read as uncited.";

export const GATE_NO_EVIDENCE =
  "This record cites no verbatim handbook line for the precondition — the reasoning above is all it carries. The scored items are cited line by line; this one is not.";

export const GATE_NO_RATIONALE =
  "The rater's reasoning for this precondition is not present in this program's record.";

export const gateChipText = (state: GateState): string =>
  state === "met"
    ? "✓ Met"
    : state === "not-met"
      ? "✗ Not met"
      : "— Not recorded";

export const gateOutcomeLine = (state: GateState): string =>
  state === "met"
    ? "The curriculum documents what this precondition requires, so the scores above rest on it"
    : state === "not-met"
      ? "The curriculum does not document what this precondition requires, which flags the program whatever it scores"
      : "This program's record carries no readable result for this precondition";

export const GATE_MET_LABEL = "Met";
export const GATE_NOT_MET_LABEL = "Not met";

export const PRECONDITIONS_INTRO =
  "The conditions below sit beneath the scored items and are recorded as met or not met rather than scored, so they add nothing to the totals and subtract nothing from them. They say whether the foundation the scores rest on is documented at all. A precondition that is not met flags the program whatever its adaptiveness total, because a capability score is evidence of adaptiveness only where that foundation holds. Open a row for what the condition tests, the wording it was decided against, and why this program was recorded that way.";

/* -------------------------------------------------------------- the plane */

export const planeAriaLabel = (onV4Medians: boolean): string =>
  onV4Medians
    ? "Exposure–adaptiveness plane with the v4 draft score, against the v4 portfolio medians"
    : "Exposure–adaptiveness plane with the v4 draft score; v3.1 reference medians shown for context only";

export const PLANE_X_AXIS_LABEL = "Destination AI exposure (Felten AIOE)";
export const PLANE_SIZE_LEGEND = "W 0→9";

export const planeCaptionLead = (
  ownRecord: boolean,
  tierLabel: string,
): string =>
  ownRecord
    ? "The filled point is this program on the v4 draft score"
    : `The dashed point is this program on the v4 draft score — dashed because its exposure is a ${tierLabel} estimate, not its own graduates`;

export const PLANE_FIELD_MEDIAN_CLAUSE =
  "; the vertical line is the field-basis exposure median";

export const NO_MATRIX_TITLE = "No position figure";
export const NO_MATRIX_BODY =
  "The exposure–adaptiveness plane needs both coordinates. This program has one. Plotting it at an assumed or inherited exposure would put a measured-looking point on a measured-looking axis, which is the specific error the figure exists to avoid.";

/* ---------------------------------------------------------------- Part A  */

export const DRAFT_NOTICE_LABEL = "Draft instrument";

export const draftNoticeComparability = (complete: boolean): string =>
  complete
    ? ", so any position label on this page is assigned against the v4 medians, never the v3.1 ones"
    : ", and no position label is reported until v4 portfolio medians exist";

export const DRAFT_NOTICE_HAS_V31 =
  "The earlier v3.1 assessment is retained in the archive data; the v3.1 report format was retired, so it has no page of its own.";

export const DRAFT_NOTICE_NO_V31 =
  "This program has never been assessed on v3.1 or any earlier instrument, so there is no assessment of record to compare against — a v4 draft score is all that exists for it.";

export const LABEL_THE_FINDING = "The finding";
export const LABEL_WHAT_IT_MEANS = "What this does and does not mean";
export const LABEL_HOW_FIRM = "How firm is this";

export const WHAT_IT_MEANS_BODY =
  "The score describes what the 2026 handbook documents and assesses; it is a measure of curriculum intent, not of demonstrated graduate capability. Each score cites handbook passages verbatim (the items below can be expanded to show them), a capability stated only in learning outcomes is scored at level 1, and ambiguous evidence is resolved to the lower level.";

export const HOW_FIRM_LEAD =
  "This is a single-rater pilot of a draft instrument.";
export const HOW_FIRM_TAIL =
  "; no inter-rater study has yet been conducted on v4, and the content-validity panel has not yet been convened.";
export const HOW_FIRM_LINK = "What exists and what doesn't: Part C.";

/* --------------------------------------------------------- position card  */

export const LABEL_POSITION_CARD = "Position · coordinates only";
export const LABEL_EXPOSURE_AXIS = "Exposure (AIOE)";
export const LABEL_ADAPTIVENESS_AXIS = "Adaptiveness (v4 draft)";
export const LABEL_POSITION_AXIS = "Position";
export const EXPOSURE_MEASURED = "measured";
export const EXPOSURE_NONE = "not available · no destination basis resolved";
export const NO_MEDIAN_FOR_BASIS = " · no median published for this basis";

export const envelopeNote = (low: number, high: number): string =>
  `under ±1 rating error the score could reach ${low}–${high}`;

export const unplacedChip = (
  hasExposure: boolean,
  hasMedian: boolean,
  scored: number,
  cohortSize: number,
): string =>
  !hasExposure
    ? "Not placed — no exposure value for this program"
    : !hasMedian
      ? "Not placed — no field-basis median published yet"
      : `No peer comparison yet — ${scored} of ${cohortSize} programs re-scored`;

export const EXPOSURE_BASIS_LEAD =
  "The exposure value is independent of the scoring instrument. Basis:";

export const EXPOSURE_PROCEDURE =
  ". Every basis runs through the same Panel A procedure (destination title → O*NET-SOC → published Felten AIOE → unweighted mean); what differs is whose destinations stand for the program, and that is stated rather than hidden. ";

export const dominantShareNote = (name: string, sharePct: number): string =>
  `${name} holds ${sharePct}% of the pooled graduates, so the family value leans on it. `;

export const excludedSourceNote = (name: string, titles: string[]): string =>
  `${name} (carries ${titles.join(", ")}, adjudicated unmappable)`;

export const FIELD_BASIS_NOTE =
  "Field-grain values sample a different occupation universe from alumni titles, so this program is placed against the field-basis median of the same reference cohort, not the alumni-title median. ";

export const NO_BASIS_BODY =
  "No destination basis could be resolved for this program — no alumni record, no program-family or related record, and no field-of-education list. What is on this page is the curriculum half of a durability assessment — and the position axis stays empty until a basis is recorded. ";

export const placedNote = (
  expMedian: number | null,
  onFieldBasis: boolean,
  adaptMedian: number | null,
  cohortSize: number,
): string =>
  `The position is assigned against the v4 medians (exposure ${expMedian}${
    onFieldBasis ? " on the field basis" : ""
  }, adaptiveness ${adaptMedian}), computed from all ${cohortSize} reference-cohort programs re-scored on this instrument.`;

export const withheldNote = (scored: number, cohortSize: number): string =>
  `A position label states where a program sits relative to its peers, so it requires a v4 adaptiveness median — and that median only exists once all ${cohortSize} reference-cohort programs have been re-scored on this instrument (${scored} done). Comparing a v4 score against the v3.1 median would rank it against a different instrument, so the label is withheld rather than estimated. The dashed lines in the figure are the v3.1 medians, drawn for orientation only.`;

export const NO_EXPOSURE_WITHHELD_LEAD =
  "The label is withheld: there is no exposure value to place this program on the x-axis";

export const noAdaptMedianClause = (
  scored: number,
  cohortSize: number,
): string =>
  `, and no v4 adaptiveness median yet (${scored} of ${cohortSize} reference programs re-scored)`;

export const ceilingHeadline = (atCeiling: number, total: number): string =>
  `${atCeiling} of ${total} items score the maximum (3/3).`;

export const CEILING_BODY =
  "In v3.1, 31 per cent of scored items sat at the maximum and could only be perturbed downward. Under v4 this program's scores can move in either direction; the anchors require assessment evidence at level 3, which is expected to keep the maximum uncommon.";

export const PLANE_CAPTION_TAIL =
  "; no quadrant is implied. Faded fills are the v3.1 reference portfolio, shown for context. Open rings are the programs already re-scored on v4, and each ring\u2019s size is its workplace sub-score — W is not an axis, so size is how it is read. Rings at the same height score identically on adaptiveness and differ on workplace practice.";

/* ---------------------------------------------------------- the scorecard */

export const LABEL_SUBSCALES = "Panel C v4 — two sub-scales";
export const TITLE_ADAPTIVE =
  "Adaptive capabilities: the four TEQSA capabilities, plus inquiry";
export const TITLE_WORKPLACE = "Workplace practice";
export const TOTAL_ADAPTIVENESS = "Total adaptiveness (v4 draft)";
export const TOTAL_WORKPLACE = "Total workplace practice (v4 draft)";
export const LABEL_PRECONDITIONS = "Preconditions";

export const WORKPLACE_PENDING =
  "Not yet scored. This program was assessed on the 4.0-draft instrument, which had no workplace sub-scale. The W items require their own handbook evidence and are scored in a re-run, not inferred from the existing scores.";

/* ---------------------------------------------------------------- Part B  */

export const MARKET_INTRO_HEAD =
  "The market evidence is independent of the scoring instrument and carries over unchanged; confidence levels are stated on each section. The improvement plan that follows is derived from two inputs, the verified Panel C v4 scoring in Part A and this market evidence. Each intervention addresses a named item's next anchor level and cites its sources (";

export const MARKET_INTRO_TAIL =
  "; the citation marks in each entry link to the source).";

export const NO_MARKET_TITLE = "No market evidence for this program";

export const noMarketBody = (programName: string): string =>
  `There is no market intelligence report for ${programName}, so this part is empty rather than populated from a related program — substituting a generic profile for the discipline would present inference as observation.`;

export const NO_MARKET_OWN_RECORD =
  "Its alumni destination record does exist, and is where the exposure value in Part A comes from; what is missing is the job-family, hiring-signal and skill-shift analysis built on top of it.";

export const NO_MARKET_BOUNDS_LEAD =
  "This also bounds Part A: the curriculum implications there argue from scored evidence";

export const NO_MARKET_BOUNDS_TAIL =
  "and cannot say which capabilities the labour market is now pricing at those destinations, which is normally half the case for prioritising one intervention over another. A market report for this program is the precondition for an improvement plan.";

export const NO_PLAN_TITLE = "No improvement plan for this program yet";

export const noPlanBody = (programName: string): string =>
  `The scoring and market evidence exist, but the improvement plan for ${programName} has not been authored. This section is empty rather than populated from a related program.`;

/* ------------------------------------------------ shared markdown cards   */

export const CARD_MARKET_LABEL = "Market Intelligence";
export const CARD_MARKET_TITLE = "Labour-Market Intelligence";
export const CARD_MARKET_SUBTITLE =
  "Job families, hiring signals, and skill shifts for this program's destinations — confidence level stated per section";

export const CARD_ASSESSOR_LABEL = "Assessor's reading · v4";
export const CARD_ASSESSOR_TITLE =
  "Market evidence and curriculum implications";
export const CARD_ASSESSOR_SUBTITLE =
  "The market report condensed against the scored items, then what it implies for this curriculum — interpretation, stated as such";

export const CARD_PLAN_LABEL = "Redesign Recommendations · v4";
export const CARD_PLAN_TITLE = "Improvement Plan (Panel C v4)";
export const CARD_PLAN_SUBTITLE =
  "Recommended curriculum changes, each linked to a specific score and the market evidence behind it — with pass/fail preconditions noted where they apply";

/* ---------------------------------------------------------------- Part C  */

export const METHOD_INTRO =
  "This part records what the pilot rests on: a draft instrument with an external construct definition, a verified single-rater scoring, and a validation program that is specified but has not yet been conducted.";

export const METHOD_INSTRUMENT_SUMMARY =
  "The instrument — why Panel C was re-anchored, and on what";

export const METHOD_VALIDATION_SUMMARY =
  "What does not exist yet — the validation program is specified, not run";

export const ambiguitySummary = (verification: string, n: number): string =>
  `${verification}; ${n} recorded ambiguit${n === 1 ? "y" : "ies"}`;

export const referencesSummary = (n: number): string =>
  `References — the sources the instrument is anchored on (${n})`;

export const NOT_IN_EXTRACT_LABEL = "Not in extract:";

// The derivation note used to print a repository path at the reader. A path
// into a private repo is not a source a reader can follow.
export const ANCHOR_DERIVATION_TAIL =
  "); level 3 requires assessment evidence; every score cites verbatim handbook lines; ambiguity resolves down. The full derivation is set out in the v4 recommendation note and the literature review beside it.";

export const STABILITY_COMPLETE_HEAD = "No v4 stability layer.";
export const STABILITY_COMPLETE_BODY =
  "The migration cycle is complete, so v4 medians exist and position labels are reported. Quadrant probabilities and stability classes are not: those need a rating-error model on v4, which the specified validation program has not yet run. The v3.1-to-v4 comparison table is still to publish.";

export const STABILITY_PENDING_HEAD = "No v4 medians or stability layer.";
export const STABILITY_PENDING_BODY =
  "Position labels, quadrant probabilities and stability classes require the portfolio to be re-scored on v4, which is planned as a published migration cycle with a v3.1-to-v4 comparison table.";

export const NO_IRR_HEAD = "No inter-rater study on v4.";
export const NO_IRR_BODY =
  "The rater-reliability protocol was directed at the v4 items by decision of 2026-08-13; until it has been conducted, these scores are a single-rater application.";

export const NO_PANEL_HEAD = "No content-validity panel yet.";

export const SCOPE_LIMITS_HEAD = "Declared scope limits.";

/* ---------------------------------------------------------------- footer  */

export const footerLine = (instrument: string): string =>
  `Evidura · Durability Assessment · Panel C ${instrument} pilot · single-rater scoring, verified against source`;

export const LINK_FULL_REPORT = "Full v4 report (markdown)";
export const LINK_ALL_REPORTS = "All reports";
export const LINK_BACK_TO_REPORTS = "Back to all reports";
export const LABEL_ARCHIVED = "Archived:";
export const LINK_V1_ASSESSMENT = "v1 assessment";
export const LINK_V1_PLAN = "v1 improvement plan";

/* --------------------------------------------------------- research degree */

export const RESEARCH_NO_RATING_LABEL = "No rating";

export const researchNoRatingNotice = (signalName: string): string =>
  `Research degrees are examined on an original contribution rather than a taught curriculum, and no graduate destination data is published for them, so a ${signalName} does not apply to this program. Part A sets out both reasons in full. The assessment that follows is carried from an earlier instrument and is narrative only — it produces no score, and none should be read into it.`;

export const researchPendingNotice = (signalName: string): string =>
  `Research degrees are examined on an original contribution rather than a taught curriculum, and no graduate destination data is published for them, so a ${signalName} does not apply. Its earlier assessment and market intelligence stand as its report.`;

export const LABEL_EXPOSURE = "Exposure";
export const LABEL_ADAPTIVENESS = "Adaptiveness";
export const RESEARCH_EXPOSURE_NOTE = "no destination basis";
export const RESEARCH_ADAPTIVENESS_NOTE = "no taught curriculum to score";
export const RESEARCH_POSITION_NOTE = "needs both axes";

export const RESEARCH_MARKET_INTRO =
  "The market evidence is independent of the scoring instrument, so it stands for this program whether or not a rating applies. No improvement plan follows it: an improvement plan is derived from a curriculum score, and there is none here.";

export const CARD_RESEARCH_FINDING_LABEL = "Research degree · v4 era";
export const CARD_RESEARCH_FINDING_TITLE = "Why this program carries no rating";
export const CARD_RESEARCH_FINDING_SUBTITLE =
  "The two independent reasons, and the earlier assessment carried forward as narrative";

export const CARD_RESEARCH_PROVENANCE_LABEL = "Provenance";
export const CARD_RESEARCH_PROVENANCE_TITLE =
  "How this market evidence was sourced";
export const CARD_RESEARCH_PROVENANCE_SUBTITLE =
  "What the market report below rests on, and what it does not";

export const CARD_RESEARCH_LIMITS_LABEL = "Limitations";
export const CARD_RESEARCH_LIMITS_TITLE = "What this report does not establish";
export const CARD_RESEARCH_LIMITS_SUBTITLE =
  "Stated bounds on the reading above";

export const LABEL_EARLIER_INSTRUMENT = "Earlier instrument";
export const TITLE_ARCHIVED_ASSESSMENT = "Archived assessment";
export const ARCHIVED_ASSESSMENT_BODY =
  "The retired v1 assessment this report draws its narrative from, kept for reference. Its composite score and dimension ratings were produced by a different instrument measuring a different construct, and do not carry over.";

export const LINK_ARCHIVED_V1_ASSESSMENT = "Archived v1 assessment";
export const LINK_ARCHIVED_V1_PLAN = "Archived v1 improvement plan";
export const LINK_MARKET_INTELLIGENCE = "Market intelligence";

/* --------------------------------------------------------- pending report */

export const PENDING_TITLE = "No Durability Report";

export const PENDING_NOTICE =
  "This program has not yet been scored on the v4 instrument, so it has no current Durability Report. Its earlier assessment is kept as an archived report.";

export const noPanelCBody = (code: string | undefined): string =>
  `No Panel C v4 scoring exists for “${code}”.`;

/* ------------------------------------------------------------------- hero */

export const eyebrow = (instrument: string, pilot: boolean): string =>
  `Durability Assessment · Panel C ${instrument}${pilot ? " pilot" : ""}`;

export const heroMeta = (code: string, faculty: string): string =>
  `${code} · University of Melbourne${faculty ? ` · ${faculty}` : ""}`;

export const HERO_NAV_LEAD = "In this report:";
export const NAV_PART_A = "Part A — The finding";
export const NAV_PART_B_RESEARCH = "Part B — Market evidence";
export const NAV_PART_C_RESEARCH = "Part C — Method & limitations";
export const NAV_PART_B = "Part B — Market evidence & improvement plan";
export const NAV_PART_C = "Part C — Method, instrument & references";

export const PART_A_TITLE = "The finding";
export const PART_B_TITLE_RESEARCH = "Market evidence";
export const PART_C_TITLE_RESEARCH = "Method & limitations";
export const PART_B_TITLE = "Market evidence & improvement plan";
export const PART_C_TITLE = "Method, instrument & references";
export const PART_A = "Part A";
export const PART_B = "Part B";
export const PART_C = "Part C";
