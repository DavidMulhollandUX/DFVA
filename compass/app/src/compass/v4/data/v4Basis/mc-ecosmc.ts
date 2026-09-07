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
    "code": "mc-ecosmc",
    "name": "Master of Ecosystem Management and Conservation",
    "hasMarketReport": true,
    "exposure": 89.88,
    "entryExposure": 89.79,
    "jirN": 408,
    "nTitles": 15,
    "nMedium": 9,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Environment",
          "n": 408
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Environmental-management discipline."
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Environment",
        "n": 408
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Environmental-management discipline."
  }
};

export default record;
