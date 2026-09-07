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
    "code": "j17re",
    "name": "Master of Advanced Social Work",
    "hasMarketReport": true,
    "exposure": 86.73,
    "entryExposure": 84.59,
    "jirN": 203,
    "nTitles": 15,
    "nMedium": 12,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Social Work",
          "n": 203
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Advanced Social Work is the post-qualifying version of the MSW."
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Social Work",
        "n": 203
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Advanced Social Work is the post-qualifying version of the MSW."
  }
};

export default record;
