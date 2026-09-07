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
    "code": "mc-spmed",
    "name": "Master of Sports Medicine",
    "hasMarketReport": true,
    "exposure": 76.03,
    "entryExposure": 76.03,
    "jirN": null,
    "nTitles": 11,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 060199 Medical Studies, n.e.c.",
          "n": null
        }
      ],
      "field": "060199",
      "indexVariant": "AIOE-2021",
      "coverage": 66.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Health Diagnostic and Promotion Professionals nec",
          "share": 1.504
        }
      ],
      "exposureWeighted": 80.09
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 060199 Medical Studies, n.e.c.",
        "n": null
      }
    ],
    "field": "060199",
    "indexVariant": "AIOE-2021",
    "coverage": 66.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Health Diagnostic and Promotion Professionals nec",
        "share": 1.504
      }
    ],
    "exposureWeighted": 80.09
  }
};

export default record;
