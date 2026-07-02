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
npx vercel --prod --yes

echo ""
echo "🔗 Updating aliases → evidura.vercel.app + evidura.ai"
DEPLOYMENT_URL=$(npx vercel ls --prod 2>/dev/null | grep "build" | head -1)
# Point BOTH production domains at this deployment. evidura.ai does NOT
# auto-promote on --prod, so it must be aliased explicitly here too —
# otherwise it drifts onto an old (eventually garbage-collected → 404) build.
for DOMAIN in evidura.vercel.app evidura.ai; do
  npx vercel alias set "$DEPLOYMENT_URL" "$DOMAIN"
done

echo ""
echo "✅ Done! https://evidura.vercel.app + https://evidura.ai"
