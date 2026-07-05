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
  "dfva-080cl": {
    "D1": {
      "rationale": "Entry-level clinical psychologist roles require registered judgment, accountability, and physical/relational presence in every core task — assessment, treatment, risk sign-off — from day one of supervised practice",
      "recommendations": []
    },
    "D2": {
      "rationale": "Case formulation across biopsychosocial models, differential diagnosis, and treatment-plan adaptation under supervision is assessed authentically and integrated throughout placements and coursework, not templated",
      "recommendations": [
        {
          "action": "Introduce a capstone case-conference exercise requiring trainees to critique an AI-generated case summary against their own clinical formulation",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D2",
            "D5"
          ]
        }
      ]
    },
    "D3": {
      "rationale": "Strong grounding in psychometrics, research statistics, and evidence-based assessment tools; solid but not the primary differentiator relative to the clinical and research strands",
      "recommendations": [
        {
          "action": "Expand psychometric/quantitative training to include applied data science methods relevant to large clinical dataset research (supporting the PhD strand)",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D3"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "Live clinical placements require defended treatment and risk decisions under real client uncertainty with genuine accountability, supplemented by a thesis requiring defended methodological choices",
      "recommendations": []
    },
    "D5": {
      "rationale": "Handbook text provided contains no explicit AI-specific coverage; assumed limited to general research-methods and documentation-tooling context, not dedicated governance/critique content",
      "recommendations": [
        {
          "action": "Add a dedicated AI-in-clinical-practice module covering AI-assisted documentation tools, algorithmic risk-screening limitations, and governance/ethics of AI in mental healthcare",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Formalise an AI-tool critique component within research methods training (e.g., evaluating AI-assisted literature review and analysis tools for bias/reliability)",
          "priority": "P3",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D7"
          ]
        },
        {
          "action": "Introduce a capstone case-conference exercise requiring trainees to critique an AI-generated case summary against their own clinical formulation",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D2",
            "D5"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "Deep clinical-regulatory specialisation: APAC-accredited sequence plus PsyBA generalist registration and clinical endorsement — a multi-year, examination- and placement-gated specialist credential",
      "recommendations": []
    },
    "D7": {
      "rationale": "The PhD component requires graduates to independently design, conduct, and defend a novel empirical/theoretical contribution under examination — the defining rigour test of the dimension",
      "recommendations": [
        {
          "action": "Formalise an AI-tool critique component within research methods training (e.g., evaluating AI-assisted literature review and analysis tools for bias/reliability)",
          "priority": "P3",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D7"
          ]
        }
      ]
    },
    "D8": {
      "rationale": "Extensive supervised clinical placements assessing and treating adults and children under professional competency standards represent substantial clinical/care accountability — the strongest possible expression of this dimension",
      "recommendations": []
    },
    "D9": {
      "rationale": "APAC accreditation cycles mandate periodic program review and evidence-based-practice updates; no specific evidence of an AI-focused refresh in the supplied text, so scored as adequate rather than exemplary",
      "recommendations": [
        {
          "action": "Establish an industry/AI-advisory feedback loop feeding into the next APAC accreditation review cycle to keep pace with AI-assisted clinical documentation adoption",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "Professional registration outcomes (PsyBA registration rates, endorsement) are trackable and typically reported at program level, but the supplied handbook text contains no granular destination data",
      "recommendations": [
        {
          "action": "Publish granular graduate destination data — PsyBA registration/endorsement rates, thesis completion times, employment sector breakdown (public health, private practice, academia)",
          "priority": "P2",
          "effort": "Low",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "Rare integration of statutory clinical accreditation, deep relational/clinical skill, and independent research capability — a dual professional+research credential that is structurally very hard to substitute",
      "recommendations": []
    }
  },
  "dfva-080cn": {
    "D1": {
      "rationale": "Core graduate tasks — differential diagnosis, therapy delivery, forensic assessment, case conferencing — require irreducible human judgment, legal accountability, and relational trust from day one of clinical placement.",
      "recommendations": []
    },
    "D2": {
      "rationale": "Clinical neuropsychology inherently requires integrating multi-modal evidence (history, test data, imaging, collateral report) into a coherent diagnostic formulation under uncertainty; PhD thesis adds independent hypothesis-driven research training on top of this.",
      "recommendations": []
    },
    "D3": {
      "rationale": "Combines rigorous psychometrics, neuroscience, and statistics (assessment theory, norm-referencing, research methods) with a full PhD-level original research program — among the most technically demanding degrees in the DFVA portfolio.",
      "recommendations": [
        {
          "action": "Add a structured module on integrating digital cognitive-monitoring and remote/tele-neuropsychology tools into practice, positioning graduates to lead rather than resist technology-enabled service delivery models",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D3",
            "D9"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "Clinical placements require defended diagnostic and treatment decisions on real patients with real consequences; forensic/medico-legal work requires decisions defensible under cross-examination — the highest-stakes uncertainty category assessed.",
      "recommendations": []
    },
    "D5": {
      "rationale": "Handbook text provided gives no explicit evidence of dedicated AI curriculum content; clinical psychology training has historically been slow to formalise AI-tool governance despite growing use of AI-assisted scoring/reporting tools in practice. Score reflects absence of demonstrated coverage, not absence of relevance.",
      "recommendations": [
        {
          "action": "Introduce a dedicated AI-in-clinical-practice module covering AI-assisted scoring/reporting tools, their failure modes, medico-legal liability implications, and governance expectations for registered psychologists",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Require explicit training on critically appraising and supervising AI-drafted clinical report sections before sign-off, given rapid uptake of LLM drafting tools in clinical documentation",
          "priority": "P2",
          "effort": "Low",
          "dimRefs": [
            "D5"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "APAC-accredited specialist training in clinical neuropsychology — a narrow, regulated, years-in-the-making specialisation sitting at the intersection of clinical psychology and neuroscience; combined with PhD-level depth in a specific research question.",
      "recommendations": [
        {
          "action": "Expand forensic and medico-legal placement capacity given this is one of the program's most durable, AI-resistant task categories and current demand for expert witnesses is growing",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D6",
            "D8"
          ]
        }
      ]
    },
    "D7": {
      "rationale": "Full PhD thesis requiring primary data collection, ethics approval, and defence of methodology under external examination — the strongest possible research-rigour signal in the rubric, on top of APAC-mandated assessment/research coursework.",
      "recommendations": []
    },
    "D8": {
      "rationale": "Extensive supervised clinical placements assessing and treating patients with brain disease/injury, plus family and multidisciplinary team engagement — substantial, sustained clinical/relational accountability is the spine of the professional training component.",
      "recommendations": [
        {
          "action": "Expand forensic and medico-legal placement capacity given this is one of the program's most durable, AI-resistant task categories and current demand for expert witnesses is growing",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D6",
            "D8"
          ]
        }
      ]
    },
    "D9": {
      "rationale": "APAC accreditation cycles mandate periodic curriculum review and the program sits within an active clinical/research field with strong outcome tracking through placement supervision; no explicit evidence in the handbook text of a living AI-integration feedback loop.",
      "recommendations": [
        {
          "action": "Formalise a living curriculum review loop tied explicitly to emerging neurotechnology and AI-assisted assessment tools (e.g., digital biomarkers, passive cognitive monitoring), documented against APAC re-accreditation cycles",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D9"
          ]
        },
        {
          "action": "Add a structured module on integrating digital cognitive-monitoring and remote/tele-neuropsychology tools into practice, positioning graduates to lead rather than resist technology-enabled service delivery models",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D3",
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "Psychology registration pathways are well-tracked at a professional-body level (AHPRA/APAC registration data, employment in health) but the handbook text provided does not evidence granular, program-specific destination data beyond field-level norms.",
      "recommendations": [
        {
          "action": "Publish granular program-specific graduate destination data (registration outcomes, endorsement rates, employment sector/setting) in partnership with AHPRA/APAC tracking, closing the outcome-evidence gap",
          "priority": "P3",
          "effort": "High",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "Rare integration of all three protected capabilities: deep technical/quantitative depth (neuropsychological science + statistics), narrow regulated domain specialisation (clinical neuropsychology), and substantial human/relational + legal accountability (registered clinician, forensic witness) — very difficult to substitute even partially.",
      "recommendations": []
    }
  },
  "dfva-300bb": {
    "D1": {
      "rationale": "Not a conventional \"entry-level role\" question — candidates are already senior practitioners returning to or advancing within leadership/policy roles. Scored on the exposure of the *tasks* graduates perform post-completion (advisory, leadership, applied research), which skew toward judgment/accountability, but the program's admission pathway assumes rather than builds this durability, so it is not maximal.",
      "recommendations": []
    },
    "D2": {
      "rationale": "The program is explicitly built around \"problem of practice\" framing tied to the candidate's professional context, which is systems-thinking in substance; however, the handbook text gives no evidence of dedicated, assessed units on constraint reasoning or failure-mode analysis beyond the practice-relevance framing.",
      "recommendations": [
        {
          "action": "Make systems-thinking and failure-mode analysis an explicitly assessed competency within the coursework sequence, not just implicit in thesis framing",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D2"
          ]
        },
        {
          "action": "Create a structured \"problem of practice to policy brief\" capstone that explicitly teaches AI-augmented research workflows alongside irreducibly human judgment tasks",
          "priority": "P7",
          "effort": "Medium",
          "dimRefs": [
            "D2",
            "D4"
          ]
        }
      ]
    },
    "D3": {
      "rationale": "Handbook text gives no evidence of a strong technical/methods core; \"tailored coursework program\" is generic. Professional doctorates in education have historically been critiqued for thin quantitative rigour relative to PhDs — scored conservatively pending stronger evidence.",
      "recommendations": [
        {
          "action": "Strengthen the quantitative/methods core in the coursework component with applied educational data analytics (learning analytics, outcome evaluation design)",
          "priority": "P3",
          "effort": "High",
          "dimRefs": [
            "D3"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "The thesis is by definition a live, real-stakes research project in the candidate's own professional setting — high-uncertainty, real accountability — but this is thesis-level, not embedded in graded coursework assessment design as described.",
      "recommendations": [
        {
          "action": "Create a structured \"problem of practice to policy brief\" capstone that explicitly teaches AI-augmented research workflows alongside irreducibly human judgment tasks",
          "priority": "P7",
          "effort": "Medium",
          "dimRefs": [
            "D2",
            "D4"
          ]
        }
      ]
    },
    "D5": {
      "rationale": "No AI coverage evidenced anywhere in the handbook text provided. For a 2026-cohort professional doctorate training future system leaders and policy advisers, this is a significant and correctable gap.",
      "recommendations": [
        {
          "action": "Add a mandatory AI literacy and governance module covering AI in educational research, policy, and system design (bias, validity, ethical use in practice-based research)",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Require candidates to demonstrate responsible use of AI tools within their own applied research (disclosure, critique, validation) as part of thesis methodology",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D7"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "Clear specialist focus (education leadership/policy/practice) and candidates already carry deep domain expertise from their professional role — but the *program* itself doesn't obviously deepen technical/scientific specialisation beyond what candidates bring in.",
      "recommendations": []
    },
    "D7": {
      "rationale": "Candidates generate primary data via their own applied research project directly relevant to practice — genuine primary research, defended at thesis examination — but the \"tailored coursework\" framing suggests less methods rigour than a full PhD, so not maximal.",
      "recommendations": [
        {
          "action": "Require candidates to demonstrate responsible use of AI tools within their own applied research (disclosure, critique, validation) as part of thesis methodology",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D7"
          ]
        }
      ]
    },
    "D8": {
      "rationale": "Educational leadership, policy influence, and applied practice research are irreducibly relational and accountable — this is core to the entire professional identity the degree serves, not an add-on.",
      "recommendations": []
    },
    "D9": {
      "rationale": "No evidence of recent review cycle, advisory-board feedback loop, or AI-related curriculum currency in the handbook text — scored low pending evidence, consistent with the \"no AI coverage\" finding in D5.",
      "recommendations": [
        {
          "action": "Establish an industry/sector advisory board (principals' associations, department of education) with a documented 2-year curriculum review cycle",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "No destination-data evidence provided; professional doctorates for already-employed senior practitioners typically don't require the same \"first job\" outcome tracking as coursework masters, but UoM does not appear (from the text given) to publish granular outcome data for this specific cohort.",
      "recommendations": [
        {
          "action": "Publish and track granular post-completion outcomes for EdD graduates (promotions, policy influence, system-level appointments) distinct from generic PhD destination data",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "Rare integration of (a) deep pre-existing domain/professional expertise, (b) doctoral-level research capability, and (c) the trust/accountability of a senior practitioner already embedded in the system — genuinely hard to substitute with AI or any credential short of this one.",
      "recommendations": []
    }
  },
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
  "dfva-dh-lld": {
    "D1": {
      "rationale": "Not applicable in the normal sense — there is no graduate cohort, no entry-level role, and no \"day one\" task profile to assess. Scored 0 by the guide's explicit convention for higher doctorates: this is an examination-only award for a body of published work by an already-established legal scholar, not a training pathway that produces workers whose tasks can be measured for automation exposure.",
      "recommendations": []
    },
    "D2": {
      "rationale": "Not taught (there is no curriculum) but *required as a precondition of admission* — the LLD examines whether the candidate's existing body of work demonstrates exactly this capability at the highest level (original contribution, not template execution). Scored on the demonstrated-capability basis the examination enforces, since there is no \"teaching\" dimension to assess separately.",
      "recommendations": []
    },
    "D3": {
      "rationale": "The LLD has no technical/quantitative curriculum; legal scholarship at this level is doctrinal and theoretical rather than data/coding driven. Scored low not as a criticism but because this dimension, designed for training pathways, does not map onto a portfolio-examination credential with no quantitative component.",
      "recommendations": []
    },
    "D4": {
      "rationale": "The examination process itself requires committee members to exercise defended judgment under genuine uncertainty (is this \"authoritative standing\"? is the contribution \"substantial and original\"?) — but this is examiner decision-making, not something built into a candidate curriculum, since none exists.",
      "recommendations": []
    },
    "D5": {
      "rationale": "No AI coverage of any kind — there is no curriculum to contain it, and the handbook text makes no reference to AI, governance, or contemporary tooling. This is a structural gap for a credential examining \"originality\" in an era of AI-assisted legal writing.",
      "recommendations": [
        {
          "action": "Explicitly define, in the examination criteria, how \"original contribution\" is assessed differently when AI-assisted drafting is now commonplace in legal scholarship — require candidates to disclose AI tool use in the submitted corpus",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D9"
          ]
        },
        {
          "action": "Commission a short comparative study of how AI is reshaping legal scholarship production globally, to inform whether \"substantial and original contribution\" needs an explicit AI-era gloss in the examination guidance",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Consider whether the examination process itself should require candidates to articulate their scholarly contribution's durability against AI-assisted legal reasoning tools, making AI-literacy part of demonstrating \"authoritative standing\"",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D6"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "By definition the LLD requires deep, durable, specialist legal expertise built over a career — the examination standard (\"authoritative standing in their field of research\") is the strongest possible expression of this dimension.",
      "recommendations": [
        {
          "action": "Consider whether the examination process itself should require candidates to articulate their scholarly contribution's durability against AI-assisted legal reasoning tools, making AI-literacy part of demonstrating \"authoritative standing\"",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D6"
          ]
        }
      ]
    },
    "D7": {
      "rationale": "The submitted body of work must demonstrate primary scholarly contribution and rigorous, original legal research methodology sustained across a career, examined and defended against expert scrutiny by the examining committee.",
      "recommendations": []
    },
    "D8": {
      "rationale": "No coursework component addresses interpersonal, ethical, or stakeholder practice as a taught competency; the credential is purely an evaluation of written scholarly output, not of relational or clinical skill.",
      "recommendations": []
    },
    "D9": {
      "rationale": "There is no curriculum to refresh, no advisory feedback loop, and no evidence in the handbook of any structural update mechanism — the LLD's assessment framework and examination criteria appear static, with no visible AI-era recalibration of what \"original contribution\" now means when AI tools assist scholarship production.",
      "recommendations": [
        {
          "action": "Explicitly define, in the examination criteria, how \"original contribution\" is assessed differently when AI-assisted drafting is now commonplace in legal scholarship — require candidates to disclose AI tool use in the submitted corpus",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D9"
          ]
        },
        {
          "action": "Establish a periodic (e.g. 5-yearly) review of the LLD examination standard and criteria, with an advisory panel including scholars working at the AI/law frontier, to prevent the credential's bar from becoming static while the field around it moves",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "No destination data exists or would be meaningful — there is no cohort, no employment outcome to track, and the handbook publishes no data of any kind on LLD recipients post-conferral.",
      "recommendations": [
        {
          "action": "Publish aggregate (anonymised) data on LLD conferrals — frequency, discipline spread, examiner composition — to give the credential visible institutional stewardship and counter perception of it as a dormant honorific",
          "priority": "P3",
          "effort": "Low",
          "dimRefs": [
            "D10"
          ]
        },
        {
          "action": "Increase visibility of the LLD (currently a near-invisible credential even within legal academia) through profiling of recipients, to protect its prestige-signal function from quiet decay through obscurity",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "The credential's entire value proposition is a rare, non-substitutable integration of sustained technical/doctrinal depth, domain expertise, and human peer judgment about scholarly authority — precisely the kind of judgment AI cannot itself confer, since the credential's worth depends on recognition by human legal peers, not on the underlying text quality alone.",
      "recommendations": []
    }
  },
  "dfva-dh-sc": {
    "D1": {
      "rationale": "Not applicable in the normal sense — there is no entry-level graduate cohort or role pipeline to assess. Scored 0/N/A-leaning-0 per house convention for higher doctorates: this is an examination-only award to already-established researchers, not a training pathway that produces graduates entering roles.",
      "recommendations": [
        {
          "action": "Maintain strict non-coursework, non-cohort framing in all marketing/handbook language to avoid conflating this honorific credential with a taught doctorate, which would invite an inappropriate training-pipeline critique",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "D1"
          ]
        }
      ]
    },
    "D2": {
      "rationale": "By definition, a successful DH-SC candidate has already demonstrated field-level systems thinking — designing research programs, framing novel hypotheses, and reasoning about constraints across a body of work spanning years. This is evidenced, not taught, but it is the single clearest requirement of the examination standard (\"substantial, original contribution\").",
      "recommendations": []
    },
    "D3": {
      "rationale": "The examined body of work must meet the technical rigour standard of the candidate's scientific discipline as judged by expert examiners; there is no meaningful technical-depth ceiling below \"field-authoritative.\"",
      "recommendations": []
    },
    "D4": {
      "rationale": "A body of original scientific work by definition involves defending research decisions, methodological trade-offs, and interpretation of ambiguous results under real (not scripted) scrutiny from an examining panel of experts.",
      "recommendations": []
    },
    "D5": {
      "rationale": "The handbook text contains no reference to AI literacy, governance, or AI-tool competency as an examination criterion. Since candidates are typically senior scientists whose formative training predates current AI tooling, the credential does not test or certify AI governance capability, though many individual candidates will incidentally possess it.",
      "recommendations": [
        {
          "action": "Publish (or reaffirm) explicit examination criteria that require panels to assess AI-assisted vs. AI-independent contribution in submitted bodies of work, protecting the \"originality\" bar as authorship tooling changes",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Add a governance statement to the examiners' brief addressing how AI-assisted literature synthesis and drafting in a candidate's publication record should be weighed, to preserve panel consistency",
          "priority": "P2",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D9"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "\"Authoritative standing in the field of study\" is the explicit examination bar — this is the maximal expression of domain depth and specialisation in the entire AQF framework (level 10, the highest).",
      "recommendations": [
        {
          "action": "Consider a public citation/impact statement accompanying each award (without compromising panel confidentiality) so external stakeholders can see the evidentiary basis, reinforcing signal value",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D6",
            "D10"
          ]
        }
      ]
    },
    "D7": {
      "rationale": "The entire credential *is* a research-methods rigour assessment: examiners evaluate whether the candidate has generated and defended primary scientific evidence at a field-authoritative standard over a sustained body of work.",
      "recommendations": []
    },
    "D8": {
      "rationale": "Not a criterion of the examination; the DH-SC assesses scientific contribution, not interpersonal, ethical-practice, or clinical capability. Score reflects the same \"not assessed\" treatment as other technical/research-only credentials, not a judgement on candidates' actual interpersonal skill.",
      "recommendations": []
    },
    "D9": {
      "rationale": "There is no curriculum to update — no coursework, no units, no advisory-board feedback loop, no defined review cycle. This dimension is structurally inapplicable and scores at the floor because the mechanism it measures does not exist for this award type.",
      "recommendations": [
        {
          "action": "Add a governance statement to the examiners' brief addressing how AI-assisted literature synthesis and drafting in a candidate's publication record should be weighed, to preserve panel consistency",
          "priority": "P2",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D9"
          ]
        },
        {
          "action": "Periodically benchmark the DH-SC examination process against equivalent higher doctorates at peer institutions (Oxford DSc, Cambridge ScD, ANU) to ensure the \"authoritative standing\" bar remains calibrated and does not drift into legacy prestige",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "There is no graduate cohort and therefore no destination data, employment outcomes, or salary tracking to publish — the dimension's underlying object (a cohort of graduates entering the labour market) does not exist for this credential.",
      "recommendations": [
        {
          "action": "Track and publish (even informally) the post-award activity/impact of DH-SC recipients — invited addresses, continued field leadership, citations to the examined work — to give the credential a lightweight evidentiary trail despite having no graduate cohort",
          "priority": "P3",
          "effort": "Low",
          "dimRefs": [
            "D10"
          ]
        },
        {
          "action": "Consider a public citation/impact statement accompanying each award (without compromising panel confidentiality) so external stakeholders can see the evidentiary basis, reinforcing signal value",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D6",
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "The DH-SC is, by construction, the rarest and least substitutable form of academic recognition UniMelb confers — a peer-examined, field-authoritative judgment on a lifetime of original scientific contribution. No AI system today can perform the expert-panel judgment of \"authoritative standing,\" and reputationally no institution would delegate it.",
      "recommendations": []
    }
  },
  "dfva-dr-philabp": {
    "D1": {
      "rationale": "Doctoral research output is judged on originality and defensibility under oral/written examination — the least automatable form of professional output that exists; graduate destinations (academia, senior policy/research roles) require judgment and accountability from entry.",
      "recommendations": [
        {
          "action": "Expand structured research-assistant-to-candidate pathways with explicit AI-tool-augmented RA roles, so the entry-level labour market absorbing early-career researchers evolves alongside the tools rather than shrinking under them",
          "priority": "P6",
          "effort": "High",
          "dimRefs": [
            "D1"
          ]
        }
      ]
    },
    "D2": {
      "rationale": "The entire candidature is an exercise in framing an original research question, defending its scope, and reasoning about method and constraint under supervisory and examiner challenge — this is the core doctoral competency, assessed continuously via confirmation and progress milestones.",
      "recommendations": []
    },
    "D3": {
      "rationale": "Depth varies by stream: strong quantitative grounding expected in Property/Construction Management research (econometrics, cost/feasibility modelling), more design/qualitative in Architecture/Landscape Architecture — genuine rigour is required in the chosen method but is not uniformly quantitative across all six sub-disciplines.",
      "recommendations": [
        {
          "action": "Formalise a cross-stream quantitative methods floor (spatial statistics, economic/cost modelling basics) available to design-research candidates who want it, narrowing the technical-depth variance across the six sub-disciplines",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D3"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "A 3-4 year independent research project with no scripted answer is the definitional case of decision-making under uncertainty — candidates must defend method choices, pivot when data/fieldwork doesn't cooperate, and justify conclusions to external examiners.",
      "recommendations": []
    },
    "D5": {
      "rationale": "No dedicated AI governance content is evident in the generic handbook description; built-environment research increasingly uses AI-assisted GIS, generative design, and forecasting tools, but critical supervision of AI's role in research integrity (a live and contested issue in doctoral training generally) is not a stated program feature.",
      "recommendations": [
        {
          "action": "Introduce a mandatory AI-in-research-integrity module at confirmation stage covering generative AI use in literature review, data analysis, and drafting, plus disclosure norms for theses and publications",
          "priority": "P1",
          "effort": "Low",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Establish a faculty-level AI tooling literacy stream (AI-assisted GIS, generative design, LLM-assisted literature synthesis) so candidates critically supervise rather than passively adopt these tools in their research method chapters",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D9"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "Candidates develop deep, singular expertise in a specific built-environment sub-field (e.g., heritage planning law, timber construction productivity, landscape ecology) over 3-4 years — the definition of durable, hard-to-replicate specialist knowledge.",
      "recommendations": []
    },
    "D7": {
      "rationale": "The entire degree is the generation of primary evidence (fieldwork, case studies, spatial data, design propositions, or quantitative modelling) and defending that methodology to external examiners — the strongest possible expression of this dimension.",
      "recommendations": []
    },
    "D8": {
      "rationale": "Fieldwork, stakeholder/community engagement (planning, property, construction contexts), and supervisory relationships build real relational capability, though this is incidental to the research training rather than an explicitly assessed competency the way it would be in a clinical degree.",
      "recommendations": [
        {
          "action": "Add a stakeholder/community engagement competency statement to candidature milestones for Urban Planning and Property streams, making the relational capability already present in fieldwork an explicitly assessed and visible dimension",
          "priority": "P7",
          "effort": "Low",
          "dimRefs": [
            "D8"
          ]
        }
      ]
    },
    "D9": {
      "rationale": "Research doctorates are individually supervised rather than centrally curriculum-refreshed; the handbook shows no evidence of an AI-specific update cycle or advisory-board feedback loop of the kind coursework programs increasingly publish.",
      "recommendations": [
        {
          "action": "Establish a faculty-level AI tooling literacy stream (AI-assisted GIS, generative design, LLM-assisted literature synthesis) so candidates critically supervise rather than passively adopt these tools in their research method chapters",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D9"
          ]
        },
        {
          "action": "Create a standing RHD curriculum advisory feedback loop (industry + academic alumni panel) reviewed annually to demonstrate currency, mirroring practice-degree accreditation cycles",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "No granular destination data (academic placement rates, time-to-first-role, industry vs. academia split by sub-discipline) is published in the handbook or generally available at this level of detail for research doctorates.",
      "recommendations": [
        {
          "action": "Publish granular graduate destination tracking by sub-discipline (Architecture / Construction Management / Landscape Architecture / Property / Urban Design / Urban Planning) — academic placement, government, consultancy, time-to-first-role",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "The combination of deep sub-discipline domain expertise, rigorous original-research method, and an externally examined defensible contribution is a rare integration that is structurally resistant to AI substitution — this is the strongest possible expression of the bonus dimension.",
      "recommendations": []
    }
  },
  "dfva-dr-philagr": {
    "D1": {
      "rationale": "Entry pathways (research scientist, agtech R&D, government agronomist) require field judgment, physical trial execution, and biological troubleshooting from day one — not templated, automatable tasks",
      "recommendations": [
        {
          "action": "Create an agtech/industry placement or internship option mid-candidature to strengthen the applied R&D pathway signal to prospective employers",
          "priority": "P7",
          "effort": "High",
          "dimRefs": [
            "D1"
          ]
        }
      ]
    },
    "D2": {
      "rationale": "A PhD is by definition an extended exercise in hypothesis formation, experimental design under real biological/environmental constraints, and defence of trade-offs at confirmation and final examination",
      "recommendations": []
    },
    "D3": {
      "rationale": "Agricultural science research demands genuine statistical/quantitative depth (biometrics, experimental design, increasingly genomics/remote-sensing data science) embedded throughout candidature, assessed via thesis and publication",
      "recommendations": [
        {
          "action": "Add a data-science/precision-agriculture technical stream (remote sensing, genomics pipelines, ML for phenotyping) as an explicit elective/skills pathway",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D3"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "Field research under uncontrolled weather, seasonal, and biological variability is inherently high-uncertainty; candidates must defend real methodological trade-offs, not scripted responses",
      "recommendations": []
    },
    "D5": {
      "rationale": "No explicit AI/governance curriculum component is evidenced in handbook text; AI tool use is left to individual supervisory culture rather than structured training — a gap for a research-training program in 2026",
      "recommendations": [
        {
          "action": "Introduce a mandatory AI-in-research-methods module covering AI-assisted literature synthesis, statistical/ML tooling limits, and responsible-use policy for thesis work",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Build an AI-tool-use disclosure and governance norm into thesis submission (mirroring emerging journal policies) so graduates leave with practised AI governance literacy",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "D5"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "A 4-year PhD produces deep, durable specialist expertise in a specific agricultural sub-domain (e.g., crop physiology, soil science, animal genetics) — the definition of hard-to-substitute specialisation",
      "recommendations": []
    },
    "D7": {
      "rationale": "Candidates generate primary empirical data (field trials, lab assays) and must defend methodology under supervisory and examiner scrutiny — the core assessed competency of the degree",
      "recommendations": []
    },
    "D8": {
      "rationale": "Meaningful stakeholder engagement exists (industry co-funded projects, grower/extension interaction, supervisory relationships) but is not a formally assessed core competency the way clinical/care disciplines require",
      "recommendations": [
        {
          "action": "Formalise stakeholder/extension communication as an assessed competency (e.g., a grower/industry presentation component at confirmation or final seminar)",
          "priority": "P4",
          "effort": "Low",
          "dimRefs": [
            "D8"
          ]
        }
      ]
    },
    "D9": {
      "rationale": "No evidence of structured feedback loops or AI-aware curriculum refresh; research training structure is traditionally supervisor-led rather than centrally updated against emerging AI/data-science skills",
      "recommendations": [
        {
          "action": "Establish a structured curriculum/supervisory review cycle (annual, with industry advisory input from GRDC/AWI/MLA/agtech partners) to keep methods training current",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "No granular destination data (roles/industries/salary/time-to-employment) is published for this specific program in the handbook; general UoM PhD outcome tracking is not discipline-specific enough to score higher",
      "recommendations": [
        {
          "action": "Publish granular graduate destination data (role, employer sector, time-to-placement) for Agricultural Sciences PhD completions specifically, not aggregate UoM PhD stats",
          "priority": "P3",
          "effort": "Low",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "Combines technical/quantitative depth, deep agricultural domain expertise, and field/physical judgment in a way that strongly resists AI substitution — a rare integration",
      "recommendations": []
    }
  },
  "dfva-dr-philart": {
    "D1": {
      "rationale": "The defining task — constructing and defending an 80,000-word original argument under oral examination — requires irreducible human judgment, interpretation, and accountability; no automatable role cluster exists at the centre of the degree.",
      "recommendations": [
        {
          "action": "Create a cross-disciplinary \"AI-verification editor\" placement/internship pathway — positioning humanities PhD graduates' verification and judgment skills against the AI-generated content surge in publishing, policy, and media sectors as an explicit employment bridge",
          "priority": "P7",
          "effort": "Medium",
          "dimRefs": [
            "D1"
          ]
        }
      ]
    },
    "D2": {
      "rationale": "The entire candidature is hypothesis formation, research design, and defence of a novel framing under supervisory and examiner scrutiny across 4 years — assessed continuously via confirmation, milestone review, and final examination, not templated.",
      "recommendations": []
    },
    "D3": {
      "rationale": "Discipline-dependent and generally light on quantitative/technical rigour relative to STEM or applied social-science PhDs; humanities disciplines (history, philosophy, cultural studies, languages) emphasise interpretive and archival method over statistical/computational technique.",
      "recommendations": [
        {
          "action": "Add a lightweight, discipline-agnostic quantitative/digital-methods training component (data literacy, digital humanities tools, corpus analysis where relevant) available to all Arts PhD candidates regardless of thesis topic",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D3"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "Candidates must independently define a viable research question, defend methodological choices against ambiguous/contested evidence, and revise under supervisor and examiner challenge — the archetypal high-stakes, unscripted decision environment.",
      "recommendations": []
    },
    "D5": {
      "rationale": "No structural AI literacy or governance content indicated by the handbook description or typical humanities PhD structure; AI tool use (if any) is left to individual candidate practice rather than taught or assessed.",
      "recommendations": [
        {
          "action": "Introduce a mandatory AI-in-research-practice module covering AI literacy, research-integrity policy, appropriate use of AI for literature review/drafting, and critical evaluation of AI-generated content — delivered at confirmation stage across all Arts PhD disciplines",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "A 4-year, single-topic doctorate within a defined discipline (history, linguistics, politics, Asian studies, etc.) produces exactly the kind of deep, narrow, years-in-the-making specialist expertise this dimension rewards.",
      "recommendations": []
    },
    "D7": {
      "rationale": "The thesis itself is primary research — original archival work, textual analysis, fieldwork, or theoretical contribution — defended under formal oral examination; this is the maximal expression of this dimension, not a proxy for it.",
      "recommendations": []
    },
    "D8": {
      "rationale": "Many disciplines within this degree (ethnography, oral history, cultural studies fieldwork) build genuine relational capability, but this varies significantly by sub-discipline and is not universal across all Arts PhD pathways (e.g., a purely archival philosophy thesis has less relational demand).",
      "recommendations": [
        {
          "action": "Expand structured public engagement and knowledge-translation training (writing for non-specialist audiences, policy brief writing, media engagement) as a core research-training component, not an optional extra",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D8"
          ]
        }
      ]
    },
    "D9": {
      "rationale": "Research doctorates have no curriculum to refresh in the coursework sense, and the handbook text gives no evidence of structured AI-in-research-practice guidance, research-integrity-and-AI policy updates, or supervisory training refresh — currency is left to individual supervisors.",
      "recommendations": [
        {
          "action": "Formalise supervisory training refresh cycles that explicitly address AI's impact on research practice, examination standards, and academic integrity, with documented review at least every 2 years",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "No destination data of any kind provided; humanities PhD outcome tracking nationally is notoriously thin (academic-market placement rates are rarely published, non-academic destinations even less so).",
      "recommendations": [
        {
          "action": "Establish a structured non-academic career pathway program (policy, cultural sector, publishing, government) with named alumni case studies, employer partnerships, and explicit skills-translation workshops, rather than leaving non-academic transition to informal networks",
          "priority": "P2",
          "effort": "High",
          "dimRefs": [
            "D10"
          ]
        },
        {
          "action": "Commission and publish a graduate destination survey specific to Arts PhD completions (academic placement rate, time-to-placement, non-academic destination categories, salary bands) at 1-year and 3-year intervals",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "Deep domain specialisation and demonstrated research rigour combine with real human judgment, but the degree does not explicitly build technical/quantitative depth alongside them, so the \"rare triple integration\" bar is not fully met.",
      "recommendations": []
    }
  },
  "dfva-dr-philbe": {
    "D1": {
      "rationale": "A completed PhD in any of the eight disciplines is, by definition, evidence of original contribution and design/accountability — this is not an entry-level templated-task cohort; even the academia-adjacent early-career roles (postdoc, junior faculty) require independent research design from day one.",
      "recommendations": []
    },
    "D2": {
      "rationale": "Hypothesis formation, constraint reasoning, and failure-mode analysis (identification strategy validity, model misspecification, external validity) are the explicit, assessed core of doctoral research training across all eight disciplines, not a bolt-on.",
      "recommendations": [
        {
          "action": "Formalise a \"defended contribution\" rubric at confirmation and final examination that explicitly requires candidates to articulate what is irreducibly their own judgment versus AI-assisted execution",
          "priority": "P4",
          "effort": "Low",
          "dimRefs": [
            "D2",
            "D4"
          ]
        }
      ]
    },
    "D3": {
      "rationale": "Actuarial Studies, Decision/Risk/Financial Sciences, Finance and Economics carry strong quantitative cores by disciplinary norm; even the more qualitative streams (Management, Marketing) require rigorous methodological training to reach thesis-examination standard. The degree-wide floor is high.",
      "recommendations": []
    },
    "D4": {
      "rationale": "The confirmation milestone and final thesis examination are themselves live, high-stakes defences of trade-offs and design choices under real scrutiny from independent examiners — this is the definitional assessment mechanism of a PhD, not a simulation of one.",
      "recommendations": [
        {
          "action": "Formalise a \"defended contribution\" rubric at confirmation and final examination that explicitly requires candidates to articulate what is irreducibly their own judgment versus AI-assisted execution",
          "priority": "P4",
          "effort": "Low",
          "dimRefs": [
            "D2",
            "D4"
          ]
        }
      ]
    },
    "D5": {
      "rationale": "No explicit AI literacy/governance curriculum is evident from the handbook text (which is generic across all UoM PhDs); candidates are expected to adopt AI tools organically through supervision rather than via structured coverage of AI failure modes, and there is no evidence of formal governance training embedded in the research training pathway.",
      "recommendations": [
        {
          "action": "Embed a mandatory AI-in-research-methods module covering literature-synthesis tool limitations, AI-assisted coding verification practices, and disclosure/governance norms for AI use in thesis work",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "Eight named, distinct disciplines (Accounting, Actuarial Studies, Business Administration and Analytics, Decision/Risk/Financial Sciences, Economics, Finance, Management, Marketing) each carry established, multi-year specialist bodies of knowledge; a PhD candidate develops depth in one that takes years and cannot be substituted across disciplines.",
      "recommendations": []
    },
    "D7": {
      "rationale": "This is the entire purpose of the degree: candidates generate primary evidence (empirical studies, formal models, original data collection or novel identification strategies) and must defend methodology under independent examination — the strongest possible expression of this dimension.",
      "recommendations": []
    },
    "D8": {
      "rationale": "Business/economics research is not a clinical or physically embodied discipline; ethics review (for human-subjects research, e.g. in Management/Marketing survey or experimental work) is present but not a defining core competency across all eight streams — most (Economics, Finance, Actuarial Studies) involve minimal direct human-subject/relational practice.",
      "recommendations": [
        {
          "action": "Introduce a light-touch human-subjects/stakeholder-ethics module for Management and Marketing streams to strengthen relational/ethical grounding relative to the more quantitative disciplines",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D8"
          ]
        }
      ]
    },
    "D9": {
      "rationale": "No evidence in the handbook text of a structured feedback loop, advisory-board mechanism, or explicit AI-in-research-methods update; research doctorates rely on individual supervisor currency rather than a tracked, living curriculum, and there's no visible outcome-tracking mechanism described.",
      "recommendations": [
        {
          "action": "Establish a standing industry/academic advisory panel per discipline cluster (quant vs behavioural) to review research training currency against evolving AI-augmented research practice every 12-18 months",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "The handbook text provides no destination-tracking or granular outcome data (roles, industries, salary, time-to-employment) specific to this program; Melbourne publishes general graduate outcome surveys but nothing granular enough at the PhD-by-discipline level is evidenced here.",
      "recommendations": [
        {
          "action": "Publish granular, discipline-level graduate destination data (academia vs central bank/government vs quant finance vs consulting) across the eight sub-disciplines, updated annually",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        },
        {
          "action": "Create a structured non-academic pathway track (central bank, quant finance, applied consulting placements/internships during candidature) to hedge against the contracting academic job market",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        },
        {
          "action": "Track and publish time-to-completion and post-PhD career trajectory data by discipline as a leading indicator ahead of full outcome surveys",
          "priority": "P7",
          "effort": "Low",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "The combination of deep technical/quantitative method, a specific specialist discipline (one of eight), and the examined, defended judgment of an independent original contribution is a rare integration that strongly resists AI substitution — this is close to the ceiling case for the bonus dimension.",
      "recommendations": []
    }
  },
  "dfva-dr-philedp": {
    "D1": {
      "rationale": "Combined registered clinical practice (assessment, formulation, therapeutic intervention with children/families) plus independent PhD research — both are judgment/accountability-bearing from day one, not routine or templated.",
      "recommendations": []
    },
    "D2": {
      "rationale": "Case formulation integrates developmental theory, family systems, and school context; PhD component requires hypothesis formation and defended constraint reasoning across a full thesis.",
      "recommendations": [
        {
          "action": "Add a research-practice integration unit where PhD candidates apply their thesis research question to a real clinical case series from their placement, tightening the link between the research and professional halves of the degree",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D2",
            "D7"
          ]
        }
      ]
    },
    "D3": {
      "rationale": "Psychometric assessment and interpretation, plus PhD-level research methods and statistics (data collection, analysis, defended methodology) — genuine technical core embedded throughout both program halves.",
      "recommendations": []
    },
    "D4": {
      "rationale": "Supervised placements require real clinical decisions with children/families under professional accountability; PhD candidature is itself a multi-year live research project with genuine uncertainty.",
      "recommendations": []
    },
    "D5": {
      "rationale": "Handbook text gives no evidence of explicit AI curriculum, tool governance, or AI-specific ethics content — generic accreditation/registration language only.",
      "recommendations": [
        {
          "action": "Introduce a dedicated AI literacy and governance module covering AI-assisted psychometric scoring, report drafting, and the ethical/regulatory limits of AI in clinical psychology practice with minors",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Introduce structured training on AI-assisted evidence synthesis (literature review tools) as a supervised skill within the PhD component, explicitly teaching critique of AI-generated summaries rather than passive use",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D5"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "APAC-accredited educational and developmental psychology specialisation with registration eligibility — deep, narrow, multi-year specialist expertise that cannot be acquired quickly.",
      "recommendations": []
    },
    "D7": {
      "rationale": "Genuine PhD thesis component requiring primary data generation and methodology defended under formal doctoral examination — the clearest possible expression of this dimension.",
      "recommendations": [
        {
          "action": "Add a research-practice integration unit where PhD candidates apply their thesis research question to a real clinical case series from their placement, tightening the link between the research and professional halves of the degree",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D2",
            "D7"
          ]
        }
      ]
    },
    "D8": {
      "rationale": "Direct therapeutic and educational intervention with children, families, and school systems is core professional competency, not an elective add-on; registration itself certifies this capability.",
      "recommendations": []
    },
    "D9": {
      "rationale": "APAC accreditation implies periodic curriculum review cycles, but the handbook text gives no specific evidence of a recent AI-related refresh or explicit feedback-loop mechanism.",
      "recommendations": [
        {
          "action": "Formalise a curriculum review cycle tied explicitly to AI tool adoption in psychometric assessment and school-system consultation, with a published review cadence",
          "priority": "P3",
          "effort": "Low",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "Registration-linked outcomes (Psychology Board of Australia registration rates, AHPRA data) are generally trackable at a sector level, but the handbook text provides no program-specific granular destination data.",
      "recommendations": [
        {
          "action": "Publish explicit, program-specific transfer statistics (MC-PSYCHED entrants vs DR-PHILEDP transfers vs completions) and post-registration destination data to strengthen the graduate outcome evidence base",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        },
        {
          "action": "Publish a transparent account of the selection criteria and competitiveness of the Masters-to-PhD transfer, both to manage applicant expectations and to make the durability signal (selective filtering) visible to prospective students and employers",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "Rare triple integration: accredited clinical/relational competency, deep specialist domain knowledge, and independent PhD-level research rigour — combined via a genuinely competitive selection filter, not merely co-located in one program.",
      "recommendations": []
    }
  },
  "dfva-dr-philedu": {
    "D1": {
      "rationale": "Academic, policy and system-leadership roles retain accountability and judgment; but publishing/writing/synthesis-heavy early-career academic work is highly exposed to AI drafting tools",
      "recommendations": [
        {
          "action": "Formalise applied/policy placement or industry-engagement pathways (government, NGO, system-leadership secondments) alongside the traditional academic pipeline",
          "priority": "P5",
          "effort": "High",
          "dimRefs": [
            "D1",
            "D8"
          ]
        }
      ]
    },
    "D2": {
      "rationale": "A PhD by definition requires original problem framing and defended methodology (implicit in \"research on a specific topic\"), but handbook gives no visibility into structured systems-thinking training beyond the thesis itself",
      "recommendations": [
        {
          "action": "Require an original primary-data component (empirical fieldwork, not purely literature-based theses) as a stated expectation, to structurally reduce reliance on AI-exposed secondary synthesis",
          "priority": "P7",
          "effort": "High",
          "dimRefs": [
            "D2",
            "D4"
          ]
        }
      ]
    },
    "D3": {
      "rationale": "Education doctorates vary widely — many are qualitative/theoretical with limited quantitative rigour; handbook provides no evidence of a mandated statistics/data core, so scored conservatively",
      "recommendations": [
        {
          "action": "Strengthen and publicise quantitative/computational methods training pathways for candidates whose projects would benefit from them (learning analytics, causal inference, psychometrics)",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D3"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "Thesis research inherently involves real methodological trade-offs and defended decisions under supervisory/examiner scrutiny, satisfying a baseline level even absent visible coursework structure",
      "recommendations": [
        {
          "action": "Require an original primary-data component (empirical fieldwork, not purely literature-based theses) as a stated expectation, to structurally reduce reliance on AI-exposed secondary synthesis",
          "priority": "P7",
          "effort": "High",
          "dimRefs": [
            "D2",
            "D4"
          ]
        }
      ]
    },
    "D5": {
      "rationale": "No AI content, coursework, or governance framing is mentioned anywhere in the available handbook text; no evidence this is addressed",
      "recommendations": [
        {
          "action": "Introduce a mandatory AI literacy and research-integrity module covering AI use in literature review, data analysis, and academic writing, with explicit governance/ethics framing",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "A 4-year full-time research doctorate in a defined discipline (education) builds durable specialist expertise by design, though \"education\" as a field is broad rather than narrowly technical/regulatory",
      "recommendations": []
    },
    "D7": {
      "rationale": "Core to the degree — candidates must design, conduct, and defend an original research methodology under examination; this is the strongest and most evidence-clear dimension for any PhD",
      "recommendations": []
    },
    "D8": {
      "rationale": "Education research and practice is inherently relational (teaching, stakeholder engagement, policy negotiation), though the handbook gives no detail on practicum, fieldwork, or clinical-style relational accountability",
      "recommendations": [
        {
          "action": "Formalise applied/policy placement or industry-engagement pathways (government, NGO, system-leadership secondments) alongside the traditional academic pipeline",
          "priority": "P5",
          "effort": "High",
          "dimRefs": [
            "D1",
            "D8"
          ]
        }
      ]
    },
    "D9": {
      "rationale": "Handbook text is a single generic boilerplate sentence with no evidence of recent review, AI-related curriculum updates, or feedback loops — scored 0 due to genuine absence of evidence, flagged as an evidence gap below",
      "recommendations": [
        {
          "action": "Publish evidence of curriculum review cadence and any AI-related methodological or governance content in candidature milestones (confirmation, progress review)",
          "priority": "P2",
          "effort": "Low",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "No destination data, employment outcomes, or granular outcome tracking published on this handbook page — scored 0 due to absence of evidence, flagged as an evidence gap below",
      "recommendations": [
        {
          "action": "Publish detailed candidate destination/outcome data (academic placement rate, policy/industry roles, time-to-first-position) on the handbook page",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "Practitioner-researcher candidates (many MGSE PhD students are working educators) combine domain expertise with research rigour, a modest but real differentiator; not a strong triple-integration case absent more evidence",
      "recommendations": [
        {
          "action": "Explicitly document and market the practitioner-researcher dual-skill pathway (working educators completing the PhD) as the program's irreplaceability differentiator",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "B"
          ]
        }
      ]
    }
  },
  "dfva-dr-phileit": {
    "D1": {
      "rationale": "Graduate destinations (postdoc research, industrial R&D, deep-tech specialist roles) require original judgment, experimental design, and accountability for novel technical claims from day one — the antithesis of templated task execution.",
      "recommendations": [
        {
          "action": "Pilot a structured industry-embedded PhD track (co-supervision with industry partners in high-growth sectors: medtech, energy transition, advanced manufacturing, AI/ML systems) to strengthen non-academic destination pathways",
          "priority": "P6",
          "effort": "High",
          "dimRefs": [
            "D1",
            "D10"
          ]
        }
      ]
    },
    "D2": {
      "rationale": "The entire PhD structure (research proposal → confirmation → thesis → oral defence) is a multi-year exercise in hypothesis formation, constraint reasoning, and failure-mode analysis under expert challenge; this is assessed continuously, not incidentally.",
      "recommendations": []
    },
    "D3": {
      "rationale": "All six constituent disciplines (Biomedical, Chemical, Computer/IS, Electrical/Electronic, Infrastructure, Mechanical Engineering) demand deep, embedded quantitative and technical competence as the baseline entry requirement for candidature, not an add-on.",
      "recommendations": []
    },
    "D4": {
      "rationale": "Multi-year original research under real resource, equipment, and time constraints, culminating in a live oral defence, is the maximal form of defended-trade-off assessment in the entire rubric.",
      "recommendations": []
    },
    "D5": {
      "rationale": "Handbook text contains no explicit AI literacy, governance, or ethics-of-AI curriculum component; AI tool use is left to informal supervisor/lab norms rather than a designed capability. Candidates in Computer and Information Systems likely encounter this incidentally, but it is not structural across the six disciplines.",
      "recommendations": [
        {
          "action": "Introduce a mandatory cross-school \"AI-Augmented Research Methods\" module at confirmation stage, covering AI tool use, verification practices, and governance/IP/authorship implications of AI-assisted research",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Add an explicit \"AI-assisted vs AI-generated contribution\" declaration requirement to thesis submission, protecting the credential's originality signal as AI drafting tools proliferate",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D5"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "A 4-year individually supervised research doctorate in a named engineering/IT sub-discipline is definitionally deep, durable specialist expertise — the clearest possible case for a 3 on this dimension.",
      "recommendations": []
    },
    "D7": {
      "rationale": "Candidates must design and conduct original primary research and defend methodology to expert examiners; this is the core mechanism of the degree, not a component of it.",
      "recommendations": []
    },
    "D8": {
      "rationale": "Handbook text is silent on structured relational/ethical/mentoring capability; some is acquired informally (supervising junior students, industry partner liaison) but nothing is designed or assessed as a competency.",
      "recommendations": [
        {
          "action": "Formalise a relational/professional-skills stream (mentoring practicum, industry-translation communication training, ethics-of-research-conduct workshop) as a milestone-linked requirement, not an optional add-on",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D8"
          ]
        }
      ]
    },
    "D9": {
      "rationale": "As a research-only degree there is no \"curriculum\" to refresh in the coursework sense; currency depends entirely on individual supervisor/lab currency, which is unverified and highly variable across six large schools. No structural mechanism (e.g. mandatory AI-methods training, cross-lab review) is evidenced.",
      "recommendations": [
        {
          "action": "Create a lab-currency audit mechanism (e.g. biennial supervisor AI-methods review, cross-lab seminar series) to reduce variance in how current individual research groups' tooling and methods are",
          "priority": "P4",
          "effort": "Low",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "Handbook text provides no destination data; UoM does not publish granular PhD-graduate outcome tracking (roles/salary/time-to-employment) comparable to QILT-style coursework data, and this is a known institutional gap across UoM's higher degrees by research.",
      "recommendations": [
        {
          "action": "Establish a structured research-outcome tracking system (destination survey at 6/12/24 months post-completion: academic/industry role, sector, salary band) across all six schools, published centrally",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        },
        {
          "action": "Pilot a structured industry-embedded PhD track (co-supervision with industry partners in high-growth sectors: medtech, energy transition, advanced manufacturing, AI/ML systems) to strengthen non-academic destination pathways",
          "priority": "P6",
          "effort": "High",
          "dimRefs": [
            "D1",
            "D10"
          ]
        },
        {
          "action": "Publish discipline-specific (not pooled) outcome and placement data, since the six constituent schools have materially different labour markets (e.g. Computer/IS vs Infrastructure Engineering)",
          "priority": "P7",
          "effort": "Low",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "The combination of deep technical/quantitative specialisation, original judgment under uncertainty, and (for 5 of 6 disciplines) physical/experimental grounding is a rare integration that strongly resists AI substitution.",
      "recommendations": []
    }
  },
  "dfva-dr-philfam": {
    "D1": {
      "rationale": "Doctoral graduates go into original creative production, live performance, clinical practice, and academic leadership — roles defined by judgment, authorship, and accountability, not templated execution, from day one.",
      "recommendations": [
        {
          "action": "Create a structured \"AI-resistant practice\" positioning resource for prospective and current candidates across all disciplines, translating the degree's genuine durability strengths (embodiment, clinical relationship, original authorship, community trust) into career-narrative guidance graduates can use when entering increasingly AI-saturated creative and cultural-sector labour markets",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "D1"
          ]
        }
      ]
    },
    "D2": {
      "rationale": "Practice-led research inherently requires framing an original creative/research problem and defending method choices at confirmation and examination; but this is candidate-driven and supervisor-dependent rather than a taught, assessed curriculum element — no dedicated systems-thinking units exist because there is no coursework.",
      "recommendations": []
    },
    "D3": {
      "rationale": "Deep craft/artistic technical depth exists (composition technique, performance technique, design/production craft) but this is not quantitative or data-technical depth as the rubric intends; disciplines like Music Psychology have some quantitative research methods grounding, but this is not consistent across the 15 disciplines.",
      "recommendations": [
        {
          "action": "Formalise a quantitative/empirical research-methods option for disciplines with a quantitative dimension (Music Psychology, Music Therapy, Creative Arts Therapies), strengthening D3 without diluting the practice-led core of the performance and studio disciplines",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D3"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "A four-year practice-led doctorate is itself a sustained, high-stakes exercise in defending original creative/research decisions under real uncertainty (artistic risk, examiner scrutiny, public presentation) with no scripted answers — this is the core mode of doctoral research.",
      "recommendations": []
    },
    "D5": {
      "rationale": "No AI coverage identified anywhere in the program description; no unit, module, or requirement addresses AI as a creative tool, a labour-market force, or a governance/ethics issue for creative or clinical practice.",
      "recommendations": [
        {
          "action": "Introduce a mandatory cross-disciplinary AI Literacy and Governance module for all DR-PHILFAM candidates, covering generative AI's impact on creative labour markets, ethical/authorship implications of AI-assisted creative tools, and discipline-specific guidance (e.g., generative music for composers, generative VFX for Film and Television candidates)",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "Four years of sustained, supervised, examined specialisation in one of 15 named creative/clinical disciplines represents deep, durable, hard-to-replicate expertise by definition.",
      "recommendations": [
        {
          "action": "Publish explicit registration/accreditation pathway information for Music Therapy, Creative Arts Therapies, and Music Psychology graduates alongside the handbook entry, since these disciplines lead to regulated clinical practice that materially differentiates their employment durability from the purely creative-practice disciplines",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D6"
          ]
        }
      ]
    },
    "D7": {
      "rationale": "Candidates generate primary creative or scholarly work (compositions, performances, exegeses, ethnographic/archival research) and defend methodology under independent expert examination — the doctoral research core.",
      "recommendations": []
    },
    "D8": {
      "rationale": "Music Therapy, Creative Arts Therapies, and Social Practice/Community Engagement disciplines build substantial clinical/relational/community-engaged capability as core competency; performance disciplines require embodied, collaborative, ensemble-based human interaction throughout.",
      "recommendations": []
    },
    "D9": {
      "rationale": "No evidence of AI integration or explicit recent curriculum refresh in the handbook text; the degree structure (supervised individual research) is inherently flexible to candidate topic but there is no institutional feedback loop or outcome-tracking mechanism visible for currency on AI or industry shifts, particularly for the exposed technical/craft disciplines.",
      "recommendations": [
        {
          "action": "Establish an explicit AI-and-craft strategy stream for the technical/production disciplines (Production, Design, Film and Television) within research training, addressing how AI-assisted tools are reshaping professional post-production, design, and technical-direction markets these graduates enter",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D9"
          ]
        },
        {
          "action": "Introduce a light-touch curriculum currency review cycle (e.g., biennial advisory panel including recent graduates from each of the 15 disciplines) to track how professional markets are shifting under AI pressure and feed that back into research-training content",
          "priority": "P7",
          "effort": "Medium",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "No granular destination data, salary, or time-to-employment data published for this specific research doctorate; general QILT/GOS postgraduate research data exists at a coarse field level but not disaggregated by discipline (e.g., Film and Television graduates vs Music Therapy graduates have very different outcome profiles that are not distinguished).",
      "recommendations": [
        {
          "action": "Build a discipline-differentiated graduate outcomes tracking system, disaggregating Film and Television, Design, and Production destinations from Music Therapy, Performance, and Composition destinations, given how differently these disciplines are exposed to AI and how different their career markets are",
          "priority": "P2",
          "effort": "High",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "The combination of four years of doctoral-level technical/artistic depth, discipline-specific specialisation, and irreducibly human embodied/relational/clinical practice (especially in performance and therapy disciplines) is a rare integration that strongly resists AI substitution.",
      "recommendations": []
    }
  },
  "dfva-dr-philik": {
    "D1": {
      "rationale": "Graduate pathways (academic/research institute leadership, community leadership, policy advisory) require accountability, cultural authority, and relational trust from day one; none are templated or routine — the underlying research training scaffold is one of the least automatable in the university",
      "recommendations": []
    },
    "D2": {
      "rationale": "The IKI cross-disciplinary structure explicitly requires candidates to frame research questions that bridge Western and Indigenous knowledge systems, reason about constraints (community protocols, sovereignty, ethics) alongside disciplinary method, and defend trade-offs across the confirmation/milestone review process — integrated, not templated",
      "recommendations": []
    },
    "D3": {
      "rationale": "Depth is real but highly variable across the cohort since candidates sit in disparate home disciplines (Science, Engineering/IT, Law, Health, Arts); scored as \"solid grounding\" structurally, acknowledging some candidates (e.g., in quantitative sciences) will exceed this and others (e.g., Law, Arts) will use different but equally rigorous methodological depth",
      "recommendations": [
        {
          "action": "Introduce a light technical-methods \"bridging\" elective for candidates whose home discipline is technically thin, to lift baseline D3 consistency across the cohort",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D3"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "Community-controlled research requires candidates to navigate live, high-stakes trade-offs (what may be recorded, published, or shared; how to balance academic requirements against community sovereignty) with real accountability to knowledge holders — not scripted or simulated",
      "recommendations": []
    },
    "D5": {
      "rationale": "The generic handbook text and program structure show no explicit AI curriculum component; nothing indicates candidates are formally trained to deploy, supervise, or critique AI workflows — an area of genuine curriculum gap despite the degree's strength elsewhere",
      "recommendations": [
        {
          "action": "Add a mandatory AI literacy and governance module to the cross-disciplinary research methods component — covering AI's role/limits in literature synthesis, transcription, and analysis, plus governance implications for Indigenous data sovereignty when AI tools touch community data",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Formalise an explicit \"AI and Indigenous Data Sovereignty\" policy statement co-developed with community partners, addressing whether/how generative AI tools may touch ICIP-protected or community-consented data",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D8"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "Combines deep discipline-specific specialisation (whatever the home field) with a rare, non-substitutable secondary specialisation in Indigenous knowledge systems, protocols, and methodology — this dual depth takes years to build and is not interchangeable with a standard disciplinary PhD",
      "recommendations": []
    },
    "D7": {
      "rationale": "Candidates must design and conduct original primary research and defend both conventional disciplinary methodology and Indigenous research methodology under examination — this is a primary-evidence-generating doctorate by definition, with rigour tested at confirmation and final oral examination",
      "recommendations": []
    },
    "D8": {
      "rationale": "Relational, ethical, and cultural accountability to knowledge holders and community is not a peripheral ethics module but the structural core of the research process itself — substantial, examined, and central",
      "recommendations": [
        {
          "action": "Formalise an explicit \"AI and Indigenous Data Sovereignty\" policy statement co-developed with community partners, addressing whether/how generative AI tools may touch ICIP-protected or community-consented data",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D8"
          ]
        }
      ]
    },
    "D9": {
      "rationale": "The Indigenous Knowledge Institute is a relatively recent, actively-evolving initiative reflecting growing institutional investment (dedicated coordination, cross-faculty design), but the sparse public handbook text and no visible evidence of an AI-specific curriculum refresh caps this below the top band",
      "recommendations": [
        {
          "action": "Publish a clearer, discipline-agnostic public overview of the cross-disciplinary supervisory and milestone structure (confirmation, mid-candidature review, final oral) to strengthen the D9 currency signal externally",
          "priority": "P4",
          "effort": "Low",
          "dimRefs": [
            "D9"
          ]
        },
        {
          "action": "Formalise cross-disciplinary peer cohort structures (since candidates are dispersed across faculties) so the IKI cohort experience itself becomes a documented, defensible feature of curriculum currency",
          "priority": "P7",
          "effort": "Low",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "No granular published destination data specific to this pathway (roles, institutions, salary, time-to-placement) is available in the handbook or public university reporting — a real evidence gap common to smaller specialist doctorates",
      "recommendations": [
        {
          "action": "Publish a public IKI graduate destination register (roles, sector, institution type, time-to-placement) updated annually, distinct from generic university-wide PhD outcome surveys",
          "priority": "P2",
          "effort": "Low",
          "dimRefs": [
            "D10"
          ]
        },
        {
          "action": "Establish a structured alumni network/case-study series profiling graduates now in academic, community leadership, and policy roles — doubling as market-signal evidence and recruitment material",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "Rare integration of all three: deep discipline-specific technical/scholarly expertise, a second irreplaceable specialisation in Indigenous knowledge systems and community-controlled methodology, and human judgment/relational authority that is the explicit basis of the degree's legitimacy — the cross-disciplinary design also means graduates carry a portable, non-substitutable credential across academia, community leadership, and policy roles simultaneously",
      "recommendations": []
    }
  },
  "dfva-dr-phillaw": {
    "D1": {
      "rationale": "This is not an entry-level-role cohort in the conventional sense — the PhD produces original scholarship examined for novelty, not templated output. Graduates move into academic, judicial, policy, or senior practice roles requiring irreducible judgment, design of new legal theory, and personal accountability for conclusions from day one.",
      "recommendations": [
        {
          "action": "Partner with the Australian Law Reform Commission, state law reform bodies, and superior courts to create defined judicial-associateship and policy-fellowship pathways specifically flagged to Law PhD candidates, reducing reliance on the shrinking academic-only pipeline",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D1"
          ]
        }
      ]
    },
    "D2": {
      "rationale": "The entire candidature is a multi-year exercise in constraint reasoning: identifying an unresolved doctrinal or socio-legal problem, framing a defensible research question, and reasoning through competing legal, institutional, and normative constraints. This is assessed continuously via milestone/confirmation reviews and ultimately the thesis itself — not a \"mentioned but not assessed\" competency but the whole degree.",
      "recommendations": []
    },
    "D3": {
      "rationale": "Legal scholarship is predominantly doctrinal/interpretive rather than quantitative. Where candidates pursue empirical or comparative-quantitative legal method (a minority track), technical depth rises, but there is no compulsory statistics, coding, or data-science requirement across the PhD in Law generally. Score reflects the discipline norm, distinct from a PhD in a quantitative field.",
      "recommendations": [
        {
          "action": "Encourage (via supervisory guidance, not mandate) a comparative or empirical legal method component alongside doctrinal work where the research question permits, to build technical/quantitative depth and differentiate graduates in an increasingly interdisciplinary legal academy",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D3"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "A legal PhD candidate must independently determine research direction, defend methodological choices to a supervisory panel and examiners, and revise argument under genuine uncertainty (contested case law, unresolved doctrinal splits, incomplete comparative data) over several years — with real accountability (the thesis can be failed or require major revision). This is the definition of the top band.",
      "recommendations": []
    },
    "D5": {
      "rationale": "The generic PhD handbook text contains no AI-specific content, and unlike the JD (which has AI-focused electives such as Law and Automation, AI and Justice), there is no evidence of structured AI-literacy training built into doctoral candidature at Melbourne Law School. Candidates likely use AI research tools informally, but this is not a taught or assessed competency of the degree.",
      "recommendations": [
        {
          "action": "Introduce a compulsory (or strongly expected) AI-literacy module for all Law PhD candidates covering AI legal research tool capabilities/limits, AI's role in legal practice and scholarship, and the ethics of AI-assisted drafting in doctoral work — positioned as \"how to supervise and critique AI legal reasoning,\" not \"how to use ChatGPT\"",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Provide guidance and institutional support (grant-writing workshops, seed funding) for candidates pursuing AI-adjacent legal scholarship (AI regulation, algorithmic accountability, legal-tech governance) as a strategically well-positioned specialisation given rising demand for legal experts who can critique AI systems",
          "priority": "P7",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D6"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "A completed legal PhD represents the deepest possible specialisation in a chosen area of law — years of sustained, supervised, original engagement with a narrow doctrinal or socio-legal field, examined externally for expert-level contribution. This exceeds even the JD's broad-but-compulsory Priestley 11 coverage in depth (though not breadth) within the chosen specialisation.",
      "recommendations": [
        {
          "action": "Provide guidance and institutional support (grant-writing workshops, seed funding) for candidates pursuing AI-adjacent legal scholarship (AI regulation, algorithmic accountability, legal-tech governance) as a strategically well-positioned specialisation given rising demand for legal experts who can critique AI systems",
          "priority": "P7",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D6"
          ]
        }
      ]
    },
    "D7": {
      "rationale": "This is the core purpose of the degree. Candidates design and conduct original legal research — doctrinal, comparative, theoretical, or empirical — and must defend their methodology under sustained supervisory and external-examiner scrutiny. This is categorically different from the JD's single Legal Research capstone subject; the entire PhD is a research-methods exercise.",
      "recommendations": []
    },
    "D8": {
      "rationale": "Legal PhD candidates typically engage in supervision relationships, seminar/conference presentation, and often tutoring/mentoring of junior students, all of which build relational and pedagogical capability. However, unlike the JD (which has explicit clinical, negotiation, and client-facing learning outcomes), the PhD's relational demands are academic-collegial rather than client-facing or clinical, and are not formally assessed as a core competency in the way doctrinal contribution is.",
      "recommendations": [
        {
          "action": "Expand structured teaching-and-mentoring opportunities (tutoring, guest lecturing, supervision of JD/undergraduate research) as a tracked, credentialed component of candidature, strengthening the academic-career pipeline this cohort needs",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D8"
          ]
        }
      ]
    },
    "D9": {
      "rationale": "As a research-only higher degree with no defined coursework curriculum, there is no structured mechanism analogous to unit refresh cycles for keeping content current on AI or other fast-moving trends — currency depends entirely on individual supervisor and candidate initiative rather than a designed, tracked curriculum feedback loop. This is a structural feature of the PhD format, not a specific failing of this program, but it scores low against the rubric as written.",
      "recommendations": [
        {
          "action": "Formalise a living-curriculum feedback mechanism for doctoral training components (methodology workshops, professional development seminars) with an advisory panel including recent graduates in academic, judicial, and policy roles, reviewed on a defined cycle",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "Melbourne Law School does not publish granular, program-specific destination data for PhD in Law graduates (roles, salary, time-to-academic-position). Generic QILT postgraduate research destination data exists at a broad field level but does not isolate legal PhD outcomes specifically, and does not capture the academic-market-specific metrics (time-to-tenure-track position, postdoc placement rate) that would matter most for this cohort.",
      "recommendations": [
        {
          "action": "Establish a structured graduate destination tracking system specific to Law PhD candidates — academic placement rate, time-to-tenure-track/continuing position, postdoctoral fellowship rate, judicial associateship/policy placement, and non-academic legal research roles — published annually by Melbourne Law School",
          "priority": "P2",
          "effort": "High",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "A completed legal PhD combines rare, deep domain specialisation (D6:3), sustained original research capability under uncertainty (D4:3, D7:3), and a credentialling function (only a PhD opens academic legal careers and many senior judicial-research pathways) that is structurally very difficult to substitute. The rare integration here is not technical-AI capability but scholarly originality plus doctrinal depth plus demonstrated capacity to generate genuinely new legal knowledge — a combination AI cannot currently replicate at examiner-defensible standard.",
      "recommendations": []
    }
  },
  "dfva-dr-philmdh": {
    "D1": {
      "rationale": "Entry-point roles (postdoc, staff scientist, clinician-researcher) require irreducible physical lab/clinical execution, accountable interpretation, and original hypothesis-driven design from day one — not templated tasks.",
      "recommendations": []
    },
    "D2": {
      "rationale": "The entire PhD structure (confirmation, hypothesis refinement, progress review, defended thesis) is built around constraint reasoning, failure-mode analysis (failed experiments, null results), and iterative hypothesis reframing across 4 years — integrated, not incidental.",
      "recommendations": [
        {
          "action": "Add a structured \"AI-assisted vs AI-resistant task\" module to candidate induction, explicitly mapping which parts of the PhD workflow (synthesis, coding) should be AI-augmented and which (design, interpretation, ethics) must remain human-owned",
          "priority": "P7",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D2"
          ]
        }
      ]
    },
    "D3": {
      "rationale": "Across all eleven contributing schools, candidates build a strong technical core: biostatistics, molecular/cell biology techniques, -omics or bioinformatic methods, epidemiological modelling, or bionics/engineering methods depending on discipline — assessed continuously via lab work and thesis chapters.",
      "recommendations": []
    },
    "D4": {
      "rationale": "A 4-year original-research thesis is inherently a live, unscripted uncertainty exercise — experiments fail, hypotheses are revised, and the final thesis must defend real trade-offs to external examiners with genuine accountability.",
      "recommendations": []
    },
    "D5": {
      "rationale": "The generic handbook text has no mention of AI/ML methods training, responsible-AI-in-research-tools guidance, or governance content; while individual labs (esp. bioinformatics/oncology/neuroscience groups) likely use AI tools informally, there is no structured, faculty-level AI literacy or governance curriculum evident for a cohort this large and technically capable — this is the clearest gap in an otherwise strong profile.",
      "recommendations": [
        {
          "action": "Introduce a compulsory faculty-wide \"AI in Biomedical & Clinical Research\" module covering responsible use of AI literature tools, AI-assisted coding/bioinformatics, and governance/ethics of AI in human-subject research",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Embed explicit AI-tool-use disclosure and critical-appraisal requirements into thesis and publication milestones, positioning candidates to supervise/audit AI outputs rather than silently rely on them",
          "priority": "P4",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D9"
          ]
        },
        {
          "action": "Add a structured \"AI-assisted vs AI-resistant task\" module to candidate induction, explicitly mapping which parts of the PhD workflow (synthesis, coding) should be AI-augmented and which (design, interpretation, ethics) must remain human-owned",
          "priority": "P7",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D2"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "Candidates specialise for 4 years within one of eleven deep biomedical/clinical/health domains (oncology, neuroscience, dental science, population health, medical bionics, etc.), producing durable, hard-to-replicate expertise.",
      "recommendations": []
    },
    "D7": {
      "rationale": "This is a primary-data-generation research doctorate by definition — candidates design and conduct original experimental, clinical, or population-health research and must defend methodology under examiner scrutiny; the definitional core of the degree.",
      "recommendations": []
    },
    "D8": {
      "rationale": "Programs involving clinical, dental, psychological, and population-health research (a majority of the eleven contributing units) build substantial human-subject, ethics, and stakeholder-engagement practice; pure basic-science lab streams (e.g. some WEHI/biomedical science projects) have less relational load, pulling the average down from a 3.",
      "recommendations": [
        {
          "action": "Strengthen structured relational/ethics training for basic-science streams (WEHI, some biomedical science projects) that currently have lighter human-subject exposure than clinical/population-health streams",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D8"
          ]
        }
      ]
    },
    "D9": {
      "rationale": "Individual research groups and institutes (WEHI, Peter Mac, Florey, Doherty-affiliated) are demonstrably at the cutting edge of their respective fields and supervisors' research agendas evolve continuously with the literature, but there is no visible faculty-level structured curriculum review or AI-specific update process evidenced in the handbook — currency is real but informal/supervisor-dependent rather than systematised.",
      "recommendations": [
        {
          "action": "Formalise a faculty-level curriculum currency process — an annual cross-institute advisory review (WEHI, Peter Mac, Florey, Doherty) feeding structured updates into confirmation/progress-review expectations, explicitly including AI-method currency",
          "priority": "P3",
          "effort": "Low",
          "dimRefs": [
            "D9"
          ]
        },
        {
          "action": "Embed explicit AI-tool-use disclosure and critical-appraisal requirements into thesis and publication milestones, positioning candidates to supervise/audit AI outputs rather than silently rely on them",
          "priority": "P4",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "No granular destination data (roles, industries, salary, time-to-employment) is published in the handbook text for this specific program; UoM publishes broader GOS/QILT satisfaction-style data at university level but not program-specific granular outcome tracking for PhD-MDHS graduates.",
      "recommendations": [
        {
          "action": "Publish granular program-level graduate destination data (postdoc placement rates, industry vs academia split, time-to-first-position, by contributing school)",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        },
        {
          "action": "Create a cross-institute \"translational pathways\" tracking cohort to evidence how basic-science PhD graduates move into clinical/industry translation roles, feeding both D10 evidence and program marketing",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "The combination of deep clinical/biomedical domain expertise, rigorous quantitative/technical methods training, and accountable human judgment (especially in clinical and human-subject-adjacent streams) is a rare triple integration that strongly resists AI substitution.",
      "recommendations": []
    }
  },
  "dfva-dr-philsci": {
    "D1": {
      "rationale": "Graduate roles (postdoc, R&D scientist, agency researcher) mix highly automatable tasks (lit review, stats processing, reporting) with irreducible ones (experimental design, physical lab/field work, accountable interpretation). The physical/wet-lab and field components across most of the six schools anchor this above a pure knowledge-work score, but the computational sub-disciplines (Maths & Stats, Physics) pull it down from a 3.",
      "recommendations": []
    },
    "D2": {
      "rationale": "A PhD is structurally built around hypothesis formation, experimental/model design, and failure-mode analysis (why did the experiment/model not work, what confound explains an anomaly) — assessed continuously via candidature milestones and ultimately the thesis and defence, not a templated curriculum.",
      "recommendations": [
        {
          "action": "For computationally-oriented sub-disciplines (Maths & Stats, Physics, Earth Sciences modelling), add an explicit \"novel methodology beyond automatable pipelines\" expectation to confirmation criteria to protect against AI-templated research drift",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "D2",
            "D3"
          ]
        }
      ]
    },
    "D3": {
      "rationale": "Across all six schools the degree demands deep, discipline-specific technical competence — instrumentation and analytical chemistry, statistical/mathematical modelling, computational methods, or field/ecological measurement — developed and continuously assessed over four years of original research, not an intro unit.",
      "recommendations": [
        {
          "action": "For computationally-oriented sub-disciplines (Maths & Stats, Physics, Earth Sciences modelling), add an explicit \"novel methodology beyond automatable pipelines\" expectation to confirmation criteria to protect against AI-templated research drift",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "D2",
            "D3"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "Original research is inherently uncertain: candidates must defend methodological choices, interpret ambiguous or contradictory data, and adapt experimental/analytical plans under real resource and time constraints, examined by external assessors at confirmation, milestone review, and thesis examination.",
      "recommendations": [
        {
          "action": "Formalise \"AI-augmented analysis\" competency standards within confirmation/milestone reviews — candidates must demonstrate they can critically validate, not just deploy, AI-generated code/analysis",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D4"
          ]
        }
      ]
    },
    "D5": {
      "rationale": "The handbook text shows no explicit AI/data-governance curriculum component. AI tool use is likely occurring organically (as a research aid) but is not evidenced as a taught, assessed, or governed competency — this is a generic PhD structure with no visible AI-specific research-integrity or governance training.",
      "recommendations": [
        {
          "action": "Introduce a mandatory cross-school \"AI in Research\" module covering AI-assisted literature review, code generation, model validation risks, and research-integrity/authorship policy for AI-assisted work",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Formalise \"AI-augmented analysis\" competency standards within confirmation/milestone reviews — candidates must demonstrate they can critically validate, not just deploy, AI-generated code/analysis",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D4"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "By design, a four-year PhD in a specific discipline (chemistry, physics, ecology, statistics, etc.) within one of six specialist schools builds deep, narrow, durable expertise that is the degree's entire purpose.",
      "recommendations": []
    },
    "D7": {
      "rationale": "This is a research doctorate: candidates design and conduct original primary research (experiments, field studies, models, or proofs) and must defend their methodology under external examination — the strongest possible expression of this dimension.",
      "recommendations": []
    },
    "D8": {
      "rationale": "The handbook text does not evidence structured interpersonal, ethics, or stakeholder-engagement training beyond standard research-integrity/ethics approval processes implicit in any research degree. Some schools (fieldwork-heavy, team-based labs) build this informally, but it is not a designed, assessed curriculum element.",
      "recommendations": [
        {
          "action": "Add a structured research-communication and stakeholder-engagement component (public science communication, policy briefing practice, cross-disciplinary collaboration) as an assessed milestone alongside the thesis",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D8"
          ]
        }
      ]
    },
    "D9": {
      "rationale": "No AI content or recent curriculum refresh is evidenced in the handbook text; the described structure is generic boilerplate (\"research on a specific topic\") unchanged across cohorts. Absent visible advisory-board/outcome-tracking mechanisms, this scores low despite likely informal supervisor-level currency.",
      "recommendations": [
        {
          "action": "Establish a graduate research advisory panel (industry + academic) per school with an annual curriculum/training refresh cycle, explicitly reviewing AI-tool currency",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "No granular destination data (roles, industries, salary, time-to-employment) is provided in the handbook text; University of Melbourne publishes broader QILT/graduate outcomes data but not visibly segmented at the DR-PHILSCI/school level within this source.",
      "recommendations": [
        {
          "action": "Publish granular DR-PHILSCI destination data by school (postdoc placement, industry sector, government agency, time-to-first-position) via the university careers/graduate outcomes office",
          "priority": "P3",
          "effort": "Low",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "The combination of deep technical/quantitative training, hands-on physical or computational specialist skill, and demonstrated original-research judgment (own a novel research question, defend it under scrutiny) is a rare, hard-to-substitute bundle — the archetype of what AI cannot yet replicate end-to-end.",
      "recommendations": [
        {
          "action": "Create a physical/field-skills recognition credential (instrumentation certification, field-safety leadership) that graduates can cite externally, reinforcing the irreplaceability premium",
          "priority": "P7",
          "effort": "Low",
          "dimRefs": [
            "B"
          ]
        }
      ]
    }
  },
  "dfva-dr-philvet": {
    "D1": {
      "rationale": "Graduate roles (research scientist, academic, biosecurity officer, R&D scientist) require irreducible judgment, physical/field skill, and regulatory accountability from day one — not templated tasks.",
      "recommendations": [
        {
          "action": "Highlight the degree's AI-resistant physical/field/regulatory core explicitly in program marketing and candidate induction, reframing the value proposition against generalist AI-augmented research roles",
          "priority": "P7",
          "effort": "Low",
          "dimRefs": [
            "D1",
            "B"
          ]
        }
      ]
    },
    "D2": {
      "rationale": "The entire candidature is an exercise in hypothesis formation, constraint reasoning (ethics, biosecurity, biological variability), and failure-mode analysis (why did the model/assay/trial not work), assessed continuously via milestones and ultimately the thesis defence.",
      "recommendations": []
    },
    "D3": {
      "rationale": "Candidates build deep, assessed technical competence in statistics/bioinformatics/laboratory or field methodology specific to their research cluster (epidemiology, molecular diagnostics, pathology, toxicology) — this is the core deliverable of the degree, not an add-on.",
      "recommendations": []
    },
    "D4": {
      "rationale": "Thesis research is inherently unscripted: candidates must defend real methodological trade-offs (sample size, model assumptions, field logistics) under supervisor and examiner scrutiny across a multi-year live project with genuine accountability for outcomes.",
      "recommendations": []
    },
    "D5": {
      "rationale": "Handbook text gives no evidence of structured AI-in-research-methods training; researcher-development coursework in Australian PhD programs is only beginning to formalise AI tool governance (e.g., disclosure in theses, appropriate use in data analysis) — likely present informally but not demonstrated as embedded.",
      "recommendations": [
        {
          "action": "Embed a mandatory AI-in-research-methods module covering appropriate use, disclosure, and critical evaluation of AI tools in literature review, data analysis, and thesis writing",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Formalise a structured \"AI-literate research scientist\" competency statement in candidature milestones — requiring candidates to demonstrate critical use (not just use) of AI tools in their confirmation and mid-candidature reviews",
          "priority": "P4",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D9"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "Candidates build multi-year, deep specialist expertise in a narrow veterinary/animal-health research area (e.g., a specific pathogen, disease system, or biological mechanism) — the definition of durable, hard-to-replicate specialisation.",
      "recommendations": []
    },
    "D7": {
      "rationale": "This is a primary-research doctorate by definition — candidates design and conduct original research and must defend methodology under independent examination; this is the single strongest-evidenced dimension for any PhD.",
      "recommendations": []
    },
    "D8": {
      "rationale": "Veterinary research frequently involves animal welfare/ethics stewardship, stakeholder engagement (farmers, clinicians, regulators, industry), and for many clusters, human-animal interaction in field/clinical settings — meaningful but not universally a \"substantial clinical/care\" core across all research sub-fields (e.g., a purely bioinformatic thesis has less of this than a field epidemiology one).",
      "recommendations": [
        {
          "action": "Expand cross-disciplinary stakeholder engagement opportunities (industry placements with animal-health biotech, secondments to government biosecurity agencies) to strengthen D8 relational/translational capability, particularly for lab-bench-heavy research clusters",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D8"
          ]
        }
      ]
    },
    "D9": {
      "rationale": "Handbook text is generic boilerplate with no visible evidence of recent structural review, advisory feedback loops, or explicit AI-in-curriculum content; research doctorates evolve via supervisor/field currency rather than programmatic curriculum refresh, which is a structural weakness for this dimension specifically.",
      "recommendations": [
        {
          "action": "Establish an annual advisory-panel review of the research-methods coursework component (biostatistics, research integrity, grant literacy) with explicit reference to emerging AI capability in the field",
          "priority": "P3",
          "effort": "Low",
          "dimRefs": [
            "D9"
          ]
        },
        {
          "action": "Formalise a structured \"AI-literate research scientist\" competency statement in candidature milestones — requiring candidates to demonstrate critical use (not just use) of AI tools in their confirmation and mid-candidature reviews",
          "priority": "P4",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D9"
          ]
        },
        {
          "action": "Create a structured alumni network/outcomes registry specific to veterinary research higher degrees, feeding both D10 evidence and D9 curriculum feedback loops",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D9",
            "D10"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "No granular destination data (roles, industries, salary, time-to-employment) is published in the handbook or readily available at the program level; UoM graduate outcome surveys for research higher degrees are typically satisfaction-oriented rather than granular career-tracking.",
      "recommendations": [
        {
          "action": "Publish granular graduate destination data for Veterinary Science PhD completions (academic placements, industry R&D roles, government/biosecurity roles, time-to-first-position) via a School-level tracking survey",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        },
        {
          "action": "Create a structured alumni network/outcomes registry specific to veterinary research higher degrees, feeding both D10 evidence and D9 curriculum feedback loops",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D9",
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "Combines deep technical/quantitative research training + narrow veterinary-science domain expertise + physical/field/regulatory judgment — a rare triple integration that strongly resists AI or generalist substitution.",
      "recommendations": [
        {
          "action": "Highlight the degree's AI-resistant physical/field/regulatory core explicitly in program marketing and candidate induction, reframing the value proposition against generalist AI-augmented research roles",
          "priority": "P7",
          "effort": "Low",
          "dimRefs": [
            "D1",
            "B"
          ]
        }
      ]
    }
  },
  "dfva-mc-ddensur": {
    "D1": {
      "rationale": "Entry-level general dental practice is dominated by hands-on procedural work, diagnosis under a duty of care, and patient-facing judgment from day one of registration — not templated tasks.",
      "recommendations": []
    },
    "D2": {
      "rationale": "Treatment planning requires constraint reasoning (patient health status, cost, longevity of restorations, risk of complications) and is formally assessed through clinical case work, but the handbook text does not evidence an explicit, integrated failure-mode-analysis curriculum strand distinct from clinical supervision.",
      "recommendations": [
        {
          "action": "Introduce a dedicated systems-thinking/failure-mode-analysis strand in treatment-planning units (e.g., structured root-cause analysis of complications) with explicit assessment criteria",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D2"
          ]
        }
      ]
    },
    "D3": {
      "rationale": "The program is built on biomedical science, pharmacology, and clinical technique with practicals and pre-clinical simulation, but the scraped text does not indicate a strong quantitative/data-science core beyond standard biomedical science content.",
      "recommendations": [
        {
          "action": "Strengthen quantitative/data literacy content (e.g., interpreting AI diagnostic confidence scores, basic biostatistics for evidence-based practice) within existing pre-clinical or research units",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D3"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "The final-year private-practice-like clinical placement at the Royal Dental Hospital of Melbourne, with increasing real patient treatment responsibility, is precisely the kind of live, accountable, high-stakes decision-making the rubric rewards at the top band.",
      "recommendations": []
    },
    "D5": {
      "rationale": "No explicit AI/governance curriculum content is evidenced in the handbook text; AI diagnostic-imaging and treatment-planning tools are increasingly material to general dental practice, but nothing in the scraped description indicates the program formally teaches supervision, critique, or governance of such tools.",
      "recommendations": [
        {
          "action": "Add a formal AI-in-dentistry module covering diagnostic-imaging AI (e.g., Overjet/Pearl-style tools), AI treatment-planning support, limitations, and clinician override/accountability",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Formalise AI-governance content within the required research project (e.g., a case study critiquing an AI diagnostic tool's evidence base) to link D5 and D7",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D7"
          ]
        },
        {
          "action": "Add a capstone reflective module on the future scope of AI-augmented general practice, preparing graduates to supervise and critique AI workflows in their own future practices",
          "priority": "P7",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "Dentistry is a deep, statutorily regulated clinical specialisation requiring registration with Dental Practice Boards across Australia and New Zealand — the definition of durable, non-interchangeable expertise.",
      "recommendations": []
    },
    "D7": {
      "rationale": "The program includes a required research-based project, meaning graduates design, conduct, and defend original research as a compulsory component, not an elective add-on.",
      "recommendations": [
        {
          "action": "Formalise AI-governance content within the required research project (e.g., a case study critiquing an AI diagnostic tool's evidence base) to link D5 and D7",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D7"
          ]
        }
      ]
    },
    "D8": {
      "rationale": "Direct, hands-on clinical patient treatment culminating in a private-practice-like final year is substantial, accountable, physical/relational clinical practice — the top band of this dimension.",
      "recommendations": []
    },
    "D9": {
      "rationale": "No evidence in the scraped text of a recent structured curriculum refresh or explicit AI-in-core-units content; the described structure (extended year-long subjects, calendar outside standard semesters) suggests a stable but not clearly demonstrated as an actively AI-updated curriculum.",
      "recommendations": [
        {
          "action": "Establish and document a formal curriculum advisory/review cycle with dated refresh evidence, explicitly incorporating emerging clinical AI tools",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "The handbook text provided contains no destination/employment outcome data; registration as a dental practitioner strongly implies near-universal employment, but this is inferred, not evidenced by published granular outcome data in the source text.",
      "recommendations": [
        {
          "action": "Publish structured, granular graduate outcome data (registration rates, time-to-first-position, geographic distribution, specialisation pathways) via careers/QILT-aligned reporting",
          "priority": "P2",
          "effort": "Low",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "The DDS combines deep biomedical/technical depth, a statutory clinical specialisation, hands-on physical skill, and a compulsory original-research component — a rare integration that strongly resists AI substitution.",
      "recommendations": []
    }
  },
  "dfva-mc-dmed": {
    "D1": {
      "rationale": "Entry role is intern-to-registrar clinical practice: physical examination, procedural skill, emergency escalation, accountable decision-making from day one. Handbook explicitly describes full-time clinical placement in Years 2-3 applying \"foundational knowledge and skills to a broad range of patient encounters\" — irreducibly human, relational, physically embodied work from the outset.",
      "recommendations": [
        {
          "action": "Formalise AI-assisted image/pathology triage exposure during clinical placements as a taught, supervised skill (using it correctly and knowing its limits), rather than incidental exposure",
          "priority": "P7",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D1"
          ]
        }
      ]
    },
    "D2": {
      "rationale": "The three-domain structure (biomedical science, clinical skills, professional practice) plus cross-cutting Population and Global Health theme requires integrating physiological, social and systems-level reasoning, not template execution. Year 4 capstone and Discovery pathways add authentic, assessed system-level problem framing.",
      "recommendations": []
    },
    "D3": {
      "rationale": "Applied biomedical science domain plus embedded research-methods theme across all three domains gives a strong, assessed technical core (physiology, pharmacology, pathology, biostatistics) sustained across all four years, not a one-off intro unit.",
      "recommendations": []
    },
    "D4": {
      "rationale": "Years 2-3 full-time clinical placement puts students in live, unscripted patient encounters with real diagnostic and management uncertainty; Year 4 capstone placement is explicitly described as building on this. Ungraded pass/fail structure reinforces competency-under-uncertainty as the assessment currency rather than scripted recall.",
      "recommendations": [
        {
          "action": "Add explicit AI-output verification and escalation practice into clinical placement OSCEs/assessments — e.g. simulated scenarios where students must catch an AI diagnostic-support error",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D4"
          ]
        }
      ]
    },
    "D5": {
      "rationale": "The supplied handbook text contains no explicit reference to AI tools, clinical decision-support AI, diagnostic AI governance, or critical evaluation of AI in medicine — a notable omission given the current pace of AI deployment in Australian clinical settings (ambient scribing, imaging triage, decision support). This is scored as \"AI in one elective\" — generously assuming some coverage exists in biomedical informatics content not surfaced in the provided text — but is the clearest and most consequential gap in the program as described.",
      "recommendations": [
        {
          "action": "Embed a mandatory, assessed clinical-AI-literacy module covering diagnostic AI tools, ambient documentation AI, and their failure modes/governance requirements, integrated into the applied biomedical science and professional practice domains (not a single elective)",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Add explicit AI-output verification and escalation practice into clinical placement OSCEs/assessments — e.g. simulated scenarios where students must catch an AI diagnostic-support error",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D4"
          ]
        },
        {
          "action": "Add a dedicated module on AI in population/public-health surveillance and First Nations health contexts, given AI's documented equity risks in these domains",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D8"
          ]
        },
        {
          "action": "Formalise AI-assisted image/pathology triage exposure during clinical placements as a taught, supervised skill (using it correctly and knowing its limits), rather than incidental exposure",
          "priority": "P7",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D1"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "Deep, regulated clinical/scientific expertise: AMC-accredited, AHPRA-registered, four years of integrated biomedical science and supervised clinical practice. This is as deep as domain specialisation gets in the DFVA rubric.",
      "recommendations": []
    },
    "D7": {
      "rationale": "Research methods is an explicit cross-cutting theme and Year 4 includes \"a research project in an area of interest,\" strengthened further for students on the Discovery research-scholar pathway. Scored 2 rather than 3 because the handbook text describes research as one component among several (alongside the capstone placement) rather than a routinely primary-data-generating core for the full cohort — the research-scholar pathway suggests this depth is optional/pathway-dependent rather than universal.",
      "recommendations": [
        {
          "action": "Strengthen the Year 4 research project requirement toward universal primary-data engagement (not pathway-dependent via Discovery) so D7 reflects the full cohort, not just research-scholar students",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D7"
          ]
        }
      ]
    },
    "D8": {
      "rationale": "Professional practice is one of three co-equal curriculum domains; First Nations Health and Population/Global Health are embedded cross-cutting themes; clinical placement in every year builds direct, accountable patient-facing relational skill. This is a defining strength of the degree.",
      "recommendations": [
        {
          "action": "Add a dedicated module on AI in population/public-health surveillance and First Nations health contexts, given AI's documented equity risks in these domains",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D5",
            "D8"
          ]
        }
      ]
    },
    "D9": {
      "rationale": "No evidence in the supplied text of a recent structural refresh tied to AI-era clinical practice, nor of AI content in core units. The Discovery pathway shows structural flexibility for individualisation, but that is a different property from demonstrated currency on AI-specific content. Scored 1 (minor updates / individualisation flexibility) pending evidence of an AI-specific curriculum review.",
      "recommendations": [
        {
          "action": "Publish and formalise a curriculum review cadence explicitly tied to clinical AI adoption (annual advisory input from hospital digital health leads), and surface this publicly on the program handbook page",
          "priority": "P3",
          "effort": "Low",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "Medical graduate outcomes are unusually well-tracked at a system level (AMC national data, hospital intern match rates, AHPRA registration data) even though the handbook text itself does not present granular destination data. Scored 2 (destination data, partial detail) reflecting strong sector-wide tracking infrastructure external to the handbook page itself.",
      "recommendations": [
        {
          "action": "Publish granular destination/outcome data (specialty-matching rates, time-to-fellowship, geographic distribution) on the program page rather than relying on external AMC/AHPRA aggregate data",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "Rare integration of deep technical/scientific depth, regulated domain expertise, and irreducible human/relational and physical clinical judgment — combined with a legal accountability structure (AHPRA registration) that cannot be delegated to an AI system. This is close to the strongest possible irreplaceability profile in the entire DFVA framework.",
      "recommendations": []
    }
  },
  "dfva-mc-doptom": {
    "D1": {
      "rationale": "Mix of highly automatable tasks (retinal AI screening, routine refraction — both mature, deployed AI applications) and tasks requiring hands-on physical examination, accountable diagnosis/prescribing, and relational patient management from day one. Genuinely higher exposure than most clinical doctorates because retinal AI screening is already at scale, but the degree does train across the full task spectrum, not just the automatable slice.",
      "recommendations": [
        {
          "action": "Explicitly reweight clinical placement exposure in early years toward complex case management, co-management, and specialty lens fitting rather than routine screening volume, so graduates build durable-skill fluency before entering a workforce where routine screening is increasingly automated",
          "priority": "P2",
          "effort": "High",
          "dimRefs": [
            "D1"
          ]
        }
      ]
    },
    "D2": {
      "rationale": "Clinical placements from year one require differential diagnosis and constraint-based clinical reasoning (integrating history, exam findings, imaging, comorbidity) under authentic assessment in real clinical settings. Handbook text doesn't evidence explicit failure-mode/trade-off analysis teaching beyond standard clinical reasoning, so not scored at the top band.",
      "recommendations": [
        {
          "action": "Formalise systems-thinking teaching around eye-care's position in the broader health system (GP/ophthalmology referral pathways, Medicare/insurance interactions, screening-program design) with explicit trade-off and failure-mode analysis, not just clinical reasoning",
          "priority": "P7",
          "effort": "Low",
          "dimRefs": [
            "D2"
          ]
        }
      ]
    },
    "D3": {
      "rationale": "Ocular anatomy, physiology, pathology, pharmacology, and optics form a strong, assessed technical core embedded throughout a four-year program — comparable in rigour to other biomedical clinical doctorates.",
      "recommendations": []
    },
    "D4": {
      "rationale": "Clinical placements increasing to the dominant activity by final year mean graduates make and defend real diagnostic, prescribing, and referral decisions on real patients with genuine accountability — not scripted case studies.",
      "recommendations": [
        {
          "action": "Build an explicit \"AI-augmented triage to accountable diagnosis\" capstone scenario into final-year clinical assessment, requiring graduates to demonstrate when to trust, override, or escalate beyond an AI screening flag",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D4",
            "D5"
          ]
        }
      ]
    },
    "D5": {
      "rationale": "No AI-specific curriculum content evidenced in the handbook text, despite retinal AI screening being one of the most clinically mature AI applications directly relevant to this profession (D1/D5 crossover risk). Given the deployed-at-scale status of AI diagnostic imaging in eye care, the absence of explicit AI-workflow, AI-limitations, or AI-governance teaching is a significant gap rather than a neutral absence.",
      "recommendations": [
        {
          "action": "Introduce a dedicated AI in Eye Care unit or module covering autonomous retinal screening tools (LumineticsCore, ARDA), their failure modes, regulatory status, and clinician-AI workflow integration — taught explicitly as a governance and supervision skill, not just a tool-use skill",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Build an explicit \"AI-augmented triage to accountable diagnosis\" capstone scenario into final-year clinical assessment, requiring graduates to demonstrate when to trust, override, or escalate beyond an AI screening flag",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D4",
            "D5"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "A tightly regulated, OCANZ-accredited specialist clinical domain (primary eye care) requiring years of integrated anatomy/pathology/optics/pharmacology/clinical training — deep, durable specialist expertise by design.",
      "recommendations": []
    },
    "D7": {
      "rationale": "A required clinically relevant research project gives graduates genuine primary-evidence generation and methodology defence experience, distinguishing this from a pure-coursework clinical degree. Scope/scale of the project is not detailed enough in the provided text to justify the top band.",
      "recommendations": [
        {
          "action": "Expand the clinically relevant research project's expected scope/documentation to require a defined minimum primary-data component and methodology defence, making the research capability explicit and comparable across cohorts",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D7"
          ]
        }
      ]
    },
    "D8": {
      "rationale": "Direct patient care from year one, including sight-threatening disease communication and chronic-condition co-management with a vulnerable (often elderly, vision-anxious) patient population — substantial clinical/relational accountability and physical hands-on skill (slit-lamp, tonometry, lens fitting).",
      "recommendations": []
    },
    "D9": {
      "rationale": "No evidence in the provided handbook text of an AI-specific curriculum refresh or advisory feedback loop addressing the retinal-AI/diagnostic-imaging disruption directly relevant to this profession — a notable gap given how fast this specific sub-field is moving.",
      "recommendations": [
        {
          "action": "Add a curriculum currency review cycle specifically tracking AI diagnostic imaging developments in ophthalmology/optometry (retinal AI, OCT AI triage), with an advisory panel including practising optometrists using these tools, refreshed at least every 2 years",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "No granular destination, salary, or time-to-registration data provided in the handbook text; OCANZ accreditation guarantees a registration pathway but the program profile does not evidence detailed outcome tracking beyond that.",
      "recommendations": [
        {
          "action": "Establish a structured graduate outcomes tracking system (time-to-registration, practice setting, screening vs. complex-case caseload mix) in partnership with OCANZ and Optometry Australia, closing the program's most significant evidence gap",
          "priority": "P3",
          "effort": "High",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "Rare integration of deep clinical/technical training, regulated legal scope of practice (therapeutic prescribing), and irreducible hands-on/relational skill — a combination that resists substitution even where individual diagnostic inputs (imaging) are increasingly AI-assisted.",
      "recommendations": []
    }
  },
  "dfva-mc-dphysio": {
    "D1": {
      "rationale": "Entry-level physiotherapist roles require day-one physical/manual skill, real-time clinical judgment, and AHPRA-accountable decision-making — none of which is routine or templated.",
      "recommendations": []
    },
    "D2": {
      "rationale": "The three-identity/nine-element framework (Self, Practitioner, Advocate) and \"constructive alignment\" model teach explicit outcome-to-assessment reasoning, but the handbook text does not evidence dedicated failure-mode/constraint-reasoning units beyond general clinical reasoning — scored as present and assessed but not confirmed as integrated throughout.",
      "recommendations": [
        {
          "action": "Add a systems-level failure-mode/constraint-reasoning assessment (e.g., complex multi-morbidity case simulation) to strengthen D2 beyond current clinical-reasoning coverage",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D2"
          ]
        }
      ]
    },
    "D3": {
      "rationale": "Evidence Informed Practice as a named element implies applied biostatistics/appraisal skill; no evidence of an advanced technical/data core beyond standard clinical-science grounding, consistent with a solid but not exceptional technical depth.",
      "recommendations": []
    },
    "D4": {
      "rationale": "Extensive clinical placement blocks (semesters structured around them) mean students make live treatment decisions on real patients under real accountability and uncertainty — the strongest form of assessed trade-off reasoning in the rubric.",
      "recommendations": []
    },
    "D5": {
      "rationale": "No AI-specific curriculum content is evidenced in the handbook text; the program predates explicit AI governance framing common in newer curricula. This is the weakest dimension and a clear redesign target.",
      "recommendations": [
        {
          "action": "Introduce an explicit AI-in-healthcare module covering ambient scribes, AI-assisted triage, and clinical decision-support tools, including their failure modes and governance obligations under AHPRA",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Extend the e-portfolio to explicitly capture AI-tool literacy competencies alongside existing professional-identity evidence",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D9"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "Entry-to-practice registration in a regulated allied-health profession with a defined scope of practice (musculoskeletal, neurological, cardiorespiratory, paediatric) represents deep, durable specialist expertise that takes years to build.",
      "recommendations": []
    },
    "D7": {
      "rationale": "Evidence Informed Practice as a core element indicates graduates critically appraise and apply research; no explicit evidence of students generating primary research data (e.g., a research thesis component) in the handbook text provided.",
      "recommendations": [
        {
          "action": "Formalise a research methods unit requiring students to design and conduct a small primary clinical study or audit, not just appraise literature",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D7"
          ]
        }
      ]
    },
    "D8": {
      "rationale": "Ethical Practice, Communication, and Health and Wellbeing are named curriculum elements alongside extensive clinical placement — substantial, assessed interpersonal and physical-clinical accountability sits at the centre of the degree.",
      "recommendations": []
    },
    "D9": {
      "rationale": "The explicit \"constructive alignment\" model and e-portfolio tracking show a structured, outcome-linked curriculum design methodology — a genuine currency signal — but no AI-specific content or stated advisory-board feedback loop is evidenced, so it stops short of the top band.",
      "recommendations": [
        {
          "action": "Embed a documented curriculum advisory loop (industry/AHPRA/alumni feedback cycle) referencing the existing constructive-alignment framework, with a public review cadence",
          "priority": "P4",
          "effort": "Low",
          "dimRefs": [
            "D9"
          ]
        },
        {
          "action": "Extend the e-portfolio to explicitly capture AI-tool literacy competencies alongside existing professional-identity evidence",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D5",
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "AHPRA registration provides a strong, externally verifiable outcome proxy (registration = employability), but the handbook text does not itself evidence granular salary/time-to-employment data.",
      "recommendations": [
        {
          "action": "Publish granular graduate destination data (practice setting, region, time-to-registration-to-employment) alongside existing AHPRA registration outcomes",
          "priority": "P3",
          "effort": "Low",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "Combines deep regulated clinical specialisation (D6), irreducible physical/manual skill (D1), and substantial relational/ethical practice (D8) — a rare triple integration that strongly resists AI substitution.",
      "recommendations": []
    }
  },
  "dfva-mc-dvetmed": {
    "D1": {
      "rationale": "Entry-level veterinary work is dominated by physical examination, surgery, procedural skill, and client-facing judgment on live animal patients — none of which AI can perform. Documentation and lab screening are automatable but peripheral to the role's core value.",
      "recommendations": []
    },
    "D2": {
      "rationale": "The curriculum is explicitly described as integrated and interdisciplinary \"from the first year,\" requiring students to apply understanding to authentic cases and practise evidence-based decision-making rather than isolated technique execution — this is systems reasoning embedded structurally, not bolted on.",
      "recommendations": []
    },
    "D3": {
      "rationale": "A four-year AQF9 Masters Extended program spanning basic science (Parkville years) through applied clinical science (Werribee years) with assessed competency progression; veterinary medicine requires deep physiological, pharmacological, and pathological technical grounding throughout.",
      "recommendations": [
        {
          "action": "Expand production-animal and biosecurity/One Health rotations to explicitly cover AI-assisted disease surveillance and outbreak modelling tools now used by government veterinary services, positioning graduates for regulatory and public-health career pathways",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D3"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "\"Solving clinical problems and acquiring clinical competencies from the first year\" plus final-year immersion in live caseload at a teaching hospital means students are making real diagnostic and treatment decisions under genuine uncertainty and accountability, not scripted case studies.",
      "recommendations": []
    },
    "D5": {
      "rationale": "No AI-specific content is evident in the provided handbook text despite rapid uptake of AI diagnostic imaging, ambient scribing, and triage tools in veterinary practice; the omission is a material gap given the pace of change in this specific sub-sector.",
      "recommendations": [
        {
          "action": "Introduce a dedicated \"AI in Veterinary Practice\" module spanning AI diagnostic imaging triage, ambient clinical scribing, and their failure modes/limitations, embedded in the DVM3-4 clinical years alongside live caseload work",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Establish explicit governance guidance for supervised AI tool use in the teaching hospitals (U-Vet Werribee), including when AI-generated differentials or imaging reads must be independently verified before entering the patient record",
          "priority": "P2",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "Four years of dedicated veterinary science culminating in AVBC-accredited registration to practise — this is one of the deepest, most tightly regulated specialist pathways in the AQF9 landscape, comparable to medicine and dentistry.",
      "recommendations": []
    },
    "D7": {
      "rationale": "Evidence-based decision-making is emphasised throughout, and clinical case work requires applying primary literature to real cases, but the handbook text does not describe a dedicated primary-research thesis/capstone comparable to combined MD/PhD-style programs — this is a clinically rather than research-oriented doctorate.",
      "recommendations": [
        {
          "action": "Add a structured research/evidence-appraisal capstone requiring students to critically appraise primary veterinary literature and defend a treatment-protocol recommendation, strengthening the program's primary-research muscle without displacing clinical training time",
          "priority": "P4",
          "effort": "Medium",
          "dimRefs": [
            "D7"
          ]
        }
      ]
    },
    "D8": {
      "rationale": "Client communication under emotional and financial stress, euthanasia conversations, and hands-on physical care of non-verbal patients are central and unavoidable competencies built in from year one — among the strongest relational/physical cores of any AQF9 program assessed.",
      "recommendations": []
    },
    "D9": {
      "rationale": "The described structure (integrated case-based learning, peer-to-peer teaching in final year, guaranteed BSc Veterinary Bioscience pathway) reflects a modern, actively maintained curriculum design, but no explicit AI-related curriculum refresh or advisory feedback loop is described in the source text.",
      "recommendations": [
        {
          "action": "Formalise a curriculum advisory loop with practising alumni and AVBC on emerging AI diagnostic tool adoption, feeding a documented review cycle (target: every 2 years)",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "No destination data, employment rate, or salary information is provided in the source handbook text; veterinary registration outcomes are generally strong nationally, but this specific program does not publish granular outcome data in the material assessed.",
      "recommendations": [
        {
          "action": "Publish granular graduate destination data (practice type, species focus, geographic distribution, time-to-registration, residency uptake) in partnership with the Veterinary Practitioners Board of Victoria and AVBC",
          "priority": "P3",
          "effort": "High",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "Rare integration of deep technical/scientific depth, years-long specialist domain training, and irreducible physical/relational skill (surgery, hands-on animal care, client trust) — the combination is a textbook example of an AI-resistant professional degree.",
      "recommendations": []
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
  "dfva-mc-jurisd": {
    "D1": {
      "rationale": "Entry-level legal work — document review, due diligence, and first-draft research memos — is increasingly performed by AI tools (Harvey, CoCounsel, Lexis+ AI) at near-associate level, concentrating substitution risk in routine, artifact-only tasks while advocacy and judgment remain human.",
      "recommendations": [
        {
          "action": "Add an assessed, AI-augmented client-matter simulation to the compulsory capstone so graduates supervise and direct AI rather than compete with it",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D4",
            "D8",
            "D5"
          ]
        },
        {
          "action": "Embed a mandatory AI in Legal Practice strand across the compulsory core",
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
    "D2": {
      "rationale": "System-level framing is practised across Principles of Public Law and Legal Method, but it is not a standalone assessed competency; hiring for multi-jurisdictional regulatory work increasingly expects explicit systems accountability.",
      "recommendations": [
        {
          "action": "Add an assessed systems-framing / failure-mode component to Legal Method and Reasoning",
          "priority": "P5",
          "effort": "Medium",
          "dimRefs": [
            "D2"
          ]
        }
      ]
    },
    "D3": {
      "rationale": "The 200-credit compulsory core carries no statistics, coding, or data-law requirement, so graduates cannot technically govern the AI and data tools now reshaping practice; job-family signals increasingly reward hybrid legal + data/analytics literacy.",
      "recommendations": [
        {
          "action": "Create mandatory unit Data, Evidence and the Law — statistical reasoning for evidence and damages, empirical study literacy, data/privacy regulation fundamentals",
          "priority": "P2",
          "effort": "High",
          "dimRefs": [
            "D3",
            "B"
          ]
        }
      ]
    },
    "D4": {
      "rationale": "Legal practice is decision-making under uncertainty and the JD trains judgment well, but core assessment remains exam/essay-based rather than live, accountable simulation with real consequences.",
      "recommendations": [
        {
          "action": "Add an assessed, AI-augmented client-matter simulation to the compulsory capstone, defended before a practitioner panel",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D4",
            "D8",
            "D5"
          ]
        }
      ]
    },
    "D5": {
      "rationale": "All AI content sits in quota electives (Law and Automation, Future Lawyer, AI and Justice); the compulsory core has zero AI literacy, so most graduates enter a rapidly AI-augmented profession without competency the market now treats as baseline.",
      "recommendations": [
        {
          "action": "Embed a mandatory AI in Legal Practice strand across Legal Method, Legal Research and Disputes & Ethics — AI-tool audit, hallucination/verification, and firm-level AI governance",
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
      "rationale": "Gold-standard Priestley 11 coverage across 200 compulsory credit points plus VLAB accreditation create a regulatory moat no AI tool can replicate — the program's core strength.",
      "recommendations": []
    },
    "D7": {
      "rationale": "The Legal Research capstone delivers genuine primary doctrinal research, but empirical and quantitative method is under-represented, limiting graduates' ability to defend positions with data.",
      "recommendations": [
        {
          "action": "Add empirical/quantitative-evidence literacy via the Data, Evidence and the Law unit and an AI-tool research-audit assessment",
          "priority": "P2",
          "effort": "High",
          "dimRefs": [
            "D3",
            "D7"
          ]
        }
      ]
    },
    "D8": {
      "rationale": "Advocacy, negotiation, mediation, client counselling and ethics are explicit, assessed learning outcomes reinforced by clinical placements — the least automatable capability and a durable differentiator.",
      "recommendations": []
    },
    "D9": {
      "rationale": "Tech-forward electives exist but at least 15 quota electives are unavailable in 2026 and AI content is elective-only, so currency is undermined by an unstable offering rather than by absent content.",
      "recommendations": [
        {
          "action": "Embed the AI in Legal Practice strand in the core so currency does not depend on elective availability",
          "priority": "P1",
          "effort": "High",
          "dimRefs": [
            "D5",
            "D9",
            "B"
          ]
        },
        {
          "action": "Publish a guaranteed two-year rotation for the tech/currency elective cluster and teach-out dormant subjects",
          "priority": "P4",
          "effort": "Low",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "Field-level QILT GOS data is available and law employment outcomes are strong, but the JD lacks published program-level granular destination data (role types, salary bands, time-to-employment).",
      "recommendations": [
        {
          "action": "Publish program-level graduate outcome data for the JD (role titles, salary bands, time-to-employment)",
          "priority": "P6",
          "effort": "Low",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "The JD combines strong domain depth and human/relational capability behind a regulatory moat, but graduates lack the rare legal + judgment + technical/AI triple integration as AI transforms document review, contract analysis and legal research.",
      "recommendations": [
        {
          "action": "Embed AI literacy in the compulsory core",
          "priority": "P1",
          "effort": "High",
          "dimRefs": [
            "D5",
            "D9",
            "B"
          ]
        },
        {
          "action": "Add a mandatory quantitative/data-law unit to build the technical leg of the triple integration",
          "priority": "P2",
          "effort": "High",
          "dimRefs": [
            "D3",
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
  },
  "dfva-me-dcd": {
    "D1": {
      "rationale": "Entry is as a specialist clinician performing licensed intraoral surgical/manual procedures under personal medico-legal accountability from the day of registration — no templated task cluster dominates the role.",
      "recommendations": []
    },
    "D2": {
      "rationale": "Specialist training requires integrating diagnostic imaging, medical history, biomechanics/pathology, and multidisciplinary referral pathways into a single defensible treatment plan for each individual patient — assessed continuously through supervised clinical practice, not a single unit.",
      "recommendations": []
    },
    "D3": {
      "rationale": "Advanced clinical science specific to the specialty (e.g., orthodontic biomechanics, endodontic microsurgical technique, periodontal regenerative science) delivered and assessed at specialist depth across three years, well beyond general dental training.",
      "recommendations": []
    },
    "D4": {
      "rationale": "Every clinical session at the Royal Dental Hospital of Melbourne/Melbourne Dental Clinic is a live, high-stakes patient encounter with real complication risk and no scripted answer — this is the definition of assessed decision-making under uncertainty.",
      "recommendations": []
    },
    "D5": {
      "rationale": "Handbook text and program structure show no evidence of formal AI-in-dentistry curriculum content (AI-assisted radiograph triage, digital treatment-planning software governance, algorithmic bias in diagnostic imaging AI); given rapid AI diagnostic-imaging adoption in dentistry, this is a live and growing gap rather than a hypothetical one.",
      "recommendations": [
        {
          "action": "Introduce a specialty-specific AI Diagnostic Imaging and Governance module (covering AI-assisted radiograph/CBCT triage tools, cephalometric AI, algorithmic bias and liability in diagnostic AI, and appropriate scope of AI-generated draft treatment plans) embedded across all seven specialist fields",
          "priority": "P1",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Require candidates to critically evaluate and document AI-assisted diagnostic/treatment-planning tool output as part of clinical case presentations, formalising \"AI as co-pilot, specialist as accountable decision-maker\" as an assessed competency",
          "priority": "P2",
          "effort": "Low",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Add a brief structured module on AI-assisted practice-management and billing automation to the professional-practice component, so graduates entering private specialist practice can capture the administrative time-savings AI already offers",
          "priority": "P5",
          "effort": "Low",
          "dimRefs": [
            "D5"
          ]
        },
        {
          "action": "Formalise cross-specialty exposure to oral cancer/oral medicine AI-assisted screening tools within relevant fields (Oral Medicine primarily, with awareness modules for others), given oral cancer detection is a genuine frontier for AI-assisted (not AI-replaced) diagnosis",
          "priority": "P6",
          "effort": "Medium",
          "dimRefs": [
            "D5"
          ]
        }
      ]
    },
    "D6": {
      "rationale": "The entire program exists to produce deep, narrow, legally-registrable specialist expertise in one of seven named fields — the definitional case for this dimension.",
      "recommendations": []
    },
    "D7": {
      "rationale": "Mandatory original research/thesis component within the specialty is a structural, assessed requirement of the DClinDent, not an elective add-on — graduates must design and defend primary clinical research.",
      "recommendations": []
    },
    "D8": {
      "rationale": "Specialist dental practice is inseparable from hands-on physical procedure, chairside behaviour management, and legally consequential informed consent — substantial clinical/physical/interpersonal accountability is the daily mode of the job.",
      "recommendations": []
    },
    "D9": {
      "rationale": "ADC accreditation cycles and hospital-based delivery imply active, regularly reviewed clinical currency, but the handbook text provides no explicit evidence of an AI-specific curriculum feedback loop or advisory mechanism — scored down from 3 for lack of documented AI-adaptive review.",
      "recommendations": [
        {
          "action": "Establish a standing AI-in-dentistry curriculum advisory input from the Australian Dental Association / ADC given the pace of diagnostic-imaging AI adoption, to keep D9 currency demonstrably active rather than implicit",
          "priority": "P4",
          "effort": "Low",
          "dimRefs": [
            "D9"
          ]
        }
      ]
    },
    "D10": {
      "rationale": "Specialist registration outcomes are implicitly strong (ADC/AHPRA-gated specialist title is itself a near-guaranteed high-value outcome), but the handbook does not publish granular destination data (income, practice-setting split, time-to-independent-practice) — partial detail, not absent.",
      "recommendations": [
        {
          "action": "Publish granular graduate outcome data by specialist field (private practice vs public hospital vs academic split, time-to-independent-practice, geographic distribution) in partnership with the Australian Dental Council and specialist colleges",
          "priority": "P3",
          "effort": "Medium",
          "dimRefs": [
            "D10"
          ]
        },
        {
          "action": "Market the specialist-title regulatory moat and irreplaceability premium explicitly in program materials and prospective-candidate communications, given this is the program's strongest and most durable differentiator relative to any coursework Masters",
          "priority": "P7",
          "effort": "Low",
          "dimRefs": [
            "D10"
          ]
        }
      ]
    },
    "B": {
      "rationale": "Rare integration of deep technical/clinical depth, physical procedural skill, and a state-enforced regulatory title monopoly (AHPRA Specialist Register) — a combination that is both very hard to substitute and legally impossible for a non-specialist (human or AI) to offer.",
      "recommendations": []
    }
  }
}

export function evidenceFor(programSlug: string, dimId: string): DimensionEvidence | undefined {
  return DIMENSION_EVIDENCE[programSlug]?.[dimId]
}
