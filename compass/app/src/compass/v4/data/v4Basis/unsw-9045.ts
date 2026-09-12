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
    "code": "unsw-9045",
    "name": "Public Health",
    "hasMarketReport": true,
    "exposure": 76.5,
    "entryExposure": 76.42,
    "jirN": null,
    "nTitles": 11,
    "nMedium": 0,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 0613 Public Health",
          "n": null
        }
      ],
      "field": "0613",
      "indexVariant": "AIOE-2021",
      "coverage": 28.1,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "University Lecturer",
          "share": 1.688
        }
      ],
      "exposureWeighted": 76.88
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 0613 Public Health",
        "n": null
      }
    ],
    "field": "0613",
    "indexVariant": "AIOE-2021",
    "coverage": 28.1,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "University Lecturer",
        "share": 1.688
      }
    ],
    "exposureWeighted": 76.88
  }
};

export default record;
