#!/bin/bash
# dev-app.sh — start the whole local stack from the repo root in one process.
#
#   bash scripts/dev-app.sh      # container service → Postgres → wasp start
#
# Client on :3000, server on :3001. Ctrl-C stops wasp; Postgres keeps running
# (stop it with scripts/dev-db.sh stop). Run scripts/doctor.sh first if
# anything looks off.
#
# Agents: run this with the Bash tool in the background, then attach the
# in-app browser with preview_start name "evidura" (.claude/launch.json is the
# attach form: the preview launcher on macOS cannot read files under
# ~/Documents, so it cannot run this script itself).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
export PATH="$HOME/.nvm/versions/node/v24.16.0/bin:$PATH"

container system start >/dev/null 2>&1 || true
"$ROOT/scripts/dev-db.sh" start

cd "$ROOT/compass/app"
exec wasp start
