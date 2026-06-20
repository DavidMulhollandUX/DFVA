---
mode: ask
description: Generate a DFVA market-intelligence scan for job families, hiring signals, and discussion trends.
---

Run a DFVA market-intelligence scan for the program below.

Input:

${input:Program URL, program code, or program description}

Task:

Generate a tangible labor-market evidence pack to support DFVA scoring and recommendation quality.

Execution rules:

1. Identify 4-8 relevant job families for years 1-5 post-graduation.
2. Summarize recent hiring signal examples from job advertisements (prefer last 90 days when available).
3. Summarize current discussion themes on X relevant to these job families (tools, workflows, role changes, hiring expectations).
4. If live retrieval is limited, state assumptions and confidence explicitly.
5. For each job family include:
   - Typical entry titles
   - Core tasks
   - AI substitution pressure (Low/Medium/High)
   - Skills increasing in demand
   - Evidence notes (date/source)
6. Produce direct implications for curriculum design and assessment changes.

Required output format (exact order):

## DFVA MARKET INTELLIGENCE: [PROGRAM NAME]
## 1. JOB FAMILY MAP
## 2. RECENT JOB AD SIGNALS
## 3. CURRENT DISCUSSION SIGNALS (X)
## 4. SKILL SHIFT SUMMARY (DECLINING vs RISING)
## 5. CURRICULUM IMPLICATIONS
## 6. EVIDENCE CONFIDENCE + GAPS

Required metadata footer:

- Assessment date (ISO format)
- Source URL(s)
- Prompt version: DFVA-COPILOT-MARKET-v1

If asked to save output, return markdown ready for:

reports/dfva-market-[course-code].md
