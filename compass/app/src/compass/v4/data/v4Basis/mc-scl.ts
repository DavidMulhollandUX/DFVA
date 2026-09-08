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
    "code": "mc-scl",
    "name": "Master of Social Change Leadership",
    "hasMarketReport": true,
    "exposure": 80.6,
    "entryExposure": 77.79,
    "jirN": null,
    "nTitles": 14,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 099999 Society and Culture, n.e.c.",
          "n": null
        }
      ],
      "field": "099999",
      "indexVariant": "AIOE-2021",
      "coverage": 24.8,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 78.52
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 099999 Society and Culture, n.e.c.",
        "n": null
      }
    ],
    "field": "099999",
    "indexVariant": "AIOE-2021",
    "coverage": 24.8,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 78.52
  }
};

export default record;
