# scripts/recommendations.py
# Maps DFVA dimensions → specific improvement actions with point impact and effort.

RECOMMENDATIONS = {
    'Automation Exposure': [
        {'from': [0, 1], 'action': 'Introduce capstone/internship with real client accountability', 'impact': 1, 'effort': 'High'},
        {'from': [0, 1, 2], 'action': 'Add clinical placement or supervised professional practice requirement', 'impact': 1, 'effort': 'High'},
        {'from': [1, 2], 'action': 'Require industry project with defended outputs and stakeholder presentation', 'impact': 1, 'effort': 'Medium'},
    ],
    'Systems Thinking': [
        {'from': [0, 1], 'action': 'Add a systems mapping/design core unit with trade-off analysis', 'impact': 1, 'effort': 'Medium'},
        {'from': [1, 2], 'action': 'Integrate cross-disciplinary case studies into existing core units', 'impact': 1, 'effort': 'Low'},
    ],
    'Technical Depth': [
        {'from': [0, 1], 'action': 'Add quantitative methods or data analysis core unit', 'impact': 1, 'effort': 'Medium'},
        {'from': [1, 2], 'action': 'Require technical-elective sequence (3+ units) with applied project', 'impact': 1, 'effort': 'Low'},
    ],
    'Decision-Making': [
        {'from': [0, 1], 'action': 'Introduce case-based assessment with defended trade-off decisions', 'impact': 1, 'effort': 'Medium'},
        {'from': [1, 2], 'action': 'Add capstone project requiring documented decision rationale', 'impact': 1, 'effort': 'Low'},
    ],
    'AI Literacy': [
        {'from': [0], 'action': 'Add an introductory AI literacy module (online, 6hrs)', 'impact': 1, 'effort': 'Low'},
        {'from': [0, 1], 'action': 'Integrate AI tools into existing unit with ethics/governance discussion', 'impact': 1, 'effort': 'Low'},
        {'from': [0, 1, 2], 'action': 'Add dedicated AI in discipline core unit (12.5pt)', 'impact': 2, 'effort': 'Medium'},
    ],
    'Domain Depth': [
        {'from': [0, 1], 'action': 'Add specialist elective stream (3+ units) in a defined sub-field', 'impact': 1, 'effort': 'Medium'},
        {'from': [1, 2], 'action': 'Seek professional accreditation or industry partnership', 'impact': 1, 'effort': 'High'},
    ],
    'Research Rigour': [
        {'from': [0], 'action': 'Add a research methods unit with small-scale project', 'impact': 1, 'effort': 'Medium'},
        {'from': [0, 1], 'action': 'Introduce a minor thesis or capstone research project', 'impact': 2, 'effort': 'High'},
        {'from': [1, 2], 'action': 'Replace literature review with primary data collection requirement', 'impact': 1, 'effort': 'Medium'},
    ],
    'Human & Relational': [
        {'from': [0, 1], 'action': 'Add ethics/professional practice unit or workshop series', 'impact': 1, 'effort': 'Low'},
        {'from': [1, 2], 'action': 'Integrate stakeholder engagement into existing project assessment', 'impact': 1, 'effort': 'Low'},
    ],
    'Curriculum Currency': [
        {'from': [0, 1], 'action': 'Establish annual curriculum review with industry advisory panel', 'impact': 1, 'effort': 'Low'},
        {'from': [1, 2], 'action': 'Add emerging-trends module updated each intake', 'impact': 1, 'effort': 'Low'},
    ],
    'Outcome Evidence': [
        {'from': [0, 1], 'action': 'Publish graduate destination survey results on program page', 'impact': 1, 'effort': 'Low'},
        {'from': [1, 2], 'action': 'Add QILT GOS data + 3-year outcomes to public program information', 'impact': 1, 'effort': 'Low'},
    ],
    'Irreplaceability (bonus)': [
        {'from': [0, 1], 'action': 'Develop a dual-skill pathway (e.g., tech + domain, clinical + research)', 'impact': 1, 'effort': 'High'},
        {'from': [1, 2], 'action': 'Add regulatory accreditation or professional registration pathway', 'impact': 1, 'effort': 'High'},
    ],
}

def get_recommendations(dimension: str, current_score: int):
    """Return applicable recommendations for a dimension, sorted by impact desc then effort asc."""
    recs = RECOMMENDATIONS.get(dimension, [])
    applicable = [r for r in recs if current_score in r['from']]
    effort_order = {'Low': 0, 'Medium': 1, 'High': 2}
    return sorted(applicable, key=lambda r: (-r['impact'], effort_order.get(r['effort'], 1)))
