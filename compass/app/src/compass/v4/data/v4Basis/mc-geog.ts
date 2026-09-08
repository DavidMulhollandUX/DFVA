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
    "code": "mc-geog",
    "name": "Master of Geography",
    "hasMarketReport": true,
    "exposure": 91.75,
    "entryExposure": 92.61,
    "jirN": 108,
    "nTitles": 13,
    "nMedium": 8,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Bachelor of Arts (Geography)",
          "n": 108
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Discipline-matched major record."
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Bachelor of Arts (Geography)",
        "n": 108
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Discipline-matched major record."
  }
};

export default record;
