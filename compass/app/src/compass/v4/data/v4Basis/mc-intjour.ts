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
    "code": "mc-intjour",
    "name": "Master of International Journalism",
    "hasMarketReport": true,
    "exposure": 91.48,
    "entryExposure": 92.18,
    "jirN": 51,
    "nTitles": 15,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Journalism",
          "n": 51
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Discipline-matched record."
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Journalism",
        "n": 51
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Discipline-matched record."
  }
};

export default record;
