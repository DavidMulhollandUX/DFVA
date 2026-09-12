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
    "code": "usyd-science-extended",
    "name": "Bachelor of Science",
    "hasMarketReport": true,
    "exposure": 76.63,
    "entryExposure": 75.06,
    "jirN": null,
    "nTitles": 14,
    "nMedium": 0,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 0001 Natural and Physical Sciences",
          "n": null
        }
      ],
      "field": "0001",
      "indexVariant": "AIOE-2021",
      "coverage": 21.5,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 76.38
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 0001 Natural and Physical Sciences",
        "n": null
      }
    ],
    "field": "0001",
    "indexVariant": "AIOE-2021",
    "coverage": 21.5,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 76.38
  }
};

export default record;
