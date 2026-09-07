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
    "code": "adelaide-mph_mpubhlt",
    "name": "Master of Public Health",
    "hasMarketReport": false,
    "exposure": 89.46,
    "entryExposure": 84.77,
    "jirN": 562,
    "nTitles": 15,
    "nMedium": 8,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Public Health",
          "n": 562
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
        "name": "Master of Public Health",
        "n": 562
      }
    ],
    "indexVariant": "AIOE-2021"
  }
};

export default record;
