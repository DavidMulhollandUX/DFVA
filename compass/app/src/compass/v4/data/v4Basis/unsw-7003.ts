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
    "code": "unsw-7003",
    "name": "Computer Science",
    "hasMarketReport": false,
    "exposure": 83.3,
    "entryExposure": 81.63,
    "jirN": null,
    "nTitles": 14,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 0201 Computer Science",
          "n": null
        }
      ],
      "field": "0201",
      "indexVariant": "AIOE-2021",
      "coverage": 52.1,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 87.21
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 0201 Computer Science",
        "n": null
      }
    ],
    "field": "0201",
    "indexVariant": "AIOE-2021",
    "coverage": 52.1,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 87.21
  }
};

export default record;
