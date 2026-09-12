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
    "code": "usyd-psychology-coaching",
    "name": "Coaching Psychology",
    "hasMarketReport": true,
    "exposure": 89.85,
    "entryExposure": 88.29,
    "jirN": null,
    "nTitles": 12,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 090701 Psychology",
          "n": null
        }
      ],
      "field": "090701",
      "indexVariant": "AIOE-2021",
      "coverage": 36.6,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 91.5
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 090701 Psychology",
        "n": null
      }
    ],
    "field": "090701",
    "indexVariant": "AIOE-2021",
    "coverage": 36.6,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 91.5
  }
};

export default record;
