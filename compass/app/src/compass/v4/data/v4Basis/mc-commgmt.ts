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
    "code": "mc-commgmt",
    "name": "Master of Commerce (Management)",
    "hasMarketReport": true,
    "exposure": 90.73,
    "entryExposure": 89.56,
    "jirN": 655,
    "nTitles": 13,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Management",
          "n": 655
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Discipline-matched management master."
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Management",
        "n": 655
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Discipline-matched management master."
  }
};

export default record;
