"""Tests for the v4 capture queue's block breaker.

Run: python3 -m pytest scripts/test_v4_capture_queue.py

The breaker is the part with no natural feedback loop. Everything else in the
queue announces itself the next time an agent runs; a breaker that silently
fails open just looks like normal capture until someone notices the site has
been refusing us for a week.
"""
import importlib.util
import json
from datetime import datetime, timedelta, timezone
from pathlib import Path

import pytest

SRC = Path(__file__).parent / "v4-capture-queue.py"


@pytest.fixture
def q(tmp_path, monkeypatch):
    """The module, pointed at a throwaway queue holding one leased page."""
    spec = importlib.util.spec_from_file_location("v4queue", SRC)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    monkeypatch.setattr(mod, "OUT", str(tmp_path))
    monkeypatch.setattr(mod, "RAW", str(tmp_path / "raw"))
    monkeypatch.setattr(mod, "PAGES", str(tmp_path / "pages"))
    monkeypatch.setattr(mod, "QUEUE", str(tmp_path / "queue.json"))
    mod.save_queue(
        {
            "version": 1,
            "programs": {
                "439fs": {
                    "name": "Test",
                    "base": "https://example.invalid/439fs",
                    "assembled": False,
                    "pages": {
                        "https://example.invalid/439fs": {
                            "slot": "course", "status": "inflight", "chars": 0,
                            "ts": mod.now(),
                        },
                        "https://example.invalid/439fs/course-structure": {
                            "slot": "structure", "status": "pending", "chars": 0, "ts": None,
                        },
                    },
                }
            },
        }
    )
    return mod


def test_block_releases_leases_and_opens_breaker(q):
    state = q.load()
    q.trip_breaker(state, "hCaptcha")
    q.save_queue(state)

    saved = q.load()
    pages = saved["programs"]["439fs"]["pages"].values()
    assert all(p["status"] == "pending" for p in pages), "a blocked run holds nothing"
    assert q.cooloff_seconds(saved) > 0
    assert saved["block"]["consecutive"] == 1


def test_backoff_doubles_then_caps(q):
    state = q.load()
    windows = []
    for _ in range(len(q.BLOCK_BACKOFF_MINUTES) + 2):
        windows.append(q.trip_breaker(state, "hCaptcha")["minutes"])
    assert windows[: len(q.BLOCK_BACKOFF_MINUTES)] == q.BLOCK_BACKOFF_MINUTES
    assert windows[-1] == q.BLOCK_BACKOFF_MINUTES[-1], "backoff is capped, not unbounded"


def test_plan_hands_out_nothing_while_cooling_off(q, capsys):
    state = q.load()
    q.trip_breaker(state, "hCaptcha")
    q.save_queue(state)

    q.cmd_plan(30)
    out = json.loads(capsys.readouterr().out)
    assert out["action"] == "cooloff"
    assert "batch" not in out
    assert q.load()["programs"]["439fs"]["pages"][
        "https://example.invalid/439fs"
    ]["status"] == "pending", "cool-off must not lease pages"


def test_plan_escalates_to_attend_after_repeated_blocks(q, capsys):
    state = q.load()
    for _ in range(q.BLOCK_ATTEND_AFTER):
        q.trip_breaker(state, "hCaptcha")
    q.save_queue(state)

    q.cmd_plan(30)
    out = json.loads(capsys.readouterr().out)
    assert out["action"] == "attend"
    assert "unblock" in out["hint"], "the hint must name the human remedy"


def test_next_stays_empty_while_cooling_off(q, capsys):
    """The old contract — empty list means stop — still backs a caller off."""
    state = q.load()
    q.trip_breaker(state, "hCaptcha")
    q.save_queue(state)

    q.cmd_next(30)
    captured = capsys.readouterr()
    assert json.loads(captured.out) == []
    assert "cool-off" in captured.err, "the reason goes to stderr, not into the JSON"


def test_plan_captures_once_the_window_expires(q, capsys):
    state = q.load()
    q.trip_breaker(state, "hCaptcha")
    state["block"]["until"] = (
        datetime.now(timezone.utc) - timedelta(minutes=1)
    ).isoformat(timespec="seconds")
    q.save_queue(state)

    q.cmd_plan(30)
    out = json.loads(capsys.readouterr().out)
    assert out["action"] == "capture"
    assert len(out["batch"]) == 2
    assert out["attempt"] == 2, "the retry is numbered, so a run can log which attempt it is"


def test_unblock_clears_the_breaker(q, capsys):
    state = q.load()
    q.trip_breaker(state, "hCaptcha")
    q.save_queue(state)

    q.cmd_unblock()
    assert q.cooloff_seconds(q.load()) == 0
    q.cmd_plan(30)
    assert json.loads(capsys.readouterr().out.split("\n", 1)[1])["action"] == "capture"


def test_idle_is_distinct_from_cooloff(q, capsys):
    """The distinction the whole thing exists for: finished vs refused."""
    state = q.load()
    for page in state["programs"]["439fs"]["pages"].values():
        page["status"] = "done"
    q.save_queue(state)

    q.cmd_plan(30)
    assert json.loads(capsys.readouterr().out)["action"] == "idle"


def test_successful_save_resets_the_backoff(q, tmp_path, capsys):
    """Otherwise the window ratchets across unrelated blocks to the 12h ceiling."""
    state = q.load()
    q.trip_breaker(state, "hCaptcha")
    state["programs"]["439fs"]["pages"]["https://example.invalid/439fs"]["status"] = "inflight"
    q.save_queue(state)

    (tmp_path / "raw").mkdir(exist_ok=True)
    (tmp_path / "raw" / "439fs__course.json").write_text(
        json.dumps({"text": "Master of Testing\n" + "curriculum detail. " * 60, "links": []})
    )
    q.cmd_save("439fs", "course")

    saved = q.load()
    assert saved["block"]["consecutive"] == 0
    assert q.cooloff_seconds(saved) == 0


def test_save_of_a_block_page_trips_the_breaker(q, tmp_path):
    """Defence in depth: the agent need not remember to call `block`."""
    (tmp_path / "raw").mkdir(exist_ok=True)
    (tmp_path / "raw" / "439fs__course.json").write_text(
        json.dumps({"text": "Pardon Our Interruption", "links": []})
    )
    with pytest.raises(SystemExit):
        q.cmd_save("439fs", "course")
    assert q.cooloff_seconds(q.load()) > 0


def test_save_of_an_empty_extract_trips_the_breaker(q, tmp_path):
    """The hCaptcha shape seen on 2026-08-17: HTTP 200, empty document."""
    (tmp_path / "raw").mkdir(exist_ok=True)
    (tmp_path / "raw" / "439fs__course.json").write_text(
        json.dumps({"text": "", "links": []})
    )
    with pytest.raises(SystemExit):
        q.cmd_save("439fs", "course")
    saved = q.load()
    assert q.cooloff_seconds(saved) > 0
    page = saved["programs"]["439fs"]["pages"]["https://example.invalid/439fs"]
    # It keeps the `blocked` status — that is the diagnostic, and `status` counts
    # it. What matters is that it is not terminal: the shortest cool-off (30m)
    # outlasts the 20m lease, so the page is claimable again the moment the
    # breaker closes.
    assert page["status"] == "blocked"
    page["ts"] = (datetime.now(timezone.utc) - timedelta(seconds=q.LEASE_SECONDS + 1)).isoformat()
    assert q.claimable(page), "a blocked page must come back, never leave the queue"


# --------------------------------------------------------------------------- #
# Ordering. `prioritise` is the only thing that changes WHICH program a
# scheduled run picks up, and a run reports what it captured, not what it
# skipped — so a broken sort would look exactly like normal progress.
# --------------------------------------------------------------------------- #

def _seed(mod, *specs):
    """A queue of programs, each (code, n_done, priority) with one pending page."""
    programs = {}
    for code, done, priority in specs:
        pages = {
            f"https://example.invalid/{code}/course-structure": {
                "slot": "structure", "status": "pending", "chars": 0, "ts": None,
            }
        }
        if done:
            pages[f"https://example.invalid/{code}"] = {
                "slot": "course", "status": "done", "chars": 900, "ts": mod.now(),
            }
        prog = {
            "name": code, "base": f"https://example.invalid/{code}",
            "assembled": False, "pages": pages,
        }
        if priority:
            prog["priority"] = True
        programs[code] = prog
    mod.save_queue({"version": 1, "programs": programs})


def _order(mod, n=10):
    return [e["code"] for e in mod.take_batch(mod.load(), n)]


def test_priority_programs_lead(q):
    # Alphabetically zzz trails aaa; priority must beat that.
    _seed(q, ("aaa", 0, False), ("zzz", 0, True))
    assert _order(q) == ["zzz", "aaa"]


def test_started_still_beats_priority(q):
    """Priority picks the next program up; it never strands a half-captured one.

    This is the ordering that matters most: preempting a program mid-capture
    leaves it permanently short of the pages it needs to assemble, so the work
    already spent on it buys nothing.
    """
    _seed(q, ("aaa", 3, False), ("zzz", 0, True))
    assert _order(q) == ["aaa", "zzz"]


def test_clear_restores_alphabetical_order(q):
    _seed(q, ("aaa", 0, False), ("zzz", 0, True))
    q.cmd_prioritise([], clear=True)
    assert _order(q) == ["aaa", "zzz"]
    assert "priority" not in q.load()["programs"]["zzz"]


def test_prioritise_reports_codes_it_does_not_know(q, capsys):
    _seed(q, ("aaa", 0, False))
    q.cmd_prioritise(["aaa", "nope"])
    out = capsys.readouterr().out
    assert "prioritised 1 of 2" in out
    assert "nope" in out
    assert q.load()["programs"]["aaa"]["priority"] is True


def test_init_preserves_priority(q, tmp_path, monkeypatch):
    """A re-seed must not quietly undo the sequencing decision."""
    _seed(q, ("aaa", 0, True))
    cohort = tmp_path / "cohort.json"
    cohort.write_text(json.dumps(
        [{"code": "aaa", "name": "Test", "url": "https://example.invalid/aaa"}]
    ))
    monkeypatch.setattr(q, "COHORT", str(cohort))
    monkeypatch.setattr(q, "COHORT_EXT", str(tmp_path / "absent.json"))
    q.cmd_init()
    assert q.load()["programs"]["aaa"]["priority"] is True
