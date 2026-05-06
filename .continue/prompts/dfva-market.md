---
name: dfva-market
description: Generate DFVA market-intelligence signals for job families, hiring trends, and X discussions.
---

{{{ input }}}

Create a DFVA market-intelligence scan.

Requirements:

1. Map 4-8 job families tied to the program's first 5 years of graduate outcomes.
2. Summarize recent ad-style hiring signals (prefer last 90 days where available).
3. Summarize relevant discussion themes from X that affect role design and hiring expectations.
4. For each job family include titles, tasks, substitution pressure, rising skills, and evidence notes.
5. End with direct curriculum implications.
6. If data is incomplete, state confidence level and evidence gaps explicitly.

Output sections (exact order):

DFVA MARKET INTELLIGENCE: [PROGRAM NAME]
1. JOB FAMILY MAP
2. RECENT JOB AD SIGNALS
3. CURRENT DISCUSSION SIGNALS (X)
4. SKILL SHIFT SUMMARY (DECLINING vs RISING)
5. CURRICULUM IMPLICATIONS
6. EVIDENCE CONFIDENCE + GAPS

Metadata footer:

- Assessment date (ISO format)
- Source URL(s)
- Prompt version: DFVA-CONTINUE-MARKET-v1

If user asks to save output, return markdown ready for:

reports/dfva-market-[course-code].md
