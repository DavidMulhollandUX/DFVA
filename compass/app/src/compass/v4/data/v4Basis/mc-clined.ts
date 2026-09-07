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
    "code": "mc-clined",
    "name": "Master of Clinical Education",
    "hasMarketReport": true,
    "exposure": 81.63,
    "entryExposure": 81.63,
    "jirN": null,
    "nTitles": 14,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 070111 Teacher Education: Higher Education",
          "n": null
        }
      ],
      "field": "070111",
      "indexVariant": "AIOE-2021",
      "coverage": 61.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "School Teachers nfd",
          "share": 2.479
        }
      ],
      "exposureWeighted": 83.1
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 070111 Teacher Education: Higher Education",
        "n": null
      }
    ],
    "field": "070111",
    "indexVariant": "AIOE-2021",
    "coverage": 61.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "School Teachers nfd",
        "share": 2.479
      }
    ],
    "exposureWeighted": 83.1
  }
};

export default record;
