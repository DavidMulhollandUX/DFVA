// Auto-generated from reports/*.md by scripts/dfva-content-generate.ts — do not edit by hand.
// Run: npm --prefix scripts run dfva:gen-content
const content = {
  title: "Master of Entrepreneurship (MC-ENTRPSP) — Market Intelligence",
  institution: "University of Melbourne",
  markdown: `# DFVA MARKET INTELLIGENCE: Master of Entrepreneurship (MC-ENTRPSP)
**Assessment Date:** 2026-09-01 | **Source:** https://handbook.unimelb.edu.au/2026/courses/mc-entrpsp

## 1. JOB FAMILY MAP

| Job Family | Typical Entry Titles | Core Tasks | AI Substitution Pressure | Skills Increasing in Demand | Evidence Notes |
|---|---|---|---|---|---|
| Startup Founder / New Venture Creator | Founder, Co-Founder, Startup Founder, Managing Director (own venture) | Idea generation and validation, MVP development, fundraising pitch, team leadership | **LOW** — bearing risk, ownership and capital-raising judgement is not what current sources show AI substituting; industries with higher AI task-exposure record about 20% more startup formation, not fewer founders | AI-agent-stack orchestration in place of early functional hires; lean-startup validation methodology | Grounded in the compulsory two-subject capstone, where students "Create a usable entrepreneur venture concept" and progress toward launch (evidence.json C4, scored 3) |
| Solo / AI-Native Founder | Solo Founder, Independent Founder, One-Person Company Director | Running most business functions personally, directing AI tools instead of hiring staff, automating weekly-recurring tasks | **MEDIUM** — not to the founder role itself, but to the functional hires a founder would otherwise make; AI-native startups in a Y Combinator-adjacent sample run with roughly 25% fewer employees and flatter hierarchies | Multi-function AI-tool fluency; distribution and selling skill, which practitioner-forum commenters identify as the persistent bottleneck once building speed is no longer scarce | No core unit yet documents AI-tool coordination — C3 (AI content) is scored 1 and confined to the single free elective; C1 (collaborative practice) is scored 2, capped below Level 3 because no unit assesses coordinating work across people *and* AI systems |
| Innovation Manager / Corporate Entrepreneurship Lead | Innovation Manager, Corporate Venture Lead, Intrapreneurship Manager | Incubating new business lines inside an existing organisation, business-model design and refinement, stakeholder and investor pitching | **LOW** — same founder-role rationale as above; this occupation is an explicit alias in the underlying profession record | Lean-startup / design-thinking methodology application (already a documented program outcome); pitch-document craft | Program outcome "Critically apply and evaluate lean start-up and design thinking methodologies," and the capstone's authentic venture-creation and pitching tasks (evidence.json W2, scored 2) |
| Venture / Investor-Pitch Specialist | Founder (fundraising-stage), Venture Development Associate, Pitch/Deck Specialist | Building and presenting investor pitch decks, persuading investors and acquiring resources for growth | **LOW-MEDIUM** — templated pitch-deck elements are AI-assistable, but the persuasion and investor-relationship judgement the program assesses is not | Professional-genre pitch craft judged against practice-drawn criteria | The capstone sequence assesses a graded investor-style pitch in both subjects (evidence.json W1, scored 2); no source found documents who externally judges these pitches, which is what caps W1 below Level 3 |

## 2. RECENT JOB AD SIGNALS

No real Adzuna job-ad data was captured for this profession key. The supplied profession record's \`jobAds\` block reads \`{"source": "none", "query": "", "window": "", "count": 0, "topEmployers": [], "topSkills": []}\` — this is a documented absence, not a scraped result of zero postings, and no L4-lane (professional-body or certification) claims exist in the record either. The signals below state that gap plainly rather than estimating around it.

1. **No live job-ad volume, employer, or skill-term data exists for the "Entrepreneur" occupation in the material reviewed.** \`jobAds.count\` is 0 and \`jobAds.source\` is \`"none"\` — no Adzuna or equivalent query was run against founder-specific titles. **LOW confidence** — there is no signal to report, only a gap.
2. **The profession record's own corpus notes document multiple searches that returned nothing usable for founder-specific discourse or job-market material**, including a search for "entrepreneur LinkedIn article 'my job as a founder' AI reflections" and a founder-podcast-transcript search that surfaced only episode summaries, not full first-person accounts. This reinforces that the absence in Signal 1 reflects a genuine search gap, not an unexamined field. **LOW confidence.**
3. **The closest available quantitative proxy is not job-ad data but an academic working paper**: industries with higher generative-AI task exposure recorded about 20% more startup formation than less-exposed industries in a 2026 NBER/SSRN paper (see §3, Theme 2). This measures startup *entry rate* by industry, not job-ad volume or employer demand for the "Entrepreneur" occupation specifically, and should not be read as a substitute for §2's missing job-ad signal. **LOW-MEDIUM confidence**, and scoped narrowly to entry-rate, not demand volume.
4. **No named employers or skill terms can be reported for this program's destination titles.** Closing this requires a fresh job-ad query against titles such as "founder," "startup founder," "innovation manager" and "entrepreneur in residence" — flagged again in §6.

## 3. CURRENT DISCUSSION SIGNALS — MEDIUM CONFIDENCE

**What these sources are.** A Commonwealth ministerial media release and an Australian Taxation Office legislative instrument (both primary government sources), an NBER conference paper / SSRN working paper (not yet peer-reviewed), two Forbes contributor trend-analysis pieces summarising third-party data and an academic working paper, one Inc. news report of an executive's on-stage remarks, and two Indie Hackers practitioner-forum threads. Direct extraction from X or LinkedIn was **not** performed and no professional forum beyond the two named Indie Hackers threads was sampled — "discourse" here means these named, dated sources, not a systematic survey of founder opinion. Dates are given where the source carries one.

### Theme 1 — AI-native startups are running leaner from day one, not with fewer founders

Forbes reported that AI agent stacks are becoming central to a "solo-founder playbook," citing tooling costs of roughly **$3,000–$12,000 a year replacing functions that previously required $80,000–$120,000 a month in payroll** ([Forbes, 2026-08-03](https://www.forbes.com/sites/nehamehra/2026/08/03/why-ai-agent-startups-are-becoming-the-new-solo-founder-playbook/)). Separately, Forbes summarised a Harvard Business School / INSEAD working paper by Kim and Koning finding that AI-native startups in a sample of roughly 2,900 Y Combinator-backed companies carry about **25% fewer employees** than comparable non-AI startups in the same industry and cohort, with flatter hierarchies and comparable valuations ([Forbes, 2026-07-05](https://www.forbes.com/sites/joemckendrick/2026/07/05/ai-startups-really-do-run-leaner-heres-the-data/); [HBS AI Institute, 2026-06](https://aiinstitute.hbs.edu/less-headcount-more-valuation-how-ai-native-firms-change-the-game/)).

Scope: both pieces are contributor trend-analysis, not primary research by Forbes itself — the cost figures trace to Carta's own data product and the headcount finding to an unreviewed HBS/INSEAD working paper (26-090). The paper's full sample reportedly spans a broader venture-backed population (YC plus PitchBook-listed firms, approaching 50,000 elsewhere), so the 25% figure should be attributed to that fuller sample rather than to the roughly 2,900-company YC subsample specifically unless independently confirmed. This describes venture-backed, disproportionately US, AI-native firms — not entrepreneurship generally.

**Bearing:** C3 and W2. C3 (AI content) is scored 1 — the only AI-specific unit in the program sits in the single free elective, never in the compulsory core — against a market where AI-tool orchestration is reported as displacing entire hired functions. W2 (authentic professional task) is held at Level 2 because the extract documents no comparably authentic AI-tool-integrated venture task outside the two capstone subjects.

### Theme 2 — AI-exposed industries are seeing more startup entry, from smaller founding teams

A 2026 NBER conference paper / SSRN working paper found that industries with higher task-level exposure to generative AI saw about **20% more startup formation** than less-exposed industries, and that founding teams in those startups increasingly come from occupations whose tasks can themselves be performed using generative AI ([SSRN, 2026](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5749564)).

Scope: this measures US venture-backed and formally registered startup entry rate and founder occupational background by industry AI-exposure — it does not isolate a distinct "entrepreneur" occupation code, does not measure automation risk to the founder role itself, and describes the new entrants as smaller-scale on average even as aggregate industry employment rises. It is a working paper, not yet peer-reviewed, and US-only.

**Bearing:** C3 and C4. C4 (self-scoped capstone, scored 3) already has students build and validate their own venture concept end to end, which is the format this finding suggests is becoming more common; C3's absence from the core means students are not taught to identify or exploit the AI-exposure pattern this paper describes before they reach that capstone.

### Theme 3 — practitioners say AI has removed founders' excuses, not their jobs, but distribution remains the real bottleneck

In an Indie Hackers forum post, a founder argued that AI has not threatened founders' roles but has eliminated the excuses they used to delay shipping — lack of capital, technical skill, or market research — and commenters largely agreed while adding that distribution and "selling," not building speed, remains the real bottleneck ([Indie Hackers, 2026-04-12](https://www.indiehackers.com/post/founders-arent-scared-ai-will-replace-them-they-re-scared-it-ll-remove-their-excuses-7cabd22eae)). A second, separate Indie Hackers thread found that automations which "compounded" for founders were the ones addressing a task performed every single week, while another commenter cautioned there remains a gap between plugging in AI tools and wiring them into real business outcomes ([Indie Hackers, 2025-07-26](https://www.indiehackers.com/post/how-indie-hackers-can-use-ai-automation-to-grow-smarter-not-harder-in-2025-5639ab4f1a)).

Scope: both are small, self-selected practitioner-forum threads (17 upvotes / 41 comments; 1 like / 6 comments) on a platform skewed toward technically-inclined indie founders — neither supports a prevalence estimate for the broader founder population, and specific quoted remarks reflect one thread's discussion, not a survey.

**Bearing:** C5 and W2. C5 (inquiry methodology) is held at Level 2 — MGMT90286's validation-plan hurdle gates progress on testing a business idea against real customer feedback, but the extract documents no defended review of that methodology, and the practitioner discourse above suggests the harder, undertaught skill is distribution/selling rather than the validation process itself. W2's authentic venture task already includes pitching to persuade investors and "acquiring resources for growth," which is the closest documented curriculum content to the distribution-and-selling skill this theme names as the real constraint.

### Theme 4 — a leading AI lab's CEO has publicly predicted, not measured, a single-employee billion-dollar company

Inc. reported that Anthropic CEO Dario Amodei predicted, in an on-stage Q&A at Anthropic's Code with Claude developer conference, that AI could enable the first billion-dollar company run by a single human employee as soon as 2026, later giving the outcome a 70–80% probability in a follow-up press session ([Inc., 2025-05-23](https://www.inc.com/ben-sherry/anthropic-ceo-dario-amodei-predicts-the-first-billion-dollar-solopreneur-by-2026/91193609)).

Scope: this is one executive's forward-looking prediction as reported by one outlet — not a measured trend or survey of entrepreneurs, and it does not establish that any single-employee billion-dollar company has actually formed by the time of writing.

**Bearing:** C1. C1 (collaborative practice) is scored 2 — group-assessed work with individual accountability recurs across the core, but no unit documents coordinating work across people *and* tools/AI systems, which is exactly the division-of-labour skill a founder would need to approach the scenario this prediction describes.

## 4. SKILL SHIFT SUMMARY (DECLINING vs RISING)

| Skill | Direction | Rationale |
|---|---|---|
| AI-agent-stack orchestration replacing early functional hires | **↑↑ Rising sharply** | Theme 1 (§3): tooling costing $3,000–$12,000/yr is reported replacing $80,000–$120,000/month in payroll; C3 scores 1/3 — the program's only AI content (MGMT90267) sits in the single free elective, never the compulsory core. |
| Distribution and selling skill as the founder's real bottleneck | **↑ Rising** | Theme 3 (§3): practitioners on Indie Hackers report AI removed capital/skill/research excuses but not the distribution bottleneck; C5 sits at 2/3 — the validation-plan hurdle gates progress but no defended review of methodology probes go-to-market assumptions. |
| Self-scoped, end-to-end venture validation | **→ Stable, differentiating** | C4 scores 3/3 at the ceiling — the compulsory two-subject capstone already has students develop, formalise and validate their own venture concept end to end, the same lean format Theme 2 (§3) associates with AI-exposed-industry startup entry from smaller teams. |
| Coordinating work across human collaborators and AI tools | **↑ Rising** | Theme 4 (§3) reports public discourse already anticipating single-operator, AI-orchestrated ventures; C1 scores 2/3 — group-assessed work recurs across the core but no unit documents an assessed human/AI-tool division of labour. |
| Investor-pitch persuasion and relationship judgement over templated deck production | **→ Stable, differentiating** | The job-family map (§1) rates this LOW-MEDIUM substitution pressure — templated pitch-deck elements are AI-assistable but persuasion and investor-relationship judgement are not; W1 sits at 2/3, since the capstone's investor pitch is never documented as externally judged. |
| Building every business function manually before validating an idea | **↓↓ Falling sharply** | Theme 1 (§3) documents AI-native startups running roughly 25% leaner at comparable valuation as agent-stack orchestration displaces early hires across marketing, support and operations. |

## 5. CURRICULUM IMPLICATIONS

| # | Implication | Dimension | Action |
|---|---|---|---|
| CI-1 | C3 is scored 1 — the program's only AI content (MGMT90267, "Artificial Intelligence in Organisations") sits in the single free elective, never the compulsory core — while Theme 1 documents AI-agent-stack orchestration reportedly replacing whole hired functions in comparable ventures | D3 Technical Currency | Option: bring applied AI-for-founders content (tool orchestration, not just organisational AI theory) into one of the five compulsory core units or the capstone sequence. Cost: displaces existing core content or narrows elective flexibility, and requires staff capability in applied AI-venture-building content not currently evidenced in the extract. |
| CI-2 | C1 is capped at Level 2 because no core unit documents coordinating work across people *and* AI/tools systems, while Theme 4 shows public discourse already anticipating single-operator, AI-orchestrated ventures | D3 Technical Currency | Option: extend the capstone's existing team-collaboration assessment to require students to document and justify a division of labour across human collaborators and AI tools. Cost: capstone rubric redesign and moderator training; no new subject required. |
| CI-3 | C5 is held at Level 2 — MGMT90286's validation-plan hurdle gates progress but does not document a defended review of the methodology — while Theme 3 identifies distribution and selling, not validation speed, as the persistent practitioner-reported bottleneck | D6 Research Rigor | Option: add a defended review or viva of the validation plan in MGMT90286, explicitly probing distribution and go-to-market assumptions rather than only build/test mechanics. Cost: additional supervisory and marking load on a compulsory, group-assessed subject. |
| CI-4 | W3 is scored 1 — placement-type subjects (Business and Economics Internship, Global Business Practicum, Business Practicum) appear only among the program's single free-elective options, never in the compulsory core — while founders increasingly face real, dated compliance obligations on incorporation (Director ID linkage from 1 July 2027; ESS valuation instrument from 2025-10-01) that a supervised placement could surface in practice | D4 Industry Connection | Option: route the required free elective more deliberately toward a placement, or add a compulsory practicum tied to the capstone venture. Cost: requires external placement capacity and partner relationships not currently documented as available to a compulsory core unit. |
| CI-5 | W2 is held at Level 2 because the authentic, end-to-end venture-creation and pitching task documented in the capstone is not shown as the program's assessment spine — the other four compulsory core units remain case-study-based in the extract — at the same moment Theme 1 shows AI-native ventures increasingly run lean and authentic from day one | D4 Professional Readiness | Option: extend authentic-task design (a real business model, real customer validation) from the two capstone subjects into at least one earlier compulsory core unit. Cost: a substantial assessment redesign in an existing core unit, moving it from case-study to live-venture format. |

## 6. EVIDENCE CONFIDENCE + GAPS

| Signal Area | Confidence | Gap / Caveat |
|---|---|---|
| Commonwealth legislation and tax instruments (Director ID Act 2026; ATO LI 2025/19) | HIGH | Primary government sources, dated and verifiable; scope is narrow — binds only founders who incorporate a company (Director ID) or issue employee shares under the start-up ESS concession (LI 2025/19), not entrepreneurs generally, and neither is a measure of sentiment or discourse |
| NBER/SSRN working paper on AI exposure and startup formation (Theme 2) | MEDIUM | Not yet peer-reviewed; US data only; does not isolate a distinct "entrepreneur" occupation code |
| Forbes contributor pieces on lean AI-native startups (Theme 1) | MEDIUM | Trend-analysis journalism reporting on third-party data (Carta) and an unreviewed HBS/INSEAD working paper, not primary Forbes research; the 25%-fewer-employees figure needs re-confirming against the paper's fuller sample rather than the YC subsample Forbes cites |
| Inc. report of Amodei's on-stage prediction (Theme 4) | MEDIUM | A single executive's forward-looking prediction as reported by one outlet — not a measured trend, and unrealised at time of writing |
| Indie Hackers practitioner-forum threads (Theme 3) | LOW | Two small, self-selected threads (17 upvotes/41 comments; 1 like/6 comments); not survey-representative of the founder population, and specific engagement counts could not be independently re-confirmed |
| Recent job-ad signals (§2) | NONE | \`jobAds.source\` is \`"none"\` with \`count: 0\` — no live job-ad data of any kind exists for this profession key in the material reviewed |
| L4-lane (professional-body / accreditation) discourse | NONE | No L4 claims exist in the supplied profession record for this occupation |
| Program-specific curriculum evidence (Panel C v4.2) | HIGH | Adversarially reviewed across all ten scored items and marked \`mechanical: true\` in the evidence record (2026-08-31) |

### Critical evidence gaps to close before institutional use:
1. Run a job-ad query (Adzuna or equivalent) specifically against "founder," "startup founder," "innovation manager" and "entrepreneur in residence" titles — no live job-ad data exists for this profession key at all.
2. No L4-lane (professional body, accreditation or certification) discourse exists in the profession record — seek statements from bodies such as Startup Genome, the Australian Investment Council, or university entrepreneurship-centre networks on how AI is changing founder skill requirements.
3. Confirm whether the Kim/Koning HBS/INSEAD working paper (Theme 1) has since been peer-reviewed or published, and re-verify the 25%-fewer-employees figure against its full sample rather than the roughly 2,900-company Y Combinator subsample Forbes cited.
4. Obtain UniMelb/mc-entrpsp-specific graduate destination data — this report and the underlying profession record both rest on the general ONET "Entrepreneur" occupation, not this program's own alumni outcomes.
5. Locate an Australian-specific founder-discourse source — the Indie Hackers threads and the Amodei prediction are entirely US-context; no Australian founder forum, press equivalent, or industry-body statement was found.

---

**Assessment Date:** 2026-09-01
**Source URL:** https://handbook.unimelb.edu.au/2026/courses/mc-entrpsp
**Prompt Version:** DFVA-COPILOT-MARKET-v1

## REAL GRADUATE DESTINATIONS (JSA HEO)

**Where graduates of this field actually work** — [JSA Higher Education Outcomes](https://www.jobsandskills.gov.au/publications/higher-education-outcomes-exploring-administrative-data) (ATO tax-linked administrative data, Table_3, workbook dated 2025-12-04), field of education **080399 Business and Management, n.e.c.** (n = 27,400 completions). Shares are the percentage of the field's graduates in wage or salary work; the field's ten most common entry occupations account for 33.3% of them, and the 5 largest are shown at each stage.

| Career stage | Top occupations |
|---|---|
| Entry (~1yr) | Accountant (General) (9.5%) · General Clerk (3.5%) · Marketing Specialist (3.2%) · Sales Assistant (General) (3.1%) · Management Consultant (3.0%) |
| Early (~3yr) | Accountant (General) (9.6%) · Marketing Specialist (3.6%) · Sales and Marketing Manager (3.5%) · Management Consultant (3.4%) · Corporate General Manager (2.6%) |
| Senior (~5yr) | Accountant (General) (8.4%) · Sales and Marketing Manager (3.9%) · Marketing Specialist (3.5%) · Management Consultant (3.1%) · Corporate General Manager (3.0%) |

**Field grain, not program grain.** These are graduates of the whole Business and Management, n.e.c. field of education at every completion level — not this program's graduates, and not a per-degree distribution. ANZSCO-6 does not encode seniority, so the 1/3/5-year lists move little for most fields.
`,
};

export default content;
