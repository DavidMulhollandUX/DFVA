---
title: COMPASS Venture Analysis — Agent Harness
prepared-by: Claude (from COMPASS session, 2026-06-06)
purpose: Reference document for reproducing all venture analysis workflows. Captures every workflow, prompt, schema, and technical pattern used to build the COMPASS docs/ workbook. Apply to COMPASS or any new venture.
builds-on: workflow-sop.md, compass-venture.md, workflow-structured-output-hardening.md
---

# 🤖 COMPASS Venture Analysis Agent Harness

This document is the complete reference for AI-agent-driven venture analysis. It covers every workflow type used to build the COMPASS MEC Define workbook, with the exact prompts, schemas, file conventions, and technical patterns required to reproduce or extend any workflow — for COMPASS or a new venture.

**Twelve workflow types are documented:**

| # | Workflow | Trigger | Output |
|---|---|---|---|
| 1 | [Market Sizing](#1-market-sizing-workflow) | "Research and define TAM/SAM/SOM" | `compass-market-sizing.md` |
| 2 | [Competitor Intelligence](#2-competitor-intelligence-workflow) | "Conduct competitor intelligence on X" | `competitor-[name].md` |
| 3 | [AI Feature Review](#3-ai-feature-review-workflow) | "AI feature review with PRDs" | `compass-ai-feature-review.md` |
| 4 | [Systems Thinking](#4-systems-thinking-workflow) | "Systems thinking one-pager" | `compass-systems-thinking.md` |
| 5 | [Transcript → Positioning](#5-transcript--positioning-workflow) | "Use this content to update marketing" | Updated `.tsx` files |
| 6 | [Stakeholder Materials](#6-stakeholder-materials-workflow) | "Write email / calendar invite / application" | `templates/` files |
| 7 | [Deeper Perspective & Mental Models](#7-deeper-perspective--mental-models-workflow) | "Step 3 deeper perspective / mental models / vision" | `compass-deeper-perspective.md` |
| 8 | [Validate](#8-validate-workflow-mec-define-step-5) | "Step 5 validate / hypotheses / expert interviews" | `compass-validate.md` |
| 9 | [Experiment Backlog](#9-experiment-backlog-workflow) | "Turn levers into prioritised experiments" | `compass-experiment-backlog.md` |
| 10 | [Evidence & Measurement](#10-evidence--measurement-workflow) | "Does the claim hold? Design the study" | `compass-exp04-causal-evidence.md` |
| 11 | [Expert / Target Sourcing](#11-expert--target-sourcing-workflow) | "Source interview targets with warm paths" | rows in validate / backlog |
| 12 | [Full Venture Analysis](#12-full-venture-analysis-sequence) | New venture onboarding | Full `docs/` workbook |

*Plus [§17 — Manual Authoring Methods & Workbook Upkeep](#17-addendum--manual-authoring-methods--workbook-upkeep): the inline, by-hand methods for the Step-3 Vision checkpoint and the Expert Conversation Guide, the Mom-Test interview discipline, and how they relate to the script-based workflows §7 and §8. Not all good artefacts come from a fan-out.*

*Plus [§18 — The Self-Correcting Workbook](#18-addendum--the-self-correcting-workbook-when-a-workflow-refutes-the-base-audits-the-instrument-or-exposes-a-coverage-gap): the second-order disciplines for when a workflow's output **refutes a load-bearing claim**, **audits the instrument** the venture sells, or **exposes a coverage gap** — reframe-and-propagate, measurement-as-QA, and coverage-audit-every-list. Extracted from the EXP-04 and EXP-13 runs; portable to any venture.*

*Plus [§19 — MEC Define Steps 1–2: Market Discovery](#19-addendum--mec-define-steps-12-market-discovery-problem-tree--system-map--value-chain--stakeholders--institutional-alignment): the **front of the Define process** that runs before §7/§8 — the **problem tree** (find a root cause, convert it to a market), the **Steve-Blank iterative system & value-chain maps** (the four participant groups, where margin concentrates, "the break", the certifier deep-dive), the **stakeholder analysis**, and **honest institutional-alignment scoping**. Plus two new patterns (§13.11–§13.12) for designed HTML/SVG→PDF deliverables on the venture's own design system.*

---

## 1. Market Sizing Workflow

### Purpose
Build an evidence-graded TAM/SAM/SOM for the venture, progressively validated across Perplexity, premium market databases, and institutional sources (OECD, IMF, World Bank).

### Architecture
Four sequential phases. Each phase appends an addendum to the same document — preserving version history inline.

```
Phase 1: Perplexity baseline
Phase 2: Premium databases (Statista, GlobalData, IBISWorld, Fitch Connect, Euromonitor)
Phase 3: Institutional databases (OECD iLibrary, World Bank, IMF, QILT)
Phase 4: Synthesis + write to compass-market-sizing.md
```

### Phase 1 — Perplexity Baseline

**Agent type:** single agent with `mcp__Perplexity__perplexity_research`

**Prompt:**
```
Research and define the TAM, SAM, and SOM for [VENTURE].

Venture description: [2-3 sentence description of what the product does and who buys it]
Primary market: [geography]
Business model: [SaaS subscription / per-assessment / etc.]
Buyer persona: [who makes the purchase decision]

For each tier, provide:
- Definition (what it includes and excludes)
- Size estimate (USD, with year)
- Methodology (top-down or bottom-up)
- Primary sources cited (report name, publisher, year)
- Key assumptions

Additionally:
- Identify 3-5 key market tailwinds
- Identify 2-3 key market risks
- Note any comparable SaaS tools and their known ARR/revenue (as SOM benchmark)
- Identify the top 5 premium databases most likely to have authoritative data on this market

Return as structured research findings with explicit source citations.
```

**Output schema:**
```javascript
const MARKET_SCHEMA = {
  type: 'object',
  properties: {
    tam: { type: 'object', properties: {
      estimate: { type: 'string' },
      methodology: { type: 'string' },
      sources: { type: 'array', items: { type: 'string' } }
    }},
    sam: { type: 'object', properties: {
      estimate: { type: 'string' },
      methodology: { type: 'string' },
      sources: { type: 'array', items: { type: 'string' } }
    }},
    som: { type: 'object', properties: {
      yr1: { type: 'string' },
      yr2: { type: 'string' },
      yr3: { type: 'string' },
      assumptions: { type: 'string' }
    }},
    tailwinds: { type: 'array', items: { type: 'string' } },
    risks: { type: 'array', items: { type: 'string' } },
    competitorBenchmarks: { type: 'array', items: { type: 'string' } },
    recommendedDatabases: { type: 'array', items: { type: 'string' } }
  },
  required: ['tam', 'sam', 'som']
}
```

### Phase 2 — Premium Database Research

**Agent type:** parallel agents with Chrome MCP browser automation per database

**Authentication pattern (UoM OpenAthens):**
```
Each database requires OpenAthens SSO via:
  https://go.openathens.net/redirector/unimelb.edu.au?url=[ENCODED_DATABASE_URL]

To find the correct URL for each database:
1. Navigate to http://cat.lib.unimelb.edu.au/search~S31
2. Search for the database name
3. Use JavaScript to extract the access link:
   document.querySelectorAll('a[href]')

Known record URLs:
- Statista:     http://cat.lib.unimelb.edu.au/record=e1001563~S31
- GlobalData:   http://cat.lib.unimelb.edu.au/record=e1000597~S30
- IBISWorld AU: http://cat.lib.unimelb.edu.au/record=e1001026~S31
- Euromonitor:  http://cat.lib.unimelb.edu.au/record=e1001041~S31
  (Correct OpenAthens URL: go.openathens.net/redirector/unimelb.edu.au?url=https%3A%2F%2Fwww.portal.euromonitor.com%2Fportal)
- Fitch Connect (BMI): navigate direct to bmi.fitchsolutions.com after OpenAthens
```

**Per-database prompt pattern:**
```
You are a market research analyst with access to [DATABASE_NAME].

Navigate to [DATABASE_URL] and search for data on [VENTURE MARKET KEYWORDS].

Extract:
1. Total market size (USD or AUD, specify year)
2. Segment breakdown relevant to [VENTURE] (by geography, buyer type, or product category)
3. Market growth rate (CAGR, forecast period)
4. Key market drivers and restraints named in the report
5. Any competitor revenue or market share data
6. Any country-specific data for [TARGET GEOGRAPHY]

For every data point extracted, record:
- Exact value
- Report name
- Publisher
- Year published
- Page/section reference

If you cannot find directly relevant data, record what you searched for and what was available.

CRITICAL: respond ONLY by calling the StructuredOutput tool. No prose outside the tool call.
```

**Output schema per database:**
```javascript
const DB_FINDINGS_SCHEMA = {
  type: 'object',
  properties: {
    database: { type: 'string' },
    accessStatus: { type: 'string', enum: ['full-access', 'partial', 'blocked', 'not-found'] },
    dataPoints: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          metric: { type: 'string' },
          value: { type: 'string' },
          source: { type: 'string' },
          year: { type: 'string' },
          notes: { type: 'string' }
        },
        required: ['metric', 'value', 'source']
      }
    },
    searchTermsUsed: { type: 'array', items: { type: 'string' } },
    gaps: { type: 'string' }
  },
  required: ['database', 'accessStatus', 'dataPoints']
}
```

### Phase 3 — Institutional Databases

Same browser automation pattern applied to OECD iLibrary, World Bank DataBank, IMF eLibrary, and sector-specific sources (QILT for Australia, HESA for UK, NCES for US).

**Key sources confirmed for HE market:**
- IMF SDN/2024/001: AI exposure data (60% advanced economy jobs), open access at imf.org
- OECD Education at a Glance 2024: Graduate employment rates, attainment, NEET
- World Bank WDI: Tertiary GER by country (SE.TER.ENRR), enrollment counts, education spend as % GDP
- QILT: Australian graduate employment and salary data by field and institution

### Phase 4 — Synthesis Agent

**Prompt:**
```
You have access to market research findings from [N] databases in a file at /tmp/market-findings.json.

Read the file and synthesise:

1. REVISED ESTIMATES — updated TAM/SAM/SOM based on the full evidence set, with tier-1 citations replacing any Perplexity estimates where premium data is available

2. KEY NEW FINDINGS — data points that were not in the initial estimate and materially change the picture (flag with ★)

3. VALIDATION STATUS — for each initial assumption: Confirmed / Revised / Contradicted

4. SOURCES TABLE — numbered, all sources from all phases, with: [N] | Author/Publisher | Title | Year | Data Used

5. DATA GAPS — what is still missing and where to find it

Write this as an addendum to the existing document (v[N+1].0). Match the house style of compass-market-sizing.md: evidence-heavy, inline citations as (Source [N]), honest about what's estimated vs confirmed.

CRITICAL: respond ONLY by calling the StructuredOutput tool. No prose outside the tool call.
```

### Document House Style

File: `docs/compass-market-sizing.md`

Structure:
```markdown
---
prepared-by: David Mulholland + Claude
date: YYYY-MM-DD
version: X.0
builds-on: compass-problem-tree.md, compass-vision.md
---

# 📊 COMPASS Market Sizing

## Executive Summary
[3-4 bullet points: TAM, SAM, SOM headline numbers]

## Methodology
[Top-down + bottom-up hybrid explanation]

## TAM — Total Addressable Market
[Definition, estimate, rationale, sources]

## SAM — Serviceable Addressable Market
[Segmentation rationale, estimate, sources]

## SOM — Serviceable Obtainable Market
[3-year projection with assumptions, comps]

## Market Tailwinds
[Numbered list with citations]

## Risks and Constraints
[Numbered list]

## Competitor Revenue Benchmarks
[Table: Company | ARR | Source | Year]

## Sources
[Numbered list, all sources]

---
*Addendum v[N].0 — [date]*
[Additional findings from subsequent research round]
```

---

## 2. Competitor Intelligence Workflow

### Purpose
Build a comprehensive, evidence-graded intelligence file on a single competitor. Covers company profile, product capabilities, AI maturity, customer base, pricing, messaging, and competitive differentiation.

### Architecture
Two-phase workflow: research first, write second.

```
Phase 1: Web research (parallel agents across dimensions)
Phase 2: Document synthesis (single agent writes full competitor doc)
```

### Phase 1 — Research Agents (parallel)

Run 4-6 parallel agents, each scoped to a specific research dimension:

**Agent A — Company Profile:**
```
Research [COMPANY NAME]'s company profile.

Find:
- Founding year and story
- Total funding raised (all rounds, investors, dates)
- Current ownership (private/public/PE-backed — name the firm)
- CEO and CTO (name, appointment date, LinkedIn)
- Approximate headcount (source the estimate)
- HQ location and any offices
- Revenue or ARR (any estimates from GetLatka, Crunchbase, SaaStr, etc.)
- Market share estimate and category position

Use web search. Cite every claim with source URL and date.

CRITICAL: respond ONLY by calling the StructuredOutput tool.
```

**Agent B — Product:**
```
Research [COMPANY NAME]'s product capabilities for [PRODUCT NAME].

Find:
- Core product features (what it does, not marketing claims)
- What the product explicitly does NOT do (critical — find the gaps)
- AI/ML features: what is shipped vs announced vs absent
- Technical architecture clues (integrations, APIs, known tech stack)
- Any documentation on AI limitations or roadmap
- Recent product releases or announcements (last 12 months)

Focus on factual capability, not marketing language.

CRITICAL: respond ONLY by calling the StructuredOutput tool.
```

**Agent C — Customers & Market:**
```
Research [COMPANY NAME]'s customer base.

Find:
- Total customer count (exact or range, with source)
- Named customers (especially any in [TARGET GEOGRAPHY])
- Market share estimate and ranking in the category
- Geographic distribution of customers (% by region if available)
- Any case studies or testimonials that reveal implementation details
- Customer review sentiment (G2, Capterra — average rating, common complaints)

CRITICAL: respond ONLY by calling the StructuredOutput tool.
```

**Agent D — Pricing:**
```
Research [COMPANY NAME]'s pricing.

Find:
- Published pricing (URL if exists)
- Any pricing from public contracts, RFP responses, or procurement databases
- Pricing structure (per seat / per institution / tiered)
- Implementation or onboarding costs mentioned
- Any pricing comparison vs competitors
- Contract length norms (annual / multi-year)

If no public pricing exists, note what sources were checked and what was not found.

CRITICAL: respond ONLY by calling the StructuredOutput tool.
```

**Agent E — Messaging & Positioning:**
```
Research [COMPANY NAME]'s marketing messaging and competitive positioning.

Find:
- Current homepage headline and primary value proposition
- Key claims made in marketing (with evidence or lack thereof)
- How they position against competitors (who do they name or imply)
- Recent press releases or blog posts that reveal strategic direction
- Any white papers or thought leadership that show how they frame the problem
- Analyst or media coverage framing

CRITICAL: respond ONLY by calling the StructuredOutput tool.
```

**Research output schema (shared across all agents):**
```javascript
const RESEARCH_SCHEMA = {
  type: 'object',
  properties: {
    dimension: { type: 'string' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          claim: { type: 'string' },
          confidence: { type: 'string', enum: ['high', 'medium', 'low', 'unverified'] },
          source: { type: 'string' },
          sourceUrl: { type: 'string' },
          date: { type: 'string' }
        },
        required: ['claim', 'confidence', 'source']
      }
    },
    gaps: { type: 'array', items: { type: 'string' } },
    keyInsight: { type: 'string' }
  },
  required: ['dimension', 'findings']
}
```

### Phase 2 — Document Synthesis Agent

**Prompt:**
```
Research findings for [COMPANY] are in /tmp/competitor-[name]-research.json.

Read the file and write a comprehensive competitor intelligence document.

Follow this EXACT structure:

## Executive Summary
[5 bullet points: the five most important facts a founder needs to know about this competitor]

## Company Profile
[Founding, funding (all rounds), ownership, CEO/CTO with dates, headcount, HQ]

## Product
### What It Does
[Core capabilities — factual, not marketing]
### AI Maturity
[Rating: Early / Developing / Mature / Advanced, with rationale]
### What It Does NOT Do
[Critical gaps — specific, evidence-backed]
### Recent Releases
[Last 12 months of product news]

## Customers & Market Position
[Total count, market share, geography breakdown, named customers, G2/Capterra rating]

## Pricing
[What's known, with source; what's not known and why]

## Messaging & Positioning
[Current value prop, key claims, how they frame the problem]

## Competitive Gap Analysis
[Table: Dimension | [COMPANY] | [OWN PRODUCT] | COMPASS Advantage]
[Include 8-10 dimensions most relevant to the competitive decision]

## [OWN PRODUCT] Positioning Against [COMPANY]
### One-Sentence Differentiation
[Single sentence that captures the fundamental difference — not marketing speak]
### Win Scenarios
[When does [OWN PRODUCT] beat [COMPANY]? Be specific about the buyer situation]
### Loss Scenarios
[When does [COMPANY] beat [OWN PRODUCT]? Be honest]
### Objection Handling
[3-5 objections a buyer will raise, with response]

## Intelligence Gaps
[Table: Gap | Why It Matters | Priority (High/Medium/Low) | Recommended Action]

---
Style: evidence-heavy, specific dates and numbers, no vague claims. If a fact is unconfirmed, mark it explicitly. Match the house style of docs/competitor-coursedog.md.

CRITICAL: respond ONLY by calling the StructuredOutput tool.
```

### Output Schema (Phase 2):
```javascript
const COMPETITOR_DOC_SCHEMA = {
  type: 'object',
  properties: {
    executiveSummary: { type: 'string' },
    companyProfile: { type: 'string' },
    product: { type: 'string' },
    customers: { type: 'string' },
    pricing: { type: 'string' },
    messaging: { type: 'string' },
    gapAnalysis: { type: 'string' },
    positioning: { type: 'string' },
    intelligenceGaps: { type: 'string' }
  },
  required: ['executiveSummary', 'companyProfile', 'product', 'gapAnalysis', 'positioning']
}
```

### Output File
`docs/competitor-[company-slug].md`

---

## 3. AI Feature Review Workflow

### Purpose
Produce detailed AI feature PRDs for multiple competing products, a comparative capability matrix, and prioritised recommendations for the venture's own product.

### Architecture
Four sequential phases.

```
Phase 1: Per-product AI research (parallel)
Phase 2: PRD writing per product (parallel)
Phase 3: Gap analysis synthesis
Phase 4: Improvement recommendations
```

### Phase 1 — AI Research Per Product (parallel)

**Prompt per product:**
```
Research [PRODUCT NAME]'s AI and machine learning features.

Find:
- All shipped AI/ML features (currently in production)
- Beta or preview AI features
- Publicly announced AI roadmap items
- GenAI integrations (LLM providers used, APIs integrated)
- Technical documentation on ML approaches (white papers, engineering blogs)
- What AI features are explicitly absent or out of scope
- Customer reviews mentioning AI capabilities or limitations
- How they frame AI in their marketing (vs what's actually built)

Distinguish clearly between:
- "Shipped": confirmed in production, customers using it
- "Beta": limited availability, public announcement
- "Announced": on the roadmap, not yet available
- "Absent": notable gap vs category expectation

CRITICAL: respond ONLY by calling the StructuredOutput tool.
```

### Phase 2 — PRD Writing Per Product (parallel)

**Prompt:**
```
AI research findings for [PRODUCT] are in /tmp/ai-research-[product].json.

Write a Product Requirements Document (PRD) for [PRODUCT]'s AI features.

Format each feature as:

### Feature: [Feature Name]
**Category:** [Automation / Analytics / NLP / LLM / Recommendation / etc.]
**Status:** [Shipped / Beta / Announced / Absent]
**User Story:** As a [role], I want [capability] so that [outcome]
**Acceptance Criteria:**
- [Specific, measurable criteria]
**Technical Approach:** [Known or inferred implementation]
**Limitations:** [What it doesn't do, known constraints]

After all features, add:

### AI Maturity Assessment
**Overall Rating:** [Early / Developing / Mature / Advanced]
**Rationale:** [2-3 sentence justification]
**Key AI Differentiators:** [What they do well]
**Key AI Gaps:** [What they're missing]

CRITICAL: respond ONLY by calling the StructuredOutput tool.
```

### Phase 3 — Comparative Gap Analysis

**Prompt:**
```
PRDs for all products are in /tmp/ai-prds.json.

Write a comparative AI capability matrix.

Score each product across these 15 dimensions on a 0-3 scale:
0 = Absent (feature category not present)
1 = Basic (rule-based or very limited)
2 = Functional (ML or reasonable AI capability)
3 = Advanced (GenAI, LLM, or market-leading capability)

Dimensions:
1. LLM / GenAI integration
2. Natural language processing
3. Predictive analytics / demand forecasting
4. Labour market intelligence
5. Automated scoring or assessment
6. Personalised recommendations
7. Document understanding / extraction
8. API / webhook integration for AI outputs
9. Visualisation intelligence
10. Curriculum analytics
11. Accreditation / compliance intelligence
12. Enrollment / demand forecasting
13. Graduate outcomes tracking
14. Scenario modelling / horizon analysis
15. Explainability / confidence scoring

Format as a table. After the table, write:
- "Where [OWN PRODUCT] leads" — specific advantages
- "Where [OWN PRODUCT] lags" — specific gaps
- "Category-level strategic observation" — one paragraph

CRITICAL: respond ONLY by calling the StructuredOutput tool.
```

### Phase 4 — Improvement Recommendations

**Prompt:**
```
The gap analysis is in /tmp/ai-gap-analysis.json.

Write prioritised improvement recommendations for [OWN PRODUCT].

For each recommendation:
- Priority: P1 Critical / P2 High / P3 Medium
- Feature name
- Description (what it is and what it does)
- Why it matters (which competitive gap it closes, which user problem it solves)
- Implementation complexity: Low / Medium / High
- Phase: 1 (0-3 months) / 2 (3-6 months) / 3 (6-12 months)
- Success metric

Organise by phase. Include:

1. Strategic AI Positioning Statement (2-3 paragraphs capturing the venture's AI differentiation vs the category — what question only your product answers)

2. Features [OWN PRODUCT] Should NOT Build (stay-in-lane boundaries — specific feature categories that would dilute positioning)

3. 3-Phase Roadmap Summary (one sentence per phase)

CRITICAL: respond ONLY by calling the StructuredOutput tool.
```

### Output Schema:
```javascript
const AI_REVIEW_SCHEMA = {
  type: 'object',
  properties: {
    prds: { type: 'string' },          // Full PRD text for all products
    gapAnalysis: { type: 'string' },   // Comparative matrix + observations
    recommendations: { type: 'string' } // Prioritised recs + roadmap
  },
  required: ['prds', 'gapAnalysis', 'recommendations']
}
```

### Output File
`docs/compass-ai-feature-review.md`

---

## 4. Systems Thinking Workflow

### Purpose
Apply Daniel H. Kim's systems thinking frameworks (Iceberg Model, reinforcing/balancing loops, Fixes That Fail archetype) to produce a one-pager that frames the venture's strategic intervention.

### Architecture
Two-phase: read source material, then synthesise.

```
Phase 1: Extract framework key concepts from source PDF/text
Phase 2: Apply to venture + write one-pager
```

### Phase 1 — Framework Extraction (if PDF available)

**Prompt:**
```
Read the systems thinking document at [FILE_PATH].

Extract:
1. The Iceberg Model — definition of each level (Events, Patterns, Systemic Structures, Mental Models, Vision)
2. Reinforcing loops — definition and canonical examples
3. Balancing loops — definition and how they create resistance to change
4. Delays — how they cause policy resistance
5. Fixes That Fail archetype — the structure and why it recurs
6. Working ON vs IN the system — the distinction and implications
7. Key leverage points for systemic change

Return as structured framework notes.

CRITICAL: respond ONLY by calling the StructuredOutput tool.
```

### Phase 2 — Application and Writing

**Prompt:**
```
Framework notes are in /tmp/systems-frameworks.json.
Venture context is in /tmp/venture-context.json (or: read docs/compass-problem-tree.md and docs/compass-vision.md).

Write a systems thinking analysis of [VENTURE].

Apply each framework directly to the venture's specific problem:

## The Iceberg (Events → Patterns → Systemic Structures → Mental Models → Vision)
[Map each level to the specific dysfunction [VENTURE] addresses — use real names and examples from the sector, not generic descriptions]

## The Broken Feedback Loop
[Describe the specific structural delay or missing feedback that creates the problem. Be precise about where the signal breaks down and why.]

## Fixes That Fail
[Apply the archetype: what is the "symptomatic fix" that currently makes the problem worse? Show the structure of the loop.]

## The Reinforcing Loop [VENTURE] Enables
[Map the positive reinforcing cycle that [VENTURE] creates once deployed — what starts to compound and why]

## Working ON the System
[What is [VENTURE] doing vs what institutions are doing? Why does the "working IN" mode perpetuate the problem?]

## Where [VENTURE] Intervenes
[Identify 2-3 specific leverage points in Kim's terms. Name what changes at each level of the iceberg.]

Closing paragraph:
[One direct, evidence-backed strategic conclusion. Should be the most quotable paragraph — says something true and non-obvious about the structural condition that creates the market opportunity.]

Style: analytical, direct. Reference the real sector (name the institutions, regulators, timelines where possible). No corporate buzzwords. The conclusion should feel like it was written by someone who actually understands the sector.
```

### Output File
`docs/compass-systems-thinking.md`

---

## 5. Transcript → Positioning Workflow

### Purpose
Extract strategic insights from stakeholder content (podcast, interview, talk, paper) and use them to subtly update the venture's marketing copy — incorporating the language and framing without quoting or naming the source.

### Architecture
Two sub-tasks (can run in same session, not necessarily a formal Workflow):

```
Task 1: Analyse transcript/content — extract key messages
Task 2: Update marketing files with the themes
```

### Task 1 — Content Analysis

**Prompt:**
```
Analyse this content from [DESCRIPTION OF SOURCE — e.g. "a podcast episode featuring a higher education curriculum expert"].

Source content: [TRANSCRIPT / SUMMARY / KEY QUOTES]

Extract:
1. Key themes relevant to [VENTURE]'s value proposition (5-8 themes)
2. Specific problems or pain points named (verbatim phrasing where possible)
3. Language patterns and framings worth noting (the specific words they use to describe the dysfunction)
4. Claims that validate [VENTURE]'s thesis
5. Claims that challenge or complicate [VENTURE]'s thesis
6. New angles or perspectives not yet in [VENTURE]'s messaging

For each theme, note:
- The core insight
- Why it matters for [VENTURE]
- A paraphrase (not a quote) that could be incorporated into copy
```

### Task 2 — Positioning Update

**Prompt:**
```
Key themes from stakeholder content analysis:
[PASTE THEMES FROM TASK 1]

Current marketing files:
- [FILE 1 with key sections quoted]
- [FILE 2 with key sections quoted]

Update the marketing copy to resonate with these themes.

Rules:
1. Do NOT quote the source directly. Do NOT name them.
2. Changes must feel organic — no "inserted paragraph" feel
3. Prioritise using the source's own language patterns (paraphrased)
4. Make 3-5 specific targeted changes across the files
5. For each change, provide:
   - File and section
   - BEFORE text
   - AFTER text
   - Which theme it incorporates and why

Avoid: adding new sections, changing the fundamental argument, adding anything that would require the source to be cited for context.
```

### Files Typically Modified
```
compass/app/src/landing-page/components/Hero.tsx        — headline/subtitle
compass/app/src/landing-page/contentSections.tsx        — feature copy, FAQs
```

---

## 6. Stakeholder Materials Workflow

### Purpose
Draft outreach emails, calendar invites, innovation program applications, and other stakeholder-facing documents grounded in specific venture context.

### Outreach Email

**Prompt:**
```
Write an outreach email from [SENDER] to [RECIPIENT].

Sender context:
- Name: [NAME]
- Role: [ROLE AND INSTITUTION]
- Relationship to recipient: [e.g. "no prior connection", "met briefly at X", "saw their podcast"]

Recipient context:
- Name: [NAME]
- Role: [ROLE AND INSTITUTION]
- What they care about (based on their public work): [2-3 points]
- What specifically from their work you're referencing: [SPECIFIC REFERENCE — podcast episode, paper, talk]

Email purpose:
- Primary ask: [SPECIFIC LOW-FRICTION ASK — demo, 20-min call, coffee]
- Venture pitch in one sentence: [SINGLE SENTENCE]

Constraints:
- Under 250 words
- Opens with specific reference to their work (shows you actually engaged)
- One sentence connecting their insight to the venture thesis
- Specific, low-friction ask in the final line
- No marketing language
- No "I hope this email finds you well" openers
- No bullet points — flowing prose
- Sounds like a human colleague, not a pitch deck
```

### Calendar Invite Body

**Prompt:**
```
Write the body of a calendar invite for a meeting between [PERSON A] and [PERSON B].

Meeting type: [coffee / demo / advisory conversation]
Duration: [30 / 45 / 60 minutes]
Context: [What the meeting is for — be specific]

Constraints:
- Friendly and collaborative in tone
- Concise — 3-4 short paragraphs maximum
- No agenda formatting (bullet points, numbered lists, section headers)
- Reads like a human wrote it for a colleague, not an automated invite
- Should set expectations without over-structuring
- End with something that signals the conversation is low-stakes and exploratory
```

### Innovation Program Application

**Prompt:**
```
Write an application for [PROGRAM NAME] for [VENTURE].

Venture summary for context: [3-4 sentence description]

Answer the following questions:

[Q1 — e.g. "Describe the situation and problem (200 words)"]
[Q2 — e.g. "Why are you the right person to work on this? (150 words)"]
[Q3 — e.g. "What have you done in the last month? (150 words)"]
[Q4 — e.g. "What do you want from this program? (150 words)"]

For each question:
- Lead with the strongest claim or most concrete fact
- Support with specific evidence (not vague assertions)
- Use plain language — no consultant jargon
- Hit the word limit but don't exceed it
- Sound like a founder who has done the work, not a proposal writer

Additional guidance:
- Don't open any answer with the venture name
- Avoid "I believe" or "I think" — be declarative
- Use numbers wherever possible (metrics, timeframes, counts)
- The committee will read 50 applications — be memorable in the opening line of each answer
```

---

## 7. Deeper Perspective & Mental-Models Workflow

### Purpose
Run the MEC Define Step 3 systems deep-dive: a full descent through Daniel Kim's iceberg (events → patterns → systemic structures → mental models → vision) for the market a venture operates in. It surfaces the systemic structures that hold the market in place, the prevailing mental models beneath them, adversarially pressure-tests the highest-leverage beliefs, and runs a generate-and-judge panel to land a corroborated market-future vision. The output is an honest map of which beliefs are actually movable and where the durable levers of change sit.

### Architecture
Four phases. Phases 1, 2 and 4 fan out parallel agents and then funnel through a single consolidation/synthesis agent; Phase 3 is an adversarial gate between the mental-model set and the vision step. Data passes between phases as JSON, persisted to `/tmp/*.json` so a later phase (or a recovery re-run) can read it cold.

```
Phase 1: Systemic Structures   5 parallel lenses
         goals&tensions · power&value · dynamism&opportunity-points · control-points · external-forces
              │  (-> /tmp/compass-systemic.json)
              ▼
Phase 2: Mental Models         4 parallel stakeholder vantages
         leadership · faculty · students&employers · vendors&regulators&funders
              │
              ▼  single consolidation agent: dedup + rank by leverage -> 8-16 models
              │  (-> /tmp/compass-mm.json)
              ▼
Phase 3: Verify                top ~6 models, 1 adversarial skeptic agent each (parallel)
              │  (downgrades leverage where shift-evidence is thin)
              ▼
Phase 4: Vision (generate-and-judge)
         4 parallel candidate visions (different angles)
              │
              ▼  3 parallel judges score each vision 1-5 x5 criteria
              │
              ▼  aggregate scores -> rank angles -> synthesise the blend
```

A single shared `CONTEXT` preamble (the venture description + the market-system map + the list of prior repo docs + "use WebSearch only for current external facts, repo docs are primary; your returned object IS the data") is prepended to every Phase 1/2 agent. The recovery run uses a condensed one-paragraph `MARKET` preamble plus a `HARD` output rule appended to every prompt.

### Phase 1 — Systemic Structures (5 parallel lenses)

Five lenses run concurrently. Four return `POINTS_SCHEMA`; the dynamism lens returns `OPPORTUNITY_SCHEMA`. Each prompt is `CONTEXT` + the lens body below.

**Prompt (Lens A — goals & tensions):**
```
YOUR LENS: STAKEHOLDER GOALS & SYSTEMIC TENSIONS.
Reflect on what EACH organisation or group in the system is trying to achieve, then find where the system's current STRUCTURE turns those goals into challenges, frustrations or tensions a venture could address. Cover at least: university leadership, curriculum designers/program directors, faculty, students, employers, accreditors/regulators, curriculum-management vendors, LMI vendors, government funders.
For each "point": name the actor(s), what they want, and the structural tension that produces frustration or unmet need. Surface NON-OBVIOUS conflicts between goals (e.g. enrolment-volume funding vs graduate-outcome quality).
Most relevant docs to read first: {stakeholder-analysis}, {problem-tree}, {systems-thinking}.
```

**Prompt (Lens B — power & value left on the table):**
```
YOUR LENS: POWER CONCENTRATION & VALUE LEFT ON THE TABLE.
Answer two questions deeply: (1) Where does one group hold a lot of power or influence over the others (gatekeepers, data monopolies, standard-setters, budget-holders, accreditors)? (2) Where are the significant inefficiencies or value "left on the table" — work duplicated, signals that exist but never reach decision-makers, willingness-to-pay that is unmet, value created but captured by the wrong party?
For each "point": name who holds the power or where the trapped value sits, the mechanism, and the size/consequence. Use figures where the docs provide them (market sizing, contract values, margins).
Most relevant docs: {stakeholder-analysis}, {competitive-strategic-intelligence}, {market-sizing}.
```

**Prompt (Lens C — stagnant vs dynamic + innovation opportunity points):**
```
YOUR LENS: STAGNANT vs DYNAMIC + INNOVATION OPPORTUNITY POINTS.
Step 1 — classify which parts of this market are STAGNANT (monopoly/duopoly control, cartel-like behaviour, stringent regulation, no sign of startup investment) vs DYNAMIC (many funded startups, frequent changes in market leadership, external forces forcing change). Be specific about WHICH sub-market.
Step 2 — apply the innovation-opportunity-point test. RED FLAGS (caution, not always fatal): highly commoditised, strong competition driving prices to cost / low margins, very large CAPEX to enter, stagnant area. POSITIVE SIGNALS: an area where knowledge/IP/data can create scarcity & influence/power; high margins possible even at low scale/volume; not trivial to copy an innovation; market is dynamic & evolving (now or in future).
Use targeted WebSearch for CURRENT signals: recent funding/valuations/M&A for [incumbents]; new AI-curriculum entrants 2024-2026; ed-tech VC activity.
Then list the top opportunity points (where a new innovation could feasibly exert control & influence).
Most relevant docs: the competitor-*.md files, {competitive-strategic-intelligence}, {market-sizing}.
```
> This lens calls WebSearch for live funding/M&A signals. Per the project's web-search hardening rule, a web-searching agent should return SCHEMA-LESS markdown rather than a constrained tool call; the `OPPORTUNITY_SCHEMA` below documents the target shape the synthesis step expects, and the consolidation/write step re-imposes it.

**Prompt (Lens D — control points):**
```
YOUR LENS: CONTROL POINTS FOR INNOVATION.
Identify the points in the system where a NEW innovation could feasibly exert control and influence over the market — chokepoints where owning a position confers durable advantage. Consider at least: the data/signal layer (who owns the labour-market->curriculum signal), the curriculum-design workflow itself, a NEW certification/trust/standard ("durability" or "AI-resilience" certification analogous to a sustainability certifier), skills-ontology/taxonomy ownership, the integration layer between LMI and curriculum-management systems, and the institutional decision/governance bottleneck.
For each "point": describe the control point, why it is defensible (network effects, IP, data scarcity, switching costs, standard-setting), and what would have to be true to own it.
Most relevant docs: {systems-thinking}, {competitive-strategic-intelligence}, {ai-feature-review}, {discover-proposal}.
```

**Prompt (Lens E — external forces & direction):**
```
YOUR LENS: EXTERNAL FORCES & DIRECTIONAL CHANGE (where is the system heading?).
Identify the external forces acting on this system now and over the next 2-5 years, and which DIRECTION each pushes the system. Consider: AI disruption of entry-level graduate jobs; the HE financial crisis (deficits, job cuts); regulatory shifts (TEQSA/QAA AI guidance, assessment reform); demographic & enrolment shifts; employer dissatisfaction & skills-based hiring; the rise of micro-credentials & alternative providers; defunding of sector T&L infrastructure; ranking/prestige dynamics.
For each "point": name the force, its current trajectory & evidence (cite figures/sources), and the directional implication for where the market is heading. This feeds the later VISION step — emphasise feasible near-future shifts.
Use targeted WebSearch for 2025-2026 developments. Most relevant docs: {problem-tree}, {council-alignment}, {research-plan}.

CRITICAL: respond ONLY by calling the StructuredOutput tool. No prose outside the tool call.
```
> Lenses E and C use WebSearch; the schema-less-markdown hardening rule applies to them. Lenses A, B and D do not search and end every prompt with the CRITICAL line above. The five results are written to `/tmp/compass-systemic.json`.

**Output schema (`POINTS_SCHEMA` — lenses A, B, D, E):**
```javascript
const POINTS_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['lens', 'summary', 'points'],
  properties: {
    lens: { type: 'string' },
    summary: { type: 'string', description: '2-4 sentence headline answer for this lens' },
    points: {
      type: 'array', minItems: 4,
      items: {
        type: 'object', additionalProperties: false,
        required: ['heading', 'explanation', 'evidence', 'soWhat'],
        properties: {
          heading: { type: 'string' },
          explanation: { type: 'string' },
          evidence: { type: 'string', description: 'specific facts, figures, doc references, or sources' },
          soWhat: { type: 'string', description: 'why this matters for finding a venture opportunity / lever of change' },
        },
      },
    },
  },
}
```

**Output schema (`OPPORTUNITY_SCHEMA` — lens C):**
```javascript
const OPPORTUNITY_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['summary', 'stagnantAreas', 'dynamicAreas', 'redFlags', 'positiveSignals', 'topOpportunityPoints'],
  properties: {
    summary: { type: 'string' },
    stagnantAreas: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['area', 'why'], properties: { area: { type: 'string' }, why: { type: 'string' } } } },
    dynamicAreas: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['area', 'why', 'signal'], properties: { area: { type: 'string' }, why: { type: 'string' }, signal: { type: 'string', description: 'concrete signal e.g. funding, new entrant, M&A, regulation' } } } },
    redFlags: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['area', 'flag'], properties: { area: { type: 'string' }, flag: { type: 'string', description: 'commoditised / low-margin / high-CAPEX / stagnant' } } } },
    positiveSignals: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['area', 'signal'], properties: { area: { type: 'string' }, signal: { type: 'string', description: 'knowledge/IP/data scarcity & power / high margin at low scale / hard to copy / dynamic & evolving' } } } },
    topOpportunityPoints: { type: 'array', minItems: 3, items: { type: 'object', additionalProperties: false, required: ['point', 'rationale'], properties: { point: { type: 'string' }, rationale: { type: 'string' } } } },
  },
}
```

### Phase 2 — Mental Models (4 parallel vantages → 1 consolidation agent)

Four agents surface prevailing beliefs from four stakeholder vantages (each returns `MM_SCHEMA`), receiving the Phase 1 result inline as grounding input. A single consolidation agent then dedups and ranks them by leverage into one list of 8+ models (`CONSOLIDATED_SCHEMA`), written to `/tmp/compass-mm.json`.

The four vantages: `leadership/councils/governance & accreditation`, `faculty / disciplinary identity & academic culture`, `students (and families) & employers as the demand side`, `incumbent software vendors, LMI vendors, regulators, rankings bodies & government funders`.

**Prompt (per vantage):**
```
YOUR TASK: surface the PREVAILING MENTAL MODELS (beliefs, assumptions, values) held FROM THE VANTAGE OF {WHO} that shape why this market system looks and behaves the way it does. Markets are made of people; it is their mental models that hold the systemic structures in place.

The systemic-structure analysis already completed is provided below as INPUT — use it to ground your mental-model claims, but go deeper than it does:
{systemic structures JSON}

Existing docs already name three mental models (accreditation-compliance = quality; academic rigour = value independent of economic relevance; employer dissatisfaction = a lagging indicator). Do NOT just repeat these — extend, sharpen, and add NEW ones specific to your vantage. For each model give: the belief (as a sentence), who holds it, why it persists, concrete evidence it is (or is not yet) shifting, what becomes possible if it flips, and disruptive potential.
Read {systems-thinking} and {problem-tree} if you have not. Return 3-6 models.

CRITICAL: respond ONLY by calling the StructuredOutput tool. No prose outside the tool call.
```

**Prompt (consolidation agent):**
```
YOUR TASK: CONSOLIDATE mental models. Below are mental-model lists produced from four stakeholder vantages. Merge duplicates, resolve overlaps, and produce a single DEDUPLICATED, RANKED list of the distinct prevailing mental models shaping this market system. Rank by LEVERAGE for disruption (1 = highest): a model has high leverage if it is widely load-bearing AND there is a feasible path for it to shift. Assign each a short kebab-case id. Return at least 8 distinct models.

INPUT (four vantages):
{four-vantage JSON}

CRITICAL: respond ONLY by calling the StructuredOutput tool. No prose outside the tool call.
```

**Output schema (`MM_SCHEMA` — per vantage):**
```javascript
const MM_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['vantage', 'models'],
  properties: {
    vantage: { type: 'string' },
    models: {
      type: 'array', minItems: 3,
      items: {
        type: 'object', additionalProperties: false,
        required: ['belief', 'heldBy', 'whyItPersists', 'evidenceItIsShifting', 'ifChangedThen', 'disruptivePotential'],
        properties: {
          belief: { type: 'string', description: 'the unexamined belief/assumption/value, stated as a sentence' },
          heldBy: { type: 'string' },
          whyItPersists: { type: 'string' },
          evidenceItIsShifting: { type: 'string', description: 'concrete signals it is starting to change, or "none observed"' },
          ifChangedThen: { type: 'string', description: 'what becomes possible / what value unlocks if this model flips' },
          disruptivePotential: { type: 'string', enum: ['high', 'medium', 'low'] },
        },
      },
    },
  },
}
```

**Output schema (`CONSOLIDATED_SCHEMA` — consolidation agent; dedup to 8-16 ranked models):**
```javascript
const CONSOLIDATED_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['models'],
  properties: {
    models: {
      type: 'array', minItems: 8,
      items: {
        type: 'object', additionalProperties: false,
        required: ['id', 'belief', 'heldBy', 'whyItPersists', 'shiftSignals', 'ifChangedThen', 'disruptivePotential', 'leverageRank'],
        properties: {
          id: { type: 'string', description: 'short kebab-case id' },
          belief: { type: 'string' },
          heldBy: { type: 'string' },
          whyItPersists: { type: 'string' },
          shiftSignals: { type: 'string' },
          ifChangedThen: { type: 'string' },
          disruptivePotential: { type: 'string', enum: ['high', 'medium', 'low'] },
          leverageRank: { type: 'number', description: '1 = highest leverage for disruption' },
        },
      },
    },
  },
}
```

### Phase 3 — Verify (adversarial pressure-test of the top models)

Sort the consolidated models by `leverageRank` and take the top ~6. One skeptic agent per model runs in parallel (`VERIFY_SCHEMA`). In the hardened recovery run each agent reads `/tmp/compass-mm.json`, finds its model by `id`, and is explicitly told **not** to browse the web — it reasons from the model's own fields, the condensed market context, and its own knowledge — so the verdict is reproducible. This step is the honesty gate: it routinely downgrades "high-leverage" beliefs to medium/low when the shift-evidence is weak.

**Prompt (per model, hardened):**
```
TASK: Read the file /tmp/compass-mm.json (a JSON array of mental models). Find the object whose "id" is "{id}". Adversarially PRESSURE-TEST that one mental model. Be a skeptic. Decide: (1) is it genuinely a widely-held prevailing belief in this market, not a strawman? (2) how strong is the evidence it is actually SHIFTING right now (vs wishful thinking)? Give the STRONGEST counter-evidence that it is durable and will NOT shift in 2-5 years. (3) what is the realistic leverage for a new venture IF it shifts? Default toward skepticism where evidence is thin. Reason from the model's own fields plus the market context and your own knowledge — do NOT browse the web.

CRITICAL OUTPUT RULE: Respond ONLY by calling the StructuredOutput tool with exactly the fields specified in your schema. Do NOT write any prose, preamble, reasoning, or explanation outside the tool call. Your entire reply must be the single StructuredOutput tool call. Do this on your FIRST action after reading the file — do not narrate.
```

**Output schema (`VERIFY_SCHEMA`):**
```javascript
const VERIFY_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['id', 'isRealPrevailingBelief', 'shiftEvidenceStrength', 'counterEvidence', 'leverage', 'verdict'],
  properties: {
    id: { type: 'string' },
    isRealPrevailingBelief: { type: 'boolean', description: 'true if this is genuinely a widely-held belief, not a strawman' },
    shiftEvidenceStrength: { type: 'string', enum: ['strong', 'moderate', 'weak', 'none'] },
    counterEvidence: { type: 'string', description: 'the strongest case this belief is durable / will NOT shift' },
    leverage: { type: 'string', enum: ['high', 'medium', 'low'], description: 'realistic leverage for a new venture if this model shifts' },
    verdict: { type: 'string', description: '2-3 sentence calibrated judgement on how usable this is as a lever of change' },
  },
}
```

### Phase 4 — Vision (generate-and-judge)

Generate N candidate market-future visions from different angles, score them with an independent judge panel, then aggregate and synthesise the blend. Four angles run in parallel (`VISION_SCHEMA`): `learner / graduate-outcome centred`, `institutional curriculum agility`, `labour-market integration`, and `trust, certification & standards`. Each vision agent reads `/tmp/compass-mm.json` (ranked models, `leverageRank` 1 = highest) and may read `/tmp/compass-systemic.json`. Then three judges each score every vision 1-5 on five criteria (`JUDGE_SCHEMA`). The script aggregates per-angle totals (`challengesModel + clear + strong + feasible + isVisionNotSolution`, /25), ranks the angles, and the judges' `synthesisSuggestion` fields drive the final blended statement written into `docs/compass-vision.md`.

**Prompt (per vision angle):**
```
TASK: Read the file /tmp/compass-mm.json (a JSON array of ranked mental models; leverageRank 1 = highest leverage). You may also read /tmp/compass-systemic.json for systemic context. Write ONE candidate VISION for the FUTURE OF THIS MARKET, from the {angle} angle.

RULES (from the MEC venture framework — follow strictly):
- A vision is what you imagine the MARKET will look like in the future. It is NOT a solution and must NOT describe what a venture will DO to get there. Good examples: "All food packaging will be non-toxic and 100% biodegradable or recyclable within 10 years." / "Accelerate the world's transition to sustainable energy." If a venture pivots, the vision must still stand.
- A good vision CHALLENGES a prevailing mental model and is CLEAR, STRONG and FEASIBLE. Horizon 2-5 years typical (up to 10 for deep change).
- Pick which mental model(s) from the file your vision overturns (name them by id), and list the systemic tensions / forces it rides in "leverages".

CRITICAL OUTPUT RULE: Respond ONLY by calling the StructuredOutput tool with exactly the fields specified in your schema. Do NOT write any prose, preamble, reasoning, or explanation outside the tool call. Your entire reply must be the single StructuredOutput tool call. Do this on your FIRST action after reading the file — do not narrate.
```

**Prompt (per judge, panel of 3):**
```
TASK: You are judge #{n} on a panel scoring candidate VISIONS for the future of this market. Score EACH vision below 1-5 on: challengesModel (overturns a prevailing mental model), clear, strong, feasible, and isVisionNotSolution (5 = pure market-future statement; 1 = a thinly veiled product pitch that would break on a pivot). One-line comment per vision. Then name the single best angle and suggest how to BLEND the best elements across visions into one stronger vision. Judge independently and critically — the most ambitious is not automatically the best; feasibility and "is it a vision not a solution" matter as much as boldness.

CANDIDATE VISIONS (JSON):
{visions JSON}

CRITICAL OUTPUT RULE: Respond ONLY by calling the StructuredOutput tool with exactly the fields specified in your schema. Do NOT write any prose, preamble, reasoning, or explanation outside the tool call. Your entire reply must be the single StructuredOutput tool call. Do this on your FIRST action after reading the file — do not narrate.
```

**Output schema (`VISION_SCHEMA` — per angle):**
```javascript
const VISION_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['angle', 'vision', 'challengesMentalModel', 'whyClearStrongFeasible', 'timeHorizon', 'leverages'],
  properties: {
    angle: { type: 'string' },
    vision: { type: 'string', description: 'A market-FUTURE statement, NOT a solution/product. What the market will look like. 1-3 sentences.' },
    challengesMentalModel: { type: 'string', description: 'which prevailing mental model it overturns' },
    whyClearStrongFeasible: { type: 'string' },
    timeHorizon: { type: 'string' },
    leverages: { type: 'array', items: { type: 'string' }, description: 'systemic tensions / mental models / dynamic forces the vision rides' },
  },
}
```

**Output schema (`JUDGE_SCHEMA` — per judge; scores ≥4 visions, recommends a blend):**
```javascript
const JUDGE_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['scores', 'recommendedAngle', 'synthesisSuggestion'],
  properties: {
    scores: {
      type: 'array', minItems: 4,
      items: {
        type: 'object', additionalProperties: false,
        required: ['angle', 'challengesModel', 'clear', 'strong', 'feasible', 'isVisionNotSolution', 'comment'],
        properties: {
          angle: { type: 'string' },
          challengesModel: { type: 'number', description: '1-5: does it challenge a prevailing mental model' },
          clear: { type: 'number' },
          strong: { type: 'number' },
          feasible: { type: 'number' },
          isVisionNotSolution: { type: 'number', description: '1-5: 5 = pure market-future, 1 = thinly veiled product pitch' },
          comment: { type: 'string' },
        },
      },
    },
    recommendedAngle: { type: 'string' },
    synthesisSuggestion: { type: 'string', description: 'how to blend the best elements across visions into one stronger vision' },
  },
}
```

The runner returns `{ systemic, mentalModelsByVantage, consolidatedMentalModels, verifiedMentalModels, visions, judgePanel, visionRanking }`. The vision-recovery variant (verify + vision + judge only) reads the persisted `/tmp/compass-mm.json` and `/tmp/compass-systemic.json` and returns `{ verified, visions, judges, visionRanking }`, where `visionRanking` is each angle's average judge total out of 25, descending.

### Output File
`docs/compass-deeper-perspective.md` — the systemic-structures table, innovation opportunity points, the consolidated mental-model set with its post-verification leverage downgrades, the corroborated vision, and the deliverable problems-and-levers table. The Phase 4 blended vision also updates `docs/compass-vision.md` (the Step 3 vision checkpoint this deep-dive expands and corroborates).

---

## 8. Validate Workflow (MEC Define Step 5)

### Purpose
Produce the expert-interview + market-signals execution pack that converges desk research on the single opportunity hypothesis worth building. Takes the Vision's primary opportunity (its two load-bearing assumptions) and the Research Plan's eight falsifiable questions, decomposes them into falsifiable hypotheses, scores the venture against the MEC market-signals framework, builds a 20+ warm-first expert-target list, and generates the outreach templates, per-archetype interview guides, insight-capture template, and after-4–5-interviews decision rule. The defining discipline: **aim to be proven wrong** — design every artefact to let experts break the venture, not flatter it.

This workflow was run inline (no script). The architecture below is a faithful four-phase reconstruction from the structure of `docs/compass-validate.md`, consistent with the other harness sections.

### Architecture
Four-phase workflow: hypotheses first, then the signals scorecard, then the target list, then the outreach-and-interview kit. Phases 1 and 2 are schema-constrained reasoning over carried-forward desk research; Phase 3 cross-references the Expert/Target Sourcing workflow and may use web search (schema-less); Phase 4 assembles ready-to-send collateral. **Execution reality:** Phases 1, 2 and 4 are single-agent synthesis tasks (run them in sequence, or in chat) — they do not need fan-out; only Phase 3 genuinely benefits from the [Expert/Target Sourcing](#11-expert--target-sourcing-workflow) parallel fan-out. A final compose step then assembles all four outputs into the house-style `compass-validate.md`.

```
Inputs: Vision (2 load-bearing assumptions) + Research Plan (8 falsifiable Qs)
   │
Phase 1: Hypothesis decomposition  → H0 + H1–H4, map each to FQs   → /tmp/validate-hypotheses.json
   │
Phase 2: Market-signals scorecard  → 8 signals, RAG, "hole to poke" → /tmp/validate-scorecard.json
   │   (Phases 1+2 agree on where risk concentrates = the amber cells)
   │
Phase 3: Expert-target list        → 20+ targets, warm-first waves  → schema-less markdown (web search)
   │   (cross-references Expert/Target Sourcing workflow)
   │
Phase 4: Outreach + interview kit  → templates · guides · capture · decision rule
   │
Synthesis → docs/compass-validate.md
```

### Phase 1 — Hypothesis Decomposition

Decompose the Vision's primary opportunity into falsifiable sub-hypotheses, and tie each to the eight priority falsifiable questions from `research-plan.md`. H1 (demand) and H2 (trust/standing) are the **load-bearing** assumptions the Vision flagged; H3 (willingness-to-pay) and H4 (unoccupied adjacency) are the commercial and structural conditions that must also hold. The convergence test is the output that matters: it defines what "survive Step 5" means.

**Prompt:**
```
You are running MEC Define Step 5 (Validate) for the COMPASS venture. The Vision
(compass-vision.md) narrowed COMPASS to ONE primary opportunity and TWO load-bearing
assumptions. The Research Plan (research-plan.md) contains EIGHT priority falsifiable
questions (FQ1–FQ8). Both are read into context.

Validation is only meaningful against claims that can be FALSIFIED. Restate the venture
as testable hypotheses, each paired with the evidence that WOULD CHANGE OUR MINDS.

1. State the primary opportunity hypothesis (H0) in one sentence: that universities,
   students, employers and regulators lack a trusted, independent, evidence-based measure
   of whether a degree will retain its economic value in an AI-augmented labour market —
   and that a comparable "durability signal", available at the point of design, approval
   and enrolment, is valuable enough that institutions will adopt and pay for it.

2. Decompose H0 into FOUR falsifiable sub-hypotheses. The first two are the LOAD-BEARING
   ones from the Vision; the second two are the commercial/structural conditions:
   - H1 — Demand (load-bearing): decision-makers genuinely WANT a durability signal they
     can be held to — not just a board-table talking point.
   - H2 — Trust & standing (load-bearing): an INDEPENDENT layer can earn enough authority
     for its signal to become EXPECTED (the way Health Star, B Corp, Moody's, AACSB did).
   - H3 — Buyer & willingness-to-pay: a DVC (Education/Academic) holds a recognised budget
     line and delegated authority (typ. A$100–250k) to buy curriculum intelligence DISTINCT
     FROM existing careers/IR LMI subscriptions.
   - H4 — Unoccupied adjacency: the Stage-3→Stage-4 gap (LMI data never reaches the
     curriculum decision) is genuinely unoccupied — TechnologyOne/CourseLoop has no LMI
     roadmap closing it.

3. For EACH of H1–H4 specify, precisely and concretely:
   - "We are WRONG if…" — the specific expert verdict that would refute it.
   - Which of FQ1–FQ8 tests it.
   - Which MEC market signal it loads onto.

4. State the CONVERGENCE TEST: COMPASS survives Step 5 if H1 AND H2 hold under expert
   pressure AND at least one of H3/H4 holds. If H1 or H2 fails, the Vision's central bet
   fails and we loop back — to a different stakeholder, framing, or aspect of this market.

Be specific and falsifiable. Vague hypotheses are useless here.

CRITICAL: respond ONLY by calling the StructuredOutput tool. No prose outside the tool call.
```

**Output schema:**
```javascript
const HYPOTHESES_SCHEMA = {
  type: 'object',
  properties: {
    primaryOpportunity: {
      type: 'object',
      properties: {
        id: { type: 'string' },                 // "H0"
        statement: { type: 'string' }
      },
      required: ['id', 'statement']
    },
    subHypotheses: {
      type: 'array',
      minItems: 4,
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },               // "H1".."H4"
          name: { type: 'string' },             // "Demand", "Trust & standing", ...
          loadBearing: { type: 'boolean' },     // true for H1 & H2
          statement: { type: 'string' },
          wrongIf: { type: 'string' },          // the falsifying expert verdict
          testedByFQ: {                         // which of FQ1–FQ8
            type: 'array',
            items: { type: 'integer', minimum: 1, maximum: 8 }
          },
          signalItLoads: { type: 'string' }     // the MEC market signal it maps to
        },
        required: ['id', 'name', 'loadBearing', 'statement', 'wrongIf', 'testedByFQ']
      }
    },
    convergenceTest: { type: 'string' }         // the survive/loop-back rule
  },
  required: ['primaryOpportunity', 'subHypotheses', 'convergenceTest']
}
```

### Phase 2 — Market-Signals Scorecard

Score COMPASS against the MEC framework's eight market signals. For each: an honest read, a RAG rating, the strongest evidence *for*, and — the single most useful output — **the hole to ask experts to poke**, which converts each signal into an interview probe. The MEC bar is "ideally none are clearly false", so a red on any signal is a stop sign. The phase closes by mapping the amber signals back onto the load-bearing hypotheses from Phase 1, so the scorecard and the hypotheses agree on where the risk concentrates.

**Prompt:**
```
Hypotheses from Phase 1 are in /tmp/validate-hypotheses.json. The COMPASS evidence base
(problem-tree, systems-thinking, market-sizing, stakeholder, competitive-intelligence,
vision, council-alignment) is read into context.

The MEC framework offers EIGHT market signals as criteria. They need not ALL be true — but
if any is CLEARLY FALSE, that is a sign the opportunity isn't there. Give the honest read
on COMPASS from the desk research to date.

Score these eight signals (use these exact names):
1. New / emerging
2. Sizeable (TAM)
3. Solvable by this team
4. Overlooked
5. Clearly defined customers
6. Tailwinds > headwinds
7. Systemic disruption potential
8. Innovation can enter & scale

For EACH signal provide:
- compassRead: the honest one-line read (do not inflate; name the weakness if there is one).
- rag: 🟢 green / 🟡 amber / 🔴 red.
- strongestEvidenceFor: the most specific, citable fact supporting it (numbers, dates,
  named entities — e.g. "CMS peer category $2.1–3.0B (2024), growing 12.5–15.5%";
  "TechnologyOne owns AU's dominant CMS with no LMI partner across 19+ months";
  "142 DVCs (AU, 2024) hold delegated authority A$100–250k").
- holeToPoke: the single sharpest question to put to experts to try to FALSIFY this signal
  (e.g. for "New/emerging": "Haven't we heard the skills-gap / align-to-industry pitch for
  20 years? What's actually new now?").

Then write the scorecard summary:
- Count greens/ambers/reds; state whether this clears the MEC bar ("ideally none are
  clearly false").
- Map the amber signals back onto the load-bearing hypotheses: defined-customers + tailwinds
  ⇒ H1 (demand) + H3 (willingness-to-pay); systemic-disruption + entry-&-scale ⇒ H2 (trust
  & standing). The interview programme must attack precisely those amber cells.

CRITICAL: respond ONLY by calling the StructuredOutput tool. No prose outside the tool call.
```

**Output schema:**
```javascript
const SCORECARD_SCHEMA = {
  type: 'object',
  properties: {
    signals: {
      type: 'array',
      minItems: 8,
      maxItems: 8,
      items: {
        type: 'object',
        properties: {
          signal: { type: 'string' },           // one of the 8 MEC signal names
          compassRead: { type: 'string' },
          rag: { type: 'string', enum: ['green', 'amber', 'red'] },
          strongestEvidenceFor: { type: 'string' },
          holeToPoke: { type: 'string' }         // the interview probe
        },
        required: ['signal', 'compassRead', 'rag', 'strongestEvidenceFor', 'holeToPoke']
      }
    },
    summary: {
      type: 'object',
      properties: {
        greenCount: { type: 'integer' },
        amberCount: { type: 'integer' },
        redCount: { type: 'integer' },
        clearsMecBar: { type: 'boolean' },       // true iff redCount === 0
        amberToHypothesisMap: { type: 'string' },// which ambers ⇒ which of H1–H4
        whereRiskConcentrates: { type: 'string' }
      },
      required: ['greenCount', 'amberCount', 'redCount', 'clearsMecBar']
    }
  },
  required: ['signals', 'summary']
}
```

### Phase 3 — Expert-Target List (warm-first waves)

Build the 20+ expert-target list, weighted toward warm channels and every row mapped to a hypothesis or falsifiable question. This phase **cross-references the Expert/Target Sourcing workflow** for the per-target sourcing method — where a row names a *role* rather than a person, the sourcing method *is* the instruction. Work outward in three waves so the ~30–50% who say yes still yields a dozen conversations. Because identifying and verifying named individuals uses web search, this phase returns **SCHEMA-LESS markdown** (the project's hardening rule for web-search phases) rather than calling StructuredOutput; the markdown is the artefact written into the pack.

**Prompt (returns markdown, NOT a schema):**
```
Hypotheses (/tmp/validate-hypotheses.json) and the scorecard (/tmp/validate-scorecard.json)
are available. The stakeholder analysis (named players + decision authority) and
council-alignment (the warm-intro lever) are read into context. You may use web search to
surface and verify candidates.

Build a target list of AT LEAST 20 experts to interview. Strategy: WARM-FIRST, and use the
unfair advantage — (1) you are INSIDE the buyer institution (Associate Director, Service
Experience & Design, University of Melbourne) with warm pathways to T&L, careers, IR and the
HE-research centres; (2) University Council has INDEPENDENTLY raised the venture's questions,
so Council members are the warmest possible intro to the most important "yes".

Organise into THREE waves:
- Wave 1 — Warm & internal (University of Melbourne): start here. ~8 targets.
- Wave 2 — Warm via UniMelb / sector networks (2nd-degree intros): ~7 targets.
- Wave 3 — Cold, high-value (vendor / regulator-adjacent / interstate): ~7 targets.

Weight the list so the four AMBER scorecard cells are all covered. Make the single most
consequential conversation explicit (TechnologyOne GM–Curriculum: is the unoccupied
adjacency about to close? — tests H4, FQ2).

Return a MARKDOWN table per wave with columns:
  # | Target | Why them | Tests (Hn / FQn) | How to find / verify

Rules:
- For the sourcing/verification METHOD per target, cross-reference the Expert/Target Sourcing
  workflow. Where a cell names a ROLE rather than a person, the sourcing method IS the
  instruction.
- Roles change: every named individual must be flagged "verify on LinkedIn / Find an Expert
  before contacting"; mark anyone likely to have moved roles.
- End with a one-line count confirming you are past the MEC "20+" bar and every row maps to
  a hypothesis or FQ.

Do NOT call StructuredOutput — this phase uses web search, so return schema-less markdown.
```

**Output:** schema-less markdown (three wave tables + the 20+ confirmation line). Written verbatim into the "Who to speak to" section of the pack.

### Phase 4 — Outreach + Interview Kit

Assemble the ready-to-send collateral: outreach templates for each channel (warm / intro-request / cold / LinkedIn / follow-up / decline), per-archetype interview guides structured **Learn → Challenge → Probe**, an insight-capture template, and the after-4–5-interviews decision rule. Every artefact encodes the discipline: open by telling the expert you want them to poke holes; close by asking what you didn't ask and who else to speak to (so outreach becomes self-driving).

**Prompt:**
```
Hypotheses, scorecard, and the wave-organised target list are available
(/tmp/validate-*.json and the Phase 3 markdown). Generate the outreach-and-interview kit,
filled with the real COMPASS context. Founder: David Mulholland, Associate Director, Service
Experience & Design, University of Melbourne (david.mulholland@unimelb.edu.au). Venture
one-liner: "a trusted, independent measure of whether a degree will retain its economic value
in an AI-augmented labour market — available at the point of design, approval and enrolment."

Produce:

1. OUTREACH TEMPLATES — one per channel, each short, ONE clear ask, university email,
   explicit "this is NOT a sales pitch", a soft out, italic personalise-me fragments, and a
   booking-link placeholder:
   A. Warm (someone you know)
   B. Intro request (2nd-degree, to a mutual)
   C. Cold email
   D. LinkedIn connection request (<200 characters)
   E. LinkedIn follow-up (after they accept)
   F. No-reply follow-up (once, ~1 week later)
   G. Graceful "no" reply (ask for a referral, then move on)

2. INTERVIEW GUIDES — Learn → Challenge → Probe, one per buyer-side archetype, each tied to
   the hypotheses it tests:
   - Universal must-asks (every interview): an opening line that explicitly invites
     hole-poking; "What didn't I ask that I should have?"; "Who else should I be speaking
     to?"; "If you were betting, would you bet AGAINST us? Why?"
   A. DVC (Education/Academic) / Director of T&L — the buyer — tests H1, H3
   B. Program Director / academic who's been through a review — the user — tests H1, FQ1/FQ8
   C. IR/IE & Careers/Employability — the data holders — tests H4, FQ6
   D. CMS / LMI vendor — the gatekeeper & adjacency — tests H4, FQ2
   E. Regulator-adjacent / peak body / accreditation — standing — tests H2, FQ5/FQ7
   For each: 2–3 Learn questions (how the process actually works), 2–3 Challenge questions
   (attempts to refute the relevant hypothesis), 2–3 Probe questions (budget line, authority,
   what evidence would convince).

3. INSIGHT-CAPTURE TEMPLATE — one fixed block to fill per interview: name/role/org, date,
   channel, warm/cold, hypotheses + FQs tested, VALIDATED signals, INVALIDATED/challenged
   (the most valuable field), net effect per hypothesis (H1–H4 ↑/↓/—), surprises/new angles,
   "what didn't I ask" answer, referrals given, and which scorecard cell moved and which way.
   Note: write up IMMEDIATELY — if the insight isn't recorded, the interview may as well not
   have happened.

4. DECISION RULE — after ~4–5 interviews, reassess:
   - Confidence BUILDING: one hypothesis survives every attempt to break it and amber signals
     turn green → complete the MEC end-of-course form and book the MEC team to progress.
   - Confidence COLLAPSING across ALL hypotheses: a GOOD outcome (saved years) → loop back to
     a new stakeholder, framing, or aspect of this same market, carrying everything learned.

Match the house style of the existing COMPASS workbook docs (docs/compass-vision.md,
docs/research-plan.md): direct, second-person, evidence-anchored, no filler.

CRITICAL: respond ONLY by calling the StructuredOutput tool. No prose outside the tool call.
```

**Output schema:**
```javascript
const INTERVIEW_KIT_SCHEMA = {
  type: 'object',
  properties: {
    outreachTemplates: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },               // "A".."G"
          channel: { type: 'string' },           // "warm", "intro-request", "cold", ...
          subject: { type: 'string' },           // omit for LinkedIn DMs
          body: { type: 'string' },              // italic personalise-me fragments inline
          charCount: { type: 'integer' }         // required for the <200-char LinkedIn request
        },
        required: ['id', 'channel', 'body']
      }
    },
    interviewGuides: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },                // "A".."E"
          archetype: { type: 'string' },         // "DVC / Director of T&L (the buyer)"
          testsHypotheses: { type: 'array', items: { type: 'string' } },  // ["H1","H3"]
          learn: { type: 'array', items: { type: 'string' } },
          challenge: { type: 'array', items: { type: 'string' } },
          probe: { type: 'array', items: { type: 'string' } }
        },
        required: ['id', 'archetype', 'testsHypotheses', 'learn', 'challenge', 'probe']
      }
    },
    universalMustAsks: {
      type: 'object',
      properties: {
        open: { type: 'string' },                // the explicit "poke holes" invitation
        closeWhatDidntIAsk: { type: 'string' },
        closeWhoElse: { type: 'string' },        // makes outreach self-driving
        closeBetAgainst: { type: 'string' }
      },
      required: ['open', 'closeWhatDidntIAsk', 'closeWhoElse']
    },
    captureTemplate: { type: 'string' },         // the fixed per-interview block
    decisionRule: {
      type: 'object',
      properties: {
        interviewCheckpoint: { type: 'integer' },          // ~4–5
        confidenceBuilding: { type: 'string' },            // condition + action
        confidenceCollapsing: { type: 'string' }           // the "good outcome" + loop-back
      },
      required: ['confidenceBuilding', 'confidenceCollapsing']
    }
  },
  required: ['outreachTemplates', 'interviewGuides', 'universalMustAsks', 'captureTemplate', 'decisionRule']
}
```

### Output File
`docs/compass-validate.md`

---

## 9. Experiment Backlog Workflow

### Purpose
Convert the levers/problems from the [Deeper Perspective](compass-deeper-perspective.md) (P1–P12) into a **prioritised, falsifiable experiment backlog** welded onto the [Validate](compass-validate.md) interview programme (hypotheses H1–H4, the 22-target list, interview guides A–E, the eight falsifiable questions FQ1–8). Each lever becomes an experiment with a riskiest-assumption ("we're wrong if…"), a method (including **artifact-reaction tests** — show a real COMPASS output and watch what they *do*), a mapped interviewee + guide, the hypothesis/FQ it loads, and an explicit kill/refute signal. The whole set is then tiered (P0 settle-first / P1 de-risk / P2 moat) by *existential-risk × time-sensitivity × cost-to-test*, sequenced onto the interview waves, given a decision rule, and checked for interview-list gaps.

### Architecture
Three-phase workflow: extract the levers, forge them into a coherent SET of falsifiable experiments, then prioritise and sequence. This workflow was run inline against the workbook (no script); the phases below are a faithful reconstruction. **Execution reality:** experiments are NOT 1:1 with levers — the real backlog produced **13 experiments from 12 levers**, where most experiments carry one primary lever, some bundle several (e.g. the gatekeeper experiment carries the severed-signal + OSCA-window + 19-month-silence levers), and a single lever can seed more than one. So Phase 2 is a synthesis over the whole lever set — run it as one capable agent over all levers (simplest, and how it was actually done), or as a per-lever fan-out you then DEDUPE — not a forced one-experiment-per-lever pipeline. Phase 1 and Phase 3 read prior docs and emit schema-constrained output.

```
Phase 1: Lever extraction        (read deeper-perspective.md → P1–P12 + the load-bearing assumptions)
Phase 2: Experiment forge        (lever set → EXPERIMENT set, 1+ levers each: riskiest assumption, method, mapped target, kill-signal)
Phase 3: Prioritise & sequence   (tiers P0/P1/P2 → waves → decision rule → flag interview-list gaps)
            │
            ▼
   docs/compass-experiment-backlog.md
```

### Phase 1 — Lever Extraction

Read the Deeper Perspective and lift out the deliverable list of problems/levers plus the assumptions they must be tested against. No web search — this is a pure read of an existing workbook doc.

**Prompt:**
```
Read docs/compass-deeper-perspective.md. Your job is to extract the raw material
for an experiment backlog — do NOT yet design experiments.

From the "Problems to address & Levers of change" table, extract every problem/lever
(P1 through P12). For each, capture:
- the id (P1…P12)
- the systemic tension / trapped value (the problem)
- the lever COMPASS can pull
- which prevailing belief it works WITH (the "Works with belief" column)
- the confidence rating as written (High / Med–High / Medium / Low)

Then, so the experiments can be mapped, also extract:
- the two load-bearing assumptions named at the end ("Demand"; "Trust & standing")
- the "single biggest risk" (the causal-evidence / empty-category problem, P12)
- the time-sensitive windows the doc flags (the 2026–27 TEQSA/ATEC/OSCA window,
  the TechnologyOne 19-month gatekeeper silence)
- the list of traps to avoid

Do not invent anything not in the source. Where a lever is flagged as time-boxed or
as a window that can close AGAINST the venture, mark it — that flag drives prioritisation later.

Write the extracted levers to /tmp/compass-levers.json.

CRITICAL: respond ONLY by calling the StructuredOutput tool. No prose outside the tool call.
```

**Output schema:**
```javascript
const LEVERS_SCHEMA = {
  type: 'object',
  properties: {
    levers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },                       // 'P1'…'P12'
          problem: { type: 'string' },                   // the systemic tension / trapped value
          lever: { type: 'string' },                     // what COMPASS can pull
          worksWithBelief: { type: 'string' },           // the belief it navigates/exploits/rides
          confidence: { type: 'string', enum: ['High', 'Med-High', 'Medium', 'Low'] },
          timeBoxed: { type: 'boolean' },                // window can close AGAINST the venture
          loadBearing: { type: 'boolean' }               // ties to H1/H2 (vs H3/H4 or a moat)
        },
        required: ['id', 'problem', 'lever', 'confidence']
      }
    },
    loadBearingAssumptions: { type: 'array', items: { type: 'string' } }, // 'Demand', 'Trust & standing'
    biggestRisk: { type: 'string' },                     // the causal-evidence / empty-category bet
    timeSensitiveWindows: { type: 'array', items: { type: 'string' } },
    trapsToAvoid: { type: 'array', items: { type: 'string' } }
  },
  required: ['levers', 'loadBearingAssumptions', 'biggestRisk']
}
```

### Phase 2 — Experiment Forge (per lever)

Forge the experiment SET from the full lever list in `/tmp/compass-levers.json`, mapping each experiment onto the Validate hypotheses, interview targets and guides. Most experiments carry one primary lever; some bundle several and a lever may seed more than one — so design the set holistically rather than mechanically one-per-lever. Run it either as a single synthesis agent over all levers (simplest, and how it was actually done — returns the experiment array), or as a per-lever fan-out that Phase 3 then DEDUPES into a coherent set; append each experiment to the `/tmp/compass-experiments.json` array. The discipline carried from Validate: *aim to be proven wrong* — every experiment must name what would kill it. The one upgrade over the verbal guides: **artifact-reaction tests** (show a real COMPASS output — e.g. a scored portfolio read — and record the reaction, a far stronger demand signal than "would you want this?").

**Prompt:**
```
You are forging the experiment SET from the levers. Read ALL of /tmp/compass-levers.json and
produce an ARRAY of experiments — usually one per lever, but BUNDLE levers that share a single
test and SPLIT a lever that needs more than one (the real backlog: 13 experiments from 12 levers).
Emit one object (the fields below) per experiment. (Alternatively, fan out one lever at a time —
pass {{LEVER}} — and let Phase 3 dedupe the set.)

Inputs:
- The levers: all of /tmp/compass-levers.json (or a single {{LEVER}} if fanned out)
- docs/compass-validate.md — the hypotheses (H1 Demand, H2 Trust & standing, H3 Buyer/WTP,
  H4 Unoccupied adjacency), the convergence test, the 22-target interview list, the five
  interview guides (A DVC/Dir T&L · B Program Director · C IR & Careers · D CMS/LMI vendor ·
  E Regulator-adjacent/peak body), and the universal closers.
- research-plan.md — the eight falsifiable questions FQ1–8.

Turn the lever into an experiment that an interview (or a desk pass) could PROVE WRONG.
Produce exactly these fields:

1. RISKIEST ASSUMPTION — the single belief that, if false, breaks the lever. Phrase the
   falsifier as "We're wrong if…" in the venture's own words.
2. HYPOTHESIS — which of H1/H2/H3/H4 this loads (the load-bearing H1/H2 outrank H3/H4).
   FQ — which falsifiable question(s) FQ1–8 it answers (or "—" for a desk experiment).
3. METHOD — the interview guide to run (A–E), AND where useful an ARTIFACT-REACTION TEST:
   name the real COMPASS output to put in front of them (e.g. a scored portfolio read with
   validated scores like B-DES 17/36, MC-IS 18/36; a discipline-specific redesign roadmap;
   a mock AACSB Std 4.1 / TEQSA-facing accreditation-evidence artefact) and state that the
   REACTION is the data. If the lever is best settled by desk work, say "Desk experiment"
   and describe the search/design, then name the researchers who validate the design.
4. MAPPED TARGETS — the specific interviewee(s) from the 22-list (by number and name/role)
   this experiment is run with.
5. PROBE — the exact question(s) to ask, in quotes, escalating Learn → Challenge → Probe.
6. KILL / REFUTE SIGNAL — write BOTH:
   - survivesIf: the observable that would let the lever stand (prefer an UNPROMPTED move
     toward a decision — "I'd take this to the portfolio committee" — over verbal assent).
   - killedIf: the observable that refutes it.
7. IF IT FAILS — the consequence and the pivot/loop-back (e.g. "H1 fails → re-frame
   faculty-facing only"; "gatekeeper closing → pivot to partner/acquisition-target posture").

Stay strictly inside what the two source docs support — do not invent targets, guides,
hypotheses or FQs that aren't in them. Map every experiment to a real row of the 22-list.

Append the result to /tmp/compass-experiments.json.

CRITICAL: respond ONLY by calling the StructuredOutput tool. No prose outside the tool call.
```

**Output schema:**
```javascript
const EXPERIMENT_SCHEMA = {
  type: 'object',
  properties: {
    id: { type: 'string' },                              // 'EXP-01'…'EXP-13'
    title: { type: 'string' },                           // e.g. 'Independent-score acceptance test'
    levers: { type: 'array', items: { type: 'string' } },// the P-ids this experiment carries
    hypothesis: { type: 'string', enum: ['H1', 'H2', 'H3', 'H4', 'H1/H2', 'H1/H3'] },
    fq: { type: 'array', items: { type: 'string' } },    // ['FQ1'] … or [] for a desk experiment
    riskiestAssumption: { type: 'string' },              // includes the "We're wrong if…" falsifier
    method: {
      type: 'object',
      properties: {
        guide: { type: 'string', enum: ['A', 'B', 'C', 'D', 'E', 'Desk', 'Mom-Test'] },
        artifactTest: { type: 'string' },                // the real COMPASS output to show; '' if none
        description: { type: 'string' }
      },
      required: ['guide', 'description']
    },
    mappedTargets: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          number: { type: 'string' },                    // '#16' on the 22-list
          who: { type: 'string' }                        // 'Brian Clark — GM Curriculum, TechnologyOne'
        },
        required: ['number', 'who']
      }
    },
    probe: { type: 'string' },                            // the exact question(s), quoted
    survivesIf: { type: 'string' },
    killedIf: { type: 'string' },
    ifItFails: { type: 'string' }                         // consequence + pivot / loop-back
  },
  required: ['id', 'title', 'levers', 'hypothesis', 'riskiestAssumption', 'method',
             'mappedTargets', 'survivesIf', 'killedIf', 'ifItFails']
}
```
> A single-pass Phase 2 returns an array of these objects (`{ experiments: [ … ] }`); a per-lever fan-out returns one experiment each and Phase 3 dedupes them into the final set.

### Phase 3 — Prioritise & Sequence

Read the full experiment array and tier it, sequence it onto the interview waves, attach the decision rule, and flag any gap where an experiment has no interviewee on the 22-list. No web search — this is reasoning over `/tmp/compass-experiments.json`. (Where a flagged gap requires *sourcing* real new targets — e.g. the EXP-13 employer list — that is its own web-search pass that returns SCHEMA-LESS markdown per the hardening rule, not this schema.)

**Prompt:**
```
Read /tmp/compass-experiments.json (all experiments) and /tmp/compass-levers.json.
Prioritise, sequence, and stress-test the backlog. Do not redesign the experiments.

PRIORITISE into three tiers using THREE factors in this order:
  (1) existential risk — does failure reshape or kill the venture? The load-bearing
      H1/H2 experiments outrank H3/H4, which outrank the moats.
  (2) time-sensitivity — a window that can close AGAINST us (H4/the gatekeeper, the OSCA
      window) must be tested ASAP regardless of wave. Flag these with ⏱.
  (3) cost-to-test — warm internal interviews are cheap and fast; cold vendor/regulator
      ones are slow.
Tiers:
  - P0 settle-first: load-bearing (H1 OR H2) OR time-sensitive. Failure changes what we build.
  - P1 de-risk: the conditions that make the load-bearing assumptions operational
    (who pays, the union line, user pull, felt urgency).
  - P2 moat: matters for HOW we win, not WHETHER. Run once P0/P1 look green.

SEQUENCE onto the Validate-pack waves (from docs/compass-validate.md):
  - Wave 1 (warm-internal, this week), Wave 2 (2nd-degree), Wave 3 (cold high-value).
  Fast-track any ⏱ experiment out of its natural wave and say why.

DECISION RULE — carry the Validate convergence test verbatim ("COMPASS survives if H1 AND H2
hold and at least one of H3/H4 holds") and translate it into this backlog: name which
experiment failing means LOOP BACK vs PIVOT-WITHIN vs RESHAPE-GTM. Keep the three universal
closers ("What didn't I ask?" · "Who else?" · "Would you bet against us — why?").

FLAG INTERVIEW-LIST GAPS — any experiment whose mapped target is missing, weak, or absent
from the 22-list (e.g. no employer voice). For each gap, state the role-to-target and the
sourcing method; note that sourcing the actual named targets is a separate web-search pass.

Also produce a single at-a-glance backlog table:
  EXP | Experiment | Lever(s) | Hyp | FQ | Priority | Wave | Primary targets.

Assemble the full document and write it to docs/compass-experiment-backlog.md, following the
COMPASS workbook house style (a "What this is" blockquote up top; emoji section headers;
dense, evidence-led prose; every claim traceable to deeper-perspective.md or validate.md).

CRITICAL: respond ONLY by calling the StructuredOutput tool. No prose outside the tool call.
```

**Output schema:**
```javascript
const BACKLOG_SCHEMA = {
  type: 'object',
  properties: {
    glanceTable: { type: 'string' },                     // the EXP | … | Primary targets markdown table
    howPriorityWasSet: { type: 'string' },               // the existential-risk × time-sensitivity × cost-to-test rationale
    tiers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          tier: { type: 'string', enum: ['P0', 'P1', 'P2'] },
          label: { type: 'string' },                     // 'settle first' / 'de-risk the model' / 'sharpen the moat'
          experimentIds: { type: 'array', items: { type: 'string' } },
          rendered: { type: 'string' }                   // the full written-out experiments for this tier
        },
        required: ['tier', 'label', 'experimentIds', 'rendered']
      }
    },
    artifactTestsToPrepare: { type: 'string' },           // the 3 lightweight artifacts + which EXPs each serves
    sequencing: {
      type: 'object',
      properties: {
        wave1: { type: 'array', items: { type: 'string' } },
        wave2: { type: 'array', items: { type: 'string' } },
        wave3: { type: 'array', items: { type: 'string' } },
        fastTracked: { type: 'array', items: { type: 'string' } } // ⏱ experiments pulled forward
      },
      required: ['wave1', 'wave2', 'wave3']
    },
    decisionRule: { type: 'string' },                     // convergence test → loop-back / pivot-within / reshape-GTM
    interviewListGaps: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          gap: { type: 'string' },                        // e.g. 'No employer voice (EXP-13)'
          roleToTarget: { type: 'string' },
          sourcingMethod: { type: 'string' },
          status: { type: 'string', enum: ['open', 'filled', 'sourced-separately'] }
        },
        required: ['gap', 'roleToTarget', 'sourcingMethod']
      }
    }
  },
  required: ['glanceTable', 'howPriorityWasSet', 'tiers', 'sequencing', 'decisionRule', 'interviewListGaps']
}
```

### Output File
`docs/compass-experiment-backlog.md`

---

## 10. Evidence & Measurement Workflow

### Purpose
Pressure-test a single empirical claim a venture rests on — "is this category of evidence actually empty?" — and, if a gap is confirmed, design the study that would fill it. The workflow systematically searches the literature from multiple angles, adversarially verifies the empty-category claim (in both directions: don't under-search because an empty category flatters the venture, don't accept vendor marketing as evidence), generates and judges candidate measurement/study designs, and optionally drafts a registry-ready pre-registration with a frozen instrument. Built for COMPASS's highest-stakes claim (no causal study links labour-market-intelligence-informed curriculum revision to graduate outcomes), but the shape is reusable for any venture whose thesis hinges on a contested empirical fact.

### Architecture
Three phases. The load-bearing design choice is the **web-search → markdown, then reasoning → schema split**: every phase that touches the web returns schema-LESS markdown (search agents are unreliable at calling the StructuredOutput tool while also browsing), and every phase that imposes a schema runs as a reasoning agent with web search OFF, consuming the prior markdown as context. This separation is the hardening that makes the structured outputs reliable.

```
Phase 1: Systematic literature search  (5 angles, IN PARALLEL, web search ON → SCHEMA-LESS markdown)
   A1 peer-reviewed · A2 adjacent domains · A3 vendor/grey-lit · A4 methodology · A5 local-data specifics
        │  (markdown passed forward via /tmp/*.json)
        ▼
Phase 2: Reasoning  (web search OFF → SCHEMA)
   • Adversarial verify: "is the category empty?"        (VERIFY_SCHEMA)
   • Generate N measurement designs   (STRATEGY_SCHEMA × N) ──┐
        │                                                      ▼
        │                                          Judge the designs (JUDGE_SCHEMA)
        ▼
Phase 3 (optional): Study pre-registration
   frozen instrument + SHA-256 hash · predictive vs causal estimands kept separate · identification · ethics
        ▼
Output: docs/compass-exp04-causal-evidence.md  (+ docs/compass-exp04-preregistration.md)
```

### Phase 1 — Systematic Literature Search (parallel, schema-less)

Five agents run **in parallel**, each a different search angle on the same claim. All have **web search ON** and **return SCHEMA-LESS markdown** — no StructuredOutput schema is imposed here. Each prompt is prefixed with a shared context block (CTX) stating the claim under test, the venture, and the local-data vocabulary; the verdict line ("is the category empty?") is requested inline in markdown, not as a structured field. Rigorously distinguishing CAUSAL designs (RCT, difference-in-differences, regression discontinuity, instrumental variables, matched-cohort) from correlational/descriptive/satisfaction findings is demanded in every angle.

**Shared context (prepended to every Phase-1 prompt):**
```
COMPASS is an early-stage University of Melbourne venture: it scores university
PROGRAMS on AI-era labour-market "durability" (a 10+1-dimension rubric → a risk band)
and generates a curriculum-redesign roadmap. Prior research established a key claim:
the category "independently verified, CAUSALLY demonstrated outcome from
labour-market-intelligence(LMI)-informed curriculum revision" is EMPTY — i.e. no
peer-reviewed study causally shows that revising a curriculum using labour-market
intelligence improves graduate EMPLOYMENT or EARNINGS outcomes. This is simultaneously
COMPASS's biggest credibility risk and its highest-value research moat. EXP-04 is a desk
experiment to (a) SYSTEMATICALLY SEARCH whether that "empty category" claim is robust,
and (b) design a measurement protocol linking COMPASS durability scores to QILT graduate
outcomes. Australian context; QILT = Quality Indicators for Learning and Teaching (GOS
~4-6 months post-completion; GOS-Longitudinal GOS-L at 3 years; Employer Satisfaction
Survey ESS). Occupation coding is migrating ANZSCO→OSCA (ABS, Dec 2024). Today is {DATE}.
```

**Per-angle task (each appended to the shared context, then to the markdown-return instruction below):**
```
A1 — peer-reviewed:
Search the PEER-REVIEWED literature (education economics, higher-education studies,
ERIC, Google Scholar, NBER/IZA working papers) for any CAUSAL evidence that aligning or
revising a curriculum/program to labour-market intelligence improves graduate EMPLOYMENT
or EARNINGS outcomes. Rigorously distinguish CAUSAL designs (RCT, quasi-experiment,
difference-in-differences, regression discontinuity, instrumental variables, matched
comparison) from merely correlational/descriptive/satisfaction findings. For each
relevant study report: citation (authors, year, venue), design, the outcome studied, the
finding, causal strength, and limitations. Search hard across multiple query formulations
BEFORE concluding. End with an explicit verdict: is there ANY credible causal study, or is
the category empty?

A2 — adjacent proven domains:
Search ADJACENT domains where labour-market-aligned program change HAS been causally
evaluated and might transfer to higher education: US Career & Technical Education (Perkins
V outcomes), Texas HB 8 (2023) outcomes-based community-college funding, community-college
LMI governance (e.g. Dallas College LMIC), sector/industry-skills & apprenticeship
programs, workforce-board-aligned curricula, England's OfS B3 outcome conditions. For
each: citation/source, design, finding, causal strength, and how transferable it is to a
university degree context.

A3 — vendor/grey-lit (separate marketing from evidence):
Search VENDOR and grey literature for efficacy claims linking LMI-informed curriculum to
graduate/enrolment outcomes: Lightcast (Skillabi), Mapademics (+Coursedog), EAB, Gray
Decision Intelligence, Burning Glass Institute, QS, Faethm/Pearson, Hanover Research. For
each claim: who claims it, the specific number/outcome, and — CRITICALLY — whether it is
INDEPENDENTLY VERIFIED or vendor-published only (e.g. the St. Catherine "44% enrolment"
claim). Separate marketing from evidence and say so plainly.

A4 — causal-inference methodology:
Methodology scan: how have analogous "program characteristic → graduate outcome" CAUSAL
claims been credibly identified in education and labour research? Detail the candidate
designs (staggered-adoption / two-way fixed-effects difference-in-differences;
matched-cohort / propensity-score; regression discontinuity; instrumental variables;
prospective predictive-validity cohort), each design's DATA REQUIREMENTS, and the key
PITFALLS (selection bias, confounding by student ability/SES, secular labour-market
cycles, reverse causality, small-n at program level). This will feed a measurement-protocol
design — be concrete about what each design needs to be valid.

A5 — local data specifics:
[Australia] data specifics for a measurement protocol. Detail EXACTLY what QILT instruments
measure and at what granularity: GOS (~4-6 months) — full-time employment, labour-force
participation, further study; GOS-L (3 years) — employment/earnings/skills-utilisation; ESS;
SES. Cover: program/field-of-education vs institution-level granularity (and the
CIP/ASCED/field coding), how a university accesses its OWN unit-record data vs published
aggregates, latency/lag, sample sizes at program level, and how the ANZSCO→OSCA
occupation-classification migration (ABS Dec 2024; JSA OSCA profiles mid-2026) interacts
with linking a durability score to occupational outcomes. Note any ethics/data-governance
constraints on linking unit-record outcome data to a program-level score.
```

**Markdown-return instruction (appended to every Phase-1 task — this is the hardening, in place of a schema):**
```
Return well-structured MARKDOWN (no preamble). Use clear headings and, where relevant, a
table. Be specific and cite sources/URLs inline. This is one input to a larger desk
experiment; return the findings themselves, not a message to a human.
```

**Output schema:** none. Phase 1 is deliberately schema-less because the agents use web search — imposing the StructuredOutput tool on a browsing agent is what fails. The five markdown blobs (`peerReviewed`, `adjacentDomains`, `vendorGreyLit`, `methodology`, `australianData`) are written to `/tmp/exp04-search.json` and read by Phase 2.

### Phase 2 — Reasoning (verify the claim, design & judge the studies)

All Phase-2 agents have **web search OFF** and are **schema-constrained**. Each prompt ends with the hardening footer that forbids browsing and forces the tool call as the first action:

```
CRITICAL OUTPUT RULE: respond ONLY by calling the StructuredOutput tool with exactly the
schema fields. No prose outside the tool call. Reason from the material provided plus your
own knowledge — do NOT browse the web. Call the tool as your FIRST action.
```

**2a — Adversarial verification of the empty-category claim.** A single skeptic agent consumes the A1/A2/A3 markdown and decides whether the category is genuinely empty, naming the strongest near-miss and why it falls short.

**Prompt:**
```
{CTX}

YOUR TASK: adversarially VERIFY whether the "empty category" claim is robust, using the
search outputs below. Be a skeptic in BOTH directions: do not let the venture's wish (an
empty category = a moat) make you under-search, and do not accept vendor marketing as
evidence. Identify the single strongest near-miss and say precisely why it falls short of
causal proof; state what WOULD count; and name the search gaps that could still hide
evidence.

[A1 peer-reviewed]
{a1}

[A2 adjacent domains]
{a2}

[A3 vendor/grey-lit]
{a3}

CRITICAL: respond ONLY by calling the StructuredOutput tool. No prose outside the tool call.
```

**Output schema:**
```javascript
const VERIFY_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['categoryEmpty', 'strongestNearMiss', 'whyItFallsShort', 'whatWouldCountAsCausalEvidence', 'searchGaps', 'confidence', 'verdict'],
  properties: {
    categoryEmpty: { type: 'boolean', description: 'true if no credible CAUSAL study links LMI-informed curriculum revision to graduate outcomes' },
    strongestNearMiss: { type: 'string', description: 'the single closest piece of evidence found, with citation' },
    whyItFallsShort: { type: 'string', description: 'why even the strongest near-miss is not causal proof' },
    whatWouldCountAsCausalEvidence: { type: 'string', description: 'the bar a study must clear to count' },
    searchGaps: { type: 'string', description: 'what was NOT searched that could still hide evidence (databases, languages, grey lit)' },
    confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
    verdict: { type: 'string', description: '3-4 sentence calibrated conclusion on the empty-category claim' }
  }
}
```

**2b — Generate N measurement designs (one agent per design).** Run one agent per candidate design — here N = 3, each seeded with a fixed design type so the set spans the methodological space (staggered-adoption difference-in-differences; cross-sectional predictive-validity; prospective pilot-cohort). Each consumes the A4 (methodology) and A5 (local-data) markdown.

**Prompt (per design; the `{designSeed}` is substituted per agent):**
```
{CTX}

YOUR TASK: design ONE measurement strategy to test whether COMPASS durability scores
relate to / improve QILT graduate outcomes, using THIS design: {designSeed}

Ground it in the methodology and Australian-data notes below. Be concrete about
identification, the exact QILT data and granularity needed, confounders, validity threats
+ mitigations, Australian feasibility (access, sample size, ethics, timeline), and a
minimum-viable first version a pre-revenue startup could actually run.

[A4 methodology]
{a4}

[A5 Australian QILT data]
{a5}

CRITICAL: respond ONLY by calling the StructuredOutput tool. No prose outside the tool call.
```

The three design seeds passed in (verbatim):
```
design-did:        A staggered-adoption / two-way-fixed-effects DIFFERENCE-IN-DIFFERENCES
                   design: programs that undergo a COMPASS-informed redesign at different
                   times are the treated units; not-yet-treated programs are controls;
                   QILT GOS/GOS-L outcomes are the dependent variable.
design-predictive: A CROSS-SECTIONAL PREDICTIVE-VALIDITY design: correlate a program's
                   baseline COMPASS durability score against its subsequent QILT GOS/GOS-L
                   outcomes across many programs, with rich controls (field,
                   ATAR/selectivity, SES, institution) — establishing whether the score
                   PREDICTS outcomes before any causal-redesign claim.
design-prospective:A PROSPECTIVE PILOT-COHORT design: instrument a deliberately-chosen set
                   of programs from day one (store dimension-level scores at baseline),
                   apply COMPASS-informed redesign to some, and track forward to QILT
                   outcomes with a pre-registered matched comparison.
```

**Output schema (one object per design):**
```javascript
const STRATEGY_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['name', 'designType', 'researchQuestion', 'identificationStrategy', 'dataSources', 'keyConfounders', 'validityThreats', 'australianFeasibility', 'timeToSignal', 'minimumViableVersion'],
  properties: {
    name: { type: 'string' },
    designType: { type: 'string' },
    researchQuestion: { type: 'string' },
    identificationStrategy: { type: 'string', description: 'how causality is identified, concretely' },
    dataSources: { type: 'string', description: 'specific data incl. QILT instruments and COMPASS score storage' },
    keyConfounders: { type: 'string' },
    validityThreats: { type: 'string', description: 'internal + external validity threats and mitigations' },
    australianFeasibility: { type: 'string', description: 'realistic given QILT access, sample sizes, ethics, timelines' },
    timeToSignal: { type: 'string', description: 'how long until a first credible result' },
    minimumViableVersion: { type: 'string', description: 'the cheapest defensible first version a startup could run' }
  }
}
```

**2c — Judge the designs (generate-and-judge).** A methodologist agent scores all N designs on a fixed rubric and recommends a primary + a robustness check + a sequencing for a pre-revenue venture. The candidate designs are passed in as JSON (the StructuredOutput objects from 2b), not re-described.

**Prompt:**
```
{CTX}

YOUR TASK: you are a methodologist scoring three candidate measurement designs for linking
COMPASS durability scores to QILT graduate outcomes. Score each 1-5 on internalValidity,
australianFeasibility, timeToSignal, and credibilityToAccreditors (would TEQSA / AACSB / a
faculty body accept the result as evidence). Then recommend a PRIMARY design, a
ROBUSTNESS/triangulation design, the right SEQUENCING for a pre-revenue startup (cheapest
credible step first), and how to BLEND them into one staged measurement programme. Remember
the strategic point: the near-term goal is the FIRST credible signal that converts
"predicted durability" toward "validated durability", not a perfect causal estimate.

CANDIDATE DESIGNS (JSON):
{JSON.stringify(strategies)}

CRITICAL: respond ONLY by calling the StructuredOutput tool. No prose outside the tool call.
```

**Output schema:**
```javascript
const JUDGE_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['scores', 'recommendedPrimary', 'recommendedRobustnessCheck', 'sequencing', 'blendNote'],
  properties: {
    scores: {
      type: 'array', minItems: 3,
      items: {
        type: 'object', additionalProperties: false,
        required: ['name', 'internalValidity', 'australianFeasibility', 'timeToSignal', 'credibilityToAccreditors', 'comment'],
        properties: {
          name: { type: 'string' },
          internalValidity: { type: 'number', description: '1-5' },
          australianFeasibility: { type: 'number', description: '1-5' },
          timeToSignal: { type: 'number', description: '1-5 (5 = fastest credible result)' },
          credibilityToAccreditors: { type: 'number', description: '1-5 (would TEQSA/AACSB/faculty accept it)' },
          comment: { type: 'string' }
        }
      }
    },
    recommendedPrimary: { type: 'string', description: 'which design to run as the primary, and why' },
    recommendedRobustnessCheck: { type: 'string', description: 'which second design to run as a robustness/triangulation check' },
    sequencing: { type: 'string', description: 'what to run first given a pre-revenue startup (cheapest credible step → richer)' },
    blendNote: { type: 'string', description: 'how to combine the designs into one staged measurement programme' }
  }
}
```

### Phase 3 — Study Pre-Registration (optional)

When the verdict (2a) confirms a worth-filling gap and the judge (2c) has picked a primary design, a final reasoning agent drafts a registry-ready pre-registration (OSF / AEA convention). This phase is a single long-form authoring pass, not schema-constrained — it produces a standalone deliverable. It hardens the study against the two failure modes the desk experiment exposed:

- **Frozen instrument + cryptographic hash.** The predictor is the rubric *exactly as implemented at freeze*: score the programs on the catalogue as it stood at a declared baseline date, record the dimension vector / total / band / threshold answers, compute a **SHA-256 hash of the full frozen score table**, and lodge the hash + rubric definition publicly with a timestamp before any outcome data is touched. This defeats score→outcome leakage (circularity) — the single most important credibility safeguard — and the registration is itself an artefact accreditors reward, available before any result lands.
- **Predictive vs causal estimands kept rigidly separate.** "The score *forecasts*" (predictive validity) and "the redesign *causes*" (difference-in-differences ATT) are different estimands and are never conflated; every output table labels which is which. A null on either is pre-declared as a publishable confirmatory result.
- **Identification strategy.** Layer 1 = predictive-validity back-test on already-collected outcome data (calibration + discrimination + incremental ΔAUC/ΔR² over a confounder-only baseline); Layer 2 = staggered-adoption difference-in-differences via a heterogeneity-robust group-time ATT (Callaway & Sant'Anna 2021, not naïve two-way fixed effects), with an event-study pre-trends test, placebo-on-inputs, and few-cluster (wild-bootstrap + permutation) inference.
- **Ethics & governance.** The validation join happens at the individual record, so HREC secondary-use review is required (graduates consented to a survey, not to validating a commercial product); all joins run inside the partner institution's environment and unit records are never exported; outputs are aggregated and small-cell-suppressed; every classification input (e.g. ANZSCO→OSCA occupation coding) is version-pinned so a reclassification artefact cannot masquerade as a real effect.

The pre-registration also carries a **pre-lodgement checklist** of decisions that must be locked before registering (e.g. the exact scoring normalisation, the HREC pathway, the methodologist co-author, the blinded power simulation, the baseline catalogue date and cohort window, the registry choice) and an **amendments policy** (timestamped registry amendments; the frozen score hash is never changed).

### Output File
`docs/compass-exp04-causal-evidence.md` — the desk-experiment report: headline finding (the strict claim retired, the narrower moat that survives), the four-tier evidence map from Phase 1, the adversarial verdict from 2a, the scored design table and recommended staged programme from 2b/2c, the local-data constraints, and venture implications.

Optionally `docs/compass-exp04-preregistration.md` — the Phase-3 deliverable: an OSF/AEA-style, registry-ready pre-registration of the recommended staged predictive-validity + difference-in-differences study, with the frozen instrument, SHA-256 freeze procedure, separated estimands, analysis plan, validity safeguards, and ethics pathway.

---

## 11. Expert / Target Sourcing Workflow

### Purpose
Source named/role interview targets across the segments a venture needs to talk to, each with a warm-introduction path. Serves two demands at once: it fills the **Validate "20+ list"** ([compass-validate.md](compass-validate.md)) where a segment is missing (e.g. the interview list was institution-heavy with no hiring-employer voice), AND it sources the specific stakeholder any single experiment needs (e.g. EXP-13's employer targets in [compass-experiment-backlog.md](compass-experiment-backlog.md)). The defining constraint is an **accuracy rule**: roles change and web data goes stale, so the workflow prefers a `ROLE-TO-TARGET` + a concrete sourcing method over a possibly-outdated named individual, and flags any name it does emit `VERIFY ROLE BEFORE OUTREACH`. (This is "Track B" of the EXP-04/EXP-13 script — it runs alongside, but is independent of, the causal-evidence research track.)

### Architecture
Two phases: fan out one schema-less, web-searching sourcing agent per segment, then fund a single schema-constrained consolidation agent that dedups and ranks warm-first.

```
Phase 1: Parallel segment sourcing agents (one per sector/segment)
         — web search ON, return SCHEMA-LESS markdown tables
         — A1…An, each a "role-to-target | org | why-them | warm path | find/verify | verify-flag" table
                         │
                         ▼  (concatenated markdown, passed inline)
Phase 2: Consolidation agent (single, WITH schema)
         — dedup + rank WARM-FIRST → shortlist + sourcing caveat → TARGETS_SCHEMA
                         │
                         ▼
Output: rows appended to docs/compass-validate.md (the 20+ list)
        and/or docs/compass-experiment-backlog.md (the experiment's target table)
```

### Phase 1 — Parallel Segment Sourcing Agents

One agent per segment the venture must reach. Pick the segments from the gap: in the EXP-13 run the four were professional services, government/public sector, technology & finance, and warm-path intermediaries. Each agent runs with **web search ON** and returns **SCHEMA-LESS markdown** — per the project's hardening rule, an agent that browses returns a markdown table, not a StructuredOutput call. Every agent shares one context block and one fixed return-format instruction; only the `YOUR TASK` segment brief changes.

Shared context block (`CTX_B`) — carries the venture, the gap being filled, the user's warm-path institution, and the accuracy rule:
```
[VENTURE one-paragraph description — what it scores/does and its core axis.]
The [venture] interview list is [SEGMENT]-heavy and has NO [missing-voice] voice.
[EXPERIMENT-ID] needs [the specific role family — e.g. graduate-recruitment / early-careers /
emerging-talent / future-of-work leads] at [target population — e.g. Australian employers in
HIGH AI-exposure, GRADUATE-HEAVY sectors], to test [the 1-2 things the experiment tests].
[USER NAME] is [USER ROLE + INSTITUTION] — STRONGLY prioritise WARM paths ([the user's
institution's industry advisory boards, faculty-industry partnerships, careers employer
relationships, alumni]).
CRITICAL ACCURACY RULE: roles change and web data is stale — PREFER naming a specific
ROLE-TO-TARGET + a concrete sourcing method over a possibly-outdated individual; if you do
name a person, flag them explicitly "VERIFY ROLE BEFORE OUTREACH." Today is [DATE].
```

Per-segment task brief (one per agent — these are the four real EXP-13 briefs; generalise the sector and the relevance test to the venture):
```
SECTOR AGENT 1 — [primary segment, e.g. PROFESSIONAL SERVICES]:
Source [target-role] interview targets in [SECTOR] ([name the marquee orgs]). For each:
organisation, the specific ROLE-TO-TARGET (e.g. "Graduate Recruitment Lead ANZ", "Future of
Work / Emerging Talent Lead"), why they are well-placed to test [the venture's framing/test],
a concrete WARM-PATH hypothesis via [the user's institution] (advisory boards, alumni, careers
partnerships, firm–university programs), and how to find/verify the right person (LinkedIn
search string, careers page). Flag any named individual "VERIFY ROLE BEFORE OUTREACH". Prefer
role+method over stale names.

SECTOR AGENT 2 — [second segment, e.g. GOVERNMENT / PUBLIC SECTOR]:
Source [target-role] targets in [the segment's structured employers / programs]. Target ROLES:
[the specific role families]. (Distinct from [any data/policy contact already on the list] —
here we want [the role TYPE this experiment needs].) Same fields as agent 1: org, role-to-target,
why, warm path via [institution], find/verify method, verify-before-outreach flags.

SECTOR AGENT 3 — [third segment, e.g. TECHNOLOGY and FINANCE]:
Source [target-role] targets in [the segment] (high relevance because [the segment's roles are
the most exposed to the thing being tested]) ([name the marquee orgs]). Target ROLES: [role
families] and any "[adjacent capability]" roles. Same fields: org, role-to-target, why (esp.
[relevance to the test]), warm path via [institution], find/verify method, verify-before-outreach
flags.

INTERMEDIARY AGENT 4 — WARM-PATH INTERMEDIARIES:
Map WARM-PATH INTERMEDIARIES and [institution]-specific routes that can broker an introduction
to a [target stakeholder]: [peak bodies and their events; the institution's FACULTY industry
advisory boards; the institution's careers/employer-partnership team; precinct/industry partners;
work-integrated-learning programs]. For each route: what it is, which TYPE of target it reaches,
and the specific [institution] body/role [the user] could approach to get a warm intro. Goal is
warm ROUTES, not cold contacts.
```

Each agent closes with the fixed return-format instruction (this is what makes the output a uniform, mergeable table — and, being a web-search agent, it returns markdown, NOT a schema):
```
YOUR TASK: [the segment brief above]

Return well-structured MARKDOWN (no preamble) as a TABLE with columns:
Org | Role-to-target | Why them ([relevance to the test]) | Warm path via [institution] |
How to find/verify | Verify-before-outreach? Plus a short note on the 2-3 strongest
warm-first picks. Return the findings themselves, not a message to a human.
```

**Output schema:** none — Phase 1 agents use web search and therefore return **schema-less markdown** (per the hardening rule). Each agent's table is labelled with its segment (`### Source: [segment-label]`) and the labelled tables are concatenated into one markdown blob that is passed inline to Phase 2.

### Phase 2 — Consolidation Agent

A single agent, now **WITH a schema** and **no web search**, that reads the concatenated Phase-1 tables and produces one deduplicated, warm-first ranked shortlist plus the one-line sourcing caveat. It re-states the accuracy rule so the ranking and the named/role decision are made under it.

**Prompt:**
```
[CTX_B — the same shared context block as Phase 1]

YOUR TASK: CONSOLIDATE the [N] segment-sourcing outputs below into a single DEDUPLICATED,
WARM-FIRST RANKED shortlist of [target] interview targets for [EXPERIMENT-ID]. Prefer
ROLE-to-target + sourcing method over stale named individuals; carry the verify-before-outreach
caveat. Cover a spread of sectors. Rank "high" priority = warmest [institution] path AND most
relevant to [the venture's test]. Return at least 6 targets.

[concatenated Phase-1 segment tables, each prefixed "### Source: <segment-label>"]

CRITICAL OUTPUT RULE: respond ONLY by calling the StructuredOutput tool with exactly the schema
fields. No prose outside the tool call. Reason from the material provided plus your own knowledge
— do NOT browse the web. Call the tool as your FIRST action.
```

**Output schema:**
```javascript
const TARGETS_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['targets', 'sectorsCovered', 'warmFirstShortlist', 'sourcingCaveat'],
  properties: {
    targets: {
      type: 'array', minItems: 6,
      items: {
        type: 'object', additionalProperties: false,
        required: ['roleToTarget', 'org', 'sector', 'whyThem', 'warmPathViaUniMelb', 'findVerifyMethod', 'namedOrRole', 'priority'],
        properties: {
          roleToTarget: { type: 'string' },
          org: { type: 'string' },
          sector: { type: 'string' },
          whyThem: { type: 'string', description: 'relevance to the test (e.g. the AI-exposure-vs-soft-skills framing)' },
          warmPathViaUniMelb: { type: 'string', description: 'the warm-intro route via the user\'s institution / networks' },
          findVerifyMethod: { type: 'string', description: 'LinkedIn search string + official directory to confirm the current incumbent' },
          namedOrRole: { type: 'string', description: '"role" or a named person flagged VERIFY-ROLE-BEFORE-OUTREACH' },
          priority: { type: 'string', enum: ['high', 'medium', 'low'], description: 'high = warmest path + most relevant to the test' },
        },
      },
    },
    sectorsCovered: { type: 'string' },
    warmFirstShortlist: { type: 'string', description: 'the 3-5 to approach first and why' },
    sourcingCaveat: { type: 'string', description: 'the verify-before-outreach caveat in one line' },
  },
}
```

### Output File
Rows are appended to **`docs/compass-validate.md`** (the 20+ list — the warm-first target tables under "Who to speak to", which already carry a per-row "How to find / verify" column and the standing instruction that *where a cell names a role rather than a person, the sourcing method is the instruction*) and/or **`docs/compass-experiment-backlog.md`** (the experiment's own sourced-target section — e.g. "§ EXP-13 — sourced employer targets").

When written up, the `targets[]` array renders as a priority-flagged table — `Pri (🟢/🟡/⚪) | Role-to-target @ Org | Sector | Why them (the test) | Warm path via [institution]` — preceded by `warmFirstShortlist` (a numbered "lead with these five" list, each entry naming the specific warm route) and led by `sourcingCaveat` as a blockquote read-first note, e.g.: *"All named individuals are from stale web data and flagged **VERIFY ROLE BEFORE OUTREACH** — prefer the role-to-target + sourcing method and confirm the current incumbent via LinkedIn / official directory the week of outreach; where role and stale name diverge, trust the role."* `sectorsCovered` closes the section as an italic one-line spread of the segments hit.

---

## 12. Full Venture Analysis Sequence

### Recommended order for a new venture

The workflows form a natural dependency chain. The full MEC Define journey now begins one step earlier than the research half — with **Steps 1–2 market discovery (§19)** — then runs the front half below, then the strategy/validation back half:

```
0. Market Discovery — MEC Define Steps 1–2 (§19; hybrid: maps authored inline, evidence via §2/§13.9 fan-out)
   → Problem tree → pick a root cause → convert it to a market (§19.1)
   → System map → value chain → "the break" → certifier deep-dive (§19.2)
   → Stakeholder analysis (§19.3) + honest institutional-alignment scoping (§19.4)
   → Produces: compass-problem-tree.md (+ .svg), compass-stakeholder-analysis.md,
     compass-council-alignment.md, research-plan.md, compass-market-map/ (designed PDF — §13.11)

1. Problem Framing (manual / with Claude in chat; the full problem-tree method is §19.1)
   → Produces: compass-problem-tree.md
   
2. Systems Thinking (Workflow 4)
   → Input: problem framing + any relevant PDF
   → Produces: compass-systems-thinking.md
   
3. Market Sizing (Workflow 1)
   → Input: problem framing, competitor benchmarks
   → Produces: compass-market-sizing.md (v1 → vN)
   
4. Competitor Intelligence × N (Workflow 2)
   → Input: competitor list from market sizing
   → Produces: competitor-[name].md per competitor
   
5. AI Feature Review (Workflow 3)
   → Input: all competitor docs
   → Produces: compass-ai-feature-review.md
   
6. Vision & Positioning (manual / with Claude in chat)
   → Input: all of the above
   → Produces: compass-vision.md, updated marketing files
   
7. Stakeholder Materials (Workflow 6)
   → Input: vision + specific stakeholder context
   → Produces: templates/email-*.md, applications
```

### When to break the sequence

- **Transcript → Positioning** (Workflow 5) can be triggered any time new stakeholder content arrives. Insert between any two steps.
- **AI Feature Review** only makes sense once you have ≥2 competitor docs complete.
- **Market Sizing v2+** should be re-run after Competitor Intelligence reveals new market share or ARR data that revises the SOM.

### Extended sequence — strategy, validation, evidence (the back half)

The chain above stops at first-pass positioning. The full MEC Define journey continues into the strategy/validation/evidence half:

- **5b. Stakeholder / System analysis** → `compass-stakeholder-analysis.md` (actors, decision authority, value/information flows, user-vs-buyer) — *the full method is §19.3; already produced if §19 was run up front*
- **5c. Strategic-intelligence sweep** → `compass-competitive-strategic-intelligence.md` (multi-track: landscape, regulators/accreditors, case studies, incumbents) — *the §2 / §13.9 multi-track shape, feeding §19.2's map questions*
- **6. Deeper Perspective (Workflow 7)** → `compass-deeper-perspective.md` (+ `compass-vision.md`): systemic structures → mental models (adversarially verified) → vision (generate-and-judge)
- **7. Validate (Workflow 8)** → `compass-validate.md`: hypotheses + market-signals scorecard + 20+ expert list + interview guides
- **8. Expert Sourcing (Workflow 11)** → fills the 20+ list / any experiment's targets
- **9. Experiment Backlog (Workflow 9)** → `compass-experiment-backlog.md`: levers → prioritised falsifiable experiments mapped to the interviews
- **10. Evidence & Measurement (Workflow 10)** → run on any empirical claim the venture rests on; design the validation study
- **11. Conduct interviews → reassess hypotheses after ~4-5 → pursue / pivot / iterate**

Dependencies: Deeper Perspective needs the systems/stakeholder/competitive docs; Validate needs the vision; Experiment Backlog needs the deeper-perspective levers + the validate hypotheses; Evidence is triggered whenever a load-bearing claim needs proof.

---

## 13. Technical Patterns

### 13.1 StructuredOutput Hardening

Every schema-constrained agent prompt must end with:

```
CRITICAL: respond ONLY by calling the StructuredOutput tool with exactly these fields:
[field1], [field2], [field3]
No prose or preamble outside the tool call. Do it on your FIRST action after reading.
```

**Why this fails without the hardening:**
- Reasoning-heavy agents (synthesis, judgment, comparison) treat the task as "write an essay" and stop without calling StructuredOutput
- Long prompts with embedded JSON make it worse
- Web search runaway also causes agents to forget the final tool call

**Additional hardening patterns:**
1. Pass data via files (`/tmp/[name].json`) not embedded in the prompt — keeps prompts short
2. Don't invite web search in schema agents unless essential
3. Guard downstream phases: `.filter(Boolean).length > 0` before consuming results
4. If a phase fails: extract good data, recover in a separate workflow, use `resumeFromRunId`

Full detail: see `memory/workflow-structured-output-hardening.md`

### 13.2 OpenAthens SSO Database Access (UoM)

All UoM library databases authenticate via:
```
https://go.openathens.net/redirector/unimelb.edu.au?url=[ENCODED_DATABASE_URL]
```

**The URL must be extracted from the library catalog, not guessed:**
```javascript
// Navigate to catalog record first
// http://cat.lib.unimelb.edu.au/record=e[ID]~S31
// Then extract with:
document.querySelectorAll('a[href]').forEach(a => console.log(a.href, a.textContent))
```

**First-access pattern:**
- Some databases (e.g. Euromonitor) require a one-time registration form on first visit
- Pause the workflow, ask the user to register, then resume
- Record the correct OpenAthens URL after successful registration

**Database status reference:**
| Database | Status | Notes |
|---|---|---|
| Statista | ✅ Accessible | Full access via OpenAthens |
| GlobalData / MarketLine | ✅ Accessible | Same catalog record |
| IBISWorld AU | ✅ Accessible | AU subscription only — US reports blocked |
| Euromonitor Passport | ✅ Accessible (after registration) | Use portal.euromonitor.com not passport.euromonitor.com |
| Fitch Connect (BMI) | ✅ Accessible (manual auth) | Navigate direct to bmi.fitchsolutions.com |
| OECD iLibrary | ✅ Free | data.oecd.org works directly |
| World Bank DataBank | ✅ Free | data.worldbank.org |
| IMF eLibrary | ✅ Free | imf.org/en/publications |
| QILT | ✅ Free | qilt.edu.au/surveys |
| Mintel Market Sizes | ❌ Separate subscription | Not in UoM OpenAthens |
| Revelio Labs (via WRDS) | ❌ Requires WRDS account | Physical access only |

### 13.3 Workflow Tool Constraints

The `Workflow` tool does NOT support `run_in_background`. Remove this parameter if present — it causes `InputValidationError`.

To run multiple workflows simultaneously: launch them all in a single message with multiple `Workflow` tool calls (they run in parallel automatically).

```javascript
// CORRECT — launch in same message
Workflow({ script: scriptA })
Workflow({ script: scriptB })

// WRONG — will error
Workflow({ script: scriptA, run_in_background: true })
```

### 13.4 Workflow Script Patterns

**pipeline() for multi-stage per-item work (default):**
```javascript
const results = await pipeline(
  ITEMS,
  item => agent(researchPrompt(item), { label: `research:${item.name}`, phase: 'Research', schema: RESEARCH_SCHEMA }),
  (research, item) => agent(writePrompt(research, item), { label: `write:${item.name}`, phase: 'Write', schema: DOC_SCHEMA })
)
```

**parallel() only when you need ALL results before proceeding:**
```javascript
const allResearch = await parallel(COMPETITORS.map(c => () =>
  agent(researchPrompt(c), { phase: 'Research', schema: RESEARCH_SCHEMA })
))
// Need all research to do cross-competitor comparison:
const gapAnalysis = await agent(comparePrompt(allResearch), { phase: 'Analyse', schema: GAP_SCHEMA })
```

**Passing data between phases via file:**
```javascript
// Phase 1 result
const research = await agent(prompt, { schema: SCHEMA })
// Write to /tmp for Phase 2 agents
await agent(`Write this JSON to /tmp/research.json: ${JSON.stringify(research)}`)
// Phase 2 reads it
const doc = await agent('Read /tmp/research.json and synthesise...')
```

### 13.5 Schema Design for Venture Analysis

Keep schemas flat and string-heavy for complex content. Agents struggle with deeply nested schemas.

```javascript
// GOOD — flat, strings for complex content
const SCHEMA = {
  type: 'object',
  properties: {
    executiveSummary: { type: 'string' },  // full markdown prose
    gapAnalysis: { type: 'string' },       // full markdown table
    recommendations: { type: 'string' }    // full markdown list
  },
  required: ['executiveSummary', 'gapAnalysis', 'recommendations']
}

// RISKY — deep nesting, agent may fail to populate correctly
const BAD_SCHEMA = {
  type: 'object',
  properties: {
    sections: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          findings: { type: 'array', items: { type: 'object', ... } }
        }
      }
    }
  }
}
```

### 13.6 Adversarial verification

Use this to **stop a plausible-but-fragile finding from surviving into the deliverable**. Instead of asking one agent "is this true?", spawn N independent skeptics, each told to **default toward refutation** and to surface the *strongest counter-evidence* — then kill or downgrade the claim if a majority refute. It was used in the deeper-perspective workflow to pressure-test the top mental models, and in EXP-04 to interrogate the "empty category" claim (the high-value moat that the venture *wants* to be true, so it most needs an adversary).

Design rules that make it work:
- Frame the task as refutation, not assessment: `Be a skeptic. Default toward skepticism where evidence is thin.` and ask explicitly for `the STRONGEST counter-evidence that it is durable and will NOT shift`.
- Warn against motivated reasoning in **both** directions when the finding is self-serving: `do not let the venture's wish (an empty category = a moat) make you under-search, and do not accept vendor marketing as evidence`.
- Have each skeptic return a structured verdict (a boolean "is this even a real claim, not a strawman" + a calibrated strength enum), so you can tally rather than eyeball.

```javascript
// One skeptic per finding (parallel); verdict schema lets you tally, not eyeball
const verified = await parallel(topClaims.map(c => () =>
  agent(`${CONTEXT}\nTASK: adversarially PRESSURE-TEST this one claim. Be a skeptic.
(1) is it genuinely real, not a strawman? (2) strongest counter-evidence it will NOT hold?
(3) realistic leverage IF it does. Default toward skepticism where evidence is thin.
CLAIM: ${c.belief}${HARD}`,
    { label: `verify:${c.id}`, phase: 'Verify', schema: VERIFY_SCHEMA })))
// VERIFY_SCHEMA: { isRealPrevailingBelief: boolean, shiftEvidenceStrength: enum, counterEvidence, leverage, verdict }
const refuted = verified.filter(v => v && (!v.isRealPrevailingBelief || v.shiftEvidenceStrength === 'none'))
if (refuted.length > verified.length / 2) { /* drop or demote the finding */ }
```

### 13.7 Generate-and-judge panel

Use this when you need ONE strong creative output (a vision, a positioning line, a strategy) and a single agent would give you a safe, average answer. Generate N candidates **each from a deliberately different angle**, score every candidate with a **parallel panel of independent judges** on a fixed rubric, aggregate the scores, then **synthesise the winner and graft the best elements of the runners-up** rather than just picking #1. It was used to produce the COMPASS market vision: four visions (learner-outcome / curriculum-agility / labour-market-integration / trust-and-standards angles), three judges, a blended synthesis.

What makes it more than a beauty contest:
- The angles are an explicit list, so candidates are *diverse by construction* — not four rewordings of the same idea.
- Judges score on an **enumerated rubric** (here: `challengesModel, clear, strong, feasible, isVisionNotSolution`), judge **independently**, and are warned off a common failure mode: `the most ambitious is not automatically the best`.
- Each judge also returns a `synthesisSuggestion` — "how to blend the best elements across visions into one stronger vision" — so the final artefact is a graft, not a single survivor.
- Aggregate numerically across judges (sum the rubric → average across the panel → rank) so the recommendation is defensible, not vibes.

```javascript
const candidates = await parallel(ANGLES.map(a => () =>
  agent(`${CTX}\nWrite ONE candidate from the ${a.angle} angle. RULES: ...${HARD}`,
    { label: a.label, phase: 'Generate', schema: CANDIDATE_SCHEMA })))
const judges = await parallel([1,2,3].map(n => () =>
  agent(`${CTX}\nYou are judge #${n}. Score EACH candidate 1-5 on <rubric>; judge independently —
the most ambitious is not automatically best. Then name the best and how to BLEND them.
CANDIDATES: ${JSON.stringify(candidates.filter(Boolean))}${HARD}`,
    { label: `judge-${n}`, phase: 'Judge', schema: JUDGE_SCHEMA })))
// aggregate: sum each candidate's rubric per judge, average across the panel, sort desc
const agg = {}
for (const j of judges.filter(Boolean)) for (const s of (j.scores || [])) {
  const t = s.challengesModel + s.clear + s.strong + s.feasible + s.isVisionNotSolution
  agg[s.angle] = agg[s.angle] || { angle: s.angle, total: 0, n: 0 }
  agg[s.angle].total += t; agg[s.angle].n += 1
}
const ranking = Object.values(agg).map(a => ({ angle: a.angle, avgTotal: a.total / a.n })).sort((x, y) => y.avgTotal - x.avgTotal)
```

### 13.8 Consolidation / dedup

Use this whenever a fan-out produced **many overlapping free-text findings** and you need a single deduplicated, ranked master list before the next phase can run. Do **not** try to dedup free text in JS (string matching can't tell that "academic rigour is value independent of economic relevance" and "the academy owns curriculum" are near-duplicates) — give the whole pile to **one consolidation agent** whose only job is to merge, resolve overlaps, assign stable ids, and rank. It was used to fold four stakeholder vantages (3–6 models each) into a single ranked set of distinct mental models, and again to merge four sector sourcing lists into one warm-first employer shortlist.

The consolidator's prompt should be explicit about all four jobs: **merge duplicates, resolve overlaps, assign a stable id, and impose a ranking criterion**. Ranking by a single named axis (here leverage: "widely load-bearing AND a feasible path to shift") keeps the downstream slice meaningful — Phase 3 just takes the top-K.

```javascript
const rawByVantage = await parallel(VANTAGES.map(v => () =>
  agent(buildPrompt(v), { label: v.label, phase: 'Generate', schema: ITEM_SCHEMA })))

const consolidated = await agent(`${CONTEXT}
CONSOLIDATE the lists below. Merge duplicates, resolve overlaps, and produce a single
DEDUPLICATED, RANKED list. Assign each a short kebab-case id. Rank by LEVERAGE
(1 = highest): high if widely load-bearing AND there is a feasible path to shift.
INPUT (${VANTAGES.length} vantages):
${JSON.stringify(rawByVantage.filter(Boolean))}`,
  { label: 'consolidate', phase: 'Consolidate', schema: CONSOLIDATED_SCHEMA })

// downstream phases slice the ranked output, e.g. top 6 to adversarially verify
const ranked = (consolidated?.models || []).sort((a, b) => (a.leverageRank || 99) - (b.leverageRank || 99))
```

### 13.9 Web-search -> schema-less markdown, THEN reasoning -> schema

This is the definitive fix for the "agent completed without calling StructuredOutput" failure. **Split each phase by job.** Agents that **browse or draft** (web search, gathering, open-ended writing) return **schema-less MARKDOWN** — there is no tool to forget to call, so they cannot fail the StructuredOutput check, and search results are messy anyway. Then **separate reasoning agents** read that gathered markdown and emit the structured object — and crucially they **do not browse**, so they stay on the rails. EXP-04 is the canonical shape: Phase 1 ("Research") runs nine web-search agents that each `Return well-structured MARKDOWN (no preamble)`; Phase 2 ("Reason") passes their text into schema agents that verify the claim, design the protocols, and consolidate the shortlist.

The positive pattern, stated as a rule: **browsing/gathering = no schema; reasoning-over-text = schema + a hard rule that forbids browsing.** The schema agents' hardening line says exactly this — `Reason from the material provided plus your own knowledge — do NOT browse the web. Call the tool as your FIRST action.`

```javascript
// Phase 1 — GATHER: web search ON, NO schema → returns markdown (cannot fail the tool check)
const research = await parallel(SPECS.map(s => () =>
  agent(`${CTX}\nYOUR TASK: ${s.task}\nReturn well-structured MARKDOWN (no preamble). Cite sources inline.`,
    { label: s.label, phase: 'Research' })))          // <-- note: no `schema`
const [a1, a2, a3] = research.map(x => x || '(no findings returned)')

// Phase 2 — REASON: schema ON, browsing FORBIDDEN, reads the gathered text
const HARD = `\n\nCRITICAL OUTPUT RULE: respond ONLY by calling the StructuredOutput tool with
exactly the schema fields. No prose outside the tool call. Reason from the material provided plus
your own knowledge — do NOT browse the web. Call the tool as your FIRST action.`
const verdict = await agent(`${CTX}\nVERIFY the claim using the outputs below.\n${a1}\n${a2}\n${a3}${HARD}`,
  { label: 'verify', phase: 'Reason', schema: VERIFY_SCHEMA })
```

### 13.10 Two-pass recovery

When a fan-out phase **partially** fails (some agents returned good data, others crashed or never called StructuredOutput), do **not** re-run the whole workflow — the successful upstream work is expensive and non-deterministic. Instead: **extract the good data to `/tmp/*.json`, then run a small, HARDENED recovery workflow** that resumes only the failed tail. `compass-vision-recovery` is exactly this — it recovers just the Verify + Vision + Judge tail of the deeper-perspective run by reading the salvaged mental models from `/tmp/compass-mm.json` (and systemic context from `/tmp/compass-systemic.json`).

What "hardened" means in the recovery script, versus the original:
- **Tiny prompts that read from file**, not giant inlined context: `Read the file ${MM_FILE} ... Find the object whose "id" is "${id}"`. The condensed `MARKET` blurb replaces the original's long multi-doc `CONTEXT`.
- **An explicit StructuredOutput rule appended to every prompt** (`const HARD = ...; ... ${HARD}`) telling the agent to call the tool as its FIRST action and narrate nothing — this is what was missing when the phase first failed.
- **Hard-coded the known-good ids** (`const topIds = [...]`) instead of recomputing them from a consolidation step that might re-fail.
- **Guard every upstream read** so an empty salvage degrades instead of throwing: `(consolidated?.models || [])`, `verified.filter(Boolean)`, `targets ? targets.targets.length : 0`.

If the framework supports it, prefer `resumeFromRunId` to continue the original run from its last good checkpoint; the file-salvage + hardened-tail recovery here is the manual equivalent when you can't, or when the failed phase needs *different, stricter* prompts to succeed the second time.

```javascript
// 1. Salvage the good upstream output from the failed run to /tmp (run once, by hand if need be)
//    e.g. await agent(`Write this JSON to ${MM_FILE}: ${JSON.stringify(goodModels)}`)

// 2. Hardened recovery: tiny file-reading prompts + explicit tool rule + guarded reads
const MM_FILE = '/tmp/compass-mm.json'
const HARD = `\n\nCRITICAL OUTPUT RULE: Respond ONLY by calling the StructuredOutput tool ...
Your entire reply must be the single StructuredOutput tool call. Do this on your FIRST action
after reading the file — do not narrate.`
const topIds = ['curriculum-is-the-academys-domain', /* ...known-good ids, hard-coded... */]
const verified = await parallel(topIds.map(id => () =>
  agent(`${MARKET}\nTASK: Read ${MM_FILE}. Find the object whose "id" is "${id}".
Adversarially pressure-test it ... do NOT browse the web.${HARD}`,
    { label: `verify:${id}`, phase: 'Verify', schema: VERIFY_SCHEMA })))
const verifiedClean = verified.filter(Boolean)   // guard: empty salvage degrades, never throws
```

---

### 13.11 Designed visual deliverable — HTML + inline SVG → PDF, on the venture's own design system

Some outputs need to *look* like the venture, not read like a markdown dump — a market map, a board one-pager, a stakeholder map for an office-hours upload. The reliable pipeline is **one self-contained HTML file rendered by headless Chromium**, not a markdown→PDF converter (which mangles SVG and ignores print CSS).

**Pipeline.**
1. **Extract the design tokens from the live product — don't invent them.** For COMPASS they came straight out of `compass-static` (Tailwind/shadcn): ink-navy `#11151F`, signature orange `#F97316`, the four risk-band colours (RESILIENT `#16a34a` · MODERATE `#d97706` · HIGH `#ea580c` · CRITICAL `#dc2626`), the compass-rose logo geometry, card radius `0.625rem`. Put them in `:root` CSS variables so every page is on-brand by construction.
2. **One HTML file, inline everything** — `@page { size: A4 landscape; margin: 0 }`, `-webkit-print-color-adjust:exact`, one `.page` per slide (fixed 297×210mm), inline `<svg>` diagrams, system font stack. No external assets.
3. **Render with Playwright/Chromium** (both present on the Mac): `page.pdf(landscape=True, format="A4", print_background=True, prefer_css_page_size=True)`. Keep the tiny `render.py` next to the HTML so the PDF is reproducible after any edit.

**Two SVG authoring gotchas that *will* bite (both hit this session):**
- **Never put HTML tags inside an SVG `<text>`.** `<b>`/`<i>` are not SVG elements; a single one inside inline SVG closes the SVG early and the rest of the diagram reflows as raw HTML — the whole map collapses. Use `<tspan font-weight="800">…</tspan>` for emphasis. One stray `<b>` silently corrupted **two full pages** before it was caught.
- **Reuse the canonical logo geometry; don't hand-code it.** A from-scratch compass needle rendered as an unrecognisable orange blob across three attempts. The fix was to drop in the *exact* SVG paths the product already ships (recentred onto the marker, with a white halo to clear an overlapping line) — the geometry that demonstrably renders in the header/cover is the geometry to reuse. Hand-coded icon geometry is a reliable source of glitches.

Output convention: a **folder** `docs/<name>-map/` holding `<name>.html` + `<NAME>.pdf` + `render.py` (e.g. `compass-market-map/`).

### 13.12 Visual QA loop — render → rasterise → inspect → fix → re-render

A designed PDF is **never shipped unseen**. The loop that caught every glitch this session:
1. **Rasterise** the PDF to PNG — `pdftoppm -png -r 96 file.pdf pg` (bump to `-r 220` for a tight region).
2. **Read the PNG as an image and actually look** — alignment, overlaps, arrowheads, text fit. The model can see the render; use it. Re-reading the *source* does not catch visual glitches.
3. **Zoom-crop suspect regions** with PIL (`Image.crop`) at high DPI to diagnose precisely — the malformed compass and the colliding badge were only diagnosable zoomed in.
4. **Fix in the HTML, re-render, re-inspect** until clean; then delete the scratch PNGs.

Worked examples from the COMPASS market map, each found only by looking: a margin badge colliding with a money-flow arrow (→ moved to a clean tab on the box); a stubby disconnected arrow before "the break" (→ given a real arrowhead); an info-flow arrow with a detached head and a tangled duplicate (→ collapsed to one clean arc); uneven stage boxes (→ re-laid to a uniform grid with even gaps); a zigzag cutting through the compass marker (→ white halo); the blob compass (→ canonical geometry). **Portable rule:** *if a deliverable is visual, verifying it means looking at the pixels, not re-reading the markup — the same "look before you assert" discipline the harness applies to claims, applied to renders.*

---

## 14. Agent Prompt Library

Collected prompt templates for direct reuse. Replace `[BRACKETS]` with venture-specific values.

### Research prompts
| Name | Use when |
|---|---|
| `market-baseline` | Phase 1 market sizing via Perplexity |
| `database-extract` | Extracting data from a specific premium database |
| `competitor-company` | Researching a competitor's company profile |
| `competitor-product` | Researching a competitor's product capabilities |
| `competitor-ai` | Researching a competitor's AI/ML features |
| `transcript-analyse` | Extracting themes from stakeholder content |

### Synthesis prompts
| Name | Use when |
|---|---|
| `market-synthesise` | Combining multi-source market research |
| `competitor-doc` | Writing a full competitor intelligence document |
| `ai-prd` | Writing an AI feature PRD for a product |
| `ai-gap` | Writing a comparative AI capability matrix |
| `ai-recs` | Writing COMPASS improvement recommendations |
| `systems-apply` | Applying Kim's frameworks to the venture |

### Stakeholder prompts
| Name | Use when |
|---|---|
| `email-outreach` | Expert/stakeholder cold or warm outreach |
| `calendar-invite` | Meeting invite body |
| `application-answer` | Innovation program application |
| `position-update` | Marketing copy update from stakeholder themes |

### Strategy & validation prompts
| Name | Use when |
|---|---|
| `systemic-lens` | One of the 5 Deeper-Perspective systemic-structure lenses |
| `mental-models-vantage` | Surfacing mental models from a stakeholder vantage |
| `consolidate-rank` | Dedup + rank free-text findings (e.g. mental models) |
| `adversarial-verify` | Refute-by-default skeptic on a finding/claim |
| `vision-generate` | One candidate market-future vision from an angle |
| `judge-panel` | Scoring candidates (visions, designs) 1-5 across criteria |
| `hypothesis-decompose` | Vision → falsifiable H1-H4 + market-signals scorecard |
| `experiment-map` | Lever/problem → falsifiable experiment mapped to an interview |
| `evidence-search` | Systematic multi-angle literature search on a claim |
| `measurement-design` | Design a study to validate a venture-critical claim |
| `target-source` | Source named/role interview targets with warm paths |
| `mom-test-interview` | De-bias interview questions to past-behaviour; aim to be proven wrong (§17.3) |
| `assumptions-to-conversation` | A vision's load-bearing assumptions → a falsifiable conversation plan on an *existing* interview list (§17.2) |
| `problem-tree` | Vague problem → root-cause tree (structural vs mental-model) → pick a root cause → convert to a market (§19.1) |
| `system-map-research` | A map's open questions → parallel web-research agents that fill them (§19.2; §2/§13.9 shape) |
| `value-chain` | Trace money / products / decision-rights / hidden flows; find where margin concentrates and where value breaks (§19.2) |
| `stakeholder-profile` | Per-stakeholder cares-most / frustrated-by / power-and-influence, sourced (§19.3) |
| `institutional-align` | Map the venture to leadership's own questions — direct / partial / out-of-scope, honestly (§19.4) |

---

## 15. File Naming Conventions

| File type | Pattern | Example |
|---|---|---|
| Market sizing | `compass-market-sizing.md` | — |
| Competitor intel | `competitor-[slug].md` | `competitor-coursedog.md` |
| AI feature review | `compass-ai-feature-review.md` | — |
| Systems thinking | `compass-systems-thinking.md` | — |
| Vision | `compass-vision.md` | — |
| Problem tree | `compass-problem-tree.md` | + `compass-problem-tree.svg` (designed, §13.11) |
| Validate pack | `compass-validate.md` | — |
| Outreach email template | `email-[audience]-[purpose].md` | `email-liz-malloy-intro.md` |
| Calendar invite | `calendar-invite-[audience].md` | `calendar-invite-malloy.md` |
| Research plan | `research-plan.md` | — |
| Workflow SOP | `workflow-sop.md` | — |
| Deeper perspective | `compass-deeper-perspective.md` | — |
| Experiment backlog | `compass-experiment-backlog.md` | — |
| Causal evidence | `compass-exp04-causal-evidence.md` | — |
| Study pre-registration | `compass-exp04-preregistration.md` | — |
| Stakeholder analysis | `compass-stakeholder-analysis.md` | — |
| Strategic intelligence | `compass-competitive-strategic-intelligence.md` | — |
| Council alignment | `compass-council-alignment.md` | — |
| Expert conversation guide | `compass-expert-conversations.md` | lighter Step-3→5 bridge; cf. §8 & §17.2 |
| Market map (folder) | `compass-market-map/` | — |
| **This document** | `agent-harness.md` | — |

All files live in `docs/`. Assessment reports live in `reports/`.

---

## 16. MEC Define Workbook House Style

All `compass-*.md` documents in `docs/` follow this style:

```markdown
---
prepared-by: David Mulholland + Claude
date: YYYY-MM-DD
builds-on: [list of prior docs this document relies on]
---

# [emoji] [Section Title]

[Opening paragraph — states the thesis or key finding directly. No "this document will explore..."]

## [Emoji] Section Heading

[Evidence-heavy content with inline citations: (Source [N]) or (Author, Year)]

---
*Footnotes / sources at the bottom*
```

**Emoji convention:**
- 👀 Discovery / observation
- 🧠 Analysis / insight
- 🏗️ Structure / architecture
- 💡 Idea / recommendation
- 📊 Data / market sizing
- 🗺️ Map / landscape
- 🎯 Strategy / decision
- ⚠️ Warning / risk
- ✅ Validation / confirmed
- 🧪 Experiment / test
- 🔍 Search / evidence
- 👥 People / targets
- ⚖️ Verdict / judgement
- 🧭 Sequencing / process

**Front-matter note:** the newer workbook docs use bold-inline front matter (`**Prepared by:** … · **Date:** … · **Builds on:** …`) rather than YAML — either is fine, match the surrounding docs.

**Writing style:**
- Declarative, not hedged ("the problem is X" not "the problem may be X")
- Evidence before claims (cite first, conclude after)
- "Founder's call" framing where there's genuine uncertainty (name the uncertainty, state the call)
- No bullet points that could be prose — use bullets only for genuinely list-like content
- Numbers wherever possible (%, $, counts, dates)
- **Designed deliverables (§13.11):** when an output is for an external or leadership audience (a market map, a board one-pager), render it on the **product's own design tokens**, not a generic theme — and run the §13.12 visual-QA loop (render → rasterise → *look* → fix) before shipping

---

## 17. Addendum — Manual Authoring Methods & Workbook Upkeep

Not every workbook artefact comes from a fan-out. The early MEC Define steps in particular — where the input is a course template plus a single founder's judgement, not a research sweep — are often authored **inline, by hand, with no script, schema, or agent**. That is frequently the *right* call: faster, ownable, and easy to revise. This section documents the three manual methods used to produce and maintain the Step-3 layer of the COMPASS workbook — the Vision checkpoint, the Expert Conversation Guide, and the research-plan upkeep — and, importantly, **how each relates to the script-based workflows above (§7, §8)** so a future run produces the right artefact once rather than two overlapping ones.

Honesty note up front: §17.1–17.2 are reconstructions of *by-hand* work (like §5 and §6), not extracted scripts. No agents were spawned to produce them.

### 17.1 The Step-3 Vision checkpoint (manual, from the MEC template)

Distinct from §7's generate-and-judge vision. The manual path authors `docs/compass-vision.md` directly from the MEC Define Step-3 worked example (the food-packaging case: *"All food packaging will be non-toxic and 100% recyclable within 10 years"*). The deliverable is a four-part template:

- **👀 Vision** — one clear, strong, feasible market-future statement, with a time horizon. A *market* future, not a product (it must survive a pivot).
- **🧠 Mental Models** — the prevailing beliefs holding the current system in place (lift these straight from `compass-systems-thinking.md`; narrow to the ones the venture can actually move).
- **🏗️ System Structure** — the systemic tension those beliefs enable, and the venture-type choice they justify (e.g. "be the certifier, not the new material or the new brand").
- **💡 Opportunity** — the framed opportunity statement plus real precedents.

Two moves make it more than a restatement, and both are what to insist on:
1. **A "how this vision challenges each prevailing mental model" mapping** (the Tesla move). A vision is a forecast of *belief change*, not of products — so map, model-by-model, the belief the vision asserts will replace today's. This is the single highest-value addition over a bare statement.
2. **Explicit "founder's call" framing** (per §16 house style). Name the genuine decisions rather than burying them: *concrete vs directional framing*, and the *time horizon* (2–5y typical; ~7y "one governance cycle"; 10y deep-change). Recommend one, show the alternatives, and say why the choice changes the roadmap.

**Relationship to §7.** Author the manual checkpoint **first** (single author, minutes), then run the §7 deeper-perspective workflow to **expand and corroborate** it with the generate-and-judge vision — exactly the COMPASS chronology (`compass-vision.md` preceded `compass-deeper-perspective.md`). If the by-hand vision and the judged vision disagree, that disagreement is signal, not noise. **Use which when:** manual when the mental models already exist and you need a fast, ownable checkpoint; the §7 workflow when you want diverse candidate visions and an adversarial judge panel to pressure-test boldness against feasibility.

### 17.2 The Expert Conversation companion (manual; the discipline layer for §8 Validate)

`docs/compass-expert-conversations.md` is the **interview-discipline companion** to the §8 Validate pack — deliberately slim. It was **reconciled** against the pack (this is now its canonical state): it keeps only what Validate does *not* provide —

1. **The Mom-Test interview discipline** (→ §17.3) — the five rules that make a conversation able to *invalidate*.
2. **A warm research-plan → hypothesis crosswalk** — which of the `research-plan.md` Track-2 interviews (2.1–2.7) is best placed to break which Validate hypothesis (H1–H4), on which falsifiable question — so you start warm and each call has a job.
3. **De-biased upgrades to the research-plan questions** (→ §17.3) — the specific leading/hypothetical questions rewritten to past-behavioural.

Everything else an interview programme needs — hypotheses H0–H4, the market-signals scorecard, the 20+ warm-first target list, outreach templates A–G, the per-archetype Learn→Challenge→Probe guides, the capture template, and the decision rule — **lives in `compass-validate.md`**; the companion points at it rather than copying it.

**⚠️ Relationship to §8 Validate — read this before producing either.** They overlap *by design*: the guide's A/B clusters ≈ §8's load-bearing H1 (demand) / H2 (trust & standing); cluster C ≈ H4 (unoccupied adjacency); both ship a decision rule and outreach. The difference is **weight and provenance**:

| | Conversation Guide (§17.2) | Validate pack (§8) |
|---|---|---|
| Weight | Light, fast | Heavy, full MEC Step-5 |
| Builds on | An **existing** research plan | Vision + research plan, from scratch |
| Has | Mom-Test discipline, warm research-plan→hypothesis crosswalk, de-biased Qs (points at the pack for the rest) | The canonical pack: hypotheses H0–H4, 8-signal **market scorecard**, **20+ warm-first target sourcing** (via §11), per-archetype **Learn→Challenge→Probe** kit, capture template, decision rule |
| Provenance | Manual, inline | Inline reconstruction (no script) |

**Guidance — don't build both for a new venture.** Write the light guide when you just need disciplined conversations off an existing interview plan. Run the §8 workflow when you need the full scored, sourced, kitted Step-5 pack. If you run §8, **fold the Mom-Test discipline (§17.3) into its Phase 4** rather than maintaining a separate guide. For COMPASS both exist; the companion has now been **reconciled** — slimmed to its non-redundant core (the Mom-Test discipline + the warm research-plan crosswalk/de-bias) and pointed at the pack. That reconciliation is itself the §17.4 upkeep move.

### 17.3 The Mom Test — interview discipline (the human analogue of §13.6)

The reusable pattern under §17.2, and the most portable thing this session produced. §13.6 spawns agents *told to refute* a finding; this is the same adversarial-honesty stance turned on **human conversations**. The goal is to be proven wrong, and the enemy is **politeness** — people reflexively encourage ideas they sense you're attached to, and encouragement is worthless as evidence. Five rules (after Rob Fitzpatrick, *The Mom Test*):

1. **Talk about their world, not your idea.** Never pitch — the moment you describe the product, they react to you instead of describing their reality, and the data is contaminated.
2. **Ask about the past, not the future.** *"Walk me through the last review you sat in"* beats *"would you use a durability score?"* — hypotheticals yield imagined behaviour, history yields fact.
3. **Anchor on commitment already made** — money, time, reputation. What they've already paid for or built a workaround around is real; what they say they'd like is not.
4. **Treat compliments and hypotheticals as noise, not signal.** *"That sounds useful"* is a red flag, not a milestone.
5. **Go in to falsify.** If five conversations all "validate", suspect leading questions — not gold.

**The de-bias move (reusable).** Take any existing interview skeleton and rewrite every hypothetical/leading question into a past-behavioural one. Worked example from this session: `research-plan.md` asked *"What would it MEAN for a curriculum team to have real-time intelligence…?"* (invites imagined enthusiasm) → rewritten to *"In your most recent review, what did the team DO when they needed labour-market evidence and didn't have it?"* (forces fact; an absence is itself a finding).

**Where it plugs in.** It is the interview-design layer for both §8 Phase 4 and §17.2 — and it is what makes a "validation" interview actually capable of *invalidating*. Pair it with §8's universal must-asks (*"If you were betting, would you bet against us?"*, *"What didn't I ask?"*, *"Who else should I speak to?"*).

### 17.4 Workbook upkeep — build on, don't regenerate; keep cross-docs in sync

A maintenance discipline, not a workflow. When a new artefact implies changes to an existing one, **extend the existing doc rather than regenerate it**, and keep cross-references consistent. Two concrete moves from this session:

- **Decompose-to-find-a-gap.** Decomposing the Vision's assumptions into A/B/C (§17.2) exposed that the existing interview list (`research-plan.md` Track 2, 2.1–2.6) tested **demand** thoroughly but had **no entry testing trust & standing** (assumptions B2/B3 — would accreditors/regulators *accept* the signal; is there a path to it becoming *expected*). The fix was surgical: add interview **2.7 (accreditation / peak-body figure)** in the exact existing format, plus a matching Progress-Tracker row — not a rewrite.
- **Sync the cross-references.** Adding 2.7 meant the Conversation Guide's *"(2.1–2.6)"* and *"gap not yet in Track 2"* lines were updated to *"(2.1–2.7)"* and *"gap now closed"*. Two docs, kept in agreement.

This is the cheapest, highest-trust way to evolve the workbook: each doc stays authoritative, and the cross-links never lie. The general rule — **a decomposition that maps assumptions to evidence will surface coverage gaps in the plan it maps onto; close them in place.**

---

*§17 added from the 2026-06-06 session that authored the Step-3 Vision checkpoint and the Expert Conversation Guide by hand. The portable extractions are §17.3 (Mom-Test interview discipline) and §17.4 (workbook upkeep); §17.1–17.2 document manual methods that the script-based §7 and §8 can supersede or absorb.*

---

## 18. Addendum — The Self-Correcting Workbook (when a workflow refutes the base, audits the instrument, or exposes a coverage gap)

§17 covered how artefacts are *authored and maintained*. This section covers the **second-order** discipline the back half forces: a workflow run in earnest does not just add a new artefact — it can **overturn a claim the earlier docs were built on, expose a bug in the very product the venture sells, or reveal a whole missing class in a list you thought was complete.** Catching and propagating those corrections is what keeps a growing workbook from quietly contradicting itself. All three disciplines below are extractions from the **EXP-04 (Evidence, §10)** and **EXP-13 (Sourcing, §11)** runs, and all are portable to any venture.

The framing to internalise first: **the back half is *supposed* to overturn the front half.** Finding you were wrong on a desk experiment is the cheap version of finding out in market. A refutation is the workflow *working*, not failing — so the reflex on hitting one is to harvest it, not bury it.

### 18.1 Refutation propagation — reframe to the narrower claim, then propagate it everywhere

When an evidence or verification workflow refutes a claim earlier docs asserted as fact, three moves follow, in order:

1. **Reframe, don't delete — find the narrower claim that survives.** A refuted absolute almost always has a defensible core. EXP-04 set out to confirm COMPASS's load-bearing line — *"the category 'causally-demonstrated outcome from LMI-informed curriculum revision' is empty"* — and **retired it**: German/Swiss VET difference-in-differences (Salomons et al. 2025; +3.3–5.5% wages) shows demand-aligned curriculum revision *causally raises wages*. But a **sharper moat survived**: no study validates a *scored durability instrument*, in *higher education*, against *QILT*, in *Australia* (the one clean HE-curriculum DiD is a null). The reframed claim is both more honest and more useful — it concedes the mechanism (strengthening "why now") while naming the precise, ownable gap.
2. **Re-read the refutation as information value — it is often a tailwind.** `compass-deeper-perspective.md` had filed the empty category as COMPASS's "largest credibility risk." Half of that risk *evaporated* once the mechanism was evidenced: the open question shifted from "does any of this work?" to "does *our instrument* work *here*?" — a far better place to stand. A refutation that shrinks a risk is a gain; record it as one.
3. **Propagate the corrected claim to every dependent doc — name them.** The retired claim had been repeated across `compass-competitive-strategic-intelligence.md`, `compass-deeper-perspective.md`, and `compass-validate.md`. A correction that lives only in the doc that found it leaves the workbook contradicting itself. The discipline: when a claim is overturned, **grep the workbook for it and update every instance to the narrower version**, with a one-line "(corrected by EXP-04, 2026-06-05)" pointer back to the source.

**Portable rule.** *A back-half finding that contradicts a front-half assertion is not an embarrassment to bury — it is among the highest-value outputs the back half produces. Reframe to the surviving core, bank the risk reduction, and propagate the correction to every doc that inherited the old claim.*

### 18.2 Measurement design is an instrument audit — when the venture *is* a score

When the venture's core artefact is a quantitative instrument, the act of **operationalising it for external registration forces an exactness the live product can quietly avoid** — and that exactness surfaces latent bugs. Drafting the EXP-04 Step-0 freeze (§10 Phase 3) required declaring the *exact* scoring function before hashing it. Doing so exposed a real inconsistency in the shipped product: `compass-static/src/data/programData.ts` declares `maxScore: 36`, but 11 items × max 3 sum to **33 achievable** (the Bachelor of Design dimensions sum to exactly its reported 17), and whether the Irreplaceability *bonus* is additive or weighted was never pinned. The product had carried an off-by-3 denominator silently because nothing had ever forced the question; a pre-registration's freeze did.

**Portable rule.** *Any time you must freeze, hash, or externally register a quantitative artefact, treat it as a QA pass on the artefact itself. Reconcile three numbers that should agree but often don't — the spec (the doc's "/36"), the implementation (`maxScore` in code), and the achievable maximum (Σ item maxima). A measurement-design pass on a scoring venture is never only about the study; it audits the instrument.* (For COMPASS, locking total/33-vs-/36 normalisation and the bonus rule is now a pre-lodgement blocker, not a footnote — `compass-exp04-preregistration.md` §14.)

### 18.3 Coverage-audit every enumeration, not just the interview plan

§17.4 introduced *decompose-to-find-a-gap* against the **interview plan** (the assumptions→evidence map exposed that no interview tested trust & standing → added `research-plan.md` interview 2.7). The same audit applies to **every list the venture leans on**, and the next run found a second hole in a *different* list. EXP-13 (Sourcing, §11) audited the §8 Validate **target list** against the hypotheses and found the 22-person roster had **no hiring-employer** at all — a whole stakeholder class absent from a list that claimed to test demand — and added a warm-first employer cohort (the live MinterEllison graduate-intake-cut case as the standout, PwC via the MBS board as the warmest path).

**Portable rule.** *Run the coverage audit against each enumeration the venture relies on — the hypothesis set, the interview plan, the target list, the scoring dimensions. Any hypothesis with no experiment or target touching it, or any stakeholder class named in the analysis but absent from the outreach list, is a coverage hole. Close it where it lives — a new row in the existing doc (§17.4) — don't regenerate.*

---

*§18 added 2026-06-06 from the EXP-04 (Evidence, §10) and EXP-13 (Sourcing, §11) runs. Where §17 documents how artefacts are authored, §18 documents how the workbook corrects itself when a workflow's output refutes a claim, audits the instrument, or exposes a coverage gap. All three disciplines are portable to any venture; the COMPASS instances (the retired empty-category claim, the `maxScore` 36-vs-33 bug, the missing employer class) are the worked examples.*

---

## 19. Addendum — MEC Define Steps 1–2: Market Discovery (Problem Tree · System Map · Value Chain · Stakeholders · Institutional Alignment)

The harness documents MEC Define **Step 3** (§7 Deeper Perspective) and **Step 5** (§8 Validate). This addendum documents the **front of the Define process** — the Steps 1–2 market-discovery phase that runs *before* them — executed in full this session for the COMPASS curriculum–labour-market-intelligence venture. The methods are the MEC course methods (problem tree; Steve Blank's iterative industry mapping; value-chain analysis); the **portable extractions** are the iterative question-led mapping discipline (19.2), the honest institutional-scoping rule (19.4), and the designed-deliverable patterns (§13.11–§13.12). Outputs: `compass-problem-tree.md` (problem tree → system map → value chain → secondary-research findings, one large living doc) + `compass-problem-tree.svg`, `compass-stakeholder-analysis.md`, `compass-competitive-strategic-intelligence.md`, `compass-council-alignment.md`, `research-plan.md`, and the designed `compass-market-map/` PDF.

Honesty note up front: like §5/§6/§17, the *maps, stakeholder analysis, and council-alignment were authored inline by hand* — the **evidence behind them came from fan-out research workflows** (the §2/§13.9 shape). The split is called out per artefact in 19.5.

### 19.1 Step 1 — Problem Tree (find a root cause, convert it to a market)

The opening MEC move: take a vague problem ("AI is disrupting universities") and use a **problem tree** to get specific. **Trunk** = the core problem; **roots** = root causes (split *structural* vs *mental-model*); **branches** = effects (near / medium / long-term). Then **pick the one root cause the team finds most interesting *and* highest-leverage**, and **convert it into a market to investigate** — "is there a relevant existing market for X?", then name the analogous *mature* market to learn from (for COMPASS: labour-market-intelligence platforms). When the tree feels thin, **reverse-brainstorm** ("how would we *cause* this problem on purpose?") to surface root causes you missed.

- **Discipline:** act as a **research tool, not a pitch** — root causes are referenced and evidenced, no solution is asserted yet. Each root cause is given *the existing market to research*, *how it overlaps the team's expertise*, and *where the team would need outside help*. (Six root causes for COMPASS; the chosen one — *"no fast, evidence-based, repeatable way to assess a degree's labour-market durability"* — is the market COMPASS now investigates.)
- **Output:** `compass-problem-tree.md` + a designed `compass-problem-tree.svg` rendered on the §13.11 design system.

### 19.2 Step 2 — System Map & Value Chain (Steve Blank, iterative)

Map the market before trying to disrupt it. The method is **Steve Blank's "write down what you already know, then let your own open questions drive the gap-filling"** — a first-pass napkin map, then iterative rounds, each adding the answers to the questions the last round raised. *The loop is not linear; follow curiosity.*

- **Overview ecosystem map** — four participant categories: **direct participants** (producers / suppliers / distributors / standard-setters), **influencers** (regulators / investors / research bodies / unions), **end users** (segmented by type), **adjacent players**. For each group: who they are, what they care about most, what frustrates them, how much power they hold.
- **Value-chain map** — follow value from raw input to end user, mapping four flows: **money** (who pays whom; where margin concentrates), **products/services** (origin → end user), **decision-making power** (who can say yes/no), and **what is hidden** (commercial-in-confidence, informal relationships, externalities). The signature COMPASS finding is **"the break"** — the stage where labour-market intelligence reaches careers/IR offices and *stops*, never crossing into the curriculum decision; the structural gap the venture exists to close.
- **Internal value-chain deep-dive** — drill into the single most interesting organisation (the MEC "certifier" move: high margin, low capital, value built on proprietary knowledge/data, feasible at low volume). For COMPASS that is the LMI vendor (Lightcast): margin concentrates at the proprietary data/taxonomy layer; the "last mile" to curriculum is the unserved gap.

**How the maps actually got filled — the hybrid.** The open questions written on each map became the prompts for **parallel-research fan-out workflows** (the §2 / §13.9 shape: N parallel agents, schema-less web search → schema synthesis). This session ran several: Faethm/Pearson + faculty-PD deep research; a 4-track secondary sweep (AU curriculum-management systems · AusTender procurement · TEQSA action plans · vendor AU presence); a 3-track stakeholder sweep; a 4-track competitive / accreditation / international-cases / incumbent sweep. Each closed a *named* set of map questions, wrote findings back into the living docs, and ended with a **five-falsifiable-claims** hand-off to the Validate interviews. **The pattern to reuse: inline authoring for the map's skeleton; fan-out workflows for the evidence; §13.11 for the designed deliverable.**

### 19.3 Stakeholder analysis (the people layer of the value chain)

A focused companion to the system map — `compass-stakeholder-analysis.md` — structured in four parts: (1) a **terms-and-acronyms primer** for the market; (2) the **four stakeholder groups**, each member profiled on **cares-most / frustrated-by / power-and-influence**, with sourced evidence; (3) **how value flows** (money, products, decision rights, and explicitly *what is hidden from public view*); (4) **recent reports** — verified, ≤12 months old, each with a one-line finding and a working URL. Run it under the same research-tool discipline (third-person, referenced, no pitch). It feeds both the Validate target list (§8/§11) and the designed map (§13.11).

### 19.4 Institutional-alignment & honest scoping — map the venture to the institution's *own* questions

When the institution names its own strategic questions (here: four University Council questions — relevance of the university, the value of a degree, the graduate jobs that motivate study, research integrity), map the venture onto them **honestly**, and resist the strong pull to claim it answers all of them. `compass-council-alignment.md` graded COMPASS **direct** (Q2 degree value, Q3 graduate jobs — its home ground, richest evidence) · **partial** (Q1 relevance — the *economic* dimension only, explicitly **not** formation / community / mentorship) · **out-of-scope** (Q4 research integrity — a sibling problem on the same iceberg, different mechanism), with the evidence already gathered behind each grade.

**Portable rule.** *When leadership's own questions overlap the venture, the highest-trust move is to state coverage precisely — what it answers, what it partly informs, what it does not — and to name the framing risk (a labour-market-durability tool can read as reductive about the university's non-economic value). Naming the boundary is what earns the room; claiming the whole forfeits the evidentiary credibility that is the venture's reason to exist.* This is the §17/§18 honesty stance applied to **positioning**: the same reflex that makes the back half try to kill the venture makes the pitch concede its own edges.

### 19.5 Relationship to the rest of the harness

- **Feeds Step 3 (§7).** The problem tree's chosen root cause and the system map's mental-model candidates seed the Deeper Perspective lenses.
- **Feeds Step 5 (§8 / §11).** The stakeholder analysis and the maps' open questions become the warm-first target list and the falsifiable interview claims; `research-plan.md` (Track 1 secondary, Track 2 interviews, eight priority falsifiable questions) is the bridge.
- **Uses §13.11–§13.12** for the designed `compass-market-map/` PDF (cover · ecosystem map · value chain & the break · internal value chain · synthesis), and ran the §13.12 visual-QA loop repeatedly.
- **Provenance (per artefact):** problem-tree framing, the three maps, stakeholder analysis, council-alignment — **manual/inline**; all secondary-research findings inside them — **fan-out workflows** (§2 / §13.7–§13.9 shape); the PDF — **§13.11 pipeline**.

---

*§19 added 2026-06-06 from the session that ran MEC Define Steps 1–2 for COMPASS — the problem tree, the Steve-Blank system & value-chain maps, the stakeholder analysis, the Council-question alignment, and the designed market-map PDF. The portable extractions are 19.2 (iterative question-led mapping), 19.4 (honest institutional scoping), and the §13.11–§13.12 designed-deliverable patterns. The maps and analyses were authored inline; the evidence behind them came from fan-out research workflows.*
