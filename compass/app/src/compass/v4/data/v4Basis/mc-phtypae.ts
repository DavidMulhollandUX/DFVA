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
    "code": "mc-phtypae",
    "name": "Master of Physiotherapy (Paediatrics)",
    "hasMarketReport": true,
    "exposure": 71.03,
    "entryExposure": 72.66,
    "jirN": 448,
    "nTitles": 11,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Doctor of Physiotherapy",
          "n": 448
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "As mc-phtyph."
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Doctor of Physiotherapy",
        "n": 448
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "As mc-phtyph."
  }
};

export default record;
