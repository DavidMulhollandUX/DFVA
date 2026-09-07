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
    "code": "mc-edebt",
    "name": "Master of Education in Evidence-Based Teaching",
    "hasMarketReport": true,
    "exposure": 92.44,
    "entryExposure": 94.16,
    "jirN": 611,
    "nTitles": 15,
    "nMedium": 11,
    "exposureBasis": {
      "tier": "variant",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Education",
          "n": 611
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "variant of \"Master of Education\""
    }
  },
  "panelABasis": {
    "tier": "variant",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Education",
        "n": 611
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "variant of \"Master of Education\""
  }
};

export default record;
