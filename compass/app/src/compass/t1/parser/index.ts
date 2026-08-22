// T1 Parser Dispatcher — feat-011
//
// Routes to the correct parser based on T1FileType.

import type { T1FileType, T1ParseResult } from "../types";
import { parseT1xl } from "./t1xl";
import { parseT1etlp } from "./t1etlp";

/**
 * Parse a T1 export file using the appropriate format-specific parser.
 *
 * @param buffer  Raw file bytes
 * @param fileType  Detected T1 format
 * @param filename  Original filename (for warnings / fallback naming)
 */
export function parseT1File(
  buffer: Uint8Array,
  fileType: T1FileType,
  filename: string,
): T1ParseResult {
  switch (fileType) {
    case "T1XL":
      return parseT1xl(buffer.buffer as ArrayBuffer, filename);

    case "T1ETLP":
      return parseT1etlp(
        new TextDecoder("utf-8", { fatal: false }).decode(buffer),
        filename,
      );

    case "T1DM":
      throw new Error(
        `T1 Data Model (.t1dm) parser not yet implemented. ` +
          `This format will be supported in a future release.`,
      );

    case "T1DB":
      throw new Error(
        `T1 Database Snapshot (.t1db) parser not yet implemented. ` +
          `This format will be supported in a future release.`,
      );

    default:
      throw new Error(`Unsupported T1 file type: ${fileType}`);
  }
}
