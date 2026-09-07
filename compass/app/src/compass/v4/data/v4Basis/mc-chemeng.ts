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
    "code": "mc-chemeng",
    "name": "Master of Chemical Engineering",
    "hasMarketReport": true,
    "exposure": 89.78,
    "entryExposure": 91.16,
    "jirN": 17,
    "nTitles": 10,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Chemical Engineering",
          "n": 17
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "panelABasis": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Chemical Engineering",
        "n": 17
      }
    ],
    "indexVariant": "AIOE-2021"
  }
};

export default record;
