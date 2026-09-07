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
    "code": "706aa",
    "name": "Master of Social Policy",
    "hasMarketReport": true,
    "exposure": 96.05,
    "entryExposure": 95.96,
    "jirN": 66,
    "nTitles": 13,
    "nMedium": 13,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Social Policy",
          "n": 66
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
        "name": "Master of Social Policy",
        "n": 66
      }
    ],
    "indexVariant": "AIOE-2021"
  }
};

export default record;
