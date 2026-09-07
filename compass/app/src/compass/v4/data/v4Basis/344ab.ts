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
    "code": "344ab",
    "name": "Master of Public Policy and Management",
    "hasMarketReport": true,
    "exposure": 95.04,
    "entryExposure": 92.34,
    "jirN": 165,
    "nTitles": 15,
    "nMedium": 13,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Public Policy and Management",
          "n": 165
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
        "name": "Master of Public Policy and Management",
        "n": 165
      }
    ],
    "indexVariant": "AIOE-2021"
  }
};

export default record;
