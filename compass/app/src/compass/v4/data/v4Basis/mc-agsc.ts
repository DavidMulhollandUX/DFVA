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
    "code": "mc-agsc",
    "name": "Master of Agricultural Sciences",
    "hasMarketReport": true,
    "exposure": 73,
    "entryExposure": 67.44,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 050101 Agricultural Science",
          "n": null
        }
      ],
      "field": "050101",
      "indexVariant": "AIOE-2021",
      "coverage": 41.7,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Mixed Crop and Livestock Farm Worker",
          "share": 2.778
        },
        {
          "title": "Farm, Forestry and Garden Workers nec",
          "share": 2.778
        }
      ],
      "exposureWeighted": 75.38
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 050101 Agricultural Science",
        "n": null
      }
    ],
    "field": "050101",
    "indexVariant": "AIOE-2021",
    "coverage": 41.7,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Mixed Crop and Livestock Farm Worker",
        "share": 2.778
      },
      {
        "title": "Farm, Forestry and Garden Workers nec",
        "share": 2.778
      }
    ],
    "exposureWeighted": 75.38
  }
};

export default record;
