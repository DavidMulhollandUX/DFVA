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
    "code": "mc-actscex",
    "name": "Master of Actuarial Science (Extended)",
    "hasMarketReport": true,
    "exposure": 97.99,
    "entryExposure": 97.94,
    "jirN": 101,
    "nTitles": 15,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Bachelor of Commerce (Actuarial Studies)",
          "n": 101
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Actuarial discipline; the only actuarial alumni record (the alumni-record index names it for mc-actsc)."
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Bachelor of Commerce (Actuarial Studies)",
        "n": 101
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Actuarial discipline; the only actuarial alumni record (the alumni-record index names it for mc-actsc)."
  }
};

export default record;
