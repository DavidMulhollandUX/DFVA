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
    "code": "mc-climsci",
    "name": "Master of Climate Science",
    "hasMarketReport": true,
    "exposure": 83.13,
    "entryExposure": 75.79,
    "jirN": 32,
    "nTitles": 15,
    "nMedium": 9,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Environmental Science",
          "n": 32
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Closest discipline-matched record."
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Environmental Science",
        "n": 32
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Closest discipline-matched record."
  }
};

export default record;
