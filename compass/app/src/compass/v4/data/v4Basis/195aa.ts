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
    "code": "195aa",
    "name": "Master of Construction Law",
    "hasMarketReport": true,
    "exposure": 95.64,
    "entryExposure": 94.68,
    "jirN": 88,
    "nTitles": 15,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Construction Law",
          "n": 88
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
        "name": "Master of Construction Law",
        "n": 88
      }
    ],
    "indexVariant": "AIOE-2021"
  }
};

export default record;
