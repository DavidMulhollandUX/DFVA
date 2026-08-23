# Market §3 — body provenance claims, proposed rewrites

**Date:** 2026-08-24
**Status:** proposal for review. No report has been changed by this document.
**Follows:** [dfva-v4-report-prose-audit.md](dfva-v4-report-prose-audit.md) Finding 1,
after the §3 heading fix reduced provenance contradictions from 27 files to 14.

## The constraint that decides every rewrite below

All 14 files declare the same sources:

> WEF Future of Jobs 2025, LinkedIn *Workforce Insights* Q1 2026, Australian
> Government Labour Market Insights, Seek.com.au trend data, and domain-specific
> industry reports.

**None of those is a sample of posts.** *LinkedIn Workforce Insights* is a published
aggregate report; it is not a corpus of what people wrote on LinkedIn. So a sentence
of the form "LinkedIn posts from X practitioners say Y" is not supported by any
source the file declares.

That rules out the tempting fix. We cannot attribute these claims, because there is
nothing to attribute them to, and inventing an outlet to make the sentence look
sourced would be a worse defect than the one being repaired
(`deslop` evidence boundary; `.claude/rules/conventions.md`).

So each claim gets one of two dispositions, and the choice is the author's:

- **CUT** — the claim exists only because a platform was imagined to have said it.
  Nothing survives removal.
- **KEEP AS INFERENCE** — the underlying observation is defensible from the labour
  market data the file does have. Strip the platform framing and let it stand as the
  report's own reading, which is what the `— LOW/MEDIUM CONFIDENCE` heading now declares.

A third option exists and is better than both where someone will do the work:
**SOURCE IT** — find the trade-press or study that actually reported the thing, and
cite it with a date and a link. That converts the claim into evidence and satisfies
the §3 attribution rule. It is the only disposition that raises the section's
confidence level.

---

## The 18 claims

### 527cl — Master of Clinical Psychology

**1.** "LinkedIn posts from WHS professionals and OD practitioners reference psychology
graduates as ideal for these roles, but note that MClinPsych curriculum rarely
addresses workplace legislation or systems-level intervention."

- Problem: a claim about what named practitioner groups posted, from no post corpus.
- **Proposed: KEEP AS INFERENCE.** → "Workplace health and safety and organisational
  development roles recruit psychology graduates, but MClinPsych core teaching covers
  neither workplace legislation nor systems-level intervention."
- The curriculum half is checkable against the handbook. The demand half needs the
  posting data the file already cites, or it goes too.

**2.** "Psychological discourse on X and LinkedIn positions data literacy and outcome
monitoring not as administrative burden but as a clinical competency gap."

- Problem: platform provenance, plus negative parallelism ("not as X but as Y").
- **Proposed: CUT.** Nothing survives once the imagined discourse is removed.

### 746st — Master of Structural Engineering

**3.** "X/Twitter and LinkedIn discussions among Australian structural engineers reflect
growing industry interest in cross-laminated timber (CLT) and mass timber structures,
driven by low-carbon construction mandates."

- **Proposed: SOURCE IT.** CLT uptake and low-carbon mandates are documented in
  Australian construction trade press and in NCC 2025 changes. This is a real trend
  with real sources; only the provenance is invented.

### mc-apbusa — Master of Applied Business Analytics

**4.** "Australian analytics communities on LinkedIn are debating whether programs should
prioritise Python coding depth or 'AI-first, no-code' analytics stacks."

- **Proposed: KEEP AS INFERENCE**, if the skills split shows in the file's own posting
  data. Otherwise CUT. → "Postings split between Python depth and no-code analytics
  stacks, and the two imply different curricula."

### mc-arch — Master of Architecture

**5.** "Australian architecture Twitter/X and LinkedIn are actively debating whether tools
like Midjourney, Stable Diffusion, and Autodesk Forma's AI features will displace
early-career concept generation work."

- **Proposed: SOURCE IT.** Generative design and early-career concept work is covered
  in architecture trade press. Named tools are checkable; the debate is not.

**6.** "Following the Voice referendum and ongoing discussions of Country-responsive
design, architecture professionals on LinkedIn are debating whether architectural
education adequately prepares graduates to work respectfully…"

- **Proposed: SOURCE IT, carefully.** Connection to Country is a published AIA and
  registration-board requirement, not a matter of inferred sentiment. Cite the
  standard. Treat this one as higher stakes than the others: attributing invented
  opinion to Aboriginal and Torres Strait Islander practitioners would be a serious
  defect, and the current sentence edges toward it.

### mc-base — Master of Business (Sustainability)

**7.** "LinkedIn posts from B Corp certified companies in ANZ increasingly reference their
certification as a talent attraction strategy."

- **Proposed: CUT.** Entirely dependent on the imagined post corpus.

### mc-busana — Master of Business Analytics

**8.** "LinkedIn posts from senior analytics practitioners in ANZ and globally repeatedly
highlight causal inference (DiD, synthetic control, regression discontinuity,
propensity score matching) as undervalued in graduate training."

- **Proposed: KEEP AS INFERENCE.** The curriculum observation is checkable against the
  handbook. → "Causal inference methods — difference-in-differences, synthetic control,
  regression discontinuity, propensity score matching — appear in no core subject."

### mc-clind — Doctor of Clinical Dentistry

**9.** "LinkedIn posts from ACCHO dental staff and ADA indigenous health advocates call for
specialist dentists entering rural and remote roles to have explicit training…"

- **Proposed: SOURCE IT or CUT.** As with claim 6, do not leave invented advocacy
  attributed to named Aboriginal health organisations. The ADA and NACCHO publish
  position statements; cite one or remove the sentence.

### mc-ed — Master of Education

**10.** "Education Twitter/X and LinkedIn are dominated by debate about AI tutoring
platforms (Khanmigo, Carnegie Learning, Synthesis AI)…"

- **Proposed: SOURCE IT.** Well covered in education trade press. "Dominated by" is
  also an unmeasured quantity claim — drop it whatever the disposition.

**11.** "Curriculum designers and learning designers on LinkedIn are actively discussing how
to redesign assessment tasks… in response to generative AI."

- **Proposed: CUT.** TEQSA's assessment-reform guidance already carries this point in
  §4 with a real citation, so the sentence is redundant as well as unsourced.

### mc-indeng — Master of Industrial Engineering

**12.** "Employer panels at Engineers Australia events and LinkedIn posts from hiring
managers repeatedly surface the same complaint: graduates can solve the technical
problem but struggle to communicate it."

- **Proposed: SOURCE IT.** Engineers Australia publishes employer-skills commentary,
  and the QILT Employer Satisfaction Survey measures exactly this. Both are already
  cited elsewhere in the corpus.

### mc-intedib — Master of International Education (IB)

**13.** "X and LinkedIn discussions among IB educators flag persistent tension between IB's
standardised international curriculum and local cultural contexts…"

- **Proposed: SOURCE IT.** This is a documented theme in IB research literature.

### mc-propsyc — Master of Professional Psychology

**14.** "The 4+2 model or fourth-year honours + MPsych route continues to generate heated
discourse on platforms including the Australian Psychological Society…"

- **Proposed: SOURCE IT.** APS and PsyBA have published positions on the pathway. The
  APS is an organisation with publications, not a "platform".

**15.** "Psychology Twitter/X and LinkedIn discussions reflect growing anxiety about the
sustainability of private practice for early-career psychologists under Medicare's
bulk-billing incentive structure."

- **Proposed: SOURCE IT.** Medicare rebate structure and its effect on private practice
  is documented. "Growing anxiety" is unmeasurable — state the structural fact instead.

### mc-surged — Master of Surgical Education

**16.** "LinkedIn posts from surgical educators reference competing programs (Harvard CME,
Imperial's MSc in Surgical Education, Edinburgh's)…"

- **Proposed: KEEP AS INFERENCE.** The competitor programs are verifiable facts. Drop
  the posts framing. → "Competing programs include Imperial College London's MSc in
  Surgical Education and Edinburgh's offerings."

**17.** "MedTech companies (Stryker, Zimmer Biomet, J&J MedTech) are professionalising their
surgical training functions, with LinkedIn posts from their education teams
referencing adult learning frameworks."

- **Proposed: KEEP AS INFERENCE**, first clause only. Drop everything after the comma.

### mc-tesol — Master of TESOL

**18.** "LinkedIn posts from Directors of Studies and coordinators frequently discuss quality
framework updates and audit preparation."

- **Proposed: CUT.** Nothing survives removal; ELICOS quality-framework requirements
  are already covered factually elsewhere.

### mc-urbdes — Master of Urban Design

**19.** "Melbourne's City of Melbourne digital twin initiative and Jacobs/Arup smart city work
generate visible LinkedIn discussion about whether urban designers need to become data
engineers…"

- **Proposed: KEEP AS INFERENCE.** The initiatives are real and citable; the discussion
  is not. → "City of Melbourne's digital twin program and consultancy smart-city work
  raise the question of how much data capability an urban designer needs."

---

## Summary of proposed dispositions

| Disposition | Count | What it means |
|---|---|---|
| SOURCE IT | 8 | A real trend behind an invented provenance. Cite and keep. |
| KEEP AS INFERENCE | 6 | Strip the platform framing; the substance stands. |
| CUT | 5 | Nothing survives removal. |

Two of these — claims 6 and 9 — attribute opinion to Aboriginal and Torres Strait
Islander practitioners and organisations that no source records them holding. Whatever
is decided for the rest, do not leave those two as inference. Source them or cut them.

## After the rewrites

```bash
npm --prefix scripts run dfva:gen-content
npm --prefix scripts run dfva:report-lint
python3 scripts/check-report-prose.py
```

`platform-sampling-claim` should reach zero. `unattributed-discourse` and
`quoted-theme-without-source` are a separate, larger body of work and are not
addressed here.
