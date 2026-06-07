---
mode: ask
description: Run a full Degree Future-Viability Assessment (DFVA) and return a structured report.
---

Run a complete DFVA assessment using the input below.

Input:

${input:Program URL, program code, or program description}

Execution rules:

1. If input is a URL, use it as the primary source.
2. If input is only a course code or name, infer the official handbook URL.
3. For UniMelb examples, default to: https://handbook.unimelb.edu.au/2025/courses/[COURSE-CODE].
4. Extract evidence from curriculum details, including named units/modules where available.
5. Apply the DFVA rubric exactly and provide integer scores 0-3 for each dimension and bonus.
6. Compute total out of 36 and map to risk band.
7. Answer threshold questions with YES, NO, or UNCERTAIN and rationale.
8. Produce a direct verdict on 2027 viability.
9. Provide prioritised recommendations and a redesigned graduate profile.

Output contract (required order):

DFVA REPORT: [PROGRAM NAME]
Institution: [University / TAFE / Bootcamp / Online provider]
Level: [Certificate / Diploma / Bachelor / Master / PhD]
Duration: [Typical duration]

1. PROGRAM PROFILE
2. AUTOMATION EXPOSURE PROFILE
3. DFVA SCORECARD
4. THREE THRESHOLD QUESTIONS
5. ANALOGUE GRADUATE PROFILE
6. VERDICT
7. RECOMMENDATIONS
8. THE REDESIGNED GRADUATE PROFILE

Scoring and risk mapping:

Map the total to the risk band defined in `.github/copilot-instructions.md` (Risk Bands).

Behavior constraints:

- Ground each score with source evidence.
- Do not conflate prestige with labor-market durability.
- Avoid vague hedge conclusions; commit to score and band.
- If source data is missing, state uncertainty and proceed with best-evidence scoring.
- For multi-program input, produce full reports first, then a divergence comparison table.

Required metadata:

- Assessment date (ISO format)
- Source URL(s)
- Prompt version: DFVA-COPILOT-PROMPT-v1

If asked to save output, return markdown ready for reports/dfva-[course-code].md.
