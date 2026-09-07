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
    "code": "mc-apling",
    "name": "Master of Applied Linguistics",
    "hasMarketReport": true,
    "exposure": 88.72,
    "entryExposure": 88.72,
    "jirN": null,
    "nTitles": 7,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 091521 Linguistics",
          "n": null
        }
      ],
      "field": "091521",
      "indexVariant": "AIOE-2021",
      "coverage": 32.9,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "School Teachers nfd",
          "share": 2.857
        }
      ],
      "exposureWeighted": 91.11
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 091521 Linguistics",
        "n": null
      }
    ],
    "field": "091521",
    "indexVariant": "AIOE-2021",
    "coverage": 32.9,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "School Teachers nfd",
        "share": 2.857
      }
    ],
    "exposureWeighted": 91.11
  }
};

export default record;
