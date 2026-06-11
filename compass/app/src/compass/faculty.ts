// Shared faculty grouping for the Insights pages. Heuristic mapping from
// program name → faculty bucket; the slug must stay in sync with the
// /insights/faculty/:facultySlug route in main.wasp.

export function getFaculty(program: string): string {
  const n = program.toLowerCase();
  if (/engineering|structures|industrial eng/i.test(n)) return 'Engineering';
  if (/computer|data sci|information tech|software|analytics|business analy/i.test(n)) return 'IT & Analytics';
  if (/psycholog|nursing|dentist|health|medicine|physio|surg|genetic|social work|optom|pharm|vet|audiology|speech|food sci/i.test(n)) return 'Health';
  if (/business|mba|marketing|finance|econom|management|enterprise|entrepreneur|supply/i.test(n)) return 'Business';
  if (/urban|architect|design|property|landscap|construct|horticult/i.test(n)) return 'Built Environment';
  if (/law|legal|tax/i.test(n)) return 'Law';
  if (/educat|teach|tesol|ib\b/i.test(n)) return 'Education';
  if (/art|music|film|screen|journal|curat|creative|writing/i.test(n)) return 'Creative Arts';
  if (/scien|physics|chemistry|biology|math|environ|climat|food|agric|forest|animal/i.test(n)) return 'Science & Environment';
  return 'Other';
}

export function facultySlug(name: string): string {
  return encodeURIComponent(name.toLowerCase().replace(/[ &]/g, '-'));
}
