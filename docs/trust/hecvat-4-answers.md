# HECVAT 4 — Evidura answer set

**Status: DRAFT.** Source of truth for filling the actual workbook.

## What this document is, and is not

HECVAT (Higher Education Community Vendor Assessment Toolkit) is the shared security, privacy, accessibility and AI-governance questionnaire that institutions use to assess edtech vendors. It is maintained by EDUCAUSE with Internet2 and REN-ISAC. **HECVAT 4** (v4.1.5, February 2025) was the largest revision since 2016 and folded **AI governance in as a conditional assessment domain** rather than a separate addendum. EDUCAUSE lists **v4.1.6 (22 July 2026)** as current.

This file is **not** the instrument. The workbook is distributed by EDUCAUSE and is not reproduced here — download the current version and transcribe (VERIFY-4). What this file gives you is an answer set organised by HECVAT 4's domains, so completing the workbook is transcription rather than authorship.

**Answer honestly, including where the answer is "no".** Evidura is an early-stage vendor; a small vendor with truthful answers and named compensating controls survives review, and a vendor caught overstating does not. Several answers below are deliberately "not yet, and here is what we do instead."

---

## Company overview

| Field | Answer |
| --- | --- |
| Product | Evidura — Degree Future-Viability Assessment (DFVA) |
| What it does | Scores degree programs against AI labour-market disruption on a published 11-dimension rubric; produces a Durability Rating and evidence-cited report |
| Deployment model | Multi-tenant SaaS. Single-tenant and in-boundary options are roadmap, not current. |
| Company size | Early-stage. State headcount honestly. |
| Sector experience | Higher education only |
| Sub-processors | Vercel (frontend hosting), Fly.io (application server), PostgreSQL (managed), AWS S3 (file storage), OpenAI (inference), Stripe (payments), SendGrid (transactional email) |

## Data classification — what Evidura actually holds

This is the section that most differentiates us, so answer it precisely.

| Data class | Held? | Detail |
| --- | --- | --- |
| Student records / PII | **No** | No student data of any kind enters the product |
| Staff records | **No** | — |
| FERPA-covered data | **No** | — |
| Health, financial, biometric data | **No** | — |
| Payment card data | **No** | Stripe-hosted; card data never touches our systems |
| Institutional curriculum content (non-public) | **Not currently** | No ingest path exists — see below |
| Public curriculum content | Yes | Published handbook pages, retrieved by URL |
| Derived assessments | Yes | Scores, bands, dimension values, evidence citations, report JSON |
| User account data | Yes | Email address, username, subscription status, Stripe customer id |

**The claim to make in the workbook, because it is true and checkable:** the assessment pipeline accepts a **public handbook URL** (`assessProgram`, `compass/app/src/compass/operations.ts`). There is no facility to upload internal or unpublished curriculum, and no assessment reads from one. The `/file-upload` route is the unmodified OpenSaaS template feature and is not connected to the assessment pipeline.

Consequence: the blast radius of an Evidura compromise is account credentials and derived scores. It does not include any institution's curriculum, and it does not include a single student record.

## Security policy and governance

| Question area | Answer |
| --- | --- |
| Written information security policy | **To be written.** Blocker before first enterprise deal. |
| Named security owner | Yes — founder. State by name. |
| Security awareness training | Not formalised at current headcount |
| Background checks | State honestly |
| Risk assessment cadence | Not formalised |
| Penetration testing | **Not yet performed.** Commit to a date rather than deflect. |
| SOC 2 / ISO 27001 | **Neither held.** Position: pursued when a customer contract requires it. Do not imply one is in progress unless it is. |
| Cyber insurance | State honestly |

Compensating controls to cite: minimal data surface (above), managed platforms carrying their own certifications (AWS, Vercel, Fly.io, Stripe), no student data in scope, and a published rubric that makes the product's outputs externally auditable in a way most vendors' are not.

## Application and product security

| Question area | Answer |
| --- | --- |
| Framework | Wasp 0.24 / React 19 / Prisma / PostgreSQL |
| Transport encryption | TLS in transit across all endpoints |
| Encryption at rest | Provider-managed (Postgres, S3) |
| Authentication | Email and password (Wasp email/password auth) |
| SSO / SAML / Shibboleth | **Not supported.** Roadmap. Flag as a known gap — most institutions will require it. |
| MFA | **Not supported.** Roadmap. |
| Role-based access | Admin flag on `User`; no granular RBAC yet |
| API authentication | API keys, managed via the developer portal (`src/compass/api/auth.ts`), revocable by the user |
| Audit logging | Partial — no per-record view log yet. Roadmap: immutable "who viewed this score, when" log. |
| Dependency management | Dependabot; CI build gate (`.github/workflows/ci-build.yml`) |
| Change management | Conventional commits, PR review, CI must pass, deploys via `deploy.sh` with smoke test |

**Known gaps to declare rather than hide: SSO, MFA, granular RBAC, per-record audit log.** All four are standard institutional requirements. Declaring them with roadmap dates is survivable; being found out is not.

## Hosting and data residency

| Question area | Answer |
| --- | --- |
| Frontend | Vercel |
| Application server | Fly.io (app `compass-server-sxd`) |
| Database | Managed PostgreSQL |
| File storage | AWS S3 |
| **Region(s)** | **VERIFY-2 — must be confirmed before answering.** `flyctl` was unauthenticated when this document was written, so no region could be confirmed from the repository. |
| Data residency options | None offered currently. Australian residency is roadmap. |
| Tenancy | Multi-tenant, logical separation |

**Do not answer the residency question from memory.** It is trivially checkable by the assessor and it is the question Australian institutions care most about. TechnologyOne/CourseLoop holds IRAP assessment to PROTECTED with Australian data centres; we cannot match that and should not imply we can. The honest position: our roadmap answer to sovereignty is architectural — in-boundary scoring, where curriculum content never leaves the institution's network — not certificatory.

## Data retention and deletion

Answer from the [data deletion SLA](data-deletion-sla.md). Headlines:

- Uploaded curriculum documents: deleted within 24 hours of assessment completion (when upload ships)
- Termination: all customer content deleted within 30 days, with a **signed deletion certificate** naming what was destroyed, when, from which systems, and the backup expiry date
- Single-document deletion: 5 business days; full export: 10 business days
- Backups: fixed roll-off cycle, stated exactly rather than claimed as instant erasure

## Privacy

| Question area | Answer |
| --- | --- |
| Applicable regimes | Australian Privacy Act 1988 (APPs), GDPR where EU personal data is processed |
| Personal information held | Account data only — email, username, subscription and Stripe customer reference |
| Cross-border disclosure (APP 8) | Depends on VERIFY-2. Answer once regions are confirmed. |
| Privacy policy | Exists; must be updated to reflect this document |
| Privacy impact assessment | **To be conducted.** OAIC-style PIA, referencing the OAIC guidance on privacy and commercially available AI products. Do this before the first institutional deal — AU institutions recognise the framing and it doubles as evidence here. |
| Data subject requests | Handled manually at current scale; state the response window honestly |
| Breach notification | Notifiable Data Breaches scheme applies. Commit to a notification window. |

## AI governance *(conditional domain — new in HECVAT 4)*

This is the section to over-invest in. It was added in February 2025, and no tracked competitor publishes an equivalent commitment — the research in `ideas_log.md` found **zero** vendors in this category with a public statement on whether curriculum content trains models.

| Question area | Answer |
| --- | --- |
| Does the product use AI? | Yes. LLM inference generates assessment reasoning and report content against a published rubric. |
| Which models / providers | OpenAI. Named as a sub-processor. |
| Is customer content used for training? | **No.** See the [AI-data commitment](ai-data-commitment.md). |
| Zero-retention inference | **VERIFY-1 — do not answer yes until contractually confirmed.** |
| Is the model's reasoning inspectable? | Yes, and this is a differentiator. The rubric is published and versioned (`dfva/source/rubric.ts`); every score carries evidence citations; assessments record the rubric and engine version used. |
| Human oversight | Assessments are advisory inputs to institutional governance decisions, not automated decisions about individuals. |
| Bias / fairness testing | Inter-rater reliability study in progress. State its actual status; do not overstate. |
| Model change management | Rubric and engine versions are recorded per assessment, so a model or rubric change is visible rather than silent. |

### The automated decision-making question

Australian ADM transparency obligations commence **10–11 December 2026**: APP entities must disclose in their privacy policy where personal information feeds automated decisions significantly affecting a person's rights, and how to seek human review.

**Position (VERIFY-3 — needs legal confirmation, this is a lay read):** the obligation attaches to *personal information* used in decisions about *a person*. Evidura assesses **programs, not people**, and processes no personal information in the assessment pipeline. On that reading the ADM provisions do not apply.

Institutions will nonetheless ask, and there is an obvious second-order argument that a durability score could feed a restructure affecting staff. So take the position in writing before December:

1. DFVA assesses programs, not individuals, and uses no personal information to do so.
2. Scores are advisory inputs to human governance processes, never determinative.
3. A human review path exists: any score can be contested, and the evidence behind it is published with it.

Point 3 is a real product commitment, not a legal formality — the rubric, the evidence citations and the version stamps are what make review possible. Cite them.

## Accessibility

| Question area | Answer |
| --- | --- |
| VPAT / ACR | **Not produced.** Institutions increasingly require one. |
| WCAG conformance | Not formally assessed |
| Known gaps | Undetermined pending audit |

Declare as a gap with a commitment date. Do not claim conformance that has not been tested.

## Business continuity

| Question area | Answer |
| --- | --- |
| RTO / RPO | Not formally defined |
| Backups | Provider-managed; configuration to be documented (VERIFY-2) |
| DR testing | Not performed |
| Status page / incident comms | Not established |

## Incident response

| Question area | Answer |
| --- | --- |
| Documented IR plan | **To be written.** Pair with the security policy. |
| Notification commitment | Commit to a window (e.g. 72 hours to affected institutions) and hold to it |
| Forensics capability | Logs retained; scope to be documented |

---

## Completion checklist

- [ ] Download HECVAT 4 v4.1.6 workbook from EDUCAUSE (VERIFY-4)
- [ ] Resolve VERIFY-1 (zero-retention terms) — gates the AI section and the public commitment
- [ ] Resolve VERIFY-2 (hosting regions) — gates the residency and APP 8 answers
- [ ] Resolve VERIFY-3 (ADM legal read)
- [ ] Write the information security policy and incident response plan
- [ ] Conduct the OAIC-style privacy impact assessment
- [ ] Decide and publish roadmap dates for SSO, MFA, RBAC, audit log, VPAT
- [ ] Transcribe into the workbook and publish on request

## Sources

- [EDUCAUSE HECVAT](https://www.educause.edu/higher-education-community-vendor-assessment-toolkit)
- [HECVAT 4 update guide, Isora GRC](https://www.saltycloud.com/blog/hecvat-updates/)
- [OAIC — privacy and commercially available AI products](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products)
- [OAIC — privacy by design](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/privacy-impact-assessments/privacy-by-design)
