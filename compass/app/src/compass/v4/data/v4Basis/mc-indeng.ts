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
    "code": "mc-indeng",
    "name": "Master of Industrial Engineering",
    "hasMarketReport": true,
    "exposure": 88.8,
    "entryExposure": 87.96,
    "jirN": 113,
    "nTitles": 26,
    "nMedium": 15,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Mechanical Engineering",
          "n": 24
        },
        {
          "name": "Master of Engineering Management",
          "n": 89
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "dfva_jir_map: mechanical engineering / engineering management family.",
      "dominantShare": {
        "name": "Master of Engineering Management",
        "share": 0.79
      }
    }
  },
  "panelABasis": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Mechanical Engineering",
        "n": 24
      },
      {
        "name": "Master of Engineering Management",
        "n": 89
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "dfva_jir_map: mechanical engineering / engineering management family.",
    "dominantShare": {
      "name": "Master of Engineering Management",
      "share": 0.79
    }
  }
};

export default record;
