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
    "code": "mc-adolhw",
    "name": "Master of Adolescent Health and Wellbeing",
    "hasMarketReport": true,
    "exposure": 76.74,
    "entryExposure": 76.43,
    "jirN": null,
    "nTitles": 12,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 061399 Public Health, n.e.c.",
          "n": null
        }
      ],
      "field": "061399",
      "indexVariant": "AIOE-2021",
      "coverage": 37.3,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Health Diagnostic and Promotion Professionals nec",
          "share": 1.99
        }
      ],
      "exposureWeighted": 75.37
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 061399 Public Health, n.e.c.",
        "n": null
      }
    ],
    "field": "061399",
    "indexVariant": "AIOE-2021",
    "coverage": 37.3,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Health Diagnostic and Promotion Professionals nec",
        "share": 1.99
      }
    ],
    "exposureWeighted": 75.37
  }
};

export default record;
