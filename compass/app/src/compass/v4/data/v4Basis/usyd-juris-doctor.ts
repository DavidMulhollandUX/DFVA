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
    "code": "usyd-juris-doctor",
    "name": "Juris Doctor",
    "hasMarketReport": false,
    "exposure": 94.43,
    "entryExposure": 93.12,
    "jirN": 1277,
    "nTitles": 15,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Juris Doctor",
          "n": 1277
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
        "name": "Juris Doctor",
        "n": 1277
      }
    ],
    "indexVariant": "AIOE-2021"
  }
};

export default record;
