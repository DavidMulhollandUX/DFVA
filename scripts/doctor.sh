#!/bin/bash
# doctor.sh — read-only preflight for the local dev stack. Prints one PASS or
# FAIL line per check with the command that fixes it. Never starts, stops,
# kills or migrates anything.
#
#   bash scripts/doctor.sh   (exit 0 = all PASS, exit 1 = something to fix)
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP="$ROOT/compass/app"
export PATH="$HOME/.nvm/versions/node/v24.16.0/bin:$PATH"
fail=0

pass() { echo "  PASS $1"; }
miss() { echo "  FAIL $1"; echo "       fix: $2"; fail=1; }

echo "== toolchain =="
node_v=$(node -v 2>/dev/null || echo none)
case "$node_v" in
  v24.*) pass "node $node_v" ;;
  *) miss "node is $node_v, need v24" 'export PATH="$HOME/.nvm/versions/node/v24.16.0/bin:$PATH"' ;;
esac
wasp_v=$(wasp version 2>/dev/null | head -1 || echo none)
if [ "$wasp_v" = "0.24.0" ]; then pass "wasp $wasp_v"; else miss "wasp is '$wasp_v', need 0.24.0" "see compass/app/README.md"; fi

echo "== container runtime =="
if container system status >/dev/null 2>&1; then
  pass "container service running"
else
  miss "container service not running" "container system start"
fi
if container inspect dfva-pg >/dev/null 2>&1 && container ls 2>/dev/null | grep -q "dfva-pg.*running"; then
  pass "dfva-pg container running"
else
  miss "dfva-pg container not running" "scripts/dev-db.sh start"
fi

echo "== ports =="
port_owner() { lsof -nP -iTCP:"$1" -sTCP:LISTEN 2>/dev/null | awk 'NR==2{print $1}'; }
if [ -n "$(port_owner 5432)" ]; then pass "5432 listening ($(port_owner 5432))"; else miss "nothing on 5432" "scripts/dev-db.sh start (re-run after a reboot)"; fi
for p in 3000 3001; do
  owner=$(port_owner "$p")
  if [ -z "$owner" ]; then pass "$p free"; else pass "$p in use by $owner (an app is already running)"; fi
done

echo "== env =="
ENV="$APP/.env.server"
if [ -f "$ENV" ]; then
  pass ".env.server present"
  grep -q '^DATABASE_URL=' "$ENV" && pass "DATABASE_URL set" || miss "DATABASE_URL missing" "copy the line from compass/app/.env.server.example"
  grep -q '^DFVA_MOCK=' "$ENV" && pass "DFVA_MOCK=$(grep '^DFVA_MOCK=' "$ENV" | cut -d= -f2)" || miss "DFVA_MOCK unset (defaults to true)" "add DFVA_MOCK=true to compass/app/.env.server"
  grep -q '^SKIP_EMAIL_VERIFICATION_IN_DEV=true' "$ENV" && pass "SKIP_EMAIL_VERIFICATION_IN_DEV=true" || miss "SKIP_EMAIL_VERIFICATION_IN_DEV not true; the auth e2e flow will hang on the verification email" "add SKIP_EMAIL_VERIFICATION_IN_DEV=true to compass/app/.env.server"
else
  miss ".env.server missing" "cp compass/app/.env.server.example compass/app/.env.server and fill DATABASE_URL"
fi

echo "== database schema =="
if [ -f "$APP/.wasp/out/db/schema.prisma" ] && [ -n "$(port_owner 5432)" ]; then
  url=$(grep '^DATABASE_URL=' "$ENV" 2>/dev/null | cut -d= -f2-)
  out=$(cd "$APP" && DATABASE_URL="$url" npx prisma migrate status --schema .wasp/out/db/schema.prisma 2>&1)
  if echo "$out" | grep -q "Database schema is up to date"; then
    pass "migrations applied"
  else
    miss "migrations pending or unreadable" "DATABASE_URL=… npx prisma migrate dev --schema compass/app/.wasp/out/db/schema.prisma"
  fi
else
  echo "  SKIP migration status (needs .wasp/out from a prior wasp start, and Postgres up)"
fi

echo
if [ "$fail" -eq 0 ]; then echo "doctor: all checks pass"; else echo "doctor: fix the FAIL lines above"; fi
exit $fail
