/**
 * Score -> colour. Single source shared by DimensionSteps, the dimension popover,
 * and ReportMarkdown so the three never drift apart.
 */
export function stepColor(score: number): string {
  if (score === 3) return '#16a34a'
  if (score === 2) return '#d97706'
  if (score === 1) return '#ea580c'
  return '#e5e7eb'
}

export const DOT_COLOR: Record<number, string> = {
  3: '#16a34a', 2: '#d97706', 1: '#ea580c', 0: '#e5e7eb',
}
