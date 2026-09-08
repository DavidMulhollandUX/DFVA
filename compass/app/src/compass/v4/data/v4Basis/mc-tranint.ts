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
    "code": "mc-tranint",
    "name": "Master of Translation and Interpreting",
    "hasMarketReport": true,
    "exposure": 89.57,
    "entryExposure": 89.57,
    "jirN": null,
    "nTitles": 5,
    "nMedium": 0,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 091519 Translating and Interpreting",
          "n": null
        }
      ],
      "field": "091519",
      "indexVariant": "AIOE-2021",
      "coverage": 27,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 89.78
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 091519 Translating and Interpreting",
        "n": null
      }
    ],
    "field": "091519",
    "indexVariant": "AIOE-2021",
    "coverage": 27,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 89.78
  }
};

export default record;
