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
    "code": "mc-comdrfs",
    "name": "Master of Commerce (Decision, Risk and Financial Sciences)",
    "hasMarketReport": true,
    "exposure": 97.83,
    "entryExposure": 97.66,
    "jirN": 72,
    "nTitles": 14,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Management (Finance)",
          "n": 72
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Decision, risk and financial sciences — finance discipline."
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Management (Finance)",
        "n": 72
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Decision, risk and financial sciences — finance discipline."
  }
};

export default record;
