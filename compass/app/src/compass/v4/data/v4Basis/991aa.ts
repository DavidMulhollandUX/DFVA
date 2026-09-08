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
    "code": "991aa",
    "name": "Master of Biostatistics",
    "hasMarketReport": true,
    "exposure": 93.92,
    "entryExposure": 93.92,
    "jirN": null,
    "nTitles": 11,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 010103 Statistics",
          "n": null
        }
      ],
      "field": "010103",
      "indexVariant": "AIOE-2021",
      "coverage": 39.1,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 94.97
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 010103 Statistics",
        "n": null
      }
    ],
    "field": "010103",
    "indexVariant": "AIOE-2021",
    "coverage": 39.1,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 94.97
  }
};

export default record;
