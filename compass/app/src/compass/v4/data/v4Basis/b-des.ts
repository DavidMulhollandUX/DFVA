// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
import type { V4PanelABasis, V4OnlyProgram } from "../v4Meta";

export interface V4BasisRecord {
  onlyProgram: V4OnlyProgram | null;
  panelABasis: V4PanelABasis | null;
}

const record: V4BasisRecord = {
  "onlyProgram": null,
  "panelABasis": {
    "tier": "pooled",
    "grain": "program-family",
    "sources": [
      {
        "name": "Bachelor of Design (Architecture)",
        "n": 248
      },
      {
        "name": "Bachelor of Design (Construction)",
        "n": 97
      },
      {
        "name": "Bachelor of Design (Graphic Design)",
        "n": 90
      },
      {
        "name": "Bachelor of Design (Property)",
        "n": 47
      },
      {
        "name": "Bachelor of Design (Urban Planning)",
        "n": 33
      },
      {
        "name": "Bachelor of Design (User Experience Design)",
        "n": 28
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "union of 6 \"Bachelor of Design (…)\" records"
  }
};

export default record;
