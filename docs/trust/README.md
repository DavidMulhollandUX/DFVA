# Evidura trust documentation

Four artefacts, one source of truth each. The public trust page renders from these — do not let the page and the docs drift.

| Artefact | File | Audience | Status |
| --- | --- | --- | --- |
| AI-data commitment | [ai-data-commitment.md](ai-data-commitment.md) | Public | Live, minus the zero-retention clause (VERIFY-1) |
| Data deletion SLA | [data-deletion-sla.md](data-deletion-sla.md) | Public + contractual | Draft |
| HECVAT 4 answers | [hecvat-4-answers.md](hecvat-4-answers.md) | Procurement (on request) | Draft |
| Trust page | `compass/app/src/compass/TrustPage.tsx` → `/trust` | Public | **Launch-ready.** Two constants gate the unconfirmed facts. |

## How the page stays honest without a draft banner

The earlier version wore a "not for publication" banner. That is the wrong shape for a live page: it either never comes off, or it comes off in one go and stops protecting anything. The page now carries two narrow constants instead:

- `ZERO_RETENTION_CONFIRMED` — while `false`, that commitment is **absent from the list**, not hedged. A reader sees six commitments rather than six plus an apology.
- `DATABASE_REGION` — while `null`, that row reads "Confirmed on request", which is true and answerable, rather than a placeholder. Set to Sydney (`ap-southeast-2`) on 2026-08-14. **If the database ever moves, set this back to `null` rather than leaving a stale region** — a wrong residency claim is worse than no claim.

Both fail closed. Neither requires a banner over the whole page.

## Decisions taken 2026-08-14

- **Contact address: `privacy@evidura.ai`.** Chosen over the existing `compass@unimelb.edu.au` sender and the `ADMIN_EMAILS` address to keep Evidura's identity separate from UoM. **The page promises acknowledgement within one business day, so this mailbox must exist and be monitored before prod.**
- **The "What we don't have yet" section was cut.** It listed the absent SSO, MFA, SOC 2, VPAT and pen test. The argument for keeping it was that publishing gaps is what makes the rest of the page credible; the argument against — that no competitor does it, and procurement will ask anyway — won. The gaps themselves are still recorded honestly in [hecvat-4-answers.md](hecvat-4-answers.md), which is where a procurement reviewer will meet them.
- **All four regions confirmed Australian**: Fly `syd`, Vercel `syd1`, S3 and database `ap-southeast-2`. This is the architectural answer to the sovereignty question and should be led with in any AU procurement conversation.

## The one rule

**Nothing here may claim a control the code does not implement.** The competitive opening (see `ideas_log.md`, 2026-08-14 research section) is that no competitor publishes a checkable commitment about curriculum content. That advantage evaporates the moment we publish something vague or untrue. Every claim below is either verifiable from this repo or explicitly marked as a blocker.

## What is actually true today (2026-08-14)

Verified by reading the code, not by assumption:

- **Evidura assesses public handbook URLs.** `assessProgram` in `compass/app/src/compass/operations.ts` takes a single `handbookUrl` string. There is no non-public curriculum ingest path in the product.
- The generic `/file-upload` route is the unmodified OpenSaaS template feature (jpeg/png/pdf, `compass/app/src/file-upload/validation.ts`). It is **not** a curriculum pipeline and nothing reads uploaded files into an assessment.
- Personal data held is thin: `User.email`, `username`, Stripe customer id and subscription fields, `File.name/type/s3Key`. No student records. No staff records. See `compass/app/schema.prisma`.
- `AssessmentJob` stores the handbook URL, scores, bands, and generated report JSON. No personal information.

This means Evidura is at **Tier 0** of the trust ladder — public-only. That is a strong position to state plainly, and the honest framing for launch: *we have never held an institution's non-public curriculum, because there is currently no way to give it to us.*

## Verification gates — resolve before anything is published

| ID | Blocker | Why it matters | Who |
| --- | --- | --- | --- |
| **VERIFY-1** | Confirm zero-retention terms with the LLM provider in writing (contract or DPA clause, not a marketing page) | The "never used to train, zero-retention endpoint" sentence is the single claim most likely to be tested by a university's legal team. Publishing it unverified is the worst failure mode available. **While unconfirmed the commitment is omitted from the page entirely** rather than hedged — flip `ZERO_RETENTION_CONFIRMED` in `TrustPage.tsx` to add it. | DJ |
| **VERIFY-2** | ~~Fly.io, S3 and Vercel regions~~ **Resolved 2026-08-14.** Remaining: the **production database region**. | Residency claims are checkable by anyone with `dig`. Confirmed from live response headers and deployment config: Fly `syd`, Vercel `syd1`, S3 `ap-southeast-2` — all Sydney. The database is not on the Neon account reachable from here, so its region is unconfirmed; set `DATABASE_REGION` in `TrustPage.tsx` and it renders like the others. Until then that row reads "Confirmed on request". | DJ |
| **VERIFY-3** | Legal review of the ADM position (see hecvat-4-answers.md §AI) | Australian automated-decision-making transparency rules commence 10–11 Dec 2026. Assessment is that they do not bite (Evidura scores programs, not people), but that is a lay read. | External |
| **VERIFY-4** | Download the current HECVAT 4 workbook from EDUCAUSE (v4.1.6, 22 Jul 2026) and transcribe the answers | The answer doc here is organised by domain, not by the instrument's question IDs. EDUCAUSE distributes the workbook; it is not reproduced in this repo. | DJ |

There is no longer a whole-page draft flag — see "How the page stays honest without a draft banner" above. The two remaining constants (`ZERO_RETENTION_CONFIRMED`, `DATABASE_REGION`) each gate one narrow claim and both fail closed.

## Related

- `ideas_log.md` — `[2026-08-14]` sections: the design reasoning, the competitor research, and the recommended sequence
- Competitor privacy posture summary: same log, "Research: competitor privacy posture"
