/**
 * One date format for the product: Australian English, no bare
 * `toLocaleDateString()` calls that follow the visitor's locale.
 */
export type DateStyle = "long" | "medium" | "dayMonth" | "monthYear";

const OPTIONS: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  long: { year: "numeric", month: "long", day: "numeric" },
  medium: { year: "numeric", month: "short", day: "numeric" },
  dayMonth: { day: "numeric", month: "short" },
  monthYear: { month: "short", year: "numeric" },
};

/** Format an ISO string or Date in en-AU; returns the input string when it does not parse. */
export function formatDate(
  value: string | number | Date,
  style: DateStyle = "medium",
): string {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-AU", OPTIONS[style]);
}
