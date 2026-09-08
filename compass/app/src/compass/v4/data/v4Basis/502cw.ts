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
    "code": "502cw",
    "name": "Master of Laws",
    "hasMarketReport": true,
    "exposure": 94.83,
    "entryExposure": 94.15,
    "jirN": 676,
    "nTitles": 15,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Laws",
          "n": 676
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
        "name": "Master of Laws",
        "n": 676
      }
    ],
    "indexVariant": "AIOE-2021"
  }
};

export default record;
