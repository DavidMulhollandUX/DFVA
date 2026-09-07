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
    "code": "mc-advnpph",
    "name": "Master of Advanced Nursing Practice/Master of Public Health",
    "hasMarketReport": true,
    "exposure": 82.6,
    "entryExposure": 78.33,
    "jirN": 631,
    "nTitles": 29,
    "nMedium": 12,
    "exposureBasis": {
      "tier": "combined",
      "grain": "program-family",
      "sources": [
        {
          "name": "Master of Advanced Nursing Practice",
          "n": 69
        },
        {
          "name": "Master of Public Health",
          "n": 562
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "components: Master of Advanced Nursing Practice (exact) ∪ Master of Public Health (exact)",
      "dominantShare": {
        "name": "Master of Public Health",
        "share": 0.89
      }
    }
  },
  "panelABasis": {
    "tier": "combined",
    "grain": "program-family",
    "sources": [
      {
        "name": "Master of Advanced Nursing Practice",
        "n": 69
      },
      {
        "name": "Master of Public Health",
        "n": 562
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "components: Master of Advanced Nursing Practice (exact) ∪ Master of Public Health (exact)",
    "dominantShare": {
      "name": "Master of Public Health",
      "share": 0.89
    }
  }
};

export default record;
