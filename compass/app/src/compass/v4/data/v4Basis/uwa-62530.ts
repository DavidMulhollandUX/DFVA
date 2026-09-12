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
    "code": "uwa-62530",
    "name": "Master of Data Science",
    "hasMarketReport": true,
    "exposure": 81.84,
    "entryExposure": 81.93,
    "jirN": null,
    "nTitles": 12,
    "nMedium": 4,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 020199 Computer Science, n.e.c.",
          "n": null
        }
      ],
      "field": "020199",
      "indexVariant": "AIOE-2021",
      "coverage": 46.4,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 85.44
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 020199 Computer Science, n.e.c.",
        "n": null
      }
    ],
    "field": "020199",
    "indexVariant": "AIOE-2021",
    "coverage": 46.4,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 85.44
  }
};

export default record;
