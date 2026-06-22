# DFVA Structured Curriculum Data Schema

> **Version:** 1.0.0  
> **Last updated:** 2026-06-22  
> **Status:** Active — Phase 1 (Data Architecture Hardening)

## Why structured data matters

Every competitor in the curriculum management market stores degree requirements as unstructured HTML. Coursedog uses freeform HTML blocks. Modern Campus stores curriculum as static HTML pages with zero data export. CourseLoop nests curriculum in `<ul>/<li>` markup.

**DFVA is different.** DFVA stores every curriculum element as a typed, validated JSON record — enabling programmatic querying, cross-program comparison, and machine-readable API access that no competitor can provide.

This document defines the DFVA structured curriculum data format.

---

## 1. SyllabusSnapshot

The top-level structured representation of a degree program's curriculum.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `programCode` | `string` | ✅ | Program code from handbook URL | `"MC-CS"` |
| `programName` | `string` | ✅ | Full program name | `"Master of Computer Science"` |
| `institution` | `string` | ✅ | Institution name (default: `"University of Melbourne"`) | `"University of Melbourne"` |
| `year` | `number` | ✅ | Handbook year (2020-2030) | `2026` |
| `totalCreditPoints` | `number` | ✅ | Total credit points for the degree | `200` |
| `creditStructure` | `CreditStructure` | ✅ | Breakdown by subject type | See §2 |
| `subjects` | `Subject[]` | ✅ | All subjects in the degree (min 1) | See §3 |
| `streams` | `Stream[]` | | Named streams/majors (default: `[]`) | See §4 |
| `prerequisites` | `Prerequisite[]` | | Prerequisite relationships (default: `[]`) | See §5 |
| `researchComponent` | `object` | ✅ | Research component details | See §6 |
| `aiRelevantSubjects` | `number` | | Count of AI-relevant subjects (default: `0`) | `4` |
| `handbookUrl` | `string` (URL) | | Source handbook URL | `"https://handbook.unimelb.edu.au/2026/courses/mc-cs"` |
| `extractedAt` | `string` (ISO date) | | When syllabus was extracted | `"2026-06-22"` |

### Example

```json
{
  "programCode": "MC-CS",
  "programName": "Master of Computer Science",
  "institution": "University of Melbourne",
  "year": 2026,
  "totalCreditPoints": 200,
  "creditStructure": {
    "total": 200,
    "core": 100,
    "elective": 50,
    "research": 50,
    "capstone": 25
  },
  "subjects": [
    {
      "code": "COMP90041",
      "name": "Programming and Software Development",
      "level": 9,
      "creditPoints": 12.5,
      "type": "core",
      "prerequisites": [],
      "isCompulsory": true,
      "isResearch": false,
      "isCapstone": false,
      "hasAIRelevance": true
    }
  ],
  "streams": [
    {
      "name": "Artificial Intelligence",
      "subjects": ["COMP90049", "COMP90051", "COMP90054"],
      "capstoneSubject": "COMP90055",
      "researchSubjects": ["COMP90055"],
      "creditPoints": 100,
      "isCompulsory": false
    }
  ],
  "prerequisites": [
    {
      "subject": "COMP90049",
      "requires": "COMP90041",
      "type": "prerequisite"
    }
  ],
  "researchComponent": {
    "required": true,
    "minCreditPoints": 25,
    "capstoneRequired": true,
    "thesisAvailable": true
  },
  "aiRelevantSubjects": 2,
  "handbookUrl": "https://handbook.unimelb.edu.au/2026/courses/mc-cs",
  "extractedAt": "2026-06-22"
}
```

---

## 2. CreditStructure

Breakdown of credit points by subject type.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `total` | `number` | ✅ | Total credit points | `200` |
| `core` | `number` | ✅ | Core subject credits | `100` |
| `elective` | `number` | ✅ | Elective credits | `50` |
| `breadth` | `number` | | Breadth subject credits (default: `0`) | `25` |
| `research` | `number` | | Research component credits (default: `0`) | `50` |
| `capstone` | `number` | | Capstone subject credits (default: `0`) | `25` |

---

## 3. Subject

A single subject (course/unit) in the degree.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `code` | `string` | ✅ | Subject code | `"COMP10001"` |
| `name` | `string` | ✅ | Full subject name | `"Foundations of Computing"` |
| `level` | `number` (1-9) | ✅ | Subject level | `1` |
| `creditPoints` | `number` (>0) | ✅ | Credit point value | `12.5` |
| `type` | `enum` | ✅ | Role: `core`, `elective`, `capstone`, `research`, `breadth`, `major_core`, `major_elective` | `"core"` |
| `prerequisites` | `string[]` | | Prerequisite subject codes (default: `[]`) | `["COMP10001"]` |
| `isCompulsory` | `boolean` | | Whether the subject is compulsory (default: `true`) | `true` |
| `isResearch` | `boolean` | | Whether it's a research subject (default: `false`) | `false` |
| `isCapstone` | `boolean` | | Whether it's a capstone (default: `false`) | `false` |
| `hasAIRelevance` | `boolean` | | Whether it has AI-relevant content | `true` |
| `semesterAvailability` | `array` | | When offered (default: `["Sem1", "Sem2"]`) | `["Sem1", "Sem2", "Summer"]` |

---

## 4. Stream

A named stream/major/specialisation within the degree.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `name` | `string` | ✅ | Stream name | `"Artificial Intelligence"` |
| `subjects` | `string[]` | ✅ | Subject codes in this stream | `["COMP90049", "COMP90051"]` |
| `capstoneSubject` | `string` | | Capstone subject code | `"COMP90055"` |
| `researchSubjects` | `string[]` | | Research subject codes (default: `[]`) | `["COMP90055"]` |
| `creditPoints` | `number` (>0) | ✅ | Total credit points | `100` |
| `isCompulsory` | `boolean` | | Whether this stream is compulsory (default: `true`) | `false` |

---

## 5. Prerequisite

A prerequisite relationship between subjects.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `subject` | `string` | ✅ | Subject that has the prerequisite | `"COMP90049"` |
| `requires` | `string` | ✅ | Subject that is required | `"COMP90041"` |
| `type` | `enum` | | `prerequisite`, `corequisite`, or `recommended` (default: `"prerequisite"`) | `"prerequisite"` |

---

## 6. Research Component

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `required` | `boolean` | ✅ | Whether research is required | `true` |
| `minCreditPoints` | `number` (≥0) | ✅ | Minimum research credit points | `25` |
| `capstoneRequired` | `boolean` | | Whether capstone is required (default: `false`) | `true` |
| `thesisAvailable` | `boolean` | | Whether a thesis path is available (default: `false`) | `true` |

---

## 7. DimensionScores

The 11-dimension assessment stored as `DimensionScore[]` on each program. Defined in `sharedProgramData.ts`.

| # | Dimension | Max Score | What it measures |
|---|-----------|-----------|------------------|
| 1 | Automation Exposure | 3 | AI vulnerability of graduate tasks |
| 2 | Systems Thinking | 3 | Cross-domain integration capability |
| 3 | Technical Depth | 3 | Quantitative/computational rigour |
| 4 | Decision-Making | 3 | Autonomy and judgment responsibility |
| 5 | AI Literacy | 3 | AI-specific curriculum content |
| 6 | Domain Depth | 3 | Specialised knowledge breadth |
| 7 | Research Rigour | 3 | Independent inquiry training |
| 8 | Human & Relational | 3 | Interpersonal/ethical dimensions |
| 9 | Curriculum Currency | 3 | Recency of curriculum content |
| 10 | Outcome Evidence | 3 | Graduate destination data quality |
| B | Irreplaceability (bonus) | 3 | Human advantage over AI |

Total possible: **36 points** (33 standard + 3 bonus)

### Risk bands

| Score range | Risk band |
|-------------|-----------|
| 28–36 | RESILIENT |
| 20–27 | MODERATE RISK |
| 12–19 | HIGH RISK |
| 0–11 | CRITICAL |

---

## 8. ProgramReport

The full program record combining dimension scores, risk band, and metadata.

```typescript
interface ProgramReport {
  program: string;          // Program name
  institution: string;      // University name
  level: string;            // Degree level + duration
  date: string;             // Assessment date (ISO)
  score: number;            // Total score (0-36)
  maxScore: number;         // Always 36
  riskBand: "RESILIENT" | "MODERATE RISK" | "HIGH RISK" | "CRITICAL";
  thresholds: {
    q1: "YES" | "NO" | "UNCERTAIN";
    q2: "YES" | "NO" | "UNCERTAIN";
    q3: "YES" | "NO" | "UNCERTAIN";
  };
  dimensions: DimensionScore[];
  assessmentSlug: string;
  marketSlug: string;
  recommendSlug?: string;
  handbookUrl?: string;
}
```

---

## 9. Validation

All structured curriculum data is validated at the boundary using [Zod](https://zod.dev/) schemas defined in `compass/app/src/compass/syllabusSchema.ts`.

Validation is **best-effort and non-blocking**: malformed syllabus data is logged with validation errors but does not prevent assessment completion.

```typescript
import { validateSyllabus } from './syllabusSchema';

const result = validateSyllabus(someData);
if (result.success) {
  // result.data is typed as SyllabusSnapshot
} else {
  // result.errors is string[]
  console.warn('Syllabus validation warnings:', result.errors);
}
```

---

## 10. Competitor Comparison

| Capability | DFVA | Coursedog | Modern Campus | CourseLoop |
|------------|------|-----------|---------------|------------|
| Data format | **Typed JSON** | HTML blocks | Static HTML | Nested HTML lists |
| Queryable curriculum | ✅ Full | ❌ | ❌ | ❌ |
| Cross-program comparison | ✅ Automated | ❌ Manual | ❌ Manual | ❌ Manual |
| Data export | ✅ Structured JSON | ❌ Minimal | ❌ Zero export | ❌ HTML only |
| Machine-readable API | ✅ REST + MCP | ❌ Browser-only | ❌ None | ❌ None |
| Schema validation | ✅ Zod runtime | ❌ | ❌ | ❌ |
| Vendor lock-in risk | ✅ None (open format) | 🔒 High | 🔒 Extreme | 🔒 High |

**Sources:**
- GitHub `coursedog-importer` project (9 PRs, Mar-Apr 2026) — Coursedog HTML storage confirmed
- University migration from Modern Campus — zero data export, manual HTML saving required
- ListEdTech 2026 reviews — CourseLoop nested HTML list storage confirmed
- RFP.wiki curriculum management category — no vendor offers structured curriculum data

---

## 11. API Access

### Current: MCP Server (agent-facing)

```typescript
// Available MCP tools:
get_assessment({ programCode: "mc-cs" })
query_assessments({ faculty: "Science", riskCategory: "MODERATE RISK" })
cross_program_analysis()
get_report({ programCode: "mc-cs" })
```

### Planned: Public REST API (human/institutional-facing)

```
GET  /api/v1/programs                    — list all programs
GET  /api/v1/programs/:code              — single program detail
GET  /api/v1/programs/:code/syllabus     — structured syllabus snapshot
GET  /api/v1/programs/compare?codes=...  — comparison endpoint
POST /api/v1/assess                      — submit handbook URL for assessment
```

Coming in Phase 3.

---

**Authored by:** DFVA / SXD — University of Melbourne  
**Schema version:** 1.0.0 (2026-06-22)
