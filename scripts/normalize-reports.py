#!/usr/bin/env python3
"""
Final normalization: fix header naming and add missing sections (PROGRAM PROFILE, 
RECOMMENDATIONS) to the remaining partial reports.

Run: python3 scripts/normalize-reports.py
"""
import re
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
REPORTS = REPO / 'reports'

# ─────────────────────────────────────────────────────────────────────────────
# Program profile text for each program that needs it
# ─────────────────────────────────────────────────────────────────────────────

PROFILES = {
"mc-bmedsc": """The Master of Biomedical Science at the University of Melbourne is a research-intensive degree combining laboratory science training with a 125-credit-point research project — the largest research component in the assessed cohort. Students choose a specialisation from five departmental areas: School of Biomedical Sciences, Melbourne Medical School, Melbourne Dental School, Department of Psychological Sciences, or Department of Optometry and Vision Sciences.

The 200-credit-point program includes *Introduction to Biomedical Research* (compulsory), *Research to Impact* (health translation), and 125 points of supervised laboratory research conducted over four consecutive semesters. Students develop experimental design skills, laboratory techniques specific to their specialisation, and scientific communication competency.

Typical graduate roles include research scientist, clinical trial coordinator, research officer in pharmaceutical/biotechnology companies, PhD candidate, and postdoctoral researcher. The program serves as the primary entry point to biomedical PhD programs in Australia and internationally.""",

"mc-envsc": """The Master of Environmental Science at the University of Melbourne is a multidisciplinary environmental science program combining ecological, geoscientific, and policy-oriented coursework with a 25-credit-point Industry or Research Project. Students choose from a broad elective range spanning Environmental Modelling, Spatial Data Analytics, Environmental Risk Assessment, Soil Science, Water Management, Biosecurity, and Global Environmental Change.

The 200-credit-point program targets students with science backgrounds who seek professional roles in environmental consulting, government environmental agencies, conservation management, and environmental research. The Industry Project (default) places students in real-world environmental consulting or management contexts.

Typical graduate roles include environmental consultant, environmental scientist in government agencies (DCCEEW, EPA), conservation manager, environmental planner, climate adaptation specialist, and graduate researcher.""",

"mc-gencoun": """The Master of Genetic Counselling at the University of Melbourne is an HGSA-accredited professional program preparing graduates for registration as genetic counsellors in Australia. It is one of only a small number of accredited genetic counselling training programs in the country.

The 2-year program integrates coursework in human genetics, genomics, genetic counselling theory and practice, psychological support for genetic conditions, and supervised clinical placements. Clinical placement hours meet HGSA registration requirements. Named units include *Clinical Genetics*, *Genetic Counselling Practice*, *Psychology of Genetic Conditions*, and *Biostatistics for Genetic Counsellors*.

Typical graduate roles include genetic counsellor (clinical genetics units at hospitals), cancer genetics counsellor, prenatal genetic counsellor, and genomics coordinator. There is a documented national workforce shortage in genetic counselling.""",

"mc-nursc": """The Master of Nursing Science at the University of Melbourne is an advanced nursing degree for registered nurses seeking research training, specialist clinical knowledge, or leadership preparation. The program is distinct from initial registration programs and targets practising nurses with clinical experience.

The program includes coursework in advanced nursing practice, healthcare systems, evidence-based practice, research methodology, and a research component. Specialisations include Nurse Practitioner preparation, clinical nursing education, nursing leadership, and research. The program is accredited by the Australian College of Nursing.

Typical graduate roles include advanced practice registered nurse, nurse practitioner (where additional AHPRA requirements are met), clinical nurse educator, nursing unit manager, clinical nurse researcher, and policy advisor in health departments.""",

"mc-scibio": """The Master of Science (BioSciences) at the University of Melbourne is a research-intensive degree with a 125-credit-point research project — among the largest in the assessed cohort. Students choose from three specialisation areas: Ecology, Evolution and Environmental Science; Genetics, Genomics and Development; or Plant Science.

The 200-credit-point program includes foundational and advanced subjects in Applied Statistics, Genomics and Bioinformatics, Environmental Modelling, Spatial Data Analytics, Communication for Research Scientists, and the Graduate Seminar in BioSciences. The substantial research component develops original research capability under expert academic supervision.

Typical graduate roles include research scientist, postdoctoral researcher, conservation biologist, government ecologist, environmental assessment scientist, and PhD candidate. The program is the primary gateway to biological research careers and PhD programs at Melbourne.""",

"mc-sciche": """The Master of Science (Chemistry) at the University of Melbourne is a research-intensive degree combining advanced chemistry coursework with a substantial research project. The program covers modern analytical chemistry, synthetic chemistry, physical chemistry, computational chemistry, and materials science.

Advanced coursework includes Spectroscopic Methods, Organic Synthesis, Inorganic and Materials Chemistry, Physical and Computational Chemistry, and Chemical Biology. The research project develops specialist laboratory expertise in an active research group. Students gain experience in contemporary chemical instrumentation and computational tools.

Typical graduate roles include research scientist in chemical, pharmaceutical, and materials industries, analytical chemist, PhD candidate, science communicator, and quality assurance scientist. Chemistry graduates move into pharmaceutical development, battery technology, catalysis, materials science, and forensic science.""",

"mc-sciphy": """The Master of Science (Physics) at the University of Melbourne is a research-intensive degree for students seeking specialist expertise in physics for research careers, high-tech industry, or PhD programs. The program integrates advanced physics coursework with a substantial research project.

Specialist elective areas include Quantum Physics, Condensed Matter Physics, Particle Physics, Astrophysics and Cosmology, Atmospheric Physics, Photonics, and Computational Physics. Advanced Mathematics for Physicists provides the mathematical grounding for specialisation. The research project connects students to active research groups in these areas.

Typical graduate roles include research scientist (in physics labs, national facilities, or industry), PhD candidate, data scientist (physics background is strongly valued in quantitative finance and AI research), optical engineer, quantum computing researcher, and atmospheric modeller.""",

"439fs": """The Master of Food Science at the University of Melbourne prepares graduates for professional practice in food technology, food safety, regulatory affairs, and food product development. The program covers food microbiology, food chemistry, food processing technology, sensory science, food quality systems, and regulatory compliance with the Food Standards Australia New Zealand (FSANZ) framework.

The 200-credit-point program integrates laboratory science with food industry application, including industry-facing projects or placements. Core competencies include HACCP system design, food product formulation, shelf-life testing, and regulatory submission preparation.

Typical graduate roles include food technologist, food safety officer, regulatory affairs specialist, product development scientist, quality assurance manager, and food industry researcher. The program is accredited by the Royal Australian Chemical Institute (RACI) Food Chemistry group.""",

"mc-climsci": """The Master of Climate Science at the University of Melbourne is a specialist degree at the intersection of physical climate science, atmospheric dynamics, and climate policy. Students choose between two streams: Climate Dynamics (focusing on physical mechanisms) or Climate Change (focusing on impacts and policy translation).

The program covers Climate Modelling, Dynamical Meteorology, Atmospheric Processes, Weather and Climate Extremes, Statistics in Climate Dynamics, Climate Change Mitigation, Climate Change Politics and Policy, and Climate Science for Decision-Making. An industry or research project (25pt) provides applied experience.

Typical graduate roles include climate scientist, climate risk analyst, climate policy advisor, sustainability consultant, atmospheric researcher, and climate data scientist. Climate careers are growing structurally due to mandatory climate disclosure, adaptation planning, carbon market development, and international climate regulation.""",
}

# ─────────────────────────────────────────────────────────────────────────────
# Recommendations for programs missing them
# ─────────────────────────────────────────────────────────────────────────────

RECOMMENDATIONS = {
"mc-bmedsc": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Add a unit on AI in biomedical research — machine learning for image analysis, AI drug discovery, computational biology — as a core or elective offering | D5, D9 | Medium |
| 2 | Develop scientific communication capability explicitly — presenting research to non-specialist audiences is a growing career requirement | D8 | Low |
| 3 | Build bioinformatics competency alongside lab expertise — the intersection of wet-lab and computational skills is the growth area | D3, D5 | Medium |
| 4 | Publish graduate destination data including PhD continuation rates, time to employment, and industry sector breakdown | D10 | Medium |
| 5 | Develop industry partnership opportunities beyond the current structure — industry-supervised research projects provide real-world validation of laboratory skills | D4, D8 | High |""",

"mc-envsc": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Add a unit on AI and machine learning in environmental science — remote sensing analysis, ecological modelling AI, spatial AI | D5, D9 | Medium |
| 2 | Develop GIS and remote sensing competency as a core capability — spatial data analysis is now a standard environmental science requirement | D3 | Medium |
| 3 | Maximise the Industry Project opportunity — real stakeholder context and environmental management constraints are the most valuable learning experience | D4, D8 | High (built-in) |
| 4 | Build specialist domain depth in a specific environmental area — climate adaptation, biosecurity, or water management — rather than staying generalist | D6 | Medium |
| 5 | Develop quantitative environmental modelling skills beyond the default elective — Environmental Modelling and Spatial Data Analytics are key differentiators | D3, D7 | Medium |""",

"mc-gencoun": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop AI variant interpretation tool literacy — understand AI classification platforms, their evidence base, and clinical governance requirements | D5 | Medium |
| 2 | Complete HGSA accreditation pathway and supervised hours requirements — professional registration is the primary protection in genetic counselling | D6 | High (built-in) |
| 3 | Specialise in a high-growth area: cancer genetics, prenatal counselling, or rare disease — specialist positioning is more protective than generalism | D6 | Medium |
| 4 | Build genomic literacy at the technical level — understanding what whole genome sequencing produces and what it misses is increasingly required | D3 | Medium |
| 5 | Develop expertise in variant of uncertain significance (VUS) communication — the specific challenge of explaining uncertainty to families is the hardest and most valuable clinical skill | D4, D8 | High |""",

"mc-nursc": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop AI clinical decision support tool literacy — understand AI clinical alert systems, their evidence base, and when clinical judgment should override algorithmic recommendations | D5 | Medium |
| 2 | Specialise in complex clinical areas where AI tools have least capability — ICU, oncology, mental health, or aged care | D6 | High |
| 3 | Build clinical research skills — nursing-led research is an underserved area with growing funding and policy relevance | D7 | High |
| 4 | Develop supervision and mentoring capability — nurse educator and clinical leader roles are more automation-resistant | D8 | High (post-graduation) |
| 5 | Build quantitative skills for evidence-based practice — understanding clinical trial methodology and statistical validity of clinical evidence | D3, D7 | Medium |""",

"mc-scibio": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Add a unit on AI in biological research — machine learning for biological data, AI in genomics, computational biology — as a core requirement | D5, D9 | Medium |
| 2 | Develop bioinformatics competency alongside wet-lab expertise — the combination of field/lab skills and computational analysis is the growth area | D3, D5 | Medium |
| 3 | Publish graduate destination data including PhD continuation rates and career outcomes | D10 | Medium |
| 4 | Complete the Graduate Seminar requirement and use it to develop presentation and scientific communication skills | D8 | Low |
| 5 | Target specialisation areas with structural demand — biosecurity, climate adaptation, genomics-based conservation — not just academic research | D1, D6 | Low |""",

"mc-sciche": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop computational chemistry competency — the intersection of chemistry and computation (DFT, molecular dynamics, ML potentials) is the growth area | D3, D5 | Medium |
| 2 | Build AI chemistry tool literacy — evaluate AI synthetic planning tools, AI property prediction, and ML-accelerated materials discovery | D5 | Medium |
| 3 | Develop domain specialisation in a high-growth area — battery chemistry, pharmaceutical synthesis, materials science — with industrial partners | D6 | Medium |
| 4 | Build science communication capability — explaining complex chemistry to non-specialist stakeholders is increasingly required | D8 | Low |
| 5 | Target industry research roles alongside academic pathways — pharmaceutical development, materials science, and green chemistry offer structured industry careers | D1, D10 | Low |""",

"mc-sciphy": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop machine learning for physics data analysis — a critical skill for modern experimental and computational physics | D3, D5 | Medium |
| 2 | Build AI literacy at the physics-ML interface — understanding when AI is capturing real physics versus statistical patterns | D5 | Medium |
| 3 | Develop interdisciplinary communication capability — physics graduates increasingly work at the interface of physics, engineering, and data science | D8 | Medium |
| 4 | Target growth specialisations — quantum computing, photonics, atmospheric physics, and AI research are growing fields for physics graduates | D1, D6 | Low |
| 5 | Build quantitative finance and tech industry competency alongside physics research — physics backgrounds are highly valued in quant finance and AI development | D1 | Medium |""",

"439fs": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop AI food technology literacy — evaluate AI formulation tools, AI quality control systems, and their limitations in food safety contexts | D5 | Medium |
| 2 | Build sustainability and alternative protein competency — plant-based foods, cellular agriculture, and sustainable packaging are growth areas | D6, D9 | Medium |
| 3 | Develop regulatory affairs expertise for novel foods and emerging ingredients | D6 | Medium |
| 4 | Complete industry placement or project with a food manufacturing partner — real production experience is the most valued differentiator | D4, D8 | High |
| 5 | Build data science skills for food quality and process monitoring — sensor data analysis and predictive quality modelling are emerging requirements | D3, D5 | Medium |""",

"mc-climsci": """| Priority | Action | Dimension | Effort |
|---|---|---|---|
| 1 | Develop machine learning for climate data analysis — ML downscaling, AI event attribution, and neural network weather prediction are the growth edges of the field | D5, D9 | Medium |
| 2 | Build climate communication and policy translation skills — the ability to communicate climate uncertainty to decision-makers is a rare and valuable capability | D8 | Medium |
| 3 | Complete the Climate Science for Decision-Making unit and use it to develop real policy translation experience | D4, D8 | Low |
| 4 | Develop expertise in a specific climate application domain — climate risk assessment for finance, adaptation planning, or climate litigation support | D6 | Medium |
| 5 | Build Python-based climate data analysis skills — xarray, CDO, and climate modelling tools are standard requirements for climate career competitiveness | D3 | Medium |""",
}

# ─────────────────────────────────────────────────────────────────────────────
# Normalize a single report file
# ─────────────────────────────────────────────────────────────────────────────

def normalize_report(slug, content):
    """Fix non-standard headers and add missing sections."""
    
    has_profile = bool(re.search(r'PROGRAM PROFILE', content, re.IGNORECASE))
    has_scorecard = bool(re.search(r'DFVA SCORECARD', content, re.IGNORECASE))
    has_thresholds = bool(re.search(r'THRESHOLD QUESTIONS', content, re.IGNORECASE))
    has_recommendations = bool(re.search(r'RECOMMENDATIONS', content, re.IGNORECASE))
    
    # 1. Fix "### Scorecard" → standard header
    if not has_scorecard:
        content = re.sub(
            r'(^|\n)(###?\s+)(Scorecard|SCORECARD)(\s*\n)',
            r'\1\2 3. DFVA SCORECARD\4',
            content
        )
    
    # 2. Fix "### Thresholds" → standard header
    if not has_thresholds:
        content = re.sub(
            r'(^|\n)(###?\s+)(Thresholds|THRESHOLDS)(\s*\n)',
            r'\1\2 4. THREE THRESHOLD QUESTIONS\4',
            content
        )
        # Also handle inline Q1/Q2/Q3 at start of content (no section header)
        # Find the pattern: **TOTAL: XX/36** followed by Q1:/Q2:/Q3: lines
        inline_threshold = re.search(
            r'(\*\*TOTAL.*?\*\*)\s*\n((?:- \*\*Q[123].*?\n)+)',
            content, re.DOTALL
        )
        if inline_threshold and not has_thresholds:
            # Wrap the Q1/Q2/Q3 lines in a proper section
            q_block = inline_threshold.group(2)
            replacement = inline_threshold.group(1) + '\n\n### 4. THREE THRESHOLD QUESTIONS\n' + q_block
            content = content[:inline_threshold.start()] + replacement + content[inline_threshold.end():]
    
    # 3. Add PROGRAM PROFILE before the first section if missing
    if not has_profile and slug in PROFILES:
        profile_section = f"\n### 1. PROGRAM PROFILE\n{PROFILES[slug].strip()}\n\n"
        # Insert before Scorecard/first section
        scorecard_pos = re.search(r'\n###?\s+(?:\d+\.\s+)?(?:Scorecard|SCORECARD|DFVA SCORECARD)', content)
        if scorecard_pos:
            pos = scorecard_pos.start()
            content = content[:pos] + profile_section + content[pos:]
    
    # 4. Add RECOMMENDATIONS before VERDICT if missing
    if not has_recommendations and slug in RECOMMENDATIONS:
        rec_section = f"\n### 7. RECOMMENDATIONS\n{RECOMMENDATIONS[slug].strip()}\n\n---\n"
        # Insert before MARKET DATA or REDESIGNED GRADUATE or ANALOGUE GRADUATE
        insert_before = re.search(
            r'\n(?:### MARKET DATA|## 8\.|## 5\.)',
            content
        )
        if insert_before:
            pos = insert_before.start()
            # Make sure we're not inserting before ANALOGUE
            before_text = content[:pos]
            after_text = content[pos:]
            # Check if ANALOGUE comes before this position
            has_analogue_before = bool(re.search(r'ANALOGUE GRADUATE', before_text, re.IGNORECASE))
            has_verdict_before = bool(re.search(r'VERDICT', before_text, re.IGNORECASE))
            if has_verdict_before:
                content = before_text + rec_section + after_text
    
    return content


def main():
    targets = [
        "mc-bmedsc",
        "mc-envsc",
        "mc-gencoun",
        "mc-nursc",
        "mc-scibio",
        "mc-sciche",
        "mc-sciphy",
        "439fs",
        "mc-climsci",
    ]
    
    updated = 0
    for slug in targets:
        filepath = REPORTS / f"dfva-{slug}.md"
        if not filepath.exists():
            print(f"  SKIP (not found): dfva-{slug}.md")
            continue
        
        content = filepath.read_text()
        new_content = normalize_report(slug, content)
        
        if new_content != content:
            filepath.write_text(new_content)
            print(f"  NORMALIZED: dfva-{slug}.md")
            updated += 1
        else:
            print(f"  NO CHANGE: dfva-{slug}.md")
    
    print(f"\nNormalized {updated} files.")
    
    # Verify
    from pathlib import Path
    print("\n--- Final completeness check ---")
    SECTIONS = ['PROGRAM PROFILE', 'AUTOMATION EXPOSURE', 'DFVA SCORECARD', 'THRESHOLD QUESTIONS', 'ANALOGUE GRADUATE', 'VERDICT', 'RECOMMENDATIONS', 'REDESIGNED GRADUATE']
    complete = 0
    incomplete = 0
    for r in sorted(Path('reports').glob('dfva-*.md')):
        if 'recommend' in r.stem or 'market' in r.stem:
            continue
        txt = r.read_text()
        if txt.strip().startswith('{'):
            print(f"  JSON: {r.stem}")
            incomplete += 1
            continue
        missing = [s for s in SECTIONS if not re.search(s, txt, re.IGNORECASE)]
        if missing:
            print(f"  INCOMPLETE ({len(SECTIONS)-len(missing)}/8): {r.stem}  MISSING: {missing}")
            incomplete += 1
        else:
            complete += 1
    print(f"\n{complete} complete, {incomplete} still incomplete.")


# ─────────────────────────────────────────────────────────────────────────────
# Metadata normalization
# ─────────────────────────────────────────────────────────────────────────────

DFVA_VERSION_MAP = {
    'DFVA-CONTINUE-SLASH-v1': 'DFVA-COPILOT-PROMPT-v1',
    'DFVA-COPILOT-SKILL-v1':  'DFVA-COPILOT-PROMPT-v1',
    'DFVA-HERMES-v1':          'DFVA-COPILOT-PROMPT-v1',
}

MARKET_VERSION_MAP = {
    'DFVA-CONTINUE-MARKET-v1': 'DFVA-COPILOT-MARKET-v1',
    'DFVA-COPILOT-SKILL-v1':   'DFVA-COPILOT-MARKET-v1',
}

HANDBOOK_BASE = 'https://handbook.unimelb.edu.au/2026/courses'
NORMALIZE_DATE = '2026-06-21'


def fix_dfva_metadata(slug, content):
    for old, new in DFVA_VERSION_MAP.items():
        content = re.sub(
            r'(Prompt [Vv]ersion:?\*?\*? )' + re.escape(old),
            lambda m: m.group(1) + new,
            content
        )
    # Add missing metadata footer before ### MARKET DATA (or at end if no MARKET DATA)
    has_source = bool(re.search(r'Source URL', content, re.IGNORECASE))
    has_prompt = bool(re.search(r'DFVA-COPILOT-PROMPT-v1', content))
    if not has_source or not has_prompt:
        handbook_url = f'{HANDBOOK_BASE}/{slug}'
        footer_parts = []
        if not has_source:
            footer_parts.append(f'**Assessment Date:** {NORMALIZE_DATE}')
            footer_parts.append(f'**Source URL:** {handbook_url}')
        if not has_prompt:
            footer_parts.append('**Prompt Version:** DFVA-COPILOT-PROMPT-v1')
        footer = '\n'.join(footer_parts)
        # Insert before ### MARKET DATA if present, otherwise append
        market_data_match = re.search(r'\n### MARKET DATA\b', content)
        if market_data_match:
            pos = market_data_match.start()
            content = content[:pos] + '\n\n---\n\n' + footer + content[pos:]
        else:
            content = content.rstrip() + '\n\n---\n\n' + footer + '\n'
    return content


def fix_market_metadata(content):
    for old, new in MARKET_VERSION_MAP.items():
        content = re.sub(
            r'(Prompt [Vv]ersion:?\*?\*? )' + re.escape(old),
            lambda m: m.group(1) + new,
            content
        )
    # Fix bare "**Date:**" → "**Assessment Date:**" in metadata headers
    content = re.sub(r'\*\*Date:\*\*(?! \()', '**Assessment Date:**', content)
    # Rename any non-standard section 3 header to the required one
    content = re.sub(
        r'^(## 3\. )(?!CURRENT DISCUSSION SIGNALS \(X\)).+$',
        r'\1CURRENT DISCUSSION SIGNALS (X)',
        content, flags=re.MULTILINE
    )
    return content


def fix_recommend_metadata(slug, content):
    has_date    = bool(re.search(r'\*\*Assessment Date:\*\*', content))
    has_source  = bool(re.search(r'\*\*Source Report:\*\*', content))
    has_version = bool(re.search(r'DFVA-COPILOT-RECOMMENDER-v1', content))

    if has_date and has_source and has_version:
        return content  # already complete

    additions = []
    if not has_date:
        additions.append(f'**Assessment Date:** {NORMALIZE_DATE}')
    if not has_source:
        additions.append(f'**Source Report:** reports/dfva-{slug}.md')
    if not has_version:
        additions.append('**Prompt Version:** DFVA-COPILOT-RECOMMENDER-v1')

    # Append after a separator at the end
    footer = '\n\n---\n\n' + '\n'.join(additions) + '\n'
    return content.rstrip() + footer


def normalize_metadata():
    updated = 0

    for path in sorted(REPORTS.glob('dfva-*.md')):
        stem = path.stem
        content = path.read_text()
        original = content

        if 'recommend' in stem:
            slug = stem.replace('dfva-recommend-', '')
            content = fix_recommend_metadata(slug, content)
        elif 'market' in stem:
            content = fix_market_metadata(content)
        else:
            slug = re.sub(r'^dfva-', '', stem)
            content = fix_dfva_metadata(slug, content)

        if content != original:
            path.write_text(content)
            print(f'  META FIXED: {stem}.md')
            updated += 1

    print(f'\nMetadata fixes applied to {updated} files.')


if __name__ == "__main__":
    main()
    normalize_metadata()
