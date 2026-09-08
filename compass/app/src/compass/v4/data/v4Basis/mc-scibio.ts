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
    "code": "mc-scibio",
    "name": "Master of Science (BioSciences)",
    "hasMarketReport": true,
    "exposure": 81.42,
    "entryExposure": 77.86,
    "jirN": 447,
    "nTitles": 55,
    "nMedium": 37,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Bachelor of Science (Biochemistry and Molecular",
          "n": 141
        },
        {
          "name": "Bachelor of Science (Ecology And Evolutionary",
          "n": 48
        },
        {
          "name": "Bachelor of Science (Genetics)",
          "n": 112
        },
        {
          "name": "Bachelor of Science (Microbiology)",
          "n": 54
        },
        {
          "name": "Bachelor of Science (Zoology)",
          "n": 92
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "dfva_jir_map 'Bachelor of Science (bio majors)': union of the BSc biological-science major records."
    }
  },
  "panelABasis": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Bachelor of Science (Biochemistry and Molecular",
        "n": 141
      },
      {
        "name": "Bachelor of Science (Ecology And Evolutionary",
        "n": 48
      },
      {
        "name": "Bachelor of Science (Genetics)",
        "n": 112
      },
      {
        "name": "Bachelor of Science (Microbiology)",
        "n": 54
      },
      {
        "name": "Bachelor of Science (Zoology)",
        "n": 92
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "dfva_jir_map 'Bachelor of Science (bio majors)': union of the BSc biological-science major records."
  }
};

export default record;
