# DFVA v4.1 capture — Antigravity scheduled action

**Status:** ready to run. This is the Antigravity counterpart to the Hermes
capture cron job (`b2aa22a426e7`) and the Claude capture stage. Antigravity
runs **capture only** — scoring is owned by Hermes (cron `dd321e7d34be`) and
Claude. All harnesses share one register (`llm-usage-register.jsonl`) and one
lease coordinator (`v4-capture-queue.py`).

**Preconditions.**
- Working directory: `/Users/djmulholland/Documents/SXD-Github/DFVA`.
- **Google Chrome must be open** — the script drives a real Chrome tab.
- Set up as a recurring task in Antigravity with cadence **every 5 minutes**.

## Scheduled-action prompt

> **DFVA v4 handbook capture — Antigravity harness**
>
> You run as the **antigravity** harness for the DFVA capture pipeline. Working
> directory is always `/Users/djmulholland/Documents/SXD-Github/DFVA` and
> **Google Chrome must be open**.
>
> Every tick, in this order:
> 1. `python3 scripts/v4-capture-queue.py status` — read global progress.
> 2. `python3 scripts/v4-capture-queue.py plan 2` — coordination gate. Returns
>    `capture` / `cooloff` / `attend` / `idle`. Proceed only on `capture`. `plan`
>    respects 20-minute page leases, so it never hands you a page the other
>    harness holds.
> 3. Cross-harness check: `python3 scripts/llm-usage-register.py status`. Confirm
>    no Hermes run is mid-capture on the same program. The queue lease is source
>    of truth — if `plan` leased pages, they are yours; if they show `inflight`
>    with a recent Hermes heartbeat, leave them. Do not force-capture a program
>    the other harness has `inflight`.
> 4. Run capture:
>    `python3 scripts/agy-capture.py --batch 2 --model gemini-3.7-flash`
>    (or `tencent/hy3:free`; add token/duration args if available). This runs
>    plan → capture → sweep → assemble and writes a `harness=antigravity` entry
>    to the shared register.
> 5. If `plan` says `attend` (bot challenge), stop and alert the user — do not
>    retry.
> 6. If `plan` says `idle` or `cooloff`, do nothing this tick.
>
> Safety rules:
> - Never run `block` unless you personally hit a challenge.
> - Never hand-edit `llm-usage-register.jsonl` — only append via
>   `agy-capture.py` or `llm-usage-register.py log`.
> - Different programs run safely in parallel; the same program's pages are
>   protected by the lease. Trust `plan`.
> - After each capture, the register is your cross-harness heartbeat so Hermes
>   can see Antigravity is alive.

## Register integration

Antigravity appends via `scripts/agy-capture.py`, which calls
`llm-usage-register.py log` with `harness=antigravity`. Hermes folds its audit
in via `python3 scripts/llm-usage-register.py sync`; Claude appends directly.
`status` breaks down by harness, so all three are visible without extra wiring.
