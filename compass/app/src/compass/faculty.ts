// Shared faculty grouping for the Insights pages. Heuristic mapping from
// program name → faculty bucket; the slug must stay in sync with the
// /insights/faculty/:facultySlug route in main.wasp.
//
// PRECEDENCE MATTERS: discipline-named programs are claimed by their real
// owning faculty BEFORE the generic "Science & Environment" catch-all, because
// many programs carry "Science" in their title yet belong elsewhere at UoM
// (verified against the UoM Handbook + faculty sites, 2026-06):
//   - Biomedical Science, Epidemiology → MDHS (Health)
//   - Actuarial Science → Business & Economics
//   - Computer Science → Engineering & IT (kept as "IT & Analytics")
//   - Data Science → Science-owned (Melbourne Centre for Data Science), so it
//     is NOT caught by the IT rule and falls through to Science & Environment.
// The Faculty of Science roster this produces (11): B-Sci, MSc Physics /
// Chemistry / BioSciences / Earth Sciences / Bioinformatics, Biotechnology,
// Climate Science, Environmental Science, Food Science (now SAFES), Data Science.

export function getFaculty(program: string): string {
  const n = program.toLowerCase();
  if (/engineering|structures|industrial eng/i.test(n)) return 'Engineering';
  // Computer Science (FEIT) stays here; Data Science is Science-owned, so it is
  // deliberately NOT matched here and is left to the Science rule below.
  if (/computer|information tech|information sys|software|analytics|business analy/i.test(n)) return 'IT & Analytics';
  if (/psycholog|nursing|dentist|health|medicine|biomed|epidemio|physio|surg|genetic|social work|optom|pharm|vet|audiology|speech/i.test(n)) return 'Health';
  if (/business|mba|marketing|finance|econom|management|enterprise|entrepreneur|supply|actuar/i.test(n)) return 'Business';
  if (/urban|architect|design|property|landscap|construct|horticult/i.test(n)) return 'Built Environment';
  if (/law|legal|tax/i.test(n)) return 'Law';
  if (/educat|teach|tesol|ib\b/i.test(n)) return 'Education';
  // \barts?\b avoids matching "eARTh Sciences"; still catches "Arts"/"Art …".
  if (/\barts?\b|music|film|screen|journal|curat|creative|writing/i.test(n)) return 'Creative Arts';
  if (/scien|physics|chemistry|biology|biotech|math|environ|climat|food|agric|forest|animal/i.test(n)) return 'Science & Environment';
  return 'Other';
}

export function facultySlug(name: string): string {
  return encodeURIComponent(name.toLowerCase().replace(/[ &]/g, '-'));
}
