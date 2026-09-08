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
    "code": "monash-l3001",
    "name": "Bachelor of Laws",
    "hasMarketReport": false,
    "exposure": 90.52,
    "entryExposure": 90.67,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 4,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 0909 Law",
          "n": null
        }
      ],
      "field": "0909",
      "indexVariant": "AIOE-2021",
      "coverage": 58.6,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 93.74
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 0909 Law",
        "n": null
      }
    ],
    "field": "0909",
    "indexVariant": "AIOE-2021",
    "coverage": 58.6,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 93.74
  }
};

export default record;
