// Faculty grouping for the Insights pages — the 9 OFFICIAL University of Melbourne
// faculties. The 41 DFVA programs are assigned explicitly (consistent with the
// graduate-outcome briefings in facultyOutcomes.ts and the portfolio report's
// faculty roster); the regex fallback only handles names not in the explicit map.
//
// Note: a few programs carry a discipline name that differs from their owning
// faculty at UoM — e.g. Information Systems & Business Analytics are Business &
// Economics (not "IT"); Data Science, Actuarial Science, Urban Horticulture &
// Biotechnology are Faculty of Science. These are pinned in PROGRAM_FACULTY.
//
// The slug must stay in sync with the /insights/faculty/:facultySlug route.

const PROGRAM_FACULTY: Record<string, string> = {
  // Architecture, Building & Planning
  'Bachelor of Design': 'Architecture, Building & Planning',
  'Master of Architecture': 'Architecture, Building & Planning',
  'Master of Property': 'Architecture, Building & Planning',
  'Master of Urban Design': 'Architecture, Building & Planning',
  // Arts
  'Master of Journalism': 'Arts',
  'Master of Screenwriting': 'Arts',
  // Business & Economics
  'Master of Advanced Social Enterprise': 'Business & Economics',
  'Master of Applied Business Analytics': 'Business & Economics',
  'Master of Business Administration': 'Business & Economics',
  'Master of Business Administration (Marketing)': 'Business & Economics',
  'Master of Business Analytics': 'Business & Economics',
  'Master of Information Systems': 'Business & Economics',
  // Education
  'Master of Education': 'Education',
  'Master of International Education (IB)': 'Education',
  'Master of TESOL': 'Education',
  // Engineering & IT
  'Master of Computer Science': 'Engineering & IT',
  'Master of Engineering Structures': 'Engineering & IT',
  'Master of Industrial Engineering': 'Engineering & IT',
  // Law
  'Master of Environmental Law': 'Law',
  // Medicine, Dentistry & Health
  'Master of Biomedical Science': 'Medicine, Dentistry & Health',
  'Master of Clinical Dentistry': 'Medicine, Dentistry & Health',
  'Master of Clinical Psychology': 'Medicine, Dentistry & Health',
  'Master of Genetic Counselling': 'Medicine, Dentistry & Health',
  'Master of Nursing Science': 'Medicine, Dentistry & Health',
  'Master of Physiotherapy (Pelvic Health)': 'Medicine, Dentistry & Health',
  'Master of Professional Psychology': 'Medicine, Dentistry & Health',
  'Master of Surgical Education': 'Medicine, Dentistry & Health',
  // Science
  'Bachelor of Science': 'Science',
  'Master of Actuarial Science': 'Science',
  'Master of Biotechnology': 'Science',
  'Master of Climate Science': 'Science',
  'Master of Data Science': 'Science',
  'Master of Environmental Science': 'Science',
  'Master of Food Science': 'Science',
  'Master of Science (BioSciences)': 'Science',
  'Master of Science (Bioinformatics)': 'Science',
  'Master of Science (Chemistry)': 'Science',
  'Master of Science (Earth Sciences)': 'Science',
  'Master of Science (Epidemiology)': 'Science',
  'Master of Science (Physics)': 'Science',
  'Master of Urban Horticulture': 'Science',
};

export function getFaculty(program: string): string {
  const explicit = PROGRAM_FACULTY[program];
  if (explicit) return explicit;
  // Fallback for names not in the explicit map.
  const n = program.toLowerCase();
  if (/psycholog|nursing|dentist|medicine|biomed|epidemio|physio|surg|genetic|social work|optom|pharm|\bvet|audiology|speech|\bhealth|clinical/.test(n)) return 'Medicine, Dentistry & Health';
  if (/business|\bmba\b|marketing|finance|econom|management|enterprise|actuar|analytics|information sys/.test(n)) return 'Business & Economics';
  if (/engineering|computer|software|mechatron|structures|industrial/.test(n)) return 'Engineering & IT';
  if (/urban design|architect|\bdesign\b|property|landscap|construct/.test(n)) return 'Architecture, Building & Planning';
  if (/\blaw\b|legal|juris|\btax\b/.test(n)) return 'Law';
  if (/educat|teach|tesol|instructional/.test(n)) return 'Education';
  if (/\bmusic\b|fine art/.test(n)) return 'Fine Arts & Music';
  if (/journal|screen|\barts?\b|curat|creative|writing|\bfilm/.test(n)) return 'Arts';
  if (/scien|physic|chemistry|biolog|biotech|math|environ|climat|food|agric|horticult|ecolog|geolog/.test(n)) return 'Science';
  return 'Other';
}

// Clean, stable slug — handles the commas & ampersands in official faculty names.
// e.g. "Medicine, Dentistry & Health" -> "medicine-dentistry-and-health".
export function facultySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
