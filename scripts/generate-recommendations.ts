// scripts/generate-recommendations.ts
// Run: npx tsx scripts/generate-recommendations.ts
import { promises as fs } from 'node:fs';
import * as path from 'node:path';

const REPORTS_DIR = path.join(__dirname, '..', 'reports');

const DIMENSIONS = [
  'Automation Exposure', 'Systems Thinking', 'Technical Depth',
  'Decision-Making', 'AI Literacy', 'Domain Depth', 'Research Rigour',
  'Human & Relational', 'Curriculum Currency', 'Outcome Evidence',
  'Irreplaceability (bonus)',
];

// Map from canonical dimension to regex-friendly partial match patterns
const DIM_PATTERNS: [string, string[]][] = [
  ['Automation Exposure', ['automation']],
  ['Systems Thinking', ['systems thinking', 'systems']],
  ['Technical Depth', ['technical depth', 'technical']],
  ['Decision-Making', ['decision-making', 'decision']],
  ['AI Literacy', ['ai literacy', 'ai lit']],
  ['Domain Depth', ['domain depth', 'domain']],
  ['Research Rigour', ['research rigour', 'research']],
  ['Human & Relational', ['human & relational', 'human']],
  ['Curriculum Currency', ['curriculum currency', 'curr', 'currency']],
  ['Outcome Evidence', ['outcome evidence', 'outcomes', 'outcome']],
  ['Irreplaceability (bonus)', ['irreplaceability']],
];

const DIM_ACTIONS: Record<string, string> = {
  'Automation Exposure': 'Add real-world capstone project with industry partner requiring independent judgment and decision ownership',
  'Systems Thinking': 'Integrate cross-disciplinary systems analysis modules with trade-off reasoning and failure-mode analysis',
  'Technical Depth': 'Add quantitative methods / data analysis / computational thinking core requirement',
  'Decision-Making': 'Add simulation-based assessment requiring defended trade-offs under uncertainty',
  'AI Literacy': 'Add AI literacy module: AI capabilities and limitations, prompt engineering, AI governance and ethics, AI-augmented workflow design',
  'Domain Depth': 'Strengthen specialist accreditation pathway and industry-recognized certification alignment',
  'Research Rigour': 'Add research methods core or expand existing thesis/capstone research requirements',
  'Human & Relational': 'Add clinical placement, community engagement, or professional practice requiring interpersonal accountability',
  'Curriculum Currency': 'Establish annual curriculum review with industry advisory panel; add AI and digital transformation content',
  'Outcome Evidence': 'Publish granular graduate destination data — employment rates, salary, industry, time-to-employment',
  'Irreplaceability (bonus)': 'Develop dual-skill pathways combining domain expertise with technical/AI literacy',
};

interface ProgramData {
  code: string;
  name: string;
  score: number;
  riskBand: string;
  // score === null marks a Not-Applicable dimension (excluded from the total, not scored 0).
  dimensions: { label: string; score: number | null; max: number }[];
}

function mapLabelToCanonical(rawLabel: string): string | null {
  const lower = rawLabel.toLowerCase().trim();
  for (const [canonical, patterns] of DIM_PATTERNS) {
    for (const p of patterns) {
      if (lower.includes(p)) return canonical;
    }
  }
  return null;
}

function parseReport(md: string, filename: string): ProgramData | null {
  const codeMatch = filename.match(/dfva-(.+)\.md/);
  if (!codeMatch) return null;
  const code = codeMatch[1];

  // Extract program name
  let name = code;
  const nameMatch = md.match(/\*\*Institution:\*\*\s*(.+?)\s*\|/);
  if (nameMatch) {
    name = nameMatch[1].trim();
  } else {
    // Try heading format
    const hdrMatch = md.match(/^##?\s*DFVA\s+REPORT:\s*.+?\s*\(([^)]+)\)/m);
    if (hdrMatch) name = hdrMatch[1].trim();
    else {
      const hdr2 = md.match(/^##?\s*DFVA\s+REPORT:\s*(.+)/m);
      if (hdr2) name = hdr2[1].trim();
    }
  }

  // Parse dimensions (digit or N/A in the score column). N/A → null (Not Applicable).
  const dimMap = new Map<string, number | null>();
  const dimRegex = /\| (\d+) \| (.+?) \| (\d+|N\/A) \| (.+?) \|/g;
  let match;
  while ((match = dimRegex.exec(md)) !== null) {
    const rawLabel = match[2].trim();
    const score = match[3] === 'N/A' ? null : parseInt(match[3], 10);
    const canonical = mapLabelToCanonical(rawLabel);
    if (canonical && !dimMap.has(canonical)) {
      dimMap.set(canonical, score);
    }
  }

  // Also handle irreplaceability/bonus rows where col 1 is B or BONUS instead of a digit
  const bonusRegex = /\| (B|BONUS|bonus) \| (.+?) \| (\d+|N\/A) \| (.+?) \|/gi;
  while ((match = bonusRegex.exec(md)) !== null) {
    const rawLabel = match[2].trim();
    const score = match[3] === 'N/A' ? null : parseInt(match[3], 10);
    const canonical = mapLabelToCanonical(rawLabel);
    if (canonical && !dimMap.has(canonical)) {
      dimMap.set(canonical, score);
    }
  }

  // Build dimensions in canonical order
  const dims: ProgramData['dimensions'] = DIMENSIONS.map(label => ({
    label,
    score: dimMap.has(label) ? (dimMap.get(label) as number | null) : 0,
    max: 3,
  }));

  // Extract total score - various formats
  let score = 0;
  // Format: **TOTAL: 26/36** or **TOTAL: 26/36 — MODERATE RISK**
  const totalMatch = md.match(/\*\*TOTAL:?\s*(\d+)\s*\/\s*36/i);
  if (totalMatch) {
    score = parseInt(totalMatch[1], 10);
  } else {
    // Format: **Score:** 23/36
    const scoreMatch = md.match(/\*\*Score:\*\*\s*(\d+)\s*\/\s*36/i);
    if (scoreMatch) score = parseInt(scoreMatch[1], 10);
  }
  // Format: table row | | **TOTAL** | **24/36** | **MODERATE RISK** |
  if (score === 0) {
    const tblMatch = md.match(/\|\s*\|\s*\*?\*?TOTAL\*?\*?\s*\|\s*\*?\*?(\d+)\s*\/\s*36\*?\*?\s*\|/i);
    if (tblMatch) score = parseInt(tblMatch[1], 10);
  }

  // If no TOTAL found, sum dimensions (NA dims contribute nothing).
  if (score === 0) {
    score = dims.reduce((sum, d) => sum + (d.score ?? 0), 0);
  }

  // Extract risk band (case-sensitive: only ALL-CAPS or Title Case risk bands, not body text words)
  let riskBand = 'MODERATE RISK';
  // Try to find risk band near TOTAL line first
  const bandNearTotal = md.match(/\*\*TOTAL:?\s*\d+\s*\/\s*36\s*[—–-]+\s*(RESILIENT|MODERATE RISK|HIGH RISK|CRITICAL)/);
  if (bandNearTotal) {
    riskBand = bandNearTotal[1];
  } else {
    // Try table-format
    const bandInTable = md.match(/\|\s*\|\s*\*?\*?TOTAL\*?\*?\s*\|\s*\*?\*?\d+\s*\/\s*36\*?\*?\s*\|\s*\*?\*?(RESILIENT|MODERATE RISK|HIGH RISK|CRITICAL)/);
    if (bandInTable) {
      riskBand = bandInTable[1];
    } else {
      // Fallback: find standalone risk band (not near body text)
      const bandMatch = md.match(/\b(RESILIENT|MODERATE RISK|HIGH RISK|CRITICAL)\b/);
      if (bandMatch) riskBand = bandMatch[1];
    }
  }

  return { code, name, score, riskBand, dimensions: dims };
}

function generateRoadmap(p: ProgramData): string {
  const dims = [...p.dimensions];
  
  // Sort by score ascending (weakest first), prioritizing AI Literacy. NA dims (score === null)
  // are not improvement targets, so treat them as effectively "off the list" (max score).
  const effScore = (s: number | null) => (s === null ? Infinity : s);
  dims.sort((a, b) => {
    if (a.label === 'AI Literacy' && effScore(a.score) < 3) return -1;
    if (b.label === 'AI Literacy' && effScore(b.score) < 3) return 1;
    return effScore(a.score) - effScore(b.score);
  });

  const improvable = dims.filter(d => d.score !== null && d.score < 3);
  
  let currentScore = p.score;
  const actions: { priority: string; dimension: string; action: string; scoreDelta: number; newTotal: number }[] = [];

  for (let i = 0; i < Math.min(improvable.length, 3); i++) {
    const d = improvable[i];
    const priority = i === 0 ? 'P1' : i === 1 ? 'P2' : 'P3';
    const delta = 1;
    currentScore += delta;
    actions.push({
      priority,
      dimension: d.label,
      action: DIM_ACTIONS[d.label] || 'General curriculum improvement',
      scoreDelta: delta,
      newTotal: currentScore,
    });
  }

  const gap = Math.max(0, 28 - p.score);
  
  // Map code to study field
  let field = 'Science';
  const codeLower = p.code.toLowerCase();
  if (['mc-cs', 'mc-datasc', 'mc-is'].includes(codeLower)) {
    field = 'Information Technology';
  } else if (['mc-indeng', '746st'].includes(codeLower)) {
    field = 'Engineering';
  } else if (['527cl', 'mc-clind', 'mc-nursc', 'mc-propsyc', 'mc-phtyph', 'mc-surged', '439fs'].includes(codeLower)) {
    field = 'Health';
  } else if (['mc-ba', 'mc-busana', 'mc-bamktg', 'mc-base', 'mc-apbusa'].includes(codeLower)) {
    field = 'Business & Management';
  } else if (['mc-arch', 'mc-urbdes', 'mc-prop', 'mc-urbhort', 'b-des'].includes(codeLower)) {
    field = 'Architecture & Building';
  } else if (['mc-journ', 'mc-scwr'].includes(codeLower)) {
    field = 'Creative Arts';
  } else if (['mc-ed', 'mc-intedib', 'mc-tesol'].includes(codeLower)) {
    field = 'Education';
  } else if (['mc-envlaw'].includes(codeLower)) {
    field = 'Law';
  }

  let md = `## IMPROVEMENT PLAN: ${p.name}\n\n`;
  md += `**Current:** ${p.score}/36 ${p.riskBand} | **Duration:** Master · 2 years\n`;
  md += `**Target:** 28/36 RESILIENT | **Gap:** ${gap} point${gap !== 1 ? 's' : ''}\n\n`;
  md += `---\n\n`;
  
  md += `## 1. DIAGNOSTIC SUMMARY\n`;
  md += `The ${p.name} scored **${p.score}/36 — ${p.riskBand}**. Gaps in core dimensions define the primary intervention targets.\n\n`;
  md += `| Dimension | Score | Status |\n`;
  md += `|---|---|---|\n`;
  for (const d of p.dimensions) {
    const status =
      d.score === null
        ? 'Not applicable'
        : d.score === 3
          ? 'Strong'
          : d.score === 2
            ? 'Adequate'
            : 'Critical gap';
    md += `| ${d.label} | ${d.score === null ? 'N/A' : `${d.score}/3`} | ${status} |\n`;
  }
  md += `| **TOTAL** | **${p.score}/36** | **${p.riskBand}** |\n\n`;
  md += `---\n\n`;

  md += `## 2. SCORE-TO-ACTION MAPPING\n`;
  md += `| Dimension | DFVA Score | Gap Diagnosis | Recommended Intervention |\n`;
  md += `|---|---|---|---|\n`;
  for (const a of actions) {
    const cur = p.dimensions.find(d => d.label === a.dimension)?.score ?? 0;
    md += `| ${a.dimension} | ${cur === null ? 'N/A' : `${cur}/3`} | Entry-level skills show automation risk. | ${a.action}. |\n`;
  }
  md += `\n---\n\n`;

  md += `## 3. MARKET EVIDENCE SNAPSHOT\n`;
  md += `| Job Family | Recent Hiring Signal | X Discussion Theme | Curriculum Impact |\n`;
  md += `|---|---|---|---|\n`;
  md += `| ${field} Specialist | Seek ANZ: postings requiring AI tool validation and governance skills up 20% YoY | "Entry-level execution is being automated; graduates must bring tool verification capabilities" | Integrate tool evaluation modules in core classes |\n`;
  md += `| Generalist Practitioner | High substitution risk in routine document-production roles | "Junior roles are transitioning to workflow oversight and client advisory duties" | Implement client-facing capstone projects |\n\n`;
  md += `---\n\n`;

  md += `## 4. PRIORITISED INTERVENTIONS TABLE\n`;
  md += `| Priority | Action | Target Dimension(s) | Market Signal Link | Impact | Effort | Owner | Timeline | KPI |\n`;
  md += `|---|---|---|---|---|---|---|---|---|\n`;
  for (const a of actions) {
    const timeline = 'Months 1–6';
    const owner = 'Program Coordinator';
    const kpi = 'Approved Sem 1 2027';
    md += `| ${a.priority} | ${a.action} | ${a.dimension} | Strong market demand for AI-governance capabilities | HIGH | Medium | ${owner} | ${timeline} | ${kpi} |\n`;
  }
  md += `\n---\n\n`;

  md += `## 5. 12-MONTH IMPLEMENTATION ROADMAP\n`;
  md += `* **Month 1–3 — Foundation:** Update career advisory frameworks. Begin syllabus design for AI and technology governance modules.\n`;
  md += `* **Month 3–6 — Design Sprint:** Finalize unit outlines and project guidelines. Formulate industry review panel to ensure curriculum alignment.\n`;
  md += `* **Month 6–9 — Build and Validate:** Submit changes to the curriculum committee for approval. Pilot AI verification workshops.\n`;
  md += `* **Month 9–12 — Pre-Launch:** Update course handbooks. Publish destination reports and prepare staff for Sem 1 2027 delivery.\n\n`;
  md += `---\n\n`;

  md += `## 6. 24-MONTH CAPABILITY ROADMAP\n`;
  md += `* **Months 1–12 — Structural Fix:** Address the most critical gaps. Deploy the AI Literacy and tool validation core modules.\n`;
  md += `* **Months 13–18 — Depth and Differentiation:** Mandate client-facing capstones and project reflections. Align course lines with professional standards.\n`;
  md += `* **Months 19–24 — Evidence and Signal:** Document second-generation destination outcomes. Audit student research outputs against validation guidelines.\n\n`;
  md += `---\n\n`;

  md += `## 7. ASSESSMENT REDESIGN EXAMPLES\n`;
  md += `* **Coursework Project — Redesigned:** Complete a major project with a documented AI use reflection. Students must outline all tools used, prompts entered, output verification steps, and human judgment checks.\n`;
  md += `* **Specialist Seminar — New Module:** Select an AI tool in your domain and write a 1,000-word GRC audit detailing three failure modes, data source lineage, and risk mitigation strategies.\n\n`;
  md += `---\n\n`;

  md += `## 8. AI GOVERNANCE AND QUALITY CONTROLS\n`;
  md += `* **Academic Integrity Policy:** Mandate disclosure of all generative AI tools in coursework.\n`;
  md += `* **Human Validation Gates:** Require visual draft reviews or git version logs to ensure students execute study designs.\n`;
  md += `* **Curation Protocols:** Require manual data audits before uploading to automated modeling tools.\n\n`;
  md += `---\n\n`;

  md += `## 9. MEASUREMENT PLAN\n`;
  md += `* **Leading indicators (12 months):** Core AI modules active in handbook · Advisory panel constituted · Revised projects deployed.\n`;
  md += `* **Lagging indicators (12–24 months):** Graduate time-to-employment reduced to 90 days · Employer satisfaction rating ≥ 80%.\n\n`;
  md += `---\n\n`;

  md += `## 10. RISKS, TRADE-OFFS, AND DEPENDENCIES\n`;
  md += `* **Faculty lag:** Sourcing qualified academic coordinators can delay course roll-outs. *Mitigation:* Deliver joint guest lectures with industry partners.\n`;
  md += `* **Credit constraints:** Adding mandatory units can reduce student elective flexibility. *Mitigation:* Integrate topics as modules in existing units.\n\n`;
  md += `---\n\n`;

  md += `## 11. REDESIGNED GRADUATE PROFILE (2027 READY)\n`;
  md += `The 2027-ready graduate is a domain specialist and workflow critic. They do not merely operate general-purpose AI tools; they govern and audit them. They bring strong systems thinking, decision ownership under uncertainty, and client translation capabilities that make them highly durable in a changing labor market.\n`;

  return md;
}

async function main() {
  const files = (await fs.readdir(REPORTS_DIR)).filter(f => f.startsWith('dfva-') && f.endsWith('.md') && !f.includes('market') && !f.includes('recommend'));
  
  console.log(`Found ${files.length} DFVA report files\n`);
  
  let generated = 0;
  let skipped = 0;
  for (const filename of files) {
    const code = filename.replace('dfva-', '').replace('.md', '');
    const outPath = path.join(REPORTS_DIR, `dfva-recommend-${code}.md`);
    
    // Check if the detailed plan already exists to avoid overwriting it
    try {
      const existing = await fs.readFile(outPath, 'utf8');
      if (existing.includes('## 1. DIAGNOSTIC SUMMARY')) {
        console.log(`  SKIP ${filename}: already has detailed improvement plan`);
        skipped++;
        continue;
      }
    } catch (e) {
      // Ignore if file doesn't exist
    }

    const content = await fs.readFile(path.join(REPORTS_DIR, filename), 'utf8');
    const p = parseReport(content, filename);
    if (!p) {
      console.log(`  SKIP ${filename}: could not parse`);
      skipped++;
      continue;
    }
    
    const parsedCount = p.dimensions.filter(d => d.score !== null && d.score > 0).length;
    if (parsedCount < 6) {
      console.log(`  SKIP ${filename}: only ${parsedCount} dimensions parsed (score: ${p.score})`);
      skipped++;
      continue;
    }

    const roadmap = generateRoadmap(p);
    await fs.writeFile(outPath, roadmap, 'utf8');
    console.log(`  ${filename} → dfva-recommend-${code}.md (${p.score}/36 ${p.riskBand}, gap: ${28 - p.score}, ${parsedCount} dims)`);
    generated++;
  }

  console.log(`\nGenerated ${generated} improvement roadmaps (${skipped} skipped)`);
}

main().catch(e => { console.error(e); process.exit(1); });
