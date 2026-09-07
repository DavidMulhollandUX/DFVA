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
    "code": "mc-tchecp",
    "name": "Master of Teaching (Early Childhood and Primary)",
    "hasMarketReport": true,
    "exposure": 77.63,
    "entryExposure": 74.55,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 070101 Teacher Education: Early Childhood",
          "n": null
        }
      ],
      "field": "070101",
      "indexVariant": "AIOE-2021",
      "coverage": 82.4,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 73.19
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 070101 Teacher Education: Early Childhood",
        "n": null
      }
    ],
    "field": "070101",
    "indexVariant": "AIOE-2021",
    "coverage": 82.4,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 73.19
  }
};

export default record;
