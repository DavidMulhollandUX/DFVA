#!/bin/bash
# deploy.sh — Deploy the WHOLE app (backend + frontend) and verify it.
#
# This is the entry point you should use. Deploying the frontend alone (the
# old habit) is what left the Fly backend stale and crashed the logged-in
# pages. This ships both, in order, then runs the smoke test so a bad deploy
# is caught immediately instead of by a user.
set -e
cd "$(dirname "$0")"

echo "━━━ 1/3 Backend (Fly) ━━━"
./deploy-server.sh

echo ""
echo "━━━ 2/3 Frontend (Vercel) ━━━"
./deploy-vercel.sh

echo ""
echo "━━━ 3/3 Smoke test ━━━"
./smoke-test.sh

echo ""
echo "🎉 Full deploy complete and verified."
