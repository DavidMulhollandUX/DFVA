/**
 * A report key becomes a module filename under
 * `compass/app/src/compass/reportContent/<key>.ts`, so it may carry only
 * characters that are safe in a path segment and in an import specifier.
 *
 * Underscores are in the set because several Go8 manifest codes carry them —
 * Adelaide names a single degree and its double-degree siblings in one code
 * (`adelaide-bcom_bcombcomacctbcomacctosbcomcorfin`). A dot is allowed for the
 * same reason and is why `..` is refused explicitly rather than by the class.
 */
export function isReportKeySafe(key: string): boolean {
  if (key.includes('..')) return false
  return /^dfva-[a-z0-9._-]+$/.test(key)
}
