// Shared faculty grouping for the Insights pages and the Reports filter.
// Heuristic mapping from program name → the program's actual owning faculty,
// using the official University of Melbourne faculty names (verified against the
// UoM Handbook + faculty sites, 2026-06):
//   - Faculty of Architecture, Building and Planning
//   - Faculty of Arts
//   - Faculty of Business and Economics
//   - Faculty of Education
//   - Faculty of Engineering and Information Technology  (Engineering + IT/CS/IS)
//   - Faculty of Fine Arts and Music
//   - Faculty of Medicine, Dentistry and Health Sciences
//   - Faculty of Science
//   - Melbourne Law School
//
// PRECEDENCE MATTERS: discipline-named programs are claimed by their real owning
// faculty BEFORE the generic Science catch-all, because many programs carry
// "Science" in their title yet belong elsewhere at UoM:
//   - Biomedical Science, Epidemiology → Medicine, Dentistry and Health Sciences
//   - Actuarial Science, Business Analytics → Business and Economics
//   - Computer Science → Engineering and Information Technology
//   - Data Science → Science-owned (Melbourne Centre for Data Science), so it is
//     NOT caught by the IT rule and falls through to the Science rule.
//   - Urban Horticulture → Science (SAFES, Burnley), claimed before the
//     Architecture/Built-environment "urban" rule.

const ENGINEERING_IT = "Faculty of Engineering and Information Technology";
const HEALTH = "Faculty of Medicine, Dentistry and Health Sciences";
const BUSINESS = "Faculty of Business and Economics";
const SCIENCE = "Faculty of Science";
const BUILT_ENV = "Faculty of Architecture, Building and Planning";
const LAW = "Melbourne Law School";
const EDUCATION = "Faculty of Education";
const FINE_ARTS = "Faculty of Fine Arts and Music";
const ARTS = "Faculty of Arts";

export function getFaculty(program: string): string {
  const n = program.toLowerCase();
  if (/engineering|structures|industrial eng/i.test(n)) return ENGINEERING_IT;
  // Computer Science (FEIT) stays here; Data Science is Science-owned, so it is
  // deliberately NOT matched here and is left to the Science rule below.
  if (/computer|information tech|information sys|software/i.test(n)) return ENGINEERING_IT;
  if (/psycholog|nursing|dentist|health|medicine|biomed|epidemio|physio|surg|genetic|social work|optom|pharm|vet|audiology|speech/i.test(n)) return HEALTH;
  if (/business|mba|marketing|finance|econom|management|enterprise|entrepreneur|supply|actuar|analytic/i.test(n)) return BUSINESS;
  // Horticulture / agriculture / forestry are Science (SAFES), claimed before the
  // built-environment "urban" rule so "Urban Horticulture" lands in Science.
  if (/horticult|agric|forest/i.test(n)) return SCIENCE;
  if (/urban|architect|design|property|landscap|construct/i.test(n)) return BUILT_ENV;
  if (/law|legal|tax/i.test(n)) return LAW;
  if (/educat|teach|tesol|ib\b/i.test(n)) return EDUCATION;
  // Fine Arts and Music runs before Arts so "Screenwriting" (→ screen) is not
  // caught by the Arts "writing" rule.
  if (/music|film|screen|fine art|visual art|performance|theatre|dance|curat|conservatorium/i.test(n)) return FINE_ARTS;
  // \barts?\b avoids matching "eARTh Sciences"; still catches "Arts"/"Art …".
  if (/\barts?\b|journal|writing|languages|linguistic|philosoph|histor|politic|anthropolog|criminolog|sociolog/i.test(n)) return ARTS;
  if (/scien|physics|chemistry|biology|biotech|math|environ|climat|food|animal/i.test(n)) return SCIENCE;
  return "Other";
}

export function facultySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
