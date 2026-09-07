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
    "code": "274ab",
    "name": "Master of Criminology",
    "hasMarketReport": true,
    "exposure": 72.79,
    "entryExposure": 72.63,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 099903 Criminology",
          "n": null
        }
      ],
      "field": "099903",
      "indexVariant": "AIOE-2021",
      "coverage": 36.4,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 71.07
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 099903 Criminology",
        "n": null
      }
    ],
    "field": "099903",
    "indexVariant": "AIOE-2021",
    "coverage": 36.4,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 71.07
  }
};

export default record;
