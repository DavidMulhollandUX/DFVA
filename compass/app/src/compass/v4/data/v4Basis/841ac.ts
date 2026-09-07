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
    "code": "841ac",
    "name": "Bachelor of Oral Health",
    "hasMarketReport": true,
    "exposure": 64.6,
    "entryExposure": 60.88,
    "jirN": 61,
    "nTitles": 12,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Bachelor of Oral Health",
          "n": 61
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
        "name": "Bachelor of Oral Health",
        "n": 61
      }
    ],
    "indexVariant": "AIOE-2021"
  }
};

export default record;
