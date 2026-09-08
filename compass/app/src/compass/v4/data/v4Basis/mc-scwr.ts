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
    "code": "mc-scwr",
    "name": "Master of Screenwriting",
    "hasMarketReport": true,
    "exposure": 73.61,
    "entryExposure": 68.98,
    "jirN": null,
    "nTitles": 18,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100701 Audio Visual Studies",
          "n": null
        }
      ],
      "field": "100701",
      "indexVariant": "AIOE-2021",
      "coverage": 31.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 73
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100701 Audio Visual Studies",
        "n": null
      }
    ],
    "field": "100701",
    "indexVariant": "AIOE-2021",
    "coverage": 31.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 73
  }
};

export default record;
