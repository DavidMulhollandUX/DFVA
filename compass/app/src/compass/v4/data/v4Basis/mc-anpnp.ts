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
    "code": "mc-anpnp",
    "name": "Master of Advanced Nursing Practice (Nurse Practitioner)",
    "hasMarketReport": true,
    "exposure": 76.38,
    "entryExposure": 70.05,
    "jirN": 69,
    "nTitles": 15,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "variant",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Advanced Nursing Practice",
          "n": 69
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "variant of \"Master of Advanced Nursing Practice\""
    }
  },
  "panelABasis": {
    "tier": "variant",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Advanced Nursing Practice",
        "n": 69
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "variant of \"Master of Advanced Nursing Practice\""
  }
};

export default record;
