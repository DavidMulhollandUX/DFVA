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
    "code": "mc-upud",
    "name": "Master of Urban Planning/Master of Urban Design",
    "hasMarketReport": true,
    "exposure": 92.85,
    "entryExposure": 92.85,
    "jirN": 130,
    "nTitles": 15,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Urban Planning",
          "n": 130
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Urban design component takes Master of Urban Planning as mc-urbdes does."
    }
  },
  "panelABasis": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Urban Planning",
        "n": 130
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Urban design component takes Master of Urban Planning as mc-urbdes does."
  }
};

export default record;
