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
    "code": "mc-aimo",
    "name": "Master of Artificial Intelligence",
    "hasMarketReport": true,
    "exposure": 92.8,
    "entryExposure": 93.33,
    "jirN": 41,
    "nTitles": 15,
    "nMedium": 11,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Computer Science",
          "n": 41
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "AI is a computer-science specialisation."
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Computer Science",
        "n": 41
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "AI is a computer-science specialisation."
  }
};

export default record;
