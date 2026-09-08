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
    "code": "mc-bamktg",
    "name": "Master of Business Administration/Master of Marketing",
    "hasMarketReport": true,
    "exposure": 88.95,
    "entryExposure": 89.11,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 080301 Business Management",
          "n": null
        }
      ],
      "field": "080301",
      "indexVariant": "AIOE-2021",
      "coverage": 31.1,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 89.47
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 080301 Business Management",
        "n": null
      }
    ],
    "field": "080301",
    "indexVariant": "AIOE-2021",
    "coverage": 31.1,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 89.47
  }
};

export default record;
