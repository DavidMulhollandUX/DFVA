"""Tests for dfva-market-scaffold.py: claim selection, the §3 house form, ledger refusal,
field-grain resolution. Run: python3 -m pytest scripts/test_dfva_market_scaffold.py -q"""
import importlib
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / 'scripts'))
ms = importlib.import_module('dfva-market-scaffold')


def claim(cid, lane, text, url='https://example.org/x', date='2025-01-01', refuted=False, disposition='sourced', bearing=None):
    return {
        'id': cid, 'lane': lane, 'text': text, 'refuted': refuted, 'disposition': disposition,
        'sources': [{'publisher': 'Pub', 'title': f'Title {cid}', 'url': url, 'date': date}],
        'scope': 'Scope sentence.', 'bearing': bearing or ['C3'],
    }


def ledger(title='Analysts', claims=(), confidence='medium', **extra):
    d = {'onet_soc_code': '00-0000', 'title': title, 'aliases': ['Analyst'], 'confidence': confidence,
         'researchMethod': ms.EMPIRICAL, 'claims': list(claims), 'caveats': [],
         'jobAds': {'source': 'adzuna-au', 'query': 'analyst', 'window': 'w', 'count': 12, 'topEmployers': ['E'], 'topSkills': ['modelling']},
         'corpus': {'platforms': [], 'searchesReturningNothing': []}, '_weight': 1, '_via': ['Analyst']}
    d.update(extra)
    return d


def test_select_claims_drops_refuted_unlinked_and_wrong_disposition_and_caps():
    led = ledger(claims=[
        claim('a', 'L1', 'Regulated entry.'),
        claim('b', 'L2', 'A study found x.', date='2024-06-01'),
        claim('c', 'L3', 'Trade press says y.'),
        claim('d', 'L1', 'Refuted claim.', refuted=True),
        claim('e', 'L2', 'No link.', url=''),
        claim('f', 'L3', 'Removed claim.', disposition='removed'),
        claim('g', 'L1', "DFVA's own index assigns this occupation 91.99.", date='2026-01-01'),
        claim('h', 'L1', 'Handbook says.', url='https://handbook.unimelb.edu.au/2026/courses/x', date='2026-01-01'),
    ])
    chosen = ms.select_claims([led], max_themes=6, per_ledger=2)
    ids = [c['id'] for _, c in chosen]
    assert ids == ['a', 'b']  # per-ledger cap of 2, L1 before L2; refuted, unlinked, removed, self-cited and handbook-sourced gone


def test_select_claims_falls_back_to_l5_only_when_short_and_dedupes():
    led = ledger(claims=[
        claim('a', 'L1', 'Same text.'),
        claim('a2', 'L2', 'Same text.'),
        claim('l5', 'L5', 'Practitioner says z.'),
    ])
    chosen = ms.select_claims([led], max_themes=6, per_ledger=3)
    ids = [c['id'] for _, c in chosen]
    assert ids == ['a', 'l5']  # duplicate text dropped; L5 added because fewer than 3 survived
    full = ledger(claims=[claim(i, 'L1', f'Claim {i}.') for i in 'abc'] + [claim('l5', 'L5', 'Practitioner.')])
    assert [c['id'] for _, c in ms.select_claims([full], per_ledger=3)] == ['a', 'b', 'c']


def test_render_s3_has_the_house_form():
    led = ledger(claims=[claim('a', 'L1', 'Entry is regulated by statute. Second sentence.')])
    chosen = ms.select_claims([led])
    s3 = ms.render_s3(chosen, [led])
    assert s3.startswith('## 3. CURRENT DISCUSSION SIGNALS — MEDIUM CONFIDENCE')
    assert '**What these sources are.**' in s3
    assert '### Theme 1 — entry is regulated by statute' in s3
    assert '](https://example.org/x) (2025-01-01)' in s3
    assert '**Bearing:** C3.' in s3
    assert 'not performed' in s3 and 'not a scrape' in s3 or 'no professional forum was sampled' in s3


def test_non_empirical_ledger_is_skipped_and_declared(tmp_path, monkeypatch):
    monkeypatch.setattr(ms, 'ROOT', tmp_path)
    (tmp_path / 'data/professions').mkdir(parents=True)
    (tmp_path / 'data/professions/11-1111.json').write_text('{"title": "Fake", "researchMethod": "generic", "claims": []}')
    ledgers, skipped = ms.load_ledgers([{'soc': '11-1111', 'title': 'Fake', 'weight': 1, 'via': []},
                                        {'soc': '22-2222', 'title': 'Missing', 'weight': 1, 'via': []}])
    assert ledgers == []
    assert [why for _, why in skipped] == [f'record is not {ms.EMPIRICAL}', 'no profession record']


def test_field_grain_resolution_reaches_an_empirical_ledger_for_a_backlog_code():
    res = ms.resolve_professions('b-mus')
    assert res['grain'] == 'field'
    assert res['socs'], 'no SOC resolved from the HEO entry occupations'
    ledgers, _ = ms.load_ledgers(res['socs'])
    assert ledgers, 'no empirical ledger for b-mus'


def test_render_refuses_a_program_with_no_field():
    with pytest.raises(SystemExit):
        ms.render('no-such-code', '2026-09-03', 6)


SIBLING = """# DFVA MARKET INTELLIGENCE: X (X)

## 4. SKILL SHIFT SUMMARY

| Skill | Direction | Rationale |
|---|---|---|
| python | Rising | Recurring keyword. |
| sql | TO BE AUTHORED | Recurring keyword. |

## 5. CURRICULUM IMPLICATIONS

| # | Implication | Dimension | Action |
|---|---|---|---|
| CI-1 | Modelling work is assessed individually. | C1 | Add a group task (cost: marking load). |

## 6. EVIDENCE CONFIDENCE + GAPS
"""


def test_parse_sibling_lifts_filled_directions_and_the_s5_block():
    directions, s5 = ms.parse_sibling(SIBLING)
    assert directions == {'python': 'Rising'}
    assert s5.startswith('| # | Implication') and 'CI-1' in s5


def test_parse_sibling_returns_no_s5_when_unfilled():
    _d, s5 = ms.parse_sibling(SIBLING.replace('Modelling work is assessed individually.', ms.A))
    assert s5 is None


def test_same_professions_compares_soc_sets_only():
    a = {'socs': [{'soc': '15-1252', 'weight': 1}, {'soc': '13-2011', 'weight': 2}]}
    b = {'socs': [{'soc': '13-2011', 'weight': 9}, {'soc': '15-1252', 'weight': 0}]}
    assert ms.same_professions(a, b)
    assert not ms.same_professions(a, {'socs': [{'soc': '15-1252'}]})
    assert not ms.same_professions({'socs': []}, {'socs': []})


def test_render_s4_and_s5_take_reused_content():
    s4 = ms.render_s4([], {'python': 'Rising'})
    assert ms.A in s4  # no ledgers → the placeholder row
    s5 = ms.render_s5('| # | Implication | Dimension | Action |\n|---|---|---|---|\n| CI-1 | x | C1 | y |')
    assert ms.A not in s5 and 'AUTHOR:S5' not in s5
