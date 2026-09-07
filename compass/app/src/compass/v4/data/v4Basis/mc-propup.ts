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
    "code": "mc-propup",
    "name": "Master of Property/Master of Urban Planning",
    "hasMarketReport": true,
    "exposure": 91.37,
    "entryExposure": 91.03,
    "jirN": 195,
    "nTitles": 30,
    "nMedium": 15,
    "exposureBasis": {
      "tier": "combined",
      "grain": "program-family",
      "sources": [
        {
          "name": "Master of Property",
          "n": 65
        },
        {
          "name": "Master of Urban Planning",
          "n": 130
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "components: Master of Property (exact) ∪ Master of Urban Planning (exact)",
      "dominantShare": {
        "name": "Master of Urban Planning",
        "share": 0.67
      }
    }
  },
  "panelABasis": {
    "tier": "combined",
    "grain": "program-family",
    "sources": [
      {
        "name": "Master of Property",
        "n": 65
      },
      {
        "name": "Master of Urban Planning",
        "n": 130
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "components: Master of Property (exact) ∪ Master of Urban Planning (exact)",
    "dominantShare": {
      "name": "Master of Urban Planning",
      "share": 0.67
    }
  }
};

export default record;
