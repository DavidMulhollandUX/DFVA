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
    "code": "mc-spchpth",
    "name": "Master of Speech Pathology",
    "hasMarketReport": true,
    "exposure": 89.56,
    "entryExposure": 91.37,
    "jirN": 98,
    "nTitles": 14,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Speech Pathology",
          "n": 98
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "panelABasis": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Speech Pathology",
        "n": 98
      }
    ],
    "indexVariant": "AIOE-2021"
  }
};

export default record;
