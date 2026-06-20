// AUTO-GENERATED from dfva/source/evidence/*.json — do not edit by hand.
// Run `npm --prefix scripts run dfva:gen` to regenerate.

export interface DimensionRecommendation {
  action: string
  priority?: string
  effort?: string
  dimRefs?: string[]
}

export interface DimensionEvidence {
  rationale: string
  recommendations: DimensionRecommendation[]
}

export const DIMENSION_EVIDENCE: Record<string, Record<string, DimensionEvidence>> = {
  "dfva-b-des": {
    "D1": {
      "rationale": "Market signals show junior production tasks are rapidly automated and bundled, increasing substitution risk for artifact-only roles.",
      "recommendations": [
        {
          "action": "Require industry-linked projects with real client/accountability exposure (mandate live-client capstone for all students)",
          "priority": "P3",
          "effort": "High",
          "dimRefs": [
            "D4",
            "D1",
            "B"
          ]
        },
        {
          "action": "Update careers advising framing to AI workflow director / design strategist / AI product designer, away from junior graphic/UX designer destinations",
          "priority": "P8",
          "effort": "Low",
          "dimRefs": [
            "D1",
            "D9"
          ]
        }
      ]
    },
    "D2": {
      "rationale": "System framing appears in design pedagogy, but hiring signals indicate stronger explicit systems accountability is now expected.",
      "recommendations": []
    },
    "D3": {
      "rationale": "Job-family signals increasingly favour hybrid design + analytics/technical literacy beyond current baseline undergraduate depth.",
      "recommendations": [
        {
          "action": "Create mandatory unit Design and Technology Integration: prototyping tools (Figma advanced, Framer, Webflow), front-end literacy (HTML/CSS/JS concepts), data visualisation, design systems governance",
          "priority": "P2",
          "effort": "High",
          "dimRefs": [
            "D3",
            "B"
          ]
        },
        {
          "action": "Add quantitative design research component to research methods unit: usability testing statistics, survey design and analysis, A/B test interpretation, analytics literacy",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D7",
            "D3"
          ]
        },
        {
          "action": "Audit and strengthen Interaction Design specialisation: add WCAG 2.2 AA, platform design systems, and AI interaction pattern design",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D6",
            "D3"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "Demand for defended trade-offs is increasing; current evidence suggests partial but uneven preparation.",
      "recommendations": [
        {
          "action": "Require industry-linked projects with real client/accountability exposure (mandate live-client capstone for all students)",
          "priority": "P3",
          "effort": "High",
          "dimRefs": [
            "D4",
            "D1",
            "B"
          ]
        }
      ]
    },
    "D5": {
      "rationale": "Hiring and discourse both indicate governance and verification are becoming core, yet this is not consistently embedded as mandatory capability.",
      "recommendations": [
        {
          "action": "Create mandatory core unit AI in Design Practice: AI tool evaluation, AI output critique, prompt governance, IP and copyright in AI-assisted design, human-centred AI workflow design, ethical frameworks",
          "priority": "P1",
          "effort": "High",
          "dimRefs": [
            "D5",
            "D9",
            "B"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "Clear pathway specialisation exists, but undergraduate level limits full professional depth.",
      "recommendations": [
        {
          "action": "Audit and strengthen Interaction Design specialisation: add WCAG 2.2 AA, platform design systems, and AI interaction pattern design",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D6",
            "D3"
          ]
        }
      ]
    },
    "D7": {
      "rationale": "Market demand for evidence-backed design decisions is rising; primary-method rigour remains inconsistent across pathways.",
      "recommendations": [
        {
          "action": "Add quantitative design research component to research methods unit: usability testing statistics, survey design and analysis, A/B test interpretation, analytics literacy",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D7",
            "D3"
          ]
        }
      ]
    },
    "D8": {
      "rationale": "Critiques, collaboration, and stakeholder communication are meaningful parts of design training.",
      "recommendations": []
    },
    "D9": {
      "rationale": "Program appears current structurally; evidence of fully AI-native redesign is limited.",
      "recommendations": [
        {
          "action": "Create mandatory core unit AI in Design Practice: AI tool evaluation, AI output critique, prompt governance, IP and copyright in AI-assisted design, human-centred AI workflow design, ethical frameworks",
          "priority": "P1",
          "effort": "High",
          "dimRefs": [
            "D5",
            "D9",
            "B"
          ]
        },
        {
          "action": "Establish MSD design industry advisory panel (8-10 members from design consultancies, tech product companies, government design teams, creative agencies, AI product companies)",
          "priority": "P7",
          "effort": "Medium",
          "dimRefs": [
            "D9",
            "D10"
          ]
        },
        {
          "action": "Update careers advising framing to AI workflow director / design strategist / AI product designer, away from junior graphic/UX designer destinations",
          "priority": "P8",
          "effort": "Low",
          "dimRefs": [
            "D1",
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "Employer-side differentiation is increasingly capability-specific, but outcome visibility is still broad rather than role/task granular.",
      "recommendations": [
        {
          "action": "Publish specialisation-level graduate destination data: role titles, industries, salary bands, time-to-employment within 12 months of each graduating cohort",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        },
        {
          "action": "Establish MSD design industry advisory panel (8-10 members from design consultancies, tech product companies, government design teams, creative agencies, AI product companies)",
          "priority": "P7",
          "effort": "Medium",
          "dimRefs": [
            "D9",
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "Cross-domain design + contextual judgment can differentiate graduates when developed intentionally.",
      "recommendations": [
        {
          "action": "Create mandatory core unit AI in Design Practice: AI tool evaluation, AI output critique, prompt governance, IP and copyright in AI-assisted design, human-centred AI workflow design, ethical frameworks",
          "priority": "P1",
          "effort": "High",
          "dimRefs": [
            "D5",
            "D9",
            "B"
          ]
        },
        {
          "action": "Create mandatory unit Design and Technology Integration: prototyping tools (Figma advanced, Framer, Webflow), front-end literacy (HTML/CSS/JS concepts), data visualisation, design systems governance",
          "priority": "P2",
          "effort": "High",
          "dimRefs": [
            "D3",
            "B"
          ]
        },
        {
          "action": "Require industry-linked projects with real client/accountability exposure (mandate live-client capstone for all students)",
          "priority": "P3",
          "effort": "High",
          "dimRefs": [
            "D4",
            "D1",
            "B"
          ]
        }
      ]
    }
  },
  "dfva-b-sci": {
    "D1": {
      "rationale": "Cluster B graduates land in data/computational roles with meaningful judgment requirements; Cluster A and C graduates face higher early-career routine work exposure. Overall: mixed profile — not all templated, but entry is uneven.",
      "recommendations": [
        {
          "action": "Mandate the Research Project for all students — require primary data generation, defended methodology, failure-mode and limitation analysis, and one AI-tool use reflection",
          "priority": "P2",
          "effort": "High",
          "dimRefs": [
            "D4",
            "D1",
            "D7",
            "B"
          ]
        },
        {
          "action": "Make Science Internship a core elective requirement — require decision-making reflection, AI tool use log, and client or supervisor accountability statement",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D4",
            "D8",
            "D1"
          ]
        },
        {
          "action": "Publish major-level graduate destination data — role-title, industry, salary band, and postgraduate study rate at major level within 12 months of graduation cohort",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D10",
            "D1"
          ]
        },
        {
          "action": "Introduce AI substitution pressure framing into major selection advising — update all major selection guides and careers advising to address automation exposure by cluster",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "D1",
            "D9"
          ]
        }
      ]
    },
    "D2": {
      "rationale": "Science methodology teaches hypothesis formation and experimental design — genuine systems thinking. However, integration across the degree varies by major; not all majors embed failure-mode or trade-off reasoning consistently.",
      "recommendations": []
    },
    "D3": {
      "rationale": "This is the degree's strongest dimension. Majors in Mathematics, Statistics, Physics, and Chemistry carry genuine technical rigour assessed at depth. Even life sciences majors require quantitative methods. Third-year units are substantively demanding.",
      "recommendations": []
    },
    "D4": {
      "rationale": "Experimental science inherently involves uncertainty. However, authentic capstone projects with real stakes are not mandatory — the Research Project is available but not required. Many students graduate without a live uncertainty assessment.",
      "recommendations": [
        {
          "action": "Mandate the Research Project for all students — require primary data generation, defended methodology, failure-mode and limitation analysis, and one AI-tool use reflection",
          "priority": "P2",
          "effort": "High",
          "dimRefs": [
            "D4",
            "D1",
            "D7",
            "B"
          ]
        },
        {
          "action": "Make Science Internship a core elective requirement — require decision-making reflection, AI tool use log, and client or supervisor accountability statement",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D4",
            "D8",
            "D1"
          ]
        },
        {
          "action": "Introduce graduation portfolio requirement — graduates document one primary research artifact, one AI tool governance reflection, and one stakeholder communication piece before graduation",
          "priority": "P8",
          "effort": "Medium",
          "dimRefs": [
            "D4",
            "D8",
            "B"
          ]
        }
      ]
    },
    "D5": {
      "rationale": "No mandatory AI literacy or governance unit across the degree. AI appears in some computational majors (Computing and Software Systems, Data Science major) as tooling, but no governance or deployment framework is embedded at degree level.",
      "recommendations": [
        {
          "action": "Create mandatory core unit: AI in Scientific Research — AI tool evaluation methodology, model limitation and bias analysis, research integrity in AI-assisted science, reproducibility requirements, and NIST AI RMF applied to research contexts",
          "priority": "P1",
          "effort": "High",
          "dimRefs": [
            "D5",
            "D9",
            "B"
          ]
        },
        {
          "action": "Create mandatory science communication and ethics unit — assessed through a stakeholder-facing deliverable (policy brief, public explainer, or client-facing research translation report)",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D8",
            "D5",
            "B"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "The major structure provides genuine specialisation. Third-year depth in Physics, Chemistry, Biochemistry, or Mathematics is substantive and not easily replicated. Domain depth is a real differentiator — especially for Cluster B and Cluster C.",
      "recommendations": []
    },
    "D7": {
      "rationale": "Scientific method is core curriculum. All majors include experimental design, data collection, and interpretation. Third-year research projects and laboratory units involve primary data generation. Honours stream adds full research methodology rigour.",
      "recommendations": [
        {
          "action": "Mandate the Research Project for all students — require primary data generation, defended methodology, failure-mode and limitation analysis, and one AI-tool use reflection",
          "priority": "P2",
          "effort": "High",
          "dimRefs": [
            "D4",
            "D1",
            "D7",
            "B"
          ]
        }
      ]
    },
    "D8": {
      "rationale": "Science degrees historically under-invest in interpersonal, ethical, and stakeholder capability. Breadth subjects provide some exposure but this is not assessed as a core competency. Ethics appears in some majors (genetics, ecology) but lightly.",
      "recommendations": [
        {
          "action": "Create mandatory science communication and ethics unit — assessed through a stakeholder-facing deliverable (policy brief, public explainer, or client-facing research translation report)",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D8",
            "D5",
            "B"
          ]
        },
        {
          "action": "Make Science Internship a core elective requirement — require decision-making reflection, AI tool use log, and client or supervisor accountability statement",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D4",
            "D8",
            "D1"
          ]
        },
        {
          "action": "Introduce graduation portfolio requirement — graduates document one primary research artifact, one AI tool governance reflection, and one stakeholder communication piece before graduation",
          "priority": "P8",
          "effort": "Medium",
          "dimRefs": [
            "D4",
            "D8",
            "B"
          ]
        }
      ]
    },
    "D9": {
      "rationale": "2026 handbook reflects ongoing review; some majors have integrated data science and computational tools. However, no degree-level AI core unit is visible — a significant currency gap given the pace of AI tooling in scientific research.",
      "recommendations": [
        {
          "action": "Create mandatory core unit: AI in Scientific Research — AI tool evaluation methodology, model limitation and bias analysis, research integrity in AI-assisted science, reproducibility requirements, and NIST AI RMF applied to research contexts",
          "priority": "P1",
          "effort": "High",
          "dimRefs": [
            "D5",
            "D9",
            "B"
          ]
        },
        {
          "action": "Introduce AI substitution pressure framing into major selection advising — update all major selection guides and careers advising to address automation exposure by cluster",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "D1",
            "D9"
          ]
        },
        {
          "action": "Establish Faculty of Science curriculum advisory panel — 8–10 members from CSIRO, APS, ANZ biotech/pharma, environmental consulting, AI research institute, and science communication",
          "priority": "P7",
          "effort": "Medium",
          "dimRefs": [
            "D9",
            "D10"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "UniMelb publishes graduate outcome data at faculty level; Science faculty data shows destination distribution but lacks role-title and salary granularity at major level. Partial transparency.",
      "recommendations": [
        {
          "action": "Publish major-level graduate destination data — role-title, industry, salary band, and postgraduate study rate at major level within 12 months of graduation cohort",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D10",
            "D1"
          ]
        },
        {
          "action": "Establish Faculty of Science curriculum advisory panel — 8–10 members from CSIRO, APS, ANZ biotech/pharma, environmental consulting, AI research institute, and science communication",
          "priority": "P7",
          "effort": "Medium",
          "dimRefs": [
            "D9",
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "The B-Sci carries genuine dual-skill value for Cluster B graduates (quantitative + domain science). Physical and life science graduates have domain depth that creates non-trivial automation resistance in specialist roles. Generalist graduates without postgrad study are weakly differentiated.",
      "recommendations": [
        {
          "action": "Create mandatory core unit: AI in Scientific Research — AI tool evaluation methodology, model limitation and bias analysis, research integrity in AI-assisted science, reproducibility requirements, and NIST AI RMF applied to research contexts",
          "priority": "P1",
          "effort": "High",
          "dimRefs": [
            "D5",
            "D9",
            "B"
          ]
        },
        {
          "action": "Mandate the Research Project for all students — require primary data generation, defended methodology, failure-mode and limitation analysis, and one AI-tool use reflection",
          "priority": "P2",
          "effort": "High",
          "dimRefs": [
            "D4",
            "D1",
            "D7",
            "B"
          ]
        },
        {
          "action": "Create mandatory science communication and ethics unit — assessed through a stakeholder-facing deliverable (policy brief, public explainer, or client-facing research translation report)",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D8",
            "D5",
            "B"
          ]
        },
        {
          "action": "Introduce graduation portfolio requirement — graduates document one primary research artifact, one AI tool governance reflection, and one stakeholder communication piece before graduation",
          "priority": "P8",
          "effort": "Medium",
          "dimRefs": [
            "D4",
            "D8",
            "B"
          ]
        }
      ]
    }
  },
  "dfva-mc-is": {
    "D1": {
      "rationale": "First 2–3 years dominated by BA documentation, requirements writing, and process analysis — templated tasks with limited decision ownership.",
      "recommendations": [
        {
          "action": "Create mandatory core unit: AI Governance and Deployment (NIST AI RMF, ISO 42001, human-in-the-loop design, vendor assessment)",
          "priority": "P1",
          "effort": "High",
          "dimRefs": [
            "D5",
            "D1",
            "B"
          ]
        },
        {
          "action": "Mandate real-client AI implementation capstone for all tracks",
          "priority": "P2",
          "effort": "High",
          "dimRefs": [
            "D4",
            "D1",
            "B"
          ]
        },
        {
          "action": "Redesign SA&D assessment: replace BRD with automation audit + governance recommendation",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D2",
            "D4",
            "D1"
          ]
        },
        {
          "action": "Update marketing and careers framing to AI workflow architect / automation governance analyst",
          "priority": "P8",
          "effort": "Low",
          "dimRefs": [
            "D1"
          ]
        }
      ]
    },
    "D2": {
      "rationale": "Enterprise Architecture and Governance and Systems Analysis and Design include trade-off framing; not consistently integrated across all units.",
      "recommendations": [
        {
          "action": "Redesign SA&D assessment: replace BRD with automation audit + governance recommendation",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D2",
            "D4",
            "D1"
          ]
        }
      ]
    },
    "D3": {
      "rationale": "Business Intelligence Systems and IT Infrastructure provide solid grounding; coding depth is light unless electives selected deliberately.",
      "recommendations": [
        {
          "action": "Add mandatory data engineering elective pathway (SQL, Python, dbt)",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D3",
            "B"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "Capstone and project management units include defended trade-offs; non-research track limits live uncertainty exposure.",
      "recommendations": [
        {
          "action": "Mandate real-client AI implementation capstone for all tracks",
          "priority": "P2",
          "effort": "High",
          "dimRefs": [
            "D4",
            "D1",
            "B"
          ]
        },
        {
          "action": "Redesign SA&D assessment: replace BRD with automation audit + governance recommendation",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D2",
            "D4",
            "D1"
          ]
        }
      ]
    },
    "D5": {
      "rationale": "No dedicated AI governance unit visible in core structure; AI tools may appear in Business Intelligence Systems but not as a governed curriculum pillar.",
      "recommendations": [
        {
          "action": "Create mandatory core unit: AI Governance and Deployment (NIST AI RMF, ISO 42001, human-in-the-loop design, vendor assessment)",
          "priority": "P1",
          "effort": "High",
          "dimRefs": [
            "D5",
            "D1",
            "B"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "IS is a defined domain; enterprise architecture and governance provide specialist grounding, but dual-stream design dilutes depth.",
      "recommendations": [
        {
          "action": "Introduce sector specialisation requirement (health IT, fintech, or govtech cluster)",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D6",
            "B"
          ]
        }
      ]
    },
    "D7": {
      "rationale": "Research Methods in IS exists on research track; coursework-only track has weaker exposure. Score reflects research track access.",
      "recommendations": []
    },
    "D8": {
      "rationale": "Stakeholder management and change management appear in project management units; no clinical or physical accountability layer.",
      "recommendations": []
    },
    "D9": {
      "rationale": "2026 handbook reflects recent review; no explicit AI core units visible — a currency gap for a 2026 program.",
      "recommendations": [
        {
          "action": "Establish employer advisory panel with annual curriculum review",
          "priority": "P7",
          "effort": "Medium",
          "dimRefs": [
            "D9",
            "D10"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "UniMelb publishes aggregate graduate outcome data; granular role/salary/time-to-employment data for MC-IS not prominently available.",
      "recommendations": [
        {
          "action": "Implement granular graduate destination tracking",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        },
        {
          "action": "Establish employer advisory panel with annual curriculum review",
          "priority": "P7",
          "effort": "Medium",
          "dimRefs": [
            "D9",
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "Some dual-skill value (business + technology bridge), but this profile is common and not deeply differentiated.",
      "recommendations": [
        {
          "action": "Create mandatory core unit: AI Governance and Deployment (NIST AI RMF, ISO 42001, human-in-the-loop design, vendor assessment)",
          "priority": "P1",
          "effort": "High",
          "dimRefs": [
            "D5",
            "D1",
            "B"
          ]
        },
        {
          "action": "Mandate real-client AI implementation capstone for all tracks",
          "priority": "P2",
          "effort": "High",
          "dimRefs": [
            "D4",
            "D1",
            "B"
          ]
        },
        {
          "action": "Add mandatory data engineering elective pathway (SQL, Python, dbt)",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D3",
            "B"
          ]
        },
        {
          "action": "Introduce sector specialisation requirement (health IT, fintech, or govtech cluster)",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D6",
            "B"
          ]
        }
      ]
    }
  },
  "dfva-mc-scibit": {
    "D1": {
      "rationale": "Regulatory affairs, GMP, and commercialisation roles carry genuine automation resistance. Documentation and routine compliance work is compressing. Entry-level QA and regulatory assistant roles face moderate AI substitution but accountability layer is structural protection.",
      "recommendations": [
        {
          "action": "Update careers advising — reframe value as regulatory judgment and AI governance, not document production; publish AI tool landscape threat map for regulatory affairs, QA, and clinical trials roles",
          "priority": "P8",
          "effort": "Low",
          "dimRefs": [
            "D1",
            "D9"
          ]
        }
      ]
    },
    "D2": {
      "rationale": "LAWS90003 Regulation of Biotechnology and MKTG90022 Commercialisation of Science together require understanding of complex regulatory, commercial, and scientific systems. Industry Project requires navigating real organisational constraints. Trade-off reasoning not explicitly assessed.",
      "recommendations": []
    },
    "D3": {
      "rationale": "MAST90072 Data and Decision Making provides genuine quantitative grounding. Electives include Genomics and Bioinformatics, Computational Genomics, Data Science for Biologists. Depth is solid but variable — depends heavily on elective choices. Not all students take computational electives.",
      "recommendations": [
        {
          "action": "Mandate minimum one computational elective (12.5cp) from: BTCH90009 Genomics and Bioinformatics, COMP90016 Computational Genomics, BIOL90041 Data Science for Biologists",
          "priority": "P2",
          "effort": "Low",
          "dimRefs": [
            "D3",
            "B"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "SCIE90015 Industry Project is mandatory — real external company, real constraints, real accountability, group work, year-long commitment. Commercialisation and Regulation units require navigating genuine regulatory and commercial uncertainty. Authentic live-stakes experience embedded by design.",
      "recommendations": [
        {
          "action": "Add AI tool use reflection and AI output validation statement as mandatory components of SCIE90015 Industry Project — document which AI tools were used by industry partner, how outputs were validated, what required human judgment",
          "priority": "P3",
          "effort": "Low",
          "dimRefs": [
            "D4",
            "D5"
          ]
        }
      ]
    },
    "D5": {
      "rationale": "No mandatory AI governance unit. SCIE90005 Ethics and Responsibility in Science not available 2026. Biotechnology sector is among the most AI-disrupted (AlphaFold, AI drug discovery, AI regulatory submission tools) — the absence of an AI governance pillar is a significant curriculum currency gap.",
      "recommendations": [
        {
          "action": "Create mandatory unit: AI in Biotechnology — AI tool evaluation in regulated research and commercial contexts; TGA/FDA AI guidance navigation; AlphaFold and AI drug discovery validation; NIST AI RMF applied to GMP and regulatory submission contexts; AI inventorship and IP implications",
          "priority": "P1",
          "effort": "High",
          "dimRefs": [
            "D5",
            "D9",
            "B"
          ]
        },
        {
          "action": "Add AI tool use reflection and AI output validation statement as mandatory components of SCIE90015 Industry Project — document which AI tools were used by industry partner, how outputs were validated, what required human judgment",
          "priority": "P3",
          "effort": "Low",
          "dimRefs": [
            "D4",
            "D5"
          ]
        },
        {
          "action": "Integrate AI ethics and governance module into BTCH90010 Biotechnology Impacts in Society — AI bias in research, AI in clinical decision-making ethics, AI governance frameworks for biotechnology",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D9"
          ]
        },
        {
          "action": "Integrate AI regulatory law content into LAWS90003 Regulation of Biotechnology — TGA AI guidance for medical devices and therapeutics, FDA AI action plan implications, AI inventorship legal uncertainty",
          "priority": "P6",
          "effort": "Low-Medium",
          "dimRefs": [
            "D5",
            "D6"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "LAWS90003 Regulation of Biotechnology is genuine regulatory expertise — TGA, FDA, IP, GMP. MKTG90022 Commercialisation of Science adds commercial domain depth. Technical electives (Cell and Gene Therapies, Computational Genomics, Systems and Synthetic Biology, Clinical Trial Design) create specialist depth. This is the degree's primary strength.",
      "recommendations": [
        {
          "action": "Integrate AI regulatory law content into LAWS90003 Regulation of Biotechnology — TGA AI guidance for medical devices and therapeutics, FDA AI action plan implications, AI inventorship legal uncertainty",
          "priority": "P6",
          "effort": "Low-Medium",
          "dimRefs": [
            "D5",
            "D6"
          ]
        }
      ]
    },
    "D7": {
      "rationale": "MAST90072 Data and Decision Making provides applied quantitative methods. Industry Project involves applied research methodology. Optional Biotechnology Research Project available for outstanding students. No mandatory primary research methods unit — professional coursework framing limits rigour to applied contexts.",
      "recommendations": []
    },
    "D8": {
      "rationale": "SCIE90034 Communicating Science at Work (mandatory), MGMT90171 Leadership in Science (mandatory), SKIL90004 Project Management in Science (mandatory). Industry Project requires working with external industry partners in a real professional context. Teamwork and communication explicitly in learning outcomes. Genuinely strong.",
      "recommendations": []
    },
    "D9": {
      "rationale": "Handbook updated 4 May 2026. Computational and bioinformatics electives available. SCIE90005 Ethics and Responsibility in Science not available 2026 — a notable gap. No AI literacy unit despite biotechnology sector's rapid AI adoption. Shows awareness of computational direction but incomplete AI governance integration.",
      "recommendations": [
        {
          "action": "Create mandatory unit: AI in Biotechnology — AI tool evaluation in regulated research and commercial contexts; TGA/FDA AI guidance navigation; AlphaFold and AI drug discovery validation; NIST AI RMF applied to GMP and regulatory submission contexts; AI inventorship and IP implications",
          "priority": "P1",
          "effort": "High",
          "dimRefs": [
            "D5",
            "D9",
            "B"
          ]
        },
        {
          "action": "Integrate AI ethics and governance module into BTCH90010 Biotechnology Impacts in Society — AI bias in research, AI in clinical decision-making ethics, AI governance frameworks for biotechnology",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D9"
          ]
        },
        {
          "action": "Establish MC-SCIBIT industry advisory panel — 6–8 members from CSL, Telix, Pfizer ANZ, NHMRC, TGA, AusBiotech, university TTO offices, with bi-annual curriculum review mandate",
          "priority": "P7",
          "effort": "Medium",
          "dimRefs": [
            "D9",
            "D10"
          ]
        },
        {
          "action": "Update careers advising — reframe value as regulatory judgment and AI governance, not document production; publish AI tool landscape threat map for regulatory affairs, QA, and clinical trials roles",
          "priority": "P8",
          "effort": "Low",
          "dimRefs": [
            "D1",
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "No publicly available destination data at program level. NPSMA accreditation implies employability standards but no granular role-title, salary, or time-to-employment data published.",
      "recommendations": [
        {
          "action": "Publish program-level graduate destination data — role titles, industries, salary bands, time-to-employment within 12 months of each graduating cohort",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        },
        {
          "action": "Establish MC-SCIBIT industry advisory panel — 6–8 members from CSL, Telix, Pfizer ANZ, NHMRC, TGA, AusBiotech, university TTO offices, with bi-annual curriculum review mandate",
          "priority": "P7",
          "effort": "Medium",
          "dimRefs": [
            "D9",
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "The combination is genuinely rare: biotechnology technical depth + mandatory regulatory expertise (LAWS90003) + commercialisation and IP knowledge (MKTG90022) + mandatory industry project accountability + science communication and leadership. AI cannot substitute for TGA/FDA regulatory judgment and legal sign-off.",
      "recommendations": [
        {
          "action": "Create mandatory unit: AI in Biotechnology — AI tool evaluation in regulated research and commercial contexts; TGA/FDA AI guidance navigation; AlphaFold and AI drug discovery validation; NIST AI RMF applied to GMP and regulatory submission contexts; AI inventorship and IP implications",
          "priority": "P1",
          "effort": "High",
          "dimRefs": [
            "D5",
            "D9",
            "B"
          ]
        },
        {
          "action": "Mandate minimum one computational elective (12.5cp) from: BTCH90009 Genomics and Bioinformatics, COMP90016 Computational Genomics, BIOL90041 Data Science for Biologists",
          "priority": "P2",
          "effort": "Low",
          "dimRefs": [
            "D3",
            "B"
          ]
        }
      ]
    }
  },
  "dfva-mc-sciear": {
    "D1": {
      "rationale": "Graduate roles require physical fieldwork (Geology stream: field mapping, drilling, sampling), instrument operation, and original data interpretation from day one. Atmospheric Science graduates validate computational models against observations — requiring judgment about when models are wrong. AI accelerates analysis but cannot replace embodied field presence or observational judgment.",
      "recommendations": [
        {
          "action": "Add AI tool evaluation module within discipline core — train students to critically assess AI-generated geological logs, climate model outputs, and automated resource estimates",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D1"
          ]
        },
        {
          "action": "Add \"AI in Earth Sciences\" module within discipline core subjects — critical evaluation of AI-generated geological logs, climate model outputs, automated resource estimates",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D1",
            "B"
          ]
        }
      ]
    },
    "D2": {
      "rationale": "Atmospheric Modelling, Data Assimilation, Climate Science for Decision-Making, and Sedimentary Basins and Resource Analysis all require systems-level reasoning. Climate system feedback loops and geological basin analysis are inherently systems problems. Not explicitly labelled \"systems thinking\" but embedded in discipline practice. Trade-off reasoning present but not formally assessed as a standalone competency.",
      "recommendations": []
    },
    "D3": {
      "rationale": "Strong quantitative core throughout: ATOC90010 Statistics in Climate Dynamics, MAST90007 Statistics for Research Workers, ATOC90012 Advanced Dynamical Meteorology (mathematical physics), Atmospheric Modelling (numerical methods), Ore Reserve Estimation (geostatistics), Geochronology (isotope geochemistry and dating methods). COMP90072 The Art of Scientific Computation available. Rigorous technical depth is structural to the program.",
      "recommendations": [
        {
          "action": "Formally designate COMP90072 The Art of Scientific Computation as \"strongly recommended\" in both streams (currently just listed)",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "D3",
            "D5",
            "B"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "The 125-point research project (62.5% of degree) requires designing original research, interpreting ambiguous data, defending methodology under examination, and producing work of publishable quality. Semester hurdle reviews create ongoing accountability. The research thesis must demonstrate \"appropriate level of insight and scientific interpretation\" — this is genuine decision-making under genuine uncertainty.",
      "recommendations": [
        {
          "action": "Integrate AI-assisted data analysis workflows into research project methodology (students must demonstrate when AI is appropriate and when it fails)",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D4"
          ]
        },
        {
          "action": "Add AI methodology chapter requirement to 125pt research project — students must document where they used AI tools, where tools failed, and how they validated outputs",
          "priority": "P4",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D4",
            "D7"
          ]
        }
      ]
    },
    "D5": {
      "rationale": "LAWS90203 Science & AI: Legal & Ethical Challenges exists in the professional skills list but was \"not available in 2025\". COMP90059 Introduction to Programming and COMP90072 The Art of Scientific Computation provide computational capability but not AI governance or literacy. No mandatory unit addresses AI tool supervision, limitations, or responsible deployment in earth science contexts.",
      "recommendations": [
        {
          "action": "Make LAWS90203 Science & AI: Legal & Ethical Challenges available and mandatory (12.5pts from professional skills allocation)",
          "priority": "P1",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D9"
          ]
        },
        {
          "action": "Add AI tool evaluation module within discipline core — train students to critically assess AI-generated geological logs, climate model outputs, and automated resource estimates",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D1"
          ]
        },
        {
          "action": "Integrate AI-assisted data analysis workflows into research project methodology (students must demonstrate when AI is appropriate and when it fails)",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D4"
          ]
        },
        {
          "action": "Add \"AI in Earth Sciences\" module within discipline core subjects — critical evaluation of AI-generated geological logs, climate model outputs, automated resource estimates",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D1",
            "B"
          ]
        },
        {
          "action": "Add AI methodology chapter requirement to 125pt research project — students must document where they used AI tools, where tools failed, and how they validated outputs",
          "priority": "P4",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D4",
            "D7"
          ]
        },
        {
          "action": "Formally designate COMP90072 The Art of Scientific Computation as \"strongly recommended\" in both streams (currently just listed)",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "D3",
            "D5",
            "B"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "Exceptional domain depth. Geology stream covers mineralogy, geochemistry, geochronology, structural geology, ore deposits, field techniques, mine safety — highly specialised regulatory and scientific expertise. Atmospheric Science stream covers dynamical meteorology, climate modelling, data assimilation — deep quantitative specialisation. Multi-institutional VIEPS collaboration provides access to the broadest array of advanced earth science coursework nationally.",
      "recommendations": []
    },
    "D7": {
      "rationale": "125 points of original research (62.5% of degree). Students generate primary data and defend methods under scrutiny. Assessment includes literature review, research presentations, oral examination, and thesis of publishable quality. Semester-end hurdle reviews ensure ongoing research quality. This is among the strongest research method rigour scores possible for a coursework masters.",
      "recommendations": [
        {
          "action": "Add AI methodology chapter requirement to 125pt research project — students must document where they used AI tools, where tools failed, and how they validated outputs",
          "priority": "P4",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D4",
            "D7"
          ]
        }
      ]
    },
    "D8": {
      "rationale": "SCIE90013 Communication for Research Scientists and SCIE90012 Science Communication are available as professional skills options but not compulsory. Oral presentations exist (10% of research project assessment). No substantial clinical, care, interpersonal accountability, or stakeholder engagement components. The program is primarily individual research with limited collaborative or client-facing requirements.",
      "recommendations": [
        {
          "action": "Make SCIE90013 Communication for Research Scientists compulsory rather than optional",
          "priority": "P2",
          "effort": "Low",
          "dimRefs": [
            "D8"
          ]
        }
      ]
    },
    "D9": {
      "rationale": "Handbook last updated 6 November 2025. Program includes contemporary topics: critical minerals (GEOL90052), climate extremes, data assimilation. However, several subjects listed as \"not available in 2025\" or \"no longer available\" — suggesting uneven curation. LAWS90203 AI ethics not available. No AI literacy integrated into core discipline units. Fundamentally sound disciplinary content but incomplete adaptation to AI era.",
      "recommendations": [
        {
          "action": "Make LAWS90203 Science & AI: Legal & Ethical Challenges available and mandatory (12.5pts from professional skills allocation)",
          "priority": "P1",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D9"
          ]
        },
        {
          "action": "Add industry advisory panel with annual curriculum review to ensure subject availability matches sector demand (address \"not available\" subjects)",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D9"
          ]
        },
        {
          "action": "Establish industry advisory panel (mining, consulting, BoM/CSIRO, geological surveys) with annual curriculum review cycle",
          "priority": "P7",
          "effort": "Medium",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "No publicly available destination data at program level. No granular role-title, salary, or time-to-employment data published. Generic Faculty of Science outcomes exist but are not specific to this specialisation.",
      "recommendations": [
        {
          "action": "Publish granular graduate destination data by stream (Atmospheric Science vs Geology) with role titles, industries, and time-to-employment",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        },
        {
          "action": "Build and publish graduate destination tracking system with stream-level granularity (Atmospheric Science vs Geology)",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "The combination of physical fieldwork capability + advanced quantitative modelling + original research + deep domain expertise creates a genuine dual-skill value proposition. A geology graduate who can both conduct fieldwork and model geological systems computationally occupies a position difficult to replicate by AI alone. Not scored 3/3 because the combination (science + research + fieldwork) is standard for earth science programs nationally — it's durable but not uniquely rare.",
      "recommendations": [
        {
          "action": "Add \"AI in Earth Sciences\" module within discipline core subjects — critical evaluation of AI-generated geological logs, climate model outputs, automated resource estimates",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D1",
            "B"
          ]
        },
        {
          "action": "Formally designate COMP90072 The Art of Scientific Computation as \"strongly recommended\" in both streams (currently just listed)",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "D3",
            "D5",
            "B"
          ]
        }
      ]
    }
  },
  "dfva-mc-sciepi": {
    "D1": {
      "rationale": "Entry-level epidemiology roles involve a mix of routine data analysis (increasingly AI-assisted) and genuine methodological judgment (study design, bias assessment, causal inference). Data processing and standard statistical analyses are automating, but epidemiological reasoning about confounding structures, measurement validity, and population generalizability remains human work.",
      "recommendations": [
        {
          "action": "Add advanced causal inference methods (target trial emulation, DAGs, instrumental variables) to POPH90242 Epidemiology 2 or as new elective",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D3",
            "D6",
            "D1"
          ]
        }
      ]
    },
    "D2": {
      "rationale": "POPH90271 Infectious Diseases Modelling explicitly involves systems dynamics. Epidemiology itself is population-level systems thinking — understanding causal webs, confounding structures, and interaction effects. POPH90243 Epidemiology in Practice requires applying methods to real-world problems. Not labelled \"systems thinking\" but structurally embedded.",
      "recommendations": []
    },
    "D3": {
      "rationale": "Exceptionally strong quantitative core: POPH90013 Biostatistics, POPH90144 Regression Methods in Health Research, POPH90145 Survival Analysis & Regression for Rates, POPH90242 Epidemiology 2. Plus MAST90101 Introduction to Statistical Computing and COMP90072 The Art of Scientific Computation as professional skills options. This is one of the most quantitatively rigorous programs in the Faculty.",
      "recommendations": [
        {
          "action": "Add advanced causal inference methods (target trial emulation, DAGs, instrumental variables) to POPH90242 Epidemiology 2 or as new elective",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D3",
            "D6",
            "D1"
          ]
        },
        {
          "action": "Add AI-augmented analysis component to POPH90013 Biostatistics — students compare AI-generated statistical outputs with manual analysis and assess validity",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D3"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "Research project (25 or 50 pts) requires original research with defended methodology. POPH90243 Epidemiology in Practice involves applied decision-making. Core subjects teach uncertainty quantification (confidence intervals, hypothesis testing, survival curves). However, no evidence of live-stakes capstones with industry/government partners or genuine accountability beyond academic assessment.",
      "recommendations": [
        {
          "action": "Encourage major research project pathway (50pts) through advising; consider making minor project available only with coordinator approval",
          "priority": "P2",
          "effort": "Low",
          "dimRefs": [
            "D4",
            "D7"
          ]
        }
      ]
    },
    "D5": {
      "rationale": "No mandatory AI governance unit. SCIE90005 Ethics and Responsibility in Science \"not available in 2025.\" No evidence of AI tool evaluation within epidemiological methods subjects. AI is rapidly transforming epidemiological practice (automated surveillance, ML-based disease detection, LLM-assisted systematic reviews) but the program does not explicitly address this.",
      "recommendations": [
        {
          "action": "Add \"AI Validation in Epidemiology\" module — apply epidemiological methods (sensitivity, specificity, external validity, bias assessment) to evaluate AI health tools",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D9",
            "B"
          ]
        },
        {
          "action": "Add AI-augmented analysis component to POPH90013 Biostatistics — students compare AI-generated statistical outputs with manual analysis and assess validity",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D3"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "Deep domain specialisation in epidemiology with extensive elective pathways (genetic epidemiology, infectious disease, health economics, qualitative methods). The program produces specialists who understand the full epidemiological toolkit from study design through analysis to interpretation. Regulatory and ethical frameworks embedded through health system context.",
      "recommendations": [
        {
          "action": "Add advanced causal inference methods (target trial emulation, DAGs, instrumental variables) to POPH90242 Epidemiology 2 or as new elective",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D3",
            "D6",
            "D1"
          ]
        }
      ]
    },
    "D7": {
      "rationale": "The entire discipline core IS research methods — epidemiology is fundamentally about designing studies, controlling bias, and making valid causal inferences. Biostatistics + Regression + Survival Analysis + Epidemiology 1&2 constitute a comprehensive research methods curriculum. Research project (25 or 50pts) produces original research. Students can design and conduct research from core training alone.",
      "recommendations": [
        {
          "action": "Encourage major research project pathway (50pts) through advising; consider making minor project available only with coordinator approval",
          "priority": "P2",
          "effort": "Low",
          "dimRefs": [
            "D4",
            "D7"
          ]
        }
      ]
    },
    "D8": {
      "rationale": "POPH90270 Bioethics in Practice (elective) provides meaningful ethical practice. POPH90020 Health Promotion involves community engagement. POPH90206 Health Policy requires stakeholder reasoning. The discipline inherently requires ethics committee engagement and consideration of population impact. Not scored 3/3 because communication and ethics are elective rather than mandatory.",
      "recommendations": [
        {
          "action": "Make SCIE90013 Communication for Research Scientists compulsory within professional skills",
          "priority": "P3",
          "effort": "Low",
          "dimRefs": [
            "D8"
          ]
        }
      ]
    },
    "D9": {
      "rationale": "Handbook updated 27 November 2025. Dual-delivery mode shows COVID-era adaptation. POPH90271 Infectious Diseases Modelling shows post-pandemic curriculum response. However, SCIE90005 not available, no AI content in core discipline subjects despite AI transforming epidemiological practice. Core methods teaching does not visibly address AI-augmented surveillance or ML-based epidemiology.",
      "recommendations": [
        {
          "action": "Add \"AI Validation in Epidemiology\" module — apply epidemiological methods (sensitivity, specificity, external validity, bias assessment) to evaluate AI health tools",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D9",
            "B"
          ]
        },
        {
          "action": "Establish industry advisory panel (health departments, pharma, WHO, CROs) with annual review",
          "priority": "P7",
          "effort": "Medium",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "No publicly available destination data at program level. No granular role-title, salary, or time-to-employment data published. Epidemiologists are known to have strong employment outcomes but program-specific evidence is absent.",
      "recommendations": [
        {
          "action": "Build and publish graduate destination tracking system with role-type breakdown (research, government, pharma, consulting)",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "The combination of advanced biostatistics + epidemiological study design + population health context creates a specialist who can design research to answer causal questions about human health — a skill in sustained demand. Not scored 3/3 because the profile (quantitative + health domain) is shared with other biostatistics/public health programs nationally.",
      "recommendations": [
        {
          "action": "Add \"AI Validation in Epidemiology\" module — apply epidemiological methods (sensitivity, specificity, external validity, bias assessment) to evaluate AI health tools",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D9",
            "B"
          ]
        }
      ]
    }
  }
}

export function evidenceFor(programSlug: string, dimId: string): DimensionEvidence | undefined {
  return DIMENSION_EVIDENCE[programSlug]?.[dimId]
}
