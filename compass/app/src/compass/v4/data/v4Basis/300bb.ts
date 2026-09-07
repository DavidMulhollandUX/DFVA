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
    "code": "300bb",
    "name": "Doctor of Education",
    "hasMarketReport": true,
    "exposure": 92.44,
    "entryExposure": 94.16,
    "jirN": 611,
    "nTitles": 15,
    "nMedium": 11,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Education",
          "n": 611
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Professional doctorate in education; Master of Education record as for mc-surged / mc-intedib."
    }
  },
  "panelABasis": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Education",
        "n": 611
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Professional doctorate in education; Master of Education record as for mc-surged / mc-intedib."
  }
};

export default record;
