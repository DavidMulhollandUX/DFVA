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
    "code": "mc-eleceng",
    "name": "Master of Electrical Engineering",
    "hasMarketReport": true,
    "exposure": 82.73,
    "entryExposure": 84.36,
    "jirN": null,
    "nTitles": 20,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 031301 Electrical Engineering",
          "n": null
        }
      ],
      "field": "031301",
      "indexVariant": "AIOE-2021",
      "coverage": 58.5,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Commissioned Defence Force Officer",
          "share": 1.613
        }
      ],
      "exposureWeighted": 88
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 031301 Electrical Engineering",
        "n": null
      }
    ],
    "field": "031301",
    "indexVariant": "AIOE-2021",
    "coverage": 58.5,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Commissioned Defence Force Officer",
        "share": 1.613
      }
    ],
    "exposureWeighted": 88
  }
};

export default record;
