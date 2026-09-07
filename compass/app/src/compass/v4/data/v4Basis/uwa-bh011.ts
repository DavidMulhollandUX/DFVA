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
    "code": "uwa-bh011",
    "name": "Bachelor of Engineering",
    "hasMarketReport": false,
    "exposure": 83.48,
    "entryExposure": 82.67,
    "jirN": null,
    "nTitles": 14,
    "nMedium": 0,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 039999 Engineering and Related Technologies, n.e.c.",
          "n": null
        }
      ],
      "field": "039999",
      "indexVariant": "AIOE-2021",
      "coverage": 45.5,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 86.88
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 039999 Engineering and Related Technologies, n.e.c.",
        "n": null
      }
    ],
    "field": "039999",
    "indexVariant": "AIOE-2021",
    "coverage": 45.5,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 86.88
  }
};

export default record;
