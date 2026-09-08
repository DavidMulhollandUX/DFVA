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
    "code": "mc-mled",
    "name": "Master of Modern Languages Education",
    "hasMarketReport": true,
    "exposure": 93.99,
    "entryExposure": 95.74,
    "jirN": 26,
    "nTitles": 15,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of TESOL",
          "n": 26
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Languages-education master; TESOL is the nearest language-teaching record."
    }
  },
  "panelABasis": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of TESOL",
        "n": 26
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Languages-education master; TESOL is the nearest language-teaching record."
  }
};

export default record;
