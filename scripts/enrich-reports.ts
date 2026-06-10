// scripts/enrich-reports.ts
// Run: npx tsx scripts/enrich-reports.ts
import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import { enrichWithMarketData } from '../compass/app/src/compass/marketDataService';
import type { AssessmentResult } from '../compass/app/src/compass/assessmentService';

const REPORTS_DIR = path.join(__dirname, '..', 'reports');

// Parse a report (markdown or JSON) back into a minimal AssessmentResult
function parseReport(content: string, filename: string): Partial<AssessmentResult> & { courseCode: string; isJson: boolean } {
  const codeMatch = filename.match(/dfva-(.+)\.md/);
  const courseCode = codeMatch ? codeMatch[1] : 'unknown';

  // Detect JSON content
  const trimmed = content.trim();
  if (trimmed.startsWith('{')) {
    try {
      const json = JSON.parse(trimmed);
      return {
        courseCode: json.courseCode || courseCode,
        programName: json.programName || 'Unknown',
        score: json.score || 0,
        maxScore: json.maxScore || 36,
        riskBand: json.riskBand || 'MODERATE RISK',
        thresholds: json.thresholds || { q1: 'UNCERTAIN', q2: 'UNCERTAIN', q3: 'UNCERTAIN' },
        dimensions: Array.isArray(json.dimensions) ? json.dimensions.map((d: any) => ({
          label: d.label || '',
          score: typeof d.score === 'number' ? d.score : 0,
          max: d.max || 3,
        })) : [],
        reportJson: {},
        isJson: true,
      };
    } catch {
      // Fall through to markdown parsing
    }
  }

  // Markdown parsing
  const dims: AssessmentResult['dimensions'] = [];
  // Support both "2" and "2/3" score formats
  const dimRegex = /\| (\d+) \| (.+?) \| (\d+)(?:\/\d+)? \| (.+?) \|/g;
  let match;
  while ((match = dimRegex.exec(content)) !== null) {
    if (match[2].includes('Automation') || match[2].includes('Systems') || match[2].includes('Technical') ||
        match[2].includes('Decision') || match[2].includes('AI Lit') || match[2].includes('Domain') ||
        match[2].includes('Research') || match[2].includes('Human') || match[2].includes('Curr') ||
        match[2].includes('Outcome') || match[2].includes('Irreplaceability')) {
      dims.push({ label: match[2].trim(), score: parseInt(match[3]), max: 3 });
    }
  }

  // Extract total score - various formats
  let score = 0;
  const totalMatch = content.match(/\*\*TOTAL:?\s*(\d+)\s*\/\s*36/i);
  if (totalMatch) {
    score = parseInt(totalMatch[1]);
  } else {
    // Try "**Score:** 23/36" format
    const scoreMatch = content.match(/\*\*Score:\*\*\s*(\d+)\s*\/\s*36/i);
    if (scoreMatch) score = parseInt(scoreMatch[1]);
  }

  const programName = 'Unknown';

  return {
    courseCode,
    programName,
    score,
    maxScore: 36,
    riskBand: 'MODERATE RISK',
    thresholds: { q1: 'UNCERTAIN', q2: 'UNCERTAIN', q3: 'UNCERTAIN' },
    dimensions: dims,
    reportJson: {},
    isJson: false,
  };
}

// Generate markdown market data section
function generateMarketSection(result: any): string {
  if (!result.marketData) return '';
  const d = result.marketData;
  return [
    '',
    '### MARKET DATA',
    `| Metric | Value |`,
    `|--------|-------|`,
    `| Field | ${d.field} |`,
    `| Full-time employment (4-6mo) | ${(d.employmentRate * 100).toFixed(1)}% (GOS 2024) |`,
    `| Median starting salary | $${d.medianSalary.toLocaleString()} |`,
    `| Employment (3yr) | ${(d.employmentRate3yr * 100).toFixed(1)}% |`,
    `| Occupation demand | ${d.occupationDemand.replace(/_/g, ' ')} |`,
    `| AI automation exposure | ${(d.aiExposure * 100).toFixed(0)}% |`,
    `| Sources | ${d.sources.join(', ')} |`,
    '',
  ].join('\n');
}

async function main() {
  const files = await fs.readdir(REPORTS_DIR);
  const reportFiles = files.filter(f => f.startsWith('dfva-') && f.endsWith('.md') && !f.includes('market') && !f.includes('recommend'));

  let updated = 0;
  let skipped = 0;

  for (const filename of reportFiles) {
    const filepath = path.join(REPORTS_DIR, filename);
    const raw = await fs.readFile(filepath, 'utf8');

    // Skip if already has market data
    if (raw.includes('### MARKET DATA')) {
      skipped++;
      continue;
    }

    const parsed = parseReport(raw, filename);

    // Need at least 8 dimensions (some reports have fewer dims or Irreplaceability)
    if (parsed.dimensions.length < 8) {
      console.log(`  SKIP ${filename}: only ${parsed.dimensions.length} dimensions parsed`);
      continue;
    }

    // Cast to AssessmentResult for the enricher
    const enriched = enrichWithMarketData(parsed as AssessmentResult);
    if (!enriched.marketData) {
      console.log(`  SKIP ${filename}: no market data for field`);
      continue;
    }

    // Find D10
    const outcomeDim = enriched.dimensions.find(d => d.label.includes('Outcome'));
    const oldD10 = parsed.dimensions.find(d => d.label.includes('Outcome'))?.score ?? 0;
    const newD10 = outcomeDim?.score ?? oldD10;

    let updatedContent: string;

    if (parsed.isJson) {
      // JSON format: add market property and append markdown section
      const json = JSON.parse(raw.trim());
      json.market = {
        field: enriched.marketData.field,
        employmentRate: enriched.marketData.employmentRate,
        medianSalary: enriched.marketData.medianSalary,
        employmentRate3yr: enriched.marketData.employmentRate3yr,
        medianSalary3yr: enriched.marketData.medianSalary3yr,
        occupationDemand: enriched.marketData.occupationDemand,
        aiExposure: enriched.marketData.aiExposure,
        sources: enriched.marketData.sources,
        year: enriched.marketData.year,
      };
      // Update D10 in dimensions
      if (outcomeDim) {
        const d10 = json.dimensions.find((d: any) => d.label.includes('Outcome'));
        if (d10) d10.score = newD10;
      }
      // Recalculate score
      const newTotal = parsed.score + (newD10 - oldD10);
      json.score = newTotal;
      updatedContent = JSON.stringify(json, null, 2) + '\n' + generateMarketSection(enriched);
    } else {
      // Markdown format: update D10 score and total
      let md = raw;
      if (outcomeDim) {
        // Support both "2" and "2/3" score formats in the table
        const oldRow = new RegExp(`(\\| \\d+ \\| [^|]*Outcome[^|]* \\| )\\d+(?:\\/\\d+)?( \\| [^|]+ \\|)`, 'i');
        md = md.replace(oldRow, `$1${newD10}$2`);
      }

      const newTotal = parsed.score + (newD10 - oldD10);
      if (newTotal !== parsed.score) {
        // "**TOTAL: 23/36" or "**Score:** 23/36" format
        const totalRx = new RegExp(`(\\*\\*(?:TOTAL:?|Score:)\\*\\*\\s*)\\d+(\\s*/\\s*36)`, 'i');
        md = md.replace(totalRx, `$1${newTotal}$2`);
      }

      updatedContent = md + generateMarketSection(enriched);
    }

    await fs.writeFile(filepath, updatedContent, 'utf8');
    console.log(`  UPDATED ${filename}: D10 ${oldD10} → ${newD10}, total ${parsed.score} → ${parsed.score + (newD10 - oldD10)}`);
    updated++;
  }

  console.log(`\nDone: ${updated} updated, ${skipped} already had market data, ${reportFiles.length - updated - skipped} skipped`);
  console.log('Run: git diff reports/ to review changes');
}

main().catch(e => { console.error(e); process.exit(1); });
