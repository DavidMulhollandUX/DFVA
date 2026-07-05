#!/bin/bash
# smoke-test.sh — Post-deploy health check. Fails loudly if the frontend and
# backend are out of sync or a domain is misrouted. This is exactly the set of
# checks that were run by hand to find the stale-backend and evidura.ai 404
# problems — codified so they can never silently ship again.
#
# Usage: ./smoke-test.sh   (exit 0 = healthy, exit 1 = something is broken)
SERVER="https://compass-server-sxd.fly.dev"
DOMAINS=("https://evidura.ai" "https://evidura.vercel.app")
# Operations the frontend calls. A 404 here means the deployed backend is stale
# (missing an operation the frontend expects). 401/400/200 all mean "present".
OPS=(get-course-interventions list-api-keys get-validation-signals assess-program get-assessment-jobs)

fail=0

echo "== CORS (backend must allow the production origin) =="
# WASP_WEB_CLIENT_URL on the Fly app is the ONLY allowed CORS origin. If it
# drifts from the domain users actually load the site from, auth/data
# fetches are silently blocked by the browser — "Failed to load user data /
# Network Error" with nothing useful in server logs. Catch it here instead.
CANONICAL_ORIGIN="https://evidura.ai"
cors_header=$(curl -s -D - -o /dev/null --max-time 20 "$SERVER/auth/me" -H "Origin: $CANONICAL_ORIGIN" \
  | grep -i "^access-control-allow-origin:" | tr -d '\r')
if [ -z "$cors_header" ]; then
  echo "  ✗ $SERVER does not send Access-Control-Allow-Origin for $CANONICAL_ORIGIN"
  echo "    → WASP_WEB_CLIENT_URL is stale. Fix: fly secrets set -a compass-server-sxd WASP_WEB_CLIENT_URL=$CANONICAL_ORIGIN"
  fail=1
else
  echo "  ✓ $cors_header"
fi

echo "== Backend operations (must NOT be 404) =="
for op in "${OPS[@]}"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$SERVER/operations/$op" \
    -H "Content-Type: application/json" -d '{}' --max-time 20)
  if [ "$code" = "404" ]; then
    echo "  ✗ $op → 404 (MISSING — backend is stale, redeploy the server)"; fail=1
  else
    echo "  ✓ $op → $code"
  fi
done

echo "== Production domains (must be 200) =="
entry=""
for d in "${DOMAINS[@]}"; do
  body=$(curl -sL -w "\n%{http_code}" --max-time 20 -A "Mozilla/5.0" "$d/")
  code=$(printf '%s' "$body" | tail -1)
  # Entry chunk is 200-*.js since Wasp 0.24 (SPA fallback renamed index.html
  # → 200.html); accept index-*.js too so this works against older deploys.
  asset=$(printf '%s' "$body" | grep -oE '/assets/(200|index)-[A-Za-z0-9_-]+\.js' | head -1)
  if [ "$code" != "200" ]; then
    echo "  ✗ $d → $code"; fail=1
  else
    echo "  ✓ $d → 200 ($asset)"
    # Both domains must serve the SAME build (no split-brain / stale alias).
    if [ -n "$entry" ] && [ "$entry" != "$asset" ]; then
      echo "  ✗ domain drift: $d serves $asset but another domain serves $entry"; fail=1
    fi
    entry="$asset"
  fi
done

if [ "$fail" = "0" ]; then echo "✅ Smoke test passed."; else echo "❌ Smoke test FAILED."; fi
exit $fail
