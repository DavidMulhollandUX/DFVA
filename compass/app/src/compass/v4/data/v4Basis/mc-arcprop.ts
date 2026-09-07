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
    "code": "mc-arcprop",
    "name": "Master of Architecture/Master of Property",
    "hasMarketReport": true,
    "exposure": 88.94,
    "entryExposure": 88.29,
    "jirN": 686,
    "nTitles": 30,
    "nMedium": 16,
    "exposureBasis": {
      "tier": "combined",
      "grain": "program-family",
      "sources": [
        {
          "name": "Master of Architecture",
          "n": 621
        },
        {
          "name": "Master of Property",
          "n": 65
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "components: Master of Architecture (exact) ∪ Master of Property (exact)",
      "dominantShare": {
        "name": "Master of Architecture",
        "share": 0.91
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
        "name": "Master of Property",
        "n": 65
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "components: Master of Architecture (exact) ∪ Master of Property (exact)",
    "dominantShare": {
      "name": "Master of Architecture",
      "share": 0.91
    }
  }
};

export default record;
