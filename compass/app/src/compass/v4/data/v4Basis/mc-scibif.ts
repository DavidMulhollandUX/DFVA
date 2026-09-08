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
    "code": "mc-scibif",
    "name": "Master of Science (Bioinformatics)",
    "hasMarketReport": true,
    "exposure": 78.62,
    "entryExposure": 76.89,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 0,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 010999 Biological Sciences, n.e.c.",
          "n": null
        }
      ],
      "field": "010999",
      "indexVariant": "AIOE-2021",
      "coverage": 27.5,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 78.24
    }
  },
  "panelABasis": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 010999 Biological Sciences, n.e.c.",
        "n": null
      }
    ],
    "field": "010999",
    "indexVariant": "AIOE-2021",
    "coverage": 27.5,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 78.24
  }
};

export default record;
