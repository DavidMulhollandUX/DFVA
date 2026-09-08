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
    "code": "mc-archcm",
    "name": "Master of Architecture/Master of Construction Management",
    "hasMarketReport": true,
    "exposure": 90.11,
    "entryExposure": 89.75,
    "jirN": 782,
    "nTitles": 30,
    "nMedium": 12,
    "exposureBasis": {
      "tier": "combined",
      "grain": "program-family",
      "sources": [
        {
          "name": "Master of Architecture",
          "n": 621
        },
        {
          "name": "Master of Construction Management",
          "n": 161
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "components: Master of Architecture (exact) ∪ Master of Construction Management (exact)",
      "dominantShare": {
        "name": "Master of Architecture",
        "share": 0.79
      }
    }
  },
  "panelABasis": {
    "tier": "combined",
    "grain": "program-family",
    "sources": [
      {
        "name": "Master of Architecture",
        "n": 621
      },
      {
        "name": "Master of Construction Management",
        "n": 161
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "components: Master of Architecture (exact) ∪ Master of Construction Management (exact)",
    "dominantShare": {
      "name": "Master of Architecture",
      "share": 0.79
    }
  }
};

export default record;
