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
    "code": "mc-dinfeng",
    "name": "Master of Digital Infrastructure Engineering",
    "hasMarketReport": true,
    "exposure": 91.09,
    "entryExposure": 91.98,
    "jirN": 48,
    "nTitles": 15,
    "nMedium": 4,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Civil Engineering",
          "n": 48
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Civil/environmental engineering discipline."
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Civil Engineering",
        "n": 48
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Civil/environmental engineering discipline."
  }
};

export default record;
