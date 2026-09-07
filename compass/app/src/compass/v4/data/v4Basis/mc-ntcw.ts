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
    "code": "mc-ntcw",
    "name": "Master of Narrative Therapy and Community Work",
    "hasMarketReport": true,
    "exposure": 87,
    "entryExposure": 87,
    "jirN": null,
    "nTitles": 11,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 090513 Counselling",
          "n": null
        }
      ],
      "field": "090513",
      "indexVariant": "AIOE-2021",
      "coverage": 37.8,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Local Government Legislator",
          "share": 1.61
        }
      ],
      "exposureWeighted": 87.93
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 090513 Counselling",
        "n": null
      }
    ],
    "field": "090513",
    "indexVariant": "AIOE-2021",
    "coverage": 37.8,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Local Government Legislator",
        "share": 1.61
      }
    ],
    "exposureWeighted": 87.93
  }
};

export default record;
