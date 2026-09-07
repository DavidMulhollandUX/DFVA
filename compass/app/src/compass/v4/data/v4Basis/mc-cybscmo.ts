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
    "code": "mc-cybscmo",
    "name": "Master of Cyber Security",
    "hasMarketReport": true,
    "exposure": 92.91,
    "entryExposure": 93.46,
    "jirN": 373,
    "nTitles": 15,
    "nMedium": 10,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Information Technology",
          "n": 373
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Cyber security is an IT specialisation."
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Information Technology",
        "n": 373
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Cyber security is an IT specialisation."
  }
};

export default record;
