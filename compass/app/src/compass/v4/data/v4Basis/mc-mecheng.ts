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
    "code": "mc-mecheng",
    "name": "Master of Mechanical Engineering",
    "hasMarketReport": true,
    "exposure": 85.55,
    "entryExposure": 85.82,
    "jirN": 24,
    "nTitles": 13,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Mechanical Engineering",
          "n": 24
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
        "name": "Master of Mechanical Engineering",
        "n": 24
      }
    ],
    "indexVariant": "AIOE-2021"
  }
};

export default record;
