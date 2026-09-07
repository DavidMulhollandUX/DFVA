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
    "code": "mc-cu",
    "name": "Master of Clinical Ultrasound",
    "hasMarketReport": true,
    "exposure": 70.02,
    "entryExposure": 69.04,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 0615 Radiography",
          "n": null
        }
      ],
      "field": "0615",
      "indexVariant": "AIOE-2021",
      "coverage": 86.5,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 55.53
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 0615 Radiography",
        "n": null
      }
    ],
    "field": "0615",
    "indexVariant": "AIOE-2021",
    "coverage": 86.5,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 55.53
  }
};

export default record;
