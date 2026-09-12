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
    "code": "usyd-education",
    "name": "Education",
    "hasMarketReport": true,
    "exposure": 76.56,
    "entryExposure": 77.57,
    "jirN": null,
    "nTitles": 10,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 0701 Teacher Education",
          "n": null
        }
      ],
      "field": "0701",
      "indexVariant": "AIOE-2021",
      "coverage": 71.9,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "School Teachers nfd",
          "share": 3.74
        },
        {
          "title": "University Lecturer",
          "share": 0.631
        }
      ],
      "exposureWeighted": 85.86
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 0701 Teacher Education",
        "n": null
      }
    ],
    "field": "0701",
    "indexVariant": "AIOE-2021",
    "coverage": 71.9,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "School Teachers nfd",
        "share": 3.74
      },
      {
        "title": "University Lecturer",
        "share": 0.631
      }
    ],
    "exposureWeighted": 85.86
  }
};

export default record;
