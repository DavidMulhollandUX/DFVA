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
    "code": "mc-archud",
    "name": "Master of Architecture/Master of Urban Design",
    "hasMarketReport": true,
    "exposure": 90.34,
    "entryExposure": 89.7,
    "jirN": 751,
    "nTitles": 29,
    "nMedium": 12,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Architecture",
          "n": 621
        },
        {
          "name": "Master of Urban Planning",
          "n": 130
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Double degree; the urban design / urban cultural heritage component has no record and takes Master of Urban Planning as mc-urbdes does.",
      "dominantShare": {
        "name": "Master of Architecture",
        "share": 0.83
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
        "name": "Master of Urban Planning",
        "n": 130
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Double degree; the urban design / urban cultural heritage component has no record and takes Master of Urban Planning as mc-urbdes does.",
    "dominantShare": {
      "name": "Master of Architecture",
      "share": 0.83
    }
  }
};

export default record;
