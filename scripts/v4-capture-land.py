#!/usr/bin/env python3
"""Land one browser-downloaded v4 capture into the queue.

The browser writes the page payload straight to disk as a Blob, so the bytes never
pass through an agent's context. That matters: transcribing handbook text through a
model's output silently flattens U+00A0 to a plain space, the character count still
matches, and the scoring pass then quotes corrupted evidence. Here the file is moved
verbatim and verified against the length the page itself reported before anything is
recorded.

Chrome can only be told to download to its own directory, so blobs land in ~/Downloads
first. This script sweeps every one of them into scrapes/v4/inbox/ before doing anything
else, so captures live inside the repo's own capture tree instead of accumulating in the
user's Downloads folder. The inbox is a staging area, not the archive -- the verbatim
copy of record is scrapes/v4/raw/<code>__<slot>.json.

Chrome also renames a repeat download to "name (1).json", "name (2).json". Those are
retry artifacts, so the newest blob for a slot wins and byte-identical siblings are
cleaned up once the real one is safely saved.

Usage: v4-capture-land.py <code> <slot> <expected-text-length>
       v4-capture-land.py --sweep          (just drain ~/Downloads into the inbox)

Exit codes are the agent's control flow:
  0  landed and saved
  3  no blob for this slot (browser download blocked) -- retry the page
  4  length mismatch: the file is not what the page measured -- blob kept in inbox
  5  too short for its slot -- reload ONCE, do not let the queue see it, because
     v4-capture-queue.py save() marks a short page `failed`, which is terminal
     and drops a perfectly good page out of the queue for good.
"""
from __future__ import annotations

import glob
import json
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUEUE = os.path.join(ROOT, "scripts", "v4-capture-queue.py")
RAW = os.path.join(ROOT, "scrapes", "v4", "raw")
INBOX = os.path.join(ROOT, "scrapes", "v4", "inbox")
DOWNLOADS = os.path.expanduser("~/Downloads")

# Mirrors the floors in v4-capture-queue.py cmd_save(). Kept in step deliberately:
# we must reject a short page BEFORE save() sees it and marks it terminally failed.
SUBJ_FLOOR = 150
PAGE_FLOOR = 400


def sweep() -> int:
    """Move every v4cap blob out of ~/Downloads and into the repo's inbox."""
    os.makedirs(INBOX, exist_ok=True)
    moved = 0
    for src in sorted(glob.glob(os.path.join(DOWNLOADS, "v4cap__*.json"))):
        dest = os.path.join(INBOX, os.path.basename(src))
        # A same-named blob already in the inbox is a stale earlier attempt; the
        # one just downloaded is the one we want, so it wins.
        os.replace(src, dest)
        moved += 1
    return moved


def blobs_for(code: str, slot: str) -> list[str]:
    """Newest first, so a retry supersedes the attempt it was retrying."""
    pat = os.path.join(INBOX, f"v4cap__{code}__{slot}*.json")
    return sorted(glob.glob(pat), key=os.path.getmtime, reverse=True)


def main() -> int:
    if len(sys.argv) == 2 and sys.argv[1] == "--sweep":
        print(f"swept {sweep()} blob(s) into {os.path.relpath(INBOX, ROOT)}")
        return 0
    if len(sys.argv) != 4:
        print(__doc__)
        return 2
    code, slot, expected = sys.argv[1], sys.argv[2], int(sys.argv[3])

    sweep()
    found = blobs_for(code, slot)
    if not found:
        print(f"NOFILE {code}/{slot}: no blob in inbox — browser download never landed")
        return 3
    blob = found[0]

    with open(blob, encoding="utf-8") as fh:
        data = json.load(fh)
    text = data.get("text") or ""

    if len(text) != expected:
        print(f"MISMATCH {code}/{slot}: blob {len(text)} chars, page reported {expected} "
              f"— kept at {os.path.relpath(blob, ROOT)}")
        return 4

    floor = SUBJ_FLOOR if slot.startswith("subj-") else PAGE_FLOOR
    # "not published for 2026" pages are legitimately short and the queue has a
    # dedicated non-terminal state for them, so let those through to save().
    published = "not currently published" not in text and "Page not found" not in text
    if len(text) < floor and published:
        print(f"SHORT {code}/{slot}: {len(text)} chars (need {floor}) — not saved, reload once")
        return 5

    os.makedirs(RAW, exist_ok=True)
    raw = os.path.join(RAW, f"{code}__{slot}.json")
    os.replace(blob, raw)

    nbsp = text.count(" ")
    proc = subprocess.run([sys.executable, QUEUE, "save", code, slot], text=True)
    if proc.returncode != 0:
        return proc.returncode

    # The page is saved and raw/ now holds the copy of record, so byte-identical
    # retry siblings in the inbox are redundant. Anything that differs is left
    # alone -- it is evidence of a problem, not clutter.
    dropped = 0
    for extra in blobs_for(code, slot):
        try:
            with open(extra, encoding="utf-8") as fh:
                if json.load(fh) == data:
                    os.remove(extra)
                    dropped += 1
        except (OSError, ValueError):
            pass

    note = f", {dropped} duplicate blob(s) cleared" if dropped else ""
    print(f"  ({len(text)} chars verified, {nbsp} nbsp preserved, "
          f"{len(data.get('links') or [])} links{note})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
