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
  dimensions: { label: string; score: number; max: number }[];
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

  // Parse dimensions using enrich-reports proven regex (digit in col 1)
  const dimMap = new Map<string, number>();
  const dimRegex = /\| (\d+) \| (.+?) \| (\d+)(?:\/\d+)? \| (.+?) \|/g;
  let match;
  while ((match = dimRegex.exec(md)) !== null) {
    const rawLabel = match[2].trim();
    const score = parseInt(match[3], 10);
    const canonical = mapLabelToCanonical(rawLabel);
    if (canonical && !dimMap.has(canonical)) {
      dimMap.set(canonical, score);
    }
  }

  // Also handle irreplaceability/bonus rows where col 1 is B or BONUS instead of a digit
  const bonusRegex = /\| (B|BONUS|bonus) \| (.+?) \| (\d+)(?:\/\d+)? \| (.+?) \|/gi;
  while ((match = bonusRegex.exec(md)) !== null) {
    const rawLabel = match[2].trim();
    const score = parseInt(match[3], 10);
    const canonical = mapLabelToCanonical(rawLabel);
    if (canonical && !dimMap.has(canonical)) {
      dimMap.set(canonical, score);
    }
  }

  // Build dimensions in canonical order
  const dims: ProgramData['dimensions'] = DIMENSIONS.map(label => ({
    label,
    score: dimMap.get(label) ?? 0,
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

  // If no TOTAL found, sum dimensions
  if (score === 0) {
    score = dims.reduce((sum, d) => sum + d.score, 0);
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
  
  // Sort by score ascending (weakest first), prioritizing AI Literacy
  dims.sort((a, b) => {
    if (a.label === 'AI Literacy' && a.score < 3) return -1;
    if (b.label === 'AI Literacy' && b.score < 3) return 1;
    return a.score - b.score;
  });

  const improvable = dims.filter(d => d.score < 3);
  
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

  const gap = 28 - p.score;
  const afterAll = actions.length > 0 ? actions[actions.length - 1].newTotal : p.score;
  const newBand = afterAll >= 28 ? 'RESILIENT' : afterAll >= 20 ? 'MODERATE RISK' : afterAll >= 12 ? 'HIGH RISK' : 'CRITICAL';

  let md = `## DFVA IMPROVEMENT ROADMAP: ${p.name} (${p.code.toUpperCase()})\n`;
  md += `**Current:** ${p.score}/36 ${p.riskBand} | **Target:** RESILIENT (28+) | **Gap:** ${gap} pts\n\n`;
  md += `### Priority Actions\n\n`;
  md += `| Priority | Dimension | Current | Action | Impact | New Total |\n`;
  md += `|----------|-----------|---------|--------|--------|----------|\n`;

  for (const a of actions) {
    const cur = p.dimensions.find(d => d.label === a.dimension)?.score ?? '?';
    md += `| ${a.priority} | ${a.dimension} | ${cur}/3 | ${a.action} | +${a.scoreDelta} | ${a.newTotal}/36 |\n`;
  }

  md += `\n### Outcome\n`;
  if (afterAll >= 28) {
    md += `After all priority actions: **${afterAll}/36 RESILIENT** ✅\n`;
  } else {
    md += `After all priority actions: **${afterAll}/36 ${newBand}** (${28 - afterAll} pts from RESILIENT)\n`;
  }
  md += `\n### Implementation Notes\n`;
  md += `- P1 actions can typically be implemented in one academic cycle (6-12 months)\n`;
  md += `- P2 and P3 actions may require curriculum committee approval and 12-24 month lead time\n`;
  md += `- AI Literacy module is the single highest-impact intervention across all programs\n`;
  
  return md;
}

async function main() {
  const files = (await fs.readdir(REPORTS_DIR)).filter(f => f.startsWith('dfva-') && f.endsWith('.md') && !f.includes('market') && !f.includes('recommend'));
  
  console.log(`Found ${files.length} DFVA report files\n`);
  
  let generated = 0;
  let skipped = 0;
  for (const filename of files) {
    const content = await fs.readFile(path.join(REPORTS_DIR, filename), 'utf8');
    const p = parseReport(content, filename);
    if (!p) {
      console.log(`  SKIP ${filename}: could not parse`);
      skipped++;
      continue;
    }
    
    const parsedCount = p.dimensions.filter(d => d.score > 0).length;
    if (parsedCount < 6) {
      console.log(`  SKIP ${filename}: only ${parsedCount} dimensions parsed (score: ${p.score})`);
      skipped++;
      continue;
    }

    const roadmap = generateRoadmap(p);
    const code = filename.replace('dfva-', '').replace('.md', '');
    await fs.writeFile(path.join(REPORTS_DIR, `dfva-recommend-${code}.md`), roadmap, 'utf8');
    console.log(`  ${filename} → dfva-recommend-${code}.md (${p.score}/36 ${p.riskBand}, gap: ${28 - p.score}, ${parsedCount} dims)`);
    generated++;
  }

  console.log(`\nGenerated ${generated} improvement roadmaps (${skipped} skipped)`);
}

main().catch(e => { console.error(e); process.exit(1); });
