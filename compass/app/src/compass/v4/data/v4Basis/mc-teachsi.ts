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
    "code": "mc-teachsi",
    "name": "Master of Teaching (Secondary) Internship",
    "hasMarketReport": true,
    "exposure": 81.05,
    "entryExposure": 80.93,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 070105 Teacher Education: Secondary",
          "n": null
        }
      ],
      "field": "070105",
      "indexVariant": "AIOE-2021",
      "coverage": 74.1,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 90.06
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 070105 Teacher Education: Secondary",
        "n": null
      }
    ],
    "field": "070105",
    "indexVariant": "AIOE-2021",
    "coverage": 74.1,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 90.06
  }
};

export default record;
