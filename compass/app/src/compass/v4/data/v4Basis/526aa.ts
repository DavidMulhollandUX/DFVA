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
    "code": "526aa",
    "name": "Master of Banking and Finance Law",
    "hasMarketReport": true,
    "exposure": 94.83,
    "entryExposure": 94.15,
    "jirN": 676,
    "nTitles": 15,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Laws",
          "n": 676
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Banking and Finance Law is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
    }
  },
  "panelABasis": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Laws",
        "n": 676
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Banking and Finance Law is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
  }
};

export default record;
