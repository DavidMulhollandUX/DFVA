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
    "code": "mc-cncrsc",
    "name": "Master of Cancer Sciences",
    "hasMarketReport": true,
    "exposure": 75.8,
    "entryExposure": 73.61,
    "jirN": null,
    "nTitles": 12,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 019901 Medical Science",
          "n": null
        }
      ],
      "field": "019901",
      "indexVariant": "AIOE-2021",
      "coverage": 38,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 71.99
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 019901 Medical Science",
        "n": null
      }
    ],
    "field": "019901",
    "indexVariant": "AIOE-2021",
    "coverage": 38,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 71.99
  }
};

export default record;
