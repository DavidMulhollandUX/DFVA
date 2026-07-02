#!/bin/bash
# deploy-vercel.sh — Build and deploy the Wasp frontend to Vercel
# Usage: ./deploy-vercel.sh
set -e

BUILD_DIR=".wasp/out/web-app/build"
API_URL="${REACT_APP_API_URL:-https://compass-server-sxd.fly.dev}"

echo "🔨 Building frontend (API → $API_URL)..."
REACT_APP_API_URL="$API_URL" npx vite build

echo "📝 Writing vercel.json SPA rewrite..."
cat > "$BUILD_DIR/vercel.json" << 'EOF'
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
EOF

echo "🚀 Deploying to Vercel..."
cd "$BUILD_DIR"
# Capture the deployment URL directly from the deploy output — do NOT parse
# `vercel ls | head` (it returns table rows / the wrong deployment, which
# previously split evidura.ai onto a broken build → 404).
DEPLOYMENT_URL=$(npx vercel --prod --yes | grep -oE 'https://build-[a-z0-9]+-[a-z0-9-]+\.vercel\.app' | tail -1)
echo "   → deployed: $DEPLOYMENT_URL"
if [ -z "$DEPLOYMENT_URL" ]; then
  echo "❌ Could not determine deployment URL — aborting alias step."
  exit 1
fi

echo ""
echo "🔗 Promoting to production + aliasing evidura.vercel.app + evidura.ai"
# `evidura.ai` is a PROJECT domain that serves the project's current production
# deployment, so promote this deployment to production; `evidura.vercel.app`
# gets an explicit alias to the same deployment. Both then serve one build.
npx vercel promote "$DEPLOYMENT_URL" --yes || true
npx vercel alias set "$DEPLOYMENT_URL" evidura.vercel.app
npx vercel alias set "$DEPLOYMENT_URL" evidura.ai

echo ""
echo "✅ Done! https://evidura.vercel.app + https://evidura.ai"
