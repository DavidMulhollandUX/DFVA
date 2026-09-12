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
    "code": "uq-2000",
    "name": "Bachelor of Arts",
    "hasMarketReport": true,
    "exposure": 81.93,
    "entryExposure": 77.94,
    "jirN": null,
    "nTitles": 15,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 0009 Society and Culture",
          "n": null
        }
      ],
      "field": "0009",
      "indexVariant": "AIOE-2021",
      "coverage": 26.8,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 80.97
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 0009 Society and Culture",
        "n": null
      }
    ],
    "field": "0009",
    "indexVariant": "AIOE-2021",
    "coverage": 26.8,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 80.97
  }
};

export default record;
