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
    "code": "761em",
    "name": "Master of Engineering Management",
    "hasMarketReport": true,
    "exposure": 91.05,
    "entryExposure": 89.03,
    "jirN": 89,
    "nTitles": 15,
    "nMedium": 10,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Engineering Management",
          "n": 89
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
        "name": "Master of Engineering Management",
        "n": 89
      }
    ],
    "indexVariant": "AIOE-2021"
  }
};

export default record;
