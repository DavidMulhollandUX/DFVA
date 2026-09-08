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
    "code": "mc-bmedsc",
    "name": "Master of Biomedical Science",
    "hasMarketReport": true,
    "exposure": 82.09,
    "entryExposure": 79.22,
    "jirN": 380,
    "nTitles": 48,
    "nMedium": 32,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Bachelor of Biomedicine (Human Structure and",
          "n": 90
        },
        {
          "name": "Bachelor of Biomedicine (Neuroscience)",
          "n": 113
        },
        {
          "name": "Bachelor of Biomedicine (Pathology)",
          "n": 57
        },
        {
          "name": "Bachelor of Biomedicine (Pharmacology)",
          "n": 55
        },
        {
          "name": "Bachelor of Biomedicine (Physiology)",
          "n": 65
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "dfva_jir_map 'Bachelor of Biomedicine majors': union of the seven major records.",
      "excludedSources": [
        {
          "name": "Bachelor of Biomedicine (Immunology)",
          "refusedTitles": [
            "Scientist"
          ]
        },
        {
          "name": "Bachelor of Biomedicine (Microbiology)",
          "refusedTitles": [
            "Regulatory Reporting Analyst"
          ]
        }
      ]
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Bachelor of Biomedicine (Human Structure and",
        "n": 90
      },
      {
        "name": "Bachelor of Biomedicine (Neuroscience)",
        "n": 113
      },
      {
        "name": "Bachelor of Biomedicine (Pathology)",
        "n": 57
      },
      {
        "name": "Bachelor of Biomedicine (Pharmacology)",
        "n": 55
      },
      {
        "name": "Bachelor of Biomedicine (Physiology)",
        "n": 65
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "dfva_jir_map 'Bachelor of Biomedicine majors': union of the seven major records.",
    "excludedSources": [
      {
        "name": "Bachelor of Biomedicine (Immunology)",
        "refusedTitles": [
          "Scientist"
        ]
      },
      {
        "name": "Bachelor of Biomedicine (Microbiology)",
        "refusedTitles": [
          "Regulatory Reporting Analyst"
        ]
      }
    ]
  }
};

export default record;
