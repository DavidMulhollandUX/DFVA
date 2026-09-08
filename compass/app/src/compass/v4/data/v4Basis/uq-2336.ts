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
    "code": "uq-2336",
    "name": "Bachelor of Commerce",
    "hasMarketReport": false,
    "exposure": 97.01,
    "entryExposure": 96.82,
    "jirN": 8738,
    "nTitles": 71,
    "nMedium": 23,
    "exposureBasis": {
      "tier": "pooled",
      "grain": "program-family",
      "sources": [
        {
          "name": "Bachelor of Commerce (Accounting)",
          "n": 1693
        },
        {
          "name": "Bachelor of Commerce (Actuarial Studies)",
          "n": 101
        },
        {
          "name": "Bachelor of Commerce (Economics)",
          "n": 1549
        },
        {
          "name": "Bachelor of Commerce (Finance)",
          "n": 3546
        },
        {
          "name": "Bachelor of Commerce (Management)",
          "n": 928
        },
        {
          "name": "Bachelor of Commerce (Marketing)",
          "n": 921
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "union of 6 \"Bachelor of Commerce (…)\" records"
    }
  },
  "panelABasis": {
    "tier": "pooled",
    "grain": "program-family",
    "sources": [
      {
        "name": "Bachelor of Commerce (Accounting)",
        "n": 1693
      },
      {
        "name": "Bachelor of Commerce (Actuarial Studies)",
        "n": 101
      },
      {
        "name": "Bachelor of Commerce (Economics)",
        "n": 1549
      },
      {
        "name": "Bachelor of Commerce (Finance)",
        "n": 3546
      },
      {
        "name": "Bachelor of Commerce (Management)",
        "n": 928
      },
      {
        "name": "Bachelor of Commerce (Marketing)",
        "n": 921
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "union of 6 \"Bachelor of Commerce (…)\" records"
  }
};

export default record;
