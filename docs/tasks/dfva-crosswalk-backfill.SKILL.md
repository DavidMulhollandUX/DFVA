---
name: dfva-crosswalk-backfill
description: Map unmapped graduate destination titles to O*NET SOC occupations so Panel A exposure can be computed for Wave 1.
---

Map graduate destination job titles to O*NET SOC occupations, so Panel A exposure can be
computed for DFVA Wave 1 programs that already hold measured alumni data.

Working directory: /Users/djmulholland/Documents/SXD-Github/DFVA

Background: `docs/dfva-destination-profiles-plan.md` §2a.

## Why this exists

Wave 1 programs have **measured** LiveAlumni destination records — real graduates,
counted — that cannot be used while any of their destination titles has no row in
`data/aioe/v31_extension_crosswalk.csv`. `dfva-v4-gen.ts` throws on an unmapped title
rather than averaging over whatever happened to map, so those programs cannot be scored
on Panel A at all.

This is the highest-value data work available: it converts existing measured evidence
into usable exposure figures. It also unblocks the hold-out validation that gates the
whole inferred-profiles workstream.

**Opened at 48 programs / 443 titles; at 13 programs / 40 titles as of 2026-08-19** (see
the run log below — the header used to carry the opening figures and read as current). Get
the live count from `destination-profiles.py nextbatch 1`, and the fully-cleared set from
`destination-profiles.py ready`.

**As of the twenty-first run the queue is EXHAUSTED, and this is verified, not assumed:**
all 40 remaining titles are refused or parked, and each of the 13 blocked programs carries
at least one refused title, so no mapping run can clear another program. A program clears
only when *every* one of its titles maps — that is why refusals do not shrink the
denominator. Read the twenty-first run entry before doing anything else; the next real
increment requires the crosswalk key to carry the program, not more mapping. Do not
re-propose the parked titles.

**The exhaustion is now machine-readable (twenty-second run).** The refusals live in
`data/aioe/crosswalk-refused.json`, and `nextbatch` reads them: it drops refused titles
*and* the programs those titles hold, so `nextbatch 1` prints `[]` and a run exits at the
first command instead of re-deriving the whole adjudication. The parked set is printed to
stderr, so nothing is hidden. `nextbatch N --all` still shows the unfiltered queue. If you
are reading this far into the file without having been sent here by a non-empty
`nextbatch`, stop — there is no live work.

## Check first — exit cheaply if there is nothing to do

```bash
cd /Users/djmulholland/Documents/SXD-Github/DFVA && python3 scripts/destination-profiles.py nextbatch 1
```

If that prints `[]`, there is no live work — either every blocking title is mapped, or
every program still blocked is held by a title already refused in
`data/aioe/crosswalk-refused.json` (the stderr note lists which). Reply with one line
saying so and STOP. Do not run `--all` and start mapping the parked titles: they unblock
nothing and add contamination risk for any future program reporting the same string.

Otherwise take the **first 20 titles**:

```bash
python3 scripts/destination-profiles.py nextbatch 20
```

**Use `nextbatch`, not `unmapped`.** `unmapped` orders by how many programs a title
touches, which sounds right and is not: a program needs EVERY one of its ~15 titles
mapped before its exposure can be computed at all, so the first 17 highest-blast-radius
mappings unblocked exactly zero programs. `nextbatch` orders by which programs are
nearest to complete — the next 15 mappings after that switch unblocked five. Each entry
names the program it completes; use that program as the context that disambiguates a
title like "Consultant", "Analyst" or "Coordinator".

Check a title's blast radius with `unmapped` before mapping it. Titles that block a
single program are disambiguated by that program's discipline and are safe to map on
context. Titles that block programs in **different faculties** are not — there are 14 of
those, and they are the ones to refuse (see below).

## What you decide, and what you must not

**You decide the O*NET SOC occupation.** That is a judgement call.

**You never write the exposure index.** `scripts/crosswalk-add.py` computes it from
`data/aioe/felten_aioe.json` using the same min-max rescale as the existing 213 rows. A
hand-written index is a plausible-looking float that nothing downstream can catch. If you
find yourself typing a number into `ai_exposure_index`, stop — the field does not exist in
your input.

## Method, per title

1. Read the title together with the programs it blocks. "Registrar" in a medical program
   and "Registrar" in a university-administration program are different occupations.
2. Choose the closest of the **774 Felten occupations** in `data/aioe/felten_aioe.json`.
   Only those 774 exist; a SOC outside them is rejected by the script.
3. Distinguish occupation from seniority. The existing rows set the convention:
   "Actuarial Analyst" maps to Actuaries with the note "'analyst' is seniority". Match the
   work, not the rank.
4. Grade the mapping `high` / `medium` / `low`, and write a `mapping_note` saying why this
   SOC **and what you rejected**. The note is required; it is what makes the mapping
   reviewable later.
5. If a title is genuinely not an occupation ("Graduate", "Intern", "Various"), or names
   only a rank ("Assistant Director"), it is mappable ONLY when it blocks a single
   program whose discipline fixes the occupation — and the note must say so and warn
   against generalising the row. If it blocks programs across faculties, do NOT force a
   mapping. Leave it out and report it: a wrong mapping is worse than a missing one,
   because it silently moves an average.

   Refused so far, and why: `Teacher`, `Classroom Teacher`, `Casual Relief Teacher` and
   `English Teacher` each block programs at different levels (primary vs secondary vs
   adult TESOL). The crosswalk is keyed on title alone, so one row must serve both, and
   Elementary (84.74) vs Secondary (91.99) is a 7-point swing with no correct answer.
   mc-teachpr and mc-teachsa cannot be completed until the crosswalk key carries the
   program, not just the title — do not keep re-proposing these four.

   Refused on 2026-08-17 (third run), both single-program and both still correct to leave
   out: `Assistant Language Teacher` (mc-apling) is the JET-style ALT role and reproduces
   the same unresolved level ambiguity as the four above — Elementary 84.74 vs Secondary
   91.99 vs 25-9041 Teacher Assistants 74.37, a 17.62-point spread that Applied
   Linguistics fixes the *domain* of but not the *level* of. Note also that 25-3011, the
   family the rest of mc-apling uses, is an **adult** literacy occupation and is wrong for
   an ALT regardless. `Family Violence & Review Officer` (274ab) spans 23.04 points and the
   record itself pulls both ways — Community Engagement toward casework (21-1021, 82.10),
   Policy Analysis and Program Evaluation toward review (13-1111, 97.73) — with no
   tiebreak; the ampersand also reads as a truncated compound title, and a title you cannot
   parse should not be mapped.

6. **State the consequence in the note.** Give the index distance to the rejected
   alternative. "Rejected X, 0.32 points away" tells a reviewer the call barely matters;
   "16.75 points away" tells them to look. This is the single most useful thing in the
   note, because it separates the judgements worth arguing about from the ones that are
   not.

## Verify before writing

Write your batch to a scratch file, then:

```bash
python3 scripts/crosswalk-add.py check /tmp/batch.json
```

Fix everything it reports. Then have a **second agent adversarially review** the batch:
for each mapping, argue the strongest case that a *different* SOC fits better. Any
mapping the reviewer overturns, or cannot defend, drops out of the batch — it is not
softened to `low` and kept. Then:

```bash
python3 scripts/crosswalk-add.py apply /tmp/batch.json
npm --prefix scripts run dfva:check
```

Input format:

```json
[{"occupation": "Curatorial Assistant",
  "onet_soc_code": "25-4012",
  "mapping_confidence": "high",
  "mapping_note": "Curatorial collection work; rejected 25-4013 Museum Technicians as more hands-on conservation."}]
```

## Already overturned in adversarial review — do not re-propose as mapped

These were proposed, checked, and killed by the reviewer on 2026-08-17. Each dropped
because its rejected alternative sat more than 10 index points away, which is where a
reviewer should always look first. Three carry a clear replacement to propose instead;
three should stay unmapped until someone resolves the underlying question.

| Title | Killed mapping | Why, and what to do next |
| --- | --- | --- |
| `Pilot Plant Operator` | 51-8091 Chemical Plant and System Operators (54.48) | O\*NET **19-4031 Chemical Technicians** (65.10) carries the literal task "Operate experimental pilot plants"; 51-8091 describes production-scale panelboard control. Propose 19-4031. |
| `Cloud Solution Architect` | 15-1143 Computer Network Architects (77.43) | 15-1143 is strictly LAN/WAN data communications. **15-1199.02 Computer Systems Engineers/Architects** (92.97) lists "Solutions Architect" as a reported title. O\*NET ties on titles; 15-1143 is the 15.5-point-lower side of the tie. Propose 15-1199. |
| `Senior Product Manager` | 11-3021 Computer and Information Systems Managers (88.85) | 11-3021 directs the IT function, not a product, and has no O\*NET title anchor. "Product Manager" is a reported title for **11-2021 Marketing Managers** (94.93); 15-1199.09 IT Project Managers is the other candidate. Propose one of those two, not 11-3021. |
| `Full-Stack Web Developer \| Python Django, Javascri` | 15-1132 Software Developers, Applications | Splits three near-identical web titles in one program record across two SOCs on the word "Django". Propose **15-1134 Web Developers**, matching `Frontend Developer` and `Web Developer`. Δ2.66, low materiality. |
| `Management Trainee` | 11-1021 General and Operations Managers (77.30) | Rule 5 fails: "Construction" in `Construction Cadet` names an industry with a matching SOC, "International Business" does not. Candidates spread 20.4 points and 11-1021 is the lowest, so the row would systematically deflate mc-ib. **Leave unmapped.** |
| `Crime Prevention Officer` | 11-9151 Social and Community Service Managers (91.15) | In Victoria and NSW this is a **sworn** divisional posting; the council-side role is titled *Community Safety Officer*. Δ43.46 to 33-3051 Police and Sheriff's Patrol Officers. **Leave unmapped** — see the 2026-08-17 (second run) note below. |

Killed on the second run of 2026-08-17:

| Title | Killed mapping | Why, and what to do next |
| --- | --- | --- |
| `Senior Product Manager` | 15-1199 Computer Occupations, All Other (92.97) | Applied the detailed-to-parent rule where it does not reach: O\*NET does **not** list "Product Manager" under 15-1199.09 IT Project Managers (that list is IT Project Manager, IS Project Manager, IT Program Manager, IT Manager, Cybersecurity Project Manager, Transition Program Manager, Scrum Master); it lists it under **11-2021 Marketing Managers** (94.93). Shipping 15-1199 would also leave `Product Director` (77.30) and `Senior Product Manager` 15.67 points apart on one occupation at two ranks. Propose **11-2021 — but only in a commit that also re-points `Product Director` to 11-2021**. Otherwise leave unmapped and settle open convention #3 first. This is the sole title still blocking mc-softeng. |
| `Nurse Research Coordinator` | 19-1042 Medical Scientists, Except Epidemiologists (94.10) | Re-mapped to **29-1141** and applied. The cited `Clinical Research Coordinator -> 19-1042` precedent does not follow O\*NET, which files Clinical Research Coordinators as 11-9121.01 under Natural Sciences Managers; `Senior Clinical Research Nurse -> 29-1141` (high) and `Nurse Coordinator -> 29-1141` are the exact precedents. Δ25.03. |

Killed on the third run of 2026-08-17 — **two proposals dead on one title**:

| Title | Killed mappings | Why, and what to do next |
| --- | --- | --- |
| `Analyst - Financial Crime Operations` | 13-2061 Financial Examiners (99.96), then 13-1041 Compliance Officers (80.24) | Round 1 killed 13-2061 as "the regulator examining institutions" — but that overturn was itself partly wrong: O\*NET lists **Bank Secrecy Act Anti-Money Laundering Officer** under 13-2061, so it does not exclude in-house AML. Round 2 killed the 13-1041 replacement, because O\*NET's literal home for the title is **13-2099.04 Fraud Examiners, Investigators and Analysts** (reported titles Anti-Fraud Operations Analyst, Fraud Analyst, Financial Crimes Investigator; tasks name suspected money-laundering), which resolved convention #2 carries to **13-2099 Financial Specialists, All Other (96.04)**. 13-1041 is the "not classified elsewhere" inspector family and sits 15.80 points below *every* financial candidate — 13-2099 (96.04), 13-2081 (96.17), 13-2051 (96.50) and 13-2061 (99.96) all lie within 3.92 of each other, so this is the `Management Trainee` failure mode inverted. Propose **13-2099**. |

Two durable facts from that row, so nobody re-derives them:

- **SOC 2018 `13-2054` Financial Risk Specialists is ABSENT from the 774 Felten
  occupations, and is credit/market risk anyway** (sample titles Equity Research Analyst,
  Risk Analyst), not AML. Do not use "13-2054 is the modern AML home" as a fallback
  premise — it is false twice over.
- **Do not re-open the regulator-vs-obliged-entity question for this title.** Two rounds
  burned on it. 13-2099.04's own title list spans both sides (`Financial Crimes
  Investigator` and `Casino Gaming Regulator` alongside `Anti-Fraud Operations Analyst`),
  so the employer axis does not separate the candidate codes.

**The qualifier rule, stated explicitly** (it decided two rows this run and is worth
reusing): a qualified `<Qualifier> <Generic Title>` re-points away from the generic
title's mapping **when the qualifier names an occupation**, and follows the generic
mapping when it does not. `Project Officer, Social Policy -> 19-3094` re-points because
Social Policy names one; `Governance Project Officer -> 13-1199` follows the generic
`Project Officer` because Governance is a VPS branch, not an occupation. "Financial
Crime" names one (13-2099.04 exists literally for it), which is part of why 13-1041 fell.

## Fourth run, 2026-08-17 — 11 applied, none overturned

Mapped: `Finance Graduate`, `Junior Analyst`, `Financial Consultant`, `Investment Analyst`,
`Equity Research Analyst` (mc-finance); `Education Training Consultant`, `Academic
Consultant`, `Lecturer in Language Learning and Assessment`, `Learning Design Manager`,
`ELICOS Academic Manager` (mc-apling); `Analyst - Financial Crime Operations` (274ab, the
directed 13-2099). The adversarial reviewer overturned nothing but corrected two
blast-radius claims in the notes before they were applied — check `job_titles.all` across
`jir_data.json`, not just the `unmapped` blocks list, before writing "X only" in a note.
`unmapped` reports which Wave 1 programs a title *blocks*; more programs *report* it.

Three lessons worth keeping:

- **`nextbatch`'s `completes` field is an ordering heuristic, not a promise.** All five
  mc-finance titles said `completes: mc-finance`; mapping all five left five more. Expect
  a batch to reduce blocker counts, and do not report programs as unblocked without
  re-running `unmapped`.
- **A tight candidate spread is what makes rule 5 safe, and it is the thing to state.**
  `Finance Graduate` cleared where `Management Trainee` was killed for the same shape,
  because every plausible finance SOC sits within 2.41 points while mc-ib's candidates
  spread 20.4 and the proposal took the lowest.
- **`Head Teacher -> 11-9039` (72.04, `low`) is probably the wrong row.** It sits in the
  Master of TESOL record 26.38 points below its own siblings `Academic Manager -> 11-9033`
  (`high`) and `Learning and Teaching Support Manager -> 11-9033`, in the record whose
  employers are *most* favourable to the 11-9039 reading. It was the flagged conflict
  against `ELICOS Academic Manager` and it lost. Re-review it separately; candidates are
  11-9033 (98.42) or 25-3011 (95.74), where every other TESOL teaching row already sits.
  This needs a row *edit*, which `crosswalk-add.py` cannot do — it is append-only and
  rejects an occupation already present.

## Fifth run, 2026-08-17 — 12 applied, one overturned; the first two programs actually cleared

**mc-finance and mc-mgmtfin are now fully mapped** — the first Wave 1 programs to clear
since this task began. Blocked programs went 27 → 25. Applied: `Risk Analyst`,
`Senior Risk Analyst`, `Senior Investment Analyst`, `Senior Financial Analyst`,
`Senior Finance Analyst`, `Finance Analyst` (all 13-2051); `Graduate Actuarial Analyst`
(15-2011); `Financial Controller` (11-3031); `Fund Accountant`, `Finance Business Partner`,
`Finance Officer` (13-2011); and `Compliance Officer` (13-2061) on a second pass.

**`Compliance Officer` — 13-1041 overturned, 13-2061 applied.** This is the most useful
row in the file, because it corrects a rule people keep reaching for:

- **A title matching a SOC's *name* is not a title anchor.** `Compliance Officer` was first
  proposed as 13-1041 Compliance Officers on exactly that argument. It is wrong twice:
  "Compliance Officer" does **not** appear in 13-1041.00's reported titles — that list is a
  motor-vehicle and licensing family (Driver License Examiner, Motor Vehicle Clerk,
  Licensing Analyst, Public Service Representative) — and **SOC 13-1041's definition ends
  "not classified elsewhere" and carries an explicit `Excludes "Financial Examiners"
  (13-2061)` clause.** A financial-institution compliance role is therefore *formally*
  outside 13-1041, not merely a poor fit. Check the reported-title list and the Excludes
  clause, not the code's name.
- **13-2061 spans both sides of the counter.** Its reported titles include Bank Examiner
  *and* Bank Secrecy Act Anti-Money Laundering Officer, Community Reinvestment Act Officer,
  Compliance Analyst, Compliance Specialist, Internal Auditor — the middle four are
  statutorily-required in-house appointments. This independently confirms the recorded
  finding that the employer axis does not separate these codes.
- **Rejected 11-9199 (86.59) on grade**, reached via O\*NET 11-9199.02 Compliance Managers,
  which is genuinely the in-house compliance function: every one of its reported titles is
  manager-rank, and the record places the title at early-mid. Same test that rejected
  11-9151 for an entry-level `Crime Prevention Officer`.
- **`Compliance and Enforcement Officer -> 13-1041` (274ab) is deliberately left alone** and
  is not a contradiction: "Enforcement" names the inspector function and that cohort is
  Criminology. Near-identical strings, different SOCs, 19.72 apart, both correct.
- **Being at the top of the scale is not the deflation failure mode inverted.** 13-2061 is
  99.96, but mc-mgmtfin's 13 other titles already run 96.50–99.73, so the row moves the
  program mean by +0.16 (13-2099 would have moved it −0.12; 13-1041 would have moved it
  −1.25). Compute the effect on the record's mean before rejecting a candidate for being
  extreme — the defensible band here was 3.92 wide and the pick was decided by definition,
  not by index.

Also worth keeping: `Financial Controller -> 11-3031` rests on O\*NET **11-3031.01 Treasurers
and Controllers** (reported titles Controller, Comptroller, Corporate Controller) carried to
the parent by resolved convention #2. And SOC 2018 split 13-2051 into 13-2051 + 13-2054; since
13-2054 is absent from Felten, **both** of its sample titles — `Equity Research Analyst` and
`Risk Analyst` — correctly land on 13-2051, which is why the whole risk-analyst family sits
there.

## Sixth run, 2026-08-17 — 18 applied, three overturned; 277aa cleared

**277aa (Master of Intellectual Property Law) is now fully mapped.** Blocked programs
25 → 24. Applied: the whole 277aa cluster of 11 titles (`Patent and Trade Marks Attorney`,
`Patent Attorney | Chemistry & Life Sciences`, `Solicitor (Intellectual Property)`,
`Trade Mark Lawyer`, `Lawyer (Intellectual Property)`, `Patent Scientist`, `Intellectual
Property Consultant`, `Senior IP Counsel`, `Head of Intellectual Property`, `Senior Manager
- Patent Litigation`, `Senior Legal Counsel, Intellectual Property & Bran` — all 23-1011,
following the existing `Patent Attorney` row), plus seven of the ten mc-mecheng titles:
`Graduate Mechanical Engineer`, `Graduate Mechanical Reliability Engineer`,
`Mechanical Engineer` (17-2141); `Systems Engineer`, `Research And Development Engineer`
(17-2199); `Fire Safety Engineer` (17-2111, via O\*NET 17-2111.02); `Engineering Manager`
(11-9041).

**The reported-title test is now the highest-yield check in the review, and it should be
run BEFORE proposing, not after.** All three overturns this run came from it, and two of
them inverted a convention that looked settled.

| Title | Killed mapping | Why, and what to do next |
| --- | --- | --- |
| `Product Development Engineer` | 17-2199 Engineers, All Other (82.37) | Proposed on the "names a function, not a discipline" residual convention — but **"Product Development Engineer" is a verbatim reported title under 17-2141.00**, so the residual had no anchor and the discipline code did. A literal title hit beats the residual convention, exactly as it did for `Cloud Solution Architect` and `Compliance Officer`. Propose **17-2141**, Δ5.17. |
| `Test Engineer` | 17-2199 Engineers, All Other (82.37) | **Verbatim reported title under BOTH 17-2141 (87.54) and 17-2071 (90.45)**, and under 17-2011. The residual sat 5.17–8.08 below two *anchored* cohort reads that are themselves only 2.91 apart — the `Management Trainee` deflation shape, with anchors on both sides. Propose **17-2141**, the lower anchored option, so it stays conservative for mc-eleceng. |
| `Lead Aerodynamics Engineer` | 17-2011 Aerospace Engineers (95.50) | **17-2011.00 does not list "Aerodynamics Engineer" or "Aerodynamicist"** — the proposal rested on an industry inference the note itself conceded could not be settled from the data, and it was the batch's largest gap (7.96) and the only title that lifted the program mean. The record carries Ford and FAW-Volkswagen, and O\*NET surfaces **17-2141.02 Automotive Engineers** (parent 17-2141). Propose **17-2141**, or leave unmapped. |

Four lessons worth keeping:

- **A residual-bucket mapping needs the absence of an anchor, not just the absence of a
  discipline word in the title.** Three of the five 17-2199 proposals this run were wrong
  for that reason. `Systems Engineer` and `Research And Development Engineer` survived
  *only because* the reviewer confirmed no engineering-side reported title exists for
  them; `Systems Engineer`'s only O\*NET homes are 17-2011 and 15-1199.02, both wrong for
  mc-mecheng/mc-biomeng.
- **Where two blocked cohorts agree to within half a point, the residual is a deflation of
  both, not a compromise between them.** Say so in the note. `Systems Engineer` and
  `Research And Development Engineer` each sit 4.76–5.17 below *both* cohort reads (which
  are 0.41 apart) and are kept only because neither cohort read has an anchor either.
- ~~**The existing `Graduate Project Engineer -> 17-2199` row is demonstrably wrong**~~
  **RETRACTED on the tenth run — this claim is false, and so is the sentence above it.**
  "Project Engineer" *is* a verbatim reported title under 17-2141 and 17-2071, but it is
  ALSO verbatim under **17-2199.05 Mechatronics Engineers and 17-2199.06 Microsystems
  Engineers**, both of which roll up to 17-2199 by resolved convention #2. The row is
  anchored and needs no edit. For the same reason `Systems Engineer` (verbatim under
  17-2199.06, as `Systems Engineer` and `System Engineer`) and `Research And Development
  Engineer` (verbatim under 17-2199.05) are **anchored** rows, not the unanchored
  compromises the paragraph above describes — do not cite either as an
  unanchored-residual precedent. **Whenever you check whether 17-2199 has an anchor, check
  its detailed occupations, not just 17-2199.00, which has no reported-title list of its
  own.** The genuinely unanchored 17-2199 rows are `Lead Engineer` (medium),
  `Service Engineer` (low) and `Senior Applied Research Engineer` (medium).
  `Head Teacher -> 11-9039` from the fourth run remains a real open item.
- **There are THREE crosswalk sources, not one.** `destination-profiles.py` reads
  `reconcile_C_authoritative_288_index.csv`, `v2_panelA_new_occupation_crosswalk.csv` and
  `v31_extension_crosswalk.csv`. Grepping only the extension file produced a false "these
  titles are unmapped but not reported as blockers" finding this run — `Project Engineer`
  and `Senior Project Manager` are both mapped, in the other two files. Also note the
  extension CSV has embedded newlines inside quoted notes, so line-anchored `grep` misses
  rows; use `csv.DictReader` or `load_crosswalk()`.

## Seventh run, 2026-08-17 — 10 applied, none overturned; mc-mecheng cleared

**mc-mecheng is now fully mapped.** Blocked programs 24 → 23. Applied: the three directed
replacements the sixth run pre-argued (`Product Development Engineer`, `Test Engineer`,
`Lead Aerodynamics Engineer`, all 17-2141) plus seven of mc-biomeng's eight blockers —
`Graduate Verification and Validation Engineer` (17-2112, via 17-2112.02 Validation
Engineers), `Biological Engineer` (17-2031), `Systems Safety Engineer` (17-2111),
`Field Service Technician` (49-9062), `Engineering Operations Manager` (11-9041),
`Technology Consulting Manager` (13-1111), `Chief Product Officer` (11-1011).

The reviewer overturned nothing but found **ten factual errors in the notes**, all fixed
before applying. That ratio is the lesson: this batch was well-sourced on SOC choice and
sloppy on the surrounding claims. Run the reported-title fetch *and* re-derive every index
distance and precedent citation before writing the note, not just before picking the code.
Three error classes worth naming:

- **Citing a SOC 2018 code as a rejected alternative.** `15-1253` was named as rejected for
  the V&V row; it is not among the 774 Felten occupations, so it was never available to
  reject. Same trap as the recorded `13-2054` fact. Check the candidate exists before
  rejecting it, and quote the SOC 2010 label Felten actually indexes — 17-2031's Felten
  label is `Biomedical Engineers`, not the current O*NET `Bioengineers and Biomedical
  Engineers`, so a name-match argument built on the modern title does not hold.
- **Naming the wrong "largest gap".** `Field Service Technician` flagged its 11.22 to
  17-3029 while the gap a reviewer needs is **30.12 to the cohort read 17-2031**, which
  itself reports "Biomedical Technician". Flag the distance to the *cohort* read, not
  merely to the nearest alternative you happened to consider.
- **Undisclosed near-identical existing rows.** `System Safety & Assurance Engineer →
  17-2199` (Δ4.94) and `Technology Consultant → 15-1121` (Δ5.58) both existed and both went
  unmentioned. Neither is a contradiction — different cohorts, the sanctioned
  `Compliance Officer` pattern — but an undisclosed one reads as one.

Two further durable points:

- **"Conservative" has a direction in this repo, and it is not "lower".** Deflation is the
  named failure mode, so the *lower* pick is the un-conservative one. `Test Engineer →
  17-2141` is justified as **symmetric**, not conservative: it costs mc-eleceng 2.91 and the
  17-2071 alternative would cost mc-mecheng the same 2.91, with no anchored midpoint.
- **`Clinical Specialist` (mc-biomeng) refused, and the reported-title test is what refuses
  it.** "Clinical Specialist" *is* a verbatim O*NET reported title — the only exact match in
  the database — under **29-1141.04 Clinical Nurse Specialists**, an advanced-practice RN
  occupation a Master of Biomedical Engineering graduate is categorically ineligible to
  hold. This is the `Assistant Language Teacher` shape: a title with a home that is the
  wrong home for the cohort. With the sole anchor eliminated on eligibility, the remaining
  candidates span **27.83 points** (49-9062 57.01 → 41-4011 84.84) with no tiebreak, and
  41-4011's reported titles are pure sales. Leave unmapped.

**mc-biomeng did not clear** and the `nextbatch` `completes` field again over-promised: it
has two blockers left, `Clinical Specialist` (refused) and **`Innovation Manager`, unmapped
in all three crosswalk files and never surfaced by `nextbatch`**. Next single-title wins are
mc-ib, mc-softeng (both blocked only by a refused/parked title), then mc-apling, mc-biomeng
and 274ab at two each.

**Forward risk to inherit, not re-derive:** mc-mtrneng's unmapped `Field Service Engineer`
and `Remote Service Engineer` now face a **25.36-point fork** between the new
`Field Service Technician → 49-9062` (57.01) and the existing `Service Engineer → 17-2199`
(82.37), decided entirely on Technician vs Engineer. The 49-9062 row rests on rule 3 —
"Technician" naming the occupation rather than the rank — and does not by itself carry to
either Engineer-titled role.

## Eighth run, 2026-08-17 — 11 applied, none overturned; m04aa cleared

**m04aa (Master of Music Therapy) is now fully mapped** — its whole 11-title blocker set
went in as one cluster. Blocked programs 23 → 22; blocking titles 210 → 199. Applied:
`Registered Music Therapist`, `Locum Music Therapist`, `Project Music Therapist`,
`Music Facilitator`, `Music and Movement Program Developer and Facilitat`, `Early Childhood
Music Group Facilitator`, `Expressive Therapist`, `Expressive Therapies Group Facilitator`,
`Music Therapy Profession Lead`, `Registered Music Therapist, Director` (all 29-1125), plus
`Music Therapy Assistant` (31-9099). These are the **first 29-1125 rows in any of the three
crosswalk files**.

**The big one: Felten is SOC 2010, and for a retired code that changes the answer.** O\*NET
today files Music Therapists as **29-1129.02** and Art Therapists as **29-1129.01**, parent
**29-1129 Therapists, All Other — which is ABSENT from the 774**. Reading the modern
taxonomy alone, this cluster looks unmappable. But both were **29-1125.02 and 29-1125.01
under O\*NET-SOC 2010** (onetonline serves the retirement notice at
`/link/summary/29-1129.02?redir=29-1125.02`), parent **29-1125 Recreational Therapists**,
which is present. Felten is SOC 2010 — its list carries `13-2071 Loan Counselors` and
`27-1014 Multi-Media Artists and Animators`, both retired in SOC 2018. So:

- **When a title's O\*NET home is a code absent from the 774, check whether SOC 2010 filed
  it somewhere else before concluding it is unmappable.** This is the inverse of the
  recorded `13-2054` / `15-1253` trap: those were codes too *new* to reject; this is a
  parent too *new* to use.
- 29-1129 **also existed in SOC 2010** and is still absent (no O\*NET ability data), so this
  is not a vintage dodge — it was never available on either taxonomy.

**Concentration is not by itself a defect.** Nine of eleven landed on 29-1125 and the
reviewer tested that directly: it is the expected shape for a single-profession clinical
master's, and 277aa already put 11 titles on 23-1011. The materiality check is what settles
it — the batch's only discriminating row moves the record mean by 0.11 (70.67 vs 70.78).

Three lessons worth keeping:

- **"Tight spread makes context safe" is the wrong form of the argument when you have
  missed a candidate.** The first draft justified the four unanchored `Facilitator` rows on
  a 5.31-point spread. The reviewer found **25-3021 Self-Enrichment Education Teachers
  (76.14)** — omitted, 7.32 points *above* 29-1125, and the only candidate with a
  music-titled anchor (`Music Instructor`, `Piano Teacher`). Real spread: **21.68**. The
  claim had to be rewritten from tightness to **position**: 29-1125 sits second-highest of
  six with four candidates below, so it is not the deflation shape. Enumerate the candidate
  set before quoting its width — a spread figure is a claim about what you did not consider.
- **Measure the fork from the code you are proposing, not from the one you rejected.**
  `Music Therapy Assistant` quoted 12.73 to the existing `Therapy Assistant -> 31-2011`;
  that is 29-1125 → 31-2011. The actual distance from the proposed 31-9099 is **11.47**, and
  the effect on the record mean is **−0.96**. Raw index distance overstates materiality
  whenever the record is large.
- **Search the other two crosswalk files for the *structural* analogue, not just the string.**
  Three supporting precedents were missed and all three were stronger than the arguments
  actually made: **`Allied Health Assistant -> 31-9099` (high)** — music therapy is allied
  health in Australia, and 31-9099 carries detailed occupation 31-9099.01 Speech-Language
  Pathology Assistants; **`Veterinary Director -> 29-1131`** and **`Clinical Director, Mental
  Health Drugs and Alcohol -> 29-1066`** — exact analogues for `Registered Music Therapist,
  Director`. Which exposes a real convention, now recorded as #6.

**`Innovation Manager` (mc-biomeng) refused.** No O\*NET occupation reports it (checked), and
the unanchored candidates span 11-1011 (95.39), 11-3021 (88.85) and 11-1021 (77.30) — the
killed `Senior Product Manager` shape exactly. Mapping it would also unblock nothing:
mc-biomeng's other blocker is `Clinical Specialist`, refused on eligibility in the seventh run.

## Ninth run, 2026-08-17 — 8 applied, one overturned; mc-agsc NOT cleared

The whole batch was one program, **mc-agsc (Master of Agricultural Sciences)**, whose 11
blockers were the only live work — `nextbatch 20` returned 11 previously-refused/parked
titles ahead of them. Blocking titles 199 → 191; blocked programs stayed at **22**.
Applied: `Agronomist`, `Senior Field Agronomist`, `Agricultural Consultant` (19-1013);
`Agriculture Extension Officer` (25-9021, only the second row on that code);
`Graduate Nutritionist` (19-1011, the **first 19-1011 row in any of the three files**);
`Quality Control Officer` (19-4011); `Agribusiness Analyst` (13-1111);
`Natural Environment Program Officer` (19-2041).

**mc-agsc did not clear and cannot** — three of its 15 titles are now refused, so this
batch is inventory, not throughput. Say so in the report rather than letting `nextbatch`'s
`completes` field imply otherwise; that field has now over-promised on four consecutive runs.

| Title | Killed mapping | Why, and what to do next |
| --- | --- | --- |
| `Head of National Beef Development` | 19-1011 Animal Scientists (88.41) | The `Beef Cattle Specialist` / `Beef Cattle Nutritionist` anchors are real but anchor only the word *Beef*. The rivals are **equally half-anchored on the function word**: 11-9121 reports `Research and Development Director` and `Environmental Program Manager`, 11-2021 reports `Business Development Director` and `Market Development Executive`. One domain-anchored candidate against two function-anchored ones, 6.83 and 6.52 away, with no tiebreak. Raw spread **35.22** — wider than anything previously mapped and wider than every recorded refusal (`Clinical Specialist` 27.83, `Family Violence & Review Officer` 23.04, `Management Trainee` 20.4). The record's employers are Rural R&D Corporations and industry bodies (GRDC, Hort Innovation, Dairy Australia, ACIAR), where a "Head of National X Development" is an R&D portfolio manager, not a bench scientist. **Leave unmapped.** |

**Both refusals stand, and the second is the reusable one.** `Agribusiness Graduate` —
the `Finance Graduate` exemption turns on a 2.41-point band; here it is **37.56**, and the
record's own employers pull across the whole of it (Rabobank banking → Cargill operations →
GRDC research → Agriculture Victoria extension). Contrast `Sustainability Graduate ->
19-2041` in the *same* record, which works only because "Sustainability" has one dominant
SOC. `Research and Development Officer` — no O*NET occupation reports the string, and the
existing R&D family splits entirely on the second word across **29.35 points**
(`Assistant -> 19-4011`, `Technologist -> 19-1012`, `Engineer -> 17-2199`,
`Head Of -> 11-9121`); "Officer" names neither a discipline nor a technical grade, so the
family's own key returns nothing.

Four lessons worth keeping:

- **"Head of <Domain> <Function>" carries a word on both sides of convention #6, so the
  convention returns no answer.** The file's two precedents sit on opposite sides —
  `Head of Intellectual Property -> 23-1011` (domain only → practitioner) and
  `Head Of Research And Development -> 11-9121` (function only → manager). Cite both and
  show which side the title lands on; a title carrying both is a refusal, not a coin flip.
- **Getting the record's denominator wrong inflates every materiality figure.** The first
  draft divided by 13 (9 proposed + 4 already mapped), silently assuming the refused titles
  vanish. `panelAFor` (`scripts/dfva-v4-gen.ts`) means over **all** deduped titles in
  `job_titles.all` and throws unless every one is mapped, so mc-agsc's denominator is **15**
  and every figure was 15.4% too large. Effect on the record mean is always
  `Δindex / len(job_titles.all)`.
- **Cite a precedent's SOC, not just its index — a wrong code can hide the strongest rival.**
  `Laboratory Technician` was cited as `19-4021` (Biological Technicians, 70.78); it is
  actually **19-4099** Life, Physical and Social Science Technicians, All Other (74.33). That
  error concealed 19-4099 — via O\*NET 19-4099.01 Quality Control Analysts, which reports
  `Quality Control Analyst`, `Quality Control Technician` and `Quality Control Lab Technician`
  — as the real rival to `Quality Control Officer -> 19-4011`, 8.44 away rather than the
  "immaterial" 2.98 the note claimed. 19-4011 was upheld on discipline-over-residual
  (`Product Development Engineer -> 17-2141` logic), but on a candidate set that had to be
  corrected first.
- **"Not a protected title" kills an eligibility argument.** `Graduate Nutritionist -> 19-1011`
  was first argued as the `Clinical Specialist` case — rejecting the verbatim anchor 29-1031
  on Australian credentialing. That is **false**: "Nutritionist" is unprotected in Australia
  and neither dietitians nor nutritionists are AHPRA-registered, so the bar is nothing like
  29-1141.04's RN requirement. The row survives on cohort evidence alone (19-1011 carries four
  verbatim `Nutritionist` titles; the record has no clinical employer), which is what the note
  now says. Check registration law before invoking eligibility — it is the difference between
  a substitution and a refusal.

Also recorded: `Graduate <X> -> <X>'s SOC` holds in **29 of the 31 testable pairs** —
counted on the tenth run: **51** Graduate-prefixed rows exist across the three files, 31 of
them have a row for the bare base title too, and 29 of those agree. Exceptions are
`Graduate Project Manager -> 11-9021` and `Graduate Nutritionist -> 19-1011`. (The earlier
"29 of 30 existing Graduate-prefixed rows" phrasing was wrong twice: wrong denominator, and
it counted rows rather than pairs.) The second break is safe only because the crosswalk is
title-keyed and the cohorts do not collide — the existing `Nutritionist -> 29-1031` row
serves **Master of Food Science**. Disclose the convention when breaking it.

## Tenth run, 2026-08-17 — 10 applied, two overturned; mc-eleceng 11 blockers → 1

The batch was one program, **mc-eleceng (Master of Electrical Engineering)**; `nextbatch 20`
returned 14 previously refused/parked titles ahead of its 11. All 11 are reported by
mc-eleceng alone. Blocking titles 191 → 181; blocked programs stayed at **22**. Applied:
`Electrical Engineer`, `Graduate Electrical Engineer`, `Grid connection engineer` (17-2071);
`Graduate engineer`, `Control Systems Engineer`, `Building Optimisation Engineer`,
`DSP Engineer`, `DSP Firmware Engineer` (17-2199); `Equipment Engineer`,
`Multimedia Test Engineer` (17-2141).

**mc-eleceng did not clear** — `Technical Leader` is refused, so this batch is inventory, not
throughput, and `nextbatch`'s `completes` field has now over-promised for a **fifth**
consecutive run.

| Title | Killed mapping | Why, and what to do next |
| --- | --- | --- |
| `Equipment Engineer` | 17-2199 via 17-2199.05 (82.37) | Verbatim under 17-2199.05 **and** 17-2141.00 — but 17-2141 is anchored **twice**, because its definition names the work: "planning and designing tools, engines, machines, and other mechanically functioning **equipment**. Oversee installation, operation, maintenance, and repair of **equipment**…". 17-2199.05's definition has no equipment language. Picking the lower of two anchored codes needs a symmetry justification and none was available (mc-eleceng-only title). Applied **17-2141**, Δ5.17. |
| `DSP Firmware Engineer` | 15-1133 Software Developers, Systems Software (94.18) | The killed `Django` split. The qualifier rule re-points only when the qualifier **names an occupation**, and **no O\*NET occupation reports "Firmware Engineer"** (checked 17-2071, 17-2072, 17-2061, 15-1252, 17-2199.05/.06/.08, 11-9041) — "Firmware" names a software stratum. 15-1133 offers only a permissive "May design embedded systems software" clause plus an illustrative example for a *different* string; per the `Compliance Officer` row a name match is not a title anchor, and a "may" clause is weaker still. Applied **17-2199**, matching its sibling `DSP Engineer`. Δ11.81 avoided. |

Four lessons worth keeping:

- **17-2199 is not a residual you can test by looking at 17-2199.00.** It has no
  reported-title list of its own; all its anchors live in the `.03/.05/.06/.08` detailed
  occupations, which resolved convention #2 carries to the parent. This run found verbatim
  hits there for `Control Systems Engineer` (**two** — .05 and .06), `Equipment Engineer`,
  `Systems Engineer`, `System Engineer`, `Research and Development Engineer` and
  `Project Engineer`. It is why the sixth run's "demonstrably wrong `Graduate Project
  Engineer`" claim had to be retracted above. Check the detailed occupations **before**
  calling a 17-2199 row unanchored — three prior runs got this wrong in both directions.
- **An anchor for the whole title beats an anchor for a qualifier.** `DSP Firmware Engineer`
  failed because "Firmware" had no occupational home; the qualifier rule returns nothing
  when the qualifier is a technology stratum, a framework (`Django`) or a VPS branch
  (`Governance`), and then the generic sibling governs. The corollary that DID hold:
  `Multimedia Test Engineer` follows `Test Engineer` for the same reason.
- **Refuse on the AXIS, not the width.** The first draft argued `Technical Leader` should be
  refused partly on an 8.08-point candidate spread — narrower than `DSP Engineer`'s 14.72,
  which the same batch mapped. Width is not the test: `Lead Engineer`, `Service Engineer`
  and `Senior Applied Research Engineer` are all unanchored and all kept. What refuses a
  title is a fork with **no evidence on the deciding axis**.
- **A "may" clause and an illustrative example are not the same as a reported title, and
  Felten's SOC-2010 vintage cuts both ways.** 15-1133 is genuinely available (SOC 2018
  merged it into 15-1252 **and 15-1253**, and its modern definition drops the embedded
  clause) — but availability was never the question. Verify the anchor's *strength* before
  spending 11.81 points on it.

**`Technical Leader` refused, and it is the sole remaining mc-eleceng blocker.** No O\*NET
occupation reports "Technical Leader" or "Technical Lead" (checked; 11-9041's list is nine
`X Engineering Manager` / `Engineering Director` / `Project Manager` entries). The live fork
is **17-2071 (90.45, senior individual contributor in the cohort discipline) vs 11-9041
(83.55, engineering manager), Δ6.90**, mean effect ±0.46 — and the record carries no
title-to-employer link to settle it. Resolved convention #6 points at 11-9041 ("Technical"
is not a discipline, so a bare string takes the management code) but was derived entirely
from clinical *Director* rows resting on a verbatim "Clinical Director" under 11-9111, and
11-9041 has no comparable anchor. Against that, in Australian engineering consultancies —
including **Aurecon, this record's largest employer** — "Technical Leader" is deliberately
the *non-managerial* technical-track grade, which flips #6's answer to 17-2071. A convention
that returns opposite results depending on an absent employer link is the
`Crime Prevention Officer` shape. Note the 17-2199 (82.37) / 11-9041 (83.55) pair sitting
1.18 apart is numerical accident, not agreement between reads — do not quote it as a tight
spread.

**Two script facts worth inheriting.** `load_crosswalk()` in `destination-profiles.py` keys
on the **exact, case-sensitive** string, so `Graduate engineer` blocked while
`Graduate Engineer` was mapped; the real fix is a `casefold` there, and the appended row is
an append-only workaround. Separately, `crosswalk-add.py`'s `existing()` reads **only**
`v31_extension_crosswalk.csv`, so its duplicate guard cannot see a collision with the other
two files — "the script would have rejected a duplicate" is not a test that actually runs.

## Eleventh run, 2026-08-17 — 20 applied, three overturned; mc-inslead cleared

`nextbatch 30` returned **15 previously refused/parked titles** before any live work, so the
batch was the next two complete clusters: **mc-inslead** (Master of Instructional Leadership,
all 11 blockers) and **mc-pubcom** (Master of Publishing and Communications, all 11).
Blocking titles 181 → 161; blocked programs 22 → **21**.

**mc-inslead is fully mapped** — the fifth Wave 1 program to clear. Applied: `School
Principal`, `Deputy Principal`, `Senior Education Improvement Leader` (11-9032);
`Instructional Leader`, `Literacy Leader`, `Student Achievement Manager`, `Curriculum
Coordinator`, `Curriculum Advisor`, `Head of Curriculum`, `Education Consultant` (25-9031);
`Primary School Teacher` (25-2021). Record mean **92.27** over 13 titles.

**mc-pubcom did NOT clear** — 11 blockers → 2. Applied: `Editor`, `Senior Editor`,
`Assistant Editor` (27-3041); `Editorial Assistant` (**43-9081**); `Technical Writer`
(27-3042); `Senior Content Writer` (27-3043); `Communications Specialist`, `Senior
Communications Officer`, `Digital Communications Officer` (27-3031).

| Title | Killed mapping | Why, and what to do next |
| --- | --- | --- |
| `Editorial Assistant` | 27-3041 Editors (90.48) | The note claimed "no O\*NET occupation reports 'Editorial Assistant'". **False** — it is verbatim under **43-9081.00** (94.30), alongside Copy Editor, Copyholder, News Copy Editor, Proofer, Proofreader, Typesetter. Re-mapped to **43-9081** and applied, Δ+3.82. |
| `Publishing Assistant` | 27-3041 Editors | Its whole basis was the Editorial Assistant structural argument, which collapsed. **Left unmapped**, and confirmed on a second pass: the string is reported by **none** of its five candidates — 43-9031, 43-6011, 43-9081, 27-3041, 27-3031 summary pages all fetched and checked. Candidates span 22.51 (43-9031 71.79 → 43-9081 94.30) with no title-to-employer link to decide the editorial-vs-production-vs-clerical axis. The reviewer's proposed 43-9081 (sibling-consistency with `Editorial Assistant`) does not carry it: the qualifiers name different things — "Editorial" names editorial work, "Publishing" names an industry — which is the same distinction that killed `Management Trainee`. |
| `Content Manager` | 27-3043 Writers and Authors (87.14) | **Lowest of six** candidates — the `Management Trainee` deflation shape. Two were never enumerated: **11-2031 (94.43)** and **15-1199 (92.97)**. **Left unmapped.** See the verified candidate set below before re-proposing — the second pass found no clean replacement, so this is NOT cheap to settle. |

### `Content Manager` — the verified candidate set, so nobody re-derives it

Every summary page below was fetched on the second pass of 2026-08-17. Do not re-propose
without adding evidence on the deciding axis; the reviewer's own recommendation (27-3031)
turned out to be unanchored once checked.

| Candidate | Index | Anchor status (verified) |
| --- | --- | --- |
| 27-3043 Writers and Authors | 87.14 | Anchored on the **qualifier only** — `Web Content Writer`. Head noun differs. Lowest of the set. |
| 27-3041 Editors | 90.48 | No anchor. |
| 15-1199 Computer Occupations, All Other | 92.97 | **The only head-noun anchor**: `Web Content Manager` verbatim under Web Administrators, SOC 2010 **15-1199.03** (redirects to 15-1299.01 today), carried to the parent by resolved convention #2. But that occupation is web environment design, deployment and QA — not publishing content work. |
| 27-3031 Public Relations Specialists | 94.22 | **No anchor** — its ten reported titles are all PR/communications and contain no "Content" string. Rests solely on the crosswalk row `Digital Content Officer -> 27-3031` (medium). |
| 11-2031 Public Relations Managers | 94.43 | No anchor for this string. Crosswalk precedent `Communications Manager -> 11-2031` (high). Rejected on seniority — the record files `Content Manager` at **early_mid**, the same test that rejected 11-9199.02 for `Compliance Officer` and 11-9151 for `Crime Prevention Officer`. |
| 11-2021 Marketing Managers | 94.93 | **No anchor** — confirmed; its list is Brand Manager, Marketing Manager, Product Manager etc. Rejected on the same seniority test. |

Four kinds of evidence pointing four ways across 7.79 points, and the record cannot decide
between them: it carries no title-to-employer link, and its skills list holds *both* `Editing`
and `Web Content` and `Social Media`. That is a fork with no evidence on the deciding axis —
a refusal by the recorded rule, not a width complaint.

Five lessons worth keeping:

- **O\*NET quick search saying "no exact match" is NOT the reported-title test, and this run is
  the proof.** `/find/quick?s=X` matches occupation *titles*; the reported/alternate-title
  lists live on each code's own summary page. Three rows in this batch wrote "no O\*NET
  occupation reports this string (checked)" on the strength of the quick search, and one of
  the three was flatly wrong. **Fetch `/link/summary/<code>.00` for every candidate you intend
  to reject**, not only for the one you intend to propose.
- **The `<Noun> Assistant` family takes the SUBORDINATE code, and `Curatorial Assistant ->
  25-4012` is the exception, not the rule.** Verified rows: `Gallery Assistant` and `Museum
  Assistant -> 25-4013` (not 25-4012 Curators, in the same museum domain), `Legal Assistant ->
  23-2011` (not 23-1011), `Architectural Assistant -> 17-3011` (not 17-1011), `Teaching
  Assistant` / `Learning Support Assistant -> 25-9041`, `Music Therapy Assistant -> 31-9099`.
  Citing `Curatorial Assistant` alone as "exact structural precedent" is cherry-picking a
  family that runs the other way. It survives only because it has no verbatim anchor.
- **`Assistant Editor -> 27-3041` and `Editorial Assistant -> 43-9081` split deliberately,
  3.82 apart, and that is the settled resolution — not a `Django` violation.** Where a
  verbatim anchor exists it governs; where none exists rule 3 governs. Do not "fix" this pair.
- **Check the definition's Excludes clause in BOTH directions.** 43-9081 "Excludes workers
  whose primary duty is editing copy", which is what keeps `Editor`, `Senior Editor` and
  `Assistant Editor` on 27-3041 while the assistant row moves. The `Compliance Officer` lesson
  is usually cited to disqualify a code; here the same clause qualifies one.
- **A directional asymmetry across a batch is a stronger signal than any single row.** All
  three overturns moved the index UP (+3.82, +3.82, +7.08). The mc-inslead half was anchored
  and clean; the mc-pubcom half took the low side of every unanchored fork. Audit a batch for
  that pattern before shipping it.

Two smaller corrections made before applying (mapping unaffected): 11-9032 is **4th**, not
first, on an O\*NET keyword search for "Deputy Principal" (the word "Deputy" pulls three
33-xxxx policing codes above it), and 25-9031 is **3rd**, not first, for "Literacy Leader"
(behind 25-1081 and 25-3011). Also, `Primary School Teacher`'s note understated its own
evidence: **`Primary Teacher` is verbatim under 25-2021.00**, so that row is anchored, not
merely top-ranked. And a claim that mc-inslead's employers are "school systems, not
universities" was false — the record lists Deakin, Melbourne and Victoria University; the
11-9033 rejection rests on the title, not the employer mix.

**Next single-title wins** are unchanged and all parked: mc-ib, mc-softeng, mc-eleceng (one
refused title each). mc-pubcom joins mc-apling, mc-biomeng and 274ab at two blockers, and
after the second pass both of its two are refused on verified grounds — so **there is no
cheap program left on the board**, and the next run should expect to open a fresh cluster
(mc-socw, mc-eco, mc-mgmtact/742ab and 305bb/mc-spchpth are the next coherent single-program
sets, at 11–13 blockers each). An earlier draft of this section called `Content Manager`
"cheap to settle"; that was written before 27-3031's title list was checked and is wrong.

## Twelfth run, 2026-08-17 — 11 applied, one overturned; mc-socw cleared

`nextbatch 40` returned **23 previously refused/parked titles** before any live work. The
batch was the next complete cluster: **mc-socw (Master of Social Work, n=203)**, all 11
blockers, every one reported by mc-socw alone. Blocking titles **149 → 138**, blocked
programs **20 → 19**. (The eleventh run's 161/21 figures were already stale against the
working tree; measure, don't inherit.) Applied: `Social Worker`, `Mental Health Social
Worker`, `Clinical Social Worker`, `Senior Social Worker`, `Case Manager` (21-1023);
`Child Protection Practitioner`, `Advanced Child Protection Practitioner`, `Child and
Family Practitioner`, `Family Support Worker` (21-1021); `Support Coordinator`,
`Youth Worker` (21-1093). These are the **first rows on 21-1021, 21-1022 or 21-1023 in any
of the three crosswalk files**. Record mean 86.73 over 15 titles.

### The reported-title test as practised has been reading a truncated sample — fix it

This is the most important finding in this file. `/link/summary/<code>.00` shows *Sample of
reported job titles*, a **capped ~10-item display sample** (7,798 rows across all of O*NET).
The full reported/alternate-title database is a separate flat file, **`Alternate Titles.txt`
— 55,120 data rows** — with a `Source(s)` column where `02` = incumbent data from O*NET's own
collection and `10` = employer job postings. Download it once per run:

```bash
curl -sL -o alt.txt "https://www.onetcenter.org/dl_files/database/db_29_1_text/Alternate%20Titles.txt"
awk -F'\t' -v s="Family Support Worker" 'tolower($2)==tolower(s){print $1"  src="$4}' alt.txt
```

Three notes in this batch asserted "no O*NET occupation reports X (summary pages fetched and
checked)". **Two were false at the alternate-title layer**, one against a source-02 incumbent
title. This is the eleventh run's `Editorial Assistant` overturn recurring because the test
itself was under-specified — it will keep recurring until every run greps the flat file.
Verified this run: `Social Worker` is carried by 21-1021, 21-1022 **and** 21-1023 with the
*identical* provenance `src 02,10`, so the eleventh-run-style argument "code X doesn't report
the bare string" was simply wrong about 21-1021.

### The overturn

| Title | Killed mapping | Why |
| --- | --- | --- |
| `Family Support Worker` | 21-1093 Social and Human Service Assistants (74.69) | Verbatim in Alternate Titles under **21-1021** (src 09,**10**) and 21-1022 (src 09); the note claimed no occupation reported it and listed 21-1021 among the pages checked — the very code that does. Where a verbatim anchor exists it governs, where none exists rule 3 governs (the settled `Assistant Editor` / `Editorial Assistant` split): `Support Worker` and `Mental Health Support Worker` have **zero** O*NET titles at either layer, so those 21-1093 rows are unanchored and this one legitimately splits from them. Re-mapped to **21-1021**, Δ+7.41. |

Five lessons worth keeping:

- **The `<Domain> Support Worker` "family" does not exist.** `Support Worker → 21-1093`
  (74.69), `Mental Health Support Worker → 21-1093` (74.69) and **`Disability Support Worker
  → 39-9021` (49.93, in `reconcile_C`)** span 24.76 points. Citing the first two as a family
  is the `Curatorial Assistant` cherry-pick.
- **The three crosswalk files are NOT all in `data/aioe/`.** Two live in
  `data/aioe/reconciliation/` (`reconcile_C_authoritative_288_index.csv`,
  `v2_panelA_new_occupation_crosswalk.csv`). A helper built on the paths as written in the
  sixth-run note silently searches only `v31_extension` and reports false "no such row"
  findings — it missed `Disability Support Worker` here. Glob `data/aioe/**/*.csv`.
- **Enumerate the verbatim candidate set before quoting a spread.** `Case Manager` was first
  written as "verbatim under FOUR codes, spread 20.01"; it is verbatim under **eight** in-scope
  codes — 29-2099 (56.84), 21-1021 (82.10), 21-1011 (88.16), 21-1023 (90.27), 11-9151 (91.15),
  43-4061 (92.82), 21-1014 (95.59), plus 21-1022 (85.86) — real spread **38.75**. The mapping
  survived on the `Equipment Engineer` double-anchor tiebreak (21-1023 uniquely has bare
  sample title + definition language + the widest provenance, src 02,08,09,10), but on a
  candidate set that had to be corrected first.
- **Audit the batch for directional asymmetry, per row's position in its OWN candidate set.**
  Rows 1–8 landed mid-set; the three worker/coordinator rows all landed at the floor — and two
  of the three got there by denying an anchor that pointed higher. One of those two was the
  overturn. `Support Coordinator` reached the floor honestly (zero O*NET hits at both layers).
- **Do not argue from typical qualification level to deflate a record.** The killed row said a
  Family Support Worker is "a Cert IV/Diploma role, not a qualified social work post". That is
  the `Graduate Nutritionist` error twice over: Berry Street's minimum is a Diploma not Cert IV,
  Anglicare Victoria's family services PD specifies a degree — and reasoning from who *usually*
  holds a title, against a record of 203 MSW graduates who demonstrably hold it, is invalid.

Smaller corrections made before applying: 21-1022's Felten SOC-2010 label is **Medical and
Public Health Social Workers**, not the modern "Healthcare Social Workers" (the 17-2031
`Biomedical Engineers` trap); Victorian child protection grades are **CPP3 Practitioner /
CPP4 Advanced / CPP5.1 Senior**, so "Advanced" is CPP4 and carries no supervisory function
(which strengthens the 11-9151 rejection); the record carries **no employer counts**, so
DFFH is "first-listed", not "largest"; and the AASW Accredited Mental Health Social Worker
credential is a prevalence observation only — social work is not AHPRA-registered and
"Clinical Social Worker" is not protected in Australia, so it must never be escalated into
an eligibility bar.

**Forward risk to inherit, not re-derive.** Crosswalk rows are permanent and title-keyed, and
three of these titles appear in non-Wave-1 records that will eventually be scored, all Faculty
of Arts: `Social Worker` (BA Psychology, BA Sociology), `Case Manager` (BA Criminology),
`Child Protection Practitioner` (BA Gender Studies, BA Psychology). Two are live conflicts —
**BA (Psychology)'s employer list is eight hospitals** (RCH, Austin, Peter Mac, Monash Health,
RMH, St Vincent's, Alfred), the pure 21-1022 setting that `Social Worker → 21-1023`
contradicts; and **BA (Criminology)** is a justice cohort with `Prison Officer` and `Probation
Officer` as siblings, for which `Case Manager → 21-1023` is plainly wrong. Neither is a Wave 1
blocker today, so `unmapped`'s `nPrograms: 1` was correct as a blocker count and misleading as
a blast radius. **Check `job_titles.all` across all 141 `jir_data.json` records, not just the
`unmapped` blocks list, before writing "X only" in a note** — the fourth run recorded this and
it still caught three rows here.

**`Youth Worker` is the weakest row shipped** and should be re-reviewed first if anything
contradicts it: it overrides a source-02 incumbent anchor (39-9032 Recreation Workers, 57.79)
on occupational content, and the residual fork to 21-1021 is 7.41 points with genuinely split
qualifier-layer evidence (21-1021 carries five youth strings, 21-1093 three; neither anchors
the head noun).

**Next single-title wins** remain parked (mc-ib, mc-softeng, mc-eleceng, and 274ab, mc-apling,
mc-biomeng, mc-pubcom at two refused each). The next coherent fresh clusters are **mc-eco**
(6+ blockers, opens with `Economist` / `Analyst`), **mc-mgmtact/742ab** (shares `Graduate
Accountant` and `Tax Accountant`, the only 2-program titles left besides the teaching family),
and **mc-culmc / mc-larch**, which `dfva:check` now names as the most affected records
(14/15 unmapped each).

## Thirteenth run, 2026-08-18 — 12 applied, none overturned; mc-eco cleared

`nextbatch 40` returned **23 previously refused/parked titles** before any live work. The batch
was the next complete cluster: **mc-eco (Master of Economics, n=30)**, all 12 blockers.
Blocking titles **138 → 126**, blocked programs **19 → 18**. Applied: `Economist`,
`Economic Consultant`, `Research Economist`, `Senior Economist`, `Principal Economist`,
`Senior Research Economist`, `Regulatory Economist`, `Economic Advisor`,
`Senior Economic Analyst`, `Senior Pricing and Regulatory Analyst` (all 19-3011 — the
**second and subsequent 19-3011 rows**, after `Health Economist`); `Analyst`, `Senior Analyst`
(13-1111). Record mean **96.53** over 15 titles.

The adversarial reviewer **overturned nothing** — the first clean sweep on SOC choice since
the eighth run — but found **seven factual errors in the notes**, all fixed before applying.
That is the same ratio as the seventh run and the same lesson: the SOC picks were sound and
the surrounding claims were not.

**`<Qualifier> Economist` is now a settled convention, and it is unusually strong.** O\*NET
files **24 distinct qualified-economist titles** on 19-3011 across `.00` and `.01`
(Agricultural, Business, Consultant, Environmental, Financial, Fiscal, Forensic, Forest,
Health, Industrial, Labor, **Price**, Project, Research, Social, Tax, Trade, Ecological,
Energy, Environmental Protection, Marine Resource, Natural Resource, Resource, Home). The
**only** qualified economists filed elsewhere in the whole 55,125-row file are
`Data Economist` (15-2051, **absent from the 774**), `Climate Economist` (19-2041.01) and
`Home Economist` (25-9021, alongside its 19-3011 row). Nine of this batch's twelve rows rest
on that plus rule-3 seniority. Also verified: a substring search for
`(senior|principal|chief|lead) econom` across all 55,125 rows returns **zero hits on any
code**, so a seniority-prefixed economist title has no anchor anywhere and rule 3 governs
cleanly.

Four lessons worth keeping:

- **A rejected alternative more than 10 points away is not automatically the risky row —
  check whether it is a *live* candidate first.** `Regulatory Economist` rejects 13-1041
  (80.24) by 16.81 and was the batch's best-evidenced mapping. 13-1041 is the
  inspector/enforcement plus **pharmaceutical** regulatory-affairs family: 13-1041.07's title
  list is entirely drug/vaccine submission work, 13-1041.01 is environmental compliance
  inspection, and the definition ends "not classified elsewhere". The first draft justified
  the rejection by claiming its two crosswalk rows "both turn on the word 'Affairs'" —
  **false, there are six 13-1041 rows and four contain no 'Affairs' at all**
  (`Quality Assurance Specialist`, `Investigation Officer`, `Senior Investigator`,
  `Compliance and Enforcement Officer`). The correct framing strengthens the rejection.
- **`13-2054`'s absence from the 774 REINFORCES 13-2051, it does not delete a candidate.**
  Bare `Analyst` is verbatim under 13-1051 (src 02), 13-2051 (src 02) **and 13-2054** (src 02);
  since SOC 2018 split 13-2051 into 13-2051 + 13-2054 and Felten is SOC 2010, 13-2054's titles
  fold back, anchoring 13-2051 twice. The recorded 13-2054 fact has until now only been used
  to strike a candidate; it cuts the other way too.
- **`Analyst -> 13-1111` survives on DEFINITION, not eligibility — and that distinction is
  load-bearing.** The verbatim anchors 13-1051 Cost Estimators and 13-2051 Financial Analysts
  are unlicensed titles, so the `Clinical Specialist` eligibility move is unavailable (the
  `Graduate Nutritionist` lesson). What eliminates them is that 13-1051's definition is
  manufacturing/construction cost estimation and 13-2051's is securities valuation, against a
  record with no costing or securities employer and no finance skill — the `Equipment Engineer`
  definition tiebreak. The independent second leg: **`Junior Analyst -> 13-1111` was mapped for
  mc-finance, where 13-2051 was the anchored pull and 13-1111 still won**, so by rule 3 the bare
  form cannot sit below its own junior grade.
- **State asymmetry per row, not once per batch.** The draft called `Analyst` "the batch's only
  upward-asymmetric pick"; `Senior Analyst` is the identical pick and
  `Senior Pricing and Regulatory Analyst` rejects both its lower rivals. All **three** unanchored
  rows resolve upward. If every one had gone to its lowest live candidate the record mean would
  fall 96.53 → 95.20 — not band-changing, and each row is individually defensible, but the
  disclosure belongs on each row.

**`Senior Pricing and Regulatory Analyst` is the row to re-review first** if anything later
contradicts this cluster — it is the only unanchored pick with double-digit exposure (16.81 to
13-1041, mean effect −1.12). It is **not** a refusal by the recorded rules: the refusal test is
a fork with *no evidence on the deciding axis*, not a wide fork, and here the record supplies
one-directional evidence from two independent fields (three of twelve employers are economic
regulators — ACCC, AER, ACMA — the rest are treasuries, advisory bodies, a central bank and four
economic-consulting firms, with **no** commercial-pricing or pharma regulatory-affairs employer;
all nine skills are economics/econometrics/modelling/research/policy). Contrast the recorded
refusals, where the record itself pulled both ways. Its full candidate set, enumerated so nobody
re-derives it: 13-1041 (80.24), 13-1199 (88.56, `Pricing Analyst` src 09), 11-2021 (94.93,
`Pricing Manager` src 09), **13-2099 (96.04, `Rate Analyst` src 04,06)**, 13-2051 (96.50,
`Pricing Analyst` src 08), 19-3011 (97.05), 13-1111 (97.73), 13-1023 (99.56, `Price Analyst`
src 04), 15-2011 (99.73, `Pricing Actuary` src 02,04,10) — note **two candidates sit ABOVE the
pick**, and `Regulatory Analyst` is also under 17-2111.00 (src 08). 19-3011 carries
`Price Economist` (src 04,06) and **`Revenue Research Analyst` (src 02, incumbent)**, which is
literally this function.

Smaller corrections made before applying (mappings unaffected): `Economic Research Analyst` is
src **04,06** (employer-side only), not 02,04,06; the `Assistant Editor` / `Editorial Assistant`
precedent is *suggestive* for `Senior Economic Analyst`, not governing — that pair split
anchor-vs-**no**-anchor, this one splits anchor-vs-**overridden**-anchor; and "the settled repo
convention for a bare analyst" overstates three rows carrying one `low` and two `medium`.

**Blast radius was clean for the first time in this task's history** — all twelve claims were
checked against `job_titles.all` in all 141 records rather than the `unmapped` blocks list, and
all twelve verified. Three titles reach beyond mc-eco and all three readings hold: `Economist`
(BA Economics, BA Philosophy, BCom Economics), `Research Economist` (BA Economics),
`Senior Analyst` (BCom Economics — whose own analyst rows already split qualified-to-13-2051
against unqualified-to-13-1111, so the convention holds there too).

**Next fresh clusters**, all parked programs unchanged (mc-ib, mc-softeng, mc-eleceng at one
refused title each; 274ab, mc-apling, mc-biomeng, mc-pubcom at two): **mc-spchpth** (12
blockers, a single-profession clinical cluster like m04aa), then **mc-culmc** and **mc-larch**
(14 each, still the records `dfva:check` names as most affected), **742ab/mc-mgmtact** (13 each,
sharing `Graduate Accountant` and `Tax Accountant`), **mc-mtrneng** (13, and inheriting the
recorded 25.36-point `Field Service Engineer` fork), **mc-engysys** and **mc-li** (13 each).

## Fourteenth run, 2026-08-18 — 12 applied, none overturned; mc-spchpth cleared

`nextbatch 40` returned **23 previously refused/parked titles** before any live work. The batch
was the next complete cluster: **mc-spchpth (Master of Speech Pathology, n=98)**, all 12
blockers, every one reported by mc-spchpth alone. Blocking titles **126 → 114**, blocked
programs **18 → 17**. Applied: `Speech Language Pathologist`,
`Bilingual Speech-Language Pathologist`, `Paediatric Speech Pathologist`,
`NDIS Speech Pathologist`, `Grade 1 Speech Pathologist`, `Senior Speech Pathologist`,
`Consultant Speech Pathologist`, `Clinical Specialist Speech & Language Therapist`,
`Clinical Lead & Senior Speech Pathologist`, `Speech Pathology Team Leader` (all 29-1127 —
the **second and subsequent 29-1127 rows**, after `Speech Pathologist`);
`Lecturer in Speech Pathology` (**25-1071**); `Speech Pathology Research Assistant`
(**19-4061**). Record mean **89.56** over 14 titles, entry mean **91.37** over 3.

**The first batch in this task's history with a verbatim anchor on every pick**, and that is
why the reviewer overturned nothing. It still found **12 factual errors in the notes**, all
fixed before applying — the seventh/thirteenth-run ratio again. Two error classes are new:

- **Crediting a rejected code with an anchor it does not have.** The `Consultant Speech
  Pathologist` note said 13-1111 "reports bare 'Consultant'". **Bare `Consultant` appears
  nowhere in all 55,120 Alternate Titles rows** — all 39 of 13-1111's titles are qualified
  (Business, Management, Healthcare, Business Process, Organizational Development). This is
  the `Editorial Assistant` / `Family Support Worker` error **inverted**: those invented an
  absence, this invented a presence. Both directions need the flat-file grep.
- **A "no rival exists" enumeration is a spread claim in disguise.** The first note said only
  31-9099 and 25-1071 carry a speech title besides 29-1127. **Four codes do**: add **11-9111**
  (93.63, `Speech Therapy Director` src=04,06 and `Speech and Hearing Therapy Director`
  src=04) and **25-2051** (72.54, `Speech and Hearing Handicapped Teacher` src=08). The batch
  contradicted itself — two later rows disclosed the 11-9111 anchor the first row denied.

Three durable facts worth inheriting:

- **`Lecturer in <Discipline>` is now settled on three rows, and 25-1071 is a systematic
  `<Health Discipline> Teacher` list.** 25-1071.00 carries **120+** reported titles of that
  exact shape, including `Speech Pathology Teacher` and `Speech Therapy Teacher` (src=04,06),
  plus Physical Therapy, Occupational Therapy, Dental Hygiene, Hearing Therapy, Music Therapy,
  Dietetics and Nutrition. Existing rows: `Lecturer in Genetic Counselling -> 25-1071`,
  `Clinical Demonstrator -> 25-1071` (medium) and `Lecturer in Language Learning and
  Assessment -> 25-1081`. **The rival to beat is 25-1122 Communications Teachers (95.71)**,
  which reports `Speech Professor` (src=02,04), `Speech Instructor` (src=02) and
  `Speech Teacher` (src=04,06) — all "speech" as oratory. An anchor for the whole compound
  beats an anchor for a qualifier (the `DSP Firmware Engineer` rule).
- **Bare `Lecturer` is not a discriminating anchor and must never be cited as one.** It is a
  reported title under **31** codes (28 at src=02), including 25-1071, 25-1072, 25-1081 and
  25-1122 — and 25-3099 Teachers and Instructors, All Other, which is not postsecondary at
  all. The bare `Lecturer -> 92.50` crosswalk row has **no SOC**; it is an imputed mean over
  the 25-1xxx family, so it cannot serve as a precedent either.
- **`Consultant <Health Profession>` is an O*NET pattern, not just a repo convention.**
  `Consultant Dietitian -> 29-1031` (src=02,08), `Consultant Nurse -> 29-1141` (src=08),
  `Consultant Physician -> 29-1229.02` (src=02), and discipline-specifically
  `Speech Correction Consultant -> 29-1127` (src=04,06). Cite these alongside the existing
  `Consultant Psychiatrist -> 29-1066` (high) row rather than arguing the grade from scratch.

**CORRECTION to the seventh run: bare `Clinical Specialist` is NOT a verbatim O*NET reported
title.** The seventh-run entry says it "*is* a verbatim O\*NET reported title — the only exact
match in the database — under 29-1141.04 Clinical Nurse Specialists". Checked across all
55,120 Alternate Titles rows, independently by both the author and the reviewer: the bare
string is **absent**, and only `Clinical Specialist Nurse` (29-1141.04, src=10) exists. The
mc-biomeng refusal of `Clinical Specialist` may still be right — the candidate spread and the
absence of any tiebreak are untouched — but **its stated basis is gone**, and it should be
re-argued from the spread rather than from an eligibility bar on an anchor that does not
exist. Note this run's `Clinical Specialist Speech & Language Therapist -> 29-1127` is not in
tension with the refusal either way: its head noun is verbatim (`Speech and Language
Therapist`, src=02).

**The `Research Assistant` family is split three ways across 26.82 points**, and the twelfth-run
"family does not exist" warning applies: `Research Assistant`, `Psychology Research Assistant`,
`Behavioural Research Assistant` -> 19-4061 (92.30), `Senior Research Assistant` -> **19-4021**
(70.78, medium, unanchored) and `Market Research Assistant` -> **13-1161** (97.60). Cite all
three legs. The discipline axis is what O*NET decides: 19-4061 carries `Psychologist Research
Assistant` (src=04), `Clinical Research Assistant` (src=02, incumbent), `Social`, `Sociology`,
`Political Science`, `Historian` and `Economic Research Assistant`; 19-4021 carries only
`Bacteriology`, `Biology` and `Medical Research Assistant`. Full candidate set for a bare
`Research Assistant`, enumerated so nobody re-derives it: 29-2012 (60.57, `Clinical Research
Assistant` src=09), 31-9099 (67.56), 17-3029 (68.23, src=06), 19-4021 (70.78, src=02), 19-4099
(74.33, src=06), 25-1191 (90.08 — today's 25-9044 reports `Research Assistant (RA)` src=02,04,10
and carries back on Felten's SOC 2010 vintage), 19-4061 (92.30, src=02,10), 43-9111 (96.72,
src=02), 15-2031 (96.96, src=10) — **spread 36.39**.

**`Speech Pathology Research Assistant -> 19-4061` is the row to re-review first** if anything
contradicts this cluster. It is the only non-`high` row, it sits over that three-way split, and
its downside gap is 31.73 to 29-2012 — **and because it is one of only 3 entry titles, a move to
19-4021 would shift the entry sub-mean by −7.17 against −1.54 on the 14-title record mean.**
Measure materiality against the sub-mean an entry title actually feeds, not only the record mean.

**Two pre-existing rows in this record are probably wrong and both need a row *edit*,** which
`crosswalk-add.py` cannot do (append-only, and it rejects an occupation already present):

- **`Clinical Educator -> 25-1072`** (75.92, medium) — 25-1072 is *Nursing* Instructors, and the
  note concedes it: "Hospital clinical educators are typically nurse educators". It is reported
  by exactly three records — **Bachelor of Oral Health, Master of Speech Pathology and Doctor of
  Physiotherapy** — none of them nursing, and 25-1071 (85.64) literally reports `Dental Hygiene
  Teacher`, `Speech Pathology Teacher` and `Physical Therapy Teacher`. It is the lowest row in
  mc-spchpth and 9.72 points below the better cell. This is the `Head Teacher -> 11-9039` shape.
- **`Senior Research Assistant -> 19-4021`** (70.78, medium) — unanchored, thinly noted, and
  22.02 points below its own base title `Research Assistant -> 19-4061` in violation of rule 3
  (`Senior` is seniority). Also `Head Teacher -> 11-9039` shaped.

**Next fresh clusters.** All parked programs unchanged (mc-ib, mc-softeng, mc-eleceng at one
refused title each; 274ab, mc-apling, mc-biomeng, mc-pubcom at two each — and mc-agsc now joins
them at three refused). `dfva:check` now names **Bachelor of Music (Performance) (15/15)**,
**Master of Cultural Materials Conservation (14/15)** and **Master of Landscape Architecture
(14/15)** as the most affected records; B-Music is a single-profession performance cluster of the
m04aa/mc-spchpth shape and is the obvious next batch. Then **742ab/mc-mgmtact** (13 each, sharing
`Graduate Accountant` and `Tax Accountant`, the only 2-program titles left besides the teaching
family), **mc-mtrneng** (13, inheriting the recorded 25.36-point `Field Service Engineer` fork),
**mc-engysys** and **mc-li** (13 each).

## Fifteenth run, 2026-08-18 — 13 applied, none overturned; 742ab cleared

`nextbatch 40` returned **23 previously refused/parked titles** before any live work. The batch
was the next complete cluster: **742ab (Master of Tax, n=57, Melbourne Law School)**, all 13
blockers. Blocking titles **114 → 101**, blocked programs **17 → 16**. Applied: `Tax Consultant`,
`Tax Accountant`, `Graduate Accountant`, `Senior Tax Accountant`, `Senior Tax Consultant`,
`Tax Specialist`, `Tax Advisor` (13-2011); `Tax Manager`, `Senior Tax Manager`, `Tax Director`,
`Group Tax Manager`, `Director - Tax Services` (11-3031); `Senior Tax Analyst` (13-2081). These
are the **first tax-titled rows in any of the three crosswalk files**. Record mean **98.37** over
13 titles; entry sub-mean 98.91 over 3.

The reviewer **overturned nothing** but found **12 factual errors in the notes**, all fixed
before applying — the seventh/thirteenth/fourteenth-run ratio again.

**The whole live candidate band for a tax record is 4.48 points wide** (13-2082 94.43 → 13-2011
98.91, with 23-1011 95.26, 11-1011 95.39, 13-2081 96.17, 13-2051 96.50, 13-2052 96.98,
11-3031 98.06 in between), because every tax occupation in Felten is high-exposure. Enumerated
so nobody re-derives it. Anchors, all verified in both flat-file layers: `Tax Consultant`,
`Tax Advisor`, `Tax Specialist` → 13-2082 (Sample layer **and** Alternate src 02,04,06);
`Tax Accountant`, `Tax Specialist` → 13-2011; `Tax Analyst`, `Tax Specialist` → 13-2081;
`Tax Manager`, `Tax Director` → 11-3031; `Tax Attorney`/`Tax Lawyer` → 23-1011;
`Tax Commissioner` → 11-1011. **Zero hits** for any seniority-, group- or executive-prefixed
tax title across all 55,120 Alternate Titles rows, so rule 3 governs every `Senior <X>` here.

### The 13-2082 override — the batch's one contested call, upheld

Four rows resolve to 13-2011 **against** a 13-2082 Tax Preparers anchor, moving the record mean
+1.38 (98.37 vs 96.99). It survived adversarial review, and the reasoning is worth reusing:

- **It rests on the definition, not on the title list.** O*NET Occupation Data gives 13-2082 as
  "Prepare tax returns for individuals or small businesses" against 13-2011's "...**give
  advice**..."; SOC 2010 additionally records an `Excludes "Accountants and Auditors" (13-2011)`
  clause on 13-2082 (O*NET's data file strips all Excludes sentences and bls.gov 403s automated
  fetches — cite it as reported, not as checked in-repo). 742ab's 12 employers are Big-4,
  mid-tier firms, the ATO, Commonwealth Treasury and SRO Victoria; its skills are Corporate Tax,
  International Tax, Tax Law. That is the recorded `Analyst -> 13-1111` move — reject a verbatim
  anchor whose definition is incompatible with the record — **not** an eligibility argument.
- **The "all 20 titles are individual-return practice" argument is FALSE and was struck.**
  13-2082 also carries `Corporate Tax Preparer` (src **02,04**) and `Tax Associate` (src 02,09).
  About 16 of 20, not all. A sweep claim about a title list is a spread claim in disguise.
- **The closest structural counter-precedent is `Financial Consultant -> 13-2052`** (fourth run,
  medium) — a verbatim src-02 anchor at a retail-flavoured code, honoured for a corporate-finance
  cohort. It fails to carry because 13-2052's definition is soft (advisory work, no client-class
  restriction, no Excludes clause) while 13-2082's restricts **both the task and the client
  class**. Cite this pair when arguing any future definition override.
- **O*NET's live 13-2082 page now lists `CPA (Certified Public Accountant)` and `Tax Accountant`
  as sample titles**, though the db_29_1 flat files do not. That drift *strengthens* the
  override — a code SOC formally excludes CPAs from now reports CPAs, so its title list is
  contaminated on exactly this boundary. But **scope every presence/absence claim to the flat
  file you actually checked**; two notes said "absent from 13-2082 at both layers" without it.

Five lessons worth keeping:

- **A compressed candidate band changes what a directional asymmetry means.** Positioned per row
  in its own candidate set this batch is **7 top / 5 second-from-top / 1 bottom** — worse than
  the eleventh run's mc-pubcom half on its face. It is not disqualifying *only* because the whole
  band is 4.48 wide and 7 of 13 rows are verbatim-anchored at the code they take. Contrast
  mc-pubcom, where the asymmetry rode on 22-point unanchored forks. **State the band width
  alongside the asymmetry, or the asymmetry cannot be interpreted.**
- **Count the unanchored rows, not the overrides.** The first draft disclosed four upward rows
  and missed a fifth: `Senior Tax Accountant` is unanchored and resolves to the top of a
  4-candidate set without overriding anything, so it did not look like part of the pattern.
- **A uniquely-src-02 string can be evidence for the code you are rejecting.** The draft's
  tiebreak for `Tax Specialist` was that 13-2011 "uniquely carries `Revenue Tax Specialist`
  (src 02)". True — and backwards: `Revenue Tax Specialist` names a revenue-authority role, i.e.
  evidence for **13-2081's** world, not for a Big-4 advisory record. Read what the anchoring
  string denotes, not just which code it sits under.
- **The "largest gap" claim was wrong twice in one batch, in both directions.** `Group Tax
  Manager` called its Δ11.47 the largest (the actual largest is Δ20.76 to 11-1021, rejected by
  `Tax Manager` and `Director - Tax Services`) and `Graduate Accountant` called its Δ10.53 the
  second-largest (it is 4th–6th). Sort the batch's rejected-alternative distances once, at the
  end, and read the ranking off it.
- **"Does not admit to legal practice" is the `Graduate Nutritionist` error.** The draft used it
  to reject 23-1011 for `Tax Advisor`. The MLS Master of Tax is routinely taken by admitted
  solicitors, so the degree's scope says nothing about the graduates' admission. The rejection
  survives on the two checkable legs: no law firm among the 12 employers, and 23-1011's tax
  strings are `Attorney`/`Lawyer`, never `Advisor`.

**Blast radius was clean for the second time in this task's history** — checked against
`job_titles.all` in all 141 records. Eleven titles are 742ab-only; `Tax Accountant` also reaches
BCom (Accounting) and Master of Management (Accounting), `Graduate Accountant` those two plus
BCom (Finance). All accounting/finance cohorts, so the 13-2011 reading holds in each and there is
no live conflict of the twelfth run's `Social Worker` / BA (Psychology) kind. Also verified: the
un-enumerated middle candidate that killed `Content Manager` does not exist here — **13-2099
(96.04) carries no tax string at either layer**. And the `Graduate <X>` convention recounts to
**31 of 33 testable pairs** (53 Graduate-prefixed rows across the three files; same two
exceptions), superseding the tenth run's 29/31.

**Next fresh clusters.** Parked programs unchanged (mc-ib, mc-softeng, mc-eleceng at one refused
title each; 274ab, mc-apling, mc-biomeng, mc-pubcom at two; mc-agsc at three). Live blocker
counts, measured this run: **mc-culmc 14**, **mc-larch 14**, **mc-mtrneng 13** (inheriting the
recorded 25.36-point `Field Service Engineer` fork), **mc-engysys 13**, **mc-li 13**,
**mc-mgmtact 11** (it shared `Graduate Accountant` and `Tax Accountant` with 742ab and dropped
13 → 11), **mc-teachpr 10**. Note **Bachelor of Music (Performance) (15/15)** is still what
`dfva:check` names as most affected but it is **not** a Wave 1 blocker and does not appear in
`unmapped` — the fourteenth run's "obvious next batch" suggestion would have unblocked nothing.

## Sixteenth run, 2026-08-18 — 11 applied, none overturned; mc-mgmtact cleared

`nextbatch 40` returned **23 previously refused/parked titles** before any live work. The batch
was the next complete cluster: **mc-mgmtact (Master of Management (Accounting), n=73)**, all 11
blockers. Blocking titles **101 → 90**, blocked programs **16 → 15**. Applied: `Accountant`,
`Financial Accountant`, `Management Accountant`, `Senior Accountant`, `Senior Financial
Accountant`, `Senior Management Accountant`, `Business Services Accountant`, `System Accountant`,
`Audit Graduate`, `Assistant Accountant` (all 13-2011 — the **first non-tax 13-2011 rows**, after
742ab's `Tax Accountant` family); `Accounts Assistant` (**43-3031**). Record mean **97.99** over
15 titles; entry sub-mean 95.40 over 3.

The reviewer **overturned nothing** but found **11 factual errors**, four of them load-bearing
enough that the note's stated basis had to be replaced even though the SOC stood. Same
seventh/thirteenth/fourteenth/fifteenth-run ratio.

### `Alternate Titles.txt` is O\*NET-SOC **2019**-keyed — a SOC-2010-only code returns ZERO rows

**This is the run's most important finding and it invalidates a whole class of argument.** The
twelfth run introduced the flat-file grep as the reported-title test; it did not record that the
file's key is the *current* taxonomy while Felten is SOC 2010. Row counts: **15-1121 → 0,
15-1132 → 0, 15-1199 → 0, 25-1191 → 0**, against 15-1211 → 96, 15-1212 → 83, 15-1252 → 134.

So "code X has zero rows in the flat file, therefore X is unanchored" is **false for every
SOC-2010-only code**, and by the thirteenth run's own `13-2054` fold-back logic the successor's
titles anchor the predecessor. This run's `System Accountant` note first rejected 15-1121 "on
availability as well as fit"; 15-1121 is in the 774, was always live, and is in fact **anchored**
via 15-1211's `Information Systems Auditor (IS Auditor)` (src=09) and `IT Auditor` (src=10). The
row was rebuilt as an anchor-vs-anchor call and stands, but note the trap: this is the eighth
run's finding (a modern parent too new to use) inverted into the flat file itself.

### The noun-order split — `Assistant Curator` is the precedent, and the eleventh run's family claim is wrong

| Claim | Status |
| --- | --- |
| `Assistant Editor` / `Editorial Assistant` governs the `Assistant <X>` vs `<X> Assistant` split | **No.** Its recorded holding is anchor-vs-**no**-anchor. Where neither string is anchored — as here — it does not reach. |
| The `<Noun> Assistant` family "takes the SUBORDINATE code" (eleventh run) | **Overstated, and it is the `Curatorial Assistant` cherry-pick warning applied to itself.** The family runs both ways: `Marketing Assistant → 13-1161`, `Research Assistant → 19-4061`, `Curatorial Assistant → 25-4012`, `Planning Assistant → 19-3051` are all *professional*, against `Gallery`/`Museum Assistant → 25-4013`, `Legal Assistant → 23-2011`, `Architectural Assistant → 17-3011`, `Teaching Assistant → 25-9041`, `Music Therapy Assistant → 31-9099`. Cite the flat file, not the family. |
| `Assistant <Profession>` takes the profession's own SOC | **Holds 8-for-8 in the crosswalk**: `Assistant Planner` and `Assistant Town Planner → 19-3051`, `Assistant Psychologist → 19-3031`, `Assistant Valuer → 13-2021`, `Assistant Curator → 25-4012`, `Assistant Property Manager → 11-9141`, `Assistant Project Manager` and `Assistant Development Manager → 11-9021`. |

**The governing precedent for a noun-order split is `Assistant Curator → 25-4012` (81.16) against
`Gallery Assistant` / `Museum Assistant → 25-4013` (61.43)** — the identical split, one domain,
already shipped at **Δ19.73**, nearly twice this batch's 10.53 fork. Cite it instead.

Also durable: only **39** `Assistant <X>` strings exist in the whole 55,120-row file; **36** are
`Assistant Professor` plus `Assistant Teaching Professor` (25-1043), all filed at the professorial
code, i.e. O\*NET reads the prefix as rank. Outside the academic ladder the file holds exactly
**two** data points and they split **1–1** — `Assistant Cook → 35-2019` (src=09) for the rank
reading, `Assistant Oceanographer → 19-4099` (src=08) against it, versus `Oceanographer → 19-2042`.
A draft that quoted "37 of 39, sole counter-instance 1 of 39" was inflating a 1–1 split.

### Four more lessons worth keeping

- **`<X> Graduate` (suffix) is a DIFFERENT family from `Graduate <X>` (prefix), and the recorded
  31-of-33 figure does not cover it.** `Audit Graduate` was first argued on the prefix
  convention. The suffix family is **14 rows** — `Finance`, `Marketing`, `Law`, `IT`, `Actuarial`,
  `Architecture`, `Property`, `Technology`, `Sustainability`, `Science and Planning`, `Land
  Planning and Environment`, `Product Developer`, `Information Technology`, `Technology Solutions`
  Graduate — and **every one takes its discipline's professional SOC**. That is the stronger
  citation anyway.
- **The 742ab 13-2082 override does NOT carry to an SME-practice record.** It rested partly on
  13-2082's *client-class* restriction ("individuals or small businesses") against a Big-4 /ATO/
  Treasury corporate-tax cohort. mc-mgmtact's mid-tier firms (William Buck, HLB Mann Judd, McLean
  Delmo Bentleys, Moran, LGY) **are** SME practices, so that leg is unavailable and the note had
  to be rebuilt: all 20 of 13-2082's reported titles are `Tax <X>` strings and **none is an
  `<X> Accountant`**, against 23 such strings at 13-2011 — the head noun decides it — plus the
  record's own `Tax Accountant → 13-2011` sibling, which a merely-tax-adjacent title cannot sit
  below. **Check whether an override's legs survive the new record before reusing it.**
- **Measure an entry title against the entry sub-mean** (the fourteenth run's rule, missed again
  here). Both `Assistant Accountant` and `Accounts Assistant` are entry titles in a 3-title entry
  tier: the 10.53 fork is worth 0.70 on the 15-title record mean and **3.51** on the sub-mean it
  actually feeds.
- **A concentrated batch still needs the per-row asymmetry disclosure, and it needs the band
  width beside it.** Ten of eleven rows land on 13-2011, which is the m04aa/277aa shape and not a
  defect; two are verbatim-anchored and are not judgement calls at all. Of the **nine unanchored
  rows: 5 top / 3 second / 1 bottom**, resolving upward — but six sit in bands ≤2.41 wide where
  the call is immaterial, and only three carry real exposure (`Assistant Accountant` 10.53,
  `Business Services Accountant` 10.35, `System Accountant` 6.76). If every unanchored row took
  its floor the record mean would fall **97.99 → 95.07**.

**Nothing was refused this run** — the first batch in this task's history with no refusal, because
every title was a `<Qualifier> Accountant`, a seniority form, or one side of a noun-order pair, and
the whole professional band is 1.68 wide (13-1111 97.73 → 13-2031 99.41).

**`Accounts Assistant → 43-3031` is the row to re-review first** if anything contradicts this
cluster. It is the batch's only downward row, the lowest of four candidates, and it splits from
`Assistant Accountant` by 10.53 on noun order alone. It is defensible because it is anchored four
ways (`Accounting Assistant` src=02,10; `Accounting Associate` src=02,10; `Accounts Receivable
Assistant` src=02,04; `Accountant Assistant` src=09) while 13-2011 carries **no** assistant string
of any kind — the `Editorial Assistant` shape with the sign flipped.

**Blast radius clean for the third time** — checked against `job_titles.all` in all 141 records.
Four titles reach beyond mc-mgmtact (`Accountant`, `Management Accountant`, `Senior Accountant`,
`Assistant Accountant`), all into **Bachelor of Commerce (Accounting)** (n=1693, same faculty,
Big-4 employers, accounting skills) and no third record. No conflict of the twelfth run's
`Social Worker` / BA (Psychology) kind. BCom (Accounting) also **corroborates** the contested row:
it files `Assistant Accountant` at early_mid directly beside `Junior Accountant`, so that cohort
uses the two prefixes interchangeably as grades.

**Next fresh clusters.** Parked programs unchanged (mc-ib, mc-softeng, mc-eleceng at one refused
title each; 274ab, mc-apling, mc-biomeng, mc-pubcom at two; mc-agsc at three). `dfva:check` still
names **Bachelor of Music (Performance) (15/15)** as most affected, but it is **not** a Wave 1
blocker and does not appear in `unmapped` — do not take that bait, the fourteenth run already did.
The live sets are **mc-culmc 14**, **mc-larch 14**, **mc-mtrneng 13** (inheriting the recorded
25.36-point `Field Service Engineer` fork), **mc-engysys 13**, **mc-li 13**, **mc-teachpr 10**
(but **4** of its 10 — `Teacher`, `Classroom Teacher`, `Casual Relief Teacher`, `English Teacher` —
are the teaching-family titles refused since the first run, so it cannot clear until the crosswalk
key carries the program; note `English Teacher` blocks mc-teachpr as well as mc-apling, which the
first-run entry does not say).

## Seventeenth run, 2026-08-18 — 13 applied, none overturned; mc-engysys cleared

`nextbatch 40` returned **23 previously refused/parked titles** before any live work, unchanged.
The batch was the next complete cluster: **mc-engysys (Master of Energy Systems, n=61, Faculty of
Engineering & IT)**, all 13 blockers, every one reported by mc-engysys alone. Blocking titles
**90 → 77**, blocked programs **15 → 14**. Applied: `Energy Market Analyst`,
`Graduate Market Analyst` (19-3011); `Graduate Environmental Officer`,
`Energy Planning and Climate Change Analyst` (19-2041); `Energy Systems Analyst`,
`Energy Consultant`, `Energy Systems Consultant`, `Senior Energy Consultant`,
`Energy sustainability Consultant`, `Energy Specialist` (13-1199 — the **first 13-1199.05
Sustainability-Specialist-anchored rows** in any crosswalk file);
`Business Analyst - Energy & Greenhouse`, `Senior Analyst - Emerging Technologies and Asset P`
(13-1111); `Senior Policy Officer - Energy Transition` (19-3094). Record mean **91.16** over 14
titles; entry **90.56**/5, early_mid **90.24**/5, mid_senior **93.07**/4.

Two reviewers ran, one on SOC choice and one on the notes. **Nothing was overturned** — the fifth
clean sweep — and **nothing was refused**, the second batch in this task's history with no refusal.
Between them they found **20+ factual errors**, four load-bearing enough to rebuild the stated
basis, all fixed before applying. Same seventh/thirteenth/fourteenth/fifteenth/sixteenth-run ratio.

### There was NO energy family in the crosswalk — this batch creates it

Checked across all rows of all three files: **zero existing occupations contain the string
"energy"**. Every "follows precedent" claim available here is borrowed from the environmental,
sustainability or policy families. Treat these 13 rows as the founding cases, not as applications.

### The batch is one judgement made thirteen times, and per-row Δs conceal that

This is the run's most important finding. Positioned per row in its own candidate set: **5 top /
5 second / 2 middle / 1 floor**, and **not one of the eight anchor-overrides moves downward**
(47-4011 ×4, 41-4011 ×3, 17-2199 ×1). If every overridden or unanchored row took its floor the
record mean falls **91.16 → ~80**, about 11.5 points of one-directional headroom.

The asymmetry is **structural, not manufactured**, and that is the useful way to state it. O*NET's
only literal "energy" homes are a building-inspection detail code (47-4011.01, broad = **70.42**),
a solar-sales detail code (41-4011.07, **84.84**) and an engineering-all-other detail code
(17-2199.03, **82.37**). Every analytic or advisory reading lands in a compressed top band —
13-1111 97.73, 13-1161 97.60, 19-3094 97.41, 19-3011 97.05, 15-2031 96.96, 19-3051 92.85,
13-1199 88.56, 19-2041 87.77. So the direction is not a per-row choice at all: **the whole 11.5
points rest on the single proposition that these are analytic/advisory roles rather than
engineering, inspection or sales roles. If that is wrong it is wrong ten times in the same
direction, and no per-row Δ discloses the correlation.** State the correlation explicitly in any
future batch whose candidate band splits this way.

Three things carry the proposition, all counted rather than asserted: the cohort is **13
analyst/consultant/officer/specialist titles against one `Graduate Engineer`**; the employers are
dominated by market and policy bodies (AEMO, DEECA, Cornwall Insight Australia, Market Reform,
Energetics, Clean Energy Council) with the manufacturers a minority; and the four largest
overrides discharge against **broad-code** definitions (`Construction and Building Inspectors`;
`Engineers, All Other`), which is the stronger form of the 13-2082 argument, not the weaker one.

### Two incompatible provenance standards inside one batch — the error to hunt for next time

The draft discounted 17-2199.03's `Energy Market Analyst` **because** it is src=10, then three rows
later called 47-4011.01's `Energy Specialist` src=08 "the weakest provenance in the file". Per the
legend this task runs on (twelfth run) **02 = incumbent is strongest and 10 = employer postings is
weakest**; 08 is a mid tier and is the file's second most common token (16,132 occurrences). Each
standard was deployed exactly where it favoured the pick. There is no recorded ranking beyond
02 and 10 — **do not invent one**, and check that a batch applies whatever it does use in both
directions.

### Anchor evidence that is not distinguishing, three times in one batch

A note cited a string as evidence for its pick while the **rejected** code carried the same string,
sometimes with wider provenance. This is a new failure class, adjacent to inventing a presence:

- `Energy Analyst` is **dual-homed** — 13-1199.05 (src=10) *and* 47-4011.01 (src=**03**,10).
- `Renewable Energy Consultant` — 13-1199.05 (src=08) *and* 47-4011.01 (src=10).
- `Energy and Sustainability Manager` — 11-1011.03 (src=02,10) *and* 13-1199.05 (src=10). Here the
  overlap **helped** and the draft missed it: O*NET files the near-exact compound in the chosen
  detail occupation, which is a better argument than the seniority one the draft used.

**Before citing a string as evidence for a code, grep the string and check what else holds it.**
Relatedly, on density of pattern-anchoring 47-4011.01 beats 13-1199.05 outright for this record —
eight energy `<X> Consultant` strings against four — so the consultant rows are overrides against
the *denser* title list and survive only on the broad-code definition.

### Durable facts, so nobody re-derives them

- **Occupation names the drafts got wrong:** 17-2199.03 is `Energy Engineers, **Except Wind and
  Solar**`; 41-4011.07 is `Solar Sales Representatives **and Assessors**`; 19-2041.01 is
  `Climate Change **Policy** Analysts`; 11-1011.03 is `Chief Sustainability Officers`;
  19-2041.03 is `Industrial Ecologists`; 17-2199.11 is `Solar Energy Systems Engineers`.
  The 19-2041.01 slip was load-bearing — the draft rejected 19-3094 as "the policy-analysis
  reading" when the code it chose *is* the policy-analysis occupation.
- **47-4011.01's definition** is "Conduct energy audits of buildings, building systems, or
  **process systems**. May also conduct **investment grade audits**" — not "building
  commissioning", and the process-systems clause is the one nearest to energy-systems work.
- **17-2199.03's summary statement** scopes the work to "during the designing, building, or
  remodeling stages of construction" but its specialisation list includes **"energy procurement"**,
  and its 25 titles include five generation/grid strings (`Smart Grid Engineer`,
  `Hydroelectric Plant Power Generation Engineer`, `Hydrogen Power Plant Engineer`,
  `Photovoltaic Power Systems Engineer`, `Energy Infrastructure Engineer`). The 24-of-25
  Engineer/Designer sweep is real — `Energy Market Analyst` is the sole exception, and it is the
  **only row in all 55,120 containing "Energy Market"** — but the list is broader than an
  efficiency-design reading admits. Say so.
- **Bare `Systems Analyst` is reported by SEVEN codes**, not the two an earlier draft gave:
  15-1211 (src=02,10), 15-1212 (02), 15-1252 (08), 15-1253 (08), 15-2031 (04,06), **17-3027
  Mechanical Engineering Technicians (08, Felten 60.76)** and 19-1029.01. The non-IT reading
  exists and sits 27.80 below 13-1199 — reject it on level, not on the sense of "systems".
- **Bare `Analyst` is unanchored at 13-1111.** It sits at 13-1051, 13-2051 and 13-2054, all src=02,
  never 13-1111. The whole `Analyst`/`Senior Analyst`/`Junior Analyst` → 13-1111 chain follows an
  override, not an anchor. Do not cite it as anchored.
- **Bare `Business Analyst` is reported by THREE codes**, not two: 13-1111.00 (src=02,04,06,08,10),
  15-2031.00 (10) and **15-2051.01 Business Intelligence Analysts (src=01,02,10)**, which folds to
  SOC-2010 15-1199 (92.97).
- **`Policy Officer` is a FIVE-way tie inside 0.45**, all src=09: 15-2031 (96.96), 19-3032 (97.02),
  19-3011 (97.05), 19-3041 (97.22), 19-3094 (97.41).
- **src=02,04,06,08,10 is not "the widest provenance available"** — 165 rows carry ≥5 sources, 12
  carry ≥6, and `Network Analyst` (15-1241.00) carries seven. It is joint-widest, and only that.
- **Exactly five rows in the whole file begin with `Senior `** (`Senior Adults Director` 21-2021,
  `Senior Air Director` 55-1015, `Senior All-Source Intelligence Analysis Officer` 55-1019,
  `Senior Enlisted Damage Control…` and `Senior Naval Parachutist` 55-2013). Rule 3 governs every
  `Senior <X>` unopposed — but say "five, none of them relevant", not "zero".
- **`Environmental Officer` returns zero rows** on exact match *and* substring across all 55,120.
  That absence claim is verified, not invented.
- **`Graduate <X>` recounts to 32 of 34 testable pairs** on the crosswalk as it stood then — superseded
  by the eighteenth run's fresh count of **33 of 35** (55 Graduate rows, 35 with a base row). (54 Graduate rows,
  34 with a base row present), superseding the fifteenth run's 31 of 33. Same two exceptions:
  `Graduate Nutritionist` and `Graduate Project Manager`.
- **The recorded reason for refusing `Family Violence & Review Officer` is the 23.04-point spread
  with the record pulling both ways and no tiebreak.** Unparseability is an *additional* clause.
  A draft cited it as the deciding one; it is not, and a future batch cannot lean on "the
  truncation was the deciding part" as if that were the holding.
- **The `<Domain> Consultant` re-pointing behaviour is an observed pattern, not the recorded
  qualifier rule.** Nine rows re-point off bare `Consultant → 13-1111` (`Environmental`,
  `Sustainability` → 19-2041; `Ecological` → 19-1031; `Agricultural` → 19-1013; `Economic` →
  19-3011; `Marketing` → 13-1161; `Recruitment` → 13-1071; `Legal` → 23-1011; `Technology` →
  15-1121). The recorded rule's test is whether the qualifier **names an occupation** — cite the
  rows, not a broadened paraphrase of the rule.

**Blast radius clean for the fourth time** — checked against `job_titles.all` in all 141 records.
All 13 titles are mc-engysys-only; no second record reports any of them, so there is no conflict of
the twelfth run's `Social Worker` / BA (Psychology) kind.

**Re-review order if anything contradicts this cluster.** (1) `Senior Analyst - Emerging
Technologies and Asset P` — the batch's top pick, Δ15.36 to 17-2199, truncated, unanchored, and
following a parent row that is itself an override; network "asset planning" at Transpower or AEMO
is a live engineering reading. (2) `Energy Specialist` — highest of four candidates and the **only
unanchored one**, with a live counter-reading the draft cited backwards: at Tesla, in this
record's own employer list, `Energy Specialist` is a customer-facing solar sales title, i.e.
41-4011.07 exactly, 3.72 away. (3) `Energy Systems Analyst` — its lead evidence (`Energy Analyst`)
is held with wider provenance by the code it rejects.

**Next fresh clusters.** Parked programs unchanged (mc-ib, mc-softeng, mc-eleceng at one refused
title each; 274ab, mc-apling, mc-biomeng, mc-pubcom at two; mc-agsc at three; mc-teachsa at three,
all teaching-family). Live sets measured this run: **mc-li 13**, **mc-culmc 14**,
**mc-larch 14**, **mc-mtrneng 13** (CORRECTED: the seventeenth run wrote "now 4 remaining", which was wrong — the
set was 13, unchanged since the thirteenth run; it inherits the recorded 25.36-point
`Field Service Engineer` fork — the cheapest next win), **mc-teachpr 6** live of 10 but it still
cannot clear while `Teacher`, `Classroom Teacher`, `Casual Relief Teacher` and `English Teacher`
stay refused. `dfva:check` still names **Bachelor of Music (Performance) (15/15)** as most
affected; it is **not** a Wave 1 blocker and does not appear in `unmapped` — do not take that bait.

## Eighteenth run, 2026-08-18 — 13 applied, TWO overturned; mc-mtrneng cleared

`nextbatch 40` returned the same **23 previously refused/parked titles** before any live work, unchanged
for the third run running. The batch was the next complete cluster: **mc-mtrneng (Master of
Mechatronics Engineering, n=18, Faculty of Engineering & IT)**, all 13 blockers, every one reported
by mc-mtrneng alone. Blocking titles **77 → 64**, blocked programs **14 → 13**, fully-mappable
holdout programs **39 → 40**. Applied: `Mechatronics Engineer`, `Graduate Mechatronics Engineer`,
`Mechatronics Engineer (Research & Development)`, `Automation Engineer`,
`Industrial Automation Engineer`, `Senior Control Engineer`, `Manufacturing Quality Engineer`,
`Graduate Systems Engineer`, `Remote Service Engineer` (all 17-2199 — the **first mechatronics,
automation and robotics-adjacent rows** in any crosswalk file); `Field Service Engineer` (17-2141);
`Satellite Communications Engineer` (17-2072); `Data and Integration Analyst` (15-1121);
`Engineering Technologist` (**17-3029** — the first 17-30xx technician-tier row in the extension
file). Record mean **83.23** over 15 titles; entry 82.37/2, early_mid 84.35/10, mid_senior 81.40/3.

Two reviewers ran, one on SOC choice and one on the notes. **Two rows were overturned** — the first
batch since the twelfth run with any overturn, and the first ever with two — and between them the
reviewers found **24 factual errors**, twelve load-bearing. **Nothing was refused**, the third batch
in this task's history with no refusal.

### The SOC-2019 fold-back trap has a second, worse form: a code RENAMED to absorb its rivals

The sixteenth run recorded that a SOC-2010-only code returns zero rows in `Alternate Titles.txt`.
This run found the inverse and it is more dangerous, because it returns *plausible* rows.
**`Engineering Technologist` was proposed at 17-3023 (71.98) and overturned to 17-3029 (68.23).**
In SOC 2010 every engineering-technologist occupation lived under **17-3029**: `.02` Electrical
Engineering Technologists, `.03` Electromechanical, `.04` Electronics, `.05` Industrial, `.06`
Manufacturing, `.07` Mechanical, `.11` Nanotechnology. SOC 2018 dissolved them into the discipline
codes and **renamed those codes "Technologists *and* Technicians"** — so the string now surfaces at
17-3023.00 (src=02), 17-3027.00 (src=02) and 17-3026.00 (src=08), three codes that in 2010 held
technicians only.

The draft read those three as three competing disciplines and disclosed an "11.22-point coin flip"
between 17-3023 and 17-3027. **There was no coin flip: all three fold back to the same SOC-2010
code.** The draft also called all four anchors "technician codes" using their SOC-2010 titles while
reasoning from their SOC-2019 anchors — inverted, since the rename is precisely what absorbed the
technologists. Convergent check: `Mechatronics Technologist` (17-3024.00, src=04), the only
mechatronics-specific technologist string in all 55,120 rows, was 17-3029.03 in SOC 2010 and folds
to 17-3029 too. **Whenever an anchor sits at a 17-30xx or "X and Y" compound code, check whether the
2018 rename merged a `.xx` from elsewhere before treating co-located anchors as rivals.**

### Falling back to a generic is only legitimate when the specific string is UNANCHORED

**`Field Service Engineer` was proposed at 17-2199 (82.37) and overturned to 17-2141 (87.54).**
The draft invoked the qualifier rule — "Field" names a location, not an occupation, so follow the
generic `Service Engineer → 17-2199`. The reviewer's kill is correct and worth stating as a rule:
**the qualifier rule reaches an unanchored compound only.** `Field Service Engineer` is verbatim at
**eight** Felten-reachable codes spanning **27.42–95.50** (17-2011 95.50/08, 17-2061 90.81/**02**,
17-2141 87.54/04,06, 17-3026 78.15/08, 49-9061 64.91/04,06,08, 49-2011 55.37/**02**, 43-5041
40.44/10, 47-5071 27.42/10) — and **17-2199 is not among them**. Taking an unanchored residual over
eight anchored codes is the `Family Support Worker → 21-1093` failure mode exactly. The draft had
listed only six of the eight and stated the band as 40.13 wide when it is 68.08.

The winner discharges on definition, not on cohort feel: SOC-2010 17-2141's definition says "Oversee
installation, operation, maintenance, and repair of equipment", the same double anchor that decided
the existing `Equipment Engineer → 17-2141` row. Note the resulting **5.17 split from
`Remote Service Engineer` (17-2199)** is correct and not an inconsistency — `Remote Service` returns
zero rows, so the generic governs there and the anchor governs here. That is the settled
anchor-governs-where-one-exists resolution.

### An exact-match grep on `Alternate Title` misses every row O\*NET writes with a parenthetical

**A reviewer charged that `Radio Frequency Engineer` was a fabricated anchor — "zero rows in the
entire file". It is not fabricated.** The field reads `Radio Frequency Engineer (RF Engineer)`, and
it is real at 17-2072.00 with **src=02,10**. O\*NET's house style writes `Full Title (Acronym)` or
`Acronym (Full Title)`, so an `==` comparison on column 2 silently drops them. The same trap sits
under a claim this run *did* get right by luck: 49-9062's string is
`Field Service Technician (Field Service Tech)`, invisible to exact match. **Every absence claim in
this task must be made with a substring grep, not an exact match** — the twelfth run's recorded
`awk -F'\t' 'tolower($2)==tolower(s)'` one-liner is exactly the wrong tool for proving absence, and
it has been the recommended one since. It is fine for proving presence.

This cuts both ways and is the reason to keep two reviewers: the SOC reviewer's finding on
`Engineering Technologist` was decisive and correct, and its finding on the RF anchor was wrong in
the same report. **Verify an overturn before accepting it**, the same way a proposal is verified.

### The correlated direction — and why it survives where mc-engysys's had to be confessed

Nine of thirteen rows land on 17-2199 (82.37), which prices below every named engineering discipline
except 17-2072 and 17-2121. Per row in its own candidate set the batch runs heavily **downward** —
17-2199 is at or near the floor for `Automation Engineer`, `Manufacturing Quality Engineer`,
`Graduate Systems Engineer` (the floor outright, of a ten-code set spanning 51.75–95.50),
`Remote Service Engineer` and `Data and Integration Analyst`. If all nine took their nearest
discipline alternative (17-2141, +5.17) the record mean would rise **83.23 → ~86.3**: about **3.1
points of one-directional headroom**.

But unlike the seventeenth run's 11.5 points, this concentration is **checkable rather than
arguable**. SOC 2010 filed mechatronics, robotics, microsystems, validation and manufacturing
engineering as detail occupations *under 17-2199*; there was no other home. Seven of the nine rest
on a verbatim alternate title at 17-2199.05/.06/.08, most at src=02. It is the taxonomy's own
placement, not a reading of the cohort.

**The residual risk is one of grain, and nothing in this task can fix it.** 82.37 is Felten's score
for the *whole* of SOC-2010 17-2199 — mechatronics and robotics averaged in with photonics,
nanosystems, wind and solar energy engineers. If that broad score under-represents mechatronics,
all nine rows carry the identical error in the identical direction. Record it as one correlated
exposure, not nine independent calls.

### Durable facts, so nobody re-derives them

- **`Automation Engineer` is verbatim at ELEVEN codes**, and only 17-2199.05 and 17-2199.08 carry
  src=02; every rival is src=08 or 09. Around it, 17-2199.05 holds `Automation Designer` (src=02)
  and `Automation Application Engineer`, 17-2199.08 holds `Factory Automations Engineer` (src=02) —
  while **17-2112.00 Industrial Engineers carries no automation string of any kind**. Its rival band
  is NOT all within 10, as a draft claimed: 17-2041 (+13.19), 17-2011 (+13.13) and 15-1252's second
  fold 15-1133 (+11.81) are all over the line.
- **`Systems Engineer` has FOUR rivals more than 10 above 17-2199, every one src=02** — 17-2011
  (+13.13), 13-1081 Logisticians (+12.14), 15-1133 (+11.81), 15-1199 via 15-1299.08 (+10.60), plus
  17-2141 at src=02,10 (+5.17). A draft disclosed two. 17-2011 nonetheless dies on content: its 68
  alternate titles are Aerodynamicist, Aircraft Design Engineer, Flight Test Engineer, Propulsion
  Engineer, Wind Tunnel Engineer — **no satellite, space-systems or defence-electronics string** —
  so the Thales/QinetiQ/DSTG employer list does not reach it.
- **17-2199.05 carries SIX controls strings**, three at src=02: `Control Systems Engineer` (02,08),
  `Process Controls Engineer` (02), `Controls Engineering Specialist` (02), `Control Integration
  Engineer`, `Electro-Mechanical Systems Control Engineer`, `Mechanical Systems Control Engineer`.
  Bare `Control Engineer` is exact at **27-4012 Broadcast Technicians only** (66.52, src=04,06) —
  the master-control sense. Reject it on density, not on employer mix.
- **`Research and Development Engineer (R and D Engineer)` is at FIVE codes at src=02** — 17-2072,
  17-2112, 17-2141 (as `R&D Engineer`, src=02,10), 17-2199.05 and 17-2199.07. It is **not
  distinguishing**; cite it only to show an R&D parenthetical is neutral.
- **`Quality Engineer` is also at 15-1253.00 (src=02,08)**, whose folds include 15-1199 at 92.97 —
  10.60 above 17-2199, a software-QA reading a draft missed entirely.
- **`Service Engineer` at 17-2199.00 (src=04,06) is NOT distinguishing**: 17-2071 holds the
  identical string at the identical src=04,06 and sits 8.08 above; 17-2011 holds it at src=10.
- **Only THREE rows in the file contain `Satellite Communications`** — 49-2022 ×2 (src=08, 10) and
  27-4099 (src=04, not in the 774). A draft said 49-2097 also held them; **49-2097 holds zero**.
  17-2011 Aerospace reports **no satellite string anywhere**.
- **17-2072's SOC definition does NOT name telecommunications** — that sits in a downstream task
  statement. And the rejected rival is stronger than it looks: 15-1143's anchor **15-1241.01 is
  titled `Telecommunications Engineering Specialists` outright** and holds `Communications Engineer`
  at src=02,10 against 17-2072's src=04,06. The 2.03 gap is why this survives; on a wider gap it
  would not have.
- **`RF Systems Engineer` is at 17-2072.01 = Radio Frequency Identification Device Specialists
  (src=10)** — the RFID sense, not the satellite-link sense. It folds to 17-2072 but is not evidence
  for it.
- **15-1243.00 has TWO folds with no priority between them** — 15-1141 Database Administrators and
  15-1199.06 Database Architects; 15-1243.00's own 2019 title is *Database Architects*, so calling
  15-1141 "the primary fold" is unfounded.
- **`Graduate <X>` recounts to 33 of 35 testable pairs** (55 Graduate rows, 35 with a base row
  present), superseding the seventeenth run's 32 of 34. Same two exceptions.
- **The `Alternate Titles.txt` file is 55,120 DATA rows** (55,121 lines including the header). The
  figure recorded at line 686 as 55,025 was stale and has been corrected.
- **The forward-risk note on `Field Service Engineer` was left by the SEVENTH run, not the ninth**,
  and the seventeenth run's "mc-mtrneng, now 4 remaining" was **wrong** — the set was 13, unchanged
  since the thirteenth run. Both corrected in place.

**Blast radius clean for the fifth time** — checked against `job_titles.all` in all 141 records. All
13 titles are mc-mtrneng-only; no second record reports any of them.

**Re-review order if anything contradicts this cluster.** (1) `Engineering Technologist → 17-3029` —
the batch's largest single exposure at 14.14 to 17-2199, because in Australia the title is **ANZSCO
233914, Unit Group 2339 Other Engineering Professionals, indicative Skill Level 1**, i.e. a
professional rather than a technician. That reading is verified as an ANZSCO fact and has zero
O\*NET anchor, so "a verbatim anchor governs" decides it — but it is a live disagreement, not a
settled one. (2) `Graduate Systems Engineer` — the floor of a ten-code set with four src=02 rivals
over 10 points above, held only for consistency with the existing base row. (3)
`Satellite Communications Engineer` — an override against better-sourced evidence at 15-1241.01,
surviving on a 2.03 gap.

**Next fresh clusters.** Parked programs unchanged (mc-ib, mc-softeng, mc-eleceng at one refused
title each; 274ab, mc-apling, mc-biomeng, mc-pubcom at two; mc-agsc at three; mc-teachsa at three,
all teaching-family). Live sets measured this run: **mc-li 13**, **mc-culmc 14**, **mc-larch 14**,
**mc-teachpr 6** live of 10 but it still cannot clear while the four teaching-family titles stay
refused. **mc-culmc (conservation) and mc-larch (landscape architecture) are now the only two
single-profession clusters left**, and both are what `dfva:check` names as most affected; either is
the obvious next batch. `dfva:check` still also names **Bachelor of Music (Performance) (15/15)**,
which is **not** a Wave 1 blocker and does not appear in `unmapped` — do not take that bait.

## Nineteenth run, 2026-08-19 — 13 applied, ONE refused; mc-larch NOT cleared (1 blocker left)

`nextbatch 40` returned the same **23 previously refused/parked titles** before any live work, unchanged
for the fourth run running. Batch was the complete **mc-larch (Master of Landscape Architecture, n=38,
Faculty of Architecture Building & Planning)** cluster, all 14 blockers, every one reported by mc-larch
alone (checked against `job_titles.all` in all 141 records — **blast radius clean for the sixth time**).
Blocking titles **64 → 51**, blocked programs **13 → 13**, fully-mappable holdout programs **40 → 40**.
Applied: `Graduate/Assistant/Senior/Freelance Landscape Architect`, `Principal Landscape Architect
(Acting)`, `Landscape Planner`, `Landscape Designer`, `Garden Designer`, `Urban Designer/ Landscape
Architect`, `Senior Urban Designer/ Landscape Architect` (all 17-1012 — the first landscape-architecture
rows beyond the single existing `Landscape Architect` row); `Landscape Assistant`, `Landscape Technician`
(**17-3011**, the first architectural/civil-drafter rows in the extension file); `Senior Open Space
Planner` (19-3051). Record mean **88.20** over 14 mappable titles of 15.

Two reviewers ran, one on SOC choice and one on the notes. **Nothing was overturned**; `Design Assistant`
was **REFUSED**. Between them the reviewers found **12 factual errors, 7 load-bearing**, in a draft that
had been written against the eighteenth run's warnings — the error rate is not falling.

### mc-larch did NOT clear, and the SOC reviewer said it did — refusals do not shrink the denominator

The reviewer refused `Design Assistant` and wrote "13 titles remain; mc-larch still clears", computing a
record mean of 88.20 as if the refused title were dropped from the average. **That is the exact statistic
`panelAFor()` refuses to compute.** A refused title stays *unmapped*, and one unmapped title blocks the
whole program — mc-larch went 14 blockers → 1 and is now parked beside mc-eleceng, mc-ib and mc-softeng.
Reviewers reason about *rows*; the gate is about *programs*. **Never accept a reviewer's "still clears" —
re-derive it from `nextbatch`.**

### `Design Assistant` — refused, and the reason generalises

Rule 5's real test is whether the program's discipline fixes the **occupation**, not the **domain**.
Landscape Architecture fixes the domain of `Design Assistant` and leaves the function open across
17-3011 (85.60), 17-1012 (88.25), 27-1025 (90.33) and 27-1024 (80.66) — the `Assistant Language Teacher`
shape exactly. Note the band is only 9.67 wide, so this refusal is **not** justified by materiality; it is
justified because the crosswalk is keyed on title alone and a bare `Design Assistant` row would later be
served to any fashion, graphic or interior cohort that reports the string. Currently mc-larch-only.

### The crosswalk's `Assistant` precedent is 6-for-6, not 8-for-8 — and five cited rows do not exist

The single most reusable finding of this run. SKILL.md line 1112 and the shipped `Accounts Assistant`
note both state the `Assistant <Profession>` family "runs 8-for-8" and name the supporting rows. **Only
six `Assistant `-prefixed rows exist** — `Assistant Planner` (19-3051), `Assistant Project Manager`
(11-9021), `Assistant Director` (19-3094), `Assistant Curator` (25-4012), `Assistant Editor` (27-3041),
`Assistant Accountant` (13-2011). These are cited across shipped notes and **do not exist**:

| Phantom row | Cited by |
| --- | --- |
| `Assistant Psychologist -> 19-3031` | SKILL.md 8-for-8 list, `Accounts Assistant` note |
| `Assistant Valuer -> 13-2021` | SKILL.md 8-for-8 list, `Accounts Assistant` note |
| `Assistant Town Planner -> 19-3051` | SKILL.md 8-for-8 list |
| `Architectural Assistant -> 17-3011` | `Editorial Assistant` note, `Accounts Assistant` note |
| `Planning Assistant -> 19-3051` | `Accounts Assistant` note |
| `Veterinary Director -> 29-1131` | **Open conventions #6**, and two shipped notes |

Nearest real rows are `Registered Psychologist -> 19-3031` and `Residential Property Valuer -> 13-2021`.
**Open convention #6 is materially weakened**: its lead example is a phantom, and the real
`Product Director -> 11-1021` row runs the other way. Verify a cited row with
`grep -E '^<Title>,' data/aioe/v31_extension_crosswalk.csv` before reusing it — a precedent quoted in a
shipped note is not evidence that the row exists, and this file has been propagating six of them.

### `Landscape Technician` — the 65.46-point rejection, and the precedent that was retro-fitted

The batch's contested row, upheld by both reviewers after direct attack. `Landscape Technician` is
verbatim at **37-3011 Landscaping and Groundskeeping Workers (20.14), src=02,08,10**, and was mapped to
**17-3011 (85.60)** instead — a **65.46-point** rejection of an incumbent-sourced anchor, more than double
the largest previously recorded (29.35). It survives because 17-3011 is **not a residual**: it anchors
`Architectural Technician`, `Architecture Technician`, `Architectural Technologist`, `Civil Technician`,
`Architectural Designer` (src=02) and the landscape-specific `Landscape Drafter` (src=08), so rule 4's
failure mode does not reach it; and because 37-3011 is no-degree manual grounds work while all 13
employers are design studios plus the University of Melbourne.

**The draft's cited precedent was retro-fitted and the note now says so.** `Collections Officer -> 25-4013`
*is* a convergent instance — a real verbatim `Collections Officer` sits at 43-3011 (src=02, debt
collection) — but its own note never mentions 43-3011 and rejects only 25-4011 Archivists on
object-vs-record grounds. **This run therefore ESTABLISHES "a verbatim anchor may be rejected on an
industry-sense mismatch, on employer evidence"; it does not follow it.** Treat it as new precedent under
test, not settled law.

### Proving a low code carries "no such string" is where the near-miss hides

The draft rejected 37-3011 for both Assistant rows partly on "carrying no Assistant string". **False:
37-3011.00 carries `Landscaping Assistant` (src=10)** — one morpheme from `Landscape Assistant`, the very
title being mapped. Substring greps on the *head noun* are not enough; grep the low rival for the
*qualifier* too. Both rows now reject 37-3011 on employer evidence and on src=10 being the weakest
source, not on absence.

### Durable facts, so nobody re-derives them

- **`Open Space Planner -> 19-3051` (high) ALREADY SHIPS.** `Senior Open Space Planner` is a pure rank-strip
  onto an existing row, which is why it went out at `high`. The draft never found it and argued from
  scratch. Grep the crosswalk for the rank-stripped string before reasoning about any `Senior <X>`.
- **Bare `Planner` is verbatim at SIX codes** — 19-3051 (src=02,08,10), 17-1012 (src=02), 17-1011 (src=02),
  13-1121 (src=10), 17-3026 (src=08), 19-3099.01 (src=02). "The generic Planner points at 19-3051" is
  wrong: it points at both live candidates in this record, which is why the `Landscape Planner -> 17-1012`
  / `Senior Open Space Planner -> 19-3051` split rests on each string's OWN anchor, not on the head noun.
- **19-3051 DOES carry designer strings** — `City Designer` and `Sustainable Communities Designer`
  (both src=08). Never reject Urban and Regional Planners on "planners are not designers".
- **`Landscape Architect` is verbatim at 17-1012.00 only** (src=02,04,10) across all 55,120 rows, as are
  `Landscape Planner` (src=02) and `Landscape Designer` (**src=02,04,06,08,10**, all five sources — the
  most corroborated anchor seen in this task).
- **`Urban Designer`, `Urban Design`, `Open Space`, `Garden Designer`, `Design Assistant` (and every
  Assistant/Designer word-order variant) return ZERO rows**, substring-checked.
- **The Freelance family is 8 distinct titles, not 9** — the ninth is a duplicate `Freelance Writer`.
  27-3043.00 carries it at src=08 while 27-3043.05 carries it at src=02,04,06; both fold to 27-3043.
- **17-3011 has 60 alternate-title rows** and is the design-office drafter/technician tier.
- **`Landscape Irrigation Specialist` sits at 17-2021** (src=10), so `Landscape Drafter` is not quite "the
  only landscape-specific technician-tier anchor".

### Two clusters examined and deliberately not taken

- **mc-li (Master of Learning Intervention, 13 blockers)** is next in `nextbatch` order and is a **trap**:
  every title is a special-education teaching role, and SOC 2010 splits special education by school level
  exactly as it splits general teaching — 25-2051 Preschool **72.54**, 25-2052 Kindergarten/Elementary
  **81.13**, 25-2053 Middle School **94.48**, 25-2054 Secondary **86.45**, 25-2059 All Other **47.80**. That
  is a **21.94-point** spread across the live codes (46.68 including the residual) on a qualification that
  spans all levels — strictly worse than the 7.15-point Elementary/Secondary swing that got `Teacher`
  refused. **Do not take mc-li until the crosswalk key carries the program.**
- **mc-culmc (Master of Cultural Materials Conservation, 14 blockers)** is the opposite: twelve of its
  fourteen are impeccably anchored, because **25-4013 Museum Technicians and Conservators (61.43) carries
  `Conservator` (src=02,06,10), `Objects Conservator` (src=02,04), `Textile Conservator` (src=02,04),
  `Paper Conservator` (src=02,04), `Conservation Technician` (src=02,04,08), `Art Conservator`,
  `Artifacts Conservator`, `Paintings Conservator` and `Museum Registrar`**. But **`Heritage consultant`
  and `Heritage Officer` block it and both look refusable**: the substring `heritage` returns **ZERO rows
  in all 55,120**, and the candidate band spans **28.36 points** (25-4013 61.43, 25-4011 Archivists 79.72,
  19-3091 80.20, 25-4012 Curators 81.16, 19-3093 Historians 89.79, the last anchored only by
  `Historic Preservationist` at src=10). Conservation fixes the domain and not the function — the
  `Assistant Language Teacher` shape again — and mapping both to 25-4013 would put two unanchored picks at
  the FLOOR of that band, moving the record mean by 3.78. Note also `Conservation Officer -> 19-1031`
  already ships as a **land-management** row, so the string is domain-ambiguous across the file. Whoever
  takes mc-culmc should map the twelve and expect to refuse the two.

## Twentieth run, 2026-08-19 — 11 applied, ONE overturned, TWO refused; mc-culmc NOT cleared (3 blockers left)

`nextbatch 40` returned **37 previously refused/parked titles** before any live work — the parked head has now
grown past a full batch, so a run that reads only the first 20 sees nothing but dead rows. Batch was the
**mc-culmc (Master of Cultural Materials Conservation, n=40, Faculty of Arts)** cluster, 12 of its 14 blockers,
scoped in advance by the nineteenth run. Blocking titles **51 → 40**, blocked programs **13 → 13**,
fully-mappable holdout programs **40 → 40**. All 11 applied rows go to **25-4013 Museum Technicians and
Conservators (61.43)** — the first conservator-family rows in the extension file beyond the shipped
`Conservation Officer -> 19-1031` land-management row.

Applied: `Conservator`, `Graduate Conservator`, `Assistant Conservator`, `Conservation Technician`,
`Objects Conservator`, `Textiles Conservator`, `Book and Paper Conservator`, `Preventive Conservator`,
`Senior Conservator, Exhibitions` (all high); `Senior Conservation Officer`, `Manager, Preventive
Conservation` (medium). Blast radius clean for the seventh run running — every applied title is reported by
mc-culmc alone.

Two reviewers ran, one on SOC choice and one on the notes. **`Collections Assistant` was OVERTURNED**;
`Heritage consultant` and `Heritage Officer` were **REFUSED**, as the nineteenth run predicted. The
fact-checker found 3 false claims, **0 load-bearing** — the anchors, absences, indices and distances all held,
and every error was in the *precedent* layer. That is the first run where the error rate fell, and the reason
is that nine of the twelve rows rest on a verbatim anchor rather than on a cited row.

### `Collections Assistant` — overturned, and it is the `Management Trainee` shape with a twist

Unanchored (`Collections Assistant` and `Collection Assistant` return zero rows), three candidates spanning
19.73 (25-4013 61.43 / 43-4121 Library Assistants 68.46 / 25-4012 Curators 81.16), and the draft picked the
lowest. Three things killed it, and the third is the reusable one:

- **The qualifier's own anchor points the other way.** The only museum-sense "Collections" strings in all
  55,120 rows are `Collections Curator` (src=02,04) and `Collections Manager` (src=02,04,06), **both at
  25-4012**. 25-4013 carries no "Collections" string at all.
- **It blocks two programs, and fails rule 5 in the second.** It is also reported by BA (Ancient World
  Studies), where it sits in the same entry tier as `Curatorial Assistant -> 25-4012` — the row would place it
  19.73 below its own sibling. That cohort's skills are Research / Analysis / Artefact Analysis / Cultural
  Heritage with heritage-consultancy employers, so the "object-handling work the programme trains for"
  defence does not carry across.
- **A batch may not cite a contra-O\*NET row on one line and disqualify its mirror image on another.** The
  draft disqualified `Exhibitions Coordinator -> 25-4012` as precedent *because* it contradicts O\*NET's
  verbatim placement of that string at 25-4013 — then leaned on `Collections Manager -> 25-4013`, which has
  the identical defect with the sign flipped. **Check a batch for that asymmetry before shipping it.**

Counter-evidence found and rejected as insufficient: 25-4013 does carry `Museum Registrar` (src=02,04,06), so
the collections-documentation function genuinely splits across the two codes. That makes it a coin flip, which
under the standing rule drops the row rather than shipping it at `medium`.

### Two shipped rows contradict a verbatim O\*NET anchor, in opposite directions — 19.73 points each

Found while gathering evidence, **not fixed** (out of scope; changing a shipped row moves already-computed
means). Both are in this batch's own domain and both are Δ19.73:

| Shipped row | O\*NET's verbatim placement |
| --- | --- |
| `Collections Manager -> 25-4013` (61.43) | 25-4012 src=02,04,06 (also 11-3031 src=08, 43-1011 src=10) |
| `Exhibitions Coordinator -> 25-4012` (81.16) | 25-4013 src=10, and `Exhibits Coordinator` src=02,10 |

Neither note mentions the anchor. Whoever re-opens the museum family should settle both together — they are
inverted, so fixing one and not the other makes the family *less* consistent, not more.

### `Heritage consultant` and `Heritage Officer` — refused, and the band is wider than previously recorded

The nineteenth run recorded a 28.36-point candidate band. Adding the Australian statutory-planning reading
(Heritage Victoria issues permits; council heritage advisors sit in planning departments) puts **19-3051 Urban
and Regional Planners at 92.85** in the band, taking it to **31.42**: 25-4013 61.43, 43-4121 68.46, 25-4011
Archivists 79.72, 19-3091 Anthropologists and Archeologists 80.20, 25-4012 Curators 81.16, 19-3093 Historians
89.79 (anchored only by `Historic Preservationist`, src=10), 19-3051 92.85. Confirmed independently: the
substring `heritage` returns **ZERO rows across all 55,120**, checked in every column. Cultural Materials
Conservation fixes the *domain* and leaves the *function* open across conservation, archives, archaeology,
history and statutory planning — the `Assistant Language Teacher` / `Design Assistant` shape. mc-culmc is now
parked beside mc-eleceng, mc-ib, mc-larch and mc-softeng.

### Durable facts, so nobody re-derives them

- **The conservator family is a closed set and it lives at one code.** Substring `conservator` returns **10
  rows in all 55,120; nine are 25-4013.00** — `Conservator` (src=02,06,10), `Art Conservator` (04,06,08),
  `Artifacts Conservator` (08), `Objects Conservator` (02,04), `Paintings Conservator` (02,04), `Paper
  Conservator` (02,04), `Textile Conservator` (02,04), `Ethnographic Materials Conservator` (04), `Conservator
  Technician` (10). The tenth is `Estate Conservator` at 23-1011, which is legal guardianship. **25-4012
  Curators carries zero conservator strings** across its 25 titles, and so does 19-1031.
- **25-4013 is NOT a floor — it is the 49th percentile** of the 774 Felten occupations (median 62.39). "All
  rows went to the low code" is not by itself a deflation finding; check the percentile before arguing it.
- **`Conservation Technician` is double-anchored and the sources break the tie**: 25-4013 src=02,04,08 against
  19-4071 (SOC 2010 **19-4093**, 47.71) src=10. Δ13.72.
- **`Conservation Officer` is anchored ONLY at environmental codes** — 19-4071 (08), 33-3031 Fish and Game
  Wardens (02), 45-4011 Forest and Conservation Workers (02) — **all of them below 25-4013**, so following the
  anchor literally deflates harder than rejecting it. The shipped `Conservation Officer -> 19-1031` row is
  itself unanchored on the bare string (19-1031 carries `Conservation Science Officer`), and it serves BSc
  (Zoology), a different faculty. Note also that `Conservation Specialist` anchors at **both** 25-4013 (02)
  and 19-1031 (08), so the "Conservation \<role\> family" argument is split, not clean.
- **11-9199 Managers, All Other is unanchored in this domain, not merely distant** — none of its **312**
  alternate titles is museum, gallery, heritage, conservation or collections.
- **The in-domain `<X> Manager` rows run 4-to-1 to 25-4012** — `Gallery Manager`, `Art Centre Manager`,
  `Public Programs Manager`, `Museum Manager and Curator` against `Collections Manager -> 25-4013`. All four
  name curatorial or programming functions, which is why `Manager, Preventive Conservation` still went to
  25-4013; the split is on the function named, not on the word Manager.
- **`Textiles Conservator`, `Collections Assistant`, `Preventive Conservator`, `Book and Paper Conservator`,
  `Graduate Conservator`, `Assistant Conservator`, `Senior Conservator` all return ZERO rows**, exact and
  substring, all columns. Substring `preventive` returns **five** rows in the whole file (three Preventive
  Medicine at 29-1229.05, one instrumentation inspector, one plant-maintenance coordinator) — a reviewer who
  reports six has miscounted.
- **Bookbinding sits at 51-5113 Print Binding and Finishing Workers (42.02)**, 19.41 below 25-4013, and
  carries no conservator string — the one place `Book and Paper Conservator` could have split downward.
  25-4011 Archivists (79.72) is the upward rival, live because of State Library Victoria and National
  Archives; its 16 titles are all archivist/records strings with zero conservation.

### Two family counts in this file are overstated — corrected here

- **The `Assistant <Profession>` family is 5 verifiable, not 8-for-8 or 7-for-7.** The nineteenth run corrected
  8 to 6; the true figure is lower again. Seven `^Assistant ` rows exist, and only five have a base profession
  row to verify against — `Assistant Planner`, `Assistant Curator`, `Assistant Editor`, `Assistant Accountant`,
  `Assistant Landscape Architect`. `Assistant Director -> 19-3094` is marked **do-not-generalise in its own
  shipped note** and is a rank, not a profession; `Assistant Project Manager -> 11-9021` has no base
  `Project Manager` row.
- **The `Graduate <X>` family is 32 of 34, not 34 of 34.** The two exceptions are named in the crosswalk's own
  notes: `Graduate Project Manager -> 11-9021` and `Graduate Nutritionist -> 19-1011`.

### The parked head is now 37 titles — a `nextbatch 20` sees no live work at all

Every title ahead of mc-culmc in `nextbatch` order is refused or parked: `Technical Leader` (mc-eleceng),
`Management Trainee` (mc-ib), `Design Assistant` (mc-larch), `Senior Product Manager` (mc-softeng),
`Crime Prevention Officer` and `Family Violence & Review Officer` (274ab), `English Teacher` and
`Assistant Language Teacher` (mc-apling), `Clinical Specialist` and `Innovation Manager` (mc-biomeng),
`Publishing Assistant` and `Content Manager` (mc-pubcom), the three mc-agsc titles, the six mc-teachpr and
three mc-teachsa titles, and the thirteen mc-li titles. **The task instruction to "take the first 20" no
longer surfaces any live work** — a future run must filter the parked set first, or `nextbatch` needs a flag
that excludes refused titles. After this run the only live cluster left in the whole queue is
**mc-agsc's `Agribusiness Graduate` / `Research and Development Officer` / `Head of National Beef
Development`**, all three of which are already recorded as refused. On the current refusal set, **the queue is
exhausted**: 40 blocking titles across 13 programs, and every one is refused or parked. The next real
increment requires changing the crosswalk key to carry the program, not more mapping runs.

## Twenty-first run, 2026-08-19 — 0 applied, 0 refused; queue exhaustion INDEPENDENTLY VERIFIED

No mappings. `nextbatch 60` returns **40 titles across 13 programs and every one is already
refused or parked** — the twentieth run's exhaustion finding, re-derived from the data rather
than taken on trust. Blocking titles 40 → 40, blocked programs 13 → 13, fully-mappable
holdout programs 40 → 40. `status` reads: Wave 1 168 programs, 53 with a measured record,
115 needing a profile.

**The verification, so it need not be repeated.** Exhaustion here means something stricter than
"the head of the queue is parked": a program clears only when *every* one of its titles maps, so
the queue is dead iff each of the 13 blocked programs carries ≥1 refused title. Checked
program-by-program against `unmapped 60` blast radius and the per-title adjudications in this
file — all 13 do:

| Program | Refused title(s) holding it | Recorded |
| --- | --- | --- |
| mc-eleceng | `Technical Leader` | tenth run |
| mc-ib | `Management Trainee` | overturned, rule 5 |
| mc-larch | `Design Assistant` | nineteenth run |
| mc-softeng | `Senior Product Manager` | killed twice; convention #3 |
| 274ab | `Crime Prevention Officer`, `Family Violence & Review Officer` | rule 5, convention #5 |
| mc-apling | `English Teacher`, `Assistant Language Teacher` | rule 5 |
| mc-biomeng | `Clinical Specialist`, `Innovation Manager` | seventh/eighth runs |
| mc-pubcom | `Publishing Assistant`, `Content Manager` | eleventh run |
| mc-agsc | `Agribusiness Graduate`, `Research and Development Officer`, `Head of National Beef Development` | ninth run |
| mc-culmc | `Collections Assistant`, `Heritage consultant`, `Heritage Officer` | twentieth run |
| mc-teachsa | `Teacher`, `Classroom Teacher`, `Casual Relief Teacher` | rule 5 |
| mc-teachpr | the same four teaching-family titles | rule 5 |
| mc-li | `Learning Support Teacher`, `Special Education Teacher`, `Teacher of the Deaf`, `Specialist Remedial Teacher` | nineteenth run, family |

**No mapping run can clear another program.** The next increment requires the crosswalk key to
carry the program, not more mapping. Two titles — `Classroom Teacher` and `Casual Relief Teacher`
— block mc-teachpr *and* mc-teachsa simultaneously, which is the cleanest statement of why:
one row keyed on title alone must serve both primary and secondary at once.

### The mc-li family refusal is right, but its stated reason is wrong for 9 of the 13 titles

The nineteenth run refused mc-li on "every title is a special-education teaching role". That claim
does not survive reading the 13: only **four** are level-splittable teaching titles
(`Learning Support Teacher`, `Special Education Teacher`, `Teacher of the Deaf`,
`Specialist Remedial Teacher`). The other nine are advisory, coordination, leadership or
administrative — `Learning Diversity Leader`, `Disability Inclusion Leader`, `Learning Intervention
Coordinator`, `Head of Learning Support`, `Special Education Advisor`, `Students with Disabilities
Funding Assessor`, `Development Education Officer`, `School Wide Positive Behaviour Support Coach`,
`Senior School Individual Needs Advisor`. Several of those are probably mappable on their own terms.

**The conclusion still holds, for a different reason:** the four teaching titles are refused, so
mc-li cannot clear no matter what happens to the other nine, and mapping them would add rows that
unblock nothing while creating contamination risk for any future program reporting the same string.
Do not take them. But do not re-refuse mc-li on the blanket claim either — if the crosswalk key
ever carries the program, only four of these thirteen are actually hard.

### The level spread behind the teaching refusals, verified from `felten_aioe.json` raw scores

Re-derived this run because it is the single load-bearing number in the whole parked set. Raw
Felten AIOE (not the rescaled index), which preserves the ordering: special education
**Preschool 0.375 / K-Elementary 0.736 / Middle 1.296 / Secondary 0.959 / All Other −0.663**.
The residual 25-2059 is the *lowest of the family*, so the tempting "level-agnostic qualification →
level-agnostic residual" move is the `Management Trainee` failure mode — picking the floor of a wide
spread. General teaching splits the same way: 25-2021 Elementary **0.887** vs 25-2031 Secondary
**1.191**. Both refusals rest on real numbers.

### The "take the first 20" instruction is now inert and should be changed at the source

Third run in a row to spend its budget rediscovering this. The scheduled-task file still says take
the first 20 from `nextbatch`; the parked head is 40, so a compliant run sees **zero** live work and
must read this file's run log to learn that. The fix is not another run — it is either a
`nextbatch --exclude-refused` flag or a `refused.json` the script reads. Until one exists, every
scheduled invocation costs a full verification pass to reach "nothing to do".

## Open conventions — resolve before they decide more rows

6. **"Director" is split, and the split line is whether the title names the clinical
   discipline.** RESOLVED 2026-08-17 from the existing rows — but **WEAKENED 2026-08-19**: its
   lead example `Veterinary Director -> 29-1131` **does not exist as a row** (one of six phantom
   precedents found that day; see the nineteenth run), and the real `Product Director -> 11-1021`
   row runs the other way. Re-verify every row below with `grep -E '^<Title>,'` before relying on
   this convention. As originally written: named-discipline directors take
   the **practitioner** code (`Veterinary Director -> 29-1131`, `Clinical Director, Mental
   Health Drugs and Alcohol -> 29-1066`, and now `Registered Music Therapist, Director ->
   29-1125`); bare strings take the **management** code (`Clinical Director -> 11-9111`
   high, `Medical Director -> 11-9111`, `Director -> 11-1011` low). Note 11-9111 reports
   "Clinical Director" verbatim, so a reviewer will always land on it — cite this convention
   rather than leaving the split implied. The same logic covers discipline *leads*, on four
   verified rows: `Psychology Team Leader -> 19-3031`, `Clinical and Team Lead Neuropsychology
   -> 19-3031`, `Oral Health Therapist Team Leader -> 29-2021`, `Senior Physiotherapist ->
   29-1123`. 11-9111's reported titles contain nothing resembling a profession or discipline
   lead, so the manager rival has no anchor.


1. **Does the law-enforcement family govern a criminology cohort?** **RESOLVED for 274ab
   on 2026-08-17, from the record itself:** the analytic/regulatory family governs, and
   33-xxxx applies only where a title names a sworn or statutory enforcement office
   outright (`Australian Border Force Officer` does; `Investigation Officer` at the
   Ombudsman or Consumer Affairs does not). Evidence: 274ab's employers are overwhelmingly
   policy, regulatory and statistical agencies (DJCS, Crime Statistics Agency, Victorian
   Ombudsman, DPC, ABS, ATO, Consumer Affairs Victoria, RMIT CIJ, The Social Research
   Centre) with two policing bodies, one of which — ANZPAA — is itself an advisory body;
   the skills list is entirely analytic (Policy Analysis, Governance, Program Evaluation,
   Data Analysis, Stakeholder Engagement, Research) with no operational-policing skill;
   and every already-mapped title in the record is analytic. This does NOT unblock
   `Crime Prevention Officer` — see #5.
2. **Do O\*NET's `15-1199.xx` detailed occupations count as evidence for the parent SOC?**
   **RESOLVED 2026-08-17: yes.** Felten indexes at broad-SOC level, so O\*NET's own
   placement is the only non-arbitrary tiebreak, and SOC 2010 has no other home for a
   `15-1199.xx` title. Precedent: `Software Quality Assurance Engineer → 15-1199`
   (15-1199.01) and `Regulatory Affairs Executive → 13-1041` (13-1041.07). The rule cuts
   both ways and must be applied even when it gives an answer you dislike — it is what
   killed `Senior Product Manager → 15-1199` above. `Business Intelligence Analyst →
   15-1121` remains the inconsistent row, but at Δ0.82 to 15-1199 it is immaterial; leave
   it.
5. **`Crime Prevention Officer` — one new fact, still not enough.** The 274ab record lists
   it under **entry level, 0–1 years**, where a sworn Victoria Police divisional posting is
   effectively impossible; that argues for the civilian community-safety read and against
   33-3051. It does not resolve the row, because the record does not link titles to
   employers and the civilian side has no settled SOC (11-9151 is a *manager* occupation,
   wrong for an entry-level officer; 21-1094 Community Health Workers sits at 64.49). Δ43.46
   across the candidates. Still **unmapped**.

   **Corrected 2026-08-17:** this title no longer "alone blocks 274ab" — that claim is now
   stale. Eight of the cohort's analytic titles were mapped and applied on 2026-08-17, and
   274ab then had three blockers. `Analyst - Financial Crime Operations` was mapped to
   13-2099 on the fourth run, so 274ab now has **two**: `Crime Prevention Officer` and
   `Family Violence & Review Officer` (refused, see rule 5). Both must fall before 274ab
   scores on Panel A, so clearing either one still unblocks nothing — and both are
   currently refused, so 274ab is parked until the crosswalk key carries the program.
3. **Product management has no settled SOC.** `Product Director → 11-1021` (note: "Product
   leadership has no SOC 2010 occupation") vs the rejected `Senior Product Manager →
   11-3021`, 11.55 points apart. Same question, two answers.
4. **"Architect" is already split 16.75 points** between `Software Architect → 15-1133` and
   `Cloud Engineer → 15-1143` — and both `Cloud Engineer` and `DevOps Engineer` carry
   "flag for review" in their own notes. Do not cite either as settled precedent.

## Report

One short paragraph: how many titles mapped, how many programs that unblocked
(`python3 scripts/destination-profiles.py status`), any titles you refused to map and why,
and any mapping the adversarial reviewer overturned. Report the refusals explicitly —
they are the useful signal, not a failure.

## Twenty-second run, 2026-08-19 — 0 applied, 0 refused; the queue filter built

No mappings, and none were available. Exhaustion re-verified a third time from the data —
40 blocking titles, 13 blocked programs, same 13 as the twenty-first run, and every one
carries ≥1 refused title (checked by inverting `unmapped`'s blast-radius map into
per-program title sets and intersecting with the refused list, rather than trusting
`nextbatch`'s attribution). `status` unchanged: 168 Wave 1, 53 measured, 115 needing a
profile.

**This run spent its budget on the fix the last three runs kept naming instead of another
verification pass.** `data/aioe/crosswalk-refused.json` now holds the 25 refused titles with
their reason and the run that decided them, plus the five overturned-with-replacement rows.
`scripts/destination-profiles.py` reads it in `cmd_nextbatch` and drops both the refused
titles and the programs holding them, because a program carrying a refused title cannot
clear and its *other* titles are therefore not live work either. `nextbatch 1` → `[]`;
the parked programs and the titles holding them go to stderr; `nextbatch N --all` restores
the raw queue. `unmapped` is deliberately untouched — it is the blast-radius view and
should keep showing everything. `dfva:check` green (5 generated files, 207 report bodies,
67 programs, 57 v4-scored, no exposure gaps; the six REPORT_CONTENT warnings and the
dh-lld/dr-philik faculty warning are pre-existing).

### One correction to the twenty-first run's exhaustion table

It records mc-teachpr as blocked by "the same four teaching-family titles" as mc-teachsa.
Read against `nextbatch` output alone that looks false — `nextbatch` attributes each title
to exactly one program (the nearest-to-complete one), so mc-teachpr appears there holding
six *different*, never-adjudicated titles (`Teacher's Aide`, `Education Support`, `Middle
School Teacher`, `EAL Teacher`, `Classroom Teacher and Team Leader`, `Leader of
Differentiated Learning`) while `Teacher`/`Classroom Teacher`/`Casual Relief Teacher` are
billed to mc-teachsa and `English Teacher` to mc-apling. The substance of the table is
right — `unmapped` shows mc-teachpr is held by all four — but the appearance of live work
is an artifact of the attribution, and it cost this run a detour. **`nextbatch` shows one
program per title; only `unmapped` shows the true per-program blocking set.** The new
filter closes the trap: those six titles no longer surface at all.

### The 15 never-adjudicated titles, and why they stay unmapped

Nine sit in mc-li (`Learning Diversity Leader`, `Disability Inclusion Leader`, `Learning
Intervention Coordinator`, `Head of Learning Support`, `Special Education Advisor`,
`Students with Disabilities Funding Assessor`, `Development Education Officer`, `School
Wide Positive Behaviour Support Coach`, `Senior School Individual Needs Advisor`) and six
in mc-teachpr (above). Several are probably mappable on their own terms — the
twenty-first run says so of the mc-li nine. Both programs are held by refused teaching
titles regardless, so mapping any of them unblocks nothing while creating a row that a
future program reporting the same string would inherit. They are filtered, not refused:
they carry no adjudication, and if the crosswalk key ever carries the program they become
live work again.
