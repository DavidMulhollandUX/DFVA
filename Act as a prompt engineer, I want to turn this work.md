<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Act as a prompt engineer, I want to turn this workflow into a skill to run this within VSCode.  Provide full and detailed instructions as markdown

Here are the full, detailed instructions for packaging this workflow as a reusable skill you can run directly inside VS Code.

***

# DFVA Skill for VS Code

## Complete Setup \& Implementation Guide


***

## Overview

This guide packages the **Degree Future-Viability Assessor (DFVA)** workflow into a VS Code skill using **GitHub Copilot Chat** (with custom instructions) or **Continue.dev** (open-source AI coding assistant). Both approaches let you invoke the DFVA analysis directly from your editor with a single command, feeding handbook URLs and returning structured Markdown reports into your workspace.

***

## Prerequisites

Before starting, ensure you have the following installed:

- **VS Code** 1.85 or later
- One of the following AI extensions:
    - **GitHub Copilot Chat** (recommended — requires GitHub Copilot subscription), **or**
    - **Continue.dev** (free, open-source — works with Claude, GPT-4o, or local models via Ollama)
- **Node.js** 18+ (required only if using the CLI automation script in Option C)
- A working internet connection for handbook URL fetching

***

## Option A — GitHub Copilot Chat (Custom Instructions)

This is the fastest path if you already have GitHub Copilot. It uses VS Code's `.github/copilot-instructions.md` file to inject the DFVA system prompt into every Copilot Chat session in the workspace.

### Step 1 — Create the workspace instructions file

In your project root, create the directory and file:

```bash
mkdir -p .github
touch .github/copilot-instructions.md
```


### Step 2 — Paste the DFVA system prompt

Open `.github/copilot-instructions.md` and paste the following in full:

````markdown
# DFVA — Degree Future-Viability Assessor

## ROLE & MISSION

You are the **Degree Future-Viability Assessor (DFVA)** — a specialist analytical agent that evaluates whether a university degree, diploma, certificate, or professional training program will retain its economic value proposition in an AI-augmented labour market by 2027 and beyond.

You apply a structured, evidence-based assessment framework grounded in:
- World Economic Forum Future of Jobs research (2025)
- McKinsey generative AI automation analysis
- ILO AI and labour market studies
- Current AI capability benchmarks across knowledge work domains
- Labour market outcome data for graduate roles

Your assessments are direct, frank, and actionable. You do not soften findings to protect institutional sensitivities. You distinguish between the academic quality of a program and its labour-market durability — these are not the same thing.

---

## CONTEXT: THE HUMAN MIDDLEWARE FRAMEWORK

Your analysis is anchored in the concept of "human middleware" — roles where the primary value is taking structured or semi-structured information from one source, reformatting or lightly recombining it using templates or known rules, and routing it to the next person or system — without deep domain judgment, original modelling, or accountability for decisions.

Degrees are at risk when graduate outcomes cluster in tasks that generative AI, RPA agents, and LLM-powered tools already perform cheaply and at scale.

The boundary of obsolescence:
- Template execution vs. original problem solving
- Information reformatting vs. decision ownership
- Tool operation vs. system design

---

## YOUR TASK

When the user provides a course name, description, curriculum, or URL:

1. **Identify the program** — level, institution, duration, primary graduate outcome roles
2. **Profile the automation exposure** — map the graduate's first 3–5 years to current AI automation capability
3. **Apply the DFVA Rubric** — score across all 10 dimensions + bonus (0–3 each), with justification citing specific curriculum evidence
4. **Calculate total score and assign a risk band**
5. **Answer the Three Threshold Questions** — YES / NO / UNCERTAIN + rationale
6. **Produce a Verdict** — frank paragraph on viability by 2027
7. **Produce a Recommendations Table** — prioritised, actionable curriculum interventions
8. **Identify the Analogue Graduate Profile** — specific AI tools that threaten entry-level employment

---

## DFVA RUBRIC (Score 0–3 per dimension)

| # | Dimension | 0 | 1 | 2 | 3 |
|---|---|---|---|---|---|
| 1 | Automation Exposure of Roles | First 3–5 yrs on data entry, template reports, routine content | Some judgment, but majority templated | Mix of routine/non-routine; clear exit within 2 yrs | Roles defined by judgment, design, accountability, or physical/relational skill from day one |
| 2 | Systems Thinking & Problem Framing | Purely tool/process execution | Mentioned but not assessed | Dedicated units with authentic assessments | Thread throughout; graduates reason about failure modes, trade-offs, emergent behaviour |
| 3 | Technical & Quantitative Depth | No meaningful quantitative/technical rigour | Introductory stats or basic digital tools | Solid grounding in stats/data/coding/domain science | Strong technical core embedded and assessed throughout |
| 4 | Decision-Making Under Uncertainty | Purely recall-based or scripted scenarios | Some case-based work, scripted answers | Assessments require defending positions, justifying trade-offs | Simulations, capstones, or live projects with genuine uncertainty and accountability |
| 5 | AI Literacy & Governance | No AI coverage | AI mentioned in one elective | AI tools used in coursework; limitations discussed | Graduates can design, deploy, supervise, and critique AI-enabled workflows incl. ethics and governance |
| 6 | Domain Depth & Specialisation | Generic and interchangeable | Mild specialisation; breadth > depth | Clear domain focus with meaningful specialist knowledge | Deep domain expertise — regulatory, scientific, clinical, or physical — requiring years to develop |
| 7 | Rigorous, Authentic Research Methods | Literature reviews or secondary source summarising only | Basic introductory research unit | Graduates can design and conduct research; capstone/thesis present | Routinely generate original primary data and defend methodology under scrutiny |
| 8 | Human & Relational Capability | No interpersonal, ethical, or physical dimension | Ethics mentioned but not explored; no practice | Meaningful professional ethics, stakeholder engagement, or supervised practice | Substantial physical skill, clinical/care practice, or interpersonal accountability |
| 9 | Curriculum Currency & Adaptability | No curriculum review in 3+ years; no AI content | Minor updates; AI awareness added but structure unchanged | Meaningful refresh in last 2 years; AI in core units | Living curriculum with advisory boards, regular reviews, and outcome tracking |
| 10 | Graduate Outcome Evidence | No published destination data | Generic satisfaction surveys only | Destination data published but not broken down by role/industry | Granular data: roles, industries, salary bands, time to employment |
| B | Irreplaceability Premium (BONUS) | Substitutable by adjacent graduates or current AI tools | One distinctive skill, easily unbundled | Clear dual-skill or cross-domain value proposition | Rare integration of technical depth, domain expertise, and human judgment |

---

## RISK BANDS

| Score | Band |
|---|---|
| 28–36 | 🟢 RESILIENT — AI augments rather than displaces |
| 20–27 | 🟡 MODERATE RISK — pivot required |
| 12–19 | 🟠 HIGH RISK — value proposition eroding |
| 0–11 | 🔴 CRITICAL — human middleware |

---

## THREE THRESHOLD QUESTIONS

Q1: Could a well-prompted AI agent produce 80% of what this graduate produces in their first two years of work?
Q2: Does this degree teach graduates to design systems, own decisions, or generate original insight?
Q3: Would this degree's graduates be MORE employable in 5 years than today, given AI trends?

---

## OUTPUT FORMAT

```
─────────────────────────────────────────
DFVA REPORT: [PROGRAM NAME]
Institution: [University / TAFE / Bootcamp / Online provider]
Level: [Certificate / Diploma / Bachelor / Master / PhD]
Duration: [Typical duration]
─────────────────────────────────────────

### 1. PROGRAM PROFILE
[2–3 sentences]

### 2. AUTOMATION EXPOSURE PROFILE
[Map first 3–5 years to specific AI tools and automation capabilities]

### 3. DFVA SCORECARD
| Dimension | Score | Justification |
|---|---|---|
| 1. Automation Exposure | /3 | |
| 2. Systems Thinking | /3 | |
| 3. Technical & Quantitative Depth | /3 | |
| 4. Decision-Making Under Uncertainty | /3 | |
| 5. AI Literacy & Governance | /3 | |
| 6. Domain Depth & Specialisation | /3 | |
| 7. Research Methods | /3 | |
| 8. Human & Relational Capability | /3 | |
| 9. Curriculum Currency | /3 | |
| 10. Graduate Outcome Evidence | /3 | |
| BONUS: Irreplaceability | /3 | |
| **TOTAL** | **/36** | |

**RISK BAND: [🟢 / 🟡 / 🟠 / 🔴] [BAND NAME]**

### 4. THREE THRESHOLD QUESTIONS
Q1: [YES/NO/UNCERTAIN] — [rationale]
Q2: [YES/NO/UNCERTAIN] — [rationale]
Q3: [YES/NO/UNCERTAIN] — [rationale]

### 5. ANALOGUE GRADUATE PROFILE
[Specific AI tools competing with this graduate's entry-level role]

### 6. VERDICT
[One frank paragraph]

### 7. RECOMMENDATIONS
| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | | | High/Med/Low |

### 8. THE REDESIGNED GRADUATE PROFILE
[200 words: what the graduate would look like with Priority 1–2 changes implemented]

─────────────────────────────────────────
END OF DFVA REPORT
─────────────────────────────────────────
```

---

## BEHAVIOUR RULES

- If only a course name is provided, fetch curriculum details from the official handbook URL before assessing. For UniMelb: `https://handbook.unimelb.edu.au/2025/courses/[COURSE-CODE]`
- Extract and quote specific unit/module names as evidence in justifications
- Do not conflate academic prestige with labour-market durability
- Never use hedge language like "it depends" — give a score and flag uncertainty in the verdict
- If comparing two programs, run both DFVA reports then produce a head-to-head table on dimensions where they diverge most
- If the user is considering enrolling, add a direct personal advisory note at the end
````


### Step 3 — Enable custom instructions in VS Code settings

Open your VS Code settings (`Cmd+,` / `Ctrl+,`), search for `github.copilot.chat.codeGeneration.instructions`, and confirm it reads the `.github/copilot-instructions.md` file. This is enabled by default in Copilot Chat 1.x.

### Step 4 — Invoke the skill

Open Copilot Chat (`Ctrl+Shift+I` or `Cmd+Shift+I`) and type:

```
Run DFVA on https://handbook.unimelb.edu.au/2025/courses/b-des
```

Or for a batch:

```
Run DFVA on the following courses and save each report as a separate .md file in /reports:
- https://handbook.unimelb.edu.au/2025/courses/b-sci
- https://handbook.unimelb.edu.au/2025/courses/b-mus
- https://handbook.unimelb.edu.au/2025/courses/b-agr
```


***

## Option B — Continue.dev (Open Source, Any Model)

Use this path if you want to run the DFVA skill with Claude, GPT-4o, Gemini, or a local model via Ollama — without requiring a Copilot subscription.

### Step 1 — Install Continue.dev

Install the **Continue** extension from the VS Code Marketplace, or via:

```bash
code --install-extension Continue.continue
```


### Step 2 — Create the DFVA slash command

Continue supports custom slash commands stored as Markdown files. Create the following directory structure in your project:

```
.continue/
  prompts/
    dfva.md
```


### Step 3 — Populate `dfva.md`

Create `.continue/prompts/dfva.md` with the following:

```markdown
---
name: dfva
description: Run a Degree Future-Viability Assessment (DFVA) on a university course
---

{{{ input }}}

You are the Degree Future-Viability Assessor (DFVA). Using the course URL, name, or curriculum details provided above, produce a complete DFVA report following this exact workflow:

1. Fetch the course handbook page if a URL is provided. For UniMelb courses, the URL pattern is: https://handbook.unimelb.edu.au/2025/courses/[CODE]
2. Extract the program overview, majors/specialisations, credit points, duration, learning outcomes, and any named subjects or capstone requirements.
3. Score the program across all 10 DFVA dimensions plus the Bonus dimension (0–3 each) with handbook-grounded justifications.
4. Calculate the total score and assign a risk band: 28–36 🟢 RESILIENT / 20–27 🟡 MODERATE RISK / 12–19 🟠 HIGH RISK / 0–11 🔴 CRITICAL
5. Answer the Three Threshold Questions with YES / NO / UNCERTAIN + rationale.
6. Write a frank, single-paragraph Verdict on viability by 2027.
7. Produce a prioritised Recommendations Table (5 actions minimum).
8. Describe the Redesigned Graduate Profile in 200 words.

Output the report in structured Markdown using the DFVA report template format. Save the output as `/reports/dfva-[COURSE-CODE].md` in the current workspace.
```


### Step 4 — Configure the model

Open Continue's config file (`.continue/config.json`) and add your preferred model. Example using Claude:

```json
{
  "models": [
    {
      "title": "Claude Sonnet",
      "provider": "anthropic",
      "model": "claude-sonnet-4-5",
      "apiKey": "YOUR_ANTHROPIC_API_KEY"
    }
  ],
  "slashCommands": [
    {
      "name": "dfva",
      "description": "Run a Degree Future-Viability Assessment",
      "prompt": ".continue/prompts/dfva.md"
    }
  ]
}
```


### Step 5 — Invoke from the Continue chat panel

Open the Continue panel (`Cmd+Shift+M`) and type:

```
/dfva https://handbook.unimelb.edu.au/2025/courses/b-faanim
```


***

## Option C — Automated Batch Script (Node.js)

Use this for running DFVA across large course lists programmatically, with output saved directly to your workspace.

### Step 1 — Create the project structure

```
dfva-runner/
  src/
    dfva-runner.js
    system-prompt.md
  reports/
  course-list.json
  package.json
```


### Step 2 — Create `course-list.json`

```json
{
  "institution": "University of Melbourne",
  "handbook_base": "https://handbook.unimelb.edu.au/2025/courses/",
  "courses": [
    { "code": "b-sci", "name": "Bachelor of Science" },
    { "code": "b-mus", "name": "Bachelor of Music" },
    { "code": "b-des", "name": "Bachelor of Design" },
    { "code": "b-agr", "name": "Bachelor of Agriculture" },
    { "code": "b-arts", "name": "Bachelor of Arts" },
    { "code": "b-bmed", "name": "Bachelor of Biomedicine" },
    { "code": "b-com", "name": "Bachelor of Commerce" },
    { "code": "bh-medsci", "name": "Bachelor of Medical Science (Honours)" },
    { "code": "b-faacting", "name": "Bachelor of Fine Arts (Acting)" },
    { "code": "b-fafilmtv", "name": "Bachelor of Fine Arts (Film and TV)" },
    { "code": "b-faanim", "name": "Bachelor of Fine Arts (Animation)" },
    { "code": "b-fadance", "name": "Bachelor of Fine Arts (Dance)" },
    { "code": "b-fapro", "name": "Bachelor of Fine Arts (Production)" }
  ]
}
```


### Step 3 — Create `src/dfva-runner.js`

```javascript
const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");
const https = require("https");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const courseList = require("../course-list.json");
const systemPrompt = fs.readFileSync(
  path.join(__dirname, "system-prompt.md"),
  "utf8"
);

// Fetch handbook page content
async function fetchHandbookPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
      res.on("error", reject);
    });
  });
}

// Strip HTML tags for plain text extraction
function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 6000); // Token limit buffer
}

// Run DFVA on a single course
async function runDFVA(course) {
  const url = `${courseList.handbook_base}${course.code}`;
  console.log(`\n⏳ Fetching: ${url}`);

  let handbookContent = "";
  try {
    const html = await fetchHandbookPage(url);
    handbookContent = stripHtml(html);
  } catch (err) {
    console.warn(`  ⚠️  Could not fetch handbook page: ${err.message}`);
    handbookContent = `Handbook page unavailable. Assess based on standard curriculum for ${course.name} at a Group of Eight Australian university.`;
  }

  const userMessage = `
Run a complete DFVA assessment on the following course.

**Course:** ${course.name} (${course.code.toUpperCase()})
**Institution:** ${courseList.institution}
**Handbook URL:** ${url}

**Handbook Content (extracted):**
${handbookContent}

Produce the full DFVA report in structured Markdown. Be direct and evidence-based. Quote specific curriculum elements from the handbook content above.
  `.trim();

  console.log(`  🤖 Running DFVA assessment...`);

  const response = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 4000,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  return response.content[^0].text;
}

// Save report to file
function saveReport(code, content) {
  const reportsDir = path.join(__dirname, "../reports");
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
  const filename = path.join(reportsDir, `dfva-${code}.md`);
  fs.writeFileSync(filename, content, "utf8");
  console.log(`  ✅ Saved: reports/dfva-${code}.md`);
}

// Generate summary index
function generateIndex(results) {
  const rows = results
    .map((r) => {
      const scoreMatch = r.report.match(/\*\*TOTAL\*\*.*?(\d+)\/36/);
      const bandMatch = r.report.match(
        /RISK BAND:.*?(🟢|🟡|🟠|🔴)\s*([^\n*]+)/
      );
      const score = scoreMatch ? scoreMatch[^1] : "—";
      const band = bandMatch ? `${bandMatch[^1]} ${bandMatch[^2].trim()}` : "—";
      return `| [${r.name}](reports/dfva-${r.code}.md) | ${score}/36 | ${band} |`;
    })
    .join("\n");

  return `# DFVA Batch Assessment — ${courseList.institution}
Generated: ${new Date().toISOString().split("T")[^0]}

| Course | Score | Risk Band |
|---|---|---|
${rows}
`;
}

// Main runner
async function main() {
  const results = [];

  for (const course of courseList.courses) {
    try {
      const report = await runDFVA(course);
      saveReport(course.code, report);
      results.push({ ...course, report });

      // Rate limit: 2 second pause between API calls
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (err) {
      console.error(`  ❌ Failed for ${course.code}: ${err.message}`);
    }
  }

  // Write summary index
  const index = generateIndex(results);
  fs.writeFileSync(path.join(__dirname, "../reports/INDEX.md"), index, "utf8");
  console.log(`\n📊 Summary saved: reports/INDEX.md`);
  console.log(`\n✅ DFVA batch complete. ${results.length} reports generated.`);
}

main().catch(console.error);
```


### Step 4 — Create `src/system-prompt.md`

Copy the full content of your DFVA system prompt (from the `.github/copilot-instructions.md` file created in Option A) and save it here. This is the same prompt — it just serves as the `system` parameter for direct API calls.

### Step 5 — Create `package.json`

```json
{
  "name": "dfva-runner",
  "version": "1.0.0",
  "description": "Degree Future-Viability Assessor — Batch Runner",
  "main": "src/dfva-runner.js",
  "scripts": {
    "run": "node src/dfva-runner.js",
    "single": "node src/dfva-runner.js --single"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.39.0"
  }
}
```


### Step 6 — Install and run

```bash
cd dfva-runner
npm install

# Set your API key
export ANTHROPIC_API_KEY="your-api-key-here"

# Run the batch
npm run run
```


***

## Option D — VS Code Tasks (Run from Command Palette)

Wire the batch script into VS Code's task runner so you can invoke it from the Command Palette without leaving your editor.

### Create `.vscode/tasks.json`

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "DFVA: Run Batch Assessment",
      "type": "shell",
      "command": "node",
      "args": ["src/dfva-runner.js"],
      "options": {
        "cwd": "${workspaceFolder}/dfva-runner",
        "env": {
          "ANTHROPIC_API_KEY": "${env:ANTHROPIC_API_KEY}"
        }
      },
      "group": "build",
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "problemMatcher": []
    },
    {
      "label": "DFVA: Open Report Index",
      "type": "shell",
      "command": "code",
      "args": ["reports/INDEX.md"],
      "options": {
        "cwd": "${workspaceFolder}/dfva-runner"
      },
      "dependsOn": "DFVA: Run Batch Assessment"
    }
  ]
}
```

Invoke via `Ctrl+Shift+P` → **Tasks: Run Task** → **DFVA: Run Batch Assessment**.

***

## Recommended Workspace Layout

```
your-project/
├── .github/
│   └── copilot-instructions.md      ← Option A system prompt
├── .continue/
│   ├── config.json                  ← Option B model config
│   └── prompts/
│       └── dfva.md                  ← Option B slash command
├── .vscode/
│   └── tasks.json                   ← Option D task runner
├── dfva-runner/
│   ├── src/
│   │   ├── dfva-runner.js           ← Option C batch script
│   │   └── system-prompt.md         ← Full DFVA system prompt
│   ├── reports/
│   │   ├── INDEX.md                 ← Auto-generated summary
│   │   ├── dfva-b-sci.md
│   │   ├── dfva-b-des.md
│   │   └── ...
│   ├── course-list.json             ← Course registry
│   └── package.json
└── README.md
```


***

## Prompt Engineering Notes

Three principles govern how the DFVA prompt is engineered for consistent VS Code output:[^1]

- **Grounding over generation.** The prompt instructs the model to fetch and quote the handbook page before scoring — this prevents hallucinated curriculum details and anchors every justification in evidence. If the handbook fetch fails, the prompt degrades gracefully to "typical industry standard" framing with an explicit caveat.
- **Structured output enforcement.** The output format uses a fixed Markdown schema with named section headers, tables, and the risk band emoji system. This ensures reports are machine-readable (for index generation) and human-readable (for direct VS Code Markdown preview) without post-processing.
- **No hedge language constraint.** The behaviour rule "never use 'it depends'" is the single most important prompt engineering decision — it forces the model to commit to a score and surface uncertainty in the Verdict section rather than distributing vagueness across every justification. This makes the reports actionable rather than academic.[^1]

<div align="center">⁂</div>

[^1]: pasted-text.txt

