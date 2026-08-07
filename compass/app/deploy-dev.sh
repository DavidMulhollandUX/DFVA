#!/bin/bash
# deploy-dev.sh — Frontend-only deploy of the CURRENT branch to dev.evidura.ai
# (separate Vercel project "evidura-dev"). Never touches the prod project link
# (which lives in .wasp/out/web-app/build/.vercel and belongs to project "build").
#
# The backend is shared with prod (compass-server-sxd on Fly); it allows the
# dev origin via src/serverSetup.ts, deployed from main by deploy-server.sh.
# Run this from the `dev` branch. Prod deploys stay on ./deploy.sh.
set -e
cd "$(dirname "$0")"

API_URL="${REACT_APP_API_URL:-https://compass-server-sxd.fly.dev}"
BUILD_DIR=".wasp/out/web-app/build"
DEV_DIR=".wasp/out/web-app/build-dev"
TEAM="team_60OV5a6hSubngL3Y3TS2TCQB"
PROJECT="evidura-dev"
DEV_DOMAIN="dev.evidura.ai"

echo "🔨 Building frontend (API → $API_URL)..."
REACT_APP_API_URL="$API_URL" npx vite build

echo "📦 Staging build in $DEV_DIR (protects prod .vercel link)..."
rm -rf "$DEV_DIR"
cp -R "$BUILD_DIR" "$DEV_DIR"
rm -rf "$DEV_DIR/.vercel"

# SPA fallback (Wasp emits 200.html) + keep the dev site out of search indexes.
cat > "$DEV_DIR/vercel.json" <<'EOF'
{
  "rewrites": [{ "source": "/(.*)", "destination": "/200.html" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [{ "key": "X-Robots-Tag", "value": "noindex, nofollow" }]
    }
  ]
}
EOF

cd "$DEV_DIR"
echo "🔗 Linking to Vercel project '$PROJECT'..."
npx vercel project add "$PROJECT" --scope "$TEAM" 2>/dev/null || true
npx vercel link --yes --scope "$TEAM" --project "$PROJECT"

echo "🚀 Deploying..."
# `vercel deploy` prints the deployment URL as its only stdout; logs go to stderr.
DEPLOYMENT_URL=$(npx vercel deploy --prod --yes)
if [ -z "$DEPLOYMENT_URL" ]; then
  echo "❌ Could not determine deployment URL"
  exit 1
fi
echo "   → $DEPLOYMENT_URL"

echo "🔗 Aliasing $DEV_DOMAIN..."
if ! npx vercel alias set "$DEPLOYMENT_URL" "$DEV_DOMAIN" --scope "$TEAM"; then
  echo "⚠️  Alias failed — $DEV_DOMAIN may need DNS setup (see below)."
fi

if [ -z "$(dig +short "$DEV_DOMAIN")" ]; then
  echo "⚠️  $DEV_DOMAIN does not resolve yet. If evidura.ai DNS is NOT on Vercel"
  echo "   nameservers, add this record at the DNS host:"
  echo "     dev  CNAME  cname.vercel-dns.com"
  echo "   then re-run: npx vercel alias set $DEPLOYMENT_URL $DEV_DOMAIN"
fi

echo "✅ Dev deploy done: $DEPLOYMENT_URL  (→ https://$DEV_DOMAIN once DNS resolves)"
