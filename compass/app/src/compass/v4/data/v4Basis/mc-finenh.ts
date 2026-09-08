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
    "code": "mc-finenh",
    "name": "Master of Finance (Enhanced)",
    "hasMarketReport": true,
    "exposure": 97.04,
    "entryExposure": 96.99,
    "jirN": 148,
    "nTitles": 15,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "variant",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Finance",
          "n": 148
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "variant of \"Master of Finance\""
    }
  },
  "panelABasis": {
    "tier": "variant",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Finance",
        "n": 148
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "variant of \"Master of Finance\""
  }
};

export default record;
