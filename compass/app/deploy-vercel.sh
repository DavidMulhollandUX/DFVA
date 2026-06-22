#!/bin/bash
# deploy-vercel.sh — Build and deploy the Wasp web client to Vercel (production).
#
# Wasp 0.22 flow (this changed from older Wasp — hence this script's update):
#   1. The client build needs .wasp/out (the generated SDK) to exist. `wasp start`
#      (dev) generates it; if it's missing we run `wasp build`. `wasp build` refuses to
#      build for production while emailSender is "Dummy", so we temporarily swap it to a
#      real provider FOR THE BUILD ONLY — the CLIENT bundle is identical (email is
#      server-side, and the server runs separately on Fly) — then restore main.wasp.
#   2. `REACT_APP_API_URL=... npx vite build` (from this dir) compiles the static client
#      into .wasp/out/web-app/build. NOTE: web-app/ is empty until this runs — expected.
#   3. Deploy that dir to Vercel and point the production domain alias at it.
#
# Usage: ./deploy-vercel.sh        (run from compass/app)
set -e
cd "$(dirname "$0")"

API_URL="${REACT_APP_API_URL:-https://compass-server-sxd.fly.dev}"
BUILD_DIR=".wasp/out/web-app/build"
ALIAS="compass-curriculum.vercel.app"

if [ ! -d ".wasp/out/sdk" ]; then
  echo "🐝 .wasp/out missing — running wasp build (Dummy email swapped for the build, then restored)..."
  cp main.wasp .main.wasp.bak
  trap 'cp -f .main.wasp.bak main.wasp 2>/dev/null; rm -f .main.wasp.bak' EXIT
  perl -i -pe 's/^    provider: Dummy,/    provider: SMTP,/' main.wasp
  wasp build
  cp -f .main.wasp.bak main.wasp; rm -f .main.wasp.bak; trap - EXIT
fi

echo "🔨 Building web client (API → $API_URL)..."
REACT_APP_API_URL="$API_URL" npx vite build

echo "📝 Writing SPA rewrite..."
cat > "$BUILD_DIR/vercel.json" <<'JSON'
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
JSON

echo "🚀 Deploying to Vercel (production)..."
( cd "$BUILD_DIR" && npx vercel deploy --prod --yes )

DEPLOY_URL=$( cd "$BUILD_DIR" && npx vercel ls 2>/dev/null | grep -oE 'https://[a-z0-9-]+\.vercel\.app' | head -1 )
echo "🔗 Aliasing $DEPLOY_URL → $ALIAS"
( cd "$BUILD_DIR" && npx vercel alias set "$DEPLOY_URL" "$ALIAS" )

echo "✅ Done — https://$ALIAS"
echo "   (Vercel deployment protection may require login to view.)"
