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
    "code": "mc-clinrhb",
    "name": "Master of Clinical Rehabilitation",
    "hasMarketReport": true,
    "exposure": 69.41,
    "entryExposure": 69.41,
    "jirN": null,
    "nTitles": 10,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 061799 Rehabilitation Therapies, n.e.c.",
          "n": null
        }
      ],
      "field": "061799",
      "indexVariant": "AIOE-2021",
      "coverage": 56.8,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Music Professionals nec",
          "share": 1.439
        }
      ],
      "exposureWeighted": 73.06
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 061799 Rehabilitation Therapies, n.e.c.",
        "n": null
      }
    ],
    "field": "061799",
    "indexVariant": "AIOE-2021",
    "coverage": 56.8,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Music Professionals nec",
        "share": 1.439
      }
    ],
    "exposureWeighted": 73.06
  }
};

export default record;
