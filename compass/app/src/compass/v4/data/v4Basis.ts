// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
// Types are canonical in v4Meta.ts (the light module every route may import);
// re-exported here so a file can import both a type and a value from this
// one specifier without also naming v4Meta.ts.
export type {
  V4Adjudication,
  V4ItemResult,
  V4GateResult,
  V4PanelC,
  V4PanelATier,
  V4PanelAGrain,
  V4PanelABasis,
  V4OnlyProgram,
} from "./v4Meta";
import type { V4PanelABasis, V4OnlyProgram } from "./v4Meta";

/** Panel A basis and exposure data for programs scored on v4 but absent from
 *  the v3 registry (docs: no taught curriculum, or scored ahead of a v1
 *  report). Read only by the report page — /reports and /insights use the
 *  light V4_INDEX in v4Meta.ts instead. */
export const V4_ONLY_PROGRAMS: Record<string, V4OnlyProgram> = {
  "038ab": {
    "code": "038ab",
    "name": "Master of Art Curatorship",
    "hasMarketReport": true,
    "exposure": 76.58,
    "entryExposure": 74.44,
    "jirN": 94,
    "nTitles": 15,
    "nMedium": 10,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Art Curatorship",
          "n": 94
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "080cl": {
    "code": "080cl",
    "name": "Master of Psychology (Clinical Psychology)/Doctor of Philosophy",
    "hasMarketReport": true,
    "exposure": 95.57,
    "entryExposure": 93.63,
    "jirN": 47,
    "nTitles": 15,
    "nMedium": 13,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Applied Psychology",
          "n": 47
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Professional psychology stream; same program-family record the reconciliation package used for 527cl."
    }
  },
  "080cn": {
    "code": "080cn",
    "name": "Master of Psychology (Clinical Neuropsychology)/Doctor of Philosophy",
    "hasMarketReport": true,
    "exposure": 95.57,
    "entryExposure": 93.63,
    "jirN": 47,
    "nTitles": 15,
    "nMedium": 13,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Applied Psychology",
          "n": 47
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Professional psychology stream; same program-family record the reconciliation package used for 527cl."
    }
  },
  "097ab": {
    "code": "097ab",
    "name": "Master of Development Studies",
    "hasMarketReport": true,
    "exposure": 92.5,
    "entryExposure": 92.94,
    "jirN": 104,
    "nTitles": 14,
    "nMedium": 13,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Development Studies",
          "n": 104
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "175aa": {
    "code": "175aa",
    "name": "Master of Arts and Cultural Management",
    "hasMarketReport": true,
    "exposure": 85.86,
    "entryExposure": 81.76,
    "jirN": 98,
    "nTitles": 15,
    "nMedium": 11,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Arts and Cultural Management",
          "n": 98
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "192aa": {
    "code": "192aa",
    "name": "Master of International Tax",
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
      "note": "International Tax is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
    }
  },
  "195aa": {
    "code": "195aa",
    "name": "Master of Construction Law",
    "hasMarketReport": true,
    "exposure": 95.64,
    "entryExposure": 94.68,
    "jirN": 88,
    "nTitles": 15,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Construction Law",
          "n": 88
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "274ab": {
    "code": "274ab",
    "name": "Master of Criminology",
    "hasMarketReport": true,
    "exposure": 72.79,
    "entryExposure": 72.63,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 099903 Criminology",
          "n": null
        }
      ],
      "field": "099903",
      "indexVariant": "AIOE-2021",
      "coverage": 36.4,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 71.07
    }
  },
  "277aa": {
    "code": "277aa",
    "name": "Master of Intellectual Property Law",
    "hasMarketReport": true,
    "exposure": 95.26,
    "entryExposure": null,
    "jirN": 36,
    "nTitles": 12,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Intellectual Property Law",
          "n": 36
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "294be": {
    "code": "294be",
    "name": "Master of Marketing",
    "hasMarketReport": true,
    "exposure": 96.45,
    "entryExposure": 97.6,
    "jirN": 66,
    "nTitles": 15,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Management (Marketing)",
          "n": 66
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Discipline-matched marketing master."
    }
  },
  "300bb": {
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
  "305bb": {
    "code": "305bb",
    "name": "Master of Clinical Audiology",
    "hasMarketReport": true,
    "exposure": 81.09,
    "entryExposure": 79.31,
    "jirN": 156,
    "nTitles": 15,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Clinical Audiology",
          "n": 156
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "342aa": {
    "code": "342aa",
    "name": "Master of Psychiatry",
    "hasMarketReport": true,
    "exposure": 90.74,
    "entryExposure": 88.67,
    "jirN": 54,
    "nTitles": 14,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Psychiatry",
          "n": 54
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "344ab": {
    "code": "344ab",
    "name": "Master of Public Policy and Management",
    "hasMarketReport": true,
    "exposure": 95.04,
    "entryExposure": 92.34,
    "jirN": 165,
    "nTitles": 15,
    "nMedium": 13,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Public Policy and Management",
          "n": 165
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "502cw": {
    "code": "502cw",
    "name": "Master of Laws",
    "hasMarketReport": true,
    "exposure": 94.83,
    "entryExposure": 94.15,
    "jirN": 676,
    "nTitles": 15,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Laws",
          "n": 676
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "504aa": {
    "code": "504aa",
    "name": "Master of Commercial Law",
    "hasMarketReport": true,
    "exposure": 94.39,
    "entryExposure": null,
    "jirN": 63,
    "nTitles": 15,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Commercial Law",
          "n": 63
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "507aa": {
    "code": "507aa",
    "name": "Master of Health and Medical Law",
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
      "note": "Health and Medical Law is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
    }
  },
  "510aa": {
    "code": "510aa",
    "name": "Master of Employment and Labour Relations Law",
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
      "note": "Employment and Labour Relations Law is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
    }
  },
  "511aa": {
    "code": "511aa",
    "name": "Master of Public and International Law",
    "hasMarketReport": true,
    "exposure": 95.8,
    "entryExposure": null,
    "jirN": 39,
    "nTitles": 12,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Public And International Law",
          "n": 39
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "526aa": {
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
  "527cn": {
    "code": "527cn",
    "name": "Master of Psychology (Clinical Neuropsychology)",
    "hasMarketReport": true,
    "exposure": 95.57,
    "entryExposure": 93.63,
    "jirN": 47,
    "nTitles": 15,
    "nMedium": 13,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Applied Psychology",
          "n": 47
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Professional psychology stream; same program-family record the reconciliation package used for 527cl."
    }
  },
  "635aa": {
    "code": "635aa",
    "name": "Master of Law and Development",
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
      "note": "Law and Development is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
    }
  },
  "706aa": {
    "code": "706aa",
    "name": "Master of Social Policy",
    "hasMarketReport": true,
    "exposure": 96.05,
    "entryExposure": 95.96,
    "jirN": 66,
    "nTitles": 13,
    "nMedium": 13,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Social Policy",
          "n": 66
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "742ab": {
    "code": "742ab",
    "name": "Master of Tax",
    "hasMarketReport": true,
    "exposure": 98.37,
    "entryExposure": 98.91,
    "jirN": 57,
    "nTitles": 13,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Tax",
          "n": 57
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "761em": {
    "code": "761em",
    "name": "Master of Engineering Management",
    "hasMarketReport": true,
    "exposure": 91.05,
    "entryExposure": 89.03,
    "jirN": 89,
    "nTitles": 15,
    "nMedium": 10,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Engineering Management",
          "n": 89
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "841ac": {
    "code": "841ac",
    "name": "Bachelor of Oral Health",
    "hasMarketReport": true,
    "exposure": 64.6,
    "entryExposure": 60.88,
    "jirN": 61,
    "nTitles": 12,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Bachelor of Oral Health",
          "n": 61
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "872bb": {
    "code": "872bb",
    "name": "Master of Veterinary Science",
    "hasMarketReport": true,
    "exposure": 62.4,
    "entryExposure": 63.57,
    "jirN": 275,
    "nTitles": 12,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Doctor of Veterinary Medicine",
          "n": 275
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Veterinary graduate program; DVM is the discipline-matched record."
    }
  },
  "991aa": {
    "code": "991aa",
    "name": "Master of Biostatistics",
    "hasMarketReport": true,
    "exposure": 93.92,
    "entryExposure": 93.92,
    "jirN": null,
    "nTitles": 11,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 010103 Statistics",
          "n": null
        }
      ],
      "field": "010103",
      "indexVariant": "AIOE-2021",
      "coverage": 39.1,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 94.97
    }
  },
  "b-agr": {
    "code": "b-agr",
    "name": "Bachelor of Agriculture",
    "hasMarketReport": true,
    "exposure": 73,
    "entryExposure": 67.44,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 050101 Agricultural Science",
          "n": null
        }
      ],
      "field": "050101",
      "indexVariant": "AIOE-2021",
      "coverage": 41.7,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Mixed Crop and Livestock Farm Worker",
          "share": 2.778
        },
        {
          "title": "Farm, Forestry and Garden Workers nec",
          "share": 2.778
        }
      ],
      "exposureWeighted": 75.38
    }
  },
  "b-arts": {
    "code": "b-arts",
    "name": "Bachelor of Arts",
    "hasMarketReport": true,
    "exposure": 92.09,
    "entryExposure": 90.79,
    "jirN": 2596,
    "nTitles": 101,
    "nMedium": 51,
    "exposureBasis": {
      "tier": "pooled",
      "grain": "program-family",
      "sources": [
        {
          "name": "Bachelor of Arts (Anthropology)",
          "n": 153
        },
        {
          "name": "Bachelor of Arts (Asian Studies)",
          "n": 43
        },
        {
          "name": "Bachelor of Arts (Economics)",
          "n": 196
        },
        {
          "name": "Bachelor of Arts (Gender Studies)",
          "n": 100
        },
        {
          "name": "Bachelor of Arts (Geography)",
          "n": 108
        },
        {
          "name": "Bachelor of Arts (History)",
          "n": 524
        },
        {
          "name": "Bachelor of Arts (Philosophy)",
          "n": 215
        },
        {
          "name": "Bachelor of Arts (Politics and International",
          "n": 339
        },
        {
          "name": "Bachelor of Arts (Psychology)",
          "n": 859
        },
        {
          "name": "Bachelor of Arts (Screen And Cultural Studies)",
          "n": 59
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "union of 18 \"Bachelor of Arts (…)\" records",
      "excludedSources": [
        {
          "name": "Bachelor of Arts (Ancient World Studies)",
          "refusedTitles": [
            "Collections Assistant"
          ]
        },
        {
          "name": "Bachelor of Arts (Art History)",
          "refusedTitles": [
            "Gallery Attendant",
            "Researcher",
            "Art Consultant"
          ]
        },
        {
          "name": "Bachelor of Arts (Creative Writing)",
          "refusedTitles": [
            "Content Manager"
          ]
        },
        {
          "name": "Bachelor of Arts (Criminology)",
          "refusedTitles": [
            "Justice Officer",
            "Senior Intelligence Analyst Team Leader"
          ]
        },
        {
          "name": "Bachelor of Arts (English and Theatre Studies)",
          "refusedTitles": [
            "Publishing Assistant"
          ]
        },
        {
          "name": "Bachelor of Arts (Indigenous Studies)",
          "refusedTitles": [
            "Indigenous Education Officer"
          ]
        },
        {
          "name": "Bachelor of Arts (Media and Communications)",
          "refusedTitles": [
            "Content Manager"
          ]
        },
        {
          "name": "Bachelor of Arts (Sociology)",
          "refusedTitles": [
            "Youth Advisor"
          ]
        }
      ]
    }
  },
  "b-bmed": {
    "code": "b-bmed",
    "name": "Bachelor of Biomedicine",
    "hasMarketReport": true,
    "exposure": 82.09,
    "entryExposure": 79.22,
    "jirN": 380,
    "nTitles": 48,
    "nMedium": 32,
    "exposureBasis": {
      "tier": "pooled",
      "grain": "program-family",
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
      "note": "union of 7 \"Bachelor of Biomedicine (…)\" records",
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
  "b-com": {
    "code": "b-com",
    "name": "Bachelor of Commerce",
    "hasMarketReport": true,
    "exposure": 97.01,
    "entryExposure": 96.82,
    "jirN": 8738,
    "nTitles": 71,
    "nMedium": 23,
    "exposureBasis": {
      "tier": "pooled",
      "grain": "program-family",
      "sources": [
        {
          "name": "Bachelor of Commerce (Accounting)",
          "n": 1693
        },
        {
          "name": "Bachelor of Commerce (Actuarial Studies)",
          "n": 101
        },
        {
          "name": "Bachelor of Commerce (Economics)",
          "n": 1549
        },
        {
          "name": "Bachelor of Commerce (Finance)",
          "n": 3546
        },
        {
          "name": "Bachelor of Commerce (Management)",
          "n": 928
        },
        {
          "name": "Bachelor of Commerce (Marketing)",
          "n": 921
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "union of 6 \"Bachelor of Commerce (…)\" records"
    }
  },
  "b-faacting": {
    "code": "b-faacting",
    "name": "Bachelor of Fine Arts (Acting)",
    "hasMarketReport": true,
    "exposure": 72.81,
    "entryExposure": 71.75,
    "jirN": null,
    "nTitles": 19,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100103 Drama and Theatre Studies",
          "n": null
        }
      ],
      "field": "100103",
      "indexVariant": "AIOE-2021",
      "coverage": 45.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 68.55
    }
  },
  "b-faanim": {
    "code": "b-faanim",
    "name": "Bachelor of Fine Arts (Animation)",
    "hasMarketReport": true,
    "exposure": 73.61,
    "entryExposure": 68.98,
    "jirN": null,
    "nTitles": 18,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100701 Audio Visual Studies",
          "n": null
        }
      ],
      "field": "100701",
      "indexVariant": "AIOE-2021",
      "coverage": 31.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 73
    }
  },
  "b-fadance": {
    "code": "b-fadance",
    "name": "Bachelor of Fine Arts (Dance)",
    "hasMarketReport": true,
    "exposure": 68.44,
    "entryExposure": 68.44,
    "jirN": null,
    "nTitles": 5,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100105 Dance",
          "n": null
        }
      ],
      "field": "100105",
      "indexVariant": "AIOE-2021",
      "coverage": 33.3,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Dancer or Choreographer",
          "share": 8.889
        }
      ],
      "exposureWeighted": 68.91
    }
  },
  "b-fafilmtv": {
    "code": "b-fafilmtv",
    "name": "Bachelor of Fine Arts (Film and Television)",
    "hasMarketReport": true,
    "exposure": 73.61,
    "entryExposure": 68.98,
    "jirN": null,
    "nTitles": 18,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100701 Audio Visual Studies",
          "n": null
        }
      ],
      "field": "100701",
      "indexVariant": "AIOE-2021",
      "coverage": 31.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 73
    }
  },
  "b-famusth": {
    "code": "b-famusth",
    "name": "Bachelor of Fine Arts (Music Theatre)",
    "hasMarketReport": true,
    "exposure": 81.81,
    "entryExposure": 80.36,
    "jirN": null,
    "nTitles": 15,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100199 Performing Arts, n.e.c.",
          "n": null
        }
      ],
      "field": "100199",
      "indexVariant": "AIOE-2021",
      "coverage": 30.8,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 79.24
    }
  },
  "b-fapro": {
    "code": "b-fapro",
    "name": "Bachelor of Fine Arts (Production)",
    "hasMarketReport": true,
    "exposure": 72.81,
    "entryExposure": 71.75,
    "jirN": null,
    "nTitles": 19,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100103 Drama and Theatre Studies",
          "n": null
        }
      ],
      "field": "100103",
      "indexVariant": "AIOE-2021",
      "coverage": 45.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 68.55
    }
  },
  "b-fascwri": {
    "code": "b-fascwri",
    "name": "Bachelor of Fine Arts (Screenwriting)",
    "hasMarketReport": false,
    "exposure": 73.61,
    "entryExposure": 68.98,
    "jirN": null,
    "nTitles": 18,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100701 Audio Visual Studies",
          "n": null
        }
      ],
      "field": "100701",
      "indexVariant": "AIOE-2021",
      "coverage": 31.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 73
    }
  },
  "b-fath": {
    "code": "b-fath",
    "name": "Bachelor of Fine Arts (Theatre)",
    "hasMarketReport": false,
    "exposure": 72.81,
    "entryExposure": 71.75,
    "jirN": null,
    "nTitles": 19,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100103 Drama and Theatre Studies",
          "n": null
        }
      ],
      "field": "100103",
      "indexVariant": "AIOE-2021",
      "coverage": 45.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 68.55
    }
  },
  "b-favisart": {
    "code": "b-favisart",
    "name": "Bachelor of Fine Arts (Visual Art)",
    "hasMarketReport": true,
    "exposure": 71.19,
    "entryExposure": 63.73,
    "jirN": null,
    "nTitles": 15,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100301 Fine Arts",
          "n": null
        }
      ],
      "field": "100301",
      "indexVariant": "AIOE-2021",
      "coverage": 25.7,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 69.45
    }
  },
  "b-mus": {
    "code": "b-mus",
    "name": "Bachelor of Music",
    "hasMarketReport": false,
    "exposure": 80.63,
    "entryExposure": 80.91,
    "jirN": 87,
    "nTitles": 15,
    "nMedium": 9,
    "exposureBasis": {
      "tier": "pooled",
      "grain": "program-family",
      "sources": [
        {
          "name": "Bachelor of Music (Performance)",
          "n": 87
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "union of 1 \"Bachelor of Music (…)\" records"
    }
  },
  "b-sciextd": {
    "code": "b-sciextd",
    "name": "Bachelor of Science (Extended)",
    "hasMarketReport": false,
    "exposure": 82.72,
    "entryExposure": 78.11,
    "jirN": 3650,
    "nTitles": 215,
    "nMedium": 112,
    "exposureBasis": {
      "tier": "pooled",
      "grain": "program-family",
      "sources": [
        {
          "name": "Bachelor of Science (Animal Health And Disease)",
          "n": 68
        },
        {
          "name": "Bachelor of Science (Biochemistry and Molecular",
          "n": 141
        },
        {
          "name": "Bachelor of Science (Biotechnology)",
          "n": 113
        },
        {
          "name": "Bachelor of Science (Chemistry)",
          "n": 318
        },
        {
          "name": "Bachelor of Science (Computing And Software",
          "n": 328
        },
        {
          "name": "Bachelor of Science (Data Science)",
          "n": 212
        },
        {
          "name": "Bachelor of Science (Ecology And Evolutionary",
          "n": 48
        },
        {
          "name": "Bachelor of Science (Environmental Science)",
          "n": 90
        },
        {
          "name": "Bachelor of Science (Food Science)",
          "n": 99
        },
        {
          "name": "Bachelor of Science (Genetics)",
          "n": 112
        },
        {
          "name": "Bachelor of Science (Geology)",
          "n": 46
        },
        {
          "name": "Bachelor of Science (Human Structure and",
          "n": 154
        },
        {
          "name": "Bachelor of Science (Mathematical Physics)",
          "n": 56
        },
        {
          "name": "Bachelor of Science (Mathematics and Statistics)",
          "n": 122
        },
        {
          "name": "Bachelor of Science (Microbiology)",
          "n": 54
        },
        {
          "name": "Bachelor of Science (Neuroscience)",
          "n": 373
        },
        {
          "name": "Bachelor of Science (Pathology)",
          "n": 57
        },
        {
          "name": "Bachelor of Science (Pharmacology)",
          "n": 154
        },
        {
          "name": "Bachelor of Science (Physics)",
          "n": 189
        },
        {
          "name": "Bachelor of Science (Physiology)",
          "n": 439
        },
        {
          "name": "Bachelor of Science (Psychology)",
          "n": 351
        },
        {
          "name": "Bachelor of Science (Veterinary Bioscience)",
          "n": 34
        },
        {
          "name": "Bachelor of Science (Zoology)",
          "n": 92
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "union of 23 \"Bachelor of Science (…)\" records"
    }
  },
  "d01lf": {
    "code": "d01lf",
    "name": "Master of Creative Writing, Publishing and Editing",
    "hasMarketReport": false,
    "exposure": 84.04,
    "entryExposure": 83.73,
    "jirN": null,
    "nTitles": 11,
    "nMedium": 0,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100705 Written Communication",
          "n": null
        }
      ],
      "field": "100705",
      "indexVariant": "AIOE-2021",
      "coverage": 30,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 83.69
    }
  },
  "dr-philedp": {
    "code": "dr-philedp",
    "name": "Master of Psychology (Educational and Developmental)/Doctor of Philosophy",
    "hasMarketReport": true,
    "exposure": 95.57,
    "entryExposure": 93.63,
    "jirN": 47,
    "nTitles": 15,
    "nMedium": 13,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Applied Psychology",
          "n": 47
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Professional psychology stream; same program-family record the reconciliation package used for 527cl."
    }
  },
  "j17re": {
    "code": "j17re",
    "name": "Master of Advanced Social Work",
    "hasMarketReport": false,
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
  "m04aa": {
    "code": "m04aa",
    "name": "Master of Music Therapy",
    "hasMarketReport": true,
    "exposure": 70.67,
    "entryExposure": 68.64,
    "jirN": 43,
    "nTitles": 12,
    "nMedium": 9,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Music Therapy",
          "n": 43
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-actsc": {
    "code": "mc-actsc",
    "name": "Master of Actuarial Science",
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
  "mc-actscen": {
    "code": "mc-actscen",
    "name": "Master of Actuarial Science (Enhanced)",
    "hasMarketReport": false,
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
  "mc-actscex": {
    "code": "mc-actscex",
    "name": "Master of Actuarial Science (Extended)",
    "hasMarketReport": false,
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
  "mc-adolhw": {
    "code": "mc-adolhw",
    "name": "Master of Adolescent Health and Wellbeing",
    "hasMarketReport": false,
    "exposure": 76.74,
    "entryExposure": 76.43,
    "jirN": null,
    "nTitles": 12,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 061399 Public Health, n.e.c.",
          "n": null
        }
      ],
      "field": "061399",
      "indexVariant": "AIOE-2021",
      "coverage": 37.3,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Health Diagnostic and Promotion Professionals nec",
          "share": 1.99
        }
      ],
      "exposureWeighted": 75.37
    }
  },
  "mc-advnpph": {
    "code": "mc-advnpph",
    "name": "Master of Advanced Nursing Practice/Master of Public Health",
    "hasMarketReport": false,
    "exposure": 82.6,
    "entryExposure": 78.33,
    "jirN": 631,
    "nTitles": 29,
    "nMedium": 12,
    "exposureBasis": {
      "tier": "combined",
      "grain": "program-family",
      "sources": [
        {
          "name": "Master of Advanced Nursing Practice",
          "n": 69
        },
        {
          "name": "Master of Public Health",
          "n": 562
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "components: Master of Advanced Nursing Practice (exact) ∪ Master of Public Health (exact)",
      "dominantShare": {
        "name": "Master of Public Health",
        "share": 0.89
      }
    }
  },
  "mc-aecoenh": {
    "code": "mc-aecoenh",
    "name": "Master of Applied Econometrics (Enhanced)",
    "hasMarketReport": false,
    "exposure": 96.53,
    "entryExposure": 95.84,
    "jirN": 30,
    "nTitles": 15,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Economics",
          "n": 30
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Econometrics/economics discipline."
    }
  },
  "mc-aemtrcs": {
    "code": "mc-aemtrcs",
    "name": "Master of Applied Econometrics",
    "hasMarketReport": false,
    "exposure": 96.53,
    "entryExposure": 95.84,
    "jirN": 30,
    "nTitles": 15,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Economics",
          "n": 30
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Econometrics/economics discipline."
    }
  },
  "mc-agsc": {
    "code": "mc-agsc",
    "name": "Master of Agricultural Sciences",
    "hasMarketReport": false,
    "exposure": 73,
    "entryExposure": 67.44,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 050101 Agricultural Science",
          "n": null
        }
      ],
      "field": "050101",
      "indexVariant": "AIOE-2021",
      "coverage": 41.7,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Mixed Crop and Livestock Farm Worker",
          "share": 2.778
        },
        {
          "title": "Farm, Forestry and Garden Workers nec",
          "share": 2.778
        }
      ],
      "exposureWeighted": 75.38
    }
  },
  "mc-aimo": {
    "code": "mc-aimo",
    "name": "Master of Artificial Intelligence",
    "hasMarketReport": true,
    "exposure": 92.8,
    "entryExposure": 93.33,
    "jirN": 41,
    "nTitles": 15,
    "nMedium": 11,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Computer Science",
          "n": 41
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "AI is a computer-science specialisation."
    }
  },
  "mc-anamgt": {
    "code": "mc-anamgt",
    "name": "Master of Analytics Management",
    "hasMarketReport": false,
    "exposure": 90.73,
    "entryExposure": 89.56,
    "jirN": 655,
    "nTitles": 13,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Management",
          "n": 655
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Business-school analytics master; management family record (as mc-busana)."
    }
  },
  "mc-anp": {
    "code": "mc-anp",
    "name": "Master of Advanced Nursing Practice",
    "hasMarketReport": true,
    "exposure": 76.38,
    "entryExposure": 70.05,
    "jirN": 69,
    "nTitles": 15,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Advanced Nursing Practice",
          "n": 69
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-anpnp": {
    "code": "mc-anpnp",
    "name": "Master of Advanced Nursing Practice (Nurse Practitioner)",
    "hasMarketReport": false,
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
  "mc-ap": {
    "code": "mc-ap",
    "name": "Master of Applied Psychology",
    "hasMarketReport": true,
    "exposure": 95.57,
    "entryExposure": 93.63,
    "jirN": 47,
    "nTitles": 15,
    "nMedium": 13,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Applied Psychology",
          "n": 47
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-apling": {
    "code": "mc-apling",
    "name": "Master of Applied Linguistics",
    "hasMarketReport": true,
    "exposure": 88.72,
    "entryExposure": 88.72,
    "jirN": null,
    "nTitles": 7,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 091521 Linguistics",
          "n": null
        }
      ],
      "field": "091521",
      "indexVariant": "AIOE-2021",
      "coverage": 32.9,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "School Teachers nfd",
          "share": 2.857
        }
      ],
      "exposureWeighted": 91.11
    }
  },
  "mc-app": {
    "code": "mc-app",
    "name": "Master of Applied Positive Psychology",
    "hasMarketReport": false,
    "exposure": 89.85,
    "entryExposure": 88.29,
    "jirN": null,
    "nTitles": 12,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 090701 Psychology",
          "n": null
        }
      ],
      "field": "090701",
      "indexVariant": "AIOE-2021",
      "coverage": 36.6,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 91.5
    }
  },
  "mc-archcm": {
    "code": "mc-archcm",
    "name": "Master of Architecture/Master of Construction Management",
    "hasMarketReport": false,
    "exposure": 90.11,
    "entryExposure": 89.75,
    "jirN": 782,
    "nTitles": 30,
    "nMedium": 12,
    "exposureBasis": {
      "tier": "combined",
      "grain": "program-family",
      "sources": [
        {
          "name": "Master of Architecture",
          "n": 621
        },
        {
          "name": "Master of Construction Management",
          "n": 161
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "components: Master of Architecture (exact) ∪ Master of Construction Management (exact)",
      "dominantShare": {
        "name": "Master of Architecture",
        "share": 0.79
      }
    }
  },
  "mc-archeng": {
    "code": "mc-archeng",
    "name": "Master of Architectural Engineering",
    "hasMarketReport": false,
    "exposure": 89.54,
    "entryExposure": 89.53,
    "jirN": 669,
    "nTitles": 30,
    "nMedium": 11,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Architecture",
          "n": 621
        },
        {
          "name": "Master of Civil Engineering",
          "n": 48
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Architectural engineering spans both records.",
      "dominantShare": {
        "name": "Master of Architecture",
        "share": 0.93
      }
    }
  },
  "mc-archuch": {
    "code": "mc-archuch",
    "name": "Master of Architecture/Master of Urban Cultural Heritage",
    "hasMarketReport": false,
    "exposure": 90.34,
    "entryExposure": 89.7,
    "jirN": 751,
    "nTitles": 29,
    "nMedium": 12,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Architecture",
          "n": 621
        },
        {
          "name": "Master of Urban Planning",
          "n": 130
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Double degree; the urban design / urban cultural heritage component has no record and takes Master of Urban Planning as mc-urbdes does.",
      "dominantShare": {
        "name": "Master of Architecture",
        "share": 0.83
      }
    }
  },
  "mc-archud": {
    "code": "mc-archud",
    "name": "Master of Architecture/Master of Urban Design",
    "hasMarketReport": false,
    "exposure": 90.34,
    "entryExposure": 89.7,
    "jirN": 751,
    "nTitles": 29,
    "nMedium": 12,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Architecture",
          "n": 621
        },
        {
          "name": "Master of Urban Planning",
          "n": 130
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Double degree; the urban design / urban cultural heritage component has no record and takes Master of Urban Planning as mc-urbdes does.",
      "dominantShare": {
        "name": "Master of Architecture",
        "share": 0.83
      }
    }
  },
  "mc-archup": {
    "code": "mc-archup",
    "name": "Master of Architecture/Master of Urban Planning",
    "hasMarketReport": false,
    "exposure": 90.34,
    "entryExposure": 89.7,
    "jirN": 751,
    "nTitles": 29,
    "nMedium": 12,
    "exposureBasis": {
      "tier": "combined",
      "grain": "program-family",
      "sources": [
        {
          "name": "Master of Architecture",
          "n": 621
        },
        {
          "name": "Master of Urban Planning",
          "n": 130
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "components: Master of Architecture (exact) ∪ Master of Urban Planning (exact)",
      "dominantShare": {
        "name": "Master of Architecture",
        "share": 0.83
      }
    }
  },
  "mc-arclarc": {
    "code": "mc-arclarc",
    "name": "Master of Architecture/Master of Landscape Architecture",
    "hasMarketReport": true,
    "exposure": 84.75,
    "entryExposure": 81.78,
    "jirN": null,
    "nTitles": 15,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 040101 Architecture",
          "n": null
        }
      ],
      "field": "040101",
      "indexVariant": "AIOE-2021",
      "coverage": 62.6,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 86.31
    }
  },
  "mc-arcprop": {
    "code": "mc-arcprop",
    "name": "Master of Architecture/Master of Property",
    "hasMarketReport": false,
    "exposure": 88.94,
    "entryExposure": 88.29,
    "jirN": 686,
    "nTitles": 30,
    "nMedium": 16,
    "exposureBasis": {
      "tier": "combined",
      "grain": "program-family",
      "sources": [
        {
          "name": "Master of Architecture",
          "n": 621
        },
        {
          "name": "Master of Property",
          "n": 65
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "components: Master of Architecture (exact) ∪ Master of Property (exact)",
      "dominantShare": {
        "name": "Master of Architecture",
        "share": 0.91
      }
    }
  },
  "mc-bamktg": {
    "code": "mc-bamktg",
    "name": "Master of Business Administration/Master of Marketing",
    "hasMarketReport": true,
    "exposure": 88.95,
    "entryExposure": 89.11,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 080301 Business Management",
          "n": null
        }
      ],
      "field": "080301",
      "indexVariant": "AIOE-2021",
      "coverage": 31.1,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 89.47
    }
  },
  "mc-biomeng": {
    "code": "mc-biomeng",
    "name": "Master of Biomedical Engineering",
    "hasMarketReport": false,
    "exposure": 87.13,
    "entryExposure": 87.13,
    "jirN": null,
    "nTitles": 1,
    "nMedium": 0,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 039903 Biomedical Engineering",
          "n": null
        }
      ],
      "field": "039903",
      "indexVariant": "AIOE-2021",
      "coverage": 25,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 87.13
    }
  },
  "mc-biosenh": {
    "code": "mc-biosenh",
    "name": "Master of Biostatistics (Enhanced)",
    "hasMarketReport": true,
    "exposure": 93.92,
    "entryExposure": 93.92,
    "jirN": null,
    "nTitles": 11,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 010103 Statistics",
          "n": null
        }
      ],
      "field": "010103",
      "indexVariant": "AIOE-2021",
      "coverage": 39.1,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 94.97
    }
  },
  "mc-bmedsc": {
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
  "mc-bus": {
    "code": "mc-bus",
    "name": "Master of Business",
    "hasMarketReport": false,
    "exposure": 90.73,
    "entryExposure": 89.56,
    "jirN": 655,
    "nTitles": 13,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Management",
          "n": 655
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Generalist business master; Master of Management family record."
    }
  },
  "mc-cat": {
    "code": "mc-cat",
    "name": "Master of Creative Arts Therapy",
    "hasMarketReport": false,
    "exposure": 76.66,
    "entryExposure": 72.12,
    "jirN": null,
    "nTitles": 12,
    "nMedium": 4,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 069999 Health, n.e.c.",
          "n": null
        }
      ],
      "field": "069999",
      "indexVariant": "AIOE-2021",
      "coverage": 23.9,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Health Information Manager",
          "share": 3.448
        }
      ],
      "exposureWeighted": 75.56
    }
  },
  "mc-chemeng": {
    "code": "mc-chemeng",
    "name": "Master of Chemical Engineering",
    "hasMarketReport": true,
    "exposure": 89.78,
    "entryExposure": 91.16,
    "jirN": 17,
    "nTitles": 10,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Chemical Engineering",
          "n": 17
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-civeng": {
    "code": "mc-civeng",
    "name": "Master of Civil Engineering",
    "hasMarketReport": true,
    "exposure": 91.09,
    "entryExposure": 91.98,
    "jirN": 48,
    "nTitles": 15,
    "nMedium": 4,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Civil Engineering",
          "n": 48
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-climsci": {
    "code": "mc-climsci",
    "name": "Master of Climate Science",
    "hasMarketReport": true,
    "exposure": 83.13,
    "entryExposure": 75.79,
    "jirN": 32,
    "nTitles": 15,
    "nMedium": 9,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Environmental Science",
          "n": 32
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Closest discipline-matched record."
    }
  },
  "mc-clined": {
    "code": "mc-clined",
    "name": "Master of Clinical Education",
    "hasMarketReport": false,
    "exposure": 81.63,
    "entryExposure": 81.63,
    "jirN": null,
    "nTitles": 14,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 070111 Teacher Education: Higher Education",
          "n": null
        }
      ],
      "field": "070111",
      "indexVariant": "AIOE-2021",
      "coverage": 61.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "School Teachers nfd",
          "share": 2.479
        }
      ],
      "exposureWeighted": 83.1
    }
  },
  "mc-clinrhb": {
    "code": "mc-clinrhb",
    "name": "Master of Clinical Rehabilitation",
    "hasMarketReport": false,
    "exposure": 69.41,
    "entryExposure": 69.41,
    "jirN": null,
    "nTitles": 10,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 061799 Rehabilitation Therapies, n.e.c.",
          "n": null
        }
      ],
      "field": "061799",
      "indexVariant": "AIOE-2021",
      "coverage": 56.8,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Music Professionals nec",
          "share": 1.439
        }
      ],
      "exposureWeighted": 73.06
    }
  },
  "mc-cm": {
    "code": "mc-cm",
    "name": "Master of Construction Management",
    "hasMarketReport": true,
    "exposure": 92.22,
    "entryExposure": 92.96,
    "jirN": 161,
    "nTitles": 15,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Construction Management",
          "n": 161
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-cmprop": {
    "code": "mc-cmprop",
    "name": "Master of Construction Management/Master of Property",
    "hasMarketReport": true,
    "exposure": 91.21,
    "entryExposure": 91.08,
    "jirN": 226,
    "nTitles": 29,
    "nMedium": 13,
    "exposureBasis": {
      "tier": "combined",
      "grain": "program-family",
      "sources": [
        {
          "name": "Master of Construction Management",
          "n": 161
        },
        {
          "name": "Master of Property",
          "n": 65
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "components: Master of Construction Management (exact) ∪ Master of Property (exact)",
      "dominantShare": {
        "name": "Master of Construction Management",
        "share": 0.71
      }
    }
  },
  "mc-cncrsc": {
    "code": "mc-cncrsc",
    "name": "Master of Cancer Sciences",
    "hasMarketReport": false,
    "exposure": 75.8,
    "entryExposure": 73.61,
    "jirN": null,
    "nTitles": 12,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 019901 Medical Science",
          "n": null
        }
      ],
      "field": "019901",
      "indexVariant": "AIOE-2021",
      "coverage": 38,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 71.99
    }
  },
  "mc-comact": {
    "code": "mc-comact",
    "name": "Master of Commerce (Accounting)",
    "hasMarketReport": false,
    "exposure": 97.99,
    "entryExposure": 95.4,
    "jirN": 73,
    "nTitles": 15,
    "nMedium": 4,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Management (Accounting)",
          "n": 73
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Discipline-matched accounting master."
    }
  },
  "mc-comacts": {
    "code": "mc-comacts",
    "name": "Master of Commerce (Actuarial Science)",
    "hasMarketReport": false,
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
  "mc-comdrfs": {
    "code": "mc-comdrfs",
    "name": "Master of Commerce (Decision, Risk and Financial Sciences)",
    "hasMarketReport": false,
    "exposure": 97.83,
    "entryExposure": 97.66,
    "jirN": 72,
    "nTitles": 14,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Management (Finance)",
          "n": 72
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Decision, risk and financial sciences — finance discipline."
    }
  },
  "mc-comeco": {
    "code": "mc-comeco",
    "name": "Master of Commerce (Economics)",
    "hasMarketReport": false,
    "exposure": 96.53,
    "entryExposure": 95.84,
    "jirN": 30,
    "nTitles": 15,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Economics",
          "n": 30
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Econometrics/economics discipline."
    }
  },
  "mc-comfin": {
    "code": "mc-comfin",
    "name": "Master of Commerce (Finance)",
    "hasMarketReport": false,
    "exposure": 97.04,
    "entryExposure": 96.99,
    "jirN": 148,
    "nTitles": 15,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Finance",
          "n": 148
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Discipline-matched finance master."
    }
  },
  "mc-commgmt": {
    "code": "mc-commgmt",
    "name": "Master of Commerce (Management)",
    "hasMarketReport": false,
    "exposure": 90.73,
    "entryExposure": 89.56,
    "jirN": 655,
    "nTitles": 13,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Management",
          "n": 655
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Discipline-matched management master."
    }
  },
  "mc-commktg": {
    "code": "mc-commktg",
    "name": "Master of Commerce (Marketing)",
    "hasMarketReport": false,
    "exposure": 96.45,
    "entryExposure": 97.6,
    "jirN": 66,
    "nTitles": 15,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Management (Marketing)",
          "n": 66
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Discipline-matched marketing master."
    }
  },
  "mc-contcs": {
    "code": "mc-contcs",
    "name": "Master of Contemporary Chinese Studies",
    "hasMarketReport": false,
    "exposure": 80.6,
    "entryExposure": 77.79,
    "jirN": null,
    "nTitles": 14,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 099999 Society and Culture, n.e.c.",
          "n": null
        }
      ],
      "field": "099999",
      "indexVariant": "AIOE-2021",
      "coverage": 24.8,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 78.52
    }
  },
  "mc-counsmo": {
    "code": "mc-counsmo",
    "name": "Master of Counselling",
    "hasMarketReport": false,
    "exposure": 87,
    "entryExposure": 87,
    "jirN": null,
    "nTitles": 11,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 090513 Counselling",
          "n": null
        }
      ],
      "field": "090513",
      "indexVariant": "AIOE-2021",
      "coverage": 37.8,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Local Government Legislator",
          "share": 1.61
        }
      ],
      "exposureWeighted": 87.93
    }
  },
  "mc-ctpyart": {
    "code": "mc-ctpyart",
    "name": "Master of Contemporary Art",
    "hasMarketReport": false,
    "exposure": 71.19,
    "entryExposure": 63.73,
    "jirN": null,
    "nTitles": 15,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100301 Fine Arts",
          "n": null
        }
      ],
      "field": "100301",
      "indexVariant": "AIOE-2021",
      "coverage": 25.7,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 69.45
    }
  },
  "mc-cu": {
    "code": "mc-cu",
    "name": "Master of Clinical Ultrasound",
    "hasMarketReport": true,
    "exposure": 70.02,
    "entryExposure": 69.04,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 0615 Radiography",
          "n": null
        }
      ],
      "field": "0615",
      "indexVariant": "AIOE-2021",
      "coverage": 86.5,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 55.53
    }
  },
  "mc-culmc": {
    "code": "mc-culmc",
    "name": "Master of Cultural Materials Conservation",
    "hasMarketReport": true,
    "exposure": 71.38,
    "entryExposure": 68.49,
    "jirN": null,
    "nTitles": 20,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100399 Visual Arts and Crafts, n.e.c.",
          "n": null
        }
      ],
      "field": "100399",
      "indexVariant": "AIOE-2021",
      "coverage": 29.1,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 70.8
    }
  },
  "mc-cybscmo": {
    "code": "mc-cybscmo",
    "name": "Master of Cyber Security",
    "hasMarketReport": false,
    "exposure": 92.91,
    "entryExposure": 93.46,
    "jirN": 373,
    "nTitles": 15,
    "nMedium": 10,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Information Technology",
          "n": 373
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Cyber security is an IT specialisation."
    }
  },
  "mc-desprod": {
    "code": "mc-desprod",
    "name": "Master of Design and Production",
    "hasMarketReport": true,
    "exposure": 72.81,
    "entryExposure": 71.75,
    "jirN": null,
    "nTitles": 19,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100103 Drama and Theatre Studies",
          "n": null
        }
      ],
      "field": "100103",
      "indexVariant": "AIOE-2021",
      "coverage": 45.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 68.55
    }
  },
  "mc-dinfeng": {
    "code": "mc-dinfeng",
    "name": "Master of Digital Infrastructure Engineering",
    "hasMarketReport": false,
    "exposure": 91.09,
    "entryExposure": 91.98,
    "jirN": 48,
    "nTitles": 15,
    "nMedium": 4,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Civil Engineering",
          "n": 48
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Civil/environmental engineering discipline."
    }
  },
  "mc-dmktg": {
    "code": "mc-dmktg",
    "name": "Master of Digital Marketing",
    "hasMarketReport": false,
    "exposure": 96.45,
    "entryExposure": 97.6,
    "jirN": 66,
    "nTitles": 15,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Management (Marketing)",
          "n": 66
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Discipline-matched marketing master."
    }
  },
  "mc-dnce": {
    "code": "mc-dnce",
    "name": "Master of Dance",
    "hasMarketReport": false,
    "exposure": 68.44,
    "entryExposure": 68.44,
    "jirN": null,
    "nTitles": 5,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100105 Dance",
          "n": null
        }
      ],
      "field": "100105",
      "indexVariant": "AIOE-2021",
      "coverage": 33.3,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Dancer or Choreographer",
          "share": 8.889
        }
      ],
      "exposureWeighted": 68.91
    }
  },
  "mc-eco": {
    "code": "mc-eco",
    "name": "Master of Economics",
    "hasMarketReport": true,
    "exposure": 96.53,
    "entryExposure": 95.84,
    "jirN": 30,
    "nTitles": 15,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Economics",
          "n": 30
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-ecosmc": {
    "code": "mc-ecosmc",
    "name": "Master of Ecosystem Management and Conservation",
    "hasMarketReport": false,
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
  "mc-edebt": {
    "code": "mc-edebt",
    "name": "Master of Education in Evidence-Based Teaching",
    "hasMarketReport": false,
    "exposure": 92.44,
    "entryExposure": 94.16,
    "jirN": 611,
    "nTitles": 15,
    "nMedium": 11,
    "exposureBasis": {
      "tier": "variant",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Education",
          "n": 611
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "variant of \"Master of Education\""
    }
  },
  "mc-eleceng": {
    "code": "mc-eleceng",
    "name": "Master of Electrical Engineering",
    "hasMarketReport": false,
    "exposure": 82.73,
    "entryExposure": 84.36,
    "jirN": null,
    "nTitles": 20,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 031301 Electrical Engineering",
          "n": null
        }
      ],
      "field": "031301",
      "indexVariant": "AIOE-2021",
      "coverage": 58.5,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Commissioned Defence Force Officer",
          "share": 1.613
        }
      ],
      "exposureWeighted": 88
    }
  },
  "mc-engysys": {
    "code": "mc-engysys",
    "name": "Master of Energy Systems",
    "hasMarketReport": true,
    "exposure": 91.16,
    "entryExposure": 90.56,
    "jirN": 61,
    "nTitles": 14,
    "nMedium": 10,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Energy Systems",
          "n": 61
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-enrslaw": {
    "code": "mc-enrslaw",
    "name": "Master of Energy and Resources Law",
    "hasMarketReport": false,
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
      "note": "Energy and Resources Law is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
    }
  },
  "mc-ensysen": {
    "code": "mc-ensysen",
    "name": "Master of Environmental Systems Engineering",
    "hasMarketReport": false,
    "exposure": 91.09,
    "entryExposure": 91.98,
    "jirN": 48,
    "nTitles": 15,
    "nMedium": 4,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Civil Engineering",
          "n": 48
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Civil/environmental engineering discipline."
    }
  },
  "mc-entrpsp": {
    "code": "mc-entrpsp",
    "name": "Master of Entrepreneurship",
    "hasMarketReport": true,
    "exposure": 90.73,
    "entryExposure": 89.56,
    "jirN": 655,
    "nTitles": 13,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Management",
          "n": 655
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Business-school master without its own record."
    }
  },
  "mc-env": {
    "code": "mc-env",
    "name": "Master of Environment",
    "hasMarketReport": true,
    "exposure": 89.88,
    "entryExposure": 89.79,
    "jirN": 408,
    "nTitles": 15,
    "nMedium": 9,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Environment",
          "n": 408
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-enveng": {
    "code": "mc-enveng",
    "name": "Master of Environmental Engineering",
    "hasMarketReport": false,
    "exposure": 91.09,
    "entryExposure": 91.98,
    "jirN": 48,
    "nTitles": 15,
    "nMedium": 4,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Civil Engineering",
          "n": 48
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Civil/environmental engineering discipline."
    }
  },
  "mc-envlaw": {
    "code": "mc-envlaw",
    "name": "Master of Environmental Law",
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
      "note": "Environmental Law is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
    }
  },
  "mc-evalo": {
    "code": "mc-evalo",
    "name": "Master of Evaluation",
    "hasMarketReport": true,
    "exposure": 96.58,
    "entryExposure": 94.75,
    "jirN": 86,
    "nTitles": 13,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Evaluation",
          "n": 86
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-filmtv": {
    "code": "mc-filmtv",
    "name": "Master of Film and Television",
    "hasMarketReport": false,
    "exposure": 73.61,
    "entryExposure": 68.98,
    "jirN": null,
    "nTitles": 18,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100701 Audio Visual Studies",
          "n": null
        }
      ],
      "field": "100701",
      "indexVariant": "AIOE-2021",
      "coverage": 31.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 73
    }
  },
  "mc-finance": {
    "code": "mc-finance",
    "name": "Master of Finance",
    "hasMarketReport": true,
    "exposure": 97.04,
    "entryExposure": 96.99,
    "jirN": 148,
    "nTitles": 15,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Finance",
          "n": 148
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-finenh": {
    "code": "mc-finenh",
    "name": "Master of Finance (Enhanced)",
    "hasMarketReport": false,
    "exposure": 97.04,
    "entryExposure": 96.99,
    "jirN": 148,
    "nTitles": 15,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "variant",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Finance",
          "n": 148
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "variant of \"Master of Finance\""
    }
  },
  "mc-foodpi": {
    "code": "mc-foodpi",
    "name": "Master of Food and Packaging Innovation",
    "hasMarketReport": true,
    "exposure": 79.43,
    "entryExposure": 71.85,
    "jirN": 50,
    "nTitles": 15,
    "nMedium": 13,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Food Science",
          "n": 50
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Discipline-matched record."
    }
  },
  "mc-gcclaw": {
    "code": "mc-gcclaw",
    "name": "Master of Global Competition and Consumer Law",
    "hasMarketReport": false,
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
      "note": "Global Competition and Consumer Law is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
    }
  },
  "mc-genohlt": {
    "code": "mc-genohlt",
    "name": "Master of Genomics and Health",
    "hasMarketReport": true,
    "exposure": 87.67,
    "entryExposure": 87.67,
    "jirN": null,
    "nTitles": 1,
    "nMedium": 0,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 010909 Genetics",
          "n": null
        }
      ],
      "field": "010909",
      "indexVariant": "AIOE-2021",
      "coverage": 20,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 87.67
    }
  },
  "mc-geog": {
    "code": "mc-geog",
    "name": "Master of Geography",
    "hasMarketReport": false,
    "exposure": 91.75,
    "entryExposure": 92.61,
    "jirN": 108,
    "nTitles": 13,
    "nMedium": 8,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Bachelor of Arts (Geography)",
          "n": 108
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Discipline-matched major record."
    }
  },
  "mc-geosc": {
    "code": "mc-geosc",
    "name": "Master of Geoscience",
    "hasMarketReport": false,
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
  "mc-gmcom": {
    "code": "mc-gmcom",
    "name": "Master of Global Media Communication",
    "hasMarketReport": true,
    "exposure": 94.8,
    "entryExposure": 94.7,
    "jirN": 67,
    "nTitles": 15,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Global Media Communication",
          "n": 67
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-hrmmo": {
    "code": "mc-hrmmo",
    "name": "Master of Human Resource Management",
    "hasMarketReport": false,
    "exposure": 94.14,
    "entryExposure": 91.75,
    "jirN": 28,
    "nTitles": 15,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Management (Human Resources)",
          "n": 28
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Discipline-matched HR master."
    }
  },
  "mc-humrlaw": {
    "code": "mc-humrlaw",
    "name": "Master of Human Rights Law",
    "hasMarketReport": false,
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
      "note": "Human Rights Law is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
    }
  },
  "mc-ib": {
    "code": "mc-ib",
    "name": "Master of International Business",
    "hasMarketReport": false,
    "exposure": 87.44,
    "entryExposure": 86.65,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 080311 International Business",
          "n": null
        }
      ],
      "field": "080311",
      "indexVariant": "AIOE-2021",
      "coverage": 30.8,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 86.52
    }
  },
  "mc-ibl": {
    "code": "mc-ibl",
    "name": "Master of Indigenous Business Leadership",
    "hasMarketReport": true,
    "exposure": 90.73,
    "entryExposure": 89.56,
    "jirN": 655,
    "nTitles": 13,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Management",
          "n": 655
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Business-school leadership master without its own record."
    }
  },
  "mc-indeng": {
    "code": "mc-indeng",
    "name": "Master of Industrial Engineering",
    "hasMarketReport": true,
    "exposure": 88.8,
    "entryExposure": 87.96,
    "jirN": 113,
    "nTitles": 26,
    "nMedium": 15,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Mechanical Engineering",
          "n": 24
        },
        {
          "name": "Master of Engineering Management",
          "n": 89
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "dfva_jir_map: mechanical engineering / engineering management family.",
      "dominantShare": {
        "name": "Master of Engineering Management",
        "share": 0.79
      }
    }
  },
  "mc-inslead": {
    "code": "mc-inslead",
    "name": "Master of Instructional Leadership",
    "hasMarketReport": true,
    "exposure": 92.27,
    "entryExposure": 91.53,
    "jirN": 64,
    "nTitles": 13,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Instructional Leadership",
          "n": 64
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-intjour": {
    "code": "mc-intjour",
    "name": "Master of International Journalism",
    "hasMarketReport": false,
    "exposure": 91.48,
    "entryExposure": 92.18,
    "jirN": 51,
    "nTitles": 15,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Journalism",
          "n": 51
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Discipline-matched record."
    }
  },
  "mc-ir": {
    "code": "mc-ir",
    "name": "Master of International Relations",
    "hasMarketReport": true,
    "exposure": 95.97,
    "entryExposure": 95.57,
    "jirN": 161,
    "nTitles": 15,
    "nMedium": 9,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of International Relations",
          "n": 161
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-it": {
    "code": "mc-it",
    "name": "Master of Information Technology",
    "hasMarketReport": true,
    "exposure": 92.91,
    "entryExposure": 93.46,
    "jirN": 373,
    "nTitles": 15,
    "nMedium": 10,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Information Technology",
          "n": 373
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-larch": {
    "code": "mc-larch",
    "name": "Master of Landscape Architecture",
    "hasMarketReport": false,
    "exposure": 88.03,
    "entryExposure": 86.66,
    "jirN": 38,
    "nTitles": 15,
    "nMedium": 4,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Landscape Architecture",
          "n": 38
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-larchud": {
    "code": "mc-larchud",
    "name": "Master of Landscape Architecture/Master of Urban Design",
    "hasMarketReport": false,
    "exposure": 92.85,
    "entryExposure": 92.85,
    "jirN": 130,
    "nTitles": 15,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Urban Planning",
          "n": 130
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Double degree; urban design component takes Master of Urban Planning as mc-urbdes does.",
      "excludedSources": [
        {
          "name": "Master of Landscape Architecture",
          "refusedTitles": [
            "Design Assistant"
          ]
        }
      ]
    }
  },
  "mc-larchup": {
    "code": "mc-larchup",
    "name": "Master of Landscape Architecture/Master of Urban Planning",
    "hasMarketReport": false,
    "exposure": 92.85,
    "entryExposure": 92.85,
    "jirN": 130,
    "nTitles": 15,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Urban Planning",
          "n": 130
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Double degree; urban design component takes Master of Urban Planning as mc-urbdes does.",
      "excludedSources": [
        {
          "name": "Master of Landscape Architecture",
          "refusedTitles": [
            "Design Assistant"
          ]
        }
      ]
    }
  },
  "mc-li": {
    "code": "mc-li",
    "name": "Master of Learning Intervention",
    "hasMarketReport": false,
    "exposure": 80.01,
    "entryExposure": 80.01,
    "jirN": null,
    "nTitles": 14,
    "nMedium": 4,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 070113 Teacher Education: Special Education",
          "n": null
        }
      ],
      "field": "070113",
      "indexVariant": "AIOE-2021",
      "coverage": 82.8,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 83.66
    }
  },
  "mc-mecheng": {
    "code": "mc-mecheng",
    "name": "Master of Mechanical Engineering",
    "hasMarketReport": true,
    "exposure": 85.55,
    "entryExposure": 85.82,
    "jirN": 24,
    "nTitles": 13,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Mechanical Engineering",
          "n": 24
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-mgmt": {
    "code": "mc-mgmt",
    "name": "Master of Management",
    "hasMarketReport": true,
    "exposure": 90.73,
    "entryExposure": 89.56,
    "jirN": 655,
    "nTitles": 13,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Management",
          "n": 655
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-mgmtact": {
    "code": "mc-mgmtact",
    "name": "Master of Management (Accounting)",
    "hasMarketReport": true,
    "exposure": 97.99,
    "entryExposure": 95.4,
    "jirN": 73,
    "nTitles": 15,
    "nMedium": 4,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Management (Accounting)",
          "n": 73
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-mgmtafn": {
    "code": "mc-mgmtafn",
    "name": "Master of Management (Accounting and Finance)",
    "hasMarketReport": false,
    "exposure": 90.73,
    "entryExposure": 89.56,
    "jirN": 655,
    "nTitles": 13,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "variant",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Management",
          "n": 655
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "variant of \"Master of Management\""
    }
  },
  "mc-mgmtein": {
    "code": "mc-mgmtein",
    "name": "Master of Management (Entrepreneurship and Innovation)",
    "hasMarketReport": false,
    "exposure": 90.73,
    "entryExposure": 89.56,
    "jirN": 655,
    "nTitles": 13,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "variant",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Management",
          "n": 655
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "variant of \"Master of Management\""
    }
  },
  "mc-mgmtfin": {
    "code": "mc-mgmtfin",
    "name": "Master of Management (Finance)",
    "hasMarketReport": true,
    "exposure": 97.83,
    "entryExposure": 97.66,
    "jirN": 72,
    "nTitles": 14,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Management (Finance)",
          "n": 72
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-mgmthre": {
    "code": "mc-mgmthre",
    "name": "Master of Management (Human Resources)",
    "hasMarketReport": true,
    "exposure": 94.14,
    "entryExposure": 91.75,
    "jirN": 28,
    "nTitles": 15,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Management (Human Resources)",
          "n": 28
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-mgmtmkt": {
    "code": "mc-mgmtmkt",
    "name": "Master of Management (Marketing)",
    "hasMarketReport": true,
    "exposure": 96.45,
    "entryExposure": 97.6,
    "jirN": 66,
    "nTitles": 15,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Management (Marketing)",
          "n": 66
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-mgmtscm": {
    "code": "mc-mgmtscm",
    "name": "Master of Management (Supply Chain Management)",
    "hasMarketReport": true,
    "exposure": 90.73,
    "entryExposure": 89.56,
    "jirN": 655,
    "nTitles": 13,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "variant",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Management",
          "n": 655
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "variant of \"Master of Management\""
    }
  },
  "mc-mktcomm": {
    "code": "mc-mktcomm",
    "name": "Master of Marketing Communications",
    "hasMarketReport": true,
    "exposure": 95.17,
    "entryExposure": 93.55,
    "jirN": 86,
    "nTitles": 15,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Marketing Communications",
          "n": 86
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-mled": {
    "code": "mc-mled",
    "name": "Master of Modern Languages Education",
    "hasMarketReport": false,
    "exposure": 93.99,
    "entryExposure": 95.74,
    "jirN": 26,
    "nTitles": 15,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of TESOL",
          "n": 26
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Languages-education master; TESOL is the nearest language-teaching record."
    }
  },
  "mc-mti": {
    "code": "mc-mti",
    "name": "Master of Medical Technology Innovation",
    "hasMarketReport": true,
    "exposure": 87.13,
    "entryExposure": 87.13,
    "jirN": null,
    "nTitles": 1,
    "nMedium": 0,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 039903 Biomedical Engineering",
          "n": null
        }
      ],
      "field": "039903",
      "indexVariant": "AIOE-2021",
      "coverage": 25,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 87.13
    }
  },
  "mc-mtrneng": {
    "code": "mc-mtrneng",
    "name": "Master of Mechatronics Engineering",
    "hasMarketReport": false,
    "exposure": 83.23,
    "entryExposure": 82.37,
    "jirN": 18,
    "nTitles": 15,
    "nMedium": 8,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Mechatronics Engineering",
          "n": 18
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-musop": {
    "code": "mc-musop",
    "name": "Master of Music (Opera Performance)",
    "hasMarketReport": false,
    "exposure": 70.7,
    "entryExposure": 67.8,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100101 Music",
          "n": null
        }
      ],
      "field": "100101",
      "indexVariant": "AIOE-2021",
      "coverage": 34,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Music Professionals nec",
          "share": 2.372
        }
      ],
      "exposureWeighted": 71.26
    }
  },
  "mc-musorp": {
    "code": "mc-musorp",
    "name": "Master of Music (Orchestral Performance)",
    "hasMarketReport": false,
    "exposure": 70.7,
    "entryExposure": 67.8,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100101 Music",
          "n": null
        }
      ],
      "field": "100101",
      "indexVariant": "AIOE-2021",
      "coverage": 34,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Music Professionals nec",
          "share": 2.372
        }
      ],
      "exposureWeighted": 71.26
    }
  },
  "mc-muspt": {
    "code": "mc-muspt",
    "name": "Master of Music (Performance Teaching)",
    "hasMarketReport": false,
    "exposure": 70.7,
    "entryExposure": 67.8,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100101 Music",
          "n": null
        }
      ],
      "field": "100101",
      "indexVariant": "AIOE-2021",
      "coverage": 34,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Music Professionals nec",
          "share": 2.372
        }
      ],
      "exposureWeighted": 71.26
    }
  },
  "mc-ntcw": {
    "code": "mc-ntcw",
    "name": "Master of Narrative Therapy and Community Work",
    "hasMarketReport": false,
    "exposure": 87,
    "entryExposure": 87,
    "jirN": null,
    "nTitles": 11,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 090513 Counselling",
          "n": null
        }
      ],
      "field": "090513",
      "indexVariant": "AIOE-2021",
      "coverage": 37.8,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Local Government Legislator",
          "share": 1.61
        }
      ],
      "exposureWeighted": 87.93
    }
  },
  "mc-phtypae": {
    "code": "mc-phtypae",
    "name": "Master of Physiotherapy (Paediatrics)",
    "hasMarketReport": false,
    "exposure": 71.03,
    "entryExposure": 72.66,
    "jirN": 448,
    "nTitles": 11,
    "nMedium": 5,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Doctor of Physiotherapy",
          "n": 448
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "As mc-phtyph."
    }
  },
  "mc-privlaw": {
    "code": "mc-privlaw",
    "name": "Master of Private Law",
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
      "note": "Private Law is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
    }
  },
  "mc-propup": {
    "code": "mc-propup",
    "name": "Master of Property/Master of Urban Planning",
    "hasMarketReport": false,
    "exposure": 91.37,
    "entryExposure": 91.03,
    "jirN": 195,
    "nTitles": 30,
    "nMedium": 15,
    "exposureBasis": {
      "tier": "combined",
      "grain": "program-family",
      "sources": [
        {
          "name": "Master of Property",
          "n": 65
        },
        {
          "name": "Master of Urban Planning",
          "n": 130
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "components: Master of Property (exact) ∪ Master of Urban Planning (exact)",
      "dominantShare": {
        "name": "Master of Urban Planning",
        "share": 0.67
      }
    }
  },
  "mc-psyched": {
    "code": "mc-psyched",
    "name": "Master of Psychology (Educational and Developmental)",
    "hasMarketReport": false,
    "exposure": 95.57,
    "entryExposure": 93.63,
    "jirN": 47,
    "nTitles": 15,
    "nMedium": 13,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Applied Psychology",
          "n": 47
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Professional psychology stream; same program-family record the reconciliation package used for 527cl."
    }
  },
  "mc-pubcom": {
    "code": "mc-pubcom",
    "name": "Master of Publishing and Communications",
    "hasMarketReport": true,
    "exposure": 84.04,
    "entryExposure": 83.73,
    "jirN": null,
    "nTitles": 11,
    "nMedium": 0,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100705 Written Communication",
          "n": null
        }
      ],
      "field": "100705",
      "indexVariant": "AIOE-2021",
      "coverage": 30,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 83.69
    }
  },
  "mc-scibif": {
    "code": "mc-scibif",
    "name": "Master of Science (Bioinformatics)",
    "hasMarketReport": true,
    "exposure": 78.62,
    "entryExposure": 76.89,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 0,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 010999 Biological Sciences, n.e.c.",
          "n": null
        }
      ],
      "field": "010999",
      "indexVariant": "AIOE-2021",
      "coverage": 27.5,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 78.24
    }
  },
  "mc-scibio": {
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
  "mc-sciepi": {
    "code": "mc-sciepi",
    "name": "Master of Science (Epidemiology)",
    "hasMarketReport": true,
    "exposure": 89.46,
    "entryExposure": 84.77,
    "jirN": 562,
    "nTitles": 15,
    "nMedium": 8,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Public Health",
          "n": 562
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "dfva_jir_map: Master of Public Health is the program-family record for the epidemiology stream."
    }
  },
  "mc-scimat": {
    "code": "mc-scimat",
    "name": "Master of Science (Mathematics and Statistics)",
    "hasMarketReport": false,
    "exposure": 95.71,
    "entryExposure": 95.18,
    "jirN": 122,
    "nTitles": 15,
    "nMedium": 12,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Bachelor of Science (Mathematics and Statistics)",
          "n": 122
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Discipline-matched major record."
    }
  },
  "mc-scl": {
    "code": "mc-scl",
    "name": "Master of Social Change Leadership",
    "hasMarketReport": true,
    "exposure": 80.6,
    "entryExposure": 77.79,
    "jirN": null,
    "nTitles": 14,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 099999 Society and Culture, n.e.c.",
          "n": null
        }
      ],
      "field": "099999",
      "indexVariant": "AIOE-2021",
      "coverage": 24.8,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 78.52
    }
  },
  "mc-scwr": {
    "code": "mc-scwr",
    "name": "Master of Screenwriting",
    "hasMarketReport": true,
    "exposure": 73.61,
    "entryExposure": 68.98,
    "jirN": null,
    "nTitles": 18,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100701 Audio Visual Studies",
          "n": null
        }
      ],
      "field": "100701",
      "indexVariant": "AIOE-2021",
      "coverage": 31.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 73
    }
  },
  "mc-socw": {
    "code": "mc-socw",
    "name": "Master of Social Work",
    "hasMarketReport": true,
    "exposure": 86.73,
    "entryExposure": 84.59,
    "jirN": 203,
    "nTitles": 15,
    "nMedium": 12,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Social Work",
          "n": 203
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-softeng": {
    "code": "mc-softeng",
    "name": "Master of Software Engineering",
    "hasMarketReport": false,
    "exposure": 83.3,
    "entryExposure": 81.63,
    "jirN": null,
    "nTitles": 14,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 0201 Computer Science",
          "n": null
        }
      ],
      "field": "0201",
      "indexVariant": "AIOE-2021",
      "coverage": 52.1,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 87.21
    }
  },
  "mc-spchpth": {
    "code": "mc-spchpth",
    "name": "Master of Speech Pathology",
    "hasMarketReport": true,
    "exposure": 89.56,
    "entryExposure": 91.37,
    "jirN": 98,
    "nTitles": 14,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Speech Pathology",
          "n": 98
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-spmed": {
    "code": "mc-spmed",
    "name": "Master of Sports Medicine",
    "hasMarketReport": false,
    "exposure": 76.03,
    "entryExposure": 76.03,
    "jirN": null,
    "nTitles": 11,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 060199 Medical Studies, n.e.c.",
          "n": null
        }
      ],
      "field": "060199",
      "indexVariant": "AIOE-2021",
      "coverage": 66.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Health Diagnostic and Promotion Professionals nec",
          "share": 1.504
        }
      ],
      "exposureWeighted": 80.09
    }
  },
  "mc-tchecp": {
    "code": "mc-tchecp",
    "name": "Master of Teaching (Early Childhood and Primary)",
    "hasMarketReport": false,
    "exposure": 77.63,
    "entryExposure": 74.55,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 070101 Teacher Education: Early Childhood",
          "n": null
        }
      ],
      "field": "070101",
      "indexVariant": "AIOE-2021",
      "coverage": 82.4,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 73.19
    }
  },
  "mc-teachec": {
    "code": "mc-teachec",
    "name": "Master of Teaching (Early Childhood)",
    "hasMarketReport": true,
    "exposure": 77.63,
    "entryExposure": 74.55,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 070101 Teacher Education: Early Childhood",
          "n": null
        }
      ],
      "field": "070101",
      "indexVariant": "AIOE-2021",
      "coverage": 82.4,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 73.19
    }
  },
  "mc-teachpr": {
    "code": "mc-teachpr",
    "name": "Master of Teaching (Primary)",
    "hasMarketReport": true,
    "exposure": 87.71,
    "entryExposure": 89.16,
    "jirN": 242,
    "nTitles": 11,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "pooled",
      "grain": "program-family",
      "sources": [
        {
          "name": "Master of Teaching (Secondary)",
          "n": 242
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "union of 2 \"Master of Teaching (…)\" records",
      "excludedSources": [
        {
          "name": "Master of Teaching (Primary)",
          "refusedTitles": [
            "English Teacher"
          ]
        }
      ]
    }
  },
  "mc-teachsa": {
    "code": "mc-teachsa",
    "name": "Master of Teaching (Secondary)",
    "hasMarketReport": true,
    "exposure": 89.03,
    "entryExposure": 92.79,
    "jirN": 242,
    "nTitles": 11,
    "nMedium": 7,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Teaching (Secondary)",
          "n": 242
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-teachsi": {
    "code": "mc-teachsi",
    "name": "Master of Teaching (Secondary) Internship",
    "hasMarketReport": false,
    "exposure": 81.05,
    "entryExposure": 80.93,
    "jirN": null,
    "nTitles": 13,
    "nMedium": 2,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 070105 Teacher Education: Secondary",
          "n": null
        }
      ],
      "field": "070105",
      "indexVariant": "AIOE-2021",
      "coverage": 74.1,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 90.06
    }
  },
  "mc-thtr": {
    "code": "mc-thtr",
    "name": "Master of Theatre",
    "hasMarketReport": false,
    "exposure": 72.81,
    "entryExposure": 71.75,
    "jirN": null,
    "nTitles": 19,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100103 Drama and Theatre Studies",
          "n": null
        }
      ],
      "field": "100103",
      "indexVariant": "AIOE-2021",
      "coverage": 45.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 68.55
    }
  },
  "mc-thtrdir": {
    "code": "mc-thtrdir",
    "name": "Master of Theatre (Directing)",
    "hasMarketReport": false,
    "exposure": 72.81,
    "entryExposure": 71.75,
    "jirN": null,
    "nTitles": 19,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100103 Drama and Theatre Studies",
          "n": null
        }
      ],
      "field": "100103",
      "indexVariant": "AIOE-2021",
      "coverage": 45.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 68.55
    }
  },
  "mc-thtrdra": {
    "code": "mc-thtrdra",
    "name": "Master of Theatre (Dramaturgy)",
    "hasMarketReport": false,
    "exposure": 72.81,
    "entryExposure": 71.75,
    "jirN": null,
    "nTitles": 19,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100103 Drama and Theatre Studies",
          "n": null
        }
      ],
      "field": "100103",
      "indexVariant": "AIOE-2021",
      "coverage": 45.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 68.55
    }
  },
  "mc-thtrwri": {
    "code": "mc-thtrwri",
    "name": "Master of Theatre (Writing)",
    "hasMarketReport": true,
    "exposure": 72.81,
    "entryExposure": 71.75,
    "jirN": null,
    "nTitles": 19,
    "nMedium": 3,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 100103 Drama and Theatre Studies",
          "n": null
        }
      ],
      "field": "100103",
      "indexVariant": "AIOE-2021",
      "coverage": 45.2,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 68.55
    }
  },
  "mc-tranint": {
    "code": "mc-tranint",
    "name": "Master of Translation and Interpreting",
    "hasMarketReport": true,
    "exposure": 89.57,
    "entryExposure": 89.57,
    "jirN": null,
    "nTitles": 5,
    "nMedium": 0,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 091519 Translating and Interpreting",
          "n": null
        }
      ],
      "field": "091519",
      "indexVariant": "AIOE-2021",
      "coverage": 27,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 89.78
    }
  },
  "mc-uch": {
    "code": "mc-uch",
    "name": "Master of Urban and Cultural Heritage",
    "hasMarketReport": false,
    "exposure": 92.85,
    "entryExposure": 92.85,
    "jirN": 130,
    "nTitles": 15,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Urban Planning",
          "n": 130
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Urban and cultural heritage sits in the planning program family."
    }
  },
  "mc-upud": {
    "code": "mc-upud",
    "name": "Master of Urban Planning/Master of Urban Design",
    "hasMarketReport": true,
    "exposure": 92.85,
    "entryExposure": 92.85,
    "jirN": 130,
    "nTitles": 15,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "partial",
      "grain": "related-program",
      "sources": [
        {
          "name": "Master of Urban Planning",
          "n": 130
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Urban design component takes Master of Urban Planning as mc-urbdes does."
    }
  },
  "mc-urpl": {
    "code": "mc-urpl",
    "name": "Master of Urban Planning",
    "hasMarketReport": true,
    "exposure": 92.85,
    "entryExposure": 92.85,
    "jirN": 130,
    "nTitles": 15,
    "nMedium": 6,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Master of Urban Planning",
          "n": 130
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "mc-vetstdr": {
    "code": "mc-vetstdr",
    "name": "Master of Veterinary Studies",
    "hasMarketReport": false,
    "exposure": 62.4,
    "entryExposure": 63.57,
    "jirN": 275,
    "nTitles": 12,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "cognate",
      "grain": "related-program",
      "sources": [
        {
          "name": "Doctor of Veterinary Medicine",
          "n": 275
        }
      ],
      "indexVariant": "AIOE-2021",
      "note": "Veterinary graduate program; DVM is the discipline-matched record."
    }
  },
  "mc-ymhmo": {
    "code": "mc-ymhmo",
    "name": "Master of Youth Mental Health",
    "hasMarketReport": true,
    "exposure": 76.74,
    "entryExposure": 76.43,
    "jirN": null,
    "nTitles": 12,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 061399 Public Health, n.e.c.",
          "n": null
        }
      ],
      "field": "061399",
      "indexVariant": "AIOE-2021",
      "coverage": 37.3,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "excludedTitles": [
        {
          "title": "Health Diagnostic and Promotion Professionals nec",
          "share": 1.99
        }
      ],
      "exposureWeighted": 75.37
    }
  },
  "me-dcd": {
    "code": "me-dcd",
    "name": "Doctor of Clinical Dentistry",
    "hasMarketReport": true,
    "exposure": 60.96,
    "entryExposure": 60.92,
    "jirN": 40,
    "nTitles": 15,
    "nMedium": 9,
    "exposureBasis": {
      "tier": "exact",
      "grain": "program",
      "sources": [
        {
          "name": "Doctor of Clinical Dentistry",
          "n": 40
        }
      ],
      "indexVariant": "AIOE-2021"
    }
  },
  "n01aa": {
    "code": "n01aa",
    "name": "Master of Clinical Research",
    "hasMarketReport": false,
    "exposure": 75.8,
    "entryExposure": 73.61,
    "jirN": null,
    "nTitles": 12,
    "nMedium": 1,
    "exposureBasis": {
      "tier": "field",
      "grain": "field",
      "sources": [
        {
          "name": "JSA HEO · 019901 Medical Science",
          "n": null
        }
      ],
      "field": "019901",
      "indexVariant": "AIOE-2021",
      "coverage": 38,
      "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
      "exposureWeighted": 71.99
    }
  }
};

/** Panel A basis for every program scored on v4, reference cohort included
 *  (their exposure VALUE still comes from v3Programs.ts; this is the label).
 *  The bare tier (no sources/grain) is also carried on V4_INDEX in
 *  v4Meta.ts for the light routes; this full object is for the report page. */
export const V4_PANEL_A_BASIS: Record<string, V4PanelABasis> = {
  "038ab": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Art Curatorship",
        "n": 94
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "080cl": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Applied Psychology",
        "n": 47
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Professional psychology stream; same program-family record the reconciliation package used for 527cl."
  },
  "080cn": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Applied Psychology",
        "n": 47
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Professional psychology stream; same program-family record the reconciliation package used for 527cl."
  },
  "097ab": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Development Studies",
        "n": 104
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "175aa": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Arts and Cultural Management",
        "n": 98
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "192aa": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Laws",
        "n": 676
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "International Tax is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
  },
  "195aa": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Construction Law",
        "n": 88
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "244cw": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Public Health",
        "n": 562
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "274ab": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 099903 Criminology",
        "n": null
      }
    ],
    "field": "099903",
    "indexVariant": "AIOE-2021",
    "coverage": 36.4,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 71.07
  },
  "277aa": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Intellectual Property Law",
        "n": 36
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "294be": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Management (Marketing)",
        "n": 66
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Discipline-matched marketing master."
  },
  "300bb": {
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
  },
  "305bb": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Clinical Audiology",
        "n": 156
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "342aa": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Psychiatry",
        "n": 54
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "344ab": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Public Policy and Management",
        "n": 165
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "439fs": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Food Science",
        "n": 50
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "502cw": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Laws",
        "n": 676
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "504aa": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Commercial Law",
        "n": 63
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "507aa": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Laws",
        "n": 676
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Health and Medical Law is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
  },
  "510aa": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Laws",
        "n": 676
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Employment and Labour Relations Law is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
  },
  "511aa": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Public And International Law",
        "n": 39
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "526aa": {
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
  },
  "527cl": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Applied Psychology",
        "n": 47
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Clinical Psychology stream; the Applied Psychology record is the program-family record used by the reconciliation package (tier partial)."
  },
  "527cn": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Applied Psychology",
        "n": 47
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Professional psychology stream; same program-family record the reconciliation package used for 527cl."
  },
  "635aa": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Laws",
        "n": 676
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Law and Development is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
  },
  "706aa": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Social Policy",
        "n": 66
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "742ab": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Tax",
        "n": 57
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "746st": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Civil Engineering",
        "n": 48
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Engineering Structures is a civil-engineering specialisation; reconciliation package tier partial."
  },
  "761em": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Engineering Management",
        "n": 89
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "841ac": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Bachelor of Oral Health",
        "n": 61
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "872bb": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Doctor of Veterinary Medicine",
        "n": 275
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Veterinary graduate program; DVM is the discipline-matched record."
  },
  "991aa": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 010103 Statistics",
        "n": null
      }
    ],
    "field": "010103",
    "indexVariant": "AIOE-2021",
    "coverage": 39.1,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 94.97
  },
  "b-agr": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 050101 Agricultural Science",
        "n": null
      }
    ],
    "field": "050101",
    "indexVariant": "AIOE-2021",
    "coverage": 41.7,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Mixed Crop and Livestock Farm Worker",
        "share": 2.778
      },
      {
        "title": "Farm, Forestry and Garden Workers nec",
        "share": 2.778
      }
    ],
    "exposureWeighted": 75.38
  },
  "b-arts": {
    "tier": "pooled",
    "grain": "program-family",
    "sources": [
      {
        "name": "Bachelor of Arts (Anthropology)",
        "n": 153
      },
      {
        "name": "Bachelor of Arts (Asian Studies)",
        "n": 43
      },
      {
        "name": "Bachelor of Arts (Economics)",
        "n": 196
      },
      {
        "name": "Bachelor of Arts (Gender Studies)",
        "n": 100
      },
      {
        "name": "Bachelor of Arts (Geography)",
        "n": 108
      },
      {
        "name": "Bachelor of Arts (History)",
        "n": 524
      },
      {
        "name": "Bachelor of Arts (Philosophy)",
        "n": 215
      },
      {
        "name": "Bachelor of Arts (Politics and International",
        "n": 339
      },
      {
        "name": "Bachelor of Arts (Psychology)",
        "n": 859
      },
      {
        "name": "Bachelor of Arts (Screen And Cultural Studies)",
        "n": 59
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "union of 18 \"Bachelor of Arts (…)\" records",
    "excludedSources": [
      {
        "name": "Bachelor of Arts (Ancient World Studies)",
        "refusedTitles": [
          "Collections Assistant"
        ]
      },
      {
        "name": "Bachelor of Arts (Art History)",
        "refusedTitles": [
          "Gallery Attendant",
          "Researcher",
          "Art Consultant"
        ]
      },
      {
        "name": "Bachelor of Arts (Creative Writing)",
        "refusedTitles": [
          "Content Manager"
        ]
      },
      {
        "name": "Bachelor of Arts (Criminology)",
        "refusedTitles": [
          "Justice Officer",
          "Senior Intelligence Analyst Team Leader"
        ]
      },
      {
        "name": "Bachelor of Arts (English and Theatre Studies)",
        "refusedTitles": [
          "Publishing Assistant"
        ]
      },
      {
        "name": "Bachelor of Arts (Indigenous Studies)",
        "refusedTitles": [
          "Indigenous Education Officer"
        ]
      },
      {
        "name": "Bachelor of Arts (Media and Communications)",
        "refusedTitles": [
          "Content Manager"
        ]
      },
      {
        "name": "Bachelor of Arts (Sociology)",
        "refusedTitles": [
          "Youth Advisor"
        ]
      }
    ]
  },
  "b-bmed": {
    "tier": "pooled",
    "grain": "program-family",
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
    "note": "union of 7 \"Bachelor of Biomedicine (…)\" records",
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
  },
  "b-com": {
    "tier": "pooled",
    "grain": "program-family",
    "sources": [
      {
        "name": "Bachelor of Commerce (Accounting)",
        "n": 1693
      },
      {
        "name": "Bachelor of Commerce (Actuarial Studies)",
        "n": 101
      },
      {
        "name": "Bachelor of Commerce (Economics)",
        "n": 1549
      },
      {
        "name": "Bachelor of Commerce (Finance)",
        "n": 3546
      },
      {
        "name": "Bachelor of Commerce (Management)",
        "n": 928
      },
      {
        "name": "Bachelor of Commerce (Marketing)",
        "n": 921
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "union of 6 \"Bachelor of Commerce (…)\" records"
  },
  "b-des": {
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
  },
  "b-faacting": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100103 Drama and Theatre Studies",
        "n": null
      }
    ],
    "field": "100103",
    "indexVariant": "AIOE-2021",
    "coverage": 45.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 68.55
  },
  "b-faanim": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100701 Audio Visual Studies",
        "n": null
      }
    ],
    "field": "100701",
    "indexVariant": "AIOE-2021",
    "coverage": 31.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 73
  },
  "b-fadance": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100105 Dance",
        "n": null
      }
    ],
    "field": "100105",
    "indexVariant": "AIOE-2021",
    "coverage": 33.3,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Dancer or Choreographer",
        "share": 8.889
      }
    ],
    "exposureWeighted": 68.91
  },
  "b-fafilmtv": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100701 Audio Visual Studies",
        "n": null
      }
    ],
    "field": "100701",
    "indexVariant": "AIOE-2021",
    "coverage": 31.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 73
  },
  "b-famusth": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100199 Performing Arts, n.e.c.",
        "n": null
      }
    ],
    "field": "100199",
    "indexVariant": "AIOE-2021",
    "coverage": 30.8,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 79.24
  },
  "b-fapro": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100103 Drama and Theatre Studies",
        "n": null
      }
    ],
    "field": "100103",
    "indexVariant": "AIOE-2021",
    "coverage": 45.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 68.55
  },
  "b-fascwri": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100701 Audio Visual Studies",
        "n": null
      }
    ],
    "field": "100701",
    "indexVariant": "AIOE-2021",
    "coverage": 31.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 73
  },
  "b-fath": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100103 Drama and Theatre Studies",
        "n": null
      }
    ],
    "field": "100103",
    "indexVariant": "AIOE-2021",
    "coverage": 45.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 68.55
  },
  "b-favisart": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100301 Fine Arts",
        "n": null
      }
    ],
    "field": "100301",
    "indexVariant": "AIOE-2021",
    "coverage": 25.7,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 69.45
  },
  "b-mus": {
    "tier": "pooled",
    "grain": "program-family",
    "sources": [
      {
        "name": "Bachelor of Music (Performance)",
        "n": 87
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "union of 1 \"Bachelor of Music (…)\" records"
  },
  "b-sci": {
    "tier": "pooled",
    "grain": "program-family",
    "sources": [
      {
        "name": "Bachelor of Science (Animal Health And Disease)",
        "n": 68
      },
      {
        "name": "Bachelor of Science (Biochemistry and Molecular",
        "n": 141
      },
      {
        "name": "Bachelor of Science (Biotechnology)",
        "n": 113
      },
      {
        "name": "Bachelor of Science (Chemistry)",
        "n": 318
      },
      {
        "name": "Bachelor of Science (Computing And Software",
        "n": 328
      },
      {
        "name": "Bachelor of Science (Data Science)",
        "n": 212
      },
      {
        "name": "Bachelor of Science (Ecology And Evolutionary",
        "n": 48
      },
      {
        "name": "Bachelor of Science (Environmental Science)",
        "n": 90
      },
      {
        "name": "Bachelor of Science (Food Science)",
        "n": 99
      },
      {
        "name": "Bachelor of Science (Genetics)",
        "n": 112
      },
      {
        "name": "Bachelor of Science (Geology)",
        "n": 46
      },
      {
        "name": "Bachelor of Science (Human Structure and",
        "n": 154
      },
      {
        "name": "Bachelor of Science (Mathematical Physics)",
        "n": 56
      },
      {
        "name": "Bachelor of Science (Mathematics and Statistics)",
        "n": 122
      },
      {
        "name": "Bachelor of Science (Microbiology)",
        "n": 54
      },
      {
        "name": "Bachelor of Science (Neuroscience)",
        "n": 373
      },
      {
        "name": "Bachelor of Science (Pathology)",
        "n": 57
      },
      {
        "name": "Bachelor of Science (Pharmacology)",
        "n": 154
      },
      {
        "name": "Bachelor of Science (Physics)",
        "n": 189
      },
      {
        "name": "Bachelor of Science (Physiology)",
        "n": 439
      },
      {
        "name": "Bachelor of Science (Psychology)",
        "n": 351
      },
      {
        "name": "Bachelor of Science (Veterinary Bioscience)",
        "n": 34
      },
      {
        "name": "Bachelor of Science (Zoology)",
        "n": 92
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "union of 23 \"Bachelor of Science (…)\" records"
  },
  "b-sciextd": {
    "tier": "pooled",
    "grain": "program-family",
    "sources": [
      {
        "name": "Bachelor of Science (Animal Health And Disease)",
        "n": 68
      },
      {
        "name": "Bachelor of Science (Biochemistry and Molecular",
        "n": 141
      },
      {
        "name": "Bachelor of Science (Biotechnology)",
        "n": 113
      },
      {
        "name": "Bachelor of Science (Chemistry)",
        "n": 318
      },
      {
        "name": "Bachelor of Science (Computing And Software",
        "n": 328
      },
      {
        "name": "Bachelor of Science (Data Science)",
        "n": 212
      },
      {
        "name": "Bachelor of Science (Ecology And Evolutionary",
        "n": 48
      },
      {
        "name": "Bachelor of Science (Environmental Science)",
        "n": 90
      },
      {
        "name": "Bachelor of Science (Food Science)",
        "n": 99
      },
      {
        "name": "Bachelor of Science (Genetics)",
        "n": 112
      },
      {
        "name": "Bachelor of Science (Geology)",
        "n": 46
      },
      {
        "name": "Bachelor of Science (Human Structure and",
        "n": 154
      },
      {
        "name": "Bachelor of Science (Mathematical Physics)",
        "n": 56
      },
      {
        "name": "Bachelor of Science (Mathematics and Statistics)",
        "n": 122
      },
      {
        "name": "Bachelor of Science (Microbiology)",
        "n": 54
      },
      {
        "name": "Bachelor of Science (Neuroscience)",
        "n": 373
      },
      {
        "name": "Bachelor of Science (Pathology)",
        "n": 57
      },
      {
        "name": "Bachelor of Science (Pharmacology)",
        "n": 154
      },
      {
        "name": "Bachelor of Science (Physics)",
        "n": 189
      },
      {
        "name": "Bachelor of Science (Physiology)",
        "n": 439
      },
      {
        "name": "Bachelor of Science (Psychology)",
        "n": 351
      },
      {
        "name": "Bachelor of Science (Veterinary Bioscience)",
        "n": 34
      },
      {
        "name": "Bachelor of Science (Zoology)",
        "n": 92
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "union of 23 \"Bachelor of Science (…)\" records"
  },
  "d01lf": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100705 Written Communication",
        "n": null
      }
    ],
    "field": "100705",
    "indexVariant": "AIOE-2021",
    "coverage": 30,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 83.69
  },
  "dr-philedp": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Applied Psychology",
        "n": 47
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Professional psychology stream; same program-family record the reconciliation package used for 527cl."
  },
  "j17re": {
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
  },
  "m04aa": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Music Therapy",
        "n": 43
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-actsc": {
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
  },
  "mc-actscen": {
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
  },
  "mc-actscex": {
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
  },
  "mc-adolhw": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 061399 Public Health, n.e.c.",
        "n": null
      }
    ],
    "field": "061399",
    "indexVariant": "AIOE-2021",
    "coverage": 37.3,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Health Diagnostic and Promotion Professionals nec",
        "share": 1.99
      }
    ],
    "exposureWeighted": 75.37
  },
  "mc-advnpph": {
    "tier": "combined",
    "grain": "program-family",
    "sources": [
      {
        "name": "Master of Advanced Nursing Practice",
        "n": 69
      },
      {
        "name": "Master of Public Health",
        "n": 562
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "components: Master of Advanced Nursing Practice (exact) ∪ Master of Public Health (exact)",
    "dominantShare": {
      "name": "Master of Public Health",
      "share": 0.89
    }
  },
  "mc-aecoenh": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Economics",
        "n": 30
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Econometrics/economics discipline."
  },
  "mc-aemtrcs": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Economics",
        "n": 30
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Econometrics/economics discipline."
  },
  "mc-agsc": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 050101 Agricultural Science",
        "n": null
      }
    ],
    "field": "050101",
    "indexVariant": "AIOE-2021",
    "coverage": 41.7,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Mixed Crop and Livestock Farm Worker",
        "share": 2.778
      },
      {
        "title": "Farm, Forestry and Garden Workers nec",
        "share": 2.778
      }
    ],
    "exposureWeighted": 75.38
  },
  "mc-aimo": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Computer Science",
        "n": 41
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "AI is a computer-science specialisation."
  },
  "mc-anamgt": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Management",
        "n": 655
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Business-school analytics master; management family record (as mc-busana)."
  },
  "mc-anp": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Advanced Nursing Practice",
        "n": 69
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-anpnp": {
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
  },
  "mc-ap": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Applied Psychology",
        "n": 47
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-apbusa": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Management",
        "n": 655
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Reconciliation package tier partial."
  },
  "mc-apling": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 091521 Linguistics",
        "n": null
      }
    ],
    "field": "091521",
    "indexVariant": "AIOE-2021",
    "coverage": 32.9,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "School Teachers nfd",
        "share": 2.857
      }
    ],
    "exposureWeighted": 91.11
  },
  "mc-app": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 090701 Psychology",
        "n": null
      }
    ],
    "field": "090701",
    "indexVariant": "AIOE-2021",
    "coverage": 36.6,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 91.5
  },
  "mc-arch": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Architecture",
        "n": 621
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-archcm": {
    "tier": "combined",
    "grain": "program-family",
    "sources": [
      {
        "name": "Master of Architecture",
        "n": 621
      },
      {
        "name": "Master of Construction Management",
        "n": 161
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "components: Master of Architecture (exact) ∪ Master of Construction Management (exact)",
    "dominantShare": {
      "name": "Master of Architecture",
      "share": 0.79
    }
  },
  "mc-archeng": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Architecture",
        "n": 621
      },
      {
        "name": "Master of Civil Engineering",
        "n": 48
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Architectural engineering spans both records.",
    "dominantShare": {
      "name": "Master of Architecture",
      "share": 0.93
    }
  },
  "mc-archuch": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Architecture",
        "n": 621
      },
      {
        "name": "Master of Urban Planning",
        "n": 130
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Double degree; the urban design / urban cultural heritage component has no record and takes Master of Urban Planning as mc-urbdes does.",
    "dominantShare": {
      "name": "Master of Architecture",
      "share": 0.83
    }
  },
  "mc-archud": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Architecture",
        "n": 621
      },
      {
        "name": "Master of Urban Planning",
        "n": 130
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Double degree; the urban design / urban cultural heritage component has no record and takes Master of Urban Planning as mc-urbdes does.",
    "dominantShare": {
      "name": "Master of Architecture",
      "share": 0.83
    }
  },
  "mc-archup": {
    "tier": "combined",
    "grain": "program-family",
    "sources": [
      {
        "name": "Master of Architecture",
        "n": 621
      },
      {
        "name": "Master of Urban Planning",
        "n": 130
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "components: Master of Architecture (exact) ∪ Master of Urban Planning (exact)",
    "dominantShare": {
      "name": "Master of Architecture",
      "share": 0.83
    }
  },
  "mc-arclarc": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 040101 Architecture",
        "n": null
      }
    ],
    "field": "040101",
    "indexVariant": "AIOE-2021",
    "coverage": 62.6,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 86.31
  },
  "mc-arcprop": {
    "tier": "combined",
    "grain": "program-family",
    "sources": [
      {
        "name": "Master of Architecture",
        "n": 621
      },
      {
        "name": "Master of Property",
        "n": 65
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "components: Master of Architecture (exact) ∪ Master of Property (exact)",
    "dominantShare": {
      "name": "Master of Architecture",
      "share": 0.91
    }
  },
  "mc-ba": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Business Administration",
        "n": 422
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-bamktg": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 080301 Business Management",
        "n": null
      }
    ],
    "field": "080301",
    "indexVariant": "AIOE-2021",
    "coverage": 31.1,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 89.47
  },
  "mc-base": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Social Policy",
        "n": 66
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Reconciliation package tier partial."
  },
  "mc-biomeng": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 039903 Biomedical Engineering",
        "n": null
      }
    ],
    "field": "039903",
    "indexVariant": "AIOE-2021",
    "coverage": 25,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 87.13
  },
  "mc-biosenh": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 010103 Statistics",
        "n": null
      }
    ],
    "field": "010103",
    "indexVariant": "AIOE-2021",
    "coverage": 39.1,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 94.97
  },
  "mc-bmedsc": {
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
  },
  "mc-bus": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Management",
        "n": 655
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Generalist business master; Master of Management family record."
  },
  "mc-busana": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Management",
        "n": 655
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Reconciliation package tier partial."
  },
  "mc-cat": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 069999 Health, n.e.c.",
        "n": null
      }
    ],
    "field": "069999",
    "indexVariant": "AIOE-2021",
    "coverage": 23.9,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Health Information Manager",
        "share": 3.448
      }
    ],
    "exposureWeighted": 75.56
  },
  "mc-chemeng": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Chemical Engineering",
        "n": 17
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-civeng": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Civil Engineering",
        "n": 48
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-climsci": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Environmental Science",
        "n": 32
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Closest discipline-matched record."
  },
  "mc-clind": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Doctor of Clinical Dentistry",
        "n": 40
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Same course under its former award title; the JIR record is titled Doctor of Clinical Dentistry."
  },
  "mc-clined": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 070111 Teacher Education: Higher Education",
        "n": null
      }
    ],
    "field": "070111",
    "indexVariant": "AIOE-2021",
    "coverage": 61.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "School Teachers nfd",
        "share": 2.479
      }
    ],
    "exposureWeighted": 83.1
  },
  "mc-clinrhb": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 061799 Rehabilitation Therapies, n.e.c.",
        "n": null
      }
    ],
    "field": "061799",
    "indexVariant": "AIOE-2021",
    "coverage": 56.8,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Music Professionals nec",
        "share": 1.439
      }
    ],
    "exposureWeighted": 73.06
  },
  "mc-cm": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Construction Management",
        "n": 161
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-cmprop": {
    "tier": "combined",
    "grain": "program-family",
    "sources": [
      {
        "name": "Master of Construction Management",
        "n": 161
      },
      {
        "name": "Master of Property",
        "n": 65
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "components: Master of Construction Management (exact) ∪ Master of Property (exact)",
    "dominantShare": {
      "name": "Master of Construction Management",
      "share": 0.71
    }
  },
  "mc-cncrsc": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 019901 Medical Science",
        "n": null
      }
    ],
    "field": "019901",
    "indexVariant": "AIOE-2021",
    "coverage": 38,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 71.99
  },
  "mc-comact": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Management (Accounting)",
        "n": 73
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Discipline-matched accounting master."
  },
  "mc-comacts": {
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
  },
  "mc-comdrfs": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Management (Finance)",
        "n": 72
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Decision, risk and financial sciences — finance discipline."
  },
  "mc-comeco": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Economics",
        "n": 30
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Econometrics/economics discipline."
  },
  "mc-comfin": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Finance",
        "n": 148
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Discipline-matched finance master."
  },
  "mc-commgmt": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Management",
        "n": 655
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Discipline-matched management master."
  },
  "mc-commktg": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Management (Marketing)",
        "n": 66
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Discipline-matched marketing master."
  },
  "mc-contcs": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 099999 Society and Culture, n.e.c.",
        "n": null
      }
    ],
    "field": "099999",
    "indexVariant": "AIOE-2021",
    "coverage": 24.8,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 78.52
  },
  "mc-counsmo": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 090513 Counselling",
        "n": null
      }
    ],
    "field": "090513",
    "indexVariant": "AIOE-2021",
    "coverage": 37.8,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Local Government Legislator",
        "share": 1.61
      }
    ],
    "exposureWeighted": 87.93
  },
  "mc-cs": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Computer Science",
        "n": 41
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-ctpyart": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100301 Fine Arts",
        "n": null
      }
    ],
    "field": "100301",
    "indexVariant": "AIOE-2021",
    "coverage": 25.7,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 69.45
  },
  "mc-cu": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 0615 Radiography",
        "n": null
      }
    ],
    "field": "0615",
    "indexVariant": "AIOE-2021",
    "coverage": 86.5,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 55.53
  },
  "mc-culmc": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100399 Visual Arts and Crafts, n.e.c.",
        "n": null
      }
    ],
    "field": "100399",
    "indexVariant": "AIOE-2021",
    "coverage": 29.1,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 70.8
  },
  "mc-cybscmo": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Information Technology",
        "n": 373
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Cyber security is an IT specialisation."
  },
  "mc-datasc": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Data Science",
        "n": 96
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-ddensur": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Doctor of Dental Surgery",
        "n": 194
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-desprod": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100103 Drama and Theatre Studies",
        "n": null
      }
    ],
    "field": "100103",
    "indexVariant": "AIOE-2021",
    "coverage": 45.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 68.55
  },
  "mc-dinfeng": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Civil Engineering",
        "n": 48
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Civil/environmental engineering discipline."
  },
  "mc-dmed": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Doctor of Medicine",
        "n": 762
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-dmktg": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Management (Marketing)",
        "n": 66
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Discipline-matched marketing master."
  },
  "mc-dnce": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100105 Dance",
        "n": null
      }
    ],
    "field": "100105",
    "indexVariant": "AIOE-2021",
    "coverage": 33.3,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Dancer or Choreographer",
        "share": 8.889
      }
    ],
    "exposureWeighted": 68.91
  },
  "mc-doptom": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Doctor of Optometry",
        "n": 199
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-dphysio": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Doctor of Physiotherapy",
        "n": 448
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-dvetmed": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Doctor of Veterinary Medicine",
        "n": 275
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-eco": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Economics",
        "n": 30
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-ecosmc": {
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
  },
  "mc-ed": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Education",
        "n": 611
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-edebt": {
    "tier": "variant",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Education",
        "n": 611
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "variant of \"Master of Education\""
  },
  "mc-eleceng": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 031301 Electrical Engineering",
        "n": null
      }
    ],
    "field": "031301",
    "indexVariant": "AIOE-2021",
    "coverage": 58.5,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Commissioned Defence Force Officer",
        "share": 1.613
      }
    ],
    "exposureWeighted": 88
  },
  "mc-engysys": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Energy Systems",
        "n": 61
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-enrslaw": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Laws",
        "n": 676
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Energy and Resources Law is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
  },
  "mc-ensysen": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Civil Engineering",
        "n": 48
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Civil/environmental engineering discipline."
  },
  "mc-entrpsp": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Management",
        "n": 655
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Business-school master without its own record."
  },
  "mc-env": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Environment",
        "n": 408
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-enveng": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Civil Engineering",
        "n": 48
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Civil/environmental engineering discipline."
  },
  "mc-envlaw": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Laws",
        "n": 676
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Environmental Law is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
  },
  "mc-envsc": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Environmental Science",
        "n": 32
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-evalo": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Evaluation",
        "n": 86
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-filmtv": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100701 Audio Visual Studies",
        "n": null
      }
    ],
    "field": "100701",
    "indexVariant": "AIOE-2021",
    "coverage": 31.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 73
  },
  "mc-finance": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Finance",
        "n": 148
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-finenh": {
    "tier": "variant",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Finance",
        "n": 148
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "variant of \"Master of Finance\""
  },
  "mc-foodpi": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Food Science",
        "n": 50
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Discipline-matched record."
  },
  "mc-gcclaw": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Laws",
        "n": 676
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Global Competition and Consumer Law is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
  },
  "mc-gencoun": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Genetic Counselling",
        "n": 35
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-genohlt": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 010909 Genetics",
        "n": null
      }
    ],
    "field": "010909",
    "indexVariant": "AIOE-2021",
    "coverage": 20,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 87.67
  },
  "mc-geog": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Bachelor of Arts (Geography)",
        "n": 108
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Discipline-matched major record."
  },
  "mc-geosc": {
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
  },
  "mc-gmcom": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Global Media Communication",
        "n": 67
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-hrmmo": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Management (Human Resources)",
        "n": 28
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Discipline-matched HR master."
  },
  "mc-humrlaw": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Laws",
        "n": 676
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Human Rights Law is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
  },
  "mc-ib": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 080311 International Business",
        "n": null
      }
    ],
    "field": "080311",
    "indexVariant": "AIOE-2021",
    "coverage": 30.8,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 86.52
  },
  "mc-ibl": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Management",
        "n": 655
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Business-school leadership master without its own record."
  },
  "mc-indeng": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Mechanical Engineering",
        "n": 24
      },
      {
        "name": "Master of Engineering Management",
        "n": 89
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "dfva_jir_map: mechanical engineering / engineering management family.",
    "dominantShare": {
      "name": "Master of Engineering Management",
      "share": 0.79
    }
  },
  "mc-inslead": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Instructional Leadership",
        "n": 64
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-intedib": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Education",
        "n": 611
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Reconciliation package tier partial."
  },
  "mc-intjour": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Journalism",
        "n": 51
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Discipline-matched record."
  },
  "mc-ir": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of International Relations",
        "n": 161
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-is": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Information Systems",
        "n": 257
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-it": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Information Technology",
        "n": 373
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-journ": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Journalism",
        "n": 51
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-jurisd": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Juris Doctor",
        "n": 1277
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-larch": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Landscape Architecture",
        "n": 38
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-larchud": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Urban Planning",
        "n": 130
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Double degree; urban design component takes Master of Urban Planning as mc-urbdes does.",
    "excludedSources": [
      {
        "name": "Master of Landscape Architecture",
        "refusedTitles": [
          "Design Assistant"
        ]
      }
    ]
  },
  "mc-larchup": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Urban Planning",
        "n": 130
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Double degree; urban design component takes Master of Urban Planning as mc-urbdes does.",
    "excludedSources": [
      {
        "name": "Master of Landscape Architecture",
        "refusedTitles": [
          "Design Assistant"
        ]
      }
    ]
  },
  "mc-li": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 070113 Teacher Education: Special Education",
        "n": null
      }
    ],
    "field": "070113",
    "indexVariant": "AIOE-2021",
    "coverage": 82.8,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 83.66
  },
  "mc-mecheng": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Mechanical Engineering",
        "n": 24
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-mgmt": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Management",
        "n": 655
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-mgmtact": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Management (Accounting)",
        "n": 73
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-mgmtafn": {
    "tier": "variant",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Management",
        "n": 655
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "variant of \"Master of Management\""
  },
  "mc-mgmtein": {
    "tier": "variant",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Management",
        "n": 655
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "variant of \"Master of Management\""
  },
  "mc-mgmtfin": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Management (Finance)",
        "n": 72
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-mgmthre": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Management (Human Resources)",
        "n": 28
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-mgmtmkt": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Management (Marketing)",
        "n": 66
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-mgmtscm": {
    "tier": "variant",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Management",
        "n": 655
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "variant of \"Master of Management\""
  },
  "mc-mktcomm": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Marketing Communications",
        "n": 86
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-mled": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of TESOL",
        "n": 26
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Languages-education master; TESOL is the nearest language-teaching record."
  },
  "mc-mti": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 039903 Biomedical Engineering",
        "n": null
      }
    ],
    "field": "039903",
    "indexVariant": "AIOE-2021",
    "coverage": 25,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 87.13
  },
  "mc-mtrneng": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Mechatronics Engineering",
        "n": 18
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-musop": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100101 Music",
        "n": null
      }
    ],
    "field": "100101",
    "indexVariant": "AIOE-2021",
    "coverage": 34,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Music Professionals nec",
        "share": 2.372
      }
    ],
    "exposureWeighted": 71.26
  },
  "mc-musorp": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100101 Music",
        "n": null
      }
    ],
    "field": "100101",
    "indexVariant": "AIOE-2021",
    "coverage": 34,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Music Professionals nec",
        "share": 2.372
      }
    ],
    "exposureWeighted": 71.26
  },
  "mc-muspt": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100101 Music",
        "n": null
      }
    ],
    "field": "100101",
    "indexVariant": "AIOE-2021",
    "coverage": 34,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Music Professionals nec",
        "share": 2.372
      }
    ],
    "exposureWeighted": 71.26
  },
  "mc-ntcw": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 090513 Counselling",
        "n": null
      }
    ],
    "field": "090513",
    "indexVariant": "AIOE-2021",
    "coverage": 37.8,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Local Government Legislator",
        "share": 1.61
      }
    ],
    "exposureWeighted": 87.93
  },
  "mc-nursc": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Nursing Science",
        "n": 129
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-phtypae": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Doctor of Physiotherapy",
        "n": 448
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "As mc-phtyph."
  },
  "mc-phtyph": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Doctor of Physiotherapy",
        "n": 448
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Reconciliation package tier cognate."
  },
  "mc-privlaw": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Laws",
        "n": 676
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Private Law is a Melbourne Law Masters specialisation; the Master of Laws record (n=676) is the program-family record, as the reconciliation package did for specialisation streams."
  },
  "mc-prop": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Property",
        "n": 65
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-propsyc": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Professional Psychology,",
        "n": 66
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-propup": {
    "tier": "combined",
    "grain": "program-family",
    "sources": [
      {
        "name": "Master of Property",
        "n": 65
      },
      {
        "name": "Master of Urban Planning",
        "n": 130
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "components: Master of Property (exact) ∪ Master of Urban Planning (exact)",
    "dominantShare": {
      "name": "Master of Urban Planning",
      "share": 0.67
    }
  },
  "mc-psyched": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Applied Psychology",
        "n": 47
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Professional psychology stream; same program-family record the reconciliation package used for 527cl."
  },
  "mc-pubcom": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100705 Written Communication",
        "n": null
      }
    ],
    "field": "100705",
    "indexVariant": "AIOE-2021",
    "coverage": 30,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 83.69
  },
  "mc-scibif": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 010999 Biological Sciences, n.e.c.",
        "n": null
      }
    ],
    "field": "010999",
    "indexVariant": "AIOE-2021",
    "coverage": 27.5,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 78.24
  },
  "mc-scibio": {
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
  },
  "mc-scibit": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Biotechnology",
        "n": 151
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-sciche": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Bachelor of Science (Chemistry)",
        "n": 318
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Reconciliation package tier cognate (discipline-matched bachelor major)."
  },
  "mc-sciear": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Bachelor of Science (Geology)",
        "n": 46
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Reconciliation package tier cognate."
  },
  "mc-sciepi": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Public Health",
        "n": 562
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "dfva_jir_map: Master of Public Health is the program-family record for the epidemiology stream."
  },
  "mc-scimat": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Bachelor of Science (Mathematics and Statistics)",
        "n": 122
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Discipline-matched major record."
  },
  "mc-sciphy": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Bachelor of Science (Physics)",
        "n": 189
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Reconciliation package tier cognate."
  },
  "mc-scl": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 099999 Society and Culture, n.e.c.",
        "n": null
      }
    ],
    "field": "099999",
    "indexVariant": "AIOE-2021",
    "coverage": 24.8,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 78.52
  },
  "mc-scwr": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100701 Audio Visual Studies",
        "n": null
      }
    ],
    "field": "100701",
    "indexVariant": "AIOE-2021",
    "coverage": 31.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 73
  },
  "mc-socw": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Social Work",
        "n": 203
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-softeng": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 0201 Computer Science",
        "n": null
      }
    ],
    "field": "0201",
    "indexVariant": "AIOE-2021",
    "coverage": 52.1,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 87.21
  },
  "mc-spchpth": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Speech Pathology",
        "n": 98
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-spmed": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 060199 Medical Studies, n.e.c.",
        "n": null
      }
    ],
    "field": "060199",
    "indexVariant": "AIOE-2021",
    "coverage": 66.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Health Diagnostic and Promotion Professionals nec",
        "share": 1.504
      }
    ],
    "exposureWeighted": 80.09
  },
  "mc-surged": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Education",
        "n": 611
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Reconciliation package tier partial."
  },
  "mc-tchecp": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 070101 Teacher Education: Early Childhood",
        "n": null
      }
    ],
    "field": "070101",
    "indexVariant": "AIOE-2021",
    "coverage": 82.4,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 73.19
  },
  "mc-teachec": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 070101 Teacher Education: Early Childhood",
        "n": null
      }
    ],
    "field": "070101",
    "indexVariant": "AIOE-2021",
    "coverage": 82.4,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 73.19
  },
  "mc-teachpr": {
    "tier": "pooled",
    "grain": "program-family",
    "sources": [
      {
        "name": "Master of Teaching (Secondary)",
        "n": 242
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "union of 2 \"Master of Teaching (…)\" records",
    "excludedSources": [
      {
        "name": "Master of Teaching (Primary)",
        "refusedTitles": [
          "English Teacher"
        ]
      }
    ]
  },
  "mc-teachsa": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Teaching (Secondary)",
        "n": 242
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-teachsi": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 070105 Teacher Education: Secondary",
        "n": null
      }
    ],
    "field": "070105",
    "indexVariant": "AIOE-2021",
    "coverage": 74.1,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 90.06
  },
  "mc-tesol": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of TESOL",
        "n": 26
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-thtr": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100103 Drama and Theatre Studies",
        "n": null
      }
    ],
    "field": "100103",
    "indexVariant": "AIOE-2021",
    "coverage": 45.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 68.55
  },
  "mc-thtrdir": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100103 Drama and Theatre Studies",
        "n": null
      }
    ],
    "field": "100103",
    "indexVariant": "AIOE-2021",
    "coverage": 45.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 68.55
  },
  "mc-thtrdra": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100103 Drama and Theatre Studies",
        "n": null
      }
    ],
    "field": "100103",
    "indexVariant": "AIOE-2021",
    "coverage": 45.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 68.55
  },
  "mc-thtrwri": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 100103 Drama and Theatre Studies",
        "n": null
      }
    ],
    "field": "100103",
    "indexVariant": "AIOE-2021",
    "coverage": 45.2,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 68.55
  },
  "mc-tranint": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 091519 Translating and Interpreting",
        "n": null
      }
    ],
    "field": "091519",
    "indexVariant": "AIOE-2021",
    "coverage": 27,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 89.78
  },
  "mc-uch": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Urban Planning",
        "n": 130
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Urban and cultural heritage sits in the planning program family."
  },
  "mc-upud": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Urban Planning",
        "n": 130
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Urban design component takes Master of Urban Planning as mc-urbdes does."
  },
  "mc-urbdes": {
    "tier": "partial",
    "grain": "related-program",
    "sources": [
      {
        "name": "Master of Urban Planning",
        "n": 130
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Reconciliation package tier partial."
  },
  "mc-urbhort": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Urban Horticulture",
        "n": 44
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-urpl": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Master of Urban Planning",
        "n": 130
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "mc-vetstdr": {
    "tier": "cognate",
    "grain": "related-program",
    "sources": [
      {
        "name": "Doctor of Veterinary Medicine",
        "n": 275
      }
    ],
    "indexVariant": "AIOE-2021",
    "note": "Veterinary graduate program; DVM is the discipline-matched record."
  },
  "mc-ymhmo": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 061399 Public Health, n.e.c.",
        "n": null
      }
    ],
    "field": "061399",
    "indexVariant": "AIOE-2021",
    "coverage": 37.3,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "excludedTitles": [
      {
        "title": "Health Diagnostic and Promotion Professionals nec",
        "share": 1.99
      }
    ],
    "exposureWeighted": 75.37
  },
  "me-dcd": {
    "tier": "exact",
    "grain": "program",
    "sources": [
      {
        "name": "Doctor of Clinical Dentistry",
        "n": 40
      }
    ],
    "indexVariant": "AIOE-2021"
  },
  "n01aa": {
    "tier": "field",
    "grain": "field",
    "sources": [
      {
        "name": "JSA HEO · 019901 Medical Science",
        "n": null
      }
    ],
    "field": "019901",
    "indexVariant": "AIOE-2021",
    "coverage": 38,
    "note": "field-of-education occupation list (ATO-linked), not this program's own graduates",
    "exposureWeighted": 71.99
  }
};

export const v4PanelABasisByCode = (code: string): V4PanelABasis | undefined =>
  V4_PANEL_A_BASIS[code.toLowerCase()];

export const v4OnlyProgramByCode = (code: string): V4OnlyProgram | undefined =>
  V4_ONLY_PROGRAMS[code.toLowerCase()];
