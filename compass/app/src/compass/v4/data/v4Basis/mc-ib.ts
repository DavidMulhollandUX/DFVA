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
    "code": "mc-ib",
    "name": "Master of International Business",
    "hasMarketReport": true,
    "exposure": 87.44,
    "entryExposure": 86.65,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 080311 International Business",
          "n": null
        }
      ],
      "field": "080311",
      "indexVariant": "AIOE-2021",
      "coverage": 30.8,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 86.52
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 080311 International Business",
        "n": null
      }
    ],
    "field": "080311",
    "indexVariant": "AIOE-2021",
    "coverage": 30.8,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 86.52
  }
};

export default record;
