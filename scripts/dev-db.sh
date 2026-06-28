#!/bin/bash
# dev-db.sh — local Postgres for the Wasp app via Apple's `container` CLI
# (replaces `wasp start db`, which needs Docker). Drop-in: same creds + port
# + DATABASE_URL the app already expects.
#
#   scripts/dev-db.sh start   # create (or restart) the Postgres container
#   scripts/dev-db.sh stop    # stop it (data persists in the volume)
#   scripts/dev-db.sh logs     # follow logs
#   scripts/dev-db.sh psql     # open a psql shell inside the container
#   scripts/dev-db.sh status
#
# Notes:
# - Apple `container`'s loopback publish rule is dropped on a Mac reboot, so
#   re-run `start` after restarting (it recreates the rule). It also needs the
#   service up: `container system start`.
# - Set DATABASE_URL in compass/app/.env.server to:
#   postgresql://postgresWaspDevUser:postgresWaspDevPass@localhost:5432/OpenSaaS-fc3b171ec3
#   then run `wasp start` (NOT `wasp start db`).
set -euo pipefail

NAME=dfva-pg
IMAGE=postgres:18
PGDATA_HOST="$HOME/.dfva/pgdata"
PORT=5432
PG_USER=postgresWaspDevUser
PG_PASS=postgresWaspDevPass
PG_DB=OpenSaaS-fc3b171ec3

cmd=${1:-start}

case "$cmd" in
  start)
    container system start >/dev/null 2>&1 || true
    mkdir -p "$PGDATA_HOST"
    if container inspect "$NAME" >/dev/null 2>&1; then
      echo "Starting existing container '$NAME'…"
      container start "$NAME" 2>/dev/null || echo "(already running)"
    else
      echo "Creating container '$NAME' ($IMAGE) on 127.0.0.1:$PORT…"
      container run -d --name "$NAME" \
        -e POSTGRES_USER="$PG_USER" \
        -e POSTGRES_PASSWORD="$PG_PASS" \
        -e POSTGRES_DB="$PG_DB" \
        -p "127.0.0.1:$PORT:5432" \
        --volume "$PGDATA_HOST:/var/lib/postgresql" \
        "$IMAGE"
    fi
    echo "Postgres → postgresql://$PG_USER:$PG_PASS@localhost:$PORT/$PG_DB"
    ;;
  stop)    container stop "$NAME" ;;
  logs)    container logs -f "$NAME" ;;
  psql)    container exec -it "$NAME" psql -U "$PG_USER" -d "$PG_DB" ;;
  status)  container ls -a | grep -E "NAME|$NAME" || echo "no '$NAME' container" ;;
  *) echo "usage: $0 {start|stop|logs|psql|status}" >&2; exit 1 ;;
esac
