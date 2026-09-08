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
    "code": "mc-archeng",
    "name": "Master of Architectural Engineering",
    "hasMarketReport": true,
    "exposure": 89.54,
    "entryExposure": 89.53,
    "jirN": 669,
    "nTitles": 30,
    "nMedium": 11,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Architecture",
          "n": 621
        },
        {
          "name": "Master of Civil Engineering",
          "n": 48
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Architectural engineering spans both records.",
      "dominantShare": {
        "name": "Master of Architecture",
        "share": 0.93
      }
    }
  },
  "panelABasis": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Architecture",
        "n": 621
      },
      {
        "name": "Master of Civil Engineering",
        "n": 48
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Architectural engineering spans both records.",
    "dominantShare": {
      "name": "Master of Architecture",
      "share": 0.93
    }
  }
};

export default record;
