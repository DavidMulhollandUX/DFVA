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
    "code": "b-famusth",
    "name": "Bachelor of Fine Arts (Music Theatre)",
    "hasMarketReport": true,
    "exposure": 81.81,
    "entryExposure": 80.36,
    "jirN": null,
    "nTitles": 15,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100199 Performing Arts, n.e.c.",
          "n": null
        }
      ],
      "field": "100199",
      "indexVariant": "AIOE-2021",
      "coverage": 30.8,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 79.24
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100199 Performing Arts, n.e.c.",
        "n": null
      }
    ],
    "field": "100199",
    "indexVariant": "AIOE-2021",
    "coverage": 30.8,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 79.24
  }
};

export default record;
