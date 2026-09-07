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
    "code": "mc-commktg",
    "name": "Master of Commerce (Marketing)",
    "hasMarketReport": true,
    "exposure": 96.45,
    "entryExposure": 97.6,
    "jirN": 66,
    "nTitles": 15,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Management (Marketing)",
          "n": 66
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Discipline-matched marketing master."
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Management (Marketing)",
        "n": 66
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Discipline-matched marketing master."
  }
};

export default record;
