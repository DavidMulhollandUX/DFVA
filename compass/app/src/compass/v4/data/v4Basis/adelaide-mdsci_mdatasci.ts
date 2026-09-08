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
    "code": "adelaide-mdsci_mdatasci",
    "name": "Master of Data Science",
    "hasMarketReport": false,
    "exposure": 94.94,
    "entryExposure": 96.08,
    "jirN": 96,
    "nTitles": 15,
    "nMedium": 14,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Data Science",
          "n": 96
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
        "name": "Master of Data Science",
        "n": 96
      }
    ],
    "indexVariant": "AIOE-2021"
  }
};

export default record;
