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
    "code": "mc-mtrneng",
    "name": "Master of Mechatronics Engineering",
    "hasMarketReport": true,
    "exposure": 83.23,
    "entryExposure": 82.37,
    "jirN": 18,
    "nTitles": 15,
    "nMedium": 8,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Mechatronics Engineering",
          "n": 18
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
        "name": "Master of Mechatronics Engineering",
        "n": 18
      }
    ],
    "indexVariant": "AIOE-2021"
  }
};

export default record;
