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
    "code": "mc-teachpr",
    "name": "Master of Teaching (Primary)",
    "hasMarketReport": true,
    "exposure": 87.71,
    "entryExposure": 89.16,
    "jirN": 242,
    "nTitles": 11,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "pooled",
      "grain": "program-family",
      "sources": [
        {
          "name": "Master of Teaching (Secondary)",
          "n": 242
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "union of 2 \"Master of Teaching (…)\" records",
      "excludedSources": [
        {
          "name": "Master of Teaching (Primary)",
          "refusedTitles": [
            "English Teacher"
          ]
        }
      ]
    }
  },
  "panelABasis": {
    "tier": "pooled",
    "grain": "program-family",
    "sources": [
      {
        "name": "Master of Teaching (Secondary)",
        "n": 242
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "union of 2 \"Master of Teaching (…)\" records",
    "excludedSources": [
      {
        "name": "Master of Teaching (Primary)",
        "refusedTitles": [
          "English Teacher"
        ]
      }
    ]
  }
};

export default record;
