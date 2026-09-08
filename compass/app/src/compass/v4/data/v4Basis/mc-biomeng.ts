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
    "code": "mc-biomeng",
    "name": "Master of Biomedical Engineering",
    "hasMarketReport": true,
    "exposure": 87.13,
    "entryExposure": 87.13,
    "jirN": null,
    "nTitles": 1,
    "nMedium": 0,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 039903 Biomedical Engineering",
          "n": null
        }
      ],
      "field": "039903",
      "indexVariant": "AIOE-2021",
      "coverage": 25,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 87.13
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 039903 Biomedical Engineering",
        "n": null
      }
    ],
    "field": "039903",
    "indexVariant": "AIOE-2021",
    "coverage": 25,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 87.13
  }
};

export default record;
