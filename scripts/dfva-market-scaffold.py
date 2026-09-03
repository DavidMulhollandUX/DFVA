#!/usr/bin/env python3
"""Scaffold reports/dfva-market-<code>.md from committed data — the profession ledgers,
the destination data and the labour-evidence footer — so that §1, §2, §3 and §6 are
rendered from sourced records and only §4's Direction column and §5 are authored.

    python3 scripts/dfva-market-scaffold.py b-mus                 # write the report (refuses to overwrite)
    python3 scripts/dfva-market-scaffold.py b-mus --force         # overwrite
    python3 scripts/dfva-market-scaffold.py b-mus --stdout        # print, write nothing
    python3 scripts/dfva-market-scaffold.py b-mus --date 2026-09-03 --max-themes 6

WHY. The market report was the one artefact in the v4 family with no generator: six
sections written by hand, and a §3 sourcing lint that a hand-written section clears
only after a fix loop. docs/dfva-profession-deep-research.md says "an agent renders §3
from the ledger for now" and that a script is the better end state. This is that script.

WHAT IS DERIVED (never typed by an author):
  header      program name from data/jsa/program_fields.json, handbook URL
  §1          job families = the resolved professions; entry titles = the ledger aliases
              (exact grain: the Job Insights Report titles; field grain: the JSA HEO entry
              occupations that resolve); substitution pressure is left as
              "not stated in the market report" because it is a judgement
  §2          the ledger's job-advertisement sample (source, query, window, count,
              employers, keywords) and the L4 claims, each with its link
  §3          selected ledger claims in the house form: the sourcing declaration, one
              "### Theme n — <claim>" per claim, the claim text verbatim, dated links,
              scope, bearing. Heading confidence = the lowest ledger confidence.
  §4          one row per recurring advertisement keyword; Direction is the author's
  §5          AUTHOR block
  §6          one row per lane per ledger, per search that returned nothing, per caveat
  footer      build-market-footer.build_block(code)

WHAT IS REFUSED:
  - a ledger without researchMethod == "empirical-five-lane-v1" is skipped and declared
    in §6 (the 2026-08-24 fabrication incident is why that marker exists); if no
    empirical ledger resolves at all the script exits without writing
  - a claim that is refuted, lacks a URL, or has a disposition other than
    sourced / scoped / corrected

The lint (scripts/check-report-format.ts) refuses the file while any TO BE AUTHORED
marker survives, so the scaffold's output cannot ship unauthored.
"""
import argparse
import collections
import datetime as dt
import importlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / 'scripts'))
professions_of = importlib.import_module('professions-of')
footer = importlib.import_module('build-market-footer')

A = 'TO BE AUTHORED'
NOT_STATED = 'not stated in the market report'
EMPIRICAL = 'empirical-five-lane-v1'
LANE_LABELS = {
    'L1': 'regulatory and statutory instruments',
    'L2': 'scholarly and grey-literature studies',
    'L3': 'trade and professional press',
    'L4': 'job-advertisement signals',
    'L5': 'practitioner discourse',
}
CONFIDENCE_RANK = {'HIGH': 3, 'MEDIUM': 2, 'LOW': 1}
KEEP_DISPOSITIONS = {'sourced', 'scoped', 'corrected'}
NO_KEYWORDS = re.compile(r'no skill keywords', re.I)


# ── Resolution ──────────────────────────────────────────────────────────────

def resolve_professions(code):
    """Program → SOC codes with weights, at exact (Job Insights Report) or field grain."""
    base = professions_of.resolve(code)
    glob_map, _scoped = professions_of.load_crosswalk()
    out = {'code': code, 'name': base.get('name'), 'grain': base['grain'],
           'field': base.get('field'), 'fieldName': base.get('fieldName'),
           'socs': [], 'unresolved': [], 'n': base.get('n')}
    if base['grain'] == 'exact':
        for p in base['professions']:
            out['socs'].append({'soc': p['onet_soc_code'], 'title': p['title'], 'weight': p['titles'], 'via': [p['title']]})
        out['unresolved'] = list(base.get('unmapped', []))
        return out
    heo = json.loads((ROOT / 'data/jsa/heo_field_destinations.json').read_text())['fields']
    fd = heo.get(base.get('field') or '')
    if not fd:
        raise SystemExit(f"{code}: field {base.get('field')} absent from data/jsa/heo_field_destinations.json")
    by_soc = collections.OrderedDict()
    for entry in fd.get('entry', [])[:10]:
        hit = glob_map.get(entry['title'].strip().lower())
        if not hit:
            out['unresolved'].append(f"{entry['title']} ({entry['share']:.1f}%)")
            continue
        soc, title = hit
        rec = by_soc.setdefault(soc, {'soc': soc, 'title': title, 'weight': 0.0, 'via': []})
        rec['weight'] += entry['share']
        rec['via'].append(f"{entry['title']} ({entry['share']:.1f}%)")
    out['socs'] = sorted(by_soc.values(), key=lambda r: -r['weight'])
    return out


def load_ledgers(socs):
    """Empirical ledgers for the resolved SOCs; the rest are reported, not used."""
    ledgers, skipped = [], []
    for s in socs:
        p = ROOT / 'data/professions' / f"{s['soc']}.json"
        if not p.exists():
            skipped.append((s, 'no profession record'))
            continue
        d = json.loads(p.read_text())
        if d.get('researchMethod') != EMPIRICAL:
            skipped.append((s, f"record is not {EMPIRICAL}"))
            continue
        d['_weight'] = s['weight']
        d['_via'] = s['via']
        ledgers.append(d)
    return ledgers, skipped


# ── Selection ───────────────────────────────────────────────────────────────

def _has_url(c):
    return any((src.get('url') or '').startswith('http') for src in c.get('sources', []))


def _date_key(c):
    return max((src.get('date') or '') for src in c.get('sources', [])) if c.get('sources') else ''


def select_claims(ledgers, max_themes=6, per_ledger=2):
    """Deterministic §3 selection: unrefuted, URL-bearing, sourced/scoped/corrected claims
    from lanes L1–L3, ranked by lane then date, capped per ledger and overall, deduplicated
    on text. L5 claims with a URL fill in only when fewer than three survive — the lint
    needs three attributions and a discourse sample is a weaker source than a study."""
    seen, chosen = set(), []

    def eligible(c, lanes):
        # A claim about DFVA's own data, or sourced from the handbook, is not a market
        # signal: the no-fabrication contract makes the handbook inadmissible and a
        # self-citation would let the report quote itself.
        own = re.search(r'\bDFVA\b', c.get('text', '')) or any(
            'handbook.unimelb' in (src.get('url') or '') for src in c.get('sources', []))
        # A claim phrased as a question is a forum prompt, not a finding; it would render
        # as a question heading.
        question = c.get('text', '').strip().endswith('?')
        return (c.get('lane') in lanes and not c.get('refuted') and _has_url(c) and not own and not question
                and c.get('disposition', 'sourced') in KEEP_DISPOSITIONS and c.get('text', '').strip())

    def take(lanes, cap_total):
        for led in ledgers:
            n = 0
            cands = [c for c in led.get('claims', []) if eligible(c, lanes)]
            # Lane ascending (L1 before L3), newest first within a lane; stable sorts compose.
            cands.sort(key=_date_key, reverse=True)
            cands.sort(key=lambda c: c['lane'])
            for c in cands:
                key = re.sub(r'\W+', ' ', c['text'].lower()).strip()[:160]
                if key in seen or n >= per_ledger or len(chosen) >= cap_total:
                    continue
                seen.add(key)
                chosen.append((led, c))
                n += 1

    take({'L1', 'L2', 'L3'}, max_themes)
    if len(chosen) < 3:
        take({'L5'}, max(3, len(chosen) + 2))
    return chosen


# ── Rendering ───────────────────────────────────────────────────────────────

def _esc(s):
    return re.sub(r'\s*\n\s*', ' ', str(s)).replace('|', '\\|').strip()


def _conf(led):
    c = str(led.get('confidence', 'low')).upper().replace('MEDIUM-HIGH', 'MEDIUM').replace('LOW-MEDIUM', 'LOW')
    return c if c in CONFIDENCE_RANK else 'LOW'


def _lowest_conf(ledgers):
    return min((_conf(l) for l in ledgers), key=lambda c: CONFIDENCE_RANK[c]) if ledgers else 'LOW'


def _link(src):
    pub = _esc(src.get('publisher') or 'source')
    title = _esc(src.get('title') or '')
    label = f"{pub}, {title}" if title and title.lower() != pub.lower() else pub
    date = f" ({src['date']})" if src.get('date') else ''
    return f"[{label[:140]}]({src['url']}){date}"


def _keywords(led):
    return [k for k in (led.get('jobAds') or {}).get('topSkills', []) if k and not NO_KEYWORDS.search(k)]


def render_header(code, name, date):
    url = f"https://handbook.unimelb.edu.au/2026/courses/{code}"
    return f"# DFVA MARKET INTELLIGENCE: {name} ({code.upper()})\n**Assessment Date:** {date} | **Source:** {url}\n"


def render_s1(res, ledgers, skipped):
    lines = ['## 1. JOB FAMILY MAP', '']
    if res['grain'] == 'exact':
        lines.append(f"Job families are the occupations this program's own Job Insights Report (JIR) destination "
                     f"titles resolve to (n = {res['n']}), mapped to the Standard Occupational Classification (SOC) "
                     f"and joined to the profession records in this report.")
    else:
        lines.append(f"This program has no destination record of its own, so job families rest on a "
                     f"**field-of-education** basis: the Jobs and Skills Australia Higher Education Outcomes "
                     f"(JSA HEO) entry occupations for field **{res['field']} {res['fieldName']}** — graduates of the "
                     f"whole field, not this program — mapped to the Standard Occupational Classification (SOC).")
    lines += ['', '| Job family | Entry titles | AI substitution pressure | Skills rising in that family |',
              '| --- | --- | --- | --- |']
    for led in ledgers:
        titles = '; '.join(led.get('aliases') or led['_via']) or NOT_STATED
        kws = ', '.join(_keywords(led)[:4])
        skills = f"recurring keywords in the advertisement sample: {kws}" if kws else NOT_STATED
        lines.append(f"| {_esc(led['title'])} | {_esc(titles)} | {NOT_STATED} | {_esc(skills)} |")
    if not ledgers:
        lines.append(f"| {A} | {A} | {A} | {A} |")
    notes = []
    if res['unresolved']:
        notes.append('Destination titles with no occupation mapping yet: ' + '; '.join(_esc(u) for u in res['unresolved'][:8]) + '.')
    if skipped:
        notes.append('Occupations with no empirical profession record: ' + '; '.join(f"{_esc(s['title'])} ({why})" for s, why in skipped) + '.')
    if notes:
        lines += ['', ' '.join(notes)]
    return '\n'.join(lines) + '\n'


def render_s2(ledgers):
    lines = ['## 2. RECENT JOB AD SIGNALS', '']
    if not ledgers:
        return '\n'.join(lines + [A]) + '\n'
    lines.append(f"> **Confidence: {_lowest_conf(ledgers)}** — live advertisement index counts, not a 90-day scrape; "
                 f"counts are the index's own and are not audited here.")
    n = 0
    for led in ledgers:
        ads = led.get('jobAds') or {}
        if ads.get('count') is None:
            continue
        n += 1
        emp = ', '.join(ads.get('topEmployers', [])[:6])
        kws = ', '.join(_keywords(led)[:6])
        para = (f"**Signal {n} — {_esc(led['title'])}:** {ads['count']:,} postings matching \"{_esc(ads.get('query', ''))}\" "
                f"({_esc(ads.get('window', 'window not stated'))}, source {_esc(ads.get('source', 'not stated'))}).")
        if emp:
            para += f" Employers named most often in the sample: {_esc(emp)}."
        if kws:
            para += f" Recurring skill keywords: {_esc(kws)}."
        if ads.get('note'):
            para += f" {_esc(ads['note'])}"
        lines += ['', para]
        l4 = [c for c in led.get('claims', []) if c.get('lane') == 'L4' and not c.get('refuted') and _has_url(c)][:3]
        for c in l4:
            lines.append(f"- {_esc(c['text'])} — {_link(c['sources'][0])}")
    if n == 0:
        lines += ['', 'No advertisement sample is recorded for the resolved professions.']
    return '\n'.join(lines) + '\n'


def render_s3(chosen, ledgers):
    conf = _lowest_conf(ledgers)
    lines = [f'## 3. CURRENT DISCUSSION SIGNALS — {conf} CONFIDENCE', '']
    lanes = sorted({c['lane'] for _, c in chosen})
    kinds = ', '.join(LANE_LABELS[l] for l in lanes) or 'no sourced material'
    platforms = [p for led in ledgers for p in (led.get('corpus') or {}).get('platforms', [])]
    sample = ('; '.join(f"{p.get('name')} ({p.get('items')} items, {_esc(p.get('scope', ''))})" for p in platforms[:4]))
    kinds = kinds[:1].upper() + kinds[1:]
    decl = (f"**What these sources are.** {kinds}, drawn from the committed profession records for the "
            f"occupations in §1, each with its publisher, date and link. Direct extraction from X or LinkedIn was "
            f"**not** performed and no professional forum was sampled for this report")
    decl += (f"; the profession records declare their own practitioner-discourse sample — {sample} — which is a declared "
             f"sample, not a scrape." if sample else ".")
    decl += (" Themes are the claims as recorded; nothing is paraphrased, and a claim without a source was not "
             "carried. Dates are given where the source carries one.")
    lines += [decl, '']
    if not chosen:
        lines += ['<!-- AUTHOR:S3 — no sourced claim resolved for this program; research the professions first. -->', A, '']
    for i, (led, c) in enumerate(chosen, 1):
        first = re.split(r'(?<=[.!?])\s', c['text'].strip(), maxsplit=1)[0]
        head = (first[:1].lower() + first[1:]).rstrip('.')
        if len(head) > 110:
            head = head[:107].rstrip() + '…'
        lines.append(f"### Theme {i} — {_esc(head)}")
        lines += ['', f"{_esc(c['text'])} ({_esc(led['title'])}; lane {c['lane']}, {LANE_LABELS[c['lane']]}.)", '']
        lines.append('Sources: ' + '; '.join(_link(s) for s in c['sources'] if (s.get('url') or '').startswith('http')) + '.')
        scope = c.get('scope')
        if scope:
            lines += ['', f"Scope: {_esc(scope)}" + (" Stated down to what the source measured." if c.get('disposition') == 'scoped' else '')]
        if c.get('disposition') == 'corrected':
            lines += ['', 'This claim corrects an earlier version that the source contradicted.']
        bearing = [b for b in c.get('bearing', []) if re.match(r'^[CWG]\d$', str(b))]
        lines += ['', f"**Bearing:** {' and '.join(bearing) if bearing else 'not stated in the profession record'}.", '']
    return '\n'.join(lines).rstrip('\n') + '\n'


def parse_sibling(text):
    """An authored sibling report's §4 Direction cells (by skill) and its §5 block.
    Returns (directions, s5) with s5 None when the sibling's §5 is itself unfilled."""
    m4 = re.search(r'^## 4\..*?\n(.*?)(?=^## |\Z)', text, re.M | re.S)
    directions = {}
    for line in (m4.group(1) if m4 else '').split('\n'):
        if not line.startswith('| ') or line.startswith('| Skill') or line.startswith('|---'):
            continue
        cells = [c.strip() for c in re.split(r'(?<!\\)\|', line)[1:-1]]
        if len(cells) >= 2 and cells[1] and cells[1] != A:
            directions[cells[0]] = cells[1]
    m5 = re.search(r'^## 5\..*?$\n(.*?)(?=^## 6)', text, re.M | re.S)
    s5 = m5.group(1).strip('\n') if m5 else ''
    if not s5 or A in s5 or 'AUTHOR:S5' in s5:
        s5 = None
    return directions, s5


def same_professions(a, b):
    """Two resolutions share a profession set when their SOC codes are identical."""
    return {x['soc'] for x in a['socs']} == {x['soc'] for x in b['socs']} and bool(a['socs'])


def siblings(code):
    """Scored programs whose profession set equals this one's, with their market-report state."""
    me = resolve_professions(code)
    out = []
    for f in sorted((ROOT / 'dfva/source/evidence').glob('*.json')):
        other = f.stem
        if other == code or 'panelCv4' not in f.read_text():
            continue
        try:
            res = resolve_professions(other)
        except SystemExit:
            continue
        if not same_professions(me, res):
            continue
        rp = ROOT / 'reports' / f'dfva-market-{other}.md'
        state = 'no market report'
        if rp.exists():
            _d, s5 = parse_sibling(rp.read_text())
            state = 'authored — reusable' if s5 else 'scaffolded, §5 unfilled'
        out.append((other, state))
    return out


def render_s4(ledgers, directions=None):
    counts = collections.Counter()
    where = {}
    for led in ledgers:
        for k in _keywords(led):
            counts[k] += 1
            where.setdefault(k, led)
    lines = ['## 4. SKILL SHIFT SUMMARY', '', '| Skill | Direction | Rationale |', '|---|---|---|']
    for k, _n in counts.most_common(6):
        led = where[k]
        cnt = (led.get('jobAds') or {}).get('count')
        lines.append(f"| {_esc(k)} | {(directions or {}).get(k, A)} | Recurring keyword in the advertisement sample for {_esc(led['title'])}"
                     f" (§2{f', {cnt:,} postings' if cnt else ''}). |")
    if not counts:
        lines.append(f"| {A} | {A} | {A} |")
    return '\n'.join(lines) + '\n'


def render_s5(block=None):
    if block:
        return '## 5. CURRICULUM IMPLICATIONS\n\n' + block + '\n'
    return ('## 5. CURRICULUM IMPLICATIONS\n\n'
            '<!-- AUTHOR:S5 — one row per implication; Dimension names the scored items (C1–C5, W1–W3)\n'
            '     the implication bears on; Action is an option with its cost, never a directive. -->\n\n'
            '| # | Implication | Dimension | Action |\n|---|---|---|---|\n'
            f'| CI-1 | {A} | {A} | {A} |\n')


def render_s6(res, ledgers, skipped):
    lines = ['## 6. EVIDENCE CONFIDENCE + GAPS', '', '| Signal area | Confidence | Gap / Caveat |', '|---|---|---|']
    if res['grain'] == 'field':
        lines.append(f"| Destination basis | LOW | Field-of-education grain ({res['field']} {res['fieldName']}): the destinations are the field's, not this program's. |")
    else:
        lines.append(f"| Destination basis | HIGH | This program's own Job Insights Report (JIR) record (n = {res['n']}). |")
    for led in ledgers:
        present = sorted({c.get('lane') for c in led.get('claims', []) if c.get('lane') in LANE_LABELS})
        for lane in ['L1', 'L2', 'L3', 'L4', 'L5']:
            if lane in present:
                lines.append(f"| {_esc(led['title'])} — {LANE_LABELS[lane]} | {_conf(led)} | "
                             f"{sum(1 for c in led['claims'] if c.get('lane') == lane)} recorded claim(s); retrieved {_esc((led.get('corpus') or {}).get('retrieved') or led.get('generated') or 'date not recorded')}. |")
            else:
                lines.append(f"| {_esc(led['title'])} — {LANE_LABELS[lane]} | LOW | No claim recorded in this lane. |")
        for s in (led.get('corpus') or {}).get('searchesReturningNothing', []) or []:
            if isinstance(s, str):  # older ledgers record the search as one sentence
                lines.append(f"| {_esc(led['title'])} — search | LOW | Search returned nothing: {_esc(s)} |")
                continue
            lines.append(f"| {_esc(led['title'])} — {_esc(s.get('lane', '?'))} via {_esc(s.get('source', '?'))} | LOW | "
                         f"Search returned nothing ({_esc(s.get('status', ''))}{', ' + _esc(s.get('date')) if s.get('date') else ''}): {_esc(s.get('detail') or s.get('note') or '')} |")
        for cv in led.get('caveats', []) or []:
            lines.append(f"| {_esc(led['title'])} — record caveat | {_conf(led)} | {_esc(cv)} |")
    for s, why in skipped:
        lines.append(f"| {_esc(s['title'])} | LOW | {why}; no claim from this occupation is used in this report. |")
    return '\n'.join(lines) + '\n'


def render(code, date, max_themes, reuse=None):
    res = resolve_professions(code)
    directions, s5 = {}, None
    if reuse:
        # Same profession set → same market evidence, so the sibling's authored §4
        # Direction and §5 carry over. The author still checks §5 for program fit.
        if not same_professions(res, resolve_professions(reuse)):
            raise SystemExit(f"{code}: profession set differs from {reuse}; nothing to reuse (see --siblings)")
        rp = ROOT / 'reports' / f'dfva-market-{reuse}.md'
        if not rp.exists():
            raise SystemExit(f"{reuse}: no market report to reuse")
        directions, s5 = parse_sibling(rp.read_text())
        if s5 is None:
            raise SystemExit(f"{reuse}: its §5 is not authored yet; nothing to reuse")
    if not res['name']:
        raise SystemExit(f"{code}: no entry in data/jsa/program_fields.json — assign a field and name first")
    ledgers, skipped = load_ledgers(res['socs'])
    if not ledgers:
        raise SystemExit(f"{code}: no {EMPIRICAL} profession record resolves — research the professions first "
                         f"(scripts/workflows/dfva-profession-research.js); refusing to write an unsourced report")
    chosen = select_claims(ledgers, max_themes=max_themes)
    body = '\n'.join([
        render_header(code, res['name'], date),
        render_s1(res, ledgers, skipped),
        render_s2(ledgers),
        render_s3(chosen, ledgers),
        render_s4(ledgers, directions),
        render_s5(s5),
        render_s6(res, ledgers, skipped),
    ])
    return sanitise(body).rstrip('\n') + '\n\n' + footer.build_block(code) + '\n'


def sanitise(text):
    """Reader-facing vocabulary (check-report-format.ts MARKET_DENYLIST and the acronym
    rule). Ledger caveats are internal notes and can carry pipeline words; the report
    cannot."""
    text = re.sub(r'\bcrosswalk(ed|s)?\b', 'occupation mapping', text, flags=re.I)
    if re.search(r'\bAIOE\b', text) and 'AI Occupational Exposure' not in text:
        text = re.sub(r'\bAIOE\b', 'AI Occupational Exposure (AIOE)', text, count=1)
    for word in ('jobAds', 'topSkills', 'topEmployers'):
        text = text.replace(word, 'the advertisement sample')
    text = text.replace('Panel C', "the durability report's curriculum evidence")
    # Ledger caveats point at repository files; a reader has no repository.
    text = re.sub(r'\s*\((?:see|in)\s+(?:data|scripts|docs)/[^)]*\)', '', text)
    text = re.sub(r'\b(?:data|scripts|docs)/[\w./-]+', 'the profession record', text)
    for acr, full in (('AQF', 'Australian Qualifications Framework'),):
        if re.search(rf'\b{acr}\b', text) and full not in text:
            text = re.sub(rf'\b{acr}\b', f'{full} ({acr})', text, count=1)
    return text


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('code')
    ap.add_argument('--force', action='store_true', help='overwrite an existing report')
    ap.add_argument('--stdout', action='store_true', help='print the report; write nothing')
    ap.add_argument('--date', default=dt.date.today().isoformat())
    ap.add_argument('--max-themes', type=int, default=6)
    ap.add_argument('--reuse-from', metavar='CODE', help='copy §4 Direction and §5 from an authored sibling with the same profession set')
    ap.add_argument('--siblings', action='store_true', help='list scored programs sharing this profession set, then exit')
    a = ap.parse_args()
    if a.siblings:
        rows = siblings(a.code)
        print('\n'.join(f"{c}: {state}" for c, state in rows) if rows else f"{a.code}: no sibling shares its profession set")
        return
    text = render(a.code, a.date, a.max_themes, reuse=a.reuse_from)
    if a.stdout:
        sys.stdout.write(text)
        return
    out = ROOT / 'reports' / f'dfva-market-{a.code}.md'
    if out.exists() and not a.force:
        raise SystemExit(f"{out.relative_to(ROOT)} exists — pass --force to overwrite")
    out.write_text(text)
    todo = 'review the reused §5 rows for program fit' if a.reuse_from else 'author §4 Direction and §5'
    print(f"wrote {out.relative_to(ROOT)} — {todo}, then: "
          f"cd scripts && npx tsx check-report-format.ts --code {a.code}")


if __name__ == '__main__':
    main()
