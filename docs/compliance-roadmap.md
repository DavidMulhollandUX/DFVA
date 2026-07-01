# COMPASS — SOC 2 & ISO 27001 Compliance Plan

## Context

COMPASS (the Wasp/OpenSaaS app in `compass/app/`) is being taken toward **SOC 2** and **ISO 27001** so it can sell to universities and institutions whose procurement requires a security attestation. Neither standard is "made true in code" — ~70% is organisational documentation + operating evidence, ~30% is technical controls in the app. This plan splits the work along two axes:

- **Part A — What to document** (the ISMS: policies, registers, evidence).
- **Part B — What to develop in the app** (the technical control gaps, each grounded in a real file).

Current state (from codebase exploration): the app has solid fundamentals — Wasp email auth, per-user ownership checks on most operations, hashed API keys (SHA-256, raw key never stored — `compass/app/src/compass/api/auth.ts`), 19 auth tests. But it has **zero audit logging, three broken authorization checks, no MFA, no data-retention/deletion, no backups config, no security scanning in CI, and no governance docs**. `features/feat-004.md:125` explicitly deferred "SOC 2 / ISO 27001 compliance" — this plan reverses that deferral.

**Recommended approach:** pursue **ISO 27001 first** (carries more weight with AU/UniMelb/international buyers), treating SOC 2 as a near-free follow-on since the two share ~80% of controls. Adopt a **compliance automation platform (Vanta / Drata / Secureframe)** on day one — it supplies the policy templates in Part A and auto-collects the evidence, which is the single highest-leverage decision for a small team. Realistic budget: **AU$20–60k and 6–12 months** to first certification including tooling + auditor.

---

## Part A — What to Document (the ISMS)

These are **organisational artifacts**, not code. A compliance platform ships templates for most; the work is tailoring them to COMPASS and then *operating* them. Store all of these in a new `compliance/` directory (or the platform), with the public-facing subset in the repo.

### A1. Core governance policies (ISO 27001 Annex A / SOC 2 CC-series)
| Document | Covers | Notes for COMPASS |
|---|---|---|
| **Information Security Policy** | Top-level ISMS statement, scope, ownership | Scope = the Wasp app + its data. Owner = you. |
| **Risk Assessment & Treatment Plan** | Formal risk register + treatment decisions | **ISO-mandatory.** Seed it from Part B gaps below. |
| **Access Control Policy** | Least privilege, admin access, `isAdmin`/`ADMIN_EMAILS` governance, access reviews | Reference `src/auth/userSignupFields.ts`. |
| **Change Management Policy** | Branch protection, PR review, deploy approval | Formalise the git flow; add CODEOWNERS. |
| **Incident Response Plan** | Detect → triage → notify → remediate → post-mortem; breach-notification timelines | None exists today. |
| **Business Continuity / DR Plan** | RTO/RPO, backup + tested restore | Depends on B7 (backups). |
| **Vendor / Subprocessor Management Policy** | How third parties are assessed, DPAs tracked | Drives A2. |
| **Data Classification & Handling Policy** | public / internal / confidential tiers | No classification exists; assessment data + alumni PII = confidential. |
| **Data Retention & Deletion Policy** | Retention windows + DSAR/right-to-erasure process | Drives B4. |
| **Secure Development Policy (SDLC)** | Testing, code review, dependency management, secrets handling | Point at existing vitest/Playwright + Part B CI work. |
| **Cryptography Policy** | TLS in transit, encryption at rest, key management | Reference S3, Postgres, API-key hashing. |
| **HR / Personnel Security** | Onboarding/offboarding, security training, confidentiality | Even for a solo/small team, document it. |
| **Acceptable Use / Asset Management** | Devices, accounts, inventory | Lightweight for a small team. |

### A2. Registers & evidence artifacts (maintained continuously)
- **Subprocessor register + signed DPAs** — one row per external service, each needs a Data Processing Agreement: **OpenAI, Stripe, Lemon Squeezy, Polar, AWS S3, SendGrid/Mailgun (when live), Google Analytics / Plausible, the Postgres host (Fly.io/Railway/Neon).** Record data categories, region, and data flow. (Full list in the exploration — `src/payment/`, `src/file-upload/s3Utils.ts`, env schemas.)
- **Data inventory / data-flow diagram** — every PII model (`User`, `AlumniDestination`, `CourseInterventionOwner`, `ContactFormMessage`, `File`, `AssessmentJob`) and where data flows outbound (esp. curriculum content → OpenAI).
- **Risk register** — living; seeded from Part B.
- **Asset inventory** — repos, prod infra, SaaS accounts.
- **Access review log** — periodic evidence of who has prod DB / Vercel / admin access.
- **Statement of Applicability (SoA)** — **ISO-mandatory**: maps each Annex A control to applicable/justified.

### A3. Public-facing / repo docs (create in-repo now — cheap wins)
- `SECURITY.md` (vulnerability disclosure), `PRIVACY.md` (privacy policy), `CODEOWNERS`, and a short `docs/security-architecture.md` (threat model + data flows). Grep confirms none exist today.

---

## Part B — What to Develop in the App

Each item is a real technical control an auditor tests. Ordered by severity. **Fix the authz bugs (B1) first — they're live vulnerabilities regardless of compliance.**

### B1. Fix the three broken authorization checks — CRITICAL, do now
Real IDOR-class gaps found during exploration:
- **`getDownloadFileSignedURL()`** (`src/file-upload/operations.ts:110-119`) — issues an S3 pre-signed URL from an `s3Key` with **no auth and no ownership check**. Any caller can download any file by guessing keys. Add `context.user` check + verify the `File` row belongs to the user before signing.
- **`getCourseInterventions()`** (`src/compass/operations.ts:203-212`) — returns interventions for any `assessmentJobId` without verifying the job's owner. Add `AssessmentJob.userId === context.user.id` check.
- **`updateCourseIntervention()`** (`src/compass/operations.ts:163-201`) — same missing check on write. Add ownership verification before upsert.
Reuse the existing pattern from `getAssessmentJob()` (`operations.ts:94-113`), which does this correctly. Add authorization regression tests alongside `__tests__/apiAuth.test.ts`.

### B2. Audit logging — CRITICAL (biggest single compliance gap)
No audit trail exists. A `Logs` model exists (`schema.prisma:97-103`) but is used for two ad-hoc error writes only. Build:
- New Prisma `AuditLog` model: `id, timestamp, actorUserId, action, entityType, entityId, ip, metadata (json)`.
- A thin logging helper called from security-relevant operations: **auth events (login, failed login, password reset), admin actions (`updateIsUserAdminById`), data access/export, file up/download, API-key generate/revoke, payment events.**
- **Tamper-evidence:** append-only + periodic export to immutable storage (e.g. S3 with object-lock or the platform's log store); optionally a hash-chain. Retain ≥ 1 year.

### B3. API-key hardening — HIGH (finishes the feat-009 work)
- **Fix the misleading comment** at `schema.prisma:211` — it says `bcrypt/scrypt` but the code uses SHA-256 (`api/auth.ts:11`). SHA-256 is actually correct for 256-bit random keys; just correct the comment (or switch to HMAC-SHA256 with a server pepper).
- **Add key expiry/rotation:** add `expiresAt DateTime?` to `ApiKey`, enforce in `validateApiKey()`, document rotation in the Access Control Policy.
- **Distributed rate limiting:** the token bucket in `api/auth.ts:63-101` is an in-memory `Map` — resets on restart and is per-instance, so on serverless it doesn't actually enforce. Move to a shared store (Redis/Upstash or a Postgres-backed counter). Also apply rate limiting to **auth endpoints** (brute-force control).

### B4. Data retention & deletion (DSAR / right-to-erasure) — HIGH
- Add `deletedAt DateTime?` soft-delete to PII models; implement a purge job (Wasp job) enforcing retention windows (e.g. `ContactFormMessage` 90d, `AssessmentJob` per policy).
- Implement an account/data-deletion operation so a DSAR can be honoured end-to-end (DB rows + S3 objects).

### B5. Authentication hardening — HIGH
- **MFA/TOTP** for at least admin accounts (none today).
- **Password policy** — min length/complexity + breach check (HIBP) at signup/reset (`src/auth/`).
- Document/confirm Wasp **session & token expiry** defaults in `main.wasp`; tighten if needed.

### B6. Secrets & supply-chain hardening — MEDIUM/HIGH
- **Secret scanning:** add gitleaks/TruffleHog (or GitHub Secret Scanning) to CI. `.env.server` is manually redacted before commit and is **not** in `.gitignore` — one missed redaction leaks real keys. Also add it to `.gitignore` and scan git history for past leaks.
- **Dependency scanning in CI:** wire `npm audit` / Dependabot / Snyk as a gate. `reports/dependabot-triage.md` shows 79 open alerts (product app: 4 medium, all `npm audit fix`-able) — clear them and keep them clear with an SLA.
- **AWS creds:** move from long-lived IAM keys in env toward scoped/temporary credentials where the host allows.

### B7. Infrastructure & platform controls — MEDIUM (mostly config, some code)
- **Automated DB backups + tested restore** with documented RTO/RPO (nothing configured today) — feeds A1 BC/DR.
- **Encryption at rest** — confirm the Postgres host + S3 bucket have it enabled; record in the Cryptography Policy. Consider field-level encryption for the most sensitive columns.
- **Dockerfile** runs as **root** (`.wasp/out/Dockerfile`) — run as unprivileged `node` user.
- **CI as a control:** run lint + unit + e2e on PRs, enforce branch protection + required review (evidence for Change Management).

### B8. Security testing — MEDIUM
- Authorization/RBAC tests (from B1), OWASP-aligned checks, and a scheduled **external penetration test** before the audit window closes (pentest report is standard audit evidence).

---

## Sequencing

| Phase | Duration | Focus |
|---|---|---|
| **0 — Decide & tool up** | Week 0 | Confirm ISO-first; buy Vanta/Drata/Secureframe; name the ISMS owner. |
| **1 — Stop the bleeding** | Wk 1–2 | **B1** authz fixes, secret scan + history check (B6), clear product Dependabot alerts. Ship `SECURITY.md`/`PRIVACY.md`/`CODEOWNERS` (A3). |
| **2 — Core controls** | Wk 3–8 | **B2** audit logging, **B3** API-key hardening, **B5** MFA + password policy, **B7** backups/CI/Docker. Draft all A1 policies from templates; build A2 registers + sign DPAs. |
| **3 — Data rights & evidence** | Wk 9–14 | **B4** retention/deletion + DSAR, **B8** pentest, SoA, risk register operating. |
| **4 — Audit** | Wk 15+ | ISO Stage 1 → Stage 2 (or SOC 2 Type I → Type II observation window). |

---

## Verification

- **B1:** add failing authz tests (user A cannot read/download/modify user B's file, interventions, job), confirm they pass after the fix; run `cd compass/app && wasp start` and exercise the pre-signed URL path with a foreign key → expect 403/404.
- **B2:** trigger login, admin action, file download → assert `AuditLog` rows written and immutable-store export runs.
- **B3:** unit-test `expiresAt` rejection in `validateApiKey`; load-test rate limiter across two instances to prove it's shared.
- **B4:** run the purge job on seed data; run the deletion op and confirm DB rows + S3 objects gone.
- **B6:** commit a fake secret on a branch → CI secret scan fails the build; CI dependency gate fails on a known-vuln.
- **Whole program:** the compliance platform's readiness dashboard reaches ~100% before booking the auditor; auditor Stage 1 (docs) then Stage 2 (operating effectiveness) pass.
- Full test suite green: `cd compass/app && npm test` (vitest) + `compass/e2e-tests` (Playwright) in CI on every PR.

---

## Key decisions still open (surface to stakeholders)
1. **ISO-first vs SOC-2-first vs both together** — plan assumes ISO-first, SOC 2 follow-on.
2. **Which compliance platform** — Vanta / Drata / Secureframe (recommend picking one before Phase 1).
3. **Certification scope boundary** — assumed the Wasp app + its data only (excludes the marketing static site / blog).
4. **Auditor / certification body + budget sign-off** (AU$20–60k).
