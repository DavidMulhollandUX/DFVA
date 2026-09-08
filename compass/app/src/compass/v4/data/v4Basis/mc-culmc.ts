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
    "code": "mc-culmc",
    "name": "Master of Cultural Materials Conservation",
    "hasMarketReport": true,
    "exposure": 71.38,
    "entryExposure": 68.49,
    "jirN": null,
    "nTitles": 20,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100399 Visual Arts and Crafts, n.e.c.",
          "n": null
        }
      ],
      "field": "100399",
      "indexVariant": "AIOE-2021",
      "coverage": 29.1,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 70.8
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100399 Visual Arts and Crafts, n.e.c.",
        "n": null
      }
    ],
    "field": "100399",
    "indexVariant": "AIOE-2021",
    "coverage": 29.1,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 70.8
  }
};

export default record;
