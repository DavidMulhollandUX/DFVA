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
    "code": "mc-scimat",
    "name": "Master of Science (Mathematics and Statistics)",
    "hasMarketReport": true,
    "exposure": 95.71,
    "entryExposure": 95.18,
    "jirN": 122,
    "nTitles": 15,
    "nMedium": 12,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Bachelor of Science (Mathematics and Statistics)",
          "n": 122
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
        "name": "Bachelor of Science (Mathematics and Statistics)",
        "n": 122
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Discipline-matched major record."
  }
};

export default record;
