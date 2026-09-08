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
    "code": "mc-cat",
    "name": "Master of Creative Arts Therapy",
    "hasMarketReport": true,
    "exposure": 76.66,
    "entryExposure": 72.12,
    "jirN": null,
    "nTitles": 12,
    "nMedium": 4,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 069999 Health, n.e.c.",
          "n": null
        }
      ],
      "field": "069999",
      "indexVariant": "AIOE-2021",
      "coverage": 23.9,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Health Information Manager",
          "share": 3.448
        }
      ],
      "exposureWeighted": 75.56
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 069999 Health, n.e.c.",
        "n": null
      }
    ],
    "field": "069999",
    "indexVariant": "AIOE-2021",
    "coverage": 23.9,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Health Information Manager",
        "share": 3.448
      }
    ],
    "exposureWeighted": 75.56
  }
};

export default record;
