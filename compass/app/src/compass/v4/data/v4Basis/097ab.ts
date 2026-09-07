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
    "code": "097ab",
    "name": "Master of Development Studies",
    "hasMarketReport": true,
    "exposure": 92.5,
    "entryExposure": 92.94,
    "jirN": 104,
    "nTitles": 14,
    "nMedium": 13,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Development Studies",
          "n": 104
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
        "name": "Master of Development Studies",
        "n": 104
      }
    ],
    "indexVariant": "AIOE-2021"
  }
};

export default record;
