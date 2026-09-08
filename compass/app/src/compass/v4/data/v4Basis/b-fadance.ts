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
    "code": "b-fadance",
    "name": "Bachelor of Fine Arts (Dance)",
    "hasMarketReport": true,
    "exposure": 68.44,
    "entryExposure": 68.44,
    "jirN": null,
    "nTitles": 5,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100105 Dance",
          "n": null
        }
      ],
      "field": "100105",
      "indexVariant": "AIOE-2021",
      "coverage": 33.3,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Dancer or Choreographer",
          "share": 8.889
        }
      ],
      "exposureWeighted": 68.91
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100105 Dance",
        "n": null
      }
    ],
    "field": "100105",
    "indexVariant": "AIOE-2021",
    "coverage": 33.3,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Dancer or Choreographer",
        "share": 8.889
      }
    ],
    "exposureWeighted": 68.91
  }
};

export default record;
