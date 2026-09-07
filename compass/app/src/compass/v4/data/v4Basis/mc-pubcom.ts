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
    "code": "mc-pubcom",
    "name": "Master of Publishing and Communications",
    "hasMarketReport": true,
    "exposure": 84.04,
    "entryExposure": 83.73,
    "jirN": null,
    "nTitles": 11,
    "nMedium": 0,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100705 Written Communication",
          "n": null
        }
      ],
      "field": "100705",
      "indexVariant": "AIOE-2021",
      "coverage": 30,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 83.69
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100705 Written Communication",
        "n": null
      }
    ],
    "field": "100705",
    "indexVariant": "AIOE-2021",
    "coverage": 30,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 83.69
  }
};

export default record;
