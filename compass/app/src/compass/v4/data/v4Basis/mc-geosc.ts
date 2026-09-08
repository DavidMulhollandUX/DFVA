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
    "code": "mc-geosc",
    "name": "Master of Geoscience",
    "hasMarketReport": true,
    "exposure": 85.44,
    "entryExposure": 81.91,
    "jirN": 46,
    "nTitles": 15,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Bachelor of Science (Geology)",
          "n": 46
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "As mc-sciear."
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Bachelor of Science (Geology)",
        "n": 46
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "As mc-sciear."
  }
};

export default record;
