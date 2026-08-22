# Evidura data deletion SLA

**Status: DRAFT.** Intended to be referenced from the MSA and rendered on `/trust`.

Written to beat the category baseline. Akari's G-Cloud 14 service definition — a document authored specifically to win government procurement — commits only to a plan "which would involve extraction of all customer data," with no deletion undertaking, no timeline and no evidence. Atomic Jolt commits to 30-day return-or-delete, but scoped to student data under FERPA. Neither extends a deletion guarantee to curriculum content.

---

## The commitment

### On request, at any time

| Request | We complete within | Evidence you receive |
| --- | --- | --- |
| Delete a single uploaded document | 5 business days | Confirmation in the audit log |
| Delete one program's assessment and its source content | 10 business days | Confirmation in the audit log |
| Export all your data | 10 business days | Machine-readable archive (JSON + original documents) |

### On termination

**Within 30 calendar days of the termination date, we delete all customer content and confirm it in a signed deletion certificate.**

The certificate names what was deleted, the date each class of data was destroyed, the systems it was destroyed in, and the backup expiry date after which no copy exists anywhere. It is signed by an officer of the company. You do not have to ask for it.

### Automatic deletion, no request needed

| Data | Deleted |
| --- | --- |
| Uploaded curriculum documents | Within 24 hours of the assessment completing |
| Assessment working files and intermediate extractions | Within 24 hours of the assessment completing |
| Derived scores, bands, evidence citations | Retained until you delete them or terminate |
| Account and billing records | Retained per statutory requirement after termination |

## Backups

Deletion from live systems is immediate. Encrypted backups roll off on a fixed cycle, and until that cycle completes a copy may persist in backup media that is not individually addressable.

We will state the exact backup retention period in the certificate rather than claim instant erasure, because instant erasure from backups is not a thing anyone can honestly promise. No deleted content is restored to live systems by any routine process; restoring a backup that contains deleted content triggers re-deletion.

*Exact retention window: TO BE SET once production backup configuration is confirmed (VERIFY-2).*

## Scope

Covers customer content: uploaded curriculum documents, derived assessments, and institution-identifying records.

Does not cover:

- **Public source material.** Handbook pages, QILT data and published labour-market datasets are public; deleting our copy would not remove them from the world and we do not pretend otherwise.
- **Aggregate operational telemetry** that contains no customer content and no institutional identifier.
- **Records we are legally required to retain**, principally billing and tax records. These are named individually in the certificate rather than left as a general carve-out.

## Benchmark contributions

If you contributed programs to a cross-institutional benchmark and then delete them, the contribution is withdrawn and the affected comparison groups are recomputed. Where withdrawal takes a group below the five-program minimum, the group stops rendering rather than rendering with fewer contributors.

Benchmark bands already published in a static export (a PDF, a slide) cannot be recalled, and we will say so plainly rather than imply otherwise.

## How to invoke

Email the address on `/trust`. We acknowledge within one business day and start the clock from acknowledgement.

## Failure

If we miss a deletion deadline we tell you, unprompted, with the reason and a new date. There is no service credit attached — a credit is not a remedy for holding data you asked us to destroy, and pretending otherwise cheapens the commitment.
