// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
import type { V4PanelABasis, V4OnlyProgram } from "../v4Meta";

export interface V4BasisRecord {
  onlyProgram: V4OnlyProgram | null;
  panelABasis: V4PanelABasis | null;
}

const record: V4BasisRecord = {
  "onlyProgram": {
    "code": "527cn",
    "name": "Master of Psychology (Clinical Neuropsychology)",
    "hasMarketReport": true,
    "exposure": 95.57,
    "entryExposure": 93.63,
    "jirN": 47,
    "nTitles": 15,
    "nMedium": 13,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Applied Psychology",
          "n": 47
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Professional psychology stream; same program-family record the reconciliation package used for 527cl."
    }
  },
  "panelABasis": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Applied Psychology",
        "n": 47
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Professional psychology stream; same program-family record the reconciliation package used for 527cl."
  }
};

export default record;
