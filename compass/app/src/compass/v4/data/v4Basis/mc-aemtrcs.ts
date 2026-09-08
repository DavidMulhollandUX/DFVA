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
    "code": "mc-aemtrcs",
    "name": "Master of Applied Econometrics",
    "hasMarketReport": true,
    "exposure": 96.53,
    "entryExposure": 95.84,
    "jirN": 30,
    "nTitles": 15,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Economics",
          "n": 30
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Econometrics/economics discipline."
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Economics",
        "n": 30
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Econometrics/economics discipline."
  }
};

export default record;
