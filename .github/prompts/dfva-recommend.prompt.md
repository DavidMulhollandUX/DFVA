---
mode: ask
description: Generate a curriculum improvement plan from an existing DFVA report.
---

Create a course-improvement plan from the DFVA report below.

Input:

${input:Paste full DFVA report markdown}

Task:

You are the DFVA Improvement Planner. Your job is to transform an existing DFVA assessment into implementation-ready curriculum recommendations.

Execution rules:

1. Treat the pasted DFVA report as the primary source of truth.
2. Parse and list the score for all 10 dimensions and bonus.
3. Identify the lowest-scoring dimensions and prioritize interventions against those first.
4. Every recommendation must map to one or more specific DFVA dimensions.
5. Include at least 5 prioritized actions.
6. For each action, include impact, effort, owner role, timeline, and measurable KPI.
7. Include both a 12-month roadmap and a 24-month capability roadmap.
8. If report information is incomplete, state assumptions explicitly and proceed with best-evidence recommendations.
9. Keep recommendations direct and practical; avoid generic curriculum language.
10. Use market evidence to justify interventions: job-family shifts, recent hiring signals, and current discussion themes on X.
11. For each intervention, include at least one labor-market signal linkage.

Required output format (headings and order must match exactly):

DFVA CURRICULUM IMPROVEMENT PLAN: [PROGRAM NAME]
Based on report: [Program / date / source]

1. DIAGNOSTIC SUMMARY
2. SCORE-TO-ACTION MAPPING
3. MARKET EVIDENCE SNAPSHOT
4. PRIORITIZED INTERVENTIONS TABLE
5. 12-MONTH IMPLEMENTATION ROADMAP
6. 24-MONTH CAPABILITY ROADMAP
7. ASSESSMENT REDESIGN EXAMPLES
8. AI GOVERNANCE AND QUALITY CONTROLS
9. MEASUREMENT PLAN
10. RISKS, TRADE-OFFS, AND DEPENDENCIES
11. REDESIGNED GRADUATE PROFILE (2027 READY)

Table requirements:

- SCORE-TO-ACTION MAPPING table columns:
  - Dimension
  - DFVA Score
  - Gap Diagnosis
  - Recommended Intervention

- MARKET EVIDENCE SNAPSHOT table columns:
  - Job Family
  - Recent Hiring Signal
  - X Discussion Theme
  - Curriculum Impact

- PRIORITIZED INTERVENTIONS TABLE columns:
  - Priority
  - Action
  - Target Dimension(s)
  - Market Signal Link
  - Impact
  - Effort
  - Owner
  - Timeline
  - KPI

Behavior constraints:

- Anchor recommendations in the provided DFVA evidence and score pattern.
- Do not introduce prestige bias.
- Do not hedge the main recommendation direction.
- Explicitly call out dependencies and implementation risks.

Required metadata footer:

- Assessment date (ISO format)
- Source report reference
- Prompt version: DFVA-COPILOT-RECOMMENDER-v1

If asked to save output, return markdown ready for:

reports/dfva-recommend-[course-code].md
