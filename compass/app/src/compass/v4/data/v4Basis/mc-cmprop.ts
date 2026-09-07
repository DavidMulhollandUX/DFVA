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
    "code": "mc-cmprop",
    "name": "Master of Construction Management/Master of Property",
    "hasMarketReport": true,
    "exposure": 91.21,
    "entryExposure": 91.08,
    "jirN": 226,
    "nTitles": 29,
    "nMedium": 13,
    "exposureBasis": {
      "tier": "combined",
      "grain": "program-family",
      "sources": [
        {
          "name": "Master of Construction Management",
          "n": 161
        },
        {
          "name": "Master of Property",
          "n": 65
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "components: Master of Construction Management (exact) ∪ Master of Property (exact)",
      "dominantShare": {
        "name": "Master of Construction Management",
        "share": 0.71
      }
    }
  },
  "panelABasis": {
    "tier": "combined",
    "grain": "program-family",
    "sources": [
      {
        "name": "Master of Construction Management",
        "n": 161
      },
      {
        "name": "Master of Property",
        "n": 65
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "components: Master of Construction Management (exact) ∪ Master of Property (exact)",
    "dominantShare": {
      "name": "Master of Construction Management",
      "share": 0.71
    }
  }
};

export default record;
