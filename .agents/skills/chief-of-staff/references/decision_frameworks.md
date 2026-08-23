# Evidura Decision Frameworks & Risk Premortems

## 1. Adversarial Honesty Framework
Every strategic proposal, scoring rubric update, or market assertion must undergo adversarial stress-testing:
1. **The "We are wrong if..." test**: Formulate an explicit, testable refutation condition for each hypothesis.
2. **Mom-Test Customer Discovery**: Never ask "Would you use this?". Ask about past behavior, actual budgets spent on curriculum reviews, and current pain points.
3. **Refutation Propagation**: If evidence refutes an earlier claim in the workbook, immediately update downstream dependent documents (`docs/agent-harness.md` §18).

---

## 2. Experiment Backlog Prioritisation Formula
Prioritise strategic experiments and engineering tasks using the weighted formula:

$$\text{Priority Score} = \frac{\text{Existential Risk} \times \text{Time Sensitivity}}{\text{Cost to Test (Time/Money)}}$$

- **P0**: High risk, urgent, low-to-medium cost (e.g., trademark verification, UoM commercialisation terms, scoring validity calibration).
- **P1**: High impact, medium risk (e.g., Go8 cross-university benchmark reports, automated UI charts).
- **P2**: Optimisation and polish (e.g., style refinements, secondary integrations).

---

## 3. Failure Mode Premortems & Mitigations

| Failure Mode | Threat | Mitigating Strategy |
|---|---|---|
| **Competitor Free Entry** | Incumbents copy scoring model | Deep methodology defensibility, inter-rater reliability dataset, proprietary handbook ingestion pipeline. |
| **LLM Scoring Drift** | LLM scores fluctuate across runs | Strict rubric calibration, few-shot anchor sets, inter-rater reliability studies, automated test suites. |
| **UoM Commercialisation Roadblock** | University claims restrictive IP or delays spinout | Clean separation of internal research vs venture artifacts, early spinout structuring terms, independent governance board. |
| **Handbook Anti-Bot Hardening** | Universities block crawlers | Hybrid capture: browser-based human-paced queue for sensitive endpoints + Crawl4AI for open endpoints. |
