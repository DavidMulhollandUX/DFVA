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
    "code": "b-favisart",
    "name": "Bachelor of Fine Arts (Visual Art)",
    "hasMarketReport": true,
    "exposure": 71.19,
    "entryExposure": 63.73,
    "jirN": null,
    "nTitles": 15,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100301 Fine Arts",
          "n": null
        }
      ],
      "field": "100301",
      "indexVariant": "AIOE-2021",
      "coverage": 25.7,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 69.45
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100301 Fine Arts",
        "n": null
      }
    ],
    "field": "100301",
    "indexVariant": "AIOE-2021",
    "coverage": 25.7,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 69.45
  }
};

export default record;
