# Deep-Dive: Agent-Native Distribution Is Fantasy Dressed as Strategy

> Failure mode analysis: the MCP-tool / AI-agent-citation distribution channel generates zero institutional demand in the critical Year 1–3 window, and the underlying assumption that AI coding agents will drive procurement is a category error.
> **Date:** 2026-06-30 · **Based on:** [Business model](evidura-business-model.md) · [MCP server code](../compass/mcp/src/index.ts) · [Brand strategy](compass-brand-strategy.md)

---

## 1. The Failure Story

**The business model document positions agent-native distribution as a crown jewel.** It is listed as a distribution channel in the Business Model Canvas ("Agent-native — MCP tools surfaced in AI coding assistants, agent workflows (the 2027-forward distribution)" — line 17) and elevated to one of five named moats: "Agent-native distribution — the genuinely 2027-forward moat" (line 23). The financial model's unit economics narrative places it fourth in the value-creation sequence, promising "a new channel with near-zero marginal cost (MCP tools consumed by AI agents → institutional demand driven by agents citing Evidura)" (line 170). Phase 3 of the recommended path (Year 4–5) commits to "Agent-native channel delivering measurable institutional demand (AI agents citing Evidura in curriculum governance contexts)" (line 231).

Six MCP tools have been built (`get_assessment`, `query_assessments`, `cross_program_analysis`, `get_methodology`, `list_programs`, `get_report`) in `compass/mcp/src/index.ts` — 301 lines of TypeScript wrapping file reads and JSON serialisation around the DFVA report store. They expose program assessments, aggregate analysis, the methodology document, and markdown improvement reports to AI coding agents via the Model Context Protocol.

**None of this generates a single institutional lead. Not in Year 1. Not in Year 2. Not in Year 3. Not ever, in the form the plan imagines.**

Here is why, tracing forward from the tools to the purchase decision:

**Step 1: An AI coding agent discovers the MCP tools.** The tools exist. They are functional. An agent — Claude Code, Continue, Copilot Chat — can call `get_assessment mc-cs` and receive a JSON blob of 11 dimension scores, a risk band, and a recommendation. The agent can call `cross_program_analysis` and receive aggregate statistics. This is technically impressive. It is also commercially meaningless, because:

**Step 2: The person directing the AI agent is not a buyer.** The user of Claude Code, Continue, or Copilot Chat is a software developer. The buyer of Evidura is a DVC-Academic, a Dean, or a Program Director — a senior university administrator whose working day consists of email, meetings, committee papers, budget spreadsheets, and procurement processes. They do not use AI coding agents. They have never heard of the Model Context Protocol. They will never install an MCP server. The user of the channel and the buyer of the product are different people, and no mechanism exists to connect them.

**Step 3: Even if the AI agent cites Evidura, the citation has zero procurement consequence.** The plan imagines "AI agents citing Evidura in curriculum governance contexts" as a demand driver. But a citation in an AI agent's output is not a purchase order. It is not a budget line item. It is not a committee recommendation. It is text in a terminal. The chain from "Claude Code mentions Evidura in a response" to "DVC-Academic signs a $49,000 annual subscription" requires leapfrogging the entire university procurement machinery — the same machinery the procurement-velocity deep-dive correctly identifies as a 12–18 month, committee-governed, budget-cycle-constrained process that cannot be short-circuited by word-of-mouth from Go8 peers, let alone by an AI assistant's suggestion.

**Step 4: The "near-zero marginal cost" framing is a red herring.** Yes, serving JSON to MCP clients costs almost nothing. But the cost of a distribution channel is not its infrastructure — it's its conversion rate. A channel with zero marginal cost and zero conversion is not a channel; it's a hobby project. The agent-native channel costs nothing to run and produces nothing. That is not efficiency. That is irrelevance.

**Step 5: The Year 1–3 window is when revenue must actually materialise.** The business model projects $1.64M in Year 3 revenue, with the path to profitability depending on institutional subscriptions closing in Years 2–3. Agent-native distribution is a Year 4–5 play in the plan's own timeline (Phase 3: "Agent-native channel delivering measurable institutional demand"). But the plan simultaneously treats it as an active channel in the BMC and a named moat from day one. This creates a temporal vacuum: the channel is expected to produce demand at some unspecified future date, while the revenue model requires demand *now*. When Year 3 closes with $0 in agent-native-attributable revenue, the plan will have no explanation — because it never specified what agent-native-attributable revenue would look like.

**The year-by-year reality:**

| Year | Agent-Native Expectation (per plan) | Actual Outcome |
|------|-------------------------------------|----------------|
| Year 1 | "MCP tools publicly available; agent-native distribution seeding demand" (line 224) | 6 MCP tools running on stdio. Zero leads. Zero awareness among buyers. Zero measurable impact. |
| Year 2 | Continued seeding, channel matures | Same. The tools haven't changed. The buyers haven't started using AI coding agents. Nothing has connected. |
| Year 3 | Continued seeding, channel matures | Same. By now the channel has produced three full years of zero attributable revenue and the term "agent-native distribution" has quietly disappeared from board decks. |
| Year 4–5 | "Agent-native channel delivering measurable institutional demand" (line 231) | The channel is never mentioned again. It joins the graveyard of forward-looking slide-deck promises that sounded transformative at the time. |

**The betrayal is in the language.** The business model calls this "the genuinely 2027-forward moat" — language that positions it as both visionary and inevitable. But a moat is a *defensive* asset — something that protects you once you've already won. Agent-native distribution is not a moat. It is an *offensive* channel hypothesis. To function as a moat, Evidura must first *win the market* through other means, at which point MCP tools provide a defensive convenience for existing customers. To function as a channel — which is how the BMC classifies it — it must *produce demand*. It does not. Cannot. Will not. And calling it a moat while listing it as a channel is category confusion that masks the absence of a real near-term distribution strategy.

**The ultimate irony:** If agent-native distribution ever *did* work — if AI coding agents genuinely became a procurement-influencing channel for university curriculum governance — the channel would favour the competitor with the largest dataset, not the first mover. An AI agent asked "compare this program's durability against the sector" would surface whatever data is most comprehensive. Lightcast, with 18+ billion labour market data points and existing cross-jurisdictional benchmarks, would dominate that channel instantly. Evidura's agent-native tools would route demand to Lightcast's data — because the agent doesn't care about Evidura's moat rhetoric; it cares about data completeness.

---

## 2. The Underlying Assumption

> **"AI coding agents will become a procurement-influencing distribution channel for B2B products sold to non-technical university administrators."**

This is the invisible premise that makes the agent-native strategy coherent. It is composed of four nested sub-assumptions, each of which is false or unproven:

### Sub-assumption 1: The user of the channel is the buyer of the product

**What the plan assumes:** That the person directing an AI coding agent (a developer, a technical analyst, a data scientist) is either the same person who makes $49,000 procurement decisions about curriculum governance tools, or that they can influence that person sufficiently to drive a purchase.

**Why it's false:** The DVC-Academic, Dean, and Program Director — the named primary customer segments (line 15) — do not use AI coding agents. Their tool stack is Outlook, Teams, Excel, PDF committee papers, and the university's ERP. The people who *do* use AI coding agents (developers, data analysts, technical staff) have no budget authority over curriculum governance tools and no incentive to advocate for a durability rating they didn't ask for. The organisational distance between a developer running Claude Code and a Dean signing a procurement contract is measured in reporting layers, institutional politics, and budget cycles — none of which a JSON API can traverse.

The business model itself contradicts this assumption in its own customer segmentation: the primary buyers are "university leadership — DVC-Academic, Deans, Program Directors, curriculum governance committees" (line 15). These are not agent users. The plan never explains how agent citations reach them or why they would act on them.

### Sub-assumption 2: AI agent citations carry procurement authority

**What the plan assumes:** That when an AI agent cites Evidura — mentions it in a response, recommends it as a data source, surfaces a program rating — this citation converts to institutional demand. The plan explicitly imagines "institutional demand driven by agents citing Evidura" (line 170).

**Why it's false:** There is zero precedent for AI agent citations driving institutional procurement of any B2B product, in any sector, at any price point. This is not merely unproven for Evidura — it is unproven for the entire category. AI coding agents are 18–24 months old as a mainstream tool. The Model Context Protocol is newer. The hypothesis that agent citations → procurement decisions is speculative to the point of fantasy. It assumes a causal chain that has never been observed:

```
[AI agent cites Evidura] → [developer notices] → [developer advocates internally] →
[advocacy reaches curriculum governance] → [committee considers] → [budget allocated] →
[procurement initiated] → [12-18 month cycle] → [$49K subscription signed]
```

Every arrow in this chain is unproven. Most of them are implausible. The first arrow alone — "developer notices an AI agent citing a curriculum durability rating and cares enough to advocate for it internally" — requires a developer to have both the context to recognise Evidura as actionable and the motivation to champion a tool they didn't seek out. Developers don't advocate for B2B SaaS tools their organisation didn't ask for. They advocate for developer tools.

### Sub-assumption 3: "Near-zero marginal cost" implies "productive channel"

**What the plan assumes:** That because serving MCP requests costs almost nothing in infrastructure, the channel is inherently valuable — a free distribution layer that compounds over time.

**Why it's false:** The cost of a distribution channel is not its serving cost. It's its *conversion cost* — the cost of turning a channel interaction into a purchase. The plan conflates operational cost with commercial productivity. A channel that costs nothing to run and produces nothing is not an asset; it's a distraction. The language "near-zero marginal cost" (line 170) is financial framing that smuggles in the assumption of value — as if low cost is itself evidence of effectiveness. It is not. A sandwich board outside the office has near-zero marginal cost and generates zero institutional demand. The agent-native channel is the digital equivalent.

### Sub-assumption 4: The temporal gap will close itself

**What the plan assumes:** That even though agent-native distribution is a Year 4–5 play, something about the trajectory of AI adoption will make it self-executing — the tools will be built, agents will discover them, citations will happen, demand will follow, all without Evidura needing to invest in channel development beyond building the MCP server.

**Why it's false:** The plan commits to Phase 3 (Year 4–5): "Agent-native channel delivering measurable institutional demand." But it allocates no resources to making this happen. No sales headcount for agent-ecosystem partnerships. No marketing budget for developer relations. No product work on agent-specific UX (the MCP tools return raw JSON — there is no agent-optimised output, no structured comparison format, no citation-embedding mechanism). The channel is expected to work through *presence alone* — "if you build it, they will cite it, and if they cite it, someone will buy it." This is Field of Dreams distribution strategy, and it has the commercial track record of Field of Dreams distribution strategy.

### Why the assumption was easy to miss

It's a seductive framing. "Agent-native" sounds like the future. It positions Evidura as forward-thinking. It requires almost no upfront investment (the MCP server is 301 lines of TypeScript — a weekend project). It can be added to the BMC and the moat list and the Phase 3 roadmap without anyone asking "how exactly does this produce a lead?" because everyone in the room is already bought into the premise that AI agents are the next distribution paradigm. The assumption survives because it's never stress-tested against the actual buyer persona. The moment you ask "would a Dean use this?" the entire channel collapses — but the plan never asks that question.

---

## 3. Early Warning Signs

These indicators were visible in the business model document itself and the surrounding project materials. They would have flagged the agent-native channel as a strategic fantasy before any resources were committed:

### Warning Sign 1: The channel's user persona and buyer persona are explicitly different people — and the plan never connects them

**Source:** Business model §1, Customer Segments (line 15): "Primary: Australian university leadership — DVC-Academic, Deans, Program Directors, curriculum governance committees." Business model §1, Channels (line 17): "Agent-native — MCP tools surfaced in AI coding assistants, agent workflows."

**What it tells you:** The plan's own segmentation reveals the mismatch. The people who use MCP tools are developers using AI coding assistants. The people who buy Evidura are senior university administrators. These are non-overlapping populations. The plan lists them side by side as if the channel naturally connects its users to its buyers, but there is no bridging mechanism — no description of how a citation in Claude Code reaches a Dean's desk, no explanation of why a Dean would act on it, no evidence that this transmission has ever occurred for any product in any sector.

### Warning Sign 2: "Agent-native" appears in the BMC but produces exactly zero attributable revenue in the financial model

**Source:** Business model §3 (Revenue Model, lines 42–86). The entire revenue projection — $280K Year 1, $920K Year 2, $1.64M Year 3, $10M Year 5 — can be accounted for entirely through direct B2B enterprise sales, accreditation partnerships, the annual index, seal licensing, and international expansion. There is no line item for agent-native-attributable revenue. There is no agent-native revenue stream in the secondary revenue table (§3.2). There is no target for agent-native-sourced leads.

**What it tells you:** The plan treats agent-native distribution as strategically important enough to name as a moat and list as a channel, but not important enough to model revenue from. This is the signature of a slide-deck artifact — something that looks good in a strategy document but has no operational reality. If the channel were genuinely expected to produce demand, there would be a number attached to it. There is no number because no one believes strongly enough to put one there.

### Warning Sign 3: The six MCP tools are thin wrappers with no agent-specific optimisation

**Source:** `compass/mcp/src/index.ts` (301 lines). All six tools follow the same pattern: receive a parameter, call a function from the report store, return JSON or markdown. There is no agent-optimised output format, no structured comparison schema, no citation-embedding mechanism, no link between the MCP tool output and any commercial call-to-action.

**What it tells you:** The tools were built as a technical demonstration, not as a distribution channel. A genuine agent-native distribution channel would include:
- Agent-optimised comparison outputs (structured for LLM consumption, not human reading)
- Citation-ready formats (canonical URLs, DOI-style permanent identifiers, embeddable badges)
- A commercial pathway from agent citation to purchase (a landing page linked from every response, a "powered by Evidura" attribution requirement, an API key system that converts heavy users to paid)
- Agent-ecosystem partnerships (Claude MCP marketplace listing, Copilot extension, Continue skill package with commercial hooks)

None of this exists. What exists is a read-only JSON API. That's an integration, not a channel.

### Warning Sign 4: The plan's own timeline postpones agent-native impact beyond the revenue-critical window

**Source:** Business model §7, Phase 3 (line 231): "Agent-native channel delivering measurable institutional demand" is listed under Phase 3 (Year 4–5). But Phase 2 (Year 2–3, line 224) already claims "MCP tools publicly available; agent-native distribution seeding demand."

**What it tells you:** The plan simultaneously claims the channel is active in Years 2–3 ("seeding demand") and that it won't produce measurable results until Years 4–5. This is hedging dressed as phasing. "Seeding demand" is not a measurable activity — it's a permission to claim the channel exists without being accountable for whether it works. When Year 3 closes with zero agent-native-attributable revenue, the response will be: "We said it was seeding — the harvest comes in Year 4." And when Year 4 closes with zero, the response will be: "We said Year 4–5." And when Year 5 closes with zero, the channel will have been quietly dropped. This pattern — indefinite deferral of measurable outcomes — is the hallmark of a strategic placeholder, not a strategy.

### Warning Sign 5: There is no precedent for this channel in any comparable business

**Source:** Absence. Nowhere in the business model, the competitive intelligence, or the market sizing documents is there an example of a B2B product — let alone a rating agency — whose institutional demand was driven by AI coding agent citations. The plan cites NABERS, Moody's, and Health Star Rating as comparables for the rating agency model — none of which have an agent-native distribution channel.

**What it tells you:** Evidura is being asked to pioneer a distribution channel that has never been proven for any product, while simultaneously building a new product category, in a new market, with a new brand, sold to a procurement environment the plan itself acknowledges is slow and difficult. First-of-kind distribution channels on top of first-of-kind products on top of first-of-kind markets is not a strategy — it's stacking three unproven bets and calling it innovation.

### Warning Sign 6: The moat language smuggles in the assumption of market victory

**Source:** Business model §1, Moats (line 23): "Agent-native distribution — the genuinely 2027-forward moat."

**What it tells you:** A moat is a defensive asset — it protects a business that has already won market share. Calling agent-native distribution a "moat" assumes Evidura has already captured the market and is now defending it against competitors who lack agent-native tools. But the business model projects Evidura won't reach $1.64M ARR until Year 3 and won't hit $10M until Year 5. At those revenue levels, Evidura is not defending market share — it's trying to acquire it. The moat framing is premature by 5–7 years, and it creates the illusion that a speculative future capability is a present-day competitive advantage.

### Warning Sign 7: The entire agent-native strategy could be deleted from the plan with no revenue impact

**Source:** Business model §3 (Revenue Model). Remove "Agent-native" from the Channels row of the BMC. Remove it from the Moats list. Remove lines 170 and 231 from the narrative. What changes in the financial model? Nothing. The revenue projections, cost structure, P&L, unit economics, and risk register are all unchanged. The agent-native channel is structurally decoupled from the business's financial reality.

**What it tells you:** A distribution channel that can be removed from a business plan without affecting any financial projection is not a distribution channel. It's decoration. The fact that the plan works identically with or without agent-native distribution is the clearest possible signal that it was added for narrative purposes, not commercial ones.

---

## 4. What a Mitigated Strategy Would Look Like

If this failure mode is identified early enough (i.e., before the plan commits to naming agent-native distribution as a channel or moat), there are corrective actions:

### 4.1 Remove agent-native from the distribution channels list

Agent-native is not a distribution channel for Evidura's buyer persona. It is, at best, a *developer-facing API* that could support integration partners. Move it from "Channels" in the BMC to "Key Resources" (where it already partially sits — line 19 lists "MCP infrastructure — the agent-native distribution layer" under Key Resources). Key Resources are things you *have*, not things that *produce revenue*. This is an honest reclassification.

### 4.2 If agent-native must stay, define it honestly

If the MCP tools are retained, define them for what they actually are:

| Honest Description | Current Inflated Description |
|---|---|
| "MCP server exposing DFVA assessment data for integration and research purposes" | "Agent-native distribution — the genuinely 2027-forward moat" |
| "Developer API that may support future partner integrations" | "Agent-native channel delivering measurable institutional demand" |
| "Technical infrastructure for data access" | "Agent-native — MCP tools surfaced in AI coding assistants, agent workflows (the 2027-forward distribution)" |

The honest descriptions are still true. They still justify the MCP server's existence. They just don't promise commercial outcomes the server cannot deliver.

### 4.3 Replace agent-native with channels that actually reach Deans

The channels that will produce institutional demand in Years 1–3 are:
1. **Direct B2B enterprise sales** (already in the BMC — this is the real channel)
2. **Conference and peak-body presence** (already in the BMC — UA, TEQSA forums)
3. **Go8 reference network** (already in the BMC — peer influence among the people who actually make procurement decisions)
4. **Academic publication and the annual index** (already in the BMC — the credibility-building channel that reaches DVC-Academics in their own language)

These four channels can reach Deans. Agent-native cannot. The plan already has the right channels. It just dilutes them by adding a fifth that doesn't work.

### 4.4 If agent-native becomes relevant, it will be through accreditation bodies, not developers

The one scenario where AI agent citations *could* matter: if an accreditation body (AACSB, AMC) embeds the Durability Rating as an evidence input and their own AI-assisted accreditation workflows cite Evidura ratings. In that case, the citation carries institutional authority — not because an AI agent said it, but because the *accreditation body* requires it. This is the accreditation-body channel (business model Option D), not the agent-native channel. The agent-native delivery is the *mechanism*, not the *strategy* — and the strategy (accreditation-body partnerships) is already in the plan as a real channel.

### 4.5 Allocate the saved strategic attention to procurement-velocity mitigations

The agent-native channel consumes strategic attention — it appears in the BMC, the moat list, the roadmap phases, and the unit economics narrative. That attention could be redirected to the actual binding constraint: getting 12–18 month university procurement cycles to close faster. The procurement-velocity deep-dive identifies real mitigations (TEQSA alignment, consortium buying, embedding in existing budget lines). None of them are enhanced by an MCP server. All of them would benefit from the strategic bandwidth currently occupied by agent-native rhetoric.

---

*This deep-dive is part of the Evidura failure-mode analysis series. It should be reviewed alongside the procurement-velocity and benchmark-flywheel deep-dives. The three analyses together identify a pattern: the business model's most ambitious projections depend on the three weakest links in the chain — sales velocity, data scale, and a distribution channel that doesn't reach the buyer.*
