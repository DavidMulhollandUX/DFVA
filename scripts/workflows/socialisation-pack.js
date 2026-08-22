export const meta = {
  name: 'socialisation-pack',
  description:
    'Build the socialisation pack for scored programs: facilitator guide, Evidura-branded deck, and the link back from the report',
  whenToUse:
    'After reports/dfva-v4-<code>.md exists and its family (market + recommend) is written. Produces the artifacts for the session in which SMEs and curriculum staff correct the report.',
  phases: [
    { title: 'Brief', detail: 'read the report family into one structured brief — the shared source for guide and deck' },
    { title: 'Guide', detail: 'write docs/evidura-facilitation-guide-<code>.md' },
    { title: 'Verify', detail: 'every claim traceable to the report family; no claim invented for the room' },
    { title: 'Deck', detail: 'deck spec + build-evidura-deck.py until it exits clean' },
    { title: 'Link', detail: 'socialisation line in the report; content regenerated once, after the fan-out' },
  ],
}

// args: program codes with a v4 report on disk. Accepts an array or a string,
// because a scheduled run stringifies it and would otherwise silently do nothing.
let codes = args
if (typeof codes === 'string') {
  try {
    codes = JSON.parse(codes)
  } catch {
    codes = codes.split(/[\s,]+/).filter(Boolean)
  }
}
if (typeof codes === 'string') codes = [codes]
if (!Array.isArray(codes) || codes.length === 0) {
  throw new Error(
    `args must be program codes with a report at reports/dfva-v4-<code>.md — received ${JSON.stringify(args)}`,
  )
}

// The brief is the reason the guide and the deck cannot disagree: both are
// written from this object rather than from independent readings of the report.
// Every field is a quotation or a number the report already states — nothing
// here is composed, which is what the verify stage checks.
const BRIEF = {
  type: 'object',
  required: ['code', 'programName', 'adaptiveness', 'workplace', 'items', 'gates', 'findings', 'declaredGaps', 'straddles'],
  properties: {
    code: { type: 'string' },
    programName: { type: 'string' },
    instrument: { type: 'string' },
    assessmentDate: { type: 'string' },
    handbookVintage: { type: 'string' },
    exposure: {
      type: 'object',
      properties: {
        value: { type: 'string' },
        n: { type: 'integer' },
        basis: { type: 'string' },
        note: { type: 'string' },
      },
    },
    adaptiveness: { type: 'string', description: 'e.g. "8 / 15" — never summed with workplace' },
    workplace: { type: 'string', description: 'e.g. "4 / 9" — never summed with adaptiveness' },
    positionLabel: { type: 'string', description: 'the report\'s own words, usually "not reported"' },
    items: {
      type: 'array',
      minItems: 8,
      items: {
        type: 'object',
        required: ['id', 'label', 'score', 'max'],
        properties: {
          id: { type: 'string' },
          label: { type: 'string' },
          score: { type: 'integer' },
          max: { type: 'integer' },
        },
      },
    },
    gates: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'result'],
        properties: { id: { type: 'string' }, result: { type: 'string' }, why: { type: 'string' } },
      },
    },
    findings: {
      type: 'array',
      minItems: 3,
      maxItems: 5,
      items: {
        type: 'object',
        required: ['heading', 'text'],
        properties: { heading: { type: 'string' }, text: { type: 'string' } },
      },
    },
    // §6 "Not scoreable" plus the confidence paragraph — conceded first in the
    // room, before anyone has to find them.
    declaredGaps: { type: 'array', minItems: 1, items: { type: 'string' } },
    // §6 "Ambiguities" — the report's own close calls. These ARE the validity
    // questions; a guide that invents different ones has missed the point.
    straddles: {
      type: 'array',
      items: {
        type: 'object',
        required: ['item', 'between', 'question'],
        properties: { item: { type: 'string' }, between: { type: 'string' }, question: { type: 'string' } },
      },
    },
    // Subject guides, rubrics and task briefs the score turns on — pre-fills the
    // evidence register so the room starts from the report's own gaps.
    evidenceRequests: {
      type: 'array',
      items: {
        type: 'object',
        required: ['what', 'source', 'bearsOn'],
        properties: { what: { type: 'string' }, source: { type: 'string' }, bearsOn: { type: 'string' } },
      },
    },
    corrections: { type: 'array', items: { type: 'string' } },
    notDone: { type: 'array', items: { type: 'string' } },
  },
}

const VERIFY = {
  type: 'object',
  required: ['clean', 'unsupported'],
  properties: {
    clean: { type: 'boolean' },
    unsupported: {
      type: 'array',
      items: {
        type: 'object',
        required: ['quote', 'why'],
        properties: { quote: { type: 'string' }, why: { type: 'string' }, fixed: { type: 'boolean' } },
      },
    },
    notes: { type: 'string' },
  },
}

const results = await pipeline(
  codes,

  // 1 BRIEF — read the family once, structure it once.
  (code) =>
    agent(
      `Read the full report family for program ${code} and return the structured brief.\n` +
        `Files: reports/dfva-v4-${code}.md (required), reports/dfva-market-${code}.md and ` +
        `reports/dfva-v4-recommend-${code}.md (read if present).\n\n` +
        `Rules:\n` +
        `- Every value comes from the report. Do not compute, infer or improve anything.\n` +
        `- adaptiveness and workplace are reported as separate strings and NEVER summed.\n` +
        `- positionLabel is whatever §1 says, verbatim in substance — usually that it is withheld.\n` +
        `- declaredGaps comes from §6 "Not scoreable" and the evidence-confidence paragraph.\n` +
        `- straddles comes from §6 "Ambiguities". For each, phrase "question" as the question a ` +
        `facilitator would put to the room, not as a statement.\n` +
        `- evidenceRequests are the documents the scores turn on: subject guides, marking criteria, ` +
        `task briefs, assessment specifications, and any subject the extract is missing.\n` +
        `- corrections: any correction notice the report carries. If none, return an empty array — ` +
        `do not invent one.\n` +
        `- findings: three to five, each the load-bearing point of the assessment, in the report's own terms.`,
      { label: `brief:${code}`, phase: 'Brief', schema: BRIEF },
    ),

  // 2 GUIDE — the facilitator's document.
  (brief, code) =>
    agent(
      `Write the socialisation facilitator's guide for ${code} to ` +
        `docs/evidura-facilitation-guide-${code}.md.\n\n` +
        `Structure, section for section, follow docs/evidura-facilitation-guide-mc-mgmthre.md — read it ` +
        `first. Its Appendix B lists exactly which sections are program-independent (§0, §2, §3, §7, §9 — ` +
        `carry these across, adjusting only names and links) and which must be rewritten from this ` +
        `program's own evidence (§5, §6.B, Appendix A).\n\n` +
        `Brief (the ONLY source of program facts — do not re-derive them):\n${JSON.stringify(brief)}\n\n` +
        `Hard rules:\n` +
        `- The purpose of the session is to have the report corrected, not received. §0 must say so.\n` +
        `- §6.B's validity questions ARE the brief's straddles. Put each to the room as a question.\n` +
        `- §6.A concedes declaredGaps before asking what else is missing.\n` +
        `- §8.2's evidence register is pre-filled from evidenceRequests, one row each, E1..En.\n` +
        `- Never state a position label or band unless the brief carries one. Never sum the two sub-scores.\n` +
        `- Never promise a date for the content-validity panel or the IRR study.\n` +
        `- Every score, quotation and number must already appear in the report family. If the guide needs ` +
        `a fact the report does not have, leave it out and say so — that absence is itself a finding.\n` +
        `- Run: npx markdownlint-cli --config ~/.markdownlint.json docs/evidura-facilitation-guide-${code}.md ` +
        `and fix what it reports.\n\n` +
        `Return {code, guidePath, sections}.`,
      {
        label: `guide:${code}`,
        phase: 'Guide',
        schema: {
          type: 'object',
          required: ['code', 'guidePath'],
          properties: { code: { type: 'string' }, guidePath: { type: 'string' }, sections: { type: 'integer' } },
        },
      },
    ).then((g) => ({ brief, guide: g })),

  // 3 VERIFY — adversarial traceability pass. A guide is read by people who know
  // the program better than the rater does; one invented fact costs the room.
  (r, code) =>
    agent(
      `Adversarially verify docs/evidura-facilitation-guide-${code}.md against reports/dfva-v4-${code}.md ` +
        `and its market and recommend siblings.\n\n` +
        `Try to find claims the guide makes that the report family does not support. Check specifically:\n` +
        `1. Every score, sub-score, exposure figure, n, subject code and credit-point number.\n` +
        `2. Every quotation attributed to the handbook — it must appear in the report verbatim.\n` +
        `3. The straddles in §6.B — they must be the report's own recorded ambiguities, not new ones.\n` +
        `4. No position label, band, or peer comparison anywhere, unless §1 of the report states one.\n` +
        `5. The two sub-scores are never added, in prose or in a table.\n` +
        `6. No promise the harness cannot keep: no date for the content-validity panel or IRR study, ` +
        `no commitment about who may see the report.\n` +
        `7. The objections section concedes what is true in each objection before answering it — an ` +
        `answer that only defends is a defect here.\n\n` +
        `Fix what you find, in the file, and report it. An empty "unsupported" array on a guide you ` +
        `did not check line by line is worse than a long one.`,
      { label: `verify:${code}`, phase: 'Verify', schema: VERIFY },
    ).then((v) => ({ ...r, verify: v })),

  // 4 DECK — content in JSON, brand in the builder.
  (r, code) =>
    agent(
      `Build the Evidura-branded deck for ${code}.\n\n` +
        `(1) Write docs/decks/evidura-socialisation-${code}.deck.json. Read ` +
        `docs/decks/evidura-socialisation-mc-mgmthre.deck.json as the reference spec and ` +
        `scripts/build-evidura-deck.py for the layout contract. Layouts available: title, statement, ` +
        `bullets, two-col, scores, findings, table, questions, closing.\n` +
        `The deck follows the guide's run of show — framing, what Evidura is, the method, the four ` +
        `rules, provenance, the scorecard, the findings, the four questions, what happens next.\n\n` +
        `(2) The spec carries WORDS AND NUMBERS ONLY. No colours, no fonts, no positions — the builder ` +
        `owns all of that and reads the palette from brand/evidura/tokens.css. Never put a hex value in ` +
        `a spec.\n\n` +
        `(3) Deck copy is shorter than guide copy. The guide is read; the deck is glanced at while ` +
        `someone talks over it. Findings text ~140 characters, question prompts ~60.\n\n` +
        `(4) Build it:\n` +
        `    python3 scripts/build-evidura-deck.py docs/decks/evidura-socialisation-${code}.deck.json \\\n` +
        `      -o docs/decks/evidura-socialisation-${code}.pptx\n` +
        `A non-zero exit means text overflowed a box. The fix is ALWAYS to trim the copy in the spec ` +
        `or to set "widths" on a table — never to edit the builder. Re-run until it exits 0.\n\n` +
        `(5) Visually check it, because a clean exit only proves the estimate fit:\n` +
        `    /Applications/LibreOffice.app/Contents/MacOS/soffice --headless --convert-to pdf \\\n` +
        `      --outdir <scratch> docs/decks/evidura-socialisation-${code}.pptx\n` +
        `    pdftoppm -png -r 70 <scratch>/evidura-socialisation-${code}.pdf <scratch>/s\n` +
        `Read every slide image. Look for text crossing a card edge, colliding with the footer, or a ` +
        `table running past the slide. Fix the spec and rebuild until every slide is clean.\n\n` +
        `Brief: ${JSON.stringify(r.brief)}\n\n` +
        `Return {code, deckPath, specPath, slides, exitZero, slidesInspected}.`,
      {
        label: `deck:${code}`,
        phase: 'Deck',
        schema: {
          type: 'object',
          required: ['code', 'deckPath', 'specPath', 'slides', 'exitZero'],
          properties: {
            code: { type: 'string' },
            deckPath: { type: 'string' },
            specPath: { type: 'string' },
            slides: { type: 'integer' },
            exitZero: { type: 'boolean' },
            slidesInspected: { type: 'integer' },
          },
        },
      },
    ).then((d) => ({ ...r, deck: d })),

  // 5 LINK — the report points at its own socialisation pack, in the repo only.
  //
  // The link is an HTML comment on purpose. reports/*.md is the source of the
  // PUBLISHED page, and the guide is the facilitator's crib sheet — it carries
  // the objections the room will raise and how to answer them, which is exactly
  // what must not appear on the program's own public report. dfva:gen-content
  // strips HTML comments (stripHtmlComments), so the comment reaches everyone
  // who opens the report file and nobody who opens the web page.
  //
  // The markdown edit is per-program and safe to run concurrently; regeneration
  // is NOT, so it runs once after the fan-out rather than here.
  (r, code) =>
    agent(
      `Link the socialisation pack to the report for ${code}.\n\n` +
        `In reports/dfva-v4-${code}.md, immediately after the header block (after the Program ` +
        `Director line, or the Source URL line if there is none), add exactly:\n\n` +
        `<!-- Socialisation pack (internal — stripped from the published page by dfva:gen-content):\n` +
        `     guide: docs/evidura-facilitation-guide-${code}.md\n` +
        `     deck:  docs/decks/evidura-socialisation-${code}.pptx (spec: .deck.json alongside)\n` +
        `     harness: docs/dfva-v4-socialisation-harness.md -->\n\n` +
        `It must be an HTML comment. A visible link would publish the facilitator's guide — including ` +
        `the objection-handling section — on the program's own public report page.\n\n` +
        `Then confirm the reverse links exist: the guide's header links to the report, the market ` +
        `report and the improvement plan, and the harness doc's pack table has a row for ${code}.\n\n` +
        `Do NOT run dfva:gen-content here — it regenerates every report and would race the other ` +
        `programs in this run. Just make the edit.\n\n` +
        `Return {code, linked}.`,
      {
        label: `link:${code}`,
        phase: 'Link',
        schema: {
          type: 'object',
          required: ['code', 'linked'],
          properties: { code: { type: 'string' }, linked: { type: 'boolean' } },
        },
      },
    ).then((l) => ({ ...r, link: l })),
)

const packs = results.filter(Boolean)

// One regeneration for the whole run — reportContent*.ts is a single generated
// surface, so N concurrent regens would interleave and the last writer would win.
if (packs.length) {
  await agent(
    `The socialisation packs for ${packs.map((p) => p.brief.code).join(', ')} added a header line to ` +
      `their reports. Regenerate the derived content and verify:\n` +
      `  npm --prefix scripts run dfva:gen-content\n` +
      `  npm --prefix scripts run dfva:report-lint\n` +
      `  npm --prefix scripts run dfva:check\n` +
      `Fix anything that fails. Never hand-edit compass/app/src/compass/reportContent*.ts — if the ` +
      `generated output is wrong, the report markdown is wrong. Return a one-line status per command.`,
    { label: 'regenerate', phase: 'Link' },
  )
}

return {
  packs: packs.map((p) => ({
    code: p.brief.code,
    guide: p.guide.guidePath,
    deck: p.deck.deckPath,
    slides: p.deck.slides,
    verified: p.verify.clean,
    unsupportedClaims: p.verify.unsupported.length,
    linked: p.link.linked,
  })),
}
