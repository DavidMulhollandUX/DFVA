# Evidura AI-data commitment

**Status: DRAFT — blocked on VERIFY-1.** The zero-retention clause must be confirmed in writing with the LLM provider before this is published anywhere public. See [README.md](README.md).

This is the canonical text. The `/trust` page renders it; if the two ever disagree, this file wins.

---

## What Evidura does with curriculum content

### Today: we do not hold your curriculum

Evidura assesses **published handbook pages**. You give us a public URL; we read what any prospective student could read. There is no facility to upload internal subject guides, unpublished course documents, or draft curriculum, and no assessment reads from one.

We state this first because it is the only claim here that needs no trust at all — it is a property of the product, and you can confirm it by looking for the upload button that does not exist.

### When curriculum upload ships, these are the commitments

Each of these is written to be checkable. If you cannot see how you would verify one, tell us and we will rewrite it.

1. **Your curriculum content is never used to train any model.** Not ours, not a third party's, not a fine-tune, not an embedding index shared across customers, not a retrieval corpus another institution's assessment can reach.

2. **Content is sent only to a zero-retention inference endpoint.** The model provider does not retain your content after the request completes, and it does not enter their training data. *(VERIFY-1 — this sentence is not published until the contractual terms are confirmed.)*

3. **Uploaded documents are deleted within 24 hours of your assessment completing.** Not archived, not moved to cold storage. Deleted, on a scheduled job, whether or not you ask.

4. **We keep the score, not the syllabus.** What persists after an assessment is the derived output: dimension scores, band, rubric version, and short evidence citations of the form `{source, page, span}` plus a quotation of 25 words or fewer. Enough to defend a score to a review panel; not enough to reconstruct your curriculum.

5. **Your content never enters a benchmark without a separate, explicit opt-in.** Being assessed and contributing to cross-institutional comparison are two different decisions. We will never treat agreeing to the first as agreeing to the second. The opt-in is per program and revocable.

6. **We do not publish anything that identifies your institution without your written consent.** Benchmarks render as bands, never raw scores, and only where at least five contributing programs occupy the comparison group.

7. **On termination we delete everything within 30 days and give you a certificate saying so.** See the [data deletion SLA](data-deletion-sla.md).

### What we do keep, and why

Honesty about the exchange: Evidura's value depends on a corpus of **scores**, not documents. Derived scores, dimension values, rubric versions and evidence hashes persist so that assessments remain comparable over time and defensible under review. That is the asset. Your source documents are, to us, a liability we would rather not hold.

If that trade is not acceptable for a given program, the local-scoring option below removes the question entirely.

### Local scoring — the version where nothing leaves

For institutions that will not send curriculum content to a vendor under any terms, the DFVA engine is designed to run inside your own boundary and emit only a signed score bundle:

```json
{
  "programCode": "...",
  "scores": [...],
  "evidenceHashes": [...],
  "rubricVersion": "...",
  "engineVersion": "...",
  "signature": "..."
}
```

Curriculum text never crosses your network boundary. Evidura receives a short vector and a set of hashes. Rubric versioning preserves the guarantee that your programs and another institution's were scored on the same instrument.

*Not yet built. Listed here because it is the design target, and because you should know it is coming before you sign anything.*

---

## What this commitment does not cover

- **Account data.** Your email address, name and billing details are processed to run the service. See the privacy policy.
- **Public data.** Handbook pages, QILT results and published labour-market data are public inputs. We do not treat them as confidential and neither does anyone else.
- **Aggregate product telemetry.** We count assessments run and pages viewed. That is operational data about the service, not about your curriculum.

## Changes

This commitment is versioned. Material weakenings will be notified to customers in advance, in writing, and will not apply retroactively to content already processed under an earlier version.

| Version | Date | Change |
| --- | --- | --- |
| 0.1 (draft) | 2026-08-14 | Initial draft. Not published. |
