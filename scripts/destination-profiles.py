#!/usr/bin/env python3
"""Work queue and validator for inferred graduate destination profiles.

A JIR record in data/jir_data.json is MEASURED: LiveAlumni observed real graduates
of a named program and counted them. A destination profile here is INFERRED from
labour-market evidence. Those are different claims, and this file exists partly to
keep them apart — nothing here ever writes to jir_data.json, `n` is always null,
and every profile carries its provenance.

Plan: docs/dfva-destination-profiles-plan.md

Commands:
    pending [n]     Wave 1 programs with no measured record and no profile yet
    unmapped [n]    destination titles blocking Wave 1, most-blocking first
    nextbatch [n] [--all]
                    titles to map next, ordered so whole PROGRAMS clear soonest.
                    Skips titles refused in data/aioe/crosswalk-refused.json and
                    the programs they hold; --all shows the unfiltered queue.
    holdout [n]     Wave 1 programs that DO have a measured record — the
                    known-answer set used to validate the method before trusting it
    ready [n]       the holdout subset whose measured record is FULLY mappable —
                    the only programs where capture yields a two-axis record today
    validate        schema, source support, handbook-source ban, SOC coverage
    compare         inferred vs measured exposure over the holdout set
    status          counts
"""
from __future__ import annotations

import csv
import json
import re
import sys
from pathlib import Path
from statistics import mean, median

ROOT = Path(__file__).resolve().parent.parent
JIR = ROOT / "data" / "jir_data.json"
PROFILES = ROOT / "data" / "destination-profiles.json"
COHORT_EXT = ROOT / "scripts" / "v4_cohort_ext.json"
HOLDOUT_OUT = ROOT / "data" / "destination-profiles-holdout.json"
REFUSED = ROOT / "data" / "aioe" / "crosswalk-refused.json"

# Same three sources, same precedence, as loadCrosswalk() in dfva-v4-gen.ts. If
# these drift apart the comparison in `compare` stops being a comparison.
CROSSWALKS = [
    "data/aioe/reconciliation/reconcile_C_authoritative_288_index.csv",
    "data/aioe/reconciliation/v2_panelA_new_occupation_crosswalk.csv",
    "data/aioe/v31_extension_crosswalk.csv",
]

STAGES = ("entry", "early_mid", "mid_senior")
CONFIDENCE = ("high", "medium", "low")


def norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]", "", s.lower())


def load_json(p: Path, default):
    if not p.exists():
        return default
    return json.loads(p.read_text())


def measured_by_name() -> dict[str, dict]:
    recs = load_json(JIR, {"records": []})["records"]
    return {norm(r["program"]): r for r in recs}


def load_crosswalk() -> dict[str, dict]:
    xw: dict[str, dict] = {}
    for rel in CROSSWALKS:
        p = ROOT / rel
        if not p.exists():
            continue
        with p.open() as fh:
            for r in csv.DictReader(fh):
                t = (r.get("occupation") or "").strip()
                if not t:
                    continue
                try:
                    xw[t] = {
                        "aioe": float(r["ai_exposure_index"]),
                        "confidence": r.get("mapping_confidence") or "high",
                    }
                except (KeyError, ValueError):
                    continue
    return xw


def wave1() -> list[dict]:
    return load_json(COHORT_EXT, [])


def profiles() -> dict[str, dict]:
    return {p["code"]: p for p in load_json(PROFILES, [])}


def split_wave1() -> tuple[list[dict], list[dict]]:
    """(needs_profile, holdout) — split by whether a measured record exists."""
    m = measured_by_name()
    needs, hold = [], []
    for p in wave1():
        (hold if norm(p["name"]) in m else needs).append(p)
    return needs, hold


def titles_of(prof: dict) -> list[tuple[str, bool]]:
    """[(title, is_entry)] deduped, preserving stage precedence like the generator."""
    out, seen = [], set()
    for stage in STAGES:
        for t in prof.get("job_titles", {}).get(stage, []) or []:
            title = t["title"] if isinstance(t, dict) else t
            if title in seen:
                continue
            seen.add(title)
            out.append((title, stage == "entry"))
    return out


def exposure(prof: dict, xw: dict[str, dict]) -> dict | None:
    """Mean AIOE over all titles; entry mean over entry titles.

    Mirrors panelAFor() in dfva-v4-gen.ts, including its refusal to average over
    only the mapped subset — a mean over whatever happened to map is a different
    statistic from the one it would be read as.
    """
    ts = titles_of(prof)
    if not ts:
        return None
    vals, unmapped = [], []
    for title, is_entry in ts:
        hit = xw.get(title)
        if not hit:
            unmapped.append(title)
            continue
        vals.append((hit["aioe"], is_entry))
    if unmapped:
        return {"unmapped": unmapped}
    entry = [v for v, e in vals if e]
    return {
        "exposure": round(mean(v for v, _ in vals), 2),
        "entryExposure": round(mean(entry), 2) if entry else None,
        "nTitles": len(vals),
    }


# --------------------------------------------------------------------------- #
# commands
# --------------------------------------------------------------------------- #

def cmd_pending(n: int | None) -> None:
    needs, _ = split_wave1()
    have = profiles()
    out = [
        {"code": p["code"], "name": p["name"], "faculty": p.get("faculty")}
        for p in needs
        if p["code"] not in have
    ]
    print(json.dumps(out[:n] if n else out, indent=1))


def cmd_holdout(n: int | None) -> None:
    """Programs with a measured record — run the pipeline blind on these first.

    Emitted WITHOUT the measured answer attached, so a run cannot anchor on it.
    """
    _, hold = split_wave1()
    done = {p["code"] for p in load_json(HOLDOUT_OUT, [])}
    out = [
        {"code": p["code"], "name": p["name"], "faculty": p.get("faculty")}
        for p in hold
        if p["code"] not in done
    ]
    print(json.dumps(out[:n] if n else out, indent=1))


def cmd_ready(n: int | None) -> None:
    """Holdout programs whose measured record is FULLY mappable to the crosswalk.

    `holdout` returns all 53 undifferentiated, but Panel A is all-or-nothing:
    panelAFor() in dfva-v4-gen.ts throws on a single unmapped title rather than
    averaging the mapped subset. So a holdout program only yields a two-axis
    record once EVERY one of its titles resolves — which makes this, not
    `holdout`, the set worth putting handbook capture on first.

    The complement is not a to-do list. Some blocked programs cannot clear by
    mapping effort at all: the crosswalk is keyed on title alone, so a title
    like "Teacher" that blocks both a primary and a secondary program has no
    single correct row (Elementary 84.74 vs Secondary 91.99). Those wait on the
    key carrying the program, not on another backfill run.
    """
    _, hold = split_wave1()
    m, xw = measured_by_name(), load_crosswalk()
    out = [
        {"code": p["code"], "name": p["name"], "faculty": p.get("faculty")}
        for p in hold
        if (e := exposure(m[norm(p["name"])], xw)) and "unmapped" not in e
    ]
    print(json.dumps(out[:n] if n else out, indent=1))


def _validate_one(prof: dict, xw: dict[str, dict]) -> list[str]:
    code = prof.get("code", "<no code>")
    errs = []

    if prof.get("n") is not None:
        errs.append(f"{code}: n must be null — there is no graduate count for an inferred profile")
    if prof.get("provenance") != "inferred":
        errs.append(f'{code}: provenance must be "inferred"')
    if prof.get("confidence") not in CONFIDENCE:
        errs.append(f"{code}: confidence must be one of {CONFIDENCE}")

    sources = prof.get("sources") or []
    src_ids = {s.get("n") for s in sources}
    if not sources:
        errs.append(f"{code}: no sources")

    # The handbook is Panel C's evidence. Inferring Panel A destinations from it
    # collapses the two axes into one while looking completely normal.
    for s in sources:
        url = (s.get("url") or "").lower()
        if "handbook.unimelb.edu.au" in url:
            errs.append(f"{code}: handbook.unimelb.edu.au is not an admissible source (circularity)")
    non_handbook = [
        s for s in sources if "handbook.unimelb.edu.au" not in (s.get("url") or "").lower()
    ]
    if sources and not non_handbook:
        errs.append(f"{code}: every source is the handbook — profile rejected")

    ts = titles_of(prof)
    if not ts:
        errs.append(f"{code}: no job_titles")

    for stage in STAGES:
        for t in prof.get("job_titles", {}).get(stage, []) or []:
            if not isinstance(t, dict):
                errs.append(f"{code}: title in {stage} must be an object with onet_soc_code and support")
                continue
            if not t.get("onet_soc_code"):
                errs.append(f"{code}: title {t.get('title')!r} missing onet_soc_code")
            sup = t.get("support") or []
            if not sup:
                errs.append(f"{code}: title {t.get('title')!r} has no source support")
            for s in sup:
                if s not in src_ids:
                    errs.append(f"{code}: title {t.get('title')!r} cites source {s}, which is not listed")

    for e in prof.get("employers") or []:
        if not (e.get("support") or []):
            errs.append(f"{code}: employer {e.get('name')!r} has no source support")

    exp = exposure(prof, xw)
    if exp and "unmapped" in exp:
        errs.append(
            f"{code}: {len(exp['unmapped'])} title(s) not in the crosswalk — "
            f"scoring will throw. Add rows for: {', '.join(exp['unmapped'][:5])}"
        )
    return errs


def cmd_validate() -> None:
    xw = load_crosswalk()
    all_profiles = load_json(PROFILES, []) + load_json(HOLDOUT_OUT, [])
    if not all_profiles:
        print("no profiles yet — nothing to validate")
        return
    errs = [e for p in all_profiles for e in _validate_one(p, xw)]
    if errs:
        print(f"destination-profiles validate FAILED — {len(errs)} problem(s):")
        for e in errs:
            print("  - " + e)
        sys.exit(1)
    print(f"destination-profiles validate OK — {len(all_profiles)} profile(s).")


def cmd_compare() -> None:
    """Inferred vs measured exposure over the holdout set.

    This is the number that decides whether inferred exposure is publishable. A
    small unbiased error means the method works. A consistent one-directional
    error is the dangerous outcome: it is invisible in any single program and
    bends every chart the same way.
    """
    xw = load_crosswalk()
    measured = measured_by_name()
    rows = []
    for prof in load_json(HOLDOUT_OUT, []):
        inf = exposure(prof, xw)
        if not inf or "unmapped" in inf:
            continue
        rec = measured.get(norm(prof["program"]))
        if not rec:
            continue
        act = exposure({"job_titles": rec.get("job_titles", {})}, xw)
        if not act or "unmapped" in act:
            continue  # measured side unmappable — not a fair comparison
        rows.append((prof["code"], inf["exposure"], act["exposure"], inf["exposure"] - act["exposure"]))

    if not rows:
        print("no comparable holdout profiles yet — run the pipeline on `holdout` first")
        return

    errors = [d for *_, d in rows]
    abs_errors = [abs(d) for d in errors]
    print(f"holdout comparison — {len(rows)} program(s)\n")
    print(f"{'code':<14}{'inferred':>10}{'measured':>10}{'error':>9}")
    for code, i, a, d in sorted(rows, key=lambda r: -abs(r[3])):
        print(f"{code:<14}{i:>10.2f}{a:>10.2f}{d:>+9.2f}")
    print(
        f"\nmean abs error {mean(abs_errors):.2f} · median abs {median(abs_errors):.2f} "
        f"· max {max(abs_errors):.2f}"
    )
    bias = mean(errors)
    print(f"mean signed error {bias:+.2f}  <- bias; near zero is what you want")
    if abs(bias) > 0.5 * mean(abs_errors) and len(rows) >= 10:
        print(
            "\nWARNING: errors lean consistently one way. A directional bias moves every "
            "program the same direction and is invisible per-program. Do not publish "
            "inferred exposure until this is understood."
        )


def refused_titles() -> dict[str, dict]:
    """Titles adjudicated as NOT mappable to a single SOC.

    A program clears only when EVERY one of its titles maps, so a program holding
    a refused title can never clear and its remaining titles are not live work.
    Without this, `nextbatch` keeps offering those titles and each run re-derives
    the same refusal — four consecutive runs did exactly that.
    """
    return {r["title"]: r for r in load_json(REFUSED, {}).get("refused", [])}


def cmd_unmapped(n: int | None) -> None:
    """Destination titles blocking Wave 1, most-blocking first.

    A title that appears in several programs' records unblocks several programs
    for one mapping decision, so the ordering is by blast radius, not alphabet.
    Emits the programs each title blocks, because the surrounding programme is
    what disambiguates a title like "Consultant" or "Analyst".
    """
    xw = load_crosswalk()
    measured = measured_by_name()
    _, hold = split_wave1()

    blocking: dict[str, set[str]] = {}
    for p in hold:
        rec = measured.get(norm(p["name"]))
        if not rec:
            continue
        for title, _ in titles_of({"job_titles": rec.get("job_titles", {})}):
            if title not in xw:
                blocking.setdefault(title, set()).add(p["code"])

    rows = sorted(blocking.items(), key=lambda kv: (-len(kv[1]), kv[0]))
    out = [
        {"title": t, "blocks": sorted(codes), "nPrograms": len(codes)}
        for t, codes in (rows[:n] if n else rows)
    ]
    print(json.dumps(out, indent=1))


def cmd_nextbatch(n: int | None, show_all: bool = False) -> None:
    """Titles to map next, ordered so whole PROGRAMS come unblocked soonest.

    `unmapped` orders by how many programs a title touches, which maximises
    titles-per-decision. That turned out to be the wrong objective: a program
    needs EVERY one of its ~15 titles mapped before its exposure can be computed
    at all, so 17 high-blast-radius mappings unblocked exactly zero programs.
    Clearing programs nearest to complete is what actually moves the hold-out
    validation from unusable toward usable.
    """
    xw = load_crosswalk()
    measured = measured_by_name()
    _, hold = split_wave1()

    refused = {} if show_all else refused_titles()

    progs, parked = [], []
    for p in hold:
        rec = measured.get(norm(p["name"]))
        if not rec:
            continue
        un = [t for t, _ in titles_of({"job_titles": rec.get("job_titles", {})}) if t not in xw]
        if not un:
            continue
        held = [t for t in un if t in refused]
        if held:
            parked.append((p["code"], held))
            continue
        progs.append((len(un), p, un))
    progs.sort(key=lambda x: x[0])

    out, seen = [], set()
    for _, p, un in progs:
        for t in un:
            if t in seen:
                continue
            seen.add(t)
            out.append({"title": t, "completes": p["code"], "program": p["name"]})
        if n and len(out) >= n:
            break
    print(json.dumps(out[:n] if n else out, indent=1))
    if parked:
        print(
            f"# {len(parked)} program(s) parked: each holds a refused title and cannot clear. "
            f"Reasons: data/aioe/crosswalk-refused.json. Raw queue: nextbatch --all.",
            file=sys.stderr,
        )
        for code, held in sorted(parked):
            print(f"#   {code}: {', '.join(sorted(held))}", file=sys.stderr)


def cmd_status() -> None:
    needs, hold = split_wave1()
    have, hd = profiles(), {p["code"] for p in load_json(HOLDOUT_OUT, [])}
    print(f"Wave 1: {len(needs) + len(hold)} programs")
    print(f"  measured JIR record : {len(hold)}   (holdout validation set; {len(hd)} profiled)")
    print(f"  needs a profile     : {len(needs)}  ({len(have)} done, {len(needs) - len(have)} pending)")


def main() -> None:
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    cmd, rest = sys.argv[1], sys.argv[2:]
    show_all = "--all" in rest
    rest = [a for a in rest if a != "--all"]
    n = int(rest[0]) if rest and rest[0].isdigit() else None
    if cmd == "pending":
        cmd_pending(n)
    elif cmd == "holdout":
        cmd_holdout(n)
    elif cmd == "ready":
        cmd_ready(n)
    elif cmd == "unmapped":
        cmd_unmapped(n)
    elif cmd == "nextbatch":
        cmd_nextbatch(n, show_all)
    elif cmd == "validate":
        cmd_validate()
    elif cmd == "compare":
        cmd_compare()
    elif cmd == "status":
        cmd_status()
    else:
        print(__doc__)
        sys.exit(2)


if __name__ == "__main__":
    main()
