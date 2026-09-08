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
    "code": "mc-thtr",
    "name": "Master of Theatre",
    "hasMarketReport": true,
    "exposure": 72.81,
    "entryExposure": 71.75,
    "jirN": null,
    "nTitles": 19,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100103 Drama and Theatre Studies",
          "n": null
        }
      ],
      "field": "100103",
      "indexVariant": "AIOE-2021",
      "coverage": 45.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 68.55
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100103 Drama and Theatre Studies",
        "n": null
      }
    ],
    "field": "100103",
    "indexVariant": "AIOE-2021",
    "coverage": 45.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 68.55
  }
};

export default record;
