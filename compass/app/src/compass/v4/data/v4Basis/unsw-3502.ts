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
    "code": "unsw-3502",
    "name": "Commerce",
    "hasMarketReport": true,
    "exposure": 88.71,
    "entryExposure": 88.85,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 0803 Business and Management",
          "n": null
        }
      ],
      "field": "0803",
      "indexVariant": "AIOE-2021",
      "coverage": 34.6,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 89.99
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 0803 Business and Management",
        "n": null
      }
    ],
    "field": "0803",
    "indexVariant": "AIOE-2021",
    "coverage": 34.6,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 89.99
  }
};

export default record;
