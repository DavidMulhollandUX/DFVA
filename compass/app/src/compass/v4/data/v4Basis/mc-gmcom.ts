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
    "code": "mc-gmcom",
    "name": "Master of Global Media Communication",
    "hasMarketReport": true,
    "exposure": 94.8,
    "entryExposure": 94.7,
    "jirN": 67,
    "nTitles": 15,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Global Media Communication",
          "n": 67
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
        "name": "Master of Global Media Communication",
        "n": 67
      }
    ],
    "indexVariant": "AIOE-2021"
  }
};

export default record;
