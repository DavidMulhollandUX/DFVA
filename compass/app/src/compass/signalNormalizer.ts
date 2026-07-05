// feat-005: Signal normalization — maps external source categories to DFVA's 11 broad fields

/**
 * Maps SEEK API categories to DFVA fields.
 * SEEK uses its own taxonomy. This mapping is manually curated.
 */
export const SEEK_CATEGORY_MAP: Record<string, string> = {
  "Information & Communication Technology": "IT",
  Engineering: "Engineering",
  "Healthcare & Medical": "Health",
  Accounting: "Business",
  "Banking & Financial Services": "Business",
  "Consulting & Strategy": "Business",
  "Marketing & Communications": "Business",
  Construction: "Architecture",
  "Design & Architecture": "Architecture",
  "Advertising, Arts & Media": "Creative Arts",
  "Education & Training": "Education",
  Legal: "Law",
  "Science & Technology": "Science",
  "Farming, Animals & Conservation": "Agriculture",
};

/**
 * Maps Adzuna API categories to DFVA fields.
 * Adzuna uses simpler category strings.
 */
export const ADZUNA_CATEGORY_MAP: Record<string, string> = {
  "IT Jobs": "IT",
  "Engineering Jobs": "Engineering",
  "Healthcare & Nursing Jobs": "Health",
  "Accounting & Finance Jobs": "Business",
  "Consultancy Jobs": "Business",
  "PR, Advertising & Marketing Jobs": "Business",
  "Trade & Construction Jobs": "Architecture",
  "Creative & Design Jobs": "Creative Arts",
  "Teaching Jobs": "Education",
  "Legal Jobs": "Law",
  "Scientific & QA Jobs": "Science",
  "Farming Jobs": "Agriculture",
};

/**
 * Maps JSA Internet Vacancy Index ANZSCO major occupation groups to DFVA fields.
 */
export const JSA_IVI_MAP: Record<string, string> = {
  Managers: "Business",
  Professionals: "Business",
  "Technicians and Trades Workers": "Engineering",
  "Community and Personal Service Workers": "Health",
  "Clerical and Administrative Workers": "Business",
  "Sales Workers": "Business",
  "Machinery Operators and Drivers": "Engineering",
  Labourers: "Other",
};

/**
 * Map a SEEK category string to a DFVA field.
 * Case-insensitive. Returns "Other" for unknown categories.
 */
export function normalizeSeekCategory(
  seekCategory: string | null | undefined,
): string {
  if (!seekCategory) return "Other";
  const normalized = seekCategory.trim();
  // Case-insensitive lookup
  for (const [key, value] of Object.entries(SEEK_CATEGORY_MAP)) {
    if (key.toLowerCase() === normalized.toLowerCase()) return value;
  }
  return "Other";
}

/**
 * Map an Adzuna category string to a DFVA field.
 * Case-insensitive. Returns "Other" for unknown categories.
 */
export function normalizeAdzunaCategory(
  adzunaCategory: string | null | undefined,
): string {
  if (!adzunaCategory) return "Other";
  const normalized = adzunaCategory.trim();
  for (const [key, value] of Object.entries(ADZUNA_CATEGORY_MAP)) {
    if (key.toLowerCase() === normalized.toLowerCase()) return value;
  }
  return "Other";
}

/**
 * Map a JSA Internet Vacancy Index ANZSCO major occupation group to a DFVA field.
 */
export function mapJsaIviToField(
  iviOccupationGroup: string | null | undefined,
): string {
  if (!iviOccupationGroup) return "Other";
  const normalized = iviOccupationGroup.trim();
  return JSA_IVI_MAP[normalized] ?? "Other";
}
