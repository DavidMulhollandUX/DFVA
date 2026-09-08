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
    "code": "mc-li",
    "name": "Master of Learning Intervention",
    "hasMarketReport": true,
    "exposure": 85.7,
    "entryExposure": 84.78,
    "jirN": 45,
    "nTitles": 15,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Learning Intervention",
          "n": 45
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
        "name": "Master of Learning Intervention",
        "n": 45
      }
    ],
    "indexVariant": "AIOE-2021"
  }
};

export default record;
