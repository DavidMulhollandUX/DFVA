---
name: dfva-crosswalk-backfill
description: Map unmapped graduate destination titles to O*NET SOC occupations so Panel A exposure can be computed for Wave 1.
---

Map graduate destination job titles to O*NET SOC occupations, so Panel A exposure can be
computed for DFVA Wave 1 programs that already hold measured alumni data.

Working directory: /Users/djmulholland/Documents/SXD-Github/DFVA

Background: `docs/dfva-destination-profiles-plan.md` §2a.

## Why this exists

48 Wave 1 programs have **measured** LiveAlumni destination records — real graduates,
counted — that cannot be used, because 443 of their destination titles have no row in
`data/aioe/v31_extension_crosswalk.csv`. `dfva-v4-gen.ts` throws on an unmapped title
rather than averaging over whatever happened to map, so those programs cannot be scored
on Panel A at all.

This is the highest-value data work available: it converts existing measured evidence
into usable exposure figures. It also unblocks the hold-out validation that gates the
whole inferred-profiles workstream.

## Check first — exit cheaply if there is nothing to do

```bash
cd /Users/djmulholland/Documents/SXD-Github/DFVA && python3 scripts/destination-profiles.py nextbatch 1
```

If that prints `[]`, every blocking title is mapped. Reply with one line saying so and STOP.

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
- **The existing `Graduate Project Engineer -> 17-2199` row is demonstrably wrong** and its
  own note already says "flag for review": "Project Engineer" is a verbatim reported title
  under both 17-2141 and 17-2071. Needs a row *edit*, which `crosswalk-add.py` cannot do.
  Same open item as `Head Teacher -> 11-9039` from the fourth run.
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

Also recorded: `Graduate <X> -> <X>'s SOC` holds in **29 of 30** existing Graduate-prefixed
rows (sole prior exception `Graduate Project Manager -> 11-9021`). `Graduate Nutritionist` is
the second break, and it is safe only because the crosswalk is title-keyed and the cohorts do
not collide — the existing `Nutritionist -> 29-1031` row serves **Master of Food Science**.
Disclose the convention when breaking it.

## Open conventions — resolve before they decide more rows

6. **"Director" is split, and the split line is whether the title names the clinical
   discipline.** RESOLVED 2026-08-17 from the existing rows: named-discipline directors take
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
