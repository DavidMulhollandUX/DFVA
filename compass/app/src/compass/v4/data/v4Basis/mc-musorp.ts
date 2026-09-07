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
    "code": "mc-musorp",
    "name": "Master of Music (Orchestral Performance)",
    "hasMarketReport": true,
    "exposure": 70.7,
    "entryExposure": 67.8,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100101 Music",
          "n": null
        }
      ],
      "field": "100101",
      "indexVariant": "AIOE-2021",
      "coverage": 34,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Music Professionals nec",
          "share": 2.372
        }
      ],
      "exposureWeighted": 71.26
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100101 Music",
        "n": null
      }
    ],
    "field": "100101",
    "indexVariant": "AIOE-2021",
    "coverage": 34,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Music Professionals nec",
        "share": 2.372
      }
    ],
    "exposureWeighted": 71.26
  }
};

export default record;
