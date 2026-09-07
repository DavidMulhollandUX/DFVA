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
    "code": "me-dcd",
    "name": "Doctor of Clinical Dentistry",
    "hasMarketReport": true,
    "exposure": 60.96,
    "entryExposure": 60.92,
    "jirN": 40,
    "nTitles": 15,
    "nMedium": 9,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Doctor of Clinical Dentistry",
          "n": 40
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
        "name": "Doctor of Clinical Dentistry",
        "n": 40
      }
    ],
    "indexVariant": "AIOE-2021"
  }
};

export default record;
