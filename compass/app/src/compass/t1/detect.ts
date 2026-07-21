// T1 file-type detection — feat-011
//
// Identifies T1 export formats from file content (magic bytes)
// with extension-based fallback.

import type { T1FileType } from "./types";

/** T1 .t1xl files are Office Open XML (ZIP-based). Magic bytes: PK\x03\x04 */
const ZIP_MAGIC = new Uint8Array([0x50, 0x4b, 0x03, 0x04]);

/** T1 .t1etlp ELP header markers (text-based, UTF-8/ASCII) */
const ETlP_MARKERS = [
  "ELP",           // Enrolment & Load Planning header
  "Enrolment",     // Full header variant
  "Load Planning", // Alternative header
];

/** T1 .t1dm XML-based data model exports */
const T1DM_MARKER = "T1DataModel";

/** T1 .t1db database snapshot exports */
const T1DB_MARKER = "T1DatabaseSnapshot";

function hasMagicBytes(buffer: Uint8Array, magic: Uint8Array): boolean {
  if (buffer.length < magic.length) return false;
  for (let i = 0; i < magic.length; i++) {
    if (buffer[i] !== magic[i]) return false;
  }
  return true;
}

function getExtension(filename: string): string {
  const dotIdx = filename.lastIndexOf(".");
  if (dotIdx === -1) return "";
  return filename.substring(dotIdx).toLowerCase();
}

/**
 * Detect T1 file type from file content (first 1024 bytes) + filename.
 * Content-based detection is preferred; extension is fallback.
 */
export function detectT1FileType(
  buffer: Uint8Array,
  filename: string
): T1FileType {
  // Content-based detection
  if (buffer.length >= 4 && hasMagicBytes(buffer, ZIP_MAGIC)) {
    // ZIP-based = .t1xl Excel/Office Open XML format
    return "T1XL" as T1FileType;
  }

  const head = new TextDecoder("utf-8", { fatal: false }).decode(
    buffer.slice(0, 1024)
  );

  if (T1DM_MARKER && head.includes(T1DM_MARKER)) {
    return "T1DM" as T1FileType;
  }
  if (T1DB_MARKER && head.includes(T1DB_MARKER)) {
    return "T1DB" as T1FileType;
  }
  if (ETlP_MARKERS.some((m) => head.includes(m))) {
    return "T1ETLP" as T1FileType;
  }

  // Extension-based fallback
  const ext = getExtension(filename);
  switch (ext) {
    case ".t1xl":
      return "T1XL" as T1FileType;
    case ".t1etlp":
      return "T1ETLP" as T1FileType;
    case ".t1dm":
      return "T1DM" as T1FileType;
    case ".t1db":
      return "T1DB" as T1FileType;
    case ".xlsx":
    case ".xls":
      return "T1XL" as T1FileType; // Likely a .t1xl renamed to .xlsx
    case ".csv":
      return "T1ETLP" as T1FileType; // CSV-based ELP variant
    default:
      break;
  }

  throw new Error(
    `Unknown T1 format: file "${filename}" does not match any known T1 export format. ` +
      `Supported formats: .t1xl, .t1etlp, .t1dm, .t1db`
  );
}
