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
    "code": "b-mus",
    "name": "Bachelor of Music",
    "hasMarketReport": true,
    "exposure": 80.63,
    "entryExposure": 80.91,
    "jirN": 87,
    "nTitles": 15,
    "nMedium": 9,
    "exposureBasis": {
      "tier": "pooled",
      "grain": "program-family",
      "sources": [
        {
          "name": "Bachelor of Music (Performance)",
          "n": 87
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "union of 1 \"Bachelor of Music (…)\" records"
    }
  },
  "panelABasis": {
    "tier": "pooled",
    "grain": "program-family",
    "sources": [
      {
        "name": "Bachelor of Music (Performance)",
        "n": 87
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "union of 1 \"Bachelor of Music (…)\" records"
  }
};

export default record;
