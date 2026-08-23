# Evidura Chief of Staff — Risk Radar & Premortem Register

> **Risk Governance**: Active threat monitoring, premortem scenarios, and concrete mitigations for the Evidura venture.

---

## 🎯 Active Risk Radar

```
High Impact ▲  [ RISK-02: LLM Scoring Drift ]       [ RISK-01: UoM Spinout IP Block ]
            │
            │  [ RISK-04: Anti-Bot Hardening ]       [ RISK-03: Trademark Conflict ]
            │
            │  [ RISK-06: Database Schema Drift ]    [ RISK-05: Incumbent Fast-Follow ]
Low Impact  └────────────────────────────────────────────────────────────────────────►
            Low Probability                          High Probability
```

---

## Detailed Risk Profiles & Mitigations

### RISK-01: University Commercialisation Delays / Restrictive IP Claims
- **Category**: Governance / Legal
- **Impact**: Critical | **Probability**: Moderate
- **Premortem Scenario**: UoM Chancellery claims full proprietary ownership of DFVA methodology and prevents external commercial spin-out or VC equity investment.
- **Active Mitigation**:
  - Maintain clean separation between internal academic research and independent commercial codebase (`docs/evidura-uom-commercialisation-reference.md`).
  - Establish advisory independence structure (`docs/evidura-independence-structure.md`).
  - Engage UoM Knowledge Commercialisation Australasia (KCA) guidelines early with non-exclusive academic licensing models.

### RISK-02: LLM Scoring Fluctuation & Validity Challenges
- **Category**: Methodology / Product
- **Impact**: High | **Probability**: Low-Moderate
- **Premortem Scenario**: Academic deans challenge score validity citing inconsistent scores generated across different model versions.
- **Active Mitigation**:
  - Lock 11-dimension rubric anchors and publish clear scoring rubrics.
  - Implement programmatic inter-rater reliability validation (`docs/evidura-inter-rater-reliability-study.md`).
  - Keep human-in-the-loop review for published reports (`reports/*.md`).

### RISK-03: Trademark & Domain Conflicts
- **Category**: Brand / IP
- **Impact**: High | **Probability**: Moderate
- **Premortem Scenario**: Trademark filing in Nice classes 9/35/41/42 encounters blocking opposition from existing `evidura.app` or enterprise analytics trademarks.
- **Active Mitigation**:
  - IP Australia first-filing search completed (`docs/compass-naming.md`).
  - Domain `evidura.ai` secured.
  - Public marketing rollout gated until formal legal clearance.

### RISK-04: Handbook Ingestion Anti-Bot Lockouts
- **Category**: Engineering / Data Pipeline
- **Impact**: Moderate | **Probability**: Moderate
- **Premortem Scenario**: Universities deploy aggressive Cloudflare Turnstile / CAPTCHAs across their public handbook portals, halting data ingestion.
- **Active Mitigation**:
  - Dual-pipeline architecture: Crawl4AI for open Go8 endpoints + human-paced Chrome browser queue (`scripts/v4-capture-antigravity.py`) with automatic circuit breaker.
