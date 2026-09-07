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
    "code": "872bb",
    "name": "Master of Veterinary Science",
    "hasMarketReport": true,
    "exposure": 62.4,
    "entryExposure": 63.57,
    "jirN": 275,
    "nTitles": 12,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Doctor of Veterinary Medicine",
          "n": 275
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Veterinary graduate program; DVM is the discipline-matched record."
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Doctor of Veterinary Medicine",
        "n": 275
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Veterinary graduate program; DVM is the discipline-matched record."
  }
};

export default record;
