// scripts/dfva-score.ts
// Hermes-native DFVA scorer — saves prompt for the Hermes LLM to score.
// Run: npx tsx scripts/dfva-score.ts <course-code>
import { fetchCourseOverview, fetchCourseStructure, fetchCourseAttributes } from '../compass/app/src/compass/handbookFetcher';
import { buildDfvaPrompt } from '../compass/app/src/compass/dfvaPrompt';
import type { HandbookPages } from '../compass/app/src/compass/llmScorer';
import { promises as fs } from 'node:fs';

async function main() {
  const courseCode = process.argv[2];
  if (!courseCode) {
    console.error('Usage: npx tsx scripts/dfva-score.ts <course-code>');
    process.exit(1);
  }

  console.log(`Fetching handbook for ${courseCode}...`);
  const [overview, structure, attributes] = await Promise.all([
    fetchCourseOverview(courseCode),
    fetchCourseStructure(courseCode),
    fetchCourseAttributes(courseCode),
  ]);

  const pages: HandbookPages = {
    overview: overview.content,
    courseStructure: structure.content,
    attributes: attributes.content,
    courseCode: courseCode.toUpperCase(),
    programName: extractProgramName(overview.content) ?? overview.title,
    level: extractLevel(overview.content) ?? 'Graduate Coursework',
    duration: extractDuration(overview.content) ?? 'To be determined',
  };

  const prompt = buildDfvaPrompt(pages);

  const promptPath = `/tmp/dfva-prompt-${courseCode}.txt`;
  await fs.writeFile(promptPath, prompt, 'utf8');
  console.log(`\nProgram: ${pages.programName}`);
  console.log(`Level: ${pages.level} | Duration: ${pages.duration}`);
  console.log(`Prompt: ${promptPath} (${prompt.length} chars)`);
  console.log(`\n--- DFVA PROMPT (give this to Hermes) ---\n`);
  console.log(prompt);
}

function extractProgramName(content: string): string | null {
  const match = content.match(/Award title\s+(.+)/i);
  return match ? match[1].trim() : null;
}
function extractLevel(content: string): string | null {
  if (content.includes('Graduate Coursework')) return 'Master (Coursework)';
  if (content.includes('Graduate Research')) return 'Master (Research)';
  if (content.includes('Undergraduate')) return 'Bachelor';
  return null;
}
function extractDuration(content: string): string | null {
  const match = content.match(/(\d+)\s*months?\s*full-time/i);
  return match ? `${match[1]} months full-time` : null;
}

main().catch(e => { console.error(e); process.exit(1); });
